import { __awaiter } from "tslib";
import { ACDSessionManager, ApiUriConstants, dbInstance, HttpUtilService, IndexDBStoreNames, LoadWorker, LocalStorageHelper, Logger, StorageKeys, } from '@nice-devone/core-sdk';
import { SkillActivityEvent } from '../model/skill-activity-event';
import { DirectoryEntities, MediaTypeId, MessageBus, MessageType, } from '@nice-devone/common-sdk';
import { DirectorySearchFilter } from '../../directory/util/utility';
import { AuthStatus } from '@nice-devone/auth-sdk';
/**
 * skill activity Provider Class
 */
export class CXoneSkillActivityProvider {
    /**
     * Creates skill activity provider
     * @example - const provider = new CXoneSkillActivityProvider();
     */
    constructor() {
        this.logger = new Logger('SDK', 'CXoneSkillActivityProvider');
        this.acdSession = ACDSessionManager.instance;
        this.baseUri = '';
        this.utilService = new HttpUtilService();
        this.cxoneClient = {};
        this.mediaTypeId = undefined;
        this.isOutbound = false;
        this.offset = -1; // to know the pagination offset for the directory data requested
        this.limit = -1; // to know the pagination last index for the directory data requested
        this.searchText = ''; // in store the current requested directory search text
        this.entityCounts = {
            // to keep track of the total records for each entities for directory data response
            skillList: 0,
        };
        this.totalSearchResultCount = {
            skillList: 0,
        };
        this.skillActivityPollingRequest = {};
        /**
         * Checks if skill activity polling is running
         * @returns - local storage key for skill activity polling
         * @example
         * ```
         * const isSkillActivityPolling =  this.getSkillActivityPolling();
         * ```
         */
        this.getSkillActivityPolling = () => {
            return LocalStorageHelper.getItem(StorageKeys.IS_SKILL_ACTIVITY_POLLING, true);
        };
        window.addEventListener(AuthStatus.REFRESH_TOKEN_SUCCESS, () => {
            this.restartWorker();
            const msg = {
                type: MessageType.RESTART_SKILL_ACTIVITY_POLLING,
            };
            MessageBus.instance.postResponse(msg);
        });
    }
    /**
     * Used to set the acd sdk base instance to access the subject from the base class
     * @example -
     */
    setACDSdkBaseInstance(cxoneClient) {
        this.cxoneClient = cxoneClient;
    }
    /**
     * Used to get the skill data from index DB
     * @example -
     * ```
     * getSkillsFromIndexDB();
     * ```
     */
    getSkillsFromIndexDB() {
        return __awaiter(this, void 0, void 0, function* () {
            let paginationSkillResponse = {
                skillActivityData: [],
                totalRecords: 0,
                totalSearchResultCount: 0,
            };
            const db = yield dbInstance();
            let currentSkillList = (yield (db === null || db === void 0 ? void 0 : db.get(IndexDBStoreNames.DIRECTORY, DirectoryEntities.SKILL_ACTIVITY)));
            if (this.mediaTypeId && (currentSkillList === null || currentSkillList === void 0 ? void 0 : currentSkillList.length)) {
                currentSkillList = this.filterActiveSkillswithMediatype(currentSkillList);
            }
            if ((this.offset > 0 && this.limit > 0) || this.searchText.length > 1) {
                paginationSkillResponse = yield this.handleDirectoryPagination();
                this.cxoneClient.skillActivityQueue.skillActivityEvent.next(paginationSkillResponse);
            }
            else {
                paginationSkillResponse.skillActivityData = currentSkillList;
                this.cxoneClient.skillActivityQueue.skillActivityEvent.next(paginationSkillResponse);
            }
        });
    }
    /**
     * Used to initiate the polling for skill activity data
     * @example -
     * ```
     * const skillActivityProvider = new CXoneSkillActivityProvider();
     * this.skillActivityProvider.startPolling();
     * ```
     */
    startPolling(skillActivityPollingRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info('startPolling', 'startPolling in CXoneSkillActivityProvider');
            this.baseUri = this.acdSession.cxOneConfig.acdApiBaseUri;
            const authToken = this.acdSession.accessToken;
            this.offset = skillActivityPollingRequest.offset
                ? skillActivityPollingRequest.offset
                : -1;
            this.searchText = skillActivityPollingRequest.searchText
                ? skillActivityPollingRequest.searchText
                : '';
            this.limit = skillActivityPollingRequest.limit
                ? skillActivityPollingRequest.limit
                : -1;
            if (skillActivityPollingRequest.mediaTypeId !== undefined) {
                this.mediaTypeId = skillActivityPollingRequest.mediaTypeId;
            }
            this.isOutbound = skillActivityPollingRequest.isOutbound ? skillActivityPollingRequest.isOutbound : false;
            if (this.baseUri && authToken && !this.pollingWorker) {
                const Url = new URL(ApiUriConstants.SKILL_ACTIVITY_URI, this.baseUri);
                Url.searchParams.set('fields', 'agentsAvailable,agentsUnavailable,agentsLoggedIn,agentsWorking,campaignId,earliestQueueTime,emailFromAddress,inSLA,isActive,isNaturalCalling,isOutbound,mediaTypeId,mediaTypeName,outSLA,personalQueueCount,queueCount,serviceLevel,serviceLevelGoal,skillId,skillName,skillQueueCount');
                Url.searchParams.set('updatedSince', new Date(0).toISOString());
                const reqInit = {
                    headers: this.utilService.initHeader(authToken).headers,
                };
                LocalStorageHelper.setItem(StorageKeys.IS_SKILL_ACTIVITY_POLLING, true);
                if (!this.pollingWorker) {
                    this.initSkillActivityWorker();
                    this.pollingWorker.onmessage = (response) => {
                        this.handleSkillActivityResponse(response.data);
                    };
                }
                this.skillActivityPollingRequest = skillActivityPollingRequest;
                this.pollingWorker.postMessage({
                    type: 'agent-polling',
                    requestParams: { url: Url.toString(), method: 'GET', request: reqInit },
                });
            }
            else {
                this.getSkillsFromIndexDB();
            }
        });
    }
    /**
     * Used to terminate the polling of skill activity
     * @example -
     * ```
     * const agentActivityProvider = new CXoneSkillActivityProvider();
     * this.agentActivityProvider.terminatePolling();
     * ```
     */
    terminatePolling() {
        LocalStorageHelper.removeItem(StorageKeys.IS_SKILL_ACTIVITY_POLLING);
        this.terminateAgentWorker();
    }
    /**
     * Callback method which will passed on to the worker and will be executed after the polling api response
     * then will publish to the subject subscriber with activity data
     * @param response - activity api response object
     * @example -
     * ```
     * handleSkillActivityResponse(data);
     * ```
     */
    handleSkillActivityResponse(response) {
        return __awaiter(this, void 0, void 0, function* () {
            if (response) {
                let skillActivityEvent = this.formatSkillActivityResponse(response);
                let paginationSkillResponse = {
                    skillActivityData: [],
                    totalRecords: 0,
                    totalSearchResultCount: 0,
                };
                if (skillActivityEvent.length) {
                    if (this.mediaTypeId) {
                        skillActivityEvent = this.filterSkillwithMediatype(skillActivityEvent);
                    }
                    skillActivityEvent = yield this.updateSkillListInDB(skillActivityEvent);
                    if ((this.offset > 0 && this.limit > 0) || this.searchText.length > 1) {
                        paginationSkillResponse = yield this.handleDirectoryPagination();
                        //We receive offset and limit to display skill list in directory for pagination.
                    }
                    else {
                        //For skill counts in queue counter we don't need pagination
                        //hence offset and limit are set to -1.
                        paginationSkillResponse.skillActivityData = skillActivityEvent;
                    }
                    this.cxoneClient.skillActivityQueue.skillActivityEvent.next(paginationSkillResponse);
                }
                else {
                    this.getSkillsFromIndexDB();
                }
            }
            else {
                this.logger.error('handleSkillActivityResponse', 'Response is empty');
            }
        });
    }
    /**
     * This method to format skill activity response
     * @param response -  activity api response object
     * @returns - array of skill activity's
     * @example -
     * ```
     * formatSkillActivityResponse(response);
     * ```
     */
    formatSkillActivityResponse(response) {
        const agentActivityList = [];
        if ((response === null || response === void 0 ? void 0 : response.skillActivity) && response.skillActivity.length > 0) {
            response.skillActivity.forEach((activity) => {
                const skillActivityEvent = new SkillActivityEvent();
                skillActivityEvent.parse(activity);
                agentActivityList.push(skillActivityEvent);
            });
        }
        return agentActivityList;
    }
    /**
     * Use to initializing the skill activity worker and will return the method inside the worker
     * @example
     * ```
     * this.initSkillActivityWorker();
     * ```
     */
    initSkillActivityWorker() {
        const loader = new LoadWorker();
        this.pollingWorker = loader.getWorker('util-worker', 'ccf-skill-activity-polling-worker');
    }
    /**
     * Restarts skill activity worker when new auth token received from Refresh token flow
     * @example
     * ```
     * this.restartWorker();
     * ```
     */
    restartWorker() {
        if (this.pollingWorker) {
            this.terminatePolling();
            this.startPolling(this.skillActivityPollingRequest);
        }
    }
    /**
     * Use to terminate the skill activity worker
     * @example -
     * ```
     * this.terminateAgentWorker
     * ```
     */
    terminateAgentWorker() {
        var _a;
        (_a = this.pollingWorker) === null || _a === void 0 ? void 0 : _a.terminate();
        this.pollingWorker = undefined;
    }
    /**
     * Used to update the skill list in index DB as per the new list
     * @param SkillList - new skill list response
     */
    updateSkillListInDB(SkillList) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield dbInstance();
            let currentSkillList = (yield (db === null || db === void 0 ? void 0 : db.get(IndexDBStoreNames.DIRECTORY, DirectoryEntities.SKILL_ACTIVITY))) || [];
            if (currentSkillList === null || currentSkillList === void 0 ? void 0 : currentSkillList.length) {
                SkillList.forEach((skill, index) => {
                    const matchedSkillIndex = currentSkillList.findIndex((currentSkill) => currentSkill.skillId == skill.skillId);
                    if (matchedSkillIndex >= 0) {
                        if (skill.isActive) { // If skills are active, add into SKILL_ACTIVITY DB else remove. 
                            currentSkillList[matchedSkillIndex] = SkillList[index];
                        }
                        else {
                            currentSkillList.splice(matchedSkillIndex, 1);
                        }
                    }
                    else
                        currentSkillList.push(skill);
                });
            }
            else {
                currentSkillList = SkillList;
            }
            currentSkillList = this.sortResponse(currentSkillList);
            db === null || db === void 0 ? void 0 : db.put(IndexDBStoreNames.DIRECTORY, currentSkillList, DirectoryEntities.SKILL_ACTIVITY);
            if (!this.searchText)
                this.entityCounts.skillList = (currentSkillList === null || currentSkillList === void 0 ? void 0 : currentSkillList.length) || 0; // to keep track of skill list records count
            return currentSkillList;
        });
    }
    /**
     * Used to handle the pagination based on the offset and limit in case of normal directory request flow without search request
     * @param directoryResponse - directory response object
     */
    handleDirectoryPagination() {
        return __awaiter(this, void 0, void 0, function* () {
            const skillPaginationResponse = { skillActivityData: [], totalRecords: 0, totalSearchResultCount: 0 };
            const db = yield dbInstance();
            skillPaginationResponse.skillActivityData = (yield (db === null || db === void 0 ? void 0 : db.get(IndexDBStoreNames.DIRECTORY, DirectoryEntities.SKILL_ACTIVITY)));
            [skillPaginationResponse.skillActivityData, skillPaginationResponse.totalSearchResultCount] = DirectorySearchFilter(Object.assign(Object.assign({ searchText: this.searchText, data: skillPaginationResponse.skillActivityData, filterType: 'skillName' }, (this.mediaTypeId && { mediaTypeIds: this.mediaTypeId === MediaTypeId.PhoneCall ? [this.mediaTypeId] : [this.mediaTypeId, MediaTypeId.PhoneCall] })), { limit: this.limit, offset: this.offset, isOutbound: this.isOutbound }));
            skillPaginationResponse.totalRecords = this.entityCounts.skillList;
            return skillPaginationResponse;
        });
    }
    /**
     * method to filter skill list on the basis on mediatypeid and isoutbound property
     * @example
     * ```
     * this.filterSkillwithMediatype();
     * ```
     */
    filterSkillwithMediatype(skillActivityEvent) {
        return skillActivityEvent.filter((item) => {
            return (((item.mediaTypeId === this.mediaTypeId || item.mediaTypeId === MediaTypeId.PhoneCall) && item.isOutbound === this.isOutbound));
        });
    }
    /**
     * method to filter skill list on the basis on mediatype, isActive and isOutbound property
     * @param skillActivityEvent - List of skillActivityEvent
     * @example
     * ```
     * this.filterActiveSkillswithMediatype([SkillActivityEvent, SkillActivityEvent]);
     * ```
     */
    filterActiveSkillswithMediatype(skillActivityEvent) {
        return skillActivityEvent.filter((item) => {
            return ((item.mediaTypeId === this.mediaTypeId || item.mediaTypeId === MediaTypeId.PhoneCall) && item.isOutbound === this.isOutbound && item.isActive);
        });
    }
    /**
     * Use to sort skill list in ascending order
     * @example -
     * ```
     * this.sortResponse(skillList)
     * ```
     */
    sortResponse(skillList) {
        skillList.sort((a, b) => {
            const firstValue = a.skillName.toLowerCase();
            const secondValue = b.skillName.toLowerCase();
            if (firstValue > secondValue) {
                return 1;
            }
            if (firstValue < secondValue) {
                return -1;
            }
            return 0;
        });
        return skillList;
    }
}
//# sourceMappingURL=cxone-skill-activity-provider.js.map