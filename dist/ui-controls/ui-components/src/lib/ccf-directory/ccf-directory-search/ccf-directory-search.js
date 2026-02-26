import { jsx as _jsx } from "react/jsx-runtime";
import { Box, ClickAwayListener, InputAdornment, TextField, useTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Search } from '@mui/icons-material';
import { agentDirectoryActions, directoryFocusEvent, selectSearchBoxQueryValue, standardAddressBooks, } from '../+state/ccf-directory.slice';
import { CcfTooltip, useTranslator } from '@nice-devone/ui-controls';
import React, { useEffect, useRef } from 'react';
import directorySearchStyles from './ccf-directory-search.styles';
;
/**
 * Component to be used for directory search
 * @param param0 - any
 * @example <CcfDirectorySearch />
 * @returns
 */
export const CcfDirectorySearch = React.memo(({ updateSearchQuery }) => {
    const [translate] = useTranslator();
    const dispatch = useDispatch();
    const theme = useTheme();
    const type = theme.palette.mode;
    const placeHolderValue = translate('agentSearchBox');
    const placeHolderTooltip = translate('searchDirectoryPlaceHolder');
    const searchValue = useSelector(selectSearchBoxQueryValue);
    const inputRef = useRef(null);
    const focusSearchBox = useSelector(directoryFocusEvent);
    const standardAddressBookNames = useSelector(standardAddressBooks);
    const classes = directorySearchStyles(theme);
    useEffect(() => {
        var _a;
        if (focusSearchBox) {
            (_a = inputRef === null || inputRef === void 0 ? void 0 : inputRef.current) === null || _a === void 0 ? void 0 : _a.focus();
        }
    }, [focusSearchBox]);
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, [inputRef.current]);
    /**
     * Function to dispatch action to search agent contacts
     * @param e -  React.ChangeEvent
     * @example dispatchQueryUpdateAction()
     */
    function dispatchQueryUpdateAction() {
        const elem = inputRef === null || inputRef === void 0 ? void 0 : inputRef.current;
        if (elem) {
            if (standardAddressBookNames.length > 0) {
                const payload = {
                    addressBookEntryId: 0,
                    isVisible: false,
                };
                dispatch(agentDirectoryActions.displayStandardAddressDetails(payload));
            }
            let searchStr = elem === null || elem === void 0 ? void 0 : elem.value;
            if ((searchStr === null || searchStr === void 0 ? void 0 : searchStr.substring(0, 1)) === ' ') {
                searchStr = searchStr.trim();
            }
            dispatch(agentDirectoryActions.updateEmptySearchState(false));
            dispatch(agentDirectoryActions.updateSearchBoxValue(searchStr.replace(/\s+/g, ' ')));
        }
    }
    /**
     * Function to dispatch action to search agent contacts
     * @param e -  React.KeyEvent
     * @example dispatchEmptySearchFlagKeyUpdateAction()
     */
    function dispatchEmptySearchFlagKeyUpdateAction() {
        dispatch(agentDirectoryActions.updateEmptySearchState(true));
        // allow empty search in drilldown for standard addressbook
        if (standardAddressBookNames.length > 0) {
            const payload = {
                addressBookEntryId: 0,
                isVisible: false,
            };
            dispatch(agentDirectoryActions.displayStandardAddressDetails(payload));
        }
    }
    useEffect(() => {
        // debounce the input with a delay of 500ms
        const timeOutId = setTimeout(() => {
            updateSearchQuery(searchValue);
        }, 500);
        return () => clearTimeout(timeOutId);
    }, [searchValue, updateSearchQuery]);
    /**
     * Method to handle outside click event for directory search input box
     * @example `onOutsideClick()`
     */
    const onOutsideClick = () => {
        dispatch(agentDirectoryActions.setFocusInDirectory(false));
    };
    return (_jsx(ClickAwayListener, Object.assign({ onClickAway: onOutsideClick }, { children: _jsx(Box, Object.assign({ bgcolor: "background.light", p: 1, pt: 2 }, { children: _jsx(CcfTooltip, Object.assign({ title: placeHolderTooltip, role: 'presentation', "aria-hidden": 'true' }, { children: _jsx(TextField, { id: "searchField", autoComplete: 'off', size: "small", sx: {
                        background: type === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'white',
                        '& .MuiOutlinedInput-input': Object.assign({}, theme.typography.h6),
                    }, InputProps: {
                        startAdornment: (_jsx(InputAdornment, Object.assign({ position: "start" }, { children: _jsx(Search, { htmlColor: "grey" }) }))),
                    }, inputRef: inputRef, onChange: () => {
                        dispatchQueryUpdateAction();
                    }, placeholder: placeHolderValue, variant: "outlined", onKeyDown: (e) => {
                        var _a, _b;
                        if (e.key !== 'Enter')
                            return;
                        if (inputRef && (inputRef === null || inputRef === void 0 ? void 0 : inputRef.current) && ((_a = inputRef === null || inputRef === void 0 ? void 0 : inputRef.current) === null || _a === void 0 ? void 0 : _a.value.length) === 0) {
                            dispatchEmptySearchFlagKeyUpdateAction();
                            updateSearchQuery((_b = inputRef === null || inputRef === void 0 ? void 0 : inputRef.current) === null || _b === void 0 ? void 0 : _b.value);
                        }
                        else {
                            dispatchQueryUpdateAction();
                        }
                    }, fullWidth: true, value: searchValue, inputProps: { 'data-testid': 'search-directory',
                        'aria-label': `${placeHolderValue}`,
                        sx: classes.searchInputField,
                    } }) })) })) })));
});
//# sourceMappingURL=ccf-directory-search.js.map