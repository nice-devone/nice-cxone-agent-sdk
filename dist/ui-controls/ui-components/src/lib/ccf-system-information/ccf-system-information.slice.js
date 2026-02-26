import { createSelector, createSlice } from '@reduxjs/toolkit';
export const initialSettingsInformationState = {
    networkSpeed: 0,
};
export const SETTINGSINFORMATION_KEY = 'settingsinformation';
export const SettingsInformationSlice = createSlice({
    name: SETTINGSINFORMATION_KEY,
    initialState: initialSettingsInformationState,
    reducers: {
        /**
         * Function sets network speed which is calculated as the average latency of last N API calls
         * @param state -InboxState
         * @param action -PayloadAction<number>
         * @example - dispatch(setNetworkSpeed(number))
         */
        setNetworkSpeed(state, action) {
            const networkSpeed = action.payload;
            return Object.assign(Object.assign({}, state), { networkSpeed });
        },
    }
});
export const CcfSettingsInformationAction = SettingsInformationSlice.actions;
export const CcfSettingsInformationReducer = SettingsInformationSlice.reducer;
/**
 * Function provides settingsInformation state
 * @param rootState - SettingsInformation
 * @example const inboxState = getSettingsInformationState(state)
 */
const getSettingsInformationState = (rootState) => {
    return rootState[SETTINGSINFORMATION_KEY];
};
/**
 * Function to get network speed which is calculated as the average latency of last N API calls
 * @example -  useSelector(getNetworkSpeed)
 */
export const getNetworkSpeed = createSelector(getSettingsInformationState, (state) => state === null || state === void 0 ? void 0 : state.networkSpeed);
//# sourceMappingURL=ccf-system-information.slice.js.map