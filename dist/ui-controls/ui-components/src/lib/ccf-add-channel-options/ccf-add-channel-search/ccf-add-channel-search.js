import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Collapse, InputAdornment, MenuItem, Select, Typography, useTheme, } from '@mui/material';
import { useSelector } from 'react-redux';
import { CcfPhoneOutboundIcon, CcfSmsIcon, CcfTextField, CcfWhatsAppIcon, isFeatureEnabled, useTranslator, } from '@nice-devone/ui-controls';
import CcfIcon, { CHANNEL_ICON_SIZE } from '../../ccf-icon/ccf-icon';
import { AgentMultiSkillHoverDropDownView, OBChannels } from '../../ccf-outbound-options/ccf-outbound-options';
import ccfAddChannelOptionsStyles from '../ccf-add-channel-options.styles';
import { useState, useEffect } from 'react';
import { ValidationUtils } from '@nice-devone/core-sdk';
import { getAssignmentPanelMetadata } from '../../ccf-assignment-panel/ccf-assignment-panel.slice';
import ccfAddChannelSearchStyles from './ccf-add-channel-search.styles';
import useGetOutboundOptions, { filterByChannelType, filterSkillByChannelType } from '../../ccf-outbound-options/hooks/useGetOutboundOptions';
import { CCF_OPTION_TYPES } from '../ccf-add-channel-options-enums';
import { CXoneClient, CXoneProductFeature } from '@nice-devone/agent-sdk';
/**
 * Component for ccf add channel search
 * @param props - CcfAddChannelSearchProps
 * @example - <CcfAddChannelSearch />
 * @returns
 */
export function CcfAddChannelSearch(props) {
    var _a, _b;
    const { handleTrigger, selectedChannel, setSelectedChannel, clickChannelHandler, value } = props;
    const [translate] = useTranslator();
    const theme = useTheme();
    const addChannelOptionsStyles = ccfAddChannelOptionsStyles(theme);
    const addChannelSearchStyles = ccfAddChannelSearchStyles();
    const [inputValue, updateInputValue] = useState(value);
    const validationUtil = new ValidationUtils();
    const assignmentMetadata = useSelector(getAssignmentPanelMetadata);
    const isTSObContactsFTEnabled = isFeatureEnabled("release-cx-ts-digital-outbound-contacts-AW-36771" /* FeatureToggles.TS_DIGITAL_OB_CONTACTS_TOGGLE */);
    const [isTSEnabled, setIsTSEnabled] = useState(false);
    const { phoneOBSkills, outboundChannels, emailOBChannels: emailOutboundChannels, smsOBChannels: smsOutboundChannels, whatsappOBChannels: whatsappOutboundChannels, digitalOBSkills, emailOBSkills, smsOBSkills, whatsappOBSkills, } = useGetOutboundOptions();
    useEffect(() => {
        CXoneClient.instance.cxoneTenant.checkProductEnablementFromTenantData([CXoneProductFeature.DIVISIONS]).then((isTSEnabled) => {
            setIsTSEnabled(!!isTSEnabled);
        });
    }, []);
    /**
     *
     */
    useEffect(() => {
        updateInputValue(value);
    }, [value]);
    /**
     * Function to handle channel change for input box
     * @param event - SelectChangeEvent
     * @example - changeChannelHandler(event)
     */
    const changeChannelHandler = (event) => {
        event.stopPropagation();
        setSelectedChannel(event.target.value);
    };
    return (_jsxs(Box, Object.assign({ sx: {
            backgroundColor: (inputValue === null || inputValue === void 0 ? void 0 : inputValue.length) &&
                (validationUtil.validateNumberForDirectory(inputValue.toString()) ||
                    validationUtil.validateEmail(inputValue.toString()))
                ? (_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.background) === null || _b === void 0 ? void 0 : _b.outboundOptionBg
                : null,
            py: 1,
            px: 2,
        } }, { children: [_jsx(CcfTextField, { id: "searchField", "data-testId": 'search-field', autoComplete: "off", size: "small", value: inputValue, sx: addChannelSearchStyles.searchInput, placeholder: translate('phoneEmailSearch'), InputProps: {
                    endAdornment: selectedChannel ? (_jsx(InputAdornment, Object.assign({ position: "end" }, { children: _jsxs(Select, Object.assign({ sx: {}, size: "small", value: selectedChannel, renderValue: (selected) => {
                                switch (selected) {
                                    case OBChannels.VOICE:
                                        return _jsx(CcfPhoneOutboundIcon, { sx: [addChannelOptionsStyles.voiceCallIcon], viewBox: '6 6 16 16' });
                                    case OBChannels.SMS:
                                        return _jsx(CcfSmsIcon, { sx: [addChannelOptionsStyles.voiceCallIcon], viewBox: '6 6 16 16' });
                                    case OBChannels.WHATSAPP:
                                        return _jsx(CcfWhatsAppIcon, { viewBox: '6 6 16 16' });
                                    default:
                                        return _jsx(CcfIcon, { size: CHANNEL_ICON_SIZE.REM1 });
                                }
                            }, id: "manual-channel-select", "data-testId": "manual-channel-select", onChange: changeChannelHandler }, { children: [!assignmentMetadata.voiceInteractionId && (_jsx(MenuItem, Object.assign({ value: OBChannels.VOICE, sx: addChannelSearchStyles.channelMenuItem }, { children: _jsxs(Box, Object.assign({ sx: addChannelSearchStyles.channelMenuItemBox }, { children: [_jsx(CcfPhoneOutboundIcon, { sx: [addChannelOptionsStyles.voiceCallIcon] }), _jsx(Typography, Object.assign({ sx: addChannelSearchStyles.channelMenuItemText }, { children: translate('voiceCall') }))] })) }))), _jsx(MenuItem, Object.assign({ value: OBChannels.SMS, sx: addChannelSearchStyles.channelMenuItem }, { children: _jsxs(Box, Object.assign({ sx: addChannelSearchStyles.channelMenuItemBox }, { children: [_jsx(CcfSmsIcon, { sx: [addChannelOptionsStyles.voiceCallIcon] }), _jsx(Typography, Object.assign({ sx: addChannelSearchStyles.channelMenuItemText }, { children: translate('sms') }))] })) })), _jsx(MenuItem, Object.assign({ value: OBChannels.WHATSAPP, sx: addChannelSearchStyles.channelMenuItem }, { children: _jsxs(Box, Object.assign({ sx: addChannelSearchStyles.channelMenuItemBox }, { children: [_jsx(CcfWhatsAppIcon, {}), _jsx(Typography, Object.assign({ sx: addChannelSearchStyles.channelMenuItemText }, { children: translate('whatsapp') }))] })) }))] })) }))) : null,
                }, onChange: (event) => {
                    const newValue = event.target.value.replace(/\s+/g, ' ');
                    if (newValue.trim() === '' || (!validationUtil.validateNumberForDirectory(newValue.toString()) && !validationUtil.validateEmail(newValue.toString()))) {
                        setSelectedChannel(undefined);
                    }
                    updateInputValue(newValue);
                }, variant: "outlined", fullWidth: true, inputProps: {
                    'data-testid': 'search-phone-email',
                    'aria-label': `${translate('insert')} ${translate('phoneEmailSearch')}`,
                } }), _jsxs(Collapse, Object.assign({ in: ((inputValue === null || inputValue === void 0 ? void 0 : inputValue.length) &&
                    (validationUtil.validateNumberForDirectory(inputValue.toString()) ||
                        validationUtil.validateEmail(inputValue.toString()))) ||
                    selectedChannel
                    ? true
                    : false, sx: addChannelSearchStyles.collapse }, { children: [(inputValue === null || inputValue === void 0 ? void 0 : inputValue.length) &&
                        validationUtil.validateNumberForDirectory(inputValue.toString()) &&
                        !selectedChannel ? (_jsxs(Box, Object.assign({ sx: addChannelSearchStyles.numberInputChannels, "data-testid": 'numberInputChannels' }, { children: [_jsx(Box, Object.assign({ sx: [
                                    addChannelOptionsStyles.iconContainer,
                                    (!phoneOBSkills.length || assignmentMetadata.voiceInteractionId) ?
                                        addChannelOptionsStyles.disabledIconContainer : {}
                                ], "data-testid": 'manual-voice-call-option', onClick: (e) => clickChannelHandler(e, inputValue, OBChannels.VOICE, CCF_OPTION_TYPES.CHANNEL_SEARCH), tabIndex: phoneOBSkills.length && !assignmentMetadata.voiceInteractionId ? 0 : -1, onKeyUp: (e) => {
                                    if (e.key === 'Enter')
                                        clickChannelHandler(e, inputValue, OBChannels.VOICE, CCF_OPTION_TYPES.CHANNEL_SEARCH);
                                } }, { children: _jsx(CcfPhoneOutboundIcon, { fontSize: 'large', isDisabled: !phoneOBSkills.length || assignmentMetadata.voiceInteractionId ? true : false, sx: [
                                        addChannelOptionsStyles.voiceCallIcon
                                    ] }) })), isTSEnabled && isTSObContactsFTEnabled ? (_jsx(Box, Object.assign({ sx: [
                                    addChannelOptionsStyles.iconContainer,
                                    !smsOBSkills.length && addChannelOptionsStyles.disabledIconContainer
                                ], onClick: (e) => clickChannelHandler(e, inputValue, OBChannels.SMS, CCF_OPTION_TYPES.CHANNEL_SEARCH), tabIndex: smsOBSkills.length ? 0 : -1, "data-testId": 'sms', onKeyUp: (e) => {
                                    if (e.key === 'Enter')
                                        clickChannelHandler(e, inputValue, OBChannels.SMS, CCF_OPTION_TYPES.CHANNEL_SEARCH);
                                } }, { children: _jsx(CcfSmsIcon, { fontSize: 'large', isDisabled: smsOBSkills.length === 0 }) }))) :
                                (_jsx(Box, Object.assign({ sx: [
                                        addChannelOptionsStyles.iconContainer,
                                        !smsOutboundChannels.length && addChannelOptionsStyles.disabledIconContainer
                                    ], onClick: (e) => clickChannelHandler(e, inputValue, OBChannels.SMS, CCF_OPTION_TYPES.CHANNEL_SEARCH), tabIndex: smsOutboundChannels.length ? 0 : -1, "data-testId": 'sms', onKeyUp: (e) => {
                                        if (e.key === 'Enter')
                                            clickChannelHandler(e, inputValue, OBChannels.SMS, CCF_OPTION_TYPES.CHANNEL_SEARCH);
                                    } }, { children: _jsx(CcfSmsIcon, { fontSize: 'large', isDisabled: smsOutboundChannels.length === 0 }) }))), isTSEnabled && isTSObContactsFTEnabled ? (_jsx(Box, Object.assign({ sx: [
                                    addChannelOptionsStyles.iconContainer,
                                    !whatsappOBSkills.length && addChannelOptionsStyles.disabledIconContainer
                                ], onClick: (e) => clickChannelHandler(e, inputValue, OBChannels.WHATSAPP, CCF_OPTION_TYPES.CHANNEL_SEARCH), tabIndex: whatsappOBSkills.length ? 0 : -1, "data-testId": 'whatsapp', onKeyUp: (e) => {
                                    if (e.key === 'Enter')
                                        clickChannelHandler(e, inputValue, OBChannels.WHATSAPP, CCF_OPTION_TYPES.CHANNEL_SEARCH);
                                } }, { children: _jsx(CcfWhatsAppIcon, { fontSize: 'large', isDisabled: whatsappOBSkills.length === 0 }) }))) :
                                (_jsx(Box, Object.assign({ sx: [
                                        addChannelOptionsStyles.iconContainer,
                                        !whatsappOutboundChannels.length && addChannelOptionsStyles.disabledIconContainer
                                    ], onClick: (e) => clickChannelHandler(e, inputValue, OBChannels.WHATSAPP, CCF_OPTION_TYPES.CHANNEL_SEARCH), tabIndex: whatsappOutboundChannels.length ? 0 : -1, "data-testId": 'whatsapp', onKeyUp: (e) => {
                                        if (e.key === 'Enter')
                                            clickChannelHandler(e, inputValue, OBChannels.WHATSAPP, CCF_OPTION_TYPES.CHANNEL_SEARCH);
                                    } }, { children: _jsx(CcfWhatsAppIcon, { fontSize: 'large', isDisabled: whatsappOutboundChannels.length === 0 }) })))] }))) : null, selectedChannel && selectedChannel !== OBChannels.EMAIL ? (_jsx(AgentMultiSkillHoverDropDownView, { data: phoneOBSkills, handleTrigger: handleTrigger, cancelHandler: () => setSelectedChannel(undefined), triggerType: selectedChannel, OBChannels: selectedChannel !== OBChannels.VOICE ?
                            outboundChannels === null || outboundChannels === void 0 ? void 0 : outboundChannels.filter(filterByChannelType(selectedChannel)) :
                            [], DigitalOBSkills: isTSEnabled && isTSObContactsFTEnabled && selectedChannel !== OBChannels.VOICE ?
                            digitalOBSkills === null || digitalOBSkills === void 0 ? void 0 : digitalOBSkills.filter(filterSkillByChannelType(selectedChannel)) :
                            [], customerName: inputValue !== null && inputValue !== void 0 ? inputValue : '', IBcall: false, elevationPopover: true })) : null, (inputValue === null || inputValue === void 0 ? void 0 : inputValue.length) && validationUtil.validateEmail(inputValue.toString()) ? (_jsx(AgentMultiSkillHoverDropDownView, { data: phoneOBSkills, handleTrigger: handleTrigger, cancelHandler: () => updateInputValue(''), triggerType: OBChannels.EMAIL, OBChannels: emailOutboundChannels, DigitalOBSkills: emailOBSkills, customerName: inputValue, IBcall: false, elevationPopover: true })) : null] }))] })));
}
export default CcfAddChannelSearch;
//# sourceMappingURL=ccf-add-channel-search.js.map