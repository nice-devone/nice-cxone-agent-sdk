import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, useEffect } from 'react';
import { useTranslator, CcfCallTransferIcon, CcfSmsIcon, CcfEmailIcon, CcfPhoneOutboundIcon, CcfWhatsAppIcon } from '@nice-devone/ui-controls';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Collapse, useTheme, Divider } from '@mui/material';
import { agentDirectoryActions, getSkillIdSelectedForInteraction, getSkillSelectorToggleValue, } from '../ccf-directory/+state/ccf-directory.slice';
import { getAllInteractions, getAssignmentPanelMetadata, hasConsultCall, voiceContactSelector, } from '../ccf-assignment-panel/ccf-assignment-panel.slice';
import { EventKeys, } from '@nice-devone/common-sdk';
import { ValidationUtils } from '@nice-devone/core-sdk';
import { getAgentOBChannels, } from '../ccf-assignment-panel/ccf-contact-assignment/ccf-channel-details-slice';
import CcfOutboundOptionsStyle from './ccf-outbound-options.styles';
import { getAppspaceResolution } from '../ccf-app-space/ccf-app-space.slice';
import { fetchOutboundQuickReplies, fetchUnifiedQuickReplies } from '../ccf-app-space/ccf-quick-replies/ccf-quick-replies.util';
import useGetOutboundOptions from '../ccf-outbound-options/hooks/useGetOutboundOptions';
import useOutboundHandler from '../ccf-outbound-options/hooks/useOutboundHandler';
import { getAgentProfileSettings } from '../ccf-agent-setting/ccf-agent-setting-slice';
import { isFeatureEnabled } from '../../util/featureToggleUtils';
import AgentMultiSkillHoverDropDown from './agent-multi-skill-hover-dropdown-view';
import { CXoneClient, CXoneProductFeature } from '@nice-devone/agent-sdk';
export var OBChannels;
(function (OBChannels) {
    OBChannels["VOICE"] = "voice";
    OBChannels["SMS"] = "sms";
    OBChannels["EMAIL"] = "email";
    OBChannels["WHATSAPP"] = "whatsapp";
    OBChannels["TRANSFER"] = "transfer";
})(OBChannels || (OBChannels = {}));
/**
 * renders the select skills dropdown
 * @param props - AgentSkillSetArr
 * @example AgentMultiSkillHoverDropDownView
 * @returns
 */
export const AgentMultiSkillHoverDropDownView = (props) => {
    const { data, OBChannels, DigitalOBSkills, handleTrigger, triggerType, IBcall, customerName, cancelHandler } = props;
    const renderTwoColumnDesign = useSelector(getAppspaceResolution);
    const isTSObContactsFTEnabled = isFeatureEnabled("release-cx-ts-digital-outbound-contacts-AW-36771" /* FeatureToggles.TS_DIGITAL_OB_CONTACTS_TOGGLE */);
    const [isTSEnabled, setIsTSEnabled] = useState(false);
    const dispatch = useDispatch();
    const skillIdSelectedForInteraction = useSelector(getSkillIdSelectedForInteraction);
    /**
     * Method to get initial selected channel for outbound interaction
     * @example
     * ```
     * getInitialSelectedChannel()
     * ```
     */
    const getInitialSelectedChannel = () => {
        var _a;
        if (isTSEnabled && isTSObContactsFTEnabled) {
            return (DigitalOBSkills === null || DigitalOBSkills === void 0 ? void 0 : DigitalOBSkills.length) === 1 ? (_a = DigitalOBSkills[0]) === null || _a === void 0 ? void 0 : _a.digitalPOCName : '-1';
        }
        return OBChannels.length === 1 ? OBChannels[0].channelId : '-1';
    };
    const [selectedChannelForOBInteraction, setSelectedChannel] = useState(getInitialSelectedChannel());
    const [selectedDigitalSkillId, setSelectedDigitalSkillId] = useState(undefined);
    // Create a lookup map for O(1) access to skillId by digitalPOCName
    const digitalPOCToSkillIdMap = React.useMemo(() => {
        const map = {};
        DigitalOBSkills === null || DigitalOBSkills === void 0 ? void 0 : DigitalOBSkills.forEach((skill) => {
            if (skill.digitalPOCName) {
                map[skill.digitalPOCName] = skill.skillId;
            }
        });
        return map;
    }, [DigitalOBSkills]);
    useEffect(() => {
        CXoneClient.instance.cxoneTenant.checkProductEnablementFromTenantData([CXoneProductFeature.DIVISIONS]).then((isTSEnabled) => {
            setIsTSEnabled(!!isTSEnabled);
        });
        dispatch(agentDirectoryActions.updateSkillIdSelectedForInteraction(-1));
    }, []);
    useEffect(() => {
        if (OBChannels.length > 1) {
            setSelectedChannel('-1');
            dispatch(agentDirectoryActions.updateSkillIdSelectedForInteraction(-1));
        }
    }, [triggerType, dispatch]);
    /**
     * Function to set outbound skill Id selected for interaction initiaction
     * @param user - Agent
     * @example setOBSkillIdForInteraction(event)
     */
    const setOBSkillIdForInteraction = (event) => {
        event.stopPropagation();
        dispatch(agentDirectoryActions.updateSkillIdSelectedForInteraction(event.target.value));
    };
    /**
     * Function to set outbound channel Id selected for interaction initiaction
     * @param user - Agent
     * @example setOBChannelIdForInteraction(event)
     */
    const setOBChannelIdForInteraction = (event) => {
        setSelectedChannel(event.target.value);
        // Use lookup map for O(1) access instead of iterating through array
        setSelectedDigitalSkillId(digitalPOCToSkillIdMap[event.target.value]);
    };
    return (_jsx(AgentMultiSkillHoverDropDown, { data: data, OBChannels: OBChannels, triggerType: triggerType, skillIdSelectedForInteraction: skillIdSelectedForInteraction, setOBSkillIdForInteraction: setOBSkillIdForInteraction, selectedChannelForOBInteraction: selectedChannelForOBInteraction, setOBChannelIdForInteraction: setOBChannelIdForInteraction, handleTrigger: handleTrigger, cancelHandler: cancelHandler, renderTwoColumnDesign: renderTwoColumnDesign, IBcall: IBcall, customerName: customerName, DigitalOBSkills: DigitalOBSkills || [], isTSEnabled: isTSEnabled, selectedDigitalSkillId: selectedDigitalSkillId }));
};
/**
 * Function to render icon for trigger types
 * @param triggerType - string
 * @param props - SvgIconProps
 * @example renderIconForTriggerTypes('voice', props)
 * @returns
 */
const renderIconForTriggerTypes = (triggerType) => {
    return (props) => {
        switch (triggerType) {
            case OBChannels.VOICE:
                return _jsx(CcfPhoneOutboundIcon, Object.assign({}, props, { viewBox: "2 0 28 29" }));
            case OBChannels.SMS:
                return _jsx(CcfSmsIcon, Object.assign({}, props, { viewBox: "6 3 20 24" }));
            case OBChannels.EMAIL:
                return _jsx(CcfEmailIcon, Object.assign({}, props, { viewBox: "0 3 20 24" }));
            case OBChannels.WHATSAPP:
                return _jsx(CcfWhatsAppIcon, Object.assign({}, props, { viewBox: "4 2 24 24" }));
            case OBChannels.TRANSFER:
                return _jsx(CcfCallTransferIcon, Object.assign({}, props, { sx: { marginLeft: '0.125rem' } }));
            default:
                return _jsx("div", {});
        }
    };
};
/**
 * Component to get outbound options
 * @param props - ICcfOutboundOptionsProps
 * @example <CcfOutboundOptions />
 * @returns
 */
export const CcfOutboundOptions = (props) => {
    var _a;
    const { number, skills = [], addressBookSelector } = props;
    const theme = useTheme();
    const outboundOptionsStyle = CcfOutboundOptionsStyle(theme, false);
    const validationUtil = new ValidationUtils();
    const dispatch = useDispatch();
    const skillIdSelectedForInteraction = useSelector(getSkillIdSelectedForInteraction);
    const toggleSkillSelector = useSelector(getSkillSelectorToggleValue);
    const toggleSelectorEvent = toggleSkillSelector.find(item => item.triggerState);
    const voiceContact = useSelector(voiceContactSelector);
    const [translate] = useTranslator();
    const agentInConsultCall = useSelector(hasConsultCall);
    const allInteractions = useSelector(getAllInteractions);
    const assignmentPanelMetadata = useSelector(getAssignmentPanelMetadata);
    const agentProfileSettings = useSelector(getAgentProfileSettings);
    const hideConsult = addressBookSelector ? agentProfileSettings === null || agentProfileSettings === void 0 ? void 0 : agentProfileSettings.hideOBAddressBookConsult : agentProfileSettings === null || agentProfileSettings === void 0 ? void 0 : agentProfileSettings.hideOBADHoc;
    const isUnifiedQRFeatureEnabled = isFeatureEnabled("release-cx-agent-quick-response-unification-AW-28770" /* FeatureToggles.QUICK_RESPONSE_UNIFICATION_FEATURE_TOGGLE */);
    const isTSObContactsFTEnabled = isFeatureEnabled("release-cx-ts-digital-outbound-contacts-AW-36771" /* FeatureToggles.TS_DIGITAL_OB_CONTACTS_TOGGLE */);
    const [isTSEnabled, setIsTSEnabled] = useState(false);
    const { emailOBChannels, hasOutboundChannels, hasPhoneOBSkills, isOutboundSkillAssigned: userHaveOutboundSkill, outboundChannelsLength, phoneOBSkills, smsOBChannels, userHaveObChannel: userHaveOBChannel, whatsappOBChannels, hasDigitalOBSkills, emailOBSkills, smsOBSkills, whatsappOBSkills, } = useGetOutboundOptions();
    const { triggerOutboundDigital, triggerOutboundCall } = useOutboundHandler();
    const triggerTypes = Object.assign(Object.assign(Object.assign({}, (!hideConsult ? { voice: {
            id: 1,
            type: OBChannels.VOICE,
            label: translate('voiceCall'),
            icon: renderIconForTriggerTypes(OBChannels.VOICE),
            OBSkills: phoneOBSkills,
            OBChannels: [],
            DigitalOBSkills: [],
            inputValidation: () => {
                const isValidNumber = validationUtil.validateNumberForDirectory(number.toString());
                return isValidNumber;
            },
            state: toggleSkillSelector === null || toggleSkillSelector === void 0 ? void 0 : toggleSkillSelector.find((item) => item.triggerType === OBChannels.VOICE),
        } } : {})), (!(agentProfileSettings === null || agentProfileSettings === void 0 ? void 0 : agentProfileSettings.hideOBTransfer) ? { transfer: {
            id: 2,
            type: OBChannels.TRANSFER,
            label: translate('transferContact'),
            icon: renderIconForTriggerTypes(OBChannels.TRANSFER),
            OBSkills: [],
            OBChannels: [],
            DigitalOBSkills: [],
            inputValidation: () => {
                const isValidNumber = validationUtil.validateNumberForDirectory(number.toString());
                return isValidNumber;
            },
            state: toggleSkillSelector.find((item) => item.triggerType === OBChannels.TRANSFER),
        } } : {})), { sms: {
            id: 3,
            type: OBChannels.SMS,
            label: translate('sms'),
            icon: renderIconForTriggerTypes(OBChannels.SMS),
            OBChannels: (isTSEnabled && isTSObContactsFTEnabled) ? [] : smsOBChannels,
            DigitalOBSkills: (isTSEnabled && isTSObContactsFTEnabled) ? smsOBSkills : [],
            OBSkills: [],
            inputValidation: () => {
                const isValidNumber = validationUtil.validateNumberForDirectory(number.toString());
                return isValidNumber && (!addressBookSelector || (addressBookSelector && (toggleSelectorEvent === null || toggleSelectorEvent === void 0 ? void 0 : toggleSelectorEvent.triggerType) === OBChannels.SMS));
            },
            state: toggleSkillSelector === null || toggleSkillSelector === void 0 ? void 0 : toggleSkillSelector.find((item) => item.triggerType === OBChannels.SMS),
        }, email: {
            id: 4,
            type: OBChannels.EMAIL,
            label: translate('email'),
            icon: renderIconForTriggerTypes(OBChannels.EMAIL),
            OBChannels: (isTSEnabled && isTSObContactsFTEnabled) ? [] : emailOBChannels,
            DigitalOBSkills: (isTSEnabled && isTSObContactsFTEnabled) ? emailOBSkills : [],
            OBSkills: [],
            inputValidation: () => {
                const isValidEmail = validationUtil.validateEmail(number.toString());
                return isValidEmail && (!addressBookSelector || (addressBookSelector && (toggleSelectorEvent === null || toggleSelectorEvent === void 0 ? void 0 : toggleSelectorEvent.triggerType) === OBChannels.EMAIL));
            },
            state: toggleSkillSelector === null || toggleSkillSelector === void 0 ? void 0 : toggleSkillSelector.find((item) => item.triggerType === OBChannels.EMAIL),
        }, whatsapp: {
            id: 5,
            type: OBChannels.WHATSAPP,
            label: translate('whatsapp'),
            icon: renderIconForTriggerTypes(OBChannels.WHATSAPP),
            OBChannels: (isTSEnabled && isTSObContactsFTEnabled) ? [] : whatsappOBChannels,
            DigitalOBSkills: (isTSEnabled && isTSObContactsFTEnabled) ? whatsappOBSkills : [],
            OBSkills: [],
            inputValidation: () => {
                const isValidNumber = validationUtil.validateNumberForDirectory(number.toString());
                return isValidNumber && !addressBookSelector;
            },
            state: toggleSkillSelector === null || toggleSkillSelector === void 0 ? void 0 : toggleSkillSelector.find((item) => item.triggerType === OBChannels.WHATSAPP),
        } });
    useEffect(() => {
        dispatch(getAgentOBChannels(true));
    }, [outboundChannelsLength]);
    useEffect(() => {
        CXoneClient.instance.cxoneTenant.checkProductEnablementFromTenantData([CXoneProductFeature.DIVISIONS]).then((isTSEnabled) => {
            setIsTSEnabled(!!isTSEnabled);
        });
    }, []);
    /**
     * Function to handle cancel button click
     * @param triggerValue - boolean
     * @param triggerType - string
     * @example - cancelHandler(e, outboundState)
     */
    const cancelHandler = (e, outboundState) => {
        e.stopPropagation();
        dispatch(agentDirectoryActions.updateSkillSelectorToggle(outboundState));
    };
    /**
     * Function to handle trigger for outbound
     * @param triggerValue - boolean
     * @param triggerType - string
     * @example - handleTrigger(true, triggerType.type)
     */
    const handleTrigger = (event, triggerValue, triggerType, channelID = '', digitalSkillId) => {
        event.stopPropagation();
        if (triggerValue && (triggerType === 'voice' || triggerType === 'transfer')) {
            triggerOutboundCall({
                phone: number,
                skillId: skillIdSelectedForInteraction !== null && skillIdSelectedForInteraction !== void 0 ? skillIdSelectedForInteraction : undefined,
                triggerType,
            });
        }
        else {
            // fetch all configured quick replies for the outbound channel
            if (isUnifiedQRFeatureEnabled) {
                dispatch(fetchUnifiedQuickReplies({
                    channelId: channelID,
                }));
            }
            else {
                dispatch(fetchOutboundQuickReplies({ page: 1, channelId: channelID }));
            }
            triggerOutboundDigital({
                channelType: triggerType,
                channelId: channelID,
                receiverTo: number,
                digitalSkillId,
            });
        }
    };
    /**
     * Function to handle trigger for outbound
     * @param triggerValue - boolean
     * @param triggerType - string
     * @example - handleTrigger(true, triggerType.type)
     */
    const voiceClickEvent = (e, triggerType) => {
        var _a, _b, _c, _d, _e;
        let state = toggleSkillSelector === null || toggleSkillSelector === void 0 ? void 0 : toggleSkillSelector.find((item) => item.triggerType === triggerType.type);
        state = state ? state : { triggerType: triggerType.type, triggerState: false };
        triggerType.state = state;
        e.stopPropagation();
        state = { triggerState: !(state === null || state === void 0 ? void 0 : state.triggerState),
            triggerType: triggerType.type, };
        if (skillIdSelectedForInteraction === -1 && (triggerType.type === 'voice' || triggerType.type === 'transfer')) {
            dispatch(agentDirectoryActions.updateSkillIdSelectedForInteraction(null));
        }
        if (triggerType.type === 'voice') {
            triggerType.OBSkills.length > 1
                ? dispatch(agentDirectoryActions.updateSkillSelectorToggle({ triggerType: triggerType.type, triggerState: state ? state.triggerState : false }))
                : handleTrigger(e, true, triggerType.type);
        }
        else if (triggerType.type === 'transfer') {
            handleTrigger(e, true, triggerType.type);
        }
        else {
            if (isTSEnabled && isTSObContactsFTEnabled) {
                triggerType.DigitalOBSkills && ((_a = triggerType.DigitalOBSkills) === null || _a === void 0 ? void 0 : _a.length) > 1
                    ? dispatch(agentDirectoryActions.updateSkillSelectorToggle({ triggerType: triggerType.type, triggerState: state ? state.triggerState : false }))
                    : handleTrigger(e, true, triggerType.type, (_c = (_b = triggerType.DigitalOBSkills) === null || _b === void 0 ? void 0 : _b[0]) === null || _c === void 0 ? void 0 : _c.digitalPOCName, (_e = (_d = triggerType.DigitalOBSkills) === null || _d === void 0 ? void 0 : _d[0]) === null || _e === void 0 ? void 0 : _e.skillId);
            }
            else {
                triggerType.OBChannels.length > 1
                    ? dispatch(agentDirectoryActions.updateSkillSelectorToggle({
                        triggerType: triggerType.type,
                        triggerState: state ? state.triggerState : false,
                    }))
                    : handleTrigger(e, true, triggerType.type, triggerType.OBChannels[0].channelId);
            }
        }
    };
    return userHaveOutboundSkill || userHaveOBChannel ? (_jsxs("div", { children: [(hasPhoneOBSkills || hasOutboundChannels || hasDigitalOBSkills) &&
                ((!hideConsult && ((_a = triggerTypes === null || triggerTypes === void 0 ? void 0 : triggerTypes.voice) === null || _a === void 0 ? void 0 : _a.inputValidation())) ||
                    triggerTypes.sms.inputValidation() ||
                    triggerTypes.email.inputValidation() ||
                    triggerTypes.whatsapp.inputValidation()) && (_jsxs(Box, Object.assign({ component: 'span', sx: outboundOptionsStyle.textContainer }, { children: [_jsxs(Box, Object.assign({ component: 'span', sx: [outboundOptionsStyle.text, props.textStyle ? props.textStyle : {}] }, { children: [' ', "Outbound: ", number, ' '] })), _jsx(Divider, { sx: outboundOptionsStyle.liner })] }))), Object.values(triggerTypes).map((triggerType) => {
                var _a, _b, _c, _d, _e;
                //Additional conditions for OB options in directory external numbers        
                return (((triggerType.OBSkills.length > 0))
                    || triggerType.OBChannels.length > 0
                    || (isTSEnabled && isTSObContactsFTEnabled && triggerType.DigitalOBSkills && triggerType.DigitalOBSkills.length > 0)
                    || (triggerType.type === 'transfer' && (!agentInConsultCall && (assignmentPanelMetadata.voiceInteractionId && allInteractions[assignmentPanelMetadata.voiceInteractionId] && Object.keys(allInteractions[assignmentPanelMetadata.voiceInteractionId]).length && Object.keys(allInteractions[assignmentPanelMetadata.voiceInteractionId].acdContacts).length === 1))))
                    &&
                        triggerType.inputValidation() && (_jsxs(Box, Object.assign({ component: 'div', "data-testid": `${triggerType.type}-outbound-option`, sx: [outboundOptionsStyle.outboundOption, (skills === null || skills === void 0 ? void 0 : skills.length) > 1 && outboundOptionsStyle.noTriggerButton] }, { children: [_jsxs(Box, Object.assign({ component: 'div', role: "button", tabIndex: 0, sx: outboundOptionsStyle.flexDisplay, "data-testid": "flex-Display-bt" }, ((triggerType.OBSkills.length > 1 ||
                            triggerType.OBChannels.length > 1 || ((_a = triggerType.DigitalOBSkills) === null || _a === void 0 ? void 0 : _a.length) > 1) ? { 'aria-haspopup': 'dialog', 'aria-expanded': (_b = triggerType.state) === null || _b === void 0 ? void 0 : _b.triggerState } : {}), { onClick: (e) => { voiceClickEvent(e, triggerType); }, onKeyDown: (event) => { if (event.key === EventKeys.SPACE || event.key === EventKeys.ENTER) {
                                event.preventDefault();
                                event.stopPropagation();
                                voiceClickEvent(event, triggerType);
                            } } }, { children: [_jsx(Box, Object.assign({ component: 'div', sx: outboundOptionsStyle.outboundOptionIcon }, (triggerType.type === 'transfer' ? { marginRight: '0.3125rem' } : {}), { children: _jsx(triggerType.icon, { fontSize: 'large' }) })), _jsx(Box, Object.assign({ component: 'div', sx: triggerType.type === 'voice' ? outboundOptionsStyle.customOutboundOptionText : outboundOptionsStyle.outboundOptionText }, { children: triggerType.type === 'voice' && voiceContact && (voiceContact === null || voiceContact === void 0 ? void 0 : voiceContact.contactID) !== undefined ? translate('consult') : triggerType.label }))] })), _jsx(Collapse, Object.assign({ in: (_c = triggerType.state) === null || _c === void 0 ? void 0 : _c.triggerState, sx: { width: '100%' } }, { children: (triggerType.OBSkills.length > 1 ||
                                triggerType.OBChannels.length > 1 || ((_d = triggerType.DigitalOBSkills) === null || _d === void 0 ? void 0 : _d.length) > 1) &&
                                ((_e = triggerType.state) === null || _e === void 0 ? void 0 : _e.triggerState) ? (_jsx(AgentMultiSkillHoverDropDownView, { data: triggerType.OBSkills, handleTrigger: handleTrigger, cancelHandler: cancelHandler, triggerType: triggerType.type, OBChannels: triggerType.OBChannels, DigitalOBSkills: triggerType.DigitalOBSkills, customerName: number.toString(), IBcall: false })) : null }))] }), triggerType.id));
            })] })) : null;
};
export default CcfOutboundOptions;
//# sourceMappingURL=ccf-outbound-options.js.map