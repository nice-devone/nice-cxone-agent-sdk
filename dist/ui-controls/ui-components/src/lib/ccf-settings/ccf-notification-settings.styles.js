/**
 * Styling for ccf-notification-settings
 * @returns ccf-notification-settings CSS properties as a JSON object
 * @example CcfNotificationSettingsStyles(theme)
 */
const CcfNotificationSettingsStyles = (theme) => {
    var _a, _b, _c, _d;
    const styles = {
        header: {
            display: 'flex',
            lineHeight: '2.5px',
            color: theme.palette.primary.dark,
        },
        headerText: {
            margin: 0,
            whiteSpace: 'pre-wrap',
            wordBreak: 'normal',
            overflowWrap: 'anywhere',
            fontSize: '1.125rem !important',
            color: theme.palette.primary.dark,
            fontWeight: 700,
            lineHeight: '1.5',
        },
        settingsGrid: {
            maxWidth: 'fit-content',
        },
        subHeader: {
            fontSize: '0.875rem',
            color: theme.palette.primary.dark,
            display: 'flex',
            marginBottom: '-12px',
        },
        icon: {
            padding: '0px 0px 0px 18px',
        },
        speakerIcon: {
            padding: '0 5px',
            cursor: 'pointer',
            fontSize: '10px',
        },
        toggle: {
            display: 'flex',
            flexWrap: 'wrap',
            minWidth: '387px',
            [theme.breakpoints.down('xl')]: {
                minWidth: '300px',
            },
        },
        voicetoggle: {
            minWidth: '300px',
            [theme.breakpoints.down('xl')]: {
                minWidth: '200px',
            },
        },
        select: {
            color: theme.palette.text.dark,
            width: '9.8125rem',
            height: '2.1875rem',
            'li': {
                minHeight: '1.25rem',
            },
        },
        tone: {
            padding: '0px 10px 0px 0px',
            display: 'flex',
            alignItems: 'center',
        },
        listStyle: {
            paddingLeft: '0px',
            paddingRight: '10px',
            width: 'fit-content',
        },
        labelStyle: {
            marginLeft: '0px',
            color: theme.palette.text.secondary,
        },
        selectMenu: {
            maxHeight: 150,
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
export default CcfNotificationSettingsStyles;
//# sourceMappingURL=ccf-notification-settings.styles.js.map