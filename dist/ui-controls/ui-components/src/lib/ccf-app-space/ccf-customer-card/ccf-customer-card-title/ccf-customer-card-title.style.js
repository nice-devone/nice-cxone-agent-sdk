/**
 * CcfCustomerCard - used to display quick replies component
 * @param props -?-customerCardTitleStyles
 * @example <customerCardTitleStyles />
 */
const customerCardTitleStyles = (theme) => {
    const styles = {
        ccfContactHistoryTitleContainer: {
            wordBreak: 'break-word',
            textAlign: 'center',
            font: `${theme.typography.fontWeightBold} ${theme.typography.h2.fontSize} ${theme.typography.fontFamily}`,
            letterSpacing: '0px',
            color: theme.palette.text.primary,
            opacity: 1,
            borderBottom: `1px solid ${theme.palette.background.toastBackground}`,
            margin: '0 1.8rem',
            padding: '20px 0px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        ccfCCTitleAvatar: {
            height: '35px',
            width: '35px',
            borderRadius: '50%',
            margin: '0 5px 0 0',
            border: `1px solid ${theme.palette.background.toastBackground}`,
        },
        mergeIconButton: {
            position: 'absolute',
            right: theme.spacing(1),
        },
        mergeIcon: {
            height: '20px',
            width: '20px',
            color: theme.palette.text.secondary,
        },
        closeIcon: {
            marginLeft: 'auto',
            cursor: 'pointer',
        },
        customerName: {
            fontWeight: 700,
            lineHeight: 'normal',
        },
    };
    return styles;
};
export default customerCardTitleStyles;
//# sourceMappingURL=ccf-customer-card-title.style.js.map