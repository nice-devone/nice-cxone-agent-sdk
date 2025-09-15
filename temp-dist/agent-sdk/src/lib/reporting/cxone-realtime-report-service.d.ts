import { HttpUtilService, Logger } from '@nice-devone/core-sdk';
import { AgentPerformanceResponse } from '../acd/model/agent-performance-report';
import { AgentStateHistoryResponse } from '../acd/model/agent-state-history';
import { TeamPerformanceResponse } from '../acd/model/team-performance-total-report';
/**
 * Class to handle Agent and Team Performance Report API calls
 */
export declare class CXoneRealtimeReportService {
    logger: Logger;
    protected utilService: HttpUtilService;
    private auth;
    GET_AGENT_PERFORMANCE_REPORT: string;
    GET_TEAM_PERFORMANCE_TOTAL_REPORT: string;
    GET_AGENT_STATE_PERFORMANCE_REPORT: string;
    /**
     * @example
     */
    constructor();
    /**
     * Method to fetch agent performance report using agentId
     * @param Id - agent Id of the agent for which report to be fecthed
     * @param startDate - ISO 8601 beginning of report interval (from)
     * @param endDate - ISO 8601 end of report interval (to)
     * @returns - API Returns Response JSON with Agent Performance Details
     * @example - getAgentPerformance
     */
    getAgentPerformance(agentId: string, startDate: string, endDate: string): Promise<AgentPerformanceResponse>;
    /**
     * Method to fetch team performance report using teamId
     * @param Id - teamId for which performance report is to be fecthed,
     * @param startDate - ISO 8601 beginning of report interval (from)
     * @param endDate - ISO 8601 end of report interval (to)
     * @returns - API Returns Response JSON with team Performance Details
     * within a specific duration
     * @example - getTeamPerformance
     */
    getTeamPerformance(teamId: string, startDate: string, endDate: string): Promise<TeamPerformanceResponse>;
    /**
     * Method to fetch agent's state performance report using agentId
     * @param Id - agentId for which performance report is to be fecthed,
     * @param startDate - ISO 8601 beginning of report interval (from)
     * @param endDate - ISO 8601 end of report interval (to)
     * @returns - API Returns Response JSON with agent's state Performance Details
     * within a specific duration
     * @example - getAgentStateHistory
     */
    getAgentStateHistory(agentId: string, startDate: string, endDate: string): Promise<AgentStateHistoryResponse>;
}
