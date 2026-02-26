/**
 * Styling for ccf-app-space-quick-replies
 * @returns ccf-app-space-quick-replies CSS properties as a JSON object
 * @example ccfQuickRepliesStyles(theme)
*/
const ccfQuickRepliesStyles = (theme, _isOutBound) => {
    var _a, _b, _c, _d, _e, _f;
    const styles = {
        quickReplyContainer: {
            boxSizing: 'border-box',
            height: '100%',
            '>div:first-child': {
                height: '100%',
            },
            'div': {
                boxSizing: 'border-box',
            },
            listContainer: {
                height: '100%',
            },
            cardsContainer: {
                height: 'calc(100% - 110px)',
                borderBottom: `1px solid ${theme.palette.divider}`,
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
            paginationWrapper: {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                height: '2rem',
                paddingRight: '10px',
            },
            prevNextButton: {
                background: 'none !important',
                boxShadow: 'none !important',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minWidth: '1.5rem',
                width: 'auto',
                height: '1.5rem',
                padding: 0,
            },
        },
        favListContainer: {
            height: 'calc(100% - 79px)',
            background: theme.palette.background.paper,
            overflowY: 'auto',
        },
        searchContainer: {
            display: 'flex',
            margin: '0 10px',
        },
        searchInput: {
            background: theme.palette.background.default,
            height: '35px',
            '>div': {
                paddingLeft: '10px',
            },
            'input': {
                padding: '6px 10px 6px 0',
            },
        },
        tabsContainer: {
            height: '1.625rem',
            minHeight: '23px',
            margin: '8px 10px',
            '& .MuiTab-root': {
                minWidth: '63px',
                maxWidth: 'max-content',
                margin: '0px 1px',
                height: '24px',
                minHeight: '24px',
                font: 'normal normal normal 11px/15px Open Sans',
                letterSpacing: '0',
                color: theme.palette.secondary.main,
                opacity: 1,
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
        loadMoreContainer: {
            display: 'flex',
            marginLeft: '0.75rem',
            marginBottom: '0.5rem',
            marginTop: '0.25rem',
            cursor: 'pointer',
        },
        loadMoreButton: {
            color: (_b = (_a = theme.palette) === null || _a === void 0 ? void 0 : _a.text) === null || _b === void 0 ? void 0 : _b.dark,
            fontSize: '0.7rem',
            fontWeight: 500,
            textDecoration: 'underline',
            cursor: 'pointer',
        },
        focussedElement: {
            '&:focus': {
                border: `0.0625rem solid ${(_d = (_c = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _c === void 0 ? void 0 : _c.border) === null || _d === void 0 ? void 0 : _d.menuItemHighlight}`,
                borderRadius: '0.25rem',
            },
        },
        searchInputField: {
            '&::placeholder': {
                color: (_f = (_e = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _e === void 0 ? void 0 : _e.text) === null || _f === void 0 ? void 0 : _f.placeholder,
                opacity: 1, // otherwise browser shows a lighter color
            },
        },
    };
    return styles;
};
export default ccfQuickRepliesStyles;
//# sourceMappingURL=ccf-quick-replies.styles.js.map