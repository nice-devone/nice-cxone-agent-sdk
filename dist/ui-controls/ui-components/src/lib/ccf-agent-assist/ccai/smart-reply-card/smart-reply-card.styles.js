/**
 * Styling for smartReplyCardStyles
 * @returns smartReplyCardStyles CSS properties as a JSON object
 * @example smartReplyCardStyles(theme)
*/
const smartReplyCardStyles = (theme) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    const styles = {
        mainContainer: {
            width: '100%',
            borderRadius: '18px',
        },
        paddingContainer: {
            width: '100%',
            padding: '0.5%',
        },
        mainFlexContainer: {
            flex: 1,
            display: 'flex',
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '2%',
        },
        articleTitleContainer: {
            width: '60%',
            marginLeft: '1%',
        },
        articleTitleText: {
            fontSize: 14,
            fontWeight: 600,
        },
        cardFooterFlexContainer: {
            width: '40%',
            flex: 1,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: '5%',
        },
        confidenceFlexContainer: {
            width: '80%',
            flex: 1,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: '2px',
        },
        numericIconContainer: {
            marginTop: '1%',
            width: '6%',
        },
        confidenceScore: {
            width: '18%',
        },
        copyButtonContainer: {
            width: '20%',
        },
        copyButton: {
            backgroundColor: (_b = (_a = theme.palette) === null || _a === void 0 ? void 0 : _a.text) === null || _b === void 0 ? void 0 : _b.white,
            color: (_d = (_c = theme.palette) === null || _c === void 0 ? void 0 : _c.text) === null || _d === void 0 ? void 0 : _d.black,
            borderColor: (_f = (_e = theme.palette) === null || _e === void 0 ? void 0 : _e.text) === null || _f === void 0 ? void 0 : _f.black,
        },
        tag: {
            fontSize: '11px',
            backgroundColor: (_h = (_g = theme.palette) === null || _g === void 0 ? void 0 : _g.text) === null || _h === void 0 ? void 0 : _h.black,
            color: (_k = (_j = theme.palette) === null || _j === void 0 ? void 0 : _j.text) === null || _k === void 0 ? void 0 : _k.white,
            padding: '2px 8px',
            borderRadius: '0 0 0 2px',
            lineHeight: '18px',
        },
    };
    return styles;
};
export default smartReplyCardStyles;
//# sourceMappingURL=smart-reply-card.styles.js.map