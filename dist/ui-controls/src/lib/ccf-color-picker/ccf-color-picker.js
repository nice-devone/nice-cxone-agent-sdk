import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ArrowDropDown } from '@mui/icons-material';
import { Box, Button, ClickAwayListener, Popper, useTheme } from '@mui/material';
import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { useTranslator } from '../ccf-translator/ccf-translator';
import ccfColorPickerStyles from './ccf-color-picker.styles';
import colorData, { TEXT_COLOR_GROUP } from './color-data';
import { EventKeys } from '@nice-devone/common-sdk';
/**
 * Used to show color picker for Rich Text Editor
 * @param props -?- CcfColorPickerProps
 * @example - `<CcfColorPicker {...props} />`
 */
export const CcfColorPicker = forwardRef(({ resetLabel = 'Reset', group = 'TEXT_COLOR', onSelect, children, onEscape }, ref) => {
    const theme = useTheme();
    const styles = ccfColorPickerStyles(theme);
    const wrapperRef = useRef(null);
    const popperContentRef = useRef(null);
    const [translate] = useTranslator();
    const [openPicker, setColorPicker] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const resetButtonRef = useRef(null);
    const firstColorButtonRef = useRef(null);
    const colors = colorData.filter((color) => color.group === group);
    /**
     * * eventlistener function to close the colorpicker, when user clicks outside color picker.
     * @param event - React.MouseEvent<HTMLElement>
     * @example `handleClickOutside(e)`
    */
    function handleClickOutside(event) {
        if (openPicker && popperContentRef && (popperContentRef === null || popperContentRef === void 0 ? void 0 : popperContentRef.current) && !(popperContentRef === null || popperContentRef === void 0 ? void 0 : popperContentRef.current.contains(event.target))) {
            onOutsideClick();
        }
    }
    /**
      * eventlistener function to close the colorpicker when user clicks escape key
      * @param event - KeyboardEvent
      * @example handleKeyDown(event)
    */
    const handleKeyDown = (event) => {
        if (event.key === EventKeys.ESCAPE && openPicker) {
            onOutsideClick();
        }
    };
    useEffect(() => {
        let btnFocusTimer;
        if (openPicker) {
            btnFocusTimer = setTimeout(() => {
                var _a;
                (_a = resetButtonRef.current) === null || _a === void 0 ? void 0 : _a.focus();
            }, 10);
        }
        if (openPicker) {
            document.addEventListener('keydown', handleKeyDown);
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('mousedown', handleClickOutside);
            clearTimeout(btnFocusTimer);
        };
    }, [openPicker]);
    /**
     * Method to toggle colorPicker
     *  @param event - MouseEvent or KeyboardEvent
     *  @example - toggleColorPicker(e)
     */
    const toggleColorPicker = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
        setColorPicker((previousOpen) => !previousOpen);
    };
    /**
     * Method to handle color picker if clicked outside
     * @example `onOutsideClick()`
     */
    const onOutsideClick = () => {
        setAnchorEl(null);
        setColorPicker(false);
        onEscape && onEscape();
    };
    /**
     * Method to handle color change event
     * @param color - color
     * @example `handleColorSelect()`
     */
    const handleColorSelect = (id, group, event, value) => {
        onSelect(id, group);
        toggleColorPicker(event);
        fillIconColor(group, value);
    };
    /**
     * Method to handle reset color
     * @param event - React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>
     * @example `handleRemoveColor(e)`
     */
    const handleRemoveColor = (event) => {
        onSelect(null, group);
        toggleColorPicker(event);
        fillIconColor(group, '#333333');
    };
    /**
     * Method of fill color to text Icon / background Icon
     * @param group -color group
     * @example `fillIconColor(group,value)`
     */
    const fillIconColor = (group, value) => {
        var _a, _b, _c, _d;
        group === TEXT_COLOR_GROUP ? (_b = (_a = document.querySelector('[data-testid="FormatColorTextIcon"]')) === null || _a === void 0 ? void 0 : _a.querySelectorAll('path')[0]) === null || _b === void 0 ? void 0 : _b.setAttribute('fill', value) : (_d = (_c = document.querySelector('[data-testid="BorderColorIcon"]')) === null || _c === void 0 ? void 0 : _c.querySelectorAll('path')[0]) === null || _d === void 0 ? void 0 : _d.setAttribute('fill', value);
    };
    return (_jsxs("div", Object.assign({ ref: wrapperRef, style: styles.ColorPickerContainer }, { children: [_jsxs("span", Object.assign({ role: "presentation", ref: ref, onClick: toggleColorPicker, style: { cursor: 'pointer' } }, { children: [children, _jsx(ArrowDropDown, {})] })), _jsx(Popper, Object.assign({ open: openPicker, anchorEl: anchorEl, ref: popperContentRef, placement: "top", nonce: undefined, onResize: undefined, onResizeCapture: undefined, style: { zIndex: 1000 } }, { children: _jsx(ClickAwayListener, Object.assign({ onClickAway: onOutsideClick }, { children: _jsxs(Box, Object.assign({ sx: styles.ColorPickerPopover }, { children: [_jsx(Button, Object.assign({ sx: styles.ColorResetButton, tabIndex: 0, onKeyDown: (e) => {
                                    var _a;
                                    if (e.key === EventKeys.ENTER) {
                                        handleRemoveColor(e);
                                    }
                                    else if (e.key === EventKeys.TAB) {
                                        e.preventDefault();
                                        (_a = firstColorButtonRef.current) === null || _a === void 0 ? void 0 : _a.focus();
                                    }
                                }, onClick: handleRemoveColor, ref: resetButtonRef, "data-testid": "reset-color-button", role: "button", "aria-label": resetLabel }, { children: resetLabel })), _jsx(Box, Object.assign({ sx: styles.ColorButtonContainer, role: 'group', "aria-label": translate('colorPicker') }, { children: colors.map(({ id, label, value, group }, index) => (_jsx(Box, { component: 'button', ref: index === 0 ? firstColorButtonRef : null, title: translate(label), sx: Object.assign(Object.assign({}, styles.ColorButton), { backgroundColor: value }), onClick: (event) => handleColorSelect(id, group, event, value), "data-testid": id, tabIndex: 0, role: 'button', "aria-label": translate(label) }, id))) }))] })) })) }))] })));
});
export default CcfColorPicker;
//# sourceMappingURL=ccf-color-picker.js.map