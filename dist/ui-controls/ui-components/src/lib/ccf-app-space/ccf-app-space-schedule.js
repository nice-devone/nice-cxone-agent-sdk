import { __awaiter } from "tslib";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, useTheme } from '@mui/material';
import { useTranslator, CcfButton, CcfUpArrowIcon, CcfTypography, CcfScheduler, CcfTooltip } from '@nice-devone/ui-controls';
import { fetchWemScheduleEvents, getIEXScheduleEvents, getWemScheduleEvents } from '../ccf-app-schedule/ccf-app-schedule.slice';
import dayjs from 'dayjs';
import ccfAppSpaceSchedulerStyles from './ccf-app-space-schedular.styles';
import { getWemScheduleChangeNotifications } from '../ccf-agent-notification/ccf-agent-notification.slice';
import { CcfAddEventPopover, useCcfCommitmentAddEventPopOverItems } from '../ccf-app-schedule/ccf-add-event-popover';
import { getAddCommitmentByCall, commitmentActions, getShowCommitmentFormState, fetchCommitments } from '../ccf-commitment/ccf-commitment.slice';
import { useCcfAppScheduleContent } from '../ccf-app-schedule/ccf-app-schedule-content';
import { useCcfCommitmentList } from '../ccf-commitment/ccf-commitment-details';
import { userInfoSelector } from '../ccf-agent-state/ccf-agent-state.slice';
/**
 * CcfAppSpaceScheduler - returns app space scheduler
 * @returns - CcfAppSpaceScheduler
 * @example - `<CcfAppSpaceScheduler />`
 */
const CcfAppSpaceScheduler = () => {
    var _a, _b;
    const calendarComponentRef = useRef();
    const dispatch = useDispatch();
    const theme = useTheme();
    const ccfAppSchedulerStyles = ccfAppSpaceSchedulerStyles(theme);
    const events = useSelector(getWemScheduleEvents);
    const iEXEvents = useSelector(getIEXScheduleEvents);
    const addCommitmentByCall = useSelector(getAddCommitmentByCall);
    const scheduleChangeNotifications = useSelector(getWemScheduleChangeNotifications);
    const showCommitmentFormState = useSelector(getShowCommitmentFormState);
    const [titleDate, setTitleDate] = useState();
    const [ccfCommitmentsForm, setCcfCommitmentsForm] = useState(null);
    const [translate] = useTranslator();
    const popOverRef = useRef(null);
    const { getCcfAppScheduleContent } = useCcfAppScheduleContent();
    const { disableAddEvent } = useCcfCommitmentAddEventPopOverItems();
    const commitments = useCcfCommitmentList();
    const agentId = (_a = useSelector(userInfoSelector)) === null || _a === void 0 ? void 0 : _a.icAgentId;
    /**
     * Function to render voice mail contact panel
     * @returns voice mail contact panel
     * ```
     * @example
     * renderCcfVoiceMailContactPanel()
     * ```
     *
     **/
    const renderCcfCommitmentsForm = () => __awaiter(void 0, void 0, void 0, function* () {
        setCcfCommitmentsForm(null);
        const commitmentForm = yield import('../ccf-commitment/ccf-commitment-form');
        const CommitmentForm = commitmentForm.CcfCommitmentsForm;
        setCcfCommitmentsForm(_jsx(CommitmentForm, { isFullView: true }));
    });
    useEffect(() => {
        if (agentId) {
            dispatch(fetchCommitments(Number(agentId)));
        }
    }, []);
    useEffect(() => {
        var _a;
        dispatch(fetchWemScheduleEvents({
            currentDate: (_a = calendarComponentRef === null || calendarComponentRef === void 0 ? void 0 : calendarComponentRef.current) === null || _a === void 0 ? void 0 : _a.getApi().getDate(),
            currentView: 'day',
            theme,
        }));
    }, [scheduleChangeNotifications]);
    useEffect(() => {
        !addCommitmentByCall && dispatch(commitmentActions.showCommitmentForm(false));
    }, []);
    useEffect(() => {
        if (showCommitmentFormState && !ccfCommitmentsForm) {
            renderCcfCommitmentsForm();
        }
    }, [showCommitmentFormState]);
    /* istanbul ignore next */
    return showCommitmentFormState ? (ccfCommitmentsForm) : (_jsxs(_Fragment, { children: [_jsxs(Grid, Object.assign({ container: true, sx: ccfAppSchedulerStyles.schedulerToolBarStyles }, { children: [_jsx(Grid, Object.assign({ item: true, xs: 12 }, { children: _jsx(CcfTypography, Object.assign({ sx: ccfAppSchedulerStyles.schedulerHeadingStyles }, { children: translate('mySchedule') })) })), _jsxs(Grid, Object.assign({ sx: ccfAppSchedulerStyles.navigatorStyles, item: true, xs: 12 }, { children: [_jsx(CcfTooltip, Object.assign({ title: `${translate('previous')} ${translate('day')}`, arrow: true }, { children: _jsx("span", { children: _jsx(CcfButton, Object.assign({ onClick: () => {
                                            if (calendarComponentRef.current) {
                                                calendarComponentRef.current.getApi().prev();
                                                setTitleDate(calendarComponentRef.current.getApi().getDate());
                                                dispatch(fetchWemScheduleEvents({
                                                    currentDate: calendarComponentRef === null || calendarComponentRef === void 0 ? void 0 : calendarComponentRef.current.getApi().getDate(),
                                                    currentView: 'day',
                                                    theme,
                                                }));
                                            }
                                        }, sx: Object.assign(Object.assign({}, ccfAppSchedulerStyles === null || ccfAppSchedulerStyles === void 0 ? void 0 : ccfAppSchedulerStyles.prevButtonStyle), ccfAppSchedulerStyles === null || ccfAppSchedulerStyles === void 0 ? void 0 : ccfAppSchedulerStyles.focussedElement), "aria-label": translate('previous') }, { children: _jsx(CcfUpArrowIcon, { viewBox: "-5 2 30 10" }) })) }) })), _jsx(CcfButton, Object.assign({ className: "title" }, { children: dayjs(titleDate).format('dddd | MMM D, YYYY') })), _jsx(CcfTooltip, Object.assign({ title: `${translate('next')} ${translate('day')}`, arrow: true }, { children: _jsx("span", { children: _jsx(CcfButton, Object.assign({ sx: Object.assign(Object.assign({}, ccfAppSchedulerStyles === null || ccfAppSchedulerStyles === void 0 ? void 0 : ccfAppSchedulerStyles.nextButtonStyle), ccfAppSchedulerStyles === null || ccfAppSchedulerStyles === void 0 ? void 0 : ccfAppSchedulerStyles.focussedElement), onClick: () => {
                                            if (calendarComponentRef.current) {
                                                calendarComponentRef.current.getApi().next();
                                                setTitleDate(calendarComponentRef.current.getApi().getDate());
                                                dispatch(fetchWemScheduleEvents({
                                                    currentDate: calendarComponentRef === null || calendarComponentRef === void 0 ? void 0 : calendarComponentRef.current.getApi().getDate(),
                                                    currentView: 'day',
                                                    theme,
                                                }));
                                            }
                                        }, "aria-label": translate('next') }, { children: _jsx(CcfUpArrowIcon, { viewBox: "-9 5 30 10" }) })) }) }))] })), !disableAddEvent && (_jsx(Grid, Object.assign({ ref: popOverRef, item: true, xs: 12, sx: ccfAppSchedulerStyles.addEventButton }, { children: _jsx(CcfAddEventPopover, { paperProps: { style: { width: `${(_b = popOverRef === null || popOverRef === void 0 ? void 0 : popOverRef.current) === null || _b === void 0 ? void 0 : _b.offsetWidth}px` } } }) })))] })), _jsx(Grid, Object.assign({ sx: ccfAppSchedulerStyles.appSpaceSchedulerStyles }, { children: _jsx(CcfScheduler, { events: [...events, ...commitments, ...iEXEvents], ref: calendarComponentRef, scrollTime: dayjs().subtract(1, 'hour').format('H:mm:ss'), allDaySlot: true, renderScheduleContent: getCcfAppScheduleContent }) }))] }));
};
export default CcfAppSpaceScheduler;
//# sourceMappingURL=ccf-app-space-schedule.js.map