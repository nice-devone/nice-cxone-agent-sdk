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
        const baseUrl = this.auth.getCXoneConfig().acdApiBaseUri;
        const authToken = this.auth.getAuthToken().accessToken;
        const url = baseUrl + this.GET_AGENT_STATE_PERFORMANCE_REPORT.replace('{agentId}', agentId) + '?startDate=' + startDate + '&endDate=' + endDate;
        const reqInit = {
            headers: this.utilService.initHeader(authToken, 'application/json')
                .headers,
        };
        return new Promise((resolve, reject) => {
            HttpClient.get(url, reqInit).then((response) => {
                this.logger.info('Agent State History Report', 'getAgentStateHistory Success');
                const agentStateHistory = new AgentStateHistoryResponse();
                agentStateHistory.parse(response.data);
                resolve(agentStateHistory);
            }, (err) => {
                this.logger.error('Agent State History Report', 'getAgentStateHistory Failed' + JSON.stringify(err));
                reject(err);
            });
        });
    }
}
//# sourceMappingURL=cxone-realtime-report-service.js.map