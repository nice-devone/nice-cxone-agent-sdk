import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import Popover from '@mui/material/Popover';
import { CcfTooltip } from '../ccf-tooltip/ccf-tooltip';
import { useTranslator } from '../../ccf-translator/ccf-translator';
import { CcfSortIcon } from '../../icons/ccf-sort-icon/ccf-sort-icon';
import { CcfTypography } from '../ccf-typography/ccf-typography';
import { CcfButton } from '../ccf-button/ccf-button';
import { CcfSortOrderIconAscending } from '../../icons/ccf-sort-order-icon-ascending/ccf-sort-order-icon-ascending';
import { CcfSortOrderIconDescending } from '../../icons/ccf-sort-order-icon-descending/ccf-sort-order-icon-descending';
import { CcfTextField } from '../ccf-textfield/ccf-textfield';
import { useTheme, Box, MenuItem } from '@mui/material';
import { useState } from 'react';
import { ccfSortItemsStyles } from './ccf-sort-items.styles';
import { SortOrder } from '@nice-devone/digital-sdk';
/**
 * component function for rendering sorting attributes
 * @example ' <CcfSortItems />'
 */
export function CcfSortItems({ anchorOrigin, transformOrigin, sortItemTxt, sortCriteriaList, paperStyles, anchorPosition, defaultSortOrder, defaultSortCriteria, performSorting, }) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [translate] = useTranslator();
    const [selectedSortCriteria, setSelectedSortCriteria] = useState(defaultSortCriteria);
    const [selectedSortOrder, setSelectedSortOrder] = useState(defaultSortOrder);
    const theme = useTheme();
    const classes = ccfSortItemsStyles(theme);
    /**
   * handle close event
   * @example handleClose()
   */
    const handleClose = () => {
        setSelectedSortCriteria(defaultSortCriteria);
        setSelectedSortOrder(defaultSortOrder);
        setAnchorEl(null);
    };
    /**
   * handle cancel button click event
   * @example cancelClicked()
   */
    const cancelClicked = () => {
        setSelectedSortCriteria(defaultSortCriteria);
        setSelectedSortOrder(defaultSortOrder);
        setAnchorEl(null);
    };
    /**
   * handle change event
   * @example handleChange()
   */
    const handleChange = (event) => {
        setSelectedSortCriteria(event.target.value);
    };
    /**
  * handle open popover event
  * @example openPopOverMenu()
  */
    const openPopOverMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    /**
   * handle dropdown click event
   * @example changeSortOrder()
   */
    const changeSortOrder = () => {
        if (selectedSortOrder == SortOrder.ASC) {
            setSelectedSortOrder(SortOrder.DESC);
        }
        else {
            setSelectedSortOrder(SortOrder.ASC);
        }
    };
    /**
   * function to sort data when apply button clicked
   * @example sortData()
   */
    const sortData = () => {
        performSorting({ sortingCriteria: selectedSortCriteria, sortingOrder: selectedSortOrder });
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    return (_jsxs(Box, { children: [_jsx(CcfTooltip, Object.assign({ "data-testid": "sortIcon", "aria-label": translate('sort'), title: translate('sort'), arrow: true }, { children: _jsx(Box, Object.assign({ sx: classes.inboundOutbound, onKeyPress: (e) => {
                        if (e.key === 'Enter') {
                            e.stopPropagation();
                            openPopOverMenu(e);
                        }
                    }, role: "button", tabIndex: 0, "data-testid": "SortIconFullViewKeyPress" }, { children: _jsx(CcfSortIcon, { "data-testid": "SortIconFullView", className: "inboundOutboundIcons", viewBox: "0 -4 25 25", onClick: openPopOverMenu }) })) })), _jsxs(Popover, Object.assign({ anchorReference: anchorOrigin ? 'anchorEl' : 'anchorPosition', id: id, open: open, anchorEl: anchorEl, onClose: handleClose, anchorOrigin: anchorOrigin, transformOrigin: transformOrigin, anchorPosition: anchorPosition, sx: paperStyles }, { children: [_jsxs(Box, Object.assign({ sx: classes.contentDiv }, { children: [_jsx(CcfTypography, Object.assign({ variant: 'h5', sx: classes.sortItemTxt }, { children: sortItemTxt })), selectedSortOrder == SortOrder.ASC &&
                                _jsx(CcfSortOrderIconAscending, { "data-testid": "SortIconFullViewAscending", className: "inboundOutboundIcons", viewBox: "-3 -2 23 23", onClick: changeSortOrder, onKeyUp: (e) => {
                                        if (e.key === 'Enter') {
                                            changeSortOrder();
                                        }
                                    }, tabIndex: 0 }), selectedSortOrder == SortOrder.DESC &&
                                _jsx(CcfSortOrderIconDescending, { "data-testid": "SortIconFullViewDescending", className: "inboundOutboundIcons", viewBox: "-3 -2 23 23", onClick: changeSortOrder, onKeyUp: (e) => {
                                        if (e.key === 'Enter') {
                                            changeSortOrder();
                                        }
                                    }, tabIndex: 0 })] })), _jsx(Box, Object.assign({ sx: classes.boxDropdown }, { children: _jsx(CcfTextField, Object.assign({ id: 'ccfTextFieldSelectSortList', size: "small", "data-testid": "SortCriteriaList", sx: classes.selectedTxt, defaultValue: translate(selectedSortCriteria), select: true, value: selectedSortCriteria, onChange: handleChange, variant: "outlined", inputProps: { 'data-testid': 'directory-filter', classes: { input: classes.selectedTxt } } }, { children: sortCriteriaList && sortCriteriaList.map((sortCriteria) => (_jsx(MenuItem, Object.assign({ "aria-label": sortCriteria, value: sortCriteria, sx: classes.menuItemTxt }, { children: translate(sortCriteria) }), sortCriteria))) }), "ccfSelectText") })), _jsxs(Box, Object.assign({ sx: classes.boxBtn }, { children: [_jsx(CcfButton, Object.assign({ sx: classes.secondaryButton, onClick: () => cancelClicked(), onKeyUp: (e) => {
                                    if (e.key === 'Enter') {
                                        cancelClicked();
                                    }
                                }, variant: "contained", size: "small", "data-testid": "secondary-button-click" }, { children: _jsx(CcfTypography, { translationKey: 'cancel' }) }), "ccfSecondarybtn"), _jsx(CcfButton, Object.assign({ sx: classes.applyBtn, variant: "contained", onClick: sortData, size: "small", primary: true, autoFocus: true, "data-testid": "primary-button-click" }, { children: _jsx(CcfTypography, { translationKey: 'apply' }) }), "ccfPrimarybtn")] }))] }))] }));
}
export default CcfSortItems;
//# sourceMappingURL=ccf-sort-items.js.map