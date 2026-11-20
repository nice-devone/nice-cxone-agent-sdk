import { CXoneAuth, CXoneUser } from '@nice-devone/auth-sdk';
import { CopilotNotificationClient } from './agent-copilot/copilot-notification-client';
import { CopilotService } from './agent-copilot/service/copilot-service';
/** This is the base class for Copilot */
export declare class CopilotClient {
    private logger;
    private static singleton;
    auth: CXoneAuth;
    cxoneUser: CXoneUser;
    copilotNotificationClient: CopilotNotificationClient;
    copilotService: CopilotService;
    isUIQueueEnabled: boolean;
    hasInitModuleInitiated: boolean;
    /**
     * get instance for agent auth and session
     * @example
     * ```
     * const cxoneClient = new CXoneClient();
     * ```
     */
    constructor();
    /**
     * Method to create singleton object of the class
     * ```
     * @example
     * const copilotClient = CopilotClient.instance();
     * ```
     */
    static get instance(): CopilotClient;
    /**
     * Method to initialize auth dependent module when authentication gets successful
     * @example
     * ```
     * this.initAuthDependentModules();
     * ```
     */
    initAuthDependentModules(): Promise<void>;
    /**
       * Subscription for leader change event
       */
    private onLeaderElectionChange;
    /**
     * Subscription for response message over broadcast channel
     */
    private subscribeResponseMessage;
    /**
     * handler for update the refresh token
     */
    private handleRefreshTokenSuccess;
}
