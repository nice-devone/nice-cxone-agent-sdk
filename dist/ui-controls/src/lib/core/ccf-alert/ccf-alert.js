import { __rest } from "tslib";
import { jsx as _jsx } from "react/jsx-runtime";
import { Alert, IconButton, useTheme } from '@mui/material';
import { CcfOutcomeResolveIcon } from '../../icons/ccf-outcome-resolve-icon/ccf-outcome-resolve-icon';
import { CcfCloseIcon } from '../../icons/ccf-close-icon/ccf-close-icon';
import ccfAlertStyle from './ccf-alert.styles';
import { useEffect } from 'react';
/**
 * Function is sed as wrapper for material UI alert component
 * @param param0 -CcfAlertProps
 * @returns material ui alert component
 * @example <CcfAlert/>
 */
export function CcfAlert(_a) {
    var { closeAlert, children, severity, variant, autoHideDuration, sx } = _a, other = __rest(_a, ["closeAlert", "children", "severity", "variant", "autoHideDuration", "sx"]);
    const theme = useTheme();
    const alertStyle = ccfAlertStyle(theme);
    useEffect(() => {
        if (autoHideDuration) {
            setTimeout(() => {
                closeAlert();
            }, autoHideDuration);
        }
    }, []);
    return (_jsx(Alert, Object.assign({}, other, { variant: variant ? variant : 'filled', severity: severity ? severity : 'success', sx: Object.assign(Object.assign({}, alertStyle.successToast), sx), iconMapping: { success: _jsx(CcfOutcomeResolveIcon, { sx: alertStyle.successTick, fontSize: "inherit" }) }, action: _jsx(IconButton, Object.assign({ "aria-label": "close", color: "inherit", size: "small", onClick: closeAlert }, { children: _jsx(CcfCloseIcon, { sx: alertStyle.closeIcon }) })) }, { children: children })));
}
export default CcfAlert;
//# sourceMappingURL=ccf-alert.js.map