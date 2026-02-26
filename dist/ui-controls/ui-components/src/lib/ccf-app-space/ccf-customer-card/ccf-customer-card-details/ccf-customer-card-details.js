import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { IconButton, Tooltip, useTheme } from '@mui/material';
import { CcfAppToastMessage, CcfBox, CcfEditBookIcon, useTranslator } from '@nice-devone/ui-controls';
import { memo, useEffect, useState } from 'react';
import { ValidationUtils } from '@nice-devone/core-sdk';
import CcfCustomerCardDetailsEditableRow, { FieldDataValues } from './ccf-customer-card-editable-field/ccf-customer-card-editable-field';
import customerCardDetailsStyles from './ccf-customer-card-details.style';
import UndoIcon from '@mui/icons-material/Undo';
import DoneIcon from '@mui/icons-material/Done';
import { updateCustomFields, getCustomerDetailsById, cxoneCustomFieldValues, cxoneCustomFieldUpdated, getCustomFieldsDefinitions, cxoneCustomFieldDefs, CcfCustomerCardActions, cxoneCustomerCardIdentities, deleteCustomField, getCustomFieldError } from '../ccf-customer-card.slice';
import { useDispatch, useSelector } from 'react-redux';
import { getActiveContactInSelectedInteraction } from '../../../ccf-assignment-panel/ccf-assignment-panel.slice';
import { getcurrentCustomerContactInfo } from '../../ccf-digital-search/ccf-digital-search.slice';
import { selectAppSpaceActiveTabStatus } from '../../ccf-app-space.slice';
import { toast } from 'react-toastify';
import { Navigation } from '../../../../enums/navigation-menus';
export var fieldDataValues;
(function (fieldDataValues) {
    fieldDataValues["LIST"] = "list";
    fieldDataValues["EMAIL"] = "email";
    fieldDataValues["TEXT"] = "text";
})(fieldDataValues || (fieldDataValues = {}));
/**
 * CcfCustomerCard - used to display quick replies component
 * @param props -?-CcfCustomerCardProps
 * @example <CcfCustomerCard />
 */
export function CcfCustomerCardDetails(props) {
    var _a;
    const { customerID, isLoading, dnis, skillname } = props;
    const theme = useTheme();
    const dispatch = useDispatch();
    const styles = customerCardDetailsStyles(theme);
    const [translate] = useTranslator();
    const [enableInput, setEnableInput] = useState(false);
    const [editFormData, setEditFormData] = useState([]);
    const validationUtils = new ValidationUtils();
    const customFieldValues = useSelector(cxoneCustomFieldValues);
    const cxonecustomFieldDefs = useSelector(cxoneCustomFieldDefs);
    const customFieldUpdated = useSelector(cxoneCustomFieldUpdated);
    const cxoneIdentity = useSelector(cxoneCustomerCardIdentities);
    const activeContactInSelectedInteraction = useSelector(getActiveContactInSelectedInteraction);
    const selectedMenuAppSpace = useSelector(selectAppSpaceActiveTabStatus);
    // will show edit icon if we don't have customer id from contact search
    const showEditIcon = (_a = useSelector(getcurrentCustomerContactInfo)) === null || _a === void 0 ? void 0 : _a.customerId;
    const CustomFieldError = useSelector(getCustomFieldError);
    /**
     * Used to update the app space tab label and tab index
     * @param event - event
     * @param ident - used to identify the changed field
     * @example - handleSelectChange(0)
     */
    const handleSelectChange = (event, ident) => {
        var _a;
        event.preventDefault();
        const index = editFormData.findIndex(formField => formField.ident === ident);
        const formData = [...editFormData];
        formData[index] = Object.assign(Object.assign({}, editFormData[index]), { selectedValue: (_a = event === null || event === void 0 ? void 0 : event.target) === null || _a === void 0 ? void 0 : _a.value, isEdited: true, isErrored: false });
        setEditFormData(formData);
    };
    /**
     * Used to save custom fields
     * @param event - event
     * @example - handleCustomFieldSave(e,data)
     */
    const handleCustomFieldSave = (data) => {
        const updatedCustomField = [];
        data.forEach(fieldData => {
            if (fieldData.isEdited) {
                if (fieldData.type === FieldDataValues.LIST && !fieldData.selectedValue) {
                    dispatch(deleteCustomField({ customerId: customerID, ident: fieldData.ident }));
                }
                updatedCustomField.push({
                    ident: fieldData.ident,
                    value: fieldData.selectedValue || null,
                });
            }
        });
        if (updatedCustomField.length > 0) {
            dispatch(updateCustomFields({ id: customerID, customFields: updatedCustomField }));
        }
        else {
            handleEdit(false);
        }
    };
    useEffect(() => {
        if (customFieldUpdated) {
            selectedMenuAppSpace.tab === Navigation.SEARCH ? customerDetails(true) : customerDetails(false);
            handleEdit(false);
        }
    }, [customFieldValues]);
    useEffect(() => {
        if (CustomFieldError) {
            toast.warn(_jsx(CcfAppToastMessage, { type: "warning", messageKey: 'customerCardUpdateFailError' }), {
                autoClose: 5000,
                containerId: 'CustomerCardToastContainer',
                closeButton: true,
            });
            dispatch(CcfCustomerCardActions.setCustomFieldError(false));
        }
    }, [CustomFieldError]);
    /**
     * Used to update the app space tab label and tab index
     * @param event - event
     * @example - handleDefaultValidation(value, isRequired)
    */
    const handleDefaultValidation = (value, isRequired) => {
        if (isRequired && !value) {
            return false;
        }
        else {
            return true;
        }
    };
    /**
     * Used to update the app space tab label and tab index
     * @param event - event
     * @example - handleValidation(e,data)
     */
    const handleValidation = (data) => {
        const erroredFieldIndices = [];
        data.forEach((formField, index) => {
            const value = formField.selectedValue || '';
            if (formField.isVisibleInCustomerCard) {
                if (formField.type === fieldDataValues.EMAIL) {
                    if ((formField.isRequired || value) && !validationUtils.validateEmail(value)) {
                        erroredFieldIndices.push(index);
                    }
                }
                else if (!handleDefaultValidation(value, formField.isRequired)) {
                    erroredFieldIndices.push(index);
                }
            }
        });
        return erroredFieldIndices;
    };
    /**
     * Used to update the app space tab label and tab index
     * @param event - event
     * @example - handleEdit(0)
     */
    const handleEdit = (isEditable) => {
        var _a, _b;
        if (cxonecustomFieldDefs) {
            setErrorState(-1, false);
            setEnableInput(isEditable);
            const formFields = [];
            if (isEditable) {
                for (let index = 0; index < cxonecustomFieldDefs.length; index++) {
                    const ident = (_a = cxonecustomFieldDefs[index]) === null || _a === void 0 ? void 0 : _a.ident;
                    const customFieldType = (_b = cxonecustomFieldDefs[index]) === null || _b === void 0 ? void 0 : _b.type;
                    const value = customFieldValues.find((item) => item.ident === ident);
                    if (customFieldType === FieldDataValues.LIST) {
                        formFields[index] = Object.assign(Object.assign({}, cxonecustomFieldDefs[index]), { values: [{ name: '', value: 'None' }, ...cxonecustomFieldDefs[index].values] });
                    }
                    else {
                        formFields[index] = Object.assign({}, cxonecustomFieldDefs[index]);
                    }
                    formFields[index] = Object.assign(Object.assign({}, formFields[index]), { selectedValue: value === null || value === void 0 ? void 0 : value.value, isEdited: false });
                }
                setEditFormData(formFields);
            }
        }
    };
    /**
     * Used to update the error state of fields
     * @param erroredFieldIndex - index
     * @param value - value to be set
     * @example setErrorState(-1, false)
     */
    const setErrorState = (erroredFieldIndex, value) => {
        const formFields = [...editFormData];
        if (erroredFieldIndex === -1) {
            for (let i = 0; i < editFormData.length; i++) {
                formFields[i].isErrored = value;
            }
        }
        else {
            formFields[erroredFieldIndex].isErrored = value;
        }
        setEditFormData(formFields);
    };
    /**
     * Updating customfields on tick click
     * @example - handleApproveClick()
    */
    const handleApproveClick = () => {
        const erroredFieldIndices = handleValidation(editFormData);
        if (!erroredFieldIndices.length) {
            setErrorState(-1, false);
            handleCustomFieldSave(editFormData);
        }
        else {
            erroredFieldIndices.forEach(erroredFieldIndex => setErrorState(erroredFieldIndex, true));
        }
    };
    /**
   * Used to check Interaction search tab calling customer details by Id
   * @example - customerDetails()
   * @param searchTabSelectedFlag - flag if customer details called from Interaction search or CC
   */
    const customerDetails = (searchTabSelectedFlag) => {
        dispatch(getCustomerDetailsById({ customerId: customerID, selectedContact: activeContactInSelectedInteraction !== null && activeContactInSelectedInteraction !== void 0 ? activeContactInSelectedInteraction : undefined, searchTabSelected: searchTabSelectedFlag }));
    };
    useEffect(() => {
        /**
         * Created this method to trigger required api
         *  @example - getCustomFieldData()
        */
        if (customerID) {
            dispatch(getCustomFieldsDefinitions());
            selectedMenuAppSpace.tab === Navigation.SEARCH ? customerDetails(true) : customerDetails(false);
            setEnableInput(false);
        }
        else {
            dispatch(CcfCustomerCardActions.storeCustomerFullName(''));
            dispatch(CcfCustomerCardActions.setCustomerId(customerID));
        }
    }, [customerID]);
    /**
     * Used to check if the event is for enter key down
     * @param e - keydown event
     * @returns boolean
     * @example
     * ```
     * isEnterKeyDown(e)
     * ```
     */
    const isEnterKeyDown = (e) => e.key === 'Enter';
    /**
     * Displays custom fields configurations like enable, editable on Customer card
     * @example showCustomerCardDetails()
     */
    const showCustomerCardDetails = () => {
        return (customerID && cxonecustomFieldDefs && cxonecustomFieldDefs.length > 0)
            ? _jsxs(_Fragment, { children: [(activeContactInSelectedInteraction === null || activeContactInSelectedInteraction === void 0 ? void 0 : activeContactInSelectedInteraction.contactStatus) !== 'incoming' && _jsx(CcfBox, Object.assign({ component: "div", sx: styles.buttonBar }, { children: !enableInput && !showEditIcon && _jsx(Tooltip, Object.assign({ title: translate('edit') }, { children: _jsx(IconButton, Object.assign({ "aria-label": translate('editCustomerDetails'), size: "small", className: 'iconBtn', sx: styles.LRPadding5, onKeyDown: e => { isEnterKeyDown(e) && handleEdit(true); } }, { children: _jsx(CcfEditBookIcon, { className: 'edit-detail', id: 'edit', sx: styles.editIcon, onClick: () => handleEdit(true) }) })) })) })), enableInput && _jsxs(CcfBox, Object.assign({ sx: styles.buttonBar }, { children: [_jsx(Tooltip, Object.assign({ title: translate('discard') }, { children: _jsx(IconButton, Object.assign({ size: "small", className: 'iconBtn', sx: styles.LRPadding5, onKeyDown: e => { isEnterKeyDown(e) && handleEdit(false); } }, { children: _jsx(UndoIcon, { onMouseDown: (e) => e.preventDefault(), onClick: () => handleEdit(false) }) })) })), _jsx(Tooltip, Object.assign({ title: translate('save') }, { children: _jsx(IconButton, Object.assign({ size: "small", className: 'iconBtn', sx: styles.LRPadding5, onKeyDown: e => { isEnterKeyDown(e) && handleApproveClick(); } }, { children: _jsx(DoneIcon, { onMouseDown: (event) => event.preventDefault(), className: 'save-detail', onClick: () => handleApproveClick() }) })) }))] })), cxonecustomFieldDefs.map((fieldData, index) => {
                        var _a, _b;
                        return fieldData.isVisibleInCustomerCard && _jsxs(CcfBox, Object.assign({ sx: styles.bottomPad15 }, { children: [_jsx(CcfBox, Object.assign({ component: "div", sx: styles.flexSpaceBetween }, { children: _jsx(CcfBox, Object.assign({ component: "div", sx: styles.detailsCustomFieldLabel }, { children: fieldData.label })) })), !enableInput && _jsx(CcfBox, Object.assign({ component: "div", sx: styles.detailsCustomFieldData }, { children: fieldData.type === fieldDataValues.LIST ? (_a = fieldData.values.find((item) => { var _a; return item.name === ((_a = customFieldValues.find((item) => item.ident === fieldData.ident)) === null || _a === void 0 ? void 0 : _a.value); })) === null || _a === void 0 ? void 0 : _a.value : (_b = customFieldValues.find((item) => item.ident === fieldData.ident)) === null || _b === void 0 ? void 0 : _b.value })), enableInput && fieldData.type === fieldDataValues.LIST && _jsx(CcfCustomerCardDetailsEditableRow, { data: editFormData[index], handleSelectChange: handleSelectChange, enableError: editFormData[index].isErrored, handleEdit: handleEdit, autofocus: index === 0, isEditable: fieldData.isEditable }), enableInput && (fieldData.type === fieldDataValues.TEXT || fieldData.type === fieldDataValues.EMAIL) && _jsx(CcfCustomerCardDetailsEditableRow, { data: editFormData[index], handleSelectChange: handleSelectChange, enableError: editFormData[index].isErrored, handleEdit: handleEdit, autofocus: index === 0, isEditable: fieldData.isEditable })] }), index);
                    }), " "] }) : !dnis && !skillname && _jsx(CcfBox, Object.assign({ sx: styles.alignCenter }, { children: translate('noInformationAvailable') }));
    };
    return (_jsxs(CcfBox, Object.assign({ sx: styles.customerCardContainer }, { children: [(!isLoading && (dnis || skillname)) && (_jsxs(_Fragment, { children: [_jsxs(CcfBox, Object.assign({ sx: styles.bottomPad15 }, { children: [_jsx(CcfBox, Object.assign({ component: "div", sx: styles.flexSpaceBetween }, { children: _jsx(CcfBox, Object.assign({ component: "div", sx: styles.detailsCustomFieldLabel }, { children: translate('phoneNumber') })) })), _jsx(CcfBox, Object.assign({ component: "div", sx: styles.detailsCustomFieldData }, { children: dnis }))] }), -1), _jsxs(CcfBox, Object.assign({ sx: styles.bottomPad15 }, { children: [_jsx(CcfBox, Object.assign({ component: "div", sx: styles.flexSpaceBetween }, { children: _jsx(CcfBox, Object.assign({ component: "div", sx: styles.detailsCustomFieldLabel }, { children: translate('skillname') })) })), _jsx(CcfBox, Object.assign({ component: "div", sx: styles.detailsCustomFieldData }, { children: skillname }))] }), -1)] })), !isLoading && (cxoneIdentity === null || cxoneIdentity === void 0 ? void 0 : cxoneIdentity.length) !== 0
                ? showCustomerCardDetails()
                : cxoneIdentity && (cxoneIdentity === null || cxoneIdentity === void 0 ? void 0 : cxoneIdentity.length) !== 0 && (_jsx(CcfBox, { children: _jsx(CcfBox, Object.assign({ sx: styles.loader }, { children: " " })) }))] })));
}
export default memo(CcfCustomerCardDetails);
//# sourceMappingURL=ccf-customer-card-details.js.map