"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yup_1 = require("yup");
const customFieldsDetailsSchema = (0, yup_1.object)({
    ident: (0, yup_1.string)(),
    value: (0, yup_1.string)(),
});
const CustomFieldsRequest = (0, yup_1.object)({
    customFields: (0, yup_1.object)().shape(customFieldsDetailsSchema.fields),
    customerId: (0, yup_1.string)(),
});
//# sourceMappingURL=cxone-custom-fields-request.js.map