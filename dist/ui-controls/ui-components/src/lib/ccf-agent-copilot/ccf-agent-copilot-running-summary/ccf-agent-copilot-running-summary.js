import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef, useState, useMemo } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import CcfAgentCopilotRunningSummaryStyles from './ccf-agent-copilot-running-summary.styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { useContainerWidthObserver } from '../../../hooks/useContainerWidthObserver';
/**
 * Component that displays copilot sticky running summary
 * @param summary - summary text to display
 * @returns
 * @example
 */
const CcfAgentCopilotRunningSummary = ({ summary }) => {
    const theme = useTheme();
    const lineHeight = 15;
    const fontSize = 12;
    const letterSpacing = 0.15;
    const runningSummaryStyles = CcfAgentCopilotRunningSummaryStyles(theme, lineHeight, fontSize);
    const containerRef = useRef(null);
    const [isExpanded, setIsExpanded] = useState(true);
    const { containerWidth } = useContainerWidthObserver(containerRef);
    const SUMMARY_MIN_LINES = 2;
    const maxCharsBeforeExpand = useMemo(() => 2 * SUMMARY_MIN_LINES * Math.round(containerWidth / (fontSize + letterSpacing)), [containerWidth]);
    /**
   * Toggle function to change isExpanded state
   * @returns
   * @example
   */
    const toggleExpanded = () => {
        setIsExpanded(!isExpanded);
    };
    /**
   * Component that displays expand collapse container
   * @returns
   * @example
   */
    const ExpandContainer = () => _jsx(Box, Object.assign({ onClick: toggleExpanded }, { children: isExpanded ? _jsx(ExpandMoreIcon, {}) : _jsx(ExpandLessIcon, {}) }));
    if (!summary)
        return _jsx(_Fragment, {});
    return (_jsxs(Box, Object.assign({ sx: runningSummaryStyles.runningSummaryContainer, "data-testid": "acp-running-summary-container" }, { children: [_jsx(Box, Object.assign({ ref: containerRef, sx: { width: '100%' } }, { children: _jsx(Typography, Object.assign({ variant: "h5", sx: isExpanded ?
                        [runningSummaryStyles.summaryText, runningSummaryStyles.expandedSummaryText] :
                        runningSummaryStyles.summaryText }, { children: summary })) })), summary.length > maxCharsBeforeExpand && _jsx(ExpandContainer, {})] })));
};
export default CcfAgentCopilotRunningSummary;
//# sourceMappingURL=ccf-agent-copilot-running-summary.js.map