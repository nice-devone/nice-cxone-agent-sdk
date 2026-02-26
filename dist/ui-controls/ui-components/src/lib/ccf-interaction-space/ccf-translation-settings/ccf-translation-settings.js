import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Checkbox, FormControl, FormControlLabel, FormGroup, IconButton, InputLabel, MenuItem, Popover, Select, Stack, useTheme, } from '@mui/material';
import { CcfButton, CcfCloseIcon, CcfTooltip, CcfTypography, useTranslator, CcfTranslationArrowsIcon, } from '@nice-devone/ui-controls';
import CcfTranslationSettingsStyles from './ccf-translation-settings-styles';
import { CcfAssignmentAction, getTranslationSettingsByCaseId } from '../../ccf-assignment-panel/ccf-assignment-panel.slice';
/**
 * Component displays translation settings form for digital case
 * @returns Popover menu item for interaction space
 * ```
 * @example
 * <CcfTranslationSettings/>
 * ```
 */
export default function CcfTranslationSettings({ anchorEl, caseId, interactionId, isTranslationSettingsOpen, handleClose, availableLanguages, }) {
    const dispatch = useDispatch();
    const theme = useTheme();
    const styles = CcfTranslationSettingsStyles();
    const [translate] = useTranslator();
    const translationSettings = useSelector(getTranslationSettingsByCaseId(caseId, interactionId));
    const initialCustomerLanguage = (translationSettings === null || translationSettings === void 0 ? void 0 : translationSettings.customerLanguage) || { '': '' };
    const initialAgentLanguage = (translationSettings === null || translationSettings === void 0 ? void 0 : translationSettings.agentLanguage) || { '': '' };
    const initialIsTranslateCustomerMessages = (translationSettings === null || translationSettings === void 0 ? void 0 : translationSettings.isTranslateCustomerMessages) || false;
    const initialIsTranslateAgentMessages = (translationSettings === null || translationSettings === void 0 ? void 0 : translationSettings.isTranslateAgentMessages) || false;
    const [customerLanguage, setCustomerLanguage] = useState(initialCustomerLanguage);
    const [agentLanguage, setAgentLanguage] = useState(initialAgentLanguage);
    const [isTranslateCustomerMessages, setIsTranslateCustomerMessages] = useState(initialIsTranslateCustomerMessages);
    const [isTranslateAgentMessages, setIsTranslateAgentMessages] = useState(initialIsTranslateAgentMessages);
    useEffect(() => {
        if (Object.keys(customerLanguage)[0] !== Object.keys(initialCustomerLanguage)[0]) {
            setCustomerLanguage(initialCustomerLanguage);
        }
        if (Object.keys(agentLanguage)[0] !== Object.keys(initialAgentLanguage)[0]) {
            setAgentLanguage(initialAgentLanguage);
        }
        if (isTranslateAgentMessages !== initialIsTranslateAgentMessages) {
            setIsTranslateAgentMessages(initialIsTranslateAgentMessages);
        }
        if (isTranslateCustomerMessages !== initialIsTranslateCustomerMessages) {
            setIsTranslateCustomerMessages(initialIsTranslateCustomerMessages);
        }
    }, [Object.keys(initialCustomerLanguage)[0], Object.keys(initialAgentLanguage)[0], initialIsTranslateAgentMessages, initialIsTranslateCustomerMessages]);
    /**
     * sets translation settings in redux slice
     * @example applyTranslationSettings();
     */
    const applyTranslationSettings = () => {
        dispatch(CcfAssignmentAction.setTranslationSettings({
            interactionId,
            caseId,
            translationSettings: {
                customerLanguage,
                agentLanguage,
                isTranslateAgentMessages,
                isTranslateCustomerMessages,
            },
        }));
        handleClose();
    };
    const isApplyDisabled = Object.keys(customerLanguage)[0] === '' ||
        Object.keys(agentLanguage)[0] === '';
    /**
     * render menu items for customer and agent language dropdown
     * @example renderMenuItems(availableLanguages.language);
     */
    const renderMenuItems = (languages) => languages &&
        Object.entries(languages).map(([key, value]) => (_jsx(MenuItem, Object.assign({ value: JSON.stringify({ [key]: value }) }, { children: value }))));
    return (Object.keys(availableLanguages).length > 0 ? _jsx(Popover, Object.assign({ id: "translation-settings-popover", open: isTranslationSettingsOpen, anchorEl: anchorEl, onClose: handleClose, anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'right',
        }, transformOrigin: {
            vertical: 'top',
            horizontal: 'right',
        }, PaperProps: {
            style: styles.popover,
        } }, { children: _jsxs(FormGroup, Object.assign({ sx: styles.formGroup }, { children: [_jsxs(Stack, Object.assign({ flexDirection: "row", justifyContent: "space-between", sx: { marginBottom: '12px' } }, { children: [_jsx(CcfTypography, { sx: styles.header, translationKey: "translationOptions" }), _jsx(CcfTooltip, Object.assign({ title: "", translationKey: "close" }, { children: _jsx(IconButton, Object.assign({ onClick: handleClose, sx: styles.closeIconButton }, { children: _jsx(CcfCloseIcon, { color: "secondary", viewBox: "-8 -6 32 32" }) })) }))] })), _jsxs(FormControl, Object.assign({ sx: styles.select }, { children: [_jsx(InputLabel, Object.assign({ size: "small", id: "customer-language-label" }, { children: translate('customerLanguage') })), _jsx(Select, Object.assign({ id: "customer-language-select", labelId: "customer-language-label", label: translate('customerLanguage'), onChange: (event) => {
                                setCustomerLanguage(JSON.parse(event.target.value));
                            }, size: "small", value: JSON.stringify(customerLanguage) }, { children: renderMenuItems(availableLanguages.languages) }))] })), _jsx(Box, Object.assign({ sx: { textAlign: 'center' } }, { children: _jsx(CcfTranslationArrowsIcon, { sx: { fill: theme.palette.text.light, transform: 'scale(-1)' } }) })), _jsxs(FormControl, Object.assign({ sx: styles.select }, { children: [_jsx(InputLabel, Object.assign({ id: "agent-language-label", size: "small" }, { children: translate('myLanguage') })), _jsx(Select, Object.assign({ displayEmpty: true, labelId: "agent-language-label", label: translate('myLanguage'), onChange: (event) => {
                                setAgentLanguage(JSON.parse(event.target.value));
                            }, size: "small", value: JSON.stringify(agentLanguage) }, { children: renderMenuItems(availableLanguages.languages) }))] })), _jsxs(Stack, Object.assign({ marginTop: "4px" }, { children: [_jsx(FormControlLabel, { label: translate('translateCustomerMessages'), control: _jsx(Checkbox, { checked: isTranslateCustomerMessages, onChange: (event) => {
                                    setIsTranslateCustomerMessages(event.target.checked);
                                }, size: "small" }), sx: isTranslateCustomerMessages
                                ? styles.checkboxLabelChecked
                                : styles.checkboxLabelUnchecked }), _jsx(FormControlLabel, { label: translate('translateMyReplies'), control: _jsx(Checkbox, { checked: isTranslateAgentMessages, onChange: (event) => {
                                    setIsTranslateAgentMessages(event.target.checked);
                                }, size: "small" }), sx: isTranslateAgentMessages ? styles.checkboxLabelChecked : styles.checkboxLabelUnchecked })] })), _jsxs(Stack, Object.assign({ flexDirection: "row", justifyContent: "end", sx: { marginTop: '12px' } }, { children: [_jsx(CcfButton, Object.assign({ "aria-label": translate('cancel'), onClick: handleClose, size: "small" }, { children: translate('cancel') })), _jsx(CcfButton, Object.assign({ "aria-label": translate('apply'), disabled: isApplyDisabled, onClick: applyTranslationSettings, primary: true, sx: { marginLeft: '12px' }, size: "small" }, { children: translate('apply') }))] }))] })) }))
        : _jsx("div", {}));
}
//# sourceMappingURL=ccf-translation-settings.js.map