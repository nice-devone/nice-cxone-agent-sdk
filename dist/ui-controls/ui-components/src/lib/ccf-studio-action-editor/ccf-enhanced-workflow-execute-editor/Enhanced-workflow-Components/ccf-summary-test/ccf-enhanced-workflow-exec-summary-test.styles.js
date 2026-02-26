/**
 * Styling for Enhanced workflow execute editor Automatic Manual Create Test Summary component
 * @returns CcfEnhancedWESummaryTestStyles CSS properties as a JSON object
 * @example CcfEnhancedWESummaryTestStyles
*/
const CcfEnhancedWESummaryTestStyles = (theme) => {
    const styles = {
        mainContainer: {
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            overflow: 'hidden',
        },
        headingContainer: {
            display: 'flex',
            padding: '0.875rem 1rem 1.2rem 1rem',
            borderBottom: `0.063rem solid ${theme.palette.background.charcoleGrey}`,
            height: '3.96rem',
            justifyContent: 'space-between',
        },
        pageHeading: {
            fontSize: '0.813rem',
            fontWeight: '600',
            lineHeight: '1.37rem',
            textAlign: 'left',
            display: 'flex',
            justifyContent: 'flex-start',
        },
        backButton: {
            padding: '0.25rem',
            height: '1.25rem',
            buttonTypography: {
                textTransform: 'none',
                fontSize: '0.688rem',
                fontWeight: '600',
                lineHeight: '0.75rem',
                textAlign: 'center',
                color: theme.palette.text.searchTitle,
            },
            iconStyle: {
                width: '0.75rem',
                height: '0.75rem',
                marginRight: '0.25rem',
            },
        },
        bottomSectionWrapper: {
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            minHeight: 0,
            overflowY: 'auto',
            overflowX: 'hidden',
            padding: '1.8rem 1.33rem ',
        },
        configurationContainer: {
            display: 'flex',
            flexDirection: 'column',
            marginRight: '2rem',
            gap: '0.5rem',
        },
        informationContainer: {
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            margin: '0.313rem',
        },
        paramContainer: {
            display: 'flex',
            flexDirection: 'column',
            height: '4.75rem',
            width: '12.5rem',
        },
        contentTypography: {
            fontSize: '0.87rem',
            fontWeight: '600',
            lineHeight: '0.87rem',
            textAlign: 'left',
            color: theme.palette.text.contrastText,
            margin: '0.313rem 0 0.625rem 0',
        },
        headingTypography: {
            fontSize: '0.75rem',
            fontWeight: '400',
            lineHeight: '1rem',
            textAlign: 'left',
            color: theme.palette.text.header,
        },
        iconboxstyle: {
            alignItems: 'center',
            justifyContent: 'center',
            display: 'flex',
            flexDirection: 'row',
            width: '4rem',
        },
        iconStyle: {
            width: '0',
            height: '5.1rem',
            top: '11.8rem',
            left: '26.7rem',
            border: `0.06rem solid ${theme.palette.background.charcoleGrey}`,
            opacity: '0rem',
            mx: {
                xs: '0.25rem',
                sm: '0.5rem',
                md: '1rem',
                lg: '1.56rem',
            },
        },
        variablesRow: {
            display: 'flex',
            flexDirection: 'row',
        },
        fieldContainer: {
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            justifyContent: 'flex-end',
        },
        variablesContainer: {
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
        },
        conditionType: {
            fontSize: '0.75rem',
            fontWeight: '400',
            lineHeight: '1rem',
            textAlign: 'left',
            color: theme.palette.text.header,
        },
        conditionBox: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            margin: '0 0 0.313rem 0',
        },
        testContainer: {
            display: 'flex',
            flexDirection: 'column',
            flexWrap: 'wrap',
            margin: '0.313rem',
        },
        inputLabel: {
            overflow: 'visible',
        },
        labelTypography: {
            textAlign: 'left',
            color: theme.palette.text.secondary,
            fontSize: '0.81rem',
            lineHeight: '1rem',
        },
        featureCheckbox: {
            fontSize: '0.87rem',
            lineHeight: '0.87rem',
            textAlign: 'left',
            color: theme.palette.text.contrastText,
            margin: '0.313rem 0 0.625rem 0',
        },
        selectionDropdown: {
            maxHeight: '2.5rem',
            maxWidth: '18.75rem',
            textAlign: 'left',
            width: '100%',
            '&amp; .MuiSelect-select': {
                minHeight: '0 !important',
            },
        },
    };
    return styles;
};
export default CcfEnhancedWESummaryTestStyles;
//# sourceMappingURL=ccf-enhanced-workflow-exec-summary-test.styles.js.map