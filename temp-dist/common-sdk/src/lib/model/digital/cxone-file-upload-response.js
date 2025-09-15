"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CXoneFileUploadResponseSchema = void 0;
const yup_1 = require("yup");
/*  create hierarchy for data object */
exports.CXoneFileUploadResponseSchema = (0, yup_1.object)({
    id: (0, yup_1.string)().required(),
    url: (0, yup_1.string)().required(),
    expireAt: (0, yup_1.string)(),
    uId: (0, yup_1.string)().required(),
});
//# sourceMappingURL=cxone-file-upload-response.js.map