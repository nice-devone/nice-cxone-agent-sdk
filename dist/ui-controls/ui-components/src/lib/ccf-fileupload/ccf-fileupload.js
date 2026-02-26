import { createElement as _createElement } from "react";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { toast } from 'react-toastify';
import { CcfList, CcfAppToastMessage } from '@nice-devone/ui-controls';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { formatBytes } from '../../util/fileUtils';
import { CcfAssignmentAction, getActiveContactInSelectedInteraction, getNonIncomingActiveContactInSelectedInteraction, getVoiceRecordingState } from '../ccf-assignment-panel/ccf-assignment-panel.slice';
import { getToastMsg, globalActions } from '../global.app.slice';
import CcfFileUploadItem from '../ccf-fileuploaditem/ccf-fileuploaditem';
import CcfAudioPlayer from '../ccf-audio-player/ccf-audio-player';
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
export function CcfFileUpload() {
    const nonIncomingActiveContactInSelectedInteraction = useSelector(getNonIncomingActiveContactInSelectedInteraction);
    const activeContact = useSelector(getActiveContactInSelectedInteraction);
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
        dispatch(CcfAssignmentAction.removeAttachment(id));
    };
    const fileSizeValidationMsg = useSelector(getToastMsg);
    const FILE_SIZES = [
        '0Mb',
        '40Mb',
        '100Mb'
    ];
    useEffect(() => {
        if (FILE_SIZES.includes(fileSizeValidationMsg)) {
            const messageKey = `fileSize${fileSizeValidationMsg}`;
            toast.error(_jsx(CcfAppToastMessage, { type: "any", messageKey: messageKey }), {
                autoClose: 2000,
                containerId: 'ComponentToastContainer',
            });
            dispatch(globalActions.setToastMsg(''));
        }
    }, [fileSizeValidationMsg]);
    /**
   * Returns spinner while recording is in progress
   * @returns JSX element for circular progress
   * @example - checkForVoiceRecorderSpinner()
   */
    const checkForVoiceRecorderSpinner = () => {
        return (isVoiceRecordingInProgress && _jsx(CcfAudioPlayer, { isVoiceRecordingInprogress: true, audioPlayerWidth: '60%', audioUrl: '', isInbound: false }));
    };
    /**
     * Used to create listItem JSX based on the attachments
     * @example -
     * ```
     * {updateFileList()}
     * ```
     */
    const updateFileList = () => nonIncomingActiveContactInSelectedInteraction && nonIncomingActiveContactInSelectedInteraction.attachments && nonIncomingActiveContactInSelectedInteraction.attachments.length > 0 && (_jsxs(CcfList, { children: [nonIncomingActiveContactInSelectedInteraction.attachments.filter(file => !AUDIO_FILE_TYPES.includes(file.mimeType)).map((file) => (_createElement(CcfFileUploadItem, Object.assign({}, {
                id: file.id,
                name: file.name,
                size: formatBytes(file.size),
                uploaded: file.uploaded,
                removeAttachment: handleRemoveAttachment,
                isReplyCard: false,
            }, { key: file.name })))), nonIncomingActiveContactInSelectedInteraction.attachments.filter(file => AUDIO_FILE_TYPES.includes(file.mimeType)).map((file) => {
                var _a;
                return (_jsx(CcfAudioPlayer, { fileName: file.name, audioPlayerWidth: '100%', audioUrl: (_a = file.url) !== null && _a !== void 0 ? _a : '', attachmentId: file.id, shouldShowCloseIcon: true, handleRemoveAttachment: handleRemoveAttachment, isInbound: false }, file.name));
            })] }));
    return _jsxs(_Fragment, { children: [updateFileList(), checkForVoiceRecorderSpinner()] });
}
export default CcfFileUpload;
//# sourceMappingURL=ccf-fileupload.js.map