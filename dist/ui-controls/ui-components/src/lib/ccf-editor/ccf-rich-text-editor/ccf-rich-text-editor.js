import { __awaiter } from "tslib";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useRef, useState } from 'react';
import { COMMAND_PRIORITY_CRITICAL, TextNode } from 'lexical';
import { useTheme, Box, Divider } from '@mui/material';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { TablePlugin } from '@lexical/react/LexicalTablePlugin';
import { INSERT_TABLE_COMMAND, TableCellNode, TableNode, TableRowNode } from '@lexical/table';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import ccfRichTextEditorStyles, { editorTheme, richTextEditorCSS } from './ccf-rich-text-editor.styles';
import { CcfBox, CcfSparklesIcon, useTranslator, CcfAppToastMessage, isFeatureEnabled } from '@nice-devone/ui-controls';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { ListItemNode, ListNode } from '@lexical/list';
import { LinkNode } from '@lexical/link';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { EditorRefPlugin } from '@lexical/react/LexicalEditorRefPlugin';
import { TableContext } from './table-plugins/ccf-table-plugin';
import TableCellActionMenuPlugin from './table-plugins/ccf-table-action-menu-plugin';
import CcfInlineImagePlugin from '../ccf-inline-image-plugin/ccf-inline-image-plugin';
import { InlineImageNode } from '../ccf-inline-image-plugin/ccf-inline-image-node';
import { CcfDragDropPastePlugin } from '../ccf-drag-drop-plugin/ccf-drag-drop-paste-plugin';
import CcfPasteInlineImage from '../ccf-inline-image-plugin/ccf-paste-inline-image';
import { CcfExtendedTextNode } from './ccf-extended-text-node';
import { CcfCustomExtendedTableCellNode } from './table-plugins/ccf-custom-extended-table-cell-node';
import { CcfExtendedTableCellNode } from './table-plugins/ccf-extended-table-cell-node';
import { getCopilotEmailRequestStatus, getIsEditorActionPerformed } from '../../ccf-agent-copilot/ccf-agent-copilot-container.slice';
import { getNonIncomingActiveContactInSelectedInteraction } from '../../ccf-assignment-panel/ccf-assignment-panel.slice';
import EditorPlaceholder from './editor-placeholder/editor-placeholder';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { LocalStorageHelper, StorageKeys } from '@nice-devone/core-sdk';
import { FeatureToggleService } from '@nice-devone/agent-sdk';
// Checking current device mode (DragDrop type of feature is not supported on mobile devices)
const isMobile = /Android|iPhone|iPad/i.test(navigator.userAgent);
/**
 * Component displays Rich text Editor
 * @returns Rich text Editor
 * ```
 * @example
 * <CcfRichTextEditor/>
 * ```
 */
export function CcfRichTextEditor({ editorState, onBlur, onFocus, onEditorStateChange, onError, toolbarPlugin, updatePlugin, editorRef, fileUploadPlugin, editorContainerRef, isOBContact, caseId, onUploadAttachment, shouldDisplayDragDropZone, savedDigitalContactRef, closeTab, id, interactionId, copilotEnabled, headerExpandCollapse }) {
    var _a, _b;
    const theme = useTheme();
    const isLexicalTableBorderFTEnabled = FeatureToggleService.instance.getFeatureToggleSync("release-cxa-lexical-table-border-AW-45046" /* FeatureToggles.LEXICAL_TABLE_BORDER_TOGGLE */);
    const styles = ccfRichTextEditorStyles(theme, headerExpandCollapse);
    const richTextEditorStyles = richTextEditorCSS(theme);
    const [translate] = useTranslator();
    const nonIncomingActiveContactInSelectedInteraction = useSelector(getNonIncomingActiveContactInSelectedInteraction);
    const activeCaseId = (nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.caseId) ||
        `${nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.contactId}`;
    const isCopilotGeneratingEmailResponse = useSelector(getCopilotEmailRequestStatus(activeCaseId || ''));
    const [isResponseLoading, setResponseLoading] = useState(false);
    const EDITOR_PLACEHOLDER_TIMEOUT_VALUE = 10000; // 10 seconds
    const imagePasteError = LocalStorageHelper.getItem(StorageKeys.IMAGE_PASTE_ERROR);
    const isCopilotEditorActionPerformed = useSelector(getIsEditorActionPerformed(activeCaseId || ''));
    const [editorActionsComponent, setEditorActionsComponent] = useState(null);
    const isEmailRevampEnabled = isFeatureEnabled("release-cx-agent-Revamped_New_Digital_Email_CMA-AW-28772" /* FeatureToggles.NEW_EMAIL_REVAMP_FEATURE_TOGGLE */);
    const isEditorRevampToggleEnabled = isFeatureEnabled("release-cx-agent-Revamped_Email_Editor_CMA-AW-28772" /* FeatureToggles.NEW_EMAIL_EDITOR_REVAMP_FEATURE_TOGGLE */);
    const isTableCreation = useRef(false);
    /**
     * dynamic import of editor actions
     *  @example loadEditorActions();
     */
    const loadEditorActions = () => __awaiter(this, void 0, void 0, function* () {
        setEditorActionsComponent(null);
        const EditorActions = (yield import('../ccf-editor-actions')).default;
        (isEmailRevampEnabled && savedDigitalContactRef) && setEditorActionsComponent(_jsx(EditorActions, { id: id, caseId: caseId, interactionId: interactionId, closeTab: closeTab, editorRef: editorRef, savedDigitalContactRef: savedDigitalContactRef, copilotEnabled: copilotEnabled }));
    });
    useEffect(() => {
        var _a, _b;
        loadEditorActions();
        if (isLexicalTableBorderFTEnabled) {
            (_a = editorRef === null || editorRef === void 0 ? void 0 : editorRef.current) === null || _a === void 0 ? void 0 : _a.registerCommand(INSERT_TABLE_COMMAND, () => {
                isTableCreation.current = true;
                return false;
            }, COMMAND_PRIORITY_CRITICAL);
            // Reset isTableCreation after TableNode is created
            const unregisterTableTransform = (_b = editorRef === null || editorRef === void 0 ? void 0 : editorRef.current) === null || _b === void 0 ? void 0 : _b.registerNodeTransform(TableNode, () => {
                if (isTableCreation.current) {
                    isTableCreation.current = false;
                }
            });
            return () => {
                if (unregisterTableTransform) {
                    unregisterTableTransform();
                }
            };
        }
        return undefined;
    }, []);
    useEffect(() => {
        setResponseLoading(isCopilotGeneratingEmailResponse || isCopilotEditorActionPerformed);
        if (isCopilotGeneratingEmailResponse || isCopilotEditorActionPerformed) {
            const timer = setTimeout(() => {
                setResponseLoading(false);
            }, EDITOR_PLACEHOLDER_TIMEOUT_VALUE);
            return () => clearTimeout(timer);
        }
        return () => false;
    }, [isCopilotGeneratingEmailResponse, isCopilotEditorActionPerformed]);
    useEffect(() => {
        if (imagePasteError && imagePasteError.trim().toLowerCase() === 'true') {
            toast.error(_jsx(CcfAppToastMessage, { type: "any", messageKey: 'imagePasteError' }), {
                autoClose: 2000,
                containerId: 'ComponentToastContainer',
            });
            LocalStorageHelper.removeItem(StorageKeys.IMAGE_PASTE_ERROR);
        }
    }, [imagePasteError]);
    const editorConfig = {
        namespace: 'CcfRichTextEditor',
        theme: editorTheme,
        editorState,
        onError,
        nodes: [
            TableNode,
            isLexicalTableBorderFTEnabled ? CcfCustomExtendedTableCellNode : CcfExtendedTableCellNode,
            // Replacing TableCellNode with CcfExtendedTableCellNode with default values, table creation flag and theme as parameters
            // node level private properties cannot be set during replacement, hence passing through in required sequence
            isLexicalTableBorderFTEnabled ? {
                replace: TableCellNode,
                with: (node) => {
                    var _a, _b;
                    return new CcfCustomExtendedTableCellNode(node.__headerState, node.__colSpan, node.__width, node.__key, isTableCreation.current, (_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.text) === null || _b === void 0 ? void 0 : _b.grey);
                },
            } : { replace: TableCellNode, with: () => new CcfExtendedTableCellNode() },
            TableRowNode,
            CcfExtendedTextNode,
            { replace: TextNode, with: (node) => new CcfExtendedTextNode(node.__text) },
            ListNode, ListItemNode, LinkNode, InlineImageNode
        ],
    };
    const [floatingAnchorElem, setFloatingAnchorElem] = useState(null);
    /**
     * onRef method to get the reference of selected column of table to show menu icon
     * @example onRef();
     * @returns ref of clicked column
     */
    const onRef = (_floatingAnchorElem) => {
        if (_floatingAnchorElem !== null) {
            setFloatingAnchorElem(_floatingAnchorElem);
        }
    };
    /**
     * getEditorBodyStyles method to add styling for the rich editor body
     * @example getEditorBodyStyles();
     * @returns style class
     */
    const getEditorBodyStyles = () => {
        const baseStyles = Object.assign(Object.assign({}, styles.editorBody), (!isOBContact && Object.assign({}, styles.inboundContactEditorBody)));
        if (isResponseLoading) {
            return Object.assign(Object.assign({}, baseStyles), { height: '100%', [theme.breakpoints.down('xl')]: {
                    height: '100%',
                }, overflow: 'hidden' });
        }
        return baseStyles;
    };
    /**
   * make editor focusable when click on editor.
   * @example handleEditorFocus()
   */
    const handleEditorFocus = () => {
        var _a;
        (_a = editorRef.current) === null || _a === void 0 ? void 0 : _a.focus();
    };
    return (_jsx(CcfBox, Object.assign({ id: 'dropzone', sx: Object.assign(Object.assign({}, styles.richEditor), { overflowY: !isOBContact ? 'auto' : '', overflow: 'hidden' }), "data-testid": 'dropzone', onClick: handleEditorFocus }, { children: _jsx(LexicalComposer, Object.assign({ initialConfig: editorConfig }, { children: _jsx(TableContext, { children: _jsxs(_Fragment, { children: [_jsx(TablePlugin, {}), _jsx("style", { children: richTextEditorStyles }), _jsx(RichTextPlugin, { contentEditable: _jsx(Box, Object.assign({ sx: Object.assign({}, styles.editorContainer), ref: editorContainerRef }, { children: _jsxs(Box, Object.assign({ sx: getEditorBodyStyles(), ref: onRef, id: 'richTextEditorBody' }, { children: [!isMobile && shouldDisplayDragDropZone && (_jsx(CcfDragDropPastePlugin, { caseId: caseId, style: styles.dragNDrop, isRichTextEditor: true, onUploadAttachment: onUploadAttachment })), isResponseLoading ? (_jsx(EditorPlaceholder, { placeholderLoadingIcon: _jsx(CcfSparklesIcon, { htmlColor: (_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.primary) === null || _b === void 0 ? void 0 : _b.main, sx: styles.sparklesIcon, "data-testid": "sparkles-icon" }), loadingText: isCopilotGeneratingEmailResponse ? translate('copilotEmailGenerationPlaceholderText') : translate('copilotEmailUpdatingPlaceholderText') })) : (_jsx(ContentEditable, { className: "ccfRichEditor", spellCheck: true, onFocus: onFocus, style: styles.editorBody.contentEdit, onBlur: onBlur })), fileUploadPlugin ? _jsx(CcfBox, { children: fileUploadPlugin }) : null] })) })), placeholder: null, ErrorBoundary: LexicalErrorBoundary }), floatingAnchorElem && (_jsx(TableCellActionMenuPlugin, { anchorElem: floatingAnchorElem })), _jsx(CcfInlineImagePlugin, {}), _jsx(CcfPasteInlineImage, {}), _jsx(ListPlugin, {}), _jsx(LinkPlugin, {}), _jsx(OnChangePlugin, { onChange: onEditorStateChange }), _jsx(EditorRefPlugin, { editorRef: editorRef }), (!isEmailRevampEnabled || !isEditorRevampToggleEnabled) && _jsx(Divider, { variant: 'fullWidth' }), (!isEmailRevampEnabled || !isEditorRevampToggleEnabled) && _jsxs(CcfBox, { children: [" ", updatePlugin ? updatePlugin : null] }), (!isEmailRevampEnabled || !isEditorRevampToggleEnabled) && _jsxs(CcfBox, { children: [" ", toolbarPlugin ? toolbarPlugin : null] }), (isEmailRevampEnabled && isEditorRevampToggleEnabled) && _jsxs(CcfBox, Object.assign({ sx: styles.toolsAndActionsContainer }, { children: [updatePlugin ? updatePlugin : null, _jsxs(Box, Object.assign({ sx: styles.pluginContainer }, { children: [" ", toolbarPlugin ? toolbarPlugin : null, " "] })), _jsx(Box, Object.assign({ sx: [styles.pluginContainer, styles.right] }, { children: isEmailRevampEnabled ? editorActionsComponent : null }))] }))] }) }) })) })));
}
//# sourceMappingURL=ccf-rich-text-editor.js.map