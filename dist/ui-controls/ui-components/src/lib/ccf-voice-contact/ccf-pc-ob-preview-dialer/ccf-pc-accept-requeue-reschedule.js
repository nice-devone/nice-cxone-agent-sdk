import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Collapse, FormGroup, Popover, Stack, useTheme, IconButton, useMediaQuery } from '@mui/material';
import { CcfBox, useTranslator, CcfButton, CcfDivider, DividerOrientation, DividerVariant, CcfTooltip, CcfAddEventIcon, } from '@nice-devone/ui-controls';
import { VoiceContactStatus } from '@nice-devone/common-sdk';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { extendedSkillDetailsById } from '../../ccf-agent-skill/ccf-agent-skill-details-slice';
import assignmentAcceptRejectStyles from '../../ccf-assignment-panel/ccf-assignment-card/ccf-assignment-card-accept-reject/ccf-assignment-card-accept-reject.styles';
import CcfReschedulePopover from './ccf-reschedule-popover';
import { fetchTimeZones, getTimeZones } from '../../ccf-commitment/ccf-commitment.slice';
import { CcfOutcomeButton } from '../../ccf-outcome-button/ccf-outcome-button';
import { getDispositionData } from '../../ccf-disposition/ccf-disposition-slice';
import { getVoiceContactDetailsById } from '../../ccf-assignment-panel/ccf-assignment-panel.slice';
import { getPreviewSkillProps } from '../ccf-voice-contact-methods';
import CcfAudioRingtoneElementOnLoad from '../../ccf-audio-element/ccf-audio-ringtone-element-on-load';
/**
 * CcfPcAcceptRequeueReschedule - Is used to display the accept and requeue buttons in the assignment card
 * @param props -?-CcfPcAcceptRequeueRescheduleProps
 * @example <CcfPcAcceptRequeueReschedule />
 */
export function CcfPcAcceptRequeueReschedule(props) {
    var _a, _b, _c, _d, _e;
    const [anchorEl, setAnchorEl] = useState(null);
    const popoverOpen = Boolean(anchorEl);
    const dispatch = useDispatch();
    const [translate] = useTranslator();
    const theme = useTheme();
    const isSmView = useMediaQuery(theme.breakpoints.down('xl'));
    const style = assignmentAcceptRejectStyles();
    const showButtons = true;
    const extendedSkillDetailsSelector = useSelector(extendedSkillDetailsById(Number((_a = props.contact) === null || _a === void 0 ? void 0 : _a.skillOrQueueId)));
    const voiceContact = useSelector(getVoiceContactDetailsById((_b = props.contact) === null || _b === void 0 ? void 0 : _b.contactId));
    const previewSkillProps = getPreviewSkillProps(voiceContact, extendedSkillDetailsSelector === null || extendedSkillDetailsSelector === void 0 ? void 0 : extendedSkillDetailsSelector.deliveryParameters);
    const requeueButtonEnabled = previewSkillProps === null || previewSkillProps === void 0 ? void 0 : previewSkillProps.requeue;
    const rescheduleButtonEnabled = previewSkillProps === null || previewSkillProps === void 0 ? void 0 : previewSkillProps.reschedule;
    const timeZones = useSelector(getTimeZones);
    const dispositionData = useSelector(getDispositionData);
    const activeDisposition = (_c = dispositionData === null || dispositionData === void 0 ? void 0 : dispositionData.dispositions[props.contact.contactId]) === null || _c === void 0 ? void 0 : _c.dispositionList;
    const showOutcomesButton = activeDisposition && (activeDisposition === null || activeDisposition === void 0 ? void 0 : activeDisposition.length) > 0;
    useEffect(() => {
        var _a;
        ((_a = props.contact) === null || _a === void 0 ? void 0 : _a.isContactRejected) && props.rejectAnimationForDigitalContact();
    }, [props, (_d = props.contact) === null || _d === void 0 ? void 0 : _d.isContactRejected, props.rejectAnimationForDigitalContact]);
    useEffect(() => {
        if (!(timeZones === null || timeZones === void 0 ? void 0 : timeZones.length)) {
            dispatch(fetchTimeZones());
        }
    }, [dispatch, timeZones]);
    /**
     * Used to handle the accept click event
     * @example handleAccept()
     */
    const handleAccept = (e) => {
        props.handleAccept(e);
    };
    /**
     * Used to handle the reject click event
     * @example handleRequeue()
     */
    const handleRequeue = (e) => {
        props.handleRequeue(e);
    };
    /**
     * Handle reschedule click event
     * @example handleReschedule()
     * @returns
     */
    const handleRescheduleClickEvent = (event) => {
        if (!popoverOpen) {
            dispatch(fetchTimeZones());
            setAnchorEl(event.currentTarget);
        }
        else {
            setAnchorEl(null);
        }
    };
    return (_jsxs(CcfBox, { children: [_jsx(CcfAudioRingtoneElementOnLoad, { isIncoming: ((_e = props.contact) === null || _e === void 0 ? void 0 : _e.contactStatus) === VoiceContactStatus.PREVIEW }), _jsx(Collapse, Object.assign({ in: showButtons, timeout: 500 }, { children: _jsxs(Stack, Object.assign({ alignItems: 'center', flexDirection: { xs: 'row-reverse', xl: 'column' } }, { children: [_jsxs(Stack, Object.assign({ alignItems: 'center', flexDirection: 'row', justifyContent: { xs: 'left', xl: 'space-evenly' }, sx: { pointerEvents: 'visible' } }, { children: [requeueButtonEnabled &&
                                    _jsx(CcfButton, Object.assign({ variant: "contained", color: "inherit", sx: style.buttonControls, disableElevation: true, onClick: (e) => handleRequeue(e) }, { children: translate('requeue') })), _jsx(CcfButton, Object.assign({ variant: "contained", primary: true, sx: style.buttonControls, disableElevation: true, onClick: (e) => handleAccept(e), disabled: props.isAcceptDisabled }, { children: props.isManualDial ? translate('dial') : translate('accept') }))] })), (rescheduleButtonEnabled || showOutcomesButton) && !isSmView &&
                            _jsx(CcfDivider, { orientation: DividerOrientation.HORIZONTAL, variant: DividerVariant.FULLWIDTH, flexItem: true }), _jsxs(Stack, Object.assign({ justifyContent: 'space-evenly', flexDirection: 'row', paddingBottom: { xs: '0px', xl: '10px' }, width: { xl: '100%' } }, { children: [rescheduleButtonEnabled &&
                                    _jsxs(_Fragment, { children: [_jsx(CcfTooltip, Object.assign({ title: '', translationKey: 'Reschedule' }, { children: _jsx(IconButton, Object.assign({ onClick: (e) => handleRescheduleClickEvent(e) }, { children: _jsx(CcfAddEventIcon, {}) })) })), _jsx(Popover, Object.assign({ open: popoverOpen, onClose: handleRescheduleClickEvent, anchorEl: anchorEl, anchorOrigin: { vertical: 'center', horizontal: 'center' }, transformOrigin: { vertical: 'top', horizontal: 'left' }, elevation: 3, sx: { left: { xl: '110px' } }, PaperProps: {
                                                    style: { width: '325px' },
                                                } }, { children: _jsx(FormGroup, { children: _jsx(CcfReschedulePopover, { handlePopoverClose: (e) => handleRescheduleClickEvent(e), snoozeButtonEnabled: previewSkillProps === null || previewSkillProps === void 0 ? void 0 : previewSkillProps.snooze }) }) }))] }), showOutcomesButton && rescheduleButtonEnabled && !isSmView &&
                                    _jsx(CcfDivider, { orientation: DividerOrientation.VERTICAL, variant: DividerVariant.MIDDLE, flexItem: true }), showOutcomesButton && _jsx(CcfOutcomeButton, {})] }))] })) }))] }));
}
export default CcfPcAcceptRequeueReschedule;
//# sourceMappingURL=ccf-pc-accept-requeue-reschedule.js.map