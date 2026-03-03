import { Theme } from '@mui/material';
/**
 * renders the style for rich time picker message
 * @param props - Theme
 * @example <CcfRichTimePickerMessageStyle />
 * @returns return the style for rich message
 */
export declare const CcfRichTimePickerMessageStyle: (theme: Theme) => {
    container: {
        color: string;
        minWidth: string;
        borderRadius: string;
        border: string;
        paddingBottom: string;
        boxShadow: string;
    };
    header: {
        padding: string;
        backgroundColor: string;
        borderBottom: string;
        borderRadius: string;
    };
    headerBox: {
        display: string;
        justifyContent: string;
        alignItems: string;
    };
    title: {
        fontWeight: string;
        fontSize: string;
        lineHeight: string;
        fontStyle: string;
        textTransform: string;
    };
    subTitle: {
        fontSize: string;
        fontStyle: string;
        fontWeight: string;
        lineHeight: string;
    };
    date: {
        color: string;
        paddingBottom: string;
        fontSize: string;
        fontStyle: string;
        fontWeight: string;
    };
    timeSlotContainer: {
        padding: string;
    };
    chip: {
        color: string;
        fontWeight: string;
        fontSize: string;
        margin: string;
        backgroundColor: string;
    };
};
