import { __rest } from "tslib";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { SvgIcon, useTheme } from '@mui/material';
/**
 * Component displays call mask  svg icon
 * @param props -SvgIconProps
 * @returns call mask svg icon
 * @example - <CcfCallMaskIcon/>
 */
export function CcfCallMaskIcon(_a) {
    var { htmlColor } = _a, props = __rest(_a, ["htmlColor"]);
    const theme = useTheme();
    return (_jsx(SvgIcon, Object.assign({ viewBox: "0 0 25 24" }, props, { children: _jsxs("g", Object.assign({ id: "Mask" }, { children: [_jsx("path", { fill: htmlColor !== null && htmlColor !== void 0 ? htmlColor : theme.palette.text.clearText, "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M17.9579 12.978V2.99509C17.9579 2.47861 17.5392 2.05993 17.0227 2.05993C16.5063 2.05993 16.0876 2.47861 16.0876 2.99509V11.1077L17.9579 12.978ZM13.7497 8.76977V5.80058C13.7497 5.2841 13.331 4.86541 12.8145 4.86541C12.298 4.86541 11.8794 5.2841 11.8794 5.80058V6.89944L13.7497 8.76977ZM11.8794 10.8592L13.7497 12.7296V17.0225C13.7497 17.539 13.331 17.9577 12.8145 17.9577C12.298 17.9577 11.8794 17.539 11.8794 17.0225V10.8592ZM16.0876 15.0675L17.9579 16.9378V19.828C17.9579 20.3445 17.5392 20.7632 17.0227 20.7632C16.5063 20.7632 16.0876 20.3445 16.0876 19.828V15.0675ZM5.33322 9.54123C5.33322 9.02475 4.91453 8.60606 4.39805 8.60606C3.88158 8.60606 3.46289 9.02475 3.46289 9.54123V13.2819C3.46289 13.7984 3.88158 14.217 4.39805 14.217C4.91453 14.217 5.33322 13.7984 5.33322 13.2819V9.54123ZM22.1661 9.54123C22.1661 9.02475 21.7475 8.60606 21.231 8.60606C20.7145 8.60606 20.2958 9.02475 20.2958 9.54123V13.2819C20.2958 13.7984 20.7145 14.217 21.231 14.217C21.7475 14.217 22.1661 13.7984 22.1661 13.2819V9.54123ZM9.54145 10.4764C9.54145 9.95991 9.12276 9.54123 8.60628 9.54123C8.08981 9.54123 7.67112 9.95991 7.67112 10.4764V12.3467C7.67112 12.8632 8.08981 13.2819 8.60628 13.2819C9.12276 13.2819 9.54145 12.8632 9.54145 12.3467V10.4764Z" }), _jsx("path", { d: "M23 22L3 2", stroke: htmlColor !== null && htmlColor !== void 0 ? htmlColor : theme.palette.text.clearText, "stroke-width": "2", "stroke-linecap": "round" })] })) })));
}
export default CcfCallMaskIcon;
//# sourceMappingURL=ccf-call-mask-icon.js.map