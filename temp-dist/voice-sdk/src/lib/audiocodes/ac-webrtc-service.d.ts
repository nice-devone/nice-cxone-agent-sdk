import { Subject } from 'rxjs';
import { AgentLegEvent } from '@nice-devone/common-sdk';
import { CXoneVoiceConnection } from '../model/cxone-voice-connection';
import { CXoneVoiceCall } from '../model/cxone-voice-call';
import { CXoneVoiceConnectionOptions } from '../model/cxone-voice-connection-options';
/**
 * Class to perform Integrated Softphone related task
 */
export declare class ACWebRtcService {
    private logger;
    private validationUtilSvc;
    private audioCode;
    private audioCodeCall;
    private audioCodeIsConnected;
    private audioCodeConnectRequested;
    private lastAgentLegIdCall;
    private options;
    private agentLegId;
    private agentLegState;
    private connectedSBC;
    private readonly AudioCodesHeader;
    private readonly AudioCodesHeaderReplace;
    private acdAgentId;
    private audioElement;
    private appName;
    needToShowAgentLegAcceptReject: {
        (): boolean;
    };
    isContactNotEnded: {
        (): boolean;
    };
    onConnectionStatusChanged: Subject<CXoneVoiceConnection>;
    onCallStatusChanged: Subject<CXoneVoiceCall>;
    /**
       * constructor for initialization params
       * @example
       * ```
       * const webRtcService = new ACWebRtcService();
       * ```
       */
    constructor();
    /**
       * Method to init and connect to audio code server
       * @example
       * ```
       * webRtcService.init("12345", options, audioElement);
       * ```
       */
    init(acdAgentId: string, options: CXoneVoiceConnectionOptions, audioElement: HTMLAudioElement, appName: string): void;
    /**
       * Method to set the audio volume
       * @example webRtcService.volumeChange()
       * @param volume - number
       */
    volumeChange(volume: number): void;
    /**
       * Method to disconnect WebRTC server
       * @example
       * ```
       * webRtcService.disconnectServer()
       * ```
       */
    disconnectServer(): void;
    /**
       * Method to store AudioCode call data
       * @param event - event from windows
       * @example
       * ```
       * this.onBeforeUnload.bind(this);
       * ```
       */
    private onBeforeUnload;
    /**
       * Method to process agent leg event
       * @example
       * ```
       * webRtcService.handleAgentLegEvent(AgentLegEvent);
       * ```
       */
    handleAgentLegEvent(agentLeg: AgentLegEvent): void;
    /**
       * Method to initiate AudioCode server if agent setting is not null or empty
       * @example
       * ```
       * this.connectAgentLeg('12345');
       * ```
       */
    connectAgentLeg(agentLegId: string): void;
    /**
       * Method to make Agent Leg call and login to Audio codes server
       * @example
       * ```
       * this.connectAgentLeg();
       * ```
       */
    private connectAudioCodeServer;
    /**
       * Method to check if Mic or Speaker is available
       * @example
       * ```
       * this.isSpeakerandMicAvailable();
       * ```
       */
    private isSpeakerandMicAvailable;
    /**
       * Method to request media access
       * @example
       * ```
       * this.requestMediaAccess();
       * ```
       */
    private requestMediaAccess;
    /**
       * Stop the unused audio tracks of the stream. Fix for SF-13447 - NoAnswer - Call Refusal due to Could not start audio source error.
       * @param mediaStream  - the requested stream
       */
    private stopAudioTrack;
    /**
       * Method to initiate Audio codes server
       * @example
       * ```
       * this.loginAudioCodeServer();
       * ```
       */
    private loginAudioCodeServer;
    /**
       * Callback function for Audiocodes library logger
       */
    private acLog;
    /**
       * Callback function for jsSIP library logger
       */
    private jssipLog;
    /**
       * Audiocodes library callback methods
       * @example
       * ```
       * this.audiocodeListeners.call(this)
       * ```
       */
    private audiocodeListeners;
    /**
       * Method get Audio Codes Server details
       * @param webRTCWSSUrls - contains Get webRTC URL
       * @param prevConnectedSBC - contains Previous connection details
       * @returns it will return the WebRTC ServerURL to set ServerConfig
       */
    private getAudioCodeServer;
    /**
       * Restores the previously connected call or makes new call
       * @example
       * ```
       * this.makeAgentLegCall();
       * ```
       */
    private makeAgentLegCall;
    /**
       * Makes a call with replace header from previously connected call.
       * In case of refresh to retain a previous call this function is used.
       * @returns boolean true if there is a active agent leg call in localstorate to restore else return false.
       */
    private restoreCall;
    /**
       * Stores the data needed to restore audio call on page refresh
       */
    private storeAudioCodeCallData;
    /**
       * Method to Logout Audio Codes Server
       * @example
       * ```
       * this.logoutAudioCodeServer();
       * ```
       */
    private logoutAudioCodeServer;
    /**
       * Method to Disconnect AgentLeg
       * @example
       * ```
       * this.disconnectAgentLeg();
       * ```
       */
    disconnectAgentLeg(): void;
    /**
     * Method to remove connected SBC data from the localstorage
     * @example
     * ```
     * this.removeConnectedSBC();
     * ```
     */
    private removeConnectedSBC;
}
