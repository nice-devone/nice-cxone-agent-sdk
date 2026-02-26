import { Theme } from '@mui/material';
/**
 * renders the style for rich message
 * @param props - Theme
 * @example <CcfRichContactMessageStyle />
 * @returns return the style for rich message
 */
export declare const CcfRichLinkStyle: (theme: Theme) => {
    card: {
        borderRadius: string;
        backgroundColor: string;
    };
    cardContent: {
        display: string;
        paddingBottom: string;
    };
    media: {
        minHeight: string;
        backgroundSize: string;
        alineItems: string;
    };
    title: {
        fontWeight: string;
        fontSize: string;
        lineHeight: string;
        fontStyle: string;
        textTransform: string;
    };
    link: {
        fontSize: string;
        fontWeight: string;
        '&:hover': {
            textDecoration: string;
        };
    };
    headerBox: {
        display: string;
        justifyContent: string;
        alignItems: string;
        paddingTop: string;
    };
};
