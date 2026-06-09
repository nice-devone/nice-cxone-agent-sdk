import { CXoneDigitalReplyRequest } from '../lib/model/digital/cxone-digital-reply-request';
import { CXoneMessage } from '../lib/model/digital/schema/events/cxone-message';
import { CXoneMessageDraft } from '../lib/model/digital/schema/events/cxone-messagedraft';
export interface CcfContactRichMessageProps {
    /**
   * @remarks  message
   */
    message: CXoneMessage | CXoneMessageDraft;
    /**
    * @remarks  message action menu
    */
    messageActionMenu?: React.ReactNode;
}
/**
 * Payload object for draft message
 */
export interface DraftMessagePayload {
    /**
     * case id for selected digital contact
     */
    caseId: string;
    /**
     * draft reply message payload
     */
    replyPayload: CXoneDigitalReplyRequest;
    /**
     * message body
     */
    message?: CXoneMessage;
    /**
     * X-Trace-Id for message
     */
    traceId?: string;
    /**
     * Interaction id for selected digital contact
     */
    interactionId: string;
}
