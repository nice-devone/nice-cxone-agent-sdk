import { __awaiter } from "tslib";
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, useTheme } from '@mui/material';
import { ATTACHMENT_ICON_NAME } from '../ccf-icon/ccf-icon-list';
import { CcfAssignmentAction, getNonIncomingActiveContactInSelectedInteraction, updateFileToBeUploaded, voiceContactSelector } from '../ccf-assignment-panel/ccf-assignment-panel.slice';
import CcfIcon, { ATTACHMENT_ICON_SIZE } from '../ccf-icon/ccf-icon';
import { CcfTooltip, useTranslator } from '@nice-devone/ui-controls';
import { eventBus } from '../ccf-audio-player/ccf-audio-player-util';
import { globalActions } from '../global.app.slice';
import { CallContactEventStatus } from '@nice-devone/core-sdk';
import { CcfLogger } from '@nice-devone/agent-sdk';
import { getFileNameForAudioAttachment } from '../ccf-assignment-panel/ccf-assignment-utils';
import VoiceRecorderStyles from './ccf-voice-recorder.style';
/**
 * Creating instance for recorder
 */
//DEV NOTE - As we have removed the direct import of Recoreder from vmsg, we are creating the instance of recorder here by giving type as any
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let recorderInstance;
/**
 * Component to display voice recorder
 * @returns returns voice recorder
 * @example
 * ```
 * <CcfVoiceRecorder enableRecording={props.enableRecording}
 * ```
 */
export function CcfVoiceRecorder({ enableRecording, }) {
    const [isRecordingStarted, setIsRecordingStarted] = useState(false);
    const dispatch = useDispatch();
    const [translate] = useTranslator();
    const theme = useTheme();
    const styles = VoiceRecorderStyles(theme);
    const ccfLogger = new CcfLogger('App.react-ui-component', 'ccf-voice-recorder');
    const isActiveVoiceCall = useSelector(voiceContactSelector);
    const [isActiveCall, setIsActiveCall] = useState(false);
    const nonIncomingActiveContactInSelectedInteraction = useSelector(getNonIncomingActiveContactInSelectedInteraction);
    /**
       * Method to handle upload attachment
       * @param fileList - file list
       * @example uploadAttachment(fileList);
       */
    const uploadAttachment = (fileList) => {
        dispatch(updateFileToBeUploaded(fileList));
    };
    /**
       * Method to check microphone permission
       * @example checkMicrophonePermission()
       */
    const checkMicrophonePermission = () => {
        var _a;
        // Check permission using Permissions API
        (_a = navigator === null || navigator === void 0 ? void 0 : navigator.permissions) === null || _a === void 0 ? void 0 : _a.query({ name: 'microphone' }).then(permissionStatus => {
            if (permissionStatus.state === 'granted') {
                startRecording();
            }
            else {
                dispatch(globalActions.updateAlertMessage({
                    message: translate('mediaDeviceAccessDenied'),
                    subMessage: translate('mediaDeviceAccessDeniedSubMsg'),
                    type: translate('error'),
                }));
            }
        }).catch(error => {
            ccfLogger.error('Permission API not supported or error occurred:', error || '');
        });
    };
    /**
   * @remarks - Method to initialize recorder
   * @example - initializeRecorder()
   */
    const initializeRecorder = () => __awaiter(this, void 0, void 0, function* () {
        if (!recorderInstance) {
            const { Recorder } = yield import('vmsg');
            recorderInstance = new Recorder({ wasmURL: 'https://unpkg.com/vmsg@0.3.0/vmsg.wasm' });
        }
    });
    /**
        * Method to handle recording
        * @example - startRecording
      */
    const startRecording = () => __awaiter(this, void 0, void 0, function* () {
        setIsRecordingStarted(true);
        dispatch(CcfAssignmentAction.setAudioRecordingState(true));
        /**
         * We are using vmsg library which creates recorder instance and provide methods to start and stop recording
         * it first initates Audio and worker and makes use of webassembly
         */
        try {
            yield recorderInstance.initAudio();
            yield recorderInstance.initWorker();
            recorderInstance.startRecording();
        }
        catch (error) {
            if (error instanceof Error) {
                ccfLogger.error('Error occurred while recording:', error.toString() || '');
            }
            else {
                ccfLogger.error('An unknown error occurred while recording', 'Error while recording');
            }
        }
    });
    /**
        * Method to stop recording
        * @example - stopRecording
        */
    const stopRecording = () => __awaiter(this, void 0, void 0, function* () {
        if (isRecordingStarted) {
            const blob = yield recorderInstance.stopRecording();
            const audioFileName = getFileNameForAudioAttachment();
            const audioRecordingFile = new File([blob], audioFileName, { type: 'audio/mpeg' });
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(audioRecordingFile);
            const fileList = dataTransfer.files;
            const audioFileList = {
                fileList: fileList,
                url: 'base64String',
                nFile: audioRecordingFile,
            };
            uploadAttachment(audioFileList);
            setIsRecordingStarted(false);
            dispatch(CcfAssignmentAction.setAudioRecordingState(false));
            dispatch(CcfAssignmentAction.removeAudioRecording(true));
        }
    });
    useEffect(() => {
        if ((Object.keys(isActiveVoiceCall).length > 0 && (isActiveVoiceCall === null || isActiveVoiceCall === void 0 ? void 0 : isActiveVoiceCall.status) !== CallContactEventStatus.DISCONNECTED && !(isActiveVoiceCall === null || isActiveVoiceCall === void 0 ? void 0 : isActiveVoiceCall.agentMuted))) {
            setIsActiveCall(true);
            //Stop recording if any call is active
            if (isRecordingStarted) {
                handleDiscardEvent();
            }
        }
        else {
            setIsActiveCall(false);
        }
    }, [isActiveVoiceCall]);
    /**
     * To initialize the recorder instance once the component is mounted
     */
    useEffect(() => {
        initializeRecorder();
    }, []);
    /**
       * Method to handle discard event
       * @example - handleDiscardEvent()
       */
    const handleDiscardEvent = () => {
        dispatch(CcfAssignmentAction.setAudioRecordingState(false));
        dispatch(CcfAssignmentAction.removeAudioRecording(true));
        isRecordingStarted && recorderInstance.close();
        setIsRecordingStarted(false);
    };
    /**
     * To discard the recording if the user switches the interaction tab in Elevated case
     */
    useEffect(() => {
        handleDiscardEvent();
    }, [nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.caseId]);
    useEffect(() => {
        /**
             * emit message event
             * @example - emitMessageEvent('message');
             * @param message - message to show
             */
        const handleEvent = () => {
            stopRecording();
        };
        eventBus.on('discardRecording', handleDiscardEvent);
        eventBus.on('stopRecording', handleEvent);
        return () => {
            eventBus.off('stopRecording', handleEvent);
            eventBus.off('discardRecording', handleDiscardEvent);
        };
    });
    return (enableRecording && !isActiveCall ? _jsxs(_Fragment, { children: [!isRecordingStarted && _jsx(CcfTooltip, Object.assign({ title: translate('record') }, { children: _jsx(Button, Object.assign({ "aria-label": translate('record'), "data-testid": 'recordingStarted', sx: [styles === null || styles === void 0 ? void 0 : styles.button, styles === null || styles === void 0 ? void 0 : styles.focussedElement], disableRipple: true, onClick: checkMicrophonePermission, disabled: isActiveCall }, { children: _jsx(CcfIcon, { attachmentIcon: ATTACHMENT_ICON_NAME.RECORDING_STARTED, size: ATTACHMENT_ICON_SIZE.MEDIUM }) })) })), isRecordingStarted && _jsx(CcfTooltip, Object.assign({ title: translate('stopRecording') }, { children: _jsx(Button, Object.assign({ "data-testid": 'recordingStopped', "aria-label": translate('stopRecording'), sx: [styles === null || styles === void 0 ? void 0 : styles.button, styles === null || styles === void 0 ? void 0 : styles.focussedElement], onClick: () => stopRecording() }, { children: _jsx(CcfIcon, { attachmentIcon: ATTACHMENT_ICON_NAME.RECORDING_STOPPED, size: ATTACHMENT_ICON_SIZE.MEDIUM }) })) }))] }) : _jsx(CcfTooltip, Object.assign({ title: translate('recordingDisabled') }, { children: _jsx(Button, Object.assign({ "data-testid": 'recordingDisabled', "aria-label": translate('recordingDisabled'), sx: [styles === null || styles === void 0 ? void 0 : styles.button, styles === null || styles === void 0 ? void 0 : styles.focussedElement] }, { children: _jsx(CcfIcon, { attachmentIcon: ATTACHMENT_ICON_NAME.REOCORDING_DISABLED, size: ATTACHMENT_ICON_SIZE.MEDIUM }) })) })));
}
;
export default memo(CcfVoiceRecorder);
//# sourceMappingURL=ccf-voice-recorder.js.map