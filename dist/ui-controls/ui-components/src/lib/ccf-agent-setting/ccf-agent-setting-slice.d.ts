import { PayloadAction } from '@reduxjs/toolkit';
import { AgentProfileSettings } from '@nice-devone/core-sdk';
export declare const AGENT_SETTINGS_KEY = "agentSettings";
export interface MCHSetting {
    chatThreshold: number;
    smsThreshold: number;
    emailThreshold: number;
    workItemThreshold: number;
    digitalThreshold: number;
    contactAutoFocus: boolean;
    requestContact: boolean;
    deliveryMode: string;
    totalContactCount: number;
    voiceThreshold: number;
}
export interface AgentSettingState {
    mchSettings: MCHSetting;
    agentProfileSettings: AgentProfileSettings;
    isResizeWindowFunctionCalled: boolean;
}
export interface RequestInteractionData {
    workItemCount: number;
    userRequest: boolean;
}
/**
 * agentProfileDetails async thunk used to request Agent Profile API
 * @example - dispatch(agentProfileDetails())
 */
export declare const agentProfileDetails: import("@reduxjs/toolkit").AsyncThunk<AgentProfileSettings, void, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<import("redux").AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
/**
 * addContact asyncthunk used to request interaction call
 * @example - dispatch(addContact())
 */
export declare const requestInteraction: import("@reduxjs/toolkit").AsyncThunk<void, RequestInteractionData, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<import("redux").AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
export declare const agentSettingInitialState: AgentSettingState;
export declare const agentSettingsSlice: import("@reduxjs/toolkit").Slice<{
    mchSettings: import("immer/dist/internal").WritableDraft<MCHSetting>;
    agentProfileSettings: import("immer/dist/internal").WritableDraft<AgentProfileSettings>;
    isResizeWindowFunctionCalled: boolean;
}, {
    /**
     * Function to set multi-channel settings
     * @param state - mchSettings
     * @param action  - PayloadAction<string>
     * @returns It returns updated multi-channel settings
     * @example -setMCHSettings('')
     */
    setMCHSettings(state: import("immer/dist/internal").WritableDraft<AgentSettingState>, action: PayloadAction<MCHSetting>): {
        mchSettings: {
            chatThreshold: number;
            smsThreshold: number;
            emailThreshold: number;
            workItemThreshold: number;
            digitalThreshold: number;
            contactAutoFocus: boolean;
            requestContact: boolean;
            deliveryMode: string;
            totalContactCount: number;
            voiceThreshold: number;
        };
        agentProfileSettings: import("immer/dist/internal").WritableDraft<AgentProfileSettings>;
        isResizeWindowFunctionCalled: boolean;
    };
    /**
     * Sets the agent profiles api response
     * @param state - AgentProfileSettings
     * @param action - PayloadAction<AgentProfileSettings>
     * @example - dispatch(setAgentProfileSettings(response))
     */
    setAgentProfileSettings(state: import("immer/dist/internal").WritableDraft<AgentSettingState>, action: PayloadAction<AgentProfileSettings>): void;
    /**
     * Sets the isResizeWindowFunctionCalled if Resize Function is called in Voice Preference Screen
     * @param state - AgentSettings
     * @param action - PayloadAction<boolean>
     * @example - dispatch(setIsResizeWindowFunctionCalled(true))
     */
    setIsResizeWindowFunctionCalled(state: import("immer/dist/internal").WritableDraft<AgentSettingState>, action: PayloadAction<boolean>): void;
    /**
     * Function to return default state for middleware
     * @param state - AgentSettings
     * @returns It returns default state
     * @example -getDefaultState()
     */
    getDefaultState(state: import("immer/dist/internal").WritableDraft<AgentSettingState>): {
        mchSettings: import("immer/dist/internal").WritableDraft<MCHSetting>;
        agentProfileSettings: import("immer/dist/internal").WritableDraft<AgentProfileSettings>;
        isResizeWindowFunctionCalled: boolean;
    };
}, "agentSettings">;
export declare const agentSettingsReducer: import("redux").Reducer<{
    mchSettings: import("immer/dist/internal").WritableDraft<MCHSetting>;
    agentProfileSettings: import("immer/dist/internal").WritableDraft<AgentProfileSettings>;
    isResizeWindowFunctionCalled: boolean;
}, import("redux").AnyAction>;
export declare const agentSettingsActions: import("@reduxjs/toolkit").CaseReducerActions<{
    /**
     * Function to set multi-channel settings
     * @param state - mchSettings
     * @param action  - PayloadAction<string>
     * @returns It returns updated multi-channel settings
     * @example -setMCHSettings('')
     */
    setMCHSettings(state: import("immer/dist/internal").WritableDraft<AgentSettingState>, action: PayloadAction<MCHSetting>): {
        mchSettings: {
            chatThreshold: number;
            smsThreshold: number;
            emailThreshold: number;
            workItemThreshold: number;
            digitalThreshold: number;
            contactAutoFocus: boolean;
            requestContact: boolean;
            deliveryMode: string;
            totalContactCount: number;
            voiceThreshold: number;
        };
        agentProfileSettings: import("immer/dist/internal").WritableDraft<AgentProfileSettings>;
        isResizeWindowFunctionCalled: boolean;
    };
    /**
     * Sets the agent profiles api response
     * @param state - AgentProfileSettings
     * @param action - PayloadAction<AgentProfileSettings>
     * @example - dispatch(setAgentProfileSettings(response))
     */
    setAgentProfileSettings(state: import("immer/dist/internal").WritableDraft<AgentSettingState>, action: PayloadAction<AgentProfileSettings>): void;
    /**
     * Sets the isResizeWindowFunctionCalled if Resize Function is called in Voice Preference Screen
     * @param state - AgentSettings
     * @param action - PayloadAction<boolean>
     * @example - dispatch(setIsResizeWindowFunctionCalled(true))
     */
    setIsResizeWindowFunctionCalled(state: import("immer/dist/internal").WritableDraft<AgentSettingState>, action: PayloadAction<boolean>): void;
    /**
     * Function to return default state for middleware
     * @param state - AgentSettings
     * @returns It returns default state
     * @example -getDefaultState()
     */
    getDefaultState(state: import("immer/dist/internal").WritableDraft<AgentSettingState>): {
        mchSettings: import("immer/dist/internal").WritableDraft<MCHSetting>;
        agentProfileSettings: import("immer/dist/internal").WritableDraft<AgentProfileSettings>;
        isResizeWindowFunctionCalled: boolean;
    };
}, "agentSettings">;
/**
 * used to get multi-channel settings
 * @example - const mchSettings = useSelector(getmchSettings);
 */
export declare const getmchSettings: ((state: {
    agentSettings: AgentSettingState;
}) => MCHSetting) & import("reselect").OutputSelectorFields<(args_0: AgentSettingState) => MCHSetting & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const getAgentProfileSettings: ((state: {
    agentSettings: AgentSettingState;
}) => AgentProfileSettings) & import("reselect").OutputSelectorFields<(args_0: AgentSettingState) => AgentProfileSettings & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const getIsResizeWindowFunctionCalled: ((state: {
    agentSettings: AgentSettingState;
}) => boolean) & import("reselect").OutputSelectorFields<(args_0: AgentSettingState) => boolean & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
