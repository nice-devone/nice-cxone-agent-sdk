import { CcfLogger } from '@nice-devone/agent-sdk';
import { HttpResponse, CXoneDigitalChannel, UserSlots, CXoneAttachment, FavQuickReply, ReactionType, CustomField, ContactHistory, ExternalPlatformTemplatesSchema, CXoneDigitalContactSearchRequest, CXoneDigitalContactSearchObject, CXoneRoutingQueue, CXoneDigitalMessageTagArray, CXoneDigitalQuickReply, CXoneDigitalCustomerSearchRequest, CXoneDigitalCustomerSearchDetails, CXoneDigitalMessageSearchRequest, CXoneDigitalMessageSearchDetails, CXoneDigitalThreadSearchRequest, CXoneDigitalThreadSearchDetails, CXoneDigitalTranslationLanguages, CXoneDigitalTranslationApiRequest, CXoneDigitalTranslationApiResponse, TypingIndicatorActions, DigitalEventHubResponse, CXoneDigitalOutboundQuickReply } from '@nice-devone/common-sdk';
import { HttpUtilService, IndexDBStoreNames, IndexDBKeyNames } from '@nice-devone/core-sdk';
import { DigitalContactService } from './digital-contact-service';
/**
 * Service to handle generic digital API calls
 */
export declare class DigitalService {
    logger: CcfLogger;
    protected utilService: HttpUtilService;
    private auth;
    private urlUtilsService;
    private UPDATE_MESSAGE_REACTION;
    private UPDATE_CASE_CUSTOM_FIELD;
    private EXTERNAL_PLATFORM_TEMPLATE_URI;
    private ROUTING_QUEUES_URI;
    private FORM_SUBMISSION;
    private QUICK_RESPONSES;
    private GET_CUSTOMER_DETAILS;
    private GET_MESSAGES_LIST;
    private GET_THREADS_LIST;
    private DELETE_MESSAGE_AUTHOR_NAME;
    private DELETE_MESSAGE_CONTENT;
    private ERASE_MESSAGE_AUTHOR_NAME;
    private TYPING_INDICATOR_FOR_PATRON;
    private GET_DIGITAL_WEBSOCKET_URL;
    cachedLanguageTranslations: CXoneDigitalTranslationLanguages | undefined;
    private MARK_QUICK_RESPONSE_AS_FAVORITE;
    digitalContactService: DigitalContactService;
    /**
     * @example
     * ```
     * const digitalSvc = new DigitalService();
     * ```
     */
    constructor();
    /**
     * Method to get all digital channels
     * @returns - Map of all digital channels
     * @example - getAllChannels(true)
     */
    getAllChannels(forceFetch?: boolean): Promise<Map<string, CXoneDigitalChannel>>;
    /**
     * Method to invoke API for getting digital Outbound channels
     * @returns
     * @example -
     */
    private invokeOBChannelAPI;
    /**
     * Method to get digital Outbound channels
     * @returns
     * @example -
     * @param forceApiCall - Forcefully invoke the API for Outbound Channels
     */
    getOBChannels(forceApiCall?: boolean): Promise<Array<CXoneDigitalChannel>>;
    /**
     * Method to get user slot details
     * @returns
     * @example -
     */
    getDigitalUserDetails(): Promise<HttpResponse>;
    /**
     * Method to get user slot details
     * @returns
     * @example -
     */
    getUserSlotDetails(): Promise<UserSlots>;
    /**
     * Method to parse date in required format
     * @returns - Method returns parsed date in 'mm/dd/yyyy
     * @example - Pass 1 parameter date
     */
    getRequiredDateFormat(date: string): string;
    /**
     * Method to fetch Contact History
     * @returns - API Returns contact History details for the customer
     * @example - Pass 2 parameter customerId & scrollToken for fetching
     * contact history based on scrollToken value.
     */
    getContactHistory(customerId: string, scrollToken?: string): Promise<ContactHistory>;
    /**
     * Get attachment using securedPermanentUrl for digital contact
     * @returns - downloaded file
     * @example
     * ```
     * getAttachment(attachment)
     * ```
     */
    getAttachment(attachment: CXoneAttachment): Promise<File>;
    /**
     * Get attachment using securedPermanentUrl for digital contact
     * Few channels like Instagram require no token due to open CDN
     * @returns - blob response of file
     * @example
     * ```
     * downloadAttachment(url, isTokenRequired)
     * ```
     */
    downloadAttachment(url: string, isTokenRequired?: boolean): Promise<HttpResponse>;
    /**
     * Get all attachment for digital contact
     * @param attachmentIds - list of attachment ids
     * @returns - blob response of file
     * @example
     * ```
     * downloadAllAttachment(['5846adee-70de-4463-9755-ef23d006b67d','3fc84c90-3301-11ef-a1bf-c739f8d018c2'])
     * ```
     */
    downloadAllAttachment(attachmentIds: string[]): Promise<HttpResponse>;
    /**
     * Method to get fav quick Replies
     * @returns
     * @example -getFavQuickReplies(true)
     * @param isOutbound - represents outbound or not
     */
    getFavQuickReplies(isOutbound: boolean): Promise<Array<FavQuickReply>>;
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
    putFavQuickReplies(favQRObjects: FavQuickReply[], idbStoreName: typeof IndexDBStoreNames[keyof typeof IndexDBStoreNames], idbKeyName: typeof IndexDBKeyNames[keyof typeof IndexDBKeyNames]): Promise<void>;
    /**
     * Method to unmark a quickReply as favorite
     * @returns
     * @example -unmarkFavQuickReplies(reply, true)
     * @param favQReply - represents current reply
     * @param isOutbound - represents outbound or not
     */
    unmarkFavQuickReplies(favQReply: FavQuickReply, isOutbound: boolean): Promise<void>;
    /**
     * Method to mark a quickReply as favorite
     * @returns
     * @example -markFavQuickReplies(reply, true)
     * @param favQReply - represents current reply
     * @param isOutbound - represents outbound or not
     */
    markFavQuickReplies(favQReply: FavQuickReply, isOutbound: boolean): Promise<void>;
    /**
     * Method to clear Quick Replies
     * @example
     * ```
     * clearFavQuickReplies()
     * ```
     */
    clearFavQuickReplies(): Promise<void>;
    /**
     * Method to return the Digital agent status id
     * @example
     * ```
     * this.getDigitalAgentStatus()
     * ```
     */
    getDigitalAgentStatus(): Promise<unknown>;
    /**
     * Method to add message reaction
     * @param messageId - Id of the message
     * @param reactionType -  reaction type eg. - like/ smile/ laugh etc
     * @example - addMessageReaction('b2ebad83-f9c2-489f-8441-3868e00b8099', 'like');
     */
    addMessageReaction(messageId: string, reactionType?: ReactionType): Promise<HttpResponse>;
    /**
     * Method to remove message reaction
     * @param messageId - Id of the message
     * @param reactionType -  reaction type eg. - like/ smile/ laugh etc
     * @example - removeMessageReaction('b2ebad83-f9c2-489f-8441-3868e00b8099', 'like');
     */
    removeMessageReaction(messageId: string, reactionType?: ReactionType): Promise<HttpResponse>;
    /**
     * Method to get all routing queues
     * @returns - routing queue list
     * @example - getAllRoutingQueues()
     */
    getAllRoutingQueues(forceFetch?: boolean): Promise<CXoneRoutingQueue[]>;
    /**
     * Method will add extra required parameters after getting contact search response
     * @returns - contact search with additional fields like skillName, channelName etc..
     * @param forceFetchChannel - boolean flag to force fetch channels.
     * @param forceFetchRoutingQueue - boolean flag to force fetch routing queues.
     * @example - additionalFieldsInContactSearchResponse(true, true)
     */
    private additionalFieldsInContactSearchResponse;
    /**
     * Method will add extra required parameters after getting message search response
     * @returns - message search with additional fields like channelName,channelType etc..
     * @param forceFetchChannel - boolean flag to force fetch channels.
     * @example - additionalFieldsInMessageSearchResponse(true, true)
     */
    private additionalFieldsInMessageSearchResponse;
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
    getDigitalContactSearchResult(searchRequest: CXoneDigitalContactSearchRequest, forceFetchChannel?: boolean, forceFetchRoutingQueue?: boolean): Promise<CXoneDigitalContactSearchObject>;
    /**
     * Method to update all custom fields for Case
     * @returns - API Returns Response code with success or failure
     * @example -
     */
    updateCaseCustomFields(customFields: CustomField): Promise<HttpResponse>;
    /**
     * Method to get External Platform Templates for channels like whatsapp
     * @returns - List of templates
     * @param channelId -  channel Id for which external template is configured
     * @example - digitalService.getExternalPlatformTemplates('ind_whatsapp_62c689b998f02300efd28845')
     */
    getExternalPlatformTemplates(channelId: string): Promise<Array<ExternalPlatformTemplatesSchema>>;
    /**
     * Method to addDigitalMessageTag
    * @param messageId -
    * @param tagId -
     * @returns response from API
     * @example addDigitalMessageTag('c4d4b459-8ddc-4a2a-9c5f-a9a85371df73', '8696')
    */
    addDigitalMessageTag(messageId: string, tagId: string): Promise<HttpResponse>;
    /**
    * Method to deleteDigitalMessageTag
    * @param messageId -
    * @param tagId -
    * @returns response from API
    * @example deleteDigitalMessageTag('c4d4b459-8ddc-4a2a-9c5f-a9a85371df73', '8696')
   */
    deleteDigitalMessageTag(messageId: string, tagId: string): Promise<HttpResponse>;
    /**
    * Method to getDigitalMessageTagByName
    * @param tagName -
    * @param pageNumber -
    * @returns response from API
    * @example getDigitalMessageTagByName('Test', '1')
   */
    getDigitalMessageTagByName(tagName: string, pageNumber: string): Promise<HttpResponse>;
    /**
    * Method to getDigitalMessageTagByName
    * @param tagName -
    * @param pageNumber -
    * @returns response from API
    * @example getDigitalMessageTagsByPage('1')
   */
    getDigitalMessageTagsByPage(pageNumber: number): Promise<HttpResponse>;
    /**
    * Method to getDigitalMessageTags
    * @param tagId -
    * @returns response from API
    * @example getDigitalMessageTags()
   */
    getDigitalMessageTags(): Promise<CXoneDigitalMessageTagArray>;
    /**
     * Method to get quick responses includes secure forms, rich text & quick replies
     * @param channels - channel ids to be passed to get channel specific list (optional)
     * @returns - list of all types of quick responses
     * @example - digitalService.getQuickResponses()
     */
    getQuickResponses(channels?: string[]): Promise<Array<CXoneDigitalQuickReply>>;
    /**
     * Method to mark or unmark a quickResponse as favorite
     * @param quickResponseId - Id of the quick response to be marked as favorite
     * @param isMarkedAsFavorite - boolean flag to mark or unmark as favorite
     * @example - digitalService.markQuickResponseAsFavorite(1234)
     */
    toggleFavoriteQuickResponse(quickResponseId: number, isMarkedAsFavorite: boolean): Promise<HttpResponse>;
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
    getUnifiedQuickResponses(channels?: string[], skills?: number[], page?: number, limit?: number, search?: string, isFavorite?: boolean): Promise<CXoneDigitalOutboundQuickReply>;
    /**
     * Method to create URL link to secure form,
     * URL created after this api call will be used to sent to the customer by agent using editor.
     * @returns - Generated Secure Form link to be shared with Customer
     * @param formId -  form Id selected from form list
     * @param contactNumber -  contact number of customer
     * @example - digitalService.createSecureFormLink('ind_62c689b998f02300efd28845', '1234')
     */
    createSecureFormLink(formId: string, contactNumber: string): Promise<HttpResponse>;
    /**
     * Method to get customers list
     * @returns - customers list (default returns 20 records at a time with each scroll token pagination)
     * @param scrollToken -  optional parameter for pagination support to customer list
     * @example -
     * ```
     * getDigitalCustomerSearchResult('MjAyMC0w');
     * ```
     */
    getDigitalCustomerSearchResult(searchRequest: CXoneDigitalCustomerSearchRequest): Promise<CXoneDigitalCustomerSearchDetails>;
    /**
     * Method to get messages list based on provided query parameters on interaction search
     * @returns - messages list
     * @param searchRequest - search query containing channel, read status, agent etc.
     * @example -
     * ```
     * getDigitalMessageSearchResult(searchRequest);
     * ```
     */
    getDigitalMessageSearchResult(searchRequest: CXoneDigitalMessageSearchRequest, forceFetchChannel?: boolean): Promise<CXoneDigitalMessageSearchDetails>;
    /**
     * Method to get threads list based on provided query parameters on interaction search
     * @returns - threads list
     * @param searchRequest - search query containing channel, from/to date
     * @example -
     * ```
     * getDigitalThreadSearchResult(searchRequest);
     * ```
     */
    getDigitalThreadSearchResult(searchRequest: CXoneDigitalThreadSearchRequest): Promise<CXoneDigitalThreadSearchDetails>;
    /**
     * Method to get available languages for translation
     * @returns - languages
     * @param none -
     * @example -
     * ```
     * getDigitalAvailableLanguagesForTranslation();
     * ```
     */
    getDigitalAvailableLanguagesForTranslation: () => Promise<CXoneDigitalTranslationLanguages>;
    translateMessages: (messages: Array<Omit<CXoneDigitalTranslationApiRequest, 'id'>>, timeoutInMs?: number) => Promise<CXoneDigitalTranslationApiResponse>;
    /**
     * Method to delete message author name
     * @param messageId - Id of the message
     * @example -
     * ```
     * deleteMessageAuthorName('b2ebad83-f9c2-489f-8441-3868e00b8099');
     * ```
     */
    deleteMessageAuthorName(messageId: string): Promise<HttpResponse>;
    /**
     * Method to delete message content
     * @param messageId - Id of the message
     * @example -
     * ```
     * deleteMessageContent('b2ebad83-f9c2-489f-8441-3868e00b8099');
     * ```
     */
    deleteMessageContent(messageId: string): Promise<HttpResponse>;
    /**
     * Method to get can erase Message Content And UserNames flag
     * @example -
     * ```
     * getCanEraseMessageContentAndUserNames();
     * ```
     */
    getCanEraseMessageContentAndUserNames(): Promise<boolean>;
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
    setTypingIndicatorForPatron(channelId: string, threadIdOnExternalPlatform: string, typingActionType: TypingIndicatorActions): Promise<HttpResponse>;
    /**
     * Method to get the digital websocket URL (as per new DFO Cell Based Architecture)
     * @returns - Base URI of the DFO WebSocket Connection
     * @example - getDigitalWebSocketBaseUri()
     */
    getDigitalWebSocketBaseUri(): Promise<DigitalEventHubResponse>;
}
