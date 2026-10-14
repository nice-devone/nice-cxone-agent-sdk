"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessagePreviewDeltaEvent = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const cxone_base_delta_event_1 = require("./cxone-base-delta-event");
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
class MessagePreviewDeltaEvent extends cxone_base_delta_event_1.BaseDeltaEvent {
    /**
     * Validates threadId and extracts the preview text from the event payload.
     * @param eventData - Raw WebSocket event payload.
     * @throws Error when threadId is missing/empty/non-string, or when
     *   messagePreview.messageContent.text is present but not a string or null.
     * @example
     * // Called internally by BaseDeltaEvent constructor — do not invoke directly.
     * const event = new MessagePreviewDeltaEvent(rawWsData); // validateDeltaFields runs here
     */
    validateDeltaFields(eventData) {
        var _a, _b, _c, _d, _e;
        if (typeof ((_b = (_a = eventData === null || eventData === void 0 ? void 0 : eventData.data) === null || _a === void 0 ? void 0 : _a.thread) === null || _b === void 0 ? void 0 : _b.id) !== 'string' || !eventData.data.thread.id) {
            throw new Error('threadId is required and must be a non-empty string');
        }
        const text = (_e = (_d = (_c = eventData === null || eventData === void 0 ? void 0 : eventData.data) === null || _c === void 0 ? void 0 : _c.messagePreview) === null || _d === void 0 ? void 0 : _d.messageContent) === null || _e === void 0 ? void 0 : _e.text;
        if (text !== undefined && text !== null && typeof text !== 'string') {
            throw new Error('messagePreview.messageContent.text must be a string or null/undefined');
        }
        this.threadId = eventData.data.thread.id;
        this.delta = { messagePreviewText: text !== null && text !== void 0 ? text : null };
    }
}
exports.MessagePreviewDeltaEvent = MessagePreviewDeltaEvent;
//# sourceMappingURL=cxone-message-preview-delta-events.js.map