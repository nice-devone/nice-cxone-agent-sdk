"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkillDeliveryParametersYupSchema = void 0;
const yup_1 = require("yup");
exports.SkillDeliveryParametersYupSchema = (0, yup_1.object)({
    complianceRecordsDefaultAccept: (0, yup_1.boolean)().notRequired(),
    complianceRecordsDeliveryType: (0, yup_1.number)().notRequired().nullable(),
    complianceRecordsDisabled: (0, yup_1.boolean)().notRequired(),
    complianceRecordsTimeout: (0, yup_1.number)().notRequired().nullable(),
    complianceRecordsTimeoutSubsequent: (0, yup_1.number)().notRequired().nullable(),
    confirmationRequiredDefault: (0, yup_1.boolean)().required(),
    confirmationRequiredDefaultAccept: (0, yup_1.boolean)().notRequired(),
    confirmationRequiredDeliveryType: (0, yup_1.number)().notRequired().nullable(),
    confirmationRequiredDisabled: (0, yup_1.boolean)().notRequired(),
    confirmationRequiredTimeout: (0, yup_1.number)().notRequired().nullable(),
    confirmationRequiredTimeoutSubsequent: (0, yup_1.number)().notRequired().nullable(),
    showComplianceButtonDisposition: (0, yup_1.boolean)().required(),
    showComplianceButtonRequeue: (0, yup_1.boolean)().required(),
    showComplianceButtonReschedule: (0, yup_1.boolean)().required(),
    showComplianceButtonSnooze: (0, yup_1.boolean)().required(),
    showPreviewButtonDisposition: (0, yup_1.boolean)().required(),
    showPreviewButtonRequeue: (0, yup_1.boolean)().required(),
    showPreviewButtonReschedule: (0, yup_1.boolean)().required(),
    showPreviewButtonSnooze: (0, yup_1.boolean)().required(),
}).camelCase();
//# sourceMappingURL=skill-delivery-parameters.js.map