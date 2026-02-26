import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { Box, Typography, useTheme } from '@mui/material';
import CcfBannerStyles from './ccf-banner.style';
/**
 * @param CcfBannerProps - Public banner data
 * ```
 * @example
 *  <CcfBanner {...CcfBannerProps} />
 * ```
 */
export function CcfBanner(props) {
    const { bannerMessage, bannerIcon, customBannerContainer, customBannerContentContainer, customBannerText, undeliveredErrorMessage } = props;
    const theme = useTheme();
    const styles = CcfBannerStyles(theme);
    return (_jsx(Box, Object.assign({ sx: Object.assign(Object.assign(Object.assign({}, styles.CcfBannerContainer), customBannerContainer), (undeliveredErrorMessage ? styles.CCfDeliveryErrorContainer : {})) }, { children: _jsxs(Box, Object.assign({ sx: Object.assign(Object.assign({}, styles.CcfBannerContentContainer), customBannerContentContainer) }, { children: [bannerIcon, _jsxs(Typography, Object.assign({ sx: Object.assign(Object.assign({}, styles.CcfBannerText), customBannerText) }, { children: [undeliveredErrorMessage && (_jsxs(Typography, Object.assign({ component: "span", sx: Object.assign(Object.assign(Object.assign({}, styles.CcfBannerText), customBannerText), styles.deliveryErrorStyle) }, { children: [undeliveredErrorMessage, "\u00A0"] }))), bannerMessage] }))] })) })));
}
export default CcfBanner;
//# sourceMappingURL=ccf-banner.js.map