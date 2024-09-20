"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CXoneAttachmentWithPreviewSchema = exports.CXoneAttachmentsSchema = void 0;
const yup_1 = require("yup");
exports.CXoneAttachmentsSchema = (0, yup_1.object)({
    id: (0, yup_1.string)().required(),
    fileName: (0, yup_1.string)().nullable(true),
    friendlyName: (0, yup_1.string)(),
    isInline: (0, yup_1.boolean)().required(),
    mimeType: (0, yup_1.string)(),
    previewUrl: (0, yup_1.string)().nullable(true),
    securedPermanentUrl: (0, yup_1.string)().required(),
    url: (0, yup_1.string)(),
    canBeStored: (0, yup_1.boolean)(),
    blobUrl: (0, yup_1.string)().nullable(true),
});
exports.CXoneAttachmentWithPreviewSchema = exports.CXoneAttachmentsSchema.shape({
    previewUrl: (0, yup_1.string)().required(),
});
const CXoneAttachmentsArraySchema = (0, yup_1.array)().of((0, yup_1.object)().shape(exports.CXoneAttachmentsSchema.fields));
const CXoneAttachmentsWithPreviewArraySchema = (0, yup_1.array)().of((0, yup_1.object)().shape(exports.CXoneAttachmentWithPreviewSchema.fields));
//# sourceMappingURL=cxone-attachment.js.map