import { __rest } from "tslib";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React, { useEffect, useRef } from 'react';
import { Popover, Typography, MenuList, MenuItem, ListItemIcon, ListItemText, IconButton, useTheme, Divider, } from '@mui/material';
import { CcfOverflowIcon } from '../../icons/ccf-overflow-icon/ccf-overflow-icon';
import { CcfTooltip } from '../ccf-tooltip/ccf-tooltip';
import { useTranslator } from '../../ccf-translator/ccf-translator';
import ccfPopOverStyles from './ccf-pop-over.style';
/**
 * component to display popover
 * @param param0 - CcfPopOverProps
 * @example <CcfPopOver />
 */
export function CcfPopOver(_a) {
    var { buttonSx = [], disableTooltip, optionList, onPopOverItemSelection, navigateToInitialPopOverState, iconComponent = _jsx(CcfOverflowIcon, {}), endIconComponent, labelComponent, anchorOrigin = { vertical: 'center', horizontal: 'right' }, transformOrigin = { vertical: 'top', horizontal: 'right' }, style, itemToolTips, tooltipTitle, disableChildTab, setShowTooltip, tooltipPlacement = 'right-end', popOverRightIconStyles, showHoverBackground = true, tooltipArrow, isQuickAppLaunchMenu, focusLaunchButton, setLaunchButtonClickStatus, popOverMenuItemExtraStyles, propogateOnClickEvent = true } = _a, rest = __rest(_a, ["buttonSx", "disableTooltip", "optionList", "onPopOverItemSelection", "navigateToInitialPopOverState", "iconComponent", "endIconComponent", "labelComponent", "anchorOrigin", "transformOrigin", "style", "itemToolTips", "tooltipTitle", "disableChildTab", "setShowTooltip", "tooltipPlacement", "popOverRightIconStyles", "showHoverBackground", "tooltipArrow", "isQuickAppLaunchMenu", "focusLaunchButton", "setLaunchButtonClickStatus", "popOverMenuItemExtraStyles", "propogateOnClickEvent"]);
    const theme = useTheme();
    const popOverStyle = ccfPopOverStyles(theme);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    const [translate] = useTranslator();
    const launchMenuRef = useRef(null);
    useEffect(() => {
        var _a;
        if (focusLaunchButton && launchMenuRef.current && isQuickAppLaunchMenu) {
            (_a = launchMenuRef.current) === null || _a === void 0 ? void 0 : _a.click();
            setLaunchButtonClickStatus && setLaunchButtonClickStatus(false);
        }
    }, [focusLaunchButton]);
    /**
     * Function to open pop over menu
     * @param event - any
     * @example openPopOverMenu(event)
     */
    const openPopOverMenu = (event) => {
        setAnchorEl(event.currentTarget);
        navigateToInitialPopOverState && navigateToInitialPopOverState(event);
        if (!propogateOnClickEvent) {
            event.stopPropagation();
        }
    };
    /**
     * Function to close popover
     * @example onClose()
     */
    const onClose = () => {
        setAnchorEl(null);
    };
    /**
     * Function to close popover
     * @example setTooltipFlag()
     */
    const setTooltipFlag = () => {
        setShowTooltip && setShowTooltip(false);
    };
    /**
     *
     * @param item - any
     * @param e - React.MouseEvent
     * @example onItemSelection(item,e)
     */
    function onItemSelection(item, e, anchorEl) {
        onPopOverItemSelection(item, e, anchorEl)(item);
        item.closeOnSelection && onClose();
    }
    const tooltipKey = tooltipTitle === 'launch' ? 'indicator' : null;
    tooltipTitle = tooltipTitle ? tooltipTitle : 'popOut';
    return (_jsxs(_Fragment, { children: [_jsx(CcfTooltip, Object.assign({ title: translate(tooltipTitle), arrow: tooltipArrow, placement: tooltipPlacement, disableHoverListener: disableTooltip }, { children: _jsxs(IconButton, Object.assign({ "data-testid": "ccf-popover-button", ref: isQuickAppLaunchMenu ? launchMenuRef : null, "aria-haspopup": "true", onClick: openPopOverMenu, color: 'secondary', tabIndex: disableChildTab ? -1 : 0, sx: [
                        Object.assign(Object.assign({ padding: 0, width: labelComponent ? '100%' : '24px', minWidth: 'auto', '&.MuiButtonBase-root:hover': { bgcolor: showHoverBackground ? 'secondary' : 'transparent' } }, popOverStyle.popOverOverflow), popOverRightIconStyles),
                        ...(Array.isArray(buttonSx) ? buttonSx : [buttonSx])
                    ], "aria-label": translate(tooltipTitle) }, { children: [iconComponent, labelComponent, endIconComponent] })) }), tooltipKey), _jsx(Popover, Object.assign({ id: id, open: open, role: 'menu', anchorEl: anchorEl, onClose: onClose, anchorOrigin: anchorOrigin, transformOrigin: transformOrigin, style: style, onMouseEnter: setTooltipFlag }, rest, { children: _jsxs(Typography, Object.assign({ id: "popOver", sx: popOverStyle.ccfPopOver }, { children: [optionList.popOverHeader && (_jsx("div", Object.assign({ className: "flexDisplay header" }, { children: _jsx("div", Object.assign({ className: "flexDisplay" }, { children: _jsx("span", Object.assign({ className: "headerTitle" }, { children: optionList.popOverHeader })) })) }))), optionList.menuItems.map((parentItem, index) => {
                            var _a;
                            return (
                            /*  ParentItem ia an array of object and contains
                             * no properties which can be used as unqiue key */
                            // eslint-disable-next-line react/jsx-key
                            _jsx(MenuList, Object.assign({ sx: popOverStyle.popOverMain }, { children: (_a = parentItem.items) === null || _a === void 0 ? void 0 : _a.map((childItem, index) => (_jsxs(_Fragment, { children: [_jsxs(MenuItem, Object.assign({ className: "flexDisplay", sx: popOverMenuItemExtraStyles ? [popOverStyle.popOverOptions, popOverMenuItemExtraStyles] : popOverStyle.popOverOptions, onClick: (e) => onItemSelection(childItem, e, anchorEl), disabled: childItem.disabled, "data-testId": `popover-menu-item-${index}`, tabIndex: 0, role: 'menuitem' }, { children: [childItem.icon && (_jsx(ListItemIcon, Object.assign({ className: "popOverActionIconWrapper" }, { children: childItem.icon }))), itemToolTips ? (_jsx(CcfTooltip, Object.assign({ title: typeof childItem.toolTip === 'string'
                                                        ? childItem.toolTip
                                                        : '', placement: tooltipPlacement }, { children: _jsx(ListItemText, Object.assign({ className: "popOverActionLabelWrapper" }, { children: _jsx("span", Object.assign({ className: "popOverActionLabel", role: 'button' }, { children: childItem.translationKey ? translate(childItem.translationKey) : childItem.label })) })) }))) : (_jsx(ListItemText, Object.assign({ className: "popOverActionLabelWrapper" }, { children: _jsx("span", Object.assign({ className: "popOverActionLabel", role: 'button' }, { children: childItem.translationKey ? translate(childItem.translationKey) : childItem.label })) })))] }), childItem.id), (childItem === null || childItem === void 0 ? void 0 : childItem.isDividerEnabled) && _jsx(Divider, { style: popOverStyle.divider, component: 'li' })] }))) })));
                        })] })) }))] }));
}
export default CcfPopOver;
//# sourceMappingURL=ccf-pop-over.js.map