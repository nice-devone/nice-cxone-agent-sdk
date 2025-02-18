import { WatchRTCOptions, WatchRTCService } from '@nice-devone/shared-apps-lib';
import { AgentLegEvent, UserInfo } from '@nice-devone/common-sdk';
import { AgentSettings, Logger } from '@nice-devone/core-sdk';
import { CXoneVoiceCall, CXoneVoiceClient, CXoneVoiceConnection, CXoneVoiceConnectionStatus, CXoneVoiceMessageType } from '@nice-devone/voice-sdk';
import { Subject } from 'rxjs';
import { CXoneClient, CXoneProductFeature } from '@nice-devone/agent-sdk';
import { EventEmitter } from 'events';


declare let chrome: any;

/**
 * Wrapper class for CXone Voice Connection
 */
export class CXoneVoiceClientWrapper {
  private logger: Logger = new Logger('UI-Components', 'CXoneVoiceClientWrapper');
  private static singleton: CXoneVoiceClientWrapper;
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
   * Opens connection with the chrome extension
   * @param cxoneVoiceExtensionId - voice extension id
   * @example
   * ```
   * setVoiceExtensionId('jfncpcbbaobdpgnpenocnkdfpabnmfnd')
   * ```
   */
  initializeVoiceExtension() {
    this.logger.info(
      'initializeVoiceExtension',
      `cxoneVoiceExtensionId : ${this.cxoneVoiceExtensionId}`
    );
    this.sendMessageToWebRTCExtension({
      type: CXoneVoiceMessageType.Initialize,
      data: {},
    });
  }

  /**
   * Opens connection with the chrome extension
   * @param cxoneNCExtensionId - NC extension id
   * @example
   * ```
   * setNCExtensionId('pjgfeeohcimebggggoloiekjhadhhaca')
   * ```
   */
  initializeNCExtension() {
    this.logger.info(
      'initializeNCExtension before setting',
      `cxoneNoiseExtensionId : ${this.cxoneNCExtensionId}`
    );        
    this.sendMessageToWebRTCExtension({
      type: CXoneVoiceMessageType.Initialize,
      data: {},
    });
  }  

  /**
   * sends message to the chrome extension
   * @param data  - the actual data to be passed to the chrome extension
   * @example
   * ```
   *  sendMessageToWebRTCExtension(data:{})
   * ```
   */
  sendMessageToWebRTCExtension(data: any) {
    try {
      if(this.isNoiseCancellationExtInstalled)
      {        
        chrome.runtime.sendMessage(this.cxoneNCExtensionId, data, this.onMessageReceivedFromChromeExtension.bind(this));
      }
      else if(this.isWebRTCExtensionInstalled)
      {
        chrome.runtime.sendMessage(this.cxoneVoiceExtensionId,data,this.onMessageReceivedFromChromeExtension.bind(this));
      }
    } catch (error) {
      this.logger.error(
        'sendMessageToWebRTCExtension',
        `Failed to send message. ${JSON.stringify(error)}`
      );
    }
  }

  /**
   * Method to create singleton object of the class
   * ```
   * @example
   * const cXoneVoiceClientWrapper = CXoneVoiceClientWrapper.instance();
   * ```
   */
  public static get instance(): CXoneVoiceClientWrapper {
    if (!CXoneVoiceClientWrapper.singleton) {
      CXoneVoiceClientWrapper.singleton = new CXoneVoiceClientWrapper();
    }
    return CXoneVoiceClientWrapper.singleton;
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
    this.isIrisEnabled= await this.isNoiseCancellationFeatureEnabled();
    if(this.isIrisEnabled)
    {
      this.isNoiseCancellationExtInstalled=await this.isChromeExtensionInstalled(this.cxoneNCExtensionId);
      if(!this.isNoiseCancellationExtInstalled)
      {
        this.isWebRTCExtensionInstalled= await this.isChromeExtensionInstalled(this.cxoneVoiceExtensionId);
  
      } 
      else
      {     
        await this.checkNoiseCancellationFeature(options.irisNoiseCancellationKey, userInfo);
        this.events.emit('noiseCancellationExtInstalledChange', this.isNoiseCancellationExtInstalled);
      }
    }

    if(!this.isNoiseCancellationExtInstalled && !this.isIrisEnabled)
    {
      this.isWebRTCExtensionInstalled= await this.isChromeExtensionInstalled(this.cxoneVoiceExtensionId);

    }
    this.logger.info(
      'isChromeExtensionInstalled',
      `param isWebRTCExtensionInstalled: ${this.isWebRTCExtensionInstalled}`
    );
    this.logger.info(
      'isChromeNCExtensionInstalled',
      `param isNCExtensionInstalled: ${this.isNoiseCancellationExtInstalled}`
    );    
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
    this.isVqmEnabled = options.vqmIntegratedSoftphoneMonitoring;
    // use extension only if it's installed and microphone access is provided
    if (this.isWebRTCExtensionInstalled || this.isNoiseCancellationExtInstalled) {
      if(this.isWebRTCExtensionInstalled)
      {
        this.initializeVoiceExtension();
      }
      if(this.isNoiseCancellationExtInstalled)
      {
        this.initializeNCExtension();
      }
      this.sendMessageToWebRTCExtension({
        type: CXoneVoiceMessageType.ConnectServer,
        data: { acdAgentId, options, userInfo, appName, voiceQualityMonitorOptions },
      });
    } else {
      this.cxoneVoiceClient.connectServer(acdAgentId, options, audioElement, appName);
      if (this.isVqmEnabled) {
        // invoke watchRTC only when its enabled at BU level
        WatchRTCService.instance.init(voiceQualityMonitorOptions);
      }
    }
   
  }

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
  async checkNoiseCancellationFeature(irisNoiseCancellationKey: string, userInfo: UserInfo): Promise<boolean> {
    const isNoiseCancellationFeatureEnabled = await this.isNoiseCancellationFeatureEnabled();
    if (isNoiseCancellationFeatureEnabled) {
      this.sendMessageToWebRTCExtension({
        type: 'ConnectIris',
        data: {
          irisNoiseCancellationKey: irisNoiseCancellationKey,
          teamId: userInfo.tenantId,
          userId: userInfo.userId,
        },
      });
      return true;
    }
    return false;
  }


  /**
   * If chrome extension is installed then Send an request to initialize a audio streaming to the connected WebRTC server  or pass the same info into the voice extension
   * @param agentLeg - CXone agent leg having contactId and status
   * @example
   * ```
   * voiceClient.handleAgentLegEvent(agentLeg);
   * ```
   */
  handleAgentLegEvent(agentLeg: AgentLegEvent): void {
    this.logger.info('handleAgentLegEvent', `param agentLeg: ${JSON.stringify(agentLeg)}`);
    if (this.isWebRTCExtensionInstalled || this.isNoiseCancellationExtInstalled) {
      this.sendMessageToWebRTCExtension({
        type: CXoneVoiceMessageType.AgentLegEventData,
        data: { agentLeg },
      });
    } else {
      this.cxoneVoiceClient.handleAgentLegEvent(agentLeg);
    }
  }

  /**
   * If chrome extension is installed then Disconnect from WebRTC server  or pass the same info into the voice extension
   * @example
   * ```
   * voiceClient.disconnectServer();
   * ```
   */
  disconnectServer(): void {
    this.logger.info('disconnectServer', 'disconnecting WebRTC server');
    if (this.isWebRTCExtensionInstalled || this.isNoiseCancellationExtInstalled) {
      this.sendMessageToWebRTCExtension({
        type: CXoneVoiceMessageType.DisconnectServer,
        data: {},
      });
    } else {
      this.cxoneVoiceClient.disconnectServer();
    }
  }

  /**
   * If chrome extension is installed then Connect Agent leg or pass the same info into the voice extension
   * @example
   * ```
   * voiceClient.connectAgentLeg(234);
   * ```
   */
  connectAgentLeg(agentLegId: string): void {
    this.logger.info('connectAgentLeg', `param agentLegId: ${JSON.stringify(agentLegId)}, isWebRTCExtensionInstalled: ${this.isWebRTCExtensionInstalled}`);
    if (this.isWebRTCExtensionInstalled || this.isNoiseCancellationExtInstalled) {
      this.sendMessageToWebRTCExtension({
        type: CXoneVoiceMessageType.ConnectAgentLeg,
        data: { agentLegId },
      });
    } else {
      if (this.isVqmEnabled) {
        // invoke watchRTC only when its enabled at BU level
        WatchRTCService.instance.updateAgentLegId(agentLegId);
      }
      this.cxoneVoiceClient.connectAgentLeg(agentLegId);
    }
  }

  /**
   * If chrome extension is installed then Set the webRtc volume or pass the same info into the voice extension
   * @example voiceClient.volumeChange();
   * @param volume - webRtc volume
   */
  volumeChange(volume: number): void {
    if (this.isWebRTCExtensionInstalled || this.isNoiseCancellationExtInstalled) {
      this.sendMessageToWebRTCExtension({
        type: CXoneVoiceMessageType.VolumeChanged,
        data: { volume },
      });
    } else {
      this.cxoneVoiceClient.volumeChange(volume);
    }
  }

  /**
   * Check if the chrome extension is installed in the browser or not.
   * @param extensionId -  the chrome extension id
   * @example
   * ```
   * isChromeExtensionInstalled('gcfjbjldfomnopnpdjajjfpldkkdmmoi')
   * ```
   */
  isChromeExtensionInstalled(extensionId: string): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      let isExtInstalled = false;      
      if (!extensionId || !chrome || !chrome.runtime) {
        isExtInstalled = false;
        resolve(isExtInstalled);
        return;
      }
      chrome.runtime.sendMessage(
        extensionId,
        { type: 'IsInstalled' },
        (result: { IsInstalled: boolean; HasMicrophonePermission: boolean }) => {
          isExtInstalled = result ? result.IsInstalled : false;
          resolve(isExtInstalled);
          // trigger event to display alert message to provide microphone permission
          if (result && result.HasMicrophonePermission === false) {
            this.notifyMissingMicPermission(isExtInstalled, extensionId);
          }
          if (chrome.runtime.lastError) return;
        });
    });
  } 

  /**
   * When the microphone permission is denied then display the error message
   * 
   * @example
   * CXoneVoiceClientWrapper.instance.notifyMissingMicPermission(true, 'extension-id');
   */
  notifyMissingMicPermission(isExtensionInstalled: boolean, extensionId: string) {
    CXoneVoiceClientWrapper.instance.onConnectionStatusChanged.next({
      status: CXoneVoiceConnectionStatus.MEDIA_DEVICE_ACCESS_DENIED,
      isLoggedIn: false,
      extensionId: extensionId,
      isExtensionInstalled: isExtensionInstalled,
    } as CXoneVoiceConnection);
  }

  /**
   * Check if the chrome extension is installed in the browser or not.
   * @example
   * ```
   * isNoiseCancellationFeatureEnabled()
   * ```
   */
  async isNoiseCancellationFeatureEnabled() : Promise<boolean> {
    const irisVIEnabled = await CXoneClient.instance.cxoneTenant.checkProductEnablement([
      CXoneProductFeature.NC_CXONE_AGENT
    ]);

    return new Promise<boolean>((resolve) => {      
      this.isNoiseCancellationFeatureEnabledOnBU =typeof irisVIEnabled === 'boolean' ? irisVIEnabled.valueOf() : false;
      resolve(this.isNoiseCancellationFeatureEnabledOnBU);
      return irisVIEnabled;
    });
  }
  /**
   * Toggles microphone processing for voice isolation.
   * @param value - A boolean indicating whether to enable (`true`) or disable (`false`) microphone processing.
   * @example
   * ```
   * voiceClientWrapper.enableMicIris(true);
   * ```
   */
  enableMicIris(value: boolean) {
    this.sendMessageToWebRTCExtension({
      type: 'SetIrisNCParameter',
      data: {
        parameter: 'micProcessing',
        value: value,
      },
    });
  }

  /**
   * Toggles speaker processing for voice isolation.
   * @param value - A boolean indicating whether to enable (`true`) or disable (`false`) speaker processing.
   * @example
   * ```
   * voiceClientWrapper.enableSpeakerIris(true); // Enables speaker processing
   * ```
   */
  enableSpeakerIris(value: boolean) {
    this.sendMessageToWebRTCExtension({
      type: 'SetIrisNCParameter',
      data: {
        parameter: 'speakerProcessing',
        value: value,
      },
    });
  }

  /**
   * Adjusts the microphone mix level for noise cancellation.
   * @param value - A number representing the new mix level for the microphone.
   *
   * @example
   * ```
   * voiceClientWrapper.enableNCMicChange(50); // Sets the microphone mix level to 50
   * ```
   */
  enableNCMicChange(value: number) {
    this.sendMessageToWebRTCExtension({
      type: 'SetIrisNCParameter',
      data: {
        parameter: 'mixLevelMic',
        value: value,
      },
    });
  }

  /**
   * Adjusts the speaker mix level for noise cancellation.
   * @param value - 0. - 1., a number representing the new mix level for the speaker.
   *
   * @example
   * ```
   * voiceClientWrapper.enableNCSpeakerChange(0.7); // Sets the speaker mix level to 0.7 (70%)
   * ```
   */
  enableNCSpeakerChange(value: number) {
    this.sendMessageToWebRTCExtension({
      type: 'SetIrisNCParameter',
      data: {
        parameter: 'mixLevelSpeaker',
        value: value,
      },
    });
  }

  /**
   * receives messages from the extension's background script
   * @param data - the actual data to be passed to the chrome extension
   * @returns 
   * @example
   * ```
   * onMessageReceivedFromChromeExtension(data)
   * ```
   */
  onMessageReceivedFromChromeExtension(data: CXoneVoiceConnection) {
    if (data?.status === CXoneVoiceConnectionStatus.MEDIA_DEVICE_ACCESS_DENIED) {
      // this.notifyMissingMicPermission(true, data?.extensionId ?? '');
    }
    if (chrome.runtime.lastError) return;
  }

}
