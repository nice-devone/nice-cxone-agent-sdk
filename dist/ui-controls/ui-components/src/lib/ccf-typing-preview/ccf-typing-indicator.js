import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef, useEffect } from 'react';
import CcfTypingIndicatorStyle from './ccf-typing-indicator-styles';
import { Box, Typography, useTheme } from '@mui/material';
/**
 * Component to typing indicator and text preview
 * @example
 * @param props - CcfTypingIndicatorProps
 * @returns a wrapper containing message and icon
 * ```
 * @example
 * <CcfTypingIndicator />
 * ```
 */
export function CcfTypingIndicator(props) {
    const { message, icon } = props;
    const theme = useTheme();
    const styles = CcfTypingIndicatorStyle(theme);
    const textPreviewRef = useRef(null);
    useEffect(() => {
        var _a;
        // Automatically focus on the end of the text when the component mounts or updates
        if (textPreviewRef === null || textPreviewRef === void 0 ? void 0 : textPreviewRef.current) {
            textPreviewRef.current.scrollTop = (_a = textPreviewRef === null || textPreviewRef === void 0 ? void 0 : textPreviewRef.current) === null || _a === void 0 ? void 0 : _a.scrollHeight;
        }
    }, [message]);
    return (_jsx(Box, Object.assign({ sx: Object.assign({}, styles.typingIndicatorContainer) }, { children: _jsxs(Box, Object.assign({ sx: styles.flexContainer }, { children: [icon && _jsx(Box, Object.assign({ sx: Object.assign(Object.assign({}, styles.iconContainer), { marginRight: icon && message ? '2.5rem' : '2rem' }), "data-testid": "threeDots" }, { children: icon })), message && (_jsx(Typography, Object.assign({ ref: textPreviewRef, sx: styles.previewText }, { children: message })))] })) })));
}
export default CcfTypingIndicator;
//# sourceMappingURL=ccf-typing-indicator.js.map