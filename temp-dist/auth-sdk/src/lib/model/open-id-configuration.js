/**
 * Declare Open id configuration Details
 */
export class OpenIDConfiguration {
    /**
     *
     * @param data - OpenId configuration response
     * ```
     * @example
     * const openidconfig = new OpenIDConfiguration();
     * openidconfig.parseData(data)
     * ```
     */
    parseData(data) {
        this.authorizationEndpoint = data.authorization_endpoint;
        this.tokenEndpoint = data.token_endpoint;
        this.endSessionEndpoint = data.end_session_endpoint;
        this.displayValuesSupported = data.display_values_supported;
        this.codeChallengeMethods = data.code_challenge_methods_supported;
        this.jwksURI = data.jwks_uri;
    }
}
//# sourceMappingURL=open-id-configuration.js.map