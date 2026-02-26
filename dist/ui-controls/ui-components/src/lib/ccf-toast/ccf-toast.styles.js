/**
 * return styles used for the component
 * @example <ccfToastStyles />
 * @returns styles
 */
const ccfToastStyles = (theme) => {
    return {
        successAlertToast: {
            '.MuiAlert-filledSuccess': {
                background: '#23762D 0% 0% no-repeat padding-box !important',
                opacity: '0.9 !important',
                width: '340px',
                height: '70px',
                font: 'normal normal normal 14px/20px Open Sans !important',
                letterSpacing: '0px',
                color: '#FFFFFF !important',
                display: 'flex',
                alignItems: 'center',
            },
            '.MuiAlert-icon': Object.assign({}, (theme.direction === 'rtl' && {
                marginLeft: '12px',
            })),
            '.MuiAlert-action': Object.assign({}, (theme.direction === 'rtl' && {
                marginLeft: '-8px',
                marginRight: 'auto',
            })),
        },
        successTick: {
            color: 'white !important',
        },
    };
};
export default ccfToastStyles;
//# sourceMappingURL=ccf-toast.styles.js.map