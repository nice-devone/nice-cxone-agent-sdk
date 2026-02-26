import { ComparisonOperator, Config, ComparisonCondition } from './enhanced-workflow-models';
/**
 * Abstract class for generating CRM queries
 */
export declare abstract class WorkflowPayloadGenerator {
    protected workflowConfig: Config;
    /**
     *
     * @param entity - constructor
     * @example
     * ```
     * const config = {};
     * ```
     */
    constructor(config: Config);
    /**
     * generates query string based on the workflow subtype
     * @example
     * ```
     * generateQuery()
     * ```
     * @returns query string
     */
    generateQuery(): object;
    abstract getSupportedOperators(): ComparisonOperator[];
    abstract getSupportedConditions(): ComparisonCondition[];
    protected abstract generatePhoneSearchPayload(): object;
    protected abstract generateEmailSearchPayload(): object;
    protected abstract generateCustomSearchPayload(): object;
    protected abstract generateAutomaticCreatePayload(): object;
    protected abstract generateManualCreatePayload(): object;
    /**
     * Helper method to validate the configuration
     * @example
     * ```
     * isValidConfig()
     * ```
     */
    protected isValidConfig(): boolean;
}
