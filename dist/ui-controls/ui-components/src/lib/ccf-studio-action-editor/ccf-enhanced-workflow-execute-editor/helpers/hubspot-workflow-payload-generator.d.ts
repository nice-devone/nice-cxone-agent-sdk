import { ComparisonOperator, ComparisonCondition } from './enhanced-workflow-models';
import { WorkflowPayloadGenerator } from './workflow-payload-generator';
/**
 * class for generating HubSpot specific CRM queries
 */
export declare class HubSpotWorkflowPayloadGenerator extends WorkflowPayloadGenerator {
    private searchOperator;
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
            filter: {
                filterGroups: {
                    filters: {
                        propertyName: string;
                        operator: string;
                        value: string;
                    }[];
                }[];
            };
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
        entities: {
            name: string;
            properties: {};
        };
        pinnedRecord: string;
        relatesTo: string;
        screenPop: string;
        cacheResponse: string;
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
