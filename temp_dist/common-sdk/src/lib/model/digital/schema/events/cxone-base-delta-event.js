"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseDeltaEvent = void 0;
/**
 * Abstract base class for digital delta events containing common validation logic and properties.
 * Provides a foundation for parsing and validating WebSocket delta events by implementing
 * common field validation and requiring concrete implementations for event-specific validation.
 */
class BaseDeltaEvent {
    /**
     * Creates a base delta event wrapper for validating event data.
     * @param eventData - Raw event payload to validate.
     * @example
     * // Use concrete implementation since this is an abstract class
     * const event = new CaseStatusChangedDeltaEvent(eventData);
     * const validatedEvent = event.parseAndValidate();
     */
    constructor(eventData) {
        this.validateCommonFields(eventData);
        this.validateDeltaFields(eventData);
    }
    /**
     * Validates common delta event fields shared across all event types.
     *
     * Validates eventType, traceId, caseId, interactionId, and sets timestamp.
     * Called internally by parseAndValidate() method.
     *
     * @param eventData - Raw event payload to validate.
     * @throws Error if validation fails for any common field
     * @example - validateCommonFields() is called internally by parseAndValidate().
     */
    validateCommonFields(eventData) {
        var _a, _b, _c, _d, _e, _f;
        if (typeof eventData.eventType !== 'string') {
            throw new Error('eventType is required and must be a string');
        }
        if ((eventData === null || eventData === void 0 ? void 0 : eventData.traceId) !== undefined && eventData.traceId !== null && typeof eventData.traceId !== 'string') {
            throw new Error('traceId must be a string or null');
        }
        if (typeof ((_b = (_a = eventData === null || eventData === void 0 ? void 0 : eventData.data) === null || _a === void 0 ? void 0 : _a.case) === null || _b === void 0 ? void 0 : _b.id) !== 'string') {
            throw new Error('caseId is required and must be a string');
        }
        if (((_d = (_c = eventData === null || eventData === void 0 ? void 0 : eventData.data) === null || _c === void 0 ? void 0 : _c.case) === null || _d === void 0 ? void 0 : _d.interactionId) !== null && typeof ((_f = (_e = eventData === null || eventData === void 0 ? void 0 : eventData.data) === null || _e === void 0 ? void 0 : _e.case) === null || _f === void 0 ? void 0 : _f.interactionId) !== 'string') {
            throw new Error('interactionId must be a string or null');
        }
        // Set the validated properties
        this.eventType = eventData.eventType;
        this.caseId = eventData.data.case.id;
        this.traceId = eventData.traceId;
        this.interactionId = eventData.data.case.interactionId;
        this.timestamp = new Date();
    }
}
exports.BaseDeltaEvent = BaseDeltaEvent;
//# sourceMappingURL=cxone-base-delta-event.js.map