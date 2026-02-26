/**
 * Styling for skillDetailsStyles
 * @returns skillDetailsStyles CSS properties as a JSON object
 * @example skillDetailsStylestyles
*/
const displaySettingStyles = (theme, isRevampEmailToggleEnabled) => {
    var _a, _b, _c, _d;
    const styles = {
        customTableContainer: {
            height: '95%',
            minHeight: '15rem',
            borderCollapse: 'collapse',
            [theme.breakpoints.up('xl')]: {
                maxWidth: '50%',
            },
            [theme.breakpoints.down('xl')]: {
                maxWidth: '75%',
            },
            [theme.breakpoints.down('lg')]: {
                maxWidth: '85%',
            },
            marginLeft: '1rem',
            border: '0.1875rem solid !important',
            borderColor: `${theme.palette.background.LogoColor} !important`,
            marginTop: '0.5rem',
        },
        KeyboardBox: {
            paddingLeft: '1rem',
            paddingBottom: '1rem',
            marginBottom: '0.7rem',
        },
        keyShortcutHeading: {
            fontWeight: 'bold',
        },
        mainContainer: {
            display: 'flex',
            flexDirection: 'column',
            height: '97%',
        },
        listHeader: {
            width: '100%',
            backgroundColor: theme.palette.background.paper,
            marginBottom: isRevampEmailToggleEnabled ? '0' : '0.7rem',
            paddingBottom: isRevampEmailToggleEnabled ? '0' : '0.5rem',
        },
        displayHeader: {
            position: 'relative',
            fontWeight: 'bold',
            color: theme.palette.text.primary,
            fontSize: theme.typography.h4.fontSize || '1rem',
        },
        tableHeadRow: {
            'td,th': {
                //color:`${theme.palette.secondary.main} !important`,
                fontWeight: 'bold',
                textAlign: 'left',
                textTransform: 'uppercase',
                position: 'sticky',
                backgroundColor: theme.palette.background.paper,
            },
            borderBottom: '0.1875rem solid !important',
            borderBottomColor: `${theme.palette.background.LogoColor} !important`,
        },
        tableStyle: {
            width: '100%',
            backgroundColor: theme.palette.background.paper,
            tableLayout: 'fixed',
            borderCollapse: 'collapse',
            borderBottom: '0.1875rem solid ',
            borderBottomColor: `${theme.palette.background.LogoColor} !important`,
        },
        tableBodyRow: {
            'td, th': {
                textAlign: 'left',
                fontSize: theme.typography.h5,
                color: theme.palette.text.contrastText,
            },
            borderTop: '0.1875rem solid',
            borderTopColor: theme.palette.background.LogoColor,
            borderBottom: '0.1875rem solid',
            borderBottomColor: `${theme.palette.background.LogoColor} !important`,
            overflowWrap: 'anywhere',
            color: 'red',
        },
        sendwithEnterBox: {
            display: 'flex',
            alignItems: 'center',
            marginBottom: '0.7rem',
            flexWrap: 'wrap',
        },
        sendandshortcutsBox: {
            paddingLeft: '1rem',
            paddingBottom: '0',
            alignItems: 'center',
        },
        shortcutsBox: {
            display: 'flex',
            alignItems: 'center',
        },
        emailSortOrderContainer: {
            paddingLeft: '0.75rem',
            paddingBottom: '0.5rem',
            alignItems: 'center',
        },
        emailSortOrderBox: {
            display: 'flex',
            alignItems: 'center',
            marginBottom: '0.7rem',
            flexWrap: 'wrap',
        },
        messageSortIcon: {
            width: '2rem',
            height: '1.75rem',
            paddingTop: '0.45rem',
            marginBottom: '0.5rem',
        },
        menuItem: {
            border: '0.0625rem solid transparent',
        },
        hoveredElement: {
            '&:hover': {
                backgroundColor: (_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.background) === null || _b === void 0 ? void 0 : _b.menuItemHighlight,
            },
        },
        focusedElement: {
            '&:focus': {
                border: `0.063rem solid ${(_d = (_c = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _c === void 0 ? void 0 : _c.border) === null || _d === void 0 ? void 0 : _d.menuItemHighlight}`,
                outlineOffset: '0.25rem',
            },
        },
    };
    return styles;
};
export default displaySettingStyles;
//# sourceMappingURL=ccf-display-settings.styles.js.map