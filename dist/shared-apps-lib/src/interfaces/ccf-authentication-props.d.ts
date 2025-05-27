export interface AuthSettings {
    cxoneHostname: string;
    clientId: string;
    redirectUri: string;
    originatingServiceIdentifier: string;
    state?: string;
}
export interface CcfAuthenticationProps {
    consumerAppName: string;
    authSettings: AuthSettings;
    authMode: string;
    codeChallengeMethod: string;
    app: string;
    appName?: string;
    appHelpUrl?: string;
    queryString?: string;
    authTarget?: string;
}
