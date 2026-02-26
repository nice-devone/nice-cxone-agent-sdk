import { keyframes } from '@mui/material';
/**
 * CcfCustomerCard - used to display quick replies component
 * @param props -?-customerCardDetailsStyles
 * @example <customerCardDetailsStyles />
 */
const customerCardDetailsStyles = (theme) => {
    const spin = keyframes `
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    `;
    const styles = {
        customerCardContainer: {
            height: '100%',
        },
        flexSpaceBetween: {
            display: 'flex',
            justifyContent: 'space-between',
        },
        noPadding: {
            padding: '0px',
        },
        detailsCustomFieldLabel: {
            fontFamily: `${theme.typography.fontFamily}`,
            fontSize: `${theme.typography.h6.fontSize}`,
            color: theme.palette.text.secondary,
            textTransform: 'uppercase',
        },
        detailsCustomFieldData: {
            font: `normal normal normal ${theme.typography.h6.fontSize} ${theme.typography.fontFamily}`,
            wordBreak: 'break-all',
        },
        bottomPad15: {
            paddingBottom: '15px',
        },
        editIcon: {
            height: '20px',
            width: '20px',
            color: theme.palette.text.secondary,
        },
        LRPadding5: {
            padding: '0 5px',
            color: theme.palette.text.filter,
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
        alignCenter: {
            textAlign: 'center',
        },
        buttonBar: {
            position: 'absolute',
            top: '0.625em',
            right: '1em',
        },
    };
    return styles;
};
export default customerCardDetailsStyles;
//# sourceMappingURL=ccf-customer-card-details.style.js.map