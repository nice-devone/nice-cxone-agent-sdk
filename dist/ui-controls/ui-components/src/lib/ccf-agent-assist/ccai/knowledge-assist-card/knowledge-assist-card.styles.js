/**
 * Styling for knowledgeAssistCardStyles
 * @returns knowledgeAssistCardStyles CSS properties as a JSON object
 * @example knowledgeAssistCardStyles(theme)
*/
const knowledgeAssistCardStyles = (theme) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x;
    const styles = {
        mainBox: {
            width: '100%',
        },
        kbArticleContainer: {
            display: 'flex',
            flexDirection: 'column',
            gap: '0.4rem',
        },
        mainFlexContainer: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'start',
            gap: '0.7rem',
        },
        iconImage: {
            marginTop: '3px',
        },
        innerFlexContainer: {
            display: 'flex',
            flexDirection: 'column',
            flex: '1',
            gap: '0.3rem',
        },
        articleFlexContainer: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
            gap: '0.4rem',
        },
        h5Margin: {
            margin: 'auto',
        },
        articleDescription: {
            fontSize: '12px',
            fontWeight: '400',
        },
        articleRelevanceCopyContainer: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        smViewArticleRelevanceCopyContainer: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginLeft: '-2.0rem',
        },
        relevanceContainerWidth: {
            width: '80%',
        },
        relevanceScoreContainer: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '0.2rem',
        },
        relevanceScoreText: {
            fontWeight: '600',
            fontSize: 12,
        },
        copyButton: {
            backgroundColor: (_b = (_a = theme.palette) === null || _a === void 0 ? void 0 : _a.text) === null || _b === void 0 ? void 0 : _b.white,
            color: (_d = (_c = theme.palette) === null || _c === void 0 ? void 0 : _c.primary) === null || _d === void 0 ? void 0 : _d.main,
            borderColor: (_f = (_e = theme.palette) === null || _e === void 0 ? void 0 : _e.primary) === null || _f === void 0 ? void 0 : _f.main,
            height: '1.6rem',
            width: '5.0rem',
        },
        copyButtonContent: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        tag: {
            fontSize: '11px',
            backgroundColor: (_h = (_g = theme.palette) === null || _g === void 0 ? void 0 : _g.text) === null || _h === void 0 ? void 0 : _h.black,
            color: (_k = (_j = theme.palette) === null || _j === void 0 ? void 0 : _j.text) === null || _k === void 0 ? void 0 : _k.white,
            padding: '0.2rem 0.4rem',
        },
        faqIcon: {
            color: (_m = (_l = theme.palette) === null || _l === void 0 ? void 0 : _l.text) === null || _m === void 0 ? void 0 : _m.faqIcon,
            marginTop: '0.2rem',
        },
        faq: {
            backgroundColor: (_p = (_o = theme.palette) === null || _o === void 0 ? void 0 : _o.text) === null || _p === void 0 ? void 0 : _p.faqIcon,
        },
        articleIcon: {
            color: (_r = (_q = theme.palette) === null || _q === void 0 ? void 0 : _q.text) === null || _r === void 0 ? void 0 : _r.articleIcon,
            marginTop: '0.2rem',
        },
        article: {
            backgroundColor: (_t = (_s = theme.palette) === null || _s === void 0 ? void 0 : _s.text) === null || _t === void 0 ? void 0 : _t.articleIcon,
        },
        copySnackBar: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            height: '3.5rem',
            backgroundColor: (_v = (_u = theme.palette) === null || _u === void 0 ? void 0 : _u.success) === null || _v === void 0 ? void 0 : _v.dark,
            color: (_x = (_w = theme.palette) === null || _w === void 0 ? void 0 : _w.text) === null || _x === void 0 ? void 0 : _x.white,
            fontSize: '16px',
            fontWeight: '600',
        },
    };
    return styles;
};
export default knowledgeAssistCardStyles;
//# sourceMappingURL=knowledge-assist-card.styles.js.map