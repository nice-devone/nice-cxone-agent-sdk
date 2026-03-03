import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
/* eslint-disable @typescript-eslint/no-explicit-any, react/no-array-index-key */
import { Box, FormControl, ListItemIcon, ListItemText, MenuItem, Select, Checkbox } from '@mui/material';
import { CcfTypography } from '../core/ccf-typography/ccf-typography';
import controller from './ccf-action-editor-multiselect-dropdown.controller';
import CcfActionEditorMultiSelectDropdownStyles from './ccf-action-editor-multiselect-dropdown.styles';
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: 300,
            width: 250,
        },
    },
};
/**
 * Action Editor component for multiselect dropdown
 * @param props - CcfActionEditorMultiselectDropdownProps
 * @returns component for multiselect dropdown
 * @example <CcfActionEditorMultiselectDropdown />
 */
export const CcfActionEditorMultiselectDropdown = (props) => {
    var _a;
    const { options = [], value = 'value', label = 'label', handleChange, handleOnOpen, selected = [] } = props !== null && props !== void 0 ? props : {};
    const singleSelect = Object.keys(props).includes('singleSelect');
    const areAllSelected = selected.length === options.length;
    const styles = CcfActionEditorMultiSelectDropdownStyles();
    const selectionCount = (_a = controller.determineSelectionCount(selected)) !== null && _a !== void 0 ? _a : 0;
    return (_jsx(Box, { children: _jsx(FormControl, { children: _jsxs(Select, Object.assign({ "data-testid": "ccf-action-editor-multiselect-dropdown_select", sx: [styles['& .MuiSelect-select'], styles['& .MuiInputBase-root']], value: singleSelect ? controller.KEY_OF_DISPLAY_OPTION : [controller.KEY_OF_DISPLAY_OPTION], multiple: !singleSelect, onChange: (event) => {
                    controller.onChangeOfSelect(event, value, singleSelect, options, selected, handleChange);
                }, onOpen: () => {
                    controller.onOpenOfSelect(handleOnOpen);
                }, MenuProps: MenuProps }, { children: [_jsx(MenuItem, Object.assign({ value: controller.KEY_OF_DISPLAY_OPTION, sx: styles.hideOption }, { children: _jsxs(CcfTypography, { children: [selectionCount, " item(s) selected."] }) })), !singleSelect && (_jsxs(MenuItem, Object.assign({ value: "all" }, { children: [_jsx(ListItemIcon, { children: _jsx(Checkbox, { checked: areAllSelected }) }), _jsx(ListItemText, { primary: "Select All" })] }))), options.map((option, index) => (_jsxs(MenuItem, Object.assign({ value: option[value] }, { children: [!singleSelect && (_jsx(ListItemIcon, { children: _jsx(Checkbox, { checked: selected.includes(option[value]) }) })), _jsx(ListItemText, { primary: option[label] })] }), `multiselect-option-${index}`)))] })) }) }));
};
export default CcfActionEditorMultiselectDropdown;
//# sourceMappingURL=ccf-action-editor-multiselect-dropdown.js.map