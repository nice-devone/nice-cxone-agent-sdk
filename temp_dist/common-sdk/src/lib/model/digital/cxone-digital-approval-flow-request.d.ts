import { EndUserRecipients } from './cxone-digital-reply-request';
import { DigitalFileAttachment } from './digital-file-attachment';
export interface CXoneDigitalCreateDraftRequest {
    /**
     * @remarks - ID generated from uuid
     */
    id: string;
    /**
     * @remarks - object to maintain type and text of message
     */
    messageContent: MessageContent;
    /**
     * @remarks - array of end user recipients
     */
    recipients: Array<EndUserRecipients>;
    /**
     * @remarks - object used for maintaining ID of the approval routing queue
     */
    approvalRoutingQueue: {
        id?: string;
    } | {
        skillId?: number;
    };
    /**
     * @remarks - ID used to reply individual message (Optional)
     */
    replyToMessage?: {
        id: string;
    };
    /**
     * @remarks -  Channel ID used to reply by particular channel (Optional)
     */
    replyByChannel?: {
        id: string;
    };
    /**
     * @remarks - Use to store Thread Title (Optional)
     */
    title?: string;
    /**
     * @remarks - attachments
     */
    attachments?: Array<DigitalFileAttachment>;
}
export interface CXoneDigitalUpdateDraftRequest {
    messageContent: MessageContent;
    recipients?: Array<EndUserRecipients>;
    replyToMessage?: {
        id: string;
    };
    replyByChannel?: {
        id: string;
    };
    title?: string;
}
interface MessageContent {
    type: string;
    payload: MessageContentPayload;
}
interface MessageContentPayload {
    /**
     * @remarks - reply message text
     */
    text: string;
}
export {};
