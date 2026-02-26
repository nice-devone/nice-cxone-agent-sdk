import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
/**
 * Component displays warning pop over
 * @returns agent advance workflow execution warning pop over
 * @example <CcfADWEWarningPopOver />
 */
const CcfEnhancedWEWarningPopOver = ({ open, onClose, onConfirm, message, title, button1Title, button2Title }) => {
    return (_jsxs(Dialog, Object.assign({ open: open, onClose: onClose, "aria-labelledby": "centered-dialog-title", "aria-describedby": "centered-dialog-description", PaperProps: {
            style: { textAlign: 'center' },
        } }, { children: [_jsx(DialogTitle, Object.assign({ id: "centered-dialog-title" }, { children: title })), _jsx(DialogContent, { children: _jsx(DialogContentText, Object.assign({ id: "centered-dialog-description" }, { children: message })) }), _jsxs(DialogActions, Object.assign({ style: { justifyContent: 'center' } }, { children: [_jsx(Button, Object.assign({ onClick: onClose, color: "secondary", variant: "outlined" }, { children: button1Title })), _jsx(Button, Object.assign({ onClick: onConfirm, color: "primary", variant: "contained" }, { children: button2Title }))] }))] })));
};
export default CcfEnhancedWEWarningPopOver;
//# sourceMappingURL=ccf-enhanced-workflow-popover.js.map