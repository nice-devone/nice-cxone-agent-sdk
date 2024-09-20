"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CXoneContactCustomFieldDefinitionSchemaArray = exports.CXoneContactCustomFieldDefinitionSchema = exports.CXoneContactCustomFieldDefinitionValuesSchema = void 0;
const yup_1 = require("yup");
exports.CXoneContactCustomFieldDefinitionValuesSchema = (0, yup_1.object)({
    /**
       * @remarks - Identifier for Custom field
       */
    ident: (0, yup_1.string)(),
    /**
       * @remarks - A string value for Custom Field name.
       */
    name: (0, yup_1.string)(),
    /**
       * @remarks - Value of Custom field.
       */
    value: (0, yup_1.string)(),
    /**
       * @remarks - String field to map parent id.
       */
    parentId: (0, yup_1.string)(),
});
exports.CXoneContactCustomFieldDefinitionSchema = (0, yup_1.object)({
    /**
     * @remarks - Identifier for Custom field
     */
    ident: (0, yup_1.string)().required(),
    /**
     * @remarks - A string value for Custom Field.
     */
    label: (0, yup_1.string)().required(),
    /**
     * @remarks - Type value for Custom field.
     */
    type: (0, yup_1.string)().required(),
    /**
     * @remarks - Boolean isRequired field to check if custom fields are required or not.
     */
    isRequired: (0, yup_1.boolean)().required(),
    /**
     * @remarks - Agent can edit the custom field values.
     */
    isEditable: (0, yup_1.boolean)().required(),
    /**
     * @remarks - Boolean field to display or hide details in agent console.
     */
    isVisibleInAgentConsole: (0, yup_1.boolean)().required(),
    /**
     * @remarks - TO-DO: need to verify
     */
    isVisibleInChatPreSurvey: (0, yup_1.boolean)().required(),
    /**
     * @remarks - A string value of Custom Field.
     */
    value: (0, yup_1.string)().optional(),
    /**
     * @remarks - A string value which Custom data details.
     */
    values: (0, yup_1.array)().of((0, yup_1.object)().shape(exports.CXoneContactCustomFieldDefinitionValuesSchema.fields)).optional(),
});
exports.CXoneContactCustomFieldDefinitionSchemaArray = (0, yup_1.array)().of((0, yup_1.object)().shape(exports.CXoneContactCustomFieldDefinitionSchema.fields));
//# sourceMappingURL=cxone-contact-custom-field-definition.js.map