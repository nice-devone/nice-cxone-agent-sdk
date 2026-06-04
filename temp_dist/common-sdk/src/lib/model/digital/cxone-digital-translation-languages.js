"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CXoneDigitaltranslationApiResponseSchema = void 0;
const yup_1 = require("yup");
exports.CXoneDigitaltranslationApiResponseSchema = (0, yup_1.object)({
    result: (0, yup_1.array)().of((0, yup_1.object)({
        text: (0, yup_1.string)(),
    })),
});
//# sourceMappingURL=cxone-digital-translation-languages.js.map