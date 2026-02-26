import { createSelector, createSlice } from '@reduxjs/toolkit';
import { AgentAssistSettings } from '@nice-devone/common-sdk';
export const AGENT_ASSIST_RTIG_KEY = 'ccfAgentAssistRTIG';
const initialState = {
    value: {
        notificationMessages: [],
        metricScores: [],
        overallSentimentMetric: {},
        configType: '',
        assistEnlighten: false,
        hasPhraseMessage: false,
        hasEventMessage: false,
    },
};
export const CcfAgentAssistRTIGSlice = createSlice({
    name: AGENT_ASSIST_RTIG_KEY,
    initialState: initialState,
    reducers: {
        /**
         * reducer to update notification messages
         * @example - dispatch(updateNotificationMessages(notificationMessage));
         */
        updateNotificationMessages(state, action) {
            const stateNotifications = state.value.notificationMessages;
            if ((stateNotifications === null || stateNotifications === void 0 ? void 0 : stateNotifications.length) === AgentAssistSettings.RTIG_MAX_NOTIFICATIONS_LIMIT) {
                stateNotifications.shift();
            }
            state.value.notificationMessages = [...stateNotifications, action.payload];
        },
        /**
         * reducer to update metric scores
         * @example - dispatch(updateMetricScores(metric));
         */
        updateMetricScores(state, action) {
            const tag = action.payload.tag;
            const score = action.payload.score;
            if (state.value.metricScores.length > 0) {
                const foundIndex = state.value.metricScores.findIndex(x => x.tag == tag);
                if (foundIndex > -1) {
                    state.value.metricScores[foundIndex].score = score;
                }
            }
        },
        /**
         * reducer to set metric scores
         * @example - dispatch(setMetricScores(metric[]));
         */
        setMetricScores(state, action) {
            state.value.metricScores = action.payload;
        },
        /**
         * reducer to set config type
         * @example - dispatch(setConfigType(configType));
         */
        setConfigType(state, action) {
            state.value.configType = action.payload;
        },
        /**
         * reducer to set overall sentiment metric
         * @example - dispatch(setOverallSentimentMetric(metric));
         */
        setOverallSentimentMetric(state, action) {
            state.value.overallSentimentMetric = action.payload;
        },
        /**
         * reducer to set assist enlighten
         * @example - dispatch(setAssistEnlighten(assistEnlighten));
         */
        setAssistEnlighten(state, action) {
            state.value.assistEnlighten = action.payload;
        },
        /**
         * reducer to set has phrase message
         * @example - dispatch(setHasPhraseMessage(hasPhraseMessage));
         */
        setHasPhraseMessage(state, action) {
            state.value.hasPhraseMessage = action.payload;
        },
        /**
         * reducer to set has event message
         * @example - dispatch(setHasEventMessage(hasEventMessage));
         */
        setHasEventMessage(state, action) {
            state.value.hasEventMessage = action.payload;
        },
        /**
         * reducer to clear state
         * @example - dispatch(clearState());
         */
        clearState(state) {
            state.value = initialState.value;
        },
        /**
         * Function to return default state for middleware
         * @example - default()
        */
        default(state) {
            return Object.assign({}, state);
        },
    },
});
export const ccfAgentAssistRTIGActions = CcfAgentAssistRTIGSlice.actions;
export const ccfAgentAssistRTIGReducer = CcfAgentAssistRTIGSlice.reducer;
/**
 * function to get the agent assist RTIG root state
 * @example - getAgentAssistRTIGState(rootState);
 */
const getAgentAssistRTIGState = (rootState) => {
    return rootState[AGENT_ASSIST_RTIG_KEY];
};
/**
 * selector function to get the RTIG state data
 * @example - const rtigStateData = useSelector(getRTIGData());
 */
export const getRTIGData = () => createSelector(getAgentAssistRTIGState, (state) => { return state.value; });
//# sourceMappingURL=rtig-slice.js.map