import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Box, useTheme, } from '@mui/material';
import { CcfBackIcon, } from '@nice-devone/ui-controls';
import { agentDirectoryActions, DirectoryDropdownValues, startAgentTeamPolling } from '../+state/ccf-directory.slice';
import { useDispatch } from 'react-redux';
import CcfDirectoryAgent from '../ccf-directory-agent/ccf-directory-agent';
import ccfDirectoryStyles from '../ccf-directory.styles';
import { useState } from 'react';
/**
 * Component to be used for directory item
 * @param props - team
 * @example <CcfDirectoryTeams />
 * @returns
 */
const CcfDrilldownAgents = (props) => {
    const { agentList, isFullView, team } = props;
    const dispatch = useDispatch();
    const theme = useTheme();
    const [_currentUser, setCurrentUser] = useState(agentList[0]);
    const directoryStyles = ccfDirectoryStyles(theme);
    /**
     * update state if user gets any agent item
     * gets selected in the child component
     * @param props- users
     * @example - updateSelectedAgentFlg
    */
    const updateSelectedAgentFlg = (user) => {
        setCurrentUser(user);
    };
    /**
     * back button to go back to team list
     * @example - backToTeam
    */
    const backToTeam = () => {
        dispatch(agentDirectoryActions.updateSearchBoxQuery(''));
        dispatch(agentDirectoryActions.flushAllData());
        dispatch(agentDirectoryActions.backToTeamList());
        const paramForTeamAgent = {
            offset: 1,
            limit: 25,
            searchText: '',
            selectedQueryValue: DirectoryDropdownValues.TeamList,
            value: [DirectoryDropdownValues.TeamList],
            teamId: '',
        };
        dispatch(startAgentTeamPolling(paramForTeamAgent));
    };
    return (_jsxs(_Fragment, { children: [_jsxs(Box, Object.assign({ tabIndex: 0, onClick: backToTeam, "data-testid": "backToTeamBox", sx: directoryStyles.drilldownHeader, onKeyPress: (e) => { if (e.key === 'Enter') {
                    backToTeam();
                } } }, { children: [_jsx(CcfBackIcon, { sx: directoryStyles.backIcon }), team === null || team === void 0 ? void 0 : team.name] })), agentList.map((agent) => (_jsx(CcfDirectoryAgent, { click: updateSelectedAgentFlg, isFullView: isFullView, user: agent, isHovering: false }, agent === null || agent === void 0 ? void 0 : agent.agentId)))] }));
};
export default CcfDrilldownAgents;
//# sourceMappingURL=ccf-drilldown-agents.js.map