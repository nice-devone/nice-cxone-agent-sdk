import { WemNotificationRecordingData } from '@nice-devone/common-sdk';
import { HttpUtilService, Logger } from '@nice-devone/core-sdk';
import { CXoneNotificationManager } from '../../notification/cxone-notification-manager';
/**
 * @remarks - This class is used to provide the status of voice recording in CXOne.
 */
export declare class CxOneVoiceRecordingStatusProvider {
    private agentSession;
    private baseUri;
    private voiceRecStatusWorker;
    private getVoiceRecStatusPollingisActive;
    private loader;
    logger: Logger;
    protected utilService: HttpUtilService;
    private notificationBase;
    private isRecordingNotificationEnabled;
    /**
    * constructor which sets agent session instance
    * @example
    * ```
    * const cxOneVoiceRecordingStatusProvider = new CxOneVoiceRecordingStatusProvider();
    * ```
    */
    constructor(notificationBase: CXoneNotificationManager);
    /**
       * @remarks - This method returns the status of voice recording in CXOne.
       * @example
       * ```
       * const voiceRecordingStatus = await cxOneVoiceRecordingStatusProvider.getVoiceRecordingStatus();
       * ```
       * @returns - A promise that resolves to a boolean indicating whether voice recording is enabled or not.
       */
    getVoiceRecordingStatus(): Promise<WemNotificationRecordingData>;
    /**
     * Starts voice recording status polling
     * @example
     * ```
     * this.startVoiceRecordingStatusPolling();
     * ```
     */
    startVoiceRecordingStatusPolling(): void;
    /**
       * Calls keepalive api on worker thread
       * @param sessionId - sessionid
       * @example
       * ```
       * this.voiceRecStatusPolling('12345');
       * ```
       */
    private voiceRecStatusPolling;
    /**
       * Handles the response from the voice recording status polling
       * @param response - The response data from the worker
       * @example
       * ```
       * this.handleVoiceRecStatusPollingResponse(response);
       * ```
       */
    private handleVoiceRecStatusPollingResponse;
    /**
       * Use to initializing the user slot worker and will return the method inside the worker
       * @example
       * ```
       * this.initVoiceRecStatusWorker();
       * ```
       */
    initVoiceRecStatusWorker(): void;
    /**
     * Use to restart worker
     * @example
     * ```
     * this.restartWorker();
     * ```
     */
    private restartWorker;
    /**
     * Used to terminate the polling of recording manager service
     * @example -
     * ```
     * this.stopVoiceRecordingStatusPolling();
     * ```
     */
    stopVoiceRecordingStatusPolling(ifRestart?: boolean): void;
}
