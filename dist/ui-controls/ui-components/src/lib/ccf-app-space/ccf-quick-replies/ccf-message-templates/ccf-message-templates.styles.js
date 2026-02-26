/**
 * Styling for ccfMessageTemplatesStyles
 * @returns ccfMessageTemplatesStyles CSS properties as a JSON object
 * @example ccfMessageTemplatesStyles(theme)
*/
const ccfMessageTemplatesStyles = (theme) => {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    const styles = {
        messageTemplatesContainer: {
            boxSizing: 'border-box',
            height: '100%',
            '>div:first-child': {
                height: '100%',
            },
            div: {
                boxSizing: 'border-box',
            },
            listContainer: {
                height: '100%',
            },
            cardsContainer: {
                /**
                 * Card container height is adjusted by minus size of search box and tab header which is total of 78 pixels
                 */
                height: 'calc(100% - 78px)',
                overflowY: 'auto',
            },
            listSection: {
                paddingTop: '20px',
                borderRadius: '6px',
                height: '100%',
                boxShadow: 'none',
            },
            previewSection: {
                borderRadius: 0,
                height: '100%',
                boxShadow: 'none',
            },
            loader: {
                display: 'flex',
                justifyContent: 'center',
                paddingTop: '20px',
            },
        },
        searchContainer: {
            display: 'flex',
            margin: '0 10px',
        },
        searchInput: {
            background: theme.palette.background.default,
            opacity: 0.6,
            height: '35px',
            '>div': {
                paddingLeft: '10px',
            },
            input: {
                padding: '6px 10px 6px 0',
            },
        },
        tabsContainer: {
            height: '25px',
            minHeight: '23px',
            margin: '8px 10px',
            '& .MuiTab-root': {
                minWidth: '63px',
                maxWidth: '84px',
                margin: '0px 1px',
                height: '24px',
                minHeight: '24px',
                padding: '0px',
                fontSize: '11px',
                letterSpacing: '0',
                color: theme.palette.secondary.main,
            },
            '& .Mui-selected': {
                background: theme.palette.background.default,
                borderRadius: '2px',
                fontWeight: '600',
            },
        },
        noMatchFound: {
            color: theme.palette.text.contrastText,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: '20px',
        },
        noResultFoundIcon: {
            width: '100%',
            height: '150px',
        },
        replyCard: {
            background: theme.palette.background.paper,
            boxShadow: 'none',
            padding: '10px 12px 10px 10px',
            borderRadius: '0.4rem',
            margin: '0.5rem',
            cursor: 'pointer',
            '*': {
                wordBreak: 'break-word',
            },
            '&:hover': {
                background: theme.palette.background.default,
            },
        },
        category: {
            background: theme.palette.background.noteInput,
            boxShadow: 'none',
            padding: '10px 12px 10px 10px',
            fontSize: '12px',
            fontWeight: '600',
            letterSpacing: '0px',
            borderRadius: '0px',
            cursor: 'arrow',
            '*': {
                wordBreak: 'break-word',
            },
        },
        nonFavReply: {
            color: theme.palette.background.default,
        },
        quickReplyHeader: {
            padding: '0',
            maxHeight: '20px',
            marginBottom: '5px',
            '& .MuiCardHeader-title': {
                fontSize: (_b = (_a = theme === null || theme === void 0 ? void 0 : theme.typography) === null || _a === void 0 ? void 0 : _a.h6) === null || _b === void 0 ? void 0 : _b.fontSize,
                fontWeight: 600,
                letterSpacing: 0,
                color: (_d = (_c = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _c === void 0 ? void 0 : _c.text) === null || _d === void 0 ? void 0 : _d.contrastText,
                opacity: 1,
            },
        },
        replyContent: {
            fontSize: (_f = (_e = theme === null || theme === void 0 ? void 0 : theme.typography) === null || _e === void 0 ? void 0 : _e.h6) === null || _f === void 0 ? void 0 : _f.fontSize,
            letterSpacing: '0px',
            color: (_h = (_g = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _g === void 0 ? void 0 : _g.text) === null || _h === void 0 ? void 0 : _h.contrastText,
        },
    };
    return styles;
};
export default ccfMessageTemplatesStyles;
//# sourceMappingURL=ccf-message-templates.styles.js.map