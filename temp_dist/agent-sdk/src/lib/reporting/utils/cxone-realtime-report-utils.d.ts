import { AgentPerformance, AgentPerformanceResponse, AgentStateHistoryResponse, PerformanceReport, ProductivityReport, TeamPerformanceResponse } from '../../acd';
/**
   * Used to calculate the productivity time and percentage of team and agent based on the provided data
   * @param teamPerformance - TeamPerformanceResponse
   * @param agentStateHistory - AgentPerformanceResponse
   * @param agentStateHistory - AgentStateHistoryResponse
   * @returns - Productivity Report
   * @example -
   * ```
   * generateProductivityReport(teamPerformance,agentPerformance,agentStateHistory);
   * ```
   */
export declare const generateProductivityReport: (productivityResponse: [AgentPerformanceResponse, TeamPerformanceResponse, AgentStateHistoryResponse]) => ProductivityReport[];
export declare const timeUnits: {
    millisecond: number;
    second: number;
    minute: number;
    hour: number;
    day: number;
    week: number;
    year: number;
    underMinute: number;
    underHour: number;
    underDay: number;
    underSixDays: number;
    underOneYear: number;
};
/**
   * Used to calculate the productivity time and percentage of team and agent based on the provided data
   * @param teamPerformance - TeamPerformanceResponse
   * @param agentPerformance - AgentPerformanceResponse
   * @returns - Performance Report
   * @example -
   * ```
   * generatePerformanceReport(teamPerformance,agentPerformance);
   * ```
   */
export declare const generatePerformanceReport: (performanceResponse: [AgentPerformanceResponse, TeamPerformanceResponse]) => PerformanceReport[];
/**
   *  method to handle AgentStateHistoryResponse and filter the state and substates based on the agentStateId
   * @param data - AgentStateHistoryResponse
   * @returns - agen and team's productivity report
   * @example - updateOutstateDetails
   */
export declare const updateOutstateDetails: (agentStateHistoryData: AgentStateHistoryResponse, agentPerformanceData: AgentPerformance) => {
    availableStates: any[];
    unavailableStates: any[];
    workingStates: any[];
};
