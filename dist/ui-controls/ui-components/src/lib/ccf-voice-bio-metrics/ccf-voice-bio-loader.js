import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, useTheme } from '@mui/material';
import ccfVoiceBioLoaderStyles from './ccf-voice-bio-loader.styles';
/**
 * Function to show loader
 * @example - <CcfLoader />
 */
export function CcfVoiceBioLoader(props) {
    const { isPrimary, brandingColor } = props;
    const theme = useTheme();
    const styles = ccfVoiceBioLoaderStyles(theme, { isPrimary, brandingColor });
    return (_jsx("span", Object.assign({ style: styles.loaderContainer }, { children: _jsxs("ul", Object.assign({ style: styles.loaderBox }, { children: [_jsx(Box, { sx: [styles.loader, styles.firstLoaderBar] }), _jsx(Box, { sx: [styles.loader, styles.secondLoaderBar] }), _jsx(Box, { sx: [styles.loader, styles.thirdLoaderBar] })] })) })));
}
export default CcfVoiceBioLoader;
//# sourceMappingURL=ccf-voice-bio-loader.js.map