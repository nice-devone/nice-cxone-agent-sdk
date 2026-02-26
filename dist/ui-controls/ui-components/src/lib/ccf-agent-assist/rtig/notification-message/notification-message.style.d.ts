import { Theme } from '@mui/material';
/**
 * Styling for notificationMessageStyles
 * @returns notificationMessageStyles CSS properties as a JSON object
 * @example notificationMessageStyles()
 */
declare const notificationMessageStyles: (theme: Theme) => {
    mainCard: {
        marginBottom: string;
        marginRight: string;
    };
    scoreMeterContainer: {
        flex: number;
        display: string;
        flexDirection: string;
        gap: string;
    };
    phrasesIconContainer: {
        width: string;
        height: string;
    };
    phrasesIconContainerParent: {
        height: string;
        display: string;
        alignItems: string;
        justifyContent: string;
    };
    messageBoxContainer: {
        flex: number;
        display: string;
        flexDirection: string;
    };
    iconContainer: {
        [x: string]: string | {
            width: string;
            minWidth: string;
        } | {
            width: string;
            minWidth?: undefined;
        };
        width: string;
    };
    messageFlexContainer: {
        flex: number;
        display: string;
        flexDirection: string;
        justifyContent: string;
        alignItems: string;
    };
    messageHeading: {
        fontSize: string;
        fontWeight: number;
    };
    messageText: {
        fontSize: string;
        fontWeight: number;
    };
    cardContent: {
        [x: string]: string | {
            padding: string;
        };
        padding: string;
        paddingBottom: string;
    };
    duration: {
        fontSize: string;
    };
};
export default notificationMessageStyles;
