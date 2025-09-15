"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CXoneThreadSchema = void 0;
const yup_1 = require("yup");
/**
 * Schema used for threads related to digital case
 */
exports.CXoneThreadSchema = (0, yup_1.object)({
    /**
     *  flag to know more messages are allowed to be added on current thread or not
     */
    canAddMoreMessages: (0, yup_1.boolean)(),
    /**
     *  unique identifier of the channel related to current thread
     */
    channelId: (0, yup_1.string)().required(),
    /**
     *  unique identifier of the current thread
     */
    id: (0, yup_1.string)().required(),
    /**
     *  unique identifier of the external digital platform
     */
    idOnExternalPlatform: (0, yup_1.string)().nullable().optional(),
    /**
     *  name of the current thread
     */
    threadName: (0, yup_1.string)().nullable().optional(),
});
//# sourceMappingURL=cxone-thread.js.map