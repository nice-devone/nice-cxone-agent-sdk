import { Theme } from '@mui/material';
/**
 * styles for CcfContactControls
 * @returns ccfContactControlsStyles styles object
 * @example <ccfContactControlsStyles />
 */
export declare const ccfContactControlsStyles: (theme: Theme) => {
    controlPanelContainer: {
        [x: string]: string | {
            position: string;
            bottom: string;
            width: string;
        };
        display: string;
        flexDirection: string;
    };
    dockedControls: {
        display: string;
        width: string;
        marginLeft: string;
        flexDirection: string;
    };
    contactControlButton: {
        margin: string;
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
    digitalPanelButtonConf: {
        width: string;
        cursor: string;
        height: string;
        margin: string;
        display: string;
        padding: string;
        alignItems: string;
        justifyContent: string;
    };
    hungUp: {
        [x: string]: string | {
            width: string;
        };
        width: string;
        margin: string;
    };
    hungUp1: {
        [x: string]: string | {
            width: string;
        };
        width: string;
        margin: string;
    };
    contactControlPanel: {
        [x: string]: string | {
            backgroundColor: string;
            margin: string;
        };
        backgroundColor: string;
        display: string;
        justifyContent: string;
        flexFlow: string;
    };
    contactControlPanelConf: {
        justifyContent: string;
    };
    markAsResolved: {
        [x: string]: string | {
            backgroundColor: string;
            width?: undefined;
        } | {
            width: string;
            backgroundColor?: undefined;
        };
        display: string;
        justifyContent: string;
        alignItems: string;
        borderRadius: string;
        paddingTop: string;
        '&:hover': {
            backgroundColor: string;
        };
    };
    controlsGrid: {
        [x: string]: string | {
            justifyContent: string;
            flexFlow: string;
            width: string;
            padding: string;
            alignItems: string;
        };
        justifyContent: string;
        padding: string;
        marginBottom: string;
        display: string;
        flexFlow: string;
        alignItems: string;
    };
    consultConferenceGrid: {
        [x: string]: string | {
            justifyContent: string;
            flexFlow: string;
            width: string;
            padding: string;
            alignItems: string;
        };
        padding: string;
        marginBottom: string;
        display: string;
        alignItems: string;
    };
    integratedHeader: {
        backgroundColor: string;
        boxShadow: string;
        borderRadius: string;
    };
    resolvedIcon: {
        fill: string;
        fontSize: string;
    };
    responsiveControls: {
        padding: string;
    };
    callControlDisabled: {
        '& .Mui-disabled': {
            opacity: string;
            pointerEvents: string;
            cursor: string;
        };
    };
    timerStyles: {
        font: string;
        display: string;
        padding: string;
        letterSpacing: string;
        textOverflow: string;
        overflow: string;
        whiteSpace: string;
    };
    timerDisable: {
        color: string;
    };
};
export default ccfContactControlsStyles;
