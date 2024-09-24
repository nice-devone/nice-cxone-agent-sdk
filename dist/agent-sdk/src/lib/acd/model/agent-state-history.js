/**
 * Modal for Agent State History Report
 */
export class AgentStateHistoryResponse {
    constructor() {
        this.agentStateHistory = (Array);
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
        this.agentStateHistory = data.agentStateHistory;
    }
    ;
}
//# sourceMappingURL=agent-state-history.js.map