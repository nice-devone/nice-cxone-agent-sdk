import { Subject } from 'rxjs';
import { CcfLogger } from '@nice-devone/agent-sdk';
import { CaseStatusChangedDeltaEvent, MessageAddedIntoCaseDeltaEvent } from '@nice-devone/common-sdk';
/**
 * DigitalEventFactory - Singleton factory for parsing and publishing delta events.
 *
 * This factory intercepts WebSocket events, extracts only the changed fields (delta),
 * and publishes lightweight payloads to subscribers through an RxJS Subject.
 *
 * @example
 * // Get factory instance
 * const factory = DigitalEventFactory.instance;
 *
 * // Subscribe to delta events
 * factory.deltaEventSubject.subscribe(deltaEvent =\> \{
 *   console.log('Received delta event:', deltaEvent);
 * \});
 *
 * // Parse and publish a WebSocket event
 * factory.parseAndPublishDeltaEvent(rawWebSocketEvent);
 */
export declare class DigitalEventFactory {
    /**
     * Singleton instance
     */
    private static singleton;
    /**
     * Logger instance for debugging and error tracking
     */
    protected logger: CcfLogger;
    /**
     * RxJS Subject for publishing delta events to subscribers
     */
    deltaEventSubject: Subject<CaseStatusChangedDeltaEvent | MessageAddedIntoCaseDeltaEvent>;
    /**
     * Retrieves the singleton instance of DigitalEventFactory.
     * Creates the instance if it doesn't exist.
     *
     * @returns DigitalEventFactory singleton instance
     *
     * @example
     * const factory = DigitalEventFactory.instance;
     */
    static get instance(): DigitalEventFactory;
    /**
     * Main coordinator method - parses raw WebSocket event and publishes delta.
     * This is the primary entry point for event processing.
     *
     * @param eventData - Raw WebSocket event data
     *
     * @example
     * const factory = DigitalEventFactory.instance;
     * factory.parseAndPublishDeltaEvent(\{
     *   eventType: 'CaseStatusChanged',
     *   data: \{ case: \{ id: '123', status: 'closed' \} \}
     * \});
     *
     * @remarks
     * This method creates the appropriate delta event instance based on event type,
     * validates the data, and publishes the parsed delta to subscribers via the deltaEventSubject.
     * Uses 'any' type for eventData because WebSocket event structure varies by event type.
     */
    parseAndPublishDeltaEvent(eventData: any, asyncExecutionHandler?: (data: MessageAddedIntoCaseDeltaEvent) => Promise<void>): Promise<MessageAddedIntoCaseDeltaEvent | void>;
}
