"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSlotsSchema = void 0;
const yup_1 = require("yup");
const UserSlot = (0, yup_1.object)({
    slotId: (0, yup_1.string)(),
    postId: (0, yup_1.string)().nullable(),
    caseId: (0, yup_1.string)().nullable(),
});
exports.UserSlotsSchema = (0, yup_1.array)().of((0, yup_1.object)().shape(UserSlot.fields));
//# sourceMappingURL=user-slots.js.map