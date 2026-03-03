/**
 * renders the style for multimedia message
 * @param props - Theme
 * @example <CcfMultimediaStyle />
 * @returns return the style for multimedia message
 */
export const CcfMultimediaStyle = (theme) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    const style = {
        multimediaContainer: {
            padding: theme.spacing(1),
            backgroundColor: (_b = (_a = theme.palette) === null || _a === void 0 ? void 0 : _a.background) === null || _b === void 0 ? void 0 : _b.paper,
            display: 'flex',
        },
        templateContainer: {
            padding: theme.spacing(1),
            borderRadius: '0.3rem',
            display: 'block',
            position: 'relative',
            background: `${(_d = (_c = theme.palette) === null || _c === void 0 ? void 0 : _c.background) === null || _d === void 0 ? void 0 : _d.callControlHeader}`,
        },
        videoControl: {
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            borderRadius: '0.3rem',
        },
        bodyContent: {
            color: (_f = (_e = theme.palette) === null || _e === void 0 ? void 0 : _e.text) === null || _f === void 0 ? void 0 : _f.contrastText,
            padding: '0.5rem',
            display: 'flex',
            paddingLeft: '0.3rem',
        },
        pdfLink: {
            color: (_h = (_g = theme.palette) === null || _g === void 0 ? void 0 : _g.text) === null || _h === void 0 ? void 0 : _h.contrastText,
            '&hover': {
                color: (_k = (_j = theme.palette) === null || _j === void 0 ? void 0 : _j.text) === null || _k === void 0 ? void 0 : _k.contrastText,
            },
        },
        pdfLabel: {
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            paddingLeft: '0.5rem',
            paddingRight: '0.5rem',
        },
        templateMessageRoot: {
            padding: '0',
            backgroundColor: (_m = (_l = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _l === void 0 ? void 0 : _l.background) === null || _m === void 0 ? void 0 : _m.paper,
            maxWidth: '65%',
            marginRight: 0,
        },
        templateTextStyle: {
            fontSize: '0.75rem',
            width: '98%',
            textAlign: 'justify',
        },
        pdfHeader: {
            fontSize: '1rem',
            display: 'flex',
        },
        menuStyle: {
            width: '2%',
        },
    };
    return style;
};
//# sourceMappingURL=ccf-multimedia-message.style.js.map