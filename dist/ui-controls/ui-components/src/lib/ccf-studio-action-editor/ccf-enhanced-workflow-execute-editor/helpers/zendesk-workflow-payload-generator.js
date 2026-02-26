import { ComparisonOperator, ComparisonCondition } from './enhanced-workflow-models';
import { WorkflowPayloadGenerator } from './workflow-payload-generator';
/**
 * class for generating Zendesk specific CRM queries
 */
export class ZendeskWorkflowPayloadGenerator extends WorkflowPayloadGenerator {
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
            entity.columns.forEach((column) => {
                entitySearch.push(`${column.columnAPIName}:${column.value}`);
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
        const properties = {};
        const customFields = [];
        for (const { columnAPIName, value } of entity.columns) {
            if (entity.entityAPIName === 'user') {
                if (!['name', 'email'].includes(columnAPIName)) {
                    customFields.push({ id: columnAPIName, value });
                }
                else {
                    properties[columnAPIName] = value;
                }
                continue;
            }
            if (/^\d+$/.test(columnAPIName)) {
                // Numeric columnAPIName → treat as custom field
                customFields.push({ id: columnAPIName, value });
            }
            else {
                properties[columnAPIName] = value;
            }
        }
        if (customFields.length > 0) {
            if (entity.entityAPIName === 'user') {
                properties.user_fields = customFields.reduce((obj, item) => {
                    obj[item.id] = item.value;
                    return obj;
                }, {});
            }
            else {
                properties.custom_fields = customFields;
            }
        }
        return {
            table: entity.entityAPIName,
            data: {
                [entity.entityAPIName]: properties,
            },
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
            const properties = {};
            const customFields = [];
            for (const { columnAPIName, value } of entity.columns) {
                if (entity.entityAPIName === 'user') {
                    if (!['name', 'email'].includes(columnAPIName)) {
                        customFields.push({ id: columnAPIName, value });
                    }
                    else {
                        properties[columnAPIName] = value;
                    }
                    continue;
                }
                if (/^\d+$/.test(columnAPIName)) {
                    // Numeric columnAPIName → treat as custom field
                    customFields.push({ id: columnAPIName, value });
                }
                else {
                    properties[columnAPIName] = value;
                }
            }
            if (customFields.length > 0) {
                if (entity.entityAPIName === 'user') {
                    properties.user_fields = customFields.reduce((obj, item) => {
                        obj[item.id] = item.value;
                        return obj;
                    }, {});
                }
                else {
                    properties.custom_fields = customFields;
                }
            }
            return {
                workflowInput: {
                    table: entity.entityAPIName.toLowerCase(),
                    data: {
                        [entity.entityAPIName]: properties,
                    },
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
        return [ComparisonOperator.equals];
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
        return [ComparisonCondition.and];
    }
}
//# sourceMappingURL=zendesk-workflow-payload-generator.js.map