"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CXoneAuthorUserSchema = exports.CXoneAuthorEndUserIdentitySchema = void 0;
const yup_1 = require("yup");
exports.CXoneAuthorEndUserIdentitySchema = (0, yup_1.object)({
    idOnExternalPlatform: (0, yup_1.string)().required(),
    nickname: (0, yup_1.string)(),
    image: (0, yup_1.string)(),
    id: (0, yup_1.string)().required(),
    fullName: (0, yup_1.string)().nullable().optional(),
    externalPlatformId: (0, yup_1.string)(),
});
exports.CXoneAuthorUserSchema = (0, yup_1.object)({
    id: (0, yup_1.number)().required(),
    emailAddress: (0, yup_1.string)().nullable().optional(),
    firstName: (0, yup_1.string)().required(),
    surname: (0, yup_1.string)().optional(), // surname can be blank in few scenarios & API supports it (AW-15782)
});
//# sourceMappingURL=cxone-author-end-user.js.map