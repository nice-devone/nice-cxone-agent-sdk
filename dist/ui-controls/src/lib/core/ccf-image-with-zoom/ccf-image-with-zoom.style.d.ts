import { Theme } from '@mui/material';
/**
 * Styling for ccfImageWithZoomStyles
 * @returns ccfImageWithZoomStyles CSS properties as a JSON object
 * @example ccfImageWithZoomStylesStyles(theme)
*/
declare const ccfImageWithZoomStyles: (theme: Theme) => {
    widthInputCollapsed: {
        width: string;
        height: string;
    };
    widthBelowMd: {
        width: string;
        height: string;
    };
    expandedDialog: {
        [x: string]: string | {
            top: string;
            left: string;
            maxWidth?: undefined;
            width?: undefined;
            height?: undefined;
            boxShadow?: undefined;
            background?: undefined;
        } | {
            maxWidth: string;
            width: string;
            height: string;
            boxShadow: string;
            background: string;
            top?: undefined;
            left?: undefined;
        };
        position: string;
        top: string;
        right: string;
        bottom: string;
        left: string;
        overflowY: string;
        backgroundColor: string;
        width: string;
        height: string;
        '& .MuiPaper-root': {
            maxWidth: string;
            width: string;
            height: string;
            boxShadow: string;
            background: string;
        };
        '& .MuiBackdrop-root': {
            left: string;
            top: string;
        };
    };
    closeDialog: {
        marginLeft: string;
        color: string;
    };
    dialogImage: {
        display: string;
        alignItems: string;
        alignSelf: string;
    };
    dialogActions: {
        justifyContent: string;
    };
    dialogButtons: {
        border: string;
        background: string;
    };
    zoomOutButton: {
        paddingTop: string;
        color: string;
    };
    zoomInButton: {
        color: string;
    };
};
export default ccfImageWithZoomStyles;
