import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef, useState } from 'react';
import { TextField, MenuItem, ClickAwayListener, Paper, Box, IconButton, useTheme, } from '@mui/material';
import { CcfInputMenuStyles } from './ccf-input-menu.style';
import { Clear } from '@mui/icons-material';
import { useTranslator } from '../../ccf-translator/ccf-translator';
import { EventKeys } from '@nice-devone/common-sdk';
/**
 * Control with input element and menu list when the input is focused the menulist will appear
 * @example
 * ```
 * <CcfInputMenu {...props}/>
 * ```
 */
export const CcfInputMenu = ({ options, inputStyles, inputValue, handleInputChange, handleOptionSelection, handleInputClear, handleEnter, inputLabel, closeOnClear = false, cursorPosition = 0 }) => {
    const theme = useTheme();
    const styles = CcfInputMenuStyles(theme);
    const inputRef = useRef();
    const containerRef = useRef(null);
    const [translate] = useTranslator();
    // State for managing whether the dropdown is open or closed
    const [open, setOpen] = useState(false);
    useEffect(() => {
        var _a;
        cursorPosition > 0 && ((_a = inputRef === null || inputRef === void 0 ? void 0 : inputRef.current) === null || _a === void 0 ? void 0 : _a.setSelectionRange(cursorPosition, cursorPosition));
    }, [cursorPosition]);
    /**
     * Handles changes in the search input field.
     * @param event - The change event object.
     * @example onInputChange(event)
     */
    const onInputChange = (event) => {
        var _a;
        handleInputChange((_a = event === null || event === void 0 ? void 0 : event.target) === null || _a === void 0 ? void 0 : _a.value);
    };
    /**
     * Handles selection of an option from the dropdown.
     * @param option - The selected option.
     * * @example onSelectionChange("option 1")
     */
    const onSelectionChange = (option) => {
        const current = inputRef === null || inputRef === void 0 ? void 0 : inputRef.current;
        handleOptionSelection(option, (current === null || current === void 0 ? void 0 : current.selectionStart) || 0);
        current === null || current === void 0 ? void 0 : current.focus(); // once the selection is done focus the input field
    };
    /**
     * Handles opening the dropdown when the input field is focused.
     * * @example handleOpen()
     */
    const handleOpen = () => {
        setOpen(true);
    };
    /**
     * Handles closing the dropdown when the input field loses focus.
     * * @example handleClose()
     */
    const handleClose = () => {
        setOpen(false);
    };
    /**
     * Handles clearing the search text.
     * @example handleClearSearch()
     */
    const handleClearSearch = () => {
        handleInputClear();
        // Closes the dropdown if the 'closeOnClear' option is enabled when the clear icon is clicked
        closeOnClear && handleClose();
    };
    /**
     * Used to handle the keydown event
     * @example handleKeydown(event);
     */
    const handleKeyDown = (event) => {
        if (!open)
            setOpen(true); // this will open the dropdown when the user starts typing in the input field and if its not already open
        if (event.key === (EventKeys === null || EventKeys === void 0 ? void 0 : EventKeys.ENTER)) {
            setOpen(false);
            handleEnter();
        }
        // Close dropdown on ESC key and allow focus to move to next element
        if (event.key === (EventKeys === null || EventKeys === void 0 ? void 0 : EventKeys.ESCAPE)) {
            setOpen(false);
        }
    };
    /**
     * Handles blur on the input container. Closes the dropdown only if the focus
     * has shifted outside the container (i.e., not to the dropdown items).
     * @param focusEvent -  The focus event.
     * @example handleBlur(focusEvent);
     */
    const handleBlur = (focusEvent) => {
        if (containerRef.current &&
            (focusEvent === null || focusEvent === void 0 ? void 0 : focusEvent.relatedTarget) instanceof Node &&
            !containerRef.current.contains(focusEvent === null || focusEvent === void 0 ? void 0 : focusEvent.relatedTarget)) {
            setOpen(false);
        }
    };
    /**
     * Handles keydown events in the dropdown (Paper) to close on ESC.
     * @example handleDropdownKeyDown(event)
     */
    const handleDropdownKeyDown = (event) => {
        if (event.key === (EventKeys === null || EventKeys === void 0 ? void 0 : EventKeys.ESCAPE)) {
            setOpen(false);
        }
    };
    return (_jsx(ClickAwayListener, Object.assign({ onClickAway: handleClose }, { children: _jsxs(Box, Object.assign({ sx: styles.container, ref: containerRef, onFocus: handleOpen, onBlur: handleBlur }, { children: [_jsx(TextField, { inputRef: inputRef, placeholder: inputLabel, value: inputValue, onChange: onInputChange, sx: inputStyles, variant: "outlined", fullWidth: true, onFocus: handleOpen, InputProps: {
                        endAdornment: inputValue ? (_jsx(IconButton, Object.assign({ "aria-label": translate('clearSearch'), onClick: handleClearSearch, sx: styles === null || styles === void 0 ? void 0 : styles.focussedElement, disableRipple: true }, { children: _jsx(Clear, {}) }))) : null,
                    }, onKeyDown: handleKeyDown, inputProps: Object.assign({ 'role': 'combobox', 'aria-label': inputLabel, 'aria-autocomplete': 'list', 'aria-expanded': open ? 'true' : 'false', 'aria-haspopup': 'listbox' }, (open && { 'aria-controls': 'search-suggestions' })) }), open && options && (options === null || options === void 0 ? void 0 : options.length) > 0 && ( // show dropdown only when their is options available and open flag is true
                _jsx(Paper, Object.assign({ role: "listbox", id: "search-suggestions", sx: styles.paper, onKeyDown: handleDropdownKeyDown }, { children: options.map((option) => (_jsx(MenuItem, Object.assign({ role: "menuitem", onClick: () => onSelectionChange(option), "aria-label": option, tabIndex: 0, "aria-selected": inputValue === option ? 'true' : 'false' }, { children: option }), option))) })))] })) })));
};
//# sourceMappingURL=ccf-input-menu.js.map