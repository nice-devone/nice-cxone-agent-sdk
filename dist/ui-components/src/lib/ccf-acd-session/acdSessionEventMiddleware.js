import { __awaiter } from "tslib";
import { CallType, CcfLogger, CXoneClient, CXoneProductFeature, FeatureToggleService, isRecordingNotificationPollingEnabled, isVoiceTranscriptEnabledAndToggledOn } from '@nice-devone/agent-sdk';
import { AgentSessionStatus, CXoneDigitalEventType, CXoneSdkError, WemNotificationDisplayData, VoiceContactStatus, ConferenceStatus, AgentAssistCommand, AutoSummaryErrorCode, MediaType, InteractionType, AgentCopilotContentType, DigitalChannelType, AgentAssistConfigACPParamsKeys, VoiceBioRequestTypes, WemNotificationRecordingData, UIStorageKeys, VoiceTranscriptionItemType, TranscriptionStatus, WorkItemContactStatus, } from '@nice-devone/common-sdk';
import { CallContactEventStatus, dbInstance, getANI, GetNextEventSubCategory, IndexDBKeyNames, IndexDBStoreNames, isVoiceBioHubFeatureEnabled, LocalStorageHelper, Logger, NotificationSettings, SessionStorageHelper, StorageKeys } from '@nice-devone/core-sdk';
import { CXoneAuth } from '@nice-devone/auth-sdk';
import { map, filter, first, distinctUntilChanged } from 'rxjs/operators';
import { CcfAuthenticationActions } from '../ccf-authentication/ccf-authentication.slice';
import { connectScreenAgentIfRecordingEnabled, disconnectScreenAgentRecording, globalActions, networkOfflineError, digitalWsNetworkStateNotification, headsetErrorToast, GLOBAL_APP_FEATURE_KEY, } from '../global.app.slice';
import { voicePreferenceActions } from './ccf-acd-session.slice';
import { CcfAssignmentAction, initiateWebRTC, agentLegAutoAcceptEnabledPermission, updateDigitalMessageReadStatus, PREVIEW_CASES, digitalContactCardsSelector, voiceBioHubAgentLogin, voiceBioHubAgentLogout, focusContact, deFocusContact } from '../ccf-assignment-panel/ccf-assignment-panel.slice';
import { AGENT_STATE_KEY, agentStateActions, setAgentState } from '../ccf-agent-state/ccf-agent-state.slice';
import { agentSkillDetailsActions, getSkillCPAParametersById, getSkillDeliveryPreferencesById } from '../ccf-agent-skill/ccf-agent-skill-details-slice';
import { agentWemNotificationsActions, getActiveRecordingNotifications } from '../ccf-agent-notification/ccf-agent-notification.slice';
import { agentSettingsActions, requestInteraction } from '../ccf-agent-setting/ccf-agent-setting-slice';
import { AgentStates, CXoneAgentEvents, CcfMessageType, CcfRegexPatterns, CxaExtensionAdapter } from '@nice-devone/shared-apps-lib';
import { CXoneVoiceClientWrapper } from '../../services/cxone-voice-client-wrapper';
import { NotificationType, handleCXoneAudioVisualNotification, notificationsSettingsActions, removeNotifiedEvent } from '../ccf-settings/ccf-notification-settings.slice';
import { agentDirectoryActions } from '../ccf-directory/+state/ccf-directory.slice';
import { fetchCommitments, commitmentActions } from '../ccf-commitment/ccf-commitment.slice';
import { setLocalStorageKey } from '../ccf-app-space/ccf-app-space.slice';
import { toast } from 'react-toastify';
import { addConsultAgentByAgentId, addConsultAgentBySkillId, callConferenceActions, conferenceCall, dialCallAndColdTransfer, dialExternalNumber, transferCall, } from '../ccf-call-conference/ccf-call-conference.slice';
import { CcfSettingsInformationAction } from '../ccf-system-information/ccf-system-information.slice';
import { getLastGeneratedTopics } from '../ccf-agent-copilot/ccf-agent-copilot-middleware';
import { displayHoursOfOperationToast } from '../ccf-toast/ccf-toast-hours-of-operation/ccf-toast-hours-of-operation';
import { CcfContactEditorAction } from '../ccf-editor/ccf-contact-editor.slice';
import { CXoneDigitalClient, updateCoBrowseDataInLocalStorage } from '@nice-devone/digital-sdk';
import { CXoneAcdClient } from '@nice-devone/acd-sdk';
import { CcfCustomerCardActions, invokeTimelineAndDataMemo, updateActivityData } from '../ccf-app-space/ccf-customer-card/ccf-customer-card.slice';
import { getAgentWorkflowDetailsFromLS } from '../ccf-app-space/ccf-customer-card/ccf-customer-card-utility';
import { dispositionInteractionActions, setDispositionToLocalStorage, removedDispositionFromLocalStorage } from '../ccf-disposition/ccf-disposition-slice';
import { ccfDigitalSearchActions } from '../ccf-app-space/ccf-digital-search/ccf-digital-search.slice';
import { CXoneAgentIntegrationTransformer } from '../ccf-app-space/ccf-customer-card/ccf-customer-card-activity/cxone-agent-integration-transformer';
import { CcfCopilotActions } from '../ccf-agent-copilot/ccf-agent-copilot-container.slice';
import { CxoneHeadsetClient, JabraConnectAgentLeg } from '@nice-devone/headset-sdk';
import * as CcfCustomerCardCreate from '../ccf-app-space/ccf-customer-card/ccf-customer-card-create';
import { ccfVoiceMailContactPanelActions } from '../ccf-voicemail-contact/ccf-voicemail-contact-panel.slice';
import { isFeatureEnabled } from '../../util/featureToggleUtils';
import { syncExperienceRecord, SMART_REACH_KEY } from '../lv-app-space/lv-app-space.slice';
import { updateUserAvailability, updateMessagesAndNotification, agentHiveActions, getAllGroupChat } from '../ccf-agent-chat/ccf-agent-chat.slice';
import { AgentHiveOutboundMessage, ConversationsCategory } from '@nice-devone/user-chat-sdk';
import { CcfCaseCustomFieldAction } from '../ccf-interaction-space/ccf-custom-fields/ccf-case-custom-field.slice';
import { getCreateExperienceRecordPayload, getMostRecentMessage, getUpdateExperienceRecordPayload, } from '../lv-app-space/lv-interactions/lv-interactions-utility';
import { GroupActionType } from '../ccf-agent-chat/common/interfaces';
import { CcfVoiceTranscriptionActions, deleteIndexedDBTranscript, setIndexedDBTranscript } from '../slices/ccf-voice-transcription.slice';
import { evaluateMemoryStatus } from '../../util/memoryManagerUtil';
import { CcfRejectedReasonAction } from '../ccf-digital/ccf-approval-banner/ccf-rejected-reason/ccf-rejected-reason.slice';
/**
 * Voice Preference for ACS is prefixed by - MSTeams
 */
const Acs_MsTeams = 'MSTeams';
var EventType;
(function (EventType) {
    EventType["PRESENCE"] = "PRESENCE";
    EventType["GROUP"] = "GROUP";
})(EventType || (EventType = {}));
/**
 *
 * @param state - represents state of application , can be used to get state using state$.values
 * @returns - return new action
 * @example
 */
export const acdSessionEventMiddleware = (actions$, state$, { store }) => {
    let notificationsSubscribed;
    const logger = new CcfLogger('ui.component', 'acdSessionEventMiddleware');
    /**
     * Subscribes to agent leg events and dispatches the events to the Redux store.
     *
     * This function sets up a subscription to agent leg events using the `CXoneAcdClient` instance.
     * When an agent leg event occurs, it is passed to the `handleAgentLegEventSubscription` action,
     * which dispatches the event to the Redux store.
     *
     * @remarks
     * The function uses the singleton instance of `CXoneAcdClient` to subscribe to the `agentLegEvent`.
     * The `AgentLegEvent` parameter is expected to contain the details of the agent leg event.
     *
     * @example
     * ```typescript
     * subscribeToAgentLegEvents();
     * ```
     *
     * @see CXoneAcdClient
     * @see CcfAssignmentAction.handleAgentLegEventSubscription
     */
    const subscribeToAgentLegEvents = () => {
        CXoneAcdClient.instance.session.agentLegEvent.subscribe((agentLeg) => {
            store.dispatch(CcfAssignmentAction.handleAgentLegEventSubscription(agentLeg));
        });
    };
    const isHeapPerformanceReloadToggle = FeatureToggleService.instance.getFeatureToggleSync("release-cx-agent-heap-performance-reload-AW-46709" /* FeatureToggles.HEAP_PERFORMANCE_RELOAD_TOGGLE */);
    return actions$.pipe(filter((action) => action.type === CcfAuthenticationActions.logUserIn.type), first(), map(() => {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        CXoneAcdClient.instance.session.onAgentSessionChange.subscribe((agentSessionChange) => {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y;
            switch (agentSessionChange.status) {
                case AgentSessionStatus.JOIN_SESSION_SUCCESS:
                case AgentSessionStatus.SESSION_START:
                    {
                        store.dispatch(voicePreferenceActions.setAgentSessionInfo(agentSessionChange));
                        //redirect to dashboard
                        store.dispatch(voicePreferenceActions.setActiveSession(agentSessionChange));
                        const agentSessionStartEvent = agentSessionChange.data;
                        if (agentSessionStartEvent.stationPhoneNumber === 'WebRTC') {
                            store.dispatch(initiateWebRTC());
                            store.dispatch(agentLegAutoAcceptEnabledPermission());
                            subscribeToAgentLegEvents();
                        }
                        /**
                        * Checks if the agent's station phone number matches the ACS voice preference and subscribes to agent leg events.
                        */
                        else if (agentSessionStartEvent.stationPhoneNumber === Acs_MsTeams) {
                            subscribeToAgentLegEvents();
                        }
                        //connect screen agent
                        const agentSessionData = agentSessionChange.data;
                        store.dispatch(connectScreenAgentIfRecordingEnabled(agentSessionData));
                        if (!notificationsSubscribed) {
                            notificationsSubscribed = CXoneClient.instance.notification.onCXoneNotificationEvent.subscribe((notification) => {
                                if (notification instanceof WemNotificationDisplayData) {
                                    if (notification.msgRead !== true) {
                                        store.dispatch(handleCXoneAudioVisualNotification({ type: NotificationType.NEW_AGENT_MESSAGE, payload: notification }));
                                    }
                                    store.dispatch(agentWemNotificationsActions.processAndSetNotifications(notification));
                                }
                                else if (notification instanceof WemNotificationRecordingData) {
                                    store.dispatch(agentWemNotificationsActions.processRecordingNotifications(notification));
                                }
                                else if (!(notification instanceof CXoneSdkError)) {
                                    // on success set msgRead as true in redux for non leader
                                    store.dispatch(agentWemNotificationsActions.markWemNotificationsAcknowledged());
                                }
                            });
                        }
                        if (state$.value.CcfAuthenticationSlice.authConfig.authMode === 'popup') {
                            (_c = (_b = (_a = CXoneClient.instance) === null || _a === void 0 ? void 0 : _a.directory) === null || _b === void 0 ? void 0 : _b.directoryEvent) === null || _c === void 0 ? void 0 : _c.subscribe((event) => {
                                var _a, _b;
                                store.dispatch(agentDirectoryActions.updateAgentList(event));
                                if (!((_b = (_a = state$.value) === null || _a === void 0 ? void 0 : _a.agentDirectory) === null || _b === void 0 ? void 0 : _b.drillDownToAgent)) {
                                    store.dispatch(agentDirectoryActions.updateTeamList(event));
                                    store.dispatch(agentDirectoryActions.updateDigitalSkillList(event));
                                }
                            });
                        }
                        const isConversationsEnabled = FeatureToggleService.instance.getFeatureToggleSync("release-agent-chat-AW-30672" /* FeatureToggles.AGENT_CHAT_FEATURE_TOGGLE */);
                        if (isConversationsEnabled) {
                            store.dispatch(updateUserAvailability({ id: agentSessionStartEvent.agentUUId, userState: 'Online' }));
                        }
                        // Agent queue polling
                        const agentId = CXoneClient.instance.cxoneUser.getUserInfo().icAgentId;
                        CXoneClient.instance.skillActivityQueue.startAgentQueuesPolling(agentId);
                        const isRecordingFTEnabled = FeatureToggleService.instance.getFeatureToggleSync("release-cxa-recording-compliance-AW-37942" /* FeatureToggles.CXA_RECORDING_NOTIFICATION_COMPLIANCE */);
                        const isCallContactAvailable = CXoneAcdClient.instance.contactManager.checkAcdContactsAvailable();
                        if (isRecordingFTEnabled && isCallContactAvailable) {
                            CXoneClient.instance.cxoneTenant.checkProductEnablementFromTenantData([CXoneProductFeature.INTERACTION_HUB_DATA_POLICIES, CXoneProductFeature.REAL_TIME_RECORDING_STATUS_UPDATE])
                                .then((result) => {
                                if (result) {
                                    store.dispatch(getActiveRecordingNotifications());
                                }
                            });
                        }
                    }
                    break;
                case AgentSessionStatus.SESSION_END: {
                    const selectedVoicePreferenceValue = store.getState().voicePreference.selectedVoicePreferenceValue;
                    if (selectedVoicePreferenceValue === 'WebRTC') {
                        CXoneVoiceClientWrapper.instance.disconnectServer();
                    }
                    const authToken = LocalStorageHelper.getItem(StorageKeys.AUTH_TOKEN) || LocalStorageHelper.getItem(StorageKeys.ENCRYPTED_AUTH_TOKEN);
                    const width = 500;
                    const height = 500;
                    const left = 50;
                    const top = 50;
                    const popupOptions = 'width=' +
                        width +
                        ',height=' +
                        height +
                        ',scrollbars=yes,toolbar=no,left=' +
                        left +
                        ',top=' +
                        top;
                    /**
                      * Handles defocus of the current focused contact on force logout.
                    */
                    const currentFocused = LocalStorageHelper.getItem(StorageKeys.FOCUSED_CONTACT_ID);
                    if (currentFocused) {
                        CXoneDigitalClient.instance.digitalContactManager.digitalContactService.deFocusContact(currentFocused)
                            .catch((err) => {
                            logger.error('Error de-focusing contact:', err);
                        });
                    }
                    if (authToken) {
                        const oidc_config = JSON.parse(localStorage.getItem(StorageKeys.OIDC_CONFIG) || '{}');
                        const logoutUri = `${oidc_config.endSessionEndpoint}?post_logout_redirect_uri=${window.location.origin}/logout-callback`;
                        CxaExtensionAdapter.instance.sendMessageToExtension({
                            type: CcfMessageType.UnAuthenticated,
                            data: { isAuth: false },
                        });
                        const isVoiceBioHubEnabled = isVoiceBioHubFeatureEnabled() && FeatureToggleService.instance.getFeatureToggleSync("release-agent-voiceBioHub-AW-24969" /* FeatureToggles.VOICE_BIO_HUB_FEATURE_TOGGLE */);
                        if (isVoiceBioHubEnabled) {
                            const voiceBioHubAgentAssist = LocalStorageHelper.getItem(StorageKeys.VOICE_BIO_HUB_AGENT_ASSIST);
                            const userInfo = CXoneClient.instance.cxoneUser.getUserInfo();
                            const ANI = (_h = (_g = (_f = (_e = (_d = store.getState()) === null || _d === void 0 ? void 0 : _d.inbox) === null || _e === void 0 ? void 0 : _e.callConferenceDetails) === null || _f === void 0 ? void 0 : _f.userInCall) === null || _g === void 0 ? void 0 : _g.contact) === null || _h === void 0 ? void 0 : _h.ani;
                            const isInbound = (_o = (_m = (_l = (_k = (_j = store.getState()) === null || _j === void 0 ? void 0 : _j.inbox) === null || _k === void 0 ? void 0 : _k.callConferenceDetails) === null || _l === void 0 ? void 0 : _l.userInCall) === null || _m === void 0 ? void 0 : _m.contact) === null || _o === void 0 ? void 0 : _o.isInbound;
                            const contactId = (_s = (_r = (_q = (_p = store.getState().inbox) === null || _p === void 0 ? void 0 : _p.callConferenceDetails) === null || _q === void 0 ? void 0 : _q.userInCall) === null || _r === void 0 ? void 0 : _r.contact) === null || _s === void 0 ? void 0 : _s.contactID.toString();
                            const profileName = voiceBioHubAgentAssist ? (_t = JSON.parse(voiceBioHubAgentAssist)) === null || _t === void 0 ? void 0 : _t.profileName : '';
                            store.dispatch(voiceBioHubAgentLogout({ agentId: userInfo.icAgentId, voiceBioConfigName: '', CustomParams: { ANI: '', contactId: '0', isInbound: false }, contactId: '0' }));
                        }
                        const eventArgs = {};
                        const customEvent = new CustomEvent(CXoneAgentEvents.CXONE_AGENT_LOG_OFF, eventArgs);
                        window.dispatchEvent(customEvent);
                        LocalStorageHelper.removeItem(NotificationSettings.NOISE_CANCELLATION_MIC_SLIDER);
                        LocalStorageHelper.removeItem(NotificationSettings.NOISE_CANCELLATION_MIC_TOGGLE);
                        LocalStorageHelper.removeItem(NotificationSettings.NOISE_CANCELLATION_SPEAKER_TOGGLE);
                        LocalStorageHelper.removeItem(NotificationSettings.NOISE_CANCELLATION_SPEAKER_SLIDER);
                        CXoneClient.instance.hasInitModuleInitiated = false;
                        (_v = (_u = state$.value.global) === null || _u === void 0 ? void 0 : _u.externalAppPopupWindow) === null || _v === void 0 ? void 0 : _v.close();
                        CXoneDigitalClient.instance.digitalContactManager.terminateDigitalWorkers();
                        CXoneClient.instance.autoSummaryService.terminateWebSocketWorker();
                        CXoneClient.instance.autoSummaryNotificationService.terminateWebSocketWorker();
                        CXoneClient.instance.copilotNotificationClient.terminateWebSocketWorker();
                        CXoneClient.instance.skillActivityQueue.agentQueueProvider.terminatePolling();
                        CXoneClient.instance.skillActivityQueue.agentQueuesDetailProvider.terminatePolling();
                        CXoneAcdClient.instance.notification.terminateWemWebSocket();
                        CXoneClient.instance.auth.terminateCXoneUtilWorker();
                        CXoneClient.instance.skillActivityQueue.terminateSkillActivityPolling();
                        CXoneClient.instance.directory.terminateDirectoryPolling();
                        const lastLoginUserInfo = LocalStorageHelper.getItem(StorageKeys.USER_INFO, true);
                        //disconnect screen agent
                        store.dispatch(disconnectScreenAgentRecording());
                        const externalProductUrls = LocalStorageHelper.getItem(StorageKeys.EXTERNAL_PRODUCT_URLS, true);
                        const appSpaceSizes = JSON.parse(LocalStorageHelper.getItem(StorageKeys.APPSPACE_RATIO) || '{}');
                        const verticalSplitterSizes = JSON.parse(LocalStorageHelper.getItem(StorageKeys.INTERACTION_SPACE_VERTICAL_RATIO) || '[]');
                        const pinnedMenuItem = LocalStorageHelper.getItem(StorageKeys.PINNED_MENU_ITEM);
                        const extensionInstallReminder = LocalStorageHelper.getItem(StorageKeys.WEBRTC_EXTENSION_INSTALL_REMINDER, true);
                        const agentMessageIds = LocalStorageHelper.getItem(StorageKeys.AGENT_MESSAGE_POPOVER);
                        CXoneClient.instance.clearCache();
                        CXoneDigitalClient.instance.clearDigitalCache();
                        store.dispatch(voicePreferenceActions.inActiveSession(true));
                        lastLoginUserInfo && localStorage.setItem(StorageKeys.LAST_LOGGED_IN_AGENT_ID, lastLoginUserInfo.icAgentId);
                        if (externalProductUrls && Object.keys(externalProductUrls).length > 0) {
                            if ((externalProductUrls === null || externalProductUrls === void 0 ? void 0 : externalProductUrls.selectedMenuQuickApp) === 'WEM' || (externalProductUrls === null || externalProductUrls === void 0 ? void 0 : externalProductUrls.selectedMenuPanelApp) === 'WEM') {
                                externalProductUrls.selectedMenuQuickApp = '';
                                externalProductUrls.selectedMenuPanelApp = '';
                            }
                            LocalStorageHelper.setItem(StorageKeys.EXTERNAL_PRODUCT_URLS, externalProductUrls);
                        }
                        appSpaceSizes && store.dispatch(setLocalStorageKey({ key: StorageKeys.APPSPACE_RATIO, value: JSON.stringify(appSpaceSizes) }));
                        verticalSplitterSizes && store.dispatch(setLocalStorageKey({ key: StorageKeys.INTERACTION_SPACE_VERTICAL_RATIO, value: JSON.stringify(verticalSplitterSizes) }));
                        pinnedMenuItem && localStorage.setItem(StorageKeys.PINNED_MENU_ITEM, pinnedMenuItem);
                        agentMessageIds && localStorage.setItem(StorageKeys.AGENT_MESSAGE_POPOVER, agentMessageIds);
                        // persist the webRTC extension installation reminder value
                        localStorage.setItem(StorageKeys.WEBRTC_EXTENSION_INSTALL_REMINDER, extensionInstallReminder);
                        const queryString = state$.value.CcfAuthenticationSlice.authConfig.queryString;
                        const authConfig = (_w = state$.value.CcfAuthenticationSlice) === null || _w === void 0 ? void 0 : _w.authConfig;
                        const isExternalAuthentication = (authConfig === null || authConfig === void 0 ? void 0 : authConfig.authTarget) === 'external';
                        if (logoutUri) {
                            if ((authConfig === null || authConfig === void 0 ? void 0 : authConfig.authMode) === 'page' || isExternalAuthentication) {
                                const embeddedAppLogoutUrl = `${logoutUri}?app=${(_x = authConfig === null || authConfig === void 0 ? void 0 : authConfig.app) !== null && _x !== void 0 ? _x : ''}`;
                                const logoutURL = isExternalAuthentication ? embeddedAppLogoutUrl : logoutUri;
                                window.setTimeout(function () { window.location.replace(logoutURL); }, 100);
                            }
                            else if ((authConfig === null || authConfig === void 0 ? void 0 : authConfig.authMode) === 'popup') {
                                store.dispatch(CcfAuthenticationActions.logUserOut());
                                window.open(logoutUri, 'logoutWindow', popupOptions);
                                window.location.href = window.location.origin.concat(`/login${queryString}`);
                            }
                        }
                        const isConversationsEnabled = FeatureToggleService.instance.getFeatureToggleSync("release-agent-chat-AW-30672" /* FeatureToggles.AGENT_CHAT_FEATURE_TOGGLE */);
                        if (isConversationsEnabled) {
                            store.dispatch(updateUserAvailability({ id: lastLoginUserInfo.userId, userState: 'Offline' }));
                        }
                    }
                    else {
                        const queryString = state$.value.CcfAuthenticationSlice.authConfig.queryString;
                        const authConfig = (_y = state$.value.CcfAuthenticationSlice) === null || _y === void 0 ? void 0 : _y.authConfig;
                        const isExternalAuthentication = (authConfig === null || authConfig === void 0 ? void 0 : authConfig.authTarget) === 'external';
                        const cxoneHostname = authConfig === null || authConfig === void 0 ? void 0 : authConfig.authSettings.cxoneHostname;
                        const queryParam = new URLSearchParams(queryString).get('src');
                        if (queryParam === 'UH') {
                            CXoneAuth.instance.getOpenIDConfiguration(cxoneHostname).then((oidc_config) => {
                                var _a;
                                const logoutUri = `${oidc_config.endSessionEndpoint}?post_logout_redirect_uri=${window.location.origin}/logout-callback`;
                                if (logoutUri) {
                                    const embeddedAppLogoutUrl = `${logoutUri}?app=${(_a = authConfig === null || authConfig === void 0 ? void 0 : authConfig.app) !== null && _a !== void 0 ? _a : ''}`;
                                    const logoutURL = isExternalAuthentication ? embeddedAppLogoutUrl : logoutUri;
                                    window.setTimeout(function () { window.location.replace(logoutURL); }, 100);
                                }
                            });
                        }
                        else {
                            window.location.href = window.location.origin.concat(`/login${queryString}`);
                        }
                    }
                    break;
                }
                case AgentSessionStatus.JOIN_SESSION_FAILURE:
                    //Redirect to voice-pref
                    store.dispatch(voicePreferenceActions.inActiveSession(false));
                    break;
            }
        });
        CXoneAcdClient.instance.session.agentStateService.agentStateSubject.subscribe((agentState) => {
            var _a, _b, _c, _d, _e;
            const isNewInstance = !(store.getState().agentState.agentStatus.currentState.state);
            store.dispatch(globalActions.setTimer(Date.now()));
            const eventArgs = {};
            eventArgs.detail = agentState;
            const customEvent = new CustomEvent(CXoneAgentEvents.CXONE_AGENT_STATE_CHANGE, eventArgs);
            window.dispatchEvent(customEvent);
            CxaExtensionAdapter.instance.sendMessageToExtension({
                type: CcfMessageType.AgentStateUpdated,
                data: { agentState: (_a = agentState === null || agentState === void 0 ? void 0 : agentState.currentState) === null || _a === void 0 ? void 0 : _a.state },
            });
            store.dispatch(agentStateActions.setCurrentStatus(agentState));
            const workItemCount = Object.values((_c = (_b = store.getState()) === null || _b === void 0 ? void 0 : _b.inbox) === null || _c === void 0 ? void 0 : _c.cxoneInteractions).filter((interaction) => interaction.interactionType === InteractionType.WORKITEM).length;
            store.dispatch(requestInteraction({ workItemCount: workItemCount, userRequest: false }));
            const url = window.location.href;
            const app = (_e = (_d = new URL(url)) === null || _d === void 0 ? void 0 : _d.searchParams) === null || _e === void 0 ? void 0 : _e.get('app');
            if (isNewInstance && agentState.currentState.state === AgentStates.Available && app === 'cxa') {
                const setSelectedState = agentStateActions.setSelectedState;
                const agentCode = {
                    state: 'Unavailable',
                };
                store.dispatch(setSelectedState({ selectedState: agentCode }));
                store.dispatch(setAgentState({ selectedState: agentCode }));
            }
        });
        (_a = CXoneDigitalClient.instance.digitalContactManager.onAgentHiveEvent) === null || _a === void 0 ? void 0 : _a.subscribe((eventData) => {
            const isConversationsEnabled = FeatureToggleService.instance.getFeatureToggleSync("release-agent-chat-AW-30672" /* FeatureToggles.AGENT_CHAT_FEATURE_TOGGLE */);
            if (isConversationsEnabled) {
                const validMessage = AgentHiveOutboundMessage.validateSync(eventData.message, { stripUnknown: true });
                store.dispatch(updateMessagesAndNotification({ inBoundMessages: validMessage }));
            }
        });
        (_b = CXoneDigitalClient.instance.digitalContactManager.onDigitalContactNewMessageEvent) === null || _b === void 0 ? void 0 : _b.subscribe((eventData) => {
            if ((eventData === null || eventData === void 0 ? void 0 : eventData.contactId) && (eventData === null || eventData === void 0 ? void 0 : eventData.message))
                store.dispatch(CcfAssignmentAction.addNewMessageInPublicMessageTree({ caseId: eventData === null || eventData === void 0 ? void 0 : eventData.contactId, newMessage: eventData === null || eventData === void 0 ? void 0 : eventData.message, interactionId: eventData === null || eventData === void 0 ? void 0 : eventData.interactionId }));
        });
        (_c = CXoneAcdClient.instance.contactManager.onCoBrowseEvent) === null || _c === void 0 ? void 0 : _c.subscribe((eventData) => {
            const { inbox } = store.getState();
            const contactCards = digitalContactCardsSelector(inbox.cxoneInteractions);
            // condition to check whether BU has co-browse feature enabled
            CXoneClient.instance.cxoneTenant.checkProductEnablement([CXoneProductFeature.CO_BROWSE])
                .then((result) => {
                if (result) {
                    const digitalContact = contactCards.find((contactCard) => contactCard.caseId === eventData.data.contactId);
                    // Enabling co-browse option for private chat channels only as per DFO/MAX parity and as per business requirement
                    if ((digitalContact === null || digitalContact === void 0 ? void 0 : digitalContact.interactionId) && (digitalContact === null || digitalContact === void 0 ? void 0 : digitalContact.channelName) === 'Chat' && (digitalContact === null || digitalContact === void 0 ? void 0 : digitalContact.isPrivate)) {
                        updateCoBrowseDataInLocalStorage(eventData.data.contactId, eventData.data.url);
                        store.dispatch(CcfAssignmentAction.updateCoBrowseStatus({ caseId: eventData === null || eventData === void 0 ? void 0 : eventData.data.contactId, interactionId: digitalContact === null || digitalContact === void 0 ? void 0 : digitalContact.interactionId, url: eventData === null || eventData === void 0 ? void 0 : eventData.data.url }));
                    }
                    else {
                        updateCoBrowseDataInLocalStorage(eventData.data.contactId, eventData.data.url);
                    }
                }
            });
        });
        (_d = CXoneDigitalClient.instance.digitalContactManager.onAvailabilityEvent) === null || _d === void 0 ? void 0 : _d.subscribe((digitalContact) => __awaiter(void 0, void 0, void 0, function* () {
            var _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w;
            const isConversationsFTEnabled = FeatureToggleService.instance.getFeatureToggleSync("release-agent-chat-AW-30672" /* FeatureToggles.AGENT_CHAT_FEATURE_TOGGLE */);
            if (!isConversationsFTEnabled)
                return;
            const { eventType, payload } = digitalContact.data;
            if (eventType === EventType.PRESENCE) {
                store.dispatch(agentHiveActions.updateUserAvailability(payload));
            }
            else if (eventType === EventType.GROUP) {
                const groupData = payload;
                const { action, payload: groupPayload } = groupData;
                const allGroups = ((_k = store.getState().agentHive.groupList) === null || _k === void 0 ? void 0 : _k.groups) || [];
                const matchedGroup = allGroups.find((g) => g.groupId === groupPayload.groupId);
                const threadId = matchedGroup === null || matchedGroup === void 0 ? void 0 : matchedGroup.threadId;
                const groupCommonPayload = {
                    threadId,
                    groupId: groupPayload.groupId,
                    timeStamp: groupPayload.timeStamp,
                    ownerUserName: groupPayload.ownerUserName,
                    groupName: groupPayload.groupName,
                };
                switch (action) {
                    case GroupActionType.CREATE: {
                        const mappedMembers = (groupPayload.members || []).map(m => ({
                            userId: m.id || '', userName: m.userName,
                        }));
                        const allGroups = ((_l = store.getState().agentHive.groupList) === null || _l === void 0 ? void 0 : _l.groups) || [];
                        const updatedGroups = [
                            Object.assign(Object.assign({}, groupPayload), { members: mappedMembers, groupId: groupPayload.groupId, groupName: groupPayload.groupName, ownerUserName: groupPayload.ownerUserName, timeStamp: groupPayload.timeStamp }),
                            ...allGroups.slice(0, 9)
                        ];
                        store.dispatch(agentHiveActions.setAllGroups(Object.assign(Object.assign({}, store.getState().agentHive.groupList), { groups: updatedGroups })));
                        // Logic to show Group name in Notification when new group is created
                        const db = yield dbInstance();
                        const groupDetailsFromDB = (yield (db === null || db === void 0 ? void 0 : db.get(IndexDBStoreNames.CONVERSATIONS, IndexDBKeyNames.CONVERSATIONS_GROUPS))) || [];
                        const groupObject = {
                            members: (groupPayload.members || []).map(m => m.id || ''),
                            groupId: groupPayload.groupId,
                            groupName: groupPayload.groupName,
                        };
                        groupDetailsFromDB.push(groupObject);
                        db === null || db === void 0 ? void 0 : db.put(IndexDBStoreNames.CONVERSATIONS, groupDetailsFromDB, IndexDBKeyNames.CONVERSATIONS_GROUPS);
                        break;
                    }
                    case GroupActionType.ADD: {
                        const allGroups = ((_m = store.getState().agentHive.groupList) === null || _m === void 0 ? void 0 : _m.groups) || [];
                        const currentChat = store.getState().agentHive.activeChat;
                        const membersToAdd = ((_o = groupPayload.members) === null || _o === void 0 ? void 0 : _o.map(member => ({ userName: member.userName, userId: member.id }))) || [];
                        const groupIndex = allGroups.findIndex((g) => g.groupId === groupPayload.groupId);
                        // fetch all the groups; if group not found
                        if (groupIndex === -1 && groupPayload.ownerUserId) {
                            const currentAgentId = CXoneClient.instance.cxoneUser.getUserInfo().userId;
                            store.dispatch(getAllGroupChat({ userId: currentAgentId }));
                        }
                        // If group exists & is active, update its members
                        if ((currentChat === null || currentChat === void 0 ? void 0 : currentChat.category) === ConversationsCategory.GROUP &&
                            ((_p = currentChat === null || currentChat === void 0 ? void 0 : currentChat.groupDetail) === null || _p === void 0 ? void 0 : _p.groupId) === groupPayload.groupId) {
                            const existingMembers = ((_q = currentChat.groupDetail) === null || _q === void 0 ? void 0 : _q.members) || [];
                            const uniqueMembers = [...existingMembers, ...membersToAdd.filter(m => !existingMembers.some((e) => e.userId === m.userId))
                            ];
                            store.dispatch(agentHiveActions.setActiveChat(Object.assign(Object.assign({}, currentChat), { groupDetail: Object.assign(Object.assign({}, currentChat.groupDetail), { members: uniqueMembers }) })));
                            // To update groupList(members count) when active chat
                            const updatedGroup = {
                                members: [...allGroups[groupIndex].members, ...membersToAdd],
                                groupId: groupPayload.groupId,
                                groupName: groupPayload.groupName,
                                threadId: allGroups[groupIndex].threadId || '',
                            };
                            const updatedGroups = [
                                ...allGroups.slice(0, groupIndex),
                                Object.assign(Object.assign({}, allGroups[groupIndex]), updatedGroup),
                                ...allGroups.slice(groupIndex + 1)
                            ];
                            store.dispatch(agentHiveActions.setAllGroups(Object.assign(Object.assign({}, store.getState().agentHive.groupList), { groups: updatedGroups })));
                        }
                        store.dispatch(agentHiveActions.addGroupActionMessage(Object.assign(Object.assign({}, groupCommonPayload), { icon: 'plus_circle', members: membersToAdd, action: GroupActionType.ADD })));
                        break;
                    }
                    case GroupActionType.REMOVE: {
                        const allGroups = ((_r = store.getState().agentHive.groupList) === null || _r === void 0 ? void 0 : _r.groups) || [];
                        const currentChat = store.getState().agentHive.activeChat;
                        const currentAgentId = CXoneClient.instance.cxoneUser.getUserInfo().userId;
                        const membersToRemove = groupPayload.members || [];
                        if (membersToRemove.some(m => m.id === currentAgentId)) {
                            // If current agent is removed from group, remove current group from all groups
                            const updatedGroups = allGroups.filter((g) => g.groupId !== groupPayload.groupId);
                            store.dispatch(agentHiveActions.setAllGroups(Object.assign(Object.assign({}, store.getState().agentHive.groupList), { groups: updatedGroups })));
                            if (((_s = currentChat === null || currentChat === void 0 ? void 0 : currentChat.groupDetail) === null || _s === void 0 ? void 0 : _s.groupId) === groupPayload.groupId) {
                                store.dispatch(agentHiveActions.setActiveChat({}));
                            }
                            break;
                        }
                        const updatedGroups = allGroups.map((g) => g.groupId === groupPayload.groupId
                            ? Object.assign(Object.assign({}, g), { members: (g.members || []).filter(m => !membersToRemove.some(r => r.id === m.userId)) }) : g);
                        store.dispatch(agentHiveActions.setAllGroups(Object.assign(Object.assign({}, store.getState().agentHive.groupList), { groups: updatedGroups })));
                        if ((currentChat === null || currentChat === void 0 ? void 0 : currentChat.category) === ConversationsCategory.GROUP &&
                            ((_t = currentChat === null || currentChat === void 0 ? void 0 : currentChat.groupDetail) === null || _t === void 0 ? void 0 : _t.groupId) === groupPayload.groupId) {
                            const existingMembers = ((_u = currentChat.groupDetail) === null || _u === void 0 ? void 0 : _u.members) || [];
                            const remainingMembers = existingMembers.filter((m) => !membersToRemove.some(r => r.id === m.userId));
                            store.dispatch(agentHiveActions.setActiveChat(Object.assign(Object.assign({}, currentChat), { groupDetail: Object.assign(Object.assign({}, currentChat.groupDetail), { members: remainingMembers }) })));
                        }
                        store.dispatch(agentHiveActions.addGroupActionMessage(Object.assign(Object.assign({}, groupCommonPayload), { icon: 'minus_circle', members: membersToRemove, action: GroupActionType.REMOVE })));
                        break;
                    }
                    case GroupActionType.RENAME: {
                        const existingGroup = allGroups.find((g) => g.groupId === groupPayload.groupId);
                        let updatedGroups;
                        if (existingGroup) {
                            updatedGroups = allGroups.map((group) => group.groupId === groupPayload.groupId
                                ? Object.assign(Object.assign({}, group), { groupName: groupPayload.groupName }) : group);
                        }
                        store.dispatch(agentHiveActions.setAllGroups(Object.assign(Object.assign({}, store.getState().agentHive.groupList), { groups: updatedGroups })));
                        store.dispatch(agentHiveActions.addGroupActionMessage(Object.assign(Object.assign({}, groupCommonPayload), { icon: 'edit_pencil', action: GroupActionType.RENAME })));
                        const currentChat = state$.value.agentHive.activeChat;
                        store.dispatch(agentHiveActions.setActiveChat(Object.assign(Object.assign({}, currentChat), { groupDetail: Object.assign(Object.assign({}, currentChat.groupDetail), { groupName: groupPayload.groupName }) })));
                        break;
                    }
                    case GroupActionType.LEAVE: {
                        const state = store.getState().agentHive;
                        const allGroups = ((_v = state.groupList) === null || _v === void 0 ? void 0 : _v.groups) || [];
                        const currentChat = state.activeChat;
                        const { groupId, ownerUserId, ownerUserName } = groupPayload;
                        /**
                         * Checks if a member is leaving the group (owner user).
                         * @example - isLeavingUser()
                         * @param m - The group member to check.
                         * @returns True if the member is the owner user, otherwise false.
                         */
                        const isLeavingUser = (m) => (m === null || m === void 0 ? void 0 : m.userId) === ownerUserId || (m === null || m === void 0 ? void 0 : m.userName) === ownerUserName;
                        const updatedGroups = allGroups.map((g) => g.groupId === groupId ? Object.assign(Object.assign({}, g), { members: (g.members || []).filter(m => !isLeavingUser(m)) }) : g);
                        store.dispatch(agentHiveActions.setAllGroups(Object.assign(Object.assign({}, state.groupList), { groups: updatedGroups })));
                        if ((currentChat === null || currentChat === void 0 ? void 0 : currentChat.category) === ConversationsCategory.GROUP &&
                            ((_w = currentChat === null || currentChat === void 0 ? void 0 : currentChat.groupDetail) === null || _w === void 0 ? void 0 : _w.groupId) === groupId) {
                            const remainingMembers = (currentChat.groupDetail.members || []).filter((m) => !isLeavingUser(m));
                            store.dispatch(agentHiveActions.setActiveChat(Object.assign(Object.assign({}, currentChat), { groupDetail: Object.assign(Object.assign({}, currentChat.groupDetail), { members: remainingMembers }) })));
                        }
                        store.dispatch(agentHiveActions.setSelectedMembers((state.selectedMembers || []).filter((m) => !isLeavingUser(m))));
                        store.dispatch(agentHiveActions.addGroupActionMessage(Object.assign(Object.assign({}, groupCommonPayload), { icon: 'circle_left', action: GroupActionType.LEAVE })));
                        break;
                    }
                }
            }
        }));
        (_e = CXoneDigitalClient.instance.digitalContactManager.onDigitalContactEvent) === null || _e === void 0 ? void 0 : _e.subscribe((digitalContact) => __awaiter(void 0, void 0, void 0, function* () {
            var _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21, _22, _23, _24, _25, _26, _27, _28;
            // get the current state inbox to check if case already exist in inbox
            const { cxoneInteractions, assignmentPanelMetadata } = store.getState().inbox;
            const { isAgentCopilotEnabled } = store.getState().global;
            // Adding caseId as contactId since digital contacts are not passed with one
            // This is needed for outcomes/dispositions to work for digital contacts
            if (!digitalContact.contactID) {
                digitalContact.contactID = digitalContact.caseId;
            }
            const aahConfigForCaseId = (_y = (_x = CXoneClient === null || CXoneClient === void 0 ? void 0 : CXoneClient.instance) === null || _x === void 0 ? void 0 : _x.copilotService) === null || _y === void 0 ? void 0 : _y.getAgentAssistConfig(digitalContact.caseId);
            // Fire and forget - don't block execution for config storage
            if (isAgentCopilotEnabled) {
                CXoneClient.instance.copilotService.storeAgentAssistConfig(digitalContact.caseId, aahConfigForCaseId === null || aahConfigForCaseId === void 0 ? void 0 : aahConfigForCaseId.MediaType)
                    .catch((error) => {
                    const logger = new Logger('acdSession', 'onDigitalContactEvent');
                    logger.error('storeAgentAssistConfig', JSON.stringify(error));
                });
            }
            try {
                if (isAgentCopilotEnabled && digitalContact.channelType === (DigitalChannelType.EMAIL).toLowerCase()) {
                    const { adaptiveCardsData } = store.getState().ccfCopilotData;
                    const isEmailCreationCardPresent = (_0 = (_z = adaptiveCardsData[digitalContact.caseId]) === null || _z === void 0 ? void 0 : _z.acpAppElements.some((card) => card.contentType === AgentCopilotContentType.EMAIL_CREATION_CARD)) !== null && _0 !== void 0 ? _0 : false;
                    !isEmailCreationCardPresent && aahConfigForCaseId && store.dispatch(getLastGeneratedTopics({ contactId: digitalContact.caseId }));
                }
            }
            catch (error) {
                const logger = new Logger('acdSession', 'onDigitalContactEvent');
                logger.error('getLastGeneratedTopics', JSON.stringify(error));
            }
            const message = digitalContact.messages ? digitalContact.messages[digitalContact.messages.length - 1] : null;
            const draftMessageToRemove = {
                traceId: (message === null || message === void 0 ? void 0 : message.xTraceId) || '',
                caseId: (digitalContact === null || digitalContact === void 0 ? void 0 : digitalContact.caseId) || '',
                replyPayload: {},
                interactionId: '',
            };
            if (digitalContact.eventDetails) {
                const contactIdToDefocus = LocalStorageHelper.getItem(StorageKeys.FOCUSED_CONTACT_ID) ? LocalStorageHelper.getItem(StorageKeys.FOCUSED_CONTACT_ID) : null;
                const storeState = store.getState();
                const userId = (_2 = (_1 = storeState[AGENT_STATE_KEY]) === null || _1 === void 0 ? void 0 : _1.userInfo) === null || _2 === void 0 ? void 0 : _2.userId;
                const globalState = storeState[GLOBAL_APP_FEATURE_KEY];
                const isLvECCDeskFeatureToggleEnabled = (globalState === null || globalState === void 0 ? void 0 : globalState.isLvCustomerCardFeatureToggleEnabled) || (globalState === null || globalState === void 0 ? void 0 : globalState.isLvDeskFeatureToggleEnabled);
                const isLvInteractionsSyncEnabled = (_3 = storeState[SMART_REACH_KEY]) === null || _3 === void 0 ? void 0 : _3.isLvInteractionsSyncEnabled;
                const { hasSmartReachAgentAccess, hasSmartReachUserAccess, smartReachDeskAccess, smartReachECCAccess } = (_4 = globalState === null || globalState === void 0 ? void 0 : globalState.userCustomAttributes) !== null && _4 !== void 0 ? _4 : {};
                const hasSmartReachAccess = hasSmartReachAgentAccess || hasSmartReachUserAccess;
                const hasDeskOrEccAccess = smartReachDeskAccess || smartReachECCAccess;
                const isLvCustomerCardEnabled = hasDeskOrEccAccess && isLvECCDeskFeatureToggleEnabled && hasSmartReachAccess;
                const isContactElevated = ((_6 = (_5 = storeState.inbox) === null || _5 === void 0 ? void 0 : _5.cxoneInteractions[digitalContact.interactionId]) === null || _6 === void 0 ? void 0 : _6.interactionType) === InteractionType.ELEVATED;
                switch (digitalContact.eventDetails.eventType) {
                    case CXoneDigitalEventType.MESSAGE_NOTE_CREATED:
                    case CXoneDigitalEventType.MESSAGE_NOTE_UPDATED:
                    case CXoneDigitalEventType.MESSAGE_NOTE_DELETED:
                    case CXoneDigitalEventType.MESSAGE_DELIVERY_STATUS_CHANGED:
                    case CXoneDigitalEventType.MESSAGE_SEEN_CHANGED:
                        store.dispatch(CcfAssignmentAction.handleCaseAssignedDigitalContactEvent(digitalContact));
                        break;
                    case CXoneDigitalEventType.MESSAGE_ADDED_INTO_CASE:
                        //Dev note: change added for visual indicators
                        // if draft message present in state with same XTraceId then remove it
                        // Wrapped behind SYF_PERFORMANCE_GENERIC_TOGGLE to allow controlled rollout
                        if (((_7 = digitalContact.channel) === null || _7 === void 0 ? void 0 : _7.isTrackingMessageDeliveryStatus) || (FeatureToggleService.instance.getFeatureToggleSync("release-cx-agent-syf-performance-generic-AW-46709" /* FeatureToggles.SYF_PERFORMANCE_GENERIC_TOGGLE */) && ((_8 = digitalContact.channel) === null || _8 === void 0 ? void 0 : _8.isPrivate))) {
                            logger.trace('middleware MESSAGE_ADDED_INTO_CASE event in condition for removeDraftMessageFromInteractionState >>> ', JSON.stringify(draftMessageToRemove));
                            store.dispatch(CcfAssignmentAction.removeDraftMessageFromInteractionState(draftMessageToRemove));
                        }
                        store.dispatch(CcfAssignmentAction.handleNewMessageDigitalContactEvent(digitalContact));
                        if (isLvCustomerCardEnabled &&
                            isLvInteractionsSyncEnabled &&
                            ((digitalContact === null || digitalContact === void 0 ? void 0 : digitalContact.channelType) === DigitalChannelType.EMAIL.toLowerCase() ||
                                (digitalContact === null || digitalContact === void 0 ? void 0 : digitalContact.channelType) === DigitalChannelType.SMS.toLowerCase())) {
                            const data = getCreateExperienceRecordPayload(digitalContact, userId, false);
                            if (data && !isContactElevated) {
                                store.dispatch(syncExperienceRecord(data));
                            }
                        }
                        store.dispatch(CcfContactEditorAction.userSentMessage({ caseId: digitalContact === null || digitalContact === void 0 ? void 0 : digitalContact.caseId, isMessageSentByCustomer: true }));
                        store.dispatch(CcfContactEditorAction.updateIsTypingPreviewWithText({ caseId: digitalContact === null || digitalContact === void 0 ? void 0 : digitalContact.caseId, messagePreview: '' }));
                        if (digitalContact.messages) {
                            const lastMessageIndex = digitalContact.messages.length - 1;
                            if (digitalContact.messages[lastMessageIndex].direction === 'inbound') {
                                store.dispatch(handleCXoneAudioVisualNotification({ type: NotificationType.NEW_REPLY_DIGITAL_INTERACTION, payload: digitalContact }));
                            }
                        }
                        // if digital case is already selected and new message is not read than mark message as read
                        if (cxoneInteractions[digitalContact.interactionId]
                            && Object.keys(cxoneInteractions[digitalContact.interactionId]).length
                            && assignmentPanelMetadata.selectedInteractionId === digitalContact.interactionId
                            && cxoneInteractions[digitalContact.interactionId].selectedContactId === digitalContact.caseId
                            && (digitalContact === null || digitalContact === void 0 ? void 0 : digitalContact.hasUnreadMessage)) {
                            store.dispatch(updateDigitalMessageReadStatus({
                                interactionId: digitalContact === null || digitalContact === void 0 ? void 0 : digitalContact.interactionId,
                                caseId: digitalContact === null || digitalContact === void 0 ? void 0 : digitalContact.caseId,
                            }));
                        }
                        break;
                    case CXoneDigitalEventType.MESSAGE_UPDATED:
                        store.dispatch(CcfAssignmentAction.handleCaseAssignedDigitalContactEvent(digitalContact));
                        break;
                    case CXoneDigitalEventType.CASE_STATUS_CHANGED:
                        store.dispatch(CcfAssignmentAction.handleCaseStatusChangedDigitalContactEvent(digitalContact));
                        if (digitalContact.status === 'closed') {
                            if (isLvCustomerCardEnabled && isLvInteractionsSyncEnabled) {
                                let externalInteractionId = null;
                                if (digitalContact.channelType === ((_9 = DigitalChannelType.EMAIL) === null || _9 === void 0 ? void 0 : _9.toLowerCase()) || digitalContact.channelType === ((_10 = DigitalChannelType.SMS) === null || _10 === void 0 ? void 0 : _10.toLowerCase())) {
                                    externalInteractionId = (digitalContact === null || digitalContact === void 0 ? void 0 : digitalContact.messages) && ((_11 = getMostRecentMessage(digitalContact === null || digitalContact === void 0 ? void 0 : digitalContact.messages)) === null || _11 === void 0 ? void 0 : _11.id);
                                }
                                else {
                                    externalInteractionId = digitalContact === null || digitalContact === void 0 ? void 0 : digitalContact.caseId;
                                }
                                if (externalInteractionId) {
                                    const saveTranscript = digitalContact.channelType === ((_12 = DigitalChannelType.EMAIL) === null || _12 === void 0 ? void 0 : _12.toLowerCase()) || digitalContact.channelType === ((_13 = DigitalChannelType.SMS) === null || _13 === void 0 ? void 0 : _13.toLowerCase()) ? false : true;
                                    const dispositionNotes = (_16 = (_15 = (_14 = store.getState().disposition) === null || _14 === void 0 ? void 0 : _14.dispositions[digitalContact.caseId]) === null || _15 === void 0 ? void 0 : _15.formInputs) === null || _16 === void 0 ? void 0 : _16.notes;
                                    const data = getUpdateExperienceRecordPayload({
                                        detailsObject: digitalContact,
                                        agentId: userId,
                                        externalInteractionId,
                                        dispositionNotes,
                                        saveTranscript,
                                    });
                                    if (data && !isContactElevated) {
                                        store.dispatch(syncExperienceRecord(data));
                                    }
                                }
                            }
                            CcfCustomerCardCreate.controller.service.localStorage.removeListByInteraction(digitalContact.caseId);
                            store.dispatch(handleCXoneAudioVisualNotification({
                                type: NotificationType.END_DIGITAL_INTERACTION,
                                payload: digitalContact,
                            }));
                            //check if ACP is enabled
                            if (isAgentCopilotEnabled) {
                                const { getAgentAssistConfig } = CXoneClient.instance.copilotService;
                                const aahConfiguration = getAgentAssistConfig && getAgentAssistConfig(`${digitalContact.caseId}`, true);
                                const { Params } = aahConfiguration || {};
                                const generateFinalSummaryEnabled = (Params === null || Params === void 0 ? void 0 : Params[AgentAssistConfigACPParamsKeys.FINAL_SUMMARY]) && ((Params === null || Params === void 0 ? void 0 : Params[AgentAssistConfigACPParamsKeys.AUTOSUMMARY_TO_OUTCOME_PANEL]) !== false || (Params === null || Params === void 0 ? void 0 : Params[AgentAssistConfigACPParamsKeys.SHOW_AUTOSUMMARY_CARD]) !== false);
                                if (generateFinalSummaryEnabled) {
                                    //generate final summary for closed conversation
                                    CXoneClient.instance.copilotService.generateFinalSummary(digitalContact.caseId, digitalContact.status);
                                }
                                // DEV Comment - Checking channel Email to not send the comprehensive feedback card
                                if (isAgentCopilotEnabled && digitalContact.channelType !== (DigitalChannelType.EMAIL).toLowerCase()) {
                                    const enableInputJsonFile = Params === null || Params === void 0 ? void 0 : Params[AgentAssistConfigACPParamsKeys.ENABLE_INPUT_JSON_FILE];
                                    const knowledgeHubFeedbackEnabled = enableInputJsonFile && ((_17 = Params === null || Params === void 0 ? void 0 : Params[AgentAssistConfigACPParamsKeys.KNOWLEDGE_HUB_CONFIG]) === null || _17 === void 0 ? void 0 : _17.feedbackEnabled);
                                    const showComprehensiveCard = (Params === null || Params === void 0 ? void 0 : Params[AgentAssistConfigACPParamsKeys.OVERALL_SUBCARD]) || ((Params === null || Params === void 0 ? void 0 : Params[AgentAssistConfigACPParamsKeys.GUIDANCE_FEEDBACK_CARDS]) && ((Params === null || Params === void 0 ? void 0 : Params[AgentAssistConfigACPParamsKeys.PUBLIC_FEEDBACK]) || (Params === null || Params === void 0 ? void 0 : Params[AgentAssistConfigACPParamsKeys.PRIVATE_FEEDBACK]))) || knowledgeHubFeedbackEnabled;
                                    if (showComprehensiveCard) {
                                        store.dispatch(CcfCopilotActions.generateComprehensiveCard({ caseId: digitalContact.caseId, generateComprehensiveCard: true }));
                                    }
                                }
                                // Remove associated data for the specific caseId from Copilot IndexedDB and Redux
                                store.dispatch(CcfCopilotActions.clearCopilotCaseFromIndexedDb(digitalContact.caseId));
                            }
                        }
                        break;
                    case CXoneDigitalEventType.CASE_INBOX_UNASSIGNED: {
                        if (digitalContact === null || digitalContact === void 0 ? void 0 : digitalContact.caseId) {
                            const cxoneCcActivitySearch = store.getState().CcfCustomerCard.activitySearch;
                            const activityData = store.getState().CcfCustomerCard.activity;
                            const availableCustomEvent = store.getState().CcfCustomerCard.customEventData;
                            /*
                              Trigger DataMemo and Timeline
                            */
                            const cxoneCcActivityConfig = LocalStorageHelper.getItem(StorageKeys.CXONE_ACTIVITY_CONFIG, true) || [];
                            // AW-41031
                            const selectedInteractionId = digitalContact.interactionId;
                            const activeContact = selectedInteractionId &&
                                ((_18 = store.getState().inbox.cxoneInteractions[selectedInteractionId]) === null || _18 === void 0 ? void 0 : _18.digitalContacts[store.getState().inbox.cxoneInteractions[selectedInteractionId].selectedContactId]);
                            const currentUser = LocalStorageHelper.getItem(StorageKeys.USER_INFO, true) || {};
                            const digitalContactDetails = (_19 = store.getState().inbox) === null || _19 === void 0 ? void 0 : _19.cxoneDigitalContactDetails;
                            const voiceContactDetails = (_20 = store.getState().inbox) === null || _20 === void 0 ? void 0 : _20.cxoneVoiceContactDetails;
                            const contactDetails = (_21 = digitalContactDetails === null || digitalContactDetails === void 0 ? void 0 : digitalContactDetails[activeContact === null || activeContact === void 0 ? void 0 : activeContact.interactionId]) === null || _21 === void 0 ? void 0 : _21[activeContact === null || activeContact === void 0 ? void 0 : activeContact.caseId];
                            const getCxoneRoutingQueuId = store.getState().ccfAgentContactHistory.routingQueueIds;
                            const activitySearch = cxoneCcActivitySearch === null || cxoneCcActivitySearch === void 0 ? void 0 : cxoneCcActivitySearch.find((item) => ((activeContact === null || activeContact === void 0 ? void 0 : activeContact.media) === MediaType.DIGITAL) ? item.ContactID === (activeContact === null || activeContact === void 0 ? void 0 : activeContact.caseId) : item.ContactID === (activeContact === null || activeContact === void 0 ? void 0 : activeContact.contactId));
                            const activityConfig = cxoneCcActivityConfig === null || cxoneCcActivityConfig === void 0 ? void 0 : cxoneCcActivityConfig.find((item) => ((activeContact === null || activeContact === void 0 ? void 0 : activeContact.media) === MediaType.DIGITAL) ? item.ContactID === (activeContact === null || activeContact === void 0 ? void 0 : activeContact.caseId) : item.ContactID === (activeContact === null || activeContact === void 0 ? void 0 : activeContact.contactId));
                            const selectedActivityConfig = activitySearch || activityConfig;
                            if (selectedActivityConfig) {
                                const selectedActivityData = activityData === null || activityData === void 0 ? void 0 : activityData.filter((item) => {
                                    return (item === null || item === void 0 ? void 0 : item.contactId) === (contactDetails === null || contactDetails === void 0 ? void 0 : contactDetails.caseId);
                                });
                                const timelineDataMappingfromLS = CXoneAgentIntegrationTransformer.cxoneRemoveTimelineDMInfo(activeContact, activityData, cxoneCcActivitySearch, availableCustomEvent);
                                store.dispatch(updateActivityData(timelineDataMappingfromLS));
                                const workflowPayload = CXoneAgentIntegrationTransformer.cxoneExecuteTimelineDataMapping(activeContact, {}, selectedActivityData[0], selectedActivityConfig, activeContact, digitalContactDetails, getCxoneRoutingQueuId, currentUser, voiceContactDetails);
                                store.dispatch(invokeTimelineAndDataMemo(workflowPayload));
                            }
                            const availableActivity = activityData.filter((item) => {
                                return (item === null || item === void 0 ? void 0 : item.contactId) !== (digitalContact === null || digitalContact === void 0 ? void 0 : digitalContact.caseId);
                            });
                            const agentWorkflowDetailsFromLS = getAgentWorkflowDetailsFromLS([StorageKeys.CUSTOMEVENT_DATA, StorageKeys.CXONE_ACTIVITY_CONFIG, StorageKeys.AGENT_WORKFLOW_CONFIGURATION_EVENT, StorageKeys.CRM_PIN_RECORDS, StorageKeys.AGENT_WORKFLOW_EVENT, StorageKeys.CC_LINKED_ACTIVITIES]);
                            /*
                              updates/removes the activity data in slice when digital case gets unassigned from agent's inbox
                            */
                            store.dispatch(CcfCustomerCardActions.updateActivityInformation(availableActivity));
                            const activitySearchData = (!cxoneCcActivitySearch || cxoneCcActivitySearch.length === 0) ? agentWorkflowDetailsFromLS.cxone_activity_config : cxoneCcActivitySearch;
                            const availableActivityConfig = activitySearchData && activitySearchData instanceof Array && (activitySearchData === null || activitySearchData === void 0 ? void 0 : activitySearchData.filter((item) => {
                                return (item === null || item === void 0 ? void 0 : item.ContactID) !== (digitalContact === null || digitalContact === void 0 ? void 0 : digitalContact.caseId);
                            }));
                            /*
                              updates/removes the activity configuration(workflowID and configurationID) in slice when digital case gets unassigned from agent's inbox
                            */
                            store.dispatch(CcfCustomerCardActions.updateActivitySearchInformation(availableActivityConfig));
                            LocalStorageHelper.setItem(StorageKeys.CXONE_ACTIVITY_CONFIG, availableActivityConfig);
                            const linkedActivitiesFromLS = agentWorkflowDetailsFromLS.cc_linked_activities;
                            delete linkedActivitiesFromLS[digitalContact === null || digitalContact === void 0 ? void 0 : digitalContact.caseId];
                            LocalStorageHelper.setItem(StorageKeys.CC_LINKED_ACTIVITIES, linkedActivitiesFromLS);
                            const availableCustomEventData = availableCustomEvent.filter((item) => {
                                return (digitalContact === null || digitalContact === void 0 ? void 0 : digitalContact.contactID) ? (item === null || item === void 0 ? void 0 : item.contactId) !== (digitalContact === null || digitalContact === void 0 ? void 0 : digitalContact.contactID) : (item === null || item === void 0 ? void 0 : item.contactId) !== (digitalContact === null || digitalContact === void 0 ? void 0 : digitalContact.caseId);
                            });
                            const screenPopDetails = agentWorkflowDetailsFromLS.customeventData;
                            const isScreenPopDetails = screenPopDetails instanceof Array && (screenPopDetails === null || screenPopDetails === void 0 ? void 0 : screenPopDetails.filter((item) => {
                                return (digitalContact === null || digitalContact === void 0 ? void 0 : digitalContact.contactID) ? (item === null || item === void 0 ? void 0 : item.contactId) !== (digitalContact === null || digitalContact === void 0 ? void 0 : digitalContact.contactID) : (item === null || item === void 0 ? void 0 : item.contactId) !== (digitalContact === null || digitalContact === void 0 ? void 0 : digitalContact.caseId);
                            }));
                            /**
                             * StorageKeys.CUSTOMEVENT_DATA used to keep track of data on CXI when screen is refreshed.
                             */
                            LocalStorageHelper.setItem(StorageKeys.CUSTOMEVENT_DATA, isScreenPopDetails);
                            store.dispatch(CcfCustomerCardActions.removeStoredCustomEvent(availableCustomEventData));
                            const agentWorkflowEventDetails = agentWorkflowDetailsFromLS.agentWorkflowEvent;
                            const isAgentWorkflowEventDetails = agentWorkflowEventDetails instanceof Array && (agentWorkflowEventDetails === null || agentWorkflowEventDetails === void 0 ? void 0 : agentWorkflowEventDetails.filter((item) => {
                                return (digitalContact === null || digitalContact === void 0 ? void 0 : digitalContact.contactID) ? item.contactId !== (digitalContact === null || digitalContact === void 0 ? void 0 : digitalContact.contactID) : item.contactId !== (digitalContact === null || digitalContact === void 0 ? void 0 : digitalContact.caseId);
                            }));
                            LocalStorageHelper.setItem(StorageKeys.AGENT_WORKFLOW_EVENT, isAgentWorkflowEventDetails);
                            const agentWorkflowConfigurationDetails = agentWorkflowDetailsFromLS.agentWorkflowConfigurationEvent;
                            const isAgentWorkflowConfigurationEventDetails = agentWorkflowConfigurationDetails instanceof Array && (agentWorkflowConfigurationDetails === null || agentWorkflowConfigurationDetails === void 0 ? void 0 : agentWorkflowConfigurationDetails.filter((item) => {
                                return (digitalContact === null || digitalContact === void 0 ? void 0 : digitalContact.contactID) ? item.contactId !== (digitalContact === null || digitalContact === void 0 ? void 0 : digitalContact.contactID) : item.contactId !== (digitalContact === null || digitalContact === void 0 ? void 0 : digitalContact.caseId);
                            }));
                            LocalStorageHelper.setItem(StorageKeys.AGENT_WORKFLOW_CONFIGURATION_EVENT, isAgentWorkflowConfigurationEventDetails);
                            /**
                             * Localstorage clearing for pin Records.
                             */
                            const pinRecordsDetails = agentWorkflowDetailsFromLS.crmPinRecords;
                            const isPinRecordsDetails = pinRecordsDetails instanceof Array && (pinRecordsDetails === null || pinRecordsDetails === void 0 ? void 0 : pinRecordsDetails.filter((item) => {
                                return (digitalContact === null || digitalContact === void 0 ? void 0 : digitalContact.contactID) ? (item === null || item === void 0 ? void 0 : item.contactId) !== (digitalContact === null || digitalContact === void 0 ? void 0 : digitalContact.contactID) : (item === null || item === void 0 ? void 0 : item.contactId) !== (digitalContact === null || digitalContact === void 0 ? void 0 : digitalContact.caseId);
                            }));
                            LocalStorageHelper.setItem(StorageKeys.CRM_PIN_RECORDS, isPinRecordsDetails);
                            // Remove disposition from store & local storage
                            store.dispatch(dispositionInteractionActions.clearDispositionById(digitalContact.caseId));
                            removedDispositionFromLocalStorage(digitalContact === null || digitalContact === void 0 ? void 0 : digitalContact.caseId);
                            //remove rejected reason from store
                            const isRejectedReasonEnabled = isFeatureEnabled("release-cx-agent-Approval-flow-copy-reject-message-AW-47882" /* FeatureToggles.COPY_REJECT_MESSAGE_BUTTON */);
                            if (isRejectedReasonEnabled) {
                                store.dispatch(CcfRejectedReasonAction.resetRejectedReasonState({ caseId: digitalContact === null || digitalContact === void 0 ? void 0 : digitalContact.caseId }));
                            }
                        }
                        //check if ACP is enabled
                        if (isAgentCopilotEnabled) {
                            // Remove associated data for the specific caseId from Copilot IndexedDB and Redux
                            store.dispatch(CcfCopilotActions.clearCopilotCaseFromIndexedDb(digitalContact.caseId));
                        }
                        // Defocus if the unassigned case is currently focused
                        const currentFocusedContact = LocalStorageHelper.getItem(StorageKeys.FOCUSED_CONTACT_ID);
                        if (currentFocusedContact && currentFocusedContact === digitalContact.caseId) {
                            LocalStorageHelper.removeItem(StorageKeys.FOCUSED_CONTACT_ID);
                            LocalStorageHelper.removeItem(StorageKeys.FOCUSED_CONTACT_MEDIA_TYPE);
                            store.dispatch(deFocusContact(digitalContact.caseId));
                        }
                        store.dispatch(CcfAssignmentAction.handleCaseUnassignedDigitalContactEvent(digitalContact));
                        // remove notified contact from redux store during the contact unassigned event
                        store.dispatch(removeNotifiedEvent({ id: digitalContact === null || digitalContact === void 0 ? void 0 : digitalContact.contactID, status: digitalContact.status, skillName: digitalContact.skillName }));
                        //ensure outcomes panel closes when case is unassigned by workflow automation
                        store.dispatch(dispositionInteractionActions.displayDispositionCard(false));
                        break;
                    }
                    case CXoneDigitalEventType.CASE_INBOX_ASSIGNED:
                        digitalContact.attachments = LocalStorageHelper.getItem('digital_attachments_' + digitalContact.caseId, true);
                        store.dispatch(handleCXoneAudioVisualNotification({ type: NotificationType.INCOMING_DIGITAL_INTERACTION, payload: digitalContact }));
                        if (((_22 = digitalContact === null || digitalContact === void 0 ? void 0 : digitalContact.case) === null || _22 === void 0 ? void 0 : _22.interactionId) || (digitalContact === null || digitalContact === void 0 ? void 0 : digitalContact.isAssignedToAgentInbox)) {
                            store.dispatch(CcfAssignmentAction.handleCaseAssignedDigitalContactEvent(digitalContact));
                            if (((_23 = digitalContact === null || digitalContact === void 0 ? void 0 : digitalContact.case) === null || _23 === void 0 ? void 0 : _23.customFields) && ((_24 = digitalContact === null || digitalContact === void 0 ? void 0 : digitalContact.case) === null || _24 === void 0 ? void 0 : _24.customFields.length) > 0) {
                                const finalCustomFields = {
                                    customFields: (_25 = digitalContact === null || digitalContact === void 0 ? void 0 : digitalContact.case) === null || _25 === void 0 ? void 0 : _25.customFields,
                                    id: digitalContact === null || digitalContact === void 0 ? void 0 : digitalContact.caseId,
                                };
                                store.dispatch(CcfCaseCustomFieldAction.storeCaseCustomField(finalCustomFields));
                            }
                            const currentPreviewCases = LocalStorageHelper.getItem(PREVIEW_CASES, true) || [];
                            // Filter out current caseId (cleanup happens after focus)
                            const previewCaseIds = currentPreviewCases || [];
                            const wasPreviewACase = LocalStorageHelper.getItem(UIStorageKeys.DIGITAL_PREVIEW_CONTACT, true) || false;
                            const shouldFocusAfterAssignment = (wasPreviewACase || previewCaseIds.includes(digitalContact === null || digitalContact === void 0 ? void 0 : digitalContact.caseId)) && !!digitalContact.isCaseAssigned && !!digitalContact.isAssignedToAgentInbox;
                            const isCurrentlyFocusedCase = LocalStorageHelper.getItem(StorageKeys.FOCUSED_CONTACT_ID) === digitalContact.caseId;
                            if (shouldFocusAfterAssignment && digitalContact.caseId && isCurrentlyFocusedCase) {
                                store.dispatch(focusContact(digitalContact.caseId));
                                LocalStorageHelper.setItem(StorageKeys.FOCUSED_CONTACT_ID, digitalContact.caseId);
                                LocalStorageHelper.setItem(StorageKeys.FOCUSED_CONTACT_MEDIA_TYPE, MediaType.DIGITAL);
                                LocalStorageHelper.removeItem(UIStorageKeys.DIGITAL_PREVIEW_CONTACT);
                            }
                            (digitalContact === null || digitalContact === void 0 ? void 0 : digitalContact.isAssignedToAgentInbox) && LocalStorageHelper.setItem(PREVIEW_CASES, previewCaseIds.filter((caseId) => caseId !== digitalContact.caseId));
                        }
                        else {
                            const currentPreviewCases = LocalStorageHelper.getItem(PREVIEW_CASES, true) || [];
                            const updatedPreviewCases = currentPreviewCases.filter(caseId => caseId !== (digitalContact === null || digitalContact === void 0 ? void 0 : digitalContact.caseId)); // We are removing caseId(that do not have InteractionId) from local storage to avoid toast messages on page reload.
                            LocalStorageHelper.setItem(PREVIEW_CASES, updatedPreviewCases);
                            //For older digital cases, we are not getting cxone interaction id
                            //As per our current schema, CXA inbox would fail to show the contacts, hence graceful toast message added as per product suggestion
                            const digitalSearchErrorToast = {
                                isError: true,
                                messageKey: 'previewNotSupported',
                                placeHolder: 'previewNotSupported',
                            };
                            store.dispatch(ccfDigitalSearchActions.updateDigitalSearchToastObj(digitalSearchErrorToast));
                        }
                        if (isAgentCopilotEnabled) {
                            if (((_26 = digitalContact === null || digitalContact === void 0 ? void 0 : digitalContact.case) === null || _26 === void 0 ? void 0 : _26.customFields) && ((_27 = digitalContact === null || digitalContact === void 0 ? void 0 : digitalContact.case) === null || _27 === void 0 ? void 0 : _27.customFields.length) > 0) {
                                const copilotCustomFields = (_28 = digitalContact === null || digitalContact === void 0 ? void 0 : digitalContact.case) === null || _28 === void 0 ? void 0 : _28.customFields.filter(field => (field === null || field === void 0 ? void 0 : field.ident) === 'agentassistconfig');
                                if (copilotCustomFields.length > 0) {
                                    // Fire and forget - don't block execution for config storage
                                    CXoneClient.instance.copilotService.resolveAgentAssistConfig(digitalContact.caseId)
                                        .catch((error) => {
                                        const logger = new Logger('acdSession', 'onDigitalContactEvent');
                                        logger.error('resolveAgentAssistConfig', JSON.stringify(error));
                                    });
                                    // Establish copilot connection for the case
                                    CXoneClient.instance.connectCopilotWebSocket();
                                }
                            }
                        }
                        break;
                }
            }
            else if (digitalContact.status === 'Incoming') {
                store.dispatch(handleCXoneAudioVisualNotification({ type: NotificationType.INCOMING_DIGITAL_INTERACTION, payload: digitalContact }));
                store.dispatch(CcfAssignmentAction.handleIncomingDigitalContactSdkEvent(digitalContact));
            }
            const eventArgs = {};
            eventArgs.detail = digitalContact;
            const customEvent = new CustomEvent(CXoneAgentEvents.CXONE_DIGITAL_CONTACT_EVENT, eventArgs);
            window.dispatchEvent(customEvent);
        }));
        (_f = CXoneDigitalClient.instance.digitalContactManager.onDigitalWsNotificationEvent) === null || _f === void 0 ? void 0 : _f.subscribe((connectionStateResponse) => {
            toast.dismiss(); // Dismissing existing toast, if any
            store.dispatch(digitalWsNetworkStateNotification(connectionStateResponse));
        });
        CXoneAcdClient.instance.contactManager.conferenceCallEvent.subscribe((conferenceNo) => {
            if (conferenceNo > '0') {
                store.dispatch(callConferenceActions.setConferenceNo(conferenceNo));
                store.dispatch(CcfAssignmentAction.setIsActiveConference(true));
            }
        });
        CXoneAcdClient.instance.contactManager.voiceContactUpdateEvent.subscribe((cxoneContact) => {
            var _a, _b;
            store.dispatch(handleCXoneAudioVisualNotification({ type: NotificationType.INCOMING_VOICE_INTERACTION, payload: cxoneContact }));
            store.dispatch(CcfAssignmentAction.handleCXoneVoiceContactSubscription(cxoneContact));
            const eventArgs = {};
            eventArgs.detail = cxoneContact;
            const customEvent = new CustomEvent(CXoneAgentEvents.CXONE_VOICE_CONTACT_EVENT, eventArgs);
            window.dispatchEvent(customEvent);
            const { isAgentCopilotEnabled } = store.getState().global;
            isVoiceTranscriptEnabledAndToggledOn().then((isEnabled) => {
                var _a, _b, _c;
                if (isEnabled) {
                    const transcriptionStatuses = [
                        VoiceContactStatus.MASKING,
                        VoiceContactStatus.HOLDING,
                        TranscriptionStatus.RESUMED,
                        TranscriptionStatus.UNMASKED
                    ];
                    const contactStatus = cxoneContact.status.toLowerCase();
                    const transcriptionState = store.getState().voiceTranscription;
                    let transcriptStatus = contactStatus;
                    // On refresh we need to check in index db if any voice transcription event is present for the contact
                    if (!cxoneContact.finalState) {
                        CXoneClient.instance.agentAssistWSService.agentAssistProcessorService.getAgentAssistGetNextForContactIdFromIndexDb(cxoneContact.contactID).then((aaEvents) => {
                            aaEvents.forEach(event => {
                                if ((event === null || event === void 0 ? void 0 : event.subCategory) === GetNextEventSubCategory.VOICE_TRANSCRIPT) {
                                    store.dispatch(CcfVoiceTranscriptionActions.setVoiceTranscriptionEventReceived({ contactId: cxoneContact.contactID, value: true }));
                                }
                            });
                        });
                    }
                    // If we recieve ACTIVE status and previous status is HOLDING or MASKING then we need to set status RESUMED or UNMASKED respectively
                    if (contactStatus === VoiceContactStatus.ACTIVE) {
                        const contactTranscript = (_a = transcriptionState === null || transcriptionState === void 0 ? void 0 : transcriptionState.voiceTranscriptItems) === null || _a === void 0 ? void 0 : _a[cxoneContact.contactID];
                        const previousTranscriptStatusItem = (contactTranscript === null || contactTranscript === void 0 ? void 0 : contactTranscript.length)
                            ? contactTranscript.findLast((transcriptItem) => transcriptItem.type === VoiceTranscriptionItemType.STATUS)
                            : undefined;
                        if ((previousTranscriptStatusItem === null || previousTranscriptStatusItem === void 0 ? void 0 : previousTranscriptStatusItem.type) === VoiceTranscriptionItemType.STATUS) {
                            if (previousTranscriptStatusItem.data.status === VoiceContactStatus.HOLDING) {
                                transcriptStatus = TranscriptionStatus.RESUMED;
                            }
                            else if (previousTranscriptStatusItem.data.status === VoiceContactStatus.MASKING) {
                                transcriptStatus = TranscriptionStatus.UNMASKED;
                            }
                        }
                    }
                    const lastStateChangeTime = new Date(cxoneContact.lastStateChangeTime);
                    const duplicateStatus = (_c = (_b = transcriptionState === null || transcriptionState === void 0 ? void 0 : transcriptionState.voiceTranscriptItems) === null || _b === void 0 ? void 0 : _b[cxoneContact.contactID]) === null || _c === void 0 ? void 0 : _c.find((transcriptionItem) => {
                        if (transcriptionItem.type === VoiceTranscriptionItemType.STATUS) {
                            const data = transcriptionItem.data;
                            return ((data === null || data === void 0 ? void 0 : data.status) === transcriptStatus &&
                                new Date(data === null || data === void 0 ? void 0 : data.timestamp).getTime() === lastStateChangeTime.getTime());
                        }
                        return false;
                    });
                    if (transcriptionStatuses.includes(transcriptStatus) && !duplicateStatus) {
                        const transcriptItem = {
                            contactId: cxoneContact.contactID,
                            type: VoiceTranscriptionItemType.STATUS,
                            data: { status: transcriptStatus, timestamp: lastStateChangeTime.toISOString() },
                        };
                        store.dispatch(CcfVoiceTranscriptionActions.setTranscript({ contactId: cxoneContact.contactID, transcriptItem }));
                        store.dispatch(setIndexedDBTranscript({ contactId: cxoneContact.contactID, transcriptItem }));
                    }
                }
            });
            //screnn pop for ob call
            let screenPopItem;
            if (SessionStorageHelper.getItem(StorageKeys.CLICK_TO_DIAL_DATA)) {
                screenPopItem = JSON.parse(SessionStorageHelper.getItem(StorageKeys.CLICK_TO_DIAL_DATA));
                const phoneNumber = screenPopItem.value.toString().replace(CcfRegexPatterns.specialCharFormat, '');
                if (cxoneContact.status.toLowerCase() === VoiceContactStatus.DIALING && screenPopItem && phoneNumber === cxoneContact.dnis) {
                    const eventArgs = {};
                    const params = {
                        type: screenPopItem.entity,
                        id: screenPopItem.entityId,
                    };
                    eventArgs.detail = { activityRecord: params, contactId: cxoneContact.contactID,
                    };
                    const customEvent = new CustomEvent(CXoneAgentEvents.CXONE_SCREEN_POP_EVENT, eventArgs);
                    window.dispatchEvent(customEvent);
                    SessionStorageHelper.removeItem(StorageKeys.CLICK_TO_DIAL_DATA);
                }
            }
            // This condition has been added to call consult/transfer API only once we receive holding event from get-next
            const { isColdTransferClicked, agent, isConsultCallByAgentIdClicked, isConsultCallBySkillIdClicked, externalNumberAttributes, isMergeContactClicked, initiateColdTransfer } = store.getState().callConference;
            /**
             * Function to add Agent or skill or External Number
             * @example dialNewContact()
            */
            const dialContact = () => {
                if (isConsultCallByAgentIdClicked) {
                    store.dispatch(addConsultAgentByAgentId({ voiceContact: cxoneContact, agent: agent }));
                    store.dispatch(callConferenceActions.consultCallByAgentBtnClicked({ isConsultCallByAgentIdClicked: false, agent: agent }));
                }
                else if (isConsultCallBySkillIdClicked) {
                    store.dispatch(addConsultAgentBySkillId({ voiceContact: cxoneContact, agent: agent }));
                    store.dispatch(callConferenceActions.consultCallBySkillBtnClicked({ isConsultCallBySkillIdClicked: false, agent: agent }));
                }
                else if (externalNumberAttributes === null || externalNumberAttributes === void 0 ? void 0 : externalNumberAttributes.isExternalNumberDialed) {
                    store.dispatch(dialExternalNumber({
                        skillId: externalNumberAttributes.skillId,
                        phoneNumber: externalNumberAttributes.phoneNumber,
                        triggerType: externalNumberAttributes.triggerType,
                    }));
                    store.dispatch(callConferenceActions.dialExternalContact({
                        isExternalNumberDialed: false,
                        voiceContact: externalNumberAttributes.voiceContact,
                        skillId: externalNumberAttributes.skillId,
                        phoneNumber: externalNumberAttributes.phoneNumber,
                        triggerType: externalNumberAttributes.triggerType,
                    }));
                }
                else if (isMergeContactClicked) {
                    store.dispatch(conferenceCall());
                    store.dispatch(callConferenceActions.setIsMergeContact(false));
                }
            };
            const conferenceNo = store.getState().callConference.conferenceNo;
            const usersInConference = store.getState().inbox.callConferenceDetails.usersInConference;
            if (cxoneContact.status.toLowerCase() === VoiceContactStatus.DISCONNECTED) {
                CcfCustomerCardCreate.controller.service.localStorage.removeListByInteraction(cxoneContact.contactID);
                const isVoiceBioHubEnabled = isVoiceBioHubFeatureEnabled() && FeatureToggleService.instance.getFeatureToggleSync("release-agent-voiceBioHub-AW-24969" /* FeatureToggles.VOICE_BIO_HUB_FEATURE_TOGGLE */);
                if (isVoiceBioHubEnabled) {
                    const acdInteractions = store.getState().inbox.cxoneInteractions[cxoneContact.interactionId] && Object.keys((_a = store.getState().inbox.cxoneInteractions[cxoneContact.interactionId]) === null || _a === void 0 ? void 0 : _a.acdContacts);
                    const isLastCallEnded = acdInteractions && acdInteractions.length === 1 && cxoneContact.contactID === acdInteractions[0];
                    if (isLastCallEnded) {
                        store.dispatch(CcfAssignmentAction.setVoiceBioHubData({
                            voiceBioHubStatus: '',
                            voiceBioHubStatusMessage: '',
                            isSuccessVoiceBioHubResponseType: false,
                            voiceBioHubCurrentRequestType: 0,
                            voiceBioHubPatronId: '',
                        }));
                        store.dispatch(CcfAssignmentAction.setVoiceBioIsSilentANIAuth((false)));
                        store.dispatch(CcfAssignmentAction.setVoiceBioIsRetryRequest((false)));
                    }
                }
                const { isExternalDirectoryTransfer } = store.getState().inbox;
                if (isExternalDirectoryTransfer) {
                    store.dispatch(CcfAssignmentAction.setExternalDirectoryTransfer(false));
                }
                const usersInHold = usersInConference.filter((o) => o.contact.status.toLowerCase() === VoiceContactStatus.HOLDING);
                if (usersInConference.length <= 1 && conferenceNo) {
                    store.dispatch(callConferenceActions.setConferenceNo());
                    store.dispatch(CcfAssignmentAction.setIsActiveConference(false));
                    store.dispatch(callConferenceActions.setConferenceStatus());
                }
                else if (conferenceNo && usersInHold.length === 1 && usersInConference.length >= 2) {
                    store.dispatch(CcfAssignmentAction.setUsersInConsult(usersInHold[0]));
                }
                store.dispatch(agentWemNotificationsActions.removeRecordingNotification());
                //check if ACP is enabled
                if (isAgentCopilotEnabled) {
                    const { getAgentAssistConfig } = CXoneClient.instance.copilotService;
                    const aahConfiguration = getAgentAssistConfig && getAgentAssistConfig(`${cxoneContact === null || cxoneContact === void 0 ? void 0 : cxoneContact.contactID}`, true);
                    const { Params } = aahConfiguration || {};
                    const enableInputJsonFile = Params === null || Params === void 0 ? void 0 : Params[AgentAssistConfigACPParamsKeys.ENABLE_INPUT_JSON_FILE];
                    const knowledgeHubFeedbackEnabled = enableInputJsonFile && ((_b = Params === null || Params === void 0 ? void 0 : Params[AgentAssistConfigACPParamsKeys.KNOWLEDGE_HUB_CONFIG]) === null || _b === void 0 ? void 0 : _b.feedbackEnabled);
                    const showComprehensiveCard = (Params === null || Params === void 0 ? void 0 : Params[AgentAssistConfigACPParamsKeys.OVERALL_SUBCARD]) || ((Params === null || Params === void 0 ? void 0 : Params[AgentAssistConfigACPParamsKeys.GUIDANCE_FEEDBACK_CARDS]) && ((Params === null || Params === void 0 ? void 0 : Params[AgentAssistConfigACPParamsKeys.PUBLIC_FEEDBACK]) || (Params === null || Params === void 0 ? void 0 : Params[AgentAssistConfigACPParamsKeys.PRIVATE_FEEDBACK]))) || knowledgeHubFeedbackEnabled;
                    if (showComprehensiveCard) {
                        store.dispatch(CcfCopilotActions.generateComprehensiveCard({ caseId: cxoneContact === null || cxoneContact === void 0 ? void 0 : cxoneContact.contactID, generateComprehensiveCard: true }));
                    }
                }
            }
            if (cxoneContact.status.toLowerCase() === VoiceContactStatus.HOLDING) {
                if (isColdTransferClicked) {
                    store.dispatch(dialCallAndColdTransfer({ voiceContact: cxoneContact, agent: agent }));
                    store.dispatch(callConferenceActions.coldTransferredBtnClicked({ isColdTransferClicked: false, agent: agent }));
                }
                else if (!conferenceNo) {
                    dialContact();
                }
            }
            if (cxoneContact.status.toLowerCase() === VoiceContactStatus.ACTIVE && initiateColdTransfer) {
                store.dispatch(transferCall());
                store.dispatch(callConferenceActions.initiateColdTransfer({ initiateColdTransfer: false, agent: agent }));
            }
            if (cxoneContact.status.toLowerCase() === VoiceContactStatus.JOINED ||
                (conferenceNo && cxoneContact.status.toLowerCase() === VoiceContactStatus.HOLDING)) {
                let confStatus;
                let cxoneVoiceContactsOnHold = [];
                const allInteractions = store.getState().inbox.cxoneInteractions;
                for (const [_interactionId, interactionData] of Object.entries(allInteractions)) {
                    for (const [_contactId, contact] of Object.entries(interactionData.acdContacts)) {
                        if (contact.media === MediaType.VOICE && contact.contactStatus === VoiceContactStatus.HOLDING) {
                            cxoneVoiceContactsOnHold = cxoneVoiceContactsOnHold.concat(...[contact]);
                        }
                    }
                }
                if (cxoneContact.status.toLowerCase() === VoiceContactStatus.JOINED && cxoneVoiceContactsOnHold.length === 0) {
                    confStatus = ConferenceStatus.JOINED;
                    const usersJoined = usersInConference.filter((o) => o.contact.status.toLowerCase() === VoiceContactStatus.JOINED);
                    if (usersJoined.length === usersInConference.length) {
                        store.dispatch(CcfAssignmentAction.setUsersInConsult(undefined));
                    }
                }
                else {
                    confStatus = ConferenceStatus.HOLD;
                    const usersInHold = usersInConference.filter((o) => o.contact.status.toLowerCase() === VoiceContactStatus.HOLDING);
                    if (conferenceNo && usersInHold.length === usersInConference.length) {
                        dialContact();
                    }
                    if (conferenceNo && usersInHold.length === 1 && usersInConference.length >= 3) {
                        store.dispatch(CcfAssignmentAction.setUsersInConsult(usersInHold[0]));
                    }
                }
                store.dispatch(callConferenceActions.setConferenceStatus(confStatus));
            }
            // Remove a PC call once it is disconnected and in final state
            if (cxoneContact.callType === CallType.NATURAL_CALLING && cxoneContact.status === CallContactEventStatus.DISCONNECTED && cxoneContact.finalState) {
                store.dispatch(CcfAssignmentAction.removeCXoneVoiceContact(cxoneContact));
            }
        });
        CXoneAcdClient.instance.contactManager.voiceMailContactUpdateEvent.subscribe((cxoneContact) => {
            store.dispatch(CcfAssignmentAction.handleCxoneVoiceMailContactSubscription(cxoneContact));
            store.dispatch(handleCXoneAudioVisualNotification({ type: NotificationType.INCOMING_VOICEMAIL_INTERACTION, payload: cxoneContact }));
            const eventArgs = {};
            eventArgs.detail = cxoneContact;
            const customEvent = new CustomEvent(CXoneAgentEvents.CXONE_VOICE_MAIL_CONTACT_EVENT, eventArgs);
            window.dispatchEvent(customEvent);
        });
        CXoneAcdClient.instance.contactManager.voiceMailPlayBackEvent.subscribe((playBackEvent) => {
            const voiceMailContact = store.getState().inbox.cxoneVoiceMailContactDetails;
            if ((voiceMailContact === null || voiceMailContact === void 0 ? void 0 : voiceMailContact.contactID) === playBackEvent.contactId) {
                store.dispatch(ccfVoiceMailContactPanelActions.setPlaybackEvent({ contactId: playBackEvent.contactId, playBackPaused: playBackEvent.playBackPaused, playBackPosition: playBackEvent.playBackPosition }));
            }
            if (!voiceMailContact.initialHasPlayed) {
                store.dispatch(CcfAssignmentAction.setHasInitialPlayed(true));
            }
            ;
        });
        CXoneAcdClient.instance.contactManager.workItemContactUpdateEvent.subscribe((cxoneContact) => {
            store.dispatch(CcfAssignmentAction.handleCxoneWorkItemContactSubscription(cxoneContact));
            store.dispatch(handleCXoneAudioVisualNotification({ type: NotificationType.INCOMING_WORKITEM_INTERACTION, payload: cxoneContact }));
            const eventArgs = {};
            eventArgs.detail = cxoneContact;
            const customEvent = new CustomEvent(CXoneAgentEvents.CXONE_WORKITEM_CONTACT_EVENT, eventArgs);
            window.dispatchEvent(customEvent);
            if (cxoneContact.status.toLowerCase() === WorkItemContactStatus.ACTIVE.toLowerCase()) {
                store.dispatch(CcfAssignmentAction.setSelectedInteraction(cxoneContact.contactID));
            }
        });
        CXoneClient.instance.directory.onUpdateSkillsEvent.subscribe((agentSkills) => {
            store.dispatch(agentSkillDetailsActions.setAgentSkills(agentSkills));
            agentSkills.forEach(skill => {
                if (skill.isOutbound && skill.isNaturalCallingRunning) {
                    store.dispatch(getSkillDeliveryPreferencesById(skill.skillId));
                    store.dispatch(getSkillCPAParametersById(skill.skillId));
                }
            });
        });
        CXoneClient.instance.agentSetting.mchAgentSettingsChangeEvent.subscribe((mchSetting) => {
            var _a, _b;
            store.dispatch(agentSettingsActions.setMCHSettings(mchSetting));
            const workItemCount = Object.values((_b = (_a = store.getState()) === null || _a === void 0 ? void 0 : _a.inbox) === null || _b === void 0 ? void 0 : _b.cxoneInteractions).filter((interation) => interation.interactionType === InteractionType.WORKITEM).length;
            store.dispatch(requestInteraction({ workItemCount: workItemCount, userRequest: false }));
        });
        CXoneClient.instance.skillActivityQueue.agentQueueSubject.pipe(
        // we will subscribe only when we get new data
        distinctUntilChanged((prevQueues, currQueues) => JSON.stringify(Object.values(prevQueues)) === JSON.stringify(Object.values(currQueues)))).subscribe((queues) => {
            // If Heap Performance Reload Toggle is enabled, evaluate the memory status on every agentQueueSubject event
            if (isHeapPerformanceReloadToggle) {
                if (evaluateMemoryStatus(store.getState().inbox.cxoneInteractions)) {
                    store.dispatch(globalActions.showPerformanceMonitor());
                }
                ;
            }
            // Below logic filters and updates the queueAndSkillDetails in redux store, only if there is a change in the response and the value stored in the queueAndSkillDetails
            // This is done to stop multiple updates to Redux store with same value
            const agentSkillsAndQueueDetails = store.getState().agentSkillDetails.agentSkillsAndQueueDetails;
            const queueSkillIds = Object.keys(queues);
            const agentSkillIds = Object.keys(agentSkillsAndQueueDetails);
            if (queueSkillIds || agentSkillIds) {
                store.dispatch(agentSkillDetailsActions.setQueueAndSkillDetails(queues));
                CxaExtensionAdapter.instance.sendMessageToExtension({
                    type: CcfMessageType.QueueCounterDetails,
                    data: {
                        agentSkillsAndQueueDetails: agentSkillsAndQueueDetails,
                    },
                });
            }
        });
        CXoneClient.instance.skillActivityQueue.agentQueuesDetailSubject.subscribe((res) => {
            const personalQueue = store.getState().inbox.cxonePersonalQueue;
            if (res && res.length > 0) {
                const agentId = parseInt(CXoneClient.instance.cxoneUser.getUserInfo().icAgentId);
                const filteredPersonalQueue = res.filter(card => (card.currentContactState === VoiceContactStatus.INQUEUE
                    || card.currentContactState.toLowerCase() === VoiceContactStatus.CALLBACK)
                    && card.agentId === agentId);
                // Below logic filters and updates the personalQueue in redux store, only if there is a change in the response and the value stored in the personalQueue
                // This is done to stop multiple updates to Redux store with same value
                if ((filteredPersonalQueue === null || filteredPersonalQueue === void 0 ? void 0 : filteredPersonalQueue.length) !== (personalQueue === null || personalQueue === void 0 ? void 0 : personalQueue.length)) {
                    store.dispatch(CcfAssignmentAction.setPersonalQueue(filteredPersonalQueue));
                }
                else {
                    if (!(filteredPersonalQueue === null || filteredPersonalQueue === void 0 ? void 0 : filteredPersonalQueue.every(item => personalQueue === null || personalQueue === void 0 ? void 0 : personalQueue.find((pQueue) => pQueue.contactId === item.contactId)))) {
                        store.dispatch(CcfAssignmentAction.setPersonalQueue(filteredPersonalQueue));
                    }
                }
            }
            else if ((res === null || res === void 0 ? void 0 : res.length) === 0 && (personalQueue === null || personalQueue === void 0 ? void 0 : personalQueue.length) > 0) {
                // clear personal queue if no data is returned and personal queue in redux slice is not empty
                store.dispatch(CcfAssignmentAction.setPersonalQueue([]));
            }
        });
        CXoneAcdClient.instance.notification.onUpdateMessageEvent.subscribe((notification) => {
            if (notification) {
                store.dispatch(handleCXoneAudioVisualNotification({ type: NotificationType.NEW_AGENT_MESSAGE, payload: notification }));
                store.dispatch(agentWemNotificationsActions.processAndSetACDNotifications(notification));
            }
        });
        CXoneClient.instance.cxoneApiPerformanceMetrics.subscribe(({ averageLatencyInSeconds }) => {
            store.dispatch(CcfSettingsInformationAction.setNetworkSpeed(averageLatencyInSeconds));
        });
        CXoneClient.instance.commitment.onUpdateCommitments.subscribe(() => {
            const agentId = parseInt(CXoneClient.instance.cxoneUser.getUserInfo().icAgentId);
            store.dispatch(fetchCommitments(agentId));
        });
        CXoneClient.instance.commitment.onCommitmentEvent.subscribe((commitmentDetail) => {
            store.dispatch(commitmentActions.setScheduledCommitment(commitmentDetail));
            store.dispatch(commitmentActions.removeCommitmentMessageConfirmed(false));
        });
        CXoneClient.instance.commitment.onCommitmentStatusEvent.subscribe((commitmentStatus) => {
            store.dispatch(commitmentActions.setScheduledCommitment(null));
            if (commitmentStatus.status === 'Refused') {
                store.dispatch(commitmentActions.showCommitmentForm(false));
                store.dispatch(commitmentActions.removeCommitmentMessageConfirmed(false));
            }
        });
        //This subscription is used when there is no network
        CXoneAcdClient.instance.session.networkOfflineSubject.subscribe((networkOfflineRes) => {
            var _a;
            if (networkOfflineRes === null || networkOfflineRes === void 0 ? void 0 : networkOfflineRes.retryStatus) {
                if ((networkOfflineRes === null || networkOfflineRes === void 0 ? void 0 : networkOfflineRes.totalNetworkRequestExecuted) === 1) {
                    toast.dismiss(); // to dismiss other toast messages if any
                    store.dispatch(networkOfflineError());
                }
                else if ((networkOfflineRes === null || networkOfflineRes === void 0 ? void 0 : networkOfflineRes.totalNetworkRequestExecuted) === 0) {
                    toast.dismiss(); // to dismiss other toast messages if any
                    store.dispatch(globalActions.isNetworkOffline(false)); // this is used to show the loader
                    //Initiated to clear all cache , terminate worker thread
                    CXoneAcdClient.instance.session.onAgentSessionChange.next({
                        status: AgentSessionStatus.SESSION_END,
                    });
                }
                else if ((networkOfflineRes === null || networkOfflineRes === void 0 ? void 0 : networkOfflineRes.totalNetworkRequestExecuted) > 1 && !((_a = store.getState().global) === null || _a === void 0 ? void 0 : _a.networkOfflineToastReference)) {
                    //re-show toast message if closed during system sleep
                    toast.dismiss(); // to dismiss other toast messages if any
                    store.dispatch(networkOfflineError());
                }
            }
            else {
                store.dispatch(globalActions.isNetworkOffline(false)); //this is used to show the loader
                store.dispatch(globalActions.logoutToastMessageConfirmed(false)); // to make cursor visible
                toast.dismiss();
            }
        });
        //This subscription is for the natural calling skill list event
        CXoneAcdClient.instance.session.naturalCallingSkillListSubject.subscribe((emptySkillList) => {
            toast.dismiss(); // to dismiss other toast messages if any
            store.dispatch(globalActions.updateNaturalCallingSkillListMessage(emptySkillList));
        });
        // This subscription will be called in case of Event type is SenderTypingStarted or SenderTypingEnded
        (_g = CXoneDigitalClient.instance.digitalContactManager.onDigitalContactUserTypingPreviewEvent) === null || _g === void 0 ? void 0 : _g.subscribe((eventData) => {
            var _a, _b, _c, _d;
            const currentCaseId = (_a = state$ === null || state$ === void 0 ? void 0 : state$.value.inbox) === null || _a === void 0 ? void 0 : _a.activeContactId;
            const currentThreadtId = (_b = state$ === null || state$ === void 0 ? void 0 : state$.value.inbox) === null || _b === void 0 ? void 0 : _b.activeThreadId;
            if ((eventData === null || eventData === void 0 ? void 0 : eventData.threadId) && (eventData === null || eventData === void 0 ? void 0 : eventData.threadId) === currentThreadtId) {
                switch (eventData.eventType) {
                    case CXoneDigitalEventType.SENDER_TYPING_START:
                        store.dispatch(CcfContactEditorAction.updateTypingIndicator({ caseId: currentCaseId, isMessageTypingStarted: true }));
                        store.dispatch(CcfContactEditorAction.userSentMessage({ caseId: currentCaseId, isMessageSentByCustomer: false }));
                        break;
                    case CXoneDigitalEventType.SENDER_TYPING_END:
                        store.dispatch(CcfContactEditorAction.updateTypingIndicator({ caseId: currentCaseId, isMessageTypingStarted: false }));
                        break;
                    case CXoneDigitalEventType.MESSAGE_PREVIEW:
                        store.dispatch(CcfContactEditorAction.updateIsTypingPreviewWithText({ caseId: currentCaseId, messagePreview: (_d = (_c = eventData === null || eventData === void 0 ? void 0 : eventData.message) === null || _c === void 0 ? void 0 : _c.messageContent) === null || _d === void 0 ? void 0 : _d.text }));
                        break;
                    default:
                        break;
                }
            }
        });
        //This subscription is for the hours of operation event
        CXoneAcdClient.instance.session.hoursOfOperationSubject.subscribe(() => {
            toast.dismiss(); // to dismiss other toast messages if any
            displayHoursOfOperationToast();
        });
        CxoneHeadsetClient.instance.jabraSdk.deviceCollectionService.selectedDeviceEvent.subscribe((device) => {
            store.dispatch(notificationsSettingsActions.storeCurrentHeadsetDevice(device));
            if (device.name) {
                CxoneHeadsetClient.instance.updateEventSubscribers(true);
            }
            else {
                CxoneHeadsetClient.instance.updateEventSubscribers(false);
            }
        });
        CxoneHeadsetClient.instance.jabraSdk.deviceCollectionService.availableDevicesEvent.subscribe((devices) => {
            store.dispatch(notificationsSettingsActions.storeHeadsetDeviceList(devices));
        });
        CxoneHeadsetClient.instance.jabraSdk.jabraErrorEvent.subscribe((errorType) => {
            headsetErrorToast(errorType);
        });
        CxoneHeadsetClient.instance.jabraSdk.jabraConnectAgentLegEvent.subscribe((ConnectAgentLeg) => {
            if (ConnectAgentLeg.status === JabraConnectAgentLeg.ConnectAgentLeg)
                CXoneVoiceClientWrapper.instance.connectAgentLeg(ConnectAgentLeg.agentLegId);
        });
        //This subscription is for Voice Auto summary onAutoSummaryReceived event
        (_j = (_h = CXoneClient.instance.autoSummaryService) === null || _h === void 0 ? void 0 : _h.onAutoSummaryReceived) === null || _j === void 0 ? void 0 : _j.subscribe((autoSummaryResponse) => {
            var _a;
            const autoSummary = autoSummaryResponse.data;
            store.dispatch(dispositionInteractionActions.setAutoSummaryStatus({
                contactId: autoSummaryResponse.contactId,
                status: autoSummaryResponse.type,
            }));
            if (autoSummaryResponse.type === AgentAssistCommand.message) {
                store.dispatch(dispositionInteractionActions.setAutoSummaryData({
                    messageError: autoSummary.messageError,
                    text: autoSummary.text,
                    contactId: autoSummaryResponse.contactId,
                }));
                (_a = CXoneClient.instance.autoSummaryService) === null || _a === void 0 ? void 0 : _a.disconnectWebsocket();
            }
        });
        //This subscription is for onAutoSummaryMessageNotification event
        CXoneClient.instance.autoSummaryNotificationService.onAutoSummaryMessageNotification.subscribe((agentAssistMessageResponse) => {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21, _22, _23, _24, _25, _26, _27, _28, _29, _30, _31, _32, _33, _34, _35, _36, _37, _38, _39, _40, _41, _42, _43, _44, _45, _46, _47, _48, _49, _50, _51, _52, _53, _54, _55, _56, _57, _58, _59, _60, _61, _62, _63, _64, _65, _66, _67, _68, _69, _70, _71, _72, _73, _74, _75, _76, _77, _78, _79;
            const userInfo = CXoneClient.instance.cxoneUser.getUserInfo();
            const ANI = getANI((_c = (_b = (_a = store.getState().inbox) === null || _a === void 0 ? void 0 : _a.callConferenceDetails) === null || _b === void 0 ? void 0 : _b.userInCall) === null || _c === void 0 ? void 0 : _c.contact);
            const isInbound = (_h = (_g = (_f = (_e = (_d = store.getState()) === null || _d === void 0 ? void 0 : _d.inbox) === null || _e === void 0 ? void 0 : _e.callConferenceDetails) === null || _f === void 0 ? void 0 : _f.userInCall) === null || _g === void 0 ? void 0 : _g.contact) === null || _h === void 0 ? void 0 : _h.isInbound;
            if ((agentAssistMessageResponse === null || agentAssistMessageResponse === void 0 ? void 0 : agentAssistMessageResponse.command) === AgentAssistCommand.message) {
                if ((_k = (_j = agentAssistMessageResponse === null || agentAssistMessageResponse === void 0 ? void 0 : agentAssistMessageResponse.body) === null || _j === void 0 ? void 0 : _j.data) === null || _k === void 0 ? void 0 : _k.topic.includes('voicebio')) {
                    const silentANIAuth = (_o = (_m = (_l = store.getState()) === null || _l === void 0 ? void 0 : _l.inbox) === null || _m === void 0 ? void 0 : _m.cxoneVoiceBioHubData) === null || _o === void 0 ? void 0 : _o.isSilentANIAuthentication;
                    silentANIAuth && store.dispatch(CcfAssignmentAction.setVoiceBioHubPatronId(ANI));
                    const patronId = (_q = (_p = store.getState().inbox) === null || _p === void 0 ? void 0 : _p.cxoneVoiceBioHubData) === null || _q === void 0 ? void 0 : _q.voiceBioHubPatronId;
                    const isRetry = (_s = (_r = store.getState().inbox) === null || _r === void 0 ? void 0 : _r.cxoneVoiceBioHubData) === null || _s === void 0 ? void 0 : _s.isRetry;
                    const contactId = (_w = (_v = (_u = (_t = store.getState().inbox) === null || _t === void 0 ? void 0 : _t.callConferenceDetails) === null || _u === void 0 ? void 0 : _u.userInCall) === null || _v === void 0 ? void 0 : _v.contact) === null || _w === void 0 ? void 0 : _w.contactID.toString();
                    const masterId = (_1 = (_0 = (_z = (_y = (_x = store.getState().inbox) === null || _x === void 0 ? void 0 : _x.callConferenceDetails) === null || _y === void 0 ? void 0 : _y.userInCall) === null || _z === void 0 ? void 0 : _z.contact) === null || _0 === void 0 ? void 0 : _0.masterID) === null || _1 === void 0 ? void 0 : _1.toString();
                    const voiceBioHubAgentAssist = LocalStorageHelper.getItem(StorageKeys.VOICE_BIO_HUB_AGENT_ASSIST, true);
                    if ((((_4 = (_3 = (_2 = agentAssistMessageResponse === null || agentAssistMessageResponse === void 0 ? void 0 : agentAssistMessageResponse.body) === null || _2 === void 0 ? void 0 : _2.data) === null || _3 === void 0 ? void 0 : _3.data) === null || _4 === void 0 ? void 0 : _4.requestType) === VoiceBioRequestTypes.SUBMITPERSON)) {
                        let responseType, status, messageDescription;
                        if (((_7 = (_6 = (_5 = agentAssistMessageResponse === null || agentAssistMessageResponse === void 0 ? void 0 : agentAssistMessageResponse.body) === null || _5 === void 0 ? void 0 : _5.data) === null || _6 === void 0 ? void 0 : _6.data) === null || _7 === void 0 ? void 0 : _7.personResult) === 'Enrolled') {
                            responseType = true;
                            messageDescription = '';
                            status = 'enrolled';
                            CXoneClient.instance.voiceBioHubService.voiceBioHubPatronActions({
                                agentId: userInfo.icAgentId, personId: patronId, requestType: 0, voiceBioConfigName: (_8 = voiceBioHubAgentAssist === null || voiceBioHubAgentAssist === void 0 ? void 0 : voiceBioHubAgentAssist.profileName) !== null && _8 !== void 0 ? _8 : '', contactId: contactId, CustomParams: { ANI: ANI, contactId: contactId, isInbound: isInbound, isRetry: isRetry },
                                stringParams: JSON.stringify({ ANI: ANI, contactId: contactId, masterId: masterId, isInbound: isInbound, isRetry: isRetry, params: { voiceBiometricProfileName: (_9 = voiceBioHubAgentAssist === null || voiceBioHubAgentAssist === void 0 ? void 0 : voiceBioHubAgentAssist.profileName) !== null && _9 !== void 0 ? _9 : '', providerId: (_10 = voiceBioHubAgentAssist === null || voiceBioHubAgentAssist === void 0 ? void 0 : voiceBioHubAgentAssist.providerId) !== null && _10 !== void 0 ? _10 : '', isRetry: isRetry } }),
                            });
                        }
                        else if (((_13 = (_12 = (_11 = agentAssistMessageResponse === null || agentAssistMessageResponse === void 0 ? void 0 : agentAssistMessageResponse.body) === null || _11 === void 0 ? void 0 : _11.data) === null || _12 === void 0 ? void 0 : _12.data) === null || _13 === void 0 ? void 0 : _13.personResult) === 'NotEnrolled') {
                            responseType = false;
                            messageDescription = '';
                            status = 'notEnrolled';
                        }
                        else if (((_16 = (_15 = (_14 = agentAssistMessageResponse === null || agentAssistMessageResponse === void 0 ? void 0 : agentAssistMessageResponse.body) === null || _14 === void 0 ? void 0 : _14.data) === null || _15 === void 0 ? void 0 : _15.data) === null || _16 === void 0 ? void 0 : _16.personResult) === 'OptoutSuccess') {
                            responseType = false;
                            messageDescription = (_20 = (_19 = (_18 = (_17 = agentAssistMessageResponse === null || agentAssistMessageResponse === void 0 ? void 0 : agentAssistMessageResponse.body) === null || _17 === void 0 ? void 0 : _17.data) === null || _18 === void 0 ? void 0 : _18.data) === null || _19 === void 0 ? void 0 : _19.optOutInfo) === null || _20 === void 0 ? void 0 : _20.reason;
                            status = 'optedOut';
                        }
                        if (status === 'notEnrolled' || status === 'optedOut') {
                            const voiceBioHubResponseData = {
                                isSuccessVoiceBioHubResponseType: responseType,
                                voiceBioHubStatus: status,
                                voiceBioHubCurrentRequestType: VoiceBioRequestTypes.SUBMITPERSON,
                                voiceBioHubStatusMessage: messageDescription,
                                voiceBioHubPatronId: patronId,
                            };
                            store.dispatch(CcfAssignmentAction.setVoiceBioHubData(voiceBioHubResponseData));
                        }
                    }
                    else if (((_23 = (_22 = (_21 = agentAssistMessageResponse === null || agentAssistMessageResponse === void 0 ? void 0 : agentAssistMessageResponse.body) === null || _21 === void 0 ? void 0 : _21.data) === null || _22 === void 0 ? void 0 : _22.data) === null || _23 === void 0 ? void 0 : _23.requestType) === VoiceBioRequestTypes.ENROLLMENT) {
                        let responseType, messageDescription, status;
                        if (((_26 = (_25 = (_24 = agentAssistMessageResponse === null || agentAssistMessageResponse === void 0 ? void 0 : agentAssistMessageResponse.body) === null || _24 === void 0 ? void 0 : _24.data) === null || _25 === void 0 ? void 0 : _25.data) === null || _26 === void 0 ? void 0 : _26.enrollmentResult) === 'EnrolledSuccess') {
                            responseType = true;
                            messageDescription = '';
                            status = 'enrolled';
                        }
                        else {
                            responseType = false;
                            messageDescription = 'Enrollment Failed';
                            status = 'enrollmentFailed';
                        }
                        const voiceBioHubResponseData = {
                            isSuccessVoiceBioHubResponseType: responseType,
                            voiceBioHubStatus: status,
                            voiceBioHubCurrentRequestType: VoiceBioRequestTypes.ENROLLMENT,
                            voiceBioHubStatusMessage: messageDescription,
                            voiceBioHubPatronId: patronId,
                        };
                        store.dispatch(CcfAssignmentAction.setVoiceBioHubData(voiceBioHubResponseData));
                    }
                    else if (((_29 = (_28 = (_27 = agentAssistMessageResponse === null || agentAssistMessageResponse === void 0 ? void 0 : agentAssistMessageResponse.body) === null || _27 === void 0 ? void 0 : _27.data) === null || _28 === void 0 ? void 0 : _28.data) === null || _29 === void 0 ? void 0 : _29.requestType) === VoiceBioRequestTypes.AUTHENTICATION) {
                        let responseType, status, statusDescription;
                        if (((_32 = (_31 = (_30 = agentAssistMessageResponse === null || agentAssistMessageResponse === void 0 ? void 0 : agentAssistMessageResponse.body) === null || _30 === void 0 ? void 0 : _30.data) === null || _31 === void 0 ? void 0 : _31.data) === null || _32 === void 0 ? void 0 : _32.authDecisonResult) === 'Authenticated') {
                            responseType = true;
                            status = 'voiceMatch';
                            statusDescription = ((_33 = voiceBioHubAgentAssist === null || voiceBioHubAgentAssist === void 0 ? void 0 : voiceBioHubAgentAssist.providerId) === null || _33 === void 0 ? void 0 : _33.includes('nuance')) ? 'Voice match success' : 'Re-validate voice ?';
                        }
                        else if (((_36 = (_35 = (_34 = agentAssistMessageResponse === null || agentAssistMessageResponse === void 0 ? void 0 : agentAssistMessageResponse.body) === null || _34 === void 0 ? void 0 : _34.data) === null || _35 === void 0 ? void 0 : _35.data) === null || _36 === void 0 ? void 0 : _36.authDecisonResult) === 'NoMatch') {
                            responseType = true;
                            status = 'noVoiceMatch';
                            statusDescription = 'No voice match';
                        }
                        else if (((_39 = (_38 = (_37 = agentAssistMessageResponse === null || agentAssistMessageResponse === void 0 ? void 0 : agentAssistMessageResponse.body) === null || _37 === void 0 ? void 0 : _37.data) === null || _38 === void 0 ? void 0 : _38.data) === null || _39 === void 0 ? void 0 : _39.authDecisonResult) === 'Fraud') {
                            responseType = false;
                            status = 'suspectedFraud';
                            statusDescription = 'Fraud Detected';
                        }
                        else if (((_42 = (_41 = (_40 = agentAssistMessageResponse === null || agentAssistMessageResponse === void 0 ? void 0 : agentAssistMessageResponse.body) === null || _40 === void 0 ? void 0 : _40.data) === null || _41 === void 0 ? void 0 : _41.data) === null || _42 === void 0 ? void 0 : _42.authDecisonResult) === 'Suspicious') {
                            responseType = false;
                            status = 'Suspicious';
                            statusDescription = 'Suspicious activity detected';
                        }
                        const voiceBioHubResponseData = {
                            isSuccessVoiceBioHubResponseType: responseType,
                            voiceBioHubStatus: status,
                            voiceBioHubCurrentRequestType: VoiceBioRequestTypes.AUTHENTICATION,
                            voiceBioHubStatusMessage: statusDescription,
                            voiceBioHubPatronId: patronId,
                        };
                        store.dispatch(CcfAssignmentAction.setVoiceBioHubData(voiceBioHubResponseData));
                    }
                    else if (((_45 = (_44 = (_43 = agentAssistMessageResponse === null || agentAssistMessageResponse === void 0 ? void 0 : agentAssistMessageResponse.body) === null || _43 === void 0 ? void 0 : _43.data) === null || _44 === void 0 ? void 0 : _44.data) === null || _45 === void 0 ? void 0 : _45.requestType) === VoiceBioRequestTypes.OPTOUT) {
                        let responseType, status, statusDescription;
                        if (((_48 = (_47 = (_46 = agentAssistMessageResponse === null || agentAssistMessageResponse === void 0 ? void 0 : agentAssistMessageResponse.body) === null || _46 === void 0 ? void 0 : _46.data) === null || _47 === void 0 ? void 0 : _47.data) === null || _48 === void 0 ? void 0 : _48.optOutResult) === 'OptoutSuccess') {
                            responseType = true;
                            status = 'optedOut';
                            statusDescription = (_52 = (_51 = (_50 = (_49 = agentAssistMessageResponse === null || agentAssistMessageResponse === void 0 ? void 0 : agentAssistMessageResponse.body) === null || _49 === void 0 ? void 0 : _49.data) === null || _50 === void 0 ? void 0 : _50.data) === null || _51 === void 0 ? void 0 : _51.optOutInfo) === null || _52 === void 0 ? void 0 : _52.reason;
                        }
                        const voiceBioHubResponseData = {
                            isSuccessVoiceBioHubResponseType: responseType,
                            voiceBioHubStatus: status,
                            voiceBioHubCurrentRequestType: VoiceBioRequestTypes.OPTOUT,
                            voiceBioHubStatusMessage: statusDescription,
                            voiceBioHubPatronId: patronId,
                        };
                        store.dispatch(CcfAssignmentAction.setVoiceBioHubData(voiceBioHubResponseData));
                    }
                }
                else {
                    const contactId = (_54 = (_53 = agentAssistMessageResponse === null || agentAssistMessageResponse === void 0 ? void 0 : agentAssistMessageResponse.body) === null || _53 === void 0 ? void 0 : _53.autoSummary) === null || _54 === void 0 ? void 0 : _54.sessionId;
                    const hasAutoSummaryTimedOut = (_56 = (_55 = store.getState().disposition) === null || _55 === void 0 ? void 0 : _55.dispositions[contactId]) === null || _56 === void 0 ? void 0 : _56.hasAutoSummaryTimedOut;
                    if (!hasAutoSummaryTimedOut) {
                        const autoSummaryStatusData = {
                            contactId: contactId,
                            status: agentAssistMessageResponse === null || agentAssistMessageResponse === void 0 ? void 0 : agentAssistMessageResponse.command,
                        };
                        store.dispatch(dispositionInteractionActions.setAutoSummaryStatus(autoSummaryStatusData));
                        const autoSummaryDispositonData = {
                            messageError: (_58 = (_57 = agentAssistMessageResponse === null || agentAssistMessageResponse === void 0 ? void 0 : agentAssistMessageResponse.body) === null || _57 === void 0 ? void 0 : _57.autoSummary) === null || _58 === void 0 ? void 0 : _58.messageError,
                            text: (_60 = (_59 = agentAssistMessageResponse === null || agentAssistMessageResponse === void 0 ? void 0 : agentAssistMessageResponse.body) === null || _59 === void 0 ? void 0 : _59.autoSummary) === null || _60 === void 0 ? void 0 : _60.text,
                            contactId: contactId,
                        };
                        store.dispatch(dispositionInteractionActions.setAutoSummaryData(autoSummaryDispositonData));
                        store.dispatch(dispositionInteractionActions.setisGenerateAutoSummaryRequestSent({ contactId: contactId, isSent: false }));
                        const disposition = (_61 = store.getState().disposition) === null || _61 === void 0 ? void 0 : _61.dispositions[contactId];
                        if (((_63 = (_62 = agentAssistMessageResponse === null || agentAssistMessageResponse === void 0 ? void 0 : agentAssistMessageResponse.body) === null || _62 === void 0 ? void 0 : _62.autoSummary) === null || _63 === void 0 ? void 0 : _63.messageError) === AutoSummaryErrorCode.noError && disposition) {
                            const { disposition: currentDispositionData } = (_64 = disposition.formInputs) !== null && _64 !== void 0 ? _64 : {};
                            setDispositionToLocalStorage(currentDispositionData, contactId, (_66 = (_65 = agentAssistMessageResponse === null || agentAssistMessageResponse === void 0 ? void 0 : agentAssistMessageResponse.body) === null || _65 === void 0 ? void 0 : _65.autoSummary) === null || _66 === void 0 ? void 0 : _66.text);
                        }
                    }
                }
            }
            else if ((agentAssistMessageResponse === null || agentAssistMessageResponse === void 0 ? void 0 : agentAssistMessageResponse.command) === AgentAssistCommand.subscribed) {
                if ((_68 = (_67 = agentAssistMessageResponse === null || agentAssistMessageResponse === void 0 ? void 0 : agentAssistMessageResponse.body) === null || _67 === void 0 ? void 0 : _67.topic) === null || _68 === void 0 ? void 0 : _68.includes('voicebio')) {
                    const voiceBioHubAgentAssist = LocalStorageHelper.getItem(StorageKeys.VOICE_BIO_HUB_AGENT_ASSIST);
                    const silentANIAuth = (_71 = (_70 = (_69 = store.getState()) === null || _69 === void 0 ? void 0 : _69.inbox) === null || _70 === void 0 ? void 0 : _70.cxoneVoiceBioHubData) === null || _71 === void 0 ? void 0 : _71.isSilentANIAuthentication;
                    const userInfo = CXoneClient.instance.cxoneUser.getUserInfo();
                    const voiceBioConfigName = (_73 = (_72 = JSON.parse(voiceBioHubAgentAssist)) === null || _72 === void 0 ? void 0 : _72.profileName) !== null && _73 !== void 0 ? _73 : '';
                    const contactId = (_77 = (_76 = (_75 = (_74 = store.getState().inbox) === null || _74 === void 0 ? void 0 : _74.callConferenceDetails) === null || _75 === void 0 ? void 0 : _75.userInCall) === null || _76 === void 0 ? void 0 : _76.contact) === null || _77 === void 0 ? void 0 : _77.contactID.toString();
                    store.dispatch(voiceBioHubAgentLogin({ agentId: userInfo.icAgentId, voiceBioConfigName: (_79 = (_78 = JSON.parse(voiceBioHubAgentAssist)) === null || _78 === void 0 ? void 0 : _78.profileName) !== null && _79 !== void 0 ? _79 : '', CustomParams: { ANI: ANI, contactId: contactId, isInbound: isInbound }, contactId: contactId }));
                }
            }
        });
        isRecordingNotificationPollingEnabled().then((isEnabled) => {
            if (isEnabled) {
                CXoneAcdClient.instance.contactManager.voiceCallRecordServicePollingEvent.subscribe((isVoiceContactActive) => __awaiter(void 0, void 0, void 0, function* () {
                    const isWebsocketConnected = LocalStorageHelper.getItem(StorageKeys.WEM_WS_CONNECTION_STATUS, true);
                    if (isVoiceContactActive && !isWebsocketConnected) {
                        CXoneClient.instance.notification.voiceRecordingStatusProvider.startVoiceRecordingStatusPolling();
                    }
                    else if (!isVoiceContactActive) {
                        CXoneClient.instance.notification.voiceRecordingStatusProvider.stopVoiceRecordingStatusPolling();
                    }
                }));
            }
        });
        isVoiceTranscriptEnabledAndToggledOn().then((isEnabled) => {
            if (isEnabled) {
                CXoneClient.instance.copilotNotificationClient.onVoiceTranscriptionMessage.subscribe((msg) => {
                    const transcriptItem = {
                        contactId: msg.body.data.contactId.toString(),
                        type: VoiceTranscriptionItemType.MESSAGE,
                        data: msg.body,
                    };
                    store.dispatch(CcfVoiceTranscriptionActions.setTranscript({ contactId: msg.body.data.contactId.toString(), transcriptItem }));
                    store.dispatch(setIndexedDBTranscript({ contactId: msg.body.data.contactId.toString(), transcriptItem }));
                });
                CXoneClient.instance.copilotNotificationClient.onVoiceTranscriptionError.subscribe(() => {
                    store.dispatch(CcfVoiceTranscriptionActions.setTranscriptError());
                });
                CXoneAcdClient.instance.contactManager.onVoiceTranscriptContactEndEvent.subscribe(({ contactId }) => {
                    store.dispatch(deleteIndexedDBTranscript({ contactId }));
                    store.dispatch(CcfVoiceTranscriptionActions.clearTranscript(contactId));
                });
            }
        });
        return globalActions.default();
    }));
};
//# sourceMappingURL=acdSessionEventMiddleware.js.map