import { Theme } from '@mui/material';
/**
   * Conference Styles
   * @example conferenceStyles(theme)
*/
declare const conferenceStyles: (theme: Theme) => {
    conferenceActionIcon: {
        color: string;
        width: string;
        height: string;
        cursor: string;
        padding: string;
        justifyContent: string;
    };
    addIconMargin: {
        margin: string;
    };
    consultIconsMargin: {
        margin: string;
    };
    conferenceActionsPanel: {
        display: string;
        alignItems: string;
        justifyContent: string;
        margin: string;
        paddingLeft: string;
    };
    userInLobbyContainer: {
        padding: string;
    };
    callControlHover: {
        '&hover': {
            cursor: string;
            borderRadius: string;
        };
    };
    holdIcon: {
        fontSize: string;
    };
    contentBoldText: {
        fontWeight: string;
    };
    userInConferenceTypography: {
        fontWeight: string;
        fontSize: string;
        width: string;
        height: string;
        padding: string;
    };
    buttonStyle: {
        cursor: string;
        borderRadius: string;
        justifyContent: string;
        '&:hover, &:focus, &:focus-visible, &.MuiButtonBase-root:hover, &.MuiButtonBase-root:focus, &.MuiButtonBase-root:focus-visible': {
            backgroundColor: string;
        };
        padding: string;
        margin: string;
        width: string;
    };
    content: {
        '&.MuiCardContent-root': {
            padding: string;
            display: string;
            margin: string;
        };
    };
    contentColumn: {
        flexDirection: string;
    };
};
export default conferenceStyles;
