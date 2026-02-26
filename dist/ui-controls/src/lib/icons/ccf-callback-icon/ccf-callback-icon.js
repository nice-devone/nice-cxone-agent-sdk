import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { SvgIcon, useTheme } from '@mui/material';
/**
 * Component displays voicemail callback svg icon
 * @param props - SvgIconProps
 * @example - <CcfCallbackIcon />
 */
export function CcfCallbackIcon(props) {
    const theme = useTheme();
    return (_jsx(SvgIcon, Object.assign({}, props, { children: _jsxs("g", Object.assign({ id: "Callback_Icon", "data-name": "Callback Icon" }, { children: [_jsx("rect", { width: "28", height: "28", fill: "none" }), _jsx("path", { id: "callback_icon1", d: "M11.7669 10.4534C11.7669 10.4534 11.1507 11.4176 11.096 11.4992C11.0414 11.5809 10.9197 11.8231 10.3456 11.6598C9.02167 11.1618 7.85118 10.3444 6.94533 9.28513C5.87454 8.35985 5.0584 7.19108 4.5705 5.8842C4.40661 5.3098 4.64908 5.19102 4.73054 5.13349C4.812 5.07595 5.77612 4.4598 5.77612 4.4598C6.42494 4.07934 5.69083 2.45265 4.5082 1.66946C3.63513 1.09042 3.25178 1.14795 2.88472 1.43283C2.28691 1.91158 1.75227 2.45979 1.29287 3.06509C1.06026 3.38983 0.960843 3.78679 1.01399 4.17863C1.20573 5.41692 1.64801 6.60639 2.31545 7.67885C3.06778 8.95305 3.98962 10.1261 5.05735 11.1679C6.08917 12.2279 7.26195 13.1503 8.54485 13.911C9.60682 14.5745 10.7997 15.0169 12.0477 15.2101C12.4422 15.2623 12.8422 15.1623 13.1613 14.9317C13.7699 14.4674 14.3171 13.9323 14.7905 13.3384C15.0781 12.9672 15.1308 12.5886 14.5529 11.7145C13.7737 10.5379 12.1474 9.80478 11.7669 10.4534Z", fill: theme.palette.text.clearText })] })) })));
}
export default CcfCallbackIcon;
//# sourceMappingURL=ccf-callback-icon.js.map