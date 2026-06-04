"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomFieldsSchema = void 0;
const yup_1 = require("yup");
/**
 * Interface used for custom field Definitions schema
 */
exports.CustomFieldsSchema = (0, yup_1.object)({
    /**
   *  field referes to the identifier of custom fields
   */
    ident: (0, yup_1.string)(),
    /**
   *  field referes to the value of custom fields
   */
    value: (0, yup_1.string)(),
    /**
   *  field referes to the label of custom fields
   */
    label: (0, yup_1.string)(),
    /**
   *  field referes to the type of custom fields
   */
    type: (0, yup_1.string)(),
    /**
   *  field referes to the required flag of custom fields
   */
    isRequired: (0, yup_1.boolean)(),
    /**
   *  field referes to the editable flag of custom fields
   */
    isEditable: (0, yup_1.boolean)(),
    /**
   *  field referes to the if the field is visible in the right panel
   */
    isVisibleInRightPanel: (0, yup_1.boolean)(),
    /**
   *  field referes to the if the field is visible in the customer card
   */
    isVisibleInCustomerCard: (0, yup_1.boolean)(),
    /**
   *  field referes to LIST type values
   */
    values: (0, yup_1.array)(),
    /**
   *  field referes to selected Value on edit
   */
    selectedValue: (0, yup_1.string)(),
});
//# sourceMappingURL=custom-fields.js.map