import { Theme } from '@mui/material';
/**
 * Styling for ccf-notification-popover
 * @returns ccf-notification-popover CSS properties as a JSON object
 * @example ccfNotificationPopoverStyles(theme)
 */
declare const ccfNotificationPopoverStyles: (theme: Theme, isConversationsStandAlone?: boolean) => {
    notificationIcon: {
        padding: number;
        width: string;
        height: string;
        cursor: string;
        color: string;
    };
    notificationMenu: {
        overflow: string;
        filter: string;
        mt: number;
        width: string;
        top: string;
        '&:before': {
            content: string;
            display: string;
            position: string;
            top: number;
            right: number;
            width: number;
            height: number;
            background: string;
            transform: string;
            zIndex: number;
        };
        '> ul': {
            paddingTop: string;
        };
    };
    popoverHeader: {
        display: string;
        alignItems: string;
        fontSize: string;
        padding: string;
        fontWeight: string;
        background: string;
        justifyContent: string;
        'button, svg': {
            fontSize: string;
            fontWeight: string;
            minWidth: number;
            padding: number;
            backgroundColor: string;
            border: string;
            boxShadow: string;
            color: string;
            '&:hover,&:active': {
                cursor: string;
                color: string;
                boxShadow: string;
                border: string;
                background: string;
            };
            '&:focus-visible': {
                outline: string;
                outlineColor: string | undefined;
                svg: {
                    display: string;
                    fontSize: string;
                    color: string;
                };
            };
        };
    };
    notificationOptions: {
        height: string;
        maxHeight: string;
        overflowY: string;
        maxWidth: string;
        padding: string;
        '.NotificationActionLabel p': {
            margin: string;
        };
    };
    notificationOptionsText: {
        fontSize: string;
    };
};
export default ccfNotificationPopoverStyles;
