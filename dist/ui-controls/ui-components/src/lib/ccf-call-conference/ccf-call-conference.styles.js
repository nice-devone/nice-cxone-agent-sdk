/**
   * Conference Styles
   * @example conferenceStyles(theme)
*/
const conferenceStyles = (theme) => {
    var _a, _b;
    const styles = {
        conferenceActionIcon: {
            color: (_a = theme.palette) === null || _a === void 0 ? void 0 : _a.primary.main,
            width: '42px',
            height: '28px',
            cursor: 'pointer',
            padding: '4px',
            justifyContent: 'center',
        },
        addIconMargin: {
            margin: '10px 8px 10px 4px',
        },
        consultIconsMargin: {
            margin: '10px 4px',
        },
        conferenceActionsPanel: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            margin: '0px 8px 4px',
            paddingLeft: '5px',
        },
        userInLobbyContainer: {
            padding: '10px',
        },
        callControlHover: {
            '&hover': {
                cursor: 'pointer',
                borderRadius: '4px',
            },
        },
        holdIcon: {
            fontSize: '2rem',
        },
        contentBoldText: {
            fontWeight: 'bolder',
        },
        userInConferenceTypography: {
            fontWeight: 'bold',
            fontSize: 'small',
            width: '80%',
            height: '2.65em',
            padding: '.5em 0',
        },
        buttonStyle: {
            cursor: 'pointer',
            borderRadius: '4px',
            justifyContent: 'center',
            '&:hover, &:focus, &:focus-visible, &.MuiButtonBase-root:hover, &.MuiButtonBase-root:focus, &.MuiButtonBase-root:focus-visible': {
                backgroundColor: `${(_b = theme.palette) === null || _b === void 0 ? void 0 : _b.background.default}`,
            },
            padding: '4px',
            margin: '1px 6px',
            width: '32px',
        },
        content: {
            '&.MuiCardContent-root': {
                padding: '0px',
                display: 'flex',
                margin: '8px',
            },
        },
        contentColumn: {
            flexDirection: 'column',
        },
    };
    return styles;
};
export default conferenceStyles;
//# sourceMappingURL=ccf-call-conference.styles.js.map