/**
 * Styling for ccf-notification-popover
 * @returns ccf-notification-popover CSS properties as a JSON object
 * @example ccfNotificationPopoverStyles(theme)
 */
const ccfNotificationPopoverStyles = (theme, isConversationsStandAlone) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    const styles = {
        notificationIcon: {
            padding: 0,
            width: '1.5rem',
            height: '1.5rem',
            cursor: 'pointer',
            color: theme.palette.text.white,
        },
        notificationMenu: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            width: '17.5rem',
            top: !isConversationsStandAlone ? '1rem !important' : '2rem !important',
            '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: !isConversationsStandAlone ? 263 : 51,
                width: 10,
                height: 10,
                background: theme.palette.background.level1,
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
            },
            '> ul': {
                paddingTop: '0',
            },
        },
        popoverHeader: {
            display: 'flex',
            alignItems: 'center',
            fontSize: '0.81rem',
            padding: '0.75rem 1rem',
            fontWeight: '600',
            background: theme.palette.background.level1,
            justifyContent: 'space-between',
            'button, svg': {
                fontSize: '0.91rem',
                fontWeight: '600',
                minWidth: 0,
                padding: 0,
                backgroundColor: (_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.background) === null || _b === void 0 ? void 0 : _b.transparent,
                border: 'none',
                boxShadow: 'none',
                color: (_d = (_c = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _c === void 0 ? void 0 : _c.text) === null || _d === void 0 ? void 0 : _d.contrastText,
                '&:hover,&:active': {
                    cursor: 'pointer',
                    color: (_f = (_e = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _e === void 0 ? void 0 : _e.text) === null || _f === void 0 ? void 0 : _f.filter,
                    boxShadow: 'none',
                    border: 'none',
                    background: (_h = (_g = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _g === void 0 ? void 0 : _g.background) === null || _h === void 0 ? void 0 : _h.transparent,
                },
                '&:focus-visible': {
                    outline: '0.0625rem solid',
                    outlineColor: (_k = (_j = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _j === void 0 ? void 0 : _j.border) === null || _k === void 0 ? void 0 : _k.menuItemHighlight,
                    svg: {
                        display: 'inline-block',
                        fontSize: 'inherit',
                        color: 'inherit',
                    },
                },
            },
        },
        notificationOptions: {
            height: 'auto',
            maxHeight: '18.75rem',
            overflowY: 'scroll',
            maxWidth: '17.5rem',
            padding: '0',
            '.NotificationActionLabel p': {
                margin: '0',
            },
        },
        notificationOptionsText: {
            fontSize: '0.75rem',
        },
    };
    return styles;
};
export default ccfNotificationPopoverStyles;
//# sourceMappingURL=ccf-notification-popover.styles.js.map