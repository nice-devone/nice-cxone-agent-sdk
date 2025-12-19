"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CXoneMessageDraftsSchema = exports.CXoneMessageDraftsUserSchema = exports.CXoneMessageDraftsReplyToSchema = exports.CXoneMessageDraftsMessageContentSchema = void 0;
const yup_1 = require("yup");
const cxone_message_note_1 = require("./cxone-message-note");
const cxone_attachment_1 = require("./cxone-attachment");
const cxone_digital_message_tag_1 = require("./cxone-digital-message-tag");
const cxone_digital_reply_channel_1 = require("../../cxone-digital-reply-channel");
const cxone_recipient_1 = require("./cxone-recipient");
const cxone_message_1 = require("./cxone-message");
exports.CXoneMessageDraftsMessageContentSchema = (0, yup_1.object)({
    /**
     * @remarks - Actual message content in message draft
     */
    text: (0, yup_1.string)().required(),
});
exports.CXoneMessageDraftsReplyToSchema = (0, yup_1.object)({
    /**
     * @remarks - This variable is to hold the ID for the reply to message
     */
    id: (0, yup_1.string)().optional(),
});
exports.CXoneMessageDraftsUserSchema = (0, yup_1.object)({
    /**
     * @remarks - This displays the firstName of the agent, who sent this message
     */
    firstName: (0, yup_1.string)().required(),
    /**
     * @remarks - This displays the surname of the agent, who sent this message
     */
    surname: (0, yup_1.string)().required(),
});
exports.CXoneMessageDraftsSchema = (0, yup_1.object)({
    /**
     * @remarks - This displays the message created date and time as string
     */
    createdAt: (0, yup_1.string)().required(),
    /**
     * @remarks - This is the ID of the message draft
     */
    id: (0, yup_1.string)().required(),
    /**
     * @remarks - This is message object and it contains the actual message text
     */
    messageContent: (0, yup_1.object)().shape(exports.CXoneMessageDraftsMessageContentSchema.fields).required(),
    /**
     * @remarks - This is indicates if the current message is replied to some message
     */
    isReplyToSpecificMessage: (0, yup_1.boolean)().optional().default(false),
    /**
     * @remarks - This is replyToMessage object and it holds the ID of the message that this message is replied to
     */
    replyToMessage: (0, yup_1.object)().shape(exports.CXoneMessageDraftsReplyToSchema.fields).optional(),
    /**
     * @remarks - This is User object and it holds the user information who created this message
     */
    user: (0, yup_1.object)().shape(exports.CXoneMessageDraftsUserSchema.fields).optional(),
    /**
     * @remarks - This boolean denotes the approval status
     * true - approval is denied
     * false - pending for approval
     */
    isRefused: (0, yup_1.boolean)().optional(),
    messageNotes: (0, yup_1.array)().of((0, yup_1.object)().shape(cxone_message_note_1.CXoneMessageNoteSchema.fields)),
    tags: (0, yup_1.array)().of((0, yup_1.object)().shape(cxone_digital_message_tag_1.CXoneDigitalMessageTagchema.fields)),
    /**
     * @remarks - This is attachment array
     */
    attachments: (0, yup_1.array)().of((0, yup_1.object)().shape(cxone_attachment_1.CXoneAttachmentsSchema.fields)),
    /**
     * @remarks - channel associated with message
     */
    channel: (0, yup_1.object)().shape(cxone_digital_reply_channel_1.CXoneDigitalReplyChannelSchema.fields).optional(),
    /**
     * list of recipients for the message
     */
    recipients: (0, yup_1.array)().of((0, yup_1.object)().shape(cxone_recipient_1.CXoneRecipientSchema.fields)),
    /**
     * title of the message
     */
    title: (0, yup_1.string)().nullable().default(''),
    /**
     * status of message sent
     */
    sentStatus: (0, yup_1.string)().oneOf(Object.values(cxone_message_1.MessageSendStatusType)).nullable(),
    delivered: (0, yup_1.array)().of((0, yup_1.object)().shape(cxone_message_1.CXoneMessageDeliveryStatusSchema.fields)),
    customerStatistics: (0, yup_1.object)().shape(cxone_message_1.CXoneMessageSeenStatusSchema.fields).nullable(),
    /**
     * Reason for rejection
     */
    reason: (0, yup_1.string)().optional().nullable().default(''),
});
const CXoneMessageDraftsArraySchema = (0, yup_1.array)().of((0, yup_1.object)().shape(exports.CXoneMessageDraftsSchema.fields));
//# sourceMappingURL=cxone-messagedraft.js.map