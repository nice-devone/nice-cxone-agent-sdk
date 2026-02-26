import { HttpUtilService, Logger, HttpClient, ACDSessionManager, ApiUriConstants, } from '@nice-devone/core-sdk';
import { FeatureToggleService } from '../../feature-toggle';
/**
 * Class to handle agent leg
 */
export class AgentLegService {
    /**
     * @example
     * ```
     * const agentLegSvc = new AgentLegService();
     * ```
     */
    constructor() {
        this.logger = new Logger('ACD', 'AgentLegService');
        this.utilService = new HttpUtilService();
        this.acdSession = {};
        this.acdSession = ACDSessionManager.instance;
    }
    /**
     * Method to connect agent leg
     * @example
     * ```
     * dialAgentLeg();
     * ```
     */
    dialAgentLeg() {
        const sessionId = this.acdSession.getSessionId();
        const baseUrl = this.acdSession.cxOneConfig.acdApiBaseUri;
        const authToken = this.acdSession.accessToken;
        const reqInit = this.utilService.initHeader(authToken);
        const url = baseUrl + ApiUriConstants.DIAL_AGENT_LEG_URI.replace('{sessionId}', sessionId);
        return new Promise((resolve, reject) => {
            HttpClient.post(url, reqInit).then((response) => {
                this.logger.info('dialAgentLeg', 'dial agent leg success');
                resolve(response);
            }, (error) => {
                this.logger.error('dialAgentLeg', 'dial agent leg failed :-' + error.toString());
                reject(error);
            });
        });
    }
    /**
     * Method to disconnect agent leg
     * @example
     * ```
     * endAgentLeg();
     * ```
     */
    endAgentLeg() {
        const sessionId = this.acdSession.getSessionId();
        const baseUrl = this.acdSession.cxOneConfig.acdApiBaseUri;
        const authToken = this.acdSession.accessToken;
        const reqInit = this.utilService.initHeader(authToken);
        const isTenantSegmentationEnabled = FeatureToggleService.instance.getFeatureToggleSync("release-cxa-tenant-segmentation-AW-28101" /* FeatureToggles.TENANT_SEGMENTATION */);
        const endpointUri = isTenantSegmentationEnabled ? ApiUriConstants.END_AGENT_LEG_URI_TS : ApiUriConstants.END_AGENT_LEG_URI;
        const url = baseUrl + endpointUri.replace('{sessionId}', sessionId);
        return new Promise((resolve, reject) => {
            HttpClient.post(url, reqInit).then((response) => {
                this.logger.info('endAgentLeg', 'end agent leg success');
                resolve(response);
            }, (error) => {
                this.logger.error('endAgentLeg', 'end agent leg failed :-' + error.toString());
                reject(error);
            });
        });
    }
}
//# sourceMappingURL=agent-leg-service.js.map