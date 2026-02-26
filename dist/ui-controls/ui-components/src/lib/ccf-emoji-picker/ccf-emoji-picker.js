import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useEffect, useState, useRef, useCallback, forwardRef, } from 'react';
import { NimblePicker } from 'emoji-mart';
import { CcfEmojiIcon, useTranslator, CcfTooltip } from '@nice-devone/ui-controls';
import { Popper, ClickAwayListener, Box } from '@mui/material';
import emojiData from './emoji-data';
import CcfEmojiPickerStyles from './ccf-emoji-picker-style';
import { EventKeys } from '@nice-devone/common-sdk';
/**
 * Enum for SkinTone
 */
export var SkinTone;
(function (SkinTone) {
    SkinTone[SkinTone["DEFAULT"] = 1] = "DEFAULT";
    SkinTone[SkinTone["LIGHT"] = 2] = "LIGHT";
    SkinTone[SkinTone["MEDIUM_LIGHT"] = 3] = "MEDIUM_LIGHT";
    SkinTone[SkinTone["MEDIUM"] = 4] = "MEDIUM";
    SkinTone[SkinTone["MEDIUM_DARK"] = 5] = "MEDIUM_DARK";
    SkinTone[SkinTone["DARK"] = 6] = "DARK";
})(SkinTone || (SkinTone = {}));
const defaultOptions = {
    showTooltip: true,
    size: 23,
    searchAutoFocus: true,
    defaultSkin: SkinTone.DEFAULT,
    set: 'apple',
    perLine: 6,
    exclude: ['flags'],
    placement: 'top-start',
    onSelect: () => {
        return;
    },
};
/**
 * Used to show Emoji picker for the application
 * @param props -?- CcfEmojiProps
 * @example - `<CcfEmojiPicker {...props}/>`
 */
export const CcfEmojiPicker = forwardRef((props, ref) => {
    const [options, setEmojiOptions] = useState(defaultOptions);
    const [openPicker, setEmojiPicker] = useState(false);
    const [translate] = useTranslator();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const wrapperRef = useRef(null);
    const emojiPickerContainerRef = useRef(null);
    const iconSize = props.isEmailRevampEnabled ? { height: '1.625rem', width: '1.625rem' } : {};
    const i18n = {
        search: translate('search'),
        notfound: translate('noEmojiFound'),
        categories: {
            search: translate('searchResults'),
            recent: translate('frequentlyUsed'),
            smileys: translate('smileysAndEmotions'),
            people: translate('peopleAndBody'),
            nature: translate('animalAndNature'),
            foods: translate('foodAndDrink'),
            activity: translate('relatedInteractions'),
            places: translate('travelAndPlaces'),
            objects: translate('objects'),
            symbols: translate('symbols'),
        },
        skintones: {
            1: translate('defaultSkinTone'),
            2: translate('lightSkinTone'),
            3: translate('mediumLightSkinTone'),
            4: translate('mediumSkinTone'),
            5: translate('mediumDarkSkinTone'),
            6: translate('darkSkinTone'),
        },
    };
    const emojiStyles = CcfEmojiPickerStyles();
    /**
     * Method to handle Emoji selection
     * @param emojiData - emoji data
     * @example `handleEmojiClick(data)`
     */
    const handleEmojiClick = (emojiData) => {
        options.onSelect(emojiData);
        setAnchorEl(null);
        setEmojiPicker(false);
    };
    /**
     * Used to update emoji options
     * @param props -?- CcfEmojiProps
     * @example - `updateEmojiOptions(props)`
     */
    const updateEmojiOptions = (props) => {
        setEmojiOptions((prevState) => (Object.assign(Object.assign({}, prevState), props)));
    };
    useEffect(() => {
        updateEmojiOptions(props);
    }, [props]);
    /**
     * eventlistener function to close the emoji picker when user clicks escape key
     * @param event - KeyboardEvent
     * @example handleKeyDown(event)
     */
    const handleKeyDown = (event) => {
        if (event.key === EventKeys.ESCAPE && openPicker) {
            onOutsideClick(event);
        }
    };
    /**
     * eventlistener function to close the emoji picker when user clicks outside
     * @param event - MouseEvent
     * @example handleClickOutside(event)
     */
    const handleClickOutside = (event) => {
        // calling onOutsideClick if the click is not triggered from any elements inside emojiPickerContainerRef
        if (openPicker && emojiPickerContainerRef.current && !emojiPickerContainerRef.current.contains(event.target)) {
            onOutsideClick(event);
        }
    };
    useEffect(() => {
        if (openPicker) {
            document.addEventListener('keydown', handleKeyDown);
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [openPicker]);
    /**
     * This method t toggle emojiPicker
     *  @param event - Event
     *  @example - toggleEmojiPicker()
     */
    const toggleEmojiPicker = useCallback((event) => {
        event === null || event === void 0 ? void 0 : event.stopPropagation();
        setAnchorEl(anchorEl ? null : event.currentTarget);
        setEmojiPicker((previousOpen) => !previousOpen);
        props.setActivePopper && props.setActivePopper();
    }, []);
    /**
     * Method to handle emoji picker if click outside
     * @param event - Event
     * @example `onOutsideClick()`
     */
    const onOutsideClick = useCallback((event) => {
        setAnchorEl(null);
        setEmojiPicker(false);
        props.onEscape && props.onEscape();
        const ref = wrapperRef;
        if (ref.current && ref.current.contains(event.target)) {
            return;
        }
    }, []);
    return (_jsxs("div", Object.assign({ ref: wrapperRef }, { children: [_jsx(CcfTooltip, Object.assign({ title: translate('addEmoji'), disableHoverListener: openPicker }, { children: _jsx("span", Object.assign({ role: "button", tabIndex: -1, onKeyUp: (e) => { if (e.key === EventKeys.ENTER)
                        toggleEmojiPicker(e); }, onClick: toggleEmojiPicker, style: emojiStyles.emojiButton, ref: ref }, { children: _jsx(CcfEmojiIcon, { style: iconSize }) })) })), _jsx(Popper, Object.assign({ open: openPicker, anchorEl: anchorEl, onClick: (event) => event === null || event === void 0 ? void 0 : event.stopPropagation(), placement: options.placement, style: { zIndex: 2000 }, nonce: undefined, onResize: undefined, onResizeCapture: undefined }, { children: _jsx(ClickAwayListener, Object.assign({ onClickAway: onOutsideClick }, { children: _jsx(Box, Object.assign({ sx: emojiStyles, ref: emojiPickerContainerRef, "data-testid": 'emoji-box' }, { children: _jsx(NimblePicker, { data: emojiData, onSelect: (data) => handleEmojiClick(data), emojiTooltip: options.showTooltip, title: '', emoji: '', i18n: i18n, emojiSize: options.size, autoFocus: options.searchAutoFocus, color: '#009BD7', style: { width: '228px' }, defaultSkin: options.defaultSkin, showPreview: false, perLine: options.perLine, set: options.set, enableFrequentEmojiSort: true, exclude: options.exclude }) })) })) }))] })));
});
export default CcfEmojiPicker;
//# sourceMappingURL=ccf-emoji-picker.js.map