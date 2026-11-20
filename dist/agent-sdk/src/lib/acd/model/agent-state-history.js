/**
 * Modal for Agent State History Report
 */
export class AgentStateHistoryResponse {
    constructor() {
        this.agentStateHistory = [];
        /**
         * @remarks totalRecords: Total number of state-history records available for the interval, used to drive pagination.
         */
        this.totalRecords = 0;
        /**
         * @remarks businessUnitId: The business unit the state-history data belongs to.
         */
        this.businessUnitId = 0;
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
        var _a, _b;
        this.agentStateHistory = (_a = data.agentStateHistory) !== null && _a !== void 0 ? _a : [];
        this.totalRecords = (_b = data.totalRecords) !== null && _b !== void 0 ? _b : 0;
        this.businessUnitId = data.businessUnitId;
    }
    ;
}
//# sourceMappingURL=agent-state-history.js.map