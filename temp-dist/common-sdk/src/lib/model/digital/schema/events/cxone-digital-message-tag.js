"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CXoneDigitalMessageTagArraychema = exports.CXoneDigitalMessageChangeSchema = exports.CXoneDigitalMessageTagchema = void 0;
const yup_1 = require("yup");
exports.CXoneDigitalMessageTagchema = (0, yup_1.object)({
    id: (0, yup_1.number)().required(),
    title: (0, yup_1.string)().required(),
    color: (0, yup_1.string)().required(),
});
exports.CXoneDigitalMessageChangeSchema = (0, yup_1.object)({
    fieldName: (0, yup_1.string)(),
    currentValue: (0, yup_1.mixed)(),
});
exports.CXoneDigitalMessageTagArraychema = (0, yup_1.array)().of((0, yup_1.object)().shape(exports.CXoneDigitalMessageTagchema.fields));
//# sourceMappingURL=cxone-digital-message-tag.js.map