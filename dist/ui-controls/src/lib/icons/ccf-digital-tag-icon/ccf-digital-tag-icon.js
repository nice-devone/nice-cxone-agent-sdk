import { jsx as _jsx } from "react/jsx-runtime";
import { SvgIcon, useTheme } from '@mui/material';
/**
 * component used to display digital tag icon
 * @param props - SvgIconProps
 * @example - <CcfDigitalTagIcon />
 * @returns SVG of digital tag icon
 */
export function CcfDigitalTagIcon(props) {
    const theme = useTheme();
    return (_jsx(SvgIcon, Object.assign({ width: "25", viewBox: "-8 -6 32 32", height: "25", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, props, { children: _jsx("g", Object.assign({ id: "ic_dropUpArrow" }, { children: _jsx("path", { d: "M17.414 7.69528L14.0781 12.6953C13.9643 12.8665 13.8098 13.0068 13.6285 13.1036C13.4471 13.2004 13.2446 13.2507 13.039 13.25H0.87494C0.762371 13.2511 0.651682 13.2211 0.55515 13.1632C0.458618 13.1052 0.380017 13.0217 0.328065 12.9218C0.273762 12.8229 0.247268 12.7111 0.251395 12.5983C0.255521 12.4855 0.290115 12.3759 0.351502 12.2812L3.87494 6.99997L0.351502 1.71872C0.290115 1.62401 0.255521 1.51444 0.251395 1.40164C0.247268 1.28885 0.273762 1.17704 0.328065 1.0781C0.380017 0.978226 0.458618 0.894698 0.55515 0.836779C0.651682 0.77886 0.762371 0.748813 0.87494 0.749971H13.039C13.2446 0.749232 13.4471 0.799521 13.6285 0.896331C13.8098 0.993141 13.9643 1.13344 14.0781 1.30466L17.414 6.30466C17.5517 6.5104 17.6252 6.7524 17.6252 6.99997C17.6252 7.24755 17.5517 7.48954 17.414 7.69528Z", fill: theme.palette.background.digitalTag }) })) })));
}
export default CcfDigitalTagIcon;
//# sourceMappingURL=ccf-digital-tag-icon.js.map