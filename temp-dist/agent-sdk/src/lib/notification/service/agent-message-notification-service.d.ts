import { CXoneSdkError, AgentMessageNotification } from '@nice-devone/common-sdk';
import { Logger, HttpUtilService } from '@nice-devone/core-sdk';
/**
* Class to perform message notification service operations
*/
export declare class AgentMessageNotificationService {
    protected logger: Logger;
    protected utilService: HttpUtilService;
    private validationUtils;
    /**
     * This method to get agent messages
     * @returns - AgentMessageNotification[] | CXoneSdkError
     * @example -
     * ```
     * getAgentMessages()
     * ```
     */
    getAgentMessages(): Promise<AgentMessageNotification[] | CXoneSdkError>;
}
