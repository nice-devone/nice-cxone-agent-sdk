import { DividerProps } from '@mui/material';
/**
 * enum for specifying whether the divider should be in horizontal/vertical
*/
export declare enum DividerOrientation {
    VERTICAL = "vertical",
    HORIZONTAL = "horizontal"
}
/**
 * enum for specifying the divider width
*/
export declare enum DividerVariant {
    FULLWIDTH = "fullWidth",
    MIDDLE = "middle",
    INSET = "inset"
}
/**
 * Interface for defining props of CcfDivider component
*/
export interface CcfDividerProps extends DividerProps {
    orientation: DividerOrientation;
    variant: DividerVariant;
    absolute?: boolean;
    light?: boolean;
    flexItem?: boolean;
    className?: string;
}
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
export declare function CcfDivider({ orientation, variant, absolute, light, flexItem, className, sx }: CcfDividerProps): JSX.Element;
export default CcfDivider;
