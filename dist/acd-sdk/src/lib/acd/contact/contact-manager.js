import { __awaiter } from "tslib";
import { AdminService, CallContactEventStatus, ACDSessionManager, Logger, VoiceMailContactEventStatus, dbInstance, IndexDBStoreNames, LocalStorageHelper, StorageKeys, isVoiceBioHubFeatureEnabled, } from '@nice-devone/core-sdk';
import { CXoneVoiceContact } from './cxone-voice-contact';
import { Subject } from 'rxjs';
import { CXoneSdkError, CXoneSdkErrorType, WorkItemContactStatus, DirectoryEntities, AgentSessionStatus, MediaType, VoiceContactStatus, CallContactEventYup, VoiceMailContactEventYup, WorkItemContactEventYup, } from '@nice-devone/common-sdk';
import { CXoneVoiceMailContact } from './cxone-voicemail-contact';
import { CXoneWorkItemContact } from './cxone-workitem-contact';
import { CXoneAcdClient } from '../../cxone-acd-client';
import { contactChannelPolicyFor, } from './contact-channel-policy';
import { DispositionService, SkillService, CXoneClient, PersonalConnectionService, ContactService, VoiceService, CallType, ContactType, FeatureToggleService, isVoiceTranscriptEnabledAndToggledOn, OutboundStrategy } from '@nice-devone/agent-sdk';
/**
 * How long a skill lookup may delay the first contact event for a contact.
 *
 * PLACEHOLDER — ratified by AW-63582 against the measured p95 of the skills API.
 *
 * The instinctive worry is setting this too high, which merely costs latency. The dangerous
 * direction is too LOW: with a single emission there is no second event to repair a miss, so a
 * budget under the real p95 makes "no skill name until the next contact event" the common path.
 * For a call that is answered and ended, the next event may be the disconnect.
 */
const SKILL_LOOKUP_TIMEOUT_MS = 1000;
/**
 * Raised when a skill lookup exceeds its budget, so "ran out of time" can be told apart from
 * "failed". The two are logged at different levels and mean different things: a timeout points at
 * platform latency, an error at the skills API. Matching on error message text would rot; an
 * instanceof check will not.
 */
class SkillLookupTimeoutError extends Error {
    /**
     * @param timeoutMs - the elapsed budget, in milliseconds
     * @example
     * ```
     * throw new SkillLookupTimeoutError(SKILL_LOOKUP_TIMEOUT_MS);
     * ```
     */
    constructor(timeoutMs) {
        super(`Skill lookup exceeded ${timeoutMs}ms`);
        this.name = 'SkillLookupTimeoutError';
        this.timeoutMs = timeoutMs;
    }
}
/**
 * Class to handle the contacts
 */
export class ContactManager {
    /**
     * @example
     * ```
     * const contactManager = new ContactManager();
     * ```
     */
    constructor() {
        this.acdSession = {};
        this.adminService = {};
        this.voiceContactMap = new Map();
        // Master id first reported for each voice leg (AW-65928). A leg's master never changes, but a stale
        // master has been seen on an ending leg's disconnect event; transcript cleanup keys off the first one.
        this.firstSeenMasterIds = new Map();
        // Legs whose first event carried no master, so the remembered id is only a placeholder.
        this.placeholderMasterIds = new Set();
        this.supervisorContactSet = new Set();
        this.voiceMailContactMap = new Map();
        this.workItemContactMap = new Map();
        this.voiceContactUpdateEvent = new Subject();
        this.voiceMailContactUpdateEvent = new Subject();
        this.workItemContactUpdateEvent = new Subject();
        this.onUserSlotEvent = new Subject();
        this.onDispositionEvent = new Subject();
        this.onTagsEvent = new Subject();
        this.personalConnectionService = {};
        this.voiceService = {};
        this.contactService = {};
        this.cxoneVoiceContact = {};
        this.dispositionService = {};
        this.logger = new Logger('ACD', 'contact-manager');
        this.skillService = {};
        this.voiceMailPlayBackEvent = new Subject();
        // this map will hold only new arrived message against its contactId
        // this subject is used to update public channel message tree.
        this.onDigitalContactNewMessageEvent = new Subject();
        this.conferenceCallEvent = new Subject();
        // this subject is used to update typing preview for the chat with Events like senderTyping, messagePreview.
        this.onDigitalContactUserTypingPreviewEvent = new Subject();
        this.onCoBrowseEvent = new Subject();
        this.onLocalPostEvent = new Subject();
        this.dispositionsData = {};
        this.tagsData = {};
        this.allContacts = {};
        this.voiceCallRecordServicePollingEvent = new Subject();
        this.onVoiceTranscriptContactEndEvent = new Subject();
        this.onLiveVoxErrorEvent = new Subject();
        this.renewStateSubscription = null;
        this.isDisposed = false;
        // Caches a mute state received before its voice contact exists in voiceContactMap.
        // On a page refresh the get-next batch can deliver the MuteEvent before the
        // CallContactEvent (phone-number login), so the mute is applied once the voice
        // contact is created instead of being silently dropped.
        this.pendingMuteState = null;
        /**
         * Which skill id the metadata currently on a contact was resolved from.
         *
         * Keyed on the contact OBJECT, which is stable across events for all three channels — the same
         * instance is reused from the contact maps. So the entry is collected with the contact and there
         * is no cleanup path to forget, unlike a contactId-keyed Map.
         *
         * Compared against the contact's current skill id rather than merely checking that skillName is
         * populated, so a transfer or reskill still re-resolves.
         */
        this.resolvedSkillFor = new WeakMap();
        /**
         * In-flight enrichment per contact, so concurrent events share one lookup instead of racing.
         *
         * Sharing is conditional on `pendingSkillFor` matching — read the two together. A contact
         * reskilled mid-flight must NOT join the previous skill's lookup.
         */
        this.pendingEnrichment = new WeakMap();
        /**
         * Which skill id the in-flight enrichment is resolving.
         *
         * Needed because a contact can be reskilled WHILE a lookup is in flight — `assignToCurrentContact`
         * refreshes `skill` from every event on the same contact instance. Sharing an in-flight lookup is
         * only correct when it is for the same skill; otherwise the second event would wait on an answer
         * for a skill the contact no longer has, and never resolve its own.
         */
        this.pendingSkillFor = new WeakMap();
        /**
         * Voice contacts whose final Disconnected has already been emitted on voiceContactUpdateEvent.
         *
         * Used to stop a same-batch event's stale snapshot being emitted AFTER the final state: the
         * reducer has by then removed the contact and would re-add it as a live, non-final contact that
         * never ends (AW-67175). Keyed by the contact instance, which is reused for every event on a
         * contactId, so the entry is collected with the contact.
         */
        this.finalEmittedFor = new WeakSet();
        /**
         * Method used to get the CXoneContact
         */
        this.publishContact = (contact) => {
            switch (contact.type) {
                case ContactType.VOICE_CONTACT:
                    this.recordFinalEmission(contact);
                    this.voiceContactUpdateEvent.next(contact);
                    this.setVoiceContactInMap(contact);
                    break;
                case ContactType.VOICEMAIL_CONTACT:
                    this.voiceMailContactUpdateEvent.next(contact);
                    this.setVoiceMailContactInMap(contact);
                    break;
                case ContactType.WORKITEM_CONTACT:
                    this.workItemContactUpdateEvent.next(contact);
                    this.setWorkItemContactInMap(contact);
                    break;
            }
        };
        this.acdSession = ACDSessionManager.instance;
        this.adminService = AdminService.instance;
        this.initialize();
    }
    /**
     * Records that a final Disconnected is about to be emitted for a voice contact.
     *
     * @param emitted - the contact object being emitted (the live contact, or a clone of it)
     * @param owner - the live contact instance to record against; defaults to `emitted`
     * @example
     * ```
     * this.recordFinalEmission(ownEventSnapshot, voiceContact);
     * ```
     */
    recordFinalEmission(emitted, owner = emitted) {
        if (emitted.status === CallContactEventStatus.DISCONNECTED && emitted.finalState) {
            this.finalEmittedFor.add(owner);
        }
    }
    /**
     * Whether a voice contact has already had its final Disconnected emitted but is now sitting in a
     * non-final state — i.e. a later same-batch event overwrote the shared instance after it ended.
     * Such a state must be neither published nor kept in voiceContactMap.
     *
     * @param contact - the live voice contact
     * @example
     * ```
     * if (this.isSupersededByFinal(voiceContact)) { ... }
     * ```
     */
    isSupersededByFinal(contact) {
        return this.finalEmittedFor.has(contact) &&
            !(contact.status === CallContactEventStatus.DISCONNECTED && contact.finalState);
    }
    /**
     * Disposes of subscriptions to prevent memory leaks when this instance is replaced.
     * Must be called before creating a new ContactManager instance.
     * @example
     * ```
     * contactManager.dispose();
     * ```
     */
    dispose() {
        this.isDisposed = true;
        if (this.renewStateSubscription) {
            this.renewStateSubscription.unsubscribe();
            this.renewStateSubscription = null;
        }
    }
    /**
     * Method to create instance for voice and contact service and update agent permissions and call contact event
     */
    initialize() {
        this.personalConnectionService = new PersonalConnectionService();
        this.voiceService = new VoiceService();
        this.contactService = new ContactService();
        this.updatePermissionsEventHandler();
        this.updateAutoSummaryEventHandler();
        this.contactEventHandler();
        this.callContactEventHandler();
        this.supervisorContactEventHandler();
        this.agentSessionChangeHandler();
        this.voicemailContactEventHandler();
        this.workItemContactEventHandler();
        this.muteEventHandler();
        this.coBrowseEventHandler();
        this.localPostEventHandler();
        this.liveVoxErrorNotifyEventHandler();
        this.dispositionService = new DispositionService();
        this.skillService = new SkillService();
        this.VoiceMailPlayBackEventHandler();
        const isVoiceBioHubEnabled = isVoiceBioHubFeatureEnabled() && FeatureToggleService.instance.getFeatureToggleSync("release-agent-voiceBioHub-AW-24969" /* FeatureToggles.VOICE_BIO_HUB_FEATURE_TOGGLE */);
        // in case of screen reload we need to connect to voice bio hub websocket
        if (isVoiceBioHubEnabled && LocalStorageHelper.getItem(StorageKeys.VOICE_BIO_HUB_AGENT_ASSIST)) {
            this.connectVoiceBioHubWebSocket();
        }
        this.conferenceCallEventHandler();
        const isRenewStateToggleEnabled = FeatureToggleService.instance.getFeatureToggleSync("release-carnival-renew-state-AW-48481" /* FeatureToggles.RENEW_STATE_FEATURE_TOGGLE */);
        if (isRenewStateToggleEnabled) {
            this.subscribeToRenewStateEvents();
        }
    }
    /**
     * Method to subscribe to renew state events from the GetNextAdapter
     * This handles stuck contacts when icBranchValue === '3' is received
     * Uses dynamic import to avoid circular dependency
     */
    subscribeToRenewStateEvents() {
        // Prevent multiple subscriptions
        if (this.renewStateSubscription && !this.renewStateSubscription.closed)
            return;
        // Dynamic import to avoid circular dependency between common-core-sdk and common-acd-sdk
        import('@nice-devone/core-sdk').then(({ GetNextEventProvider }) => {
            if (this.isDisposed)
                return;
            this.renewStateSubscription = GetNextEventProvider.instance.adapter.renewStateRequested.subscribe((data) => {
                this.logger.info('subscribeToRenewStateEvents', `Renew state requested for ${data.contactIds.length} backend contacts`);
                this.handleRenewState(data.contactIds);
            });
        }).catch((error) => {
            this.logger.error('subscribeToRenewStateEvents', 'Failed to subscribe to renew state events: ' + error);
        });
    }
    /**
     * Handle renew state event - compares backend contacts with UI contacts to find and clear stuck contacts
     * @param backendContactIds - array of contact IDs currently active in the backend
     * @example
     * ```
     * handleRenewState(['contactId1', 'contactId2'])
     * ```
     */
    handleRenewState(backendContactIds) {
        this.logger.info('handleRenewState', `Renew State: Backend has ${backendContactIds.length} active contacts`);
        const contactMaps = [
            { map: this.voiceContactMap, type: 'voice' },
            { map: this.voiceMailContactMap, type: 'voicemail' },
            { map: this.workItemContactMap, type: 'workitem' }
        ];
        contactMaps.forEach(({ map, type }) => {
            Array.from(map.keys()).forEach((contactId) => {
                if (!backendContactIds.includes(contactId)) {
                    const contact = map.get(contactId);
                    if (contact) {
                        this.logger.info('handleRenewState', `Renew State: Clearing ${type} contactID: ${contactId}`);
                        contact.status = contact.type === ContactType.VOICEMAIL_CONTACT ? VoiceMailContactEventStatus.DISCARDED : CallContactEventStatus.DISCONNECTED;
                        contact.finalState = true;
                        this.clearContact(contact);
                    }
                }
            });
        });
    }
    /**
     * Method to create contact event object based on contact type
     * @param contact - CXoneContactType (CXoneVoiceContact | CXoneVoiceMailContact | CXoneWorkItemContact)
     * @returns CallContactEvent | VoiceMailContactEvent | WorkItemContactEvent
     * @example
     * ```
     * createContactEventObject(contact)
     * ```
     */
    createContactEventObject(contact) {
        switch (contact.type) {
            case ContactType.VOICE_CONTACT:
                return this.mapToCallContactEvent(contact);
            case ContactType.VOICEMAIL_CONTACT:
                return this.mapToVoiceMailContactEvent(contact);
            case ContactType.WORKITEM_CONTACT:
                return this.mapToWorkItemContactEvent(contact);
            default:
                throw new Error(`Unknown contact type: ${contact.type}`);
        }
    }
    /**
     * Maps CXoneVoiceContact to CallContactEvent
     * @param contact - CXoneVoiceContact instance
     * @returns CallContactEvent
     */
    mapToCallContactEvent(contact) {
        return CallContactEventYup.cast({
            contactId: contact.contactID,
            masterId: contact.contactID,
            status: CallContactEventStatus.DISCONNECTED,
            originalState: contact.originalState,
            callType: contact.type,
            isInbound: contact.isInbound,
            startTime: contact.startTime,
            lastStateChangeTime: contact.lastStateChangeTime,
            screenPopUrl: contact.screenPopUrl,
            disconnectCode: contact.disconnectCode,
            isLogging: contact.isLogging,
            timeout: contact.timeout,
            allowDispositions: contact.allowDispositions,
            label: contact.label,
            isLinked: contact.isLinked,
            timeZones: contact.timeZones,
            finalState: true,
            otherInformation: contact.otherInformation,
            otherInformationNewFormat: contact.otherInformationNewFormat,
            blendingToSkillName: contact.blendingToSkillName,
            deliveryType: contact.deliveryType,
            customData: contact.customData,
            complianceRecord: contact.complianceRecord,
            confirmationRequired: contact.confirmationRequired,
            parentContactId: contact.parentContactId,
            omniGroupId: contact.omniGroupId,
            externalId: contact.externalId,
            ansMachineOverride: contact.ansMachineOverride,
            ansMachineOverrideEndTime: contact.ansMachineOverrideEndTime,
            customerCardUrl: contact.customerCardUrl,
            interactionId: contact.interactionId,
            isRequireManualAccept: contact.isRequireManualAccept,
            ani: contact.ani,
            dnis: contact.dnis,
            skill: contact.skill,
            lastStateChangeTimeUtc: contact.lastStateChangeTime,
            startTimeUtc: contact.startTime,
            screenPopUrlVariables: contact.screenPopUrlVariables,
            externalCustomerId: contact.externalCustomerId,
            smartReachTransactionId: contact.smartReachTransactionId,
        });
    }
    /**
     * Maps CXoneVoiceMailContact to VoiceMailContactEvent
     * @param contact - CXoneVoiceMailContact instance
     * @returns VoiceMailContactEvent
     */
    mapToVoiceMailContactEvent(contact) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
        return VoiceMailContactEventYup.cast({
            contactId: contact.contactID,
            createdDate: ((_a = contact.voiceMailEventData) === null || _a === void 0 ? void 0 : _a.createdDate) || new Date(),
            customData: ((_b = contact.voiceMailEventData) === null || _b === void 0 ? void 0 : _b.customData) || '',
            fileDuration: ((_c = contact.voiceMailEventData) === null || _c === void 0 ? void 0 : _c.fileDuration) || 0,
            fileName: ((_d = contact.voiceMailEventData) === null || _d === void 0 ? void 0 : _d.fileName) || '',
            finalState: true,
            from: contact.from || '',
            isInbound: ((_e = contact.voiceMailEventData) === null || _e === void 0 ? void 0 : _e.isInbound) || true,
            label: ((_f = contact.voiceMailEventData) === null || _f === void 0 ? void 0 : _f.label) || '',
            lastStateChangeTime: contact.lastStateChangeTime,
            masterID: contact.contactID,
            omniGroupId: ((_g = contact.voiceMailEventData) === null || _g === void 0 ? void 0 : _g.omniGroupId) || '',
            parentContactId: ((_h = contact.voiceMailEventData) === null || _h === void 0 ? void 0 : _h.parentContactId) || '',
            requireDisposition: contact.requireDisposition || false,
            screenPopUrl: ((_j = contact.voiceMailEventData) === null || _j === void 0 ? void 0 : _j.screenPopUrl) || '',
            skill: contact.skill || '',
            skillName: contact.skillName || '',
            startTime: ((_k = contact.voiceMailEventData) === null || _k === void 0 ? void 0 : _k.startTime) || new Date(),
            status: VoiceMailContactEventStatus.DISCARDED,
            to: ((_l = contact.voiceMailEventData) === null || _l === void 0 ? void 0 : _l.to) || '',
            type: ((_m = contact.voiceMailEventData) === null || _m === void 0 ? void 0 : _m.type) || 'VoiceMailContactEvent',
            voiceMailType: ((_o = contact.voiceMailEventData) === null || _o === void 0 ? void 0 : _o.voiceMailType) || '',
        });
    }
    /**
     * Maps CXoneWorkItemContact to WorkItemContactEvent
     * @param contact - CXoneWorkItemContact instance
     * @returns WorkItemContactEvent
     */
    mapToWorkItemContactEvent(contact) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x;
        return WorkItemContactEventYup.cast({
            agentId: ((_a = contact.workItemEventData) === null || _a === void 0 ? void 0 : _a.agentId) || 0,
            contactId: contact.contactID,
            customData: ((_b = contact.workItemEventData) === null || _b === void 0 ? void 0 : _b.customData) || '',
            closePopoutUponTermination: ((_c = contact.workItemEventData) === null || _c === void 0 ? void 0 : _c.closePopoutUponTermination) || false,
            finalState: true,
            iisHost: ((_d = contact.workItemEventData) === null || _d === void 0 ? void 0 : _d.iisHost) || '',
            inFocus: ((_e = contact.workItemEventData) === null || _e === void 0 ? void 0 : _e.inFocus) || false,
            lastStateChangeTime: contact.lastStateChangeTime,
            lastStateChangeTimeUtc: contact.lastStateChangeTime,
            masterId: contact.contactID,
            omniGroupId: ((_f = contact.workItemEventData) === null || _f === void 0 ? void 0 : _f.omniGroupId) || '',
            parentContactId: ((_g = contact.workItemEventData) === null || _g === void 0 ? void 0 : _g.parenContactId) || '',
            popDestination: ((_h = contact.workItemEventData) === null || _h === void 0 ? void 0 : _h.popDestination) || '',
            popoutWindowHeight: ((_j = contact.workItemEventData) === null || _j === void 0 ? void 0 : _j.popoutWindowHeight) || 0,
            popoutWindowWidth: ((_k = contact.workItemEventData) === null || _k === void 0 ? void 0 : _k.popoutWindowWidth) || 0,
            refusalTimeout: ((_l = contact.workItemEventData) === null || _l === void 0 ? void 0 : _l.refusalTimeout) || 0,
            screenPopUrl: ((_m = contact.workItemEventData) === null || _m === void 0 ? void 0 : _m.screenPopUrl) || '',
            skillId: contact.skill || '',
            startTime: ((_o = contact.workItemEventData) === null || _o === void 0 ? void 0 : _o.startTime) || new Date(),
            startTimeUtc: ((_p = contact.workItemEventData) === null || _p === void 0 ? void 0 : _p.startTime) || new Date(),
            status: WorkItemContactStatus.DISCONNECTED,
            tabTitle: ((_q = contact.workItemEventData) === null || _q === void 0 ? void 0 : _q.tabTitle) || '',
            type: ((_r = contact.workItemEventData) === null || _r === void 0 ? void 0 : _r.type) || 'WorkItemContactEvent',
            url: ((_s = contact.workItemEventData) === null || _s === void 0 ? void 0 : _s.url) || '',
            vcHost: ((_t = contact.workItemEventData) === null || _t === void 0 ? void 0 : _t.vcHost) || '',
            workItemId: ((_u = contact.workItemEventData) === null || _u === void 0 ? void 0 : _u.workItemId) || '',
            workItemPayload: ((_v = contact.workItemEventData) === null || _v === void 0 ? void 0 : _v.workItemPayload) || '',
            workItemType: ((_w = contact.workItemEventData) === null || _w === void 0 ? void 0 : _w.workItemType) || '',
            sessionId: ((_x = contact.workItemEventData) === null || _x === void 0 ? void 0 : _x.sessionId) || '',
        });
    }
    /**
     * Method to remove contact data from all maps and storage
     * @param contact - the contact to remove data for
     * @example - removeContactData(contact)
     */
    removeContactData(contactID) {
        delete this.allContacts[contactID];
        delete this.dispositionsData[contactID];
        delete this.tagsData[contactID];
    }
    /**
     * Method to clear a stuck contact from all maps and storage
     * @param contact - the contact to clear
     * @example
     * ```
     * clearContact(contact)
     * ```
     */
    clearContact(contact) {
        this.logger.info('clearContact', `Clearing ${contact.type} contact: ${contact.contactID}`);
        this.publishContact(contact);
        const contactEvent = this.createContactEventObject(contact);
        this.removeContactData(contact.contactID);
        switch (contact.type) {
            case ContactType.VOICE_CONTACT:
                this.acdSession.callContactEventSubject.next(contactEvent);
                break;
            case ContactType.VOICEMAIL_CONTACT:
                this.acdSession.voiceMailContactEventSubject.next(contactEvent);
                break;
            case ContactType.WORKITEM_CONTACT:
                this.acdSession.workItemContactEventSubject.next(contactEvent);
                break;
            default:
                this.logger.error('clearContact', `Unknown contact type "${contact.type}" for contact: ${JSON.stringify(contact)}`);
                break;
        }
        this.acdSession.onContactEvent.next([contactEvent]);
        this.acdSession.onGetNextEvent.next([JSON.parse(JSON.stringify(contactEvent))]);
    }
    /**
     * Returns whether the agent has any PC dialer calls
     * @example hasAnyPersonalConnectionContact()
     */
    hasAnyPersonalConnectionContact() {
        let hasContact = false;
        const voiceKeys = [...this.voiceContactMap.keys()];
        if (voiceKeys.length > 0) {
            voiceKeys.forEach((voiceKey) => {
                const voiceContact = this.voiceContactMap.get(voiceKey);
                if ((voiceContact === null || voiceContact === void 0 ? void 0 : voiceContact.callType) === CallType.NATURAL_CALLING) {
                    hasContact = true;
                }
            });
        }
        return hasContact;
    }
    /**
     * initialize coBrowse event handler
     * @example coBrowseEventHandler
     */
    coBrowseEventHandler() {
        this.acdSession.coBrowseEvent.subscribe((data) => {
            this.onCoBrowseEvent.next(data);
        });
    }
    /**
     * initialize localpost event handler
     * @example localPostEventHandler
     */
    localPostEventHandler() {
        this.acdSession.localPostEvent.subscribe((data) => {
            this.onLocalPostEvent.next(data);
            this.contactService.sendLocalPostEventData(data);
        });
    }
    /**
     * initialize LiveVoxError notify event handler - forwards the already-validated
     * LiveVoxErrorEvent published by CXoneGetNextAdapter.handleGetNextResponse
     * @example liveVoxErrorNotifyEventHandler
     */
    liveVoxErrorNotifyEventHandler() {
        this.acdSession.onLiveVoxErrorEvent.subscribe((event) => {
            this.onLiveVoxErrorEvent.next(event);
        });
    }
    /**
     * subscribe to auto summary event
     */
    updateAutoSummaryEventHandler() {
        this.acdSession.agentAssistSummarySubject.subscribe((autoSummaryStart) => {
            const isVoiceBioHubEnabled = isVoiceBioHubFeatureEnabled() && FeatureToggleService.instance.getFeatureToggleSync("release-agent-voiceBioHub-AW-24969" /* FeatureToggles.VOICE_BIO_HUB_FEATURE_TOGGLE */);
            if ((autoSummaryStart === null || autoSummaryStart === void 0 ? void 0 : autoSummaryStart.mediaType) === MediaType.VOICE) {
                if (isVoiceBioHubEnabled && (autoSummaryStart === null || autoSummaryStart === void 0 ? void 0 : autoSummaryStart.agentAssistType) === 'voice-bio-hub') {
                    LocalStorageHelper.setItem(StorageKeys.VOICE_BIO_HUB_AGENT_ASSIST, JSON.stringify(autoSummaryStart));
                    this.connectVoiceBioHubWebSocket();
                }
                else {
                    const autoSummaryVoiceInput = { webSocketUri: autoSummaryStart.webSocketUri, contactId: autoSummaryStart.contactId, subscriptions: autoSummaryStart.subscriptions };
                    CXoneClient.instance.autoSummaryService.subscribe(autoSummaryVoiceInput);
                }
            }
        });
    }
    /**
     * connect to websocket for voice bio hub
     */
    connectVoiceBioHubWebSocket() {
        const userInfo = CXoneClient.instance.cxoneUser.getUserInfo();
        const cxoneConfig = CXoneClient.instance.auth.getCXoneConfig();
        const { aahNotificationWssUri } = cxoneConfig;
        if (!CXoneClient.instance.autoSummaryNotificationService.isConnectionCreated) {
            CXoneClient.instance.autoSummaryNotificationService.connect(aahNotificationWssUri);
            const voiceBioInput = { webSocketUri: aahNotificationWssUri, contactId: '', subscriptions: [`${userInfo.icAgentId}_voicebio`], providerId: 'Auto-Summary' };
            CXoneClient.instance.autoSummaryNotificationService.subscribe(voiceBioInput);
        }
    }
    /**
     * subscribe the update agent permissions event
     */
    updatePermissionsEventHandler() {
        this.acdSession.updatePermissionsEventSubject.subscribe(() => {
            this.adminService.getPermissions(true).then(() => {
                if (this.voiceContactMap.size > 0) {
                    this.updateAgentPreference();
                }
            });
        });
    }
    /**
     * Update agent permission for voice contacts
     */
    updateAgentPreference() {
        const keys = [...this.voiceContactMap.keys()]; // Get list of voice contactId's
        keys.forEach((key) => {
            const voiceContact = this.voiceContactMap.get(key);
            if (voiceContact) {
                voiceContact.updateAgentPreference();
                // Invoke updateCallControls method to update button state for main call (first call contact).
                // invoke updateConsultCallControls method to update button state for consult call.
                if (voiceContact.contactID === voiceContact.masterID) {
                    voiceContact.updateCallControls();
                }
                else {
                    this.updateControlsWithNewConsultCall(voiceContact.masterID);
                    voiceContact.updateConsultCallControls();
                }
                this.publishContact(voiceContact);
            }
        });
    }
    /**
     * Method to check if any voice contact is available in VoiceContactMap
     * @example checkAcdContactsAvailable
     */
    checkAcdContactsAvailable() {
        if (this.voiceContactMap.size > 0 || this.voiceMailContactMap.size > 0)
            return true;
        else
            return false;
    }
    /**
     * Method to check whether an Incoming voice contact carrying the Multi-Call Skill (Personal
     * Queue) flag is currently tracked
     *
     * AW-56681 regression fix: gated behind FeatureToggles.MULTIPLE_CALL_HANDLING_FEATURE_TOGGLE,
     * exactly as its sibling isMultiCallScenario() already is. `isMultiCallSkill` is parsed off the
     * CallContactEvent regardless of the toggle, so on a tenant with MCH OFF a server-side
     * MCA-flagged skill still set the flag here — which made the caller in ccf-assignment-panel
     * .slice.ts treat the contact as "MCA, requires manual accept" and skip connectAgentLeg(). With
     * the toggle off there is no MCA Accept banner to recover from that, so the agent leg stayed
     * DIALING and the agent got no audio. Fail-safe to the pre-MCH path on a disabled or unreadable
     * toggle, never the reverse.
     * @example checkIncomingMultiCallSkillContact
     */
    checkIncomingMultiCallSkillContact() {
        if (!FeatureToggleService.instance.getFeatureToggleSync("release-cx-multiple-call-handling-AW-41219" /* FeatureToggles.MULTIPLE_CALL_HANDLING_FEATURE_TOGGLE */)) {
            return false;
        }
        for (const contact of this.voiceContactMap.values()) {
            if (contact.status === CallContactEventStatus.INCOMING && contact.isMultiCallSkill) {
                return true;
            }
        }
        return false;
    }
    /**
    * @example
    */
    checkForExistingContact(contactEvent, contactMap, contactConstructor) {
        let cxoneContact;
        const existingContact = contactMap.get(contactEvent.contactId);
        if (!existingContact) {
            cxoneContact = contactConstructor();
            contactMap.set(contactEvent.contactId, cxoneContact);
            if (contactEvent.screenPopUrl !== '') {
                const screenPop = {
                    contactId: contactEvent.contactId,
                    screenpopUrl: contactEvent.screenPopUrl,
                };
                this.acdSession.screenPopSubject.next(screenPop);
            }
        }
        else {
            cxoneContact = existingContact;
        }
        return cxoneContact;
    }
    /**
     * Method to subscribe the contact event from the agentSession.
     * @example
     * ```
     * contactEventHandler()
     * ```
     */
    contactEventHandler() {
        this.acdSession.onContactEvent.subscribe((contactEvent) => {
            if (this.allContacts && (contactEvent === null || contactEvent === void 0 ? void 0 : contactEvent.ContactID)) {
                this.allContacts[contactEvent.ContactID] = contactEvent;
                if ((contactEvent === null || contactEvent === void 0 ? void 0 : contactEvent.Status) === CallContactEventStatus.DISCONNECTED && (contactEvent === null || contactEvent === void 0 ? void 0 : contactEvent.FinalState)) {
                    delete this.allContacts[contactEvent.ContactID];
                }
            }
        });
    }
    /**
     * Method to subscribe the call contact event from the agentSession.
     */
    callContactEventHandler() {
        this.acdSession.callContactEventSubject.subscribe((callContactEvent) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const existContact = this.voiceContactMap.get(callContactEvent.contactId);
            this.rememberFirstSeenMasterId(callContactEvent);
            let voiceContact;
            // // Create an instance for new contact else get the instance from the Map, if the contact already exist.
            if (!existContact) {
                voiceContact = new CXoneVoiceContact();
                this.voiceContactMap.set(callContactEvent.contactId, voiceContact);
                // Apply any mute state that arrived before this voice contact was created.
                // Handles the MuteEvent/CallContactEvent ordering race on refresh for
                // phone-number login, where the MuteEvent would otherwise be dropped.
                //
                // AW-56681 regression fix: track whether an AUTHORITATIVE mute state was applied here,
                // so the persisted-localStorage fallback further down cannot overwrite it. Both sources
                // below are authoritative (a real MuteEvent, or the agent-level state of a live sibling
                // contact); localStorage is only a last resort for a refresh where neither exists.
                let hasAuthoritativeMuteState = false;
                if (this.pendingMuteState !== null) {
                    voiceContact.updateMuteState(this.pendingMuteState);
                    this.pendingMuteState = null;
                    hasAuthoritativeMuteState = true;
                }
                else {
                    // Mute is agent-level: a newly added leg (e.g. a consult call added while
                    // already muted) must inherit the current agent mute state from an existing
                    // contact, otherwise it shows unmuted until the next MuteEvent.
                    const existingContact = [...this.voiceContactMap.values()].find((contact) => contact !== voiceContact);
                    if (existingContact) {
                        voiceContact.updateMuteState(existingContact.agentMuted);
                        hasAuthoritativeMuteState = true;
                    }
                }
                if (callContactEvent.screenPopUrl !== '') {
                    const screenPop = {
                        contactId: callContactEvent.contactId,
                        screenpopUrl: callContactEvent.screenPopUrl,
                    };
                    this.acdSession.screenPopSubject.next(screenPop);
                }
                this.voiceCallRecordServicePollingEvent.next(true);
                // Restore persisted mute state on reconnect (page refresh) for ACTIVE calls.
                // Server does not re-send MuteEvent on reconnect, so localStorage is the
                // only way to recover the state. INCOMING/HOLDING calls are excluded:
                // incoming calls haven't been answered yet and held calls are not muted.
                //
                // AW-56681 regression fix, two parts:
                //  1. Only consult localStorage when nothing authoritative was applied above. This block
                //     used to run unconditionally and clobber a live MuteEvent - muteEventHandler caches
                //     into pendingMuteState but never writes localStorage, so on refresh a genuine
                //     MuteEvent(agentMuted=false) was applied and then overwritten back to a stale
                //     true, showing a live call as muted until the agent pressed mute twice.
                //  2. Only restore a value stamped with the CURRENT ACD session. The key is otherwise
                //     removed only when the last contact reaches its final DISCONNECTED state, so an
                //     agent who muted and then closed the browser left it behind - and on a shared
                //     workstation the next agent to log in had their first ACTIVE call restored muted.
                //     A new login means a new ACD session id, so the stamp mismatches and the stale
                //     entry is dropped rather than applied.
                if (callContactEvent.status === CallContactEventStatus.ACTIVE && !hasAuthoritativeMuteState) {
                    const persistedMute = LocalStorageHelper.getItem(StorageKeys.AGENT_MUTED_STATE);
                    // localStorage is untrusted input: guard against an empty/corrupted value so a bad
                    // entry can't throw and abort the contact-event handler.
                    if (persistedMute !== null && persistedMute !== '') {
                        try {
                            const parsedMute = JSON.parse(persistedMute);
                            const currentSessionId = LocalStorageHelper.getItem(StorageKeys.ACD_SESSION_ID);
                            // Anything that is not a { sessionId, muted } stamp written by this build (a bare
                            // boolean from an older build included) is treated as stale and discarded.
                            if (parsedMute &&
                                typeof parsedMute === 'object' &&
                                typeof parsedMute.muted === 'boolean' &&
                                !!currentSessionId &&
                                parsedMute.sessionId === currentSessionId) {
                                voiceContact.updateMuteState(parsedMute.muted);
                            }
                            else {
                                LocalStorageHelper.removeItem(StorageKeys.AGENT_MUTED_STATE);
                            }
                        }
                        catch (_b) {
                            // Corrupted persisted value ΓÇö ignore and leave the default mute state.
                        }
                    }
                }
            }
            else {
                voiceContact = existContact;
            }
            const contactKeys = [...this.voiceContactMap.keys()]; // get the array of keys from Map to check length of contacts
            // AW-63106: pre-assign this contact's callType/isMultiCallSkill from the raw event before
            // evaluating isMultiCallScenario() below. assignToCurrentContact() (called inside
            // updateCallControls/updateConsultCallControls further down) hasn't run yet for a
            // brand-new contact, so without this the scenario check would read this contact's still-
            // default fields and under-count it.
            voiceContact.callType = callContactEvent.callType;
            voiceContact.isMultiCallSkill = callContactEvent.isMultiCallSkill || voiceContact.isMultiCallSkill;
            // A MasterID pointing to a contact this agent's session never separately tracks is a
            // normal Personal Queue/reskilled-delivery signalling detail — it only means "this leg is
            // a genuine consult sub-leg" when that master IS an actually-tracked contact.
            const masterIsUntrackedContact = callContactEvent.masterId !== callContactEvent.contactId &&
                !this.voiceContactMap.has(callContactEvent.masterId);
            // Check the condition to update the button states for main call or consult call
            // Invoke updateCallControls method when perform the action for first call contact
            // Invoke updateConsultCallControls method when perform the action for consult call
            if (callContactEvent.masterId === callContactEvent.contactId ||
                (contactKeys.length === 1 &&
                    masterIsUntrackedContact &&
                    (callContactEvent.callType === CallType.REGULAR ||
                        callContactEvent.callType === CallType.RESKILL_PROXY ||
                        callContactEvent.callType === CallType.CONSULT ||
                        callContactEvent.callType === CallType.PERSONAL_QUEUE ||
                        callContactEvent.callType === CallType.TAKE_OVER)) ||
                // AW-63106: once a genuine multi-call scenario is confirmed, the size===1 fallback above
                // no longer applies, but a masterID-mismatched independent call arriving alongside
                // another one must still be recognized as independent — not downgraded to the
                // sub-leg/consult control path just because a second untracked-master call now exists.
                // Deliberately narrower than the size===1 fallback's callType list: only REGULAR and
                // PERSONAL_QUEUE are independent top-level call types (mirrors isMultiCallScenario()'s
                // own definition below). CONSULT/TAKE_OVER/RESKILL_PROXY are always sub-legs of a master
                // call — if their master has been evicted from voiceContactMap while another independent
                // call is active, that is master-eviction, not evidence the sub-leg is now a main call.
                (masterIsUntrackedContact &&
                    this.isMultiCallScenario() &&
                    (callContactEvent.callType === CallType.REGULAR ||
                        callContactEvent.callType === CallType.PERSONAL_QUEUE))) {
                voiceContact.updateCallControls(callContactEvent);
                //if we have more than 1 contact and user update the state of first call contact then we have to disable
                //the first call contact transfer button.
                // Only a genuine consult leg should suppress the master call's transfer button.
                // A consult leg is identified by contactID !== masterID (it hangs off a master call).
                // Independent calls — both MCA Regular calls AND plain non-MCA Regular calls on hold —
                // have contactID === masterID and must NOT be treated as a consult; otherwise the
                // active call's transfer button is wrongly disabled while another independent call is held.
                if (contactKeys.length > 1 && callContactEvent.masterId === callContactEvent.contactId) {
                    // AW-63106: a consult/sub-leg must belong to THIS call (masterID === callContactEvent.masterId)
                    // to suppress its transfer button — otherwise a genuine consult leg spun off from a
                    // DIFFERENT independent call (e.g. a reskilled call landing on this agent) leaks across
                    // call boundaries and wrongly disables transfer on an unrelated call.
                    const hasActualConsult = contactKeys.some((key) => {
                        const otherContact = this.voiceContactMap.get(key);
                        return !!otherContact && otherContact.contactID !== callContactEvent.contactId &&
                            otherContact.contactID !== otherContact.masterID &&
                            otherContact.masterID === callContactEvent.masterId;
                    });
                    if (hasActualConsult) {
                        voiceContact.updateControlsOnConsultCallStarted();
                    }
                }
                // we need to fetch dispositions unconditionally. If call is ended and user refreshes, we still need the disposotion list
                const isSmartReachFTEnabled = (_a = FeatureToggleService.instance.getFeatureToggleSync("release-acd-smartreach-voice-pmi-OB-18214" /* FeatureToggles.SMARTREACH_VOICE_PMI_FEATURE_TOGGLE */)) !== null && _a !== void 0 ? _a : false;
                // If smart reach feature toggle is enabled and the outbound strategy is smart reach then we need to fetch dispositions from smart reach otherwise we can fetch from regular disposition api
                if (isSmartReachFTEnabled) {
                    this.skillService.getSkillById(callContactEvent.skill)
                        .then((skillResponse) => {
                        if ((skillResponse === null || skillResponse === void 0 ? void 0 : skillResponse.outboundStrategy) === OutboundStrategy.SMART_REACH) {
                            this.getSmartReachDispositionsOnContactEvent(callContactEvent.skill, callContactEvent.contactId, MediaType.VOICE);
                        }
                        else {
                            this.getDispositionsOnContactEvent(callContactEvent.skill, callContactEvent.contactId, MediaType.VOICE);
                        }
                    })
                        .catch((error) => {
                        this.logger.error('callContactEventHandler', `Error fetching skill details for skillId: ${callContactEvent.skill}, error: ${error}`);
                    });
                }
                else {
                    this.getDispositionsOnContactEvent(callContactEvent.skill, callContactEvent.contactId, MediaType.VOICE);
                }
                this.getTagsOnContactEvent(callContactEvent.skill, callContactEvent.contactId);
            }
            else {
                //if we have more than 1 contact and user update the state of second call contact then we have to disable
                //the first call contact transfer button
                this.updateControlsWithNewConsultCall(callContactEvent.masterId);
                voiceContact.updateConsultCallControls(callContactEvent);
            }
            // Resolve skill metadata BEFORE publishing, so this one emission carries it and no second,
            // corrective emission is needed. The guard is on the await itself rather than relying on an
            // early return inside enrichWithSkillDetails: `await undefined` still defers a microtask,
            // and with the toggle off the ordering here must be byte-identical to today's.
            //
            // Costs nothing on any event after a contact's first — the residency guard short-circuits
            // before any HTTP call.
            // Set when a same-batch sibling event (see below) already owns publishing the live
            // object's current state, so the fallthrough below must not re-emit it — only the epic's
            // own double-publish-per-event rollback path (the `!isDedupeEnabled()` branches elsewhere)
            // is allowed to produce a second emission; this is not that.
            let liveStateOwnedBySibling = false;
            if (this.isDedupeEnabled()) {
                // Snapshot THIS event's own state before awaiting. cxone-get-next-adapter dispatches a
                // get-next batch via `events.forEach(async ...)`, which never awaits between iterations,
                // and checkForExistingContact (above) returns the SAME voiceContact instance for every
                // event on this contactId. So a sibling event bundled in the same batch (e.g. get-next
                // pairing Dialing with Active on agent-leg-connect) can run its own synchronous
                // updateCallControls — overwriting this status — while this handler is still suspended
                // here. Without the snapshot, that earlier status is silently never published. AW-66141.
                const ownEventSnapshot = this.cloneVoiceContact(voiceContact);
                yield this.enrichWithSkillDetails(voiceContact);
                if (voiceContact.status !== ownEventSnapshot.status) {
                    // AW-67175: nothing may be emitted after a contact's final Disconnected has been emitted.
                    // A same-batch event's earlier snapshot (e.g. a Holding that led a transfer-complete
                    // poll) that resumes after that arrives once the reducer has already removed the
                    // contact, and re-adds it as a live, non-final contact that never ends.
                    //
                    // Deliberately keyed on "the final has been EMITTED", not on the live contact merely
                    // being final: a snapshot that resumes BEFORE the final is emitted (e.g. a Dialing that
                    // SNOW needs to map an outbound call) is still correctly ordered and must go out.
                    const finalAlreadyEmitted = this.finalEmittedFor.has(voiceContact);
                    if (!finalAlreadyEmitted) {
                        // Emit directly rather than through publishContact: publishContact also re-keys
                        // voiceContactMap from whatever it's given, and this snapshot is already stale by
                        // definition — the sibling event's own publishContact call is what correctly owns the
                        // live map entry. Re-publishing through it here would clobber that with our stale copy.
                        this.copySkillMetadata(voiceContact, ownEventSnapshot);
                        this.recordFinalEmission(ownEventSnapshot, voiceContact);
                        this.voiceContactUpdateEvent.next(ownEventSnapshot);
                    }
                    liveStateOwnedBySibling = true;
                }
            }
            // Stays synchronous, and the await stays OUTSIDE it, so the cleanup below keeps its current
            // order relative to the emission.
            if (this.isSupersededByFinal(voiceContact)) {
                // AW-67175: this contact's final Disconnected has already been emitted, and a later
                // same-batch event left the shared instance in a non-final state. Publishing it, or keeping
                // it in voiceContactMap, would let the UI recreate an ended contact — so do neither. The
                // terminal cleanup below still runs, as it depends on this event alone.
                this.voiceContactMap.delete(voiceContact.contactID);
            }
            else if (liveStateOwnedBySibling) {
                // The sibling event's own fallthrough publish below will emit this exact instance with
                // this exact (newer) state a moment later — emitting it again here would just be a
                // second, redundant Active publish for the SAME CallContactEvent, which is precisely what
                // this epic exists to remove. Still keep voiceContactMap in sync: cheap and idempotent,
                // since it's the same reference the sibling's own publishContact call will set regardless.
                this.setVoiceContactInMap(voiceContact);
            }
            else {
                this.publishContact(voiceContact);
            }
            if (callContactEvent.status === CallContactEventStatus.DISCONNECTED && callContactEvent.finalState) {
                delete this.dispositionsData[callContactEvent.contactId];
                delete this.tagsData[callContactEvent.contactId];
                this.removeBioHubFromLocalStorage(contactKeys);
                this.removeVoiceTranscriptionFromIndexedDB(callContactEvent.contactId, callContactEvent.masterId);
                if (contactKeys.length === 1) {
                    this.voiceCallRecordServicePollingEvent.next(false);
                    LocalStorageHelper.removeItem(StorageKeys.AGENT_MUTED_STATE);
                }
            }
        }));
    }
    ;
    /**
     * Method to subscribe the supervisor (live/silent monitoring) contact event from the agentSession.
     * Unlike a regular voice contact, a supervisor contact is never rendered or dispositioned by the agent -
     * it only needs to be tracked so that it can be ended before a subsequent agent state change.
     */
    supervisorContactEventHandler() {
        this.acdSession.supervisorContactEventSubject.subscribe((supervisorContactEvent) => {
            const isSupervisorMonitorStateChangeFTEnabled = FeatureToggleService.instance.getFeatureToggleSync("release-cxa-supervisor-monitor-state-change-AW-51203" /* FeatureToggles.SUPERVISOR_MONITOR_STATE_CHANGE_FEATURE_TOGGLE */);
            if (!isSupervisorMonitorStateChangeFTEnabled) {
                return;
            }
            // Unlike a regular CallContactEvent, a SupervisorContact event never transitions its status to
            // Disconnected - it stays Active for the life of the monitoring session, and only finalState flips
            // to true once monitoring has actually ended. finalState alone is the authoritative completion signal.
            if (supervisorContactEvent.finalState) {
                this.supervisorContactSet.delete(supervisorContactEvent.contactId);
            }
            else {
                this.supervisorContactSet.add(supervisorContactEvent.contactId);
            }
        });
    }
    /**
     * Method to subscribe to agent session lifecycle changes and clear any tracked supervisor
     * (live/silent monitoring) contact on session end or the start of a new session. The backend does
     * not reliably emit a matching Disconnected event for a supervisor contact, so without this a stale
     * entry from a prior session could survive and incorrectly trigger endAgentLeg() in a later session
     * that isn't actually being monitored.
     */
    agentSessionChangeHandler() {
        this.acdSession.onAgentSessionChange.subscribe((agentSessionChange) => {
            const isSupervisorMonitorStateChangeFTEnabled = FeatureToggleService.instance.getFeatureToggleSync("release-cxa-supervisor-monitor-state-change-AW-51203" /* FeatureToggles.SUPERVISOR_MONITOR_STATE_CHANGE_FEATURE_TOGGLE */);
            if (!isSupervisorMonitorStateChangeFTEnabled) {
                return;
            }
            if (agentSessionChange.status === AgentSessionStatus.SESSION_START || agentSessionChange.status === AgentSessionStatus.SESSION_END) {
                this.clearActiveSupervisorContacts();
            }
        });
    }
    /**
     * Returns whether a supervisor (live/silent monitoring) contact is currently active on this session.
     * @example
     * ```
     * const isMonitored = contactManager.hasActiveSupervisorContact();
     * ```
     */
    hasActiveSupervisorContact() {
        return this.supervisorContactSet.size > 0;
    }
    /**
     * Clears all tracked supervisor (live/silent monitoring) contacts.
     * Called once the agent phone leg has been ended, since the backend does not
     * reliably emit a matching Disconnected event for a supervisor contact.
     * @example
     * ```
     * contactManager.clearActiveSupervisorContacts();
     * ```
     */
    clearActiveSupervisorContacts() {
        this.supervisorContactSet.clear();
    }
    /**
     * Removes voice transcription data from IndexedDB for a specific contact.
     *
     * With the V3 multi-party toggle (AW-65928) the transcript is keyed by the master contact and
     * shared by every conference leg, so a single leg ending — including the original contact —
     * must not wipe it. It is only removed once no voice contact of that call remains.
     * @param contactId - contactId for which voice transcription to be removed
     * @param masterId - masterId of the ended contact; the key its transcript is stored under with V3 enabled
     */
    removeVoiceTranscriptionFromIndexedDB(contactId, masterId) {
        return __awaiter(this, void 0, void 0, function* () {
            // Taken (and forgotten) up front so the maps are cleaned even when transcripts are disabled.
            const rememberedMasterId = this.firstSeenMasterIds.get(contactId);
            this.firstSeenMasterIds.delete(contactId);
            this.placeholderMasterIds.delete(contactId);
            if (yield isVoiceTranscriptEnabledAndToggledOn()) {
                const isV3MultiPartyEnabled = FeatureToggleService.instance.getFeatureToggleSync("release-agent-multiparty-voice-transcription-AW-62180" /* FeatureToggles.VOICE_TRANSCRIPT_V3_FEATURE_TOGGLE */);
                if (!isV3MultiPartyEnabled) {
                    this.onVoiceTranscriptContactEndEvent.next({ contactId });
                    return;
                }
                const transcriptContactId = (rememberedMasterId || masterId || contactId).toString();
                const isCallStillActive = [...this.voiceContactMap.values()].some((remaining) => {
                    var _a, _b;
                    return remaining.contactID !== contactId
                        && !remaining.finalState
                        && ((_a = remaining.status) === null || _a === void 0 ? void 0 : _a.toLowerCase()) !== VoiceContactStatus.DISCONNECTED
                        && (((_b = this.firstSeenMasterIds.get(remaining.contactID)) !== null && _b !== void 0 ? _b : remaining.masterID) === transcriptContactId
                            || remaining.contactID === transcriptContactId);
                });
                if (!isCallStillActive) {
                    this.onVoiceTranscriptContactEndEvent.next({ contactId: transcriptContactId });
                }
            }
        });
    }
    ;
    /**
     * Remembers the master id first reported for a voice leg. If that event carried no master (the leg's
     * own id is only a placeholder), the first real master on a later non-disconnect event replaces it;
     * after that, later reports are ignored, since a stale master has been seen on disconnect events.
     * @param callContactEvent - The voice contact event.
     * @example this.rememberFirstSeenMasterId(callContactEvent)
     */
    rememberFirstSeenMasterId(callContactEvent) {
        const { contactId, masterId, status } = callContactEvent;
        if (!this.firstSeenMasterIds.has(contactId)) {
            this.firstSeenMasterIds.set(contactId, (masterId || contactId).toString());
            if (!masterId) {
                this.placeholderMasterIds.add(contactId);
            }
        }
        else if (masterId && this.placeholderMasterIds.has(contactId) && status !== CallContactEventStatus.DISCONNECTED) {
            this.firstSeenMasterIds.set(contactId, masterId.toString());
            this.placeholderMasterIds.delete(contactId);
        }
    }
    /** Method to remove bio hub data from local storage when call gets disconnected
     * @param contactKeys - contact keys available in voice contact map
     * @example removeBioHubFromLocalStorage(contactKeys)
     **/
    removeBioHubFromLocalStorage(contactKeys) {
        const isVoiceBioHubEnabled = isVoiceBioHubFeatureEnabled() && FeatureToggleService.instance.getFeatureToggleSync("release-agent-voiceBioHub-AW-24969" /* FeatureToggles.VOICE_BIO_HUB_FEATURE_TOGGLE */);
        if (isVoiceBioHubEnabled && contactKeys.length === 1) {
            const voicBioAgentAssistData = LocalStorageHelper.getItem(StorageKeys.VOICE_BIO_HUB_AGENT_ASSIST);
            if (voicBioAgentAssistData) {
                LocalStorageHelper.removeItem(StorageKeys.VOICE_BIO_HUB_AGENT_ASSIST);
                LocalStorageHelper.removeItem(StorageKeys.VOICE_BIO_HUB_DATA);
            }
        }
    }
    ;
    /**
     * Method to subscribe the workitem contact event from the agentSession.
     */
    workItemContactEventHandler() {
        this.acdSession.workItemContactEventSubject.subscribe((workItemContactEvent) => __awaiter(this, void 0, void 0, function* () {
            const workItemContact = this.checkForExistingContact(workItemContactEvent, this.workItemContactMap, () => new CXoneWorkItemContact());
            const { skillId = '', contactId } = workItemContactEvent;
            this.getDispositionsOnContactEvent(skillId, contactId, MediaType.WORKITEM);
            this.getTagsOnContactEvent(skillId, contactId);
            workItemContact.updateWorkitemControls(workItemContactEvent);
            // Resolve skill metadata BEFORE publishing, so this one emission carries it and no second,
            // corrective emission is needed. updateWorkitemControls has already run, so skill, status
            // and finalState are populated — which the channel policy needs.
            //
            // The guard is on the await itself rather than relying on the early return inside
            // enrichWithSkillDetails: `await undefined` still defers a microtask, and with the toggle
            // off the ordering here must be byte-identical to today's.
            if (this.isDedupeEnabled()) {
                yield this.enrichWithSkillDetails(workItemContact);
            }
            this.publishContact(workItemContact);
            if (workItemContactEvent.status === WorkItemContactStatus.DISCONNECTED && workItemContactEvent.finalState) {
                delete this.dispositionsData[workItemContactEvent.contactId];
                delete this.tagsData[workItemContactEvent.contactId];
            }
        }));
    }
    /**
     * Method to subscribe the voicemail contact event from the agentSession.
     */
    voicemailContactEventHandler() {
        this.acdSession.voiceMailContactEventSubject.subscribe((voicemailContactEvent) => __awaiter(this, void 0, void 0, function* () {
            const voicemailContact = this.checkForExistingContact(voicemailContactEvent, this.voiceMailContactMap, () => new CXoneVoiceMailContact());
            const { skill = '', contactId } = voicemailContactEvent;
            this.getDispositionsOnContactEvent(skill, contactId, MediaType.VOICEMAIL);
            this.getTagsOnContactEvent(skill, contactId);
            voicemailContact.updateVoiceMailControls(voicemailContactEvent);
            // Resolve skill metadata BEFORE publishing, so this one emission carries it.
            // updateVoiceMailControls has already run, so voiceMailEventData, type and skill are
            // populated — which the channel policy reads. The guard is on the await itself so the
            // toggle-off ordering stays byte-identical to today's.
            if (this.isDedupeEnabled()) {
                yield this.enrichWithSkillDetails(voicemailContact);
            }
            this.publishContact(voicemailContact);
            if (voicemailContactEvent.status === VoiceMailContactEventStatus.DISCARDED && voicemailContactEvent.finalState) {
                delete this.dispositionsData[voicemailContactEvent.contactId];
                delete this.tagsData[voicemailContactEvent.contactId];
            }
        }));
    }
    /**
     * Method to subscribe the conference call event from the agentSession.
     */
    conferenceCallEventHandler() {
        this.acdSession.conferenceCallEvent.subscribe((conferenceNo) => {
            this.conferenceCallEvent.next(conferenceNo);
        });
    }
    /**
    * Method to get dispositions for CallContactEvents and VoiceMailContactEvents
    * @param skillId - skill id to fetch the skill dispositions
    * @param contactId - used to fetch disposition
    * @example -
    * ```
    *getDispositionsOnContactEvent(1234, 4321, MediaType.VOICE)
    * ```
    */
    getDispositionsOnContactEvent(skillId, contactId, mediaType) {
        if (this.dispositionsData[contactId]) {
            if (this.dispositionsData[contactId].length > 0) {
                this.onDispositionEvent.next(this.dispositionsData[contactId]);
            }
        }
        else {
            this.dispositionsData[contactId] = [];
            this.dispositionService
                .getDispositions(skillId, mediaType, contactId)
                .then((data) => {
                this.dispositionsData[contactId] = data;
                this.onDispositionEvent.next(data);
            })
                .catch((error) => {
                delete this.dispositionsData[contactId];
                this.onDispositionEvent.next(error);
            });
        }
    }
    /**
    * Method to get Smartreach dispositions for CallContactEvents
    * @param skillId - skill id to fetch the skill dispositions
    * @param contactId - used to fetch disposition
    * @param mediaType - media type to fetch the dispositions
    * @example -
    * ```
    *getSmartReachDispositionsOnContactEvent(1234, 4321, MediaType.VOICE)
    * ```
    */
    getSmartReachDispositionsOnContactEvent(skillId, contactId, mediaType) {
        if (this.dispositionsData[contactId] && this.dispositionsData[contactId].length > 0) {
            this.onDispositionEvent.next(this.dispositionsData[contactId]);
        }
        else {
            this.dispositionsData[contactId] = [];
            this.dispositionService
                .getDispositionsWithCategories(skillId, mediaType, contactId)
                .then((data) => {
                this.dispositionsData[contactId] = data;
                this.onDispositionEvent.next(data);
            })
                .catch((error) => {
                delete this.dispositionsData[contactId];
                this.onDispositionEvent.next(error);
            });
        }
    }
    /**
    * Method to get tags for CallContactEvents and VoiceMailContactEvents
    * @param skillId - skill id to fetch the skill tags
    * @param contactId - contactId to be set on tags
    * @example -
    * ```
    *getTagsOnContactEvent(1234, 4321)
    * ```
    */
    getTagsOnContactEvent(skillId, contactId) {
        if (this.tagsData[contactId]) {
            if (this.tagsData[contactId].tags) {
                this.onTagsEvent.next(this.tagsData[contactId]);
            }
        }
        else {
            this.tagsData[contactId] = {};
            this.dispositionService
                .getTags(skillId || '')
                .then((data) => {
                const tags = data;
                tags.contactId = contactId;
                this.tagsData[contactId] = tags;
                this.onTagsEvent.next(tags);
            })
                .catch((error) => {
                delete this.tagsData[contactId];
                this.onTagsEvent.next(error);
            });
        }
    }
    /**
    * Method to update call controls state if new consult call started and publish for primary contact
    * @param masterID - skill id to fetch the skill details
    * @example -
    * ```
    *updateControlsWithNewConsultCall('1234')
    * ```
    */
    updateControlsWithNewConsultCall(masterID) {
        const primaryCallContact = this.voiceContactMap.get(masterID);
        if (primaryCallContact) {
            primaryCallContact.updateControlsOnConsultCallStarted();
            this.publishContact(primaryCallContact);
        }
        ;
    }
    /**
     * Used to get the disposition based on the skill id provided
     * @param skillId - skill id to fetch the skill details
     * @example -
     * ```
     * cxoneClient.contactManager.getDispositions("123456");
     * ```
     */
    getDispositions(skillId, mediaType) {
        return this.dispositionService.getDispositions(skillId, mediaType);
    }
    /**
     * Used to get the disposition based on the skill id provided
     * @param skillId - skill id to fetch the skill details
     * @param mediaType - media type
     * @example -
     * ```
     * cxoneClient.contactManager.getDispositionsWithCategories("123456");
     * ```
     */
    getDispositionsWithCategories(skillId, mediaType) {
        return this.dispositionService.getDispositionsWithCategories(skillId, mediaType);
    }
    /**
     * Used to save the disposition data provided
     * @param contactId - contact id for disposition
     * @param dispositionPayload - payload
     * @example -
     * ```
     * cxoneClient.contactManager.saveDisposition("123456",{primaryDispositionId: 456789, primaryDispositionNotes: "test notes"});
     * ```
     */
    saveDisposition(contactId, dispositionPayload) {
        if (!contactId ||
            !dispositionPayload.primaryDispositionId) {
            return Promise.reject(new CXoneSdkError(CXoneSdkErrorType.INVALID_METHOD_PARMS, 'Missing required fields'));
        }
        else {
            return this.dispositionService.saveDisposition(contactId, dispositionPayload);
        }
    }
    /**
     * Method to subscribe the mute event from the agentSession
     */
    muteEventHandler() {
        this.acdSession.muteEventSubject.subscribe((event) => {
            if (this.voiceContactMap.size > 0) {
                this.pendingMuteState = null;
                this.updateMuteState(event.agentMuted);
            }
            else {
                // The voice contact does not exist yet (MuteEvent arrived before the
                // CallContactEvent in the get-next refresh batch). Cache the mute state so
                // callContactEventHandler can apply it when the voice contact is created.
                this.pendingMuteState = event.agentMuted;
            }
        });
    }
    /**
     * MCH (AW-63605): true when more than one INDEPENDENT top-level call is currently tracked —
     * mirrors the React layer's selectIsMultiCallScenario definition exactly (both count
     * `callType === Regular || PersonalQueue`; NaturalCalling/outbound calls are explicitly out of
     * scope for this check, per AW-63118 rev.3). SDK-level flicker suppression must key off this
     * SESSION-WIDE scenario, not a single contact's own isMultiCallSkill flag, so a mixed-mode
     * session (a non-MCA call held alongside an active MCA call) suppresses the flicker identically
     * for both call types.
     *
     * AW-63118 (rev.3): gated behind FeatureToggles.MULTIPLE_CALL_HANDLING_FEATURE_TOGGLE and
     * anchored to at least one tracked contact actually carrying isMultiCallSkill=true. Previously
     * this method was ungated, count-only, and also counted NaturalCalling calls (a definitional
     * drift from the React selector, which never did) — three issues fixed together here: an active
     * off-path regression (the toggle had no effect here), a false-positive gap (a non-MCH
     * consult/transfer leg alone could trip it), and this NaturalCalling drift. This formula must
     * stay in sync with selectIsMultiCallScenario in ccf-assignment-panel.slice.ts, which already
     * cross-references this method by name.
     *
     * AW-63106: PersonalQueue added alongside Regular — a reskilled call is delivered with
     * `CallType.PersonalQueue`, and excluding it here left a genuine Regular + PersonalQueue
     * multi-call scenario undetected.
     * @returns true when more than one independent call is tracked
     * @example - this.isMultiCallScenario()
     */
    isMultiCallScenario() {
        if (!FeatureToggleService.instance.getFeatureToggleSync("release-cx-multiple-call-handling-AW-41219" /* FeatureToggles.MULTIPLE_CALL_HANDLING_FEATURE_TOGGLE */)) {
            return false;
        }
        let independentCallCount = 0;
        let hasMcaContact = false;
        for (const contact of this.voiceContactMap.values()) {
            // AW-63106: a Personal Queue delivery (reskilled call) is just as much an independent
            // top-level call as a Regular one — excluding it here left a genuine Regular + PersonalQueue
            // multi-call scenario undetected.
            if ((contact === null || contact === void 0 ? void 0 : contact.callType) === CallType.REGULAR || (contact === null || contact === void 0 ? void 0 : contact.callType) === CallType.PERSONAL_QUEUE) {
                independentCallCount++;
                if (contact === null || contact === void 0 ? void 0 : contact.isMultiCallSkill) {
                    hasMcaContact = true;
                }
            }
        }
        return independentCallCount > 1 && hasMcaContact;
    }
    /**
     * Update Mute button state for voice contacts.
     * Agent mute is a global (session-level) operation, so mute/unmute applies to EVERY call
     * routed to the agent — including MCA (multi-call) calls that are currently on hold. Each
     * contact therefore carries the agent's mute state so it is reflected when that call becomes
     * active (e.g. on resume / switch).
     */
    updateMuteState(isAgentMuted) {
        const keys = [...this.voiceContactMap.keys()];
        keys.forEach((key) => {
            const voiceContact = this.voiceContactMap.get(key);
            if (!voiceContact)
                return;
            // MCA: a held call in a multi-call scenario still tracks the agent's mute state (mute is
            // global), but we skip updateCallControls()/publish for it here. Recomputing call controls
            // would reset `mute.isEnable` back to true via initiateButtonStates() and publish a redundant
            // Redux update, causing the held tile to flicker. The carried state is applied on its next
            // resume event, so a resumed call correctly shows muted/unmuted to match the agent.
            // MCH (AW-63605): gated on the SESSION-WIDE scenario (isMultiCallScenario), not this contact's
            // own isMultiCallSkill flag — see isMultiCallScenario's doc comment for why.
            const isHeldInMultiCallScenario = this.isMultiCallScenario() &&
                voiceContact.status === CallContactEventStatus.HOLDING;
            if (isHeldInMultiCallScenario) {
                voiceContact.updateMuteState(isAgentMuted);
                return;
            }
            voiceContact.updateMuteState(isAgentMuted);
            if (voiceContact.contactID === voiceContact.masterID || (keys.length === 1 && voiceContact.masterID !== voiceContact.contactID && (voiceContact.callType === CallType.REGULAR || voiceContact.callType === CallType.PERSONAL_QUEUE || voiceContact.callType === CallType.RESKILL_PROXY || voiceContact.callType === CallType.CONSULT))) {
                voiceContact.updateCallControls();
            }
            else {
                this.updateControlsWithNewConsultCall(voiceContact.masterID);
                voiceContact.updateConsultCallControls();
            }
            this.publishContact(voiceContact);
        });
        // Persist mute state so it can be restored after a page refresh.
        // Server only sends MuteEvent on state changes, not on reconnect.
        // AW-56681: stamped with the current ACD session id so the restore path can tell a same-session
        // refresh (restore) from a leftover entry belonging to a previous login (discard) - see
        // callContactEventHandler's restore block for why that distinction matters.
        LocalStorageHelper.setItem(StorageKeys.AGENT_MUTED_STATE, JSON.stringify({ sessionId: LocalStorageHelper.getItem(StorageKeys.ACD_SESSION_ID), muted: isAgentMuted }));
    }
    /**
     * Update the record state for voice contacts.
     * @param isRecording - boolean value to indicate if the call is being recorded
     * @param contactId - the specific contact this recording notification is for. Unlike agent mute
     *   (a true session-level state — the agent's own mic applies to every call), a recording/
     *   masking transition belongs to ONE specific call. When contactId resolves to a tracked
     *   contact, only that call's own legs (everything sharing its masterID, e.g. a conference's
     *   members) are updated — every other independent call is left untouched. Falling back to the
     *   old broadcast-to-everyone behavior when contactId is omitted/unresolved preserves the
     *   original (pre-MCH, single-call) behavior for any caller that can't supply one.
     * @example
     * ```
     * contactManager.updateVoiceCallRecordState(true, '12345');
     * ```
     */
    updateVoiceCallRecordState(isRecording, contactId) {
        const targetContact = contactId ? this.voiceContactMap.get(contactId) : undefined;
        const targetMasterID = targetContact === null || targetContact === void 0 ? void 0 : targetContact.masterID;
        // Gated directly on the toggle (not isMultiCallScenario(), which additionally requires 2+
        // independent top-level legs plus an isMultiCallSkill contact and would leave a single
        // ordinary conference/warm-transfer call un-scoped) — contactId is always supplied by the
        // caller regardless of the toggle, so without this gate every such call would get scoped
        // even with the MCH kill switch off, reverting the pre-MCH broadcast-to-everyone behavior.
        const isMchEnabled = FeatureToggleService.instance.getFeatureToggleSync("release-cx-multiple-call-handling-AW-41219" /* FeatureToggles.MULTIPLE_CALL_HANDLING_FEATURE_TOGGLE */);
        for (const voiceContact of this.voiceContactMap.values()) {
            if (!voiceContact)
                continue;
            // MCH: a recording/masking notification is scoped to the specific call it names (and that
            // call's own legs, grouped by masterID) — skip every contact belonging to a different,
            // independent call entirely instead of broadcasting this call's state onto it.
            if (isMchEnabled && targetMasterID && voiceContact.masterID !== targetMasterID)
                continue;
            // MCH (AW-63605): recording is also a global, session-level state (like mute), so mirror
            // updateMuteState's flicker-suppression guard here — a held call (either call type) in a
            // multi-call scenario should not have its call controls recomputed/republished until it
            // resumes. Previously this method had no such guard for either call type.
            const isHeldInMultiCallScenario = this.isMultiCallScenario() &&
                voiceContact.status === CallContactEventStatus.HOLDING;
            if (isHeldInMultiCallScenario) {
                voiceContact.updateVoiceCallRecordState(isRecording);
                continue;
            }
            voiceContact.updateVoiceCallRecordState(isRecording);
            const isMainCall = voiceContact.contactID === voiceContact.masterID ||
                (this.voiceContactMap.size === 1 &&
                    voiceContact.masterID !== voiceContact.contactID &&
                    [
                        CallType.REGULAR,
                        CallType.PERSONAL_QUEUE,
                        CallType.RESKILL_PROXY,
                        CallType.CONSULT
                    ].includes(voiceContact.callType));
            if (isMainCall) {
                voiceContact.updateCallControls();
            }
            else {
                this.updateControlsWithNewConsultCall(voiceContact.masterID);
                voiceContact.updateConsultCallControls();
            }
            this.publishContact(voiceContact);
        }
    }
    /**
     * set / delete / find the voicemail contacts in map using contactID.
     * @param contact - cxone voicemail contact details
     */
    setVoiceMailContactInMap(contact) {
        const voiceMailData = contact.voiceMailEventData;
        // A voicemail contact with no event data cannot be keyed or classified, and every field below
        // reads through it. Production always has it: the only way into voiceMailContactMap is the
        // `set(voiceMailData.contactId, contact)` below, so a resident contact always carries it. This
        // guards the async path, where a deferred publish can be handed a contact taken from the map
        // rather than the one the event created.
        //
        // Logged rather than returning silently: if this ever does fire it is unexpected, and the
        // alternative to the guard is an unhandled rejection that takes out the voicemail handler with
        // no breadcrumb explaining why.
        if (!voiceMailData) {
            this.logger.warn('setVoiceMailContactInMap', `Voicemail contact ${contact === null || contact === void 0 ? void 0 : contact.contactID} has no event data; skipping map update`);
            return;
        }
        if (voiceMailData.status === VoiceMailContactEventStatus.DISCARDED && voiceMailData.finalState) {
            if (this.voiceMailContactMap.has(voiceMailData.contactId)) {
                this.voiceMailContactMap.delete(voiceMailData.contactId);
            }
            const contactIDs = [...this.voiceMailContactMap.keys()];
            // When the contact gets disconnected, check if any more contacts is there in map,
            // if so then invoke updateButtonState method from the contact object to update the buttons for the next contact
            const voiceMailContact = contactIDs.length > 0 ? this.voiceMailContactMap.get(contactIDs[0]) : '';
            // Never republish the contact just handled — see the note in setWorkItemContactInMap.
            if (voiceMailContact && voiceMailContact !== contact) {
                voiceMailContact.updateButtonState();
                this.publishContact(voiceMailContact);
            }
        }
        else {
            // Legacy path: this is the SECOND publish. Unlike voice and work item, voicemail's
            // re-publish sits in .then rather than .finally, so a REJECTED lookup emits once today
            // where the other channels emit twice. Retained so the toggle-off path reproduces that
            // asymmetry exactly. Removed for good, along with the toggle, once rollout completes.
            if (!this.isDedupeEnabled()) {
                this.getVoiceMailSkillById(contact);
            }
            this.voiceMailContactMap.set(voiceMailData.contactId, contact);
        }
    }
    /**
     * set / delete / find the work item contacts in map using contactID.
     * @param contact - cxone work item contact details
     */
    setWorkItemContactInMap(contact) {
        const workItemEventData = contact.workItemEventData;
        // TODO: do work items need their own special status enums?
        if (workItemEventData.status === CallContactEventStatus.DISCONNECTED && workItemEventData.finalState) {
            if (this.workItemContactMap.has(workItemEventData.contactId)) {
                this.workItemContactMap.delete(workItemEventData.contactId);
            }
            const contactIDs = [...this.workItemContactMap.keys()];
            // When the contact gets disconnected, check if any more contacts is there in map,
            // if so then invoke updateButtonState method from the contact object to update the buttons for the next contact
            const workItemContact = contactIDs.length > 0 ? this.workItemContactMap.get(contactIDs[0]) : '';
            // Republishing exists to refresh button state for the NEXT contact, so never republish the
            // one just handled. Without this, a map entry keyed by anything other than the contact's own
            // contactId makes the delete above miss, and publishing the same instance recurses until the
            // stack blows. Reachable only once a publish can be deferred past the event that caused it.
            if (workItemContact && workItemContact !== contact) {
                this.publishContact(workItemContact);
            }
        }
        else {
            // Legacy path: this is the SECOND publish. getSkillById's .finally() re-publishes on
            // workItemContactUpdateEvent once the lookup returns, which is the duplicate AW-60267
            // removes. Retained rather than deleted so the toggle-off path reproduces today's emission
            // behaviour exactly. Removed for good, along with the toggle, once rollout completes.
            if (!this.isDedupeEnabled()) {
                this.getSkillById(contact);
            }
            this.workItemContactMap.set(workItemEventData.contactId, contact);
        }
    }
    /**
     * set / delete / find the voice contacts in map using contactID.
     * @param contact - cxone voice contact details
     */
    setVoiceContactInMap(contact) {
        if (contact.status === CallContactEventStatus.DISCONNECTED &&
            contact.finalState) {
            if (this.voiceContactMap.has(contact.contactID)) {
                this.voiceContactMap.delete(contact.contactID);
            }
            const contactIDs = [...this.voiceContactMap.keys()];
            // AW-60439 follow-up: once the last voice contact ends, drop any cached mute
            // state so a mute value from this call can never leak onto a future, unrelated
            // call (this stale value caused the "click twice to unmute" desync).
            if (contactIDs.length === 0) {
                this.pendingMuteState = null;
                // AW-56681: drop the persisted copy on the same trigger, so a stale value can never be
                // restored onto a future unrelated call even if the final-state removal path is missed.
                LocalStorageHelper.removeItem(StorageKeys.AGENT_MUTED_STATE);
            }
            // When the contact gets disconnected, check if any more contacts is there in map,
            // if so then invoke updateButtonState method from the contact object to update the buttons for the next contact
            const voiceContact = contactIDs.length > 0 ? this.voiceContactMap.get(contactIDs[0]) : '';
            if (voiceContact) {
                voiceContact.updateButtonState();
                this.publishContact(voiceContact);
            }
        }
        else {
            // Legacy path: this is the SECOND publish. getSkillById's .finally() re-publishes on
            // voiceContactUpdateEvent once the lookup returns, which is the duplicate AW-60267 removes.
            //
            // Retained rather than deleted so the toggle-off path reproduces today's emission behaviour
            // exactly — that is what makes the kill switch real, and `acd-sdk` is a module-federation
            // shared singleton with no per-app opt-out. Removed for good, along with the toggle, once
            // rollout completes.
            //
            // With the toggle on, enrichWithSkillDetails has already resolved the metadata before
            // publishContact ran, so there is nothing left to fetch or re-publish.
            if (!this.isDedupeEnabled()) {
                this.getSkillById(contact);
            }
            this.voiceContactMap.set(contact.contactID, contact);
        }
    }
    /**
     * Method to get voicemail skill details
     * @param voiceMailContact - cxone voicemail contact details
    */
    getVoiceMailSkillById(voiceMailContact) {
        // Uses the existing member rather than `new SkillService()`. The constructor clears the static
        // cachedAgentSkills, which backs Personal Connection skill filtering, so constructing one per
        // contact event left the agent-state dropdown re-fetching the full skills list on every open.
        // Applied on the legacy path too, not just the new one, so the fix is not contingent on the
        // feature toggle being enabled. See AW-63604.
        if (voiceMailContact.voiceMailEventData.skill) {
            this.skillService.getSkillById(voiceMailContact.voiceMailEventData.skill).then((skillDetails) => {
                voiceMailContact.voiceMailEventData.skillName = '';
                if (skillDetails && voiceMailContact) {
                    voiceMailContact.skillName = skillDetails.skillName;
                    voiceMailContact.acwTypeId = skillDetails.acwTypeId;
                    voiceMailContact.requireDisposition = skillDetails.requireDisposition || false;
                    voiceMailContact.maxSecondsACW = skillDetails.maxSecondsACW || 0;
                    voiceMailContact.voiceMailEventData.skillName = skillDetails.skillName;
                    voiceMailContact.voiceMailEventData.requireDisposition = skillDetails.requireDisposition || false;
                }
                this.voiceMailContactUpdateEvent.next(voiceMailContact);
            }, (error) => {
                this.logger.error('getVoiceMailSkillById', 'Get voicemail skill details failed: ' + JSON.stringify(error));
            });
        }
    }
    /**
     * Method to get Skill Name for SkillId
     * @param contact - cxone voice contact or cxone work item contact details
     */
    getSkillById(contact) {
        // Member rather than `new SkillService()` — see the note on getVoiceMailSkillById (AW-63604).
        this.skillService.getSkillById(contact.skill).then((skillDetails) => {
            contact.skillName = '';
            if (skillDetails) {
                contact.skillName = skillDetails.skillName;
                contact.acwTypeId = skillDetails.acwTypeId;
                contact.requireDisposition = skillDetails.requireDisposition || false;
                contact.maxSecondsACW = skillDetails.maxSecondsACW || 0;
                contact.outboundStrategy = skillDetails.outboundStrategy || '';
            }
        })
            .catch((error) => {
            this.logger.error('getSkillById', 'Get Skill Name by Skill Id Failed ' + JSON.stringify(error));
        })
            .finally(() => {
            const isWorkItemDisconnectedFinal = contact.status === WorkItemContactStatus.DISCONNECTED &&
                contact.finalState === true;
            const isVoiceDisconnectedFinal = contact.status === CallContactEventStatus.DISCONNECTED &&
                contact.finalState === true;
            if (contact.type === ContactType.WORKITEM_CONTACT && !isWorkItemDisconnectedFinal) {
                this.workItemContactUpdateEvent.next(contact);
            }
            else if (contact.type === ContactType.VOICE_CONTACT && !isVoiceDisconnectedFinal) {
                this.voiceContactUpdateEvent.next(contact);
            }
        });
    }
    /**
     * Whether contact events should be de-duplicated — i.e. published exactly once per contact
     * event, with skill metadata already resolved, rather than published and then re-published
     * once the skill lookup returns.
     *
     * Read synchronously, matching how the SmartReach toggle is read in callContactEventHandler:
     * this sits on the contact-event path and must not introduce an await.
     *
     * OFF reproduces today's emission behaviour, including the double publish, so it is the only
     * rollback for this capability that does not require a release. `acd-sdk` is a module-federation
     * shared singleton, so the change lands for every MFE host at once and there is no per-app
     * opt-out.
     *
     * @returns true when the de-duplicated single-emission path should be used
     * @example
     * ```
     * if (this.isDedupeEnabled()) await this.enrichWithSkillDetails(contact);
     * ```
     */
    isDedupeEnabled() {
        var _a;
        return (_a = FeatureToggleService.instance.getFeatureToggleSync("release-cxa-dedupe-contact-update-events-AW-60267" /* FeatureToggles.DEDUPE_CONTACT_UPDATE_EVENTS_FEATURE_TOGGLE */)) !== null && _a !== void 0 ? _a : false;
    }
    /**
     * Bound race against a skill lookup, so a slow or hung skills API cannot delay a contact
     * reaching the agent by more than the budget.
     *
     * The underlying request is NOT cancelled — see AW-63582's follow-up on request cancellation. A
     * late response still lands harmlessly: it assigns onto the retained contact and emits nothing.
     *
     * @param promise - the lookup to bound
     * @param timeoutMs - the budget
     * @returns the lookup result, or a rejection with SkillLookupTimeoutError
     */
    withTimeout(promise, timeoutMs) {
        let handle;
        const expiry = new Promise((_resolve, reject) => {
            handle = setTimeout(() => reject(new SkillLookupTimeoutError(timeoutMs)), timeoutMs);
        });
        return Promise.race([promise, expiry]).finally(() => {
            if (handle)
                clearTimeout(handle);
        });
    }
    /**
     * Whether the contact already carries skill metadata resolved from its CURRENT skill id.
     *
     * True for every event after a contact's first, which is what makes pre-publish enrichment
     * affordable: hold, mute, masking, joined and disconnect all skip the lookup entirely — no HTTP,
     * no added latency.
     *
     * @param contact - the contact to test
     * @param policy - the channel policy for that contact
     * @returns true when no lookup is needed
     */
    isSkillMetadataResident(contact, policy) {
        return !!contact.skillName
            && this.resolvedSkillFor.get(contact) === policy.skillIdOf(contact);
    }
    /**
     * Drop skill metadata that describes a DIFFERENT skill than the contact now carries.
     *
     * A failed lookup must not leave the previous queue's name on a contact that has been transferred
     * or reskilled — the agent would see a call labelled with the wrong queue, and requireDisposition,
     * maxSecondsACW and acwTypeId would be wrong in the same way. Preserving resident values is
     * correct only when re-resolving the SAME skill id.
     *
     * @param contact - the contact whose metadata may now be stale
     * @param policy - the channel policy for that contact
     * @param skillId - the skill id whose lookup just failed
     */
    discardStaleSkillDetails(contact, policy, skillId) {
        const priorSkillId = this.resolvedSkillFor.get(contact);
        if (priorSkillId !== undefined && priorSkillId !== skillId) {
            policy.clearSkillDetails(contact);
            this.resolvedSkillFor.delete(contact);
        }
    }
    /**
     * Resolve skill metadata onto a contact BEFORE it is published, so one contact event can carry
     * it and no second, corrective event is needed.
     *
     * ⚠️ This method must never throw and never emit. Every path resolves. A rejection escaping here
     * would propagate into the contact-event handler and skip publishContact — the agent would stop
     * seeing calls. It would only happen when the skills API is already broken, which is exactly when
     * nobody is looking at this code.
     *
     * @param contact - the contact to enrich in place
     * @example
     * ```
     * await this.enrichWithSkillDetails(voiceContact);
     * this.publishContact(voiceContact);
     * ```
     */
    enrichWithSkillDetails(contact) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.isDedupeEnabled())
                return;
            const policy = contactChannelPolicyFor(contact);
            // Unknown channel: do not enrich, but the caller still publishes. A contact must never be
            // withheld from the agent because its type has no policy.
            if (!policy)
                return;
            if (policy.isTerminal(contact))
                return;
            if (this.isSkillMetadataResident(contact, policy))
                return;
            const skillId = policy.skillIdOf(contact);
            // Share an in-flight lookup only when it is for the SAME skill. A contact reskilled mid-flight
            // must start its own lookup rather than wait on an answer for the skill it has just left.
            const inFlight = this.pendingEnrichment.get(contact);
            if (inFlight && this.pendingSkillFor.get(contact) === skillId)
                return inFlight;
            // Apply is attached to the LOOKUP, not to the raced promise. The timeout bounds how long the
            // caller waits; it does not discard the answer. So a slow-but-successful lookup still lands its
            // metadata on the contact — silently, emitting nothing — and the contact's next event then
            // finds it resident instead of re-fetching. Attaching apply to the race instead would throw the
            // late answer away, which is the one case where this design would otherwise be worse than the
            // double-emission behaviour it replaces.
            const lookup = this.skillService.getSkillById(skillId);
            const applied = lookup.then((skillDetails) => {
                if (!skillDetails)
                    return;
                // Re-checked at apply time, not just at entry. Letting a late answer land is deliberate, but
                // only for the skill the contact still has — otherwise a slow lookup for the previous skill
                // would label a reskilled contact with the wrong queue, and requireDisposition, maxSecondsACW
                // and acwTypeId would be wrong with it. There is no second emission to correct that.
                if (policy.skillIdOf(contact) !== skillId)
                    return;
                policy.applySkillDetails(contact, skillDetails);
                this.resolvedSkillFor.set(contact, skillId);
            });
            // A failure arriving after the budget has already been handled below; swallow it here so it
            // cannot surface as an unhandled rejection once the race has settled.
            applied.catch(() => undefined);
            const task = this.withTimeout(applied, SKILL_LOOKUP_TIMEOUT_MS)
                .catch((error) => {
                this.discardStaleSkillDetails(contact, policy, skillId);
                if (error instanceof SkillLookupTimeoutError) {
                    // Distinct from a failure on purpose: this rate is what tells us whether the budget is
                    // still correct after a platform-side slowdown. Without it, such a regression is silent.
                    this.logger.warn('enrichWithSkillDetails', `Skill lookup timed out after ${error.timeoutMs}ms for skill ${skillId}`);
                }
                else {
                    // errorType and message only — never the whole error. Both JSON.stringify(error) and
                    // CXoneSdkError.toString() serialise its `data`, which can carry an API response body.
                    this.logger.error('enrichWithSkillDetails', `Skill lookup failed for skill ${skillId}: ${error === null || error === void 0 ? void 0 : error.errorType} ${error === null || error === void 0 ? void 0 : error.message}`);
                }
            })
                .finally(() => {
                // Only the task that still owns the entry may clear it. Now that a reskill can start a
                // second lookup while the first is in flight, an unconditional delete here would let the
                // OLDER task wipe the NEWER task's bookkeeping — after which a third event would issue yet
                // another duplicate lookup.
                if (this.pendingEnrichment.get(contact) === task) {
                    this.pendingEnrichment.delete(contact);
                    this.pendingSkillFor.delete(contact);
                }
            });
            this.pendingEnrichment.set(contact, task);
            this.pendingSkillFor.set(contact, skillId);
            return task;
        });
    }
    /**
     * Shallow, same-prototype copy of a voice contact. Used to recover an event's own state (see
     * AW-66141) before a same-tick sibling event can overwrite it on the shared instance.
     * @param contact - the contact to copy
     */
    cloneVoiceContact(contact) {
        return Object.assign(Object.create(Object.getPrototypeOf(contact)), contact);
    }
    /**
     * Copy the skill metadata fields enrichWithSkillDetails may have resolved onto `source` across to
     * `target`. Keeps a recovered event snapshot (AW-66141) from publishing stale skill metadata,
     * without also carrying over control-state fields that belong to a later event.
     * @param source - the live contact enrichment just ran against
     * @param target - the recovered snapshot to update in place
     */
    copySkillMetadata(source, target) {
        target.skillName = source.skillName;
        target.acwTypeId = source.acwTypeId;
        target.requireDisposition = source.requireDisposition;
        target.maxSecondsACW = source.maxSecondsACW;
        target.outboundStrategy = source.outboundStrategy;
    }
    /**
     * Method to get subscribe to voiceMailPlayBackEvent
     */
    VoiceMailPlayBackEventHandler() {
        this.acdSession.voiceMailPlayBackEventSubject.subscribe((event) => {
            this.voiceMailPlayBackEvent.next(event);
        });
    }
    /**
     * Get the details of calling agent in case of inbound voice interaction
     * @param ani - ani number(agent id)
     * @example getInboundAgentDetails
    */
    getInboundAgentDetails(ani) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield dbInstance();
            const currentAgentList = (yield (db === null || db === void 0 ? void 0 : db.get(IndexDBStoreNames.DIRECTORY, DirectoryEntities.AGENT_LIST))) || [];
            if (currentAgentList.length === 0) {
                const agentDetail = yield CXoneAcdClient.instance.agentDetailService.getAgentInfoByAgentId(ani);
                return agentDetail[0];
            }
            else {
                const matchedAgentStateIndex = currentAgentList.findIndex((currentAgentState) => currentAgentState.agentId.toString() == ani);
                if (matchedAgentStateIndex >= 0) {
                    return currentAgentList[matchedAgentStateIndex];
                }
                else {
                    return {};
                }
            }
        });
    }
    /**
     * Method to get all contacts
     * @example
     * ```
     * getAllContacts()
     * ```
     */
    getAllContacts() {
        return this.allContacts;
    }
}
//# sourceMappingURL=contact-manager.js.map