"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypingPreviewEventSchema = void 0;
const cxone_channel_1 = require("./cxone-channel");
const cxone_event_1 = require("./cxone-event");
const yup_1 = require("yup");
const cxone_message_1 = require("./cxone-message");
/*  create hierarchy for data object for Sender typing preview */
const TypingPreviewDataSchema = (0, yup_1.object)({
    thread: (0, yup_1.object)()
        .shape({
        id: (0, yup_1.string)().required(),
    })
        .required(),
    messagePreview: (0, yup_1.object)()
        .shape({ messageContent: (0, yup_1.object)().shape(cxone_message_1.CXoneMessageContentSchema.fields).required() }),
    channel: (0, yup_1.object)().shape(cxone_channel_1.CXoneChannelSchema.fields).optional(),
});
/* Concat data property with root level event schema property */
exports.TypingPreviewEventSchema = (0, yup_1.object)({
    data: (0, yup_1.object)().shape(TypingPreviewDataSchema.fields).required(),
}).concat((0, yup_1.object)().shape(cxone_event_1.CXoneEventSchema.fields).required());
//# sourceMappingURL=cxone-typing-preview.js.map