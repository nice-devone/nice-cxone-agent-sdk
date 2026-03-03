import { jsx as _jsx } from "react/jsx-runtime";
import { SvgIcon } from '@mui/material';
/**
 * component used to display not a favourite icon in agent state
 * @param props - SvgIconProps
 * @example - <CcfNotFavoriteIcon />
 * @returns SVG of not a favourite icon
 */
export function CcfNotFavoriteIcon(props) {
    return (_jsx(SvgIcon, Object.assign({}, props, { children: _jsx("g", Object.assign({ clipPath: "url(#clip-ic_star_outline)" }, { children: _jsx("g", Object.assign({ id: 'Display_Favorite' + props.id, "data-name": "Display Favorite", transform: "translate(4.002 4.37)" }, { children: _jsx("path", { id: 'favorite' + props.id, d: "M17.979,8.215a.8.8,0,0,0-.687-.535l-4.546-.663-2.037-4.13a.8.8,0,0,0-1.438,0L7.234,7.009,2.688,7.68a.787.787,0,0,0-.447,1.342l3.3,3.2-.8,4.538a.8.8,0,0,0,1.174.863L9.99,15.485l4.074,2.133a.743.743,0,0,0,.367.1.8.8,0,0,0,.791-.951l-.8-4.538,3.3-3.2A.8.8,0,0,0,17.979,8.215Zm-4.913,3.2a.8.8,0,0,0-.232.7l.575,3.355-3-1.6a.847.847,0,0,0-.751,0l-3,1.6.575-3.355a.8.8,0,0,0-.232-.7l-2.4-2.4,3.363-.487a.8.8,0,0,0,.607-.439L9.99,5.044l1.5,3.052a.8.8,0,0,0,.607.439l3.363.487Z", transform: "translate(-2.006 -2.436)" }) })) })) })));
}
export default CcfNotFavoriteIcon;
//# sourceMappingURL=ccf-not-favorite-icon.js.map