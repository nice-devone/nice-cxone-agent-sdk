import { jsx as _jsx } from "react/jsx-runtime";
import { SvgIcon } from '@mui/material';
/**
 * This icon will be used to display Favourite agent
 * @param props - SvgIconProps
 * @example - <CcfFavouriteIcon />
 * @returns SVG of favorite icon
 */
export function CcfFavouriteIcon(props) {
    return (_jsx(SvgIcon, Object.assign({}, props, { children: _jsx("g", Object.assign({ id: 'ic_star_fill' + props.id, clipPath: "url(#clip-ic_star_fill)" }, { children: _jsx("path", { id: 'favorite' + props.id, d: "M14.45,17.745a.8.8,0,0,1-.373-.092L10,15.509,5.923,17.652a.8.8,0,0,1-1.161-.843l.779-4.541-3.3-3.216a.8.8,0,0,1,.444-1.364l4.559-.662L9.283,2.9a.832.832,0,0,1,1.434,0l2.039,4.131,4.559.662a.8.8,0,0,1,.444,1.364l-3.3,3.216.779,4.541a.8.8,0,0,1-.788.935Z", transform: "translate(2 1.885)" }) })) })));
}
export default CcfFavouriteIcon;
//# sourceMappingURL=ccf-favourite-icon.js.map