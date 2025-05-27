/**
 * Declare the AuthToken
 */
export declare class AuthToken {
    accessToken: string;
    refreshToken: string;
    tokenType: string;
    expiresIn: number;
    issuedTokenType: string;
    idToken: string;
    accessTokenTime: number;
    /**
     * This method to parse auth token data
     * @param data - token API response
     * @example
     * ```
     * const authToken = new AuthToken();
     * authToken.parseData(data);
     * ```
     */
    parseData(data: any): void;
}
