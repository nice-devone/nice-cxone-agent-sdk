import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { CcfBox, CcfTypography, CcfTextField, CcfTooltip, useTranslator } from '@nice-devone/ui-controls';
import { memo, useRef, useState } from 'react';
import CcfContactEditorStyles from '../../../ccf-editor/ccf-contact-editor/ccf-contact-editor.styles';
import { RICH_TEXT_INPUT_STYLES } from '../../../ccf-editor/ccf-rich-text-editor/ccf-rich-text-editor.styles';
import { Box, useTheme, Button } from '@mui/material';
import CcfEmojiPicker from '../../../ccf-emoji-picker/ccf-emoji-picker';
import { FormatTextdirectionLToR, FormatTextdirectionRToL } from '@mui/icons-material';
import CcfDigitalSearchToggleButtonsStyle from './ccf-interaction-search-select-option/ccf-digital-search-toggle-buttons.styles';
import { getSelectedRowContacts, sendBulkReplyDigital, ccfDigitalSearchActions, getInteractionBulkReplyMessage, getBulkReplyTextAlignment } from '../ccf-digital-search.slice';
import { useDispatch, useSelector } from 'react-redux';
import { LocalStorageHelper, StorageKeys } from '@nice-devone/core-sdk';
/**
 * Component to show the text field with option to add emoji and align text for bulk interactions message.
 * @example
 * ```
 * <CcfInteractionReply />
 * ```
 */
export const CcfInteractionReply = (props) => {
    var _a;
    const theme = useTheme();
    const styles = CcfContactEditorStyles(theme, false);
    const tabStyles = CcfDigitalSearchToggleButtonsStyle(theme);
    const EmojiButtonRef = useRef(null);
    const textRef = useRef(null);
    const [translate] = useTranslator();
    const dispatch = useDispatch();
    const selections = useSelector(getSelectedRowContacts);
    const toastId = useRef('');
    const currentCxoneUser = LocalStorageHelper.getItem(StorageKeys.USER_INFO, true);
    const bulkReplyMessage = useSelector(getInteractionBulkReplyMessage);
    const bulkReplyTextAlignment = useSelector(getBulkReplyTextAlignment);
    const [textReply, setReplyValue] = useState(bulkReplyMessage || '');
    const [isleftAlign, setAlign] = useState(bulkReplyTextAlignment === 'left');
    const highlightDirection = bulkReplyTextAlignment === 'left' ? RICH_TEXT_INPUT_STYLES.LTR : RICH_TEXT_INPUT_STYLES.RTL;
    const [highlightDirectionBtn, setHighlightDirectionBtn] = useState(highlightDirection);
    /**
     * method to handle emoji selection
     * @param emojiData - details of the selected emoji
     * @example onEmojiSelect(emojiData);
     */
    const onEmojiSelect = (emojiData) => {
        const { native } = emojiData;
        updateTextReply(native);
    };
    /**
     * Method to handle text direction change
     * @param directionStyle - selected direction
     * @param alignmentStyle - alignment based on direction change
     * @example applyDirection('RTL', 'right');
     */
    const applyDirection = (directionStyle, alignmentStyle) => {
        const isleft = alignmentStyle === 'left';
        setAlign(isleft);
        setHighlightDirectionBtn(directionStyle);
        dispatch(ccfDigitalSearchActions.updateTextAlignment(alignmentStyle));
    };
    /**
     * method to handle link selection
     * @example onTextReplyChange();
     */
    const onTextReplyChange = (e) => setReplyValue(e.target.value);
    /**
     * method to handle explicit addition in bulk reply text field
     * @example onTextReplyChange();
     */
    const updateTextReply = (selectedEmoji) => {
        var _a, _b, _c;
        const cursorPosition = (_a = textRef === null || textRef === void 0 ? void 0 : textRef.current) === null || _a === void 0 ? void 0 : _a.selectionStart;
        if (cursorPosition !== null && cursorPosition !== undefined) {
            const textBeforeCursorPosition = (_b = textRef === null || textRef === void 0 ? void 0 : textRef.current) === null || _b === void 0 ? void 0 : _b.value.substring(0, cursorPosition);
            const textAfterCursorPosition = (_c = textRef === null || textRef === void 0 ? void 0 : textRef.current) === null || _c === void 0 ? void 0 : _c.value.substring(cursorPosition, textReply.length);
            const updatedTextBoxContent = textBeforeCursorPosition + selectedEmoji + textAfterCursorPosition;
            setReplyValue(updatedTextBoxContent);
            dispatch(ccfDigitalSearchActions.updateBulkReply(updatedTextBoxContent));
        }
    };
    /**
     * method to handle keydown event on emoji button
     * @example handleKeyDown();
     */
    const handleKeyDown = (e) => {
        var _a;
        if (e.key === 'Enter')
            (_a = EmojiButtonRef === null || EmojiButtonRef === void 0 ? void 0 : EmojiButtonRef.current) === null || _a === void 0 ? void 0 : _a.click();
    };
    /**
     * method to handle send button click
     * @example handleSendClick
     */
    const handleSendClick = () => {
        dispatch(sendBulkReplyDigital({
            selectedContactIds: selections,
            messageContent: textReply,
            cxoneUserId: currentCxoneUser.userId,
            toastId: toastId,
        }));
        dispatch(ccfDigitalSearchActions.updateBulkReply(''));
    };
    return (_jsxs(CcfBox, Object.assign({ sx: Object.assign({ width: props === null || props === void 0 ? void 0 : props.textFieldWidth }, tabStyles.interactionReplyBox) }, { children: [_jsx(CcfTextField, { id: "Bulk-text-input", size: "medium", fullWidth: true, sx: tabStyles.bulkReplyInput, value: textReply, onChange: onTextReplyChange, variant: "outlined", multiline: true, maxRows: 4, rows: 2, inputProps: { style: { textAlign: isleftAlign ? 'left' : 'right', fontSize: theme.typography.h5.fontSize }, 'data-testid': 'Bulk-text-input' }, onBlur: () => dispatch(ccfDigitalSearchActions.updateBulkReply(textReply)), inputRef: textRef }), _jsxs(CcfBox, Object.assign({ sx: tabStyles.interactionbuttonContainer }, { children: [_jsxs(CcfBox, Object.assign({ sx: tabStyles.interactionleftSideBox }, { children: [_jsx(Button, Object.assign({ id: 'emoji-button', sx: Object.assign(Object.assign({}, styles.btnContainer), { '&:hover': { backgroundColor: theme.palette.action.hover } }), size: 'small', onKeyDown: handleKeyDown }, { children: _jsx(CcfEmojiPicker, { onSelect: (emojiData) => onEmojiSelect(emojiData), ref: EmojiButtonRef }) })), _jsx(CcfTooltip, Object.assign({ title: translate('textDirectionltr') }, { children: _jsx(Button, Object.assign({ size: 'small', sx: Object.assign(Object.assign({}, tabStyles.alignButton), ((highlightDirectionBtn === RICH_TEXT_INPUT_STYLES.LTR) && tabStyles.alignButtonActive)), name: translate('textDirectionrtl'), onClick: () => applyDirection(RICH_TEXT_INPUT_STYLES.LTR, RICH_TEXT_INPUT_STYLES.LEFT_ALIGN) }, { children: _jsx(FormatTextdirectionLToR, {}) })) })), _jsx(CcfTooltip, Object.assign({ title: translate('textDirectionrtl') }, { children: _jsx(Button, Object.assign({ size: 'small', sx: Object.assign(Object.assign({}, tabStyles.alignButton), ((highlightDirectionBtn === RICH_TEXT_INPUT_STYLES.RTL) && tabStyles.alignButtonActive)), name: translate('textDirectionrtl'), onClick: () => applyDirection(RICH_TEXT_INPUT_STYLES.RTL, RICH_TEXT_INPUT_STYLES.RIGHT_ALIGN) }, { children: _jsx(FormatTextdirectionRToL, {}) })) }))] })), _jsx(CcfTooltip, Object.assign({ title: translate('send') }, { children: _jsx(CcfBox, Object.assign({ sx: Object.assign(Object.assign({}, styles.rightSideBox), { display: 'flex' }) }, { children: _jsx(Button, Object.assign({ variant: "contained", id: "interactionReplySendButton", onClick: handleSendClick, disabled: ((_a = textReply === null || textReply === void 0 ? void 0 : textReply.trim()) === null || _a === void 0 ? void 0 : _a.length) === 0 }, { children: translate('send') })) })) })), _jsxs(CcfTypography, Object.assign({ id: "interaction-text-caption" }, { children: [translate('bulkReplyText'), " ", _jsxs(Box, Object.assign({ fontWeight: 'bold', display: 'inline' }, { children: [" ", translate('closed')] })), " ", translate('lowerCaseInteractions'), "."] }))] }))] })));
};
export default memo(CcfInteractionReply);
//# sourceMappingURL=ccf-interaction-reply.js.map