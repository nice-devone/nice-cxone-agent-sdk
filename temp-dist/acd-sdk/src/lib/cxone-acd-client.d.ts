import { CXoneSession } from './acd/cxone-session/cxone-session';
import { CXoneNotificationManager, AgentLegService } from '@nice-devone/agent-sdk';
import { AgentStateService } from './agent-state/service/agent-state-service';
import { CXoneIndicatorManager } from './acd/contact/cxone-indicator-manager';
import { CXoneScreenPop } from './acd/contact/cxone-screen-pop';
import { ContactManager } from './acd/contact/contact-manager';
import { AgentDetailService } from './agent-detials/service/agent-details-service';
/** This is the base class for ACD */
export declare class CXoneAcdClient {
    private logger;
    private static singleton;
    private skillService;
    agentStateService: AgentStateService;
    session: CXoneSession;
    notification: CXoneNotificationManager;
    agentLegService: AgentLegService;
    contactManager: ContactManager;
    indicator: CXoneIndicatorManager;
    screenPop: CXoneScreenPop;
    agentDetailService: AgentDetailService;
    /**
     * get instance for agent auth and session
     *
     * ```
     * @example
     * const cxoneAcdClient = new CXoneAcdClient();
     * ```
     */
    constructor();
    /**
     * Method to create singleton object of the class
     * ```
     * @example
     * const cxoneAcdClient = CXoneAcdClient.instance();
     * ```
     */
    static get instance(): CXoneAcdClient;
    /**
     * method to initialize ACDEngagement
     *
     * ```
     * @example
     * initAcdEngagement();
     * ```
     */
    initAcdEngagement(): Promise<void>;
    /**
     * Subscription for request message over broadcast channel
     */
    private subscribeRequestMessage;
    /**
     * Subscription for response message over broadcast channel
     */
    private subscribeResponseMessage;
    /**
     * method to return Team Unavailable Codes
     * @param teamId - TeamId
     * @returns - Team Unavailable Codes
     *
     * ```
     * @example
     * getTeamUnavailableCodes();
     * ```
     */
    getTeamUnavailableCodes(teamId?: string): Promise<import("@nice-devone/common-sdk").CXoneSdkError | import("@nice-devone/common-sdk").UnavailableCode[]>;
    /**
     * Method to get agent skills
     * @param agentId - nullable Agent Id
     * @returns - agent skills details as an AgentSkill[]
     * @example
     * ```
     * getAgentSkills('1001') || getAgentSkills()
     * ```
     */
    getAgentSkills(agentId?: string): Promise<import("@nice-devone/common-sdk").AgentSkill[]>;
    /**
     * Method to get cached agent skills
     * @param agentId - nullable Agent Id
     * @returns - cached agent skills details as an AgentSkill[]
     * @example
     * ```
     * getCachedAgentSkills('1001') || getCachedAgentSkills()
     * ```
     */
    getCachedAgentSkills(agentId?: string): import("@nice-devone/common-sdk").AgentSkill[] | Promise<import("@nice-devone/common-sdk").AgentSkill[]>;
    /**
     * Method to update the UIQ instance manager URL
     * @example
     * ```
     * updateUIQInstanceManagerURL();
     * ```
     */
    private updateUIQInstanceManagerURL;
    /**
     * Set the custom agent URL for the Click to Dial extension
     * @param customAgentUrl - The custom agent URL to be updated
     * @example
     * ```
     * setClickToDialCustomAgentUrl('https://custom-agent-url.com');
     * ```
     */
    setClickToDialCustomAgentUrl: (customAgentUrl: string) => void;
}
