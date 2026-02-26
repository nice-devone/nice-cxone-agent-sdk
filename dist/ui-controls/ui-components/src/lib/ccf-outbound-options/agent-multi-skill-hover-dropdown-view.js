import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/* eslint-disable no-nested-ternary */
import { useEffect, useRef, useState } from 'react';
import { Box, MenuItem, Select, useMediaQuery, useTheme } from '@mui/material';
import { CcfTooltip, CcfButton, useTranslator } from '@nice-devone/ui-controls';
import CcfOutboundOptionsStyle from './ccf-outbound-options.styles';
import { isFeatureEnabled } from '../../util/featureToggleUtils';
/**
 * AgentMultiSkillHoverDropDown component - Dropdown for selecting skills or channels
 *
 * @param props - AgentMultiSkillHoverDropDownProps
 * @example
 * ```tsx
 * <AgentMultiSkillHoverDropDown
 *   data={skills}
 *   OBChannels={channels}
 *   triggerType="voice"
 *   {...otherProps}
 * />
 * ```
 */
const AgentMultiSkillHoverDropDown = ({ data, OBChannels, triggerType, skillIdSelectedForInteraction, setOBSkillIdForInteraction, selectedChannelForOBInteraction, setOBChannelIdForInteraction, IBcall, cancelHandler, elevationPopover, handleTrigger, customerName, renderTwoColumnDesign, isTSEnabled = false, DigitalOBSkills, selectedDigitalSkillId, }) => {
    const isTSObContactsFTEnabled = isFeatureEnabled("release-cx-ts-digital-outbound-contacts-AW-36771" /* FeatureToggles.TS_DIGITAL_OB_CONTACTS_TOGGLE */);
    const theme = useTheme();
    const skillDropDownStyle = CcfOutboundOptionsStyle(theme, IBcall, elevationPopover);
    const isSmView = useMediaQuery(theme.breakpoints.down('xl'));
    const menuPropsWidth = isSmView && !renderTwoColumnDesign ? '19.688rem' : '';
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: 172,
                width: elevationPopover ? 'inherit' : menuPropsWidth,
            },
        },
    };
    const outboundState = {
        triggerState: false,
        triggerType: triggerType,
    };
    const disabledSelectOption = useRef(null);
    const skillSelectElement = useRef(null);
    const channelSelectElement = useRef(null);
    const [channelSelectElementWidth, setChannelSelectElementWidth] = useState(undefined);
    const [skillSelectElementWidth, setSkillSelectElementWidth] = useState(undefined);
    const [showTooltip, setShowTooltip] = useState(false);
    const callBtnRef = useRef(false);
    const startBtnRef = useRef(false);
    const [translate] = useTranslator();
    useEffect(() => {
        var _a;
        setChannelSelectElementWidth((_a = channelSelectElement.current) === null || _a === void 0 ? void 0 : _a.clientWidth);
    }, [channelSelectElement]);
    useEffect(() => {
        var _a;
        setSkillSelectElementWidth((_a = skillSelectElement.current) === null || _a === void 0 ? void 0 : _a.clientWidth);
    }, [skillSelectElement]);
    useEffect(() => {
        requestAnimationFrame(() => {
            focusElementOnValueSelect(channelSelectElement);
        });
    }, [skillIdSelectedForInteraction]);
    useEffect(() => {
        requestAnimationFrame(() => {
            focusElementOnValueSelect(skillSelectElement);
        });
    }, [selectedChannelForOBInteraction]);
    /**
     * Function to focus on skill/channel dropdown when outbound option is selected
     * @param elementToBeFocused - reference object of the element to be focused
     * @example focusElementOnValueSelect(channelSelectElement)
     */
    const focusElementOnValueSelect = (elementToBeFocused) => {
        var _a;
        if (elementToBeFocused.current) {
            const buttonDiv = (_a = elementToBeFocused === null || elementToBeFocused === void 0 ? void 0 : elementToBeFocused.current) === null || _a === void 0 ? void 0 : _a.querySelector('div[tabindex="0"]');
            if (buttonDiv instanceof HTMLElement) {
                buttonDiv.focus();
            }
        }
    };
    /**
     * Function to handle onopen event of select
     * @param selectedChannel - selected Channel
     * @example onOpenSelectBox(event)
     */
    const onOpenSelectBox = (selectedChannel) => {
        setTimeout(() => {
            var _a;
            if (selectedChannel === '-1')
                (_a = disabledSelectOption === null || disabledSelectOption === void 0 ? void 0 : disabledSelectOption.current) === null || _a === void 0 ? void 0 : _a.focus();
        });
    };
    /**
     * Function to handle mouse over
     * @param e - event
     * @example mouseOverHandler(event)
     */
    const mouseOverHandler = (e) => {
        if (e.target.offsetWidth < e.target.scrollWidth) {
            setShowTooltip(true);
        }
        else {
            setShowTooltip(false);
        }
    };
    return (_jsxs(Box, Object.assign({ width: '100%', "data-testid": "multi-skill-dropdown" }, { children: [triggerType === 'voice' ? (_jsxs(Select, Object.assign({ sx: skillDropDownStyle.skillSelect, size: "small", fullWidth: true, value: skillIdSelectedForInteraction, "data-testid": "Skill-id-interaction", onChange: setOBSkillIdForInteraction, onOpen: () => onOpenSelectBox(skillIdSelectedForInteraction), MenuProps: MenuProps, ref: skillSelectElement }, { children: [_jsx(MenuItem, Object.assign({ disabled: true, value: "-1", ref: disabledSelectOption, sx: { width: skillSelectElementWidth, textOverflow: 'ellipsis' } }, { children: translate('skillSelect') }), "-1"), data &&
                        data.map((item) => (_jsx(MenuItem, Object.assign({ dense: true, value: item.skillId, sx: { width: skillSelectElementWidth, minWidth: '100%' } }, { children: _jsx(CcfTooltip, Object.assign({ title: showTooltip ? item.skillName : '', arrow: true }, { children: _jsx(Box, Object.assign({ component: 'div', onMouseOver: (e) => mouseOverHandler(e), onMouseOut: (e) => mouseOverHandler(e), onFocus: () => null, onBlur: () => null, sx: skillDropDownStyle.menuItemTooltip }, { children: item.skillName })) })) }), item.skillId)))] }))) : (isTSEnabled && isTSObContactsFTEnabled) ? (_jsxs(Select, Object.assign({ sx: skillDropDownStyle.skillSelect, size: "small", fullWidth: true, value: selectedChannelForOBInteraction, "data-testid": "Obchanels-Interaction", onChange: setOBChannelIdForInteraction, MenuProps: MenuProps, onOpen: () => onOpenSelectBox(selectedChannelForOBInteraction), defaultValue: '-1', ref: channelSelectElement, disabled: !DigitalOBSkills || (DigitalOBSkills === null || DigitalOBSkills === void 0 ? void 0 : DigitalOBSkills.length) <= 1, inputProps: { 'aria-label': `${translate('skillSelect')}` } }, { children: [_jsx(MenuItem, Object.assign({ disabled: true, value: "-1", ref: disabledSelectOption, sx: { width: channelSelectElementWidth, textOverflow: 'ellipsis' } }, { children: translate('skillSelect') }), "-1"), DigitalOBSkills &&
                        DigitalOBSkills.map((item) => (_jsx(MenuItem, Object.assign({ value: item === null || item === void 0 ? void 0 : item.digitalPOCName, sx: { width: channelSelectElementWidth } }, { children: _jsx(CcfTooltip, Object.assign({ title: showTooltip && item.skillName ? item.skillName : '', arrow: true }, { children: _jsx(Box, Object.assign({ component: 'div', "data-testid": "Obchanels", onMouseOver: (e) => mouseOverHandler(e), onMouseOut: (e) => mouseOverHandler(e), onFocus: () => null, onBlur: () => null, sx: skillDropDownStyle.menuItemTooltip }, { children: item === null || item === void 0 ? void 0 : item.skillName })) })) }), item === null || item === void 0 ? void 0 : item.digitalPOCName)))] }))) : (_jsxs(Select, Object.assign({ sx: skillDropDownStyle.skillSelect, size: "small", fullWidth: true, value: selectedChannelForOBInteraction, "data-testid": "Obchanels-Interaction", onChange: setOBChannelIdForInteraction, MenuProps: MenuProps, onOpen: () => onOpenSelectBox(selectedChannelForOBInteraction), defaultValue: '-1', ref: channelSelectElement, disabled: OBChannels.length <= 1, inputProps: { 'aria-label': `${translate('channelSelect')}` } }, { children: [_jsx(MenuItem, Object.assign({ disabled: true, value: "-1", ref: disabledSelectOption, sx: { width: channelSelectElementWidth, textOverflow: 'ellipsis' } }, { children: translate('channelSelect') }), "-1"), OBChannels &&
                        OBChannels.map((item) => (_jsx(MenuItem, Object.assign({ value: item === null || item === void 0 ? void 0 : item.channelId, sx: { width: channelSelectElementWidth } }, { children: _jsx(CcfTooltip, Object.assign({ title: showTooltip && item.name ? item.name : '', arrow: true }, { children: _jsx(Box, Object.assign({ component: 'div', "data-testid": "Obchanels", onMouseOver: (e) => mouseOverHandler(e), onMouseOut: (e) => mouseOverHandler(e), onFocus: () => null, onBlur: () => null, sx: skillDropDownStyle.menuItemTooltip }, { children: item === null || item === void 0 ? void 0 : item.name })) })) }), item === null || item === void 0 ? void 0 : item.channelId)))] }))), IBcall ? '' : (_jsxs(Box, Object.assign({ display: 'flex', padding: '5px', justifyContent: 'flex-end' }, { children: [_jsx(CcfButton, Object.assign({ style: { padding: '2px' }, onClick: (e) => {
                            cancelHandler(e, outboundState);
                        }, "data-testid": "multi-skill-dropdown-cancel-btn" }, { children: translate('cancel') })), triggerType === 'voice' ? (_jsx(CcfButton, Object.assign({ primary: true, disabled: skillIdSelectedForInteraction === -1 || (elevationPopover && callBtnRef.current) ? true : false, sx: skillDropDownStyle.hoverPopUpCallBtnMargin, onClick: (e) => {
                            callBtnRef.current = true;
                            handleTrigger(e, true, triggerType, String(skillIdSelectedForInteraction), undefined, customerName);
                        }, "data-testid": "multi-skill-dropdown-call-btn" }, { children: translate('call') }))) : (_jsx(CcfButton, Object.assign({ primary: true, disabled: selectedChannelForOBInteraction === '-1' || (elevationPopover && startBtnRef.current) ? true : false, sx: skillDropDownStyle.hoverPopUpCallBtnMargin, onClick: (e) => {
                            startBtnRef.current = true;
                            handleTrigger(e, true, triggerType, selectedChannelForOBInteraction, selectedDigitalSkillId, customerName);
                        }, "data-testid": "multi-skill-dropdown-call-btn" }, { children: translate('start') })))] })))] })));
};
export default AgentMultiSkillHoverDropDown;
//# sourceMappingURL=agent-multi-skill-hover-dropdown-view.js.map