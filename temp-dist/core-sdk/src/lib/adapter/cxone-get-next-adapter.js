import { __awaiter } from "tslib";
import { GetNextEventType } from '../../enum/get-next-event-type';
import { CallContactEventYup, MuteEvent, UpdatePermissionsEvent, AgentSessionEndEvent, AgentSessionStartEvent, CXoneIndicator, AgentStateEvent, UpdateUnavailableCodeEvent, AgentLegEvent, DigitalContactEvent, CXonePageOpen, CXoneRunApp, AgentSessionStatus, MCHSetting, CXonePopUrl, AgentWorkflowResponseEvent, AgentWorkflowRequestEvent, VoiceMailContactEventYup, CXoneAgentAssist, CommitmentEvent, VoiceMailPlayBackEventYup, CommitmentStatusEvent, UpdateNetworkTimeoutEvent, WorkItemContactEventYup, CoBrowseEvent, parseBooleanString, MediaType, MediaTypeId, CXoneCustomScreenpop, } from '@nice-devone/common-sdk';
import { ACDSessionManager } from '../agent/session/acd-session-manager';
import { GetNextEventProvider, UIQueueWsProvider } from '../agent';
import { LocalStorageHelper } from '../../util/storage-helper-local';
import { StorageKeys } from '../../constants/storage-key';
import { AcdCustomEventName } from '../../enum/acd-custom-event-name';
import { Logger } from '../../logger/logger';
import { CallContactEventStatus } from '../../enum/call-contact-event-status';
/**
 * This class will handle all the get next event response according to event type
 */
export class CXoneGetNextAdapter {
    constructor() {
        this.agentSession = ACDSessionManager.instance;
        // TODO: used to enable or disable agent assist app
        this.isAgentAssistAppEnabled = true;
        this.logger = new Logger('cxone-get-next-adapter', 'GetNextAdapter');
    }
    /**
     * Used to re route the get next response based on the different event types and returns the array of processed object
     * @param events- array of get next response with different event type
     * @example
     */
    handleGetNextResponse(events) {
        this.agentSession.onGetNextEvent.next(events);
        const sessionStartEventIndex = events.findIndex(event => event.Type === GetNextEventType.AGENT_SESSION_START_EVENT);
        if (sessionStartEventIndex !== -1 && sessionStartEventIndex !== 0) {
            const sessionStartEventObj = Object.assign({}, events[sessionStartEventIndex]);
            events.splice(sessionStartEventIndex, 1);
            events.splice(0, 0, sessionStartEventObj);
        }
        events.forEach((event) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
            switch ((event === null || event === void 0 ? void 0 : event.Type) || (event === null || event === void 0 ? void 0 : event.type)) {
                case GetNextEventType.CALL_CONTACT_EVENT: {
                    const callContactEvent = CallContactEventYup.cast(event);
                    if (callContactEvent.status === CallContactEventStatus.DISCONNECTED) {
                        const agentAssistEvent = new CXoneAgentAssist(event);
                        this.agentSession.agentAssistWebSocketUnsubsribeSubject.next(callContactEvent.contactId.toString());
                        this.agentSession.agentAssistGetNextEventSubject.next(agentAssistEvent);
                    }
                    this.agentSession.callContactEventSubject.next(callContactEvent);
                    this.agentSession.onContactEvent.next(event);
                    break;
                }
                case GetNextEventType.VOICEMAIL_CONTACT_EVENT: {
                    const voiceMailContactEvent = VoiceMailContactEventYup.cast(event);
                    this.agentSession.voiceMailContactEventSubject.next(voiceMailContactEvent);
                    this.agentSession.onContactEvent.next(event);
                    break;
                }
                case GetNextEventType.WORKITEM_CONTACT_EVENT: {
                    const WorkItemContactEvent = WorkItemContactEventYup.cast(event);
                    this.agentSession.workItemContactEventSubject.next(WorkItemContactEvent);
                    this.agentSession.onContactEvent.next(event);
                    break;
                }
                case GetNextEventType.MUTE_EVENT: {
                    const muteEvent = new MuteEvent();
                    muteEvent.parse(event);
                    this.agentSession.muteEventSubject.next(muteEvent);
                    break;
                }
                case GetNextEventType.UPDATE_PERMISSIONS_EVENT: {
                    const updatePermissions = new UpdatePermissionsEvent();
                    updatePermissions.parse(event);
                    this.agentSession.updatePermissionsEventSubject.next(updatePermissions);
                    break;
                }
                case GetNextEventType.AGENT_SESSION_START_EVENT: {
                    const agentSessionStartEvent = new AgentSessionStartEvent();
                    agentSessionStartEvent.parse(event);
                    this.agentSession.onAgentSessionChange.next({
                        status: AgentSessionStatus.SESSION_START,
                        data: agentSessionStartEvent,
                    });
                    // whenever session start execute updateMessageEvent to get message notifications
                    this.agentSession.updateMessageEvent.next({});
                    break;
                }
                case GetNextEventType.AGENT_SESSION_END_EVENT:
                case GetNextEventType.REMOTE_AGENT_SESSION_END_EVENT: {
                    const agentSessionEndEvent = new AgentSessionEndEvent();
                    agentSessionEndEvent.parse(event);
                    // stop polling and clear new session id provided by end session event
                    GetNextEventProvider.instance.terminateUtilWorker();
                    LocalStorageHelper.removeItem(StorageKeys.ACD_SESSION_ID);
                    this.agentSession.setSessionId('');
                    if (UIQueueWsProvider.instance instanceof UIQueueWsProvider) {
                        UIQueueWsProvider.instance.disconnectConsumerAgent();
                    }
                    this.agentSession.onAgentSessionChange.next({
                        status: AgentSessionStatus.SESSION_END,
                        data: agentSessionEndEvent,
                    });
                    break;
                }
                case GetNextEventType.AGENT_STATE_EVENT: {
                    const agentStateEvent = new AgentStateEvent();
                    agentStateEvent.parse(event);
                    this.agentSession.agentStateSubject.next(agentStateEvent);
                    break;
                }
                case GetNextEventType.UPDATE_UNAVAILABLE_CODE_EVENT: {
                    const unavailableCodeEvent = new UpdateUnavailableCodeEvent();
                    unavailableCodeEvent.parse(event);
                    this.agentSession.agentUpdateUnavailableCodeSubject.next(unavailableCodeEvent);
                    break;
                }
                case GetNextEventType.AGENT_LEG_EVENT: {
                    const agentLegEvent = new AgentLegEvent();
                    agentLegEvent.parse(event);
                    this.agentSession.agentLegSubject.next(agentLegEvent);
                    break;
                }
                case GetNextEventType.UPDATE_INDICATORS:
                    this.agentSession.agentIndicatorsSubject.next({});
                    break;
                case GetNextEventType.INDICATOR: {
                    const indicator = new CXoneIndicator();
                    indicator.parse(event);
                    this.agentSession.contactIndicatorsSubject.next(indicator);
                    break;
                }
                case GetNextEventType.PAGEOPEN: {
                    const pageOpen = new CXonePageOpen();
                    pageOpen.parse(event);
                    this.agentSession.pageOpenSubject.next(pageOpen);
                    break;
                }
                case GetNextEventType.RUNAPP: {
                    const runApp = new CXoneRunApp();
                    runApp.parse(event);
                    this.agentSession.runAppSubject.next(runApp);
                    break;
                }
                case GetNextEventType.DIGITAL_CONTACT_EVENT: {
                    const digitalContactEvent = new DigitalContactEvent();
                    digitalContactEvent.parse(event);
                    const timeDifferenceinSec = (new Date().getTime() - ((_a = digitalContactEvent.startTime) === null || _a === void 0 ? void 0 : _a.getTime())) / 1000 || 0;
                    if (!(((_b = digitalContactEvent.status) === null || _b === void 0 ? void 0 : _b.toLowerCase()) === 'incoming' && timeDifferenceinSec > 45)) {
                        this.agentSession.digitalContactSubject.next(digitalContactEvent);
                    }
                    break;
                }
                case GetNextEventType.MCH_AGENT_SETTINGS_CHANGE_EVENT: {
                    const mchAgentSettingsChangeEvent = new MCHSetting();
                    mchAgentSettingsChangeEvent.parse(event);
                    this.agentSession.mchAgentSettingsChangeEvent.next(mchAgentSettingsChangeEvent);
                    break;
                }
                case GetNextEventType.UPDATE_AGENT_MESSAGE: {
                    this.agentSession.updateMessageEvent.next({});
                    break;
                }
                case GetNextEventType.POPURL: {
                    const popUrl = new CXonePopUrl();
                    popUrl.parse(event);
                    this.agentSession.popUrlSubject.next(popUrl);
                    break;
                }
                case GetNextEventType.UPDATE_DIALER_CAMPAIGN:
                case GetNextEventType.UPDATE_AGENT_SKILLS: {
                    this.agentSession.updateSkillsEvent.next({});
                    break;
                }
                case GetNextEventType.CUSTOM_EVENT: {
                    if (((event === null || event === void 0 ? void 0 : event.eventName) === AcdCustomEventName.AGENT_WORKFLOW_RESPONSE
                        || (event === null || event === void 0 ? void 0 : event.eventName) === AcdCustomEventName.AGENT_WORKFLOW_REQUEST
                        || (event === null || event === void 0 ? void 0 : event.eventName) === AcdCustomEventName.AGENT_WORKFLOW_CREATE_PAYLOAD)
                        && (event === null || event === void 0 ? void 0 : event.data)) {
                        let parsedEventData;
                        try {
                            parsedEventData = JSON.parse(event === null || event === void 0 ? void 0 : event.data);
                        }
                        catch (error) {
                            this.logger.error('handleGetNextResponse', 'Failed in Custom Event Parsing' + error);
                        }
                        if ((event === null || event === void 0 ? void 0 : event.eventName) === AcdCustomEventName.AGENT_WORKFLOW_RESPONSE && (event === null || event === void 0 ? void 0 : event.data)) {
                            const agentWorkflowResponseEvent = new AgentWorkflowResponseEvent();
                            agentWorkflowResponseEvent.parse(parsedEventData);
                            this.agentSession.agentWorkflowEvent.next(agentWorkflowResponseEvent);
                        }
                        if ((event === null || event === void 0 ? void 0 : event.eventName) === AcdCustomEventName.AGENT_WORKFLOW_REQUEST) {
                            const agentWorkflowEvent = new AgentWorkflowRequestEvent();
                            agentWorkflowEvent.parse(parsedEventData);
                            this.agentSession.agentWorkflowRequestEvent.next(agentWorkflowEvent);
                        }
                        if ((event === null || event === void 0 ? void 0 : event.eventName) === AcdCustomEventName.AGENT_WORKFLOW_CREATE_PAYLOAD) {
                            this.agentSession.agentWorkflowCreatePayloadEvent.next(event === null || event === void 0 ? void 0 : event.data);
                        }
                    }
                    if (event === null || event === void 0 ? void 0 : event.data) {
                        let parsedCustomEventData;
                        try {
                            parsedCustomEventData = JSON.parse(event.data);
                        }
                        catch (error) {
                            this.logger.error('handleGetNextResponse', 'Failed in Custom Event Parsing' + error);
                        }
                        const { eventName } = event;
                        const isNotPredefinedCustomEvent = !eventName || !Object.values(AcdCustomEventName).includes(eventName);
                        if (isNotPredefinedCustomEvent) {
                            this.agentSession.onAgentCustomEvent.next(parsedCustomEventData);
                        }
                    }
                    if ((((_c = event === null || event === void 0 ? void 0 : event.data) === null || _c === void 0 ? void 0 : _c.includes('https://app.surfly')) && ((_d = event === null || event === void 0 ? void 0 : event.data) === null || _d === void 0 ? void 0 : _d.includes('agent_token='))) ||
                        (((_e = event === null || event === void 0 ? void 0 : event.Data) === null || _e === void 0 ? void 0 : _e.includes('https://app.surfly')) && ((_f = event === null || event === void 0 ? void 0 : event.Data) === null || _f === void 0 ? void 0 : _f.includes('agent_token=')))) {
                        const coBrowseEvent = new CoBrowseEvent();
                        coBrowseEvent.parse(event);
                        this.agentSession.coBrowseEvent.next(coBrowseEvent);
                    }
                    if ((event === null || event === void 0 ? void 0 : event.eventName) === AcdCustomEventName.AGENT_SCREENPOP_CUSTOMSETTINGS && (event === null || event === void 0 ? void 0 : event.data)) {
                        let parsedCustomScreenpopData;
                        try {
                            parsedCustomScreenpopData = JSON.parse(event === null || event === void 0 ? void 0 : event.data);
                        }
                        catch (error) {
                            this.logger.error('handleCustomScreenGetNextResponse', 'Failed in Screenpop Custom Event Parsing' + error);
                        }
                        const customScreenpopEvent = new CXoneCustomScreenpop();
                        customScreenpopEvent.parse(parsedCustomScreenpopData);
                        this.agentSession.customScreenpopSubject.next(customScreenpopEvent);
                    }
                    if ((event === null || event === void 0 ? void 0 : event.eventName) === AcdCustomEventName.AGENT_LOCAL_POST && (event === null || event === void 0 ? void 0 : event.data)) {
                        let customData;
                        try {
                            customData = JSON.parse(event === null || event === void 0 ? void 0 : event.data);
                        }
                        catch (error) {
                            this.logger.error('handleGetNextResponse', 'Failed in Localpost Custom Event Parsing' + error);
                        }
                        if (customData) {
                            this.agentSession.localPostEvent.next(customData);
                        }
                    }
                    break;
                }
                case GetNextEventType.AGENT_WORKFLOW_CONFIGURATION: {
                    const agentWorkflowConfigurationEvent = new AgentWorkflowRequestEvent();
                    agentWorkflowConfigurationEvent.parse(event);
                    this.agentSession.agentWorkflowRequestEvent.next(agentWorkflowConfigurationEvent);
                    break;
                }
                case GetNextEventType.AGENT_ASSIST: {
                    const agentAssistJson = JSON.parse((event === null || event === void 0 ? void 0 : event.AgentAssistAppConfigJson) || '{}');
                    const contactId = event.ContactId;
                    if (agentAssistJson && ((_g = agentAssistJson === null || agentAssistJson === void 0 ? void 0 : agentAssistJson.Params) === null || _g === void 0 ? void 0 : _g.providerId) === 'AutoSummary') {
                        if ((agentAssistJson === null || agentAssistJson === void 0 ? void 0 : agentAssistJson.MediaType) && parseInt(agentAssistJson === null || agentAssistJson === void 0 ? void 0 : agentAssistJson.MediaType) === MediaTypeId.Digital) {
                            const autoSummaryStart = {
                                webSocketUri: agentAssistJson.WebSocketUri,
                                contactId: event === null || event === void 0 ? void 0 : event.ContactId,
                                subscriptions: [],
                                mediaType: MediaType.DIGITAL,
                                agentAssistType: 'auto-summary',
                            };
                            this.agentSession.agentAssistSummarySubject.next(autoSummaryStart);
                            break;
                        }
                        else {
                            const contactId = event.ContactId;
                            if (typeof contactId === 'string' &&
                                typeof agentAssistJson.WebSocketUri === 'string' &&
                                agentAssistJson.WebSocketUri !== '') {
                                const autoSummaryStart = {
                                    webSocketUri: agentAssistJson.WebSocketUri,
                                    contactId,
                                    subscriptions: agentAssistJson.Subscriptions,
                                    mediaType: MediaType.VOICE,
                                    agentAssistType: 'auto-summary',
                                };
                                this.agentSession.agentAssistSummarySubject.next(autoSummaryStart);
                            }
                            break;
                        }
                    }
                    else if (agentAssistJson && (((_h = agentAssistJson === null || agentAssistJson === void 0 ? void 0 : agentAssistJson.Params) === null || _h === void 0 ? void 0 : _h.providerId.includes('nuance-voice-bio')) || ((_j = agentAssistJson === null || agentAssistJson === void 0 ? void 0 : agentAssistJson.Params) === null || _j === void 0 ? void 0 : _j.providerId.includes('enlighten-autopilot-voice-bio')))) {
                        const autoSummaryStart = {
                            webSocketUri: agentAssistJson.WebSocketUri,
                            contactId,
                            subscriptions: agentAssistJson.Subscriptions,
                            mediaType: MediaType.VOICE,
                            agentAssistType: 'voice-bio-hub',
                            providerId: (_k = agentAssistJson === null || agentAssistJson === void 0 ? void 0 : agentAssistJson.Params) === null || _k === void 0 ? void 0 : _k.providerId,
                            profileName: agentAssistJson.Params.voiceBiometricProfileName,
                            customerId: agentAssistJson.Params.customerId,
                        };
                        this.agentSession.agentAssistSummarySubject.next(autoSummaryStart);
                        break;
                    }
                    const agentAssistEvent = new CXoneAgentAssist(event);
                    this.agentSession.agentAssistGetNextEventSubject.next(agentAssistEvent);
                    break;
                }
                case GetNextEventType.UPDATE_CALLBACKS: {
                    this.agentSession.onUpdateCommitments.next({});
                    break;
                }
                case GetNextEventType.PROMISE_KEEPER: {
                    const commitmentEvent = new CommitmentEvent();
                    commitmentEvent.parse(event);
                    this.agentSession.onCommitmentEvent.next(commitmentEvent);
                    break;
                }
                case GetNextEventType.PROMISE_KEEPER_STATUS: {
                    const commitmentStatusEvent = new CommitmentStatusEvent();
                    commitmentStatusEvent.parse(event);
                    this.agentSession.onCommitmentStatusEvent.next(commitmentStatusEvent);
                    break;
                }
                case GetNextEventType.NETWORK_OFFLINE_EVENT: {
                    const offlineEvent = new UpdateNetworkTimeoutEvent();
                    offlineEvent.parseData(event);
                    this.agentSession.networkOfflineSubject.next(offlineEvent);
                    break;
                }
                case GetNextEventType.VOICEMAIL_PLAY_BACK: {
                    const voiceMailPlayBackEvent = VoiceMailPlayBackEventYup.cast(event);
                    this.agentSession.voiceMailPlayBackEventSubject.next(voiceMailPlayBackEvent);
                    break;
                }
                case GetNextEventType.NATURAL_CALLING_SKILL_LIST: {
                    this.agentSession.naturalCallingSkillListEvent.next(!!(event === null || event === void 0 ? void 0 : event.Empty));
                    break;
                }
                case GetNextEventType.CONFERENCE: {
                    this.agentSession.conferenceCallEvent.next(event.ConferenceNo);
                    break;
                }
                case GetNextEventType.HOURS_OF_OPERATION: {
                    const showContinueReskill = parseBooleanString(event.ShowContinueReskill);
                    if (showContinueReskill) {
                        this.agentSession.hoursOfOperationEvent.next(event);
                    }
                    break;
                }
            }
        }));
    }
}
//# sourceMappingURL=cxone-get-next-adapter.js.map