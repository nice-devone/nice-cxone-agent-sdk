import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import ccfEmptyCopilotStateStyles from './ccf-empty-copilot-state.styles';
import { Box, Typography, useTheme } from '@mui/material';
import { CcfSparklesIcon, CcfSuggestionIcon, useTranslator } from '@nice-devone/ui-controls';
import { CopilotService } from '@nice-devone/agent-sdk';
const copilotService = new CopilotService();
/**
 * Component displays copilot empty state container
 * @param props - props
 * @returns
 *  @example -
 * ```
 * <CcfEmptyCopilotState />
 * ```
 */
const CcfEmptyCopilotState = () => {
    var _a, _b;
    const theme = useTheme();
    const styles = ccfEmptyCopilotStateStyles(theme);
    const agentFirstName = copilotService.getAgentFirstName();
    const [translate] = useTranslator();
    return (_jsxs(Box, Object.assign({ sx: styles.emptyStateContainer, "data-testid": "acp-empty-container" }, { children: [_jsx(CcfSparklesIcon, { htmlColor: (_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.primary) === null || _b === void 0 ? void 0 : _b.main, sx: styles.sparklesIcon }), _jsxs(Box, Object.assign({ sx: styles.contentContainer }, { children: [_jsx(CcfSuggestionIcon, { viewBox: "-10 -4 24 24", sx: styles.suggestionIcon }), _jsxs(Box, Object.assign({ sx: styles.textContainer }, { children: [_jsxs(Typography, Object.assign({ sx: styles.title }, { children: [translate('greeting'), " ", agentFirstName] })), _jsx(Typography, Object.assign({ sx: styles.description }, { children: translate('copilotIntroduction') }))] }))] }))] })));
};
export default CcfEmptyCopilotState;
//# sourceMappingURL=ccf-empty-copilot-state.js.map