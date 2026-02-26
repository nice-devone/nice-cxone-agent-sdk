import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useCallback, useState } from 'react';
import { CcfTypography } from '@nice-devone/ui-controls';
import { Box, useTheme } from '@mui/material';
import customerCardTitleStyles from '../ccf-customer-card-search.styles';
import CcfCustomerCardSearchResult from './ccf-customer-card-search-result';
import { customerCardList, isCustomerDataLoading, loadMoreData, scrollToken, searchCustomerCard } from '../../ccf-customer-card.slice';
import { useDispatch, useSelector } from 'react-redux';
/**
 * CcfCustomerCardSearchResults - used to display the search textfield along with results
 * @param props -?-CcfCustomerCardProps
 * @example <CcfCustomerCardSearchResults />
 */
export function CcfCustomerCardSearchResults(props) {
    const theme = useTheme();
    const styles = customerCardTitleStyles(theme);
    const getCustomerList = useSelector(customerCardList);
    const [callOnScrollEvent, setCallOnScrollEvent] = useState(false);
    const dispatch = useDispatch();
    const customerListLoading = useSelector(isCustomerDataLoading);
    const loadDataOnScroll = useSelector(loadMoreData);
    const customerResultScrollToken = useSelector(scrollToken);
    /**
     * Function to update call type
     * @param trigger - boolean
     * @example - handlePageScroll()
     */
    const handlePageScroll = useCallback((e) => {
        const scrollElement = e.target;
        const bottom = (scrollElement.scrollHeight - scrollElement.clientHeight <= scrollElement.scrollTop + 1) || (e === null || e === void 0 ? void 0 : e.bottom);
        if (!callOnScrollEvent && bottom && props.customerName.length > 2 && loadDataOnScroll) {
            setCallOnScrollEvent(true);
            dispatch(searchCustomerCard({ customerName: props.customerName, scrollToken: customerResultScrollToken, externalIds: props.externalIdsToExclude }));
        }
        setTimeout(() => {
            setCallOnScrollEvent(false);
        }, 100);
    }, [dispatch, callOnScrollEvent, props.customerName, loadDataOnScroll, customerResultScrollToken]);
    return (_jsxs(Box, Object.assign({ "data-testid": 'search-result', sx: customerListLoading ? [styles.customerCardContainer, styles.loaderContainer] : styles.customerCardContainer, onScroll: (e) => { handlePageScroll(e); } }, { children: [getCustomerList.length > 0 && getCustomerList.map((customer) => (_jsx(CcfCustomerCardSearchResult, { customer: customer, returnToMainScreen: props.returnToMainScreen }, customer === null || customer === void 0 ? void 0 : customer.id))), !customerListLoading && getCustomerList.length === 0 && props.customerName !== '' &&
                _jsx(Box, Object.assign({ textAlign: "center", mt: 3, width: "100%" }, { children: _jsx(CcfTypography, { translationKey: "noMatchesFound", "data-testid": 'no-result' }) }))] })));
}
export default CcfCustomerCardSearchResults;
//# sourceMappingURL=ccf-customer-card-search-results.js.map