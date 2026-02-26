import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Box, MenuItem, Paper, Select, useMediaQuery, useTheme } from '@mui/material';
import { useSelector } from 'react-redux';
import { CcfHeader, CcfSettingsIcon, CcfTabs, useTranslator } from '@nice-devone/ui-controls';
import { getApplicationDirection } from '../global.app.slice';
import { useCallback, useEffect, useState } from 'react';
import settingsStyles from './ccf-settings.styles';
import ccfFullViewSettingsStyles from './ccf-full-view-settings.styles';
import WrapperComponent from '../ccf-navigation/ccf-wrapper-component';
export var SettingsDropdownValues;
(function (SettingsDropdownValues) {
    SettingsDropdownValues["AV_NOTIFICATIONS"] = "A/V Notifications";
    SettingsDropdownValues["DISPLAY"] = "Display & Keyboard";
    SettingsDropdownValues["VOICE"] = "Login & Voice Preferences";
    SettingsDropdownValues["INFORMATION"] = "Information";
    SettingsDropdownValues["AGENT_SKILLS"] = "Agent Skills";
    SettingsDropdownValues["REPORT_ISSUE"] = "Report Issue";
})(SettingsDropdownValues || (SettingsDropdownValues = {}));
/**
 * Component for ccf full view settings
 * @param props - CcfFullViewSettingsProps
 * @example - <CCfFullViewSettings />
 * @returns
 */
export function CcfFullViewSettings() {
    const theme = useTheme();
    const [translate] = useTranslator();
    const appDirection = useSelector(getApplicationDirection);
    const isSmView = useMediaQuery(theme.breakpoints.down('xl'));
    const styles = ccfFullViewSettingsStyles(theme);
    const classes = settingsStyles(theme);
    const [settingsValue, setSettingsValue] = useState(SettingsDropdownValues.VOICE);
    const [tab, setTab] = useState(0);
    const settingsTabs = [
        {
            element: _jsx(WrapperComponent, { component: 'CcfVoiceSettings' }),
            isActive: true,
            label: translate('loginAndVoicePreference'),
            value: SettingsDropdownValues.VOICE,
        },
        {
            element: _jsx(WrapperComponent, { component: 'CcfNotificationSettings' }),
            isActive: true,
            label: translate('avNotifications'),
            value: SettingsDropdownValues.AV_NOTIFICATIONS,
        },
        {
            element: _jsx(WrapperComponent, { component: 'CcfDisplaySettings' }),
            isActive: true,
            label: translate('displayAndKeyboard'),
            value: SettingsDropdownValues.DISPLAY,
        },
        {
            element: _jsx(WrapperComponent, { component: 'CcfSystemInformation' }),
            isActive: true,
            label: translate('information'),
            value: SettingsDropdownValues.INFORMATION,
        },
        {
            element: _jsx(WrapperComponent, { component: 'CcfAgentSkills' }),
            isActive: true,
            label: translate('agentSkills'),
            value: SettingsDropdownValues.AGENT_SKILLS,
        },
        {
            element: _jsx(WrapperComponent, { component: 'CcfReportIssue' }),
            isActive: true,
            label: translate('reportIssue'),
            value: SettingsDropdownValues.REPORT_ISSUE,
        }
    ];
    const activeTabs = settingsTabs.filter((tab) => tab.isActive);
    /**
     *
     * @param e - event
     * @example handleChange
     */
    const handleChange = (event) => {
        setSettingsValue(event.target.value);
    };
    const handleKeyPress = useCallback((event) => {
        var _a;
        if (event.ctrlKey && event.altKey && isSmView) {
            const currentIndex = activeTabs.indexOf((_a = activeTabs.find(tab => tab.value === settingsValue)) !== null && _a !== void 0 ? _a : activeTabs[0]);
            switch (event.code) {
                case 'ArrowRight':
                    event.preventDefault();
                    if (currentIndex === ((activeTabs === null || activeTabs === void 0 ? void 0 : activeTabs.length) - 1)) {
                        setSettingsValue(activeTabs[0].value);
                    }
                    else {
                        setSettingsValue(activeTabs[currentIndex + 1].value);
                    }
                    break;
                case 'ArrowLeft':
                    event.preventDefault();
                    if (currentIndex === 0) {
                        setSettingsValue(activeTabs[(activeTabs === null || activeTabs === void 0 ? void 0 : activeTabs.length) - 1].value);
                    }
                    else {
                        setSettingsValue(activeTabs[currentIndex - 1].value);
                    }
                    break;
            }
        }
    }, [activeTabs, settingsValue]);
    useEffect(() => {
        document.addEventListener('keydown', handleKeyPress);
        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, [handleKeyPress]);
    /**
     *
     * @param e - event
     * @example handleTabChange
     */
    const handleTabChange = (newValue) => {
        setTab(newValue);
    };
    return (_jsx(Box, Object.assign({ sx: styles.FullViewSettingsCard }, { children: isSmView ?
            _jsxs(_Fragment, { children: [_jsx(Box, Object.assign({ sx: styles.settingsHeader }, { children: _jsx(CcfHeader, { LeftIcon: _jsx(CcfSettingsIcon, { color: 'primary', viewBox: '-2 -2 23 23', fontSize: 'small' }), headerText: translate('settings'), RightIcon: false, showDragIcon: true, direction: appDirection }) })), _jsxs(Paper, Object.assign({ square: true, elevation: 0, sx: classes.settingsContainer }, { children: [_jsx("div", Object.assign({ style: classes.menuTab }, { children: _jsxs(Select, Object.assign({ labelId: "settings-select-label", id: "settings-select", value: settingsValue, onChange: handleChange, sx: { width: { xs: '100%', lg: '255px' }, height: '40px' } }, { children: [_jsx(MenuItem, Object.assign({ value: SettingsDropdownValues.VOICE }, { children: translate('loginAndVoicePreference') })), _jsx(MenuItem, Object.assign({ value: SettingsDropdownValues.AV_NOTIFICATIONS }, { children: translate('avNotifications') })), _jsx(MenuItem, Object.assign({ value: SettingsDropdownValues.DISPLAY }, { children: translate('displayAndKeyboard') })), _jsx(MenuItem, Object.assign({ value: SettingsDropdownValues.INFORMATION }, { children: translate('information') })), _jsx(MenuItem, Object.assign({ value: SettingsDropdownValues.AGENT_SKILLS }, { children: translate('agentSkills') })), _jsx(MenuItem, Object.assign({ value: SettingsDropdownValues.REPORT_ISSUE }, { children: translate('reportIssue') }))] })) })), settingsValue === SettingsDropdownValues.VOICE && (_jsx(WrapperComponent, { component: 'CcfVoiceSettings' })), settingsValue === SettingsDropdownValues.AV_NOTIFICATIONS && (_jsx(WrapperComponent, { component: 'CcfNotificationSettings' })), settingsValue === SettingsDropdownValues.DISPLAY && (_jsx(WrapperComponent, { component: 'CcfDisplaySettings' })), settingsValue === SettingsDropdownValues.INFORMATION && (_jsx(WrapperComponent, { component: 'CcfSystemInformation' })), settingsValue === SettingsDropdownValues.AGENT_SKILLS && (_jsx(WrapperComponent, { component: 'CcfAgentSkills' })), settingsValue === SettingsDropdownValues.REPORT_ISSUE && (_jsx(WrapperComponent, { component: 'CcfReportIssue' }))] }))] }) :
            _jsxs(_Fragment, { children: [_jsx(CcfHeader, { LeftIcon: _jsx(CcfSettingsIcon, { color: 'primary', viewBox: '-2 -2 23 23', fontSize: 'small' }), headerText: translate('settings'), RightIcon: false, showDragIcon: true, direction: appDirection }), _jsx(CcfTabs, Object.assign({ currentTab: tab, variant: CcfTabs.Variant.FULL_WIDTH, setCurrentTab: handleTabChange, bottomBorder: true }, { children: activeTabs.map((tab) => (_jsx(CcfTabs.TabPanel, Object.assign({ label: tab.label }, { children: _jsx(Box, Object.assign({ sx: styles.container }, { children: tab.element })) }), tab.label))) }))] }) })));
}
export default CcfFullViewSettings;
//# sourceMappingURL=ccf-full-view-settings.js.map