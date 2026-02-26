import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { SvgIcon, useTheme } from '@mui/material';
/**
 * This icon will be used to display unavailable status of agent
 * @param props - SvgIconProps
 * @example - <CcfUnavailableIcon />
 * @returns SVG of unavailable icon
 */
export function CcfUnavailableIcon(props) {
    const theme = useTheme();
    return (_jsx(SvgIcon, Object.assign({}, props, { style: { maxWidth: '30px', maxHeight: '30px' } }, { children: _jsx("g", Object.assign({ clipPath: "url(#clip-ic_busy)", viewBox: "0 0 22 22" }, { children: _jsxs("g", Object.assign({ id: 'Group_119864' + props.id, "data-name": "Group 119864", transform: "translate(-884 -50)" }, { children: [_jsx("circle", { id: 'Ellipse_4745' + props.id, "data-name": "Ellipse 4745", cx: "8.5", cy: "8.5", r: "8.5", transform: "translate(888 54)", fill: theme.palette.agentState.unavailable }), _jsx("path", { id: 'Path_25132' + props.id, "data-name": "Path 25132", d: "M890.557,62.209h10", transform: "translate(0.943 0.291)", fill: "none", stroke: "#fff", strokeLinecap: "round", strokeWidth: "2" })] })) })) })));
}
export default CcfUnavailableIcon;
//# sourceMappingURL=ccf-unavailable-icon.js.map