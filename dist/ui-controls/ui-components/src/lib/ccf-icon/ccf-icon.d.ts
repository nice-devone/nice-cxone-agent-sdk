import { SvgIconProps } from '@mui/material';
export interface CcfIconProps extends SvgIconProps {
    iconName?: string;
    size?: string;
    attachmentIcon?: string;
    customStyle?: any;
    svgIconStyles?: SvgIconProps;
}
export declare const CHANNEL_ICON_SIZE: {
    SMALL: string;
    MEDIUM: string;
    LARGE: string;
    EXTRA_SMALL: string;
    REM1: string;
};
export declare const ATTACHMENT_ICON_SIZE: {
    SMALL: string;
    MEDIUM: string;
    LARGE: string;
    EXTRA_SMALL: string;
};
/**
 * CcfIcon used to digital channel icon
 * @param props - CcfIcon
 * @example -- <CcfIcon />
 */
export declare function CcfIcon(props: CcfIconProps): JSX.Element;
export default CcfIcon;
