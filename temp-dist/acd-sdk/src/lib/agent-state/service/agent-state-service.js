import { ACDSessionManager, ApiUriConstants, HttpClient, HttpUtilService, LocalStorageHelper, Logger, StorageKeys, UrlUtilsService, } from '@nice-devone/core-sdk';
import { CXoneSdkError, CXoneSdkErrorType, UnavailableCode, } from '@nice-devone/common-sdk';
import { Subject } from 'rxjs';
import { CXoneAuth, CXoneUser } from '@nice-devone/auth-sdk';
import { AgentStates } from '@nice-devone/agent-sdk';
/**
 * Class to perform Agent state's
 */
export class AgentStateService {
    /**
     *
     * ```
     * @example
     * const agentState = new AgentStateService();
     * ```
     */
    constructor() {
        this.logger = new Logger('SDK', 'AgentStateService');
        this.acdSession = {};
        this.urlUtilSvc = new UrlUtilsService();
        this.agentStateSubject = new Subject();
        this.utilService = new HttpUtilService();
        this.auth = CXoneAuth.instance;
        this.acdSession = ACDSessionManager.instance;
        this.acdSession.agentStateSubject.subscribe((agentState) => {
            this.logger.debug('agentStateSubject ', JSON.stringify(agentState));
            this.agentStateDetails = agentState;
            this.updateAgentStates();
        });
        this.acdSession.agentUpdateUnavailableCodeSubject.subscribe(() => {
            this.getTeamUnavailableCodes(true);
        });
    }
    /**
     * Method to create singleton object of the class
     * ```
     * @example
     * const agentStateManaget = AgentStateManager.instance;
     * ```
     */
    static get instance() {
        if (!AgentStateService.singleton) {
            AgentStateService.singleton = new AgentStateService();
        }
        return AgentStateService.singleton;
    }
    /**
     * ```
     * @example
     * getAgentStateDetails();
     * ```
     */
    getAgentStateDetails() {
        var _a;
        return (_a = this.agentStateDetails) === null || _a === void 0 ? void 0 : _a.currentState;
    }
    /**
     * Service method to get agent state
     * @returns - response from the getAgentState api
     * @example
     * ```
     * getAgentState()
     * ```
     */
    getAgentState() {
        return this.agentStateDetails;
    }
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
    setAgentState(agentState) {
        const setAgentStateUri = ApiUriConstants.SET_AGENT_STATE_URI;
        const baseUri = this.auth.getCXoneConfig().acdApiBaseUri;
        const url = baseUri +
            setAgentStateUri.replace('{sessionId}', this.acdSession.getSessionId());
        const reqInit = {
            headers: this.utilService.initHeader(this.auth.getAuthToken().accessToken, '').headers,
            body: {
                state: agentState.state,
                reason: agentState.reason,
            },
        };
        return new Promise((resolve, reject) => {
            HttpClient.post(url, reqInit).then((response) => {
                this.logger.info('setAgentState', 'setAgentState success:-' + response.toString());
                resolve(response);
            }, (error) => {
                this.logger.error('setAgentState', 'setAgentState failed:-' + error.toString());
                reject(error);
            });
        });
    }
    /**
     * Method to update agent states
     * ```
     * @example
     * this.updateAgentStates();
     * ```
     */
    updateAgentStates() {
        this.updateAgentCurrentState();
        this.agentStateSubject.next(this.agentStateDetails);
    }
    /**
     * Method to update agent current state
     * ```
     * @example
     * this.updateAgentCurrentState();
     * ```
     */
    updateAgentCurrentState() {
        const currentState = this.agentStateDetails.currentState.state.toLowerCase();
        if (this.isAgentInWorkingState(currentState)) {
            this.agentStateDetails.currentState.isPersonalConnection = currentState === AgentStates.Dialer.toLowerCase();
            this.agentStateDetails.currentState.state = 'Working';
        }
        else {
            this.agentStateDetails.currentState.state = currentState;
        }
    }
    /**
     * Method to check the agent is working or not
     * @param state - Agent state
     * ```
     * @example
     * this.isAgentInWorkingState();
     * ```
     */
    isAgentInWorkingState(state) {
        const currentState = state.toLowerCase();
        return (currentState === AgentStates.OutboundContact.toLowerCase() ||
            currentState === AgentStates.InboundContact.toLowerCase() ||
            currentState === AgentStates.InboundConsult.toLowerCase() ||
            currentState === AgentStates.OutboundConsult.toLowerCase() ||
            currentState === AgentStates.Dialer.toLowerCase() ||
            currentState === AgentStates.DialerPending.toLowerCase());
    }
    /**
     * Method to return Team Unavailable Codes
     * @param state - Boolean Update Cache
     * @returns - returns Promise of Unavailable code
     * ```
     * @example
     * getTeamUnavailableCodes(updateCache);
     * ```
     */
    getTeamUnavailableCodes(updateCache = false, teamId) {
        return new Promise((resolve, reject) => {
            var _a;
            const unavailableCodesFromStorage = LocalStorageHelper.getItem(StorageKeys.UNAVAILABLE_CODES, true);
            if (updateCache || !unavailableCodesFromStorage) {
                const token = this.auth.getAuthToken();
                const reqInit = this.utilService.initHeader(token.accessToken, 'application/json');
                const cxOneConfig = this.auth.getCXoneConfig();
                teamId = teamId ? teamId : (_a = CXoneUser.instance.getUserInfo().teamId) === null || _a === void 0 ? void 0 : _a.toString();
                if (teamId) {
                    let unavailableCodeUrl = cxOneConfig.apiFacadeBaseUri +
                        ApiUriConstants.GET_UNAVAILABLE_CODES_URI.replace('{teamId}', teamId);
                    const params = { activityOnly: true };
                    unavailableCodeUrl = this.urlUtilSvc.appendQueryString(unavailableCodeUrl, params);
                    HttpClient.get(unavailableCodeUrl, reqInit).then((resp) => {
                        this.logger.info('getTeamUnavailableCodes', 'Get Unavailable Codes Success');
                        const unavailableCodes = [];
                        resp.data.unavailableCodes.forEach((unavailableCode) => {
                            const unavailableCodeData = new UnavailableCode();
                            unavailableCodeData.parseData(unavailableCode);
                            unavailableCodes.push(unavailableCodeData);
                        });
                        LocalStorageHelper.setItem(StorageKeys.UNAVAILABLE_CODES, JSON.stringify(unavailableCodes));
                        resolve(unavailableCodes);
                    }, (error) => {
                        var _a;
                        this.logger.error('getTeamUnavailableCodes', 'Get Unavailable Codes Failed ' + JSON.stringify(error));
                        reject(new CXoneSdkError(CXoneSdkErrorType.CXONE_API_ERROR, (_a = error === null || error === void 0 ? void 0 : error.data) === null || _a === void 0 ? void 0 : _a.message, error === null || error === void 0 ? void 0 : error.data));
                    });
                }
                else {
                    this.logger.error('getTeamUnavailableCodes', 'Team ID is not present ');
                    reject(new CXoneSdkError(CXoneSdkErrorType.INVALID_METHOD_PARMS, 'Team ID is not present'));
                }
            }
            else {
                this.logger.info('getTeamUnavailableCodes', 'Get Unavailable Codes from storage');
                resolve(unavailableCodesFromStorage);
            }
        });
    }
}
//# sourceMappingURL=agent-state-service.js.map