import { GetNextEventType } from '../../enum/get-next-event-type';
import { ComplianceValidationFailureCode } from './compliance-validation-failure-code';
/**
 * Interface representing the request data associated with a compliance validation event.
 */
export interface ComplianceValidationRequestData {
    /** The outbound address (e.g. phone number or email) being validated */
    toAddress: string;
    /** The customer identifier */
    customerId: string;
    /** Zip code used in validation */
    zipcode: string;
}
/**
 * Class to capture a compliance validation GetNext event.
 */
export declare class ComplianceValidationEvent {
    /**
     * @remarks - The GetNext event type string ('SmartReachValidation')
     */
    type: GetNextEventType.SMART_REACH_VALIDATION;
    /**
     * @remarks - Validation failure code indicating the reason for failure
     */
    validationFailureCode: ComplianceValidationFailureCode;
    /**
     * @remarks - Localization key or message describing the validation failure
     */
    validationFailureLocalizationCode: string;
    /**
     * @remarks - The original request data associated with this validation event
     */
    RequestData: ComplianceValidationRequestData;
    /**
     * Parses raw GetNext event data into this ComplianceValidationEvent instance.
     * @param data - Raw event data from the GetNext API
     * @example
     * ```
     * const event = new ComplianceValidationEvent();
     * event.parse(rawData);
     * ```
     */
    parse(data: {
        [key: string]: unknown;
    }): void;
}
