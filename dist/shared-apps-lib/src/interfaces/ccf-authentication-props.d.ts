export interface AuthSettings {
    cxoneHostname: string;
    clientId: string;
    redirectUri: string;
    state?: string;
    isVerificationRequired?: boolean;
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
