/**
 * style object for ccf-permission-error-banner
 * @returns CcfPermissionErrorBannerStyle object
 * @example CcfPermissionErrorBannerStyle()
 */
const CcfPermissionErrorBannerStyle = (theme) => {
    var _a, _b;
    const styles = {
        permissionsWrapper: {
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
            alignContent: 'center',
            flexWrap: 'wrap',
        },
        permissionsDeniedIcon: {
            fontSize: '12.5rem',
        },
        permissionsDeniedMessage: {
            color: (_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.text) === null || _b === void 0 ? void 0 : _b.secondary,
            fontStyle: 'normal',
            fontVariant: 'normal',
            fontWeight: 600,
            fontSize: '0.875rem',
            lineHeight: '1.1875rem',
            textAlign: 'center',
        },
    };
    return styles;
};
export default CcfPermissionErrorBannerStyle;
//# sourceMappingURL=ccf-permission-error-banner-styles.js.map