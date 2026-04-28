"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageAddedIntoCaseDeltaEvent = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const cxone_base_delta_event_1 = require("./cxone-base-delta-event");
const cxone_message_1 = require("./cxone-message");
const digital_message_content_types_1 = require("./../../../../../enum/digital-message-content-types");
/**
 * Valid message content type values for runtime validation
 */
const VALID_MESSAGE_CONTENT_TYPES = Object.values(digital_message_content_types_1.DigitalMessageContentTypes);
/**
 * Required string fields on a deltaMessage
 */
const REQUIRED_STRING_FIELDS = ['id', 'postId', 'threadId', 'direction', 'createdAt'];
/**
 * Required boolean fields on a deltaMessage
 */
const REQUIRED_BOOLEAN_FIELDS = ['isDeletedOnExternalPlatform', 'isHiddenOnExternalPlatform'];
/**
 * Represents a delta event for when a message is added to a case.
 */
class MessageAddedIntoCaseDeltaEvent extends cxone_base_delta_event_1.BaseDeltaEvent {
    /**
     * Validates and extracts the message delta fields from the event data.
     * @param eventData - The raw event data containing the message information.
     * @example
     * ```typescript
     * const event = new MessageAddedIntoCaseDeltaEvent();
     * event.validateDeltaFields({ data: { message: { id: '123', text: 'Hello' } } });
     * ```
     */
    validateDeltaFields(eventData) {
        var _a, _b, _c;
        const message = (_a = eventData === null || eventData === void 0 ? void 0 : eventData.data) === null || _a === void 0 ? void 0 : _a.message;
        if (typeof message !== 'object' || message === null) {
            throw new Error('message must be a non-null object');
        }
        for (const field of REQUIRED_STRING_FIELDS) {
            if (typeof message[field] !== 'string' || message[field].trim() === '') {
                throw new Error(`message.${field} must be a non-empty string`);
            }
        }
        for (const field of REQUIRED_BOOLEAN_FIELDS) {
            if (typeof message[field] !== 'boolean') {
                throw new Error(`message.${field} must be a boolean`);
            }
        }
        if ((message === null || message === void 0 ? void 0 : message.url) !== undefined && (message === null || message === void 0 ? void 0 : message.url) !== null && typeof (message === null || message === void 0 ? void 0 : message.url) !== 'string') {
            throw new Error('message.url must be a string if provided');
        }
        if ((message === null || message === void 0 ? void 0 : message.isRead) !== undefined && typeof (message === null || message === void 0 ? void 0 : message.isRead) !== 'boolean') {
            throw new Error('message.isRead must be a boolean if provided');
        }
        if ((message === null || message === void 0 ? void 0 : message.sentStatus) !== undefined && (message === null || message === void 0 ? void 0 : message.sentStatus) !== null && !Object.values(cxone_message_1.MessageSendStatusType).includes(message === null || message === void 0 ? void 0 : message.sentStatus)) {
            throw new Error(`message.sentStatus must be one of: ${Object.values(cxone_message_1.MessageSendStatusType).join(', ')} if provided`);
        }
        else {
            message.sentStatus = cxone_message_1.MessageSendStatusType.SENT; // default to SENT if not provided
        }
        this.validateMessageContent(message === null || message === void 0 ? void 0 : message.messageContent);
        this.validateOptionalBooleanFields(message);
        this.validateOptionalStringFields(message);
        this.validateReplyToMessage(message === null || message === void 0 ? void 0 : message.replyToMessage);
        this.validateReactionStatistics(message === null || message === void 0 ? void 0 : message.reactionStatistics);
        this.validateForward(message === null || message === void 0 ? void 0 : message.forward);
        this.validateChannel(message === null || message === void 0 ? void 0 : message.channel);
        this.validateContentRemoved(message === null || message === void 0 ? void 0 : message.contentRemoved);
        this.validateAuthorNameRemoved(message === null || message === void 0 ? void 0 : message.authorNameRemoved);
        this.validateAuthorEndUserIdentity(message === null || message === void 0 ? void 0 : message.authorEndUserIdentity);
        this.validateAuthorUser(message === null || message === void 0 ? void 0 : message.authorUser);
        this.validateCustomerStatistics(message === null || message === void 0 ? void 0 : message.customerStatistics);
        this.validateTags(message === null || message === void 0 ? void 0 : message.tags);
        this.validateChanges(message === null || message === void 0 ? void 0 : message._changes);
        this.validateAttachments(message === null || message === void 0 ? void 0 : message.attachments);
        this.validateRecipients(message === null || message === void 0 ? void 0 : message.recipients);
        this.validateMessageNotes(message === null || message === void 0 ? void 0 : message.messageNotes);
        this.validateReplyChannel(message === null || message === void 0 ? void 0 : message.replyChannel);
        this.validateDelivered(message === null || message === void 0 ? void 0 : message.delivered);
        this.validateDeviceFingerprint(message === null || message === void 0 ? void 0 : message.deviceFingerprint);
        message['xTraceId'] = (_b = eventData === null || eventData === void 0 ? void 0 : eventData.traceId) !== null && _b !== void 0 ? _b : '';
        this.delta = {
            message: message,
            originURL: (_c = message === null || message === void 0 ? void 0 : message.url) !== null && _c !== void 0 ? _c : undefined,
            customerMessageUpdatedAt: message === null || message === void 0 ? void 0 : message.createdAt,
            hasUnreadMessage: !(message === null || message === void 0 ? void 0 : message.isRead),
        };
    }
    /**
     * Validates optional boolean fields on a delta message.
     * @param message - The raw message object.
     */
    validateOptionalBooleanFields(message) {
        if (message.hasAdditionalMessageContent !== undefined && typeof message.hasAdditionalMessageContent !== 'boolean') {
            throw new Error('message.hasAdditionalMessageContent must be a boolean if provided');
        }
        if (message.isReplyAllowed !== undefined && typeof message.isReplyAllowed !== 'boolean') {
            throw new Error('message.isReplyAllowed must be a boolean if provided');
        }
        if (message.isRelatedMessage !== undefined && typeof message.isRelatedMessage !== 'boolean') {
            throw new Error('message.isRelatedMessage must be a boolean if provided');
        }
        if (message.isReplyToSpecificMessage !== undefined && message.isReplyToSpecificMessage !== null && typeof message.isReplyToSpecificMessage !== 'boolean') {
            throw new Error('message.isReplyToSpecificMessage must be a boolean if provided');
        }
    }
    /**
     * Validates optional loose string fields on a delta message.
     * @param message - The raw message object.
     */
    validateOptionalStringFields(message) {
        if (message.title !== undefined && typeof message.title !== 'string') {
            throw new Error('message.title must be a string if provided');
        }
        if (message.idOnExternalPlatform !== undefined && typeof message.idOnExternalPlatform !== 'string') {
            throw new Error('message.idOnExternalPlatform must be a string if provided');
        }
        if (message.threadIdOnExternalPlatform !== undefined && typeof message.threadIdOnExternalPlatform !== 'string') {
            throw new Error('message.threadIdOnExternalPlatform must be a string if provided');
        }
        if (message.readAt !== undefined && message.readAt !== null && typeof message.readAt !== 'string') {
            throw new Error('message.readAt must be a string if provided');
        }
        if (message.contactNumber !== undefined && message.contactNumber !== null && typeof message.contactNumber !== 'string') {
            throw new Error('message.contactNumber must be a string if provided');
        }
        if (message.channelName !== undefined && message.channelName !== null && typeof message.channelName !== 'string') {
            throw new Error('message.channelName must be a string if provided');
        }
        if (message.channelType !== undefined && message.channelType !== null && typeof message.channelType !== 'string') {
            throw new Error('message.channelType must be a string if provided');
        }
    }
    /**
     * Validates the messageContent field of a delta message.
     * @param messageContent - The raw messageContent object.
     */
    validateMessageContent(messageContent) {
        if (typeof messageContent !== 'object' || messageContent === null) {
            throw new Error('message.messageContent must be a non-null object');
        }
        if (!VALID_MESSAGE_CONTENT_TYPES.includes(messageContent.type)) {
            throw new Error(`message.messageContent.type must be one of: ${VALID_MESSAGE_CONTENT_TYPES.join(', ')}`);
        }
        if (messageContent.text !== undefined && messageContent.text !== null && typeof messageContent.text !== 'string') {
            throw new Error('message.messageContent.text must be a string if provided');
        }
        if (messageContent.payload !== undefined && messageContent.payload !== null && typeof messageContent.payload !== 'object') {
            throw new Error('message.messageContent.payload must be an object if provided');
        }
        if (messageContent.fallbackText !== undefined && messageContent.fallbackText !== null && typeof messageContent.fallbackText !== 'string') {
            throw new Error('message.messageContent.fallbackText must be a string if provided');
        }
    }
    /**
     * Validates the attachments array of a delta message.
     * @param attachments - The raw attachments array.
     */
    validateAttachments(attachments) {
        if (attachments === undefined || attachments === null) {
            return;
        }
        if (!Array.isArray(attachments)) {
            throw new Error('message.attachments must be an array if provided');
        }
        attachments.forEach((attachment, index) => {
            if (typeof attachment !== 'object' || attachment === null) {
                throw new Error(`message.attachments[${index}] must be a non-null object`);
            }
            if (typeof attachment.id !== 'string' || attachment.id.trim() === '') {
                throw new Error(`message.attachments[${index}].id must be a non-empty string`);
            }
            if (typeof attachment.isInline !== 'boolean') {
                throw new Error(`message.attachments[${index}].isInline must be a boolean`);
            }
            if (typeof attachment.securedPermanentUrl !== 'string' || attachment.securedPermanentUrl.trim() === '') {
                throw new Error(`message.attachments[${index}].securedPermanentUrl must be a non-empty string`);
            }
            if (attachment.fileName !== undefined && attachment.fileName !== null && typeof attachment.fileName !== 'string') {
                throw new Error(`message.attachments[${index}].fileName must be a string if provided`);
            }
            if (attachment.friendlyName !== undefined && typeof attachment.friendlyName !== 'string') {
                throw new Error(`message.attachments[${index}].friendlyName must be a string if provided`);
            }
            if (attachment.mimeType !== undefined && typeof attachment.mimeType !== 'string') {
                throw new Error(`message.attachments[${index}].mimeType must be a string if provided`);
            }
            if (attachment.previewUrl !== undefined && attachment.previewUrl !== null && typeof attachment.previewUrl !== 'string') {
                throw new Error(`message.attachments[${index}].previewUrl must be a string if provided`);
            }
            if (attachment.url !== undefined && typeof attachment.url !== 'string') {
                throw new Error(`message.attachments[${index}].url must be a string if provided`);
            }
            if (attachment.canBeStored !== undefined && typeof attachment.canBeStored !== 'boolean') {
                throw new Error(`message.attachments[${index}].canBeStored must be a boolean if provided`);
            }
            if (attachment.blobUrl !== undefined && attachment.blobUrl !== null && typeof attachment.blobUrl !== 'string') {
                throw new Error(`message.attachments[${index}].blobUrl must be a string if provided`);
            }
        });
    }
    /**
     * Validates the recipients array of a delta message.
     * @param recipients - The raw recipients array.
     */
    validateRecipients(recipients) {
        if (recipients === undefined || recipients === null) {
            return;
        }
        if (!Array.isArray(recipients)) {
            throw new Error('message.recipients must be an array if provided');
        }
        recipients.forEach((recipient, index) => {
            if (typeof recipient !== 'object' || recipient === null) {
                throw new Error(`message.recipients[${index}] must be a non-null object`);
            }
            if (typeof recipient.idOnExternalPlatform !== 'string' || recipient.idOnExternalPlatform.trim() === '') {
                throw new Error(`message.recipients[${index}].idOnExternalPlatform must be a non-empty string`);
            }
            if (typeof recipient.name !== 'string') {
                throw new Error(`message.recipients[${index}].name must be a non-empty string`);
            }
            if (typeof recipient.isPrimary !== 'boolean') {
                throw new Error(`message.recipients[${index}].isPrimary must be a boolean`);
            }
            if (typeof recipient.isPrivate !== 'boolean') {
                throw new Error(`message.recipients[${index}].isPrivate must be a boolean`);
            }
        });
    }
    /**
     * Validates the authorEndUserIdentity field of a delta message.
     * @param identity - The raw authorEndUserIdentity object.
     */
    validateAuthorEndUserIdentity(identity) {
        if (identity === undefined || identity === null) {
            return;
        }
        if (typeof identity !== 'object') {
            throw new Error('message.authorEndUserIdentity must be an object if provided');
        }
        if (typeof identity.idOnExternalPlatform !== 'string' || identity.idOnExternalPlatform.trim() === '') {
            throw new Error('message.authorEndUserIdentity.idOnExternalPlatform must be a non-empty string');
        }
        if (typeof identity.id !== 'string' || identity.id.trim() === '') {
            throw new Error('message.authorEndUserIdentity.id must be a non-empty string');
        }
        if (identity.nickname !== undefined && typeof identity.nickname !== 'string') {
            throw new Error('message.authorEndUserIdentity.nickname must be a string if provided');
        }
        if (identity.image !== undefined && typeof identity.image !== 'string') {
            throw new Error('message.authorEndUserIdentity.image must be a string if provided');
        }
        if (identity.fullName !== undefined && identity.fullName !== null && typeof identity.fullName !== 'string') {
            throw new Error('message.authorEndUserIdentity.fullName must be a string if provided');
        }
        if (identity.externalPlatformId !== undefined && typeof identity.externalPlatformId !== 'string') {
            throw new Error('message.authorEndUserIdentity.externalPlatformId must be a string if provided');
        }
    }
    /**
     * Validates the authorUser field of a delta message.
     * @param authorUser - The raw authorUser object.
     */
    validateAuthorUser(authorUser) {
        if (authorUser === undefined || authorUser === null) {
            return;
        }
        if (typeof authorUser !== 'object') {
            throw new Error('message.authorUser must be an object if provided');
        }
        if (typeof authorUser.id !== 'number') {
            throw new Error('message.authorUser.id must be a number');
        }
        if (typeof authorUser.firstName !== 'string' || authorUser.firstName.trim() === '') {
            throw new Error('message.authorUser.firstName must be a non-empty string');
        }
        if (authorUser.emailAddress !== undefined && authorUser.emailAddress !== null && typeof authorUser.emailAddress !== 'string') {
            throw new Error('message.authorUser.emailAddress must be a string if provided');
        }
        if (authorUser.surname !== undefined && typeof authorUser.surname !== 'string') {
            throw new Error('message.authorUser.surname must be a string if provided');
        }
    }
    /**
     * Validates the messageNotes array of a delta message.
     * @param messageNotes - The raw messageNotes array.
     */
    validateMessageNotes(messageNotes) {
        if (messageNotes === undefined || messageNotes === null) {
            return;
        }
        if (!Array.isArray(messageNotes)) {
            throw new Error('message.messageNotes must be an array if provided');
        }
        messageNotes.forEach((note, index) => {
            if (typeof note !== 'object' || note === null) {
                throw new Error(`message.messageNotes[${index}] must be a non-null object`);
            }
            if (typeof note.id !== 'string' || note.id.trim() === '') {
                throw new Error(`message.messageNotes[${index}].id must be a non-empty string`);
            }
            if (typeof note.createdAt !== 'string' || note.createdAt.trim() === '') {
                throw new Error(`message.messageNotes[${index}].createdAt must be a non-empty string`);
            }
            if (typeof note.updatedAt !== 'string' || note.updatedAt.trim() === '') {
                throw new Error(`message.messageNotes[${index}].updatedAt must be a non-empty string`);
            }
            if (typeof note.content !== 'string') {
                throw new Error(`message.messageNotes[${index}].content must be a string`);
            }
            this.validateMessageNoteUser(note.user, index);
            if (note.currentAssignee !== undefined && note.currentAssignee !== null && typeof note.currentAssignee !== 'string') {
                throw new Error(`message.messageNotes[${index}].currentAssignee must be a string if provided`);
            }
            if (note.status !== undefined && note.status !== null) {
                if (typeof note.status !== 'object') {
                    throw new Error(`message.messageNotes[${index}].status must be an object if provided`);
                }
                if (typeof note.status.type !== 'string') {
                    throw new Error(`message.messageNotes[${index}].status.type must be a string`);
                }
            }
            if (note.message !== undefined && note.message !== null) {
                if (typeof note.message !== 'object') {
                    throw new Error(`message.messageNotes[${index}].message must be an object if provided`);
                }
                if (typeof note.message.id !== 'string' || note.message.id.trim() === '') {
                    throw new Error(`message.messageNotes[${index}].message.id must be a non-empty string`);
                }
            }
        });
    }
    /**
     * Validates the user object nested within a message note.
     * @param user - The raw note user object.
     * @param noteIndex - The index of the parent note in the messageNotes array.
     */
    validateMessageNoteUser(user, noteIndex) {
        if (user === undefined || user === null) {
            return;
        }
        if (typeof user !== 'object') {
            throw new Error(`message.messageNotes[${noteIndex}].user must be an object if provided`);
        }
        if (typeof user.id !== 'number') {
            throw new Error(`message.messageNotes[${noteIndex}].user.id must be a number`);
        }
        if (typeof user.incontactId !== 'string' || user.incontactId.trim() === '') {
            throw new Error(`message.messageNotes[${noteIndex}].user.incontactId must be a non-empty string`);
        }
        if (typeof user.imageUrl !== 'string') {
            throw new Error(`message.messageNotes[${noteIndex}].user.imageUrl must be a string`);
        }
        if (typeof user.isBotUser !== 'boolean') {
            throw new Error(`message.messageNotes[${noteIndex}].user.isBotUser must be a boolean`);
        }
        if (typeof user.isSurveyUser !== 'boolean') {
            throw new Error(`message.messageNotes[${noteIndex}].user.isSurveyUser must be a boolean`);
        }
        if (user.emailAddress !== undefined && typeof user.emailAddress !== 'string') {
            throw new Error(`message.messageNotes[${noteIndex}].user.emailAddress must be a string if provided`);
        }
        if (user.loginUsername !== undefined && typeof user.loginUsername !== 'string') {
            throw new Error(`message.messageNotes[${noteIndex}].user.loginUsername must be a string if provided`);
        }
        if (user.firstName !== undefined && typeof user.firstName !== 'string') {
            throw new Error(`message.messageNotes[${noteIndex}].user.firstName must be a string if provided`);
        }
        if (user.surname !== undefined && typeof user.surname !== 'string') {
            throw new Error(`message.messageNotes[${noteIndex}].user.surname must be a string if provided`);
        }
        if (user.agentId !== undefined && user.agentId !== null && typeof user.agentId !== 'string') {
            throw new Error(`message.messageNotes[${noteIndex}].user.agentId must be a string if provided`);
        }
        if (user.nickname !== undefined && typeof user.nickname !== 'string') {
            throw new Error(`message.messageNotes[${noteIndex}].user.nickname must be a string if provided`);
        }
        if (user.publicImageUrl !== undefined && user.publicImageUrl !== null && typeof user.publicImageUrl !== 'string') {
            throw new Error(`message.messageNotes[${noteIndex}].user.publicImageUrl must be a string if provided`);
        }
    }
    /**
     * Validates the tags array of a delta message.
     * @param tags - The raw tags array.
     */
    validateTags(tags) {
        if (tags === undefined || tags === null) {
            return;
        }
        if (!Array.isArray(tags)) {
            throw new Error('message.tags must be an array if provided');
        }
        tags.forEach((tag, index) => {
            if (typeof tag !== 'object' || tag === null) {
                throw new Error(`message.tags[${index}] must be a non-null object`);
            }
            if (typeof tag.id !== 'number') {
                throw new Error(`message.tags[${index}].id must be a number`);
            }
            if (typeof tag.title !== 'string' || tag.title.trim() === '') {
                throw new Error(`message.tags[${index}].title must be a non-empty string`);
            }
            if (typeof tag.color !== 'string' || tag.color.trim() === '') {
                throw new Error(`message.tags[${index}].color must be a non-empty string`);
            }
        });
    }
    /**
     * Validates the _changes array of a delta message.
     * @param changes - The raw _changes array.
     */
    validateChanges(changes) {
        if (changes === undefined || changes === null) {
            return;
        }
        if (!Array.isArray(changes)) {
            throw new Error('message._changes must be an array if provided');
        }
        changes.forEach((change, index) => {
            if (typeof change !== 'object' || change === null) {
                throw new Error(`message._changes[${index}] must be a non-null object`);
            }
            if (change.fieldName !== undefined && typeof change.fieldName !== 'string') {
                throw new Error(`message._changes[${index}].fieldName must be a string if provided`);
            }
        });
    }
    /**
     * Validates the replyChannel field of a delta message.
     * @param replyChannel - The raw replyChannel object.
     */
    validateReplyChannel(replyChannel) {
        if (replyChannel === undefined || replyChannel === null) {
            return;
        }
        if (typeof replyChannel !== 'object') {
            throw new Error('message.replyChannel must be an object if provided');
        }
        if (typeof replyChannel.id !== 'string' || replyChannel.id.trim() === '') {
            throw new Error('message.replyChannel.id must be a non-empty string');
        }
        if (typeof replyChannel.hasReply !== 'boolean') {
            throw new Error('message.replyChannel.hasReply must be a boolean');
        }
        if (replyChannel.channelId !== undefined && replyChannel.channelId !== null && typeof replyChannel.channelId !== 'string') {
            throw new Error('message.replyChannel.channelId must be a string if provided');
        }
        if (replyChannel.originId !== undefined && replyChannel.originId !== null && typeof replyChannel.originId !== 'string') {
            throw new Error('message.replyChannel.originId must be a string if provided');
        }
        if (replyChannel.idOnExternalPlatform !== undefined && typeof replyChannel.idOnExternalPlatform !== 'string') {
            throw new Error('message.replyChannel.idOnExternalPlatform must be a string if provided');
        }
        if (replyChannel.type !== undefined && typeof replyChannel.type !== 'string') {
            throw new Error('message.replyChannel.type must be a string if provided');
        }
        if (replyChannel.externalPlatformId !== undefined && typeof replyChannel.externalPlatformId !== 'string') {
            throw new Error('message.replyChannel.externalPlatformId must be a string if provided');
        }
        if (replyChannel.realExternalPlatformId !== undefined && typeof replyChannel.realExternalPlatformId !== 'string') {
            throw new Error('message.replyChannel.realExternalPlatformId must be a string if provided');
        }
        if (replyChannel.name !== undefined && typeof replyChannel.name !== 'string') {
            throw new Error('message.replyChannel.name must be a string if provided');
        }
        if (replyChannel.externalPlatformAvatar !== undefined && typeof replyChannel.externalPlatformAvatar !== 'string') {
            throw new Error('message.replyChannel.externalPlatformAvatar must be a string if provided');
        }
        if (replyChannel.externalPlatformIcon !== undefined && typeof replyChannel.externalPlatformIcon !== 'string') {
            throw new Error('message.replyChannel.externalPlatformIcon must be a string if provided');
        }
        if (replyChannel.channelIntegrationId !== undefined && typeof replyChannel.channelIntegrationId !== 'string') {
            throw new Error('message.replyChannel.channelIntegrationId must be a string if provided');
        }
        if (replyChannel.hasTreeStructure !== undefined && typeof replyChannel.hasTreeStructure !== 'boolean') {
            throw new Error('message.replyChannel.hasTreeStructure must be a boolean if provided');
        }
        if (replyChannel.hasPostAsPlaceholder !== undefined && typeof replyChannel.hasPostAsPlaceholder !== 'boolean') {
            throw new Error('message.replyChannel.hasPostAsPlaceholder must be a boolean if provided');
        }
        if (replyChannel.contentFormat !== undefined && typeof replyChannel.contentFormat !== 'string') {
            throw new Error('message.replyChannel.contentFormat must be a string if provided');
        }
        if (replyChannel.hasCustomerOnThirdParty !== undefined && typeof replyChannel.hasCustomerOnThirdParty !== 'boolean') {
            throw new Error('message.replyChannel.hasCustomerOnThirdParty must be a boolean if provided');
        }
        if (replyChannel.isPostWritable !== undefined && typeof replyChannel.isPostWritable !== 'boolean') {
            throw new Error('message.replyChannel.isPostWritable must be a boolean if provided');
        }
    }
    /**
     * Validates the replyToMessage field of a delta message.
     * @param replyToMessage - The raw replyToMessage object.
     */
    validateReplyToMessage(replyToMessage) {
        if (replyToMessage === undefined || replyToMessage === null) {
            return;
        }
        if (typeof replyToMessage !== 'object') {
            throw new Error('message.replyToMessage must be an object if provided');
        }
        if (replyToMessage.id !== undefined && typeof replyToMessage.id !== 'string') {
            throw new Error('message.replyToMessage.id must be a string if provided');
        }
        if (replyToMessage.idOnExternalPlatform !== undefined && typeof replyToMessage.idOnExternalPlatform !== 'string') {
            throw new Error('message.replyToMessage.idOnExternalPlatform must be a string if provided');
        }
    }
    /**
     * Validates the reactionStatistics field of a delta message.
     * @param reactionStatistics - The raw reactionStatistics object.
     */
    validateReactionStatistics(reactionStatistics) {
        if (reactionStatistics === undefined || reactionStatistics === null) {
            return;
        }
        if (typeof reactionStatistics !== 'object') {
            throw new Error('message.reactionStatistics must be an object if provided');
        }
        if (reactionStatistics.likes !== undefined && typeof reactionStatistics.likes !== 'number') {
            throw new Error('message.reactionStatistics.likes must be a number if provided');
        }
        if (reactionStatistics.shares !== undefined && typeof reactionStatistics.shares !== 'number') {
            throw new Error('message.reactionStatistics.shares must be a number if provided');
        }
        if (reactionStatistics.isSharedByChannel !== undefined && typeof reactionStatistics.isSharedByChannel !== 'boolean') {
            throw new Error('message.reactionStatistics.isSharedByChannel must be a boolean if provided');
        }
        if (reactionStatistics.isLikedByChannel !== undefined && typeof reactionStatistics.isLikedByChannel !== 'boolean') {
            throw new Error('message.reactionStatistics.isLikedByChannel must be a boolean if provided');
        }
    }
    /**
     * Validates the delivered array of a delta message.
     * @param delivered - The raw delivered array.
     */
    validateDelivered(delivered) {
        if (delivered === undefined || delivered === null) {
            return;
        }
        if (!Array.isArray(delivered)) {
            throw new Error('message.delivered must be an array if provided');
        }
        delivered.forEach((deliveryStatus, index) => {
            if (typeof deliveryStatus !== 'object' || deliveryStatus === null) {
                throw new Error(`message.delivered[${index}] must be a non-null object`);
            }
            if (deliveryStatus.isSuccess !== undefined && typeof deliveryStatus.isSuccess !== 'boolean') {
                throw new Error(`message.delivered[${index}].isSuccess must be a boolean if provided`);
            }
            if (deliveryStatus.deliveredAt !== undefined && typeof deliveryStatus.deliveredAt !== 'string') {
                throw new Error(`message.delivered[${index}].deliveredAt must be a string if provided`);
            }
            if (deliveryStatus.reason !== undefined && deliveryStatus.reason !== null && typeof deliveryStatus.reason !== 'string') {
                throw new Error(`message.delivered[${index}].reason must be a string if provided`);
            }
        });
    }
    /**
     * Validates the customerStatistics field of a delta message.
     * @param customerStatistics - The raw customerStatistics object.
     */
    validateCustomerStatistics(customerStatistics) {
        if (customerStatistics === undefined || customerStatistics === null) {
            return;
        }
        if (typeof customerStatistics !== 'object') {
            throw new Error('message.customerStatistics must be an object if provided');
        }
        if (customerStatistics.seenAt !== undefined && customerStatistics.seenAt !== null && typeof customerStatistics.seenAt !== 'string') {
            throw new Error('message.customerStatistics.seenAt must be a string if provided');
        }
    }
    /**
     * Validates the contentRemoved field of a delta message.
     * @param contentRemoved - The raw contentRemoved object.
     */
    validateContentRemoved(contentRemoved) {
        if (contentRemoved === undefined || contentRemoved === null) {
            return;
        }
        if (typeof contentRemoved !== 'object') {
            throw new Error('message.contentRemoved must be an object if provided');
        }
        if (typeof contentRemoved.reason !== 'string') {
            throw new Error('message.contentRemoved.reason must be a string');
        }
        if (typeof contentRemoved.removedAt !== 'string') {
            throw new Error('message.contentRemoved.removedAt must be a string');
        }
    }
    /**
     * Validates the authorNameRemoved field of a delta message.
     * @param authorNameRemoved - The raw authorNameRemoved object.
     */
    validateAuthorNameRemoved(authorNameRemoved) {
        if (authorNameRemoved === undefined || authorNameRemoved === null) {
            return;
        }
        if (typeof authorNameRemoved !== 'object') {
            throw new Error('message.authorNameRemoved must be an object if provided');
        }
        if (typeof authorNameRemoved.reason !== 'string') {
            throw new Error('message.authorNameRemoved.reason must be a string');
        }
        if (typeof authorNameRemoved.removedAt !== 'string') {
            throw new Error('message.authorNameRemoved.removedAt must be a string');
        }
    }
    /**
     * Validates the deviceFingerprint field of a delta message.
     * @param deviceFingerprint - The raw deviceFingerprint object.
     */
    validateDeviceFingerprint(deviceFingerprint) {
        if (deviceFingerprint === undefined || deviceFingerprint === null) {
            return;
        }
        if (typeof deviceFingerprint !== 'object') {
            throw new Error('message.deviceFingerprint must be an object if provided');
        }
        const fingerprintStringFields = ['browser', 'browserVersion', 'os', 'osVersion', 'language', 'ip', 'location', 'country', 'deviceType', 'deviceToken', 'applicationType'];
        for (const field of fingerprintStringFields) {
            if (deviceFingerprint[field] !== undefined && typeof deviceFingerprint[field] !== 'string') {
                throw new Error(`message.deviceFingerprint.${field} must be a string if provided`);
            }
        }
    }
    /**
     * Validates the channel field of a delta message.
     * @param channel - The raw channel object.
     */
    validateChannel(channel) {
        if (channel === undefined || channel === null) {
            return;
        }
        if (typeof channel !== 'object') {
            throw new Error('message.channel must be an object if provided');
        }
        if (channel.id !== undefined && typeof channel.id !== 'string') {
            throw new Error('message.channel.id must be a string if provided');
        }
    }
    /**
     * Validates the forward field of a delta message.
     * @param forward - The raw forward object.
     */
    validateForward(forward) {
        if (forward === undefined || forward === null) {
            return;
        }
        if (typeof forward !== 'object') {
            throw new Error('message.forward must be an object if provided');
        }
        if (forward.message !== undefined && forward.message !== null) {
            if (typeof forward.message !== 'object') {
                throw new Error('message.forward.message must be an object if provided');
            }
            if (forward.message.id !== undefined && typeof forward.message.id !== 'string') {
                throw new Error('message.forward.message.id must be a string if provided');
            }
        }
    }
}
exports.MessageAddedIntoCaseDeltaEvent = MessageAddedIntoCaseDeltaEvent;
//# sourceMappingURL=cxone-message-added-delta-events.js.map