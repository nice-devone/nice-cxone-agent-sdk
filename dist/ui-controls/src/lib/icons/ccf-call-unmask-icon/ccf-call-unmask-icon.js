import { __rest } from "tslib";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { SvgIcon, useTheme } from '@mui/material';
/**
 * Component displays call unmask svg icon
 * @param props -SvgIconProps
 * @returns call unmask svg icon
 * @example - <CcfCallUnmaskIcon/>
 */
export function CcfCallUnmaskIcon(_a) {
    var { htmlColor } = _a, props = __rest(_a, ["htmlColor"]);
    const theme = useTheme();
    return (_jsxs(SvgIcon, Object.assign({ viewBox: "0 0 12 12" }, props, { children: [_jsx("path", { d: "M0.896912 4.88232L0.896912 7.11572", stroke: htmlColor || theme.palette.text.primary, strokeWidth: "1", strokeLinecap: "round" }), _jsx("path", { d: "M3.4567 5.4751L3.4567 6.5498", stroke: htmlColor || theme.palette.text.primary, strokeWidth: "1", strokeLinecap: "round" }), _jsx("path", { d: "M5.99762 2.58984L5.99762 9.39258", stroke: htmlColor || theme.palette.text.primary, strokeWidth: "1", strokeLinecap: "round" }), _jsx("path", { d: "M8.5574 0.911133L8.5574 11.0894", stroke: htmlColor || theme.palette.text.primary, strokeWidth: "1", strokeLinecap: "round" }), _jsx("path", { d: "M11.1031 4.88232L11.1031 7.11572", stroke: htmlColor || theme.palette.text.primary, strokeWidth: "1", strokeLinecap: "round" })] })));
}
export default CcfCallUnmaskIcon;
//# sourceMappingURL=ccf-call-unmask-icon.js.map