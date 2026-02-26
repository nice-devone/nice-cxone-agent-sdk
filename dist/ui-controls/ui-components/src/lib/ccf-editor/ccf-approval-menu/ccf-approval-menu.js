import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React, { useState, useEffect, memo } from 'react';
import { Button, Menu, MenuItem, useTheme, ListSubheader, InputAdornment, Typography, ButtonGroup, Divider, } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { CcfDeboucedInput, CcfNoResultFoundIcon, CcfTooltip, useTranslator } from '@nice-devone/ui-controls';
import CcfApprovalMenuStyles from './ccf-approval-menu-styles';
import { useDispatch, useSelector } from 'react-redux';
import { CcfContactEditorAction, draftContactMessage, sendMessageReply, getContactSelectedSkill, getIsTextAddedInEditor } from '../ccf-contact-editor.slice';
import { useThrottleClick } from '../../../hooks/useThrottleClick';
import { isCopilotEnabledForContact, CcfCopilotActions, getNbrObjectDetails } from '../../ccf-agent-copilot/ccf-agent-copilot-container.slice';
import { getNonIncomingActiveContactInSelectedInteraction, getSelectedMsg } from '../../ccf-assignment-panel/ccf-assignment-panel.slice';
import { updateSentQReply } from '../../ccf-app-space/ccf-app-space.slice';
export const SEND_MESSAGE = 'Send Message';
/**
 * Component displays Request Approval Menu
 * @returns Approval Menu options
 * ```
 * @example
 * <CcfApprovalMenu/>
 * ```
 */
export const CcfApprovalMenu = (props) => {
    var _a, _b, _c, _d, _e;
    const { disableButton, routingQueues, caseId, canReply, canCreateDraft, isEditorEmpty, uploadedAttachments, clearEditor, insertedNbrId, toggleSparkleIcon, setLocalEditorState, disableApprovalDropDown, newEmailRevampEnabled = false, } = props;
    const TIMER_DELAY = 500;
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [searchText, setSearchText] = useState('');
    const [searchedList, setSearchedList] = useState([]);
    const [translate] = useTranslator();
    const dispatch = useDispatch();
    const selectedSkill = useSelector(getContactSelectedSkill(caseId));
    const initialSelectedSkill = canReply ? { id: 'sendMessage', name: SEND_MESSAGE } : { id: '', name: '' };
    const { copilotEnabled } = useSelector(isCopilotEnabledForContact);
    const copilotNBRObjectId = useSelector(getNbrObjectDetails(caseId || '', copilotEnabled));
    const activeContactInSelectedInteraction = useSelector(getNonIncomingActiveContactInSelectedInteraction);
    const isTextAddedInEditor = useSelector(getIsTextAddedInEditor(caseId));
    const isRequestApprovalDisabled = selectedSkill.name !== SEND_MESSAGE && !isTextAddedInEditor; // If text is not added in editor then will not disable Request Approval Button
    const selectedReplyMsg = useSelector(getSelectedMsg(caseId));
    useEffect(() => {
        //This will clear the entered search text on clearing text in the editor and on clearing drafted reply
        if (isEditorEmpty && !uploadedAttachments) {
            setSearchText('');
            dispatch(CcfContactEditorAction.setContactSelectedSkill({ caseId, selectedSkill: initialSelectedSkill }));
        }
    }, [isEditorEmpty, uploadedAttachments]);
    useEffect(() => {
        if (!searchText) {
            setSearchedList([]);
        }
        else {
            const filteredList = routingQueues === null || routingQueues === void 0 ? void 0 : routingQueues.filter((queue) => (queue === null || queue === void 0 ? void 0 : queue.name.toLowerCase().indexOf(searchText.toLowerCase())) > -1);
            setSearchedList(filteredList);
        }
    }, [searchText]);
    const theme = useTheme();
    const styles = CcfApprovalMenuStyles(theme, selectedSkill === null || selectedSkill === void 0 ? void 0 : selectedSkill.name);
    /**
     * Function to open popover menu
     * @param event - any
     * @example handleApprovalMenuOpen(event)
     */
    const handleApprovalMenuOpen = (event) => {
        event === null || event === void 0 ? void 0 : event.stopPropagation();
        setAnchorEl(event.currentTarget);
    };
    /**
     * Function to close popover menu
     * @example handleApprovalMenuClose()
     */
    const handleApprovalMenuClose = () => {
        setAnchorEl(null);
    };
    /**
     * Function to select approval queue
     * @example handleQueueSelect()
     */
    const handleQueueSelect = (queue) => {
        var _a;
        dispatch(CcfContactEditorAction.setContactSelectedSkill({ caseId, selectedSkill: { id: queue.id, name: queue.name, skillId: (_a = queue.skillId) !== null && _a !== void 0 ? _a : undefined } }));
        setAnchorEl(null);
    };
    /**
     * Function that returns list items
     * @example menuList()
     */
    const menuList = (options) => {
        return options === null || options === void 0 ? void 0 : options.map((queue) => (_jsx(MenuItem, Object.assign({ onClick: (event) => { handleQueueSelect(queue); event.stopPropagation(); }, disableRipple: true, selected: (queue === null || queue === void 0 ? void 0 : queue.name) === (selectedSkill === null || selectedSkill === void 0 ? void 0 : selectedSkill.name), dense: true }, { children: _jsx(CcfTooltip, Object.assign({ title: queue.name, arrow: true }, { children: _jsx(Typography, Object.assign({ noWrap: true, variant: "inherit" }, { children: queue.name })) })) }), queue.id)));
    };
    let renderRoutingQueueList;
    if (searchedList.length > 0) {
        renderRoutingQueueList = menuList(searchedList);
    }
    else {
        renderRoutingQueueList = !searchText && routingQueues.length > 0
            ? menuList(routingQueues)
            : _jsx(CcfNoResultFoundIcon, { sx: Object.assign({}, styles.noResultsMessage) });
    }
    /**
     * Function to send message or create draft
     * @example handleUserReply()
     */
    const handleUserReply = useThrottleClick(() => {
        //dispatch action to check if the message is selected for reply and add to object
        const replyObject = {
            caseId: caseId,
            elevatedInteractionId: activeContactInSelectedInteraction === null || activeContactInSelectedInteraction === void 0 ? void 0 : activeContactInSelectedInteraction.interactionId,
            elevatedFrom: activeContactInSelectedInteraction === null || activeContactInSelectedInteraction === void 0 ? void 0 : activeContactInSelectedInteraction.elevatedFrom,
        };
        setLocalEditorState && setLocalEditorState();
        dispatch(CcfContactEditorAction.updateSendButtonEnabled({ caseId, isSendButtonEnabled: false })); // disable send button so that multiple click should be avoided
        dispatch(CcfContactEditorAction.setEditorDiscardDisabled({ caseId, isDiscardDisabled: true }));
        caseId && dispatch(CcfCopilotActions.updateSentBestResponse({ response: '', caseId }));
        dispatch(updateSentQReply(''));
        if (selectedSkill.name !== SEND_MESSAGE) {
            dispatch(draftContactMessage({ caseId, selectedSkill: selectedSkill }));
        }
        else {
            dispatch(sendMessageReply(replyObject));
        }
        clearEditor && clearEditor();
        copilotEnabled && (insertedNbrId === copilotNBRObjectId) && dispatch(CcfCopilotActions.removeNextBestResponse(caseId)) && (toggleSparkleIcon === null || toggleSparkleIcon === void 0 ? void 0 : toggleSparkleIcon());
    }, TIMER_DELAY);
    const isReplyToSpecificMessage = !!(((_a = Object.keys(selectedReplyMsg)) === null || _a === void 0 ? void 0 : _a.length) > 0 && (selectedReplyMsg === null || selectedReplyMsg === void 0 ? void 0 : selectedReplyMsg.idOnExternalPlatform)); // check if the reply to specific message is selected
    const isApprovalDisabled = disableButton || isRequestApprovalDisabled || isReplyToSpecificMessage || disableApprovalDropDown; // disable approval button if the editor is empty or the reply to specific message is selected. Added aditional OR condition disableApprovalDropDown to disable dropdown for SMS channel when no inbound sms present in contact.
    const isSendMessageOrReply = selectedSkill.name === SEND_MESSAGE || isReplyToSpecificMessage;
    useEffect(() => {
        if (isReplyToSpecificMessage) {
            dispatch(CcfContactEditorAction.setContactSelectedSkill({ caseId, selectedSkill: initialSelectedSkill }));
        }
    }, [isReplyToSpecificMessage]);
    return (_jsxs(React.Fragment, { children: [_jsxs(ButtonGroup, Object.assign({ variant: "contained", sx: newEmailRevampEnabled ? Object.assign({}, styles.revampButtonGroup) : Object.assign({}, styles.approvalBtnGroup) }, { children: [_jsx(CcfTooltip, Object.assign({ title: isSendMessageOrReply ? translate('sendMessage') : selectedSkill.name, arrow: true }, { children: _jsx(Button, Object.assign({ sx: Object.assign(Object.assign({}, styles.sendRequestBtn), styles.focusedElement), size: "small", disabled: canReply ? disableButton || isRequestApprovalDisabled : disableButton || !selectedSkill.name, onClick: (event) => { handleUserReply(); event.stopPropagation(); }, "data-testid": "send-message-button", disableRipple: true, "aria-label": isSendMessageOrReply ? translate('sendMessage') : translate('requestApproval') }, { children: isSendMessageOrReply ? translate('sendMessage') : translate('requestApproval') })) })), canCreateDraft && (_jsx(CcfTooltip, Object.assign({ title: isReplyToSpecificMessage ? translate('approvalReplyToSpecificMessage') : '', arrow: true }, { children: _jsx("span", Object.assign({ style: Object.assign(Object.assign({}, styles.requestApprovalBtnContainer), { borderColor: isApprovalDisabled ? (_c = (_b = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _b === void 0 ? void 0 : _b.text) === null || _c === void 0 ? void 0 : _c.grey : (_e = (_d = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _d === void 0 ? void 0 : _d.primary) === null || _e === void 0 ? void 0 : _e.dark }) }, { children: _jsx(Button, Object.assign({ size: "small", sx: Object.assign(Object.assign({}, styles.requestApprovalBtn), styles.focusedElement), id: "routing-queue-menu-button", "data-testid": "routing-queue-menu-button", "aria-controls": open ? 'routing-queue-menu' : undefined, "aria-haspopup": "true", "aria-expanded": open ? 'true' : undefined, disableElevation: true, onClick: handleApprovalMenuOpen, disabled: isApprovalDisabled, disableRipple: true, "aria-label": translate('selectRoutingQueue') }, { children: _jsx(KeyboardArrowDownIcon, {}) })) })) })))] })), open && _jsxs(Menu, Object.assign({ id: "routing-queue-menu", MenuListProps: {
                    'aria-labelledby': 'routing-queue-menu-button',
                }, elevation: 0, disablePortal: true, anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                }, transformOrigin: {
                    vertical: 'bottom',
                    horizontal: 'right',
                }, sx: Object.assign({}, styles.menu), anchorEl: anchorEl, open: open, keepMounted: true, onClose: handleApprovalMenuClose, disableAutoFocusItem: true }, { children: [renderRoutingQueueList, _jsxs(ListSubheader, { children: [canReply && (_jsxs(_Fragment, { children: [_jsx(Divider, { variant: "fullWidth", sx: Object.assign({}, styles.queueDivider) }), _jsx(MenuItem, Object.assign({ disableRipple: true, selected: selectedSkill.name === SEND_MESSAGE, "aria-selected": selectedSkill.name === SEND_MESSAGE, dense: true, sx: Object.assign({}, styles.sendMessageText), onClick: () => handleQueueSelect({ id: 'sendMessage', name: SEND_MESSAGE }), "aria-label": translate('sendMessage') }, { children: translate('sendMessage') }), "send message")] })), _jsx(CcfDeboucedInput, { size: "small", fullWidth: true, placeholder: translate('search'), InputProps: {
                                    endAdornment: (_jsx(InputAdornment, Object.assign({ position: "start", sx: Object.assign({}, styles.searchIcon) }, { children: _jsx(SearchIcon, { fontSize: "small" }) }))),
                                }, onChange: (event) => setSearchText(event.target.value), onKeyDown: (e) => {
                                    e.key !== 'Escape' && e.stopPropagation();
                                }, onClick: (event) => event.stopPropagation(), delay: 500, value: searchText })] })] }))] }));
};
export default memo(CcfApprovalMenu);
//# sourceMappingURL=ccf-approval-menu.js.map