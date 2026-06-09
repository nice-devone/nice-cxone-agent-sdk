"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SenderTypingEventSchema = void 0;
const cxone_channel_1 = require("./cxone-channel");
const cxone_event_1 = require("./cxone-event");
const yup_1 = require("yup");
/*  create hierarchy for data object for Sender typing started / Sender typing ended */
const SenderTypingDataSchema = (0, yup_1.object)({
    thread: (0, yup_1.object)().shape({
        id: (0, yup_1.string)().required(),
    }).required(),
    channel: (0, yup_1.object)().shape(cxone_channel_1.CXoneChannelSchema.fields).optional(),
});
/* Concat data property with root level event schema property */
exports.SenderTypingEventSchema = (0, yup_1.object)({
    data: (0, yup_1.object)().shape(SenderTypingDataSchema.fields).required(),
}).concat((0, yup_1.object)().shape(cxone_event_1.CXoneEventSchema.fields).required());
//# sourceMappingURL=cxone-sender-typing.js.map