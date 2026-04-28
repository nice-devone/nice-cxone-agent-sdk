import { GetNextEventType } from '../../enum/get-next-event-type';
/**
 * Class to capture a compliance validation GetNext event.
 */
export class ComplianceValidationEvent {
    /**
     * Parses raw GetNext event data into this ComplianceValidationEvent instance.
     * @param data - Raw event data from the GetNext API
     * @example
     * ```
     * const event = new ComplianceValidationEvent();
     * event.parse(rawData);
     * ```
     */
    parse(data) {
        this.type = GetNextEventType.SMART_REACH_VALIDATION;
        this.validationFailureCode = Number(data.ValidationFailureCode);
        this.validationFailureLocalizationCode = data.ValidationFailureLocalizationCode;
        try {
            const rawRequestData = data.RequestData;
            this.RequestData = (typeof rawRequestData === 'string'
                ? JSON.parse(rawRequestData)
                : rawRequestData);
        }
        catch (_a) {
            this.RequestData = { toAddress: '', customerId: '', zipcode: '' };
        }
    }
}
//# sourceMappingURL=compliance-validation-event.js.map