import { __awaiter } from "tslib";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { CcfHeader, CcfLoader, CcfSearchIcon, useTranslator } from '@nice-devone/ui-controls';
import { Box, useTheme } from '@mui/material';
import fullViewDigitalSearch from './ccf-digital-search-full-view-container-styles';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSelectedMenuName } from '../../global.app.slice';
import { Navigation } from '../../../enums/navigation-menus';
import { getAllowedSearchTabsList } from './ccf-digital-search.slice';
import { getAgentProfileSettings } from '../../ccf-agent-setting/ccf-agent-setting-slice';
/**
 * Component for ccf full view Digital Search
 * @example - <CcfDigitalSearchFullViewContainer />
 * @returns
 */
export function CcfDigitalSearchFullViewContainer() {
    const theme = useTheme();
    const [translate] = useTranslator();
    const styles = fullViewDigitalSearch(theme);
    const dispatch = useDispatch();
    const [DigitalSearch, setDigitalSearch] = useState(_jsx(Box, Object.assign({ display: "flex", justifyContent: "center", alignItems: "center", height: '70%' }, { children: _jsx(CcfLoader, { showLoadingText: false, isPrimary: true }) })));
    const selectedMenu = useSelector(getSelectedMenuName);
    const agentProfileSettings = useSelector(getAgentProfileSettings);
    //load when click on left nav item
    useEffect(() => {
        if (selectedMenu === Navigation.SEARCH && !(agentProfileSettings === null || agentProfileSettings === void 0 ? void 0 : agentProfileSettings.hideSearch)) {
            /**
           * Renders the interaction search component asynchronously.
           * Sets allowed tabs before tabs mount.
           * @example renderInteractionSearch()
           */
            const renderInteractionSearch = () => __awaiter(this, void 0, void 0, function* () {
                // setting allowed tabs and activeTab before tabs mount
                dispatch(getAllowedSearchTabsList());
                const interactionSearch = yield import('../ccf-digital-search/ccf-digital-search');
                const InteractionSearchComponent = interactionSearch.CcfDigitalSearch;
                setDigitalSearch(_jsx(InteractionSearchComponent, { isAppSpace: false }));
            });
            renderInteractionSearch();
        }
    }, [selectedMenu, agentProfileSettings === null || agentProfileSettings === void 0 ? void 0 : agentProfileSettings.hideSearch]);
    return (_jsxs(Box, Object.assign({ component: "section", sx: styles.fullViewSearch }, { children: [_jsx(Box, Object.assign({ sx: styles.digitalSearchHeader }, { children: _jsx(CcfHeader, { LeftIcon: _jsx(CcfSearchIcon, { color: 'secondary', viewBox: '-2 -2 23 23', fontSize: 'small' }), headerText: translate('search') }) })), _jsx(Box, Object.assign({ sx: styles.digitalSearchHeaderPadding }, { children: DigitalSearch }))] })));
}
export default CcfDigitalSearchFullViewContainer;
//# sourceMappingURL=ccf-digital-search-full-view-container.js.map