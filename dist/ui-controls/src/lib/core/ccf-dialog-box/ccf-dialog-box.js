import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText, Box, } from '@mui/material';
import { CcfButton } from '../../core/ccf-button/ccf-button';
import { CcfCloseIcon } from '../../icons/ccf-close-icon/ccf-close-icon';
import { CcfTypography } from '../ccf-typography/ccf-typography';
import CcfDialogBoxStyles from './ccf-dialog-box-styles';
/**
 * Component used to display dialog box
 * @param param0 - CcfDialogBoxProps
 * @example <CCfDialogBox />
 * @returns dialog box
 */
export function CcfDialogBox({ isOpen, handleOnClickOfHeaderCloseButton, handleOnClose, children, title, primaryButtonText, secondaryButtonText, primaryButtonProps = {}, secondaryButtonProps = {}, dialogTitleProps = {}, dialogContentProps = {}, component, dividers = true, showTitle = true, showCloseButton = true, }) {
    const content = component !== null && component !== void 0 ? component : _jsx(DialogContentText, Object.assign({}, dialogContentProps, { children: children }));
    const styles = CcfDialogBoxStyles();
    return (_jsx(Box, { children: _jsxs(Dialog, Object.assign({ open: isOpen, onClose: handleOnClose, scroll: "paper", "aria-labelledby": "scroll-dialog-title", "aria-describedby": "scroll-dialog-description", fullWidth: true }, { children: [showTitle && _jsxs(DialogTitle, Object.assign({ id: "scroll-dialog-title", sx: styles.ccfDialogHeader }, { children: [_jsx(CcfTypography, Object.assign({ sx: styles.ccfDialogHeaderTitle }, dialogTitleProps, { children: title })), showCloseButton && _jsx(CcfButton, Object.assign({ sx: styles.ccfDialogHeaderClose, onClick: handleOnClickOfHeaderCloseButton }, { children: _jsx(CcfCloseIcon, { viewBox: "0 0 20 20" }) }))] })), _jsx(DialogContent, Object.assign({ dividers: dividers }, { children: content })), _jsxs(DialogActions, { children: [secondaryButtonText && (_jsx(CcfButton, Object.assign({}, secondaryButtonProps, { children: secondaryButtonText }))), _jsx(CcfButton, Object.assign({}, primaryButtonProps, { primary: true }, { children: primaryButtonText }))] })] })) }));
}
export default CcfDialogBox;
//# sourceMappingURL=ccf-dialog-box.js.map