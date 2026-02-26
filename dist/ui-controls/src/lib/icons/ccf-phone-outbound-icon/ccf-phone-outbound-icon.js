import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { SvgIcon, useTheme } from '@mui/material';
/**
 * CcfPhoneOutboundIcon used to disply phone outbound icon in the contact card channel panel
 * @param props - SvgIconProps
 * @example -- <CcfPhoneOutboundIcon />
 */
export function CcfPhoneOutboundIcon(props) {
    var _a, _b, _c, _d;
    const { isDisabled } = props;
    const theme = useTheme();
    return (_jsxs(SvgIcon, Object.assign({ width: "28", height: "29", viewBox: "0 0 28 29" }, props, { fill: "none", xmlns: "http://www.w3.org/2000/svg" }, { children: [_jsx("g", Object.assign({ "clip-path": "url(#clip0_27768_1612)" }, { children: _jsx("path", { d: "M17.7669 16.4534C17.7669 16.4534 17.1507 17.4176 17.096 17.4992C17.0414 17.5809 16.9197 17.8231 16.3456 17.6598C15.0217 17.1618 13.8512 16.3444 12.9453 15.2851C11.8745 14.3598 11.0584 13.1911 10.5705 11.8842C10.4066 11.3098 10.6491 11.191 10.7305 11.1335C10.812 11.076 11.7761 10.4598 11.7761 10.4598C12.4249 10.0793 11.6908 8.45265 10.5082 7.66946C9.63513 7.09042 9.25178 7.14795 8.88472 7.43283C8.28691 7.91158 7.75227 8.45979 7.29287 9.06509C7.06026 9.38983 6.96084 9.78679 7.01399 10.1786C7.20573 11.4169 7.64801 12.6064 8.31545 13.6789C9.06778 14.9531 9.98962 16.1261 11.0573 17.1679C12.0892 18.2279 13.2619 19.1503 14.5449 19.911C15.6068 20.5745 16.7997 21.0169 18.0477 21.2101C18.4422 21.2623 18.8422 21.1623 19.1613 20.9317C19.7699 20.4674 20.3171 19.9323 20.7905 19.3384C21.0781 18.9672 21.1308 18.5886 20.5529 17.7145C19.7737 16.5379 18.1474 15.8048 17.7669 16.4534Z", fill: isDisabled ? (_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.text) === null || _b === void 0 ? void 0 : _b.light : (_d = (_c = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _c === void 0 ? void 0 : _c.text) === null || _d === void 0 ? void 0 : _d.clearText }) })), _jsx("defs", { children: _jsx("clipPath", Object.assign({ id: "clip0_27768_1612" }, { children: _jsx("path", { d: "M0 4.22363C0 2.01449 1.79086 0.223633 4 0.223633H24C26.2091 0.223633 28 2.01449 28 4.22363V24.2236C28 26.4328 26.2091 28.2236 24 28.2236H4C1.79086 28.2236 0 26.4328 0 24.2236V4.22363Z", fill: "white" }) })) })] })));
}
export default CcfPhoneOutboundIcon;
//# sourceMappingURL=ccf-phone-outbound-icon.js.map