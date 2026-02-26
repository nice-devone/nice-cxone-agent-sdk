import { __rest } from "tslib";
import { jsx as _jsx } from "react/jsx-runtime";
import { SvgIcon, useTheme } from '@mui/material';
/**
 * CcfCopilotSuccessIcon used to display copilot success icon
 * @example -- <CcfCopilotSuccessIcon />
 */
export function CcfCopilotSuccessIcon(_a) {
    var { htmlColor } = _a, props = __rest(_a, ["htmlColor"]);
    const theme = useTheme();
    return (_jsx(SvgIcon, Object.assign({ width: "16", height: "16", viewBox: "0 0 16 16" }, props, { children: _jsx("path", { d: "M8 0C3.6 0 0 3.6 0 8C0 12.4 3.6 16 8 16C12.4 16 16 12.4 16 8C16 3.6 12.4 0 8 0ZM12.16 6.48L7.6 11.04C7.44 11.2 7.2 11.28 7.04 11.28C6.8 11.28 6.56 11.2 6.4 11.04L4.16 8.8C3.84 8.48 3.84 8 4.16 7.68C4.48 7.36 4.96 7.36 5.28 7.68L7.04 9.44L11.04 5.44C11.36 5.12 11.84 5.12 12.16 5.44C12.48 5.76 12.48 6.16 12.16 6.48V6.48Z", fill: htmlColor !== null && htmlColor !== void 0 ? htmlColor : theme.palette.agentState.available }) })));
}
export default CcfCopilotSuccessIcon;
//# sourceMappingURL=ccf-copilot-success-icon.js.map