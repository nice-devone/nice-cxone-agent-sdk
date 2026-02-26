import { Theme } from '@mui/material';
/**
 * renders the style for multimedia message
 * @param props - Theme
 * @example <CcfMultimediaStyle />
 * @returns return the style for multimedia message
 */
export declare const CcfMultimediaStyle: (theme: Theme) => {
    multimediaContainer: {
        padding: string;
        backgroundColor: string;
        display: string;
    };
    templateContainer: {
        padding: string;
        borderRadius: string;
        display: string;
        position: string;
        background: string;
    };
    videoControl: {
        width: string;
        height: string;
        objectFit: string;
        display: string;
        borderRadius: string;
    };
    bodyContent: {
        color: string;
        padding: string;
        display: string;
        paddingLeft: string;
    };
    pdfLink: {
        color: string;
        '&hover': {
            color: string;
        };
    };
    pdfLabel: {
        textOverflow: string;
        whiteSpace: string;
        overflow: string;
        paddingLeft: string;
        paddingRight: string;
    };
    templateMessageRoot: {
        padding: string;
        backgroundColor: string;
        maxWidth: string;
        marginRight: number;
    };
    templateTextStyle: {
        fontSize: string;
        width: string;
        textAlign: string;
    };
    pdfHeader: {
        fontSize: string;
        display: string;
    };
    menuStyle: {
        width: string;
    };
};
