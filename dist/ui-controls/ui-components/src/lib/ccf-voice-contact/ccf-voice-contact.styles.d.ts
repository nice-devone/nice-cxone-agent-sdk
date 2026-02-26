import { Theme } from '@mui/material';
/**
 * styles for CcfVoiceContact
 * @returns ccfVoiceContactStyles styles object
 * @example <ccfVoiceContactStyles />
 */
export declare const ccfVoiceContactStyles: (theme: Theme) => {
    controlPanelContainer: {
        display: string;
        zIndex: number;
        flexDirection: string;
    };
    dockedControls: {
        display: string;
        width: string;
        flexDirection: string;
        padding: string;
    };
    controlPanel: {
        [x: string]: string | {
            marginTop: string;
            backgroundColor: string;
            boxShadow: string;
            borderRadius: string;
        };
        borderRadius: string;
        border: string;
        boxShadow: string;
    };
    keypad: {
        width: string;
        position: string;
        zIndex: number;
        border: string;
    };
    contactControlStyle: {
        [x: string]: {
            width: string;
        };
    };
    timerStyles: {
        font: string;
        display: string;
        letterSpacing: string;
        textOverflow: string;
        overflow: string;
        whiteSpace: string;
        marginLeft: string;
        onHold: {
            color: string;
            font: string;
            letterSpacing: string;
        };
    };
    getFooterForSmallView: {
        display: string;
        gridTemplateColumns: string;
        gap: string;
        alignItems: string;
    };
};
export default ccfVoiceContactStyles;
