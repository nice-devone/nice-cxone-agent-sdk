/**
 * style object for ccf-digital-email-v2-reply-container component
 * @returns CcfDigitalEmailV2ReplyContainer styles object
 * ```
 * @example
 * <CcfDigitalEmailV2ReplyContainerStyles/>
 * ```
 */
const CcfDigitalEmailV2ReplyContainerStyles = (theme) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
    const styles = {
        boxContainer: {
            fontSize: (_a = theme === null || theme === void 0 ? void 0 : theme.typography) === null || _a === void 0 ? void 0 : _a.h4,
        },
        popOverMenuItemStyles: {
            '& .popOverActionLabelWrapper .popOverActionLabel': {
                color: (_c = (_b = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _b === void 0 ? void 0 : _b.text) === null || _c === void 0 ? void 0 : _c.contrastText,
                fontWeight: 600,
            },
            '&:hover': {
                border: `0.063rem solid ${(_e = (_d = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _d === void 0 ? void 0 : _d.border) === null || _e === void 0 ? void 0 : _e.menuItemHighlight}`,
                borderRadius: '0.25rem',
            },
            '&:focus': {
                border: `0.063rem solid ${(_g = (_f = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _f === void 0 ? void 0 : _f.border) === null || _g === void 0 ? void 0 : _g.menuItemHighlight}`,
                borderRadius: '0.25rem',
            },
        },
        deleteContent: {
            color: (_j = (_h = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _h === void 0 ? void 0 : _h.text) === null || _j === void 0 ? void 0 : _j.contrastText,
            marginBottom: '0.313rem',
            marginTop: '0.4rem',
        },
        deleteAuthorName: {
            color: (_l = (_k = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _k === void 0 ? void 0 : _k.text) === null || _l === void 0 ? void 0 : _l.contrastText,
            marginTop: '0.188rem',
            marginBottom: '0.563rem',
        },
        iconButton: {
            paddingRight: 0,
            marginTop: '0.3rem',
        },
        iconButtonForward: {
            paddingRight: 0,
            marginTop: '0.2rem',
            left: '0.313rem',
        },
        replyIcon: {
            color: theme.palette.text.clearText,
            marginTop: '0.344rem',
            cursor: 'pointer',
        },
    };
    return styles;
};
export default CcfDigitalEmailV2ReplyContainerStyles;
//# sourceMappingURL=ccf-digital-email-v2-reply-container.style.js.map