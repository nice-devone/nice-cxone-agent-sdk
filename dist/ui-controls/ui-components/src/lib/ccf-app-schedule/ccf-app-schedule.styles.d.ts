import { Theme } from '@mui/material';
/**
 * Styling for ccf-app-scheduler
 * @returns ccf-app-scheduler CSS properties as a JSON object
 * @example ccfAppSchedulerStyles(theme, props)
*/
declare const ccfAppSchedulerStyles: (theme: Theme, matches: boolean, matchesXS?: boolean) => {
    schedulerToolBarStyles: {
        padding: string;
        backgroundColor: string;
        button: {
            borderRadius: number;
            boxShadow: string;
            cursor: string;
            fontSize: string;
            backgroundColor: string;
            color: string;
            border: string;
            height: string;
            ':not(:last-child)': {
                borderRight: number;
            };
            minWidth: string;
            span: {
                display: string;
            };
            ':hover, :disabled': {
                boxShadow: string;
            };
            ':active': {
                background: string | undefined;
            };
        };
        '.title': {
            width: string;
            cursor: string;
            ':active, :hover': {
                background: string;
            };
        };
        '.dateSection': {
            width: string;
            cursor: string;
            ':active, :hover': {
                background: string;
            };
            borderRadius: number;
            boxShadow: string;
            fontSize: string;
            backgroundColor: string;
            color: string;
            border: string;
            height: string;
            minWidth: string;
            display: string;
            justifyContent: string;
            alignItems: string;
        };
    };
    navigatorStyles: {
        display: string;
        alignItems: string;
        width: string;
        button: {
            width: string;
            ':first-of-type': {
                borderTopLeftRadius: string;
                borderBottomLeftRadius: string;
            };
            ':last-child': {
                borderTopRightRadius: string;
                borderBottomRightRadius: string;
            };
        };
    };
    todayButtonStyle: {
        border: string;
        backgroundColor: string;
        display: string;
        justifyContent: string;
        alignItems: string;
        flexDirection: string;
        'button.MuiToggleButton-root': {
            border: string;
            backgroundColor: string;
            maxWidth: string;
            ':hover': {
                backgroundColor: string | undefined;
            };
            '&:focus': {
                border: string;
            };
        };
        '.MuiToggleButton-root.Mui-selected': {
            color: string;
            backgroundColor: string | undefined;
            borderRadius: string;
        };
    };
    focussedElement: {
        '&:focus': {
            border: string;
            borderRadius: string;
        };
    };
    toggleButton: {
        '&:hover': {
            backgroundColor: string;
        };
        '&.Mui-selected': {
            backgroundColor: string | undefined;
            '&:hover': {
                backgroundColor: string | undefined;
            };
        };
        '&:focus': {
            border: string;
        };
    };
    focusIcon: {
        display: string;
        alignSelf: string;
        justifyContent: string;
        margin: string;
        fill: string;
        width: string;
        height: string;
        paddingRight: string;
    };
    viewChangerStyles: {
        alignItems: string;
        display: string;
        '.MuiToggleButtonGroup-root': {
            display: string;
            gridAutoFlow: string;
            gridAutoColumns: string;
            marginLeft: string;
        };
        '.MuiToggleButton-root': {
            position: string;
            '&::after': {
                content: string;
                position: string;
                bottom: number;
                left: number;
                width: string;
                height: string;
                backgroundColor: string;
                transform: string;
            };
            '&.Mui-selected::after': {
                transform: string;
            };
            borderRadius: number;
            ':first-of-type': {
                borderTopLeftRadius: string;
                borderBottomLeftRadius: string;
            };
            ':last-of-type': {
                borderTopRightRadius: string;
                borderBottomRightRadius: string;
            };
        };
    };
    addEventButton: {
        justifyContent: string;
        display: string;
        'button ': {
            marginLeft: string;
            width: string;
            lineHeight: string;
            borderRadius: string;
            backgroundColor: string;
            color: string;
            '&:hover': {
                backgroundColor: string;
            };
        };
        '.MuiButton-startIcon': {
            display: string;
        };
    };
    prevButtonStyle: {
        svg: {
            transform: string;
        };
    };
    nextButtonStyle: {
        svg: {
            transform: string;
        };
    };
    appScheduler: {
        height: string;
        '.fc-timegrid-slots tr': {
            height: string;
        };
        '.fc': {
            '.fc-scrollgrid-liquid': {
                borderTop: number | false;
            };
        };
    };
    calendarCardStyles: {
        width: string;
        height: string;
        overflow: string;
        background: string;
        boxShadow: string;
        borderRadius: string | number;
        opacity: number;
        transition: string;
        '.MuiTabs-root': {
            height: string | false;
            '.MuiTabs-indicator': {
                backgroundColor: string;
                display: string | false;
            };
            '.MuiTab-root': {
                minWidth: string;
                fontSize: string;
                fontWeight: string;
                margin: string;
                color: string;
                padding: string;
                minHeight: string;
            };
            '.Mui-selected': {
                color: string;
            };
            minHeight: string;
            background: string;
            borderBottom: string;
        };
    };
    tabContentSection: {
        height: string;
        marginTop: string;
        borderTop: string;
    };
    calendarHeaderSyles: {
        background: string;
        boxShadow: string;
        borderRadius: string;
        opacity: number;
        height: string;
        label: {
            font: string;
            color: string;
            marginLeft: string;
        };
    };
    modalStyles: {
        position: string;
        top: string;
        left: string;
        transform: string;
        width: string;
        bgcolor: string;
        border: string;
        borderRadius: string;
        height: string;
        display: string;
    };
    todayButton: {
        color: string;
        fontWeight: string;
        fontSize: import("csstype").Property.FontSize<string | number> | undefined;
    };
};
export default ccfAppSchedulerStyles;
