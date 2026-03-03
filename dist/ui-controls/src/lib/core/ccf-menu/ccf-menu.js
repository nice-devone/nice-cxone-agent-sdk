import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React, { useRef } from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Grid, Divider, useTheme } from '@mui/material';
import { CcfTypography } from '../ccf-typography/ccf-typography';
import ColumnStyles from './ccf-menu.style';
const ITEM_HEIGHT = 48;
const MAX_ITEMS = 4.5;
/**
 * Menu control used to display list of items and action can be triggered on clicking them
 * @returns
 * @example
 * ```
 * <CcfMenu
    options={options}
    handleMenuSelection={handleMenuSelection}
    menuItemStyles={menuItemStyles.menuItemContent}
    menuTextStyles={menuItemStyles.menuItemNameBold}
    />
 * ```
 */
export const CcfMenu = ({ options, handleMenuSelection, menuItemStyles, menuTextStyles, moreIconStyles, menuStyles, }) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const longButtonRef = useRef(null);
    /**
     * Used to open the menu when clicked on the dot icon
     * @param event - mouse event
     * @example
     * handleClick(e)
     */
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const theme = useTheme();
    const styles = ColumnStyles(theme);
    /**
     * Used to handle the menu item selection
     * @param menuItemName - name of the menu item selected
     * @example
     * handleMenuItemClick(menuItemName)
     */
    const handleMenuItemClick = (menuItemName) => {
        setAnchorEl(null);
        handleMenuSelection(menuItemName, longButtonRef);
    };
    return (_jsxs("div", Object.assign({ style: menuStyles !== null && menuStyles !== void 0 ? menuStyles : {} }, { children: [_jsx(IconButton, Object.assign({ "aria-label": "more", id: "long-button", "aria-controls": open ? 'long-menu' : undefined, "aria-expanded": open ? 'true' : undefined, "aria-haspopup": "true", onClick: handleClick, sx: { padding: 0 }, ref: longButtonRef }, { children: _jsx(MoreVertIcon, { sx: moreIconStyles !== null && moreIconStyles !== void 0 ? moreIconStyles : null }) })), _jsx(Menu, Object.assign({ id: "long-menu", MenuListProps: {
                    'aria-labelledby': 'long-button',
                }, anchorEl: anchorEl, open: open, onClose: handleMenuItemClick, PaperProps: {
                    style: {
                        maxHeight: ITEM_HEIGHT * MAX_ITEMS,
                        width: 'auto',
                    },
                } }, { children: options
                    .filter((opt) => (opt === null || opt === void 0 ? void 0 : opt.isActive) !== false)
                    .map((option) => {
                    var _a;
                    return (_jsxs(_Fragment, { children: [_jsx(MenuItem, Object.assign({ "data-testid": `option-${option === null || option === void 0 ? void 0 : option.name}`, onClick: () => handleMenuItemClick(option === null || option === void 0 ? void 0 : option.name), sx: [styles === null || styles === void 0 ? void 0 : styles.focussedElement, styles === null || styles === void 0 ? void 0 : styles.focussedBackground], tabIndex: 0 }, { children: _jsxs(Grid, Object.assign({ container: true, spacing: 2, sx: menuItemStyles }, { children: [_jsx(Grid, Object.assign({ item: true, sx: (_a = option === null || option === void 0 ? void 0 : option.menuIconStyles) !== null && _a !== void 0 ? _a : null }, { children: option === null || option === void 0 ? void 0 : option.icon })), _jsx(Grid, Object.assign({ item: true, style: (option === null || option === void 0 ? void 0 : option.menuTextContainerStyles) && Object.assign({}, option === null || option === void 0 ? void 0 : option.menuTextContainerStyles) }, { children: _jsx(CcfTypography, { sx: menuTextStyles, translationKey: option === null || option === void 0 ? void 0 : option.name }) }))] })) }), option === null || option === void 0 ? void 0 : option.name), (option === null || option === void 0 ? void 0 : option.addBreakLine) && _jsx(Divider, {})] }));
                }) }))] })));
};
//# sourceMappingURL=ccf-menu.js.map