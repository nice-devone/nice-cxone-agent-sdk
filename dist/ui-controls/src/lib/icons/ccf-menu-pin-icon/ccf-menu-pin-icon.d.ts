import { SvgIconProps } from '@mui/material';
import { IconVariant } from '@nice-devone/common-sdk';
/**
 * Props for the `CcfMenuPinIcon` component.
 * Extends MUI's SvgIconProps, allowing all standard icon properties.
 */
interface CcfMenuPinIconProps extends SvgIconProps {
    /** Color to fill the icon */
    fillColor?: string;
    /** Visual variant of the icon */
    variant?: IconVariant;
}
/**
 * Displays a pin icon.
 * @example <CcfMenuPinIcon fillColor="#005C99" variant="outlined" />
 */
export declare function CcfMenuPinIcon({ fillColor, variant, ...props }: CcfMenuPinIconProps): JSX.Element;
export default CcfMenuPinIcon;
