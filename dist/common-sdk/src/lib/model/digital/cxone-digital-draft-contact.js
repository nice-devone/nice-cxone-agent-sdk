"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CXoneDraftContactSchema = void 0;
const yup_1 = require("yup");
const cxone_case_1 = require("./schema/events/cxone-case");
/**
 * Schema for draft contact
 */
exports.CXoneDraftContactSchema = (0, yup_1.object)({
    consumerContact: (0, yup_1.object)().shape(cxone_case_1.CXoneCaseSchema.fields).required(),
});
//# sourceMappingURL=cxone-digital-draft-contact.js.map