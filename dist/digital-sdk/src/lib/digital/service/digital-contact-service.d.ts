import { BulkReplyHistoryResponse, BulkReplyResponse, CcfLogger } from '@nice-devone/agent-sdk';
import { CXoneSdkError, HttpResponse, CXoneDigitalReplyRequest, CXoneDigitalReplaceVariables, CXoneFileUploadRequest, CXoneDigitalCreateDraftRequest, CXoneDigitalUpdateDraftRequest, CXoneDigitalQuickReply, CXoneDigitalOutboundQuickReply, CXoneQuickReplyReplaceVariableRequest } from '@nice-devone/common-sdk';
import { HttpUtilService } from '@nice-devone/core-sdk';
/**
 * Class to handle digital contact related API calls
 */
export declare class DigitalContactService {
    logger: CcfLogger;
    protected utilService: HttpUtilService;
    private auth;
    private adminService;
    private urlUtilsService;
    private HIDE_MESSAGE_BY_ID;
    private DELETE_MESSAGE_BY_ID;
    private RELATED_MESSAGES;
    private FOCUS_DEFOCUS_CONTACT;
    private CREATE_DRAFT_MESSAGE;
    private UPDATE_DRAFT_MESSAGE;
    private DELETE_DRAFT_MESSAGE;
    private APPROVE_DRAFT_MESSAGE;
    private REJECT_DRAFT_MESSAGE;
    private LOAD_RELATED_CASES;
    private DIGITAL_QUICK_REPLIES_OUTBOUND;
    private DIGITAL_QR_REPLACE_VARIABLES;
    private QUICK_RESPONSE_REPLACE_VARIABLES;
    private digitalEventSyncService;
    private isWSAPIIntegrationRevampToggleEnabled;
    /**
     * @example
     * ```
     * const digitalContactSvc = new DigitalContactService();
     * ```
    */
    constructor();
    /**
     * Method to change status of digital contact
     * @param caseId - Case Id of the digital contact
     * @param status - Status to be set to the digital contact
     * @returns
     * @example -
     */
    changeCustomerContactStatus(caseId: string, status: string): Promise<HttpResponse>;
    /**
     * Method to send bulk reply
     * @param selectedContactIds - Selected contact IDs
     * @param messageContent - Message content
     * @param cxoneUserId - Agent ID of logged in user
     * @returns
     * @example - sendBulkReply(['12345'], 'test', '457677')
     */
    sendBulkReply(selectedContactIds: string[], messageContent: string, cxoneUserId: string): Promise<BulkReplyResponse | CXoneSdkError>;
    /**
     * Method to Get the bulk reply history
     * @returns
     * @example -
     */
    getBulkReplyHistory(): Promise<BulkReplyHistoryResponse | CXoneSdkError>;
    /**
     * Method to unassign customer contact
     * @returns
     * @example -
    */
    unassignCustomerContact(contactId: string): Promise<HttpResponse>;
    /**
     * Method to assign customer contact to routing queue
     * @param contactId - Contact Id of the digital contact
     * @param skillId - Id of the skill queue where the contact it to be assigned
     * @returns
     * @example -
    */
    changeRoutingQueue(contactId: string, skillId: string): Promise<HttpResponse | CXoneSdkError>;
    /**
     * Method to check if event is already consumed
     * @param response - Http response from API
     * @param contactId - Contact Id of the digital contact
     * @param eventName - Event name to check
     * @returns - isEventConsumed
     * @example -
     * checkIfEventConsumed(response, '645337', 'CASE_INBOX_ASSIGNED')
    */
    private checkIfEventConsumed;
    /**
     * Method to get logged in user id from local storage
     * @returns - User Id of the logged in user
     * @example -
     * getLoggedInUserId()
    */
    private getLoggedInUserId;
    /**
     * Method to assign customer contact to User
     * @param contactId - Contact Id of the digital contact
     * @param userId - User Id to whom the contact it to be assigned
     * @returns - HttpResponse | CXoneSdkError
     * @example -
     * ```
     * changeAssignedUser('123332', '645337')
     * ```
    */
    changeAssignedUser(contactId: string, cxoneUserId: string): Promise<HttpResponse | CXoneSdkError>;
    /**
     * Method to send reply
     * @param channelId - channel Id
     * @param sendReplyRequest - message object
     * @param xTraceId - xTraceId to trace the message
     * @returns response from /dfo/3.0/channels/channel_id/outbound API
     * @example postOutboundReply(postOutboundReply, channelId, xTraceId)
    */
    postOutboundReply(sendReplyRequest: CXoneDigitalReplyRequest, channelId: string, xTraceId: string): Promise<HttpResponse>;
    /**
     * Method to get contact details based on user slot API digital contact Id
     * @returns
     * @example -
    */
    getDigitalContactDetails(contactId: string): Promise<HttpResponse>;
    /**
     * Method to get all related message threads for a public channel digital contact
     * @returns
     * @example -
    */
    getRelatedMessages(contactId: string): Promise<HttpResponse>;
    /**
     * Method to subscribe to event hub for the event not coming fromm web socket
     * @returns
     * @example -
    */
    subscribeToEventHub(relationObjectId: string, subscriptionType?: string): Promise<HttpResponse>;
    /**
     * Method to get quick replies data
     * @param contactId - Contact Id of the digital contact
     * @param page - start index for pagination
     * @param size - total records to be fetched
     * @param search - This is content or title to be searched
     * @returns - return the list of Quick replies
     * @example
     * ```
     * getQuickReplies('234567', 1, 10, '')
     * ```
    */
    getQuickReplies(contactId: string, page?: number, size?: number | string, // This is a temporary solution and needs to be handled properly using server side pagination.
    search?: string): Promise<Array<CXoneDigitalQuickReply>>;
    /**
     * Method to get quick responses for outbound data
     * @param page - start index for pagination
     * @param size - total records to be fetched
     * @param search - This is content or title to be searched
     * @returns - return the list of Quick replies
     * @example
     * ```
     * getQuickRepliesForOutboundContact(1, 10, '')
     * ```
    */
    getQuickRepliesForOutboundContact(page?: number, channelId?: string, size?: number | string, // This is a temporary solution and needs to be handled properly using server side pagination.
    search?: string): Promise<CXoneDigitalOutboundQuickReply>;
    /**
     * Method to get DFO chat replace variables
     * @param contactId - Contact Id of the digital contact
     * @param quickReplyId - Unique identification for quick reply
     * @returns - return the content of replace variable
     * @example
     * ```
     * getReplaceVariables('234567', 44)
     * ```
    */
    getReplaceVariables(contactId: string, quickReplyId: string): Promise<CXoneDigitalReplaceVariables>;
    /**
     * Method to get digital contact quick reply replace variables
     * @param quickReplyId - Unique identification for quick reply
     * @returns - return the content of replace variable
     * @example
     * ```
     * getReplaceQuickResponseVariables(44)
     * ```
    */
    getReplaceQuickResponseVariables(quickReplyId: string): Promise<CXoneDigitalReplaceVariables>;
    /**
     * Method to upload attachment to s3 bucket for digital contact
     * @returns
     * @example -
    */
    uploadAttachment(uploadDetails: CXoneFileUploadRequest): Promise<HttpResponse>;
    /**
     * Method to get whole message content with html formatting
     * @param messageId - message id of the message
     * @returns - detailed message response
     * @example - getMessageById
    */
    getMessageById(messageId: string): Promise<HttpResponse>;
    /**
     * Method to delete a message - argument - messageId
     * @param messageId - message id of the message
     * @returns response - Delete API
     * @example - deleteMessage(messageId)
    */
    deleteMessage(messageId: string): Promise<HttpResponse>;
    /**
     * Method to hide/unhide whole message
     * @param messageId - message id of the message
     * @returns - detailed message response
     * @example - hideUnhideMessage
     */
    hideUnhideMessage(messageData: {
        msgId: string;
        isHidden: boolean;
    }): Promise<HttpResponse>;
    /**
     * Method to createDraftMessage
     * @param contactId -
     * @param draftMessage -
     * @returns response from API
     * @example
    */
    createDraftMessage(draftMessage: CXoneDigitalCreateDraftRequest, contactId: string): Promise<HttpResponse>;
    /**
     * Method to updateDraftMessage
     * @param contactId -
     * @param draftMessage -
     * @returns response from API
     * @example
    */
    updateDraftMessage(draftMessage: CXoneDigitalUpdateDraftRequest, contactId: string, messageDraftId: string): Promise<HttpResponse>;
    /**
     * Method to deleteDraftMessage
     * @param contactId -
     * @param draftMessage -
     * @returns response from API
     * @example
    */
    deleteDraftMessage(contactId: string, messageDraftId: string): Promise<HttpResponse>;
    /**
     * Method to approveDraftMessage
     * @param contactId -
     * @param draftMessage -
     * @returns response from API
     * @example
    */
    approveDraftMessage(contactId: string, messageDraftId: string): Promise<HttpResponse>;
    /**
     * Method to refuseDraftMessage
     * @param contactId - contact Id
     * @param messageDraftId - draft message id
     * @returns response from API
     * @example
    */
    refuseDraftMessage(contactId: string, messageDraftId: string): Promise<HttpResponse>;
    /**
     * Method to focus a digital contact
     * @param messageId - case id of the selected digital contact
     * @returns response - Focus POST API
     * @example - focusContact(caseId)
    */
    focusContact(contactId: string): Promise<HttpResponse>;
    /**
     * Method to de-focus a digital contact
     * @returns response - Focus DEL API
     * @example - deFocusContact()
    */
    deFocusContact(contactIdToDefocus: string): Promise<HttpResponse>;
    /**
     * Method to mark a digital case as read when it is focused
     * @returns response - whether the isRead field was successfully updated or not
     * @example - markMessageAsRead(messageId)
     */
    updateMessageReadStatus(messageId: string): Promise<unknown>;
    /**
     * Method to fetch previous and next related cases of current digital contact
     * @param contactId - Contact Id of the digital contact
     * @returns
     * @example - loadPreviousNextCases('2345678')
    */
    loadPreviousNextCases(contactId: string): Promise<HttpResponse>;
    /**
     * Method to get history data for a case interaction
     * @param contactId - Contact Id of the digital contact
     * @param pageNumber - page number
     * @param pageSize - page Size
     * @returns - returns the history object with events
     * @example
     * ```
     * getCaseHistory('12345',1,10)
     * ```
     */
    getCaseHistory(contactId: string, pageNumber: number, pageSize: number): Promise<unknown>;
    /**
     * Method to get digital contact's quick response replace variables when hasVariables flag comes as true
     * @param quickReplyId - Unique identification of current quick response
     * @param externalVariables - for Rich or Dynamic type QRs (Secure Form comes with []), variable values passed with digital contact id
     * @returns - return the content of replace variables of quick response
     * @example - fetchQuickResponseReplaceVariable('12ynj23', \{contact: \{contactNumber: '12345'\}, externalVariables: []\})
     */
    fetchQuickResponseReplaceVariable(quickResponseId: string, digitalContactVariableDetails: CXoneQuickReplyReplaceVariableRequest): Promise<HttpResponse>;
    /**
     * Method to get traceId from response headers
     * @param response - HttpResponse object
     * @example - getTraceIdFromResponseHeader(response)
     * @returns - traceId string or empty string if not found
     */
    getTraceIdFromResponseHeader(response: HttpResponse): string;
}
