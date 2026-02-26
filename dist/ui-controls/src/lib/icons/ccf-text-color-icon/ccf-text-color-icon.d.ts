import { SvgIconProps } from '@mui/material';
export interface CcfTextColorIconProps extends SvgIconProps {
    /**
     * @remarks Used to set data-testid for the icon
     */
    dataTestId?: string;
}
/**
 * Component for displaying textColor svg icon
 * @param props -SvgIconProps
 * @returns textColor svg icon
 * @example -<CcfTextColorIcon>
 */
export declare function CcfTextColorIcon(props: CcfTextColorIconProps): JSX.Element;
export default CcfTextColorIcon;
