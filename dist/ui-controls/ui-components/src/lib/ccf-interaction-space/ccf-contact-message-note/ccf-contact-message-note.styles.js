/**
 * style object for ccf-contact-message-note
 * @returns CcfContactMessageNoteStyles styles object
 * ```
 * @example
 * <CcfContactMessageNoteStyles/>
 * ```
 */
const CcfContactMessageNoteStyles = (theme, isPreviousConversationNote, isNextConversationNote, isEmailNote) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5;
    const styles = {
        contactMessageNoteWrapper: {
            display: 'flex',
            flexDirection: 'column',
            margin: isEmailNote ? '0.2rem 1rem 0.625rem 1.7rem' : ' 0 0.2rem 0 0 ',
            width: isEmailNote ? 'calc(100% - 2rem)' : '100%',
            alignItems: 'flex-end',
        },
        interactionSpaceNoteContainer: {
            background: `${(_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.background) === null || _b === void 0 ? void 0 : _b.noteBackground}`,
            borderRadius: '10px',
            paddingLeft: '10px',
            maxWidth: '90%',
            opacity: isPreviousConversationNote || isNextConversationNote ? '50%' : '100%',
        },
        interactionSpaceAgentLabel: {
            fontFamily: `${theme.typography.fontFamily}`,
            fontStyle: 'normal',
            fontWeight: '700',
            lineHeight: '1rem',
            color: `${theme.palette.text.contrastText}`,
        },
        interactionSpaceNoteInput: {
            width: '90%',
            marginLeft: '5%',
            marginTop: '2%',
            background: `${theme.palette.background.paper}`,
            '& .MuiInputBase-root': {
                padding: '0.375rem',
            },
        },
        interactionNoteBtnLayout: {
            justifyContent: 'flex-end',
            display: 'flex',
            marginRight: '5%',
        },
        messageNoteTextAreaFontSize: {
            fontSize: `${theme.typography.h6.fontSize}`,
        },
        interactionBtn: {
            height: '10px',
            marginTop: '2%',
            marginBottom: '2%',
            marginLeft: '2%',
            padding: '12px 8px',
        },
        cancelBtn: {
            height: '10px',
            marginTop: '2%',
            marginBottom: '2%',
            marginLeft: '2%',
            padding: '12px 4px',
        },
        interactionAgentLabelName: {
            fontSize: `${theme.typography.h6.fontSize}`,
            fontWeight: '600',
            lineHeight: '1rem',
            letterSpacing: '0rem',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            marginTop: '0.5rem',
            color: (isPreviousConversationNote || isNextConversationNote) ? `${(_d = (_c = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _c === void 0 ? void 0 : _c.text) === null || _d === void 0 ? void 0 : _d.messageText}` : `${(_f = (_e = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _e === void 0 ? void 0 : _e.text) === null || _f === void 0 ? void 0 : _f.contrastText}`,
        },
        interactionMessageNoteLabel: {
            fontWeight: '600',
            lineHeight: '1rem',
            alignSelf: 'center',
            color: (isPreviousConversationNote || isNextConversationNote) ? `${(_h = (_g = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _g === void 0 ? void 0 : _g.text) === null || _h === void 0 ? void 0 : _h.messageText}` : '',
        },
        interactionMessageNoteLabelHeader: {
            display: 'flex',
            justifyContent: 'space-between',
            paddingTop: '5px',
        },
        emailNoteLabelHeader: {
            display: 'flex',
            justifyContent: 'space-between',
            paddingTop: '0',
        },
        interactionMessageNoteContent: {
            fontWeight: '500',
            marginBottom: '5%',
            wordBreak: 'break-word',
            display: '-webkit-box',
            margin: '0px 10px 15px 0',
            whiteSpace: 'pre-line',
        },
        interactionMessageNoteContentContainer: {
            margin: '0',
            '& >p': {
                wordBreak: 'break-word',
                display: 'block',
            },
        },
        contactMessageNoteTimestamp: {
            fontSize: `${(_k = (_j = theme === null || theme === void 0 ? void 0 : theme.typography) === null || _j === void 0 ? void 0 : _j.h6) === null || _k === void 0 ? void 0 : _k.fontSize}`,
            lineHeight: '1rem',
            letterSpacing: '0rem',
            color: (isPreviousConversationNote || isNextConversationNote) ? `${(_m = (_l = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _l === void 0 ? void 0 : _l.text) === null || _m === void 0 ? void 0 : _m.messageText}` : `${(_p = (_o = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _o === void 0 ? void 0 : _o.text) === null || _p === void 0 ? void 0 : _p.contrastText}`,
        },
        emailNoteWrapper: {
            display: 'flex',
            flexDirection: 'column',
            width: 'calc(100% - 2rem)',
            alignItems: 'flex-end',
            margin: '0.2rem 1rem 0.625rem 1.7rem',
        },
        emailAddNoteWrapper: {
            width: 'calc(100% - 3.5rem)',
            marginBottom: '3.125rem',
            marginLeft: '2rem',
        },
        emailNoteAgentAndTimeStampContainer: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            paddingLeft: '0.625rem',
        },
        emailNoteTimestamp: {
            fontSize: '0.688rem',
            fontWeight: '400',
            fontFamily: 'Open Sans',
            lineHeight: '1rem',
            letterSpacing: '0rem',
            color: (isPreviousConversationNote || isNextConversationNote)
                ? `${(_r = (_q = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _q === void 0 ? void 0 : _q.text) === null || _r === void 0 ? void 0 : _r.messageText}`
                : `${(_t = (_s = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _s === void 0 ? void 0 : _s.text) === null || _t === void 0 ? void 0 : _t.contrastText}`,
        },
        popOverIconStyles: { height: '1.5rem', width: '1.5rem' },
        emailSpaceNoteContainer: {
            background: `${(_v = (_u = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _u === void 0 ? void 0 : _u.background) === null || _v === void 0 ? void 0 : _v.noteBackground}`,
            borderRadius: '.625rem',
            padding: '0.5rem 0.75rem',
            opacity: (isPreviousConversationNote || isNextConversationNote) ? '50%' : '100%',
            width: '94%',
        },
        emailNoteActionBtn: {
            fontFamily: 'Open Sans',
            fontWeight: 600,
            fontSize: '0.813rem',
            height: '1.75rem',
            width: '4.125rem',
            marginBottom: '0',
            padding: '.75rem .5rem',
            '&:focus': {
                border: `0.063rem solid ${(_x = (_w = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _w === void 0 ? void 0 : _w.border) === null || _x === void 0 ? void 0 : _x.menuItemHighlight}`,
            },
        },
        emailNoteCancelBtn: {
            color: `${(_z = (_y = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _y === void 0 ? void 0 : _y.text) === null || _z === void 0 ? void 0 : _z.clearText}`,
        },
        emailNoteTextAreaFontSize: {
            fontSize: '0.75rem',
        },
        emailNoteInput: {
            width: '99%',
            margin: '0 1%',
            height: '2.688rem',
            background: `${theme.palette.background.paper}`,
            '& .MuiInputBase-root': {
                padding: '0.267rem',
            },
        },
        emailNoteContent: {
            fontWeight: '400',
            fontFamil: 'Open Sans',
            fontSize: '0.75rem',
            wordBreak: 'break-word',
            display: '-webkit-box',
            margin: '0',
            whiteSpace: 'pre-line',
        },
        emailNoteActionBtnLayout: {
            float: 'right',
            justifyContent: 'flex-end',
            display: 'flex',
            width: '8.25rem',
            paddingTop: '0.25rem',
            gap: '0.75rem',
        },
        emailNoteLabel: {
            fontWeight: '700',
            lineHeight: '1rem',
            fontSize: '0.75rem',
            fontFamily: 'Open Sans',
            alignSelf: 'center',
            color: (isPreviousConversationNote || isNextConversationNote) ? `${(_1 = (_0 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _0 === void 0 ? void 0 : _0.text) === null || _1 === void 0 ? void 0 : _1.messageText}` : '',
            padding: 0,
        },
        emailAgentLabelName: {
            fontSize: '0.75rem',
            fontWeight: '700',
            fontFamily: 'Open Sans',
            lineHeight: '1rem',
            letterSpacing: '0rem',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            marginTop: '0.5rem',
            color: (isPreviousConversationNote || isNextConversationNote)
                ? `${(_3 = (_2 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _2 === void 0 ? void 0 : _2.text) === null || _3 === void 0 ? void 0 : _3.messageText}`
                : `${(_5 = (_4 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _4 === void 0 ? void 0 : _4.text) === null || _5 === void 0 ? void 0 : _5.contrastText}`,
            float: 'left',
            marginLeft: '1.188rem',
            marginBottom: '0.25rem',
        },
    };
    return styles;
};
export default CcfContactMessageNoteStyles;
//# sourceMappingURL=ccf-contact-message-note.styles.js.map