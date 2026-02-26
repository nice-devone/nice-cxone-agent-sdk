/**
 * style object for ccf-banner
 * @returns CcfBannerStyles object
 * ```
 * @example
 * <CcfBannerStyles/>
 * ```
 */
const CcfBannerStyles = (theme) => {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    const styles = {
        CcfBannerContentContainer: {
            display: 'flex',
        },
        CcfBannerContainer: {
            border: `1px solid ${(_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.border) === null || _b === void 0 ? void 0 : _b.main}`,
            borderRadius: '0.25rem',
            display: 'flex',
            flexDirection: 'column',
            margin: '0.5rem',
            padding: '0.5rem',
        },
        CCfDeliveryErrorContainer: {
            border: `1px solid ${(_d = (_c = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _c === void 0 ? void 0 : _c.text) === null || _d === void 0 ? void 0 : _d.red}`,
            backgroundColor: `${(_f = (_e = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _e === void 0 ? void 0 : _e.background) === null || _f === void 0 ? void 0 : _f.lavenderBlush}`,
        },
        CcfBannerText: {
            color: (_h = (_g = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _g === void 0 ? void 0 : _g.text) === null || _h === void 0 ? void 0 : _h.contrastText,
            fontSize: '0.75rem',
            fontWeight: '400',
            marginLeft: '0.375rem',
            marginTop: '0.2rem',
        },
        deliveryErrorStyle: {
            fontWeight: 700,
            marginLeft: 0,
        },
        bannerIcon: {
            alignContent: 'center',
        },
    };
    return styles;
};
export default CcfBannerStyles;
//# sourceMappingURL=ccf-banner.style.js.map