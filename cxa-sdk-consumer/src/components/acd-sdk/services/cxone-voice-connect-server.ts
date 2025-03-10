import { WatchRTCOptions, WatchRTCService } from '@nice-devone/shared-apps-lib';
import {  UserInfo } from '@nice-devone/common-sdk';
import { AgentSettings, Logger } from '@nice-devone/core-sdk';
import { CXoneVoiceCall, CXoneVoiceClient, CXoneVoiceConnection } from '@nice-devone/voice-sdk';
import { Subject } from 'rxjs';
import { EventEmitter } from 'events';


/**
 * Wrapper class for CXone Voice Connection
 */
export class CXoneVoiceClientConnectServer {
  private logger: Logger = new Logger('UI-Components', 'CXoneVoiceClientConnectServer');
  private static singleton: CXoneVoiceClientConnectServer;
  private cxoneVoiceClient: CXoneVoiceClient;
  private isVqmEnabled = false;
  isWebRTCExtensionInstalled = false;
  cxoneVoiceExtensionId = '';
  onConnectionStatusChanged: Subject<CXoneVoiceConnection>;
  onCallStatusChanged: Subject<CXoneVoiceCall>;
  isWebNCExtensionInstalled = false;
  isNoiseCancellationFeatureEnabledOnBU = false;
  isNoiseCancellationExtInstalled=false;
  isIrisEnabled=false;
  cxoneNCExtensionId = '';
  public events: EventEmitter = new EventEmitter();
  /**
   * @example
   * ```
   * let instance = new CXoneVoiceClientWrapper();
   * ```
   */
  constructor() {
    this.logger.info('constructor', 'Creating new instance for CXoneVoiceClientWrapper');
    this.cxoneVoiceClient = CXoneVoiceClient.instance;
    this.onConnectionStatusChanged = this.cxoneVoiceClient.onConnectionStatusChanged;
    this.onCallStatusChanged = this.cxoneVoiceClient.onCallStatusChanged;
  }





 

  /**
   * Method to create singleton object of the class
   * ```
   * @example
   * const cXoneVoiceClientWrapper = CXoneVoiceClientWrapper.instance();
   * ```
   */
  public static get instance(): CXoneVoiceClientConnectServer {
    if (!CXoneVoiceClientConnectServer.singleton) {
      CXoneVoiceClientConnectServer.singleton = new CXoneVoiceClientConnectServer();
    }
    return CXoneVoiceClientConnectServer.singleton;
  }

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
  async connectServer(
    acdAgentId: string,
    options: AgentSettings,
    audioElement: HTMLAudioElement,
    userInfo: UserInfo,
    app: string
  ) {
    
    const appName = `${(app || 'cxa').toUpperCase()}: ${options.cxaClientVersion}`;
    this.logger.info('connectServer', `param acdAgentId: ${acdAgentId}, appName: ${appName}`);
    const voiceQualityMonitorOptions: WatchRTCOptions = {
      rtcApiKey: options.vqmMonitoringKey,
      rtcRoomId: '',
      rtcPeerId: acdAgentId,
      buID: userInfo.icBUId,
      clusterId: userInfo.icClusterId,
      CXoneAgentConsoleType: app?.toUpperCase(),
      CXoneAgentConsoleVersion: options.cxaClientVersion,
    };
    this.cxoneVoiceClient.connectServer(acdAgentId, options, audioElement, appName);
    if (this.isVqmEnabled) {
      // invoke watchRTC only when its enabled at BU level
      WatchRTCService.instance.init(voiceQualityMonitorOptions);
    }
   
  }



}
