import { SvgIconProps } from '@mui/material';
interface CcfCxoneLogoIconProps extends SvgIconProps {
    logoUrl?: string;
    isLogoFTEnabled?: boolean;
}
/**
 * CcfCxoneLogoIcon used to show Cxone logo
 * @param props - SvgIconProps
 * @example -- <CcfCxoneLogoIcon />
 */
export declare function CcfCxoneLogoIcon({ logoUrl, isLogoFTEnabled, ...props }: CcfCxoneLogoIconProps): JSX.Element | null;
export default CcfCxoneLogoIcon;
