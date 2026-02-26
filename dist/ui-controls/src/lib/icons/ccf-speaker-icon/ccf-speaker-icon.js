import { __rest } from "tslib";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { SvgIcon, useTheme } from '@mui/material';
/**
 * Component displays unmute svg icon
 * @param props -SvgIconProps
 * @returns unmute svg icon
 * @example - <CcfUnMuteIcon />
 */
export function CcfUnMuteIcon(_a) {
    var { htmlColor } = _a, props = __rest(_a, ["htmlColor"]);
    const theme = useTheme();
    return (_jsx(SvgIcon, Object.assign({ viewBox: "0 0 29 28" }, props, { children: _jsxs("g", Object.assign({ id: "ic_speaker" }, { children: [_jsx("rect", { x: "0.5", width: "28", height: "28", rx: "4", fill: theme.palette.text.clearText }), _jsx("path", { fill: htmlColor !== null && htmlColor !== void 0 ? htmlColor : theme.palette.text.white, "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M3.79289 3.29289C4.18342 2.90237 4.81658 2.90237 5.20711 3.29289L17.3295 15.4128C17.344 15.4272 17.358 15.442 17.3714 15.4572L19.3907 17.4765C20.0892 16.4957 20.5 15.2958 20.5 14V12C20.5 11.4477 20.9477 11 21.5 11C22.0523 11 22.5 11.4477 22.5 12V14C22.5 15.8487 21.8729 17.551 20.8199 18.9056L25.2071 23.2929C25.5976 23.6834 25.5976 24.3166 25.2071 24.7071C24.8166 25.0976 24.1834 25.0976 23.7929 24.7071L19.4056 20.3199C18.2991 21.18 16.9607 21.756 15.5 21.9381V23H18.5C19.0523 23 19.5 23.4477 19.5 24C19.5 24.5523 19.0523 25 18.5 25H10.5C9.94772 25 9.5 24.5523 9.5 24C9.5 23.4477 9.94772 23 10.5 23H13.5V21.9381C9.55369 21.446 6.5 18.0796 6.5 14V12C6.5 11.4477 6.94772 11 7.5 11C8.05228 11 8.5 11.4477 8.5 12V14C8.5 17.3137 11.1863 20 14.5 20C15.7958 20 16.9957 19.5892 17.9765 18.8907L16.5318 17.446C15.9364 17.7977 15.2414 18 14.5 18C12.2909 18 10.5 16.2091 10.5 14V11.4142L3.79289 4.70711C3.40237 4.31658 3.40237 3.68342 3.79289 3.29289ZM12.5 13.4142V14C12.5 15.1046 13.3954 16 14.5 16C14.6793 16 14.853 15.9765 15.0182 15.9324L12.5 13.4142ZM10.9168 5.22066C11.5703 3.90653 12.9284 3 14.5 3C16.7091 3 18.5 4.79086 18.5 7V11.4C18.5 11.9523 18.0523 12.4 17.5 12.4C16.9477 12.4 16.5 11.9523 16.5 11.4V7C16.5 5.89543 15.6046 5 14.5 5C13.7164 5 13.0362 5.45051 12.7076 6.11121C12.4617 6.60572 11.8614 6.80725 11.3669 6.56133C10.8724 6.31541 10.6709 5.71517 10.9168 5.22066Z" })] })) })));
}
export default CcfUnMuteIcon;
//# sourceMappingURL=ccf-speaker-icon.js.map