import { jsx as _jsx } from "react/jsx-runtime";
import { SvgIcon, useTheme } from '@mui/material';
/**
 * Component used to display  sort order icon
 * @param props - CcfSortOrderIconDescending
 * @example - <CcfSortOrderIconDescending />
 * @returns SVG of SortOrder Icon
 */
export function CcfSortOrderIconDescending(props) {
    const theme = useTheme();
    return (_jsx(SvgIcon, Object.assign({}, props, { children: _jsx("path", { d: "M1.5 1.33325H12.3333M1.5 4.66659H9M1.5 7.99992H9M13.1667 4.66659V14.6666M13.1667 14.6666L9.83333 11.3333M13.1667 14.6666L16.5 11.3333", stroke: theme.palette.secondary.main, strokeWidth: "2", strokeLinecap: "round", "stroke-linejoin": "round" }) })));
}
export default CcfSortOrderIconDescending;
//# sourceMappingURL=ccf-sort-order-icon-descending.js.map