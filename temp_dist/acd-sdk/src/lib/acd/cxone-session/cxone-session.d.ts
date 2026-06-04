import { StartSessionRequest, AgentState, HttpResponse, CXoneSdkError, EndSessionRequest, AgentSessionResponse, UpdateNetworkTimeoutEvent } from '@nice-devone/common-sdk';
import { AgentStateService } from '../../agent-state/service/agent-state-service';
import { Subject } from 'rxjs';
import { PersonalConnectionService } from '@nice-devone/agent-sdk';
/** This is the class to manage session mechanism */
export declare class CXoneSession {
    private acdSessionManager;
    private auth;
    private user;
    private cxoneAcdClient;
    private cxoneClient;
    private postContactDialerSkill;
    agentStateService: AgentStateService;
    personalConnectionService: PersonalConnectionService;
    onAgentSessionChange: Subject<AgentSessionResponse>;
    networkOfflineSubject: Subject<UpdateNetworkTimeoutEvent>;
    naturalCallingSkillListSubject: Subject<boolean>;
    hoursOfOperationSubject: Subject<unknown>;
    private isUiQueueEnabled;
    onAgentCustomEvent: Subject<AgentSessionResponse>;
    /**
     * get instance for CXoneSession
     * @example
     * ```
     * const cxoneSession = new CXoneSession();
     * ```
     */
    constructor();
    /**
    * Method to start the session
    * @param startSessionRequest - start agent session request object
    * ```
    * @example
    * const startSessionObj: StartSessionRequest = {
       stationId: stationId?.current?.value || '',
       stationPhoneNumber: stationPhoneNo?.current?.value || '',
     };
    * const startSession = this.startSession(startSessionObj);
    * ```
    */
    startSession(startSessionRequest: StartSessionRequest): Promise<HttpResponse | CXoneSdkError>;
    /**
     * Method to join an existing agent session
     * ```
     * @example
     * const joinSession = this.joinSession()
     * ```
     */
    joinSession(): Promise<HttpResponse | CXoneSdkError>;
    /**
     * Method to end the session
     * @param endSessionRequest - object with boolean for forceLogoff, endContacts and ignorePersonalQueue
     * ```
     * @example
     * const endSession = this.endSession(endSessionRequest);
     * ```
     */
    endSession(endSessionRequest: EndSessionRequest): Promise<HttpResponse | CXoneSdkError>;
    /**
     * @example -
     * ```
     * const agentLegEvent = CXoneClient.cxoneSession.agentLegEvent
     * ```
     */
    get agentLegEvent(): Subject<import("@nice-devone/common-sdk").AgentLegEvent>;
    /**
     * method to set agent state, or log in/out of PC dialer
     * @param agentState - updated agent state value
     * @example
     * ```
     * setAgentState({ state: AgentState })
     * ```
     */
    setAgentState(agentState: AgentState): Promise<HttpResponse | CXoneSdkError>;
    /**
     * Method to subscribe start session data
     */
    private subscribeOnAgentSessionChange;
    /**
     * Method to subscribe network offline subject
     */
    private subscribeNetworkOfflineSubjectChange;
    /**
     * Method to subscribe to the natural calling skill list event
     */
    private subscribeNaturalCallingSkillListEvent;
    /**
     * Method to subscribe to the hours of operation event
     */
    private subscribeHoursOfOperationEvent;
    /**
     * Method to subscribe to the agent custom event
     */
    private subscribeOnAgentCustomEvent;
    /**
     * Method to subscribe to agent state changes, to handle PC dialer re-login if needed
     */
    private subscribeToAgentStateChange;
}
