/**
 * model to capture VoiceBioHubData
 */
export interface VoiceBioHubData {
    /**
    * @remarks topic of ws connection for voice bio hub
    */
    topic: string;
    /**
    * @remarks requestType of voicebio
    */
    requestType: number;
    /**
    * @remarks data of VoiceBioData type
    */
    data: VoiceBioData;
}
/**
 * model to capture VoiceBioData
 */
export interface VoiceBioData {
    /**
    * @remarks contactId of current IB/OB call
    */
    contactId: number;
    /**
    * @remarks personInformation of patron
    */
    personInformation: PersonInformation;
    /**
    * @remarks optInInfo of customer
    */
    optInInfo: {
        timestamp: string;
    };
    /**
    * @remarks optOutInfo of customer
    */
    optOutInfo: OptOutInfo;
    /**
    * @remarks enrollStatus of customer
    */
    enrollStatus: string;
}
/**
 * model to capture PersonInformation
 */
export interface PersonInformation {
    /**
    * @remarks personId of customer
    */
    personId: string;
    /**
    * @remarks firstname of customer
    */
    firstname: string | null;
    /**
    * @remarks lastname of customer
    */
    lastname: string | null;
}
/**
 * model to capture OptOutInfo
 */
export interface OptOutInfo {
    /**
    * @remarks timestamp of optout
    */
    timestamp: string;
    /**
    * @remarks reason of opted out
    */
    reason: string;
}
export declare enum VoiceBioRequestTypes {
    AUTHENTICATION = 0,
    ENROLLMENT = 1,
    SUBMITPERSON = 2,
    OPTOUT = 3
}
/**
 * model to capture voiceBioPatronActions
 */
export interface voiceBioPatronActions {
    /**
  * @remarks - 'requestType' is identifier for the current request type of voice bio hub.
  */
    requestType: number;
    /**
  * @remarks - 'agentId' is identifier for agent's id.
  */
    agentId: string;
    /**
  * @remarks - 'personId' is identifier for the customer in voice bio hub system.
  */
    personId: string;
    /**
  * @remarks - 'voiceBioConfigName' is identifier for the nuance profile.
  */
    voiceBioConfigName: string;
    /**
  * @remarks - 'CustomParams' is identifier for the custom parameters which voice bio hub API needs.
  */
    CustomParams: CustomParamsObject;
    /**
  * @remarks - 'OptOutReason' is identifier for opt out request data of voice bio hub.
  */
    OptOutReason?: string;
    /**
  * @remarks - 'contactId' is identifier for the current IB/OB call.
  */
    contactId: string;
    /**
  * @remarks - 'stringParams' is identifier for the parameters which voice bio hub API needs.
  */
    stringParams: string;
}
/**
 * model to capture VoiceBioAgentActionRequest
 */
export interface VoiceBioAgentActionRequest {
    /**
  * @remarks - 'agentId' is identifier for agent's id.
  */
    agentId: string;
    /**
  * @remarks - 'voiceBioConfigName' is identifier for the nuance profile.
  */
    voiceBioConfigName?: string;
    /**
  * @remarks - 'contactId' is identifier for the current IB/OB call.
  */
    contactId: string;
    /**
   * @remarks - 'CustomParams' is identifier for the custom parameters which voice bio hub API needs.
   */
    CustomParams: CustomParamsObject;
}
/**
 * model to capture CustomParamsObject
 */
export interface CustomParamsObject {
    /**
   * @remarks - 'ANI' is identifier for the current IB/OB call number
   */
    ANI: string;
    /**
   * @remarks - 'isInbound' is identifier for the call type
   */
    isInbound: boolean;
    /**
  * @remarks - 'contactId' is identifier for the current IB/OB call.
  */
    contactId: string;
    /**
  * @remarks - 'isRetry' is flag for knowing if current request is re-verify or not.
  */
    isRetry?: boolean;
}
/**
 * model to capture VoiceBioHubDataResponse
 */
export interface VoiceBioHubDataResponse {
    /**
   * @remarks - 'voiceBioHubStatus' is identifier for the status of current voice bio hub response.
   */
    voiceBioHubStatus: string;
    /**
   * @remarks - 'voiceBioHubStatus' is identifier for the detailed status of current voice bio hub response.
   */
    voiceBioHubStatusMessage: string;
    /**
   * @remarks - 'isSuccessVoiceBioHubResponseType' is identifier for current response type of voice bio hub.
   */
    isSuccessVoiceBioHubResponseType: boolean;
    /**
   * @remarks - 'voiceBioHubCurrentRequestType' is identifier for the current request type of voice bio hub.
   */
    voiceBioHubCurrentRequestType: number;
    /**
   * @remarks - 'voiceBioHubPatronId' is identifier for person id in voice bio hub system.
   */
    voiceBioHubPatronId: string;
    /**
   * @remarks - 'isSilentANIAuthentication' is identifier for person id whether it is ANI or custom.
   */
    isSilentANIAuthentication?: boolean;
    /**
   * @remarks - 'isRetry' is flag for knowing if current request is re-verify or not.
   */
    isRetry?: boolean;
}
