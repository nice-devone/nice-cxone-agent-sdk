import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef } from 'react';
import { Box, Typography, useTheme, } from '@mui/material';
import { useTranslator, withHover, CcfIconButton, CcfTooltip, CCfToggleIconButton, CcfFavouriteIcon, CcfAppToastMessage, CcfUnfavoredIcon, } from '@nice-devone/ui-controls';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { getStateName, getStatusIcon } from '../ccf-directory-utils';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { getCurrentFavsInDirectory, toggleFavoriteForExtDirectoryEntries, getFavoritesToastReference, agentDirectoryActions } from '../+state/ccf-directory.slice';
import ccfDirectoryStyles from '../ccf-directory.styles';
import { FeatureToggleService } from '@nice-devone/agent-sdk';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { getFavoritesStatesToastReference } from '../../ccf-agent-state/ccf-agent-state.slice';
import { getAgentProfileSettings } from '../../ccf-agent-setting/ccf-agent-setting-slice';
/**
 * Component to be used for directory item
 * @param props - Agent
 * @example <CcfDirectoryAgent />
 * @returns
 */
const CcfDirectoryEntries = (props) => {
    var _a;
    const { user, isHovering, isFullView, onMouseEnter, onMouseOut, expandDirectoryEntryDetails } = props;
    const [translate] = useTranslator();
    const theme = useTheme();
    const directoryStyles = ccfDirectoryStyles(theme);
    const dispatch = useDispatch();
    const isFavoritesFTEnabled = FeatureToggleService.instance.getFeatureToggleSync("release-cxa-favorites-AW-40314" /* FeatureToggles.CXA_FAVORITES_FEATURE_TOGGLE */);
    const currentFavsInDirectory = useSelector(getCurrentFavsInDirectory);
    const favoritesToastReference = useSelector(getFavoritesToastReference);
    const favoritesToastReferenceFortState = useSelector(getFavoritesStatesToastReference);
    const appToastContainer = useRef();
    const DIRECTORY_MAX_FAVS_ALLOWED = 25;
    const agentProfileSettings = useSelector(getAgentProfileSettings);
    const styles = {
        displayFlex: 'flex',
        flexDirection: 'row',
        paddingX: 1.5,
        paddingY: 1,
        padding: 1.5,
        boxMaxWidth: '100%',
        alignItemsCenter: 'center',
        justifyContentStart: 'flex-start',
        justifyContentBetween: 'space-between',
    };
    const fontSizes = {
        small: 'small',
        smaller: 'smaller',
    };
    /**
  * Function to toggle favorite for selected external directory entry
  * @example toggleFavorite()
  */
    const toggleFavorite = (user) => {
        var _a;
        const totalFavoritesCount = Object.values(currentFavsInDirectory).reduce((sumOfFavs, favsArray) => sumOfFavs + ((favsArray === null || favsArray === void 0 ? void 0 : favsArray.length) || 0), 0);
        if (totalFavoritesCount >= DIRECTORY_MAX_FAVS_ALLOWED && !((_a = currentFavsInDirectory === null || currentFavsInDirectory === void 0 ? void 0 : currentFavsInDirectory.extDirectoryEntries) === null || _a === void 0 ? void 0 : _a.includes(user === null || user === void 0 ? void 0 : user.userMappingId))) {
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
            dispatch(toggleFavoriteForExtDirectoryEntries({ extDirectoryEntries: [user] }));
        }
    };
    /**
  * Function to narrate favorite option for selected External Directory Entry
  * @example narrationForFavorite()
  */
    const narrationForFavorite = () => {
        const directoryEntryFullName = `${user === null || user === void 0 ? void 0 : user.firstname} ${user === null || user === void 0 ? void 0 : user.lastname}`;
        return (user === null || user === void 0 ? void 0 : user.isFavorite) ? `${translate('remove')} ${directoryEntryFullName} ${translate('externalDirectorylabel')} ${translate('from')} ${translate('favorites')}` : `${translate('add')} ${directoryEntryFullName} ${translate('externalDirectorylabel')} ${translate('to')} ${translate('favorites')}`;
    };
    return (_jsxs(Box, Object.assign({ component: 'li', sx: directoryStyles.externalDirectoryItem, onMouseEnter: onMouseEnter, onMouseLeave: onMouseOut, "data-testid": "with-hover", tabIndex: 0, onClick: () => expandDirectoryEntryDetails(user) }, { children: [_jsxs(Box, Object.assign({ sx: directoryStyles.externalDirectoryUser }, { children: [_jsx(MenuBookIcon, {}), _jsx(Typography, Object.assign({ sx: isFullView
                            ? [directoryStyles.ellipsisWithTooltip, directoryStyles.fullViewText]
                            : [directoryStyles.directoryUserNameLabel, directoryStyles.ellipsisWithTooltip], title: `${user === null || user === void 0 ? void 0 : user.firstname} ${user === null || user === void 0 ? void 0 : user.lastname}` }, { children: `${user === null || user === void 0 ? void 0 : user.firstname} ${user === null || user === void 0 ? void 0 : user.lastname}` })), isFavoritesFTEnabled && !(agentProfileSettings === null || agentProfileSettings === void 0 ? void 0 : agentProfileSettings.hideDirectoryFavorites) && _jsx(CcfTooltip, Object.assign({ title: translate('favorites'), arrow: true }, { children: _jsx("div", Object.assign({ role: 'presentation', "aria-hidden": 'true' }, { children: _jsx(CCfToggleIconButton, { sx: [directoryStyles.hoverDisabledButton, directoryStyles.focussedElement], icon: _jsx(CcfFavouriteIcon, { id: 'dirExtDirFavoriteIcon', htmlColor: (_a = theme.palette.digitalStatus) === null || _a === void 0 ? void 0 : _a.openDark }), isToggled: user === null || user === void 0 ? void 0 : user.isFavorite, disableRipple: true, disableFocusRipple: true, disableTouchRipple: true, size: fontSizes.small, toggleIcon: _jsx(CcfUnfavoredIcon, { id: 'extDirToggleFavoriteIcon' }), onClick: () => toggleFavorite(user), tabIndex: 0, "data-testid": "favorite-toggle", onKeyDown: (e) => { if (e.key === 'Enter')
                                    toggleFavorite(user); }, "aria-label": narrationForFavorite() }) })) })), (user === null || user === void 0 ? void 0 : user.showDrillDownBtn) && isHovering && (_jsx(CcfIconButton, Object.assign({ sx: directoryStyles.hoverDisabledButton }, { children: _jsx(ArrowForwardIosIcon, { sx: directoryStyles.icon }) })))] })), _jsxs(Box, Object.assign({ sx: !isFullView ? directoryStyles.directoryItemUserStatus : directoryStyles.fullDirectoryItemUserStatus }, { children: [_jsxs(Box, Object.assign({ display: styles.displayFlex, alignItems: styles.alignItemsCenter, minHeight: 40, marginBottom: '2px' }, { children: [getStatusIcon(user === null || user === void 0 ? void 0 : user.unifiedStatus, directoryStyles.icon), _jsx(Typography, Object.assign({ noWrap: true, sx: isFullView ? directoryStyles.extDirFullViewSecondoryText : directoryStyles.externalDirectoryText }, { children: getStateName(user === null || user === void 0 ? void 0 : user.unifiedStatus, translate) }))] })), _jsx(Box, Object.assign({ sx: directoryStyles.directoryItemUserStatus }, { children: isHovering && (_jsx(Box, { display: styles.displayFlex, justifyContent: styles.justifyContentStart, flex: "1", ml: 1 })) })), _jsx(Box, { display: styles.displayFlex, marginTop: '0%', width: styles.boxMaxWidth })] }))] })));
};
export default withHover(CcfDirectoryEntries);
//# sourceMappingURL=ccf-directory-entries.js.map