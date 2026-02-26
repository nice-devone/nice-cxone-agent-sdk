var _a;
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { useTranslator, CcfButton, CcfTypography, CcfTextField, CcfBox, CcfInfoIcon } from '@nice-devone/ui-controls';
import { getSelectedRowContacts, changeDigitalContactStatus, getSelectedContactStatus } from '../ccf-digital-search.slice';
import CcfInteractionSearchSelectOptionStyle from './ccf-interaction-search-select-option/ccf-digital-search-toggle-buttons.styles';
import { InteractionSearchStatus } from '@nice-devone/common-sdk';
import { useTheme, MenuItem, useMediaQuery, Box } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
const statusFilterOptions = (_a = Object.keys(InteractionSearchStatus)) === null || _a === void 0 ? void 0 : _a.map((item) => {
    return {
        id: item === null || item === void 0 ? void 0 : item.toLowerCase(),
        name: item === null || item === void 0 ? void 0 : item.toLowerCase(),
    };
});
/**
 * Component to show the Select Options status menu for the interaction search on row selection
 * @example
 * ```
 * <CcfDigitalSearchStatusChange />
 * ```
 */
export const CcfDigitalSearchStatusChange = () => {
    var _a, _b;
    const theme = useTheme();
    const styles = CcfInteractionSearchSelectOptionStyle(theme);
    const [translate] = useTranslator();
    const isSmView = useMediaQuery(theme.breakpoints.down('xl'));
    const [filteredStatuses, setFilteredStatuses] = useState([{ id: '', name: '' }]);
    const [selectedStatus, setSelectedStatus] = useState((_a = filteredStatuses[0]) === null || _a === void 0 ? void 0 : _a.name);
    const [closedInteraction, setClosedInteraction] = useState(false);
    const selections = useSelector(getSelectedRowContacts);
    const selectedContactsData = useSelector(getSelectedContactStatus);
    const [showErrorMessage, setErrorMessageVisibility] = useState(false);
    const dispatch = useDispatch();
    useEffect(() => {
        const statuses = selectedContactsData === null || selectedContactsData === void 0 ? void 0 : selectedContactsData.map((row) => row === null || row === void 0 ? void 0 : row.status);
        const uniqueStatuses = [...new Set(statuses)];
        updateStatusDropDown(uniqueStatuses);
        if (statuses === null || statuses === void 0 ? void 0 : statuses.find((status) => status === InteractionSearchStatus.CLOSED)) {
            setClosedInteraction(true);
            setErrorMessageVisibility(true);
            return;
        }
        setClosedInteraction(false);
        setErrorMessageVisibility(false);
    }, [selections, selectedContactsData]);
    /**
      * Used to handle change status button click
      * @returns - void
      * @example - handleClick()
    */
    const handleClick = () => {
        if (selections.length && selectedStatus && !closedInteraction) {
            dispatch(changeDigitalContactStatus({ selectedContactIds: selections, status: selectedStatus }));
        }
    };
    /**
    * Used to handle selected status change from dropdown
    * @param event - ChangeEvent
    * @returns - void
    * @example - handleStatusChange(e)
    */
    const handleStatusChange = (event) => {
        var _a;
        const status = (_a = event === null || event === void 0 ? void 0 : event.target) === null || _a === void 0 ? void 0 : _a.value;
        if (!status.trim())
            return;
        setSelectedStatus(status);
    };
    /**
    * Used to update the bulk status dropdown options
    * @returns - void
    * @example - updateStatusDropDown(e)
    */
    const updateStatusDropDown = (uniqueStatuses) => {
        var _a;
        const finalDropdown = statusFilterOptions.filter((item) => 
        // If uniqueStatuses has other elements, simply filter out elements present in statusFilterOptions
        !uniqueStatuses.includes(item.id) && item.id !== InteractionSearchStatus.NEW);
        setFilteredStatuses(finalDropdown);
        setSelectedStatus((_a = finalDropdown[0]) === null || _a === void 0 ? void 0 : _a.name);
    };
    return _jsxs(_Fragment, { children: [_jsxs(CcfBox, Object.assign({ sx: [{ flexDirection: isSmView ? 'column' : 'row' }, styles.headerContainer] }, { children: [_jsx(CcfTextField, Object.assign({ id: 'ccfTextFieldSelectStatus', size: "small", value: selectedStatus, onChange: handleStatusChange, variant: "outlined", inputProps: { 'data-testid': 'status-list' }, sx: styles.statusInput, select: true }, { children: filteredStatuses.map((status) => {
                            return _jsx(MenuItem, Object.assign({ value: status === null || status === void 0 ? void 0 : status.name, sx: styles.statusMenuItem }, { children: translate(status === null || status === void 0 ? void 0 : status.name) }), status === null || status === void 0 ? void 0 : status.id);
                        }) }), "ccfSelectText"), _jsx(CcfBox, { children: _jsx(CcfButton, Object.assign({ id: 'digitalSearchChangeStatusButton', "data-testid": 'digitalSearchChangeStatusButtonTestId', primary: true, onClick: handleClick, sx: styles.actionButton }, { children: translate('change') })) })] })), _jsx(Box, { children: !showErrorMessage ?
                    _jsxs(Box, Object.assign({ sx: { marginTop: '1rem' } }, { children: [_jsx(CcfTypography, { variant: "inherit", translationKey: 'statusChangeMessage', extraArgs: { format: [selections.length] }, sx: styles.statusMessage }), _jsxs(Box, Object.assign({ component: 'span', sx: styles.nonClosedCaseText }, { children: [" ", _jsx(Box, Object.assign({ fontWeight: 'bold', display: 'inline' }, { children: translate(selectedStatus) })), "."] }))] })) :
                    _jsxs(Box, Object.assign({ sx: styles.messageWrapper }, { children: [_jsx(CcfInfoIcon, { htmlColor: (_b = theme.palette.error) === null || _b === void 0 ? void 0 : _b.main, fontSize: 'large' }), _jsxs(CcfTypography, Object.assign({ variant: "inherit", sx: Object.assign(Object.assign({}, styles.statusMessage), { color: `${theme.palette.endCall}` }) }, { children: [_jsx(Box, Object.assign({ fontWeight: 'bold', display: 'inline' }, { children: translate('closed') })), " ", translate('closedStatusChangeError')] }))] })) })] });
};
//# sourceMappingURL=ccf-digital-search-status-change.js.map