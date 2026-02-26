import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// noinspection ES6PreferShortImport
import { useTheme } from '@mui/material/styles';
import { CcfBox } from '@nice-devone/ui-controls';
import { shallowEqual, useSelector } from 'react-redux';
import { CcfDigitalSearchInput } from '../../ccf-app-space/ccf-digital-search/ccf-digital-search-input/ccf-digital-search-input';
import { CcfInteractionResetAndRefreshBar } from '../../ccf-app-space/ccf-digital-search/ccf-interaction-search-reset-and-refresh/ccf-interaction-search-reset-and-refresh';
import { getFlexDirectionStyle } from '../../ccf-app-space/ccf-digital-search/ccf-digital-search-utility';
import { getAppspaceResolution } from '../../ccf-app-space/ccf-app-space.slice';
import { getQuery } from '../../ccf-app-space/ccf-digital-search/ccf-digital-search.slice';
import { useCallback, useEffect, useState } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import CcfDigitalSearchStyle from '../../ccf-app-space/ccf-digital-search/ccf-digital-search-styles';
import LvRemoteEcc from '../lv-remote/lv-remote-ecc/lv-remote-ecc';
import { DATA_TEST_ID } from '../lv-app-space-utility';
export const dataTestId = `${DATA_TEST_ID}-search-customers`;
/**
 * Wrapper for Customer Card that displays the customer list + same CXone search buttons
 * ref:
 * - libs/react/ui-components/src/lib/ccf-app-space/ccf-digital-search/ccf-interaction-tabs/ccf-search-customers/ccf-search-customers.tsx:51
 * @example
 * ```
 * <LvSearchCustomers />
 * ```
 */
export function LvSearchCustomers() {
    const theme = useTheme();
    const isSmView = useMediaQuery(theme.breakpoints.down('xl'));
    const ccfDigitalSearchInputQuery = useSelector(getQuery, shallowEqual);
    const appSpaceResolution = useSelector(getAppspaceResolution);
    const [searchCriteria, setSearchCriteria] = useState();
    const [customerId, setCustomerId] = useState();
    const [shouldRefresh, setShouldRefresh] = useState();
    const styles = CcfDigitalSearchStyle(theme);
    const flexDirectionStyle = getFlexDirectionStyle(isSmView, appSpaceResolution);
    /**
     * Triggered when closing the customer card panel
     * Note: Can't run coverage cause LvCustomer component is mounted tru MF
     */
    /* istanbul ignore next */
    const onClose = useCallback(() => {
        const omniSearch = ccfDigitalSearchInputQuery || undefined;
        setCustomerId(undefined);
        setSearchCriteria(omniSearch ? { omniSearch } : undefined);
    }, [ccfDigitalSearchInputQuery]);
    /**
     * Triggered when selecting a contact record from the search panel result
     * Note: Can't run coverage cause LvCustomer component is mounted tru MF
     * @param record - Contact Record
     */
    /* istanbul ignore next */
    const onSelect = useCallback((record) => {
        setCustomerId(record === null || record === void 0 ? void 0 : record.account);
        setSearchCriteria(undefined);
    }, []);
    /**
     * Triggered when a search in performed
     * Note: Can't run coverage cause LvCustomer component is mounted tru MF
     * @param searchCriteria - LV Customer Search Criteria
     */
    /* istanbul ignore next */
    const onSearch = useCallback((searchCriteria) => {
        setSearchCriteria((prevValue) => {
            if (prevValue)
                prevValue.omniSearch = searchCriteria === null || searchCriteria === void 0 ? void 0 : searchCriteria.omniSearch;
            return prevValue;
        });
    }, []);
    /**
     * Refresh Customer List
     * Note: Can't run coverage cause LvCustomer component is mounted tru MF
     * @param searchCriteria - LV Customer Search Criteria
     */
    /* istanbul ignore next */
    const onRefresh = useCallback(() => setShouldRefresh(prevState => !prevState), []);
    /**
     * Reset Customer List, when no ccfDigitalSearchInputQuery refreshes the list
     * Note: Can't run coverage cause LvCustomer component is mounted tru MF
     * @param searchCriteria - LV Customer Search Criteria
     */
    /* istanbul ignore next */
    const onReset = useCallback(() => {
        if (!ccfDigitalSearchInputQuery)
            onRefresh();
    }, [onRefresh, ccfDigitalSearchInputQuery]);
    /**
     * Loads the query from ccfDigitalSearchInputQuery into the LVSearchCriteria,
     * make sure to call checkAndClearActiveCustomer
     */
    useEffect(() => {
        const omniSearch = ccfDigitalSearchInputQuery || undefined;
        setCustomerId(undefined);
        setSearchCriteria(omniSearch ? { omniSearch } : undefined);
    }, [ccfDigitalSearchInputQuery]);
    return (_jsxs(CcfBox, Object.assign({ "data-testid": dataTestId, sx: {
            display: 'flex',
            flexDirection: 'column',
            height: 1,
        } }, { children: [customerId ? null : (_jsx(CcfBox, Object.assign({ sx: styles.gridBackground }, { children: _jsxs(CcfBox, Object.assign({ sx: Object.assign(Object.assign({}, styles.parentContainer), { flexDirection: flexDirectionStyle, gap: 1 }) }, { children: [_jsx(CcfBox, Object.assign({ sx: styles.buttonsAndSearchBox }, { children: _jsx(CcfDigitalSearchInput, {}) })), _jsx(CcfInteractionResetAndRefreshBar, { onRefresh: onRefresh, onReset: onReset })] })) }))), _jsx(CcfBox, Object.assign({ sx: { display: 'flex', flex: 1, position: 'relative' } }, { children: _jsx(CcfBox, Object.assign({ sx: { display: 'flex', flex: 1, position: 'absolute', width: 1, height: 1 } }, { children: _jsx(LvRemoteEcc, { allowCreate: true, allowSearch: true, customerId: customerId, onClose: onClose, onCreated: onSelect, onSearch: onSearch, onSelect: onSelect, searchCriteria: searchCriteria, shouldRefresh: shouldRefresh }) })) }))] })));
}
export default LvSearchCustomers;
//# sourceMappingURL=lv-search-customers.js.map