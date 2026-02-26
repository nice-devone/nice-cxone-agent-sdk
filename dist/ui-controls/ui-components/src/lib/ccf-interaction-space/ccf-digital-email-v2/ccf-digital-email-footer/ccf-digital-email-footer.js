import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef } from 'react';
import { Box, IconButton, useMediaQuery, useTheme } from '@mui/material';
import { CcfAddNoteIcon, CcfButton, CcfIconButton, CcfTooltip, CcfTypography, useTranslator, } from '@nice-devone/ui-controls';
import { EMAIL_ACTIONS, iconList } from '../../../ccf-icon/ccf-icon-list';
import CcfDigitalEmailV2FooterStyles from './ccf-digital-email-footer.style';
import { useDispatch, useSelector } from 'react-redux';
import { getIntegratedAgent } from '../../../global.app.slice';
import { CcfAssignmentAction, getAllInteractions, getDigitalReplyChannelsByCaseId, getIsEmailForward, } from '../../../ccf-assignment-panel/ccf-assignment-panel.slice';
import { getEmptyEditorState } from '../../../ccf-editor/ccf-contact-editor.slice';
import { handleActionItemClick } from '../ccf-digital-email-utils';
/**
 * CcfDigitalEmailFooter component display footer with reply, reply all forward and action notes buttons
 *
 * @param  props - The sender's details including full name, email, and date.
 * @returns  The rendered email header component.
 * @example
 * ```
 * <CcfDigitalEmailFooter message={message} digitalContactDetails={digitalContactDetails} updateDisplayFooter= {() => void}/>
 * ```
 */
export const CcfDigitalEmailFooter = (props) => {
    var _a, _b, _c, _d, _e;
    const { message, digitalContactDetails } = props;
    const theme = useTheme();
    const dispatch = useDispatch();
    const [translate] = useTranslator();
    const caseId = (_a = digitalContactDetails === null || digitalContactDetails === void 0 ? void 0 : digitalContactDetails.case) === null || _a === void 0 ? void 0 : _a.id;
    const interactionId = (_b = digitalContactDetails === null || digitalContactDetails === void 0 ? void 0 : digitalContactDetails.case) === null || _b === void 0 ? void 0 : _b.interactionId;
    const sender = (_c = digitalContactDetails === null || digitalContactDetails === void 0 ? void 0 : digitalContactDetails.channel) === null || _c === void 0 ? void 0 : _c.idOnExternalPlatform;
    const isIntegratedAgent = useSelector(getIntegratedAgent);
    const isMobile = useMediaQuery(theme.breakpoints.down('md')) || isIntegratedAgent;
    const themeStyles = CcfDigitalEmailV2FooterStyles(theme, isMobile);
    const fromAddressList = useSelector(getDigitalReplyChannelsByCaseId(caseId, interactionId));
    const emptyEditorState = getEmptyEditorState();
    const allInteractions = useSelector(getAllInteractions);
    const contact = interactionId && caseId ? (_d = allInteractions[interactionId]) === null || _d === void 0 ? void 0 : _d.digitalContacts[caseId] : undefined;
    const isOutbound = contact === null || contact === void 0 ? void 0 : contact.isOutbound;
    const isEmailForwardSelected = useRef(useSelector(getIsEmailForward((_e = digitalContactDetails === null || digitalContactDetails === void 0 ? void 0 : digitalContactDetails.case) === null || _e === void 0 ? void 0 : _e.id)) || false);
    /**
     * Method to handle the action item click event.
     * @param action - The action to be performed.
     * @param message - The message object containing the details of the email.
     * @returns void
     * @example  -
     * ```
     * onActionItemClick('reply', message);
     * ```
     */
    const onActionItemClick = (action) => () => {
        const titlePrefixRegex = new RegExp(`^(${translate('fwd')}|${translate('re')}):`, 'i');
        handleActionItemClick({
            action,
            message,
            caseId,
            interactionId: interactionId || '',
            fromAddressList,
            sender,
            isEmailForwardSelected,
            emptyEditorState,
            titlePrefixRegex,
            isOutbound,
            replyPrefixTranslated: translate('re'),
            updateDisplayFooter: props.updateDisplayFooter,
            dispatch,
        });
    };
    /**
     * Rrturn action button for email footer.
     * @param action - forward, reply, reply all
     * @param isMobile - boolean to check if the view is mobile
     * @returns - action button
     * @example -
     * ```
     * getActionButton('reply', false);
     * ```
     */
    const getActionButton = (action, isMobile) => {
        let button;
        if (action === EMAIL_ACTIONS.REPLY) {
            button = (_jsxs(CcfButton, Object.assign({ onClick: onActionItemClick(EMAIL_ACTIONS.REPLY), sx: Object.assign(Object.assign(Object.assign({}, themeStyles.actionBtn), themeStyles.replyActionBtn), themeStyles.replyActionBtnText), "aria-label": translate('reply'), disableRipple: true, "data-testid": "reply-btn" }, { children: [iconList[EMAIL_ACTIONS.REPLY]('', { sx: themeStyles.btnIcon }), _jsx(CcfTypography, Object.assign({ sx: themeStyles.btnText }, { children: translate('reply') }))] })));
        }
        else if (action === EMAIL_ACTIONS.REPLY_ALL || action === EMAIL_ACTIONS.FORWARD) {
            button = isMobile ? (_jsx(CcfTooltip, Object.assign({ title: translate(action === EMAIL_ACTIONS.FORWARD ? 'forward' : 'replyAll'), arrow: true }, { children: _jsx(IconButton, Object.assign({ "data-testid": action === EMAIL_ACTIONS.FORWARD ? 'forward-icon-btn' : 'replyAll-icon-btn', "aria-label": translate(action === EMAIL_ACTIONS.FORWARD ? 'forward' : 'replyAll'), onClick: onActionItemClick(action) }, { children: iconList[action]('', { sx: Object.assign({}, themeStyles.actionIconBtn) }) })) }))) : (_jsxs(CcfButton, Object.assign({ "data-testid": action === EMAIL_ACTIONS.FORWARD ? 'forward-btn' : 'replyAll-btn', onClick: onActionItemClick(action), "aria-label": translate(action === EMAIL_ACTIONS.FORWARD ? 'forward' : 'replyAll'), sx: Object.assign(Object.assign({}, themeStyles.actionBtn), themeStyles.actionBtnText), disableRipple: true }, { children: [iconList[action === EMAIL_ACTIONS.FORWARD ? EMAIL_ACTIONS.FORWARD : EMAIL_ACTIONS.REPLY_ALL]('', {
                        sx: themeStyles.btnIcon,
                    }), _jsx(CcfTypography, Object.assign({ sx: themeStyles.btnText }, { children: translate(action === EMAIL_ACTIONS.FORWARD ? 'forward' : 'replyAll') }))] })));
        }
        return button;
    };
    /**
     * method to handle button click event to add message note
     * @example onMessageNoteClick ();
     */
    const onMessageNoteClick = () => {
        dispatch(CcfAssignmentAction.updateContactMessageNoteStatus({
            caseId: caseId,
            interactionId: interactionId,
            isNoteOpen: true,
            noteId: '',
        }));
    };
    return (_jsxs(Box, Object.assign({ sx: themeStyles.footerContainer, "aria-label": 'footer', role: "group", tabIndex: 0 }, { children: [_jsx(Box, { children: _jsx(CcfTooltip, Object.assign({ title: translate('addNotes') }, { children: _jsx(Box, { children: _jsx(CcfIconButton, Object.assign({ "data-testid": "addNotes-btn", onClick: onMessageNoteClick, "aria-label": translate('addNotes') }, { children: _jsx(CcfAddNoteIcon, { sx: themeStyles.addNoteBtn }) })) }) })) }), _jsxs(Box, Object.assign({ sx: themeStyles.rightContainer }, { children: [getActionButton(EMAIL_ACTIONS.FORWARD, isMobile), getActionButton(EMAIL_ACTIONS.REPLY_ALL, isMobile), getActionButton(EMAIL_ACTIONS.REPLY, isMobile)] }))] })));
};
export default CcfDigitalEmailFooter;
//# sourceMappingURL=ccf-digital-email-footer.js.map