/**
 * Shared interface for app parameters
 */
export interface AppConfigParams {
    appName: string;
    appAuthDisplay: string;
    cxoneClientId: string;
    cxoneCtdExtensionId: string;
    cxoneVoiceExtensionId: string;
    cxoneVdiMediaRedirectorExtId: string;
    app: string;
    appHelpUrl: string;
    queryString: string;
    authTarget?: string;
    cxoneNCExtensionId: string;
    cxoneScreenAgentChromeExtensionId?: string;
    cxoneScreenAgentEdgeExtensionId?: string;
}
