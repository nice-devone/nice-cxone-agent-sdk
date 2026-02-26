import { Theme } from '@mui/material';
/**
 * Styling for ccf-notification-settings
 * @returns ccf-notification-settings CSS properties as a JSON object
 * @example CcfNotificationSettingsStyles(theme)
 */
declare const CcfNotificationSettingsStyles: (theme: Theme) => {
    header: {
        display: string;
        lineHeight: string;
        color: string;
    };
    headerText: {
        margin: number;
        whiteSpace: string;
        wordBreak: string;
        overflowWrap: string;
        fontSize: string;
        color: string;
        fontWeight: number;
        lineHeight: string;
    };
    settingsGrid: {
        maxWidth: string;
    };
    subHeader: {
        fontSize: string;
        color: string;
        display: string;
        marginBottom: string;
    };
    icon: {
        padding: string;
    };
    speakerIcon: {
        padding: string;
        cursor: string;
        fontSize: string;
    };
    toggle: {
        [x: string]: string | {
            minWidth: string;
        };
        display: string;
        flexWrap: string;
        minWidth: string;
    };
    voicetoggle: {
        [x: string]: string | {
            minWidth: string;
        };
        minWidth: string;
    };
    select: {
        color: string | undefined;
        width: string;
        height: string;
        li: {
            minHeight: string;
        };
    };
    tone: {
        padding: string;
        display: string;
        alignItems: string;
    };
    listStyle: {
        paddingLeft: string;
        paddingRight: string;
        width: string;
    };
    labelStyle: {
        marginLeft: string;
        color: string;
    };
    selectMenu: {
        maxHeight: number;
    };
    menuItem: {
        border: string;
    };
    hoveredElement: {
        '&:hover': {
            backgroundColor: string;
        };
    };
    focusedElement: {
        '&:focus': {
            border: string;
            outlineOffset: string;
        };
    };
};
export default CcfNotificationSettingsStyles;
