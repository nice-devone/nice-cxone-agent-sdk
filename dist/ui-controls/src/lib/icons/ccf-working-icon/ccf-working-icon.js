import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { SvgIcon, useTheme } from '@mui/material';
/**
 * component used to display working icon in agent state
 * @param props - SvgIconProps
 * @example - <CcfWorkingIcon />
 * @returns SVG of working icon in agent state
 */
export function CcfWorkingIcon(props) {
    var _a;
    const theme = useTheme();
    return (_jsx(SvgIcon, Object.assign({}, props, { children: _jsx("g", Object.assign({ id: "ic_working", clipPath: "url(#clip-ic_working)" }, { children: _jsxs("g", Object.assign({ id: "ic_working-2", "data-name": "ic_working", transform: "translate(4 4)" }, { children: [_jsx("circle", { id: "Ellipse_4745", "data-name": "Ellipse 4745", cx: "8.5", cy: "8.5", r: "8.5", fill: (_a = theme.palette.agentState) === null || _a === void 0 ? void 0 : _a.working }), _jsx("circle", { id: "Ellipse_4762", "data-name": "Ellipse 4762", cx: "3.5", cy: "3.5", r: "3.5", transform: "translate(5 5)", fill: "#fff" })] })) })) })));
}
export default CcfWorkingIcon;
//# sourceMappingURL=ccf-working-icon.js.map