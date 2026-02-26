/**
 * style object for ccf-translation-settings-styles
 * @returns CcfTranslationSettingsStyles object
 * ```
 * @example
 * <CcfTranslationSettingsStyles/>
 * ```
 */
const CcfTranslationSettingsStyles = () => {
    const styles = {
        checkboxLabelChecked: {
            '.MuiFormControlLabel-label': { fontSize: '.85rem', fontWeight: 'bold' },
            marginRight: 0,
        },
        checkboxLabelUnchecked: {
            '.MuiFormControlLabel-label': { fontSize: '.85rem' },
            marginRight: 0,
        },
        formGroup: {
            margin: '20px',
        },
        header: {
            fontWeight: 'bold',
        },
        closeIconButton: {
            padding: 0,
            '&:hover': {
                backgroundColor: 'transparent',
            },
        },
        select: {
            margin: '10px 0',
        },
        popover: {
            width: '16.875rem',
        },
    };
    return styles;
};
export default CcfTranslationSettingsStyles;
//# sourceMappingURL=ccf-translation-settings-styles.js.map