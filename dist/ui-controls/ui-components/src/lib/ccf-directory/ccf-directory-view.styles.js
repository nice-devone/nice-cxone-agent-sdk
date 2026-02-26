/**
 * return styles used for the component
 * @example <ccf-directory/>
 * @returns styles
 */
export const directoryStyles = (theme) => {
    const styles = {
        directoryContainer: {
            display: 'flex',
            flexDirection: 'column',
            overflowY: 'auto',
            position: 'relative',
            height: '100%',
            [theme.breakpoints.up('xl')]: {
                borderRadius: '6px',
            },
        },
        directory: {
            width: '100%',
            padding: '0px',
            margin: '0px',
            borderRadius: '6px',
            height: '100%',
            overflowY: 'auto',
            position: 'relative',
        },
        noAgentFoundTypography: {
            paddingTop: '16px',
            marginBottom: '20px',
            textAlign: 'center',
            fontWeight: 'bold',
        },
        includeExternalDirLayout: {
            backgroundColor: theme.palette.background.light,
            color: theme.palette.text.primary,
            fontSize: theme.typography.fontSize,
        },
        regularView: {
            // overflowY: "auto",
            // maxHeight: "300px",
            width: '100%',
            cursor: 'pointer',
            height: '100%',
        },
        fullViewUserSectionLayout: {
            width: '50%',
            backgroundColor: theme.palette.background.light,
        },
        fullViewUserList: {
            width: '50%',
        },
        cursorPointer: {
            cursor: 'pointer',
            color: '#4082c4',
        },
        backgroundWhite: {
            backgroundColor: '#fff',
        },
        itemContainerHeight: {
        //minHeight: '150px'
        },
        fullHeightContainer: {
            height: 'auto',
        },
        showLoaderContainer: {
            opacity: '0.4',
            height: '100%',
            width: '100%',
            position: 'fixed',
            backgroundColor: theme.palette.background.paper,
            pointerEvents: 'none',
            zIndex: '1',
        },
        sectionHeader: {
            fontWeight: 'bold',
        },
        agentListContainer: {
            display: 'flex',
            position: 'relative',
            height: '100%',
        },
        fullViewDirectory: {
            width: '100%',
            padding: '0px',
            margin: '0px',
            borderRadius: '6px',
            height: '100%',
            overflowY: 'auto',
            position: 'relative',
        },
        cursorOnly: {
            cursor: 'pointer',
        },
        height100: {
            height: '100%',
        },
    };
    return styles;
};
export default directoryStyles;
//# sourceMappingURL=ccf-directory-view.styles.js.map