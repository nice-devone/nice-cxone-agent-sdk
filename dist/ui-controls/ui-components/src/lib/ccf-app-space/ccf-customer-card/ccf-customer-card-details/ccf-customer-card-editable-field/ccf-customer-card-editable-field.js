import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { FormControl, IconButton, InputAdornment, MenuItem, Select } from '@mui/material';
import { CcfTextField, useTranslator } from '@nice-devone/ui-controls';
import { useCallback, useEffect } from 'react';
import { fieldDataValues } from '../ccf-customer-card-details';
import customerCardEditableFieldStyles from './ccf-customer-card-editable-field.style';
/**
   * This enum is used for type of maintianing custom field type
*/
export var FieldDataValues;
(function (FieldDataValues) {
    FieldDataValues["LIST"] = "list";
    FieldDataValues["EMAIL"] = "email";
    FieldDataValues["TEXT"] = "text";
})(FieldDataValues || (FieldDataValues = {}));
/**
 * CcfCustomerCard - used to display quick replies component
 * @param props -?-CcfCustomerCardProps
 * @example <CcfCustomerCard />
 */
export function CcfCustomerCardDetailsEditableRow(props) {
    const { data, handleSelectChange, handleEdit, enableError, autofocus, isEditable } = props;
    const styles = customerCardEditableFieldStyles();
    const [translate] = useTranslator();
    /**
     * CcfCustomerCard - used to display quick replies component
     * @example getErrorHelperText
     */
    const getErrorHelperText = (inputValue) => {
        switch (inputValue.type) {
            case fieldDataValues.EMAIL:
                if (enableError) {
                    return translate('invalidEmailAddress');
                }
                else {
                    return '';
                }
            case fieldDataValues.TEXT:
                if (enableError) {
                    return translate('emptyHelperText').replace('%s', data.label);
                }
                else {
                    return '';
                }
            default:
                return '';
        }
    };
    const escFunction = useCallback((event) => {
        var _a;
        if (((_a = event.target.nodeName) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === 'input') {
            if (event.key === 'Escape') {
                handleEdit(false);
            }
        }
    }, []);
    useEffect(() => {
        document.addEventListener('keydown', escFunction, false);
        return () => {
            document.removeEventListener('keydown', escFunction, false);
        };
    }, []);
    /**
     * CcfCustomerCard - Used to update title tooltip for input field
     * @example getInputTitle
     */
    const getInputTitle = (type) => {
        switch (type) {
            case 'email':
                return translate('emailToolTip');
            default:
                return translate('textToolTip');
        }
    };
    return (_jsxs(_Fragment, { children: [(data.type === FieldDataValues.LIST) && (_jsx(FormControl, Object.assign({ fullWidth: true, sx: styles.fullWidth }, { children: _jsx(Select, Object.assign({ labelId: "demo-simple-select-label", id: "demo-simple-select", value: data.selectedValue, label: data.label, autoFocus: autofocus, disabled: !isEditable, tabIndex: -1, onChange: (event) => handleSelectChange(event, data.ident), inputProps: { 'aria-label': `${translate('edit')} ${data.label}` } }, { children: data === null || data === void 0 ? void 0 : data.values.map((fieldValue) => {
                        var _a;
                        return _jsx(MenuItem, Object.assign({ value: fieldValue.name }, { children: fieldValue.name ? fieldValue.value : translate('none') }), (_a = fieldValue.name) === null || _a === void 0 ? void 0 : _a.toString());
                    }) })) }))), ((data.type === FieldDataValues.TEXT || data.type === FieldDataValues.EMAIL)) && (_jsx(FormControl, Object.assign({ variant: "outlined", sx: styles.fullWidth }, { children: _jsx(CcfTextField, { autoFocus: autofocus, id: "keyValue", size: "small", variant: "outlined", value: data.selectedValue, required: data.isRequired, onChange: (event) => handleSelectChange(event, data.ident), error: enableError, InputProps: {
                        endAdornment: false && (_jsx(InputAdornment, Object.assign({ position: "end" }, { children: _jsx(IconButton, {}) }))),
                    }, helperText: getErrorHelperText({ isRequired: data.isRequired, type: data.type }), tabIndex: -1, disabled: !isEditable, inputProps: { 'aria-label': `${translate('edit')} ${data.label}`, title: `${getInputTitle(data.type)}` } }) })))] }));
}
export default CcfCustomerCardDetailsEditableRow;
//# sourceMappingURL=ccf-customer-card-editable-field.js.map