import { __rest } from "tslib";
import { jsx as _jsx } from "react/jsx-runtime";
import { SvgIcon, useTheme } from '@mui/material';
/**
 * Component displays keypad  svg icon
 * @param props -SvgIconProps
 * @returns keypad svg icon
 * @example - <CcfCallKeypadIcon/>
 */
export function CcfCallKeypadIcon(_a) {
    var { htmlColor } = _a, props = __rest(_a, ["htmlColor"]);
    const theme = useTheme();
    return (_jsx(SvgIcon, Object.assign({ viewBox: "0 0 25 24" }, props, { children: _jsx("g", Object.assign({ id: "Keypad" }, { children: _jsx("path", { fill: htmlColor !== null && htmlColor !== void 0 ? htmlColor : theme.palette.text.clearText, "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M3.5 5C3.5 3.89543 4.39543 3 5.5 3C6.60457 3 7.5 3.89543 7.5 5C7.5 6.10457 6.60457 7 5.5 7C4.39543 7 3.5 6.10457 3.5 5ZM10.5 5C10.5 3.89543 11.3954 3 12.5 3C13.6046 3 14.5 3.89543 14.5 5C14.5 6.10457 13.6046 7 12.5 7C11.3954 7 10.5 6.10457 10.5 5ZM17.5 5C17.5 3.89543 18.3954 3 19.5 3C20.6046 3 21.5 3.89543 21.5 5C21.5 6.10457 20.6046 7 19.5 7C18.3954 7 17.5 6.10457 17.5 5ZM3.5 12C3.5 10.8954 4.39543 10 5.5 10C6.60457 10 7.5 10.8954 7.5 12C7.5 13.1046 6.60457 14 5.5 14C4.39543 14 3.5 13.1046 3.5 12ZM10.5 12C10.5 10.8954 11.3954 10 12.5 10C13.6046 10 14.5 10.8954 14.5 12C14.5 13.1046 13.6046 14 12.5 14C11.3954 14 10.5 13.1046 10.5 12ZM17.5 12C17.5 10.8954 18.3954 10 19.5 10C20.6046 10 21.5 10.8954 21.5 12C21.5 13.1046 20.6046 14 19.5 14C18.3954 14 17.5 13.1046 17.5 12ZM3.5 19C3.5 17.8954 4.39543 17 5.5 17C6.60457 17 7.5 17.8954 7.5 19C7.5 20.1046 6.60457 21 5.5 21C4.39543 21 3.5 20.1046 3.5 19ZM10.5 19C10.5 17.8954 11.3954 17 12.5 17C13.6046 17 14.5 17.8954 14.5 19C14.5 20.1046 13.6046 21 12.5 21C11.3954 21 10.5 20.1046 10.5 19ZM17.5 19C17.5 17.8954 18.3954 17 19.5 17C20.6046 17 21.5 17.8954 21.5 19C21.5 20.1046 20.6046 21 19.5 21C18.3954 21 17.5 20.1046 17.5 19Z" }) })) })));
}
export default CcfCallKeypadIcon;
//# sourceMappingURL=ccf-call-keypad-icon.js.map