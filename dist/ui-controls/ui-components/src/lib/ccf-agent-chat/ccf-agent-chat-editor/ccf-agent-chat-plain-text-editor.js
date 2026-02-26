import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { COMMAND_PRIORITY_LOW, KEY_ENTER_COMMAND } from 'lexical';
import { useTheme, Box } from '@mui/material';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { EditorRefPlugin } from '@lexical/react/LexicalEditorRefPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import ccfPlainTextEditorStyles, { editorTheme, plainTextEditorCSS } from './ccf-agent-chat-plain-text-editor.styles';
import { CcfBox } from '@nice-devone/ui-controls';
import CcfReplyToMessage from '../../ccf-digital/ccf-reply-to-message-container/ccf-reply-to-message';
import { getSelectedMsg } from '../../ccf-assignment-panel/ccf-assignment-panel.slice';
import { CcfDragDropPastePlugin } from '../../ccf-editor/ccf-drag-drop-plugin/ccf-drag-drop-paste-plugin';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
const isMobile = /Android|iPhone|iPad/i.test(navigator.userAgent);
/**
 * Component displays Rich text Editor
 * @returns Rich text Editor
 * ```
 * @example
 * <CcfAgentChatPlainTextEditor/>
 * ```
 */
export function CcfAgentChatPlainTextEditor({ editorState, onBlur, onFocus, onEditorStateChange, isEditorFocused, toolbarPlugin, onError, updatePlugin, editorRef, fileUploadPlugin, editorContainerRef, caseId, onUploadAttachment, handleEnterKey, allowSendonEnter, placeholder, shouldDisplayDragDropZone, }) {
    const theme = useTheme();
    const selectedReplyMsg = useSelector(getSelectedMsg(caseId));
    const isReplyMessageSelected = Boolean(selectedReplyMsg && Object.keys(selectedReplyMsg).length > 0);
    const styles = ccfPlainTextEditorStyles(theme, isReplyMessageSelected);
    const plainTextEditorStyles = plainTextEditorCSS();
    const editorConfig = {
        namespace: 'CcfPlainTextEditor',
        theme: editorTheme,
        editorState,
        onError,
    };
    useEffect(() => {
        var _a, _b;
        let unregister;
        if (editorRef && (editorRef === null || editorRef === void 0 ? void 0 : editorRef.current)) {
            unregister = editorRef === null || editorRef === void 0 ? void 0 : editorRef.current.registerCommand(KEY_ENTER_COMMAND, (event) => {
                //if shift key is not pressed then only will proceed for the handleEnter key action.
                if (!(event === null || event === void 0 ? void 0 : event.shiftKey) && allowSendonEnter) {
                    event.preventDefault();
                    handleEnterKey && handleEnterKey();
                }
                return true; // Allow other KEY_ENTER_COMMAND to run
            }, COMMAND_PRIORITY_LOW);
            const editableDiv = (_b = (_a = editorRef.current).getRootElement) === null || _b === void 0 ? void 0 : _b.call(_a);
            if (editableDiv) {
                editableDiv.setAttribute('aria-label', 'Chat message editor');
            }
        }
        return () => {
            unregister();
        };
    }, [editorRef, handleEnterKey, allowSendonEnter]);
    /**
     * getEditorStyle method to add styling for outbound editor
     * @example getEditorStyle();
     * @returns style class
     */
    const getEditorStyle = () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let style = Object.assign({}, styles.editorContainer);
        if (isEditorFocused) {
            style = Object.assign(Object.assign({}, style), styles.editorFocus);
        }
        return style;
    };
    /**
   * make editor focusable when click on editor.
   * @example handleEditorFocus()
   */
    const handleEditorFocus = () => {
        var _a;
        (_a = editorRef.current) === null || _a === void 0 ? void 0 : _a.focus();
    };
    return (_jsx(Box, Object.assign({ id: 'dropzone', "data-testid": 'dropzone', onClick: handleEditorFocus }, { children: _jsxs(LexicalComposer, Object.assign({ initialConfig: editorConfig }, { children: [_jsx("style", { children: plainTextEditorStyles }), _jsx(RichTextPlugin, { contentEditable: _jsxs(Box, Object.assign({ style: getEditorStyle(), ref: editorContainerRef }, { children: [(isReplyMessageSelected) && _jsx(CcfReplyToMessage, { caseId: caseId }), !isMobile && shouldDisplayDragDropZone && _jsx(CcfDragDropPastePlugin, { caseId: caseId, style: styles.dragNDrop, isRichTextEditor: false, onUploadAttachment: onUploadAttachment }), _jsx(ContentEditable, { spellCheck: true, onFocus: onFocus, onBlur: onBlur, style: styles.editorBody }), fileUploadPlugin ? _jsx(CcfBox, { children: fileUploadPlugin }) : null] })), placeholder: placeholder, ErrorBoundary: LexicalErrorBoundary }), _jsx(HistoryPlugin, {}), _jsx(OnChangePlugin, { onChange: onEditorStateChange }), _jsx(EditorRefPlugin, { editorRef: editorRef }), _jsx(CcfBox, { children: updatePlugin ? updatePlugin : null }), _jsxs(CcfBox, Object.assign({ sx: styles.plainTextToolbarBox }, { children: [" ", toolbarPlugin ? toolbarPlugin : null] }))] })) })));
}
//# sourceMappingURL=ccf-agent-chat-plain-text-editor.js.map