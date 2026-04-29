"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CaseStatusChangedDeltaEvent = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const cxone_base_delta_event_1 = require("./cxone-base-delta-event");
const digital_contact_status_1 = require("../../../../enum/digital-contact-status");
/**
 * Valid case status values array for runtime validation
 */
const VALID_CASE_STATUSES = Object.values(digital_contact_status_1.DigitalContactStatus);
/**
 * Case Status Changed Delta Event class for handling case status change events.
 *
 * Validates and parses case status change delta events, ensuring the status
 * field contains a valid case status value.
 */
class CaseStatusChangedDeltaEvent extends cxone_base_delta_event_1.BaseDeltaEvent {
    /**
     * Validates the status field for case status change events.
     *
     * Ensures the status is a string and contains a valid case status value.
     * Called internally by the parseAndValidate() method.
     *
     * @param eventData - Raw event payload to validate.
     * @throws Error if status is not a string or contains an invalid status value
     * @example - validateDeltaFields() is called internally by parseAndValidate().
     */
    validateDeltaFields(eventData) {
        var _a, _b;
        const status = (_b = (_a = eventData === null || eventData === void 0 ? void 0 : eventData.data) === null || _a === void 0 ? void 0 : _a.case) === null || _b === void 0 ? void 0 : _b.status;
        if (typeof status !== 'string') {
            throw new Error('status must be a string');
        }
        if (!VALID_CASE_STATUSES.includes(status)) {
            throw new Error(`status must be one of: ${VALID_CASE_STATUSES.join(', ')}`);
        }
        // Set the validated status property
        this.delta = { status: status };
    }
}
exports.CaseStatusChangedDeltaEvent = CaseStatusChangedDeltaEvent;
//# sourceMappingURL=cxone-case-status-delta-events.js.map