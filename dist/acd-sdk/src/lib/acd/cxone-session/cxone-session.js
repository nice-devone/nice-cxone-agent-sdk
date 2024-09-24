import { ACDSessionManager } from '@nice-devone/core-sdk';
import { CXoneSdkError, CXoneSdkErrorType, CXoneLeaderElector, MessageType, MessageBus, AgentSessionStatus } from '@nice-devone/common-sdk';
import { AgentStateService } from '../../agent-state/service/agent-state-service';
import { Subject } from 'rxjs';
import { CXoneAuth, CXoneUser } from '@nice-devone/auth-sdk';
import { CXoneAcdClient } from '../../cxone-acd-client';
import { PersonalConnectionService } from '@nice-devone/agent-sdk';
import { CXoneEventMessenger } from '../../event-messenger/cxone-event-messenger';
/** This is the class to manage session mechanism */
export class CXoneSession {
    /**
     * get instance for CXoneSession
     * @example
     * ```
     * const cxoneSession = new CXoneSession();
     * ```
     */
    constructor() {
        this.acdSessionManager = {};
        this.auth = {};
        this.user = {};
        this.cxoneAcdClient = {};
        this.agentStateService = {};
        this.personalConnectionService = {};
        this.onAgentSessionChange = new Subject();
        this.networkOfflineSubject = new Subject();
        this.naturalCallingSkillListSubject = new Subject();
        this.hoursOfOperationSubject = new Subject();
        this.auth = CXoneAuth.instance;
        this.user = CXoneUser.instance;
        this.agentStateService = AgentStateService.instance;
        this.personalConnectionService = PersonalConnectionService.instance;
        this.acdSessionManager = ACDSessionManager.instance;
        this.cxoneAcdClient = CXoneAcdClient.instance;
        const accessToken = this.auth.getAuthToken().accessToken;
        const cxOneConfig = this.auth.getCXoneConfig();
        const userInfo = this.user.getUserInfo();
        this.acdSessionManager.initialize(accessToken, cxOneConfig, userInfo);
        this.subscribeOnAgentSessionChange();
        this.subscribeNetworkOfflineSubjectChange();
        this.subscribeNaturalCallingSkillListEvent();
        this.subscribeHoursOfOperationEvent();
    }
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
    startSession(startSessionRequest) {
        if (startSessionRequest.stationId !== '' ||
            startSessionRequest.stationPhoneNumber !== '') {
            return this.acdSessionManager.startSession(startSessionRequest);
        }
        else {
            return Promise.reject(new CXoneSdkError(CXoneSdkErrorType.INVALID_METHOD_INVOCATION, 'Missing stationId or station phone number'));
        }
    }
    /**
     * Method to join an existing agent session
     * ```
     * @example
     * const joinSession = this.joinSession()
     * ```
     */
    joinSession() {
        return this.acdSessionManager.joinSession();
    }
    /**
     * Method to end the session
     * @param endSessionRequest - object with boolean for forceLogoff, endContacts and ignorePersonalQueue
     * ```
     * @example
     * const endSession = this.endSession(endSessionRequest);
     * ```
     */
    endSession(endSessionRequest) {
        if (CXoneLeaderElector.instance.isLeader) {
            return this.acdSessionManager.endSession(endSessionRequest);
        }
        else {
            const msg = {
                type: MessageType.END_SESSION,
                data: endSessionRequest,
            };
            MessageBus.instance.postRequest(msg);
            return Promise.resolve({});
        }
    }
    /**
     * @example -
     * ```
     * const agentLegEvent = CXoneClient.cxoneSession.agentLegEvent
     * ```
     */
    get agentLegEvent() {
        return this.acdSessionManager.agentLegSubject;
    }
    /**
     * method to set agent state, or log in/out of PC dialer
     * @param agentState - updated agent state value
     * @example
     * ```
     * setAgentState({ state: AgentState })
     * ```
     */
    setAgentState(agentState) {
        var _a, _b;
        const sessionIdValid = this.acdSessionManager.getSessionId();
        const currentlyInPcDialer = sessionIdValid && ((_b = (_a = this.agentStateService) === null || _a === void 0 ? void 0 : _a.getAgentStateDetails()) === null || _b === void 0 ? void 0 : _b.isPersonalConnection);
        const loginPcDialer = sessionIdValid && agentState.isPersonalConnection;
        const onPcCall = this.cxoneAcdClient.contactManager.hasAnyPersonalConnectionContact();
        let stateChangeResult = new Promise(() => {
            Promise.resolve(new CXoneSdkError(CXoneSdkErrorType.INVALID_METHOD_INVOCATION, 'Failed to update the agent state'));
        });
        if ((currentlyInPcDialer || onPcCall) && loginPcDialer) {
            this.personalConnectionService.pcDialerLogout().then(() => {
                stateChangeResult = this.personalConnectionService.pcDialerLogin(agentState);
            });
        }
        else if (loginPcDialer) {
            stateChangeResult = this.personalConnectionService.pcDialerLogin(agentState);
        }
        else if (currentlyInPcDialer || onPcCall) {
            this.personalConnectionService.pcDialerLogout().then(() => {
                stateChangeResult = this.agentStateService.setAgentState(agentState);
            });
        }
        else if (sessionIdValid) {
            stateChangeResult = this.agentStateService.setAgentState(agentState);
        }
        else {
            stateChangeResult = Promise.reject(new CXoneSdkError(CXoneSdkErrorType.INVALID_METHOD_INVOCATION, 'Session not started'));
        }
        return stateChangeResult;
    }
    /**
     * Method to subscribe start session data
     */
    subscribeOnAgentSessionChange() {
        this.acdSessionManager.onAgentSessionChange.subscribe((onAgentSessionChange) => {
            var _a;
            this.onAgentSessionChange.next(onAgentSessionChange);
            if (onAgentSessionChange.status === AgentSessionStatus.SESSION_START ||
                onAgentSessionChange.status === AgentSessionStatus.JOIN_SESSION_SUCCESS) {
                const msg = {
                    issuer: 'CXA',
                    messageType: 'startsession',
                };
                (_a = window === null || window === void 0 ? void 0 : window.parent) === null || _a === void 0 ? void 0 : _a.postMessage(msg, '*');
                CXoneEventMessenger.instance.onSessionTokenUpdate();
            }
        });
    }
    /**
     * Method to subscribe network offline subject
     */
    subscribeNetworkOfflineSubjectChange() {
        this.acdSessionManager.networkOfflineSubject.subscribe((networkOfflineSubject) => {
            this.networkOfflineSubject.next(networkOfflineSubject);
        });
    }
    /**
     * Method to subscribe to the natural calling skill list event
     */
    subscribeNaturalCallingSkillListEvent() {
        this.acdSessionManager.naturalCallingSkillListEvent.subscribe((naturalCallingSkillList) => {
            this.naturalCallingSkillListSubject.next(naturalCallingSkillList);
        });
    }
    ;
    /**
     * Method to subscribe to the hours of operation event
     */
    subscribeHoursOfOperationEvent() {
        this.acdSessionManager.hoursOfOperationEvent.subscribe((hoursOfOperationEventData) => {
            this.hoursOfOperationSubject.next(hoursOfOperationEventData);
        });
    }
}
//# sourceMappingURL=cxone-session.js.map