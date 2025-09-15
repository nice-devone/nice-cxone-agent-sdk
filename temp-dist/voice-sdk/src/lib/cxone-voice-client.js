"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CXoneVoiceClient = void 0;
const core_sdk_1 = require("@nice-devone/core-sdk");
const rxjs_1 = require("rxjs");
const ac_webrtc_service_1 = require("./audiocodes/ac-webrtc-service");
/**
 * Wrapper class for CXone Voice Connection
 */
class CXoneVoiceClient {
    /**
     * Constructor for Voice Client
     * @example
     * ```
     * voiceClient = new CXoneVoiceClient();
     * ```
     */
    constructor() {
        this.logger = new core_sdk_1.Logger('VoiceSDK', 'VoiceClient');
        this.logger.info('constructor', 'Init');
        this.voiceConnection = {};
        this.voiceCall = {};
        this.webRtcService = new ac_webrtc_service_1.ACWebRtcService();
        this.onConnectionStatusChanged = new rxjs_1.Subject();
        this.onCallStatusChanged = new rxjs_1.Subject();
        this.webRtcService.onConnectionStatusChanged.subscribe((response) => {
            this.onConnectionStatusChanged.next(response);
        });
        this.webRtcService.onCallStatusChanged.subscribe((response) => {
            this.onCallStatusChanged.next(response);
        });
    }
    /**
     * Method to create singleton object of the class
     * ```
     * @example
     * const CXoneVoiceClient = CXoneVoiceClient.instance();
     * ```
     */
    static get instance() {
        if (!CXoneVoiceClient.singleton) {
            CXoneVoiceClient.singleton = new CXoneVoiceClient();
        }
        return CXoneVoiceClient.singleton;
    }
    /**
     * Gets current WebRTC connection state
     * @example
     * ```
     * voiceClient.connectionState;
     * ```
     */
    get connectionState() {
        return this.voiceConnection;
    }
    /**
     * Gets current voice call state
     * @example
     * ```
     * voiceClient.callState;
     * ```
     */
    get callState() {
        return this.voiceCall;
    }
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
    connectServer(acdAgentId, options, audioElement, appName) {
        this.logger.info('connectServer', `param acdAgentId: ${acdAgentId}`);
        this.webRtcService.init(acdAgentId, options, audioElement, appName);
    }
    /**
     * Send an request to initialize a audio streaming to the connected WebRTC server.
     * Please use `onCallStatusChanged` event for both success and failure notification for voice call
     * @param agentLeg - CXone agent leg having contactId and status
     * @example
     * ```
     * voiceClient.handleAgentLegEvent(agentLeg);
     * ```
     */
    handleAgentLegEvent(agentLeg) {
        this.logger.info('handleAgentLegEvent', `param agentLeg: ${JSON.stringify(agentLeg)}`);
        this.webRtcService.handleAgentLegEvent(agentLeg);
    }
    /**
     * Disconnect from WebRTC server
     * @example
     * ```
     * voiceClient.disconnectServer();
     * ```
     */
    disconnectServer() {
        this.logger.info('disconnectServer', 'disconnecting WebRTC server');
        this.webRtcService.disconnectServer();
    }
    /**
     * Disconnect from WebRTC server
     * @example
     * ```
     * voiceClient.disconnectServer();
     * ```
     */
    connectAgentLeg(agentLegId) {
        this.logger.info('connectAgentLeg', `param agentLeg: ${agentLegId}`);
        this.webRtcService.connectAgentLeg(agentLegId);
    }
    /**
     * Set the webRtc volume
     * @example voiceClient.volumeChange();
     * @param volume - webRtc volume
     */
    volumeChange(volume) {
        this.logger.info('volumeChange', `param volume: ${volume}`);
        this.webRtcService.volumeChange(volume);
    }
    /**
     * Enables SDK user to auto accept the call in CXone Agent
     * @param agentLegId - input agent leg id
     * @example
     * ```
     * triggerAutoAccept(agentLegId);
     * ```
     */
    triggerAutoAccept(agentLegId) {
        var _a;
        this.logger.info('triggerAutoAccept', `param agentLeg: ${agentLegId}`);
        const msg = {
            issuer: 'CXA',
            messageType: 'AutoAccept',
            agentLegId,
        };
        const iFrame = document.getElementById('launchCXAFrame');
        if (iFrame)
            (_a = iFrame === null || iFrame === void 0 ? void 0 : iFrame.contentWindow) === null || _a === void 0 ? void 0 : _a.postMessage(msg, '*');
    }
}
exports.CXoneVoiceClient = CXoneVoiceClient;
//# sourceMappingURL=cxone-voice-client.js.map