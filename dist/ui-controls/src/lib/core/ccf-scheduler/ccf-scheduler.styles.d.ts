import { Theme } from '@mui/material';
/**
 * Styling for scheduler
 * @returns Scheduler CSS properties as a JSON object
 * @example schedulerStyles
*/
declare const schedulerStyles: (theme: Theme) => {
    schedulerStyles: {
        height: string;
        '.fc': {
            'td, th': {
                border: string;
            };
            '.fc-daygrid-body-natural': {
                '.fc-daygrid-day-events': {
                    marginBottom: number;
                    minHeight: string;
                };
            };
            '.fc-scrollgrid-section': {
                height: number;
                '.fc-timegrid-axis-frame': {
                    fontSize: string;
                    fontWeight: string;
                    color: string;
                };
                '.fc-timegrid-body': {
                    table: {
                        width: string;
                    };
                    width: string;
                };
                '.fc-daygrid-body': {
                    '.fc-scrollgrid-sync-table': {
                        width: string;
                    };
                    width: string;
                };
            };
            '.fc-daygrid-day': {
                backgroundColor: string;
            };
            '.fc-day-today': {
                a: {
                    fontWeight: string;
                };
            };
            '.fc-timeGridWeek-view': {
                '.fc-col-header-cell-cushion': {
                    fontSize: string;
                };
                '.fc-day-today:not(th)': {
                    backgroundColor: string | undefined;
                };
                '.fc-event-time': {
                    fontSize: string;
                    paddingLeft: string;
                };
                '.fc-col-header-cell': {
                    borderLeft: number;
                    borderRight: number;
                };
                '.fc-daygrid-day': {
                    padding: string;
                };
                '.fc-daygrid-body': {
                    '.fc-event-title-container': {
                        padding: string;
                        fontSize: string;
                    };
                };
            };
            '.fc-timeGridDay-view': {
                tbody: {
                    '> tr:nth-of-type(1)': {
                        '>td': {
                            borderTop: string;
                        };
                    };
                };
                '.fc-daygrid-event-harness': {
                    'a, .fc-event-future ': {
                        margin: number;
                        fontWeight: string;
                        width: string;
                        border: string;
                        borderRadius: string;
                    };
                };
                '.fc-col-header-cell-cushion': {
                    fontSize: string;
                    padding: string;
                };
                '.fc-daygrid-day-frame': {
                    padding: string;
                };
                '.fc-day:not(th)': {
                    background: string;
                    borderLeft: number;
                };
                '.fc-col-header-cell': {
                    border: number;
                    '.fc-scrollgrid-sync-inner': {
                        textAlign: string;
                        position: string;
                        left: string;
                    };
                };
                '.fc-event-time': {
                    fontSize: string;
                };
                '.fc-timegrid-axis-frame': {
                    background: string;
                };
                '.fc-h-event.fc-event-start:not(.fc-event-end)': {
                    position: string;
                    display: string;
                    justifyContent: string;
                    ':after': {
                        content: string;
                        position: string;
                        top: string;
                        right: string;
                        width: string;
                        height: string;
                        textAlign: string;
                        paddingRight: string;
                        fontWeight: string;
                        fontSize: string;
                        alignItems: string;
                        justifyContent: string;
                        display: string;
                    };
                };
                '.fc-h-event.fc-event-end:not(.fc-event-start)': {
                    position: string;
                    display: string;
                    justifyContent: string;
                    ':before': {
                        content: string;
                        transform: string;
                        position: string;
                        top: string;
                        left: string;
                        width: string;
                        height: string;
                        textAlign: string;
                        paddingLeft: string;
                        fontWeight: string;
                        fontSize: string;
                        alignItems: string;
                        justifyContent: string;
                        display: string;
                    };
                };
            };
            '.fc-timegrid-divider': {
                padding: number;
                height: number;
            };
            '.fc-event-main-frame-border': {
                height: string;
                position: string;
                margin: string;
                left: string;
                top: string;
            };
            '.fc-col-header-cell-cushion': {
                color: string;
                fontWeight: string;
            };
            '.fc-timegrid-slot-label-cushion': {
                fontSize: string;
                color: string;
                fontWeight: string;
                textTransform: string;
            };
            '.fc-timegrid-slot': {
                borderLeft: number;
            };
            '.fc-timegrid-slot-label': {
                borderTop: string;
                verticalAlign: string;
                borderRight: string;
            };
            '.fc-timegrid-slot-label-frame': {
                display: string;
                justifyContent: string;
            };
            '.fc-timegrid-axis': {
                border: number;
            };
            '.fc-timegrid-now-indicator-arrow': {
                display: string;
            };
            '.fc-timegrid-now-indicator-line': {
                borderColor: string;
                borderWidth: string;
            };
            '.fc-timegrid-now-indicator-line::before': {
                content: string;
                display: string;
                width: string;
                height: string;
                backgroundColor: string;
                borderRadius: string;
                position: string;
                top: string;
                left: number;
            };
            '.fc-event-main': {
                opacity: number;
            };
            '.fc-event-title-container': {
                flexGrow: number;
                paddingRight: string;
            };
            '.fc-event-main-frame': {
                display: string;
                justifyContent: string;
                alignItems: string;
            };
            '.fc-event-time': {
                textTransform: string;
                textAlign: string;
                display: string;
                alignItems: string;
                margin: number;
                paddingLeft: string;
                ':after': {
                    content: string;
                };
            };
            '.fc-event-title': {
                textTransform: string;
                textAlign: string;
                fontWeight: string;
                fontSize: string;
            };
            '.fc-sticky': {
                position: string;
            };
            '.fc-bg-event .fc-event-title': {
                fontStyle: string;
                fontSize: string;
            };
            '.fc-bg-event': {
                opacity: number;
                backgroundColor: string;
            };
            '.shift, .Break, .Meeting, .Lunch, .Training, .Overtime, .Paid': {
                '.fc-event-time, .fc-event-title': {
                    color: string;
                };
            };
        };
    };
    container: {
        display: string;
        gap: string;
    };
    commitmentDetailsWrapper: {
        background: string;
        height: string;
        width: string;
        display: string;
        flexDirection: string;
        gap: string;
        '& p': {
            margin: string;
            fontSize: string;
        };
        '& + Mui-Tooltip-arrow': {
            color: string;
            background: string;
        };
    };
    tooltipArrow: {
        '& span.MuiTooltip-arrow': {
            color: string;
            '&::before': {
                border: string;
            };
        };
    };
    heading: {
        fontWeight: string;
        fontSize: string;
    };
    commitmentTitle: {
        textDecoration: string;
        fontWeight: string;
        fontSize: string;
    };
    detail: {
        display: string;
        alignItems: string;
        gap: string;
    };
    icon: {
        color: string;
        height: string;
        width: string;
    };
    buttonWrapper: {
        display: string;
        justifyContent: string;
        marginRight: string;
        gap: string;
    };
    btn: {
        padding: string;
        '& p': {
            fontWeight: string;
            fontSize: string;
        };
    };
    textArea: {
        '& div.MuiInputBase-root': {
            padding: string;
            marginBottom: string;
            fontSize: string;
        };
    };
    circle: {
        height: string;
        width: string;
        background: string;
        borderRadius: string;
        display: string;
        justifyContent: string;
        alignItems: string;
        marginTop: string;
        '&::before': {
            content: string;
            background: string;
            height: string;
            width: string;
            borderRadius: string;
        };
    };
};
export default schedulerStyles;
