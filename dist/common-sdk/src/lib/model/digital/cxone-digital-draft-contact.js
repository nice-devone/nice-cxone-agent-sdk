"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CXoneDraftContactSchema = void 0;
const yup_1 = require("yup");
const cxone_case_1 = require("./schema/events/cxone-case");
const cxone_message_1 = require("./schema/events/cxone-message");
/**
 * Schema for draft contact
 */
exports.CXoneDraftContactSchema = (0, yup_1.object)({
    customerContact: (0, yup_1.object)().shape(cxone_case_1.CXoneCaseSchema.fields).required(),
    messages: (0, yup_1.array)().of((0, yup_1.object)().shape(cxone_message_1.CXoneMessageSchema.fields)).optional(),
});
//# sourceMappingURL=cxone-digital-draft-contact.js.map