/**
 * CcfCustomerCard - Is used to display the channels information of customer under customer card.
 * @param props -?-theme
 * @example <customerCardChannelStyles />
 */
const customerCardChannelStyles = (theme) => {
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
            fontWeight: 800,
        },
        detailsCustomFieldData: {
            font: `normal normal normal ${theme.typography.h6.fontSize} ${theme.typography.fontFamily}`,
            wordBreak: 'break-word',
        },
        bottomPad15: {
            paddingBottom: '15px',
            marginLeft: '12px',
        },
        editIcon: {
            height: '20px',
            width: '20px',
            color: theme.palette.text.secondary,
            marginBottom: '-8px',
        },
        editVoiceIcon: {
            height: '12px',
            width: '12px',
            color: theme.palette.text.primary,
            marginBottom: '0',
            marginRight: '5px',
        },
        iconSize: {
            height: '20px',
            width: '20px',
            margin: '0 5px',
        },
        leftIconAlignment: {
            position: 'relative',
            top: '2px',
            margin: '0 5px 0 0',
        },
        iconMargin: {
            margin: '0 0 0 0',
        },
        noInformation: {
            textAlign: 'center',
            padding: '8px 16px 16px',
        },
        channelText: {
            margin: '0.125rem 0 0 0.313rem',
        },
    };
    return styles;
};
export default customerCardChannelStyles;
//# sourceMappingURL=ccf-customer-card-channel.styles.js.map