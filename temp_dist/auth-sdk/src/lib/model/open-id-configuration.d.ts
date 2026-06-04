/**
 * Declare Open id configuration Details
 */
export declare class OpenIDConfiguration {
    authorizationEndpoint: string;
    tokenEndpoint: string;
    endSessionEndpoint: string;
    displayValuesSupported: Array<string>;
    codeChallengeMethods: Array<string>;
    jwksURI: string;
    /**
     *
     * @param data - OpenId configuration response
     * ```
     * @example
     * const openidconfig = new OpenIDConfiguration();
     * openidconfig.parseData(data)
     * ```
     */
    parseData(data: any): void;
}
