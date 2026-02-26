/**
 * Styling for ccf-app-scheduler
 * @returns ccf-app-scheduler CSS properties as a JSON object
 * @example ccfAppSchedulerStyles(theme, props)
*/
const ccfAppSchedulerStyles = (theme, matches, matchesXS) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1;
    const styles = {
        schedulerToolBarStyles: {
            padding: '10px',
            backgroundColor: matches ? theme.palette.background.paper : theme.palette.background.level1,
            'button': {
                borderRadius: 0,
                boxShadow: 'none',
                cursor: 'pointer',
                fontSize: '0.875rem',
                backgroundColor: theme.palette.background.paper,
                color: theme.palette.text.secondary,
                border: `1px solid ${(_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.border) === null || _b === void 0 ? void 0 : _b.main}`,
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
            '.title': {
                width: matches ? 'calc(100% - 80px)' : '100%',
                cursor: 'auto',
                ':active, :hover': {
                    background: theme.palette.background.paper,
                },
            },
            '.dateSection': {
                width: matches ? 'calc(100% - 80px)' : '100%',
                cursor: 'auto',
                ':active, :hover': {
                    background: theme.palette.background.paper,
                },
                borderRadius: 0,
                boxShadow: 'none',
                fontSize: '0.875rem',
                backgroundColor: theme.palette.background.paper,
                color: theme.palette.text.secondary,
                border: `0.0625rem solid ${(_d = (_c = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _c === void 0 ? void 0 : _c.border) === null || _d === void 0 ? void 0 : _d.main}`,
                height: '2.5rem',
                minWidth: 'auto',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            },
        },
        navigatorStyles: {
            display: 'flex',
            alignItems: 'center',
            width: 'calc(100% - 44px)',
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
        },
        todayButtonStyle: {
            border: 'none',
            backgroundColor: '#f8fafb',
            display: matches ? 'none' : 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            'button.MuiToggleButton-root': {
                border: 'none',
                backgroundColor: '#f8fafb',
                maxWidth: '90%',
                ':hover': {
                    backgroundColor: theme.palette.background.hover,
                },
                '&:focus': {
                    border: `0.0625rem solid ${(_f = (_e = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _e === void 0 ? void 0 : _e.border) === null || _f === void 0 ? void 0 : _f.menuItemHighlight}`,
                },
            },
            '.MuiToggleButton-root.Mui-selected': {
                color: theme.palette.secondary.main,
                backgroundColor: theme.palette.background.hover,
                borderRadius: '5px',
            },
        },
        focussedElement: {
            '&:focus': {
                border: `0.0625rem solid ${(_h = (_g = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _g === void 0 ? void 0 : _g.border) === null || _h === void 0 ? void 0 : _h.menuItemHighlight}`,
                borderRadius: '0.25rem',
            },
        },
        toggleButton: {
            '&:hover': {
                backgroundColor: theme.palette.background.paper,
            },
            '&.Mui-selected': {
                backgroundColor: theme.palette.background.hover,
                '&:hover': {
                    backgroundColor: theme.palette.background.hover,
                },
            },
            '&:focus': {
                border: `0.0625rem solid ${(_k = (_j = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _j === void 0 ? void 0 : _j.border) === null || _k === void 0 ? void 0 : _k.menuItemHighlight}`,
            },
        },
        focusIcon: {
            display: 'flex',
            alignSelf: 'center',
            justifyContent: 'center',
            margin: 'auto 4px auto auto',
            fill: '#f8fafb',
            width: '20px',
            height: '20px',
            paddingRight: '2px',
        },
        viewChangerStyles: {
            alignItems: 'center',
            display: matches ? 'none' : 'flex',
            '.MuiToggleButtonGroup-root': {
                display: 'grid',
                gridAutoFlow: 'column',
                gridAutoColumns: '1fr',
                marginLeft: '4px',
            },
            '.MuiToggleButton-root': {
                position: 'relative',
                '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    height: '2px',
                    backgroundColor: '#005C99',
                    transform: 'scaleX(0)',
                },
                '&.Mui-selected::after': {
                    transform: 'scaleX(1)',
                },
                borderRadius: 0,
                ':first-of-type': {
                    borderTopLeftRadius: '5px',
                    borderBottomLeftRadius: '5px',
                },
                ':last-of-type': {
                    borderTopRightRadius: '5px',
                    borderBottomRightRadius: '5px',
                },
            },
        },
        addEventButton: {
            justifyContent: 'end',
            display: 'flex',
            'button ': {
                marginLeft: '7px',
                width: '95%',
                lineHeight: '1rem',
                borderRadius: '5px',
                backgroundColor: theme.palette.primary.dark,
                color: theme.palette.background.paper,
                '&:hover': {
                    backgroundColor: theme.palette.primary.dark,
                },
            },
            '.MuiButton-startIcon': {
                display: 'block',
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
        appScheduler: {
            height: '100%',
            '.fc-timegrid-slots tr': {
                height: matches ? '55px' : '70px',
            },
            '.fc': {
                '.fc-scrollgrid-liquid': {
                    borderTop: matches && 0,
                },
            },
        },
        calendarCardStyles: {
            width: matches ? '100%' : 'auto',
            height: '100%',
            overflow: 'auto',
            background: `${theme.palette.background.paper} 0% 0% no-repeat padding-box`,
            boxShadow: `0px 1px 3px ${(_m = (_l = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _l === void 0 ? void 0 : _l.boxshadow) === null || _m === void 0 ? void 0 : _m.main}`,
            borderRadius: matchesXS ? 0 : '6px',
            opacity: 1,
            transition: 'all 0.5s ease',
            '.MuiTabs-root': Object.assign(Object.assign({}, matches
                ? {
                    minHeight: 'auto',
                    background: 'transparent',
                    borderBottom: 'none',
                }
                : {
                    minHeight: '39px',
                    background: `${theme.palette.background.level1} 0% 0% no-repeat padding-box`,
                    borderBottom: `1px solid ${(_p = (_o = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _o === void 0 ? void 0 : _o.border) === null || _p === void 0 ? void 0 : _p.main}`,
                }), { height: matches && '32px', '.MuiTabs-indicator': {
                    backgroundColor: theme.palette.primary.main,
                    display: matches && 'none',
                }, '.MuiTab-root': {
                    minWidth: '45px',
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    margin: '1px 5px',
                    color: theme.palette.secondary.main,
                    padding: '16px 8px 8px',
                    minHeight: 'auto',
                }, '.Mui-selected': {
                    color: matches ? theme.palette.text.contrastText : (_r = (_q = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _q === void 0 ? void 0 : _q.background) === null || _r === void 0 ? void 0 : _r.socialReaction,
                } }),
        },
        tabContentSection: {
            height: matches ? 'calc(100% - 102px)' : 'calc(100% - 142px)',
            marginTop: '10px',
            borderTop: `1px solid ${(_t = (_s = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _s === void 0 ? void 0 : _s.border) === null || _t === void 0 ? void 0 : _t.main}`,
        },
        calendarHeaderSyles: {
            background: `${theme.palette.background.level1} 0% 0% no-repeat padding-box`,
            boxShadow: `0px 1px 3px ${(_v = (_u = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _u === void 0 ? void 0 : _u.boxshadow) === null || _v === void 0 ? void 0 : _v.main}`,
            borderRadius: '5px 5px 0px 0px',
            opacity: 1,
            height: '30px',
            'label': {
                font: 'normal normal 600 14px/11px OpenSans-Semibold, Open Sans',
                color: theme.palette.text.secondary,
                marginLeft: '5px',
            },
        },
        modalStyles: {
            position: 'absolute',
            top: '55%',
            left: '85%',
            transform: 'translate(-50%, -50%)',
            width: '330px',
            bgcolor: theme.palette.background.paper,
            border: `2px solid ${(_x = (_w = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _w === void 0 ? void 0 : _w.border) === null || _x === void 0 ? void 0 : _x.dark}`,
            borderRadius: '8px',
            height: '80%',
            display: 'block',
        },
        todayButton: {
            color: `${(_z = (_y = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _y === void 0 ? void 0 : _y.text) === null || _z === void 0 ? void 0 : _z.clearText} !important`,
            fontWeight: '600',
            fontSize: (_1 = (_0 = theme === null || theme === void 0 ? void 0 : theme.typography) === null || _0 === void 0 ? void 0 : _0.h5) === null || _1 === void 0 ? void 0 : _1.fontSize,
        },
    };
    return styles;
};
export default ccfAppSchedulerStyles;
//# sourceMappingURL=ccf-app-schedule.styles.js.map