import { SvgIconProps, SxProps, Theme } from '@mui/material';
export interface CcfInfoIconProps extends SvgIconProps {
    htmlColor?: string;
    sx?: SxProps<Theme>;
}
/**
 * component used to display info icon
 * @param props - CcfInfoIconProps
 * @example - <CcfInfoIcon />
 * @returns SVG of info icon
 */
export declare function CcfInfoIcon({ sx, ...props }: CcfInfoIconProps): JSX.Element;
export default CcfInfoIcon;
