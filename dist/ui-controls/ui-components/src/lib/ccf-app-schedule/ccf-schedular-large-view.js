import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useMediaQuery, useTheme, Grid, Box } from '@mui/material';
import { useTranslator, CcfScheduler, CcfButton, CcfUpArrowIcon, CcfToggleButton, CcfToggleButtonGroup, CcfFocusIcon, CcfTooltip, } from '@nice-devone/ui-controls';
import { useSelector, useDispatch } from 'react-redux';
import { fetchWemScheduleEvents, fetchIEXScheduleEvents, getIEXScheduleEvents, getWemScheduleEvents } from './ccf-app-schedule.slice';
import { useEffect, useState, useRef } from 'react';
import ccfAppSchedulerStyles from './ccf-app-schedule.styles';
import dayjs from '../../util/dayjs';
import { getWemScheduleChangeNotifications } from '../ccf-agent-notification/ccf-agent-notification.slice';
import { CcfAddEventPopover, useCcfCommitmentAddEventPopOverItems } from './ccf-add-event-popover';
import { commitmentActions } from '../ccf-commitment/ccf-commitment.slice';
import { useCcfAppScheduleContent } from './ccf-app-schedule-content';
import { useCcfCommitmentList } from '../ccf-commitment/ccf-commitment-details';
import { globalActions } from '../global.app.slice';
import { isIEXFeatureEnabled } from '@nice-devone/core-sdk';
/**
 * Scheduler - returns app scheduler with both week and day view
 * @returns - SchedulerLargeView
 * @example - `<SchedulerLargeView />`
 */
const SchedulerLargeView = () => {
    var _a;
    const calendarComponentRef = useRef();
    const dispatch = useDispatch();
    const events = useSelector(getWemScheduleEvents);
    const iEXEvents = useSelector(getIEXScheduleEvents);
    const scheduleChangeNotifications = useSelector(getWemScheduleChangeNotifications);
    const [titleDate, setTitleDate] = useState();
    const theme = useTheme();
    const isSmView = useMediaQuery(theme.breakpoints.down('xl'));
    const [currentView, setCurrentView] = useState('day');
    const [isTodaySelected, setIstodaySelected] = useState(false);
    const [translate] = useTranslator();
    const schedulerStyles = ccfAppSchedulerStyles(theme, isSmView);
    const popOverRef = useRef(null);
    const { getCcfAppScheduleContent } = useCcfAppScheduleContent();
    const { disableAddEvent } = useCcfCommitmentAddEventPopOverItems();
    const commitments = useCcfCommitmentList();
    const isIEXEnabled = isIEXFeatureEnabled();
    /**
   * Formats a date object and announces it via an aria-live region.
   * @param date  - The date object to format.
   * @param messagePrefix - The prefix for the announcement message.
   * @example
   * formatDateAndAnnounce(  2/17/2025, 11:53:27 AM,  'scheduleNextDay' );
   */
    const formatDateAndAnnounce = (date, messagePrefix) => {
        if (date) {
            // format given date "2/17/2025, 11:53:27 AM" to "Monday, February 17, 2025" 
            const formattedDate = dayjs(date).format('dddd, MMMM D, YYYY');
            dispatch(globalActions.setAriaLiveAnnouncer({ translateConfig: { key: messagePrefix, extraArgs: { format: [formattedDate] } } }));
        }
    };
    useEffect(() => {
        dispatch(commitmentActions.showCommitmentForm(false));
    }, []);
    useEffect(() => {
        var _a;
        dispatch(fetchWemScheduleEvents({ currentDate: (_a = calendarComponentRef === null || calendarComponentRef === void 0 ? void 0 : calendarComponentRef.current) === null || _a === void 0 ? void 0 : _a.getApi().getDate(), currentView: currentView, theme }));
    }, [scheduleChangeNotifications]);
    useEffect(() => {
        var _a;
        if (isIEXEnabled) {
            dispatch(fetchIEXScheduleEvents({ currentDate: (_a = calendarComponentRef === null || calendarComponentRef === void 0 ? void 0 : calendarComponentRef.current) === null || _a === void 0 ? void 0 : _a.getApi().getDate(), currentView: currentView, theme }));
        }
    }, []);
    useEffect(() => {
        var _a;
        const today = new Date();
        const today_yyyymmdd = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        const currentCalendarDate = (_a = calendarComponentRef === null || calendarComponentRef === void 0 ? void 0 : calendarComponentRef.current) === null || _a === void 0 ? void 0 : _a.getApi().getDate();
        const currentCalendarDate_yyyymmdd = currentCalendarDate && new Date(currentCalendarDate).getFullYear() + '-' + (new Date(currentCalendarDate).getMonth() + 1) + '-' + new Date(currentCalendarDate).getDate();
        if (today_yyyymmdd === currentCalendarDate_yyyymmdd) {
            setIstodaySelected(true);
        }
        else {
            setIstodaySelected(false);
        }
    }, [titleDate]);
    return (_jsxs(_Fragment, { children: [_jsxs(Grid, Object.assign({ container: true, sx: schedulerStyles.schedulerToolBarStyles }, { children: [_jsxs(Grid, Object.assign({ sx: schedulerStyles.navigatorStyles, item: true, sm: 10, md: 9, lg: 8, xl: 6 }, { children: [_jsx(CcfTooltip, Object.assign({ title: `${translate('previous')} ${translate('day')}`, arrow: true }, { children: _jsx("span", { children: _jsx(CcfButton, Object.assign({ onClick: () => {
                                            var _a, _b, _c;
                                            if (calendarComponentRef.current) {
                                                calendarComponentRef === null || calendarComponentRef === void 0 ? void 0 : calendarComponentRef.current.getApi().prev();
                                                setTitleDate(calendarComponentRef === null || calendarComponentRef === void 0 ? void 0 : calendarComponentRef.current.getApi().getDate());
                                                dispatch(fetchWemScheduleEvents({ currentDate: calendarComponentRef === null || calendarComponentRef === void 0 ? void 0 : calendarComponentRef.current.getApi().getDate(), currentView: currentView, theme }));
                                                if (isIEXEnabled) {
                                                    dispatch(fetchIEXScheduleEvents({ currentDate: (_a = calendarComponentRef === null || calendarComponentRef === void 0 ? void 0 : calendarComponentRef.current) === null || _a === void 0 ? void 0 : _a.getApi().getDate(), currentView: currentView, theme }));
                                                }
                                                const dateObj = (_c = (_b = calendarComponentRef === null || calendarComponentRef === void 0 ? void 0 : calendarComponentRef.current) === null || _b === void 0 ? void 0 : _b.getApi()) === null || _c === void 0 ? void 0 : _c.getDate();
                                                formatDateAndAnnounce(dateObj, 'schedulePreviousDay');
                                            }
                                        }, sx: Object.assign(Object.assign({}, schedulerStyles === null || schedulerStyles === void 0 ? void 0 : schedulerStyles.prevButtonStyle), schedulerStyles === null || schedulerStyles === void 0 ? void 0 : schedulerStyles.focussedElement), "aria-label": `${translate('previous')} ${translate('day')}` }, { children: _jsx(CcfUpArrowIcon, { viewBox: "-5 2 30 10" }) })) }) })), _jsx(Box, Object.assign({ component: 'div', role: "region", className: 'dateSection' }, { children: dayjs(titleDate).format('MMMM D, YYYY') })), _jsx(CcfTooltip, Object.assign({ title: `${translate('next')} ${translate('day')}`, arrow: true }, { children: _jsx("span", { children: _jsx(CcfButton, Object.assign({ onClick: () => {
                                            var _a, _b, _c;
                                            if (calendarComponentRef.current) {
                                                calendarComponentRef.current.getApi().next();
                                                setTitleDate(calendarComponentRef.current.getApi().getDate());
                                                dispatch(fetchWemScheduleEvents({ currentDate: calendarComponentRef === null || calendarComponentRef === void 0 ? void 0 : calendarComponentRef.current.getApi().getDate(), currentView: currentView, theme }));
                                                if (isIEXEnabled) {
                                                    dispatch(fetchIEXScheduleEvents({ currentDate: (_a = calendarComponentRef === null || calendarComponentRef === void 0 ? void 0 : calendarComponentRef.current) === null || _a === void 0 ? void 0 : _a.getApi().getDate(), currentView: currentView, theme }));
                                                }
                                                const dateObj = (_c = (_b = calendarComponentRef === null || calendarComponentRef === void 0 ? void 0 : calendarComponentRef.current) === null || _b === void 0 ? void 0 : _b.getApi()) === null || _c === void 0 ? void 0 : _c.getDate();
                                                formatDateAndAnnounce(dateObj, 'scheduleNextDay');
                                            }
                                        }, sx: Object.assign(Object.assign({}, schedulerStyles === null || schedulerStyles === void 0 ? void 0 : schedulerStyles.nextButtonStyle), schedulerStyles === null || schedulerStyles === void 0 ? void 0 : schedulerStyles.focussedElement), "aria-label": `${translate('next')} ${translate('day')}` }, { children: _jsx(CcfUpArrowIcon, { viewBox: "-9 5 30 10" }) })) }) }))] })), _jsx(Grid, Object.assign({ sx: schedulerStyles.todayButtonStyle, item: true, lg: 2, xl: 1.3 }, { children: _jsxs(CcfToggleButton, Object.assign({ sx: Object.assign(Object.assign({}, schedulerStyles === null || schedulerStyles === void 0 ? void 0 : schedulerStyles.focussedElement), schedulerStyles === null || schedulerStyles === void 0 ? void 0 : schedulerStyles.todayButton), onClick: () => {
                                var _a, _b, _c;
                                if (calendarComponentRef.current) {
                                    calendarComponentRef === null || calendarComponentRef === void 0 ? void 0 : calendarComponentRef.current.getApi().today();
                                    setTitleDate(calendarComponentRef === null || calendarComponentRef === void 0 ? void 0 : calendarComponentRef.current.getApi().getDate());
                                    dispatch(fetchWemScheduleEvents({ currentDate: calendarComponentRef === null || calendarComponentRef === void 0 ? void 0 : calendarComponentRef.current.getApi().getDate(), currentView: currentView, theme }));
                                    if (isIEXEnabled) {
                                        dispatch(fetchIEXScheduleEvents({ currentDate: (_a = calendarComponentRef === null || calendarComponentRef === void 0 ? void 0 : calendarComponentRef.current) === null || _a === void 0 ? void 0 : _a.getApi().getDate(), currentView: currentView, theme }));
                                    }
                                    const dateObj = (_c = (_b = calendarComponentRef === null || calendarComponentRef === void 0 ? void 0 : calendarComponentRef.current) === null || _b === void 0 ? void 0 : _b.getApi()) === null || _c === void 0 ? void 0 : _c.getDate();
                                    formatDateAndAnnounce(dateObj, 'scheduleToday');
                                }
                            }, value: 'today' }, { children: [_jsx(CcfFocusIcon, { sx: schedulerStyles.focusIcon }), translate('today')] })) })), _jsx(Grid, Object.assign({ item: true, sx: schedulerStyles.viewChangerStyles, lg: 3, xl: 2.7, "aria-label": translate('schedule') }, { children: _jsx(CcfToggleButtonGroup, { options: [
                                { value: 'day', label: translate('day') },
                                { value: 'week', label: translate('week') }
                            ], value: currentView, onChange: (selectedView) => {
                                if (calendarComponentRef.current) {
                                    dispatch(globalActions.setAriaLiveAnnouncer({
                                        ariaMessage: `Schedule changed to ${selectedView} view`,
                                    }));
                                    calendarComponentRef.current.getApi().changeView(selectedView === 'week' ? 'timeGridWeek' : 'timeGridDay');
                                    setCurrentView(selectedView);
                                    dispatch(fetchWemScheduleEvents({
                                        currentDate: calendarComponentRef.current.getApi().getDate(),
                                        currentView: selectedView,
                                        theme,
                                    }));
                                    if (isIEXEnabled) {
                                        dispatch(fetchIEXScheduleEvents({
                                            currentDate: calendarComponentRef.current.getApi().getDate(),
                                            currentView: selectedView,
                                            theme,
                                        }));
                                    }
                                }
                            }, toggleButtonStyle: schedulerStyles === null || schedulerStyles === void 0 ? void 0 : schedulerStyles.toggleButton }) })), !disableAddEvent && _jsx(Grid, Object.assign({ item: true, sx: schedulerStyles.addEventButton, sm: 2, md: 3, lg: 4, xl: 2, ref: popOverRef }, { children: _jsx(CcfAddEventPopover, { paperProps: { style: { width: `${(_a = popOverRef === null || popOverRef === void 0 ? void 0 : popOverRef.current) === null || _a === void 0 ? void 0 : _a.offsetWidth}px`, minWidth: '150px' } } }) }))] })), _jsx(Grid, Object.assign({ sx: schedulerStyles.appScheduler, id: currentView === 'day' ? 'panel-day' : 'panel-week', role: "tabpanel", "aria-labelledby": currentView === 'day' ? 'tab-day' : 'tab-week' }, { children: _jsx(CcfScheduler, { events: [...events, ...commitments, ...iEXEvents], ref: calendarComponentRef, scrollTime: dayjs().subtract(1, 'hour').format('H:mm:ss'), allDaySlot: true, renderScheduleContent: getCcfAppScheduleContent }) }))] }));
};
export default SchedulerLargeView;
//# sourceMappingURL=ccf-schedular-large-view.js.map