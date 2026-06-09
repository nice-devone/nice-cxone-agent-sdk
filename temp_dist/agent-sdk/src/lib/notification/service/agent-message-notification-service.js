import { CXoneAuth, CXoneUser } from '@nice-devone/auth-sdk';
import { CXoneSdkError, CXoneSdkErrorType, AgentMessageNotification } from '@nice-devone/common-sdk';
import { Logger, HttpClient, HttpUtilService, ValidationUtils, ApiUriConstants, DateTimeUtilService } from '@nice-devone/core-sdk';
/**
* Class to perform message notification service operations
*/
export class AgentMessageNotificationService {
    constructor() {
        this.logger = new Logger('agent-sdk', 'AgentMessageNotificationService');
        this.utilService = new HttpUtilService();
        this.validationUtils = new ValidationUtils();
    }
    /**
     * This method to get agent messages
     * @returns - AgentMessageNotification[] | CXoneSdkError
     * @example -
     * ```
     * getAgentMessages()
     * ```
     */
    getAgentMessages() {
        const acdApiBaseUri = CXoneAuth.instance.getCXoneConfig().acdApiBaseUri;
        const agentId = CXoneUser.instance.getUserInfo().icAgentId;
        const url = acdApiBaseUri + ApiUriConstants.AGENT_MESSAGES_URI.replace('{agentId}', agentId);
        const token = CXoneAuth.instance.getAuthToken().accessToken;
        return new Promise((resolve, reject) => {
            const reqInit = this.utilService.initHeader(token, 'application/json');
            HttpClient.get(url, reqInit).then((response) => {
                var _a;
                this.logger.info('getAgentMessages', 'Get AgentMessages Success');
                let agentMessages = [];
                const messages = (_a = response.data) === null || _a === void 0 ? void 0 : _a.messages;
                if (messages && this.validationUtils.isNotNullOrEmptyArray(messages)) {
                    messages.forEach((agentMessage) => {
                        const agentMsg = new AgentMessageNotification();
                        agentMsg.parse(agentMessage);
                        agentMessages.push(agentMsg);
                    });
                }
                agentMessages.sort((a, b) => {
                    return b.receivedTime - a.receivedTime;
                });
                const currentServerTime = DateTimeUtilService.getServerTimestamp();
                agentMessages.forEach((agentMessage) => {
                    if (currentServerTime - agentMessage.receivedTime > (Number(agentMessage.expTimer) * 60000)) {
                        agentMessages = agentMessages.filter((item) => item.id !== agentMessage.id);
                    }
                });
                resolve(agentMessages);
            }, (error) => {
                var _a;
                this.logger.error('getAgentMessages', 'api failed:' + JSON.stringify(error));
                reject(new CXoneSdkError(CXoneSdkErrorType.CXONE_API_ERROR, (_a = error === null || error === void 0 ? void 0 : error.data) === null || _a === void 0 ? void 0 : _a.message, error === null || error === void 0 ? void 0 : error.data));
            });
        });
    }
}
//# sourceMappingURL=agent-message-notification-service.js.map