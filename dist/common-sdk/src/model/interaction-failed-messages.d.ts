import { CXoneDigitalCreateDraftRequest } from '../lib/model/digital/cxone-digital-approval-flow-request';
import { CXoneDigitalReplyRequest } from '../lib/model/digital/cxone-digital-reply-request';
/**
 * Interaction failed Message object list
 */
export interface InteractionFailedMessages {
    /**
     * It comprises of key value pair where key is caseId and value is of type FailedMessageDetails
     */
    [caseId: string]: Array<FailedMessageDetails>;
}
/**
 * FiledMessageObject type holds the details of message failed while sending
 */
export interface FailedMessageDetails {
    /**
     * CXoneDigitalReplyRequest type object which contains all the message detail
     */
    sendReplyObj?: CXoneDigitalReplyRequest;
    /**
     * unique message id from client side
     */
    xTraceId: string;
    /**
     * in case of tree structure, the parent id of the current failed message
     */
    parentId?: string;
    /**
     * message author of the failed message
     */
    messageAuthor: string;
    /**
     * CXoneDigitalCreateDraftRequest type object which contains all the failed messages aimed to get approval
     */
    draftMessageForApproval?: CXoneDigitalCreateDraftRequest;
    /**
     * In case of email message failure we need to open failed message in editor instead of directly sending it
     */
    wysiwygEnabled: boolean;
    /**
    *channelName in the from field of the failed message
    */
    fromAddress?: string;
}
