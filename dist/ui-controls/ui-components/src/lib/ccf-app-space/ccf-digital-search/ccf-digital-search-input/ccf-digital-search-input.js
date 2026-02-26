import { jsx as _jsx } from "react/jsx-runtime";
import { useTranslator, CcfInputMenu, } from '@nice-devone/ui-controls';
import { Box, useTheme, } from '@mui/material';
import CcfDigitalSearchStyle from '../ccf-digital-search-styles';
import { ccfDigitalSearchActions, getSearchText, DIGITAL_SEARCH, getCcfDigitalSearch, getInputOptions, getActiveSearchTab, } from '../ccf-digital-search.slice';
import { useDispatch, useSelector } from 'react-redux';
import { LocalStorageHelper } from '@nice-devone/core-sdk';
import { useState } from 'react';
/**
 * Used to handle key Down event
 * @param searchText - input search field value
 * @param activeTab - current active tab
 * @example setSearchTextInLS(searchText)
 */
export const setSearchTextInLS = (searchText, activeTab) => {
    const digitalSearchLS = LocalStorageHelper.getItem(DIGITAL_SEARCH, true);
    LocalStorageHelper.setItem(DIGITAL_SEARCH, Object.assign(Object.assign({}, digitalSearchLS), { [activeTab]: Object.assign(Object.assign({}, digitalSearchLS[activeTab]), { searchText: searchText }) }));
};
/**
   * CcfDigitalSearchInput - to display search component
   * @example - `<CcfDigitalSearchInput />`
   */
export const CcfDigitalSearchInput = () => {
    const theme = useTheme();
    const [translate] = useTranslator();
    const styles = CcfDigitalSearchStyle(theme);
    const searchText = useSelector(getSearchText);
    const dispatch = useDispatch();
    const options = useSelector(getInputOptions) || [];
    const activeTab = useSelector(getActiveSearchTab);
    const [cursorPosition, setCursorPosition] = useState((searchText === null || searchText === void 0 ? void 0 : searchText.length) || 0);
    /**Used to handle onchange event of search input ans then update the search text value in store and localStorage
     * @param value - input search field value
     * @example
     * ```
     * setSearchText(event.target.value)
     * ```
     */
    const setSearchText = (value) => {
        dispatch(ccfDigitalSearchActions.updateSearchText(value)); // this will store the search text value in store so that if sorting or page is applied then the search can be done with the help of input text if present
        setSearchTextInLS(value, activeTab);
    };
    /**
     * Method used to handle clear search button click event
     * @example -
     * ```
     * clearSearchText()
     * ```
     */
    const clearSearchText = () => {
        dispatch(ccfDigitalSearchActions.updateSearchText(''));
        setSearchTextInLS('', activeTab);
        dispatch(getCcfDigitalSearch({ freshData: true })); // this will fetch the new data after clearing search text
    };
    /**
     * Used to handle key Down event
     * @example handleKeyDown()
     */
    const handleKeyDown = () => {
        // on Enter key press will store the input search text in localstorage and will fetch the record
        setSearchTextInLS(searchText, activeTab);
        dispatch(getCcfDigitalSearch({ searchParams: searchText ? { query: `caseId=${searchText}` } : {}, freshData: true })); // this will fetch the new data as the input search text is entered
    };
    /**
     * Handles selection of an option from the dropdown.
     * @param option - The selected option.
     * @param cursorPosition - The cursor position of the input field.
     * * @example
     * ```
     * <CcfInputMenu
         ...
          handleOptionSelection={handleSelectOption}
        />
     *
     * ```
     */
    const handleSelectOption = (option, cursorPosition) => {
        if (!searchText.length) {
            setSearchText(option);
            setCursorPosition(option.length + 1);
            return;
        }
        const searchTextBefore = searchText.slice(0, cursorPosition).trim();
        const searchTextAfter = searchText.slice(cursorPosition).trim();
        const space = searchTextAfter.length ? ' ' : '';
        setSearchText(`${searchTextBefore} ${option}${space}${searchTextAfter}`);
        setCursorPosition(cursorPosition + option.length + 1);
    };
    return (_jsx(Box, Object.assign({ sx: styles.searchBox }, { children: _jsx(CcfInputMenu, { options: options, inputStyles: styles.searchInput, inputValue: searchText, handleInputChange: setSearchText, handleOptionSelection: handleSelectOption, handleInputClear: clearSearchText, handleEnter: handleKeyDown, inputLabel: translate('search'), cursorPosition: cursorPosition, closeOnClear: true }) })));
};
//# sourceMappingURL=ccf-digital-search-input.js.map