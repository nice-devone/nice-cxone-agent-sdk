import { ComparisonCondition, ComparisonOperator } from './enhanced-workflow-models';
import { WorkflowPayloadGenerator } from './workflow-payload-generator';
/**
 * class for generating ServiceNow specific CRM queries
 */
export class OracleServiceCloudWorkflowPayloadGenerator extends WorkflowPayloadGenerator {
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
    /**
     * generates payload for phonenumner based search
     * @returns phone search payload
     * @example
     * ```
     * generatePhoneSearchPayload()
     * ```
     */
    generatePhoneSearchPayload() {
        return { phoneNumber: this.workflowConfig.phoneNumber };
    }
    /**
     * generates payload for email based search
     * @returns email search payload
     * @example
     * ```
     * generateEmailSearchPayload()
     * ```
     */
    generateEmailSearchPayload() {
        return { email: this.workflowConfig.emailAddress };
    }
    /**
     * generates payload for custom search
     * @returns custom search payload
     * @example
     * ```
     * generateCustomSearchPayload()
     * ```
     */
    generateCustomSearchPayload() {
        return {};
    }
    /**
     * generates payload for custom search
     * @returns custom search payload
     * @example
     * ```
     * generateAutomaticCreatePayload()
     * ```
     */
    generateAutomaticCreatePayload() {
        return {};
    }
    /**
     * generates payload for manual create
     * @returns manual create payload
     * @example
     * ```
     * generateManualCreatePayload()
     * ```
     */
    generateManualCreatePayload() {
        return {};
    }
    /**
     * Returns the CRM supported operators
     * @returns supported operators
     * @example
     * ```
     * getSupportedOperators()
     * ```
     */
    getSupportedOperators() {
        return [ComparisonOperator.equals, ComparisonOperator.notequals];
    }
    /**
     * Returns the CRM supported condition
     * @returns supported condition
     * @example
     * ```
     * getSupportedConditions()
     * ```
     */
    getSupportedConditions() {
        return [ComparisonCondition.and, ComparisonCondition.or];
    }
}
//# sourceMappingURL=oracleservicecloud-workflow-payload-generator.js.map