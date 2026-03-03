import { Theme } from '@mui/material';
/**
 * renders the style for rich message
 * @param props - Theme
 * @example <CcfRichContactMessageStyle />
 * @returns return the style for rich message
 */
export declare const CcfRichListPickerStyle: (theme: Theme) => {
    container: {
        backgroundColor: string | undefined;
        color: string;
        borderRadius: string;
        boxShadow: string;
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
    };
    itemText: {
        display: string;
        alignItems: string;
    };
    itemTextPrimary: {
        display: string;
        alignItems: string;
        fontWeight: string;
        fontSize: string;
        lineHeight: string;
    };
    itemTextSecondary: {
        fontWeight: string;
        fontSize: string;
        lineHeight: string;
    };
    icon: {
        width: string;
        height: string;
        marginRight: string;
    };
    divider: {
        borderBottomWidth: string;
    };
    radioButton: {
        color: string;
    };
    titleBox: {
        backgroundColor: string;
        display: string;
        justifyContent: string;
        alignItems: string;
        borderRadius: string;
        lineHeight: string;
        paddingTop: string;
    };
};
