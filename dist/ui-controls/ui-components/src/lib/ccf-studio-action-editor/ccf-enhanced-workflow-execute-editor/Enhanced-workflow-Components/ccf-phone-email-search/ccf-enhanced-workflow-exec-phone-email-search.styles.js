/**
 * Styling for Advance workflow execute editor custom search Screen Component
 * @returns CcfEnhancedPrimaryPhoneEmailSearchStyles CSS properties as a JSON object
 * @example CcfEnhancedPrimaryPhoneEmailSearchStyles
 */
const CcfEnhancedPrimaryPhoneEmailSearchStyles = (theme) => {
    const styles = {
        mainContainer: {
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            overflow: 'auto',
        },
        phoneEmailInputContainer: {
            display: 'flex',
            justifyContent: 'flex-start',
            borderRadius: '0',
            flexDirection: 'column',
            gap: '0.25rem',
            maxWidth: '18.75rem',
            '& input': {
                padding: '0.4rem 0.87rem',
            },
        },
        infoContainer: {
            padding: '0.74rem 2rem 0 1.52rem',
            marginBottom: '2rem',
        },
        inputPlaceHolder: {
            height: '2.25rem',
            '& .MuiOutlinedInput-root': {
                '& input::placeholder': {
                    color: theme.palette.text.filter,
                    opacity: '1',
                    textOverflow: 'ellipsis',
                    fontSize: '0.81rem',
                    fontStyle: 'normal',
                    fontWeight: 400,
                    lineHeight: 'normal',
                },
            },
        },
        labelTypography: {
            textAlign: 'left',
            color: theme.palette.text.secondary,
            fontSize: '0.81rem',
            lineHeight: '1rem',
        },
    };
    return styles;
};
export default CcfEnhancedPrimaryPhoneEmailSearchStyles;
//# sourceMappingURL=ccf-enhanced-workflow-exec-phone-email-search.styles.js.map