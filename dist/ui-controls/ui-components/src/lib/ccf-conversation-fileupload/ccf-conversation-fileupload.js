import { createElement as _createElement } from "react";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { toast, ToastContainer } from 'react-toastify';
import { CcfList, CcfAppToastMessage } from '@nice-devone/ui-controls';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { formatBytes } from '../../util/fileUtils';
import { getActiveContactInSelectedInteraction, getVoiceRecordingState } from '../ccf-assignment-panel/ccf-assignment-panel.slice';
import { getToastMsg, globalActions } from '../global.app.slice';
import CcfFileUploadItem from '../ccf-fileuploaditem/ccf-fileuploaditem';
import CcfAudioPlayer from '../ccf-audio-player/ccf-audio-player';
import { agentHiveActions, getActiveChat, getConversationInteraction } from '../ccf-agent-chat/ccf-agent-chat.slice';
const AUDIO_FILE_TYPES = ['audio/aac', 'audio/amr', 'audio/mpeg', 'audio/mp4', 'audio/ogg'];
/**
 * Used as file attachment container
 * @param props - CcfFileUploadProps
 * @returns JSX element for file upload container
 * @example -
 * ```
 * <CcfFileUpload {...{contactId: 1234567}}/>
 * ```
 */
export function CcfConversationFileUpload() {
    const activeContact = useSelector(getActiveContactInSelectedInteraction);
    const conversationInteraction = useSelector(getConversationInteraction);
    const activeChat = useSelector(getActiveChat);
    const isVoiceRecordingInProgress = useSelector(getVoiceRecordingState((activeContact === null || activeContact === void 0 ? void 0 : activeContact.caseId) || '', (activeContact === null || activeContact === void 0 ? void 0 : activeContact.interactionId) || ''));
    const dispatch = useDispatch();
    /**
     * Used to remove attachment based on attachment id
     * @param id - attachment id
     * @example -
     * ```
     * <CcfFileUploadItem
     * {...{removeAttachment: handleRemoveAttachment}}
     * />
     * ```
     */
    const handleRemoveAttachment = (id) => {
        dispatch(agentHiveActions.removeAttachment(id));
    };
    const fileSizeValidationMsg = useSelector(getToastMsg);
    const FILE_SIZE = '25MB';
    const FILE_SIZE_0MB = '0MB';
    useEffect(() => {
        if (fileSizeValidationMsg === FILE_SIZE || fileSizeValidationMsg === FILE_SIZE_0MB) {
            _jsx(ToastContainer, { enableMultiContainer: true, containerId: 'AppToastContainer', position: "top-center", newestOnTop: false, closeOnClick: true, rtl: false, pauseOnFocusLoss: true, hideProgressBar: true, draggable: true });
            toast.error(_jsx(CcfAppToastMessage, { type: "any", messageKey: fileSizeValidationMsg === FILE_SIZE ? 'fileSize25Mb' : 'fileSize0Mb' }), {
                autoClose: 5000,
                containerId: 'AppToastContainer',
            });
            dispatch(globalActions.setToastMsg(''));
        }
    }, [fileSizeValidationMsg]);
    // activeChat?.groupDetail.threadId || activeChat?.memberDetail.threadId || activeChat?.memberDetail.userId
    /**
     * Returns spinner while recording is in progress
     * @returns JSX element for circular progress
     * @example - checkForVoiceRecorderSpinner()
     */
    const checkForVoiceRecorderSpinner = () => {
        return (isVoiceRecordingInProgress && _jsx(CcfAudioPlayer, { isVoiceRecordingInprogress: true, audioPlayerWidth: '60%', audioUrl: '', isInbound: false }));
    };
    /**
     * Retrieves attachments from conversationInteraction based on activeChat thread or user ID
     * @param conversationInteraction - Object containing conversation interactions indexed by thread/user ID
     * @param activeChat - Active chat object containing group or member details
     * @returns Array of attachment objects if matching thread/user ID is found, empty array otherwise
     * @example
     * ```
     * const attachments = getAttachmentsFromActiveChat(conversationInteraction, activeChat);
     * ```
     */
    const getAttachmentsFromActiveChat = (conversationInteraction, activeChat) => {
        var _a, _b, _c, _d;
        const threadId = ((_a = activeChat === null || activeChat === void 0 ? void 0 : activeChat.groupDetail) === null || _a === void 0 ? void 0 : _a.threadId) || ((_b = activeChat === null || activeChat === void 0 ? void 0 : activeChat.memberDetail) === null || _b === void 0 ? void 0 : _b.threadId) || ((_c = activeChat === null || activeChat === void 0 ? void 0 : activeChat.memberDetail) === null || _c === void 0 ? void 0 : _c.userId);
        if (threadId && conversationInteraction[threadId]) {
            return ((_d = conversationInteraction[threadId]) === null || _d === void 0 ? void 0 : _d.attachments) || [];
        }
        return [];
    };
    const attachments = getAttachmentsFromActiveChat(conversationInteraction, activeChat);
    /**
     * Used to create listItem JSX based on the attachments
     * @example -
     * ```
     * {updateFileList()}
     * ```
     */
    const updateFileList = () => (_jsxs(CcfList, { children: [attachments === null || attachments === void 0 ? void 0 : attachments.filter((file) => !AUDIO_FILE_TYPES.includes(file.mimeType)).map((file) => (_createElement(CcfFileUploadItem, Object.assign({}, {
                id: file.id,
                name: file.name,
                size: formatBytes(file.size),
                uploaded: file.uploaded,
                removeAttachment: handleRemoveAttachment,
                isReplyCard: false,
            }, { key: file.name })))), attachments.filter((file) => AUDIO_FILE_TYPES.includes(file.mimeType)).map((file) => {
                var _a;
                return (_jsx(CcfAudioPlayer, { fileName: file.name, audioPlayerWidth: '100%', audioUrl: (_a = file.url) !== null && _a !== void 0 ? _a : '', attachmentId: file.id, shouldShowCloseIcon: true, handleRemoveAttachment: handleRemoveAttachment, isInbound: false }, file.name));
            })] }));
    return _jsxs(_Fragment, { children: [updateFileList(), checkForVoiceRecorderSpinner()] });
}
export default CcfConversationFileUpload;
//# sourceMappingURL=ccf-conversation-fileupload.js.map