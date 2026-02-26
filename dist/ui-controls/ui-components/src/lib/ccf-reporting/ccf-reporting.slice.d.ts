import { ProductivityReport, PerformanceReport } from '@nice-devone/agent-sdk';
import { Dayjs } from 'dayjs';
export declare const CCF_REPORTING_FEATURE_KEY = "reporting";
export interface requestParamsProductivity {
    range: string;
    startDate?: Dayjs;
    endDate?: Dayjs;
}
export interface CcfReportingState {
    loader: boolean;
    productivityResponse: ProductivityReport[] | null;
    performanceResponse: PerformanceReport[] | null;
    isError: boolean;
}
export declare const initialCcfReportingState: CcfReportingState;
/** Method to fetch agent and team's performance report using agent,team and agentstatehistory data
 * @example -
 * ```
 * getProductivityReport();
 * ```
*/
export declare const getProductivityReport: import("@reduxjs/toolkit").AsyncThunk<ProductivityReport[], {
    range: string;
    startDate?: Dayjs | undefined;
    endDate?: Dayjs | undefined;
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
/** Method to fetch agent and team's performance report using agent and team data
 * @example -
 * ```
 * getPerformanceReport();
 * ```
*/
export declare const getPerformanceReport: import("@reduxjs/toolkit").AsyncThunk<PerformanceReport[], {
    range: string;
    startDate?: Dayjs | undefined;
    endDate?: Dayjs | undefined;
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
export declare const reportingSlice: import("@reduxjs/toolkit").Slice<CcfReportingState, {}, "reporting">;
export declare const reportingReducer: import("redux").Reducer<CcfReportingState, import("redux").AnyAction>;
export declare const reportingActions: import("@reduxjs/toolkit").CaseReducerActions<{}, "reporting">;
/**
 * Function to get Reporting data
 * @param rootState - CcfReportingState
 * @example
 * @returns It returns Reporting data
 */
export declare const getCcfReportingState: (rootState: {
    reporting: CcfReportingState;
}) => CcfReportingState;
export declare const getLoaderStatus: ((state: {
    reporting: CcfReportingState;
}) => boolean) & import("reselect").OutputSelectorFields<(args_0: CcfReportingState) => boolean & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const getProductivityErrorStatus: ((state: {
    reporting: CcfReportingState;
}) => boolean) & import("reselect").OutputSelectorFields<(args_0: CcfReportingState) => boolean & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const getProductivityResponse: ((state: {
    reporting: CcfReportingState;
}) => ProductivityReport[] | null) & import("reselect").OutputSelectorFields<(args_0: CcfReportingState) => ProductivityReport[] & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const getPerformanceResponse: ((state: {
    reporting: CcfReportingState;
}) => PerformanceReport[] | null) & import("reselect").OutputSelectorFields<(args_0: CcfReportingState) => PerformanceReport[] & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
