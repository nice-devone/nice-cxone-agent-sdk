import { jsx as _jsx } from "react/jsx-runtime";
import { SvgIcon } from '@mui/material';
/**
 * component used to display quick replies icon
 * @param props - SvgIconProps
 * @example - <CcfQuickRepliesIcon />
 * @returns SVG of quick replies icon
 */
export function CcfQuickRepliesIcon(props) {
    return (_jsx(SvgIcon, Object.assign({}, props, { children: _jsx("g", Object.assign({ id: "ic_quick_replies", width: "22", height: "25", viewBox: "0 0 22 25" }, { children: _jsx("g", Object.assign({ id: "ic_app_quickreplies", transform: "translate(-15.686 1.161)" }, { children: _jsx("path", { id: "lightning", d: "M20.8,8.8H12V0L3.2,13.2H12V22Z", transform: "translate(14.686)" }) })) })) })));
}
export default CcfQuickRepliesIcon;
//# sourceMappingURL=ccf-quick-replies-icon.js.map