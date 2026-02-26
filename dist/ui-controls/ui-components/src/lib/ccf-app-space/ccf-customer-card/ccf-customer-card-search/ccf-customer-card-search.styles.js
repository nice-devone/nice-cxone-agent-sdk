/**
 * CcfCustomerCard - used to display quick replies component
 * @param props -?-customerCardSearchStyles
 * @example <customerCardSearchStyles />
 */
const customerCardSearchStyles = (theme) => {
    var _a;
    const styles = {
        textField: {
            padding: '16px 8px 16px 0',
        },
        searchHeader: {
            display: 'flex',
            backgroundColor: theme.palette.background.callControlHeader,
            padding: theme.spacing(1),
            color: theme.palette.text.header,
            boxShadow: `0px 1px 3px ${theme.palette.boxshadow.main}`,
        },
        searchHeaderTypography: {
            fontWeight: 600,
            fontSize: theme.typography.h6.fontSize,
            lineHeight: theme.spacing(2),
        },
        accordionIcon: {
            fontSize: '1rem',
            transform: 'rotate(270deg)',
        },
        backIconButton: {
            height: '50%',
            alignSelf: 'center',
        },
        backIcon: {
            fontSize: '1rem',
            transform: 'rotate(360deg)',
        },
        customerNameTitle: {
            fontWeight: 700,
            lineHeight: '19px',
            textTransform: 'capitalize',
        },
        customerCardWrapper: {
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            overflowY: 'auto',
        },
        customerCardContainer: {
            height: '100%',
            overflowY: 'auto',
            position: 'relative',
        },
        loaderContainer: {
            opacity: '0.4',
        },
        customDetailField: {
            fontSize: `${theme.typography.h6.fontSize}`,
            wordBreak: 'break-all',
            display: 'flex',
            alignItems: 'center',
            'svg': {
                fontSize: '1rem',
            },
        },
        leftPad10: {
            paddingLeft: '10px',
        },
        customerDetailAccordion: {
            boxShadow: '0 0 2px ' + ((_a = theme.palette.boxshadow) === null || _a === void 0 ? void 0 : _a.main),
            margin: '0 !important',
            '.Mui-expanded': {
                margin: '0 !important',
            },
        },
    };
    return styles;
};
export default customerCardSearchStyles;
//# sourceMappingURL=ccf-customer-card-search.styles.js.map