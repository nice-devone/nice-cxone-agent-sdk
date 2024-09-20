"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yup_1 = require("yup");
const CustomFieldsSchema = (0, yup_1.object)({
    ident: (0, yup_1.string)(),
    value: (0, yup_1.string)().optional(),
    label: (0, yup_1.string)(),
    type: (0, yup_1.string)(),
    isRequired: (0, yup_1.bool)(),
    values: (0, yup_1.array)(),
    updatedAt: (0, yup_1.string)().optional(),
    isEditable: (0, yup_1.string)(),
    isVisibleInRightPanel: (0, yup_1.string)(),
    isVisibleInCustomerCard: (0, yup_1.string)(),
});
//# sourceMappingURL=cxone-customer-card-custom-fields.js.map