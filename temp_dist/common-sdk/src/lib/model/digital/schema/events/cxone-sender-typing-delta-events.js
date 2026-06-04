"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SenderTypingDeltaEvent = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const cxone_digital_event_type_1 = require("../../../../enum/cxone-digital-event-type");
const cxone_base_delta_event_1 = require("./cxone-base-delta-event");
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
class SenderTypingDeltaEvent extends cxone_base_delta_event_1.BaseDeltaEvent {
    /**
     * * override common-field validation because SenderTypingDeltaEvent
     * does not get caseId, interactionId from Ws event.
     * @param eventData - Raw event payload to validate.
     * @throws Error if validation fails for any common field
     * @example - validateCommonFields() is called internally by parseAndValidate().
     */
    validateCommonFields(eventData) {
        if ((eventData === null || eventData === void 0 ? void 0 : eventData.eventType) !== cxone_digital_event_type_1.CXoneDigitalEventType.SENDER_TYPING_START && (eventData === null || eventData === void 0 ? void 0 : eventData.eventType) !== cxone_digital_event_type_1.CXoneDigitalEventType.SENDER_TYPING_END) {
            throw new Error(`Invalid eventType for SenderTypingDeltaEvent: ${eventData === null || eventData === void 0 ? void 0 : eventData.eventType}`);
        }
        this.eventType = eventData.eventType;
    }
    /**
     * Validates threadId and eventType, and sets delta.isTyping.
     * @param eventData - Raw WebSocket event payload.
     * @throws Error when threadId is missing/empty/non-string or eventType is not SenderTypingStarted.
     * @example
     * // Called internally by BaseDeltaEvent constructor — do not invoke directly.
     * const event = new SenderTypingDeltaEvent(rawWsData); // validateDeltaFields runs here
     */
    validateDeltaFields(eventData) {
        var _a, _b;
        if (typeof ((_b = (_a = eventData === null || eventData === void 0 ? void 0 : eventData.data) === null || _a === void 0 ? void 0 : _a.thread) === null || _b === void 0 ? void 0 : _b.id) !== 'string' || !eventData.data.thread.id) {
            throw new Error('threadId is required and must be a non-empty string');
        }
        this.delta = { threadId: eventData.data.thread.id, isTyping: eventData.eventType === cxone_digital_event_type_1.CXoneDigitalEventType.SENDER_TYPING_START ? true : false };
    }
}
exports.SenderTypingDeltaEvent = SenderTypingDeltaEvent;
//# sourceMappingURL=cxone-sender-typing-delta-events.js.map