import { __rest } from "tslib";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React, { memo } from 'react';
import Popover from '@mui/material/Popover';
import { Box, IconButton, Menu, MenuItem, Typography, useTheme } from '@mui/material';
import { Close } from '@mui/icons-material';
import { CcfOverflowIcon } from '../../icons/ccf-overflow-icon/ccf-overflow-icon';
import { CcfCollapsePanelIcon } from '../../icons/ccf-collapse-panel-icon/ccf-collapse-panel-icon';
import { CcfNewWindowIcon } from '../../icons/ccf-new-window-icon/ccf-new-window-icon';
import { CcfTooltip } from '../ccf-tooltip/ccf-tooltip';
import { useTranslator } from '../../ccf-translator/ccf-translator';
import ccfHeaderStyle from './ccf-header.styles';
import MenuIcon from '@mui/icons-material/Menu';
/**
 *
 * @param headerText - Text to be displayed inside the Header Title
 * @param RightIcon - Icon to be displayed in the left side of the Header
 * @param PopoverContent - Content to be displayed inside the
 * @param headerTextClassess - Classes to be applied on the Header Text
 * @example <CCfHeader />
 * @returns CcfHeader Component
 */
export function CcfHeader(_a) {
    var _b;
    var { children, headerText, HeaderWithTab, HeaderWithBookmark, tabList, LeftIcon, showDragIcon, RightIcon, PopoverContent, PopoverContentProps, headerTextClassess, direction, sx, isappspace } = _a, rest = __rest(_a, ["children", "headerText", "HeaderWithTab", "HeaderWithBookmark", "tabList", "LeftIcon", "showDragIcon", "RightIcon", "PopoverContent", "PopoverContentProps", "headerTextClassess", "direction", "sx", "isappspace"]);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const theme = useTheme();
    const headerStyle = ccfHeaderStyle(theme, direction, LeftIcon);
    // /**
    //  * 
    //  * @param event - any
    //  * @example handleClick(event)
    //  */
    // const handleClick = (event: any) => {
    //   setAnchorEl(event.currentTarget);
    // };
    /**
     * Function to handle close
     * @example handleClose()
     */
    const handleClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    const [translate] = useTranslator();
    return _jsxs(_Fragment, { children: [_jsxs(Box, Object.assign({ sx: [headerStyle.container, HeaderWithTab ? headerStyle.headerTabBackground : {}] }, { children: [_jsxs("div", { children: [_jsx(Box, { sx: { padding: '0.188rem' } }), LeftIcon !== undefined ? LeftIcon : null, HeaderWithTab ? (HeaderWithTab) : (_jsx(Typography, Object.assign({ variant: "h4", "aria-label": headerText === null || headerText === void 0 ? void 0 : headerText.toString(), sx: [
                                    headerStyle.headerTitle,
                                    ...(Array.isArray(headerStyle.contentWrap)
                                        ? headerStyle.contentWrap
                                        : [headerStyle.contentWrap]),
                                    ...(sx ? [sx] : [])
                                ], "aria-live": (_b = rest.ariaLive) !== null && _b !== void 0 ? _b : 'off' }, { children: headerText })))] }), RightIcon ? (_jsx("div", { children: _jsxs(Box, Object.assign({ component: 'div', sx: headerStyle.popOver }, { children: [_jsx(CcfTooltip, Object.assign({ title: translate('more'), arrow: true }, { children: _jsx("div", Object.assign({ role: "presentation", onClick: rest.handleRightIconClick, id: rest.id }, { children: _jsx(IconButton, Object.assign({ "aria-label": translate('moreOptionInAppspace'), "aria-haspopup": "true", sx: Object.assign(Object.assign({}, headerStyle.popOverOverflow), { '& svg': { color: theme => { var _a, _b; return (_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.text) === null || _b === void 0 ? void 0 : _b.filter; } } }), size: "large" }, { children: isappspace ? _jsx(MenuIcon, {}) : _jsx(CcfOverflowIcon, {}) })) })) })), PopoverContent !== undefined ? (_jsxs(Popover, Object.assign({ id: id, open: open, keepMounted: true, anchorEl: anchorEl, onClose: handleClose, anchorOrigin: {
                                        vertical: 'bottom',
                                        horizontal: 'right',
                                    }, transformOrigin: {
                                        vertical: 'top',
                                        horizontal: 'right',
                                    } }, { children: [(PopoverContentProps === null || PopoverContentProps === void 0 ? void 0 : PopoverContentProps.dismissable) && (_jsx(IconButton, Object.assign({ onClick: handleClose, size: "small", sx: headerStyle.popOverDismissButton }, { children: _jsx(Close, { sx: headerStyle.popOverDismissButtonIcon }) }))), PopoverContent] }))) : (_jsxs(Menu, Object.assign({ id: "simple-menu", anchorEl: anchorEl, keepMounted: true, open: Boolean(anchorEl), onClose: handleClose, anchorOrigin: {
                                        vertical: 'bottom',
                                        horizontal: 'right',
                                    }, transformOrigin: {
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }, sx: headerStyle.menu }, { children: [_jsxs(MenuItem, Object.assign({ onClick: handleClose, sx: headerStyle.menuItem }, { children: [_jsx(CcfCollapsePanelIcon, { sx: headerStyle.minimizePanelIcon }), ' ', _jsxs(Box, Object.assign({ component: 'span', sx: headerStyle.minimizePanelLabel }, { children: [' ', translate('minimizePanel')] }))] })), _jsxs(MenuItem, Object.assign({ onClick: handleClose, sx: headerStyle.menuItem }, { children: [_jsx(CcfNewWindowIcon, { sx: headerStyle.browserWindowIcon }), ' ', _jsxs(Box, Object.assign({ component: 'span', sx: headerStyle.browserLabel }, { children: [' ', translate('newBrowserWindow')] }))] }))] })))] })) })) : null] })), _jsx("div", { children: HeaderWithBookmark })] });
}
CcfHeader.defaultProps = {
    headerTextClassess: '',
};
export default memo(CcfHeader);
//# sourceMappingURL=ccf-header.js.map