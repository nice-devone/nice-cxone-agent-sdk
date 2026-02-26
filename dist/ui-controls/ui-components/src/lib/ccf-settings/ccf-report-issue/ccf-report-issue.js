import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useContext } from 'react';
import { Box, Checkbox, FormControlLabel, InputLabel, MenuItem, Select, Stack, Typography, useTheme } from '@mui/material';
import { CcfAppToastMessage, CcfButton, CcfTypography, TranslatorContext, useTranslator } from '@nice-devone/ui-controls';
import reportIssueStyles from './ccf-report-issue.styles';
import { Logger } from '@nice-devone/core-sdk';
import { toast } from 'react-toastify';
import { CXoneClient } from '@nice-devone/agent-sdk';
import { useSelector } from 'react-redux';
import { browserName, browserVersion } from 'react-device-detect';
import { getAgentSessionInfo } from '../../ccf-acd-session/ccf-acd-session.slice';
import { allDigitalContactCard, getActiveContacts } from '../../ccf-assignment-panel/ccf-assignment-panel.slice';
import { agentLegConnectionStatus } from '../../ccf-agent-state/ccf-agent-state.slice';
/**
 * @example CcfReportIssue()
 * @returns
 */
export function CcfReportIssue() {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    const theme = useTheme();
    const [translate] = useTranslator();
    const [categories, setCategories] = useState([]);
    const [priorities, setPriorities] = useState([]);
    const [categoryId, setCategoryId] = useState('');
    const [emptyValueError, setEmptyValueError] = useState(false);
    const [priority, setPriority] = useState('');
    const [comment, setComment] = useState('');
    const [isCommentsFocused, setIsCommentsFocused] = useState(false);
    const [isSendDisabled, setIsSendDisabled] = useState(false);
    const styles = reportIssueStyles(theme);
    const agentSessionInfo = useSelector(getAgentSessionInfo);
    const [appendEventLog, setAppendEventLog] = useState(false);
    const categoryEmpty = categoryId === '';
    const priorityEmpty = priority === '';
    const commentEmpty = comment === '';
    const digitalContacts = useSelector(allDigitalContactCard);
    const acdContacts = useSelector(getActiveContacts);
    const { locale } = useContext(TranslatorContext);
    const logger = new Logger('ccf-settings', 'ccf-report-issue');
    const agentLeg = useSelector(agentLegConnectionStatus);
    useEffect(() => {
        CXoneClient.instance.getFeedbackCategoriesAndPriorities().then((response) => {
            if (response.CategoriesAndPriorities) {
                const translatedCategories = response.CategoriesAndPriorities.feedbackCategories.map((category) => ({
                    id: category.id,
                    name: translate(('agentIssueTypeId' + category.id)),
                }));
                setCategories(translatedCategories);
                const translatedPriorities = response.CategoriesAndPriorities.feedbackPriorities.map((priority) => ({
                    name: priority.name,
                    translatedName: translate(priority.name.toLowerCase()),
                }));
                setPriorities(translatedPriorities);
            }
        });
    }, []);
    /**
     * Handles change for category value
     * @example
     * onCategoryChange()
     */
    const onCategoryChange = (event) => {
        setCategoryId(event.target.value);
    };
    /**
     * Handles change for priority value
     * @example
     * onCategoryChange()
     */
    const onPriorityChange = (event) => {
        setPriority(event.target.value);
    };
    /**
     * Handles updates to the comment field
     * @example
     * onCommentChange()
     */
    const onCommentChange = (event) => {
        setComment(event.target.value);
    };
    /**
     * Handles send button click to send feedback with the api
     * @example
     * onSendClick()
     */
    const onSendClick = () => {
        if (categoryEmpty || priorityEmpty || commentEmpty) {
            setEmptyValueError(true);
            return;
        }
        const feedbackData = { categoryId, priority, comment };
        setEmptyValueError(false);
        setIsSendDisabled(true);
        setAppendEventLog(false);
        feedbackData.comment = createCommentAddLogs(comment);
        CXoneClient.instance
            .submitFeedback(feedbackData)
            .then(() => {
            setCategoryId('');
            setPriority('');
            setComment('');
            setIsSendDisabled(false);
            toast.success(_jsx(CcfAppToastMessage, { type: "any", messageKey: "issueSubmittedForReview" }), {
                autoClose: 5000,
                containerId: 'AppToastContainer',
            });
        })
            .catch(() => {
            setIsSendDisabled(false);
            toast.error(_jsx(CcfAppToastMessage, { type: "any", messageKey: "issueSubmissionFailed" }), {
                autoClose: 5000,
                containerId: 'AppToastContainer',
            });
        });
    };
    /**
     * Gets the style for the comment text area
     * @example
     * getCommentTextAreaStyle()
     */
    const getCommentTextAreaStyle = () => {
        var _a, _b, _c, _d, _e, _f;
        if (commentEmpty && emptyValueError) {
            return Object.assign(Object.assign({}, styles.textArea), { border: `1px solid ${(_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.error) === null || _b === void 0 ? void 0 : _b.main}`, outlineColor: (_d = (_c = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _c === void 0 ? void 0 : _c.error) === null || _d === void 0 ? void 0 : _d.main });
        }
        else if (isCommentsFocused) {
            return Object.assign(Object.assign({}, styles.textArea), { outlineColor: (_f = (_e = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _e === void 0 ? void 0 : _e.primary) === null || _f === void 0 ? void 0 : _f.main });
        }
        return styles.textArea;
    };
    /**
      * Creates a comment string with appended logs and additional information.
    * If `appendEventLog` is true, it also appends the event log entries.
      * @param comment - The initial user comment, its a string.
      * @returns - string
      * @example - createCommentAddLogs('derp')
    */
    function createCommentAddLogs(comment) {
        var _a;
        const rtn = '\n\r';
        comment = 'User Comment: ' + comment;
        if (appendEventLog) {
            const eventLog = logger.getEventLog();
            const digitalContactIds = digitalContacts.map((contact) => contact.contactId);
            const acdContactIds = acdContacts.map((contact) => contact.contactId);
            comment += (rtn + 'Current Time:     ' + new Date().toString() + rtn
                + 'Client:           ' + 'CXone Agent' + rtn
                + 'Agent ID:         ' + agentSessionInfo.agentId + rtn
                + 'Station ID:       ' + (((_a = agentSessionInfo.stationId) === null || _a === void 0 ? void 0 : _a.toString()) || 'na') + rtn
                + 'Phone Number:     ' + agentSessionInfo.stationPhoneNumber + rtn
                + 'Caller ID:        ' + agentSessionInfo.stationCallerId + rtn
                + 'Session ID:       ' + agentSessionInfo.sessionId + rtn
                + 'Agent Leg ID:     ' + (agentLeg.agentLegId || 'na') + rtn
                + 'Virtual Cluster:  ' + agentSessionInfo.vcHost + rtn
                + 'Web Server:       ' + agentSessionInfo.iisHost + rtn
                + 'ACD Contact IDs:     ' + acdContactIds.join(', ') + rtn
                + 'Digital Contact IDs: ' + digitalContactIds.join(', ') + rtn
                + 'Localization:        ' + locale + rtn
                + 'Browser:             ' + browserName + ' ' + browserVersion + rtn);
            eventLog.forEach((log) => {
                comment += log + rtn;
            });
        }
        return comment;
    }
    ;
    return (_jsxs(Stack, Object.assign({ sx: styles.container }, { children: [_jsx(CcfTypography, Object.assign({ sx: styles.header }, { children: translate('reportAnIssue') })), _jsx(InputLabel, Object.assign({ id: "categorySelect-label", sx: styles.inputLabel, required: true }, { children: translate('category') })), _jsxs(Select, Object.assign({ displayEmpty: true, variant: "outlined", labelId: "categorySelect-label", sx: Object.assign(Object.assign({}, styles.select), { color: categoryEmpty ? (_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.text) === null || _b === void 0 ? void 0 : _b.placeholder : (_d = (_c = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _c === void 0 ? void 0 : _c.text) === null || _d === void 0 ? void 0 : _d.dark }), value: categoryId, onChange: onCategoryChange, error: emptyValueError && categoryEmpty }, { children: [_jsx(MenuItem, Object.assign({ disabled: true, value: "" }, { children: translate('select') })), categories.map((category) => (_jsx(MenuItem, Object.assign({ sx: [styles.menuItem, styles.hoveredElement, styles.focusedElement], value: category.id }, { children: category.name }), category.name + category.id)))] })), _jsx(Typography, Object.assign({ sx: Object.assign(Object.assign({}, styles.emptySelectionText), { visibility: emptyValueError && categoryEmpty ? 'visible' : 'hidden' }) }, { children: translate('pleaseMakeASelection') })), _jsx(InputLabel, Object.assign({ id: "prioritySelect-label", sx: styles.inputLabel, required: true }, { children: translate('priority') })), _jsxs(Select, Object.assign({ displayEmpty: true, error: emptyValueError && priorityEmpty, variant: "outlined", labelId: "prioritySelect-label", onChange: onPriorityChange, sx: Object.assign(Object.assign({}, styles.select), { color: priorityEmpty ? (_f = (_e = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _e === void 0 ? void 0 : _e.text) === null || _f === void 0 ? void 0 : _f.placeholder : (_h = (_g = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _g === void 0 ? void 0 : _g.text) === null || _h === void 0 ? void 0 : _h.dark }), value: priority }, { children: [_jsx(MenuItem, Object.assign({ disabled: true, value: "" }, { children: translate('select') })), priorities.map((priority) => (_jsx(MenuItem, Object.assign({ sx: [styles.menuItem, styles.hoveredElement, styles.focusedElement], value: priority.name }, { children: priority.translatedName }), priority.name)))] })), _jsx(Typography, Object.assign({ sx: Object.assign(Object.assign({}, styles.emptySelectionText), { visibility: emptyValueError && priorityEmpty ? 'visible' : 'hidden' }) }, { children: translate('pleaseMakeASelection') })), _jsx(InputLabel, Object.assign({ id: "comment-label", sx: styles.inputLabel, required: true }, { children: translate('comment') })), _jsxs(Box, Object.assign({ sx: styles.textAreaContainer }, { children: [_jsx("textarea", { id: "issueComments", "aria-labelledby": "comment-label", onChange: onCommentChange, style: getCommentTextAreaStyle(), onFocus: () => setIsCommentsFocused(true), onBlur: () => setIsCommentsFocused(false), rows: 12, value: comment }), _jsx(Typography, Object.assign({ sx: Object.assign(Object.assign({}, styles.emptySelectionText), { visibility: emptyValueError && commentEmpty ? 'visible' : 'hidden' }) }, { children: translate('pleaseEnterAComment') })), _jsxs(Box, Object.assign({ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }, { children: [_jsx(FormControlLabel, { id: 'eventLog', control: _jsx(Checkbox, { checked: appendEventLog, onChange: (e) => (setAppendEventLog(e.target.checked)), sx: styles.checkBox, disableRipple: true }), label: translate('includeEventLog'), labelPlacement: 'end' }), _jsx(CcfButton, Object.assign({ disabled: isSendDisabled, variant: "contained", onClick: onSendClick, primary: true, sx: Object.assign(Object.assign({}, styles.sendButton), styles.focusedElement), disableRipple: true }, { children: translate('send') }))] }))] }))] })));
}
export default CcfReportIssue;
//# sourceMappingURL=ccf-report-issue.js.map