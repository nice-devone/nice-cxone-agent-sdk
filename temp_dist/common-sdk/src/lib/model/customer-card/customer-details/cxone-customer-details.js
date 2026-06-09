"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yup_1 = require("yup");
/**
 * Interface used for parsing get Customer data response
 * @returns returns - list of Customer Data
 * ```
 * @example
 * Array<CustomersDetails>
 * ```
 */
const CustomersIdentitiesDetail = (0, yup_1.object)({
    idOnExternalPlatform: (0, yup_1.string)(),
    firstName: (0, yup_1.string)(),
    lastName: (0, yup_1.string)(),
    nickname: (0, yup_1.string)(),
    image: (0, yup_1.string)(),
    updatedAt: (0, yup_1.string)(),
    id: (0, yup_1.string)(),
});
const CustomFieldsVal = (0, yup_1.object)({
    ident: (0, yup_1.string)(),
    value: (0, yup_1.string)(),
});
const CustomersDetail = (0, yup_1.object)({
    customFields: (0, yup_1.array)()
        .of((0, yup_1.object)().shape(CustomFieldsVal.fields)).optional(),
    firstName: (0, yup_1.string)().optional(),
    surname: (0, yup_1.string)().optional(),
    fullName: (0, yup_1.string)().optional(),
    id: (0, yup_1.string)().optional(),
    image: (0, yup_1.string)().optional(),
    identities: (0, yup_1.array)()
        .of((0, yup_1.object)().shape(CustomersIdentitiesDetail.fields))
        .optional(),
});
// TODO: Below block is added for usage later, as exception, ESLint is skipped here
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const CustomersDetailCustomFields = (0, yup_1.object)({
    customFields: (0, yup_1.array)()
        .of((0, yup_1.object)().shape(CustomFieldsVal.fields)).optional(),
});
const CXoneCustomerDetail = (0, yup_1.array)().of((0, yup_1.object)().shape(CustomersDetail.fields));
const CustomerCardList = (0, yup_1.object)({
    data: CXoneCustomerDetail,
    scrollToken: (0, yup_1.string)().optional(),
});
//# sourceMappingURL=cxone-customer-details.js.map