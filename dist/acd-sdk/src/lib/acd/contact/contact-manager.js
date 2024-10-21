import { __awaiter } from "tslib";
import { AdminService, CallContactEventStatus, ACDSessionManager, Logger, VoiceMailContactEventStatus, dbInstance, IndexDBStoreNames, LocalStorageHelper, StorageKeys, isVoiceBioHubFeatureEnabled, } from '@nice-devone/core-sdk';
import { CXoneVoiceContact } from './cxone-voice-contact';
import { Subject } from 'rxjs';
import { CXoneSdkError, CXoneSdkErrorType, WorkItemContactStatus, DirectoryEntities, MediaType, } from '@nice-devone/common-sdk';
import { CXoneVoiceMailContact } from './cxone-voicemail-contact';
import { CXoneWorkItemContact } from './cxone-workitem-contact';
import { CXoneAcdClient } from '../../cxone-acd-client';
import { DispositionService, SkillService, CXoneClient, PersonalConnectionService, ContactService, VoiceService, CallType, ContactType, FeatureToggleService } from '@nice-devone/agent-sdk';
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
        this.dispositionsData = {};
        this.tagsData = {};
        this.viewOnlyCases = [];
        this.allContacts = {};
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
        this.dispositionService = new DispositionService();
        this.skillService = new SkillService();
        this.VoiceMailPlayBackEventHandler();
        const isVoiceBioHubEnabled = isVoiceBioHubFeatureEnabled() && FeatureToggleService.instance.getFeatureToggleSync("release-agent-voiceBioHub-AW-24969" /* FeatureToggles.VOICE_BIO_HUB_FEATURE_TOGGLE */);
        // in case of screen reload we need to connect to voice bio hub websocket
        if (isVoiceBioHubEnabled && LocalStorageHelper.getItem(StorageKeys.VOICE_BIO_HUB_AGENT_ASSIST)) {
            this.connectVoiceBioHubWebSocket();
        }
        this.conferenceCallEventHandler();
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
        this.acdSession.callContactEventSubject.subscribe((callContactEvent) => {
            const existContact = this.voiceContactMap.get(callContactEvent.contactId);
            let voiceContact;
            // Create an instance for new contact else get the instance from the Map, if the contact already exist.
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
                this.getDispositionsOnContactEvent(callContactEvent.skill, callContactEvent.contactId, MediaType.VOICE);
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
                const isVoiceBioHubEnabled = isVoiceBioHubFeatureEnabled() && FeatureToggleService.instance.getFeatureToggleSync("release-agent-voiceBioHub-AW-24969" /* FeatureToggles.VOICE_BIO_HUB_FEATURE_TOGGLE */);
                if (isVoiceBioHubEnabled) {
                    const voicBioAgentAssistData = LocalStorageHelper.getItem(StorageKeys.VOICE_BIO_HUB_AGENT_ASSIST);
                    if (voicBioAgentAssistData) {
                        LocalStorageHelper.removeItem(StorageKeys.VOICE_BIO_HUB_AGENT_ASSIST);
                        LocalStorageHelper.removeItem(StorageKeys.VOICE_BIO_HUB_DATA);
                    }
                }
            }
        });
    }
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
            }
        })
            .catch((error) => {
            this.logger.error('getSkillById', 'Get Skill Name by Skill Id Failed ' + JSON.stringify(error));
        })
            .finally(() => {
            if (contact.type === ContactType.WORKITEM_CONTACT) {
                this.workItemContactUpdateEvent.next(contact);
            }
            else if (contact.status !== 'Disconnected') {
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