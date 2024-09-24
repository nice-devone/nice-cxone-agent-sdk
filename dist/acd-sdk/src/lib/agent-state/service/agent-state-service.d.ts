import { HttpUtilService, Logger } from '@nice-devone/core-sdk';
import { AgentCurrentState, AgentState, AgentStateEvent, CXoneSdkError, HttpResponse, UnavailableCode } from '@nice-devone/common-sdk';
import { Subject } from 'rxjs';
/**
 * Class to perform Agent state's
 */
export declare class AgentStateService {
    private static singleton;
    protected logger: Logger;
    private acdSession;
    private agentStateDetails;
    private auth;
    private urlUtilSvc;
    agentStateSubject: Subject<AgentStateEvent>;
    protected utilService: HttpUtilService;
    /**
     * Method to create singleton object of the class
     * ```
     * @example
     * const agentStateManaget = AgentStateManager.instance;
     * ```
     */
    static get instance(): AgentStateService;
    /**
     *
     * ```
     * @example
     * const agentState = new AgentStateService();
     * ```
     */
    constructor();
    /**
     * ```
     * @example
     * getAgentStateDetails();
     * ```
     */
    getAgentStateDetails(): AgentCurrentState;
    /**
     * Service method to set agent state
     * @param agentState - Updated agent state along with reason
     * @returns - response from the setAgentState api
     * @example
     * ```
     * const agentState = { state: 'Unavailable', reason:'Break' };
     * setAgentState(agentState)
     * ```
     */
    setAgentState(agentState: AgentState): Promise<HttpResponse | CXoneSdkError>;
    /**
     * Method to update agent states
     * ```
     * @example
     * this.updateAgentStates();
     * ```
     */
    private updateAgentStates;
    /**
     * Method to update agent current state
     * ```
     * @example
     * this.updateAgentCurrentState();
     * ```
     */
    private updateAgentCurrentState;
    /**
     * Method to check the agent is working or not
     * @param state - Agent state
     * ```
     * @example
     * this.isAgentInWorkingState();
     * ```
     */
    private isAgentInWorkingState;
    /**
     * Method to return Team Unavailable Codes
     * @param state - Boolean Update Cache
     * @returns - returns Promise of Unavailable code
     * ```
     * @example
     * getTeamUnavailableCodes(updateCache);
     * ```
     */
    getTeamUnavailableCodes(updateCache?: boolean, teamId?: string): Promise<UnavailableCode[] | CXoneSdkError>;
}
