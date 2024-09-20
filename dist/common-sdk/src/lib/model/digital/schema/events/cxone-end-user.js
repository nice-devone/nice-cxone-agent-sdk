"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CXOneEndUserSchema = void 0;
const yup_1 = require("yup");
const endUserIdentities = (0, yup_1.object)({
    idOnExternalPlatform: (0, yup_1.string)(),
    externalPlatformId: (0, yup_1.string)(),
});
exports.CXOneEndUserSchema = (0, yup_1.object)({
    identities: (0, yup_1.array)().of((0, yup_1.object)().shape(endUserIdentities.fields)),
});
//# sourceMappingURL=cxone-end-user.js.map