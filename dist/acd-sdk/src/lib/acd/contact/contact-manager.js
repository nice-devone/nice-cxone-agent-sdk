import { __awaiter } from "tslib";
import { AdminService, CallContactEventStatus, ACDSessionManager, Logger, VoiceMailContactEventStatus, dbInstance, IndexDBStoreNames, LocalStorageHelper, StorageKeys, isVoiceBioHubFeatureEnabled, } from '@nice-devone/core-sdk';
import { CXoneVoiceContact } from './cxone-voice-contact';
import { Subject } from 'rxjs';
import { CXoneSdkError, CXoneSdkErrorType, WorkItemContactStatus, DirectoryEntities, MediaType, CallContactEventYup, VoiceMailContactEventYup, WorkItemContactEventYup, } from '@nice-devone/common-sdk';
import { CXoneVoiceMailContact } from './cxone-voicemail-contact';
import { CXoneWorkItemContact } from './cxone-workitem-contact';
import { CXoneAcdClient } from '../../cxone-acd-client';
import { DispositionService, SkillService, CXoneClient, PersonalConnectionService, ContactService, VoiceService, CallType, ContactType, FeatureToggleService, isVoiceTranscriptEnabledAndToggledOn, OutboundStrategy } from '@nice-devone/agent-sdk';
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
        this.renewStateSubscription = null;
        /**
         * Method used to get the CXoneContact
         */
        this.publishContact = (contact) => {
            switch (contact.type) {
                case ContactType.VOICE_CONTACT:
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
        this.voicemailContactEventHandler();
        this.workItemContactEventHandler();
        this.muteEventHandler();
        this.coBrowseEventHandler();
        this.localPostEventHandler();
        this.dispositionService = new DispositionService();
        this.skillService = new SkillService();
        this.VoiceMailPlayBackEventHandler();
        const isVoiceBioHubEnabled = isVoiceBioHubFeatureEnabled() && FeatureToggleService.instance.getFeatureToggleSync("release-agent-voiceBioHub-AW-24969" /* FeatureToggles.VOICE_BIO_HUB_FEATURE_TOGGLE */);
        // in case of screen reload we need to connect to voice bio hub websocket
        if (isVoiceBioHubEnabled && LocalStorageHelper.getItem(StorageKeys.VOICE_BIO_HUB_AGENT_ASSIST)) {
            this.connectVoiceBioHubWebSocket();
        }
        this.conferenceCallEventHandler();
        const isRenewStateToggleEnabled = FeatureToggleService.instance.getFeatureToggleSync("release-renew-state-AW-48481" /* FeatureToggles.RENEW_STATE_FEATURE_TOGGLE */);
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
        keys.map((key) => {
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
            let voiceContact;
            // // Create an instance for new contact else get the instance from the Map, if the contact already exist.
            if (!existContact) {
                voiceContact = new CXoneVoiceContact();
                this.voiceContactMap.set(callContactEvent.contactId, voiceContact);
                if (callContactEvent.screenPopUrl !== '') {
                    const screenPop = {
                        contactId: callContactEvent.contactId,
                        screenpopUrl: callContactEvent.screenPopUrl,
                    };
                    this.acdSession.screenPopSubject.next(screenPop);
                }
                this.voiceCallRecordServicePollingEvent.next(true);
            }
            else {
                voiceContact = existContact;
            }
            const contactKeys = [...this.voiceContactMap.keys()]; // get the array of keys from Map to check length of contacts
            // Check the condition to update the button states for main call or consult call
            // Invoke updateCallControls method when perform the action for first call contact
            // Invoke updateConsultCallControls method when perform the action for consult call
            if (callContactEvent.masterId === callContactEvent.contactId ||
                (contactKeys.length === 1 &&
                    callContactEvent.masterId !== callContactEvent.contactId &&
                    (callContactEvent.callType === CallType.REGULAR ||
                        callContactEvent.callType === CallType.RESKILL_PROXY ||
                        callContactEvent.callType === CallType.CONSULT ||
                        callContactEvent.callType === CallType.PERSONAL_QUEUE ||
                        callContactEvent.callType === CallType.TAKE_OVER))) {
                voiceContact.updateCallControls(callContactEvent);
                //if we have more than 1 contact and user update the state of first call contact then we have to disable
                //the first call contact transfer button
                if (contactKeys.length > 1 && callContactEvent.masterId === callContactEvent.contactId) {
                    voiceContact.updateControlsOnConsultCallStarted();
                }
                // we need to fetch dispositions unconditionally. If call is ended and user refreshes, we still need the disposotion list
                const isSmartReachFTEnabled = (_a = FeatureToggleService.instance.getFeatureToggleSync("release-acd-smartreach-voice-pmi-OB-18214" /* FeatureToggles.SMARTREACH_VOICE_PMI_FEATURE_TOGGLE */)) !== null && _a !== void 0 ? _a : false;
                // If smart reach feature toggle is enabled and the outbound strategy is smart reach then we need to fetch dispositions from smart reach otherwise we can fetch from regular disposition api
                try {
                    const skillResponse = isSmartReachFTEnabled ? yield this.skillService.getSkillById(callContactEvent.skill) : null;
                    if ((skillResponse === null || skillResponse === void 0 ? void 0 : skillResponse.outboundStrategy) === OutboundStrategy.SMART_REACH_DIALING) {
                        this.getSmartReachDispositionsOnContactEvent(callContactEvent.skill, callContactEvent.contactId, MediaType.VOICE);
                    }
                    else {
                        this.getDispositionsOnContactEvent(callContactEvent.skill, callContactEvent.contactId, MediaType.VOICE);
                    }
                }
                catch (error) {
                    this.logger.error('callContactEventHandler', `Error fetching skill details for skillId: ${callContactEvent.skill}, error: ${error}`);
                }
                this.getTagsOnContactEvent(callContactEvent.skill, callContactEvent.contactId);
            }
            else {
                //if we have more than 1 contact and user update the state of second call contact then we have to disable
                //the first call contact transfer button
                this.updateControlsWithNewConsultCall(callContactEvent.masterId);
                voiceContact.updateConsultCallControls(callContactEvent);
            }
            this.publishContact(voiceContact);
            if (callContactEvent.status === CallContactEventStatus.DISCONNECTED && callContactEvent.finalState) {
                delete this.dispositionsData[callContactEvent.contactId];
                delete this.tagsData[callContactEvent.contactId];
                this.removeBioHubFromLocalStorage(contactKeys);
                this.removeVoiceTranscriptionFromIndexedDB(callContactEvent.contactId);
                (contactKeys.length === 1) && this.voiceCallRecordServicePollingEvent.next(false);
            }
        }));
    }
    ;
    /**
     * Removes voice transcription data from IndexedDB for a specific contact.
     * @param contactId - contactId for which voice transcription to be removed
     */
    removeVoiceTranscriptionFromIndexedDB(contactId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (yield isVoiceTranscriptEnabledAndToggledOn()) {
                this.onVoiceTranscriptContactEndEvent.next({ contactId });
            }
        });
    }
    ;
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
        this.acdSession.workItemContactEventSubject.subscribe((workItemContactEvent) => {
            const workItemContact = this.checkForExistingContact(workItemContactEvent, this.workItemContactMap, () => new CXoneWorkItemContact());
            const { skillId = '', contactId } = workItemContactEvent;
            this.getDispositionsOnContactEvent(skillId, contactId, MediaType.WORKITEM);
            this.getTagsOnContactEvent(skillId, contactId);
            workItemContact.updateWorkitemControls(workItemContactEvent);
            this.publishContact(workItemContact);
            if (workItemContactEvent.status === WorkItemContactStatus.DISCONNECTED && workItemContactEvent.finalState) {
                delete this.dispositionsData[workItemContactEvent.contactId];
                delete this.tagsData[workItemContactEvent.contactId];
            }
        });
    }
    /**
     * Method to subscribe the voicemail contact event from the agentSession.
     */
    voicemailContactEventHandler() {
        this.acdSession.voiceMailContactEventSubject.subscribe((voicemailContactEvent) => {
            const voicemailContact = this.checkForExistingContact(voicemailContactEvent, this.voiceMailContactMap, () => new CXoneVoiceMailContact());
            const { skill = '', contactId } = voicemailContactEvent;
            this.getDispositionsOnContactEvent(skill, contactId, MediaType.VOICEMAIL);
            this.getTagsOnContactEvent(skill, contactId);
            voicemailContact.updateVoiceMailControls(voicemailContactEvent);
            this.publishContact(voicemailContact);
            if (voicemailContactEvent.status === VoiceMailContactEventStatus.DISCARDED && voicemailContactEvent.finalState) {
                delete this.dispositionsData[voicemailContactEvent.contactId];
                delete this.tagsData[voicemailContactEvent.contactId];
            }
        });
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
                this.updateMuteState(event.agentMuted);
            }
        });
    }
    /**
     * Update Mute button state for voice contacts
     */
    updateMuteState(isAgentMuted) {
        const keys = [...this.voiceContactMap.keys()];
        keys.map((key) => {
            const voiceContact = this.voiceContactMap.get(key);
            if (voiceContact) {
                voiceContact.updateMuteState(isAgentMuted);
                if (voiceContact.contactID === voiceContact.masterID || (keys.length === 1 && voiceContact.masterID !== voiceContact.contactID && (voiceContact.callType === CallType.REGULAR || voiceContact.callType === CallType.PERSONAL_QUEUE || voiceContact.callType === CallType.RESKILL_PROXY || voiceContact.callType === CallType.CONSULT))) {
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
     * Update the record state for voice contacts
     * @param isRecording - boolean value to indicate if the call is being recorded
     * @example
     * ```
     * contactManager.updateVoiceCallRecordState(true);
     * ```
     */
    updateVoiceCallRecordState(isRecording) {
        for (const voiceContact of this.voiceContactMap.values()) {
            if (!voiceContact)
                continue;
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
        if (voiceMailData.status === VoiceMailContactEventStatus.DISCARDED && voiceMailData.finalState) {
            if (this.voiceMailContactMap.has(voiceMailData.contactId)) {
                this.voiceMailContactMap.delete(voiceMailData.contactId);
            }
            const contactIDs = [...this.voiceMailContactMap.keys()];
            // When the contact gets disconnected, check if any more contacts is there in map,
            // if so then invoke updateButtonState method from the contact object to update the buttons for the next contact
            const voiceMailContact = contactIDs.length > 0 ? this.voiceMailContactMap.get(contactIDs[0]) : '';
            if (voiceMailContact) {
                voiceMailContact.updateButtonState();
                this.publishContact(voiceMailContact);
            }
        }
        else {
            this.getVoiceMailSkillById(contact);
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
            if (workItemContact) {
                this.publishContact(workItemContact);
            }
        }
        else {
            this.getSkillById(contact);
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
            // When the contact gets disconnected, check if any more contacts is there in map,
            // if so then invoke updateButtonState method from the contact object to update the buttons for the next contact
            const voiceContact = contactIDs.length > 0 ? this.voiceContactMap.get(contactIDs[0]) : '';
            if (voiceContact) {
                voiceContact.updateButtonState();
                this.publishContact(voiceContact);
            }
        }
        else {
            this.getSkillById(contact);
            this.voiceContactMap.set(contact.contactID, contact);
        }
    }
    /**
     * Method to get voicemail skill details
     * @param voiceMailContact - cxone voicemail contact details
    */
    getVoiceMailSkillById(voiceMailContact) {
        const skillService = new SkillService();
        if (voiceMailContact.voiceMailEventData.skill) {
            skillService.getSkillById(voiceMailContact.voiceMailEventData.skill).then((skillDetails) => {
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
        const skillService = new SkillService();
        skillService.getSkillById(contact.skill).then((skillDetails) => {
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