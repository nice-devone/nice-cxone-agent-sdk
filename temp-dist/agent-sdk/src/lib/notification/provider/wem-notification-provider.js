import { __awaiter } from "tslib";
import { CXoneSdkError, CXoneSdkErrorType, CXoneLeaderElector, MessageBus, MessageType, WemNotificationDisplayData, NotificationEntities, WemNotificationRecordingData, RecordingNotificationTemplate, PermissionKeys, PermissionValues, } from '@nice-devone/common-sdk';
import { Logger, ValidationUtils, WSEventType, LocalStorageHelper, StorageKeys, WemNotificationCommand, LoadWorker, dbInstance, IndexDBStoreNames } from '@nice-devone/core-sdk';
import { WemNotificationService } from '../service/wem-notification-service';
import { CXoneAuth, CXoneUser } from '@nice-devone/auth-sdk';
import { CXoneClient } from '../../cxone-client';
/**
 * This class to manage notification
 */
export class WemNotificationProvider {
    /**
     * get instance for wemNotificationProvider and wemNotificationService
     * @example
     * ```
     * const notification = new CXoneNotification();
     * ```
     */
    constructor(notificationBase) {
        this.logger = new Logger('agent-sdk', 'WemNotificationProvider');
        this.validationUtils = new ValidationUtils();
        this.notificationMessages = [];
        this.embeddedPageLoaded = false;
        this.embeddedPagesLinks = [];
        this.wemNotificationSvc = {};
        this.notificationBase = {};
        this.isRecordingNotificationEnabled = null;
        /**
       * Use to load initial wem notifications from index db for non-leader
       * @example
       * ```
       * this.initialWemNotifications();
       * ```
       */
        this.initialWemNotifications = () => __awaiter(this, void 0, void 0, function* () {
            const db = yield dbInstance();
            const initialWemNotifications = (yield (db === null || db === void 0 ? void 0 : db.get(IndexDBStoreNames.NOTIFICATIONS, NotificationEntities.WEM_NOTIFICATIONS))) || [];
            initialWemNotifications.forEach((message) => {
                const wemNotificationMessage = new WemNotificationDisplayData();
                Object.assign(wemNotificationMessage, message);
                this.notificationBase.onCXoneNotificationEvent.next(wemNotificationMessage);
            });
        });
        this.notificationBase = notificationBase;
        this.wemNotificationSvc = new WemNotificationService();
    }
    /**
   * This method to start websocket
   * @param requestData - locale of the system
   * @returns -  started ws connection or CXoneSdkError
   * @example -
   * ```
   * startWebsocket({'en-US', 'Asia/Calcutta',{maxRetryAttempts:5, retryInterval: 2000}});
   * ```
   */
    startWemWebSocket(requestData) {
        const userDetails = CXoneUser.instance.getUserInfo();
        const wemWsAuthData = {
            userId: userDetails && encodeURIComponent(userDetails.userId),
            notificationWsUri: CXoneAuth.instance.getCXoneConfig().notificationUri || '',
            token: CXoneAuth.instance.getAuthToken().accessToken,
        };
        LocalStorageHelper.setItem(StorageKeys.WEM_NOTIFICATION_POLLING_CONFIG, requestData);
        LocalStorageHelper.setItem(StorageKeys.WEM_WS_CONNECTION_STATUS, false);
        if (!this.wemWorker) {
            this.initWemNotificationWorker();
            this.wemWorker.onmessage = (response) => {
                this.handleWemNotificationWSResponse(response.data);
            };
        }
        this.wemWorker.postMessage({
            type: 'init-start-wem-ws',
            requestData,
            wemWsAuthData,
        });
    }
    /**
    * This method to send message is ready Acknowledgement to WebSocket
    *@param msgId - Notification message id
    * @returns - boolean | CXoneSdkError
    * @example -
    * ```
    * sendAcknowledge('abc1234')
    * ```
    */
    sendWemAcknowledge(msgId) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            (_a = this.wemWorker) === null || _a === void 0 ? void 0 : _a.postMessage({
                type: 'send-ack',
                msgId,
            });
            const db = yield dbInstance();
            const wemNotifications = (yield (db === null || db === void 0 ? void 0 : db.get(IndexDBStoreNames.NOTIFICATIONS, NotificationEntities.WEM_NOTIFICATIONS))) || [];
            if (wemNotifications === null || wemNotifications === void 0 ? void 0 : wemNotifications.length) {
                wemNotifications.map((notification) => (notification.msgRead = true));
                yield (db === null || db === void 0 ? void 0 : db.put(IndexDBStoreNames.NOTIFICATIONS, wemNotifications, NotificationEntities.WEM_NOTIFICATIONS));
            }
        });
    }
    /**
  * This method to perform the different actions on callback response
  * @param event - ws response
  * @example
  * ```
  * attemptReconnect();
  * ```
  */
    attemptReconnect() {
        this.wemWorker.postMessage({
            type: 'reconnect',
        });
    }
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
    onWemNotificationMessage(message, isPostedFromLeader) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (message.command === WemNotificationCommand.CONNECTED || (isPostedFromLeader && !this.embeddedPageLoaded)) {
                this.wemNotificationSvc.getEmbeddedPages().then((response) => {
                    this.onWemEmbeddedPageLinkResponse(response);
                }).catch(error => {
                    this.logger.error('onWemNotificationMessage', 'getEmbeddedPages api failed : ' + error.toString());
                    const errorMessage = new CXoneSdkError(CXoneSdkErrorType.CXONE_API_ERROR, 'getEmbeddedPages api failed' + error.toString());
                    this.notificationBase.onCXoneNotificationEvent.next(errorMessage);
                });
            }
            if (message.command === WemNotificationCommand.MESSAGE && message.headers.notificationTargetType === 'IN_APP') {
                if (this.embeddedPageLoaded) {
                    yield this.publishWemNotification(message);
                }
                else {
                    this.notificationMessages.push(message);
                }
            }
            else if (message.command === WemNotificationCommand.MESSAGE && ((_a = message.data) === null || _a === void 0 ? void 0 : _a.notificationTemplate) === RecordingNotificationTemplate.RECORDING_STATUS) {
                yield this.publishRecordingNotification(message);
            }
        });
    }
    /**
  * This method to process notification messages
  * @param message - notification message
  * @example -
  * ```
  * publishWemNotification(message)
  * ```
  */
    publishWemNotification(message) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.validationUtils.isNullOrEmpty(message.data.notificationURL) ||
                this.isSupportedByEmbeddedPages(message.data.notificationURL)) {
                const wemNotificationMessage = new WemNotificationDisplayData();
                wemNotificationMessage.parse(message);
                const db = yield dbInstance();
                const wemNotifications = (yield (db === null || db === void 0 ? void 0 : db.get(IndexDBStoreNames.NOTIFICATIONS, NotificationEntities.WEM_NOTIFICATIONS))) || [];
                const matchedIndex = wemNotifications === null || wemNotifications === void 0 ? void 0 : wemNotifications.findIndex((current) => current.id === wemNotificationMessage.id);
                if (matchedIndex >= 0)
                    wemNotifications[matchedIndex] = wemNotificationMessage;
                else
                    wemNotifications.push(wemNotificationMessage);
                yield (db === null || db === void 0 ? void 0 : db.put(IndexDBStoreNames.NOTIFICATIONS, wemNotifications, NotificationEntities.WEM_NOTIFICATIONS));
                this.notificationBase.onCXoneNotificationEvent.next(wemNotificationMessage);
            }
        });
    }
    /**
     * Publishes a recording notification if the message notification template is of type RECORDING_STATUS.
     * @param message - notification message
     * @example
     * ```
     * publishRecordingNotification(message)
     * ```
     */
    publishRecordingNotification(message) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (this.isRecordingNotificationEnabled === null) {
                this.isRecordingNotificationEnabled = (yield CXoneClient.instance.agentPermission.checkPermissions(PermissionKeys.REALTIME_RECORDING_NOTIFICATION, PermissionValues.VIEW)) || false;
            }
            if (this.validationUtils.isNullOrEmpty((_a = message === null || message === void 0 ? void 0 : message.data) === null || _a === void 0 ? void 0 : _a.notificationURL)) {
                const wemNotificationMessage = new WemNotificationRecordingData();
                wemNotificationMessage.parse(message);
                wemNotificationMessage.isRealtimeNotificationEnabled = this.isRecordingNotificationEnabled;
                this.notificationBase.onCXoneNotificationEvent.next(wemNotificationMessage);
            }
        });
    }
    /**
   * This method to check notification url is supported by embedded pages
   * @param notificationURL - notification url
   * @returns - boolean
   * @example -
   * ```
   * isSupportedByEmbeddedPages('https://na1.dev.nice.com/wfm/#/mySchedule?date=2022-01-12')
   * ```
   */
    isSupportedByEmbeddedPages(notificationURL) {
        return this.embeddedPagesLinks.find(element => notificationURL.indexOf(element) !== -1) ? true : false;
    }
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
    onWemEmbeddedPageLinkResponse(response) {
        return __awaiter(this, void 0, void 0, function* () {
            this.embeddedPagesLinks = [];
            response.links.forEach(data => {
                this.embeddedPagesLinks.push(data.appContext + data.url);
            });
            this.embeddedPageLoaded = true;
            for (const message of this.notificationMessages) {
                yield this.publishWemNotification(message);
            }
        });
    }
    /**
  * This method to perform the different actions on callback response of worker events
  * @param event - ws response
  * @example
  * ```
  * handleWemNotificationWSResponse(wsResponse);
  * ```
  */
    handleWemNotificationWSResponse(wsResponse, isPostedFromLeader) {
        return __awaiter(this, void 0, void 0, function* () {
            const message = (wsResponse === null || wsResponse === void 0 ? void 0 : wsResponse.message) ? wsResponse === null || wsResponse === void 0 ? void 0 : wsResponse.message : null;
            if (CXoneLeaderElector.instance.isLeader &&
                (wsResponse.type === WSEventType.MESSAGE || wsResponse.type === WSEventType.SUCCESS)) {
                const msg = {
                    type: MessageType.WEM_NOTIFICATION_POLLING_RESPONSE,
                    data: wsResponse,
                };
                MessageBus.instance.postResponse(msg);
            }
            switch (wsResponse.type) {
                case WSEventType.CLOSE: {
                    this.attemptReconnect();
                    break;
                }
                case WSEventType.MESSAGE: {
                    yield this.onWemNotificationMessage(message, isPostedFromLeader);
                    break;
                }
                case WSEventType.ERROR: {
                    LocalStorageHelper.setItem(StorageKeys.WEM_WS_CONNECTION_STATUS, (wsResponse === null || wsResponse === void 0 ? void 0 : wsResponse.status) === 'connected');
                    const errorMessage = new CXoneSdkError(CXoneSdkErrorType.WEBSOCKET_ERROR, message);
                    this.notificationBase.onCXoneNotificationEvent.next(errorMessage);
                    break;
                }
                case WSEventType.SUCCESS: {
                    LocalStorageHelper.setItem(StorageKeys.WEM_WS_CONNECTION_STATUS, (wsResponse === null || wsResponse === void 0 ? void 0 : wsResponse.status) === 'connected');
                    const successMessage = { event: 'success', message: message };
                    this.notificationBase.onCXoneNotificationEvent.next(successMessage);
                    break;
                }
            }
        });
    }
    /**
   * Use to initializing the wem notification worker and will return the method inside the worker
   * @example
   * ```
   * this.initWemNotificationWorker();
   * ```
   */
    initWemNotificationWorker() {
        const loader = new LoadWorker();
        this.wemWorker = loader.getWorker('wem-notification-worker', 'ccf-wem-notification-worker');
    }
    /**
   * Use to terminate the ws worker instance
   * @example
   * ```
   * this.terminateWsWorker();
   * ```
   */
    terminateWemWebSocket() {
        var _a;
        if (this.wemWorker) {
            this.wemWorker.postMessage({
                type: 'terminate',
            });
            (_a = this.wemWorker) === null || _a === void 0 ? void 0 : _a.terminate();
            this.wemWorker = undefined;
        }
        else {
            return (new CXoneSdkError(CXoneSdkErrorType.INVALID_METHOD_INVOCATION, 'CXone notification ws connection is already terminated'));
        }
    }
    /**
   * Use to get polling request parameters for leader election
   * @returns - notification request parameters
   * @example
   * ```
   * this.getWemNotificationPollingConfig();
   * ```
   */
    getWemNotificationPollingConfig() {
        return LocalStorageHelper.getItem(StorageKeys.WEM_NOTIFICATION_POLLING_CONFIG, true);
    }
}
//# sourceMappingURL=wem-notification-provider.js.map