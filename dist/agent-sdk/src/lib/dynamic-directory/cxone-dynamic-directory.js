import { CXoneAuth } from '@nice-devone/auth-sdk';
import { CXoneSdkError, CXoneSdkErrorType, DirectoryEntries, Directories, SearchDirectoriesResponse, DirectoryMetadata, WSCommand, } from '@nice-devone/common-sdk';
import { ApiUriConstants, HttpClient, HttpUtilService, Logger, UrlUtilsService, ValidationUtils, } from '@nice-devone/core-sdk';
import { Subject } from 'rxjs';
import { WSProvider } from './provider/ws-provider';
/** This is the base class for Dynamic Directory*/
export class CXoneDynamicDirectory {
    /**
     * Create instance for dynamic directory session and initialize it
     * @example
     * ```
     * new CXoneDynamicDirectory();
     * ```
     */
    constructor() {
        this.logger = new Logger('SDK', 'CXoneDynamicDirectory');
        this.validationUtils = new ValidationUtils();
        this.utilService = new HttpUtilService();
        this.urlUtilsService = new UrlUtilsService();
        this.wsProvider = new WSProvider(this);
        this.currentSearchDirectoriesRequest = {};
        this.searchDirectoriesResponse = new SearchDirectoriesResponse();
        this.onMessageReceived = new Subject();
        this.searchDirectoryResult = new Subject();
        this.directory = 'Directory';
        this.auth = CXoneAuth.instance;
    }
    /**
     * Method used to get all directory entries
     * @param directoryId - Directory id for which we need to get metadata
     * @param agentId - Agent id for which directories are fetched
     * @param startIndex - start index for pagination
     * @param totalRecords - total records to be fetched
     * @returns - return the directory entries list
     * ```
     * @example
     * getDirectoryEntries('11eb3f87', '1124893d', 0, 25)
     * ```
     */
    getDirectoryEntries(directoryId, agentId, startIndex = 0, totalRecords = 25) {
        return new Promise((resolve, reject) => {
            const token = this.auth.getAuthToken();
            const reqInit = this.utilService.initHeader(token.accessToken, 'application/json');
            const queryParams = { skip: startIndex, top: totalRecords };
            const cxOneConfig = this.auth.getCXoneConfig();
            let directoryEntriesUrl = cxOneConfig.apiFacadeBaseUri +
                ApiUriConstants.DIRECTORY_ENTRIES.replace('{agentId}', agentId).replace('{directoryId}', directoryId);
            directoryEntriesUrl = this.urlUtilsService.appendQueryString(directoryEntriesUrl, queryParams);
            if (this.validationUtils.isNotNullOrEmpty(agentId)) {
                HttpClient.get(directoryEntriesUrl, reqInit).then((resp) => {
                    this.logger.info('getDirectoryEnatries', 'Get directory entries Success');
                    const entry = new DirectoryEntries();
                    resp.data.startIndex = startIndex;
                    resp.data.totalRecords = totalRecords;
                    entry.parse(resp.data);
                    resolve(entry);
                }, (err) => {
                    var _a;
                    this.logger.error('getDirectoryEntries', 'Get directory entries Failed ' + JSON.stringify(err));
                    reject(new CXoneSdkError(CXoneSdkErrorType.CXONE_API_ERROR, (_a = err === null || err === void 0 ? void 0 : err.data) === null || _a === void 0 ? void 0 : _a.message, err === null || err === void 0 ? void 0 : err.data));
                });
            }
            else {
                this.logger.error('getDirectoryEntries', 'agentId is empty');
                reject(new CXoneSdkError(CXoneSdkErrorType.INVALID_METHOD_INVOCATION, 'agentId is empty'));
            }
        });
    }
    /**
     * Method used to get directories
     * @param agentId - Agent id for which directories are fetched
     * @param startIndex - start index for pagination
     * @param totalRecords - total records to be fetched
     * @returns - return the list of directories
     * ```
     * @example
     * getDirectories(1234,0,25)
     * This will get directories from 0 to 25 for agent id 1234
     * ```
     */
    getDirectories(agentId, startIndex = 0, totalRecords = 25) {
        return new Promise((resolve, reject) => {
            const cxOneConfig = this.auth.getCXoneConfig();
            const authToken = this.auth.getAuthToken();
            const getDirectoriesUri = ApiUriConstants.GET_DIRECTORIES;
            const queryParams = { skip: startIndex, top: totalRecords };
            let getDirectoriesUrl = cxOneConfig.apiFacadeBaseUri +
                getDirectoriesUri.replace('{agentId}', agentId);
            const reqInit = this.utilService.initHeader(authToken.accessToken, 'application/json');
            getDirectoriesUrl = this.urlUtilsService.appendQueryString(getDirectoriesUrl, queryParams);
            if (this.validationUtils.isNotNullOrEmpty(agentId)) {
                HttpClient.get(getDirectoriesUrl, reqInit).then((response) => {
                    this.logger.info('getDirectories', 'getDirectories success:-' + response.toString());
                    const directoryResoponse = new Directories();
                    response.data.startIndex = startIndex;
                    response.data.totalRecords = totalRecords;
                    directoryResoponse.parse(response.data);
                    resolve(directoryResoponse);
                }, (error) => {
                    var _a;
                    this.logger.error('getDirectories', 'getDirectories failed:-' + error.toString());
                    reject(new CXoneSdkError(CXoneSdkErrorType.CXONE_API_ERROR, (_a = error === null || error === void 0 ? void 0 : error.data) === null || _a === void 0 ? void 0 : _a.message, error === null || error === void 0 ? void 0 : error.data));
                });
            }
            else {
                this.logger.error('getDirectories', 'agentId is empty');
                reject(new CXoneSdkError(CXoneSdkErrorType.INVALID_METHOD_INVOCATION, 'agentId is empty'));
            }
        });
    }
    /** Method used to get Directory metadata
     * @param directoryId - Directory id for which we need to get metadata
     * @param agentId - Agent id for which directories are fetched
     * @returns - return the directory metadata
     * @example
     * ```
     * getDirectoryMetadata(5678, 1234);
     * ```
     * This will get directory metadata for agent id 1234 and directory id 5678
     *
     */
    getDirectoryMetadata(directoryId, agentId) {
        return new Promise((resolve, reject) => {
            const token = this.auth.getAuthToken();
            const reqInit = this.utilService.initHeader(token.accessToken, 'application/json');
            const cxOneConfig = this.auth.getCXoneConfig();
            const directoryMetaDataUrl = cxOneConfig.apiFacadeBaseUri +
                ApiUriConstants.GET_DIRECTORY_METADATA.replace('{agentId}', agentId).replace('{directoryId}', directoryId);
            if (this.validationUtils.isNotNullOrEmpty(agentId)) {
                HttpClient.get(directoryMetaDataUrl, reqInit).then((resp) => {
                    this.logger.info('getDirectoryMetadata', 'Get directory Metadata Success');
                    const metadata = new DirectoryMetadata();
                    metadata.parse(resp.data);
                    resolve(metadata);
                }, (err) => {
                    var _a;
                    this.logger.error('getDirectoryMetadata', 'Get directory Metadata Failed ' + JSON.stringify(err));
                    reject(new CXoneSdkError(CXoneSdkErrorType.CXONE_API_ERROR, (_a = err === null || err === void 0 ? void 0 : err.data) === null || _a === void 0 ? void 0 : _a.message, err === null || err === void 0 ? void 0 : err.data));
                });
            }
            else {
                this.logger.error('getDirectoryMetadata', 'agentId is empty');
                reject(new CXoneSdkError(CXoneSdkErrorType.INVALID_METHOD_INVOCATION, 'agentId is empty'));
            }
        });
    }
    /**
     * Method is used to serach directories
     * @param searchDirectoriesRequest -- pass the SearchDirectoriesRequest type object
     * @returns - return object of type SearchDirectoriesResponse. Containing filtered directories based on search parameter
     * ```
     * @example --
     * const searchDirectoriesRequest:SearchDirectoriesRequest = \{
     * \{
     *"subscriptionId": "subscriptionId",
     *"searchString": "firstname lastname",
     *"realTimeUpdates": true/false,
     *"skip": 0,
     *"top": 50,
     *"directoryUUID": "directoryUUID"
     *"filter": \{
     *    "partnerType": [
     *     "Zoom"
     *  ],
     *   "fieldType": [
     *        "email"
     *     ]
     *\}
     *\}
     *\}
     *```
     */
    searchDirectories(searchDirectoriesRequest) {
        this.currentSearchDirectoriesRequest = searchDirectoriesRequest;
        const cxOneConfig = this.auth.getCXoneConfig();
        const authToken = this.auth.getAuthToken();
        const searchDirectoriesUri = ApiUriConstants.SEARCH_DIRECTORIES;
        const searchDirectoriesUrl = cxOneConfig.apiFacadeBaseUri + searchDirectoriesUri;
        const requestBody = {
            subscriptionId: this.validationUtils.isNotNullOrEmpty(searchDirectoriesRequest.subscriptionId)
                ? searchDirectoriesRequest.subscriptionId
                : null,
            searchString: searchDirectoriesRequest.searchString,
            realTimeUpdates: searchDirectoriesRequest.realTimeUpdates,
            skip: searchDirectoriesRequest.skip,
            top: searchDirectoriesRequest.top,
            directoryUUID: this.validationUtils.isNotNullOrEmpty(searchDirectoriesRequest.directoryUUID)
                ? searchDirectoriesRequest.directoryUUID
                : null,
            filter: {
                partnerType: this.validationUtils.isNotNullOrEmptyArray(searchDirectoriesRequest.partnerType)
                    ? searchDirectoriesRequest.partnerType
                    : null,
                fieldType: this.validationUtils.isNotNullOrEmptyArray(searchDirectoriesRequest.fieldType)
                    ? searchDirectoriesRequest.fieldType
                    : null,
            },
        };
        const reqInit = {
            headers: this.utilService.initHeader(authToken.accessToken, 'application/json').headers,
            body: requestBody,
        };
        if (this.validationUtils.isNotNullOrEmpty(searchDirectoriesRequest.realTimeUpdates) &&
            this.validationUtils.isNotNullOrEmpty(searchDirectoriesRequest.skip) &&
            this.validationUtils.isNotNullOrEmpty(searchDirectoriesRequest.top)) {
            HttpClient.post(searchDirectoriesUrl, reqInit).then((response) => {
                this.logger.info('searchDirectories', 'searchDirectories success:-' + response.toString());
                this.searchDirectoriesResponse.parse(response.data);
                if (searchDirectoriesRequest.realTimeUpdates) {
                    this.currentSearchDirectoriesRequest.subscriptionId =
                        this.searchDirectoriesResponse.subscriptionId;
                    this.wsProvider.connectSocket();
                    this.socketMessageHandler();
                }
                this.publishFinalDynamicDirectoryResponse(this.searchDirectoriesResponse);
                return;
            }, (error) => {
                this.logger.error('searchDirectories', 'searchDirectories failed:-' + error.toString());
                const errorSearchResult = new SearchDirectoriesResponse();
                errorSearchResult.error = error;
                this.publishFinalDynamicDirectoryResponse(errorSearchResult);
                return;
            });
        }
        else {
            this.logger.error('searchDirectories', 'All mendatory inputs are not provided');
            const errorSearchResult = new SearchDirectoriesResponse();
            errorSearchResult.error = new CXoneSdkError(CXoneSdkErrorType.INVALID_METHOD_PARMS, 'All mendatory inputs are not provided');
            this.publishFinalDynamicDirectoryResponse(errorSearchResult);
            return;
        }
    }
    /**
     * Use get the selected tab
     * @example
     * ```
     * this.setSelectedTabs();
     * ```
     */
    setSelectedTabs(appSpaceSelectedTab, globalSelectedTab) {
        if (appSpaceSelectedTab !== this.directory && globalSelectedTab !== this.directory) {
            this.wsProvider.unsubscribeSearch(this.searchDirectoriesResponse.subscriptionId);
        }
    }
    /**
     * Use set the dom visibility
     * @example
     * ```
     * this.setDomVisibility();
     * ```
     */
    setDomVisibility(domVisibility) {
        if (!domVisibility) {
            this.wsProvider.unsubscribeSearch(this.searchDirectoriesResponse.subscriptionId);
        }
    }
    /**
     * Method used to end WebSocket dynamic directory serach
     * @example
     * ```
     * this.endDirectoriesSearch();
     * ```
     */
    endDirectoriesSearch(subscriptionId) {
        this.wsProvider.unsubscribeSearch(subscriptionId);
    }
    /**
     * Method used to connect the WebSocket
     * @example
     * ```
     * this.connectSocket();
     * ```
     */
    socketMessageHandler() {
        this.messageReceivedSubscription = this.onMessageReceived.subscribe((message) => {
            var _a, _b;
            switch (message.command) {
                case WSCommand.CONNECTED: {
                    this.wsProvider.subscribeSearch(((_a = this.currentSearchDirectoriesRequest) === null || _a === void 0 ? void 0 : _a.subscriptionId)
                        ? (_b = this.currentSearchDirectoriesRequest) === null || _b === void 0 ? void 0 : _b.subscriptionId
                        : '');
                    break;
                }
                case WSCommand.RECONNECTED: {
                    this.searchDirectories(this.currentSearchDirectoriesRequest);
                    break;
                }
                case WSCommand.UNSUBSCRIBED: {
                    this.wsProvider.close();
                    this.messageReceivedSubscription.unsubscribe();
                    break;
                }
                case WSCommand.MESSAGE: {
                    const mergedResult = this.mergeSearchResults(message);
                    this.searchDirectoriesResponse.error = null;
                    this.publishFinalDynamicDirectoryResponse(mergedResult);
                    break;
                }
                case WSCommand.ERROR: {
                    this.logger.error('cxone-dynamic-directory', message.body.error);
                    this.searchDirectoriesResponse.error = message.body.error;
                    this.publishFinalDynamicDirectoryResponse(this.searchDirectoriesResponse);
                    break;
                }
            }
        });
    }
    /**
     * Method used to connect the WebSocket
     * @example
     * ```
     * this.connectSocket();
     * ```
     */
    mergeSearchResults(message) {
        const presenceOrder = {
            Green: 3,
            Red: 4,
            Yellow: 2,
            Grey: 1,
        };
        let currentStatus = 0;
        this.searchDirectoriesResponse.directoryEntries.forEach((data) => {
            if (data.userMappingId === message.body.dynamicUserMappingId) {
                data.unifiedSocketStatus = message.body.unifiedStatus;
                data.attributes = data.attributes.map((entities) => {
                    if (entities.fieldType === 'presence') {
                        if (entities.partnerType === message.body.partnerPlatform) {
                            entities = Object.assign(Object.assign({}, entities), { value: message.body.dirSyncPresenceStatusColor });
                        }
                        const state = entities.value;
                        if (currentStatus < presenceOrder[state]) {
                            currentStatus = presenceOrder[state];
                            data.unifiedStatus = entities.value;
                        }
                    }
                    return entities;
                });
            }
        });
        return this.searchDirectoriesResponse;
    }
    /**
     * Method used to update subject with directory search response
     * @example
     * ```
     * this.publishFinalDynamicDirectoryResponse();
     * ```
     */
    publishFinalDynamicDirectoryResponse(data) {
        this.searchDirectoryResult.next(data);
    }
}
//# sourceMappingURL=cxone-dynamic-directory.js.map