import { PersistentPanel } from './persistent-panel';
/**
 * Interface to declare all the Agent settings details
 */
export interface AgentSettings {
    /**
    * @remarks - CXA client version
    */
    cxaClientVersion: string;
    /**
     * @remarks - WebRTC Type
     */
    webRTCType: string;
    /**
     * @remarks - WebRTCWss Urls
     */
    webRTCWssUrls: Array<string>;
    /**
     * @remarks - WebRTC Server Domain
     */
    webRTCServerDomain: string;
    /**
     * @remarks - WebRTC Ice Urls
     */
    webRTCIceUrls: Array<string>;
    /**
     * @remarks - WebRTC Dnis
     */
    webRTCDnis: string;
    /**
     * @remarks - Array of PersistentPanel/CustomWorkspace
     */
    persistentPanels: Array<PersistentPanel>;
    /**
     * @remarks - delete commitment
     */
    deleteCommitmentString: string;
    /**
     * @remarks - Datadog Application Id
     */
    dataDogAppID: string;
    /**
     * @remarks - Datadog Client Token
     */
    dataDogClientToken: string;
    /**
     * @remarks - Datadog Sample Rate
     */
    dataDogSampleRate: string;
    /**
    * @remarks - Max Conference Parties
    */
    maxConferenceParties: number;
    /**
    * @remarks - Voice Quality Monitoring feature toogle
    */
    vqmIntegratedSoftphoneMonitoring: boolean;
    /**
     * @remarks - Voice Quality Monitoring Key
     */
    vqmMonitoringKey: string;
    /**
    * @remarks - Enable UI Queue
    */
    enableUIQueue: boolean;
    /**
    * @remarks - IRIS Noise Cancellation Key
    */
    irisNoiseCancellationKey: string;
}
