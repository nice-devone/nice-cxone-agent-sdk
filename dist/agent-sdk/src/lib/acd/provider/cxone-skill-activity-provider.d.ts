import { CXoneClient } from '../../cxone-client';
import { SkillActivityPollingRequest } from '../model/skill-activity-polling-request';
/**
 * skill activity Provider Class
 */
export declare class CXoneSkillActivityProvider {
    private logger;
    pollingWorker: any;
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
     * Used to terminate the polling of skill activity
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
}
