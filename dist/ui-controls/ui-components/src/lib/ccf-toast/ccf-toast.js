import { jsx as _jsx } from "react/jsx-runtime";
import { IconButton, Snackbar, useTheme } from '@mui/material';
import { CcfOutcomeResolveIcon } from '@nice-devone/ui-controls';
import Alert from '@mui/material/Alert';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from 'react-redux';
import { updateIsQReplySent } from '../ccf-app-space/ccf-app-space.slice';
import ccfToastStyles from './ccf-toast.styles';
/**
 * Used to show Toast messages for the application
 * @param props -?- CcfToastProps
 * @example - `<CcfToast {...props}/>`
 */
export function CcfToast(props) {
    const dispatch = useDispatch();
    const vertical = 'bottom';
    const horizontal = 'right';
    const theme = useTheme();
    const toastStyles = ccfToastStyles(theme);
    /**
     * used to close toast message
     * @param event -?-React.SyntheticEvent
     * @param reason - string
     * @example `<handleClose />`
     */
    const handleClose = (_event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(updateIsQReplySent(false));
    };
    return (_jsx(Snackbar, Object.assign({ autoHideDuration: 6000, anchorOrigin: { vertical, horizontal }, open: props.open, onClose: handleClose, TransitionProps: {}, "data-testid": 'snackbar' }, { children: _jsx(Alert, Object.assign({ variant: "filled", severity: "success", iconMapping: { success: _jsx(CcfOutcomeResolveIcon, { sx: toastStyles.successTick, fontSize: "inherit" }) }, action: _jsx(IconButton, Object.assign({ "aria-label": "close", color: "inherit", size: "small", onClick: () => {
                    dispatch(updateIsQReplySent(false));
                }, "data-testid": 'icon-button' }, { children: _jsx(CloseIcon, { fontSize: "inherit" }) })), sx: toastStyles.successAlertToast }, { children: props.message })) }), vertical + horizontal));
}
export default CcfToast;
//# sourceMappingURL=ccf-toast.js.map