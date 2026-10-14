import { AgentLegEvent } from '@nice-devone/common-sdk';
import { Subject } from 'rxjs';
import { AudioDeviceChangeEvent } from './model/audio-device-change-event';
import { CXoneVoiceCall } from './model/cxone-voice-call';
import { CXoneVoiceConnection } from './model/cxone-voice-connection';
import { CXoneVoiceConnectionOptions } from './model/cxone-voice-connection-options';
/**
 * Wrapper class for CXone Voice Connection
 */
export declare class CXoneVoiceClient {
    private voiceConnection;
    private voiceCall;
    private webRtcService;
    private logger;
    private static singleton;
    onConnectionStatusChanged: Subject<CXoneVoiceConnection>;
    onCallStatusChanged: Subject<CXoneVoiceCall>;
    onAudioDeviceChange: Subject<AudioDeviceChangeEvent>;
    /**
     * Constructor for Voice Client
     * @example
     * ```
     * voiceClient = new CXoneVoiceClient();
     * ```
     */
    constructor();
    /**
     * Method to create singleton object of the class
     * ```
     * @example
     * const CXoneVoiceClient = CXoneVoiceClient.instance();
     * ```
     */
    static get instance(): CXoneVoiceClient;
    /**
     * Gets current WebRTC connection state
     * @example
     * ```
     * voiceClient.connectionState;
     * ```
     */
    get connectionState(): CXoneVoiceConnection;
    /**
     * Gets current voice call state
     * @example
     * ```
     * voiceClient.callState;
     * ```
     */
    get callState(): CXoneVoiceCall;
    /**
     * Initialize this client and connect to the WebRTC server.
     * Please use `onConnectionStatusChanged` event for both success and failure notification for server connectivity
     * @param acdAgentId - CXone agent number, that will be used for voice connection
     * @param options - CXone audio connection options that has WebRTC server information
     * @param audioElement - audio element used to open audio stream
     * @example
     * ```
     * voiceClient.connectServer('12345', options, audioElement);
     * ```
     */
    connectServer(acdAgentId: string, options: CXoneVoiceConnectionOptions, audioElement: HTMLAudioElement, appName: string): void;
    /**
     * Send an request to initialize a audio streaming to the connected WebRTC server.
     * Please use `onCallStatusChanged` event for both success and failure notification for voice call
     * @param agentLeg - CXone agent leg having contactId and status
     * @example
     * ```
     * voiceClient.handleAgentLegEvent(agentLeg);
     * ```
     */
    handleAgentLegEvent(agentLeg: AgentLegEvent): void;
    /**
     * Disconnect from WebRTC server
     * @example
     * ```
     * voiceClient.disconnectServer();
     * ```
     */
    disconnectServer(): void;
    /**
     * Disconnect from WebRTC server
     * @example
     * ```
     * voiceClient.disconnectServer();
     * ```
     */
    connectAgentLeg(agentLegId: string): void;
    /**
     * Set the webRtc volume
     * @example voiceClient.volumeChange();
     * @param volume - webRtc volume
     */
    volumeChange(volume: number): void;
    /**
     * Enables SDK user to auto accept the call in CXone Agent
     * @param agentLegId - input agent leg id
     * @example
     * ```
     * triggerAutoAccept(agentLegId);
     * ```
     */
    triggerAutoAccept(agentLegId: string): void;
    /**
     * Replaces the active audio input track on the live RTP sender during mid-call audio device failover.
     * @param newTrack - the new MediaStreamTrack for the microphone input
     * @example
     * ```
     * voiceClient.replaceTrack(newTrack);
     * ```
     */
    replaceTrack(newTrack: MediaStreamTrack): Promise<void>;
    /**
     * Sets the audio output device on the audio element during mid-call audio device failover
     * @param deviceId - the deviceId of the target audio output device
     * @example
     * ```
     * voiceClient.setSinkId('device-id');
     * ```
     */
    setSinkId(deviceId: string): Promise<void>;
    /**
     * Returns the active audio input track label from the current sender to seed the known active device on call connect.
     * @returns the track label string, or null if unavailable
     * @example
     * ```
     * voiceClient.getActiveAudioTrackLabel();
     * ```
     */
    getActiveAudioTrackLabel(): string | null;
    /**
     * Emits the processed audio device change event to all {@link onAudioDeviceChange} subscribers.
     * @param event - the {@link AudioDeviceChangeEvent} payload to emit
     * @example
     * ```
     * voiceClient.emitAudioDeviceChange(event);
     * ```
     */
    emitAudioDeviceChange(event: AudioDeviceChangeEvent): void;
}
