"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CXOneEndUserSchema = void 0;
const yup_1 = require("yup");
const endUserIdentities = (0, yup_1.object)({
    idOnExternalPlatform: (0, yup_1.string)(),
    firstName: (0, yup_1.string)(),
    lastName: (0, yup_1.string)(),
    nickname: (0, yup_1.string)(),
    image: (0, yup_1.string)(),
    externalPlatformId: (0, yup_1.string)(),
    id: (0, yup_1.string)(),
});
const endUserCustomFields = (0, yup_1.object)({
    ident: (0, yup_1.string)(),
    value: (0, yup_1.string)(),
    updatedAt: (0, yup_1.string)(),
});
exports.CXOneEndUserSchema = (0, yup_1.object)({
    id: (0, yup_1.string)(),
    firstName: (0, yup_1.string)(),
    surname: (0, yup_1.string)(),
    fullName: (0, yup_1.string)(),
    image: (0, yup_1.string)(),
    customFields: (0, yup_1.array)().of((0, yup_1.object)().shape(endUserCustomFields.fields)),
    identities: (0, yup_1.array)().of((0, yup_1.object)().shape(endUserIdentities.fields)),
});
//# sourceMappingURL=cxone-end-user.js.map