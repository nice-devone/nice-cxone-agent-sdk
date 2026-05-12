import { Theme } from '@mui/material';
/**
 * CcfCustomerCard - used to display quick replies component
 * @param props -?-customerCardDetailsStyles
 * @example <customerCardContactHistoryStyles />
 */
declare const agentContactHistoryStyles: (theme: Theme) => {
    detailsMenu: {
        [x: string]: {
            overflowY: string;
            maxHeight: string;
            display: string;
            flexDirection: string;
        };
    };
    ccfContactHistoryAdaptiveCardContainer: {
        alignItems: string;
        marginTop: string;
        padding: string;
    };
    noRecordClass: {
        width: string;
        height: string;
        align: string;
        top: string;
        left: string;
        position: string;
    };
};
/**
 * Create agent contact history adaptive cards CSS
 * @param theme - MUI theme object
 * @example
 */
export declare const contactHistoryAdaptiveCardCSS: (theme: Theme) => string;
export default agentContactHistoryStyles;
