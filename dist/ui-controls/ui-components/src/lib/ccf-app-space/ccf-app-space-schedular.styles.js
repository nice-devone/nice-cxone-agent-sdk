/**
 * Styling for ccf-app-space-scheduler
 * @returns ccf-app-space-scheduler CSS properties as a JSON object
 * @example ccfAppSpaceSchedulerStyles(theme)
*/
const ccfAppSpaceSchedulerStyles = (theme) => {
    var _a, _b;
    const styles = {
        schedulerToolBarStyles: {
            padding: '10px',
            'button': {
                borderRadius: 0,
                boxShadow: 'none',
                cursor: 'pointer',
                fontSize: '0.875rem',
                backgroundColor: theme.palette.background.paper,
                color: theme.palette.text.secondary,
                border: `1px solid ${theme.palette.border.main}`,
                height: '40px',
                ':not(:last-child)': {
                    borderRight: 0,
                },
                minWidth: 'auto',
                span: {
                    display: 'none',
                },
                ':hover, :disabled': {
                    boxShadow: 'none',
                },
                ':active': {
                    background: theme.palette.background.hover,
                },
            },
        },
        navigatorStyles: {
            display: 'flex',
            alignItems: 'center',
            'button': {
                width: '40px',
                ':first-of-type': {
                    borderTopLeftRadius: '5px',
                    borderBottomLeftRadius: '5px',
                },
                ':last-child': {
                    borderTopRightRadius: '5px',
                    borderBottomRightRadius: '5px',
                },
            },
            '.title': {
                minWidth: 'calc(100% - 80px)',
                cursor: 'auto',
                ':active, :hover': {
                    background: theme.palette.background.paper,
                },
            },
        },
        schedulerHeadingStyles: {
            fontSize: '14px',
            fontWeight: '600',
            color: theme.palette.text.secondary,
            paddingBottom: '10px',
        },
        focussedElement: {
            '&:focus': {
                border: `0.0625rem solid ${(_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.border) === null || _b === void 0 ? void 0 : _b.menuItemHighlight}`,
                borderRadius: '0.25rem',
            },
        },
        prevButtonStyle: {
            'svg': {
                transform: 'rotate(-90deg)',
            },
        },
        nextButtonStyle: {
            'svg': {
                transform: 'rotate(90deg)',
            },
        },
        appSpaceSchedulerStyles: {
            height: 'calc(100% - 137px)',
            '.fc': {
                '.fc-scrollgrid-liquid': {
                    border: 0,
                },
                '.fc-col-header': {
                    display: 'none',
                },
                '.fc-col-header-cell': {
                    paddingTop: '5px',
                    paddingBottom: '5px',
                },
                '.fc-timegrid-slots tr': {
                    height: '55px',
                },
            },
        },
        addEventButton: {
            'button': {
                borderRadius: '5px',
                marginTop: '6px',
                fontWeight: '700',
                gap: '6px',
            },
        },
    };
    return styles;
};
export default ccfAppSpaceSchedulerStyles;
//# sourceMappingURL=ccf-app-space-schedular.styles.js.map