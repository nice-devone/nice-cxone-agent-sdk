import { HttpClient, HttpUtilService } from '../../http/index';
import { GetNextEventProvider } from '../providers/get-next-event-provider';
import { Logger } from '../../../logger/logger';
import { StorageKeys } from '../../../constants/storage-key';
import { ApiUriConstants } from '../../../constants/api-uri-constants';
import { CXoneSdkError, CXoneSdkErrorType, AgentSessionStatus, CXoneLeaderElector, MessageType, MessageBus, } from '@nice-devone/common-sdk';
import { Subject, ReplaySubject } from 'rxjs';
import { LocalStorageHelper } from '../../../util/storage-helper-local';
import { CXoneGetNextAdapter } from '../../adapter/cxone-get-next-adapter';
import { UIQueueWsProvider } from '../providers/ui-queue-ws-provider';
import { AdminService } from '../../admin';
/**
 * Utility for agent session management
 */
export class ACDSessionManager {
    /**
     * @example
     * ```
     * const acdSessionManager = new ACDSessionManager();
     * ```
     */
    constructor() {
        this.logger = new Logger('SDK');
        this.utilService = new HttpUtilService();
        this.adminService = {};
        this.sessionId = '';
        this._callContactEventSubject = new Subject();
        this._voiceMailContactEventSubject = new Subject();
        this._workItemContactEventSubject = new Subject();
        this._muteEventSubject = new Subject();
        this._updatePermissionsEventSubject = new Subject();
        //Subject for offline event when the agent is not connected with internet.
        this._onNetworkTimeOutEventSubject = new Subject();
        this._onAgentSessionChange = new Subject();
        this._agentStateSubject = new Subject();
        this._agentUnavailableCodeSubject = new Subject();
        this._agentLegSubject = new Subject();
        this._agentIndicatorsSubject = new Subject();
        this._contactIndicatorsSubject = new Subject();
        this._digitalContactSubject = new Subject();
        this._pageOpenSubject = new Subject();
        this._runAppSubject = new Subject();
        this._updateMessageEvent = new Subject();
        this._mchAgentSettingChangeEvent = new Subject();
        this._updateSkillsEvent = new Subject();
        this._screenPopSubject = new Subject();
        this._popUrlSubject = new Subject();
        this._agentWorkflowEvent = new Subject();
        this._agentWorkflowRequestEvent = new Subject();
        this._coBrowseEvent = new Subject();
        this.userInfo = {};
        this.cxOneConfig = {};
        this.accessToken = '';
        this._agentAssistSubject = new Subject();
        this._onUpdateCommitments = new Subject();
        this._onCommitmentEvent = new Subject();
        this._onCommitmentStatusEvent = new Subject();
        this._agentAssistSummarySubject = new Subject;
        this._agentAssistWSSubject = new ReplaySubject(1);
        this._voiceMailPlayBackSubject = new Subject();
        this._onNaturalCallingSkillListEvent = new Subject();
        this._onConferenceEvent = new Subject();
        this._onHoursOfOperationEvent = new Subject();
        this._onAgentAssistWebSocketUnsubscribe = new Subject();
        this._onAgentAssistGetNextEvent = new Subject();
        this._customScreenpopSubject = new Subject();
        this._onGetNextEventSubject = new Subject();
        this._contactEventSubject = new Subject();
        this._answerEvent = new Subject();
        this._rejectEvent = new Subject();
        this._callControlEvent = new Subject();
        this.isEventQueueResized = false;
        /**
         * Posts custom form data
         * @param contactId - sendor contact id
         * @param customFormData - custom form data with '|' delimited string for each key/value
         * @returns - response for custom data api
         * @example
         * ```
         * this.postCustomFormData('1234', customFormData);
         * ```
         */
        this.postCustomFormData = (contactId, customFormData) => {
            const sessionId = this.getSessionId();
            const postCustomDataEndpoint = ApiUriConstants.POST_CUSTOM_FORM_DATA.replace('{sessionId}', sessionId).replace('{contactId}', contactId);
            const baseUri = this.cxOneConfig.acdApiBaseUri;
            const endpoint = baseUri + postCustomDataEndpoint;
            const reqInit = {
                headers: this.utilService.initHeader(this.accessToken, '').headers,
                body: customFormData,
            };
            return new Promise((resolve, reject) => {
                HttpClient.post(endpoint, reqInit)
                    .then((resp) => {
                    this.logger.info('postCustomFormData', 'Post custom form success');
                    resolve(resp);
                })
                    .catch((error) => {
                    this.logger.error('postCustomFormData', 'Post custom form failed :-' + error.toString());
                    reject(error);
                });
            });
        };
        this.adminService = AdminService.instance;
    }
    /**
     * @example -
     * ```
     * const onGetNextEvent = acdSession.onGetNextEvent
     * ```
     */
    get onGetNextEvent() {
        return this._onGetNextEventSubject;
    }
    /**
     * @example -
     * ```
     * const onContactEvent = acdSession.onContactEvent
     * ```
     */
    get onContactEvent() {
        return this._contactEventSubject;
    }
    /**
     * @example -
     * ```
     * const answerEvent = acdSession.answerEvent
     * ```
     */
    get answerEvent() {
        return this._answerEvent;
    }
    /**
     * @example -
     * ```
     * const rejectEvent = acdSession.rejectEvent
     * ```
     */
    get rejectEvent() {
        return this._rejectEvent;
    }
    /**
     * @example -
     * ```
     * const callControlEvent = acdSession.callControlEvent
     * ```
     */
    get callControlEvent() {
        return this._callControlEvent;
    }
    /**
     * @example -
     * ```
     * const callContactEventSubject  = acdSession.callContactEventSubject
     * ```
     */
    get callContactEventSubject() {
        return this._callContactEventSubject;
    }
    /**
     * @example -
     * ```
     * const voiceMailContactEventSubject  = acdSession.voiceMailContactEventSubject
     * ```
     */
    get voiceMailContactEventSubject() {
        return this._voiceMailContactEventSubject;
    }
    /**
     * @example -
     * ```
     * const workitemContactEventSubject = acdSession.workitemContactEventSubject
     * ```
     */
    get workItemContactEventSubject() {
        return this._workItemContactEventSubject;
    }
    /**
     * @example -
     * ```
     * const voiceMailPlayBackEventSubject  = acdSession.voiceMailPlayBackEventSubject
     * ```
     */
    get voiceMailPlayBackEventSubject() {
        return this._voiceMailPlayBackSubject;
    }
    /**
     * @example -
     * ```
     * const muteEventSubject = acdSession.muteEventSubject
     * ```
     */
    get muteEventSubject() {
        return this._muteEventSubject;
    }
    /**
     * @example -
     * ```
     * const networkOfflineSubject = acdSession.networkOfflineEventSubject
     * ```
     */
    get networkOfflineSubject() {
        return this._onNetworkTimeOutEventSubject;
    }
    /**
     * @example -
     * ```
     * const updatePermissionsEventSubject = acdSession.updatePermissionsEventSubject
     * ```
     */
    get updatePermissionsEventSubject() {
        return this._updatePermissionsEventSubject;
    }
    /**
     * @example
     * ```
     * const agentState = acdSession.agentStateSubject
     * ```
     */
    get agentStateSubject() {
        return this._agentStateSubject;
    }
    /**
     * @example
     * ```
     * const updateUnavailableCode = acdSession.agentUpdateUnavailableCodeSubject
     * ```
     */
    get agentUpdateUnavailableCodeSubject() {
        return this._agentUnavailableCodeSubject;
    }
    /**
     * @example -
     * ```
     * const agentSessionChange = acdSession.onAgentSessionChange
     * ```
     */
    get onAgentSessionChange() {
        this.logger.info('endSessionFrom', '[ACDSession][endSession] received from get next event');
        return this._onAgentSessionChange;
    }
    /**
     * @example -
     * ```
     * const agentLegSubject = acdSession.agentLegSubject
     * ```
     */
    get agentLegSubject() {
        return this._agentLegSubject;
    }
    /**
     * @example -
     * ```
     * const agentIndicatorsSubject = acdSession.agentIndicatorsSubject
     * ```
     */
    get agentIndicatorsSubject() {
        return this._agentIndicatorsSubject;
    }
    /**
     * @example -
     * ```
     * const contactIndicatorsSubject = acdSession.contactIndicatorsSubject
     * ```
     */
    get contactIndicatorsSubject() {
        return this._contactIndicatorsSubject;
    }
    /**
     * @example -
     * ```
     * const digitalContactSubject = agentSession.digitalContactSubject
     * ```
     */
    get digitalContactSubject() {
        return this._digitalContactSubject;
    }
    /**
     * @example -
     * ```
     * const pageOpenSubject = agentSession.pageOpenSubject
     * ```
     */
    get pageOpenSubject() {
        return this._pageOpenSubject;
    }
    /**
     * @example -
     * ```
     * const runAppSubject = agentSession.runAppSubject
     * ```
     */
    get runAppSubject() {
        return this._runAppSubject;
    }
    /**
     * @example -
     * ```
     * const updateMessageEvent = acdSession.updateMessageEvent
     * ```
     */
    get updateMessageEvent() {
        return this._updateMessageEvent;
    }
    /**
     * @example -
     * ```
     * const coBrowseEvent = acdSession.coBrowseEvent
     * ```
     */
    get coBrowseEvent() {
        return this._coBrowseEvent;
    }
    /**
     * @example -
     * ```
     * const mchAgentSettingsChangeEvent = agentSession.mchAgentSettingsChangeEvent
     * ```
     */
    get mchAgentSettingsChangeEvent() {
        return this._mchAgentSettingChangeEvent;
    }
    /**
     * @example -
     * ```
     * const updateSkillsEvent = agentSession.updateSkillsEvent
     * ```
     */
    get updateSkillsEvent() {
        return this._updateSkillsEvent;
    }
    /**
     * Used to get the agent workflow event subject
     * @example -
     * ```
     * const _agentWorkflowEvent = agentSession.agentWorkflowEvent
     * ```
     */
    get agentWorkflowEvent() {
        return this._agentWorkflowEvent;
    }
    /**
     * Used to get the agent workflow event subject
     * @example -
     * ```
     * const agentWorkflowRequestEvent = agentSession.agentWorkflowRequestEvent
     * ```
     */
    get agentWorkflowRequestEvent() {
        return this._agentWorkflowRequestEvent;
    }
    /**
     * @example -
     * ```
     * const naturalCallingSkillListEvent = acdSession.naturalCallingSkillListEvent
     * ```
     */
    get naturalCallingSkillListEvent() {
        return this._onNaturalCallingSkillListEvent;
    }
    /**
     * @example -
     * ```
     * const conferenceCallEvent = acdSession.conferenceCallEvent
     * ```
     */
    get conferenceCallEvent() {
        return this._onConferenceEvent;
    }
    /**
     * @example -
     * ```
     * const hoursOfOperationEvent = acdSession.hoursOfOperationEvent
     * ```
     */
    get hoursOfOperationEvent() {
        return this._onHoursOfOperationEvent;
    }
    /**
     * Method to create singleton object of the class
     * @example
     * ```
     * const agentSession = ACDSessionManager.instance;
     * ```
     */
    static get instance() {
        if (!ACDSessionManager.singleton) {
            ACDSessionManager.singleton = new ACDSessionManager();
        }
        return ACDSessionManager.singleton;
    }
    /**
     * Method to initialize the user details
     * (i.e) cxoneConfig, userInfo and aceessToken
     * @param accessToken - Access token
     * @param config - cxoneConfig object
     * @param userInfo - user info object
     * @example
     * ```
     * const agentSession = ACDSessionManager.instance.initialize(accessToken, config, userInfo);
     * ```
     */
    initialize(accessToken, config, userInfo) {
        this.cxOneConfig = config;
        this.userInfo = userInfo;
        this.setAccessToken(accessToken);
    }
    /**
     * @param accessToken - access token
     * @example
     * ```
     * this.setAccessToken(accessToken);
     * ```
     */
    setAccessToken(accessToken) {
        this.accessToken = accessToken;
    }
    /**
     * Method to switch between Uiq and get-next polling
     * @param invokeSnapshot - Flag to receive to snapshot
     * @param sessionId - session id
     * @example
     * ```
     * this.toggleAgentEventsReceivingMethod(invokeSnapshot, sessionId)
     * ```
     */
    toggleAgentEventsReceivingMethod({ invokeSnapshot = false, sessionId = '', isUIQueueEnabled: isUIQueueTMToggleEnabled = false }) {
        this.adminService.getAgentSettings().then((agentSetting) => {
            if (agentSetting.enableUIQueue && isUIQueueTMToggleEnabled) {
                this.establishUIQSocketConnection(invokeSnapshot);
            }
            else {
                this.startGetNextEvents(sessionId);
            }
        }).catch(error => {
            this.logger.error('toggleAgentEventsReceivingMethod', 'Error while getting events' + error.toString());
        });
    }
    /**
     * Method to start session for an agent
     * @param startSessionRequest - Object of type StartSessionRequest.
     * @returns - response from the start agent session api
     * @example
     * ```
     * const startAgentSession = this.startSession(startSessionRequest)
     * ```
     */
    startSession(startSessionRequest, isUIQueueEnabled) {
        const baseUri = this.cxOneConfig.acdApiBaseUri;
        const endpoint = baseUri + ApiUriConstants.AGENT_SESSION_URI;
        return new Promise((resolve, reject) => {
            const reqInit = {
                headers: this.utilService.initHeader(this.accessToken, '').headers,
                body: startSessionRequest,
            };
            HttpClient.post(endpoint, reqInit)
                .then((resp) => {
                this.logger.info('startSession', `[ACDSession][StartSession] status: ${resp.status}, statusTest: ${resp.statusText}, data: ${resp.data}`);
                if (resp.data.sessionId) {
                    localStorage.setItem(StorageKeys.ACD_SESSION_ID, resp.data.sessionId);
                    this.sessionId = resp.data.sessionId;
                    resolve(resp);
                    // initiate get next event
                    if (CXoneLeaderElector.instance.isLeader) {
                        this.toggleAgentEventsReceivingMethod({ isUIQueueEnabled });
                    }
                    else {
                        const msg = {
                            type: MessageType.JOIN_SESSION,
                        };
                        MessageBus.instance.postRequest(msg);
                    }
                }
                else {
                    reject(new CXoneSdkError(CXoneSdkErrorType.INVALID_METHOD_INVOCATION, 'missing sessionId'));
                }
            })
                .catch((err) => {
                this.logger.error('startSession', 'Error while starting session' + err.toString());
                reject(err);
            });
        });
    }
    /**
     * Method to join session for an agent
     * @param options - input parameters for the method includes agent id
     * @returns - response from the join agent session api
     * @example
     * ```
     * const agentObj = {agentId: 23}
     * const joinACDSession = this.joinSession(agentObj)
     * ```
     */
    joinSession(options) {
        const baseUri = this.cxOneConfig.acdApiBaseUri;
        const endpoint = baseUri + ApiUriConstants.JOIN_AGENT_SESSION_URI;
        return new Promise((resolve, reject) => {
            const reqInit = {
                headers: this.utilService.initHeader(this.accessToken, '').headers,
                body: {
                    asAgentId: (options === null || options === void 0 ? void 0 : options.agentId) ? options.agentId : '',
                },
            };
            HttpClient.post(endpoint, reqInit)
                .then((resp) => {
                this.logger.info('joinSession', `[ACDSession][JoinSession] status: ${resp.status}, statusTest: ${resp.statusText}, data: ${JSON.stringify(resp.data)}`);
                if (resp.data.sessionId) {
                    localStorage.setItem(StorageKeys.ACD_SESSION_ID, resp.data.sessionId);
                    this.sessionId = resp.data.sessionId;
                    resolve(resp);
                    this.onAgentSessionChange.next({
                        status: AgentSessionStatus.JOIN_SESSION_SUCCESS,
                        data: resp,
                    });
                    // initiate get next event
                    if (CXoneLeaderElector.instance.isLeader) {
                        this.toggleAgentEventsReceivingMethod({ invokeSnapshot: true, isUIQueueEnabled: options === null || options === void 0 ? void 0 : options.isUIQueueEnabled });
                    }
                    else {
                        const msg = {
                            type: MessageType.JOIN_SESSION_FOR_NON_LEADER,
                            data: this.sessionId,
                        };
                        MessageBus.instance.postRequest(msg);
                    }
                }
                else {
                    const error = new CXoneSdkError(CXoneSdkErrorType.INVALID_METHOD_INVOCATION, 'missing session id');
                    this.onAgentSessionChange.next({
                        status: AgentSessionStatus.JOIN_SESSION_FAILURE,
                        data: error,
                    });
                    reject(error);
                }
            })
                .catch((err) => {
                this.logger.error('joinSession', 'Error while joining session' + err.toString());
                this.onAgentSessionChange.next({
                    status: AgentSessionStatus.JOIN_SESSION_FAILURE,
                    data: err,
                });
                reject(err);
            });
        });
    }
    /**
     * Method to end an agent session
     * @param endSessionRequest - object with boolean for forceLogoff, endContacts and ignorePersonalQueue
     * @returns - response to end session of an agent
     * @example
     * ```
     * const angentEndSession = this.endSession(endSessionRequest);
     * ```
     */
    endSession(endSessionRequest) {
        const baseUri = this.cxOneConfig.acdApiBaseUri;
        const endpoint = baseUri + ApiUriConstants.AGENT_SESSION_URI + '/' + this.sessionId;
        return new Promise((resolve, reject) => {
            const reqInit = {
                headers: this.utilService.initHeader(this.accessToken, '').headers,
                body: {
                    forceLogoff: endSessionRequest.forceLogoff,
                    endContacts: endSessionRequest.endContacts,
                    ignorePersonalQueue: endSessionRequest.ignorePersonalQueue,
                },
            };
            HttpClient.delete(endpoint, reqInit)
                .then((resp) => {
                this.logger.info('endSession', `[ACDSession][endSession] status: ${resp.status}, statusTest: ${resp.statusText}, data: ${resp.data}`);
                if (resp.data) {
                    resolve(resp);
                    localStorage.removeItem(StorageKeys.ACD_SESSION_ID);
                    this.sessionId = '';
                }
                else {
                    reject(new CXoneSdkError(CXoneSdkErrorType.INVALID_METHOD_INVOCATION, 'Data is empty'));
                }
            })
                .catch((err) => {
                this.logger.error('joinSession', 'Error while ending session' + err.toString());
                reject(err);
            });
        });
    }
    /**
     *
     * @returns - agent session id
     * @example
     * ```
     * const agentSessionId = this.getSessionId();
     * ```
     */
    getSessionId() {
        return (this.sessionId || LocalStorageHelper.getItem(StorageKeys.ACD_SESSION_ID));
    }
    /**
     *
     * @param value - updatedSessionId
     * @example
     * ```
     * this.setSessionId('SHRxbEd2ZkFyN');
     * ```
     */
    setSessionId(value) {
        this.sessionId = value;
    }
    /**
     * @example -
     * ```
     * const screenPopSubject  = acdSession.screenPopSubject
     * ```
     */
    get screenPopSubject() {
        return this._screenPopSubject;
    }
    /**
     * @example -
     * ```
     * const popUrlSubject = agentSession.popUrlSubject
     * ```
     */
    get popUrlSubject() {
        return this._popUrlSubject;
    }
    /**
     * @example -
     * ```
     * const startGetNextEvents = agentSession.startGetNextEvents
     * ```
     */
    startGetNextEvents(sessionId) {
        if (this.isEventQueueResized) {
            this.adminService.resizeEventQueue(this.sessionId, false).then(() => {
                this.isEventQueueResized = false;
                this.logger.info('startGetNextEvents', 'Resized event queue');
            }, error => {
                this.logger.error('startGetNextEvents', 'Error while resizing event queue' + error.toString());
            });
        }
        GetNextEventProvider.instance.startGetNextEvents(sessionId);
    }
    /**
     * Method to terminate get-next polling worker
     * @example -
     * ```
     * const terminateGetNextPolling = agentSession.terminateGetNextPolling
     * ```
     */
    terminateGetNextPolling() {
        GetNextEventProvider.instance.terminateUtilWorker();
    }
    /**
     * Method to establish UIQueue socket connection
     * @param invokeSnapshot - flag to invoke snapshot request
     * @example -
     * ```
     * const establishUIQSocketConnection = agentSession.establishUIQSocketConnection(true)
     * ```
     */
    establishUIQSocketConnection(invokeSnapshot) {
        this.adminService.resizeEventQueue(this.sessionId, true)
            .then(() => {
            this.isEventQueueResized = true;
            UIQueueWsProvider.instance.connectAgent(this.userInfo, invokeSnapshot);
        }, error => {
            this.logger.error('establishUIQSocketConnection', 'Error while resizing event queue' + error.toString());
            this.startGetNextEvents();
        });
    }
    /**
     * Method to initiate adapter to handle events
     * @example -
     * ```
     * const getNextAdapter = agentSession.getNextAdapter
     * ```
     */
    getNextAdapter() {
        return new CXoneGetNextAdapter();
    }
    /**
     * Method to sessionId is valid or not
     * @example
     * ```
     * hasSessionId()
     * ```
     */
    get hasSessionId() {
        const sessionId = this.getSessionId();
        return sessionId ? true : false;
    }
    /**
     * @example -
     * ```
     * const agentAssistSubject  = acdSession.agentAssistSubject
     * ```
     */
    get agentAssistSubject() {
        return this._agentAssistSubject;
    }
    /**
     * @example -const agentAssistSubject  = acdSession.agentAssistSubject
     */
    get agentAssistSummarySubject() {
        return this._agentAssistSummarySubject;
    }
    /**
   * @example -const agentAssistWSSubject  = acdSession.agentAssistWSSubject
   */
    get agentAssistWSSubject() {
        return this._agentAssistWSSubject;
    }
    /**
     * @example -
     * ```
     * const onUpdateCallbacks  = agentSession.onUpdateCallbacks
     * ```
     */
    get onUpdateCommitments() {
        return this._onUpdateCommitments;
    }
    /**
     * @example -
     * ```
     * const onCommitmentEvent  = agentSession.onCommitmentEvent
     * ```
     */
    get onCommitmentEvent() {
        return this._onCommitmentEvent;
    }
    /**
     * @example -
     * ```
     * const onCommitmentStatusEvent  = agentSession.onCommitmentStatusEvent
     * ```
     */
    get onCommitmentStatusEvent() {
        return this._onCommitmentStatusEvent;
    }
    /**
    * @example -const agentAssistWebSocketUnsubscribeSubject  = acdSession.agentAssistWebSocketUnsubsribeSubject
    */
    get agentAssistWebSocketUnsubsribeSubject() {
        return this._onAgentAssistWebSocketUnsubscribe;
    }
    /**
     * @example -
     * ```
     * const agentAssistGetNextEventSubject  = acdSession.agentAssistGetNextEventSubject
     * ```
     */
    get agentAssistGetNextEventSubject() {
        return this._onAgentAssistGetNextEvent;
    }
    /**
    * @example -
    * ```
    * const customScreenpopSubject  = acdSession.customScreenpopSubject
    * ```
    */
    get customScreenpopSubject() {
        return this._customScreenpopSubject;
    }
}
//# sourceMappingURL=acd-session-manager.js.map