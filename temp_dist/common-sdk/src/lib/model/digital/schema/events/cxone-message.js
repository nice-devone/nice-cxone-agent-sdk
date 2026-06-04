"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CXoneMessageSchema = exports.CXoneDeviceFingerprintSchema = exports.CXoneMessageReplyToMessageSchema = exports.CXoneMessageSeenStatusSchema = exports.CXoneMessageDeliveryStatusSchema = exports.CXoneMessageContentSchema = exports.MessageSendStatusType = void 0;
const digital_message_content_types_1 = require("./../../../../../enum/digital-message-content-types");
const yup_1 = require("yup");
const cxone_recipient_1 = require("./cxone-recipient");
const cxone_attachment_1 = require("./cxone-attachment");
const cxone_author_end_user_1 = require("./cxone-author-end-user");
const cxone_message_note_1 = require("./cxone-message-note");
const cxone_digital_message_tag_1 = require("./cxone-digital-message-tag");
const cxone_digital_reply_channel_1 = require("../../cxone-digital-reply-channel");
const cxone_message_types_1 = require("./cxone-message-types");
/**
 * Enum for message status to display visual indicators
 */
var MessageSendStatusType;
(function (MessageSendStatusType) {
    MessageSendStatusType["DELAYED"] = "Delayed";
    MessageSendStatusType["SENT"] = "Sent";
    MessageSendStatusType["SEEN"] = "Seen";
    MessageSendStatusType["DELIVERED"] = "Delivered";
})(MessageSendStatusType = exports.MessageSendStatusType || (exports.MessageSendStatusType = {}));
exports.CXoneMessageContentSchema = (0, yup_1.object)({
    text: (0, yup_1.string)(),
    type: (0, yup_1.string)().oneOf(Object.values(digital_message_content_types_1.DigitalMessageContentTypes)).default(digital_message_content_types_1.DigitalMessageContentTypes.TEXT).required(),
    payload: cxone_message_types_1.CXoneRichMessageSchema,
    fallbackText: (0, yup_1.string)(),
});
const CXoneReactionStatisticSchema = (0, yup_1.object)({
    likes: (0, yup_1.number)(),
    shares: (0, yup_1.number)(),
    isSharedByChannel: (0, yup_1.boolean)(),
    isLikedByChannel: (0, yup_1.boolean)(),
});
/**
 * Schema for the object tracking message delivery status
 */
exports.CXoneMessageDeliveryStatusSchema = (0, yup_1.object)({
    isSuccess: (0, yup_1.boolean)(),
    deliveredAt: (0, yup_1.string)(),
    reason: (0, yup_1.string)().nullable(),
});
/**
 * Schema for the object tracking message seen status
 */
exports.CXoneMessageSeenStatusSchema = (0, yup_1.object)({
    seenAt: (0, yup_1.string)().nullable(),
});
exports.CXoneMessageReplyToMessageSchema = (0, yup_1.object)({
    id: (0, yup_1.string)(),
    idOnExternalPlatform: (0, yup_1.string)(),
});
exports.CXoneDeviceFingerprintSchema = (0, yup_1.object)({
    browser: (0, yup_1.string)(),
    browserVersion: (0, yup_1.string)(),
    os: (0, yup_1.string)(),
    osVersion: (0, yup_1.string)(),
    language: (0, yup_1.string)(),
    ip: (0, yup_1.string)(),
    location: (0, yup_1.string)(),
    country: (0, yup_1.string)(),
    deviceType: (0, yup_1.string)(),
    deviceToken: (0, yup_1.string)(),
    applicationType: (0, yup_1.string)(),
    supportedMessageTypes: (0, yup_1.array)(),
});
exports.CXoneMessageSchema = (0, yup_1.object)({
    hasAdditionalMessageContent: (0, yup_1.boolean)(),
    id: (0, yup_1.string)().required(),
    attachments: (0, yup_1.array)().of((0, yup_1.object)().shape(cxone_attachment_1.CXoneAttachmentsSchema.fields)),
    postId: (0, yup_1.string)().required(),
    threadId: (0, yup_1.string)().required(),
    messageContent: (0, yup_1.object)().shape(exports.CXoneMessageContentSchema.fields).required(),
    messageNotes: (0, yup_1.array)().of((0, yup_1.object)().shape(cxone_message_note_1.CXoneMessageNoteSchema.fields)),
    direction: (0, yup_1.string)().required(),
    createdAt: (0, yup_1.string)().required(),
    deviceFingerprint: (0, yup_1.object)().shape(exports.CXoneDeviceFingerprintSchema.fields).nullable(),
    title: (0, yup_1.string)(),
    recipients: (0, yup_1.array)().of((0, yup_1.object)().shape(cxone_recipient_1.CXoneRecipientSchema.fields)),
    authorEndUserIdentity: (0, yup_1.object)()
        .shape(cxone_author_end_user_1.CXoneAuthorEndUserIdentitySchema.fields)
        .nullable(),
    authorUser: (0, yup_1.object)().shape(cxone_author_end_user_1.CXoneAuthorUserSchema.fields).nullable(),
    idOnExternalPlatform: (0, yup_1.string)(),
    isReplyAllowed: (0, yup_1.boolean)(),
    isRelatedMessage: (0, yup_1.boolean)().optional().default(false),
    threadIdOnExternalPlatform: (0, yup_1.string)(),
    url: (0, yup_1.string)().nullable(),
    isReplyToSpecificMessage: (0, yup_1.boolean)().nullable().optional(),
    replyToMessage: (0, yup_1.object)().shape(exports.CXoneMessageReplyToMessageSchema.fields).nullable(),
    isDeletedOnExternalPlatform: (0, yup_1.boolean)().required(),
    isHiddenOnExternalPlatform: (0, yup_1.boolean)().required(),
    reactionStatistics: (0, yup_1.object)().shape(CXoneReactionStatisticSchema.fields).nullable(),
    isRead: (0, yup_1.boolean)(),
    tags: (0, yup_1.array)().of((0, yup_1.object)().shape(cxone_digital_message_tag_1.CXoneDigitalMessageTagchema.fields)),
    _changes: (0, yup_1.array)().of((0, yup_1.object)().shape(cxone_digital_message_tag_1.CXoneDigitalMessageChangeSchema.fields)),
    replyChannel: (0, yup_1.object)().shape(cxone_digital_reply_channel_1.CXoneDigitalReplyChannelSchema.fields).nullable(),
    readAt: (0, yup_1.string)().nullable().optional(),
    contactNumber: (0, yup_1.string)().nullable().optional(),
    channel: (0, yup_1.object)().shape({ id: (0, yup_1.string)() }).nullable().optional(),
    channelName: (0, yup_1.string)().nullable().optional(),
    channelType: (0, yup_1.string)().nullable().optional(),
    forward: (0, yup_1.object)().shape({ message: (0, yup_1.object)().shape({ id: (0, yup_1.string)() }).nullable() }).nullable(),
    xTraceId: (0, yup_1.string)().nullable(),
    sentStatus: (0, yup_1.string)().oneOf(Object.values(MessageSendStatusType)).default(MessageSendStatusType.SENT).nullable(),
    contentRemoved: (0, yup_1.object)().shape({ reason: (0, yup_1.string)(), removedAt: (0, yup_1.string)() }).nullable(),
    authorNameRemoved: (0, yup_1.object)().shape({ reason: (0, yup_1.string)(), removedAt: (0, yup_1.string)() }).nullable(),
    delivered: (0, yup_1.array)().of((0, yup_1.object)().shape(exports.CXoneMessageDeliveryStatusSchema.fields)),
    customerStatistics: (0, yup_1.object)().shape(exports.CXoneMessageSeenStatusSchema.fields).nullable(),
});
const CXoneMessageArraySchema = (0, yup_1.array)().of((0, yup_1.object)().shape(exports.CXoneMessageSchema.fields));
//# sourceMappingURL=cxone-message.js.map