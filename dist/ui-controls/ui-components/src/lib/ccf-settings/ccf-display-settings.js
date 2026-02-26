import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { CcfLogger } from '@nice-devone/agent-sdk';
import { CcfBox, CcfKeyboardIcon, CcfSendWithEnterIcon, CcfSwitchItem, CcfTypography, useTranslator, CcfEmailSortOrderIcon } from '@nice-devone/ui-controls';
import { SetSwitchHelper } from './ccf-settings-switch-item';
import { LocalStorageHelper, NotificationSettings } from '@nice-devone/core-sdk';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import OpenInBrowserIcon from '@mui/icons-material/OpenInBrowser';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useTheme, Box, InputLabel, Select, MenuItem } from '@mui/material';
import displaySettingStyles from './ccf-display-settings.styles';
import { useDispatch, useSelector } from 'react-redux';
import { isFeatureEnabled } from '../../util/featureToggleUtils';
import { EmailMessageSortOrder } from '../../enums/email-message-sort-order-type';
import { getPageActionPopoutSettings, getPanelPopoutSettings, getSendOnEnterSettings, getTwentyFourHourTimeSettings, updateClientDataSettings, getEmailMessageSortOrderSettings, getExpandSoftphoneSettings } from '../ccf-settings/ccf-full-settings.slice';
import { Expand } from '@mui/icons-material';
export var SendWithEnterValues;
(function (SendWithEnterValues) {
    SendWithEnterValues["ALLCHHANELS"] = "allChannels";
    SendWithEnterValues["ALLCHANNELSEXCEPTEMAIL"] = "allChannelsExceptEmail";
    SendWithEnterValues["NOCHANNELS"] = "noChannels";
})(SendWithEnterValues || (SendWithEnterValues = {}));
/**
 * @example ccfNotificationSettings()
 * @returns
 */
export function CcfDisplaySettings() {
    const theme = useTheme();
    const twentyFourHourTimeSetting = useSelector(getTwentyFourHourTimeSettings);
    const [twentyFourHourTime, setTwentyFourHourTime] = useState(twentyFourHourTimeSetting || false);
    const panelPopoutSetting = useSelector(getPanelPopoutSettings);
    const pageActionPopoutSetting = useSelector(getPageActionPopoutSettings);
    const [panelPopout, setPanelPopout] = useState(panelPopoutSetting || false);
    //if pageActionPopoutSetting is not set in local storage or AgentClientDataSettings, default to true to match 25.1
    const [pageActionPopout, setPageActionPopout] = useState(pageActionPopoutSetting !== undefined ? pageActionPopoutSetting : true);
    const [translate] = useTranslator();
    const sendonEnterSetting = useSelector(getSendOnEnterSettings);
    const emailSortOrderSetting = useSelector(getEmailMessageSortOrderSettings);
    const [sendWithEnter, setSendWithEnter] = useState(sendonEnterSetting || SendWithEnterValues.ALLCHANNELSEXCEPTEMAIL);
    const expandSoftphoneSetting = useSelector(getExpandSoftphoneSettings);
    const [expandSoftphone, setExpandSoftphone] = useState(expandSoftphoneSetting || false);
    const [emailSortOrder, setEmailSortOrder] = useState(emailSortOrderSetting || EmailMessageSortOrder.OLDEST_ON_TOP);
    const dispatch = useDispatch();
    const isRevampEmailToggleEnabled = isFeatureEnabled("release-cx-agent-Revamped_New_Digital_Email_CMA-AW-28772" /* FeatureToggles.NEW_EMAIL_REVAMP_FEATURE_TOGGLE */);
    const styles = displaySettingStyles(theme, isRevampEmailToggleEnabled);
    const ccfLogger = new CcfLogger('App.consumer', 'CcfDisplaySettings');
    useEffect(() => {
        panelPopoutSetting && LocalStorageHelper.setItem(NotificationSettings.PANEL_POPOUT, panelPopoutSetting);
        pageActionPopoutSetting && LocalStorageHelper.setItem(NotificationSettings.PAGE_ACTION_POPOUT, pageActionPopoutSetting);
        twentyFourHourTimeSetting && LocalStorageHelper.setItem(NotificationSettings.TWENTY_FOUR_HOUR_TIME, twentyFourHourTimeSetting);
        sendonEnterSetting && LocalStorageHelper.setItem(NotificationSettings.SEND_WITH_ENTER, sendonEnterSetting);
        expandSoftphoneSetting && LocalStorageHelper.setItem(NotificationSettings.EXPAND_SOFTPHONE, expandSoftphoneSetting);
    }, [panelPopoutSetting, pageActionPopoutSetting, twentyFourHourTimeSetting, sendonEnterSetting, expandSoftphoneSetting]);
    /**
     *
     * @param event - switch click event
     * @param checked - switch boolean
     * @example handleChange
     */
    const handleChange = (event, checked) => {
        const target = event.target;
        LocalStorageHelper.setItem(target.name, checked);
        switch (target.name) {
            case NotificationSettings.TWENTY_FOUR_HOUR_TIME:
                setTwentyFourHourTime(checked);
                dispatch(updateClientDataSettings({ twentyFourHourTime: checked }));
                break;
            case NotificationSettings.PANEL_POPOUT:
                setPanelPopout(checked);
                dispatch(updateClientDataSettings({ panelPopout: checked }));
                break;
            case NotificationSettings.PAGE_ACTION_POPOUT:
                setPageActionPopout(checked);
                dispatch(updateClientDataSettings({ pageActionPopout: checked }));
                break;
            case NotificationSettings.EXPAND_SOFTPHONE:
                setExpandSoftphone(checked);
                dispatch(updateClientDataSettings({ expandSoftphone: checked }));
                break;
            default:
                break;
        }
    };
    /**
     * Calls when Send With Enter dropdown value changed
     * @param e - select change event
     * @example
     * ```
     * handleSendWithEnterChange(event)
     * ```
     */
    const handleSendWithEnterChange = (e) => {
        var _a;
        const selectedValue = (_a = e === null || e === void 0 ? void 0 : e.target) === null || _a === void 0 ? void 0 : _a.value;
        if (selectedValue) {
            setSendWithEnter(selectedValue);
            LocalStorageHelper.setItem(NotificationSettings.SEND_WITH_ENTER, selectedValue);
            dispatch(updateClientDataSettings({ sendOnEnter: selectedValue }));
        }
    };
    /**
     * Calls when Email Sort Order dropdown value changed
     * @param e - select change event
     * @example
     * ```
     * handleEmailSortOrderChange(event)
     * ```
     */
    const handleEmailSortOrderChange = (e) => {
        var _a;
        const selectedValue = (_a = e === null || e === void 0 ? void 0 : e.target) === null || _a === void 0 ? void 0 : _a.value;
        if (selectedValue) {
            setEmailSortOrder(selectedValue);
            LocalStorageHelper.setItem(NotificationSettings.EMAIL_MESSAGE_SORT_ORDER, selectedValue);
            dispatch(updateClientDataSettings({ emailMessageSortOrder: selectedValue }));
        }
    };
    /**
     *
     * @example populateFromStorate()
     */
    const populateFromStorage = () => {
        SetSwitchHelper(NotificationSettings.TWENTY_FOUR_HOUR_TIME, setTwentyFourHourTime);
        SetSwitchHelper(NotificationSettings.PANEL_POPOUT, setPanelPopout);
        SetSwitchHelper(NotificationSettings.PAGE_ACTION_POPOUT, setPageActionPopout);
        SetSwitchHelper(NotificationSettings.EXPAND_SOFTPHONE, setExpandSoftphone);
    };
    useEffect(() => {
        populateFromStorage();
        return () => {
            ccfLogger.info('Display settings', ' Close');
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    /**
     *
     * @example createSubHeadingData()
     */
    const createSubHeadingData = (heading, rowData) => {
        return { headingHeader: heading, rowsData: rowData };
    };
    /**
     *
     * @example createTableData()
     */
    const createTableData = () => {
        const subHeadingData = [];
        // Top navigation shortcuts
        const topNavData = [
            { name: translate('focusTopNav'), keyCode: 'Alt + T' },
            { name: translate('openHelpPage'), keyCode: 'Ctrl + F2' },
            { name: translate('openNotifications'), keyCode: 'Ctrl + Alt + N' },
            { name: translate('connectAgentLeg'), keyCode: 'Ctrl + Alt + C' },
            { name: translate('focusStates'), keyCode: 'Ctrl + Alt + O' }
        ];
        subHeadingData.push(createSubHeadingData(translate('topNavigationShortcutsHeading'), topNavData));
        // Quick Bar shortcut list
        const quickBar = [
            { name: translate('goHome'), keyCode: 'Ctrl + Shift + H' },
            { name: translate('openInteractionSearch'), keyCode: 'Ctrl + Shift + 1' },
            { name: translate('openQueueCounter'), keyCode: 'Ctrl + Shift + Q' },
            { name: translate('openDirectory'), keyCode: 'Ctrl + Shift + Z' },
            { name: translate('openSchedule'), keyCode: 'Ctrl + Shift + X' },
            { name: translate('openWEM'), keyCode: 'Ctrl + Shift + 2' },
            { name: translate('openSettings'), keyCode: 'Ctrl + Shift + 4' },
            { name: translate('openCustomWorkspace'), keyCode: 'Ctrl + Shift + K' },
            { name: translate('openReporting'), keyCode: 'Ctrl + Shift + 5' },
            { name: translate('openLaunch'), keyCode: 'Ctrl + Shift + 6' },
            { name: translate('openCustomerCard'), keyCode: 'Ctrl + Shift + U' },
            { name: translate('openMultiparty'), keyCode: 'Ctrl + Shift + V' },
            { name: translate('openCoPilot'), keyCode: 'Ctrl + Shift + Y' },
            { name: translate('openQuickResponse'), keyCode: 'Ctrl + Shift + 3' },
            { name: translate('openScreenpop'), keyCode: 'Ctrl + Shift + F' },
            { name: translate('openMore'), keyCode: 'Ctrl + M' }
        ];
        subHeadingData.push(createSubHeadingData(translate('quickBarShortcutsHeading'), quickBar));
        // App space shortcut list
        const appSpace = [
            { name: translate('openCustomerCard'), keyCode: 'Ctrl + Alt + U' },
            { name: translate('openContactHistory'), keyCode: 'Ctrl + Alt + H' },
            { name: translate('openInteractionSearch'), keyCode: 'Ctrl + Alt + 1' },
            { name: translate('openQueueCounter'), keyCode: 'Ctrl + Alt + Q' },
            { name: translate('openDirectory'), keyCode: 'Ctrl + Alt + Z' },
            { name: translate('openSchedule'), keyCode: 'Ctrl + Alt + X' },
            { name: translate('openWEM'), keyCode: 'Ctrl + Alt + 2' },
            { name: translate('openCustomWorkspace'), keyCode: 'Ctrl + Alt + K' },
            { name: translate('openMultiparty'), keyCode: 'Ctrl + Alt + V' },
            { name: translate('openCoPilot'), keyCode: 'Ctrl + Alt + Y' },
            { name: translate('openQuickResponse'), keyCode: 'Ctrl + Alt + 3' },
            { name: translate('openScreenpop'), keyCode: 'Ctrl + Alt + F' },
            { name: translate('openMore'), keyCode: 'Ctrl + Shift + M' }
        ];
        subHeadingData.push(createSubHeadingData(translate('appSpaceShortcutsHeading'), appSpace));
        // Phone control shortcut list
        const phoneControls = [
            { name: translate('acceptIncomingCall'), keyCode: 'Ctrl + Alt + A' },
            { name: translate('rejectIncomingCall'), keyCode: 'Ctrl + Alt + R' },
            { name: translate('call') + ' ' + translate('hold') + '/' + translate('unhold'), keyCode: 'Alt + H' },
            { name: translate('call') + ' ' + translate('mute') + '/' + translate('unmute'), keyCode: 'Alt + M' },
            { name: translate('call') + ' ' + translate('mask') + '/' + translate('unmask'), keyCode: 'Alt + N' },
            { name: translate('call') + ' ' + translate('record'), keyCode: 'Alt + R' },
            { name: translate('open') + ' ' + translate('dialPad'), keyCode: 'Alt + K' },
            { name: translate('goBackToPhone'), keyCode: 'Alt + L' },
            { name: translate('hungup'), keyCode: 'Alt + \\' }
        ];
        subHeadingData.push(createSubHeadingData(translate('phoneControlShortcutsHeading'), phoneControls));
        // General controls
        const generalControls = [
            { name: translate('openOutcomePanel'), keyCode: 'Ctrl + Alt + D' },
            { name: translate('nextTab'), keyCode: `Ctrl + Alt + \u2192 (${translate('rightArrow')})` },
            { name: translate('previousTab'), keyCode: `Ctrl + Alt + \u2190 (${translate('leftArrow')})` },
            { name: translate('switchDigitalInteractions'), keyCode: 'Ctrl + Alt + I' }
        ];
        subHeadingData.push(createSubHeadingData(translate('generalShortcutsHeading'), generalControls));
        return subHeadingData;
    };
    const tableData = createTableData();
    // get the searchParam from the URL to determine if the app is cxa_sfdc
    const searchParams = new URLSearchParams(window.location.search);
    const app = searchParams.get('app') || '';
    const isAutoExpandToggleSettings = isFeatureEnabled("release-cxa-sf-auto-expand-toggle-settings-CRM-16848" /* FeatureToggles.AUTO_EXPAND_TOGGLE_SETTINGS_FEATURE_TOGGLE */);
    return (_jsxs(CcfBox, Object.assign({ sx: styles.mainContainer }, { children: [_jsxs(List, Object.assign({ sx: styles.listHeader, subheader: _jsx(ListSubheader, Object.assign({ sx: styles.displayHeader }, { children: translate('display') })) }, { children: [_jsx(CcfSwitchItem, { handleChange: handleChange, icon: _jsx(AccessTimeIcon, {}), id: 'twentyFourHourTime', isChecked: twentyFourHourTime, name: NotificationSettings.TWENTY_FOUR_HOUR_TIME, text: "twentyFourHourTime", mdWidth: 315 }), _jsx(CcfSwitchItem, { handleChange: handleChange, icon: _jsx(OpenInBrowserIcon, {}), isChecked: panelPopout, name: NotificationSettings.PANEL_POPOUT, text: "panelOpenInBrowserGeneral", mdWidth: 315 }), _jsx(CcfSwitchItem, { handleChange: handleChange, icon: _jsx(OpenInBrowserIcon, {}), isChecked: pageActionPopout, name: NotificationSettings.PAGE_ACTION_POPOUT, text: "panelOpenInBrowserPageAction", mdWidth: 315 }), app === 'cxa_sfdc' && isAutoExpandToggleSettings && (_jsx(CcfSwitchItem, { handleChange: handleChange, icon: _jsx(Expand, {}), id: 'expandSoftphone', isChecked: expandSoftphone, name: NotificationSettings.EXPAND_SOFTPHONE, text: "expandSoftphone", mdWidth: 315 }))] })), isRevampEmailToggleEnabled &&
                _jsx(Box, Object.assign({ sx: styles.emailSortOrderContainer }, { children: _jsxs(Box, Object.assign({ sx: styles.emailSortOrderBox }, { children: [_jsx(CcfEmailSortOrderIcon, { style: Object.assign({}, styles.messageSortIcon), htmlColor: theme.palette.background.paper, viewBox: "0 0 24 24" }), _jsx(InputLabel, Object.assign({ id: "emailMessageSortOrder", style: { marginRight: '3.5rem', marginLeft: '0.45rem' } }, { children: translate('emailMessageSortOrder') })), _jsxs(Select, Object.assign({ labelId: "emailMessageSortOrder", "data-testid": "emailSortOrder", id: "emailSortOrder-select", value: emailSortOrder, onChange: handleEmailSortOrderChange, sx: { width: { xs: '80%', lg: '255px' }, height: '40px' } }, { children: [_jsx(MenuItem, Object.assign({ sx: [styles.menuItem, styles.hoveredElement, styles.focusedElement], value: EmailMessageSortOrder.OLDEST_ON_TOP }, { children: translate('emailMessageSortOrderDesc') })), _jsx(MenuItem, Object.assign({ sx: [styles.menuItem, styles.hoveredElement, styles.focusedElement], value: EmailMessageSortOrder.NEWEST_ON_TOP }, { children: translate('emailMessageSortOrderAsc') }))] }))] })) })), _jsx(Box, Object.assign({ sx: styles.KeyboardBox }, { children: _jsx(CcfTypography, { translationKey: "keyboard", sx: styles.keyShortcutHeading }) })), _jsxs(Box, Object.assign({ sx: styles.sendandshortcutsBox }, { children: [_jsxs(Box, Object.assign({ sx: styles.sendwithEnterBox }, { children: [_jsx(CcfSendWithEnterIcon, { style: { width: '2rem', height: '3rem', paddingTop: '8px' }, htmlColor: theme.palette.background.paper, viewBox: "0 0 24 24" }), _jsx(InputLabel, Object.assign({ id: "sendWithEnter", style: { marginRight: '3.5rem' } }, { children: translate('sendWithEnter') })), _jsxs(Select, Object.assign({ labelId: "sendWithEnter", "data-testid": "sendWithEnter", id: "sendwithenter-select", value: sendWithEnter, onChange: handleSendWithEnterChange, sx: { width: { xs: '80%', lg: '255px' }, height: '40px' } }, { children: [_jsx(MenuItem, Object.assign({ sx: [styles.menuItem, styles.hoveredElement, styles.focusedElement], value: SendWithEnterValues.ALLCHHANELS }, { children: translate(SendWithEnterValues.ALLCHHANELS) })), _jsx(MenuItem, Object.assign({ sx: [styles.menuItem, styles.hoveredElement, styles.focusedElement], value: SendWithEnterValues.ALLCHANNELSEXCEPTEMAIL }, { children: translate(SendWithEnterValues.ALLCHANNELSEXCEPTEMAIL) })), _jsx(MenuItem, Object.assign({ sx: [styles.menuItem, styles.hoveredElement, styles.focusedElement], value: SendWithEnterValues.NOCHANNELS }, { children: translate(SendWithEnterValues.NOCHANNELS) }))] }))] })), _jsxs(Box, Object.assign({ sx: styles.shortcutsBox }, { children: [_jsx(CcfKeyboardIcon, { style: { width: '2rem', height: '2rem', paddingTop: '5px' }, htmlColor: theme.palette.background.paper, viewBox: "0 0 24 24" }), _jsx(InputLabel, Object.assign({ id: "shortcuts-label" }, { children: translate('shortcuts') }))] }))] })), _jsx(TableContainer, Object.assign({ sx: styles.customTableContainer }, { children: _jsxs(Table, Object.assign({ stickyHeader: true, "aria-label": translate('shortcutsTable'), sx: styles.tableStyle }, { children: [_jsx(TableHead, { children: _jsxs(TableRow, Object.assign({ sx: styles.tableHeadRow }, { children: [_jsx(TableCell, Object.assign({ align: "center", sx: { fontWeight: 'bold' } }, { children: translate('actionHeading') })), _jsx(TableCell, Object.assign({ align: "center", sx: { fontWeight: 'bold' } }, { children: translate('shortcutsHeading') }))] })) }), tableData.map((data) => (_jsxs(_Fragment, { children: [_jsx(TableRow, { children: _jsx(TableCell, Object.assign({ colSpan: 2, sx: { fontWeight: 'bold' } }, { children: data.headingHeader })) }, data.headingHeader), data.rowsData.map((row) => (_jsxs(TableRow, Object.assign({ sx: styles.tableBodyRow }, { children: [_jsx(TableCell, { children: row.name }), _jsx(TableCell, { children: row.keyCode })] }), row.name)))] })))] })) }))] })));
}
export default CcfDisplaySettings;
//# sourceMappingURL=ccf-display-settings.js.map