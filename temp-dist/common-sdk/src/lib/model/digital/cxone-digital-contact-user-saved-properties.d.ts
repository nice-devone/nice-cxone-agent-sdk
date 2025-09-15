import { EditorState as LexicalEditorState } from 'lexical';
import { CXoneReplyToMessages } from './schema/events/cxone-reply-message';
import { CXoneMessage } from './schema/events/cxone-message';
/**
 * Interface for User Saved properties like draft email, etc. fields
 */
export interface CXoneDigitalContactUserSavedProperties {
    /**
     * @remarks - direct receiver in to field
    */
    receiverTo: string;
    /**
     * @remarks - receiver in cc field
    */
    receiverCc: string;
    /**
     * @remarks - receiver in bcc field
    */
    receiverBcc: string;
    /**
     * @remarks - sender
     */
    sender: string;
    /**
     * @remarks - email subject
     */
    subject: string;
    /**
     * @remarks - lexical editor state
     */
    lexicalEditorState?: LexicalEditorState;
    /**
    * @remarks - flag to indicate if response or outbound
    */
    isResponse?: boolean;
    /**
     * @remarks - message ID of message replied to
     */
    messageId?: string;
    /**
    * @remarks - flag for visibility of editor box(applicable for email and public channels)
    */
    isEditorOpen?: boolean;
    /**
    * @remarks - object used for mainting attributes of reply to message
    */
    selectedMessageReplyData?: CXoneReplyToMessages;
    /**
    * @remarks - selected channel name
    */
    channelDisplayName?: string;
    /**
  * @remarks - customer nick name
  */
    nickName?: string;
    /**
   * @remarks - Request approval message draft id
   */
    messageDraftId?: string;
    /**
* @remarks - reset customer response timestamp
*/
    resetCRT?: number;
    /**
    * @remarks - In case of email forward, this flag will be set to true, if this will be true we will
    * not send the replyToMessage in the outbound request
    */
    isEmailForward?: boolean;
    /**
    * @remarks - In case of replying to a message
    */
    isReplyingToSpecificMessage?: boolean;
    /**
    * @remarks - In case of replying to a message
    */
    message?: CXoneMessage | undefined;
}
