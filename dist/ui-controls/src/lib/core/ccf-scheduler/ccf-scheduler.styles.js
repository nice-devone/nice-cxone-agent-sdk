import { lighten } from '@mui/material';
/**
 * Styling for scheduler
 * @returns Scheduler CSS properties as a JSON object
 * @example schedulerStyles
*/
const schedulerStyles = (theme) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
    const styles = {
        schedulerStyles: {
            height: '100%',
            '.fc': {
                'td, th': {
                    border: `0.5px solid ${(_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.border) === null || _b === void 0 ? void 0 : _b.main}`,
                },
                '.fc-daygrid-body-natural': {
                    '.fc-daygrid-day-events': {
                        marginBottom: 0,
                        minHeight: '25px',
                    },
                },
                '.fc-scrollgrid-section': {
                    height: 0,
                    '.fc-timegrid-axis-frame': {
                        fontSize: '0.75rem',
                        fontWeight: 'bold',
                        color: theme.palette.text.secondary,
                    },
                    '.fc-timegrid-body': {
                        'table': {
                            width: '99% !important',
                        },
                        width: '99% !important',
                    },
                    '.fc-daygrid-body': {
                        '.fc-scrollgrid-sync-table': {
                            width: '100% !important',
                        },
                        width: '100% !important',
                    },
                },
                '.fc-daygrid-day': {
                    backgroundColor: `${theme.palette.background.level1} !important`,
                },
                '.fc-day-today': {
                    'a': {
                        fontWeight: 'bold',
                    },
                },
                '.fc-timeGridWeek-view': {
                    '.fc-col-header-cell-cushion': {
                        fontSize: '0.75rem',
                    },
                    '.fc-day-today:not(th)': {
                        backgroundColor: theme.palette.background.hover,
                    },
                    '.fc-event-time': {
                        fontSize: '0.625rem',
                        paddingLeft: '2px',
                    },
                    '.fc-col-header-cell': {
                        borderLeft: 0,
                        borderRight: 0,
                    },
                    '.fc-daygrid-day': {
                        padding: '2px 0',
                    },
                    '.fc-daygrid-body': {
                        '.fc-event-title-container': {
                            padding: '0',
                            fontSize: '0.6875rem',
                        },
                    },
                },
                '.fc-timeGridDay-view': {
                    'tbody': {
                        '> tr:nth-of-type(1)': {
                            '>td': {
                                borderTop: `1px solid ${theme.palette.border.main}`,
                            },
                        },
                    },
                    '.fc-daygrid-event-harness': {
                        'a, .fc-event-future ': {
                            margin: 0,
                            fontWeight: 'bold',
                            width: '98%',
                            border: '1px solid',
                            borderRadius: '3px',
                        },
                    },
                    '.fc-col-header-cell-cushion': {
                        fontSize: '0.875rem',
                        padding: '5px 4px 5px 4px',
                    },
                    '.fc-daygrid-day-frame': {
                        padding: '2px',
                    },
                    '.fc-day:not(th)': {
                        background: theme.palette.background.paper,
                        borderLeft: 0,
                    },
                    '.fc-col-header-cell': {
                        border: 0,
                        '.fc-scrollgrid-sync-inner': {
                            textAlign: 'left',
                            position: 'relative',
                            left: '-34px',
                        },
                    },
                    '.fc-event-time': {
                        fontSize: '0.6875rem',
                    },
                    '.fc-timegrid-axis-frame': {
                        background: theme.palette.background.level1,
                    },
                    '.fc-h-event.fc-event-start:not(.fc-event-end)': {
                        position: 'relative',
                        display: 'flex',
                        justifyContent: 'center',
                        ':after': {
                            content: '"→"',
                            position: 'absolute',
                            top: '-2px',
                            right: '0',
                            width: '50px',
                            height: '20px',
                            textAlign: 'right',
                            paddingRight: '10px',
                            fontWeight: 'bold',
                            fontSize: '1.125rem',
                            alignItems: 'center',
                            justifyContent: 'center',
                            display: 'flex',
                        },
                    },
                    '.fc-h-event.fc-event-end:not(.fc-event-start)': {
                        position: 'relative',
                        display: 'flex',
                        justifyContent: 'center',
                        ':before': {
                            content: '"→"',
                            transform: 'rotate(180deg)',
                            position: 'absolute',
                            top: '2px',
                            left: '0',
                            width: '50px',
                            height: '20px',
                            textAlign: 'left',
                            paddingLeft: '10px',
                            fontWeight: 'bold',
                            fontSize: '1.125rem',
                            alignItems: 'center',
                            justifyContent: 'center',
                            display: 'flex',
                        },
                    },
                },
                '.fc-timegrid-divider': {
                    padding: 0,
                    height: 0,
                },
                '.fc-event-main-frame-border': {
                    height: '100%',
                    position: 'absolute',
                    margin: '2px',
                    left: '1px',
                    top: '-2px',
                },
                '.fc-col-header-cell-cushion': {
                    color: theme.palette.text.secondary,
                    fontWeight: 'normal',
                },
                '.fc-timegrid-slot-label-cushion': {
                    fontSize: '0.5rem',
                    color: theme.palette.text.secondary,
                    fontWeight: 'normal',
                    textTransform: 'uppercase',
                },
                '.fc-timegrid-slot': {
                    borderLeft: 0,
                },
                '.fc-timegrid-slot-label': {
                    borderTop: '0',
                    verticalAlign: 'top',
                    borderRight: '0',
                },
                '.fc-timegrid-slot-label-frame': {
                    display: 'flex',
                    justifyContent: 'flex-end',
                },
                '.fc-timegrid-axis': {
                    border: 0,
                },
                '.fc-timegrid-now-indicator-arrow': {
                    display: 'none',
                },
                '.fc-timegrid-now-indicator-line': {
                    borderColor: theme.palette.primary.main,
                    borderWidth: '2px 0 0',
                },
                '.fc-timegrid-now-indicator-line::before': {
                    content: '""',
                    display: 'inline-block',
                    width: '0.9rem',
                    height: '0.9em',
                    backgroundColor: theme.palette.primary.main,
                    borderRadius: '50%',
                    position: 'absolute',
                    top: '-8px',
                    left: 0,
                },
                '.fc-event-main': {
                    opacity: 0.9,
                },
                '.fc-event-title-container': {
                    flexGrow: 0,
                    paddingRight: '2px',
                },
                '.fc-event-main-frame': {
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                },
                '.fc-event-time': {
                    textTransform: 'uppercase',
                    textAlign: 'center',
                    display: 'flex',
                    alignItems: 'center',
                    margin: 0,
                    paddingLeft: '2px',
                    ':after': {
                        content: '""',
                    },
                },
                '.fc-event-title': {
                    textTransform: 'uppercase',
                    textAlign: 'center',
                    fontWeight: 'bold',
                    fontSize: '0.6875rem',
                },
                '.fc-sticky': {
                    position: 'static',
                },
                '.fc-bg-event .fc-event-title': {
                    fontStyle: 'normal',
                    fontSize: '0.6875rem',
                },
                '.fc-bg-event': {
                    opacity: 0.9,
                    backgroundColor: `${lighten(theme.palette.border.main, 0.3)} !important`,
                },
                '.shift, .Break, .Meeting, .Lunch, .Training, .Overtime, .Paid': {
                    '.fc-event-time, .fc-event-title': {
                        color: theme.palette.text.contrastText,
                    },
                },
            },
        },
        container: {
            display: 'flex',
            gap: '5px',
        },
        commitmentDetailsWrapper: {
            background: (_d = (_c = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _c === void 0 ? void 0 : _c.background) === null || _d === void 0 ? void 0 : _d.paper,
            height: '160px',
            width: '260px',
            display: 'flex',
            flexDirection: 'column',
            gap: '9px',
            '& p': {
                margin: '0',
                fontSize: '14px',
            },
            '& + Mui-Tooltip-arrow': {
                color: (_f = (_e = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _e === void 0 ? void 0 : _e.background) === null || _f === void 0 ? void 0 : _f.paper,
                background: 'black',
            },
        },
        tooltipArrow: {
            '& span.MuiTooltip-arrow': {
                color: (_h = (_g = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _g === void 0 ? void 0 : _g.background) === null || _h === void 0 ? void 0 : _h.paper,
                '&::before': {
                    border: `1px solid ${(_k = (_j = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _j === void 0 ? void 0 : _j.boxshadow) === null || _k === void 0 ? void 0 : _k.light}`,
                },
            },
        },
        heading: {
            fontWeight: '700',
            fontSize: '14px',
        },
        commitmentTitle: {
            textDecoration: 'underline',
            fontWeight: '600',
            fontSize: '14px',
        },
        detail: {
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
        },
        icon: {
            color: (_m = (_l = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _l === void 0 ? void 0 : _l.secondary) === null || _m === void 0 ? void 0 : _m.main,
            height: '20px',
            width: '20px',
        },
        buttonWrapper: {
            display: 'flex',
            justifyContent: 'flex-end',
            marginRight: '10px',
            gap: '7px',
        },
        btn: {
            padding: '2px',
            '& p': {
                fontWeight: '600',
                fontSize: '14px',
            },
        },
        textArea: {
            '& div.MuiInputBase-root': {
                padding: '10px',
                marginBottom: '10px',
                fontSize: '14px',
            },
        },
        circle: {
            height: '16px',
            width: '16px',
            background: (_p = (_o = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _o === void 0 ? void 0 : _o.accent) === null || _p === void 0 ? void 0 : _p.main,
            borderRadius: '50%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '4px',
            '&::before': {
                content: '""',
                background: (_r = (_q = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _q === void 0 ? void 0 : _q.background) === null || _r === void 0 ? void 0 : _r.paper,
                height: '6px',
                width: '6px',
                borderRadius: '50%',
            },
        },
    };
    return styles;
};
export default schedulerStyles;
//# sourceMappingURL=ccf-scheduler.styles.js.map