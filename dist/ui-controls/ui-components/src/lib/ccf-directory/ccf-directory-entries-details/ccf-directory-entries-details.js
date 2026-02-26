import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Box, Collapse, IconButton, Typography, useTheme } from '@mui/material';
import { CcfAccordion, CcfAccordionDetails, CcfAccordionSummary, CcfBackIcon, CcfDoubleArrowIcon, CcfEmailIcon, CcfPhoneOutboundIcon, CcfTooltip, CcfTransferArrowsIcon, CcfTypography, useTranslator, } from '@nice-devone/ui-controls';
import { FieldType, ProfileType, getStateName, getStatusIcon } from '../ccf-directory-utils';
import { VoiceContactStatus } from '@nice-devone/common-sdk';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { agentDirectoryActions, getSkillIdSelectedForInteraction, getSkillSelectorToggleValue, selectFullViewDirectoryFlg } from '../+state/ccf-directory.slice';
import { AgentMultiSkillHoverDropDownView } from './ccf-multiskill-dropdown';
import { DirectoryEntryInfoCard } from './ccf-directory-entry-card';
import { isOutboundSkillSelector, phoneOBSkillsSelector } from '../../ccf-agent-skill/ccf-agent-skill-details-slice';
import directoryEntryDetailsStyles from './ccf-directory-entries-details.styles';
import ccfDirectoryStyles from '../ccf-directory.styles';
import CcfOutboundOptions from '../../ccf-outbound-options/ccf-outbound-options';
import { callConferenceActions, conferenceHold, conferenceNo, dialExternalNumber, holdCall } from '../../ccf-call-conference/ccf-call-conference.slice';
import { voiceContactSelector, CcfAssignmentAction } from '../../ccf-assignment-panel/ccf-assignment-panel.slice';
export var CallType;
(function (CallType) {
    CallType["VOICE"] = "voice";
    CallType["TRANSFER"] = "transfer";
})(CallType || (CallType = {}));
/**
 * Component to be used for directory entries
 *  * @param props - directoryEntryDetails
 * @example <CcfDirectoryEntryDetails />
 * @returns
 */
const CcfDirectoryEntryDetails = (props) => {
    var _a;
    const [translate] = useTranslator();
    const dispatch = useDispatch();
    const theme = useTheme();
    const classes = directoryEntryDetailsStyles(theme);
    const directoryStyles = ccfDirectoryStyles(theme);
    const { directoryEntryDetails } = props;
    /**
     * back button to go back to directory entries
     * @example - backToEntries
     */
    const backToEntries = () => {
        dispatch(agentDirectoryActions.setExternalDirectoryDrillDown(false));
        dispatch(agentDirectoryActions.updateSkillIdSelectedForInteraction(null));
    };
    const directoryEntryPartnerType = (_a = Object.keys(directoryEntryDetails).filter((key) => Array.isArray(directoryEntryDetails[key]) &&
        directoryEntryDetails[key].filter((item) => (item.profileType === ProfileType.PHONE || item.profileType === ProfileType.EMAIL) &&
            item.value).length)) === null || _a === void 0 ? void 0 : _a.sort();
    return (_jsxs(_Fragment, { children: [_jsxs(Box, Object.assign({ sx: classes.directoryItem }, { children: [_jsxs(Box, Object.assign({ sx: classes.directoryUser }, { children: [_jsx(IconButton, Object.assign({ onClick: backToEntries, onKeyPress: (e) => {
                                    if (e.key === 'Enter')
                                        backToEntries();
                                }, tabIndex: 0, "data-testid": 'back-icon', sx: classes.paddingR2 }, { children: _jsx(CcfBackIcon, { sx: classes.icon }) })), _jsx(Typography, Object.assign({ sx: [classes.directoryEntryLabel, classes.ellipsisWithTooltip], title: `${directoryEntryDetails === null || directoryEntryDetails === void 0 ? void 0 : directoryEntryDetails.firstname} ${directoryEntryDetails === null || directoryEntryDetails === void 0 ? void 0 : directoryEntryDetails.lastname}` }, { children: `${directoryEntryDetails === null || directoryEntryDetails === void 0 ? void 0 : directoryEntryDetails.firstname} ${directoryEntryDetails === null || directoryEntryDetails === void 0 ? void 0 : directoryEntryDetails.lastname}` }))] })), _jsxs(Box, Object.assign({ sx: classes.directoryItemUserStatus }, { children: [getStatusIcon(directoryEntryDetails === null || directoryEntryDetails === void 0 ? void 0 : directoryEntryDetails.unifiedStatus, directoryStyles.icon), _jsx(Typography, Object.assign({ noWrap: true, sx: classes.text }, { children: getStateName(directoryEntryDetails === null || directoryEntryDetails === void 0 ? void 0 : directoryEntryDetails.unifiedStatus, translate) }))] }))] })), directoryEntryPartnerType.map((type, index) => (_jsx(DirectoryEntryPartnerType, { partnerType: type, directoryEntryDetails: directoryEntryDetails[type] }, type[index])))] }));
};
/**
 * Component to be used for email type entities
 * @param props - emailCardDetails
 * @example <DirectoryEntryEmailCard />
 * @returns
 */
const DirectoryEntryEmailCard = (props) => {
    const theme = useTheme();
    const [translate] = useTranslator();
    const isFullViewDirectoryState = useSelector(selectFullViewDirectoryFlg);
    const { emailCardDetails } = props;
    const classes = directoryEntryDetailsStyles(theme);
    const [showOutBoundEmailOption, setShowOutBoundEmailOption] = useState(false);
    const isFullViewStyle = isFullViewDirectoryState ? classes.fullViewPartnerInfo : classes.mainContainer;
    return (_jsxs(_Fragment, { children: [_jsxs(Box, Object.assign({ sx: isFullViewStyle }, { children: [_jsxs(Box, Object.assign({ style: classes.emailText }, { children: [_jsx(Box, Object.assign({ sx: classes.directoryUser }, { children: _jsx(Typography, Object.assign({ noWrap: true, sx: classes.directoryEntryText }, { children: emailCardDetails.displayName })) })), _jsx(Box, Object.assign({ sx: classes.ellipsisWithTooltip }, { children: _jsx(Typography, Object.assign({ noWrap: true, sx: classes.directoryEntryCardText, title: emailCardDetails.value }, { children: emailCardDetails.value })) }))] })), _jsx(Box, Object.assign({ sx: classes.flex }, { children: _jsx(CcfTooltip, Object.assign({ title: translate('email'), arrow: true }, { children: _jsx(IconButton, Object.assign({ onClick: () => { setShowOutBoundEmailOption(!showOutBoundEmailOption); }, onKeyPress: (e) => {
                                    if (e.key === 'Enter')
                                        setShowOutBoundEmailOption(!showOutBoundEmailOption);
                                }, tabIndex: 0, "data-testid": 'emailIconBtn', sx: classes.iconButtonCircle }, { children: _jsx(CcfEmailIcon, { sx: [classes.icon, classes.iconButtonCircle_mailIcon] }) })) })) }))] })), _jsx(Box, { children: showOutBoundEmailOption && _jsx(CcfOutboundOptions, { number: emailCardDetails.value, skills: [], textStyle: { display: 'inline' } }) })] }));
};
/**
 * Component to be used for phone type entities
 * @param props - phoneCardDetails, setDirectoryEntries ,selectedDirectoryEntries
 * @example <DirectoryEntryPhoneCard />
 * @returns
 */
const DirectoryEntryPhoneCard = (props) => {
    var _a, _b, _c;
    const dispatch = useDispatch();
    const theme = useTheme();
    const classes = directoryEntryDetailsStyles(theme);
    const { phoneCardDetails, selectedDirectoryEntries, childToParentSelectedPhone } = props;
    const skillIdSelectedForInteraction = useSelector(getSkillIdSelectedForInteraction);
    const toggleSkillSelector = useSelector(getSkillSelectorToggleValue);
    const toggleValue = (_a = toggleSkillSelector.find((item) => item.triggerType === 'voice')) === null || _a === void 0 ? void 0 : _a.triggerState;
    const userHaveOutboundSkill = useSelector(isOutboundSkillSelector);
    const phoneOBSkills = useSelector(phoneOBSkillsSelector);
    const [translate] = useTranslator();
    const isFullViewDirectoryState = useSelector(selectFullViewDirectoryFlg);
    const isFullViewStyle = isFullViewDirectoryState ? classes.fullViewPartnerInfo : classes.mainContainer;
    const currentConferenceNo = useSelector(conferenceNo);
    const voiceContact = useSelector(voiceContactSelector);
    const [triggerType, setTriggerType] = useState('');
    /**
   * Function to handle trigger for outbound
   * @param triggerValue - boolean
   * @param triggerType - string
   * @example - handleTrigger(true, triggerType.type)
   */
    const handleTrigger = (event) => {
        event.stopPropagation();
        dispatch(agentDirectoryActions.updateSkillSelectorToggle({
            triggerState: false,
            triggerType: triggerType,
        }));
        handleExternalCall(event, triggerType);
        childToParentSelectedPhone(selectedDirectoryEntries.map(item => (Object.assign(Object.assign({}, item), { selected: false }))));
    };
    /**
  * Function to dial external call
  * @param event - event
  * @param triggerCallType - voice/transfer
  * @example - handleExternalCall(event, triggerCallType)
  */
    const handleExternalCall = (event, triggerCallType) => {
        var _a, _b;
        const callStatus = (_a = voiceContact === null || voiceContact === void 0 ? void 0 : voiceContact.status) === null || _a === void 0 ? void 0 : _a.toLowerCase();
        if (((_b = event.target) === null || _b === void 0 ? void 0 : _b.innerText) !== 'Cancel') {
            let outboundSkill;
            if (skillIdSelectedForInteraction) {
                outboundSkill = skillIdSelectedForInteraction;
                const contactDetails = {
                    skillId: outboundSkill,
                    phoneNumber: phoneCardDetails.value.split(' ').join(''),
                };
                if (callStatus && callStatus === VoiceContactStatus.ACTIVE) {
                    dispatch(callConferenceActions.dialExternalContact({
                        isExternalNumberDialed: true,
                        voiceContact: voiceContact,
                        skillId: outboundSkill,
                        phoneNumber: contactDetails.phoneNumber,
                        triggerType: triggerCallType,
                    }));
                    dispatch(holdCall({ voiceContact }));
                }
                else if (callStatus && callStatus === VoiceContactStatus.JOINED && currentConferenceNo) {
                    dispatch(callConferenceActions.dialExternalContact({
                        isExternalNumberDialed: true,
                        voiceContact: voiceContact,
                        skillId: outboundSkill,
                        phoneNumber: contactDetails.phoneNumber,
                        triggerType: triggerCallType,
                    }));
                    dispatch(conferenceHold(currentConferenceNo));
                }
                else if (!callStatus || callStatus === VoiceContactStatus.HOLDING || callStatus === VoiceContactStatus.JOINED) {
                    dispatch(dialExternalNumber({
                        skillId: contactDetails.skillId,
                        phoneNumber: contactDetails.phoneNumber,
                        triggerType: triggerCallType,
                    }));
                }
                if (triggerType === 'transfer') {
                    dispatch(CcfAssignmentAction.setExternalDirectoryTransfer(true));
                }
            }
        }
        ;
    };
    /**
  * Function to handle trigger for outbound
  * @param event - event
  * @param phoneCardDetails - DirectoryEntrySelectionAttr
  * @example - triggerPhoneClick(event, phoneCardDetails)
  */
    const triggerPhoneClick = (event, phoneCardDetails, triggerType) => {
        if ((phoneOBSkills === null || phoneOBSkills === void 0 ? void 0 : phoneOBSkills.length) > 1 && userHaveOutboundSkill) {
            setTriggerType(triggerType);
            dispatch(agentDirectoryActions.updateSkillSelectorToggle({
                triggerState: !toggleValue,
                triggerType: CallType.VOICE,
            }));
            for (let i = 0; i < selectedDirectoryEntries.length; i++) {
                if (selectedDirectoryEntries[i].displayName === phoneCardDetails.displayName) {
                    selectedDirectoryEntries[i].selected = true;
                }
                else {
                    selectedDirectoryEntries[i].selected = false;
                }
            }
            childToParentSelectedPhone(selectedDirectoryEntries);
        }
        else {
            if (triggerType === 'transfer') {
                dispatch(CcfAssignmentAction.setExternalDirectoryTransfer(true));
            }
            handleExternalCall(event, triggerType);
        }
    };
    return (_jsxs(_Fragment, { children: [_jsxs(Box, Object.assign({ sx: isFullViewStyle }, { children: [_jsxs(Box, { children: [_jsx(Box, Object.assign({ sx: classes.directoryUser }, { children: _jsx(Typography, Object.assign({ noWrap: true, sx: classes.directoryEntryText }, { children: phoneCardDetails.displayName })) })), _jsx(Box, { children: _jsx(Typography, Object.assign({ noWrap: true, sx: classes.directoryEntryCardText }, { children: phoneCardDetails.value })) })] }), phoneOBSkills && userHaveOutboundSkill && _jsxs(Box, Object.assign({ sx: classes.flex }, { children: [_jsx(CcfTooltip, Object.assign({ title: ((_b = voiceContact === null || voiceContact === void 0 ? void 0 : voiceContact.status) === null || _b === void 0 ? void 0 : _b.toLowerCase()) === VoiceContactStatus.ACTIVE ? translate('consult') : translate('call'), arrow: true }, { children: _jsx(IconButton, Object.assign({ onClick: (e) => { triggerPhoneClick(e, phoneCardDetails, CallType.VOICE); }, onKeyPress: (e) => {
                                        if (e.key === 'Enter')
                                            triggerPhoneClick(e, phoneCardDetails, CallType.VOICE);
                                    }, tabIndex: 0, "data-testid": 'phoneIconBtn', sx: classes.iconButtonCircle }, { children: _jsx(CcfPhoneOutboundIcon, { sx: [classes.icon, classes.iconButtonCircle_phoneIcon] }) })) })), ((_c = voiceContact === null || voiceContact === void 0 ? void 0 : voiceContact.status) === null || _c === void 0 ? void 0 : _c.toLowerCase()) === VoiceContactStatus.ACTIVE && _jsx(CcfTooltip, Object.assign({ title: translate('transferContact'), arrow: true }, { children: _jsx(IconButton, Object.assign({ onClick: (e) => { triggerPhoneClick(e, phoneCardDetails, CallType.TRANSFER); }, onKeyPress: (e) => {
                                        if (e.key === 'Enter')
                                            triggerPhoneClick(e, phoneCardDetails, CallType.TRANSFER);
                                    }, tabIndex: 0, "data-testid": 'phoneIconBtn', sx: classes.iconButtonCircle }, { children: _jsx(CcfTransferArrowsIcon, { sx: [classes.icon, classes.iconButtonCircle_phoneIcon] }) })) }))] }))] })), _jsx(Box, Object.assign({ display: classes.flex, marginTop: '0%', style: { width: '100%' } }, { children: _jsx(Collapse, Object.assign({ in: phoneCardDetails.selected, style: { width: '100%' } }, { children: phoneOBSkills && userHaveOutboundSkill && _jsx(AgentMultiSkillHoverDropDownView, { data: phoneOBSkills, handleTrigger: handleTrigger }) })) }))] }));
};
/**
 * Component to be used for directory item
 * @param props - team
 * @example <DirectoryEntryPartnerType />
 * @returns
 */
const DirectoryEntryPartnerType = (props) => {
    const { partnerType, directoryEntryDetails } = props;
    const [selectedDirectoryEntries, setDirectoryEntries] = useState([]);
    const theme = useTheme();
    const classes = directoryEntryDetailsStyles(theme);
    const addressFieldTypes = ['streetaddress', 'city', 'state', 'postalcode', 'country'];
    const [isCompanyExpanded, setIsCompanyExpanded] = useState(true);
    const [isContactsExpanded, setIsContactsExpanded] = useState(true);
    useEffect(() => {
        setDirectoryEntries(directoryEntryDetails
            .map((phone) => (Object.assign(Object.assign({}, phone), { selected: false }))));
    }, []);
    /**
     * function to handle Company Information Accordion Expansion
     * @example - handleCompanyChange(event)
     */
    const handleCompanyChange = () => {
        setIsCompanyExpanded(!isCompanyExpanded);
    };
    /**
     * function to handle Contact Information Accordion Expansion
     * @example - handleContactsChange(event)
     */
    const handleContactsChange = () => {
        setIsContactsExpanded(!isContactsExpanded);
    };
    /**
    * function that return the directory item status
    * @example getStatus('Ms teams')
    * @returns
    */
    const getStatus = () => {
        var _a;
        return (_a = directoryEntryDetails === null || directoryEntryDetails === void 0 ? void 0 : directoryEntryDetails.find((item) => item.fieldType === FieldType.PRESENCE)) === null || _a === void 0 ? void 0 : _a.value;
    };
    /**
     * Function to catch the change in data from child components
     * @param childdata - DirectoryEntrySelectionAttr[]
     * @example - childToParentSelectedPhone(childData)
     */
    const childToParentSelectedPhone = (childdata) => {
        setDirectoryEntries(childdata);
    };
    return (_jsxs(Box, Object.assign({ sx: classes.partnerDetailsStyles }, { children: [_jsxs(Box, Object.assign({ sx: classes.directoryUser }, { children: [_jsx(IconButton, Object.assign({ sx: classes.iconButtonWrapper }, { children: getStatusIcon(getStatus(), classes.partnerIcon) })), _jsx(Typography, Object.assign({ noWrap: true, sx: classes.directoryPartnerLabel }, { children: partnerType }))] })), _jsx(Box, Object.assign({ style: { marginLeft: '1.6rem' } }, { children: selectedDirectoryEntries.map((cardDetails) => ((cardDetails.profileType === ProfileType.JOB_TITLE || cardDetails.profileType === ProfileType.DEPARTMENT) && cardDetails.value && (_jsx(DirectoryEntryInfoCard, { infoCardDetails: cardDetails })))) })), selectedDirectoryEntries.some((cardDetails) => ((cardDetails.profileType === ProfileType.COMPANY && cardDetails.value !== '') || (cardDetails.profileType === ProfileType.ADDRESS && cardDetails.value !== ''))) ?
                _jsxs(CcfAccordion, Object.assign({ square: true, expanded: isCompanyExpanded, sx: classes.accordionContainer, onChange: handleCompanyChange }, { children: [_jsx(CcfAccordionSummary, Object.assign({ expandIcon: _jsx(CcfDoubleArrowIcon, { sx: classes.accordionIcon }), "aria-controls": "detail-content", id: "detail-header", sx: classes.accordionHeader }, { children: _jsx(CcfTypography, { sx: classes.accordionTitle, variant: "h5", translationKey: "companyInformation" }) })), _jsx(CcfAccordionDetails, { children: _jsx(Box, Object.assign({ component: "div", style: { marginLeft: '0.4rem' } }, { children: _jsxs(Typography, Object.assign({ sx: classes.companyInfo, variant: "h5" }, { children: [selectedDirectoryEntries.map((cardDetails) => (cardDetails.profileType === ProfileType.COMPANY && cardDetails.value && (_jsx(DirectoryEntryInfoCard, { infoCardDetails: cardDetails })))), selectedDirectoryEntries.map((cardDetails) => (cardDetails.profileType === ProfileType.ADDRESS && cardDetails.fieldType === FieldType.OFFICE_LOCATION && cardDetails.value && (_jsx(DirectoryEntryInfoCard, { infoCardDetails: cardDetails }))))] })) })) })] }))
                : [''], selectedDirectoryEntries.some((cardDetails) => ((cardDetails.profileType === ProfileType.PHONE && cardDetails.value !== '') || (cardDetails.profileType === ProfileType.EMAIL && cardDetails.value !== ''))) ?
                _jsxs(CcfAccordion, Object.assign({ square: true, expanded: isContactsExpanded, sx: classes.accordionContainer, onChange: handleContactsChange }, { children: [_jsx(CcfAccordionSummary, Object.assign({ expandIcon: _jsx(CcfDoubleArrowIcon, { sx: classes.accordionIcon }), "aria-controls": "detail-content", id: "detail-header", sx: classes.accordionHeader }, { children: _jsx(CcfTypography, { sx: classes.accordionTitle, variant: "h5", translationKey: "contactInformation" }) })), _jsx(CcfAccordionDetails, { children: _jsx(Box, Object.assign({ component: "div", style: { marginLeft: '0.4rem' } }, { children: _jsxs(Typography, Object.assign({ sx: classes.contactInfo, variant: "h5" }, { children: [addressFieldTypes.map((fieldType) => (_jsx(Box, Object.assign({ sx: (fieldType === FieldType.CITY || fieldType === FieldType.STATE || fieldType === FieldType.POSTAL_CODE) ? { display: 'inline-flex' } : [] }, { children: selectedDirectoryEntries.map((cardDetails) => (cardDetails.profileType === ProfileType.ADDRESS && cardDetails.fieldType === fieldType && cardDetails.value && (_jsx(DirectoryEntryInfoCard, { infoCardDetails: cardDetails })))) }), fieldType))), selectedDirectoryEntries.map((cardDetails) => (cardDetails.profileType === ProfileType.PHONE && cardDetails.value && (_jsx(DirectoryEntryPhoneCard, { phoneCardDetails: cardDetails, childToParentSelectedPhone: childToParentSelectedPhone, selectedDirectoryEntries: selectedDirectoryEntries })))), selectedDirectoryEntries.map((cardDetails) => (cardDetails.profileType === ProfileType.EMAIL && cardDetails.value && (_jsx(DirectoryEntryEmailCard, { emailCardDetails: cardDetails }))))] })) })) })] }))
                : ['']] })));
};
export default CcfDirectoryEntryDetails;
//# sourceMappingURL=ccf-directory-entries-details.js.map