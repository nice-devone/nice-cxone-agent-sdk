/**
 * Declare WhoAmI Details
 */
export declare class WhoamiResponse {
    agentId: number;
    busNo: number;
    expiresIn: number;
    iss: string;
    refreshTokenServerUri: string;
    resourceServerBaseUri: string;
    sub: string;
    teamId: number;
    /**
     * This method to parse WhoAmI response data
     * @param data - Whoami API response
     * ```
     * @example
     * const whoAmI = new WhoamiResponse();
     * whoAmI.parseData(data);
     * ```
     */
    parseData(data: {
        [key: string]: any;
    }): void;
}
