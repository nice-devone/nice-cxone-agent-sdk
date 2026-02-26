import { ComparisonOperator, ComparisonCondition } from './enhanced-workflow-models';
import { WorkflowPayloadGenerator } from './workflow-payload-generator';
/**
 * class for generating Salesforce specific CRM queries
 */
export declare class SalesforceflowPayloadGenerator extends WorkflowPayloadGenerator {
    private searchOperator;
    private searchCondition;
    /**
     * Helper method to validate the configuration
     * @example
     * ```
     * isValidConfig()
     * ```
     */
    protected isValidConfig(): boolean;
    /**
     * generates payload for phonenumner based search
     * @returns phone search payload
     * @example
     * ```
     * generatePhoneSearchPayload()
     * ```
     */
    protected generatePhoneSearchPayload(): {
        phoneNumber: string;
    };
    /**
     * generates payload for email based search
     * @returns email search payload
     * @example
     * ```
     * generateEmailSearchPayload()
     * ```
     */
    protected generateEmailSearchPayload(): {
        email: string;
    };
    /**
     * generates payload for custom search
     * @returns custom search payload
     * @example
     * ```
     * generateCustomSearchPayload()
     * ```
     */
    protected generateCustomSearchPayload(): {
        search: {
            entity: string;
            filter: string;
        }[];
    };
    /**
     * generates payload for custom search
     * @returns custom search payload
     * @example
     * ```
     * generateAutomaticCreatePayload()
     * ```
     */
    protected generateAutomaticCreatePayload(): {
        entity: string;
        data: {
            key: string;
            value: string;
        }[];
        pinnedRecord: string;
        relatesTo: string;
        cacheResponse: string;
        screenPop: string;
    };
    /**
     * generates payload for manual create
     * @returns manual create payload
     * @example
     * ```
     * generateManualCreatePayload()
     * ```
     */
    protected generateManualCreatePayload(): {
        list: unknown[];
        id: string;
    };
    /**
     * Returns the CRM supported operators
     * @returns supported operators
     * @example
     * ```
     * getSupportedOperators()
     * ```
     */
    getSupportedOperators(): ComparisonOperator[];
    /**
     * Returns the CRM supported condition
     * @returns supported condition
     * @example
     * ```
     * getSupportedConditions()
     * ```
     */
    getSupportedConditions(): ComparisonCondition[];
}
