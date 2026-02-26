import { SvgIconProps } from '@mui/material';
export interface CcfDigitalTagAddIconProps extends Omit<SvgIconProps, ''> {
    count?: number;
}
/**
 * component used to display digital tag icon
 * @param props - SvgIconProps
 * @example - <CcfDigitalTagAddIcon />
 * @returns SVG of digital tag icon
 */
export declare function CcfDigitalTagAddIcon(props: CcfDigitalTagAddIconProps): JSX.Element;
export default CcfDigitalTagAddIcon;
