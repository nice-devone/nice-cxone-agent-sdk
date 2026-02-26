import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Collapse, ListSubheader, useMediaQuery, useTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { CcfButton, CcfCloseIcon, CcfEmailIcon, CcfPhoneOutboundIcon, CcfSmsIcon, CcfTooltip, CcfTypography, CcfWhatsAppIcon, useTranslator, } from '@nice-devone/ui-controls';
import { AgentMultiSkillHoverDropDownView, OBChannels } from '../ccf-outbound-options/ccf-outbound-options';
import ccfAddChannelOptionsStyles from './ccf-add-channel-options.styles';
import { useEffect, useState } from 'react';
import { cxoneCustomerCardIdentities, getCustomerDetailsById, } from '../ccf-app-space/ccf-customer-card/ccf-customer-card.slice';
import { ElevatedFrom, MediaType, SLAIndicatorType, } from '@nice-devone/common-sdk';
import { agentDirectoryActions } from '../ccf-directory/+state/ccf-directory.slice';
import { fetchOutboundQuickReplies, fetchUnifiedQuickReplies } from '../ccf-app-space/ccf-quick-replies/ccf-quick-replies.util';
import { CcfAssignmentAction, digitalContactSelector, getAssignmentPanelMetadata, getNonIncomingActiveContactInSelectedInteraction, } from '../ccf-assignment-panel/ccf-assignment-panel.slice';
import CcfAddChannelSearch from './ccf-add-channel-search/ccf-add-channel-search';
import useGetOutboundOptions, { filterByChannelType, filterSkillByChannelType } from '../ccf-outbound-options/hooks/useGetOutboundOptions';
import useOutboundHandler from '../ccf-outbound-options/hooks/useOutboundHandler';
import { CXoneClient, CXoneProductFeature } from '@nice-devone/agent-sdk';
import { CCF_OPTION_TYPES } from './ccf-add-channel-options-enums';
import { isFeatureEnabled } from '../../util/featureToggleUtils';
/**
 * Component for ccf add channel options
 * @param props - CcfAddChannelOptionsProps
 * @example - <CcfAddChannelOptions />
 * @returns
 */
export function CcfAddChannelOptions(props) {
    const { handleClose, handleSelect, channelType, value } = props;
    const theme = useTheme();
    const [translate] = useTranslator();
    const addChannelOptionsStyles = ccfAddChannelOptionsStyles(theme);
    const CCFIdendities = useSelector(cxoneCustomerCardIdentities);
    const dispatch = useDispatch();
    const nonIncomingActiveContactInSelectedInteraction = useSelector(getNonIncomingActiveContactInSelectedInteraction);
    const assignmentMetadata = useSelector(getAssignmentPanelMetadata);
    const digitalContactDetails = useSelector(digitalContactSelector);
    const isUnifiedQRFeatureEnabled = isFeatureEnabled("release-cx-agent-quick-response-unification-AW-28770" /* FeatureToggles.QUICK_RESPONSE_UNIFICATION_FEATURE_TOGGLE */);
    const isTSObContactsFTEnabled = isFeatureEnabled("release-cx-ts-digital-outbound-contacts-AW-36771" /* FeatureToggles.TS_DIGITAL_OB_CONTACTS_TOGGLE */);
    const [isTSEnabled, setIsTSEnabled] = useState(false);
    const [selectedDropdown, setSelectedDropdown] = useState({
        selectedId: null,
        selectedMedia: null,
    });
    const [showTooltip, setShowTooltip] = useState('');
    const [selectedChannel, setSelectedChannel] = useState(channelType);
    const isSmView = useMediaQuery(theme.breakpoints.down('xl'));
    const interactionId = nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.interactionId;
    const contactId = nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.contactId;
    const [identities, setIdentities] = useState({
        phone: {},
        email: [],
    });
    const { emailOBChannels: emailOutboundChannels, hasEmailOBChannels, hasPhoneOBSkills, hasSmsOBChannels, hasWhatsappOBChannels, outboundChannels, phoneOBSkills, smsOBChannels: smsOutboundChannels, whatsappOBChannels: whatsappOutboundChannels, digitalOBSkills, hasEmailOBSkills, hasSmsOBSkills, hasWhatsappOBSkills, emailOBSkills, smsOBSkills, whatsappOBSkills, } = useGetOutboundOptions();
    const { triggerOutboundCall, triggerOutboundDigital } = useOutboundHandler();
    useEffect(() => {
        var _a;
        setIdentities(() => {
            return {
                phone: {},
                email: [],
            };
        });
        dispatch(agentDirectoryActions.updateSkillIdSelectedForInteraction(-1));
        if (isSmView && (nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.media) === MediaType.DIGITAL && (nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.interactionId) && (nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.customerName) && (nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.caseId)) {
            const digitalCase = digitalContactDetails[nonIncomingActiveContactInSelectedInteraction.interactionId][nonIncomingActiveContactInSelectedInteraction.caseId].case;
            const customerId = ((_a = digitalCase === null || digitalCase === void 0 ? void 0 : digitalCase.authorEndUserIdentity) === null || _a === void 0 ? void 0 : _a.id) || '';
            dispatch(getCustomerDetailsById({ customerId, selectedContact: nonIncomingActiveContactInSelectedInteraction, searchTabSelected: false }));
        }
        CXoneClient.instance.cxoneTenant.checkProductEnablementFromTenantData([CXoneProductFeature.DIVISIONS]).then((isTSEnabled) => {
            setIsTSEnabled(!!isTSEnabled);
        });
    }, []);
    /**
     * Function to handle cancel button
     * @param e - boolean
     * @example - cancelHandler(true, triggerType.type)
     */
    const cancelHandler = (e) => {
        e.stopPropagation();
        setSelectedDropdown({
            selectedId: null,
            selectedMedia: null,
        });
    };
    /**
     * Function to handle trigger for outbound
     * @param event - SelectChangeEvent
     * @param triggerValue - boolean
     * @param triggerType - string
     * @param channelId - string
     * @param customerName - string
     * @example - handleTrigger(true, triggerType.type)
     */
    const handleTrigger = (event, triggerValue, triggerType, channelId = '', digitalSkillId, customerName) => {
        event.stopPropagation();
        if (interactionId)
            dispatch(CcfAssignmentAction.updateSlaIndicator({
                [interactionId]: SLAIndicatorType.NORMAL,
            }));
        if (customerName &&
            triggerValue &&
            (triggerType === 'voice' || triggerType === 'transfer')) {
            if (handleSelect)
                handleSelect({ interactionId, contactId, channelId });
            else
                triggerOutboundCall({
                    contactId,
                    interactionId,
                    phone: customerName,
                    skillId: Number(channelId),
                });
        }
        else {
            const fromProvider = ((nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.media) === MediaType.VOICE) ?
                ElevatedFrom.DFO :
                ElevatedFrom.ACD;
            if (handleSelect)
                handleSelect({ interactionId, channelId, fromProvider });
            else {
                // fetch all configured quick replies for the outbound channel
                if (isUnifiedQRFeatureEnabled) {
                    dispatch(fetchUnifiedQuickReplies({
                        channelId: channelId,
                    }));
                }
                else {
                    dispatch(fetchOutboundQuickReplies({ page: 1, channelId: channelId }));
                }
                triggerOutboundDigital({
                    channelType: triggerType,
                    channelId,
                    fromProvider,
                    interactionId,
                    receiverTo: String(customerName),
                    digitalSkillId,
                });
            }
        }
        handleClose();
    };
    useEffect(() => {
        const identities = {
            phone: {},
            email: [],
        };
        if (CCFIdendities && CCFIdendities.length) {
            CCFIdendities.forEach((identity) => {
                if (identity.externalPlatformId === OBChannels.EMAIL) {
                    identities.email.push(identity.idOnExternalPlatform);
                }
                else if (identity.externalPlatformId === OBChannels.VOICE ||
                    identity.externalPlatformId === OBChannels.SMS ||
                    identity.externalPlatformId === OBChannels.WHATSAPP) {
                    if (!identities.phone[identity.idOnExternalPlatform]) {
                        identities.phone[identity.idOnExternalPlatform] = [identity.externalPlatformId];
                    }
                    else {
                        identities.phone[identity.idOnExternalPlatform].push(identity.externalPlatformId);
                    }
                }
            });
        }
        setIdentities(() => {
            return {
                phone: Object.assign({}, identities.phone),
                email: [...identities.email],
            };
        });
    }, [CCFIdendities]);
    /**
     * Function to set which dropdown is selcted and for which channel type
     * @param id - string
     * @param channelType - string
     * @example - setDropdownSelection('432-234-5543', OBChannels.VOICE)
     * @returns
     */
    const setDropdownSelection = (id, channelType) => {
        if (selectedDropdown.selectedId === id && selectedDropdown.selectedMedia === channelType) {
            setSelectedDropdown({
                selectedId: null,
                selectedMedia: null,
            });
        }
        else {
            setSelectedDropdown({
                selectedId: id,
                selectedMedia: channelType,
            });
        }
    };
    /**
     * Function to handle channel click and whether directly initiate contact or show skill selection dropdown
     * @param event - SyntheticEvent
     * @param contact - string
     * @param channelName - string
     * @param type - string
     * @example - clickChannelHandler(event, '4005150005', OBChannels.VOICE, CCF_OPTION_TYPES.CHANNEL_OPTIONS)
     */
    const clickChannelHandler = (event, contact, channelName, type) => {
        var _a, _b, _c, _d;
        event.stopPropagation();
        if (isTSEnabled && isTSObContactsFTEnabled) {
            const channelList = {
                [OBChannels.VOICE]: phoneOBSkills,
                [OBChannels.SMS]: smsOBSkills,
                [OBChannels.WHATSAPP]: whatsappOBSkills,
                [OBChannels.EMAIL]: emailOBSkills,
            };
            if (((_a = channelList[channelName]) === null || _a === void 0 ? void 0 : _a.length) === 1) {
                const id = channelName === OBChannels.VOICE ? channelList[channelName][0].skillId : (_b = channelList[channelName][0]) === null || _b === void 0 ? void 0 : _b.digitalPOCName;
                const digitalSkillId = channelName !== OBChannels.VOICE ? (_c = channelList[channelName][0]) === null || _c === void 0 ? void 0 : _c.skillId : undefined;
                handleTrigger(event, true, channelName, String(id), digitalSkillId, contact);
            }
            else {
                type === CCF_OPTION_TYPES.CHANNEL_OPTIONS ?
                    setDropdownSelection(contact, channelName) :
                    setSelectedChannel(channelName);
            }
        }
        else {
            const channelList = {
                [OBChannels.VOICE]: phoneOBSkills,
                [OBChannels.SMS]: smsOutboundChannels,
                [OBChannels.WHATSAPP]: whatsappOutboundChannels,
                [OBChannels.EMAIL]: emailOutboundChannels,
            };
            if (((_d = channelList[channelName]) === null || _d === void 0 ? void 0 : _d.length) === 1) {
                const id = channelName === OBChannels.VOICE
                    ? channelList[channelName][0].skillId
                    : channelList[channelName][0].channelId;
                handleTrigger(event, true, channelName, String(id), undefined, contact);
            }
            else {
                type === CCF_OPTION_TYPES.CHANNEL_OPTIONS ?
                    setDropdownSelection(contact, channelName) :
                    setSelectedChannel(channelName);
            }
        }
    };
    return (_jsxs(Box, Object.assign({ sx: addChannelOptionsStyles.container }, { children: [_jsxs(ListSubheader, Object.assign({ component: "div", id: "appHamburger-Menu", "data-testid": "appHamburger-Menu", sx: addChannelOptionsStyles.listSubheader }, { children: [_jsx(CcfTypography, { translationKey: "addOutbound", sx: [addChannelOptionsStyles.customizeText, addChannelOptionsStyles.outboundOptionsText] }), _jsx(CcfButton, Object.assign({ disableRipple: true, sx: addChannelOptionsStyles.closeButton, "data-testid": "close-button", tabIndex: 0, role: "button", "aria-label": translate('close'), onClick: () => {
                            handleClose();
                        } }, { children: _jsx(CcfCloseIcon, { viewBox: "-8 -4 32 32", sx: addChannelOptionsStyles.closeIcon }) }))] })), _jsxs(Box, Object.assign({ sx: identities && (Object.keys(identities.phone).length || identities.email.length) ? { height: '410px', overflow: 'auto' } : { height: '180px' } }, { children: [_jsx(CcfAddChannelSearch, { value: value, handleTrigger: handleTrigger, selectedChannel: selectedChannel, setSelectedChannel: setSelectedChannel, clickChannelHandler: clickChannelHandler }), Object.keys(identities.phone).length ? (_jsxs(Box, Object.assign({ sx: addChannelOptionsStyles.phoneListContainer, "data-testid": 'phoneListContainer' }, { children: [_jsx(CcfTypography, { variant: 'h4', translationKey: "phone", sx: Object.assign(Object.assign({}, addChannelOptionsStyles.customizeText), addChannelOptionsStyles.phoneEmailText) }), _jsx(Box, Object.assign({ sx: addChannelOptionsStyles.flexContainer }, { children: Object.entries(identities.phone).map(([contactNumber, channels]) => {
                                    const phoneChannels = channels;
                                    const isVoiceContact = phoneChannels.indexOf(OBChannels.VOICE) === -1 || assignmentMetadata.voiceInteractionId ? false : true;
                                    const isSMSContact = phoneChannels.indexOf(OBChannels.SMS) !== -1 ? true : false;
                                    const isWhatsappContact = phoneChannels.indexOf(OBChannels.WHATSAPP) !== -1 ? true : false;
                                    return ((isVoiceContact || isSMSContact || isWhatsappContact) ? _jsxs(Box, Object.assign({ sx: addChannelOptionsStyles.optionContainer }, { children: [_jsxs(Box, Object.assign({ sx: addChannelOptionsStyles.numberOptionsContainer }, { children: [_jsx(CcfTooltip, Object.assign({ title: contactNumber, arrow: true, "aria-label": contactNumber }, { children: _jsx(Box, { children: _jsx(CcfTypography, Object.assign({ sx: addChannelOptionsStyles.phoneNumber }, { children: contactNumber })) }) })), _jsx(Box, Object.assign({ sx: [
                                                            addChannelOptionsStyles.iconContainer,
                                                            (!isVoiceContact || !hasPhoneOBSkills) && addChannelOptionsStyles.disabledIconContainer
                                                        ], onClick: (e) => clickChannelHandler(e, contactNumber, OBChannels.VOICE, CCF_OPTION_TYPES.CHANNEL_OPTIONS), tabIndex: isVoiceContact && hasPhoneOBSkills ? 0 : -1, onKeyUp: (e) => {
                                                            if (e.key === 'Enter')
                                                                clickChannelHandler(e, contactNumber, OBChannels.VOICE, CCF_OPTION_TYPES.CHANNEL_OPTIONS);
                                                        }, "data-testid": 'phonelist-inbound-icon-container' }, { children: _jsx(CcfPhoneOutboundIcon, { sx: [
                                                                addChannelOptionsStyles.voiceCallIcon
                                                            ], isDisabled: !isVoiceContact || !hasPhoneOBSkills ? true : false, fontSize: 'medium' }) })), _jsx(Box, Object.assign({ sx: [
                                                            addChannelOptionsStyles.iconContainer,
                                                            (!isSMSContact || !(hasSmsOBChannels || hasSmsOBSkills)) && addChannelOptionsStyles.disabledIconContainer
                                                        ], onClick: (e) => clickChannelHandler(e, contactNumber, OBChannels.SMS, CCF_OPTION_TYPES.CHANNEL_OPTIONS), tabIndex: isSMSContact && (hasSmsOBChannels || hasSmsOBSkills) ? 0 : -1, onKeyUp: (e) => {
                                                            if (e.key === 'Enter')
                                                                clickChannelHandler(e, contactNumber, OBChannels.SMS, CCF_OPTION_TYPES.CHANNEL_OPTIONS);
                                                        }, "data-testid": 'phonelist-sms-icon-container' }, { children: _jsx(CcfSmsIcon, { isDisabled: !isSMSContact || !(hasSmsOBChannels || hasSmsOBSkills) ? true : false, fontSize: 'medium' }) })), _jsx(Box, Object.assign({ sx: [
                                                            addChannelOptionsStyles.iconContainer,
                                                            (!isWhatsappContact || !(hasWhatsappOBChannels || hasWhatsappOBSkills)) && addChannelOptionsStyles.disabledIconContainer
                                                        ], onClick: (e) => clickChannelHandler(e, contactNumber, OBChannels.WHATSAPP, CCF_OPTION_TYPES.CHANNEL_OPTIONS), tabIndex: isWhatsappContact && (hasWhatsappOBChannels || hasWhatsappOBSkills) ? 0 : -1, onKeyUp: (e) => {
                                                            if (e.key === 'Enter')
                                                                clickChannelHandler(e, contactNumber, OBChannels.WHATSAPP, CCF_OPTION_TYPES.CHANNEL_OPTIONS);
                                                        }, "data-testid": 'digital-whatsapp-icon-container' }, { children: _jsx(CcfWhatsAppIcon, { isDisabled: !isWhatsappContact || !(hasWhatsappOBChannels || hasWhatsappOBSkills) ? true : false, fontSize: 'medium' }) }))] })), _jsx(Collapse, Object.assign({ in: selectedDropdown.selectedId === contactNumber, sx: addChannelOptionsStyles.collapse }, { children: selectedDropdown.selectedMedia && ((selectedDropdown.selectedMedia === OBChannels.VOICE && hasPhoneOBSkills || selectedDropdown.selectedMedia === OBChannels.SMS && (hasSmsOBChannels || hasSmsOBSkills) || selectedDropdown.selectedMedia === OBChannels.WHATSAPP && (hasWhatsappOBChannels || hasWhatsappOBSkills))) ? (_jsx(AgentMultiSkillHoverDropDownView, { data: phoneOBSkills, handleTrigger: handleTrigger, cancelHandler: cancelHandler, triggerType: selectedDropdown.selectedMedia, OBChannels: selectedDropdown.selectedMedia &&
                                                        selectedDropdown.selectedMedia !== OBChannels.VOICE
                                                        ? outboundChannels === null || outboundChannels === void 0 ? void 0 : outboundChannels.filter(filterByChannelType(selectedDropdown.selectedMedia))
                                                        : [], DigitalOBSkills: isTSEnabled && isTSObContactsFTEnabled && selectedDropdown.selectedMedia &&
                                                        selectedDropdown.selectedMedia !== OBChannels.VOICE
                                                        ? digitalOBSkills === null || digitalOBSkills === void 0 ? void 0 : digitalOBSkills.filter(filterSkillByChannelType(selectedDropdown.selectedMedia))
                                                        : [], customerName: contactNumber, IBcall: false, elevationPopover: true })) : null }))] }), contactNumber) : null);
                                }) }))] }))) : null, identities.email.length ? (_jsxs(Box, Object.assign({ sx: addChannelOptionsStyles.emailListContainer, "data-testid": 'emailListContainer' }, { children: [_jsx(CcfTypography, { variant: 'h4', translationKey: "email", sx: Object.assign(Object.assign({}, addChannelOptionsStyles.customizeText), addChannelOptionsStyles.phoneEmailText) }), _jsx(Box, Object.assign({ sx: addChannelOptionsStyles.flexContainer }, { children: identities.email.map((email) => (_jsxs(Box, Object.assign({ sx: addChannelOptionsStyles.optionContainer }, { children: [_jsxs(Box, Object.assign({ sx: [
                                                addChannelOptionsStyles.emailDetails,
                                                !(hasEmailOBChannels || hasEmailOBSkills) && addChannelOptionsStyles.disabledIconContainer
                                            ], onClick: (e) => clickChannelHandler(e, email, OBChannels.EMAIL, CCF_OPTION_TYPES.CHANNEL_OPTIONS), tabIndex: hasEmailOBChannels || hasEmailOBSkills ? 0 : -1, onKeyUp: (e) => {
                                                if (e.key === 'Enter')
                                                    clickChannelHandler(e, email, OBChannels.EMAIL, CCF_OPTION_TYPES.CHANNEL_OPTIONS);
                                            }, "data-testid": 'emailList-details' }, { children: [_jsx(CcfEmailIcon, { isDisabled: !(hasEmailOBChannels || hasEmailOBSkills) ? true : false, fontSize: 'medium' }), _jsx(CcfTooltip, Object.assign({ title: email, arrow: true, "aria-label": email, open: showTooltip === email ? true : false }, { children: _jsx(Box, Object.assign({ sx: addChannelOptionsStyles.ellipsisBox }, { children: _jsx(CcfTypography, Object.assign({ onMouseOver: (e) => {
                                                                if (e.target.scrollWidth > e.target.clientWidth) {
                                                                    setShowTooltip(email);
                                                                }
                                                            }, onMouseLeave: () => setShowTooltip(''), sx: addChannelOptionsStyles.emailText }, { children: email })) })) }))] })), _jsx(Collapse, Object.assign({ in: selectedDropdown.selectedId === email, style: addChannelOptionsStyles.collapse }, { children: hasEmailOBChannels && selectedDropdown.selectedMedia ? (_jsx(AgentMultiSkillHoverDropDownView, { data: phoneOBSkills, handleTrigger: handleTrigger, cancelHandler: cancelHandler, triggerType: selectedDropdown.selectedMedia, OBChannels: selectedDropdown.selectedMedia &&
                                                    selectedDropdown.selectedMedia !== OBChannels.VOICE ?
                                                    outboundChannels === null || outboundChannels === void 0 ? void 0 : outboundChannels.filter(filterByChannelType(selectedDropdown.selectedMedia)) :
                                                    [], DigitalOBSkills: isTSEnabled && isTSObContactsFTEnabled && selectedDropdown.selectedMedia &&
                                                    selectedDropdown.selectedMedia !== OBChannels.VOICE ?
                                                    digitalOBSkills === null || digitalOBSkills === void 0 ? void 0 : digitalOBSkills.filter(filterSkillByChannelType(selectedDropdown.selectedMedia)) : [], customerName: email, IBcall: false, elevationPopover: true })) : null }))] }), email))) }))] }))) : null] }))] })));
}
export default CcfAddChannelOptions;
//# sourceMappingURL=ccf-add-channel-options.js.map