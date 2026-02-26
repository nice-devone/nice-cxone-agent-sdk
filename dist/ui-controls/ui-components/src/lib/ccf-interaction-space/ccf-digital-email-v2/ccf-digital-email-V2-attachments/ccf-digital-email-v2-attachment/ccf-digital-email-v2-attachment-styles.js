/**
 * style object for ccf-digital-email-v2-attachment component
 * @returns CcfDigitalEmailV2AttachmentStyles styles object
 * ```
 * @example
 * <CcfDigitalEmailV2AttachmentStyles/>
 * ```
 */
const CcfDigitalEmailV2AttachmentStyles = (theme) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x;
    const styles = {
        attachmentContainer: {
            display: 'inline-flex',
            alignItems: 'center',
            border: `0.063rem solid ${(_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.border) === null || _b === void 0 ? void 0 : _b.lightGray}`,
            padding: '0.375rem',
            cursor: 'pointer',
            position: 'relative',
            maxWidth: '9.375rem',
            borderRadius: '0.25rem',
            height: '1.5rem',
        },
        attachmentName: {
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            maxWidth: '9.375rem',
            fontSize: '0.625rem',
            fontWeight: 600,
            color: (_d = (_c = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _c === void 0 ? void 0 : _c.text) === null || _d === void 0 ? void 0 : _d.black,
        },
        listItemStyles: {
            fontSize: '0.75rem',
            fontWeight: 600,
            color: (_f = (_e = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _e === void 0 ? void 0 : _e.text) === null || _f === void 0 ? void 0 : _f.contrastText,
        },
        downloadIcon: {
            color: (_h = (_g = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _g === void 0 ? void 0 : _g.text) === null || _h === void 0 ? void 0 : _h.contrastText,
            marginLeft: '0.125rem',
            transform: 'translateY(0.25rem)',
        },
        moreAttachmentBox: {
            display: 'inline-flex',
            alignItems: 'center',
            border: `0.063rem solid ${(_k = (_j = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _j === void 0 ? void 0 : _j.border) === null || _k === void 0 ? void 0 : _k.lightGray}`,
            padding: '0.125rem 0.25rem',
            backgroundColor: `${(_m = (_l = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _l === void 0 ? void 0 : _l.border) === null || _m === void 0 ? void 0 : _m.lightGray}`,
            cursor: 'pointer',
            position: 'relative',
            borderRadius: '0.25rem',
            fontWeight: 600,
            bottom: '0.25rem',
        },
        attachmentIcon: {
            marginRight: '0.375rem',
            color: (_p = (_o = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _o === void 0 ? void 0 : _o.background) === null || _p === void 0 ? void 0 : _p.socialReaction,
            transform: 'translateY(-0.1875rem)',
        },
        moreAttachmentText: {
            fontSize: '0.625rem',
            color: (_r = (_q = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _q === void 0 ? void 0 : _q.text) === null || _r === void 0 ? void 0 : _r.contrastText,
            fontWeight: 700,
            textAlign: 'center',
        },
        menuItemStyles: {
            '&:hover': {
                border: `0.063rem solid ${(_t = (_s = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _s === void 0 ? void 0 : _s.border) === null || _t === void 0 ? void 0 : _t.menuItemHighlight}`,
                borderRadius: '0.25rem',
            },
            '&:focus': {
                border: `0.063rem solid ${(_v = (_u = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _u === void 0 ? void 0 : _u.border) === null || _v === void 0 ? void 0 : _v.menuItemHighlight}`,
                borderRadius: '0.25rem',
            },
        },
        previewIcon: {
            color: (_x = (_w = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _w === void 0 ? void 0 : _w.text) === null || _x === void 0 ? void 0 : _x.contrastText,
            marginRight: '0.688rem',
            fontSize: '1.375rem',
        },
        audioAttachmentContainer: {
            display: 'flex',
            flexDirection: 'column',
            width: 'fit-content',
        },
    };
    return styles;
};
export default CcfDigitalEmailV2AttachmentStyles;
//# sourceMappingURL=ccf-digital-email-v2-attachment-styles.js.map