import { keyframes } from '@mui/material';
/**
 * CcfCustomerCardinteractionHistory - used to display customerCardHistoryStyles
 *
 * @example <CcfCustomerCardinteractionHistory />
 */
const customerCardHistoryStyles = (theme) => {
    var _a, _b, _c, _d, _e;
    const spin = keyframes `
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
      `;
    const styles = {
        ccfCaseHistoryContainer: {
            backgroundColor: theme.palette.background.paper,
            maxHeight: '200px',
            overflowY: 'auto',
            paddingLeft: '13px !important',
        },
        ccfCaseHistoryRecord: {
            display: 'flex',
            paddingBottom: '15px',
            flexDirection: 'column',
        },
        assigneeImage: {
            borderRadius: '50%',
            backgroundPosition: '50% 50%',
            backgroundSize: 'cover',
            width: '20px',
            height: '20px',
            marginRight: '10px',
            display: 'flex',
        },
        ccfCaseHistoryItemText: {
            display: 'flex',
            color: theme.palette.text.contrastText,
            fontSize: '12px',
            '& b:first-child': { paddingRight: '5px' },
            '& b:last-child': { paddingLeft: '5px' },
        },
        ccfCaseHistoryTimeText: {
            fontSize: '12px',
            color: theme.palette.text.header,
            paddingLeft: '30px',
        },
        monthDivider: {
            display: 'flex',
            alignItems: 'center',
            paddingTop: '14px',
            height: '14px',
            width: '94%',
            fontSize: '11px',
            color: theme.palette.text.lightGrey,
            paddingLeft: '30px',
        },
        alignCenter: {
            textAlign: 'center',
        },
        textWrapper: {
            display: 'flex',
            height: 'auto',
        },
        paginationWrapper: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            height: '2rem',
            paddingRight: '10px',
        },
        prevNextButton: {
            background: 'none !important',
            boxShadow: 'none !important',
            border: 'none !important',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minWidth: '1.5rem',
            width: 'auto',
            height: '1.5rem',
            padding: 0,
        },
        eventInitiatorTooltipArrow: {
            color: (_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.background) === null || _b === void 0 ? void 0 : _b.paper,
        },
        eventInitiatorTooltip: {
            backgroundColor: (_d = (_c = theme.palette) === null || _c === void 0 ? void 0 : _c.background) === null || _d === void 0 ? void 0 : _d.paper,
            boxShadow: '0px 4px 6px 0px rgba(0, 0, 0, 0.24)',
            borderRadius: '8px',
            font: `normal normal normal 0.625rem/0.625rem ${(_e = theme === null || theme === void 0 ? void 0 : theme.typography) === null || _e === void 0 ? void 0 : _e.fontFamily}`,
        },
        eventInitiatorTooltipText: {
            fontStyle: 'normal',
            fontWeight: '400',
            fontSize: '12px',
            lineHeight: '125%',
            textAlign: 'center',
            color: theme.palette.text.main,
        },
        loader: {
            border: `10px solid ${theme.palette.background.LogoColor}`,
            borderTop: `10px solid ${theme.palette.background.sparkleBlue}`,
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            animation: `${spin} 1s linear infinite`,
            align: 'center',
            top: 'calc(50% - 40px)',
            left: 'calc(50% - 40px)',
            position: 'relative',
        },
    };
    return styles;
};
export default customerCardHistoryStyles;
//# sourceMappingURL=ccf-customer-card-case-history.styles.js.map