import { jsx as _jsx } from "react/jsx-runtime";
import { useTheme, FormControl, MenuItem, Select, Box } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Color, useTranslator } from '@nice-devone/ui-controls';
import CcfSearchTabstyles from './ccf-search-tabs-styles';
import { ccfDigitalSearchActions, getActiveSearchTab, getAllowedSearchTabs, } from '../ccf-digital-search.slice';
/**
 * Component that displays Tabs in Interaction Search
 * @returns Tabs for Interaction Search
 * ```
 * @example
 * <CcfSearchTabs/>
 * ```
 */
export const CcfSearchTabs = () => {
    const theme = useTheme();
    const [translate] = useTranslator();
    const styles = CcfSearchTabstyles(theme);
    const dispatch = useDispatch();
    const selectedTab = useSelector(getActiveSearchTab);
    const allowedTabs = useSelector(getAllowedSearchTabs);
    const parentRef = useRef(null);
    const [isDropdownView, setIsDropdownView] = useState(false);
    const tabsRef = useRef([]);
    useEffect(() => {
        var _a;
        const parentElement = parentRef.current;
        const resizeObserver = handleResize();
        (_a = tabsRef === null || tabsRef === void 0 ? void 0 : tabsRef.current[0]) === null || _a === void 0 ? void 0 : _a.focus();
        if (parentElement) {
            resizeObserver.observe(parentElement);
        }
        return () => {
            resizeObserver.disconnect();
        };
    }, []);
    const handleKeyPress = useCallback((event) => {
        if (event.ctrlKey && event.altKey) {
            const currentIndex = allowedTabs.indexOf(selectedTab);
            switch (event.code) {
                case 'ArrowRight':
                    event.preventDefault();
                    if (currentIndex === ((allowedTabs === null || allowedTabs === void 0 ? void 0 : allowedTabs.length) - 1)) {
                        dispatch(ccfDigitalSearchActions.updateActiveSearchTab(allowedTabs[0]));
                    }
                    else {
                        dispatch(ccfDigitalSearchActions.updateActiveSearchTab(allowedTabs[currentIndex + 1]));
                    }
                    break;
                case 'ArrowLeft':
                    event.preventDefault();
                    if (currentIndex === 0) {
                        dispatch(ccfDigitalSearchActions.updateActiveSearchTab(allowedTabs[(allowedTabs === null || allowedTabs === void 0 ? void 0 : allowedTabs.length) - 1]));
                    }
                    else {
                        dispatch(ccfDigitalSearchActions.updateActiveSearchTab(allowedTabs[currentIndex - 1]));
                    }
                    break;
            }
        }
    }, [allowedTabs, selectedTab]);
    useEffect(() => {
        document.addEventListener('keydown', handleKeyPress);
        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, [handleKeyPress]);
    /**
     * Method to check if all tabs fit in the available space.
     * @example - handleResize()
     */
    const handleResize = () => {
        var _a;
        let totalOffsetWidth;
        if (((_a = tabsRef.current) === null || _a === void 0 ? void 0 : _a.length) > 0) {
            totalOffsetWidth = tabsRef.current.reduce((accumulator, tabRef) => {
                return tabRef ? accumulator + tabRef.offsetWidth : accumulator;
            }, 0);
        }
        return new ResizeObserver((entries) => {
            entries.forEach((entry) => {
                const { width } = entry.contentRect;
                if (width < totalOffsetWidth) {
                    setIsDropdownView(true);
                }
                else {
                    setIsDropdownView(false);
                }
            });
        });
    };
    /**
     * Updating Tab index while clicking on tabs
     * @param newActiveTab - string
     * @example - handleChange('Threads')
     */
    const handleChange = (_event, newActiveTab) => {
        dispatch(ccfDigitalSearchActions.updateActiveSearchTab(newActiveTab));
    };
    return (_jsx(Box, Object.assign({ sx: styles.searchTabsWrapper, ref: parentRef }, { children: selectedTab && isDropdownView ? (_jsx(FormControl, Object.assign({ sx: styles.searchTabsDropdown }, { children: _jsx(Select, Object.assign({ value: selectedTab, onChange: (event) => handleChange(event, event.target.value), label: "CcfSearchTabs", variant: 'standard', IconComponent: KeyboardArrowDownIcon }, { children: allowedTabs === null || allowedTabs === void 0 ? void 0 : allowedTabs.map((tab) => {
                    return _jsx(MenuItem, Object.assign({ value: tab }, { children: translate(tab.toLowerCase()) }), tab);
                }) })) }))) : (_jsx(Tabs, Object.assign({ value: selectedTab, onChange: handleChange, textColor: Color.SECONDARY, indicatorColor: Color.PRIMARY, "aria-label": "CcfSearchTabs" }, { children: allowedTabs === null || allowedTabs === void 0 ? void 0 : allowedTabs.map((tab, index) => {
                return _jsx(Tab, { id: `ccf-search-tab-${tab.toLowerCase()}`, value: tab, label: translate(tab.toLowerCase()), ref: (element) => (tabsRef.current[index] = element), disableRipple: true, "aria-controls": `ccf-search-tab-panel-${tab.toLowerCase()}` }, tab);
            }) }))) })));
};
export default CcfSearchTabs;
//# sourceMappingURL=ccf-search-tabs.js.map