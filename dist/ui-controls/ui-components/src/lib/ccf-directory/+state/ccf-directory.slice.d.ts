import { AgentStateResponse, DirectoryEntities, Team, Directories, DirectoryEntry, DirectoryResponse, SkillEvent, AddressBooks, AddressBookEntriesResponse, AddressBooksEntries, SAB2AddressBook, Skills, DirectoryAdditionalAtrributes } from '@nice-devone/common-sdk';
import { AnyAction, PayloadAction, ThunkDispatch } from '@reduxjs/toolkit';
import { SkillActivityEvent, SkillActivityResponse } from '@nice-devone/agent-sdk';
import { DirectoryEntryDetails } from '../ccf-directory-entries-details/ccf-directory-entries-details';
import { Id } from 'react-toastify';
export declare const CCF_DIRECTORY_FEATURE_KEY = "agentDirectory";
export interface NormalizerResult<T> {
    [id: number]: T;
}
export interface NormalizerDirectoriesResult<T> {
    [id: string]: T;
}
/**
   * This interface is added to show more details for specific entry in detail page
   * @example DisplayStandardBookDetails('12344',true)
*/
export interface DisplayStandardBookDetails {
    addressBookEntryId: number;
    isVisible: boolean;
}
export declare enum AgentStatus {
    WORKING = "working",
    AVAILABLE = "available"
}
export interface TeamsAgentRequest {
    offset: number;
    limit: number;
    searchText: string;
    teamId: string;
}
export declare enum DirectoryDropdownValues {
    All = "all",
    AgentList = "agentList",
    SkillList = "skillList",
    TeamList = "teamList",
    FavoriteList = "favoriteList",
    ExternalDirectories = "externalDirectories",
    AddressBookList = "addressBookList",
    SkillActivity = "SkillActivity"
}
export declare enum DirectorySearchRecord {
    AllDirectoryCount = 2,
    DirectoryCount = 25
}
export declare enum DirectoryUserAgentStates {
    Available = "Available",
    Unavailable = "Unavailable",
    InboundContact = "InboundContact",
    OutboundContact = "OutboundContact",
    InboundConsult = "InboundConsult",
    OutboundConsult = "OutboundConsult",
    Dialer = "Dialer",
    DialerPending = "DialerPending",
    LoggedOut = "LoggedOut",
    Working = "Working"
}
export declare enum DirectoryEntryStates {
    Green = "Green",
    Orange = "Orange",
    Grey = "Grey",
    Red = "Red",
    Yellow = "Yellow"
}
export interface outboundOptionState {
    triggerType: string;
    triggerState: boolean;
}
export interface SearchExternalDirectoryRequest {
    directoryUid: string;
    limit: number;
    offset: number;
    searchText: string;
    subscriptionId?: string;
    realTimeUpdates?: boolean;
}
export interface Agent extends AgentStateResponse {
    id?: number;
    name?: string;
    firstName: string;
    lastName: string;
    status?: AgentStatus.AVAILABLE | AgentStatus.WORKING;
    designation?: 'Agent Supervisor' | 'Technical Support Agent';
    contactNo?: string;
}
export declare type DirectoryEntriesMapType = {
    [id: string]: any;
};
export declare type FavoritesInDirectoryType = {
    agents?: number[];
    teams?: number[];
    skills?: (number | string)[];
    digitalSkills?: (number | string)[];
    standardAdrsBook?: number[];
    extDirectoryEntries?: string[];
};
/**
 * Represents the types of items that may exist in a directory,
 * such as agents, teams or skills.
 */
export declare enum DirectoryItemType {
    Agent = "agent",
    Team = "team",
    Skill = "skill",
    Addressbook = "addressbook",
    ExtDirectoryEntries = "extDirectoryEntries",
    DigitalSkill = "digitalSkill"
}
export interface CcfDirectoryState {
    query: {
        searchBox: string;
        dropDown: string;
        offSetVal: number;
    };
    emptySearchFlg: boolean;
    skills: SkillActivityEvent[];
    digitalSkills: SkillEvent[];
    isAgentLoading: boolean;
    isSkillsLoading: boolean;
    isTeamsLoading: boolean;
    isDigitalSkillsLoading: boolean;
    isFavoriteAgentsLoading: boolean;
    isFavoriteTeamsLoading: boolean;
    isFavoriteStdAdrsBookLoading: boolean;
    isFavoriteExtDirectoryLoading: boolean;
    agentContacts: Agent[];
    favoriteAgents: Agent[];
    favoriteTeams: Team[];
    favoriteStandardAddressBooks: AddressBooksEntries[];
    isFavoriteSkillsLoading: boolean;
    isFavoriteDigitalSkillsLoading: boolean;
    favoriteSkills: SkillActivityEvent[];
    favoriteDigitalSkills: SkillEvent[];
    favoriteExtDirectoryEntries: DirectoryAdditionalAtrributes[];
    teams: Team[];
    skillPollingActive: boolean;
    agentHasMultipleSkills: {
        agentHasMultipleSkillsFlg: boolean;
        res: [];
    };
    agentsTeamPollingActive: boolean;
    skillIdSelectedForInteraction: number | null;
    drillDownToAgent: boolean;
    noStandardEntriesAll: boolean;
    loadingAgentsForTeam: boolean;
    externalDirectories: Directories;
    externalDirectoryState: boolean;
    directoryEntries: DirectoryAdditionalAtrributes[];
    isDirectoryEntriesLoading: boolean;
    currentTeamId: string;
    toggleSkillSelector: outboundOptionState[];
    totalAgentsSearchMatchRecords: number;
    totalTeamsSearchMatchRecords: number;
    totalSkillsSearchMatchRecords: number;
    totalDigitalSkillsSearchMatchRecords: number;
    externalDirectorySubscriptionId: string;
    externalDirectoryDrillDown: boolean;
    totalExternalDirectoryRecordsCount: number;
    selectedDrillDownUserEntry: DirectoryEntryDetails;
    noAgentDataFound: boolean;
    noTeamDataFound: boolean;
    hideExternalDirectoryData: boolean;
    directoryFocus: boolean;
    directoryRendered: boolean;
    totalAgentCount: number;
    totalTeamCount: number;
    totalSkillCount: number;
    noSkillDataFound: boolean;
    isFullViewDirectory: boolean;
    standardAddressBooks: (AddressBooks | SAB2AddressBook)[];
    standardBookEntriesResponse: AddressBookEntriesResponse;
    standardBookAutoCompleteEntriesResponse: AddressBookEntriesResponse[];
    displayStandardAddressDetails: {
        displayDetails: boolean;
        addressBookEntryId: number;
    };
    totalAddressBookSearchMatchRecords: number;
    isAddressBookDataLoading: boolean;
    allAddressBookCount: number;
    isPollingStarted: boolean;
    skillList: Skills[];
    showClientDataApiFailedToast: {
        storageExceeded: boolean;
        apiFailed: boolean;
    };
    favoritesInDirectory: FavoritesInDirectoryType;
    favoriteIdsToggled: FavoritesInDirectoryType;
    storeFavsToastReference: Id | null;
}
export declare const initialCcfDirectoryState: CcfDirectoryState;
export interface teamDetail {
    id: string;
    name: string;
    agentCount: number;
}
/** Used to start the activity polling on button click
 * @example -
 * ```
 * startActivityPolling();
 * ```
 */
export declare const startActivityPolling: import("@reduxjs/toolkit").AsyncThunk<any, any, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
/** Used to stop the activity polling on button click
 * @example -
 * ```
 * stopActivityPolling();
 * ```
 */
export declare const stopActivityPolling: import("@reduxjs/toolkit").AsyncThunk<string, string, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
/** Used to start the agent polling on button click
 * @example -
 * ```
 * startAgentPolling();
 * ```
 */
export declare const startAgentTeamPolling: import("@reduxjs/toolkit").AsyncThunk<any, any, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
/** Used to stop the activity polling on button click
 * @example -
 * ```
 * stopAgentPolling();
 * ```
 */
export declare const stopAgentTeamPolling: import("@reduxjs/toolkit").AsyncThunk<string, string, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
/** Used to stop the activity polling on button click
 * @example -
 * ```
 * stopEveryPolling();
 * ```
 */
export declare const stopEveryPolling: import("@reduxjs/toolkit").AsyncThunk<{}, void, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
/** Used to retrieve fav agents' list
 * @param agentName - name of agent
 * @example -
 * ```
 * getAgentFavorites();
 * ```
 */
export declare const getAgentFavorites: import("@reduxjs/toolkit").AsyncThunk<AgentStateResponse[], string, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
/** Used to retrieve fav team list
 * @param teamName - name of team
 * @example -
 * ```
 * getTeamFavorites();
 * ```
 */
export declare const getTeamFavorites: import("@reduxjs/toolkit").AsyncThunk<Team[], string, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
/** Used to retrieve fav skill list
 * @example -
 * ```
 * getDigitalSkillFavorites();
 * ```
 */
export declare const getDigitalSkillFavorites: import("@reduxjs/toolkit").AsyncThunk<SkillEvent[], string, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
/** Used to retrieve favorite standard address book entries
 * @example -
 * ```
 * getAddressBookFavorites();
 * ```
 */
export declare const getAddressBookFavorites: import("@reduxjs/toolkit").AsyncThunk<AddressBooksEntries[], string, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
/** Used to retrieve fav skill list
 * @example -
 * getSkillFavorites();
 */
export declare const getSkillFavorites: import("@reduxjs/toolkit").AsyncThunk<SkillActivityEvent[], string, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
/** Used to retrieve favorite external directory list
 * @param extDirectoryName - name of external directory to search for
 * @example -
 * ```
 * getExtDirectoryFavorites('SearchText');
 * ```
 */
export declare const getExtDirectoryFavorites: import("@reduxjs/toolkit").AsyncThunk<DirectoryAdditionalAtrributes[], string, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
/** send all batched favorite ids to client data api
   * @param directoryItemType - type of directory item (agent/team/skill/AddressBook/ExrDirectoryEntries)
   * @param dispatch - dispatch function
   * @example -
   * ```
   * dispatch(commitQueuedFavsToClientDataApi(agent/team/skill/AddressBook/ExrDirectoryEntries));
   * ```
   */
export declare const commitQueuedFavsToClientDataApi: import("@reduxjs/toolkit").AsyncThunk<void, DirectoryItemType, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
/** to queue fav agent, team, skill ids and send after certain delay to client data api
   * @param favoriteIds - fav ids
   * @param dispatch - dispatch function
   * @param directoryItemType - type of directory item (agent/team/skill/extDirectory)
   * @example -
   * ```
   * queueFavoriteUpdate([123,456], dispatch, UpdateType.AGENT);
   * ```
   */
export declare const queueFavoriteUpdate: (favoriteIds: (string | number)[], dispatch: ThunkDispatch<unknown, unknown, AnyAction>, type: DirectoryItemType) => void;
/** Used to toggle favorite agent in Index DB through SDK
 * @example -
 * ```
 * toggleFavoriteForSingleAgent(agent)
 * ```
 */
export declare const toggleFavoriteForSingleAgent: import("@reduxjs/toolkit").AsyncThunk<void, Agent, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
/** Used to toggle favorite agent in Index DB through SDK
 * @param agent - array of agents to toggle favorite status
 * @param apiFailed - boolean to indicate if client data API call failed
 * @example -
 * ```
 * toggleFavoriteForMultipleAgents([agent])
 * ```
 */
export declare const toggleFavoriteForMultipleAgents: import("@reduxjs/toolkit").AsyncThunk<void, {
    agent: Agent[];
    apiFailed?: boolean | undefined;
}, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
/** Used to toggle favorite team in Index DB through SDK
 * @param team - array of teams to toggle favorite status
 * @param apiFailed - boolean to indicate if client data API call failed
 * @example -
 * ```
 * toggleFavoriteTeams([teams])
 * ```
 */
export declare const toggleFavoriteForTeams: import("@reduxjs/toolkit").AsyncThunk<void, {
    team: Team[];
    apiFailed?: boolean | undefined;
}, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
/**
 * Update the toggled favorites array by adding/removing skillIds.
 * @param currentIds - The current array of toggled IDs.
 * @param skillIdsToToggle - The array of skill IDs to toggle.
 * @example -
 * ```
 * updateToggledIds(currentIds, skillIdsToToggle)
 * ```
 */
export declare function updateToggledIds(currentIds: (string | number)[] | undefined, skillIdsToToggle: (number | string)[]): (number | string)[];
/** Used to toggle favorite skill in Index DB through SDK
 * @example -
 * ```
 * toggleFavoriteForSkills([skill])
 * ```
 */
export declare const toggleFavoriteForSkills: import("@reduxjs/toolkit").AsyncThunk<void, {
    skills: SkillActivityEvent[];
    apiFailed?: boolean | undefined;
}, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
/** Used to toggle favorite digital skill in Index DB through SDK
 * @example -
 * ```
 * toggleFavoriteForDigitalSkills([skill])
 * ```
 */
export declare const toggleFavoriteForDigitalSkills: import("@reduxjs/toolkit").AsyncThunk<void, {
    skills: SkillEvent[];
    apiFailed?: boolean | undefined;
}, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
/**
 * Used to toggle favorite standard address book entries in Index DB through SDK
 * @param addressBooksEntries - array of address book entries to toggle favorite status
 * @param apiFailed - boolean to indicate if client data API call failed
 * @example -
 * ```
 * toggleFavoriteStandardAdrsBook({ addressBooksEntries: [entries] })
 * ```
 */
export declare const toggleFavoriteStandardAdrsBook: import("@reduxjs/toolkit").AsyncThunk<void, {
    addressBooksEntries: AddressBooksEntries[];
    apiFailed?: boolean | undefined;
}, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
/** Used to toggle favorite agent in Index DB through SDK
 * @example -
 * ```
 * toggleFavoriteForExtDirectoryEntries([teams])
 * ```
 */
export declare const toggleFavoriteForExtDirectoryEntries: import("@reduxjs/toolkit").AsyncThunk<void, {
    extDirectoryEntries: DirectoryAdditionalAtrributes[];
    apiFailed?: boolean | undefined;
}, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
/** Used to check if extrnal directory enabled.
 * for looged in user
 * @example -checkExtenalDirectoryEnabled();
 **/
export declare const checkExtenalDirectoryEnabled: import("@reduxjs/toolkit").AsyncThunk<void, {
    userId: string;
    startIndex: number;
    totalRecords: number;
}, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
/** Used to get  directory list
 * @example -getDirectoriesList();
 *
 */
export declare const getDirectories: import("@reduxjs/toolkit").AsyncThunk<Directories, {
    userId: string;
    startIndex: number;
    totalRecords: number;
}, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
/**
 * dialPhone asyncthunk used to call dial-phone api
 * @example - dialPhone()
 */
export declare const dialPhone: import("@reduxjs/toolkit").AsyncThunk<void, {
    skillId: number;
    phoneNumber: string;
}, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
/**
 * get Standard Address book
 * @example - standardBookNames()
 */
export declare const standardBookNames: import("@reduxjs/toolkit").AsyncThunk<AddressBooks[], string, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
/**
 * get Standard Address book entries
 * @example - standardBook Entries
 */
export declare const standardBookEntries: import("@reduxjs/toolkit").AsyncThunk<AddressBookEntriesResponse, {
    adressBookId: string;
    startIndex: number;
    recordsToLoad: number;
    searchText: string;
}, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
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
export declare const standardBookEntriesForAutoComplete: import("@reduxjs/toolkit").AsyncThunk<AddressBookEntriesResponse[], {
    addressBooks: AddressBooks[];
    skip: number;
    top: number;
    searchText: string;
}, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
/**
 * get all Skills List
 * @example - getAllSkills()
 */
export declare const getAllSkills: import("@reduxjs/toolkit").AsyncThunk<Skills[], void, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
export declare const directorySlice: import("@reduxjs/toolkit").Slice<{
    drillDownToAgent: any;
    currentTeamId: string;
    query: import("immer/dist/internal").WritableDraft<{
        searchBox: string;
        dropDown: string;
        offSetVal: number;
    }>;
    emptySearchFlg: boolean;
    skills: import("immer/dist/internal").WritableDraft<SkillActivityEvent>[];
    digitalSkills: import("immer/dist/internal").WritableDraft<SkillEvent>[];
    isAgentLoading: boolean;
    isSkillsLoading: boolean;
    isTeamsLoading: boolean;
    isDigitalSkillsLoading: boolean;
    isFavoriteAgentsLoading: boolean;
    isFavoriteTeamsLoading: boolean;
    isFavoriteStdAdrsBookLoading: boolean;
    isFavoriteExtDirectoryLoading: boolean;
    agentContacts: import("immer/dist/internal").WritableDraft<Agent>[];
    favoriteAgents: import("immer/dist/internal").WritableDraft<Agent>[];
    favoriteTeams: import("immer/dist/internal").WritableDraft<Team>[];
    favoriteStandardAddressBooks: import("immer/dist/internal").WritableDraft<AddressBooksEntries>[];
    isFavoriteSkillsLoading: boolean;
    isFavoriteDigitalSkillsLoading: boolean;
    favoriteSkills: import("immer/dist/internal").WritableDraft<SkillActivityEvent>[];
    favoriteDigitalSkills: import("immer/dist/internal").WritableDraft<SkillEvent>[];
    favoriteExtDirectoryEntries: import("immer/dist/internal").WritableDraft<DirectoryAdditionalAtrributes>[];
    teams: import("immer/dist/internal").WritableDraft<Team>[];
    skillPollingActive: boolean;
    agentHasMultipleSkills: import("immer/dist/internal").WritableDraft<{
        agentHasMultipleSkillsFlg: boolean;
        res: [];
    }>;
    agentsTeamPollingActive: boolean;
    skillIdSelectedForInteraction: number | null;
    noStandardEntriesAll: boolean;
    loadingAgentsForTeam: boolean;
    externalDirectories: import("immer/dist/internal").WritableDraft<Directories>;
    externalDirectoryState: boolean;
    directoryEntries: import("immer/dist/internal").WritableDraft<DirectoryAdditionalAtrributes>[];
    isDirectoryEntriesLoading: boolean;
    toggleSkillSelector: import("immer/dist/internal").WritableDraft<outboundOptionState>[];
    totalAgentsSearchMatchRecords: number;
    totalTeamsSearchMatchRecords: number;
    totalSkillsSearchMatchRecords: number;
    totalDigitalSkillsSearchMatchRecords: number;
    externalDirectorySubscriptionId: string;
    externalDirectoryDrillDown: boolean;
    totalExternalDirectoryRecordsCount: number;
    selectedDrillDownUserEntry: import("immer/dist/internal").WritableDraft<DirectoryEntryDetails>;
    noAgentDataFound: boolean;
    noTeamDataFound: boolean;
    hideExternalDirectoryData: boolean;
    directoryFocus: boolean;
    directoryRendered: boolean;
    totalAgentCount: number;
    totalTeamCount: number;
    totalSkillCount: number;
    noSkillDataFound: boolean;
    isFullViewDirectory: boolean;
    standardAddressBooks: (import("immer/dist/internal").WritableDraft<AddressBooks> | import("immer/dist/internal").WritableDraft<SAB2AddressBook>)[];
    standardBookEntriesResponse: import("immer/dist/internal").WritableDraft<AddressBookEntriesResponse>;
    standardBookAutoCompleteEntriesResponse: import("immer/dist/internal").WritableDraft<AddressBookEntriesResponse>[];
    displayStandardAddressDetails: import("immer/dist/internal").WritableDraft<{
        displayDetails: boolean;
        addressBookEntryId: number;
    }>;
    totalAddressBookSearchMatchRecords: number;
    isAddressBookDataLoading: boolean;
    allAddressBookCount: number;
    isPollingStarted: boolean;
    skillList: import("immer/dist/internal").WritableDraft<Skills>[];
    showClientDataApiFailedToast: import("immer/dist/internal").WritableDraft<{
        storageExceeded: boolean;
        apiFailed: boolean;
    }>;
    favoritesInDirectory: import("immer/dist/internal").WritableDraft<FavoritesInDirectoryType>;
    favoriteIdsToggled: import("immer/dist/internal").WritableDraft<FavoritesInDirectoryType>;
    storeFavsToastReference: Id | null;
}, {
    /**
     * Function to set list of skills in state
     * @param state - AgentState
     * @param action  - PayloadAction<string>
     * @returns It returns current status of agent
     * @example -setSkillList(state,action)
     */
    updateSelectedDropdown(state: import("immer/dist/internal").WritableDraft<CcfDirectoryState>, action: PayloadAction<string>): {
        query: {
            dropDown: string;
            searchBox: string;
            offSetVal: number;
        };
        drillDownToAgent: false;
        currentTeamId: string;
        noStandardEntriesAll: false;
        emptySearchFlg: boolean;
        skills: import("immer/dist/internal").WritableDraft<SkillActivityEvent>[];
        digitalSkills: import("immer/dist/internal").WritableDraft<SkillEvent>[];
        isAgentLoading: boolean;
        isSkillsLoading: boolean;
        isTeamsLoading: boolean;
        isDigitalSkillsLoading: boolean;
        isFavoriteAgentsLoading: boolean;
        isFavoriteTeamsLoading: boolean;
        isFavoriteStdAdrsBookLoading: boolean;
        isFavoriteExtDirectoryLoading: boolean;
        agentContacts: import("immer/dist/internal").WritableDraft<Agent>[];
        favoriteAgents: import("immer/dist/internal").WritableDraft<Agent>[];
        favoriteTeams: import("immer/dist/internal").WritableDraft<Team>[];
        favoriteStandardAddressBooks: import("immer/dist/internal").WritableDraft<AddressBooksEntries>[];
        isFavoriteSkillsLoading: boolean;
        isFavoriteDigitalSkillsLoading: boolean;
        favoriteSkills: import("immer/dist/internal").WritableDraft<SkillActivityEvent>[];
        favoriteDigitalSkills: import("immer/dist/internal").WritableDraft<SkillEvent>[];
        favoriteExtDirectoryEntries: import("immer/dist/internal").WritableDraft<DirectoryAdditionalAtrributes>[];
        teams: import("immer/dist/internal").WritableDraft<Team>[];
        skillPollingActive: boolean;
        agentHasMultipleSkills: import("immer/dist/internal").WritableDraft<{
            agentHasMultipleSkillsFlg: boolean;
            res: [];
        }>;
        agentsTeamPollingActive: boolean;
        skillIdSelectedForInteraction: number | null;
        loadingAgentsForTeam: boolean;
        externalDirectories: import("immer/dist/internal").WritableDraft<Directories>;
        externalDirectoryState: boolean;
        directoryEntries: import("immer/dist/internal").WritableDraft<DirectoryAdditionalAtrributes>[];
        isDirectoryEntriesLoading: boolean;
        toggleSkillSelector: import("immer/dist/internal").WritableDraft<outboundOptionState>[];
        totalAgentsSearchMatchRecords: number;
        totalTeamsSearchMatchRecords: number;
        totalSkillsSearchMatchRecords: number;
        totalDigitalSkillsSearchMatchRecords: number;
        externalDirectorySubscriptionId: string;
        externalDirectoryDrillDown: boolean;
        totalExternalDirectoryRecordsCount: number;
        selectedDrillDownUserEntry: import("immer/dist/internal").WritableDraft<DirectoryEntryDetails>;
        noAgentDataFound: boolean;
        noTeamDataFound: boolean;
        hideExternalDirectoryData: boolean;
        directoryFocus: boolean;
        directoryRendered: boolean;
        totalAgentCount: number;
        totalTeamCount: number;
        totalSkillCount: number;
        noSkillDataFound: boolean;
        isFullViewDirectory: boolean;
        standardAddressBooks: (import("immer/dist/internal").WritableDraft<AddressBooks> | import("immer/dist/internal").WritableDraft<SAB2AddressBook>)[];
        standardBookEntriesResponse: import("immer/dist/internal").WritableDraft<AddressBookEntriesResponse>;
        standardBookAutoCompleteEntriesResponse: import("immer/dist/internal").WritableDraft<AddressBookEntriesResponse>[];
        displayStandardAddressDetails: import("immer/dist/internal").WritableDraft<{
            displayDetails: boolean;
            addressBookEntryId: number;
        }>;
        totalAddressBookSearchMatchRecords: number;
        isAddressBookDataLoading: boolean;
        allAddressBookCount: number;
        isPollingStarted: boolean;
        skillList: import("immer/dist/internal").WritableDraft<Skills>[];
        showClientDataApiFailedToast: import("immer/dist/internal").WritableDraft<{
            storageExceeded: boolean;
            apiFailed: boolean;
        }>;
        favoritesInDirectory: import("immer/dist/internal").WritableDraft<FavoritesInDirectoryType>;
        favoriteIdsToggled: import("immer/dist/internal").WritableDraft<FavoritesInDirectoryType>;
        storeFavsToastReference: Id | null;
    };
    /**
     * Function to set list of skills in state
     * @param state - AgentState
     * @param action  - PayloadAction<string>
     * @returns It updates the string value of the text field
     * @example -updateSearchBoxQuery(state,action)
     */
    updateSearchBoxQuery(state: import("immer/dist/internal").WritableDraft<CcfDirectoryState>, action: PayloadAction<string>): {
        query: {
            searchBox: string;
            dropDown: string;
            offSetVal: number;
        };
        drillDownToAgent: false;
        emptySearchFlg: boolean;
        skills: import("immer/dist/internal").WritableDraft<SkillActivityEvent>[];
        digitalSkills: import("immer/dist/internal").WritableDraft<SkillEvent>[];
        isAgentLoading: boolean;
        isSkillsLoading: boolean;
        isTeamsLoading: boolean;
        isDigitalSkillsLoading: boolean;
        isFavoriteAgentsLoading: boolean;
        isFavoriteTeamsLoading: boolean;
        isFavoriteStdAdrsBookLoading: boolean;
        isFavoriteExtDirectoryLoading: boolean;
        agentContacts: import("immer/dist/internal").WritableDraft<Agent>[];
        favoriteAgents: import("immer/dist/internal").WritableDraft<Agent>[];
        favoriteTeams: import("immer/dist/internal").WritableDraft<Team>[];
        favoriteStandardAddressBooks: import("immer/dist/internal").WritableDraft<AddressBooksEntries>[];
        isFavoriteSkillsLoading: boolean;
        isFavoriteDigitalSkillsLoading: boolean;
        favoriteSkills: import("immer/dist/internal").WritableDraft<SkillActivityEvent>[];
        favoriteDigitalSkills: import("immer/dist/internal").WritableDraft<SkillEvent>[];
        favoriteExtDirectoryEntries: import("immer/dist/internal").WritableDraft<DirectoryAdditionalAtrributes>[];
        teams: import("immer/dist/internal").WritableDraft<Team>[];
        skillPollingActive: boolean;
        agentHasMultipleSkills: import("immer/dist/internal").WritableDraft<{
            agentHasMultipleSkillsFlg: boolean;
            res: [];
        }>;
        agentsTeamPollingActive: boolean;
        skillIdSelectedForInteraction: number | null;
        noStandardEntriesAll: boolean;
        loadingAgentsForTeam: boolean;
        externalDirectories: import("immer/dist/internal").WritableDraft<Directories>;
        externalDirectoryState: boolean;
        directoryEntries: import("immer/dist/internal").WritableDraft<DirectoryAdditionalAtrributes>[];
        isDirectoryEntriesLoading: boolean;
        currentTeamId: string;
        toggleSkillSelector: import("immer/dist/internal").WritableDraft<outboundOptionState>[];
        totalAgentsSearchMatchRecords: number;
        totalTeamsSearchMatchRecords: number;
        totalSkillsSearchMatchRecords: number;
        totalDigitalSkillsSearchMatchRecords: number;
        externalDirectorySubscriptionId: string;
        externalDirectoryDrillDown: boolean;
        totalExternalDirectoryRecordsCount: number;
        selectedDrillDownUserEntry: import("immer/dist/internal").WritableDraft<DirectoryEntryDetails>;
        noAgentDataFound: boolean;
        noTeamDataFound: boolean;
        hideExternalDirectoryData: boolean;
        directoryFocus: boolean;
        directoryRendered: boolean;
        totalAgentCount: number;
        totalTeamCount: number;
        totalSkillCount: number;
        noSkillDataFound: boolean;
        isFullViewDirectory: boolean;
        standardAddressBooks: (import("immer/dist/internal").WritableDraft<AddressBooks> | import("immer/dist/internal").WritableDraft<SAB2AddressBook>)[];
        standardBookEntriesResponse: import("immer/dist/internal").WritableDraft<AddressBookEntriesResponse>;
        standardBookAutoCompleteEntriesResponse: import("immer/dist/internal").WritableDraft<AddressBookEntriesResponse>[];
        displayStandardAddressDetails: import("immer/dist/internal").WritableDraft<{
            displayDetails: boolean;
            addressBookEntryId: number;
        }>;
        totalAddressBookSearchMatchRecords: number;
        isAddressBookDataLoading: boolean;
        allAddressBookCount: number;
        isPollingStarted: boolean;
        skillList: import("immer/dist/internal").WritableDraft<Skills>[];
        showClientDataApiFailedToast: import("immer/dist/internal").WritableDraft<{
            storageExceeded: boolean;
            apiFailed: boolean;
        }>;
        favoritesInDirectory: import("immer/dist/internal").WritableDraft<FavoritesInDirectoryType>;
        favoriteIdsToggled: import("immer/dist/internal").WritableDraft<FavoritesInDirectoryType>;
        storeFavsToastReference: Id | null;
    };
    /**
     * Function to set list of skills in state
     * @param state - AgentState
     * @param action  - PayloadAction<number>
     * @returns It returns current status of agent
     * @example -updateSkillIdSelectedForInteraction(state,action)
     */
    updateSkillIdSelectedForInteraction(state: import("immer/dist/internal").WritableDraft<CcfDirectoryState>, action: PayloadAction<number | null>): {
        skillIdSelectedForInteraction: number | null;
        query: import("immer/dist/internal").WritableDraft<{
            searchBox: string;
            dropDown: string;
            offSetVal: number;
        }>;
        emptySearchFlg: boolean;
        skills: import("immer/dist/internal").WritableDraft<SkillActivityEvent>[];
        digitalSkills: import("immer/dist/internal").WritableDraft<SkillEvent>[];
        isAgentLoading: boolean;
        isSkillsLoading: boolean;
        isTeamsLoading: boolean;
        isDigitalSkillsLoading: boolean;
        isFavoriteAgentsLoading: boolean;
        isFavoriteTeamsLoading: boolean;
        isFavoriteStdAdrsBookLoading: boolean;
        isFavoriteExtDirectoryLoading: boolean;
        agentContacts: import("immer/dist/internal").WritableDraft<Agent>[];
        favoriteAgents: import("immer/dist/internal").WritableDraft<Agent>[];
        favoriteTeams: import("immer/dist/internal").WritableDraft<Team>[];
        favoriteStandardAddressBooks: import("immer/dist/internal").WritableDraft<AddressBooksEntries>[];
        isFavoriteSkillsLoading: boolean;
        isFavoriteDigitalSkillsLoading: boolean;
        favoriteSkills: import("immer/dist/internal").WritableDraft<SkillActivityEvent>[];
        favoriteDigitalSkills: import("immer/dist/internal").WritableDraft<SkillEvent>[];
        favoriteExtDirectoryEntries: import("immer/dist/internal").WritableDraft<DirectoryAdditionalAtrributes>[];
        teams: import("immer/dist/internal").WritableDraft<Team>[];
        skillPollingActive: boolean;
        agentHasMultipleSkills: import("immer/dist/internal").WritableDraft<{
            agentHasMultipleSkillsFlg: boolean;
            res: [];
        }>;
        agentsTeamPollingActive: boolean;
        drillDownToAgent: boolean;
        noStandardEntriesAll: boolean;
        loadingAgentsForTeam: boolean;
        externalDirectories: import("immer/dist/internal").WritableDraft<Directories>;
        externalDirectoryState: boolean;
        directoryEntries: import("immer/dist/internal").WritableDraft<DirectoryAdditionalAtrributes>[];
        isDirectoryEntriesLoading: boolean;
        currentTeamId: string;
        toggleSkillSelector: import("immer/dist/internal").WritableDraft<outboundOptionState>[];
        totalAgentsSearchMatchRecords: number;
        totalTeamsSearchMatchRecords: number;
        totalSkillsSearchMatchRecords: number;
        totalDigitalSkillsSearchMatchRecords: number;
        externalDirectorySubscriptionId: string;
        externalDirectoryDrillDown: boolean;
        totalExternalDirectoryRecordsCount: number;
        selectedDrillDownUserEntry: import("immer/dist/internal").WritableDraft<DirectoryEntryDetails>;
        noAgentDataFound: boolean;
        noTeamDataFound: boolean;
        hideExternalDirectoryData: boolean;
        directoryFocus: boolean;
        directoryRendered: boolean;
        totalAgentCount: number;
        totalTeamCount: number;
        totalSkillCount: number;
        noSkillDataFound: boolean;
        isFullViewDirectory: boolean;
        standardAddressBooks: (import("immer/dist/internal").WritableDraft<AddressBooks> | import("immer/dist/internal").WritableDraft<SAB2AddressBook>)[];
        standardBookEntriesResponse: import("immer/dist/internal").WritableDraft<AddressBookEntriesResponse>;
        standardBookAutoCompleteEntriesResponse: import("immer/dist/internal").WritableDraft<AddressBookEntriesResponse>[];
        displayStandardAddressDetails: import("immer/dist/internal").WritableDraft<{
            displayDetails: boolean;
            addressBookEntryId: number;
        }>;
        totalAddressBookSearchMatchRecords: number;
        isAddressBookDataLoading: boolean;
        allAddressBookCount: number;
        isPollingStarted: boolean;
        skillList: import("immer/dist/internal").WritableDraft<Skills>[];
        showClientDataApiFailedToast: import("immer/dist/internal").WritableDraft<{
            storageExceeded: boolean;
            apiFailed: boolean;
        }>;
        favoritesInDirectory: import("immer/dist/internal").WritableDraft<FavoritesInDirectoryType>;
        favoriteIdsToggled: import("immer/dist/internal").WritableDraft<FavoritesInDirectoryType>;
        storeFavsToastReference: Id | null;
    };
    /**
     * Function to set list of skills in state
     * @param state - AgentState
     * @param action  - PayloadAction<string>
     * @returns It returns current status of agent
     * @example -updateAgentList(state,action)
     */
    updateAgentList(state: import("immer/dist/internal").WritableDraft<CcfDirectoryState>, action: PayloadAction<DirectoryResponse>): void;
    /**
     * Function to update fav in agentContacts list on runtime
     * @param state - AgentState
     * @param action  - PayloadAction<Agent>
     * @returns It returns current status of agent contacts
     * @example -updateFavInContactsList(state,action)
     */
    updateFavInContactsList(state: import("immer/dist/internal").WritableDraft<CcfDirectoryState>, action: PayloadAction<Agent[]>): void;
    /**
     * Function to update fav agent list on runtime
     * @param state - Directory State
     * @param action  - PayloadAction`<Agent[]>`
     * @returns It returns updated fav agent list
     * @example -updateFavAgentList(state,action)
     */
    updateFavAgentList(state: import("immer/dist/internal").WritableDraft<CcfDirectoryState>, action: {
        payload: any;
        type: string;
    }): void;
    /**
     * Function to update fav skills list on runtime
     * @param state - Directory State
     * @param action  - PayloadAction`<SkillActivityEvent[]>`
     * @returns It returns updated fav skills list
     * @example -updateFavSkillsList(state,action)
     */
    updateFavSkillsList(state: import("immer/dist/internal").WritableDraft<CcfDirectoryState>, action: PayloadAction<SkillActivityEvent[]>): void;
    /**
     * Function to update fav digital skills list on runtime
     * @param state - Directory State
     * @param action  - PayloadAction`<SkillEvent[]>`
     * @returns It returns updated fav digital skills list
     * @example -updateFavDigitalSkillsList(state,action)
     */
    updateFavDigitalSkillsList(state: import("immer/dist/internal").WritableDraft<CcfDirectoryState>, action: PayloadAction<SkillEvent[]>): void;
    /**
     * Function to set list of skills in state
     * @param state - AgentState
     * @param action  - PayloadAction<any>
     * @returns It returns current status of agent
     * @example -setSkillList(state,action)
     */
    setSkillList(state: import("immer/dist/internal").WritableDraft<CcfDirectoryState>, action: PayloadAction<SkillActivityResponse>): void;
    /**
     * Function to set list of entries in state
     * @param state - AgentState
     * @param action  - PayloadAction<any>
     * @returns It returns list of entries for selected external directory
     * @example -setExternalDirectoryEntries(state,action)
     */
    setExternalDirectoryEntries(state: import("immer/dist/internal").WritableDraft<CcfDirectoryState>, action: PayloadAction<{
        directoryEntry: DirectoryEntry[];
        subscriptionID: string;
        totalRecords: number;
    }>): void;
    /**
     * Function to set list of entries in state
     * @param state - AgentState
     * @param action  - PayloadAction<any>
     * @returns It returns list of entries for selected external directory
     * @example -updateFavsInExternalDirectoryEntries(state,action)
     */
    updateFavInExtDirectoryEntries(state: import("immer/dist/internal").WritableDraft<CcfDirectoryState>, action: PayloadAction<DirectoryAdditionalAtrributes[]>): void;
    /**
    * Function to update fav team list on runtime
    * @param state - Directory State
    * @param action  - PayloadAction`<Team[]>`
    * @returns It returns updated fav team list
    * ```
    * @example -updateFavExtDirectoryEntriesList(state,action)
    * ```
    */
    updateFavExtDirectoryEntriesList(state: import("immer/dist/internal").WritableDraft<CcfDirectoryState>, action: {
        payload: any;
        type: string;
    }): void;
    /**
     * Function to set list of entries in state
     * @param state - AgentState
     * @param action  - PayloadAction<any>
     * @returns It returns list of entries for selected external directory
     * @example -updateSelecteDrillDownEntry(state,action)
     */
    updateSelectedDrillDownEntry(state: import("immer/dist/internal").WritableDraft<CcfDirectoryState>, action: PayloadAction<DirectoryEntryDetails>): {
        selectedDrillDownUserEntry: DirectoryEntryDetails;
        query: import("immer/dist/internal").WritableDraft<{
            searchBox: string;
            dropDown: string;
            offSetVal: number;
        }>;
        emptySearchFlg: boolean;
        skills: import("immer/dist/internal").WritableDraft<SkillActivityEvent>[];
        digitalSkills: import("immer/dist/internal").WritableDraft<SkillEvent>[];
        isAgentLoading: boolean;
        isSkillsLoading: boolean;
        isTeamsLoading: boolean;
        isDigitalSkillsLoading: boolean;
        isFavoriteAgentsLoading: boolean;
        isFavoriteTeamsLoading: boolean;
        isFavoriteStdAdrsBookLoading: boolean;
        isFavoriteExtDirectoryLoading: boolean;
        agentContacts: import("immer/dist/internal").WritableDraft<Agent>[];
        favoriteAgents: import("immer/dist/internal").WritableDraft<Agent>[];
        favoriteTeams: import("immer/dist/internal").WritableDraft<Team>[];
        favoriteStandardAddressBooks: import("immer/dist/internal").WritableDraft<AddressBooksEntries>[];
        isFavoriteSkillsLoading: boolean;
        isFavoriteDigitalSkillsLoading: boolean;
        favoriteSkills: import("immer/dist/internal").WritableDraft<SkillActivityEvent>[];
        favoriteDigitalSkills: import("immer/dist/internal").WritableDraft<SkillEvent>[];
        favoriteExtDirectoryEntries: import("immer/dist/internal").WritableDraft<DirectoryAdditionalAtrributes>[];
        teams: import("immer/dist/internal").WritableDraft<Team>[];
        skillPollingActive: boolean;
        agentHasMultipleSkills: import("immer/dist/internal").WritableDraft<{
            agentHasMultipleSkillsFlg: boolean;
            res: [];
        }>;
        agentsTeamPollingActive: boolean;
        skillIdSelectedForInteraction: number | null;
        drillDownToAgent: boolean;
        noStandardEntriesAll: boolean;
        loadingAgentsForTeam: boolean;
        externalDirectories: import("immer/dist/internal").WritableDraft<Directories>;
        externalDirectoryState: boolean;
        directoryEntries: import("immer/dist/internal").WritableDraft<DirectoryAdditionalAtrributes>[];
        isDirectoryEntriesLoading: boolean;
        currentTeamId: string;
        toggleSkillSelector: import("immer/dist/internal").WritableDraft<outboundOptionState>[];
        totalAgentsSearchMatchRecords: number;
        totalTeamsSearchMatchRecords: number;
        totalSkillsSearchMatchRecords: number;
        totalDigitalSkillsSearchMatchRecords: number;
        externalDirectorySubscriptionId: string;
        externalDirectoryDrillDown: boolean;
        totalExternalDirectoryRecordsCount: number;
        noAgentDataFound: boolean;
        noTeamDataFound: boolean;
        hideExternalDirectoryData: boolean;
        directoryFocus: boolean;
        directoryRendered: boolean;
        totalAgentCount: number;
        totalTeamCount: number;
        totalSkillCount: number;
        noSkillDataFound: boolean;
        isFullViewDirectory: boolean;
        standardAddressBooks: (import("immer/dist/internal").WritableDraft<AddressBooks> | import("immer/dist/internal").WritableDraft<SAB2AddressBook>)[];
        standardBookEntriesResponse: import("immer/dist/internal").WritableDraft<AddressBookEntriesResponse>;
        standardBookAutoCompleteEntriesResponse: import("immer/dist/internal").WritableDraft<AddressBookEntriesResponse>[];
        displayStandardAddressDetails: import("immer/dist/internal").WritableDraft<{
            displayDetails: boolean;
            addressBookEntryId: number;
        }>;
        totalAddressBookSearchMatchRecords: number;
        isAddressBookDataLoading: boolean;
        allAddressBookCount: number;
        isPollingStarted: boolean;
        skillList: import("immer/dist/internal").WritableDraft<Skills>[];
        showClientDataApiFailedToast: import("immer/dist/internal").WritableDraft<{
            storageExceeded: boolean;
            apiFailed: boolean;
        }>;
        favoritesInDirectory: import("immer/dist/internal").WritableDraft<FavoritesInDirectoryType>;
        favoriteIdsToggled: import("immer/dist/internal").WritableDraft<FavoritesInDirectoryType>;
        storeFavsToastReference: Id | null;
    };
    /**
     * Function to set flag for multi skills in state
     * @param state - externalDirectoryState
     * @param action  - PayloadAction<any>
     * @example -updateExternalDirectoryState(state,action)
     */
    updateExternalDirectoryState(state: import("immer/dist/internal").WritableDraft<CcfDirectoryState>, action: PayloadAction<boolean>): void;
    /**
     * Function to fetch skill list from state when subscription is already in progress
     * @param state - AgentState
     * @param value- value of dropdown
     * @returns It returns current status of directory
     * @example -backToTeamList(state,action)
     */
    backToTeamList(state: import("immer/dist/internal").WritableDraft<CcfDirectoryState>): {
        isTeamsLoading: false;
        isAgentLoading: false;
        query: {
            offSetVal: number;
            searchBox: string;
            dropDown: DirectoryEntities;
        };
        drillDownToAgent: false;
        emptySearchFlg: false;
        currentTeamId: string;
        skills: import("immer/dist/internal").WritableDraft<SkillActivityEvent>[];
        digitalSkills: import("immer/dist/internal").WritableDraft<SkillEvent>[];
        isSkillsLoading: boolean;
        isDigitalSkillsLoading: boolean;
        isFavoriteAgentsLoading: boolean;
        isFavoriteTeamsLoading: boolean;
        isFavoriteStdAdrsBookLoading: boolean;
        isFavoriteExtDirectoryLoading: boolean;
        agentContacts: import("immer/dist/internal").WritableDraft<Agent>[];
        favoriteAgents: import("immer/dist/internal").WritableDraft<Agent>[];
        favoriteTeams: import("immer/dist/internal").WritableDraft<Team>[];
        favoriteStandardAddressBooks: import("immer/dist/internal").WritableDraft<AddressBooksEntries>[];
        isFavoriteSkillsLoading: boolean;
        isFavoriteDigitalSkillsLoading: boolean;
        favoriteSkills: import("immer/dist/internal").WritableDraft<SkillActivityEvent>[];
        favoriteDigitalSkills: import("immer/dist/internal").WritableDraft<SkillEvent>[];
        favoriteExtDirectoryEntries: import("immer/dist/internal").WritableDraft<DirectoryAdditionalAtrributes>[];
        teams: import("immer/dist/internal").WritableDraft<Team>[];
        skillPollingActive: boolean;
        agentHasMultipleSkills: import("immer/dist/internal").WritableDraft<{
            agentHasMultipleSkillsFlg: boolean;
            res: [];
        }>;
        agentsTeamPollingActive: boolean;
        skillIdSelectedForInteraction: number | null;
        noStandardEntriesAll: boolean;
        loadingAgentsForTeam: boolean;
        externalDirectories: import("immer/dist/internal").WritableDraft<Directories>;
        externalDirectoryState: boolean;
        directoryEntries: import("immer/dist/internal").WritableDraft<DirectoryAdditionalAtrributes>[];
        isDirectoryEntriesLoading: boolean;
        toggleSkillSelector: import("immer/dist/internal").WritableDraft<outboundOptionState>[];
        totalAgentsSearchMatchRecords: number;
        totalTeamsSearchMatchRecords: number;
        totalSkillsSearchMatchRecords: number;
        totalDigitalSkillsSearchMatchRecords: number;
        externalDirectorySubscriptionId: string;
        externalDirectoryDrillDown: boolean;
        totalExternalDirectoryRecordsCount: number;
        selectedDrillDownUserEntry: import("immer/dist/internal").WritableDraft<DirectoryEntryDetails>;
        noAgentDataFound: boolean;
        noTeamDataFound: boolean;
        hideExternalDirectoryData: boolean;
        directoryFocus: boolean;
        directoryRendered: boolean;
        totalAgentCount: number;
        totalTeamCount: number;
        totalSkillCount: number;
        noSkillDataFound: boolean;
        isFullViewDirectory: boolean;
        standardAddressBooks: (import("immer/dist/internal").WritableDraft<AddressBooks> | import("immer/dist/internal").WritableDraft<SAB2AddressBook>)[];
        standardBookEntriesResponse: import("immer/dist/internal").WritableDraft<AddressBookEntriesResponse>;
        standardBookAutoCompleteEntriesResponse: import("immer/dist/internal").WritableDraft<AddressBookEntriesResponse>[];
        displayStandardAddressDetails: import("immer/dist/internal").WritableDraft<{
            displayDetails: boolean;
            addressBookEntryId: number;
        }>;
        totalAddressBookSearchMatchRecords: number;
        isAddressBookDataLoading: boolean;
        allAddressBookCount: number;
        isPollingStarted: boolean;
        skillList: import("immer/dist/internal").WritableDraft<Skills>[];
        showClientDataApiFailedToast: import("immer/dist/internal").WritableDraft<{
            storageExceeded: boolean;
            apiFailed: boolean;
        }>;
        favoritesInDirectory: import("immer/dist/internal").WritableDraft<FavoritesInDirectoryType>;
        favoriteIdsToggled: import("immer/dist/internal").WritableDraft<FavoritesInDirectoryType>;
        storeFavsToastReference: Id | null;
    };
    /**
     * Function is used on click of back btn of address book details
     * @param state - Directory State
     * @returns It returns current status of directory
     * @example -backToAddressList(state,action)
     */
    backToAddressList(state: import("immer/dist/internal").WritableDraft<CcfDirectoryState>): {
        query: import("immer/dist/internal").WritableDraft<{
            searchBox: string;
            dropDown: string;
            offSetVal: number;
        }>;
        emptySearchFlg: boolean;
        skills: import("immer/dist/internal").WritableDraft<SkillActivityEvent>[];
        digitalSkills: import("immer/dist/internal").WritableDraft<SkillEvent>[];
        isAgentLoading: boolean;
        isSkillsLoading: boolean;
        isTeamsLoading: boolean;
        isDigitalSkillsLoading: boolean;
        isFavoriteAgentsLoading: boolean;
        isFavoriteTeamsLoading: boolean;
        isFavoriteStdAdrsBookLoading: boolean;
        isFavoriteExtDirectoryLoading: boolean;
        agentContacts: import("immer/dist/internal").WritableDraft<Agent>[];
        favoriteAgents: import("immer/dist/internal").WritableDraft<Agent>[];
        favoriteTeams: import("immer/dist/internal").WritableDraft<Team>[];
        favoriteStandardAddressBooks: import("immer/dist/internal").WritableDraft<AddressBooksEntries>[];
        isFavoriteSkillsLoading: boolean;
        isFavoriteDigitalSkillsLoading: boolean;
        favoriteSkills: import("immer/dist/internal").WritableDraft<SkillActivityEvent>[];
        favoriteDigitalSkills: import("immer/dist/internal").WritableDraft<SkillEvent>[];
        favoriteExtDirectoryEntries: import("immer/dist/internal").WritableDraft<DirectoryAdditionalAtrributes>[];
        teams: import("immer/dist/internal").WritableDraft<Team>[];
        skillPollingActive: boolean;
        agentHasMultipleSkills: import("immer/dist/internal").WritableDraft<{
            agentHasMultipleSkillsFlg: boolean;
            res: [];
        }>;
        agentsTeamPollingActive: boolean;
        skillIdSelectedForInteraction: number | null;
        drillDownToAgent: boolean;
        noStandardEntriesAll: boolean;
        loadingAgentsForTeam: boolean;
        externalDirectories: import("immer/dist/internal").WritableDraft<Directories>;
        externalDirectoryState: boolean;
        directoryEntries: import("immer/dist/internal").WritableDraft<DirectoryAdditionalAtrributes>[];
        isDirectoryEntriesLoading: boolean;
        currentTeamId: string;
        toggleSkillSelector: import("immer/dist/internal").WritableDraft<outboundOptionState>[];
        totalAgentsSearchMatchRecords: number;
        totalTeamsSearchMatchRecords: number;
        totalSkillsSearchMatchRecords: number;
        totalDigitalSkillsSearchMatchRecords: number;
        externalDirectorySubscriptionId: string;
        externalDirectoryDrillDown: boolean;
        totalExternalDirectoryRecordsCount: number;
        selectedDrillDownUserEntry: import("immer/dist/internal").WritableDraft<DirectoryEntryDetails>;
        noAgentDataFound: boolean;
        noTeamDataFound: boolean;
        hideExternalDirectoryData: boolean;
        directoryFocus: boolean;
        directoryRendered: boolean;
        totalAgentCount: number;
        totalTeamCount: number;
        totalSkillCount: number;
        noSkillDataFound: boolean;
        isFullViewDirectory: boolean;
        standardAddressBooks: (import("immer/dist/internal").WritableDraft<AddressBooks> | import("immer/dist/internal").WritableDraft<SAB2AddressBook>)[];
        standardBookEntriesResponse: import("immer/dist/internal").WritableDraft<AddressBookEntriesResponse>;
        standardBookAutoCompleteEntriesResponse: import("immer/dist/internal").WritableDraft<AddressBookEntriesResponse>[];
        displayStandardAddressDetails: import("immer/dist/internal").WritableDraft<{
            displayDetails: boolean;
            addressBookEntryId: number;
        }>;
        totalAddressBookSearchMatchRecords: number;
        isAddressBookDataLoading: boolean;
        allAddressBookCount: number;
        isPollingStarted: boolean;
        skillList: import("immer/dist/internal").WritableDraft<Skills>[];
        showClientDataApiFailedToast: import("immer/dist/internal").WritableDraft<{
            storageExceeded: boolean;
            apiFailed: boolean;
        }>;
        favoritesInDirectory: import("immer/dist/internal").WritableDraft<FavoritesInDirectoryType>;
        favoriteIdsToggled: import("immer/dist/internal").WritableDraft<FavoritesInDirectoryType>;
        storeFavsToastReference: Id | null;
    };
    /**
     * Function to set the drill down flag false and reset teamID
     * @param state - AgentState
     * @param value- value of dropdown
     * @returns It returns current status of directory
     * @example -updateDrillDownToAgentFlag(state,action)
     */
    updateDrillDownToAgentFlag(state: import("immer/dist/internal").WritableDraft<CcfDirectoryState>, action: {
        payload: any;
        type: string;
    }): {
        drillDownToAgent: any;
        currentTeamId: string;
        query: import("immer/dist/internal").WritableDraft<{
            searchBox: string;
            dropDown: string;
            offSetVal: number;
        }>;
        emptySearchFlg: boolean;
        skills: import("immer/dist/internal").WritableDraft<SkillActivityEvent>[];
        digitalSkills: import("immer/dist/internal").WritableDraft<SkillEvent>[];
        isAgentLoading: boolean;
        isSkillsLoading: boolean;
        isTeamsLoading: boolean;
        isDigitalSkillsLoading: boolean;
        isFavoriteAgentsLoading: boolean;
        isFavoriteTeamsLoading: boolean;
        isFavoriteStdAdrsBookLoading: boolean;
        isFavoriteExtDirectoryLoading: boolean;
        agentContacts: import("immer/dist/internal").WritableDraft<Agent>[];
        favoriteAgents: import("immer/dist/internal").WritableDraft<Agent>[];
        favoriteTeams: import("immer/dist/internal").WritableDraft<Team>[];
        favoriteStandardAddressBooks: import("immer/dist/internal").WritableDraft<AddressBooksEntries>[];
        isFavoriteSkillsLoading: boolean;
        isFavoriteDigitalSkillsLoading: boolean;
        favoriteSkills: import("immer/dist/internal").WritableDraft<SkillActivityEvent>[];
        favoriteDigitalSkills: import("immer/dist/internal").WritableDraft<SkillEvent>[];
        favoriteExtDirectoryEntries: import("immer/dist/internal").WritableDraft<DirectoryAdditionalAtrributes>[];
        teams: import("immer/dist/internal").WritableDraft<Team>[];
        skillPollingActive: boolean;
        agentHasMultipleSkills: import("immer/dist/internal").WritableDraft<{
            agentHasMultipleSkillsFlg: boolean;
            res: [];
        }>;
        agentsTeamPollingActive: boolean;
        skillIdSelectedForInteraction: number | null;
        noStandardEntriesAll: boolean;
        loadingAgentsForTeam: boolean;
        externalDirectories: import("immer/dist/internal").WritableDraft<Directories>;
        externalDirectoryState: boolean;
        directoryEntries: import("immer/dist/internal").WritableDraft<DirectoryAdditionalAtrributes>[];
        isDirectoryEntriesLoading: boolean;
        toggleSkillSelector: import("immer/dist/internal").WritableDraft<outboundOptionState>[];
        totalAgentsSearchMatchRecords: number;
        totalTeamsSearchMatchRecords: number;
        totalSkillsSearchMatchRecords: number;
        totalDigitalSkillsSearchMatchRecords: number;
        externalDirectorySubscriptionId: string;
        externalDirectoryDrillDown: boolean;
        totalExternalDirectoryRecordsCount: number;
        selectedDrillDownUserEntry: import("immer/dist/internal").WritableDraft<DirectoryEntryDetails>;
        noAgentDataFound: boolean;
        noTeamDataFound: boolean;
        hideExternalDirectoryData: boolean;
        directoryFocus: boolean;
        directoryRendered: boolean;
        totalAgentCount: number;
        totalTeamCount: number;
        totalSkillCount: number;
        noSkillDataFound: boolean;
        isFullViewDirectory: boolean;
        standardAddressBooks: (import("immer/dist/internal").WritableDraft<AddressBooks> | import("immer/dist/internal").WritableDraft<SAB2AddressBook>)[];
        standardBookEntriesResponse: import("immer/dist/internal").WritableDraft<AddressBookEntriesResponse>;
        standardBookAutoCompleteEntriesResponse: import("immer/dist/internal").WritableDraft<AddressBookEntriesResponse>[];
        displayStandardAddressDetails: import("immer/dist/internal").WritableDraft<{
            displayDetails: boolean;
            addressBookEntryId: number;
        }>;
        totalAddressBookSearchMatchRecords: number;
        isAddressBookDataLoading: boolean;
        allAddressBookCount: number;
        isPollingStarted: boolean;
        skillList: import("immer/dist/internal").WritableDraft<Skills>[];
        showClientDataApiFailedToast: import("immer/dist/internal").WritableDraft<{
            storageExceeded: boolean;
            apiFailed: boolean;
        }>;
        favoritesInDirectory: import("immer/dist/internal").WritableDraft<FavoritesInDirectoryType>;
        favoriteIdsToggled: import("immer/dist/internal").WritableDraft<FavoritesInDirectoryType>;
        storeFavsToastReference: Id | null;
    };
    /**
     * Function to set list of skills in state
     * @param state - AgentState
     * @param action  - PayloadAction<string>
     * @returns It returns current status of agent
     * @example -updateTeamList(state,action)
     */
    updateTeamList(state: import("immer/dist/internal").WritableDraft<CcfDirectoryState>, action: PayloadAction<DirectoryResponse>): void;
    /**
     * Function to update fav in team list on runtime
     * @param state - AgentState
     * @param action  - PayloadAction<Team>
     * @returns It returns current status of teams
     * ```
     * @example -updateFavInTeamsList(state,action)
     * ```
     */
    updateFavInTeamsList(state: import("immer/dist/internal").WritableDraft<CcfDirectoryState>, action: PayloadAction<Team[]>): void;
    /**
     * Function to update fav in agentContacts list on runtime
     * @param state - AgentState
     * @param action  - PayloadAction<Agent>
     * @returns It returns current status of agent contacts
     * @example -updateFavInContactsList(state,action)
     */
    updateFavInSkillsList(state: import("immer/dist/internal").WritableDraft<CcfDirectoryState>, action: PayloadAction<SkillActivityEvent[]>): void;
    /**
     * Function to update fav in agentContacts list on runtime
     * @param state - AgentState
     * @param action  - PayloadAction<Agent>
     * @returns It returns current status of agent contacts
     * @example -updateFavInContactsList(state,action)
     */
    updateFavInDigitalSkillsList(state: import("immer/dist/internal").WritableDraft<CcfDirectoryState>, action: PayloadAction<SkillEvent[]>): void;
    /**
     * Function to update fav team list on runtime
     * @param state - Directory State
     * @param action  - PayloadAction`<Team[]>`
     * @returns It returns updated fav team list
     * ```
     * @example -updateFavTeamList(state,action)
     * ```
     */
    updateFavTeamList(state: import("immer/dist/internal").WritableDraft<CcfDirectoryState>, action: {
        payload: any;
        type: string;
    }): void;
    /**
     * Function to update fav in standard address book entries list on runtime
     * @param state - Directory State
     * @param action  - PayloadAction`<AddressBooksEntries[]>`
     * @returns It returns current status of standard address book entries
     * @example - updateFavInStandardAddressBookEntries(state, action)
     */
    updateFavInStandardAddressBookEntries(state: import("immer/dist/internal").WritableDraft<CcfDirectoryState>, action: PayloadAction<AddressBooksEntries[]>): void;
    /**
    * Updates the favorite list for standard address book entries.
    * @param state - Directory State
    * @param action - PayloadAction`<AddressBooksEntries[]>`
    * @returns It returns updated fav addressbook list
    * ```
    * @example - updateFavoriteListForStandardAddressBook(state, action)
    * ```
    */
    updateFavoriteListForStandardAddressBook(state: import("immer/dist/internal").WritableDraft<CcfDirectoryState>, action: PayloadAction<AddressBooksEntries[]>): void;
    /**
    * Function to update the favorite address book list on runtime.
    * @param state - Directory State
    * @param action - PayloadAction`<AddressBooks[]>`
    * @returns It returns updated fav addressbooks
    * ```
    * @example - updateFavAddressBookList(state, action)
    * ```
    */
    updateFavAddressBookList(state: import("immer/dist/internal").WritableDraft<CcfDirectoryState>, action: {
        payload: any;
        type: string;
    }): void;
    /**
     * Function to set list of digital skills in state
     * @param state - AgentState
     * @param action  - PayloadAction<DirectoryResponse>
     * @example - updateDigitalSkillList(state,action)
     */
    updateDigitalSkillList(state: import("immer/dist/internal").WritableDraft<CcfDirectoryState>, action: PayloadAction<DirectoryResponse>): void;
    /**
     * Function to set flag for multi skills in state
     * @param state - AgentState
     * @param action  - PayloadAction<any>
     * @example -updateAgentMultiSkillFlag(state,action)
     */
    updateAgentMultiSkillFlag(state: import("immer/dist/internal").WritableDraft<CcfDirectoryState>, action: PayloadAction<boolean>): void;
    /**
     * Function to set flag for multi skills in state
     * @param state - AgentState
     * @param action  - PayloadAction<any>
     * @example -updateAgentMultiSkillFlag(state,action)
     */
    hideExternalDirectoryData(state: import("immer/dist/internal").WritableDraft<CcfDirectoryState>, action: PayloadAction<boolean>): void;
    /**
     * Function to set flag for multi skills in state
     * @param state - AgentState
     * @param action  - PayloadAction<any>
     * @example -updateAgentMultiSkillFlag(state,action)
     */
    flushAllData(state: import("immer/dist/internal").WritableDraft<CcfDirectoryState>): void;
    /**
     * Function to set flag for multi skills in state
     * @param state - AgentState
     * @param action  - PayloadAction<any>
     * @example -updateAgentMultiSkillFlag(state,action)
     */
    flushAllDataExceptTeams(state: import("immer/dist/internal").WritableDraft<CcfDirectoryState>): void;
    /**
     * Function to clear data for agentContacts/agentList
     * @param state - AgentState
     * @param action  - PayloadAction<any>
     * @example -flushDataForAgentDrilldown(state)
     */
    flushDataForAgentDrilldown(state: import("immer/dist/internal").WritableDraft<CcfDirectoryState>): void;
    /**
     * Function to update searchText in state
     * @param state - AgentState
     * @param action  - PayloadAction<any>
     * @example - updateSearchBoxValue(state,action)
     */
    updateSearchBoxValue(state: import("immer/dist/internal").WritableDraft<CcfDirectoryState>, action: PayloadAction<string>): void;
    /**
     * Function to activate empty search by updating emptySearchFlg in state
     * @param state - AgentState
     * @param action  - PayloadAction<any>
     * @example - updateEmptySearchState(state,action)
     */
    updateEmptySearchState(state: import("immer/dist/internal").WritableDraft<CcfDirectoryState>, action: PayloadAction<boolean>): void;
    /**
     * Function to update toggle for outbound call options
     * @param state - AgentState
     * @param action  - PayloadAction<boolean>
     * @example - updateSkillSelectorToggle(state,action)
     */
    updateSkillSelectorToggle(state: import("immer/dist/internal").WritableDraft<CcfDirectoryState>, action: PayloadAction<outboundOptionState>): void;
    /**
     * Function to update all toggle states for outbound call options
     * @param state - AgentState
     * @param action  - PayloadAction<boolean>
     * @example - updateAllToggleStates(state,action)
     */
    updateAllToggleStates(state: import("immer/dist/internal").WritableDraft<CcfDirectoryState>, action: PayloadAction<outboundOptionState>): void;
    /**
     * Function to set the External Directory drill down flag
     * @param state - DirectoryState
     * @param action  - PayloadAction<boolean>
     * @returns set the value of External Directory drill down flag
     * @example -setExternalDirectoryDrillDown(state,action)
     */
    setExternalDirectoryDrillDown(state: import("immer/dist/internal").WritableDraft<CcfDirectoryState>, action: PayloadAction<boolean>): void;
    /** Used to search in the directory list
     * @example -searchDirectories();
     *
     */
    searchDirectories(state: import("immer/dist/internal").WritableDraft<CcfDirectoryState>, action: PayloadAction<SearchExternalDirectoryRequest>): void;
    /**
     * Method to set the focus in directory when it is dispatched
     * @param state - DirectoryState
     * @example - dispatch(setFocusInDirectory));
     * @returns
     */
    setFocusInDirectory(state: import("immer/dist/internal").WritableDraft<CcfDirectoryState>, action: PayloadAction<boolean>): {
        directoryFocus: boolean;
        query: import("immer/dist/internal").WritableDraft<{
            searchBox: string;
            dropDown: string;
            offSetVal: number;
        }>;
        emptySearchFlg: boolean;
        skills: import("immer/dist/internal").WritableDraft<SkillActivityEvent>[];
        digitalSkills: import("immer/dist/internal").WritableDraft<SkillEvent>[];
        isAgentLoading: boolean;
        isSkillsLoading: boolean;
        isTeamsLoading: boolean;
        isDigitalSkillsLoading: boolean;
        isFavoriteAgentsLoading: boolean;
        isFavoriteTeamsLoading: boolean;
        isFavoriteStdAdrsBookLoading: boolean;
        isFavoriteExtDirectoryLoading: boolean;
        agentContacts: import("immer/dist/internal").WritableDraft<Agent>[];
        favoriteAgents: import("immer/dist/internal").WritableDraft<Agent>[];
        favoriteTeams: import("immer/dist/internal").WritableDraft<Team>[];
        favoriteStandardAddressBooks: import("immer/dist/internal").WritableDraft<AddressBooksEntries>[];
        isFavoriteSkillsLoading: boolean;
        isFavoriteDigitalSkillsLoading: boolean;
        favoriteSkills: import("immer/dist/internal").WritableDraft<SkillActivityEvent>[];
        favoriteDigitalSkills: import("immer/dist/internal").WritableDraft<SkillEvent>[];
        favoriteExtDirectoryEntries: import("immer/dist/internal").WritableDraft<DirectoryAdditionalAtrributes>[];
        teams: import("immer/dist/internal").WritableDraft<Team>[];
        skillPollingActive: boolean;
        agentHasMultipleSkills: import("immer/dist/internal").WritableDraft<{
            agentHasMultipleSkillsFlg: boolean;
            res: [];
        }>;
        agentsTeamPollingActive: boolean;
        skillIdSelectedForInteraction: number | null;
        drillDownToAgent: boolean;
        noStandardEntriesAll: boolean;
        loadingAgentsForTeam: boolean;
        externalDirectories: import("immer/dist/internal").WritableDraft<Directories>;
        externalDirectoryState: boolean;
        directoryEntries: import("immer/dist/internal").WritableDraft<DirectoryAdditionalAtrributes>[];
        isDirectoryEntriesLoading: boolean;
        currentTeamId: string;
        toggleSkillSelector: import("immer/dist/internal").WritableDraft<outboundOptionState>[];
        totalAgentsSearchMatchRecords: number;
        totalTeamsSearchMatchRecords: number;
        totalSkillsSearchMatchRecords: number;
        totalDigitalSkillsSearchMatchRecords: number;
        externalDirectorySubscriptionId: string;
        externalDirectoryDrillDown: boolean;
        totalExternalDirectoryRecordsCount: number;
        selectedDrillDownUserEntry: import("immer/dist/internal").WritableDraft<DirectoryEntryDetails>;
        noAgentDataFound: boolean;
        noTeamDataFound: boolean;
        hideExternalDirectoryData: boolean;
        directoryRendered: boolean;
        totalAgentCount: number;
        totalTeamCount: number;
        totalSkillCount: number;
        noSkillDataFound: boolean;
        isFullViewDirectory: boolean;
        standardAddressBooks: (import("immer/dist/internal").WritableDraft<AddressBooks> | import("immer/dist/internal").WritableDraft<SAB2AddressBook>)[];
        standardBookEntriesResponse: import("immer/dist/internal").WritableDraft<AddressBookEntriesResponse>;
        standardBookAutoCompleteEntriesResponse: import("immer/dist/internal").WritableDraft<AddressBookEntriesResponse>[];
        displayStandardAddressDetails: import("immer/dist/internal").WritableDraft<{
            displayDetails: boolean;
            addressBookEntryId: number;
        }>;
        totalAddressBookSearchMatchRecords: number;
        isAddressBookDataLoading: boolean;
        allAddressBookCount: number;
        isPollingStarted: boolean;
        skillList: import("immer/dist/internal").WritableDraft<Skills>[];
        showClientDataApiFailedToast: import("immer/dist/internal").WritableDraft<{
            storageExceeded: boolean;
            apiFailed: boolean;
        }>;
        favoritesInDirectory: import("immer/dist/internal").WritableDraft<FavoritesInDirectoryType>;
        favoriteIdsToggled: import("immer/dist/internal").WritableDraft<FavoritesInDirectoryType>;
        storeFavsToastReference: Id | null;
    };
    /**
     * Method to check if directory is mounted
     * @param state - DirectoryState
     * @example - dispatch(setDirectoryRendered(true));
     * @returns
     */
    setDirectoryRendered(state: import("immer/dist/internal").WritableDraft<CcfDirectoryState>, action: PayloadAction<boolean>): {
        directoryRendered: boolean;
        query: import("immer/dist/internal").WritableDraft<{
            searchBox: string;
            dropDown: string;
            offSetVal: number;
        }>;
        emptySearchFlg: boolean;
        skills: import("immer/dist/internal").WritableDraft<SkillActivityEvent>[];
        digitalSkills: import("immer/dist/internal").WritableDraft<SkillEvent>[];
        isAgentLoading: boolean;
        isSkillsLoading: boolean;
        isTeamsLoading: boolean;
        isDigitalSkillsLoading: boolean;
        isFavoriteAgentsLoading: boolean;
        isFavoriteTeamsLoading: boolean;
        isFavoriteStdAdrsBookLoading: boolean;
        isFavoriteExtDirectoryLoading: boolean;
        agentContacts: import("immer/dist/internal").WritableDraft<Agent>[];
        favoriteAgents: import("immer/dist/internal").WritableDraft<Agent>[];
        favoriteTeams: import("immer/dist/internal").WritableDraft<Team>[];
        favoriteStandardAddressBooks: import("immer/dist/internal").WritableDraft<AddressBooksEntries>[];
        isFavoriteSkillsLoading: boolean;
        isFavoriteDigitalSkillsLoading: boolean;
        favoriteSkills: import("immer/dist/internal").WritableDraft<SkillActivityEvent>[];
        favoriteDigitalSkills: import("immer/dist/internal").WritableDraft<SkillEvent>[];
        favoriteExtDirectoryEntries: import("immer/dist/internal").WritableDraft<DirectoryAdditionalAtrributes>[];
        teams: import("immer/dist/internal").WritableDraft<Team>[];
        skillPollingActive: boolean;
        agentHasMultipleSkills: import("immer/dist/internal").WritableDraft<{
            agentHasMultipleSkillsFlg: boolean;
            res: [];
        }>;
        agentsTeamPollingActive: boolean;
        skillIdSelectedForInteraction: number | null;
        drillDownToAgent: boolean;
        noStandardEntriesAll: boolean;
        loadingAgentsForTeam: boolean;
        externalDirectories: import("immer/dist/internal").WritableDraft<Directories>;
        externalDirectoryState: boolean;
        directoryEntries: import("immer/dist/internal").WritableDraft<DirectoryAdditionalAtrributes>[];
        isDirectoryEntriesLoading: boolean;
        currentTeamId: string;
        toggleSkillSelector: import("immer/dist/internal").WritableDraft<outboundOptionState>[];
        totalAgentsSearchMatchRecords: number;
        totalTeamsSearchMatchRecords: number;
        totalSkillsSearchMatchRecords: number;
        totalDigitalSkillsSearchMatchRecords: number;
        externalDirectorySubscriptionId: string;
        externalDirectoryDrillDown: boolean;
        totalExternalDirectoryRecordsCount: number;
        selectedDrillDownUserEntry: import("immer/dist/internal").WritableDraft<DirectoryEntryDetails>;
        noAgentDataFound: boolean;
        noTeamDataFound: boolean;
        hideExternalDirectoryData: boolean;
        directoryFocus: boolean;
        totalAgentCount: number;
        totalTeamCount: number;
        totalSkillCount: number;
        noSkillDataFound: boolean;
        isFullViewDirectory: boolean;
        standardAddressBooks: (import("immer/dist/internal").WritableDraft<AddressBooks> | import("immer/dist/internal").WritableDraft<SAB2AddressBook>)[];
        standardBookEntriesResponse: import("immer/dist/internal").WritableDraft<AddressBookEntriesResponse>;
        standardBookAutoCompleteEntriesResponse: import("immer/dist/internal").WritableDraft<AddressBookEntriesResponse>[];
        displayStandardAddressDetails: import("immer/dist/internal").WritableDraft<{
            displayDetails: boolean;
            addressBookEntryId: number;
        }>;
        totalAddressBookSearchMatchRecords: number;
        isAddressBookDataLoading: boolean;
        allAddressBookCount: number;
        isPollingStarted: boolean;
        skillList: import("immer/dist/internal").WritableDraft<Skills>[];
        showClientDataApiFailedToast: import("immer/dist/internal").WritableDraft<{
            storageExceeded: boolean;
            apiFailed: boolean;
        }>;
        favoritesInDirectory: import("immer/dist/internal").WritableDraft<FavoritesInDirectoryType>;
        favoriteIdsToggled: import("immer/dist/internal").WritableDraft<FavoritesInDirectoryType>;
        storeFavsToastReference: Id | null;
    };
    /**
    *Method to update the flag whether its a full view directory view or integrated
    @param state - DirectoryState
    @example - dispatch(updateIsFullViewFlg)
    @returns
    **/
    updateIsFullViewFlg(state: import("immer/dist/internal").WritableDraft<CcfDirectoryState>, action: PayloadAction<boolean>): {
        isFullViewDirectory: boolean;
        query: import("immer/dist/internal").WritableDraft<{
            searchBox: string;
            dropDown: string;
            offSetVal: number;
        }>;
        emptySearchFlg: boolean;
        skills: import("immer/dist/internal").WritableDraft<SkillActivityEvent>[];
        digitalSkills: import("immer/dist/internal").WritableDraft<SkillEvent>[];
        isAgentLoading: boolean;
        isSkillsLoading: boolean;
        isTeamsLoading: boolean;
        isDigitalSkillsLoading: boolean;
        isFavoriteAgentsLoading: boolean;
        isFavoriteTeamsLoading: boolean;
        isFavoriteStdAdrsBookLoading: boolean;
        isFavoriteExtDirectoryLoading: boolean;
        agentContacts: import("immer/dist/internal").WritableDraft<Agent>[];
        favoriteAgents: import("immer/dist/internal").WritableDraft<Agent>[];
        favoriteTeams: import("immer/dist/internal").WritableDraft<Team>[];
        favoriteStandardAddressBooks: import("immer/dist/internal").WritableDraft<AddressBooksEntries>[];
        isFavoriteSkillsLoading: boolean;
        isFavoriteDigitalSkillsLoading: boolean;
        favoriteSkills: import("immer/dist/internal").WritableDraft<SkillActivityEvent>[];
        favoriteDigitalSkills: import("immer/dist/internal").WritableDraft<SkillEvent>[];
        favoriteExtDirectoryEntries: import("immer/dist/internal").WritableDraft<DirectoryAdditionalAtrributes>[];
        teams: import("immer/dist/internal").WritableDraft<Team>[];
        skillPollingActive: boolean;
        agentHasMultipleSkills: import("immer/dist/internal").WritableDraft<{
            agentHasMultipleSkillsFlg: boolean;
            res: [];
        }>;
        agentsTeamPollingActive: boolean;
        skillIdSelectedForInteraction: number | null;
        drillDownToAgent: boolean;
        noStandardEntriesAll: boolean;
        loadingAgentsForTeam: boolean;
        externalDirectories: import("immer/dist/internal").WritableDraft<Directories>;
        externalDirectoryState: boolean;
        directoryEntries: import("immer/dist/internal").WritableDraft<DirectoryAdditionalAtrributes>[];
        isDirectoryEntriesLoading: boolean;
        currentTeamId: string;
        toggleSkillSelector: import("immer/dist/internal").WritableDraft<outboundOptionState>[];
        totalAgentsSearchMatchRecords: number;
        totalTeamsSearchMatchRecords: number;
        totalSkillsSearchMatchRecords: number;
        totalDigitalSkillsSearchMatchRecords: number;
        externalDirectorySubscriptionId: string;
        externalDirectoryDrillDown: boolean;
        totalExternalDirectoryRecordsCount: number;
        selectedDrillDownUserEntry: import("immer/dist/internal").WritableDraft<DirectoryEntryDetails>;
        noAgentDataFound: boolean;
        noTeamDataFound: boolean;
        hideExternalDirectoryData: boolean;
        directoryFocus: boolean;
        directoryRendered: boolean;
        totalAgentCount: number;
        totalTeamCount: number;
        totalSkillCount: number;
        noSkillDataFound: boolean;
        standardAddressBooks: (import("immer/dist/internal").WritableDraft<AddressBooks> | import("immer/dist/internal").WritableDraft<SAB2AddressBook>)[];
        standardBookEntriesResponse: import("immer/dist/internal").WritableDraft<AddressBookEntriesResponse>;
        standardBookAutoCompleteEntriesResponse: import("immer/dist/internal").WritableDraft<AddressBookEntriesResponse>[];
        displayStandardAddressDetails: import("immer/dist/internal").WritableDraft<{
            displayDetails: boolean;
            addressBookEntryId: number;
        }>;
        totalAddressBookSearchMatchRecords: number;
        isAddressBookDataLoading: boolean;
        allAddressBookCount: number;
        isPollingStarted: boolean;
        skillList: import("immer/dist/internal").WritableDraft<Skills>[];
        showClientDataApiFailedToast: import("immer/dist/internal").WritableDraft<{
            storageExceeded: boolean;
            apiFailed: boolean;
        }>;
        favoritesInDirectory: import("immer/dist/internal").WritableDraft<FavoritesInDirectoryType>;
        favoriteIdsToggled: import("immer/dist/internal").WritableDraft<FavoritesInDirectoryType>;
        storeFavsToastReference: Id | null;
    };
    /**
     * Function to set flag to display details for SAB
     * @param state - displayStandardAddressDetails
     * @param action  - PayloadAction<number>
     * @example -displayStandardAddressDetails(state,action)
     */
    displayStandardAddressDetails(state: import("immer/dist/internal").WritableDraft<CcfDirectoryState>, action: PayloadAction<DisplayStandardBookDetails>): void;
    /**
     * Function use to maintain the flag for all section when no data returned.
     * @param state - standardEntriesCountForAll
     * @param action  - PayloadAction<boolean>
     * @example -standardEntriesCountForAll(state,action)
     */
    standardEntriesCountForAll(state: import("immer/dist/internal").WritableDraft<CcfDirectoryState>, action: PayloadAction<boolean>): void;
    /**
     * Function used to get All Standard Address book Entries
     * @param state - updateStandardAddressBookEntries
     * @param action - Address Book Response from middleware
     * @example - updateStandardAddressBookEntries(state,action)
     */
    updateStandardAddressBookEntries(state: import("immer/dist/internal").WritableDraft<CcfDirectoryState>, action: {
        payload: any;
        type: string;
    }): void;
    /**
     * Method used to set state for address book loading for all section
     * @param state - DirectoryState
     * @example - dispatch(isAddressBookLoading));
     * @returns
     */
    isAddressBookLoading(state: import("immer/dist/internal").WritableDraft<CcfDirectoryState>, action: PayloadAction<boolean>): {
        isAddressBookDataLoading: boolean;
        query: import("immer/dist/internal").WritableDraft<{
            searchBox: string;
            dropDown: string;
            offSetVal: number;
        }>;
        emptySearchFlg: boolean;
        skills: import("immer/dist/internal").WritableDraft<SkillActivityEvent>[];
        digitalSkills: import("immer/dist/internal").WritableDraft<SkillEvent>[];
        isAgentLoading: boolean;
        isSkillsLoading: boolean;
        isTeamsLoading: boolean;
        isDigitalSkillsLoading: boolean;
        isFavoriteAgentsLoading: boolean;
        isFavoriteTeamsLoading: boolean;
        isFavoriteStdAdrsBookLoading: boolean;
        isFavoriteExtDirectoryLoading: boolean;
        agentContacts: import("immer/dist/internal").WritableDraft<Agent>[];
        favoriteAgents: import("immer/dist/internal").WritableDraft<Agent>[];
        favoriteTeams: import("immer/dist/internal").WritableDraft<Team>[];
        favoriteStandardAddressBooks: import("immer/dist/internal").WritableDraft<AddressBooksEntries>[];
        isFavoriteSkillsLoading: boolean;
        isFavoriteDigitalSkillsLoading: boolean;
        favoriteSkills: import("immer/dist/internal").WritableDraft<SkillActivityEvent>[];
        favoriteDigitalSkills: import("immer/dist/internal").WritableDraft<SkillEvent>[];
        favoriteExtDirectoryEntries: import("immer/dist/internal").WritableDraft<DirectoryAdditionalAtrributes>[];
        teams: import("immer/dist/internal").WritableDraft<Team>[];
        skillPollingActive: boolean;
        agentHasMultipleSkills: import("immer/dist/internal").WritableDraft<{
            agentHasMultipleSkillsFlg: boolean;
            res: [];
        }>;
        agentsTeamPollingActive: boolean;
        skillIdSelectedForInteraction: number | null;
        drillDownToAgent: boolean;
        noStandardEntriesAll: boolean;
        loadingAgentsForTeam: boolean;
        externalDirectories: import("immer/dist/internal").WritableDraft<Directories>;
        externalDirectoryState: boolean;
        directoryEntries: import("immer/dist/internal").WritableDraft<DirectoryAdditionalAtrributes>[];
        isDirectoryEntriesLoading: boolean;
        currentTeamId: string;
        toggleSkillSelector: import("immer/dist/internal").WritableDraft<outboundOptionState>[];
        totalAgentsSearchMatchRecords: number;
        totalTeamsSearchMatchRecords: number;
        totalSkillsSearchMatchRecords: number;
        totalDigitalSkillsSearchMatchRecords: number;
        externalDirectorySubscriptionId: string;
        externalDirectoryDrillDown: boolean;
        totalExternalDirectoryRecordsCount: number;
        selectedDrillDownUserEntry: import("immer/dist/internal").WritableDraft<DirectoryEntryDetails>;
        noAgentDataFound: boolean;
        noTeamDataFound: boolean;
        hideExternalDirectoryData: boolean;
        directoryFocus: boolean;
        directoryRendered: boolean;
        totalAgentCount: number;
        totalTeamCount: number;
        totalSkillCount: number;
        noSkillDataFound: boolean;
        isFullViewDirectory: boolean;
        standardAddressBooks: (import("immer/dist/internal").WritableDraft<AddressBooks> | import("immer/dist/internal").WritableDraft<SAB2AddressBook>)[];
        standardBookEntriesResponse: import("immer/dist/internal").WritableDraft<AddressBookEntriesResponse>;
        standardBookAutoCompleteEntriesResponse: import("immer/dist/internal").WritableDraft<AddressBookEntriesResponse>[];
        displayStandardAddressDetails: import("immer/dist/internal").WritableDraft<{
            displayDetails: boolean;
            addressBookEntryId: number;
        }>;
        totalAddressBookSearchMatchRecords: number;
        allAddressBookCount: number;
        isPollingStarted: boolean;
        skillList: import("immer/dist/internal").WritableDraft<Skills>[];
        showClientDataApiFailedToast: import("immer/dist/internal").WritableDraft<{
            storageExceeded: boolean;
            apiFailed: boolean;
        }>;
        favoritesInDirectory: import("immer/dist/internal").WritableDraft<FavoritesInDirectoryType>;
        favoriteIdsToggled: import("immer/dist/internal").WritableDraft<FavoritesInDirectoryType>;
        storeFavsToastReference: Id | null;
    };
    /**
     * Method used to set error toast for client data API failure
     * @param state - DirectoryState
     * @example -
     * ```
     * dispatch(clientDataApiFailed(false)));
     * ```
     * @returns
     */
    clientDataApiFailed(state: import("immer/dist/internal").WritableDraft<CcfDirectoryState>, action: PayloadAction<{
        storageExceeded: boolean;
        apiFailed: boolean;
    }>): {
        showClientDataApiFailedToast: {
            storageExceeded: boolean;
            apiFailed: boolean;
        };
        query: import("immer/dist/internal").WritableDraft<{
            searchBox: string;
            dropDown: string;
            offSetVal: number;
        }>;
        emptySearchFlg: boolean;
        skills: import("immer/dist/internal").WritableDraft<SkillActivityEvent>[];
        digitalSkills: import("immer/dist/internal").WritableDraft<SkillEvent>[];
        isAgentLoading: boolean;
        isSkillsLoading: boolean;
        isTeamsLoading: boolean;
        isDigitalSkillsLoading: boolean;
        isFavoriteAgentsLoading: boolean;
        isFavoriteTeamsLoading: boolean;
        isFavoriteStdAdrsBookLoading: boolean;
        isFavoriteExtDirectoryLoading: boolean;
        agentContacts: import("immer/dist/internal").WritableDraft<Agent>[];
        favoriteAgents: import("immer/dist/internal").WritableDraft<Agent>[];
        favoriteTeams: import("immer/dist/internal").WritableDraft<Team>[];
        favoriteStandardAddressBooks: import("immer/dist/internal").WritableDraft<AddressBooksEntries>[];
        isFavoriteSkillsLoading: boolean;
        isFavoriteDigitalSkillsLoading: boolean;
        favoriteSkills: import("immer/dist/internal").WritableDraft<SkillActivityEvent>[];
        favoriteDigitalSkills: import("immer/dist/internal").WritableDraft<SkillEvent>[];
        favoriteExtDirectoryEntries: import("immer/dist/internal").WritableDraft<DirectoryAdditionalAtrributes>[];
        teams: import("immer/dist/internal").WritableDraft<Team>[];
        skillPollingActive: boolean;
        agentHasMultipleSkills: import("immer/dist/internal").WritableDraft<{
            agentHasMultipleSkillsFlg: boolean;
            res: [];
        }>;
        agentsTeamPollingActive: boolean;
        skillIdSelectedForInteraction: number | null;
        drillDownToAgent: boolean;
        noStandardEntriesAll: boolean;
        loadingAgentsForTeam: boolean;
        externalDirectories: import("immer/dist/internal").WritableDraft<Directories>;
        externalDirectoryState: boolean;
        directoryEntries: import("immer/dist/internal").WritableDraft<DirectoryAdditionalAtrributes>[];
        isDirectoryEntriesLoading: boolean;
        currentTeamId: string;
        toggleSkillSelector: import("immer/dist/internal").WritableDraft<outboundOptionState>[];
        totalAgentsSearchMatchRecords: number;
        totalTeamsSearchMatchRecords: number;
        totalSkillsSearchMatchRecords: number;
        totalDigitalSkillsSearchMatchRecords: number;
        externalDirectorySubscriptionId: string;
        externalDirectoryDrillDown: boolean;
        totalExternalDirectoryRecordsCount: number;
        selectedDrillDownUserEntry: import("immer/dist/internal").WritableDraft<DirectoryEntryDetails>;
        noAgentDataFound: boolean;
        noTeamDataFound: boolean;
        hideExternalDirectoryData: boolean;
        directoryFocus: boolean;
        directoryRendered: boolean;
        totalAgentCount: number;
        totalTeamCount: number;
        totalSkillCount: number;
        noSkillDataFound: boolean;
        isFullViewDirectory: boolean;
        standardAddressBooks: (import("immer/dist/internal").WritableDraft<AddressBooks> | import("immer/dist/internal").WritableDraft<SAB2AddressBook>)[];
        standardBookEntriesResponse: import("immer/dist/internal").WritableDraft<AddressBookEntriesResponse>;
        standardBookAutoCompleteEntriesResponse: import("immer/dist/internal").WritableDraft<AddressBookEntriesResponse>[];
        displayStandardAddressDetails: import("immer/dist/internal").WritableDraft<{
            displayDetails: boolean;
            addressBookEntryId: number;
        }>;
        totalAddressBookSearchMatchRecords: number;
        isAddressBookDataLoading: boolean;
        allAddressBookCount: number;
        isPollingStarted: boolean;
        skillList: import("immer/dist/internal").WritableDraft<Skills>[];
        favoritesInDirectory: import("immer/dist/internal").WritableDraft<FavoritesInDirectoryType>;
        favoriteIdsToggled: import("immer/dist/internal").WritableDraft<FavoritesInDirectoryType>;
        storeFavsToastReference: Id | null;
    };
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
    syncingStoreWithFavs(state: import("immer/dist/internal").WritableDraft<CcfDirectoryState>, action: PayloadAction<FavoritesInDirectoryType>): {
        favoritesInDirectory: {
            agents?: number[] | undefined;
            teams?: number[] | undefined;
            skills?: (string | number)[] | undefined;
            digitalSkills?: (string | number)[] | undefined;
            standardAdrsBook?: number[] | undefined;
            extDirectoryEntries?: string[] | undefined;
        };
        query: import("immer/dist/internal").WritableDraft<{
            searchBox: string;
            dropDown: string;
            offSetVal: number;
        }>;
        emptySearchFlg: boolean;
        skills: import("immer/dist/internal").WritableDraft<SkillActivityEvent>[];
        digitalSkills: import("immer/dist/internal").WritableDraft<SkillEvent>[];
        isAgentLoading: boolean;
        isSkillsLoading: boolean;
        isTeamsLoading: boolean;
        isDigitalSkillsLoading: boolean;
        isFavoriteAgentsLoading: boolean;
        isFavoriteTeamsLoading: boolean;
        isFavoriteStdAdrsBookLoading: boolean;
        isFavoriteExtDirectoryLoading: boolean;
        agentContacts: import("immer/dist/internal").WritableDraft<Agent>[];
        favoriteAgents: import("immer/dist/internal").WritableDraft<Agent>[];
        favoriteTeams: import("immer/dist/internal").WritableDraft<Team>[];
        favoriteStandardAddressBooks: import("immer/dist/internal").WritableDraft<AddressBooksEntries>[];
        isFavoriteSkillsLoading: boolean;
        isFavoriteDigitalSkillsLoading: boolean;
        favoriteSkills: import("immer/dist/internal").WritableDraft<SkillActivityEvent>[];
        favoriteDigitalSkills: import("immer/dist/internal").WritableDraft<SkillEvent>[];
        favoriteExtDirectoryEntries: import("immer/dist/internal").WritableDraft<DirectoryAdditionalAtrributes>[];
        teams: import("immer/dist/internal").WritableDraft<Team>[];
        skillPollingActive: boolean;
        agentHasMultipleSkills: import("immer/dist/internal").WritableDraft<{
            agentHasMultipleSkillsFlg: boolean;
            res: [];
        }>;
        agentsTeamPollingActive: boolean;
        skillIdSelectedForInteraction: number | null;
        drillDownToAgent: boolean;
        noStandardEntriesAll: boolean;
        loadingAgentsForTeam: boolean;
        externalDirectories: import("immer/dist/internal").WritableDraft<Directories>;
        externalDirectoryState: boolean;
        directoryEntries: import("immer/dist/internal").WritableDraft<DirectoryAdditionalAtrributes>[];
        isDirectoryEntriesLoading: boolean;
        currentTeamId: string;
        toggleSkillSelector: import("immer/dist/internal").WritableDraft<outboundOptionState>[];
        totalAgentsSearchMatchRecords: number;
        totalTeamsSearchMatchRecords: number;
        totalSkillsSearchMatchRecords: number;
        totalDigitalSkillsSearchMatchRecords: number;
        externalDirectorySubscriptionId: string;
        externalDirectoryDrillDown: boolean;
        totalExternalDirectoryRecordsCount: number;
        selectedDrillDownUserEntry: import("immer/dist/internal").WritableDraft<DirectoryEntryDetails>;
        noAgentDataFound: boolean;
        noTeamDataFound: boolean;
        hideExternalDirectoryData: boolean;
        directoryFocus: boolean;
        directoryRendered: boolean;
        totalAgentCount: number;
        totalTeamCount: number;
        totalSkillCount: number;
        noSkillDataFound: boolean;
        isFullViewDirectory: boolean;
        standardAddressBooks: (import("immer/dist/internal").WritableDraft<AddressBooks> | import("immer/dist/internal").WritableDraft<SAB2AddressBook>)[];
        standardBookEntriesResponse: import("immer/dist/internal").WritableDraft<AddressBookEntriesResponse>;
        standardBookAutoCompleteEntriesResponse: import("immer/dist/internal").WritableDraft<AddressBookEntriesResponse>[];
        displayStandardAddressDetails: import("immer/dist/internal").WritableDraft<{
            displayDetails: boolean;
            addressBookEntryId: number;
        }>;
        totalAddressBookSearchMatchRecords: number;
        isAddressBookDataLoading: boolean;
        allAddressBookCount: number;
        isPollingStarted: boolean;
        skillList: import("immer/dist/internal").WritableDraft<Skills>[];
        showClientDataApiFailedToast: import("immer/dist/internal").WritableDraft<{
            storageExceeded: boolean;
            apiFailed: boolean;
        }>;
        favoriteIdsToggled: import("immer/dist/internal").WritableDraft<FavoritesInDirectoryType>;
        storeFavsToastReference: Id | null;
    };
    /**
     * Method used to set favorite ids toggled in the directory
     * @param state - DirectoryState
     * @param action - payload with an object containing the favorite IDs toggled in the directory for a particular directory item.
     * @example -
     * ```
     * dispatch(updateFavoriteIdsToggled({ agents: [1, 2], teams: [3], skills: [4] }));
     * ```
     */
    updateFavoriteIdsToggled(state: import("immer/dist/internal").WritableDraft<CcfDirectoryState>, action: PayloadAction<FavoritesInDirectoryType>): {
        favoriteIdsToggled: {
            agents?: number[] | undefined;
            teams?: number[] | undefined;
            skills?: (string | number)[] | undefined;
            digitalSkills?: (string | number)[] | undefined;
            standardAdrsBook?: number[] | undefined;
            extDirectoryEntries?: string[] | undefined;
        };
        query: import("immer/dist/internal").WritableDraft<{
            searchBox: string;
            dropDown: string;
            offSetVal: number;
        }>;
        emptySearchFlg: boolean;
        skills: import("immer/dist/internal").WritableDraft<SkillActivityEvent>[];
        digitalSkills: import("immer/dist/internal").WritableDraft<SkillEvent>[];
        isAgentLoading: boolean;
        isSkillsLoading: boolean;
        isTeamsLoading: boolean;
        isDigitalSkillsLoading: boolean;
        isFavoriteAgentsLoading: boolean;
        isFavoriteTeamsLoading: boolean;
        isFavoriteStdAdrsBookLoading: boolean;
        isFavoriteExtDirectoryLoading: boolean;
        agentContacts: import("immer/dist/internal").WritableDraft<Agent>[];
        favoriteAgents: import("immer/dist/internal").WritableDraft<Agent>[];
        favoriteTeams: import("immer/dist/internal").WritableDraft<Team>[];
        favoriteStandardAddressBooks: import("immer/dist/internal").WritableDraft<AddressBooksEntries>[];
        isFavoriteSkillsLoading: boolean;
        isFavoriteDigitalSkillsLoading: boolean;
        favoriteSkills: import("immer/dist/internal").WritableDraft<SkillActivityEvent>[];
        favoriteDigitalSkills: import("immer/dist/internal").WritableDraft<SkillEvent>[];
        favoriteExtDirectoryEntries: import("immer/dist/internal").WritableDraft<DirectoryAdditionalAtrributes>[];
        teams: import("immer/dist/internal").WritableDraft<Team>[];
        skillPollingActive: boolean;
        agentHasMultipleSkills: import("immer/dist/internal").WritableDraft<{
            agentHasMultipleSkillsFlg: boolean;
            res: [];
        }>;
        agentsTeamPollingActive: boolean;
        skillIdSelectedForInteraction: number | null;
        drillDownToAgent: boolean;
        noStandardEntriesAll: boolean;
        loadingAgentsForTeam: boolean;
        externalDirectories: import("immer/dist/internal").WritableDraft<Directories>;
        externalDirectoryState: boolean;
        directoryEntries: import("immer/dist/internal").WritableDraft<DirectoryAdditionalAtrributes>[];
        isDirectoryEntriesLoading: boolean;
        currentTeamId: string;
        toggleSkillSelector: import("immer/dist/internal").WritableDraft<outboundOptionState>[];
        totalAgentsSearchMatchRecords: number;
        totalTeamsSearchMatchRecords: number;
        totalSkillsSearchMatchRecords: number;
        totalDigitalSkillsSearchMatchRecords: number;
        externalDirectorySubscriptionId: string;
        externalDirectoryDrillDown: boolean;
        totalExternalDirectoryRecordsCount: number;
        selectedDrillDownUserEntry: import("immer/dist/internal").WritableDraft<DirectoryEntryDetails>;
        noAgentDataFound: boolean;
        noTeamDataFound: boolean;
        hideExternalDirectoryData: boolean;
        directoryFocus: boolean;
        directoryRendered: boolean;
        totalAgentCount: number;
        totalTeamCount: number;
        totalSkillCount: number;
        noSkillDataFound: boolean;
        isFullViewDirectory: boolean;
        standardAddressBooks: (import("immer/dist/internal").WritableDraft<AddressBooks> | import("immer/dist/internal").WritableDraft<SAB2AddressBook>)[];
        standardBookEntriesResponse: import("immer/dist/internal").WritableDraft<AddressBookEntriesResponse>;
        standardBookAutoCompleteEntriesResponse: import("immer/dist/internal").WritableDraft<AddressBookEntriesResponse>[];
        displayStandardAddressDetails: import("immer/dist/internal").WritableDraft<{
            displayDetails: boolean;
            addressBookEntryId: number;
        }>;
        totalAddressBookSearchMatchRecords: number;
        isAddressBookDataLoading: boolean;
        allAddressBookCount: number;
        isPollingStarted: boolean;
        skillList: import("immer/dist/internal").WritableDraft<Skills>[];
        showClientDataApiFailedToast: import("immer/dist/internal").WritableDraft<{
            storageExceeded: boolean;
            apiFailed: boolean;
        }>;
        favoritesInDirectory: import("immer/dist/internal").WritableDraft<FavoritesInDirectoryType>;
        storeFavsToastReference: Id | null;
    };
    /**
     * Method used to set toast reference
     * @param state - DirectoryState
     * @param action - payload with an object containing toast reference ID
     * @example -
     * ```
     * dispatch(updateFavsToastReference(Id));
     * ```
     */
    updateFavsToastReference(state: import("immer/dist/internal").WritableDraft<CcfDirectoryState>, action: PayloadAction<Id | null>): void;
}, "agentDirectory">;
export declare const agentDirectoryReducer: import("redux").Reducer<{
    drillDownToAgent: any;
    currentTeamId: string;
    query: import("immer/dist/internal").WritableDraft<{
        searchBox: string;
        dropDown: string;
        offSetVal: number;
    }>;
    emptySearchFlg: boolean;
    skills: import("immer/dist/internal").WritableDraft<SkillActivityEvent>[];
    digitalSkills: import("immer/dist/internal").WritableDraft<SkillEvent>[];
    isAgentLoading: boolean;
    isSkillsLoading: boolean;
    isTeamsLoading: boolean;
    isDigitalSkillsLoading: boolean;
    isFavoriteAgentsLoading: boolean;
    isFavoriteTeamsLoading: boolean;
    isFavoriteStdAdrsBookLoading: boolean;
    isFavoriteExtDirectoryLoading: boolean;
    agentContacts: import("immer/dist/internal").WritableDraft<Agent>[];
    favoriteAgents: import("immer/dist/internal").WritableDraft<Agent>[];
    favoriteTeams: import("immer/dist/internal").WritableDraft<Team>[];
    favoriteStandardAddressBooks: import("immer/dist/internal").WritableDraft<AddressBooksEntries>[];
    isFavoriteSkillsLoading: boolean;
    isFavoriteDigitalSkillsLoading: boolean;
    favoriteSkills: import("immer/dist/internal").WritableDraft<SkillActivityEvent>[];
    favoriteDigitalSkills: import("immer/dist/internal").WritableDraft<SkillEvent>[];
    favoriteExtDirectoryEntries: import("immer/dist/internal").WritableDraft<DirectoryAdditionalAtrributes>[];
    teams: import("immer/dist/internal").WritableDraft<Team>[];
    skillPollingActive: boolean;
    agentHasMultipleSkills: import("immer/dist/internal").WritableDraft<{
        agentHasMultipleSkillsFlg: boolean;
        res: [];
    }>;
    agentsTeamPollingActive: boolean;
    skillIdSelectedForInteraction: number | null;
    noStandardEntriesAll: boolean;
    loadingAgentsForTeam: boolean;
    externalDirectories: import("immer/dist/internal").WritableDraft<Directories>;
    externalDirectoryState: boolean;
    directoryEntries: import("immer/dist/internal").WritableDraft<DirectoryAdditionalAtrributes>[];
    isDirectoryEntriesLoading: boolean;
    toggleSkillSelector: import("immer/dist/internal").WritableDraft<outboundOptionState>[];
    totalAgentsSearchMatchRecords: number;
    totalTeamsSearchMatchRecords: number;
    totalSkillsSearchMatchRecords: number;
    totalDigitalSkillsSearchMatchRecords: number;
    externalDirectorySubscriptionId: string;
    externalDirectoryDrillDown: boolean;
    totalExternalDirectoryRecordsCount: number;
    selectedDrillDownUserEntry: import("immer/dist/internal").WritableDraft<DirectoryEntryDetails>;
    noAgentDataFound: boolean;
    noTeamDataFound: boolean;
    hideExternalDirectoryData: boolean;
    directoryFocus: boolean;
    directoryRendered: boolean;
    totalAgentCount: number;
    totalTeamCount: number;
    totalSkillCount: number;
    noSkillDataFound: boolean;
    isFullViewDirectory: boolean;
    standardAddressBooks: (import("immer/dist/internal").WritableDraft<AddressBooks> | import("immer/dist/internal").WritableDraft<SAB2AddressBook>)[];
    standardBookEntriesResponse: import("immer/dist/internal").WritableDraft<AddressBookEntriesResponse>;
    standardBookAutoCompleteEntriesResponse: import("immer/dist/internal").WritableDraft<AddressBookEntriesResponse>[];
    displayStandardAddressDetails: import("immer/dist/internal").WritableDraft<{
        displayDetails: boolean;
        addressBookEntryId: number;
    }>;
    totalAddressBookSearchMatchRecords: number;
    isAddressBookDataLoading: boolean;
    allAddressBookCount: number;
    isPollingStarted: boolean;
    skillList: import("immer/dist/internal").WritableDraft<Skills>[];
    showClientDataApiFailedToast: import("immer/dist/internal").WritableDraft<{
        storageExceeded: boolean;
        apiFailed: boolean;
    }>;
    favoritesInDirectory: import("immer/dist/internal").WritableDraft<FavoritesInDirectoryType>;
    favoriteIdsToggled: import("immer/dist/internal").WritableDraft<FavoritesInDirectoryType>;
    storeFavsToastReference: Id | null;
}, AnyAction>;
export declare const agentDirectoryActions: import("@reduxjs/toolkit").CaseReducerActions<{
    /**
     * Function to set list of skills in state
     * @param state - AgentState
     * @param action  - PayloadAction<string>
     * @returns It returns current status of agent
     * @example -setSkillList(state,action)
     */
    updateSelectedDropdown(state: import("immer/dist/internal").WritableDraft<CcfDirectoryState>, action: PayloadAction<string>): {
        query: {
            dropDown: string;
            searchBox: string;
            offSetVal: number;
        };
        drillDownToAgent: false;
        currentTeamId: string;
        noStandardEntriesAll: false;
        emptySearchFlg: boolean;
        skills: import("immer/dist/internal").WritableDraft<SkillActivityEvent>[];
        digitalSkills: import("immer/dist/internal").WritableDraft<SkillEvent>[];
        isAgentLoading: boolean;
        isSkillsLoading: boolean;
        isTeamsLoading: boolean;
        isDigitalSkillsLoading: boolean;
        isFavoriteAgentsLoading: boolean;
        isFavoriteTeamsLoading: boolean;
        isFavoriteStdAdrsBookLoading: boolean;
        isFavoriteExtDirectoryLoading: boolean;
        agentContacts: import("immer/dist/internal").WritableDraft<Agent>[];
        favoriteAgents: import("immer/dist/internal").WritableDraft<Agent>[];
        favoriteTeams: import("immer/dist/internal").WritableDraft<Team>[];
        favoriteStandardAddressBooks: import("immer/dist/internal").WritableDraft<AddressBooksEntries>[];
        isFavoriteSkillsLoading: boolean;
        isFavoriteDigitalSkillsLoading: boolean;
        favoriteSkills: import("immer/dist/internal").WritableDraft<SkillActivityEvent>[];
        favoriteDigitalSkills: import("immer/dist/internal").WritableDraft<SkillEvent>[];
        favoriteExtDirectoryEntries: import("immer/dist/internal").WritableDraft<DirectoryAdditionalAtrributes>[];
        teams: import("immer/dist/internal").WritableDraft<Team>[];
        skillPollingActive: boolean;
        agentHasMultipleSkills: import("immer/dist/internal").WritableDraft<{
            agentHasMultipleSkillsFlg: boolean;
            res: [];
        }>;
        agentsTeamPollingActive: boolean;
        skillIdSelectedForInteraction: number | null;
        loadingAgentsForTeam: boolean;
        externalDirectories: import("immer/dist/internal").WritableDraft<Directories>;
        externalDirectoryState: boolean;
        directoryEntries: import("immer/dist/internal").WritableDraft<DirectoryAdditionalAtrributes>[];
        isDirectoryEntriesLoading: boolean;
        toggleSkillSelector: import("immer/dist/internal").WritableDraft<outboundOptionState>[];
        totalAgentsSearchMatchRecords: number;
        totalTeamsSearchMatchRecords: number;
        totalSkillsSearchMatchRecords: number;
        totalDigitalSkillsSearchMatchRecords: number;
        externalDirectorySubscriptionId: string;
        externalDirectoryDrillDown: boolean;
        totalExternalDirectoryRecordsCount: number;
        selectedDrillDownUserEntry: import("immer/dist/internal").WritableDraft<DirectoryEntryDetails>;
        noAgentDataFound: boolean;
        noTeamDataFound: boolean;
        hideExternalDirectoryData: boolean;
        directoryFocus: boolean;
        directoryRendered: boolean;
        totalAgentCount: number;
        totalTeamCount: number;
        totalSkillCount: number;
        noSkillDataFound: boolean;
        isFullViewDirectory: boolean;
        standardAddressBooks: (import("immer/dist/internal").WritableDraft<AddressBooks> | import("immer/dist/internal").WritableDraft<SAB2AddressBook>)[];
        standardBookEntriesResponse: import("immer/dist/internal").WritableDraft<AddressBookEntriesResponse>;
        standardBookAutoCompleteEntriesResponse: import("immer/dist/internal").WritableDraft<AddressBookEntriesResponse>[];
        displayStandardAddressDetails: import("immer/dist/internal").WritableDraft<{
            displayDetails: boolean;
            addressBookEntryId: number;
        }>;
        totalAddressBookSearchMatchRecords: number;
        isAddressBookDataLoading: boolean;
        allAddressBookCount: number;
        isPollingStarted: boolean;
        skillList: import("immer/dist/internal").WritableDraft<Skills>[];
        showClientDataApiFailedToast: import("immer/dist/internal").WritableDraft<{
            storageExceeded: boolean;
            apiFailed: boolean;
        }>;
        favoritesInDirectory: import("immer/dist/internal").WritableDraft<FavoritesInDirectoryType>;
        favoriteIdsToggled: import("immer/dist/internal").WritableDraft<FavoritesInDirectoryType>;
        storeFavsToastReference: Id | null;
    };
    /**
     * Function to set list of skills in state
     * @param state - AgentState
     * @param action  - PayloadAction<string>
     * @returns It updates the string value of the text field
     * @example -updateSearchBoxQuery(state,action)
     */
    updateSearchBoxQuery(state: import("immer/dist/internal").WritableDraft<CcfDirectoryState>, action: PayloadAction<string>): {
        query: {
            searchBox: string;
            dropDown: string;
            offSetVal: number;
        };
        drillDownToAgent: false;
        emptySearchFlg: boolean;
        skills: import("immer/dist/internal").WritableDraft<SkillActivityEvent>[];
        digitalSkills: import("immer/dist/internal").WritableDraft<SkillEvent>[];
        isAgentLoading: boolean;
        isSkillsLoading: boolean;
        isTeamsLoading: boolean;
        isDigitalSkillsLoading: boolean;
        isFavoriteAgentsLoading: boolean;
        isFavoriteTeamsLoading: boolean;
        isFavoriteStdAdrsBookLoading: boolean;
        isFavoriteExtDirectoryLoading: boolean;
        agentContacts: import("immer/dist/internal").WritableDraft<Agent>[];
        favoriteAgents: import("immer/dist/internal").WritableDraft<Agent>[];
        favoriteTeams: import("immer/dist/internal").WritableDraft<Team>[];
        favoriteStandardAddressBooks: import("immer/dist/internal").WritableDraft<AddressBooksEntries>[];
        isFavoriteSkillsLoading: boolean;
        isFavoriteDigitalSkillsLoading: boolean;
        favoriteSkills: import("immer/dist/internal").WritableDraft<SkillActivityEvent>[];
        favoriteDigitalSkills: import("immer/dist/internal").WritableDraft<SkillEvent>[];
        favoriteExtDirectoryEntries: import("immer/dist/internal").WritableDraft<DirectoryAdditionalAtrributes>[];
        teams: import("immer/dist/internal").WritableDraft<Team>[];
        skillPollingActive: boolean;
        agentHasMultipleSkills: import("immer/dist/internal").WritableDraft<{
            agentHasMultipleSkillsFlg: boolean;
            res: [];
        }>;
        agentsTeamPollingActive: boolean;
        skillIdSelectedForInteraction: number | null;
        noStandardEntriesAll: boolean;
        loadingAgentsForTeam: boolean;
        externalDirectories: import("immer/dist/internal").WritableDraft<Directories>;
        externalDirectoryState: boolean;
        directoryEntries: import("immer/dist/internal").WritableDraft<DirectoryAdditionalAtrributes>[];
        isDirectoryEntriesLoading: boolean;
        currentTeamId: string;
        toggleSkillSelector: import("immer/dist/internal").WritableDraft<outboundOptionState>[];
        totalAgentsSearchMatchRecords: number;
        totalTeamsSearchMatchRecords: number;
        totalSkillsSearchMatchRecords: number;
        totalDigitalSkillsSearchMatchRecords: number;
        externalDirectorySubscriptionId: string;
        externalDirectoryDrillDown: boolean;
        totalExternalDirectoryRecordsCount: number;
        selectedDrillDownUserEntry: import("immer/dist/internal").WritableDraft<DirectoryEntryDetails>;
        noAgentDataFound: boolean;
        noTeamDataFound: boolean;
        hideExternalDirectoryData: boolean;
        directoryFocus: boolean;
        directoryRendered: boolean;
        totalAgentCount: number;
        totalTeamCount: number;
        totalSkillCount: number;
        noSkillDataFound: boolean;
        isFullViewDirectory: boolean;
        standardAddressBooks: (import("immer/dist/internal").WritableDraft<AddressBooks> | import("immer/dist/internal").WritableDraft<SAB2AddressBook>)[];
        standardBookEntriesResponse: import("immer/dist/internal").WritableDraft<AddressBookEntriesResponse>;
        standardBookAutoCompleteEntriesResponse: import("immer/dist/internal").WritableDraft<AddressBookEntriesResponse>[];
        displayStandardAddressDetails: import("immer/dist/internal").WritableDraft<{
            displayDetails: boolean;
            addressBookEntryId: number;
        }>;
        totalAddressBookSearchMatchRecords: number;
        isAddressBookDataLoading: boolean;
        allAddressBookCount: number;
        isPollingStarted: boolean;
        skillList: import("immer/dist/internal").WritableDraft<Skills>[];
        showClientDataApiFailedToast: import("immer/dist/internal").WritableDraft<{
            storageExceeded: boolean;
            apiFailed: boolean;
        }>;
        favoritesInDirectory: import("immer/dist/internal").WritableDraft<FavoritesInDirectoryType>;
        favoriteIdsToggled: import("immer/dist/internal").WritableDraft<FavoritesInDirectoryType>;
        storeFavsToastReference: Id | null;
    };
    /**
     * Function to set list of skills in state
     * @param state - AgentState
     * @param action  - PayloadAction<number>
     * @returns It returns current status of agent
     * @example -updateSkillIdSelectedForInteraction(state,action)
     */
    updateSkillIdSelectedForInteraction(state: import("immer/dist/internal").WritableDraft<CcfDirectoryState>, action: PayloadAction<number | null>): {
        skillIdSelectedForInteraction: number | null;
        query: import("immer/dist/internal").WritableDraft<{
            searchBox: string;
            dropDown: string;
            offSetVal: number;
        }>;
        emptySearchFlg: boolean;
        skills: import("immer/dist/internal").WritableDraft<SkillActivityEvent>[];
        digitalSkills: import("immer/dist/internal").WritableDraft<SkillEvent>[];
        isAgentLoading: boolean;
        isSkillsLoading: boolean;
        isTeamsLoading: boolean;
        isDigitalSkillsLoading: boolean;
        isFavoriteAgentsLoading: boolean;
        isFavoriteTeamsLoading: boolean;
        isFavoriteStdAdrsBookLoading: boolean;
        isFavoriteExtDirectoryLoading: boolean;
        agentContacts: import("immer/dist/internal").WritableDraft<Agent>[];
        favoriteAgents: import("immer/dist/internal").WritableDraft<Agent>[];
        favoriteTeams: import("immer/dist/internal").WritableDraft<Team>[];
        favoriteStandardAddressBooks: import("immer/dist/internal").WritableDraft<AddressBooksEntries>[];
        isFavoriteSkillsLoading: boolean;
        isFavoriteDigitalSkillsLoading: boolean;
        favoriteSkills: import("immer/dist/internal").WritableDraft<SkillActivityEvent>[];
        favoriteDigitalSkills: import("immer/dist/internal").WritableDraft<SkillEvent>[];
        favoriteExtDirectoryEntries: import("immer/dist/internal").WritableDraft<DirectoryAdditionalAtrributes>[];
        teams: import("immer/dist/internal").WritableDraft<Team>[];
        skillPollingActive: boolean;
        agentHasMultipleSkills: import("immer/dist/internal").WritableDraft<{
            agentHasMultipleSkillsFlg: boolean;
            res: [];
        }>;
        agentsTeamPollingActive: boolean;
        drillDownToAgent: boolean;
        noStandardEntriesAll: boolean;
        loadingAgentsForTeam: boolean;
        externalDirectories: import("immer/dist/internal").WritableDraft<Directories>;
        externalDirectoryState: boolean;
        directoryEntries: import("immer/dist/internal").WritableDraft<DirectoryAdditionalAtrributes>[];
        isDirectoryEntriesLoading: boolean;
        currentTeamId: string;
        toggleSkillSelector: import("immer/dist/internal").WritableDraft<outboundOptionState>[];
        totalAgentsSearchMatchRecords: number;
        totalTeamsSearchMatchRecords: number;
        totalSkillsSearchMatchRecords: number;
        totalDigitalSkillsSearchMatchRecords: number;
        externalDirectorySubscriptionId: string;
        externalDirectoryDrillDown: boolean;
        totalExternalDirectoryRecordsCount: number;
        selectedDrillDownUserEntry: import("immer/dist/internal").WritableDraft<DirectoryEntryDetails>;
        noAgentDataFound: boolean;
        noTeamDataFound: boolean;
        hideExternalDirectoryData: boolean;
        directoryFocus: boolean;
        directoryRendered: boolean;
        totalAgentCount: number;
        totalTeamCount: number;
        totalSkillCount: number;
        noSkillDataFound: boolean;
        isFullViewDirectory: boolean;
        standardAddressBooks: (import("immer/dist/internal").WritableDraft<AddressBooks> | import("immer/dist/internal").WritableDraft<SAB2AddressBook>)[];
        standardBookEntriesResponse: import("immer/dist/internal").WritableDraft<AddressBookEntriesResponse>;
        standardBookAutoCompleteEntriesResponse: import("immer/dist/internal").WritableDraft<AddressBookEntriesResponse>[];
        displayStandardAddressDetails: import("immer/dist/internal").WritableDraft<{
            displayDetails: boolean;
            addressBookEntryId: number;
        }>;
        totalAddressBookSearchMatchRecords: number;
        isAddressBookDataLoading: boolean;
        allAddressBookCount: number;
        isPollingStarted: boolean;
        skillList: import("immer/dist/internal").WritableDraft<Skills>[];
        showClientDataApiFailedToast: import("immer/dist/internal").WritableDraft<{
            storageExceeded: boolean;
            apiFailed: boolean;
        }>;
        favoritesInDirectory: import("immer/dist/internal").WritableDraft<FavoritesInDirectoryType>;
        favoriteIdsToggled: import("immer/dist/internal").WritableDraft<FavoritesInDirectoryType>;
        storeFavsToastReference: Id | null;
    };
    /**
     * Function to set list of skills in state
     * @param state - AgentState
     * @param action  - PayloadAction<string>
     * @returns It returns current status of agent
     * @example -updateAgentList(state,action)
     */
    updateAgentList(state: import("immer/dist/internal").WritableDraft<CcfDirectoryState>, action: PayloadAction<DirectoryResponse>): void;
    /**
     * Function to update fav in agentContacts list on runtime
     * @param state - AgentState
     * @param action  - PayloadAction<Agent>
     * @returns It returns current status of agent contacts
     * @example -updateFavInContactsList(state,action)
     */
    updateFavInContactsList(state: import("immer/dist/internal").WritableDraft<CcfDirectoryState>, action: PayloadAction<Agent[]>): void;
    /**
     * Function to update fav agent list on runtime
     * @param state - Directory State
     * @param action  - PayloadAction`<Agent[]>`
     * @returns It returns updated fav agent list
     * @example -updateFavAgentList(state,action)
     */
    updateFavAgentList(state: import("immer/dist/internal").WritableDraft<CcfDirectoryState>, action: {
        payload: any;
        type: string;
    }): void;
    /**
     * Function to update fav skills list on runtime
     * @param state - Directory State
     * @param action  - PayloadAction`<SkillActivityEvent[]>`
     * @returns It returns updated fav skills list
     * @example -updateFavSkillsList(state,action)
     */
    updateFavSkillsList(state: import("immer/dist/internal").WritableDraft<CcfDirectoryState>, action: PayloadAction<SkillActivityEvent[]>): void;
    /**
     * Function to update fav digital skills list on runtime
     * @param state - Directory State
     * @param action  - PayloadAction`<SkillEvent[]>`
     * @returns It returns updated fav digital skills list
     * @example -updateFavDigitalSkillsList(state,action)
     */
    updateFavDigitalSkillsList(state: import("immer/dist/internal").WritableDraft<CcfDirectoryState>, action: PayloadAction<SkillEvent[]>): void;
    /**
     * Function to set list of skills in state
     * @param state - AgentState
     * @param action  - PayloadAction<any>
     * @returns It returns current status of agent
     * @example -setSkillList(state,action)
     */
    setSkillList(state: import("immer/dist/internal").WritableDraft<CcfDirectoryState>, action: PayloadAction<SkillActivityResponse>): void;
    /**
     * Function to set list of entries in state
     * @param state - AgentState
     * @param action  - PayloadAction<any>
     * @returns It returns list of entries for selected external directory
     * @example -setExternalDirectoryEntries(state,action)
     */
    setExternalDirectoryEntries(state: import("immer/dist/internal").WritableDraft<CcfDirectoryState>, action: PayloadAction<{
        directoryEntry: DirectoryEntry[];
        subscriptionID: string;
        totalRecords: number;
    }>): void;
    /**
     * Function to set list of entries in state
     * @param state - AgentState
     * @param action  - PayloadAction<any>
     * @returns It returns list of entries for selected external directory
     * @example -updateFavsInExternalDirectoryEntries(state,action)
     */
    updateFavInExtDirectoryEntries(state: import("immer/dist/internal").WritableDraft<CcfDirectoryState>, action: PayloadAction<DirectoryAdditionalAtrributes[]>): void;
    /**
    * Function to update fav team list on runtime
    * @param state - Directory State
    * @param action  - PayloadAction`<Team[]>`
    * @returns It returns updated fav team list
    * ```
    * @example -updateFavExtDirectoryEntriesList(state,action)
    * ```
    */
    updateFavExtDirectoryEntriesList(state: import("immer/dist/internal").WritableDraft<CcfDirectoryState>, action: {
        payload: any;
        type: string;
    }): void;
    /**
     * Function to set list of entries in state
     * @param state - AgentState
     * @param action  - PayloadAction<any>
     * @returns It returns list of entries for selected external directory
     * @example -updateSelecteDrillDownEntry(state,action)
     */
    updateSelectedDrillDownEntry(state: import("immer/dist/internal").WritableDraft<CcfDirectoryState>, action: PayloadAction<DirectoryEntryDetails>): {
        selectedDrillDownUserEntry: DirectoryEntryDetails;
        query: import("immer/dist/internal").WritableDraft<{
            searchBox: string;
            dropDown: string;
            offSetVal: number;
        }>;
        emptySearchFlg: boolean;
        skills: import("immer/dist/internal").WritableDraft<SkillActivityEvent>[];
        digitalSkills: import("immer/dist/internal").WritableDraft<SkillEvent>[];
        isAgentLoading: boolean;
        isSkillsLoading: boolean;
        isTeamsLoading: boolean;
        isDigitalSkillsLoading: boolean;
        isFavoriteAgentsLoading: boolean;
        isFavoriteTeamsLoading: boolean;
        isFavoriteStdAdrsBookLoading: boolean;
        isFavoriteExtDirectoryLoading: boolean;
        agentContacts: import("immer/dist/internal").WritableDraft<Agent>[];
        favoriteAgents: import("immer/dist/internal").WritableDraft<Agent>[];
        favoriteTeams: import("immer/dist/internal").WritableDraft<Team>[];
        favoriteStandardAddressBooks: import("immer/dist/internal").WritableDraft<AddressBooksEntries>[];
        isFavoriteSkillsLoading: boolean;
        isFavoriteDigitalSkillsLoading: boolean;
        favoriteSkills: import("immer/dist/internal").WritableDraft<SkillActivityEvent>[];
        favoriteDigitalSkills: import("immer/dist/internal").WritableDraft<SkillEvent>[];
        favoriteExtDirectoryEntries: import("immer/dist/internal").WritableDraft<DirectoryAdditionalAtrributes>[];
        teams: import("immer/dist/internal").WritableDraft<Team>[];
        skillPollingActive: boolean;
        agentHasMultipleSkills: import("immer/dist/internal").WritableDraft<{
            agentHasMultipleSkillsFlg: boolean;
            res: [];
        }>;
        agentsTeamPollingActive: boolean;
        skillIdSelectedForInteraction: number | null;
        drillDownToAgent: boolean;
        noStandardEntriesAll: boolean;
        loadingAgentsForTeam: boolean;
        externalDirectories: import("immer/dist/internal").WritableDraft<Directories>;
        externalDirectoryState: boolean;
        directoryEntries: import("immer/dist/internal").WritableDraft<DirectoryAdditionalAtrributes>[];
        isDirectoryEntriesLoading: boolean;
        currentTeamId: string;
        toggleSkillSelector: import("immer/dist/internal").WritableDraft<outboundOptionState>[];
        totalAgentsSearchMatchRecords: number;
        totalTeamsSearchMatchRecords: number;
        totalSkillsSearchMatchRecords: number;
        totalDigitalSkillsSearchMatchRecords: number;
        externalDirectorySubscriptionId: string;
        externalDirectoryDrillDown: boolean;
        totalExternalDirectoryRecordsCount: number;
        noAgentDataFound: boolean;
        noTeamDataFound: boolean;
        hideExternalDirectoryData: boolean;
        directoryFocus: boolean;
        directoryRendered: boolean;
        totalAgentCount: number;
        totalTeamCount: number;
        totalSkillCount: number;
        noSkillDataFound: boolean;
        isFullViewDirectory: boolean;
        standardAddressBooks: (import("immer/dist/internal").WritableDraft<AddressBooks> | import("immer/dist/internal").WritableDraft<SAB2AddressBook>)[];
        standardBookEntriesResponse: import("immer/dist/internal").WritableDraft<AddressBookEntriesResponse>;
        standardBookAutoCompleteEntriesResponse: import("immer/dist/internal").WritableDraft<AddressBookEntriesResponse>[];
        displayStandardAddressDetails: import("immer/dist/internal").WritableDraft<{
            displayDetails: boolean;
            addressBookEntryId: number;
        }>;
        totalAddressBookSearchMatchRecords: number;
        isAddressBookDataLoading: boolean;
        allAddressBookCount: number;
        isPollingStarted: boolean;
        skillList: import("immer/dist/internal").WritableDraft<Skills>[];
        showClientDataApiFailedToast: import("immer/dist/internal").WritableDraft<{
            storageExceeded: boolean;
            apiFailed: boolean;
        }>;
        favoritesInDirectory: import("immer/dist/internal").WritableDraft<FavoritesInDirectoryType>;
        favoriteIdsToggled: import("immer/dist/internal").WritableDraft<FavoritesInDirectoryType>;
        storeFavsToastReference: Id | null;
    };
    /**
     * Function to set flag for multi skills in state
     * @param state - externalDirectoryState
     * @param action  - PayloadAction<any>
     * @example -updateExternalDirectoryState(state,action)
     */
    updateExternalDirectoryState(state: import("immer/dist/internal").WritableDraft<CcfDirectoryState>, action: PayloadAction<boolean>): void;
    /**
     * Function to fetch skill list from state when subscription is already in progress
     * @param state - AgentState
     * @param value- value of dropdown
     * @returns It returns current status of directory
     * @example -backToTeamList(state,action)
     */
    backToTeamList(state: import("immer/dist/internal").WritableDraft<CcfDirectoryState>): {
        isTeamsLoading: false;
        isAgentLoading: false;
        query: {
            offSetVal: number;
            searchBox: string;
            dropDown: DirectoryEntities;
        };
        drillDownToAgent: false;
        emptySearchFlg: false;
        currentTeamId: string;
        skills: import("immer/dist/internal").WritableDraft<SkillActivityEvent>[];
        digitalSkills: import("immer/dist/internal").WritableDraft<SkillEvent>[];
        isSkillsLoading: boolean;
        isDigitalSkillsLoading: boolean;
        isFavoriteAgentsLoading: boolean;
        isFavoriteTeamsLoading: boolean;
        isFavoriteStdAdrsBookLoading: boolean;
        isFavoriteExtDirectoryLoading: boolean;
        agentContacts: import("immer/dist/internal").WritableDraft<Agent>[];
        favoriteAgents: import("immer/dist/internal").WritableDraft<Agent>[];
        favoriteTeams: import("immer/dist/internal").WritableDraft<Team>[];
        favoriteStandardAddressBooks: import("immer/dist/internal").WritableDraft<AddressBooksEntries>[];
        isFavoriteSkillsLoading: boolean;
        isFavoriteDigitalSkillsLoading: boolean;
        favoriteSkills: import("immer/dist/internal").WritableDraft<SkillActivityEvent>[];
        favoriteDigitalSkills: import("immer/dist/internal").WritableDraft<SkillEvent>[];
        favoriteExtDirectoryEntries: import("immer/dist/internal").WritableDraft<DirectoryAdditionalAtrributes>[];
        teams: import("immer/dist/internal").WritableDraft<Team>[];
        skillPollingActive: boolean;
        agentHasMultipleSkills: import("immer/dist/internal").WritableDraft<{
            agentHasMultipleSkillsFlg: boolean;
            res: [];
        }>;
        agentsTeamPollingActive: boolean;
        skillIdSelectedForInteraction: number | null;
        noStandardEntriesAll: boolean;
        loadingAgentsForTeam: boolean;
        externalDirectories: import("immer/dist/internal").WritableDraft<Directories>;
        externalDirectoryState: boolean;
        directoryEntries: import("immer/dist/internal").WritableDraft<DirectoryAdditionalAtrributes>[];
        isDirectoryEntriesLoading: boolean;
        toggleSkillSelector: import("immer/dist/internal").WritableDraft<outboundOptionState>[];
        totalAgentsSearchMatchRecords: number;
        totalTeamsSearchMatchRecords: number;
        totalSkillsSearchMatchRecords: number;
        totalDigitalSkillsSearchMatchRecords: number;
        externalDirectorySubscriptionId: string;
        externalDirectoryDrillDown: boolean;
        totalExternalDirectoryRecordsCount: number;
        selectedDrillDownUserEntry: import("immer/dist/internal").WritableDraft<DirectoryEntryDetails>;
        noAgentDataFound: boolean;
        noTeamDataFound: boolean;
        hideExternalDirectoryData: boolean;
        directoryFocus: boolean;
        directoryRendered: boolean;
        totalAgentCount: number;
        totalTeamCount: number;
        totalSkillCount: number;
        noSkillDataFound: boolean;
        isFullViewDirectory: boolean;
        standardAddressBooks: (import("immer/dist/internal").WritableDraft<AddressBooks> | import("immer/dist/internal").WritableDraft<SAB2AddressBook>)[];
        standardBookEntriesResponse: import("immer/dist/internal").WritableDraft<AddressBookEntriesResponse>;
        standardBookAutoCompleteEntriesResponse: import("immer/dist/internal").WritableDraft<AddressBookEntriesResponse>[];
        displayStandardAddressDetails: import("immer/dist/internal").WritableDraft<{
            displayDetails: boolean;
            addressBookEntryId: number;
        }>;
        totalAddressBookSearchMatchRecords: number;
        isAddressBookDataLoading: boolean;
        allAddressBookCount: number;
        isPollingStarted: boolean;
        skillList: import("immer/dist/internal").WritableDraft<Skills>[];
        showClientDataApiFailedToast: import("immer/dist/internal").WritableDraft<{
            storageExceeded: boolean;
            apiFailed: boolean;
        }>;
        favoritesInDirectory: import("immer/dist/internal").WritableDraft<FavoritesInDirectoryType>;
        favoriteIdsToggled: import("immer/dist/internal").WritableDraft<FavoritesInDirectoryType>;
        storeFavsToastReference: Id | null;
    };
    /**
     * Function is used on click of back btn of address book details
     * @param state - Directory State
     * @returns It returns current status of directory
     * @example -backToAddressList(state,action)
     */
    backToAddressList(state: import("immer/dist/internal").WritableDraft<CcfDirectoryState>): {
        query: import("immer/dist/internal").WritableDraft<{
            searchBox: string;
            dropDown: string;
            offSetVal: number;
        }>;
        emptySearchFlg: boolean;
        skills: import("immer/dist/internal").WritableDraft<SkillActivityEvent>[];
        digitalSkills: import("immer/dist/internal").WritableDraft<SkillEvent>[];
        isAgentLoading: boolean;
        isSkillsLoading: boolean;
        isTeamsLoading: boolean;
        isDigitalSkillsLoading: boolean;
        isFavoriteAgentsLoading: boolean;
        isFavoriteTeamsLoading: boolean;
        isFavoriteStdAdrsBookLoading: boolean;
        isFavoriteExtDirectoryLoading: boolean;
        agentContacts: import("immer/dist/internal").WritableDraft<Agent>[];
        favoriteAgents: import("immer/dist/internal").WritableDraft<Agent>[];
        favoriteTeams: import("immer/dist/internal").WritableDraft<Team>[];
        favoriteStandardAddressBooks: import("immer/dist/internal").WritableDraft<AddressBooksEntries>[];
        isFavoriteSkillsLoading: boolean;
        isFavoriteDigitalSkillsLoading: boolean;
        favoriteSkills: import("immer/dist/internal").WritableDraft<SkillActivityEvent>[];
        favoriteDigitalSkills: import("immer/dist/internal").WritableDraft<SkillEvent>[];
        favoriteExtDirectoryEntries: import("immer/dist/internal").WritableDraft<DirectoryAdditionalAtrributes>[];
        teams: import("immer/dist/internal").WritableDraft<Team>[];
        skillPollingActive: boolean;
        agentHasMultipleSkills: import("immer/dist/internal").WritableDraft<{
            agentHasMultipleSkillsFlg: boolean;
            res: [];
        }>;
        agentsTeamPollingActive: boolean;
        skillIdSelectedForInteraction: number | null;
        drillDownToAgent: boolean;
        noStandardEntriesAll: boolean;
        loadingAgentsForTeam: boolean;
        externalDirectories: import("immer/dist/internal").WritableDraft<Directories>;
        externalDirectoryState: boolean;
        directoryEntries: import("immer/dist/internal").WritableDraft<DirectoryAdditionalAtrributes>[];
        isDirectoryEntriesLoading: boolean;
        currentTeamId: string;
        toggleSkillSelector: import("immer/dist/internal").WritableDraft<outboundOptionState>[];
        totalAgentsSearchMatchRecords: number;
        totalTeamsSearchMatchRecords: number;
        totalSkillsSearchMatchRecords: number;
        totalDigitalSkillsSearchMatchRecords: number;
        externalDirectorySubscriptionId: string;
        externalDirectoryDrillDown: boolean;
        totalExternalDirectoryRecordsCount: number;
        selectedDrillDownUserEntry: import("immer/dist/internal").WritableDraft<DirectoryEntryDetails>;
        noAgentDataFound: boolean;
        noTeamDataFound: boolean;
        hideExternalDirectoryData: boolean;
        directoryFocus: boolean;
        directoryRendered: boolean;
        totalAgentCount: number;
        totalTeamCount: number;
        totalSkillCount: number;
        noSkillDataFound: boolean;
        isFullViewDirectory: boolean;
        standardAddressBooks: (import("immer/dist/internal").WritableDraft<AddressBooks> | import("immer/dist/internal").WritableDraft<SAB2AddressBook>)[];
        standardBookEntriesResponse: import("immer/dist/internal").WritableDraft<AddressBookEntriesResponse>;
        standardBookAutoCompleteEntriesResponse: import("immer/dist/internal").WritableDraft<AddressBookEntriesResponse>[];
        displayStandardAddressDetails: import("immer/dist/internal").WritableDraft<{
            displayDetails: boolean;
            addressBookEntryId: number;
        }>;
        totalAddressBookSearchMatchRecords: number;
        isAddressBookDataLoading: boolean;
        allAddressBookCount: number;
        isPollingStarted: boolean;
        skillList: import("immer/dist/internal").WritableDraft<Skills>[];
        showClientDataApiFailedToast: import("immer/dist/internal").WritableDraft<{
            storageExceeded: boolean;
            apiFailed: boolean;
        }>;
        favoritesInDirectory: import("immer/dist/internal").WritableDraft<FavoritesInDirectoryType>;
        favoriteIdsToggled: import("immer/dist/internal").WritableDraft<FavoritesInDirectoryType>;
        storeFavsToastReference: Id | null;
    };
    /**
     * Function to set the drill down flag false and reset teamID
     * @param state - AgentState
     * @param value- value of dropdown
     * @returns It returns current status of directory
     * @example -updateDrillDownToAgentFlag(state,action)
     */
    updateDrillDownToAgentFlag(state: import("immer/dist/internal").WritableDraft<CcfDirectoryState>, action: {
        payload: any;
        type: string;
    }): {
        drillDownToAgent: any;
        currentTeamId: string;
        query: import("immer/dist/internal").WritableDraft<{
            searchBox: string;
            dropDown: string;
            offSetVal: number;
        }>;
        emptySearchFlg: boolean;
        skills: import("immer/dist/internal").WritableDraft<SkillActivityEvent>[];
        digitalSkills: import("immer/dist/internal").WritableDraft<SkillEvent>[];
        isAgentLoading: boolean;
        isSkillsLoading: boolean;
        isTeamsLoading: boolean;
        isDigitalSkillsLoading: boolean;
        isFavoriteAgentsLoading: boolean;
        isFavoriteTeamsLoading: boolean;
        isFavoriteStdAdrsBookLoading: boolean;
        isFavoriteExtDirectoryLoading: boolean;
        agentContacts: import("immer/dist/internal").WritableDraft<Agent>[];
        favoriteAgents: import("immer/dist/internal").WritableDraft<Agent>[];
        favoriteTeams: import("immer/dist/internal").WritableDraft<Team>[];
        favoriteStandardAddressBooks: import("immer/dist/internal").WritableDraft<AddressBooksEntries>[];
        isFavoriteSkillsLoading: boolean;
        isFavoriteDigitalSkillsLoading: boolean;
        favoriteSkills: import("immer/dist/internal").WritableDraft<SkillActivityEvent>[];
        favoriteDigitalSkills: import("immer/dist/internal").WritableDraft<SkillEvent>[];
        favoriteExtDirectoryEntries: import("immer/dist/internal").WritableDraft<DirectoryAdditionalAtrributes>[];
        teams: import("immer/dist/internal").WritableDraft<Team>[];
        skillPollingActive: boolean;
        agentHasMultipleSkills: import("immer/dist/internal").WritableDraft<{
            agentHasMultipleSkillsFlg: boolean;
            res: [];
        }>;
        agentsTeamPollingActive: boolean;
        skillIdSelectedForInteraction: number | null;
        noStandardEntriesAll: boolean;
        loadingAgentsForTeam: boolean;
        externalDirectories: import("immer/dist/internal").WritableDraft<Directories>;
        externalDirectoryState: boolean;
        directoryEntries: import("immer/dist/internal").WritableDraft<DirectoryAdditionalAtrributes>[];
        isDirectoryEntriesLoading: boolean;
        toggleSkillSelector: import("immer/dist/internal").WritableDraft<outboundOptionState>[];
        totalAgentsSearchMatchRecords: number;
        totalTeamsSearchMatchRecords: number;
        totalSkillsSearchMatchRecords: number;
        totalDigitalSkillsSearchMatchRecords: number;
        externalDirectorySubscriptionId: string;
        externalDirectoryDrillDown: boolean;
        totalExternalDirectoryRecordsCount: number;
        selectedDrillDownUserEntry: import("immer/dist/internal").WritableDraft<DirectoryEntryDetails>;
        noAgentDataFound: boolean;
        noTeamDataFound: boolean;
        hideExternalDirectoryData: boolean;
        directoryFocus: boolean;
        directoryRendered: boolean;
        totalAgentCount: number;
        totalTeamCount: number;
        totalSkillCount: number;
        noSkillDataFound: boolean;
        isFullViewDirectory: boolean;
        standardAddressBooks: (import("immer/dist/internal").WritableDraft<AddressBooks> | import("immer/dist/internal").WritableDraft<SAB2AddressBook>)[];
        standardBookEntriesResponse: import("immer/dist/internal").WritableDraft<AddressBookEntriesResponse>;
        standardBookAutoCompleteEntriesResponse: import("immer/dist/internal").WritableDraft<AddressBookEntriesResponse>[];
        displayStandardAddressDetails: import("immer/dist/internal").WritableDraft<{
            displayDetails: boolean;
            addressBookEntryId: number;
        }>;
        totalAddressBookSearchMatchRecords: number;
        isAddressBookDataLoading: boolean;
        allAddressBookCount: number;
        isPollingStarted: boolean;
        skillList: import("immer/dist/internal").WritableDraft<Skills>[];
        showClientDataApiFailedToast: import("immer/dist/internal").WritableDraft<{
            storageExceeded: boolean;
            apiFailed: boolean;
        }>;
        favoritesInDirectory: import("immer/dist/internal").WritableDraft<FavoritesInDirectoryType>;
        favoriteIdsToggled: import("immer/dist/internal").WritableDraft<FavoritesInDirectoryType>;
        storeFavsToastReference: Id | null;
    };
    /**
     * Function to set list of skills in state
     * @param state - AgentState
     * @param action  - PayloadAction<string>
     * @returns It returns current status of agent
     * @example -updateTeamList(state,action)
     */
    updateTeamList(state: import("immer/dist/internal").WritableDraft<CcfDirectoryState>, action: PayloadAction<DirectoryResponse>): void;
    /**
     * Function to update fav in team list on runtime
     * @param state - AgentState
     * @param action  - PayloadAction<Team>
     * @returns It returns current status of teams
     * ```
     * @example -updateFavInTeamsList(state,action)
     * ```
     */
    updateFavInTeamsList(state: import("immer/dist/internal").WritableDraft<CcfDirectoryState>, action: PayloadAction<Team[]>): void;
    /**
     * Function to update fav in agentContacts list on runtime
     * @param state - AgentState
     * @param action  - PayloadAction<Agent>
     * @returns It returns current status of agent contacts
     * @example -updateFavInContactsList(state,action)
     */
    updateFavInSkillsList(state: import("immer/dist/internal").WritableDraft<CcfDirectoryState>, action: PayloadAction<SkillActivityEvent[]>): void;
    /**
     * Function to update fav in agentContacts list on runtime
     * @param state - AgentState
     * @param action  - PayloadAction<Agent>
     * @returns It returns current status of agent contacts
     * @example -updateFavInContactsList(state,action)
     */
    updateFavInDigitalSkillsList(state: import("immer/dist/internal").WritableDraft<CcfDirectoryState>, action: PayloadAction<SkillEvent[]>): void;
    /**
     * Function to update fav team list on runtime
     * @param state - Directory State
     * @param action  - PayloadAction`<Team[]>`
     * @returns It returns updated fav team list
     * ```
     * @example -updateFavTeamList(state,action)
     * ```
     */
    updateFavTeamList(state: import("immer/dist/internal").WritableDraft<CcfDirectoryState>, action: {
        payload: any;
        type: string;
    }): void;
    /**
     * Function to update fav in standard address book entries list on runtime
     * @param state - Directory State
     * @param action  - PayloadAction`<AddressBooksEntries[]>`
     * @returns It returns current status of standard address book entries
     * @example - updateFavInStandardAddressBookEntries(state, action)
     */
    updateFavInStandardAddressBookEntries(state: import("immer/dist/internal").WritableDraft<CcfDirectoryState>, action: PayloadAction<AddressBooksEntries[]>): void;
    /**
    * Updates the favorite list for standard address book entries.
    * @param state - Directory State
    * @param action - PayloadAction`<AddressBooksEntries[]>`
    * @returns It returns updated fav addressbook list
    * ```
    * @example - updateFavoriteListForStandardAddressBook(state, action)
    * ```
    */
    updateFavoriteListForStandardAddressBook(state: import("immer/dist/internal").WritableDraft<CcfDirectoryState>, action: PayloadAction<AddressBooksEntries[]>): void;
    /**
    * Function to update the favorite address book list on runtime.
    * @param state - Directory State
    * @param action - PayloadAction`<AddressBooks[]>`
    * @returns It returns updated fav addressbooks
    * ```
    * @example - updateFavAddressBookList(state, action)
    * ```
    */
    updateFavAddressBookList(state: import("immer/dist/internal").WritableDraft<CcfDirectoryState>, action: {
        payload: any;
        type: string;
    }): void;
    /**
     * Function to set list of digital skills in state
     * @param state - AgentState
     * @param action  - PayloadAction<DirectoryResponse>
     * @example - updateDigitalSkillList(state,action)
     */
    updateDigitalSkillList(state: import("immer/dist/internal").WritableDraft<CcfDirectoryState>, action: PayloadAction<DirectoryResponse>): void;
    /**
     * Function to set flag for multi skills in state
     * @param state - AgentState
     * @param action  - PayloadAction<any>
     * @example -updateAgentMultiSkillFlag(state,action)
     */
    updateAgentMultiSkillFlag(state: import("immer/dist/internal").WritableDraft<CcfDirectoryState>, action: PayloadAction<boolean>): void;
    /**
     * Function to set flag for multi skills in state
     * @param state - AgentState
     * @param action  - PayloadAction<any>
     * @example -updateAgentMultiSkillFlag(state,action)
     */
    hideExternalDirectoryData(state: import("immer/dist/internal").WritableDraft<CcfDirectoryState>, action: PayloadAction<boolean>): void;
    /**
     * Function to set flag for multi skills in state
     * @param state - AgentState
     * @param action  - PayloadAction<any>
     * @example -updateAgentMultiSkillFlag(state,action)
     */
    flushAllData(state: import("immer/dist/internal").WritableDraft<CcfDirectoryState>): void;
    /**
     * Function to set flag for multi skills in state
     * @param state - AgentState
     * @param action  - PayloadAction<any>
     * @example -updateAgentMultiSkillFlag(state,action)
     */
    flushAllDataExceptTeams(state: import("immer/dist/internal").WritableDraft<CcfDirectoryState>): void;
    /**
     * Function to clear data for agentContacts/agentList
     * @param state - AgentState
     * @param action  - PayloadAction<any>
     * @example -flushDataForAgentDrilldown(state)
     */
    flushDataForAgentDrilldown(state: import("immer/dist/internal").WritableDraft<CcfDirectoryState>): void;
    /**
     * Function to update searchText in state
     * @param state - AgentState
     * @param action  - PayloadAction<any>
     * @example - updateSearchBoxValue(state,action)
     */
    updateSearchBoxValue(state: import("immer/dist/internal").WritableDraft<CcfDirectoryState>, action: PayloadAction<string>): void;
    /**
     * Function to activate empty search by updating emptySearchFlg in state
     * @param state - AgentState
     * @param action  - PayloadAction<any>
     * @example - updateEmptySearchState(state,action)
     */
    updateEmptySearchState(state: import("immer/dist/internal").WritableDraft<CcfDirectoryState>, action: PayloadAction<boolean>): void;
    /**
     * Function to update toggle for outbound call options
     * @param state - AgentState
     * @param action  - PayloadAction<boolean>
     * @example - updateSkillSelectorToggle(state,action)
     */
    updateSkillSelectorToggle(state: import("immer/dist/internal").WritableDraft<CcfDirectoryState>, action: PayloadAction<outboundOptionState>): void;
    /**
     * Function to update all toggle states for outbound call options
     * @param state - AgentState
     * @param action  - PayloadAction<boolean>
     * @example - updateAllToggleStates(state,action)
     */
    updateAllToggleStates(state: import("immer/dist/internal").WritableDraft<CcfDirectoryState>, action: PayloadAction<outboundOptionState>): void;
    /**
     * Function to set the External Directory drill down flag
     * @param state - DirectoryState
     * @param action  - PayloadAction<boolean>
     * @returns set the value of External Directory drill down flag
     * @example -setExternalDirectoryDrillDown(state,action)
     */
    setExternalDirectoryDrillDown(state: import("immer/dist/internal").WritableDraft<CcfDirectoryState>, action: PayloadAction<boolean>): void;
    /** Used to search in the directory list
     * @example -searchDirectories();
     *
     */
    searchDirectories(state: import("immer/dist/internal").WritableDraft<CcfDirectoryState>, action: PayloadAction<SearchExternalDirectoryRequest>): void;
    /**
     * Method to set the focus in directory when it is dispatched
     * @param state - DirectoryState
     * @example - dispatch(setFocusInDirectory));
     * @returns
     */
    setFocusInDirectory(state: import("immer/dist/internal").WritableDraft<CcfDirectoryState>, action: PayloadAction<boolean>): {
        directoryFocus: boolean;
        query: import("immer/dist/internal").WritableDraft<{
            searchBox: string;
            dropDown: string;
            offSetVal: number;
        }>;
        emptySearchFlg: boolean;
        skills: import("immer/dist/internal").WritableDraft<SkillActivityEvent>[];
        digitalSkills: import("immer/dist/internal").WritableDraft<SkillEvent>[];
        isAgentLoading: boolean;
        isSkillsLoading: boolean;
        isTeamsLoading: boolean;
        isDigitalSkillsLoading: boolean;
        isFavoriteAgentsLoading: boolean;
        isFavoriteTeamsLoading: boolean;
        isFavoriteStdAdrsBookLoading: boolean;
        isFavoriteExtDirectoryLoading: boolean;
        agentContacts: import("immer/dist/internal").WritableDraft<Agent>[];
        favoriteAgents: import("immer/dist/internal").WritableDraft<Agent>[];
        favoriteTeams: import("immer/dist/internal").WritableDraft<Team>[];
        favoriteStandardAddressBooks: import("immer/dist/internal").WritableDraft<AddressBooksEntries>[];
        isFavoriteSkillsLoading: boolean;
        isFavoriteDigitalSkillsLoading: boolean;
        favoriteSkills: import("immer/dist/internal").WritableDraft<SkillActivityEvent>[];
        favoriteDigitalSkills: import("immer/dist/internal").WritableDraft<SkillEvent>[];
        favoriteExtDirectoryEntries: import("immer/dist/internal").WritableDraft<DirectoryAdditionalAtrributes>[];
        teams: import("immer/dist/internal").WritableDraft<Team>[];
        skillPollingActive: boolean;
        agentHasMultipleSkills: import("immer/dist/internal").WritableDraft<{
            agentHasMultipleSkillsFlg: boolean;
            res: [];
        }>;
        agentsTeamPollingActive: boolean;
        skillIdSelectedForInteraction: number | null;
        drillDownToAgent: boolean;
        noStandardEntriesAll: boolean;
        loadingAgentsForTeam: boolean;
        externalDirectories: import("immer/dist/internal").WritableDraft<Directories>;
        externalDirectoryState: boolean;
        directoryEntries: import("immer/dist/internal").WritableDraft<DirectoryAdditionalAtrributes>[];
        isDirectoryEntriesLoading: boolean;
        currentTeamId: string;
        toggleSkillSelector: import("immer/dist/internal").WritableDraft<outboundOptionState>[];
        totalAgentsSearchMatchRecords: number;
        totalTeamsSearchMatchRecords: number;
        totalSkillsSearchMatchRecords: number;
        totalDigitalSkillsSearchMatchRecords: number;
        externalDirectorySubscriptionId: string;
        externalDirectoryDrillDown: boolean;
        totalExternalDirectoryRecordsCount: number;
        selectedDrillDownUserEntry: import("immer/dist/internal").WritableDraft<DirectoryEntryDetails>;
        noAgentDataFound: boolean;
        noTeamDataFound: boolean;
        hideExternalDirectoryData: boolean;
        directoryRendered: boolean;
        totalAgentCount: number;
        totalTeamCount: number;
        totalSkillCount: number;
        noSkillDataFound: boolean;
        isFullViewDirectory: boolean;
        standardAddressBooks: (import("immer/dist/internal").WritableDraft<AddressBooks> | import("immer/dist/internal").WritableDraft<SAB2AddressBook>)[];
        standardBookEntriesResponse: import("immer/dist/internal").WritableDraft<AddressBookEntriesResponse>;
        standardBookAutoCompleteEntriesResponse: import("immer/dist/internal").WritableDraft<AddressBookEntriesResponse>[];
        displayStandardAddressDetails: import("immer/dist/internal").WritableDraft<{
            displayDetails: boolean;
            addressBookEntryId: number;
        }>;
        totalAddressBookSearchMatchRecords: number;
        isAddressBookDataLoading: boolean;
        allAddressBookCount: number;
        isPollingStarted: boolean;
        skillList: import("immer/dist/internal").WritableDraft<Skills>[];
        showClientDataApiFailedToast: import("immer/dist/internal").WritableDraft<{
            storageExceeded: boolean;
            apiFailed: boolean;
        }>;
        favoritesInDirectory: import("immer/dist/internal").WritableDraft<FavoritesInDirectoryType>;
        favoriteIdsToggled: import("immer/dist/internal").WritableDraft<FavoritesInDirectoryType>;
        storeFavsToastReference: Id | null;
    };
    /**
     * Method to check if directory is mounted
     * @param state - DirectoryState
     * @example - dispatch(setDirectoryRendered(true));
     * @returns
     */
    setDirectoryRendered(state: import("immer/dist/internal").WritableDraft<CcfDirectoryState>, action: PayloadAction<boolean>): {
        directoryRendered: boolean;
        query: import("immer/dist/internal").WritableDraft<{
            searchBox: string;
            dropDown: string;
            offSetVal: number;
        }>;
        emptySearchFlg: boolean;
        skills: import("immer/dist/internal").WritableDraft<SkillActivityEvent>[];
        digitalSkills: import("immer/dist/internal").WritableDraft<SkillEvent>[];
        isAgentLoading: boolean;
        isSkillsLoading: boolean;
        isTeamsLoading: boolean;
        isDigitalSkillsLoading: boolean;
        isFavoriteAgentsLoading: boolean;
        isFavoriteTeamsLoading: boolean;
        isFavoriteStdAdrsBookLoading: boolean;
        isFavoriteExtDirectoryLoading: boolean;
        agentContacts: import("immer/dist/internal").WritableDraft<Agent>[];
        favoriteAgents: import("immer/dist/internal").WritableDraft<Agent>[];
        favoriteTeams: import("immer/dist/internal").WritableDraft<Team>[];
        favoriteStandardAddressBooks: import("immer/dist/internal").WritableDraft<AddressBooksEntries>[];
        isFavoriteSkillsLoading: boolean;
        isFavoriteDigitalSkillsLoading: boolean;
        favoriteSkills: import("immer/dist/internal").WritableDraft<SkillActivityEvent>[];
        favoriteDigitalSkills: import("immer/dist/internal").WritableDraft<SkillEvent>[];
        favoriteExtDirectoryEntries: import("immer/dist/internal").WritableDraft<DirectoryAdditionalAtrributes>[];
        teams: import("immer/dist/internal").WritableDraft<Team>[];
        skillPollingActive: boolean;
        agentHasMultipleSkills: import("immer/dist/internal").WritableDraft<{
            agentHasMultipleSkillsFlg: boolean;
            res: [];
        }>;
        agentsTeamPollingActive: boolean;
        skillIdSelectedForInteraction: number | null;
        drillDownToAgent: boolean;
        noStandardEntriesAll: boolean;
        loadingAgentsForTeam: boolean;
        externalDirectories: import("immer/dist/internal").WritableDraft<Directories>;
        externalDirectoryState: boolean;
        directoryEntries: import("immer/dist/internal").WritableDraft<DirectoryAdditionalAtrributes>[];
        isDirectoryEntriesLoading: boolean;
        currentTeamId: string;
        toggleSkillSelector: import("immer/dist/internal").WritableDraft<outboundOptionState>[];
        totalAgentsSearchMatchRecords: number;
        totalTeamsSearchMatchRecords: number;
        totalSkillsSearchMatchRecords: number;
        totalDigitalSkillsSearchMatchRecords: number;
        externalDirectorySubscriptionId: string;
        externalDirectoryDrillDown: boolean;
        totalExternalDirectoryRecordsCount: number;
        selectedDrillDownUserEntry: import("immer/dist/internal").WritableDraft<DirectoryEntryDetails>;
        noAgentDataFound: boolean;
        noTeamDataFound: boolean;
        hideExternalDirectoryData: boolean;
        directoryFocus: boolean;
        totalAgentCount: number;
        totalTeamCount: number;
        totalSkillCount: number;
        noSkillDataFound: boolean;
        isFullViewDirectory: boolean;
        standardAddressBooks: (import("immer/dist/internal").WritableDraft<AddressBooks> | import("immer/dist/internal").WritableDraft<SAB2AddressBook>)[];
        standardBookEntriesResponse: import("immer/dist/internal").WritableDraft<AddressBookEntriesResponse>;
        standardBookAutoCompleteEntriesResponse: import("immer/dist/internal").WritableDraft<AddressBookEntriesResponse>[];
        displayStandardAddressDetails: import("immer/dist/internal").WritableDraft<{
            displayDetails: boolean;
            addressBookEntryId: number;
        }>;
        totalAddressBookSearchMatchRecords: number;
        isAddressBookDataLoading: boolean;
        allAddressBookCount: number;
        isPollingStarted: boolean;
        skillList: import("immer/dist/internal").WritableDraft<Skills>[];
        showClientDataApiFailedToast: import("immer/dist/internal").WritableDraft<{
            storageExceeded: boolean;
            apiFailed: boolean;
        }>;
        favoritesInDirectory: import("immer/dist/internal").WritableDraft<FavoritesInDirectoryType>;
        favoriteIdsToggled: import("immer/dist/internal").WritableDraft<FavoritesInDirectoryType>;
        storeFavsToastReference: Id | null;
    };
    /**
    *Method to update the flag whether its a full view directory view or integrated
    @param state - DirectoryState
    @example - dispatch(updateIsFullViewFlg)
    @returns
    **/
    updateIsFullViewFlg(state: import("immer/dist/internal").WritableDraft<CcfDirectoryState>, action: PayloadAction<boolean>): {
        isFullViewDirectory: boolean;
        query: import("immer/dist/internal").WritableDraft<{
            searchBox: string;
            dropDown: string;
            offSetVal: number;
        }>;
        emptySearchFlg: boolean;
        skills: import("immer/dist/internal").WritableDraft<SkillActivityEvent>[];
        digitalSkills: import("immer/dist/internal").WritableDraft<SkillEvent>[];
        isAgentLoading: boolean;
        isSkillsLoading: boolean;
        isTeamsLoading: boolean;
        isDigitalSkillsLoading: boolean;
        isFavoriteAgentsLoading: boolean;
        isFavoriteTeamsLoading: boolean;
        isFavoriteStdAdrsBookLoading: boolean;
        isFavoriteExtDirectoryLoading: boolean;
        agentContacts: import("immer/dist/internal").WritableDraft<Agent>[];
        favoriteAgents: import("immer/dist/internal").WritableDraft<Agent>[];
        favoriteTeams: import("immer/dist/internal").WritableDraft<Team>[];
        favoriteStandardAddressBooks: import("immer/dist/internal").WritableDraft<AddressBooksEntries>[];
        isFavoriteSkillsLoading: boolean;
        isFavoriteDigitalSkillsLoading: boolean;
        favoriteSkills: import("immer/dist/internal").WritableDraft<SkillActivityEvent>[];
        favoriteDigitalSkills: import("immer/dist/internal").WritableDraft<SkillEvent>[];
        favoriteExtDirectoryEntries: import("immer/dist/internal").WritableDraft<DirectoryAdditionalAtrributes>[];
        teams: import("immer/dist/internal").WritableDraft<Team>[];
        skillPollingActive: boolean;
        agentHasMultipleSkills: import("immer/dist/internal").WritableDraft<{
            agentHasMultipleSkillsFlg: boolean;
            res: [];
        }>;
        agentsTeamPollingActive: boolean;
        skillIdSelectedForInteraction: number | null;
        drillDownToAgent: boolean;
        noStandardEntriesAll: boolean;
        loadingAgentsForTeam: boolean;
        externalDirectories: import("immer/dist/internal").WritableDraft<Directories>;
        externalDirectoryState: boolean;
        directoryEntries: import("immer/dist/internal").WritableDraft<DirectoryAdditionalAtrributes>[];
        isDirectoryEntriesLoading: boolean;
        currentTeamId: string;
        toggleSkillSelector: import("immer/dist/internal").WritableDraft<outboundOptionState>[];
        totalAgentsSearchMatchRecords: number;
        totalTeamsSearchMatchRecords: number;
        totalSkillsSearchMatchRecords: number;
        totalDigitalSkillsSearchMatchRecords: number;
        externalDirectorySubscriptionId: string;
        externalDirectoryDrillDown: boolean;
        totalExternalDirectoryRecordsCount: number;
        selectedDrillDownUserEntry: import("immer/dist/internal").WritableDraft<DirectoryEntryDetails>;
        noAgentDataFound: boolean;
        noTeamDataFound: boolean;
        hideExternalDirectoryData: boolean;
        directoryFocus: boolean;
        directoryRendered: boolean;
        totalAgentCount: number;
        totalTeamCount: number;
        totalSkillCount: number;
        noSkillDataFound: boolean;
        standardAddressBooks: (import("immer/dist/internal").WritableDraft<AddressBooks> | import("immer/dist/internal").WritableDraft<SAB2AddressBook>)[];
        standardBookEntriesResponse: import("immer/dist/internal").WritableDraft<AddressBookEntriesResponse>;
        standardBookAutoCompleteEntriesResponse: import("immer/dist/internal").WritableDraft<AddressBookEntriesResponse>[];
        displayStandardAddressDetails: import("immer/dist/internal").WritableDraft<{
            displayDetails: boolean;
            addressBookEntryId: number;
        }>;
        totalAddressBookSearchMatchRecords: number;
        isAddressBookDataLoading: boolean;
        allAddressBookCount: number;
        isPollingStarted: boolean;
        skillList: import("immer/dist/internal").WritableDraft<Skills>[];
        showClientDataApiFailedToast: import("immer/dist/internal").WritableDraft<{
            storageExceeded: boolean;
            apiFailed: boolean;
        }>;
        favoritesInDirectory: import("immer/dist/internal").WritableDraft<FavoritesInDirectoryType>;
        favoriteIdsToggled: import("immer/dist/internal").WritableDraft<FavoritesInDirectoryType>;
        storeFavsToastReference: Id | null;
    };
    /**
     * Function to set flag to display details for SAB
     * @param state - displayStandardAddressDetails
     * @param action  - PayloadAction<number>
     * @example -displayStandardAddressDetails(state,action)
     */
    displayStandardAddressDetails(state: import("immer/dist/internal").WritableDraft<CcfDirectoryState>, action: PayloadAction<DisplayStandardBookDetails>): void;
    /**
     * Function use to maintain the flag for all section when no data returned.
     * @param state - standardEntriesCountForAll
     * @param action  - PayloadAction<boolean>
     * @example -standardEntriesCountForAll(state,action)
     */
    standardEntriesCountForAll(state: import("immer/dist/internal").WritableDraft<CcfDirectoryState>, action: PayloadAction<boolean>): void;
    /**
     * Function used to get All Standard Address book Entries
     * @param state - updateStandardAddressBookEntries
     * @param action - Address Book Response from middleware
     * @example - updateStandardAddressBookEntries(state,action)
     */
    updateStandardAddressBookEntries(state: import("immer/dist/internal").WritableDraft<CcfDirectoryState>, action: {
        payload: any;
        type: string;
    }): void;
    /**
     * Method used to set state for address book loading for all section
     * @param state - DirectoryState
     * @example - dispatch(isAddressBookLoading));
     * @returns
     */
    isAddressBookLoading(state: import("immer/dist/internal").WritableDraft<CcfDirectoryState>, action: PayloadAction<boolean>): {
        isAddressBookDataLoading: boolean;
        query: import("immer/dist/internal").WritableDraft<{
            searchBox: string;
            dropDown: string;
            offSetVal: number;
        }>;
        emptySearchFlg: boolean;
        skills: import("immer/dist/internal").WritableDraft<SkillActivityEvent>[];
        digitalSkills: import("immer/dist/internal").WritableDraft<SkillEvent>[];
        isAgentLoading: boolean;
        isSkillsLoading: boolean;
        isTeamsLoading: boolean;
        isDigitalSkillsLoading: boolean;
        isFavoriteAgentsLoading: boolean;
        isFavoriteTeamsLoading: boolean;
        isFavoriteStdAdrsBookLoading: boolean;
        isFavoriteExtDirectoryLoading: boolean;
        agentContacts: import("immer/dist/internal").WritableDraft<Agent>[];
        favoriteAgents: import("immer/dist/internal").WritableDraft<Agent>[];
        favoriteTeams: import("immer/dist/internal").WritableDraft<Team>[];
        favoriteStandardAddressBooks: import("immer/dist/internal").WritableDraft<AddressBooksEntries>[];
        isFavoriteSkillsLoading: boolean;
        isFavoriteDigitalSkillsLoading: boolean;
        favoriteSkills: import("immer/dist/internal").WritableDraft<SkillActivityEvent>[];
        favoriteDigitalSkills: import("immer/dist/internal").WritableDraft<SkillEvent>[];
        favoriteExtDirectoryEntries: import("immer/dist/internal").WritableDraft<DirectoryAdditionalAtrributes>[];
        teams: import("immer/dist/internal").WritableDraft<Team>[];
        skillPollingActive: boolean;
        agentHasMultipleSkills: import("immer/dist/internal").WritableDraft<{
            agentHasMultipleSkillsFlg: boolean;
            res: [];
        }>;
        agentsTeamPollingActive: boolean;
        skillIdSelectedForInteraction: number | null;
        drillDownToAgent: boolean;
        noStandardEntriesAll: boolean;
        loadingAgentsForTeam: boolean;
        externalDirectories: import("immer/dist/internal").WritableDraft<Directories>;
        externalDirectoryState: boolean;
        directoryEntries: import("immer/dist/internal").WritableDraft<DirectoryAdditionalAtrributes>[];
        isDirectoryEntriesLoading: boolean;
        currentTeamId: string;
        toggleSkillSelector: import("immer/dist/internal").WritableDraft<outboundOptionState>[];
        totalAgentsSearchMatchRecords: number;
        totalTeamsSearchMatchRecords: number;
        totalSkillsSearchMatchRecords: number;
        totalDigitalSkillsSearchMatchRecords: number;
        externalDirectorySubscriptionId: string;
        externalDirectoryDrillDown: boolean;
        totalExternalDirectoryRecordsCount: number;
        selectedDrillDownUserEntry: import("immer/dist/internal").WritableDraft<DirectoryEntryDetails>;
        noAgentDataFound: boolean;
        noTeamDataFound: boolean;
        hideExternalDirectoryData: boolean;
        directoryFocus: boolean;
        directoryRendered: boolean;
        totalAgentCount: number;
        totalTeamCount: number;
        totalSkillCount: number;
        noSkillDataFound: boolean;
        isFullViewDirectory: boolean;
        standardAddressBooks: (import("immer/dist/internal").WritableDraft<AddressBooks> | import("immer/dist/internal").WritableDraft<SAB2AddressBook>)[];
        standardBookEntriesResponse: import("immer/dist/internal").WritableDraft<AddressBookEntriesResponse>;
        standardBookAutoCompleteEntriesResponse: import("immer/dist/internal").WritableDraft<AddressBookEntriesResponse>[];
        displayStandardAddressDetails: import("immer/dist/internal").WritableDraft<{
            displayDetails: boolean;
            addressBookEntryId: number;
        }>;
        totalAddressBookSearchMatchRecords: number;
        allAddressBookCount: number;
        isPollingStarted: boolean;
        skillList: import("immer/dist/internal").WritableDraft<Skills>[];
        showClientDataApiFailedToast: import("immer/dist/internal").WritableDraft<{
            storageExceeded: boolean;
            apiFailed: boolean;
        }>;
        favoritesInDirectory: import("immer/dist/internal").WritableDraft<FavoritesInDirectoryType>;
        favoriteIdsToggled: import("immer/dist/internal").WritableDraft<FavoritesInDirectoryType>;
        storeFavsToastReference: Id | null;
    };
    /**
     * Method used to set error toast for client data API failure
     * @param state - DirectoryState
     * @example -
     * ```
     * dispatch(clientDataApiFailed(false)));
     * ```
     * @returns
     */
    clientDataApiFailed(state: import("immer/dist/internal").WritableDraft<CcfDirectoryState>, action: PayloadAction<{
        storageExceeded: boolean;
        apiFailed: boolean;
    }>): {
        showClientDataApiFailedToast: {
            storageExceeded: boolean;
            apiFailed: boolean;
        };
        query: import("immer/dist/internal").WritableDraft<{
            searchBox: string;
            dropDown: string;
            offSetVal: number;
        }>;
        emptySearchFlg: boolean;
        skills: import("immer/dist/internal").WritableDraft<SkillActivityEvent>[];
        digitalSkills: import("immer/dist/internal").WritableDraft<SkillEvent>[];
        isAgentLoading: boolean;
        isSkillsLoading: boolean;
        isTeamsLoading: boolean;
        isDigitalSkillsLoading: boolean;
        isFavoriteAgentsLoading: boolean;
        isFavoriteTeamsLoading: boolean;
        isFavoriteStdAdrsBookLoading: boolean;
        isFavoriteExtDirectoryLoading: boolean;
        agentContacts: import("immer/dist/internal").WritableDraft<Agent>[];
        favoriteAgents: import("immer/dist/internal").WritableDraft<Agent>[];
        favoriteTeams: import("immer/dist/internal").WritableDraft<Team>[];
        favoriteStandardAddressBooks: import("immer/dist/internal").WritableDraft<AddressBooksEntries>[];
        isFavoriteSkillsLoading: boolean;
        isFavoriteDigitalSkillsLoading: boolean;
        favoriteSkills: import("immer/dist/internal").WritableDraft<SkillActivityEvent>[];
        favoriteDigitalSkills: import("immer/dist/internal").WritableDraft<SkillEvent>[];
        favoriteExtDirectoryEntries: import("immer/dist/internal").WritableDraft<DirectoryAdditionalAtrributes>[];
        teams: import("immer/dist/internal").WritableDraft<Team>[];
        skillPollingActive: boolean;
        agentHasMultipleSkills: import("immer/dist/internal").WritableDraft<{
            agentHasMultipleSkillsFlg: boolean;
            res: [];
        }>;
        agentsTeamPollingActive: boolean;
        skillIdSelectedForInteraction: number | null;
        drillDownToAgent: boolean;
        noStandardEntriesAll: boolean;
        loadingAgentsForTeam: boolean;
        externalDirectories: import("immer/dist/internal").WritableDraft<Directories>;
        externalDirectoryState: boolean;
        directoryEntries: import("immer/dist/internal").WritableDraft<DirectoryAdditionalAtrributes>[];
        isDirectoryEntriesLoading: boolean;
        currentTeamId: string;
        toggleSkillSelector: import("immer/dist/internal").WritableDraft<outboundOptionState>[];
        totalAgentsSearchMatchRecords: number;
        totalTeamsSearchMatchRecords: number;
        totalSkillsSearchMatchRecords: number;
        totalDigitalSkillsSearchMatchRecords: number;
        externalDirectorySubscriptionId: string;
        externalDirectoryDrillDown: boolean;
        totalExternalDirectoryRecordsCount: number;
        selectedDrillDownUserEntry: import("immer/dist/internal").WritableDraft<DirectoryEntryDetails>;
        noAgentDataFound: boolean;
        noTeamDataFound: boolean;
        hideExternalDirectoryData: boolean;
        directoryFocus: boolean;
        directoryRendered: boolean;
        totalAgentCount: number;
        totalTeamCount: number;
        totalSkillCount: number;
        noSkillDataFound: boolean;
        isFullViewDirectory: boolean;
        standardAddressBooks: (import("immer/dist/internal").WritableDraft<AddressBooks> | import("immer/dist/internal").WritableDraft<SAB2AddressBook>)[];
        standardBookEntriesResponse: import("immer/dist/internal").WritableDraft<AddressBookEntriesResponse>;
        standardBookAutoCompleteEntriesResponse: import("immer/dist/internal").WritableDraft<AddressBookEntriesResponse>[];
        displayStandardAddressDetails: import("immer/dist/internal").WritableDraft<{
            displayDetails: boolean;
            addressBookEntryId: number;
        }>;
        totalAddressBookSearchMatchRecords: number;
        isAddressBookDataLoading: boolean;
        allAddressBookCount: number;
        isPollingStarted: boolean;
        skillList: import("immer/dist/internal").WritableDraft<Skills>[];
        favoritesInDirectory: import("immer/dist/internal").WritableDraft<FavoritesInDirectoryType>;
        favoriteIdsToggled: import("immer/dist/internal").WritableDraft<FavoritesInDirectoryType>;
        storeFavsToastReference: Id | null;
    };
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
    syncingStoreWithFavs(state: import("immer/dist/internal").WritableDraft<CcfDirectoryState>, action: PayloadAction<FavoritesInDirectoryType>): {
        favoritesInDirectory: {
            agents?: number[] | undefined;
            teams?: number[] | undefined;
            skills?: (string | number)[] | undefined;
            digitalSkills?: (string | number)[] | undefined;
            standardAdrsBook?: number[] | undefined;
            extDirectoryEntries?: string[] | undefined;
        };
        query: import("immer/dist/internal").WritableDraft<{
            searchBox: string;
            dropDown: string;
            offSetVal: number;
        }>;
        emptySearchFlg: boolean;
        skills: import("immer/dist/internal").WritableDraft<SkillActivityEvent>[];
        digitalSkills: import("immer/dist/internal").WritableDraft<SkillEvent>[];
        isAgentLoading: boolean;
        isSkillsLoading: boolean;
        isTeamsLoading: boolean;
        isDigitalSkillsLoading: boolean;
        isFavoriteAgentsLoading: boolean;
        isFavoriteTeamsLoading: boolean;
        isFavoriteStdAdrsBookLoading: boolean;
        isFavoriteExtDirectoryLoading: boolean;
        agentContacts: import("immer/dist/internal").WritableDraft<Agent>[];
        favoriteAgents: import("immer/dist/internal").WritableDraft<Agent>[];
        favoriteTeams: import("immer/dist/internal").WritableDraft<Team>[];
        favoriteStandardAddressBooks: import("immer/dist/internal").WritableDraft<AddressBooksEntries>[];
        isFavoriteSkillsLoading: boolean;
        isFavoriteDigitalSkillsLoading: boolean;
        favoriteSkills: import("immer/dist/internal").WritableDraft<SkillActivityEvent>[];
        favoriteDigitalSkills: import("immer/dist/internal").WritableDraft<SkillEvent>[];
        favoriteExtDirectoryEntries: import("immer/dist/internal").WritableDraft<DirectoryAdditionalAtrributes>[];
        teams: import("immer/dist/internal").WritableDraft<Team>[];
        skillPollingActive: boolean;
        agentHasMultipleSkills: import("immer/dist/internal").WritableDraft<{
            agentHasMultipleSkillsFlg: boolean;
            res: [];
        }>;
        agentsTeamPollingActive: boolean;
        skillIdSelectedForInteraction: number | null;
        drillDownToAgent: boolean;
        noStandardEntriesAll: boolean;
        loadingAgentsForTeam: boolean;
        externalDirectories: import("immer/dist/internal").WritableDraft<Directories>;
        externalDirectoryState: boolean;
        directoryEntries: import("immer/dist/internal").WritableDraft<DirectoryAdditionalAtrributes>[];
        isDirectoryEntriesLoading: boolean;
        currentTeamId: string;
        toggleSkillSelector: import("immer/dist/internal").WritableDraft<outboundOptionState>[];
        totalAgentsSearchMatchRecords: number;
        totalTeamsSearchMatchRecords: number;
        totalSkillsSearchMatchRecords: number;
        totalDigitalSkillsSearchMatchRecords: number;
        externalDirectorySubscriptionId: string;
        externalDirectoryDrillDown: boolean;
        totalExternalDirectoryRecordsCount: number;
        selectedDrillDownUserEntry: import("immer/dist/internal").WritableDraft<DirectoryEntryDetails>;
        noAgentDataFound: boolean;
        noTeamDataFound: boolean;
        hideExternalDirectoryData: boolean;
        directoryFocus: boolean;
        directoryRendered: boolean;
        totalAgentCount: number;
        totalTeamCount: number;
        totalSkillCount: number;
        noSkillDataFound: boolean;
        isFullViewDirectory: boolean;
        standardAddressBooks: (import("immer/dist/internal").WritableDraft<AddressBooks> | import("immer/dist/internal").WritableDraft<SAB2AddressBook>)[];
        standardBookEntriesResponse: import("immer/dist/internal").WritableDraft<AddressBookEntriesResponse>;
        standardBookAutoCompleteEntriesResponse: import("immer/dist/internal").WritableDraft<AddressBookEntriesResponse>[];
        displayStandardAddressDetails: import("immer/dist/internal").WritableDraft<{
            displayDetails: boolean;
            addressBookEntryId: number;
        }>;
        totalAddressBookSearchMatchRecords: number;
        isAddressBookDataLoading: boolean;
        allAddressBookCount: number;
        isPollingStarted: boolean;
        skillList: import("immer/dist/internal").WritableDraft<Skills>[];
        showClientDataApiFailedToast: import("immer/dist/internal").WritableDraft<{
            storageExceeded: boolean;
            apiFailed: boolean;
        }>;
        favoriteIdsToggled: import("immer/dist/internal").WritableDraft<FavoritesInDirectoryType>;
        storeFavsToastReference: Id | null;
    };
    /**
     * Method used to set favorite ids toggled in the directory
     * @param state - DirectoryState
     * @param action - payload with an object containing the favorite IDs toggled in the directory for a particular directory item.
     * @example -
     * ```
     * dispatch(updateFavoriteIdsToggled({ agents: [1, 2], teams: [3], skills: [4] }));
     * ```
     */
    updateFavoriteIdsToggled(state: import("immer/dist/internal").WritableDraft<CcfDirectoryState>, action: PayloadAction<FavoritesInDirectoryType>): {
        favoriteIdsToggled: {
            agents?: number[] | undefined;
            teams?: number[] | undefined;
            skills?: (string | number)[] | undefined;
            digitalSkills?: (string | number)[] | undefined;
            standardAdrsBook?: number[] | undefined;
            extDirectoryEntries?: string[] | undefined;
        };
        query: import("immer/dist/internal").WritableDraft<{
            searchBox: string;
            dropDown: string;
            offSetVal: number;
        }>;
        emptySearchFlg: boolean;
        skills: import("immer/dist/internal").WritableDraft<SkillActivityEvent>[];
        digitalSkills: import("immer/dist/internal").WritableDraft<SkillEvent>[];
        isAgentLoading: boolean;
        isSkillsLoading: boolean;
        isTeamsLoading: boolean;
        isDigitalSkillsLoading: boolean;
        isFavoriteAgentsLoading: boolean;
        isFavoriteTeamsLoading: boolean;
        isFavoriteStdAdrsBookLoading: boolean;
        isFavoriteExtDirectoryLoading: boolean;
        agentContacts: import("immer/dist/internal").WritableDraft<Agent>[];
        favoriteAgents: import("immer/dist/internal").WritableDraft<Agent>[];
        favoriteTeams: import("immer/dist/internal").WritableDraft<Team>[];
        favoriteStandardAddressBooks: import("immer/dist/internal").WritableDraft<AddressBooksEntries>[];
        isFavoriteSkillsLoading: boolean;
        isFavoriteDigitalSkillsLoading: boolean;
        favoriteSkills: import("immer/dist/internal").WritableDraft<SkillActivityEvent>[];
        favoriteDigitalSkills: import("immer/dist/internal").WritableDraft<SkillEvent>[];
        favoriteExtDirectoryEntries: import("immer/dist/internal").WritableDraft<DirectoryAdditionalAtrributes>[];
        teams: import("immer/dist/internal").WritableDraft<Team>[];
        skillPollingActive: boolean;
        agentHasMultipleSkills: import("immer/dist/internal").WritableDraft<{
            agentHasMultipleSkillsFlg: boolean;
            res: [];
        }>;
        agentsTeamPollingActive: boolean;
        skillIdSelectedForInteraction: number | null;
        drillDownToAgent: boolean;
        noStandardEntriesAll: boolean;
        loadingAgentsForTeam: boolean;
        externalDirectories: import("immer/dist/internal").WritableDraft<Directories>;
        externalDirectoryState: boolean;
        directoryEntries: import("immer/dist/internal").WritableDraft<DirectoryAdditionalAtrributes>[];
        isDirectoryEntriesLoading: boolean;
        currentTeamId: string;
        toggleSkillSelector: import("immer/dist/internal").WritableDraft<outboundOptionState>[];
        totalAgentsSearchMatchRecords: number;
        totalTeamsSearchMatchRecords: number;
        totalSkillsSearchMatchRecords: number;
        totalDigitalSkillsSearchMatchRecords: number;
        externalDirectorySubscriptionId: string;
        externalDirectoryDrillDown: boolean;
        totalExternalDirectoryRecordsCount: number;
        selectedDrillDownUserEntry: import("immer/dist/internal").WritableDraft<DirectoryEntryDetails>;
        noAgentDataFound: boolean;
        noTeamDataFound: boolean;
        hideExternalDirectoryData: boolean;
        directoryFocus: boolean;
        directoryRendered: boolean;
        totalAgentCount: number;
        totalTeamCount: number;
        totalSkillCount: number;
        noSkillDataFound: boolean;
        isFullViewDirectory: boolean;
        standardAddressBooks: (import("immer/dist/internal").WritableDraft<AddressBooks> | import("immer/dist/internal").WritableDraft<SAB2AddressBook>)[];
        standardBookEntriesResponse: import("immer/dist/internal").WritableDraft<AddressBookEntriesResponse>;
        standardBookAutoCompleteEntriesResponse: import("immer/dist/internal").WritableDraft<AddressBookEntriesResponse>[];
        displayStandardAddressDetails: import("immer/dist/internal").WritableDraft<{
            displayDetails: boolean;
            addressBookEntryId: number;
        }>;
        totalAddressBookSearchMatchRecords: number;
        isAddressBookDataLoading: boolean;
        allAddressBookCount: number;
        isPollingStarted: boolean;
        skillList: import("immer/dist/internal").WritableDraft<Skills>[];
        showClientDataApiFailedToast: import("immer/dist/internal").WritableDraft<{
            storageExceeded: boolean;
            apiFailed: boolean;
        }>;
        favoritesInDirectory: import("immer/dist/internal").WritableDraft<FavoritesInDirectoryType>;
        storeFavsToastReference: Id | null;
    };
    /**
     * Method used to set toast reference
     * @param state - DirectoryState
     * @param action - payload with an object containing toast reference ID
     * @example -
     * ```
     * dispatch(updateFavsToastReference(Id));
     * ```
     */
    updateFavsToastReference(state: import("immer/dist/internal").WritableDraft<CcfDirectoryState>, action: PayloadAction<Id | null>): void;
}, "agentDirectory">;
/**
 * Function to get Directory data
 * @param rootState - CcfDirectoryState
 * @example
 * @returns It returns Directory data
 */
export declare const getCcfDirectoryState: (rootState: {
    agentDirectory: CcfDirectoryState;
}) => CcfDirectoryState;
export declare const selectAgentList: ((state: {
    agentDirectory: CcfDirectoryState;
}) => Agent[]) & import("reselect").OutputSelectorFields<(args_0: CcfDirectoryState) => Agent[] & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
/**
 * Function to get agent data
 * @param agentId - agentId
 * @example  selectAgentDetails(agentId)
 * @returns It returns Directory data
 */
export declare const selectAgentDetails: (agentId: number) => ((state: {
    agentDirectory: CcfDirectoryState;
}) => Agent | undefined) & import("reselect").OutputSelectorFields<(args_0: Agent[]) => Agent & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const selectAgentLoadingStatus: ((state: {
    agentDirectory: CcfDirectoryState;
}) => boolean) & import("reselect").OutputSelectorFields<(args_0: CcfDirectoryState) => boolean & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const selectSkillsLoadingStatus: ((state: {
    agentDirectory: CcfDirectoryState;
}) => boolean) & import("reselect").OutputSelectorFields<(args_0: CcfDirectoryState) => boolean & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const selectTeamsLoadingStatus: ((state: {
    agentDirectory: CcfDirectoryState;
}) => boolean) & import("reselect").OutputSelectorFields<(args_0: CcfDirectoryState) => boolean & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const selectDigitalSkillsLoadingStatus: ((state: {
    agentDirectory: CcfDirectoryState;
}) => boolean) & import("reselect").OutputSelectorFields<(args_0: CcfDirectoryState) => boolean & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const selectExternalEntriesLoadingStatus: ((state: {
    agentDirectory: CcfDirectoryState;
}) => boolean) & import("reselect").OutputSelectorFields<(args_0: CcfDirectoryState) => boolean & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const selectDropDownQueryValue: ((state: {
    agentDirectory: CcfDirectoryState;
}) => string) & import("reselect").OutputSelectorFields<(args_0: CcfDirectoryState) => string & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const selectSearchBoxQueryValue: ((state: {
    agentDirectory: CcfDirectoryState;
}) => string) & import("reselect").OutputSelectorFields<(args_0: CcfDirectoryState) => string & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const getSkillSelectorToggleValue: ((state: {
    agentDirectory: CcfDirectoryState;
}) => outboundOptionState[]) & import("reselect").OutputSelectorFields<(args_0: CcfDirectoryState) => outboundOptionState[] & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const selectSkillsValue: ((state: {
    agentDirectory: CcfDirectoryState;
}) => SkillActivityEvent[]) & import("reselect").OutputSelectorFields<(args_0: CcfDirectoryState) => SkillActivityEvent[] & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const selectDigitalSkillsValue: ((state: {
    agentDirectory: CcfDirectoryState;
}) => SkillEvent[]) & import("reselect").OutputSelectorFields<(args_0: CcfDirectoryState) => SkillEvent[] & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const selectTeamsValue: ((state: {
    agentDirectory: CcfDirectoryState;
}) => Team[]) & import("reselect").OutputSelectorFields<(args_0: CcfDirectoryState) => Team[] & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const selectDirectoryEntries: ((state: {
    agentDirectory: CcfDirectoryState;
}) => DirectoryAdditionalAtrributes[]) & import("reselect").OutputSelectorFields<(args_0: CcfDirectoryState) => DirectoryAdditionalAtrributes[] & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const getSkillIdSelectedForInteraction: ((state: {
    agentDirectory: CcfDirectoryState;
}) => number | null) & import("reselect").OutputSelectorFields<(args_0: CcfDirectoryState) => number & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const selectAgentSkills: ((state: {
    agentDirectory: CcfDirectoryState;
}) => {
    agentHasMultipleSkillsFlg: boolean;
    res: [];
}) & import("reselect").OutputSelectorFields<(args_0: CcfDirectoryState) => {
    agentHasMultipleSkillsFlg: boolean;
    res: [];
} & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const isSkillPolling: ((state: {
    agentDirectory: CcfDirectoryState;
}) => boolean) & import("reselect").OutputSelectorFields<(args_0: CcfDirectoryState) => boolean & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const agentsTeamPollingActive: ((state: {
    agentDirectory: CcfDirectoryState;
}) => boolean) & import("reselect").OutputSelectorFields<(args_0: CcfDirectoryState) => boolean & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const isDrillDownEnabled: ((state: {
    agentDirectory: CcfDirectoryState;
}) => boolean) & import("reselect").OutputSelectorFields<(args_0: CcfDirectoryState) => boolean & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const isLoadingAgentsForTeam: ((state: {
    agentDirectory: CcfDirectoryState;
}) => boolean) & import("reselect").OutputSelectorFields<(args_0: CcfDirectoryState) => boolean & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const favoriteAgentsList: ((state: {
    agentDirectory: CcfDirectoryState;
}) => Agent[]) & import("reselect").OutputSelectorFields<(args_0: CcfDirectoryState) => Agent[] & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const favoriteTeamsList: ((state: {
    agentDirectory: CcfDirectoryState;
}) => Team[]) & import("reselect").OutputSelectorFields<(args_0: CcfDirectoryState) => Team[] & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const favoriteDigitalSkillsList: ((state: {
    agentDirectory: CcfDirectoryState;
}) => SkillEvent[]) & import("reselect").OutputSelectorFields<(args_0: CcfDirectoryState) => SkillEvent[] & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const favoriteStandardAddressBookList: ((state: {
    agentDirectory: CcfDirectoryState;
}) => AddressBooksEntries[]) & import("reselect").OutputSelectorFields<(args_0: CcfDirectoryState) => AddressBooksEntries[] & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const favoriteSkillsList: ((state: {
    agentDirectory: CcfDirectoryState;
}) => SkillActivityEvent[]) & import("reselect").OutputSelectorFields<(args_0: CcfDirectoryState) => SkillActivityEvent[] & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const favoriteExtDirectoryEntriesList: ((state: {
    agentDirectory: CcfDirectoryState;
}) => DirectoryAdditionalAtrributes[]) & import("reselect").OutputSelectorFields<(args_0: CcfDirectoryState) => DirectoryAdditionalAtrributes[] & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const isFavoriteAgentListLoaded: ((state: {
    agentDirectory: CcfDirectoryState;
}) => boolean) & import("reselect").OutputSelectorFields<(args_0: CcfDirectoryState) => boolean & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const isFavoriteTeamListLoaded: ((state: {
    agentDirectory: CcfDirectoryState;
}) => boolean) & import("reselect").OutputSelectorFields<(args_0: CcfDirectoryState) => boolean & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const isFavoriteDigitalSkillsListLoaded: ((state: {
    agentDirectory: CcfDirectoryState;
}) => boolean) & import("reselect").OutputSelectorFields<(args_0: CcfDirectoryState) => boolean & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const isFavStdAddressBookLoading: ((state: {
    agentDirectory: CcfDirectoryState;
}) => boolean) & import("reselect").OutputSelectorFields<(args_0: CcfDirectoryState) => boolean & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const isFavoriteExtDirectoryLoaded: ((state: {
    agentDirectory: CcfDirectoryState;
}) => boolean) & import("reselect").OutputSelectorFields<(args_0: CcfDirectoryState) => boolean & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const getExternalDirectories: ((state: {
    agentDirectory: CcfDirectoryState;
}) => Directories) & import("reselect").OutputSelectorFields<(args_0: CcfDirectoryState) => Directories & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const getCurrentTeam: ((state: {
    agentDirectory: CcfDirectoryState;
}) => string) & import("reselect").OutputSelectorFields<(args_0: CcfDirectoryState) => string & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const selectExternalDirectoryState: ((state: {
    agentDirectory: CcfDirectoryState;
}) => boolean) & import("reselect").OutputSelectorFields<(args_0: CcfDirectoryState) => boolean & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const totalAgentsSearchMatchRecords: ((state: {
    agentDirectory: CcfDirectoryState;
}) => number) & import("reselect").OutputSelectorFields<(args_0: CcfDirectoryState) => number & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const totalTeamsSearchMatchRecords: ((state: {
    agentDirectory: CcfDirectoryState;
}) => number) & import("reselect").OutputSelectorFields<(args_0: CcfDirectoryState) => number & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const totalSkillsSearchMatchRecords: ((state: {
    agentDirectory: CcfDirectoryState;
}) => number) & import("reselect").OutputSelectorFields<(args_0: CcfDirectoryState) => number & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const totalDigitalSkillsSearchMatchRecords: ((state: {
    agentDirectory: CcfDirectoryState;
}) => number) & import("reselect").OutputSelectorFields<(args_0: CcfDirectoryState) => number & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const selectExternalDirectorySubscriptionId: ((state: {
    agentDirectory: CcfDirectoryState;
}) => string) & import("reselect").OutputSelectorFields<(args_0: CcfDirectoryState) => string & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const selectExternalDirectoryDrillDown: ((state: {
    agentDirectory: CcfDirectoryState;
}) => boolean) & import("reselect").OutputSelectorFields<(args_0: CcfDirectoryState) => boolean & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const totalExternalDirectoryRecordCount: ((state: {
    agentDirectory: CcfDirectoryState;
}) => number) & import("reselect").OutputSelectorFields<(args_0: CcfDirectoryState) => number & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const selectCurrentDrillDownEntry: ((state: {
    agentDirectory: CcfDirectoryState;
}) => DirectoryEntryDetails) & import("reselect").OutputSelectorFields<(args_0: CcfDirectoryState) => DirectoryEntryDetails & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const noAgentDataFound: ((state: {
    agentDirectory: CcfDirectoryState;
}) => boolean) & import("reselect").OutputSelectorFields<(args_0: CcfDirectoryState) => boolean & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const noTeamDataFound: ((state: {
    agentDirectory: CcfDirectoryState;
}) => boolean) & import("reselect").OutputSelectorFields<(args_0: CcfDirectoryState) => boolean & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const hideExternalDirectoryData: ((state: {
    agentDirectory: CcfDirectoryState;
}) => boolean) & import("reselect").OutputSelectorFields<(args_0: CcfDirectoryState) => boolean & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const selectEmptySearchState: ((state: {
    agentDirectory: CcfDirectoryState;
}) => boolean) & import("reselect").OutputSelectorFields<(args_0: CcfDirectoryState) => boolean & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const directoryFocusEvent: ((state: {
    agentDirectory: CcfDirectoryState;
}) => boolean) & import("reselect").OutputSelectorFields<(args_0: CcfDirectoryState) => boolean & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const directoryRenderedEvent: ((state: {
    agentDirectory: CcfDirectoryState;
}) => boolean) & import("reselect").OutputSelectorFields<(args_0: CcfDirectoryState) => boolean & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const selectAllAgentCount: ((state: {
    agentDirectory: CcfDirectoryState;
}) => number) & import("reselect").OutputSelectorFields<(args_0: CcfDirectoryState) => number & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const selectAllTeamCount: ((state: {
    agentDirectory: CcfDirectoryState;
}) => number) & import("reselect").OutputSelectorFields<(args_0: CcfDirectoryState) => number & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const selectAllSkillCount: ((state: {
    agentDirectory: CcfDirectoryState;
}) => number) & import("reselect").OutputSelectorFields<(args_0: CcfDirectoryState) => number & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const noSkillDataFound: ((state: {
    agentDirectory: CcfDirectoryState;
}) => boolean) & import("reselect").OutputSelectorFields<(args_0: CcfDirectoryState) => boolean & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const selectFullViewDirectoryFlg: ((state: {
    agentDirectory: CcfDirectoryState;
}) => boolean) & import("reselect").OutputSelectorFields<(args_0: CcfDirectoryState) => boolean & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const standardAddressBooks: ((state: {
    agentDirectory: CcfDirectoryState;
}) => (AddressBooks | SAB2AddressBook)[]) & import("reselect").OutputSelectorFields<(args_0: CcfDirectoryState) => (AddressBooks | SAB2AddressBook)[] & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const standardAddressBookEntries: ((state: {
    agentDirectory: CcfDirectoryState;
}) => AddressBooksEntries[]) & import("reselect").OutputSelectorFields<(args_0: CcfDirectoryState) => AddressBooksEntries[] & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const standardAddressBookEntriesForAutoComplete: ((state: {
    agentDirectory: CcfDirectoryState;
}) => AddressBooksEntries[]) & import("reselect").OutputSelectorFields<(args_0: CcfDirectoryState) => AddressBooksEntries[] & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const standardAddressBookEntriesMoreDetails: ((state: {
    agentDirectory: CcfDirectoryState;
}) => {
    displayDetails: boolean;
    addressBookEntryId: number;
}) & import("reselect").OutputSelectorFields<(args_0: CcfDirectoryState) => {
    displayDetails: boolean;
    addressBookEntryId: number;
} & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const totalAddressBookMatchRecordsCount: ((state: {
    agentDirectory: CcfDirectoryState;
}) => number) & import("reselect").OutputSelectorFields<(args_0: CcfDirectoryState) => number & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const isAddressBookRecordLoading: ((state: {
    agentDirectory: CcfDirectoryState;
}) => boolean) & import("reselect").OutputSelectorFields<(args_0: CcfDirectoryState) => boolean & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const selectAllAddressBookCount: ((state: {
    agentDirectory: CcfDirectoryState;
}) => number) & import("reselect").OutputSelectorFields<(args_0: CcfDirectoryState) => number & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const noStandardEntriesAllData: ((state: {
    agentDirectory: CcfDirectoryState;
}) => boolean) & import("reselect").OutputSelectorFields<(args_0: CcfDirectoryState) => boolean & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const getSkillList: ((state: {
    agentDirectory: CcfDirectoryState;
}) => Skills[]) & import("reselect").OutputSelectorFields<(args_0: CcfDirectoryState) => Skills[] & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const getSelectedDropDown: ((state: {
    agentDirectory: CcfDirectoryState;
}) => string) & import("reselect").OutputSelectorFields<(args_0: CcfDirectoryState) => string & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const getClientDataApiFailedToast: ((state: {
    agentDirectory: CcfDirectoryState;
}) => {
    storageExceeded: boolean;
    apiFailed: boolean;
}) & import("reselect").OutputSelectorFields<(args_0: CcfDirectoryState) => {
    storageExceeded: boolean;
    apiFailed: boolean;
} & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const getCurrentFavsInDirectory: ((state: {
    agentDirectory: CcfDirectoryState;
}) => FavoritesInDirectoryType) & import("reselect").OutputSelectorFields<(args_0: CcfDirectoryState) => FavoritesInDirectoryType & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const getFavIdToggled: ((state: {
    agentDirectory: CcfDirectoryState;
}) => FavoritesInDirectoryType) & import("reselect").OutputSelectorFields<(args_0: CcfDirectoryState) => FavoritesInDirectoryType & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const getFavoritesToastReference: ((state: {
    agentDirectory: CcfDirectoryState;
}) => Id | null) & import("reselect").OutputSelectorFields<(args_0: CcfDirectoryState) => (Id | null) & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
