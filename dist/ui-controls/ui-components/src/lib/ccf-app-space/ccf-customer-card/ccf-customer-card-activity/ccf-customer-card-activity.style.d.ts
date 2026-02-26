import { Theme } from '@mui/material';
/**
 * Styles for activityCard
 * @example activityCardCSS(theme)
 */
export declare const activityCardCSS: (theme: Theme, iconBase64string: string, isSearchConfigAvailable: boolean, isLinkable: boolean, isRelatestoInteractionAvailable: boolean, showCreateEntityButton: boolean) => string;
/**
 * CcfCustomerCard - used to display quick replies component
 * @param props -?-customerCardDetailsStyles
 * @example <customerCardDetailsStyles />
 */
declare const customerCardActivityStyles: (theme: Theme) => {
    noInformation: {
        textAlign: string;
        padding: string;
    };
    loader: {
        border: string;
        borderTop: string;
        borderRadius: string;
        width: string;
        height: string;
        animation: string;
        align: string;
        top: string;
        left: string;
        position: string;
    };
    customerCardActivityContainer: {
        height: string;
    };
};
export default customerCardActivityStyles;
