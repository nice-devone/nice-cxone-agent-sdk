import { memo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { $createRangeSelection, $getRoot, $getSelection, $insertNodes, $setSelection } from 'lexical';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $generateNodesFromDOM } from '@lexical/html';
import { getIsQReplySent, getSentQReply } from '../../ccf-app-space/ccf-app-space.slice';
import { getIsResponseSent, getSentBestResponse } from '../../ccf-agent-copilot/ccf-agent-copilot-container.slice';
import { CcfContactEditorAction, getEmailEditorContentToInsert } from '../ccf-contact-editor.slice';
import { CcfAssignmentAction, getCxoneDigitalContactUserSavedProperties } from '../../ccf-assignment-panel/ccf-assignment-panel.slice';
import { getIntegratedAgent } from '../../global.app.slice';
/**
 * Component enables the edior draft space to be updated by external action
 * @returns no jsx
 * ```
 * @example
 * <UpdatePlugin/>
 * ```
 */
export const UpdateEditorContentPlugin = memo(({ caseId, wysiwygEnabled, focusEditor }) => {
    const isQuickReplySent = useSelector(getIsQReplySent);
    const isNextBestResponseSent = useSelector(getIsResponseSent(caseId));
    const emailEditorContentToInsert = useSelector(getEmailEditorContentToInsert(caseId));
    //fetch selected QR from redux
    const sentQuickReply = useSelector(getSentQReply);
    const sentNextBestResponse = useSelector(getSentBestResponse(caseId));
    const responseInserted = useSelector(getIsResponseSent(caseId));
    const isQReplySent = useSelector(getIsQReplySent);
    const dispatch = useDispatch();
    const sentReply = responseInserted && sentNextBestResponse || isQReplySent && sentQuickReply || emailEditorContentToInsert;
    const [editor] = useLexicalComposerContext();
    const digitalContactUserSavedProperties = useSelector(getCxoneDigitalContactUserSavedProperties);
    const selectedDigitalContactUserSavedProperties = digitalContactUserSavedProperties[caseId];
    const isIntegratedAgent = useSelector(getIntegratedAgent);
    const approvalMessageDraftId = selectedDigitalContactUserSavedProperties === null || selectedDigitalContactUserSavedProperties === void 0 ? void 0 : selectedDigitalContactUserSavedProperties.messageDraftId;
    /**
   * Method to extract dom nodes.To insert the content inside the rich text editor we will use this parseAndInsertContent method
   * @param value - value need to be updated to the lexical editor
   * @param shouldClearEditor - boolean value to clear the editor
   * @example parseAndInsertContent(value,true);
  */
    const parseAndInsertContent = (value, shouldClearEditor) => {
        var _a, _b, _c, _d;
        const parser = new DOMParser();
        const dom = parser.parseFromString(value, 'text/html');
        const domNode = $generateNodesFromDOM(editor, dom);
        if (shouldClearEditor)
            $getRoot().clear();
        $insertNodes(domNode);
        //Place the cursor at the top of the editor while forwarding the email
        if (emailEditorContentToInsert) {
            const firstChild = $getRoot().getFirstChild();
            if (firstChild) {
                if (firstChild.getType() === 'text') {
                    const selection = $createRangeSelection();
                    (_a = selection === null || selection === void 0 ? void 0 : selection.anchor) === null || _a === void 0 ? void 0 : _a.set(firstChild.getKey(), 0, 'text');
                    (_b = selection === null || selection === void 0 ? void 0 : selection.focus) === null || _b === void 0 ? void 0 : _b.set(firstChild.getKey(), 0, 'text');
                    $setSelection(selection);
                }
                else {
                    const selection = $createRangeSelection();
                    (_c = selection === null || selection === void 0 ? void 0 : selection.anchor) === null || _c === void 0 ? void 0 : _c.set(firstChild.getKey(), 0, 'element');
                    (_d = selection === null || selection === void 0 ? void 0 : selection.focus) === null || _d === void 0 ? void 0 : _d.set(firstChild.getKey(), 0, 'element');
                    $setSelection(selection);
                }
            }
            ;
        }
    };
    /**
   * Method to update lexical editor state value
   * @param value - value need to be updated to the lexical editor
   * @example updateEditorValue(value);
  */
    const updateEditorValue = (value, isQuickReply, isCopilotResponse = false, isRejectedMessageCopied = false) => {
        editor.focus();
        editor.update(() => {
            let selection = $getSelection();
            if (value) {
                // For rich text editor related quick replies, approval flow content, and forwarded content we will parse the content and insert it into the editor.
                if (wysiwygEnabled && (isQuickReply || emailEditorContentToInsert || approvalMessageDraftId)) {
                    // in case of failed to send email messages we need to bring the failed message content into editor by generating dom node
                    const contentToInsert = emailEditorContentToInsert || value;
                    const shouldClearEditor = emailEditorContentToInsert ? true : false;
                    parseAndInsertContent(contentToInsert, shouldClearEditor);
                    // Changes is to update the emailEditorContentToInsert from redux store after insert the text to the editor, 
                    // any time text is inserted into the editor, the emailEditorContentToInsert in the Redux store will automatically hold the latest content.
                    if (emailEditorContentToInsert) {
                        dispatch(CcfContactEditorAction.updateEditorStateForEmail({ caseId: caseId, emailEditorContentToInsert: '' }));
                    }
                }
                else if (isCopilotResponse) {
                    parseAndInsertContent(value + '<br />', false);
                }
                else if (selection) { // To insert the content inside the plain text editor
                    if (!isQuickReply && !isRejectedMessageCopied)
                        $getRoot().clear(); // Clear the editor if response is not quick reply and not copied message// Clear the editor if response is not quick reply
                    selection.insertText(String(value));
                    selection = null;
                }
            }
        });
    };
    // If the QR is selected from quick Replies tab, this will trigger to update the editor state with selected QR
    useEffect(() => {
        var _a, _b, _c, _d, _e;
        if (isQuickReplySent || emailEditorContentToInsert) {
            if (isQuickReplySent && isIntegratedAgent) {
                dispatch(CcfAssignmentAction.updateDigitalUserSavedPropertiesOfACase({
                    caseId: caseId,
                    fieldsToUpdate: {
                        lexicalEditorState: sentReply,
                        receiverTo: (_a = selectedDigitalContactUserSavedProperties === null || selectedDigitalContactUserSavedProperties === void 0 ? void 0 : selectedDigitalContactUserSavedProperties.receiverTo) !== null && _a !== void 0 ? _a : '',
                        receiverCc: (_b = selectedDigitalContactUserSavedProperties === null || selectedDigitalContactUserSavedProperties === void 0 ? void 0 : selectedDigitalContactUserSavedProperties.receiverCc) !== null && _b !== void 0 ? _b : '',
                        receiverBcc: (_c = selectedDigitalContactUserSavedProperties === null || selectedDigitalContactUserSavedProperties === void 0 ? void 0 : selectedDigitalContactUserSavedProperties.receiverBcc) !== null && _c !== void 0 ? _c : '',
                        sender: (_d = selectedDigitalContactUserSavedProperties === null || selectedDigitalContactUserSavedProperties === void 0 ? void 0 : selectedDigitalContactUserSavedProperties.sender) !== null && _d !== void 0 ? _d : '',
                        subject: (_e = selectedDigitalContactUserSavedProperties === null || selectedDigitalContactUserSavedProperties === void 0 ? void 0 : selectedDigitalContactUserSavedProperties.subject) !== null && _e !== void 0 ? _e : '',
                    },
                }));
            }
            updateEditorValue(sentReply, true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isQuickReplySent, emailEditorContentToInsert]);
    //whenever there is text inserted it will trigger
    useEffect(() => {
        if (isNextBestResponseSent && sentReply) {
            isNextBestResponseSent ? updateEditorValue(sentReply, false, true) : updateEditorValue(sentReply, true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isNextBestResponseSent, sentReply]);
    /**
     *
     * @param editor - editorState
     * @returns - editor content
     * @example - getEditorValue(editor)
     */
    const getEditorValue = (editor) => {
        let content = '';
        editor.update(() => {
            const root = $getRoot();
            content = root.getTextContent(); // Plain text content
        });
        return content;
    };
    /**
     * When their is editor draft state present weather in redux store or from local storage then we will also need to update the lexical editor state
     */
    useEffect(() => {
        if (focusEditor) {
            if (selectedDigitalContactUserSavedProperties) {
                if (selectedDigitalContactUserSavedProperties === null || selectedDigitalContactUserSavedProperties === void 0 ? void 0 : selectedDigitalContactUserSavedProperties.lexicalEditorState) {
                    if (typeof (selectedDigitalContactUserSavedProperties === null || selectedDigitalContactUserSavedProperties === void 0 ? void 0 : selectedDigitalContactUserSavedProperties.lexicalEditorState) == 'string') { // if the editorState is of type string then we will use the updateEditorValue
                        if ((selectedDigitalContactUserSavedProperties === null || selectedDigitalContactUserSavedProperties === void 0 ? void 0 : selectedDigitalContactUserSavedProperties.lexicalEditorState) !== getEditorValue(editor) || (selectedDigitalContactUserSavedProperties === null || selectedDigitalContactUserSavedProperties === void 0 ? void 0 : selectedDigitalContactUserSavedProperties.isRejectedMessageCopied)) { // For plain editor copied message should be pasted multiple times in editor) {
                            updateEditorValue(selectedDigitalContactUserSavedProperties === null || selectedDigitalContactUserSavedProperties === void 0 ? void 0 : selectedDigitalContactUserSavedProperties.lexicalEditorState, isQuickReplySent, false, selectedDigitalContactUserSavedProperties === null || selectedDigitalContactUserSavedProperties === void 0 ? void 0 : selectedDigitalContactUserSavedProperties.isRejectedMessageCopied);
                        }
                    }
                    else { // if the editorState is of EditorState type JSON then we will use the setEditorState method to update the state
                        const editorState = editor.parseEditorState(JSON.stringify(selectedDigitalContactUserSavedProperties === null || selectedDigitalContactUserSavedProperties === void 0 ? void 0 : selectedDigitalContactUserSavedProperties.lexicalEditorState));
                        editor.setEditorState(editorState);
                    }
                    editor.focus();
                }
            }
        }
    }, [selectedDigitalContactUserSavedProperties === null || selectedDigitalContactUserSavedProperties === void 0 ? void 0 : selectedDigitalContactUserSavedProperties.lexicalEditorState]);
    return null;
});
//# sourceMappingURL=ccf-editor-update-plugin.js.map