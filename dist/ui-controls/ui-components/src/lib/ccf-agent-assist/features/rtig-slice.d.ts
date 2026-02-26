import { PayloadAction } from '@reduxjs/toolkit';
import { Metric, NotificationMessage } from '@nice-devone/common-sdk';
export declare const AGENT_ASSIST_RTIG_KEY = "ccfAgentAssistRTIG";
export interface AgentRTIGState {
    value: {
        notificationMessages: NotificationMessage[];
        metricScores: Metric[];
        overallSentimentMetric: Metric;
        configType: string;
        assistEnlighten: boolean;
        hasPhraseMessage: boolean;
        hasEventMessage: boolean;
    };
}
export declare const CcfAgentAssistRTIGSlice: import("@reduxjs/toolkit").Slice<AgentRTIGState, {
    /**
     * reducer to update notification messages
     * @example - dispatch(updateNotificationMessages(notificationMessage));
     */
    updateNotificationMessages(state: import("immer/dist/internal").WritableDraft<AgentRTIGState>, action: PayloadAction<NotificationMessage>): void;
    /**
     * reducer to update metric scores
     * @example - dispatch(updateMetricScores(metric));
     */
    updateMetricScores(state: import("immer/dist/internal").WritableDraft<AgentRTIGState>, action: PayloadAction<Metric>): void;
    /**
     * reducer to set metric scores
     * @example - dispatch(setMetricScores(metric[]));
     */
    setMetricScores(state: import("immer/dist/internal").WritableDraft<AgentRTIGState>, action: PayloadAction<Metric[]>): void;
    /**
     * reducer to set config type
     * @example - dispatch(setConfigType(configType));
     */
    setConfigType(state: import("immer/dist/internal").WritableDraft<AgentRTIGState>, action: PayloadAction<string>): void;
    /**
     * reducer to set overall sentiment metric
     * @example - dispatch(setOverallSentimentMetric(metric));
     */
    setOverallSentimentMetric(state: import("immer/dist/internal").WritableDraft<AgentRTIGState>, action: PayloadAction<Metric>): void;
    /**
     * reducer to set assist enlighten
     * @example - dispatch(setAssistEnlighten(assistEnlighten));
     */
    setAssistEnlighten(state: import("immer/dist/internal").WritableDraft<AgentRTIGState>, action: PayloadAction<boolean>): void;
    /**
     * reducer to set has phrase message
     * @example - dispatch(setHasPhraseMessage(hasPhraseMessage));
     */
    setHasPhraseMessage(state: import("immer/dist/internal").WritableDraft<AgentRTIGState>, action: PayloadAction<boolean>): void;
    /**
     * reducer to set has event message
     * @example - dispatch(setHasEventMessage(hasEventMessage));
     */
    setHasEventMessage(state: import("immer/dist/internal").WritableDraft<AgentRTIGState>, action: PayloadAction<boolean>): void;
    /**
     * reducer to clear state
     * @example - dispatch(clearState());
     */
    clearState(state: import("immer/dist/internal").WritableDraft<AgentRTIGState>): void;
    /**
     * Function to return default state for middleware
     * @example - default()
    */
    default(state: import("immer/dist/internal").WritableDraft<AgentRTIGState>): {
        value: import("immer/dist/internal").WritableDraft<{
            notificationMessages: NotificationMessage[];
            metricScores: Metric[];
            overallSentimentMetric: Metric;
            configType: string;
            assistEnlighten: boolean;
            hasPhraseMessage: boolean;
            hasEventMessage: boolean;
        }>;
    };
}, "ccfAgentAssistRTIG">;
export declare const ccfAgentAssistRTIGActions: import("@reduxjs/toolkit").CaseReducerActions<{
    /**
     * reducer to update notification messages
     * @example - dispatch(updateNotificationMessages(notificationMessage));
     */
    updateNotificationMessages(state: import("immer/dist/internal").WritableDraft<AgentRTIGState>, action: PayloadAction<NotificationMessage>): void;
    /**
     * reducer to update metric scores
     * @example - dispatch(updateMetricScores(metric));
     */
    updateMetricScores(state: import("immer/dist/internal").WritableDraft<AgentRTIGState>, action: PayloadAction<Metric>): void;
    /**
     * reducer to set metric scores
     * @example - dispatch(setMetricScores(metric[]));
     */
    setMetricScores(state: import("immer/dist/internal").WritableDraft<AgentRTIGState>, action: PayloadAction<Metric[]>): void;
    /**
     * reducer to set config type
     * @example - dispatch(setConfigType(configType));
     */
    setConfigType(state: import("immer/dist/internal").WritableDraft<AgentRTIGState>, action: PayloadAction<string>): void;
    /**
     * reducer to set overall sentiment metric
     * @example - dispatch(setOverallSentimentMetric(metric));
     */
    setOverallSentimentMetric(state: import("immer/dist/internal").WritableDraft<AgentRTIGState>, action: PayloadAction<Metric>): void;
    /**
     * reducer to set assist enlighten
     * @example - dispatch(setAssistEnlighten(assistEnlighten));
     */
    setAssistEnlighten(state: import("immer/dist/internal").WritableDraft<AgentRTIGState>, action: PayloadAction<boolean>): void;
    /**
     * reducer to set has phrase message
     * @example - dispatch(setHasPhraseMessage(hasPhraseMessage));
     */
    setHasPhraseMessage(state: import("immer/dist/internal").WritableDraft<AgentRTIGState>, action: PayloadAction<boolean>): void;
    /**
     * reducer to set has event message
     * @example - dispatch(setHasEventMessage(hasEventMessage));
     */
    setHasEventMessage(state: import("immer/dist/internal").WritableDraft<AgentRTIGState>, action: PayloadAction<boolean>): void;
    /**
     * reducer to clear state
     * @example - dispatch(clearState());
     */
    clearState(state: import("immer/dist/internal").WritableDraft<AgentRTIGState>): void;
    /**
     * Function to return default state for middleware
     * @example - default()
    */
    default(state: import("immer/dist/internal").WritableDraft<AgentRTIGState>): {
        value: import("immer/dist/internal").WritableDraft<{
            notificationMessages: NotificationMessage[];
            metricScores: Metric[];
            overallSentimentMetric: Metric;
            configType: string;
            assistEnlighten: boolean;
            hasPhraseMessage: boolean;
            hasEventMessage: boolean;
        }>;
    };
}, "ccfAgentAssistRTIG">;
export declare const ccfAgentAssistRTIGReducer: import("redux").Reducer<AgentRTIGState, import("redux").AnyAction>;
/**
 * selector function to get the RTIG state data
 * @example - const rtigStateData = useSelector(getRTIGData());
 */
export declare const getRTIGData: () => ((state: {
    ccfAgentAssistRTIG: AgentRTIGState;
}) => {
    notificationMessages: NotificationMessage[];
    metricScores: Metric[];
    overallSentimentMetric: Metric;
    configType: string;
    assistEnlighten: boolean;
    hasPhraseMessage: boolean;
    hasEventMessage: boolean;
}) & import("reselect").OutputSelectorFields<(args_0: AgentRTIGState) => {
    notificationMessages: NotificationMessage[];
    metricScores: Metric[];
    overallSentimentMetric: Metric;
    configType: string;
    assistEnlighten: boolean;
    hasPhraseMessage: boolean;
    hasEventMessage: boolean;
} & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
