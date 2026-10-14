import { BaseDeltaEvent } from './cxone-base-delta-event';
/**
 * Delta shape for message preview events.
 */
export interface MessagePreviewDelta {
    /** Preview text typed by the patron. null when no preview text is present. */
    messagePreviewText: string | null;
}
/**
 * Delta event class for MESSAGE_PREVIEW (MessagePreviewCreated) WebSocket events.
 *
 * Extends BaseDeltaEvent<T> directly — WS payloads include data.case.id so the
 * existing base class validateCommonFields() provides caseId, interactionId, traceId,
 * and timestamp. This class adds threadId from data.thread.id.
 *
 * @example
 * const event = new MessagePreviewDeltaEvent(rawWsData);
 * // event.caseId === 'case-abc'
 * // event.threadId === 'thread-xyz'
 * // event.delta.messagePreviewText === 'Hel'  (patron typing in progress)
 * // event.delta.messagePreviewText === null    (preview cleared)
 */
export declare class MessagePreviewDeltaEvent extends BaseDeltaEvent<MessagePreviewDelta> {
    /**
     * Thread ID extracted from data.thread.id.
     * Used for the per-thread dispatch guard in the middleware.
     */
    threadId: string;
    /**
     * Validates threadId and extracts the preview text from the event payload.
     * @param eventData - Raw WebSocket event payload.
     * @throws Error when threadId is missing/empty/non-string, or when
     *   messagePreview.messageContent.text is present but not a string or null.
     * @example
     * // Called internally by BaseDeltaEvent constructor — do not invoke directly.
     * const event = new MessagePreviewDeltaEvent(rawWsData); // validateDeltaFields runs here
     */
    protected validateDeltaFields(eventData: any): void;
}
