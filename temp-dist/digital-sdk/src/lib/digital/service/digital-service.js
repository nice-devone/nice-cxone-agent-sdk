import { __awaiter } from "tslib";
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { CcfLogger } from '@nice-devone/agent-sdk';
import { CXoneAuth, CXoneUser } from '@nice-devone/auth-sdk';
import { CXoneSdkError, CXoneDigitalChannelArray, CXoneCaseArray, ReactionType, ExternalPlatformTemplatesResponse, getQueryURLFromObjectKeys, CXoneDigitalContactSearch, CXoneRoutingQueueArray, CXoneSdkErrorType, CXoneDigitalMessageTagArraychema, CXoneDigitalCustomerSearch, CXoneDigitalMessageSearch, CXoneDigitalThreadSearch, CXoneDigitaltranslationApiResponseSchema, getQueryURLForSearchMessagesTab, getQueryURLForSearchThreadsTab, getQueryURLForCustomerTab, UserSlotsSchema, CXoneDigitalEventType, } from '@nice-devone/common-sdk';
import { HttpUtilService, HttpClient, ApiUriConstants, LocalStorageHelper, StorageKeys, dbInstance, IndexDBStoreNames, IndexDBKeyNames, clearIndexDbStore, UrlUtilsService, } from '@nice-devone/core-sdk';
import { DigitalContactService } from './digital-contact-service';
import { CXoneDigitalUtil } from '../util/cxone-digital-util';
/**
 * Service to handle generic digital API calls
 */
export class DigitalService {
    /**
     * @example
     * ```
     * const digitalSvc = new DigitalService();
     * ```
     */
    constructor() {
        this.logger = new CcfLogger('acd', 'Digital Service');
        this.utilService = new HttpUtilService();
        this.urlUtilsService = new UrlUtilsService();
        this.UPDATE_MESSAGE_REACTION = '/dfo/3.0/messages/{messageId}/react/{reactionType}';
        this.UPDATE_CASE_CUSTOM_FIELD = '/dfo/3.0/contacts/{caseId}/custom-fields';
        this.EXTERNAL_PLATFORM_TEMPLATE_URI = '/dfo/3.0/channels/{channelId}/external-platform-templates';
        // default routing queue response is of 50 records therfore we need to pass size of 500 in url
        this.ROUTING_QUEUES_URI = '/dfo/3.0/routing-queues?size=500';
        //URIs for secure forms get & post menthods (Get method to be used for rich text & future quick replies too)
        this.FORM_SUBMISSION = '/dfo/3.0/forms/{formId}/form-submission';
        this.QUICK_RESPONSES = '/rich-message-settings/1.0/quick-responses';
        // URIs for DFO Interaction Search features
        this.GET_CUSTOMER_DETAILS = '/dfo/3.0/customers';
        this.GET_MESSAGES_LIST = '/dfo/3.0/messages';
        this.GET_THREADS_LIST = '/dfo/3.0/threads';
        this.DELETE_MESSAGE_AUTHOR_NAME = '/dfo/3.0/messages/{messageId}/author-name-removal';
        this.DELETE_MESSAGE_CONTENT = '/dfo/3.0/messages/{messageId}/content-removal';
        this.ERASE_MESSAGE_AUTHOR_NAME = '/internal/2.0/frontend-app-state?nodesToFetch=configurationEnvironment';
        this.TYPING_INDICATOR_FOR_PATRON = '/dfo/3.0/channels/{channelId}/threads/{threadIdOnExternalPlatform}/sender-actions';
        this.GET_DIGITAL_WEBSOCKET_URL = '/dfo/3.0/event-hub-url'; // New Cell based DFO Architecture needs us to use this API for getting WS URL
        this.MARK_QUICK_RESPONSE_AS_FAVORITE = '/rich-message-settings/1.0/quick-responses/{quickResponseId}/favorite';
        this.digitalContactService = new DigitalContactService();
        /**
         * Method to get available languages for translation
         * @returns - languages
         * @param none -
         * @example -
         * ```
         * getDigitalAvailableLanguagesForTranslation();
         * ```
         */
        this.getDigitalAvailableLanguagesForTranslation = () => __awaiter(this, void 0, void 0, function* () {
            const baseUrl = this.auth.getCXoneConfig().dfoApiBaseUri;
            const authToken = this.auth.getAuthToken().accessToken;
            const url = baseUrl + ApiUriConstants.DIGITAL_TRANSLATION_AVAILABLE_LANGUAGES;
            const reqInit = this.utilService.initHeader(authToken);
            return new Promise((resolve, reject) => {
                if (this.cachedLanguageTranslations) {
                    resolve(this.cachedLanguageTranslations);
                }
                else {
                    HttpClient.get(url, reqInit).then((response) => __awaiter(this, void 0, void 0, function* () {
                        try {
                            if (response.status > 202) {
                                throw new Error('api ' + url + ' failure');
                            }
                            this.cachedLanguageTranslations = response.data;
                            resolve(this.cachedLanguageTranslations);
                        }
                        catch (error) {
                            reject(error);
                        }
                    }), (error) => {
                        reject(error);
                    });
                }
            });
        });
        /* Method to get translated message
         * @returns - translated messages
         * @param messages -
         * @example -
         * ```
         * translatedMessage(messages);
         * ```
         */
        this.translateMessages = (messages, timeoutInMs) => __awaiter(this, void 0, void 0, function* () {
            const baseUrl = this.auth.getCXoneConfig().dfoApiBaseUri;
            const authToken = this.auth.getAuthToken().accessToken;
            let url = baseUrl + ApiUriConstants.DIGITAL_MESSAGE_TRANSLATION;
            if (timeoutInMs)
                url += '?options.timeout=' + timeoutInMs;
            const reqInit = {
                headers: this.utilService.initHeader(authToken, 'application/json').headers,
                body: messages,
            };
            return new Promise((resolve, reject) => {
                HttpClient.post(url, reqInit).then((response) => __awaiter(this, void 0, void 0, function* () {
                    try {
                        if (response.status > 202) {
                            throw new Error('api ' + url + ' failure');
                        }
                        else if (response.status === 200) {
                            CXoneDigitaltranslationApiResponseSchema.validate(response.data);
                            const translatedText = CXoneDigitaltranslationApiResponseSchema.cast(response.data);
                            resolve(translatedText);
                        }
                    }
                    catch (error) {
                        reject(error);
                    }
                }), (error) => {
                    reject(error);
                });
            });
        });
        this.auth = CXoneAuth.instance;
        this.cachedLanguageTranslations = undefined;
    }
    /**
     * Method to get all digital channels
     * @returns - Map of all digital channels
     * @example - getAllChannels(true)
     */
    getAllChannels(forceFetch) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield dbInstance();
            const allChannelsFromIndexedDB = yield (db === null || db === void 0 ? void 0 : db.get(IndexDBStoreNames.DIGITAL, IndexDBKeyNames.ALL_CHANNELS));
            if (allChannelsFromIndexedDB && !forceFetch)
                return allChannelsFromIndexedDB;
            const baseUrl = this.auth.getCXoneConfig().dfoApiBaseUri;
            const authToken = this.auth.getAuthToken().accessToken;
            const url = baseUrl + ApiUriConstants.DIGITAL_CHANNELS_LIST + '?includeDeleted=1&orderBy=name&order=asc';
            const reqInit = this.utilService.initHeader(authToken, undefined, "x-message-sender" /* HttpRequestCustomHeaders.X_MESSAGE_SENDER */);
            return new Promise((resolve, reject) => {
                HttpClient.get(url, reqInit).then((response) => __awaiter(this, void 0, void 0, function* () {
                    const responseData = response.data;
                    const parsedResponseData = CXoneDigitalChannelArray.validateSync(responseData, {
                        stripUnknown: true,
                    });
                    // save channels map into indexedb
                    const allChannelsMap = new Map(parsedResponseData === null || parsedResponseData === void 0 ? void 0 : parsedResponseData.map(currentChannel => [currentChannel.channelId, currentChannel]));
                    yield (db === null || db === void 0 ? void 0 : db.put(IndexDBStoreNames.DIGITAL, allChannelsMap, IndexDBKeyNames.ALL_CHANNELS));
                    resolve(allChannelsMap);
                }), (error) => {
                    const errorResponse = new CXoneSdkError(CXoneSdkErrorType.CXONE_API_ERROR, 'Channel list fetch failed', error);
                    this.logger.error('getAllChannels', errorResponse.toString());
                    reject(errorResponse);
                });
            });
        });
    }
    /**
     * Method to invoke API for getting digital Outbound channels
     * @returns
     * @example -
     */
    invokeOBChannelAPI() {
        const baseUrl = this.auth.getCXoneConfig().dfoApiBaseUri;
        const authToken = this.auth.getAuthToken().accessToken;
        const url = baseUrl +
            ApiUriConstants.DIGITAL_CHANNELS_LIST +
            '?query=isPrivate=1&hasManualOutboundFlow=1&withPermissionToManualOutbound=1&orderBy=name&order=asc';
        const reqInit = this.utilService.initHeader(authToken, undefined, "x-message-sender" /* HttpRequestCustomHeaders.X_MESSAGE_SENDER */);
        return new Promise((resolve, reject) => {
            HttpClient.get(url, reqInit).then((response) => {
                const responseData = response.data;
                const parsedResponseData = CXoneDigitalChannelArray.validateSync(responseData, {
                    stripUnknown: true,
                });
                this.logger.info('getAllOBChannels', 'Outbound Channel list fetched successfully');
                resolve(parsedResponseData);
            }, (error) => {
                const errorResponse = new CXoneSdkError(CXoneSdkErrorType.CXONE_API_ERROR, 'Outbound Channel list fetch failed', error);
                this.logger.error('getAllOBChannels', errorResponse.toString());
                reject(errorResponse);
            });
        });
    }
    /**
     * Method to get digital Outbound channels
     * @returns
     * @example -
     * @param forceApiCall - Forcefully invoke the API for Outbound Channels
     */
    getOBChannels(forceApiCall) {
        return __awaiter(this, void 0, void 0, function* () {
            let obChannelsResponse = [];
            const db = yield dbInstance();
            if (!forceApiCall) {
                obChannelsResponse = (yield (db === null || db === void 0 ? void 0 : db.get(IndexDBStoreNames.DIGITAL, IndexDBKeyNames.OB_CHANNEL_LIST)));
            }
            if (forceApiCall || !((obChannelsResponse === null || obChannelsResponse === void 0 ? void 0 : obChannelsResponse.length) > 0)) {
                obChannelsResponse = yield this.invokeOBChannelAPI();
                yield (db === null || db === void 0 ? void 0 : db.put(IndexDBStoreNames.DIGITAL, obChannelsResponse, IndexDBKeyNames.OB_CHANNEL_LIST));
            }
            return obChannelsResponse;
        });
    }
    /**
     * Method to get user slot details
     * @returns
     * @example -
     */
    getDigitalUserDetails() {
        const baseUrl = this.auth.getCXoneConfig().dfoApiBaseUri;
        const authToken = this.auth.getAuthToken().accessToken;
        const url = baseUrl + ApiUriConstants.DIGITAL_USER_DETAILS;
        const reqInit = this.utilService.initHeader(authToken);
        return new Promise((resolve, reject) => {
            HttpClient.get(url, reqInit).then((response) => {
                const responseData = response.data;
                this.logger.info('getDigitalUserDetails', 'User detail fetched successfully');
                resolve(responseData);
            }, (error) => {
                const errorResponse = new CXoneSdkError(CXoneSdkErrorType.CXONE_API_ERROR, 'User detail fetch failed', error);
                this.logger.error('getDigitalUserDetails', errorResponse.toString());
                reject(errorResponse);
            });
        });
    }
    /**
     * Method to get user slot details
     * @returns
     * @example -
     */
    getUserSlotDetails() {
        const baseUrl = this.auth.getCXoneConfig().dfoApiBaseUri;
        const authToken = this.auth.getAuthToken().accessToken;
        const user = CXoneUser.instance.getUserInfo();
        const userId = user && user.digitalUserId ? user.digitalUserId.toString() : '';
        const url = baseUrl + ApiUriConstants.USER_SLOTS.replace('{userId}', userId);
        const reqInit = this.utilService.initHeader(authToken);
        return new Promise((resolve, reject) => {
            HttpClient.get(url, reqInit).then((response) => {
                const userSlotResponse = UserSlotsSchema.validateSync(response.data, { stripUnknown: true });
                resolve(userSlotResponse);
            }, (error) => {
                const errorResponse = new CXoneSdkError(CXoneSdkErrorType.CXONE_API_ERROR, 'User slot detail fetch failed', error);
                this.logger.error('getUserSlotDetails', errorResponse.toString());
                reject(errorResponse);
            });
        });
    }
    /**
     * Method to parse date in required format
     * @returns - Method returns parsed date in 'mm/dd/yyyy
     * @example - Pass 1 parameter date
     */
    getRequiredDateFormat(date) {
        let formattedDate = '';
        const today = new Date(date);
        formattedDate =
            String(today.getMonth() + 1).padStart(2, '0') +
                '/' +
                String(today.getDate()).padStart(2, '0') +
                '/' +
                today.getFullYear();
        return formattedDate;
    }
    /**
     * Method to fetch Contact History
     * @returns - API Returns contact History details for the customer
     * @example - Pass 2 parameter customerId & scrollToken for fetching
     * contact history based on scrollToken value.
     */
    getContactHistory(customerId, scrollToken) {
        const baseUrl = this.auth.getCXoneConfig().dfoApiBaseUri;
        const authToken = this.auth.getAuthToken().accessToken;
        let url = `${baseUrl}${ApiUriConstants.GET_CONTACT_DETAILS_BY_ID}?customerId=${encodeURIComponent(customerId)}&sorting=createdAt&sortingType=desc`;
        if (scrollToken) {
            url = url + '&scrollToken=' + scrollToken;
        }
        const targetStatus = {
            // eslint-disable-next-line no-restricted-globals
            status: status,
        };
        const reqInit = {
            headers: this.utilService.initHeader(authToken, 'application/json').headers,
            body: targetStatus,
        };
        return new Promise((resolve, reject) => {
            HttpClient.get(url, reqInit).then((response) => {
                var _a, _b, _c;
                this.logger.info('getContactHistory', 'Contact history details fetched successfully');
                const contactHistoryResult = {};
                if ((_a = response === null || response === void 0 ? void 0 : response.data) === null || _a === void 0 ? void 0 : _a.data) {
                    const cxoneContactHistoryResponse = CXoneCaseArray.cast((_b = response === null || response === void 0 ? void 0 : response.data) === null || _b === void 0 ? void 0 : _b.data, {
                        stripUnknown: true,
                    });
                    const contactHistoryResp = cxoneContactHistoryResponse.map((item) => {
                        return Object.assign(Object.assign({}, item), { status: item.status.charAt(0).toUpperCase() + item.status.slice(1) });
                    });
                    contactHistoryResult.cxoneCase = contactHistoryResp;
                    contactHistoryResult.scrollToken = (_c = response === null || response === void 0 ? void 0 : response.data) === null || _c === void 0 ? void 0 : _c.scrollToken;
                    resolve(contactHistoryResult);
                }
            }, (error) => {
                const errorResponse = new CXoneSdkError(CXoneSdkErrorType.CXONE_API_ERROR, 'Failed to fetch contact history details', error);
                this.logger.error('getContactHistory', errorResponse.toString());
                reject(errorResponse);
            });
        });
    }
    /**
     * Get attachment using securedPermanentUrl for digital contact
     * @returns - downloaded file
     * @example
     * ```
     * getAttachment(attachment)
     * ```
     */
    getAttachment(attachment) {
        const authToken = this.auth.getAuthToken().accessToken;
        const reqInit = {
            headers: this.utilService.initHeader(authToken).headers,
        };
        return new Promise((resolve, reject) => {
            HttpClient.getBlob(attachment.securedPermanentUrl, reqInit)
                .then((response) => {
                var _a;
                const metadata = {
                    type: attachment.mimeType,
                };
                const file = new File([response.data], (_a = attachment.friendlyName) !== null && _a !== void 0 ? _a : '', metadata);
                this.logger.info('getAttachment', 'Attachment fetched successfully');
                resolve(file);
            })
                .catch((err) => {
                const errorResponse = new CXoneSdkError(CXoneSdkErrorType.UNHANDLED_EXCEPTION, 'Fetch attachment failed', err);
                this.logger.error('getAttachment', errorResponse.toString());
                reject(errorResponse);
            }),
                (error) => {
                    const errorResponse = new CXoneSdkError(CXoneSdkErrorType.CXONE_API_ERROR, 'Fetch attachment failed', error);
                    this.logger.error('getAttachment', errorResponse.toString());
                    reject(errorResponse);
                };
        });
    }
    /**
     * Get attachment using securedPermanentUrl for digital contact
     * Few channels like Instagram require no token due to open CDN
     * @returns - blob response of file
     * @example
     * ```
     * downloadAttachment(url, isTokenRequired)
     * ```
     */
    downloadAttachment(url, isTokenRequired = true) {
        const authToken = this.auth.getAuthToken().accessToken;
        const reqInit = {
            headers: isTokenRequired ? this.utilService.initHeader(authToken).headers : [],
        };
        return new Promise((resolve, reject) => {
            HttpClient.getBlob(url, reqInit)
                .then((response) => {
                this.logger.info('downloadAttachment', 'Attachment downloaded successfully');
                resolve(response);
            })
                .catch((err) => {
                const errorResponse = new CXoneSdkError(CXoneSdkErrorType.UNHANDLED_EXCEPTION, 'Download attachment failed', err);
                this.logger.error('downloadAttachment', errorResponse.toString());
                reject(errorResponse);
            }),
                (error) => {
                    const errorResponse = new CXoneSdkError(CXoneSdkErrorType.CXONE_API_ERROR, 'Download attachment failed', error);
                    this.logger.error('downloadAttachment', errorResponse.toString());
                    reject(errorResponse);
                };
        });
    }
    /**
     * Get all attachment for digital contact
     * @param attachmentIds - list of attachment ids
     * @returns - blob response of file
     * @example
     * ```
     * downloadAllAttachment(['5846adee-70de-4463-9755-ef23d006b67d','3fc84c90-3301-11ef-a1bf-c739f8d018c2'])
     * ```
     */
    downloadAllAttachment(attachmentIds) {
        const baseUrl = this.auth.getCXoneConfig().dfoApiBaseUri;
        const authToken = this.auth.getAuthToken().accessToken;
        const attachmentIdList = attachmentIds ? `?attachmentId[]=${attachmentIds.join('&attachmentId[]=')}` : '';
        const url = baseUrl + ApiUriConstants.DOWNLOAD_ALL_ATTACHMENTS + attachmentIdList;
        const reqInit = {
            headers: this.utilService.initHeader(authToken, 'application/json').headers,
        };
        return new Promise((resolve, reject) => {
            HttpClient.getBlob(url, reqInit)
                .then((response) => {
                this.logger.info('downloadAllAttachment', 'All attachments downloaded successfully');
                resolve(response);
            })
                .catch((err) => {
                const errorResponse = new CXoneSdkError(CXoneSdkErrorType.UNHANDLED_EXCEPTION, 'Download all attachment failed', err);
                this.logger.error('downloadAllAttachment', errorResponse.toString());
                reject(errorResponse);
            }),
                (error) => {
                    const errorResponse = new CXoneSdkError(CXoneSdkErrorType.CXONE_API_ERROR, 'Download all attachment failed', error);
                    this.logger.error('downloadAllAttachment', errorResponse.toString());
                    reject(errorResponse);
                };
        });
    }
    /**
     * Method to get fav quick Replies
     * @returns
     * @example -getFavQuickReplies(true)
     * @param isOutbound - represents outbound or not
     */
    getFavQuickReplies(isOutbound) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield dbInstance();
            const favQuickRepliesfromIndexDB = isOutbound ?
                (yield (db === null || db === void 0 ? void 0 : db.get(IndexDBStoreNames.QUICKREPLIESOUTBOUND, IndexDBKeyNames.FAV_QUICK_REPLIES_OUTBOUND)))
                : (yield (db === null || db === void 0 ? void 0 : db.get(IndexDBStoreNames.QUICKREPLIES, IndexDBKeyNames.FAV_QUICK_REPLIES)));
            return favQuickRepliesfromIndexDB;
        });
    }
    /**
   * Method to put fav quick Replies in IDB
   * @returns
   * @example
   * ```
   * putFavQuickReplies([{id:2,isFavorite:true}],IndexDBStoreNames.QUICKREPLIES,IndexDBKeyNames.FAV_QUICK_REPLIES)
   * ```
   * @param favQRObjects - represents favorite  quick replies array
   * @param idbStoreName - represents indexdb store name
   * @param idbKeyName - represents indexdb key name
   */
    putFavQuickReplies(favQRObjects, idbStoreName, idbKeyName) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield dbInstance();
            yield db.put(idbStoreName, favQRObjects, idbKeyName);
        });
    }
    /**
     * Method to unmark a quickReply as favorite
     * @returns
     * @example -unmarkFavQuickReplies(reply, true)
     * @param favQReply - represents current reply
     * @param isOutbound - represents outbound or not
     */
    unmarkFavQuickReplies(favQReply, isOutbound) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            favQReply.isfavorite = false;
            const db = yield dbInstance();
            const favQuickRepliesfromIndexDB = isOutbound ?
                (_a = (yield (db === null || db === void 0 ? void 0 : db.get(IndexDBStoreNames.QUICKREPLIESOUTBOUND, IndexDBKeyNames.FAV_QUICK_REPLIES_OUTBOUND)))) !== null && _a !== void 0 ? _a : []
                : (_b = (yield (db === null || db === void 0 ? void 0 : db.get(IndexDBStoreNames.QUICKREPLIES, IndexDBKeyNames.FAV_QUICK_REPLIES)))) !== null && _b !== void 0 ? _b : [];
            const found = favQuickRepliesfromIndexDB.filter((item) => item.id === favQReply.id);
            if (found) {
                const unmarkFavIndex = favQuickRepliesfromIndexDB
                    .map(function (item) {
                    return item.id;
                })
                    .indexOf(favQReply.id);
                favQuickRepliesfromIndexDB.splice(unmarkFavIndex, 1);
            }
            isOutbound ?
                db === null || db === void 0 ? void 0 : db.put(IndexDBStoreNames.QUICKREPLIESOUTBOUND, favQuickRepliesfromIndexDB, IndexDBKeyNames.FAV_QUICK_REPLIES_OUTBOUND)
                : db === null || db === void 0 ? void 0 : db.put(IndexDBStoreNames.QUICKREPLIES, favQuickRepliesfromIndexDB, IndexDBKeyNames.FAV_QUICK_REPLIES);
        });
    }
    /**
     * Method to mark a quickReply as favorite
     * @returns
     * @example -markFavQuickReplies(reply, true)
     * @param favQReply - represents current reply
     * @param isOutbound - represents outbound or not
     */
    markFavQuickReplies(favQReply, isOutbound) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            favQReply.isfavorite = true;
            const db = yield dbInstance();
            const favQuickRepliesfromIndexDB = isOutbound ?
                (_a = (yield (db === null || db === void 0 ? void 0 : db.get(IndexDBStoreNames.QUICKREPLIESOUTBOUND, IndexDBKeyNames.FAV_QUICK_REPLIES_OUTBOUND)))) !== null && _a !== void 0 ? _a : []
                : (_b = (yield (db === null || db === void 0 ? void 0 : db.get(IndexDBStoreNames.QUICKREPLIES, IndexDBKeyNames.FAV_QUICK_REPLIES)))) !== null && _b !== void 0 ? _b : [];
            favQuickRepliesfromIndexDB.push(favQReply);
            (yield isOutbound) ?
                db === null || db === void 0 ? void 0 : db.put(IndexDBStoreNames.QUICKREPLIESOUTBOUND, favQuickRepliesfromIndexDB, IndexDBKeyNames.FAV_QUICK_REPLIES_OUTBOUND)
                : db === null || db === void 0 ? void 0 : db.put(IndexDBStoreNames.QUICKREPLIES, favQuickRepliesfromIndexDB, IndexDBKeyNames.FAV_QUICK_REPLIES);
        });
    }
    /**
     * Method to clear Quick Replies
     * @example
     * ```
     * clearFavQuickReplies()
     * ```
     */
    clearFavQuickReplies() {
        return __awaiter(this, void 0, void 0, function* () {
            yield clearIndexDbStore(IndexDBStoreNames.QUICKREPLIES);
        });
    }
    /**
     * Method to return the Digital agent status id
     * @example
     * ```
     * this.getDigitalAgentStatus()
     * ```
     */
    getDigitalAgentStatus() {
        return new Promise((resolve, reject) => {
            const agentStatusFromStorage = LocalStorageHelper.getItem(StorageKeys.DIGITAL_AGENT_STATUS, true);
            if (!agentStatusFromStorage) {
                const baseUrl = this.auth.getCXoneConfig().dfoApiBaseUri;
                const authToken = this.auth.getAuthToken().accessToken;
                const url = baseUrl + ApiUriConstants.GET_DIGITAL_USER_STATUS;
                const reqInit = this.utilService.initHeader(authToken);
                HttpClient.get(url, reqInit).then((response) => {
                    const responseData = response.data;
                    this.logger.info('getDigitalAgentStatus', 'Agent status fetched from API successfully');
                    const digitalStatus = {
                        notAvailable: '',
                        online: '',
                    };
                    responseData.forEach((val) => {
                        if (val.type.toLowerCase() === 'na') {
                            digitalStatus['notAvailable'] = val.id;
                        }
                        else if (val.type.toLowerCase() === 'online') {
                            digitalStatus['online'] = val.id;
                        }
                    });
                    LocalStorageHelper.setItem(StorageKeys.DIGITAL_AGENT_STATUS, JSON.stringify(digitalStatus));
                    resolve(digitalStatus);
                }, (error) => {
                    const errorResponse = new CXoneSdkError(CXoneSdkErrorType.CXONE_API_ERROR, 'Agent status fetch failed', error);
                    this.logger.error('getDigitalAgentStatus', errorResponse.toString());
                    reject(errorResponse);
                });
            }
            else {
                this.logger.info('getDigitalAgentStatus', 'Agent status fetched from storage');
                resolve(agentStatusFromStorage);
            }
        });
    }
    /**
     * Method to add message reaction
     * @param messageId - Id of the message
     * @param reactionType -  reaction type eg. - like/ smile/ laugh etc
     * @example - addMessageReaction('b2ebad83-f9c2-489f-8441-3868e00b8099', 'like');
     */
    addMessageReaction(messageId, reactionType = ReactionType.LIKE) {
        const baseUrl = this.auth.getCXoneConfig().dfoApiBaseUri;
        const authToken = this.auth.getAuthToken().accessToken;
        const url = baseUrl +
            this.UPDATE_MESSAGE_REACTION.replace('{messageId}', messageId).replace('{reactionType}', reactionType);
        const reqInit = this.utilService.initHeader(authToken, undefined, "x-message-sender" /* HttpRequestCustomHeaders.X_MESSAGE_SENDER */);
        return new Promise((resolve, reject) => {
            HttpClient.post(url, reqInit).then((response) => {
                this.logger.info('addMessageReaction', 'Message reaction added successfully');
                resolve(response);
            }, (error) => {
                const errorResponse = new CXoneSdkError(CXoneSdkErrorType.CXONE_API_ERROR, 'Message reaction add operation failed', error);
                this.logger.error('addMessageReaction', errorResponse.toString());
                reject(errorResponse);
            });
        });
    }
    /**
     * Method to remove message reaction
     * @param messageId - Id of the message
     * @param reactionType -  reaction type eg. - like/ smile/ laugh etc
     * @example - removeMessageReaction('b2ebad83-f9c2-489f-8441-3868e00b8099', 'like');
     */
    removeMessageReaction(messageId, reactionType = ReactionType.LIKE) {
        const baseUrl = this.auth.getCXoneConfig().dfoApiBaseUri;
        const authToken = this.auth.getAuthToken().accessToken;
        const url = baseUrl +
            this.UPDATE_MESSAGE_REACTION.replace('{messageId}', messageId).replace('{reactionType}', reactionType);
        const reqInit = this.utilService.initHeader(authToken, undefined, "x-message-sender" /* HttpRequestCustomHeaders.X_MESSAGE_SENDER */);
        return new Promise((resolve, reject) => {
            HttpClient.delete(url, reqInit).then((response) => {
                this.logger.info('removeMessageReaction', 'Message reaction removed successfully');
                resolve(response);
            }, (error) => {
                const errorResponse = new CXoneSdkError(CXoneSdkErrorType.CXONE_API_ERROR, 'Message reaction remove operation failed', error);
                this.logger.error('removeMessageReaction', errorResponse.toString());
                reject(errorResponse);
            });
        });
    }
    /**
     * Method to get all routing queues
     * @returns - routing queue list
     * @example - getAllRoutingQueues()
     */
    getAllRoutingQueues(forceFetch) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield dbInstance();
            const baseUrl = this.auth.getCXoneConfig().dfoApiBaseUri;
            const authToken = this.auth.getAuthToken().accessToken;
            const url = baseUrl + this.ROUTING_QUEUES_URI;
            const reqInit = {
                headers: this.utilService.initHeader(authToken, 'application/json')
                    .headers,
            };
            const routingQueuesFromIndexedDB = yield (db === null || db === void 0 ? void 0 : db.get(IndexDBStoreNames.DIGITAL, IndexDBKeyNames.ROUTING_QUEUE));
            if (routingQueuesFromIndexedDB && routingQueuesFromIndexedDB.length > 0 && !forceFetch)
                return routingQueuesFromIndexedDB;
            return new Promise((resolve, reject) => {
                HttpClient.get(url, reqInit).then((response) => __awaiter(this, void 0, void 0, function* () {
                    try {
                        const parsedRoutingQueues = CXoneRoutingQueueArray.validateSync(response.data.data, { stripUnknown: true });
                        yield (db === null || db === void 0 ? void 0 : db.put(IndexDBStoreNames.DIGITAL, parsedRoutingQueues, IndexDBKeyNames.ROUTING_QUEUE));
                        resolve(parsedRoutingQueues);
                    }
                    catch (error) {
                        if (error instanceof Error) {
                            const errorResponse = new CXoneSdkError(CXoneSdkErrorType.UNHANDLED_EXCEPTION, 'Exception while returning routing queues' + error.message);
                            this.logger.error('getAllRoutingQueues', errorResponse.toString());
                            reject(errorResponse);
                        }
                    }
                }), (error) => {
                    const errorResponse = new CXoneSdkError(CXoneSdkErrorType.CXONE_API_ERROR, 'Failed to fetch routing queues', error);
                    this.logger.error('getAllRoutingQueues', errorResponse.toString());
                    reject(errorResponse);
                });
            });
        });
    }
    /**
     * Method will add extra required parameters after getting contact search response
     * @returns - contact search with additional fields like skillName, channelName etc..
     * @param forceFetchChannel - boolean flag to force fetch channels.
     * @param forceFetchRoutingQueue - boolean flag to force fetch routing queues.
     * @example - additionalFieldsInContactSearchResponse(true, true)
     */
    additionalFieldsInContactSearchResponse(contactSearchResponse, allChannelsMap, allRoutingQueuesMap) {
        var _a;
        (_a = contactSearchResponse === null || contactSearchResponse === void 0 ? void 0 : contactSearchResponse.data) === null || _a === void 0 ? void 0 : _a.forEach((currentContact) => {
            let channelValues = {};
            let routingQueueValues = {};
            if (currentContact === null || currentContact === void 0 ? void 0 : currentContact.channelId) {
                channelValues = allChannelsMap === null || allChannelsMap === void 0 ? void 0 : allChannelsMap.get(currentContact.channelId);
            }
            if (currentContact === null || currentContact === void 0 ? void 0 : currentContact.routingQueueId) {
                routingQueueValues = allRoutingQueuesMap === null || allRoutingQueuesMap === void 0 ? void 0 : allRoutingQueuesMap.get(currentContact.routingQueueId);
            }
            // add channel & routing queue data from allChannelsMap & allRoutingQueuesMap into contact search response
            if (channelValues) {
                currentContact['channelName'] = channelValues === null || channelValues === void 0 ? void 0 : channelValues.name;
                currentContact['channelId'] = channelValues === null || channelValues === void 0 ? void 0 : channelValues.channelId;
                currentContact['isPrivateChannel'] = channelValues === null || channelValues === void 0 ? void 0 : channelValues.isPrivate;
                currentContact['channelType'] = channelValues === null || channelValues === void 0 ? void 0 : channelValues.type;
            }
            if (routingQueueValues) {
                currentContact['skillName'] = routingQueueValues === null || routingQueueValues === void 0 ? void 0 : routingQueueValues.name;
                currentContact['skillId'] = routingQueueValues === null || routingQueueValues === void 0 ? void 0 : routingQueueValues.skillId;
            }
        });
        return contactSearchResponse;
    }
    /**
     * Method will add extra required parameters after getting message search response
     * @returns - message search with additional fields like channelName,channelType etc..
     * @param forceFetchChannel - boolean flag to force fetch channels.
     * @example - additionalFieldsInMessageSearchResponse(true, true)
     */
    additionalFieldsInMessageSearchResponse(messageSearchResponse, allChannelsMap) {
        var _a;
        (_a = messageSearchResponse === null || messageSearchResponse === void 0 ? void 0 : messageSearchResponse.data) === null || _a === void 0 ? void 0 : _a.forEach((currentMessage) => {
            var _a;
            let channelValues = {};
            if ((_a = currentMessage === null || currentMessage === void 0 ? void 0 : currentMessage.channel) === null || _a === void 0 ? void 0 : _a.id) {
                channelValues = allChannelsMap === null || allChannelsMap === void 0 ? void 0 : allChannelsMap.get(currentMessage.channel.id);
            }
            // add channel & routing queue data from allChannelsMap into message search response
            if (channelValues) {
                currentMessage['channelName'] = channelValues === null || channelValues === void 0 ? void 0 : channelValues.name;
                currentMessage['channelType'] = channelValues === null || channelValues === void 0 ? void 0 : channelValues.type;
            }
        });
        return messageSearchResponse;
    }
    /**
     * Method to get contact list based on provided query parameters
     * @returns - contact list array
     * @param searchRequest - search query containing status, channel, skill etc.
     * @param forceFetchChannel - force fetch channel on/off
     * @param forceFetchRoutingQueue - force fetch routing queue on/off
     * @example -
     * ```
     * getDigitalContactSearchResult(searchRequest,false,false);
     * ```
     */
    getDigitalContactSearchResult(searchRequest, forceFetchChannel, forceFetchRoutingQueue) {
        return __awaiter(this, void 0, void 0, function* () {
            const baseUrl = this.auth.getCXoneConfig().dfoApiBaseUri;
            const authToken = this.auth.getAuthToken().accessToken;
            //Dev Note - Removing the attributes for which there is no value selected.
            searchRequest = Object.fromEntries(Object.entries(searchRequest).filter(([, nonEmptySearchRequest]) => typeof nonEmptySearchRequest !== 'undefined' && (nonEmptySearchRequest === null || nonEmptySearchRequest === void 0 ? void 0 : nonEmptySearchRequest.length) > 0));
            const url = baseUrl + ApiUriConstants.GET_CONTACT_DETAILS_BY_ID + getQueryURLFromObjectKeys(searchRequest);
            const reqInit = this.utilService.initHeader(authToken);
            // we need to call /channels & /routing-queues api separately as channelName & routing Queue name is not coming in /contacts search api response
            const allChannelsMap = yield this.getAllChannels(forceFetchChannel);
            const allRoutingQueues = yield this.getAllRoutingQueues(forceFetchRoutingQueue);
            // create map from validated routing queues(getting from either indexedb or api)
            const allRoutingQueuesMap = new Map(allRoutingQueues === null || allRoutingQueues === void 0 ? void 0 : allRoutingQueues.map(currentRoutingQueue => [currentRoutingQueue.id, currentRoutingQueue]));
            return new Promise((resolve, reject) => {
                HttpClient.get(url, reqInit).then((response) => __awaiter(this, void 0, void 0, function* () {
                    try {
                        const contactSearchResponseWithAdditionalFields = this.additionalFieldsInContactSearchResponse(response === null || response === void 0 ? void 0 : response.data, allChannelsMap, allRoutingQueuesMap);
                        const validatedContactSearchResponse = CXoneDigitalContactSearch.validateSync(contactSearchResponseWithAdditionalFields, { stripUnknown: true });
                        resolve(validatedContactSearchResponse);
                    }
                    catch (error) {
                        if (error instanceof Error) {
                            const errorResponse = new CXoneSdkError(CXoneSdkErrorType.DATA_VALIDATION_ERROR, 'Validation Error: ' + error.message);
                            this.logger.error('getDigitalContactSearchResult', errorResponse.toString());
                            reject(errorResponse);
                        }
                    }
                }), (error) => {
                    const errorResponse = new CXoneSdkError(CXoneSdkErrorType.CXONE_API_ERROR, 'Failed to fetch digital interaction', error);
                    this.logger.error('getDigitalContactSearchResult ', errorResponse.toString());
                    reject(errorResponse);
                });
            });
        });
    }
    /**
     * Method to update all custom fields for Case
     * @returns - API Returns Response code with success or failure
     * @example -
     */
    updateCaseCustomFields(customFields) {
        const baseUrl = this.auth.getCXoneConfig().dfoApiBaseUri;
        const authToken = this.auth.getAuthToken().accessToken;
        const url = baseUrl +
            this.UPDATE_CASE_CUSTOM_FIELD.replace('{caseId}', customFields.id ? customFields.id : '');
        const reqInit = {
            headers: this.utilService.initHeader(authToken, 'application/json').headers,
            body: customFields.customFields,
        };
        return new Promise((resolve, reject) => {
            HttpClient.put(url, reqInit).then((response) => {
                resolve(response);
            }, (error) => {
                const errorResponse = new CXoneSdkError(CXoneSdkErrorType.CXONE_API_ERROR, 'Failed to update case custom fields', error);
                this.logger.error('getDigitalContactSearchResult ', errorResponse.toString());
                reject(errorResponse);
            });
        });
    }
    /**
     * Method to get External Platform Templates for channels like whatsapp
     * @returns - List of templates
     * @param channelId -  channel Id for which external template is configured
     * @example - digitalService.getExternalPlatformTemplates('ind_whatsapp_62c689b998f02300efd28845')
     */
    getExternalPlatformTemplates(channelId) {
        const baseUrl = this.auth.getCXoneConfig().dfoApiBaseUri;
        const authToken = this.auth.getAuthToken().accessToken;
        const url = baseUrl + this.EXTERNAL_PLATFORM_TEMPLATE_URI.replace('{channelId}', channelId) + '?includeTemplatesWithMultimedia=1';
        const reqInit = this.utilService.initHeader(authToken, undefined, "x-message-sender" /* HttpRequestCustomHeaders.X_MESSAGE_SENDER */);
        return new Promise((resolve, reject) => {
            HttpClient.get(url, reqInit).then((response) => {
                const responseData = response.data;
                const validatedResponse = ExternalPlatformTemplatesResponse.validateSync(responseData.data);
                resolve(validatedResponse);
            }, (error) => {
                const errorResponse = new CXoneSdkError(CXoneSdkErrorType.CXONE_API_ERROR, 'external Platform templates fetch failed', error);
                this.logger.error('getExternalPlatformTemplates', errorResponse.toString());
                reject(errorResponse);
            });
        });
    }
    /**
     * Method to addDigitalMessageTag
    * @param messageId -
    * @param tagId -
     * @returns response from API
     * @example addDigitalMessageTag('c4d4b459-8ddc-4a2a-9c5f-a9a85371df73', '8696')
    */
    addDigitalMessageTag(messageId, tagId) {
        const baseUrl = this.auth.getCXoneConfig().dfoApiBaseUri;
        const authToken = this.auth.getAuthToken().accessToken;
        const url = baseUrl + ApiUriConstants.MESSAGE_TAG.replace('{messageId}', messageId).replace('{tagId}', tagId);
        const reqInit = {
            headers: this.utilService.initHeader(authToken, 'application/json', "x-message-sender" /* HttpRequestCustomHeaders.X_MESSAGE_SENDER */).headers,
        };
        return new Promise((resolve, reject) => {
            HttpClient.put(url, reqInit).then((response) => __awaiter(this, void 0, void 0, function* () {
                const contactId = LocalStorageHelper.getItem(StorageKeys.FOCUSED_CONTACT_ID);
                if (contactId) {
                    const messageData = response === null || response === void 0 ? void 0 : response.data;
                    yield CXoneDigitalUtil.instance.checkIfEventConsumed(response, contactId, CXoneDigitalEventType.MESSAGE_UPDATED, messageData);
                }
                resolve(response);
            }), (error) => {
                const errorResponse = new CXoneSdkError(CXoneSdkErrorType.CXONE_API_ERROR, 'add message tag failed', error);
                this.logger.error('addDigitalMessageTag', errorResponse.toString());
                reject(errorResponse);
            });
        });
    }
    /**
    * Method to deleteDigitalMessageTag
    * @param messageId -
    * @param tagId -
    * @returns response from API
    * @example deleteDigitalMessageTag('c4d4b459-8ddc-4a2a-9c5f-a9a85371df73', '8696')
   */
    deleteDigitalMessageTag(messageId, tagId) {
        const baseUrl = this.auth.getCXoneConfig().dfoApiBaseUri;
        const authToken = this.auth.getAuthToken().accessToken;
        const url = baseUrl + ApiUriConstants.MESSAGE_TAG.replace('{messageId}', messageId).replace('{tagId}', tagId);
        const reqInit = {
            headers: this.utilService.initHeader(authToken, 'application/json', "x-message-sender" /* HttpRequestCustomHeaders.X_MESSAGE_SENDER */).headers,
        };
        return new Promise((resolve, reject) => {
            HttpClient.delete(url, reqInit).then((response) => __awaiter(this, void 0, void 0, function* () {
                const contactId = LocalStorageHelper.getItem(StorageKeys.FOCUSED_CONTACT_ID);
                if (contactId) {
                    const messageData = response === null || response === void 0 ? void 0 : response.data;
                    yield CXoneDigitalUtil.instance.checkIfEventConsumed(response, contactId, CXoneDigitalEventType.MESSAGE_UPDATED, messageData);
                }
                resolve(response);
            }), (error) => {
                const errorResponse = new CXoneSdkError(CXoneSdkErrorType.CXONE_API_ERROR, 'remove message tag failed', error);
                this.logger.error('deleteDigitalMessageTag', errorResponse.toString());
                reject(errorResponse);
            });
        });
    }
    /**
    * Method to getDigitalMessageTagByName
    * @param tagName -
    * @param pageNumber -
    * @returns response from API
    * @example getDigitalMessageTagByName('Test', '1')
   */
    getDigitalMessageTagByName(tagName, pageNumber) {
        const baseUrl = this.auth.getCXoneConfig().dfoApiBaseUri;
        const authToken = this.auth.getAuthToken().accessToken;
        const url = baseUrl + ApiUriConstants.SEARCH_DIGITAL_TAG.replace('{tagName}', tagName).replace('{pageNumber}', pageNumber);
        const reqInit = {
            headers: this.utilService.initHeader(authToken, 'application/json').headers,
        };
        return new Promise((resolve, reject) => {
            HttpClient.get(url, reqInit).then((response) => {
                resolve(response);
            }, (error) => {
                const errorResponse = new CXoneSdkError(CXoneSdkErrorType.CXONE_API_ERROR, 'search message tag failed', error);
                this.logger.error('getDigitalMessageTagByName', errorResponse.toString());
                reject(errorResponse);
            });
        });
    }
    /**
    * Method to getDigitalMessageTagByName
    * @param tagName -
    * @param pageNumber -
    * @returns response from API
    * @example getDigitalMessageTagsByPage('1')
   */
    getDigitalMessageTagsByPage(pageNumber) {
        const baseUrl = this.auth.getCXoneConfig().dfoApiBaseUri;
        const authToken = this.auth.getAuthToken().accessToken;
        const url = baseUrl + ApiUriConstants.GET_MESSAGE_TAGS_BY_PAGE.replace('{pageNumber}', pageNumber.toString());
        const reqInit = {
            headers: this.utilService.initHeader(authToken, 'application/json', "x-message-sender" /* HttpRequestCustomHeaders.X_MESSAGE_SENDER */).headers,
        };
        return new Promise((resolve, reject) => {
            HttpClient.get(url, reqInit).then((response) => {
                resolve(response);
            }, (error) => {
                const errorResponse = new CXoneSdkError(CXoneSdkErrorType.CXONE_API_ERROR, 'get message tags by pageNumber failed', error);
                this.logger.error('getDigitalMessageTagsByPage', errorResponse.toString());
                reject(errorResponse);
            });
        });
    }
    /**
    * Method to getDigitalMessageTags
    * @param tagId -
    * @returns response from API
    * @example getDigitalMessageTags()
   */
    getDigitalMessageTags() {
        const baseUrl = this.auth.getCXoneConfig().dfoApiBaseUri;
        const authToken = this.auth.getAuthToken().accessToken;
        const url = baseUrl + ApiUriConstants.GET_MESSAGE_TAG;
        const reqInit = {
            headers: this.utilService.initHeader(authToken, 'application/json', "x-message-sender" /* HttpRequestCustomHeaders.X_MESSAGE_SENDER */).headers,
        };
        return new Promise((resolve, reject) => {
            HttpClient.get(url, reqInit).then((response) => {
                const responseData = response.data;
                const validatedResponse = CXoneDigitalMessageTagArraychema.validateSync(responseData.data, { stripUnknown: true });
                resolve(validatedResponse);
            }, (error) => {
                const errorResponse = new CXoneSdkError(CXoneSdkErrorType.CXONE_API_ERROR, 'get Message Tag failed', error);
                this.logger.error('getDigitalMessageTags', errorResponse.toString());
                reject(errorResponse);
            });
        });
    }
    /**
     * Method to get quick responses includes secure forms, rich text & quick replies
     * @param channels - channel ids to be passed to get channel specific list (optional)
     * @returns - list of all types of quick responses
     * @example - digitalService.getQuickResponses()
     */
    getQuickResponses(channels) {
        const baseUrl = this.auth.getCXoneConfig().apiFacadeBaseUri;
        const authToken = this.auth.getAuthToken().accessToken;
        const channelQueryParams = channels && channels.length > 0 ? channels.map(channel => `channelId%5B%5D=${channel}`).join('&') : null;
        const apiUrl = channelQueryParams ? `${this.QUICK_RESPONSES}?${channelQueryParams}` : this.QUICK_RESPONSES;
        const url = baseUrl + apiUrl;
        const reqInit = this.utilService.initHeader(authToken);
        return new Promise((resolve, reject) => {
            HttpClient.get(url, reqInit).then((response) => {
                var _a;
                resolve((_a = response === null || response === void 0 ? void 0 : response.data) === null || _a === void 0 ? void 0 : _a.data);
            }, (error) => {
                const errorResponse = new CXoneSdkError(CXoneSdkErrorType.CXONE_API_ERROR, 'Digital QuickResponses fetch failed', error);
                this.logger.error('getQuickResponses', errorResponse.toString());
                reject(errorResponse);
            });
        });
    }
    /**
     * Method to mark or unmark a quickResponse as favorite
     * @param quickResponseId - Id of the quick response to be marked as favorite
     * @param isMarkedAsFavorite - boolean flag to mark or unmark as favorite
     * @example - digitalService.markQuickResponseAsFavorite(1234)
     */
    toggleFavoriteQuickResponse(quickResponseId, isMarkedAsFavorite) {
        const baseUrl = this.auth.getCXoneConfig().apiFacadeBaseUri;
        const authToken = this.auth.getAuthToken().accessToken;
        const url = baseUrl + this.MARK_QUICK_RESPONSE_AS_FAVORITE.replace('{quickResponseId}', quickResponseId.toString());
        const reqInit = this.utilService.initHeader(authToken);
        if (isMarkedAsFavorite) {
            return new Promise((resolve, reject) => {
                HttpClient.post(url, reqInit).then((response) => {
                    resolve(response);
                }, (error) => {
                    const errorResponse = new CXoneSdkError(CXoneSdkErrorType.CXONE_API_ERROR, 'Mark Quick Response as favorite failed', error);
                    this.logger.error('markQuickResponseAsFavorite', errorResponse.toString());
                    reject(errorResponse);
                });
            });
        }
        else {
            return new Promise((resolve, reject) => {
                HttpClient.delete(url, reqInit).then((response) => {
                    resolve(response);
                }, (error) => {
                    const errorResponse = new CXoneSdkError(CXoneSdkErrorType.CXONE_API_ERROR, 'Unmark Quick Response as favorite failed', error);
                    this.logger.error('unmarkQuickResponseAsFavorite', errorResponse.toString());
                    reject(errorResponse);
                });
            });
        }
    }
    /**
     * Method to get unified quick responses includes rich text & quick replies with pagination support
     * @param channels - channel ids to be passed to get channel specific list (optional)
     * @param skills - skill ids to be passed to get skill specific list (optional)
     * @param page - page number for pagination (default: 1)
     * @param limit - number of items per page (default: 20)
     * @param search - search term to filter results (optional)
     * @returns - list of all types of quick responses
     * @example - digitalService.getUnifiedQuickResponses()
     */
    getUnifiedQuickResponses(channels, skills, page = 1, limit = 20, search = '', isFavorite) {
        const baseUrl = this.auth.getCXoneConfig().apiFacadeBaseUri;
        const authToken = this.auth.getAuthToken().accessToken;
        const channelQueryParams = channels && channels.length > 0 ? channels.map(channel => `channelId%5B%5D=${channel}`).join('&') : null;
        const skillQueryParams = skills && skills.length > 0 ? skills.map(skill => `skillId%5B%5D=${skill}`).join('&') : null;
        const favoriteQueryParam = isFavorite ? 'isFavorite=true' : undefined;
        const combinedQueryParams = [channelQueryParams, skillQueryParams, favoriteQueryParam]
            .filter(Boolean)
            .join('&');
        const queryParams = { page, limit };
        if (search !== '') {
            queryParams.query = search;
        }
        const apiUrl = combinedQueryParams ? `${this.QUICK_RESPONSES}?${combinedQueryParams}` : this.QUICK_RESPONSES;
        let url = baseUrl + apiUrl;
        url = this.urlUtilsService.appendQueryString(url, queryParams);
        const reqInit = this.utilService.initHeader(authToken);
        return new Promise((resolve, reject) => {
            HttpClient.get(url, reqInit).then((response) => {
                const responseData = response.data;
                responseData.page = page;
                responseData.limit = limit;
                resolve({
                    allQuickReplies: responseData.data,
                    nextLinks: responseData._links || null,
                    totalRecords: responseData.totalRecords,
                });
            }, (error) => {
                const errorResponse = new CXoneSdkError(CXoneSdkErrorType.CXONE_API_ERROR, 'Digital Unified QuickResponses fetch failed', error);
                this.logger.error('getUnifiedQuickResponses', errorResponse.toString());
                reject(errorResponse);
            });
        });
    }
    /**
     * Method to create URL link to secure form,
     * URL created after this api call will be used to sent to the customer by agent using editor.
     * @returns - Generated Secure Form link to be shared with Customer
     * @param formId -  form Id selected from form list
     * @param contactNumber -  contact number of customer
     * @example - digitalService.createSecureFormLink('ind_62c689b998f02300efd28845', '1234')
     */
    createSecureFormLink(formId, contactNumber) {
        const baseUrl = this.auth.getCXoneConfig().dfoApiBaseUri;
        const authToken = this.auth.getAuthToken().accessToken;
        const url = baseUrl + this.FORM_SUBMISSION.replace('{formId}', formId);
        const reqInit = {
            headers: this.utilService.initHeader(authToken, 'application/json').headers,
            body: {
                'contact': {
                    'contactNumber': contactNumber,
                },
            },
        };
        return new Promise((resolve, reject) => {
            HttpClient.post(url, reqInit).then((response) => {
                resolve(response);
            }, (error) => {
                const errorResponse = new CXoneSdkError(CXoneSdkErrorType.CXONE_API_ERROR, 'generating SecureForm URL fetch failed', error);
                this.logger.error('createSecureFormURL', errorResponse.toString());
                reject(errorResponse);
            });
        });
    }
    /**
     * Method to get customers list
     * @returns - customers list (default returns 20 records at a time with each scroll token pagination)
     * @param scrollToken -  optional parameter for pagination support to customer list
     * @example -
     * ```
     * getDigitalCustomerSearchResult('MjAyMC0w');
     * ```
     */
    getDigitalCustomerSearchResult(searchRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            const baseUrl = this.auth.getCXoneConfig().dfoApiBaseUri;
            const authToken = this.auth.getAuthToken().accessToken;
            const url = baseUrl + this.GET_CUSTOMER_DETAILS + getQueryURLForCustomerTab(searchRequest);
            // TODO: REMOVE THESE COMMENTS LATER WHEN API is ready (read below reason)
            // Currently DFO Customer search API has limited information & no filter default supported.
            // We need to add other parameters to the common method so that this can be reused for initial search as well as search combinations
            const reqInit = this.utilService.initHeader(authToken);
            return new Promise((resolve, reject) => {
                HttpClient.get(url, reqInit).then((response) => {
                    try {
                        const responseData = response.data;
                        const validatedCustomerSearchResponse = CXoneDigitalCustomerSearch.validateSync(responseData, { stripUnknown: true });
                        resolve(validatedCustomerSearchResponse);
                    }
                    catch (error) {
                        if (error instanceof Error) {
                            const errorResponse = new CXoneSdkError(CXoneSdkErrorType.DATA_VALIDATION_ERROR, 'Validation Error: ' + error.message);
                            this.logger.error('getDigitalCustomerSearchResult', errorResponse.toString());
                            reject(errorResponse);
                        }
                    }
                }, (error) => {
                    const errorResponse = new CXoneSdkError(CXoneSdkErrorType.CXONE_API_ERROR, 'Digital Customers Search Result fetch failed', error);
                    this.logger.error('getDigitalCustomerSearchResult', errorResponse.toString());
                    reject(errorResponse);
                });
            });
        });
    }
    /**
     * Method to get messages list based on provided query parameters on interaction search
     * @returns - messages list
     * @param searchRequest - search query containing channel, read status, agent etc.
     * @example -
     * ```
     * getDigitalMessageSearchResult(searchRequest);
     * ```
     */
    getDigitalMessageSearchResult(searchRequest, forceFetchChannel) {
        return __awaiter(this, void 0, void 0, function* () {
            const baseUrl = this.auth.getCXoneConfig().dfoApiBaseUri;
            const authToken = this.auth.getAuthToken().accessToken;
            const url = baseUrl + this.GET_MESSAGES_LIST + getQueryURLForSearchMessagesTab(searchRequest);
            const reqInit = this.utilService.initHeader(authToken, undefined, "x-message-sender" /* HttpRequestCustomHeaders.X_MESSAGE_SENDER */);
            // we need to call /channels & /routing-queues api separately as channelName & routing Queue name is not coming in /contacts search api response
            const allChannelsMap = yield this.getAllChannels(forceFetchChannel);
            return new Promise((resolve, reject) => {
                HttpClient.get(url, reqInit).then((response) => __awaiter(this, void 0, void 0, function* () {
                    try {
                        const messageSearchResponseWithAdditionalFields = this.additionalFieldsInMessageSearchResponse(response === null || response === void 0 ? void 0 : response.data, allChannelsMap);
                        const validatedMessageSearchResponse = CXoneDigitalMessageSearch.validateSync(messageSearchResponseWithAdditionalFields, { stripUnknown: true });
                        resolve(validatedMessageSearchResponse);
                    }
                    catch (error) {
                        if (error instanceof Error) {
                            const errorResponse = new CXoneSdkError(CXoneSdkErrorType.DATA_VALIDATION_ERROR, 'Validation Error: ' + error.message);
                            this.logger.error('getDigitalMessageSearchResult', errorResponse.toString());
                            reject(errorResponse);
                        }
                    }
                }), (error) => {
                    const errorResponse = new CXoneSdkError(CXoneSdkErrorType.CXONE_API_ERROR, 'Failed to fetch messages list', error);
                    this.logger.error('getDigitalMessageSearchResult ', errorResponse.toString());
                    reject(errorResponse);
                });
            });
        });
    }
    /**
     * Method to get threads list based on provided query parameters on interaction search
     * @returns - threads list
     * @param searchRequest - search query containing channel, from/to date
     * @example -
     * ```
     * getDigitalThreadSearchResult(searchRequest);
     * ```
     */
    getDigitalThreadSearchResult(searchRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            const baseUrl = this.auth.getCXoneConfig().dfoApiBaseUri;
            const authToken = this.auth.getAuthToken().accessToken;
            const url = baseUrl + this.GET_THREADS_LIST + getQueryURLForSearchThreadsTab(searchRequest);
            const reqInit = this.utilService.initHeader(authToken);
            return new Promise((resolve, reject) => {
                HttpClient.get(url, reqInit).then((response) => __awaiter(this, void 0, void 0, function* () {
                    try {
                        const responseData = response.data;
                        const validatedThreadSearchResponse = CXoneDigitalThreadSearch.validateSync(responseData, { stripUnknown: true });
                        resolve(validatedThreadSearchResponse);
                    }
                    catch (error) {
                        if (error instanceof Error) {
                            const errorResponse = new CXoneSdkError(CXoneSdkErrorType.DATA_VALIDATION_ERROR, 'Validation Error' + error.message);
                            this.logger.error('getDigitalThreadSearchResult', errorResponse.toString());
                            reject(errorResponse);
                        }
                    }
                }), (error) => {
                    const errorResponse = new CXoneSdkError(CXoneSdkErrorType.CXONE_API_ERROR, 'Failed to fetch threads list', error);
                    this.logger.error('getDigitalThreadSearchResult ', errorResponse.toString());
                    reject(errorResponse);
                });
            });
        });
    }
    /**
     * Method to delete message author name
     * @param messageId - Id of the message
     * @example -
     * ```
     * deleteMessageAuthorName('b2ebad83-f9c2-489f-8441-3868e00b8099');
     * ```
     */
    deleteMessageAuthorName(messageId) {
        const baseUrl = this.auth.getCXoneConfig().dfoApiBaseUri;
        const authToken = this.auth.getAuthToken().accessToken;
        const url = baseUrl + this.DELETE_MESSAGE_AUTHOR_NAME.replace('{messageId}', messageId);
        const reqInit = {
            headers: this.utilService.initHeader(authToken, 'application/json', "x-message-sender" /* HttpRequestCustomHeaders.X_MESSAGE_SENDER */).headers,
            body: { 'reason': 'GDPR' },
        };
        return new Promise((resolve, reject) => {
            HttpClient.post(url, reqInit).then((response) => {
                this.logger.info('deleteMessageAuthorName', 'Message author deleted added successfully');
                resolve(response);
            }, (error) => {
                const errorResponse = new CXoneSdkError(CXoneSdkErrorType.CXONE_API_ERROR, 'Message author deletion operation failed', error);
                this.logger.error('deleteMessageAuthorName', errorResponse.toString());
                reject(errorResponse);
            });
        });
    }
    /**
     * Method to delete message content
     * @param messageId - Id of the message
     * @example -
     * ```
     * deleteMessageContent('b2ebad83-f9c2-489f-8441-3868e00b8099');
     * ```
     */
    deleteMessageContent(messageId) {
        const baseUrl = this.auth.getCXoneConfig().dfoApiBaseUri;
        const authToken = this.auth.getAuthToken().accessToken;
        const url = baseUrl + this.DELETE_MESSAGE_CONTENT.replace('{messageId}', messageId);
        const reqInit = {
            headers: this.utilService.initHeader(authToken, 'application/json', "x-message-sender" /* HttpRequestCustomHeaders.X_MESSAGE_SENDER */).headers,
            body: { 'reason': 'GDPR' },
        };
        return new Promise((resolve, reject) => {
            HttpClient.post(url, reqInit).then((response) => {
                this.logger.info('deleteMessageContent', 'Message content deleted successfully');
                resolve(response);
            }, (error) => {
                const errorResponse = new CXoneSdkError(CXoneSdkErrorType.CXONE_API_ERROR, 'Message content deletion operation failed', error);
                this.logger.error('deleteMessageContent', errorResponse.toString());
                reject(errorResponse);
            });
        });
    }
    /**
     * Method to get can erase Message Content And UserNames flag
     * @example -
     * ```
     * getCanEraseMessageContentAndUserNames();
     * ```
     */
    getCanEraseMessageContentAndUserNames() {
        // TODO: The implementation done using old 2.0 API as this canEraseFlag not available in 3.0 API's, Need to replace API once its available in latest one.
        return new Promise((resolve) => {
            const canEraseMessageContentAndUserNames = LocalStorageHelper.getItem(StorageKeys.ABLE_TO_ERASE_CONTENT_AUTHOR, true);
            if (!canEraseMessageContentAndUserNames) {
                //TODO: APP base URL, need to replace with API base URL once DFO give 3.0 URL for this flag
                const baseUrl = this.auth.getCXoneConfig().dfoAppBaseUri;
                const authToken = this.auth.getAuthToken().accessToken;
                const url = baseUrl + this.ERASE_MESSAGE_AUTHOR_NAME;
                const reqInit = this.utilService.initHeader(authToken);
                HttpClient.get(url, reqInit).then((response) => {
                    var _a, _b;
                    const responseData = response.data;
                    this.logger.info('getCanEraseMessageContentAndUserNames', 'Erase Content and Author name status fetched from API successfully');
                    const canEraseMessageContentAndUserNames = ((_b = (_a = responseData === null || responseData === void 0 ? void 0 : responseData.configurationEnvironment) === null || _a === void 0 ? void 0 : _a.permissions) === null || _b === void 0 ? void 0 : _b.canEraseMessageContentAndUserNames) === 1 ? true : false;
                    LocalStorageHelper.setItem(StorageKeys.ABLE_TO_ERASE_CONTENT_AUTHOR, JSON.stringify(canEraseMessageContentAndUserNames));
                    resolve(canEraseMessageContentAndUserNames);
                }, (error) => {
                    const errorResponse = new CXoneSdkError(CXoneSdkErrorType.CXONE_API_ERROR, 'Erase content and author permission fetch failed', error);
                    this.logger.error('getCanEraseMessageContentAndUserNames', errorResponse.toString());
                    LocalStorageHelper.setItem(StorageKeys.ABLE_TO_ERASE_CONTENT_AUTHOR, 'false');
                    //DEV Comments : This is an old 2.0 API. To avoid breaking the execution flow in case of failure, we are returning false instead of rejecting the promise.
                    resolve(false);
                });
            }
            else {
                this.logger.info('canEraseMessageContentAndUserNames', 'Erase content and author permission fetched from storage');
                resolve(canEraseMessageContentAndUserNames);
            }
        });
    }
    /**
   * Method to set the typing indicator on or off for patron side
   * @param channelId - Id of the channel
   * @param threadIdOnExternalPlatform - Id of the thread on external platform
   * @param typingActionType - action type to set typing indicator on or off
   * @example -
   * ```
   * setTypingIndicatorForPatron('chat_98a533ba-9722-46c3-a909-78f72a0abaa5', '98a533ba-9722-46c3-a909-78f72a0abaa5', true);
   * ```
   */
    setTypingIndicatorForPatron(channelId, threadIdOnExternalPlatform, typingActionType) {
        const baseUrl = this.auth.getCXoneConfig().dfoApiBaseUri;
        const authToken = this.auth.getAuthToken().accessToken;
        const url = baseUrl + this.TYPING_INDICATOR_FOR_PATRON.replace('{channelId}', channelId)
            .replace('{threadIdOnExternalPlatform}', encodeURIComponent(threadIdOnExternalPlatform));
        const reqInit = {
            headers: this.utilService.initHeader(authToken, 'application/json').headers,
            body: { 'action': typingActionType },
        };
        return new Promise((resolve, reject) => {
            HttpClient.post(url, reqInit).then((response) => {
                this.logger.info('setTypingIndicatorForPatron', `Typing indicator ${typingActionType} set successfully`);
                resolve(response);
            }, (error) => {
                const errorResponse = new CXoneSdkError(CXoneSdkErrorType.CXONE_API_ERROR, `Typing indicator ${typingActionType} set failed`, error);
                this.logger.error('setTypingIndicatorForPatron', errorResponse.toString());
                reject(errorResponse);
            });
        });
    }
    /**
     * Method to get the digital websocket URL (as per new DFO Cell Based Architecture)
     * @returns - Base URI of the DFO WebSocket Connection
     * @example - getDigitalWebSocketBaseUri()
     */
    getDigitalWebSocketBaseUri() {
        return __awaiter(this, void 0, void 0, function* () {
            const baseUrl = this.auth.getCXoneConfig().dfoApiBaseUri;
            const authToken = this.auth.getAuthToken().accessToken;
            const url = baseUrl + this.GET_DIGITAL_WEBSOCKET_URL;
            const reqInit = this.utilService.initHeader(authToken);
            return new Promise((resolve, reject) => {
                HttpClient.get(url, reqInit).then((response) => __awaiter(this, void 0, void 0, function* () {
                    const responseData = response.data;
                    resolve(responseData);
                }), (error) => {
                    const errorResponse = new CXoneSdkError(CXoneSdkErrorType.CXONE_API_ERROR, 'Error in getting WebSocket URL from DX API', error);
                    this.logger.error('getDigitalWebSocketBaseUri', errorResponse.toString());
                    reject(errorResponse);
                });
            });
        });
    }
}
//# sourceMappingURL=digital-service.js.map