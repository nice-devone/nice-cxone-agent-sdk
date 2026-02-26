import { jsx as _jsx } from "react/jsx-runtime";
import { Popover, useTheme } from '@mui/material';
import CcfCustomPopOverStyles from './ccf-custom-popOver.styles';
/**
 * component to display any children component in popover
 * @param param0 - CcfPopOverWrapperProps
 * @example <CcfCustomPopOver>
 */
export function CcfCustomPopOver({ id, open, anchorEl, onClose, popoverMaxWidth, children, ariaLabelledBy = '', isMobile = false, }) {
    const theme = useTheme();
    const style = CcfCustomPopOverStyles(theme, isMobile, popoverMaxWidth);
    return (_jsx(Popover, Object.assign({ id: id, open: open, onClose: onClose, anchorEl: anchorEl, anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'left',
        }, transformOrigin: {
            vertical: 'top',
            horizontal: 'left',
        }, PaperProps: {
            style: Object.assign({}, style.popOverStyles),
            role: 'dialog',
            'aria-labelledby': ariaLabelledBy,
        } }, { children: children })));
}
;
//# sourceMappingURL=ccf-custom-popOver.js.map