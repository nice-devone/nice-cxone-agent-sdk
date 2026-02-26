/**
 * return styles used for the component
 * @example <directoryEntryDetailsStyles />
 * @returns styles
 */
const directoryEntryDetailsStyles = (theme) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7;
    const styles = {
        directoryItem: {
            backgroundColor: theme.palette.background.light,
            padding: '10px 12px',
            borderTop: `2px solid ${theme.palette.border.main}`,
            '&:focus': {
                backgroundColor: theme.palette.background.hover,
            },
        },
        directoryUser: {
            display: 'flex',
            alignItems: 'center',
        },
        directoryEntryLabel: {
            fontWeight: 'bold',
            fontSize: (_b = (_a = theme === null || theme === void 0 ? void 0 : theme.typography) === null || _a === void 0 ? void 0 : _a.h4) === null || _b === void 0 ? void 0 : _b.fontSize,
        },
        directoryPartnerLabel: {
            marginLeft: '4px',
            fontWeight: 'bold',
            fontSize: (_d = (_c = theme === null || theme === void 0 ? void 0 : theme.typography) === null || _c === void 0 ? void 0 : _c.h5) === null || _d === void 0 ? void 0 : _d.fontSize,
        },
        ellipsisWithTooltip: {
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            display: 'inline-block',
            width: 'fit-content',
        },
        directoryItemUserStatus: {
            marginLeft: '1.4rem',
            display: 'flex',
            alignItems: 'center',
            marginBottom: '2px',
        },
        text: {
            marginLeft: '4px',
            fontSize: theme.typography.h5.fontSize,
            color: theme.palette.secondary.main,
            lineSpacing: 17,
        },
        partnerDetailsStyles: {
            padding: '0 0.75rem',
            paddingTop: '0.5rem',
            borderTop: `solid ${(_f = (_e = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _e === void 0 ? void 0 : _e.background) === null || _f === void 0 ? void 0 : _f.default} 2px`,
        },
        flex: {
            flex: '1',
            display: 'flex',
            justifyContent: 'flex-end',
        },
        mainContainer: {
            padding: '0.5rem 0',
            display: 'flex',
        },
        addressContainer: {
            display: 'flex',
        },
        iconButtonWrapper: {
            padding: '0',
            '>svg': {
                margin: '0',
            },
        },
        directoryEntryText: {
            marginLeft: '0.25rem',
            fontSize: (_h = (_g = theme === null || theme === void 0 ? void 0 : theme.typography) === null || _g === void 0 ? void 0 : _g.h5) === null || _h === void 0 ? void 0 : _h.fontSize,
            color: (_k = (_j = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _j === void 0 ? void 0 : _j.secondary) === null || _k === void 0 ? void 0 : _k.main,
            fontWeight: 'bold',
        },
        directoryEntrySubText: {
            color: theme.palette.text.contrastText,
            fontSize: theme.typography.h5.fontSize,
            marginLeft: '4px',
        },
        directoryEntryCompanyText: {
            marginLeft: '0.25rem',
            fontSize: (_m = (_l = theme === null || theme === void 0 ? void 0 : theme.typography) === null || _l === void 0 ? void 0 : _l.h4) === null || _m === void 0 ? void 0 : _m.fontSize,
            color: (_p = (_o = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _o === void 0 ? void 0 : _o.secondary) === null || _p === void 0 ? void 0 : _p.main,
            fontWeight: 'bold',
        },
        directoryEntryCardText: {
            color: (_r = (_q = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _q === void 0 ? void 0 : _q.text) === null || _r === void 0 ? void 0 : _r.contrastText,
            fontSize: (_t = (_s = theme === null || theme === void 0 ? void 0 : theme.typography) === null || _s === void 0 ? void 0 : _s.h5) === null || _t === void 0 ? void 0 : _t.fontSize,
            marginLeft: '0.25rem',
            fontWeight: 'normal',
            width: 'fit-content',
        },
        icon: {
            fontSize: (_v = (_u = theme === null || theme === void 0 ? void 0 : theme.typography) === null || _u === void 0 ? void 0 : _u.h2) === null || _v === void 0 ? void 0 : _v.fontSize,
            marginLeft: '0.25rem',
            cursor: 'pointer',
        },
        iconButtonCircle: {
            width: '36px',
            height: '36px',
        },
        iconButtonCircle_mailIcon: {
            transform: 'translate(-3px, -2px)',
        },
        iconButtonCircle_phoneIcon: {
            transform: 'translate(-1px, 1px)',
        },
        partnerIcon: {
            fontSize: (_x = (_w = theme === null || theme === void 0 ? void 0 : theme.typography) === null || _w === void 0 ? void 0 : _w.h3) === null || _x === void 0 ? void 0 : _x.fontSize,
            marginLeft: '0.25rem',
            height: '1.5rem',
            width: '1.5rem',
        },
        hoverPopUpCallBtnMargin: {
            marginLeft: '5px',
        },
        skillSelect: {
            height: '35%',
            borderRadius: '0.45em',
            marginRight: 0,
            flex: 1,
            background: theme.palette.background.paper,
            fontSize: theme.typography.h5.fontSize,
            overflow: 'hidden',
        },
        emailText: {
            maxWidth: '90%',
            display: 'inline-grid',
        },
        fullViewPartnerInfo: {
            width: '50%',
            padding: '0.5rem 0',
            display: 'flex',
        },
        fullViewAddressInfo: {
            display: 'flex',
        },
        accordionContainer: {
            boxShadow: 'none',
            display: 'block',
            marginTop: '0.25rem',
        },
        accordionIcon: {
            transform: 'rotate(180deg)',
            height: '1.5rem',
            width: '1.5rem',
            background: `${(_z = (_y = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _y === void 0 ? void 0 : _y.text) === null || _z === void 0 ? void 0 : _z.content} 0% 0% no-repeat padding-box`,
            color: (_1 = (_0 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _0 === void 0 ? void 0 : _0.text) === null || _1 === void 0 ? void 0 : _1.disabled,
        },
        accordionHeader: {
            flexDirection: 'row-reverse',
            paddingLeft: '0',
            minHeight: 24,
            height: '3rem',
            borderTop: `solid ${(_3 = (_2 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _2 === void 0 ? void 0 : _2.background) === null || _3 === void 0 ? void 0 : _3.default} 1px`,
            'MuiAccordionDetails-root': {
                padding: '0% 0% 0% 8%',
            },
            '&.Mui-expanded': {
                minHeight: 24,
                height: '2rem',
            },
        },
        accordionTitle: {
            letterSpacing: 0,
            color: (_5 = (_4 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _4 === void 0 ? void 0 : _4.text) === null || _5 === void 0 ? void 0 : _5.primary,
            fontSize: (_7 = (_6 = theme === null || theme === void 0 ? void 0 : theme.typography) === null || _6 === void 0 ? void 0 : _6.h5) === null || _7 === void 0 ? void 0 : _7.fontSize,
            opacity: 1,
            fontWeight: 'bold',
            marginLeft: '4px',
        },
        companyInfo: {
            marginTop: '0.25rem',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            width: '100%',
            display: 'inline-block',
        },
        contactInfo: {
            marginTop: '0.25rem',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            width: '100%',
            display: 'inline-block',
        },
        fullViewInfo: {
            padding: '0.5rem 0 0.2rem 0',
            display: 'flex',
        },
        infoContainer: {
            padding: '0.5rem 0 0.2rem 0',
            display: 'flex',
        },
        infoText: {
            maxWidth: '90%',
            display: 'inline-grid',
        },
        paddingR2: {
            paddingRight: '2px',
            '>svg': {
                marginLeft: '0',
            },
        },
    };
    return styles;
};
export default directoryEntryDetailsStyles;
//# sourceMappingURL=ccf-directory-entries-details.styles.js.map