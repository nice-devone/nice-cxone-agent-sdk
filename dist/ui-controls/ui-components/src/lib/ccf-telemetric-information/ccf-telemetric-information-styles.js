/* eslint-disable-next-line @nice-cxone/ccf/required-tsdoc */
const ccfTelemetricInformationStyles = (theme) => {
    const styles = {
        baseText: {
            margin: 0,
            whiteSpace: 'pre-wrap',
            wordBreak: 'normal',
            overflowWrap: 'anywhere',
        },
        infoTitle: {
            padding: '0.5rem 1rem 0',
            fontSize: '14px',
            color: theme.palette.primary.dark,
            fontWeight: 700,
            textTransform: 'uppercase',
        },
        infoValue: {
            padding: '0 1rem 0.5rem',
            fontSize: '14px',
            fontWeight: 400,
            color: theme.palette.text.secondary,
        },
        gridContainer: {
            display: 'flex',
        },
        gridCell: {
            minWidth: '150px',
        },
    };
    return styles;
};
export default ccfTelemetricInformationStyles;
//# sourceMappingURL=ccf-telemetric-information-styles.js.map