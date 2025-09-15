/**
 * Model for Agent Performance Report
 */
export class AgentPerformanceResponse {
    constructor() {
        /**
         * @remarks Performance attributes of agent
         */
        this.agentPerformance = (Array);
    }
    /**
     * Function to parse the response from API to model
     * @param data - Data object received
     * @example -
     * ```
     * parse(data);
     * ```
     */
    parse(data) {
        this.agentPerformance = data.agentPerformance;
    }
    ;
}
//# sourceMappingURL=agent-performance-report.js.map