import { PayloadAction } from '@reduxjs/toolkit';
import { AgentScheduleForDisplay } from '@nice-devone/ui-controls';
import { Theme } from '@mui/material';
export declare const CCF_APP_SCHEDULER_KEY = "appSchedule";
export declare const FETCHEVENTS = "appSchedule/fetchWemScheduleEvents";
export declare const FETCH_IEX_EVENTS = "appSchedule/fetchIEXScheduleEvents";
interface CcfAppSchedule {
    events: AgentScheduleForDisplay[];
    iEXEvents: AgentScheduleForDisplay[];
}
/**
 * get Agent shift and Events
 * @example - dispatch(getAgentEvents())
 */
export declare const fetchWemScheduleEvents: import("@reduxjs/toolkit").AsyncThunk<AgentScheduleForDisplay[], {
    currentDate?: Date | undefined;
    currentView?: string | undefined;
    theme: Theme;
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
/**
 * get Agent shift and Events
 * @example - dispatch(getAgentEvents())
 */
export declare const fetchIEXScheduleEvents: import("@reduxjs/toolkit").AsyncThunk<AgentScheduleForDisplay[], {
    currentDate?: Date | undefined;
    currentView?: string | undefined;
    theme: Theme;
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
export declare const scheduleSlice: import("@reduxjs/toolkit").Slice<{
    events: AgentScheduleForDisplay[];
    iEXEvents: import("immer/dist/internal").WritableDraft<AgentScheduleForDisplay>[];
}, {
    /**
     * Reducer function to store events
     * @param state - AppState
     * @param action - action.payload
     * @example - dispatch(storeEvents([]));
     * @returns - updated state
     */
    storeEvents(state: import("immer/dist/internal").WritableDraft<CcfAppSchedule>, action: PayloadAction<AgentScheduleForDisplay[]>): {
        events: AgentScheduleForDisplay[];
        iEXEvents: import("immer/dist/internal").WritableDraft<AgentScheduleForDisplay>[];
    };
}, "appSchedule">;
export declare const CcfAppScheduleReducer: import("redux").Reducer<{
    events: AgentScheduleForDisplay[];
    iEXEvents: import("immer/dist/internal").WritableDraft<AgentScheduleForDisplay>[];
}, import("redux").AnyAction>;
export declare const scheduleActions: import("@reduxjs/toolkit").CaseReducerActions<{
    /**
     * Reducer function to store events
     * @param state - AppState
     * @param action - action.payload
     * @example - dispatch(storeEvents([]));
     * @returns - updated state
     */
    storeEvents(state: import("immer/dist/internal").WritableDraft<CcfAppSchedule>, action: PayloadAction<AgentScheduleForDisplay[]>): {
        events: AgentScheduleForDisplay[];
        iEXEvents: import("immer/dist/internal").WritableDraft<AgentScheduleForDisplay>[];
    };
}, "appSchedule">;
export declare const getWemScheduleEvents: ((state: {
    appSchedule: CcfAppSchedule;
}) => AgentScheduleForDisplay[]) & import("reselect").OutputSelectorFields<(args_0: CcfAppSchedule) => AgentScheduleForDisplay[] & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const getIEXScheduleEvents: ((state: {
    appSchedule: CcfAppSchedule;
}) => AgentScheduleForDisplay[]) & import("reselect").OutputSelectorFields<(args_0: CcfAppSchedule) => AgentScheduleForDisplay[] & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export {};
