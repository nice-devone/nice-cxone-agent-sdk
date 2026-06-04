"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageDeliveryStatusChangeSchema = void 0;
const cxone_case_1 = require("./cxone-case");
const cxone_event_1 = require("./cxone-event");
const cxone_message_1 = require("./cxone-message");
const yup_1 = require("yup");
/*  create hierarchy for data object */
const messageDataSchema = (0, yup_1.object)({
    contact: (0, yup_1.object)().shape(cxone_case_1.CXoneCaseSchema.fields).required(),
    message: (0, yup_1.object)().shape(cxone_message_1.CXoneMessageSchema.fields).required(),
});
/* Concat data property with root level event schema property */
exports.messageDeliveryStatusChangeSchema = (0, yup_1.object)({
    data: (0, yup_1.object)().shape(messageDataSchema.fields).required(),
}).concat((0, yup_1.object)().shape(cxone_event_1.CXoneEventSchema.fields).required());
//# sourceMappingURL=cxone-message-delivery-status-change-schema.js.map