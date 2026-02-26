/**
 * Styling for ccfQuickReplyCard
 * @returns ccfQuickReplyCard CSS properties as a JSON object
 * @example ccfQuickReplyCardStyles(theme, isRichMessage)
*/
const ccfQuickReplyCardStyles = (theme, isRichMessage) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    const styles = {
        replyCard: {
            background: theme.palette.background.paper,
            boxShadow: 'none',
            padding: '10px 12px 10px 10px',
            borderRadius: '0.4rem',
            cursor: 'pointer',
            margin: '0.5rem',
            '*': {
                wordBreak: 'break-word',
            },
            '&:focus, &:focus-visible': {
                border: `2px solid ${(_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.border) === null || _b === void 0 ? void 0 : _b.menuItemHighlight} !important`,
                outline: 'none',
            },
        },
        favIcon: {
            padding: '5px',
        },
        favReply: {
            color: (_d = (_c = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _c === void 0 ? void 0 : _c.digitalStatus) === null || _d === void 0 ? void 0 : _d.openDark,
        },
        quickReplyHeader: {
            padding: '0',
            maxHeight: '20px',
            marginBottom: '5px',
            '& .MuiCardHeader-title': {
                font: 'normal normal 600 11px/19px Open Sans',
                letterSpacing: 0,
                color: theme.palette.text.contrastText,
                opacity: 1,
            },
        },
        replyContent: {
            font: 'normal normal normal 12px/17px Open Sans',
            letterSpacing: '0px',
            color: theme.palette.text.contrastText,
        },
        replyContentV2: {
            font: 'normal normal normal 12px/17px Open Sans',
            letterSpacing: '0px',
            color: theme.palette.text.contrastText,
            maxWidth: '100%',
            overflow: 'hidden',
            overflowX: 'auto',
            textOverflow: 'ellipsis',
        },
        favButton: {
            padding: 0,
        },
        sendButton: {
            justifyContent: 'flex-end',
            'button': {
                boxShadow: 'none',
                cursor: 'pointer',
                ':hover': {
                    boxShadow: 'none',
                },
            },
        },
        selectedRichMsgCard: {
            background: (_f = (_e = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _e === void 0 ? void 0 : _e.background) === null || _f === void 0 ? void 0 : _f.default,
        },
        richLinkIcon: {
            height: '0.7rem',
        },
        textButton: {
            ':active': {
                backgroundColor: (_h = (_g = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _g === void 0 ? void 0 : _g.background) === null || _h === void 0 ? void 0 : _h.pressedTextButtonBackground,
                borderRadius: '0.25rem',
            },
        },
        focussedElement: {
            border: '0.0625rem solid transparent',
            '&:focus': {
                border: `0.0625rem solid ${(_k = (_j = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _j === void 0 ? void 0 : _j.border) === null || _k === void 0 ? void 0 : _k.menuItemHighlight}`,
                borderRadius: '0.25rem',
            },
        },
        hoveredElement: {
            '&:hover': {
                backgroundColor: (_m = (_l = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _l === void 0 ? void 0 : _l.background) === null || _m === void 0 ? void 0 : _m.menuItemHighlight,
                borderRadius: '0.25rem',
            },
        },
        replyCardTitle: {
            paddingLeft: isRichMessage ? '0.4rem' : 0,
        },
    };
    return styles;
};
export default ccfQuickReplyCardStyles;
//# sourceMappingURL=ccf-quick-reply-card.styles.js.map