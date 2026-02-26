import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Box, CircularProgress, Divider, Fab, Grid, Typography, useMediaQuery, useTheme, } from '@mui/material';
import { CcfCallbackIcon, CcfRewindIcon, CcfFastForwardIcon, CcfVoiceMailHoldIcon, CcfVoiceMailResumeIcon, CcfIconButton, CcfTooltip, CcfTrashBinIcon, CcfReplayIcon, useTranslator, CcfDivider, DividerOrientation, DividerVariant, } from '@nice-devone/ui-controls';
import { useAsyncValue } from '../../../hooks/useAsyncValue';
import { MediaType } from '@nice-devone/common-sdk';
import { useEffect } from 'react';
import { VoiceMailContactEventStatus } from '@nice-devone/core-sdk';
import { CcfVoiceMailCallbackPopover } from '../ccf-voicemail-callback/ccf-voicemail-callback';
import { useDispatch, useSelector } from 'react-redux';
import { getDispositionData } from '../../ccf-disposition/ccf-disposition-slice';
import { ccfVoicemailContactPanelStyles } from '../ccf-voicemail-contact-panel.style';
import { formatTimer } from '../../../util/common';
import { CcfAssignmentAction, getActiveContactInSelectedInteraction, getAllInteractions, getAssignmentPanelMetadata, } from '../../ccf-assignment-panel/ccf-assignment-panel.slice';
import { CcfLaunchButton } from '../../ccf-launch-button/ccf-launch-button';
import { CcfTransferButton } from '../../ccf-transfer-button/ccf-transfer-button';
import contactControlStyles from '../../../styles/ccf-contact-control.style';
import { CcfOutcomeButton } from '../../ccf-outcome-button/ccf-outcome-button';
import { CcfVoicemailHoldingTimer } from '../ccf-voicemail-holding-timer';
import { CXoneAcdClient } from '@nice-devone/acd-sdk';
import { ccfVoiceMailContactPanelActions, voiceMailContactPanelSelector } from '../../ccf-voicemail-contact/ccf-voicemail-contact-panel.slice';
/**
 * Component to display contact control panel
 * @param props - CcfVoiceMailControlsProps
 * ```
 * @example-
 * <CcfVoiceMailControls />
 * ```
 */
export const CcfVoiceMailControls = ({ voiceMailContact }) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
    const contactIndicators = (_a = useAsyncValue(CXoneAcdClient.instance.indicator.contactIndicatorsEventObservable)) === null || _a === void 0 ? void 0 : _a.filter((indicator) => indicator.contactId === voiceMailContact.contactID);
    const dispatch = useDispatch();
    const [translate] = useTranslator();
    const theme = useTheme();
    const voicemailControlStyles = ccfVoicemailContactPanelStyles(theme);
    const generalControlStyles = contactControlStyles(theme);
    const isSmView = useMediaQuery((theme) => theme.breakpoints.down('xl'));
    const second = ((_b = useSelector(voiceMailContactPanelSelector)) === null || _b === void 0 ? void 0 : _b.playbackSecond) || 0;
    const dispositionData = useSelector(getDispositionData);
    const allInteractions = useSelector(getAllInteractions);
    const assignmentPanelMetadata = useSelector(getAssignmentPanelMetadata);
    const activeContactInSelectedInteraction = useSelector(getActiveContactInSelectedInteraction);
    const isSelected = (activeContactInSelectedInteraction === null || activeContactInSelectedInteraction === void 0 ? void 0 : activeContactInSelectedInteraction.media) === MediaType.VOICEMAIL;
    const isContactSelectedWithDisposOrTags = ((_d = (_c = dispositionData === null || dispositionData === void 0 ? void 0 : dispositionData.dispositions[voiceMailContact.contactID]) === null || _c === void 0 ? void 0 : _c.dispositionList) === null || _d === void 0 ? void 0 : _d.length) > 0
        || ((_f = (_e = dispositionData === null || dispositionData === void 0 ? void 0 : dispositionData.dispositions[voiceMailContact.contactID]) === null || _e === void 0 ? void 0 : _e.tagList) === null || _f === void 0 ? void 0 : _f.length) > 0;
    const isContactInactiveWithDisposOrTags = !isSelected && (((_h = (_g = dispositionData === null || dispositionData === void 0 ? void 0 : dispositionData.dispositions[voiceMailContact.contactID]) === null || _g === void 0 ? void 0 : _g.dispositionData) === null || _h === void 0 ? void 0 : _h.length) > 0 || ((_k = (_j = dispositionData === null || dispositionData === void 0 ? void 0 : dispositionData.dispositions[voiceMailContact.contactID]) === null || _j === void 0 ? void 0 : _j.tagList) === null || _k === void 0 ? void 0 : _k.length) > 0);
    const showOutcomesButton = isContactSelectedWithDisposOrTags || isContactInactiveWithDisposOrTags;
    const inAcw = voiceMailContact.status === VoiceMailContactEventStatus.DISCARDED && !voiceMailContact.finalState;
    const hasCallContact = Boolean(assignmentPanelMetadata.voiceInteractionId && allInteractions[assignmentPanelMetadata.voiceInteractionId] && Object.keys(allInteractions[assignmentPanelMetadata.voiceInteractionId]).length && Object.keys(allInteractions[assignmentPanelMetadata.voiceInteractionId].acdContacts).length > 0);
    const isHolding = ((_l = voiceMailContact.voiceMailEventData) === null || _l === void 0 ? void 0 : _l.status) === VoiceMailContactEventStatus.HOLDING;
    const showLaunchIndicator = contactIndicators && contactIndicators.length > 0;
    const holdTime = Number(new Date((_m = voiceMailContact.voiceMailEventData) === null || _m === void 0 ? void 0 : _m.lastStateChangeTime));
    const playBackEvent = (_o = useSelector(voiceMailContactPanelSelector)) === null || _o === void 0 ? void 0 : _o.playbackEvent;
    const labelForPauseOrResume = (playBackEvent === null || playBackEvent === void 0 ? void 0 : playBackEvent.playBackPaused) ? 'resume' : 'pause';
    useEffect(() => {
        var _a;
        if (((_a = voiceMailContact.voiceMailEventData) === null || _a === void 0 ? void 0 : _a.status) ===
            VoiceMailContactEventStatus.ACTIVE &&
            !voiceMailContact.initialHasPlayed &&
            isSelected) {
            // When the voicemail becomes active and is selected play the record from the beginning with the timestamp.
            voiceMailContact.playVoiceMail(true, 0);
            dispatch(CcfAssignmentAction.setHasInitialPlayed(true));
        }
        else if (inAcw) {
            dispatch(ccfVoiceMailContactPanelActions.setPlaybackEvent({
                contactId: voiceMailContact.contactID,
                playBackPosition: voiceMailContact.voiceMailEventData.fileDuration,
                playBackPaused: true,
            }));
        }
    }, [dispatch, inAcw, isSelected, voiceMailContact, (_p = voiceMailContact.voiceMailEventData) === null || _p === void 0 ? void 0 : _p.status]);
    /**
     * Method to play the voicemail audio, resumes the contact if the contact is on hold
     * @param playTimeStamp - Include date/time in audio playback
     * @param newPosition -  Position of the wav file at a specified second
     * @example
     * ```
     * playVoiceMail(true, 50);
     * ```
     */
    const playVoiceMail = (playTimeStamp, newPosition) => {
        var _a;
        newPosition = newPosition < 0 ? 0 : newPosition;
        if (((_a = voiceMailContact.voiceMailEventData) === null || _a === void 0 ? void 0 : _a.status) ===
            VoiceMailContactEventStatus.HOLDING) {
            voiceMailContact.play().then(() => {
                voiceMailContact.playVoiceMail(playTimeStamp, newPosition);
            });
        }
        else {
            voiceMailContact.playVoiceMail(playTimeStamp, newPosition);
        }
    };
    /**
     *
     * function to discard voicemail
     * @example -   handleVoiceMailDiscard()
     */
    const handleVoiceMailDiscard = () => {
        if (isHolding) {
            voiceMailContact.resumeVoiceMail().then(() => {
                voiceMailContact.end(true);
            });
        }
        else {
            voiceMailContact.end();
        }
    };
    return (_jsxs(Grid, Object.assign({ item: true, xs: 12, sx: voicemailControlStyles.voicemailControlsContainer }, { children: [!isSmView && isHolding && !inAcw && (_jsx(CcfVoicemailHoldingTimer, { holdTime: holdTime })), !inAcw &&
                _jsxs(_Fragment, { children: [_jsxs(Grid, Object.assign({ sx: voicemailControlStyles.voicemailControlsInnerContainer }, { children: [_jsx(Grid, Object.assign({ item: true, sx: {
                                        display: 'flex',
                                        justifyContent: 'center',
                                        order: { xs: 2, xl: 1 },
                                    } }, { children: _jsxs(Grid, Object.assign({ item: true, sx: voicemailControlStyles.voicemailControlsGrid }, { children: [_jsx(CcfTooltip, Object.assign({ title: isSelected ? translate('rewind') : '', arrow: true, placement: 'left' }, { children: _jsx(Box, { children: _jsx(CcfIconButton, Object.assign({ "aria-label": 'rewind', disabled: !isSelected, onClick: () => {
                                                            const newPosition = second <= 10 ? 0 : second - 10;
                                                            playVoiceMail(false, newPosition);
                                                        } }, { children: _jsx(CcfRewindIcon, { color: isSelected ? 'primary' : 'disabled', sx: { fontSize: '20px' } }) })) }) }), 'rewind'), _jsx(Grid, Object.assign({ item: true, zIndex: 0 }, { children: _jsx(Box, Object.assign({ sx: { m: 1, position: 'relative' } }, { children: _jsx(CcfTooltip, Object.assign({ title: isSelected ? translate(labelForPauseOrResume) : '', arrow: true, placement: 'top' }, { children: _jsxs(Fab, Object.assign({ "aria-label": labelForPauseOrResume, color: isSelected ? 'primary' : 'secondary', onClick: () => {
                                                                (playBackEvent === null || playBackEvent === void 0 ? void 0 : playBackEvent.playBackPaused)
                                                                    ? playVoiceMail(false, playBackEvent === null || playBackEvent === void 0 ? void 0 : playBackEvent.playBackPosition)
                                                                    : voiceMailContact.pause();
                                                            }, sx: [voicemailControlStyles.revampedVoicemailIcons, {
                                                                    cursor: isSelected ? 'pointer' : 'default',
                                                                    backgroundColor: isSelected ? theme.palette.text.clearText : theme.palette.secondary.main,
                                                                }] }, { children: [(playBackEvent === null || playBackEvent === void 0 ? void 0 : playBackEvent.playBackPaused)
                                                                    ? (_jsx(CcfVoiceMailResumeIcon, { viewBox: "0 0 16 16", sx: voicemailControlStyles.resumeIcon, fillColor: 'none' }))
                                                                    : (_jsx(CcfVoiceMailHoldIcon, { viewBox: "0 0 20 20", sx: { fontSize: theme.typography.h5 } })), _jsx(CircularProgress, { variant: "determinate", value: 100, size: "", sx: [
                                                                        voicemailControlStyles.circularProgress,
                                                                        { color: theme.palette.grey[300] }
                                                                    ] }), _jsx(CircularProgress, { variant: "determinate", value: (second * 100) /
                                                                        ((_q = voiceMailContact.voiceMailEventData) === null || _q === void 0 ? void 0 : _q.fileDuration), size: "", sx: [
                                                                        voicemailControlStyles.circularProgress,
                                                                        { color: theme.palette.grey[500] }
                                                                    ] })] })) }), 'pause') })) })), _jsx(CcfTooltip, Object.assign({ title: isSelected ? translate('forward') : '', arrow: true, placement: 'right' }, { children: _jsx(Box, { children: _jsx(CcfIconButton, Object.assign({ "aria-label": 'forward', disabled: !isSelected, onClick: () => {
                                                            const newPosition = voiceMailContact.voiceMailEventData.fileDuration -
                                                                second <
                                                                10
                                                                ? voiceMailContact.voiceMailEventData.fileDuration
                                                                : second + 10;
                                                            playVoiceMail(false, newPosition);
                                                        } }, { children: _jsx(CcfFastForwardIcon, { color: isSelected ? 'primary' : 'disabled', sx: { fontSize: '20px' } }) })) }) }), 'forward')] })) })), _jsxs(Grid, Object.assign({ item: true, container: true, sx: [
                                        voicemailControlStyles.replayIconFileDurationGrid,
                                        { order: { xs: 1, xl: 2 } }
                                    ], xl: 12, xs: 4 }, { children: [_jsxs(Grid, Object.assign({ sx: {
                                                display: 'flex',
                                                flexDirection: 'row',
                                                order: { xs: 2, xl: 1 },
                                            } }, { children: [isSmView && (_jsx(CcfDivider, { sx: { borderColor: theme.palette.secondary.light }, orientation: DividerOrientation.VERTICAL, variant: DividerVariant.FULLWIDTH })), _jsx(CcfTooltip, Object.assign({ title: isSelected ? translate('replay') : '', arrow: true, placement: 'left' }, { children: _jsx(Box, Object.assign({ sx: { padding: { xs: '0 15px 0 12px', xl: '5px 15px 5px 0' } } }, { children: _jsx(CcfIconButton, Object.assign({ "aria-label": 'replay', disabled: !isSelected, onClick: () => {
                                                                playVoiceMail(false, 0);
                                                            }, sx: { padding: 0, display: 'flex', alignItems: 'center' } }, { children: _jsx(CcfReplayIcon, { color: isSelected ? 'primary' : 'disabled', sx: voicemailControlStyles.replayIcon }) })) })) }), 'replay'), isSmView && (_jsx(CcfDivider, { sx: { borderColor: theme.palette.secondary.light }, orientation: DividerOrientation.VERTICAL, variant: DividerVariant.FULLWIDTH }))] })), _jsx(Grid, Object.assign({ sx: voicemailControlStyles.timeStampGridWrapper }, { children: _jsxs(Typography, Object.assign({ "data-testid": 'playBack-timer', sx: voicemailControlStyles.timestampIA }, { children: [formatTimer(second), "/", formatTimer((_r = voiceMailContact.voiceMailEventData) === null || _r === void 0 ? void 0 : _r.fileDuration)] })) }))] }))] })), _jsx(Divider, {})] }), _jsxs(Grid, Object.assign({ sx: {
                    display: 'flex',
                    flexDirection: { xs: 'row', xl: 'column' },
                } }, { children: [!inAcw &&
                        _jsxs(_Fragment, { children: [_jsx(Grid, Object.assign({ sx: voicemailControlStyles.callbackTransferRow }, { children: _jsxs(Grid, Object.assign({ item: true, xs: 12, sx: voicemailControlStyles.callbackTransferGrid }, { children: [_jsx(CcfVoiceMailCallbackPopover, { iconComponent: _jsx(CcfCallbackIcon, { viewBox: '0 -2 20 20' }) }), _jsx(CcfTransferButton, { disabled: hasCallContact, toolTipPlacement: showLaunchIndicator || isSmView ? 'top' : 'right', sx: { marginRight: '0.6875rem' } }), showLaunchIndicator && (_jsx(CcfLaunchButton, { contactId: voiceMailContact.contactID, tooltipPlacement: isSmView ? 'top' : 'right', sx: { marginRight: '0.6875rem' } }))] })) })), _jsx(Divider, {})] }), _jsxs(Grid, Object.assign({ item: true, xs: 12, sx: voicemailControlStyles.trashBinResolveRow, paddingTop: 1 }, { children: [_jsx(CcfTooltip, Object.assign({ title: isSelected && !inAcw ? translate('discard') : '', arrow: true, placement: 'left' }, { children: _jsx(Box, { children: _jsx(CcfIconButton, Object.assign({ "aria-label": 'discard', disabled: !isSelected || inAcw, onClick: handleVoiceMailDiscard, disableFocusRipple: inAcw, disableRipple: inAcw, disableTouchRipple: inAcw, sx: Object.assign(Object.assign(Object.assign({}, generalControlStyles.contactPanelButton), generalControlStyles.markAsResolved), generalControlStyles.icon) }, { children: _jsx(CcfTrashBinIcon, { color: isSelected ? 'primary' : 'disabled', sx: Object.assign(Object.assign({}, generalControlStyles.resolvedIcon), { fontSize: '40px', position: 'relative', top: '3px' }) }) })) }) })), !isSmView && showOutcomesButton && _jsx(Divider, { orientation: "vertical", flexItem: true }), showOutcomesButton && (_jsx(CcfOutcomeButton, { disabled: !isSelected, placement: 'right', sx: Object.assign({}, generalControlStyles.icon) }))] }))] }))] })));
};
//# sourceMappingURL=ccf-voicemail-controls.js.map