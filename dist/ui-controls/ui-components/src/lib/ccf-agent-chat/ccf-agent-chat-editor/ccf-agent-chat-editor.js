import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, useTheme, Button } from '@mui/material';
import { $getRoot } from 'lexical';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getContactEditorState } from '../../ccf-editor/ccf-contact-editor.slice';
import { UpdateEditorContentPlugin } from '../../ccf-editor/ccf-editor-update-plugin/ccf-editor-update-plugin';
import CcfAgentChatEditorToolbarPlugin from './ccf-agent-chat-editor-toolbar';
import ccfAgentChatStyles from '../ccf-agent-chat.styles';
import { CcfTypography, useTranslator } from '@nice-devone/ui-controls';
import { CcfLogger } from '@nice-devone/agent-sdk';
import { AGENT_CHAT_ICON, agentChatIconList } from '../ccf-agent-chat-icons/ccf-agent-chat-icon-list';
import { CcfAgentChatPlainTextEditor } from './ccf-agent-chat-plain-text-editor';
import { getActiveChat, getConversationInteraction, sendConversationReply, updateFileToBeUploadedForThread } from '../ccf-agent-chat.slice';
import { LocalStorageHelper, StorageKeys } from '@nice-devone/core-sdk';
import { ConversationsCategory } from '@nice-devone/user-chat-sdk';
import { getCurrentDate } from '@nice-devone/common-sdk';
import { $generateHtmlFromNodes } from '@lexical/html';
import { CcfConversationFileUpload } from '../../ccf-conversation-fileupload/ccf-conversation-fileupload';
import { isFeatureEnabled } from '../../../util/featureToggleUtils';
const ccfLogger = new CcfLogger('App.react-ui-component', 'ccf-agent-chat-editor');
/**
 * Component for ccf agents chat editor
 * @example - <CcfAgentChatEditor />
 * @returns
 */
export const CcfAgentChatEditor = () => {
    const plainTextEditorContent = useRef('');
    const isTextAddedToEditor = useRef(false);
    const caseId = ''; //TO-DO: This will be replaced by threadId in future
    const editRef = useRef(null);
    const editorContainerRef = useRef(null);
    const editorState = useSelector(getContactEditorState(caseId));
    const [isSendButtonEnabled, setIsSendButtonEnabled] = useState(false);
    const theme = useTheme();
    const styles = ccfAgentChatStyles(theme);
    const [translate] = useTranslator();
    const dispatch = useDispatch();
    const activeChat = useSelector(getActiveChat);
    const conversationInteraction = useSelector(getConversationInteraction);
    const userInfo = LocalStorageHelper.getItem(StorageKeys.USER_INFO, true);
    const hasAbilityToSendFiles = isFeatureEnabled("release-conversations-file-upload-AW-48053" /* FeatureToggles.FILE_UPLOAD_FEATURE_TOGGLE */);
    useEffect(() => {
        // Reset the editor state when the active member changes
        if (editRef === null || editRef === void 0 ? void 0 : editRef.current) {
            const currentEditor = editRef.current;
            currentEditor.update(() => {
                const root = $getRoot();
                root.clear(); // Clear the editor content
            }, { discrete: true });
            // Reset the plain text editor content and send button state
            plainTextEditorContent.current = '';
            isTextAddedToEditor.current = false;
            setIsSendButtonEnabled(false);
        }
    }, [activeChat]);
    useEffect(() => {
        var _a, _b, _c;
        // Trigger re-render when activeChat.memberDetail changes
        if ((activeChat === null || activeChat === void 0 ? void 0 : activeChat.category) === ConversationsCategory.NEWCHAT) {
            setIsSendButtonEnabled(isEditorHasText() && ((_c = (_b = (_a = activeChat === null || activeChat === void 0 ? void 0 : activeChat.memberDetail) === null || _a === void 0 ? void 0 : _a.userId) === null || _b === void 0 ? void 0 : _b.length) !== null && _c !== void 0 ? _c : 0) > 0);
        }
        else {
            setIsSendButtonEnabled(isEditorHasText());
        }
    }, [activeChat]);
    /**
     * Method to handle key press events in the editor
     * @param event - keyboard event
     * @example handleKeyPress(event);
     */
    const handleKeyPress = (event) => {
        if (event.key === 'Enter' && !event.shiftKey && isSendButtonEnabled) {
            event.preventDefault(); // Prevent default behavior of adding a new line
            handleSendChat(); // Trigger send message
        }
    };
    /**
     * Method to check if all attachments are uploaded for the active chat thread
     * @param activeChat - Active chat details containing thread information
     * @param conversationInteraction - Array of conversation interactions containing attachments
     * @returns boolean
     * @example areAllAttachmentsUploaded(activeChat, conversationInteraction);
     */
    const areAllAttachmentsUploaded = (activeChat, conversationInteraction) => {
        var _a, _b, _c, _d;
        const threadId = ((_a = activeChat === null || activeChat === void 0 ? void 0 : activeChat.groupDetail) === null || _a === void 0 ? void 0 : _a.threadId) || ((_b = activeChat === null || activeChat === void 0 ? void 0 : activeChat.memberDetail) === null || _b === void 0 ? void 0 : _b.threadId) || ((_c = activeChat === null || activeChat === void 0 ? void 0 : activeChat.memberDetail) === null || _c === void 0 ? void 0 : _c.userId);
        if (!threadId || !conversationInteraction || !conversationInteraction[threadId]) {
            return false; // No thread or no attachments means all are "uploaded"
        }
        const threadAttachments = ((_d = conversationInteraction[threadId]) === null || _d === void 0 ? void 0 : _d.attachments) || [];
        if (threadAttachments.length === 0) {
            return false; // No attachments means all are uploaded
        }
        return threadAttachments.every((attachment) => attachment.uploaded === true);
    };
    useEffect(() => {
        var _a, _b, _c;
        const allUploaded = areAllAttachmentsUploaded(activeChat, conversationInteraction);
        if ((activeChat === null || activeChat === void 0 ? void 0 : activeChat.category) === ConversationsCategory.NEWCHAT) {
            setIsSendButtonEnabled(isEditorHasText() && ((_c = (_b = (_a = activeChat === null || activeChat === void 0 ? void 0 : activeChat.memberDetail) === null || _a === void 0 ? void 0 : _a.userId) === null || _b === void 0 ? void 0 : _b.length) !== null && _c !== void 0 ? _c : 0) > 0 || allUploaded);
        }
        else {
            setIsSendButtonEnabled(isEditorHasText() || allUploaded);
        }
    }, [activeChat, conversationInteraction, editorState]);
    /**
     * Method to check if attachments are present for the active chat thread
     * @param activeChat - Active chat details containing thread information
     * @param conversationInteraction - Array of conversation interactions containing attachments
     * @returns boolean - true if attachments are present, false otherwise
     * @example hasAttachmentsForThread(activeChat, conversationInteraction);
     */
    const hasAttachmentsForThread = (activeChat, conversationInteraction) => {
        var _a, _b, _c, _d;
        const threadId = ((_a = activeChat === null || activeChat === void 0 ? void 0 : activeChat.groupDetail) === null || _a === void 0 ? void 0 : _a.threadId) || ((_b = activeChat === null || activeChat === void 0 ? void 0 : activeChat.memberDetail) === null || _b === void 0 ? void 0 : _b.threadId) || ((_c = activeChat === null || activeChat === void 0 ? void 0 : activeChat.memberDetail) === null || _c === void 0 ? void 0 : _c.userId);
        if (!threadId || !conversationInteraction || !conversationInteraction[threadId]) {
            return false;
        }
        const threadAttachments = ((_d = conversationInteraction[threadId]) === null || _d === void 0 ? void 0 : _d.attachments) || [];
        return threadAttachments.length > 0;
    };
    /**
     * Method to get attachments for the active chat thread
     * @param activeChat - Active chat details containing thread information
     * @param conversationInteraction - Array of conversation interactions containing attachments
     * @returns Array of attachment objects with friendlyName, url, and isInline properties
     * @example getAttachmentsForThread(activeChat, conversationInteraction);
     */
    const getAttachmentsForThread = (activeChat, conversationInteraction) => {
        var _a, _b, _c, _d;
        const threadId = ((_a = activeChat === null || activeChat === void 0 ? void 0 : activeChat.groupDetail) === null || _a === void 0 ? void 0 : _a.threadId) || ((_b = activeChat === null || activeChat === void 0 ? void 0 : activeChat.memberDetail) === null || _b === void 0 ? void 0 : _b.threadId) || ((_c = activeChat === null || activeChat === void 0 ? void 0 : activeChat.memberDetail) === null || _c === void 0 ? void 0 : _c.userId);
        if (!threadId || !conversationInteraction || !conversationInteraction[threadId]) {
            return [];
        }
        const threadAttachments = ((_d = conversationInteraction[threadId]) === null || _d === void 0 ? void 0 : _d.attachments) || [];
        return threadAttachments.map((attachment) => ({
            friendlyName: attachment.name || '',
            url: attachment.url || '',
            isInline: false,
        }));
    };
    /**
     * Method to handle send message click
     * @example handleSendChat(fileList);
     */
    const handleSendChat = () => {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        const messageObject = {
            'attachments': hasAbilityToSendFiles ? getAttachmentsForThread(activeChat, conversationInteraction) : [],
            'messageContent': {
                'type': 'TEXT',
                'payload': {
                    'text': plainTextEditorContent.current,
                    'postback': '',
                    'elements': [],
                },
            },
            'contact': {
                'status': 'pending',
            },
            'recipients': [
                {
                    'idOnExternalPlatform': ((_a = activeChat === null || activeChat === void 0 ? void 0 : activeChat.memberDetail) === null || _a === void 0 ? void 0 : _a.userId) || '',
                    'name': `${((_b = activeChat === null || activeChat === void 0 ? void 0 : activeChat.memberDetail) === null || _b === void 0 ? void 0 : _b.firstName) || ''} ${((_c = activeChat === null || activeChat === void 0 ? void 0 : activeChat.memberDetail) === null || _c === void 0 ? void 0 : _c.lastName) || ''}`.trim(),
                    'isPrimary': true,
                    'isPrivate': false,
                }
            ],
            'direction': 'outbound',
            'createdAtWithMilliseconds': getCurrentDate(),
        };
        if (activeChat.category === ConversationsCategory.GROUP) {
            const recipientsList = [];
            if ((_d = activeChat === null || activeChat === void 0 ? void 0 : activeChat.groupDetail) === null || _d === void 0 ? void 0 : _d.threadId) {
                messageObject.thread = {
                    'idOnExternalPlatform': ((_e = activeChat === null || activeChat === void 0 ? void 0 : activeChat.groupDetail) === null || _e === void 0 ? void 0 : _e.threadId) || '',
                };
                const membersList = ((_f = activeChat === null || activeChat === void 0 ? void 0 : activeChat.groupDetail) === null || _f === void 0 ? void 0 : _f.members) || [];
                membersList === null || membersList === void 0 ? void 0 : membersList.forEach((member) => {
                    if (member.userId !== userInfo.userId) {
                        const sender = {
                            'idOnExternalPlatform': (member === null || member === void 0 ? void 0 : member.userId) || '',
                            'name': (member === null || member === void 0 ? void 0 : member.firstName) || (member === null || member === void 0 ? void 0 : member.lastName) || '',
                            'isPrimary': true,
                            'isPrivate': false,
                        };
                        recipientsList.push(sender);
                    }
                });
            }
            else {
                const membersList = ((_g = activeChat === null || activeChat === void 0 ? void 0 : activeChat.groupDetail) === null || _g === void 0 ? void 0 : _g.members) || [];
                membersList === null || membersList === void 0 ? void 0 : membersList.forEach((member) => {
                    if (member.userId !== userInfo.userId) {
                        const sender = {
                            'idOnExternalPlatform': (member === null || member === void 0 ? void 0 : member.userId) || '',
                            'name': (member === null || member === void 0 ? void 0 : member.firstName) || (member === null || member === void 0 ? void 0 : member.lastName) || '',
                            'isPrimary': true,
                            'isPrivate': false,
                        };
                        recipientsList.push(sender);
                    }
                });
            }
            messageObject.recipients = JSON.parse(JSON.stringify(recipientsList));
        }
        dispatch(sendConversationReply({ outboundMessages: messageObject, category: activeChat.category, groupId: ((_h = activeChat === null || activeChat === void 0 ? void 0 : activeChat.groupDetail) === null || _h === void 0 ? void 0 : _h.groupId) || '' }));
        const currentEditor = editRef === null || editRef === void 0 ? void 0 : editRef.current;
        currentEditor === null || currentEditor === void 0 ? void 0 : currentEditor.update(() => {
            const root = $getRoot();
            root.clear();
        }, { discrete: true });
    };
    /**
     * Method to handle upload attachment
     * @param fileList - file list
     * @example uploadAttachment();
     */
    const uploadAttachment = (fileList) => {
        //DEV NOTE: uploadAttachment code will be placed
        hasAbilityToSendFiles && dispatch(updateFileToBeUploadedForThread({ fileList }));
    };
    /**
     * Method to handle editor error
     *  @param error - error
     * @example handleEditorError(error);
     */
    const handleEditorError = (error) => {
        ccfLogger.error('handleEditorError', `error while performing action on editor - ${JSON.stringify(error)}`);
    };
    /**
     * Method to check editor has text
     * @example isEditorHasText();
     */
    const isEditorHasText = () => {
        return isTextAddedToEditor === null || isTextAddedToEditor === void 0 ? void 0 : isTextAddedToEditor.current; // Checking editor content
    };
    /**
     * Method to update editor state locally in case of plain text editor
     * @param editorState - editor state
     * @param editor - editor
     * @example updateLocalEditorState(editorState);
     */
    const updateLocalEditorState = (editorState, editor) => {
        const isRichTextEnabled = true; //DEV Note: This will be replaced by a prop in future
        editor.update(() => {
            var _a, _b, _c, _d, _e, _f, _g;
            const parsedLexicalString = isRichTextEnabled ? $generateHtmlFromNodes(editor, null) : (_b = (_a = $getRoot()) === null || _a === void 0 ? void 0 : _a.getTextContent()) === null || _b === void 0 ? void 0 : _b.trim();
            plainTextEditorContent.current = parsedLexicalString;
            if ((_c = $getRoot()) === null || _c === void 0 ? void 0 : _c.getFirstChild()) {
                const textContent = (_d = $getRoot().getTextContent()) === null || _d === void 0 ? void 0 : _d.trim();
                isTextAddedToEditor.current = textContent && (textContent === null || textContent === void 0 ? void 0 : textContent.length) > 0 ? true : false;
            }
            if ((activeChat === null || activeChat === void 0 ? void 0 : activeChat.category) === ConversationsCategory.NEWCHAT) {
                setIsSendButtonEnabled(isEditorHasText() && ((_g = (_f = (_e = activeChat === null || activeChat === void 0 ? void 0 : activeChat.memberDetail) === null || _e === void 0 ? void 0 : _e.userId) === null || _f === void 0 ? void 0 : _f.length) !== null && _g !== void 0 ? _g : 0) > 0);
            }
            else {
                setIsSendButtonEnabled(isEditorHasText());
            }
            ccfLogger.info('editorState', JSON.stringify(editorState));
        });
    };
    /**
     * return the placeholder text
     * @example - getPlaceholderText()
     * @returns placeholder text
     */
    const getPlaceholderText = () => {
        var _a, _b, _c, _d;
        const hasAttachments = hasAttachmentsForThread(activeChat, conversationInteraction);
        let text = '';
        if (hasAttachments) {
            return text;
        }
        if ((activeChat === null || activeChat === void 0 ? void 0 : activeChat.category) === ConversationsCategory.NEWCHAT) {
            text = translate('newMessage') + '...';
        }
        else if ((activeChat === null || activeChat === void 0 ? void 0 : activeChat.category) === ConversationsCategory.GROUP) {
            text = `${translate('chatWith')} ${((_a = activeChat === null || activeChat === void 0 ? void 0 : activeChat.groupDetail) === null || _a === void 0 ? void 0 : _a.groupName) || ''}`;
        }
        else {
            const firstName = (_b = activeChat === null || activeChat === void 0 ? void 0 : activeChat.memberDetail) === null || _b === void 0 ? void 0 : _b.firstName;
            const lastName = (_c = activeChat === null || activeChat === void 0 ? void 0 : activeChat.memberDetail) === null || _c === void 0 ? void 0 : _c.lastName;
            if (firstName || lastName) {
                text = `${translate('chatWith')} ${[firstName, lastName].filter(Boolean).join(' ')}`;
            }
            else {
                text = `${translate('chatWith')} ${(_d = activeChat === null || activeChat === void 0 ? void 0 : activeChat.memberDetail) === null || _d === void 0 ? void 0 : _d.name}`;
            }
        }
        return text;
    };
    return (_jsxs(Box, Object.assign({ sx: styles.AgentChatEditor, "data-testid": 'agent-chat-editor' }, { children: [_jsx(CcfAgentChatPlainTextEditor, { onEditorStateChange: updateLocalEditorState, onError: handleEditorError, editorRef: editRef, allowSendonEnter: true, handleEnterKey: handleSendChat, shouldDisplayDragDropZone: hasAbilityToSendFiles, editorContainerRef: editorContainerRef, caseId: caseId, onUploadAttachment: uploadAttachment, editorState: editorState, toolbarPlugin: _jsx(CcfAgentChatEditorToolbarPlugin, { showRichToolBarButtons: true, onUploadAttachment: uploadAttachment, showFileUploadButton: hasAbilityToSendFiles, caseId: caseId }), fileUploadPlugin: _jsx(CcfConversationFileUpload, {}), updatePlugin: _jsx(UpdateEditorContentPlugin, { caseId: caseId, wysiwygEnabled: false, focusEditor: true }), placeholder: _jsx(CcfTypography, Object.assign({ sx: Object.assign(Object.assign({}, styles.AgentChatNormalText), styles.EditorPlaceholder) }, { children: getPlaceholderText() })) }), _jsx(Box, Object.assign({ sx: styles.SendBtn }, { children: _jsxs(Button, Object.assign({ variant: "contained", size: "medium", onClick: handleSendChat, disabled: !isSendButtonEnabled, sx: { marginRight: 1, gap: '12px' } }, { children: [translate('send'), isSendButtonEnabled ? (_jsx(CcfTypography, { children: agentChatIconList[AGENT_CHAT_ICON.SEND_WHITE]('') })) : (_jsx(CcfTypography, { children: agentChatIconList[AGENT_CHAT_ICON.SEND_GREY]('') }))] })) }))] })));
};
export default CcfAgentChatEditor;
//# sourceMappingURL=ccf-agent-chat-editor.js.map