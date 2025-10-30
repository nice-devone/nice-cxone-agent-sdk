"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ACWebRtcService = void 0;
const core_sdk_1 = require("@nice-devone/core-sdk");
const rxjs_1 = require("rxjs");
const cxone_voice_call_status_1 = require("../enums/cxone-voice-call-status");
const cxone_voice_connection_status_1 = require("../enums/cxone-voice-connection-status");
/**
 * Class to perform Integrated Softphone related task
 */
class ACWebRtcService {
    /**
       * constructor for initialization params
       * @example
       * ```
       * const webRtcService = new ACWebRtcService();
       * ```
       */
    constructor() {
        this.logger = new core_sdk_1.Logger('VoiceSDK', 'ACWebRtcService');
        this.validationUtilSvc = new core_sdk_1.ValidationUtils();
        this.audioCodeCall = null;
        this.audioCodeIsConnected = false;
        this.audioCodeConnectRequested = false;
        this.lastAgentLegIdCall = '';
        this.options = {};
        this.connectedSBC = '';
        this.AudioCodesHeader = 'X-InContact-AgentLegId: ';
        this.AudioCodesHeaderReplace = 'Replaces: ';
        this.acdAgentId = '';
        this.audioElement = {};
        this.appName = '';
        this.needToShowAgentLegAcceptReject = () => { return false; };
        this.isContactNotEnded = () => { return true; };
        this.logger.debug('ACWebRtcService', '[Init]');
        this.onConnectionStatusChanged = new rxjs_1.Subject();
        this.onCallStatusChanged = new rxjs_1.Subject();
        this.agentLegId = '';
        this.agentLegState = '';
    }
    /**
       * Method to init and connect to audio code server
       * @example
       * ```
       * webRtcService.init("12345", options, audioElement);
       * ```
       */
    init(acdAgentId, options, audioElement, appName) {
        this.logger.info('init', `acdAgentId:${acdAgentId}, client application: ${appName}`);
        this.acdAgentId = acdAgentId;
        this.options = options;
        this.audioElement = audioElement;
        this.appName = appName;
        window.addEventListener('beforeunload', this.onBeforeUnload.bind(this));
        // Connect with Audiocodes server if not already done
        if (!this.audioCodeIsConnected) {
            this.connectAudioCodeServer();
        }
    }
    /**
       * Method to set the audio volume
       * @example webRtcService.volumeChange()
       * @param volume - number
       */
    volumeChange(volume) {
        this.audioElement.volume = volume;
        this.logger.info('volumeChange', `Setting webRTC volume to: ${volume * 100}`);
    }
    /**
       * Method to disconnect WebRTC server
       * @example
       * ```
       * webRtcService.disconnectServer()
       * ```
       */
    disconnectServer() {
        window.removeEventListener('beforeunload', this.onBeforeUnload.bind(this));
        this.logoutAudioCodeServer();
    }
    /**
       * Method to store AudioCode call data
       * @param event - event from windows
       * @example
       * ```
       * this.onBeforeUnload.bind(this);
       * ```
       */
    onBeforeUnload(event) {
        this.logger.debug('onBeforeUnload', 'EventHandler Begin');
        this.storeAudioCodeCallData();
        /**
             * Todo - Once SDK team stores the contact details in respective SDK,
             * this isContactNotEnded() function will be override from the voice SDK
             * By default this function will return true as of now.
             */
        if (this.audioCodeCall !== null && this.isContactNotEnded()) {
            event.returnValue = 'true';
        }
        this.logger.debug('onBeforeUnload', 'EventHandler End ');
    }
    /**
       * Method to process agent leg event
       * @example
       * ```
       * webRtcService.handleAgentLegEvent(AgentLegEvent);
       * ```
       */
    handleAgentLegEvent(agentLeg) {
        if (this.validationUtilSvc.isNotNullOrUndefined(agentLeg) && this.validationUtilSvc.isNotNullOrUndefined(agentLeg.agentLegId)) {
            if (agentLeg.status === this.agentLegState) {
                return;
            }
            this.agentLegState = agentLeg.status;
            switch (agentLeg.status) {
                // for safer side we are doing cleanup during agent leg dialing as well
                case 'Dialing':
                    this.audioCodeCall = null;
                    core_sdk_1.LocalStorageHelper.removeItem(core_sdk_1.StorageKeys.AGENT_LEG_CALL);
                    break;
                // In call restore case we need to connect the Agent leg
                case 'Active':
                    this.connectAgentLeg(agentLeg.agentLegId);
                    break;
                case 'Disconnected':
                    this.disconnectAgentLeg();
                    break;
            }
        }
    }
    /**
       * Method to initiate AudioCode server if agent setting is not null or empty
       * @example
       * ```
       * this.connectAgentLeg('12345');
       * ```
       */
    connectAgentLeg(agentLegId) {
        this.logger.debug('connectAgentLeg', `agentLegId: ${agentLegId}`);
        this.agentLegId = agentLegId;
        if (this.validationUtilSvc.isNullOrEmpty(this.agentLegId)) {
            this.logger.error('connectAgentLeg', 'AgentLegId is empty empty');
            return;
        }
        if (this.validationUtilSvc.isNotNullOrUndefined(this.options)) {
            this.connectAudioCodeServer();
        }
        else {
            this.logger.error('connectAgentLeg', 'init params are empty');
        }
    }
    /**
       * Method to make Agent Leg call and login to Audio codes server
       * @example
       * ```
       * this.connectAgentLeg();
       * ```
       */
    connectAudioCodeServer() {
        if (this.audioCodeConnectRequested && !this.audioCodeIsConnected) {
            this.logger.debug('connectAudioCodeServer', 'Audio connection already in progress');
            return;
        }
        this.audioCodeConnectRequested = true;
        this.logger.debug('connectAudioCodeServer', `audioCodeIsConnected:${this.audioCodeIsConnected}`);
        this.isSpeakerandMicAvailable().then((isSpeakerandMicAvailable) => {
            if (isSpeakerandMicAvailable) {
                this.requestMediaAccess().then((isMediaAccessProvided) => {
                    if (isMediaAccessProvided) {
                        if (this.audioCodeIsConnected) {
                            // dial agentleg when the webrtc server is already loggedin
                            if (this.validationUtilSvc.isNullOrEmpty(this.audioCodeCall) ||
                                (this.validationUtilSvc.isValidObject(this.audioCodeCall) && !this.audioCodeCall.isEstablished())) {
                                this.makeAgentLegCall();
                            }
                        }
                        else {
                            this.loginAudioCodeServer();
                        }
                    }
                    else {
                        this.audioCodeConnectRequested = false;
                    }
                });
            }
            else {
                this.onConnectionStatusChanged.next({
                    status: cxone_voice_connection_status_1.CXoneVoiceConnectionStatus.MEDIA_DEVICE_NOT_FOUND,
                    isLoggedIn: false,
                });
            }
        });
    }
    /**
       * Method to check if Mic or Speaker is available
       * @example
       * ```
       * this.isSpeakerandMicAvailable();
       * ```
       */
    isSpeakerandMicAvailable() {
        this.logger.debug('isSpeakerandMicAvailable', 'Detecting Speaker and Mic availablility');
        let isSpeakerAvailable = false;
        let isMicAvailable = false;
        const mediaDevices = navigator.mediaDevices.enumerateDevices();
        return mediaDevices.then((devices) => {
            devices.forEach((device) => {
                switch (device.kind) {
                    case 'audioinput':
                        isMicAvailable = true;
                        break;
                    case 'audiooutput':
                        isSpeakerAvailable = true;
                        break;
                }
            });
            this.logger.debug('isSpeakerandMicAvailable', 'isSpeakerAvailable: ' + isSpeakerAvailable + ' isMicAvailable: ' + isMicAvailable);
            if (isSpeakerAvailable && isMicAvailable) {
                return true;
            }
            this.logger.error('isSpeakerandMicAvailable', 'Both Speaker and Mic are Required');
            return false;
        }).catch((err) => {
            this.logger.error('isSpeakerandMicAvailable', 'Error Details: ' + err.message);
            return false;
        });
    }
    /**
       * Method to request media access
       * @example
       * ```
       * this.requestMediaAccess();
       * ```
       */
    requestMediaAccess() {
        this.logger.debug('requestMediaAccess', 'Requesting Media access...');
        const mediaConstraint = {
            audio: true,
            video: false,
        };
        return navigator.mediaDevices.getUserMedia(mediaConstraint)
            .then((mediaStream) => {
            this.stopAudioTrack(mediaStream);
            this.logger.debug('requestMediaAccess', 'Audio device access granted');
            return true;
        })
            .catch((err) => {
            this.logger.error('requestMediaAccess', 'Audio device error: ' + err.message);
            if (err.name === 'NotFoundError') {
                this.onConnectionStatusChanged.next({
                    status: cxone_voice_connection_status_1.CXoneVoiceConnectionStatus.MEDIA_DEVICE_NOT_FOUND,
                    isLoggedIn: false,
                });
            }
            else {
                this.onConnectionStatusChanged.next({
                    status: cxone_voice_connection_status_1.CXoneVoiceConnectionStatus.MEDIA_DEVICE_ACCESS_DENIED,
                    isLoggedIn: false,
                });
            }
            return false;
        });
    }
    /**
       * Stop the unused audio tracks of the stream. Fix for SF-13447 - NoAnswer - Call Refusal due to Could not start audio source error.
       * @param mediaStream  - the requested stream
       */
    stopAudioTrack(mediaStream) {
        try {
            const audioTracks = mediaStream.getAudioTracks();
            if (audioTracks && audioTracks.length > 0) {
                audioTracks[0].stop();
                this.logger.debug('stopAudioTrack', ' media stream released');
            }
        }
        catch (ex) {
            this.logger.error('stopAudioTrack', 'Exception on audio track stop: ' + JSON.stringify(ex));
        }
    }
    /**
       * Method to initiate Audio codes server
       * @example
       * ```
       * this.loginAudioCodeServer();
       * ```
       */
    loginAudioCodeServer() {
        var _a, _b, _c, _d;
        this.logger.debug('loginAudioCodeServer', `[Init] AudioCodesUA initializing for the agent id:${this.acdAgentId}`);
        try {
            this.onConnectionStatusChanged.next({
                status: cxone_voice_connection_status_1.CXoneVoiceConnectionStatus.CONNECTING,
                isLoggedIn: false,
            });
            //const agentInfoStr = LocalStorageHelper.getItem(StorageKeys.AGENT_INFO);
            if (this.validationUtilSvc.isNotNullOrEmpty(this.acdAgentId)) {
                //const agentInfo = JSON.parse(agentInfoStr);
                const agentId = this.acdAgentId;
                const lastConnectedSBC = core_sdk_1.LocalStorageHelper.getItem(core_sdk_1.StorageKeys.CONNECTED_AC_SERVER) || '';
                const acServers = this.getAudioCodeServer(this.options.webRTCWssUrls, lastConnectedSBC); // Apply server priority
                //update echo and noise cancelation settings based on values from roles and permissions. fallback to false if not passed
                const echoCancellation = (_b = (_a = this.options) === null || _a === void 0 ? void 0 : _a.echoCancellation) !== null && _b !== void 0 ? _b : false;
                const noiseCancellation = (_d = (_c = this.options) === null || _c === void 0 ? void 0 : _c.noiseCancellation) !== null && _d !== void 0 ? _d : false;
                const phoneConfig = {
                    reconnectIntervalMin: 2,
                    reconnectIntervalMax: 30,
                    registerExpires: 600,
                    useSessionTimer: false,
                    pingInterval: 10,
                    pongTimeout: true,
                    timerThrottlingBestEffort: true,
                    pongReport: 60,
                    pongDist: false,
                    keepAliveBeep: 0,
                    restoreCall: true,
                    restoreServer: true,
                    restoreCallMaxDelay: 20,
                    dtmfUseWebRTC: true,
                    dtmfDuration: null,
                    dtmfInterToneGap: null,
                    avoidTwoWayHold: true,
                    enableAddVideo: false,
                    addLoggerTimestamp: true,
                    useWebrtcTracer: false,
                    audioAutoAnswerNoSdp: true,
                    switchSbcAtInvite5xx: true,
                    networkPriority: 'high',
                    useServiceWorkerNotification: true,
                    // SDK modes and fixes.
                    modes: {
                        ice_timeout_fix: 2000,
                        chrome_rtp_timeout_fix: 13,
                        sbc_ha_pairs_mode: undefined,
                        ringing_header_mode: 'Allow-Events: talk,hold,conference', // Extra header(s) to response 180.                             // Only for multiple SBC HA pairs configuration.
                    },
                    // Set browser constraints.
                    constraints: {
                        chrome: { audio: { echoCancellation: echoCancellation, noiseSuppression: noiseCancellation } },
                        firefox: { audio: { echoCancellation: echoCancellation, noiseSuppression: noiseCancellation } },
                        ios_safari: { audio: { echoCancellation: echoCancellation, noiseSuppression: noiseCancellation } },
                        safari: { audio: { echoCancellation: echoCancellation, noiseSuppression: noiseCancellation } },
                        other: { audio: { echoCancellation: echoCancellation, noiseSuppression: noiseCancellation } },
                    },
                    version: '13-Apr-2022',
                };
                // Phone parameters tuning.
                this.audioCode = new AudioCodesUA();
                this.audioCode.setServerConfig(acServers, this.options.webRTCServerDomain, this.options.webRTCIceUrls);
                this.audioCode.setAccount(agentId, agentId, '', '');
                // Setting phone options
                this.audioCode.setReconnectIntervals(phoneConfig.reconnectIntervalMin, phoneConfig.reconnectIntervalMax);
                this.audioCode.setRegisterExpires(phoneConfig.registerExpires);
                this.audioCode.setUseSessionTimer(phoneConfig.useSessionTimer);
                this.audioCode.setBrowsersConstraints(phoneConfig.constraints);
                this.audioCode.setWebSocketKeepAlive(phoneConfig.pingInterval, phoneConfig.pongTimeout, phoneConfig.timerThrottlingBestEffort, phoneConfig.pongReport, phoneConfig.pongDist);
                this.audioCode.setDtmfOptions(phoneConfig.dtmfUseWebRTC, phoneConfig.dtmfDuration, phoneConfig.dtmfInterToneGap);
                this.audioCode.setEnableAddVideo(phoneConfig.enableAddVideo);
                this.audioCode.setNetworkPriority(phoneConfig.networkPriority);
                this.audioCode.setUserAgent(this.appName || `AudioCodes WebRTC SDK ${this.audioCode.version()} ${this.audioCode.getBrowserName()}`);
                this.audioCode.setRegisterExtraHeaders(['X-SBC: AudioCodes Mediant']);
                this.audioCode.setRegisterExtraHeaders(['X-SBC: AudioCodes Mediant']);
                this.audioCode.setAcLogger(this.acLog.bind(this)); // Set AudioCodes API logger
                this.audioCode.setJsSipLogger(this.jssipLog.bind(this)); // Set JsSIP API logger
                this.audioCode.setListeners(this.audiocodeListeners.call(this));
                this.audioCode.init(true);
            }
        }
        catch (exe) {
            this.logger.error('loginAudioCodeServer', '[Init] AudioCodesUA initialize error: ' + exe);
        }
        this.logger.debug('loginAudioCodeServer', '[Init] AudioCodesUA initialized');
    }
    /**
       * Callback function for Audiocodes library logger
       */
    acLog(...args) {
        const argsParam = [].slice.call(args);
        this.logger.trace('acLog', `${argsParam}`);
    }
    /**
       * Callback function for jsSIP library logger
       */
    jssipLog(...args) {
        const argsParam = [].slice.call(args);
        this.logger.trace('jssipLog', `${argsParam}`);
    }
    /**
       * Audiocodes library callback methods
       * @example
       * ```
       * this.audiocodeListeners.call(this)
       * ```
       */
    audiocodeListeners() {
        return {
            /**
                   * Triggered when the login state is changed.
                   * @param isLogin -  [Boolean] isLogin is 'true' if logged in, and 'false' if not logged in.
                   * @param cause - [string] The cause is one of these strings: 'connected', 'disconnected', 'login failed', 'login', 'logout'
                   */
            loginStateChanged: (isLogin, cause) => {
                this.logger.debug('loginStateChanged', 'AC Event:loginStateChanged Received, isLogin: ' + isLogin + ', cause = ' + cause);
                this.audioCodeConnectRequested = false;
                this.audioCodeIsConnected = isLogin;
                this.onConnectionStatusChanged.next({
                    status: cause,
                    isLoggedIn: isLogin,
                });
                switch (cause) {
                    case 'connected':
                        this.logger.trace('loginStateChanged', 'connected');
                        this.audioCodeIsConnected = true;
                        break;
                    case 'login':
                        this.logger.debug('loginStateChanged', 'logged in');
                        if (this.validationUtilSvc.isNotNullOrUndefined(this.agentLegId) &&
                            this.validationUtilSvc.isNotNullOrEmpty(this.agentLegId)) {
                            this.makeAgentLegCall();
                        }
                        break;
                    case 'login failed':
                        this.logger.error('loginStateChanged', 'login failed');
                        break;
                    case cxone_voice_connection_status_1.CXoneVoiceConnectionStatus.DISCONNECTED:
                    case 'logout':
                        this.removeConnectedSBC();
                        this.logger.trace('loginStateChanged', 'removed ConnectedAudioCodeServer value from localstorage');
                        break;
                    default:
                        this.logger.trace('loginStateChanged', 'unused state: ' + cause);
                }
            },
            /**
                   * Triggered when a SIP 'trying' response or a SIP 'ringing' response is received.
                   * @param call - [AudioCodesSession] The call session object
                   */
            outgoingCallProgress: (call) => {
                this.onCallStatusChanged.next({
                    status: cxone_voice_call_status_1.CXoneVoiceCallStatus.OUTGOING_CALL,
                    contactId: this.agentLegId,
                });
                this.logger.debug('outgoingCallProgress', 'AC Event:outgoingCallProgress Received, call: ' + JSON.stringify(call.data));
            },
            /**
                   * @param call - [AudioCodesSession] The call session object
                   * @param invite - [SipRequest] The SIP request object
                   * @param replacedCall - [AudioCodesSession] The replaced call session object or null
                   * The replacedCall argument is not null, if the received INVITE includes a Replace header.
                   * In this case, the programmer in the callback should terminate replacedCall, automatically answer the incoming call,
                   * and visually (in GUI panel or window) make it the replacement for the terminated call.
                   * @param hasSDP - [Boolean] Enabled for the phone developer for a special case – incoming INVITE without SDP
                   * If it isn’t known whether the other side supports video calls, an answer can be made with or without video).
                   */
            incomingCall: (call, invite, replacedCall, hasSDP) => {
                this.onCallStatusChanged.next({
                    status: cxone_voice_call_status_1.CXoneVoiceCallStatus.INCOMING_CALL,
                    contactId: this.agentLegId,
                });
                this.logger.debug('incomingCall', 'AC Event:incomingCall Received, call: ' + JSON.stringify(call.data)
                    + ' invite: ' + invite + ' replacedCall: ' + replacedCall ? replacedCall.data : null + ' hasSDP: ' + hasSDP);
            },
            /**
                   * Triggered when the call is established
                   * @param call - [AudioCodesSession] The call session object
                   * @param message - [SipMessage] The OK SIP message of an outgoing call, or 'null' for an incoming call
                   * @param cause - [String] The cause may be one of the following strings: "received ack" "sent ack"
                   */
            callConfirmed: (call, message, cause) => {
                this.onCallStatusChanged.next({
                    status: cxone_voice_call_status_1.CXoneVoiceCallStatus.CALL_CONFIRMED,
                    contactId: this.agentLegId,
                });
                let sbcFqdnHeader = message.getHeader('X-AudioCodes-SBC-FQDN');
                if (this.validationUtilSvc.isNullOrEmpty(sbcFqdnHeader)) {
                    this.logger.debug('callConfirmed', '"X-AudioCodes-SBC-FQDN" header not found/empty, trying getServerAddress()');
                    sbcFqdnHeader = this.audioCode.getServerAddress();
                    if (this.validationUtilSvc.isNullOrEmpty(sbcFqdnHeader)) {
                        this.logger.debug('callConfirmed', ' getServerAddress() returned empty.');
                    }
                    else {
                        this.connectedSBC = sbcFqdnHeader;
                    }
                }
                else {
                    this.connectedSBC = sbcFqdnHeader.startsWith('wss://') ? sbcFqdnHeader : 'wss://' + sbcFqdnHeader;
                }
                this.storeAudioCodeCallData();
                this.logger.debug('callConfirmed', 'AC Event:CallConfirmed Received, call: ' + JSON.stringify(call.data)
                    + ', message = ' + message + ', cause = ' + cause);
            },
            /**
                   * Triggered when local and remote audio and video streams are ready to be shown in view panels.
                   * @param call - [AudioCodesSession] The call session object
                   * @param localStream - [Stream] The stream from the local camera and microphone
                   * @param remoteStream - [Stream] The stream from the remote camera and microphone
                   */
            callShowStreams: (call, _localStream, remoteStream) => {
                if (this.audioElement) {
                    this.audioElement.srcObject = remoteStream;
                    this.audioElement.volume = core_sdk_1.LocalStorageHelper.getItem(core_sdk_1.NotificationSettings.SOFTPHONE_VOLUME) || .8;
                }
                this.onCallStatusChanged.next({
                    status: cxone_voice_call_status_1.CXoneVoiceCallStatus.CALL_SHOW_STREAMS,
                    contactId: this.agentLegId,
                    localStream: _localStream,
                    remoteStream: remoteStream,
                    audioCode: this.audioCode,
                    call: call,
                });
                this.logger.debug('callShowStreams', 'AC Event:CallShowStreams Received, call: ' + JSON.stringify(call.data));
            },
            /**
                   * Triggered when a call is terminated or fails.
                   * @param call - [AudioCodesSession] The call session object
                   * @param message - [SipMessage] (Optional) The BYE SIP message
                   * @param cause - [string] (Optional) Reason of termination
                   * @param redirectTo - [string]: (Optional) Destination of redirection, set when the 'cause' parameter is 'Redirected'.
                   */
            callTerminated: (call, message, cause, redirectTo) => {
                this.onCallStatusChanged.next({
                    status: cxone_voice_call_status_1.CXoneVoiceCallStatus.CALL_TERMINATED,
                    contactId: this.agentLegId,
                });
                this.audioCodeCall = null;
                this.lastAgentLegIdCall = '';
                core_sdk_1.LocalStorageHelper.removeItem(core_sdk_1.StorageKeys.AGENT_LEG_CALL);
                this.removeConnectedSBC();
                this.logger.debug('callTerminated', 'AC Event:CallTerminated Received, call: ' + JSON.stringify(call.data)
                    + ', message = ' + message + ', cause = ' + cause + ', redirectTo = ' + redirectTo);
            },
            /**
                   * Triggered when a SIP local or remote hold state changes (incoming or outgoing re-INVITE).
                   * @param call - [AudioCodesSession] The call session object
                   * @param isHold - [Boolean] Hold (true) or Un-Hold (false)
                   * @param isRemote - [Boolean] Initiator remote side (true) or local side (false)
                   */
            callHoldStateChanged: (call, isHold, isRemote) => {
                this.onCallStatusChanged.next({
                    status: cxone_voice_call_status_1.CXoneVoiceCallStatus.CALL_HOLD_STATE_CHANGED,
                    contactId: this.agentLegId,
                });
                this.logger.debug('callHoldStateChanged', 'AC Event:CallHoldStateChanged, call: ' + JSON.stringify(call.data)
                    + ' isHold: ' + isHold + ' isRemote: ' + isRemote);
            },
        };
    }
    /**
       * Method get Audio Codes Server details
       * @param webRTCWSSUrls - contains Get webRTC URL
       * @param prevConnectedSBC - contains Previous connection details
       * @returns it will return the WebRTC ServerURL to set ServerConfig
       */
    getAudioCodeServer(webRTCWSSUrls, prevConnectedSBC) {
        this.logger.debug('getAudioCodeServer', 'previously connected SBC: ' + prevConnectedSBC
            + ' configuredSBCs: ' + JSON.stringify(webRTCWSSUrls));
        const newServerUrls = [];
        if (prevConnectedSBC) {
            // set priority to the last connected server
            this.logger.debug('getAudioCodeServer', 'previously connected SBC found. Adding on top with high priority');
            newServerUrls.push([prevConnectedSBC, 1000]);
        }
        for (let i = 0, length = webRTCWSSUrls.length; i < length; i++) {
            const wssUrlParts = webRTCWSSUrls[i].toLowerCase().split(':'); /* wss://webrtc.niceincontact.com:10 */
            const serverUrl = wssUrlParts[0] + ':' + wssUrlParts[1]; /* wss://webrtc.niceincontact.com */
            const serverWeight = wssUrlParts.length > 2 ? parseInt(wssUrlParts[2], 10) : 5;
            if (serverUrl !== prevConnectedSBC) {
                newServerUrls.push([serverUrl, serverWeight]);
            }
        }
        this.logger.debug('getAudioCodeServer', 'newServerUrls with high priority to the previously connected SBC: ' + JSON.stringify(newServerUrls));
        return newServerUrls;
    }
    /**
       * Restores the previously connected call or makes new call
       * @example
       * ```
       * this.makeAgentLegCall();
       * ```
       */
    makeAgentLegCall() {
        this.logger.debug('makeAgentLegCall', `agentLegId:${this.agentLegId}, Is call request already in progress : ${this.lastAgentLegIdCall}`);
        try {
            // avoid sending multiple audio call requests for the same agentlegId
            if (this.lastAgentLegIdCall === this.agentLegId) {
                return;
            }
            this.lastAgentLegIdCall = this.agentLegId;
            this.onCallStatusChanged.next({
                status: cxone_voice_call_status_1.CXoneVoiceCallStatus.CONNECTING,
                contactId: this.agentLegId,
            });
            if (!this.restoreCall() && this.validationUtilSvc.isNotNullOrEmpty(this.agentLegId)) {
                const params = [this.AudioCodesHeader + this.agentLegId];
                this.audioCodeCall = this.audioCode.call(this.audioCode.AUDIO, this.options.webRTCDnis, params);
                this.logger.debug('makeAgentLegCall', 'Requested');
            }
        }
        catch (error) {
            this.logger.error('makeAgentLegCall', `error occurred while making agentleg call, error: ${JSON.stringify(error)}  `);
        }
    }
    /**
       * Makes a call with replace header from previously connected call.
       * In case of refresh to retain a previous call this function is used.
       * @returns boolean true if there is a active agent leg call in localstorate to restore else return false.
       */
    restoreCall() {
        this.logger.debug('restoreCall', 'checking for call restoration.');
        const restoreData = core_sdk_1.LocalStorageHelper.getItem(core_sdk_1.StorageKeys.AGENT_LEG_CALL);
        try {
            if (restoreData && this.validationUtilSvc.isNotNullOrUndefined(restoreData)) {
                this.logger.debug('restoreCall', 'audiocodes calldata: ' + restoreData);
                const callData = JSON.parse(restoreData);
                // Make sure the data we have in storage is for the current agentlegid otherwise ignore the restore process
                if ((callData === null || callData === void 0 ? void 0 : callData.agentLegId) && this.agentLegId && callData.agentLegId !== this.agentLegId) {
                    this.logger.debug('restoreCall', 'skipped restoring call as agentLegId does not match with the stored data.');
                    core_sdk_1.LocalStorageHelper.removeItem(core_sdk_1.StorageKeys.AGENT_LEG_CALL);
                    this.removeConnectedSBC();
                    return false;
                }
                const params = [this.AudioCodesHeader + callData.agentLegId, this.AudioCodesHeaderReplace + callData.replaces];
                this.audioCodeCall = this.audioCode.call(this.audioCode.AUDIO, callData.callTo, params);
                this.logger.debug('restoreCall', 'requested');
                return true;
            }
        }
        catch (error) {
            this.logger.error('restoreCall', `error occurred  while restoring call  error: ${JSON.stringify(error)}`);
        }
        return false;
    }
    /**
       * Stores the data needed to restore audio call on page refresh
       */
    storeAudioCodeCallData() {
        core_sdk_1.LocalStorageHelper.setItem(core_sdk_1.StorageKeys.CONNECTED_AC_SERVER, this.connectedSBC);
        this.logger.debug('storeAudioCodeCallData', 'connectedSBC: ' + this.connectedSBC);
        if (this.audioCodeCall !== null && this.audioCodeCall.isEstablished()) {
            const activeCall = {
                callTo: this.audioCodeCall.data._user,
                replaces: this.audioCodeCall.getReplacesHeader(),
                time: new Date().getTime(),
                agentLegId: this.agentLegId,
            };
            const agentCallData = JSON.stringify(activeCall);
            core_sdk_1.LocalStorageHelper.setItem(core_sdk_1.StorageKeys.AGENT_LEG_CALL, agentCallData);
            this.logger.debug('storeAudioCodeCallData', 'audiocodes calldata: ' + agentCallData);
        }
    }
    /**
       * Method to Logout Audio Codes Server
       * @example
       * ```
       * this.logoutAudioCodeServer();
       * ```
       */
    logoutAudioCodeServer() {
        try {
            this.logger.trace('logoutAudioCodeServer', `audioCodeIsConnected:${this.audioCodeIsConnected}`);
            this.audioCodeIsConnected = false;
            this.disconnectAgentLeg();
            if (this.validationUtilSvc.isValidObject(this.audioCode)) {
                this.audioCode.logout();
            }
        }
        catch (error) {
            this.logger.error('logoutAudioCodeServer', `error occurred while logging out from audioCodes server, error: ${JSON.stringify(error)} `);
        }
    }
    /**
       * Method to Disconnect AgentLeg
       * @example
       * ```
       * this.disconnectAgentLeg();
       * ```
       */
    disconnectAgentLeg() {
        try {
            this.logger.trace('disconnectAgentLeg', `agentLegId:${this.agentLegId}`);
            if (this.validationUtilSvc.isValidObject(this.audioCodeCall)) {
                this.audioCodeCall.terminate();
            }
        }
        catch (error) {
            this.logger.error('disconnectAgentLeg', `error occurred while terminating audiocode call, error: ${JSON.stringify(error)}  `);
        }
        this.agentLegId = '';
        this.audioCodeCall = null;
        this.audioCodeConnectRequested = false;
        this.lastAgentLegIdCall = '';
        core_sdk_1.LocalStorageHelper.removeItem(core_sdk_1.StorageKeys.AGENT_LEG_CALL);
        this.removeConnectedSBC();
        if (this.audioElement)
            this.audioElement.srcObject = null;
    }
    /**
     * Method to remove connected SBC data from the localstorage
     * @example
     * ```
     * this.removeConnectedSBC();
     * ```
     */
    removeConnectedSBC() {
        this.connectedSBC = '';
        core_sdk_1.LocalStorageHelper.removeItem(core_sdk_1.StorageKeys.CONNECTED_AC_SERVER);
        this.logger.debug('removeConnectedSBC', 'removed ConnectedAudioCodeServer value from localstorage');
    }
}
exports.ACWebRtcService = ACWebRtcService;
//# sourceMappingURL=ac-webrtc-service.js.map