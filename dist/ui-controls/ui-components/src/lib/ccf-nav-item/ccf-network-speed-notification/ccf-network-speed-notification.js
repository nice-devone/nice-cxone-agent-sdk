import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useSelector } from 'react-redux';
import { useTheme } from '@mui/material';
import { getNetworkSpeed } from '../../ccf-system-information/ccf-system-information.slice';
import { ccfNetworkSpeedNotificationStyles } from './ccf-network-speed-notification.styles';
import WarningIcon from '@mui/icons-material/Warning';
import CancelIcon from '@mui/icons-material/Cancel';
/**
 * Used to add warning icon in the settings Nav Menu - when network speed is reduced
 * @example `<CcfNetworkSpeedNotification />`
 */
export const CcfNetworkSpeedNotification = () => {
    const theme = useTheme();
    const styles = ccfNetworkSpeedNotificationStyles(theme);
    const networkSpeed = useSelector(getNetworkSpeed);
    return (_jsxs(_Fragment, { children: [networkSpeed > 2 && networkSpeed <= 4
                && _jsx(WarningIcon, { sx: [styles.sidebarItemNetworkInformation, styles.sidebarItemNetworkInformationWarning] }), networkSpeed > 4 &&
                _jsx(CancelIcon, { sx: [styles.sidebarItemNetworkInformation, styles.sidebarItemNetworkInformationDanger] })] }));
};
//# sourceMappingURL=ccf-network-speed-notification.js.map