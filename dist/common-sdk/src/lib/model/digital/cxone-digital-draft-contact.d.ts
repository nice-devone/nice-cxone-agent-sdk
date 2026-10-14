import { InferType } from 'yup';
import { CXoneCustomFieldDetails } from '../customer-card/custom-fields/cxone-custom-fields-request';
/**
 * Recipient entry for draft contact and validation requests.
 */
export interface DraftContactRecipient {
    /**
     * @remarks - Identifier of the recipient on the external platform (e.g. phone number, email address).
     */
    idOnExternalPlatform: string;
    /**
     * @remarks - Display name of the recipient.
     */
    name?: string;
    /**
     * @remarks - Whether this recipient is the primary recipient.
     */
    isPrimary?: boolean;
    /**
     * @remarks - Whether this recipient should be treated as private.
     */
    isPrivate?: boolean;
}
/**
 * Thread details for a draft contact.
 */
export interface DraftContactThread {
    /**
     * @remarks - Name of the thread.
     */
    threadName: string;
}
/**
 * Specifies the channel to reply from.
 */
export interface DraftContactReplyFrom {
    /**
     * @remarks - Channel ID to use as the sender.
     */
    channelId: string;
}
/**
 * Inner payload for a message content entry.
 */
export interface MessageContentPayload {
    /**
     * @remarks - Text body of the message.
     */
    text: string;
}
/**
 * Message content for a draft contact.
 */
export interface DraftContactMessageContent {
    /**
     * @remarks - Type of the message (e.g. 'TEXT').
     */
    type: string;
    /**
     * @remarks - Content payload of the message.
     */
    payload: MessageContentPayload;
}
/**
 * Attachment entry for a draft contact.
 */
export interface DraftContactAttachment {
    /**
     * @remarks - Human-readable file name of the attachment.
     */
    friendlyName: string;
    /**
     * @remarks - URL pointing to the attachment resource.
     */
    url: string;
}
/**
 * Contact metadata for a draft contact request.
 */
export interface DraftContact {
    /**
     * @remarks - Direction of the contact (e.g. 'outbound').
     */
    direction: string;
    /**
     * @remarks - Optional custom fields for the contact.
     */
    customFields?: CXoneCustomFieldDetails[];
}
/**
 *interface for draft contact request
 */
export interface CXoneDigitalDraftContactRequest {
    /**
     * @remarks - Optional identifier of an existing draft contact to update. Omit this field to create a new draft contact.
     */
    draftContactId?: string;
    /**
     * @remarks - Channel ID to associate this draft with.
     */
    channelId: string;
    /**
     * @remarks - Optional thread details for the draft contact.
     */
    thread?: DraftContactThread;
    /**
     * @remarks - Optional channel to reply from.
     */
    replyFrom?: DraftContactReplyFrom;
    /**
     * @remarks - Optional message content for the draft contact.
     */
    messageContent?: DraftContactMessageContent;
    /**
     * @remarks - Optional list of attachments.
     */
    attachments?: DraftContactAttachment[];
    /**
     * @remarks - List of recipients for the draft contact.
     */
    recipients: DraftContactRecipient[];
    /**
     * @remarks - Optional contact metadata including direction and custom fields.
     */
    contact?: DraftContact;
}
/**
 * Schema for draft contact
 */
export declare const CXoneDraftContactSchema: import("yup/lib/object").OptionalObjectSchema<{
    consumerContact: any;
}, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
    consumerContact: any;
}>>;
/**
 * interface for draft contact details
 */
export declare type CXoneDraftContactDetails = InferType<typeof CXoneDraftContactSchema>;
