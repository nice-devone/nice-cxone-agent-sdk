"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CXoneRoutingQueueArray = exports.CXoneRoutingQueueSchema = void 0;
const yup_1 = require("yup");
exports.CXoneRoutingQueueSchema = (0, yup_1.object)({
    id: (0, yup_1.string)().required(),
    name: (0, yup_1.mixed)(),
    isSubqueue: (0, yup_1.string)().required(),
    skillId: (0, yup_1.number)().nullable(),
    agentResponseEnabled: (0, yup_1.boolean)().optional(),
    agentFirstResponseTime: (0, yup_1.number)().optional(),
    customerResponseEnabled: (0, yup_1.boolean)().optional(),
    agentFollowOnResponseTime: (0, yup_1.number)().optional(),
    customerIdleTime: (0, yup_1.number)().optional(),
    timeExtensionEnabled: (0, yup_1.boolean)().optional(),
});
exports.CXoneRoutingQueueArray = (0, yup_1.array)().of((0, yup_1.object)().shape(exports.CXoneRoutingQueueSchema.fields));
//# sourceMappingURL=cxone-routing-queue.js.map