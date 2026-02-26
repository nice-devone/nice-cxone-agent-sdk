import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { ccfNetworkLatencyBarStyles } from './ccf-network-latencybar.style';
import { useEffect, useRef, useState } from 'react';
import { useTranslator } from '@nice-devone/ui-controls';
/**
 * Renders the Network latencybar component
 * @param networkSpeed - number representing current latency in seconds
 * @example <CcfNetworkLatencyBar />
 * @returns Network latencybar component
 */
export const CcfNetworkLatencyBar = (props) => {
    const theme = useTheme();
    const isSmView = useMediaQuery(theme.breakpoints.down('xl'));
    const styles = ccfNetworkLatencyBarStyles(theme, isSmView);
    const [translate] = useTranslator();
    const barRef = useRef(null);
    const [markerLeft, setMarkerLeft] = useState('0');
    const min = 0;
    const max = 4;
    // constrain networkSpeed within min and max
    const clampedSpeed = Math.max(min, Math.min(props.networkSpeed, max));
    useEffect(() => {
        var _a;
        // Calculate marker position based on clampedSpeed
        if (barRef.current) {
            const barWidth = (_a = barRef === null || barRef === void 0 ? void 0 : barRef.current) === null || _a === void 0 ? void 0 : _a.offsetWidth;
            const percentage = (clampedSpeed / max);
            const leftPos = percentage * barWidth;
            setMarkerLeft(`${leftPos}px`);
        }
    }, [props.networkSpeed]);
    return (_jsxs(Box, Object.assign({ "aria-hidden": "true", sx: Object.assign({}, styles.sliderContainer) }, { children: [_jsx(Typography, Object.assign({ variant: "caption", sx: styles.latencyBarLabel }, { children: translate('connectionLatency') })), _jsxs(Box, Object.assign({ sx: styles.latencyBarAndMarkerContainer }, { children: [_jsx(Typography, Object.assign({ variant: "body2", sx: styles.latencyFont }, { children: min })), _jsxs(Box, Object.assign({ role: 'img', sx: Object.assign({}, styles.barWrapper) }, { children: [_jsx(Box, { sx: styles.latencyBar, ref: barRef }), _jsxs(Box, Object.assign({ sx: Object.assign(Object.assign({}, styles.currentLatency), { left: markerLeft }), "aria-hidden": "true" }, { children: [_jsx(Box, { style: styles.triangleMarker }), _jsx(Box, Object.assign({ style: styles.currentLatencyValue }, { children: clampedSpeed.toFixed(2) }))] }))] })), _jsx(Typography, Object.assign({ variant: "body2", sx: styles.latencyFont }, { children: max.toFixed(2) }))] }))] })));
};
//# sourceMappingURL=ccf-network-latencybar.js.map