"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CXoneLoadPreviousContactDetailsSchema = exports.CXonePreviousNextContactSchema = void 0;
const yup_1 = require("yup");
const cxone_case_inbox_assignee_changed_1 = require("./schema/events/cxone-case-inbox-assignee-changed");
/* Schema for Loading previous and next contacts of active digital case */
exports.CXonePreviousNextContactSchema = (0, yup_1.object)({
    previous: (0, yup_1.string)().nullable(),
    next: (0, yup_1.string)().nullable(),
});
/* Schema for Loading contact details for previous/next contact of active digital case */
exports.CXoneLoadPreviousContactDetailsSchema = (0, yup_1.object)().shape(cxone_case_inbox_assignee_changed_1.contactDetailsInboxAssigneeSchema.fields).from('customerContact', 'case').required();
//# sourceMappingURL=cxone-previous-next-contacts.js.map