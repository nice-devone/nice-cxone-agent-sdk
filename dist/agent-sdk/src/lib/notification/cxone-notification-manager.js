import { __awaiter } from "tslib";
import { CXoneSdkError, CXoneLeaderElector, MessageBus, MessageType, CXoneSdkErrorType, NotificationEntities } from '@nice-devone/common-sdk';
import { Subject } from 'rxjs';
import { WemNotificationProvider } from '../notification/provider/wem-notification-provider';
import { ACDSessionManager, AdminService, dbInstance, IndexDBStoreNames, LocalStorageHelper, Logger, StorageKeys, ValidationUtils } from '@nice-devone/core-sdk';
import { CXoneProductFeature } from '../acd/enum/cxone-product-feature';
import { AgentMessageNotificationService } from './service/agent-message-notification-service';
import { CXoneAuth } from '@nice-devone/auth-sdk';
import { CxOneVoiceRecordingStatusProvider } from '../acd/provider/cxone-voice-recording-status-provider';
/**
 * This class to manage notification
 */
export class CXoneNotificationManager {
    /**
     * get instance for permission and WfmQmNotification
     * @example
     * ```
     * const notification = new CXoneNotificationManager();
     * ```
     */
    constructor(tenant) {
        this.tenant = {};
        this.onCXoneNotificationEvent = new Subject();
        this.wemNotificationProvider = {};
        this.voiceRecordingStatusProvider = {};
        this.logger = new Logger('agent-sdk', 'CXoneNotificationManager');
        this.validationUtils = new ValidationUtils();
        this.acdSession = {};
        this.onUpdateMessageEvent = new Subject();
        this.agentMessageNotificationSvc = {};
        this.tenant = tenant;
        this.acdSession = ACDSessionManager.instance;
        this.wemNotificationProvider = new WemNotificationProvider(this);
        this.voiceRecordingStatusProvider = new CxOneVoiceRecordingStatusProvider(this);
        this.agentMessageNotificationSvc = new AgentMessageNotificationService();
        this.acdSession.updateMessageEvent.subscribe(() => {
            this.getAgentMessageNotification();
        });
    }
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
    startWemWebSocket(requestData) {
        if (CXoneLeaderElector.instance.isLeader) {
            return new Promise((resolve, reject) => {
                if (this.validationUtils.isNullOrEmpty(requestData.locale) || this.validationUtils.isNullOrEmpty(requestData.timezone)) {
                    this.logger.error('startWemWebsocket', 'Locale or Timezone is empty');
                    reject(new CXoneSdkError(CXoneSdkErrorType.INVALID_METHOD_PARMS, 'Locale or Timezone is empty'));
                }
                else if (CXoneAuth.instance.isTokenExpired()) {
                    this.logger.error('startWemWebsocket', 'Notification service - Token is Expired!');
                    reject(new CXoneSdkError(CXoneSdkErrorType.INVALID_METHOD_INVOCATION, 'Token is expired'));
                }
                else {
                    Promise.allSettled([this.tenant.checkProductEnablement([CXoneProductFeature.WFM]),
                        this.tenant.checkProductEnablement([CXoneProductFeature.QM])]).then((result) => {
                        if (result.find(data => data.status === 'fulfilled' && data.value === true)) {
                            this.wemNotificationProvider.startWemWebSocket(requestData);
                            resolve(true);
                        }
                        else {
                            this.logger.error('startWemWebsocket', 'Permission denied');
                            reject(new CXoneSdkError(CXoneSdkErrorType.INVALID_METHOD_INVOCATION, 'Permission denied'));
                        }
                    });
                }
            });
        }
        else {
            // load initial notifications for non leader
            this.wemNotificationProvider.initialWemNotifications();
            return Promise.resolve(true);
        }
    }
    /**
    * This method to send message is ready Acknowledgement to WebSocket
    *@param msgId - Notification message id
    * @returns - boolean | CXoneSdkError
    * @example -
    * ```
    * sendWemAcknowledge('abc1234')
    * ```
    */
    sendWemAcknowledge(msgId) {
        if (this.validationUtils.isNotNullOrEmpty(msgId)) {
            if (CXoneLeaderElector.instance.isLeader)
                this.wemNotificationProvider.sendWemAcknowledge(msgId);
            else {
                const msg = {
                    type: MessageType.WEM_NOTIFICATION_ACK,
                    data: msgId,
                };
                MessageBus.instance.postRequest(msg);
            }
        }
        else {
            this.logger.error('sendWemAcknowledge', 'Message Id is empty');
            return new CXoneSdkError(CXoneSdkErrorType.INVALID_METHOD_PARMS, 'Message Id is empty');
        }
    }
    /**
        * Method to get agent message notification
        * @example
        * ```
        * this.getAgentMessageNotification();
        * ```
        */
    getAgentMessageNotification() {
        AdminService.instance.getTimeStampOffset().then(() => {
            this.agentMessageNotificationSvc.getAgentMessages().then((response) => {
                const agentMessages = response;
                const msgId = LocalStorageHelper.getItem(StorageKeys.AGENT_MESSAGE_POPOVER);
                const agentMessageIds = JSON.parse(msgId || '[]').reverse();
                const messageIds = agentMessageIds.filter((value) => {
                    return agentMessages.findIndex(agentMessage => Number(agentMessage.id) === value) >= 0;
                });
                LocalStorageHelper.setItem(StorageKeys.AGENT_MESSAGE_POPOVER, JSON.stringify(messageIds));
                this.addACDNotificationToIndexDB(response);
            }).catch(error => {
                this.onUpdateMessageEvent.next(error);
            });
        }).catch(error => {
            this.onUpdateMessageEvent.next(error);
        });
    }
    /**
      * Method to add agent message notifications to indexDB
      * @example
      * ```
      * this.addACDNotificationToIndexDB();
      * ```
    */
    addACDNotificationToIndexDB(notifications) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield dbInstance();
            const acdNotifications = yield (db === null || db === void 0 ? void 0 : db.get(IndexDBStoreNames.NOTIFICATIONS, NotificationEntities.ACD_NOTIFICATIONS));
            const newNotifications = notifications.map((notification) => {
                const existingNotifationIndex = acdNotifications === null || acdNotifications === void 0 ? void 0 : acdNotifications.findIndex((data) => data.id === notification.id);
                if (existingNotifationIndex !== undefined && existingNotifationIndex !== -1) {
                    notification.msgRead = acdNotifications[existingNotifationIndex].msgRead || notification.msgRead;
                }
                return notification;
            });
            yield (db === null || db === void 0 ? void 0 : db.put(IndexDBStoreNames.NOTIFICATIONS, newNotifications, NotificationEntities.ACD_NOTIFICATIONS));
            this.onUpdateMessageEvent.next(newNotifications);
            return;
        });
    }
    /**
      * Method to add agent message notification to indexDB
      * @example
      * ```
      * this.markACDNotificationAcknowledge();
      * ```
    */
    markACDNotificationAcknowledge(notificationId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.validationUtils.isNotNullOrEmpty(notificationId)) {
                const db = yield dbInstance();
                const acdNotifications = yield (db === null || db === void 0 ? void 0 : db.get(IndexDBStoreNames.NOTIFICATIONS, NotificationEntities.ACD_NOTIFICATIONS));
                const notificationIndex = acdNotifications.findIndex(obj => obj.id === notificationId);
                acdNotifications[notificationIndex].msgRead = true;
                yield (db === null || db === void 0 ? void 0 : db.put(IndexDBStoreNames.NOTIFICATIONS, acdNotifications, NotificationEntities.ACD_NOTIFICATIONS));
                this.onUpdateMessageEvent.next(acdNotifications);
                const msg = {
                    type: MessageType.ACD_NOTIFICATION_ACK,
                    data: acdNotifications,
                };
                MessageBus.instance.postResponse(msg);
                return;
            }
            else {
                this.logger.error('MarkACDNotificationAcknowledge', 'Notification Id is empty');
                return new CXoneSdkError(CXoneSdkErrorType.INVALID_METHOD_PARMS, 'Notification Id is empty');
            }
        });
    }
    /**
     * Use to terminate the ws worker instance
     * @example
     * ```
     * this.terminateWsWorker();
     * ```
     */
    terminateWemWebSocket() {
        if (CXoneLeaderElector.instance.isLeader) {
            return this.wemNotificationProvider.terminateWemWebSocket();
        }
        else {
            // broadcast data
            const msg = {
                type: MessageType.TERMINATE_WEM_NOTIFICATION_POLLING,
            };
            MessageBus.instance.postRequest(msg);
        }
    }
}
//# sourceMappingURL=cxone-notification-manager.js.map