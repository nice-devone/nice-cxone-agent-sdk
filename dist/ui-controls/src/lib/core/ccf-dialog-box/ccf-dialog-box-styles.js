/**
 * Styles for action editor dialog box
 * @example CcfDialogBoxStyles()
 */
const CcfDialogBoxStyles = () => {
    const styles = {
        ccfDialogHeader: {
            display: 'flex',
            alignItems: 'center',
        },
        ccfDialogHeaderTitle: {
            flexGrow: 1,
        },
        ccfDialogHeaderClose: {
            minHeight: '50px',
            minWidth: '50px',
            borderRadius: '50px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: 'none',
            boxShadow: 'none',
        },
        'ccfDialogHeaderClose:hover': {
            border: 'none',
            boxShadow: 'none',
        },
    };
    return styles;
};
export default CcfDialogBoxStyles;
//# sourceMappingURL=ccf-dialog-box-styles.js.map