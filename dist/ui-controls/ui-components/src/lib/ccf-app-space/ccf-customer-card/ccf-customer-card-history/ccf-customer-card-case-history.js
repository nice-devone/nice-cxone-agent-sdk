import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
/* eslint-disable comma-dangle */
import { Box, Divider, useTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import customerCardHistoryStyles from './ccf-customer-card-case-history.styles';
import { CcfBox, CcfSettingsIcon, useTranslator, CcfTypography, CcfUpArrowIcon, CcfButton, CcfTooltip, } from '@nice-devone/ui-controls';
import { useEffect, useState } from 'react';
import { getNonIncomingActiveContactInSelectedInteraction } from '../../../ccf-assignment-panel/ccf-assignment-panel.slice';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import { getCaseHistory, getInteractionHistory, CcfCustomerCardActions } from '../ccf-customer-card.slice';
import { DigitalContactStatus } from '@nice-devone/common-sdk';
dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);
/**
 * CcfCustomerCardinteractionHistory- used to display customer case history
 * @example
 * ```
 * <CcfCustomerCardinteractionHistory />
 * ```
 */
export function CcfCustomerCardinteractionHistory() {
    var _a, _b;
    const theme = useTheme();
    const [translate] = useTranslator();
    const dispatch = useDispatch();
    const events = useSelector(getInteractionHistory);
    const styles = customerCardHistoryStyles(theme);
    const activeContact = useSelector(getNonIncomingActiveContactInSelectedInteraction);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10; // Number of case history items to display per page
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];
    const initiators = {
        system: 'system',
        api: 'api',
        workflow: 'workflow',
        external: 'external',
        routing: 'routing',
        workflowJob: 'workflowJob',
        unifiedRouting: 'unifiedRouting'
    };
    const isDraft = (activeContact === null || activeContact === void 0 ? void 0 : activeContact.contactStatus) === DigitalContactStatus.DRAFT;
    useEffect(() => {
        var _a, _b;
        dispatch(isDraft
            ? CcfCustomerCardActions.setDraftCaseInteractionHistory()
            : getCaseHistory({
                contactId: (_b = (_a = activeContact === null || activeContact === void 0 ? void 0 : activeContact.caseId) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : '',
                pageNumber: currentPage,
                pageSize: pageSize,
            }));
    }, [activeContact === null || activeContact === void 0 ? void 0 : activeContact.caseId, activeContact === null || activeContact === void 0 ? void 0 : activeContact.contactStatus, currentPage]);
    useEffect(() => {
        setCurrentPage(1);
    }, [activeContact]);
    /**
     * handles current page number in case of pagination
     * @param newPage - number
     * @example
     * ```
     * handlePageChange(1)
     * ```
     */
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };
    /**
     * calculate date to display in history event
     * @param createdAt - case history event created date
     * @example
     * ```
     * calculateDate('2024-02-29T05:46:15+00:00')
     * ```
     */
    const calculateDate = (createdAt) => {
        const startofToday = dayjs().startOf('day');
        const startofCreateDate = dayjs(createdAt).startOf('day');
        const diff = startofCreateDate.diff(startofToday, 'day');
        let date = '';
        if (diff === 0) {
            date = translate('today');
        }
        else if (diff === -1) {
            date = translate('yesterday');
        }
        else if (diff < -1 && diff > -7) {
            date = weekdays[dayjs(createdAt).day()];
        }
        else {
            date = dayjs(createdAt).format('M/DD');
        }
        return date + ' ' + dayjs(createdAt).format('h:mm A');
    };
    /**
     * calculate divider month
     * @param createdAt - Create at date
     * @param index -  index
     * @param caseHistoryArr - case history array
     * @example
     * ```
     * calculateDividerMonth('2024-02-20T010:46:15+00:00','2024-02-29T05:46:15+00:00')
     * ```
     */
    const calculateDividerMonth = (currentCreatedAt, nextCreatedAt) => {
        return (dayjs(currentCreatedAt).month() !== dayjs(nextCreatedAt).month() && (_jsx(Divider, Object.assign({ sx: styles.monthDivider }, { children: dayjs(nextCreatedAt).year() !== dayjs(currentCreatedAt).year()
                ? months[dayjs(nextCreatedAt).month()].slice(0, 3) +
                    ' ' +
                    dayjs(nextCreatedAt).year()
                : months[dayjs(nextCreatedAt).month()] }))));
    };
    /**
     * Derive case status statement
     * @param status - case status
     * @example
     * ```
     * deriveCaseStatus('open')
     * ```
     */
    const deriveCaseStatus = (status) => {
        let statusText = '';
        if (status.includes(translate('new').toLocaleLowerCase())) {
            statusText = translate('opened');
        }
        else if (status.includes(translate('open').toLocaleLowerCase())) {
            statusText = translate('reopened');
        }
        else {
            statusText = status[0].toUpperCase() + status.slice(1);
        }
        return (statusText.toLocaleLowerCase().includes('open') ? (_jsxs(_Fragment, { children: [_jsx("b", { children: statusText }), translate('case').toLocaleLowerCase(), _jsx("b", {})] })) : (_jsxs(_Fragment, { children: [' ', translate('setCaseAs'), _jsx("b", { children: statusText })] })));
    };
    /**
     * element get case history text
     * @param element -  the data
     * @example
     * ```
     * getCaseHistoryItemText({})
     * ```
     */
    const getCaseHistoryItemText = (element) => {
        var _a, _b;
        if (element.inboxAssignee.fullName === null) {
            return _jsxs(CcfBox, Object.assign({ component: "span" }, { children: [_jsx("b", { children: translate('removed') }), translate('caseFrom'), _jsx("b", { children: (_a = element.previousInboxAssignee) === null || _a === void 0 ? void 0 : _a.fullName })] }));
        }
        else if (typeof element.status === 'string') {
            return _jsx(CcfBox, Object.assign({ component: "span" }, { children: deriveCaseStatus(element.status) }));
        }
        else {
            return _jsxs(CcfBox, Object.assign({ component: "span" }, { children: [_jsx("b", { children: translate('assigned') }), translate('caseto'), _jsx("b", { children: (_b = element.inboxAssignee) === null || _b === void 0 ? void 0 : _b.fullName })] }));
        }
    };
    /**
     * element get case history badge
     * @param element -  the data
     * @example
     * ```
     * getCaseHistoryItemBadge({})
     * ```
     */
    const getCaseHistoryItemBadge = (element) => {
        var _a, _b, _c;
        if (element.eventInitiator !== null && Object.values(initiators).includes(element.eventInitiator)) {
            return (_jsx(CcfBox, { children: _jsx(CcfSettingsIcon, { viewBox: "-5 -5 30 30", sx: Object.assign(Object.assign({}, styles.assigneeImage), { backgroundColor: theme.palette.background.main, color: theme.palette.text.main }) }) }));
        }
        else if (element.inboxAssignee.fullName === null && ((_a = element.previousInboxAssignee) === null || _a === void 0 ? void 0 : _a.imageUrl) !== '') {
            return (_jsx(CcfBox, { sx: Object.assign(Object.assign({}, styles.assigneeImage), { backgroundImage: `url(${(_b = element.previousInboxAssignee) === null || _b === void 0 ? void 0 : _b.imageUrl})` }) }));
        }
        else if (element.previousInboxAssignee.fullName === null) {
            return (_jsx(CcfBox, { sx: Object.assign(Object.assign({}, styles.assigneeImage), { backgroundImage: `url(${(_c = element.inboxAssignee) === null || _c === void 0 ? void 0 : _c.imageUrl})` }) }));
        }
        return undefined;
    };
    /**
     * element get case history badge
     * @param element -  the data
     * @example
     * ```
     * getCaseHistoryItemTitle({})
     * ```
     */
    const getCaseHistoryItemTitle = (element) => {
        if (element.eventInitiator === translate('api')) {
            return element.eventInitiator.toLocaleUpperCase();
        }
        else if (element.eventInitiator === translate('system')) {
            return element.eventInitiator.charAt(0).toUpperCase() + element.eventInitiator.slice(1);
        }
        else {
            return element.eventInitiator;
        }
    };
    return (_jsxs(CcfBox, { children: [_jsx(CcfBox, Object.assign({ sx: styles.ccfCaseHistoryContainer }, { children: _jsxs(CcfBox, { children: [!isDraft &&
                            ((_b = (_a = events === null || events === void 0 ? void 0 : events.caseHistory) === null || _a === void 0 ? void 0 : _a.caseInteractionHistory) === null || _b === void 0 ? void 0 : _b.length) &&
                            events.caseHistory.caseInteractionHistory.map((element, index) => {
                                return (_jsx(CcfBox, { children: _jsxs(CcfBox, Object.assign({ sx: styles.ccfCaseHistoryRecord }, { children: [_jsxs(CcfBox, Object.assign({ sx: styles.textWrapper }, { children: [_jsx(CcfTooltip, Object.assign({ styles: {
                                                            ccfTooltip: Object.assign({}, styles.eventInitiatorTooltip),
                                                            ccfTooltipArrow: Object.assign({}, styles.eventInitiatorTooltipArrow),
                                                        }, placement: "left-end", arrow: true, title: _jsx(CcfTypography, Object.assign({ sx: styles.eventInitiatorTooltipText }, { children: getCaseHistoryItemTitle(element) })) }, { children: _jsx(Box, { children: getCaseHistoryItemBadge(element) }) })), _jsx(CcfBox, Object.assign({ sx: styles.ccfCaseHistoryItemText }, { children: getCaseHistoryItemText(element) }))] })), _jsx(CcfBox, Object.assign({ sx: styles.ccfCaseHistoryTimeText, "data-testid": "EventDateTime" }, { children: calculateDate(element.createdAt) })), index <= events.caseHistory.caseInteractionHistory.length - 2 &&
                                                calculateDividerMonth(element.createdAt, events.caseHistory.caseInteractionHistory[index + 1].createdAt)] })) }, element.createdAt));
                            }), Object.keys(events.caseHistory).length === 0 && events.isLoading && (_jsx(CcfBox, Object.assign({ sx: styles.alignCenter }, { children: _jsx(CcfBox, { sx: styles.loader }) }))), (isDraft || (Object.keys(events.caseHistory).length === 0 && !events.isLoading)) && (_jsx(CcfBox, Object.assign({ sx: styles.alignCenter, "data-testid": "NoInformationAvailable" }, { children: translate('noInformationAvailable') })))] }) })), !isDraft && Object.keys(events.caseHistory).length ? (_jsxs(CcfBox, Object.assign({ sx: styles.paginationWrapper }, { children: [_jsx(CcfTypography, Object.assign({ variant: "caption" }, { children: `${(currentPage - 1) * pageSize + 1} - ${(currentPage - 1) * pageSize + events.caseHistory.caseInteractionHistory.length} ${translate('of')} ${events.caseHistory.totalRecords}` })), _jsx(CcfButton, Object.assign({ sx: Object.assign(Object.assign({}, styles.prevNextButton), { transform: 'rotate(-90deg)' }), onClick: () => handlePageChange(currentPage - 1), disabled: events.caseHistory.links.previous === null, "aria-label": translate('previousInteractionHistoryPage') }, { children: _jsx(CcfUpArrowIcon, { viewBox: "6 -5 4 24" }) })), _jsx(CcfButton, Object.assign({ sx: Object.assign(Object.assign({}, styles.prevNextButton), { transform: 'rotate(90deg)' }), onClick: () => handlePageChange(currentPage + 1), disabled: events.caseHistory.links.next === null, "aria-label": translate('nextInteractionHistoryPage') }, { children: _jsx(CcfUpArrowIcon, { viewBox: "6 -2 4 24" }) }))] }))) : (_jsx(_Fragment, {}))] }));
}
export default CcfCustomerCardinteractionHistory;
//# sourceMappingURL=ccf-customer-card-case-history.js.map