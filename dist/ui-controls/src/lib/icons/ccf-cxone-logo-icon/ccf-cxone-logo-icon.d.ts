import { SvgIconProps } from '@mui/material';
interface CcfCxoneLogoIconProps extends SvgIconProps {
    logoUrl?: string;
    isMPowerLogoFeatureToggleEnabled?: boolean;
}
/**
 * CcfCxoneLogoIcon used to show Cxone logo
 * @param props - SvgIconProps
 * @example -- <CcfCxoneLogoIcon />
 */
export declare function CcfCxoneLogoIcon({ logoUrl, isMPowerLogoFeatureToggleEnabled, ...props }: CcfCxoneLogoIconProps): JSX.Element;
export default CcfCxoneLogoIcon;
