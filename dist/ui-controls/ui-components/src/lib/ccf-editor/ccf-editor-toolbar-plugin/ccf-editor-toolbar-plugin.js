import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import CcfEditorToolbar from '../ccf-editor-toolbar/ccf-editor-toolbar';
import CcfEditorToolbarPluginStyles, { RICH_TOOLBAR_BUTTONS } from './ccf-editor-toolbar-plugin.style';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useCallback, useEffect, useRef, useState } from 'react';
import { $getSelection, FORMAT_ELEMENT_COMMAND, FORMAT_TEXT_COMMAND, SELECTION_CHANGE_COMMAND, COMMAND_PRIORITY_CRITICAL, $isRangeSelection, $isRootOrShadowRoot, $isElementNode, $isParagraphNode, CLICK_COMMAND, COMMAND_PRIORITY_LOW, $insertNodes, $createTextNode, KEY_MODIFIER_COMMAND, PASTE_COMMAND, $createParagraphNode, $getRoot, KEY_ENTER_COMMAND, COMMAND_PRIORITY_HIGH } from 'lexical';
import { INSERT_ORDERED_LIST_COMMAND, INSERT_UNORDERED_LIST_COMMAND, REMOVE_LIST_COMMAND, $isListNode, ListNode } from '@lexical/list';
import { Button, Typography, useTheme, Box, IconButton, TextField, Popper, ClickAwayListener } from '@mui/material';
import LinkOffIcon from '@mui/icons-material/LinkOff';
import { $patchStyleText, $isAtNodeEnd } from '@lexical/selection';
import { CcfAttachmentButton, CcfTextColorIcon, CcfTextField, CcfTooltip, HIGHLIGHT_COLOR_GROUP, colorData, useTranslator } from '@nice-devone/ui-controls';
import { CUSTOM_STYLE_MAP } from '../ccf-editor-utils';
import LinkIcon from '@mui/icons-material/Link';
import { FormatTextdirectionLToR, FormatTextdirectionRToL, TableChartOutlined } from '@mui/icons-material';
import CheckIcon from '@mui/icons-material/Check';
import { $isLinkNode, TOGGLE_LINK_COMMAND } from '@lexical/link';
import { $findMatchingParent, $getNearestNodeOfType } from '@lexical/utils';
import CcfEmojiPicker from '../../ccf-emoji-picker/ccf-emoji-picker';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import { INSERT_TABLE_COMMAND } from '@lexical/table';
import { CcfInsertInlineImageButton } from '../ccf-inline-image-plugin/ccf-inline-image-plugin';
import { useDispatch, useSelector } from 'react-redux';
import { CcfContactEditorAction } from '../ccf-contact-editor.slice';
import CcfCopilotMenu from '../ccf-copilot-components/ccf-copilot-menu';
import CcfVoiceRecorder from '../../ccf-voice-recorder/ccf-voice-recorder';
import { isAgentAssistConfigParamsEnabledForContact } from '../../ccf-agent-copilot/ccf-agent-copilot-container.slice';
import { AgentAssistConfigACPParamsKeys, EventKeys, WINDOW_EVENTS } from '@nice-devone/common-sdk';
import { LocalStorageHelper, StorageKeys } from '@nice-devone/core-sdk';
/**
 * Component for ccf Editor Toolbar Plugin
 * @returns toolbar plugin for editor
 * @example -
 * ```
 * <CcfEditorToolbarPlugin/>
 * ```
 */
export function CcfEditorToolbarPlugin({ showRichToolBarButtons, showFileUploadButton, onUploadAttachment, caseId, copilotEnabled, displayNewEmailButtons }) {
    const theme = useTheme();
    const [translate] = useTranslator();
    const appSpaceLocal = LocalStorageHelper.getItem(StorageKeys.APPSPACE_RATIO);
    const styles = CcfEditorToolbarPluginStyles(theme);
    const [highlightBoldBtn, setHighlightBoldBtn] = useState(false);
    const [highlightUnderlineBtn, setHighlightUnderLineBtn] = useState(false);
    const [highlightItalicBtn, setHighlightItalicBtn] = useState(false);
    const [highlightBulletedListBtn, setHighlightBulletListBtn] = useState(false);
    const [highlightNumberedListBtn, setHighlightNumberedListBtn] = useState(false);
    const [highlightAlignBtn, setHighlightAlignBtn] = useState(RICH_TOOLBAR_BUTTONS.LEFT_ALIGN);
    const [highlightDirectionBtn, setHighlightDirectionBtn] = useState(RICH_TOOLBAR_BUTTONS.LTR);
    const [showURLInput, setURLInput] = useState(false);
    const [urlValue, setUrlValue] = useState('');
    const attachmentButtonRef = useRef(null);
    const inlineImageButtonRef = useRef(null);
    const [editor] = useLexicalComposerContext();
    const EmojiButtonRef = useRef(null);
    const [isInsertTableClicked, setInsertTableClicked] = useState(false);
    const [tableInfo, updateTableInfo] = useState({
        columns: '',
        rows: '',
    });
    const [isInsertTableBtnDisabled, setInsertTableBtnDisabled] = useState(true);
    const isEmailChannelEnabledInAah = useSelector(isAgentAssistConfigParamsEnabledForContact(AgentAssistConfigACPParamsKeys.EMAIL_CHANNEL));
    const [openToolbar, setOpenToolbar] = useState(false);
    const [isColorPicker, setIsColorPickerOpen] = useState(false);
    const [toolbarAnchorEl, setToolbarAnchorEl] = useState(null);
    const toolBarRef = useRef(null);
    const toolbarButtonRef = useRef(null);
    const toolBarPopperRef = useRef(null);
    const emojiPickerButtonRef = useRef(null);
    const [containerWidth, setContainerWidth] = useState(0);
    const [activePopper, setActivePopper] = useState('');
    const isMobile = /Android|iPhone|iPad/i.test(navigator.userAgent);
    /**
     * Function to reset the form state
     * @example resetFormData()
     */
    const resetFormData = () => {
        setInsertTableBtnDisabled(true);
        updateTableInfo({
            rows: '',
            columns: '',
        });
    };
    /**
     *
     * @param row - Number of rows entered
     * @param col - Number of columns entered
     * @returns boolean value if the entered row/col are valid
     * @example checkForRowColumnValidation(3,2)
     */
    const checkForRowColumnValidation = (row, col) => {
        if (row <= 0 || row > 50)
            return true;
        if (col <= 0 || col > 50)
            return true;
        return false;
    };
    const dispatch = useDispatch();
    const selectedAlignment = useRef(RICH_TOOLBAR_BUTTONS.LEFT_ALIGN);
    const selectedDirection = useRef(RICH_TOOLBAR_BUTTONS.LTR);
    // In case of inserting internal table from editor we need to set isCopiedFromExcel to true
    // to maintain the styling.
    useEffect(() => {
        if (isInsertTableClicked) {
            dispatch(CcfContactEditorAction.updateIsCopiedFromExcel({ caseId, isCopiedFromExcel: true }));
        }
    }, [isInsertTableClicked]);
    useEffect(() => {
        appSpaceLocal && setContainerWidth(JSON.parse(appSpaceLocal)[0]);
    }, [appSpaceLocal]);
    useEffect(() => {
        editor.registerCommand(KEY_MODIFIER_COMMAND, (event) => {
            if (event.ctrlKey) {
                handleShortcutKeyBinding(event);
            }
            return false;
        }, COMMAND_PRIORITY_LOW);
    }, []);
    useEffect(() => {
        //closes text toolbar if active popper is emoji picker and text toolbar is open 
        if (activePopper === 'emojiPicker' && openToolbar) {
            setToolbarAnchorEl(null);
            setOpenToolbar(false);
        }
    }, [activePopper]);
    /**
     * Handles keyboard shortcuts to highlight toolbar icons.
     *  @param event - keyboardEvent
     * @example handleShortcutKeyBinding(event)
     */
    const handleShortcutKeyBinding = (event) => {
        switch (event.code) {
            case EventKeys.KEY_B:
                setHighlightBoldBtn(bold => !bold);
                break;
            case EventKeys.KEY_I:
                setHighlightItalicBtn(italic => !italic);
                break;
            case EventKeys.KEY_U:
                setHighlightUnderLineBtn(underline => !underline);
                break;
            case EventKeys.LEFT_SHIFT:
                applyDirection(RICH_TOOLBAR_BUTTONS.LTR, RICH_TOOLBAR_BUTTONS.LEFT_ALIGN);
                break;
            case EventKeys.RIGHT_SHIFT:
                applyDirection(RICH_TOOLBAR_BUTTONS.RTL, RICH_TOOLBAR_BUTTONS.RIGHT_ALIGN);
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
        e.stopPropagation();
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
     * Method to make Text Input aligned
     *  @param direction - direction
     * @example applyAlignment(left);
     */
    const applyAlignment = (direction) => {
        editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, direction);
        setHighlightAlignBtn(direction);
        selectedAlignment.current = direction;
        editor.focus();
    };
    /**
       * Method to handle text direction change
       * @param directionStyle - direction style
       * @param alignmentStyle - alignment style
       * @example applyDirection('RTL', 'right');
       */
    const applyDirection = (directionStyle, alignmentStyle) => {
        editor.update(() => {
            const selection = $getSelection();
            const currentNode = getSelectedNode(selection);
            const parentNode = currentNode.getParent();
            if ($isParagraphNode(currentNode)) {
                currentNode.setDirection(directionStyle);
                currentNode.setFormat(alignmentStyle);
            }
            else if ($isParagraphNode(parentNode)) {
                parentNode.setDirection(directionStyle);
                parentNode.setFormat(alignmentStyle);
            }
        });
        setHighlightDirectionBtn(directionStyle);
        applyAlignment(alignmentStyle);
        selectedDirection.current = directionStyle;
    };
    /**
     * Method to make Text Input Ordered List
     * @example -
     * ```
     * onOrderedListClick();
     * ```
     */
    const onUnOrderedListClick = () => {
        if (!highlightBulletedListBtn) {
            editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
            setHighlightBulletListBtn(!highlightBulletedListBtn);
            setHighlightNumberedListBtn(false);
        }
        else {
            editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
            setHighlightBulletListBtn(false);
        }
    };
    /**
     * Method to make Text Input Unordered List
     * @example onUnOrderedListClick();
     */
    const onOrderedListClick = () => {
        if (!highlightNumberedListBtn) {
            editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
            setHighlightNumberedListBtn(!highlightNumberedListBtn);
            setHighlightBulletListBtn(false);
        }
        else {
            editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
            setHighlightBulletListBtn(false);
        }
    };
    /**
     * Method to change the font style/family change
     * @param selectedFont - selected font
     * @example changeFontStyle('FontArial');
     */
    const changeFontStyle = (selectedFont) => {
        var _a;
        const fontStyle = (_a = Object.values(CUSTOM_STYLE_MAP[selectedFont])[0]) !== null && _a !== void 0 ? _a : '';
        editor.update(() => {
            const selection = $getSelection();
            if (selection && fontStyle) {
                $patchStyleText(selection, { 'font-family': fontStyle });
            }
        });
    };
    /**
     * Method to change the font size
     * @param selectedSize - SyntheticEvent<HTMLButtonElement>
     * @example changeFontSize('12');
     */
    const changeFontSize = (selectedSize) => {
        var _a;
        const fontSize = (_a = Object.values(CUSTOM_STYLE_MAP[selectedSize])[0]) !== null && _a !== void 0 ? _a : '';
        editor.update(() => {
            const selection = $getSelection();
            if (selection && fontSize)
                $patchStyleText(selection, { 'font-size': fontSize });
        });
    };
    /**
     * Method to highlight text or change text color
     * @param id - Id
     * @param group - Color Group
     * @example onColorSelect(id, group);
     */
    const onColorSelect = (id, group) => {
        var _a, _b, _c, _d, _e;
        const colorDetails = colorData.filter(color => color.id === id);
        const selectedColor = colorDetails ? (_a = colorDetails[0]) === null || _a === void 0 ? void 0 : _a.value : '';
        let style = {};
        //If id is not available/ colorDetails are not available i.e. agent has been selected rest option
        if (group === HIGHLIGHT_COLOR_GROUP) {
            style = { 'background-color': selectedColor !== null && selectedColor !== void 0 ? selectedColor : (_c = (_b = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _b === void 0 ? void 0 : _b.text) === null || _c === void 0 ? void 0 : _c.white };
        }
        else {
            style = { 'color': selectedColor !== null && selectedColor !== void 0 ? selectedColor : (_e = (_d = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _d === void 0 ? void 0 : _d.text) === null || _e === void 0 ? void 0 : _e.black };
        }
        editor.update(() => {
            const selection = $getSelection();
            if (selection) {
                $patchStyleText(selection, style);
            }
        });
    };
    /**
     * Method to remove link
     * @param e - SyntheticEvent<HTMLButtonElement>
     * @example onLinkRemove(e);
     */
    const onLinkRemove = (e) => {
        e.preventDefault();
        editor.update(() => {
            const selection = $getSelection();
            if (selection && !selection.isCollapsed()) {
                editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
            }
        });
    };
    /**
     * Method to handle link selection
     * @param e - SyntheticEvent<HTMLButtonElement>
     * @example onLinkSelect(e);
     */
    const onLinkSelect = (e) => {
        e.preventDefault();
        editor.update(() => {
            const selection = $getSelection();
            if (selection && !selection.isCollapsed()) {
                let url = '';
                const node = getSelectedNode(selection);
                const parent = node.getParent();
                if ($isLinkNode(parent) || $isLinkNode(node)) {
                    const linkParent = $findMatchingParent(node, $isLinkNode);
                    if (linkParent) {
                        url = linkParent.getURL();
                    }
                    else if ($isLinkNode(node)) {
                        url = node.getURL();
                    }
                }
                setUrlValue(url);
                setURLInput(true);
            }
        });
    };
    /**
   * Method to handle URL change
   * @param e - SyntheticEvent<HTMLButtonElement>
   * @example onURLChange(e);
   */
    const onURLChange = (e) => setUrlValue(e.target.value);
    /**
      * Method to handle link selection
      * @example confirmLink();
      */
    const confirmLink = () => {
        if (urlValue) {
            let url = urlValue;
            if (!url.includes('http://') && !url.includes('https://')) {
                url = 'http://' + url;
            }
            editor.dispatchCommand(TOGGLE_LINK_COMMAND, url);
            setURLInput(false);
            setUrlValue('');
        }
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
            const elementKey = element.getKey();
            const elementDOM = editor.getElementByKey(elementKey);
            if (elementDOM !== null) {
                if ($isListNode(element)) {
                    const parentList = $getNearestNodeOfType(anchorNode, ListNode);
                    const type = parentList ? parentList.getListType() : element.getListType();
                    //Persist Order and unordered list
                    if (type === RICH_TOOLBAR_BUTTONS.NUMBER_LIST) {
                        setHighlightNumberedListBtn(true);
                        setHighlightBulletListBtn(false);
                    }
                    else {
                        setHighlightBulletListBtn(true);
                        setHighlightNumberedListBtn(false);
                    }
                }
                else {
                    // If list node not available then will disable all list buttons
                    setHighlightNumberedListBtn(false);
                    setHighlightBulletListBtn(false);
                }
            }
            const node = getSelectedNode(selection);
            const parent = node.getParent();
            let matchingParent;
            if ($isLinkNode(parent)) {
                // If node is a link, we need to fetch the parent paragraph node to set format
                matchingParent = $findMatchingParent(node, (parentNode) => $isElementNode(parentNode) && !parentNode.isInline());
            }
            // If matchingParent is a valid node, pass it's format type
            let direction;
            if ($isElementNode(matchingParent)) {
                direction = matchingParent.getFormatType() || RICH_TOOLBAR_BUTTONS.LEFT_ALIGN;
            }
            else if ($isElementNode(node)) {
                direction = node.getFormatType() || RICH_TOOLBAR_BUTTONS.LEFT_ALIGN;
            }
            else {
                direction = (parent === null || parent === void 0 ? void 0 : parent.getFormatType()) || RICH_TOOLBAR_BUTTONS.LEFT_ALIGN;
            }
            // Persist the  direction button state
            // Currently lexical don't have direct support for LRT and RTL buttons so need to rely on direction
            // to persist the  alignment button state
            //if direction is not available then by default it will be left align
            setHighlightAlignBtn(direction ? direction : RICH_TOOLBAR_BUTTONS.LEFT_ALIGN);
            // Persist the right direction button when cursor alignment in right 
            // By default we are stick to left alignment and direction so change require for right direction and alignment
            if (direction === RICH_TOOLBAR_BUTTONS.RIGHT_ALIGN) {
                selectedAlignment.current = RICH_TOOLBAR_BUTTONS.RIGHT_ALIGN;
                selectedDirection.current = RICH_TOOLBAR_BUTTONS.RTL;
                applyDirection(selectedDirection.current, RICH_TOOLBAR_BUTTONS.RIGHT_ALIGN);
                applyAlignment(selectedAlignment.current);
            }
            else if (direction === RICH_TOOLBAR_BUTTONS.LEFT_ALIGN) {
                selectedAlignment.current = RICH_TOOLBAR_BUTTONS.LEFT_ALIGN;
                selectedDirection.current = RICH_TOOLBAR_BUTTONS.LTR;
                applyDirection(selectedDirection.current, RICH_TOOLBAR_BUTTONS.LEFT_ALIGN);
                applyAlignment(direction);
            }
        }
    };
    /**
     * method to handle link selection
     * @example onLinkInputKeyDown();
     */
    const onLinkInputKeyDown = (e) => {
        e === null || e === void 0 ? void 0 : e.stopPropagation();
        if (e.key === EventKeys.ENTER) {
            confirmLink();
        }
    };
    /**
     * method to focus the emoji picker button
     * @example focusEmojiButton();
     */
    const focusEmojiButton = () => { var _a; return (_a = emojiPickerButtonRef === null || emojiPickerButtonRef === void 0 ? void 0 : emojiPickerButtonRef.current) === null || _a === void 0 ? void 0 : _a.focus(); };
    /**
   * Method to handle emoji selection and insert into the editor
   * @param emojiData - Selected emoji object
   * @example handleEmojiSelect(emojiData);
   */
    const onEmojiSelect = (emojiData) => {
        const { native } = emojiData;
        editor.update(() => {
            const selection = $getSelection();
            if (selection) {
                const emojiNode = $createTextNode(native); // to create text node with selected emoji data
                $insertNodes([emojiNode]); // to insert node at the cursor position in editor
            }
        });
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
    /**
    * Method to persist alignment and direction.
    * @example persistAlignmentAndDirection();
    */
    const persistAlignmentAndDirection = () => {
        if (showRichToolBarButtons) {
            applyAlignment(selectedAlignment.current);
        }
        else if (selectedDirection.current === RICH_TOOLBAR_BUTTONS.RTL) {
            applyDirection(selectedDirection.current, RICH_TOOLBAR_BUTTONS.RIGHT_ALIGN);
        }
    };
    /**
    * eventlistener function to close the toolbar when user clicks escape key
    * @param event - KeyboardEvent
    * @example handleKeyDown(event)
    */
    const handleKeyDown = (event) => {
        var _a;
        if (event.key === EventKeys.ESCAPE) {
            if (isColorPicker) {
                setIsColorPickerOpen(false);
            }
            else {
                setURLInput(false);
                onOutsideToolbarClick(event);
                (_a = toolbarButtonRef === null || toolbarButtonRef === void 0 ? void 0 : toolbarButtonRef.current) === null || _a === void 0 ? void 0 : _a.focus(); // to focus back on toolbar button after closing the toolbar
            }
        }
    };
    useEffect(() => {
        if (openToolbar || showURLInput || isInsertTableClicked) {
            document.addEventListener('keydown', handleKeyDown);
            window.addEventListener(WINDOW_EVENTS.RESIZE, closePopoversonResize);
        }
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener(WINDOW_EVENTS.RESIZE, closePopoversonResize);
        };
    }, [openToolbar, isColorPicker, showURLInput, isInsertTableClicked]);
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
            var _a, _b, _c;
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
            // If we paste the text in editor then it will maintain the RTL/LTR and alignment formatting. 
            const pastedText = (_b = event.clipboardData) === null || _b === void 0 ? void 0 : _b.getData('Text');
            if (pastedText) {
                setTimeout(() => {
                    persistAlignmentAndDirection();
                });
                // Add a paragraph after pasted text in the rich editor so the cursor can be moved to the next line by clicking
                if (showRichToolBarButtons) {
                    (_c = $getRoot()) === null || _c === void 0 ? void 0 : _c.append($createParagraphNode());
                }
            }
            return false;
        }, COMMAND_PRIORITY_LOW);
        editor.registerCommand(KEY_ENTER_COMMAND, () => {
            // Persist alignment and direction on enter key press
            // By default lexical editor not support this functionality so need to handle it manually.
            setTimeout(() => {
                editor.focus();
                persistAlignmentAndDirection();
            });
            return false;
        }, COMMAND_PRIORITY_HIGH);
    }, [editor]);
    /**
     * Function to handle the input field characters validation
     * @param event - input field change event
     * @example handleInputChange
     */
    const handleInputChange = (event) => {
        let inputValue = event.target.value;
        inputValue = inputValue.replace(/[^0-9]/g, ''); // Remove all non-numeric characters
        event.target.value = inputValue; // Assign the updated input value back to the input
    };
    /**
   * Handles the change in the input field when a URL is pasted.
   * @param event - The clipboard event triggered by pasting.
   * @example onPasteChange(e).
   */
    const onPasteChange = (event) => {
        const url = event.clipboardData.getData('text');
        setUrlValue(url);
    };
    /**
         * This method to toggle TextFormatBar
         *  @param event - EventReact.MouseEvent<HTMLSpanElement> | React.KeyboardEvent<HTMLSpanElement>
         *  @example - toggleTextFormatBar(event)
         */
    const toggleTextFormatBar = useCallback((event) => {
        var _a;
        event === null || event === void 0 ? void 0 : event.stopPropagation();
        setToolbarAnchorEl(toolbarAnchorEl ? null : event === null || event === void 0 ? void 0 : event.currentTarget);
        setOpenToolbar((previousOpen) => !previousOpen);
        !openToolbar && ((_a = toolbarButtonRef === null || toolbarButtonRef === void 0 ? void 0 : toolbarButtonRef.current) === null || _a === void 0 ? void 0 : _a.focus());
    }, []);
    /**
     * method to close the toolbar popper or the insert table popper if it is open
     * will be called on window resize event
     * @example closePopoversonResize()
     */
    const closePopoversonResize = () => {
        openToolbar && setOpenToolbar(false);
        isInsertTableClicked && setInsertTableClicked(false);
    };
    /**
         * Method to handle if user click outside of the toolbar
         * @param event - Event
         * @example `onOutsideToolbarClick()`
         */
    const onOutsideToolbarClick = useCallback((event) => {
        setToolbarAnchorEl(null);
        setOpenToolbar(false);
        const ref = toolBarRef;
        if (ref.current && ref.current.contains(event.target)) {
            return;
        }
    }, []);
    /**
          * this container will be inside resizer in CXA the container width will change based on resizing
          * if container width is not present, setting width 70%. CIA the resizer will not be present so containerwidth value will be 0
          * if device is mobile setting width as 70%
          * if container width is present calculating the width to display the popper without overflowing the resizer
          * @example getRichTextToolbarPopperWidth();
    */
    const getRichTextToolbarPopperWidth = () => {
        return (!isMobile && containerWidth) ? (containerWidth - (containerWidth / 3)) + '%' : '70%';
    };
    /**
         * Method to return the toolbar plugin
         * @example `getToolbarPlugin()`
         */
    const getToolbarPlugin = () => {
        return _jsxs(_Fragment, { children: [(showRichToolBarButtons && displayNewEmailButtons) &&
                    _jsx(CcfTooltip, Object.assign({ title: translate('richTextToolbar'), disableHoverListener: openToolbar }, { children: _jsx(Button, Object.assign({ "aria-label": translate('richTextToolbar'), "data-testid": 'richTextToolbarButton', "aria-haspopup": 'dialog', "aria-expanded": openToolbar, sx: styles.revampButtonContainer, disableRipple: true, onKeyUp: (e) => { var _a; if (e.key === EventKeys.ENTER) {
                                (_a = toolbarButtonRef.current) === null || _a === void 0 ? void 0 : _a.click();
                            } }, onClick: (e) => { e.preventDefault(); e.stopPropagation(); setActivePopper('toolbar'); toggleTextFormatBar(e); }, style: { cursor: 'pointer' }, ref: toolbarButtonRef }, { children: _jsx(CcfTextColorIcon, { dataTestId: 'richTextToolbarPlugin', sx: styles.toolbarBtn }, 'richTextToolbar') })) })), _jsx(Popper, Object.assign({ sx: Object.assign({ width: getRichTextToolbarPopperWidth() }, styles.toolbarPopper), open: openToolbar, ref: toolBarPopperRef, anchorEl: toolbarAnchorEl, onClick: (event) => event.stopPropagation(), placement: 'top-start', "data-testid": 'richTextToolbarPopper', modifiers: [
                        {
                            name: 'offset',
                            options: {
                                offset: [10, 10],
                            },
                        }
                    ], style: { zIndex: 999 }, nonce: undefined, onResize: undefined, onResizeCapture: undefined }, { children: _jsx(ClickAwayListener, Object.assign({ onClickAway: onOutsideToolbarClick }, { children: _jsx(Box, { children: _jsx(CcfEditorToolbar, { styles: styles, hightlightBtn: highlightBoldBtn, hightlightUnderlineBtn: highlightUnderlineBtn, hightlightItalicBtn: highlightItalicBtn, hightlightBulletedListBtn: highlightBulletedListBtn, hightlightNumberedListBtn: highlightNumberedListBtn, hightlightAlignBtn: highlightAlignBtn, changeFontFamily: changeFontStyle, changeFontSize: changeFontSize, onBoldClick: onBoldClick, onItalicClick: onItalicClick, onUnderLineClick: onUnderLineClick, onOrderedListClick: onOrderedListClick, onUnOrderedListClick: onUnOrderedListClick, onLeftAlignClick: () => applyAlignment(RICH_TOOLBAR_BUTTONS.LEFT_ALIGN), onRightAlignClick: () => applyAlignment(RICH_TOOLBAR_BUTTONS.RIGHT_ALIGN), onCenterAlignClick: () => applyAlignment(RICH_TOOLBAR_BUTTONS.CENTER_ALIGN), onColorSelect: onColorSelect, highlightDirectionBtn: highlightDirectionBtn, applyDirection: applyDirection, displayNewEmailButtons: true, toggleTextFormatBar: toggleTextFormatBar, setIsColorpickerOpen: () => setIsColorPickerOpen(true) }) }) })) })), _jsx(Button, Object.assign({ ref: emojiPickerButtonRef, "aria-label": translate('addEmoji'), "aria-haspopup": 'dialog', sx: (!displayNewEmailButtons || !showRichToolBarButtons) ? Object.assign(Object.assign({}, styles.btnContainer), styles === null || styles === void 0 ? void 0 : styles.focussedElement) : styles.revampButtonContainer, disableRipple: true, size: 'small', onClick: (event) => { var _a; (_a = EmojiButtonRef === null || EmojiButtonRef === void 0 ? void 0 : EmojiButtonRef.current) === null || _a === void 0 ? void 0 : _a.click(); event.stopPropagation(); }, onKeyDown: (e) => { var _a; e.key === EventKeys.ENTER && ((_a = EmojiButtonRef === null || EmojiButtonRef === void 0 ? void 0 : EmojiButtonRef.current) === null || _a === void 0 ? void 0 : _a.click()); }, name: translate('addEmoji'), "data-testid": 'emoji' }, { children: _jsx(CcfEmojiPicker, { isEmailRevampEnabled: (showRichToolBarButtons && displayNewEmailButtons), onSelect: (emoji) => onEmojiSelect(emoji), ref: EmojiButtonRef, onEscape: focusEmojiButton, setActivePopper: () => setActivePopper('emojiPicker'), "data-testid": 'emoji-select' }) })), showFileUploadButton &&
                    _jsx(CcfTooltip, Object.assign({ title: translate('addAttachment') }, { children: _jsx(Button, Object.assign({ "aria-label": translate('addAttachment'), sx: (!displayNewEmailButtons || !showRichToolBarButtons) ? [styles.btnContainer, styles === null || styles === void 0 ? void 0 : styles.focussedElement] : Object.assign({}, styles.revampButtonContainer), disableRipple: true, "data-testid": 'upload-btn', "aria-pressed": true, size: 'small', onClick: (event) => { var _a; (_a = attachmentButtonRef === null || attachmentButtonRef === void 0 ? void 0 : attachmentButtonRef.current) === null || _a === void 0 ? void 0 : _a.click(); event.stopPropagation(); } }, { children: _jsx(CcfAttachmentButton, Object.assign({ isEmailRevamp: displayNewEmailButtons }, { onChange: handleOnChangeAttachment, onClick: onFileDialogCancel }, { ref: attachmentButtonRef })) })) })), showRichToolBarButtons &&
                    _jsxs(_Fragment, { children: [showFileUploadButton &&
                                _jsx(CcfTooltip, Object.assign({ title: translate('addInlineImage') }, { children: _jsx(Button, Object.assign({ "aria-label": translate('addInlineImage'), sx: !displayNewEmailButtons ? [styles.btnContainer, styles === null || styles === void 0 ? void 0 : styles.focussedElement] : styles.revampButtonContainer, size: 'small', "data-testid": 'inline-image', onClick: (event) => { var _a; (_a = inlineImageButtonRef === null || inlineImageButtonRef === void 0 ? void 0 : inlineImageButtonRef.current) === null || _a === void 0 ? void 0 : _a.click(); event.stopPropagation(); }, disableRipple: true }, { children: _jsx(CcfInsertInlineImageButton, Object.assign({}, { activeEditor: editor }, { ref: inlineImageButtonRef })) })) })), _jsx(CcfTooltip, Object.assign({ title: translate('removeLink') }, { children: _jsx(Button, Object.assign({ "aria-label": translate('removeLink'), sx: (!displayNewEmailButtons || !showRichToolBarButtons) ? [styles.button, styles === null || styles === void 0 ? void 0 : styles.focussedElement] : styles.revampButtonContainer, size: "small", onMouseDown: (e) => onLinkRemove(e), disableRipple: true, onClick: (e) => onLinkRemove(e), onKeyDown: (e) => { if (e.key === EventKeys.ENTER) {
                                        onLinkRemove(e);
                                    } } }, { children: _jsx(LinkOffIcon, {}) })) })), _jsx(CcfTooltip, Object.assign({ title: translate('addLink') }, { children: _jsx(Button, Object.assign({ "aria-label": translate('addLink'), sx: (!displayNewEmailButtons || !showRichToolBarButtons) ? [styles.button, styles === null || styles === void 0 ? void 0 : styles.focussedElement] : styles.revampButtonContainer, size: "small", onKeyDown: (e) => { if (e.key === EventKeys.ENTER) {
                                        onLinkSelect(e);
                                    } }, onMouseDown: (e) => onLinkSelect(e), disableRipple: true, onClick: (e) => onLinkSelect(e) }, { children: _jsx(LinkIcon, {}) })) })), showURLInput && _jsxs(_Fragment, { children: [_jsx(CcfTextField, { id: "linkTextInput", size: "small", fullWidth: true, style: styles.linkBox, placeholder: translate('exampleEmail'), variant: "outlined", value: urlValue, onChange: onURLChange, onKeyDown: onLinkInputKeyDown, onPaste: onPasteChange, onClick: (event) => { event === null || event === void 0 ? void 0 : event.stopPropagation(); } }), _jsx(Button, Object.assign({ sx: styles.button, size: "small", onMouseDown: confirmLink, onClick: confirmLink }, { children: _jsx(CheckIcon, { style: styles.btnCheck, color: urlValue ? 'inherit' : 'disabled' }) }))] }), !displayNewEmailButtons && _jsx(CcfEditorToolbar, { styles: styles, hightlightBtn: highlightBoldBtn, hightlightUnderlineBtn: highlightUnderlineBtn, hightlightItalicBtn: highlightItalicBtn, hightlightBulletedListBtn: highlightBulletedListBtn, hightlightNumberedListBtn: highlightNumberedListBtn, hightlightAlignBtn: highlightAlignBtn, changeFontFamily: changeFontStyle, changeFontSize: changeFontSize, onBoldClick: onBoldClick, onItalicClick: onItalicClick, onUnderLineClick: onUnderLineClick, onOrderedListClick: onOrderedListClick, onUnOrderedListClick: onUnOrderedListClick, onLeftAlignClick: () => applyAlignment(RICH_TOOLBAR_BUTTONS.LEFT_ALIGN), onRightAlignClick: () => applyAlignment(RICH_TOOLBAR_BUTTONS.RIGHT_ALIGN), onCenterAlignClick: () => applyAlignment(RICH_TOOLBAR_BUTTONS.CENTER_ALIGN), onColorSelect: onColorSelect, setIsColorpickerOpen: () => setIsColorPickerOpen(true) })] }), _jsxs(_Fragment, { children: [(!displayNewEmailButtons || !showRichToolBarButtons) && _jsx(CcfTooltip, Object.assign({ title: translate('textDirectionltr') }, { children: _jsx(Button, Object.assign({ "aria-label": translate('textDirectionltr'), disableRipple: true, role: "button", "aria-pressed": (highlightDirectionBtn === RICH_TOOLBAR_BUTTONS.LTR), size: 'small', sx: [Object.assign(Object.assign({}, styles.button), ((highlightDirectionBtn === RICH_TOOLBAR_BUTTONS.LTR) && styles.buttonActive)), styles === null || styles === void 0 ? void 0 : styles.focussedElement], name: translate('textDirectionrtl'), onClick: () => applyDirection(RICH_TOOLBAR_BUTTONS.LTR, RICH_TOOLBAR_BUTTONS.LEFT_ALIGN), "data-testid": 'ltr' }, { children: _jsx(FormatTextdirectionLToR, {}) })) })), (!displayNewEmailButtons || !showRichToolBarButtons) && _jsx(CcfTooltip, Object.assign({ title: translate('textDirectionrtl') }, { children: _jsx(Button, Object.assign({ "aria-label": translate('textDirectionrtl'), disableRipple: true, role: "button", "aria-pressed": (highlightDirectionBtn === RICH_TOOLBAR_BUTTONS.RTL), size: 'small', sx: [Object.assign(Object.assign({}, styles.button), ((highlightDirectionBtn === RICH_TOOLBAR_BUTTONS.RTL) && styles.buttonActive)), styles === null || styles === void 0 ? void 0 : styles.focussedElement], name: translate('textDirectionrtl'), onClick: () => applyDirection(RICH_TOOLBAR_BUTTONS.RTL, RICH_TOOLBAR_BUTTONS.RIGHT_ALIGN), "data-testid": 'rtl' }, { children: _jsx(FormatTextdirectionRToL, {}) })) })), showFileUploadButton && _jsx(CcfTooltip, Object.assign({ title: translate('record') }, { children: _jsx(CcfVoiceRecorder, { enableRecording: true }) })), showRichToolBarButtons && _jsx(CcfTooltip, Object.assign({ title: translate('insertTable') }, { children: _jsx(Button, Object.assign({ "aria-label": translate('insertTable'), size: 'small', sx: !displayNewEmailButtons ? Object.assign({}, styles.button) : styles.revampButtonContainer, name: translate('insertTable'), disableRipple: true, onClick: () => setInsertTableClicked(true) }, { children: _jsx(TableChartOutlined, {}) })) })), _jsx(Modal, Object.assign({ open: isInsertTableClicked, onClose: () => { resetFormData(); setInsertTableClicked(false); }, "aria-labelledby": "modal-insert-table", "aria-describedby": "modal-table-data" }, { children: _jsxs(Box, Object.assign({ sx: styles.modalContainer }, { children: [_jsxs(Box, Object.assign({ sx: styles.modalContentContainer }, { children: [_jsxs(Box, Object.assign({ sx: styles.modalContent }, { children: [_jsx(Box, { children: _jsx(Typography, Object.assign({ sx: styles.title }, { children: translate('insertTable') })) }), _jsx(Box, Object.assign({ sx: styles.inputdiv }, { children: _jsx(TextField, { sx: styles.inputBtn, id: "outlined-basic", label: translate('rows'), type: 'text', onChange: (e) => {
                                                                setInsertTableBtnDisabled(checkForRowColumnValidation(Number(e.target.value), Number(tableInfo.columns)));
                                                                updateTableInfo(Object.assign(Object.assign({}, tableInfo), { rows: e.target.value }));
                                                            }, placeholder: translate('noOfRowsColumns'), size: 'small', variant: "outlined", onInput: handleInputChange, onClick: (event) => { event === null || event === void 0 ? void 0 : event.stopPropagation(); } }) })), _jsx(Box, Object.assign({ sx: styles.inputdiv }, { children: _jsx(TextField, { sx: styles.inputBtn, id: "outlined-basic", label: translate('columns'), type: 'text', onChange: (e) => {
                                                                setInsertTableBtnDisabled(checkForRowColumnValidation(Number(tableInfo.rows), Number(e.target.value)));
                                                                updateTableInfo(Object.assign(Object.assign({}, tableInfo), { columns: e.target.value }));
                                                            }, placeholder: translate('noOfRowsColumns'), size: 'small', variant: "outlined", onInput: handleInputChange, onClick: (event) => { event === null || event === void 0 ? void 0 : event.stopPropagation(); } }) }))] })), _jsx(Box, Object.assign({ sx: styles.closeButtonColumn }, { children: _jsx(IconButton, Object.assign({ "aria-label": "close", onClick: () => { resetFormData(); setInsertTableClicked(false); } }, { children: _jsx(CloseIcon, { fontSize: "small" }) })) }))] })), _jsx(Box, Object.assign({ sx: styles.buttonsContainer }, { children: _jsx(Button, Object.assign({ variant: "contained", disabled: isInsertTableBtnDisabled, onClick: () => {
                                                //reset to initial state
                                                resetFormData();
                                                setInsertTableClicked(false);
                                                editor.dispatchCommand(INSERT_TABLE_COMMAND, tableInfo);
                                            }, "aria-label": "confirm" }, { children: _jsx(Typography, Object.assign({ fontSize: 'inherit' }, { children: translate('confirm') })) })) }))] })) })), copilotEnabled && isEmailChannelEnabledInAah && showRichToolBarButtons && _jsx(CcfCopilotMenu, { caseId: caseId })] })] });
    };
    return displayNewEmailButtons && showRichToolBarButtons ? _jsx(Box, Object.assign({ sx: styles.richTextToolbarPopover, ref: toolBarRef, "data-testid": 'ccf-editor-toolbar-plugin' }, { children: getToolbarPlugin() })) : getToolbarPlugin();
}
export default CcfEditorToolbarPlugin;
//# sourceMappingURL=ccf-editor-toolbar-plugin.js.map