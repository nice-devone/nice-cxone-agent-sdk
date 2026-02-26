import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { forwardRef } from 'react';
import { SvgIcon } from '@mui/material';
/**
 * component used to display close icon
 * @param props - SvgIconProps
 * @example - <CcfCloseIcon />
 * @returns SVG of close icon
 */
export const CcfCloseIcon = forwardRef((props, ref) => {
    return (_jsx(SvgIcon, Object.assign({}, props, { ref: ref }, { children: _jsxs("g", Object.assign({ id: "ic_close" }, { children: [_jsx("rect", { width: "20", height: "20", fill: "none" }), _jsx("g", Object.assign({ id: "Layer_2", "data-name": "Layer 2", transform: "translate(3 3)" }, { children: _jsx("g", Object.assign({ id: "Layer_1", "data-name": "Layer 1", transform: "translate(0 0)" }, { children: _jsx("path", { d: "M7.928,7l5.894-5.894a.611.611,0,0,0,0-.862L13.756.178a.611.611,0,0,0-.862,0L7,6.072,1.106.178a.611.611,0,0,0-.862,0L.178.244a.611.611,0,0,0,0,.862L6.071,7,.178,12.895a.611.611,0,0,0,0,.862l.066.066a.611.611,0,0,0,.862,0L7,7.928l5.894,5.894a.611.611,0,0,0,.862,0l.066-.066a.611.611,0,0,0,0-.862Z", transform: "translate(0 0)" }) })) }))] })) })));
});
export default CcfCloseIcon;
//# sourceMappingURL=ccf-close-icon.js.map