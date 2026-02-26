/**
 * Styling for Advance workflow execute editor custom search Screen Component
 * @returns CcfEnhancedWECustomSearchStyles CSS properties as a JSON object
 * @example CcfEnhancedWECustomSearchStyles
 */
const CcfEnhancedWECustomSearchStyles = (theme) => {
    const styles = {
        mainContainer: {
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            overflow: 'auto',
        },
        informationContainer: {
            display: 'flex',
            flexDirection: 'row',
            gap: '0.5rem',
            alignItems: 'center',
            flexWrap: 'wrap',
        },
        operatorContainer: {
            display: 'flex',
            flexDirection: 'column',
            width: '6.25rem',
        },
        variablesContainer: {
            display: 'flex',
            flexDirection: 'column',
        },
        headingTypography: {
            fontSize: '0.75rem',
            fontWeight: '400',
            lineHeight: '1rem',
            textAlign: 'left',
            color: theme.palette.text.header,
        },
        contentTypography: {
            fontSize: '0.87rem',
            fontWeight: '600',
            lineHeight: '0.87rem',
            textAlign: 'left',
            color: theme.palette.text.contrastText,
        },
        testInputContainer: {
            maxWidth: '18.75rem',
            gap: '0.25rem',
            display: 'flex',
            flexDirection: 'column',
            '& input': {
                padding: '0.4rem 0.87rem',
            },
        },
        labelTypography: {
            textAlign: 'left',
            color: theme.palette.text.secondary,
            fontSize: '0.81rem',
            lineHeight: '1rem',
        },
        paramContainer: {
            display: 'flex',
            flexDirection: 'column',
            height: '4.75rem',
        },
        variablesRow: {
            display: 'flex',
            flexDirection: 'row',
            gap: '0.5rem',
        },
        fieldContainer: {
            display: 'flex',
            flexDirection: 'column',
            width: {
                xs: '25%',
                sm: '27%',
                md: '42.5%',
                lg: '42.5%',
            },
        },
        iconStyle: {
            width: '0',
            height: '5.1rem',
            top: '11.8rem',
            left: '26.7rem',
            gap: '0rem',
            border: `0.06rem solid ${theme.palette.background.charcoleGrey}`,
            opacity: '0rem',
            mx: {
                xs: '0.25rem',
                sm: '0.5rem',
                md: '1rem',
                lg: '1.56rem',
            },
        },
        configWrapper: {
            padding: '0.74rem 2rem 0 1.52rem',
            marginBottom: '2.66rem',
        },
    };
    return styles;
};
export default CcfEnhancedWECustomSearchStyles;
//# sourceMappingURL=ccf-enhanced-workflow-exec-custom-search.styles.js.map