import { WorkflowSubType } from './enhanced-workflow-models';
/**
 * Abstract class for generating CRM queries
 */
export class WorkflowPayloadGenerator {
    /**
     *
     * @param entity - constructor
     * @example
     * ```
     * const config = {};
     * ```
     */
    constructor(config) {
        this.workflowConfig = config;
    }
    /**
     * generates query string based on the workflow subtype
     * @example
     * ```
     * generateQuery()
     * ```
     * @returns query string
     */
    generateQuery() {
        switch (this.workflowConfig.workflowSubtype) {
            case WorkflowSubType.PhoneNumberSearch:
                return this.generatePhoneSearchPayload();
            case WorkflowSubType.EmailSearch:
                return this.generateEmailSearchPayload();
            case WorkflowSubType.CustomSearch:
                return this.generateCustomSearchPayload();
            case WorkflowSubType.AutomaticCreate:
                return this.generateAutomaticCreatePayload();
            case WorkflowSubType.ManualCreate:
                return this.generateManualCreatePayload();
            default:
                return {};
        }
    }
    /**
     * Helper method to validate the configuration
     * @example
     * ```
     * isValidConfig()
     * ```
     */
    isValidConfig() {
        return true;
    }
}
//# sourceMappingURL=workflow-payload-generator.js.map