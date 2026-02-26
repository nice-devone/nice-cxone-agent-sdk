import { __rest } from "tslib";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { SvgIcon } from '@mui/material';
/**
 * component used to display info icon
 * @param props - CcfInfoIconProps
 * @example - <CcfInfoIcon />
 * @returns SVG of info icon
 */
export function CcfInfoIcon(_a) {
    var { sx } = _a, props = __rest(_a, ["sx"]);
    return (_jsx(SvgIcon, Object.assign({}, props, { sx: sx }, { children: _jsx("g", Object.assign({ "data-name": "ToolTip Icon" }, { children: _jsxs("g", Object.assign({ id: 'info_' + props.id, transform: "translate(5 5)" }, { children: [_jsx("path", { id: 'Path_13738' + props.id, fill: props.htmlColor || '', "data-name": "Path 13738", d: "M7,14A7,7,0,1,0,0,7,7.021,7.021,0,0,0,7,14ZM7,1.4A5.6,5.6,0,1,1,1.4,7,5.616,5.616,0,0,1,7,1.4Z" }), _jsx("path", { id: 'Path_13739' + props.id, fill: props.htmlColor || '', "data-name": "Path 13739", d: "M15.1,15.2h0a.661.661,0,0,1,.7.7v2.8a.7.7,0,0,1-.7.7h0a.7.7,0,0,1-.7-.7V15.9A.661.661,0,0,1,15.1,15.2Z", transform: "translate(-8.1 -8.55)" }), _jsx("path", { id: 'Path_13740' + props.id, fill: props.htmlColor || '', "data-name": "Path 13740", d: "M15.1,7.2h0a.661.661,0,0,1,.7.7v.7a.7.7,0,0,1-.7.7h0a.7.7,0,0,1-.7-.7V7.9A.661.661,0,0,1,15.1,7.2Z", transform: "translate(-8.1 -4.05)" })] })) })) })));
}
export default CcfInfoIcon;
//# sourceMappingURL=ccf-info-icon.js.map