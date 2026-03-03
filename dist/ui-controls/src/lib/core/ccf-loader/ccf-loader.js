import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, useTheme } from '@mui/material';
import { useTranslator } from '../../ccf-translator/ccf-translator';
import ccfLoaderStyles from './ccf-loader.styles';
/**
 * Function to show loader
 * @example - <CcfLoader />
 */
export function CcfLoader(props) {
    const { showLoadingText, isPrimary, brandingColor } = props;
    const theme = useTheme();
    const styles = ccfLoaderStyles(theme, { isPrimary, brandingColor });
    const [translate] = useTranslator();
    return (_jsxs("span", Object.assign({ style: styles.loaderContainer }, { children: [showLoadingText && _jsx("span", Object.assign({ style: styles.loaderColor }, { children: translate('loading') })), _jsxs("ul", Object.assign({ style: styles.loaderBox }, { children: [_jsx(Box, { sx: [styles.loader, styles.firstLoaderBar] }), _jsx(Box, { sx: [styles.loader, styles.secondLoaderBar] }), _jsx(Box, { sx: [styles.loader, styles.thirdLoaderBar] })] }))] })));
}
export default CcfLoader;
//# sourceMappingURL=ccf-loader.js.map