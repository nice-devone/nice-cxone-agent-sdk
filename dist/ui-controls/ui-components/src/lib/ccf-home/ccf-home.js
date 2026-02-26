import { __awaiter } from "tslib";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useRef, useState, lazy, Suspense, useMemo, useCallback, memo } from 'react';
import { Alert, Box, Collapse, Grid, useTheme, useMediaQuery } from '@mui/material';
import { toast } from 'react-toastify';
import { agentDetailsByAgentId, getNonIncomingActiveContactInSelectedInteraction, selectInboxCollapsedState, getCtdDisplayError, CcfAssignmentAction, getAllInteractions, updateDigitalMessageReadStatus, voiceMailContactDetailsSelector, } from '../ccf-assignment-panel/ccf-assignment-panel.slice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom-v5-compat';
import CcfAppNavigation from '../ccf-app-navigation/ccf-app-navigation';
import { CcfContactAssignment } from '../ccf-assignment-panel/ccf-contact-assignment/ccf-contact-assignment';
import { globalActions, isCustomAttributeEnabled, isLogoutOutToastMessageState, isNetworkOfflineStatus, getAgentSettings, getSelectedMenuName, checkProductCatalogEnablementAndGetTranlationAvailableLanguages, getIsDesktopProfileFeatureEnabled, validateTenantData, } from '../global.app.slice';
import { agentDirectoryActions } from '../ccf-directory/+state/ccf-directory.slice';
import { Navigation } from '../../enums/navigation-menus';
import { LocalStorageHelper, SessionStorageHelper, ValidationUtils, StorageKeys, VoiceMailContactEventStatus, AdminService } from '@nice-devone/core-sdk';
import { useNavigationItems } from '../ccf-navigation/useNavigationItems';
import { CcfAppToastMessage, CcfLoader, useTranslator } from '@nice-devone/ui-controls';
import { setAgentState, userInfoSelector } from '../ccf-agent-state/ccf-agent-state.slice';
import { startAgentQueuePolling } from '../ccf-agent-skill/ccf-agent-skill-details-slice';
import { clearFavQuickRepliesfromIDB, setLocalStorageKey } from '../ccf-app-space/ccf-app-space.slice';
import { CcfAuthenticationActions } from '../ccf-authentication/ccf-authentication.slice';
import { CcfAppType, CXoneAgentEvents, CxaExtensionAdapter, CcfMessageType, CcfRegexPatterns, } from '@nice-devone/shared-apps-lib';
import { CXoneVoiceClientWrapper } from '../../services/cxone-voice-client-wrapper';
import { clearNotificationSettingsfromIDB, fetchAllNotificationSettings, getVisualNotification } from '../ccf-settings/ccf-notification-settings.slice';
import ReactSplit, { SplitDirection } from '@devbookhq/splitter';
import { MediaType, WorkItemContactStatus, RecordTypeName, } from '@nice-devone/common-sdk';
import { checkCreateCommitmentPermission, getRemoveCommitmentAgentSettings, isRemoveCommitmentToastMessage } from '../ccf-commitment/ccf-commitment.slice';
import { UserCustomAttributes } from '@nice-devone/auth-sdk';
import ccfHomeStyle from './ccf-home.styles';
import WrapperComponent from '../ccf-navigation/ccf-wrapper-component';
import { getPartnerPresenceSyncRule } from '../ccf-partner-presence-sync-rule/ccf-partner-presence-sync-rule.slice';
import { getAllFeatureTogglesAsync } from '../../util/featureToggleUtils';
import { CXoneAcdClient } from '@nice-devone/acd-sdk';
import CcfKeyboardNavigation from './ccf-keyboard-navigation';
import { cxoneCCActivity, CcfCustomerCardActions } from '../ccf-app-space/ccf-customer-card/ccf-customer-card.slice';
import { ccfVoiceMailContactPanelActions, voiceMailContactPanelSelector } from '../ccf-voicemail-contact/ccf-voicemail-contact-panel.slice';
import { EventKeys } from '../../enums/event-keys';
import { agentSettingsActions, getAgentProfileSettings, getIsResizeWindowFunctionCalled } from '../ccf-agent-setting/ccf-agent-setting-slice';
import { resizeWindow, storeResizeWindow } from '../../util/agentProfileUtils';
import { AgentScreenSize } from '../../enums/agent-profile-enums';
import { LvEccPreloader } from '../lv-app-space/lv-remote/lv-remote-ecc/lv-remote-ecc';
import useLVAppSpacePermission from '../lv-app-space/hooks/useLVAppSpacePermission';
import { LvDeskPreloader } from '../lv-app-space/lv-remote/lv-remote-desk/lv-remote-desk';
import { useVoiceTranscriptVisibility } from '../../hooks/useVoiceTranscriptVisibility';
import { useIsVoiceTranscriptEnabled } from '../../hooks/useVoiceTranscriptEnabled';
import { selectHasVoiceTranscriptEventBeenReceived } from '../slices/ccf-voice-transcription.slice';
import { FeatureToggleService } from '@nice-devone/agent-sdk';
const CcfCustomWorkspacePreloader = lazy(() => import('../ccf-custom-workspace-preloader/ccf-custom-workspace-preloader'));
/* eslint-disable-next-line @nice-cxone/ccf/required-tsdoc */
export function CcfHome(props) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
    const navigate = useNavigate();
    const theme = useTheme();
    const isSmView = useMediaQuery(theme.breakpoints.down('xl'));
    // Memoize expensive calculations
    const homeStyle = useMemo(() => ccfHomeStyle(theme, isSmView), [theme, isSmView]);
    const activityData = useSelector(cxoneCCActivity);
    const allInteractions = useSelector(getAllInteractions);
    const allInteractionsRef = useRef(allInteractions);
    const PHONE_CALL_OB_SKILLS = 'phone_call_ob_skills';
    const NOT_A_VALID_NUMBER = 'Not_A_Valid_Number';
    const isInboxCollapsed = useSelector(selectInboxCollapsedState);
    const selectedMenu = useSelector(getSelectedMenuName);
    const [selectedMenuProperties, setSelectedMenuProperties] = useState();
    const isLoggedOutMessageVisible = useSelector(isLogoutOutToastMessageState);
    const isRemoveCommitmentMessageVisible = useSelector(isRemoveCommitmentToastMessage);
    const ctdDisplayError = useSelector(getCtdDisplayError);
    const agentId = (_a = useSelector(userInfoSelector)) === null || _a === void 0 ? void 0 : _a.icAgentId;
    const { setSelectedMenu } = globalActions;
    const [translate] = useTranslator();
    const currentUser = JSON.parse(localStorage.getItem(StorageKeys.USER_INFO) || '{}');
    const lastLoginUserId = localStorage.getItem(StorageKeys.LAST_LOGGED_IN_AGENT_ID);
    const isAppToastVisible = isLoggedOutMessageVisible || isRemoveCommitmentMessageVisible;
    const { isLvCustomerCardEnabled, isLvDeskEnabled } = useLVAppSpacePermission();
    const navigationItemList = useNavigationItems(false, isSmView);
    const nonIncomingActiveContactInSelectedInteraction = useSelector(getNonIncomingActiveContactInSelectedInteraction);
    const isNetworkOffline = useSelector(isNetworkOfflineStatus);
    const customWorkSpaceRootRef = useRef(null);
    const isDesktopProfileFeatureEnabled = useSelector(getIsDesktopProfileFeatureEnabled);
    const customWorkSpaceAppSpaceRef = useRef(null);
    const [anchorElcustomWorkspace, setAnchorElementCustomWorkspace] = useState(null);
    const dispatch = useDispatch();
    const [Disposition, setDisposition] = useState(null);
    const properties = Object.assign({}, props.authSettings);
    const visualNotification = useSelector(getVisualNotification);
    const isBelowMd = useMediaQuery(theme.breakpoints.down('md'));
    const mediumView = useMediaQuery(theme.breakpoints.between('md', 'xl'));
    const voiceMailContact = useSelector(voiceMailContactDetailsSelector);
    const voiceMailContactPanelState = useSelector(voiceMailContactPanelSelector);
    const [voicemailPlaybackSecond, setVoiceMailPlaybackSecond] = useState((voiceMailContactPanelState === null || voiceMailContactPanelState === void 0 ? void 0 : voiceMailContactPanelState.playbackSecond) || 0);
    const voicemailIntervalId = useRef({ contactId: '', timerId: undefined });
    const ctdErrorTimeoutRef = useRef(null);
    const directorySearchTimeoutRef = useRef(null);
    const [appSpace, setAppSpace] = useState(null);
    const refInteractionSpace = useRef(null);
    const refAppSpace = useRef(null);
    const agentProfileSettings = useSelector(getAgentProfileSettings);
    const isResizeWindowCalled = useSelector(getIsResizeWindowFunctionCalled);
    const [isComponentInitialized, setIsComponentInitialized] = useState(false);
    const isSdkMsdContextSwitchEnabled = FeatureToggleService.instance.getFeatureToggleSync("release-cxa-sdk-MSD-context-switch-AW-47558" /* FeatureToggles.SDK_MSD_CONTEXT_SWITCHING */);
    const cxoneApp = (_b = props === null || props === void 0 ? void 0 : props.authSettings) === null || _b === void 0 ? void 0 : _b.app;
    // Set extension IDs for cxone agent and extension communications
    CxaExtensionAdapter.instance.cxoneExtensionId = (_d = (_c = props === null || props === void 0 ? void 0 : props.xtnData) === null || _c === void 0 ? void 0 : _c.ctdExtensionId) !== null && _d !== void 0 ? _d : '';
    CXoneVoiceClientWrapper.instance.cxoneVoiceExtensionId = (_e = props.xtnData) === null || _e === void 0 ? void 0 : _e.voiceExtensionId;
    CXoneVoiceClientWrapper.instance.cxoneNCExtensionId = (_f = props.xtnData) === null || _f === void 0 ? void 0 : _f.ncExtensionId;
    const [ControlWrapper, setControlWrapper] = useState(_jsx(Box, Object.assign({ display: "flex", justifyContent: "center", alignItems: "center", height: '50%' }, { children: _jsx(CcfLoader, { showLoadingText: false, isPrimary: true }) })));
    //This method calls the /togglesFeatures api, please do not remove this
    useEffect(() => {
        getAllFeatureTogglesAsync();
    }, []);
    useEffect(() => {
        const screenSize = agentProfileSettings === null || agentProfileSettings === void 0 ? void 0 : agentProfileSettings.agentScreenSize;
        if ((cxoneApp !== 'cxa') || (screenSize && screenSize.length && screenSize.toUpperCase() !== AgentScreenSize.DEFINED_BY_AGENT))
            return;
        /**
         * Handle window resize event to store new dimensions
         * @example handleResize()
         */
        const handleResize = () => {
            var _a, _b;
            storeResizeWindow((_a = window === null || window === void 0 ? void 0 : window.innerWidth) === null || _a === void 0 ? void 0 : _a.toString(), (_b = window === null || window === void 0 ? void 0 : window.innerHeight) === null || _b === void 0 ? void 0 : _b.toString());
        };
        window === null || window === void 0 ? void 0 : window.addEventListener('resize', handleResize);
        return () => {
            window === null || window === void 0 ? void 0 : window.removeEventListener('resize', handleResize);
        };
    }, [agentProfileSettings, cxoneApp]);
    useEffect(() => {
        var _a;
        if (isDesktopProfileFeatureEnabled && cxoneApp === 'cxa') {
            if (!isResizeWindowCalled) {
                ((_a = agentProfileSettings === null || agentProfileSettings === void 0 ? void 0 : agentProfileSettings.agentScreenSize) === null || _a === void 0 ? void 0 : _a.length) && resizeWindow(agentProfileSettings === null || agentProfileSettings === void 0 ? void 0 : agentProfileSettings.agentScreenSize);
            }
            else {
                dispatch(agentSettingsActions.setIsResizeWindowFunctionCalled(false));
            }
        }
    }, [isResizeWindowCalled, agentProfileSettings === null || agentProfileSettings === void 0 ? void 0 : agentProfileSettings.agentScreenSize, isDesktopProfileFeatureEnabled]);
    // common page load event listener, can be used by getting "isPageReloaded" state value
    useEffect(() => {
        /**
         * Handles the page load event by dispatching an action to set the page reload state.
         * Called when the window 'load' event fires or immediately if the document is already loaded.
         * @example handlePageLoad()
         */
        const handlePageLoad = () => {
            dispatch(globalActions.setPageReload(true));
        };
        if (document.readyState === 'complete') {
            handlePageLoad();
        }
        else {
            window.addEventListener('load', handlePageLoad);
        }
        return () => {
            window.removeEventListener('load', handlePageLoad);
        };
    }, []);
    const [sizes, setSizes] = useState([50, 50]);
    const appSpaceLocal = LocalStorageHelper.getItem(StorageKeys.APPSPACE_RATIO);
    // Moving the splitter render condition to top in order to use it in multiple places
    // Simplified condition in order to make it more readable.
    const isDigitalOrActiveWorkItem = useMemo(() => (nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.media) === MediaType.DIGITAL ||
        ((nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.media) === MediaType.WORKITEM &&
            (nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.contactStatus) !== WorkItemContactStatus.DISCONNECTED.toLowerCase()), [nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.media, nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.contactStatus]);
    const isVoiceTranscriptEnabled = useIsVoiceTranscriptEnabled();
    const isActiveVoiceAndTranscriptionToggleOn = (nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.media) === MediaType.VOICE
        && isVoiceTranscriptEnabled;
    const hasVoiceTranscriptEventBeenReceived = useSelector(selectHasVoiceTranscriptEventBeenReceived((nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.contactId) || ''));
    const { showTranscript, updateTranscriptVisibility } = useVoiceTranscriptVisibility();
    const isHorizontalSplitterEnabled = useMemo(() => (selectedMenuProperties === null || selectedMenuProperties === void 0 ? void 0 : selectedMenuProperties.menuName) === Navigation.INTERACTION && (isDigitalOrActiveWorkItem || (isActiveVoiceAndTranscriptionToggleOn && showTranscript && hasVoiceTranscriptEventBeenReceived)) && !isSmView, [selectedMenuProperties === null || selectedMenuProperties === void 0 ? void 0 : selectedMenuProperties.menuName, isDigitalOrActiveWorkItem, isSmView, isActiveVoiceAndTranscriptionToggleOn, showTranscript, hasVoiceTranscriptEventBeenReceived]);
    useEffect(() => {
        // this is to ensure we update the transcription visibility state when transitioning from large to small view, in the which the transcription panel is getting hidden
        if (isComponentInitialized) {
            if (isActiveVoiceAndTranscriptionToggleOn &&
                hasVoiceTranscriptEventBeenReceived &&
                isSmView &&
                (selectedMenuProperties === null || selectedMenuProperties === void 0 ? void 0 : selectedMenuProperties.menuName) !== Navigation.INTERACTION) {
                updateTranscriptVisibility(false);
            }
        }
        else {
            setIsComponentInitialized(true);
        }
    }, [isSmView]);
    useEffect(() => {
        /**
          * lazily loaded the renderCcfContactControlsWrapper
          * @example renderPublicMessrenderCcfContactControlsWrapperageDrafts()
          */
        const renderCcfContactControlsWrapper = () => __awaiter(this, void 0, void 0, function* () {
            const controlWrapper = yield import('../ccf-contact-controls-wrapper/ccf-contact-controls-wrapper');
            const CcfControlWrapper = controlWrapper === null || controlWrapper === void 0 ? void 0 : controlWrapper.CcfContactControlsWrapper;
            setControlWrapper(_jsx(CcfControlWrapper, {}));
        });
        if (isSmView) {
            renderCcfContactControlsWrapper();
        }
    }, [isSmView]);
    useEffect(() => {
        if (appSpaceLocal) {
            if (currentUser.icAgentId !== lastLoginUserId) {
                setSizes([50, 50]);
                localStorage.removeItem(StorageKeys.SORT_CRITERIA_DIGITAL);
                localStorage.removeItem(StorageKeys.SORT_ORDER_DIGITAL);
            }
            else {
                setSizes(JSON.parse(appSpaceLocal));
            }
        }
        const localStorageValue = LocalStorageHelper.getItem(StorageKeys.ISINBOXCOLLAPSED);
        let isInboxCollapsedState;
        if (!localStorageValue) {
            isInboxCollapsedState = isSmView ? true : false;
        }
        else {
            isInboxCollapsedState = JSON.parse(localStorageValue);
        }
        LocalStorageHelper.setItem(StorageKeys.ISINBOXCOLLAPSED, JSON.stringify(isInboxCollapsedState));
        dispatch(CcfAssignmentAction.updateInboxCollapsed({ isInboxCollapsed: isInboxCollapsedState, isLargeView: !isSmView }));
    }, []);
    useEffect(() => {
        const timer = setInterval(() => {
            dispatch(globalActions.setTimer(Date.now()));
        }, 1000);
        return () => clearInterval(timer);
    }, [dispatch]);
    // update the server timer offset every 10 minutes
    useEffect(() => {
        AdminService.instance.setTimeStampOffset();
        const serverTimeOffset = setInterval(() => {
            AdminService.instance.setTimeStampOffset();
        }, 600000);
        return () => clearInterval(serverTimeOffset);
    }, []);
    /* eslint-disable-next-line @nice-cxone/ccf/required-tsdoc */
    const crmScreenPopEventHandler = (event) => {
        var _a;
        if (props.authSettings.app === CcfAppType.CXoneAgent ||
            props.authSettings.app === CcfAppType.CXoneAgentBrowserExt) {
            const eventData = event.detail.activityRecord;
            let hostname;
            try {
                hostname = (_a = new URL(eventData === null || eventData === void 0 ? void 0 : eventData.url)) === null || _a === void 0 ? void 0 : _a.hostname;
            }
            catch (_err) {
                hostname = eventData === null || eventData === void 0 ? void 0 : eventData.url;
            }
            const originHostname = window.location.ancestorOrigins &&
                window.location.ancestorOrigins[0] &&
                new URL(window.location.ancestorOrigins[0]).hostname;
            if (hostname === originHostname) {
                window.parent.location.href = eventData === null || eventData === void 0 ? void 0 : eventData.url;
            }
            else {
                window.open(eventData === null || eventData === void 0 ? void 0 : eventData.url);
            }
        }
    };
    /**
     * Set the Agent State
     * @param event - Custom Event
     * @example - handleSetAgentPresenceState(event as CustomEventInit)
     */
    const handleSetAgentPresenceState = (event) => {
        dispatch(setAgentState({ selectedState: event.detail }));
    };
    /**
     * Get the CXone partner presence sync rules
     * @param param - Custom Event
     * @example - handlePresenceSyncAPICall(event as CustomEventInit)
     */
    const handlePresenceSyncAPICall = (param) => {
        dispatch(getPartnerPresenceSyncRule(param.detail)).unwrap().then((presenceSyncRule) => {
            const validationUtils = new ValidationUtils();
            if (validationUtils.isValidObject(presenceSyncRule)) {
                const eventArgs = {};
                eventArgs.detail = presenceSyncRule;
                let customEvent = new CustomEvent(CXoneAgentEvents.CXONE_PRESENCE_SYNC_EVENT, eventArgs);
                window.dispatchEvent(customEvent);
                /**
                 * NOTE: Agent state sync not happening on the first time when loaded the application, to resolve this,
                 * we manually trigger the agent state after receiving the presence sync rule from the API.
                 */
                const agentCurrentState = CXoneAcdClient.instance.agentStateService.getAgentStateDetails();
                if (validationUtils.isValidObject(agentCurrentState)) {
                    eventArgs.detail = { currentState: agentCurrentState };
                    customEvent = new CustomEvent(CXoneAgentEvents.CXONE_AGENT_STATE_CHANGE, eventArgs);
                    window.dispatchEvent(customEvent);
                }
            }
        });
    };
    /* eslint-disable-next-line @nice-cxone/ccf/required-tsdoc */
    const crmClickToDialHandler = (event) => {
        var _a;
        let number = (_a = event.detail) === null || _a === void 0 ? void 0 : _a.value;
        const SPECIALCHARREGEX = /[`~!@#$%^&*()_|\-=?;:'",.<>{}[\]\s\\/]/gi;
        number = number.replace(SPECIALCHARREGEX, '');
        if (number)
            makeOutboundCall(number, event.detail);
    };
    /**
   * function to select the contact based on interaction id and contact id in sdk
   * @param event - MessageEvent
   * @example -
   * ```
   * switchContact(event)
   * ```
   */
    const switchContact = (event) => {
        if ((event === null || event === void 0 ? void 0 : event.data['messageType']) === 'ContactSwitch') {
            const args = { detail: event === null || event === void 0 ? void 0 : event.data };
            crmSessionSwitchedHandler(args);
        }
    };
    /* eslint-disable-next-line @nice-cxone/ccf/required-tsdoc */
    const extensionClickToDialHandler = (event) => {
        if (event.data['type'] === CcfMessageType.CtdDialedNumber) {
            const number = event.data['dialedNumber'];
            makeOutboundCall(number);
        }
    };
    /**
  * function to call respective functions when post message is received
  * @param event - MessageEvent
  * @example -
  * ```
  * handlePostMessageEvent(event)
  * ```
  */
    const handlePostMessageEvent = (event) => {
        if (isSdkMsdContextSwitchEnabled) {
            switchContact(event);
        }
        extensionClickToDialHandler(event);
    };
    useEffect(() => {
        // The Presence Sync feature is currently available only for Salesforce CRM, so we are listening the Event based on below condition.
        if (properties.queryString && properties.app === 'cxa_sfdc') {
            const eventArgs = {};
            eventArgs.detail = {
                translations: translate, // pass the translate function or translation object if available
            };
            const customEvent = new CustomEvent(CXoneAgentEvents.CXONE_AGENT_HOME_INITIALIZED, eventArgs);
            window.dispatchEvent(customEvent);
            window.addEventListener(CXoneAgentEvents.CXONE_AGENT_PRESENCE_SYNC_RULE, handlePresenceSyncAPICall);
            window.addEventListener(CXoneAgentEvents.CXONE_AGENT_SET_PRESENCE_STATE, handleSetAgentPresenceState);
            return () => {
                window.removeEventListener(CXoneAgentEvents.CXONE_AGENT_PRESENCE_SYNC_RULE, handlePresenceSyncAPICall);
                window.removeEventListener(CXoneAgentEvents.CXONE_AGENT_SET_PRESENCE_STATE, handleSetAgentPresenceState);
            };
        }
        return;
    }, []);
    useEffect(() => {
        CxaExtensionAdapter.instance.sendMessageToExtension({
            type: CcfMessageType.Authenticated,
            data: { isAuth: true },
        });
        window.addEventListener('message', handlePostMessageEvent);
        window.addEventListener(CXoneAgentEvents.CXONE_SCREEN_POP_EVENT, crmScreenPopEventHandler);
        window.addEventListener(CXoneAgentEvents.CXONE_CLICK_TO_DIAL_EVENT, crmClickToDialHandler);
        window.addEventListener(CXoneAgentEvents.CXONE_SESSION_SWITCHED_EVENT, crmSessionSwitchedHandler);
        return () => {
            window.removeEventListener('message', handlePostMessageEvent, false);
            window.removeEventListener(CXoneAgentEvents.CXONE_SCREEN_POP_EVENT, crmScreenPopEventHandler);
            window.removeEventListener(CXoneAgentEvents.CXONE_CLICK_TO_DIAL_EVENT, crmClickToDialHandler);
            window.removeEventListener(CXoneAgentEvents.CXONE_SESSION_SWITCHED_EVENT, crmSessionSwitchedHandler);
        };
    }, []);
    useEffect(() => {
        if (currentUser.icAgentId !== lastLoginUserId) {
            dispatch(clearFavQuickRepliesfromIDB());
            dispatch(clearNotificationSettingsfromIDB());
        }
    }, []);
    useEffect(() => {
        if (properties.queryString && properties.app !== 'cxa')
            navigate(`${properties.queryString}`);
        else
            navigate(`?app=${properties.app}`);
        dispatch(CcfAuthenticationActions.storeAuthConfig(properties));
        dispatch(fetchAllNotificationSettings());
    }, []);
    useEffect(() => {
        const withinIframe = window.self !== window.top;
        if (withinIframe &&
            Notification.permission !== 'granted' &&
            Notification.permission !== 'denied') {
            const popupOptions = 'width=350,height=200,scrollbars=yes,toolbar=no,left=50,top=50';
            const tabOrWindow = window.open(window.location.href, 'notificationPermission', popupOptions);
            if (tabOrWindow) {
                tabOrWindow.onload = function () {
                    tabOrWindow === null || tabOrWindow === void 0 ? void 0 : tabOrWindow.focus();
                    tabOrWindow.Notification.requestPermission(function () {
                        tabOrWindow === null || tabOrWindow === void 0 ? void 0 : tabOrWindow.close();
                    });
                };
            }
        }
    }, []);
    useEffect(() => {
        if ('Notification' in window && Notification.permission === 'granted' && visualNotification.display) {
            showVisualBrowserNotification(visualNotification);
        }
    }, [visualNotification]);
    /**
    * @example - showVisualBrowserNotification(details);
    * @returns
    */
    const showVisualBrowserNotification = (details) => {
        let displayMessage = '';
        displayMessage += details.from ? `\n${translate('ani')}: ${details.from}` : '';
        displayMessage += details.customerName ? `\n${translate('customer')}: ${details.customerName}` : '';
        displayMessage += details.skillName ? `\n${translate('skill')}: ${details.skillName}` : '';
        displayMessage += details.contactId ? `\n${translate('contactID')}: ${details.contactId}` : '';
        displayMessage += details.message ? `\n${details.message}` : '';
        const eventArgs = {};
        eventArgs.detail = {
            title: translate(details.title),
            message: displayMessage,
        };
        const customEvent = new CustomEvent(CXoneAgentEvents.CXONE_VISUAL_NOTIFICATION, eventArgs);
        window.dispatchEvent(customEvent);
    };
    useEffect(() => {
        if (agentId) {
            dispatch(agentDetailsByAgentId({ agentId }));
            dispatch(startAgentQueuePolling(agentId));
        }
    }, [dispatch, agentId]);
    useEffect(() => {
        var _a;
        //Disable autozoom in IOS on input focus
        if (/iPad|iPhone/.test(navigator.userAgent)) {
            (_a = document.querySelector('[name=viewport]')) === null || _a === void 0 ? void 0 : _a.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1');
        }
        dispatch(isCustomAttributeEnabled(UserCustomAttributes.SMART_REACH_AGENT)); // CRM-9979
        dispatch(isCustomAttributeEnabled(UserCustomAttributes.SMART_REACH_USER)); // OB-19327
        dispatch(isCustomAttributeEnabled(UserCustomAttributes.SMART_REACH_DESK)); // UH-55772
        dispatch(isCustomAttributeEnabled(UserCustomAttributes.SMART_REACH_ECC)); // UH-55772
        //isCustomAttributeEnabled is to handle the visibility of customer card based on the userhub attribute value
        dispatch(isCustomAttributeEnabled(UserCustomAttributes.CUSTOMER_CARD));
        dispatch(getAgentSettings());
        dispatch(getRemoveCommitmentAgentSettings());
        dispatch(checkCreateCommitmentPermission());
    }, []);
    /* eslint-disable-next-line @nice-cxone/ccf/required-tsdoc */
    const makeOutboundCall = (dialedNumber, crmClickToActData) => {
        if (dialedNumber === NOT_A_VALID_NUMBER) {
            dispatch(CcfAssignmentAction.setCtdDisplayError(true));
            // Clear existing timeout if any
            if (ctdErrorTimeoutRef.current) {
                clearTimeout(ctdErrorTimeoutRef.current);
            }
            ctdErrorTimeoutRef.current = setTimeout(() => {
                dispatch(CcfAssignmentAction.setCtdDisplayError(false));
                ctdErrorTimeoutRef.current = null;
            }, 3000);
        }
        else {
            const phoneCallOBSkillsAssigned = LocalStorageHelper.getItem(PHONE_CALL_OB_SKILLS, true);
            //Agent with no OB skills
            if (phoneCallOBSkillsAssigned && phoneCallOBSkillsAssigned.length === 0) {
                toast.warn(_jsx(CcfAppToastMessage, { type: "warning", messageKey: "noOBSkillAssigned" }), {
                    autoClose: 2000,
                    containerId: 'AgentMessageToastContainer',
                });
            }
            //Agent with single OB skills
            if (phoneCallOBSkillsAssigned && phoneCallOBSkillsAssigned.length === 1) {
                const cxoneAcdClient = CXoneAcdClient.instance;
                const obSkill = phoneCallOBSkillsAssigned[0];
                if (dialedNumber && obSkill) {
                    dispatch(setSelectedMenu({ name: Navigation.INTERACTION }));
                    const contactDetails = {
                        skillId: obSkill.skillId,
                        phoneNumber: dialedNumber.toString().replace(CcfRegexPatterns.specialCharFormat, ''),
                    };
                    cxoneAcdClient.contactManager.voiceService.dialPhone(contactDetails).catch(() => {
                        toast.error(_jsx(CcfAppToastMessage, { type: "error", messageKey: "dialCallError" }), {
                            autoClose: 2000,
                            containerId: 'AgentMessageToastContainer',
                        });
                    });
                }
            }
            //Agent with multiple OB skills
            if (phoneCallOBSkillsAssigned && phoneCallOBSkillsAssigned.length > 1) {
                dispatch(setSelectedMenu({ name: Navigation.DIRECTORY }));
                if (isBelowMd) {
                    dispatch(CcfAssignmentAction.updateInboxCollapsed({ isInboxCollapsed: true, isLargeView: false }));
                }
                dispatch(agentDirectoryActions.updateSkillSelectorToggle({
                    triggerState: true,
                    triggerType: 'voice',
                }));
                // Clear existing timeout if any
                if (directorySearchTimeoutRef.current) {
                    clearTimeout(directorySearchTimeoutRef.current);
                }
                directorySearchTimeoutRef.current = setTimeout(() => {
                    dispatch(agentDirectoryActions.updateSearchBoxQuery(dialedNumber));
                    directorySearchTimeoutRef.current = null;
                }, 500);
            }
            if (crmClickToActData) {
                SessionStorageHelper.setItem(StorageKeys.CLICK_TO_DIAL_DATA, JSON.stringify(crmClickToActData));
            }
        }
    };
    /* eslint-disable-next-line @nice-cxone/ccf/required-tsdoc */
    const handleResize = (_gutterIdx, allSizes) => {
        const sizeWithFloorValues = allSizes.map(item => Math.floor(item));
        setSizes(sizeWithFloorValues);
        dispatch(setLocalStorageKey({ key: StorageKeys.APPSPACE_RATIO, value: JSON.stringify(sizeWithFloorValues) }));
    };
    useEffect(() => {
        const menuItem = navigationItemList.find(menu => menu.menuName === selectedMenu && !menu.isHidden);
        if (menuItem) {
            setSelectedMenuProperties(menuItem);
        }
        else {
            setSelectedMenuProperties({
                menuName: Navigation.INTERACTION,
                tooltip: translate('assignment'),
            });
            loadCcfAppSpace();
        }
    }, [selectedMenu]);
    /**
     * Load the CcfAppSpace component asynchronously.
     * @example loadCcfAppSpace()
     */
    const loadCcfAppSpace = () => __awaiter(this, void 0, void 0, function* () {
        const ccfAppSpace = yield import('../ccf-app-space/ccf-app-space');
        const CcfAppSpace = ccfAppSpace.CcfAppSpace;
        setAppSpace(_jsx(CcfAppSpace, { setAnchorElementCustomWorkspace: setAnchorElementCustomWorkspace, customWorkSpaceAppSpaceRef: customWorkSpaceAppSpaceRef }));
    });
    // Memoize width calculations
    const { assignmentWidth, canvasWidth } = useMemo(() => {
        let assignmentWidthValue = '';
        let canvasWidthValue = '';
        if (isInboxCollapsed) {
            assignmentWidthValue = '56px';
            canvasWidthValue = '100%';
        }
        else if (!isSmView) {
            assignmentWidthValue = '229px';
            canvasWidthValue = 'calc(100% - 285px)';
        }
        else if (mediumView) {
            assignmentWidthValue = '160px';
            canvasWidthValue = 'calc(100% - 216px)';
        }
        else if (isBelowMd) {
            assignmentWidthValue = '100%';
            canvasWidthValue = 'calc(100% - 266px)';
        }
        else {
            assignmentWidthValue = '56px';
            canvasWidthValue = '100%';
        }
        return { assignmentWidth: assignmentWidthValue, canvasWidth: canvasWidthValue };
    }, [isInboxCollapsed, isSmView, mediumView, isBelowMd]);
    /**
     *
     * @example getWorkSpaceElement()
     * @returns workspace element
     */
    const getWorkSpaceElement = () => {
        if ((selectedMenuProperties === null || selectedMenuProperties === void 0 ? void 0 : selectedMenuProperties.menuName) === Navigation.CUSTOMWORKSPACE) {
            return selectedMenuProperties === null || selectedMenuProperties === void 0 ? void 0 : selectedMenuProperties.workSpaceComponent(setAnchorElementCustomWorkspace, customWorkSpaceRootRef);
        }
        if (isSmView && (selectedMenuProperties === null || selectedMenuProperties === void 0 ? void 0 : selectedMenuProperties.menuName) === Navigation.SCREEN_POP) {
            const menuItem = navigationItemList.find(menu => menu.menuName === Navigation.SCREEN_POP);
            return (menuItem === null || menuItem === void 0 ? void 0 : menuItem.isActive) ? selectedMenuProperties === null || selectedMenuProperties === void 0 ? void 0 : selectedMenuProperties.workSpaceComponent : null;
        }
        if ((selectedMenuProperties === null || selectedMenuProperties === void 0 ? void 0 : selectedMenuProperties.menuName) !== Navigation.INTERACTION) {
            return selectedMenuProperties === null || selectedMenuProperties === void 0 ? void 0 : selectedMenuProperties.workSpaceComponent;
        }
        if (!isSmView) {
            return (_jsx(Grid, Object.assign({ item: true, sx: homeStyle.appSpaceContainer, width: '100%' }, { children: appSpace })));
        }
        if (isSmView
            && ((nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.media) === MediaType.DIGITAL
                || (nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.media) === MediaType.WORKITEM
                || (isActiveVoiceAndTranscriptionToggleOn && showTranscript && hasVoiceTranscriptEventBeenReceived))) {
            return _jsx(WrapperComponent, { component: 'interactionSpaceComponent' });
        }
    };
    useEffect(() => {
        //Called on initial load of the app
        dispatch(checkProductCatalogEnablementAndGetTranlationAvailableLanguages());
        dispatch(validateTenantData());
    }, []);
    useEffect(() => {
        allInteractionsRef.current = allInteractions;
    }, [allInteractions]);
    /**
     * event handler to receive the when session is switched in MSD CIF 2.0 CRM
     * @param event - CustomEventInit
     * @example - crmSessionSwitchedHandler()
     */
    const crmSessionSwitchedHandler = (event) => {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        let contact;
        const interactionId = (_a = event === null || event === void 0 ? void 0 : event.detail) === null || _a === void 0 ? void 0 : _a.interactionId;
        const contactId = (_b = event === null || event === void 0 ? void 0 : event.detail) === null || _b === void 0 ? void 0 : _b.contactId;
        if (((_c = event === null || event === void 0 ? void 0 : event.detail) === null || _c === void 0 ? void 0 : _c.mediaType) === MediaType.VOICE) {
            contact = (_e = (_d = allInteractionsRef.current[interactionId]) === null || _d === void 0 ? void 0 : _d.acdContacts) === null || _e === void 0 ? void 0 : _e[contactId];
        }
        else if (((_f = event === null || event === void 0 ? void 0 : event.detail) === null || _f === void 0 ? void 0 : _f.mediaType) === MediaType.DIGITAL) {
            contact = (_h = (_g = allInteractionsRef.current[interactionId]) === null || _g === void 0 ? void 0 : _g.digitalContacts) === null || _h === void 0 ? void 0 : _h[contactId];
        }
        if (contact && Object.keys(contact).length > 0) {
            selectContact(contact);
        }
    };
    /**
     * function to select the contact based on interaction id and contact id
     * @param contact - ContactData
     * @example - selectContact(contact)
     */
    const selectContact = (contact) => {
        dispatch(CcfAssignmentAction.setSelectedContactId({
            interactionId: contact === null || contact === void 0 ? void 0 : contact.interactionId,
            contactId: contact === null || contact === void 0 ? void 0 : contact.contactId,
        }));
        dispatch(CcfAssignmentAction.setSelectedContactRoot(contact === null || contact === void 0 ? void 0 : contact.contactId));
        dispatch(CcfAssignmentAction.setSelectedInteraction(contact === null || contact === void 0 ? void 0 : contact.interactionId));
        LocalStorageHelper.setItem(StorageKeys.SELECTED_INTERACTION_ID, contact === null || contact === void 0 ? void 0 : contact.interactionId);
        if ((contact === null || contact === void 0 ? void 0 : contact.media) === MediaType.DIGITAL && (contact === null || contact === void 0 ? void 0 : contact.interactionId) && (contact === null || contact === void 0 ? void 0 : contact.caseId)) {
            dispatch(updateDigitalMessageReadStatus({
                interactionId: contact === null || contact === void 0 ? void 0 : contact.interactionId,
                caseId: contact === null || contact === void 0 ? void 0 : contact.caseId,
            }));
        }
    };
    /**
     * event handler to receive the navigation change data from the CRMs
     * @param event - CXoneCRMNavigationChangeData
     * @example - handleCRMEntityNavigationChange()
     */
    const handleCRMEntityNavigationChange = (event) => {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        const entityId = event.detail.entityId;
        if (properties.app === 'cxa_sfdc') {
            const currentfocusedContactId = LocalStorageHelper.getItem(StorageKeys.FOCUSED_CONTACT_ID);
            // When navigating to any entity record, finding which interaction should get focused.
            const contactToNavigate = activityData
                .filter((item) => item.result.some((resultItem) => {
                var _a, _b;
                return ((_a = resultItem === null || resultItem === void 0 ? void 0 : resultItem.records) === null || _a === void 0 ? void 0 : _a.some((record) => {
                    var _a;
                    return record.id === entityId ||
                        ((_a = record === null || record === void 0 ? void 0 : record.related) === null || _a === void 0 ? void 0 : _a.some((relateObj) => relateObj.id === entityId));
                })) ||
                    ((_b = resultItem === null || resultItem === void 0 ? void 0 : resultItem.pinRecords) === null || _b === void 0 ? void 0 : _b.some((pinRecord) => pinRecord.id === entityId));
            }))
                .map((item) => item.contactId);
            // Focus on the interaction if it is not already in focus.
            if (contactToNavigate && !contactToNavigate.includes(currentfocusedContactId)) {
                let focusToContact;
                // To get the interaction details based on the contact ID.
                for (const interaction of Object.values(allInteractions)) {
                    for (const contacts of [interaction.digitalContacts, interaction.acdContacts]) {
                        const isContactPresent = contactToNavigate.find((id) => contacts[id]);
                        if (isContactPresent)
                            focusToContact = contacts[isContactPresent];
                    }
                }
                // Focus on the interaction if it is present.
                if (focusToContact) {
                    selectContact(focusToContact);
                }
            }
        }
        // Store the ID of the last selected record, which will be used to map values into the ‘Name’ and ‘RelatesTo’ fields.
        if (((_a = event.detail) === null || _a === void 0 ? void 0 : _a.mappingFieldName) && ((_b = event.detail) === null || _b === void 0 ? void 0 : _b.mappingFieldName) !== '') {
            const selectedInteractionId = LocalStorageHelper.getItem(StorageKeys.SELECTED_INTERACTION_ID);
            if (selectedInteractionId) {
                const selectedContactId = (_c = allInteractions[selectedInteractionId]) === null || _c === void 0 ? void 0 : _c.selectedContactId;
                if (!selectedContactId)
                    return;
                const crmNavigationData = event.detail;
                const navigationData = LocalStorageHelper.getItem(StorageKeys.CRM_NAVIGATION_DATA, true) || {};
                const sFCRMNavigationData = LocalStorageHelper.getItem(StorageKeys.SFCRM_NAVIGATION_DATA, true) || {};
                // if the data is not already present initialize with empty json
                navigationData[selectedContactId] = navigationData[selectedContactId] || {};
                const whoidFromNavigationData = (_e = (_d = navigationData[selectedContactId]) === null || _d === void 0 ? void 0 : _d.whoid) !== null && _e !== void 0 ? _e : '';
                const selectedWhoidEntityType = (_g = (((_f = sFCRMNavigationData[selectedContactId]) === null || _f === void 0 ? void 0 : _f.whoid) || []).find((entitydata) => entitydata.entityValue === whoidFromNavigationData)) === null || _g === void 0 ? void 0 : _g.entityType;
                if ((selectedWhoidEntityType === null || selectedWhoidEntityType === void 0 ? void 0 : selectedWhoidEntityType.toLowerCase()) === RecordTypeName.LEAD && crmNavigationData.mappingFieldName === 'whatid') {
                    navigationData[selectedContactId]['whatid'] = '';
                }
                else if (((_h = crmNavigationData === null || crmNavigationData === void 0 ? void 0 : crmNavigationData.entity) === null || _h === void 0 ? void 0 : _h.toLowerCase()) === RecordTypeName.LEAD && crmNavigationData.mappingFieldName === 'whoid') {
                    navigationData[selectedContactId][crmNavigationData.mappingFieldName] = crmNavigationData.entityId;
                    navigationData[selectedContactId]['whatid'] = '';
                }
                else {
                    navigationData[selectedContactId][crmNavigationData.mappingFieldName] = crmNavigationData.entityId;
                }
                const salesforceCRMData = {
                    contactId: selectedContactId,
                    mappingFieldName: crmNavigationData.mappingFieldName,
                    entityId: entityId,
                    entityName: crmNavigationData.entityName,
                    entityType: crmNavigationData.entity,
                };
                dispatch(CcfCustomerCardActions.setSFCRMNavigationData(salesforceCRMData));
                LocalStorageHelper.setItem(StorageKeys.CRM_NAVIGATION_DATA, navigationData);
            }
        }
    };
    /**
    * To use the selector data within event handlers we need to listen from within useEffect with the dependency as the selector we want to read data.
    */
    useEffect(() => {
        if ((nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.caseId) || (nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.contactId)) {
            /**
            * lazily loaded the disposition component when we have active contact
            * @example renderDisposition()
            */
            const renderDisposition = () => __awaiter(this, void 0, void 0, function* () {
                const disposition = yield import('../ccf-disposition/ccf-disposition');
                const DispositionInteraction = disposition.CcfDispositionInteraction;
                setDisposition(_jsx(DispositionInteraction, { showDispositionHeaderWhenCollapsed: !isSmView }));
            });
            renderDisposition();
        }
        window.removeEventListener(CXoneAgentEvents.CXONE_CRM_ENTITY_NAVIGATION_CHANGE, handleCRMEntityNavigationChange);
        window.addEventListener(CXoneAgentEvents.CXONE_CRM_ENTITY_NAVIGATION_CHANGE, handleCRMEntityNavigationChange);
        return () => {
            window.removeEventListener(CXoneAgentEvents.CXONE_CRM_ENTITY_NAVIGATION_CHANGE, handleCRMEntityNavigationChange);
        };
    }, [nonIncomingActiveContactInSelectedInteraction]);
    useEffect(() => {
        var _a, _b, _c;
        if (((_a = voiceMailContact === null || voiceMailContact === void 0 ? void 0 : voiceMailContact.voiceMailEventData) === null || _a === void 0 ? void 0 : _a.status.toLowerCase()) ===
            VoiceMailContactEventStatus.DISCARDED.toLowerCase() &&
            ((_b = voiceMailContact === null || voiceMailContact === void 0 ? void 0 : voiceMailContact.voiceMailEventData) === null || _b === void 0 ? void 0 : _b.finalState)) {
            if (voicemailIntervalId !== null && (voicemailIntervalId === null || voicemailIntervalId === void 0 ? void 0 : voicemailIntervalId.current.timerId) && (voicemailIntervalId === null || voicemailIntervalId === void 0 ? void 0 : voicemailIntervalId.current.contactId) === ((_c = voiceMailContact === null || voiceMailContact === void 0 ? void 0 : voiceMailContact.voiceMailEventData) === null || _c === void 0 ? void 0 : _c.contactId)) {
                clearTimeout(voicemailIntervalId === null || voicemailIntervalId === void 0 ? void 0 : voicemailIntervalId.current.timerId);
                voicemailIntervalId.current = { contactId: '', timerId: undefined };
            }
            dispatch(ccfVoiceMailContactPanelActions.setPlaybackSecond(0));
            dispatch(ccfVoiceMailContactPanelActions.setPlaybackEvent({ contactId: '', playBackPaused: true, playBackPosition: 0 }));
        }
    }, [dispatch, (_g = voiceMailContact === null || voiceMailContact === void 0 ? void 0 : voiceMailContact.voiceMailEventData) === null || _g === void 0 ? void 0 : _g.status, (_h = voiceMailContact === null || voiceMailContact === void 0 ? void 0 : voiceMailContact.voiceMailEventData) === null || _h === void 0 ? void 0 : _h.finalState, (_j = voiceMailContact === null || voiceMailContact === void 0 ? void 0 : voiceMailContact.voiceMailEventData) === null || _j === void 0 ? void 0 : _j.contactId]);
    useEffect(() => {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        let timer;
        /**
         * function to discard voicemail timer
         * @example -   clearVoiceMailTimer()
         */
        const clearVoiceMailTimer = () => {
            var _a;
            if (voicemailIntervalId !== null && (voicemailIntervalId === null || voicemailIntervalId === void 0 ? void 0 : voicemailIntervalId.current.timerId) && (voicemailIntervalId === null || voicemailIntervalId === void 0 ? void 0 : voicemailIntervalId.current.contactId) === ((_a = voiceMailContact === null || voiceMailContact === void 0 ? void 0 : voiceMailContact.voiceMailEventData) === null || _a === void 0 ? void 0 : _a.contactId)) {
                clearTimeout(voicemailIntervalId === null || voicemailIntervalId === void 0 ? void 0 : voicemailIntervalId.current.timerId);
                voicemailIntervalId.current = { contactId: '', timerId: undefined };
            }
        };
        if ((voiceMailContactPanelState === null || voiceMailContactPanelState === void 0 ? void 0 : voiceMailContactPanelState.playbackEvent) !== undefined && ((_a = voiceMailContactPanelState.playbackEvent) === null || _a === void 0 ? void 0 : _a.contactId) === ((_b = voiceMailContact === null || voiceMailContact === void 0 ? void 0 : voiceMailContact.voiceMailEventData) === null || _b === void 0 ? void 0 : _b.contactId)) {
            const curSecond = (_e = (((_c = voiceMailContactPanelState.playbackEvent) === null || _c === void 0 ? void 0 : _c.playBackPosition) === -1
                ? voiceMailContact.voiceMailEventData.fileDuration
                : (_d = voiceMailContactPanelState.playbackEvent) === null || _d === void 0 ? void 0 : _d.playBackPosition)) !== null && _e !== void 0 ? _e : 0;
            setVoiceMailPlaybackSecond(curSecond);
            if ((_f = voiceMailContactPanelState.playbackEvent) === null || _f === void 0 ? void 0 : _f.playBackPaused) {
                clearVoiceMailTimer();
            }
            else if (!((_g = voiceMailContactPanelState.playbackEvent) === null || _g === void 0 ? void 0 : _g.playBackPaused)) {
                clearVoiceMailTimer();
                timer = setInterval(() => {
                    setVoiceMailPlaybackSecond(prevSecond => prevSecond >= voiceMailContact.voiceMailEventData.fileDuration
                        ? voiceMailContact.voiceMailEventData.fileDuration
                        : prevSecond + 1);
                }, 1000);
                voicemailIntervalId.current = { contactId: (_h = voiceMailContact.voiceMailEventData) === null || _h === void 0 ? void 0 : _h.contactId, timerId: timer };
            }
        }
        return () => {
            if (timer !== undefined) {
                clearTimeout(timer);
            }
        };
    }, [dispatch, voiceMailContactPanelState === null || voiceMailContactPanelState === void 0 ? void 0 : voiceMailContactPanelState.playbackEvent, (_k = voiceMailContact === null || voiceMailContact === void 0 ? void 0 : voiceMailContact.voiceMailEventData) === null || _k === void 0 ? void 0 : _k.fileDuration, (_l = voiceMailContact === null || voiceMailContact === void 0 ? void 0 : voiceMailContact.voiceMailEventData) === null || _l === void 0 ? void 0 : _l.contactId]);
    useEffect(() => {
        var _a, _b, _c;
        if (((_a = voiceMailContact === null || voiceMailContact === void 0 ? void 0 : voiceMailContact.voiceMailEventData) === null || _a === void 0 ? void 0 : _a.fileDuration) !== undefined && ((_b = voiceMailContact === null || voiceMailContact === void 0 ? void 0 : voiceMailContact.voiceMailEventData) === null || _b === void 0 ? void 0 : _b.contactId) === ((_c = voiceMailContactPanelState === null || voiceMailContactPanelState === void 0 ? void 0 : voiceMailContactPanelState.playbackEvent) === null || _c === void 0 ? void 0 : _c.contactId)) {
            const currentSecond = voicemailPlaybackSecond >= voiceMailContact.voiceMailEventData.fileDuration
                ? voiceMailContact.voiceMailEventData.fileDuration
                : voicemailPlaybackSecond + 1;
            dispatch(ccfVoiceMailContactPanelActions.setPlaybackSecond(currentSecond));
        }
    }, [dispatch, voicemailPlaybackSecond, (_m = voiceMailContact === null || voiceMailContact === void 0 ? void 0 : voiceMailContact.voiceMailEventData) === null || _m === void 0 ? void 0 : _m.fileDuration, (_o = voiceMailContact === null || voiceMailContact === void 0 ? void 0 : voiceMailContact.voiceMailEventData) === null || _o === void 0 ? void 0 : _o.contactId, (_p = voiceMailContactPanelState === null || voiceMailContactPanelState === void 0 ? void 0 : voiceMailContactPanelState.playbackEvent) === null || _p === void 0 ? void 0 : _p.contactId]);
    /**
     * Handles the key down event to resize the application space ratio on click of arrow keys.
     * @param event - The key down event.
     * @example - handleKeyDown(event);
     */
    const handleArrowKeyDown = useCallback((event) => {
        const keyboardEvent = event;
        const appSpaceRatio = LocalStorageHelper.getItem(StorageKeys.APPSPACE_RATIO) || '[]';
        let updatedRatio = JSON.parse(appSpaceRatio);
        //if not default value found in local storage, set default value
        if (!updatedRatio || Object.keys(updatedRatio).length === 0 || updatedRatio.length === 0) {
            updatedRatio = [50, 50];
        }
        // on right arrow key press, increase the app space ratio by 1% and decrease the interaction space ratio by 1% and vice versa
        if ((keyboardEvent === null || keyboardEvent === void 0 ? void 0 : keyboardEvent.key) === EventKeys.ARROW_RIGHT) {
            updatedRatio = [updatedRatio[0] + 1, updatedRatio[1] - 1]; // increase interaction space by 1% and decrease app space by 1%
            if ((refAppSpace === null || refAppSpace === void 0 ? void 0 : refAppSpace.current) && refAppSpace.current.offsetWidth >= 330) { // App space should size should not go below its min 330 px width
                handleResize(0, updatedRatio);
            }
            event.preventDefault();
        }
        else if ((keyboardEvent === null || keyboardEvent === void 0 ? void 0 : keyboardEvent.key) === EventKeys.ARROW_LEFT) {
            if ((refInteractionSpace === null || refInteractionSpace === void 0 ? void 0 : refInteractionSpace.current) && refInteractionSpace.current.offsetWidth >= 400) { // interaction space should size should not go below its min 400 px width
                updatedRatio = [updatedRatio[0] - 1, updatedRatio[1] + 1]; // increase app space by 1% and decrease interaction space by 1%
                handleResize(0, updatedRatio);
            }
            event.preventDefault();
        }
    }, [handleResize]);
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            const splitter = document.getElementsByClassName('customHorizontalSplitter')[0];
            if (splitter) {
                splitter.setAttribute('tabindex', '0');
                splitter.setAttribute('role', 'splitter');
                splitter.setAttribute('aria-label', translate('horizontalSplitter'));
                splitter.addEventListener('keydown', handleArrowKeyDown);
            }
            // Cleanup function to remove the event listener on unmount
            return () => {
                splitter === null || splitter === void 0 ? void 0 : splitter.removeEventListener('keydown', handleArrowKeyDown);
                clearTimeout(timeoutId);
            };
        }, 1000);
        // Cleanup function to remove the event listener and clear timeout on unmount
        return () => {
            const splitter = document.getElementsByClassName('customHorizontalSplitter')[0];
            splitter === null || splitter === void 0 ? void 0 : splitter.removeEventListener('keydown', handleArrowKeyDown);
            clearTimeout(timeoutId);
        };
    }, [isHorizontalSplitterEnabled]);
    // **PERFORMANCE OPTIMIZATION: Memoize ReactSplit pane components**
    const InteractionSpacePane = useMemo(() => (_jsx(Box, Object.assign({ sx: homeStyle.containerFullHeight, ref: refInteractionSpace }, { children: _jsx(WrapperComponent, { component: 'interactionSpaceComponent' }) }), nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.contactId)), [homeStyle.containerFullHeight, nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.contactId]);
    const AppSpacePane = useMemo(() => (_jsx(Box, Object.assign({ sx: homeStyle.containerFullHeight, ref: refAppSpace }, { children: !isSmView && (_jsx(Grid, Object.assign({ item: true, sx: homeStyle.appSpaceContainer }, { children: appSpace }))) }))), [homeStyle.containerFullHeight, homeStyle.appSpaceContainer, isSmView, appSpace]);
    // **PERFORMANCE OPTIMIZATION: Memoize ReactSplit component**
    const ReactSplitComponent = useMemo(() => {
        if (!isHorizontalSplitterEnabled)
            return null;
        return (_jsxs(ReactSplit, Object.assign({ direction: SplitDirection.Horizontal, initialSizes: sizes, minWidths: [400, 330], onResizeFinished: handleResize, gutterClassName: 'customHorizontalSplitter', draggerClassName: 'customDraggerSplitter' }, { children: [InteractionSpacePane, AppSpacePane] })));
    }, [isHorizontalSplitterEnabled, sizes, handleResize, InteractionSpacePane, AppSpacePane, nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.contactId]);
    // Cleanup timeouts on component unmount
    useEffect(() => {
        return () => {
            if (ctdErrorTimeoutRef.current) {
                clearTimeout(ctdErrorTimeoutRef.current);
            }
            if (directorySearchTimeoutRef.current) {
                clearTimeout(directorySearchTimeoutRef.current);
            }
        };
    }, []);
    return (_jsxs(_Fragment, { children: [_jsx(CcfKeyboardNavigation, { appHelpUrl: properties.appHelpUrl || '' }), _jsxs(Box, Object.assign({ id: 'cx1_agent_root', sx: isAppToastVisible ? homeStyle.isAppToastMessageVisible : homeStyle.root }, { children: [_jsx(Box, { children: _jsx(Collapse, Object.assign({ in: ctdDisplayError }, { children: _jsx(Alert, Object.assign({ severity: "error", variant: "filled" }, { children: translate('badNumberCalledErrorText') })) })) }), _jsxs(Box, Object.assign({ sx: homeStyle.navBarandSideBar }, { children: [_jsx(Box, { children: _jsx(CcfAppNavigation, { helpUrl: properties.appHelpUrl }) }), _jsxs(Box, Object.assign({ sx: homeStyle.mainViewContainer }, { children: [_jsxs(Grid, Object.assign({ container: true, sx: { height: '100%' } }, { children: [_jsx(Grid, Object.assign({ item: true, style: {
                                                    width: assignmentWidth,
                                                    height: '100%',
                                                } }, { children: _jsx(CcfContactAssignment, {}) })), _jsx(Grid, { children: nonIncomingActiveContactInSelectedInteraction && Disposition }), _jsx(Grid, Object.assign({ style: {
                                                    width: canvasWidth,
                                                    height: '100%',
                                                }, container: true, display: 'flex', flex: '1 1 0%', sx: homeStyle.detailsMenu }, { children: ReactSplitComponent || (_jsxs(_Fragment, { children: [getWorkSpaceElement(), (selectedMenuProperties === null || selectedMenuProperties === void 0 ? void 0 : selectedMenuProperties.showAppSpace) && !isSmView && (_jsx(Grid, Object.assign({ item: true, sx: homeStyle.appSpaceContainer, width: '100%' }, { children: appSpace })))] })) }))] })), isNetworkOffline && _jsx(Box, Object.assign({ sx: homeStyle.isNetworkOffline }, { children: _jsx(CcfLoader, { showLoadingText: false }) }))] })), isSmView &&
                                _jsx(Grid, { children: ControlWrapper })] }))] })), _jsxs(Suspense, Object.assign({ fallback: null }, { children: [_jsx(CcfCustomWorkspacePreloader, { anchorElcustomWorkspace: anchorElcustomWorkspace, setAnchorElementCustomWorkspace: setAnchorElementCustomWorkspace }), isLvCustomerCardEnabled ? _jsx(LvEccPreloader, {}) : null, isLvDeskEnabled ? _jsx(LvDeskPreloader, {}) : null] }))] }));
}
export default memo(CcfHome, (prevProps, nextProps) => {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    // **PERFORMANCE OPTIMIZATION: Custom comparison to prevent unnecessary re-renders**
    return (((_a = prevProps.authSettings) === null || _a === void 0 ? void 0 : _a.app) === ((_b = nextProps.authSettings) === null || _b === void 0 ? void 0 : _b.app) &&
        ((_c = prevProps.xtnData) === null || _c === void 0 ? void 0 : _c.ctdExtensionId) === ((_d = nextProps.xtnData) === null || _d === void 0 ? void 0 : _d.ctdExtensionId) &&
        ((_e = prevProps.xtnData) === null || _e === void 0 ? void 0 : _e.voiceExtensionId) === ((_f = nextProps.xtnData) === null || _f === void 0 ? void 0 : _f.voiceExtensionId) &&
        ((_g = prevProps.xtnData) === null || _g === void 0 ? void 0 : _g.ncExtensionId) === ((_h = nextProps.xtnData) === null || _h === void 0 ? void 0 : _h.ncExtensionId));
});
//# sourceMappingURL=ccf-home.js.map