import { Theme } from '@mui/material';
/**
 * style object for ccf-voicemail-contact-panel
 * @returns CcfVoicemailContactPanelStyles styles object
 * @example <CcfVoicemailContactPanelStyles />
 */
export declare const ccfVoicemailContactPanelStyles: (theme: Theme) => {
    revampedVoicemailIcons: {
        height: {
            xs: number;
            xl: number;
        };
        width: {
            xs: number;
            xl: number;
        };
        '&:hover': {
            backgroundColor: string;
        };
    };
    paperContainer: {
        [x: string]: string | {
            paddingTop: number;
            marginTop: string;
        };
        borderRadius: string;
        margin: string;
        paddingTop: string;
    };
    paperContainerDisabled: {
        [x: string]: string | {
            paddingTop: number;
            marginTop: string;
        };
        backgroundColor: string;
        borderRadius: string;
        margin: string;
        opacity: string;
        paddingTop: string;
    };
    voicemailHeaderGrid: {
        [x: string]: string | number | {
            position: string;
        };
        display: string;
        alignItems: string;
        top: number;
        marginLeft: number;
    };
    voicemailIconHeaderTitleGrid: {
        display: string;
        flexFlow: string;
        alignItems: string;
    };
    voicemailIcon: {
        [x: string]: string | {
            marginLeft: number;
        } | undefined;
        color: string | undefined;
    };
    headerTitle: {
        fontSize: import("@mui/material/styles/createTypography").CSSProperties;
        fontWeight: string;
        paddingLeft: number;
    };
    overflowIconGrid: {
        display: string;
        justifyContent: string;
    };
    voicemailControlsContainer: {
        display: string;
        padding: string;
        flexDirection: string;
    };
    callbackTransferRow: {
        [x: string]: string | {
            justifyContent: string;
            flexFlow: string;
        };
        display: string;
        flexFlow: string;
        height: string;
        justifyContent: string;
        flexDirection: string;
    };
    callbackTransferGrid: {
        [x: string]: string | {
            justifyContent: string;
        };
        display: string;
        justifyContent: string;
    };
    trashBinResolveRow: {
        [x: string]: string | {
            justifyContent: string;
        };
        display: string;
        flexDirection: string;
        justifyContent: string;
    };
    voicemailControlsGrid: {
        [x: string]: string | {
            justifyContent: string;
        };
        display: string;
        justifyContent: string;
        alignItems: string;
    };
    replayIconFileDurationGrid: {
        [x: string]: string | {
            padding: number;
            justifyContent: string;
        };
        color: string;
        padding: string;
        justifyContent: string;
        flexFlow: string;
    };
    timeStampGridWrapper: {
        [x: string]: string | {
            xs: number;
            xl: number;
            marginRight?: undefined;
        } | {
            marginRight: string;
            xs?: undefined;
            xl?: undefined;
        };
        display: string;
        alignItems: string;
        order: {
            xs: number;
            xl: number;
        };
    };
    timestampIA: {
        color: string;
        fontSize: import("@mui/material/styles/createTypography").CSSProperties;
    };
    holdTimer: {
        textAlign: string;
        color: string;
        fontSize: import("@mui/material/styles/createTypography").CSSProperties;
        fontWeight: string;
        paddingBottom: string;
    };
    verticalDivider: {
        [x: string]: {
            height: string;
            borderColor: string;
            opacity: number;
            padding: string;
        };
    };
    circularProgress: {
        [x: string]: string | number | {
            top: number;
            left: number;
            height: number;
            width: number;
        };
        position: string;
        top: number;
        left: number;
        zIndex: number;
        height: string;
        width: string;
    };
    replayIcon: {
        [x: string]: string | {
            fontSize: string;
            margin: string;
        };
        height: string;
        fontSize: string;
        width: string;
    };
    resumeIcon: {
        [x: string]: import("@mui/material/styles/createTypography").CSSProperties | {
            fontSize: import("@mui/material/styles/createTypography").CSSProperties;
        };
        fontSize: import("@mui/material/styles/createTypography").CSSProperties;
    };
    voicemailControlsInnerContainer: {
        [x: string]: string | {
            flexFlow: string;
            backgroundColor: string;
        };
        display: string;
        justifyContent: string;
        alignItems: string;
        flexFlow: string;
    };
};
export default ccfVoicemailContactPanelStyles;
