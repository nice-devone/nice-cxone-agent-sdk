import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useTheme } from '@mui/material/styles';
import { CopilotLabelText } from './ccf-agent-copilot-dynamic-input-types.styles';
/**
 * Provides a consistent label + required indicator wrapper around form inputs.
 * NOTE: Replace hard-coded styles with theme tokens in future iteration.
 * @example
 * ```tsx
 * <InputWrapper label="First Name" required>
 *   <input type="text" />
 * </InputWrapper>
 * ```
 */
export const InputWrapper = ({ label, required, children }) => {
    const theme = useTheme();
    return (_jsxs("div", Object.assign({ style: { marginBottom: theme.spacing(1.5) } }, { children: [_jsxs("label", Object.assign({ style: { marginBottom: theme.spacing(0.5) } }, { children: [_jsx(CopilotLabelText, { children: label }), required && (_jsx("span", Object.assign({ "aria-hidden": "true", style: { color: theme.palette.error.main } }, { children: ' *' })))] })), children] })));
};
//# sourceMappingURL=ccf-input-wrapper.js.map