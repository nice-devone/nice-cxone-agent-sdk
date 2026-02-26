import { Theme } from '@mui/material';
/**
 * Styles for activityCard of pin interaction
 * @example customerCardPinRecordsCSS(theme)
 */
export declare const customerCardPinRecordsCSS: (theme: Theme, iconBase64string: string) => string;
/**
 * CcfCustomerCardPinRecords - CSS for cards showing pin records.
 * @param props -?-customerCardPinRecordsStyles
 * @example <customerCardPinRecordsStyles />
 */
declare const customerCardPinRecordsStyles: (theme: Theme) => {
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
    customerCardPinInteractionContainer: {
        height: string;
        position: string;
    };
};
export default customerCardPinRecordsStyles;
