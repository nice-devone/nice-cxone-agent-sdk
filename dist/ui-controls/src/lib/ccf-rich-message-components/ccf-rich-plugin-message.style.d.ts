import { Theme } from '@mui/material';
/**
 * renders the style for rich message
 * @param props - Theme
 * @example <CcfRichPluginMessageStyle />
 * @returns return the style for rich message
 */
export declare const CcfRichPluginMessageStyle: (theme: Theme) => {
    container: {
        backgroundColor: string | undefined;
        color: string;
        borderRadius: string;
        boxShadow: string;
    };
    headerBox: {
        display: string;
        justifyContent: string;
        alignItems: string;
        backgroundColor: string;
        borderRadius: string;
        lineHeight: string;
        paddingTop: string;
    };
    title: {
        padding: string;
        fontWeight: string;
        fontSize: string;
        backgroundColor: string;
        borderRadius: string;
        lineHeight: string;
    };
    list: {
        padding: string;
    };
    listItem: {
        display: string;
        justifyContent: string;
        padding: string;
    };
    button: {
        width: string;
        border: string;
        borderRadius: string;
        color: string;
        lineHeight: string;
        padding: string;
        '&.Mui-disabled': {
            backgroundColor: string;
            color: string;
            border: string;
        };
    };
    buttonText: {
        fontSize: string;
        fontWeight: string;
        lineHeight: string;
    };
    subHeader: {
        display: string;
    };
    subHeaderText: {
        lineHeight: string;
        fontSize: string;
        fontWeight: string;
    };
    divider: {
        borderBottomWidth: string;
    };
};
