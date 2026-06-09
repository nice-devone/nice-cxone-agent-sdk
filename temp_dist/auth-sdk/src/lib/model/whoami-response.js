/**
 * Declare WhoAmI Details
 */
export class WhoamiResponse {
    /**
     * This method to parse WhoAmI response data
     * @param data - Whoami API response
     * ```
     * @example
     * const whoAmI = new WhoamiResponse();
     * whoAmI.parseData(data);
     * ```
     */
    parseData(data) {
        this.agentId = parseInt(data.agent_id);
        this.busNo = parseInt(data.bus_no);
        this.expiresIn = parseInt(data.expires_in);
        this.iss = data.iss;
        this.refreshTokenServerUri = data.refresh_token_server_uri;
        this.resourceServerBaseUri = data.resource_server_base_uri.replace(/\/incontactapi\//gi, '');
        this.sub = data.sub;
        this.teamId = parseInt(data.team_id);
    }
}
//# sourceMappingURL=whoami-response.js.map