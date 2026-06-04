import { BaseDeltaEvent } from './cxone-base-delta-event';
/**
 * Delta shape for sender typing events.
 */
export interface TypingDelta {
    /** true for SenderTypingStarted, false for SenderTypingEnded */
    isTyping: boolean;
    threadId: string;
}
/**
 * Delta event class for SENDER_TYPING_START WebSocket events.
 *
 * Extends BaseDeltaEvent<T> which validates and provides caseId, interactionId,
 * eventType, traceId, and timestamp from the WS payload.
 * Adds threadId (from data.thread.id) needed for the per-thread dispatch guard
 * in the middleware.
 *
 * @example
 * const event = new SenderTypingDeltaEvent(rawWsData);
 * // event.caseId    === 'case-abc'
 * // event.threadId  === 'thread-abc'
 * // event.delta.isTyping === true
 */
export declare class SenderTypingDeltaEvent extends BaseDeltaEvent<TypingDelta> {
    /**
     * * override common-field validation because SenderTypingDeltaEvent
     * does not get caseId, interactionId from Ws event.
     * @param eventData - Raw event payload to validate.
     * @throws Error if validation fails for any common field
     * @example - validateCommonFields() is called internally by parseAndValidate().
     */
    protected validateCommonFields(eventData: any): void;
    /**
     * Validates threadId and eventType, and sets delta.isTyping.
     * @param eventData - Raw WebSocket event payload.
     * @throws Error when threadId is missing/empty/non-string or eventType is not SenderTypingStarted.
     * @example
     * // Called internally by BaseDeltaEvent constructor — do not invoke directly.
     * const event = new SenderTypingDeltaEvent(rawWsData); // validateDeltaFields runs here
     */
    protected validateDeltaFields(eventData: any): void;
}
