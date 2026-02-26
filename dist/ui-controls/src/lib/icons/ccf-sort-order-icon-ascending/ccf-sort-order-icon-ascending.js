import { jsx as _jsx } from "react/jsx-runtime";
import { SvgIcon, useTheme } from '@mui/material';
/**
 * Component used to display  agent leg connected icon
 * @param props - CcfSortOrderIconAscending
 * @example - <CcfSortOrderIconAscending />
 * @returns SVG of Sort Icon
 */
export function CcfSortOrderIconAscending(props) {
    const theme = useTheme();
    return (_jsx(SvgIcon, Object.assign({}, props, { children: _jsx("path", { d: "M1.5 14.6667H12.3333M1.5 11.3334H9M1.5 8.00008H9M13.1667 11.3334V1.33342M13.1667 1.33342L9.83333 4.66675M13.1667 1.33342L16.5 4.66675", stroke: theme.palette.secondary.main, strokeWidth: "2", strokeLinecap: "round", "stroke-linejoin": "round" }) })));
}
export default CcfSortOrderIconAscending;
//# sourceMappingURL=ccf-sort-order-icon-ascending.js.map