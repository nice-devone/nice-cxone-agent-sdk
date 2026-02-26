import { __awaiter } from "tslib";
import { CXoneClient, generatePerformanceReport, generateProductivityReport } from '@nice-devone/agent-sdk';
import { StorageKeys } from '@nice-devone/core-sdk';
import { createAsyncThunk, createSelector, createSlice, } from '@reduxjs/toolkit';
import { getDateRange } from './ccf-reporting-utils';
const cxoneClient = CXoneClient.instance;
export const CCF_REPORTING_FEATURE_KEY = 'reporting';
export const initialCcfReportingState = {
    loader: false,
    productivityResponse: null,
    performanceResponse: null,
    isError: false,
};
const { icAgentId = '', teamId = '' } = JSON.parse(localStorage.getItem(StorageKeys.USER_INFO) || '{}');
/** Method to fetch agent and team's performance report using agent,team and agentstatehistory data
 * @example -
 * ```
 * getProductivityReport();
 * ```
*/
export const getProductivityReport = createAsyncThunk('reporting/getProductivityReport', (data, { rejectWithValue }) => __awaiter(void 0, void 0, void 0, function* () {
    const { reqStartDate, reqEndDate } = getDateRange(data.range, data.startDate, data.endDate);
    const getAgentPerformancePromise = cxoneClient.performanceReport.getAgentPerformance(icAgentId, reqStartDate.toISOString(), reqEndDate.toISOString());
    const getTeamPerformancePromise = cxoneClient.performanceReport.getTeamPerformance(teamId, reqStartDate.toISOString(), reqEndDate.toISOString());
    const getAgentStateHistoryPromise = cxoneClient.performanceReport.getAgentStateHistory(icAgentId, reqStartDate.toISOString(), reqEndDate.toISOString());
    const response = yield Promise.all([getAgentPerformancePromise, getTeamPerformancePromise, getAgentStateHistoryPromise])
        .catch((error) => { throw rejectWithValue(error); });
    const reportRes = generateProductivityReport(response);
    return reportRes;
}));
/** Method to fetch agent and team's performance report using agent and team data
 * @example -
 * ```
 * getPerformanceReport();
 * ```
*/
export const getPerformanceReport = createAsyncThunk('reporting/getPerformanceReport', (data, { rejectWithValue }) => __awaiter(void 0, void 0, void 0, function* () {
    const { reqStartDate, reqEndDate } = getDateRange(data.range, data.startDate, data.endDate);
    const getAgentPerformancePromise = cxoneClient.performanceReport.getAgentPerformance(icAgentId, reqStartDate === null || reqStartDate === void 0 ? void 0 : reqStartDate.toISOString(), reqEndDate === null || reqEndDate === void 0 ? void 0 : reqEndDate.toISOString());
    const getTeamPerformancePromise = cxoneClient.performanceReport.getTeamPerformance(teamId, reqStartDate === null || reqStartDate === void 0 ? void 0 : reqStartDate.toISOString(), reqEndDate === null || reqEndDate === void 0 ? void 0 : reqEndDate.toISOString());
    const response = yield Promise.all([getAgentPerformancePromise, getTeamPerformancePromise])
        .catch((error) => { throw rejectWithValue(error); });
    const reportRes = generatePerformanceReport(response);
    return reportRes;
}));
export const reportingSlice = createSlice({
    name: CCF_REPORTING_FEATURE_KEY,
    initialState: initialCcfReportingState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProductivityReport.pending, (state) => {
            return Object.assign(Object.assign({}, state), { loader: true, isError: false });
        })
            .addCase(getProductivityReport.fulfilled, (state, action) => {
            return Object.assign(Object.assign({}, state), { loader: false, productivityResponse: action.payload, isError: false });
        })
            .addCase(getProductivityReport.rejected, (state) => {
            return Object.assign(Object.assign({}, state), { productivityResponse: null, loader: false, isError: true });
        })
            .addCase(getPerformanceReport.pending, (state) => {
            return Object.assign(Object.assign({}, state), { loader: true, isError: false });
        })
            .addCase(getPerformanceReport.fulfilled, (state, action) => {
            return Object.assign(Object.assign({}, state), { loader: false, performanceResponse: action.payload, isError: false });
        })
            .addCase(getPerformanceReport.rejected, (state) => {
            return Object.assign(Object.assign({}, state), { performanceResponse: null, loader: false, isError: true });
        });
    },
});
export const reportingReducer = reportingSlice.reducer;
export const reportingActions = reportingSlice.actions;
/**
 * Function to get Reporting data
 * @param rootState - CcfReportingState
 * @example
 * @returns It returns Reporting data
 */
export const getCcfReportingState = (rootState) => {
    return rootState[CCF_REPORTING_FEATURE_KEY];
};
export const getLoaderStatus = createSelector(getCcfReportingState, (state) => state.loader);
export const getProductivityErrorStatus = createSelector(getCcfReportingState, (state) => state.isError);
export const getProductivityResponse = createSelector(getCcfReportingState, (state) => state.productivityResponse);
export const getPerformanceResponse = createSelector(getCcfReportingState, (state) => state.performanceResponse);
//# sourceMappingURL=ccf-reporting.slice.js.map