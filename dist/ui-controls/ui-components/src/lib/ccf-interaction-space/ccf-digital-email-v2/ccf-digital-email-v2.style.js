import CcfContactPublicPostContainerStyle from '../../ccf-digital/ccf-contact-public-post-container/ccf-contact-public-post-container-styles';
import { EmailMessageSortOrder } from '../../../enums/email-message-sort-order-type';
/**
 * style object for ccf-digital-email-v2 component
 * @returns CcfDigitalEmailV2 styles object
 * ```
 * @example
 * <CcfDigitalEmailV2Styles/>
 * ```
 */
const CcfDigitalEmailV2Styles = (props) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x;
    const styles = {
        mainContainer: {
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            position: 'relative',
        },
        boxContainer: {
            fontSize: (_b = (_a = props === null || props === void 0 ? void 0 : props.theme) === null || _a === void 0 ? void 0 : _a.typography) === null || _b === void 0 ? void 0 : _b.h2,
            padding: '0.5rem',
        },
        previousMessageContainer: {
            fontSize: (_d = (_c = props === null || props === void 0 ? void 0 : props.theme) === null || _c === void 0 ? void 0 : _c.typography) === null || _d === void 0 ? void 0 : _d.h2,
            padding: '0.5rem',
            opacity: 0.5,
        },
        contactContentEmailContainer: {
            overflowY: 'scroll',
            flex: 1,
            marginRight: '0.25rem',
            '&::-webkit-scrollbar': {
                width: '0.375rem',
            },
        },
        publicPostContainerStyles: Object.assign({}, CcfContactPublicPostContainerStyle),
        divider: {
            borderTop: `1px solid ${(_g = (_f = (_e = props === null || props === void 0 ? void 0 : props.theme) === null || _e === void 0 ? void 0 : _e.palette) === null || _f === void 0 ? void 0 : _f.text) === null || _g === void 0 ? void 0 : _g.main}`,
        },
        footerSpacer: {
            height: '3.5rem',
            flexShrink: 0,
        },
        loaderContainer: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '20vh',
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
            color: (_k = (_j = (_h = props === null || props === void 0 ? void 0 : props.theme) === null || _h === void 0 ? void 0 : _h.palette) === null || _j === void 0 ? void 0 : _j.text) === null || _k === void 0 ? void 0 : _k.red,
            fontWeight: 700,
            fontSize: '0.75rem',
        },
        loadMessagesContainer: {
            display: 'flex',
            width: 'max-content',
            flexDirection: 'row',
            marginRight: '1rem',
            marginTop: '0.5rem',
            marginLeft: 'auto',
            flexShrink: 0,
        },
        doubleArrowIcon: {
            color: (_o = (_m = (_l = props === null || props === void 0 ? void 0 : props.theme) === null || _l === void 0 ? void 0 : _l.palette) === null || _m === void 0 ? void 0 : _m.text) === null || _o === void 0 ? void 0 : _o.filter,
            height: '1rem',
            width: '1rem',
            maxWidth: '0.6em',
        },
        loadMessagesButton: {
            color: (_r = (_q = (_p = props === null || props === void 0 ? void 0 : props.theme) === null || _p === void 0 ? void 0 : _p.palette) === null || _q === void 0 ? void 0 : _q.background) === null || _r === void 0 ? void 0 : _r.socialReaction,
            fontSize: '0.75rem',
            fontWeight: 600,
            textDecoration: 'underline',
            cursor: 'pointer',
            lineHeight: '1rem',
            marginLeft: '0.125rem',
        },
        scrollToBottomStyles: {
            boxShadow: 'none',
            border: `0.063rem solid ${(_u = (_t = (_s = props === null || props === void 0 ? void 0 : props.theme) === null || _s === void 0 ? void 0 : _s.palette) === null || _t === void 0 ? void 0 : _t.background) === null || _u === void 0 ? void 0 : _u.digitalTag}`,
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
            transform: props.emailMessageSortOrder === EmailMessageSortOrder.NEWEST_ON_TOP ? 'rotate(180deg)' : '',
        },
        loadMessagesContainerForViewRecent: {
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            flexShrink: 0,
            padding: '0.25rem 0',
            flexDirection: props.emailMessageSortOrder === EmailMessageSortOrder.NEWEST_ON_TOP ? 'row-reverse' : 'column',
            alignItems: 'flex-end',
        },
        previewStyles: {
            cursor: 'pointer',
            textDecoration: 'underline',
            fontWeight: 400,
            color: (_x = (_w = (_v = props === null || props === void 0 ? void 0 : props.theme) === null || _v === void 0 ? void 0 : _v.palette) === null || _w === void 0 ? void 0 : _w.text) === null || _x === void 0 ? void 0 : _x.noteLabel,
            marginLeft: '0.313rem',
        },
    };
    return styles;
};
export default CcfDigitalEmailV2Styles;
//# sourceMappingURL=ccf-digital-email-v2.style.js.map