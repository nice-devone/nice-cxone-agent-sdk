import { __awaiter } from "tslib";
import { CXoneAuth } from '@nice-devone/auth-sdk';
import { CXoneSdkError, CXoneSdkErrorType, DirectoryEntries, Directories, SearchDirectoriesResponse, DirectoryMetadata, WSCommand, } from '@nice-devone/common-sdk';
import { ApiUriConstants, dbInstance, HttpClient, HttpUtilService, IndexDBKeyNames, IndexDBStoreNames, LocalStorageHelper, Logger, StorageKeys, UrlUtilsService, ValidationUtils, } from '@nice-devone/core-sdk';
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
        this.newGenWsProvider = new WSProvider(this);
        this.currentSearchDirectoriesRequest = {};
        this.searchDirectoriesResponse = new SearchDirectoriesResponse();
        this.searchNewGenDirectoriesResponse = new SearchDirectoriesResponse();
        this.onMessageReceived = new Subject();
        this.onNewGenMessageReceived = new Subject();
        this.searchDirectoryResult = new Subject();
        this.searchNewGenDirectoryResult = new Subject();
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
        /** Method used to update favorite directory entries from client data
         * @example -
         * ```
         * updateFavNewGenDirEntriesFromClientData();
         * ```
      */
        this.updateFavNewGenDirEntriesFromClientData = () => __awaiter(this, void 0, void 0, function* () {
            var _b;
            const clientData = LocalStorageHelper.getItem(StorageKeys.CLIENT_DATA, true) || {};
            const favNewGenDirectoryEntries = (clientData === null || clientData === void 0 ? void 0 : clientData.CXAFavNewGenDirectory) || [];
            const favNewGenDirectorySet = new Set(favNewGenDirectoryEntries);
            const directoryEntries = ((_b = this.searchNewGenDirectoriesResponse) === null || _b === void 0 ? void 0 : _b.directoryEntries) || [];
            directoryEntries === null || directoryEntries === void 0 ? void 0 : directoryEntries.forEach((entry) => {
                var _a, _b;
                const userId = (_b = (_a = entry === null || entry === void 0 ? void 0 : entry.attributes) === null || _a === void 0 ? void 0 : _a.find((attr) => attr.profileType === 'UserId')) === null || _b === void 0 ? void 0 : _b.value;
                entry.isFavorite =
                    typeof userId === 'string' && favNewGenDirectorySet.has(userId);
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
    /**
     * Method used to get new gen directories
     * @param agentId - Agent id for which directories are fetched
     * @param startIndex - start index for pagination
     * @param totalRecords - total records to be fetched
     * @returns - return the list of new gen directories
     * ```
     * @example
     * getNewGenDirectories(1234,0,25)
     * This will get new gen directories from 0 to 25 for agent id 1234
     * ```
     */
    getNewGenDirectories(agentId, startIndex = 0, totalRecords = 25) {
        return new Promise((resolve, reject) => {
            const cxOneConfig = this.auth.getCXoneConfig();
            const authToken = this.auth.getAuthToken();
            const getNewGenDirectoriesUri = ApiUriConstants.GET_NEWGEN_DIRECTORIES;
            const queryParams = { skip: startIndex, top: totalRecords };
            let getNewGenDirectoriesUrl = cxOneConfig.apiFacadeBaseUri + getNewGenDirectoriesUri;
            const reqInit = this.utilService.initHeader(authToken.accessToken, 'application/json');
            getNewGenDirectoriesUrl = this.urlUtilsService.appendQueryString(getNewGenDirectoriesUrl, queryParams);
            if (this.validationUtils.isNotNullOrEmpty(agentId)) {
                HttpClient.get(getNewGenDirectoriesUrl, reqInit).then((response) => {
                    this.logger.info('getNewGenDirectories', 'getNewGenDirectories success:-' + response.toString());
                    response.data.startIndex = startIndex;
                    response.data.totalRecords = totalRecords;
                    resolve(response.data);
                }, (error) => {
                    var _a;
                    this.logger.error('getNewGenDirectories', 'getNewGenDirectories failed:-' + error.toString());
                    reject(new CXoneSdkError(CXoneSdkErrorType.CXONE_API_ERROR, (_a = error === null || error === void 0 ? void 0 : error.data) === null || _a === void 0 ? void 0 : _a.message, error === null || error === void 0 ? void 0 : error.data));
                });
            }
            else {
                this.logger.error('getNewGenDirectories', 'agentId is empty');
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
     * Used to toggle the favorite marker for newgen directory and store it in Index DB
     * @param newGenDirectoryEntries - Information of the newgen directory of whom favorite field needs to be toggled
     * @example -
     * ```
     * directoryProvider.toggleFavoriteForNewGenDirectory(newGenDirectoryEntries);
     * ```
     */
    toggleFavoriteForNewGenDirectory(newGenDirectoryEntries) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield dbInstance();
            const favNewGenDirectoryEntriesInDB = (yield (db === null || db === void 0 ? void 0 : db.get(IndexDBStoreNames.DIRECTORY, IndexDBKeyNames.FAVORITE_NEWGEN_DIR_ENTRIES))) || [];
            const toggledNewGenDirEntryIds = newGenDirectoryEntries === null || newGenDirectoryEntries === void 0 ? void 0 : newGenDirectoryEntries.map(entry => entry === null || entry === void 0 ? void 0 : entry.userMappingId);
            const existingNewGenDirEntryIds = favNewGenDirectoryEntriesInDB === null || favNewGenDirectoryEntriesInDB === void 0 ? void 0 : favNewGenDirectoryEntriesInDB.map(entry => entry === null || entry === void 0 ? void 0 : entry.userMappingId);
            // Remove toggled entries from favorites
            const entriesToKeep = favNewGenDirectoryEntriesInDB.filter(entry => !toggledNewGenDirEntryIds.includes(entry === null || entry === void 0 ? void 0 : entry.userMappingId));
            // Add new toggled entries not already in favorites
            const entriesToAdd = newGenDirectoryEntries
                .filter(entry => !existingNewGenDirEntryIds.includes(entry === null || entry === void 0 ? void 0 : entry.userMappingId))
                .map(entry => (Object.assign(Object.assign({}, entry), { isFavorite: true })));
            const updatedNewGenDirEntries = [...entriesToKeep, ...entriesToAdd];
            yield (db === null || db === void 0 ? void 0 : db.put(IndexDBStoreNames.DIRECTORY, updatedNewGenDirEntries, IndexDBKeyNames.FAVORITE_NEWGEN_DIR_ENTRIES));
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
   * Used to sort new gen directory entries based on first name and last name
   *  @param newGenDirectoryEntries - array of new gen directory entries
   * @example -
   * ```
   * sortNewGenDirectory(newGenDirectoryEntries)
   * ```
   */
    sortNewGenDirectory(newGenDirectoryEntries) {
        /**
         * Returns the attribute value for the given field from NewGen directory attributes
         *
         * @param entry - Directory entry
         * @param field - Attribute field type
         * @returns Attribute value or empty string
        * @example -
        * ```
        * getAttr(entry, 'firstName')
        * ```
        */
        const getAttr = (entry, field) => {
            var _a;
            return Array.isArray(entry === null || entry === void 0 ? void 0 : entry.attributes)
                ? ((_a = entry.attributes.find(attr => attr.fieldType === field)) === null || _a === void 0 ? void 0 : _a.value) || ''
                : '';
        };
        return newGenDirectoryEntries.sort((a, b) => `${getAttr(a, 'firstName')} ${getAttr(a, 'lastName')}`
            .toUpperCase()
            .localeCompare(`${getAttr(b, 'firstName')} ${getAttr(b, 'lastName')}`.toUpperCase()));
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
   * get filtered New Gen Directory List based on search text
   * @param newGenDirectories - array of new gen directory entries
   * @param searchText - search string
   * @example -
   * ```
   * getFilteredNewGenDirList(searchText, newGenDirectories)
   * ```
   */
    getFilteredNewGenDirList(searchText, newGenDirectories) {
        const search = searchText === null || searchText === void 0 ? void 0 : searchText.toUpperCase();
        const newGenDirResultState = newGenDirectories.filter((entry) => {
            var _a, _b;
            const attributes = (entry === null || entry === void 0 ? void 0 : entry.attributes) || [];
            let firstName = '';
            let lastName = '';
            if (Array.isArray(attributes)) {
                firstName =
                    ((_a = attributes.find((attr) => attr.fieldType === 'firstName')) === null || _a === void 0 ? void 0 : _a.value) || '';
                lastName =
                    ((_b = attributes.find((attr) => attr.fieldType === 'lastName')) === null || _b === void 0 ? void 0 : _b.value) || '';
            }
            const firstAndLast = `${firstName} ${lastName}`.toUpperCase();
            const lastAndFirst = `${lastName} ${firstName}`.toUpperCase();
            return (firstAndLast.includes(search) ||
                lastAndFirst.includes(search));
        });
        return newGenDirResultState;
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
    * Function to add newgen directory entries favorite in Index DB from store
    * @param directoryEntries - Array of newgen directory entries to update favorites.
    * @example -
    * ```
    * updateNewGenDirectoryEntriesFavListInDB(newGenDirectoryEntries)
    * ```
    */
    updateNewGenDirectoryEntriesFavListInDB(newGenDirectoryEntries) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield dbInstance();
            const favNewGenDirectoryEntriesDB = (yield (db === null || db === void 0 ? void 0 : db.get(IndexDBStoreNames.DIRECTORY, IndexDBKeyNames.FAVORITE_NEWGEN_DIR_ENTRIES))) || [];
            const favNewGenDirEntryIdsInDB = (favNewGenDirectoryEntriesDB === null || favNewGenDirectoryEntriesDB === void 0 ? void 0 : favNewGenDirectoryEntriesDB.map(newGenDirectoryEntry => newGenDirectoryEntry === null || newGenDirectoryEntry === void 0 ? void 0 : newGenDirectoryEntry.userMappingId)) || [];
            const updatedFavNewGenDirectoryEntries = [];
            newGenDirectoryEntries === null || newGenDirectoryEntries === void 0 ? void 0 : newGenDirectoryEntries.forEach((newGenDirectoryEntry) => {
                if ((newGenDirectoryEntry === null || newGenDirectoryEntry === void 0 ? void 0 : newGenDirectoryEntry.isFavorite) && !(favNewGenDirEntryIdsInDB.includes(newGenDirectoryEntry === null || newGenDirectoryEntry === void 0 ? void 0 : newGenDirectoryEntry.userMappingId))) {
                    updatedFavNewGenDirectoryEntries.push(newGenDirectoryEntry);
                }
            });
            // maintain existing favorites, add newly added favorites from store
            yield (db === null || db === void 0 ? void 0 : db.put(IndexDBStoreNames.DIRECTORY, [...favNewGenDirectoryEntriesDB, ...updatedFavNewGenDirectoryEntries], IndexDBKeyNames.FAVORITE_NEWGEN_DIR_ENTRIES));
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
   * Used to retrieve external directory entries and filter out favorites
   * @param directoryEntries - array of directory entries to filter
   * @param extDirectoryName - external directory name to filter
   * @returns - returns the filtered favorite external directory entries
   * @example -
   * ```
   * directoryProvider.getFavoritesByNewGenDirectory(directoryEntries, newGenDirectoryName);
   * ```
   */
    getFavoritesByNewGenDirectory(newGenDirectoryEntries, newGenDirectoryName) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            this.updateNewGenDirectoryEntriesFavListInDB(newGenDirectoryEntries);
            let favNewGenDirectoryList = [];
            const filteredFav = (newGenDirectoryEntries === null || newGenDirectoryEntries === void 0 ? void 0 : newGenDirectoryEntries.filter((entry) => entry === null || entry === void 0 ? void 0 : entry.isFavorite)) || [];
            favNewGenDirectoryList = filteredFav;
            if ((newGenDirectoryName === null || newGenDirectoryName === void 0 ? void 0 : newGenDirectoryName.length) > 0) {
                favNewGenDirectoryList = [];
                const filteredNewGenDirSearchList = this.getFilteredNewGenDirList(newGenDirectoryName.toUpperCase(), newGenDirectoryEntries);
                favNewGenDirectoryList = (_a = this.sortNewGenDirectory(filteredNewGenDirSearchList)) === null || _a === void 0 ? void 0 : _a.filter((entry) => entry === null || entry === void 0 ? void 0 : entry.isFavorite);
            }
            return favNewGenDirectoryList;
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
                    this.socketMessageHandler(this.wsProvider, false);
                }
                this.updateFavExtDirEntriesFromClientData();
                this.publishFinalDynamicDirectoryResponse(this.searchDirectoriesResponse, false);
                return;
            }, (error) => {
                this.logger.error('searchDirectories', 'searchDirectories failed:-' + error.toString());
                const errorSearchResult = new SearchDirectoriesResponse();
                errorSearchResult.error = error;
                this.publishFinalDynamicDirectoryResponse(errorSearchResult, false);
                return;
            });
        }
        else {
            this.logger.error('searchDirectories', 'All mendatory inputs are not provided');
            const errorSearchResult = new SearchDirectoriesResponse();
            errorSearchResult.error = new CXoneSdkError(CXoneSdkErrorType.INVALID_METHOD_PARMS, 'All mendatory inputs are not provided');
            this.publishFinalDynamicDirectoryResponse(errorSearchResult, false);
            return;
        }
    }
    /**
     * Method is used to search newgen directories
     * @param searchNewGenDirectoriesRequest -- pass the searchNewGenDirectoriesRequest type object
     * @returns - return object of type SearchNewGenDirectoriesResponse. Containing filtered newgen directories based on search parameter
     * @example -
     * ```
     * searchNewGenDirectories(searchDirectoriesRequest)
     * ```
     */
    searchNewGenDirectories(searchNewGenDirectoriesRequest) {
        this.currentNewGenSearchDirectoriesRequest = searchNewGenDirectoriesRequest;
        const cxOneConfig = this.auth.getCXoneConfig();
        const authToken = this.auth.getAuthToken();
        const searchNewGenDirectoriesUri = ApiUriConstants.SEARCH_NEWGEN_DIRECTORIES;
        const searchNewGenDirectoriesUrl = cxOneConfig.apiFacadeBaseUri + searchNewGenDirectoriesUri;
        const requestBody = {
            subscriptionId: this.validationUtils.isNotNullOrEmpty(searchNewGenDirectoriesRequest === null || searchNewGenDirectoriesRequest === void 0 ? void 0 : searchNewGenDirectoriesRequest.subscriptionId)
                ? searchNewGenDirectoriesRequest === null || searchNewGenDirectoriesRequest === void 0 ? void 0 : searchNewGenDirectoriesRequest.subscriptionId
                : null,
            searchString: searchNewGenDirectoriesRequest === null || searchNewGenDirectoriesRequest === void 0 ? void 0 : searchNewGenDirectoriesRequest.searchString,
            realTimeUpdates: searchNewGenDirectoriesRequest === null || searchNewGenDirectoriesRequest === void 0 ? void 0 : searchNewGenDirectoriesRequest.realTimeUpdates,
            skip: searchNewGenDirectoriesRequest === null || searchNewGenDirectoriesRequest === void 0 ? void 0 : searchNewGenDirectoriesRequest.skip,
            top: searchNewGenDirectoriesRequest === null || searchNewGenDirectoriesRequest === void 0 ? void 0 : searchNewGenDirectoriesRequest.top,
            directoryUUID: this.validationUtils.isNotNullOrEmpty(searchNewGenDirectoriesRequest === null || searchNewGenDirectoriesRequest === void 0 ? void 0 : searchNewGenDirectoriesRequest.directoryUUID)
                ? searchNewGenDirectoriesRequest === null || searchNewGenDirectoriesRequest === void 0 ? void 0 : searchNewGenDirectoriesRequest.directoryUUID
                : null,
            filter: {
                partnerType: this.validationUtils.isNotNullOrEmptyArray(searchNewGenDirectoriesRequest === null || searchNewGenDirectoriesRequest === void 0 ? void 0 : searchNewGenDirectoriesRequest.partnerType)
                    ? searchNewGenDirectoriesRequest === null || searchNewGenDirectoriesRequest === void 0 ? void 0 : searchNewGenDirectoriesRequest.partnerType
                    : null,
                fieldType: this.validationUtils.isNotNullOrEmptyArray(searchNewGenDirectoriesRequest === null || searchNewGenDirectoriesRequest === void 0 ? void 0 : searchNewGenDirectoriesRequest.fieldType)
                    ? searchNewGenDirectoriesRequest === null || searchNewGenDirectoriesRequest === void 0 ? void 0 : searchNewGenDirectoriesRequest.fieldType
                    : null,
            },
        };
        const reqInit = {
            headers: this.utilService.initHeader(authToken.accessToken, 'application/json').headers,
            body: requestBody,
        };
        if (this.validationUtils.isNotNullOrEmpty(searchNewGenDirectoriesRequest === null || searchNewGenDirectoriesRequest === void 0 ? void 0 : searchNewGenDirectoriesRequest.realTimeUpdates) &&
            this.validationUtils.isNotNullOrEmpty(searchNewGenDirectoriesRequest === null || searchNewGenDirectoriesRequest === void 0 ? void 0 : searchNewGenDirectoriesRequest.skip) &&
            this.validationUtils.isNotNullOrEmpty(searchNewGenDirectoriesRequest === null || searchNewGenDirectoriesRequest === void 0 ? void 0 : searchNewGenDirectoriesRequest.top)) {
            HttpClient.post(searchNewGenDirectoriesUrl, reqInit).then((response) => {
                this.logger.info('searchNewGenDirectories', 'searchNewGenDirectories success:-' + response.toString());
                this.searchNewGenDirectoriesResponse.parse(response.data);
                if (searchNewGenDirectoriesRequest === null || searchNewGenDirectoriesRequest === void 0 ? void 0 : searchNewGenDirectoriesRequest.realTimeUpdates) {
                    if (this.currentNewGenSearchDirectoriesRequest) {
                        this.currentNewGenSearchDirectoriesRequest.subscriptionId =
                            this.searchNewGenDirectoriesResponse.subscriptionId;
                    }
                    this.newGenWsProvider.connectNewGenSocket();
                    this.socketMessageHandler(this.newGenWsProvider, true);
                }
                this.updateFavNewGenDirEntriesFromClientData();
                this.publishFinalDynamicDirectoryResponse(this.searchNewGenDirectoriesResponse, true);
                return;
            }, (error) => {
                this.logger.error('searchNewGenDirectories', 'searchNewGenDirectories failed:-' + error.toString());
                const errorSearchResult = new SearchDirectoriesResponse();
                errorSearchResult.error = error;
                this.publishFinalDynamicDirectoryResponse(errorSearchResult, true);
                return;
            });
        }
        else {
            this.logger.error('searchNewGenDirectories', 'All mendatory inputs are not provided');
            const errorSearchResult = new SearchDirectoriesResponse();
            errorSearchResult.error = new CXoneSdkError(CXoneSdkErrorType.INVALID_METHOD_PARMS, 'All mendatory inputs are not provided');
            this.publishFinalDynamicDirectoryResponse(errorSearchResult, true);
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
            // Unsubscribe from legacy provider if it has a subscription
            if (this.searchDirectoriesResponse.subscriptionId) {
                this.wsProvider.unsubscribeSearch(this.searchDirectoriesResponse.subscriptionId);
            }
            // Unsubscribe from newgen provider if it has a subscription
            if (this.searchNewGenDirectoriesResponse.subscriptionId) {
                this.newGenWsProvider.unsubscribeSearch(this.searchNewGenDirectoriesResponse.subscriptionId);
            }
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
            // Unsubscribe from legacy provider if it has a subscription
            if (this.searchDirectoriesResponse.subscriptionId) {
                this.wsProvider.unsubscribeSearch(this.searchDirectoriesResponse.subscriptionId);
            }
            // Unsubscribe from newgen provider if it has a subscription
            if (this.searchNewGenDirectoriesResponse.subscriptionId) {
                this.newGenWsProvider.unsubscribeSearch(this.searchNewGenDirectoriesResponse.subscriptionId);
            }
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
        // Check if this is a NewGen subscription ID
        if (this.searchNewGenDirectoriesResponse.subscriptionId === subscriptionId) {
            this.newGenWsProvider.unsubscribeSearch(subscriptionId);
        }
        // Check if this is a legacy subscription ID
        else if (this.searchDirectoriesResponse.subscriptionId === subscriptionId) {
            this.wsProvider.unsubscribeSearch(subscriptionId);
        }
        // If subscriptionId doesn't match either, try to unsubscribe from both
        else {
            this.logger.warn('endDirectoriesSearch', `SubscriptionId ${subscriptionId} does not match any known subscriptions`);
            // Attempt unsubscribe from both providers as fallback
            this.wsProvider.unsubscribeSearch(subscriptionId);
            this.newGenWsProvider.unsubscribeSearch(subscriptionId);
        }
    }
    /**
     * Method used to connect the WebSocket
     * @example
     * ```
     * this.connectSocket();
     * ```
     */
    socketMessageHandler(provider, isNewGen) {
        const stream = isNewGen
            ? this.onNewGenMessageReceived
            : this.onMessageReceived;
        const subscription = stream.subscribe((message) => {
            var _a, _b, _c, _d;
            switch (message.command) {
                case WSCommand.CONNECTED: {
                    if ((isNewGen && provider !== this.newGenWsProvider) ||
                        (!isNewGen && provider !== this.wsProvider))
                        return;
                    const subscriptionId = isNewGen
                        ? (_b = (_a = this.currentNewGenSearchDirectoriesRequest) === null || _a === void 0 ? void 0 : _a.subscriptionId) !== null && _b !== void 0 ? _b : ''
                        : (_d = (_c = this.currentSearchDirectoriesRequest) === null || _c === void 0 ? void 0 : _c.subscriptionId) !== null && _d !== void 0 ? _d : '';
                    if (subscriptionId) {
                        provider.subscribeSearch(subscriptionId);
                    }
                    break;
                }
                case WSCommand.RECONNECTED: {
                    if (this.currentNewGenSearchDirectoriesRequest) {
                        this.searchNewGenDirectories(this.currentNewGenSearchDirectoriesRequest);
                    }
                    else if (this.currentSearchDirectoriesRequest) {
                        this.searchDirectories(this.currentSearchDirectoriesRequest);
                    }
                    break;
                }
                case WSCommand.UNSUBSCRIBED: {
                    provider.close();
                    if (isNewGen) {
                        if (this.newGenMessageReceivedSubscription) {
                            this.newGenMessageReceivedSubscription.unsubscribe();
                        }
                    }
                    else {
                        if (this.messageReceivedSubscription) {
                            this.messageReceivedSubscription.unsubscribe();
                        }
                    }
                    break;
                }
                case WSCommand.MESSAGE: {
                    const mergedResult = this.mergeSearchResults(message);
                    if (isNewGen) {
                        this.searchNewGenDirectoriesResponse.error = null;
                        this.publishFinalDynamicDirectoryResponse(mergedResult, true);
                    }
                    else {
                        this.searchDirectoriesResponse.error = null;
                        this.publishFinalDynamicDirectoryResponse(mergedResult, false);
                    }
                    break;
                }
                case WSCommand.ERROR: {
                    this.logger.error('cxone-dynamic-directory', message.body.error);
                    if (this.currentNewGenSearchDirectoriesRequest) {
                        this.searchNewGenDirectoriesResponse.error = message.body.error;
                        this.publishFinalDynamicDirectoryResponse(this.searchNewGenDirectoriesResponse, true);
                    }
                    else {
                        this.searchDirectoriesResponse.error = message.body.error;
                        this.publishFinalDynamicDirectoryResponse(this.searchDirectoriesResponse, false);
                    }
                    break;
                }
            }
        });
        // Store the subscription for cleanup
        if (isNewGen) {
            this.newGenMessageReceivedSubscription = subscription;
        }
        else {
            this.messageReceivedSubscription = subscription;
        }
    }
    /**
     * Method used to connect the WebSocket
     * @example
     * ```
     * this.connectSocket();
     * ```
     */
    mergeSearchResults(message) {
        var _a, _b;
        const presenceOrder = {
            Green: 3,
            Red: 4,
            Yellow: 2,
            Grey: 1,
        };
        const activeResponse = this.currentNewGenSearchDirectoriesRequest
            ? this.searchNewGenDirectoriesResponse
            : this.searchDirectoriesResponse;
        if (!(activeResponse === null || activeResponse === void 0 ? void 0 : activeResponse.directoryEntries))
            return activeResponse;
        const payload = (_b = (_a = message === null || message === void 0 ? void 0 : message.body) === null || _a === void 0 ? void 0 : _a.payload) !== null && _b !== void 0 ? _b : message === null || message === void 0 ? void 0 : message.body;
        activeResponse === null || activeResponse === void 0 ? void 0 : activeResponse.directoryEntries.forEach((data) => {
            var _a, _b;
            const isMatchingUser = (_a = data.attributes) === null || _a === void 0 ? void 0 : _a.some((attr) => attr.profileType === 'UserId' &&
                attr.value === payload.partnerPlatformUserId);
            if (isMatchingUser) {
                let currentStatus = 0;
                data.unifiedSocketStatus = payload.unifiedStatus;
                data.attributes = (_b = data.attributes) === null || _b === void 0 ? void 0 : _b.map((entities) => {
                    if (entities.fieldType === 'presence') {
                        if (entities.partnerType === payload.partnerPlatform) {
                            entities = Object.assign(Object.assign({}, entities), { value: payload.dirSyncPresenceStatusColor });
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
        return activeResponse;
    }
    /**
     * Method used to update subject with directory search response
     * @example
     * ```
     * this.publishFinalDynamicDirectoryResponse();
     * ```
     */
    publishFinalDynamicDirectoryResponse(data, isNewGen) {
        if (isNewGen) {
            this.searchNewGenDirectoryResult.next(data);
        }
        else {
            this.searchDirectoryResult.next(data);
        }
    }
}
//# sourceMappingURL=cxone-dynamic-directory.js.map