/**
 * style object for ccf-translation-settings-styles
 * @returns CcfTranslationSettingsStyles object
 * ```
 * @example
 * <CcfTranslationSettingsStyles/>
 * ```
 */
declare const CcfTranslationSettingsStyles: () => {
    checkboxLabelChecked: {
        '.MuiFormControlLabel-label': {
            fontSize: string;
            fontWeight: string;
        };
        marginRight: number;
    };
    checkboxLabelUnchecked: {
        '.MuiFormControlLabel-label': {
            fontSize: string;
        };
        marginRight: number;
    };
    formGroup: {
        margin: string;
    };
    header: {
        fontWeight: string;
    };
    closeIconButton: {
        padding: number;
        '&:hover': {
            backgroundColor: string;
        };
    };
    select: {
        margin: string;
    };
    popover: {
        width: string;
    };
};
export default CcfTranslationSettingsStyles;
