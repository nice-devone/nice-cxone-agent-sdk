import { Theme } from '@mui/material';
/**
 * Styling for external app iframes
 * @returns external app CSS properties as a JSON object
 * @example externalAppStyles
 */
declare const externalAppStyles: (theme: Theme) => {
    iframeContainer: {
        height: string;
        width: string;
        border: string;
        borderRadius: string;
        '.wem-iframe': {
            border: string;
            boxShadow: string;
        };
        '.messageText': {
            fontSize: string;
            fontWeight: string;
            color: string;
            lineHeight: string;
            padding: string;
            textAlign: string;
        };
        '.link_text': {
            display: string;
            alignItems: string;
            justifyContent: string;
        };
        '.link': {
            marginRight: string;
            cursor: string;
            borderBottom: string;
        };
        '& label': {
            color: string;
            marginLeft: string;
        };
    };
    openinnewtabIcon: {
        marginRight: number;
        marginTop: number;
    };
    openinnewTabButton: {
        width: number;
        border: string;
        '&:focus': {
            border: string;
        };
    };
    openInNewWindowContainer: {
        display: string;
        flexDirection: string;
        justifyContent: string;
        alignItems: string;
        margin: string;
        padding: string;
        textAlign: string;
    };
    openInNewWindowIcon: {
        padding: string;
    };
    openInNewWindowContent: {
        padding: string;
    };
};
export default externalAppStyles;
