/// <reference types="node" />
import { AgentLegEvent, UserInfo } from '@nice-devone/common-sdk';
import { AgentSettings } from '@nice-devone/core-sdk';
import { CXoneVoiceCall, CXoneVoiceConnection } from '@nice-devone/voice-sdk';
import { Subject } from 'rxjs';
import { EventEmitter } from 'events';
/**
 * Wrapper class for CXone Voice Connection
 */
export declare class CXoneVoiceClientWrapper {
    private logger;
    private static singleton;
    private cxoneVoiceClient;
    private isVqmEnabled;
    isWebRTCExtensionInstalled: boolean;
    cxoneVoiceExtensionId: string;
    onConnectionStatusChanged: Subject<CXoneVoiceConnection>;
    onCallStatusChanged: Subject<CXoneVoiceCall>;
    isWebNCExtensionInstalled: boolean;
    isNoiseCancellationFeatureEnabledOnBU: boolean;
    isNoiseCancellationExtInstalled: boolean;
    isIrisEnabled: boolean;
    cxoneNCExtensionId: string;
    events: EventEmitter;
    /**
     * @example
     * ```
     * let instance = new CXoneVoiceClientWrapper();
     * ```
     */
    constructor();
    /**
     * Opens connection with the chrome extension
     * @param cxoneVoiceExtensionId - voice extension id
     * @example
     * ```
     * setVoiceExtensionId('jfncpcbbaobdpgnpenocnkdfpabnmfnd')
     * ```
     */
    initializeVoiceExtension(): void;
    /**
     * Opens connection with the chrome extension
     * @param cxoneNCExtensionId - NC extension id
     * @example
     * ```
     * setNCExtensionId('pjgfeeohcimebggggoloiekjhadhhaca')
     * ```
     */
    initializeNCExtension(): void;
    /**
     * sends message to the chrome extension
     * @param data  - the actual data to be passed to the chrome extension
     * @example
     * ```
     *  sendMessageToWebRTCExtension(data:{})
     * ```
     */
    sendMessageToWebRTCExtension(data: any): void;
    /**
     * Method to create singleton object of the class
     * ```
     * @example
     * const cXoneVoiceClientWrapper = CXoneVoiceClientWrapper.instance();
     * ```
     */
    static get instance(): CXoneVoiceClientWrapper;
    /**
     * If chrome extension is installed then Initialize this client and connect to the WebRTC server.  or pass the same info into the voice extension
     * @param acdAgentId - CXone agent number, that will be used for voice connection
     * @param options - CXone audio connection options that has WebRTC server information
     * @param audioElement - audio element used to open audio stream
     * @example
     * ```
     * voiceClient.connectServer('4321', options, audioElement);
     * ```
     */
    connectServer(acdAgentId: string, options: AgentSettings, audioElement: HTMLAudioElement, userInfo: UserInfo, app: string): Promise<void>;
    /**
     * Checks if the noise cancellation feature is enabled.
     *
     * @param irisNoiseCancellationKey - The key used for Iris noise cancellation.
     * @param userInfo - The user information containing tenantId and userId.
     *
     * @example
     * ```
     * cxoneVoiceClient.checkNoiseCancellationFeature('your-iris-key', { tenantId: 'tenant-id', userId: 'user-id' });
     * ```
     */
    checkNoiseCancellationFeature(irisNoiseCancellationKey: string, userInfo: UserInfo): Promise<boolean>;
    /**
     * If chrome extension is installed then Send an request to initialize a audio streaming to the connected WebRTC server  or pass the same info into the voice extension
     * @param agentLeg - CXone agent leg having contactId and status
     * @example
     * ```
     * voiceClient.handleAgentLegEvent(agentLeg);
     * ```
     */
    handleAgentLegEvent(agentLeg: AgentLegEvent): void;
    /**
     * If chrome extension is installed then Disconnect from WebRTC server  or pass the same info into the voice extension
     * @example
     * ```
     * voiceClient.disconnectServer();
     * ```
     */
    disconnectServer(): void;
    /**
     * If chrome extension is installed then Connect Agent leg or pass the same info into the voice extension
     * @example
     * ```
     * voiceClient.connectAgentLeg(234);
     * ```
     */
    connectAgentLeg(agentLegId: string): void;
    /**
     * If chrome extension is installed then Set the webRtc volume or pass the same info into the voice extension
     * @example voiceClient.volumeChange();
     * @param volume - webRtc volume
     */
    volumeChange(volume: number): void;
    /**
     * Check if the chrome extension is installed in the browser or not.
     * @param extensionId -  the chrome extension id
     * @example
     * ```
     * isChromeExtensionInstalled('gcfjbjldfomnopnpdjajjfpldkkdmmoi')
     * ```
     */
    isChromeExtensionInstalled(extensionId: string): Promise<boolean>;
    /**
     * When the microphone permission is denied then display the error message
     *
     * @example
     * CXoneVoiceClientWrapper.instance.notifyMissingMicPermission(true, 'extension-id');
     */
    notifyMissingMicPermission(isExtensionInstalled: boolean, extensionId: string): void;
    /**
     * Check if the chrome extension is installed in the browser or not.
     * @example
     * ```
     * isNoiseCancellationFeatureEnabled()
     * ```
     */
    isNoiseCancellationFeatureEnabled(): Promise<boolean>;
    /**
     * Toggles microphone processing for voice isolation.
     * @param value - A boolean indicating whether to enable (`true`) or disable (`false`) microphone processing.
     * @example
     * ```
     * voiceClientWrapper.enableMicIris(true);
     * ```
     */
    enableMicIris(value: boolean): void;
    /**
     * Toggles speaker processing for voice isolation.
     * @param value - A boolean indicating whether to enable (`true`) or disable (`false`) speaker processing.
     * @example
     * ```
     * voiceClientWrapper.enableSpeakerIris(true); // Enables speaker processing
     * ```
     */
    enableSpeakerIris(value: boolean): void;
    /**
     * Adjusts the microphone mix level for noise cancellation.
     * @param value - A number representing the new mix level for the microphone.
     *
     * @example
     * ```
     * voiceClientWrapper.enableNCMicChange(50); // Sets the microphone mix level to 50
     * ```
     */
    enableNCMicChange(value: number): void;
    /**
     * Adjusts the speaker mix level for noise cancellation.
     * @param value - 0. - 1., a number representing the new mix level for the speaker.
     *
     * @example
     * ```
     * voiceClientWrapper.enableNCSpeakerChange(0.7); // Sets the speaker mix level to 0.7 (70%)
     * ```
     */
    enableNCSpeakerChange(value: number): void;
    /**
     * receives messages from the extension's background script
     * @param data - the actual data to be passed to the chrome extension
     * @returns
     * @example
     * ```
     * onMessageReceivedFromChromeExtension(data)
     * ```
     */
    onMessageReceivedFromChromeExtension(data: CXoneVoiceConnection): void;
}
