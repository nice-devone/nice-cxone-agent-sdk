/**
 * Styles for action editor dialog box
 * @example CcfDialogBoxStyles()
 */
declare const CcfDialogBoxStyles: () => {
    ccfDialogHeader: {
        display: string;
        alignItems: string;
    };
    ccfDialogHeaderTitle: {
        flexGrow: number;
    };
    ccfDialogHeaderClose: {
        minHeight: string;
        minWidth: string;
        borderRadius: string;
        display: string;
        alignItems: string;
        justifyContent: string;
        border: string;
        boxShadow: string;
    };
    'ccfDialogHeaderClose:hover': {
        border: string;
        boxShadow: string;
    };
};
export default CcfDialogBoxStyles;
