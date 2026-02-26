import CcfContactMessageContainerStyle from '../../../ccf-digital/ccf-contact-message-container/ccf-contact-message-container-styles';
/**
 * style object for ccf-contact-message-container
 * @returns CcfDigitalEmailV2MessageDraftStyles styles object
 * ```
 * @example
 * <CcfDigitalEmailV2MessageDraftStyles/>
 * ```
 */
const CcfDigitalEmailV2MessageDraftStyles = (theme, isSmView) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
    const styles = Object.assign(Object.assign({}, CcfContactMessageContainerStyle), { inboundMessageTimeStamp: {
            fontSize: '0.688rem',
            lineHeight: '1rem',
            letterSpacing: '0rem',
            color: `${(_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.text) === null || _b === void 0 ? void 0 : _b.contrastText}`,
            display: 'inline-block',
            overflow: `${isSmView}` ? 'hidden' : 'visible',
            textOverflow: `${isSmView}` ? 'ellipsis' : '',
            whiteSpace: `${isSmView}` ? 'nowrap' : '',
        }, messageAuthor: {
            fontSize: `${(_d = (_c = theme === null || theme === void 0 ? void 0 : theme.typography) === null || _c === void 0 ? void 0 : _c.h5) === null || _d === void 0 ? void 0 : _d.fontSize}`,
            fontWeight: '600',
            lineHeight: '1rem',
            letterSpacing: '0%',
            color: `${(_f = (_e = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _e === void 0 ? void 0 : _e.text) === null || _f === void 0 ? void 0 : _f.contrastText}`,
            opacity: '1',
            marginBottom: '0.20rem',
            overflow: 'hidden',
            maxWidth: '150px',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
        }, authorAvtar: {
            width: '2.188rem',
            height: '2.188rem',
            bgcolor: (_g = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _g === void 0 ? void 0 : _g.background.checkboxHover,
            color: (_j = (_h = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _h === void 0 ? void 0 : _h.text) === null || _j === void 0 ? void 0 : _j.obAvatar,
            fontWeight: 600,
            fontSize: '1rem',
            marginTop: '-0.438rem',
        }, toField: {
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            fontSize: '0.688rem',
            fontWeight: 400,
            maxWidth: '12.5rem',
        }, cardHeaderPosition: {
            marginTop: '0.5rem',
            padding: '0.3rem 0.7rem',
            '.MuiCardHeader-avatar': {
                marginRight: '0.4rem',
            },
            '.MuiCardHeader-content': {
                width: '30%',
            },
            '.MuiCardHeader-content p': {
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
            },
        }, cardContentPosition: {
            padding: '0.3rem 0.3rem',
        }, gridItemPosition: {
            padding: '0rem 0.2rem',
        }, draftMessageContentBody: {
            width: '95%',
            textAlign: 'left',
            padding: '0 0.938rem',
            letterSpacing: 0,
            opacity: '1',
            '& > span': {
                fontSize: '0.75rem',
                overflowY: 'hidden',
                display: 'block',
            },
            '& ul': {
                listStylePosition: 'inside',
            },
            lineHeight: 'initial',
            overflowX: 'visble',
            overflowY: 'hidden',
            paddingBottom: '0.313rem',
            marginLeft: '1.688rem',
        }, approvalInfoContainer: {
            clear: 'both',
            width: '100%',
            borderTop: `0.081rem solid ${(_l = (_k = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _k === void 0 ? void 0 : _k.digitalStatus) === null || _l === void 0 ? void 0 : _l.pendingDark}`,
        }, messageDraftCard: {
            marginBottom: '0',
            width: '100%',
            border: `0.125rem solid ${(_o = (_m = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _m === void 0 ? void 0 : _m.boxshadow) === null || _o === void 0 ? void 0 : _o.light}`,
        }, messageDraftCardContainer: {
            clear: 'both',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '0px 0.8rem',
            margin: '0.625rem auto',
        }, message: {
            fontSize: `${(_p = theme === null || theme === void 0 ? void 0 : theme.typography) === null || _p === void 0 ? void 0 : _p.h6.fontSize}`,
            maxWidth: '90%',
            textAlign: 'left',
            letterSpacing: '0rem',
            opacity: '1',
            color: `${(_r = (_q = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _q === void 0 ? void 0 : _q.text) === null || _r === void 0 ? void 0 : _r.dark}`,
        }, messageTitle: {
            display: 'flex',
            flexWrap: 'wrap',
            flexDirection: 'column',
        } });
    return styles;
};
export default CcfDigitalEmailV2MessageDraftStyles;
//# sourceMappingURL=ccf-digital-email-v2-messageDraft.styles.js.map