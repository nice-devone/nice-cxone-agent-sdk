import { __rest } from "tslib";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { SvgIcon, useTheme } from '@mui/material';
/**
 * Component displays call mask  svg icon
 * @param props -SvgIconProps
 * @returns call unmask svg icon
 * @example - <CcfUnmaskIcon/>
 */
export function CcfUnmaskIcon(_a) {
    var { htmlColor } = _a, props = __rest(_a, ["htmlColor"]);
    const theme = useTheme();
    return (_jsx(SvgIcon, Object.assign({ viewBox: "0 0 29 28" }, props, { children: _jsxs("g", Object.assign({ id: "unmask" }, { children: [_jsx("rect", { x: "0.5", width: "28", height: "28", rx: "4", fill: theme.palette.text.clearText }), _jsx("path", { fill: htmlColor !== null && htmlColor !== void 0 ? htmlColor : theme.palette.text.white, "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M19.9579 14.978V4.99509C19.9579 4.47861 19.5392 4.05993 19.0227 4.05993C18.5063 4.05993 18.0876 4.47861 18.0876 4.99509V13.1077L19.9579 14.978ZM15.7497 10.7698V7.80058C15.7497 7.2841 15.331 6.86541 14.8145 6.86541C14.298 6.86541 13.8794 7.2841 13.8794 7.80058V8.89944L15.7497 10.7698ZM13.8794 12.8592L15.7497 14.7296V19.0225C15.7497 19.539 15.331 19.9577 14.8145 19.9577C14.298 19.9577 13.8794 19.539 13.8794 19.0225V12.8592ZM18.0876 17.0675L19.9579 18.9378V21.828C19.9579 22.3445 19.5392 22.7632 19.0227 22.7632C18.5063 22.7632 18.0876 22.3445 18.0876 21.828V17.0675ZM7.33322 11.5412C7.33322 11.0248 6.91453 10.6061 6.39805 10.6061C5.88158 10.6061 5.46289 11.0248 5.46289 11.5412V15.2819C5.46289 15.7984 5.88158 16.217 6.39805 16.217C6.91453 16.217 7.33322 15.7984 7.33322 15.2819V11.5412ZM24.1661 11.5412C24.1661 11.0248 23.7475 10.6061 23.231 10.6061C22.7145 10.6061 22.2958 11.0248 22.2958 11.5412V15.2819C22.2958 15.7984 22.7145 16.217 23.231 16.217C23.7475 16.217 24.1661 15.7984 24.1661 15.2819V11.5412ZM11.5414 12.4764C11.5414 11.9599 11.1228 11.5412 10.6063 11.5412C10.0898 11.5412 9.67112 11.9599 9.67112 12.4764V14.3467C9.67112 14.8632 10.0898 15.2819 10.6063 15.2819C11.1228 15.2819 11.5414 14.8632 11.5414 14.3467V12.4764Z" }), _jsx("path", { d: "M25 24L5 4", stroke: htmlColor !== null && htmlColor !== void 0 ? htmlColor : theme.palette.text.white, "stroke-width": "2", "stroke-linecap": "round" })] })) })));
}
export default CcfUnmaskIcon;
//# sourceMappingURL=ccf-unmask-icon.js.map