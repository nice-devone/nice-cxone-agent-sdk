import { __awaiter } from "tslib";
import { createSelector, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { LocalStorageHelper, NotificationSettings } from '@nice-devone/core-sdk';
import { lighten } from '@mui/material';
import dayjs from 'dayjs';
import { CXoneClient } from '@nice-devone/agent-sdk';
import { CXoneUser } from '@nice-devone/auth-sdk';
export const CCF_APP_SCHEDULER_KEY = 'appSchedule';
export const FETCHEVENTS = 'appSchedule/fetchWemScheduleEvents';
export const FETCH_IEX_EVENTS = 'appSchedule/fetchIEXScheduleEvents';
let logger;
const initialCcfScheduleState = {
    events: [],
    iEXEvents: [],
};
/**
 * get Agent shift and Events
 * @example - dispatch(getAgentEvents())
 */
export const fetchWemScheduleEvents = createAsyncThunk(FETCHEVENTS, ({ currentDate = new Date(), currentView = 'day', theme }, { dispatch }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const is12HrTime = !(LocalStorageHelper.getItem(NotificationSettings.TWENTY_FOUR_HOUR_TIME) === 'true');
        const view = currentView;
        let startDate = currentDate;
        let endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + 1);
        if (view === 'week') {
            startDate = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay()));
            endDate = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 6));
        }
        startDate.setHours(0, 0, 0);
        endDate.setHours(23, 59, 59);
        dispatch(scheduleActions.storeEvents([]));
        const resp = yield CXoneClient.instance.wemSchedule.getSchedule(startDate, endDate);
        const events = resp;
        const shiftsAsBackground = events.filter(event => event.title === 'shift').map((event) => ({
            end: event.end,
            start: event.start,
            className: 'shift-background',
            display: 'background',
            extendedProps: { description: event.notes, borderHighlightColor: event.backgroundColor },
            backgroundColor: event.backgroundColor,
            allDay: false,
            notes: event.notes,
            id: event.id,
            title: '',
        }));
        const eventsWithBackgroundShift = events.concat(shiftsAsBackground);
        const timeFormat = is12HrTime ? 'hh:mm A' : 'HH:mm';
        const updatedResponse = eventsWithBackgroundShift.map((event) => (Object.assign(Object.assign({}, event), { className: event.title === 'shift' ? 'shift' : event.title, end: event.title === 'shift' && !((event.end).getHours() === 0 && (event.end).getMinutes() === 0) ? dayjs(event.end).add(1, 'day').format() : event.end, extendedProps: { description: event.notes, borderHighlightColor: event.backgroundColor }, backgroundColor: event.title === 'shift' ? lighten(theme.palette.border.main, 0.3) : lighten(event.backgroundColor, 0.3), allDay: event.title === 'shift' ? true : false, title: event.title === 'shift'
                ? `${dayjs(event.start).format(timeFormat)} - ${dayjs(event.end).format(timeFormat)}`
                : event.title, isWEMEvent: true, isIEXEvent: false })));
        return updatedResponse;
    }
    catch (error) {
        logger.error('[scheduleSlice][getAgentEvents]', `payload: ${JSON.stringify(error)}`);
        return [];
    }
}));
/**
 * get Agent shift and Events
 * @example - dispatch(getAgentEvents())
 */
export const fetchIEXScheduleEvents = createAsyncThunk(FETCH_IEX_EVENTS, ({ currentDate = new Date(), currentView = 'day', theme }, { dispatch }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const view = currentView;
        let startDate = currentDate;
        let endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + 1);
        if (view === 'week') {
            startDate = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay()));
            endDate = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 6));
        }
        startDate.setHours(0, 0, 0);
        endDate.setHours(23, 59, 59);
        const user = CXoneUser.instance.getUserInfo();
        const agentId = Number(user.icAgentId);
        dispatch(scheduleActions.storeEvents([]));
        const resp = yield CXoneClient.instance.iexService.getIEXSchedule(agentId, startDate, endDate);
        const events = resp;
        const updatedResponse = events.map((event) => ({
            backgroundColor: theme.palette.primary.dark,
            end: event.endTimeUTC ? new Date(event.endTimeUTC + 'Z') : event.endTimeUTC,
            id: event.activityName,
            start: event.startTimeUTC ? new Date(event.startTimeUTC + 'Z') : event.startTimeUTC,
            extendedProps: { description: event.activityName, borderHighlightColor: theme.palette.primary.dark },
            notes: '',
            title: event.activityName,
            isWEMEvent: false,
            isIEXEvent: true,
        }));
        return updatedResponse;
    }
    catch (error) {
        logger.error('[scheduleSlice][getAgentEvents]', `payload: ${JSON.stringify(error)}`);
        return [];
    }
}));
export const scheduleSlice = createSlice({
    name: CCF_APP_SCHEDULER_KEY,
    initialState: initialCcfScheduleState,
    reducers: {
        /**
         * Reducer function to store events
         * @param state - AppState
         * @param action - action.payload
         * @example - dispatch(storeEvents([]));
         * @returns - updated state
         */
        storeEvents(state, action) {
            return Object.assign(Object.assign({}, state), { events: action.payload });
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchWemScheduleEvents.fulfilled, (state, action) => {
            return Object.assign(Object.assign({}, state), { events: [...action.payload] });
        });
        builder
            .addCase(fetchIEXScheduleEvents.fulfilled, (state, action) => {
            return Object.assign(Object.assign({}, state), { iEXEvents: [...action.payload] });
        });
    },
});
export const CcfAppScheduleReducer = scheduleSlice.reducer;
export const scheduleActions = scheduleSlice.actions;
/**
 * @param rootState - root state
 * @example - getAppScheduleState
*/
const getAppScheduleState = (rootState) => {
    return rootState[CCF_APP_SCHEDULER_KEY];
};
export const getWemScheduleEvents = createSelector(getAppScheduleState, (appSchedule) => appSchedule.events);
export const getIEXScheduleEvents = createSelector(getAppScheduleState, (appSchedule) => appSchedule.iEXEvents);
//# sourceMappingURL=ccf-app-schedule.slice.js.map