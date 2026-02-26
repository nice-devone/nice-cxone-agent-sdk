import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState, memo, createRef, useRef } from 'react';
import { useDispatch } from 'react-redux';
import AudioPlayer, { RHAP_UI } from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { CcfBox, CcfFastForwardIcon, CcfRewindIcon, CcfTooltip, CcfAudioPauseIcon, CcfAudioPlayIcon } from '@nice-devone/ui-controls';
import { Box, Fab, useTheme } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CcfAudioPlayerStyle from './ccf-audio-player.style';
import { ATTACHMENT_ICON_NAME } from '../ccf-icon/ccf-icon-list';
import CcfIcon, { ATTACHMENT_ICON_SIZE } from '../ccf-icon/ccf-icon';
import { CcfAssignmentAction } from '../ccf-assignment-panel/ccf-assignment-panel.slice';
import { eventBus } from './ccf-audio-player-util';
import { AudioPlayerStatus } from './ccf-audio-player-status';
/**
 * Component to render audio player
 * @returns audio player
 * @example - CcfAudioPlayer
 */
export function CcfAudioPlayer(props) {
    const { audioUrl, handleRemoveAttachment, attachmentId, attachment, handleDownloadAttachment, audioPlayerWidth, isInbound, fileName, shouldShowCloseIcon, shouldShowDownloadIcon, isVoiceRecordingInprogress } = props;
    const player = createRef();
    const [audio, setAudio] = useState('');
    let timerInterval;
    const secondsRef = useRef(0);
    let seconds = secondsRef.current;
    const [recordingTimer, setRecordingTimer] = useState('00:00');
    // Dev note- Second is now hard coded but we have story for handling circular progress below constant will be changed
    const second = 60;
    const theme = useTheme();
    const audioRecordingtheme = CcfAudioPlayerStyle(theme, audioPlayerWidth, isInbound, shouldShowCloseIcon !== null && shouldShowCloseIcon !== void 0 ? shouldShowCloseIcon : false);
    const dispatch = useDispatch();
    /**
        * Method to Update Timer for voice recording
        * @example - updateTimer
        */
    const updateTimer = () => {
        seconds++;
        const minutes = String(Math.floor(seconds / 60)).padStart(2, '0');
        const secs = String(seconds % 60).padStart(2, '0');
        setRecordingTimer(`${minutes}:${secs}`);
    };
    useEffect(() => {
        if (isVoiceRecordingInprogress) {
            timerInterval = setInterval(updateTimer, 1000);
        }
        else {
            clearInterval(timerInterval);
            secondsRef.current = 0;
            setRecordingTimer('00:00');
        }
    }, [isVoiceRecordingInprogress]);
    const customIcons = {
        rewind: !isVoiceRecordingInprogress && _jsx(CcfRewindIcon, { color: 'primary', style: { margin: '10 0 10 0', display: 'block', width: '-webkit-fill-available', height: 'revert-layer', overflow: 'visible' } }),
        forward: !isVoiceRecordingInprogress && _jsx(CcfFastForwardIcon, { viewBox: "0 0 16 20", color: 'primary', style: { margin: '10 0 10 0', display: 'block', width: '-webkit-fill-available', height: 'revert-layer', overflow: 'visible' } }),
        pause: _jsx(Fab, Object.assign({ color: "primary", sx: audioRecordingtheme.fab }, { children: _jsx(CcfAudioPauseIcon, { viewBox: "0 0 20 20", sx: audioRecordingtheme.audioHoldIcon }) })),
        play: isVoiceRecordingInprogress ?
            _jsx(Box, Object.assign({ sx: audioRecordingtheme.pulseAnimation }, { children: _jsx(Fab, Object.assign({ sx: Object.assign(Object.assign({}, audioRecordingtheme.fabButton), { bottom: '0.625rem', right: '0.313rem' }), onClick: () => eventBus.emit(AudioPlayerStatus.STOP_RECORDING, 'Stop Recording') }, { children: _jsx(CcfIcon, { attachmentIcon: ATTACHMENT_ICON_NAME.RECORDING_IN_PROGRESS, customStyle: audioRecordingtheme.recordInprogress, size: ATTACHMENT_ICON_SIZE.MEDIUM }) })) }))
            : _jsx(Fab, Object.assign({ color: "primary", sx: audioRecordingtheme.fab }, { children: _jsx(CcfAudioPlayIcon, { viewBox: "0 0 20 20", sx: audioRecordingtheme.audioResumeIcon }) })),
    };
    /**
   * Method to handle downlaod attachment
   * @example - downloadAttachment()
   */
    // const downloadAttachment = () =>{
    //   attachmentDownload && setAttachmentDownload(true);
    // }
    useEffect(() => {
        if (audioUrl) {
            const newAudio = new Audio(audioUrl);
            if (audioUrl.includes('downloadAttachmentToken')) {
                setAudio(newAudio.src + '&partial=true');
            }
            else {
                setAudio(newAudio.src);
            }
        }
    }, [audioUrl]);
    return (_jsx(Box, { children: _jsx(Box, Object.assign({ sx: audioRecordingtheme.audioPlayerPlayButton }, { children: _jsx(Box, Object.assign({ sx: audioRecordingtheme.mainContainer }, { children: _jsx(CcfTooltip, Object.assign({ title: fileName !== null && fileName !== void 0 ? fileName : '', disableHoverListener: !fileName }, { children: _jsx(Box, Object.assign({ sx: audioRecordingtheme.tooltipArea }, { children: _jsx(AudioPlayer, { ref: player, style: audioRecordingtheme.audioAttachmentContainer, customIcons: customIcons, showJumpControls: isVoiceRecordingInprogress ? false : true, layout: "horizontal-reverse", preload: 'auto', src: audio, autoPlayAfterSrcChange: false, autoPlay: false, progressJumpSteps: { backward: 10000, forward: 10000 }, customAdditionalControls: [], customProgressBarSection: [
                                RHAP_UI.PROGRESS_BAR,
                                !isVoiceRecordingInprogress ? RHAP_UI.CURRENT_LEFT_TIME : _jsx(CcfBox, Object.assign({ sx: audioRecordingtheme.recordTimer }, { children: recordingTimer })),
                                _jsxs(_Fragment, { children: [shouldShowCloseIcon &&
                                            _jsx(CcfBox, { children: _jsx(CloseIcon, { "data-testid": 'Close', sx: audioRecordingtheme.closeIcon, onClick: () => {
                                                        dispatch(CcfAssignmentAction.removeAudioRecording(true));
                                                        handleRemoveAttachment && handleRemoveAttachment(attachmentId !== null && attachmentId !== void 0 ? attachmentId : '');
                                                    }, fontSize: "small" }) }), shouldShowDownloadIcon &&
                                            _jsx(CcfBox, Object.assign({ "data-testid": 'Download', onClick: () => {
                                                    handleDownloadAttachment && handleDownloadAttachment(attachment !== null && attachment !== void 0 ? attachment : {});
                                                } }, { children: _jsx(CcfIcon, { attachmentIcon: ATTACHMENT_ICON_NAME.DOWNLOAD, customStyle: audioRecordingtheme.downloadIcon, size: ATTACHMENT_ICON_SIZE.SMALL }) }))] })
                            ], customVolumeControls: [] }) })) })) })) })) }));
}
export default memo(CcfAudioPlayer);
//# sourceMappingURL=ccf-audio-player.js.map