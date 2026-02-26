import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useTheme } from '@mui/material';
import { CcfBox, useTranslator, CcfTypography } from '@nice-devone/ui-controls';
import CcfPermissionErrorBannerStyle from './ccf-permission-error-banner-styles';
import { DIGITAL_SEARCH_ICONS } from '../../../../ccf-icon/ccf-icon-list';
import CcfIcon from '../../../../ccf-icon/ccf-icon';
import { ELEMENT_ROLES } from '@nice-devone/common-sdk';
/**
 * CcfPermissionErrorBanner - displayed when a user lacks permission to access certain content
 * @example - `<CcfPermissionErrorBanner />`
 */
export function CcfPermissionErrorBanner() {
    const theme = useTheme();
    const [translate] = useTranslator();
    const styles = CcfPermissionErrorBannerStyle(theme);
    return (_jsxs(CcfBox, Object.assign({ sx: styles.permissionsWrapper }, { children: [_jsx(CcfIcon, { iconName: DIGITAL_SEARCH_ICONS.PERMISSION_DENIED, svgIconStyles: {
                    sx: styles.permissionsDeniedIcon,
                } }), _jsxs(CcfTypography, Object.assign({ variant: "h4", title: "permission-error", "aria-label": `${translate('permissionDenied')}, ${translate('contactYourAdmin')}`, role: ELEMENT_ROLES.ALERT, "data-testid": 'permission-error', sx: styles.permissionsDeniedMessage }, { children: [translate('permissionDenied'), _jsx("br", {}), " ", translate('contactYourAdmin')] }))] })));
}
;
export default CcfPermissionErrorBanner;
//# sourceMappingURL=ccf-permission-error-banner.js.map