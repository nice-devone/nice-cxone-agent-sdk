import { __rest } from "tslib";
import { jsx as _jsx } from "react/jsx-runtime";
import { Popover, useTheme } from '@mui/material';
/**
 * component to display any children component in popover
 * @param param0 - CcfPopOverWrapperProps
 * @example <CcfPopOverWrapper><Box></Box></CcfPopOverWrapper>
 */
export function CcfPopOverWrapper(_a) {
    var _b, _c, _d, _e;
    var { id, anchorReference, anchorPosition, anchorOrigin, transformOrigin, open, anchorEl, handleClose, children } = _a, rest = __rest(_a, ["id", "anchorReference", "anchorPosition", "anchorOrigin", "transformOrigin", "open", "anchorEl", "handleClose", "children"]);
    const theme = useTheme();
    return (_jsx(Popover, Object.assign({ id: id, anchorReference: anchorReference || 'anchorEl', anchorPosition: anchorReference === 'anchorPosition' && anchorPosition ? anchorPosition : undefined, anchorOrigin: anchorOrigin, transformOrigin: transformOrigin, anchorEl: anchorEl, open: open, onClose: handleClose, sx: Object.assign(Object.assign({ display: 'flex', flexDirection: 'column', maxHeight: '80vh' }, rest.style), { '*::-webkit-scrollbar': {
                width: '0.3rem',
            }, '*::-webkit-scrollbar-thumb': {
                backgroundColor: (_c = (_b = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _b === void 0 ? void 0 : _b.background) === null || _c === void 0 ? void 0 : _c.scrollThumb,
                borderRadius: '2rem',
            }, '*::-webkit-scrollbar-track': {
                backgroundColor: (_e = (_d = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _d === void 0 ? void 0 : _d.background) === null || _e === void 0 ? void 0 : _e.scrollTrack,
            } }) }, { children: children })));
}
export default CcfPopOverWrapper;
//# sourceMappingURL=ccf-popover-wrapper.js.map