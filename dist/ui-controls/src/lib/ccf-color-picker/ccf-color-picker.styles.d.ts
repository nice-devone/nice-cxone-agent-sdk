import { Theme } from '@mui/material';
/**
 * Styles for color picker box
 * @param theme - Theme object
 * @example ccfColorPickerStyles(theme)
 */
declare const ccfColorPickerStyles: (theme: Theme) => {
    ColorPickerContainer: {
        maxHeight: string;
    };
    ColorButton: {
        width: string;
        height: string;
        borderRadius: string;
        margin: string;
        cursor: string;
        border: string;
        '&:focus': {
            borderColor: string | undefined;
        };
    };
    ColorResetButton: {
        padding: string;
        cursor: string;
        fontSize: string;
        width: string;
        border: string;
        '&:focus': {
            borderColor: string | undefined;
        };
    };
    ColorButtonContainer: {
        display: string;
        gridTemplateColumns: string;
        justifyItems: string;
        padding: string;
        borderTop: string;
    };
    ColorPickerPopover: {
        backgroundColor: string;
        width: string;
        border: string;
    };
};
export default ccfColorPickerStyles;
