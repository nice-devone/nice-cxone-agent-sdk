/**
 * Styling for ccf-app-space-quick-replies
 * @returns ccf-app-space-quick-replies CSS properties as a JSON object
 * @example ccfQuickRepliesStyles(theme)
*/
const ccfAppHamburgerMenuStyles = (theme) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    const styles = {
        divider: {
            opacity: 0.6,
        },
        closeButton: {
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '0.75rem',
            marginTop: '4px',
            opacity: '0.9',
            backgroundColor: 'transparent',
            border: 'none',
            boxShadow: 'none',
            '&:hover': {
                backgroundColor: 'transparent',
                border: 'none',
                boxShadow: 'none',
            },
        },
        menuName: {
            fontSize: '0.75rem',
            marginLeft: '10px',
            marginRight: 'auto',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
        },
        launchIcon: {
            marginLeft: '0',
            color: theme.palette.text.primary,
            fontFamily: 'inherit',
        },
        dragIconContainer: {
            display: 'flex',
        },
        closeIcon: {
            cursor: 'pointer',
            color: (_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.text) === null || _b === void 0 ? void 0 : _b.black,
        },
        draggableItem: {
            '& >div': {
                padding: '6px',
                opacity: '0.9',
                '&:hover, &:visited': {
                    backgroundColor: (_c = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _c === void 0 ? void 0 : _c.background.default,
                },
            },
            '&:nth-child(8)': {
                '&>div': {
                    paddingBottom: '15px',
                },
            },
            '&:nth-child(9)': {
                '&>div': {
                    paddingTop: '15px',
                },
            },
            '& button.popOverOverflow ': {
                maxHeight: '24px',
                '& span': {
                    marginLeft: '3px',
                },
            },
        },
        customizeText: {
            fontWeight: (_d = theme === null || theme === void 0 ? void 0 : theme.typography) === null || _d === void 0 ? void 0 : _d.fontWeightBold,
            color: (_f = (_e = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _e === void 0 ? void 0 : _e.text) === null || _f === void 0 ? void 0 : _f.black,
        },
        listSubheader: {
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '0.5rem',
            paddingRight: '0.5rem',
        },
        dragIcon: {
            cursor: 'grab',
        },
        menuActive: {
            '& .Mui-selected': {
                backgroundColor: (_h = (_g = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _g === void 0 ? void 0 : _g.background) === null || _h === void 0 ? void 0 : _h.hoverDark,
            },
        },
        pinIcon: {
            height: '21px',
            width: '21px',
            color: (_k = (_j = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _j === void 0 ? void 0 : _j.background) === null || _k === void 0 ? void 0 : _k.dark,
            padding: '3px 5px 1px 2px',
            margin: '0px 8px',
            transform: 'rotate(45deg)',
        },
        focussedElement: {
            '&:focus': {
                border: `0.0625rem solid ${(_m = (_l = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _l === void 0 ? void 0 : _l.border) === null || _m === void 0 ? void 0 : _m.menuItemHighlight}`,
                borderRadius: '0.25rem',
            },
        },
    };
    return styles;
};
export default ccfAppHamburgerMenuStyles;
//# sourceMappingURL=ccf-app-hamburger-menu.styles.js.map