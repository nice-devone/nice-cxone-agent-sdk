/**
 * Styling for skillDetailsStyles
 * @returns CcfEnhancedWEFooterStyles CSS properties as a JSON object
 * @example CcfEnhancedWEFooterStyles
*/
const CcfEnhancedWEFooterStyles = (theme) => {
    const styles = {
        footer: {
            zIndex: 1,
            backgroundColor: theme.palette.background.paper,
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'row',
            bottom: 0,
            width: '100%',
            height: '60px',
            position: 'fixed',
            footerButton: {
                textTransform: 'none',
                width: '4.7rem',
                margin: '10px',
            },
        },
        toaststyle: {
            bottom: '90px',
            padding: '0px',
            right: '40px',
        },
    };
    return styles;
};
export default CcfEnhancedWEFooterStyles;
//# sourceMappingURL=ccf-enhanced-workflow-execute-footer.styles.js.map