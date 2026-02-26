import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { SvgIcon, useTheme } from '@mui/material';
/**
 * CcfEmailIcon used to disply email icon in the contact card panel
 * @param props - SvgIconProps
 * @example -- <CcfEmailIcon />
 */
export function CcfEmailIcon(props) {
    var _a, _b, _c, _d;
    const { isDisabled } = props;
    const theme = useTheme();
    return (_jsxs(SvgIcon, Object.assign({ width: "28", height: "29", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, props, { children: [_jsx("path", { d: "M20.3 9.94863C20.09 9.79863 19.88 9.72363 19.6 9.72363H8.4C8.12 9.72363 7.91 9.79863 7.7 9.94863L14 14.1486L20.3 9.94863Z", fill: isDisabled ? 'grey' : '#003D7A' }), _jsx("path", { d: "M21 11.2236L14.35 15.6486C14.28 15.6486 14.14 15.7236 14 15.7236C13.86 15.7236 13.72 15.6486 13.65 15.5736L7 11.2236V18.7236C7 19.5486 7.63 20.2236 8.4 20.2236H19.6C20.37 20.2236 21 19.5486 21 18.7236V11.2236Z", fill: isDisabled ? (_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.text) === null || _b === void 0 ? void 0 : _b.light : (_d = (_c = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _c === void 0 ? void 0 : _c.text) === null || _d === void 0 ? void 0 : _d.clearText })] })));
}
export default CcfEmailIcon;
//# sourceMappingURL=ccf-email-icon.js.map