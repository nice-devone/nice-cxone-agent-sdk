import { CXoneClient } from '../../cxone-client';
import { SkillActivityEvent } from '../model/skill-activity-event';
import { SkillActivityPollingRequest } from '../model/skill-activity-polling-request';
/**
 * skill activity Provider Class
 */
export declare class CXoneSkillActivityProvider {
    private logger;
    pollingWorker: any;
    /** Separate worker used only for the login-time bootstrap - never shares `pollingWorker`. */
    private bootstrapWorker;
    private acdSession;
    private baseUri;
    private utilService;
    private cxoneClient;
    private mediaTypeId;
    private isOutbound;
    private offset;
    private limit;
    private searchText;
    private entityCounts;
    private totalSearchResultCount;
    private skillActivityPollingRequest;
    private favoriteSkillList;
    /**
     * Creates skill activity provider
     * @example - const provider = new CXoneSkillActivityProvider();
     */
    constructor();
    /**
     * Used to set the acd sdk base instance to access the subject from the base class
     * @example -
     */
    setACDSdkBaseInstance(cxoneClient: CXoneClient): void;
    /**
     * Used to get the skill data from index DB
     * @example -
     * ```
     * getSkillsFromIndexDB();
     * ```
     */
    private getSkillsFromIndexDB;
    /**
     * Used to initiate the polling for skill activity data
     * @example -
     * ```
     * const skillActivityProvider = new CXoneSkillActivityProvider();
     * this.skillActivityProvider.startPolling();
     * ```
     */
    startPolling(skillActivityPollingRequest: SkillActivityPollingRequest): Promise<void>;
    /**
     * Used to terminate the real-time polling of skill activity for the current view. Does not touch the
     * separate, session-scoped login-time bootstrap - that has its own lifecycle (see
     * terminateBootstrapWorker()) and must keep running even if a view stops/restarts its own polling.
     * @example -
     * ```
     * const agentActivityProvider = new CXoneSkillActivityProvider();
     * this.agentActivityProvider.terminatePolling();
     * ```
     */
    terminatePolling(): void;
    /**
     * Callback method which will passed on to the worker and will be executed after the polling api response
     * then will publish to the subject subscriber with activity data
     * @param response - activity api response object
     * @example -
     * ```
     * handleSkillActivityResponse(data);
     * ```
     */
    handleSkillActivityResponse(response: any): Promise<void>;
    /**
     * This method to format skill activity response
     * @param response -  activity api response object
     * @returns - array of skill activity's
     * @example -
     * ```
     * formatSkillActivityResponse(response);
     * ```
     */
    private formatSkillActivityResponse;
    /**
     * Use to initializing the skill activity worker and will return the method inside the worker
     * @example
     * ```
     * this.initSkillActivityWorker();
     * ```
     */
    initSkillActivityWorker(): void;
    /**
     * Restarts skill activity worker when new auth token received from Refresh token flow
     * @example
     * ```
     * this.restartWorker();
     * ```
     */
    restartWorker(): void;
    /**
     * Use to terminate the skill activity worker
     * @example -
     * ```
     * this.terminateAgentWorker
     * ```
     */
    private terminateAgentWorker;
    /**
     * Downloads the full skill set on a worker thread right after login and seeds SKILL_ACTIVITY/SKILL_LIST,
     * so the Directory opens against a warm cache instead of fetching everything with `updatedSince=1970`.
     * No-op on a warm cache, on repeat calls, or before base uri/auth token are available.
     * @example - await CXoneClient.instance.skillActivityQueue.skillActivityProvider.bootstrapSkillActivity();
     */
    bootstrapSkillActivity(): Promise<void>;
    /**
     * True when SKILL_ACTIVITY already holds data. Checked before starting and again immediately before the
     * write, since a real poll response can land while the bootstrap is still in flight. Does not look at
     * SKILL_LIST - that store has its own independent write path in the Directory provider.
     */
    private isSkillStoreSeeded;
    /**
     * Seeds both skill stores from the bootstrap worker payload and advances both polling cursors.
     * @param data - message posted back by the bootstrap worker
     */
    private handleBootstrapResponse;
    /**
     * Terminates the bootstrap worker.
     * @example - this.terminateBootstrapWorker();
     */
    terminateBootstrapWorker(): void;
    /**
     * Checks if skill activity polling is running
     * @returns - local storage key for skill activity polling
     * @example
     * ```
     * const isSkillActivityPolling =  this.getSkillActivityPolling();
     * ```
     */
    getSkillActivityPolling: () => any;
    /**
     * Used to update the skill list in index DB as per the new list
     * @param SkillList - new skill list response
     */
    private updateSkillListInDB;
    /**
     * Used to handle the pagination based on the offset and limit in case of normal directory request flow without search request
     * @param directoryResponse - directory response object
     */
    private handleDirectoryPagination;
    /**
     * method to filter skill list on the basis on mediatypeid and isoutbound property
     * @example
     * ```
     * this.filterSkillwithMediatype();
     * ```
     */
    private filterSkillwithMediatype;
    /**
     * method to filter skill list on the basis on mediatype, isActive and isOutbound property
     * @param skillActivityEvent - List of skillActivityEvent
     * @example
     * ```
     * this.filterActiveSkillswithMediatype([SkillActivityEvent, SkillActivityEvent]);
     * ```
     */
    private filterActiveSkillswithMediatype;
    /**
     * Use to sort skill list in ascending order
     * @example -
     * ```
     * this.sortResponse(skillList)
     * ```
     */
    private sortResponse;
    /**
     * Used to toggle the favorite marker for skill and store it in Index DB
     * @param skill - Information of the skill of whom favorite field needs to be toggled
     * @example
     * directoryProvider.toggleFavoriteForSkill(skill);
     */
    toggleFavoriteForSkill(skillInfo: SkillActivityEvent[]): Promise<void>;
    /**
       * Used to retrieve skill list from index DB and filter out favorites
       * @param searchText - searchText for filtering the list
       * @example
       * skillActivityProvider.getFavoritesBySkill(searchText);
       */
    getFavoritesBySkill(skillName: string): Promise<SkillActivityEvent[]>;
    /**
     * Used to handle the skillList pagination for the search result if the search text is matched and then returns only the data based on offset and limit
     * @param searchText - search string
     * @param skillList - array of skill
     */
    private getFilteredSkillList;
}
