import { CXoneAuth } from '@nice-devone/auth-sdk';
import { CXoneSdkError, CXoneSdkErrorType } from '@nice-devone/common-sdk';
import { HttpUtilService, Logger, HttpClient, } from '@nice-devone/core-sdk';
/**
 * Class to handle VoiceBioHubService API calls
 */
export class VoiceBioHubService {
    /**
    * @example
    */
    constructor() {
        //voice bio hub APIs
        this.VOICE_BIO_AGENT_LOGIN = 'InContactAPI/services/v15.0/adaptor/voicebiohub/voicebioagentlogin';
        this.VOICE_BIO_SUBMIT_PATRON = 'InContactAPI/services/v15.0/adaptor/voicebiohub/voicebioaction';
        this.VOICE_BIO_AGENT_LOGOUT = 'InContactAPI/services/v15.0/adaptor/voicebiohub/voicebioagentlogout';
        this.logger = new Logger('voice bio hub', 'voice bio hub Service');
        this.utilService = new HttpUtilService();
        this.auth = CXoneAuth.instance;
    }
    /**
     * Method to authenticate agent
     * @param voiceBioAgentLoginRequest - parameter of type VoiceBioAgentLoginRequest
     *
     * @returns - Returns Success/Failure of the API
     * @example - voiceBioAgentLogin(voiceBioAgentLoginRequest)
     */
    voiceBioAgentLogin(voiceBioAgentLoginRequest) {
        const baseUrl = this.auth.getCXoneConfig().acdApiBaseUri;
        const authToken = this.auth.getAuthToken().accessToken;
        const url = baseUrl + '/' + this.VOICE_BIO_AGENT_LOGIN;
        const reqInit = {
            headers: this.utilService.initHeader(authToken, 'application/json').headers,
            body: {
                agentId: voiceBioAgentLoginRequest.agentId,
                contactId: voiceBioAgentLoginRequest.contactId,
                voiceBioConfigName: voiceBioAgentLoginRequest.voiceBioConfigName,
                CustomParams: voiceBioAgentLoginRequest.CustomParams,
            },
        };
        return new Promise((resolve, reject) => {
            HttpClient.post(url, reqInit).then((response) => {
                this.logger.info('voiceBiohub', 'voice bio agent login Successfully');
                resolve(response);
            }, (error) => {
                const errorResponse = new CXoneSdkError(CXoneSdkErrorType.CXONE_API_ERROR, 'Agent failed to login to voice bio hub system', error);
                this.logger.error('voiceBiohub', errorResponse.toString());
                reject(errorResponse);
            });
        });
    }
    /**
     * Method to LOGOUT agent from voice bio system
     * @param VoiceBioAgentActionRequest - parameter of type VoiceBioAgentLoginRequest
     *
     * @returns - Returns Success/Failure of the API
     * @example - voiceBioAgentLogout(VoiceBioAgentActionRequest)
     */
    voiceBioAgentLogout(voiceBioAgentLogOutRequest) {
        const baseUrl = this.auth.getCXoneConfig().acdApiBaseUri;
        const authToken = this.auth.getAuthToken().accessToken;
        const url = baseUrl + '/' + this.VOICE_BIO_AGENT_LOGOUT;
        const reqInit = {
            headers: this.utilService.initHeader(authToken, 'application/json').headers,
            body: {
                agentId: voiceBioAgentLogOutRequest.agentId,
                contactId: voiceBioAgentLogOutRequest.contactId,
                voiceBioConfigName: voiceBioAgentLogOutRequest.voiceBioConfigName,
                CustomParams: voiceBioAgentLogOutRequest.CustomParams,
            },
        };
        return new Promise((resolve, reject) => {
            HttpClient.post(url, reqInit).then((response) => {
                this.logger.info('voiceBiohub', 'voice bio hub-agent logged out Successfully');
                resolve(response);
            }, (error) => {
                const errorResponse = new CXoneSdkError(CXoneSdkErrorType.CXONE_API_ERROR, 'Agent failed to logout of the voice bio hub system', error);
                this.logger.error('voiceBiohub', errorResponse.toString());
                reject(errorResponse);
            });
        });
    }
    /**
     * Method for patron login in voice bio system
     * @param voiceBioAgentLoginRequest - parameter of type VoiceBioAgentLoginRequest
     *
     * @returns - Returns Success/Failure of the API
     * @example - voiceBioCustomerLogin(VoiceBioCustomerLogin)
     */
    voiceBioHubPatronActions(voiceBioCustomerActionRequest) {
        const baseUrl = this.auth.getCXoneConfig().acdApiBaseUri;
        const authToken = this.auth.getAuthToken().accessToken;
        const url = baseUrl + '/' + this.VOICE_BIO_SUBMIT_PATRON;
        const body = {
            requestType: voiceBioCustomerActionRequest.requestType,
            agentId: voiceBioCustomerActionRequest.agentId,
            personId: voiceBioCustomerActionRequest.personId,
            voiceBioConfigName: voiceBioCustomerActionRequest.voiceBioConfigName,
            contactId: voiceBioCustomerActionRequest.contactId,
            CustomParams: voiceBioCustomerActionRequest.CustomParams,
            stringParams: voiceBioCustomerActionRequest.stringParams,
        };
        if (voiceBioCustomerActionRequest.requestType === 3) {
            body.OptOutReason = voiceBioCustomerActionRequest.OptOutReason;
        }
        const reqInit = {
            headers: this.utilService.initHeader(authToken, 'application/json').headers,
            body,
        };
        return new Promise((resolve, reject) => {
            HttpClient.post(url, reqInit).then((response) => {
                this.logger.info('voiceBiohub', 'voice bio hub - request executed succesfully');
                resolve(response);
            }, (error) => {
                const errorResponse = new CXoneSdkError(CXoneSdkErrorType.CXONE_API_ERROR, 'Failed to execute voicebiohub request', error);
                this.logger.error('voiceBiohub', errorResponse.toString());
                reject(errorResponse);
            });
        });
    }
}
//# sourceMappingURL=voice-bio-hub-service.js.map