import { __awaiter } from "tslib";
import { AdminService, ACDSessionManager, LocalStorageHelper, StorageKeys, WebsocketStatusCode, } from '@nice-devone/core-sdk';
import { Subject } from 'rxjs';
import { CXoneSdkError, CXoneSdkErrorType, CXoneDigitalEventType, DigitalContactStatus, NetWorkConnectionStatus, MediaType, UserSlotsSchema, CXoneLeaderElector, } from '@nice-devone/common-sdk';
import { CXoneUser } from '@nice-devone/auth-sdk';
import { AcwType, CXoneClient, CcfLogger, ContactType, DispositionService, FeatureToggleService, SkillService } from '@nice-devone/agent-sdk';
import { CXoneDigitalWebsocket } from '../digital/ws/cxone-digital-websocket';
import { CXoneDigitalContact } from '../digital/contact/cxone-digital-contact';
import { CXoneDigitalContactHelper } from '../digital/contact/cxone-digital-contact-helper';
import { CXoneEventHubProvider } from '../digital/provider/cxone-event-hub-provider';
import { DigitalService } from '../digital/service/digital-service';
import { CXoneUserSlotProvider } from '../digital/provider/cxone-user-slot-provider';
import { DigitalContactService } from '../digital/service/digital-contact-service';
import { CXoneDigitalUtil } from '../digital/util/cxone-digital-util';
/**
 * Class to handle the contacts
 */
export class DigitalContactManager {
    /**
     * @example
     * ```
     * const DigitalContactManager = new DigitalContactManager();
     * ```
     */
    constructor() {
        this.acdSession = {};
        this.adminService = {};
        this.digitalContactMap = new Map();
        this.onDigitalContactEvent = new Subject();
        this.onUserSlotEvent = new Subject();
        this.onDispositionEvent = new Subject();
        this.digitalService = {};
        this.digitalContactService = {};
        this.dispositionService = {};
        this.digitalWebsocket = CXoneDigitalWebsocket.instance;
        this.logger = new CcfLogger('ACD', 'contact-manager');
        this.currentUserId = '';
        this.cxoneDigitalContactHelper = {};
        this.digitalContactId = new Array();
        this.eventHubProvider = new CXoneEventHubProvider();
        this.userSlotProvider = new CXoneUserSlotProvider();
        this.skillService = {};
        // We poll event hub subscription api for inbox contacts in every 5 mins
        this.EVENT_HUB_POLLING_INTERVAL_MS = 300000;
        // this map will hold only new arrived message against its contactId
        // this subject is used to update public channel message tree.
        this.onDigitalContactNewMessageEvent = new Subject();
        // this subject is used to update typing preview for the chat with Events like senderTyping, messagePreview.
        this.onDigitalContactUserTypingPreviewEvent = new Subject();
        this.viewOnlyCases = [];
        // Added new subject for handling WebSocket connection status notification display on UI
        this.onDigitalWsNotificationEvent = new Subject();
        this.userSlotPollingStarted = false;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.onAvailabilityEvent = new Subject();
        this.onAgentHiveEvent = new Subject();
        this.userSlotSubscribed = null;
        this.isWebSocketFailure = false;
        /**
         * Method used to get the CXoneContact
         */
        this.publishContact = (contact) => {
            switch (contact.type) {
                case ContactType.DIGITAL_CONTACT:
                    this.onDigitalContactEvent.next(contact);
                    this.logger.debug('publishContact', 'DIGITAL_CONTACT ' + contact);
                    break;
            }
        };
        /**
         * Method used to get the CXoneContact
         */
        this.publishAvailabilityState = (contact) => {
            switch (contact.eventType) {
                case CXoneDigitalEventType.CONVERSATIONS_AVAILABILITY:
                    this.onAvailabilityEvent.next(contact); // eslint-disable-line @typescript-eslint/no-explicit-any
                    this.logger.debug('publishAvailabilityState', 'CONVERSATIONS_AVAILABILITY ' + contact);
                    break;
            }
        };
        /**
         * Method used to send connection state updates of browser network
         */
        this.publishNetworkNotification = (networkState) => {
            switch (networkState) {
                case WebsocketStatusCode.RECONNECT:
                    this.onDigitalWsNotificationEvent.next(NetWorkConnectionStatus.RECONNECT);
                    break;
                case WebsocketStatusCode.OK:
                    this.onDigitalWsNotificationEvent.next(NetWorkConnectionStatus.CONNECTED);
                    break;
                case WebsocketStatusCode.CLOSED:
                    this.onDigitalWsNotificationEvent.next(NetWorkConnectionStatus.DISCONNECTED);
                    break;
                case WebsocketStatusCode.RECONNECT_UNSUCCESSFUL:
                    this.onDigitalWsNotificationEvent.next(NetWorkConnectionStatus.RECONNECT_UNSUCCESSFUL);
                    break;
            }
        };
        /**
         * publish event for newly arrived message for public channel
         * @param contactId - contact id of message to be published
         * @param interactionId - interaction id of message to be published
         * @param message - new message to be published
         * @example -
         */
        this.publishNewMessageForContact = (contactId, message, interactionId) => {
            this.onDigitalContactNewMessageEvent.next({ contactId, message, interactionId });
        };
        this.acdSession = ACDSessionManager.instance;
        this.adminService = AdminService.instance;
        this.initialize();
    }
    /**
     * Method to create instance for voice and contact service and update agent permissions and call contact event
     */
    initialize() {
        this.digitalContactEventHandler();
        this.dispositionService = new DispositionService();
        this.digitalService = new DigitalService();
        this.digitalContactService = new DigitalContactService();
        this.cxoneDigitalContactHelper = new CXoneDigitalContactHelper();
        this.skillService = new SkillService();
        this.userSlotProvider.setUserSlotBaseInstance(this);
        this.updateAutoSummaryEventHandler();
    }
    /**
     * initialize Digital methods like starting websocket, user slot connection
     * @example
     * ```
     * initializeDigital
     * ```
     */
    initializeDigital() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.digitalWebsocket.startWebSocket();
                yield this.manageUserSlotDetails();
                this.digitalWebsocketMessageHandler();
                this.digitalWebsocketConnectionStateHandler();
            }
            catch (error) {
                if (error instanceof Error) {
                    this.logger.error('initializeDigital', 'failed to start WebSocket' + new CXoneSdkError(CXoneSdkErrorType.WEBSOCKET_ERROR, error.message));
                }
            }
        });
    }
    /**
     * terminate digital workers
     * @example
     * ```
     * terminateDigitalWorkers()
     * ```
     */
    terminateDigitalWorkers() {
        if (this.digitalWebsocket && Object.keys(this.digitalWebsocket).length !== 0)
            this.digitalWebsocket.terminateWebSocketWorker();
        if (this.userSlotProvider && Object.keys(this.userSlotProvider).length !== 0)
            this.userSlotProvider.terminatePolling();
    }
    /**
     * handles web socket message events
     * @example
     * ```
     * digitalWebsocketMessageHandler
     * ```
     */
    digitalWebsocketMessageHandler() {
        var _a, _b;
        let currentContact;
        this.currentUserId = (_a = CXoneUser.instance.getUserInfo()) === null || _a === void 0 ? void 0 : _a.userId;
        const isConversationsFTEnabled = FeatureToggleService.instance.getFeatureToggleSync("release-agent-chat-AW-30672" /* FeatureToggles.AGENT_CHAT_FEATURE_TOGGLE */);
        (_b = this.digitalWebsocket.onMessageReceived) === null || _b === void 0 ? void 0 : _b.subscribe((eventData) => __awaiter(this, void 0, void 0, function* () {
            var _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11;
            let eventTypeToPublish;
            if ((eventData === null || eventData === void 0 ? void 0 : eventData.eventType) === CXoneDigitalEventType.CASE_INBOX_ASSIGNEE_CHANGED) {
                if (((_d = (_c = eventData === null || eventData === void 0 ? void 0 : eventData.data) === null || _c === void 0 ? void 0 : _c.inboxAssignee) === null || _d === void 0 ? void 0 : _d.incontactId) !== this.currentUserId ||
                    !((_e = eventData === null || eventData === void 0 ? void 0 : eventData.data) === null || _e === void 0 ? void 0 : _e.inboxAssignee)) {
                    eventTypeToPublish = CXoneDigitalEventType.CASE_INBOX_UNASSIGNED; //when case is transferred to some other agent or is unassigned
                }
                else if (((_f = eventData === null || eventData === void 0 ? void 0 : eventData.data) === null || _f === void 0 ? void 0 : _f.inboxAssignee) && ((_h = (_g = eventData === null || eventData === void 0 ? void 0 : eventData.data) === null || _g === void 0 ? void 0 : _g.inboxAssignee) === null || _h === void 0 ? void 0 : _h.incontactId) === this.currentUserId) {
                    eventTypeToPublish = CXoneDigitalEventType.CASE_INBOX_ASSIGNED;
                }
            }
            else {
                eventTypeToPublish = eventData === null || eventData === void 0 ? void 0 : eventData.eventType;
            }
            const eventDetailsToPublish = { eventId: eventData.eventId, eventObject: eventData.eventObject, eventType: eventTypeToPublish };
            const relevantEventTypes = [
                CXoneDigitalEventType.MESSAGE_NOTE_CREATED,
                CXoneDigitalEventType.MESSAGE_NOTE_DELETED,
                CXoneDigitalEventType.MESSAGE_NOTE_UPDATED,
                CXoneDigitalEventType.MESSAGE_SEEN_CHANGED,
                CXoneDigitalEventType.MESSAGE_DELIVERY_STATUS_CHANGED
            ];
            if (eventDetailsToPublish.eventType === CXoneDigitalEventType.CASE_INBOX_ASSIGNED) {
                this.getDigitalContactDetails((_k = (_j = eventData.data) === null || _j === void 0 ? void 0 : _j.case) === null || _k === void 0 ? void 0 : _k.id, eventDetailsToPublish);
            }
            else if (relevantEventTypes.includes(eventDetailsToPublish.eventType)) {
                this.checkSchemaAndPublishForMessage(currentContact, eventData);
            }
            else if (eventDetailsToPublish.eventType === CXoneDigitalEventType.MESSAGE_UPDATED) {
                // this condition is to detect if there are changes in tags key in message array
                if (((_o = (_m = (_l = eventData === null || eventData === void 0 ? void 0 : eventData.data) === null || _l === void 0 ? void 0 : _l.message) === null || _m === void 0 ? void 0 : _m._changes[0]) === null || _o === void 0 ? void 0 : _o.fieldName) === 'tags') {
                    this.checkSchemaAndPublishForMessage(currentContact, eventData);
                    //this condition is to handle all changes other than tags for messageupdated event where we don't need to publish any contact object
                }
                else {
                    return;
                }
            }
            else if (isConversationsFTEnabled && eventDetailsToPublish.eventType === CXoneDigitalEventType.MESSAGE_CREATED && ((_q = (_p = eventData === null || eventData === void 0 ? void 0 : eventData.data) === null || _p === void 0 ? void 0 : _p.channel) === null || _q === void 0 ? void 0 : _q.hasAgentsAsRecipients)) {
                this.onAgentHiveEvent.next({ eventType: eventDetailsToPublish.eventType, message: (_r = eventData === null || eventData === void 0 ? void 0 : eventData.data) === null || _r === void 0 ? void 0 : _r.message });
            }
            else {
                // validate raw event data against predefined schema
                const eventDetailsToValidate = Object.assign(Object.assign({}, eventData), eventDetailsToPublish);
                const schemaValidatedResponse = this.cxoneDigitalContactHelper.validateResponseSchema(eventDetailsToValidate);
                // Condition to handle Events like SenderTypingStarted and SenderTypingEnded
                if (eventDetailsToPublish.eventType === CXoneDigitalEventType.SENDER_TYPING_START ||
                    eventDetailsToPublish.eventType === CXoneDigitalEventType.SENDER_TYPING_END || eventDetailsToPublish.eventType === CXoneDigitalEventType.MESSAGE_PREVIEW) {
                    // subscribe to onDigitalContactUserTypingPreviewEvent Only if threadId found
                    if (((_t = (_s = eventData.data) === null || _s === void 0 ? void 0 : _s.thread) === null || _t === void 0 ? void 0 : _t.id) && schemaValidatedResponse) {
                        this.onDigitalContactUserTypingPreviewEvent.next({
                            eventType: schemaValidatedResponse.eventType,
                            threadId: (_v = (_u = schemaValidatedResponse.data) === null || _u === void 0 ? void 0 : _u.thread) === null || _v === void 0 ? void 0 : _v.id,
                            message: (_w = schemaValidatedResponse.data) === null || _w === void 0 ? void 0 : _w.messagePreview,
                        });
                    }
                }
                if (schemaValidatedResponse) {
                    const contactInMap = this.digitalContactMap.get((_y = (_x = schemaValidatedResponse === null || schemaValidatedResponse === void 0 ? void 0 : schemaValidatedResponse.data) === null || _x === void 0 ? void 0 : _x.case) === null || _y === void 0 ? void 0 : _y.id);
                    if (contactInMap) {
                        currentContact = contactInMap;
                        // Dev Note: Change added for visual indicators
                        //adding trace id from event to identify message form digital contact map
                        schemaValidatedResponse['traceId'] = eventData.traceId;
                        // parse the validated response as per CXoneDigitalContact object
                        yield currentContact.parse(schemaValidatedResponse);
                        // set or delete the contact from map based on inboxAssigneeUser change
                        // publish individual received message for public channel
                        if (!((_0 = (_z = schemaValidatedResponse === null || schemaValidatedResponse === void 0 ? void 0 : schemaValidatedResponse.data) === null || _z === void 0 ? void 0 : _z.channel) === null || _0 === void 0 ? void 0 : _0.isPrivate) &&
                            ((_1 = schemaValidatedResponse === null || schemaValidatedResponse === void 0 ? void 0 : schemaValidatedResponse.data) === null || _1 === void 0 ? void 0 : _1.message))
                            this.publishNewMessageForContact((_3 = (_2 = schemaValidatedResponse === null || schemaValidatedResponse === void 0 ? void 0 : schemaValidatedResponse.data) === null || _2 === void 0 ? void 0 : _2.case) === null || _3 === void 0 ? void 0 : _3.id, (_4 = schemaValidatedResponse === null || schemaValidatedResponse === void 0 ? void 0 : schemaValidatedResponse.data) === null || _4 === void 0 ? void 0 : _4.message, (_6 = (_5 = schemaValidatedResponse === null || schemaValidatedResponse === void 0 ? void 0 : schemaValidatedResponse.data) === null || _5 === void 0 ? void 0 : _5.case) === null || _6 === void 0 ? void 0 : _6.interactionId);
                        this.updatePublishDigitalContactMap(currentContact);
                    }
                }
                if (schemaValidatedResponse) {
                    const status = (_8 = (_7 = schemaValidatedResponse === null || schemaValidatedResponse === void 0 ? void 0 : schemaValidatedResponse.data) === null || _7 === void 0 ? void 0 : _7.case) === null || _8 === void 0 ? void 0 : _8.status;
                    const contactIdToUnsubscribe = (_11 = (_10 = (_9 = schemaValidatedResponse === null || schemaValidatedResponse === void 0 ? void 0 : schemaValidatedResponse.data) === null || _9 === void 0 ? void 0 : _9.case) === null || _10 === void 0 ? void 0 : _10.id) === null || _11 === void 0 ? void 0 : _11.toString();
                    // unsubscribing from web socket even on UnAssign and Dismiss as we get get-next on every Assign to Me
                    if (contactIdToUnsubscribe) {
                        if ((eventDetailsToPublish.eventType === CXoneDigitalEventType.CASE_STATUS_CHANGED && status === DigitalContactStatus.CLOSED) ||
                            (eventDetailsToPublish.eventType === CXoneDigitalEventType.CASE_INBOX_UNASSIGNED && status !== DigitalContactStatus.CLOSED)) {
                            this.acdSession.agentAssistWebSocketUnsubsribeSubject.next(contactIdToUnsubscribe);
                        }
                    }
                }
            }
            if (isConversationsFTEnabled && eventDetailsToPublish.eventType === CXoneDigitalEventType.CONVERSATIONS_AVAILABILITY) {
                this.checkSchemaAndPublishAvailability(eventData);
            }
        }));
    }
    /**
     * Used to remove the preview case from the preview array and digital contact map
     * @param contactId - contact id string
     * @example
     * ```
     * cxoneClient.contactManager.removePreviewContacts(caseId);
     * ```
     */
    removePreviewContacts(contactId) {
        const isPreviewContactIdIndex = this.viewOnlyCases.findIndex(previewContactId => previewContactId === contactId);
        if (isPreviewContactIdIndex >= 0) {
            this.viewOnlyCases.splice(this.viewOnlyCases.findIndex(previewContactId => previewContactId === contactId), 1);
            this.digitalContactMap.delete(contactId);
        }
    }
    /**
     * Used for handling web socket error/success notifications
     * @example
     * ```
     * digitalWebsocketConnectionStateHandler()
     * ```
     */
    digitalWebsocketConnectionStateHandler() {
        var _a;
        (_a = this.digitalWebsocket.onWebSocketConnectionStatus) === null || _a === void 0 ? void 0 : _a.subscribe((response) => {
            var _a, _b;
            this.logger.info('digitalWebsocketConnectionStateHandler response code', JSON.stringify(response));
            // If the websocket connection does not reconnect, poll the user slots api
            // This will keep some customers afloat who may experience spotty websocket connection
            // user slot api polling should start for leader only, leader will publish the contact details and other tabs will subscribe to the message bus
            if ([WebsocketStatusCode.RECONNECT_UNSUCCESSFUL, WebsocketStatusCode.RECONNECT, WebsocketStatusCode.ERROR]
                .includes(response)) {
                this.isWebSocketFailure = true;
                if ((_a = CXoneLeaderElector === null || CXoneLeaderElector === void 0 ? void 0 : CXoneLeaderElector.instance) === null || _a === void 0 ? void 0 : _a.isLeader) {
                    this.pollUserSlots(true);
                }
            }
            else if (response === WebsocketStatusCode.OK) {
                if ((_b = CXoneLeaderElector === null || CXoneLeaderElector === void 0 ? void 0 : CXoneLeaderElector.instance) === null || _b === void 0 ? void 0 : _b.isLeader) {
                    this.terminateUserSlotPolling();
                }
                this.isWebSocketFailure = false;
            }
            // We need to receive the actual status codes here to show main message on UI side code
            // We don't need rest any of the details of connection, as there is no need at this moment from usage pov
            this.publishNetworkNotification(response);
        });
    }
    /**
     * checkSchemaAndPublishForMessage.
     * @param currentContact - cxone Digital contact details
     * @param eventData - eventData from digitalWebsocket.onMessageReceived subscription
     * this method will be called in case of MESSAGE_NOTE_CREATED , MESSAGE_NOTE_DELETED , MESSAGE_NOTE_UPDATED , MESSAGE_UPDATED(only for change in message tags), MESSAGE_DELIVERY_STATUS_CHANGED, MESSAGE_SEEN_CHANGED event are updated and
     * to validate the event data and publish that message data
     */
    checkSchemaAndPublishForMessage(currentContact, eventData) {
        var _a, _b;
        try {
            const schemaValidatedMessage = this.cxoneDigitalContactHelper.validateResponseSchema(eventData);
            if ((schemaValidatedMessage === null || schemaValidatedMessage === void 0 ? void 0 : schemaValidatedMessage.data) &&
                [CXoneDigitalEventType.MESSAGE_DELIVERY_STATUS_CHANGED, CXoneDigitalEventType.MESSAGE_SEEN_CHANGED].includes(eventData.eventType)) {
                schemaValidatedMessage.data['case'] = schemaValidatedMessage.data.contact;
            }
            const contact = this.digitalContactMap.get((_b = (_a = schemaValidatedMessage === null || schemaValidatedMessage === void 0 ? void 0 : schemaValidatedMessage.data) === null || _a === void 0 ? void 0 : _a.case) === null || _b === void 0 ? void 0 : _b.id);
            if (contact) {
                currentContact = contact;
                schemaValidatedMessage.data.channel = currentContact.channel;
                currentContact.parse(schemaValidatedMessage);
                this.updatePublishDigitalContactMap(currentContact);
            }
        }
        catch (error) {
            this.logger.info('checkSchemaAndPublishForMessage', JSON.stringify(error));
        }
    }
    /**
     * checkSchemaAndPublishAvailability.
     * @param currentContact - cxone Digital contact details
     * @param eventData - eventData from digitalWebsocket.onMessageReceived subscription
     * this method will be called in case of MESSAGE_NOTE_CREATED , MESSAGE_NOTE_DELETED , MESSAGE_NOTE_UPDATED , MESSAGE_UPDATED(only for change in message tags), MESSAGE_DELIVERY_STATUS_CHANGED, MESSAGE_SEEN_CHANGED event are updated and
     * to validate the event data and publish that message data
     */
    checkSchemaAndPublishAvailability(eventData) {
        try {
            this.publishAvailabilityState(eventData);
        }
        catch (error) {
            this.logger.info('checkSchemaAndPublishAvailability', JSON.stringify(error));
        }
    }
    /**
     * Method to determine whether to poll user slot api
     * @example
     * ```
     *  manageUserSlotDetails()
     * ```
    */
    manageUserSlotDetails() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const isUserSlotPollingFeatureToggleOn = yield CXoneDigitalUtil.instance.isUserSlotFeatureToggleEnabled();
                // Logging some info for datadog
                this.logger.info('manageUserSlotDetails', 'featureToggleExists value ' + isUserSlotPollingFeatureToggleOn);
                // Polling should start when FT on and leader is elected else call the userslot api
                if (isUserSlotPollingFeatureToggleOn && ((_a = CXoneLeaderElector === null || CXoneLeaderElector === void 0 ? void 0 : CXoneLeaderElector.instance) === null || _a === void 0 ? void 0 : _a.isLeader)) {
                    this.pollUserSlots();
                }
                else {
                    // If FT is turned off, call the userslot api
                    try {
                        this.getUserSlotsApi();
                    }
                    catch (_error) {
                        this.logger.error('manageUserSlotDetails', 'user slot api failure');
                    }
                }
            }
            catch (error) {
                // If an exception is thrown above, call the userslot api
                this.logger.error('manageUserSlotDetails', 'Failed to get the feature toggle api' + JSON.stringify(error));
                try {
                    this.getUserSlotsApi();
                }
                catch (_error) {
                    this.logger.error('manageUserSlotDetails', 'user slot api failure');
                }
            }
        });
    }
    /**
     * Method to invoke user slot API and polling for data reconcile based on case
     * @example
     * ```
     *  pollUserSlots()
     * ```
    */
    pollUserSlots(WebsocketConnectionFailure = false) {
        if (!this.userSlotPollingStarted) {
            this.userSlotPollingStarted = true;
            this.logger.info('pollUserSlots', 'User slot polling started');
            this.userSlotProvider.getUserSlots();
            if (!this.userSlotSubscribed) {
                this.userSlotSubscribed = this.onUserSlotEvent.subscribe((userSlotResponse) => {
                    this.logger.info('pollUserSlots', 'User slot API response received');
                    this.parseUserSlotPollResponse(userSlotResponse, WebsocketConnectionFailure);
                });
            }
        }
    }
    /**
   * Method to parses the user slot poll response and updates the digital contact map accordingly.
   *
   * @param userSlotResponse - The response containing user slots information.
   * @param WebsocketConnectionFailure - A boolean indicating if there was a WebSocket connection failure.
   * @example - parseUserSlotPollResponse(userSlotResponse, WebsocketConnectionFailure)
   *
   */
    parseUserSlotPollResponse(userSlotResponse, WebsocketConnectionFailure) {
        var _a;
        userSlotResponse === null || userSlotResponse === void 0 ? void 0 : userSlotResponse.forEach((contact) => {
            // Checking for the inbox assigned contact is present in Map or not
            // If not present, calling contact Details API & publish it to Map
            if (contact.caseId && !this.digitalContactMap.has(contact.caseId)) {
                this.logger.info('pollUserSlots', 'Inbox assigned contact to be published to map' + JSON.stringify(contact.caseId));
                const eventDetailsToPublish = { eventId: '', eventObject: 'Case', eventType: CXoneDigitalEventType.CASE_INBOX_ASSIGNED };
                this.getDigitalContactDetails(contact.caseId, eventDetailsToPublish);
            }
        });
        //Dev Note: if userSlotResponse length is not equal to digitalContactMap size then it means some contacts are unassigned
        if ((userSlotResponse === null || userSlotResponse === void 0 ? void 0 : userSlotResponse.length) !== ((_a = this.digitalContactMap) === null || _a === void 0 ? void 0 : _a.size) || WebsocketConnectionFailure) {
            const eventDetailsToPublish = { eventId: '', eventObject: 'Case', eventType: CXoneDigitalEventType.CASE_INBOX_UNASSIGNED };
            // Will iterate over the digital contact map to check both contacts are present in userSlotResponse or not
            this.digitalContactMap.forEach((contact, _) => {
                //if contact is not present in userSlotResponse and then it means it is unassigned
                const isContactPresentInUserSlotResponse = userSlotResponse === null || userSlotResponse === void 0 ? void 0 : userSlotResponse.find(userSlot => userSlot.caseId === contact.caseId);
                // checking if the case is view only case or not, if yes then don't remove the case from digital contact map
                const isViewOnlyCase = this.viewOnlyCases.includes(contact === null || contact === void 0 ? void 0 : contact.caseId);
                if (!isContactPresentInUserSlotResponse && !isViewOnlyCase) {
                    // Here will attach the unAssign event to contact & publish it.
                    const contactInMap = Object.assign(Object.assign({}, contact), { eventDetails: eventDetailsToPublish });
                    this.updatePublishDigitalContactMap(contactInMap);
                    // Removing the contact from map
                    this.digitalContactMap.delete(contact.caseId);
                }
            });
        }
    }
    /**
     * updatePublishDigitalContactMap.
     * @param contact - cxone Digital contact details
     * this method will be called in case of MESSAGE_ADDED_INTO_CASE & CASE_STATUS_CHANGED event
     */
    updatePublishDigitalContactMap(currentContact) {
        var _a, _b, _c;
        const isViewOnlyCase = this.viewOnlyCases.includes(currentContact === null || currentContact === void 0 ? void 0 : currentContact.caseId);
        //isAssignedToAgentInbox is false for viewOnly cases and true for !viewOnly cases
        currentContact.isAssignedToAgentInbox = !isViewOnlyCase; //when we receive any event on web socket we set this flag if case is present in viewOnlyCases array    else{
        // this check is for maintaining map of websocket data which is intended for current login user only.
        // as on websocket event we can also receive the data of subscribed cases using event-hub-subscriptions api.
        if (((_b = (_a = currentContact.case) === null || _a === void 0 ? void 0 : _a.inboxAssigneeUser) === null || _b === void 0 ? void 0 : _b.incontactId) === this.currentUserId || isViewOnlyCase) {
            const customFieldDefinitions = currentContact.contactCustomFieldDefs;
            if (((_c = currentContact.case.customFields) === null || _c === void 0 ? void 0 : _c.length) && (customFieldDefinitions === null || customFieldDefinitions === void 0 ? void 0 : customFieldDefinitions.length)) {
                // if case has a custom fields then we have to update label and values
                currentContact.case.customFields.forEach((field) => {
                    var _a, _b;
                    const currentFieldData = customFieldDefinitions.find(data => data.ident === field.ident);
                    field.label = (currentFieldData === null || currentFieldData === void 0 ? void 0 : currentFieldData.label) ? currentFieldData === null || currentFieldData === void 0 ? void 0 : currentFieldData.label : field.ident;
                    if ((_a = currentFieldData === null || currentFieldData === void 0 ? void 0 : currentFieldData.values) === null || _a === void 0 ? void 0 : _a.length) {
                        const currentFieldValue = (_b = currentFieldData === null || currentFieldData === void 0 ? void 0 : currentFieldData.values) === null || _b === void 0 ? void 0 : _b.find((data) => data.name === field.value);
                        if (currentFieldValue) {
                            field.value = (currentFieldValue === null || currentFieldValue === void 0 ? void 0 : currentFieldValue.value) ? currentFieldValue.value : field.value;
                        }
                    }
                });
            }
            this.digitalContactMap.set(currentContact.caseId, currentContact);
        }
        else {
            if (this.digitalContactMap.has(currentContact.caseId)) {
                this.digitalContactMap.delete(currentContact.caseId);
                if (this.digitalContactMap.size === 0) {
                    this.terminateEventHubApiPolling();
                }
            }
        }
        if (isViewOnlyCase && currentContact.eventDetails.eventType === CXoneDigitalEventType.CASE_INBOX_UNASSIGNED) { //on transferring a view only case, stop publishing the contact as we need not to remove preview case from agent inbox on transfer
            return;
        }
        this.publishContact(currentContact);
    }
    /**
     * get assigned digital contact details based on caseId
     * @example
     * ```
     * getDigitalContactDetails
     * ```
    */
    getDigitalContactDetails(contactId, eventDetails, isAssignedToAgentInbox = true) {
        this.digitalContactService.getDigitalContactDetails(contactId).then((resp) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e, _f, _g;
            this.logger.info('getContactDetails', 'Assigned Digital contact details received' + JSON.stringify(resp));
            //For public channels, related message API invoked below to fetch complete message history
            if (!((_b = (_a = resp === null || resp === void 0 ? void 0 : resp.data) === null || _a === void 0 ? void 0 : _a.channel) === null || _b === void 0 ? void 0 : _b.isPrivate)) {
                const relatedMessagesResponse = yield this.digitalContactService.getRelatedMessages(contactId);
                const isRelatedMessageArray = (_c = relatedMessagesResponse === null || relatedMessagesResponse === void 0 ? void 0 : relatedMessagesResponse.data) === null || _c === void 0 ? void 0 : _c.data;
                isRelatedMessageArray && isRelatedMessageArray.forEach((message) => {
                    message.isRelatedMessage = true;
                });
                (_d = resp === null || resp === void 0 ? void 0 : resp.data) === null || _d === void 0 ? void 0 : _d.messages.push(...relatedMessagesResponse.data.data);
            }
            const contactDetails = { data: resp === null || resp === void 0 ? void 0 : resp.data };
            const skillId = (_g = (_f = (_e = contactDetails === null || contactDetails === void 0 ? void 0 : contactDetails.data) === null || _e === void 0 ? void 0 : _e.routingQueue) === null || _f === void 0 ? void 0 : _f.skillId) === null || _g === void 0 ? void 0 : _g.toString();
            //This method used to get skill and customer/agent Response Timer details (ART)/(CRT) from the indexedDB
            const skillDetails = skillId && (yield this.skillService.getSkillById(skillId, true));
            contactDetails.data.routingQueue = skillDetails ? Object.assign(Object.assign({}, contactDetails.data.routingQueue), { agentResponseEnabled: skillDetails.agentResponseEnabled, agentFirstResponseTime: skillDetails.agentFirstResponseTime, agentFollowOnResponseTime: skillDetails.agentFollowOnResponseTime, customerResponseEnabled: skillDetails.customerResponseEnabled, customerIdleTime: skillDetails.customerIdleTime, timeExtensionEnabled: skillDetails.timeExtensionEnabled }) : contactDetails.data.routingQueue;
            contactDetails.data.isAssignedToAgentInbox = isAssignedToAgentInbox;
            const isViewOnlyCase = this.viewOnlyCases.includes(contactId);
            if (!isAssignedToAgentInbox && !isViewOnlyCase) {
                //when view only case comes first time on clicking customer history card/interaction search row or when page is reloaded
                this.viewOnlyCases.push(contactId);
            }
            else if (isAssignedToAgentInbox && isViewOnlyCase) {
                //when subscriber assigns case to the same agent or when case is routed through unified routing to the same agent or when view only case is transferred to different agent(isAssignedToAgent = true)
                this.viewOnlyCases = this.viewOnlyCases.filter((viewOnlyCaseId) => viewOnlyCaseId !== contactId);
            }
            const responseToValidate = eventDetails ? Object.assign(Object.assign({}, eventDetails), contactDetails) : Object.assign({}, contactDetails);
            const schemaValidatedResponse = this.cxoneDigitalContactHelper.validateResponseSchema(responseToValidate);
            const cxoneDigitalContact = new CXoneDigitalContact();
            yield cxoneDigitalContact.parse(schemaValidatedResponse);
            if (skillId) {
                //Get the disposition details for skill attached to digital contact
                const skillResponse = yield this.skillService.getSkillById(skillId);
                // If acwType is disposition then only will publish disposition details.
                if ((skillResponse === null || skillResponse === void 0 ? void 0 : skillResponse.acwTypeId) === AcwType.DISPOSITION) {
                    cxoneDigitalContact.requireDisposition = skillResponse === null || skillResponse === void 0 ? void 0 : skillResponse.requireDisposition;
                    //publish the disposition details for digital contact
                    this.publishDispositionDetails(cxoneDigitalContact.caseId, skillId, MediaType.DIGITAL);
                }
            }
            else {
                this.logger.error('getContactDetails', 'Skill id is missing for digital contact ' + cxoneDigitalContact.caseId);
            }
            // Setting data in map post first time authorization when websocket is not emitting any events
            // Reusing the DIGITAL_CONTACT constant value(DigitalContactEvent) as the contact type is Digital
            if (cxoneDigitalContact.type === ContactType.DIGITAL_CONTACT && cxoneDigitalContact.status !== DigitalContactStatus.INCOMING) {
                this.updatePublishDigitalContactMap(cxoneDigitalContact);
            }
            // Call event hub subscription api when websocket is connected
            if (!this.isWebSocketFailure)
                cxoneDigitalContact.subscribeToEventHub();
        }), (error) => {
            this.logger.error('getContactDetails', 'Assigned Digital contact fetch failed ' + JSON.stringify(error));
        });
    }
    /**
     * Method used to publish disposition details
     * @param caseId - Case Id
     * @param skillId - Skill Id
     * ```
     * @example -
     * publishDispositionDetails('1234', '6545')
     * ```
     */
    publishDispositionDetails(caseId, skillId, mediaType) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.dispositionService.getDispositions(skillId, mediaType, caseId).then(response => {
                this.onDispositionEvent.next(response);
            }, (error) => {
                //we are using existing message prop from CXoneSdkError to pass case id 
                const updatedError = Object.assign(Object.assign({}, error), { message: caseId });
                this.onDispositionEvent.next(updatedError);
            });
        });
    }
    /**
     * Method to subscribeToEventHub
     * @returns - returns promise to event hub subscription call
     * ```
     * @example
     * subscribeToEventHub()
     * ```
     */
    subscribeToEventHub() {
        setInterval(() => {
            this.digitalContactId = [...this.digitalContactMap.keys()];
            this.eventHubProvider.eventHubSubscription(this.digitalContactId);
        }, this.EVENT_HUB_POLLING_INTERVAL_MS);
    }
    /**
       * Method to terminateEventHubApiPolling
       * @returns
       * ```
       * @example
       * terminateEventHubApiPolling
       * ```
       */
    terminateEventHubApiPolling() {
        try {
            this.eventHubProvider.terminatePolling();
        }
        catch (error) {
            this.logger.error('terminateEventHubApiPolling', 'Terminate Event Hub Polling failed ' + JSON.stringify(error));
        }
    }
    /**
     * Method used to get Digital Contact Details,publish it and subscribe to event hub
     * @param contactId - Contact Id of the digital contact
     * ```
     * @example -
     * getContactDetails('1234')
     * ```
     */
    getContactDetails(contactId, isAssignedToAgentInbox = true) {
        const eventDetailsToPublish = { eventId: '', eventObject: 'Case', eventType: CXoneDigitalEventType.CASE_INBOX_ASSIGNED };
        this.getDigitalContactDetails(contactId, eventDetailsToPublish, isAssignedToAgentInbox);
    }
    /**
     * subscribe the digital contact event
     */
    digitalContactEventHandler() {
        this.acdSession.digitalContactSubject.subscribe((contact) => {
            const cxoneDigitalContact = new CXoneDigitalContact();
            if (!this.digitalContactMap.has(contact.digitalCaseId)) {
                const updatedDigitalContact = cxoneDigitalContact.getDigitalContact(contact);
                this.publishContact(updatedDigitalContact);
            }
        });
    }
    /**
     * subscribe to auto summary event
     */
    updateAutoSummaryEventHandler() {
        this.acdSession.agentAssistSummarySubject.subscribe((autoSummaryStart) => {
            var _a;
            if ((autoSummaryStart === null || autoSummaryStart === void 0 ? void 0 : autoSummaryStart.mediaType) === MediaType.DIGITAL) {
                const businessUnitData = (LocalStorageHelper.getItem(StorageKeys.BUSINESS_UNIT, true) || {});
                const isAutoSummaryEnabledInBU = (_a = businessUnitData === null || businessUnitData === void 0 ? void 0 : businessUnitData.features) === null || _a === void 0 ? void 0 : _a.find((feature) => feature.productId === 177 && feature.isEnabled);
                if (isAutoSummaryEnabledInBU && !CXoneClient.instance.autoSummaryNotificationService.isConnectionCreated) {
                    const userInfo = CXoneClient.instance.cxoneUser.getUserInfo();
                    const cxoneConfig = CXoneClient.instance.auth.getCXoneConfig();
                    const { aahNotificationWssUri } = cxoneConfig;
                    if (aahNotificationWssUri) {
                        CXoneClient.instance.autoSummaryNotificationService.connect(aahNotificationWssUri);
                        const autoSummaryDigitalInput = { webSocketUri: aahNotificationWssUri, contactId: '', subscriptions: [`${userInfo.icAgentId}_autosummary`], providerId: 'Auto-Summary' };
                        CXoneClient.instance.autoSummaryNotificationService.subscribe(autoSummaryDigitalInput);
                    }
                    const autoSummaryDigitalInput = { webSocketUri: aahNotificationWssUri, contactId: '', subscriptions: [`${userInfo.icAgentId}_autosummary`], providerId: 'Auto-Summary' };
                    CXoneClient.instance.autoSummaryNotificationService.subscribe(autoSummaryDigitalInput);
                }
            }
        });
    }
    /**
     * user slot api call for the userId
     * @example
     * ```
     * getUserSlotsApi
     * ```
    */
    getUserSlotsApi() {
        this.digitalService.getUserSlotDetails().then((response) => {
            const userSlotResponse = UserSlotsSchema.validateSync(response, { stripUnknown: true });
            userSlotResponse === null || userSlotResponse === void 0 ? void 0 : userSlotResponse.forEach((contact) => {
                if (contact.caseId && !this.digitalContactMap.has(contact.caseId)) {
                    const eventDetailsToPublish = { eventId: '', eventObject: 'Case', eventType: CXoneDigitalEventType.CASE_INBOX_ASSIGNED };
                    this.getDigitalContactDetails(contact.caseId, eventDetailsToPublish);
                }
            });
        });
    }
    /**
     * Terminate the user slot polling.
     */
    terminateUserSlotPolling() {
        this.userSlotProvider.terminateUserSlotPolling();
        this.userSlotPollingStarted = false;
    }
}
//# sourceMappingURL=digital-contact-manager.js.map