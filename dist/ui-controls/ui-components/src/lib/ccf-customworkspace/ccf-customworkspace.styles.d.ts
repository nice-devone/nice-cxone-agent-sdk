import { Theme } from '@mui/material';
/**
 * Styling for custom workspace iframe component
 * @returns custom workspace component CSS properties as a JSON object
 * @example customworkspaceStyles
*/
declare const customworkspaceStyles: (theme: Theme, selectedMenuAppSpace: string, selectedMenu: string) => {
    iframeContainer: {
        height: string;
        width: string;
        border: string;
        boxShadow: string;
        borderRadius: string;
        '.customworkspace-iframe': {
            border: string;
            height: string;
        };
        '.messageText': {
            fontSize: string;
            fontWeight: string;
            color: string;
            lineHeight: string;
            padding: string;
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
    };
    customWorkspaceHeader: {
        borderBottom: string;
    };
    customDropdown: {
        m: number;
        minWidth: number;
        minHeight: number;
        marginTop: number;
        '.MuiSelect-select:focus': {
            backgroundColor: string;
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
export default customworkspaceStyles;
