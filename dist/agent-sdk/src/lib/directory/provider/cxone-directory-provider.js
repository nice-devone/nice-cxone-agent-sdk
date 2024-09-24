import { __awaiter } from "tslib";
import { ACDSessionManager, ApiUriConstants, HttpUtilService, Logger, IndexDBStoreNames, dbInstance, IndexDBKeyNames, clearIndexDbStore, LocalStorageHelper, StorageKeys, LoadWorker, } from '@nice-devone/core-sdk';
import { MessageBus, MessageType, DirectoryEntities } from '@nice-devone/common-sdk';
import { CXoneDirectoryAdapter } from '../adapter/cxone-directory-adapter';
import { DirectorySearchFilter } from '../util/utility';
import { AuthStatus } from '@nice-devone/auth-sdk';
const NO_MATCHING_RECORDS_FOUND = 'No Matching Records Found.';
const OFFSET_AND_LIMIT_VALUES_SHOULD_ALWAYS_BE_GREATER_THAN_ZERO = 'Offset and Limit values should always be greater than zero.';
const AgentState = {
    'available': 1,
    'unavailable': 2,
    'working': 3,
    'inboundcontact': 3,
    'outboundcontact': 3,
    'inboundconsult': 3,
    'outboundconsult': 3,
    'dialer': 3,
    'dialerpending': 3,
    'loggedout': 4,
    'unknown': 10,
};
/**
 * Directory Provider Class
 */
export class CXoneDirectoryProvider {
    /**
     * Create a directory provider.
     * @example -- Const provider = new CXoneDirectoryProvider();
     */
    constructor() {
        this.logger = new Logger('SDK', 'CXoneDirectoryProvider');
        this.acdSession = ACDSessionManager.instance;
        this.baseUri = '';
        this.utilService = new HttpUtilService();
        this.directoryAdapter = new CXoneDirectoryAdapter();
        this.directoryBase = {};
        this.offset = -1; // to know the pagination offset for the directory data requested
        this.limit = -1; // to know the pagination last index for the directory data requested
        this.searchText = ''; // in store the current requested directory search text
        this.entityPollingFlag = {
            addressBookList: false,
            skillList: false,
            agentList: false,
            teamList: false,
            SkillActivity: false,
        };
        this.lastAddressBookSearchEntriesMap = new Map(); // here map has addressBookEntryId as key and addressBookId as value, to keep the map of all the matched search addressBook entry which will help use to identify quickly from this search directory map while updation
        this.lastAddressBookEntriesArray = []; // to hold all the addressBook entry which will help us in quick pagination result and also for the total addressBook count
        this.entityCounts = {
            addressBookList: 0,
            skillList: 0,
            agentList: 0,
            teamList: 0,
            totalAgentCount: 0,
            totalTeamCount: 0,
            // in case of digital it will have total digital skill count 
            totalSkillCount: 0,
            totalAddressBookCount: 0,
        };
        this.totalSearchResultCount = {
            agentList: 0,
            skillList: 0,
            teamList: 0,
            addressBookList: 0,
        };
        this.isFreshRequest = false; // to keep track of the user performed action request to get the directory response even if no records were received for the entities requested, if false meaning not an user request or true meaning user request
        this.teamId = '';
        this.mediaType = undefined;
        this.pollingOptions = undefined;
        this.entity = [];
        this.favroiteAgentList = [];
        this.getDirectoryPollingConfig = () => {
            return LocalStorageHelper.getItem(StorageKeys.DIRECTORY_POLLING_CONFIG, true);
        };
        window.addEventListener(AuthStatus.REFRESH_TOKEN_SUCCESS, () => {
            this.restartWorker();
            const msg = {
                type: MessageType.RESTART_DIRECTORY_POLLING,
            };
            MessageBus.instance.postResponse(msg);
        });
    }
    /**
     * Used to set the directory base instance to access the subject from the base class
     * @example -
     */
    setDirectoryBaseInstance(directoryBase) {
        this.directoryBase = directoryBase;
    }
    /**
     * Used to handle the directory data request
     * @param isPolling - polling flag to identify if polling is needed or not
     * @param entity - requested entity array for directory data
     * @param offset - start index for the pagination data, should be greater than 0
     * @param limit - end index for the pagination data, should be greater than 0
     * @param searchText - search string in case for search request, search will happen on fields depending on entity requested.
     * If requested entity is agentList then search will happen based on fields - (firstName, lastName, userName).
     * If requested entity is skillList then search will happen based on field - (skillName).
     * If requested entity is addressBookList then search will happen based on field - (firstName, lastName, mobile, phone, email).
     * If requested entity is teamList then search will happen based on field - (teamName).
     * @param shouldFetchAllAgents - flag to get all agent list including logged-in user
     * @example -
     * ```
     * getDirectoryData(true, ["agentList"], 1, 14, '');
     * ```
     */
    getDirectoryData(entity, pollingOptions, offset, limit, searchText, teamId, mediaType, shouldFetchAllAgents) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (offset !== undefined && limit !== undefined && (offset <= 0 || limit <= 0)) { // if offset and limit is less than equal to 0 send error response for the requested entity
                const directoryResponse = { skillList: { data: [] }, agentList: { data: [] }, addressBookList: { data: [] }, teamList: { data: [] } };
                if (entity.includes(DirectoryEntities.ADDRESS_BOOK_LIST))
                    directoryResponse.addressBookList.errorMsg = OFFSET_AND_LIMIT_VALUES_SHOULD_ALWAYS_BE_GREATER_THAN_ZERO;
                if (entity.includes(DirectoryEntities.AGENT_LIST))
                    directoryResponse.agentList.errorMsg = OFFSET_AND_LIMIT_VALUES_SHOULD_ALWAYS_BE_GREATER_THAN_ZERO;
                if (entity.includes(DirectoryEntities.SKILL_LIST))
                    directoryResponse.skillList.errorMsg = OFFSET_AND_LIMIT_VALUES_SHOULD_ALWAYS_BE_GREATER_THAN_ZERO;
                if (entity.includes(DirectoryEntities.TEAM_LIST))
                    directoryResponse.teamList.errorMsg = OFFSET_AND_LIMIT_VALUES_SHOULD_ALWAYS_BE_GREATER_THAN_ZERO;
                this.directoryBase.directoryEvent.next(directoryResponse);
                return;
            }
            const db = yield dbInstance();
            LocalStorageHelper.setItem(StorageKeys.DIRECTORY_POLLING_CONFIG, {
                entity,
                pollingOptions,
                offset,
                limit,
                searchText,
                teamId,
                mediaType,
            });
            //updating teamId here to get the teamId in response for agentList
            if (teamId != undefined) {
                this.teamId = teamId;
            }
            this.mediaType = mediaType || undefined; // based on this we filter out the skill based on media type
            if (searchText) { // if search text is present that means the current request for search
                const isNewSearchRequest = this.isNewSearchedRequest(searchText, offset, limit, entity, teamId, mediaType);
                this.offset = offset || -1;
                this.limit = limit || -1;
                this.searchText = searchText || '';
                this.currentEntities = entity; // to keep track of the current search entities which will be needed while update
                const currentPollingNeededEntities = this.isPollingNeeded(entity);
                if (currentPollingNeededEntities === null || currentPollingNeededEntities === void 0 ? void 0 : currentPollingNeededEntities.length) { // if the polling need any of the entity requested for the search then we will first poll the data first and then send the response for the search
                    if (isNewSearchRequest)
                        yield (db === null || db === void 0 ? void 0 : db.delete(IndexDBStoreNames.DIRECTORY, IndexDBKeyNames.DIRECTORY_SEARCH_RESPONSE)); // remove previously saved search text data in case of new search request in case of polling is pending for any of the entities or the request is for without polling
                    this.requestDirectoryData(pollingOptions, currentPollingNeededEntities, shouldFetchAllAgents);
                    if (pollingOptions === null || pollingOptions === void 0 ? void 0 : pollingOptions.isPolling)
                        this.updateEntityPolled(currentPollingNeededEntities);
                }
                else { // if no polling is needed for the entities requested then we will just take the data from the indexDB and publish the response
                    let directoryResponse = { skillList: { data: [] }, agentList: { data: [] }, addressBookList: { data: [] }, teamList: { data: [] } };
                    if (isNewSearchRequest) { // if the searchRequest is new we will not look for the data cache in indexDB
                        directoryResponse = yield this.searchDirectoryData(this.searchText, entity, shouldFetchAllAgents);
                        yield (db === null || db === void 0 ? void 0 : db.put(IndexDBStoreNames.DIRECTORY, directoryResponse, IndexDBKeyNames.DIRECTORY_SEARCH_RESPONSE)); // to store the search data in the indexDB
                    }
                    else {
                        directoryResponse = (yield (db === null || db === void 0 ? void 0 : db.get(IndexDBStoreNames.DIRECTORY, IndexDBKeyNames.DIRECTORY_SEARCH_RESPONSE)));
                    }
                    this.publishDirectoryData(directoryResponse);
                }
            }
            else { // if no search text is present then that means the request is for polling
                this.searchText = ''; // to reset the search text to identify that while update we are not sending response as per search data
                yield (db === null || db === void 0 ? void 0 : db.delete(IndexDBStoreNames.DIRECTORY, IndexDBKeyNames.DIRECTORY_SEARCH_RESPONSE)); // to store the search data in the indexDB
                this.offset = offset || -1;
                this.limit = limit || -1;
                const currentPollingNeededEntities = this.isPollingNeeded(entity);
                this.currentEntities = entity; // to keep track of the current entities which will be needed while update
                if (pollingOptions === null || pollingOptions === void 0 ? void 0 : pollingOptions.isPolling) { // if polling is required 
                    if (currentPollingNeededEntities === null || currentPollingNeededEntities === void 0 ? void 0 : currentPollingNeededEntities.length) { // if any entity which has'nt been polled yet
                        this.requestDirectoryData(pollingOptions, currentPollingNeededEntities, shouldFetchAllAgents);
                        this.updateEntityPolled(currentPollingNeededEntities); // to update the entityPollingFlag based on the entity polled
                    }
                    else { // if no polling entity remains then that means we just have to send the data from the db as we already have data as we have already polled for all the requested entities
                        let directoryResponse = { skillList: { data: [] }, agentList: { data: [] }, addressBookList: { data: [] }, teamList: { data: [] } };
                        const currentAddressBookList = yield (db === null || db === void 0 ? void 0 : db.get(IndexDBStoreNames.DIRECTORY, DirectoryEntities.ADDRESS_BOOK_LIST));
                        const currentAgentList = yield (db === null || db === void 0 ? void 0 : db.get(IndexDBStoreNames.DIRECTORY, DirectoryEntities.AGENT_LIST));
                        let currentSkillList = yield (db === null || db === void 0 ? void 0 : db.get(IndexDBStoreNames.DIRECTORY, DirectoryEntities.SKILL_LIST));
                        let currentTeamList = yield (db === null || db === void 0 ? void 0 : db.get(IndexDBStoreNames.DIRECTORY, DirectoryEntities.TEAM_LIST));
                        entity === null || entity === void 0 ? void 0 : entity.forEach((e) => {
                            if (e === DirectoryEntities.ADDRESS_BOOK_LIST) {
                                directoryResponse.addressBookList.data = currentAddressBookList;
                                this.entityCounts.addressBookList = this.lastAddressBookEntriesArray.length || 0;
                            }
                            if (e == DirectoryEntities.AGENT_LIST) {
                                directoryResponse.agentList.data = currentAgentList;
                                this.entityCounts.agentList = (currentAgentList === null || currentAgentList === void 0 ? void 0 : currentAgentList.length) || 0;
                            }
                            if (e == DirectoryEntities.SKILL_LIST) {
                                if (this.mediaType)
                                    currentSkillList = this.filterSkillByMediaType(currentSkillList);
                                directoryResponse.skillList.data = currentSkillList;
                                this.entityCounts.skillList = (currentSkillList === null || currentSkillList === void 0 ? void 0 : currentSkillList.length) || 0;
                            }
                            if (e == DirectoryEntities.TEAM_LIST) {
                                currentTeamList = currentTeamList.filter(team => team.isActive);
                                directoryResponse.teamList.data = currentTeamList;
                                this.entityCounts.teamList = (currentTeamList === null || currentTeamList === void 0 ? void 0 : currentTeamList.length) || 0;
                            }
                        });
                        if (this.offset > 0 && this.limit > 0) {
                            directoryResponse = yield this.handleDirectoryPagination(directoryResponse);
                        }
                        if ((_a = directoryResponse.addressBookList.data) === null || _a === void 0 ? void 0 : _a.length) {
                            directoryResponse.addressBookList.allAddressBookEntries = this.handleAddressBookList(directoryResponse.addressBookList.data);
                        }
                        this.publishDirectoryData(directoryResponse);
                    }
                }
                else { // when polling is no required
                    this.requestDirectoryData(pollingOptions, entity, shouldFetchAllAgents);
                }
            }
        });
    }
    /**
     * Used to clear the directory store data from the index db
     * @example -
     * ```
     * clearDirectoryDB();
     * ```
     */
    clearDirectoryDB() {
        return __awaiter(this, void 0, void 0, function* () {
            yield clearIndexDbStore(IndexDBStoreNames.DIRECTORY);
        });
    }
    /**
     * Used to clear the digital store data from the index db
     * @example -
     * ```
     * clearDigitalDB();
     * ```
     */
    clearDigitalDB() {
        return __awaiter(this, void 0, void 0, function* () {
            yield clearIndexDbStore(IndexDBStoreNames.DIGITAL);
        });
    }
    /**
     * Used to clear the copilot store data from the index db
     * @example -
     * ```
     * clearCopilotDB();
     * ```
     */
    clearCopilotDB() {
        return __awaiter(this, void 0, void 0, function* () {
            yield clearIndexDbStore(IndexDBStoreNames.COPILOT);
        });
    }
    /**
     * Used to check if the current request is a new search request or the already searched request
     * @param newSearchText - search string
     * @param newOffset - start index for pagination
     * @param newLimit - last index for pagination
     * @param newEntity - entity array
     * @returns boolean stating if true that means its a new search request
     */
    isNewSearchedRequest(newSearchText, newOffset, newLimit, newEntity, newTeamId, newMediaType) {
        var _a, _b, _c;
        return this.searchText !== newSearchText || this.offset !== newOffset || this.limit !== newLimit || this.teamId !== newTeamId || this.mediaType !== newMediaType || ((_a = newEntity === null || newEntity === void 0 ? void 0 : newEntity.sort()) === null || _a === void 0 ? void 0 : _a.join('')) !== ((_c = (_b = this.currentEntities) === null || _b === void 0 ? void 0 : _b.sort()) === null || _c === void 0 ? void 0 : _c.join(''));
    }
    /**
     * Used to check from the requested entity to find out if any of the entity is still needed to be polled and if so returns that entity
     * @param entity - directory entity array
     */
    isPollingNeeded(entity) {
        const entities = [];
        const allEntity = [DirectoryEntities.ADDRESS_BOOK_LIST, DirectoryEntities.AGENT_LIST,
            DirectoryEntities.SKILL_LIST, DirectoryEntities.TEAM_LIST];
        if (!entity) {
            allEntity.forEach(e => {
                !this.entityPollingFlag[e] && entities.push(e);
            });
        }
        else {
            entity.forEach(e => {
                !this.entityPollingFlag[e] && entities.push(e);
            });
        }
        return entities;
    }
    /**
     * Used to update the flag based on the entity array passed, this will ensure that the passed entities has been already polled
     * @param entity - directory entity array
     */
    updateEntityPolled(entity) {
        if (!entity) {
            this.entityPollingFlag[DirectoryEntities.ADDRESS_BOOK_LIST] = true;
            this.entityPollingFlag[DirectoryEntities.AGENT_LIST] = true;
            this.entityPollingFlag[DirectoryEntities.SKILL_LIST] = true;
            this.entityPollingFlag[DirectoryEntities.TEAM_LIST] = true;
        }
        else {
            entity.forEach(e => {
                if (!this.entityPollingFlag[e]) {
                    this.entityPollingFlag[e] = true;
                }
            });
        }
    }
    /**
       * Used to get the search result for the directory entities from indexDB. if entities array is passed then the result will be included for those entities
       * if not passed then result will include all the entities
       * @param searchText - text on the basis of which the search will be performed
       * @param entities - array of requested entity options for search
       * @param shouldFetchAllAgents - flag to get all agent list including logged-in user
       */
    searchDirectoryData(searchText, entities, shouldFetchAllAgents) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield dbInstance();
            const searchTextUpperCase = searchText.toUpperCase();
            const directoryResponse = { skillList: { data: [] }, agentList: { data: [] }, addressBookList: { data: [] }, teamList: { data: [] } };
            const AgentList = (yield (db === null || db === void 0 ? void 0 : db.get(IndexDBStoreNames.DIRECTORY, DirectoryEntities.AGENT_LIST))) || [];
            const skillList = (yield (db === null || db === void 0 ? void 0 : db.get(IndexDBStoreNames.DIRECTORY, DirectoryEntities.SKILL_LIST))) || [];
            const addressBookList = (yield (db === null || db === void 0 ? void 0 : db.get(IndexDBStoreNames.DIRECTORY, DirectoryEntities.ADDRESS_BOOK_LIST))) || [];
            const teamList = (yield (db === null || db === void 0 ? void 0 : db.get(IndexDBStoreNames.DIRECTORY, DirectoryEntities.TEAM_LIST))) || [];
            let addressBookResultState = [], agentResultState = [], skillResultState = [], teamResult = [];
            if (entities === null || entities === void 0 ? void 0 : entities.length) {
                entities.forEach(entity => {
                    switch (entity) {
                        case DirectoryEntities.ADDRESS_BOOK_LIST:
                            addressBookResultState = this.filterAddressBook(searchTextUpperCase, addressBookList);
                            break;
                        case DirectoryEntities.AGENT_LIST:
                            agentResultState = this.getFilteredAgentList(searchTextUpperCase, AgentList, shouldFetchAllAgents);
                            break;
                        case DirectoryEntities.SKILL_LIST:
                            skillResultState = this.getFilteredSkillList(searchTextUpperCase, skillList);
                            break;
                        case DirectoryEntities.TEAM_LIST:
                            teamResult = this.getFilteredTeamList(searchTextUpperCase, teamList);
                            break;
                    }
                });
            }
            else {
                addressBookResultState = this.filterAddressBook(searchTextUpperCase, addressBookList);
                agentResultState = this.getFilteredAgentList(searchTextUpperCase, AgentList);
                skillResultState = this.getFilteredSkillList(searchTextUpperCase, skillList);
                teamResult = this.getFilteredTeamList(searchTextUpperCase, teamList);
            }
            directoryResponse.agentList.data = agentResultState;
            directoryResponse.skillList.data = skillResultState;
            directoryResponse.addressBookList.data = addressBookResultState;
            directoryResponse.teamList.data = teamResult;
            return directoryResponse;
        });
    }
    /**
     * Used to handle the agentList pagination for the search result if the search text is matched and then returns only the data based on offset and limit
     * @param searchText - search string
     * @param agentList - array of agentList
     * @param shouldFetchAllAgents - flag to get all agent list including logged-in user
     */
    getFilteredAgentList(searchText, agentList, shouldFetchAllAgents) {
        let agentResultState = [];
        const user = this.acdSession.userInfo;
        searchText = searchText === null || searchText === void 0 ? void 0 : searchText.toUpperCase();
        //Update Agent List to not show logged in user in the list
        //based on shouldFetchAllAgents flag, fetching all agents here which includes current logged-in user as well
        if (!shouldFetchAllAgents) {
            agentList = agentList.filter(agent => { var _a; return ((_a = agent.agentId) === null || _a === void 0 ? void 0 : _a.toString()) !== user.icAgentId; });
        }
        if (this.teamId) {
            agentList = this.filterAgentDataByTeamId(agentList, this.teamId);
        }
        agentResultState = agentList.filter(agent => {
            const firstAndLast = agent.firstName + ' ' + agent.lastName;
            const lastAndFirst = agent.lastName + ' ' + agent.firstName;
            return firstAndLast.toUpperCase().includes(searchText) || lastAndFirst.toUpperCase().includes(searchText);
        });
        agentResultState = this.sortAgentList(agentResultState, searchText);
        this.totalSearchResultCount.agentList = agentResultState.length || 0;
        if (this.offset > 0 && this.limit > 0) {
            agentResultState = agentResultState.slice(this.offset - 1, this.offset + this.limit - 1);
        }
        this.entityCounts.agentList = agentResultState.length || 0;
        return agentResultState;
    }
    /**
     * Used to handle the skillList pagination for the search result if the search text is matched and then returns only the data based on offset and limit
     * @param searchText - search string
     * @param skillList - array of skill
     */
    getFilteredSkillList(searchText, skillList) {
        const [skillResultState, searchMatchedCount] = DirectorySearchFilter(Object.assign(Object.assign({ searchText: searchText, data: skillList, filterType: 'skillName' }, (this.mediaType && { mediaTypeIds: [this.mediaType] })), { limit: this.limit, offset: this.offset }));
        this.entityCounts.skillList = skillList.length || 0;
        this.totalSearchResultCount.skillList = searchMatchedCount || 0;
        return skillResultState;
    }
    /**
     * Used to handle the teamList pagination for the search result if the search text is matched and then returns only the data based on offset and limit
     *  @param searchText - search string
     * @param agentList - array of agentList
     */
    getFilteredTeamList(searchText, teamList) {
        const [teamResult, searchMatchedCount] = DirectorySearchFilter({
            searchText: searchText,
            data: teamList,
            filterType: 'teamName',
            limit: this.limit,
            offset: this.offset,
        });
        this.entityCounts.teamList = teamList.length || 0;
        this.totalSearchResultCount.teamList = searchMatchedCount || 0;
        return teamResult;
    }
    /**
    * Used to filter the data from the address book List on the basis of search text and handle the pagination based on the offset and limit if requested
    * @param searchText - string value on which search will be performed
    * @param addressBookList - list of addressBook
    */
    filterAddressBook(searchText, addressBookList) {
        var _a;
        const newAddressBookList = [];
        this.lastAddressBookSearchEntriesMap = new Map();
        let searchCount = 0;
        searchText = searchText.toUpperCase();
        addressBookList === null || addressBookList === void 0 ? void 0 : addressBookList.forEach((addressBook) => {
            var _a, _b;
            if ((_a = addressBook === null || addressBook === void 0 ? void 0 : addressBook.addressBooksEntries) === null || _a === void 0 ? void 0 : _a.length) {
                const newAddressBook = Object.assign(Object.assign({}, addressBook), { addressBooksEntries: [] });
                const filteredAddressBookEntries = (_b = addressBook.addressBooksEntries) === null || _b === void 0 ? void 0 : _b.filter(list => (list.firstName.toUpperCase() + ' ' + list.lastName.toUpperCase()).includes(searchText) ||
                    (list.firstName.toUpperCase() + ' ' + list.middleName.toUpperCase() + ' ' + list.lastName.toUpperCase()).includes(searchText) ||
                    list.lastName.toUpperCase().includes(searchText) ||
                    list.mobile.includes(searchText) ||
                    list.phone.includes(searchText) ||
                    list.email.toUpperCase().includes(searchText));
                searchCount = searchCount + filteredAddressBookEntries.length;
                newAddressBook.addressBooksEntries = filteredAddressBookEntries;
                if (filteredAddressBookEntries.length) {
                    filteredAddressBookEntries.forEach(addressBookEntry => {
                        this.lastAddressBookSearchEntriesMap.set(addressBookEntry.addressBookEntryId, addressBook.addressBookId);
                    });
                    newAddressBookList.push(newAddressBook);
                }
            }
        });
        this.entityCounts.addressBookList = ((_a = this.lastAddressBookSearchEntriesMap) === null || _a === void 0 ? void 0 : _a.size) || 0;
        this.totalSearchResultCount.addressBookList = searchCount;
        return newAddressBookList;
    }
    /**
     * Used to initiate the polling for directory data
     * @param pollingOptions - Polling options
     * @param entity - List of entities to be polled
     * @param shouldFetchAllAgents - flag to get all agent list including logged-in user
     * @example -
     * ```
     * const directoryProvider = new CXoneDirectoryProvider();
     * this.directoryProvider.startPolling();
     * ```
     */
    requestDirectoryData(pollingOptions, entity = [
        DirectoryEntities.AGENT_LIST,
        DirectoryEntities.SKILL_LIST,
        DirectoryEntities.ADDRESS_BOOK_LIST
    ], shouldFetchAllAgents) {
        this.pollingOptions = pollingOptions;
        this.entity = entity;
        this.isFreshRequest = true; // whenever new api request for directory is made that means its an explicit user request to get the directory data as per the entity provided
        this.logger.info('startPolling', 'startPolling in CXoneDirectoryProvider');
        const requests = [];
        this.baseUri = this.acdSession.cxOneConfig.acdApiBaseUri;
        const authToken = this.acdSession.accessToken;
        if (this.baseUri && authToken) {
            if (entity.includes(DirectoryEntities.AGENT_LIST)) {
                const agentStateUrl = new URL(ApiUriConstants.AGENT_STATE_URI, this.baseUri);
                agentStateUrl.searchParams.set('fields', 'agentId,agentStateName,contactId,firstName,isActive,isOutbound,lastName,lastPollTime,lastUpdateTime,mediaName,outStateCode,outStateDescription,skillId,skillName,startDate,stationPhoneNumber,teamId,teamName,userName,userId');
                agentStateUrl.searchParams.set('updatedSince', new Date(0).toISOString());
                const agentStateRequest = {
                    headers: this.utilService.initHeader(authToken).headers,
                };
                requests.push({
                    url: agentStateUrl.toString(),
                    request: agentStateRequest,
                    id: DirectoryEntities.AGENT_LIST,
                });
            }
            if (entity.includes(DirectoryEntities.SKILL_LIST)) {
                const skillUrl = new URL(ApiUriConstants.SKILL_CACHE_URI, this.baseUri);
                skillUrl.searchParams.set('fields', 'IsActive,IsOutbound,MediaType,MediaName,LastUpdateTime,SkillId,SkillName');
                skillUrl.searchParams.set('updatedSince', new Date(0).toISOString());
                const skillRequest = {
                    headers: this.utilService.initHeader(authToken).headers,
                };
                requests.push({ url: skillUrl.toString(), request: skillRequest, id: DirectoryEntities.SKILL_LIST });
            }
            if (entity.includes(DirectoryEntities.ADDRESS_BOOK_LIST)) {
                const user = this.acdSession.userInfo;
                const agentId = user.icAgentId;
                const addressBooksUrl = new URL(ApiUriConstants.ADDRESS_BOOK_URI.replace('{agentId}', agentId), this.baseUri);
                addressBooksUrl.searchParams.set('fields', 'includeEntries,updatedSince');
                addressBooksUrl.searchParams.set('includeEntries', 'true');
                addressBooksUrl.searchParams.set('updatedSince', new Date(0).toISOString());
                const addressBookRequest = {
                    headers: this.utilService.initHeader(authToken).headers,
                };
                requests.push({
                    url: addressBooksUrl.toString(),
                    request: addressBookRequest,
                    id: DirectoryEntities.ADDRESS_BOOK_LIST,
                });
            }
            if (entity.includes(DirectoryEntities.TEAM_LIST)) {
                const teamListUrl = new URL(ApiUriConstants.GET_TEAMS, this.baseUri);
                teamListUrl.searchParams.set('fields', 'teamId,teamName,isActive,agentCount');
                teamListUrl.searchParams.set('updatedSince', new Date(0).toISOString());
                const teamListRequest = {
                    headers: this.utilService.initHeader(authToken).headers,
                };
                requests.push({
                    url: teamListUrl.toString(),
                    request: teamListRequest,
                    id: DirectoryEntities.TEAM_LIST,
                });
            }
            if (!this.pollingWorker) {
                this.initUtilWorker();
                this.pollingWorker.onmessage = (response) => {
                    this.handleDirectoryResponse(response.data, shouldFetchAllAgents);
                };
            }
            this.pollingWorker.postMessage({
                type: 'directory-polling',
                requestParams: requests,
                retryOptions: { maxRetryAttempts: 0, retryInterval: 0 },
                pollingOptions,
            });
        }
    }
    /**
     * Used to terminate the polling of agent state
     * @example -
     * ```
     * const directoryProvider = new CXoneDirectoryProvider();
     * this.directoryProvider.terminatePolling();
     * ```
     */
    terminatePolling() {
        LocalStorageHelper.removeItem(StorageKeys.DIRECTORY_POLLING_CONFIG);
        this.terminateDirectoryWorker();
        // after polling is terminated then we need to update the entity polling flag to false for all entities
        this.entityPollingFlag[DirectoryEntities.ADDRESS_BOOK_LIST] = false;
        this.entityPollingFlag[DirectoryEntities.AGENT_LIST] = false;
        this.entityPollingFlag[DirectoryEntities.SKILL_LIST] = false;
        this.entityPollingFlag[DirectoryEntities.TEAM_LIST] = false;
    }
    /**
     * Callback method which will passed on to the worker and will be executed after the polling api response
     * then will publish to the subject subscriber with the directory data
     * @param response - agent state api response object
     * @param shouldFetchAllAgents -flag to get all agent list including logged-in user
     * @example -
     * ```
     * handleDirectoryResponse(data);
     * ```
     */
    handleDirectoryResponse(response, shouldFetchAllAgents) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield dbInstance();
            let isUpdate = true; // this flag will let us know if the data is for updation or for the first time response after initial polling response
            if (response) {
                let directoryEvent = yield this.directoryAdapter.handleEvent(response);
                if ((directoryEvent === null || directoryEvent === void 0 ? void 0 : directoryEvent.agentList.data.length) || directoryEvent.addressBookList.data.length || directoryEvent.skillList.data.length
                    || directoryEvent.teamList.data.length || this.isFreshRequest) { // if data is present for the entity or its a fresh user request
                    this.isFreshRequest = false;
                    const { skillList, agentList, addressBookList, teamList } = Object.assign({}, directoryEvent);
                    const updatedDirectoryResponse = { skillList: { data: [] }, agentList: { data: [], favoriteAgents: [] }, addressBookList: { data: [] }, teamList: { data: [] } };
                    //Reset previous entity count
                    this.entityCounts = { addressBookList: 0, skillList: 0, agentList: 0, teamList: 0, totalAgentCount: 0, totalTeamCount: 0, totalSkillCount: 0, totalAddressBookCount: 0 };
                    //to update the new directory values in indexDB
                    updatedDirectoryResponse.skillList.data = (skillList.data.length) ? yield this.updateSkillListInDB(skillList.data) : yield (db === null || db === void 0 ? void 0 : db.get(IndexDBStoreNames.DIRECTORY, DirectoryEntities.SKILL_LIST));
                    if (agentList.data.length > 0) { //if agentList is present then update agent list and favorite list with latest data 
                        const { currentAgentList, currentFavAgentList } = yield this.updateAgentListInDB(agentList.data);
                        updatedDirectoryResponse.agentList.data = currentAgentList;
                        updatedDirectoryResponse.agentList.favoriteAgents = currentFavAgentList;
                    }
                    else { // if there is no response in agentlist then directory push latest values of index db in response data
                        updatedDirectoryResponse.agentList.data = (yield (db === null || db === void 0 ? void 0 : db.get(IndexDBStoreNames.DIRECTORY, DirectoryEntities.AGENT_LIST)));
                        updatedDirectoryResponse.agentList.favoriteAgents = (yield (db === null || db === void 0 ? void 0 : db.get(IndexDBStoreNames.DIRECTORY, IndexDBKeyNames.FAVORITE_AGENTS)));
                    }
                    ;
                    this.favroiteAgentList = updatedDirectoryResponse.agentList.favoriteAgents;
                    updatedDirectoryResponse.addressBookList.data = (addressBookList.data.length) ? yield this.updateAddressBookListInDB(addressBookList.data) : yield (db === null || db === void 0 ? void 0 : db.get(IndexDBStoreNames.DIRECTORY, DirectoryEntities.ADDRESS_BOOK_LIST));
                    updatedDirectoryResponse.teamList.data = (teamList.data.length) ? yield this.updateTeamListInDB(teamList.data) : yield (db === null || db === void 0 ? void 0 : db.get(IndexDBStoreNames.DIRECTORY, DirectoryEntities.TEAM_LIST));
                    this.entityCounts.totalAgentCount = ((_a = updatedDirectoryResponse.agentList.data) === null || _a === void 0 ? void 0 : _a.length) || 0;
                    this.entityCounts.totalTeamCount = ((_b = updatedDirectoryResponse.teamList.data) === null || _b === void 0 ? void 0 : _b.length) || 0;
                    this.entityCounts.totalSkillCount = ((_c = updatedDirectoryResponse.skillList.data) === null || _c === void 0 ? void 0 : _c.length) || 0;
                    this.entityCounts.totalAddressBookCount = (_e = (_d = updatedDirectoryResponse.addressBookList) === null || _d === void 0 ? void 0 : _d.data) === null || _e === void 0 ? void 0 : _e.reduce((sum, elem) => { var _a; return sum + ((elem === null || elem === void 0 ? void 0 : elem.addressBooksEntries) ? (_a = elem === null || elem === void 0 ? void 0 : elem.addressBooksEntries) === null || _a === void 0 ? void 0 : _a.length : 0); }, 0);
                    if (this.searchText && ((_f = this.currentEntities) === null || _f === void 0 ? void 0 : _f.length)) { //if searchText is present then the directory response for search
                        const currentSearchData = yield (db === null || db === void 0 ? void 0 : db.get(IndexDBStoreNames.DIRECTORY, IndexDBKeyNames.DIRECTORY_SEARCH_RESPONSE));
                        if (!currentSearchData) { // if no searchData is present in the indexDB that means its the first time we are searching for the searchText due to polling not been done earlier
                            directoryEvent = yield this.searchDirectoryData(this.searchText, this.currentEntities, shouldFetchAllAgents);
                            isUpdate = false;
                            yield (db === null || db === void 0 ? void 0 : db.put(IndexDBStoreNames.DIRECTORY, directoryEvent, IndexDBKeyNames.DIRECTORY_SEARCH_RESPONSE));
                        }
                        else { // else searchData is already their so we will just update the data in index DB
                            const newSearchData = { skillList: { data: [] }, agentList: { data: [], favoriteAgents: [] }, addressBookList: { data: [] }, teamList: { data: [] } };
                            this.currentEntities.forEach(entity => {
                                var _a, _b, _c, _d, _e, _f, _g, _h;
                                if (entity === DirectoryEntities.AGENT_LIST && ((_b = (_a = directoryEvent === null || directoryEvent === void 0 ? void 0 : directoryEvent.agentList) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.length)) {
                                    const { currentSearchAgentList, currentFavAgentList } = this.updateSearchAgentList(currentSearchData.agentList.data, directoryEvent.agentList.data);
                                    newSearchData.agentList.data = currentSearchAgentList;
                                    newSearchData.agentList.favoriteAgents = currentFavAgentList;
                                    this.favroiteAgentList = newSearchData.agentList.favoriteAgents;
                                }
                                if (entity === DirectoryEntities.SKILL_LIST && ((_d = (_c = directoryEvent === null || directoryEvent === void 0 ? void 0 : directoryEvent.skillList) === null || _c === void 0 ? void 0 : _c.data) === null || _d === void 0 ? void 0 : _d.length)) {
                                    newSearchData.skillList.data = this.updateSearchSkillList(currentSearchData.skillList.data, directoryEvent.skillList.data);
                                }
                                if (entity === DirectoryEntities.ADDRESS_BOOK_LIST && ((_f = (_e = directoryEvent === null || directoryEvent === void 0 ? void 0 : directoryEvent.addressBookList) === null || _e === void 0 ? void 0 : _e.data) === null || _f === void 0 ? void 0 : _f.length)) {
                                    newSearchData.addressBookList.data = this.updateAddressBookList(directoryEvent.addressBookList.data);
                                }
                                if (entity === DirectoryEntities.TEAM_LIST && ((_h = (_g = directoryEvent === null || directoryEvent === void 0 ? void 0 : directoryEvent.teamList) === null || _g === void 0 ? void 0 : _g.data) === null || _h === void 0 ? void 0 : _h.length)) {
                                    newSearchData.teamList.data = this.updateSearchTeamList(currentSearchData.teamList.data, directoryEvent.teamList.data);
                                }
                            });
                            yield (db === null || db === void 0 ? void 0 : db.put(IndexDBStoreNames.DIRECTORY, currentSearchData, IndexDBKeyNames.DIRECTORY_SEARCH_RESPONSE));
                            directoryEvent = currentSearchData;
                            this.entityCounts.agentList = ((_g = directoryEvent.agentList.data) === null || _g === void 0 ? void 0 : _g.length) || 0;
                            this.entityCounts.skillList = ((_h = directoryEvent.skillList.data) === null || _h === void 0 ? void 0 : _h.length) || 0;
                            this.entityCounts.addressBookList = ((_j = directoryEvent.addressBookList.data) === null || _j === void 0 ? void 0 : _j.length) || 0;
                            this.entityCounts.teamList = ((_k = directoryEvent.teamList.data) === null || _k === void 0 ? void 0 : _k.length) || 0;
                        }
                    }
                    else { // if search text is not present that means then the response should be for all the data set
                        if ((_l = this.currentEntities) === null || _l === void 0 ? void 0 : _l.length) {
                            isUpdate = false;
                            this.currentEntities.forEach(e => {
                                if (e === DirectoryEntities.AGENT_LIST) {
                                    directoryEvent.agentList.data = updatedDirectoryResponse.agentList.data;
                                    directoryEvent.agentList.favoriteAgents = updatedDirectoryResponse.agentList.favoriteAgents;
                                    this.favroiteAgentList = updatedDirectoryResponse.agentList.favoriteAgents;
                                }
                                if (e === DirectoryEntities.ADDRESS_BOOK_LIST)
                                    directoryEvent.addressBookList.data = updatedDirectoryResponse.addressBookList.data;
                                if (e === DirectoryEntities.SKILL_LIST)
                                    directoryEvent.skillList.data = updatedDirectoryResponse.skillList.data;
                                if (e === DirectoryEntities.TEAM_LIST)
                                    directoryEvent.teamList.data = updatedDirectoryResponse.teamList.data;
                            });
                        }
                        else if ((_m = directoryEvent.agentList.data) === null || _m === void 0 ? void 0 : _m.length) {
                            directoryEvent.agentList.data = this.sortAgentList(directoryEvent.agentList.data);
                        }
                        const user = this.acdSession.userInfo;
                        //based on shouldFetchAllAgents flag, fetching all agents here which includes current logged-in user as well
                        if (!shouldFetchAllAgents) {
                            directoryEvent.agentList.data = (_o = directoryEvent.agentList.data) === null || _o === void 0 ? void 0 : _o.filter(agent => agent.agentId.toString() !== user.icAgentId);
                        }
                        if (this.offset > 0 && this.limit > 0) { // to handle pagination
                            directoryEvent = yield this.handleDirectoryPagination(directoryEvent);
                        }
                    }
                    if ((_q = (_p = directoryEvent.addressBookList) === null || _p === void 0 ? void 0 : _p.data) === null || _q === void 0 ? void 0 : _q.length) {
                        directoryEvent.addressBookList.allAddressBookEntries = this.handleAddressBookList(directoryEvent.addressBookList.data);
                    }
                    this.publishDirectoryData(directoryEvent, isUpdate);
                }
            }
        });
    }
    /**
     * merge, sort and paginate addressBookList data
     * @param addressBookList - addressBookList data
     * @example
     * ```
     * this.handleAddressBookList(addressBookList);
     * ```
     */
    handleAddressBookList(addressBookList) {
        let allAddressBookEntries = [];
        // merge all addressBookEntries from all addressBooks
        addressBookList === null || addressBookList === void 0 ? void 0 : addressBookList.forEach((addressBook) => {
            if (addressBook.addressBooksEntries) {
                allAddressBookEntries.push(...addressBook.addressBooksEntries);
            }
        });
        // sort all addressBookEntries alphabetically
        if (allAddressBookEntries.length) {
            allAddressBookEntries = allAddressBookEntries.sort((a, b) => {
                if ((a.firstName + a.lastName).toUpperCase() > (b.firstName + b.lastName).toUpperCase()) {
                    return 1;
                }
                else {
                    return -1;
                }
            });
        }
        // sort all addressBookEntries based on the position of search text and then alphabetically
        if (this.searchText) {
            const searchText = this.searchText.toUpperCase();
            allAddressBookEntries = allAddressBookEntries.sort((a, b) => {
                const searchTermPositionA = (a.firstName + ' ' + a.lastName).toUpperCase().indexOf(searchText);
                const searchTermPositionB = (b.firstName + ' ' + b.lastName).toUpperCase().indexOf(searchText);
                return (searchTermPositionA === -1 ? 10000 : searchTermPositionA) - (searchTermPositionB === -1 ? 10000 : searchTermPositionB);
            });
        }
        //pagination
        if (this.offset > 0 && this.limit > 0) {
            allAddressBookEntries = allAddressBookEntries.slice(this.offset - 1, this.offset + this.limit - 1);
        }
        return allAddressBookEntries;
    }
    /**
     * Published finan output of directory data
     * @param response - processed directory data
     * @example
     * ```
     * this.publishFinalDirectoryData(directoryResponse);
     * ```
     */
    publishFinalDirectoryData(directoryResponse) {
        this.directoryBase.directoryEvent.next(directoryResponse);
    }
    /**
     * Used to publish the directory response to the subscriber
     * also updating the total record for each entity before publishing
     * @param directoryResponse - directory response which needs to be published
     * @param isUpdate - this boolean flag will help us to identify if the request is for update or not
     */
    publishDirectoryData(directoryResponse, isUpdate = false) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s;
        if (!isUpdate || ((_b = (_a = directoryResponse === null || directoryResponse === void 0 ? void 0 : directoryResponse.agentList) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.length) || ((_d = (_c = directoryResponse === null || directoryResponse === void 0 ? void 0 : directoryResponse.addressBookList) === null || _c === void 0 ? void 0 : _c.data) === null || _d === void 0 ? void 0 : _d.length)
            || ((_f = (_e = directoryResponse === null || directoryResponse === void 0 ? void 0 : directoryResponse.skillList) === null || _e === void 0 ? void 0 : _e.data) === null || _f === void 0 ? void 0 : _f.length) || ((_h = (_g = directoryResponse === null || directoryResponse === void 0 ? void 0 : directoryResponse.teamList) === null || _g === void 0 ? void 0 : _g.data) === null || _h === void 0 ? void 0 : _h.length)) {
            directoryResponse.agentList.totalRecords = this.entityCounts.agentList;
            directoryResponse.skillList.totalRecords = this.entityCounts.skillList;
            directoryResponse.agentList.allAgentCount = this.entityCounts.totalAgentCount;
            directoryResponse.addressBookList.totalRecords = this.entityCounts.addressBookList;
            directoryResponse.teamList.totalRecords = this.entityCounts.teamList;
            directoryResponse.teamList.allTeamCount = this.entityCounts.totalTeamCount;
            directoryResponse.skillList.allSkillCount = this.entityCounts.totalSkillCount;
            directoryResponse.addressBookList.allAddressBookCount = this.entityCounts.totalAddressBookCount;
            directoryResponse.skillList.totalSearchMatchRecords = this.totalSearchResultCount.skillList;
            directoryResponse.agentList.totalSearchMatchRecords = this.totalSearchResultCount.agentList;
            directoryResponse.teamList.totalSearchMatchRecords = this.totalSearchResultCount.teamList;
            directoryResponse.addressBookList.totalSearchMatchRecords = this.totalSearchResultCount.addressBookList;
            directoryResponse.agentList.favoriteAgents = this.favroiteAgentList || [];
            if ((_j = this.currentEntities) === null || _j === void 0 ? void 0 : _j.length) {
                if (this.currentEntities.includes(DirectoryEntities.ADDRESS_BOOK_LIST) && !((_l = (_k = directoryResponse === null || directoryResponse === void 0 ? void 0 : directoryResponse.addressBookList) === null || _k === void 0 ? void 0 : _k.data) === null || _l === void 0 ? void 0 : _l.length))
                    directoryResponse.addressBookList.errorMsg = NO_MATCHING_RECORDS_FOUND;
                if (this.currentEntities.includes(DirectoryEntities.AGENT_LIST) && !((_o = (_m = directoryResponse === null || directoryResponse === void 0 ? void 0 : directoryResponse.agentList) === null || _m === void 0 ? void 0 : _m.data) === null || _o === void 0 ? void 0 : _o.length))
                    directoryResponse.agentList.errorMsg = NO_MATCHING_RECORDS_FOUND;
                if (this.currentEntities.includes(DirectoryEntities.SKILL_LIST) && !((_q = (_p = directoryResponse === null || directoryResponse === void 0 ? void 0 : directoryResponse.skillList) === null || _p === void 0 ? void 0 : _p.data) === null || _q === void 0 ? void 0 : _q.length))
                    directoryResponse.skillList.errorMsg = NO_MATCHING_RECORDS_FOUND;
                if (this.currentEntities.includes(DirectoryEntities.TEAM_LIST) && !((_s = (_r = directoryResponse === null || directoryResponse === void 0 ? void 0 : directoryResponse.teamList) === null || _r === void 0 ? void 0 : _r.data) === null || _s === void 0 ? void 0 : _s.length))
                    directoryResponse.teamList.errorMsg = NO_MATCHING_RECORDS_FOUND;
                if (!this.searchText)
                    this.currentEntities = [];
            }
            this.publishFinalDirectoryData(directoryResponse);
        }
    }
    /**
     * Used to update the addressBook list for search response matching new Response from the polling update with the existing search response saved in the index db
     * @param newAddressBooks -new response for the updated addressBook data
     */
    updateAddressBookList(newAddressBooks) {
        const newAddressBookList = [];
        newAddressBooks.forEach(addressBook => {
            var _a, _b;
            const newAddressBook = Object.assign(Object.assign({}, addressBook), { addressBooksEntries: [] });
            (_a = addressBook === null || addressBook === void 0 ? void 0 : addressBook.addressBooksEntries) === null || _a === void 0 ? void 0 : _a.forEach(addressBookEntry => {
                var _a;
                if (this.lastAddressBookSearchEntriesMap.has(addressBookEntry.addressBookEntryId)) {
                    (_a = newAddressBook === null || newAddressBook === void 0 ? void 0 : newAddressBook.addressBooksEntries) === null || _a === void 0 ? void 0 : _a.push(addressBookEntry);
                }
            });
            if ((_b = newAddressBook === null || newAddressBook === void 0 ? void 0 : newAddressBook.addressBooksEntries) === null || _b === void 0 ? void 0 : _b.length)
                newAddressBookList.push(newAddressBook);
        });
        return newAddressBookList;
    }
    /**
     * Used to update the agent list for search response matching new Response from the polling update with the existing search response saved in the index db
     * @param currentSearchAgentList - saved agent list from the index db
     * @param newAgentList - new response for the updated addressBook data
     */
    updateSearchAgentList(currentSearchAgentList, newAgentList) {
        const currentFavAgentList = [];
        newAgentList.forEach(newAgent => {
            const matchAgentIndex = currentSearchAgentList.findIndex(currentAgent => currentAgent.agentId == newAgent.agentId);
            if (matchAgentIndex >= 0) {
                /*
                Before polled data overrides the Index DB data, we check if an instance of agent in Index DB has
                the favorite field marked to true. If it is, we mark the respective field to true in the polled data too(at the matched index),
                before we finally override and perform the PUT operation.
                */
                if (currentSearchAgentList[matchAgentIndex].isFavorite) {
                    newAgent.isFavorite = currentSearchAgentList[matchAgentIndex].isFavorite;
                    currentFavAgentList.push(currentSearchAgentList[matchAgentIndex]);
                }
                currentSearchAgentList[matchAgentIndex] = newAgent;
            }
        });
        return { currentSearchAgentList, currentFavAgentList };
    }
    /**
     * Used to update the skill list for search response matching new Response from the polling update with the existing search response saved in the index db
     * @param currentSearchSkillList - saved skill list from the index db
     * @param newSkillList - new response for the updated skill data
     */
    updateSearchSkillList(currentSearchSkillList, newSkillList) {
        newSkillList.forEach(newSkill => {
            const matchSkillIndex = currentSearchSkillList === null || currentSearchSkillList === void 0 ? void 0 : currentSearchSkillList.findIndex(currentAgent => currentAgent.skillId == newSkill.skillId);
            if (matchSkillIndex >= 0)
                currentSearchSkillList[matchSkillIndex] = newSkill;
        });
        return currentSearchSkillList;
    }
    /**
    * Used to update the search team list for search response matching new Response from the polling update with the existing search response saved in the index db
    * @param currentSearchTeamList - saved team list from the index db
    * @param newSkillList - new response for the updated team data
    */
    updateSearchTeamList(currentSearchTeamList, newTeamList) {
        newTeamList.forEach(newTeam => {
            const matchTeamIndex = currentSearchTeamList === null || currentSearchTeamList === void 0 ? void 0 : currentSearchTeamList.findIndex(currentTeam => currentTeam.teamId == newTeam.teamId);
            if (matchTeamIndex >= 0)
                currentSearchTeamList[matchTeamIndex] = newTeam;
        });
        return currentSearchTeamList;
    }
    /**
     * Used to handle the pagination based on the offset and limit in case of normal directory request flow without search request
     * @param directoryResponse - directory response object
     */
    handleDirectoryPagination(directoryResponse) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t;
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield dbInstance();
            let currentAgentList = yield (db === null || db === void 0 ? void 0 : db.get(IndexDBStoreNames.DIRECTORY, DirectoryEntities.AGENT_LIST));
            let currentSkillList = yield (db === null || db === void 0 ? void 0 : db.get(IndexDBStoreNames.DIRECTORY, DirectoryEntities.SKILL_LIST));
            const currentTeamList = yield (db === null || db === void 0 ? void 0 : db.get(IndexDBStoreNames.DIRECTORY, DirectoryEntities.TEAM_LIST));
            let agentList = [];
            let skillList = [];
            let teamList = [];
            if (this.teamId) {
                currentAgentList = this.filterAgentDataByTeamId(currentAgentList, this.teamId);
            }
            if (this.mediaType) { // if mediaType is present then we need to filter skills based on mediaType and then handle the pagination
                currentSkillList = this.filterSkillByMediaType(currentSkillList);
            }
            for (let i = this.offset - 1; i < (this.limit + this.offset - 1); i++) { // to filter the data as per the pagination offset and limit from the data set
                ((_b = (_a = directoryResponse.agentList) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.length) && (currentAgentList === null || currentAgentList === void 0 ? void 0 : currentAgentList.length) && currentAgentList[i] && agentList.push(currentAgentList[i]);
                ((_d = (_c = directoryResponse.skillList) === null || _c === void 0 ? void 0 : _c.data) === null || _d === void 0 ? void 0 : _d.length) && (currentSkillList === null || currentSkillList === void 0 ? void 0 : currentSkillList.length) && currentSkillList[i] && skillList.push(currentSkillList[i]);
                ((_f = (_e = directoryResponse.teamList) === null || _e === void 0 ? void 0 : _e.data) === null || _f === void 0 ? void 0 : _f.length) && (currentTeamList === null || currentTeamList === void 0 ? void 0 : currentTeamList.length) && currentTeamList[i] && teamList.push(currentTeamList[i]);
            }
            if (((_h = (_g = directoryResponse.agentList) === null || _g === void 0 ? void 0 : _g.data) === null || _h === void 0 ? void 0 : _h.length) && currentAgentList.length && agentList.length) { // in case of agent list updation we will check if the updated data is present in the search option if so then only we will publish that data
                const newAgentList = [];
                (_k = (_j = directoryResponse.agentList) === null || _j === void 0 ? void 0 : _j.data) === null || _k === void 0 ? void 0 : _k.forEach(agent => {
                    const matchedAgentIndex = agentList.findIndex(e => e.agentId == agent.agentId);
                    if (matchedAgentIndex >= 0)
                        newAgentList.push(agent);
                });
                agentList = newAgentList;
            }
            if (((_m = (_l = directoryResponse.skillList) === null || _l === void 0 ? void 0 : _l.data) === null || _m === void 0 ? void 0 : _m.length) && currentSkillList.length && skillList.length) { // in case of skill list updation we will check if the updated data is present in the search option if so then only we will publish that data
                const newSkillList = [];
                (_p = (_o = directoryResponse.skillList) === null || _o === void 0 ? void 0 : _o.data) === null || _p === void 0 ? void 0 : _p.forEach(skill => {
                    const matchedSkillIndex = skillList.findIndex(e => e.skillId == skill.skillId);
                    if (matchedSkillIndex >= 0)
                        newSkillList.push(skill);
                });
                skillList = newSkillList;
            }
            if (((_r = (_q = directoryResponse.teamList) === null || _q === void 0 ? void 0 : _q.data) === null || _r === void 0 ? void 0 : _r.length) && (currentTeamList === null || currentTeamList === void 0 ? void 0 : currentTeamList.length) && teamList.length) { // in case of team list updation we will check if the updated data is present in the search option if so then only we will publish that data
                const newTeamList = [];
                (_t = (_s = directoryResponse.teamList) === null || _s === void 0 ? void 0 : _s.data) === null || _t === void 0 ? void 0 : _t.forEach(agent => {
                    const matchedTeamIndex = teamList.findIndex(e => e.teamId == agent.teamId);
                    if (matchedTeamIndex >= 0)
                        newTeamList.push(agent);
                });
                teamList = newTeamList;
            }
            directoryResponse.agentList.data = agentList;
            directoryResponse.skillList.data = skillList;
            directoryResponse.teamList.data = teamList;
            //update entity count after pagination 
            this.entityCounts.agentList = directoryResponse.agentList.data.length || 0;
            this.entityCounts.skillList = directoryResponse.skillList.data.length || 0;
            this.entityCounts.addressBookList = directoryResponse.addressBookList.data.length || 0;
            this.entityCounts.teamList = directoryResponse.teamList.data.length || 0;
            return directoryResponse;
        });
    }
    /**
    * Used to update the skill list in index DB as per the new list
    * @param SkillList - new skill list response
    */
    updateSkillListInDB(SkillList) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield dbInstance();
            let currentSkillList = (yield (db === null || db === void 0 ? void 0 : db.get(IndexDBStoreNames.DIRECTORY, DirectoryEntities.SKILL_LIST))) || [];
            if (currentSkillList === null || currentSkillList === void 0 ? void 0 : currentSkillList.length) {
                SkillList.forEach((skill, index) => {
                    const matchedSkillIndex = currentSkillList.findIndex((currentSkill) => currentSkill.skillId == skill.skillId);
                    if (matchedSkillIndex >= 0)
                        currentSkillList[matchedSkillIndex] = SkillList[index];
                    else
                        currentSkillList.push(skill);
                });
            }
            else {
                currentSkillList = SkillList;
            }
            currentSkillList = this.sortResponse(currentSkillList, DirectoryEntities.SKILL_LIST);
            db === null || db === void 0 ? void 0 : db.put(IndexDBStoreNames.DIRECTORY, currentSkillList, DirectoryEntities.SKILL_LIST);
            if (this.mediaType)
                currentSkillList = this.filterSkillByMediaType(currentSkillList); // in case of result requested based on media type we will filter out the skills and publish the filtered list
            if (!this.searchText)
                this.entityCounts.skillList = (currentSkillList === null || currentSkillList === void 0 ? void 0 : currentSkillList.length) || 0; // to keep track of skill list records count
            return currentSkillList;
        });
    }
    /**
     * Used to toggle the favorite marker for agent and store it in Index DB
     * @param agent - Information of the agent of whom favorite field needs to be toggled
     * @example
     * directoryProvider.toggleFavorite(agent);
     */
    toggleFavoriteForAgent(agentInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield dbInstance();
            let agentListSearchResponse;
            const favList = [];
            const agentListFromDB = (yield (db === null || db === void 0 ? void 0 : db.get(IndexDBStoreNames.DIRECTORY, DirectoryEntities.AGENT_LIST))) || [];
            const directorySearchResponse = (yield (db === null || db === void 0 ? void 0 : db.get(IndexDBStoreNames.DIRECTORY, IndexDBKeyNames.DIRECTORY_SEARCH_RESPONSE)));
            if (directorySearchResponse && directorySearchResponse.agentList) {
                agentListSearchResponse = directorySearchResponse.agentList
                    .data;
                if (agentListSearchResponse === null || agentListSearchResponse === void 0 ? void 0 : agentListSearchResponse.length) {
                    agentListSearchResponse.find((agent) => {
                        if (agent.agentId === agentInfo.agentId) {
                            agent.isFavorite = !agent.isFavorite;
                        }
                    });
                }
                directorySearchResponse.agentList.data = agentListSearchResponse;
            }
            if (agentListFromDB === null || agentListFromDB === void 0 ? void 0 : agentListFromDB.length) {
                agentListFromDB.find((agent) => {
                    if (agent.agentId === agentInfo.agentId) {
                        agent.isFavorite = !agent.isFavorite;
                    }
                    if (agent.isFavorite) {
                        favList.push(agent);
                    }
                });
            }
            db === null || db === void 0 ? void 0 : db.put(IndexDBStoreNames.DIRECTORY, agentListFromDB, DirectoryEntities.AGENT_LIST);
            db === null || db === void 0 ? void 0 : db.put(IndexDBStoreNames.DIRECTORY, directorySearchResponse, IndexDBKeyNames.DIRECTORY_SEARCH_RESPONSE);
            db === null || db === void 0 ? void 0 : db.put(IndexDBStoreNames.DIRECTORY, favList, IndexDBKeyNames.FAVORITE_AGENTS);
            const directoryResponse = {
                skillList: { data: [] },
                agentList: { data: [], favoriteAgents: [] },
                addressBookList: { data: [] },
                teamList: { data: [] },
            };
            if (directorySearchResponse) {
                directoryResponse.skillList.data = directorySearchResponse.skillList ? directorySearchResponse.skillList.data : [];
                directoryResponse.teamList.data = directorySearchResponse.teamList ? directorySearchResponse.teamList.data : [];
                directoryResponse.addressBookList.data = directorySearchResponse.addressBookList ? directorySearchResponse.addressBookList.data : [];
                directoryResponse.agentList.data = directorySearchResponse.agentList ? directorySearchResponse.agentList.data : [];
                directoryResponse.agentList.favoriteAgents = favList;
            }
            //publish directory search response with updated fav toggle information
            if (directoryResponse.agentList.data.length)
                this.directoryBase.directoryEvent.next(directoryResponse);
        });
    }
    /**
     * Used to retrieve agent list from index DB and filter out favorites
     * @param searchText - searchText for filtering the list
     * @example
     * directoryProvider.getFavorites(searchText);
     */
    getFavoritesByAgent(agentName) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield dbInstance();
            let favAgentList = [];
            const agentListFromDB = (yield (db === null || db === void 0 ? void 0 : db.get(IndexDBStoreNames.DIRECTORY, DirectoryEntities.AGENT_LIST))) || [];
            if (agentListFromDB === null || agentListFromDB === void 0 ? void 0 : agentListFromDB.length) {
                favAgentList = agentListFromDB === null || agentListFromDB === void 0 ? void 0 : agentListFromDB.filter((agent) => agent.isFavorite === true);
                if (agentName.length > 0) {
                    favAgentList = this.getFilteredAgentList(agentName.toUpperCase(), favAgentList);
                }
            }
            this.favroiteAgentList = favAgentList;
            db === null || db === void 0 ? void 0 : db.put(IndexDBStoreNames.DIRECTORY, favAgentList, IndexDBKeyNames.FAVORITE_AGENTS);
            return favAgentList;
        });
    }
    /**
     * Used to update the agent list in index DB as per the new list
     * @param agentList - new agent list response
     */
    updateAgentListInDB(agentList) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield dbInstance();
            let currentAgentList = (yield (db === null || db === void 0 ? void 0 : db.get(IndexDBStoreNames.DIRECTORY, DirectoryEntities.AGENT_LIST))) || [];
            let currentFavAgentList = (yield (db === null || db === void 0 ? void 0 : db.get(IndexDBStoreNames.DIRECTORY, IndexDBKeyNames.FAVORITE_AGENTS))) || [];
            if (currentAgentList === null || currentAgentList === void 0 ? void 0 : currentAgentList.length) {
                agentList.forEach((agentState, index) => {
                    const matchedAgentStateIndex = currentAgentList.findIndex((currentAgentState) => currentAgentState.agentId == agentState.agentId);
                    if (matchedAgentStateIndex >= 0) {
                        /*
                      Before polled data overrides the Index DB data, we check if an instance of agent in Index DB has
                      the favorite field marked to true. If it is, we mark the respective field to true in the polled data too(at the matched index),
                      before we finally override and perform the PUT operation.
                      */
                        if (currentAgentList[matchedAgentStateIndex].isFavorite) {
                            agentList[index].isFavorite =
                                currentAgentList[matchedAgentStateIndex].isFavorite;
                            const favIndex = currentFavAgentList.findIndex((fav) => fav.agentId === agentList[index].agentId);
                            if (favIndex >= 0)
                                currentFavAgentList[favIndex] = agentList[index];
                        }
                        currentAgentList[matchedAgentStateIndex] = agentList[index];
                    }
                    else
                        currentAgentList.push(agentState);
                });
            }
            else {
                currentAgentList = agentList;
            }
            currentAgentList = this.sortAgentList(currentAgentList);
            currentFavAgentList = this.sortAgentList(currentFavAgentList);
            db === null || db === void 0 ? void 0 : db.put(IndexDBStoreNames.DIRECTORY, currentAgentList, DirectoryEntities.AGENT_LIST);
            db === null || db === void 0 ? void 0 : db.put(IndexDBStoreNames.DIRECTORY, currentFavAgentList, IndexDBKeyNames.FAVORITE_AGENTS);
            if (!this.searchText)
                this.entityCounts.agentList = (currentAgentList === null || currentAgentList === void 0 ? void 0 : currentAgentList.length) || 0; // to keep track of agent list records count
            return { currentAgentList, currentFavAgentList };
        });
    }
    /**
     * Used to update the team list in index DB as per the new list
     * @param teamList - new team list response
     */
    updateTeamListInDB(teamList) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield dbInstance();
            let currentTeamList = (yield (db === null || db === void 0 ? void 0 : db.get(IndexDBStoreNames.DIRECTORY, DirectoryEntities.TEAM_LIST))) || [];
            if (currentTeamList === null || currentTeamList === void 0 ? void 0 : currentTeamList.length) {
                teamList.forEach((team, index) => {
                    const matchedTeamIndex = currentTeamList.findIndex((currentTeam) => currentTeam.teamId == team.teamId);
                    if (matchedTeamIndex >= 0)
                        currentTeamList[matchedTeamIndex] = teamList[index];
                    else
                        currentTeamList.push(team);
                });
            }
            else {
                currentTeamList = teamList;
            }
            currentTeamList = this.sortResponse(currentTeamList, DirectoryEntities.TEAM_LIST);
            currentTeamList = currentTeamList.filter(team => team.isActive);
            db === null || db === void 0 ? void 0 : db.put(IndexDBStoreNames.DIRECTORY, currentTeamList, DirectoryEntities.TEAM_LIST);
            if (!this.searchText)
                this.entityCounts.teamList = (currentTeamList === null || currentTeamList === void 0 ? void 0 : currentTeamList.length) || 0; // to keep track of team list records count
            return currentTeamList;
        });
    }
    /**
     * Used to update the address list in index DB as per the new list
     * @param addressBookList - new address book list response
     */
    updateAddressBookListInDB(addressBookList) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield dbInstance();
            this.lastAddressBookEntriesArray = [];
            let currentAddressBookList = (yield (db === null || db === void 0 ? void 0 : db.get(IndexDBStoreNames.DIRECTORY, DirectoryEntities.ADDRESS_BOOK_LIST))) || [];
            if (currentAddressBookList === null || currentAddressBookList === void 0 ? void 0 : currentAddressBookList.length) {
                addressBookList.forEach((addressBook) => {
                    var _a;
                    const addressBookEntries = (addressBook === null || addressBook === void 0 ? void 0 : addressBook.addressBooksEntries) || [];
                    const matchedAddressBookIndex = currentAddressBookList.findIndex((currentAddressBook) => currentAddressBook.addressBookId == addressBook.addressBookId);
                    if (matchedAddressBookIndex >= 0) {
                        if (addressBookEntries.length) {
                            const currentAddressBookEntries = ((_a = currentAddressBookList[matchedAddressBookIndex]) === null || _a === void 0 ? void 0 : _a.addressBooksEntries) || [];
                            if (currentAddressBookList === null || currentAddressBookList === void 0 ? void 0 : currentAddressBookList.length) {
                                addressBookEntries.forEach((addressBookEntry, index) => {
                                    addressBookEntry.addressBookName = addressBook.addressBookName;
                                    const matchedAddressBookEntryIndex = currentAddressBookEntries.findIndex((currentAddressBookEntry) => currentAddressBookEntry.addressBookEntryId == addressBookEntry.addressBookEntryId);
                                    if (matchedAddressBookEntryIndex >= 0)
                                        currentAddressBookEntries[matchedAddressBookEntryIndex] = addressBookEntries[index];
                                    else
                                        currentAddressBookEntries.push(addressBookEntry);
                                });
                                currentAddressBookList[matchedAddressBookIndex].addressBooksEntries = currentAddressBookEntries;
                            }
                            else {
                                currentAddressBookList[matchedAddressBookIndex].addressBooksEntries = addressBookEntries;
                            }
                        }
                    }
                    else {
                        currentAddressBookList.push(addressBook);
                    }
                });
            }
            else {
                currentAddressBookList = addressBookList;
            }
            addressBookList.forEach(addressBook => {
                var _a;
                (_a = addressBook === null || addressBook === void 0 ? void 0 : addressBook.addressBooksEntries) === null || _a === void 0 ? void 0 : _a.forEach(addressBookEntry => {
                    this.lastAddressBookEntriesArray.push({ firstName: addressBookEntry.firstName, lastName: addressBookEntry.lastName,
                        addressBookEntryId: addressBookEntry.addressBookEntryId, addressBookId: addressBook.addressBookId });
                });
            });
            const sortedEntries = this.lastAddressBookEntriesArray.slice().sort((a, b) => {
                if ((a.firstName.toUpperCase() + a.lastName.toUpperCase()) > (b.firstName.toUpperCase() + b.lastName.toUpperCase())) {
                    return 1;
                }
                else {
                    return -1;
                }
            });
            this.lastAddressBookEntriesArray = sortedEntries;
            if (!this.searchText)
                this.entityCounts.addressBookList = ((_a = this.lastAddressBookEntriesArray) === null || _a === void 0 ? void 0 : _a.length) || 0; // to keep track of addressBook list records count
            db === null || db === void 0 ? void 0 : db.put(IndexDBStoreNames.DIRECTORY, currentAddressBookList, DirectoryEntities.ADDRESS_BOOK_LIST);
            return currentAddressBookList;
        });
    }
    /**
     * Use to initializing the util worker and will return the method inside the worker
     * @example
     * ```
     * this.initDirectoryWorker();
     * ```
     */
    initUtilWorker() {
        const loader = new LoadWorker();
        this.pollingWorker = loader.getWorker('util-worker', 'ccf-directory-polling-worker');
    }
    /**
     * Use to restart worker
     * @example
     * ```
     * this.restartWorker();
     * ```
     */
    restartWorker() {
        if (this.pollingWorker) {
            this.terminatePolling();
            this.requestDirectoryData(this.pollingOptions, this.entity);
        }
    }
    /**
     * Use to terminate the directory worker
     * @example -
     * ```
     * this.terminateDirectoryWorker
     * ```
     */
    terminateDirectoryWorker() {
        var _a;
        (_a = this.pollingWorker) === null || _a === void 0 ? void 0 : _a.terminate();
        this.pollingWorker = undefined;
    }
    /**
     * Used to filter out the skill list based on current mediaType
     * @param skillList - new skill list response
     */
    filterSkillByMediaType(skillList) {
        return (skillList.filter(skill => skill.mediaType === (this === null || this === void 0 ? void 0 : this.mediaType) && skill.isActive) || []);
    }
    /**
     * Used to update the team list in index DB as per the new list
     * @param agentList - new agent list response
     * @param teamId - teamId on which we need to filter agents
     */
    filterAgentDataByTeamId(agentList, teamId) {
        return (agentList.filter(item => item.teamId.toString() === teamId.toString()) || []);
    }
    /**
     * Use to sort the index db data for agents, skills and teams in ascending order
     * @example -
     * ```
     * @param list - new list response
     * @param type - which directory entity (agents, skills or teams)
     * this.sortResponse(list, type)
     * ```
    */
    sortResponse(responseData, type) {
        let firstValue = '', secondValue = '';
        responseData.sort((a, b) => {
            switch (type) {
                case DirectoryEntities.AGENT_LIST:
                    firstValue = a.firstName.toLowerCase();
                    secondValue = b.firstName.toLowerCase();
                    break;
                case DirectoryEntities.SKILL_LIST:
                    firstValue = a.skillName.toLowerCase();
                    secondValue = b.skillName.toLowerCase();
                    break;
                case DirectoryEntities.TEAM_LIST:
                    firstValue = a.teamName.toLowerCase();
                    secondValue = b.teamName.toLowerCase();
                    break;
            }
            if (firstValue > secondValue) {
                return 1;
            }
            if (firstValue < secondValue) {
                return -1;
            }
            return 0;
        });
        return responseData;
    }
    /**
     * @param agentStateName - string
     * @returns agentState - number
     * @example getAgentState(agentState)
     */
    getAgentStateOrDefault(agentStateName) {
        return AgentState[agentStateName === null || agentStateName === void 0 ? void 0 : agentStateName.toLowerCase()] || AgentState.unavailable;
    }
    /**
     *
     * @param agentList - list of agent
     * @param searchText - used to sort data by position of the searchText.
     * @returns sorted Agent List
     * @example sortAgentList(agentlist, searchText)
     */
    sortAgentList(agentList, searchText) {
        //sort agent list by agent state.
        let sortedAgentList = agentList.sort((agentA, agentB) => {
            return this.getAgentStateOrDefault(agentA.agentStateName) - this.getAgentStateOrDefault(agentB.agentStateName);
        });
        // sort agent list with same state alphabetically.
        sortedAgentList = sortedAgentList.sort((agentA, agentB) => {
            if (this.getAgentStateOrDefault(agentA.agentStateName) === this.getAgentStateOrDefault(agentB.agentStateName)) {
                return (agentA.firstName + ' ' + agentA.lastName).toUpperCase().localeCompare((agentB.firstName + ' ' + agentB.lastName).toUpperCase());
            }
            return 0;
        });
        // sort agent list with same state by the position of search term.
        if (searchText) {
            sortedAgentList = sortedAgentList.sort((agentA, agentB) => {
                if (this.getAgentStateOrDefault(agentA.agentStateName) === this.getAgentStateOrDefault(agentB.agentStateName)) {
                    const searchTermPositionA = (agentA.firstName + ' ' + agentA.lastName).toUpperCase().indexOf(searchText);
                    const searchTermPositionB = (agentB.firstName + ' ' + agentB.lastName).toUpperCase().indexOf(searchText);
                    return searchTermPositionA - searchTermPositionB;
                }
                return 0;
            });
        }
        return sortedAgentList;
    }
}
//# sourceMappingURL=cxone-directory-provider.js.map