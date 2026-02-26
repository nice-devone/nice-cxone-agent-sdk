import { __awaiter } from "tslib";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMediaQuery, useTheme } from '@mui/material';
import { AcwType, ControlButtonText } from '@nice-devone/agent-sdk';
import { VoiceContactStatus, contactButtons } from '@nice-devone/common-sdk';
import { CcfBox, CcfCallCommitIcon, CcfCallConsultIcon, CcfCallHoldIcon, CcfCallKeypadIcon, CcfCallMaskIcon, CcfCallMuteIcon, CcfCallRecordIcon, CcfCallRecordingIcon, CcfTransferIcon, CcfIconButton, CcfResumeIcon, CcfUnMuteIcon, CcfTooltip, CcfUnmaskIcon, useTranslator, CcfConferenceIcon, CcfTypography, } from '@nice-devone/ui-controls';
import { useDispatch, useSelector } from 'react-redux';
import { getPanelAppNavigationItems, globalActions, navigateToAppSpaceTab, } from '../../global.app.slice';
import { endTheVoiceContact, holdVoiceContact, maskVoiceContact, muteVoiceContact, recordVoiceContact, } from '../ccf-voice-contact-methods';
import { CcfAssignmentAction, consultAgentInConference, getAllInteractions, getNonIncomingActiveContactInSelectedInteraction, selectUserInConference, selectUserInConsult, voiceContactCardSelector, } from '../../ccf-assignment-panel/ccf-assignment-panel.slice';
import { Navigation } from '../../../enums/navigation-menus';
import { useAsyncValue } from '../../../hooks/useAsyncValue';
import { useEffect, useState } from 'react';
import { getDispositionData, } from '../../ccf-disposition/ccf-disposition-slice';
import { RenderMoreThanTwoControls } from './ccf-contact-with-multiple-controls';
import { contactControlStyles } from '../../../styles/ccf-contact-control.style';
import ccfContactControlsStyles from './ccf-contact-controls.style';
import { CcfLaunchButton } from '../../ccf-launch-button/ccf-launch-button';
import { CXoneAcdClient } from '@nice-devone/acd-sdk';
import { Timer } from '../../../util/timer/timer';
import { ACDSessionManager } from '@nice-devone/core-sdk';
import { toast } from 'react-toastify';
/**
 * This method is to return the count of call controls buttons
 * @param voiceContact-CXoneVoiceContact
 * @example getCallControlCount
 */
export const getCallControlCount = (controls) => {
    return Object.keys(controls).filter((key) => controls[key].isVisible).length;
};
/**
 * Component to display contact control panel
 * @param props - CcfContactControlsProps
 * ```
 * @example-
 * <CcfContactControls />
 * ```
 */
export function CcfContactControls(props) {
    var _a, _b, _c, _d, _e, _f;
    const isBelowXl = useMediaQuery((theme) => theme.breakpoints.down('xl'));
    const isBelowMd = useMediaQuery((theme) => theme.breakpoints.down('md'));
    const { type, voiceContact, onlyShowHangup = false, showKeypad = false } = props;
    const callControlButtons = onlyShowHangup ?
        hangUpOnlyControls()
        : voiceContact === null || voiceContact === void 0 ? void 0 : voiceContact.callControlButton;
    const callControlsCount = callControlButtons ?
        getCallControlCount(callControlButtons)
        : 0;
    const [translate] = useTranslator();
    const dispatch = useDispatch();
    const theme = useTheme();
    const controlStyles = contactControlStyles(theme);
    const styles = ccfContactControlsStyles(theme);
    const userInConsult = useSelector(selectUserInConsult);
    const usersInConference = useSelector(selectUserInConference);
    const controls = usersInConference.length > 1 || userInConsult ? null : callControlButtons;
    const consultUser = useSelector(consultAgentInConference);
    const consultContact = (consultUser === null || consultUser === void 0 ? void 0 : consultUser.contact) || {};
    const panelAppNavigationItems = useSelector(getPanelAppNavigationItems);
    const contactIndicators = useAsyncValue(CXoneAcdClient.instance.indicator.contactIndicatorsEventObservable);
    const dispositionData = useSelector(getDispositionData);
    const allInteractions = useSelector(getAllInteractions);
    const nonIncomingActiveContactInSelectedInteraction = useSelector(getNonIncomingActiveContactInSelectedInteraction);
    const voiceContactCard = useSelector(voiceContactCardSelector);
    let activeDisposition = null;
    const dispositionContactId = dispositionData === null || dispositionData === void 0 ? void 0 : dispositionData.dispositions[voiceContact === null || voiceContact === void 0 ? void 0 : voiceContact.contactID];
    if (dispositionContactId !== undefined) {
        activeDisposition = dispositionData.dispositions[voiceContact.contactID];
    }
    const contactControlSx = Object.assign(Object.assign({}, controlStyles.contactPanelButton), (callControlsCount <= 3 && styles.contactControlButton));
    const [relevantIndicators, setRelevantIndicators] = useState(contactIndicators);
    const isDiscarded = ((_a = voiceContactCard[0]) === null || _a === void 0 ? void 0 : _a.contactStatus) === VoiceContactStatus.DISCONNECTED.toString() &&
        voiceContact.acwTypeId === AcwType.DISPOSITION;
    const agentSession = ACDSessionManager.instance;
    useEffect(() => {
        setRelevantIndicators((contactIndicators === null || contactIndicators === void 0 ? void 0 : contactIndicators.filter((indicator) => (indicator === null || indicator === void 0 ? void 0 : indicator.contactId) === (voiceContact === null || voiceContact === void 0 ? void 0 : voiceContact.contactID) && (indicator === null || indicator === void 0 ? void 0 : indicator.isEnabled))) || null);
    }, [voiceContact === null || voiceContact === void 0 ? void 0 : voiceContact.contactID, contactIndicators]);
    useEffect(() => {
        const agentSessionSubscription = agentSession.callControlEvent.subscribe((control) => {
            controlClicked(control);
        });
    });
    /**
     * note control text is required but only end will be used.
     * @returns control schema for only end call being visible/enabled
     * @example used for when dialing but the call is unanswered
     */
    function hangUpOnlyControls() {
        const dialingControls = {
            hold: { isEnable: false, isVisible: false, controlText: ControlButtonText.END },
            mute: { isEnable: false, isVisible: false, controlText: ControlButtonText.END },
            end: { isEnable: true, isVisible: true, controlText: ControlButtonText.END },
            mask: { isEnable: false, isVisible: false, controlText: ControlButtonText.END },
            record: { isEnable: false, isVisible: false, controlText: ControlButtonText.END },
            transfer: { isEnable: false, isVisible: false, controlText: ControlButtonText.END },
        };
        return dialingControls;
    }
    /**
     * dialPadIcons - Contact control icons
     */
    const dialPadIcons = new Map([
        ['commit', _jsx(CcfCallCommitIcon, { sx: controlStyles.controlIconsResponsiveStyles, viewBox: "0 0 20 20" }, 'commit')],
        ['mute', _jsx(CcfCallMuteIcon, { sx: controlStyles.controlIconsResponsiveStyles, viewBox: "0 0 29 28" }, 'mute')],
        ['unmute', _jsx(CcfUnMuteIcon, { sx: Object.assign({ fontSize: '1.6rem' }, controlStyles.controlIconsResponsiveStyles), viewBox: "0 0 29 28" }, 'unmute')],
        ['mask', _jsx(CcfCallMaskIcon, { sx: controlStyles.controlIconsResponsiveStyles, viewBox: "0 0 25 24" }, 'mask')],
        ['unmask', _jsx(CcfUnmaskIcon, { sx: Object.assign({ fontSize: '1.6rem' }, controlStyles.controlIconsResponsiveStyles), viewBox: "0 0 29 28" }, 'unmask')],
        ['hold', _jsx(CcfCallHoldIcon, { sx: controlStyles.controlIconsResponsiveStyles, viewBox: "0 0 25 24" }, 'hold')],
        ['resume', _jsx(CcfResumeIcon, { sx: Object.assign({ fontSize: '1.6rem' }, controlStyles.controlIconsResponsiveStyles), viewBox: "0 0 29 28", fillColor: theme.palette.background.callControls }, 'resume')],
        [
            'transfer',
            usersInConference.length > 1 || userInConsult ? (_jsx(CcfConferenceIcon, { sx: [controlStyles.controlIconsResponsiveStyles, { fill: `${(_b = theme.palette) === null || _b === void 0 ? void 0 : _b.background.dark}` }] }, 'transfer')) : (_jsx(CcfTransferIcon, { sx: controlStyles.controlIconsResponsiveStyles, viewBox: "0 0 25 24" }))
        ],
        ['keypad', _jsx(CcfCallKeypadIcon, { sx: controlStyles.controlIconsResponsiveStyles, viewBox: "0 0 25 24" }, 'keypad')],
        ['record', _jsx(CcfCallRecordIcon, { sx: controlStyles.controlIconsResponsiveStyles, viewBox: "0 0 25 24" }, 'record')],
        ['recording', _jsx(CcfCallRecordingIcon, { sx: controlStyles.controlIconsResponsiveStyles, viewBox: "0 0 29 28" }, 'recording')],
        ['consult', _jsx(CcfCallConsultIcon, { sx: controlStyles.controlIconsResponsiveStyles, viewBox: "0 0 20 20" }, 'consult')]
    ]);
    /**
     * Handles recording control with error handling
     * @param voiceContact - The voice contact instance
     * @example
     * ```
     * handleRecordControl(voiceContact)
     * ```
     */
    const handleRecordControl = (voiceContact) => __awaiter(this, void 0, void 0, function* () {
        const resultAction = yield dispatch(recordVoiceContact(voiceContact));
        if (recordVoiceContact.rejected.match(resultAction)) {
            toast.error(_jsx(CcfTypography, { translationKey: "stopRecordingError" }), {
                autoClose: 2000,
                containerId: 'AppToastContainer',
            });
        }
    });
    /**
     *
     * @param control - contactButtons
     * @param event -React.MouseEvent
     * @example -   controlClicked('Consult', event)
     */
    const controlClicked = (control, event) => {
        var _a, _b, _c, _d, _e;
        event === null || event === void 0 ? void 0 : event.stopPropagation();
        let clickedContact;
        if (((_a = allInteractions[voiceContact.interactionId]) === null || _a === void 0 ? void 0 : _a.acdContacts[voiceContact.contactID]) &&
            Object.keys((_b = allInteractions[voiceContact.interactionId]) === null || _b === void 0 ? void 0 : _b.acdContacts[voiceContact.contactID]).length &&
            ((_c = allInteractions[voiceContact.interactionId]) === null || _c === void 0 ? void 0 : _c.acdContacts[voiceContact.contactID].contactStatus) !== 'incoming' &&
            ((_d = allInteractions[voiceContact.interactionId]) === null || _d === void 0 ? void 0 : _d.acdContacts[voiceContact.contactID].contactStatus) !== 'ringing') {
            clickedContact = (_e = allInteractions[voiceContact.interactionId]) === null || _e === void 0 ? void 0 : _e.acdContacts[voiceContact.contactID];
        }
        if (!!clickedContact && clickedContact.interactionId && clickedContact.contactId !== (nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.contactId)) {
            dispatch(CcfAssignmentAction.setSelectedContactId({ interactionId: clickedContact.interactionId, contactId: String(clickedContact.contactId) }));
            dispatch(CcfAssignmentAction.setSelectedInteraction(clickedContact.interactionId));
        }
        switch (control) {
            case contactButtons.transfer:
                handleTransferControl();
                break;
            case contactButtons.keypad:
                dispatch(CcfAssignmentAction.toggleIVRKeyPad(true));
                break;
            case contactButtons.hold:
                dispatch(holdVoiceContact(voiceContact));
                break;
            case contactButtons.mute:
                dispatch(muteVoiceContact(voiceContact));
                break;
            case contactButtons.mask:
                dispatch(maskVoiceContact(voiceContact));
                break;
            case contactButtons.record:
                handleRecordControl(voiceContact);
                break;
            case contactButtons.hungup:
                dispatch(endTheVoiceContact(type === 'conference' ? consultContact : voiceContact));
                break;
            default:
                break;
        }
    };
    /**
      *This method is to dispatch certain action conditionally for transfer control
      * @param control - contactButtons
      * @example -   handleTransferControl()
      */
    const handleTransferControl = () => {
        dispatch(globalActions.setVoiceContactTransferBtnClicked(true));
        if (usersInConference.length > 1 || userInConsult) {
            if (isBelowXl) {
                dispatch(globalActions.setSelectedMenu({ name: 'Conference' }));
            }
            else {
                navigateToAppSpaceTab({
                    dispatch: dispatch,
                    panelAppNavigationItems: panelAppNavigationItems,
                    navigation: Navigation.CONFERENCE,
                });
            }
        }
        else if (!isBelowXl) {
            navigateToAppSpaceTab({
                dispatch: dispatch,
                panelAppNavigationItems: panelAppNavigationItems,
                navigation: Navigation.DIRECTORY,
            });
        }
        else {
            dispatch(globalActions.setSelectedMenu({ name: 'Directory' }));
            if (isBelowMd) {
                dispatch(CcfAssignmentAction.updateInboxCollapsed({ isInboxCollapsed: true, isLargeView: false }));
            }
        }
    };
    /**
     *
     * @param controls - contactButtons
     * @param control - contactButton
     * @example viewControlText(controls,control)
     */
    const viewControlText = (controls, control) => {
        let controlText = '';
        switch (control) {
            case contactButtons.hold:
                controlText = controls.hold.controlText;
                break;
            case contactButtons.mute:
                controlText = controls.mute.controlText;
                break;
            case contactButtons.mask:
                controlText = controls.mask.controlText;
                break;
            case contactButtons.record:
                controlText = controls.record.controlText;
                break;
            case contactButtons.transfer:
                controlText = controls.transfer.controlText;
                break;
        }
        return controlText;
    };
    return voiceContact && !(isBelowXl && (usersInConference.length > 1 || userInConsult)) ? (_jsxs(CcfBox, Object.assign({ id: "ContactControlPanel", sx: styles.contactControlPanel }, { children: [(_jsxs(CcfBox, Object.assign({ sx: [
                    Object.assign(Object.assign({}, styles.controlsGrid), { padding: callControlsCount > 3 ? styles.controlsGrid.padding : '0px 20px' }),
                    usersInConference.length > 1 || userInConsult ? styles.consultConferenceGrid : null
                ] }, { children: [!onlyShowHangup && voiceContact &&
                        callControlsCount > 0 &&
                        controls &&
                        Object.keys(controls).map((control, index) => control !== 'end' &&
                            controls[control].isVisible && (_jsx(CcfTooltip, Object.assign({ title: control === 'transfer' && (usersInConference.length > 1 || userInConsult)
                                ? translate('multiParty')
                                : translate(controls[control].controlText), arrow: true }, { children: _jsx("div", Object.assign({ "aria-label": '' }, { children: _jsx(CcfIconButton, Object.assign({ "aria-label": viewControlText(controls, control), onClick: (e) => controlClicked(control, e), tabIndex: 0, disabled: !controls[control].isEnable, "data-testid": control, sx: [contactControlSx, styles.callControlDisabled] }, { children: dialPadIcons.get(controls[control].controlText.toLowerCase()) })) })) }), `${control}-${index}`))), usersInConference.length <= 1 && !userInConsult && showKeypad && (_jsx(CcfTooltip, Object.assign({ arrow: true, title: translate('keypad') }, { children: _jsx("div", Object.assign({ "aria-label": '' }, { children: _jsx(CcfIconButton, Object.assign({ "aria-label": contactButtons.keypad, onClick: (e) => controlClicked(contactButtons.keypad, e), tabIndex: 0, "data-testid": "keypad", sx: contactControlSx }, { children: dialPadIcons.get(contactButtons.keypad) })) })) }), 'keypad')), !onlyShowHangup &&
                        usersInConference.length <= 1 &&
                        !userInConsult &&
                        (relevantIndicators === null || relevantIndicators === void 0 ? void 0 : relevantIndicators.length) &&
                        (relevantIndicators === null || relevantIndicators === void 0 ? void 0 : relevantIndicators.length) > 0 ? (_jsx("div", Object.assign({ "aria-label": '' }, { children: _jsx(CcfIconButton, Object.assign({ tabIndex: 0, "data-testid": "launch", disabled: (voiceContact === null || voiceContact === void 0 ? void 0 : voiceContact.status.toLocaleLowerCase()) === VoiceContactStatus.DISCONNECTED, sx: contactControlSx }, { children: _jsx(CcfLaunchButton, { contactId: voiceContact.contactID, sx: controlStyles.controlIconsResponsiveStyles, isRevampedIcon: true }) })) }))) : null, isBelowXl && type !== 'conference' && usersInConference.length <= 1 && !userInConsult && (_jsx(RenderMoreThanTwoControls, { multipleControls: false, controlClicked: controlClicked, voiceContact: voiceContact, activeDisposition: activeDisposition, elevatedFrom: (props.elevatedFrom) }))] }))), props.elevatedFrom && voiceContactCard && !(userInConsult && userInConsult.contact) && !isBelowXl && (usersInConference.length <= 1) && (_jsxs(CcfTypography, Object.assign({ sx: [styles.timerStyles, (isDiscarded) ? styles.timerDisable : null] }, { children: [translate('call'), " ", translate('time'), " - ", '', _jsx(Timer, { countUp: true, start: 0, stop: Number.MAX_SAFE_INTEGER, startReference: Number(new Date((_c = voiceContactCard[0]) === null || _c === void 0 ? void 0 : _c.contactReceivedTime)) }, ((_d = voiceContactCard[0]) === null || _d === void 0 ? void 0 : _d.contactId) + '_contactDurationCounter')] }))), (!isBelowXl) && type !== 'conference' && (_jsx(RenderMoreThanTwoControls, { multipleControls: callControlsCount > 3 || onlyShowHangup, controlClicked: controlClicked, voiceContact: voiceContact, activeDisposition: activeDisposition, onlyShowHangup: onlyShowHangup, elevatedFrom: (props.elevatedFrom) })), props.elevatedFrom && voiceContactCard && !isBelowXl && type !== 'conference' && ((userInConsult && userInConsult.contact) || usersInConference.length > 1) && (_jsxs(CcfTypography, Object.assign({ sx: styles.timerStyles }, { children: [translate('call'), " ", translate('time'), " - ", '', _jsx(Timer, { countUp: true, start: 0, stop: Number.MAX_SAFE_INTEGER, startReference: Number(new Date((_e = voiceContactCard[0]) === null || _e === void 0 ? void 0 : _e.contactReceivedTime)) }, ((_f = voiceContactCard[0]) === null || _f === void 0 ? void 0 : _f.contactId) + '_contactDurationCounter')] })))] }))) : null;
}
export default CcfContactControls;
//# sourceMappingURL=ccf-contact-controls.js.map