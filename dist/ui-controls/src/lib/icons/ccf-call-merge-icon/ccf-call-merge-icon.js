import { __rest } from "tslib";
import { jsx as _jsx } from "react/jsx-runtime";
import { SvgIcon, useTheme } from '@mui/material';
/**
 * Component to display call merger icon
 * @param props - SvgIconProps
 * @example <CcfCallMergeIcon />
 * @returns
 */
export function CcfCallMergeIcon(_a) {
    var { htmlColor } = _a, props = __rest(_a, ["htmlColor"]);
    const theme = useTheme();
    return (_jsx(SvgIcon, Object.assign({ viewBox: "0 0 24 24" }, props, { children: _jsx("g", Object.assign({ id: "ic_merge_call_btn" }, { children: _jsx("path", { d: "M19.202 18.9363L18.3038 21C15.4805 19.7706 13.3574 18.1632 12.101 16.2525C10.8446 18.1632 8.7215 19.7715 5.8982 21L5 18.9363C7.727 17.7501 10.796 15.6918 10.796 12V9.3H8.051L12.101 3L16.151 9.3H13.406V12C13.406 15.6918 16.475 17.7501 19.202 18.9363Z", fill: htmlColor !== null && htmlColor !== void 0 ? htmlColor : theme.palette.text.clearText }) })) })));
}
export default CcfCallMergeIcon;
//# sourceMappingURL=ccf-call-merge-icon.js.map