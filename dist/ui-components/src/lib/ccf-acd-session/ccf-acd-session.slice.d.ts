import { CXoneSdkError, AgentSessionResponse, AgentSessionStartEvent, Location, UserLocation } from '@nice-devone/common-sdk';
import { PayloadAction } from '@reduxjs/toolkit';
export declare const VOICE_PREFERNCE_FEATURE_KEY = "voicePreference";
export declare const CONNECT_USING_ACS = "Connect using ACS";
export declare const ACS_VOICE_PREFERENCE = "phone-AcsEnabled";
interface VoicePreferenceRadio {
    data: Array<{
        value: string;
        label: string;
        toolTipText: string;
        showRadioOption: boolean;
    }>;
    defaultSelected: string;
    showInfoIcon: boolean;
    stationOptionsPermissions: boolean;
    phonePermission: boolean;
    integratedSoftphonePermission: boolean;
    acsPermissions: boolean;
}
interface VoicePrefInputText {
    enteredVoicePrefInput: string;
}
interface ButtonType {
    buttonDisabled: boolean;
}
interface VoicePrefCheckbox {
    checkboxVal: boolean;
}
export interface SessionResponse {
    isSessionActive: boolean | string;
    sessionStatusText: string;
    sessionStatusCode: number | string;
    sessionErrorDescription: string;
}
export interface VoicePreferenceState {
    radioDataOptions: VoicePreferenceRadio;
    voicePrefInput: VoicePrefInputText;
    buttonTypeOptions: ButtonType;
    checkboxTypeOptions: VoicePrefCheckbox;
    sessionResponse: SessionResponse;
    voicePermissionsEnabled: boolean;
    authError: boolean;
    showError: boolean;
    selectedVoicePreferenceValue: string;
    agentSessionInfo: AgentSessionStartEvent;
    maxConference: number;
    userLocation: Location[];
    modeOfOperation: string;
    selectedUserLocation: string;
}
export declare const joinSession: import("@reduxjs/toolkit").AsyncThunk<CXoneSdkError | import("@nice-devone/common-sdk").HttpResponse, void, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<import("redux").AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
export declare const startSession: import("@reduxjs/toolkit").AsyncThunk<CXoneSdkError | import("@nice-devone/common-sdk").HttpResponse | undefined, {
    voiceInputVal: string;
    selectedVoicePref: string;
}, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<import("redux").AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
export declare const checkStationOptionPermissions: import("@reduxjs/toolkit").AsyncThunk<void, void, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<import("redux").AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
export declare const hasIntegratedSoftphonePermission: import("@reduxjs/toolkit").AsyncThunk<boolean, void, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<import("redux").AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
export declare const isAudiocodesEnabled: import("@reduxjs/toolkit").AsyncThunk<boolean, void, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<import("redux").AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
export declare const evaluateUserLocation: import("@reduxjs/toolkit").AsyncThunk<void | CXoneSdkError | UserLocation, void, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<import("redux").AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
export declare const selectUserLocation: import("@reduxjs/toolkit").AsyncThunk<void, string, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<import("redux").AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
export declare const initialVoicePrefernceState: VoicePreferenceState;
export declare const voicePreference: import("@reduxjs/toolkit").Slice<{
    checkboxTypeOptions: {
        checkboxVal: boolean;
    };
    radioDataOptions: import("immer/dist/internal").WritableDraft<VoicePreferenceRadio>;
    voicePrefInput: import("immer/dist/internal").WritableDraft<VoicePrefInputText>;
    buttonTypeOptions: import("immer/dist/internal").WritableDraft<ButtonType>;
    sessionResponse: import("immer/dist/internal").WritableDraft<SessionResponse>;
    voicePermissionsEnabled: boolean;
    authError: boolean;
    showError: boolean;
    selectedVoicePreferenceValue: string;
    agentSessionInfo: import("immer/dist/internal").WritableDraft<AgentSessionStartEvent>;
    maxConference: number;
    userLocation: import("immer/dist/internal").WritableDraft<Location>[];
    modeOfOperation: string;
    selectedUserLocation: string;
}, {
    /**
     * Function to check voice preference radio selection
     * @param state - VoicePreferenceState
     * @param action - PayloadAction<string>
     * @example dispatch(stationOptionSelected(e.target.value));
     * @returns
     */
    stationOptionSelected(state: import("immer/dist/internal").WritableDraft<VoicePreferenceState>, action: PayloadAction<string>): {
        radioDataOptions: {
            defaultSelected: string;
            data: import("immer/dist/internal").WritableDraft<{
                value: string;
                label: string;
                toolTipText: string;
                showRadioOption: boolean;
            }>[];
            showInfoIcon: boolean;
            stationOptionsPermissions: boolean;
            phonePermission: boolean;
            integratedSoftphonePermission: boolean;
            acsPermissions: boolean;
        };
        voicePrefInput: {
            enteredVoicePrefInput: string;
        };
        buttonTypeOptions: {
            buttonDisabled: boolean;
        };
        sessionResponse: {
            isSessionActive: false;
            sessionStatusText: string;
            sessionStatusCode: string;
            sessionErrorDescription: string;
        };
        checkboxTypeOptions: import("immer/dist/internal").WritableDraft<VoicePrefCheckbox>;
        voicePermissionsEnabled: boolean;
        authError: boolean;
        showError: boolean;
        selectedVoicePreferenceValue: string;
        agentSessionInfo: import("immer/dist/internal").WritableDraft<AgentSessionStartEvent>;
        maxConference: number;
        userLocation: import("immer/dist/internal").WritableDraft<Location>[];
        modeOfOperation: string;
        selectedUserLocation: string;
    };
    /**
     * Function to set voice preference input text
     * @param state - VoicePreferenceState
     * @param action - PayloadAction<string>
     * @example dispatch(stationInputNumberAdded(e.target.value));
     * @returns
     */
    stationInputNumberAdded(state: import("immer/dist/internal").WritableDraft<VoicePreferenceState>, action: PayloadAction<string>): {
        voicePrefInput: {
            enteredVoicePrefInput: string;
        };
        buttonTypeOptions: {
            buttonDisabled: boolean;
        };
        radioDataOptions: import("immer/dist/internal").WritableDraft<VoicePreferenceRadio>;
        checkboxTypeOptions: import("immer/dist/internal").WritableDraft<VoicePrefCheckbox>;
        sessionResponse: import("immer/dist/internal").WritableDraft<SessionResponse>;
        voicePermissionsEnabled: boolean;
        authError: boolean;
        showError: boolean;
        selectedVoicePreferenceValue: string;
        agentSessionInfo: import("immer/dist/internal").WritableDraft<AgentSessionStartEvent>;
        maxConference: number;
        userLocation: import("immer/dist/internal").WritableDraft<Location>[];
        modeOfOperation: string;
        selectedUserLocation: string;
    };
    /**
     * Function to set checkbox selection
     * @param state - VoicePreferenceState
     * @param action - PayloadAction<boolean>
     * @example dispatch(rememberPreferenceChecked(e.target.checked));
     * @returns
     */
    rememberPreferenceChecked(state: import("immer/dist/internal").WritableDraft<VoicePreferenceState>, action: PayloadAction<boolean>): {
        checkboxTypeOptions: {
            checkboxVal: boolean;
        };
        radioDataOptions: import("immer/dist/internal").WritableDraft<VoicePreferenceRadio>;
        voicePrefInput: import("immer/dist/internal").WritableDraft<VoicePrefInputText>;
        buttonTypeOptions: import("immer/dist/internal").WritableDraft<ButtonType>;
        sessionResponse: import("immer/dist/internal").WritableDraft<SessionResponse>;
        voicePermissionsEnabled: boolean;
        authError: boolean;
        showError: boolean;
        selectedVoicePreferenceValue: string;
        agentSessionInfo: import("immer/dist/internal").WritableDraft<AgentSessionStartEvent>;
        maxConference: number;
        userLocation: import("immer/dist/internal").WritableDraft<Location>[];
        modeOfOperation: string;
        selectedUserLocation: string;
    };
    /**
     *
     * @param state - VoicePreferenceState
     * @param action - PayloadAction<keyable>
     * @example dispatch(isSessionActive())
     * @returns
     */
    setActiveSession(state: import("immer/dist/internal").WritableDraft<VoicePreferenceState>, action: PayloadAction<AgentSessionResponse>): void;
    /**
     * @param state - VoicePreferenceState
     * @param action - PayloadAction<keyable>
     * @example dispatch(setAgentSessionInfo())
     * @returns
     */
    setAgentSessionInfo(state: import("immer/dist/internal").WritableDraft<VoicePreferenceState>, action: PayloadAction<AgentSessionResponse>): void;
    /**
     *
     * @param state - VoicePreferenceState
     * @param action - PayloadAction<keyable>
     * @example dispatch(isSessionActive())
     * @returns
     */
    inActiveSession(state: import("immer/dist/internal").WritableDraft<VoicePreferenceState>, action: PayloadAction<boolean>): void;
    /**
     *
     * @param state - VoicePreferenceState
     * @example dispatch(setSoftphonePermission())
     * @returns
     */
    setSoftphonePermission(state: import("immer/dist/internal").WritableDraft<VoicePreferenceState>): void;
    /**
     *
     * @param state - VoicePreferenceState
     * @example dispatch(setPhonePermission())
     * @returns
     */
    setPhonePermission(state: import("immer/dist/internal").WritableDraft<VoicePreferenceState>): void;
    /**
     *
     * @param state - VoicePreferenceState
     * @example dispatch(setStationIdPermission())
     * @returns
     */
    setStationIdPermission(state: import("immer/dist/internal").WritableDraft<VoicePreferenceState>): void;
    /**
    * @param state - VoicePreferenceState
    * @example
    * ```
    * dispatch(setAcsPermission())
    * ```
    * @returns null
    */
    setAcsPermission(state: import("immer/dist/internal").WritableDraft<VoicePreferenceState>): void;
    /**
     *
     * @param state - showError
     * @example dispatch(showError())
     * @returns
     */
    showError(state: import("immer/dist/internal").WritableDraft<VoicePreferenceState>): void;
    /**
     *
     * @param state - showError
     * @example dispatch(showError())
     * @returns
     */
    showAuthError(state: import("immer/dist/internal").WritableDraft<VoicePreferenceState>): void;
    /**
     * Sets or resets CXone Agent MaxConference
     * @param state - setMaxConference
     * @example dispatch(setMaxConference())
     * @returns
     */
    setMaxConference(state: import("immer/dist/internal").WritableDraft<VoicePreferenceState>, action: PayloadAction<number>): void;
    /**
     * Sets the selected user location
     * @param state - VoicePreferenceState
     * @param action - PayloadAction<string>
     * @example
     * ```
     * dispatch(setSelectedUserLocation('locationId'))
     * ```
     */
    setSelectedUserLocation(state: import("immer/dist/internal").WritableDraft<VoicePreferenceState>, action: PayloadAction<string>): void;
}, "voicePreference">;
export declare const voicePreferenceReducer: import("redux").Reducer<{
    checkboxTypeOptions: {
        checkboxVal: boolean;
    };
    radioDataOptions: import("immer/dist/internal").WritableDraft<VoicePreferenceRadio>;
    voicePrefInput: import("immer/dist/internal").WritableDraft<VoicePrefInputText>;
    buttonTypeOptions: import("immer/dist/internal").WritableDraft<ButtonType>;
    sessionResponse: import("immer/dist/internal").WritableDraft<SessionResponse>;
    voicePermissionsEnabled: boolean;
    authError: boolean;
    showError: boolean;
    selectedVoicePreferenceValue: string;
    agentSessionInfo: import("immer/dist/internal").WritableDraft<AgentSessionStartEvent>;
    maxConference: number;
    userLocation: import("immer/dist/internal").WritableDraft<Location>[];
    modeOfOperation: string;
    selectedUserLocation: string;
}, import("redux").AnyAction>;
export declare const voicePreferenceActions: import("@reduxjs/toolkit").CaseReducerActions<{
    /**
     * Function to check voice preference radio selection
     * @param state - VoicePreferenceState
     * @param action - PayloadAction<string>
     * @example dispatch(stationOptionSelected(e.target.value));
     * @returns
     */
    stationOptionSelected(state: import("immer/dist/internal").WritableDraft<VoicePreferenceState>, action: PayloadAction<string>): {
        radioDataOptions: {
            defaultSelected: string;
            data: import("immer/dist/internal").WritableDraft<{
                value: string;
                label: string;
                toolTipText: string;
                showRadioOption: boolean;
            }>[];
            showInfoIcon: boolean;
            stationOptionsPermissions: boolean;
            phonePermission: boolean;
            integratedSoftphonePermission: boolean;
            acsPermissions: boolean;
        };
        voicePrefInput: {
            enteredVoicePrefInput: string;
        };
        buttonTypeOptions: {
            buttonDisabled: boolean;
        };
        sessionResponse: {
            isSessionActive: false;
            sessionStatusText: string;
            sessionStatusCode: string;
            sessionErrorDescription: string;
        };
        checkboxTypeOptions: import("immer/dist/internal").WritableDraft<VoicePrefCheckbox>;
        voicePermissionsEnabled: boolean;
        authError: boolean;
        showError: boolean;
        selectedVoicePreferenceValue: string;
        agentSessionInfo: import("immer/dist/internal").WritableDraft<AgentSessionStartEvent>;
        maxConference: number;
        userLocation: import("immer/dist/internal").WritableDraft<Location>[];
        modeOfOperation: string;
        selectedUserLocation: string;
    };
    /**
     * Function to set voice preference input text
     * @param state - VoicePreferenceState
     * @param action - PayloadAction<string>
     * @example dispatch(stationInputNumberAdded(e.target.value));
     * @returns
     */
    stationInputNumberAdded(state: import("immer/dist/internal").WritableDraft<VoicePreferenceState>, action: PayloadAction<string>): {
        voicePrefInput: {
            enteredVoicePrefInput: string;
        };
        buttonTypeOptions: {
            buttonDisabled: boolean;
        };
        radioDataOptions: import("immer/dist/internal").WritableDraft<VoicePreferenceRadio>;
        checkboxTypeOptions: import("immer/dist/internal").WritableDraft<VoicePrefCheckbox>;
        sessionResponse: import("immer/dist/internal").WritableDraft<SessionResponse>;
        voicePermissionsEnabled: boolean;
        authError: boolean;
        showError: boolean;
        selectedVoicePreferenceValue: string;
        agentSessionInfo: import("immer/dist/internal").WritableDraft<AgentSessionStartEvent>;
        maxConference: number;
        userLocation: import("immer/dist/internal").WritableDraft<Location>[];
        modeOfOperation: string;
        selectedUserLocation: string;
    };
    /**
     * Function to set checkbox selection
     * @param state - VoicePreferenceState
     * @param action - PayloadAction<boolean>
     * @example dispatch(rememberPreferenceChecked(e.target.checked));
     * @returns
     */
    rememberPreferenceChecked(state: import("immer/dist/internal").WritableDraft<VoicePreferenceState>, action: PayloadAction<boolean>): {
        checkboxTypeOptions: {
            checkboxVal: boolean;
        };
        radioDataOptions: import("immer/dist/internal").WritableDraft<VoicePreferenceRadio>;
        voicePrefInput: import("immer/dist/internal").WritableDraft<VoicePrefInputText>;
        buttonTypeOptions: import("immer/dist/internal").WritableDraft<ButtonType>;
        sessionResponse: import("immer/dist/internal").WritableDraft<SessionResponse>;
        voicePermissionsEnabled: boolean;
        authError: boolean;
        showError: boolean;
        selectedVoicePreferenceValue: string;
        agentSessionInfo: import("immer/dist/internal").WritableDraft<AgentSessionStartEvent>;
        maxConference: number;
        userLocation: import("immer/dist/internal").WritableDraft<Location>[];
        modeOfOperation: string;
        selectedUserLocation: string;
    };
    /**
     *
     * @param state - VoicePreferenceState
     * @param action - PayloadAction<keyable>
     * @example dispatch(isSessionActive())
     * @returns
     */
    setActiveSession(state: import("immer/dist/internal").WritableDraft<VoicePreferenceState>, action: PayloadAction<AgentSessionResponse>): void;
    /**
     * @param state - VoicePreferenceState
     * @param action - PayloadAction<keyable>
     * @example dispatch(setAgentSessionInfo())
     * @returns
     */
    setAgentSessionInfo(state: import("immer/dist/internal").WritableDraft<VoicePreferenceState>, action: PayloadAction<AgentSessionResponse>): void;
    /**
     *
     * @param state - VoicePreferenceState
     * @param action - PayloadAction<keyable>
     * @example dispatch(isSessionActive())
     * @returns
     */
    inActiveSession(state: import("immer/dist/internal").WritableDraft<VoicePreferenceState>, action: PayloadAction<boolean>): void;
    /**
     *
     * @param state - VoicePreferenceState
     * @example dispatch(setSoftphonePermission())
     * @returns
     */
    setSoftphonePermission(state: import("immer/dist/internal").WritableDraft<VoicePreferenceState>): void;
    /**
     *
     * @param state - VoicePreferenceState
     * @example dispatch(setPhonePermission())
     * @returns
     */
    setPhonePermission(state: import("immer/dist/internal").WritableDraft<VoicePreferenceState>): void;
    /**
     *
     * @param state - VoicePreferenceState
     * @example dispatch(setStationIdPermission())
     * @returns
     */
    setStationIdPermission(state: import("immer/dist/internal").WritableDraft<VoicePreferenceState>): void;
    /**
    * @param state - VoicePreferenceState
    * @example
    * ```
    * dispatch(setAcsPermission())
    * ```
    * @returns null
    */
    setAcsPermission(state: import("immer/dist/internal").WritableDraft<VoicePreferenceState>): void;
    /**
     *
     * @param state - showError
     * @example dispatch(showError())
     * @returns
     */
    showError(state: import("immer/dist/internal").WritableDraft<VoicePreferenceState>): void;
    /**
     *
     * @param state - showError
     * @example dispatch(showError())
     * @returns
     */
    showAuthError(state: import("immer/dist/internal").WritableDraft<VoicePreferenceState>): void;
    /**
     * Sets or resets CXone Agent MaxConference
     * @param state - setMaxConference
     * @example dispatch(setMaxConference())
     * @returns
     */
    setMaxConference(state: import("immer/dist/internal").WritableDraft<VoicePreferenceState>, action: PayloadAction<number>): void;
    /**
     * Sets the selected user location
     * @param state - VoicePreferenceState
     * @param action - PayloadAction<string>
     * @example
     * ```
     * dispatch(setSelectedUserLocation('locationId'))
     * ```
     */
    setSelectedUserLocation(state: import("immer/dist/internal").WritableDraft<VoicePreferenceState>, action: PayloadAction<string>): void;
}, "voicePreference">;
export declare const selectVoicePrefernceState: ((state: {
    voicePreference: VoicePreferenceState;
}) => VoicePreferenceRadio) & import("reselect").OutputSelectorFields<(args_0: VoicePreferenceState) => VoicePreferenceRadio & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const selectVoicePrefInputState: ((state: {
    voicePreference: VoicePreferenceState;
}) => VoicePrefInputText) & import("reselect").OutputSelectorFields<(args_0: VoicePreferenceState) => VoicePrefInputText & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const selectVoicePrefernceBtnState: ((state: {
    voicePreference: VoicePreferenceState;
}) => ButtonType) & import("reselect").OutputSelectorFields<(args_0: VoicePreferenceState) => ButtonType & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const selectVoicePrefCheckboxState: ((state: {
    voicePreference: VoicePreferenceState;
}) => VoicePrefCheckbox) & import("reselect").OutputSelectorFields<(args_0: VoicePreferenceState) => VoicePrefCheckbox & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const selectAcdSessionActiveState: ((state: {
    voicePreference: VoicePreferenceState;
}) => SessionResponse) & import("reselect").OutputSelectorFields<(args_0: VoicePreferenceState) => SessionResponse & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const stationOptionsPermissionsState: ((state: {
    voicePreference: VoicePreferenceState;
}) => boolean) & import("reselect").OutputSelectorFields<(args_0: VoicePreferenceState) => boolean & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const integratedSoftphonePermissionState: ((state: {
    voicePreference: VoicePreferenceState;
}) => boolean) & import("reselect").OutputSelectorFields<(args_0: VoicePreferenceState) => boolean & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const voicePermissionsEnabledState: ((state: {
    voicePreference: VoicePreferenceState;
}) => boolean) & import("reselect").OutputSelectorFields<(args_0: VoicePreferenceState) => boolean & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const showErrorState: ((state: {
    voicePreference: VoicePreferenceState;
}) => boolean) & import("reselect").OutputSelectorFields<(args_0: VoicePreferenceState) => boolean & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const authErrorState: ((state: {
    voicePreference: VoicePreferenceState;
}) => boolean) & import("reselect").OutputSelectorFields<(args_0: VoicePreferenceState) => boolean & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const agentSelectedVoicePreference: ((state: {
    voicePreference: VoicePreferenceState;
}) => string) & import("reselect").OutputSelectorFields<(args_0: VoicePreferenceState) => string & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const getAgentSessionInfo: ((state: {
    voicePreference: VoicePreferenceState;
}) => AgentSessionStartEvent) & import("reselect").OutputSelectorFields<(args_0: VoicePreferenceState) => AgentSessionStartEvent & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const selectMaxConference: ((state: {
    voicePreference: VoicePreferenceState;
}) => number) & import("reselect").OutputSelectorFields<(args_0: VoicePreferenceState) => number & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const getUserLocation: ((state: {
    voicePreference: VoicePreferenceState;
}) => Location[]) & import("reselect").OutputSelectorFields<(args_0: VoicePreferenceState) => Location[] & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const getModeOfOperation: ((state: {
    voicePreference: VoicePreferenceState;
}) => string) & import("reselect").OutputSelectorFields<(args_0: VoicePreferenceState) => string & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const getSelectedUserLocation: ((state: {
    voicePreference: VoicePreferenceState;
}) => string) & import("reselect").OutputSelectorFields<(args_0: VoicePreferenceState) => string & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export {};
