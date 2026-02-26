var _a, _b, _c;
import { __awaiter } from "tslib";
import { jsx as _jsx } from "react/jsx-runtime";
import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import { localeTranslationMap, translations } from '@nice-devone/i18n';
import { CcfAddEventIcon, CcfAppToastMessage, CcfTypography, CcfUserPlusIcon } from '@nice-devone/ui-controls';
import { Navigation } from '../enums/navigation-menus';
import { LocalStorageHelper, Logger, StorageKeys, UrlUtilsService } from '@nice-devone/core-sdk';
import { CXoneClient, CXoneProductFeature, FeatureToggleService } from '@nice-devone/agent-sdk';
import { AgentSessionStatus, MessageBus, MessageType, NetWorkConnectionStatus } from '@nice-devone/common-sdk';
import { toast } from 'react-toastify';
import { agentDirectoryActions } from './ccf-directory/+state/ccf-directory.slice';
import { updateAppSpaceTabStatus } from './ccf-app-space/ccf-app-space.slice';
import { voicePreferenceActions } from './ccf-acd-session/ccf-acd-session.slice';
import { fetchCopilotDataFromIndexDB, setupCopilotWebSocket } from './ccf-agent-copilot/ccf-agent-copilot-container.slice';
import { getAllCopilotAdaptiveCardSchemas } from './ccf-agent-copilot/ccf-agent-copilot-middleware';
import { DigitalTranscriptStatus } from './ccf-interaction-space/ccf-digital-transcript/ccf-digital-transcript';
import { CXoneAcdClient } from '@nice-devone/acd-sdk';
import { CXoneDigitalClient } from '@nice-devone/digital-sdk';
import { JabraErrorTypes } from '@nice-devone/headset-sdk';
import { DEFAULT_CXA_VERSION } from '../util/common';
import { getAllowedSearchTabsList } from './ccf-app-space/ccf-digital-search/ccf-digital-search.slice';
import { setLvClientSettings } from './lv-app-space/lv-app-space.slice';
import { SMARTREACH_DESK, SMARTREACH_ECC, SMARTREACH_PRODUCT_ID } from './lv-app-space/lv-app-space-utility';
import { CcfPerformanceToast } from './ccf-performance-toast/ccf-performance-toast';
import { AgentHiveClient } from '@nice-devone/user-chat-sdk';
export const GLOBAL_APP_FEATURE_KEY = 'global';
const isContactHistoryHidden = (_a = (LocalStorageHelper.getItem(StorageKeys.AGENT_PROFILE_CONFIGURATION, true) || [])) === null || _a === void 0 ? void 0 : _a.hideContactHistory;
const defaultHomeApp = isContactHistoryHidden ? Navigation.DIRECTORY : Navigation.CONTACTHISTORY;
const externalProdUrls = LocalStorageHelper.getItem(StorageKeys.EXTERNAL_PRODUCT_URLS);
const selectedMenuQuickAppFromLS = externalProdUrls ? JSON.parse(externalProdUrls).selectedMenuQuickApp : defaultHomeApp;
/**
 * Checks if Menu is hidden or not
 * @param menuName - Navigation Menu Name
 * @returns - Boolean
 * @example - isAppHidden(Navigation.CONTACTHISTORY)
 */
export const isAppHidden = (menuName) => {
    const agentProfileSettings = LocalStorageHelper.getItem(StorageKeys.AGENT_PROFILE_CONFIGURATION, true) || [];
    switch (menuName) {
        case Navigation.CONTACTHISTORY:
            return agentProfileSettings === null || agentProfileSettings === void 0 ? void 0 : agentProfileSettings.hideContactHistory;
            break;
        case Navigation.SEARCH:
            return agentProfileSettings === null || agentProfileSettings === void 0 ? void 0 : agentProfileSettings.hideSearch;
            break;
        case Navigation.QUEUE:
            return agentProfileSettings === null || agentProfileSettings === void 0 ? void 0 : agentProfileSettings.hideQueueCounter;
            break;
        case Navigation.CALENDAR:
            return agentProfileSettings === null || agentProfileSettings === void 0 ? void 0 : agentProfileSettings.hideSchedule;
            break;
        case Navigation.WEM:
            return agentProfileSettings === null || agentProfileSettings === void 0 ? void 0 : agentProfileSettings.hideWEM;
            break;
        case Navigation.LAUNCH:
            return agentProfileSettings === null || agentProfileSettings === void 0 ? void 0 : agentProfileSettings.hideLaunch;
            break;
        case Navigation.CUSTOMWORKSPACE:
            return agentProfileSettings === null || agentProfileSettings === void 0 ? void 0 : agentProfileSettings.hideCustomWorkspace;
            break;
        case Navigation.REPORTING:
            return agentProfileSettings === null || agentProfileSettings === void 0 ? void 0 : agentProfileSettings.hideReporting;
            break;
        default: return false;
    }
};
/**
 * For updating the url of WEM and storing the current menu item in local storage
 * So that app can be initialized with same menu on reload
 * @example - updateExternalProdURL(panelMenuItem, quickBarMenuItem, wemUrl)
 */
export const updateExternalProdURL = (panelMenuItem = null, quickBarMenuItem = null, wemUrl = null) => {
    // Check added to change External Prod URL only if the tab is not hidden by Agent Profile Configuration
    if ((panelMenuItem && isAppHidden(panelMenuItem)) || (quickBarMenuItem && isAppHidden(quickBarMenuItem)))
        return;
    const externalProdUrl = LocalStorageHelper.getItem(StorageKeys.EXTERNAL_PRODUCT_URLS);
    if (externalProdUrl) {
        const externalProdUrlParsed = JSON.parse(externalProdUrl);
        panelMenuItem !== null && (externalProdUrlParsed.selectedMenuPanelApp = panelMenuItem);
        quickBarMenuItem !== null && (externalProdUrlParsed.selectedMenuQuickApp = quickBarMenuItem);
        wemUrl !== null && (externalProdUrlParsed.wemUrl = wemUrl);
        externalProdUrlParsed.selectedMenuPanelApp = externalProdUrlParsed.selectedMenuQuickApp === Navigation.INTERACTION
            ? Navigation.CUSTOMERCARD
            : '';
        LocalStorageHelper.setItem(StorageKeys.EXTERNAL_PRODUCT_URLS, externalProdUrlParsed);
        CXoneClient.instance.directory.dynamicDirectory.setSelectedTabs(externalProdUrlParsed.selectedMenuPanelApp, externalProdUrlParsed.selectedMenuQuickApp);
    }
    else {
        const externalProductUrls = {
            selectedMenuPanelApp: panelMenuItem,
            selectedMenuQuickApp: quickBarMenuItem,
            wemUrl: wemUrl,
        };
        LocalStorageHelper.setItem(StorageKeys.EXTERNAL_PRODUCT_URLS, externalProductUrls);
        CXoneClient.instance.directory.dynamicDirectory.setSelectedTabs(externalProductUrls.selectedMenuPanelApp, externalProductUrls.selectedMenuQuickApp);
    }
};
;
const navigationItemsLS = JSON.parse(localStorage.getItem(StorageKeys.CXONE_NAVIGATION_ITEMS) || '{}');
const navigationItemsLSLength = Object.keys(navigationItemsLS).length;
const initialQuickAppsMenuItems = navigationItemsLSLength && navigationItemsLS.quickApps && navigationItemsLS.quickApps.length ? navigationItemsLS.quickApps : [];
const initialPanelAppsMenuItems = navigationItemsLSLength && navigationItemsLS.panelApps && navigationItemsLS.panelApps.length ? navigationItemsLS.panelApps : [];
const initialCommitmentPopoverMenuItems = [
    {
        translationKey: 'commitment',
        type: 'commitment',
        closeOnSelection: true,
    }
];
const initialContactControlMenuItems = [
    {
        translationKey: 'addOutbound',
        icon: _jsx(CcfUserPlusIcon, {}),
        type: 'elevation',
        closeOnSelection: true,
        disabled: false,
    },
    {
        translationKey: 'addCommitments',
        icon: _jsx(CcfAddEventIcon, {}),
        type: 'commitment',
        closeOnSelection: true,
    }
];
export const initialGlobalState = {
    version: '0.0.1',
    direction: translations.direction,
    language: {
        name: 'en',
        translations,
    },
    selectedMenuName: selectedMenuQuickAppFromLS && !((_c = (_b = navigationItemsLS.quickApps) === null || _b === void 0 ? void 0 : _b.filter((e) => e.menuName === selectedMenuQuickAppFromLS)[0]) === null || _c === void 0 ? void 0 : _c.contactApp)
        ? selectedMenuQuickAppFromLS
        : defaultHomeApp,
    isOutboundAssignmentBtnClicked: false,
    quickAppNavigationItems: initialQuickAppsMenuItems,
    panelAppNavigationItems: initialPanelAppsMenuItems,
    commitmentPopoverItems: initialCommitmentPopoverMenuItems,
    contactControlItems: initialContactControlMenuItems,
    WEM: {
        isEnabled: false,
        externalUrl: '',
    },
    screenAgentPortNo: 31322,
    alertMessage: {},
    isLogoutOutToastMessage: false,
    logoutToastReference: null,
    networkOfflineToastReference: null,
    toastMsg: '',
    isDigitalContactTransferBtnClicked: false,
    isVoiceContactTransferBtnClicked: false,
    isVoiceContactConferenceBtnClicked: false,
    isViewDetailsClicked: false,
    isInteractionSpaceClicked: false,
    isPageUnloading: false,
    isPageReloaded: false,
    persistentPanels: [],
    activePersistentPanel: {},
    isNetworkOffline: false,
    isWebRTCExtensionInstalled: null,
    isNoiseCancellationExtInstalled: null,
    userCustomAttributes: {},
    locale: 'en',
    timer: {
        currentTime: 0,
    },
    focusTopNavBar: false,
    moreMenu: false,
    appSpaceMoreMenu: false,
    focusLaunchButton: false,
    isDomVisible: true,
    isIntegratedAgent: false,
    isDigitalTranscriptPopupOpen: false,
    isDigitalTranscriptPopupClose: false,
    digitalTranscriptCurrentStatus: '',
    digitalTranslationAvailableLanguages: {},
    isAgentCopilotEnabled: false,
    isAutoSummaryEnabled: false,
    isLvCustomerCardFeatureToggleEnabled: false,
    isLvDeskFeatureToggleEnabled: false,
    ariaLiveAnnouncer: {
        ariaMessage: '',
        politeness: 'polite',
    },
    isMPowerLogoFeatureToggleEnabled: false,
    isCustomIframesLoaded: false,
    isDesktopProfileFeatureEnabled: false,
    isConversationsFeatureEnabled: false,
    isOmiliaHandshakeDone: false,
};
const logger = new Logger();
/**
* Thunk action creator to handle async requests while construcing WEM url
* @example - dispatch(constructWEMUrl());
* @returns
*/
export const constructWEMUrl = createAsyncThunk('global/constructWEMUrl', (_, { dispatch }) => __awaiter(void 0, void 0, void 0, function* () {
    const userHubBaseUri = CXoneClient.instance.auth.getCXoneConfig().userHubBaseUrl;
    if (userHubBaseUri) {
        const urlsUtilSvc = new UrlUtilsService();
        const WEMUrl = urlsUtilSvc.appendQueryString(userHubBaseUri + '/sso/#/landingPage', {
            embeddedClient: true,
            postMsg: true,
        });
        const externalProdUrl = localStorage.getItem(StorageKeys.EXTERNAL_PRODUCT_URLS);
        const externalProdUrlParsed = externalProdUrl && JSON.parse(externalProdUrl);
        const quickAppMenu = (externalProdUrlParsed && externalProdUrlParsed.selectedMenuQuickApp)
            ? externalProdUrlParsed.selectedMenuQuickApp
            : defaultHomeApp;
        const quickPanelApp = (externalProdUrlParsed && externalProdUrlParsed.selectedMenuPanelApp)
            ? externalProdUrlParsed.selectedMenuPanelApp
            : Navigation.CUSTOMERCARD;
        updateExternalProdURL(quickPanelApp, quickAppMenu, WEMUrl);
        dispatch(globalActions.storeWEMUrl(WEMUrl));
    }
}));
export const checkProductsEnabledInFeatures = createAsyncThunk('voicePreference/checkProductsEnabledInFeatures', (_, { dispatch }) => __awaiter(void 0, void 0, void 0, function* () {
    const cxoneClientInstance = CXoneClient.instance;
    const agentHiveClientInstance = AgentHiveClient.instance;
    try {
        const businessUnitData = (yield cxoneClientInstance.auth.getBusinessUnit());
        const isVoiceBioHubFTEnabled = yield FeatureToggleService.instance.getFeatureToggle("release-agent-voiceBioHub-AW-24969" /* FeatureToggles.VOICE_BIO_HUB_FEATURE_TOGGLE */);
        const isLvSmartReachECCFeatureToggleEnabled = yield FeatureToggleService.instance.getFeatureToggle("release-smartreach-ecc-CXDSK-13" /* FeatureToggles.LV_SMARTREACH_ECC */);
        const isLvSmartReachDeskFeatureToggleEnabled = yield FeatureToggleService.instance.getFeatureToggle("release-smartreach-desk-CXDSK-3" /* FeatureToggles.LV_SMARTREACH_DESK */);
        const isDesktopProfileFTEnabled = yield FeatureToggleService.instance.getFeatureToggle("release-CMA-agent-profile-AW-34218" /* FeatureToggles.DESKTOP_PROFILE_ADOPTION_FEATURE_TOGGLE */);
        const isMPowerLogoFTEnabled = yield FeatureToggleService.instance.getFeatureToggle("release-uh-new-bp-mpower-UH-48776" /* FeatureToggles.MPOWER_LOGO_FEATURE_TOGGLE */);
        const isConversationsFeatureToggleEnabled = yield FeatureToggleService.instance.getFeatureToggle("release-agent-chat-AW-30672" /* FeatureToggles.AGENT_CHAT_FEATURE_TOGGLE */);
        const isConversationsProductIdPresent = yield (agentHiveClientInstance === null || agentHiveClientInstance === void 0 ? void 0 : agentHiveClientInstance.isConversationsProductEnabledFromTM());
        let copilotChecked = false; // Flag to ensure Copilot logic runs only once
        if (isMPowerLogoFTEnabled) {
            dispatch(globalActions.setMPowerLogoFeatureToggleEnablement(true));
        }
        if (isConversationsFeatureToggleEnabled && isConversationsProductIdPresent) {
            dispatch(globalActions.setConversationsFeatureStatus(true));
        }
        businessUnitData.features.forEach(feature => {
            var _a, _b;
            // Check any of the products WFM, QM or PM is enabled for the business unit
            if ((feature.productId === 102 || feature.productId === 103 || feature.productId === 1001) && feature.isEnabled) {
                dispatch(globalActions.isWEMProductEnablement(true));
                dispatch(constructWEMUrl());
            }
            // Enable Copilot only once if any of the ACP products are enabled
            if (!copilotChecked && (feature.productId === 351 || feature.productId === 355) && feature.isEnabled) {
                copilotChecked = true; // Set flag so Copilot logic is not executed again
                const userInfo = (_a = cxoneClientInstance === null || cxoneClientInstance === void 0 ? void 0 : cxoneClientInstance.cxoneUser) === null || _a === void 0 ? void 0 : _a.getUserInfo();
                const cxoneConfig = cxoneClientInstance.auth.getCXoneConfig();
                const { aahNotificationWssUri } = cxoneConfig;
                if (aahNotificationWssUri) {
                    cxoneClientInstance.subscribeAgentAssistEvent();
                    setupCopilotWebSocket(userInfo, cxoneConfig);
                }
                dispatch(getAllCopilotAdaptiveCardSchemas(((_b = process.env.NX_BRANCH_NAME) !== null && _b !== void 0 ? _b : DEFAULT_CXA_VERSION).split('-')[0]));
                dispatch(globalActions.setAgentCopilotEnablement(true));
                //get stored copilot data from indexdb
                dispatch(fetchCopilotDataFromIndexDB());
            }
            // Product Id 105 = Evolve Screen Recording & 106 evolve audio Recording, Check if is enabled.
            if ((feature.productId === 105 || feature.productId === 106) && feature.isEnabled) {
                LocalStorageHelper.setItem(StorageKeys.IS_RECORDING_ENABLED, true);
            }
            // Check Enlighten Auto Summary is enabled for the business unit        
            if (feature.productId === 177 && feature.isEnabled) {
                dispatch(globalActions.setAutoSummaryEnablement(true));
            }
            if (isVoiceBioHubFTEnabled && feature.productId === 179 && feature.isEnabled) {
                dispatch(globalActions.setVoiceBioFeatureEnablement(true));
            }
            // SMART REACH - Check If LVCustomerCard or Desk is enabled for the business unit
            if (isLvSmartReachECCFeatureToggleEnabled && feature.productId === SMARTREACH_ECC && feature.isEnabled) {
                dispatch(globalActions.setLvCustomerCardFeatureToggle(true));
                dispatch(getAllowedSearchTabsList()); // need to update the tabs to make sure it displays LVCustomers
            }
            if (isLvSmartReachDeskFeatureToggleEnabled && feature.productId === SMARTREACH_DESK && feature.isEnabled) {
                dispatch(globalActions.setLvDeskFeatureToggle(true));
                dispatch(getAllowedSearchTabsList()); // need to update the tabs to make sure it displays LVCustomers
            }
            if (isDesktopProfileFTEnabled && feature.productId === CXoneProductFeature.DESKTOP_PROFILES && feature.isEnabled) {
                dispatch(globalActions.setDesktopProfileFeatureStatus(true));
            }
        });
    }
    catch (error) {
        dispatch(globalActions.isWEMProductEnablement(false));
        logger.error('checkProductsEnabledInFeatures', JSON.stringify(error));
        dispatch(globalActions.setAgentCopilotEnablement(false));
    }
}));
export const connectScreenAgentIfRecordingEnabled = createAsyncThunk('global/checkScreenRecordingEanbled', (agentSessionData, { dispatch }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isScreenRecordingEnabledInFeatures = yield CXoneClient.instance.cxoneTenant.checkProductEnablement([CXoneProductFeature.EVOLVE_SCREEN_RECORDING, CXoneProductFeature.SIDE_BY_SIDE_SCREEN_RECORDING_APPLINK, CXoneProductFeature.SIDE_BY_SIDE_SCREEN_RECORDING_OPEN]);
        // TODO - check  if the screen recording checkbox is checked in user hub
        if (isScreenRecordingEnabledInFeatures) {
            const screenAgentport = agentSessionData.screenAgentPort;
            CXoneClient.instance.screenAgent.connectScreenAgent(screenAgentport);
            dispatch(globalActions.setScreenAgentDetails(screenAgentport));
        }
    }
    catch (error) {
        logger.error('connectScreenAgentIfRecordingEnabled', JSON.stringify(error));
    }
}));
export const disconnectScreenAgentRecording = createAsyncThunk('global/disconnectScreenAgentRecording', (_, { getState }) => __awaiter(void 0, void 0, void 0, function* () {
    const { global } = getState();
    CXoneClient.instance.screenAgent.disconnectScreenAgent(global.screenAgentPortNo);
}));
/**
 * Thunk action for general to access tenant data
 * @example
 * ```
 * dispatch(validateTenantData());
 * ```
 */
export const validateTenantData = createAsyncThunk('global/validateTenantData', (_, { dispatch, rejectWithValue }) => __awaiter(void 0, void 0, void 0, function* () {
    const cxoneClientInstance = CXoneClient.instance;
    try {
        const tenantData = (yield cxoneClientInstance.cxoneTenant
            .getTenantData()
            .catch((error) => {
            throw rejectWithValue(error);
        }));
        if (tenantData) {
            tenantData.licenses.forEach(license => {
                if (/smartreach/gi.test(license.applicationId) &&
                    license.featureIds.includes(SMARTREACH_PRODUCT_ID)) {
                    dispatch(setLvClientSettings(license.settings));
                }
            });
        }
    }
    catch (error) {
        logger.error('tenantData', JSON.stringify(error));
    }
}));
/**
* Thunk action creator to handle async requests while fetching PesistentPanels/CustomWorkspaces from agent settings
* @example - dispatch(getAgentSettings());
*/
export const getAgentSettings = createAsyncThunk('global/getAgentSettings', (_, { dispatch }) => __awaiter(void 0, void 0, void 0, function* () {
    const cxoneClient = CXoneClient.instance;
    let agentSettings = {};
    try {
        agentSettings = (yield cxoneClient.agentSetting.getAgentSettings());
    }
    catch (e) {
        logger.error('getAgentSettings', JSON.stringify(e));
    }
    if (agentSettings) {
        const persistentPanels = agentSettings.persistentPanels;
        dispatch(globalActions.setPersistentPanels(persistentPanels));
        dispatch(voicePreferenceActions.setMaxConference(agentSettings.maxConferenceParties));
    }
}));
export const networkOfflineError = createAsyncThunk('global/networkOfflineError', (_, { dispatch }) => __awaiter(void 0, void 0, void 0, function* () {
    const networkErrorToastId = toast.warn(_jsx(CcfAppToastMessage, { type: "warning networkFailureError centerButton", messageKey: 'networkFailure', primaryBtnText: 'restart', triggerPrimaryHandler: () => {
            toast.dismiss();
            CXoneAcdClient.instance.session.onAgentSessionChange.next({
                status: AgentSessionStatus.SESSION_END,
            });
            const msg = {
                type: MessageType.END_SESSION,
            };
            MessageBus.instance.postResponse(msg);
        } }), {
        autoClose: false,
        closeButton: false,
        containerId: 'AppToastContainer',
        onClose: () => {
            logger.info('networkOfflineError', 'networkOfflineError toast closed');
            dispatch(globalActions.setNetworkOfflineErrorToastMessage(null));
        },
    });
    dispatch(globalActions.isNetworkOffline(true));
    dispatch(globalActions.setNetworkOfflineErrorToastMessage(networkErrorToastId));
}));
export const emptyAuthTokenError = createAsyncThunk('global/emptyAuthTokenError', () => __awaiter(void 0, void 0, void 0, function* () {
    toast.warn(_jsx(CcfAppToastMessage, { type: "warning networkFailureError centerButton", messageKey: 'genericError', primaryBtnText: 'restart', triggerPrimaryHandler: () => {
            toast.dismiss();
            CXoneAcdClient.instance.session.onAgentSessionChange.next({
                status: AgentSessionStatus.SESSION_END,
            });
            const msg = {
                type: MessageType.END_SESSION,
            };
            MessageBus.instance.postResponse(msg);
        } }), {
        autoClose: false,
        closeButton: false,
        containerId: 'AppToastContainer',
    });
}));
/**
 * Thunk action creator to display current Websocket connection status notifications on UI
 */
export const digitalWsNetworkStateNotification = createAsyncThunk('global/digitalWsNetworkStateNotification', (wsNetworkState, { getState }) => __awaiter(void 0, void 0, void 0, function* () {
    var _d, _e;
    if (wsNetworkState === NetWorkConnectionStatus.RECONNECT) {
        toast.warn(_jsx(CcfTypography, { translationKey: 'webSocketReconnect' }), {
            autoClose: false,
            closeButton: true,
            containerId: 'AppToastContainer',
        });
    }
    else if (wsNetworkState === NetWorkConnectionStatus.CONNECTED) {
        toast.success(_jsx(CcfTypography, { translationKey: 'webSocketConnected' }), {
            autoClose: false,
            closeButton: true,
            containerId: 'AppToastContainer',
        });
        const { global } = getState();
        if (global.isAgentCopilotEnabled) {
            const cxoneClientInstance = CXoneClient.instance;
            const userInfo = (_d = cxoneClientInstance === null || cxoneClientInstance === void 0 ? void 0 : cxoneClientInstance.cxoneUser) === null || _d === void 0 ? void 0 : _d.getUserInfo();
            const cxoneConfig = (_e = cxoneClientInstance === null || cxoneClientInstance === void 0 ? void 0 : cxoneClientInstance.auth) === null || _e === void 0 ? void 0 : _e.getCXoneConfig();
            setupCopilotWebSocket(userInfo, cxoneConfig);
        }
    }
    else if (wsNetworkState === NetWorkConnectionStatus.RECONNECT_UNSUCCESSFUL) {
        toast.warn(_jsx(CcfTypography, { translationKey: 'WebSocketReconnectUnsuccessful' }), {
            autoClose: false,
            closeButton: true,
            containerId: 'AppToastContainer',
        });
    }
}));
/**
 * Thunk action creator to interact with SDK and manage visibility of Custom Attribute
 *
 * @param args - custome attribute product key: CustomAttributes
 * ```
 * @example
 *  dispatch(
      isCustomAttributeEnabled(ProductKey:string)
    );
 * ```
 */
export const isCustomAttributeEnabled = createAsyncThunk('global/isCustomAttributeEnabled', (attributeKey, { dispatch }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isAppEnabled = yield CXoneClient.instance.cxoneUser.isCustomAttributesEnabled(attributeKey);
        if (typeof isAppEnabled === 'boolean')
            dispatch(globalActions.setUserCustomAttribute({
                [attributeKey]: isAppEnabled,
            }));
    }
    catch (error) {
        logger.debug('[isCustomAttributeEnabled]', `payload: ${JSON.stringify(error)}`);
    }
}));
/**
 * Thunk action creator to send the transcript
 * @param transcriptParams - includes Case ID and email
 * ```
 * @example
 *  dispatch(
      sendTranscript(contactId: string, email: string)
    );
 * ```
 */
export const sendTranscript = createAsyncThunk('reporting/sendTranscript', (transcriptParams) => __awaiter(void 0, void 0, void 0, function* () {
    yield CXoneClient.instance.transcript.sendTranscript(transcriptParams.contactId, transcriptParams.email);
}));
/**
 * Thunk action creator to get translation langauages if DIGITAL and REAL_TIME_DIGITAL_TRANSLATIONS are enabled
 */
export const checkProductCatalogEnablementAndGetTranlationAvailableLanguages = createAsyncThunk('global/checkProductCatalogEnablementAndGetTranlationAvailableLanguages', (_, { getState, dispatch }) => __awaiter(void 0, void 0, void 0, function* () {
    const digitalTranslationLanguages = getState().global.digitalTranslationAvailableLanguages;
    CXoneClient.instance.cxoneTenant.checkProductEnablement([CXoneProductFeature.DIGITAL]).then((response) => {
        const isDigitalEngagementEnabled = typeof response === 'boolean' ? response : false;
        if (isDigitalEngagementEnabled) {
            CXoneClient.instance.cxoneTenant.checkProductEnablement([CXoneProductFeature.REAL_TIME_DIGITAL_TRANSLATIONS]).then((response) => {
                const isDigitalTranslationsEnabled = typeof response === 'boolean' ? response : false;
                if (isDigitalTranslationsEnabled && Object.keys(digitalTranslationLanguages).length === 0) {
                    CXoneDigitalClient.instance.digitalService.getDigitalAvailableLanguagesForTranslation().then((availableLanguages) => {
                        dispatch(globalActions.setDigitalTranslationAvailableLanguages(availableLanguages));
                    }).catch(() => {
                        toast.warn(_jsx(CcfAppToastMessage, { type: "warning", messageKey: "translationLicenseNotAvailable" }), {
                            autoClose: 2000,
                            containerId: 'AgentMessageToastContainer',
                        });
                    });
                }
            });
        }
    });
}));
/**
 * Create Toast for Headset Error
 * @param error - JabraErrorTypes
 * @example - headsetErrorToast(error);
 */
export const headsetErrorToast = (error) => {
    let messageKey;
    switch (error) {
        case JabraErrorTypes.DeviceAlreadyInUseError:
            messageKey = 'deviceAlreadyInUse';
            break;
        case JabraErrorTypes.InitializingError:
            messageKey = 'initializingError';
            break;
        case JabraErrorTypes.GenericError:
            messageKey = 'genericHeadsetError';
            break;
    }
    const messageComponent = (_jsx(CcfAppToastMessage, { type: 'error', messageKey: messageKey }));
    const toastOptions = {
        autoClose: 500,
        containerId: 'AppToastContainer',
    };
    toast.error(messageComponent, toastOptions);
};
export const globalSlice = createSlice({
    name: GLOBAL_APP_FEATURE_KEY,
    initialState: initialGlobalState,
    reducers: {
        setLanguageConfiguration: (state, action) => {
            const languageTranslations = (localeTranslationMap.get(action.payload)
                || translations);
            document.body.dir = languageTranslations.direction;
            return Object.assign(Object.assign({}, state), { direction: languageTranslations.direction, language: {
                    name: languageTranslations.locale,
                    translations: languageTranslations,
                } });
        },
        reArrangeMenu: (state, action) => {
            const srcIndex = action.payload.src.droppableId === 'droppable-3' ? action.payload.src.index + 8 : action.payload.src.index;
            const destIndex = action.payload.dest.droppableId === 'droppable-3' ? action.payload.dest.index + 8 : action.payload.dest.index;
            const isAppSpaceMenu = action.payload.isAppSpaceMenu;
            let copyItems = !isAppSpaceMenu ? [...state.quickAppNavigationItems] : [...state.panelAppNavigationItems];
            const contactSpecificApps = [];
            const globalApps = [];
            if (action.payload.dest.droppableId === 'droppable-2' || action.payload.dest.droppableId === 'droppable-3') {
                copyItems.forEach((item) => {
                    const menuItem = action.payload.navigationItemList.find((navItem) => navItem.menuName === item.menuName);
                    if (menuItem) {
                        if (item === null || item === void 0 ? void 0 : item.contactApp) {
                            contactSpecificApps.push(item);
                        }
                        else {
                            globalApps.push(item);
                        }
                    }
                });
                copyItems = [...globalApps];
            }
            //Rearrange the items on drop of element
            copyItems.splice(destIndex, 0, copyItems.splice(srcIndex, 1)[0]);
            copyItems = [...contactSpecificApps, ...copyItems];
            const CXoneNavigationItems = {
                quickApps: isAppSpaceMenu ? action.payload.navigationItemsLS.quickApps : copyItems,
                panelApps: isAppSpaceMenu ? copyItems : action.payload.navigationItemsLS.panelApps,
            };
            localStorage.setItem(StorageKeys.CXONE_NAVIGATION_ITEMS, JSON.stringify(CXoneNavigationItems));
            return Object.assign(Object.assign({}, state), { quickAppNavigationItems: CXoneNavigationItems.quickApps, panelAppNavigationItems: CXoneNavigationItems.panelApps });
        },
        initializeCXoneNavigationItems: (state, action) => {
            return Object.assign(Object.assign({}, state), { quickAppNavigationItems: action.payload.quickApps, panelAppNavigationItems: action.payload.panelApps });
        },
        /**
         * Function to set selected menu
         * @param state - AppState
         * @param action - action.payload
         * @example - dispatch(setSelectedMenu(`{ name: menuName }`));
         * @returns
         */
        setSelectedMenu(state, action) {
            if (state.selectedMenuName === action.payload.name)
                return;
            // Check added to change Selected Menu only if the tab is not hidden by Agent Profile Configuration
            if (action.payload.name && isAppHidden(action.payload.name))
                return state;
            const externalProdUrls = JSON.parse(localStorage.getItem(StorageKeys.EXTERNAL_PRODUCT_URLS) || '{}');
            if (externalProdUrls && typeof externalProdUrls === 'object' && Object.keys(externalProdUrls).length > 0) {
                CXoneClient.instance.directory.dynamicDirectory.setSelectedTabs(externalProdUrls.selectedMenuPanelApp, action.payload.name);
            }
            return Object.assign(Object.assign({}, state), { selectedMenuName: action.payload.name });
        },
        /**
         * Function to toggle Digital Transcript Popup Open
         * @param state - Global State
         * @param action - action.payload
         * @example - dispatch(toggleDigitalTranscriptPopupOpen(true));
         * @returns
         */
        toggleDigitalTranscriptPopupOpen(state, action) {
            return Object.assign(Object.assign({}, state), { digitalTranscriptCurrentStatus: '', isDigitalTranscriptPopupOpen: action.payload });
        },
        /**
         * Function to toggle Digital Transcript Popup Close clicked
         * @param state - Global State
         * @param action - action.payload
         * @example - dispatch(toggleDigitalTranscriptPopupClose(true));
         * @returns
         */
        toggleDigitalTranscriptPopupClose(state, action) {
            return Object.assign(Object.assign({}, state), { digitalTranscriptCurrentStatus: '', isDigitalTranscriptPopupClose: action.payload });
        },
        /**
         * Function to set selected menu
         * @param state - AppState
         * @param action - action.payload
         * @example - dispatch(setOutboundBtnCliked(`{ isClicked: true/false }`));
         * @returns
         */
        setOutboundBtnCliked(state, action) {
            return Object.assign(Object.assign({}, state), { isOutboundAssignmentBtnClicked: action.payload });
        },
        /**
         * Function to set selected menu
         * @param state - AppState
         * @param action - action.payload
         * @example - dispatch(setTransferBtnCliked(`{ isClicked: true/false }`));
         * @returns
         */
        setDigitalContactTransferBtnCliked(state, action) {
            return Object.assign(Object.assign({}, state), { isDigitalContactTransferBtnClicked: action.payload });
        },
        /**
         * Function to set voice transfer button clicked
         * @param state - AppState
         * @param action - action.payload
         * @example - dispatch(setVoiceContactTransferBtnClicked(true));
         * @returns
         */
        setVoiceContactTransferBtnClicked(state, action) {
            return Object.assign(Object.assign({}, state), { isVoiceContactTransferBtnClicked: action.payload });
        },
        /**
         * Function to set voice conference button clicked
         * @param state - AppState
         * @param action - action.payload
         * @example - dispatch(setVoiceContactConferenceBtnClicked(true));
         * @returns
         */
        setVoiceContactConferenceBtnClicked(state, action) {
            return Object.assign(Object.assign({}, state), { isVoiceContactConferenceBtnClicked: action.payload });
        },
        /**
         * Function to set view/hide Details is clicked
         * @param state - AppState
         * @param action - action.payload
         * @example - dispatch(setTransferBtnCliked(`{ isClicked: true/false }`));
         * @returns
         */
        setViewDetailsClicked(state, action) {
            return Object.assign(Object.assign({}, state), { isViewDetailsClicked: action.payload });
        },
        /**
         * Function to set view/hide Details is clicked
         * @param state - AppState
         * @param action - action.payload
         * @example - dispatch(setTransferBtnCliked(`{ isClicked: true/false }`));
         * @returns
         */
        setInteractionSpaceClicked(state, action) {
            return Object.assign(Object.assign({}, state), { isInteractionSpaceClicked: action.payload });
        },
        /**
         * Function to set selected menu
         * @param state - AppState
         * @param action - action.payload
         * @example - dispatch(isWEMProductEnablement(`{ name: menuName }`));
         * @returns
         */
        isWEMProductEnablement(state, action) {
            state.WEM.isEnabled = action.payload;
            return state;
        },
        /**
         * Function to set agent copilot enablement
         * @param state - AppState
         * @param action - action.payload
         * @example - dispatch(setAgentCopilotEnablement(true));
         * @returns
         */
        setAgentCopilotEnablement(state, action) {
            state.isAgentCopilotEnabled = action.payload;
            return state;
        },
        /**
         * Function to set pointer Events when toast appear
         * @param state - AppState
         * @param action - action.payload
         * @example - dispatch(logoutToastMessageConfirmed(true));
         * @returns
         */
        logoutToastMessageConfirmed(state, action) {
            state.isLogoutOutToastMessage = action.payload;
            return state;
        },
        /**
         * Function to set pointer Events when toast appear
         * @param state - AppState
         * @param action - action.payload
         * @example - dispatch(storeLogoutToastRefrence(node));
         * @returns
         */
        storeLogoutToastRefrence(state, action) {
            state.logoutToastReference = action.payload;
            return state;
        },
        /**
         * Function to set network offline error toast reference
         * @param state - AppState
         * @param action - action.payload
         * @example - dispatch(setNetworkOfflineErrorToastMessage(id));
         * @returns - updated state object
         */
        setNetworkOfflineErrorToastMessage(state, action) {
            state.networkOfflineToastReference = action.payload;
            return state;
        },
        /**
         * Reducer function to store WEM url on state to be accessed globally
         * @param state - AppState
         * @param action - action.payload
         * @example - dispatch(storeWEMUrl(url));
         * @returns - updated state
         */
        storeWEMUrl(state, action) {
            state.WEM.externalUrl = action.payload;
            return state;
        },
        /**
         * Reducer function to update focus on top nav bar
         * @param state - AppState
         * @param action - action.payload
         * @example - dispatch(focusTopNavBar(false));
         * @returns - updated state
         */
        focusTopNavBar(state, action) {
            state.focusTopNavBar = action.payload;
            return state;
        },
        /**
         * Reducer function to open more menu
         * @param state - AppState
         * @param action - action.payload
         * @example - dispatch(openMoreMenu(false));
         * @returns - updated state
         */
        openMoreMenu(state, action) {
            state.moreMenu = action.payload;
            return state;
        },
        /**
         * Reducer function to open app space more menu
         * @param state - AppState
         * @param action - action.payload
         * @example - dispatch(openAppSpaceMoreMenu(false));
         * @returns - updated state
         */
        openAppSpaceMoreMenu(state, action) {
            state.appSpaceMoreMenu = action.payload;
            return state;
        },
        /**
         * Reducer function to update focus on launch button
         * @param state - AppState
         * @param action - action.payload
         * @example - dispatch(focusLaunchButton(false));
         * @returns - updated state
         */
        focusLaunchButton(state, action) {
            state.focusLaunchButton = action.payload;
            return state;
        },
        /**
         * Function to set selected menu
         * @param state - AppState
         * @param action - action.payload
         * @example - dispatch(updateAlertMessage(`{ message: alertMessage, type: type of message }`));
         * @returns
         */
        updateAlertMessage(state, action) {
            if (action.payload.message) {
                toast.error(_jsx(CcfAppToastMessage, { type: "error", titleMessage: action.payload.message, descriptionMessage: action.payload.subMessage, children: action.payload.children }), {
                    autoClose: false,
                    containerId: 'AppToastContainer',
                });
            }
            return Object.assign(Object.assign({}, state), { alertMessage: { message: action.payload.message, subMessage: action.payload.subMessage, type: action.payload.type } });
        },
        /**
         * Function to display the natural calling list messages
         * @param state - AppState
         * @param emptyList - emptyList.payload
         * @example - dispatch(updateNaturalCallingSkillListMessage(emptyList));
         * @returns
         */
        updateNaturalCallingSkillListMessage(state, emptyList) {
            toast.info(_jsx(CcfAppToastMessage, { type: 'info centerButton', naturalCallingSkillListParams: { translateDialerMessages: true, emptyList: emptyList.payload }, primaryBtnText: 'okay', triggerPrimaryHandler: () => toast.dismiss() }), {
                autoClose: false,
                closeButton: false,
                containerId: 'AppToastContainer',
            });
            return Object.assign(Object.assign({}, state), { message: { message: emptyList.payload, type: emptyList.payload } });
        },
        /**
         * Function to set Toast msg
         * @param state - AppState
         * @param action - action.payload
         * @example - dispatch(setToastMsg());
         * @returns
         */
        setToastMsg(state, action) {
            return Object.assign(Object.assign({}, state), { toastMsg: action.payload.msg });
        },
        /**
         * Function to set screenAgent port no
         * @param state - AppState
         * @param action - PayloadAction<number>
         * @example - dispatch(setScreenAgentPortNo();
         * @returns
         */
        setScreenAgentDetails(state, action) {
            state.screenAgentPortNo = action.payload;
            return state;
        },
        /**
       * Function to set page reload flag
       * @param state - AppState
       * @param action - action.payload
       * @example - dispatch(setPageReload(`{ isPageReloaded: true/false }`));
       * @returns updated state
       */
        setPageReload(state, action) {
            return Object.assign(Object.assign({}, state), { isPageReloaded: action.payload });
        },
        /**
         * Function to set page reload flag
         * @param state - AppState
         * @param action - action.payload
         * @example - dispatch(setPageReload(`{ isPageUnloading: true/false }`));
         * @returns updated state
         */
        setPageBeforeUnload(state, action) {
            return Object.assign(Object.assign({}, state), { isPageUnloading: action.payload });
        },
        /**
         * Function to set Custom Workspaces
         * @param state - AppState
         * @param action - action.payload
         * @example - dispatch(setPersistentPanels([]));
         * @returns updated state
         */
        setPersistentPanels(state, action) {
            const persistentPanelDetails = action.payload;
            return Object.assign(Object.assign({}, state), { persistentPanels: persistentPanelDetails });
        },
        /**
         * Function to select Custom Workspaces
         * @param state - AppState
         * @param action - action.payload
         * @example - dispatch(setActivePersistentPanel([]));
         * @returns updated state
         */
        setActivePersistentPanel(state, action) {
            const persistentPanelDetails = action.payload;
            return Object.assign(Object.assign({}, state), { activePersistentPanel: persistentPanelDetails });
        },
        /**
      /***
       * * Function to check if network is available
         * @param state - AppState
         * @param action - PayloadAction<boolean>
         * @example - dispatch(isNetworkOffline();
         * @returns
       */
        isNetworkOffline(state, action) {
            state.isNetworkOffline = action.payload;
            return state;
        },
        /**
         * Function to set whether the WebRTC Extension is Installed
         * @param state - AppState
         * @param action - action.payload
         * @example - setIsWebNCExtensionInstalled(true);
         * @returns updated state
         */
        setIsNoiseCancellationExtInstalled(state, action) {
            return Object.assign(Object.assign({}, state), { isNoiseCancellationExtInstalled: action.payload });
        },
        /**
         * Function to set whether the WebRTC NC Extension is Installed
         * @param state - AppState
         * @param action - action.payload
         * @example - setIsWebNCExtensionInstalled(true);
         * @returns updated state
         */
        setIsWebRTCExtensionInstalled(state, action) {
            return Object.assign(Object.assign({}, state), { isWebRTCExtensionInstalled: action.payload });
        },
        /***
       * * Function to update the value of user's custom attribute to check
       * if attribute related product app is enabled
       * userCustomeAttributes manages the visibility of Custom Attribute
         * @param state - AppState
         * @param action - action.payload
         * @example - dispatch(setUserCustomAttribute(userCustomAttribute: boolean);
         * @returns  updated AppState state with user custom attribute value
       */
        setUserCustomAttribute(state, action) {
            const attributeKeys = Object.keys(action.payload);
            if (attributeKeys.length) {
                state.userCustomAttributes = Object.assign(Object.assign({}, state.userCustomAttributes), { [attributeKeys[0]]: action.payload[attributeKeys[0]] });
            }
            ;
            return state;
        },
        /**
         * Reducer function to store current selected setLocale
         * @param state - AppState
         * @param action - action.payload
         * @example - dispatch(setLocale(locale));
         * @returns - updated state
         */
        setLocale(state, action) {
            state.locale = action.payload;
            return state;
        },
        /**
         * Reducer function to set the global timer
         * @param state - AppState
         * @param action - action.payload
         * @example - dispatch(setLocale(locale));
         * @returns - updated state
         */
        setTimer(state, action) {
            // const timeDiff = action.payload.valueOf() - state.timer.startTime.valueOf()
            return Object.assign(Object.assign({}, state), { timer: Object.assign(Object.assign({}, state.timer), { currentTime: action.payload }) });
        },
        /**
         * Reducer function to set the pinned Item
         * @param state - AppState
         * @param action - action.payload
         * @example - dispatch(setPinnedMenuItem());
         * @returns - updated state
         */
        setPinnedMenuItem(state, action) {
            LocalStorageHelper.setItem(StorageKeys.PINNED_MENU_ITEM, action.payload);
            return Object.assign(Object.assign({}, state), { pinnedMenuItem: action.payload });
        },
        /**
         * Default action to return from an epic middleware
         * if no releavant action present in the flow that could be used
         * @param state - AppState
         * @example - dispatch(default));
         * @returns
         */
        default(state) {
            return state;
        },
        /**
         * Function to set a flag if current tab is selected
         * @param state - global State
         * @param action  - PayloadAction`<boolean>`
         * @example -setDomVisibility(state,action)
         */
        setDomVisibility(state, action) {
            CXoneClient.instance.directory.dynamicDirectory.setDomVisibility(action.payload);
            state.isDomVisible = action.payload;
        },
        /**
             * Function to set the integrated agent setting
             * @param state - AppState
             * @param action  - PayloadAction<boolean>
             * @example -setIntegratedAgent(state, action)
             */
        setIntegratedAgent(state, action) {
            state.isIntegratedAgent = action.payload;
        },
        /**
             * Function to set digitalTranslationAvailableLanguages
             * @param state - AppState
             * @param action  - PayloadAction<boolean>
             * @example -setDigitalTranslationAvailableLanguages(state, action)
             */
        setDigitalTranslationAvailableLanguages(state, action) {
            state.digitalTranslationAvailableLanguages = action.payload;
        },
        /**
         * Function to set Auto summary enablement
         * @param state - AppState
         * @param action - action.payload
         * @example - dispatch(setAutoSummaryEnablement(true));
         * @returns
         */
        setAutoSummaryEnablement(state, action) {
            state.isAutoSummaryEnabled = action.payload;
            return state;
        },
        /**
         * Function to set Aria live message
         * @param state - AppState
         * @param action - action.payload
         * @example - dispatch(setAriaLiveAnnouncer(ariaMessage:'text',politeness:'polite'));
         * @returns
         */
        setAriaLiveAnnouncer(state, action) {
            state.ariaLiveAnnouncer.ariaMessage = action.payload.ariaMessage;
            state.ariaLiveAnnouncer.politeness = action.payload.politeness;
            state.ariaLiveAnnouncer.translateConfig = action.payload.translateConfig;
            return state;
        },
        /**
         * Function to set setVoiceBioFeatureEnablement enablement
         * @param state - AppState
         * @param action - action.payload
         * @example - dispatch(setVoiceBioFeatureEnablement(true));
         * @returns
         */
        setVoiceBioFeatureEnablement(state, action) {
            state.isVoiceBioHubFeatureEnabled = action.payload;
            return state;
        },
        /**
         * Function to set Lv Customer Card Enabled
         * Ref:
         * - https://nice-ce-cxone-prod.atlassian.net/browse/CRM-11683
         * - https://nice-ce-cxone-prod.atlassian.net/browse/OB-19327
         * - https://nice-ce-cxone-prod.atlassian.net/browse/UH-57118
         * @param state - AppState
         * @param action - action.payload
         * @example
         * ```
         * dispatch(setLvCustomerCardFeatureToggle(true));
         * ```
         * @returns
         */
        setLvCustomerCardFeatureToggle(state, action) {
            state.isLvCustomerCardFeatureToggleEnabled = action.payload;
            return state;
        },
        /**
         * Function to set Lv Desk Enabled
         * Ref:
         * - https://nice-ce-cxone-prod.atlassian.net/browse/CRM-11683
         * - https://nice-ce-cxone-prod.atlassian.net/browse/OB-19327
         * - https://nice-ce-cxone-prod.atlassian.net/browse/UH-57118
         * @param state - AppState
         * @param action - action.payload
         * @example
         * ```
         * dispatch(setLvDeskFeatureToggle(true));
         * ```
         * @returns
         */
        setLvDeskFeatureToggle(state, action) {
            state.isLvDeskFeatureToggleEnabled = action.payload;
            return state;
        },
        /**
         * Function to set isMPowerLogoFeatureToggleEnabled enablement
         * @param state - AppState
         * @param action - action.payload
         * @example - dispatch(setMPowerLogoFeatureToggleEnablement(true));
         * @returns
         */
        setMPowerLogoFeatureToggleEnablement(state, action) {
            state.isMPowerLogoFeatureToggleEnabled = action.payload;
            return state;
        },
        /**
         * Function to set isAgentProfileFeatureToggleEnabled enablement
         * @param state - AppState
         * @param action - action.payload
         * @example - dispatch(setMPowerLogoFeatureToggleEnablement(true));
         * @returns
         */
        setDesktopProfileFeatureStatus(state, action) {
            state.isDesktopProfileFeatureEnabled = action.payload;
            return state;
        },
        /**
         * Function to set isConversationsFeatureEnabled enablement
         * @param state - AppState
         * @param action - action.payload
         * @example - dispatch(setConversationsFeatureStatus(true));
         * @returns
         */
        setConversationsFeatureStatus(state, action) {
            state.isConversationsFeatureEnabled = action.payload;
            return state;
        },
        /**
         * @param state - AppState
         * @param action - action.payload = boolean value to store omilia handshake status
         * @returns - The modified state
         * @example - dispatch(globalActions.setIsOmiliaHandshakeDone(action.payload))
         */
        setIsOmiliaHandshakeDone(state, action) {
            state.isOmiliaHandshakeDone = action.payload;
            return state;
        },
        /**
         * @param state - Appstate
         * @param action - action.payload = boolean value to store loading status of custom workspace iframes
         * @returns
         * @example - dispatch(globalActions.setIsCustomIframesLoaded(action.payload))
         */
        setIsCustomIframesLoaded(state, action) {
            state.isCustomIframesLoaded = action.payload;
            return state;
        },
        /**
         * @param action - action for showing performance heap popup
         * @returns
         * @example - dispatch(globalActions.showPerformanceMonitor())
         */
        showPerformanceMonitor() {
            toast.warn(_jsx(CcfPerformanceToast, {}), {
                autoClose: 5000,
                containerId: 'AppToastContainer',
            });
        },
        /**
         * Update Contact Control Items
         * @param action - action.payload
         * @example - dispatch(globalActions.updateContactControlItems(action.payload))
         * @returns
         */
        updateContactControlItems(state, action) {
            state.contactControlItems = action.payload;
            return state;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(sendTranscript.pending, (state) => {
            return Object.assign(Object.assign({}, state), { digitalTranscriptCurrentStatus: DigitalTranscriptStatus.PENDING });
        })
            .addCase(sendTranscript.fulfilled, (state) => {
            return Object.assign(Object.assign({}, state), { digitalTranscriptCurrentStatus: DigitalTranscriptStatus.SUCCEEDED });
        })
            .addCase(sendTranscript.rejected, (state) => {
            return Object.assign(Object.assign({}, state), { digitalTranscriptCurrentStatus: DigitalTranscriptStatus.FAILED });
        });
    },
});
export const globalReducer = globalSlice.reducer;
export const globalActions = globalSlice.actions;
/**
 * Function to get app state
 * @param rootState - AppState
 * @returns It returns app state
 * @example - const appState = getAppState(rootState)
 */
export const getAppState = (rootState) => rootState[GLOBAL_APP_FEATURE_KEY];
export const getApplicationLanguageTranslations = createSelector(getAppState, (state) => state.language.translations);
export const getIntegratedAgent = createSelector(getAppState, (state) => state.isIntegratedAgent);
export const getApplicationLocale = createSelector(getAppState, (state) => state.locale);
export const getApplicationDirection = createSelector(getAppState, (state) => state.direction);
export const getSelectedMenuName = createSelector(getAppState, (state) => state === null || state === void 0 ? void 0 : state.selectedMenuName);
export const getIsOutboundBtnClicked = createSelector(getAppState, (state) => state === null || state === void 0 ? void 0 : state.isOutboundAssignmentBtnClicked);
export const getIsDigitalContactTransferBtnClicked = createSelector(getAppState, (state) => state === null || state === void 0 ? void 0 : state.isDigitalContactTransferBtnClicked);
export const getIsVoiceContactTransferBtnClicked = createSelector(getAppState, (state) => state === null || state === void 0 ? void 0 : state.isVoiceContactTransferBtnClicked);
export const getIsVoiceContactConferenceBtnClicked = createSelector(getAppState, (state) => state === null || state === void 0 ? void 0 : state.isVoiceContactConferenceBtnClicked);
export const getIsViewDetailsClicked = createSelector(getAppState, (state) => state === null || state === void 0 ? void 0 : state.isViewDetailsClicked);
export const getIsInteractionSpaceClicked = createSelector(getAppState, (state) => state === null || state === void 0 ? void 0 : state.isInteractionSpaceClicked);
export const getQuickAppNavigationItems = createSelector(getAppState, (state) => state === null || state === void 0 ? void 0 : state.quickAppNavigationItems);
export const getPanelAppNavigationItems = createSelector(getAppState, (state) => state === null || state === void 0 ? void 0 : state.panelAppNavigationItems);
export const getCommitmentItems = createSelector(getAppState, (state) => state === null || state === void 0 ? void 0 : state.commitmentPopoverItems);
export const getContactControlsItems = createSelector(getAppState, (state) => state === null || state === void 0 ? void 0 : state.contactControlItems);
export const checkWEMEnablement = createSelector(getAppState, (state) => state === null || state === void 0 ? void 0 : state.WEM.isEnabled);
export const isAgentCopilotLicenseEnabled = createSelector(getAppState, (state) => state === null || state === void 0 ? void 0 : state.isAgentCopilotEnabled);
export const getWEMUrl = createSelector(getAppState, (state) => state === null || state === void 0 ? void 0 : state.WEM.externalUrl);
export const getAlertMessage = createSelector(getAppState, (state) => state.alertMessage);
export const isLogoutOutToastMessageState = createSelector(getAppState, (state) => state.isLogoutOutToastMessage);
export const isLogoutToastOpen = createSelector(getAppState, (state) => state.logoutToastReference);
export const getToastMsg = createSelector(getAppState, (state) => state.toastMsg);
export const isPageReloaded = createSelector(getAppState, (state) => state.isPageReloaded);
export const isPageUnloading = createSelector(getAppState, (state) => state.isPageUnloading);
export const isNetworkOfflineStatus = createSelector(getAppState, (state) => state.isNetworkOffline);
export const isWebRTCExtensionInstalled = createSelector(getAppState, (state) => state === null || state === void 0 ? void 0 : state.isWebRTCExtensionInstalled);
export const isNoiseCancellationExtInstalled = createSelector(getAppState, (state) => state === null || state === void 0 ? void 0 : state.isNoiseCancellationExtInstalled);
export const getTopNavBarFocusStatus = createSelector(getAppState, (state) => state.focusTopNavBar);
export const getMoreMenuStatus = createSelector(getAppState, (state) => state.moreMenu);
export const getAppSpaceMoreMenuStatus = createSelector(getAppState, (state) => state.appSpaceMoreMenu);
export const getIsMPowerLogoFeatureToggleEnabled = createSelector(getAppState, (state) => state.isMPowerLogoFeatureToggleEnabled);
export const getLaunchButtonStatus = createSelector(getAppState, (state) => state.focusLaunchButton);
export const getIsVoiceBioHubFeatureEnabled = createSelector(getAppState, (state) => state.isVoiceBioHubFeatureEnabled);
export const getIsDesktopProfileFeatureEnabled = createSelector(getAppState, (state) => state.isDesktopProfileFeatureEnabled);
export const getIsConversationsFeatureEnabled = createSelector(getAppState, (state) => state.isConversationsFeatureEnabled);
/**
* Redux selector that returns User's custom attributes from the state
* @param state - Applications State
*/
export const getUserCustomAttributes = createSelector(getAppState, (state) => state.userCustomAttributes);
export const getCustomWorkspaces = createSelector(getAppState, (state) => state.persistentPanels);
export const getActivePersistentPanel = createSelector(getAppState, (state) => state.activePersistentPanel);
export const getCurrentTime = createSelector(getAppState, (state) => { var _a; return (_a = state === null || state === void 0 ? void 0 : state.timer) === null || _a === void 0 ? void 0 : _a.currentTime; });
export const getDomVisibility = createSelector(getAppState, (state) => state.isDomVisible);
export const getPinnedMenuItem = createSelector(getAppState, (state) => state === null || state === void 0 ? void 0 : state.pinnedMenuItem);
export const getIsDigitalTranscriptPopupOpen = createSelector(getAppState, (state) => state === null || state === void 0 ? void 0 : state.isDigitalTranscriptPopupOpen);
export const getIsDigitalTranscriptPopupClose = createSelector(getAppState, (state) => state === null || state === void 0 ? void 0 : state.isDigitalTranscriptPopupClose);
export const getDigitalTranscriptCurrentStatus = createSelector(getAppState, (state) => state === null || state === void 0 ? void 0 : state.digitalTranscriptCurrentStatus);
export const getIsAutoSummaryEnabled = createSelector(getAppState, (state) => state === null || state === void 0 ? void 0 : state.isAutoSummaryEnabled);
export const getLvCustomerCardFeatureToggle = createSelector(getAppState, (state) => state === null || state === void 0 ? void 0 : state.isLvCustomerCardFeatureToggleEnabled);
export const getLvDeskFeatureToggle = createSelector(getAppState, (state) => state === null || state === void 0 ? void 0 : state.isLvDeskFeatureToggleEnabled);
export const getAriaLiveAnnouncer = createSelector(getAppState, (state) => state === null || state === void 0 ? void 0 : state.ariaLiveAnnouncer);
export const getIsCustomIframesLoaded = createSelector(getAppState, (state) => state === null || state === void 0 ? void 0 : state.isCustomIframesLoaded);
export const getIsOmiliaHandshakeDone = createSelector(getAppState, (state) => state.isOmiliaHandshakeDone);
/**
 * Function to get digitalTranslationAvailableLanguages
 * @example useSelector(getDigitalTranslationAvailableLanguages)
 */
export const getDigitalTranslationAvailableLanguages = (state) => state.global.digitalTranslationAvailableLanguages;
/**
 * Function to move to directory to add new agent
 * @param panelAppNavigationItems - list of navigation items
 * @param navigation - tab to navigate
 * @param dispatch - the redux dispatch function
 * @example navigateToAppSpaceTab(dispatch, panelAppNavigationItems, navigation)
 */
export const navigateToAppSpaceTab = (navigationData) => {
    navigationData.dispatch(globalActions.setVoiceContactTransferBtnClicked(true));
    navigationData.dispatch(globalActions.setSelectedMenu({ name: Navigation.INTERACTION }));
    const activeTabApp = navigationData.panelAppNavigationItems.find((tab) => tab.menuName === navigationData.navigation);
    navigationData.dispatch(updateAppSpaceTabStatus({
        index: (activeTabApp === null || activeTabApp === void 0 ? void 0 : activeTabApp.menuName) || '',
        tab: (activeTabApp === null || activeTabApp === void 0 ? void 0 : activeTabApp.menuName) || '',
    }));
    if (navigationData.navigation === Navigation.DIRECTORY) {
        navigationData.dispatch(agentDirectoryActions.setFocusInDirectory(true));
    }
};
//# sourceMappingURL=global.app.slice.js.map