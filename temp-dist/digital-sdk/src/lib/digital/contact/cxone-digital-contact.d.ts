import { Logger } from '@nice-devone/core-sdk';
import { CXoneSdkError, HttpResponse, DigitalContactEvent, CXoneDigitalReplyRequest, CXoneFileUploadRequest, CXoneRoutingQueue, CXoneCase, CXoneChannel, CXoneInboxAssignee, CXoneMessageArray, DigitalContactStatus, CXoneFileUploadResponse, CXoneDigitalEvent, AttachmentType, CXoneDigitalCreateDraftRequest, CXoneDigitalUpdateDraftRequest, CXoneMessageDraftsArray, CXonePublicMessage, CXoneLoadPreviousContactDetails, CXoneLoadPreviousNextContact, CXoneDigitalReplyChannel, CXoneUserRolePermissions, CXoneContactCustomFieldDefinition } from '@nice-devone/common-sdk';
import { CXoneContact, CxoneDigitalMessageNote } from '@nice-devone/agent-sdk';
/**
 * Interface ContactMessageNote containing message note properties
 */
interface ContactMessageNote {
    status: boolean;
    content: string;
    noteId?: string;
}
/**
 * Class containing properties and methods related to a digital contact
 */
export declare class CXoneDigitalContact extends CXoneContact {
    /**
     * @remarks - conversationNote of case in digital platform of a digital contact.
     * This is note details which store content of note specific to in case object (case`->`id) in Digital
     * status: true if message note is opened or false if closed
     * content: holds the note message
     */
    messageNote: ContactMessageNote;
    /**
     * @remarks - updatedMessageNote of case in digital platform of a digital contact.
     * This holds the message note details which has been created/deleted/updated
     * published after capturing the web socket event
     */
    updatedMessageNote: CxoneDigitalMessageNote;
    refusalTimeOut: number;
    /**
     * @remarks - The identifier of case in digital platform of a digital contact.
     * This is id field in case object (case`->`id) in Digital and `DFOContactId` in ACD getNextEvent.
     */
    caseId: string;
    customerName: string;
    channelType: string;
    private digitalContactService;
    /**
     * @remarks - represents model for case.
     */
    case: CXoneCase;
    /**
     * @remarks - model properties for channel.
     */
    channel: CXoneChannel;
    /**
     * @remarks - represents model for inboxAssignee.
     */
    inboxAssignee: CXoneInboxAssignee;
    /**
     * @remarks - represents model properties for routingQueue.
     */
    routingQueue: CXoneRoutingQueue;
    /**
     * @remarks - flag to differential case assignment or transfer
     */
    isCaseAssigned: boolean;
    protected logger: Logger;
    /**
     * @remarks - this will use to store list of all messages related to current case from MessageAddedIntoCase WS event
     */
    messages: CXoneMessageArray;
    /**
     * @remarks - this will use to store list of all draft messages related to current case from MessageAddedIntoCase WS event
     */
    messageDrafts: CXoneMessageDraftsArray;
    /**
      * @remarks - represents model for websocket events received
      */
    eventDetails: CXoneDigitalEvent;
    /**
      * @remarks - represents metadata stored in local storage for attachments uploaded by user
    */
    attachments?: {
        attachments: Array<AttachmentType>;
    };
    /**
      * @remarks - URL to jump to origin of message and case
    */
    originURL?: string;
    /**
     * @remarks - represents user role permissions
     */
    userRolePermissions: CXoneUserRolePermissions;
    /**
     * @remarks - used to maintain the parent child message tree for public channel
     */
    publicMessagesTree: CXonePublicMessage;
    /**
     * @remarks - used to maintain the parent child map for public channel
     */
    publicMessagesParentChildMap: any;
    /**
     * @remarks - used to check if message is updated at
     */
    customerMessageUpdatedAt: Date;
    /**
     * @remarks - used to check if message is updated at
     */
    hasUnreadMessage: boolean;
    /**
      * @remarks - caseId of the previous case
      */
    previousCaseId?: string | null;
    /**
      * @remarks - stores details about the previous case
      */
    previousConversationMessages?: CXoneLoadPreviousContactDetails[];
    /**
      * @remarks - stores details about reply channels
      */
    replyChannels?: CXoneDigitalReplyChannel[];
    /**
      * @remarks - stores coBrowse status
      */
    isCoBrowseEnabled?: boolean;
    /**
      * @remarks - stores coBrowse surfly link
      */
    coBrowseLink?: string;
    /**
      * @remarks - flag that determines whether case is assigned to agent inbox or not(false for view only cases)
      */
    isAssignedToAgentInbox?: boolean;
    /**
      * @remarks - list of contact custom fields assigned to case
      */
    contactCustomFieldDefs?: CXoneContactCustomFieldDefinition[];
    /**
     * get instance for DigitalContactService
     * @example
     * ```
     * this.digitalContactService = new DigitalContactService();
     * ```
     */
    constructor();
    /**
     * @example
     */
    getDigitalContact(contact: DigitalContactEvent): this;
    /**
    * Method to change Digital Contact Status
    * @returns
    * ```
    * @example
    * changeStatus()
    * ```
    */
    changeStatus(status: DigitalContactStatus | string): Promise<HttpResponse | CXoneSdkError>;
    /**
     * Method to unassign customer contact
     * @returns - returns customer contact unassigned response
     * ```
     * @example
     * unassign()
     * ```
    */
    unassign(): Promise<HttpResponse | CXoneSdkError>;
    /**
     * Method to change routing queue
     * @returns - returns customer contact assignment to routing queue response
     * ```
     * @example
     * changeRoutingQueue()
     * ```
    */
    changeRoutingQueue(skillId: string): Promise<HttpResponse | CXoneSdkError>;
    /**
     * Method to change User
     * @returns - returns customer contact assignment to user response
     * ```
     * @example
     * changeUser()
     * ```
    */
    changeUser(cxoneUserId: string): Promise<HttpResponse | CXoneSdkError>;
    /**
     * Method to send reply
     * @returns - returns the send reply response
     * @example
     *  TODO: This method signature should receive object from map
     * need to update this method after websocket implementation
     *
     */
    reply(cxOneDigitalReplyRequest: CXoneDigitalReplyRequest, channelId: string, traceId: string): Promise<HttpResponse | CXoneSdkError>;
    /**
       * Method to upload digital channel attachment
       * @returns - returns s3 bucket URL in Response
       * ```
       * @example
       * upload() takes CXoneFileUploadRequest as parameter for uploading file to s3 bucket
       * ```
    */
    upload(uploadDetails: CXoneFileUploadRequest, uId: string): Promise<CXoneFileUploadResponse>;
    /**
     * Method to parse web socket event response
     * @returns - parsed response based on predefined schema
     * @example
     */
    parse(validatedResponse: {
        [key: string]: any;
    }): Promise<void>;
    /**
     * Method to get additional message content for single message in case of websocket response
     * @returns - complete message content with html tags
     * ```
     * @example
     * getSingleMessageAdditionalContent()
     * ```
     */
    private getSingleMessageAdditionalContent;
    /**
     * Method to check if messages has additional content
     * @returns - complete message content with html tags
     * ```
     * @example
     * checkForAdditionalMessageContent()
     * ```
     */
    private checkForAdditionalMessageContent;
    /**
     * Method to getAdditionalMessageContent
     * @returns - complete message content with html tags
     * ```
     * @example
     * getAdditionalMessageContent()
     * ```
     */
    private getAdditionalMessageContent;
    /**
     * Method to subscribeToEventHub
     * @returns - returns promise to event hub subscription call
     * ```
     * @example
     * subscribeToEventHub()
     * ```
     */
    subscribeToEventHub(): void;
    /**
     * Method to get quick replies data
     * @example
     * ```
     * getQuickReplies()
     * ```
    */
    getQuickReplies(): Promise<import("@nice-devone/common-sdk").CXoneDigitalQuickReply[]>;
    /**
     * Method to replace  quick reply variables
     * @param quickReplyId - Unique identification for quick reply
     * @example
     * ```
     * replaceQuickReplyVariables()
     * ```
    */
    replaceQuickReplyVariables(quickReplyId: string): Promise<import("@nice-devone/common-sdk").CXoneDigitalReplaceVariables>;
    /**
     * Method to delete message
     * @param messageId - MessageID
     * @example
     * ```
     * deleteMessage(messageId)
     * ```
    */
    deleteMessage(messageId: string): Promise<unknown>;
    /**
     * Method to hideMessage
     * @returns - response
     * ```
     * @example
     * hideUnhideMessage()
     * ```
     */
    hideUnhideMessage(messageData: {
        msgId: string;
        isHidden: boolean;
    }): Promise<HttpResponse | CXoneSdkError>;
    /**
     * Method to createDraftMessage
     * @returns - promise HttpResponce/error
     * ```
     * @example
     * createDraftMessage(msg)
     * ```
     */
    createDraftMessage(draftMessage: CXoneDigitalCreateDraftRequest): Promise<HttpResponse>;
    /**
     * Method to updateDraftMessage
     * @returns - promise HttpResponce/error
     * ```
     * @example
     * updateDraftMessage(msg, id)
     * ```
     */
    updateDraftMessage(draftMessage: CXoneDigitalUpdateDraftRequest, draftMessageId: string): Promise<HttpResponse>;
    /**
     * Method to deleteDraftMessage
     * @returns - promise HttpResponce/error
     * ```
     * @example
     * deleteDraftMessage( id)
     * ```
     */
    deleteDraftMessage(draftMessageId: string): Promise<HttpResponse>;
    /**
     * Method to approveDraftMessage
     * @returns - promise HttpResponce/error
     * ```
     * @example
     * approveDraftMessage( id)
     * ```
     */
    approveDraftMessage(draftMessageId: string): Promise<HttpResponse>;
    /**
     * Method to rejectDraftMessage
     * @returns - promise HttpResponce/error
     * ```
     * @example
     * rejectDraftMessage( id)
     * ```
     */
    rejectDraftMessage(draftMessageId: string): Promise<HttpResponse>;
    /**
     * Method to get previous & next case ids of current digital contact
     * @param contactId - Contact Id of the digital contact
     * ```
     * @example
     * loadRelatedDigitalContacts('2345678')
     * ```
    */
    loadRelatedDigitalContacts(contactId: string): Promise<CXoneLoadPreviousNextContact>;
    /**
     * Method to get conversation history of previous/next contact of current digital contact
     * @param contactId - Contact Id of the digital contact
     * ```
     * @example
     * loadConversationHistory('2345678')
     * ```
    */
    loadConversationHistory(contactId: string): Promise<CXoneLoadPreviousContactDetails>;
}
export {};
