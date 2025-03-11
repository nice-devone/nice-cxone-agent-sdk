import { HttpUtilService } from '../../http/index';
import { Logger } from '../../../logger/logger';
import { CXoneIndicator, CustomFormData, StartSessionRequest, CXonePageOpen, CXoneRunApp, CXoneSdkError, HttpResponse, EndSessionRequest, AgentSessionResponse, MCHSetting, CXonePopUrl, CXoneContactScreenpop, AgentWorkflowResponseEvent, AgentWorkflowRequestEvent, UserInfo, CXoneAgentAssist, CommitmentEvent, CommitmentStatusEvent, CoBrowseEvent, AgentAssistWSRequest, MuteEvent, UpdatePermissionsEvent, AgentStateEvent, UpdateUnavailableCodeEvent, AgentLegEvent, DigitalContactEvent, CXoneConfiguration, UpdateNetworkTimeoutEvent, CXoneCustomScreenpop, GetNextAgentAssistEvent } from '@nice-devone/common-sdk';
import { Subject, ReplaySubject } from 'rxjs';
import { CXoneGetNextAdapter } from '../../adapter/cxone-get-next-adapter';
/**
 * Utility for agent session management
 */
export declare class ACDSessionManager {
    protected logger: Logger;
    protected utilService: HttpUtilService;
    private adminService;
    private sessionId;
    private _callContactEventSubject;
    private _voiceMailContactEventSubject;
    private _workItemContactEventSubject;
    private _muteEventSubject;
    private _updatePermissionsEventSubject;
    private _onNetworkTimeOutEventSubject;
    private _onAgentSessionChange;
    private _agentStateSubject;
    private _agentUnavailableCodeSubject;
    private _agentLegSubject;
    private _agentIndicatorsSubject;
    private _contactIndicatorsSubject;
    private _digitalContactSubject;
    private _pageOpenSubject;
    private _runAppSubject;
    private _updateMessageEvent;
    private _mchAgentSettingChangeEvent;
    private _updateSkillsEvent;
    private _screenPopSubject;
    private _popUrlSubject;
    private _agentWorkflowEvent;
    private _agentWorkflowRequestEvent;
    private _agentWorkflowCreatePayloadEvent;
    private _coBrowseEvent;
    private static singleton;
    userInfo: UserInfo;
    cxOneConfig: CXoneConfiguration;
    accessToken: string;
    private _agentAssistSubject;
    private _onUpdateCommitments;
    private _onCommitmentEvent;
    private _onCommitmentStatusEvent;
    private _agentAssistSummarySubject;
    private _agentAssistWSSubject;
    private _voiceMailPlayBackSubject;
    private _onNaturalCallingSkillListEvent;
    private _onConferenceEvent;
    private _onHoursOfOperationEvent;
    private _onAgentAssistWebSocketUnsubscribe;
    private _onAgentAssistGetNextEvent;
    private _customScreenpopSubject;
    private _onGetNextEventSubject;
    private _contactEventSubject;
    private _answerEvent;
    private _rejectEvent;
    private _callControlEvent;
    private isEventQueueResized;
    /**
     * @example
     * ```
     * const acdSessionManager = new ACDSessionManager();
     * ```
     */
    constructor();
    /**
     * @example -
     * ```
     * const onGetNextEvent = acdSession.onGetNextEvent
     * ```
     */
    get onGetNextEvent(): Subject<{
        [key: string]: string;
    }[]>;
    /**
     * @example -
     * ```
     * const onContactEvent = acdSession.onContactEvent
     * ```
     */
    get onContactEvent(): Subject<{
        [key: string]: any;
    }>;
    /**
     * @example -
     * ```
     * const answerEvent = acdSession.answerEvent
     * ```
     */
    get answerEvent(): Subject<MessageEvent<any>>;
    /**
     * @example -
     * ```
     * const rejectEvent = acdSession.rejectEvent
     * ```
     */
    get rejectEvent(): Subject<MessageEvent<any>>;
    /**
     * @example -
     * ```
     * const callControlEvent = acdSession.callControlEvent
     * ```
     */
    get callControlEvent(): Subject<string>;
    /**
     * @example -
     * ```
     * const callContactEventSubject  = acdSession.callContactEventSubject
     * ```
     */
    get callContactEventSubject(): Subject<import("yup/lib/object").AssertsShape<{
        contactId: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        masterId: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        status: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        originalState: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
        callType: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        dnis: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        ani: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        skill: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        isInbound: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
        startTimeUtc: import("yup/lib/date").RequiredDateSchema<Date, import("yup/lib/types").AnyObject>;
        startTime: import("yup/lib/date").RequiredDateSchema<Date, import("yup/lib/types").AnyObject>;
        lastStateChangeTimeUtc: import("yup/lib/date").RequiredDateSchema<Date, import("yup/lib/types").AnyObject>;
        lastStateChangeTime: import("yup/lib/date").RequiredDateSchema<Date, import("yup/lib/types").AnyObject>;
        screenPopUrl: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        screenPopUrlVariables: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
        disconnectCode: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        isLogging: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
        timeout: import("yup/lib/number").RequiredNumberSchema<number, import("yup/lib/types").AnyObject>;
        allowDispositions: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
        label: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        isLinked: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
        timeZones: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        finalState: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
        otherInformation: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        otherInformationNewFormat: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        blendingToSkillName: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        deliveryType: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        customData: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        complianceRecord: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
        confirmationRequired: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
        parentContactId: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        omniGroupId: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        externalId: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        ansMachineOverride: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        ansMachineOverrideEndTime: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        interactionId: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        customerCardUrl: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        isRequireManualAccept: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    }>>;
    /**
     * @example -
     * ```
     * const voiceMailContactEventSubject  = acdSession.voiceMailContactEventSubject
     * ```
     */
    get voiceMailContactEventSubject(): Subject<import("yup/lib/object").AssertsShape<{
        contactId: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        createdDate: import("yup/lib/date").RequiredDateSchema<Date, import("yup/lib/types").AnyObject>;
        customData: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        fileDuration: import("yup/lib/number").RequiredNumberSchema<number, import("yup/lib/types").AnyObject>;
        fileName: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        finalState: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
        from: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        isInbound: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
        label: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        lastStateChangeTime: import("yup/lib/date").RequiredDateSchema<Date, import("yup/lib/types").AnyObject>;
        masterID: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        omniGroupId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        parentContactId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        requireDisposition: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        screenPopUrl: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        skill: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        skillName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        startTime: import("yup/lib/date").RequiredDateSchema<Date, import("yup/lib/types").AnyObject>;
        status: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        to: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        type: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        voiceMailType: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    }>>;
    /**
     * @example -
     * ```
     * const workitemContactEventSubject = acdSession.workitemContactEventSubject
     * ```
     */
    get workItemContactEventSubject(): Subject<import("yup/lib/object").AssertsShape<{
        agentId: import("yup/lib/number").RequiredNumberSchema<number, import("yup/lib/types").AnyObject>;
        contactId: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        customData: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        closePopoutUponTermination: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        finalState: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
        iisHost: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        inFocus: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        lastStateChangeTime: import("yup/lib/date").RequiredDateSchema<Date, import("yup/lib/types").AnyObject>;
        lastStateChangeTimeUtc: import("yup/lib/date").RequiredDateSchema<Date, import("yup/lib/types").AnyObject>;
        masterId: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        omniGroupId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        parenContactId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        popDestination: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        popoutWindowHeight: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
        popoutWindowWidth: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
        refusalTimeout: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
        screenPopUrl: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        skillId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        startTime: import("yup/lib/date").RequiredDateSchema<Date, import("yup/lib/types").AnyObject>;
        startTimeUtc: import("yup/lib/date").RequiredDateSchema<Date, import("yup/lib/types").AnyObject>;
        status: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        tabTitle: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        url: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        vcHost: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        workItemId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        workItemPayload: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        workItemType: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        sessionId: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    }>>;
    /**
     * @example -
     * ```
     * const voiceMailPlayBackEventSubject  = acdSession.voiceMailPlayBackEventSubject
     * ```
     */
    get voiceMailPlayBackEventSubject(): Subject<import("yup/lib/object").AssertsShape<{
        contactId: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        playBackPaused: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
        playBackPosition: import("yup/lib/number").RequiredNumberSchema<number, import("yup/lib/types").AnyObject>;
        type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        iisHost: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        vcHost: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    }>>;
    /**
     * @example -
     * ```
     * const muteEventSubject = acdSession.muteEventSubject
     * ```
     */
    get muteEventSubject(): Subject<MuteEvent>;
    /**
     * @example -
     * ```
     * const networkOfflineSubject = acdSession.networkOfflineEventSubject
     * ```
     */
    get networkOfflineSubject(): Subject<UpdateNetworkTimeoutEvent>;
    /**
     * @example -
     * ```
     * const updatePermissionsEventSubject = acdSession.updatePermissionsEventSubject
     * ```
     */
    get updatePermissionsEventSubject(): Subject<UpdatePermissionsEvent>;
    /**
     * @example
     * ```
     * const agentState = acdSession.agentStateSubject
     * ```
     */
    get agentStateSubject(): Subject<AgentStateEvent>;
    /**
     * @example
     * ```
     * const updateUnavailableCode = acdSession.agentUpdateUnavailableCodeSubject
     * ```
     */
    get agentUpdateUnavailableCodeSubject(): Subject<UpdateUnavailableCodeEvent>;
    /**
     * @example -
     * ```
     * const agentSessionChange = acdSession.onAgentSessionChange
     * ```
     */
    get onAgentSessionChange(): Subject<AgentSessionResponse>;
    /**
     * @example -
     * ```
     * const agentLegSubject = acdSession.agentLegSubject
     * ```
     */
    get agentLegSubject(): Subject<AgentLegEvent>;
    /**
     * @example -
     * ```
     * const agentIndicatorsSubject = acdSession.agentIndicatorsSubject
     * ```
     */
    get agentIndicatorsSubject(): Subject<unknown>;
    /**
     * @example -
     * ```
     * const contactIndicatorsSubject = acdSession.contactIndicatorsSubject
     * ```
     */
    get contactIndicatorsSubject(): Subject<CXoneIndicator>;
    /**
     * @example -
     * ```
     * const digitalContactSubject = agentSession.digitalContactSubject
     * ```
     */
    get digitalContactSubject(): Subject<DigitalContactEvent>;
    /**
     * @example -
     * ```
     * const pageOpenSubject = agentSession.pageOpenSubject
     * ```
     */
    get pageOpenSubject(): Subject<CXonePageOpen>;
    /**
     * @example -
     * ```
     * const runAppSubject = agentSession.runAppSubject
     * ```
     */
    get runAppSubject(): Subject<CXoneRunApp>;
    /**
     * @example -
     * ```
     * const updateMessageEvent = acdSession.updateMessageEvent
     * ```
     */
    get updateMessageEvent(): Subject<unknown>;
    /**
     * @example -
     * ```
     * const coBrowseEvent = acdSession.coBrowseEvent
     * ```
     */
    get coBrowseEvent(): Subject<CoBrowseEvent>;
    /**
     * @example -
     * ```
     * const mchAgentSettingsChangeEvent = agentSession.mchAgentSettingsChangeEvent
     * ```
     */
    get mchAgentSettingsChangeEvent(): Subject<MCHSetting>;
    /**
     * @example -
     * ```
     * const updateSkillsEvent = agentSession.updateSkillsEvent
     * ```
     */
    get updateSkillsEvent(): Subject<unknown>;
    /**
     * Used to get the agent workflow event subject
     * @example -
     * ```
     * const _agentWorkflowEvent = agentSession.agentWorkflowEvent
     * ```
     */
    get agentWorkflowEvent(): Subject<AgentWorkflowResponseEvent>;
    /**
     * Used to get the agent workflow event subject
     * @example -
     * ```
     * const agentWorkflowRequestEvent = agentSession.agentWorkflowRequestEvent
     * ```
     */
    get agentWorkflowRequestEvent(): Subject<AgentWorkflowRequestEvent>;
    /**
    * Used to get the agent workflow event subject
    * @example -
    * ```
    * const agentWorkflowCreatePayloadEvent = agentSession.agentWorkflowCreatePayloadEvent
    * ```
    */
    get agentWorkflowCreatePayloadEvent(): Subject<string>;
    /**
     * @example -
     * ```
     * const naturalCallingSkillListEvent = acdSession.naturalCallingSkillListEvent
     * ```
     */
    get naturalCallingSkillListEvent(): Subject<boolean>;
    /**
     * @example -
     * ```
     * const conferenceCallEvent = acdSession.conferenceCallEvent
     * ```
     */
    get conferenceCallEvent(): Subject<string>;
    /**
     * @example -
     * ```
     * const hoursOfOperationEvent = acdSession.hoursOfOperationEvent
     * ```
     */
    get hoursOfOperationEvent(): Subject<unknown>;
    /**
     * Method to create singleton object of the class
     * @example
     * ```
     * const agentSession = ACDSessionManager.instance;
     * ```
     */
    static get instance(): ACDSessionManager;
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
    initialize(accessToken: string, config: CXoneConfiguration, userInfo: UserInfo): void;
    /**
     * @param accessToken - access token
     * @example
     * ```
     * this.setAccessToken(accessToken);
     * ```
     */
    setAccessToken(accessToken: string): void;
    /**
     * Method to switch between Uiq and get-next polling
     * @param invokeSnapshot - Flag to receive to snapshot
     * @param sessionId - session id
     * @example
     * ```
     * this.toggleAgentEventsReceivingMethod(invokeSnapshot, sessionId)
     * ```
     */
    toggleAgentEventsReceivingMethod({ invokeSnapshot, sessionId, isUIQueueEnabled: isUIQueueTMToggleEnabled }: {
        invokeSnapshot?: boolean;
        sessionId?: string;
        isUIQueueEnabled?: boolean;
    }): void;
    /**
     * Method to start session for an agent
     * @param startSessionRequest - Object of type StartSessionRequest.
     * @returns - response from the start agent session api
     * @example
     * ```
     * const startAgentSession = this.startSession(startSessionRequest)
     * ```
     */
    startSession(startSessionRequest: StartSessionRequest, isUIQueueEnabled?: boolean): Promise<HttpResponse | CXoneSdkError>;
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
    joinSession(options?: {
        agentId?: number;
        isUIQueueEnabled?: boolean;
    }): Promise<HttpResponse | CXoneSdkError>;
    /**
     * Method to end an agent session
     * @param endSessionRequest - object with boolean for forceLogoff, endContacts and ignorePersonalQueue
     * @returns - response to end session of an agent
     * @example
     * ```
     * const angentEndSession = this.endSession(endSessionRequest);
     * ```
     */
    endSession(endSessionRequest: EndSessionRequest): Promise<HttpResponse | CXoneSdkError>;
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
    postCustomFormData: (contactId: string, customFormData: CustomFormData) => Promise<HttpResponse | CXoneSdkError>;
    /**
     *
     * @returns - agent session id
     * @example
     * ```
     * const agentSessionId = this.getSessionId();
     * ```
     */
    getSessionId(): string;
    /**
     *
     * @param value - updatedSessionId
     * @example
     * ```
     * this.setSessionId('SHRxbEd2ZkFyN');
     * ```
     */
    setSessionId(value: string): void;
    /**
     * @example -
     * ```
     * const screenPopSubject  = acdSession.screenPopSubject
     * ```
     */
    get screenPopSubject(): Subject<CXoneContactScreenpop>;
    /**
     * @example -
     * ```
     * const popUrlSubject = agentSession.popUrlSubject
     * ```
     */
    get popUrlSubject(): Subject<CXonePopUrl>;
    /**
     * @example -
     * ```
     * const startGetNextEvents = agentSession.startGetNextEvents
     * ```
     */
    startGetNextEvents(sessionId?: string): void;
    /**
     * Method to terminate get-next polling worker
     * @example -
     * ```
     * const terminateGetNextPolling = agentSession.terminateGetNextPolling
     * ```
     */
    terminateGetNextPolling(): void;
    /**
     * Method to establish UIQueue socket connection
     * @param invokeSnapshot - flag to invoke snapshot request
     * @example -
     * ```
     * const establishUIQSocketConnection = agentSession.establishUIQSocketConnection(true)
     * ```
     */
    establishUIQSocketConnection(invokeSnapshot?: boolean): void;
    /**
     * Method to initiate adapter to handle events
     * @example -
     * ```
     * const getNextAdapter = agentSession.getNextAdapter
     * ```
     */
    getNextAdapter(): CXoneGetNextAdapter;
    /**
     * Method to sessionId is valid or not
     * @example
     * ```
     * hasSessionId()
     * ```
     */
    get hasSessionId(): boolean;
    /**
     * @example -
     * ```
     * const agentAssistSubject  = acdSession.agentAssistSubject
     * ```
     */
    get agentAssistSubject(): Subject<CXoneAgentAssist>;
    /**
     * @example -const agentAssistSubject  = acdSession.agentAssistSubject
     */
    get agentAssistSummarySubject(): Subject<GetNextAgentAssistEvent>;
    /**
   * @example -const agentAssistWSSubject  = acdSession.agentAssistWSSubject
   */
    get agentAssistWSSubject(): ReplaySubject<AgentAssistWSRequest>;
    /**
     * @example -
     * ```
     * const onUpdateCallbacks  = agentSession.onUpdateCallbacks
     * ```
     */
    get onUpdateCommitments(): Subject<unknown>;
    /**
     * @example -
     * ```
     * const onCommitmentEvent  = agentSession.onCommitmentEvent
     * ```
     */
    get onCommitmentEvent(): Subject<CommitmentEvent>;
    /**
     * @example -
     * ```
     * const onCommitmentStatusEvent  = agentSession.onCommitmentStatusEvent
     * ```
     */
    get onCommitmentStatusEvent(): Subject<CommitmentStatusEvent>;
    /**
    * @example -const agentAssistWebSocketUnsubscribeSubject  = acdSession.agentAssistWebSocketUnsubsribeSubject
    */
    get agentAssistWebSocketUnsubsribeSubject(): Subject<string>;
    /**
     * @example -
     * ```
     * const agentAssistGetNextEventSubject  = acdSession.agentAssistGetNextEventSubject
     * ```
     */
    get agentAssistGetNextEventSubject(): Subject<CXoneAgentAssist>;
    /**
    * @example -
    * ```
    * const customScreenpopSubject  = acdSession.customScreenpopSubject
    * ```
    */
    get customScreenpopSubject(): Subject<CXoneCustomScreenpop>;
}
