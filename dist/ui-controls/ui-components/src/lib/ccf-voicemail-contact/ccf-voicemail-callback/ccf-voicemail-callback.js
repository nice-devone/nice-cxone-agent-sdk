import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { MenuItem, Stack, Box, Popover, useTheme, } from '@mui/material';
import { CcfButton, CcfTextField, CcfTypography, CcfCloseIcon, CcfIconButton, useTranslator, CcfTooltip, } from '@nice-devone/ui-controls';
import { useSelector, useDispatch } from 'react-redux';
import React, { useState, useRef, useEffect } from 'react';
import { phoneOBSkillsSelector } from '../../ccf-agent-skill/ccf-agent-skill-details-slice';
import { isValidPhoneNumber } from '../../../util/uiValidationUtils';
import { voiceMailContactSelector, CcfAssignmentAction, voiceContactSelector, voiceContactCardSelector, getAssignmentPanelMetadata, getAllInteractions, } from '../../ccf-assignment-panel/ccf-assignment-panel.slice';
import { VoiceMailContactEventStatus } from '@nice-devone/core-sdk';
import { CXoneAcdClient } from '@nice-devone/acd-sdk';
import contactControlStyles from '../../../styles/ccf-contact-control.style';
/**
   * CcfVoiceMailCallbackPopover used to display voicemail callback UI
   * @param iconComponent - CcfVoicemailCallbackPopoverProps
   *
   * @example <CcfVoiceMailCallbackPopover/>
   */
export const CcfVoiceMailCallbackPopover = ({ iconComponent, sx, }) => {
    var _a, _b;
    const theme = useTheme();
    const contactControlIconStyles = contactControlStyles(theme);
    const [translate] = useTranslator();
    const [validateForm, setValidateForm] = useState({
        phone: '',
        skill: '',
    });
    const skillId = useRef(null);
    const phoneNumber = useRef(null);
    const phoneOBSkills = useSelector(phoneOBSkillsSelector);
    const cxoneAcdClient = CXoneAcdClient.instance;
    const voiceMailContact = useSelector(voiceMailContactSelector);
    const [skill, setSkill] = React.useState(phoneOBSkills && ((_a = phoneOBSkills[0]) === null || _a === void 0 ? void 0 : _a.skillId.toString()));
    const [phoneNo, setPhoneNo] = React.useState((_b = voiceMailContact === null || voiceMailContact === void 0 ? void 0 : voiceMailContact.voiceMailEventData) === null || _b === void 0 ? void 0 : _b.from);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const dispatch = useDispatch();
    const voiceContact = useSelector(voiceContactSelector);
    const voiceContactCard = useSelector(voiceContactCardSelector);
    const assignmentPanelMetadata = useSelector(getAssignmentPanelMetadata);
    const allInteractions = useSelector(getAllInteractions);
    const hasCallContact = Boolean(assignmentPanelMetadata.voiceInteractionId && allInteractions[assignmentPanelMetadata.voiceInteractionId] && Object.keys(allInteractions[assignmentPanelMetadata.voiceInteractionId]).length && Object.keys(allInteractions[assignmentPanelMetadata.voiceInteractionId].acdContacts).length > 0);
    /**
     * To display the error message when dialed an invalid phone number
     * @example
    */
    useEffect(() => {
        if ((voiceContact === null || voiceContact === void 0 ? void 0 : voiceContact.disconnectCode) === 'Error') {
            dispatch(CcfAssignmentAction.setCtdDisplayError(true));
            setTimeout(() => {
                dispatch(CcfAssignmentAction.setCtdDisplayError(false));
            }, 3000);
        }
    }, [voiceContactCard]);
    /**
     * Function to set the initial state for phoneNo and skill
     * @example setToInitialState()
     */
    const setToInitialState = () => {
        var _a, _b;
        const fromAni = ((_a = voiceMailContact === null || voiceMailContact === void 0 ? void 0 : voiceMailContact.voiceMailEventData) === null || _a === void 0 ? void 0 : _a.from) || '';
        setPhoneNo(fromAni);
        setSkill(phoneOBSkills && ((_b = phoneOBSkills[0]) === null || _b === void 0 ? void 0 : _b.skillId.toString()));
        setValidateForm(Object.assign(Object.assign({}, validateForm), { phone: !isValidPhoneNumber(fromAni) || !fromAni ? translate('phoneErrorMessage') : '' }));
    };
    /**
     * Function to close the popover
     * @example handleClosePopover()
     */
    const handleClosePopover = () => {
        setToInitialState();
        setAnchorEl(null);
    };
    /**
     * Function to open the popover
     * @example handleCallbackIconClick()
     */
    const handleCallbackIconClick = (event) => {
        setToInitialState();
        setAnchorEl(event.currentTarget);
    };
    /**
     * Handle validation
     * @example validateVoicemailCallbackForm()
     */
    const validateVoicemailCallbackForm = (event) => {
        const { name, value } = event.target;
        switch (name) {
            case 'phone': {
                setValidateForm(Object.assign(Object.assign({}, validateForm), { [name]: !isValidPhoneNumber(value) || !value ? translate('phoneErrorMessage') : '' }));
                break;
            }
        }
    };
    /**
     * handlePhoneNoChange is to set the phoneNo and call validation when the phone number is changed
     * @example handlePhoneNoChange()
     */
    const handlePhoneNoChange = (event) => {
        setPhoneNo(event.target.value);
        validateVoicemailCallbackForm(event);
    };
    /**
     * onSkillChange is to set the skill value when the skill is changed
     * @example onSkillChange()
     */
    const onSkillChange = (event) => {
        setSkill(event.target.value);
    };
    /**
     *initiateOutboundCall is to initiate outbound call
     * @example initiateOutboundCall()
     */
    const initiateOutboundCall = () => {
        var _a, _b;
        if (!((_a = skillId === null || skillId === void 0 ? void 0 : skillId.current) === null || _a === void 0 ? void 0 : _a.value) || !((_b = phoneNumber === null || phoneNumber === void 0 ? void 0 : phoneNumber.current) === null || _b === void 0 ? void 0 : _b.value))
            return;
        const contactDetails = {
            skillId: parseInt(skillId.current.value),
            phoneNumber: phoneNumber.current.value,
            parentContactId: voiceMailContact.contactID,
        };
        if (voiceMailContact.voiceMailEventData.status !== VoiceMailContactEventStatus.HOLDING) {
            voiceMailContact.pause().then(() => {
                cxoneAcdClient.contactManager.voiceService.dialPhone(contactDetails);
                handleClosePopover();
            });
        }
        else {
            cxoneAcdClient.contactManager.voiceService.dialPhone(contactDetails);
            handleClosePopover();
        }
        ;
    };
    return (_jsxs("div", { children: [_jsx(CcfTooltip, Object.assign({ title: translate('callback'), arrow: true, placement: 'left' }, { children: _jsx("div", { children: _jsx(CcfIconButton, Object.assign({ disabled: hasCallContact, onClick: handleCallbackIconClick, "aria-controls": "callControlDialog", "aria-haspopup": "true", "data-testid": "callback", sx: Object.assign(Object.assign({}, sx), contactControlIconStyles.disabled) }, { children: iconComponent })) }) }), 'callback'), _jsx(Popover, Object.assign({ id: "voiceMailCallbackPopover", open: open, keepMounted: true, anchorEl: anchorEl, onClose: handleClosePopover, anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'right',
                } }, { children: _jsxs(Stack, Object.assign({ spacing: 2, sx: { padding: '0em 1.2em' } }, { children: [_jsxs(Box, Object.assign({ sx: { marginTop: '.5em', display: 'flex', justifyContent: 'space-between' } }, { children: [_jsx(CcfTypography, { sx: { fontWeight: 'bold', textTransform: 'capitalize' }, translationKey: "callback" }), _jsx(CcfCloseIcon, { viewBox: "-8 -6 32 32", onClick: handleClosePopover, fontSize: "medium" })] })), _jsx(CcfTextField, { name: "phone", id: "phone", size: "small", inputProps: { 'data-testid': 'phone' }, onChange: handlePhoneNoChange, error: !!validateForm.phone, helperText: validateForm.phone, inputRef: phoneNumber, value: phoneNo, label: translate('phoneNumber') }), _jsx(CcfTextField, Object.assign({ id: "skill", fullWidth: true, select: true, name: "skill", size: "small", inputRef: skillId, onChange: onSkillChange, value: skill, label: translate('skill'), inputProps: { 'data-testid': 'skill' } }, { children: phoneOBSkills && phoneOBSkills.map((data) => (_jsx(MenuItem, Object.assign({ dense: true, value: data.skillId, title: data.skillName }, { children: data.skillName }), data.skillName))) })), _jsxs(Box, Object.assign({ sx: { paddingBottom: '1em', display: 'flex', justifyContent: 'space-evenly' } }, { children: [_jsx(CcfButton, Object.assign({ variant: "contained", onClick: handleClosePopover, "data-testid": "cancel" }, { children: _jsx(CcfTypography, { translationKey: "cancel" }) })), _jsx(CcfButton, Object.assign({ primary: true, onClick: initiateOutboundCall, variant: "contained", "data-testid": "call" }, { children: _jsx(CcfTypography, { translationKey: "call" }) }))] }))] })) }))] }));
};
export default CcfVoiceMailCallbackPopover;
//# sourceMappingURL=ccf-voicemail-callback.js.map