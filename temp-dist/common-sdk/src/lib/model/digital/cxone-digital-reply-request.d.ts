import { DigitalFileAttachment } from './digital-file-attachment';
import { ExternalPlatformTemplateMessageContent } from './external-platform-templates';
import { CXoneMessageContent } from './cxone-digital-quick-response';
/**
   * interface used for parsing reply request
   * @returns - reply request property types
   * ```
   * @example
   * ```
*/
export interface CXoneDigitalReplyRequest {
    thread?: Thread;
    messageContent: MessageContent | ExternalPlatformTemplateMessageContent | CXoneMessageContent;
    recipients: Array<EndUserRecipients>;
    title?: string;
    attachments?: Array<DigitalFileAttachment>;
    replyToMessage?: ReplyToMessage;
    originChannel?: ReplyFrom;
    forward?: forwardMessage;
    contact?: ContactPayload;
    isReplyToSpecificMessage?: boolean;
}
interface Thread {
    /**
    * @remarks - subject of thread
    */
    threadName?: string;
    /**
    * @remarks - threadId of post on other digital platforms.
    */
    idOnExternalPlatform?: string;
}
interface ReplyToMessage {
    /**
   * @remarks - messageID of post on other digital platforms.
   */
    idOnExternalPlatform?: string;
    /**
* @remarks - reply to Message Id.
*/
    id?: string;
}
interface forwardedMessageDetails {
    /**
  * @remarks - messageID of mail being forwarded.
  */
    id: string;
}
interface forwardMessage {
    /**
   * @remarks - message details.
   */
    message: forwardedMessageDetails;
    /**
* @remarks - reply to Message Id.
*/
    id?: string;
}
interface ReplyFrom {
    /**
    * @remarks - Unique identification of Reply From.
    */
    id: string;
}
export interface MessageContent {
    type: string;
    payload: MessageContentPayload;
}
interface MessageContentPayload {
    /**
    * @remarks - reply message text
    */
    text: string;
}
export interface EndUserRecipients {
    /**
    * @remarks - string indicating external platform receipent id
    */
    idOnExternalPlatform: string;
    /**
    * @remarks - name of the end user receipent
    */
    name: string;
    /**
    * @remarks - TODO: add property description
    */
    isPrimary: boolean;
    /**
    * @remarks - TODO: add property description
    */
    isPrivate: boolean;
}
/**
 * Interface for handling contact payload during elevations
 */
export interface ContactPayload {
    elevation?: ElevationPayload;
    /**
     * @remarks - Skill ID to which the contact is being initiated
     */
    skillId?: number;
}
export interface ElevationPayload {
    /**
     * Contains Interaction ID from which the contact is elevated
     */
    interaction: {
        id: string;
    };
    /**
     * Type of parent contact from which the new contact is elevated
     * - Default Value: dfo
     * - Accepted enum values: dfo, acd, em (email)
     */
    fromProvider: string;
}
export {};
