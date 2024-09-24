/**
 * Modal for Performance metrics for all teams
 */
export class TeamPerformanceResponse {
    constructor() {
        this.teamPerformanceTotal = (Array);
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
        this.teamPerformanceTotal = data.teamPerformanceTotal;
    }
    ;
}
//# sourceMappingURL=team-performance-total-report.js.map