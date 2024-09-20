"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CXoneInboxAssigneeSchema = void 0;
const yup_1 = require("yup");
exports.CXoneInboxAssigneeSchema = (0, yup_1.object)({
    id: (0, yup_1.number)().required(),
    incontactId: (0, yup_1.string)().required(),
    emailAddress: (0, yup_1.string)(),
    loginUsername: (0, yup_1.string)(),
    firstName: (0, yup_1.string)(),
    surname: (0, yup_1.string)(),
});
//# sourceMappingURL=cxone-inbox-assignee.js.map