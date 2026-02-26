import { Theme } from '@mui/material';
/**
 * Styling for ccf-app-space-scheduler
 * @returns ccf-app-space-scheduler CSS properties as a JSON object
 * @example ccfAppSpaceSchedulerStyles(theme)
*/
declare const ccfAppSpaceSchedulerStyles: (theme: Theme) => {
    schedulerToolBarStyles: {
        padding: string;
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
    };
    navigatorStyles: {
        display: string;
        alignItems: string;
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
        '.title': {
            minWidth: string;
            cursor: string;
            ':active, :hover': {
                background: string;
            };
        };
    };
    schedulerHeadingStyles: {
        fontSize: string;
        fontWeight: string;
        color: string;
        paddingBottom: string;
    };
    focussedElement: {
        '&:focus': {
            border: string;
            borderRadius: string;
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
    appSpaceSchedulerStyles: {
        height: string;
        '.fc': {
            '.fc-scrollgrid-liquid': {
                border: number;
            };
            '.fc-col-header': {
                display: string;
            };
            '.fc-col-header-cell': {
                paddingTop: string;
                paddingBottom: string;
            };
            '.fc-timegrid-slots tr': {
                height: string;
            };
        };
    };
    addEventButton: {
        button: {
            borderRadius: string;
            marginTop: string;
            fontWeight: string;
            gap: string;
        };
    };
};
export default ccfAppSpaceSchedulerStyles;
