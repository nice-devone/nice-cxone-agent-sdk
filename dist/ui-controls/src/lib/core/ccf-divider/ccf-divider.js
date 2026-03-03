import { jsx as _jsx } from "react/jsx-runtime";
import { Divider } from '@mui/material';
/**
 * enum for specifying whether the divider should be in horizontal/vertical
*/
export var DividerOrientation;
(function (DividerOrientation) {
    DividerOrientation["VERTICAL"] = "vertical";
    DividerOrientation["HORIZONTAL"] = "horizontal";
})(DividerOrientation || (DividerOrientation = {}));
/**
 * enum for specifying the divider width
*/
export var DividerVariant;
(function (DividerVariant) {
    DividerVariant["FULLWIDTH"] = "fullWidth";
    DividerVariant["MIDDLE"] = "middle";
    DividerVariant["INSET"] = "inset";
})(DividerVariant || (DividerVariant = {}));
/**
 * Component used to display divider
 * @param orientaion - DividerOrientation
 * @param variant - DividerVariant
 * @param absolute - boolean
 * @param light - boolean
 * @param flexItem - boolean it's mainly for vertical divider
 * @param className - component class
 * @example <CcfDivider />
 * @returns divider
 */
export function CcfDivider({ orientation = DividerOrientation.HORIZONTAL, variant = DividerVariant.FULLWIDTH, absolute = false, light = false, flexItem = false, className = '', sx = {} }) {
    return (_jsx(Divider, { orientation: orientation, variant: variant, absolute: absolute, light: light, flexItem: flexItem, className: className, sx: Object.assign({}, sx) }));
}
export default CcfDivider;
//# sourceMappingURL=ccf-divider.js.map