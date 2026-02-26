import { __rest } from "tslib";
import { jsx as _jsx } from "react/jsx-runtime";
import { SvgIcon, useTheme } from '@mui/material';
/**
 * component used to display call transfer icon
 * @param props - SvgIconProps
 * @example - <CcfTransferIcon />
 * @returns SVG of call transfer icon
 */
export function CcfTransferIcon(_a) {
    var { htmlColor } = _a, props = __rest(_a, ["htmlColor"]);
    const theme = useTheme();
    return (_jsx(SvgIcon, Object.assign({ viewBox: "0 0 25 24" }, props, { children: _jsx("g", Object.assign({ id: "Transfer" }, { children: _jsx("path", { fill: htmlColor !== null && htmlColor !== void 0 ? htmlColor : theme.palette.text.clearText, "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M10.5001 4C8.56709 4 7.00008 5.567 7.00008 7.5C7.00008 9.433 8.56709 11 10.5001 11C12.4331 11 14.0001 9.433 14.0001 7.5C14.0001 5.567 12.4331 4 10.5001 4ZM5.00008 7.5C5.00008 4.46243 7.46252 2 10.5001 2C13.5376 2 16.0001 4.46243 16.0001 7.5C16.0001 10.5376 13.5376 13 10.5001 13C7.46252 13 5.00008 10.5376 5.00008 7.5ZM18.793 14.2929C19.1835 13.9024 19.8167 13.9024 20.2072 14.2929L23.2072 17.2929C23.5977 17.6834 23.5977 18.3166 23.2072 18.7071L20.2072 21.7071C19.8167 22.0976 19.1835 22.0976 18.793 21.7071C18.4025 21.3166 18.4025 20.6834 18.793 20.2929L20.0859 19H16.5001C15.9478 19 15.5001 18.5523 15.5001 18C15.5001 17.4477 15.9478 17 16.5001 17H20.0859L18.793 15.7071C18.4025 15.3166 18.4025 14.6834 18.793 14.2929ZM7.82635 14.5C7.88341 14.5 7.94132 14.5 8.00009 14.5H12.5001C13.0524 14.5 13.5001 14.9477 13.5001 15.5C13.5001 16.0523 13.0524 16.5 12.5001 16.5H8.00009C6.53177 16.5 6.01929 16.5109 5.62923 16.6292C4.67042 16.92 3.92011 17.6703 3.62926 18.6291C3.51094 19.0192 3.50008 19.5317 3.50008 21C3.50008 21.5523 3.05237 22 2.50008 22C1.9478 22 1.50008 21.5523 1.50008 21C1.50008 20.9412 1.50006 20.8833 1.50004 20.8263C1.49959 19.599 1.49928 18.761 1.71538 18.0486C2.20013 16.4506 3.45065 15.2 5.04866 14.7153C5.76106 14.4992 6.59908 14.4995 7.82635 14.5Z" }) })) })));
}
export default CcfTransferIcon;
//# sourceMappingURL=ccf-transfer-icon.js.map