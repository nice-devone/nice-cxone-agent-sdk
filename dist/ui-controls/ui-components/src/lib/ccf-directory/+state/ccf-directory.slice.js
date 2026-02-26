import { __awaiter } from "tslib";
import { DirectoryEntities, MediaTypeId, MediaType, } from '@nice-devone/common-sdk';
import { createAsyncThunk, createSelector, createSlice, } from '@reduxjs/toolkit';
import { CXoneClient, FeatureToggleService, } from '@nice-devone/agent-sdk';
import { Navigation } from '../../../enums/navigation-menus';
import { CXoneAcdClient } from '@nice-devone/acd-sdk';
import { CXoneDigitalClient } from '@nice-devone/digital-sdk';
import { dbInstance, IndexDBKeyNames, IndexDBStoreNames } from '@nice-devone/core-sdk';
const cxoneClient = CXoneClient.instance;
let previousSearchedText = '';
let externalDirectoryStartIndex = 0;
let mediaTypeId = -1;
export const CCF_DIRECTORY_FEATURE_KEY = 'agentDirectory';
export var AgentStatus;
(function (AgentStatus) {
    AgentStatus["WORKING"] = "working";
    AgentStatus["AVAILABLE"] = "available";
})(AgentStatus || (AgentStatus = {}));
export var DirectoryDropdownValues;
(function (DirectoryDropdownValues) {
    DirectoryDropdownValues["All"] = "all";
    DirectoryDropdownValues["AgentList"] = "agentList";
    DirectoryDropdownValues["SkillList"] = "skillList";
    DirectoryDropdownValues["TeamList"] = "teamList";
    DirectoryDropdownValues["FavoriteList"] = "favoriteList";
    DirectoryDropdownValues["ExternalDirectories"] = "externalDirectories";
    DirectoryDropdownValues["AddressBookList"] = "addressBookList";
    DirectoryDropdownValues["SkillActivity"] = "SkillActivity";
})(DirectoryDropdownValues || (DirectoryDropdownValues = {}));
export var DirectorySearchRecord;
(function (DirectorySearchRecord) {
    DirectorySearchRecord[DirectorySearchRecord["AllDirectoryCount"] = 2] = "AllDirectoryCount";
    DirectorySearchRecord[DirectorySearchRecord["DirectoryCount"] = 25] = "DirectoryCount";
})(DirectorySearchRecord || (DirectorySearchRecord = {}));
export var DirectoryUserAgentStates;
(function (DirectoryUserAgentStates) {
    DirectoryUserAgentStates["Available"] = "Available";
    DirectoryUserAgentStates["Unavailable"] = "Unavailable";
    DirectoryUserAgentStates["InboundContact"] = "InboundContact";
    DirectoryUserAgentStates["OutboundContact"] = "OutboundContact";
    DirectoryUserAgentStates["InboundConsult"] = "InboundConsult";
    DirectoryUserAgentStates["OutboundConsult"] = "OutboundConsult";
    DirectoryUserAgentStates["Dialer"] = "Dialer";
    DirectoryUserAgentStates["DialerPending"] = "DialerPending";
    DirectoryUserAgentStates["LoggedOut"] = "LoggedOut";
    DirectoryUserAgentStates["Working"] = "Working";
})(DirectoryUserAgentStates || (DirectoryUserAgentStates = {}));
export var DirectoryEntryStates;
(function (DirectoryEntryStates) {
    DirectoryEntryStates["Green"] = "Green";
    DirectoryEntryStates["Orange"] = "Orange";
    DirectoryEntryStates["Grey"] = "Grey";
    DirectoryEntryStates["Red"] = "Red";
    DirectoryEntryStates["Yellow"] = "Yellow";
})(DirectoryEntryStates || (DirectoryEntryStates = {}));
/**
 * Represents the types of items that may exist in a directory,
 * such as agents, teams or skills.
 */
export var DirectoryItemType;
(function (DirectoryItemType) {
    DirectoryItemType["Agent"] = "agent";
    DirectoryItemType["Team"] = "team";
    DirectoryItemType["Skill"] = "skill";
    DirectoryItemType["Addressbook"] = "addressbook";
    DirectoryItemType["ExtDirectoryEntries"] = "extDirectoryEntries";
    DirectoryItemType["DigitalSkill"] = "digitalSkill";
})(DirectoryItemType || (DirectoryItemType = {}));
export const initialCcfDirectoryState = {
    query: {
        searchBox: '',
        dropDown: DirectoryDropdownValues.All,
        offSetVal: 1,
    },
    emptySearchFlg: false,
    skills: [],
    digitalSkills: [],
    isAgentLoading: false,
    isSkillsLoading: false,
    isTeamsLoading: false,
    isDigitalSkillsLoading: false,
    isFavoriteAgentsLoading: false,
    isFavoriteTeamsLoading: false,
    isFavoriteDigitalSkillsLoading: false,
    isFavoriteStdAdrsBookLoading: false,
    isFavoriteExtDirectoryLoading: false,
    agentContacts: [],
    favoriteAgents: [],
    favoriteTeams: [],
    favoriteStandardAddressBooks: [],
    isFavoriteSkillsLoading: false,
    favoriteSkills: [],
    favoriteDigitalSkills: [],
    favoriteExtDirectoryEntries: [],
    teams: [],
    skillPollingActive: false,
    agentHasMultipleSkills: {
        agentHasMultipleSkillsFlg: false,
        res: [],
    },
    agentsTeamPollingActive: false,
    drillDownToAgent: false,
    noStandardEntriesAll: false,
    skillIdSelectedForInteraction: null,
    loadingAgentsForTeam: false,
    toggleSkillSelector: [{ triggerState: false, triggerType: 'voice' }],
    isDirectoryEntriesLoading: false,
    externalDirectoryState: false,
    externalDirectories: {},
    directoryEntries: [],
    currentTeamId: '',
    totalAgentsSearchMatchRecords: 0,
    totalTeamsSearchMatchRecords: 0,
    totalSkillsSearchMatchRecords: 0,
    totalDigitalSkillsSearchMatchRecords: 0,
    externalDirectorySubscriptionId: '',
    externalDirectoryDrillDown: false,
    totalExternalDirectoryRecordsCount: 0,
    selectedDrillDownUserEntry: {},
    noAgentDataFound: false,
    noTeamDataFound: false,
    hideExternalDirectoryData: false,
    directoryFocus: false,
    directoryRendered: false,
    totalAgentCount: 0,
    totalTeamCount: 0,
    totalSkillCount: 0,
    noSkillDataFound: false,
    isFullViewDirectory: false,
    standardAddressBooks: [],
    standardBookEntriesResponse: {},
    standardBookAutoCompleteEntriesResponse: [],
    displayStandardAddressDetails: {
        displayDetails: false,
        addressBookEntryId: 0,
    },
    totalAddressBookSearchMatchRecords: 0,
    isAddressBookDataLoading: false,
    allAddressBookCount: 0,
    isPollingStarted: false,
    skillList: [],
    showClientDataApiFailedToast: { storageExceeded: false, apiFailed: false },
    favoritesInDirectory: { agents: [], teams: [], skills: [], standardAdrsBook: [], extDirectoryEntries: [], digitalSkills: [] },
    favoriteIdsToggled: { agents: [], teams: [], skills: [], standardAdrsBook: [], extDirectoryEntries: [], digitalSkills: [] },
    storeFavsToastReference: null,
};
/** Used to set mediaType id for selected media type
 * @param mediaType - mediatype of particular case
 * @example -
 * ```
 * setMediaTypeIdForACD('Workitem);
 * ```
 */
const setMediaTypeIdForACD = (mediaType) => {
    switch (mediaType) {
        case MediaType.WORKITEM:
            return MediaTypeId.WorkItem;
        case MediaType.VOICE:
            return MediaTypeId.PhoneCall;
        case MediaType.VOICEMAIL:
            return MediaTypeId.VoiceEmail;
        default:
            return MediaTypeId.PhoneCall;
    }
};
/** Used to start the activity polling on button click
 * @example -
 * ```
 * startActivityPolling();
 * ```
 */
export const startActivityPolling = createAsyncThunk('agentDirectory/startActivityPolling', (activityRequestParam) => {
    const mediaTypeId = setMediaTypeIdForACD(activityRequestParam.mediaType);
    const skillActivityPollingRequest = {
        offset: activityRequestParam.offset,
        limit: activityRequestParam.limit,
        searchText: activityRequestParam.searchText ? activityRequestParam.searchText : '',
        mediaTypeId: mediaTypeId,
        isOutbound: false,
    };
    cxoneClient.skillActivityQueue.startSkillActivityPolling(skillActivityPollingRequest);
    return activityRequestParam;
});
/** Used to stop the activity polling on button click
 * @example -
 * ```
 * stopActivityPolling();
 * ```
 */
export const stopActivityPolling = createAsyncThunk('agentDirectory/stopActivityPolling', (value) => {
    cxoneClient.skillActivityQueue.terminateSkillActivityPolling();
    return value;
});
/** Used to start the agent polling on button click
 * @example -
 * ```
 * startAgentPolling();
 * ```
 */
export const startAgentTeamPolling = createAsyncThunk('agentDirectory/startAgentTeamPolling', (data) => {
    const directoryRequest = {
        entity: data.value &&
            data.value.length &&
            data.value.length > 0 &&
            typeof data.value !== 'string'
            ? data.value
            : [data.value],
        offset: data.offset,
        limit: data.limit,
        searchText: data.searchText ? data.searchText.trim() : '',
        teamId: data.teamId ? data.teamId : '',
        pollingOptions: data.pollingOptions ? data.pollingOptions : {},
    };
    if (data.mediaTypeId) {
        directoryRequest.mediaType = data.mediaTypeId;
        mediaTypeId = data.mediaTypeId;
    }
    cxoneClient.directory.getDirectoryData(directoryRequest);
    return data;
});
/** Used to stop the activity polling on button click
 * @example -
 * ```
 * stopAgentPolling();
 * ```
 */
export const stopAgentTeamPolling = createAsyncThunk('agentDirectory/stopAgentTeamPolling', (value) => {
    cxoneClient.directory.terminateDirectoryPolling();
    return value;
});
/** Used to stop the activity polling on button click
 * @example -
 * ```
 * stopEveryPolling();
 * ```
 */
export const stopEveryPolling = createAsyncThunk('agentDirectory/stopEveryPolling', (_, { getState }) => {
    cxoneClient.directory.terminateDirectoryPolling();
    const { global } = getState();
    const { appSpace } = getState();
    const { agentDirectory } = getState();
    if ((!(global.selectedMenuName === Navigation.QUEUE ||
        appSpace.appSpaceSelectedTab.tab === Navigation.QUEUE))
        && (agentDirectory.query.dropDown !== DirectoryDropdownValues.SkillList
            && agentDirectory.query.dropDown !== DirectoryDropdownValues.All)) {
        cxoneClient.skillActivityQueue.terminateSkillActivityPolling();
    }
    return {};
});
/** Used to retrieve fav agents' list
 * @param agentName - name of agent
 * @example -
 * ```
 * getAgentFavorites();
 * ```
 */
export const getAgentFavorites = createAsyncThunk('agentDirectory/getAgentFavorites', (agentName, { dispatch, getState }) => __awaiter(void 0, void 0, void 0, function* () {
    const { agentDirectory } = getState();
    const favList = yield cxoneClient.directory.getFavoritesByAgent(agentName);
    const params = { searchText: agentDirectory.query.searchBox,
        value: [DirectoryEntities.AGENT_LIST],
        pollingOptions: { isPolling: true, pollingInterval: 5000 } };
    yield dispatch(startAgentTeamPolling(params));
    return favList;
}));
/** Used to retrieve fav team list
 * @param teamName - name of team
 * @example -
 * ```
 * getTeamFavorites();
 * ```
 */
export const getTeamFavorites = createAsyncThunk('agentDirectory/getTeamFavorites', (teamName, { dispatch, getState }) => __awaiter(void 0, void 0, void 0, function* () {
    const { agentDirectory } = getState();
    const favList = yield cxoneClient.directory.getFavoritesByTeam(teamName);
    const params = { searchText: agentDirectory.query.searchBox,
        value: [DirectoryEntities.TEAM_LIST],
        pollingOptions: { isPolling: true, pollingInterval: 5000 } };
    yield dispatch(startAgentTeamPolling(params));
    return favList;
}));
/** Used to retrieve fav skill list
 * @example -
 * ```
 * getDigitalSkillFavorites();
 * ```
 */
export const getDigitalSkillFavorites = createAsyncThunk('agentDirectory/getDigitalSkillFavorites', (skillName, { dispatch, getState }) => __awaiter(void 0, void 0, void 0, function* () {
    const { agentDirectory } = getState();
    const favList = yield cxoneClient.directory.getFavoritesByDigitalSkill(skillName);
    const params = { searchText: agentDirectory.query.searchBox,
        value: [DirectoryEntities.SKILL_LIST],
        pollingOptions: { isPolling: true, pollingInterval: 5000 } };
    yield dispatch(startAgentTeamPolling(params));
    return favList;
}));
/** Used to retrieve favorite standard address book entries
 * @example -
 * ```
 * getAddressBookFavorites();
 * ```
 */
export const getAddressBookFavorites = createAsyncThunk('agentDirectory/getAddressBookFavorites', (addressBookName) => __awaiter(void 0, void 0, void 0, function* () {
    const favList = yield cxoneClient.directory.getFavoritesByAddressBook(addressBookName);
    return favList;
}));
/** Used to retrieve fav skill list
 * @example -
 * getSkillFavorites();
 */
export const getSkillFavorites = createAsyncThunk('agentDirectory/getSkillFavorites', (skillName) => __awaiter(void 0, void 0, void 0, function* () {
    const favList = yield cxoneClient.skillActivityQueue.skillActivityProvider.getFavoritesBySkill(skillName);
    return favList;
}));
/** Used to retrieve favorite external directory list
 * @param extDirectoryName - name of external directory to search for
 * @example -
 * ```
 * getExtDirectoryFavorites('SearchText');
 * ```
 */
export const getExtDirectoryFavorites = createAsyncThunk('agentDirectory/getExtDirectoryFavorites', (extDirectoryName, { getState }) => __awaiter(void 0, void 0, void 0, function* () {
    const { agentDirectory } = getState();
    const favList = yield cxoneClient.directory.dynamicDirectory.getFavoritesByExtDirectory(agentDirectory === null || agentDirectory === void 0 ? void 0 : agentDirectory.directoryEntries, extDirectoryName);
    return favList;
}));
const CLIENT_DATA_API_UPDATE_DELAY = 2000; // 2 seconds
const isFavoritesFTEnabled = FeatureToggleService.instance.getFeatureToggleSync("release-cxa-favorites-AW-40314" /* FeatureToggles.CXA_FAVORITES_FEATURE_TOGGLE */);
const initialDirectoryItemState = { batchedFavIds: [], debounceTimer: null, isUpdating: false, errorHandled: false };
const favToggledDirectoryItem = {
    agent: Object.assign({}, initialDirectoryItemState),
    team: Object.assign({}, initialDirectoryItemState),
    skill: Object.assign({}, initialDirectoryItemState),
    extDirectoryEntries: Object.assign({}, initialDirectoryItemState),
    addressbook: Object.assign({}, initialDirectoryItemState),
    digitalSkill: Object.assign({}, initialDirectoryItemState),
};
/** handle client data api failure
   * @param dispatch - dispatch function
   * @param error - from client data api
   * @example -
   * ```
   * handleClientDataApiFailure(dispatch, error);
   * ```
   */
const handleClientDataApiFailure = (dispatch, error) => {
    if (String(error === null || error === void 0 ? void 0 : error.message).toLowerCase() === 'exceeds the limit of the database') {
        dispatch(agentDirectoryActions.clientDataApiFailed({ storageExceeded: true, apiFailed: false }));
    }
    else {
        dispatch(agentDirectoryActions.clientDataApiFailed({ storageExceeded: false, apiFailed: true }));
    }
};
/** used to get updated toggled id for directory item
   * @param directoryItemType - type of directory item (agent/team/skill/extDirectory/addressbook)
   * @param toggledIds - current toggled ids in directory
   * @returns updated toggled ids for directory item
   * @example -
   * ```
   * initializeToggledIdsForDirectoryItem(agent/team/skill/AddressBook/ExrDirectoryEntries);
   * ```
   */
const initializeToggledIdsForDirectoryItem = (directoryItemType, toggledIds) => {
    let updatedIdToggled = Object.assign({}, toggledIds);
    const keyMap = {
        [DirectoryItemType.Agent]: 'agents',
        [DirectoryItemType.Team]: 'teams',
        [DirectoryItemType.Addressbook]: 'standardAdrsBook',
        [DirectoryItemType.Skill]: 'skills',
        [DirectoryItemType.ExtDirectoryEntries]: 'extDirectoryEntries',
        [DirectoryItemType.DigitalSkill]: 'digitalSkills',
    };
    const key = keyMap[directoryItemType];
    updatedIdToggled = key ? Object.assign(Object.assign({}, toggledIds), { [key]: [] }) : Object.assign({}, toggledIds);
    return updatedIdToggled;
};
/** send all batched favorite ids to client data api
   * @param directoryItemType - type of directory item (agent/team/skill/AddressBook/ExrDirectoryEntries)
   * @param dispatch - dispatch function
   * @example -
   * ```
   * dispatch(commitQueuedFavsToClientDataApi(agent/team/skill/AddressBook/ExrDirectoryEntries));
   * ```
   */
export const commitQueuedFavsToClientDataApi = createAsyncThunk('directory/commitQueuedFavsToClientDataApi', (directoryItemType, { dispatch, getState }) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const { agentDirectory } = getState();
    const directoryItem = favToggledDirectoryItem[directoryItemType];
    if (directoryItem.isUpdating)
        return;
    directoryItem.isUpdating = true;
    const favoriteIds = [...directoryItem.batchedFavIds];
    directoryItem.batchedFavIds = [];
    try {
        yield cxoneClient.agentSetting.updateAgentClientDataSettings(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, (directoryItemType === DirectoryItemType.Agent && { cxaFavAgents: favoriteIds })), (directoryItemType === DirectoryItemType.Team && { cxaFavTeams: favoriteIds })), (directoryItemType === DirectoryItemType.Addressbook && { cxaFavStandAddBook: favoriteIds })), (directoryItemType === DirectoryItemType.Skill && { cxaFavSkills: favoriteIds })), (directoryItemType === DirectoryItemType.DigitalSkill && { cxaFavDigitalSkills: favoriteIds })), (directoryItemType === DirectoryItemType.ExtDirectoryEntries && { cxaFavExtDirectory: favoriteIds })));
        const toggledIds = (agentDirectory === null || agentDirectory === void 0 ? void 0 : agentDirectory.favoriteIdsToggled) || {};
        const updatedIdToggled = initializeToggledIdsForDirectoryItem(directoryItemType, toggledIds);
        dispatch(agentDirectoryActions.updateFavoriteIdsToggled(updatedIdToggled));
    }
    catch (error) {
        const toggledIds = (agentDirectory === null || agentDirectory === void 0 ? void 0 : agentDirectory.favoriteIdsToggled) || {};
        let updatedIdToggled = Object.assign({}, toggledIds);
        // Handle the error based on the directory item type
        switch (directoryItemType) {
            case DirectoryItemType.Agent:
                if (!directoryItem.errorHandled) {
                    directoryItem.errorHandled = true;
                    const agentList = (agentDirectory === null || agentDirectory === void 0 ? void 0 : agentDirectory.agentContacts) || [];
                    const agentIdsNotSentToApi = agentList.filter(agent => { var _a; return (_a = toggledIds === null || toggledIds === void 0 ? void 0 : toggledIds.agents) === null || _a === void 0 ? void 0 : _a.includes(agent === null || agent === void 0 ? void 0 : agent.agentId); });
                    dispatch(toggleFavoriteForMultipleAgents({ agent: agentIdsNotSentToApi, apiFailed: true }));
                }
                break;
            case DirectoryItemType.Team:
                if (!directoryItem.errorHandled) {
                    directoryItem.errorHandled = true;
                    const teamList = (agentDirectory === null || agentDirectory === void 0 ? void 0 : agentDirectory.teams) || [];
                    const teamIdsNotSentToApi = teamList.filter(team => { var _a; return (_a = toggledIds === null || toggledIds === void 0 ? void 0 : toggledIds.teams) === null || _a === void 0 ? void 0 : _a.includes(team.teamId); });
                    dispatch(toggleFavoriteForTeams({ team: teamIdsNotSentToApi, apiFailed: true }));
                }
                break;
            case DirectoryItemType.DigitalSkill:
                if (!directoryItem.errorHandled) {
                    directoryItem.errorHandled = true;
                    const skillList = (agentDirectory === null || agentDirectory === void 0 ? void 0 : agentDirectory.digitalSkills) || [];
                    const skillIdsNotSentToApi = skillList.filter(skill => { var _a; return (_a = toggledIds === null || toggledIds === void 0 ? void 0 : toggledIds.digitalSkills) === null || _a === void 0 ? void 0 : _a.includes(skill.skillId); });
                    dispatch(toggleFavoriteForDigitalSkills({ skills: skillIdsNotSentToApi, apiFailed: true }));
                }
                break;
            case DirectoryItemType.Addressbook:
                if (!directoryItem.errorHandled) {
                    directoryItem.errorHandled = true;
                    const addressBookEntryList = ((_a = agentDirectory === null || agentDirectory === void 0 ? void 0 : agentDirectory.standardBookEntriesResponse) === null || _a === void 0 ? void 0 : _a.addressBooksEntries) || [];
                    const entryIdsNotSentToApi = addressBookEntryList.filter(entry => { var _a; return (_a = toggledIds === null || toggledIds === void 0 ? void 0 : toggledIds.standardAdrsBook) === null || _a === void 0 ? void 0 : _a.includes(entry.addressBookEntryId); });
                    dispatch(toggleFavoriteStandardAdrsBook({ addressBooksEntries: entryIdsNotSentToApi, apiFailed: true }));
                }
                break;
            case DirectoryItemType.Skill:
                if (!directoryItem.errorHandled) {
                    directoryItem.errorHandled = true;
                    const skillList = (agentDirectory === null || agentDirectory === void 0 ? void 0 : agentDirectory.skills) || [];
                    const skillIdsNotSentToApi = skillList.filter(skill => { var _a; return (_a = toggledIds === null || toggledIds === void 0 ? void 0 : toggledIds.skills) === null || _a === void 0 ? void 0 : _a.includes(skill.skillId); });
                    dispatch(toggleFavoriteForSkills({ skills: skillIdsNotSentToApi, apiFailed: true }));
                }
                break;
            case DirectoryItemType.ExtDirectoryEntries:
                if (!directoryItem.errorHandled) {
                    directoryItem.errorHandled = true;
                    const extDirectoryEntries = (agentDirectory === null || agentDirectory === void 0 ? void 0 : agentDirectory.directoryEntries) || [];
                    const extDirectoryIdsNotSentToApi = extDirectoryEntries.filter(directoryEntry => { var _a; return (_a = toggledIds === null || toggledIds === void 0 ? void 0 : toggledIds.extDirectoryEntries) === null || _a === void 0 ? void 0 : _a.includes(directoryEntry === null || directoryEntry === void 0 ? void 0 : directoryEntry.userMappingId); });
                    dispatch(toggleFavoriteForExtDirectoryEntries({ extDirectoryEntries: extDirectoryIdsNotSentToApi, apiFailed: true }));
                }
                break;
        }
        updatedIdToggled = initializeToggledIdsForDirectoryItem(directoryItemType, updatedIdToggled);
        dispatch(agentDirectoryActions.updateFavoriteIdsToggled(updatedIdToggled));
        const typedError = error;
        if (!((_b = agentDirectory === null || agentDirectory === void 0 ? void 0 : agentDirectory.showClientDataApiFailedToast) === null || _b === void 0 ? void 0 : _b.apiFailed) && !((_c = agentDirectory === null || agentDirectory === void 0 ? void 0 : agentDirectory.showClientDataApiFailedToast) === null || _c === void 0 ? void 0 : _c.storageExceeded)) {
            handleClientDataApiFailure(dispatch, typedError);
        }
    }
    finally {
        directoryItem.isUpdating = false;
        directoryItem.errorHandled = false;
    }
}));
/** to queue fav agent, team, skill ids and send after certain delay to client data api
   * @param favoriteIds - fav ids
   * @param dispatch - dispatch function
   * @param directoryItemType - type of directory item (agent/team/skill/extDirectory)
   * @example -
   * ```
   * queueFavoriteUpdate([123,456], dispatch, UpdateType.AGENT);
   * ```
   */
export const queueFavoriteUpdate = (favoriteIds, dispatch, type) => {
    const state = favToggledDirectoryItem[type];
    state.batchedFavIds = [...favoriteIds];
    if (state.debounceTimer)
        clearTimeout(state.debounceTimer);
    state.debounceTimer = setTimeout(() => {
        dispatch(commitQueuedFavsToClientDataApi(type));
    }, CLIENT_DATA_API_UPDATE_DELAY);
};
/** Used to toggle favorite agent in Index DB through SDK
 * @example -
 * ```
 * toggleFavoriteForSingleAgent(agent)
 * ```
 */
export const toggleFavoriteForSingleAgent = createAsyncThunk('agentDirectory/toggleFavoriteForAgent', (agent, { dispatch, getState }) => __awaiter(void 0, void 0, void 0, function* () {
    var _d, _e;
    const { agentDirectory } = getState();
    if (agentDirectory.query.dropDown === DirectoryDropdownValues.AgentList ||
        agentDirectory.query.dropDown === DirectoryDropdownValues.All) {
        const updatedAgents = agentDirectory.agentContacts.map((agentContact) => (Object.assign({}, agentContact)));
        const matchedAgentStateIndex = agentDirectory.agentContacts.findIndex((currentAgentState) => currentAgentState.agentId === agent.agentId);
        if (matchedAgentStateIndex >= 0) {
            updatedAgents[matchedAgentStateIndex].isFavorite = !((_d = updatedAgents[matchedAgentStateIndex]) === null || _d === void 0 ? void 0 : _d.isFavorite);
        }
        dispatch(agentDirectoryActions.updateFavInContactsList(updatedAgents));
    }
    if (agentDirectory.query.dropDown === DirectoryDropdownValues.FavoriteList) {
        const currFavAgentList = (_e = agentDirectory.favoriteAgents) === null || _e === void 0 ? void 0 : _e.filter((agentInstance) => agentInstance.agentId !== agent.agentId);
        dispatch(agentDirectoryActions.updateFavAgentList(currFavAgentList));
    }
    cxoneClient.directory.toggleFavoriteForAgent(agent);
}));
/** handles addition and removal of fav ids
 * @param favoritesInDB - favorite ids in DB
 * @param idsToToggle - fav ids to toggle
 * @example -
 * ```
 * updatedFavAgentIds([favAgentsDB],[agentIdsToToggle])
 * ```
 */
const updatedFavoriteIds = (favoritesInDB, idsToToggle) => {
    let favoriteIds = [];
    if (favoritesInDB.length === 0) {
        favoriteIds = [...idsToToggle];
    }
    else {
        favoriteIds = favoritesInDB.filter((id) => !idsToToggle.includes(id));
        idsToToggle.forEach((id) => {
            if (!favoritesInDB.includes(id)) {
                favoriteIds.push(id);
            }
        });
    }
    return favoriteIds;
};
/** Used to toggle favorite agent in Index DB through SDK
 * @param agent - array of agents to toggle favorite status
 * @param apiFailed - boolean to indicate if client data API call failed
 * @example -
 * ```
 * toggleFavoriteForMultipleAgents([agent])
 * ```
 */
export const toggleFavoriteForMultipleAgents = createAsyncThunk('agentDirectory/toggleFavoriteForAgent', ({ agent, apiFailed, }, { dispatch, getState }) => __awaiter(void 0, void 0, void 0, function* () {
    var _f, _g, _h;
    const { agentDirectory } = getState();
    const agentIdsToToggle = agent.map((agentInstance) => agentInstance.agentId);
    if (agentDirectory.query.dropDown === DirectoryDropdownValues.AgentList ||
        agentDirectory.query.dropDown === DirectoryDropdownValues.All) {
        const updatedAgents = agentDirectory.agentContacts.map((agentContact) => (Object.assign({}, agentContact)));
        agent.forEach((agentInfo) => {
            var _a;
            const matchedAgentStateIndex = agentDirectory.agentContacts.findIndex((currentAgentState) => currentAgentState.agentId === agentInfo.agentId);
            if (matchedAgentStateIndex >= 0) {
                updatedAgents[matchedAgentStateIndex].isFavorite = !((_a = updatedAgents[matchedAgentStateIndex]) === null || _a === void 0 ? void 0 : _a.isFavorite);
            }
        });
        dispatch(agentDirectoryActions.updateFavInContactsList(updatedAgents));
    }
    if (agentDirectory.query.dropDown === DirectoryDropdownValues.FavoriteList) {
        const currFavAgentList = (_g = (_f = agentDirectory.favoriteAgents) === null || _f === void 0 ? void 0 : _f.filter((agentInstance) => !agentIdsToToggle.includes(agentInstance === null || agentInstance === void 0 ? void 0 : agentInstance.agentId))) !== null && _g !== void 0 ? _g : [];
        dispatch(agentDirectoryActions.updateFavAgentList(currFavAgentList));
    }
    cxoneClient.directory.toggleFavoriteForAgent(agent);
    const db = yield dbInstance();
    const currentAgentList = (yield (db === null || db === void 0 ? void 0 : db.get(IndexDBStoreNames.DIRECTORY, DirectoryEntities.AGENT_LIST))) || [];
    const favAgentIdsDB = currentAgentList.filter(agent => agent === null || agent === void 0 ? void 0 : agent.isFavorite).map(agent => agent === null || agent === void 0 ? void 0 : agent.agentId);
    const favAgentIds = updatedFavoriteIds(favAgentIdsDB, agentIdsToToggle);
    // syncing store with favorite ids stored in IDB
    dispatch(agentDirectoryActions.syncingStoreWithFavs({ agents: favAgentIds }));
    // in case client data api has not failed and error is not handled proceed with below code
    if (!apiFailed && !((_h = favToggledDirectoryItem === null || favToggledDirectoryItem === void 0 ? void 0 : favToggledDirectoryItem.agent) === null || _h === void 0 ? void 0 : _h.errorHandled)) {
        dispatch(agentDirectoryActions.clientDataApiFailed({ storageExceeded: false, apiFailed: false }));
        const favIdToggled = (agentDirectory === null || agentDirectory === void 0 ? void 0 : agentDirectory.favoriteIdsToggled) || {};
        const favAgentIdToggled = (favIdToggled === null || favIdToggled === void 0 ? void 0 : favIdToggled.agents) && [...favIdToggled.agents] || [];
        agentIdsToToggle.forEach((agentId) => {
            const index = favAgentIdToggled === null || favAgentIdToggled === void 0 ? void 0 : favAgentIdToggled.indexOf(agentId);
            if (index > -1) {
                favAgentIdToggled === null || favAgentIdToggled === void 0 ? void 0 : favAgentIdToggled.splice(index, 1);
            }
            else {
                favAgentIdToggled.push(agentId);
            }
        });
        const updatedIdToggled = Object.assign(Object.assign({}, favIdToggled), { agents: favAgentIdToggled });
        dispatch(agentDirectoryActions.updateFavoriteIdsToggled(updatedIdToggled));
        queueFavoriteUpdate(favAgentIds, dispatch, DirectoryItemType.Agent);
    }
}));
/** Used to toggle favorite team in Index DB through SDK
 * @param team - array of teams to toggle favorite status
 * @param apiFailed - boolean to indicate if client data API call failed
 * @example -
 * ```
 * toggleFavoriteTeams([teams])
 * ```
 */
export const toggleFavoriteForTeams = createAsyncThunk('agentDirectory/toggleFavoriteForTeams', ({ team, apiFailed, }, { dispatch, getState }) => __awaiter(void 0, void 0, void 0, function* () {
    var _j, _k, _l;
    const { agentDirectory } = getState();
    const teamIdsToToggle = team.map((teamInstance) => teamInstance.teamId);
    if (agentDirectory.query.dropDown === DirectoryDropdownValues.TeamList ||
        agentDirectory.query.dropDown === DirectoryDropdownValues.All) {
        const updatedTeams = agentDirectory.teams.map((team) => (Object.assign({}, team)));
        team.forEach((teamInfo) => {
            var _a;
            const matchedTeamStateIndex = agentDirectory.teams.findIndex((currentTeamState) => currentTeamState.teamId === teamInfo.teamId);
            if (matchedTeamStateIndex >= 0) {
                updatedTeams[matchedTeamStateIndex].isFavorite = !((_a = updatedTeams[matchedTeamStateIndex]) === null || _a === void 0 ? void 0 : _a.isFavorite);
            }
        });
        dispatch(agentDirectoryActions.updateFavInTeamsList(updatedTeams));
    }
    if (agentDirectory.query.dropDown === DirectoryDropdownValues.FavoriteList) {
        const currFavTeamList = (_k = (_j = agentDirectory.favoriteTeams) === null || _j === void 0 ? void 0 : _j.filter((teamInstance) => !teamIdsToToggle.includes(teamInstance === null || teamInstance === void 0 ? void 0 : teamInstance.teamId))) !== null && _k !== void 0 ? _k : [];
        dispatch(agentDirectoryActions.updateFavTeamList(currFavTeamList));
    }
    cxoneClient.directory.toggleFavoriteForTeams(team);
    const db = yield dbInstance();
    const currentTeamList = (yield (db === null || db === void 0 ? void 0 : db.get(IndexDBStoreNames.DIRECTORY, DirectoryEntities.TEAM_LIST))) || [];
    const favTeamsDB = currentTeamList.filter(team => team === null || team === void 0 ? void 0 : team.isFavorite).map(team => team === null || team === void 0 ? void 0 : team.teamId);
    const favTeamIds = updatedFavoriteIds(favTeamsDB, teamIdsToToggle);
    dispatch(agentDirectoryActions.syncingStoreWithFavs({ teams: favTeamIds }));
    // in case client data api has not failed and error is not handled proceed with below code
    if (!apiFailed && !((_l = favToggledDirectoryItem === null || favToggledDirectoryItem === void 0 ? void 0 : favToggledDirectoryItem.team) === null || _l === void 0 ? void 0 : _l.errorHandled)) {
        dispatch(agentDirectoryActions.clientDataApiFailed({ storageExceeded: false, apiFailed: false }));
        const favIdToggled = (agentDirectory === null || agentDirectory === void 0 ? void 0 : agentDirectory.favoriteIdsToggled) || {};
        const favTeamIdToggled = (favIdToggled === null || favIdToggled === void 0 ? void 0 : favIdToggled.teams) && [...favIdToggled.teams] || [];
        teamIdsToToggle.forEach((teamId) => {
            const index = favTeamIdToggled.indexOf(teamId);
            if (index > -1) {
                favTeamIdToggled.splice(index, 1);
            }
            else {
                favTeamIdToggled.push(teamId);
            }
        });
        const updatedIdToggled = Object.assign(Object.assign({}, favIdToggled), { teams: favTeamIdToggled });
        dispatch(agentDirectoryActions.updateFavoriteIdsToggled(updatedIdToggled));
        queueFavoriteUpdate(favTeamIds, dispatch, DirectoryItemType.Team);
    }
}));
/**
 * Update the toggled favorites array by adding/removing skillIds.
 * @param currentIds - The current array of toggled IDs.
 * @param skillIdsToToggle - The array of skill IDs to toggle.
 * @example -
 * ```
 * updateToggledIds(currentIds, skillIdsToToggle)
 * ```
 */
export function updateToggledIds(currentIds = [], skillIdsToToggle) {
    const result = [...currentIds];
    skillIdsToToggle.forEach(id => {
        const idx = result.indexOf(id);
        if (idx > -1) {
            result.splice(idx, 1);
        }
        else {
            result.push(id);
        }
    });
    return result;
}
/** Used to toggle favorite skill in Index DB through SDK
 * @example -
 * ```
 * toggleFavoriteForSkills([skill])
 * ```
 */
export const toggleFavoriteForSkills = createAsyncThunk('agentDirectory/toggleFavoriteForSkills', ({ skills, apiFailed, }, { dispatch, getState }) => __awaiter(void 0, void 0, void 0, function* () {
    var _m, _o, _p;
    const { agentDirectory } = getState();
    const skillIdsToToggle = skills.map((skillInstance) => skillInstance.skillId);
    if (agentDirectory.query.dropDown === DirectoryDropdownValues.SkillList ||
        agentDirectory.query.dropDown === DirectoryDropdownValues.All) {
        const updatedSkills = agentDirectory.skills.map((skill) => (Object.assign({}, skill)));
        skills.forEach((skillInfo) => {
            const matchedAgentStateIndex = agentDirectory.skills.findIndex((currentSkillState) => currentSkillState.skillId === skillInfo.skillId);
            if (matchedAgentStateIndex >= 0) {
                updatedSkills[matchedAgentStateIndex].isFavorite = !updatedSkills[matchedAgentStateIndex].isFavorite;
            }
        });
        dispatch(agentDirectoryActions.updateFavInSkillsList(updatedSkills));
    }
    if (agentDirectory.query.dropDown === DirectoryDropdownValues.FavoriteList) {
        const currFavSkillsList = (_o = (_m = agentDirectory.favoriteSkills) === null || _m === void 0 ? void 0 : _m.filter((skillInstance) => !skillIdsToToggle.includes(skillInstance === null || skillInstance === void 0 ? void 0 : skillInstance.skillId))) !== null && _o !== void 0 ? _o : [];
        dispatch(agentDirectoryActions.updateFavSkillsList(currFavSkillsList));
    }
    cxoneClient.skillActivityQueue.skillActivityProvider.toggleFavoriteForSkill(skills);
    const db = yield dbInstance();
    const currentSkillList = (yield (db === null || db === void 0 ? void 0 : db.get(IndexDBStoreNames.DIRECTORY, DirectoryEntities.SKILL_ACTIVITY))) || [];
    const favSkillsDB = currentSkillList.filter(skill => skill.isFavorite).map(skill => skill.skillId);
    const favSkillIds = updatedFavoriteIds(favSkillsDB, skillIdsToToggle);
    const updatedSkills = Array.from(new Set([...favSkillIds]));
    dispatch(agentDirectoryActions.syncingStoreWithFavs({ skills: updatedSkills }));
    // in case client data api has not failed and error is not handled proceed with below code
    if (!apiFailed && !((_p = favToggledDirectoryItem === null || favToggledDirectoryItem === void 0 ? void 0 : favToggledDirectoryItem.skill) === null || _p === void 0 ? void 0 : _p.errorHandled)) {
        dispatch(agentDirectoryActions.clientDataApiFailed({ storageExceeded: false, apiFailed: false }));
        const favIdToggled = (agentDirectory === null || agentDirectory === void 0 ? void 0 : agentDirectory.favoriteIdsToggled) || {};
        const favSkillIdToggled = updateToggledIds(favIdToggled === null || favIdToggled === void 0 ? void 0 : favIdToggled.skills, skillIdsToToggle);
        const idToggled = (agentDirectory === null || agentDirectory === void 0 ? void 0 : agentDirectory.favoriteIdsToggled) || {};
        const updatedIdToggled = Object.assign(Object.assign({}, idToggled), { skills: favSkillIdToggled });
        dispatch(agentDirectoryActions.updateFavoriteIdsToggled(updatedIdToggled));
        // added both digital and ACD skill
        queueFavoriteUpdate(Array.from(new Set([...favSkillIds])), dispatch, DirectoryItemType.Skill);
    }
}));
/** Used to toggle favorite digital skill in Index DB through SDK
 * @example -
 * ```
 * toggleFavoriteForDigitalSkills([skill])
 * ```
 */
export const toggleFavoriteForDigitalSkills = createAsyncThunk('agentDirectory/toggleFavoriteForDigitalSkills', ({ skills, apiFailed, }, { dispatch, getState }) => __awaiter(void 0, void 0, void 0, function* () {
    var _q, _r, _s;
    const { agentDirectory } = getState();
    const skillIdsToToggle = skills.map((skillInstance) => skillInstance.skillId);
    if (agentDirectory.query.dropDown === DirectoryDropdownValues.SkillList ||
        agentDirectory.query.dropDown === DirectoryDropdownValues.All) {
        const updatedSkills = agentDirectory.digitalSkills.map((skill) => (Object.assign({}, skill)));
        skills.forEach((skillInfo) => {
            const matchedAgentStateIndex = agentDirectory.digitalSkills.findIndex((currentSkillState) => Number(currentSkillState.skillId) === Number(skillInfo.skillId));
            if (matchedAgentStateIndex >= 0) {
                if (matchedAgentStateIndex >= 0) {
                    updatedSkills[matchedAgentStateIndex].isFavorite = !updatedSkills[matchedAgentStateIndex].isFavorite;
                }
            }
        });
        dispatch(agentDirectoryActions.updateFavInDigitalSkillsList(updatedSkills));
    }
    if (agentDirectory.query.dropDown === DirectoryDropdownValues.FavoriteList) {
        const currFavDigitalSkillsList = (_r = (_q = agentDirectory.favoriteDigitalSkills) === null || _q === void 0 ? void 0 : _q.filter((skillInstance) => !skillIdsToToggle.includes(skillInstance === null || skillInstance === void 0 ? void 0 : skillInstance.skillId))) !== null && _r !== void 0 ? _r : [];
        dispatch(agentDirectoryActions.updateFavDigitalSkillsList(currFavDigitalSkillsList));
    }
    cxoneClient.directory.toggleFavoriteForDigitalSkill(skills);
    const db = yield dbInstance();
    const currentSkillList = (yield (db === null || db === void 0 ? void 0 : db.get(IndexDBStoreNames.DIRECTORY, DirectoryEntities.SKILL_LIST))) || [];
    const favDigitalSkillsDB = (currentSkillList === null || currentSkillList === void 0 ? void 0 : currentSkillList.filter((skill) => skill === null || skill === void 0 ? void 0 : skill.isFavorite).map((skill) => Number(skill === null || skill === void 0 ? void 0 : skill.skillId))) || [];
    const favDigitalSkillIds = updatedFavoriteIds(favDigitalSkillsDB, skillIdsToToggle) || [];
    const updatedSkills = Array.from(new Set([...favDigitalSkillIds]));
    dispatch(agentDirectoryActions.syncingStoreWithFavs({ skills: updatedSkills }));
    // in case client data api has not failed and error is not handled proceed with below code
    if (!apiFailed && !((_s = favToggledDirectoryItem === null || favToggledDirectoryItem === void 0 ? void 0 : favToggledDirectoryItem.skill) === null || _s === void 0 ? void 0 : _s.errorHandled)) {
        dispatch(agentDirectoryActions.clientDataApiFailed({ storageExceeded: false, apiFailed: false }));
        const favIdToggled = (agentDirectory === null || agentDirectory === void 0 ? void 0 : agentDirectory.favoriteIdsToggled) || {};
        const favSkillIdToggled = updateToggledIds(favIdToggled === null || favIdToggled === void 0 ? void 0 : favIdToggled.digitalSkills, skillIdsToToggle);
        const idToggled = (agentDirectory === null || agentDirectory === void 0 ? void 0 : agentDirectory.favoriteIdsToggled) || {};
        const updatedIdToggled = Object.assign(Object.assign({}, idToggled), { digitalSkills: favSkillIdToggled });
        dispatch(agentDirectoryActions.updateFavoriteIdsToggled(updatedIdToggled));
        // added both digital and ACD skill
        queueFavoriteUpdate(Array.from(new Set([...favDigitalSkillIds])), dispatch, DirectoryItemType.DigitalSkill);
    }
}));
/**
 * Used to toggle favorite standard address book entries in Index DB through SDK
 * @param addressBooksEntries - array of address book entries to toggle favorite status
 * @param apiFailed - boolean to indicate if client data API call failed
 * @example -
 * ```
 * toggleFavoriteStandardAdrsBook({ addressBooksEntries: [entries] })
 * ```
 */
export const toggleFavoriteStandardAdrsBook = createAsyncThunk('agentDirectory/toggleFavoriteStandardAdrsBook', ({ addressBooksEntries, apiFailed, }, { dispatch, getState }) => __awaiter(void 0, void 0, void 0, function* () {
    var _t, _u, _v, _w, _x;
    const { agentDirectory } = getState();
    const entryIdsToToggle = addressBooksEntries === null || addressBooksEntries === void 0 ? void 0 : addressBooksEntries.map(entry => entry === null || entry === void 0 ? void 0 : entry.addressBookEntryId);
    const updatedEntries = (_u = (_t = agentDirectory === null || agentDirectory === void 0 ? void 0 : agentDirectory.standardBookEntriesResponse) === null || _t === void 0 ? void 0 : _t.addressBooksEntries) === null || _u === void 0 ? void 0 : _u.map(entry => (Object.assign({}, entry)));
    addressBooksEntries.forEach((entryInfo) => {
        var _a, _b, _c;
        const matchedIndex = (_b = (_a = agentDirectory === null || agentDirectory === void 0 ? void 0 : agentDirectory.standardBookEntriesResponse) === null || _a === void 0 ? void 0 : _a.addressBooksEntries) === null || _b === void 0 ? void 0 : _b.findIndex((currentEntry) => (currentEntry === null || currentEntry === void 0 ? void 0 : currentEntry.addressBookEntryId) === (entryInfo === null || entryInfo === void 0 ? void 0 : entryInfo.addressBookEntryId));
        if (matchedIndex >= 0) {
            updatedEntries[matchedIndex].isFavorite = !((_c = updatedEntries[matchedIndex]) === null || _c === void 0 ? void 0 : _c.isFavorite);
        }
    });
    dispatch(agentDirectoryActions.updateFavInStandardAddressBookEntries(updatedEntries));
    // Handle FavoriteList dropdown for favorite address book list
    if (agentDirectory.query.dropDown === DirectoryDropdownValues.FavoriteList) {
        const currFavEntries = (_w = (_v = agentDirectory.favoriteStandardAddressBooks) === null || _v === void 0 ? void 0 : _v.filter((entryInstance) => !entryIdsToToggle.includes(entryInstance === null || entryInstance === void 0 ? void 0 : entryInstance.addressBookEntryId))) !== null && _w !== void 0 ? _w : [];
        dispatch(agentDirectoryActions.updateFavAddressBookList(currFavEntries));
    }
    // Call SDK to update favorite for standard address book entries
    cxoneClient.directory.toggleFavoriteForStandardAddressBookEntries(addressBooksEntries);
    // Update IndexedDB
    const db = yield dbInstance();
    const currentAddressBookList = (yield (db === null || db === void 0 ? void 0 : db.get(IndexDBStoreNames.DIRECTORY, DirectoryEntities.ADDRESS_BOOK_LIST))) || [];
    const favStdAdrsBookIdsDB = currentAddressBookList
        .flatMap(book => book.addressBooksEntries || [])
        .filter(entry => entry.isFavorite)
        .map(entry => entry.addressBookEntryId);
    const favStandardAdrsBookIds = updatedFavoriteIds(favStdAdrsBookIdsDB, entryIdsToToggle);
    // Sync store with favorites stored in IDB
    dispatch(agentDirectoryActions.syncingStoreWithFavs({ standardAdrsBook: favStandardAdrsBookIds }));
    // in case client data api has not failed and error is not handled proceed with below code
    if (!apiFailed && !((_x = favToggledDirectoryItem === null || favToggledDirectoryItem === void 0 ? void 0 : favToggledDirectoryItem.addressbook) === null || _x === void 0 ? void 0 : _x.errorHandled)) {
        dispatch(agentDirectoryActions.clientDataApiFailed({ storageExceeded: false, apiFailed: false }));
        const favIdToggled = (agentDirectory === null || agentDirectory === void 0 ? void 0 : agentDirectory.favoriteIdsToggled) || {};
        const favStdAdrsBookIdToggled = (favIdToggled === null || favIdToggled === void 0 ? void 0 : favIdToggled.standardAdrsBook) && [...favIdToggled.standardAdrsBook] || [];
        entryIdsToToggle.forEach((entryId) => {
            const index = favStdAdrsBookIdToggled.indexOf(entryId);
            if (index > -1) {
                favStdAdrsBookIdToggled.splice(index, 1);
            }
            else {
                favStdAdrsBookIdToggled.push(entryId);
            }
        });
        const updatedIdToggled = Object.assign(Object.assign({}, favIdToggled), { standardAdrsBook: favStdAdrsBookIdToggled });
        dispatch(agentDirectoryActions.updateFavoriteIdsToggled(updatedIdToggled));
        queueFavoriteUpdate(favStandardAdrsBookIds, dispatch, DirectoryItemType.Addressbook);
    }
}));
/** Used to toggle favorite agent in Index DB through SDK
 * @example -
 * ```
 * toggleFavoriteForExtDirectoryEntries([teams])
 * ```
 */
export const toggleFavoriteForExtDirectoryEntries = createAsyncThunk('agentDirectory/toggleFavoriteForExtDirectoryEntries', ({ extDirectoryEntries, apiFailed, }, { dispatch, getState }) => __awaiter(void 0, void 0, void 0, function* () {
    var _y, _z, _0, _1;
    const { agentDirectory } = getState();
    const extDirectoryEntriesIdsToToggle = extDirectoryEntries.map((directoryEntriesInstance) => directoryEntriesInstance.userMappingId);
    const updatedDirectoryEntries = agentDirectory === null || agentDirectory === void 0 ? void 0 : agentDirectory.directoryEntries.map((directoryEntry) => (Object.assign({}, directoryEntry)));
    extDirectoryEntries.forEach((directoryEntriesInfo) => {
        var _a;
        const matchedTeamStateIndex = agentDirectory.directoryEntries.findIndex((currentExtDirectoryEntryState) => currentExtDirectoryEntryState.userMappingId === directoryEntriesInfo.userMappingId);
        if (matchedTeamStateIndex >= 0) {
            updatedDirectoryEntries[matchedTeamStateIndex].isFavorite = !((_a = updatedDirectoryEntries[matchedTeamStateIndex]) === null || _a === void 0 ? void 0 : _a.isFavorite);
        }
    });
    dispatch(agentDirectoryActions.updateFavInExtDirectoryEntries(updatedDirectoryEntries));
    if (agentDirectory.query.dropDown === DirectoryDropdownValues.FavoriteList) {
        const currFavExtDirectoryEntriesList = (_z = (_y = agentDirectory === null || agentDirectory === void 0 ? void 0 : agentDirectory.favoriteExtDirectoryEntries) === null || _y === void 0 ? void 0 : _y.filter((extDirectoryEntriesInstance) => !(extDirectoryEntriesIdsToToggle === null || extDirectoryEntriesIdsToToggle === void 0 ? void 0 : extDirectoryEntriesIdsToToggle.includes(extDirectoryEntriesInstance === null || extDirectoryEntriesInstance === void 0 ? void 0 : extDirectoryEntriesInstance.userMappingId)))) !== null && _z !== void 0 ? _z : [];
        dispatch(agentDirectoryActions.updateFavExtDirectoryEntriesList(currFavExtDirectoryEntriesList));
    }
    const db = yield dbInstance();
    const favExtDirectoryEntriesIdsDB = (yield (db === null || db === void 0 ? void 0 : db.get(IndexDBStoreNames.DIRECTORY, IndexDBKeyNames.FAVORITE_EXT_DIR_ENTRIES))) || [];
    const favExtDirEntries = (favExtDirectoryEntriesIdsDB === null || favExtDirectoryEntriesIdsDB === void 0 ? void 0 : favExtDirectoryEntriesIdsDB.map(extDirectoryEntry => extDirectoryEntry === null || extDirectoryEntry === void 0 ? void 0 : extDirectoryEntry.userMappingId)) || [];
    const favExtDirectoryEntriesIds = updatedFavoriteIds(favExtDirEntries, extDirectoryEntriesIdsToToggle);
    const favExtDirectoryEntries = [];
    (_0 = agentDirectory === null || agentDirectory === void 0 ? void 0 : agentDirectory.directoryEntries) === null || _0 === void 0 ? void 0 : _0.forEach((directoryEntry) => {
        if ((directoryEntry === null || directoryEntry === void 0 ? void 0 : directoryEntry.userMappingId) && (favExtDirectoryEntriesIds === null || favExtDirectoryEntriesIds === void 0 ? void 0 : favExtDirectoryEntriesIds.includes(directoryEntry === null || directoryEntry === void 0 ? void 0 : directoryEntry.userMappingId))) {
            favExtDirectoryEntries.push(directoryEntry);
        }
    });
    cxoneClient.directory.toggleFavoriteForExternalDirectories(extDirectoryEntries);
    dispatch(agentDirectoryActions.syncingStoreWithFavs({ extDirectoryEntries: favExtDirectoryEntriesIds }));
    // in case client data api has not failed and error is not handled proceed with below code
    if (!apiFailed && !((_1 = favToggledDirectoryItem === null || favToggledDirectoryItem === void 0 ? void 0 : favToggledDirectoryItem.extDirectoryEntries) === null || _1 === void 0 ? void 0 : _1.errorHandled)) {
        dispatch(agentDirectoryActions.clientDataApiFailed({ storageExceeded: false, apiFailed: false }));
        const favIdToggled = (agentDirectory === null || agentDirectory === void 0 ? void 0 : agentDirectory.favoriteIdsToggled) || {};
        const favExtDirectoryEntriesIdToggled = (favIdToggled === null || favIdToggled === void 0 ? void 0 : favIdToggled.extDirectoryEntries) && [...favIdToggled.extDirectoryEntries] || [];
        extDirectoryEntriesIdsToToggle.forEach((userMappingId) => {
            const index = favExtDirectoryEntriesIdToggled === null || favExtDirectoryEntriesIdToggled === void 0 ? void 0 : favExtDirectoryEntriesIdToggled.indexOf(userMappingId);
            if (index > -1) {
                favExtDirectoryEntriesIdToggled === null || favExtDirectoryEntriesIdToggled === void 0 ? void 0 : favExtDirectoryEntriesIdToggled.splice(index, 1);
            }
            else {
                favExtDirectoryEntriesIdToggled === null || favExtDirectoryEntriesIdToggled === void 0 ? void 0 : favExtDirectoryEntriesIdToggled.push(userMappingId);
            }
        });
        const updatedIdToggled = Object.assign(Object.assign({}, favIdToggled), { extDirectoryEntries: favExtDirectoryEntriesIdToggled });
        dispatch(agentDirectoryActions.updateFavoriteIdsToggled(updatedIdToggled));
        queueFavoriteUpdate(favExtDirectoryEntriesIds, dispatch, DirectoryItemType.ExtDirectoryEntries);
    }
}));
/** Used to check if extrnal directory enabled.
 * for looged in user
 * @example -checkExtenalDirectoryEnabled();
 **/
export const checkExtenalDirectoryEnabled = createAsyncThunk('agentDirectory/checkExtenalDirectoryEnabled', (data, { dispatch, rejectWithValue }) => __awaiter(void 0, void 0, void 0, function* () {
    const isDirectoryEnabled = yield cxoneClient.cxoneTenant
        .checkDirectoryEnable()
        .catch((error) => {
        throw rejectWithValue(error);
    });
    if (isDirectoryEnabled) {
        dispatch(getDirectories(data));
    }
}));
/** Used to get  directory list
 * @example -getDirectoriesList();
 *
 */
export const getDirectories = createAsyncThunk('agentDirectory/getDirectories', (data, { rejectWithValue }) => __awaiter(void 0, void 0, void 0, function* () {
    const externalDirectories = yield cxoneClient.directory.dynamicDirectory
        .getDirectories(data.userId, data.startIndex, data.totalRecords)
        .catch((error) => {
        throw rejectWithValue(error);
    });
    return externalDirectories;
}));
/**
 * dialPhone asyncthunk used to call dial-phone api
 * @example - dialPhone()
 */
export const dialPhone = createAsyncThunk('agentDirectory/dialPhone', (contactDetails, { rejectWithValue }) => __awaiter(void 0, void 0, void 0, function* () {
    const cxoneAcdClient = CXoneAcdClient.instance;
    yield cxoneAcdClient.contactManager.voiceService
        .dialPhone(contactDetails)
        .catch((error) => {
        throw rejectWithValue(error);
    });
}));
/**
 * get Standard Address book
 * @example - standardBookNames()
 */
export const standardBookNames = createAsyncThunk('agentDirectory/standardBookNames', (agentId, { rejectWithValue }) => __awaiter(void 0, void 0, void 0, function* () {
    const cxoneClient = CXoneClient.instance;
    const standardAddressBooks = yield cxoneClient.directory.addressBookService.getAllAddressBooks(agentId, false)
        .catch((error) => {
        throw rejectWithValue(error);
    });
    return standardAddressBooks;
}));
/**
 * get Standard Address book entries
 * @example - standardBook Entries
 */
export const standardBookEntries = createAsyncThunk('agentDirectory/standardBookEntries', (data, { rejectWithValue }) => __awaiter(void 0, void 0, void 0, function* () {
    const cxoneClient = CXoneClient.instance;
    const standardAddressBookEntries = yield cxoneClient.directory.addressBookService
        .getStandardEntries(data.adressBookId, data.startIndex, data.recordsToLoad, data.searchText)
        .catch((error) => {
        throw rejectWithValue(error);
    });
    return standardAddressBookEntries;
}));
/**
 * get Standard Address book entries for all standardbooks for a email autocomplete search
 * @param addressBooks - AddressBooks[], used to make api call for every addressbook
 * @param skip - number starting index of the result array.
 * @param top - number max limit/ number of records that is needed.
 * @param searchString - string, the string used to search in db
 * @example - standardBookEntriesForAutoComplete(
      addressBooks: AddressBooks[];
      skip: number;
      top: number;
      searchText: string;)
 */
export const standardBookEntriesForAutoComplete = createAsyncThunk('agentDirectory/standardBookEntriesForAutoComplete', (data) => __awaiter(void 0, void 0, void 0, function* () {
    const cxoneClient = CXoneClient.instance;
    return yield cxoneClient.directory.getFilteredStandardBookEntries(data);
}));
/**
 * get all Skills List
 * @example - getAllSkills()
 */
export const getAllSkills = createAsyncThunk('agentDirectory/getAllSkills', () => __awaiter(void 0, void 0, void 0, function* () {
    const cxoneClient = CXoneDigitalClient.instance;
    const allSkillList = yield cxoneClient.skillService.getAllSkillsList();
    return allSkillList;
}));
export const directorySlice = createSlice({
    name: CCF_DIRECTORY_FEATURE_KEY,
    initialState: initialCcfDirectoryState,
    reducers: {
        /**
         * Function to set list of skills in state
         * @param state - AgentState
         * @param action  - PayloadAction<string>
         * @returns It returns current status of agent
         * @example -setSkillList(state,action)
         */
        updateSelectedDropdown(state, action) {
            return Object.assign(Object.assign({}, state), { query: Object.assign(Object.assign({}, state.query), { dropDown: action.payload }), drillDownToAgent: false, currentTeamId: '', noStandardEntriesAll: false });
        },
        /**
         * Function to set list of skills in state
         * @param state - AgentState
         * @param action  - PayloadAction<string>
         * @returns It updates the string value of the text field
         * @example -updateSearchBoxQuery(state,action)
         */
        updateSearchBoxQuery(state, action) {
            return Object.assign(Object.assign({}, state), { query: Object.assign(Object.assign({}, state.query), { searchBox: action.payload }), drillDownToAgent: false });
        },
        /**
         * Function to set list of skills in state
         * @param state - AgentState
         * @param action  - PayloadAction<number>
         * @returns It returns current status of agent
         * @example -updateSkillIdSelectedForInteraction(state,action)
         */
        updateSkillIdSelectedForInteraction(state, action) {
            return Object.assign(Object.assign({}, state), { skillIdSelectedForInteraction: action.payload });
        },
        /**
         * Function to set list of skills in state
         * @param state - AgentState
         * @param action  - PayloadAction<string>
         * @returns It returns current status of agent
         * @example -updateAgentList(state,action)
         */
        updateAgentList(state, action) {
            const previousState = state.agentContacts;
            const currentState = action.payload.agentList.data;
            if ((state.query.searchBox && state.query.offSetVal === 1) ||
                (state.emptySearchFlg &&
                    state.query.searchBox === '' &&
                    state.query.offSetVal === 1 &&
                    !state.isPollingStarted)) {
                state.agentContacts = currentState || [];
            }
            else {
                let combinedState = [];
                if (previousState === null || previousState === void 0 ? void 0 : previousState.length) {
                    combinedState = [...previousState];
                }
                if (currentState === null || currentState === void 0 ? void 0 : currentState.length) {
                    if (isFavoritesFTEnabled) {
                        combinedState = [...combinedState.filter(itemPrev => !currentState.some(itemCurr => itemCurr.agentId === itemPrev.agentId)), ...currentState];
                    }
                    else {
                        combinedState = [...combinedState, ...currentState.filter(item2 => !previousState.some(item1 => item1.agentId === item2.agentId))];
                    }
                }
                state.agentContacts = combinedState || [];
            }
            state.isAgentLoading = false;
            state.totalAgentCount = action.payload.agentList.allAgentCount || 0;
            state.totalAgentsSearchMatchRecords =
                action.payload.agentList.totalSearchMatchRecords || 0;
            state.noAgentDataFound = action.payload.agentList.errorMsg ? true : false;
            if ((state.query.dropDown === DirectoryDropdownValues.TeamList
                || (state.query.dropDown === DirectoryDropdownValues.FavoriteList && isFavoritesFTEnabled)) &&
                state.loadingAgentsForTeam &&
                state.currentTeamId) {
                state.drillDownToAgent = true;
                state.loadingAgentsForTeam = false;
                state.noTeamDataFound = action.payload.agentList.errorMsg ? true : false;
            }
            // This is added to allow polling only after inital search to load the data faster
            if ((!state.isPollingStarted || previousSearchedText !== state.query.searchBox) && state.query.dropDown !== DirectoryDropdownValues.FavoriteList &&
                cxoneClient.directory.getDirectoryData) {
                (() => {
                    previousSearchedText = state.query.searchBox;
                    const selectedDropdown = [];
                    switch (state.query.dropDown) {
                        case DirectoryDropdownValues.AgentList:
                            selectedDropdown.push(DirectoryEntities.AGENT_LIST);
                            break;
                        case DirectoryDropdownValues.TeamList:
                            selectedDropdown.push(DirectoryEntities.TEAM_LIST);
                            selectedDropdown.push(DirectoryEntities.AGENT_LIST);
                            break;
                        case DirectoryDropdownValues.SkillList:
                            selectedDropdown.push(DirectoryEntities.SKILL_LIST);
                            break;
                        default:
                            selectedDropdown.push(DirectoryEntities.AGENT_LIST);
                            selectedDropdown.push(DirectoryEntities.TEAM_LIST);
                            selectedDropdown.push(DirectoryEntities.SKILL_LIST);
                    }
                    const directoryDataParams = {
                        offset: state.query.offSetVal,
                        limit: state.query.dropDown === DirectoryDropdownValues.All
                            ? DirectorySearchRecord.AllDirectoryCount
                            : DirectorySearchRecord.DirectoryCount,
                        searchText: state.query.searchBox
                            ? state.query.searchBox.trim()
                            : '',
                        entity: selectedDropdown,
                        pollingOptions: { isPolling: true, pollingInterval: 5000 },
                        teamId: state.currentTeamId ? state.currentTeamId : '',
                    };
                    state.isPollingStarted = true;
                    if (mediaTypeId && mediaTypeId === MediaTypeId.Digital) {
                        directoryDataParams.mediaType = MediaTypeId.Digital;
                    }
                    return cxoneClient.directory.getDirectoryData(directoryDataParams);
                })();
            }
        },
        /**
         * Function to update fav in agentContacts list on runtime
         * @param state - AgentState
         * @param action  - PayloadAction<Agent>
         * @returns It returns current status of agent contacts
         * @example -updateFavInContactsList(state,action)
         */
        updateFavInContactsList(state, action) {
            const previousState = state.agentContacts;
            const currentState = action.payload;
            let combinedState = [];
            if (previousState === null || previousState === void 0 ? void 0 : previousState.length) {
                combinedState = [...previousState];
            }
            if (currentState === null || currentState === void 0 ? void 0 : currentState.length) {
                combinedState = [...combinedState.filter(itemPrev => !currentState.some(itemCurr => itemCurr.agentId === itemPrev.agentId)), ...currentState];
                state.agentContacts = combinedState || [];
            }
        },
        /**
         * Function to update fav agent list on runtime
         * @param state - Directory State
         * @param action  - PayloadAction`<Agent[]>`
         * @returns It returns updated fav agent list
         * @example -updateFavAgentList(state,action)
         */
        updateFavAgentList(state, action) {
            state.favoriteAgents = action.payload;
        },
        /**
         * Function to update fav skills list on runtime
         * @param state - Directory State
         * @param action  - PayloadAction`<SkillActivityEvent[]>`
         * @returns It returns updated fav skills list
         * @example -updateFavSkillsList(state,action)
         */
        updateFavSkillsList(state, action) {
            state.favoriteSkills = action.payload;
        },
        /**
         * Function to update fav digital skills list on runtime
         * @param state - Directory State
         * @param action  - PayloadAction`<SkillEvent[]>`
         * @returns It returns updated fav digital skills list
         * @example -updateFavDigitalSkillsList(state,action)
         */
        updateFavDigitalSkillsList(state, action) {
            state.favoriteDigitalSkills = action.payload;
        },
        /**
         * Function to set list of skills in state
         * @param state - AgentState
         * @param action  - PayloadAction<any>
         * @returns It returns current status of agent
         * @example -setSkillList(state,action)
         */
        setSkillList(state, action) {
            var _a, _b;
            if (state.query.searchBox && state.query.offSetVal === 1) {
                state.skills = (_a = action.payload) === null || _a === void 0 ? void 0 : _a.skillActivityData;
            }
            else {
                let combinedState = [];
                if (state.skills.length) {
                    combinedState = [...state.skills];
                }
                if ((_b = action.payload.skillActivityData) === null || _b === void 0 ? void 0 : _b.length) {
                    combinedState = [
                        ...combinedState,
                        ...action.payload.skillActivityData
                            .filter(item2 => !state.skills.some(item1 => item1.skillId === item2.skillId))
                    ];
                }
                state.skills = combinedState;
            }
            state.totalSkillsSearchMatchRecords =
                action.payload.totalSearchResultCount || 0;
            state.noSkillDataFound =
                action.payload.totalSearchResultCount === 0 ? true : false;
            state.isSkillsLoading = false;
        },
        /**
         * Function to set list of entries in state
         * @param state - AgentState
         * @param action  - PayloadAction<any>
         * @returns It returns list of entries for selected external directory
         * @example -setExternalDirectoryEntries(state,action)
         */
        setExternalDirectoryEntries(state, action) {
            var _a, _b;
            const entryDataArr = [];
            (_b = (_a = action === null || action === void 0 ? void 0 : action.payload) === null || _a === void 0 ? void 0 : _a.directoryEntry) === null || _b === void 0 ? void 0 : _b.forEach((entry) => {
                const obj = {};
                obj.unifiedStatus = entry.unifiedStatus;
                entry.attributes.forEach((attr) => {
                    obj[attr.partnerType] = obj[attr.partnerType]
                        ? obj[attr.partnerType].concat(attr)
                        : [attr];
                    if (attr.fieldType === 'firstname' || attr.fieldType === 'lastname' || attr.fieldType === 'email') {
                        obj[attr.fieldType] = attr.value;
                    }
                    else if ((attr.fieldType === 'businessphone' ||
                        attr.fieldType === 'mobilephone' ||
                        attr.fieldType === 'email') &&
                        !(attr.value === '')) {
                        obj.showDrillDownBtn = true;
                    }
                });
                obj.userMappingId = entry.userMappingId;
                obj.isFavorite = (entry === null || entry === void 0 ? void 0 : entry.isFavorite) || false;
                entryDataArr.push(obj);
            });
            entryDataArr === null || entryDataArr === void 0 ? void 0 : entryDataArr.forEach((entry) => {
                if (entry.userMappingId === state.selectedDrillDownUserEntry.userMappingId) {
                    state.selectedDrillDownUserEntry = entry;
                }
            });
            if (externalDirectoryStartIndex === 0) {
                state.directoryEntries = entryDataArr;
            }
            else {
                const map = {};
                state.directoryEntries.forEach((item) => (map[item.userMappingId] = item));
                entryDataArr.forEach((item) => (map[item.userMappingId] = item));
                state.directoryEntries = Object.values(map);
            }
            state.externalDirectorySubscriptionId = action.payload.subscriptionID;
            state.isDirectoryEntriesLoading = false;
            state.totalExternalDirectoryRecordsCount =
                action.payload.totalRecords || 0;
        },
        /**
         * Function to set list of entries in state
         * @param state - AgentState
         * @param action  - PayloadAction<any>
         * @returns It returns list of entries for selected external directory
         * @example -updateFavsInExternalDirectoryEntries(state,action)
         */
        updateFavInExtDirectoryEntries(state, action) {
            const previousState = state.directoryEntries;
            const currentState = action.payload;
            let combinedState = [];
            if (previousState === null || previousState === void 0 ? void 0 : previousState.length) {
                combinedState = [...previousState];
            }
            if (currentState === null || currentState === void 0 ? void 0 : currentState.length) {
                combinedState = [...combinedState.filter(itemPrev => !currentState.some(itemCurr => itemCurr.userMappingId === itemPrev.userMappingId)), ...currentState];
                state.directoryEntries = combinedState || [];
            }
        },
        /**
        * Function to update fav team list on runtime
        * @param state - Directory State
        * @param action  - PayloadAction`<Team[]>`
        * @returns It returns updated fav team list
        * ```
        * @example -updateFavExtDirectoryEntriesList(state,action)
        * ```
        */
        updateFavExtDirectoryEntriesList(state, action) {
            state.favoriteExtDirectoryEntries = action.payload;
        },
        /**
         * Function to set list of entries in state
         * @param state - AgentState
         * @param action  - PayloadAction<any>
         * @returns It returns list of entries for selected external directory
         * @example -updateSelecteDrillDownEntry(state,action)
         */
        updateSelectedDrillDownEntry(state, action) {
            return Object.assign(Object.assign({}, state), { selectedDrillDownUserEntry: action.payload });
        },
        /**
         * Function to set flag for multi skills in state
         * @param state - externalDirectoryState
         * @param action  - PayloadAction<any>
         * @example -updateExternalDirectoryState(state,action)
         */
        updateExternalDirectoryState(state, action) {
            state.externalDirectoryState = action.payload;
        },
        /**
         * Function to fetch skill list from state when subscription is already in progress
         * @param state - AgentState
         * @param value- value of dropdown
         * @returns It returns current status of directory
         * @example -backToTeamList(state,action)
         */
        backToTeamList(state) {
            return Object.assign(Object.assign({}, state), { isTeamsLoading: false, isAgentLoading: false, query: {
                    offSetVal: 25,
                    searchBox: '',
                    dropDown: DirectoryEntities.TEAM_LIST,
                }, drillDownToAgent: false, emptySearchFlg: false, currentTeamId: '' });
        },
        /**
         * Function is used on click of back btn of address book details
         * @param state - Directory State
         * @returns It returns current status of directory
         * @example -backToAddressList(state,action)
         */
        backToAddressList(state) {
            return Object.assign({}, state);
        },
        /**
         * Function to set the drill down flag false and reset teamID
         * @param state - AgentState
         * @param value- value of dropdown
         * @returns It returns current status of directory
         * @example -updateDrillDownToAgentFlag(state,action)
         */
        updateDrillDownToAgentFlag(state, action) {
            return Object.assign(Object.assign({}, state), { drillDownToAgent: action.payload, currentTeamId: '' });
        },
        /**
         * Function to set list of skills in state
         * @param state - AgentState
         * @param action  - PayloadAction<string>
         * @returns It returns current status of agent
         * @example -updateTeamList(state,action)
         */
        updateTeamList(state, action) {
            var _a, _b, _c, _d, _e, _f, _g;
            if (state.query.searchBox && state.query.offSetVal === 1) {
                state.teams = action.payload
                    ? action.payload.teamList.data
                    : [];
            }
            else {
                let combinedState = [];
                if ((_a = state.teams) === null || _a === void 0 ? void 0 : _a.length) {
                    combinedState = [...state.teams];
                }
                if ((_c = (_b = action.payload.teamList) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.length) {
                    if (isFavoritesFTEnabled) {
                        combinedState = [...combinedState.filter(itemPrev => !action.payload.teamList.data.some(itemCurr => itemCurr.teamId === itemPrev.teamId)), ...action.payload.teamList.data];
                    }
                    else {
                        combinedState = [...combinedState, ...action.payload.teamList.data.filter(item2 => !state.teams.some(item1 => item1.teamId === item2.teamId))];
                    }
                }
                if (state.query.searchBox === '' && state.query.offSetVal === 1 && ((_e = (_d = action.payload) === null || _d === void 0 ? void 0 : _d.teamList) === null || _e === void 0 ? void 0 : _e.data.length) > 0) {
                    state.teams = (_g = (_f = action.payload) === null || _f === void 0 ? void 0 : _f.teamList) === null || _g === void 0 ? void 0 : _g.data;
                }
                else {
                    state.teams = combinedState;
                }
            }
            state.totalTeamsSearchMatchRecords =
                action.payload.teamList.totalSearchMatchRecords || 0;
            state.noTeamDataFound = action.payload.teamList.errorMsg ? true : false;
            state.totalTeamCount = action.payload.teamList.allTeamCount || 0;
            state.isTeamsLoading = false;
        },
        /**
         * Function to update fav in team list on runtime
         * @param state - AgentState
         * @param action  - PayloadAction<Team>
         * @returns It returns current status of teams
         * ```
         * @example -updateFavInTeamsList(state,action)
         * ```
         */
        updateFavInTeamsList(state, action) {
            const previousState = state.teams;
            const currentState = action.payload;
            let combinedState = [];
            if (previousState === null || previousState === void 0 ? void 0 : previousState.length) {
                combinedState = [...previousState];
            }
            if (currentState === null || currentState === void 0 ? void 0 : currentState.length) {
                combinedState = [...combinedState.filter(itemPrev => !currentState.some(itemCurr => itemCurr.teamId === itemPrev.teamId)), ...currentState];
                state.teams = combinedState || [];
            }
        },
        /**
         * Function to update fav in agentContacts list on runtime
         * @param state - AgentState
         * @param action  - PayloadAction<Agent>
         * @returns It returns current status of agent contacts
         * @example -updateFavInContactsList(state,action)
         */
        updateFavInSkillsList(state, action) {
            const previousState = state.skills;
            const currentState = action.payload;
            let combinedState = [];
            if (previousState === null || previousState === void 0 ? void 0 : previousState.length) {
                combinedState = [...previousState];
            }
            if (currentState === null || currentState === void 0 ? void 0 : currentState.length) {
                combinedState = [...combinedState.filter(itemPrev => !currentState.some(itemCurr => itemCurr.skillId === itemPrev.skillId)), ...currentState];
                state.skills = combinedState || [];
            }
        },
        /**
         * Function to update fav in agentContacts list on runtime
         * @param state - AgentState
         * @param action  - PayloadAction<Agent>
         * @returns It returns current status of agent contacts
         * @example -updateFavInContactsList(state,action)
         */
        updateFavInDigitalSkillsList(state, action) {
            const previousState = state.digitalSkills;
            const currentState = action.payload;
            let combinedState = [];
            if (previousState === null || previousState === void 0 ? void 0 : previousState.length) {
                combinedState = [...previousState];
            }
            if (currentState === null || currentState === void 0 ? void 0 : currentState.length) {
                combinedState = [...combinedState.filter(itemPrev => !currentState.some(itemCurr => itemCurr.skillId === itemPrev.skillId)), ...currentState];
                state.digitalSkills = combinedState || [];
            }
        },
        /**
         * Function to update fav team list on runtime
         * @param state - Directory State
         * @param action  - PayloadAction`<Team[]>`
         * @returns It returns updated fav team list
         * ```
         * @example -updateFavTeamList(state,action)
         * ```
         */
        updateFavTeamList(state, action) {
            state.favoriteTeams = action.payload;
        },
        /**
         * Function to update fav in standard address book entries list on runtime
         * @param state - Directory State
         * @param action  - PayloadAction`<AddressBooksEntries[]>`
         * @returns It returns current status of standard address book entries
         * @example - updateFavInStandardAddressBookEntries(state, action)
         */
        updateFavInStandardAddressBookEntries(state, action) {
            var _a;
            const previousState = ((_a = state.standardBookEntriesResponse) === null || _a === void 0 ? void 0 : _a.addressBooksEntries) || [];
            const currentState = action.payload;
            let combinedState = [];
            if (previousState === null || previousState === void 0 ? void 0 : previousState.length) {
                combinedState = [...previousState];
            }
            if (currentState === null || currentState === void 0 ? void 0 : currentState.length) {
                combinedState = [
                    ...combinedState.filter(itemPrev => !currentState.some(itemCurr => itemCurr.addressBookEntryId === itemPrev.addressBookEntryId)),
                    ...currentState
                ];
                state.standardBookEntriesResponse.addressBooksEntries = combinedState || [];
            }
        },
        /**
        * Updates the favorite list for standard address book entries.
        * @param state - Directory State
        * @param action - PayloadAction`<AddressBooksEntries[]>`
        * @returns It returns updated fav addressbook list
        * ```
        * @example - updateFavoriteListForStandardAddressBook(state, action)
        * ```
        */
        updateFavoriteListForStandardAddressBook(state, action) {
            const currentState = action.payload;
            const favoriteEntries = currentState === null || currentState === void 0 ? void 0 : currentState.filter(entry => entry.isFavorite);
            state.standardBookEntriesResponse.addressBooksEntries = favoriteEntries || [];
        },
        /**
        * Function to update the favorite address book list on runtime.
        * @param state - Directory State
        * @param action - PayloadAction`<AddressBooks[]>`
        * @returns It returns updated fav addressbooks
        * ```
        * @example - updateFavAddressBookList(state, action)
        * ```
        */
        updateFavAddressBookList(state, action) {
            state.favoriteStandardAddressBooks = action.payload;
        },
        /**
         * Function to set list of digital skills in state
         * @param state - AgentState
         * @param action  - PayloadAction<DirectoryResponse>
         * @example - updateDigitalSkillList(state,action)
         */
        updateDigitalSkillList(state, action) {
            if (state.query.searchBox && state.query.offSetVal === 1) {
                state.digitalSkills = action.payload
                    ? action.payload.skillList.data
                    : [];
            }
            else {
                let combinedState = [];
                if (state.digitalSkills.length) {
                    combinedState = [...state.digitalSkills];
                }
                if (action.payload.skillList.data.length) {
                    combinedState = [...combinedState, ...action.payload.skillList.data.filter(item2 => !state.digitalSkills.some(item1 => item1.skillId === item2.skillId))];
                }
                state.digitalSkills = combinedState;
            }
            state.totalDigitalSkillsSearchMatchRecords =
                action.payload.skillList.totalSearchMatchRecords || 0;
            state.isSkillsLoading = false;
            state.totalSkillCount = action.payload.skillList.allSkillCount || 0;
        },
        /**
         * Function to set flag for multi skills in state
         * @param state - AgentState
         * @param action  - PayloadAction<any>
         * @example -updateAgentMultiSkillFlag(state,action)
         */
        updateAgentMultiSkillFlag(state, action) {
            state.agentHasMultipleSkills.agentHasMultipleSkillsFlg = action.payload;
        },
        /**
         * Function to set flag for multi skills in state
         * @param state - AgentState
         * @param action  - PayloadAction<any>
         * @example -updateAgentMultiSkillFlag(state,action)
         */
        hideExternalDirectoryData(state, action) {
            state.hideExternalDirectoryData = action.payload;
        },
        /**
         * Function to set flag for multi skills in state
         * @param state - AgentState
         * @param action  - PayloadAction<any>
         * @example -updateAgentMultiSkillFlag(state,action)
         */
        flushAllData(state) {
            state.agentContacts = [];
            state.teams = [];
            state.skills = [];
            state.directoryEntries = [];
            state.digitalSkills = [];
            state.standardBookEntriesResponse = {};
            state.noStandardEntriesAll = false;
        },
        /**
         * Function to set flag for multi skills in state
         * @param state - AgentState
         * @param action  - PayloadAction<any>
         * @example -updateAgentMultiSkillFlag(state,action)
         */
        flushAllDataExceptTeams(state) {
            state.agentContacts = [];
            state.skills = [];
            state.directoryEntries = [];
            state.digitalSkills = [];
            state.standardBookEntriesResponse = {};
            state.noStandardEntriesAll = false;
        },
        /**
         * Function to clear data for agentContacts/agentList
         * @param state - AgentState
         * @param action  - PayloadAction<any>
         * @example -flushDataForAgentDrilldown(state)
         */
        flushDataForAgentDrilldown(state) {
            state.agentContacts = [];
        },
        /**
         * Function to update searchText in state
         * @param state - AgentState
         * @param action  - PayloadAction<any>
         * @example - updateSearchBoxValue(state,action)
         */
        updateSearchBoxValue(state, action) {
            state.query.searchBox = action.payload;
        },
        /**
         * Function to activate empty search by updating emptySearchFlg in state
         * @param state - AgentState
         * @param action  - PayloadAction<any>
         * @example - updateEmptySearchState(state,action)
         */
        updateEmptySearchState(state, action) {
            state.emptySearchFlg = action.payload;
        },
        /**
         * Function to update toggle for outbound call options
         * @param state - AgentState
         * @param action  - PayloadAction<boolean>
         * @example - updateSkillSelectorToggle(state,action)
         */
        updateSkillSelectorToggle(state, action) {
            const idx = state.toggleSkillSelector.findIndex((item) => action.payload.triggerType === item.triggerType);
            if (idx >= 0) {
                state.toggleSkillSelector[idx].triggerState =
                    action.payload.triggerState;
            }
            else {
                state.toggleSkillSelector.push(action.payload);
            }
        },
        /**
         * Function to update all toggle states for outbound call options
         * @param state - AgentState
         * @param action  - PayloadAction<boolean>
         * @example - updateAllToggleStates(state,action)
         */
        updateAllToggleStates(state, action) {
            const idx = state.toggleSkillSelector.findIndex((item) => action.payload.triggerType === item.triggerType);
            state.toggleSkillSelector.map(item => item.triggerState = false);
            if (idx >= 0) {
                state.toggleSkillSelector[idx].triggerState =
                    action.payload.triggerState;
            }
            else {
                state.toggleSkillSelector.push(action.payload);
            }
        },
        /**
         * Function to set the External Directory drill down flag
         * @param state - DirectoryState
         * @param action  - PayloadAction<boolean>
         * @returns set the value of External Directory drill down flag
         * @example -setExternalDirectoryDrillDown(state,action)
         */
        setExternalDirectoryDrillDown(state, action) {
            state.externalDirectoryDrillDown = action.payload;
        },
        /** Used to search in the directory list
         * @example -searchDirectories();
         *
         */
        searchDirectories(state, action) {
            const searchReq = {
                subscriptionId: action.payload.subscriptionId,
                searchString: action.payload.searchText,
                realTimeUpdates: action.payload.realTimeUpdates,
                skip: action.payload.offset,
                top: action.payload.limit,
                directoryUUID: action.payload.directoryUid,
            };
            cxoneClient.directory.dynamicDirectory.searchDirectories(searchReq);
            state.isDirectoryEntriesLoading = true;
            externalDirectoryStartIndex = action.payload.offset;
        },
        /**
         * Method to set the focus in directory when it is dispatched
         * @param state - DirectoryState
         * @example - dispatch(setFocusInDirectory));
         * @returns
         */
        setFocusInDirectory(state, action) {
            return Object.assign(Object.assign({}, state), { directoryFocus: action.payload });
        },
        /**
         * Method to check if directory is mounted
         * @param state - DirectoryState
         * @example - dispatch(setDirectoryRendered(true));
         * @returns
         */
        setDirectoryRendered(state, action) {
            return Object.assign(Object.assign({}, state), { directoryRendered: action.payload });
        },
        /**
        *Method to update the flag whether its a full view directory view or integrated
        @param state - DirectoryState
        @example - dispatch(updateIsFullViewFlg)
        @returns
        **/
        updateIsFullViewFlg(state, action) {
            return Object.assign(Object.assign({}, state), { isFullViewDirectory: action.payload });
        },
        /**
         * Function to set flag to display details for SAB
         * @param state - displayStandardAddressDetails
         * @param action  - PayloadAction<number>
         * @example -displayStandardAddressDetails(state,action)
         */
        displayStandardAddressDetails(state, action) {
            state.displayStandardAddressDetails.addressBookEntryId = action.payload.addressBookEntryId;
            state.displayStandardAddressDetails.displayDetails = action.payload.isVisible;
        },
        /**
         * Function use to maintain the flag for all section when no data returned.
         * @param state - standardEntriesCountForAll
         * @param action  - PayloadAction<boolean>
         * @example -standardEntriesCountForAll(state,action)
         */
        standardEntriesCountForAll(state, action) {
            state.noStandardEntriesAll = action.payload;
        },
        /**
         * Function used to get All Standard Address book Entries
         * @param state - updateStandardAddressBookEntries
         * @param action - Address Book Response from middleware
         * @example - updateStandardAddressBookEntries(state,action)
         */
        updateStandardAddressBookEntries(state, action) {
            var _a;
            if (action.payload.addressBookList) {
                if (state.query.searchBox && state.query.offSetVal === 1) {
                    state.standardBookEntriesResponse.addressBooksEntries = action.payload.addressBookList.allAddressBookEntries;
                }
                else {
                    let newState = [];
                    if ((_a = action.payload.addressBookList.allAddressBookEntries) === null || _a === void 0 ? void 0 : _a.length) {
                        newState = action.payload.addressBookList.allAddressBookEntries.filter((newItem) => {
                            var _a;
                            return !((_a = state.standardBookEntriesResponse.addressBooksEntries) === null || _a === void 0 ? void 0 : _a.some((oldItem) => oldItem.addressBookEntryId === newItem.addressBookEntryId));
                        });
                    }
                    state.standardBookEntriesResponse.addressBooksEntries = [...state.standardBookEntriesResponse.addressBooksEntries || [], ...newState];
                }
                state.isAddressBookDataLoading = false;
                state.totalAddressBookSearchMatchRecords = action.payload.addressBookList.totalSearchMatchRecords || 0;
                state.allAddressBookCount = action.payload.addressBookList.allAddressBookCount;
            }
        },
        /**
         * Method used to set state for address book loading for all section
         * @param state - DirectoryState
         * @example - dispatch(isAddressBookLoading));
         * @returns
         */
        isAddressBookLoading(state, action) {
            return Object.assign(Object.assign({}, state), { isAddressBookDataLoading: action.payload });
        },
        /**
         * Method used to set error toast for client data API failure
         * @param state - DirectoryState
         * @example -
         * ```
         * dispatch(clientDataApiFailed(false)));
         * ```
         * @returns
         */
        clientDataApiFailed(state, action) {
            return Object.assign(Object.assign({}, state), { showClientDataApiFailedToast: Object.assign(Object.assign({}, state === null || state === void 0 ? void 0 : state.showClientDataApiFailedToast), action.payload) });
        },
        /**
         * Method used to set favorite team ids present in DB to store
         * @param state - DirectoryState
         * @param action - payload with an object containing the favorite IDs stored in DB
         * @example -
         * ```
         * dispatch(currentFavsTeamIdInDB([])));
         * ```
         * @returns
         */
        syncingStoreWithFavs(state, action) {
            return Object.assign(Object.assign({}, state), { favoritesInDirectory: Object.assign(Object.assign({}, state.favoritesInDirectory), action.payload) });
        },
        /**
         * Method used to set favorite ids toggled in the directory
         * @param state - DirectoryState
         * @param action - payload with an object containing the favorite IDs toggled in the directory for a particular directory item.
         * @example -
         * ```
         * dispatch(updateFavoriteIdsToggled({ agents: [1, 2], teams: [3], skills: [4] }));
         * ```
         */
        updateFavoriteIdsToggled(state, action) {
            return Object.assign(Object.assign({}, state), { favoriteIdsToggled: Object.assign({}, action.payload) });
        },
        /**
         * Method used to set toast reference
         * @param state - DirectoryState
         * @param action - payload with an object containing toast reference ID
         * @example -
         * ```
         * dispatch(updateFavsToastReference(Id));
         * ```
         */
        updateFavsToastReference(state, action) {
            state.storeFavsToastReference = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(startActivityPolling.pending, (state, action) => {
            return Object.assign(Object.assign({}, state), { isSkillsLoading: true, query: Object.assign(Object.assign({}, state.query), { searchBox: action.meta.arg.searchText
                        ? action.meta.arg.searchText
                        : '', offSetVal: action.meta.arg.offset }), skillPollingActive: true });
        })
            .addCase(startAgentTeamPolling.pending, (state, action) => {
            if (action.meta.arg.teamId &&
                state.query.dropDown === DirectoryDropdownValues.TeamList) {
                return Object.assign(Object.assign({}, state), { query: Object.assign(Object.assign({}, state.query), { searchBox: action.meta.arg.searchText, offSetVal: action.meta.arg.offset }), loadingAgentsForTeam: true, isTeamsLoading: false, currentTeamId: action.meta.arg.teamId, drillDownToAgent: false });
            }
            else if (action.meta.arg.teamId &&
                (state.query.dropDown === DirectoryDropdownValues.All
                    || (state.query.dropDown === DirectoryDropdownValues.FavoriteList && isFavoritesFTEnabled))) {
                return Object.assign(Object.assign({}, state), { isTeamsLoading: false, isAgentLoading: false, query: Object.assign(Object.assign({}, state.query), { searchBox: action.meta.arg.searchText, offSetVal: action.meta.arg.offset, dropDown: DirectoryEntities.TEAM_LIST }), drillDownToAgent: false, loadingAgentsForTeam: true, currentTeamId: action.meta.arg.teamId });
            }
            else {
                return Object.assign(Object.assign({}, state), { isTeamsLoading: action.meta.arg.selectedQueryValue ===
                        DirectoryDropdownValues.TeamList && !action.meta.arg.teamId
                        ? true
                        : false, isAgentLoading: action.meta.arg.selectedQueryValue ===
                        DirectoryDropdownValues.AgentList
                        ? true
                        : false, agentsPollingActive: false, teamsPollingActive: false, query: Object.assign(Object.assign({}, state.query), { searchBox: action.meta.arg.searchText
                            ? action.meta.arg.searchText
                            : '', offSetVal: action.meta.arg.offset }), isSkillsLoading: action.meta.arg.mediaTypeId &&
                        action.meta.arg.mediaTypeId === MediaTypeId.Digital
                        ? true
                        : false });
            }
        })
            .addCase(stopActivityPolling.fulfilled, (state) => {
            return Object.assign(Object.assign({}, state), { skillPollingActive: false });
        })
            .addCase(stopAgentTeamPolling.fulfilled, (state) => {
            return Object.assign(Object.assign({}, state), { agentsTeamPollingActive: false });
        })
            .addCase(stopEveryPolling.fulfilled, (state) => {
            return Object.assign(Object.assign({}, state), { agentsTeamPollingActive: false, skillPollingActive: false, isPollingStarted: false });
        })
            .addCase(getDirectories.fulfilled, (state, action) => {
            return Object.assign(Object.assign({}, state), { externalDirectories: action.payload });
        })
            .addCase(getAgentFavorites.pending, (state) => {
            state.isFavoriteAgentsLoading = true;
        })
            .addCase(getAgentFavorites.fulfilled, (state, action) => {
            state.favoriteAgents = action.payload;
            state.isFavoriteAgentsLoading = false;
        })
            .addCase(getTeamFavorites.pending, (state) => {
            state.isFavoriteTeamsLoading = true;
        })
            .addCase(getTeamFavorites.fulfilled, (state, action) => {
            state.favoriteTeams = action.payload;
            state.isFavoriteTeamsLoading = false;
        })
            .addCase(getDigitalSkillFavorites.pending, (state) => {
            state.isFavoriteDigitalSkillsLoading = true;
        })
            .addCase(getDigitalSkillFavorites.fulfilled, (state, action) => {
            state.favoriteDigitalSkills = action.payload;
            state.isFavoriteDigitalSkillsLoading = false;
        })
            .addCase(getAddressBookFavorites.pending, (state) => {
            state.isFavoriteStdAdrsBookLoading = true;
        })
            .addCase(getAddressBookFavorites.fulfilled, (state, action) => {
            state.favoriteStandardAddressBooks = action.payload;
            state.isFavoriteStdAdrsBookLoading = false;
        })
            .addCase(getSkillFavorites.pending, (state) => {
            state.isFavoriteSkillsLoading = true;
        })
            .addCase(getSkillFavorites.fulfilled, (state, action) => {
            state.favoriteSkills = action.payload;
            state.isFavoriteSkillsLoading = false;
        })
            .addCase(getExtDirectoryFavorites.pending, (state) => {
            state.isFavoriteExtDirectoryLoading = true;
        })
            .addCase(getExtDirectoryFavorites.fulfilled, (state, action) => {
            state.favoriteExtDirectoryEntries = action.payload;
            state.isFavoriteExtDirectoryLoading = false;
        })
            .addCase(standardBookNames.fulfilled, (state, action) => {
            state.standardAddressBooks = action.payload;
        })
            .addCase(standardBookEntries.pending, (state, action) => {
            return Object.assign(Object.assign({}, state), { isAddressBookDataLoading: true, noStandardEntriesAll: false, query: Object.assign(Object.assign({}, state.query), { searchBox: action.meta.arg.searchText
                        ? action.meta.arg.searchText
                        : '', offSetVal: action.meta.arg.startIndex }) });
        })
            .addCase(standardBookEntries.fulfilled, (state, action) => {
            var _a, _b, _c;
            if (state.query.offSetVal === 0) {
                state.standardBookEntriesResponse = action.payload;
                state.standardBookEntriesResponse.addressBooksEntries.forEach((item) => {
                    var _a;
                    item.addressBookName = (_a = action.payload) === null || _a === void 0 ? void 0 : _a.addressBookName;
                });
                // Compare the Addressbook from entries API with the favoriteStandardAddressBook fav list from IDB and update the isFavorite boolean in addressBooksEntries
                const favoriteIds = new Set((state.favoriteStandardAddressBooks || []).map(entry => entry.addressBookEntryId));
                state.standardBookEntriesResponse.addressBooksEntries.forEach(entry => {
                    entry.isFavorite = favoriteIds.has(entry.addressBookEntryId);
                });
            }
            else {
                const addressBookEntries = {};
                (_b = (_a = state.standardBookEntriesResponse) === null || _a === void 0 ? void 0 : _a.addressBooksEntries) === null || _b === void 0 ? void 0 : _b.forEach((item) => (addressBookEntries[item.addressBookEntryId] = item));
                action.payload.addressBooksEntries.forEach((item) => {
                    var _a;
                    item.addressBookName = (_a = action.payload) === null || _a === void 0 ? void 0 : _a.addressBookName;
                    // update the isFavorite boolean in addressBooksEntries
                    const favoriteIds = new Set((state.favoriteStandardAddressBooks || []).map(entry => entry.addressBookEntryId));
                    item.isFavorite = favoriteIds.has(item.addressBookEntryId);
                    addressBookEntries[item.addressBookEntryId] = item;
                });
                state.standardBookEntriesResponse.addressBooksEntries = Object.values(addressBookEntries);
            }
            state.standardBookEntriesResponse.addressBooksEntries = (_c = state.standardBookEntriesResponse.addressBooksEntries) === null || _c === void 0 ? void 0 : _c.sort((a, b) => {
                if ((a.firstName + a.lastName).toUpperCase() > (b.firstName + b.lastName).toUpperCase()) {
                    return 1;
                }
                else {
                    return -1;
                }
            });
            state.totalAddressBookSearchMatchRecords = action.payload.totalRecords || 0;
            state.isAddressBookDataLoading = false;
            state.noStandardEntriesAll = false;
        })
            .addCase(standardBookEntriesForAutoComplete.fulfilled, (state, action) => {
            state.standardBookAutoCompleteEntriesResponse = action.payload;
            if (state.standardBookAutoCompleteEntriesResponse.length > 0) {
                state.standardBookAutoCompleteEntriesResponse.forEach((addressBook, index) => {
                    var _a;
                    const addressBookEntries = {};
                    (_a = addressBook === null || addressBook === void 0 ? void 0 : addressBook.addressBooksEntries) === null || _a === void 0 ? void 0 : _a.forEach((item) => (addressBookEntries[item.addressBookEntryId] = item));
                    state.standardBookAutoCompleteEntriesResponse[index].addressBooksEntries = Object.values(addressBookEntries);
                });
            }
        })
            .addCase(getAllSkills.fulfilled, (state, action) => {
            state.skillList = action.payload;
        });
    },
});
export const agentDirectoryReducer = directorySlice.reducer;
export const agentDirectoryActions = directorySlice.actions;
/**
 * Function to get Directory data
 * @param rootState - CcfDirectoryState
 * @example
 * @returns It returns Directory data
 */
export const getCcfDirectoryState = (rootState) => {
    return rootState[CCF_DIRECTORY_FEATURE_KEY];
};
export const selectAgentList = createSelector(getCcfDirectoryState, (state) => state === null || state === void 0 ? void 0 : state.agentContacts);
/**
 * Function to get agent data
 * @param agentId - agentId
 * @example  selectAgentDetails(agentId)
 * @returns It returns Directory data
 */
export const selectAgentDetails = (agentId) => createSelector(selectAgentList, (state) => state === null || state === void 0 ? void 0 : state.find((agent) => agent.agentId === agentId));
export const selectAgentLoadingStatus = createSelector(getCcfDirectoryState, (state) => state.isAgentLoading);
export const selectSkillsLoadingStatus = createSelector(getCcfDirectoryState, (state) => state.isSkillsLoading);
export const selectTeamsLoadingStatus = createSelector(getCcfDirectoryState, (state) => state.isTeamsLoading);
export const selectDigitalSkillsLoadingStatus = createSelector(getCcfDirectoryState, (state) => state.isDigitalSkillsLoading);
export const selectExternalEntriesLoadingStatus = createSelector(getCcfDirectoryState, (state) => state.isDirectoryEntriesLoading);
export const selectDropDownQueryValue = createSelector(getCcfDirectoryState, (state) => { var _a; return (_a = state === null || state === void 0 ? void 0 : state.query) === null || _a === void 0 ? void 0 : _a.dropDown; });
export const selectSearchBoxQueryValue = createSelector(getCcfDirectoryState, (state) => { var _a; return (_a = state.query) === null || _a === void 0 ? void 0 : _a.searchBox; });
export const getSkillSelectorToggleValue = createSelector(getCcfDirectoryState, (state) => state.toggleSkillSelector);
export const selectSkillsValue = createSelector(getCcfDirectoryState, (state) => state === null || state === void 0 ? void 0 : state.skills);
export const selectDigitalSkillsValue = createSelector(getCcfDirectoryState, (state) => state === null || state === void 0 ? void 0 : state.digitalSkills);
export const selectTeamsValue = createSelector(getCcfDirectoryState, (state) => state === null || state === void 0 ? void 0 : state.teams);
export const selectDirectoryEntries = createSelector(getCcfDirectoryState, (state) => {
    var _a, _b;
    return (_b = (_a = state === null || state === void 0 ? void 0 : state.directoryEntries) === null || _a === void 0 ? void 0 : _a.slice()) === null || _b === void 0 ? void 0 : _b.sort((a, b) => {
        if (a.firstname > b.firstname) {
            return 1;
        }
        else {
            return -1;
        }
    });
});
export const getSkillIdSelectedForInteraction = createSelector(getCcfDirectoryState, (state) => {
    return state.skillIdSelectedForInteraction;
});
export const selectAgentSkills = createSelector(getCcfDirectoryState, (state) => state === null || state === void 0 ? void 0 : state.agentHasMultipleSkills);
export const isSkillPolling = createSelector(getCcfDirectoryState, (state) => state.skillPollingActive);
export const agentsTeamPollingActive = createSelector(getCcfDirectoryState, (state) => state.agentsTeamPollingActive);
export const isDrillDownEnabled = createSelector(getCcfDirectoryState, (state) => state.drillDownToAgent);
export const isLoadingAgentsForTeam = createSelector(getCcfDirectoryState, (state) => state.loadingAgentsForTeam);
export const favoriteAgentsList = createSelector(getCcfDirectoryState, (state) => state === null || state === void 0 ? void 0 : state.favoriteAgents);
export const favoriteTeamsList = createSelector(getCcfDirectoryState, (state) => state === null || state === void 0 ? void 0 : state.favoriteTeams);
export const favoriteDigitalSkillsList = createSelector(getCcfDirectoryState, (state) => state === null || state === void 0 ? void 0 : state.favoriteDigitalSkills);
export const favoriteStandardAddressBookList = createSelector(getCcfDirectoryState, (state) => state === null || state === void 0 ? void 0 : state.favoriteStandardAddressBooks);
export const favoriteSkillsList = createSelector(getCcfDirectoryState, (state) => state === null || state === void 0 ? void 0 : state.favoriteSkills);
export const favoriteExtDirectoryEntriesList = createSelector(getCcfDirectoryState, (state) => state === null || state === void 0 ? void 0 : state.favoriteExtDirectoryEntries);
export const isFavoriteAgentListLoaded = createSelector(getCcfDirectoryState, (state) => state.isFavoriteAgentsLoading);
export const isFavoriteTeamListLoaded = createSelector(getCcfDirectoryState, (state) => state.isFavoriteTeamsLoading);
export const isFavoriteDigitalSkillsListLoaded = createSelector(getCcfDirectoryState, (state) => state.isFavoriteDigitalSkillsLoading);
export const isFavStdAddressBookLoading = createSelector(getCcfDirectoryState, (state) => state.isFavoriteStdAdrsBookLoading);
export const isFavoriteExtDirectoryLoaded = createSelector(getCcfDirectoryState, (state) => state.isFavoriteExtDirectoryLoading);
export const getExternalDirectories = createSelector(getCcfDirectoryState, (state) => state.externalDirectories);
export const getCurrentTeam = createSelector(getCcfDirectoryState, (state) => state.currentTeamId);
export const selectExternalDirectoryState = createSelector(getCcfDirectoryState, (state) => state.externalDirectoryState);
export const totalAgentsSearchMatchRecords = createSelector(getCcfDirectoryState, (state) => state.totalAgentsSearchMatchRecords);
export const totalTeamsSearchMatchRecords = createSelector(getCcfDirectoryState, (state) => state.totalTeamsSearchMatchRecords);
export const totalSkillsSearchMatchRecords = createSelector(getCcfDirectoryState, (state) => state.totalSkillsSearchMatchRecords);
export const totalDigitalSkillsSearchMatchRecords = createSelector(getCcfDirectoryState, (state) => state.totalDigitalSkillsSearchMatchRecords);
export const selectExternalDirectorySubscriptionId = createSelector(getCcfDirectoryState, (state) => state.externalDirectorySubscriptionId);
export const selectExternalDirectoryDrillDown = createSelector(getCcfDirectoryState, (state) => state.externalDirectoryDrillDown);
export const totalExternalDirectoryRecordCount = createSelector(getCcfDirectoryState, (state) => state.totalExternalDirectoryRecordsCount);
export const selectCurrentDrillDownEntry = createSelector(getCcfDirectoryState, (state) => state.selectedDrillDownUserEntry);
export const noAgentDataFound = createSelector(getCcfDirectoryState, (state) => state.noAgentDataFound);
export const noTeamDataFound = createSelector(getCcfDirectoryState, (state) => state.noTeamDataFound);
export const hideExternalDirectoryData = createSelector(getCcfDirectoryState, (state) => state.hideExternalDirectoryData);
export const selectEmptySearchState = createSelector(getCcfDirectoryState, (state) => state.emptySearchFlg);
export const directoryFocusEvent = createSelector(getCcfDirectoryState, (state) => state.directoryFocus);
export const directoryRenderedEvent = createSelector(getCcfDirectoryState, (state) => state.directoryRendered);
export const selectAllAgentCount = createSelector(getCcfDirectoryState, (state) => state.totalAgentCount);
export const selectAllTeamCount = createSelector(getCcfDirectoryState, (state) => state.totalTeamCount);
export const selectAllSkillCount = createSelector(getCcfDirectoryState, (state) => state.totalSkillCount);
export const noSkillDataFound = createSelector(getCcfDirectoryState, (state) => state.noSkillDataFound);
export const selectFullViewDirectoryFlg = createSelector(getCcfDirectoryState, (state) => state.isFullViewDirectory);
export const standardAddressBooks = createSelector(getCcfDirectoryState, (state) => state.standardAddressBooks);
export const standardAddressBookEntries = createSelector(getCcfDirectoryState, (state) => { var _a; return (_a = state === null || state === void 0 ? void 0 : state.standardBookEntriesResponse) === null || _a === void 0 ? void 0 : _a.addressBooksEntries; });
export const standardAddressBookEntriesForAutoComplete = createSelector(getCcfDirectoryState, (state) => {
    const sortedEntries = [];
    state === null || state === void 0 ? void 0 : state.standardBookAutoCompleteEntriesResponse.forEach((addressBook) => {
        addressBook.addressBooksEntries.forEach((entry) => {
            sortedEntries.push(entry);
        });
    });
    sortedEntries.sort((a, b) => {
        if ((a.firstName.toUpperCase() + a.lastName.toUpperCase()) > (b.firstName.toUpperCase() + b.lastName.toUpperCase())) {
            return 1;
        }
        else {
            return -1;
        }
    });
    return sortedEntries;
});
export const standardAddressBookEntriesMoreDetails = createSelector(getCcfDirectoryState, (state) => state.displayStandardAddressDetails);
export const totalAddressBookMatchRecordsCount = createSelector(getCcfDirectoryState, (state) => state.totalAddressBookSearchMatchRecords);
export const isAddressBookRecordLoading = createSelector(getCcfDirectoryState, (state) => state.isAddressBookDataLoading);
export const selectAllAddressBookCount = createSelector(getCcfDirectoryState, (state) => state.allAddressBookCount);
//this count will be used for All section to show no matching result
export const noStandardEntriesAllData = createSelector(getCcfDirectoryState, (state) => state.noStandardEntriesAll);
export const getSkillList = createSelector(getCcfDirectoryState, (state) => state.skillList);
export const getSelectedDropDown = createSelector(getCcfDirectoryState, (state) => state.query.dropDown);
export const getClientDataApiFailedToast = createSelector(getCcfDirectoryState, (state) => state.showClientDataApiFailedToast);
export const getCurrentFavsInDirectory = createSelector(getCcfDirectoryState, (state) => {
    return state.favoritesInDirectory;
});
export const getFavIdToggled = createSelector(getCcfDirectoryState, (state) => {
    return state.favoriteIdsToggled;
});
export const getFavoritesToastReference = createSelector(getCcfDirectoryState, (state) => {
    return state === null || state === void 0 ? void 0 : state.storeFavsToastReference;
});
//# sourceMappingURL=ccf-directory.slice.js.map