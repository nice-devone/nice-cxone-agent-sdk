import { FeedbackData } from '@nice-devone/core-sdk';
import { AgentSkill, CXoneApiPerformanceMetrics } from '@nice-devone/common-sdk';
import { CXoneDirectory } from './directory/cxone-directory';
import { CopilotNotificationClient } from './agent-copilot/copilot-notification-client';
import { CXoneAgentPermission } from './acd/cxone-agent-permission/cxone-agent-permission';
import { CXoneAgentSetting } from './acd/cxone-agent-setting/cxone-agent-setting';
import { CXoneSkillActivityQueue } from './acd/cxone-skill-activity-queue/cxone-skill-activity-queue';
import { CXoneNotificationManager } from './notification/cxone-notification-manager';
import { CXoneTenant } from './acd/cxone-tenant/cxone-tenant';
import { WemSchedule } from './wem-schedule/wem-schedule';
import { CustomerCardService } from './customer-card/service/customer-card-service';
import { CXoneAuth, CXoneUser } from '@nice-devone/auth-sdk';
import { ScreenAgentService } from './screen-agent/service/screen-agent-service';
import { CommitmentService } from './commitment/commitment-service';
import { CommonService } from '../common/common-services';
import { AgentIntegrationConfigurationService } from './agent-integration-configuration/agent-integration-configuration-service';
import { TeamService } from './directory/service/team-service';
import { Subject } from 'rxjs';
import { CXoneRealtimeReportService } from './reporting/cxone-realtime-report-service';
import { AutoSummaryService } from './auto-summary/auto-summary-service';
import { AutoSummaryNotificationService } from './auto-summary/auto-summary-notification-service';
import { IEXService } from './IEX/IEX-service';
import { CopilotService } from './agent-copilot/service/copilot-service';
import { TranscriptService } from './transcript/transcript-service';
import { PresenceSyncService } from './presence-sync/service/presence-sync-service';
import { AgentAssistWSService } from './agent-assist/agent-assist-ws-service';
import { VoiceBioHubService } from './voice-bio-hub/voice-bio-hub-service';
import { CXoneAgentContactHistory } from './acd/cxone-agent-contact-history/cxone-agent-contact-history';
import { SessionSwitchData } from './interfaces/session-switch-data';
/** This is the base class for ACD */
export declare class CXoneClient {
    private logger;
    private static singleton;
    private acdSessionManager;
    auth: CXoneAuth;
    directory: CXoneDirectory;
    agentPermission: CXoneAgentPermission;
    agentSetting: CXoneAgentSetting;
    agentContactHistory: CXoneAgentContactHistory;
    skillActivityQueue: CXoneSkillActivityQueue;
    notification: CXoneNotificationManager;
    copilotNotificationClient: CopilotNotificationClient;
    cxoneTenant: CXoneTenant;
    cxoneUser: CXoneUser;
    wemSchedule: WemSchedule;
    iexService: IEXService;
    screenAgent: ScreenAgentService;
    commitment: CommitmentService;
    common: CommonService;
    cxoneCustomerCard: CustomerCardService;
    hasInitModuleInitiated: boolean;
    cxoneApiPerformanceMetrics: Subject<CXoneApiPerformanceMetrics>;
    agentIntegrationConfigurationService: AgentIntegrationConfigurationService;
    teamService: TeamService;
    performanceReport: CXoneRealtimeReportService;
    onUpdateSkillsEvent: Subject<AgentSkill[]>;
    autoSummaryService: AutoSummaryService;
    autoSummaryNotificationService: AutoSummaryNotificationService;
    copilotService: CopilotService;
    transcript: TranscriptService;
    presenceSyncService: PresenceSyncService;
    agentAssistWSService: AgentAssistWSService;
    voiceBioHubService: VoiceBioHubService;
    isUIQueueEnabled: boolean;
    private static isCopilotWsConnected;
    /**
     * Gets the Copilot notification WebSocket connection status.
     * @returns True if the websocket is connected (or connection is in progress).
     * @example CXoneClient.getCopilotWsConnected();
     */
    static getCopilotWsConnected(): boolean;
    /**
     * Sets the Copilot notification WebSocket connection flag.
     * @param isConnected - True if the websocket is connected (or connection is in progress).
     * @example CXoneClient.setCopilotWsConnected(false);
     */
    static setCopilotWsConnected(isConnected: boolean): void;
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
     * const cxoneClient = CXoneClient.instance();
     * ```
     */
    static get instance(): CXoneClient;
    /**
     * Method to initialize auth dependent module when authentication gets successful
     * @example
     * ```
     * this.initAuthDependentModules();
     * ```
     */
    initAuthDependentModules(): Promise<void>;
    /**
     * method to initialize AgentIntegrationConfigurationService
     * @example
     * ```
     * CXoneClient.instance.initAgentIntegrationConfigurationService();
     * ```
     */
    initAgentIntegrationConfigurationService(): void;
    /**
     * Clears out all Local Storage except Settings
     * Any other items thst should persist can be added
     * if needed.
     *
     * @example  clearCxoneLocalStorage
     */
    private clearCxoneLocalStorage;
    /**
     * Method to clear local and session storage
     * @example
     * ```
     * clearCache()
     * ```
     */
    clearCache(): Promise<void>;
    /**
     * Subscription for leader change event
     */
    private onLeaderElectionChange;
    /**
     * Subscription for request message over broadcast channel
     */
    private subscribeRequestMessage;
    /**
     * Subscription for response message over broadcast channel
     */
    private subscribeResponseMessage;
    /**
     * Method to terminate util worker
     * @example
     * ```
     * terminateCXoneUtilWorker()
     * ```
     */
    private terminateCXoneUtilWorker;
    /**
     * handler for update the refresh token
     */
    private handleRefreshTokenSuccess;
    /**
     * create auto summary service object
     * @example autoSummaryService
    */
    private createAutoSummaryService;
    /**
     * create auto summary notification service object
     * @example createAutoSummaryNotificationService()
    */
    private createAutoSummaryNotificationService;
    /**
     * subscribe the agent assist event for copilot provider
     */
    subscribeAgentAssistEvent: () => void;
    /**
     * Lazily establishes the Copilot (Agent Assist) WebSocket connection when enabled and not already connected.
     *
     * This method checks the {@link FeatureToggles.LAZY_LOAD_COPILOT_WEBSOCKET} feature toggle and only attempts
     * to connect if the Copilot WebSocket has not yet been marked as connected via {@link CXoneClient.getCopilotWsConnected}.
     *
     * Connection details are derived from:
     * - CXone configuration: `aahNotificationWssUri`
     * - Current user context: `icAgentId`, `userId`, `icBUId`
     *
     * If {@link FeatureToggles.MULTI_ACD_WEBSOCKET} is enabled, the connection identifier uses `userId`;
     * otherwise it uses `icAgentId`. The WebSocket URL is constructed as:
     * `aahNotificationWssUri?agentId=<connectionIdentifier>&BUid=<icBUId>`.
     *
     * On connection attempt, the internal "connected" flag is set optimistically. If the connection attempt throws,
     * the flag is reset and an error is logged.
     *
     * @returns void
     */
    connectCopilotWebSocket: () => void;
    /**
     * create Agent Assist Web Socket service object
     * @example this.createAgentAssistWSService();
     */
    private createAgentAssistWSService;
    /**
     * Method to get feedback categories and priorities
     * @returns  - It returns the feedback categories and priorities
     * @example
     * ```
     * getFeedbackCategoriesAndPriorities();
     * ```
     */
    getFeedbackCategoriesAndPriorities(): Promise<import("@nice-devone/common-sdk").CXoneSdkError | import("@nice-devone/core-sdk").feedbackCategoriedAndPrioritiesResponse>;
    /**
     * Method to submit feedback issue
     * @returns  - promise result from submit feedback post
     * @example
     * ```
     * submitFeedback();
     * ```
     */
    submitFeedback(feedbackData: FeedbackData): Promise<import("@nice-devone/common-sdk").HttpResponse | import("@nice-devone/common-sdk").CXoneSdkError>;
    /**
     * Assigns selected case id to user in CXone sdk
     * @param sessionDetails - contactId, interactionId, mediaType
     * @example -
     * ```
     * switchContacts(sessionDetails);
     * ```
     */
    switchContacts(sessionDetails: SessionSwitchData): void;
}
