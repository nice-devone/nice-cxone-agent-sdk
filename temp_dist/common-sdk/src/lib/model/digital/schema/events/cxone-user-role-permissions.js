"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CXoneUserRolePermissionsSchema = void 0;
const yup_1 = require("yup");
exports.CXoneUserRolePermissionsSchema = (0, yup_1.object)({
    /**
     * @remarks - Agent can approve the draft message
     */
    canApproveDraft: (0, yup_1.boolean)().required(),
    /**
     * @remarks - Agent can assign case to some other agent
     */
    canAssign: (0, yup_1.boolean)().required(),
    /**
     * @remarks - Agent can create a draft message
     */
    canCreateDraft: (0, yup_1.boolean)().required(),
    /**
     * @remarks - Agent can reply on the message
     */
    canReply: (0, yup_1.boolean)().required(),
    /**
     * @remarks - Agent can unassign the case
     */
    canUnassign: (0, yup_1.boolean)().required(),
});
//# sourceMappingURL=cxone-user-role-permissions.js.map