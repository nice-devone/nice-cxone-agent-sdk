/**
 * return styles used for the component
 * @example agentStateAvatarStyles(theme)
 * @returns styles
 */
export const agentStateAvatarStyles = (theme) => {
    var _a, _b, _c, _d, _e, _f;
    const styles = {
        myProfileBg: {
            '&:hover': {
                background: `0% 0% no-repeat padding-box ${(_b = (_a = theme.palette) === null || _a === void 0 ? void 0 : _a.background) === null || _b === void 0 ? void 0 : _b.hover}`,
            },
        },
        greenBadgeColor: {
            fill: (_c = theme.palette) === null || _c === void 0 ? void 0 : _c.success.main,
        },
        redBadgeColor: {
            fill: (_d = theme.palette) === null || _d === void 0 ? void 0 : _d.error.main,
        },
        orangeBadgeColor: {
            fill: (_e = theme.palette) === null || _e === void 0 ? void 0 : _e.accent.main,
        },
        avatarHeaderBg: {
            backgroundColor: (_f = theme.palette) === null || _f === void 0 ? void 0 : _f.background.paper,
        },
        agentStateAvatar: {
            fontStyle: 'normal',
            fontVariant: 'normal',
            fontWeight: 600,
            fontSize: '1rem',
            lineHeight: '1.375rem',
        },
        avatarMain: {
            display: 'flex',
            paddingLeft: '5px',
            paddingRight: '5px',
        },
        myProfile: {
            display: 'flex',
            alignItems: 'center',
            paddingRight: '5px',
            height: '45px',
            paddingLeft: '8px',
        },
        fillGreenBadge: {
            width: '17px',
            height: '17px',
        },
        fillRedBadge: {
            width: '17px',
            height: '17px',
        },
        avatarHeader: {
            height: '40px',
            width: '40px',
            alignItems: 'center',
            alignSelf: 'center',
            fontSize: '1rem',
            lineHeight: '1.375rem',
        },
    };
    return styles;
};
export default agentStateAvatarStyles;
//# sourceMappingURL=ccf-agent-state-avatar.styles.js.map