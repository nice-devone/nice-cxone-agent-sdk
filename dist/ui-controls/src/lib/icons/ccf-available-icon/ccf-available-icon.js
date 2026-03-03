import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { SvgIcon, useTheme } from '@mui/material';
/**
 * This icon will be used to display Available status of agent
 * @param props - SvgIconProps
 * @example - <CcfAvailableIcon />
 * @returns SVG of Available icon
 */
export function CcfAvailableIcon(props) {
    const theme = useTheme();
    return (_jsx(SvgIcon, Object.assign({}, props, { children: _jsx("g", Object.assign({ id: "ic_dropdown_Available", clipPath: "url(#clip-ic_dropdown_Available)", viewBox: "0 0 22 22" }, { children: _jsxs("g", Object.assign({ id: "ic_available", transform: "translate(3 3)" }, { children: [_jsx("circle", { id: "Ellipse_4745", "data-name": "Ellipse 4745", cx: "9", cy: "9", r: "9", fill: theme.palette.agentState.available }), _jsx("path", { id: "Path_25124", "data-name": "Path 25124", d: "M1234.293,36.425l2.712,2.712,4.488-4.488", transform: "translate(-1228.893 -27.45)", fill: "none", stroke: "#fff", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2" })] })) })) })));
}
export default CcfAvailableIcon;
//# sourceMappingURL=ccf-available-icon.js.map