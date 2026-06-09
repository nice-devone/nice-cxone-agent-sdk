import { CXoneSdkError, AgentMessageNotification, WemNotificationDisplayData, WemNotificationRequestData, WemSuccessResponse, WemNotificationRecordingData } from '@nice-devone/common-sdk';
import { Subject } from 'rxjs';
import { CXoneTenant } from '../acd/cxone-tenant/cxone-tenant';
import { WemNotificationProvider } from '../notification/provider/wem-notification-provider';
import { CxOneVoiceRecordingStatusProvider } from '../acd/provider/cxone-voice-recording-status-provider';
/**
 * This class to manage notification
 */
export declare class CXoneNotificationManager {
    private tenant;
    onCXoneNotificationEvent: Subject<WemNotificationDisplayData | WemNotificationRecordingData | CXoneSdkError | WemSuccessResponse>;
    wemNotificationProvider: WemNotificationProvider;
    voiceRecordingStatusProvider: CxOneVoiceRecordingStatusProvider;
    private logger;
    private validationUtils;
    private acdSession;
    onUpdateMessageEvent: Subject<AgentMessageNotification[] | CXoneSdkError>;
    private agentMessageNotificationSvc;
    /**
     * get instance for permission and WfmQmNotification
     * @example
     * ```
     * const notification = new CXoneNotificationManager();
     * ```
     */
    constructor(tenant: CXoneTenant);
    /**
   * This method to start websocket
   * @param locale - locale of the system
   * @param timezone - timezone of the system
   * @param retryOptions - maxRetryAttempts and  retryInterval
   * @returns -   Promise boolean or CXoneSdkError
   * @example -
   * ```
   * startWemWebsocket('en-US', 'Asia/Calcutta',{maxRetryAttempts:5, retryInterval: 2000})
   * ```
   */
    startWemWebSocket(requestData: WemNotificationRequestData): Promise<boolean | CXoneSdkError>;
    /**
    * This method to send message is ready Acknowledgement to WebSocket
    *@param msgId - Notification message id
    * @returns - boolean | CXoneSdkError
    * @example -
    * ```
    * sendWemAcknowledge('abc1234')
    * ```
    */
    sendWemAcknowledge(msgId: string): void | CXoneSdkError;
    /**
        * Method to get agent message notification
        * @example
        * ```
        * this.getAgentMessageNotification();
        * ```
        */
    getAgentMessageNotification(): void;
    /**
      * Method to add agent message notifications to indexDB
      * @example
      * ```
      * this.addACDNotificationToIndexDB();
      * ```
    */
    addACDNotificationToIndexDB(notifications: AgentMessageNotification[]): Promise<void>;
    /**
      * Method to add agent message notification to indexDB
      * @example
      * ```
      * this.markACDNotificationAcknowledge();
      * ```
    */
    markACDNotificationAcknowledge(notificationId: string): Promise<CXoneSdkError>;
    /**
     * Use to terminate the ws worker instance
     * @example
     * ```
     * this.terminateWsWorker();
     * ```
     */
    terminateWemWebSocket(): void | CXoneSdkError;
}
