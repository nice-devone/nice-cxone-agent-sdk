import { keyframes } from '@mui/material';
/**
 * CcfCustomerCard - used to display quick replies component
 * @param props -?-customerCardDetailsStyles
 * @example <customerCardDetailsStyles />
 */
const customerCardContactHistoryStyles = (theme) => {
    const spin = keyframes `
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    `;
    const styles = {
        ccfContactHistoryInfo: {
            display: 'flex',
            marginLeft: '32px',
            alignItems: 'center',
            fontSize: `${theme.typography.h6.fontSize}`,
        },
        ccfBottomMargin: {
            verticalAlign: 'top',
            paddingRight: '5px',
        },
        ccfContactCardPadR10: {
            paddingRight: '10px',
            alignItems: 'center',
            display: 'inline-flex',
        },
        ccfReplyIcon: {
            fontSize: '14px',
            transform: 'scaleX(-1) rotate(-90deg)',
        },
        ccfReplyIconInverted: {
            fontSize: '14px',
            transform: 'scaleX(-1) rotate(90deg)',
        },
        ccfContactHistoryAdaptiveCardContainer: {
            alignItems: 'center',
            overflowY: 'scroll',
        },
        ccfLoader: {
            alignItems: 'center',
            marginBottom: '10px',
            marginTop: '20px',
            textAlign: 'center',
            fontSize: '10px',
        },
        ccfReplyCountBottomMargin: {},
        noInformation: {
            textAlign: 'center',
            padding: '8px 16px 16px',
            fontSize: '16px',
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
export default customerCardContactHistoryStyles;
//# sourceMappingURL=ccf-customer-card-contact-history.style.js.map