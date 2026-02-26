import { __awaiter } from "tslib";
import { CcfMessageType, CxaExtensionAdapter } from '@nice-devone/shared-apps-lib';
import { CXoneAcdClient } from '@nice-devone/acd-sdk';
import { CXoneClient } from '@nice-devone/agent-sdk';
import { PermissionKeys, PermissionValues, AgentSessionStartEvent, } from '@nice-devone/common-sdk';
import { LocalStorageHelper, Logger, StorageKeys } from '@nice-devone/core-sdk';
import { createAsyncThunk, createSelector, createSlice, } from '@reduxjs/toolkit';
export const VOICE_PREFERNCE_FEATURE_KEY = 'voicePreference';
export const CONNECT_USING_ACS = 'Connect using ACS';
export const ACS_VOICE_PREFERENCE = 'phone-AcsEnabled';
export const joinSession = createAsyncThunk('voicePreference/joinSession', (_, { rejectWithValue }) => __awaiter(void 0, void 0, void 0, function* () {
    const logger = new Logger('joinSession', 'CXoneSession');
    const response = yield CXoneAcdClient.instance.session
        .joinSession()
        .catch((error) => {
        logger.debug('[CXoneSession][joinSession]', `payload: ${JSON.stringify(error)}`);
        throw rejectWithValue(error);
    });
    return response;
}));
/**
 *
 * @param data - object with values of voice input and selected voice preference
 * @example returnStationID(data)
 * @returns string
 */
const returnStationID = (data) => {
    if (data.selectedVoicePref === 'stationId') {
        return data.voiceInputVal;
    }
    return '';
};
/**
 *
 * @param data - object with values of voice input and selected voice preference
 * @example returnStationPhoneNumber(data)
 * @returns string
 */
const returnStationPhoneNumber = (data) => {
    if (data.selectedVoicePref === 'phone' || data.selectedVoicePref === ACS_VOICE_PREFERENCE) {
        return data.voiceInputVal;
    }
    else if (data.selectedVoicePref === 'softPhone') {
        return 'WebRTC';
    }
    return '';
};
export const startSession = createAsyncThunk('voicePreference/startSession', (data, { rejectWithValue }) => __awaiter(void 0, void 0, void 0, function* () {
    let response;
    if (((data.selectedVoicePref === 'phone' ||
        data.selectedVoicePref === 'stationId' ||
        data.selectedVoicePref === ACS_VOICE_PREFERENCE) &&
        data.voiceInputVal.length > 1) ||
        data.selectedVoicePref === 'softPhone') {
        const startSessionObj = {
            stationId: returnStationID(data),
            stationPhoneNumber: returnStationPhoneNumber(data),
        };
        if (data.selectedVoicePref === 'softPhone') {
            startSessionObj.stationPhoneNumber = 'WebRTC';
        }
        response = yield CXoneAcdClient.instance.session
            .startSession(startSessionObj)
            .catch((error) => {
            throw rejectWithValue(error);
        });
    }
    return response;
}));
export const checkStationOptionPermissions = createAsyncThunk('voicePreference/hasPermissions ', (_, { dispatch }) => __awaiter(void 0, void 0, void 0, function* () {
    const logger = new Logger('hasPermissions', 'CXoneSession');
    try {
        let permissionAvailable = false;
        let permissionResponse = yield CXoneClient.instance.agentPermission.getPermissions();
        permissionResponse = permissionResponse;
        permissionResponse.forEach((permission) => {
            if (permission.key.toUpperCase() ===
                PermissionKeys.AGENT_SOFTPHONE.toUpperCase() &&
                permission.value.toUpperCase() === PermissionValues.VIEW.toUpperCase()) {
                permissionAvailable = true;
                dispatch(voicePreferenceActions.setSoftphonePermission());
            }
            else if (permission.key.toUpperCase() ===
                PermissionKeys.AGENT_PHONE.toUpperCase() &&
                permission.value.toUpperCase() === PermissionValues.VIEW.toUpperCase()) {
                permissionAvailable = true;
                dispatch(voicePreferenceActions.setPhonePermission());
            }
            else if (permission.key.toUpperCase() ===
                PermissionKeys.AGENT_STATION.toUpperCase() &&
                permission.value.toUpperCase() === PermissionValues.VIEW.toUpperCase()) {
                permissionAvailable = true;
                dispatch(voicePreferenceActions.setStationIdPermission());
            }
            else if (permission.key.toUpperCase() ===
                PermissionKeys.ACS.toUpperCase() &&
                permission.value.toUpperCase() === PermissionValues.VIEW.toUpperCase()) {
                permissionAvailable = true;
                dispatch(voicePreferenceActions.setAcsPermission());
            }
        });
        if (!permissionAvailable) {
            CxaExtensionAdapter.instance.sendMessageToExtension({
                type: CcfMessageType.UnAuthenticated,
                data: { isAuth: false },
            });
            dispatch(voicePreferenceActions.showError());
        }
    }
    catch (error) {
        dispatch(voicePreferenceActions.showError());
        logger.debug('[CXoneSession][getPermissions]', `payload: ${JSON.stringify(error)}`);
    }
}));
export const hasIntegratedSoftphonePermission = createAsyncThunk('voicePreference/hasIntegratedSoftphonePermission', (_data, { rejectWithValue }) => __awaiter(void 0, void 0, void 0, function* () {
    const cxoneClient = CXoneClient.instance;
    const agentPermission = yield cxoneClient.agentPermission
        .checkPermissions(PermissionKeys.AGENT_SOFTPHONE, PermissionValues.VIEW)
        .catch((error) => {
        throw rejectWithValue(error);
    });
    return agentPermission;
}));
export const isAudiocodesEnabled = createAsyncThunk('voicePreference/isAudiocodesEnabled', (_data, { rejectWithValue }) => __awaiter(void 0, void 0, void 0, function* () {
    const cxoneClient = CXoneClient.instance;
    const agentSettings = yield cxoneClient.agentSetting
        .getAgentSettings()
        .catch((error) => {
        throw rejectWithValue(error);
    });
    if (agentSettings &&
        agentSettings.webRTCType.toLowerCase() === 'audiocodes') {
        return true;
    }
    return false;
}));
export const evaluateUserLocation = createAsyncThunk('voicePreference/evaluateUserLocation', (_data, { rejectWithValue }) => __awaiter(void 0, void 0, void 0, function* () {
    const logger = new Logger('evaluateUserLocation', 'CXoneSession');
    const userLocation = yield CXoneClient.instance.cxoneUser.getUserLocation()
        .catch(error => {
        logger.debug('[CXoneSession][getUserLocation]', `payload: ${JSON.stringify(error)}`);
        rejectWithValue(error);
    });
    return userLocation;
}));
export const selectUserLocation = createAsyncThunk('voicePreference/selectUserLocation', (locationId, { dispatch }) => __awaiter(void 0, void 0, void 0, function* () {
    const logger = new Logger('selectUserLocation', 'CXoneSession');
    try {
        yield CXoneClient.instance.cxoneUser.setUserLocation(locationId);
        dispatch(voicePreferenceActions.setSelectedUserLocation(locationId));
    }
    catch (error) {
        logger.debug('[CXoneSession][selectUserLocation]', `payload: ${JSON.stringify(error)}`);
    }
}));
export const initialVoicePrefernceState = {
    radioDataOptions: {
        data: [
            {
                value: 'phone',
                label: 'Set Phone Number',
                toolTipText: 'Phone Number',
                showRadioOption: false,
            },
            {
                value: 'stationId',
                label: 'Set Station ID',
                toolTipText: 'Station ID',
                showRadioOption: false,
            },
            {
                value: 'softPhone',
                label: 'Integrated Softphone',
                toolTipText: 'Integrated Softphone',
                showRadioOption: false,
            },
            {
                value: ACS_VOICE_PREFERENCE,
                label: CONNECT_USING_ACS,
                toolTipText: CONNECT_USING_ACS,
                showRadioOption: false,
            }
        ],
        defaultSelected: 'phone',
        showInfoIcon: true,
        stationOptionsPermissions: false,
        integratedSoftphonePermission: false,
        phonePermission: false,
        acsPermissions: false,
    },
    voicePrefInput: {
        enteredVoicePrefInput: '',
    },
    buttonTypeOptions: {
        buttonDisabled: true,
    },
    checkboxTypeOptions: {
        checkboxVal: false,
    },
    sessionResponse: {
        isSessionActive: '',
        sessionStatusText: '',
        sessionStatusCode: '',
        sessionErrorDescription: '',
    },
    voicePermissionsEnabled: false,
    authError: false,
    showError: false,
    selectedVoicePreferenceValue: '',
    agentSessionInfo: new AgentSessionStartEvent(),
    maxConference: 3,
    userLocation: [],
    modeOfOperation: '',
    selectedUserLocation: '',
};
export const voicePreference = createSlice({
    name: VOICE_PREFERNCE_FEATURE_KEY,
    initialState: initialVoicePrefernceState,
    reducers: {
        /**
         * Function to check voice preference radio selection
         * @param state - VoicePreferenceState
         * @param action - PayloadAction<string>
         * @example dispatch(stationOptionSelected(e.target.value));
         * @returns
         */
        stationOptionSelected(state, action) {
            return Object.assign(Object.assign({}, state), { radioDataOptions: Object.assign(Object.assign({}, state.radioDataOptions), { defaultSelected: action.payload }), voicePrefInput: Object.assign(Object.assign({}, state.voicePrefInput), { enteredVoicePrefInput: '' }), buttonTypeOptions: Object.assign(Object.assign({}, state.buttonTypeOptions), { buttonDisabled: action.payload === 'softPhone' ? false : true }), sessionResponse: {
                    isSessionActive: false,
                    sessionStatusText: '',
                    sessionStatusCode: '',
                    sessionErrorDescription: '',
                } });
        },
        /**
         * Function to set voice preference input text
         * @param state - VoicePreferenceState
         * @param action - PayloadAction<string>
         * @example dispatch(stationInputNumberAdded(e.target.value));
         * @returns
         */
        stationInputNumberAdded(state, action) {
            return Object.assign(Object.assign({}, state), { voicePrefInput: Object.assign(Object.assign({}, state.voicePrefInput), { enteredVoicePrefInput: action.payload }), buttonTypeOptions: Object.assign(Object.assign({}, state.buttonTypeOptions), { buttonDisabled: action.payload.length > 0 ? false : true }) });
        },
        /**
         * Function to set checkbox selection
         * @param state - VoicePreferenceState
         * @param action - PayloadAction<boolean>
         * @example dispatch(rememberPreferenceChecked(e.target.checked));
         * @returns
         */
        rememberPreferenceChecked(state, action) {
            return Object.assign(Object.assign({}, state), { checkboxTypeOptions: Object.assign(Object.assign({}, state.checkboxTypeOptions), { checkboxVal: action.payload }) });
        },
        /**
         *
         * @param state - VoicePreferenceState
         * @param action - PayloadAction<keyable>
         * @example dispatch(isSessionActive())
         * @returns
         */
        setActiveSession(state, action) {
            state.sessionResponse.isSessionActive = true;
            const agentSessionStartEvent = action.payload.data;
            state.selectedVoicePreferenceValue = agentSessionStartEvent.stationPhoneNumber;
        },
        /**
         * @param state - VoicePreferenceState
         * @param action - PayloadAction<keyable>
         * @example dispatch(setAgentSessionInfo())
         * @returns
         */
        setAgentSessionInfo(state, action) {
            const agentSessionInfo = action.payload.data;
            state.agentSessionInfo = agentSessionInfo;
        },
        /**
         *
         * @param state - VoicePreferenceState
         * @param action - PayloadAction<keyable>
         * @example dispatch(isSessionActive())
         * @returns
         */
        inActiveSession(state, action) {
            const agentId = LocalStorageHelper.getItem(StorageKeys.USER_INFO, true)['icAgentId'];
            const pastLogins = LocalStorageHelper.getItem(StorageKeys.VOICE_PREFERENCE, true) || [];
            const oldLogin = pastLogins.find((login) => login.agentId === agentId);
            if (!oldLogin) {
                state.voicePrefInput.enteredVoicePrefInput = '';
            }
            (action === null || action === void 0 ? void 0 : action.payload)
                ? (state.sessionResponse.isSessionActive = '')
                : (state.sessionResponse.isSessionActive = false);
        },
        /**
         *
         * @param state - VoicePreferenceState
         * @example dispatch(setSoftphonePermission())
         * @returns
         */
        setSoftphonePermission(state) {
            state.voicePermissionsEnabled = true;
            state.radioDataOptions.integratedSoftphonePermission = true;
            state.radioDataOptions.data[2].showRadioOption = true;
            if (!state.radioDataOptions.phonePermission) {
                state.radioDataOptions.defaultSelected = 'softPhone';
                state.buttonTypeOptions.buttonDisabled = false;
            }
        },
        /**
         *
         * @param state - VoicePreferenceState
         * @example dispatch(setPhonePermission())
         * @returns
         */
        setPhonePermission(state) {
            state.voicePermissionsEnabled = true;
            state.radioDataOptions.phonePermission = true;
            state.radioDataOptions.data[0].showRadioOption = true;
            state.radioDataOptions.stationOptionsPermissions = true;
            state.radioDataOptions.defaultSelected = 'phone';
            state.buttonTypeOptions.buttonDisabled = true;
        },
        /**
         *
         * @param state - VoicePreferenceState
         * @example dispatch(setStationIdPermission())
         * @returns
         */
        setStationIdPermission(state) {
            state.voicePermissionsEnabled = true;
            state.radioDataOptions.data[1].showRadioOption = true;
            state.radioDataOptions.stationOptionsPermissions = true;
            if (!state.radioDataOptions.phonePermission) {
                state.radioDataOptions.defaultSelected = 'stationId';
                state.buttonTypeOptions.buttonDisabled = true;
            }
        },
        /**
        * @param state - VoicePreferenceState
        * @example
        * ```
        * dispatch(setAcsPermission())
        * ```
        * @returns null
        */
        setAcsPermission(state) {
            state.voicePermissionsEnabled = true;
            state.radioDataOptions.data[3].showRadioOption = true;
            state.buttonTypeOptions.buttonDisabled = true;
            state.radioDataOptions.acsPermissions = true;
            /**
             * This checks the permission whether the permission is enabled or not.
             * If permission is there then by default highlight particular specific permission.
             */
            const radioOptions = state.radioDataOptions;
            if (radioOptions === null || radioOptions === void 0 ? void 0 : radioOptions.phonePermission) {
                state.radioDataOptions.defaultSelected = 'phone';
            }
            else if (radioOptions === null || radioOptions === void 0 ? void 0 : radioOptions.stationOptionsPermissions) {
                state.radioDataOptions.defaultSelected = 'stationId';
            }
            else if (radioOptions === null || radioOptions === void 0 ? void 0 : radioOptions.integratedSoftphonePermission) {
                state.radioDataOptions.defaultSelected = 'softPhone';
                state.buttonTypeOptions.buttonDisabled = false;
            }
            else {
                state.radioDataOptions.defaultSelected = ACS_VOICE_PREFERENCE;
            }
        },
        /**
         *
         * @param state - showError
         * @example dispatch(showError())
         * @returns
         */
        showError(state) {
            state.voicePermissionsEnabled = false;
            state.showError = true;
        },
        /**
         *
         * @param state - showError
         * @example dispatch(showError())
         * @returns
         */
        showAuthError(state) {
            state.authError = true;
            state.showError = true;
        },
        /**
         * Sets or resets CXone Agent MaxConference
         * @param state - setMaxConference
         * @example dispatch(setMaxConference())
         * @returns
         */
        setMaxConference(state, action) {
            state.maxConference = action.payload;
        },
        /**
         * Sets the selected user location
         * @param state - VoicePreferenceState
         * @param action - PayloadAction<string>
         * @example
         * ```
         * dispatch(setSelectedUserLocation('locationId'))
         * ```
         */
        setSelectedUserLocation(state, action) {
            state.selectedUserLocation = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(isAudiocodesEnabled.fulfilled, (state, action) => {
            state.radioDataOptions.data[2].showRadioOption = action.payload;
            state.radioDataOptions.stationOptionsPermissions = true;
        })
            .addCase(isAudiocodesEnabled.rejected, (state) => {
            state.radioDataOptions.data[2].showRadioOption = false;
            state.radioDataOptions.stationOptionsPermissions = false;
        })
            .addCase(startSession.fulfilled, (state, successResponse) => {
            var _a, _b;
            state.sessionResponse.sessionStatusText = (_a = successResponse.payload) === null || _a === void 0 ? void 0 : _a.statusText;
            state.sessionResponse.sessionStatusCode = (_b = successResponse.payload) === null || _b === void 0 ? void 0 : _b.status;
        })
            .addCase(startSession.rejected, (state, errorResponse) => {
            var _a, _b, _c, _d, _e, _f, _g;
            state.sessionResponse.sessionStatusText = (_b = (_a = errorResponse.payload) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.statusText;
            state.sessionResponse.sessionStatusCode = (_d = (_c = errorResponse.payload) === null || _c === void 0 ? void 0 : _c.data) === null || _d === void 0 ? void 0 : _d.status;
            state.sessionResponse.sessionErrorDescription = (_g = (_f = (_e = errorResponse.payload) === null || _e === void 0 ? void 0 : _e.data) === null || _f === void 0 ? void 0 : _f.body) === null || _g === void 0 ? void 0 : _g.error_description;
        })
            .addCase(joinSession.fulfilled, (state, successResponse) => {
            var _a, _b;
            state.sessionResponse.sessionStatusText = (_a = successResponse.payload) === null || _a === void 0 ? void 0 : _a.statusText;
            state.sessionResponse.sessionStatusCode = (_b = successResponse.payload) === null || _b === void 0 ? void 0 : _b.status;
        })
            .addCase(evaluateUserLocation.fulfilled, (state, successResponse) => {
            var _a, _b, _c, _d;
            state.userLocation = (_a = successResponse.payload) === null || _a === void 0 ? void 0 : _a.locations;
            state.modeOfOperation = (_b = successResponse.payload) === null || _b === void 0 ? void 0 : _b.modeOfOperation;
            state.selectedUserLocation = (_d = (_c = state === null || state === void 0 ? void 0 : state.userLocation) === null || _c === void 0 ? void 0 : _c.filter((location) => location === null || location === void 0 ? void 0 : location.matchedLocation)[0]) === null || _d === void 0 ? void 0 : _d.id;
        })
            .addCase(evaluateUserLocation.rejected, (state) => {
            state.userLocation = [];
            state.modeOfOperation = '';
            state.selectedUserLocation = '';
        });
    },
});
export const voicePreferenceReducer = voicePreference.reducer;
export const voicePreferenceActions = voicePreference.actions;
/**
 * Function to get voice preference state
 * @param rootState - VoicePreferenceState
 * @returns It returns voice preference
 * @example - const voicePreference = getVoicePreferenceState(rootState)
 */
const getVoicePreferenceState = (rootState) => {
    return rootState[VOICE_PREFERNCE_FEATURE_KEY];
};
export const selectVoicePrefernceState = createSelector(getVoicePreferenceState, (state) => state.radioDataOptions);
export const selectVoicePrefInputState = createSelector(getVoicePreferenceState, (state) => state.voicePrefInput);
export const selectVoicePrefernceBtnState = createSelector(getVoicePreferenceState, (state) => state.buttonTypeOptions);
export const selectVoicePrefCheckboxState = createSelector(getVoicePreferenceState, (state) => state.checkboxTypeOptions);
export const selectAcdSessionActiveState = createSelector(getVoicePreferenceState, (state) => state === null || state === void 0 ? void 0 : state.sessionResponse);
export const stationOptionsPermissionsState = createSelector(getVoicePreferenceState, (state) => state === null || state === void 0 ? void 0 : state.radioDataOptions.stationOptionsPermissions);
export const integratedSoftphonePermissionState = createSelector(getVoicePreferenceState, (state) => state === null || state === void 0 ? void 0 : state.radioDataOptions.integratedSoftphonePermission);
export const voicePermissionsEnabledState = createSelector(getVoicePreferenceState, (state) => state === null || state === void 0 ? void 0 : state.voicePermissionsEnabled);
export const showErrorState = createSelector(getVoicePreferenceState, (state) => state === null || state === void 0 ? void 0 : state.showError);
export const authErrorState = createSelector(getVoicePreferenceState, (state) => state === null || state === void 0 ? void 0 : state.authError);
export const agentSelectedVoicePreference = createSelector(getVoicePreferenceState, (state) => state === null || state === void 0 ? void 0 : state.selectedVoicePreferenceValue);
export const getAgentSessionInfo = createSelector(getVoicePreferenceState, (state) => state.agentSessionInfo);
export const selectMaxConference = createSelector(getVoicePreferenceState, (state) => state === null || state === void 0 ? void 0 : state.maxConference);
export const getUserLocation = createSelector(getVoicePreferenceState, (state) => state === null || state === void 0 ? void 0 : state.userLocation);
export const getModeOfOperation = createSelector(getVoicePreferenceState, (state) => state === null || state === void 0 ? void 0 : state.modeOfOperation);
export const getSelectedUserLocation = createSelector(getVoicePreferenceState, (state) => state === null || state === void 0 ? void 0 : state.selectedUserLocation);
//# sourceMappingURL=ccf-acd-session.slice.js.map