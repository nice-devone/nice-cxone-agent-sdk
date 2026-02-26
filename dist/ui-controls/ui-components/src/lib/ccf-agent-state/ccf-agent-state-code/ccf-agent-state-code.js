import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { CcfAvailableIcon, CcfFavouriteIcon, CcfIconButton, CcfListItemIcon, CcfListItemSecondaryAction, CcfListItemText, CcfUnavailableIcon, useTranslator, CcfTypography, CcfAppToastMessage, CcfUnfavoredIcon, CcfListItemButton, CcfListItem, CcfTooltip } from '@nice-devone/ui-controls';
import { AgentStates, FeatureToggleService } from '@nice-devone/agent-sdk';
import { agentStateActions, queueFavStatesUpdate, getFavoritesStatesToastReference } from '../ccf-agent-state.slice';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@mui/material';
import { TripOrigin } from '@mui/icons-material';
import agentStateCodeStyles from './ccf-agent-state-code.styles';
import { useRef } from 'react';
import { globalActions } from '../../global.app.slice';
import { LocalStorageHelper, StorageKeys } from '@nice-devone/core-sdk';
import { toast } from 'react-toastify';
import { getFavoritesToastReference } from '../../ccf-directory/+state/ccf-directory.slice';
/**
 * Component displays of State code items for favourite and all agent states
 * @param props -CcfAgentStateCodeProps
 * @returns - state code item component
 * @example `<CcfAgentStateCode fav={fav} />`
 */
export function CcfAgentStateCode(props) {
    var _a, _b;
    const theme = useTheme();
    const sxStyles = agentStateCodeStyles(theme);
    const dispatch = useDispatch();
    const [translate] = useTranslator();
    const { updateAgentState, fav } = props;
    const { updateFavourite } = agentStateActions;
    const MAX_FAV_STATES_ALLOWED = 5;
    const favoritesToastReferenceFortState = useSelector(getFavoritesStatesToastReference);
    const favoritesToastReference = useSelector(getFavoritesToastReference);
    const appToastContainer = useRef();
    const isFavoritesFTEnabled = FeatureToggleService.instance.getFeatureToggleSync("release-cxa-favorites-AW-40314" /* FeatureToggles.CXA_FAVORITES_FEATURE_TOGGLE */);
    /**
     * Function to handle icon for status
     * @param status - string
     * @example handleIconForStatus()
     * @returns
     */
    const handleIconForStatus = (status) => {
        let icon = (_jsx(CcfUnavailableIcon, { id: 'unavailableAgentAvatarId', sx: sxStyles.iconUnavailable }));
        if (status) {
            switch (status.toLowerCase()) {
                case AgentStates.Available.toLowerCase():
                    icon = (_jsx(CcfAvailableIcon, { sx: sxStyles.iconAvailable }));
                    break;
                case AgentStates.Unavailable.toLowerCase():
                    icon = (_jsx(CcfUnavailableIcon, { id: 'unavailableAvatarId', sx: sxStyles.iconUnavailable }));
                    break;
                case AgentStates.Dialer.toLowerCase() || AgentStates.DialerPending.toLowerCase():
                    icon = (_jsx(TripOrigin, { sx: sxStyles.iconDialer }));
                    break;
            }
            ;
        }
        return icon;
    };
    /**
     * Method to update favorite agent states in local storage
     * @param status - agent state
     * @returns - void
     * ```
     * @example
     * updateFavoriteAgentStatesLocalStorage(status);
     * ```
     */
    const updateFavoriteAgentStatesLocalStorage = (status) => {
        if (isFavoritesFTEnabled) {
            dispatch(agentStateActions.clientDataApiFailedForState({ storageExceeded: false, apiFailed: false }));
            const favoriteStates = LocalStorageHelper.getItem(StorageKeys.CXA_FAV_AGENT_STATES, true) || [];
            const stateId = status === null || status === void 0 ? void 0 : status.reason;
            const isAlreadyFavorite = favoriteStates.map((state) => state.toLowerCase()).includes(stateId === null || stateId === void 0 ? void 0 : stateId.toLowerCase());
            if (favoriteStates.length >= MAX_FAV_STATES_ALLOWED && !isAlreadyFavorite) {
                favoritesToastReference && toast.dismiss(favoritesToastReference);
                favoritesToastReferenceFortState && toast.dismiss(favoritesToastReferenceFortState);
                appToastContainer.current = toast.error(_jsx(CcfAppToastMessage, { type: "any", messageKey: 'favsLimitExceeded', extraArgs: { format: [MAX_FAV_STATES_ALLOWED || ''] } }), { autoClose: false, containerId: 'AppToastContainer' });
                dispatch(agentStateActions.updateFavsToastReference(appToastContainer.current));
                return;
            }
            const updatedFavoriteStates = isAlreadyFavorite
                ? favoriteStates.filter((state) => state.toLowerCase() !== stateId.toLowerCase())
                : [...favoriteStates, stateId];
            LocalStorageHelper.setItem(StorageKeys.CXA_FAV_AGENT_STATES, updatedFavoriteStates);
            queueFavStatesUpdate(updatedFavoriteStates, stateId, dispatch);
        }
        else {
            const favoriteStates = LocalStorageHelper.getItem(StorageKeys.FAVORITE_AGENT_STATES, true) || [];
            const updatedFavoriteStates = favoriteStates.includes(status.id)
                ? favoriteStates.filter((state) => state !== status.id)
                : [...favoriteStates, status.id];
            LocalStorageHelper.setItem(StorageKeys.FAVORITE_AGENT_STATES, updatedFavoriteStates);
        }
    };
    /**
     * Function for Add to Favourite
     * @param fav - Status interface
     * @example onFavouriteKeyDown(fav)
     * @returns
    */
    const onFavouriteClickOrKeyDown = (fav, keyDownEvent, clickEvent) => {
        keyDownEvent === null || keyDownEvent === void 0 ? void 0 : keyDownEvent.stopPropagation();
        clickEvent === null || clickEvent === void 0 ? void 0 : clickEvent.stopPropagation();
        updateFavoriteAgentStatesLocalStorage(fav);
        dispatch(updateFavourite(fav));
        const ariaupdatedMessage = `${fav === null || fav === void 0 ? void 0 : fav.reason} ${(fav === null || fav === void 0 ? void 0 : fav.isFavourite) ? 'removed from' : 'added to'} favorites`;
        dispatch(globalActions.setAriaLiveAnnouncer({ ariaMessage: ariaupdatedMessage }));
    };
    /**
    * Function to change string to html
    * @param html- html
    * @example markUP(html)
    * @returns html content
   */
    const markUP = (html) => {
        return { __html: html };
    };
    return (_jsxs(CcfListItem, Object.assign({ sx: [sxStyles.stateCodeItem, sxStyles.stateCodeItemBg, sxStyles === null || sxStyles === void 0 ? void 0 : sxStyles.focussedElement] }, { children: [_jsxs(CcfListItemButton, Object.assign({ dense: true, sx: [sxStyles.stateCodeItem, sxStyles.stateCodeItemBg, sxStyles === null || sxStyles === void 0 ? void 0 : sxStyles.focussedElement], onClick: () => updateAgentState(fav), "data-testid": "agent-state-item", tabIndex: 0 }, { children: [_jsxs(CcfListItemIcon, Object.assign({ tabIndex: -1, sx: sxStyles.codeStatusIcon }, { children: [" ", handleIconForStatus(fav.state), " "] })), _jsx(CcfListItemText, { role: "button", "aria-label": fav.displayText ? fav.displayText : fav.reason, disableTypography: true, sx: sxStyles.stateTextWrapper, primary: _jsx(CcfTypography, { dangerouslySetInnerHTML: markUP(fav.displayText ? fav.displayText : fav.reason), sx: [sxStyles.listText, sxStyles.listTextColor] }) })] })), _jsx(CcfListItemSecondaryAction, Object.assign({ tabIndex: -1, sx: sxStyles.toggleFavAction }, { children: _jsx(CcfTooltip, Object.assign({ title: fav.isFavourite ? translate('removeFavorite') : translate('addFavorite'), disableInteractive: true, arrow: true }, { children: _jsx("span", { children: _jsx(CcfIconButton, Object.assign({ "data-testid": "favorite-button", sx: [sxStyles === null || sxStyles === void 0 ? void 0 : sxStyles.textButton, sxStyles === null || sxStyles === void 0 ? void 0 : sxStyles.focussedElement], edge: "end", "aria-label": fav.isFavourite ? translate('favortie') : translate('notFavorite'), onClick: (e) => { e.preventDefault(); e.stopPropagation(); onFavouriteClickOrKeyDown(fav, null, e); }, disableRipple: true }, { children: fav.isFavourite
                                ? _jsx(CcfFavouriteIcon, { htmlColor: (_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.digitalStatus) === null || _b === void 0 ? void 0 : _b.openDark, id: "favoriteIconAgentState", "aria-label": translate('favortie') })
                                : _jsx(CcfUnfavoredIcon, { id: 'unfavored-status', "aria-label": translate('notFavorite') }) })) }) })) }))] })));
}
export default CcfAgentStateCode;
//# sourceMappingURL=ccf-agent-state-code.js.map