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
import { Subject } from 'rxjs';
import { FeatureToggleService } from '../../util/feature-toggle-services';
/**
 * This class will handle all the get next event response according to event type
 */
export class CXoneGetNextAdapter {
    constructor() {
        this.agentSession = ACDSessionManager.instance;
        /**
         * Subject to emit renew state events with contact IDs
         * Subscribed to by ContactManager to handle stuck contacts
         */
        this.renewStateRequested = new Subject();
        // TODO: used to enable or disable agent assist app
        this.isAgentAssistAppEnabled = true;
        this.logger = new Logger('cxone-get-next-adapter', 'GetNextAdapter');
    }
    /**
     * Used to re route the get next response based on the different event types and returns the array of processed object
     * @param events- array of get next response with different event type
     * @example
     */
    handleGetNextResponse(events, icBranchValue) {
        const isRenewStateToggleEnabled = FeatureToggleService.instance.getFeatureToggleSync("release-renew-state-AW-48481" /* FeatureToggles.RENEW_STATE_FEATURE_TOGGLE */);
        if (icBranchValue === '3' && isRenewStateToggleEnabled) {
            const contactIds = [];
            // Loop through all events and capture ACD contact IDs from contact events only
            events.forEach((event) => {
                const eventType = (event === null || event === void 0 ? void 0 : event.Type) || (event === null || event === void 0 ? void 0 : event.type);
                // Only process contact events
                if (eventType === GetNextEventType.CALL_CONTACT_EVENT) {
                    const contactEvent = CallContactEventYup.cast(event);
                    if (contactEvent === null || contactEvent === void 0 ? void 0 : contactEvent.contactId) {
                        contactIds.push(contactEvent.contactId.toString());
                    }
                }
                else if (eventType === GetNextEventType.WORKITEM_CONTACT_EVENT) {
                    const contactEvent = WorkItemContactEventYup.cast(event);
                    if (contactEvent === null || contactEvent === void 0 ? void 0 : contactEvent.contactId) {
                        contactIds.push(contactEvent.contactId.toString());
                    }
                }
                else if (eventType === GetNextEventType.VOICEMAIL_CONTACT_EVENT) {
                    const contactEvent = VoiceMailContactEventYup.cast(event);
                    if (contactEvent === null || contactEvent === void 0 ? void 0 : contactEvent.contactId) {
                        contactIds.push(contactEvent.contactId.toString());
                    }
                }
            });
            this.logger.info('handleGetNextResponse', `icBranchValue=3 detected. Emitting ${contactIds.length} backend contact IDs for state renewal`);
            this.renewStateRequested.next({ contactIds });
        }
        this.agentSession.onGetNextEvent.next(events);
        const sessionStartEventIndex = events.findIndex(event => event.Type === GetNextEventType.AGENT_SESSION_START_EVENT);
        if (sessionStartEventIndex !== -1 && sessionStartEventIndex !== 0) {
            const sessionStartEventObj = Object.assign({}, events[sessionStartEventIndex]);
            events.splice(sessionStartEventIndex, 1);
            events.splice(0, 0, sessionStartEventObj);
        }
        events.forEach((event) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
            switch ((event === null || event === void 0 ? void 0 : event.Type) || (event === null || event === void 0 ? void 0 : event.type)) {
                case GetNextEventType.CALL_CONTACT_EVENT: {
                    const callContactEvent = CallContactEventYup.cast(event);
                    if (callContactEvent.status === CallContactEventStatus.DISCONNECTED && callContactEvent.finalState) {
                        this.agentSession.agentAssistWebSocketUnsubsribeSubject.next(callContactEvent.contactId.toString());
                        this.agentSession.removeAgentAssistOmiliaGetNextEvent(callContactEvent);
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
                    if (!this.renewStateRequested.closed) {
                        (_a = this.renewStateRequested) === null || _a === void 0 ? void 0 : _a.complete();
                    }
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
                    const timeDifferenceinSec = (new Date().getTime() - ((_b = digitalContactEvent.startTime) === null || _b === void 0 ? void 0 : _b.getTime())) / 1000 || 0;
                    if (!(((_c = digitalContactEvent.status) === null || _c === void 0 ? void 0 : _c.toLowerCase()) === 'incoming' && timeDifferenceinSec > 45)) {
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
                    if ((((_d = event === null || event === void 0 ? void 0 : event.data) === null || _d === void 0 ? void 0 : _d.includes('https://app.surfly')) && ((_e = event === null || event === void 0 ? void 0 : event.data) === null || _e === void 0 ? void 0 : _e.includes('agent_token='))) ||
                        (((_f = event === null || event === void 0 ? void 0 : event.Data) === null || _f === void 0 ? void 0 : _f.includes('https://app.surfly')) && ((_g = event === null || event === void 0 ? void 0 : event.Data) === null || _g === void 0 ? void 0 : _g.includes('agent_token=')))) {
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
                    if (agentAssistJson && ((_h = agentAssistJson === null || agentAssistJson === void 0 ? void 0 : agentAssistJson.Params) === null || _h === void 0 ? void 0 : _h.providerId) === 'AutoSummary') {
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
                    else if (agentAssistJson && (((_j = agentAssistJson === null || agentAssistJson === void 0 ? void 0 : agentAssistJson.Params) === null || _j === void 0 ? void 0 : _j.providerId.includes('nuance-voice-bio')) || ((_k = agentAssistJson === null || agentAssistJson === void 0 ? void 0 : agentAssistJson.Params) === null || _k === void 0 ? void 0 : _k.providerId.includes('enlighten-autopilot-voice-bio')))) {
                        const autoSummaryStart = {
                            webSocketUri: agentAssistJson.WebSocketUri,
                            contactId,
                            subscriptions: agentAssistJson.Subscriptions,
                            mediaType: MediaType.VOICE,
                            agentAssistType: 'voice-bio-hub',
                            providerId: (_l = agentAssistJson === null || agentAssistJson === void 0 ? void 0 : agentAssistJson.Params) === null || _l === void 0 ? void 0 : _l.providerId,
                            profileName: agentAssistJson.Params.voiceBiometricProfileName,
                            customerId: agentAssistJson.Params.customerId,
                        };
                        this.agentSession.agentAssistSummarySubject.next(autoSummaryStart);
                        break;
                    }
                    const agentAssistEvent = new CXoneAgentAssist(event);
                    this.agentSession.agentAssistGetNextEventSubject.next(agentAssistEvent);
                    if ((_m = agentAssistJson === null || agentAssistJson === void 0 ? void 0 : agentAssistJson.Params) === null || _m === void 0 ? void 0 : _m.providerId.includes('omilia-voice-bio')) {
                        yield this.agentSession.setAgentAssistOmiliaGetNextSubject(agentAssistEvent);
                    }
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
                    this.agentSession.naturalCallingSkillListEvent.next(parseBooleanString(event === null || event === void 0 ? void 0 : event.Empty));
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