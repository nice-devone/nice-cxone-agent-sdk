import { CXoneAudioVisualNotificationSettings, CXoneClientData, CXoneSoftphoneNotificationSettings } from '@nice-devone/common-sdk';
import { PayloadAction } from '@reduxjs/toolkit';
export declare const FULL_SETTINGS_KEY = "cxoneAgentSettings";
interface CcfFullSettingsState {
    avNotification: CXoneAudioVisualNotificationSettings;
    integratedSoftphone: CXoneSoftphoneNotificationSettings;
    autoAccept: boolean;
    twentyFourHourTime: boolean;
    panelPopout: boolean;
    pageActionPopout: boolean;
    sendOnEnter: string;
    loggingLevel: number;
    expandSoftphone?: boolean;
    emailMessageSortOrder?: string;
}
export declare const getAgentClientDataSettings: import("@reduxjs/toolkit").AsyncThunk<void, void, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<import("redux").AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
export declare const updateClientDataSettings: import("@reduxjs/toolkit").AsyncThunk<void, CXoneClientData, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<import("redux").AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
export declare const ccfFullSettingsReducer: import("redux").Reducer<CcfFullSettingsState, import("redux").AnyAction>;
export declare const ccfFullSettingsActions: import("@reduxjs/toolkit").CaseReducerActions<{
    /**
     * Reducer function to update all settings
     * @param state - cxoneAgentSettingsState
     * @param action - action.payload
     * @example - dispatch(updateAllSettings());
     * @returns - updated state
     */
    updateAllSettings(state: import("immer/dist/internal").WritableDraft<CcfFullSettingsState>, action: PayloadAction<Partial<CcfFullSettingsState>>): {
        integratedSoftphone: {
            softPhoneVolume?: number | undefined;
            secondaryDevice?: number | undefined;
            ringtone?: number | undefined;
            secondaryDeviceDelay?: number | undefined;
            secondaryDeviceName?: number | undefined;
            parse: (data: {
                [key: string]: any;
            }) => void;
            mapper: (clientData: {
                [key: string]: any;
            }, data: Partial<CXoneClientData>) => {
                softPhoneVolume: any;
                CXASecondaryDevice: any;
                CXASecondaryDeviceName: any;
                CXARingtone: any;
                SecondaryDeviceDelay: any;
            };
        };
        avNotification: CXoneAudioVisualNotificationSettings;
        autoAccept: boolean;
        twentyFourHourTime: boolean;
        panelPopout: boolean;
        pageActionPopout: boolean;
        sendOnEnter: string;
        loggingLevel: number;
        expandSoftphone?: boolean | undefined;
        emailMessageSortOrder?: string | undefined;
    };
    /**
     * Reducer function to store av Notification Settings
     * @param state - cxoneAgentSettingsState
     * @param action - action.payload
     * @example - dispatch(storeNotificationSettings());
     * @returns - updated state
     */
    storeNotificationSettings(state: import("immer/dist/internal").WritableDraft<CcfFullSettingsState>, action: PayloadAction<CXoneAudioVisualNotificationSettings>): {
        avNotification: CXoneAudioVisualNotificationSettings;
        integratedSoftphone: import("immer/dist/internal").WritableDraft<CXoneSoftphoneNotificationSettings>;
        autoAccept: boolean;
        twentyFourHourTime: boolean;
        panelPopout: boolean;
        pageActionPopout: boolean;
        sendOnEnter: string;
        loggingLevel: number;
        expandSoftphone?: boolean | undefined;
        emailMessageSortOrder?: string | undefined;
    };
    /**
     * Reducer function to store integrated softphone settings
     * @param state - cxoneAgentSettingsState
     * @param action - action.payload
     * @example - dispatch(storeIntegratedSoftphoneSettings());
     * @returns - updated state
     */
    storeIntegratedSoftphoneSettings(state: import("immer/dist/internal").WritableDraft<CcfFullSettingsState>, action: PayloadAction<CXoneSoftphoneNotificationSettings>): {
        integratedSoftphone: CXoneSoftphoneNotificationSettings;
        avNotification: import("immer/dist/internal").WritableDraft<CXoneAudioVisualNotificationSettings>;
        autoAccept: boolean;
        twentyFourHourTime: boolean;
        panelPopout: boolean;
        pageActionPopout: boolean;
        sendOnEnter: string;
        loggingLevel: number;
        expandSoftphone?: boolean | undefined;
        emailMessageSortOrder?: string | undefined;
    };
    /**
     * Reducer function to store auto accept settings
     * @param state - cxoneAgentSettingsState
     * @param action - action.payload
     * @example - dispatch(storeAutoAcceptSettings());
     * @returns - updated state
     */
    storeAutoAcceptSettings(state: import("immer/dist/internal").WritableDraft<CcfFullSettingsState>, action: PayloadAction<boolean>): {
        autoAccept: boolean;
        avNotification: import("immer/dist/internal").WritableDraft<CXoneAudioVisualNotificationSettings>;
        integratedSoftphone: import("immer/dist/internal").WritableDraft<CXoneSoftphoneNotificationSettings>;
        twentyFourHourTime: boolean;
        panelPopout: boolean;
        pageActionPopout: boolean;
        sendOnEnter: string;
        loggingLevel: number;
        expandSoftphone?: boolean | undefined;
        emailMessageSortOrder?: string | undefined;
    };
    /**
     * Reducer function to store 24 hour time settings
     * @param state - cxoneAgentSettingsState
     * @param action - action.payload
     * @example - dispatch(storeTwentyFourHourTimeSettings());
     * @returns - updated state
     */
    storeTwentyFourHourTimeSettings(state: import("immer/dist/internal").WritableDraft<CcfFullSettingsState>, action: PayloadAction<boolean>): {
        twentyFourHourTime: boolean;
        avNotification: import("immer/dist/internal").WritableDraft<CXoneAudioVisualNotificationSettings>;
        integratedSoftphone: import("immer/dist/internal").WritableDraft<CXoneSoftphoneNotificationSettings>;
        autoAccept: boolean;
        panelPopout: boolean;
        pageActionPopout: boolean;
        sendOnEnter: string;
        loggingLevel: number;
        expandSoftphone?: boolean | undefined;
        emailMessageSortOrder?: string | undefined;
    };
    /**
     * Reducer function to store panel popout settings
     * @param state - cxoneAgentSettingsState
     * @param action - action.payload
     * @example - dispatch(storePanelPopoutSettings());
     * @returns - updated state
     */
    storePanelPopoutSettings(state: import("immer/dist/internal").WritableDraft<CcfFullSettingsState>, action: PayloadAction<boolean>): {
        panelPopout: boolean;
        avNotification: import("immer/dist/internal").WritableDraft<CXoneAudioVisualNotificationSettings>;
        integratedSoftphone: import("immer/dist/internal").WritableDraft<CXoneSoftphoneNotificationSettings>;
        autoAccept: boolean;
        twentyFourHourTime: boolean;
        pageActionPopout: boolean;
        sendOnEnter: string;
        loggingLevel: number;
        expandSoftphone?: boolean | undefined;
        emailMessageSortOrder?: string | undefined;
    };
    /**
     * Reducer function to store PAGE action popout settings
     * @param state - cxoneAgentSettingsState
     * @param action - action.payload
     * @example - dispatch(storePageActionPopoutSettings());
     * @returns - updated state
     */
    storePageActionPopoutSettings(state: import("immer/dist/internal").WritableDraft<CcfFullSettingsState>, action: PayloadAction<boolean>): {
        pageActionPopout: boolean;
        avNotification: import("immer/dist/internal").WritableDraft<CXoneAudioVisualNotificationSettings>;
        integratedSoftphone: import("immer/dist/internal").WritableDraft<CXoneSoftphoneNotificationSettings>;
        autoAccept: boolean;
        twentyFourHourTime: boolean;
        panelPopout: boolean;
        sendOnEnter: string;
        loggingLevel: number;
        expandSoftphone?: boolean | undefined;
        emailMessageSortOrder?: string | undefined;
    };
    /**
     * Reducer function to store send on enter settings
     * @param state - cxoneAgentSettingsState
     * @param action - action.payload
     * @example - dispatch(storeSendOnEnterSettings());
     * @returns - updated state
     */
    storeSendOnEnterSettings(state: import("immer/dist/internal").WritableDraft<CcfFullSettingsState>, action: PayloadAction<string>): {
        sendOnEnter: string;
        avNotification: import("immer/dist/internal").WritableDraft<CXoneAudioVisualNotificationSettings>;
        integratedSoftphone: import("immer/dist/internal").WritableDraft<CXoneSoftphoneNotificationSettings>;
        autoAccept: boolean;
        twentyFourHourTime: boolean;
        panelPopout: boolean;
        pageActionPopout: boolean;
        loggingLevel: number;
        expandSoftphone?: boolean | undefined;
        emailMessageSortOrder?: string | undefined;
    };
    /**
     * Reducer function to store logging level settings
     * @param state - cxoneAgentSettingsState
     * @param action - action.payload
     * @example - dispatch(storeLoggingLevelSettings());
     * @returns - updated state
     */
    storeLoggingLevelSettings(state: import("immer/dist/internal").WritableDraft<CcfFullSettingsState>, action: PayloadAction<number>): {
        loggingLevel: number;
        avNotification: import("immer/dist/internal").WritableDraft<CXoneAudioVisualNotificationSettings>;
        integratedSoftphone: import("immer/dist/internal").WritableDraft<CXoneSoftphoneNotificationSettings>;
        autoAccept: boolean;
        twentyFourHourTime: boolean;
        panelPopout: boolean;
        pageActionPopout: boolean;
        sendOnEnter: string;
        expandSoftphone?: boolean | undefined;
        emailMessageSortOrder?: string | undefined;
    };
    /**
     * Reducer function to expand softphone settings
     * @param state - cxoneAgentSettingsState
     * @param action - action.payload
     * @example - dispatch(storeExpandSoftphoneSettings());
     * @returns - updated state
     */
    storeSoftphoneExpandSettings(state: import("immer/dist/internal").WritableDraft<CcfFullSettingsState>, action: PayloadAction<boolean>): {
        expandSoftphone: boolean;
        avNotification: import("immer/dist/internal").WritableDraft<CXoneAudioVisualNotificationSettings>;
        integratedSoftphone: import("immer/dist/internal").WritableDraft<CXoneSoftphoneNotificationSettings>;
        autoAccept: boolean;
        twentyFourHourTime: boolean;
        panelPopout: boolean;
        pageActionPopout: boolean;
        sendOnEnter: string;
        loggingLevel: number;
        emailMessageSortOrder?: string | undefined;
    };
}, "cxoneAgentSettings">;
/**
 * Function to get app state
 * @param rootState - AppState
 * @returns It returns app state
 * @example - const appState = getAppState(rootState)
 */
export declare const getCcfFullSettingsState: (rootState: {
    cxoneAgentSettings: CcfFullSettingsState;
}) => CcfFullSettingsState;
export declare const getNotificationSettings: ((state: {
    cxoneAgentSettings: CcfFullSettingsState;
}) => CXoneAudioVisualNotificationSettings) & import("reselect").OutputSelectorFields<(args_0: CcfFullSettingsState) => CXoneAudioVisualNotificationSettings & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const getIntegratedSoftphoneSettings: ((state: {
    cxoneAgentSettings: CcfFullSettingsState;
}) => CXoneSoftphoneNotificationSettings) & import("reselect").OutputSelectorFields<(args_0: CcfFullSettingsState) => CXoneSoftphoneNotificationSettings & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const getAutoAcceptSettings: ((state: {
    cxoneAgentSettings: CcfFullSettingsState;
}) => boolean) & import("reselect").OutputSelectorFields<(args_0: CcfFullSettingsState) => boolean & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const getTwentyFourHourTimeSettings: ((state: {
    cxoneAgentSettings: CcfFullSettingsState;
}) => boolean) & import("reselect").OutputSelectorFields<(args_0: CcfFullSettingsState) => boolean & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const getPanelPopoutSettings: ((state: {
    cxoneAgentSettings: CcfFullSettingsState;
}) => boolean) & import("reselect").OutputSelectorFields<(args_0: CcfFullSettingsState) => boolean & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const getPageActionPopoutSettings: ((state: {
    cxoneAgentSettings: CcfFullSettingsState;
}) => boolean) & import("reselect").OutputSelectorFields<(args_0: CcfFullSettingsState) => boolean & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const getSendOnEnterSettings: ((state: {
    cxoneAgentSettings: CcfFullSettingsState;
}) => string) & import("reselect").OutputSelectorFields<(args_0: CcfFullSettingsState) => string & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const getLoggingLevelSettings: ((state: {
    cxoneAgentSettings: CcfFullSettingsState;
}) => number) & import("reselect").OutputSelectorFields<(args_0: CcfFullSettingsState) => number & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const getEmailMessageSortOrderSettings: ((state: {
    cxoneAgentSettings: CcfFullSettingsState;
}) => string) & import("reselect").OutputSelectorFields<(args_0: CcfFullSettingsState) => string & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const getExpandSoftphoneSettings: ((state: {
    cxoneAgentSettings: CcfFullSettingsState;
}) => boolean | undefined) & import("reselect").OutputSelectorFields<(args_0: CcfFullSettingsState) => (boolean | undefined) & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export {};
