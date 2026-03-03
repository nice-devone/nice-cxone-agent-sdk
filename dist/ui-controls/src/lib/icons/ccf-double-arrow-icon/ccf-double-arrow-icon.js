import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { SvgIcon } from '@mui/material';
/**
 * CcfDoubleArrowIcon used to disply double arrow icon in the contact card panel
 * @param props - SvgIconProps
 * @example -- <CcfDoubleArrowIcon />
 */
export function CcfDoubleArrowIcon(props) {
    const uniqueId = `clip-${Math.random().toString(36).substr(2, 9)}`;
    const clipId = `clip-${uniqueId}`;
    const chevronId = `Chevron-${uniqueId}`;
    const groupId = `Group_${uniqueId}`;
    const rectId = `Rectangle_${uniqueId}`;
    const pathId = `Union_${uniqueId}`;
    return (_jsx(SvgIcon, Object.assign({ viewBox: "0 0 24 24" }, props, { children: _jsx("g", Object.assign({ id: chevronId, clipPath: `url(#${clipId})` }, { children: _jsxs("g", Object.assign({ id: groupId, "data-name": "Group 119454", transform: "translate(32.904 32.141) rotate(180)" }, { children: [_jsx("rect", { id: rectId, "data-name": "Rectangle 22331", width: "40", height: "40", transform: "translate(0.904 0.141)", fill: "#fff", opacity: "0" }), _jsx("path", { id: pathId, "data-name": "Union 1528", d: "M11.862,11.048,6.337,5.742l-5.2,5.2a.812.812,0,0,1-.977,0,.814.814,0,0,1,0-.975L5.794,4.549c.113-.217.328-.217.543-.217a.793.793,0,0,1,.65.217l5.849,5.523a.8.8,0,0,1,0,.975.632.632,0,0,1-.448.164A.973.973,0,0,1,11.862,11.048Zm0-4.44-5.525-5.2-5.091,5.2a.816.816,0,0,1-.976,0,.817.817,0,0,1,0-.977L5.794.108A.828.828,0,0,1,6.337,0a.8.8,0,0,1,.65.215l5.849,5.527a.8.8,0,0,1,0,.974.556.556,0,0,1-.395.15A.829.829,0,0,1,11.862,6.608Z", transform: "translate(14 15.216)" })] })) })) })));
}
export default CcfDoubleArrowIcon;
//# sourceMappingURL=ccf-double-arrow-icon.js.map