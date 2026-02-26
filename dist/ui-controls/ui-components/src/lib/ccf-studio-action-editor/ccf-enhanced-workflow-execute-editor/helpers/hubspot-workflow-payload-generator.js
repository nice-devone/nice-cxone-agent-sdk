import { ComparisonOperator, ComparisonCondition } from './enhanced-workflow-models';
import { WorkflowPayloadGenerator } from './workflow-payload-generator';
/**
 * class for generating HubSpot specific CRM queries
 */
export class HubSpotWorkflowPayloadGenerator extends WorkflowPayloadGenerator {
    constructor() {
        super(...arguments);
        this.searchOperator = {
            equals: 'EQ',
            notequals: 'NEQ',
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
            const filterGroups = [];
            const filters = [];
            entity.columns.forEach((column) => {
                const comparisonOperator = this.searchOperator[column.operator];
                const filter = {
                    propertyName: column.columnAPIName,
                    operator: comparisonOperator,
                    value: column.value,
                };
                filters.push(filter);
            });
            filterGroups.push({
                filters: filters,
            });
            search.push({
                entity: entity.entityAPIName,
                filter: {
                    filterGroups: filterGroups,
                },
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
        const properties = entity.columns.reduce((acc, column) => (Object.assign(Object.assign({}, acc), { [column.columnAPIName]: column.value })), {});
        return {
            entities: {
                name: entity.entityAPIName,
                properties: properties,
            },
            pinnedRecord: config.pinnedRecord || 'false',
            relatesTo: config.relatesTo || 'false',
            screenPop: config.screenPop || 'false',
            cacheResponse: config.cacheResponse || 'false',
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
        const payload = { list: [], id: '' };
        const config = this.workflowConfig;
        const entities = config.entities;
        payload['list'] = entities.map((entity) => {
            const properties = entity.columns.reduce((acc, column) => (Object.assign(Object.assign({}, acc), { [column.columnAPIName]: column.value })), {});
            return {
                workflowInput: {
                    entities: {
                        name: entity.entityAPIName.toLowerCase(),
                        properties: properties,
                    },
                    pinnedRecord: config.pinnedRecord || 'false',
                    relatesTo: config.relatesTo || 'false',
                    screenPop: config.screenPop || 'false',
                    cacheResponse: config.cacheResponse || 'false',
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
//# sourceMappingURL=hubspot-workflow-payload-generator.js.map