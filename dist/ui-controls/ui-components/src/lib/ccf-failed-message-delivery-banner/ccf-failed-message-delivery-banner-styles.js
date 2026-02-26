import CcfContactMessageContainerStyles from '../ccf-digital/ccf-contact-message-container/ccf-contact-message-container-styles';
/**
 * style object for ccf-failed-message-delivery
 * @returns CcfFailedMessageDeliveryBannerStyle styles object
 * ```
 * @example
 * <CcfFailedMessageDeliveryBannerStyle/>
 * ```
 */
const CcfFailedMessageDeliveryBannerStyle = (theme) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
    const messageContainerStyles = CcfContactMessageContainerStyles(theme);
    const styles = {
        failedMessageBannerContainer: Object.assign(Object.assign({}, messageContainerStyles.messageContainer), { display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }),
        failedMessageBannerWrapper: {
            float: 'right',
            marginRight: '0.875em',
            wordBreak: 'break-word',
            minWidth: '75%',
            paddingLeft: '1rem',
            marginTop: '0.5rem',
            display: 'flex',
            flexDirection: 'column',
            alignContent: 'flex-end',
            alignItems: 'flex-end',
            flexWrap: 'wrap',
            [theme.breakpoints.up('xl')]: {
                minWidth: '60%',
            },
        },
        failedOutBoundMessageStyle: Object.assign(Object.assign(Object.assign({}, messageContainerStyles.outboundMessage), messageContainerStyles.message), { float: 'right', marginRight: '0', color: (_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.text) === null || _b === void 0 ? void 0 : _b.white, backgroundColor: (_d = (_c = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _c === void 0 ? void 0 : _c.background) === null || _d === void 0 ? void 0 : _d.sparkleBlue, borderRadius: '0.37rem 0.37rem 0 0', fontSize: '0.75em', padding: '0.75em', textAlign: 'left', letterSpacing: '0rem', width: '100%', '& p': {
                margin: 0,
            } }),
        failedMessageBanner: Object.assign(Object.assign({}, messageContainerStyles.message), { float: 'right', color: (_f = (_e = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _e === void 0 ? void 0 : _e.text) === null || _f === void 0 ? void 0 : _f.contrastText, backgroundColor: (_h = (_g = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _g === void 0 ? void 0 : _g.background) === null || _h === void 0 ? void 0 : _h.lavenderBlush, wordBreak: 'break-word', border: `1px solid ${(_k = (_j = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _j === void 0 ? void 0 : _j.text) === null || _k === void 0 ? void 0 : _k.red}`, fontSize: '0.75rem', fontWeight: 600, display: 'flex', flexDirection: 'row', clear: 'both', width: '90%', borderRadius: '0 0 0.37rem 0.37rem', '& svg': {
                fill: (_m = (_l = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _l === void 0 ? void 0 : _l.text) === null || _m === void 0 ? void 0 : _m.contrastText,
            }, '& button': {
                color: 'inherit',
                textDecoration: 'underline',
                fontSize: 'inherit',
                fontWeight: 'inherit',
            } }),
        warningIcon: {
            '& svg': {
                fill: (_p = (_o = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _o === void 0 ? void 0 : _o.text) === null || _p === void 0 ? void 0 : _p.red,
            },
        },
        buttonContainer: {
            display: 'table-cell',
            padding: '0 0 0 0.6rem',
        },
        bannerLabel: {
            padding: '.2rem',
        },
        actionWrapper: {
            padding: '.2rem',
            marginLeft: 'auto',
        },
    };
    return styles;
};
export default CcfFailedMessageDeliveryBannerStyle;
//# sourceMappingURL=ccf-failed-message-delivery-banner-styles.js.map