import { Theme } from '@mui/material';
/**
 * styles for email header component
 * @example CcfContactEmailHeaderStyles(theme)
 */
declare const CcfContactEmailHeaderStyles: (theme: Theme) => {
    header: {
        background: string;
        opacity: number;
        width: string;
        padding: string;
        borderRadius: string;
    };
    senderDetails: {
        '& > div': {
            display: string;
            height: string;
        };
    };
    accordionContent: {
        [x: string]: string | number | {
            maxWidth: string;
        };
        textAlign: string;
        font: string;
        letterSpacing: number;
        color: string;
        alignItems: string;
        width: string;
        textOverflow: string;
        whiteSpace: string;
        overflow: string;
    };
    accordionTime: {
        textAlign: string;
        font: string;
        letterSpacing: number;
        color: string;
        alignItems: string;
        marginLeft: string;
        textOverflow: string;
        whiteSpace: string;
        overflow: string;
        textAlignLast: string;
    };
    viewButton: {
        border: string;
        background: string;
        color: string;
        padding: number;
        display: string;
        alignItems: string;
        cursor: string;
    };
    boxAlignment: {
        width: string;
        textAlign: string;
        marginTop: string;
        overflow: string;
        textOverflow: string;
        color: string;
        marginLeft: string;
    };
    accordionReceipientContainer: {
        display: string;
        flexDirection: string;
    };
    upArrow: {
        transform: string;
    };
    subject: {
        width: string;
    };
};
export default CcfContactEmailHeaderStyles;
