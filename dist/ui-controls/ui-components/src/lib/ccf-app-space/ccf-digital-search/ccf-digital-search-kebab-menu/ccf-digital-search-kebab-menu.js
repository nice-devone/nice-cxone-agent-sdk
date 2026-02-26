import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { CcfBox, CcfMenu, useTranslator } from '@nice-devone/ui-controls';
import { ccfDigitalSearchActions, getCustomizeMenuElement } from '../ccf-digital-search.slice';
import { useTheme, Button, useMediaQuery } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getAppspaceResolution } from '../../ccf-app-space.slice';
import CcfInteractionMenuStyles from '../../../ccf-interaction-space/ccf-interaction-menu/ccf-interaction-menu-styles';
import CcfDigitalSearchStyle from '../ccf-digital-search-styles';
import CcfIcon from '../../../ccf-icon/ccf-icon';
/**
 * Component for rendering a kebab menu with options
 * @returns JSX.Element - The JSX for the component
 * @example <CcfDigitalSearchKebabMenu/>
 */
const CcfDigitalSearchKebabMenu = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const isSmView = useMediaQuery(theme.breakpoints.down('xl'));
    const anchorEl = useSelector(getCustomizeMenuElement);
    const open = Boolean(anchorEl);
    const styles = CcfDigitalSearchStyle(theme);
    const menuItemStyles = CcfInteractionMenuStyles(theme);
    const renderTwoColumnDesign = useSelector(getAppspaceResolution);
    const [translate] = useTranslator();
    const menuName = translate('columns');
    const menuOptions = [{ name: translate('columns') }];
    /**
     * Handles the selection of a menu item
     * @param menuItem - The selected menu item
     * @param buttonRef - The ref pointing to the selected item
     * @example handleMenuSelection('customize',Ref)
     */
    const handleMenuSelection = (menuItem, buttonRef) => {
        if (menuItem === menuName) {
            dispatch(ccfDigitalSearchActions.updateCustomizeMenuElement(buttonRef.current));
        }
    };
    // JSX for kebab menu option
    const kebabMenuOption = (_jsx(CcfBox, { children: _jsx(CcfMenu, { options: menuOptions, handleMenuSelection: handleMenuSelection, menuItemStyles: menuItemStyles.menuItemContent, menuTextStyles: menuItemStyles.menuItemNameBold }) }));
    return (_jsxs(_Fragment, { children: [!renderTwoColumnDesign ?
                _jsx(CcfBox, Object.assign({ sx: styles.smKebabMenu }, { children: kebabMenuOption })) : '', _jsxs(CcfBox, Object.assign({ sx: styles.kebabMenuBtnWrapper }, { children: [!isSmView && renderTwoColumnDesign && (_jsxs(Button, Object.assign({ variant: "outlined", size: "small", sx: [styles.kebabMenuBtn, styles === null || styles === void 0 ? void 0 : styles.focussedElement], disableRipple: true, id: "customize-button", "aria-controls": open ? 'customizable-columns' : undefined, "aria-expanded": open ? 'true' : undefined, "aria-haspopup": "true", onClick: (e) => dispatch(ccfDigitalSearchActions.updateCustomizeMenuElement(e.currentTarget)) }, { children: [_jsx(CcfIcon, { iconName: "columns", size: "XS", customStyle: styles.columnIcon }), menuName] }))), isSmView && renderTwoColumnDesign && kebabMenuOption] }))] }));
};
export default CcfDigitalSearchKebabMenu;
//# sourceMappingURL=ccf-digital-search-kebab-menu.js.map