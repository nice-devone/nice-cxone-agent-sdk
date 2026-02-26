import { jsx as _jsx } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { CHANNEL_ICON_NAME, iconList } from '../../ccf-icon/ccf-icon-list';
import { useTheme } from '@mui/material';
import { MediaType } from '@nice-devone/common-sdk';
import { useDispatch, useSelector } from 'react-redux';
import { cxoneAgentVoiceContactData, getContactHistoryDisposition, getDispositionsForSkill } from './ccf-agent-contact-history.slice';
import { CcfRegexPatterns } from '@nice-devone/shared-apps-lib';
import { dialExternalNumber } from '../../ccf-call-conference/ccf-call-conference.slice';
import { phoneOBSkillsSelector } from '../../ccf-agent-skill/ccf-agent-skill-details-slice';
import { AgentMultiSkillHoverDropDownView } from '../../ccf-outbound-options/ccf-outbound-options';
import { agentDirectoryActions, getSkillIdSelectedForInteraction } from '../../ccf-directory/+state/ccf-directory.slice';
import { DispositionModalView } from './disposition-modal-view';
import { getAgentProfileSettings } from '../../ccf-agent-setting/ccf-agent-setting-slice';
/**
 * Disposition Modal component to show dispositon notes and tags for contact histories.
 * @param modalData - data passed to modal
 * @param setModalData - set the data passed to the modal, making it a controlled component
 * @example <DispositionModal />
 */
export function DispositionModal({ modalData, setModalData }) {
    var _a, _b;
    /**
     * callback to close the modal by setting the modalData to null
     * @example handleClose()
     */
    const handleClose = () => setModalData(null);
    const theme = useTheme();
    const iconSize = '1.5rem';
    const agentProfileSettings = useSelector(getAgentProfileSettings);
    const channelIcon = modalData.channelName
        ? iconList[modalData.channelName](iconSize, {
            htmlColor: (_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.text) === null || _b === void 0 ? void 0 : _b.noteLabel,
        })
        : '';
    const [dispositionNotes, setDispositionNotes] = useState();
    const [disposition, setDisposition] = useState();
    const [skill, setSkill] = useState(false);
    const dispatch = useDispatch();
    const getContactHistoryVoiceContacts = useSelector(cxoneAgentVoiceContactData);
    const outboundSkill = useSelector(phoneOBSkillsSelector);
    const skillId = useSelector(getSkillIdSelectedForInteraction);
    const [selectSkillWarning, setSelectSkillWarning] = useState(false);
    useEffect(() => {
        setDispositionNotes(modalData.dispositionNotes);
        // currently 'disposition notes' are available in ACD contact history response,
        // but for digital, we need to fetch them individually
        if (modalData.mediaType === MediaType.DIGITAL)
            dispatch(getContactHistoryDisposition(modalData.contactId))
                .unwrap()
                .then((dispositionResponse) => {
                setDispositionNotes(dispositionResponse === null || dispositionResponse === void 0 ? void 0 : dispositionResponse.notes);
                setDisposition(dispositionResponse === null || dispositionResponse === void 0 ? void 0 : dispositionResponse.dispositionName);
            });
        // getContactHistoryDisposition is not working for ACD (refer to AW-17332), so we have to
        // first get all the dispositions for a skill and then filter the one we are looking for
        if (modalData.mediaType === MediaType.VOICE && modalData.dispositionId && modalData.skillId) {
            dispatch(getDispositionsForSkill({ skillId: modalData.skillId, mediaType: MediaType.VOICE }))
                .unwrap()
                .then((dispositions) => {
                if (dispositions) {
                    const primaryDisposition = dispositions.find((disposition) => disposition.dispositionId === modalData.dispositionId);
                    primaryDisposition && setDisposition(primaryDisposition.dispositionName);
                }
            });
        }
        dispatch(agentDirectoryActions.updateSkillIdSelectedForInteraction(null));
    }, []);
    useEffect(() => {
        setSelectSkillWarning(skillId === -1);
    }, [skillId]);
    /**
     * dailToPhone call
     * @example dailToPhone(number,number)
     */
    const dailToPhone = (skillId, number) => {
        const contactDetails = {
            skillId: skillId,
            phoneNumber: number.toString().replace(CcfRegexPatterns.specialCharFormat, ''),
        };
        dispatch(dialExternalNumber({
            skillId: contactDetails.skillId,
            phoneNumber: contactDetails.phoneNumber,
            triggerType: MediaType.VOICE,
        }));
    };
    /**
     * Outbound voice call
     * @example voiceCall()
     */
    const voiceCall = () => {
        const getVoiceContact = getContactHistoryVoiceContacts === null || getContactHistoryVoiceContacts === void 0 ? void 0 : getContactHistoryVoiceContacts.find((item) => item.contactId === (modalData === null || modalData === void 0 ? void 0 : modalData.contactId));
        const { skillId: skillIdSelectedForInteraction, toAddr: number, fromAddr: contact } = getVoiceContact;
        if (outboundSkill.length > 1 && modalData.channelName === CHANNEL_ICON_NAME.IBCALL) {
            setSkill(true);
        }
        if (outboundSkill.length > 1 && modalData.channelName === CHANNEL_ICON_NAME.IBCALL && skillId && skillId !== undefined) {
            const skillIdCheck = skillId === -1 ? skillIdSelectedForInteraction : skillId;
            dailToPhone(skillIdCheck, contact);
        }
        else if (outboundSkill.length === 1 && modalData.channelName === CHANNEL_ICON_NAME.IBCALL) {
            dailToPhone(outboundSkill[0].skillId, contact);
            setModalData(null);
        }
        if (number !== undefined && skillIdSelectedForInteraction !== undefined && modalData.channelName === CHANNEL_ICON_NAME.OBCALL) {
            dailToPhone(skillIdSelectedForInteraction, number);
            setModalData(null);
        }
        if (skillId !== null && skillId !== -1) {
            setModalData(null);
        }
    };
    /**
     * Function to handle trigger for outbound
     * @param triggerValue - boolean
     * @param triggerType - string
     * @example - handleTrigger(true, triggerType.type)
     */
    const cancelHandler = (e, outboundState) => {
        e.stopPropagation();
        dispatch(agentDirectoryActions.updateSkillSelectorToggle(outboundState));
    };
    /**
     * To display the Button Label
     * @example - buttonLabel
     */
    let buttonLabel = '';
    if (modalData.channelName === CHANNEL_ICON_NAME.OBCALL && !(agentProfileSettings === null || agentProfileSettings === void 0 ? void 0 : agentProfileSettings.hideOBRedial)) {
        buttonLabel = 'redial';
    }
    else if (modalData.channelName === CHANNEL_ICON_NAME.IBCALL) {
        buttonLabel = 'callback';
    }
    const skillDropdownComponent = skill ? (_jsx(AgentMultiSkillHoverDropDownView, { OBChannels: [], customerName: "", data: outboundSkill, DigitalOBSkills: [], handleTrigger: voiceCall, triggerType: 'voice', IBcall: true, cancelHandler: cancelHandler })) : null;
    return (_jsx(DispositionModalView, { modalData: modalData, handleClose: handleClose, channelIcon: channelIcon, disposition: disposition, dispositionNotes: dispositionNotes, skill: skill, skillDropdownComponent: skillDropdownComponent, buttonLabel: buttonLabel, selectSkillWarning: selectSkillWarning, outboundSkill: outboundSkill, voiceCall: voiceCall }));
}
export default DispositionModal;
//# sourceMappingURL=disposition-modal.js.map