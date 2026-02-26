import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, useMediaQuery, useTheme } from '@mui/material';
import CcfDigitalSearchContainer from './ccf-digital-search-container';
import CcfSearchTabs from './ccf-interaction-tabs/ccf-search-tabs';
import { useEffect, useRef, useState } from 'react';
import { ccfDigitalSearchActions, fetchSkillList, getActiveSearchTab, getAgentList, getAllChannelList, getAllTags, getAllowedSearchTabs } from './ccf-digital-search.slice';
import { useDispatch, useSelector } from 'react-redux';
import { defaultSearchColumnsCount, getSearchVisibleColumns } from './ccf-digital-search-utility';
import { getAppspaceResolution } from '../ccf-app-space.slice';
/**
   * CcfDigitalSearch - to display search component
   * @example - `<CcfDigitalSearch />`
   */
export function CcfDigitalSearch(props) {
    const searchTabsRef = useRef(null);
    const [searchTabsHeight, setSearchTabsHeight] = useState(0);
    const dispatch = useDispatch();
    const theme = useTheme();
    const isSmView = useMediaQuery(theme.breakpoints.down('xl'));
    const renderTwoColumnDesign = useSelector(getAppspaceResolution);
    const allowedTabs = useSelector(getAllowedSearchTabs);
    const activeTab = useSelector(getActiveSearchTab);
    useEffect(() => {
        var _a;
        setSearchTabsHeight((_a = searchTabsRef === null || searchTabsRef === void 0 ? void 0 : searchTabsRef.current) === null || _a === void 0 ? void 0 : _a.clientHeight); //updating the height of grid depending upon the height of search tabs
    }, [searchTabsRef]);
    // Dev Note: Fetching data for filters here instead of fetching on every tab
    useEffect(() => {
        dispatch(getAgentList());
        dispatch(fetchSkillList());
        dispatch(getAllChannelList());
        dispatch(getAllTags());
        //setting active tab as interactions onComponentUnmount.
        return (() => {
            if ((allowedTabs === null || allowedTabs === void 0 ? void 0 : allowedTabs.length) > 0) {
                dispatch(ccfDigitalSearchActions.updateActiveSearchTab(allowedTabs[0]));
            }
        });
    }, []);
    //Dev Note: Setting number of default visible columns on grid for all tabs based on screen size
    useEffect(() => {
        const defaultColumnCount = getSearchVisibleColumns(isSmView, renderTwoColumnDesign, defaultSearchColumnsCount, activeTab);
        dispatch(ccfDigitalSearchActions.updateDefaultVisibleColumns({
            defaultColumnCount,
        }));
    }, [renderTwoColumnDesign, isSmView]);
    return (_jsxs(_Fragment, { children: [_jsx(Box, Object.assign({ ref: searchTabsRef }, { children: _jsx(CcfSearchTabs, {}) })), _jsx(Box, Object.assign({ sx: { height: `calc(100% - ${searchTabsHeight}px)`, overflow: 'auto' } }, { children: _jsx(CcfDigitalSearchContainer, { isAppSpace: props.isAppSpace }) }))] }));
}
export default CcfDigitalSearch;
//# sourceMappingURL=ccf-digital-search.js.map