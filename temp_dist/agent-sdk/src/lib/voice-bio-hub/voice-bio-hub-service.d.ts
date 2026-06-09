import { CXoneSdkError, HttpResponse, VoiceBioAgentActionRequest, voiceBioPatronActions } from '@nice-devone/common-sdk';
import { HttpUtilService, Logger } from '@nice-devone/core-sdk';
/**
 * Class to handle VoiceBioHubService API calls
 */
export declare class VoiceBioHubService {
    private VOICE_BIO_AGENT_LOGIN;
    private VOICE_BIO_SUBMIT_PATRON;
    private VOICE_BIO_AGENT_LOGOUT;
    logger: Logger;
    protected utilService: HttpUtilService;
    private auth;
    /**
    * @example
    */
    constructor();
    /**
     * Method to authenticate agent
     * @param voiceBioAgentLoginRequest - parameter of type VoiceBioAgentLoginRequest
     *
     * @returns - Returns Success/Failure of the API
     * @example - voiceBioAgentLogin(voiceBioAgentLoginRequest)
     */
    voiceBioAgentLogin(voiceBioAgentLoginRequest: VoiceBioAgentActionRequest): Promise<HttpResponse | CXoneSdkError>;
    /**
     * Method to LOGOUT agent from voice bio system
     * @param VoiceBioAgentActionRequest - parameter of type VoiceBioAgentLoginRequest
     *
     * @returns - Returns Success/Failure of the API
     * @example - voiceBioAgentLogout(VoiceBioAgentActionRequest)
     */
    voiceBioAgentLogout(voiceBioAgentLogOutRequest: VoiceBioAgentActionRequest): Promise<HttpResponse | CXoneSdkError>;
    /**
     * Method for patron login in voice bio system
     * @param voiceBioAgentLoginRequest - parameter of type VoiceBioAgentLoginRequest
     *
     * @returns - Returns Success/Failure of the API
     * @example - voiceBioCustomerLogin(VoiceBioCustomerLogin)
     */
    voiceBioHubPatronActions(voiceBioCustomerActionRequest: voiceBioPatronActions): Promise<HttpResponse | CXoneSdkError>;
}
