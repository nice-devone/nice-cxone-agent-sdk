import { jsx as _jsx } from "react/jsx-runtime";
import { SvgIcon } from '@mui/material';
/**
 * Component for displaying chat svg icon
 * @param props -SvgIconProps
 * @returns chat svg icon
 * @example -<CcfChatIcon>
 */
export function CcfChatIcon(props) {
    return (_jsx(SvgIcon, Object.assign({}, props, { style: { width: '31px' } }, { children: _jsx("g", Object.assign({ id: "ic_comments" }, { children: _jsx("path", { id: "chat-inbound", d: "M129.678-42h-5.356A6.3,6.3,0,0,0,118-35.726v.108a6.3,6.3,0,0,0,6.322,6.274H126.9l5.519,3.964a.561.561,0,0,0,.59.02.545.545,0,0,0,.269-.464L132.453-30A6.252,6.252,0,0,0,136-35.615v-.108A6.3,6.3,0,0,0,129.678-42Z", transform: "translate(-118 42)", fill: "#57a0f8" }) })) })));
}
export default CcfChatIcon;
//# sourceMappingURL=ccf-chat-icon.js.map