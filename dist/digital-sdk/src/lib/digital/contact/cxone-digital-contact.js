import { __awaiter } from "tslib";
import { Logger } from '@nice-devone/core-sdk';
import { CXoneSdkError, CXoneFileUploadResponseSchema, CXoneDigitalEventType, CXoneContactDetailsSchema, CXoneLoadPreviousContactDetailsSchema, CXoneSdkErrorType, CXonePreviousNextContactSchema, } from '@nice-devone/common-sdk';
import { CXoneUser } from '@nice-devone/auth-sdk';
import { DigitalContactService } from '../service/digital-contact-service';
import { CXoneContact, ContactType } from '@nice-devone/agent-sdk';
/**
 * Class containing properties and methods related to a digital contact
 */
export class CXoneDigitalContact extends CXoneContact {
    /**
     * get instance for DigitalContactService
     * @example
     * ```
     * this.digitalContactService = new DigitalContactService();
     * ```
     */
    constructor() {
        super();
        this.logger = new Logger('SDK', 'CXoneDigitalContact');
        /**
         * @remarks - this will use to store list of all messages related to current case from MessageAddedIntoCase WS event
         */
        this.messages = [];
        /**
         * @remarks - this will use to store list of all draft messages related to current case from MessageAddedIntoCase WS event
         */
        this.messageDrafts = [];
        /**
          * @remarks - URL to jump to origin of message and case
        */
        this.originURL = '';
        /**
          * @remarks - stores coBrowse status
          */
        this.isCoBrowseEnabled = false;
        this.digitalContactService = new DigitalContactService();
    }
    /**
     * @example
     */
    getDigitalContact(contact) {
        this.refusalTimeOut = contact.refusalTimeout;
        this.skill = contact.skill;
        this.caseId = contact.digitalCaseId;
        this.channelType = contact.channelType;
        this.customerName = contact.customerName;
        this.contactID = contact.contactId;
        this.startTime = contact.startTime;
        this.status = contact.status;
        this.type = contact.type;
        this.requireDisposition = false;
        return this;
    }
    /**
    * Method to change Digital Contact Status
    * @returns
    * ```
    * @example
    * changeStatus()
    * ```
    */
    changeStatus(status) {
        return new Promise((resolve, reject) => {
            this.digitalContactService.changeCustomerContactStatus(this.caseId, status).then((resp) => {
                const caseStatusResponse = resp;
                this.logger.info('changeStatus', 'Case Status Change success ' + JSON.stringify(caseStatusResponse));
                resolve(caseStatusResponse);
            }, (error) => {
                this.logger.error('changeStatus', 'Case Status Change failed ' + JSON.stringify(error));
                reject(error);
            });
        });
    }
    /**
     * Method to unassign customer contact
     * @returns - returns customer contact unassigned response
     * ```
     * @example
     * unassign()
     * ```
    */
    unassign() {
        return new Promise((resolve, reject) => {
            this.digitalContactService.unassignCustomerContact(this.caseId).then((responseData) => {
                this.logger.info('unassign', 'Case unassign success ' + JSON.stringify(responseData));
                resolve(responseData);
            }, (error) => {
                this.logger.error('unassign', 'Case unassign failed ' + error.toString());
                reject(error);
            });
        });
    }
    /**
     * Method to change routing queue
     * @returns - returns customer contact assignment to routing queue response
     * ```
     * @example
     * changeRoutingQueue()
     * ```
    */
    changeRoutingQueue(skillId) {
        return new Promise((resolve, reject) => {
            this.digitalContactService.changeRoutingQueue(this.caseId, skillId).then((responseData) => {
                this.logger.info('changeRoutingQueue', 'Change contact routing queue successful' + JSON.stringify(responseData));
                resolve(responseData);
            }, (error) => {
                this.logger.error('changeRoutingQueue', 'Change contact routing queue failed ' + JSON.stringify(error));
                reject(error);
            });
        });
    }
    /**
     * Method to change User
     * @returns - returns customer contact assignment to user response
     * ```
     * @example
     * changeUser()
     * ```
    */
    changeUser(cxoneUserId) {
        return new Promise((resolve, reject) => {
            this.digitalContactService.changeAssignedUser(this.caseId, cxoneUserId).then((responseData) => {
                this.logger.info('changeUser', 'Change contact user successful' + JSON.stringify(responseData));
                resolve(responseData);
            }, (error) => {
                this.logger.error('changeUser', 'Change contact user failed ' + JSON.stringify(error));
                reject(error);
            });
        });
    }
    /**
     * Method to send reply
     * @returns - returns the send reply response
     * @example
     *  TODO: This method signature should receive object from map
     * need to update this method after websocket implementation
     *
     */
    reply(cxOneDigitalReplyRequest, channelId, traceId) {
        return new Promise((resolve, reject) => {
            this.digitalContactService
                .postOutboundReply(cxOneDigitalReplyRequest, channelId, traceId)
                .then((response) => {
                const sendReplyResponse = response;
                this.logger.info('sendReply', 'sendReply success ' + response.toString());
                resolve(sendReplyResponse);
            }, (error) => {
                this.logger.error('sendReply', 'sendReply failed ' + error.toString());
                reject(error);
            });
        });
    }
    /**
       * Method to upload digital channel attachment
       * @returns - returns s3 bucket URL in Response
       * ```
       * @example
       * upload() takes CXoneFileUploadRequest as parameter for uploading file to s3 bucket
       * ```
    */
    upload(uploadDetails, uId) {
        return new Promise((resolve, reject) => {
            this.digitalContactService.uploadAttachment(uploadDetails).then((response) => {
                const uploadResponse = JSON.parse(JSON.stringify(response));
                uploadResponse['uId'] = uId;
                const parsedUploadResponse = CXoneFileUploadResponseSchema.validateSync(uploadResponse);
                this.logger.info('upload', 'Upload attachment success ' + JSON.stringify(parsedUploadResponse));
                resolve(parsedUploadResponse);
            }, (error) => {
                this.logger.error('upload', 'Upload attachment failed ' + JSON.stringify(error));
                reject(error);
            });
        });
    }
    /**
     * Method to parse web socket event response
     * @returns - parsed response based on predefined schema
     * @example
     */
    parse(validatedResponse) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8;
        return __awaiter(this, void 0, void 0, function* () {
            if (validatedResponse) {
                const { data } = validatedResponse;
                const receivedEventData = {
                    eventId: validatedResponse.eventId,
                    eventObject: validatedResponse.eventObject,
                    eventType: validatedResponse.eventType,
                };
                this.eventDetails = receivedEventData;
                this.case = data === null || data === void 0 ? void 0 : data.case;
                this.channel = data === null || data === void 0 ? void 0 : data.channel;
                this.caseId = (_a = data === null || data === void 0 ? void 0 : data.case) === null || _a === void 0 ? void 0 : _a.id;
                this.inboxAssignee = (_b = data === null || data === void 0 ? void 0 : data.case) === null || _b === void 0 ? void 0 : _b.inboxAssigneeUser;
                this.isAssignedToAgentInbox = data === null || data === void 0 ? void 0 : data.isAssignedToAgentInbox;
                if (data === null || data === void 0 ? void 0 : data.routingQueue) {
                    this.routingQueue = data === null || data === void 0 ? void 0 : data.routingQueue;
                }
                if (this.eventDetails.eventType === CXoneDigitalEventType.CASE_INBOX_ASSIGNED && !this.channel.isPrivate) {
                    this.publicMessagesParentChildMap = {};
                }
                if (data === null || data === void 0 ? void 0 : data.permissions) {
                    this.userRolePermissions = data === null || data === void 0 ? void 0 : data.permissions;
                }
                if (data === null || data === void 0 ? void 0 : data.replyChannels) {
                    this.replyChannels = data === null || data === void 0 ? void 0 : data.replyChannels;
                }
                if (data === null || data === void 0 ? void 0 : data.message) {
                    // When message content is large '/details' api and websocket strips down html tags,to get original message format 
                    // we need to call this method seprately before publishing the messagge to consumer. change made for AW-4252
                    if ((_c = data === null || data === void 0 ? void 0 : data.message) === null || _c === void 0 ? void 0 : _c.hasAdditionalMessageContent) {
                        data.message = yield this.getSingleMessageAdditionalContent(data === null || data === void 0 ? void 0 : data.message);
                    }
                    data.message['xTraceId'] = validatedResponse.traceId;
                    if (((_d = this.channel) === null || _d === void 0 ? void 0 : _d.hasTreeStructure) && !((_e = data.message) === null || _e === void 0 ? void 0 : _e.replyToMessage)) {
                        this.originURL = data.message.url;
                    }
                    if (((_f = data === null || data === void 0 ? void 0 : data.message) === null || _f === void 0 ? void 0 : _f.direction) === 'inbound') {
                        this.customerMessageUpdatedAt = (_g = data === null || data === void 0 ? void 0 : data.message) === null || _g === void 0 ? void 0 : _g.createdAt;
                    }
                    this.hasUnreadMessage = !((_h = data === null || data === void 0 ? void 0 : data.message) === null || _h === void 0 ? void 0 : _h.isRead);
                    if ((_j = this.messages) === null || _j === void 0 ? void 0 : _j.length) {
                        const matchedMessage = this.messages.findIndex(item => item.id === data.message.id);
                        if (matchedMessage !== -1) {
                            if (this.eventDetails.eventType === CXoneDigitalEventType.MESSAGE_DELIVERY_STATUS_CHANGED ||
                                this.eventDetails.eventType === CXoneDigitalEventType.MESSAGE_SEEN_CHANGED) {
                                this.messages[matchedMessage].delivered = data.message.delivered;
                                this.messages[matchedMessage].customerStatistics = data.message.customerStatistics;
                            }
                            else if (((_k = this.messages[matchedMessage].tags) === null || _k === void 0 ? void 0 : _k.length) !== data.message.tags.length) {
                                this.messages[matchedMessage].tags = data.message.tags.slice(0);
                            }
                        }
                        else {
                            (_l = this.messages) === null || _l === void 0 ? void 0 : _l.push(data.message);
                        }
                    }
                }
                // In case of user-slots api on login we get the previous messages directly in messages array
                // as result of /dfo/3.0/contacts/<contactID>/detail response
                if (data === null || data === void 0 ? void 0 : data.messages) {
                    // When message content is large '/details' api and websocket strips down html tags,to get original message format 
                    // we need to call this method separately before publishing the message to consumer. change made for AW-4252
                    data.messages = yield this.checkForAdditionalMessageContent(data === null || data === void 0 ? void 0 : data.messages);
                    const messages = data.messages.map((message) => {
                        var _a;
                        if (((_a = this.channel) === null || _a === void 0 ? void 0 : _a.hasTreeStructure) && !(message === null || message === void 0 ? void 0 : message.replyToMessage)) {
                            this.originURL = message.url ? message.url : '';
                        }
                        if ((message === null || message === void 0 ? void 0 : message.direction) === 'inbound') {
                            this.customerMessageUpdatedAt = new Date(message === null || message === void 0 ? void 0 : message.createdAt);
                        }
                        return Object.assign(Object.assign({}, message), { messageNotes: [...(data.messageNotes || []).filter((msgNote) => msgNote.message.id === message.id)] });
                    });
                    // Assign value true if at least one message is unread in case
                    this.hasUnreadMessage = (_m = data === null || data === void 0 ? void 0 : data.messages) === null || _m === void 0 ? void 0 : _m.some((msg) => !msg.isRead);
                    this.messages = messages;
                }
                this.isCaseAssigned = ((_o = this.case) === null || _o === void 0 ? void 0 : _o.inboxAssignee) && (((_q = (_p = this.case) === null || _p === void 0 ? void 0 : _p.inboxAssigneeUser) === null || _q === void 0 ? void 0 : _q.incontactId) === ((_s = (_r = CXoneUser === null || CXoneUser === void 0 ? void 0 : CXoneUser.instance) === null || _r === void 0 ? void 0 : _r.getUserInfo()) === null || _s === void 0 ? void 0 : _s.userId)) ? true : false;
                this.type = ContactType.DIGITAL_CONTACT;
                this.interactionId = (_t = data === null || data === void 0 ? void 0 : data.case) === null || _t === void 0 ? void 0 : _t.interactionId;
                this.channelType = (_u = data === null || data === void 0 ? void 0 : data.channel) === null || _u === void 0 ? void 0 : _u.realExternalPlatformId;
                this.customerName = ((_v = data === null || data === void 0 ? void 0 : data.case) === null || _v === void 0 ? void 0 : _v.direction) === 'outbound' ? ((_y = (_x = (_w = data === null || data === void 0 ? void 0 : data.case) === null || _w === void 0 ? void 0 : _w.authorEndUserIdentity) === null || _x === void 0 ? void 0 : _x.fullName) !== null && _y !== void 0 ? _y : (((_z = data === null || data === void 0 ? void 0 : data.channel) === null || _z === void 0 ? void 0 : _z.name) || ((_0 = data === null || data === void 0 ? void 0 : data.channel) === null || _0 === void 0 ? void 0 : _0.idOnExternalPlatform))) : (_2 = (_1 = data === null || data === void 0 ? void 0 : data.case) === null || _1 === void 0 ? void 0 : _1.authorEndUserIdentity) === null || _2 === void 0 ? void 0 : _2.fullName;
                this.skill = (_3 = data === null || data === void 0 ? void 0 : data.routingQueue) === null || _3 === void 0 ? void 0 : _3.name;
                this.status = (_4 = data === null || data === void 0 ? void 0 : data.case) === null || _4 === void 0 ? void 0 : _4.status;
                this.startTime = (_5 = data === null || data === void 0 ? void 0 : data.case) === null || _5 === void 0 ? void 0 : _5.createdAt;
                if (data === null || data === void 0 ? void 0 : data.messageDrafts) {
                    this.messageDrafts = data === null || data === void 0 ? void 0 : data.messageDrafts;
                }
                if (data === null || data === void 0 ? void 0 : data.messageNote) {
                    switch (validatedResponse.eventType) {
                        case CXoneDigitalEventType.MESSAGE_NOTE_CREATED:
                            this.messages = (_6 = this.messages) === null || _6 === void 0 ? void 0 : _6.map(message => message.id === (data === null || data === void 0 ? void 0 : data.messageNote.message.id)
                                ? Object.assign(Object.assign({}, message), { messageNotes: [...(message.messageNotes || []), data === null || data === void 0 ? void 0 : data.messageNote] }) : Object.assign({}, message));
                            break;
                        case CXoneDigitalEventType.MESSAGE_NOTE_DELETED:
                            this.messages = (_7 = this.messages) === null || _7 === void 0 ? void 0 : _7.map(message => message.id === (data === null || data === void 0 ? void 0 : data.messageNote.message.id)
                                ? Object.assign(Object.assign({}, message), { messageNotes: (((message === null || message === void 0 ? void 0 : message.messageNotes) || []).filter((msgNote) => { var _a; return msgNote.id !== ((_a = data === null || data === void 0 ? void 0 : data.messageNote) === null || _a === void 0 ? void 0 : _a.id); })) }) : Object.assign({}, message));
                            break;
                        case CXoneDigitalEventType.MESSAGE_NOTE_UPDATED:
                            this.messages = (_8 = this.messages) === null || _8 === void 0 ? void 0 : _8.map(message => message.id === (data === null || data === void 0 ? void 0 : data.messageNote.message.id)
                                ? Object.assign(Object.assign({}, message), { messageNotes: (((message === null || message === void 0 ? void 0 : message.messageNotes) || []).map((msgNote) => { var _a; return msgNote.id === ((_a = data === null || data === void 0 ? void 0 : data.messageNote) === null || _a === void 0 ? void 0 : _a.id) ? data.messageNote : msgNote; })) }) : Object.assign({}, message));
                            break;
                        default: break;
                    }
                }
                if (data === null || data === void 0 ? void 0 : data.customerContactCustomFieldDefinitions) {
                    this.contactCustomFieldDefs = data === null || data === void 0 ? void 0 : data.customerContactCustomFieldDefinitions;
                }
            }
        });
    }
    /**
     * Method to get additional message content for single message in case of websocket response
     * @returns - complete message content with html tags
     * ```
     * @example
     * getSingleMessageAdditionalContent()
     * ```
     */
    getSingleMessageAdditionalContent(inputMessage) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.getAdditionalMessageContent(inputMessage === null || inputMessage === void 0 ? void 0 : inputMessage.id).then((additionalMessageContent) => {
                    var _a, _b;
                    inputMessage.messageContent.text = (_b = (_a = additionalMessageContent === null || additionalMessageContent === void 0 ? void 0 : additionalMessageContent.data) === null || _a === void 0 ? void 0 : _a.messageContent) === null || _b === void 0 ? void 0 : _b.text;
                    resolve(inputMessage);
                }).catch((error) => {
                    this.logger.error('getSingleMessageAdditionalContent', 'Unable to fetch SingleMessageAdditionalContent ' + JSON.stringify(error));
                    // if any error occurs reject with original message content.
                    reject(inputMessage);
                });
            });
        });
    }
    /**
     * Method to check if messages has additional content
     * @returns - complete message content with html tags
     * ```
     * @example
     * checkForAdditionalMessageContent()
     * ```
     */
    checkForAdditionalMessageContent(inputMessages) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                try {
                    // filter those messages having hasAdditionalMessageContent flag true
                    const messagesWithAdditionalContent = inputMessages === null || inputMessages === void 0 ? void 0 : inputMessages.filter((currentMessage) => currentMessage.hasAdditionalMessageContent);
                    if (messagesWithAdditionalContent) {
                        Promise.allSettled(messagesWithAdditionalContent.map((message) => this.getAdditionalMessageContent(message.id))).then((additionalMessageContentResponse) => {
                            Promise.allSettled(additionalMessageContentResponse.map((request) => { var _a, _b; return ((_a = request === null || request === void 0 ? void 0 : request.value) === null || _a === void 0 ? void 0 : _a.status) === 200 && ((_b = request === null || request === void 0 ? void 0 : request.value) === null || _b === void 0 ? void 0 : _b.data); })).then((finalResponse) => {
                                // get all promise result into final array
                                const finalMessageResponseArray = finalResponse;
                                // map messages from above result with original input message and replace text
                                finalMessageResponseArray.map((data) => {
                                    inputMessages === null || inputMessages === void 0 ? void 0 : inputMessages.map((inputData) => {
                                        var _a, _b;
                                        if (((_a = data === null || data === void 0 ? void 0 : data.value) === null || _a === void 0 ? void 0 : _a.id) === (inputData === null || inputData === void 0 ? void 0 : inputData.id)) {
                                            inputData.messageContent.text = (_b = data === null || data === void 0 ? void 0 : data.value.messageContent) === null || _b === void 0 ? void 0 : _b.text;
                                        }
                                    });
                                });
                                resolve(inputMessages);
                            });
                        });
                    }
                }
                catch (error) {
                    this.logger.error('checkForAdditionalMessageContent', 'Unable to fetch additionalMessageContent ' + JSON.stringify(error));
                    // if any error occurs reject with original message content.
                    reject(inputMessages);
                }
            });
        });
    }
    /**
     * Method to getAdditionalMessageContent
     * @returns - complete message content with html tags
     * ```
     * @example
     * getAdditionalMessageContent()
     * ```
     */
    getAdditionalMessageContent(messageId) {
        return new Promise((resolve, reject) => {
            this.digitalContactService.getMessageById(messageId).then((response) => {
                this.logger.info('getAdditionalMessageContent', 'getAdditionalMessageContent success ' + JSON.stringify(response));
                resolve(response);
            }, (error) => {
                this.logger.error('getAdditionalMessageContent', 'getAdditionalMessageContent failed ' + JSON.stringify(error));
                reject(error);
            });
        });
    }
    /**
     * Method to subscribeToEventHub
     * @returns - returns promise to event hub subscription call
     * ```
     * @example
     * subscribeToEventHub()
     * ```
     */
    subscribeToEventHub() {
        try {
            this.digitalContactService
                .subscribeToEventHub(this.case.id, 'contact')
                .then((responseData) => {
                this.logger.info('subscribeToEventHub', 'Subscription to event hub successful ' + JSON.stringify(responseData));
            }, (error) => {
                this.logger.error('subscribeToEventHub', 'Subscription to event hub failed ' + JSON.stringify(error));
            });
        }
        catch (error) {
            this.logger.error('subscribeToEventHub', 'Subscription to event hub failed ' + JSON.stringify(error));
        }
    }
    /**
     * Method to get quick replies data
     * @example
     * ```
     * getQuickReplies()
     * ```
    */
    getQuickReplies() {
        return this.digitalContactService.getQuickReplies(this.caseId);
    }
    /**
     * Method to replace  quick reply variables
     * @param quickReplyId - Unique identification for quick reply
     * @example
     * ```
     * replaceQuickReplyVariables()
     * ```
    */
    replaceQuickReplyVariables(quickReplyId) {
        return this.digitalContactService.getReplaceVariables(this.caseId, quickReplyId);
    }
    /**
     * Method to delete message
     * @param messageId - MessageID
     * @example
     * ```
     * deleteMessage(messageId)
     * ```
    */
    deleteMessage(messageId) {
        return new Promise((resolve, reject) => {
            this.digitalContactService.deleteMessage(messageId).then((response) => {
                this.logger.info('deleteMessage', 'deleting message success ' + JSON.stringify(response));
                resolve(response);
            }, (error) => {
                this.logger.error('deleteMessage', 'deleting message failed ' + JSON.stringify(error));
                reject(error);
            });
        });
    }
    /**
     * Method to hideMessage
     * @returns - response
     * ```
     * @example
     * hideUnhideMessage()
     * ```
     */
    hideUnhideMessage(messageData) {
        return new Promise((resolve, reject) => {
            this.digitalContactService.hideUnhideMessage(messageData).then((response) => {
                this.logger.info('hideMessage', 'hiding message success ' + JSON.stringify(response));
                resolve(response);
            }, (error) => {
                this.logger.error('hideMessage', 'message Hiding failed ' + JSON.stringify(error));
                reject(error);
            });
        });
    }
    /**
     * Method to createDraftMessage
     * @returns - promise HttpResponce/error
     * ```
     * @example
     * createDraftMessage(msg)
     * ```
     */
    createDraftMessage(draftMessage) {
        return new Promise((resolve, reject) => {
            this.digitalContactService.createDraftMessage(draftMessage, this.caseId).then((response) => {
                this.logger.info('createDraftMessage', 'create draft message success ' + JSON.stringify(response));
                resolve(response);
            }, (error) => {
                this.logger.error('createDraftMessage', 'create draft message  failed ' + JSON.stringify(error));
                reject(error);
            });
        });
    }
    /**
     * Method to updateDraftMessage
     * @returns - promise HttpResponce/error
     * ```
     * @example
     * updateDraftMessage(msg, id)
     * ```
     */
    updateDraftMessage(draftMessage, draftMessageId) {
        return new Promise((resolve, reject) => {
            this.digitalContactService.updateDraftMessage(draftMessage, this.caseId, draftMessageId).then((response) => {
                this.logger.info('updateDraftMessage', 'update draft message success ' + JSON.stringify(response));
                resolve(response);
            }, (error) => {
                this.logger.error('updateDraftMessage', 'update draft message  failed ' + JSON.stringify(error));
                reject(error);
            });
        });
    }
    /**
     * Method to deleteDraftMessage
     * @returns - promise HttpResponce/error
     * ```
     * @example
     * deleteDraftMessage( id)
     * ```
     */
    deleteDraftMessage(draftMessageId) {
        return new Promise((resolve, reject) => {
            this.digitalContactService.deleteDraftMessage(this.caseId, draftMessageId).then((response) => {
                this.logger.info('deleteDraftMessage', 'delete draft message success ' + JSON.stringify(response));
                resolve(response);
            }, (error) => {
                this.logger.error('deleteDraftMessage', 'delete draft message  failed ' + JSON.stringify(error));
                reject(error);
            });
        });
    }
    /**
     * Method to approveDraftMessage
     * @returns - promise HttpResponce/error
     * ```
     * @example
     * approveDraftMessage( id)
     * ```
     */
    approveDraftMessage(draftMessageId) {
        return new Promise((resolve, reject) => {
            this.digitalContactService.approveDraftMessage(this.caseId, draftMessageId).then((response) => {
                this.logger.info('approveDraftMessage', 'approve draft message success ' + JSON.stringify(response));
                resolve(response);
            }, (error) => {
                this.logger.error('approveDraftMessage', 'approve draft message  failed ' + JSON.stringify(error));
                reject(error);
            });
        });
    }
    /**
     * Method to rejectDraftMessage
     * @returns - promise HttpResponce/error
     * ```
     * @example
     * rejectDraftMessage( id)
     * ```
     */
    rejectDraftMessage(draftMessageId) {
        return new Promise((resolve, reject) => {
            this.digitalContactService.refuseDraftMessage(this.caseId, draftMessageId).then((response) => {
                this.logger.info('refuseDraftMessage', 'refuse draft message success ' + JSON.stringify(response));
                resolve(response);
            }, (error) => {
                this.logger.error('refuseDraftMessage', 'refuse draft message  failed ' + JSON.stringify(error));
                reject(error);
            });
        });
    }
    /**
     * Method to get previous & next case ids of current digital contact
     * @param contactId - Contact Id of the digital contact
     * ```
     * @example
     * loadRelatedDigitalContacts('2345678')
     * ```
    */
    loadRelatedDigitalContacts(contactId) {
        return new Promise((resolve, reject) => {
            // We are fetching previous & next case numbers by calling API below
            this.digitalContactService.loadPreviousNextCases(contactId).then((contactsResponse) => {
                try {
                    this.logger.info('loadRelatedDigitalContacts', 'load previous and next digital contacts success');
                    let previousNextContacts = {};
                    const responseToValidate = contactsResponse === null || contactsResponse === void 0 ? void 0 : contactsResponse.data;
                    previousNextContacts = CXonePreviousNextContactSchema.validateSync(responseToValidate);
                    resolve(previousNextContacts);
                }
                catch (error) {
                    if (error instanceof Error) {
                        const errorResponse = new CXoneSdkError(CXoneSdkErrorType.DATA_VALIDATION_ERROR, 'Validation Error: ' + error.message);
                        this.logger.error('loadRelatedDigitalContacts', errorResponse.toString());
                        reject(errorResponse);
                    }
                }
            }, (error) => {
                this.logger.error('loadRelatedDigitalContacts', 'load previous and next cases failed ' + JSON.stringify(error));
                reject(error);
            });
        });
    }
    /**
     * Method to get conversation history of previous/next contact of current digital contact
     * @param contactId - Contact Id of the digital contact
     * ```
     * @example
     * loadConversationHistory('2345678')
     * ```
    */
    loadConversationHistory(contactId) {
        return new Promise((resolve, reject) => {
            // Here calling details API to get all history of the digital case to display on UI
            this.digitalContactService.getDigitalContactDetails(contactId).then((detailsResponse) => {
                try {
                    this.logger.info('loadConversationHistory', 'Previous and Next conversation history fetch success');
                    const contactDetails = detailsResponse === null || detailsResponse === void 0 ? void 0 : detailsResponse.data;
                    let validatedContactDetails = {};
                    const validateResult = CXoneContactDetailsSchema.validateSync(contactDetails, { stripUnknown: true });
                    validatedContactDetails = CXoneLoadPreviousContactDetailsSchema.cast(validateResult);
                    resolve(validatedContactDetails);
                }
                catch (error) {
                    if (error instanceof Error) {
                        const errorResponse = new CXoneSdkError(CXoneSdkErrorType.DATA_VALIDATION_ERROR, 'Validation Error: ' + error.message);
                        this.logger.error('loadConversationHistory', errorResponse.toString());
                        reject(errorResponse);
                    }
                }
            }, (error) => {
                this.logger.error('loadConversationHistory', 'Previous and Next conversation history fetch failed ' + JSON.stringify(error));
                reject(error);
            });
        });
    }
}
//# sourceMappingURL=cxone-digital-contact.js.map