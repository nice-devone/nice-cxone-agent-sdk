import { jsxs as _jsxs, jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { useTheme } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';
import { CcfBox, CcfDatePicker, CcfToggleButtonGroup, CcfTypography, useTranslator } from '@nice-devone/ui-controls';
import CcfReportingStyles from '../ccf-reporting-styles';
import dayjs from 'dayjs';
import { useDispatch } from 'react-redux';
import { getPerformanceReport, getProductivityReport } from '../ccf-reporting.slice';
/**
 * Component for ccf reporting header
 *
 * @example - <CcfReportingHeader />
 * @returns
 */
function CcfReportingHeader(props) {
    const [translate] = useTranslator();
    const theme = useTheme();
    const dispatch = useDispatch();
    const reportingStyles = CcfReportingStyles(theme);
    const toggleButtonTypes = ['today', 'yesterday', 'last7Days', 'custom'];
    const today = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 0, 0, 0);
    const [showReportFilters, setShowReportFilters] = useState(false);
    const [reportFilters, setReportFilters] = useState({ startDate: dayjs(today), endDate: dayjs(today) });
    const [maxEndDate, setMaxEndDate] = useState(reportFilters.startDate);
    const [downArrowForEndDate, setDownArrowForEndDate] = useState(false);
    const [upArrowForStartDate, setUpArrowForStartDate] = useState(false);
    const [currentView, setCurrentView] = useState('today');
    const [upArrowForEndDate, setUpArrowForEndDate] = useState(false);
    const getAgentReports = props.type === 'productivity' ? getProductivityReport : getPerformanceReport;
    useEffect(() => {
        if (reportFilters.startDate !== null && reportFilters.endDate !== null) {
            setmaxDateValidation(reportFilters.startDate);
            setEndDateValidation(reportFilters.startDate, reportFilters.endDate);
        }
    }, [reportFilters.endDate, reportFilters.startDate]);
    /**
     * Used to set the max date for end date component
     *
     * @param startDate - start date selected by user
     * @example - setmaxDateValidation(startDate)
     */
    const setmaxDateValidation = (startDate) => {
        const difference = Math.floor(dayjs(today).diff(startDate, 'day', true));
        if (difference >= 30) {
            setMaxEndDate(startDate.add(29, 'day'));
        }
        else {
            setMaxEndDate(dayjs(today));
        }
    };
    /**
     * Used to validate weather to disabled up arrow or down arrow
     *
     * @param startDate - start date selected by user
     * @param endDate- end date selected by user
     * @example - setEndDateValidation(startDate)
     */
    const setEndDateValidation = (startDate, endDate) => {
        const differenceFromEndDate = Math.round(dayjs(endDate).diff(startDate, 'day', true));
        const diffBtwnTodayEndDate = Math.round(dayjs(today).diff(endDate, 'day', true));
        setDownArrowForEndDate(differenceFromEndDate <= 0);
        setUpArrowForStartDate(differenceFromEndDate <= 0);
        setUpArrowForEndDate(diffBtwnTodayEndDate <= 0);
    };
    /**
     * Used to update the state and show calender to select custom date
     *
     * @param currentView - currentView/timespan selected by user to check reporting
     * @example - openCalender(currentView)
     */
    const openCalender = (currentView) => {
        setCurrentView(currentView);
        if (currentView !== 'custom') {
            setReportFilters({ startDate: dayjs(today), endDate: dayjs(today) });
            setShowReportFilters(false);
            dispatch(getAgentReports({ range: currentView }));
        }
        else if (reportFilters.endDate && reportFilters.startDate) {
            setShowReportFilters(true);
            dispatch(getAgentReports({ range: currentView, startDate: reportFilters.startDate, endDate: reportFilters.endDate }));
        }
        ;
    };
    /**
     * Used to validate the start date and end date
     *
     * @example - validateDate(event,type)
     */
    const validateDate = (event, type) => {
        if (reportFilters.endDate && reportFilters.startDate && event) {
            setReportFilters(Object.assign(Object.assign({}, reportFilters), { [type]: event }));
            if (type === 'startDate') {
                const difference = Math.ceil(dayjs(reportFilters.endDate).diff(event, 'day', true));
                difference < 30 && dispatch(getAgentReports({ range: 'custom', startDate: event, endDate: reportFilters.endDate }));
            }
            else {
                const difference = Math.ceil(dayjs(event).diff(reportFilters.startDate, 'day', true));
                difference < 30 && dispatch(getAgentReports({ range: 'custom', startDate: reportFilters.startDate, endDate: event }));
            }
        }
    };
    return (_jsxs(_Fragment, { children: [_jsxs(CcfBox, Object.assign({ sx: reportingStyles.productivityWrapper }, { children: [_jsxs(CcfTypography, Object.assign({ variant: 'h3', sx: reportingStyles.productivityheader, "data-testid": 'reporting-header' }, { children: [translate(props.type), props.agentOverallPercentage !== null ? ` (${props.agentOverallPercentage}%)` : ''] })), _jsx(CcfToggleButtonGroup, { options: toggleButtonTypes.map(type => ({
                            value: type,
                            label: translate(type),
                        })), value: currentView, onChange: openCalender, toggleButtonStyle: reportingStyles === null || reportingStyles === void 0 ? void 0 : reportingStyles.btn })] })), showReportFilters &&
                _jsxs(CcfBox, Object.assign({ "data-testid": "calender", sx: reportingStyles.calenderBlock }, { children: [_jsx(CcfBox, Object.assign({ sx: reportingStyles.dateLabel }, { children: _jsx(CcfDatePicker, { label: 'startDate', maxDate: dayjs(today), disableUpArrow: upArrowForStartDate, setSelectedDate: event => validateDate(event, 'startDate'), dateTime: reportFilters.startDate, fieldName: 'startDate', applyStylesToDate: true }) })), _jsx(CcfBox, { children: _jsx(CcfDatePicker, { autoFocus: true, label: 'endDate', minDate: dayjs(reportFilters.startDate), maxDate: maxEndDate, disableDownArrow: downArrowForEndDate, disableUpArrow: upArrowForEndDate, setSelectedDate: event => validateDate(event, 'endDate'), dateTime: reportFilters.endDate, fieldName: 'endDate', applyStylesToDate: true }) })] }))] }));
}
export default React.memo(CcfReportingHeader);
//# sourceMappingURL=ccf-reporting-header.js.map