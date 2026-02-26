import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { COMMAND_PRIORITY_LOW, KEY_ENTER_COMMAND } from 'lexical';
import { useTheme, Box, Divider } from '@mui/material';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { PlainTextPlugin } from '@lexical/react/LexicalPlainTextPlugin';
import { EditorRefPlugin } from '@lexical/react/LexicalEditorRefPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import ccfPlainTextEditorStyles, { editorTheme, plainTextEditorCSS } from './ccf-plain-text-editor.styles';
import { CcfBox } from '@nice-devone/ui-controls';
import { CcfDragDropPastePlugin } from '../ccf-drag-drop-plugin/ccf-drag-drop-paste-plugin';
import CcfReplyToMessage from '../../ccf-digital/ccf-reply-to-message-container/ccf-reply-to-message';
import { getSelectedMsg, getNonIncomingActiveContactInSelectedInteraction } from '../../ccf-assignment-panel/ccf-assignment-panel.slice';
// Checking current device mode (DragDrop type of feature is not supported on mobile devices)
const isMobile = /Android|iPhone|iPad/i.test(navigator.userAgent);
/**
 * Component displays Rich text Editor
 * @returns Rich text Editor
 * ```
 * @example
 * <CcfPlainTextEditor/>
 * ```
 */
export function CcfPlainTextEditor({ editorState, onBlur, onFocus, onEditorStateChange, isEditorFocused, toolbarPlugin, onError, updatePlugin, editorRef, fileUploadPlugin, editorContainerRef, caseId, onUploadAttachment, handleEnterKey, allowSendonEnter, shouldDisplayDragDropZone, }) {
    const theme = useTheme();
    const selectedReplyMsg = useSelector(getSelectedMsg(caseId));
    const nonIncomingActiveContactInSelectedInteraction = useSelector(getNonIncomingActiveContactInSelectedInteraction);
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
        let unregister;
        if (editorRef && (editorRef === null || editorRef === void 0 ? void 0 : editorRef.current)) {
            unregister = editorRef === null || editorRef === void 0 ? void 0 : editorRef.current.registerCommand(KEY_ENTER_COMMAND, (event) => {
                //if shift key is not pressed then only will proceed for the handleEnter key action.
                if (!(event === null || event === void 0 ? void 0 : event.shiftKey) && allowSendonEnter) {
                    handleEnterKey && handleEnterKey();
                    event.preventDefault();
                }
                return true; // Allow other KEY_ENTER_COMMAND to run
            }, COMMAND_PRIORITY_LOW);
        }
        return () => {
            unregister();
        };
    }, [nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.attachments]);
    useEffect(() => {
        if (isReplyMessageSelected) {
            // When the editor is not previously focused, we need to set focus on the editor.
            // This is to ensure that the editor is focused when a reply message is selected.
            handleEditorFocus();
        }
    }, [isReplyMessageSelected]);
    /**
     * getEditorStyle method to add styling for outbound editor
     * @example getEditorStyle();
     * @returns style class
     */
    const getEditorStyle = () => {
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
    /**
     * onChange handler for editor state change
     * @param editorState - current editor state
     * @param editor - lexical editor instance
     * @returns void
     * @example handleEditorChange(editorState, editor);
     */
    const handleEditorChange = (editorState, editor) => {
        onEditorStateChange(editorState, editor);
    };
    return (_jsx(Box, Object.assign({ id: 'dropzone', "data-testid": 'dropzone', onClick: handleEditorFocus }, { children: _jsxs(LexicalComposer, Object.assign({ initialConfig: editorConfig }, { children: [_jsx("style", { children: plainTextEditorStyles }), _jsx(PlainTextPlugin, { contentEditable: _jsxs(Box, Object.assign({ style: getEditorStyle(), ref: editorContainerRef, sx: styles === null || styles === void 0 ? void 0 : styles.plainTextContent }, { children: [(isReplyMessageSelected) && _jsx(CcfReplyToMessage, { caseId: caseId }), !isMobile && shouldDisplayDragDropZone && _jsx(CcfDragDropPastePlugin, { caseId: caseId, style: styles.dragNDrop, isRichTextEditor: false, onUploadAttachment: onUploadAttachment }), _jsx(ContentEditable, { spellCheck: true, onFocus: onFocus, onBlur: onBlur, style: styles.editorBody }), fileUploadPlugin ? _jsx(CcfBox, { children: fileUploadPlugin }) : null] })), placeholder: null, ErrorBoundary: LexicalErrorBoundary }), _jsx(OnChangePlugin, { onChange: handleEditorChange }), _jsx(EditorRefPlugin, { editorRef: editorRef }), _jsx(Divider, { variant: 'fullWidth', sx: { marginTop: '-0.375rem' } }), _jsx(CcfBox, { children: updatePlugin ? updatePlugin : null }), _jsxs(CcfBox, Object.assign({ sx: styles.plainTextToolbarBox }, { children: [" ", toolbarPlugin ? toolbarPlugin : null] }))] })) })));
}
//# sourceMappingURL=ccf-plain-text-editor.js.map