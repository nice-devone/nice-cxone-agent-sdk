import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { SvgIcon } from '@mui/material';
import { useTranslator } from '../../ccf-translator/ccf-translator';
/**
 * CcfDigitalEmailIcon used to disply whats app icon in the contact card panel
 * @param props - SvgIconProps
 * @example -- <CcfDigitalEmailIcon />
 */
export function CcfDigitalEmailIcon(props) {
    const { iconName, fontSize } = props;
    const [translate] = useTranslator();
    /**
     * Used to return SVG icon based on channel and direction
     * ```
     * @example renderEmailIcon()
     * ```
     */
    const renderEmailIcon = () => {
        switch (iconName) {
            case 'EMAIL_IB':
                return (_jsxs(SvgIcon, Object.assign({ viewBox: "0 0 26 13", style: { fontSize: fontSize }, id: iconName, "aria-labelledby": 'EMAIL_IB', "aria-hidden": "false" }, { children: [_jsx("title", Object.assign({ id: 'EMAIL_IB' }, { children: `${translate('inbound')} Email` })), _jsx("path", { d: "M25.0965 0.453429C24.8565 0.281999 24.6165 0.196289 24.2965 0.196289H11.4965C11.1765 0.196289 10.9365 0.281999 10.6965 0.453429L17.8965 5.2534L25.0965 0.453429Z", fill: "#E6258D" }), _jsx("path", { d: "M25.8965 1.91052L18.2965 6.96764C18.2165 6.96764 18.0565 7.05334 17.8965 7.05334C17.7365 7.05334 17.5765 6.96764 17.4965 6.88194L9.89648 1.91052V10.4819C9.89648 11.4248 10.6165 12.1962 11.4965 12.1962H24.2965C25.1765 12.1962 25.8965 11.4248 25.8965 10.4819V1.91052Z", fill: "#E6258D" }), _jsx("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M5.12649 1.19629C5.12649 0.644009 4.67877 0.196289 4.12649 0.196289C3.5742 0.196289 3.12649 0.644009 3.12649 1.19629V7.3965H1.19699C0.957966 7.3965 0.814931 7.6624 0.94665 7.8618L3.88645 12.3133C4.00572 12.4939 4.27114 12.4926 4.38868 12.3109L7.2681 7.8594C7.39722 7.6598 7.25393 7.3965 7.0162 7.3965H5.12649V1.19629Z", fill: "#E6258D" })] })));
            case 'EMAIL_OB':
                return (_jsxs(SvgIcon, Object.assign({ viewBox: "0 0 26 13", style: { fontSize: fontSize }, id: iconName, "aria-labelledby": 'EMAIL_OB', "aria-hidden": "false" }, { children: [_jsx("title", Object.assign({ id: 'EMAIL_OB' }, { children: `${translate('outbound')} Email` })), _jsx("path", { d: "M25.0965 0.453429C24.8565 0.282009 24.6165 0.196289 24.2965 0.196289H11.4965C11.1765 0.196289 10.9365 0.282009 10.6965 0.453429L17.8965 5.25347L25.0965 0.453429Z", fill: "#E6258D" }), _jsx("path", { d: "M25.8965 1.91052L18.2965 6.96761C18.2165 6.96761 18.0565 7.05341 17.8965 7.05341C17.7365 7.05341 17.5765 6.96761 17.4965 6.88191L9.89648 1.91052V10.4819C9.89648 11.4248 10.6165 12.1962 11.4965 12.1962H24.2965C25.1765 12.1962 25.8965 11.4248 25.8965 10.4819V1.91052Z", fill: "#E6258D" }), _jsx("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M3.0867 11.448C3.0867 12.0003 3.53441 12.448 4.0867 12.448C4.63898 12.448 5.0867 12.0003 5.0867 11.448V5.24779H7.0162C7.25522 5.24779 7.39825 4.98189 7.26653 4.78244L4.32673 0.33096C4.20747 0.15037 3.94204 0.15164 3.8245 0.33335L0.945082 4.78483C0.815964 4.98444 0.959246 5.24779 1.19698 5.24779H3.0867V11.448Z", fill: "#E6258D" })] })));
            case 'EMAIL':
                return (_jsxs(SvgIcon, Object.assign({ viewBox: "0 0 26 26", style: { fontSize: fontSize } }, { children: [_jsx("path", { d: "M20.4964 6.87104C20.2564 6.69961 20.0164 6.61389 19.6964 6.61389H6.89644C6.57644 6.61389 6.33644 6.69961 6.09644 6.87104L13.2964 11.671L20.4964 6.87104Z", fill: "#E6258D" }), _jsx("path", { d: "M21.2964 8.32825L13.6964 13.3854C13.6164 13.3854 13.4564 13.4711 13.2964 13.4711C13.1364 13.4711 12.9764 13.3854 12.8964 13.2997L5.29639 8.32825V16.8997C5.29639 17.8425 6.01639 18.614 6.89639 18.614H19.6964C20.5764 18.614 21.2964 17.8425 21.2964 16.8997V8.32825Z", fill: "#E6258D" })] })));
            default:
                return (_jsxs(SvgIcon, Object.assign({ viewBox: "0 0 26 26", style: { fontSize: fontSize } }, { children: [_jsx("path", { d: "M20.4964 6.87104C20.2564 6.69961 20.0164 6.61389 19.6964 6.61389H6.89644C6.57644 6.61389 6.33644 6.69961 6.09644 6.87104L13.2964 11.671L20.4964 6.87104Z", fill: "#E6258D" }), _jsx("path", { d: "M21.2964 8.32825L13.6964 13.3854C13.6164 13.3854 13.4564 13.4711 13.2964 13.4711C13.1364 13.4711 12.9764 13.3854 12.8964 13.2997L5.29639 8.32825V16.8997C5.29639 17.8425 6.01639 18.614 6.89639 18.614H19.6964C20.5764 18.614 21.2964 17.8425 21.2964 16.8997V8.32825Z", fill: "#E6258D" })] })));
        }
    };
    return renderEmailIcon();
}
export default CcfDigitalEmailIcon;
//# sourceMappingURL=ccf-digital-email-icon.js.map