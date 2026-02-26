import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useEffect, useRef, useState } from 'react';
import { $getSelection, FORMAT_TEXT_COMMAND, SELECTION_CHANGE_COMMAND, COMMAND_PRIORITY_CRITICAL, $isRangeSelection, $isRootOrShadowRoot, $isElementNode, CLICK_COMMAND, COMMAND_PRIORITY_LOW, KEY_MODIFIER_COMMAND, PASTE_COMMAND, KEY_ENTER_COMMAND, COMMAND_PRIORITY_HIGH } from 'lexical';
import { Button, useTheme } from '@mui/material';
import { $isAtNodeEnd } from '@lexical/selection';
import { $isLinkNode } from '@lexical/link';
import { $findMatchingParent } from '@lexical/utils';
import { useDispatch } from 'react-redux';
import CcfEditorToolbarPluginStyles, { RICH_TOOLBAR_BUTTONS } from '../../ccf-editor/ccf-editor-toolbar-plugin/ccf-editor-toolbar-plugin.style';
import { CcfContactEditorAction } from '../../ccf-editor/ccf-contact-editor.slice';
import { CcfAgentChatToolbar } from './ccf-agent-chat-toolbar';
import { useTranslator, CcfAttachmentButton, CcfTooltip } from '@nice-devone/ui-controls';
const KEY_NAMES = {
    ENTER: 'Enter',
    NUMPAD_ENTER: 'NumpadEnter',
    RIGHT_SHIFT: 'ShiftRight',
    LEFT_SHIFT: 'ShiftLeft',
    KEY_B: 'KeyB',
    KEY_I: 'KeyI',
    KEY_U: 'KeyU',
};
/**
 * Component for ccf Editor Toolbar Plugin
 * @returns toolbar plugin for editor
 * @example -
 * ```
 * <CcfAgentChatEditorToolbarPlugin/>
 * ```
 */
export function CcfAgentChatEditorToolbarPlugin({ showRichToolBarButtons, showFileUploadButton, onUploadAttachment, caseId }) {
    const theme = useTheme();
    const [translate] = useTranslator();
    const styles = CcfEditorToolbarPluginStyles(theme);
    const [highlightBoldBtn, setHighlightBoldBtn] = useState(false);
    const [highlightUnderlineBtn, setHighlightUnderLineBtn] = useState(false);
    const [highlightItalicBtn, setHighlightItalicBtn] = useState(false);
    const attachmentButtonRef = useRef(null);
    const [editor] = useLexicalComposerContext();
    const dispatch = useDispatch();
    useEffect(() => {
        editor.registerCommand(KEY_MODIFIER_COMMAND, (event) => {
            if (event.ctrlKey) {
                handleShortcutKeyBinding(event);
            }
            return false;
        }, COMMAND_PRIORITY_LOW);
    }, []);
    /**
     * Handles keyboard shortcuts to highlight toolbar icons.
     *  @param event - keyboardEvent
     * @example handleShortcutKeyBinding(event)
     */
    const handleShortcutKeyBinding = (event) => {
        switch (event.code) {
            case KEY_NAMES.KEY_B:
                setHighlightBoldBtn(bold => !bold);
                break;
            case KEY_NAMES.KEY_I:
                setHighlightItalicBtn(italic => !italic);
                break;
            case KEY_NAMES.KEY_U:
                setHighlightUnderLineBtn(underline => !underline);
                break;
            default:
                break;
        }
    };
    /**
     * Method to get selected node
     *  @param selection - selection
     *  @returns -  TextNode | Element node
     * @example getSelectedNode();
     */
    const getSelectedNode = (selection) => {
        const anchor = selection.anchor;
        const focus = selection.focus;
        const anchorNode = anchor.getNode();
        const focusNode = focus.getNode();
        if (anchorNode === focusNode) {
            return anchorNode;
        }
        const isBackward = selection.isBackward();
        if (isBackward) {
            return $isAtNodeEnd(focus) ? anchorNode : focusNode;
        }
        else {
            return $isAtNodeEnd(anchor) ? anchorNode : focusNode;
        }
    };
    /**
     * Method to make Text Input bold
     * @param e - SyntheticEvent<HTMLButtonElement>
     * @example onBoldClick(e);
     */
    const onBoldClick = (e) => {
        e.preventDefault();
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, RICH_TOOLBAR_BUTTONS.BOLD);
        setHighlightBoldBtn(!highlightBoldBtn);
    };
    /**
     * Method to make Text Input Italic
     * @param e - SyntheticEvent<HTMLButtonElement>
     * @example onItalicClick(e);
     */
    const onItalicClick = (e) => {
        e.preventDefault();
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, RICH_TOOLBAR_BUTTONS.ITALIC);
        setHighlightItalicBtn(!highlightItalicBtn);
    };
    /**
     * Method to make Text Input Underline
     * @param e - SyntheticEvent<HTMLButtonElement>
     * @example onUnderLineClick(e);
     */
    const onUnderLineClick = (e) => {
        e.preventDefault();
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, RICH_TOOLBAR_BUTTONS.UNDERLINE);
        setHighlightUnderLineBtn(!highlightUnderlineBtn);
    };
    /**
   * Method to update the toolbar
   * @example updateToolbar();
   */
    const updateToolbar = () => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
            // Persist the state of bold, italic, underline button
            setHighlightBoldBtn(selection.hasFormat(RICH_TOOLBAR_BUTTONS.BOLD));
            setHighlightItalicBtn(selection.hasFormat(RICH_TOOLBAR_BUTTONS.ITALIC));
            setHighlightUnderLineBtn(selection.hasFormat(RICH_TOOLBAR_BUTTONS.UNDERLINE));
            const anchorNode = selection.anchor.getNode();
            let element = anchorNode.getKey() === 'root' ? anchorNode : $findMatchingParent(anchorNode, (e) => {
                const parent = e.getParent();
                return parent !== null && $isRootOrShadowRoot(parent);
            });
            if (element === null)
                element = anchorNode.getTopLevelElementOrThrow();
            const node = getSelectedNode(selection);
            const parent = node.getParent();
            let matchingParent;
            if ($isLinkNode(parent)) {
                // If node is a link, we need to fetch the parent paragraph node to set format
                matchingParent = $findMatchingParent(node, (parentNode) => $isElementNode(parentNode) && !parentNode.isInline());
            }
        }
    };
    /**
     * Used to handle the change event of attachment button input
     * @param e - event
     * @example -
     * ```
     * handleOnChangeAttachment(e);
     * ```
     */
    const handleOnChangeAttachment = (e) => {
        var _a, _b;
        if ((_a = e === null || e === void 0 ? void 0 : e.target) === null || _a === void 0 ? void 0 : _a.files) {
            onUploadAttachment && onUploadAttachment((_b = e === null || e === void 0 ? void 0 : e.target) === null || _b === void 0 ? void 0 : _b.files);
            e.target.value = ''; // to reset the file input state so that again after removing the attachment the same file input can be taken
            editor.focus();
            dispatch(CcfContactEditorAction.updateUploadDialogBox({ caseId, isUploadDialogEnabled: false }));
        }
    };
    /**
     * Used to handle the focus back to editor
     * @example -
     * ```
     *  window.addEventListener('focus', handleFocusBack);
     * ```
     */
    const handleFocusBack = () => {
        window.removeEventListener('focus', handleFocusBack);
        setTimeout(() => {
            dispatch(CcfContactEditorAction.updateUploadDialogBox({ caseId, isUploadDialogEnabled: false }));
        }, 1000);
    };
    /**
     * Method to capture the on cancel click event to hide the Drop zone.
     * @example onFileDialogCancel();
     */
    const onFileDialogCancel = () => {
        window.addEventListener('focus', handleFocusBack);
        dispatch(CcfContactEditorAction.updateUploadDialogBox({ caseId, isUploadDialogEnabled: true }));
    };
    useEffect(() => {
        editor.registerCommand(SELECTION_CHANGE_COMMAND, (_payload) => {
            updateToolbar();
            return false;
        }, COMMAND_PRIORITY_CRITICAL);
        editor.registerCommand(CLICK_COMMAND, (payload) => {
            const selection = $getSelection();
            if ($isRangeSelection(selection)) {
                const node = getSelectedNode(selection);
                const linkNode = $findMatchingParent(node, $isLinkNode);
                // if we press ctrl key and click on inserted link then it will open in new tab
                if ($isLinkNode(linkNode) && (payload.metaKey || payload.ctrlKey)) {
                    window.open(linkNode.getURL(), '_blank');
                    return true;
                }
            }
            return false;
        }, COMMAND_PRIORITY_LOW);
        editor.registerCommand(PASTE_COMMAND, (event) => {
            var _a;
            // get the clipboard data and check if it is copied from excel
            const htmlData = (_a = event === null || event === void 0 ? void 0 : event.clipboardData) === null || _a === void 0 ? void 0 : _a.getData('text/html');
            if (htmlData) {
                const excelSheetTag = '<meta name=ProgId content=Excel.Sheet>';
                const googleSheetTag = 'google-sheets-html-origin';
                if (htmlData.includes(excelSheetTag) || htmlData.includes(googleSheetTag)) {
                    dispatch(CcfContactEditorAction.updateIsCopiedFromExcel({ caseId, isCopiedFromExcel: true }));
                }
                else {
                    dispatch(CcfContactEditorAction.updateIsCopiedFromExcel({ caseId, isCopiedFromExcel: false }));
                }
            }
            return false;
        }, COMMAND_PRIORITY_LOW);
        editor.registerCommand(KEY_ENTER_COMMAND, () => {
            // Persist alignment and direction on enter key press
            // By default lexical editor not support this functionality so need to handle it manually.
            setTimeout(() => {
                editor.focus();
            });
            return false;
        }, COMMAND_PRIORITY_HIGH);
    }, [editor]);
    return _jsxs(_Fragment, { children: [showFileUploadButton &&
                _jsx(CcfTooltip, Object.assign({ title: translate('addAttachment'), slotProps: {
                        tooltip: {
                            sx: {
                                backgroundColor: '#757575',
                                color: 'white',
                                fontSize: '12px',
                            },
                        },
                    } }, { children: _jsx(Button, Object.assign({ "aria-label": translate('addAttachment'), role: "button", sx: (!showRichToolBarButtons) ? [styles.btnContainer, styles === null || styles === void 0 ? void 0 : styles.focussedElement] : Object.assign(Object.assign({}, styles.revampButtonContainer), { marginTop: '9px', borderRadius: '50% !important', padding: '6px', '&:focus-visible': {
                                outline: 'none',
                                backgroundColor: '#c9d0d6',
                            }, '&:hover': {
                                backgroundColor: 'transparent',
                            } }), disableRipple: true, "data-testid": 'upload-btn', "aria-pressed": true, size: 'small', onClick: (event) => { var _a; (_a = attachmentButtonRef === null || attachmentButtonRef === void 0 ? void 0 : attachmentButtonRef.current) === null || _a === void 0 ? void 0 : _a.click(); event.stopPropagation(); } }, { children: _jsx(CcfAttachmentButton, Object.assign({ isEmailRevamp: true }, { onChange: handleOnChangeAttachment, onClick: onFileDialogCancel }, { ref: attachmentButtonRef })) })) })), showRichToolBarButtons ?
                _jsx(CcfAgentChatToolbar, { styles: styles, hightlightBtn: highlightBoldBtn, highlightUnderlineBtn: highlightUnderlineBtn, hightlightItalicBtn: highlightItalicBtn, onBoldClick: onBoldClick, onItalicClick: onItalicClick, onUnderLineClick: onUnderLineClick }) : null] });
}
export default CcfAgentChatEditorToolbarPlugin;
//# sourceMappingURL=ccf-agent-chat-editor-toolbar.js.map