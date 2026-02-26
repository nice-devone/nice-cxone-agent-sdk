import { __awaiter } from "tslib";
import { CcfLogger, CXoneClient } from '@nice-devone/agent-sdk';
import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import { setAllNotificationSettings, storeNotificationSettings } from './ccf-notification-settings.slice';
import { LocalStorageHelper, Logger, NotificationSettings, StorageKeys } from '@nice-devone/core-sdk';
import { getAvailableAudioDevices } from './ccf-voice-settings';
import { EmailMessageSortOrder } from '../../enums/email-message-sort-order-type';
const loggerInstance = new CcfLogger('fullSettings');
export const FULL_SETTINGS_KEY = 'cxoneAgentSettings';
const initialState = {
    avNotification: {
        audioAgentMessage: false,
        audioAgentMessageTone: 'agent-message',
        audioEndContact: false,
        audioEndContactTone: 'end-contact',
        audioNewContactReply: false,
        audioNewContactReplyTone: 'new-chat-message',
        audioNewContact: false,
        audioNewContactTone: 'new-contact',
        visualAgentMessage: false,
        visualEndContact: false,
        visualNewContactReply: false,
        visualNewContact: false,
    },
    integratedSoftphone: {
        softPhoneVolume: 0,
        secondaryDevice: 0,
        ringtone: 1,
        secondaryDeviceDelay: 0,
        secondaryDeviceName: 0,
    },
    autoAccept: false,
    twentyFourHourTime: false,
    panelPopout: false,
    pageActionPopout: true,
    sendOnEnter: 'allChannelsExceptEmail',
    loggingLevel: 0,
    expandSoftphone: false,
    emailMessageSortOrder: EmailMessageSortOrder.OLDEST_ON_TOP,
};
export const getAgentClientDataSettings = createAsyncThunk('cxoneAgentSettings/agentClientDataSettings', (_, { dispatch }) => __awaiter(void 0, void 0, void 0, function* () {
    const agentClientDataSettings = yield CXoneClient.instance.agentSetting.getAgentClientDataSettings();
    dispatch(ccfFullSettingsActions.updateAllSettings(agentClientDataSettings));
    const settingsMap = {
        panelPopout: NotificationSettings.PANEL_POPOUT,
        pageActionPopout: NotificationSettings.PAGE_ACTION_POPOUT,
        sendOnEnter: NotificationSettings.SEND_WITH_ENTER,
        twentyFourHourTime: NotificationSettings.TWENTY_FOUR_HOUR_TIME,
        autoAccept: NotificationSettings.AUTO_ACCEPT,
        expandSoftphone: NotificationSettings.EXPAND_SOFTPHONE,
        loggingLevel: StorageKeys.LOGGING_LEVEL,
    };
    Object.entries(settingsMap).forEach(([key, value]) => {
        const isPageActionSetting = key === 'pageActionPopout' && (agentClientDataSettings === null || agentClientDataSettings === void 0 ? void 0 : agentClientDataSettings[key]) !== undefined;
        if ((agentClientDataSettings === null || agentClientDataSettings === void 0 ? void 0 : agentClientDataSettings[key]) !== undefined && (agentClientDataSettings === null || agentClientDataSettings === void 0 ? void 0 : agentClientDataSettings[key]) !== null) {
            LocalStorageHelper.setItem(value, agentClientDataSettings[key]);
            if (value === StorageKeys.LOGGING_LEVEL) {
                Logger.config.setLevel(agentClientDataSettings[key]);
            }
        }
        else if (isPageActionSetting) {
            //keeping pageAction seperate to not change any existing local storage setting
            //need to check if pageAction is set in agentClientDataSettings as true/false or not, because if it does not exist we need it to be true by default
            LocalStorageHelper.setItem(value, agentClientDataSettings[key]);
        }
    });
    const integratedSoftphoneSettings = agentClientDataSettings === null || agentClientDataSettings === void 0 ? void 0 : agentClientDataSettings.integratedSoftphone;
    if (integratedSoftphoneSettings) {
        const softphoneSettingsMap = {
            softPhoneVolume: NotificationSettings.SOFTPHONE_VOLUME,
            secondaryDevice: NotificationSettings.SECONDARY_DEVICE,
            ringtone: NotificationSettings.RINGTONE,
            secondaryDeviceDelay: NotificationSettings.SECONDARY_DEVICE_DELAY,
        };
        Object.entries(softphoneSettingsMap).forEach(([key, value]) => {
            if ((integratedSoftphoneSettings === null || integratedSoftphoneSettings === void 0 ? void 0 : integratedSoftphoneSettings[key]) !== undefined &&
                (integratedSoftphoneSettings === null || integratedSoftphoneSettings === void 0 ? void 0 : integratedSoftphoneSettings[key]) !== null) {
                if (value === (softphoneSettingsMap === null || softphoneSettingsMap === void 0 ? void 0 : softphoneSettingsMap.secondaryDevice)) {
                    LocalStorageHelper.setItem(value, {
                        id: integratedSoftphoneSettings[key],
                        label: integratedSoftphoneSettings.secondaryDeviceName,
                    });
                }
                else {
                    LocalStorageHelper.setItem(value, integratedSoftphoneSettings[key]);
                }
            }
        });
        const devices = yield getAvailableAudioDevices();
        const selectedDeviceFromLocal = LocalStorageHelper.getItem(NotificationSettings.SECONDARY_DEVICE, true);
        const selectedDevice = devices === null || devices === void 0 ? void 0 : devices.filter((device) => String(device === null || device === void 0 ? void 0 : device.label).toLowerCase() === String(selectedDeviceFromLocal === null || selectedDeviceFromLocal === void 0 ? void 0 : selectedDeviceFromLocal.label).toLowerCase())[0];
        selectedDeviceFromLocal.id = (selectedDevice === null || selectedDevice === void 0 ? void 0 : selectedDevice.id) || 0;
        LocalStorageHelper.setItem(NotificationSettings.SECONDARY_DEVICE, selectedDeviceFromLocal);
        const payload = { integratedSoftphone: { secondaryDeviceName: (selectedDevice === null || selectedDevice === void 0 ? void 0 : selectedDevice.label) || 0, secondaryDevice: (selectedDevice === null || selectedDevice === void 0 ? void 0 : selectedDevice.id) || 0 } };
        dispatch(updateClientDataSettings(payload));
    }
    if (agentClientDataSettings === null || agentClientDataSettings === void 0 ? void 0 : agentClientDataSettings['avNotification']) {
        dispatch(storeNotificationSettings(agentClientDataSettings['avNotification']));
        dispatch(setAllNotificationSettings(agentClientDataSettings['avNotification']));
    }
}));
export const updateClientDataSettings = createAsyncThunk('cxoneAgentSettings/updateClientDataSettings', (clientData, { dispatch }) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield CXoneClient.instance.agentSetting.updateAgentClientDataSettings(clientData);
    if (typeof response === 'string') {
        dispatch(ccfFullSettingsActions.updateAllSettings(clientData));
    }
    else {
        loggerInstance.error('cxoneAgentSettings/updateClientDataSettings', response.message);
    }
}));
const ccfFullSettingsSlice = createSlice({
    name: FULL_SETTINGS_KEY,
    initialState,
    reducers: {
        /**
         * Reducer function to update all settings
         * @param state - cxoneAgentSettingsState
         * @param action - action.payload
         * @example - dispatch(updateAllSettings());
         * @returns - updated state
         */
        updateAllSettings(state, action) {
            var _a;
            return Object.assign(Object.assign(Object.assign({}, state), action.payload), { integratedSoftphone: Object.assign(Object.assign({}, state.integratedSoftphone), (_a = action.payload) === null || _a === void 0 ? void 0 : _a.integratedSoftphone) });
        },
        /**
         * Reducer function to store av Notification Settings
         * @param state - cxoneAgentSettingsState
         * @param action - action.payload
         * @example - dispatch(storeNotificationSettings());
         * @returns - updated state
         */
        storeNotificationSettings(state, action) {
            return Object.assign(Object.assign({}, state), { avNotification: action.payload });
        },
        /**
         * Reducer function to store integrated softphone settings
         * @param state - cxoneAgentSettingsState
         * @param action - action.payload
         * @example - dispatch(storeIntegratedSoftphoneSettings());
         * @returns - updated state
         */
        storeIntegratedSoftphoneSettings(state, action) {
            return Object.assign(Object.assign({}, state), { integratedSoftphone: action.payload });
        },
        /**
         * Reducer function to store auto accept settings
         * @param state - cxoneAgentSettingsState
         * @param action - action.payload
         * @example - dispatch(storeAutoAcceptSettings());
         * @returns - updated state
         */
        storeAutoAcceptSettings(state, action) {
            return Object.assign(Object.assign({}, state), { autoAccept: action.payload });
        },
        /**
         * Reducer function to store 24 hour time settings
         * @param state - cxoneAgentSettingsState
         * @param action - action.payload
         * @example - dispatch(storeTwentyFourHourTimeSettings());
         * @returns - updated state
         */
        storeTwentyFourHourTimeSettings(state, action) {
            return Object.assign(Object.assign({}, state), { twentyFourHourTime: action.payload });
        },
        /**
         * Reducer function to store panel popout settings
         * @param state - cxoneAgentSettingsState
         * @param action - action.payload
         * @example - dispatch(storePanelPopoutSettings());
         * @returns - updated state
         */
        storePanelPopoutSettings(state, action) {
            return Object.assign(Object.assign({}, state), { panelPopout: action.payload });
        },
        /**
         * Reducer function to store PAGE action popout settings
         * @param state - cxoneAgentSettingsState
         * @param action - action.payload
         * @example - dispatch(storePageActionPopoutSettings());
         * @returns - updated state
         */
        storePageActionPopoutSettings(state, action) {
            return Object.assign(Object.assign({}, state), { pageActionPopout: action.payload });
        },
        /**
         * Reducer function to store send on enter settings
         * @param state - cxoneAgentSettingsState
         * @param action - action.payload
         * @example - dispatch(storeSendOnEnterSettings());
         * @returns - updated state
         */
        storeSendOnEnterSettings(state, action) {
            return Object.assign(Object.assign({}, state), { sendOnEnter: action.payload });
        },
        /**
         * Reducer function to store logging level settings
         * @param state - cxoneAgentSettingsState
         * @param action - action.payload
         * @example - dispatch(storeLoggingLevelSettings());
         * @returns - updated state
         */
        storeLoggingLevelSettings(state, action) {
            return Object.assign(Object.assign({}, state), { loggingLevel: action.payload });
        },
        /**
         * Reducer function to expand softphone settings
         * @param state - cxoneAgentSettingsState
         * @param action - action.payload
         * @example - dispatch(storeExpandSoftphoneSettings());
         * @returns - updated state
         */
        storeSoftphoneExpandSettings(state, action) {
            return Object.assign(Object.assign({}, state), { expandSoftphone: action.payload });
        },
    },
});
export const ccfFullSettingsReducer = ccfFullSettingsSlice.reducer;
export const ccfFullSettingsActions = ccfFullSettingsSlice.actions;
/**
 * Function to get app state
 * @param rootState - AppState
 * @returns It returns app state
 * @example - const appState = getAppState(rootState)
 */
export const getCcfFullSettingsState = (rootState) => rootState[FULL_SETTINGS_KEY];
export const getNotificationSettings = createSelector(getCcfFullSettingsState, (state) => state.avNotification);
export const getIntegratedSoftphoneSettings = createSelector(getCcfFullSettingsState, (state) => state.integratedSoftphone);
export const getAutoAcceptSettings = createSelector(getCcfFullSettingsState, (state) => state.autoAccept);
export const getTwentyFourHourTimeSettings = createSelector(getCcfFullSettingsState, (state) => state.twentyFourHourTime);
export const getPanelPopoutSettings = createSelector(getCcfFullSettingsState, (state) => state.panelPopout);
export const getPageActionPopoutSettings = createSelector(getCcfFullSettingsState, (state) => state.pageActionPopout);
export const getSendOnEnterSettings = createSelector(getCcfFullSettingsState, (state) => state.sendOnEnter);
export const getLoggingLevelSettings = createSelector(getCcfFullSettingsState, (state) => state.loggingLevel);
export const getEmailMessageSortOrderSettings = createSelector(getCcfFullSettingsState, (state) => state.emailMessageSortOrder || EmailMessageSortOrder.OLDEST_ON_TOP);
export const getExpandSoftphoneSettings = createSelector(getCcfFullSettingsState, (state) => state.expandSoftphone);
//# sourceMappingURL=ccf-full-settings.slice.js.map