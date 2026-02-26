import { __awaiter } from "tslib";
import { createSelector, createSlice, createAsyncThunk, } from '@reduxjs/toolkit';
import { LocalStorageHelper, Logger, StorageKeys } from '@nice-devone/core-sdk';
import { AgentStates } from '@nice-devone/agent-sdk';
import { CXoneAcdClient } from '@nice-devone/acd-sdk';
import { CXoneUser } from '@nice-devone/auth-sdk';
import { CXoneSdkError } from '@nice-devone/common-sdk';
export const AGENT_SETTINGS_KEY = 'agentSettings';
const agentProfileSettingsFromStorage = LocalStorageHelper.getItem(StorageKeys.AGENT_PROFILE_CONFIGURATION, true) || [];
const checkAgentProfileSettingsFromStorage = agentProfileSettingsFromStorage === null || agentProfileSettingsFromStorage === void 0 ? void 0 : agentProfileSettingsFromStorage.length;
;
/**
 * agentProfileDetails async thunk used to request Agent Profile API
 * @example - dispatch(agentProfileDetails())
 */
export const agentProfileDetails = createAsyncThunk('voicePreference/agentProfileDetails', (_data, { rejectWithValue }) => __awaiter(void 0, void 0, void 0, function* () {
    const logger = new Logger('agentProfileDetails', 'CXoneSession');
    const agentProfileSettingsFromStorage = LocalStorageHelper.getItem(StorageKeys.AGENT_PROFILE_CONFIGURATION, true);
    if (!agentProfileSettingsFromStorage) {
        try {
            const resp = yield CXoneUser.instance.getAgentProfileDetails();
            if (resp instanceof CXoneSdkError) {
                throw rejectWithValue(resp);
            }
            else {
                return resp;
            }
        }
        catch (error) {
            logger.debug('[CXoneSession][agentProfileDetails]', `payload: ${JSON.stringify(error)}`);
            throw rejectWithValue(error);
        }
    }
    else {
        logger.info('getAgentProfileDetails', 'Get agent settings from storage');
        return agentProfileSettingsFromStorage;
    }
}));
/**
 * addContact asyncthunk used to request interaction call
 * @example - dispatch(addContact())
 */
export const requestInteraction = createAsyncThunk('agentSettings/requestInteraction', (reqData, { getState }) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const availableState = AgentStates.Available;
    const logger = new Logger();
    const { agentSettings } = getState();
    const { agentState } = getState();
    const agentCurrentStatus = (_a = agentState.agentStatus) === null || _a === void 0 ? void 0 : _a.currentState.state;
    const routabilityObject = JSON.stringify({
        chat: false,
        email: false,
        workitem: reqData.workItemCount < agentSettings.mchSettings.workItemThreshold,
        sms: false,
        totalContacts: reqData.workItemCount < agentSettings.mchSettings.workItemThreshold,
    });
    if (agentSettings.mchSettings.requestContact && agentCurrentStatus === availableState || reqData.userRequest) {
        yield CXoneAcdClient.instance.contactManager.voiceService.requestInteraction(routabilityObject)
            .then((resp) => {
            logger.debug('[ccf-agent-setting-slice][requestInteraction]', `response: ${JSON.stringify(resp)}`);
        })
            .catch((error) => {
            logger.debug('[ccf-agent-setting-slice][requestInteraction]', `payload: ${JSON.stringify(error)}`);
        });
    }
}));
export const agentSettingInitialState = {
    mchSettings: {
        chatThreshold: 1,
        contactAutoFocus: false,
        deliveryMode: '0',
        emailThreshold: 1,
        requestContact: false,
        smsThreshold: 1,
        totalContactCount: 1,
        workItemThreshold: 1,
        digitalThreshold: 1,
        voiceThreshold: 1,
    },
    agentProfileSettings: {
        agentScreenSize: checkAgentProfileSettingsFromStorage ? agentProfileSettingsFromStorage.agentScreenSize : '',
        hideContactHistory: checkAgentProfileSettingsFromStorage ? agentProfileSettingsFromStorage.hideContactHistory : false,
        hideSearch: checkAgentProfileSettingsFromStorage ? agentProfileSettingsFromStorage.hideSearch : false,
        hideQueueCounter: checkAgentProfileSettingsFromStorage ? agentProfileSettingsFromStorage.hideQueueCounter : false,
        hideSchedule: checkAgentProfileSettingsFromStorage ? agentProfileSettingsFromStorage.hideSchedule : false,
        hideWEM: checkAgentProfileSettingsFromStorage ? agentProfileSettingsFromStorage.hideWEM : false,
        hideLaunch: checkAgentProfileSettingsFromStorage ? agentProfileSettingsFromStorage.hideLaunch : false,
        hideCustomWorkspace: checkAgentProfileSettingsFromStorage ? agentProfileSettingsFromStorage.hideCustomWorkspace : false,
        hideReporting: checkAgentProfileSettingsFromStorage ? agentProfileSettingsFromStorage.hideReporting : false,
        hideConversations: checkAgentProfileSettingsFromStorage ? agentProfileSettingsFromStorage.hideConversations : false,
        hideOBADHoc: checkAgentProfileSettingsFromStorage ? agentProfileSettingsFromStorage.hideOBADHoc : false,
        hideOBRedial: checkAgentProfileSettingsFromStorage ? agentProfileSettingsFromStorage.hideOBRedial : false,
        hideOBAgentConsult: checkAgentProfileSettingsFromStorage ? agentProfileSettingsFromStorage.hideOBAgentConsult : false,
        hideOBAddressBookConsult: checkAgentProfileSettingsFromStorage ? agentProfileSettingsFromStorage.hideOBAddressBookConsult : false,
        hideOBSkillConsult: checkAgentProfileSettingsFromStorage ? agentProfileSettingsFromStorage.hideOBSkillConsult : false,
        hideOBElevation: checkAgentProfileSettingsFromStorage ? agentProfileSettingsFromStorage.hideOBElevation : false,
        hideOBSaveAndRedial: checkAgentProfileSettingsFromStorage ? agentProfileSettingsFromStorage.hideOBSaveAndRedial : false,
        hideOBTransfer: checkAgentProfileSettingsFromStorage ? agentProfileSettingsFromStorage.hideOBTransfer : false,
        hideDirectorySearch: checkAgentProfileSettingsFromStorage ? agentProfileSettingsFromStorage.hideDirectorySearch : false,
        hideDirectoryAll: checkAgentProfileSettingsFromStorage ? agentProfileSettingsFromStorage.hideDirectoryAll : false,
        hideDirectoryFavorites: checkAgentProfileSettingsFromStorage ? agentProfileSettingsFromStorage.hideDirectoryFavorites : false,
        hideDirectoryAgents: checkAgentProfileSettingsFromStorage ? agentProfileSettingsFromStorage.hideDirectoryAgents : false,
        hideDirectoryTeams: checkAgentProfileSettingsFromStorage ? agentProfileSettingsFromStorage.hideDirectoryTeams : false,
        hideDirectorySkills: checkAgentProfileSettingsFromStorage ? agentProfileSettingsFromStorage.hideDirectorySkills : false,
        hideDirectoryStandardAddressBook: checkAgentProfileSettingsFromStorage ? agentProfileSettingsFromStorage.hideDirectoryStandardAddressBook : false,
    },
    isResizeWindowFunctionCalled: false,
};
export const agentSettingsSlice = createSlice({
    name: AGENT_SETTINGS_KEY,
    initialState: agentSettingInitialState,
    reducers: {
        /**
         * Function to set multi-channel settings
         * @param state - mchSettings
         * @param action  - PayloadAction<string>
         * @returns It returns updated multi-channel settings
         * @example -setMCHSettings('')
         */
        setMCHSettings(state, action) {
            return Object.assign(Object.assign({}, state), { mchSettings: Object.assign({}, action.payload) });
        },
        /**
         * Sets the agent profiles api response
         * @param state - AgentProfileSettings
         * @param action - PayloadAction<AgentProfileSettings>
         * @example - dispatch(setAgentProfileSettings(response))
         */
        setAgentProfileSettings(state, action) {
            state.agentProfileSettings = action.payload;
        },
        /**
         * Sets the isResizeWindowFunctionCalled if Resize Function is called in Voice Preference Screen
         * @param state - AgentSettings
         * @param action - PayloadAction<boolean>
         * @example - dispatch(setIsResizeWindowFunctionCalled(true))
         */
        setIsResizeWindowFunctionCalled(state, action) {
            state.isResizeWindowFunctionCalled = action.payload;
        },
        /**
         * Function to return default state for middleware
         * @param state - AgentSettings
         * @returns It returns default state
         * @example -getDefaultState()
         */
        getDefaultState(state) {
            return Object.assign({}, state);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(agentProfileDetails.fulfilled, (state, successResponse) => {
            state.agentProfileSettings = successResponse.payload;
        })
            .addCase(agentProfileDetails.rejected, (state) => {
            state.agentProfileSettings = {
                agentScreenSize: '',
                hideContactHistory: false,
                hideSearch: false,
                hideQueueCounter: false,
                hideSchedule: false,
                hideWEM: false,
                hideLaunch: false,
                hideCustomWorkspace: false,
                hideReporting: false,
                hideConversations: false,
                hideOBADHoc: false,
                hideOBRedial: false,
                hideOBAgentConsult: false,
                hideOBAddressBookConsult: false,
                hideOBSkillConsult: false,
                hideOBElevation: false,
                hideOBSaveAndRedial: false,
                hideOBTransfer: false,
                hideDirectorySearch: false,
                hideDirectoryAll: false,
                hideDirectoryFavorites: false,
                hideDirectoryAgents: false,
                hideDirectoryTeams: false,
                hideDirectorySkills: false,
                hideDirectoryStandardAddressBook: false,
            };
        });
    },
});
export const agentSettingsReducer = agentSettingsSlice.reducer;
export const agentSettingsActions = agentSettingsSlice.actions;
/**
 * Function to get agent settings
 * @param rootState - AgentSettings
 * @returns It returns agent settings
 * @example - const agentSettings = getAgentSettings(rootState)
 */
const getAgentSettings = (rootState) => {
    return rootState[AGENT_SETTINGS_KEY];
};
/**
 * used to get multi-channel settings
 * @example - const mchSettings = useSelector(getmchSettings);
 */
export const getmchSettings = createSelector(getAgentSettings, (state) => {
    return state.mchSettings;
});
export const getAgentProfileSettings = createSelector(getAgentSettings, (state) => state === null || state === void 0 ? void 0 : state.agentProfileSettings);
export const getIsResizeWindowFunctionCalled = createSelector(getAgentSettings, (state) => state === null || state === void 0 ? void 0 : state.isResizeWindowFunctionCalled);
//# sourceMappingURL=ccf-agent-setting-slice.js.map