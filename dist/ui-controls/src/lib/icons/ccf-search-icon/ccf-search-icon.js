import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useTheme } from '@mui/material';
/**
 * CcfSearchIcon used to disply search icon in the contact card history panel
 * @param props - SvgIconProps
 * @example -- <CcfSearchIcon />
 */
export function CcfSearchIcon(props) {
    var _a, _b;
    const theme = useTheme();
    const { htmlColor = (_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.text) === null || _b === void 0 ? void 0 : _b.contrastText } = props;
    return (_jsxs("svg", Object.assign({ width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, props, { children: [_jsx("g", Object.assign({ "clip-path": "url(#clip0_10171_896)" }, { children: _jsx("path", { d: "M1 7.4C1 10.92 3.88 13.8 7.4 13.8C8.84 13.8 10.2 13.32 11.32 12.44L15.64 16.76C15.96 17.08 16.44 17.08 16.76 16.76C17.08 16.44 17.08 15.96 16.76 15.64L12.44 11.32C13.32 10.2 13.8 8.84 13.8 7.4C13.8 3.88 10.92 1 7.4 1C3.88 1 1 3.88 1 7.4ZM2.6 7.4C2.6 4.76 4.76 2.6 7.4 2.6C10.04 2.6 12.2 4.76 12.2 7.4C12.2 10.04 10.04 12.2 7.4 12.2C4.76 12.2 2.6 10.04 2.6 7.4Z", fill: htmlColor, stroke: htmlColor, "stroke-width": "0.6" }) })), _jsx("defs", { children: _jsx("clipPath", Object.assign({ id: "clip0_10171_896" }, { children: _jsx("rect", { width: "18", height: "18", fill: "white" }) })) })] })));
}
export default CcfSearchIcon;
//# sourceMappingURL=ccf-search-icon.js.map