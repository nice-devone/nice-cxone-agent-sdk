import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { SvgIcon, useTheme } from '@mui/material';
/**
 * component used to display digital tag icon
 * @param props - SvgIconProps
 * @example - <CcfDigitalTagAddIcon />
 * @returns SVG of digital tag icon
 */
export function CcfDigitalTagAddIcon(props) {
    const theme = useTheme();
    const { count } = props;
    return (_jsxs(SvgIcon, Object.assign({ xmlns: "http://www.w3.org/2000/svg", width: "18", height: "14", viewBox: "0 0 20 18", fill: "none" }, { children: [_jsx("path", { d: "M17.414 7.69534L14.0781 12.6953C13.9643 12.8666 13.8098 13.0069 13.6285 13.1037C13.4471 13.2005 13.2446 13.2508 13.039 13.25H0.87494C0.762371 13.2512 0.651682 13.2211 0.55515 13.1632C0.458618 13.1053 0.380017 13.0218 0.328065 12.9219C0.273762 12.823 0.247268 12.7112 0.251395 12.5984C0.255521 12.4856 0.290115 12.376 0.351502 12.2813L3.87494 7.00003L0.351502 1.71878C0.290115 1.62407 0.255521 1.5145 0.251395 1.4017C0.247268 1.28891 0.273762 1.1771 0.328065 1.07816C0.380017 0.978287 0.458618 0.894759 0.55515 0.83684C0.651682 0.778921 0.762371 0.748874 0.87494 0.750032H13.039C13.2446 0.749293 13.4471 0.799582 13.6285 0.896392C13.8098 0.993202 13.9643 1.1335 14.0781 1.30472L17.414 6.30472C17.5517 6.51046 17.6252 6.75246 17.6252 7.00003C17.6252 7.24761 17.5517 7.48961 17.414 7.69534Z", fill: theme.palette.background.digitalTag }), !count && _jsx("path", { d: "M12.1999 6.60003H9.39994V3.80003H8.59994V6.60003H5.79994V7.40003H8.59994V10.2H9.39994V7.40003H12.1999V6.60003Z", fill: (props === null || props === void 0 ? void 0 : props.htmlColor) ? props.htmlColor : 'black' }), count && _jsx("text", Object.assign({ x: "5", y: "11", style: { fontSize: '10px' }, fill: (props === null || props === void 0 ? void 0 : props.htmlColor) ? props.htmlColor : 'black' }, { children: count }))] })));
}
export default CcfDigitalTagAddIcon;
//# sourceMappingURL=ccf-digital-tag-add-icon.js.map