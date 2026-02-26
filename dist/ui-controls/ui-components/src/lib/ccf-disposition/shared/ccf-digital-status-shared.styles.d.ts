/**
 * @example - styles for digital status shared
 * @param theme - color theme
 * @param renderedInOutcomesPanel - This determines which size we want to render to
 * @param colorFinder - determines color for status/background/border.
 */
declare const CcfDigitalStatusSharedStyles: (largeComponent: boolean, colorFinder: (hover?: boolean) => string) => {
    menu: {
        '& .MuiOutlinedInput-root': {
            padding: string;
            marginTop: string;
            marginBottom: string;
            background: string;
            width: string;
            height: string;
            fontSize: string;
            heightalign: string;
            fontWeight: number;
            '&:hover': {
                background: string;
            };
            '&.Mui-disabled:hover': {
                background: string;
            };
            '.MuiOutlinedInput-notchedOutline': {
                borderColor: string;
                borderWidth: string;
            };
        };
    };
    menuList: {
        height: string;
        paddingTop: number;
    };
    statusHelperText: {
        fontSize: string;
        fontWeight: number;
        margin: number;
    };
    statusTextStartAdornment: {
        content: string;
        display: string;
        position: string;
        width: string;
        height: string;
        borderRadius: string;
    };
};
export default CcfDigitalStatusSharedStyles;
