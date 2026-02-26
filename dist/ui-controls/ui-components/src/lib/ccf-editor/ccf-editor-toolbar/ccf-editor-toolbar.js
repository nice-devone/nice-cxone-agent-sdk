import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { FormatBold, FormatItalic, FormatListNumbered, FormatTextdirectionLToR, FormatTextdirectionRToL, FormatUnderlined, ListRounded, } from '@mui/icons-material';
import { Button, MenuItem, Tooltip, useTheme } from '@mui/material';
import { CcfAlignCenterIcon, CcfAlignLeftIcon, CcfAlignRightIcon, CcfColorPicker, useTranslator, CcfTextColorIcon, CcfBackGroundColorIcon, TEXT_COLOR_GROUP, HIGHLIGHT_COLOR_GROUP, CcfTooltip, CcfBox } from '@nice-devone/ui-controls';
import Menu from '@mui/material/Menu';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import { useRef, useState, memo, useEffect } from 'react';
import FontDownloadIcon from '@mui/icons-material/FontDownload';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { styleMap } from '../ccf-rich-text-editor/ccf-rich-text-editor.styles';
import { ccfEditorToolbarStyles } from './ccf-editor-toolbar-styles';
import { RICH_TOOLBAR_BUTTONS } from '../ccf-editor-toolbar-plugin/ccf-editor-toolbar-plugin.style';
import { EditorToolbarButtons } from '../../../enums/ccf-editor-toolbar-button-types';
import { EventKeys } from '@nice-devone/common-sdk';
/**
 * Component displays Rich text Editor controls
 * @returns Rich text Editor controls
 * ```
 * @example
 * <CcfEditorToolbar/>
 * ```
 */
export function CcfEditorToolbar(props) {
    const theme = useTheme();
    const editorToolbarStyles = ccfEditorToolbarStyles(theme);
    const { styles } = props;
    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorElFS, setAnchorElFS] = useState(null);
    const [selectedFontIndex, setSelectedFontIndex] = useState(1);
    const [selectedSizeIndex, setSelectedSizeIndex] = useState(1);
    const open = Boolean(anchorEl);
    const openFontSize = Boolean(anchorElFS);
    const [translate] = useTranslator();
    const textColorButtonRef = useRef(null);
    const highlightColorButtonRef = useRef(null);
    const buttonRefs = useRef({});
    const [activeButton, setActiveButton] = useState(EditorToolbarButtons.BOLD);
    const [focusReTrigger, setFocusRetrigger] = useState(true);
    const options = [
        { value: 'FontAndaleMono', label: 'Andale Mono' },
        { value: 'FontArial', label: 'Arial' },
        { value: 'FontArialBlack', label: 'Arial Black' },
        { value: 'FontBookAntiqua', label: 'Book Antiqua' },
        { value: 'FontComicSansMS', label: 'Comic Sans MS' },
        { value: 'FontCourierNew', label: 'Courier New' },
        { value: 'FontGeorgia', label: 'Georgia' },
        { value: 'FontHelvetica', label: 'Helvetica' },
        { value: 'FontImpact', label: 'Impact' },
        { value: 'FontMalgunGothic', label: 'Malgun Gothic' },
        { value: 'FontTahoma', label: 'Tahoma' },
        { value: 'FontTerminal', label: 'Terminal' },
        { value: 'FontTimesNewRoman', label: 'Times New Roman' },
        { value: 'FontTrebuchetMs', label: 'Trebuchet MS' },
        { value: 'FontVerdana', label: 'Verdana' }
    ];
    const buttonStyles = (props.displayNewEmailButtons && styles.revampedButton) ? styles.revampedButton : styles.button;
    const optionsFontSize = [{ value: 'txtExsmall' }, { value: 'txtSmall' }, { value: 'txtRegular' }, { value: 'txtLarge' }, { value: 'txtExlarge' }];
    const customStyleMap = styleMap;
    useEffect(() => {
        var _a;
        (_a = buttonRefs.current[activeButton]) === null || _a === void 0 ? void 0 : _a.focus();
    }, []);
    useEffect(() => {
        requestAnimationFrame(() => {
            var _a;
            props.displayNewEmailButtons && ((_a = buttonRefs.current[activeButton]) === null || _a === void 0 ? void 0 : _a.focus());
        });
    }, [activeButton, focusReTrigger]);
    /**
    * method to handle the font family change
    * @example handleMenuItemClick();
    */
    const handleMenuItemClick = (index) => {
        props.changeFontFamily(options[index].value);
        setSelectedFontIndex(index);
        setAnchorEl(null);
    };
    /**
    * method to set focus on current button and call relevant callback function
    * @param e - React.KeyboardEvent
    * @example handleKeyDown();
    */
    const handleKeyDown = (e, buttonName, callbackFn) => {
        e.preventDefault();
        callbackFn(e);
        setActiveButton(buttonName);
        setFocusRetrigger(!focusReTrigger);
        requestAnimationFrame(() => {
            var _a;
            (_a = buttonRefs.current[buttonName]) === null || _a === void 0 ? void 0 : _a.focus();
        });
    };
    /**
    * method to handle the font family size
    * @example handleMenuItemClickFontSize();
    */
    const handleMenuItemClickFontSize = (index) => {
        props.changeFontSize(optionsFontSize[index].value);
        setSelectedSizeIndex(index);
        setAnchorElFS(null);
    };
    /**
    * method to return the toolbar buttons
    * @example getToolbarButtons();
    */
    const getToolbarButtons = () => {
        return _jsxs(_Fragment, { children: [_jsx(Tooltip, Object.assign({ title: translate('bold') }, { children: _jsx(Button, Object.assign({ "aria-pressed": props.hightlightBtn, sx: Object.assign(Object.assign({}, (props.hightlightBtn === true ? editorToolbarStyles.buttonActive : undefined)), buttonStyles), disableRipple: true, name: translate('bold'), onMouseDown: props.onBoldClick, onKeyDown: (e) => {
                            if (e.key === EventKeys.ENTER) {
                                e === null || e === void 0 ? void 0 : e.preventDefault();
                                handleKeyDown(e, EditorToolbarButtons.BOLD, props.onBoldClick);
                            }
                            if (e.key === EventKeys.TAB && e.shiftKey && props.toggleTextFormatBar) {
                                e.preventDefault();
                                e.stopPropagation();
                                props.toggleTextFormatBar(e);
                            }
                        }, ref: el => (buttonRefs.current[EditorToolbarButtons.BOLD] = el), "data-testid": "bold" }, { children: _jsx(FormatBold, {}) })) })), _jsx(Tooltip, Object.assign({ title: translate('underline') }, { children: _jsx(Button, Object.assign({ "aria-pressed": props.hightlightUnderlineBtn, sx: Object.assign(Object.assign({}, (props.hightlightUnderlineBtn === true ? editorToolbarStyles.buttonActive : undefined)), buttonStyles), disableRipple: true, name: translate('underline'), onMouseDown: props.onUnderLineClick, onKeyDown: (e) => { if (e.key === EventKeys.ENTER) {
                            e === null || e === void 0 ? void 0 : e.preventDefault();
                            handleKeyDown(e, EditorToolbarButtons.UNDERLINE, props.onUnderLineClick);
                        } }, ref: el => (buttonRefs.current[EditorToolbarButtons.UNDERLINE] = el), "data-testid": "underline" }, { children: _jsx(FormatUnderlined, {}) })) })), _jsx(Tooltip, Object.assign({ title: translate('italic') }, { children: _jsx(Button, Object.assign({ "aria-pressed": props.hightlightItalicBtn, sx: Object.assign(Object.assign({}, (props.hightlightItalicBtn === true ? editorToolbarStyles.buttonActive : undefined)), buttonStyles), disableRipple: true, name: translate('italic'), onKeyDown: (e) => { if (e.key === EventKeys.ENTER) {
                            e === null || e === void 0 ? void 0 : e.preventDefault();
                            handleKeyDown(e, EditorToolbarButtons.ITALIC, props.onItalicClick);
                        } }, onMouseDown: props.onItalicClick, ref: el => (buttonRefs.current[EditorToolbarButtons.ITALIC] = el), "data-testid": 'italic' }, { children: _jsx(FormatItalic, {}) })) })), _jsx(Tooltip, Object.assign({ title: translate('bulletedList') }, { children: _jsx(Button, Object.assign({ "aria-pressed": props.hightlightBulletedListBtn, sx: Object.assign(Object.assign({}, (props.hightlightBulletedListBtn === true ? editorToolbarStyles.buttonActive : undefined)), buttonStyles), disableRipple: true, name: translate('bulletedList'), onClick: props.onUnOrderedListClick, onKeyDown: (e) => { if (e.key === EventKeys.ENTER) {
                            e === null || e === void 0 ? void 0 : e.preventDefault();
                            handleKeyDown(e, EditorToolbarButtons.BULLETEDLIST, props.onUnOrderedListClick);
                        } }, ref: el => (buttonRefs.current[EditorToolbarButtons.BULLETEDLIST] = el), "data-testid": 'bulleted-list' }, { children: _jsx(ListRounded, {}) })) })), _jsx(Tooltip, Object.assign({ title: translate('numberedList') }, { children: _jsx(Button, Object.assign({ "aria-pressed": props.hightlightNumberedListBtn, sx: Object.assign(Object.assign({}, (props.hightlightNumberedListBtn === true ? editorToolbarStyles.buttonActive : undefined)), buttonStyles), disableRipple: true, name: translate('numberedList'), onClick: props.onOrderedListClick, onKeyDown: (e) => { if (e.key === EventKeys.ENTER) {
                            e === null || e === void 0 ? void 0 : e.preventDefault();
                            handleKeyDown(e, EditorToolbarButtons.NUMBEREDLIST, props.onOrderedListClick);
                        } }, ref: el => (buttonRefs.current[EditorToolbarButtons.NUMBEREDLIST] = el), "data-testid": "numberedList" }, { children: _jsx(FormatListNumbered, {}) })) })), _jsx(Tooltip, Object.assign({ title: translate('leftAlign') }, { children: _jsx(Button, Object.assign({ "aria-pressed": props.hightlightAlignBtn === 'left', sx: Object.assign(Object.assign({}, (props.hightlightAlignBtn === 'left' ? editorToolbarStyles.buttonActive : undefined)), buttonStyles), disableRipple: true, name: translate('leftAlign'), onClick: props.onLeftAlignClick, onKeyDown: (e) => { if (e.key === EventKeys.ENTER && (props === null || props === void 0 ? void 0 : props.onLeftAlignClick)) {
                            e === null || e === void 0 ? void 0 : e.preventDefault();
                            handleKeyDown(e, EditorToolbarButtons.LEFTALIGN, props.onLeftAlignClick);
                        } }, ref: el => (buttonRefs.current[EditorToolbarButtons.LEFTALIGN] = el), "data-testid": 'left-align' }, { children: _jsx(CcfAlignLeftIcon, {}) })) })), _jsx(Tooltip, Object.assign({ title: translate('centerAlign') }, { children: _jsx(Button, Object.assign({ "aria-pressed": props.hightlightAlignBtn === 'center', sx: Object.assign(Object.assign({}, (props.hightlightAlignBtn === 'center' ? editorToolbarStyles.buttonActive : undefined)), buttonStyles), disableRipple: true, name: translate('centerAlign'), onClick: props.onCenterAlignClick, onKeyDown: (e) => { if (e.key === EventKeys.ENTER && (props === null || props === void 0 ? void 0 : props.onCenterAlignClick)) {
                            e === null || e === void 0 ? void 0 : e.preventDefault();
                            handleKeyDown(e, EditorToolbarButtons.CENTERALIGN, props.onCenterAlignClick);
                        } }, ref: el => (buttonRefs.current[EditorToolbarButtons.CENTERALIGN] = el), "data-testid": 'center-align' }, { children: _jsx(CcfAlignCenterIcon, {}) })) })), _jsx(Tooltip, Object.assign({ title: translate('rightAlign') }, { children: _jsx(Button, Object.assign({ "aria-pressed": props.hightlightAlignBtn === 'right', sx: Object.assign(Object.assign({}, (props.hightlightAlignBtn === 'right' ? editorToolbarStyles.buttonActive : undefined)), buttonStyles), disableRipple: true, name: translate('rightAlign'), onClick: props.onRightAlignClick, onKeyDown: (e) => { if (e.key === EventKeys.ENTER && (props === null || props === void 0 ? void 0 : props.onRightAlignClick)) {
                            e === null || e === void 0 ? void 0 : e.preventDefault();
                            handleKeyDown(e, EditorToolbarButtons.RIGHTALIGN, props.onRightAlignClick);
                        } }, ref: el => (buttonRefs.current[EditorToolbarButtons.RIGHTALIGN] = el), "data-testid": 'right-align' }, { children: _jsx(CcfAlignRightIcon, {}) })) })), _jsx(Tooltip, Object.assign({ title: translate('textColor') }, { children: _jsx(Button, Object.assign({ "aria-haspopup": 'dialog', "aria-expanded": !!textColorButtonRef.current, sx: buttonStyles, disableRipple: true, onKeyDown: (e) => { var _a; if (e.key === EventKeys.ENTER) {
                            (_a = textColorButtonRef === null || textColorButtonRef === void 0 ? void 0 : textColorButtonRef.current) === null || _a === void 0 ? void 0 : _a.click();
                            props.setIsColorpickerOpen && props.setIsColorpickerOpen();
                        } }, ref: el => (buttonRefs.current[EditorToolbarButtons.TEXTCOLOR] = el), "data-testid": "text-color" }, { children: _jsx(CcfColorPicker, Object.assign({ onSelect: (id, group) => props.onColorSelect(id, group), group: TEXT_COLOR_GROUP, resetLabel: translate('resetColor'), ref: textColorButtonRef, onEscape: () => { var _a; return (_a = buttonRefs === null || buttonRefs === void 0 ? void 0 : buttonRefs.current[EditorToolbarButtons.TEXTCOLOR]) === null || _a === void 0 ? void 0 : _a.focus(); } }, { children: _jsx(CcfTextColorIcon, {}) })) }), 'textColor') })), _jsx(Tooltip, Object.assign({ title: translate('backgroundColor') }, { children: _jsx(Button, Object.assign({ "aria-haspopup": 'dialog', "aria-expanded": !!highlightColorButtonRef.current, sx: buttonStyles, name: translate('backgroundColor'), disableRipple: true, onKeyDown: (e) => { var _a; if (e.key === EventKeys.ENTER) {
                            (_a = highlightColorButtonRef === null || highlightColorButtonRef === void 0 ? void 0 : highlightColorButtonRef.current) === null || _a === void 0 ? void 0 : _a.click();
                            props.setIsColorpickerOpen && props.setIsColorpickerOpen();
                        } }, "data-testid": "bg-color", ref: el => (buttonRefs.current[EditorToolbarButtons.BACKGROUNDCOLOR] = el) }, { children: _jsx(CcfColorPicker, Object.assign({ onSelect: (id, group) => props.onColorSelect(id, group), group: HIGHLIGHT_COLOR_GROUP, resetLabel: translate('resetHighlight'), ref: highlightColorButtonRef, onEscape: () => { var _a; return (_a = buttonRefs === null || buttonRefs === void 0 ? void 0 : buttonRefs.current[EditorToolbarButtons.BACKGROUNDCOLOR]) === null || _a === void 0 ? void 0 : _a.focus(); } }, { children: _jsx(CcfBackGroundColorIcon, {}) })) })) })), _jsx(Tooltip, Object.assign({ title: translate('fontFamily') }, { children: _jsx(Button, Object.assign({ "aria-haspopup": 'listbox', sx: buttonStyles, style: { background: 'none', color: '#424242' }, disableRipple: true, "aria-expanded": open ? 'true' : undefined, disableElevation: true, onClick: (e) => { setAnchorEl(e === null || e === void 0 ? void 0 : e.currentTarget); }, onKeyDown: (e) => { if (e.key === EventKeys.ENTER)
                            setAnchorEl(e === null || e === void 0 ? void 0 : e.currentTarget); }, endIcon: _jsx(KeyboardArrowDownIcon, {}), "data-testid": "font-style" }, { children: _jsx(FontDownloadIcon, { style: { fontSize: '20px', marginRight: '-4px' } }) })) })), _jsx(Menu, Object.assign({ id: "lock-menu", anchorEl: anchorEl, open: open, onClose: () => { setAnchorEl(null); }, MenuListProps: { 'aria-labelledby': 'lock-button', role: 'listbox' }, "data-testid": "lock-menu" }, { children: options.map((option, index) => (_jsx(MenuItem, Object.assign({ style: customStyleMap[option.value], "aria-selected": index === selectedFontIndex, selected: index === selectedFontIndex, onClick: () => handleMenuItemClick(index), "data-testid": `font-style-${index}` }, { children: option === null || option === void 0 ? void 0 : option.label }), option.label))) })), _jsx(Tooltip, Object.assign({ title: translate('fontSize') }, { children: _jsx(Button, Object.assign({ "aria-haspopup": 'listbox', sx: buttonStyles, disableRipple: true, "aria-expanded": openFontSize ? 'true' : undefined, disableElevation: true, onClick: (e) => { setAnchorElFS(e.currentTarget); }, onKeyDown: (e) => { if (e.key === EventKeys.ENTER)
                            setAnchorElFS(e.currentTarget); }, endIcon: _jsx(KeyboardArrowDownIcon, {}), "data-testid": "font-size" }, { children: _jsx(TextFieldsIcon, { style: { fontSize: '20px', marginRight: '-4px' } }) })) })), _jsx(Menu, Object.assign({ id: "font-size-menu", anchorEl: anchorElFS, open: openFontSize, onClose: () => { setAnchorElFS(null); }, MenuListProps: { 'aria-labelledby': 'font-size-button', role: 'listbox' } }, { children: optionsFontSize.map((option, index) => (_jsx(MenuItem, Object.assign({ style: customStyleMap[option.value], "aria-selected": index === selectedSizeIndex, selected: index === selectedSizeIndex, onClick: () => handleMenuItemClickFontSize(index), "data-testid": `font-size-${index}` }, { children: translate(option === null || option === void 0 ? void 0 : option.value) }), option.value))) })), props.displayNewEmailButtons && _jsx(CcfTooltip, Object.assign({ title: translate('textDirectionltr') }, { children: _jsx(Button, Object.assign({ role: "button", "aria-pressed": (props.highlightDirectionBtn === RICH_TOOLBAR_BUTTONS.LTR), size: 'small', sx: Object.assign(Object.assign(Object.assign({}, buttonStyles), ((props.highlightDirectionBtn === RICH_TOOLBAR_BUTTONS.LTR) ? styles.buttonActive : {})), (styles.focussedElement || {})), disableRipple: true, name: translate('textDirectionrtl'), onClick: () => props.applyDirection && props.applyDirection(RICH_TOOLBAR_BUTTONS.LTR, RICH_TOOLBAR_BUTTONS.LEFT_ALIGN), onKeyDown: (e) => { if (e.key === EventKeys.ENTER && props.applyDirection) {
                            e === null || e === void 0 ? void 0 : e.preventDefault();
                            handleKeyDown(e, EditorToolbarButtons.TEXTDIRECTIONLTR, () => props.applyDirection && props.applyDirection(RICH_TOOLBAR_BUTTONS.LTR, RICH_TOOLBAR_BUTTONS.LEFT_ALIGN));
                        } }, ref: el => (buttonRefs.current[EditorToolbarButtons.TEXTDIRECTIONLTR] = el), "data-testid": 'ltr' }, { children: _jsx(FormatTextdirectionLToR, {}) })) })), props.displayNewEmailButtons && _jsx(CcfTooltip, Object.assign({ title: translate('textDirectionrtl') }, { children: _jsx(Button, Object.assign({ role: "button", "aria-pressed": (props.highlightDirectionBtn === RICH_TOOLBAR_BUTTONS.RTL), size: 'small', sx: Object.assign(Object.assign(Object.assign({}, buttonStyles), ((props.highlightDirectionBtn === RICH_TOOLBAR_BUTTONS.RTL) ? styles.buttonActive : {})), (styles.focussedElement || {})), disableRipple: true, name: translate('textDirectionrtl'), onClick: () => props.applyDirection && props.applyDirection(RICH_TOOLBAR_BUTTONS.RTL, RICH_TOOLBAR_BUTTONS.RIGHT_ALIGN), onKeyDown: (e) => { if (e.key === EventKeys.ENTER && props.applyDirection) {
                            e === null || e === void 0 ? void 0 : e.preventDefault();
                            handleKeyDown(e, EditorToolbarButtons.TEXTDIRECTIONRTL, () => props.applyDirection && props.applyDirection(RICH_TOOLBAR_BUTTONS.RTL, RICH_TOOLBAR_BUTTONS.RIGHT_ALIGN));
                        }
                        else if (e.key === EventKeys.TAB && props.toggleTextFormatBar) {
                            e.preventDefault();
                            e.stopPropagation();
                            props.toggleTextFormatBar(e);
                        } }, ref: el => (buttonRefs.current[EditorToolbarButtons.TEXTDIRECTIONRTL] = el), "data-testid": 'rtl' }, { children: _jsx(FormatTextdirectionRToL, {}) })) }))] });
    };
    return (props.displayNewEmailButtons ? _jsx(CcfBox, Object.assign({ sx: editorToolbarStyles.toolbarContainer, "data-testid": "ccf-editor-toolbar" }, { children: getToolbarButtons() })) : getToolbarButtons());
}
export default memo(CcfEditorToolbar);
//# sourceMappingURL=ccf-editor-toolbar.js.map