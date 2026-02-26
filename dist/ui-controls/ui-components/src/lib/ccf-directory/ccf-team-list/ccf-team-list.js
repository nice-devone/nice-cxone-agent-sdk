import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef } from 'react';
import { Box, useTheme, } from '@mui/material';
import { CcfTeamIcon, CcfTypography, useTranslator, CcfFavouriteIcon, CcfTooltip, CCfToggleIconButton, CcfAppToastMessage, CcfUnfavoredIcon, } from '@nice-devone/ui-controls';
import { DirectoryDropdownValues, startAgentTeamPolling, stopEveryPolling, DirectorySearchRecord, agentDirectoryActions, getCurrentFavsInDirectory, toggleFavoriteForTeams, getFavoritesToastReference } from '../+state/ccf-directory.slice';
import { useDispatch, useSelector } from 'react-redux';
import ccfDirectoryStyles from '../ccf-directory.styles';
import ccfTeamListStyles from './ccf-team-list.styles';
import { FeatureToggleService } from '@nice-devone/agent-sdk';
import { toast } from 'react-toastify';
import { getFavoritesStatesToastReference } from '../../ccf-agent-state/ccf-agent-state.slice';
import { getAgentProfileSettings } from '../../ccf-agent-setting/ccf-agent-setting-slice';
/**
 * Component to be used for directory item
 * @param props - team
 * @example <CcfDirectoryTeams />
 * @returns
 */
const CcfDirectoryTeams = (props) => {
    var _a;
    const { team } = props;
    const dispatch = useDispatch();
    const [translate] = useTranslator();
    const totalRecordsLimit = DirectorySearchRecord.DirectoryCount;
    const theme = useTheme();
    const directoryStyles = ccfDirectoryStyles(theme);
    const teamListStyles = ccfTeamListStyles(theme);
    const isFavoritesFTEnabled = FeatureToggleService.instance.getFeatureToggleSync("release-cxa-favorites-AW-40314" /* FeatureToggles.CXA_FAVORITES_FEATURE_TOGGLE */);
    const currentFavsInDirectory = useSelector(getCurrentFavsInDirectory);
    const favoritesToastReference = useSelector(getFavoritesToastReference);
    const favoritesToastReferenceFortState = useSelector(getFavoritesStatesToastReference);
    const appToastContainer = useRef();
    const agentProfileSettings = useSelector(getAgentProfileSettings);
    const DIRECTORY_MAX_FAVS_ALLOWED = 25;
    const fontSizes = {
        small: 'small',
        smaller: 'smaller',
    };
    /**
   * Function to display inital popover when user clicks on team
   * @example openPopover()
   */
    const openPopover = () => {
        props.setOffsetIndexForAgent(0);
        if (team.agentCount !== 0) {
            props.getTeamIdFromTeams({ 'id': team.teamId, 'name': team.teamName, 'agentCount': team.agentCount });
            const paramForTeamAgent = {
                offset: 1,
                limit: totalRecordsLimit,
                searchText: '',
                selectedQueryValue: DirectoryDropdownValues.TeamList,
                value: [DirectoryDropdownValues.AgentList],
                teamId: team.teamId.toString(),
            };
            dispatch(agentDirectoryActions.flushDataForAgentDrilldown());
            dispatch(stopEveryPolling());
            dispatch(agentDirectoryActions.updateSearchBoxQuery(''));
            dispatch(startAgentTeamPolling(paramForTeamAgent));
        }
    };
    /**
     * Function to toggle favorite option for selected Agent
     * @param team - Team
     * ```
     * @example toggleFavorite(team)
     * ```
     */
    const toggleFavorite = (team) => {
        var _a, _b;
        const totalFavoritesCount = currentFavsInDirectory ?
            (_a = Object.values(currentFavsInDirectory)) === null || _a === void 0 ? void 0 : _a.reduce((sumOfFavs, favsArray) => sumOfFavs + ((favsArray === null || favsArray === void 0 ? void 0 : favsArray.length) || 0), 0) : 0;
        if (totalFavoritesCount >= DIRECTORY_MAX_FAVS_ALLOWED && !((_b = currentFavsInDirectory === null || currentFavsInDirectory === void 0 ? void 0 : currentFavsInDirectory.teams) === null || _b === void 0 ? void 0 : _b.includes(team === null || team === void 0 ? void 0 : team.teamId))) {
            favoritesToastReference && toast.dismiss(favoritesToastReference);
            favoritesToastReferenceFortState && toast.dismiss(favoritesToastReferenceFortState);
            appToastContainer.current = toast.error(_jsx(CcfAppToastMessage, { type: "any", messageKey: 'favsLimitExceeded', extraArgs: { format: [DIRECTORY_MAX_FAVS_ALLOWED || ''] } }), {
                autoClose: false,
                closeOnClick: true,
                position: 'top-center',
                containerId: 'AppToastContainer',
            });
            dispatch(agentDirectoryActions.updateFavsToastReference(appToastContainer.current));
        }
        else {
            dispatch(toggleFavoriteForTeams({ team: [team] }));
        }
    };
    /**
   * Function to narrate favorite option for selected Agent
   * @example narrationForFavorite()
   */
    const narrationForFavorite = () => {
        const teamName = `${team === null || team === void 0 ? void 0 : team.teamName}`;
        return (team === null || team === void 0 ? void 0 : team.isFavorite) ? `${translate('remove')} ${teamName} ${translate('team')} ${translate('from')} ${translate('favorites')}` : `${translate('add')} ${teamName} ${translate('team')} ${translate('to')} ${translate('favorites')}`;
    };
    return (_jsx(Box, Object.assign({ sx: directoryStyles.directoryItem, onClick: openPopover, "data-testid": "team-container", tabIndex: 0, onKeyDown: (e) => {
            if (e.key === 'Enter') {
                openPopover();
            }
        } }, { children: _jsxs(Box, { children: [_jsxs(Box, Object.assign({ sx: directoryStyles.favContainer }, { children: [_jsx(CcfTeamIcon, {}), _jsx(CcfTypography, Object.assign({ sx: teamListStyles.headerText, title: `${team === null || team === void 0 ? void 0 : team.teamName}` }, { children: team.teamName })), !(agentProfileSettings === null || agentProfileSettings === void 0 ? void 0 : agentProfileSettings.hideDirectoryFavorites) && isFavoritesFTEnabled && _jsx(CcfTooltip, Object.assign({ title: translate('favorites'), arrow: true }, { children: _jsx("div", Object.assign({ role: 'presentation', "aria-hidden": 'true' }, { children: _jsx(CCfToggleIconButton, { sx: [directoryStyles.hoverDisabledButton, directoryStyles.focussedElement], icon: _jsx(CcfFavouriteIcon, { id: 'dirTeamFavoriteIcon', htmlColor: (_a = theme.palette.digitalStatus) === null || _a === void 0 ? void 0 : _a.openDark }), isToggled: team === null || team === void 0 ? void 0 : team.isFavorite, disableRipple: true, disableFocusRipple: true, disableTouchRipple: true, size: fontSizes.small, toggleIcon: _jsx(CcfUnfavoredIcon, { id: 'dirTeamToggleFavoriteIcon' }), onClick: () => toggleFavorite(team), tabIndex: 0, "data-testid": "favorite-toggle", onKeyDown: (e) => { if (e.key === 'Enter')
                                        toggleFavorite(team); }, "aria-label": narrationForFavorite() }) })) }))] })), _jsxs(CcfTypography, Object.assign({ variant: "h6", sx: directoryStyles.memberCountTag }, { children: [team.agentCount || 0, " ", translate('members')] }))] }) })));
};
export default CcfDirectoryTeams;
//# sourceMappingURL=ccf-team-list.js.map