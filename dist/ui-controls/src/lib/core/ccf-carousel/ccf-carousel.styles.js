/**
 * @example styles for carousel component
 */
const ccfCarouselStyles = (theme) => {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    const styles = {
        mainCard: {
            display: 'flex',
            alignItems: 'center',
            paddingTop: '0.625rem',
            paddingBottom: '0.313rem',
        },
        responseText: {
            fontSize: '0.75rem',
            lineHeight: '1rem',
            color: (_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.text) === null || _b === void 0 ? void 0 : _b.main,
            fontWeight: '600',
        },
        indicators: {
            display: 'flex',
            justifyContent: 'center',
            padding: '0.25rem',
            minwidth: '3rem',
        },
        indicator: {
            height: '0.25rem',
            borderRadius: '50%',
            background: (_d = (_c = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _c === void 0 ? void 0 : _c.background) === null || _d === void 0 ? void 0 : _d.darkGrey,
            cursor: 'pointer',
            border: 'none',
            display: 'block',
            minWidth: '0.25rem',
            padding: '0rem',
        },
        activeIndicator: {
            height: '0.25rem',
            borderRadius: '50%',
            cursor: 'pointer',
            border: 'none',
            display: 'block',
            minWidth: '0.25rem',
            background: (_f = (_e = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _e === void 0 ? void 0 : _e.text) === null || _f === void 0 ? void 0 : _f.noteLabel,
            padding: '0rem',
        },
        card: {
            boxShadow: 'none',
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
        },
        cardContent: {
            boxShadow: 'none',
            padding: '0rem',
            borderRadius: '1.5rem',
        },
        carouselDots: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '0.25rem',
            columnGap: '0.188rem',
            alignSelf: 'center',
            margin: '0.25rem',
        },
        iconsHover: {
            '&:hover svg path': {
                fill: (_h = (_g = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _g === void 0 ? void 0 : _g.text) === null || _h === void 0 ? void 0 : _h.noteLabel,
            },
        },
        arrow: {
            minWidth: '0',
        },
    };
    return styles;
};
export default ccfCarouselStyles;
//# sourceMappingURL=ccf-carousel.styles.js.map