import { __awaiter } from "tslib";
import { CXoneAuth } from '@nice-devone/auth-sdk';
import { CXoneSdkError, CXoneSdkErrorType, DirectoryEntries, Directories, SearchDirectoriesResponse, DirectoryMetadata, WSCommand, } from '@nice-devone/common-sdk';
import { ApiUriConstants, dbInstance, HttpClient, HttpUtilService, IndexDBKeyNames, IndexDBStoreNames, LocalStorageHelper, Logger, StorageKeys, UrlUtilsService, ValidationUtils, } from '@nice-devone/core-sdk';
import { Subject } from 'rxjs';
import { WSProvider } from './provider/ws-provider';
import { FeatureToggleService } from '../feature-toggle';
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
        /** Method used to update favorite directory entries from client data
         * @example -
         * ```
         * updateFavExtDirEntriesFromClientData();
         * ```
      */
        this.updateFavExtDirEntriesFromClientData = () => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const clientData = LocalStorageHelper.getItem(StorageKeys.CLIENT_DATA, true) || {};
            const favExtDirectoryEntries = (clientData === null || clientData === void 0 ? void 0 : clientData.CXAFavExtDirectory) || [];
            const favExtDirectorySet = new Set(favExtDirectoryEntries);
            const directoryEntries = ((_a = this.searchDirectoriesResponse) === null || _a === void 0 ? void 0 : _a.directoryEntries) || [];
            directoryEntries === null || directoryEntries === void 0 ? void 0 : directoryEntries.forEach((entry) => {
                entry.isFavorite = favExtDirectorySet.has(entry === null || entry === void 0 ? void 0 : entry.userMappingId);
            });
        });
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
     * Used to toggle the favorite marker for external directory and store it in Index DB
     * @param extDirectoryEntries - Information of the external directory of whom favorite field needs to be toggled
     * @example -
     * ```
     * directoryProvider.toggleFavoriteForExternalDirectory(extDirectoryEntries);
     * ```
     */
    toggleFavoriteForExternalDirectory(extDirectoryEntries) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield dbInstance();
            const favExtDirectoryEntriesInDB = (yield (db === null || db === void 0 ? void 0 : db.get(IndexDBStoreNames.DIRECTORY, IndexDBKeyNames.FAVORITE_EXT_DIR_ENTRIES))) || [];
            const toggledExtDirEntryIds = extDirectoryEntries.map(entry => entry === null || entry === void 0 ? void 0 : entry.userMappingId);
            const existingExtDirEntryIds = favExtDirectoryEntriesInDB.map(entry => entry === null || entry === void 0 ? void 0 : entry.userMappingId);
            // Remove toggled entries from favorites
            const entriesToKeep = favExtDirectoryEntriesInDB.filter(entry => !toggledExtDirEntryIds.includes(entry === null || entry === void 0 ? void 0 : entry.userMappingId));
            // Add new toggled entries not already in favorites
            const entriesToAdd = extDirectoryEntries
                .filter(entry => !existingExtDirEntryIds.includes(entry === null || entry === void 0 ? void 0 : entry.userMappingId))
                .map(entry => (Object.assign(Object.assign({}, entry), { isFavorite: true })));
            const updatedExtDirEntries = [...entriesToKeep, ...entriesToAdd];
            yield (db === null || db === void 0 ? void 0 : db.put(IndexDBStoreNames.DIRECTORY, updatedExtDirEntries, IndexDBKeyNames.FAVORITE_EXT_DIR_ENTRIES));
        });
    }
    ;
    /**
   * Used to sort external directory entries based on first name and last name
   *  @param externalDirectoryEntries - array of external directory entries
   * @example -
   * ```
   * sortExternalDirectory(externalDirectoryEntries)
   * ```
   */
    sortExternalDirectory(externalDirectoryEntries) {
        return externalDirectoryEntries.sort((directoryEntryA, directoryEntryB) => {
            var _a, _b, _c;
            return (_b = (_a = ((directoryEntryA === null || directoryEntryA === void 0 ? void 0 : directoryEntryA.firstname) + ' ' + (directoryEntryA === null || directoryEntryA === void 0 ? void 0 : directoryEntryA.lastname))) === null || _a === void 0 ? void 0 : _a.toUpperCase()) === null || _b === void 0 ? void 0 : _b.localeCompare((_c = ((directoryEntryB === null || directoryEntryB === void 0 ? void 0 : directoryEntryB.firstname) + ' ' + (directoryEntryB === null || directoryEntryB === void 0 ? void 0 : directoryEntryB.lastname))) === null || _c === void 0 ? void 0 : _c.toUpperCase());
        });
    }
    /**
   * get filtered External Directory List based on search text
   * @param extDirectories - array of external directory entries
   * @param searchText - search string
   * @example -
   * ```
   * getFilteredExtDirList(searchText, extDirectories)
   * ```
   */
    getFilteredExtDirList(searchText, extDirectories) {
        const extDirResultState = extDirectories.filter(extDirectory => {
            var _a, _b;
            const firstAndLast = (extDirectory === null || extDirectory === void 0 ? void 0 : extDirectory.firstname) + ' ' + (extDirectory === null || extDirectory === void 0 ? void 0 : extDirectory.lastname);
            const lastAndFirst = (extDirectory === null || extDirectory === void 0 ? void 0 : extDirectory.lastname) + ' ' + (extDirectory === null || extDirectory === void 0 ? void 0 : extDirectory.firstname);
            return ((_a = firstAndLast === null || firstAndLast === void 0 ? void 0 : firstAndLast.toUpperCase()) === null || _a === void 0 ? void 0 : _a.includes(searchText)) || ((_b = lastAndFirst === null || lastAndFirst === void 0 ? void 0 : lastAndFirst.toUpperCase()) === null || _b === void 0 ? void 0 : _b.includes(searchText));
        });
        return extDirResultState;
    }
    /**
    * Function to add external directory entries favorite in Index DB from store
    * @param directoryEntries - Array of directory entries to update favorites.
    * @example -
    * ```
    * updateExtDirectoryEntriesFavListInDB(directoryEntries)
    * ```
    */
    updateExtDirectoryEntriesFavListInDB(directoryEntries) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield dbInstance();
            const favExtDirectoryEntriesDB = (yield (db === null || db === void 0 ? void 0 : db.get(IndexDBStoreNames.DIRECTORY, IndexDBKeyNames.FAVORITE_EXT_DIR_ENTRIES))) || [];
            const favExtDirEntryIdsInDB = (favExtDirectoryEntriesDB === null || favExtDirectoryEntriesDB === void 0 ? void 0 : favExtDirectoryEntriesDB.map(extDirectoryEntry => extDirectoryEntry === null || extDirectoryEntry === void 0 ? void 0 : extDirectoryEntry.userMappingId)) || [];
            const updatedFavExtDirectoryEntries = [];
            directoryEntries === null || directoryEntries === void 0 ? void 0 : directoryEntries.forEach((directoryEntry) => {
                if ((directoryEntry === null || directoryEntry === void 0 ? void 0 : directoryEntry.isFavorite) && !(favExtDirEntryIdsInDB.includes(directoryEntry === null || directoryEntry === void 0 ? void 0 : directoryEntry.userMappingId))) {
                    updatedFavExtDirectoryEntries.push(directoryEntry);
                }
            });
            // maintain existing favorites, add newly added favorites from store
            yield (db === null || db === void 0 ? void 0 : db.put(IndexDBStoreNames.DIRECTORY, [...favExtDirectoryEntriesDB, ...updatedFavExtDirectoryEntries], IndexDBKeyNames.FAVORITE_EXT_DIR_ENTRIES));
        });
    }
    /**
   * Used to retrieve external directory entries and filter out favorites
   * @param directoryEntries - array of directory entries to filter
   * @param extDirectoryName - external directory name to filter
   * @returns - returns the filtered favorite external directory entries
   * @example -
   * ```
   * directoryProvider.getFavoritesByExtDirectory(directoryEntries, extDirectoryName);
   * ```
   */
    getFavoritesByExtDirectory(directoryEntries, extDirectoryName) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            this.updateExtDirectoryEntriesFavListInDB(directoryEntries);
            let favExtDirectoryList = [];
            const filteredFav = (directoryEntries === null || directoryEntries === void 0 ? void 0 : directoryEntries.filter((entry) => entry === null || entry === void 0 ? void 0 : entry.isFavorite)) || [];
            favExtDirectoryList = filteredFav;
            if ((extDirectoryName === null || extDirectoryName === void 0 ? void 0 : extDirectoryName.length) > 0) {
                favExtDirectoryList = [];
                const filteredExtDirSearchList = this.getFilteredExtDirList(extDirectoryName.toUpperCase(), directoryEntries);
                favExtDirectoryList = (_a = this.sortExternalDirectory(filteredExtDirSearchList)) === null || _a === void 0 ? void 0 : _a.filter((entry) => entry === null || entry === void 0 ? void 0 : entry.isFavorite);
            }
            return favExtDirectoryList;
        });
    }
    /**
     * Method is used to search directories
     * @param searchDirectoriesRequest -- pass the SearchDirectoriesRequest type object
     * @returns - return object of type SearchDirectoriesResponse. Containing filtered directories based on search parameter
     * @example -
     * ```
     * searchDirectories(searchDirectoriesRequest)
     * ```
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
                const isFavoritesFTEnabled = FeatureToggleService.instance.getFeatureToggleSync("release-cxa-favorites-AW-40314" /* FeatureToggles.CXA_FAVORITES_FEATURE_TOGGLE */);
                if (isFavoritesFTEnabled) {
                    this.updateFavExtDirEntriesFromClientData();
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