/**
 * Styling for Advance workflow execute editor configuration table Component
 * @returns CcfAdvanceWEConfigurationTableStyles CSS properties as a JSON object
 * @example CcfAdvanceWEConfigurationTableStyles
 */
const CcfEnhancedWEConfigurationTableStyles = (theme) => {
    const styles = {
        mainContainer: {
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            overflow: 'auto',
        },
        containerHeading: {
            fontSize: '0.87rem',
            fontWeight: '400',
            lineHeight: '0.87rem',
            textAlign: 'left',
            color: theme.palette.text.secondary,
            paddingLeft: '1.52rem',
        },
        tableWrapper: {
            width: '100%',
            margin: '0 auto',
            border: `0.06rem solid ${theme.palette.background.slateGrey}`,
            borderRadius: '0.25rem',
        },
        tableContainer: {
            boxShadow: 'none',
            overflowY: 'auto',
        },
        tableSection: {
            padding: '0.74rem 2rem 0 1.52rem',
            marginBottom: '2rem',
        },
        rowHeading: {
            fontSize: '0.75rem',
            fontWeight: '700',
            lineHeight: '1rem',
            textAlign: 'left',
            color: theme.palette.text.contrastText,
        },
        rowData: {
            fontSize: '0.81rem',
            fontWeight: '400',
            lineHeight: '0.97rem',
            textAlign: 'left',
            color: theme.palette.text.contrastText,
        },
        checkBox: {
            width: '1rem',
            height: '1rem',
            padding: '0.5rem',
        },
        tableCellHeading: {
            padding: '0.5rem',
            lineHeight: '2.75rem',
            minWidth: '4.7rem',
        },
        tableCellData: {
            padding: '0.5rem',
            lineHeight: '2.25rem',
        },
        tableHeadHeight: {
            height: '44px',
        },
        tableBodyHeight: {
            Height: '36px',
        },
    };
    return styles;
};
export default CcfEnhancedWEConfigurationTableStyles;
//# sourceMappingURL=ccf-enhanced-workflow-exec-config-table.styles.js.map