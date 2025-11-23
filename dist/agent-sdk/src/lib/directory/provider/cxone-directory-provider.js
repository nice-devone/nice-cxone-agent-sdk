import { __awaiter } from "tslib";
import { ACDSessionManager, ApiUriConstants, HttpUtilService, Logger, IndexDBStoreNames, dbInstance, IndexDBKeyNames, clearIndexDbStore, LocalStorageHelper, StorageKeys, LoadWorker, } from '@nice-devone/core-sdk';
import { MessageBus, MessageType, DirectoryEntities, } from '@nice-devone/common-sdk';
import { CXoneDirectoryAdapter } from '../adapter/cxone-directory-adapter';
import { DirectorySearchFilter, handleDirectoryItemDeletion } from '../util/utility';
import { AuthStatus } from '@nice-devone/auth-sdk';
import { FeatureToggleService } from '../../feature-toggle/feature-toggle-services';
import { UnifiedDirectoryAgentStates } from '../../agent-state/enum/unified-agent-state';
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
const UnifiedAgentStateSortOrder = {
    [UnifiedDirectoryAgentStates.AGENT_STATE_AWAITING_CONTACTS]: 1,
    [UnifiedDirectoryAgentStates.AGENT_STATE_UNAVAILABLE]: 2,
    [UnifiedDirectoryAgentStates.AGENT_STATE_WORKING_CONTACTS]: 3,
    [UnifiedDirectoryAgentStates.AGENT_STATE_ENDED]: 4,
    [UnifiedDirectoryAgentStates.AGENT_STATE_UNSPECIFIED]: 5,
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
        this.favoriteTeamList = [];
        this.favoriteSkillList = [];
        this.favoriteAddressBookList = [];
        this.isFavoritesFTEnabled = FeatureToggleService.instance.getFeatureToggleSync("release-cxa-favorites-AW-40314" /* FeatureToggles.CXA_FAVORITES_FEATURE_TOGGLE */);
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
                this.searchText = searchText;
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
            var _a, _b;
            const firstAndLast = (agent === null || agent === void 0 ? void 0 : agent.firstName) + ' ' + (agent === null || agent === void 0 ? void 0 : agent.lastName);
            const lastAndFirst = (agent === null || agent === void 0 ? void 0 : agent.lastName) + ' ' + (agent === null || agent === void 0 ? void 0 : agent.firstName);
            return ((_a = firstAndLast === null || firstAndLast === void 0 ? void 0 : firstAndLast.toUpperCase()) === null || _a === void 0 ? void 0 : _a.includes(searchText)) || ((_b = lastAndFirst === null || lastAndFirst === void 0 ? void 0 : lastAndFirst.toUpperCase()) === null || _b === void 0 ? void 0 : _b.includes(searchText));
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
                const filteredAddressBookEntries = (_b = addressBook.addressBooksEntries) === null || _b === void 0 ? void 0 : _b.filter(list => {
                    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
                    return ((_c = (((_a = list === null || list === void 0 ? void 0 : list.firstName) === null || _a === void 0 ? void 0 : _a.toUpperCase()) + ' ' + ((_b = list === null || list === void 0 ? void 0 : list.lastName) === null || _b === void 0 ? void 0 : _b.toUpperCase()))) === null || _c === void 0 ? void 0 : _c.includes(searchText)) ||
                        (((_d = list === null || list === void 0 ? void 0 : list.firstName) === null || _d === void 0 ? void 0 : _d.toUpperCase()) + ' ' + ((_e = list === null || list === void 0 ? void 0 : list.middleName) === null || _e === void 0 ? void 0 : _e.toUpperCase()) + ' ' + ((_f = list === null || list === void 0 ? void 0 : list.lastName) === null || _f === void 0 ? void 0 : _f.toUpperCase())).includes(searchText) ||
                        ((_g = list === null || list === void 0 ? void 0 : list.lastName) === null || _g === void 0 ? void 0 : _g.toUpperCase().includes(searchText)) ||
                        ((_h = list === null || list === void 0 ? void 0 : list.mobile) === null || _h === void 0 ? void 0 : _h.includes(searchText)) ||
                        ((_j = list === null || list === void 0 ? void 0 : list.phone) === null || _j === void 0 ? void 0 : _j.includes(searchText)) ||
                        ((_k = list === null || list === void 0 ? void 0 : list.email) === null || _k === void 0 ? void 0 : _k.toUpperCase().includes(searchText));
                });
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
        let updatedSinceValue = LocalStorageHelper.getItem(StorageKeys.DIRECTORY_POLLING_UPDATED_SINCE) || new Date(0).toISOString();
        let teamUpdatedSinceValue = LocalStorageHelper.getItem(StorageKeys.TEAM_POLLING_UPDATED_SINCE) || new Date(0).toISOString();
        let skillUpdatedSinceValue = LocalStorageHelper.getItem(StorageKeys.SKILL_POLLING_UPDATED_SINCE) || new Date(0).toISOString();
        this.entity = entity;
        this.isFreshRequest = true; // whenever new api request for directory is made that means its an explicit user request to get the directory data as per the entity provided
        this.logger.info('startPolling', 'startPolling in CXoneDirectoryProvider');
        const requests = [];
        const isFTUnifyAgentStateOn = FeatureToggleService.instance.getFeatureToggleSync("release-cx-directory-agent-state-working-digital-AW-28472" /* FeatureToggles.DIRECTORY_AGENT_STATE_WORKING_DIGITAL_FEATURE_TOGGLE */);
        this.baseUri = isFTUnifyAgentStateOn ? this.acdSession.cxOneConfig.apiFacadeBaseUri : this.acdSession.cxOneConfig.acdApiBaseUri;
        const authToken = this.acdSession.accessToken;
        if (this.baseUri && authToken) {
            if (entity.includes(DirectoryEntities.AGENT_LIST)) {
                if (isFTUnifyAgentStateOn) {
                    const agentStateUrl = new URL(ApiUriConstants.AGENT_STATE_UNIFY_URI, this.baseUri);
                    agentStateUrl.searchParams.set('updatedSince', updatedSinceValue);
                    const agentStateRequest = {
                        headers: this.utilService.initHeader(authToken).headers,
                    };
                    requests.push({
                        url: agentStateUrl.toString(),
                        request: agentStateRequest,
                        id: DirectoryEntities.AGENT_LIST,
                    });
                }
                else {
                    const agentStateUrl = new URL(ApiUriConstants.AGENT_STATE_URI, this.baseUri);
                    agentStateUrl.searchParams.set('fields', 'agentId,agentStateName,contactId,firstName,isActive,isOutbound,lastName,lastPollTime,lastUpdateTime,mediaName,outStateCode,outStateDescription,skillId,skillName,startDate,stationPhoneNumber,teamId,teamName,userName,userId');
                    if (updatedSinceValue) {
                        agentStateUrl.searchParams.set('updatedSince', updatedSinceValue);
                    }
                    const agentStateRequest = {
                        headers: this.utilService.initHeader(authToken).headers,
                    };
                    requests.push({
                        url: agentStateUrl.toString(),
                        request: agentStateRequest,
                        id: DirectoryEntities.AGENT_LIST,
                    });
                }
            }
            if (entity.includes(DirectoryEntities.SKILL_LIST)) {
                const skillUrl = new URL(ApiUriConstants.SKILL_ACTIVITY_URI, this.baseUri);
                skillUrl.searchParams.set('fields', 'isActive,isOutbound,mediaTypeId,mediaTypeName,skillId,skillName');
                skillUrl.searchParams.set('updatedSince', skillUpdatedSinceValue);
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
                teamListUrl.searchParams.set('isActive', 'true');
                teamListUrl.searchParams.set('updatedSince', teamUpdatedSinceValue);
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
                    var _a, _b, _c, _d, _e, _f, _g, _h;
                    this.handleDirectoryResponse(response.data, shouldFetchAllAgents);
                    if (entity.includes(DirectoryEntities.AGENT_LIST)) {
                        const agentListWrapper = (_a = response === null || response === void 0 ? void 0 : response.data) === null || _a === void 0 ? void 0 : _a.get(DirectoryEntities.AGENT_LIST);
                        if (isFTUnifyAgentStateOn && ((_b = agentListWrapper === null || agentListWrapper === void 0 ? void 0 : agentListWrapper.value) === null || _b === void 0 ? void 0 : _b.lastPollTime)) {
                            const agentList = agentListWrapper === null || agentListWrapper === void 0 ? void 0 : agentListWrapper.value;
                            updatedSinceValue = agentList === null || agentList === void 0 ? void 0 : agentList.lastPollTime;
                        }
                        else if ((_c = agentListWrapper === null || agentListWrapper === void 0 ? void 0 : agentListWrapper.value) === null || _c === void 0 ? void 0 : _c.resultSet) {
                            const agentList = (_d = agentListWrapper === null || agentListWrapper === void 0 ? void 0 : agentListWrapper.value) === null || _d === void 0 ? void 0 : _d.resultSet;
                            updatedSinceValue = agentList === null || agentList === void 0 ? void 0 : agentList.lastPollTime;
                        }
                        LocalStorageHelper.setItem(StorageKeys.DIRECTORY_POLLING_UPDATED_SINCE, updatedSinceValue);
                    }
                    if (entity.includes(DirectoryEntities.TEAM_LIST)) {
                        const teamListWrapper = (_e = response === null || response === void 0 ? void 0 : response.data) === null || _e === void 0 ? void 0 : _e.get(DirectoryEntities.TEAM_LIST);
                        if ((_f = teamListWrapper === null || teamListWrapper === void 0 ? void 0 : teamListWrapper.value) === null || _f === void 0 ? void 0 : _f.lastPollTime) {
                            const teamList = teamListWrapper === null || teamListWrapper === void 0 ? void 0 : teamListWrapper.value;
                            teamUpdatedSinceValue = teamList === null || teamList === void 0 ? void 0 : teamList.lastPollTime;
                        }
                        LocalStorageHelper.setItem(StorageKeys.TEAM_POLLING_UPDATED_SINCE, teamUpdatedSinceValue);
                    }
                    if (entity.includes(DirectoryEntities.SKILL_LIST)) {
                        const skillListWrapper = (_g = response === null || response === void 0 ? void 0 : response.data) === null || _g === void 0 ? void 0 : _g.get(DirectoryEntities.SKILL_LIST);
                        if ((_h = skillListWrapper === null || skillListWrapper === void 0 ? void 0 : skillListWrapper.value) === null || _h === void 0 ? void 0 : _h.lastPollTime) {
                            const skillList = skillListWrapper === null || skillListWrapper === void 0 ? void 0 : skillListWrapper.value;
                            skillUpdatedSinceValue = skillList === null || skillList === void 0 ? void 0 : skillList.lastPollTime;
                        }
                        LocalStorageHelper.setItem(StorageKeys.SKILL_POLLING_UPDATED_SINCE, skillUpdatedSinceValue);
                    }
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
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4;
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield dbInstance();
            let isUpdate = true; // this flag will let us know if the data is for updation or for the first time response after initial polling response
            if (response) {
                let directoryEvent = yield this.directoryAdapter.handleEvent(response);
                if (((_b = (_a = directoryEvent === null || directoryEvent === void 0 ? void 0 : directoryEvent.agentList) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.length) || ((_d = (_c = directoryEvent === null || directoryEvent === void 0 ? void 0 : directoryEvent.addressBookList) === null || _c === void 0 ? void 0 : _c.data) === null || _d === void 0 ? void 0 : _d.length) || ((_f = (_e = directoryEvent === null || directoryEvent === void 0 ? void 0 : directoryEvent.skillList) === null || _e === void 0 ? void 0 : _e.data) === null || _f === void 0 ? void 0 : _f.length)
                    || ((_h = (_g = directoryEvent === null || directoryEvent === void 0 ? void 0 : directoryEvent.teamList) === null || _g === void 0 ? void 0 : _g.data) === null || _h === void 0 ? void 0 : _h.length) || this.isFreshRequest) { // if data is present for the entity or its a fresh user request
                    this.isFreshRequest = false;
                    const { skillList, agentList, addressBookList, teamList } = Object.assign({}, directoryEvent);
                    const updatedDirectoryResponse = { skillList: { data: [] }, agentList: { data: [], favoriteAgents: [] }, addressBookList: { data: [] }, teamList: { data: [] } };
                    //Reset previous entity count
                    this.entityCounts = { addressBookList: 0, skillList: 0, agentList: 0, teamList: 0, totalAgentCount: 0, totalTeamCount: 0, totalSkillCount: 0, totalAddressBookCount: 0 };
                    if (this.isFavoritesFTEnabled) {
                        if (((_j = skillList === null || skillList === void 0 ? void 0 : skillList.data) === null || _j === void 0 ? void 0 : _j.length) > 0) { //if skillList is present then update skill list and favorite list with latest data
                            const { currentSkillList, currentFavSkillList } = yield this.updateSkillListInDB(skillList.data);
                            updatedDirectoryResponse.skillList.data = currentSkillList;
                            updatedDirectoryResponse.skillList.favoriteDigitalSkills = currentFavSkillList;
                        }
                        else { // if there is no response in skillList then directory push latest values of index db in response data
                            updatedDirectoryResponse.skillList.data = (yield (db === null || db === void 0 ? void 0 : db.get(IndexDBStoreNames.DIRECTORY, DirectoryEntities.SKILL_LIST)));
                            updatedDirectoryResponse.skillList.favoriteDigitalSkills = (yield (db === null || db === void 0 ? void 0 : db.get(IndexDBStoreNames.DIRECTORY, IndexDBKeyNames.FAVORITE_DIGITAL_SKILLS)));
                        }
                        ;
                        this.favoriteSkillList = updatedDirectoryResponse.skillList.favoriteDigitalSkills;
                    }
                    else {
                        //to update the new directory values in indexDB
                        if ((_k = skillList === null || skillList === void 0 ? void 0 : skillList.data) === null || _k === void 0 ? void 0 : _k.length) {
                            const { currentSkillList } = yield this.updateSkillListInDB(skillList.data);
                            updatedDirectoryResponse.skillList.data = currentSkillList;
                        }
                        else {
                            updatedDirectoryResponse.skillList.data = (yield (db === null || db === void 0 ? void 0 : db.get(IndexDBStoreNames.DIRECTORY, DirectoryEntities.SKILL_LIST)));
                        }
                    }
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
                    if (this.isFavoritesFTEnabled) {
                        if (((_l = addressBookList === null || addressBookList === void 0 ? void 0 : addressBookList.data) === null || _l === void 0 ? void 0 : _l.length) > 0) { // If there is a response, update lists in IDB and assign both lists
                            const { currentAddressBookList, currentFavAddressBookList } = yield this.updateAddressBookListInDB(addressBookList.data);
                            updatedDirectoryResponse.addressBookList.data = currentAddressBookList;
                            updatedDirectoryResponse.addressBookList.favoriteStandardAddressBooks = currentFavAddressBookList;
                        }
                        else { // If no response, use latest values from IDB
                            updatedDirectoryResponse.addressBookList.data = (yield (db === null || db === void 0 ? void 0 : db.get(IndexDBStoreNames.DIRECTORY, DirectoryEntities.ADDRESS_BOOK_LIST)));
                            updatedDirectoryResponse.addressBookList.favoriteStandardAddressBooks = (yield (db === null || db === void 0 ? void 0 : db.get(IndexDBStoreNames.DIRECTORY, IndexDBKeyNames.FAVORITE_STANDARD_ADDRESS_BOOK)));
                        }
                        this.favoriteAddressBookList = updatedDirectoryResponse.addressBookList.favoriteStandardAddressBooks;
                    }
                    else if ((_m = addressBookList === null || addressBookList === void 0 ? void 0 : addressBookList.data) === null || _m === void 0 ? void 0 : _m.length) {
                        const { currentAddressBookList } = yield this.updateAddressBookListInDB(addressBookList.data);
                        updatedDirectoryResponse.addressBookList.data = currentAddressBookList;
                    }
                    else {
                        updatedDirectoryResponse.addressBookList.data = (yield (db === null || db === void 0 ? void 0 : db.get(IndexDBStoreNames.DIRECTORY, DirectoryEntities.ADDRESS_BOOK_LIST)));
                    }
                    if (this.isFavoritesFTEnabled) {
                        if (((_o = teamList === null || teamList === void 0 ? void 0 : teamList.data) === null || _o === void 0 ? void 0 : _o.length) > 0) { //if teamList is present then update team list and favorite list with latest data 
                            const { currentTeamList, currentFavTeamList } = yield this.updateTeamListInDB(teamList.data);
                            updatedDirectoryResponse.teamList.data = currentTeamList;
                            updatedDirectoryResponse.teamList.favoriteTeams = currentFavTeamList;
                        }
                        else { // if there is no response in teamlist then directory push latest values of index db in response data
                            updatedDirectoryResponse.teamList.data = (yield (db === null || db === void 0 ? void 0 : db.get(IndexDBStoreNames.DIRECTORY, DirectoryEntities.TEAM_LIST)));
                            updatedDirectoryResponse.teamList.favoriteTeams = (yield (db === null || db === void 0 ? void 0 : db.get(IndexDBStoreNames.DIRECTORY, IndexDBKeyNames.FAVORITE_TEAMS)));
                        }
                        ;
                        this.favoriteTeamList = updatedDirectoryResponse.teamList.favoriteTeams;
                    }
                    else {
                        if ((_p = teamList === null || teamList === void 0 ? void 0 : teamList.data) === null || _p === void 0 ? void 0 : _p.length) {
                            const { currentTeamList } = yield this.updateTeamListInDB(teamList.data);
                            updatedDirectoryResponse.teamList.data = currentTeamList;
                        }
                        else {
                            updatedDirectoryResponse.teamList.data = (yield (db === null || db === void 0 ? void 0 : db.get(IndexDBStoreNames.DIRECTORY, DirectoryEntities.TEAM_LIST)));
                        }
                    }
                    this.entityCounts.totalAgentCount = ((_q = updatedDirectoryResponse.agentList.data) === null || _q === void 0 ? void 0 : _q.length) || 0;
                    this.entityCounts.totalTeamCount = ((_r = updatedDirectoryResponse.teamList.data) === null || _r === void 0 ? void 0 : _r.length) || 0;
                    this.entityCounts.totalSkillCount = ((_s = updatedDirectoryResponse.skillList.data) === null || _s === void 0 ? void 0 : _s.length) || 0;
                    this.entityCounts.totalAddressBookCount = (_u = (_t = updatedDirectoryResponse.addressBookList) === null || _t === void 0 ? void 0 : _t.data) === null || _u === void 0 ? void 0 : _u.reduce((sum, elem) => { var _a; return sum + ((elem === null || elem === void 0 ? void 0 : elem.addressBooksEntries) ? (_a = elem === null || elem === void 0 ? void 0 : elem.addressBooksEntries) === null || _a === void 0 ? void 0 : _a.length : 0); }, 0);
                    if (this.searchText && ((_v = this.currentEntities) === null || _v === void 0 ? void 0 : _v.length)) { //if searchText is present then the directory response for search
                        const currentSearchData = yield (db === null || db === void 0 ? void 0 : db.get(IndexDBStoreNames.DIRECTORY, IndexDBKeyNames.DIRECTORY_SEARCH_RESPONSE));
                        if (!currentSearchData) { // if no searchData is present in the indexDB that means its the first time we are searching for the searchText due to polling not been done earlier
                            directoryEvent = yield this.searchDirectoryData(this.searchText, this.currentEntities, shouldFetchAllAgents);
                            isUpdate = false;
                            yield (db === null || db === void 0 ? void 0 : db.put(IndexDBStoreNames.DIRECTORY, directoryEvent, IndexDBKeyNames.DIRECTORY_SEARCH_RESPONSE));
                        }
                        else { // else searchData is already their so we will just update the data in index DB
                            const newSearchData = { skillList: { data: [] }, agentList: { data: [], favoriteAgents: [] }, addressBookList: { data: [] }, teamList: { data: [] } };
                            this.currentEntities.forEach(entity => {
                                var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
                                if (entity === DirectoryEntities.AGENT_LIST && ((_b = (_a = directoryEvent === null || directoryEvent === void 0 ? void 0 : directoryEvent.agentList) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.length)) {
                                    const { currentSearchAgentList, currentFavAgentList } = this.updateSearchAgentList(currentSearchData.agentList.data, directoryEvent.agentList.data);
                                    newSearchData.agentList.data = currentSearchAgentList;
                                    newSearchData.agentList.favoriteAgents = currentFavAgentList;
                                    this.favroiteAgentList = newSearchData.agentList.favoriteAgents;
                                }
                                if (entity === DirectoryEntities.SKILL_LIST && ((_d = (_c = directoryEvent === null || directoryEvent === void 0 ? void 0 : directoryEvent.skillList) === null || _c === void 0 ? void 0 : _c.data) === null || _d === void 0 ? void 0 : _d.length)) {
                                    if (this.isFavoritesFTEnabled) {
                                        const { currentSearchSkillList, currentFavSkillList } = this.updateSearchSkillList((_e = currentSearchData === null || currentSearchData === void 0 ? void 0 : currentSearchData.skillList) === null || _e === void 0 ? void 0 : _e.data, (_f = directoryEvent === null || directoryEvent === void 0 ? void 0 : directoryEvent.skillList) === null || _f === void 0 ? void 0 : _f.data);
                                        newSearchData.skillList.data = currentSearchSkillList;
                                        newSearchData.skillList.favoriteDigitalSkills = currentFavSkillList;
                                        this.favoriteSkillList = newSearchData.skillList.favoriteDigitalSkills;
                                    }
                                    else {
                                        const { currentSearchSkillList } = this.updateSearchSkillList((_g = currentSearchData === null || currentSearchData === void 0 ? void 0 : currentSearchData.skillList) === null || _g === void 0 ? void 0 : _g.data, (_h = directoryEvent === null || directoryEvent === void 0 ? void 0 : directoryEvent.skillList) === null || _h === void 0 ? void 0 : _h.data);
                                        newSearchData.skillList.data = currentSearchSkillList;
                                    }
                                }
                                if (entity === DirectoryEntities.ADDRESS_BOOK_LIST && ((_k = (_j = directoryEvent === null || directoryEvent === void 0 ? void 0 : directoryEvent.addressBookList) === null || _j === void 0 ? void 0 : _j.data) === null || _k === void 0 ? void 0 : _k.length)) {
                                    newSearchData.addressBookList.data = this.updateAddressBookList(directoryEvent.addressBookList.data);
                                }
                                if (entity === DirectoryEntities.TEAM_LIST && ((_m = (_l = directoryEvent === null || directoryEvent === void 0 ? void 0 : directoryEvent.teamList) === null || _l === void 0 ? void 0 : _l.data) === null || _m === void 0 ? void 0 : _m.length)) {
                                    if (this.isFavoritesFTEnabled) {
                                        const { currentSearchTeamList, currentFavTeamList } = this.updateSearchTeamList((_o = currentSearchData === null || currentSearchData === void 0 ? void 0 : currentSearchData.teamList) === null || _o === void 0 ? void 0 : _o.data, (_p = directoryEvent === null || directoryEvent === void 0 ? void 0 : directoryEvent.teamList) === null || _p === void 0 ? void 0 : _p.data);
                                        newSearchData.teamList.data = currentSearchTeamList;
                                        newSearchData.teamList.favoriteTeams = currentFavTeamList;
                                        this.favoriteTeamList = newSearchData.teamList.favoriteTeams;
                                    }
                                    else {
                                        const { currentSearchTeamList } = this.updateSearchTeamList((_q = currentSearchData === null || currentSearchData === void 0 ? void 0 : currentSearchData.teamList) === null || _q === void 0 ? void 0 : _q.data, (_r = directoryEvent === null || directoryEvent === void 0 ? void 0 : directoryEvent.teamList) === null || _r === void 0 ? void 0 : _r.data);
                                        newSearchData.teamList.data = currentSearchTeamList;
                                    }
                                }
                            });
                            yield (db === null || db === void 0 ? void 0 : db.put(IndexDBStoreNames.DIRECTORY, currentSearchData, IndexDBKeyNames.DIRECTORY_SEARCH_RESPONSE));
                            directoryEvent = currentSearchData;
                            this.entityCounts.agentList = ((_w = directoryEvent.agentList.data) === null || _w === void 0 ? void 0 : _w.length) || 0;
                            this.entityCounts.skillList = ((_x = directoryEvent.skillList.data) === null || _x === void 0 ? void 0 : _x.length) || 0;
                            this.entityCounts.addressBookList = ((_y = directoryEvent.addressBookList.data) === null || _y === void 0 ? void 0 : _y.length) || 0;
                            this.entityCounts.teamList = ((_z = directoryEvent.teamList.data) === null || _z === void 0 ? void 0 : _z.length) || 0;
                        }
                    }
                    else { // if search text is not present that means then the response should be for all the data set
                        if ((_0 = this.currentEntities) === null || _0 === void 0 ? void 0 : _0.length) {
                            isUpdate = false;
                            this.currentEntities.forEach(e => {
                                var _a, _b, _c;
                                if (e === DirectoryEntities.AGENT_LIST) {
                                    directoryEvent.agentList.data = updatedDirectoryResponse.agentList.data;
                                    directoryEvent.agentList.favoriteAgents = updatedDirectoryResponse.agentList.favoriteAgents;
                                    this.favroiteAgentList = updatedDirectoryResponse.agentList.favoriteAgents;
                                    if (this.isFavoritesFTEnabled) {
                                        this.favoriteTeamList = updatedDirectoryResponse.teamList.favoriteTeams;
                                        this.favoriteAddressBookList = updatedDirectoryResponse.addressBookList.favoriteStandardAddressBooks;
                                        this.favoriteSkillList = updatedDirectoryResponse.skillList.favoriteDigitalSkills;
                                    }
                                }
                                if (e === DirectoryEntities.ADDRESS_BOOK_LIST)
                                    directoryEvent.addressBookList.data = (_a = updatedDirectoryResponse === null || updatedDirectoryResponse === void 0 ? void 0 : updatedDirectoryResponse.addressBookList) === null || _a === void 0 ? void 0 : _a.data;
                                if (e === DirectoryEntities.SKILL_LIST)
                                    directoryEvent.skillList.data = (_b = updatedDirectoryResponse === null || updatedDirectoryResponse === void 0 ? void 0 : updatedDirectoryResponse.skillList) === null || _b === void 0 ? void 0 : _b.data;
                                if (e === DirectoryEntities.TEAM_LIST)
                                    directoryEvent.teamList.data = (_c = updatedDirectoryResponse === null || updatedDirectoryResponse === void 0 ? void 0 : updatedDirectoryResponse.teamList) === null || _c === void 0 ? void 0 : _c.data;
                            });
                        }
                        else if ((_1 = directoryEvent.agentList.data) === null || _1 === void 0 ? void 0 : _1.length) {
                            directoryEvent.agentList.data = this.sortAgentList(directoryEvent.agentList.data);
                        }
                        const user = this.acdSession.userInfo;
                        //based on shouldFetchAllAgents flag, fetching all agents here which includes current logged-in user as well
                        if (!shouldFetchAllAgents) {
                            directoryEvent.agentList.data = (_2 = directoryEvent.agentList.data) === null || _2 === void 0 ? void 0 : _2.filter(agent => agent.agentId.toString() !== user.icAgentId);
                        }
                        if (this.offset > 0 && this.limit > 0) { // to handle pagination
                            directoryEvent = yield this.handleDirectoryPagination(directoryEvent, this.currentEntities);
                        }
                    }
                    if ((_4 = (_3 = directoryEvent.addressBookList) === null || _3 === void 0 ? void 0 : _3.data) === null || _4 === void 0 ? void 0 : _4.length) {
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
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x;
        if (!isUpdate || ((_b = (_a = directoryResponse === null || directoryResponse === void 0 ? void 0 : directoryResponse.agentList) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.length) || ((_d = (_c = directoryResponse === null || directoryResponse === void 0 ? void 0 : directoryResponse.addressBookList) === null || _c === void 0 ? void 0 : _c.data) === null || _d === void 0 ? void 0 : _d.length)
            || ((_f = (_e = directoryResponse === null || directoryResponse === void 0 ? void 0 : directoryResponse.skillList) === null || _e === void 0 ? void 0 : _e.data) === null || _f === void 0 ? void 0 : _f.length) || ((_h = (_g = directoryResponse === null || directoryResponse === void 0 ? void 0 : directoryResponse.teamList) === null || _g === void 0 ? void 0 : _g.data) === null || _h === void 0 ? void 0 : _h.length)) {
            if ((_j = directoryResponse === null || directoryResponse === void 0 ? void 0 : directoryResponse.agentList) === null || _j === void 0 ? void 0 : _j.data) {
                directoryResponse.agentList.data = directoryResponse.agentList.data.filter(agent => agent.isActive); // filter out the agents which are not active
            }
            this.favroiteAgentList = (_k = this.favroiteAgentList) === null || _k === void 0 ? void 0 : _k.filter(agent => agent.isActive); // filter out the agents which are not active
            if (this.isFavoritesFTEnabled) {
                this.favoriteTeamList = (_l = this.favoriteTeamList) === null || _l === void 0 ? void 0 : _l.filter(team => team.isActive); // filter out the teams which are not active
                this.favoriteAddressBookList = (_m = this.favoriteAddressBookList) === null || _m === void 0 ? void 0 : _m.filter(entry => entry.isActive);
                this.favoriteSkillList = (_o = this.favoriteSkillList) === null || _o === void 0 ? void 0 : _o.filter(skill => skill.isActive);
            }
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
            if (this.isFavoritesFTEnabled) {
                directoryResponse.teamList.favoriteTeams = this.favoriteTeamList || [];
                directoryResponse.addressBookList.favoriteStandardAddressBooks = this.favoriteAddressBookList || [];
                directoryResponse.skillList.favoriteDigitalSkills = this.favoriteSkillList || [];
            }
            if ((_p = this.currentEntities) === null || _p === void 0 ? void 0 : _p.length) {
                if (this.currentEntities.includes(DirectoryEntities.ADDRESS_BOOK_LIST) && !((_r = (_q = directoryResponse === null || directoryResponse === void 0 ? void 0 : directoryResponse.addressBookList) === null || _q === void 0 ? void 0 : _q.data) === null || _r === void 0 ? void 0 : _r.length))
                    directoryResponse.addressBookList.errorMsg = NO_MATCHING_RECORDS_FOUND;
                if (this.currentEntities.includes(DirectoryEntities.AGENT_LIST) && !((_t = (_s = directoryResponse === null || directoryResponse === void 0 ? void 0 : directoryResponse.agentList) === null || _s === void 0 ? void 0 : _s.data) === null || _t === void 0 ? void 0 : _t.length))
                    directoryResponse.agentList.errorMsg = NO_MATCHING_RECORDS_FOUND;
                if (this.currentEntities.includes(DirectoryEntities.SKILL_LIST) && !((_v = (_u = directoryResponse === null || directoryResponse === void 0 ? void 0 : directoryResponse.skillList) === null || _u === void 0 ? void 0 : _u.data) === null || _v === void 0 ? void 0 : _v.length))
                    directoryResponse.skillList.errorMsg = NO_MATCHING_RECORDS_FOUND;
                if (this.currentEntities.includes(DirectoryEntities.TEAM_LIST) && !((_x = (_w = directoryResponse === null || directoryResponse === void 0 ? void 0 : directoryResponse.teamList) === null || _w === void 0 ? void 0 : _w.data) === null || _x === void 0 ? void 0 : _x.length))
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
        const currentFavSkillList = [];
        newSkillList.forEach(newSkill => {
            const matchSkillIndex = currentSearchSkillList === null || currentSearchSkillList === void 0 ? void 0 : currentSearchSkillList.findIndex(currentAgent => currentAgent.skillId == newSkill.skillId);
            if (this.isFavoritesFTEnabled) {
                if (matchSkillIndex >= 0) {
                    /*
                    Before polled data overrides the Index DB data, we check if an instance of agent in Index DB has
                    the favorite field marked to true. If it is, we mark the respective field to true in the polled data too(at the matched index),
                   before we finally override and perform the PUT operation.
                   */
                    if (currentSearchSkillList[matchSkillIndex].isFavorite) {
                        newSkill.isFavorite = currentSearchSkillList[matchSkillIndex].isFavorite;
                        currentFavSkillList.push(currentSearchSkillList[matchSkillIndex]);
                    }
                }
            }
            else if (matchSkillIndex >= 0)
                currentSearchSkillList[matchSkillIndex] = newSkill;
        });
        if (this.isFavoritesFTEnabled) {
            return { currentSearchSkillList, currentFavSkillList };
        }
        else {
            return { currentSearchSkillList, currentFavSkillList: [] };
        }
    }
    /**
    * Used to update the search team list for search response matching new Response from the polling update with the existing search response saved in the index db
    * @param currentSearchTeamList - saved team list from the index db
    * @param newSkillList - new response for the updated team data
    */
    updateSearchTeamList(currentSearchTeamList, newTeamList) {
        const currentFavTeamList = [];
        newTeamList.forEach(newTeam => {
            const matchTeamIndex = currentSearchTeamList === null || currentSearchTeamList === void 0 ? void 0 : currentSearchTeamList.findIndex(currentTeam => currentTeam.teamId == newTeam.teamId);
            if (this.isFavoritesFTEnabled) {
                if (matchTeamIndex >= 0) {
                    /*
                    Before polled data overrides the Index DB data, we check if an instance of agent in Index DB has
                    the favorite field marked to true. If it is, we mark the respective field to true in the polled data too(at the matched index),
                   before we finally override and perform the PUT operation.
                   */
                    if (currentSearchTeamList[matchTeamIndex].isFavorite) {
                        newTeam.isFavorite = currentSearchTeamList[matchTeamIndex].isFavorite;
                        currentFavTeamList.push(currentSearchTeamList[matchTeamIndex]);
                    }
                    currentSearchTeamList[matchTeamIndex] = newTeam;
                }
            }
            else {
                if (matchTeamIndex >= 0)
                    currentSearchTeamList[matchTeamIndex] = newTeam;
            }
        });
        if (this.isFavoritesFTEnabled) {
            return { currentSearchTeamList, currentFavTeamList };
        }
        else {
            return { currentSearchTeamList, currentFavTeamList: [] };
        }
    }
    /**
     * Used to handle the pagination based on the offset and limit in case of normal directory request flow without search request
     * @param directoryResponse - directory response object
     */
    handleDirectoryPagination(directoryResponse, currentEntities) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2;
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
            if (((_m = (_l = directoryResponse.skillList) === null || _l === void 0 ? void 0 : _l.data) === null || _m === void 0 ? void 0 : _m.length) && (currentSkillList === null || currentSkillList === void 0 ? void 0 : currentSkillList.length) && (skillList === null || skillList === void 0 ? void 0 : skillList.length)) { // in case of skill list updation we will check if the updated data is present in the search option if so then only we will publish that data
                const newSkillList = [];
                (_p = (_o = directoryResponse.skillList) === null || _o === void 0 ? void 0 : _o.data) === null || _p === void 0 ? void 0 : _p.forEach(skill => {
                    const matchedSkillIndex = skillList.findIndex(e => e.skillId == skill.skillId);
                    if (matchedSkillIndex >= 0)
                        newSkillList.push(skill);
                });
                skillList = newSkillList;
            }
            if (((_r = (_q = directoryResponse.teamList) === null || _q === void 0 ? void 0 : _q.data) === null || _r === void 0 ? void 0 : _r.length) && (currentTeamList === null || currentTeamList === void 0 ? void 0 : currentTeamList.length) && (teamList === null || teamList === void 0 ? void 0 : teamList.length)) { // in case of team list updation we will check if the updated data is present in the search option if so then only we will publish that data
                if ((currentEntities === null || currentEntities === void 0 ? void 0 : currentEntities.length) === 0)
                    directoryResponse.teamList.data = this.sortResponse((_s = directoryResponse === null || directoryResponse === void 0 ? void 0 : directoryResponse.teamList) === null || _s === void 0 ? void 0 : _s.data, DirectoryEntities.TEAM_LIST);
                const newTeamList = [];
                (_u = (_t = directoryResponse.teamList) === null || _t === void 0 ? void 0 : _t.data) === null || _u === void 0 ? void 0 : _u.forEach(agent => {
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
            this.entityCounts.agentList = ((_w = (_v = directoryResponse.agentList) === null || _v === void 0 ? void 0 : _v.data) === null || _w === void 0 ? void 0 : _w.length) || 0;
            this.entityCounts.skillList = ((_y = (_x = directoryResponse.skillList) === null || _x === void 0 ? void 0 : _x.data) === null || _y === void 0 ? void 0 : _y.length) || 0;
            this.entityCounts.addressBookList = ((_0 = (_z = directoryResponse.addressBookList) === null || _z === void 0 ? void 0 : _z.data) === null || _0 === void 0 ? void 0 : _0.length) || 0;
            this.entityCounts.teamList = ((_2 = (_1 = directoryResponse.teamList) === null || _1 === void 0 ? void 0 : _1.data) === null || _2 === void 0 ? void 0 : _2.length) || 0;
            return directoryResponse;
        });
    }
    /**
    * Used to update the skill list in index DB as per the new list
    * @param SkillList - new skill list response
    */
    updateSkillListInDB(SkillList) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield dbInstance();
            let currentSkillList = (yield (db === null || db === void 0 ? void 0 : db.get(IndexDBStoreNames.DIRECTORY, DirectoryEntities.SKILL_LIST))) || [];
            let currentFavSkillList = (yield (db === null || db === void 0 ? void 0 : db.get(IndexDBStoreNames.DIRECTORY, IndexDBKeyNames.FAVORITE_DIGITAL_SKILLS))) || [];
            const clientData = LocalStorageHelper.getItem(StorageKeys.CLIENT_DATA, true) || {};
            let currFavListInLS = (clientData === null || clientData === void 0 ? void 0 : clientData.CXAFavDigitalSkills) || []; // has current favorites digital skill list in local storage
            let clientDataApiFailed = false; // has current favorites acd skill list in local storage
            if (currentSkillList === null || currentSkillList === void 0 ? void 0 : currentSkillList.length) {
                /* below flow will be executed in case when skill list is already present in indexDB which happens in case user is already logged in
                or user logged in again without deleting browser history */
                SkillList.forEach((skill, index) => {
                    var _a, _b, _c;
                    const matchedSkillIndex = currentSkillList.findIndex((currentSkill) => (currentSkill === null || currentSkill === void 0 ? void 0 : currentSkill.skillId) === (skill === null || skill === void 0 ? void 0 : skill.skillId));
                    if (matchedSkillIndex >= 0) {
                        if (this.isFavoritesFTEnabled) {
                            // check in currFavListInLS to avoid marking skill favorite in case it is deleted from userhub
                            if (currentSkillList[matchedSkillIndex].isFavorite
                                && ((_a = String(currFavListInLS)) === null || _a === void 0 ? void 0 : _a.includes((_b = currentSkillList[matchedSkillIndex]) === null || _b === void 0 ? void 0 : _b.skillId))) {
                                SkillList[index].isFavorite =
                                    (_c = currentSkillList[matchedSkillIndex]) === null || _c === void 0 ? void 0 : _c.isFavorite;
                                const favIndex = currentFavSkillList.findIndex((fav) => fav.skillId === SkillList[index].skillId);
                                if (favIndex >= 0)
                                    currentFavSkillList[favIndex] = SkillList[index];
                            }
                            else {
                                SkillList[index].isFavorite = false;
                            }
                        }
                        else {
                            SkillList[index].isFavorite = false;
                        }
                        currentSkillList[matchedSkillIndex] = SkillList[index];
                    }
                    else {
                        currentSkillList.push(skill);
                    }
                });
                if (((_a = clientData === null || clientData === void 0 ? void 0 : clientData.CXAFavDigitalSkills) === null || _a === void 0 ? void 0 : _a.length) && this.isFavoritesFTEnabled) {
                    ({ currFavListInLS, clientDataApiFailed } = yield handleDirectoryItemDeletion({
                        listFromDB: currentSkillList,
                        idName: 'skillId',
                        favClientList: clientData.CXAFavDigitalSkills,
                        storageKey: 'cxaFavDigitalSkills',
                        clientDataKey: 'CXAFavDigitalSkills',
                    }));
                }
            }
            else {
                /* below flow will be executed when skill list is not present in indexDB which happens in case user logs in
                after deleting browser history */
                currentSkillList = SkillList;
                if (this.isFavoritesFTEnabled) {
                    if ((_b = clientData === null || clientData === void 0 ? void 0 : clientData.CXAFavDigitalSkills) === null || _b === void 0 ? void 0 : _b.length) {
                        ({ currFavListInLS, clientDataApiFailed } = yield handleDirectoryItemDeletion({
                            listFromDB: SkillList,
                            idName: 'skillId',
                            favClientList: clientData.CXAFavDigitalSkills,
                            storageKey: 'cxaFavDigitalSkills',
                            clientDataKey: 'CXAFavDigitalSkills',
                        }));
                    }
                    currentSkillList.forEach((skillState, index) => {
                        if (currFavListInLS === null || currFavListInLS === void 0 ? void 0 : currFavListInLS.includes(Number(skillState === null || skillState === void 0 ? void 0 : skillState.skillId))) {
                            currentSkillList[index].isFavorite = true;
                            currentFavSkillList.push(skillState);
                        }
                        else {
                            currentSkillList[index].isFavorite = false;
                        }
                    });
                }
            }
            currentSkillList = this.sortResponse(currentSkillList, DirectoryEntities.SKILL_LIST);
            if (this.isFavoritesFTEnabled) {
                currentFavSkillList = this.sortResponse(currentFavSkillList, DirectoryEntities.SKILL_LIST);
            }
            db === null || db === void 0 ? void 0 : db.put(IndexDBStoreNames.DIRECTORY, currentSkillList, DirectoryEntities.SKILL_LIST);
            if (this.isFavoritesFTEnabled && !clientDataApiFailed) {
                const favDigitalSkillIdSet = new Set(currFavListInLS);
                currentFavSkillList = currentFavSkillList.filter(skill => favDigitalSkillIdSet.has(Number(skill.skillId)));
                db === null || db === void 0 ? void 0 : db.put(IndexDBStoreNames.DIRECTORY, currentFavSkillList, IndexDBKeyNames.FAVORITE_DIGITAL_SKILLS);
            }
            if (this.mediaType)
                currentSkillList = this.filterSkillByMediaType(currentSkillList); // in case of result requested based on media type we will filter out the skills and publish the filtered list
            if (!this.searchText)
                this.entityCounts.skillList = (currentSkillList === null || currentSkillList === void 0 ? void 0 : currentSkillList.length) || 0; // to keep track of skill list records count
            if (this.isFavoritesFTEnabled) {
                return { currentSkillList, currentFavSkillList };
            }
            else {
                return { currentSkillList, currentFavSkillList: [] };
            }
        });
    }
    /**
     * Used to toggle the favorite marker for agent and store it in Index DB
     * @param agent - Information of the agent of whom favorite field needs to be toggled
     * @example
     * directoryProvider.toggleFavorite(agent);
     */
    toggleFavoriteForAgent(agentInfo) {
        var _a, _b, _c, _d, _e, _f;
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield dbInstance();
            let agentListSearchResponse;
            const favList = [];
            const agentListFromDB = (yield (db === null || db === void 0 ? void 0 : db.get(IndexDBStoreNames.DIRECTORY, DirectoryEntities.AGENT_LIST))) || [];
            const directorySearchResponse = (yield (db === null || db === void 0 ? void 0 : db.get(IndexDBStoreNames.DIRECTORY, IndexDBKeyNames.DIRECTORY_SEARCH_RESPONSE)));
            const favTeamListFromDB = (yield (db === null || db === void 0 ? void 0 : db.get(IndexDBStoreNames.DIRECTORY, IndexDBKeyNames.FAVORITE_TEAMS)));
            const favAddressBookListFromDB = (yield (db === null || db === void 0 ? void 0 : db.get(IndexDBStoreNames.DIRECTORY, IndexDBKeyNames.FAVORITE_STANDARD_ADDRESS_BOOK)));
            if (Array.isArray(agentInfo)) {
                const agentIdsToToggle = agentInfo.map((agent) => agent.agentId);
                if ((_b = (_a = directorySearchResponse === null || directorySearchResponse === void 0 ? void 0 : directorySearchResponse.agentList) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.length) {
                    directorySearchResponse.agentList.data = directorySearchResponse.agentList.data.map((agent) => {
                        if (agentIdsToToggle.includes(agent.agentId)) {
                            return Object.assign(Object.assign({}, agent), { isFavorite: !agent.isFavorite });
                        }
                        return agent;
                    });
                }
                if (agentListFromDB === null || agentListFromDB === void 0 ? void 0 : agentListFromDB.length) {
                    favList.length = 0;
                    agentListFromDB.forEach((agent) => {
                        if (agentIdsToToggle.includes(agent.agentId)) {
                            agent.isFavorite = !agent.isFavorite;
                        }
                        if (agent.isFavorite) {
                            favList.push(agent);
                        }
                    });
                }
            }
            else {
                if (directorySearchResponse && (directorySearchResponse === null || directorySearchResponse === void 0 ? void 0 : directorySearchResponse.agentList)) {
                    agentListSearchResponse = directorySearchResponse.agentList
                        .data;
                    if (agentListSearchResponse === null || agentListSearchResponse === void 0 ? void 0 : agentListSearchResponse.length) {
                        agentListSearchResponse.forEach((agent) => {
                            if (agent.agentId === agentInfo.agentId) {
                                agent.isFavorite = !agent.isFavorite;
                            }
                        });
                    }
                    directorySearchResponse.agentList.data = agentListSearchResponse;
                }
                if (agentListFromDB === null || agentListFromDB === void 0 ? void 0 : agentListFromDB.length) {
                    agentListFromDB.forEach((agent) => {
                        if (agent.agentId === agentInfo.agentId) {
                            agent.isFavorite = !agent.isFavorite;
                        }
                        if (agent.isFavorite) {
                            favList.push(agent);
                        }
                    });
                }
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
                directoryResponse.skillList.data = directorySearchResponse.skillList ? (_c = directorySearchResponse === null || directorySearchResponse === void 0 ? void 0 : directorySearchResponse.skillList) === null || _c === void 0 ? void 0 : _c.data : [];
                directoryResponse.teamList.data = directorySearchResponse.teamList ? (_d = directorySearchResponse === null || directorySearchResponse === void 0 ? void 0 : directorySearchResponse.teamList) === null || _d === void 0 ? void 0 : _d.data : [];
                directoryResponse.addressBookList.data = directorySearchResponse.addressBookList ? (_e = directorySearchResponse === null || directorySearchResponse === void 0 ? void 0 : directorySearchResponse.addressBookList) === null || _e === void 0 ? void 0 : _e.data : [];
                directoryResponse.agentList.data = directorySearchResponse.agentList ? (_f = directorySearchResponse === null || directorySearchResponse === void 0 ? void 0 : directorySearchResponse.agentList) === null || _f === void 0 ? void 0 : _f.data : [];
                directoryResponse.teamList.favoriteTeams = favTeamListFromDB || [];
                directoryResponse.addressBookList.favoriteStandardAddressBooks = favAddressBookListFromDB || [];
                directoryResponse.agentList.favoriteAgents = favList;
            }
            //publish directory search response with updated fav toggle information
            if (directoryResponse.agentList.data.length)
                this.directoryBase.directoryEvent.next(directoryResponse);
        });
    }
    /**
     * Used to retrieve agent list from index DB and filter out favorites
     * @param agentName - agent name for filtering the list
     * @example -
     * ```
     * directoryProvider.getFavoritesByAgent(agentName);
     * ```
     */
    getFavoritesByAgent(agentName) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield dbInstance();
            let favAgentList = [];
            const agentListFromDB = (yield (db === null || db === void 0 ? void 0 : db.get(IndexDBStoreNames.DIRECTORY, DirectoryEntities.AGENT_LIST))) || [];
            if (agentListFromDB === null || agentListFromDB === void 0 ? void 0 : agentListFromDB.length) {
                favAgentList = agentListFromDB === null || agentListFromDB === void 0 ? void 0 : agentListFromDB.filter((agent) => agent.isFavorite === true && agent.isActive);
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
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield dbInstance();
            let currentAgentList = (yield (db === null || db === void 0 ? void 0 : db.get(IndexDBStoreNames.DIRECTORY, DirectoryEntities.AGENT_LIST))) || [];
            let currentFavAgentList = (yield (db === null || db === void 0 ? void 0 : db.get(IndexDBStoreNames.DIRECTORY, IndexDBKeyNames.FAVORITE_AGENTS))) || [];
            const clientData = LocalStorageHelper.getItem(StorageKeys.CLIENT_DATA, true) || {};
            let currFavListInLS = clientData === null || clientData === void 0 ? void 0 : clientData.CXAFavAgents; // has current favorites team list in local storage
            let clientDataApiFailed = false; // indicates if client data api call failed
            if (currentAgentList === null || currentAgentList === void 0 ? void 0 : currentAgentList.length) {
                /* below flow will be executed in case when agent list is already present in indexDB which happens in case user is already logged in
                or user logged in again without deleting browser history */
                agentList.forEach((agentState, index) => {
                    var _a;
                    const matchedAgentStateIndex = currentAgentList.findIndex((currentAgentState) => currentAgentState.agentId == agentState.agentId);
                    if (matchedAgentStateIndex >= 0) {
                        /*
                      Before polled data overrides the Index DB data, we check if an instance of agent in Index DB has
                      the favorite field marked to true. If it is, we mark the respective field to true in the polled data too(at the matched index),
                      before we finally override and perform the PUT operation.
                      */
                        if (this.isFavoritesFTEnabled ? currentAgentList[matchedAgentStateIndex].isFavorite
                            && (currFavListInLS === null || currFavListInLS === void 0 ? void 0 : currFavListInLS.includes((_a = currentAgentList[matchedAgentStateIndex]) === null || _a === void 0 ? void 0 : _a.agentId))
                            : currentAgentList[matchedAgentStateIndex].isFavorite) {
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
                if (((_a = clientData === null || clientData === void 0 ? void 0 : clientData.CXAFavAgents) === null || _a === void 0 ? void 0 : _a.length) && this.isFavoritesFTEnabled) {
                    ({ currFavListInLS, clientDataApiFailed } = yield handleDirectoryItemDeletion({
                        listFromDB: currentAgentList,
                        idName: 'agentId',
                        favClientList: clientData.CXAFavAgents,
                        storageKey: 'cxaFavAgents',
                        clientDataKey: 'CXAFavAgents',
                    }));
                }
            }
            else {
                /* below flow will be executed when agent list is not present in indexDB which happens in case user logs in
                after deleting browser history */
                currentAgentList = agentList;
                if (this.isFavoritesFTEnabled) {
                    if ((_b = clientData === null || clientData === void 0 ? void 0 : clientData.CXAFavAgents) === null || _b === void 0 ? void 0 : _b.length) {
                        ({ currFavListInLS, clientDataApiFailed } = yield handleDirectoryItemDeletion({
                            listFromDB: agentList,
                            idName: 'agentId',
                            favClientList: clientData.CXAFavAgents,
                            storageKey: 'cxaFavAgents',
                            clientDataKey: 'CXAFavAgents',
                        }));
                    }
                    // updating IDB from client data api response stored in local storage
                    currentAgentList.forEach((agentState, index) => {
                        if (currFavListInLS === null || currFavListInLS === void 0 ? void 0 : currFavListInLS.includes(agentState === null || agentState === void 0 ? void 0 : agentState.agentId)) {
                            currentAgentList[index].isFavorite = true;
                            currentFavAgentList.push(agentState);
                        }
                    });
                }
            }
            if (this.isFavoritesFTEnabled && !clientDataApiFailed) {
                const favAgentIdSet = new Set(currFavListInLS);
                // in case fav entry is deleted from userhub, we will remove it from currentFavAgentList
                currentFavAgentList = currentFavAgentList.filter(agent => favAgentIdSet.has(agent.agentId));
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
     * Used to retrieve team list from index DB and filter out favorites
     * @param teamName - team name for filtering the list
     * @example -
     * ```
     * directoryProvider.getFavoritesByTeam(teamName);
     * ```
     */
    getFavoritesByTeam(teamName) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield dbInstance();
            let favTeamList = [];
            const teamListFromDB = (yield (db === null || db === void 0 ? void 0 : db.get(IndexDBStoreNames.DIRECTORY, DirectoryEntities.TEAM_LIST))) || [];
            if (teamListFromDB === null || teamListFromDB === void 0 ? void 0 : teamListFromDB.length) {
                favTeamList = teamListFromDB === null || teamListFromDB === void 0 ? void 0 : teamListFromDB.filter((team) => team.isFavorite === true && team.isActive);
                if (teamName.length > 0) {
                    favTeamList = this.getFilteredTeamList(teamName.toUpperCase(), favTeamList);
                }
            }
            this.favoriteTeamList = favTeamList;
            db === null || db === void 0 ? void 0 : db.put(IndexDBStoreNames.DIRECTORY, favTeamList, IndexDBKeyNames.FAVORITE_TEAMS);
            return favTeamList;
        });
    }
    /**
     * Used to retrieve agent list from index DB and filter out favorites
     * @param searchText - searchText for filtering the list
     * @example
     * directoryProvider.getFavorites(searchText);
     */
    getFavoritesByDigitalSkill(skillName) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield dbInstance();
            let favSkillList = [];
            const skillListFromDB = (yield (db === null || db === void 0 ? void 0 : db.get(IndexDBStoreNames.DIRECTORY, DirectoryEntities.SKILL_LIST))) || [];
            if (skillListFromDB === null || skillListFromDB === void 0 ? void 0 : skillListFromDB.length) {
                favSkillList = skillListFromDB.filter((skill) => skill.isFavorite === true && skill.isActive);
                if (skillName.length > 0) {
                    favSkillList = this.getFilteredSkillList(skillName.toUpperCase(), favSkillList);
                }
            }
            this.favoriteSkillList = favSkillList;
            db === null || db === void 0 ? void 0 : db.put(IndexDBStoreNames.DIRECTORY, favSkillList, IndexDBKeyNames.FAVORITE_DIGITAL_SKILLS);
            return favSkillList;
        });
    }
    /**
   * Used to toggle the favorite marker for team and store it in Index DB
   * @param teamInfo - Information of the team of whom favorite field needs to be toggled
   * @example -
   * ```
   * directoryProvider.toggleFavoriteForTeam(team);
   * ```
   */
    toggleFavoriteForTeam(teamInfo) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield dbInstance();
            const teamsFavList = [];
            const teamListFromDB = (yield (db === null || db === void 0 ? void 0 : db.get(IndexDBStoreNames.DIRECTORY, DirectoryEntities.TEAM_LIST))) || [];
            const directorySearchResponse = (yield (db === null || db === void 0 ? void 0 : db.get(IndexDBStoreNames.DIRECTORY, IndexDBKeyNames.DIRECTORY_SEARCH_RESPONSE)));
            const favAgentListFromDB = (yield (db === null || db === void 0 ? void 0 : db.get(IndexDBStoreNames.DIRECTORY, IndexDBKeyNames.FAVORITE_AGENTS)));
            const teamIdsToToggle = teamInfo.map((team) => team.teamId);
            if ((_b = (_a = directorySearchResponse === null || directorySearchResponse === void 0 ? void 0 : directorySearchResponse.teamList) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.length) {
                directorySearchResponse.teamList.data = (_c = directorySearchResponse === null || directorySearchResponse === void 0 ? void 0 : directorySearchResponse.teamList) === null || _c === void 0 ? void 0 : _c.data.map((team) => {
                    if (teamIdsToToggle.includes(team.teamId)) {
                        return Object.assign(Object.assign({}, team), { isFavorite: !team.isFavorite });
                    }
                    return team;
                });
            }
            if (teamListFromDB === null || teamListFromDB === void 0 ? void 0 : teamListFromDB.length) {
                teamsFavList.length = 0;
                teamListFromDB.forEach((team) => {
                    if (teamIdsToToggle.includes(team.teamId)) {
                        team.isFavorite = !team.isFavorite;
                    }
                    if (team.isFavorite) {
                        teamsFavList.push(team);
                    }
                });
            }
            db === null || db === void 0 ? void 0 : db.put(IndexDBStoreNames.DIRECTORY, teamListFromDB, DirectoryEntities.TEAM_LIST);
            db === null || db === void 0 ? void 0 : db.put(IndexDBStoreNames.DIRECTORY, teamsFavList, IndexDBKeyNames.FAVORITE_TEAMS);
            db === null || db === void 0 ? void 0 : db.put(IndexDBStoreNames.DIRECTORY, directorySearchResponse, IndexDBKeyNames.DIRECTORY_SEARCH_RESPONSE);
            const directoryResponse = {
                skillList: { data: [] },
                agentList: { data: [], favoriteAgents: [] },
                addressBookList: { data: [] },
                teamList: { data: [], favoriteTeams: [] },
            };
            if (directorySearchResponse) {
                directoryResponse.skillList.data = directorySearchResponse.skillList ? (_d = directorySearchResponse === null || directorySearchResponse === void 0 ? void 0 : directorySearchResponse.skillList) === null || _d === void 0 ? void 0 : _d.data : [];
                directoryResponse.teamList.data = directorySearchResponse.teamList ? (_e = directorySearchResponse === null || directorySearchResponse === void 0 ? void 0 : directorySearchResponse.teamList) === null || _e === void 0 ? void 0 : _e.data : [];
                directoryResponse.addressBookList.data = directorySearchResponse.addressBookList ? (_f = directorySearchResponse === null || directorySearchResponse === void 0 ? void 0 : directorySearchResponse.addressBookList) === null || _f === void 0 ? void 0 : _f.data : [];
                directoryResponse.agentList.data = directorySearchResponse.agentList ? (_g = directorySearchResponse === null || directorySearchResponse === void 0 ? void 0 : directorySearchResponse.agentList) === null || _g === void 0 ? void 0 : _g.data : [];
                directoryResponse.agentList.favoriteAgents = favAgentListFromDB || [];
                directoryResponse.teamList.favoriteTeams = teamsFavList || [];
            }
            //publish directory search response with updated fav toggle information
            if ((_j = (_h = directoryResponse === null || directoryResponse === void 0 ? void 0 : directoryResponse.teamList) === null || _h === void 0 ? void 0 : _h.data) === null || _j === void 0 ? void 0 : _j.length)
                this.directoryBase.directoryEvent.next(directoryResponse);
        });
    }
    /**
   * Used to toggle the favorite marker for skill and store it in Index DB
   * @param skill - Information of the skill of whom favorite field needs to be toggled
   * @example
   * directoryProvider.toggleFavoriteForDigitalSkill(skill);
   */
    toggleFavoriteForDigitalSkill(skillInfo) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield dbInstance();
            const favDigitalSkillList = [];
            const digitalSkillListFromDB = (yield (db === null || db === void 0 ? void 0 : db.get(IndexDBStoreNames.DIRECTORY, DirectoryEntities.SKILL_LIST))) || [];
            const directorySearchResponse = (yield (db === null || db === void 0 ? void 0 : db.get(IndexDBStoreNames.DIRECTORY, IndexDBKeyNames.DIRECTORY_SEARCH_RESPONSE)));
            const favAgentListFromDB = (yield (db === null || db === void 0 ? void 0 : db.get(IndexDBStoreNames.DIRECTORY, IndexDBKeyNames.FAVORITE_AGENTS)));
            const favTeamListFromDB = (yield (db === null || db === void 0 ? void 0 : db.get(IndexDBStoreNames.DIRECTORY, IndexDBKeyNames.FAVORITE_TEAMS))) || [];
            const skillIdsToToggle = skillInfo.map((skill) => skill.skillId);
            if ((_b = (_a = directorySearchResponse === null || directorySearchResponse === void 0 ? void 0 : directorySearchResponse.skillList) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.length) {
                directorySearchResponse.skillList.data = directorySearchResponse.skillList.data.map((skill) => {
                    if (skillIdsToToggle.includes(skill.skillId)) {
                        return Object.assign(Object.assign({}, skill), { isFavorite: !skill.isFavorite });
                    }
                    return skill;
                });
            }
            if (digitalSkillListFromDB === null || digitalSkillListFromDB === void 0 ? void 0 : digitalSkillListFromDB.length) {
                favDigitalSkillList.length = 0;
                digitalSkillListFromDB.forEach((skill) => {
                    if (skillIdsToToggle.includes(skill.skillId)) {
                        skill.isFavorite = !skill.isFavorite;
                    }
                    if (skill.isFavorite) {
                        favDigitalSkillList.push(skill);
                    }
                });
            }
            db === null || db === void 0 ? void 0 : db.put(IndexDBStoreNames.DIRECTORY, digitalSkillListFromDB, DirectoryEntities.SKILL_LIST);
            db === null || db === void 0 ? void 0 : db.put(IndexDBStoreNames.DIRECTORY, favDigitalSkillList, IndexDBKeyNames.FAVORITE_DIGITAL_SKILLS);
            db === null || db === void 0 ? void 0 : db.put(IndexDBStoreNames.DIRECTORY, directorySearchResponse, IndexDBKeyNames.DIRECTORY_SEARCH_RESPONSE);
            const directoryResponse = {
                skillList: { data: [], favoriteDigitalSkills: [] },
                agentList: { data: [], favoriteAgents: [] },
                addressBookList: { data: [] },
                teamList: { data: [] },
            };
            if (directorySearchResponse) {
                directoryResponse.skillList.data = directorySearchResponse.skillList ? directorySearchResponse.skillList.data : [];
                directoryResponse.addressBookList.data = directorySearchResponse.addressBookList ? directorySearchResponse.addressBookList.data : [];
                directoryResponse.agentList.data = directorySearchResponse.agentList ? directorySearchResponse.agentList.data : [];
                directoryResponse.teamList.data = directorySearchResponse.teamList ? directorySearchResponse.teamList.data : [];
                directoryResponse.agentList.favoriteAgents = favAgentListFromDB || [];
                directoryResponse.teamList.favoriteTeams = favTeamListFromDB || [];
                directoryResponse.skillList.favoriteDigitalSkills = favDigitalSkillList || [];
            }
        });
    }
    /**
     * Used to update the team list in index DB as per the new list
     * @param teamList - new team list response
     */
    updateTeamListInDB(teamList) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield dbInstance();
            let currentTeamList = (yield (db === null || db === void 0 ? void 0 : db.get(IndexDBStoreNames.DIRECTORY, DirectoryEntities.TEAM_LIST))) || [];
            let currentFavTeamList = (yield (db === null || db === void 0 ? void 0 : db.get(IndexDBStoreNames.DIRECTORY, IndexDBKeyNames.FAVORITE_TEAMS))) || [];
            const clientData = LocalStorageHelper.getItem(StorageKeys.CLIENT_DATA, true) || {};
            let currFavListInLS = clientData === null || clientData === void 0 ? void 0 : clientData.CXAFavTeams; // has current favorites team list in local storage
            let clientDataApiFailed = false; // indicates if client data api call failed
            if (currentTeamList === null || currentTeamList === void 0 ? void 0 : currentTeamList.length) {
                /* below flow will be executed in case when team list is already present in indexDB which happens in case user is already logged in
                or user logged in again without deleting browser history */
                teamList.forEach((team, index) => {
                    var _a, _b, _c;
                    const matchedTeamIndex = currentTeamList.findIndex((currentTeam) => (currentTeam === null || currentTeam === void 0 ? void 0 : currentTeam.teamId) === (team === null || team === void 0 ? void 0 : team.teamId));
                    if (matchedTeamIndex >= 0) {
                        if (this.isFavoritesFTEnabled) {
                            // check in currFavListInLS to avoid marking team favorite in case it is deleted from userhub
                            if (((_a = currentTeamList[matchedTeamIndex]) === null || _a === void 0 ? void 0 : _a.isFavorite)
                                && (currFavListInLS === null || currFavListInLS === void 0 ? void 0 : currFavListInLS.includes((_b = currentTeamList[matchedTeamIndex]) === null || _b === void 0 ? void 0 : _b.teamId))) {
                                teamList[index].isFavorite =
                                    (_c = currentTeamList[matchedTeamIndex]) === null || _c === void 0 ? void 0 : _c.isFavorite;
                                const favIndex = currentFavTeamList.findIndex((fav) => fav.teamId === teamList[index].teamId);
                                if (favIndex >= 0)
                                    currentFavTeamList[favIndex] = teamList[index];
                            }
                            else {
                                teamList[index].isFavorite = false;
                            }
                        }
                        else {
                            teamList[index].isFavorite = false;
                        }
                        currentTeamList[matchedTeamIndex] = teamList[index];
                    }
                    else {
                        currentTeamList.push(team);
                    }
                });
                if (((_a = clientData === null || clientData === void 0 ? void 0 : clientData.CXAFavTeams) === null || _a === void 0 ? void 0 : _a.length) && this.isFavoritesFTEnabled) {
                    ({ currFavListInLS, clientDataApiFailed } = yield handleDirectoryItemDeletion({
                        listFromDB: currentTeamList,
                        idName: 'teamId',
                        favClientList: clientData.CXAFavTeams,
                        storageKey: 'cxaFavTeams',
                        clientDataKey: 'CXAFavTeams',
                    }));
                }
            }
            else {
                /* below flow will be executed when team list is not present in indexDB which happens in case user logs in
                after deleting browser history */
                currentTeamList = teamList;
                if (this.isFavoritesFTEnabled) {
                    if ((_b = clientData === null || clientData === void 0 ? void 0 : clientData.CXAFavTeams) === null || _b === void 0 ? void 0 : _b.length) {
                        ({ currFavListInLS, clientDataApiFailed } = yield handleDirectoryItemDeletion({
                            listFromDB: teamList,
                            idName: 'teamId',
                            favClientList: clientData.CXAFavTeams,
                            storageKey: 'cxaFavTeams',
                            clientDataKey: 'CXAFavTeams',
                        }));
                    }
                    currentTeamList.forEach((teamState, index) => {
                        if (currFavListInLS === null || currFavListInLS === void 0 ? void 0 : currFavListInLS.includes(teamState === null || teamState === void 0 ? void 0 : teamState.teamId)) {
                            currentTeamList[index].isFavorite = true;
                            currentFavTeamList.push(teamState);
                        }
                        else {
                            currentTeamList[index].isFavorite = false;
                        }
                    });
                }
            }
            currentTeamList = this.sortResponse(currentTeamList, DirectoryEntities.TEAM_LIST);
            if (this.isFavoritesFTEnabled) {
                currentFavTeamList = this.sortResponse(currentFavTeamList, DirectoryEntities.TEAM_LIST);
            }
            currentTeamList = currentTeamList.filter(team => team.isActive);
            db === null || db === void 0 ? void 0 : db.put(IndexDBStoreNames.DIRECTORY, currentTeamList, DirectoryEntities.TEAM_LIST);
            if (this.isFavoritesFTEnabled && !clientDataApiFailed) {
                const favTeamIdSet = new Set(currFavListInLS);
                // in case fav entry is deleted from userhub, we will remove it from currentFavTeamList
                currentFavTeamList = currentFavTeamList.filter(team => favTeamIdSet.has(team.teamId));
                db === null || db === void 0 ? void 0 : db.put(IndexDBStoreNames.DIRECTORY, currentFavTeamList, IndexDBKeyNames.FAVORITE_TEAMS);
            }
            if (!this.searchText)
                this.entityCounts.teamList = (currentTeamList === null || currentTeamList === void 0 ? void 0 : currentTeamList.length) || 0; // to keep track of team list records count
            if (this.isFavoritesFTEnabled) {
                return { currentTeamList, currentFavTeamList };
            }
            else {
                return { currentTeamList, currentFavTeamList: [] };
            }
        });
    }
    /**
     * Used to retrieve address book entries from index DB and filter out favorites
     * @example
     * ```
     * directoryProvider.getFavoritesByAddressBook();
     * ```
     */
    getFavoritesByAddressBook(addressBookName) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield dbInstance();
            let favEntryList = [];
            const entryListFromDB = (yield (db === null || db === void 0 ? void 0 : db.get(IndexDBStoreNames.DIRECTORY, DirectoryEntities.ADDRESS_BOOK_LIST))) || [];
            if (entryListFromDB === null || entryListFromDB === void 0 ? void 0 : entryListFromDB.length) {
                // Flatten all favorite, active entries from all address books
                entryListFromDB.forEach(addressBook => {
                    var _a;
                    const favEntries = (_a = addressBook.addressBooksEntries) === null || _a === void 0 ? void 0 : _a.filter(entry => entry.isFavorite === true);
                    if (favEntries && (favEntries === null || favEntries === void 0 ? void 0 : favEntries.length)) {
                        favEntryList.push(...favEntries);
                    }
                    if ((addressBookName === null || addressBookName === void 0 ? void 0 : addressBookName.length) > 0) {
                        favEntryList = [];
                        const filteredAddressBook = this.filterAddressBook(addressBookName.toUpperCase(), entryListFromDB);
                        filteredAddressBook.forEach(addressBook => {
                            var _a;
                            const favFilteredEntries = (_a = addressBook === null || addressBook === void 0 ? void 0 : addressBook.addressBooksEntries) === null || _a === void 0 ? void 0 : _a.filter(entry => (entry === null || entry === void 0 ? void 0 : entry.isFavorite) === true);
                            if (favFilteredEntries && (favFilteredEntries === null || favFilteredEntries === void 0 ? void 0 : favFilteredEntries.length)) {
                                favEntryList.push(...favFilteredEntries);
                            }
                        });
                    }
                });
            }
            this.favoriteAddressBookList = favEntryList;
            db === null || db === void 0 ? void 0 : db.put(IndexDBStoreNames.DIRECTORY, favEntryList, IndexDBKeyNames.FAVORITE_STANDARD_ADDRESS_BOOK);
            return favEntryList;
        });
    }
    /**
     * Used to toggle the favorite marker for standard address book entries in Index DB
     * @param addressBookEntries - Array of address book entries for which favorite field needs to be toggled
     * @example
     * ```
     * directoryProvider.toggleFavoriteForStandardAddressBookEntries(addressBookEntries);
     * ```
     */
    toggleFavoriteForStandardAddressBookEntries(addressBookEntries) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield dbInstance();
            const favAddressBookEntriesList = [];
            const addressBookListFromDB = (yield (db === null || db === void 0 ? void 0 : db.get(IndexDBStoreNames.DIRECTORY, DirectoryEntities.ADDRESS_BOOK_LIST))) || [];
            const directorySearchResponse = (yield (db === null || db === void 0 ? void 0 : db.get(IndexDBStoreNames.DIRECTORY, IndexDBKeyNames.DIRECTORY_SEARCH_RESPONSE)));
            const favAgentListFromDB = (yield (db === null || db === void 0 ? void 0 : db.get(IndexDBStoreNames.DIRECTORY, IndexDBKeyNames.FAVORITE_AGENTS)));
            const favTeamListFromDB = (yield (db === null || db === void 0 ? void 0 : db.get(IndexDBStoreNames.DIRECTORY, IndexDBKeyNames.FAVORITE_TEAMS)));
            const entryIdsToToggle = addressBookEntries.map(entry => entry.addressBookEntryId);
            if ((_b = (_a = directorySearchResponse === null || directorySearchResponse === void 0 ? void 0 : directorySearchResponse.addressBookList) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.length) {
                directorySearchResponse.addressBookList.data = directorySearchResponse.addressBookList.data.map((entry) => {
                    if (entryIdsToToggle.includes(entry.addressBookId)) {
                        return Object.assign(Object.assign({}, entry), { isFavorite: !entry.isFavorite });
                    }
                    return entry;
                });
            }
            if (addressBookListFromDB === null || addressBookListFromDB === void 0 ? void 0 : addressBookListFromDB.length) {
                favAddressBookEntriesList.length = 0;
                addressBookListFromDB.forEach((bookList) => {
                    var _a;
                    bookList.addressBooksEntries = (_a = bookList === null || bookList === void 0 ? void 0 : bookList.addressBooksEntries) === null || _a === void 0 ? void 0 : _a.map((entry) => {
                        if (entryIdsToToggle.includes(entry.addressBookEntryId)) {
                            const isFavorite = entry.isFavorite || false;
                            const updatedEntry = Object.assign(Object.assign({}, entry), { isFavorite: !isFavorite });
                            if (updatedEntry.isFavorite) {
                                favAddressBookEntriesList.push(updatedEntry);
                            }
                            return updatedEntry;
                        }
                        if (entry.isFavorite) {
                            favAddressBookEntriesList.push(entry);
                        }
                        else {
                            entry.isFavorite = false;
                        }
                        return entry;
                    });
                });
            }
            db === null || db === void 0 ? void 0 : db.put(IndexDBStoreNames.DIRECTORY, addressBookListFromDB, DirectoryEntities.ADDRESS_BOOK_LIST);
            db === null || db === void 0 ? void 0 : db.put(IndexDBStoreNames.DIRECTORY, favAddressBookEntriesList, IndexDBKeyNames.FAVORITE_STANDARD_ADDRESS_BOOK);
            db === null || db === void 0 ? void 0 : db.put(IndexDBStoreNames.DIRECTORY, directorySearchResponse, IndexDBKeyNames.DIRECTORY_SEARCH_RESPONSE);
            // Rebuild DirectoryResponse and publish event
            const directoryResponse = {
                skillList: { data: [] },
                agentList: { data: [], favoriteAgents: [] },
                addressBookList: { data: [] },
                teamList: { data: [], favoriteTeams: [] },
            };
            if (directorySearchResponse) {
                directoryResponse.skillList.data = (directorySearchResponse === null || directorySearchResponse === void 0 ? void 0 : directorySearchResponse.skillList) ? (_c = directorySearchResponse === null || directorySearchResponse === void 0 ? void 0 : directorySearchResponse.skillList) === null || _c === void 0 ? void 0 : _c.data : [];
                directoryResponse.teamList.data = (directorySearchResponse === null || directorySearchResponse === void 0 ? void 0 : directorySearchResponse.teamList) ? (_d = directorySearchResponse === null || directorySearchResponse === void 0 ? void 0 : directorySearchResponse.teamList) === null || _d === void 0 ? void 0 : _d.data : [];
                directoryResponse.addressBookList.data = (directorySearchResponse === null || directorySearchResponse === void 0 ? void 0 : directorySearchResponse.addressBookList) ? (_e = directorySearchResponse === null || directorySearchResponse === void 0 ? void 0 : directorySearchResponse.addressBookList) === null || _e === void 0 ? void 0 : _e.data : [];
                directoryResponse.agentList.data = (directorySearchResponse === null || directorySearchResponse === void 0 ? void 0 : directorySearchResponse.agentList) ? (_f = directorySearchResponse === null || directorySearchResponse === void 0 ? void 0 : directorySearchResponse.agentList) === null || _f === void 0 ? void 0 : _f.data : [];
                if (Array.isArray(favAgentListFromDB) && favAgentListFromDB.length > 0) {
                    directoryResponse.agentList.favoriteAgents = favAgentListFromDB;
                }
                if (Array.isArray(favTeamListFromDB) && favTeamListFromDB.length > 0) {
                    directoryResponse.teamList.favoriteTeams = favTeamListFromDB;
                }
                if (Array.isArray(favAddressBookEntriesList) && favAddressBookEntriesList.length > 0) {
                    directoryResponse.addressBookList.favoriteStandardAddressBooks = favAddressBookEntriesList;
                }
            }
            // publish directory search response with updated fav toggle information
            if ((_h = (_g = directoryResponse === null || directoryResponse === void 0 ? void 0 : directoryResponse.addressBookList) === null || _g === void 0 ? void 0 : _g.data) === null || _h === void 0 ? void 0 : _h.length)
                this.directoryBase.directoryEvent.next(directoryResponse);
        });
    }
    /**
     * Used to update the address list in index DB as per the new list
     * @param addressBookList - new address book list response
     */
    updateAddressBookListInDB(addressBookList) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield dbInstance();
            this.lastAddressBookEntriesArray = [];
            let currentAddressBookList = (yield (db === null || db === void 0 ? void 0 : db.get(IndexDBStoreNames.DIRECTORY, DirectoryEntities.ADDRESS_BOOK_LIST))) || [];
            let currentFavAddressBookList = (yield (db === null || db === void 0 ? void 0 : db.get(IndexDBStoreNames.DIRECTORY, IndexDBKeyNames.FAVORITE_STANDARD_ADDRESS_BOOK))) || [];
            const clientData = LocalStorageHelper.getItem(StorageKeys.CLIENT_DATA, true) || {};
            let currFavListInLS = clientData === null || clientData === void 0 ? void 0 : clientData.CXAFavStandAddBook; // has current favorites team list in local storage
            let clientDataApiFailed = false; // indicates if client data api call failed
            if (currentAddressBookList === null || currentAddressBookList === void 0 ? void 0 : currentAddressBookList.length) {
                /* below flow will be executed in case when address book list is already present in indexDB which happens in case user is already logged in
                or user logged in again without deleting browser history */
                addressBookList.forEach((addressBook) => {
                    var _a, _b;
                    const addressBookEntries = (addressBook === null || addressBook === void 0 ? void 0 : addressBook.addressBooksEntries) || [];
                    const matchedAddressBookIndex = currentAddressBookList.findIndex((currentAddressBook) => currentAddressBook.addressBookId === addressBook.addressBookId);
                    if (matchedAddressBookIndex >= 0) {
                        if (addressBookEntries.length) {
                            let currentAddressBookEntries = ((_a = currentAddressBookList[matchedAddressBookIndex]) === null || _a === void 0 ? void 0 : _a.addressBooksEntries) || [];
                            // Remove entries present in currentAddressBookEntries but not in addressBookEntries
                            currentAddressBookEntries = currentAddressBookEntries.filter((currentAddressBookEntry) => addressBookEntries.some((addressBookEntry) => addressBookEntry.addressBookEntryId === currentAddressBookEntry.addressBookEntryId));
                            addressBookEntries.forEach((addressBookEntry, entryIndex) => {
                                addressBookEntry.addressBookName = addressBook.addressBookName;
                                const matchedEntryIndex = currentAddressBookEntries.findIndex((currentAddressBookEntry) => currentAddressBookEntry.addressBookEntryId === addressBookEntry.addressBookEntryId);
                                // FAVORITES SYNC LOGIC
                                if (this.isFavoritesFTEnabled) {
                                    // Check if this entry is currently a favorite
                                    const favIndex = currentFavAddressBookList.findIndex((fav) => fav.addressBookEntryId === addressBookEntry.addressBookEntryId);
                                    if (favIndex >= 0) {
                                        addressBookEntry.isFavorite = true;
                                        // Update favorite entry in the favorites list
                                        currentFavAddressBookList[favIndex] = addressBookEntry;
                                    }
                                    else {
                                        addressBookEntry.isFavorite = false;
                                    }
                                }
                                if (matchedEntryIndex >= 0)
                                    currentAddressBookEntries[matchedEntryIndex] = addressBookEntries[entryIndex];
                                else
                                    currentAddressBookEntries.push(addressBookEntry);
                            });
                            currentAddressBookList[matchedAddressBookIndex].addressBooksEntries = currentAddressBookEntries;
                        }
                    }
                    else {
                        (_b = addressBook.addressBooksEntries) === null || _b === void 0 ? void 0 : _b.forEach((addressBookEntry) => {
                            // FAVORITES SYNC LOGIC for new book
                            if (this.isFavoritesFTEnabled) {
                                const favIndex = currentFavAddressBookList.findIndex((fav) => fav.addressBookEntryId === addressBookEntry.addressBookEntryId);
                                addressBookEntry.isFavorite = favIndex >= 0;
                                if (favIndex >= 0)
                                    currentFavAddressBookList[favIndex] = addressBookEntry;
                            }
                        });
                        currentAddressBookList.push(addressBook);
                    }
                });
                if (this.isFavoritesFTEnabled) {
                    if (((_a = clientData === null || clientData === void 0 ? void 0 : clientData.CXAFavStandAddBook) === null || _a === void 0 ? void 0 : _a.length) && this.isFavoritesFTEnabled) {
                        const allAddressBookList = [];
                        currentAddressBookList.forEach((addressBook) => {
                            allAddressBookList.push(...((addressBook === null || addressBook === void 0 ? void 0 : addressBook.addressBooksEntries) || []));
                        });
                        ({ currFavListInLS, clientDataApiFailed } = yield handleDirectoryItemDeletion({
                            listFromDB: allAddressBookList,
                            idName: 'addressBookEntryId',
                            favClientList: clientData.CXAFavStandAddBook,
                            storageKey: 'cxaFavStandAddBook',
                            clientDataKey: 'CXAFavStandAddBook',
                            checkForActive: false,
                        }));
                    }
                }
            }
            else {
                /* below flow will be executed when address book list is not present in indexDB which happens in case user logs in
                 after deleting browser history */
                currentAddressBookList = addressBookList;
                if (this.isFavoritesFTEnabled) {
                    // First-time load: sync favorites from client data/local storage
                    if ((_b = clientData === null || clientData === void 0 ? void 0 : clientData.CXAFavStandAddBook) === null || _b === void 0 ? void 0 : _b.length) {
                        const allAddressBookList = [];
                        addressBookList.forEach((addressBook) => {
                            allAddressBookList.push(...((addressBook === null || addressBook === void 0 ? void 0 : addressBook.addressBooksEntries) || []));
                        });
                        ({ currFavListInLS, clientDataApiFailed } = yield handleDirectoryItemDeletion({
                            listFromDB: allAddressBookList,
                            idName: 'addressBookEntryId',
                            favClientList: clientData.CXAFavStandAddBook,
                            storageKey: 'cxaFavStandAddBook',
                            clientDataKey: 'CXAFavStandAddBook',
                            checkForActive: false,
                        }));
                    }
                    currentAddressBookList.forEach((addressBook) => {
                        var _a;
                        (_a = addressBook.addressBooksEntries) === null || _a === void 0 ? void 0 : _a.forEach((entry) => {
                            entry.isFavorite = currFavListInLS === null || currFavListInLS === void 0 ? void 0 : currFavListInLS.includes(entry.addressBookEntryId);
                            if (entry.isFavorite) {
                                currentFavAddressBookList.push(entry);
                            }
                        });
                    });
                }
            }
            addressBookList.forEach(addressBook => {
                var _a;
                (_a = addressBook === null || addressBook === void 0 ? void 0 : addressBook.addressBooksEntries) === null || _a === void 0 ? void 0 : _a.forEach(addressBookEntry => {
                    this.lastAddressBookEntriesArray.push({
                        firstName: addressBookEntry.firstName,
                        lastName: addressBookEntry.lastName,
                        addressBookEntryId: addressBookEntry.addressBookEntryId,
                        addressBookId: addressBook.addressBookId,
                    });
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
            if (this.isFavoritesFTEnabled && !clientDataApiFailed) {
                const favAddressBookIdSet = new Set(currFavListInLS);
                // in case fav entry is deleted from userhub, we will remove it from currentFavAddressBookList
                currentFavAddressBookList = currentFavAddressBookList.filter(addressBook => favAddressBookIdSet.has(addressBook.addressBookEntryId));
            }
            this.lastAddressBookEntriesArray = sortedEntries;
            if (!this.searchText)
                this.entityCounts.addressBookList = ((_c = this.lastAddressBookEntriesArray) === null || _c === void 0 ? void 0 : _c.length) || 0; // to keep track of addressBook list records count
            db === null || db === void 0 ? void 0 : db.put(IndexDBStoreNames.DIRECTORY, currentAddressBookList, DirectoryEntities.ADDRESS_BOOK_LIST);
            if (this.isFavoritesFTEnabled) {
                db === null || db === void 0 ? void 0 : db.put(IndexDBStoreNames.DIRECTORY, currentFavAddressBookList, IndexDBKeyNames.FAVORITE_STANDARD_ADDRESS_BOOK);
                return { currentAddressBookList, currentFavAddressBookList };
            }
            else {
                return { currentAddressBookList, currentFavAddressBookList: [] };
            }
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
        return ((skillList === null || skillList === void 0 ? void 0 : skillList.filter(skill => skill.mediaTypeId === (this === null || this === void 0 ? void 0 : this.mediaType) && skill.isActive)) || []);
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
     * @param agentStateName - string
     * @returns agentState - number
     * @example getUnifiedAgentStateOrDefault(agentState)
     */
    getUnifiedAgentStateOrDefault(agentStateName) {
        return UnifiedAgentStateSortOrder[agentStateName] || UnifiedAgentStateSortOrder[UnifiedDirectoryAgentStates.AGENT_STATE_UNAVAILABLE];
    }
    /**
     *
     * @param agentList - list of agent
     * @param searchText - used to sort data by position of the searchText.
     * @returns sorted Agent List
     * @example sortAgentList(agentlist, searchText)
     */
    sortAgentList(agentList, searchText) {
        const isDigitalWorkingStateFeatureToggleEnabled = FeatureToggleService.instance.getFeatureToggleSync("release-cx-directory-agent-state-working-digital-AW-28472" /* FeatureToggles.DIRECTORY_AGENT_STATE_WORKING_DIGITAL_FEATURE_TOGGLE */);
        //sort agent list by agent state.
        let sortedAgentList = agentList.sort((agentA, agentB) => {
            if (isDigitalWorkingStateFeatureToggleEnabled) {
                return this.getUnifiedAgentStateOrDefault(agentA.agentStateName) - this.getUnifiedAgentStateOrDefault(agentB.agentStateName);
            }
            else {
                return this.getAgentStateOrDefault(agentA.agentStateName) - this.getAgentStateOrDefault(agentB.agentStateName);
            }
        });
        // sort agent list with same state alphabetically.
        sortedAgentList = sortedAgentList.sort((agentA, agentB) => {
            if ((isDigitalWorkingStateFeatureToggleEnabled &&
                this.getUnifiedAgentStateOrDefault(agentA.agentStateName) ===
                    this.getUnifiedAgentStateOrDefault(agentB.agentStateName)) ||
                (!isDigitalWorkingStateFeatureToggleEnabled &&
                    this.getAgentStateOrDefault(agentA.agentStateName) === this.getAgentStateOrDefault(agentB.agentStateName))) {
                return (agentA.firstName + ' ' + agentA.lastName)
                    .toUpperCase()
                    .localeCompare((agentB.firstName + ' ' + agentB.lastName).toUpperCase());
            }
            return 0;
        });
        // sort agent list with same state by the position of search term.
        if (searchText) {
            sortedAgentList = sortedAgentList.sort((agentA, agentB) => {
                if ((isDigitalWorkingStateFeatureToggleEnabled &&
                    this.getUnifiedAgentStateOrDefault(agentA.agentStateName) ===
                        this.getUnifiedAgentStateOrDefault(agentB.agentStateName)) ||
                    (!isDigitalWorkingStateFeatureToggleEnabled &&
                        this.getAgentStateOrDefault(agentA.agentStateName) === this.getAgentStateOrDefault(agentB.agentStateName))) {
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