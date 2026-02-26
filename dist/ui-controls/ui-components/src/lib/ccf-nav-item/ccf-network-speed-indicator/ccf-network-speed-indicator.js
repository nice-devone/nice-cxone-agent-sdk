import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useTranslator } from '@nice-devone/ui-controls';
import { useSelector } from 'react-redux';
import { useTheme, Box } from '@mui/material';
import { getNetworkSpeed } from '../../ccf-system-information/ccf-system-information.slice';
import { ccfNetworkSpeedIndicatorStyles } from './ccf-network-speed-indicator.styles';
/**
 * Used to add tooltip to Navigation menu - Settings
 * @example `<CcfNetworkSpeedIndicator />`
 */
export const CcfNetworkSpeedIndicator = () => {
    const [translate] = useTranslator();
    const theme = useTheme();
    const styles = ccfNetworkSpeedIndicatorStyles(theme);
    const networkSpeed = useSelector(getNetworkSpeed);
    return (_jsxs(Box, Object.assign({ sx: { backgroundColor: theme.palette.background.paper } }, { children: [_jsx(Box, Object.assign({ component: 'div', sx: styles.networkStatusLabel }, { children: translate('networkstatus') })), _jsx(Box, { component: 'input', sx: styles.networkSpeed, type: "range", min: "0", max: "4", step: "0.04", value: networkSpeed })] })));
};
//# sourceMappingURL=ccf-network-speed-indicator.js.map