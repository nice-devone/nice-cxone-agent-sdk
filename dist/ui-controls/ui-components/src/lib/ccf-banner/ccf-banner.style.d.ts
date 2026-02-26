import { Theme } from '@mui/material';
/**
 * style object for ccf-banner
 * @returns CcfBannerStyles object
 * ```
 * @example
 * <CcfBannerStyles/>
 * ```
 */
declare const CcfBannerStyles: (theme: Theme) => {
    CcfBannerContentContainer: {
        display: string;
    };
    CcfBannerContainer: {
        border: string;
        borderRadius: string;
        display: string;
        flexDirection: string;
        margin: string;
        padding: string;
    };
    CCfDeliveryErrorContainer: {
        border: string;
        backgroundColor: string;
    };
    CcfBannerText: {
        color: string;
        fontSize: string;
        fontWeight: string;
        marginLeft: string;
        marginTop: string;
    };
    deliveryErrorStyle: {
        fontWeight: number;
        marginLeft: number;
    };
    bannerIcon: {
        alignContent: string;
    };
};
export default CcfBannerStyles;
