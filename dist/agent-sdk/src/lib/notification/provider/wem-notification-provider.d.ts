import { CXoneSdkError, WemNotificationRequestData, WsResponse } from '@nice-devone/common-sdk';
import { CXoneNotificationManager } from '../../notification/cxone-notification-manager';
/**
 * This class to manage notification
 */
export declare class WemNotificationProvider {
    private logger;
    private validationUtils;
    private wemWorker;
    private notificationMessages;
    private embeddedPageLoaded;
    private embeddedPagesLinks;
    private wemNotificationSvc;
    private notificationBase;
    /**
     * get instance for wemNotificationProvider and wemNotificationService
     * @example
     * ```
     * const notification = new CXoneNotification();
     * ```
     */
    constructor(notificationBase: CXoneNotificationManager);
    /**
   * This method to start websocket
   * @param requestData - locale of the system
   * @returns -  started ws connection or CXoneSdkError
   * @example -
   * ```
   * startWebsocket({'en-US', 'Asia/Calcutta',{maxRetryAttempts:5, retryInterval: 2000}});
   * ```
   */
    startWemWebSocket(requestData: WemNotificationRequestData): void;
    /**
    * This method to send message is ready Acknowledgement to WebSocket
    *@param msgId - Notification message id
    * @returns - boolean | CXoneSdkError
    * @example -
    * ```
    * sendAcknowledge('abc1234')
    * ```
    */
    sendWemAcknowledge(msgId: string): Promise<void | CXoneSdkError>;
    /**
  * This method to perform the different actions on callback response
  * @param event - ws response
  * @example
  * ```
  * attemptReconnect();
  * ```
  */
    private attemptReconnect;
    /**
   * This method to manipulate and publish notification messages
   * when websocket is connection is authenticate we receive "CONNECTED" command from ws server
   * so first we getEmbeddedPages api and in which we required embedded pages links to filter notification messages
   * until we will not api response will store the all messages into "notificationMessages" array.
   * @param message - notification message
   * @example -
   * ```
   * onWemNotificationMessage(message)
   * ```
   */
    private onWemNotificationMessage;
    /**
  * This method to process notification messages
  * @param message - notification message
  * @example -
  * ```
  * publishWemNotification(message)
  * ```
  */
    private publishWemNotification;
    /**
   * This method to check notification url is supported by embedded pages
   * @param notificationURL - notification url
   * @returns - boolean
   * @example -
   * ```
   * isSupportedByEmbeddedPages('https://na1.dev.nice.com/wfm/#/mySchedule?date=2022-01-12')
   * ```
   */
    private isSupportedByEmbeddedPages;
    /**
  * This method to get embedded pages links and publish wem notification
  * whenever we get response of that api we set "embeddedPageLoaded" property true
  * then process the messages from notificationMessages array and publish the notification to the consumer
  * @param response - Embedded page list
  * @example -
  * ```
  * onWemEmbeddedPageLinkResponse(response)
  * ```
  */
    private onWemEmbeddedPageLinkResponse;
    /**
  * This method to perform the different actions on callback response of worker events
  * @param event - ws response
  * @example
  * ```
  * handleWemNotificationWSResponse(wsResponse);
  * ```
  */
    handleWemNotificationWSResponse(wsResponse: WsResponse, isPostedFromLeader?: boolean): Promise<void>;
    /**
   * Use to initializing the wem notification worker and will return the method inside the worker
   * @example
   * ```
   * this.initWemNotificationWorker();
   * ```
   */
    private initWemNotificationWorker;
    /**
   * Use to terminate the ws worker instance
   * @example
   * ```
   * this.terminateWsWorker();
   * ```
   */
    terminateWemWebSocket(): void | CXoneSdkError;
    /**
   * Use to get polling request parameters for leader election
   * @returns - notification request parameters
   * @example
   * ```
   * this.getWemNotificationPollingConfig();
   * ```
   */
    getWemNotificationPollingConfig(): WemNotificationRequestData;
    /**
   * Use to load initial wem notifications from index db for non-leader
   * @example
   * ```
   * this.initialWemNotifications();
   * ```
   */
    initialWemNotifications: () => Promise<void>;
}
