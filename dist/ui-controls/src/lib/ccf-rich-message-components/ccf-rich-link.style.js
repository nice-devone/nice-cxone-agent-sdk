/**
 * renders the style for rich message
 * @param props - Theme
 * @example <CcfRichContactMessageStyle />
 * @returns return the style for rich message
 */
export const CcfRichLinkStyle = (theme) => {
    var _a, _b;
    const style = {
        card: {
            borderRadius: '0.5rem',
            backgroundColor: (_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.background) === null || _b === void 0 ? void 0 : _b.noteInput,
        },
        cardContent: {
            display: 'flex',
            paddingBottom: '1rem !important',
        },
        media: {
            minHeight: '8rem',
            backgroundSize: 'cover',
            alineItems: 'center',
        },
        title: {
            fontWeight: '600',
            fontSize: '1rem',
            lineHeight: 'normal',
            fontStyle: 'normal',
            textTransform: 'capitalize',
        },
        link: {
            fontSize: 'initial',
            fontWeight: '600',
            '&:hover': {
                textDecoration: 'none',
            },
        },
        headerBox: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: '0.5rem',
        },
    };
    return style;
};
//# sourceMappingURL=ccf-rich-link.style.js.map