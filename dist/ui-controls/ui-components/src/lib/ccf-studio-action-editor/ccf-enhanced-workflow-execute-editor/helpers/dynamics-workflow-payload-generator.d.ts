import { ComparisonOperator, ComparisonCondition } from './enhanced-workflow-models';
import { WorkflowPayloadGenerator } from './workflow-payload-generator';
/**
 * class for generating Dynamics specific CRM queries
 */
export declare class DynamicskWorkflowPayloadGenerator extends WorkflowPayloadGenerator {
    private searchOperator;
    private searchCondition;
    /**
     * Parse string value to appropriate primitive type (boolean/number)
     * @param input - The raw value to parse
     * @returns Parsed value as string, number, boolean, or null
     * @example
     * ```
     * this.parseValue('true') // returns boolean true
     * this.parseValue('"true"') // returns string "true"
     * this.parseValue('123') // returns number 123
     * this.parseValue('"123"') // returns string "123"
     * this.parseValue('abc') // returns string 'abc'
     * ```
     */
    private parseValue;
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
            field: string;
            value: string | number | boolean | null;
        }[];
        pinnedRecord: string;
        relatesTo: string;
        cacheResponse: string;
        screenPop: string;
    };
    /**
     * Automatically converts customerid fields to customerid_contact\@odata.bind or customerid_account\@odata.bind based on the value URL
     * @param value - The value to check and convert. It will be like /contacts(guid) or /accounts(guid)
     */
    private getODataBindField;
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
