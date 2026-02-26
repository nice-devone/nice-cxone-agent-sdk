import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { Box, Stack, useTheme } from '@mui/material';
import { MediaType, VoiceContactStatus } from '@nice-devone/common-sdk';
import { CcfTooltip, CcfTypography, CcfOutboundIcon, CcfInboundIcon, useTranslator } from '@nice-devone/ui-controls';
import ccfAssignmentCardStyle from '../../ccf-assignment-panel/ccf-assignment-card/ccf-assignment-card.style';
import CcfVoiceContactInfoStyles from './ccf-voice-contact-info.style';
import { selectUserInConference, selectUserInConsult } from '../../ccf-assignment-panel/ccf-assignment-panel.slice';
import { useSelector } from 'react-redux';
import { CHANNEL_ICON_NAME } from '../../ccf-icon/ccf-icon-list';
import { CcfIcon, CHANNEL_ICON_SIZE } from '../../ccf-icon/ccf-icon';
/**
 * @returns CcfVoiceContactInfo
 * @example <CcfVoiceContactInfo />
 */
export const CcfVoiceContactInfo = ({ contact, isNaturalCalling, isSmView, isSmViewConference, voiceContact, consultAgentDetail, timer, inboundContactDetail, }) => {
    const theme = useTheme();
    const styles = CcfVoiceContactInfoStyles(theme);
    const assignmentCardStyle = ccfAssignmentCardStyle(theme, contact.slaIndicator);
    const [translate] = useTranslator();
    const userInConsult = useSelector(selectUserInConsult);
    const usersInConference = useSelector(selectUserInConference);
    const isMultiPartyCall = (usersInConference.length > 1 || userInConsult) ? true : false;
    const [assignmentCardTitle, setAssignmentCardTitle] = useState('');
    const [skillOrQueueName, setSkillOrQueueName] = useState('');
    /**
     *
     * @returns assignmentCardTitle
     * @example customer name, workitem type, or unknown
     *
     */
    const CalculateAssignmentCardTitle = () => {
        if ((contact === null || contact === void 0 ? void 0 : contact.contactMode) && (contact === null || contact === void 0 ? void 0 : contact.media) === MediaType.VOICE && ((contact === null || contact === void 0 ? void 0 : contact.contactStatus) === VoiceContactStatus.INCOMING || (contact === null || contact === void 0 ? void 0 : contact.contactStatus) === VoiceContactStatus.RINGING)
            && inboundContactDetail && Object.keys(inboundContactDetail).length !== 0) {
            return ((inboundContactDetail === null || inboundContactDetail === void 0 ? void 0 : inboundContactDetail.firstName) + ' ' + (inboundContactDetail === null || inboundContactDetail === void 0 ? void 0 : inboundContactDetail.lastName));
        }
        if (voiceContact.skill === '0') {
            return consultAgentDetail && (consultAgentDetail.firstName + ' ' + consultAgentDetail.lastName) || '';
        }
        if (contact.currentContactState === VoiceContactStatus.INQUEUE) {
            return (voiceContact.ani) ? voiceContact.ani : translate('noContactInfo');
        }
        else if (contact.customerName) {
            return contact.customerName;
        }
        else if (contact.contactMode) {
            return contact.contactMode;
        }
        else
            return translate('unknown');
    };
    const showCallIcon = contact.isOutbound ?
        _jsx(CcfOutboundIcon, { sx: assignmentCardStyle.directionIcon })
        : _jsx(CcfInboundIcon, { sx: assignmentCardStyle.directionIcon });
    /**
     * getContactHeader - contact header for Cxone agent on P2P
     * @example getContactHeader
    */
    const getContactHeader = () => {
        if ((voiceContact === null || voiceContact === void 0 ? void 0 : voiceContact.skill) === '0') {
            return (consultAgentDetail && consultAgentDetail.firstName + ' ' + consultAgentDetail.lastName) || '';
        }
        else if (voiceContact === null || voiceContact === void 0 ? void 0 : voiceContact.label) {
            return voiceContact === null || voiceContact === void 0 ? void 0 : voiceContact.label;
        }
        else if ((voiceContact === null || voiceContact === void 0 ? void 0 : voiceContact.isInbound) && (voiceContact === null || voiceContact === void 0 ? void 0 : voiceContact.ani) !== '') {
            return voiceContact === null || voiceContact === void 0 ? void 0 : voiceContact.ani;
        }
        else if ((voiceContact === null || voiceContact === void 0 ? void 0 : voiceContact.dnis) !== '') {
            return voiceContact === null || voiceContact === void 0 ? void 0 : voiceContact.dnis;
        }
        else {
            return translate('unknown');
        }
    };
    useEffect(() => {
        var _a;
        setAssignmentCardTitle(CalculateAssignmentCardTitle());
        const skillOrQueueName = contact.currentContactState === VoiceContactStatus.INQUEUE ? voiceContact.skillName : (_a = contact.skillOrQueueName) !== null && _a !== void 0 ? _a : contact.contactMode;
        setSkillOrQueueName(skillOrQueueName);
    }, [contact, consultAgentDetail, CalculateAssignmentCardTitle, voiceContact.status, voiceContact.skillName]);
    return (_jsx(Box, Object.assign({ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: isSmViewConference ? 'auto' : '100%' }, { children: _jsxs(Stack, Object.assign({ flexDirection: 'row', margin: '5px', alignItems: 'center' }, { children: [(isNaturalCalling || isSmViewConference) && isSmView &&
                    _jsx(CcfTooltip, Object.assign({ title: (contact.isOutbound || isMultiPartyCall) ? translate('ob_call') : translate('ib_call'), disableInteractive: true, arrow: true }, { children: _jsx("span", { children: _jsx(CcfIcon, { customStyle: { display: 'flex', alignItems: 'center', marginRight: '5px' }, iconName: (contact.isOutbound || isMultiPartyCall) ? CHANNEL_ICON_NAME.OBCALL : CHANNEL_ICON_NAME.IBCALL, size: CHANNEL_ICON_SIZE.SMALL }) }) })), _jsxs(Stack, Object.assign({ flexDirection: 'column', sx: { overflow: 'hidden' } }, { children: [(isSmViewConference && Object.keys(voiceContact).length > 0) ?
                            _jsx(CcfTypography, Object.assign({ variant: "inherit", sx: [assignmentCardStyle.customerName, assignmentCardStyle.contentWrap] }, { children: `${getContactHeader()}` }))
                            :
                                (_jsx(CcfTooltip, Object.assign({ title: assignmentCardTitle, arrow: true }, { children: _jsx("div", { children: _jsx(CcfTypography, Object.assign({ variant: "inherit", sx: assignmentCardStyle.customerName }, { children: assignmentCardTitle })) }) }))), isNaturalCalling && !isSmViewConference &&
                            _jsx(CcfTypography, Object.assign({ sx: isNaturalCalling && isSmView ? styles.phoneNumberPC : styles.phoneNumber }, { children: contact.contactMode })), _jsxs(Box, Object.assign({ sx: styles.cardHeader }, { children: [!isSmViewConference && contact ? showCallIcon : '', _jsx(CcfTooltip, Object.assign({ title: skillOrQueueName, arrow: true, "aria-label": skillOrQueueName }, { children: _jsx(Box, Object.assign({ component: "div", sx: (isSmView && !isSmViewConference && contact.contactStatus === 'incoming') ? assignmentCardStyle.smallViewChannelDetail2 : assignmentCardStyle.channelDetail2 }, { children: _jsx(CcfTypography, Object.assign({ sx: assignmentCardStyle.skillOrQueueToolTip, variant: "inherit" }, { children: skillOrQueueName })) })) }))] }))] }))] })) })));
};
//# sourceMappingURL=ccf-voice-contact-info.js.map