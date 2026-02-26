/**
   * @example styles for toast component
   */
const CcfAppToastMessageStyles = (theme) => {
    var _a, _b;
    const styles = {
        toastMessage: {
            '.text,.titleText,.subMessageText': {
                color: theme.palette.text.contrastText,
                marginLeft: '10px',
                marginBottom: '10px',
                marginRight: '10px',
            },
            '.confimationBtn button': {
                marginRight: '30px',
                width: '90px',
                fontSize: '14px',
                padding: '8px',
            },
            '.text span': {
                fontWeight: '700',
                fontSize: '0.9rem',
            },
        },
        text: {
            color: theme.palette.text.primary,
            fontWeight: 'bold',
        },
        logoutConfirmationPanel: {
            [theme.breakpoints.down('xl')]: {
                display: 'flex',
            },
        },
        subText: {
            color: theme.palette.text.primary,
        },
        secondaryButton: {
            float: 'right',
        },
        primaryBtn: {
            left: '30%',
        },
        alignButtonsRight: {
            display: 'flex',
            justifyContent: 'flex-end',
            'button': {
                marginRight: '10px !important',
            },
        },
        primaryButtonAlertBackground: {
            '.primaryBtn, .primaryBtn:hover': {
                backgroundColor: (_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.digitalStatus) === null || _b === void 0 ? void 0 : _b.alertBackground,
                boxShadow: '0px 2px 0px 0px',
            },
        },
    };
    return styles;
};
export default CcfAppToastMessageStyles;
//# sourceMappingURL=ccf-app-toast-message.styles.js.map