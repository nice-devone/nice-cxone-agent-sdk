import { __awaiter } from "tslib";
import { CXoneDigitalClient } from '@nice-devone/digital-sdk';
import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
export const CHANNEL_DETAIL_KEY = 'channelDetails';
const GET_OB_CHANNELS = 'getAllChannels/getAgentOBChannels';
let logger;
export const channelDetailState = {
    userHaveObChannel: false,
    outboundChannels: [],
};
export const getAgentOBChannels = createAsyncThunk(GET_OB_CHANNELS, (forceApiCall, { dispatch }) => __awaiter(void 0, void 0, void 0, function* () {
    return CXoneDigitalClient.instance.digitalService
        .getOBChannels(forceApiCall).then(response => {
        const channelsList = response;
        dispatch(ccfChannelDetailsActions.setUserHaveObChannel((channelsList === null || channelsList === void 0 ? void 0 : channelsList.length) > 0));
        dispatch(ccfChannelDetailsActions.setObChannelList(channelsList));
    }).catch((err) => {
        logger.error('getAgentObChannels', JSON.stringify(err));
        return [];
    });
}));
export const channelDetailSlice = createSlice({
    name: CHANNEL_DETAIL_KEY,
    initialState: channelDetailState,
    reducers: {
        /**
         * Function to set userHaveObChannel
         * @param state - boolean
         * @param action  - PayloadAction<boolean>
         * @returns It returns updated value for userHaveOBChannel
         * @example -setUserHaveObChannel('')
         */
        setUserHaveObChannel(state, action) {
            return Object.assign(Object.assign({}, state), { userHaveObChannel: (action.payload) ? action.payload : false });
        },
        /**
         * Function to set outboundChannel List
         * @param state - array
         * @param action  - PayloadAction\<[]\>
         * @returns It returns updated outboundChannel List
         * @example -setObChannelList('')
         */
        setObChannelList(state, action) {
            return Object.assign(Object.assign({}, state), { outboundChannels: (action.payload) ? action.payload : [] });
        },
    },
});
export const ccfChannelDetailsReducer = channelDetailSlice.reducer;
export const ccfChannelDetailsActions = channelDetailSlice.actions;
/**
 * Function to get Channel Details of agent
 * @param rootState - channelDetails
 * @returns It returns channel details of the agent
 * @example - const channelDetails = getChannelDetailsState(rootState)
 */
export const getChannelDetailsState = (rootState) => {
    return rootState[CHANNEL_DETAIL_KEY];
};
/**
 * Function to get boolean value for OB Channel presence
 * @param rootState - ChannelDetails
 * @returns It returns userHaveObChannel
 * @example - const channelDetails = getChannelDetailsState(rootState)
 */
export const userHaveObChannelSelector = createSelector(getChannelDetailsState, (state) => state === null || state === void 0 ? void 0 : state.userHaveObChannel);
/**
 * Function to get OB channel list
 * @param rootState - ChannelDetails
 * @returns It returns OB channel list
 * @example - const channelDetails = getChannelDetailsState(rootState)
 */
export const ObChannelListSelector = createSelector(getChannelDetailsState, (state) => state === null || state === void 0 ? void 0 : state.outboundChannels);
//# sourceMappingURL=ccf-channel-details-slice.js.map