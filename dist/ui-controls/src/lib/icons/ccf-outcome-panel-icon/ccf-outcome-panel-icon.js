import { jsx as _jsx } from "react/jsx-runtime";
import { SvgIcon, useTheme } from '@mui/material';
/**
 * Component used to display resolved state Icon
 * @param props - SvgIconProps
 * @example - <CcfOutcomePanelIcon />
 * @returns SVG of call outcome panel icon
 */
export function CcfOutcomePanelIcon(props) {
    var _a, _b;
    const theme = useTheme();
    return (_jsx(SvgIcon, Object.assign({}, props, { viewBox: '0 0 20 20', style: { color: (_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.background) === null || _b === void 0 ? void 0 : _b.dispositionIcon } }, { children: _jsx("path", { d: "M7.78533 0.750026H4.21467C3.10121 0.746091 2.03178 1.18871 1.24146 1.98058C0.451127 2.77245 0.0045884 3.84876 0 4.97292V5.04561C0.0045884 6.16977 0.451127 7.24609 1.24146 8.03796C2.03178 8.82983 3.10121 9.27244 4.21467 9.26851H5.93333L9.61267 11.9366C9.67052 11.9755 9.73796 11.9974 9.80743 11.9998C9.87691 12.0022 9.94568 11.9849 10.006 11.9501C10.06 11.918 10.1049 11.8724 10.1364 11.8177C10.1678 11.763 10.1846 11.701 10.1853 11.6377L9.63534 8.82697C10.3413 8.4849 10.9376 7.94895 11.3558 7.28053C11.774 6.6121 11.9973 5.83825 12 5.04763V4.97494C11.9959 3.85043 11.5496 2.7736 10.7592 1.98129C9.96886 1.18899 8.89913 0.746092 7.78533 0.750026Z", fill: "#245900" }) })));
}
export default CcfOutcomePanelIcon;
//# sourceMappingURL=ccf-outcome-panel-icon.js.map