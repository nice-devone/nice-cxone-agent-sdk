/**
 * style object for ccf-digital-email-v2-messages component
 * @returns CcfDigitalEmailV2Messages styles object
 * ```
 * @example
 * <CcfDigitalEmailV2MessagesStyles/>
 * ```
 */
const CcfDigitalEmailV2MessagesStyles = (theme, isExpanded, showMoreLess) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
    const styles = {
        boxContainer: {
            fontSize: (_a = theme === null || theme === void 0 ? void 0 : theme.typography) === null || _a === void 0 ? void 0 : _a.h2,
            height: (!isExpanded && showMoreLess) ? '7.5rem' : 'auto',
            width: '95%',
            textAlign: 'left',
            font: `normal normal normal ${(_c = (_b = theme === null || theme === void 0 ? void 0 : theme.typography) === null || _b === void 0 ? void 0 : _b.h6) === null || _c === void 0 ? void 0 : _c.fontSize}/${(_e = (_d = theme === null || theme === void 0 ? void 0 : theme.typography) === null || _d === void 0 ? void 0 : _d.h4) === null || _e === void 0 ? void 0 : _e.fontSize} ${(_f = theme === null || theme === void 0 ? void 0 : theme.typography) === null || _f === void 0 ? void 0 : _f.fontFamily}`,
            letterSpacing: 0,
            color: (_h = (_g = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _g === void 0 ? void 0 : _g.text) === null || _h === void 0 ? void 0 : _h.contrastText,
            opacity: '1',
            '& > span': {
                fontSize: '0.75rem',
                overflowY: 'hidden',
                display: 'block',
                marginLeft: '2.625rem',
            },
            wordBreak: 'break-word',
            '& ul': {
                listStylePosition: 'inside',
            },
            lineHeight: 'initial',
            overflowX: 'visble',
            overflowY: 'hidden',
            paddingLeft: '0.938rem',
        },
        closeButtonColumn: {
            backgroundColor: `${(_k = (_j = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _j === void 0 ? void 0 : _j.background) === null || _k === void 0 ? void 0 : _k.paper}`,
            borderRadius: '1.2rem',
            float: 'right',
            width: '2.3rem',
        },
        inlineBodyAttachment: {
            width: 'auto',
            height: 'auto',
            maxWidth: '100%',
            cursor: 'pointer',
        },
        inlineBodyAttachmentI: {
            maxWidth: '100%',
            maxHeight: '100vh',
            margin: 'auto',
            [theme.breakpoints.down('xl')]: {
                marginTop: '10%',
                marginLeft: '5%',
            },
        },
        imgcontainer: {
            display: 'grid',
            height: '100%',
        },
        translateIcon: {
            fontSize: '1em',
            marginRight: .5,
        },
        circleIcon: {
            fontSize: '.5em',
            marginX: .5,
        },
        translatedMessage: {
            padding: '1em 0',
            flexDirection: 'row',
            marginBottom: '1em',
        },
        divider: {
            borderColor: theme.palette.background.dark,
            height: 'auto',
            borderWidth: '0.125rem',
        },
        translationToggleLink: {
            cursor: 'pointer',
        },
        moreLessContainer: {
            alignSelf: 'flex-end',
            cursor: 'pointer',
            fontSize: '0.75rem',
            color: (_m = (_l = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _l === void 0 ? void 0 : _l.primary) === null || _m === void 0 ? void 0 : _m.main,
            fontWeight: 600,
            textDecoration: 'underline',
            m: 0,
        },
        deleteContent: {
            fontStyle: 'italic',
            color: (_p = (_o = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _o === void 0 ? void 0 : _o.text) === null || _p === void 0 ? void 0 : _p.header,
            fontWeight: 400,
            fontSize: '0.75rem',
        },
        notesDivider: {
            borderTop: `1px solid ${(_r = (_q = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _q === void 0 ? void 0 : _q.text) === null || _r === void 0 ? void 0 : _r.main}`,
        },
        emailIframe: {
            width: '100%',
            overflowY: 'hidden',
            border: 'none',
        },
    };
    return styles;
};
export default CcfDigitalEmailV2MessagesStyles;
//# sourceMappingURL=ccf-digital-email-v2-messages.style.js.map