import { __rest } from "tslib";
import { jsx as _jsx } from "react/jsx-runtime";
import { SvgIcon, useTheme } from '@mui/material';
/**
 * Component displays call mute  svg icon
 * @param props -SvgIconProps
 * @returns call mute svg icon
 * @example - <CcfCallMuteIcon/>
 */
export function CcfCallMuteIcon(_a) {
    var { htmlColor } = _a, props = __rest(_a, ["htmlColor"]);
    const theme = useTheme();
    return (_jsx(SvgIcon, Object.assign({ viewBox: "0 0 29 28" }, props, { children: _jsx("g", Object.assign({ id: "Mute" }, { children: _jsx("path", { fill: htmlColor !== null && htmlColor !== void 0 ? htmlColor : theme.palette.text.clearText, "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M10.5 7C10.5 4.79086 12.2909 3 14.5 3C16.7091 3 18.5 4.79086 18.5 7V14C18.5 16.2091 16.7091 18 14.5 18C12.2909 18 10.5 16.2091 10.5 14V7ZM14.5 5C13.3954 5 12.5 5.89543 12.5 7V14C12.5 15.1046 13.3954 16 14.5 16C15.6046 16 16.5 15.1046 16.5 14V7C16.5 5.89543 15.6046 5 14.5 5ZM7.5 11C8.05228 11 8.5 11.4477 8.5 12V14C8.5 17.3137 11.1863 20 14.5 20C17.8137 20 20.5 17.3137 20.5 14V12C20.5 11.4477 20.9477 11 21.5 11C22.0523 11 22.5 11.4477 22.5 12V14C22.5 18.0796 19.4463 21.446 15.5 21.9381V23H18.5C19.0523 23 19.5 23.4477 19.5 24C19.5 24.5523 19.0523 25 18.5 25H10.5C9.94772 25 9.5 24.5523 9.5 24C9.5 23.4477 9.94772 23 10.5 23H13.5V21.9381C9.55369 21.446 6.5 18.0796 6.5 14V12C6.5 11.4477 6.94772 11 7.5 11Z" }) })) })));
}
export default CcfCallMuteIcon;
//# sourceMappingURL=ccf-call-mute-icon.js.map