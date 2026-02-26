/**
 * Styling for notificationMessageStyles
 * @returns notificationMessageStyles CSS properties as a JSON object
 * @example notificationMessageStyles()
 */
const notificationMessageStyles = (theme) => {
    const styles = {
        mainCard: {
            marginBottom: '2%',
            marginRight: '2%',
        },
        scoreMeterContainer: {
            flex: 1,
            display: 'flex',
            flexDirection: 'row',
            gap: '15px',
        },
        phrasesIconContainer: {
            width: '32px',
            height: '32px',
        },
        phrasesIconContainerParent: {
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        messageBoxContainer: {
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
        },
        iconContainer: {
            width: '70px',
            [theme.breakpoints.down('lg')]: {
                width: '50px',
                minWidth: '50px',
            },
            [theme.breakpoints.down('md')]: {
                width: '70px',
            },
        },
        messageFlexContainer: {
            flex: 1,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
        },
        messageHeading: {
            fontSize: '14px',
            fontWeight: 600,
        },
        messageText: {
            fontSize: '12px',
            fontWeight: 400,
        },
        cardContent: {
            padding: '15px',
            [theme.breakpoints.down('lg')]: {
                padding: '15px 10px',
            },
            [theme.breakpoints.down('md')]: {
                padding: '15px',
            },
            paddingBottom: '0px',
        },
        duration: {
            fontSize: '12px',
        },
    };
    return styles;
};
export default notificationMessageStyles;
//# sourceMappingURL=notification-message.style.js.map