import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { SvgIcon, useTheme } from '@mui/material';
/**
 * Component used to display  agent leg connected icon
 * @param props - CcfSortIcon
 * @example - <CcfSortIcon />
 * @returns SVG of Sort Icon
 */
export function CcfSortIcon(props) {
    const theme = useTheme();
    return (_jsxs(SvgIcon, Object.assign({}, props, { children: [_jsx("circle", { cx: "10", cy: "10", r: "9", fill: "none", stroke: theme.palette.secondary.main, strokeWidth: "2" }), _jsx("path", { d: "M5.1427 6.85718H15.4284M6.85699 10.2857H13.7141M8.57127 13.7143H11.9998", stroke: theme.palette.secondary.main, strokeWidth: "2", strokeLinecap: "round" })] })));
}
export default CcfSortIcon;
//# sourceMappingURL=ccf-sort-icon.js.map