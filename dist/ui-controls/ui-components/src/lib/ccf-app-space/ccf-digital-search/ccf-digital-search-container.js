import { __awaiter } from "tslib";
import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { useDispatch, useSelector } from 'react-redux';
import { CcfAppToastMessage, } from '@nice-devone/ui-controls';
import { toast } from 'react-toastify';
import { ccfDigitalSearchActions, getActiveSearchTab, SEARCH_TABS_LABEL, getDigitalSearchToastObj, } from './ccf-digital-search.slice';
import useComponentDidUpdate from '../../../hooks/useComponentDidUpdate';
import { useEffect, useState } from 'react';
/**
   * CcfDigitalSearchContainer - to display search component
   * @example - `<CcfDigitalSearchContainer />`
   */
export const CcfDigitalSearchContainer = (props) => {
    const dispatch = useDispatch();
    const toastMsg = useSelector(getDigitalSearchToastObj);
    const activeTab = useSelector(getActiveSearchTab);
    const [DigitalSearch, setDigitalSearch] = useState(null);
    useComponentDidUpdate(() => {
        if (toastMsg === null || toastMsg === void 0 ? void 0 : toastMsg.messageKey) {
            const messageComponent = (_jsx(CcfAppToastMessage, { type: toastMsg.isError ? 'error' : 'success', messageKey: toastMsg === null || toastMsg === void 0 ? void 0 : toastMsg.messageKey, extraArgs: { format: [(toastMsg === null || toastMsg === void 0 ? void 0 : toastMsg.placeHolder) || ''] } }));
            const toastOptions = {
                autoClose: 2000,
                containerId: 'AppToastContainer',
                onClose: () => dispatch(ccfDigitalSearchActions.updateDigitalSearchToastObj(undefined)),
            };
            toast[toastMsg.isError ? 'error' : 'success'](messageComponent, toastOptions);
        }
    }, [toastMsg]);
    useEffect(() => {
        renderTabComponent(activeTab);
    }, [activeTab]);
    /**
     * function to render the component based on tab selected
     * @param tabName - selected tab name
     * @example renderTabComponent(tabName)
     */
    const renderTabComponent = (tabName) => {
        switch (tabName) {
            case SEARCH_TABS_LABEL.INTERACTIONS:
                renderSearchInteractions();
                break;
            case SEARCH_TABS_LABEL.MESSAGES:
                renderSearchMessages();
                break;
            case SEARCH_TABS_LABEL.CUSTOMERS:
                renderSearchCustomers();
                break;
            case SEARCH_TABS_LABEL.LV_CUSTOMERS:
                renderLvSearchCustomers();
                break;
            case SEARCH_TABS_LABEL.THREADS:
                renderSearchThreads();
                break;
            default:
                renderPermissionErrorBanner();
        }
    };
    /**
        * lazily loaded the search messages component
        * @example renderSearchMessages()
    */
    const renderSearchMessages = () => __awaiter(void 0, void 0, void 0, function* () {
        setDigitalSearch(null);
        const searchMessages = yield import('../ccf-digital-search/ccf-interaction-tabs/ccf-search-messages/ccf-search-messages');
        const SearchMessages = searchMessages.default;
        setDigitalSearch(_jsx(SearchMessages, {}));
    });
    /**
        * lazily loaded the search interaction component
        * @example renderSearchInteractions()
    */
    const renderSearchInteractions = () => __awaiter(void 0, void 0, void 0, function* () {
        setDigitalSearch(null);
        const searchMessages = yield import('../ccf-digital-search/ccf-interaction-tabs/ccf-search-interactions/ccf-search-interactions');
        const SearchInteractions = searchMessages.CcfSearchInteractions;
        setDigitalSearch(_jsx(SearchInteractions, { isAppSpace: props.isAppSpace }));
    });
    /**
        * lazily loaded the search customers
        * @example renderSearchCustomers()
    */
    const renderSearchCustomers = () => __awaiter(void 0, void 0, void 0, function* () {
        setDigitalSearch(null);
        const searchMessages = yield import('../ccf-digital-search/ccf-interaction-tabs/ccf-search-customers/ccf-search-customers');
        const SearchCustomers = searchMessages.CcfSearchCustomers;
        setDigitalSearch(_jsx(SearchCustomers, {}));
    });
    /**
     * lazily loaded the search customers
     * @example renderSearchCustomers()
     */
    const renderLvSearchCustomers = () => __awaiter(void 0, void 0, void 0, function* () {
        setDigitalSearch(null);
        const lvSearchMessages = yield import('../../lv-app-space/lv-search-customers/lv-search-customers');
        const LvSearchCustomers = lvSearchMessages.LvSearchCustomers;
        setDigitalSearch(_jsx(LvSearchCustomers, {}));
    });
    /**
        * lazily loaded the search threads
        * @example renderSearchThreads()
    */
    const renderSearchThreads = () => __awaiter(void 0, void 0, void 0, function* () {
        setDigitalSearch(null);
        const searchThreads = yield import('../ccf-digital-search/ccf-interaction-tabs/ccf-search-threads/ccf-search-threads');
        const SearchThreads = searchThreads.CcfSearchThreads;
        setDigitalSearch(_jsx(SearchThreads, {}));
    });
    /**
        * lazily loaded the permission error banner
        * @example renderPermissionErrorBanner()
    */
    const renderPermissionErrorBanner = () => __awaiter(void 0, void 0, void 0, function* () {
        setDigitalSearch(null);
        const permissionBanner = yield import('../ccf-digital-search/ccf-interaction-tabs/ccf-permission-error-banner/ccf-permission-error-banner');
        const PermissionErrorBanner = permissionBanner.CcfPermissionErrorBanner;
        setDigitalSearch(_jsx(PermissionErrorBanner, {}));
    });
    return (_jsx(_Fragment, { children: DigitalSearch }));
};
export default CcfDigitalSearchContainer;
//# sourceMappingURL=ccf-digital-search-container.js.map