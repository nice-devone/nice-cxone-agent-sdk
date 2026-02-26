import { Theme } from '@mui/material';
/**
 * CcfAcceptRejectWrapper styles
 * @example <acceptRejectWrapperStyles />
 */
declare const acceptRejectWrapperStyles: (theme: Theme) => {
    getFooterForSmallView: {
        display: string;
        gridTemplateColumns: string;
        gap: string;
        alignItems: string;
    };
    contactControlStyle: {
        [x: string]: {
            width: string;
        };
    };
    controlPanel: {
        [x: string]: string | {
            marginTop: string;
            backgroundColor: string;
            boxShadow: string;
            borderRadius: string;
        };
        borderRadius: string;
        border: string;
        boxShadow: string;
    };
    customerName: {
        font: string;
        display: string;
        padding: string;
        textOverflow: string;
        overflow: string;
        whiteSpace: string;
    };
    cardHeader: {
        display: string;
        flexDirection: string;
    };
    channelDetail2: {
        font: string;
        color: string;
        padding: string;
        letterSpacing: string;
        overflow: string;
        textOverflow: string;
        whiteSpace: string;
    };
    skillOrQueueToolTip: {
        textOverflow: string;
        overflow: string;
        marginTop: string;
    };
    smallViewChannelDetail2: {
        color: string;
        padding: string;
        letterSpacing: string;
    };
};
export default acceptRejectWrapperStyles;
