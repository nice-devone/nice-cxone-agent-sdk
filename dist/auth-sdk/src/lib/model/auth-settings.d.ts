/**
 * CXone Authentication settings
 * @see [DEVone Documentation](https://developer.niceincontact.com/Documentation/OpenIDConnectIntegration)
 */
export interface AuthSettings {
    /**
     * Required. CXone System issuer used to discover Open ID Connect endpoints dynamically
     */
    cxoneHostname: string;
    /**
     * Required. Your client_id was returned as part of your application registration.
     */
    clientId: string;
    /**
     * Required. This value will depend on your application, must match with application registration
     */
    redirectUri: string;
    /**
     * Optional. It will be passed unmodified to the redirect callback.
     * For example, this might be used to store the URL that the user should be directed to after a successful login.
     */
    state?: string;
}
