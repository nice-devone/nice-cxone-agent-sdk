import { __rest } from "tslib";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Popover from '@mui/material/Popover';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useMediaQuery, useTheme } from '@mui/material';
import { useTranslator } from '../../ccf-translator/ccf-translator';
import { CcfTooltip } from '../ccf-tooltip/ccf-tooltip';
import CcfButtonListStyles from './ccf-button-list-styles';
import CcfLogoutIcon from '../../icons/ccf-logout-icon/ccf-logout-icon';
/**
 * Component used to display Button
 * @param items - List of buttons
 * @param controlWidth - control width
 * @param iconTooltipTranslationKey - tooltip for the down arrow icon
 * @example <CcfButtonList />
 * @returns  Button
 */
export function CcfButtonList(_a) {
    var { items, controlWidth, iconTooltipTranslationKey } = _a, other = __rest(_a, ["items", "controlWidth", "iconTooltipTranslationKey"]);
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const width = `calc(${controlWidth} + 40px)`;
    const theme = useTheme();
    const [translate] = useTranslator();
    const buttonLabel = translate(items[selectedIndex].labelTranslationKey);
    const isSmView = useMediaQuery(theme.breakpoints.down('md'));
    const styles = CcfButtonListStyles(theme);
    /**
     * Function to close the popover
     * @example handleClosePopover()
     */
    const handleClosePopover = () => {
        setAnchorEl(null);
    };
    /**
     * Function to open the popover
     * @example handleCallbackIconClick()
     */
    const handleCallbackIconClick = () => {
        items[selectedIndex].action();
    };
    /**
     *
     * @param control - contactButtons
     * @param event -React.MouseEvent
     * @example -   onContactControlClick('mask', event)
    */
    const handleToggle = (event) => {
        setAnchorEl(event.currentTarget.parentElement);
    };
    /**
     *
     * @param control - contactButtons
     * @param event -React.MouseEvent
     * @example -   onContactControlClick('mask', event)
    */
    const handleButtonItemClick = (index) => {
        setSelectedIndex(index);
        items[index].action();
        setAnchorEl(null);
    };
    return (_jsxs(_Fragment, { children: [_jsxs(ButtonGroup, Object.assign({ variant: "contained", "aria-label": "Button Group", sx: { height: isSmView ? '20px' : 'auto' } }, other, { children: [_jsx(CcfTooltip, Object.assign({ title: buttonLabel, arrow: true }, { children: _jsx(Button, Object.assign({ sx: [styles.iconStyle, (isSmView && styles.smallIcon)], size: "small", onClick: () => handleCallbackIconClick(), "data-testid": 'button-list' }, { children: _jsx(CcfLogoutIcon, { fill: theme.palette.text.white }) })) })), _jsx(CcfTooltip, Object.assign({ title: translate(iconTooltipTranslationKey), arrow: true }, { children: _jsx(Button, Object.assign({ sx: Object.assign(Object.assign({}, styles.iconStyle), styles.downArrowIcon), size: "small", onClick: (event) => handleToggle(event), "data-testid": 'button-list-arrow', "aria-controls": open ? 'button-list-menu' : undefined, "aria-expanded": open ? 'true' : 'false', "aria-haspopup": "menu" }, other, { children: _jsx(KeyboardArrowDownIcon, {}) })) }))] })), _jsx(Popover, Object.assign({ open: open, onClose: () => handleClosePopover(), anchorEl: anchorEl, sx: { marginLeft: { xs: '5px', xl: '0' } }, transformOrigin: {
                    vertical: 'top',
                    horizontal: 'center',
                }, anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'center',
                } }, { children: _jsx(MenuList, Object.assign({ id: "button-list-menu", autoFocusItem: true, sx: { border: 1, borderColor: theme.palette.primary.main, width }, "data-testid": 'button-menu-list' }, { children: items.map((item, index) => (_jsx(MenuItem, Object.assign({ selected: index === selectedIndex, sx: { fontSize: 'small' }, onClick: () => handleButtonItemClick(index), disabled: item.isDisable }, { children: translate(item.labelTranslationKey) }), item.labelTranslationKey))) })) }))] }));
}
export default CcfButtonList;
//# sourceMappingURL=ccf-button-list.js.map