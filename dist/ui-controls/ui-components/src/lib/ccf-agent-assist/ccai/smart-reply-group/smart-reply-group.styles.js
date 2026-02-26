/**
 * Styling for smartReplyGroupStyles
 * @returns smartReplyGroupStyles CSS properties as a JSON object
 * @example smartReplyGroupStyles(theme)
*/
const smartReplyGroupStyles = (theme) => {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    const styles = {
        mainFlexContainer: {
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
            gap: '2%',
            marginRight: '1%',
        },
        smartReplyTitleContainer: {
            height: '20%',
            width: '100%',
            flex: 1,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
            gap: '1%',
            marginBottom: '1%',
        },
        smartReplyListContainer: {
            height: '80%',
            width: '97%',
            marginLeft: '3%',
            marginBottom: '1%',
        },
        smartReplyListFlexBox: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'start',
            justifyContent: 'flex-start',
            gap: '8px',
        },
        tag: {
            fontSize: '11px',
            backgroundColor: (_b = (_a = theme.palette) === null || _a === void 0 ? void 0 : _a.text) === null || _b === void 0 ? void 0 : _b.black,
            color: (_d = (_c = theme.palette) === null || _c === void 0 ? void 0 : _c.text) === null || _d === void 0 ? void 0 : _d.white,
            padding: '2px 8px',
            borderRadius: '0 0 0 2px',
            lineHeight: '18px',
        },
        smartReplyIcon: {
            color: `var(--color1, ${(_f = (_e = theme.palette) === null || _e === void 0 ? void 0 : _e.text) === null || _f === void 0 ? void 0 : _f.smartReplyIcon})`,
        },
        smartReply: {
            backgroundColor: (_h = (_g = theme.palette) === null || _g === void 0 ? void 0 : _g.text) === null || _h === void 0 ? void 0 : _h.smartReplyIcon,
        },
    };
    return styles;
};
export default smartReplyGroupStyles;
//# sourceMappingURL=smart-reply-group.styles.js.map