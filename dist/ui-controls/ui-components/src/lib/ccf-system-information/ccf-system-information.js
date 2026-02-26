import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { browserName, browserVersion } from 'react-device-detect';
import { Box, Divider, FormControl, Grid, InputLabel, ListItemText, MenuItem, Select, Typography, useMediaQuery, useTheme, Button } from '@mui/material';
import { LocalStorageHelper, LogLevel, Logger, StorageKeys } from '@nice-devone/core-sdk';
import { CcfDivider, CcfTooltip, CcfTypography, DividerOrientation, DividerVariant, useTranslator } from '@nice-devone/ui-controls';
import { getAgentSessionInfo } from '../ccf-acd-session/ccf-acd-session.slice';
import { getmchSettings } from '../ccf-agent-setting/ccf-agent-setting-slice';
import { getAgentLegId } from '../ccf-assignment-panel/ccf-assignment-panel.slice';
import ccfSystemInformationStyles from './ccf-system-information-styles';
import { currentUserTeamName, userInfoSelector } from '../ccf-agent-state/ccf-agent-state.slice';
import { getNetworkSpeed } from './ccf-system-information.slice';
import { CcfTelemetricInformation } from '../ccf-telemetric-information/ccf-telemetric-information';
import { getLoggingLevelSettings, updateClientDataSettings } from '../ccf-settings/ccf-full-settings.slice';
import { CcfNetworkLatencyBar } from '../ccf-network-latencybar/ccf-network-latencybar';
import dayjs from 'dayjs';
import { FeatureToggleService } from '@nice-devone/agent-sdk';
;
;
var MemoryStatusEnum;
(function (MemoryStatusEnum) {
    MemoryStatusEnum["normal"] = "normal";
    MemoryStatusEnum["moderate"] = "moderate";
    MemoryStatusEnum["high"] = "high";
    MemoryStatusEnum["critical"] = "critical";
})(MemoryStatusEnum || (MemoryStatusEnum = {}));
;
/**
 * Component to display System Information in Settings
 *
 * @example - <CcfSystemInformation />
 * @returns
 */
export function CcfSystemInformation() {
    const theme = useTheme();
    const isSmView = useMediaQuery(theme.breakpoints.down('xl'));
    const styles = ccfSystemInformationStyles(theme, isSmView);
    const userInfo = useSelector(userInfoSelector);
    const mchSetting = useSelector(getmchSettings);
    const agentSessionInfo = useSelector(getAgentSessionInfo);
    const agentLegId = useSelector(getAgentLegId);
    const networkSpeed = useSelector(getNetworkSpeed);
    const teamName = useSelector(currentUserTeamName);
    const [sysInfo, setSysInfo] = useState({});
    const [routingInfo, setRoutingInfo] = useState({});
    const formattedDate = dayjs().format('ddd MMM DD YYYY h:mm:ss A');
    const [translate] = useTranslator();
    const dispatch = useDispatch();
    const loggingLevel = useSelector(getLoggingLevelSettings);
    const [isTimerFocused, setIsTimerFocused] = useState(false);
    const isHeapPerformanceReloadToggle = FeatureToggleService.instance.getFeatureToggleSync("release-cx-agent-heap-performance-reload-AW-46709" /* FeatureToggles.HEAP_PERFORMANCE_RELOAD_TOGGLE */);
    // Memory monitoring state
    const [memoryUsage, setMemoryUsage] = useState(0); // Memory usage percentage (0-100)
    const [memoryMB, setMemoryMB] = useState(0); // Actual memory in MB
    const [memoryStatus, setMemoryStatus] = useState(MemoryStatusEnum.normal);
    const [isMemoryFocused, setIsMemoryFocused] = useState(false);
    const memoryPollTimer = 5000; // Polling interval for memory usage in milliseconds
    const memoryThresholds = {
        normal: 200,
        moderate: 400,
        high: 800,
        critical: 1000,
    };
    const fetchBranchNameFromPipeline = process.env.NX_BRANCH_NAME;
    const versionName = fetchBranchNameFromPipeline ? fetchBranchNameFromPipeline : '';
    const loggingOptions = [
        { label: 'Trace', value: LogLevel.TRACE },
        { label: 'Debug', value: LogLevel.DEBUG },
        { label: 'Info', value: LogLevel.INFO },
        { label: 'Warn', value: LogLevel.WARN },
        { label: 'Error', value: LogLevel.ERROR },
        { label: 'Fatal', value: LogLevel.FATAL },
        { label: 'Off', value: LogLevel.OFF }
    ];
    const [loggingConfig, setLoggingConfig] = useState(Logger.config.getLevel() || LogLevel.ERROR);
    useEffect(() => {
        setSysInfo(getSystemInformation());
        setRoutingInfo(getInteractionRoutingInfo());
    }, [agentSessionInfo, userInfo, agentLegId, teamName, mchSetting]);
    useEffect(() => {
        if (loggingLevel !== undefined && loggingLevel !== null) {
            setLoggingConfig(loggingLevel);
            Logger.config.setLevel(loggingLevel);
        }
    }, [loggingLevel]);
    // Memory monitoring effect
    useEffect(() => {
        /**
         * Update memory usage information
         * @example updateMemoryUsage() // Updates memory state with current heap usage
         */
        const updateMemoryUsage = () => {
            const performanceMemory = performance.memory;
            if (performanceMemory) {
                const currentMemoryMB = Math.round(performanceMemory.usedJSHeapSize / 1024 / 1024);
                const limitMemoryMB = Math.round(performanceMemory.jsHeapSizeLimit / 1024 / 1024);
                const usagePercentage = Math.min((currentMemoryMB / limitMemoryMB) * 100, 100);
                setMemoryMB(currentMemoryMB);
                setMemoryUsage(usagePercentage);
                // Determine memory status based on usage
                if (currentMemoryMB > memoryThresholds.critical) {
                    setMemoryStatus(MemoryStatusEnum.critical);
                }
                else if (currentMemoryMB > memoryThresholds.high) {
                    setMemoryStatus(MemoryStatusEnum.high);
                }
                else if (currentMemoryMB > memoryThresholds.moderate) {
                    setMemoryStatus(MemoryStatusEnum.moderate);
                }
                else {
                    setMemoryStatus(MemoryStatusEnum.normal);
                }
            }
        };
        // Update memory usage immediately and then every 5 seconds
        updateMemoryUsage();
        const memoryInterval = setInterval(updateMemoryUsage, memoryPollTimer);
        return () => clearInterval(memoryInterval);
    }, []);
    /**
     * Method to get the system information
     * @returns system information object
     * @example - getSystemInformation()
     */
    const getSystemInformation = useCallback(() => {
        const browserInfo = window.navigator;
        const agentSettingFromStorage = LocalStorageHelper.getItem(StorageKeys.AGENT_SETTINGS, true);
        const systemInformation = {
            agentName: `${userInfo.firstName} ${userInfo.lastName}`,
            displayedUsername: userInfo.userName,
            agentId: userInfo.icAgentId,
            version: agentSettingFromStorage.cxaClientVersion,
            stationId: agentSessionInfo.stationId !== '0' ? agentSessionInfo.stationId : 'N/A',
            sessionId: agentSessionInfo.sessionId,
            phoneNumber: agentSessionInfo.stationPhoneNumber,
            agentLegId: agentLegId ? agentLegId : 'N/A',
            callerId: agentSessionInfo.stationCallerId,
            browserVersion: `${browserName} ${browserVersion}`,
            webServer: '--',
            virtualCluster: agentSessionInfo.vcHost,
            browserLanguage: browserInfo.language,
            browserLocalization: browserInfo.language,
            teamName: teamName,
        };
        /**
       * Method to dynamically update the value in system information if provided entry is there in local storage.
       * @returns either a value or nothing
       * @example - isSessionInitializedThroughACS()
       */
        const isSessionInitializedThroughACS = () => {
            var _a;
            const acsEmailIdValue = (_a = LocalStorageHelper.getItem(StorageKeys.ACS_EMAIL_ID)) !== null && _a !== void 0 ? _a : '';
            if (acsEmailIdValue && (acsEmailIdValue === null || acsEmailIdValue === void 0 ? void 0 : acsEmailIdValue.length) > 1) {
                systemInformation['acsEmailID'] = acsEmailIdValue;
            }
        };
        isSessionInitializedThroughACS();
        return systemInformation;
    }, [userInfo, agentSessionInfo, agentLegId, teamName]);
    /**
     * Method to get the routing information
     * @returns system information object
     * @example - getInteractionRoutingInfo()
     */
    const getInteractionRoutingInfo = useCallback(() => {
        const businessUnitFromStorage = LocalStorageHelper.getItem(StorageKeys.BUSINESS_UNIT, true);
        const isMultiContactBU = businessUnitFromStorage.isMultiContactHandling;
        const interactionRoutingInfo = {
            contactLimit: {
                voiceLimit: `${mchSetting.voiceThreshold} ${(mchSetting.voiceThreshold === 1) ? translate('call') : translate('calls')},`,
                digitalLimit: `${mchSetting.digitalThreshold} ${translate('digital')}`,
            },
            totalLimit: mchSetting.totalContactCount,
            routing: isMultiContactBU ? 'Omni' : 'Single',
            reqContact: mchSetting.requestContact ? 'Enabled' : 'Disabled',
            contactAutoFocus: mchSetting.contactAutoFocus ? 'Enabled' : 'Disabled',
        };
        return interactionRoutingInfo;
    }, [mchSetting]);
    /**
     * Calls when Logging configuration dropdown value changed
     * @example handleLoggingConfigChange()
     */
    const handleLoggingConfigChange = (e) => {
        const selectedValue = +e.target.value;
        setLoggingConfig(selectedValue);
        Logger.config.setLevel(selectedValue);
        LocalStorageHelper.setItem(StorageKeys.LOGGING_LEVEL, selectedValue);
        dispatch(updateClientDataSettings({ loggingLevel: selectedValue }));
    };
    /**
     * Handle page refresh when memory usage is high
     * @example handleRefreshPage()
     */
    const handleRefreshPage = () => {
        window.location.reload();
    };
    /**
     * Get memory status color based on current usage
     * @returns Color string for memory status
     * @example getMemoryStatusColor() // Returns color code based on memory status
     */
    const getMemoryStatusColor = () => {
        switch (memoryStatus) {
            case MemoryStatusEnum.critical:
                return theme.palette.agentState.unavailable;
            case MemoryStatusEnum.high:
                return theme.palette.agentState.unavailable;
            case MemoryStatusEnum.moderate:
                return theme.palette.agentState.working;
            default:
                return theme.palette.agentState.available;
        }
    };
    /**
     * Get memory status text
     * @returns Status text for memory usage
     * @example getMemoryStatusText() // Returns 'Critical' for critical status
     */
    const getMemoryStatusText = () => {
        switch (memoryStatus) {
            case MemoryStatusEnum.critical:
                return 'Critical';
            case MemoryStatusEnum.high:
                return 'High';
            case MemoryStatusEnum.moderate:
                return 'Moderate';
            default:
                return 'Normal';
        }
        ;
    };
    /**
     * Display network and memory status section
     * @returns React Node for network and memory status
     * @example displayNetworkStatus() // Renders network and memory status UI
     */
    function displayNetworkStatus() {
        return (_jsxs(Box, { children: [_jsx(CcfTypography, { variant: 'h6', translationKey: 'memoryStatus', sx: Object.assign(Object.assign({}, styles.baseText), styles.infoTitle) }), _jsx(Typography, Object.assign({ sx: Object.assign(Object.assign(Object.assign({}, styles.baseText), styles.gridDate), { color: getMemoryStatusColor() }), onFocus: () => setIsMemoryFocused(true), onBlur: () => setIsMemoryFocused(false), tabIndex: 0 }, (isMemoryFocused && { 'aria-live': 'polite' }), { "data-testid": "memoryStatus" }, { children: `${memoryMB}MB - ${getMemoryStatusText()}` })), _jsxs(Box, Object.assign({ sx: Object.assign({}, styles.sliderContainer) }, { children: [_jsx("span", { children: "0 MB" }), _jsxs("div", Object.assign({ style: { width: '60%', margin: '0 0.5rem' } }, { children: [_jsx(Box, { component: 'input', sx: Object.assign({}, styles.networkSpeed), role: "slider", "aria-label": translate('memoryHeapStatus'), type: "range", min: "0", max: "100", step: "1", value: memoryUsage, "aria-valuemin": 0, "aria-valuemax": 100, "aria-valuenow": Math.round(memoryUsage), readOnly: true }), _jsxs("span", Object.assign({ style: { position: 'relative', left: `${memoryUsage}%`, color: getMemoryStatusColor() } }, { children: [memoryUsage.toFixed(1), "%"] }))] })), _jsx("span", { children: "100%" })] })), (memoryStatus === MemoryStatusEnum.high || memoryStatus === MemoryStatusEnum.critical) && (_jsx(Box, Object.assign({ margin: "0 0 8px 8px" }, { children: _jsx(Button, Object.assign({ variant: "contained", color: memoryStatus === MemoryStatusEnum.critical ? 'error' : 'warning', onClick: handleRefreshPage, size: "small" }, { children: memoryStatus === MemoryStatusEnum.critical ? 'Refresh Page (Critical)' : 'Refresh Page (High Memory)' })) })))] }));
    }
    return (_jsxs("div", { children: [_jsxs(Box, Object.assign({ sx: styles.networkDetailsContainer }, { children: [_jsxs(Box, Object.assign({ sx: styles.networkDetails }, { children: [_jsx(CcfTypography, { variant: 'h6', translationKey: 'platformConnectionStatus', sx: Object.assign(Object.assign({}, styles.baseText), styles.infoTitle) }), _jsx(Typography, Object.assign({ sx: Object.assign(Object.assign({}, styles.baseText), styles.gridDate), onFocus: () => setIsTimerFocused(true), onBlur: () => setIsTimerFocused(false) }, (isTimerFocused && { 'aria-live': 'polite' }), { "data-testid": "networkTimer" }, { children: formattedDate })), _jsxs(Typography, Object.assign({ sx: Object.assign(Object.assign({}, styles.baseText), styles.gridDate) }, { children: [translate('connectionLatencyLabel'), _jsx(Box, Object.assign({ component: 'span', sx: Object.assign(Object.assign(Object.assign({}, styles.baseText), styles.gridDate), styles.connectionLagTimeLabel) }, { children: ` ${networkSpeed.toFixed(2)} ${translate('seconds')}` }))] }))] })), _jsx(CcfNetworkLatencyBar, { networkSpeed: networkSpeed })] })), _jsx(Divider, { orientation: DividerOrientation.HORIZONTAL, variant: DividerVariant.FULLWIDTH }), (isHeapPerformanceReloadToggle) && (displayNetworkStatus()), _jsx(Divider, { orientation: DividerOrientation.HORIZONTAL, variant: DividerVariant.FULLWIDTH }), _jsx(CcfTelemetricInformation, {}), _jsx(Grid, Object.assign({ container: true, lg: 12, style: styles.gridContainer }, { children: Object.keys(sysInfo).map((field) => (_jsxs(Grid, Object.assign({ item: true, sm: 4, style: styles.gridCell }, { children: [_jsx(Typography, Object.assign({ sx: Object.assign(Object.assign({}, styles.baseText), styles.infoTitle) }, { children: field === 'version' ? `${translate(field)} ${versionName}` : translate(field) })), _jsx(Typography, Object.assign({ sx: Object.assign(Object.assign({}, styles.baseText), styles.infoValue) }, { children: sysInfo[field] }))] }), field))) })), _jsx(Divider, { orientation: DividerOrientation.HORIZONTAL, variant: DividerVariant.FULLWIDTH }), _jsx(Grid, Object.assign({ item: true, style: { position: 'relative' } }, { children: _jsx(CcfTypography, { variant: 'h6', translationKey: 'interactionRouting', sx: Object.assign(Object.assign({}, styles.baseText), styles.gridSubHeader) }) })), _jsx(Grid, Object.assign({ container: true, lg: 12, style: styles.gridContainer }, { children: Object.keys(routingInfo).map((field) => (_jsxs(Grid, Object.assign({ item: true, sm: 4, style: styles.gridCell }, { children: [_jsx(CcfTypography, { translationKey: field, sx: Object.assign(Object.assign({}, styles.baseText), styles.infoTitle) }), (field === 'contactLimit' && routingInfo[field]) &&
                            _jsx(Box, Object.assign({ sx: Object.assign({}, styles.subGrid) }, { children: Object.entries(routingInfo[field]).map((valObj) => {
                                    return (_jsx(CcfTooltip, Object.assign({ arrow: true, title: translate(valObj[0]) }, { children: _jsx(Typography, Object.assign({ sx: Object.assign(Object.assign({}, styles.baseText), styles.limitValue) }, { children: valObj[1] })) }), valObj[0]));
                                }) })), (field !== 'contactLimit') &&
                            _jsx(Typography, Object.assign({ sx: Object.assign(Object.assign({}, styles.baseText), styles.infoValue) }, { children: routingInfo[field] }))] }), field))) })), _jsx(CcfDivider, { orientation: DividerOrientation.HORIZONTAL, variant: DividerVariant.FULLWIDTH }), _jsx(CcfTypography, { translationKey: 'loggingConfiguration', sx: Object.assign(Object.assign({}, styles.baseText), styles.gridSubHeader) }), _jsx(Grid, Object.assign({ container: true, direction: "row", alignItems: "center", sx: Object.assign(Object.assign({}, styles.loggingContainer), styles.loggingContainer) }, { children: _jsxs(FormControl, Object.assign({ sx: { m: 1, minWidth: 200 } }, { children: [_jsx(InputLabel, Object.assign({ id: "log-level" }, { children: translate('logLevel') })), _jsx(Select, Object.assign({ labelId: "log-level", id: "log-level-select", label: translate('logLevel'), value: loggingConfig, onChange: handleLoggingConfigChange, "aria-label": translate('logLevel'), "aria-haspopup": "true" }, { children: loggingOptions.map((option) => (_jsx(MenuItem, Object.assign({ sx: styles.menuItem, value: option.value, role: "option", "aria-selected": option.value === loggingConfig, "aria-label": option.label }, { children: _jsx(ListItemText, { primary: option.label }) }), option.label))) }))] })) }))] }));
}
export default CcfSystemInformation;
//# sourceMappingURL=ccf-system-information.js.map