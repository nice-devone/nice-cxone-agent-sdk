import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { FormatBold, FormatItalic, FormatUnderlined, } from '@mui/icons-material';
import { Button, Tooltip, useTheme } from '@mui/material';
import ccfEditorToolbarStyles from '../../ccf-editor/ccf-editor-toolbar/ccf-editor-toolbar-styles';
import { CcfButton, useTranslator } from '@nice-devone/ui-controls';
import { memo } from 'react';
/**
 * Component displays Rich text Editor controls
 * @returns Rich text Editor controls
 * ```
 * @example
 * <CcfAgentChatToolbar/>
 * ```
 */
export function CcfAgentChatToolbar(props) {
    const theme = useTheme();
    const editorToolbarStyles = ccfEditorToolbarStyles(theme);
    const { styles } = props;
    const [translate] = useTranslator();
    return (_jsx(_Fragment, { children: _jsxs(_Fragment, { children: [_jsx(Tooltip, Object.assign({ title: translate('bold') }, { children: _jsx(CcfButton, Object.assign({ sx: Object.assign(Object.assign({}, (props.hightlightBtn === true ? editorToolbarStyles.buttonActive : undefined)), styles.button), name: translate('bold'), onMouseDown: props.onBoldClick, "data-testid": "bold" }, { children: _jsx(FormatBold, {}) })) })), _jsx(Tooltip, Object.assign({ title: translate('underline') }, { children: _jsx(Button, Object.assign({ sx: Object.assign(Object.assign(Object.assign({}, (props.highlightUnderlineBtn === true ? editorToolbarStyles.buttonActive : undefined)), styles.button), { marginBottom: '-1px', marginRight: '1px' }), name: translate('underline'), onMouseDown: props.onUnderLineClick, "data-testid": "underline" }, { children: _jsx(FormatUnderlined, {}) })) })), _jsx(Tooltip, Object.assign({ title: translate('italic') }, { children: _jsx(CcfButton, Object.assign({ sx: Object.assign(Object.assign({}, (props.hightlightItalicBtn === true ? editorToolbarStyles.buttonActive : undefined)), styles.button), name: translate('italic'), onMouseDown: props.onItalicClick, "data-testid": 'italic' }, { children: _jsx(FormatItalic, {}) })) }))] }) }));
}
export default memo(CcfAgentChatToolbar);
//# sourceMappingURL=ccf-agent-chat-toolbar.js.map