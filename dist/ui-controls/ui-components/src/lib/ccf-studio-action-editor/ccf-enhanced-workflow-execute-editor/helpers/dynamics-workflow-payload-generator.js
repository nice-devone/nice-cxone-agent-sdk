import { ComparisonOperator, ComparisonCondition } from './enhanced-workflow-models';
import { WorkflowPayloadGenerator } from './workflow-payload-generator';
/**
 * class for generating Dynamics specific CRM queries
 */
export class DynamicskWorkflowPayloadGenerator extends WorkflowPayloadGenerator {
    constructor() {
        super(...arguments);
        this.searchOperator = {
            equals: 'eq',
            notequals: 'ne',
        };
        this.searchCondition = {
            and: 'and',
            or: 'or',
        };
    }
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
    parseValue(input) {
        if (input == null)
            return input;
        const trimmed = input.trim();
        if (trimmed === '')
            return trimmed;
        // 1️⃣ Handle quoted strings: "Hello" or 'Hello'
        if ((trimmed.startsWith('"') && trimmed.endsWith('"')) || (trimmed.startsWith('\'') && trimmed.endsWith('\''))) {
            return trimmed.slice(1, -1); // remove quotes
        }
        // 2️⃣ Handle booleans (true / false)
        if (trimmed.toLowerCase() === 'true') {
            return true;
        }
        if (trimmed.toLowerCase() === 'false') {
            return false;
        }
        // 3️⃣ Handle numbers (int / float)
        if (!isNaN(Number(trimmed)) && trimmed.match(/^-?\d+(\.\d+)?$/)) {
            return Number(trimmed);
        }
        // 4️⃣ Fallback: return as plain string
        return trimmed;
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
                entitySearch.push(`${index > 0 ? comparisonCondition : ''} ${column.columnAPIName} ${comparisonOperator} ${column.value}`);
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
        var _a, _b;
        const config = this.workflowConfig;
        const entity = config.entities[0];
        const payload = {
            entity: entity.entityAPIName.toLowerCase(),
            data: entity.columns.map((column) => ({
                field: column.columnAPIName,
                value: this.parseValue(column.value),
            })),
            pinnedRecord: config.pinnedRecord || 'false',
            relatesTo: config.relatesTo || 'false',
            cacheResponse: config.cacheResponse || 'false',
            screenPop: config.screenPop || 'false',
        };
        if (((_a = payload === null || payload === void 0 ? void 0 : payload.entity) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === 'incident') {
            (_b = payload === null || payload === void 0 ? void 0 : payload.data) === null || _b === void 0 ? void 0 : _b.forEach((item) => {
                var _a;
                if (((_a = item === null || item === void 0 ? void 0 : item.field) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === 'customerid' && item.value) {
                    item.field = this.getODataBindField(item.value) || item.field;
                }
            });
        }
        return payload;
    }
    /**
     * Automatically converts customerid fields to customerid_contact\@odata.bind or customerid_account\@odata.bind based on the value URL
     * @param value - The value to check and convert. It will be like /contacts(guid) or /accounts(guid)
     */
    getODataBindField(value) {
        const match = value.match(/^\/([a-zA-Z0-9_]+)\([0-9a-fA-F-]+\)$/);
        if (match) {
            const entityType = match[1].toLowerCase(); // e.g., 'contacts' or 'accounts'
            switch (entityType === null || entityType === void 0 ? void 0 : entityType.toLocaleLowerCase()) {
                case 'contacts':
                    return 'customerid_contact@odata.bind';
                case 'accounts':
                    return 'customerid_account@odata.bind';
            }
        }
        return '';
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
            var _a, _b;
            const payload = {
                entity: entity.entityAPIName.toLowerCase(),
                data: entity.columns.map((column) => ({
                    field: column.columnAPIName,
                    value: this.parseValue(column.value),
                })),
                pinnedRecord: config.pinnedRecord || 'false',
                relatesTo: config.relatesTo || 'false',
                cacheResponse: config.cacheResponse || 'false',
                screenPop: config.screenPop || 'false',
            };
            if (((_a = payload === null || payload === void 0 ? void 0 : payload.entity) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === 'incident') {
                (_b = payload === null || payload === void 0 ? void 0 : payload.data) === null || _b === void 0 ? void 0 : _b.forEach((item) => {
                    var _a;
                    if (((_a = item === null || item === void 0 ? void 0 : item.field) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === 'customerid' && item.value) {
                        item.field = this.getODataBindField(item.value) || item.field;
                    }
                });
            }
            return {
                workflowInput: payload,
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
//# sourceMappingURL=dynamics-workflow-payload-generator.js.map