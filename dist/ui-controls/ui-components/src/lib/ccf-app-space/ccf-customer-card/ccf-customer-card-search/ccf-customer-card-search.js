import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { CcfLoader } from '@nice-devone/ui-controls';
import { Box, useTheme } from '@mui/material';
import customerCardSearchStyles from './ccf-customer-card-search.styles';
import CcfCustomerCardSearchHeader from './ccf-customer-card-search-results/ccf-customer-card-search-header';
import CcfCustomerCardSearchResults from './ccf-customer-card-search-results/ccf-customer-card-search-results';
import { useSelector } from 'react-redux';
import CcfCustomerCardSearchTextfield from './ccf-customer-card-search-results/ccf-customer-card-search-textfield';
import { isCustomerDataLoading } from '../ccf-customer-card.slice';
/**
 * CcfCustomerCardSearch - used to display the search textfield along with results
 * @param props -?-CcfCustomerCardSearchProps
 * @example <CcfCustomerCardSearch />
 */
export function CcfCustomerCardSearch(props) {
    const theme = useTheme();
    const styles = customerCardSearchStyles(theme);
    const customerListLoading = useSelector(isCustomerDataLoading);
    const [searchedText, setSearchedText] = useState('');
    const [searchBoxUpdated, setSearchBoxUpdated] = useState(false);
    /**
     * getSearchedTextOnCallBack - Function to change the search text
     * @param searchValue - value to be searched
     * @example <CcfCustomerCardSearch />
     */
    const getSearchedTextOnCallBack = (searchValue) => {
        setSearchedText(searchValue);
    };
    /**
     * getSearchInputBoxDirtyStatus - Function to check if search text has been changed
     * @param isFieldTouched - to alert that search text has been changed
     * @example <CcfCustomerCardSearch />
     */
    const getSearchInputBoxDirtyStatus = (isFieldTouched) => {
        setSearchBoxUpdated(isFieldTouched);
    };
    return (_jsxs(Box, Object.assign({ bgcolor: "background.light", sx: styles.customerCardWrapper }, { children: [_jsx(CcfCustomerCardSearchTextfield, { isSearchTextUpdated: getSearchInputBoxDirtyStatus, searchedText: getSearchedTextOnCallBack, returnToMainScreen: props.returnToMainScreen, externalIdsToExclude: props.externalIdsToExclude }), _jsx(CcfCustomerCardSearchHeader, { isSearchBoxUpdated: searchBoxUpdated, searchedText: searchedText }), ((!searchBoxUpdated && props.customerName) || (searchBoxUpdated && searchedText.length > 0)) &&
                _jsx(CcfCustomerCardSearchResults, { customerName: searchBoxUpdated ? searchedText : props.customerName, returnToMainScreen: props.returnToMainScreen, externalIdsToExclude: props.externalIdsToExclude }), customerListLoading &&
                _jsx(Box, Object.assign({ textAlign: "center", mt: 3, width: "100%", position: 'absolute', bottom: '30px' }, { children: _jsx(CcfLoader, { showLoadingText: true, isPrimary: true }) }))] })));
}
export default CcfCustomerCardSearch;
//# sourceMappingURL=ccf-customer-card-search.js.map