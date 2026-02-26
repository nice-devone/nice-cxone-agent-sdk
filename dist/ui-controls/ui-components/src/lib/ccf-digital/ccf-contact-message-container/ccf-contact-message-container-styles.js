import { getApplicationDirection } from '../../global.app.slice';
import { getNonIncomingActiveContactInSelectedInteraction } from '../../ccf-assignment-panel/ccf-assignment-panel.slice';
import { DigitalContactStatus } from '@nice-devone/common-sdk';
import { useSelector } from 'react-redux';
/**
 * style object for ccf-contact-message-container
 * @returns CcfContactMessageContainerStyle styles object
 * ```
 * @example
 * <CcfContactMessageContainerStyle/>
 * ```
 */
const CcfContactMessageContainerStyle = (theme, isPreviousCaseMessage = false, isInboundDirection = false, isContentRemoved = false, isNextCaseMessage = false) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21, _22, _23, _24, _25, _26, _27, _28, _29, _30, _31, _32, _33, _34, _35, _36, _37, _38, _39, _40, _41, _42, _43, _44, _45, _46, _47, _48, _49, _50, _51, _52, _53, _54, _55, _56, _57, _58, _59, _60, _61, _62, _63, _64, _65, _66, _67, _68, _69, _70, _71;
    const appDirection = useSelector(getApplicationDirection);
    const nonIncomingActiveContactInSelectedInteraction = useSelector(getNonIncomingActiveContactInSelectedInteraction);
    const styles = {
        messageContentWrapper: {
            overflowY: 'auto',
            overflowX: 'hidden',
            // considering default browser setting of 1rem = 16px
            paddingTop: '1rem',
            height: (nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.contactStatus) === DigitalContactStatus.CLOSED ? '100%' : 'calc(100vh - 300px)',
            [theme.breakpoints.down('xl')]: {
                height: (nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.contactStatus) === DigitalContactStatus.CLOSED ? '100%' : 'calc(100vh - 300px)',
            },
        },
        messageContainer: Object.assign({ display: 'inline-block', width: '100%' }, (appDirection === 'rtl' && {
            marginRight: '1.5rem',
        })),
        inboundMessageContainer: {
            display: 'flex',
            width: '100%',
            marginLeft: '1rem',
            float: 'left',
        },
        message: Object.assign({ borderRadius: '0.37rem', fontSize: `${(_a = theme === null || theme === void 0 ? void 0 : theme.typography) === null || _a === void 0 ? void 0 : _a.h6.fontSize}`, padding: `${(_b = theme === null || theme === void 0 ? void 0 : theme.typography) === null || _b === void 0 ? void 0 : _b.h6.fontSize}`, maxWidth: '90%', textAlign: 'left', letterSpacing: '0rem' }, (isContentRemoved && { backgroundColor: (_d = (_c = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _c === void 0 ? void 0 : _c.text) === null || _d === void 0 ? void 0 : _d.white, padding: 0 })),
        outboundMessage: Object.assign(Object.assign({ float: 'right', marginRight: `${(_e = theme === null || theme === void 0 ? void 0 : theme.typography) === null || _e === void 0 ? void 0 : _e.h5.fontSize}`, color: (_g = (_f = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _f === void 0 ? void 0 : _f.background) === null || _g === void 0 ? void 0 : _g.paper, backgroundColor: (isPreviousCaseMessage || isNextCaseMessage) ? `${(_j = (_h = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _h === void 0 ? void 0 : _h.background) === null || _j === void 0 ? void 0 : _j.lightBlue}` : `${(_l = (_k = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _k === void 0 ? void 0 : _k.digitalStatus) === null || _l === void 0 ? void 0 : _l.pendingDark}` }, (appDirection === 'rtl' && {
            float: 'left',
            marginLeft: '2.5rem',
        })), { wordBreak: 'break-word' }),
        inboundMessage: {
            float: 'left',
            backgroundColor: (isPreviousCaseMessage || isNextCaseMessage) ? `${(_o = (_m = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _m === void 0 ? void 0 : _m.background) === null || _o === void 0 ? void 0 : _o.callControlHeader}` : `${(_q = (_p = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _p === void 0 ? void 0 : _p.background) === null || _q === void 0 ? void 0 : _q.main}`,
            color: (isPreviousCaseMessage || isNextCaseMessage) ? `${(_s = (_r = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _r === void 0 ? void 0 : _r.text) === null || _s === void 0 ? void 0 : _s.messageText}` : `${(_u = (_t = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _t === void 0 ? void 0 : _t.text) === null || _u === void 0 ? void 0 : _u.contrastText}`,
            wordBreak: 'break-word',
        },
        messageAuthor: {
            fontSize: `${(_w = (_v = theme === null || theme === void 0 ? void 0 : theme.typography) === null || _v === void 0 ? void 0 : _v.h6) === null || _w === void 0 ? void 0 : _w.fontSize}`,
            fontWeight: '600',
            lineHeight: '1rem',
            letterSpacing: '0rem',
            color: (isPreviousCaseMessage || isNextCaseMessage) ? `${(_y = (_x = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _x === void 0 ? void 0 : _x.text) === null || _y === void 0 ? void 0 : _y.messageText}` : `${(_0 = (_z = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _z === void 0 ? void 0 : _z.text) === null || _0 === void 0 ? void 0 : _0.contrastText}`,
            opacity: '1',
            marginBottom: '0.20rem',
        },
        messageActionButton: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        menuItemContent: {
            color: (_2 = (_1 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _1 === void 0 ? void 0 : _1.text) === null || _2 === void 0 ? void 0 : _2.charcolGrey,
            width: 'auto',
            overflow: 'hidden',
            fontSize: (_4 = (_3 = theme === null || theme === void 0 ? void 0 : theme.typography) === null || _3 === void 0 ? void 0 : _3.h6) === null || _4 === void 0 ? void 0 : _4.fontSize,
            height: '2.5rem',
        },
        menuItemNameBold: {
            [theme.breakpoints.down('xl')]: {
                fontSize: '0.75rem',
                fontWeight: '600',
                paddingLeft: '1px',
                marginTop: '0px',
                display: 'inline',
            },
            [theme.breakpoints.up('xl')]: {
                fontSize: '.8rem',
                fontWeight: '600',
                paddingLeft: '2px',
                marginTop: '0px',
                display: 'inline',
            },
        },
        menuItemIcon: {
            marginTop: '0.25rem',
        },
        inboundMessageActionButton: Object.assign({ fill: `${(_6 = (_5 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _5 === void 0 ? void 0 : _5.text) === null || _6 === void 0 ? void 0 : _6.secondary}` }, (isContentRemoved && { fill: (_8 = (_7 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _7 === void 0 ? void 0 : _7.text) === null || _8 === void 0 ? void 0 : _8.header })),
        outboundMessageActionButton: Object.assign({ fill: `${(_10 = (_9 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _9 === void 0 ? void 0 : _9.text) === null || _10 === void 0 ? void 0 : _10.white}` }, (isContentRemoved && { fill: (_12 = (_11 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _11 === void 0 ? void 0 : _11.text) === null || _12 === void 0 ? void 0 : _12.header })),
        inboundMessageAuthor: Object.assign({ marginLeft: '1.25rem' }, (appDirection === 'rtl' && {
            marginRight: '1rem',
        })),
        outboundMessageAuthor: Object.assign({ marginRight: `${(_14 = (_13 = theme === null || theme === void 0 ? void 0 : theme.typography) === null || _13 === void 0 ? void 0 : _13.h6) === null || _14 === void 0 ? void 0 : _14.fontSize}`, float: 'right', clear: 'both' }, (appDirection === 'rtl' && {
            float: 'left',
            marginLeft: '1rem',
        })),
        anonymousAuthorName: {
            fontWeight: 200,
            fontStyle: 'italic',
        },
        inboundMessageTimeStamp: Object.assign(Object.assign({ marginLeft: '1.25rem', fontSize: `${(_16 = (_15 = theme === null || theme === void 0 ? void 0 : theme.typography) === null || _15 === void 0 ? void 0 : _15.h6) === null || _16 === void 0 ? void 0 : _16.fontSize}`, lineHeight: '1rem', letterSpacing: '0rem', color: (isPreviousCaseMessage || isNextCaseMessage) ? `${(_18 = (_17 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _17 === void 0 ? void 0 : _17.text) === null || _18 === void 0 ? void 0 : _18.messageText}` : `${(_20 = (_19 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _19 === void 0 ? void 0 : _19.text) === null || _20 === void 0 ? void 0 : _20.contrastText}` }, (appDirection === 'rtl' && {
            marginRight: '1rem',
        })), { maxWidth: 'max-content' }),
        outboundMessageTimeStamp: Object.assign({ margin: '0 0.75rem', float: 'right', fontSize: `${(_22 = (_21 = theme === null || theme === void 0 ? void 0 : theme.typography) === null || _21 === void 0 ? void 0 : _21.h6) === null || _22 === void 0 ? void 0 : _22.fontSize}`, lineHeight: '1rem', color: (isPreviousCaseMessage || isNextCaseMessage) ? `${(_24 = (_23 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _23 === void 0 ? void 0 : _23.text) === null || _24 === void 0 ? void 0 : _24.messageText}` : '', letterSpacing: '0rem' }, (appDirection === 'rtl' && {
            float: 'left',
            marginLeft: '1.5rem',
        })),
        messageDivider: {
            marginBottom: '1.25rem',
        },
        attachmentsContainer: {
            width: 'calc(100% - 1rem)',
            overflow: 'hidden',
            display: 'flex',
        },
        attachmentsWithMsgAction: {
            justifyContent: 'flex-end',
        },
        attachmentBox: {
            width: isInboundDirection ? 'auto' : '100%',
            float: isInboundDirection ? '' : 'right',
            maxWidth: isInboundDirection ? '100%' : 'none',
            paddingRight: isInboundDirection ? '2.625rem' : '1.725rem',
            [theme.breakpoints.down('md')]: {
                padding: '0',
            },
        },
        commentBox: {
            backgroundColor: `${(_26 = (_25 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _25 === void 0 ? void 0 : _25.background) === null || _26 === void 0 ? void 0 : _26.dark}`,
            position: 'relative',
            padding: '20px',
            color: 'white',
        },
        replyButton: {
            backgroundColor: `${(_28 = (_27 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _27 === void 0 ? void 0 : _27.background) === null || _28 === void 0 ? void 0 : _28.dark}`,
            color: `${(_30 = (_29 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _29 === void 0 ? void 0 : _29.text) === null || _30 === void 0 ? void 0 : _30.contrastText}`,
        },
        obMessage: {
            margin: '0 0 0 1rem',
            [theme.breakpoints.down('xl')]: {
                margin: '0 0 0 1rem',
            },
        },
        ibMessage: {
            margin: '0 1rem 0rem 0.5em',
        },
        approvalInfoContainer: {
            clear: 'both',
        },
        messageDraft: {
            borderRadius: '0.37rem 0.37rem 0 0',
            fontSize: `${(_31 = theme === null || theme === void 0 ? void 0 : theme.typography) === null || _31 === void 0 ? void 0 : _31.h6.fontSize}`,
            padding: `${(_32 = theme === null || theme === void 0 ? void 0 : theme.typography) === null || _32 === void 0 ? void 0 : _32.h6.fontSize}`,
            textAlign: 'left',
            letterSpacing: '0rem',
            opacity: '1',
            marginRight: '0',
            width: '100%',
        },
        outboundMessageDraftContainer: Object.assign(Object.assign({ float: 'right', marginRight: `${(_33 = theme === null || theme === void 0 ? void 0 : theme.typography) === null || _33 === void 0 ? void 0 : _33.h5.fontSize}` }, (appDirection === 'rtl' && {
            float: 'left',
            marginLeft: '2.5rem',
        })), { wordBreak: 'break-word', minWidth: '75%', paddingLeft: '1rem' }),
        outboundMessageDraft: {
            color: `${(_35 = (_34 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _34 === void 0 ? void 0 : _34.background) === null || _35 === void 0 ? void 0 : _35.paper}`,
            backgroundColor: `${(_37 = (_36 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _36 === void 0 ? void 0 : _36.background) === null || _37 === void 0 ? void 0 : _37.sparkleBlue}`,
        },
        messageDraftAttachment: {
            border: `1px solid ${(_39 = (_38 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _38 === void 0 ? void 0 : _38.background) === null || _39 === void 0 ? void 0 : _39.sparkleBlue}`,
            backgroundColor: `${(_41 = (_40 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _40 === void 0 ? void 0 : _40.background) === null || _41 === void 0 ? void 0 : _41.default}`,
            padding: '0.5rem',
        },
        timeStampTooltipArrow: {
            color: `${(_43 = (_42 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _42 === void 0 ? void 0 : _42.background) === null || _43 === void 0 ? void 0 : _43.paper}`,
        },
        timeStampTooltip: {
            backgroundColor: `${(_45 = (_44 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _44 === void 0 ? void 0 : _44.background) === null || _45 === void 0 ? void 0 : _45.paper}`,
            color: (isPreviousCaseMessage || isNextCaseMessage) ? `${(_47 = (_46 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _46 === void 0 ? void 0 : _46.text) === null || _47 === void 0 ? void 0 : _47.dark}` : `${(_49 = (_48 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _48 === void 0 ? void 0 : _48.text) === null || _49 === void 0 ? void 0 : _49.contrastText}`,
            boxShadow: '0px 4px 6px 0px rgba(0, 0, 0, 0.24)',
        },
        loadMessagesContainer: {
            display: 'flex',
            width: 'max-content',
            flexDirection: 'row',
            marginRight: '1rem',
            marginBottom: '1rem',
            marginLeft: 'auto',
        },
        loadMessagesContainerForViewRecent: {
            display: 'flex',
            justifyContent: 'center',
            flex: 1,
        },
        loadMessagesButton: {
            color: (_51 = (_50 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _50 === void 0 ? void 0 : _50.background) === null || _51 === void 0 ? void 0 : _51.socialReaction,
            fontSize: '0.75rem',
            fontWeight: 600,
            textDecoration: 'underline',
            cursor: 'pointer',
            lineHeight: '1rem',
            marginLeft: '0.125rem',
        },
        doubleArrowIcon: {
            color: (_53 = (_52 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _52 === void 0 ? void 0 : _52.background) === null || _53 === void 0 ? void 0 : _53.socialReaction,
            height: '1rem',
            width: '1rem',
            maxWidth: '0.6em',
        },
        previousMessagesContainer: {
            paddingTop: '0.5rem',
        },
        previousCaseStatusDivider: {
            marginLeft: '1rem',
            marginRight: '1rem',
        },
        currentCaseStatusDivider: {
            paddingTop: '0.25rem',
            paddingBottom: '0.25rem',
        },
        caseStatus: {
            color: (_55 = (_54 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _54 === void 0 ? void 0 : _54.text) === null || _55 === void 0 ? void 0 : _55.red,
            fontWeight: 700,
            fontSize: '0.75rem',
        },
        visualIndicatorStyles: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'end',
        },
        messageSentIcon: {
            transform: 'translateX(1.125rem)',
            marginTop: '0.188rem',
        },
        messageDelayedIcon: {
            transform: 'translateX(1.125rem)',
            marginTop: '0.063rem',
        },
        messageSeenIcon: {
            transform: 'translateX(0.563rem) translateY(-0.25rem)',
            fill: (_57 = (_56 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _56 === void 0 ? void 0 : _56.text) === null || _57 === void 0 ? void 0 : _57.noteLabel,
        },
        messageDeliveredIcon: {
            transform: 'translateX(0.563rem) translateY(-0.25rem)',
            fill: (_59 = (_58 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _58 === void 0 ? void 0 : _58.text) === null || _59 === void 0 ? void 0 : _59.header,
        },
        menuStyle: {
            display: 'flex',
            alignSelf: 'flex-start',
        },
        linkStyles: {
            textDecoration: 'none',
            color: 'inherit',
            display: 'flex',
            padding: '1rem',
        },
        deletedContentContainerStyle: {
            backgroundColor: (_61 = (_60 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _60 === void 0 ? void 0 : _60.text) === null || _61 === void 0 ? void 0 : _61.white, border: '1px solid',
            color: (_63 = (_62 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _62 === void 0 ? void 0 : _62.border) === null || _63 === void 0 ? void 0 : _63.lightGray,
            padding: 0,
            borderRadius: '0.5rem',
            display: 'flex',
            '& > :nth-of-type(2)': {
                padding: '5px',
            },
        },
        deletedContentStyle: {
            fontStyle: 'italic',
            color: (_65 = (_64 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _64 === void 0 ? void 0 : _64.text) === null || _65 === void 0 ? void 0 : _65.header,
            padding: '0.5rem 0.75rem',
        },
        menuTextContainerStyles: {
            paddingLeft: '0.5rem',
        },
        replyToMessageContainer: {
            color: (_67 = (_66 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _66 === void 0 ? void 0 : _66.text) === null || _67 === void 0 ? void 0 : _67.contrastText,
        },
        replyToMessageContainerInAttachment: {
            float: 'right',
            paddingBottom: '.25rem',
        },
        menuTextStyleForReply: {
            paddingLeft: '0.45rem',
        },
        previewStyles: {
            cursor: 'pointer',
            textDecoration: 'underline',
            fontWeight: 400,
            color: (_69 = (_68 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _68 === void 0 ? void 0 : _68.text) === null || _69 === void 0 ? void 0 : _69.noteLabel,
        },
        scrollToBottomStyles: {
            marginBottom: '0.5rem',
            marginTop: '0.5rem',
            boxShadow: 'none',
            border: `0.063rem solid ${(_71 = (_70 = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _70 === void 0 ? void 0 : _70.background) === null || _71 === void 0 ? void 0 : _71.digitalTag}`,
            height: '1.438rem',
            width: '1.438rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '0.188rem',
        },
        scrollToBottomIcon: {
            height: '0.75rem',
            width: '0.75rem',
        },
        bottomContainer: {
            display: 'flex',
            flexDirection: 'row-reverse',
        },
    };
    return styles;
};
export default CcfContactMessageContainerStyle;
//# sourceMappingURL=ccf-contact-message-container-styles.js.map