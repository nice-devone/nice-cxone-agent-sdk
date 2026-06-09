import { ACDSessionManager, GetNextEventType, Logger } from '@nice-devone/core-sdk';
import { contactButtons } from '@nice-devone/common-sdk';
import { EventMessageType, EventSubscriptionType } from './enum/post-message-event-type';
import { CXoneAcdClient } from '../cxone-acd-client';
/**
 * This class is used to send events from the CXone Agent application.
 */
export class CXoneEventMessenger {
    /**
     * Constructor for CXoneEventMessenger
     * @example
     * ```
     * const cxoneEventMessenger = new CXoneEventMessenger();
     * ```
     */
    constructor() {
        this.logger = new Logger('cxoneEventMessenger', 'CXoneEventMessenger');
        this.pendingSubscriptions = [];
        this.windowEventSubscribers = [];
        this.agentSession = ACDSessionManager.instance;
        this.getNextEventHandler();
    }
    /**
       * Method to create singleton object of the class
       * ```
       * @example
       * const cxoneAcdClient = CXoneAcdClient.instance();
       * ```
       */
    static get instance() {
        if (!CXoneEventMessenger.singleton) {
            CXoneEventMessenger.singleton = new CXoneEventMessenger();
        }
        return CXoneEventMessenger.singleton;
    }
    /**
       * Method to initiate the event messenger
       * @param pendingSubscriptions - pending subscriptions
       * @example
       * ```
       * init(event);
       * ```
       */
    init() {
        this.processPendingSubscriptions(this.pendingSubscriptions);
    }
    /**
       * Method to handle received events
       * @param event - event
       * @example
       * ```
       * onPostMessageReceived()
       * ```
       */
    onPostMessageReceived(event) {
        switch (event.data.messageType) {
            case EventMessageType.REGISTER_FOR_CLIENT_EVENTS:
                this.pendingSubscriptions.push(event);
                this.init();
                this.pendingSubscriptions.pop();
                break;
            case EventMessageType.UNREGISTER_FOR_CLIENT_EVENTS:
                this.onWindowUnsubscribe(event);
                break;
            case EventMessageType.ANSWER_EVENT:
                this.agentSession.answerEvent.next(event);
                break;
            case EventMessageType.REFUSE_EVENT:
                this.agentSession.rejectEvent.next(event);
                break;
            case EventMessageType.MUTE_EVENT:
                this.agentSession.callControlEvent.next(contactButtons.mute);
                break;
            case EventMessageType.RECORD_EVENT:
                this.agentSession.callControlEvent.next(contactButtons.record);
                break;
            case EventMessageType.HANGUP_EVENT:
                this.agentSession.callControlEvent.next(contactButtons.hungup);
                break;
            case EventMessageType.HOLD_EVENT:
                this.agentSession.callControlEvent.next(contactButtons.hold);
                break;
            case EventMessageType.MASK_EVENT:
                this.agentSession.callControlEvent.next(contactButtons.mask);
                break;
        }
    }
    ;
    /**
     * Method to handle session token update
     * @example
     * ```
     * onSessionTokenUpdate();
     * ```
     */
    onSessionTokenUpdate() {
        if (!this.agentSession.hasSessionId)
            return;
        const sessionEvent = {
            messageType: 'SessionInfo',
            sessionToken: this.agentSession.getSessionId(),
        };
        this.publishEventsToWindows([sessionEvent]);
    }
    /**
     * Method to process the pending subscriptions
     * @param pendingSubscriptions - pending subscriptions
     * ```
     * @example
     * processPendingSubscriptions(pendingSubscriptions);
     * ```
     */
    processPendingSubscriptions(pendingSubscriptions) {
        pendingSubscriptions
            .filter(event => { var _a; return ((_a = event === null || event === void 0 ? void 0 : event.data) === null || _a === void 0 ? void 0 : _a.messageType) === EventMessageType.REGISTER_FOR_CLIENT_EVENTS; })
            .forEach(event => this.onWindowSubscribe(event));
    }
    /**
       * Set up the window in windowEventSubscribers
       * @param event - event
       * @example
       * ```
       * onWindowSubscribe(event);
       * ```
       */
    onWindowSubscribe(event) {
        if (!(event === null || event === void 0 ? void 0 : event.data))
            return;
        const response = this.validateSubscriptionEvent(event);
        const subscriberObject = this.cleanSubscriptionEvent(event);
        const ackEvent = { messageType: 'ClientEventSubscriptionAcknowledge', contactId: (subscriberObject === null || subscriberObject === void 0 ? void 0 : subscriberObject.contactId) || null };
        let events = [];
        if (this.validateWindowObjectIsNew(event.source)) {
            if (response.status === 'OK' && subscriberObject) {
                const agentCurrentState = CXoneAcdClient.instance.agentStateService.getAgentState();
                if (agentCurrentState && subscriberObject) {
                    events = this.getEventsFromState(subscriberObject);
                }
                ackEvent.contactId = subscriberObject === null || subscriberObject === void 0 ? void 0 : subscriberObject.contactId;
                this.windowEventSubscribers.push(subscriberObject);
            }
            ackEvent.status = response.status;
            ackEvent.reason = response.reason;
            events.push(ackEvent);
            subscriberObject && this.sendEventsToWindow(subscriberObject, events);
        }
        else {
            this.logger.warn('onWindowSubscribe', 'Error processing Client Event Subscription. Issuer has already subscribed.');
        }
    }
    /**
       * Method to get events from state
       * @param subscriberObject - subscriberObject
       * @returns - events
       * @example
       * ```
       * getEventsFromState(subscriberObject);
       * ```
       */
    getEventsFromState(subscriber) {
        var _a;
        const contactEvents = [];
        let sendAgent = false;
        let sendAll = false;
        let sendContacts = false;
        let sendSession = false;
        const agentState = (_a = CXoneAcdClient.instance.agentStateService.getAgentState()) === null || _a === void 0 ? void 0 : _a.agentStateData;
        const isCallContactAvailable = CXoneAcdClient.instance.contactManager.checkAcdContactsAvailable();
        if (subscriber) {
            if (!subscriber.subscriptionTypes) {
                subscriber.subscriptionTypes = [];
            }
            sendAgent = this.checkForSubscriptionType(subscriber, EventSubscriptionType.AGENT) || false;
            sendAll = (subscriber.subscriptionTypes.length === 0 && !subscriber.contactId) || this.checkForSubscriptionType(subscriber, EventSubscriptionType.ALL) || false;
            sendContacts = this.checkForSubscriptionType(subscriber, EventSubscriptionType.ALL_CONTACTS) || false;
            sendSession = this.canSendSessionInfo(subscriber) || false;
            if (agentState && (sendAll || sendAgent)) {
                contactEvents.push(agentState);
            }
            const allContacts = CXoneAcdClient.instance.contactManager.getAllContacts();
            if (isCallContactAvailable && (sendAll || sendContacts)) {
                // send all contacts
                for (const contact of Object.values(allContacts)) {
                    contactEvents.push(contact);
                }
            }
            if ((subscriber === null || subscriber === void 0 ? void 0 : subscriber.contactId) && allContacts[subscriber.contactId]) {
                // we have a specific contact ID that the subscriber is interested in
                const contactEvent = allContacts[subscriber.contactId];
                if (contactEvents.indexOf(contactEvent) === -1) {
                    contactEvents.push(contactEvent);
                }
            }
            if (sendSession && this.agentSession.hasSessionId) {
                const sessionEvent = {
                    messageType: 'SessionInfo',
                    sessionToken: this.agentSession.getSessionId(),
                };
                contactEvents.push(sessionEvent);
            }
        }
        return contactEvents;
    }
    /**
       * Method to get next event received
       * @example
       * ```
       * onGetNextEventReceived();
       * ```
       */
    getNextEventHandler() {
        this.agentSession.onGetNextEvent.subscribe((events) => {
            this.publishEventsToWindows(events);
        });
    }
    /**
     * Send events to window
     * @param subscriberObject - subscriberObject
     * @param events - events
     * @example
     * ```
     * sendEventsToWindow(subscriberObject, events);
     * ```
     */
    sendEventsToWindow(subscriber, events) {
        if (subscriber === null || subscriber === void 0 ? void 0 : subscriber.window) {
            subscriber.window.postMessage({
                issuer: 'CXA',
                contactId: subscriber.contactId || null,
                events,
            }, '*');
        }
    }
    /**
         * Returns true if the window object is not one we already have a reference to
         * This will help avoid sending double messages to a window if they call subscribe twice
         * @param window - window
         * @returns - result
         * @example
         * ```
         * validateWindowObjectIsNew(window);
         * ```
         */
    validateWindowObjectIsNew(childWindow) {
        if (!childWindow)
            return false;
        return !this.windowEventSubscribers.some((subscriber) => subscriber.window === childWindow);
    }
    /**
       * validate subscription event
       * @param event - event
       * @returns - result
       * @example
       * ```
       * validateSubscriptionEvent(event);
       * ```
       */
    validateSubscriptionEvent(event) {
        var _a, _b, _c;
        const result = { status: 'OK', reason: 'Success' };
        const parsedContactId = (_a = event.data) === null || _a === void 0 ? void 0 : _a.contactId;
        if (parsedContactId && isNaN(parsedContactId)) {
            result.status = 'ERROR';
            result.reason = 'Invalid Contact Id';
        }
        else if (((_b = event.data) === null || _b === void 0 ? void 0 : _b.subscriptionTypes) && this.standardizeSubscriptionTypes((_c = event.data) === null || _c === void 0 ? void 0 : _c.subscriptionTypes).length === 0) {
            result.status = 'ERROR';
            result.reason = 'Invalid Subscription Types.';
        }
        return result;
    }
    ;
    /**
     * Returns an array with all of the subscription types in a cleaned state.Will not include any invalid subscription types.
     * @param subscriptionTypes - subscriptionTypes
     * @returns - result
     * @example
     * ```
     * standardizeSubscriptionTypes(event);
     * ```
     */
    standardizeSubscriptionTypes(subscriptionTypes) {
        if (!Array.isArray(subscriptionTypes) || subscriptionTypes.length === 0) {
            return [];
        }
        return subscriptionTypes.reduce((cleanedSubscriptionTypes, type) => {
            if (typeof type === 'string') {
                const lowerCaseType = type.toLowerCase();
                if (Object.values(EventSubscriptionType).includes(lowerCaseType)) {
                    cleanedSubscriptionTypes.push(lowerCaseType);
                }
                else {
                    this.logger.error('standardizeSubscriptionTypes', 'Invalid subscription type requested: ' + lowerCaseType);
                }
            }
            return cleanedSubscriptionTypes;
        }, []);
    }
    /**
         * clean subscription event
         * @param event - event
         * @returns - result
         * @example
         * ```
         * cleanSubscriptionEvent(event);
         * ```
         */
    cleanSubscriptionEvent(event) {
        var _a;
        if (!event || !event.data)
            return null;
        const contactId = ((_a = event.data) === null || _a === void 0 ? void 0 : _a.contactId) && this.validateAndCleanContactId(event.data.contactId);
        const subscriptionTypes = this.standardizeSubscriptionTypes(event.data.subscriptionTypes || []);
        return {
            window: event.source,
            subscriptionTypes,
            contactId,
            data: event.data,
        };
    }
    ;
    /**
     * validate and clean contact id
     * @param contactId - contactId
     * @returns - result
     * @example
     * ```
     * validateAndCleanContactId(contactId);
     * ```
     */
    validateAndCleanContactId(contactId) {
        if (contactId && !isNaN(contactId) && contactId > 0) {
            return contactId;
        }
        else {
            this.logger.error('validateAndCleanContactId', `Client Event Subscription Error - Invalid contact id on subscription - [${contactId}]`);
            return null;
        }
    }
    /**
       * Publish events to windows
       * @param events - events
       * @example
       * ```
       * publishEventsToWindows(events);
       * ```
       */
    publishEventsToWindows(events) {
        this.windowEventSubscribers.forEach((subscriber) => {
            const subscriberEvents = events.filter((event) => this.checkWindowCanSendEvent(subscriber, event));
            if (subscriberEvents.length > 0) {
                this.sendEventsToWindow(subscriber, subscriberEvents);
            }
        });
    }
    ;
    /**
     * Check subscriber for event
     * @param subscriber - subscriber
     * @param event - event
     * @returns - result
     * @example
     * ```
     * checkSubscriberForEvent(subscriber, event);
     * ```
     */
    checkWindowCanSendEvent(subscriber, event) {
        var _a;
        if (!subscriber || !(subscriber === null || subscriber === void 0 ? void 0 : subscriber.window) || !event) {
            return false;
        }
        const contactId = +(event === null || event === void 0 ? void 0 : event.contactId); // contact id from event
        // Check if the contactId matches
        if ((subscriber === null || subscriber === void 0 ? void 0 : subscriber.contactId) && (subscriber === null || subscriber === void 0 ? void 0 : subscriber.contactId) === contactId) {
            return true;
        }
        // Check if subscriber doesn't limit by event types and doesn't specify a contactId
        if (((_a = subscriber === null || subscriber === void 0 ? void 0 : subscriber.subscriptionTypes) === null || _a === void 0 ? void 0 : _a.length) === 0 && !(subscriber === null || subscriber === void 0 ? void 0 : subscriber.contactId)) {
            return true;
        }
        // Validate that the subscription types allow this kind of event
        return this.checkSubscriberForEvent(subscriber, event);
    }
    /**
     * Check subscriber for event
     * @param subscriber - subscriber
     * @param event - event
     * @returns - result
     * @example
     * ```
     * checkSubscriberForEvent(subscriber, event);
     * ```
     */
    checkSubscriberForEvent(subscriber, event) {
        var _a, _b, _c;
        const contactId = +(event === null || event === void 0 ? void 0 : event.contactId);
        const eventType = (_a = event.Type) === null || _a === void 0 ? void 0 : _a.toLowerCase();
        const messageType = event.messageType;
        // If no subscription types and no contactId, subscriber qualifies for everything
        if (((_b = subscriber === null || subscriber === void 0 ? void 0 : subscriber.subscriptionTypes) === null || _b === void 0 ? void 0 : _b.length) === 0 && !subscriber.contactId) {
            return true;
        }
        // Check if subscriber has 'ALL' subscription type
        if (this.checkForSubscriptionType(subscriber, EventSubscriptionType.ALL)) {
            return true;
        }
        // Iterate through subscription types to determine if event can be sent
        for (const type of ((_c = subscriber.subscriptionTypes) !== null && _c !== void 0 ? _c : [])) {
            if ((type === EventSubscriptionType.AGENT && !contactId && messageType !== EventMessageType.SESSION_INFO) ||
                (type === EventSubscriptionType.ALL_CONTACTS && contactId) ||
                (contactId && subscriber.contactId && contactId === subscriber.contactId) ||
                (type === eventType && messageType !== EventMessageType.SESSION_INFO) ||
                (this.canSendSessionInfo(subscriber) && (messageType === EventMessageType.SESSION_INFO || eventType === GetNextEventType.AGENT_SESSION_END_EVENT || eventType === GetNextEventType.REMOTE_AGENT_SESSION_END_EVENT))) {
                return true;
            }
        }
        return false;
    }
    ;
    /**
       * Method to check if session info can be sent
       * @param subscriber - subscriber
       * @returns - boolean
       * @example
       * ```
       * canSendSessionInfo(subscriber);
       * ```
       */
    canSendSessionInfo(subscriber) {
        return (this.checkForSubscriptionType(subscriber, EventSubscriptionType.ALL) ||
            this.checkForSubscriptionType(subscriber, EventSubscriptionType.SESSION_INFO)) &&
            this.agentSession.hasSessionId;
    }
    ;
    /**
       * Method to check for subscription type
       * @param subscriber  - subscriber
       * @param type - type
       * @returns - boolean
       * @example
       * ```
       * checkForSubscriptionType(subscriber, type);
       * ```
       */
    checkForSubscriptionType(subscriber, type) {
        var _a;
        return (_a = subscriber === null || subscriber === void 0 ? void 0 : subscriber.subscriptionTypes) === null || _a === void 0 ? void 0 : _a.includes(type);
    }
    /**
       * Method to handle unsubscribe event
       * @param event - event
       * @example
       * ```
       * onWindowUnsubscribe(event);
       * ```
       */
    onWindowUnsubscribe(event) {
        if (!(event === null || event === void 0 ? void 0 : event.source))
            return;
        const index = this.windowEventSubscribers.findIndex((subscriber) => subscriber.window === event.source);
        if (index !== -1) {
            this.windowEventSubscribers.splice(index, 1);
        }
    }
    ;
}
//# sourceMappingURL=cxone-event-messenger.js.map