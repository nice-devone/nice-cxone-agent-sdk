import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import { DirectoryUserAgentStates } from '../../ccf-directory/+state/ccf-directory.slice';
/**
 * Show Progress Bar for Productivity Details
 *
 * @example - <CcfProductivityDetailsProgressBar />
 * @returns
 */
const CcfProductivityDetailsProgressBar = React.memo((props) => {
    const { isTeamProgressBar, percentage, agentState } = props;
    const theme = useTheme();
    /**
     * @example getAgentStateColor()
     * @returns color of the agent State
     */
    const getAgentStateColor = () => {
        switch (agentState) {
            case DirectoryUserAgentStates.Available: return theme.palette.success.main;
            case DirectoryUserAgentStates.Working: return theme.palette.accent.dark;
            case DirectoryUserAgentStates.Unavailable: return theme.palette.error.main;
            default: return theme.palette.primary.main;
        }
    };
    // If width is more than 75, reduce the width to fit the time. If % is 0, add little width by default
    const defaultMiniWidth = `${percentage > 0.3 ? percentage : '0.3'}%`;
    const width = percentage > 75 ? `calc(${percentage}% - 60px)` : defaultMiniWidth;
    const backgroundColor = getAgentStateColor();
    const opacity = isTeamProgressBar ? 0.6 : 1;
    return (_jsx(Box, { sx: { height: '25px', width, backgroundColor, opacity } }));
});
export default React.memo(CcfProductivityDetailsProgressBar);
//# sourceMappingURL=ccf-productivity-details-progress-bar.js.map