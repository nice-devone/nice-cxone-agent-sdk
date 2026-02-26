import { __awaiter } from "tslib";
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getSelection, $isRangeSelection, $getRoot, $createTextNode, $createParagraphNode, $createRangeSelection, $setSelection, } from 'lexical';
import { Button, useTheme, Menu, MenuItem } from '@mui/material';
import { CcfSparklesIcon, CcfTooltip, useTranslator, CcfAppToastMessage } from '@nice-devone/ui-controls';
import { styleMap } from '../ccf-rich-text-editor/ccf-rich-text-editor.styles';
import { CopilotService, CcfLogger } from '@nice-devone/agent-sdk';
import { isFeatureEnabled } from '../../../util/featureToggleUtils';
import { useSelector, useDispatch } from 'react-redux';
import { isAgentAssistConfigParamsEnabledForContact, CcfCopilotActions } from '../../ccf-agent-copilot/ccf-agent-copilot-container.slice';
import { AgentAssistConfigACPParamsKeys } from '@nice-devone/common-sdk';
import { toast } from 'react-toastify';
/**
 * These are the action types for email action
 */
export var MenuOptionsValue;
(function (MenuOptionsValue) {
    MenuOptionsValue["SIMPLIFY"] = "Simplify";
    MenuOptionsValue["EXPAND"] = "Expand";
    MenuOptionsValue["REPHRASE"] = "Rephrase";
    MenuOptionsValue["COPILOT_SEARCH"] = "Copilot Search";
})(MenuOptionsValue || (MenuOptionsValue = {}));
;
/**
 * These are the tooltip and translation keys for email action
 */
export var MenuOptionsDisplayData;
(function (MenuOptionsDisplayData) {
    MenuOptionsDisplayData["SIMPLIFY"] = "simplify";
    MenuOptionsDisplayData["EXPAND"] = "expand";
    MenuOptionsDisplayData["REPHRASE"] = "rephrase";
    MenuOptionsDisplayData["COPILOT_SEARCH"] = "copilotSearch";
    MenuOptionsDisplayData["COPILOT_EMAIL_SIMPLIFY"] = "copilotEmailSimplify";
    MenuOptionsDisplayData["COPILOT_EMAIL_EXPAND_FEATURE_TOGGLE"] = "copilotEmailExpand";
    MenuOptionsDisplayData["COPILOT_EMAIL_REPHRASE"] = "copilotEmailRephrase";
    MenuOptionsDisplayData["COPILOT_EMAIL_SEARCH"] = "copilotEmailSearch";
})(MenuOptionsDisplayData || (MenuOptionsDisplayData = {}));
;
/**
 * Component for ccf copilot menu
 * @returns copilot menu in editor toolbar
 * @example -
 * ```
 * <CcfCopilotMenu/>
 * ```
 */
export default function CcfCopilotMenu({ caseId }) {
    var _a, _b;
    const theme = useTheme();
    const [translate] = useTranslator();
    const [editor] = useLexicalComposerContext();
    const [anchorMenuOptions, setAnchorMenuOptions] = useState(null);
    const [selectedSizeIndex, setSelectedSizeIndex] = useState(1);
    const openActionMenu = Boolean(anchorMenuOptions);
    const customStyleMap = styleMap;
    const logger = new CcfLogger('UI-Component', 'CcfCopilotMenu');
    const copilotService = new CopilotService();
    const dispatch = useDispatch();
    const [isActionError, setIsActionError] = useState(false);
    const isExpandEnabledInConfig = useSelector(isAgentAssistConfigParamsEnabledForContact(AgentAssistConfigACPParamsKeys.EMAIL_CHANNEL_EXPAND));
    const isSimplifyFeatureEnabled = useSelector(isAgentAssistConfigParamsEnabledForContact(AgentAssistConfigACPParamsKeys.EMAIL_CHANNEL_SIMPLIFY));
    const isRephraseEnabledInConfig = useSelector(isAgentAssistConfigParamsEnabledForContact(AgentAssistConfigACPParamsKeys.EMAIL_CHANNEL_REPHRASE));
    const isExpandFeatureEnabled = isFeatureEnabled("release-agentassisthub-ILLUM-12720" /* FeatureToggles.COPILOT_EMAIL_EXPAND_FEATURE_TOGGLE */) && isExpandEnabledInConfig;
    const optionsCopilot = [
        ...(isSimplifyFeatureEnabled ? [{ value: MenuOptionsValue.SIMPLIFY, label: translate(MenuOptionsDisplayData.SIMPLIFY), tooltip: translate(MenuOptionsDisplayData.COPILOT_EMAIL_SIMPLIFY) }] : []),
        ...(isRephraseEnabledInConfig ? [{ value: MenuOptionsValue.REPHRASE, label: translate(MenuOptionsDisplayData.REPHRASE), tooltip: translate(MenuOptionsDisplayData.COPILOT_EMAIL_REPHRASE) }] : []),
        ...(isExpandFeatureEnabled ? [{ value: MenuOptionsValue.EXPAND, label: translate(MenuOptionsDisplayData.EXPAND), tooltip: translate(MenuOptionsDisplayData.COPILOT_EMAIL_EXPAND_FEATURE_TOGGLE) }] : [])
    ];
    useEffect(() => {
        if (isActionError) {
            toast.error(_jsx(CcfAppToastMessage, { type: "error", messageKey: 'copilotEmailActionError' }), {
                autoClose: 5000,
                hideProgressBar: true,
                containerId: 'AppToastContainer',
            });
        }
    }, [isActionError]);
    /**
     * method to handle the replacement for text in editor
     * @param updatedText - text to be replaced
     * @returns updated text in editor
     * @example handleEditorTextReplace('test');
     */
    const handleEditorTextReplace = (updatedText, selection) => {
        editor.update(() => {
            if (!selection || selection.getTextContent() === '' || !$isRangeSelection(selection)) {
                const root = $getRoot();
                root.clear();
                const paragraphNode = $createParagraphNode();
                const textNode = $createTextNode(updatedText);
                paragraphNode.append(textNode);
                root.append(paragraphNode);
            }
            else if ($isRangeSelection(selection)) {
                const anchor = selection.anchor;
                const focus = selection.focus;
                const startOffset = Math.min(anchor.offset, focus.offset);
                const endOffset = Math.max(anchor.offset, focus.offset);
                const parentNode = anchor.getNode().getParent();
                if (parentNode) {
                    const parentText = parentNode.getTextContent();
                    const beforeText = parentText.slice(0, startOffset);
                    const afterText = parentText.slice(endOffset);
                    const beforeTextNode = $createTextNode(beforeText);
                    const updatedTextNode = $createTextNode(updatedText);
                    const afterTextNode = $createTextNode(afterText);
                    parentNode.clear();
                    parentNode.append(beforeTextNode, updatedTextNode, afterTextNode);
                    const newSelection = $createRangeSelection();
                    newSelection.anchor.set(updatedTextNode.getKey(), updatedText.length, 'text');
                    newSelection.focus.set(updatedTextNode.getKey(), updatedText.length, 'text');
                    $setSelection(newSelection);
                }
            }
        });
    };
    /**
     * method to get text from editor
     * @returns selectedText and entireText
     * @example getTextContentFromEditor();
     */
    const getTextContentFromEditor = () => {
        let selectedText = '';
        let entireText = '';
        editor.update(() => {
            entireText = editor.getEditorState().read(() => {
                const root = $getRoot();
                return root.getTextContent();
            });
            const selection = $getSelection();
            if (selection && selection.getTextContent() !== '' && $isRangeSelection(selection)) {
                selectedText = selection.getTextContent();
            }
            else {
                selectedText = entireText;
            }
        });
        return { selectedText, entireText };
    };
    /**
     * method to handle the email action for copilot
     * @param action - action to be performed
     * @param entireText - entire text in editor
     * @param selectedText - selected text in editor
     * @param caseId - case id
     * @example handleEditorAction('Simplify', 'test text', 'test', '123');
    */
    const handleEditorAction = (action, entireText, selectedText, caseId) => __awaiter(this, void 0, void 0, function* () {
        try {
            let selection = null;
            editor.focus();
            editor.update(() => {
                selection = $getSelection();
            });
            dispatch(CcfCopilotActions.setIsEditorActionPerformed({ isEditorActionPerformed: true, caseId }));
            const processEditorCommandPromise = copilotService.processEditorCommand(action, entireText, selectedText, caseId);
            const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 10000));
            const updatedText = yield Promise.race([processEditorCommandPromise, timeoutPromise]);
            handleEditorTextReplace(updatedText, selection);
            dispatch(CcfCopilotActions.setIsEditorActionPerformed({ isEditorActionPerformed: false, caseId }));
        }
        catch (error) {
            setIsActionError(true);
            logger.error('Error occurred for email action', JSON.stringify(error));
            dispatch(CcfCopilotActions.setIsEditorActionPerformed({ isEditorActionPerformed: false, caseId }));
            setIsActionError(false);
        }
    });
    /**
     * method to handle the click event of item for copilot
     * @param menuIndex - index of the menu item
     * @example handleMenuItemClickCopilot(1);
     */
    const handleMenuItemClickCopilot = (menuIndex) => {
        const selectedOption = optionsCopilot[menuIndex];
        const { selectedText, entireText } = getTextContentFromEditor();
        handleEditorAction(selectedOption.value, entireText, selectedText, caseId);
        setSelectedSizeIndex(menuIndex);
        setAnchorMenuOptions(null);
    };
    return (_jsx(_Fragment, { children: optionsCopilot.length > 0 && (_jsxs(_Fragment, { children: [_jsx(CcfTooltip, Object.assign({ title: translate('copilotEmailEditingOptions') }, { children: _jsx(Button, Object.assign({ "aria-haspopup": "true", "aria-expanded": openActionMenu ? 'true' : undefined, disableElevation: true, onClick: (e) => setAnchorMenuOptions(e.currentTarget), "data-testid": "copilot-menu" }, { children: _jsx(CcfSparklesIcon, { htmlColor: (_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.text) === null || _b === void 0 ? void 0 : _b.black }) })) })), _jsx(Menu, Object.assign({ id: "lock-menu", anchorEl: anchorMenuOptions, open: openActionMenu, onClose: () => {
                        setAnchorMenuOptions(null);
                    }, MenuListProps: { 'aria-labelledby': 'lock-button', role: 'listbox' } }, { children: optionsCopilot.map((option, optionIndex) => (_jsx(CcfTooltip, Object.assign({ placement: "right", title: option.tooltip, arrow: true }, { children: _jsx(MenuItem, Object.assign({ style: customStyleMap[option.value], selected: optionIndex === selectedSizeIndex, onClick: () => handleMenuItemClickCopilot(optionIndex), "data-testid": `copilot-option-${optionIndex}` }, { children: option === null || option === void 0 ? void 0 : option.label }), option.value) }), option.value))) }))] })) }));
}
//# sourceMappingURL=ccf-copilot-menu.js.map