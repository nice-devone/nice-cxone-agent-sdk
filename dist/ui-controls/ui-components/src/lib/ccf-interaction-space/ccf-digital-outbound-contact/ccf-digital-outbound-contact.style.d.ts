import { Theme } from '@mui/material';
/**
 * style object for ccf-digital-outbound-contact
 * @returns CcfDigitalOutboundContactStyles styles object
 * ```
 * @example
 * <CcfDigitalOutboundContactStyles/>
 * ```
 */
declare const CcfDigitalOutboundContactStyles: (theme: Theme, isAdjustHeightForVoiceContact: boolean) => {
    smsObPanel: {
        '>div:last-child>div': {
            [x: string]: string | {
                height: string;
            };
            height: string;
            display: string;
            flexDirection: string;
            justifyContent: string;
        };
    };
    gridItemHeight: {
        [x: string]: string | {
            minHeight: string;
        };
        minHeight: string;
    };
    toolbarContainer: {
        display: string;
        justifyContent: string;
        width: string;
    };
};
export default CcfDigitalOutboundContactStyles;
