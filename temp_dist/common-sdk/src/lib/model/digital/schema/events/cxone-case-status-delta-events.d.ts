import { BaseDeltaEvent } from './cxone-base-delta-event';
import { DigitalContactStatus } from '../../../../enum/digital-contact-status';
/**
 * Type alias for CASE_STATUS_CHANGED delta event properties
 */
export interface CaseStatusDelta {
    status: DigitalContactStatus;
}
/**
 * Case Status Changed Delta Event class for handling case status change events.
 *
 * Validates and parses case status change delta events, ensuring the status
 * field contains a valid case status value.
 */
export declare class CaseStatusChangedDeltaEvent extends BaseDeltaEvent<CaseStatusDelta> {
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
    protected validateDeltaFields(eventData: any): void;
}
