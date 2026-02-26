import { Theme } from '@mui/material';
/**
 * @example styles for carousel component
 */
declare const ccfCarouselStyles: (theme: Theme) => {
    mainCard: {
        display: string;
        alignItems: string;
        paddingTop: string;
        paddingBottom: string;
    };
    responseText: {
        fontSize: string;
        lineHeight: string;
        color: string;
        fontWeight: string;
    };
    indicators: {
        display: string;
        justifyContent: string;
        padding: string;
        minwidth: string;
    };
    indicator: {
        height: string;
        borderRadius: string;
        background: string;
        cursor: string;
        border: string;
        display: string;
        minWidth: string;
        padding: string;
    };
    activeIndicator: {
        height: string;
        borderRadius: string;
        cursor: string;
        border: string;
        display: string;
        minWidth: string;
        background: string;
        padding: string;
    };
    card: {
        boxShadow: string;
        display: string;
        flexDirection: string;
        width: string;
    };
    cardContent: {
        boxShadow: string;
        padding: string;
        borderRadius: string;
    };
    carouselDots: {
        display: string;
        alignItems: string;
        justifyContent: string;
        height: string;
        columnGap: string;
        alignSelf: string;
        margin: string;
    };
    iconsHover: {
        '&:hover svg path': {
            fill: string;
        };
    };
    arrow: {
        minWidth: string;
    };
};
export default ccfCarouselStyles;
