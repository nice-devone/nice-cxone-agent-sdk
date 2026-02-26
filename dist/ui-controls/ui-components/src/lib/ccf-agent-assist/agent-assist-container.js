import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Paper, Tab, Tabs, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useState } from 'react';
import { CcaiAppComponent } from './ccai/ccai';
import { getAgentAssistActiveProvidersForContactId } from './features/active-providers-slice';
import { useSelector } from 'react-redux';
import { RtigAppComponent } from './rtig/rtig';
import tabPanelStyles, { agentAssistContainerStyles } from './agent-assist-container.styles';
import { getNonIncomingActiveContactInSelectedInteraction } from '../ccf-assignment-panel/ccf-assignment-panel.slice';
import { CcfBox } from '@nice-devone/ui-controls';
/**
 * Agent Assist Container component
 * @example - <AgentAssistContainer />
 */
export function AgentAssistContainer() {
    const theme = useTheme();
    const agentAssistAppStyles = agentAssistContainerStyles(theme);
    const [tabValue, setTabValue] = useState(0);
    const isBelowMd = useMediaQuery(theme.breakpoints.down('md'));
    const isBelowLg = useMediaQuery(theme.breakpoints.down('lg'));
    const nonIncomingActiveContactInSelectedInteraction = useSelector(getNonIncomingActiveContactInSelectedInteraction);
    const selectedContactId = (nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.contactId.toString()) || '';
    const providerIdList = useSelector(getAgentAssistActiveProvidersForContactId(selectedContactId));
    /**
     * function to handle change of tab event
     * @example - handleChange(tabChangeEvent, newTabValue);
     */
    const handleChange = (_event, newValue) => {
        setTabValue(newValue);
    };
    return (_jsxs(CcfBox, Object.assign({ sx: agentAssistAppStyles.mainContainer }, { children: [_jsx(CcfBox, Object.assign({ style: agentAssistAppStyles.tabsFlexBox }, { children: _jsx(Tabs, Object.assign({ value: tabValue, onChange: handleChange }, { children: providerIdList === null || providerIdList === void 0 ? void 0 : providerIdList.map((_provider, index) => (_jsx(Tab, { label: `${providerIdList[index].toUpperCase()}` }, `key_${providerIdList[index].toUpperCase()}`))) })) })), _jsx(Paper, Object.assign({ variant: 'outlined', style: agentAssistAppStyles.tabsPanelsContainer }, { children: _jsxs(CcfBox, Object.assign({ style: agentAssistAppStyles.tabsPanels }, { children: [(providerIdList === null || providerIdList === void 0 ? void 0 : providerIdList.includes('ccai')) &&
                            (_jsx(TabPanel, Object.assign({ value: tabValue, index: providerIdList.findIndex(provider => provider === 'ccai') }, { children: _jsx(CcaiAppComponent, { isBelowMd: isBelowMd, selectedContactId: selectedContactId }) }))), (providerIdList === null || providerIdList === void 0 ? void 0 : providerIdList.includes('rtig')) &&
                            (_jsx(TabPanel, Object.assign({ value: tabValue, index: providerIdList.findIndex(provider => provider === 'rtig') }, { children: _jsx(RtigAppComponent, { isBelowMd: isBelowMd, isBelowLg: isBelowLg }) })))] })) }))] })));
}
/**
 * TabPanel component
 * @example - <TabPanel />
 */
export function TabPanel({ children, value, index }) {
    const theme = useTheme();
    const tabPanelSx = tabPanelStyles(theme);
    return (_jsx("div", Object.assign({ role: "tabpanel", style: tabPanelSx.mainContainer, hidden: value !== index }, { children: value === index && (_jsx(Box, Object.assign({ sx: tabPanelSx.boxContainer }, { children: _jsx(Typography, Object.assign({ sx: tabPanelSx.typographyContainer }, { children: children })) }))) })));
}
//# sourceMappingURL=agent-assist-container.js.map