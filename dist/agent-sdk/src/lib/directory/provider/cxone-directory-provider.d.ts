import { CXoneDirectory } from '../cxone-directory';
import { AgentStateResponse, DirectoryResponse, PollingOptions, DirectoryEntities } from '@nice-devone/common-sdk';
export interface AgentName {
    firstName: boolean;
    lastName: boolean;
}
export interface AgentListWithUserID {
    agentId: number;
    userId: string;
}
/**
 * Directory Provider Class
 */
export declare class CXoneDirectoryProvider {
    private logger;
    pollingWorker: any;
    private acdSession;
    private baseUri;
    private utilService;
    private directoryAdapter;
    private directoryBase;
    private offset;
    private limit;
    private searchText;
    private entityPollingFlag;
    private currentEntities;
    private lastAddressBookSearchEntriesMap;
    private lastAddressBookEntriesArray;
    private entityCounts;
    private totalSearchResultCount;
    private isFreshRequest;
    private teamId;
    private mediaType;
    private pollingOptions;
    private entity;
    private favroiteAgentList;
    /**
     * Create a directory provider.
     * @example -- Const provider = new CXoneDirectoryProvider();
     */
    constructor();
    /**
     * Used to set the directory base instance to access the subject from the base class
     * @example -
     */
    setDirectoryBaseInstance(directoryBase: CXoneDirectory): void;
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
    getDirectoryData(entity: DirectoryEntities[], pollingOptions?: PollingOptions, offset?: number, limit?: number, searchText?: string, teamId?: string, mediaType?: number, shouldFetchAllAgents?: boolean): Promise<void>;
    /**
     * Used to clear the directory store data from the index db
     * @example -
     * ```
     * clearDirectoryDB();
     * ```
     */
    clearDirectoryDB(): Promise<void>;
    /**
     * Used to clear the digital store data from the index db
     * @example -
     * ```
     * clearDigitalDB();
     * ```
     */
    clearDigitalDB(): Promise<void>;
    /**
     * Used to clear the copilot store data from the index db
     * @example -
     * ```
     * clearCopilotDB();
     * ```
     */
    clearCopilotDB(): Promise<void>;
    /**
     * Used to check if the current request is a new search request or the already searched request
     * @param newSearchText - search string
     * @param newOffset - start index for pagination
     * @param newLimit - last index for pagination
     * @param newEntity - entity array
     * @returns boolean stating if true that means its a new search request
     */
    private isNewSearchedRequest;
    /**
     * Used to check from the requested entity to find out if any of the entity is still needed to be polled and if so returns that entity
     * @param entity - directory entity array
     */
    private isPollingNeeded;
    /**
     * Used to update the flag based on the entity array passed, this will ensure that the passed entities has been already polled
     * @param entity - directory entity array
     */
    private updateEntityPolled;
    /**
       * Used to get the search result for the directory entities from indexDB. if entities array is passed then the result will be included for those entities
       * if not passed then result will include all the entities
       * @param searchText - text on the basis of which the search will be performed
       * @param entities - array of requested entity options for search
       * @param shouldFetchAllAgents - flag to get all agent list including logged-in user
       */
    private searchDirectoryData;
    /**
     * Used to handle the agentList pagination for the search result if the search text is matched and then returns only the data based on offset and limit
     * @param searchText - search string
     * @param agentList - array of agentList
     * @param shouldFetchAllAgents - flag to get all agent list including logged-in user
     */
    private getFilteredAgentList;
    /**
     * Used to handle the skillList pagination for the search result if the search text is matched and then returns only the data based on offset and limit
     * @param searchText - search string
     * @param skillList - array of skill
     */
    private getFilteredSkillList;
    /**
     * Used to handle the teamList pagination for the search result if the search text is matched and then returns only the data based on offset and limit
     *  @param searchText - search string
     * @param agentList - array of agentList
     */
    private getFilteredTeamList;
    /**
    * Used to filter the data from the address book List on the basis of search text and handle the pagination based on the offset and limit if requested
    * @param searchText - string value on which search will be performed
    * @param addressBookList - list of addressBook
    */
    private filterAddressBook;
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
    private requestDirectoryData;
    /**
     * Used to terminate the polling of agent state
     * @example -
     * ```
     * const directoryProvider = new CXoneDirectoryProvider();
     * this.directoryProvider.terminatePolling();
     * ```
     */
    terminatePolling(): void;
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
    handleDirectoryResponse(response: any, shouldFetchAllAgents?: boolean): Promise<void>;
    /**
     * merge, sort and paginate addressBookList data
     * @param addressBookList - addressBookList data
     * @example
     * ```
     * this.handleAddressBookList(addressBookList);
     * ```
     */
    private handleAddressBookList;
    /**
     * Published finan output of directory data
     * @param response - processed directory data
     * @example
     * ```
     * this.publishFinalDirectoryData(directoryResponse);
     * ```
     */
    publishFinalDirectoryData(directoryResponse: DirectoryResponse): void;
    /**
     * Used to publish the directory response to the subscriber
     * also updating the total record for each entity before publishing
     * @param directoryResponse - directory response which needs to be published
     * @param isUpdate - this boolean flag will help us to identify if the request is for update or not
     */
    private publishDirectoryData;
    /**
     * Used to update the addressBook list for search response matching new Response from the polling update with the existing search response saved in the index db
     * @param newAddressBooks -new response for the updated addressBook data
     */
    private updateAddressBookList;
    /**
     * Used to update the agent list for search response matching new Response from the polling update with the existing search response saved in the index db
     * @param currentSearchAgentList - saved agent list from the index db
     * @param newAgentList - new response for the updated addressBook data
     */
    private updateSearchAgentList;
    /**
     * Used to update the skill list for search response matching new Response from the polling update with the existing search response saved in the index db
     * @param currentSearchSkillList - saved skill list from the index db
     * @param newSkillList - new response for the updated skill data
     */
    private updateSearchSkillList;
    /**
    * Used to update the search team list for search response matching new Response from the polling update with the existing search response saved in the index db
    * @param currentSearchTeamList - saved team list from the index db
    * @param newSkillList - new response for the updated team data
    */
    private updateSearchTeamList;
    /**
     * Used to handle the pagination based on the offset and limit in case of normal directory request flow without search request
     * @param directoryResponse - directory response object
     */
    private handleDirectoryPagination;
    /**
    * Used to update the skill list in index DB as per the new list
    * @param SkillList - new skill list response
    */
    private updateSkillListInDB;
    /**
     * Used to toggle the favorite marker for agent and store it in Index DB
     * @param agent - Information of the agent of whom favorite field needs to be toggled
     * @example
     * directoryProvider.toggleFavorite(agent);
     */
    toggleFavoriteForAgent(agentInfo: AgentStateResponse): Promise<void>;
    /**
     * Used to retrieve agent list from index DB and filter out favorites
     * @param searchText - searchText for filtering the list
     * @example
     * directoryProvider.getFavorites(searchText);
     */
    getFavoritesByAgent(agentName: string): Promise<AgentStateResponse[]>;
    /**
     * Used to update the agent list in index DB as per the new list
     * @param agentList - new agent list response
     */
    private updateAgentListInDB;
    /**
     * Used to update the team list in index DB as per the new list
     * @param teamList - new team list response
     */
    private updateTeamListInDB;
    /**
     * Used to update the address list in index DB as per the new list
     * @param addressBookList - new address book list response
     */
    private updateAddressBookListInDB;
    /**
     * Use to initializing the util worker and will return the method inside the worker
     * @example
     * ```
     * this.initDirectoryWorker();
     * ```
     */
    initUtilWorker(): void;
    /**
     * Use to restart worker
     * @example
     * ```
     * this.restartWorker();
     * ```
     */
    restartWorker(): void;
    /**
     * Use to terminate the directory worker
     * @example -
     * ```
     * this.terminateDirectoryWorker
     * ```
     */
    private terminateDirectoryWorker;
    getDirectoryPollingConfig: () => any;
    /**
     * Used to filter out the skill list based on current mediaType
     * @param skillList - new skill list response
     */
    private filterSkillByMediaType;
    /**
     * Used to update the team list in index DB as per the new list
     * @param agentList - new agent list response
     * @param teamId - teamId on which we need to filter agents
     */
    private filterAgentDataByTeamId;
    /**
     * Use to sort the index db data for agents, skills and teams in ascending order
     * @example -
     * ```
     * @param list - new list response
     * @param type - which directory entity (agents, skills or teams)
     * this.sortResponse(list, type)
     * ```
    */
    private sortResponse;
    /**
     * @param agentStateName - string
     * @returns agentState - number
     * @example getAgentState(agentState)
     */
    private getAgentStateOrDefault;
    /**
     * @param agentStateName - string
     * @returns agentState - number
     * @example getUnifiedAgentStateOrDefault(agentState)
     */
    private getUnifiedAgentStateOrDefault;
    /**
     *
     * @param agentList - list of agent
     * @param searchText - used to sort data by position of the searchText.
     * @returns sorted Agent List
     * @example sortAgentList(agentlist, searchText)
     */
    private sortAgentList;
}
