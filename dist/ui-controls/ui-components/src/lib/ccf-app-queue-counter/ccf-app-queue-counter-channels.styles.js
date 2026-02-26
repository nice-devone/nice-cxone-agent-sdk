/**
 * Styling for ccf-app-queue-counter-channel
 * @returns ccf-app-queue-counter-channel CSS properties as a JSON object
 * @example CcfAppQueueCounterChannelsStyles(theme)
 */
const CcfAppQueueCounterChannelsStyles = (theme, isLessThanLg, isAppSpace) => {
    const styles = {
        channelDetails: {
            height: 'calc(100% - 33px)',
            overflowY: 'auto',
        },
        tableDetails: {
            marginTop: '1rem',
        },
        iconHeaderClasses: {
            marginLeft: '15px',
            color: theme.palette.text.contrastText,
            fontWeight: 'normal',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
        },
        tableStyle: {
            width: '100%',
            tableLayout: 'fixed',
            backgroundColor: theme.palette.background.paper,
            borderCollapse: 'collapse',
        },
        containerBox: {
            display: 'flex',
            alignItems: 'center',
        },
        queueCounterBox: {
            height: '100%',
            overflow: 'hidden',
            [theme.breakpoints.down('lg')]: {
                overflow: 'auto',
            },
        },
        channelTitle: {
            fontWeight: 'bold',
            color: theme.palette.text.secondary,
            paddingLeft: '0.313rem',
            paddingTop: '0.5rem',
            width: 'fit-content',
            cursor: isAppSpace || isLessThanLg ? 'default' : 'pointer',
        },
        tableHeadRow: {
            'td,th': {
                color: theme.palette.secondary.main,
                fontWeight: 'bold',
                textTransform: 'uppercase',
                backgroundColor: theme.palette.background.paper,
                textAlign: 'left',
            },
            borderBottom: '0.1875rem solid ',
            borderBottomColor: theme.palette.background.LogoColor,
            fontWeight: 'bold',
        },
        tableBodyRow: {
            'td, th': {
                textAlign: 'left',
                color: theme.palette.text.contrastText,
            },
            'td:nth-child(4)': {
                textAlign: 'right',
            },
            borderTop: '0.1875rem solid',
            borderTopColor: theme.palette.background.LogoColor,
            borderBottom: '0.1875rem solid',
            borderBottomColor: theme.palette.background.LogoColor,
            cursor: 'pointer',
        },
        moreInfoContainer: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
        navigationIcon: {
            width: '1rem',
            height: '1rem',
            fill: theme.palette.text.black,
        },
        customTableContainer: {
            height: '100%',
            borderCollapse: 'collapse',
        },
        FullViewQueueCounterCard: {
            width: '100%',
            height: '100%',
            background: `${theme.palette.background.light} 0% 0% no-repeat padding-box`,
            boxShadow: `0px 1px 3px ${theme.palette.boxshadow.main}`,
            border: `1px solid ${theme.palette.border.main}`,
            [theme.breakpoints.up('xl')]: {
                borderRadius: '6px',
            },
            opacity: 1,
            transition: 'all 0.5s ease',
            display: 'flex',
            flexDirection: 'column',
            '& .MuiOutlinedInput-input': Object.assign({}, theme.typography.h4),
        },
        queueCounterHeader: {
            background: `${theme.palette.background.level1} 0% 0% no-repeat padding-box`,
            borderRadius: '5px 5px 0px 0px',
            opacity: 1,
            height: '33px',
            paddingTop: '10px',
            '& label': {
                color: theme.palette.text.secondary,
                marginLeft: '5px',
            },
        },
        buttonIconStyle: {
            background: 'none',
            border: 'none',
            padding: 0,
            cursor: 'pointer',
            boxShadow: 'none',
            minWidth: '0 !important',
            '& .MuiButton-root': {
                minWidth: '0 !important',
            },
            '&:hover': {
                border: 'none',
                boxShadow: 'none',
            },
        },
    };
    return styles;
};
export default CcfAppQueueCounterChannelsStyles;
//# sourceMappingURL=ccf-app-queue-counter-channels.styles.js.map