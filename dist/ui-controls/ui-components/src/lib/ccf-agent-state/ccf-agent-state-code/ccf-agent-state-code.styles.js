/**
 * return styles used for the component
 * @example agentStateCodeStyles(theme)
 * @returns styles
 */
export const agentStateCodeStyles = (theme) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    const styles = {
        stateCodeItem: {
            paddingInlineStart: '8px',
            height: '40px',
            paddingRight: '0.5rem',
            button: {
                display: 'none',
            },
            span: {
                paddingLeft: '8px',
            },
            '&:hover, &:focus-within': {
                cursor: 'pointer',
                span: {
                    fontWeight: 'bold',
                    paddingLeft: '12px',
                },
                button: {
                    display: 'flex',
                    height: '1.8rem',
                },
            },
        },
        codeStatusIcon: {
            minWidth: '0px',
        },
        toggleFavAction: {
            right: '5px',
            top: '25%',
        },
        listText: {
            fontSize: '0.875rem',
            lineHeight: '1.188rem',
            letterSpacing: '0px',
            marginLeft: '7px',
        },
        stateCodeItemBg: {
            '&:hover, &:focus-within': {
                background: `0% 0% no-repeat padding-box ${(_b = (_a = theme.palette) === null || _a === void 0 ? void 0 : _a.background) === null || _b === void 0 ? void 0 : _b.hover}`,
            },
        },
        textButton: {
            '&:active': {
                backgroundColor: `${(_d = (_c = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _c === void 0 ? void 0 : _c.background) === null || _d === void 0 ? void 0 : _d.pressedTextButtonBackground}`,
                borderRadius: '0.25rem',
            },
        },
        focussedElement: {
            '&:focus': {
                border: `0.0625rem solid ${(_f = (_e = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _e === void 0 ? void 0 : _e.border) === null || _f === void 0 ? void 0 : _f.menuItemHighlight}`,
                borderRadius: '0.25rem',
                outline: 'none',
            },
        },
        starIcon: {
            fill: (_g = theme.palette) === null || _g === void 0 ? void 0 : _g.warning.main,
        },
        iconAvailable: {
            fill: (_h = theme.palette) === null || _h === void 0 ? void 0 : _h.success.main,
        },
        iconDialer: {
            fill: (_j = theme.palette) === null || _j === void 0 ? void 0 : _j.accent.main,
        },
        iconUnavailable: {
            fill: (_k = theme.palette) === null || _k === void 0 ? void 0 : _k.error.main,
        },
        listTextColor: {
            color: (_m = (_l = theme.palette) === null || _l === void 0 ? void 0 : _l.text) === null || _m === void 0 ? void 0 : _m.dark,
        },
        stateTextWrapper: {
            outline: 'none',
        },
    };
    return styles;
};
export default agentStateCodeStyles;
//# sourceMappingURL=ccf-agent-state-code.styles.js.map