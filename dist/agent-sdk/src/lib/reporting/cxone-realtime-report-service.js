import { __awaiter } from "tslib";
import { CXoneAuth } from '@nice-devone/auth-sdk';
import { HttpUtilService, Logger, HttpClient, } from '@nice-devone/core-sdk';
import { AgentPerformanceResponse } from '../acd/model/agent-performance-report';
import { AgentStateHistoryResponse } from '../acd/model/agent-state-history';
import { TeamPerformanceResponse } from '../acd/model/team-performance-total-report';
/**
 * Class to handle Agent and Team Performance Report API calls
 */
export class CXoneRealtimeReportService {
    /**
     * @example
     */
    constructor() {
        this.logger = new Logger('performance report', 'Performance Report Service');
        this.utilService = new HttpUtilService();
        //Api Url to be consumed by CXoneRealtimeReport Service
        this.GET_AGENT_PERFORMANCE_REPORT = '/incontactapi/services/v23.0/agents/{agentId}/performance';
        this.GET_TEAM_PERFORMANCE_TOTAL_REPORT = '/incontactapi/services/v27.0/teams/{teamId}/performance-total';
        this.GET_AGENT_STATE_PERFORMANCE_REPORT = '/incontactapi/services/v27.0/agents/{agentId}/state-history';
        //Page size used when paging the /state-history API
        this.STATE_HISTORY_PAGE_SIZE = 1000;
        //Safety cap on the number of pages fetched, in case the API ever fails to honor skip/top
        //or omits totalRecords - without this the pagination loop below could never terminate.
        this.MAX_STATE_HISTORY_PAGES = 100;
        this.auth = CXoneAuth.instance;
    }
    /**
     * Method to fetch agent performance report using agentId
     * @param Id - agent Id of the agent for which report to be fecthed
     * @param startDate - ISO 8601 beginning of report interval (from)
     * @param endDate - ISO 8601 end of report interval (to)
     * @returns - API Returns Response JSON with Agent Performance Details
     * @example - getAgentPerformance
     */
    getAgentPerformance(agentId, startDate, endDate) {
        const baseUrl = this.auth.getCXoneConfig().acdApiBaseUri;
        const authToken = this.auth.getAuthToken().accessToken;
        const url = baseUrl + this.GET_AGENT_PERFORMANCE_REPORT.replace('{agentId}', agentId) + '?startDate=' + startDate + '&endDate=' + endDate;
        const reqInit = {
            headers: this.utilService.initHeader(authToken, 'application/json')
                .headers,
        };
        return new Promise((resolve, reject) => {
            HttpClient.get(url, reqInit).then((response) => {
                this.logger.info('Agent Performance Report', 'getAgentPerformance Success');
                const agentPerformanceRes = new AgentPerformanceResponse();
                agentPerformanceRes.parse(response.data);
                resolve(agentPerformanceRes);
            }, (err) => {
                this.logger.error('Agent Performance Report', 'getAgentPerformance Failed');
                reject(err);
            });
        });
    }
    /**
     * Method to fetch team performance report using teamId
     * @param Id - teamId for which performance report is to be fecthed,
     * @param startDate - ISO 8601 beginning of report interval (from)
     * @param endDate - ISO 8601 end of report interval (to)
     * @returns - API Returns Response JSON with team Performance Details
     * within a specific duration
     * @example - getTeamPerformance
     */
    getTeamPerformance(teamId, startDate, endDate) {
        const baseUrl = this.auth.getCXoneConfig().acdApiBaseUri;
        const authToken = this.auth.getAuthToken().accessToken;
        const url = baseUrl + this.GET_TEAM_PERFORMANCE_TOTAL_REPORT.replace('{teamId}', teamId) + '?startDate=' + startDate + '&endDate=' + endDate;
        const reqInit = {
            headers: this.utilService.initHeader(authToken, 'application/json')
                .headers,
        };
        return new Promise((resolve, reject) => {
            HttpClient.get(url, reqInit).then((response) => {
                this.logger.info('Team Performance Total Report', 'getTeamPerformance Success');
                const teamPerformance = new TeamPerformanceResponse();
                teamPerformance.parse(response.data);
                resolve(teamPerformance);
            }, (err) => {
                this.logger.error('Team Performance Total Report', 'getTeamPerformance Failed' + JSON.stringify(err));
                reject(err);
            });
        });
    }
    ;
    /**
     * Method to fetch agent's state performance report using agentId
     * @param Id - agentId for which performance report is to be fecthed,
     * @param startDate - ISO 8601 beginning of report interval (from)
     * @param endDate - ISO 8601 end of report interval (to)
     * @returns - API Returns Response JSON with agent's state Performance Details
     * within a specific duration
     * @example - getAgentStateHistory
     */
    getAgentStateHistory(agentId, startDate, endDate) {
        return __awaiter(this, void 0, void 0, function* () {
            const baseUrl = this.auth.getCXoneConfig().acdApiBaseUri;
            const authToken = this.auth.getAuthToken().accessToken;
            const reqInit = {
                headers: this.utilService.initHeader(authToken, 'application/json')
                    .headers,
            };
            const aggregated = new AgentStateHistoryResponse();
            aggregated.agentStateHistory = [];
            let skip = 0;
            let hasMore = true;
            let pageCount = 0;
            try {
                while (hasMore) {
                    pageCount++;
                    if (pageCount > this.MAX_STATE_HISTORY_PAGES) {
                        this.logger.error('Agent State History Report', `getAgentStateHistory aborted pagination after ${this.MAX_STATE_HISTORY_PAGES} pages - the API may not be honoring skip/top`);
                        break;
                    }
                    const url = baseUrl +
                        this.GET_AGENT_STATE_PERFORMANCE_REPORT.replace('{agentId}', agentId) +
                        '?startDate=' + startDate + '&endDate=' + endDate +
                        '&skip=' + skip + '&top=' + this.STATE_HISTORY_PAGE_SIZE;
                    const response = yield HttpClient.get(url, reqInit);
                    const page = new AgentStateHistoryResponse();
                    page.parse(response.data);
                    aggregated.agentStateHistory.push(...page.agentStateHistory);
                    aggregated.businessUnitId = page.businessUnitId;
                    // Prefer the server-reported total as the authoritative stop condition; otherwise
                    // fall back to page fullness (a partial or empty page is always the last page).
                    const reachedReportedTotal = page.totalRecords > 0 && aggregated.agentStateHistory.length >= page.totalRecords;
                    hasMore =
                        page.agentStateHistory.length === this.STATE_HISTORY_PAGE_SIZE && !reachedReportedTotal;
                    skip += this.STATE_HISTORY_PAGE_SIZE;
                }
                aggregated.totalRecords = aggregated.agentStateHistory.length;
                this.logger.info('Agent State History Report', 'getAgentStateHistory Success');
                return aggregated;
            }
            catch (err) {
                this.logger.error('Agent State History Report', 'getAgentStateHistory Failed' + JSON.stringify(err));
                throw err;
            }
        });
    }
}
//# sourceMappingURL=cxone-realtime-report-service.js.map