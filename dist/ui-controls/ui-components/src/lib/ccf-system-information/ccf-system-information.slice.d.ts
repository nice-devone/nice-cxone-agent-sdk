import { PayloadAction } from '@reduxjs/toolkit';
export interface SettingsInformationState {
    networkSpeed: number;
}
export declare const initialSettingsInformationState: SettingsInformationState;
export declare const SETTINGSINFORMATION_KEY = "settingsinformation";
export declare const SettingsInformationSlice: import("@reduxjs/toolkit").Slice<SettingsInformationState, {
    /**
     * Function sets network speed which is calculated as the average latency of last N API calls
     * @param state -InboxState
     * @param action -PayloadAction<number>
     * @example - dispatch(setNetworkSpeed(number))
     */
    setNetworkSpeed(state: import("immer/dist/internal").WritableDraft<SettingsInformationState>, action: PayloadAction<number>): {
        networkSpeed: number;
    };
}, "settingsinformation">;
export declare const CcfSettingsInformationAction: import("@reduxjs/toolkit").CaseReducerActions<{
    /**
     * Function sets network speed which is calculated as the average latency of last N API calls
     * @param state -InboxState
     * @param action -PayloadAction<number>
     * @example - dispatch(setNetworkSpeed(number))
     */
    setNetworkSpeed(state: import("immer/dist/internal").WritableDraft<SettingsInformationState>, action: PayloadAction<number>): {
        networkSpeed: number;
    };
}, "settingsinformation">;
export declare const CcfSettingsInformationReducer: import("redux").Reducer<SettingsInformationState, import("redux").AnyAction>;
/**
 * Function to get network speed which is calculated as the average latency of last N API calls
 * @example -  useSelector(getNetworkSpeed)
 */
export declare const getNetworkSpeed: ((state: {
    settingsinformation: SettingsInformationState;
}) => number) & import("reselect").OutputSelectorFields<(args_0: SettingsInformationState) => number & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
