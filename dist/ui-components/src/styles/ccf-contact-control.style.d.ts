import { Theme } from '@mui/material';
/**
 * global style object for contact control buttons
 * @returns contactControlStyles styles object
 * @example <contactControlStyles />
 */
export declare const contactControlStyles: (theme: Theme) => {
    contactPanelButton: {
        [x: string]: string | {
            backgroundColor: string;
            borderRadius: string;
            marginLeft?: undefined;
            marginRight?: undefined;
            opacity?: undefined;
            pointerEvents?: undefined;
            cursor?: undefined;
        } | {
            marginLeft: string;
            marginRight: string;
            backgroundColor?: undefined;
            borderRadius?: undefined;
            opacity?: undefined;
            pointerEvents?: undefined;
            cursor?: undefined;
        } | {
            opacity: string;
            pointerEvents: string;
            cursor: string;
            backgroundColor?: undefined;
            borderRadius?: undefined;
            marginLeft?: undefined;
            marginRight?: undefined;
        };
        padding: string;
        cursor: string;
        width: string;
        height: string;
        '&:hover, &:focus, &:focus-visible, &.MuiButtonBase-root:hover, &.MuiButtonBase-root:focus, &.MuiButtonBase-root:focus-visible': {
            backgroundColor: string;
            borderRadius: string;
        };
        color: string;
        '&.Mui-disabled': {
            opacity: string;
            pointerEvents: string;
            cursor: string;
        };
    };
    footerContainer: {
        padding: string;
        display: string;
        flexDirection: string;
        alignItems: string;
        cursor: string;
        justifyContent: string;
    };
    fullWidth: {
        width: string;
    };
    horizontalDivider: {
        width: string;
        margin: string;
    };
    markAsResolved: {
        margin: number;
    };
    resolvedIcon: {
        fill: string;
    };
    hover: {
        ':hover': {
            backgroundColor: string;
        };
    };
    disabled: {
        '&.Mui-disabled': {
            opacity: string;
            pointerEvents: string;
            cursor: string;
        };
    };
    icon: {
        width: string;
        height: string;
    };
    directoryItemAgentLabel: {
        fontWeight: string;
        fontSize: import("csstype").Property.FontSize<string | number> | undefined;
        color: string;
        fontFamily: import("csstype").Property.FontFamily | undefined;
    };
    fullViewDirectoryIcons: {
        minWidth: string;
        marginLeft: string;
        color: string;
    };
    phoneIconFullViewDirectory: {
        minWidth: string;
        marginLeft: string;
        color: string;
        '&.Mui-disabled': {
            opacity: string;
            pointerEvents: string;
            cursor: string;
        };
        '&.MuiButton-textSecondary': {
            color: string;
            minWidth: string;
            '&:hover': {
                backgroundColor: string;
                color: string;
            };
        };
    };
    controlIconsResponsiveStyles: {
        [x: string]: {
            fontSize: string;
        };
    };
    ccfDivider: {
        [x: string]: {
            borderColor: string | undefined;
            opacity: number;
        };
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
    timerStyles: {
        font: string;
        display: string;
        padding: string;
        letterSpacing: string;
        textOverflow: string;
        overflow: string;
        whiteSpace: string;
    };
};
export default contactControlStyles;
