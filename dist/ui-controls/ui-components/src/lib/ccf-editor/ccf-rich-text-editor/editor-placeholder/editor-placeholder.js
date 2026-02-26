import { jsxs as _jsxs } from "react/jsx-runtime";
import { memo } from 'react';
import { useTranslator } from '@nice-devone/ui-controls';
import { Box } from '@mui/material';
import { editorPlaceholderStyles } from './editor-placeholder.styles';
/**
 * Component displays Editor placeholder while ACP generate response
 * @returns Editor Placeholder
 * ```
 * @example
 * <EditorPlaceholder placeholderLoadingIcon={<div>placeholderLoadingIcon</div>} loadingText="reply is generating..."/>
 * ```
 */
const EditorPlaceholder = ({ placeholderLoadingIcon, loadingText, }) => {
    const styles = editorPlaceholderStyles();
    const [translate] = useTranslator();
    const translatedText = loadingText || translate('copilotEmailGenerationPlaceholderText');
    return (_jsxs(Box, Object.assign({ style: styles.wrap }, { children: [placeholderLoadingIcon && placeholderLoadingIcon, _jsxs(Box, Object.assign({ style: styles.text }, { children: [translatedText, " "] }))] })));
};
export default memo(EditorPlaceholder);
//# sourceMappingURL=editor-placeholder.js.map