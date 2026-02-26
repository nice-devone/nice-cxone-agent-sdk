import { __awaiter } from "tslib";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { useTheme, Button, Popover, Box, IconButton, List, ListItem, Typography, InputAdornment, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { CcfSparklesIcon, CcfTooltip, CcfTypography, useTranslator, CcfSearchIcon } from '@nice-devone/ui-controls';
import CcfAgentCopilotTaskAssistStyles from './ccf-agent-copilot-task-assist.styles';
import { CXoneClient } from '@nice-devone/agent-sdk';
import { DigitalChannelStatus, TASK_ASSIST_STATUS } from '@nice-devone/common-sdk';
import { useDispatch, useSelector } from 'react-redux';
import { getNonIncomingActiveContactInSelectedInteraction } from '../../ccf-assignment-panel/ccf-assignment-panel.slice';
import { executeTaskAssist, getTaskAssistFormSchema } from '../ccf-agent-copilot-middleware';
import { getIsTaskAssistRequestStatus, CcfCopilotActions } from '../ccf-agent-copilot-container.slice';
import { LocalStorageHelper, StorageKeys } from '@nice-devone/core-sdk';
import { uuid } from 'uuidv4';
/**
 * Component displays copilot task assistance.
 * @param contactId - contact Id.
 * @param width- width for style
 * @param popoverAnchor - The anchor element for the popover.
 * @param setPopoverAnchor - Function to set the popover anchor element.
 * @param handleClosePopover - Function to close the popover.
 * @example
 * ```
 * <CcfAgentCopilotTaskAssist
 *   contactId="1231"
 *   width={300}
 *   popoverAnchor={popoverAnchor}
 *   setPopoverAnchor={setPopoverAnchor}
 *   handleClosePopover={handleClosePopover}
 * ```
 */
export const CcfAgentCopilotTaskAssist = ({ contactId, width, popoverAnchor, setPopoverAnchor, handleClosePopover, }) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
    const theme = useTheme();
    const styles = CcfAgentCopilotTaskAssistStyles(theme);
    const dispatch = useDispatch();
    const [translate] = useTranslator();
    const isPopoverOpen = Boolean(popoverAnchor);
    const cxoneClientInstance = CXoneClient.instance;
    const { getAgentAssistConfig } = cxoneClientInstance.copilotService;
    const aahConfiguration = getAgentAssistConfig && getAgentAssistConfig(`${contactId}`, true);
    const intentConfig = (_c = (_b = (_a = aahConfiguration === null || aahConfiguration === void 0 ? void 0 : aahConfiguration.Params) === null || _a === void 0 ? void 0 : _a.taskAssistConfig) === null || _b === void 0 ? void 0 : _b.intentConfig) !== null && _c !== void 0 ? _c : [];
    const [searchTerm, setSearchTerm] = useState('');
    const activeContact = useSelector(getNonIncomingActiveContactInSelectedInteraction);
    const currentRequestStatus = useSelector(getIsTaskAssistRequestStatus(contactId || ''));
    // If no valid task assist config or intent config array with data, return null
    if (!Array.isArray(intentConfig) || intentConfig.length === 0) {
        return null;
    }
    /**
     * Handles the event when the user clicks the task assistant button.
     * This function sets the clicked button as the anchor for the popover.
     *
     * @param event - Mouse event triggered when the button is clicked.
     * @example
     * ```
     * <Button onClick={handleOpenPopover}>Open Popover</Button>
     * ```
     */
    const handleOpenPopover = (event) => {
        setPopoverAnchor(event.currentTarget);
    };
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const filteredTasks = Array.isArray(intentConfig) &&
        intentConfig.filter((task) => {
            var _a, _b, _c, _d;
            return ((_b = (_a = task.displayName) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === null || _b === void 0 ? void 0 : _b.includes(lowerCaseSearchTerm)) ||
                ((_d = (_c = task.intentDescription) === null || _c === void 0 ? void 0 : _c.toLowerCase()) === null || _d === void 0 ? void 0 : _d.includes(lowerCaseSearchTerm));
        });
    /**
     * Function to Submits selected intent for Task Assist.
     *
     * @param intentConfig - Selected intent configuration.
     *
     * @example
     * onSubmit(intentConfig);
     */
    const onSubmit = (intentConfig) => __awaiter(void 0, void 0, void 0, function* () {
        if ((activeContact === null || activeContact === void 0 ? void 0 : activeContact.contactStatus) === DigitalChannelStatus.CLOSED) {
            return;
        }
        setPopoverAnchor(null);
        const taskAssistObjectId = uuid();
        if (intentConfig === null || intentConfig === void 0 ? void 0 : intentConfig.formCapture) {
            const allAdaptiveCardSchemas = JSON.parse(LocalStorageHelper.getItem(StorageKeys.AGENT_COPILOT_ADAPTIVE_CARD_SCHEMAS) || '{}');
            if (!allAdaptiveCardSchemas[intentConfig.intentName]) {
                yield dispatch(getTaskAssistFormSchema({ intentName: intentConfig.intentName, contactId }));
            }
            let preFilledData = { objectId: taskAssistObjectId, intentName: '', data: {}, status: '' };
            try {
                const preFilledDataRaw = yield cxoneClientInstance.copilotService.getTaskAssistFormPreFilledData(intentConfig, contactId, taskAssistObjectId);
                preFilledData = typeof preFilledDataRaw === 'string' ? JSON.parse(preFilledDataRaw) : preFilledDataRaw;
            }
            catch (error) {
                console.error('Error fetching pre-filled data:', error);
            }
            const { intentName, objectId, data } = preFilledData;
            const taskAssistFormData = {
                intentName: intentName || (intentConfig === null || intentConfig === void 0 ? void 0 : intentConfig.intentName) || '',
                formCapture: true,
                objectId: objectId || taskAssistObjectId,
                status: TASK_ASSIST_STATUS.LOADING,
                data: Object.assign({}, data),
            };
            dispatch(CcfCopilotActions.addTaskAssistFormCard({ contactId, taskAssistFormData: taskAssistFormData }));
        }
        else {
            dispatch(executeTaskAssist({ intentConfig, activeCaseId: contactId, taskSessionUid: taskAssistObjectId }));
        }
    });
    return (_jsxs(_Fragment, { children: [_jsx(CcfTooltip, Object.assign({ title: translate('taskAssist'), sx: { width: styles.button.width }, arrow: true }, { children: _jsx(Button, { variant: "text", startIcon: _jsx(CcfSparklesIcon, { htmlColor: currentRequestStatus === TASK_ASSIST_STATUS.LOADING
                            ? (_e = (_d = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _d === void 0 ? void 0 : _d.text) === null || _e === void 0 ? void 0 : _e.filter
                            : (_g = (_f = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _f === void 0 ? void 0 : _f.primary) === null || _g === void 0 ? void 0 : _g.main, sx: styles.sparklesIcon }), id: "task-assist-button", "data-testid": "task-assist-button", "aria-controls": "task-assist-menu", "aria-expanded": isPopoverOpen, "aria-label": translate('openTaskAssist'), onKeyDown: (e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            handleOpenPopover(e);
                        }
                    }, disabled: currentRequestStatus === TASK_ASSIST_STATUS.LOADING, onClick: (e) => {
                        e.stopPropagation();
                        isPopoverOpen ? handleClosePopover() : handleOpenPopover(e);
                    } }) })), _jsxs(Popover, Object.assign({ id: "task-assist-menu", "data-testid": "task-assist-menu", open: isPopoverOpen, anchorEl: popoverAnchor, onClose: (_event, reason) => {
                    if (reason === 'backdropClick')
                        return;
                    handleClosePopover();
                }, anchorOrigin: { vertical: 'bottom', horizontal: 'right' }, transformOrigin: { vertical: 'top', horizontal: 'right' }, PaperProps: {
                    onClick: (event) => event.stopPropagation(),
                    style: {
                        width: width - 41 + 'px',
                        boxShadow: 'none',
                        border: `1px solid ${(_j = (_h = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _h === void 0 ? void 0 : _h.border) === null || _j === void 0 ? void 0 : _j.lightGray}`,
                        borderRadius: '6px',
                    },
                }, sx: styles.popover }, { children: [_jsxs(Box, Object.assign({ sx: styles.header }, { children: [_jsxs(Box, Object.assign({ sx: styles.headerTitle }, { children: [_jsx(CcfSparklesIcon, { htmlColor: (_l = (_k = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _k === void 0 ? void 0 : _k.text) === null || _l === void 0 ? void 0 : _l.filter, sx: styles.sparklesIconHeader }), _jsx(CcfTypography, { sx: Object.assign({}, styles.headerText), translationKey: "taskAssist" })] })), _jsx(IconButton, Object.assign({ onClick: handleClosePopover }, { children: _jsx(CloseIcon, {}) }))] })), _jsx(Box, Object.assign({ sx: styles.searchBox }, { children: _jsx(TextField, { "data-testid": "search-icon", fullWidth: true, variant: "outlined", placeholder: translate('taskAssistSearchPlaceholder'), value: searchTerm, onChange: (e) => setSearchTerm(e.target.value), role: "searchbox", "aria-label": translate('taskAssistSearchPlaceholder'), InputProps: {
                                startAdornment: (_jsx(CcfTooltip, Object.assign({ title: translate('search'), arrow: true }, { children: _jsx(InputAdornment, Object.assign({ position: "start", sx: { paddingTop: '7px' } }, { children: _jsx(CcfSearchIcon, { fontSize: "medium", style: { transform: 'rotate(90deg)' }, "aria-hidden": "true" }) })) }))),
                            }, sx: {
                                '& .MuiOutlinedInput-input': {
                                    fontSize: (_o = (_m = theme === null || theme === void 0 ? void 0 : theme.typography) === null || _m === void 0 ? void 0 : _m.h5) === null || _o === void 0 ? void 0 : _o.fontSize,
                                    padding: 1.5,
                                    color: (_q = (_p = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _p === void 0 ? void 0 : _p.text) === null || _q === void 0 ? void 0 : _q.filter,
                                    paddingLeft: 0.5,
                                },
                            } }) })), _jsx(Box, Object.assign({ sx: styles.taskList }, { children: _jsx(List, { children: filteredTasks && filteredTasks.length > 0 && (filteredTasks.map((task) => !(task === null || task === void 0 ? void 0 : task.isDeleted) && (task === null || task === void 0 ? void 0 : task.isActive) && (_jsx(ListItem, Object.assign({ sx: styles.listItem, onClick: () => onSubmit(task) }, { children: _jsxs(Box, { children: [_jsx(Typography, Object.assign({ sx: styles.displayName }, { children: task.displayName })), _jsx(Typography, Object.assign({ sx: styles.intentDescription }, { children: task.intentDescription }))] }) }), task.intentName)))) }) }))] }))] }));
};
export default CcfAgentCopilotTaskAssist;
//# sourceMappingURL=ccf-agent-copilot-task-assist.js.map