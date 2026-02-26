import { Theme } from '@mui/material';
/**
 * style object for ccf-permission-error-banner
 * @returns CcfPermissionErrorBannerStyle object
 * @example CcfPermissionErrorBannerStyle()
 */
declare const CcfPermissionErrorBannerStyle: (theme: Theme) => {
    permissionsWrapper: {
        display: string;
        justifyContent: string;
        flexDirection: string;
        alignItems: string;
        alignContent: string;
        flexWrap: string;
    };
    permissionsDeniedIcon: {
        fontSize: string;
    };
    permissionsDeniedMessage: {
        color: string;
        fontStyle: string;
        fontVariant: string;
        fontWeight: number;
        fontSize: string;
        lineHeight: string;
        textAlign: string;
    };
};
export default CcfPermissionErrorBannerStyle;
