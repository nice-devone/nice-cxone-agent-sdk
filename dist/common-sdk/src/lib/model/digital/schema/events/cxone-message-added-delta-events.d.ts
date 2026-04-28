import { BaseDeltaEvent } from './cxone-base-delta-event';
import { MessageSendStatusType } from './cxone-message';
/** Attachment associated with a digital message */
interface CXoneAttachment {
    id: string;
    fileName?: string | null;
    friendlyName?: string;
    isInline: boolean;
    mimeType?: string;
    previewUrl?: string | null;
    securedPermanentUrl: string;
    url?: string;
    canBeStored?: boolean;
    blobUrl?: string | null;
}
/** Recipient of a digital message */
interface CXoneRecipient {
    idOnExternalPlatform: string;
    name: string;
    isPrimary: boolean;
    isPrivate: boolean;
}
/** End-user identity of a message author */
interface CXoneAuthorEndUserIdentity {
    idOnExternalPlatform: string;
    nickname?: string;
    image?: string;
    id: string;
    /** Can be empty for anonymous users */
    fullName?: string | null;
    externalPlatformId?: string;
}
/** Agent/user identity of a message author */
interface CXoneAuthorUser {
    id: number;
    emailAddress?: string | null;
    firstName: string;
    /** Can be blank in some scenarios */
    surname?: string;
}
/** User detail associated with a message note */
interface CXoneMessageNoteUser {
    id: number;
    incontactId: string;
    emailAddress?: string;
    loginUsername?: string;
    firstName?: string;
    surname?: string;
    agentId?: string | null;
    nickname?: string;
    imageUrl: string;
    publicImageUrl?: string | null;
    isBotUser: boolean;
    isSurveyUser: boolean;
}
/** Note attached to a digital message */
interface CXoneMessageNote {
    id: string;
    user?: CXoneMessageNoteUser | null;
    createdAt: string;
    updatedAt: string;
    content: string;
    currentAssignee?: string | null;
    status?: {
        type: string;
    };
    message?: {
        id: string;
    };
}
/** Tag associated with a digital message */
interface CXoneDigitalMessageTag {
    id: number;
    title: string;
    color: string;
}
/** Represents a field change in a digital message */
interface CXoneDigitalMessageChange {
    fieldName?: string;
    currentValue?: unknown;
}
/** Reply channel for a digital message */
interface CXoneDigitalReplyChannel {
    id: string;
    channelId?: string | null;
    originId?: string | null;
    idOnExternalPlatform?: string;
    type?: string;
    externalPlatformId?: string;
    realExternalPlatformId?: string;
    name?: string;
    externalPlatformAvatar?: string;
    externalPlatformIcon?: string;
    channelIntegrationId?: string;
    hasReply: boolean;
    hasTreeStructure?: boolean;
    hasPostAsPlaceholder?: boolean;
    contentFormat?: string;
    hasCustomerOnThirdParty?: boolean;
    isPostWritable?: boolean;
}
/** Rich message payload for structured/interactive content types */
declare type CXoneRichMessagePayload = Record<string, unknown>;
/** Content of a digital message */
interface CXoneMessageContent {
    /** Empty in attachment-only messages from the customer side */
    text?: string;
    type: string;
    payload?: CXoneRichMessagePayload;
    fallbackText?: string;
}
/** Reaction statistics for a digital message */
interface CXoneReactionStatistics {
    likes?: number;
    shares?: number;
    isSharedByChannel?: boolean;
    isLikedByChannel?: boolean;
}
/** Delivery status of a digital message */
interface CXoneMessageDeliveryStatus {
    isSuccess?: boolean;
    deliveredAt?: string;
    reason?: string | null;
}
/** Seen status of a digital message */
interface CXoneMessageSeenStatus {
    seenAt?: string | null;
}
/** Reference to the message being replied to */
interface CXoneMessageReplyToMessage {
    id?: string;
    idOnExternalPlatform?: string;
}
/** Device fingerprint of the message sender */
interface CXoneDeviceFingerprint {
    browser?: string;
    browserVersion?: string;
    os?: string;
    osVersion?: string;
    language?: string;
    ip?: string;
    location?: string;
    country?: string;
    deviceType?: string;
    deviceToken?: string;
    applicationType?: string;
    supportedMessageTypes?: unknown[];
}
/**
 *CXoneDeltaMessage interface.
 */
interface CXoneDeltaMessage {
    hasAdditionalMessageContent: boolean;
    id: string;
    attachments?: CXoneAttachment[];
    postId: string;
    threadId: string;
    messageContent: CXoneMessageContent;
    messageNotes?: CXoneMessageNote[];
    direction: string;
    createdAt: string;
    deviceFingerprint?: CXoneDeviceFingerprint | null;
    title?: string;
    recipients?: CXoneRecipient[];
    authorEndUserIdentity?: CXoneAuthorEndUserIdentity | null;
    authorUser?: CXoneAuthorUser | null;
    idOnExternalPlatform?: string;
    isReplyAllowed?: boolean;
    isRelatedMessage?: boolean;
    threadIdOnExternalPlatform?: string;
    url?: string | null;
    isReplyToSpecificMessage?: boolean | null;
    replyToMessage?: CXoneMessageReplyToMessage | null;
    isDeletedOnExternalPlatform: boolean;
    isHiddenOnExternalPlatform: boolean;
    reactionStatistics?: CXoneReactionStatistics | null;
    isRead?: boolean;
    tags?: CXoneDigitalMessageTag[];
    _changes?: CXoneDigitalMessageChange[];
    replyChannel?: CXoneDigitalReplyChannel | null;
    readAt?: string | null;
    contactNumber?: string | null;
    channel?: {
        id?: string;
    } | null;
    channelName?: string | null;
    channelType?: string | null;
    forward?: {
        message: {
            id?: string;
        } | null;
    } | null;
    xTraceId?: string | null;
    sentStatus?: MessageSendStatusType | null;
    contentRemoved?: {
        reason: string;
        removedAt: string;
    } | null;
    authorNameRemoved?: {
        reason: string;
        removedAt: string;
    } | null;
    delivered?: CXoneMessageDeliveryStatus[];
    customerStatistics?: CXoneMessageSeenStatus | null;
}
/**
 * Type alias for MESSAGE_ADDED_INTO_CASE delta event properties
 */
export interface MessageAddedDelta {
    message: CXoneDeltaMessage;
    originURL?: string;
    customerMessageUpdatedAt: string;
    hasUnreadMessage?: boolean;
}
/**
 * Represents a delta event for when a message is added to a case.
 */
export declare class MessageAddedIntoCaseDeltaEvent extends BaseDeltaEvent<MessageAddedDelta> {
    /**
     * Validates and extracts the message delta fields from the event data.
     * @param eventData - The raw event data containing the message information.
     * @example
     * ```typescript
     * const event = new MessageAddedIntoCaseDeltaEvent();
     * event.validateDeltaFields({ data: { message: { id: '123', text: 'Hello' } } });
     * ```
     */
    protected validateDeltaFields(eventData: any): void;
    /**
     * Validates optional boolean fields on a delta message.
     * @param message - The raw message object.
     */
    private validateOptionalBooleanFields;
    /**
     * Validates optional loose string fields on a delta message.
     * @param message - The raw message object.
     */
    private validateOptionalStringFields;
    /**
     * Validates the messageContent field of a delta message.
     * @param messageContent - The raw messageContent object.
     */
    private validateMessageContent;
    /**
     * Validates the attachments array of a delta message.
     * @param attachments - The raw attachments array.
     */
    private validateAttachments;
    /**
     * Validates the recipients array of a delta message.
     * @param recipients - The raw recipients array.
     */
    private validateRecipients;
    /**
     * Validates the authorEndUserIdentity field of a delta message.
     * @param identity - The raw authorEndUserIdentity object.
     */
    private validateAuthorEndUserIdentity;
    /**
     * Validates the authorUser field of a delta message.
     * @param authorUser - The raw authorUser object.
     */
    private validateAuthorUser;
    /**
     * Validates the messageNotes array of a delta message.
     * @param messageNotes - The raw messageNotes array.
     */
    private validateMessageNotes;
    /**
     * Validates the user object nested within a message note.
     * @param user - The raw note user object.
     * @param noteIndex - The index of the parent note in the messageNotes array.
     */
    private validateMessageNoteUser;
    /**
     * Validates the tags array of a delta message.
     * @param tags - The raw tags array.
     */
    private validateTags;
    /**
     * Validates the _changes array of a delta message.
     * @param changes - The raw _changes array.
     */
    private validateChanges;
    /**
     * Validates the replyChannel field of a delta message.
     * @param replyChannel - The raw replyChannel object.
     */
    private validateReplyChannel;
    /**
     * Validates the replyToMessage field of a delta message.
     * @param replyToMessage - The raw replyToMessage object.
     */
    private validateReplyToMessage;
    /**
     * Validates the reactionStatistics field of a delta message.
     * @param reactionStatistics - The raw reactionStatistics object.
     */
    private validateReactionStatistics;
    /**
     * Validates the delivered array of a delta message.
     * @param delivered - The raw delivered array.
     */
    private validateDelivered;
    /**
     * Validates the customerStatistics field of a delta message.
     * @param customerStatistics - The raw customerStatistics object.
     */
    private validateCustomerStatistics;
    /**
     * Validates the contentRemoved field of a delta message.
     * @param contentRemoved - The raw contentRemoved object.
     */
    private validateContentRemoved;
    /**
     * Validates the authorNameRemoved field of a delta message.
     * @param authorNameRemoved - The raw authorNameRemoved object.
     */
    private validateAuthorNameRemoved;
    /**
     * Validates the deviceFingerprint field of a delta message.
     * @param deviceFingerprint - The raw deviceFingerprint object.
     */
    private validateDeviceFingerprint;
    /**
     * Validates the channel field of a delta message.
     * @param channel - The raw channel object.
     */
    private validateChannel;
    /**
     * Validates the forward field of a delta message.
     * @param forward - The raw forward object.
     */
    private validateForward;
}
export {};
