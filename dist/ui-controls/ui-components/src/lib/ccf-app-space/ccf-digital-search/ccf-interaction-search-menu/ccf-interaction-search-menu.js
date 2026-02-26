import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { memo } from 'react';
import { useDispatch } from 'react-redux';
import { Box, IconButton, Menu, MenuItem, useTheme, Grid, } from '@mui/material';
import { MoreVert, } from '@mui/icons-material';
import { CcfTypography, CcfTooltip, useTranslator } from '@nice-devone/ui-controls';
import { LocalStorageHelper, StorageKeys } from '@nice-devone/core-sdk';
import CcfInteractionSearchMenuStyles from './ccf-interaction-search-menu-styles';
import { assignDigitalContact, ccfDigitalSearchActions } from '../ccf-digital-search.slice';
import useLVAppSpacePermission from '../../../lv-app-space/hooks/useLVAppSpacePermission';
import { setLvCurrentInteraction } from '../../../lv-app-space/lv-app-space.slice';
export var CcfInteractionSearchMenuAction;
(function (CcfInteractionSearchMenuAction) {
    CcfInteractionSearchMenuAction[CcfInteractionSearchMenuAction["contactInfo"] = 0] = "contactInfo";
    CcfInteractionSearchMenuAction[CcfInteractionSearchMenuAction["assigntoMe"] = 1] = "assigntoMe";
})(CcfInteractionSearchMenuAction || (CcfInteractionSearchMenuAction = {}));
/**
 * Component displays kebab menu for interaction search space
 * @returns Kebab menu for interaction search space
 * ```
 * @example
 * <CcfInteractionSearchMenu/>
 * ```
 */
export function CcfInteractionSearchMenu(props) {
    const theme = useTheme();
    const toastId = React.useRef('');
    const styles = CcfInteractionSearchMenuStyles(theme);
    const { details } = props;
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const dispatch = useDispatch();
    const { isLvCustomerCardEnabled } = useLVAppSpacePermission();
    const [translate] = useTranslator();
    const options = [
        {
            name: (_jsx(CcfTypography, { sx: styles.menuItemNameBold, translationKey: 'contactInfo' })),
            action: CcfInteractionSearchMenuAction.contactInfo,
        },
        {
            name: (_jsx(CcfTypography, { sx: styles.menuItemNameBold, translationKey: 'assignToMe' })),
            action: CcfInteractionSearchMenuAction.assigntoMe,
        }
    ];
    /**
     * openKebabMenu to handle click event
     * @param event -Mouse event
     * @example openKebabMenu(event);
     */
    const openKebabMenu = (event) => {
        event.stopPropagation(); // to stop the event propagation to the grid row when the kebab icon is clicked
        setAnchorEl(event.currentTarget);
        dispatch(ccfDigitalSearchActions.setcurrentCustomerContactInfo({ customerId: '', caseId: '' }));
    };
    /**
     * closeKebabMenu to handle close event
     * @example closeKebabMenu();
     */
    const closeKebabMenu = () => {
        setAnchorEl(null);
    };
    /**
     * digitalKebabMenuSelectionHandler to handle events
     * @example digitalKebabMenuSelectionHandler(event);
     */
    const digitalKebabMenuSelectionHandler = (action) => {
        var _a, _b;
        const currentCxoneUser = LocalStorageHelper.getItem(StorageKeys.USER_INFO, true);
        switch (action) {
            case CcfInteractionSearchMenuAction.assigntoMe:
                dispatch(assignDigitalContact({ selectedContactIds: [details === null || details === void 0 ? void 0 : details.id], cxoneUserId: currentCxoneUser.userId, toastId }));
                setAnchorEl(null);
                break;
            case CcfInteractionSearchMenuAction.contactInfo:
                dispatch(ccfDigitalSearchActions.setcurrentCustomerContactInfo({ customerId: (_b = (_a = details === null || details === void 0 ? void 0 : details.row) === null || _a === void 0 ? void 0 : _a.authorEndUserIdentity) === null || _b === void 0 ? void 0 : _b.id, caseId: details === null || details === void 0 ? void 0 : details.id, isCustomerCardPopupOpen: true }));
                if (isLvCustomerCardEnabled)
                    dispatch(setLvCurrentInteraction(details === null || details === void 0 ? void 0 : details.row));
                setAnchorEl(null);
                break;
        }
    };
    return (_jsxs(_Fragment, { children: [_jsx(CcfTooltip, Object.assign({ title: translate('more'), arrow: true }, { children: _jsx(IconButton, Object.assign({ "aria-label": "more", id: "long-button", "aria-controls": open ? 'long-menu' : undefined, "aria-expanded": open ? 'true' : undefined, "aria-haspopup": "true", onClick: openKebabMenu, style: { maxWidth: '0.8em' }, disableRipple: true }, { children: _jsx(MoreVert, {}) })) })), _jsx(Menu, Object.assign({ id: "long-menu", anchorEl: anchorEl, open: open, onClose: closeKebabMenu, MenuListProps: {
                    'aria-labelledby': 'long-button',
                }, PaperProps: {
                    style: {
                        width: '23ch',
                    },
                } }, { children: options.map((option, index) => (_jsx(MenuItem, Object.assign({ value: option.action, autoFocus: index === 0, tabIndex: 0, sx: styles.menuItemMinHeight, onClick: () => digitalKebabMenuSelectionHandler(option.action) }, { children: _jsx(Grid, Object.assign({ container: true, sx: styles.menuItemContent }, { children: _jsx(Box, Object.assign({ sx: styles.menuItemNameBold }, { children: option.name })) })) }), option.action))) }))] }));
}
export default memo(CcfInteractionSearchMenu);
//# sourceMappingURL=ccf-interaction-search-menu.js.map