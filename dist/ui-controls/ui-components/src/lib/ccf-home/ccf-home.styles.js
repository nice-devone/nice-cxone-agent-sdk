/**
 * @example styles for home component
 */
const ccfHomeStyle = (theme, isSmView) => {
    const styles = {
        root: {
            display: isSmView ? 'flex' : 'block',
            flexDirection: 'column',
            height: isSmView ? 'calc(100% - 56px)' : 'calc(100% - 60px)',
        },
        isAppToastMessageVisible: {
            pointerEvents: 'none',
            height: 'calc(100% - 60px)',
        },
        navBarandSideBar: {
            display: 'flex',
            height: isSmView ? 'calc(100svh - 56px)' : 'calc(100vh - 56px)',
            flex: 1,
            [theme.breakpoints.up('xl')]: {
                flexDirection: 'row',
            },
            [theme.breakpoints.down('xl')]: {
                flexDirection: 'column',
            },
        },
        appSpaceContainer: {
            height: '100%',
            padding: '8px',
            position: 'relative',
        },
        detailsMenu: {
            [theme.breakpoints.down('xl')]: {
                overflowY: 'auto',
            },
            [theme.breakpoints.up('xl')]: {
                overflowY: 'hidden',
            },
        },
        containerFullHeight: {
            height: '100%',
        },
        isNetworkOffline: {
            position: 'absolute',
            left: '50%',
            top: '50%',
        },
        mainViewContainer: {
            flex: 1,
            [theme.breakpoints.down('xl')]: {
                height: 'calc(100% - 53px)',
            },
            overflowY: 'auto',
        },
        customHorizontalSplitter: {
            padding: '0 1px',
            height: '100%',
            width: '10px',
            background: theme.palette.background.default,
            margin: '0.5rem 0.625rem 0 0.625rem',
            '&:hover': {
                cursor: 'col-resize',
                background: theme.palette.text.noteLabel,
            },
            '&::after': {
                content: '" "',
                display: 'flex',
                background: theme.palette.text.secondary,
                borderRadius: '50px',
                position: 'absolute',
                width: '4px',
                height: '21px',
                top: '50%',
                opacity: '1',
            },
            '&:hover::after': {
                cursor: 'col-resize',
                background: theme.palette.background.paper,
            },
        },
    };
    return styles;
};
export default ccfHomeStyle;
//# sourceMappingURL=ccf-home.styles.js.map