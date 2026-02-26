import { ComparisonOperator, ComparisonCondition } from './enhanced-workflow-models';
import { WorkflowPayloadGenerator } from './workflow-payload-generator';
/**
 * class for generating Salesforce specific CRM queries
 */
export class SalesforceflowPayloadGenerator extends WorkflowPayloadGenerator {
    constructor() {
        super(...arguments);
        this.searchOperator = {
            equals: '=',
            notequals: '!=',
        };
        this.searchCondition = {
            and: 'and',
            or: 'or',
        };
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
        const search = [];
        this.workflowConfig.entities.forEach((entity) => {
            const entitySearch = [];
            entity.columns.forEach((column, index) => {
                const comparisonOperator = this.searchOperator[column.operator];
                const comparisonCondition = this.searchCondition[column.condition];
                entitySearch.push(`${index > 0 ? comparisonCondition : ''} ${column.columnAPIName}${comparisonOperator}${column.value}`);
            });
            search.push({
                entity: entity.entityAPIName,
                filter: `${entitySearch.join(' ')}`,
            });
        });
        return { search: search };
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
        const config = this.workflowConfig;
        const entity = config.entities[0];
        return {
            entity: entity.entityAPIName,
            data: entity.columns.map(column => ({
                key: column.columnAPIName,
                value: column.value,
            })),
            pinnedRecord: config.pinnedRecord || 'false',
            relatesTo: config.relatesTo || 'false',
            cacheResponse: config.cacheResponse || 'false',
            screenPop: config.screenPop || 'false',
        };
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
        const config = this.workflowConfig;
        const payload = { list: [], id: '' };
        const entities = config.entities;
        payload['list'] = entities.map((entity) => {
            return {
                workflowInput: {
                    entity: entity.entityAPIName.toLowerCase(),
                    data: entity.columns.map((column) => ({
                        key: column.columnAPIName,
                        value: column.value,
                    })),
                    pinnedRecord: config.pinnedRecord || 'false',
                    relatesTo: config.relatesTo || 'false',
                    cacheResponse: config.cacheResponse || 'false',
                    screenPop: config.screenPop || 'false',
                },
                display: entity.displayName,
                configurationId: config.configId,
                workflowId: config.workflowId,
            };
        });
        payload['id'] = '{contactid}';
        return payload;
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
//# sourceMappingURL=salesforce-workflow-payload-generator.js.map