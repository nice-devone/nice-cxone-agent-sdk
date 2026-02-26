import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Box, Collapse, useTheme } from '@mui/material';
import { InteractionType } from '@nice-devone/common-sdk';
import { CcfAccordion, CcfAccordionDetails, CcfAccordionSummary, CcfBackIcon, CcfBox, CcfDoubleArrowIcon, CcfPhoneOutboundIcon, CcfEmailIcon, CcfIconButton, CcfTooltip, CcfTypography, useTranslator, CcfSmsIcon, } from '@nice-devone/ui-controls';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { agentDirectoryActions, getSkillSelectorToggleValue, } from '../../+state/ccf-directory.slice';
import { isOutboundSkillSelector } from '../../../ccf-agent-skill/ccf-agent-skill-details-slice';
import { ObChannelListSelector } from '../../../ccf-assignment-panel/ccf-contact-assignment/ccf-channel-details-slice';
import CcfOutboundOptions, { OBChannels } from '../../../ccf-outbound-options/ccf-outbound-options';
import ccfDirectoryStyles from '../../ccf-directory.styles';
import { getAgentProfileSettings } from '../../../ccf-agent-setting/ccf-agent-setting-slice';
import { getSelectedInteractionType } from '../../../ccf-assignment-panel/ccf-assignment-panel.slice';
/**
 * Component for standard address book
 * @param props - CcfStandardAddressBookProps
 * @example - <CcfStandardAddressBook />
 * @returns
 */
export function CcfStandardAddressBookDetails(props) {
    const { standardAddressBookDetails, addressBookEntryId, renderTwoColumnDesign } = props;
    const dispatch = useDispatch();
    const theme = useTheme();
    const directoryStyles = ccfDirectoryStyles(theme);
    const [translate] = useTranslator();
    const toggleSkillSelector = useSelector(getSkillSelectorToggleValue);
    const userHasOutboundSkill = useSelector(isOutboundSkillSelector);
    const outboundChannels = useSelector(ObChannelListSelector);
    const userHasSmsOBChannel = outboundChannels === null || outboundChannels === void 0 ? void 0 : outboundChannels.find((item) => item.type === 'sms');
    const userHasEmailOBChannel = outboundChannels === null || outboundChannels === void 0 ? void 0 : outboundChannels.find((item) => item.type === 'email');
    const [showDropdown, setDropdown] = useState('');
    const agentProfileSettings = useSelector(getAgentProfileSettings);
    const selectedInteractionType = useSelector(getSelectedInteractionType);
    const selectorKeyValueMapping = [{
            key: 'call',
            value: OBChannels.VOICE,
        },
        {
            key: 'phone',
            value: OBChannels.VOICE,
        },
        {
            key: 'mobile',
            value: OBChannels.VOICE,
        },
        {
            key: 'sms',
            value: OBChannels.SMS,
        },
        {
            key: 'email',
            value: OBChannels.EMAIL,
        }
    ];
    /**
     * @example This function is used to go to back to main entry
     */
    const onBackBtnClick = () => {
        const payload = {
            addressBookEntryId: 0,
            isVisible: false,
        };
        dispatch(agentDirectoryActions.displayStandardAddressDetails(payload));
        dispatch(agentDirectoryActions.backToAddressList());
    };
    const [isCompanyExpanded, setIsCompanyExpanded] = useState(true);
    const [isChannelExpanded, setIsChannelExpanded] = useState(true);
    const [standardBookEntry, setStandardBookEntry] = useState({});
    useEffect(() => {
        const standardAddressBookEntryDetail = standardAddressBookDetails === null || standardAddressBookDetails === void 0 ? void 0 : standardAddressBookDetails.filter((item) => {
            return item.addressBookEntryId === addressBookEntryId;
        });
        standardAddressBookEntryDetail && setStandardBookEntry(standardAddressBookEntryDetail[0]);
    }, [addressBookEntryId, standardAddressBookDetails]);
    /**
     *
     * @param evt - OnChange Event
     * @example - handleChange(event)
     */
    const handleCompanyChange = () => {
        setIsCompanyExpanded(!isCompanyExpanded);
    };
    /**
     *
     * @param e - OnChange Event
     * @example - handleChange(event)
     */
    const handleChannelChange = () => {
        setIsChannelExpanded(!isChannelExpanded);
    };
    /**
     *
     * @param e - method to validate if action button to be displayed or not
     * @example - checkForValidItem(action)
     */
    const checkForValidItem = (actionItem) => {
        switch (actionItem) {
            case ('call'): return userHasOutboundSkill;
            case ('sms'): return userHasSmsOBChannel;
            case ('email'): return userHasEmailOBChannel;
            default:
                return false;
        }
    };
    /**
     *
     * @param translationValue - this function accepts translate value and actions relative to that type
     * @returns
     * @example
     */
    const renderContent = (standardAddressBookEntry, translationValue, actions) => {
        actions = actions.filter(action => {
            if (action === 'call') {
                return ((selectedInteractionType && !(agentProfileSettings === null || agentProfileSettings === void 0 ? void 0 : agentProfileSettings.hideOBTransfer) && selectedInteractionType !== InteractionType.DIGITAL)
                    || !(agentProfileSettings === null || agentProfileSettings === void 0 ? void 0 : agentProfileSettings.hideOBAddressBookConsult));
            }
            return true;
        });
        return (standardAddressBookEntry && (_jsxs(CcfBox, { children: [_jsxs(Box, Object.assign({ style: { display: 'inline-block' }, sx: directoryStyles.iconContainer }, { children: [_jsxs(Box, Object.assign({ style: { display: 'inline-block' }, sx: directoryStyles.iconContainer }, { children: [_jsx(CcfTypography, { sx: directoryStyles.headerText, textTransform: "uppercase", variant: "h5", translationKey: translationValue }), _jsx(CcfTypography, Object.assign({ sx: directoryStyles.text, variant: "h5" }, { children: standardAddressBookEntry }))] })), actions.map((item, index) => (_jsx(Box, Object.assign({ sx: directoryStyles.interactionIconAlign }, { children: checkForValidItem(item) &&
                                _jsx(CcfTooltip, Object.assign({ placement: 'right-end', title: translate(item), arrow: true }, { children: _jsxs("div", Object.assign({ style: { width: '22px', height: '22px' }, role: "button" }, { children: [' ', _jsx(CcfIconButton, Object.assign({ color: "secondary", sx: directoryStyles.textSecondary, "data-testid": item, size: "small", tabIndex: 0, "aria-label": translate(item), onClick: () => {
                                                    triggerClick(translationValue, item);
                                                } }, { children: collapsedViewIconsMap.get(item) }))] })) })) }), `${item}`)))] })), _jsx(Box, Object.assign({ marginTop: '0%', style: { width: '100%' } }, { children: _jsx(Collapse, Object.assign({ in: showDropdown === translationValue, style: { width: '100%' } }, { children: _jsx(CcfOutboundOptions, { number: standardAddressBookEntry, skills: [], textStyle: { display: 'inline' }, addressBookSelector: true }) })) }))] })));
    };
    /**
     * Function to handle trigger for outbound
     * @param event - event
     * @param phoneCardDetails - DirectoryEntrySelectionAttr
     * @example - triggerClick(event, phoneCardDetails)
     */
    const triggerClick = (type, action) => {
        var _a, _b;
        const triggerType = (_a = selectorKeyValueMapping === null || selectorKeyValueMapping === void 0 ? void 0 : selectorKeyValueMapping.find((item) => item.key === action)) === null || _a === void 0 ? void 0 : _a.value;
        const toggleState = (_b = toggleSkillSelector.find((item) => item.triggerType === type)) === null || _b === void 0 ? void 0 : _b.triggerState;
        dispatch(agentDirectoryActions.updateAllToggleStates({
            triggerState: !toggleState,
            triggerType: triggerType ? triggerType : 'voice',
        }));
        setDropdown(type);
    };
    const collapsedViewIconsMap = new Map([
        ['call', _jsx(CcfPhoneOutboundIcon, { viewBox: '10 6 7.809 20.066' }, 'call')],
        ['sms', _jsx(CcfSmsIcon, { id: 'standardAddBookSmsIcn', viewBox: '10 6 7.809 20.066' }, 'sms')],
        ['email', _jsx(CcfEmailIcon, { viewBox: '10 6 7.809 20.066' }, 'email')]
    ]);
    return (_jsxs(Box, Object.assign({ sx: directoryStyles.standardEntriesContainer }, { children: [_jsxs(Box, { children: [_jsxs(Box, Object.assign({ tabIndex: 0, sx: Object.assign(Object.assign({}, directoryStyles.drilldownToAddressBook), { marginLeft: renderTwoColumnDesign ? '5px' : '12px' }) }, { children: [_jsx(CcfBackIcon, { sx: Object.assign(Object.assign({}, directoryStyles.backIcon), { display: renderTwoColumnDesign ? 'none' : 'inline-block' }), onKeyPress: (e) => {
                                    if (e.key === 'Enter') {
                                        onBackBtnClick();
                                    }
                                }, onClick: onBackBtnClick, "data-testid": "backToTeamBox" }), _jsxs(CcfTypography, Object.assign({ sx: Object.assign(Object.assign({}, directoryStyles.headerText), { margin: renderTwoColumnDesign ? '0% 0% 1% 3%' : '' }), variant: "h5" }, { children: [standardBookEntry === null || standardBookEntry === void 0 ? void 0 : standardBookEntry.firstName, " ", standardBookEntry === null || standardBookEntry === void 0 ? void 0 : standardBookEntry.middleName, " ", standardBookEntry === null || standardBookEntry === void 0 ? void 0 : standardBookEntry.lastName] }))] })), _jsx(CcfTypography, Object.assign({ sx: Object.assign(Object.assign({}, directoryStyles.subHeading), { display: renderTwoColumnDesign ? 'none' : 'inline-block' }), variant: "h5" }, { children: standardBookEntry === null || standardBookEntry === void 0 ? void 0 : standardBookEntry.addressBookName }))] }), _jsxs(_Fragment, { children: [(standardBookEntry === null || standardBookEntry === void 0 ? void 0 : standardBookEntry.company) && (_jsxs(CcfAccordion, Object.assign({ square: true, expanded: isCompanyExpanded, sx: directoryStyles.accordionContainer, onChange: handleCompanyChange, "data-testid": "company-accordion" }, { children: [_jsx(CcfAccordionSummary, Object.assign({ expandIcon: _jsx(CcfDoubleArrowIcon, { sx: directoryStyles.accordionIcon }), "aria-controls": "detail-content", id: "detail-header", sx: directoryStyles.accordionHeader }, { children: _jsx(CcfTypography, { sx: directoryStyles.accordionTitle, variant: "h5", translationKey: "companyInformation" }) })), _jsx(CcfAccordionDetails, { children: _jsx(CcfBox, Object.assign({ component: "div", style: { marginLeft: '2%' } }, { children: _jsx(CcfTypography, Object.assign({ sx: directoryStyles.text, variant: "h5" }, { children: standardBookEntry.company })) })) })] }))), ((standardBookEntry === null || standardBookEntry === void 0 ? void 0 : standardBookEntry.phone) || (standardBookEntry === null || standardBookEntry === void 0 ? void 0 : standardBookEntry.mobile) || (standardBookEntry === null || standardBookEntry === void 0 ? void 0 : standardBookEntry.email)) && (_jsxs(CcfAccordion, Object.assign({ square: true, expanded: isChannelExpanded, sx: directoryStyles.accordionContainer, onChange: handleChannelChange, "data-testid": "channel-accordion" }, { children: [_jsx(CcfAccordionSummary, Object.assign({ expandIcon: isChannelExpanded ? (_jsx(CcfDoubleArrowIcon, { sx: directoryStyles.accordionIcon })) : (_jsx(CcfDoubleArrowIcon, { sx: directoryStyles.accordionIcon })), "aria-controls": "detail-content", id: "detail-header", sx: directoryStyles.accordionHeader }, { children: _jsx(CcfTypography, { sx: directoryStyles.accordionTitle, variant: "h5", translationKey: "channels" }) })), _jsx(CcfAccordionDetails, { children: _jsxs(CcfBox, Object.assign({ component: "div", style: { marginLeft: '2%' } }, { children: [renderContent(standardBookEntry.phone, 'phone', ['call', 'sms']), renderContent(standardBookEntry.mobile, 'mobile', ['call', 'sms']), renderContent(standardBookEntry.email, 'email', ['email'])] })) })] })))] })] })));
}
export default CcfStandardAddressBookDetails;
//# sourceMappingURL=ccf-standard-address-book-details.js.map