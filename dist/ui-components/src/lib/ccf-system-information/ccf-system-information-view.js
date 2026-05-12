import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { Box, Button, Divider, FormControl, Grid, InputLabel, ListItemText, MenuItem, Select, Typography, useMediaQuery, useTheme } from '@mui/material';
import { LogLevel } from '@nice-devone/core-sdk';
import { CcfDivider, CcfTooltip, CcfTypography, DividerOrientation, DividerVariant, useTranslator } from '@nice-devone/ui-controls';
import ccfSystemInformationStyles from './ccf-system-information-styles';
import dayjs from 'dayjs';
var MemoryStatusEnum;
(function (MemoryStatusEnum) {
    MemoryStatusEnum["normal"] = "normal";
    MemoryStatusEnum["moderate"] = "moderate";
    MemoryStatusEnum["high"] = "high";
    MemoryStatusEnum["critical"] = "critical";
})(MemoryStatusEnum || (MemoryStatusEnum = {}));
/**
 * Presentational component for System Information
 * Receives all data as props, no Redux dependencies
 *
 * @example
 * ```tsx
 * const view = (
 *   <CcfSystemInformationView
 *     sysInfo={systemInfo}
 *     routingInfo={routingInfo}
 *     loggingConfig={LogLevel.ERROR}
 *     networkSpeed={0.5}
 *     isHeapPerformanceReloadToggle={true}
 *     onLoggingConfigChange={handleChange}
 *   />
 * );
 * ```
 */
export function CcfSystemInformationView({ sysInfo, routingInfo, loggingConfig, networkSpeed, isHeapPerformanceReloadToggle, onLoggingConfigChange, theme: propTheme, telemetricInformation, networkLatencyBar, }) {
    const defaultTheme = useTheme();
    const theme = propTheme || defaultTheme;
    const isSmView = useMediaQuery(theme.breakpoints.down('xl'));
    const styles = ccfSystemInformationStyles(theme, isSmView);
    const formattedDate = dayjs().format('ddd MMM DD YYYY h:mm:ss A');
    const [translate] = useTranslator();
    const [isTimerFocused, setIsTimerFocused] = useState(false);
    const [isMemoryFocused, setIsMemoryFocused] = useState(false);
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
    // Memory monitoring state
    const [memoryUsage, setMemoryUsage] = useState(0);
    const [memoryMB, setMemoryMB] = useState(0);
    const [memoryStatus, setMemoryStatus] = useState(MemoryStatusEnum.normal);
    const memoryPollTimer = 5000;
    const memoryThresholds = {
        normal: 200,
        moderate: 400,
        high: 800,
        critical: 1000,
    };
    // Memory monitoring effect
    useEffect(() => {
        /**
         * Update memory usage information
         * @example updateMemoryUsage()
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
     * Handle page refresh when memory usage is high
     * @example handleRefreshPage()
     */
    const handleRefreshPage = () => {
        window.location.reload();
    };
    /**
     * Get memory status color based on current usage
     * @returns Color string for memory status
     * @example getMemoryStatusColor()
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
     * @example getMemoryStatusText()
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
    };
    /**
     * Calls when Logging configuration dropdown value changed
     * @example handleLoggingConfigChange()
     */
    const handleLoggingConfigChange = (e) => {
        const selectedValue = +e.target.value;
        onLoggingConfigChange(selectedValue);
    };
    /**
     * Display network and memory status section
     * @returns React Node for network and memory status
     * @example displayNetworkStatus()
     */
    function displayNetworkStatus() {
        return (_jsxs(Box, { children: [_jsx(CcfTypography, { variant: 'h6', translationKey: 'memoryStatus', sx: Object.assign(Object.assign({}, styles.baseText), styles.infoTitle) }), _jsx(Typography, Object.assign({ sx: Object.assign(Object.assign(Object.assign({}, styles.baseText), styles.gridDate), { color: getMemoryStatusColor() }), onFocus: () => setIsMemoryFocused(true), onBlur: () => setIsMemoryFocused(false), tabIndex: 0 }, (isMemoryFocused && { 'aria-live': 'polite' }), { "data-testid": "memoryStatus" }, { children: `${memoryMB}MB - ${getMemoryStatusText()}` })), _jsxs(Box, Object.assign({ sx: Object.assign({}, styles.sliderContainer) }, { children: [_jsx("span", { children: "0 MB" }), _jsxs("div", Object.assign({ style: { width: '60%', margin: '0 0.5rem' } }, { children: [_jsx(Box, { component: 'input', sx: Object.assign({}, styles.networkSpeed), role: "slider", "aria-label": translate('memoryHeapStatus'), type: "range", min: "0", max: "100", step: "1", value: memoryUsage, "aria-valuemin": 0, "aria-valuemax": 100, "aria-valuenow": Math.round(memoryUsage), readOnly: true }), _jsxs("span", Object.assign({ style: { position: 'relative', left: `${memoryUsage}%`, color: getMemoryStatusColor() } }, { children: [memoryUsage.toFixed(1), "%"] }))] })), _jsx("span", { children: "100%" })] })), (memoryStatus === MemoryStatusEnum.high || memoryStatus === MemoryStatusEnum.critical) && (_jsx(Box, Object.assign({ margin: "0 0 8px 8px" }, { children: _jsx(Button, Object.assign({ variant: "contained", color: memoryStatus === MemoryStatusEnum.critical ? 'error' : 'warning', onClick: handleRefreshPage, size: "small" }, { children: memoryStatus === MemoryStatusEnum.critical ? 'Refresh Page (Critical)' : 'Refresh Page (High Memory)' })) })))] }));
    }
    return (_jsxs("div", { children: [_jsxs(Box, Object.assign({ sx: styles.networkDetailsContainer }, { children: [_jsxs(Box, Object.assign({ sx: styles.networkDetails }, { children: [_jsx(CcfTypography, { variant: 'h6', variantMapping: { 'h6': 'h2' }, translationKey: 'platformConnectionStatus', sx: Object.assign(Object.assign({}, styles.baseText), styles.infoTitle) }), _jsx(Typography, Object.assign({ sx: Object.assign(Object.assign({}, styles.baseText), styles.gridDate), onFocus: () => setIsTimerFocused(true), onBlur: () => setIsTimerFocused(false) }, (isTimerFocused && { 'aria-live': 'polite' }), { "data-testid": "networkTimer" }, { children: formattedDate })), _jsxs(Typography, Object.assign({ sx: Object.assign(Object.assign({}, styles.baseText), styles.gridDate) }, { children: [translate('connectionLatencyLabel'), _jsx(Box, Object.assign({ component: 'span', sx: Object.assign(Object.assign(Object.assign({}, styles.baseText), styles.gridDate), styles.connectionLagTimeLabel) }, { children: ` ${networkSpeed.toFixed(2)} ${translate('seconds')}` }))] }))] })), networkLatencyBar] })), _jsx(Divider, { orientation: DividerOrientation.HORIZONTAL, variant: DividerVariant.FULLWIDTH }), (isHeapPerformanceReloadToggle) && (displayNetworkStatus()), _jsx(Divider, { orientation: DividerOrientation.HORIZONTAL, variant: DividerVariant.FULLWIDTH }), telemetricInformation, _jsx(Grid, Object.assign({ container: true, lg: 12, style: styles.gridContainer }, { children: Object.keys(sysInfo).map((field) => (_jsxs(Grid, Object.assign({ item: true, sm: 4, style: styles.gridCell }, { children: [_jsx(Typography, Object.assign({ sx: Object.assign(Object.assign({}, styles.baseText), styles.infoTitle) }, { children: field === 'version' ? `${translate(field)} ${versionName}` : translate(field) })), _jsx(Typography, Object.assign({ sx: Object.assign(Object.assign({}, styles.baseText), styles.infoValue) }, { children: sysInfo[field] }))] }), field))) })), _jsx(Divider, { orientation: DividerOrientation.HORIZONTAL, variant: DividerVariant.FULLWIDTH }), _jsx(Grid, Object.assign({ item: true, style: { position: 'relative' } }, { children: _jsx(CcfTypography, { variant: 'h6', variantMapping: { 'h6': 'h2' }, translationKey: 'interactionRouting', sx: Object.assign(Object.assign({}, styles.baseText), styles.gridSubHeader) }) })), _jsx(Grid, Object.assign({ container: true, lg: 12, style: styles.gridContainer }, { children: Object.keys(routingInfo).map((field) => (_jsxs(Grid, Object.assign({ item: true, sm: 4, style: styles.gridCell }, { children: [_jsx(CcfTypography, { translationKey: field, sx: Object.assign(Object.assign({}, styles.baseText), styles.infoTitle) }), (field === 'contactLimit' && routingInfo[field]) &&
                            _jsx(Box, Object.assign({ sx: Object.assign({}, styles.subGrid) }, { children: Object.entries(routingInfo[field]).map((valObj) => {
                                    return (_jsx(CcfTooltip, Object.assign({ arrow: true, title: translate(valObj[0]) }, { children: _jsx(Typography, Object.assign({ sx: Object.assign(Object.assign({}, styles.baseText), styles.limitValue) }, { children: valObj[1] })) }), valObj[0]));
                                }) })), (field !== 'contactLimit') &&
                            _jsx(Typography, Object.assign({ sx: Object.assign(Object.assign({}, styles.baseText), styles.infoValue) }, { children: routingInfo[field] }))] }), field))) })), _jsx(CcfDivider, { orientation: DividerOrientation.HORIZONTAL, variant: DividerVariant.FULLWIDTH }), _jsx(CcfTypography, { variant: 'h6', variantMapping: { 'h6': 'h2' }, translationKey: 'loggingConfiguration', sx: Object.assign(Object.assign({}, styles.baseText), styles.gridSubHeader) }), _jsx(Grid, Object.assign({ container: true, direction: "row", alignItems: "center", sx: Object.assign(Object.assign({}, styles.loggingContainer), styles.loggingContainer) }, { children: _jsxs(FormControl, Object.assign({ sx: { m: 1, minWidth: 200 } }, { children: [_jsx(InputLabel, Object.assign({ id: "log-level" }, { children: translate('logLevel') })), _jsx(Select, Object.assign({ labelId: "log-level", id: "log-level-select", label: translate('logLevel'), value: loggingConfig, onChange: handleLoggingConfigChange, "aria-label": translate('logLevel'), "aria-haspopup": "true" }, { children: loggingOptions.map((option) => (_jsx(MenuItem, Object.assign({ sx: styles.menuItem, value: option.value, role: "option", "aria-selected": option.value === loggingConfig, "aria-label": option.label }, { children: _jsx(ListItemText, { primary: option.label }) }), option.label))) }))] })) }))] }));
}
export default CcfSystemInformationView;
//# sourceMappingURL=ccf-system-information-view.js.map