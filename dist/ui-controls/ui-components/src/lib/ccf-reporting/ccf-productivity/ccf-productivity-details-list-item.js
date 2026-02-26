import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { Grid, useMediaQuery } from '@mui/material';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import { CcfTypography, useTranslator } from '@nice-devone/ui-controls';
import { getStateName, getStatusIcon } from '../../ccf-directory/ccf-directory-utils';
import CcfProductivityDetailsProgressBar from './ccf-productivity-details-progress-bar';
import CcfReportingStyles from './ccf-productivity-styles';
/**
   * Return Right side List view of Progress bar
   * @example - <ProgressBarComponent />
   * @returns
   */
const ProgressBarComponent = ({ statePercentage, stateDuration, isTeamView, textStyles, agentStateData, isLgView }) => (_jsxs(Grid, Object.assign({ xs: 6, lg: 8, display: "flex", alignItems: "center" }, { children: [_jsx(CcfProductivityDetailsProgressBar, { agentState: (agentStateData === null || agentStateData === void 0 ? void 0 : agentStateData.stateName) || '', percentage: statePercentage, isTeamProgressBar: isTeamView }), _jsx(CcfTypography, Object.assign({ variant: isLgView ? 'body1' : 'h5', marginLeft: 1 }, textStyles, { children: stateDuration }))] })));
/**
 * Show List Item for Productivity Details
 *
 * @example - <CcfProductivityDetailsListItem />
 * @returns
 */
const CcfProductivityDetailsListItem = (props) => {
    const [translate] = useTranslator();
    const theme = useTheme();
    const productivityStyles = CcfReportingStyles(theme);
    const isLgView = useMediaQuery(theme.breakpoints.up('sm'));
    const { agentStateData } = props;
    return (_jsxs(Grid, Object.assign({ container: true, sx: productivityStyles.productivityListContainer }, { children: [_jsxs(Box, Object.assign({ sx: productivityStyles.productivityListItem }, { children: [_jsxs(Grid, Object.assign({ xs: 6, lg: 4, sx: productivityStyles.productivityListTitle }, { children: [isLgView && getStatusIcon(agentStateData.stateName), _jsx(CcfTypography, Object.assign({ variant: isLgView ? 'body1' : 'h5', fontWeight: 600, marginLeft: isLgView ? 2 : 0 }, { children: `${getStateName(agentStateData.stateName, translate)} (${agentStateData.stateAgentPercentage}%)` }))] })), _jsx(ProgressBarComponent, { statePercentage: agentStateData.stateAgentPercentage, stateDuration: agentStateData.stateAgentDuration, textStyles: { fontWeight: 600 }, agentStateData: agentStateData, isLgView: isLgView })] })), (agentStateData === null || agentStateData === void 0 ? void 0 : agentStateData.subStates.length) > 0 && agentStateData.subStates.map((agentState) => (_jsxs(Box, Object.assign({ sx: productivityStyles.productivityListItem }, { children: [_jsx(Grid, Object.assign({ xs: 6, lg: 4, sx: productivityStyles.productivityListTitle }, { children: _jsx(CcfTypography, Object.assign({ marginLeft: isLgView ? 5 : 0, variant: isLgView ? 'body1' : 'h6', sx: productivityStyles.textEllipsis }, { children: agentState.outStateName })) })), _jsx(ProgressBarComponent, { statePercentage: agentState.outStateBarPercentage, stateDuration: agentState.outStateDuration, textStyles: { variant: isLgView ? 'body1' : 'h6' }, agentStateData: agentStateData, isLgView: isLgView })] }), agentState.outStateName))), _jsxs(Box, Object.assign({ sx: productivityStyles.productivityListItem }, { children: [_jsxs(Grid, Object.assign({ xs: 6, lg: 4, sx: productivityStyles.productivityListTitle }, { children: [_jsx(CcfTypography, { translationKey: "team", fontWeight: 600, color: theme.palette.text.header, marginLeft: isLgView ? 5 : 0 }), " \u00A0", _jsx(CcfTypography, Object.assign({ fontWeight: 600, color: theme.palette.text.header }, { children: `(${agentStateData.stateTeamPercentage}%)` }))] })), _jsx(ProgressBarComponent, { statePercentage: agentStateData.stateTeamPercentage, stateDuration: agentStateData.stateTeamDuration, isTeamView: true, textStyles: { color: theme.palette.text.header, fontWeight: 600 }, agentStateData: agentStateData, isLgView: isLgView })] }))] })));
};
export default React.memo(CcfProductivityDetailsListItem);
//# sourceMappingURL=ccf-productivity-details-list-item.js.map