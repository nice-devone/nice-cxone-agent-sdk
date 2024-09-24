import { EventMessageType, EventSubscriptionType } from '../enum/post-message-event-type';
export interface PostMessageEventData {
    /**
     * @remarks - EventMessageType
     */
    messageType: EventMessageType | string;
    /**
     * @remarks - Contact Id
     */
    contactId?: number | null;
    /**
     * @remarks - Subscription Types
     */
    subscriptionTypes?: EventSubscriptionType[];
    /**
     * @remarks - Status
     */
    status?: string;
    /**
     * @remarks - Reason
     */
    reason?: string;
}
export interface PostMessageEvent {
    /**
     * @remarks - Event Data
     */
    data: PostMessageEventData;
    /**
     * @remarks - Event Source
     */
    window: any;
    /**
     * @remarks - Subscription Types
     */
    subscriptionTypes?: string[];
    /**
     * @remarks - Contact Id
     */
    contactId?: number | null;
}
