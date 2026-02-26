import { Theme } from '@mui/material';
/**
 * style object for ccf-failed-message-delivery
 * @returns CcfFailedMessageDeliveryBannerStyle styles object
 * ```
 * @example
 * <CcfFailedMessageDeliveryBannerStyle/>
 * ```
 */
declare const CcfFailedMessageDeliveryBannerStyle: (theme: Theme) => {
    failedMessageBannerContainer: {
        display: string;
        flexDirection: string;
        alignItems: string;
        marginRight?: string | undefined;
        width: string;
    };
    failedMessageBannerWrapper: {
        [x: string]: string | {
            minWidth: string;
        };
        float: string;
        marginRight: string;
        wordBreak: string;
        minWidth: string;
        paddingLeft: string;
        marginTop: string;
        display: string;
        flexDirection: string;
        alignContent: string;
        alignItems: string;
        flexWrap: string;
    };
    failedOutBoundMessageStyle: {
        float: string;
        marginRight: string;
        color: string;
        backgroundColor: string;
        borderRadius: string;
        fontSize: string;
        padding: string;
        textAlign: string;
        letterSpacing: string;
        width: string;
        '& p': {
            margin: number;
        };
        maxWidth: string;
        wordBreak: string;
        marginLeft?: string | undefined;
    };
    failedMessageBanner: {
        float: string;
        color: string;
        backgroundColor: string;
        wordBreak: string;
        border: string;
        fontSize: string;
        fontWeight: number;
        display: string;
        flexDirection: string;
        clear: string;
        width: string;
        borderRadius: string;
        '& svg': {
            fill: string;
        };
        '& button': {
            color: string;
            textDecoration: string;
            fontSize: string;
            fontWeight: string;
        };
        padding: string | number;
        maxWidth: string;
        textAlign: string;
        letterSpacing: string;
    };
    warningIcon: {
        '& svg': {
            fill: string;
        };
    };
    buttonContainer: {
        display: string;
        padding: string;
    };
    bannerLabel: {
        padding: string;
    };
    actionWrapper: {
        padding: string;
        marginLeft: string;
    };
};
export default CcfFailedMessageDeliveryBannerStyle;
