import { Theme } from '@mui/material';
/**
 * Styling for NotificationItems
 * @returns NotificationItems CSS properties as a JSON object
 * @example NotificationItemStyles
*/
declare const notificationItemStyles: (theme: Theme) => {
    itemContainer: {
        display: string;
        flexDirection: string;
        justifyContent: string;
    };
    itemTitleBar: {
        fontWeight: string;
        display: string;
        justifyContent: string;
    };
    itemSubject: {
        textTransform: string;
        fontSize: string;
        fontWeight: string;
        whiteSpace: string;
        wordBreak: string;
        overflowWrap: string;
        width: string;
    };
    itemMessage: {
        fontSize: string;
        width: string;
        whiteSpace: string;
        wordBreak: string;
        overflowWrap: string;
    };
    itemReceivedTimeBar: {
        display: string;
        justifyContent: string;
    };
    itemReceivedTime: {
        textTransform: string;
        fontSize: string;
        color: string;
    };
};
export default notificationItemStyles;
