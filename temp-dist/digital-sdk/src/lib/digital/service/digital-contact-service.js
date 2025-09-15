import { BulkReplyHistoryResponse, BulkReplyResponse, CcfLogger } from '@nice-devone/agent-sdk';
import { CXoneAuth } from '@nice-devone/auth-sdk';
import { CXoneSdkError, CXoneSdkErrorType, } from '@nice-devone/common-sdk';
import { HttpUtilService, HttpClient, ApiUriConstants, UrlUtilsService, AdminService, } from '@nice-devone/core-sdk';
/**
 * Class to handle digital contact related API calls
 */
export class DigitalContactService {
    /**
     * @example
     * ```
     * const digitalContactSvc = new DigitalContactService();
     * ```
    */
    constructor() {
        this.logger = new CcfLogger('acd', 'Digital Contact Service');
        this.utilService = new HttpUtilService();
        this.urlUtilsService = new UrlUtilsService();
        this.HIDE_MESSAGE_BY_ID = '/dfo/3.0/messages/{messageId}/hide';
        this.DELETE_MESSAGE_BY_ID = '/dfo/3.0/messages/{messageId}/delete';
        this.RELATED_MESSAGES = '/dfo/3.0/contacts/{contactId}/related-messages';
        this.FOCUS_DEFOCUS_CONTACT = '/dfo/3.0/contacts/{contactId}/focus';
        //API for Aprroval/Reject flow
        this.CREATE_DRAFT_MESSAGE = '/dfo/3.0/contacts/{contactId}/message-drafts';
        this.UPDATE_DRAFT_MESSAGE = '/dfo/3.0/contacts/{contactId}/message-drafts/{messageDraftId}';
        this.DELETE_DRAFT_MESSAGE = '/dfo/3.0/contacts/{contactId}/message-drafts/{messageDraftId}';
        this.APPROVE_DRAFT_MESSAGE = '/dfo/3.0/contacts/{contactId}/message-drafts/{messageDraftId}/approval';
        this.REJECT_DRAFT_MESSAGE = '/dfo/3.0/contacts/{contactId}/message-drafts/{messageDraftId}/refusal';
        // API for immediate previous & next case
        this.LOAD_RELATED_CASES = '/dfo/3.0/contacts/{contactId}/detail/pagination';
        this.DIGITAL_QUICK_REPLIES_OUTBOUND = '/dfo/3.0/quick-responses';
        this.DIGITAL_QR_REPLACE_VARIABLES = '/dfo/3.0/quick-responses/{quickResponseId}/replace-variables'; // TODO: To be replaced by below API facade in future release
        this.QUICK_RESPONSE_REPLACE_VARIABLES = '/rich-message-settings/1.0/quick-responses/{quickResponseId}/replace-variables';
        this.auth = CXoneAuth.instance;
        this.adminService = AdminService.instance;
    }
    /**
     * Method to change status of digital contact
     * @param caseId - Case Id of the digital contact
     * @param status - Status to be set to the digital contact
     * @returns
     * @example -
     */
    changeCustomerContactStatus(caseId, status) {
        const baseUrl = this.auth.getCXoneConfig().dfoApiBaseUri;
        const authToken = this.auth.getAuthToken().accessToken;
        const url = baseUrl + ApiUriConstants.DIGITAL_CONTACT_STATUS.replace('{contactId}', caseId);
        const targetStatus = {
            'status': status,
        };
        const reqInit = {
            headers: this.utilService.initHeader(authToken, 'application/json').headers,
            body: targetStatus,
        };
        return new Promise((resolve, reject) => {
            HttpClient.put(url, reqInit).then((response) => {
                this.logger.info('changeCustomerContactStatus', 'Case Status Changed Success');
                resolve(response);
            }, (error) => {
                const errorResponse = new CXoneSdkError(CXoneSdkErrorType.CXONE_API_ERROR, 'Case status change failed', error);
                this.logger.error('changeCustomerContactStatus', errorResponse.toString());
                reject(errorResponse);
            });
        });
    }
    /**
     * Method to send bulk reply
     * @param selectedContactIds - Selected contact IDs
     * @param messageContent - Message content
     * @param cxoneUserId - Agent ID of logged in user
     * @returns
     * @example - sendBulkReply(['12345'], 'test', '457677')
     */
    sendBulkReply(selectedContactIds, messageContent, cxoneUserId) {
        const baseUrl = this.auth.getCXoneConfig().dfoApiBaseUri;
        const authToken = this.auth.getAuthToken().accessToken;
        const url = baseUrl + ApiUriConstants.DIGITAL_BULK_REPLY;
        const bulkReplyDetails = {
            job: {
                type: 'sendReply',
                parameters: {
                    messageContent: messageContent,
                    messageType: 'TEXT',
                    authorUserId: cxoneUserId,
                },
            },
            contactIds: selectedContactIds,
        };
        const reqInit = {
            headers: this.utilService.initHeader(authToken, 'application/json').headers,
            body: bulkReplyDetails,
        };
        return new Promise((resolve, reject) => {
            HttpClient.post(url, reqInit).then((response) => {
                this.logger.info('sendBulkReply', 'Bulk Reply Send Success' + JSON.stringify(response));
                const bulkReplyResponse = new BulkReplyResponse();
                bulkReplyResponse.parse(response.data);
                resolve(bulkReplyResponse);
            }, (err) => {
                this.logger.error('sendBulkReply', 'Bulk Reply Send Failed' + JSON.stringify(err));
                reject(err);
            });
        });
    }
    /**
     * Method to Get the bulk reply history
     * @returns
     * @example -
     */
    getBulkReplyHistory() {
        const baseUrl = this.auth.getCXoneConfig().dfoApiBaseUri;
        const authToken = this.auth.getAuthToken().accessToken;
        const url = baseUrl + ApiUriConstants.GET_BULK_REPLY_HISTORY;
        const reqInit = this.utilService.initHeader(authToken);
        return new Promise((resolve, reject) => {
            HttpClient.get(url, reqInit).then((response) => {
                this.logger.info('getBulkReplyHistory', 'Bulk Reply History fetched successfully - ' + response.toString());
                const bulkReplyHistory = new BulkReplyHistoryResponse();
                bulkReplyHistory.parse(response.data);
                resolve(bulkReplyHistory);
            }, (error) => {
                this.logger.error('getBulkReplyHistory', 'Bulk Reply History fetch failed - ' + error.toString());
                reject(error);
            });
        });
    }
    /**
     * Method to unassign customer contact
     * @returns
     * @example -
    */
    unassignCustomerContact(contactId) {
        const baseUrl = this.auth.getCXoneConfig().dfoApiBaseUri;
        const authToken = this.auth.getAuthToken().accessToken;
        const url = baseUrl + ApiUriConstants.CUSTOMER_CONTACT_ASSIGNMENT.replace('{contactId}', contactId);
        const reqInit = {
            headers: this.utilService.initHeader(authToken, 'application/json').headers,
        };
        return new Promise((resolve, reject) => {
            HttpClient.delete(url, reqInit).then((response) => {
                this.logger.info('unassignCustomerContact', 'Case unassigned successfully');
                resolve(response);
            }, (error) => {
                const errorResponse = new CXoneSdkError(CXoneSdkErrorType.CXONE_API_ERROR, 'Case unassign failed', error);
                this.logger.error('unassignCustomerContact', errorResponse.toString());
                reject(errorResponse);
            });
        });
    }
    /**
     * Method to assign customer contact to routing queue
     * @param contactId - Contact Id of the digital contact
     * @param skillId - Id of the skill queue where the contact it to be assigned
     * @returns
     * @example -
    */
    changeRoutingQueue(contactId, skillId) {
        const baseUrl = this.auth.getCXoneConfig().dfoApiBaseUri;
        const authToken = this.auth.getAuthToken().accessToken;
        const url = baseUrl + ApiUriConstants.CHANGE_ROUTING_QUEUE.replace('{contactId}', contactId);
        const targetRoutingQueue = {
            'skillId': parseInt(skillId),
        };
        const reqInit = {
            headers: this.utilService.initHeader(authToken, 'application/json').headers,
            body: targetRoutingQueue,
        };
        return new Promise((resolve, reject) => {
            HttpClient.put(url, reqInit).then((response) => {
                this.logger.info('changeRoutingQueue', 'Contact assignment to routing queue successfully');
                resolve(response);
            }, (error) => {
                const errorResponse = new CXoneSdkError(CXoneSdkErrorType.CXONE_API_ERROR, 'Contact assignment to routing queue failed', error);
                this.logger.error('changeRoutingQueue', errorResponse.toString());
                reject(errorResponse);
            });
        });
    }
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
    changeAssignedUser(contactId, cxoneUserId) {
        const baseUrl = this.auth.getCXoneConfig().dfoApiBaseUri;
        const authToken = this.auth.getAuthToken().accessToken;
        const targetUser = { 'inboxAssigneeCxoneId': cxoneUserId };
        const url = baseUrl + ApiUriConstants.CUSTOMER_CONTACT_ASSIGNMENT.replace('{contactId}', contactId);
        const reqInit = {
            headers: this.utilService.initHeader(authToken, 'application/json').headers,
            body: targetUser,
        };
        return new Promise((resolve, reject) => {
            HttpClient.put(url, reqInit).then((response) => {
                this.logger.info('changeAssignedUser', 'Contact assignment to user successfully');
                resolve(response);
            }, (error) => {
                const errorResponse = new CXoneSdkError(CXoneSdkErrorType.CXONE_API_ERROR, 'Contact assignment to user failed', error);
                this.logger.error('changeAssignedUser', errorResponse.toString());
                reject(errorResponse);
            });
        });
    }
    /**
     * Method to send reply
     * @param channelId - channel Id
     * @param sendReplyRequest - message object
     * @param xTraceId - xTraceId to trace the message
     * @returns response from /dfo/3.0/channels/channel_id/outbound API
     * @example postOutboundReply(postOutboundReply, channelId, xTraceId)
    */
    postOutboundReply(sendReplyRequest, channelId, xTraceId) {
        const baseUrl = this.auth.getCXoneConfig().dfoApiBaseUri;
        const authToken = this.auth.getAuthToken().accessToken;
        const url = baseUrl + ApiUriConstants.DIGITAL_SEND_REPLY_URI.replace('{channelId}', channelId);
        const reqInit = {
            headers: this.utilService.initHeader(authToken, 'application/json', "x-message-sender" /* HttpRequestCustomHeaders.X_MESSAGE_SENDER */).headers,
            body: sendReplyRequest,
        };
        // Dev Note: Change added for for visual indicators, Sending xTraceId in outbound API headers
        if (reqInit.headers)
            reqInit.headers.push({ name: 'X-Trace-Id', value: xTraceId });
        return new Promise((resolve, reject) => {
            HttpClient.post(url, reqInit).then((response) => {
                resolve(response);
            }, (error) => {
                const errorResponse = new CXoneSdkError(CXoneSdkErrorType.CXONE_API_ERROR, 'Send reply failed', error);
                this.logger.error('postOutboundReply', errorResponse.toString());
                reject(errorResponse);
            });
        });
    }
    /**
     * Method to get contact details based on user slot API digital contact Id
     * @returns
     * @example -
    */
    getDigitalContactDetails(contactId) {
        const baseUrl = this.auth.getCXoneConfig().dfoApiBaseUri;
        const authToken = this.auth.getAuthToken().accessToken;
        const url = baseUrl + ApiUriConstants.DIGITAL_CONTACT_DETAILS.replace('{contactId}', contactId);
        const reqInit = this.utilService.initHeader(authToken);
        return new Promise((resolve, reject) => {
            HttpClient.get(url, reqInit).then((response) => {
                resolve(response);
            }, (error) => {
                const errorResponse = new CXoneSdkError(CXoneSdkErrorType.CXONE_API_ERROR, 'Contact detail fetch failed', error);
                this.logger.error('getDigitalContactDetails', errorResponse.toString());
                reject(errorResponse);
            });
        });
    }
    /**
     * Method to get all related message threads for a public channel digital contact
     * @returns
     * @example -
    */
    getRelatedMessages(contactId) {
        const baseUrl = this.auth.getCXoneConfig().dfoApiBaseUri;
        const authToken = this.auth.getAuthToken().accessToken;
        const url = baseUrl + this.RELATED_MESSAGES.replace('{contactId}', contactId);
        const reqInit = this.utilService.initHeader(authToken);
        return new Promise((resolve, reject) => {
            HttpClient.get(url, reqInit).then((response) => {
                this.logger.info('getRelatedMessages', 'Related messages fetched successfully');
                resolve(response);
            }, (error) => {
                const errorResponse = new CXoneSdkError(CXoneSdkErrorType.CXONE_API_ERROR, 'Related messages fetch failed', error);
                this.logger.error('getRelatedMessages', errorResponse.toString());
                reject(errorResponse);
            });
        });
    }
    /**
     * Method to subscribe to event hub for the event not coming fromm web socket
     * @returns
     * @example -
    */
    subscribeToEventHub(relationObjectId, subscriptionType = 'contact') {
        const baseUrl = this.auth.getCXoneConfig().dfoApiBaseUri;
        const authToken = this.auth.getAuthToken().accessToken;
        const url = baseUrl + ApiUriConstants.EVENT_HUB_SUBSCRIPTION_URI;
        const body = {
            'relationObjectId': relationObjectId,
            'subscriptionType': subscriptionType,
        };
        const reqInit = {
            headers: this.utilService.initHeader(authToken, 'application/json').headers,
            body: body,
        };
        return new Promise((resolve, reject) => {
            HttpClient.post(url, reqInit).then((response) => {
                const responseData = response.data;
                this.logger.info('subscribeToEventHub', 'Event hub subscription success');
                resolve(responseData);
            }, (error) => {
                const errorResponse = new CXoneSdkError(CXoneSdkErrorType.CXONE_API_ERROR, 'Event hub subscription failed', error);
                this.logger.error('subscribeToEventHub', errorResponse.toString());
                reject(errorResponse);
            });
        });
    }
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
    getQuickReplies(contactId, page = 1, size = 1000, // This is a temporary solution and needs to be handled properly using server side pagination.
    search = '') {
        const baseUrl = this.auth.getCXoneConfig().dfoApiBaseUri;
        const authToken = this.auth.getAuthToken().accessToken;
        const queryParams = { page: page, size: size };
        if (search !== '') {
            queryParams.search = search;
        }
        let url = baseUrl + ApiUriConstants.DIGITAL_QUICK_REPLIES.replace('{contactId}', contactId);
        url = this.urlUtilsService.appendQueryString(url, queryParams);
        const reqInit = this.utilService.initHeader(authToken);
        return new Promise((resolve, reject) => {
            HttpClient.get(url, reqInit).then((response) => {
                const responseData = response.data;
                responseData.page = page;
                responseData.size = size;
                this.logger.info('getQuickReplies', 'Quick replies list fetched successfully');
                resolve(responseData.data);
            }, (error) => {
                const errorResponse = new CXoneSdkError(CXoneSdkErrorType.CXONE_API_ERROR, 'Quick replies fetch failed', error);
                this.logger.error('getQuickReplies', errorResponse.toString());
                reject(errorResponse);
            });
        });
    }
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
    getQuickRepliesForOutboundContact(page = 1, channelId, size = 1000, // This is a temporary solution and needs to be handled properly using server side pagination.
    search = '') {
        const baseUrl = this.auth.getCXoneConfig().dfoApiBaseUri;
        const authToken = this.auth.getAuthToken().accessToken;
        const queryParams = { page: page, size: size };
        if (search !== '') {
            queryParams.search = search;
        }
        let url = baseUrl + this.DIGITAL_QUICK_REPLIES_OUTBOUND;
        url = this.urlUtilsService.appendQueryString(url, queryParams);
        if (channelId) {
            url += `&channelId%5B%5D=${channelId}`;
        }
        const reqInit = this.utilService.initHeader(authToken);
        return new Promise((resolve, reject) => {
            HttpClient.get(url, reqInit).then((response) => {
                const responseData = response.data;
                responseData.page = page;
                responseData.size = size;
                this.logger.info('getQuickRepliesForOutboundContact', 'Quick replies OB list fetched successfully');
                resolve({ allQuickReplies: responseData.data, nextLinks: responseData._links });
            }, (error) => {
                const errorResponse = new CXoneSdkError(CXoneSdkErrorType.CXONE_API_ERROR, 'Quick replies OB fetch failed', error);
                this.logger.error('getQuickRepliesForOutboundContact', errorResponse.toString());
                reject(errorResponse);
            });
        });
    }
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
    getReplaceVariables(contactId, quickReplyId) {
        const baseUrl = this.auth.getCXoneConfig().dfoApiBaseUri;
        const authToken = this.auth.getAuthToken().accessToken;
        const url = baseUrl +
            ApiUriConstants.DIGITAL_REPLACE_VARIABLES.replace('{contactId}', contactId).replace('{quickReplyId}', quickReplyId);
        const reqInit = this.utilService.initHeader(authToken);
        return new Promise((resolve, reject) => {
            HttpClient.post(url, reqInit).then((response) => {
                const responseData = response.data;
                this.logger.info('getReplaceVariables', 'DQRs chat replace variable fetch successfully');
                resolve(responseData);
            }, (error) => {
                const errorResponse = new CXoneSdkError(CXoneSdkErrorType.CXONE_API_ERROR, 'DQRs chat replace variable fetch fetch failed', error);
                this.logger.error('getReplaceVariables', errorResponse.toString());
                reject(errorResponse);
            });
        });
    }
    /**
     * Method to get digital contact quick reply replace variables
     * @param quickReplyId - Unique identification for quick reply
     * @returns - return the content of replace variable
     * @example
     * ```
     * getReplaceQuickResponseVariables(44)
     * ```
    */
    getReplaceQuickResponseVariables(quickReplyId) {
        const baseUrl = this.auth.getCXoneConfig().dfoApiBaseUri;
        const authToken = this.auth.getAuthToken().accessToken;
        const url = baseUrl +
            this.DIGITAL_QR_REPLACE_VARIABLES.replace('{quickResponseId}', quickReplyId);
        const reqInit = this.utilService.initHeader(authToken);
        return new Promise((resolve, reject) => {
            HttpClient.post(url, reqInit).then((response) => {
                const responseData = response.data;
                this.logger.info('getReplaceQuickResponseVariables', 'DQRs chat replace variable fetch successfully');
                resolve(responseData);
            }, (error) => {
                const errorResponse = new CXoneSdkError(CXoneSdkErrorType.CXONE_API_ERROR, 'DQRs chat replace variable fetch failed', error);
                this.logger.error('getReplaceQuickResponseVariables', errorResponse.toString());
                reject(errorResponse);
            });
        });
    }
    /**
     * Method to upload attachment to s3 bucket for digital contact
     * @returns
     * @example -
    */
    uploadAttachment(uploadDetails) {
        const baseUrl = this.auth.getCXoneConfig().dfoApiBaseUri;
        const authToken = this.auth.getAuthToken().accessToken;
        const url = baseUrl + ApiUriConstants.DIGITAL_ATTACHMENT_UPLOAD;
        const reqInit = {
            headers: this.utilService.initHeader(authToken, 'application/json').headers,
            body: uploadDetails,
        };
        return new Promise((resolve, reject) => {
            HttpClient.post(url, reqInit).then((response) => {
                const responseData = response.data;
                this.logger.info('uploadAttachment', 'File uploaded successfully');
                resolve(responseData);
            }, (error) => {
                const errorResponse = new CXoneSdkError(CXoneSdkErrorType.CXONE_API_ERROR, 'File upload failed', error);
                this.logger.error('uploadAttachment', errorResponse.toString());
                reject(errorResponse);
            });
        });
    }
    /**
     * Method to get whole message content with html formatting
     * @param messageId - message id of the message
     * @returns - detailed message response
     * @example - getMessageById
    */
    getMessageById(messageId) {
        const baseUrl = this.auth.getCXoneConfig().dfoApiBaseUri;
        const authToken = this.auth.getAuthToken().accessToken;
        const url = baseUrl + ApiUriConstants.GET_MESSAGE_BY_ID.replace('{messageId}', messageId);
        const reqInit = this.utilService.initHeader(authToken, undefined, "x-message-sender" /* HttpRequestCustomHeaders.X_MESSAGE_SENDER */);
        return new Promise((resolve, reject) => {
            HttpClient.get(url, reqInit).then((response) => {
                this.logger.info('getMessageById ', 'Message detail fetched successfully');
                resolve(response);
            }, (error) => {
                const errorResponse = new CXoneSdkError(CXoneSdkErrorType.CXONE_API_ERROR, 'Message detail fetch failed', error);
                this.logger.error('getMessageById ', errorResponse.toString());
                reject(errorResponse);
            });
        });
    }
    /**
     * Method to delete a message - argument - messageId
     * @param messageId - message id of the message
     * @returns response - Delete API
     * @example - deleteMessage(messageId)
    */
    deleteMessage(messageId) {
        const baseUrl = this.auth.getCXoneConfig().dfoApiBaseUri;
        const authToken = this.auth.getAuthToken().accessToken;
        const url = baseUrl + this.DELETE_MESSAGE_BY_ID.replace('{messageId}', messageId);
        const body = {
            'messageId': messageId,
        };
        const reqInit = {
            headers: this.utilService.initHeader(authToken, 'application/json', "x-message-sender" /* HttpRequestCustomHeaders.X_MESSAGE_SENDER */).headers,
            body: body,
        };
        return new Promise((resolve, reject) => {
            HttpClient.post(url, reqInit).then((response) => {
                const responseData = response.data;
                this.logger.info('deleteMessage', 'Delete message success');
                resolve(responseData);
            }, (error) => {
                const errorResponse = new CXoneSdkError(CXoneSdkErrorType.CXONE_API_ERROR, 'Message delete failed', error);
                this.logger.error('deleteMessage', errorResponse.toString());
                reject(errorResponse);
            });
        });
    }
    /**
     * Method to hide/unhide whole message
     * @param messageId - message id of the message
     * @returns - detailed message response
     * @example - hideUnhideMessage
     */
    hideUnhideMessage(messageData) {
        const baseUrl = this.auth.getCXoneConfig().dfoApiBaseUri;
        const authToken = this.auth.getAuthToken().accessToken;
        const url = baseUrl +
            this.HIDE_MESSAGE_BY_ID.replace('{messageId}', messageData.msgId);
        const reqInit = this.utilService.initHeader(authToken, undefined, "x-message-sender" /* HttpRequestCustomHeaders.X_MESSAGE_SENDER */);
        return new Promise((resolve, reject) => {
            if (!messageData.isHidden) {
                HttpClient.post(url, reqInit).then((response) => {
                    this.logger.info('hideUnhideMessage', 'Message hidden successfully');
                    resolve(response);
                }, (error) => {
                    const errorResponse = new CXoneSdkError(CXoneSdkErrorType.CXONE_API_ERROR, 'Message hide failed', error);
                    this.logger.error('hideUnhideMessage', errorResponse.toString());
                    reject(errorResponse);
                });
            }
            if (messageData.isHidden) {
                HttpClient.delete(url, reqInit).then((response) => {
                    this.logger.info('hideUnhideMessage', 'Message unhidden successfully');
                    resolve(response);
                }, (error) => {
                    const errorResponse = new CXoneSdkError(CXoneSdkErrorType.CXONE_API_ERROR, 'Message unhide failed', error);
                    this.logger.error('hideUnhideMessage', errorResponse.toString());
                    reject(errorResponse);
                });
            }
        });
    }
    /**
     * Method to createDraftMessage
     * @param contactId -
     * @param draftMessage -
     * @returns response from API
     * @example
    */
    createDraftMessage(draftMessage, contactId) {
        const baseUrl = this.auth.getCXoneConfig().dfoApiBaseUri;
        const authToken = this.auth.getAuthToken().accessToken;
        const url = baseUrl + this.CREATE_DRAFT_MESSAGE.replace('{contactId}', contactId);
        const reqInit = {
            headers: this.utilService.initHeader(authToken, 'application/json').headers,
            body: draftMessage,
        };
        return new Promise((resolve, reject) => {
            HttpClient.post(url, reqInit).then((response) => {
                resolve(response);
            }, (error) => {
                const errorResponse = new CXoneSdkError(CXoneSdkErrorType.CXONE_API_ERROR, 'create draft failed', error);
                this.logger.error('createDraftMessage', errorResponse.toString());
                reject(errorResponse);
            });
        });
    }
    /**
     * Method to updateDraftMessage
     * @param contactId -
     * @param draftMessage -
     * @returns response from API
     * @example
    */
    updateDraftMessage(draftMessage, contactId, messageDraftId) {
        const baseUrl = this.auth.getCXoneConfig().dfoApiBaseUri;
        const authToken = this.auth.getAuthToken().accessToken;
        const url = baseUrl + this.UPDATE_DRAFT_MESSAGE.replace('{contactId}', contactId).replace('{messageDraftId}', messageDraftId);
        const reqInit = {
            headers: this.utilService.initHeader(authToken, 'application/json').headers,
            body: draftMessage,
        };
        return new Promise((resolve, reject) => {
            HttpClient.put(url, reqInit).then((response) => {
                resolve(response);
            }, (error) => {
                const errorResponse = new CXoneSdkError(CXoneSdkErrorType.CXONE_API_ERROR, 'update draft failed', error);
                this.logger.error('updateDraftMessage', errorResponse.toString());
                reject(errorResponse);
            });
        });
    }
    /**
     * Method to deleteDraftMessage
     * @param contactId -
     * @param draftMessage -
     * @returns response from API
     * @example
    */
    deleteDraftMessage(contactId, messageDraftId) {
        const baseUrl = this.auth.getCXoneConfig().dfoApiBaseUri;
        const authToken = this.auth.getAuthToken().accessToken;
        const url = baseUrl + this.DELETE_DRAFT_MESSAGE.replace('{contactId}', contactId).replace('{messageDraftId}', messageDraftId);
        const reqInit = {
            headers: this.utilService.initHeader(authToken, 'application/json').headers,
        };
        return new Promise((resolve, reject) => {
            HttpClient.delete(url, reqInit).then((response) => {
                resolve(response);
            }, (error) => {
                const errorResponse = new CXoneSdkError(CXoneSdkErrorType.CXONE_API_ERROR, 'delete draft failed', error);
                this.logger.error('deleteDraftMessage', errorResponse.toString());
                reject(errorResponse);
            });
        });
    }
    /**
     * Method to approveDraftMessage
     * @param contactId -
     * @param draftMessage -
     * @returns response from API
     * @example
    */
    approveDraftMessage(contactId, messageDraftId) {
        const baseUrl = this.auth.getCXoneConfig().dfoApiBaseUri;
        const authToken = this.auth.getAuthToken().accessToken;
        const url = baseUrl + this.APPROVE_DRAFT_MESSAGE.replace('{contactId}', contactId).replace('{messageDraftId}', messageDraftId);
        const reqInit = {
            headers: this.utilService.initHeader(authToken, 'application/json').headers,
        };
        return new Promise((resolve, reject) => {
            HttpClient.post(url, reqInit).then((response) => {
                resolve(response);
            }, (error) => {
                const errorResponse = new CXoneSdkError(CXoneSdkErrorType.CXONE_API_ERROR, 'approve draft failed', error);
                this.logger.error('approveDraftMessage', errorResponse.toString());
                reject(errorResponse);
            });
        });
    }
    /**
     * Method to refuseDraftMessage
     * @param contactId - contact Id
     * @param messageDraftId - draft message id
     * @returns response from API
     * @example
    */
    refuseDraftMessage(contactId, messageDraftId) {
        const baseUrl = this.auth.getCXoneConfig().dfoApiBaseUri;
        const authToken = this.auth.getAuthToken().accessToken;
        const url = baseUrl + this.REJECT_DRAFT_MESSAGE.replace('{contactId}', contactId).replace('{messageDraftId}', messageDraftId);
        const reqInit = {
            headers: this.utilService.initHeader(authToken, 'application/json').headers,
        };
        return new Promise((resolve, reject) => {
            HttpClient.post(url, reqInit).then((response) => {
                this.logger.info('refuseDraftMessage', 'Message Approval Denied successfully');
                resolve(response);
            }, (error) => {
                const errorResponse = new CXoneSdkError(CXoneSdkErrorType.CXONE_API_ERROR, 'reject draft failed', error);
                this.logger.error('refuseDraftMessage', errorResponse.toString());
                reject(errorResponse);
            });
        });
    }
    /**
     * Method to focus a digital contact
     * @param messageId - case id of the selected digital contact
     * @returns response - Focus POST API
     * @example - focusContact(caseId)
    */
    focusContact(contactId) {
        const baseUrl = this.auth.getCXoneConfig().dfoApiBaseUri;
        const authToken = this.auth.getAuthToken().accessToken;
        const url = baseUrl + this.FOCUS_DEFOCUS_CONTACT.replace('{contactId}', contactId);
        const reqInit = {
            headers: this.utilService.initHeader(authToken, 'application/json').headers,
        };
        return new Promise((resolve, reject) => {
            if (contactId) {
                HttpClient.post(url, reqInit).then((response) => {
                    this.logger.info('focusContact', 'Focus digital contact success');
                    resolve(response);
                }, (error) => {
                    const errorResponse = new CXoneSdkError(CXoneSdkErrorType.CXONE_API_ERROR, 'Failed to focus digital contact', error);
                    this.logger.error('focusContact', errorResponse.toString());
                    reject(errorResponse);
                });
            }
            else {
                const errorResponse = new CXoneSdkError(CXoneSdkErrorType.NO_DATA_FOUND, 'contact id not defined for FocusContact');
                this.logger.error('focusContact', errorResponse.toString());
                reject(errorResponse);
            }
        });
    }
    /**
     * Method to de-focus a digital contact
     * @returns response - Focus DEL API
     * @example - deFocusContact()
    */
    deFocusContact(contactIdToDefocus) {
        const baseUrl = this.auth.getCXoneConfig().dfoApiBaseUri;
        const authToken = this.auth.getAuthToken().accessToken;
        const url = baseUrl + this.FOCUS_DEFOCUS_CONTACT.replace('{contactId}', contactIdToDefocus);
        const reqInit = {
            headers: this.utilService.initHeader(authToken, 'application/json').headers,
        };
        return new Promise((resolve, reject) => {
            if (contactIdToDefocus) {
                HttpClient.delete(url, reqInit).then((response) => {
                    this.logger.info('deFocusContact', 'DeFocus digital contact success');
                    resolve(response);
                }, (error) => {
                    const errorResponse = new CXoneSdkError(CXoneSdkErrorType.CXONE_API_ERROR, 'Failed to deFocus digital contact', error);
                    this.logger.error('deFocusContact', errorResponse.toString());
                    reject(errorResponse);
                });
            }
            else {
                const errorResponse = new CXoneSdkError(CXoneSdkErrorType.NO_DATA_FOUND, 'contact id not defined for deFocusContact');
                this.logger.error('deFocusContact', errorResponse.toString());
                reject(errorResponse);
            }
        });
    }
    /**
     * Method to mark a digital case as read when it is focused
     * @returns response - whether the isRead field was successfully updated or not
     * @example - markMessageAsRead(messageId)
     */
    updateMessageReadStatus(messageId) {
        const baseUrl = this.auth.getCXoneConfig().dfoApiBaseUri;
        const authToken = this.auth.getAuthToken().accessToken;
        const url = baseUrl + ApiUriConstants.UPDATE_MESSAGE_READ_STATUS.replace('{messageId}', messageId);
        const reqInit = {
            headers: this.utilService.initHeader(authToken, 'application/json').headers,
            body: { 'isRead': true },
        };
        return new Promise((resolve, reject) => {
            HttpClient.put(url, reqInit).then((response) => {
                this.logger.info('updateMessageReadStatus ', 'Message marked as read successfully');
                resolve(response);
            }, (error) => {
                const errorResponse = new CXoneSdkError(CXoneSdkErrorType.CXONE_API_ERROR, 'Unsuccessful in marking message status as read', error);
                this.logger.error('updateMessageReadStatus', errorResponse.toString());
                reject(errorResponse);
            });
        });
    }
    /**
     * Method to fetch previous and next related cases of current digital contact
     * @param contactId - Contact Id of the digital contact
     * @returns
     * @example - loadPreviousNextCases('2345678')
    */
    loadPreviousNextCases(contactId) {
        const baseUrl = this.auth.getCXoneConfig().dfoApiBaseUri;
        const authToken = this.auth.getAuthToken().accessToken;
        const url = baseUrl + this.LOAD_RELATED_CASES.replace('{contactId}', contactId);
        const reqInit = {
            headers: this.utilService.initHeader(authToken, 'application/json').headers,
        };
        return new Promise((resolve, reject) => {
            HttpClient.get(url, reqInit).then((response) => {
                this.logger.info('loadPreviousNextCases', 'Previous and next contact fetched successfully');
                resolve(response);
            }, (error) => {
                const errorResponse = new CXoneSdkError(CXoneSdkErrorType.CXONE_API_ERROR, 'Previous and next contact fetch failed', error);
                this.logger.error('loadPreviousNextCases', errorResponse.toString());
                reject(errorResponse);
            });
        });
    }
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
    getCaseHistory(contactId, pageNumber, pageSize) {
        const baseUrl = this.auth.getCXoneConfig().dfoApiBaseUri;
        const authToken = this.auth.getAuthToken().accessToken;
        const url = baseUrl + ApiUriConstants.DIGITAL_CASE_HISTORY.replace('{contactId}', contactId).replace('{pageNumber}', pageNumber.toString()).replace('{pageSize}', pageSize.toString());
        const reqInit = this.utilService.initHeader(authToken);
        return new Promise((resolve, reject) => {
            HttpClient.get(url, reqInit).then((response) => {
                const responseData = response;
                this.logger.info('getCaseHistory', 'History fetched successfully - ' + responseData.toString());
                resolve(responseData.data);
            }, (error) => {
                this.logger.error('getCaseHistory', 'History fetch failed - ' + error.toString());
                reject(error);
            });
        });
    }
    /**
     * Method to get digital contact's quick response replace variables when hasVariables flag comes as true
     * @param quickReplyId - Unique identification of current quick response
     * @param externalVariables - for Rich or Dynamic type QRs (Secure Form comes with []), variable values passed with digital contact id
     * @returns - return the content of replace variables of quick response
     * @example - fetchQuickResponseReplaceVariable('12ynj23', \{contact: \{contactNumber: '12345'\}, externalVariables: []\})
     */
    fetchQuickResponseReplaceVariable(quickResponseId, digitalContactVariableDetails) {
        const baseUrl = this.auth.getCXoneConfig().apiFacadeBaseUri;
        const authToken = this.auth.getAuthToken().accessToken;
        const url = baseUrl + this.QUICK_RESPONSE_REPLACE_VARIABLES.replace('{quickResponseId}', quickResponseId);
        const reqInit = {
            headers: this.utilService.initHeader(authToken, 'application/json').headers,
            body: digitalContactVariableDetails,
        };
        return new Promise((resolve, reject) => {
            HttpClient.post(url, reqInit).then((response) => {
                this.logger.info('fetchQuickResponseReplaceVariable', 'Replace variable type QRs fetched successfully');
                resolve(response);
            }, (error) => {
                const errorResponse = new CXoneSdkError(CXoneSdkErrorType.CXONE_API_ERROR, 'Replace variable type QRs fetch failed', error);
                this.logger.error('fetchQuickResponseReplaceVariable', errorResponse.toString());
                reject(errorResponse);
            });
        });
    }
}
//# sourceMappingURL=digital-contact-service.js.map