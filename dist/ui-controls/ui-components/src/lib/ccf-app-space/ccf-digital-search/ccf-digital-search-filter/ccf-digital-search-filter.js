import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, useTheme } from '@mui/material';
import { useTranslator, CcfDropdownOptions, SelectAllField } from '@nice-devone/ui-controls';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DIGITAL_SEARCH, ccfDigitalSearchActions, getDefaultFilterValues, getCcfDigitalSearch, initialDefaultFilterValues, getActiveSearchTab, DIGITAL_SEARCH_FILTERS, SEARCH_TABS_LABEL, updateClientDataWithSearchAppSettings } from '../ccf-digital-search.slice';
import dayjs from 'dayjs';
import CcfDigitalSearchFilterStyle from './ccf-digital-search-filter-styles';
import { LocalStorageHelper } from '@nice-devone/core-sdk';
import { getApplicationLocale } from '../../../global.app.slice';
export const selectAllMenuItem = {
    id: SelectAllField.ID,
    name: SelectAllField.NAME,
};
const today = new Date();
/** Component to render Interaction Search Filters
 * @example CcfDigitalSearchFilter()
 */
export const CcfDigitalSearchFilter = (props) => {
    const { filterOptions, MultiSelectPaginationDropdown } = props;
    const dispatch = useDispatch();
    const theme = useTheme();
    const styles = CcfDigitalSearchFilterStyle(theme);
    const [translate] = useTranslator();
    const dropdownOption = useSelector(getDefaultFilterValues);
    const [downArrowForEndDate, setDownArrowForEndDate] = useState(false);
    const [upArrowForStartDate, setUpArrowForStartDate] = useState(false);
    const initialDateValues = { startDate: (dropdownOption.from && typeof dropdownOption.from === 'string') ? dayjs(dropdownOption.from, 'YYYY-MM-DD') : null, endDate: (dropdownOption.to && typeof dropdownOption.to === 'string') ? dayjs(dropdownOption.to, 'YYYY-MM-DD') : null };
    const [upArrowForEndDate, setUpArrowForEndDate] = useState(false);
    const [dateTime, setDateTime] = useState(initialDateValues);
    const locale = useSelector(getApplicationLocale);
    const activeTab = useSelector(getActiveSearchTab);
    useEffect(() => {
        if (dateTime.startDate) {
            setStartDateValidation(dateTime.startDate);
        }
        if (dateTime.endDate) {
            setEndDateValidation(dateTime.startDate, dateTime.endDate);
        }
    }, [dateTime.endDate, dateTime.startDate]);
    /** function to select item from dropdown and update their values in redux according to fieldname
     * @param filterValues - to be updated in redux store
     * @param fieldName - according to fieldName we are updating the values in redux
   * @example onMenuItemClick(data, fieldName)
   */
    const onMenuItemClickHandler = (filterValues, fieldName) => {
        dispatch(ccfDigitalSearchActions.updateFilterValues({ fieldName, filterValues }));
    };
    /**
     * Used to validate whether to disable up arrow or down arrow
     *
     * @param startDate - start date selected by user
     * @param endDate- end date selected by user
     * @example - setEndDateValidation(startDate,endDate)
     */
    const setEndDateValidation = (startDate, endDate) => {
        if (startDate) {
            const differenceFromEndDate = Math.floor(endDate.diff(startDate, 'day', true));
            setDownArrowForEndDate(differenceFromEndDate === 0);
            setUpArrowForStartDate(differenceFromEndDate === 0);
        }
        const diffBtwnTodayEndDate = Math.floor(dayjs(new Date()).diff(endDate, 'day', true));
        setUpArrowForEndDate(diffBtwnTodayEndDate <= 0);
    };
    /**
     * Used to validate whether to disable up arrow for start date
     *
     * @param startDate - start date selected by user
     * @example - setStartDateValidation(startDate)
     */
    const setStartDateValidation = (startDate) => {
        const differenceFromStartDate = Math.floor(dayjs(new Date()).diff(startDate, 'day', true));
        setUpArrowForStartDate(differenceFromStartDate <= 0);
    };
    /**
     * Used to validate the start date and end date
     *
     * @example - validateDate(event,type)
     */
    const validateDate = (event, type) => {
        setDateTime((prevDateTime) => (Object.assign(Object.assign({}, prevDateTime), { [type]: event })));
        onMenuItemClickHandler(event ? dayjs(event).format('YYYY-MM-DD') : '', type === 'startDate' ? 'from' : 'to');
    };
    /**
     * Used to apply all selected filters on click of apply button
     *
     * @example - applyClickHandler()
     */
    const applyClickHandler = () => {
        //if the active tab is threads, adding withContext as part of search params as it is mandatory for threads query.
        dispatch(getCcfDigitalSearch({ searchParams: Object.assign(Object.assign({}, dropdownOption), (activeTab === SEARCH_TABS_LABEL.THREADS) ? { withContext: 1 } : {}), freshData: true }));
        dispatch(ccfDigitalSearchActions.updateFiltersMenuElement(null));
        const isFilterSelected = getIsFilterSelected(dropdownOption);
        dispatch(ccfDigitalSearchActions.updateIsFilterSelected(isFilterSelected));
        const digitalSearchLS = LocalStorageHelper.getItem(DIGITAL_SEARCH, true);
        // to store filter values in local storage after reordering
        setCurrentFiltersInLS(digitalSearchLS, dropdownOption, isFilterSelected);
        dispatch(updateClientDataWithSearchAppSettings({ activeTab: SEARCH_TABS_LABEL.INTERACTIONS, tabSettings: { filterValues: dropdownOption, isFilterSelected } }));
    };
    /**
     * Used to check filter is selected or not
     * @param selectedFilters - selected filters
     * @returns - true/ false
     * @example -
     * ```
     * getIsFilterSelected(selectedFilters)
     *
     * ```
     */
    const getIsFilterSelected = (selectedFilters) => {
        let isFilterSelected = false;
        const searchFilters = Object.values(DIGITAL_SEARCH_FILTERS);
        for (const [filterName, filterOptions] of Object.entries(selectedFilters)) {
            if (searchFilters.includes(filterName)) {
                // If the filter value is not empty and the type is an array, then will rely with its length. Otherwise, if it is not 'false', then it is selected.
                if (filterOptions && (Array.isArray(filterOptions) ? filterOptions.length > 0 : (filterOptions !== 'false'))) {
                    isFilterSelected = true;
                    break;
                }
            }
        }
        return isFilterSelected;
    };
    /**
     * Used to clear all selected filters on click of clear button
     *
     * @example - clearClickHandler()
     */
    const clearClickHandler = () => {
        var _a, _b, _c;
        setUpArrowForEndDate(false);
        setDownArrowForEndDate(false);
        setUpArrowForStartDate(false);
        validateDate(null, 'startDate');
        validateDate(null, 'endDate');
        dispatch(ccfDigitalSearchActions.clearFilterValues());
        dispatch(ccfDigitalSearchActions.updateIsFilterSelected(false));
        const digitalSearchLS = LocalStorageHelper.getItem(DIGITAL_SEARCH, true);
        if (((_a = digitalSearchLS[activeTab]) === null || _a === void 0 ? void 0 : _a.currentFilterValues) && ((_c = Object.values((_b = digitalSearchLS[activeTab]) === null || _b === void 0 ? void 0 : _b.currentFilterValues)) === null || _c === void 0 ? void 0 : _c.some((item) => item !== ''))) {
            dispatch(getCcfDigitalSearch({ searchParams: (activeTab === SEARCH_TABS_LABEL.THREADS) ? { withContext: 1 } : {}, freshData: true }));
        }
        // to clear the values stored in local storage when we click on clear
        setCurrentFiltersInLS(digitalSearchLS, initialDefaultFilterValues[activeTab], false);
        dispatch(updateClientDataWithSearchAppSettings({
            activeTab: SEARCH_TABS_LABEL.INTERACTIONS,
            tabSettings: { filterValues: initialDefaultFilterValues[activeTab] }
        }));
    };
    /**
     * Use to set the current filters in local storage
     * @param digitalSearchLS -digital search object from local storage
     * @param currentFilterValues -current filter object
     * @param isFilterSelected -boolean value to set isFilterSelected
     * @example setCurrentFiltersInLS(digitalSearchLS, currentFilterValues, isFilterSelected)
     */
    const setCurrentFiltersInLS = (digitalSearchLS, currentFilterValues, isFilterSelected) => {
        LocalStorageHelper.setItem(DIGITAL_SEARCH, Object.assign(Object.assign({}, digitalSearchLS), { [activeTab]: Object.assign(Object.assign({}, digitalSearchLS[activeTab]), { currentFilterValues,
                isFilterSelected }) }));
    };
    /**
     * Used to handle close Icon click
     *
     * @example - closeIconClickHandler()
     */
    const closeIconClickHandler = () => {
        var _a, _b;
        const digitalSearchLS = LocalStorageHelper.getItem(DIGITAL_SEARCH, true);
        if (!((_a = digitalSearchLS[activeTab]) === null || _a === void 0 ? void 0 : _a.currentFilterValues) || Object.values((_b = digitalSearchLS[activeTab]) === null || _b === void 0 ? void 0 : _b.currentFilterValues).every(item => item === '')) {
            dispatch(ccfDigitalSearchActions.clearFilterValues());
        }
        dispatch(ccfDigitalSearchActions.updateFiltersMenuElement(null));
    };
    /**
     * function to get filter data array
     * @example getFilterData()
     */
    const getFilterData = () => {
        return filterOptions;
    };
    return _jsxs(_Fragment, { children: [" ", _jsx(Box, Object.assign({ sx: styles.dropdownBox }, { children: _jsx(CcfDropdownOptions, { placeholder: translate('select'), dropdownItems: getFilterData(), dropdownTextStyles: styles.dropdownLabels, listSubheaderTitle: translate('filterOptions'), listSubheaderStyles: styles.filtersText, menuItemStyles: styles.filterMenuItem, onCloseIconClick: closeIconClickHandler, MultiSelectPaginationDropdown: MultiSelectPaginationDropdown, buttons: [
                        {
                            title: translate('clear'),
                            styles: styles.button,
                            onClickHandler: clearClickHandler,
                        },
                        {
                            title: translate('apply'),
                            styles: styles.applyButton,
                            onClickHandler: applyClickHandler,
                        }
                    ], datePicker: [
                        {
                            label: translate('startDate'),
                            maxDate: dateTime.endDate ? dayjs(dateTime.endDate) : dayjs(today),
                            onDateSelect: validateDate,
                            disableUpArrow: upArrowForStartDate,
                            value: dateTime.startDate,
                            fieldName: 'startDate',
                            dateLabelStyles: { fontWeight: 400 },
                            locale: locale,
                        },
                        {
                            label: translate('endDate'),
                            minDate: dateTime.startDate ? dayjs(dateTime.startDate) : undefined,
                            maxDate: dayjs(today),
                            onDateSelect: validateDate,
                            disableDownArrow: downArrowForEndDate,
                            disableUpArrow: upArrowForEndDate,
                            value: dateTime.endDate,
                            fieldName: 'endDate',
                            dateLabelStyles: { fontWeight: 400 },
                            locale: locale,
                        }
                    ] }) }))] });
};
//# sourceMappingURL=ccf-digital-search-filter.js.map