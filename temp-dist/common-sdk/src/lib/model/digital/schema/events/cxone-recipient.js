"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CXoneRecipientSchema = void 0;
const yup_1 = require("yup");
exports.CXoneRecipientSchema = (0, yup_1.object)({
    idOnExternalPlatform: (0, yup_1.string)().required(),
    name: (0, yup_1.string)().defined().nullable(false),
    isPrimary: (0, yup_1.boolean)().required(),
    isPrivate: (0, yup_1.boolean)().required(),
});
const CXoneRecipientArraySchema = (0, yup_1.array)().of((0, yup_1.object)().shape(exports.CXoneRecipientSchema.fields));
//# sourceMappingURL=cxone-recipient.js.map