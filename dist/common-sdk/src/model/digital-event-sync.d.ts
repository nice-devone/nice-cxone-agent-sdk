import { CXoneMessage } from '../lib/model/digital/schema/events/cxone-message';
/**
 * Represents the synchronization details of a digital event.
 * This interface is used to process events through Digital Event Sync Service.
 */
export interface DigitalEventSync {
    /**
     * The contact id of the received the event.
     */
    contactId: string;
    /**
     * The name of the event received.
     */
    eventName: string;
    /**
     * The unique id for tracking the events and avoiding duplication.
     */
    traceId: string;
    /**
     * The response associated with the digital event, if applicable.
     */
    syncEventResponse?: CXoneMessage;
}
