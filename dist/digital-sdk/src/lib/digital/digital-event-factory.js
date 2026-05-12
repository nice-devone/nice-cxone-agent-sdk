import { __awaiter } from "tslib";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Subject } from 'rxjs';
import { CcfLogger } from '@nice-devone/agent-sdk';
import { CaseStatusChangedDeltaEvent, CXoneDigitalEventType, CXoneSdkError, CXoneSdkErrorType, MessageAddedIntoCaseDeltaEvent } from '@nice-devone/common-sdk';
import { CXoneDigitalUtil } from './util/cxone-digital-util';
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
export class DigitalEventFactory {
    constructor() {
        /**
         * Logger instance for debugging and error tracking
         */
        this.logger = new CcfLogger('DigitalSDK', 'DigitalEventFactory');
        /**
         * RxJS Subject for publishing delta events to subscribers
         */
        this.deltaEventSubject = new Subject();
    }
    /**
     * Retrieves the singleton instance of DigitalEventFactory.
     * Creates the instance if it doesn't exist.
     *
     * @returns DigitalEventFactory singleton instance
     *
     * @example
     * const factory = DigitalEventFactory.instance;
     */
    static get instance() {
        if (!DigitalEventFactory.singleton) {
            DigitalEventFactory.singleton = new DigitalEventFactory();
        }
        return DigitalEventFactory.singleton;
    }
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
    parseAndPublishDeltaEvent(eventData, asyncExecutionHandler) {
        return __awaiter(this, void 0, void 0, function* () {
            const eventType = eventData === null || eventData === void 0 ? void 0 : eventData.eventType;
            try {
                let parsedAndValidatedData = {};
                switch (eventType) {
                    case CXoneDigitalEventType.CASE_STATUS_CHANGED:
                        parsedAndValidatedData = new CaseStatusChangedDeltaEvent(eventData);
                        CXoneDigitalUtil.instance.handleAgentAssistUnsubscribe(parsedAndValidatedData.caseId, CXoneDigitalEventType.CASE_STATUS_CHANGED, parsedAndValidatedData.delta.status);
                        break;
                    case CXoneDigitalEventType.MESSAGE_ADDED_INTO_CASE:
                        parsedAndValidatedData = new MessageAddedIntoCaseDeltaEvent(eventData);
                        asyncExecutionHandler && (yield asyncExecutionHandler(parsedAndValidatedData));
                        break;
                    default:
                        throw new Error(`Unknown Delta eventType: ${eventType}`);
                }
                this.deltaEventSubject.next(parsedAndValidatedData);
            }
            catch (error) {
                if (error instanceof Error) {
                    this.logger.error('parseAndPublishDeltaEvent', `failed to validate ${eventType} delta response schema while parsing ws event` +
                        new CXoneSdkError(CXoneSdkErrorType.WEB_SOCKET_DATA_VALIDATE, error.message));
                }
                throw new Error('Delta event validation Failed');
            }
        });
    }
}
//# sourceMappingURL=digital-event-factory.js.map