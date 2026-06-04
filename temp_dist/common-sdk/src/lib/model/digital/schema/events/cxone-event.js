"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CXoneEventSchema = void 0;
const yup_1 = require("yup");
exports.CXoneEventSchema = (0, yup_1.object)({
    eventId: (0, yup_1.string)().optional(),
    eventObject: (0, yup_1.string)().optional(),
    eventType: (0, yup_1.string)().required(),
    traceId: (0, yup_1.string)().optional().nullable(true),
});
//# sourceMappingURL=cxone-event.js.map