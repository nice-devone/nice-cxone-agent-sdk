/**
 * styles for ccf-contact-content-body
 * @returns ContactContentBodyStyles
 * @example ContactContentBodyStyles(theme)
 */
export const ContactContentBodyStyles = (theme, propData) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15;
    const styles = {
        contactTabContainer: {
            margin: '30px 0px',
            height: 'auto',
        },
        inboundContainer: {
            width: '90%',
            margin: '10px 30px',
            padding: '0px 0px',
            background: `${(_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.background) === null || _b === void 0 ? void 0 : _b.paper} 0% 0% no-repeat padding-box`,
            border: `2px solid ${(_d = (_c = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _c === void 0 ? void 0 : _c.border) === null || _d === void 0 ? void 0 : _d.dark}`,
            borderRadius: '4px',
        },
        outboundContainer: {
            float: 'right',
            background: `${(_f = (_e = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _e === void 0 ? void 0 : _e.background) === null || _f === void 0 ? void 0 : _f.default} 0% 0% no-repeat padding-box`,
            border: `2px solid ${(_h = (_g = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _g === void 0 ? void 0 : _g.border) === null || _h === void 0 ? void 0 : _h.dark}`,
            width: '90%',
            margin: '10px 30px',
            padding: '0px 0px',
            borderRadius: '6px',
            marginLeft: '110px',
            boxShadow: `0px 1px 3px ${(_k = (_j = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _j === void 0 ? void 0 : _j.boxshadow) === null || _k === void 0 ? void 0 : _k.main}`,
        },
        contentBody: {
            width: '95%',
            textAlign: 'left',
            font: 'normal normal normal 12px/17px Open Sans',
            padding: '16px 15px',
            letterSpacing: '0px',
            color: (_m = (_l = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _l === void 0 ? void 0 : _l.text) === null || _m === void 0 ? void 0 : _m.contrastText,
            opacity: '1',
            '& > span': {
                fontSize: '12px',
            },
        },
        contentKebab: {
            float: 'right',
        },
        contactContentEmailContainer: {
            overflowY: 'scroll',
            height: 'inherit',
            marginRight: '4px',
            '&::-webkit-scrollbar': {
                width: '6px',
            },
        },
        inboundContentContainer: {
            width: '92%',
            margin: '0.625rem',
            padding: '0 0.938rem 0 0.375rem',
            borderRadius: '4px',
            [theme.breakpoints.up('xl')]: {
                padding: '0px 1.098vw 0px 0.878vw',
            },
        },
        outboundContentContainer: {
            width: '97%',
            margin: '0.625rem 0 0.625rem 0.625rem',
            padding: '0 0.656rem 0 10%',
            borderRadius: '4px',
            display: 'flex',
            flexDirection: 'column',
        },
        outboundMessageNotes: {
            display: 'flex',
            flexDirection: 'column',
            margin: '0 10px 10px 0',
            clear: 'both',
            alignItems: 'flex-end',
        },
        containerLayout: {
            background: `${(_p = (_o = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _o === void 0 ? void 0 : _o.background) === null || _p === void 0 ? void 0 : _p.paper} 0% 0% no-repeat padding-box`,
            border: `2px solid ${(_r = (_q = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _q === void 0 ? void 0 : _q.border) === null || _r === void 0 ? void 0 : _r.dark}`,
            boxShadow: `0px 1px 3px ${(_t = (_s = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _s === void 0 ? void 0 : _s.boxshadow) === null || _t === void 0 ? void 0 : _t.main}`,
        },
        contentBody2: {
            'div div:first-of-type': {
                overflowY: (propData === null || propData === void 0 ? void 0 : propData.isTranslateCustomerMessages) || (propData === null || propData === void 0 ? void 0 : propData.isTranslateAgentMessages) ? 'hidden' : 'unset',
            },
            width: '95%',
            textAlign: 'left',
            font: 'normal normal normal 12px/17px Open Sans',
            letterSpacing: '0px',
            color: (_v = (_u = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _u === void 0 ? void 0 : _u.text) === null || _v === void 0 ? void 0 : _v.contrastText,
            opacity: '1',
            '& > span': {
                fontSize: '12px',
                overflowY: 'hidden',
                display: 'block',
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
        alignAgentHeader: {
            display: 'flex',
            justifyContent: 'flex-end',
        },
        alignCustomerHeader: {
            display: 'flex',
            justifyContent: 'flex-start',
        },
        agentHeader: {
            fontSize: '12px',
            textAlign: 'end',
        },
        customerHeader: {
            fontSize: '12px',
        },
        textSecondary: {
            color: (_x = (_w = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _w === void 0 ? void 0 : _w.background) === null || _x === void 0 ? void 0 : _x.paper,
            backgroundColor: (_z = (_y = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _y === void 0 ? void 0 : _y.primary) === null || _z === void 0 ? void 0 : _z.main,
            '&:hover': {
                'opacity': 6,
            },
        },
        footerContainer: {
            width: '100%',
            display: 'flex',
            padding: '1vw 0',
        },
        footerLeft: {
            flexGrow: 9,
        },
        footerRight: {
            flexGrow: 0,
        },
        containerOutboundLayout: {
            background: `${(_1 = (_0 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _0 === void 0 ? void 0 : _0.background) === null || _1 === void 0 ? void 0 : _1.default} 0% 0% no-repeat padding-box`,
            border: `2px solid ${(_3 = (_2 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _2 === void 0 ? void 0 : _2.border) === null || _3 === void 0 ? void 0 : _3.dark}`,
            boxShadow: `0px 1px 3px ${(_5 = (_4 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _4 === void 0 ? void 0 : _4.boxshadow) === null || _5 === void 0 ? void 0 : _5.main}`,
            paddingBottom: '10px',
        },
        inlineBodyAttachment: {
            width: 'auto',
            height: 'auto',
            maxWidth: '100%',
            cursor: 'pointer',
        },
        closeButtonColumn: {
            backgroundColor: `${(_7 = (_6 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _6 === void 0 ? void 0 : _6.background) === null || _7 === void 0 ? void 0 : _7.paper}`,
            borderRadius: '1.2rem',
            float: 'right',
            width: '2.3rem',
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
            borderWidth: '2px',
        },
        translationToggleLink: {
            cursor: 'pointer',
        },
        emailActions: {
            marginTop: '0.563rem',
            color: (_9 = (_8 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _8 === void 0 ? void 0 : _8.text) === null || _9 === void 0 ? void 0 : _9.contrastText,
        },
        popOverMenuItemStyles: {
            '& .popOverActionLabelWrapper .popOverActionLabel': {
                color: (_11 = (_10 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _10 === void 0 ? void 0 : _10.text) === null || _11 === void 0 ? void 0 : _11.contrastText,
                fontWeight: 600,
            },
        },
        deleteContent: {
            color: (_13 = (_12 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _12 === void 0 ? void 0 : _12.text) === null || _13 === void 0 ? void 0 : _13.contrastText,
            marginBottom: '0.313rem',
            marginTop: '0.4rem',
        },
        deleteAuthorName: {
            color: (_15 = (_14 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _14 === void 0 ? void 0 : _14.text) === null || _15 === void 0 ? void 0 : _15.contrastText,
            marginTop: '0.188rem',
            marginBottom: '0.563rem',
        },
        replyIcon: {
            color: theme.palette.text.white,
            marginTop: '0.344rem',
        },
        emailIframe: {
            width: '100%',
            overflowY: 'hidden',
            border: 'none',
        },
    };
    return styles;
};
export default ContactContentBodyStyles;
//# sourceMappingURL=styles.js.map