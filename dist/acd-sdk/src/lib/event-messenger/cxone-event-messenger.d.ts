import { EventSubscriptionType } from './enum/post-message-event-type';
import { PostMessageEvent, PostMessageEventData } from './model/post-event';
/**
 * This class is used to send events from the CXone Agent application.
 */
export declare class CXoneEventMessenger {
    private static singleton;
    private agentSession;
    private logger;
    private pendingSubscriptions;
    private windowEventSubscribers;
    /**
     * Constructor for CXoneEventMessenger
     * @example
     * ```
     * const cxoneEventMessenger = new CXoneEventMessenger();
     * ```
     */
    constructor();
    /**
       * Method to create singleton object of the class
       * ```
       * @example
       * const cxoneAcdClient = CXoneAcdClient.instance();
       * ```
       */
    static get instance(): CXoneEventMessenger;
    /**
       * Method to initiate the event messenger
       * @param pendingSubscriptions - pending subscriptions
       * @example
       * ```
       * init(event);
       * ```
       */
    init(): void;
    /**
       * Method to handle received events
       * @param event - event
       * @example
       * ```
       * onPostMessageReceived()
       * ```
       */
    onPostMessageReceived(event: MessageEvent): void;
    /**
     * Method to handle session token update
     * @example
     * ```
     * onSessionTokenUpdate();
     * ```
     */
    onSessionTokenUpdate(): void;
    /**
     * Method to process the pending subscriptions
     * @param pendingSubscriptions - pending subscriptions
     * ```
     * @example
     * processPendingSubscriptions(pendingSubscriptions);
     * ```
     */
    processPendingSubscriptions(pendingSubscriptions: MessageEvent[]): void;
    /**
       * Set up the window in windowEventSubscribers
       * @param event - event
       * @example
       * ```
       * onWindowSubscribe(event);
       * ```
       */
    onWindowSubscribe(event: MessageEvent<PostMessageEventData>): void;
    /**
       * Method to get next event received
       * @example
       * ```
       * onGetNextEventReceived();
       * ```
       */
    getNextEventHandler(): void;
    /**
     * Send events to window
     * @param subscriberObject - subscriberObject
     * @param events - events
     * @example
     * ```
     * sendEventsToWindow(subscriberObject, events);
     * ```
     */
    sendEventsToWindow(subscriber: PostMessageEvent, events: MessageEvent<PostMessageEventData>[] | Array<{
        [key: string]: string;
    }>): void;
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
    validateWindowObjectIsNew(childWindow: MessageEventSource | null): boolean;
    /**
       * validate subscription event
       * @param event - event
       * @returns - result
       * @example
       * ```
       * validateSubscriptionEvent(event);
       * ```
       */
    validateSubscriptionEvent(event: MessageEvent<PostMessageEventData>): {
        status: string;
        reason: string;
    };
    /**
     * Returns an array with all of the subscription types in a cleaned state.Will not include any invalid subscription types.
     * @param subscriptionTypes - subscriptionTypes
     * @returns - result
     * @example
     * ```
     * standardizeSubscriptionTypes(event);
     * ```
     */
    standardizeSubscriptionTypes(subscriptionTypes: string[]): string[];
    /**
         * clean subscription event
         * @param event - event
         * @returns - result
         * @example
         * ```
         * cleanSubscriptionEvent(event);
         * ```
         */
    cleanSubscriptionEvent(event: MessageEvent<PostMessageEventData>): PostMessageEvent | null;
    /**
     * validate and clean contact id
     * @param contactId - contactId
     * @returns - result
     * @example
     * ```
     * validateAndCleanContactId(contactId);
     * ```
     */
    validateAndCleanContactId(contactId: number | null): number | null;
    /**
       * Publish events to windows
       * @param events - events
       * @example
       * ```
       * publishEventsToWindows(events);
       * ```
       */
    publishEventsToWindows(events: Array<{
        [key: string]: string;
    }>): void;
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
    checkWindowCanSendEvent(subscriber: PostMessageEvent, event: {
        [key: string]: string;
    }): boolean;
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
    checkSubscriberForEvent(subscriber: PostMessageEvent, event: {
        [key: string]: string;
    }): boolean;
    /**
       * Method to check if session info can be sent
       * @param subscriber - subscriber
       * @returns - boolean
       * @example
       * ```
       * canSendSessionInfo(subscriber);
       * ```
       */
    canSendSessionInfo(subscriber: PostMessageEvent): boolean | undefined;
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
    checkForSubscriptionType(subscriber: PostMessageEvent, type: EventSubscriptionType): boolean | undefined;
    /**
       * Method to handle unsubscribe event
       * @param event - event
       * @example
       * ```
       * onWindowUnsubscribe(event);
       * ```
       */
    onWindowUnsubscribe(event: MessageEvent): void;
}
