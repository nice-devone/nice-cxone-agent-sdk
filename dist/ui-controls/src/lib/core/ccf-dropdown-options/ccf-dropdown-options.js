import { __rest } from "tslib";
import { createElement as _createElement } from "react";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React, { useState, useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import { Box, Button, FormControl, ListSubheader, MenuItem, Select, Typography, useTheme, Checkbox, Chip, FormControlLabel, Divider } from '@mui/material';
import { CcfCloseIcon } from './../../icons/ccf-close-icon/ccf-close-icon';
import { CcfDatePicker } from './../ccf-datePicker/ccf-datePicker';
import { CcfTypography } from './../ccf-typography/ccf-typography';
import { ccfDropdownOptionsStyles } from './ccf-dropdown-options.style';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { CcfAutoComplete } from '../ccf-autocomplete/ccf-autocomplete';
import CcfDeboucedInput from '../ccf-debouced-input/ccf-debouced-input';
import { useTranslator } from '../../ccf-translator/ccf-translator';
import { getStatusIcon, getUnifiedStatusIcon, isFeatureEnabled } from '../ccf-directory-utils';
import { parseBooleanString } from '@nice-devone/common-sdk';
import CcfFilterIcon from '../../icons/ccf-filter-icon/ccf-filter-icon';
import CcfIconButton from '../ccf-icon-button/ccf-icon-button';
const icon = _jsx(CheckBoxOutlineBlankIcon, { fontSize: "small" });
const checkedIcon = _jsx(CheckBoxIcon, { fontSize: "small" });
export var DIGITAL_SEARCH_FILTERS;
(function (DIGITAL_SEARCH_FILTERS) {
    DIGITAL_SEARCH_FILTERS["TAG"] = "tag";
})(DIGITAL_SEARCH_FILTERS || (DIGITAL_SEARCH_FILTERS = {}));
//Properties of select all option in filters
export var SelectAllField;
(function (SelectAllField) {
    SelectAllField["ID"] = "selectAll";
    SelectAllField["NAME"] = "Select All";
})(SelectAllField || (SelectAllField = {}));
var DropdownOptionSelectionReason;
(function (DropdownOptionSelectionReason) {
    DropdownOptionSelectionReason["CLEAR"] = "clear";
    DropdownOptionSelectionReason["SELECT_OPTION"] = "selectOption";
    DropdownOptionSelectionReason["REMOVE_OPTION"] = "removeOption";
    DropdownOptionSelectionReason["TOGGLE_INPUT"] = "toggleInput";
    DropdownOptionSelectionReason["KEYBOARD"] = "keyboard";
})(DropdownOptionSelectionReason || (DropdownOptionSelectionReason = {}));
//Types by which text is inserted into the text field
var SearchBoxInputType;
(function (SearchBoxInputType) {
    SearchBoxInputType["INSERT_TEXT"] = "insertText";
    SearchBoxInputType["INSERT_FROM_PASTE"] = "insertFromPaste";
})(SearchBoxInputType || (SearchBoxInputType = {}));
// enum for field types
export var FilterFieldTypes;
(function (FilterFieldTypes) {
    FilterFieldTypes["CHECKBOX"] = "checkbox";
    FilterFieldTypes["DATE_PICKER"] = "datePicker";
    FilterFieldTypes["DROPDOWN"] = "dropdown";
})(FilterFieldTypes || (FilterFieldTypes = {}));
//initial values of dropdown options for interaction search filters
const initialInteractionSeachFilterOptions = {
    'channel': [],
    'status': [],
    'tag': [],
    'ownerAssigneeAgentId': [],
    'inboxAssigneeAgentId': [],
    'skillId': [],
    'agent': [],
    'skill': [],
    'isRead': [],
};
// initial values of search text for interaction search filters
const initialSearchText = {
    'channel': '',
    'status': '',
    'tag': '',
    'ownerAssigneeAgentId': '',
    'inboxAssigneeAgentId': '',
    'skillId': '',
    'agent': '',
    'skill': '',
    'isRead': '',
};
//inital values of loadMore flag for each interaction search filter
const initialLoadMoreFlagValues = {
    'channel': false,
    'status': false,
    'tag': false,
    'ownerAssigneeAgentId': false,
    'inboxAssigneeAgentId': false,
    'skillId': false,
    'agent': false,
    'skill': false,
    'isRead': false,
};
const DEFAULT_DISPLAY_OPTIONS = 25;
const MIN_SEARCH_CHAR_LENGTH = 2;
/** function that renders the dropdown list for interaction search filter
   * @param props - CustomListboxProps
   * @param ref - reference for keyboard accessibility
   * @returns component with list of values to be displayed in dropdown
   * @example ListboxComponent(props, ref)
   */
export const CustomListboxComponent = React.forwardRef(function ListboxComponent(props, ref) {
    var _a, _b;
    const filterType = props === null || props === void 0 ? void 0 : props.id.replace('-listbox', '');
    const theme = useTheme();
    const [translate] = useTranslator();
    const styles = ccfDropdownOptionsStyles(theme);
    let filterOptions;
    const { children, id, searchText, dropdownItems, initialDropdownOptions, handleShowMoreClick, loadMoreFlagValues, handleOpen } = props, other = __rest(props, ["children", "id", "searchText", "dropdownItems", "initialDropdownOptions", "handleShowMoreClick", "loadMoreFlagValues", "handleOpen"]);
    if (searchText[filterType]) {
        filterOptions = (_a = initialDropdownOptions[filterType]) === null || _a === void 0 ? void 0 : _a.filter((option) => option.name.toLowerCase().includes(searchText[filterType].toLowerCase()));
    }
    else {
        filterOptions = (_b = dropdownItems === null || dropdownItems === void 0 ? void 0 : dropdownItems.find(option => option.fieldName === filterType)) === null || _b === void 0 ? void 0 : _b.options;
    }
    const totalOptions = (filterOptions === null || filterOptions === void 0 ? void 0 : filterOptions.filter((option) => option.id !== SelectAllField.ID).length) || 0;
    const displayCount = loadMoreFlagValues[filterType] ? DEFAULT_DISPLAY_OPTIONS : totalOptions;
    const dropdownItemsCount = displayCount > totalOptions ? totalOptions : displayCount;
    return (
    // handle opening and closing of dropdown when focus changes to and from component
    _jsxs(Box, Object.assign({ onFocus: () => { handleOpen && handleOpen(true); }, onBlur: () => { handleOpen && handleOpen(false); } }, { children: [_jsx("ul", Object.assign({}, other, { ref: ref }, { children: children })), loadMoreFlagValues[filterType] && (_jsx(Box, Object.assign({ sx: styles.loadMoreContainer, onMouseDown: (event) => event.preventDefault(), onKeyDown: (event) => { if (event.key === 'Enter') {
                    handleShowMoreClick(filterType);
                } }, tabIndex: 0, "aria-label": "Load More", "data-testid": "loadMoreOptions", onBlur: () => { handleOpen && handleOpen(false); } }, { children: _jsx(CcfTypography, Object.assign({ variant: "button", sx: styles.loadMoreButton, "data-testid": "loadMoreButton", onClick: () => handleShowMoreClick(filterType) }, { children: translate('loadMoreOptions') })) }))), _jsx(Divider, { variant: "fullWidth" }), _jsx(CcfTypography, { sx: styles.dropdownOptionsCount, translationKey: "filterOptionsCount", extraArgs: { format: [dropdownItemsCount, totalOptions] } })] })));
});
/**
 * Dropdown control used to display dropdown options
 * @returns
 * @example
 * ```
 * <CcfDropdownOptions/>
 * ```
 */
export const CcfDropdownOptions = ({ dropdownItems, menuItemStyles, dropdownTextStyles, placeholder, buttons, listSubheaderStyles, listSubheaderTitle, datePicker, showOnlyDropDownBox, onCloseIconClick, MultiSelectPaginationDropdown, open, handleOpen, copilotFilter, extraInitialParams, }) => {
    const theme = useTheme();
    const [translate] = useTranslator();
    const styles = ccfDropdownOptionsStyles(theme);
    const [searchText, setSearchText] = useState(Object.assign(Object.assign({}, initialSearchText), extraInitialParams === null || extraInitialParams === void 0 ? void 0 : extraInitialParams.searchText));
    const [initialDropdownOptions, setInitialDropdownOptions] = useState(Object.assign(Object.assign({}, initialInteractionSeachFilterOptions), extraInitialParams === null || extraInitialParams === void 0 ? void 0 : extraInitialParams.dropdownOptions));
    const [displayedDropdownOptions, setDisplayedDropdownOptions] = useState(Object.assign(Object.assign({}, initialInteractionSeachFilterOptions), extraInitialParams === null || extraInitialParams === void 0 ? void 0 : extraInitialParams.dropdownOptions));
    const [loadMoreFlagValues, setLoadMoreFlagValues] = useState(Object.assign(Object.assign({}, initialLoadMoreFlagValues), extraInitialParams === null || extraInitialParams === void 0 ? void 0 : extraInitialParams.loadMoreFlagValues));
    const listRef = useRef(null);
    const [scrollPosition, setScrollPosition] = useState(0);
    const isDigitalWorkingStateFeatureToggleEnabled = isFeatureEnabled("release-cx-directory-agent-state-working-digital-AW-28472" /* FeatureToggles.DIRECTORY_AGENT_STATE_WORKING_DIGITAL_FEATURE_TOGGLE */);
    useEffect(() => {
        Object.keys(initialDropdownOptions).forEach((filterOptions) => {
            var _a, _b;
            const dropdownOption = dropdownItems === null || dropdownItems === void 0 ? void 0 : dropdownItems.find((element) => element.fieldName === filterOptions);
            if (dropdownOption && ((_a = dropdownOption === null || dropdownOption === void 0 ? void 0 : dropdownOption.options) === null || _a === void 0 ? void 0 : _a.length) !== ((_b = initialDropdownOptions[filterOptions]) === null || _b === void 0 ? void 0 : _b.length)) {
                setInitialDropdownOptions((dropdownValues) => {
                    return Object.assign(Object.assign({}, dropdownValues), { [filterOptions]: dropdownOption === null || dropdownOption === void 0 ? void 0 : dropdownOption.options });
                });
                setDisplayedDropdownOptions((values) => {
                    var _a;
                    return Object.assign(Object.assign({}, values), { [filterOptions]: (_a = dropdownOption === null || dropdownOption === void 0 ? void 0 : dropdownOption.options) === null || _a === void 0 ? void 0 : _a.slice(0, DEFAULT_DISPLAY_OPTIONS) });
                });
                setLoadMoreFlagValues((flagValues) => {
                    if (Array.isArray(dropdownOption.options)) {
                        return Object.assign(Object.assign({}, flagValues), { [filterOptions]: dropdownOption.options.length > DEFAULT_DISPLAY_OPTIONS });
                    }
                    return flagValues;
                });
            }
        });
    }, [dropdownItems]);
    /** function to filter the dropdown options based on search text entered
     * @param inputValue - search text entered
     * @param fieldName - fieldName for which search text is entered
     * @example filterOptions(inputValue, fieldName)
     */
    const filterOptions = (inputValue, fieldName) => {
        var _a;
        const filteredOptions = (_a = initialDropdownOptions[fieldName]) === null || _a === void 0 ? void 0 : _a.filter((option) => option.name.toLowerCase().includes(inputValue.toLowerCase()));
        setDisplayedDropdownOptions((values) => {
            return Object.assign(Object.assign({}, values), { [fieldName]: filteredOptions === null || filteredOptions === void 0 ? void 0 : filteredOptions.slice(0, DEFAULT_DISPLAY_OPTIONS) });
        });
        setLoadMoreFlagValues((flagValues) => {
            return Object.assign(Object.assign({}, flagValues), { [fieldName]: (filteredOptions === null || filteredOptions === void 0 ? void 0 : filteredOptions.length) > DEFAULT_DISPLAY_OPTIONS });
        });
    };
    /** function that is called when user enters text inside filters dropdown
     * @param event - event that contains data about searched text
     * @param fieldName - fieldName for which search text is entered
     * @example handleInputChange(event, 'status')
     */
    const handleInputChange = (event, fieldName) => {
        var _a, _b, _c, _d;
        if ((((_a = event === null || event === void 0 ? void 0 : event.nativeEvent) === null || _a === void 0 ? void 0 : _a.inputType) === SearchBoxInputType.INSERT_TEXT ||
            ((_b = event === null || event === void 0 ? void 0 : event.nativeEvent) === null || _b === void 0 ? void 0 : _b.inputType) === SearchBoxInputType.INSERT_FROM_PASTE) &&
            ((_d = (_c = event === null || event === void 0 ? void 0 : event.target) === null || _c === void 0 ? void 0 : _c.value) === null || _d === void 0 ? void 0 : _d.length) < MIN_SEARCH_CHAR_LENGTH)
            return;
        setSearchText((searchText) => {
            return Object.assign(Object.assign({}, searchText), { [fieldName]: event === null || event === void 0 ? void 0 : event.target.value });
        });
        filterOptions(event === null || event === void 0 ? void 0 : event.target.value, fieldName);
    };
    /** function that is called when user select any option from dropdown
     * @param dropdownItem - details of the filter from which option is selected
     * @param selectedOptions - array of options that are selected from dropdown
     * @param reason - string value depending on whether option is selected or deselected
     * @example handleDropdownSelection(dropdownItem, selectedOptions, reason)
     */
    const handleDropdownSelection = (dropdownItem, selectedOptions, reason) => {
        if (copilotFilter) {
            if (reason === DropdownOptionSelectionReason.CLEAR) {
                dropdownItem.onMenuItemClick([], dropdownItem.fieldName);
            }
            else {
                const isSelectAll = selectedOptions.find((option) => option.id === SelectAllField.ID);
                const selectedOptionsLength = selectedOptions.length;
                const initialDropdownOptionsLength = initialDropdownOptions[dropdownItem.fieldName].length;
                const areAllOptionsSelected = initialDropdownOptionsLength > 2 ? selectedOptionsLength === initialDropdownOptionsLength - 1 : false;
                if (!isSelectAll) {
                    if (reason === DropdownOptionSelectionReason.REMOVE_OPTION && areAllOptionsSelected) {
                        // if all options are selected and we are deselecting select all
                        dropdownItem.onMenuItemClick([], dropdownItem.fieldName);
                    }
                    else if ((reason === DropdownOptionSelectionReason.REMOVE_OPTION ||
                        reason === DropdownOptionSelectionReason.SELECT_OPTION) &&
                        !areAllOptionsSelected) {
                        // if we are deselecting or selecting any option other than select all and all options are not selected
                        dropdownItem.onMenuItemClick(selectedOptions, dropdownItem.fieldName);
                    }
                    else if (reason === DropdownOptionSelectionReason.SELECT_OPTION &&
                        areAllOptionsSelected) {
                        // if we selecting the last available option after selecting remaining options except select all
                        dropdownItem.onMenuItemClick(initialDropdownOptions[dropdownItem.fieldName], dropdownItem.fieldName);
                    }
                }
                else {
                    if (reason === DropdownOptionSelectionReason.SELECT_OPTION) {
                        // if we are selecting select all option
                        dropdownItem.onMenuItemClick(initialDropdownOptions[dropdownItem.fieldName], dropdownItem.fieldName);
                    }
                    else if (reason === DropdownOptionSelectionReason.REMOVE_OPTION) {
                        // if we are removing any one option other than select all after selecting all
                        dropdownItem.onMenuItemClick(selectedOptions === null || selectedOptions === void 0 ? void 0 : selectedOptions.filter((option) => option.id !== SelectAllField.ID), dropdownItem.fieldName);
                    }
                }
            }
        }
        else {
            //Dev Note: Removing stale code written for "Select All" option
            dropdownItem.onMenuItemClick(reason === DropdownOptionSelectionReason.CLEAR ? [] : selectedOptions, dropdownItem.fieldName);
        }
        // setting scroll position to maintain the scroll bar after re-render
        if (listRef === null || listRef === void 0 ? void 0 : listRef.current) {
            handleScrollPosition(listRef.current.scrollTop);
        }
    };
    /** function that is called when specific filter dropdown is closed
     * @param fieldName - fieldName for the filter for which dropdown is closed
     * @example handleDropdownClose(fieldName)
     */
    const handleDropdownClose = (fieldName) => {
        setDisplayedDropdownOptions((values) => {
            var _a;
            return Object.assign(Object.assign({}, values), { [fieldName]: (_a = initialDropdownOptions[fieldName]) === null || _a === void 0 ? void 0 : _a.slice(0, DEFAULT_DISPLAY_OPTIONS) });
        });
        setSearchText((searchText) => {
            return Object.assign(Object.assign({}, searchText), { [fieldName]: '' });
        });
        setLoadMoreFlagValues((flagValues) => {
            var _a;
            const filterOptions = dropdownItems === null || dropdownItems === void 0 ? void 0 : dropdownItems.find(item => item.fieldName === fieldName);
            if (filterOptions === null || filterOptions === void 0 ? void 0 : filterOptions.options) {
                return Object.assign(Object.assign({}, flagValues), { [fieldName]: ((_a = filterOptions === null || filterOptions === void 0 ? void 0 : filterOptions.options) === null || _a === void 0 ? void 0 : _a.length) > DEFAULT_DISPLAY_OPTIONS });
            }
            return Object.assign({}, flagValues);
        });
        // setting scroll position to 0 after re-render
        if (listRef === null || listRef === void 0 ? void 0 : listRef.current) {
            handleScrollPosition(0);
        }
    };
    /** function that is called when show more button is clicked
     * @param fieldName - name of the filter for which showMore is clicked
     * @example handleShowMoreClick(event, fieldName)
     */
    const handleShowMoreClick = (fieldName) => {
        var _a;
        const filteredOptions = (_a = initialDropdownOptions[fieldName]) === null || _a === void 0 ? void 0 : _a.filter((option) => option.name.toLowerCase().includes(searchText[fieldName].toLowerCase()));
        setLoadMoreFlagValues((flagValues) => {
            return Object.assign(Object.assign({}, flagValues), { [fieldName]: false });
        });
        setDisplayedDropdownOptions((values) => {
            return Object.assign(Object.assign({}, values), { [fieldName]: filteredOptions });
        });
    };
    /**
     * function to set the scroll position of list box after re-render
     * @param position - List box current scroll position
     * @example handleScrollPosition(position);
     */
    const handleScrollPosition = (position) => {
        setScrollPosition(position);
    };
    /** function that renders the dropdown list for interaction search filter
     * @param props - any
     * @returns component with list of values to be dispayed in dropdown
     * @example ListboxComponent(props)
     */
    const ListboxComponent = forwardRef((props, ref) => {
        var _a, _b;
        const filterType = props === null || props === void 0 ? void 0 : props.id.replace('-listbox', '');
        let filterOptions;
        if (searchText[filterType]) {
            filterOptions = (_a = initialDropdownOptions[filterType]) === null || _a === void 0 ? void 0 : _a.filter((option) => option.name.toLowerCase().includes(searchText[filterType].toLowerCase()));
        }
        else {
            filterOptions = (_b = dropdownItems === null || dropdownItems === void 0 ? void 0 : dropdownItems.find(option => option.fieldName === filterType)) === null || _b === void 0 ? void 0 : _b.options;
        }
        const totalOptions = filterOptions === null || filterOptions === void 0 ? void 0 : filterOptions.filter((option) => option.id !== SelectAllField.ID).length;
        const displayCount = loadMoreFlagValues[filterType] ? DEFAULT_DISPLAY_OPTIONS : totalOptions;
        const dropdownItemsCount = displayCount > totalOptions ? totalOptions : displayCount;
        useImperativeHandle(ref, () => {
            return listRef.current;
        }, []);
        useEffect(() => {
            // When component re-renders, check if listRef has a current value
            // If it does, set the scroll position to its previous value
            if (listRef === null || listRef === void 0 ? void 0 : listRef.current) {
                listRef.current.scrollTop = scrollPosition;
            }
        }, []);
        return (_jsxs(_Fragment, { children: [_jsx("ul", Object.assign({}, props, { ref: listRef })), loadMoreFlagValues[filterType] && (_jsx(Box, Object.assign({ sx: styles.loadMoreContainer, onMouseDown: (event) => event.preventDefault() }, { children: _jsx(CcfTypography, Object.assign({ variant: "button", sx: styles.loadMoreButton, onClick: () => handleShowMoreClick(filterType) }, { children: translate('loadMoreOptions') })) }))), _jsx(Divider, { variant: "fullWidth" }), _jsx(CcfTypography, { sx: styles.dropdownOptionsCount, translationKey: "filterOptionsCount", extraArgs: { format: [dropdownItemsCount, totalOptions] } })] }));
    });
    /** function that returns the placeholder value for multi select filter
     * @param item - dropdownOptions
     * @returns value of placeholder text
     * @example getFilterPlaceHolder(item)
     */
    const getFilterPlaceHolder = (item) => {
        var _a;
        if (Array.isArray(item.fieldValue)) {
            return ((_a = item === null || item === void 0 ? void 0 : item.fieldValue) === null || _a === void 0 ? void 0 : _a.length) === 0 ? placeholder : '';
        }
        return '';
    };
    /**
     * function that returns the number of selected tags to be displayed in the dropdown
     * @param count - count of tags to be displayed
     * @returns number of tags that are to be displayed
     * @example getLimitTags(count)
     */
    const getLimitTags = (count) => {
        if (copilotFilter) {
            //Dev Comment - Show 3 chips minimum for copilot before showing the count of selected tags as (+<number>)
            return 3;
        }
        return count;
    };
    /** function that returns the component to be displayed in dropdown
     * @param item - details about the dropdown filter
     * @example renderDropdownComponent(item)
     */
    const renderDropdownComponent = (item) => {
        var _a;
        if (item.isMultipleSelectionAllowed) {
            return _jsx(CcfAutoComplete, { multiple: true, size: "small", id: item.fieldName, disablePortal: true, options: displayedDropdownOptions[item.fieldName], onHighlightChange: (_event, option, reason) => {
                    if (reason === DropdownOptionSelectionReason.KEYBOARD) {
                        const index = displayedDropdownOptions[item.fieldName].indexOf(option);
                        //Handle when dropdown selection made by ArrowDown key and hover focus to the 25th item then subsequently load the remaining items.
                        if (index === (DEFAULT_DISPLAY_OPTIONS - 1) && loadMoreFlagValues[item.fieldName]) {
                            handleShowMoreClick(item.fieldName);
                        }
                    }
                }, getOptionLabel: (option) => option.name, renderInput: (params) => {
                    const _a = params, { inputProps } = _a, restParams = __rest(_a, ["inputProps"]);
                    const renderInputParams = Object.assign(Object.assign({}, restParams), { inputProps: Object.assign(Object.assign({}, inputProps), { 'aria-label': `${translate('select')} ${item.label}` }) });
                    return (_jsx(CcfDeboucedInput, Object.assign({}, renderInputParams, { size: "small", fullWidth: true, placeholder: getFilterPlaceHolder(item), onChange: (event) => handleInputChange(event, item.fieldName), delay: 500, value: searchText[item.fieldName] })));
                }, value: item.fieldValue, onChange: (_event, value, reason) => handleDropdownSelection(item, value, reason), limitTags: getLimitTags(1), renderOption: (props, option, { selected }) => (_createElement(Box, Object.assign({ component: "li" }, props, { key: props.id, sx: menuItemStyles }),
                    _jsx(Checkbox, { icon: icon, checkedIcon: checkedIcon, checked: selected, size: "small" }),
                    option.name)), renderTags: (value, getTagProps) => {
                    var _a;
                    return (_a = value === null || value === void 0 ? void 0 : value.filter((dropdownOption) => dropdownOption.id !== SelectAllField.ID)) === null || _a === void 0 ? void 0 : _a.map((option, index) => {
                        var _a, _b;
                        const hasSelectAllOption = value.find((dropdownSelectOption) => dropdownSelectOption.id === SelectAllField.ID);
                        return (_jsx(Chip, Object.assign({ label: option.name, size: "small" }, getTagProps(hasSelectAllOption ? { index: index + 1 } : { index }), { sx: { background: copilotFilter && ((_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.background) === null || _b === void 0 ? void 0 : _b.noteInput) }, "aria-label": option.name }), option.name));
                    });
                }, filterOptions: () => item.isPaginationSupported ? item === null || item === void 0 ? void 0 : item.options : displayedDropdownOptions[item.fieldName], filterSelectedOptions: true, onClose: () => handleDropdownClose(item.fieldName), disableCloseOnSelect: true, isOptionEqualToValue: (option, value) => option.id === value.id, sx: styles.menu, ListboxComponent: item.isPaginationSupported ? MultiSelectPaginationDropdown : ListboxComponent, onInputChange: item.isPaginationSupported ? item.onInputChange : undefined });
        }
        else if (item.isSingleSelectWithPage) {
            return (_jsx(CcfAutoComplete, { multiple: false, size: "small", id: item.fieldName, disablePortal: true, options: displayedDropdownOptions[item.fieldName], getOptionLabel: (option) => option.name || '', renderInput: (params) => (_jsx(CcfDeboucedInput, Object.assign({}, params, { size: "small", fullWidth: true, placeholder: placeholder, onChange: (event) => {
                        handleOpen && handleOpen(true); // open dropdown if input changes on autocomplete component
                        handleInputChange(event, item.fieldName);
                    }, delay: 500, value: searchText[item.fieldName], sx: styles.inputAlign }))), value: item.fieldValue, onChange: (_event, value, reason) => {
                    if (reason === DropdownOptionSelectionReason.CLEAR) {
                        item.onMenuItemClick(value, item.fieldName);
                        handleOpen && handleOpen(true); // open dropdown when autocomplete search text is cleared 
                    }
                    else {
                        item.onMenuItemClick(value, item.fieldName);
                    }
                }, renderOption: (props, option) => (_jsxs(Box, Object.assign({ component: "li", sx: menuItemStyles }, props, { children: [option.agentStatus &&
                            (isDigitalWorkingStateFeatureToggleEnabled
                                ? getUnifiedStatusIcon(option.agentStatus, styles.icon)
                                : getStatusIcon(option.agentStatus, styles.icon)), _jsx(Box, Object.assign({ sx: { padding: '0 0.5rem' } }, { children: option.name }))] }), props.id)), filterOptions: (_options, _state) => displayedDropdownOptions[item.fieldName], filterSelectedOptions: true, onClose: (_event, reason) => {
                    // close dropdown when close icon is clicked 
                    if (reason === DropdownOptionSelectionReason.TOGGLE_INPUT) {
                        handleOpen && handleOpen(false);
                    }
                    handleDropdownClose(item.fieldName);
                }, onOpen: () => { handleOpen && handleOpen(true); }, isOptionEqualToValue: (option, value) => option.id === value.id, sx: Object.assign(Object.assign({}, styles.menu), styles.valueItem), ListboxComponent: (props) => (_jsx(CustomListboxComponent, Object.assign({}, props, { searchText: searchText, initialDropdownOptions: initialDropdownOptions, handleShowMoreClick: handleShowMoreClick, loadMoreFlagValues: loadMoreFlagValues, handleOpen: handleOpen, dropdownItems: dropdownItems, id: item.fieldName }))), open: open }));
        }
        else
            return (_jsx(Select, Object.assign({ id: "filter-menu-options", size: "small", displayEmpty: true, value: item.fieldValue, "data-testid": "textfield", MenuProps: { PaperProps: { sx: Object.assign({}, styles.menuItem) } }, renderValue: (selected) => {
                    var _a;
                    if (typeof (selected) !== 'object' && (selected === null || selected === void 0 ? void 0 : selected.length) === 0) {
                        return _jsx(Typography, Object.assign({ sx: styles.placeholder }, { children: placeholder }));
                    }
                    return (_jsx(Typography, Object.assign({ sx: styles.placeholder }, { children: item.options && ((_a = item === null || item === void 0 ? void 0 : item.options.find((el) => el.id === selected)) === null || _a === void 0 ? void 0 : _a.name) })));
                } }, { children: (_a = item.options) === null || _a === void 0 ? void 0 : _a.map((option) => {
                    return (_jsx(MenuItem, Object.assign({ value: option.id, onClick: () => item.onMenuItemClick(option.id, item.fieldName), sx: menuItemStyles, "data-testid": `option-${option.name}` }, { children: option.name }), option.id));
                }) })));
    };
    return (_jsxs(_Fragment, { children: [!(showOnlyDropDownBox === true) && (_jsxs(_Fragment, { children: [_jsxs(ListSubheader, Object.assign({ component: "div", id: "list-subheader", sx: copilotFilter ? styles.listSubheaderForCopilotFilters : styles.listSubheader }, { children: [_jsxs(Box, Object.assign({ sx: { display: 'flex', alignItems: 'center' } }, { children: [copilotFilter && (_jsx(CcfFilterIcon, { svgIconProps: { viewBox: '-8 -4 32 32', sx: styles.filterIcon }, isFilterSelected: false })), _jsx(CcfTypography, { id: 'dropdown-title', variant: 'h4', sx: listSubheaderStyles, translationKey: listSubheaderTitle })] })), _jsx(CcfIconButton, Object.assign({ onClick: onCloseIconClick, disableRipple: true, "aria-label": translate('close'), "data-testid": "CloseIcon", sx: [styles === null || styles === void 0 ? void 0 : styles.closeButton, styles === null || styles === void 0 ? void 0 : styles.focusedElement] }, { children: _jsx(CcfCloseIcon, { viewBox: "-8 -4 32 32", sx: styles === null || styles === void 0 ? void 0 : styles.closeIcon }) }))] })), copilotFilter && (_jsx(CcfTypography, Object.assign({ sx: styles.subtextForCopilotFilters }, { children: translate('filterCopilotDataSubtext') })))] })), _jsx(Box, { children: dropdownItems === null || dropdownItems === void 0 ? void 0 : dropdownItems.map((item) => {
                    return (_jsxs(FormControl, Object.assign({ sx: Object.assign(Object.assign({}, styles.formControl), (showOnlyDropDownBox === true) ? { m: '0' } : '') }, { children: [item.type !== FilterFieldTypes.CHECKBOX &&
                                _jsx(CcfTypography, { variant: "inherit", sx: dropdownTextStyles, translationKey: item.label }), item.type === FilterFieldTypes.DROPDOWN && renderDropdownComponent(item), item.type === FilterFieldTypes.CHECKBOX && (_jsx(Box, Object.assign({ sx: styles.datePickerBox }, { children: _jsx(FormControlLabel, { control: _jsx(Checkbox, { checked: parseBooleanString(item === null || item === void 0 ? void 0 : item.fieldValue), onChange: (event) => { var _a; return item.onMenuItemClick(((_a = event === null || event === void 0 ? void 0 : event.target) === null || _a === void 0 ? void 0 : _a.checked) ? 'true' : 'false', item.fieldName); } }), label: item.label, labelPlacement: "end" }) }))), item.type === FilterFieldTypes.DATE_PICKER &&
                                _jsx(Box, Object.assign({ sx: styles.datePickerBox }, { children: datePicker === null || datePicker === void 0 ? void 0 : datePicker.map((element) => {
                                        return (_jsx(CcfDatePicker, { maxDate: element === null || element === void 0 ? void 0 : element.maxDate, label: element.label, setSelectedDate: (event, type) => element.onDateSelect(event, type), disableUpArrow: element === null || element === void 0 ? void 0 : element.disableUpArrow, minDate: element === null || element === void 0 ? void 0 : element.minDate, disableDownArrow: element === null || element === void 0 ? void 0 : element.disableDownArrow, dateTime: element.value, fieldName: element.fieldName, dateLabelStyles: element === null || element === void 0 ? void 0 : element.dateLabelStyles, locale: element === null || element === void 0 ? void 0 : element.locale }, element === null || element === void 0 ? void 0 : element.fieldName));
                                    }) }))] }), item.fieldName));
                }) }), buttons && _jsx(Box, Object.assign({ sx: styles.buttonsBox }, { children: buttons === null || buttons === void 0 ? void 0 : buttons.map((button) => {
                    return (_jsx(Button, Object.assign({ variant: "outlined", size: "small", sx: button.styles, onClick: button.onClickHandler, "data-testid": `option-${button.title}`, disabled: button.disabled ? true : false }, { children: button.title }), button.title));
                }) }))] }));
};
//# sourceMappingURL=ccf-dropdown-options.js.map