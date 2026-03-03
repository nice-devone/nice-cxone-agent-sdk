import { jsx as _jsx } from "react/jsx-runtime";
import { SvgIcon } from '@mui/material';
/**
 * component used to display checckbox icon without outline
 * @param props - SvgIconProps
 * @example - <CcfCheckBoxOutlineBlankIcon />
 * @returns SVG of checkbox outline blank icon
 */
export function CcfCheckBoxOutlineBlankIcon(props) {
    return (_jsx(SvgIcon, Object.assign({}, props, { children: _jsx("rect", { x: "3.5", y: "3.5", width: "17", height: "17", rx: "1.5", fill: "white", stroke: "#dae2e8" }) })));
}
export default CcfCheckBoxOutlineBlankIcon;
//# sourceMappingURL=ccf-check-box-outline-blank-icon.js.map