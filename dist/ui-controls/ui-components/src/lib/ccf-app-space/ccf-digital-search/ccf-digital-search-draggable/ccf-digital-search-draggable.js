import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ListSubheader, Popover, useTheme } from '@mui/material';
import { CcfButton, CcfCloseIcon, CcfTypography, useTranslator } from '@nice-devone/ui-controls';
import { useDispatch, useSelector } from 'react-redux';
import { ccfDigitalSearchActions, getCustomizeMenuElement, getDefaultColumns, } from '../ccf-digital-search.slice';
import CcfDigitalSearchStyle from '../ccf-digital-search-styles';
import { EventKeys } from '@nice-devone/common-sdk';
import CcfDigitalSearchDraggableContainer from './ccf-digital-search-draggable-container';
/**
 * A React component that provides a customizable, draggable column management interface.
 *
 * This component uses `dnd-kit` for drag-and-drop functionality, allowing users
 * to reorder columns or move them between "selected" and "not selected" lists.
 * It integrates with Redux to manage the column state and uses `@mui/material` for the UI.
 *
 * @remarks
 * The core functionality relies on two event handlers: `handleDragStart` and
 * `handleDragEnd`. These functions manage the dragged item and update the
 * Redux store to reflect changes in column order or visibility.
 * @example
 * <CcfDigitalSearchDraggable />
 */
export const CcfDigitalSearchDraggable = () => {
    var _a;
    const theme = useTheme();
    const styles = CcfDigitalSearchStyle(theme);
    const dispatch = useDispatch();
    const anchorEl = useSelector(getCustomizeMenuElement);
    const defaultColumns = (_a = useSelector(getDefaultColumns)) !== null && _a !== void 0 ? _a : [];
    const [translate] = useTranslator();
    const open = Boolean(anchorEl);
    /**
   * Closes the customizable column management popover.
   *
   * Dispatches an action to set `customizeMenuElement` to `null` in the Redux store.
   *
   * @example
   * ```tsx
   * <CcfButton onClick={handleClose}>Close</CcfButton>
   * ```
   */
    const handleClose = () => {
        dispatch(ccfDigitalSearchActions.updateCustomizeMenuElement(null));
    };
    return (_jsxs(Popover, Object.assign({ id: "customizable-columns", PaperProps: { 'aria-labelledby': 'customizable-menu-title', role: 'dialog' }, anchorEl: anchorEl, open: open, onClose: handleClose, sx: styles.menu }, { children: [_jsxs(ListSubheader, Object.assign({ component: "div", id: "list-subheader", sx: styles.listSubheader }, { children: [_jsx(CcfTypography, { id: "customizable-menu-title", translationKey: "columns", sx: styles.customizeText }), _jsx(CcfButton, Object.assign({ sx: styles.closeIcon, "data-testid": "close-button", onClick: handleClose, tabIndex: 0, "aria-label": translate('close'), disableRipple: true, isFocused: true, onKeyDown: (event) => {
                            if (event.code === EventKeys.ENTER) {
                                event.preventDefault();
                                handleClose();
                            }
                        } }, { children: _jsx(CcfCloseIcon, { viewBox: "-6 -6 32 32" }) }))] })), _jsx(CcfDigitalSearchDraggableContainer, { Columns: defaultColumns })] })));
};
//# sourceMappingURL=ccf-digital-search-draggable.js.map