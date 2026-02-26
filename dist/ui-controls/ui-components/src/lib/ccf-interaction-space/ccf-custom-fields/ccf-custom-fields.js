import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, MenuItem, TextField, useTheme, Grid, InputLabel, IconButton, Tooltip, } from '@mui/material';
import { CcfAppToastMessage, CcfEditBookIcon, useTranslator, CcfTooltip, CcfTypography } from '@nice-devone/ui-controls';
import { useEffect, useState, useRef } from 'react';
import CaseCustomFields from './ccf-custom-fields.style';
import UndoIcon from '@mui/icons-material/Undo';
import DoneIcon from '@mui/icons-material/Done';
import { ValidationUtils, } from '@nice-devone/core-sdk';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { updateCaseCustomFields, cxoneCustomFieldUpdateFlag, cxoneCaseCustomFieldsUpdated, CcfCaseCustomFieldAction, cxoneCustomInvalidFieldValues } from './ccf-case-custom-field.slice';
import { getNonIncomingActiveContactInSelectedInteraction } from '../../ccf-assignment-panel/ccf-assignment-panel.slice';
import CcfTreeElement from '../../ccf-tree-element/ccf-tree-element';
import Linkify from 'linkify-react';
import { ToastMessageType } from '../../../enums/toast-message-type';
/**
 * Component to displays custom fields in content header
 * @returns custom fields in content header
 * @example
 * ```
 * <CcfCustomFields customFields={props.customFields}
 * ```
 */
export function CcfCustomFields(props) {
    const dispatch = useDispatch();
    const [translate] = useTranslator();
    const [enableInput, setEnableInput] = useState(false);
    const theme = useTheme();
    const styles = CaseCustomFields(theme);
    const validationUtils = new ValidationUtils();
    const [updatedCustomFields, setUpdatedCustomFields] = useState([]);
    const [initalCustomFields, setInitialCustomFields] = useState([]);
    const [disableSave, setDisableSave] = useState(true);
    const nonIncomingActiveContactInSelectedInteraction = useSelector(getNonIncomingActiveContactInSelectedInteraction);
    const getUpdatedCustomFieldValue = useSelector(cxoneCaseCustomFieldsUpdated);
    const getInvalidCustomFieldValues = useSelector(cxoneCustomInvalidFieldValues);
    const getToastMsg = useSelector(cxoneCustomFieldUpdateFlag);
    const [errorMessage, setErrorMessage] = useState('');
    const [ariaLive, setAriaLive] = useState(false);
    const emptySpaceRegex = /\s/g;
    const formRef = useRef(null);
    const touchedFieldsRef = useRef(new Set());
    /**
     * This enum is used for type of maintianing custom field type
  */
    let FieldDataValues;
    (function (FieldDataValues) {
        FieldDataValues["LIST"] = "list";
        FieldDataValues["EMAIL"] = "email";
        FieldDataValues["TEXT"] = "text";
        FieldDataValues["TREE"] = "tree";
    })(FieldDataValues || (FieldDataValues = {}));
    /**
     * Used to set custom field values
     * @example - setCustomFieldValues()
     */
    const setCustomFieldValues = (customFieldDefs) => {
        var _a;
        const currentContactDetails = getUpdatedCustomFieldValue === null || getUpdatedCustomFieldValue === void 0 ? void 0 : getUpdatedCustomFieldValue.find((item) => item.id === (nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.caseId));
        const currentCustomFields = JSON.parse(JSON.stringify(customFieldDefs));
        const identSet = new Set(currentContactDetails === null || currentContactDetails === void 0 ? void 0 : currentContactDetails.customFields.map(field => field.ident));
        const filteredCustomFields = (_a = props.customFields) === null || _a === void 0 ? void 0 : _a.filter((item) => typeof item.ident === 'string' && identSet.has(item.ident));
        currentCustomFields.forEach((customfieldDef) => {
            var _a, _b;
            if (currentContactDetails) {
                const customField = currentContactDetails.customFields.find((item) => item.ident === customfieldDef.ident);
                if (customField) {
                    if (customfieldDef.type === FieldDataValues.LIST || customfieldDef.type === FieldDataValues.TREE) {
                        const selectedValue = Array.isArray(customfieldDef.values) && (customField === null || customField === void 0 ? void 0 : customField.value) != null
                            ? customfieldDef.values.find(({ name, value }) => customField.value === name || customField.value === value)
                            : undefined;
                        customfieldDef.value = (selectedValue === null || selectedValue === void 0 ? void 0 : selectedValue.name) || '';
                    }
                    else {
                        customfieldDef.value = customField.value || '';
                    }
                }
                else {
                    const customField = filteredCustomFields === null || filteredCustomFields === void 0 ? void 0 : filteredCustomFields.find((customFieldValues) => customFieldValues.ident === customfieldDef.ident);
                    if (customField) {
                        if (customfieldDef.type === FieldDataValues.LIST || customfieldDef.type === FieldDataValues.TREE) {
                            const selectedValue = (_a = customfieldDef === null || customfieldDef === void 0 ? void 0 : customfieldDef.values) === null || _a === void 0 ? void 0 : _a.find((customFieldValue) => customField.value === customFieldValue.value);
                            customfieldDef.value = (selectedValue === null || selectedValue === void 0 ? void 0 : selectedValue.name) || '';
                        }
                        else {
                            customfieldDef.value = customField.value || '';
                        }
                    }
                    else {
                        customfieldDef.value = '';
                    }
                }
            }
            else {
                const customField = filteredCustomFields === null || filteredCustomFields === void 0 ? void 0 : filteredCustomFields.find((customFieldValues) => customFieldValues.ident === customfieldDef.ident);
                if (customField) {
                    if (customfieldDef.type === FieldDataValues.LIST || customfieldDef.type === FieldDataValues.TREE) {
                        const selectedValue = (_b = customfieldDef === null || customfieldDef === void 0 ? void 0 : customfieldDef.values) === null || _b === void 0 ? void 0 : _b.find((customFieldValue) => customField.value === customFieldValue.value);
                        customfieldDef.value = (selectedValue === null || selectedValue === void 0 ? void 0 : selectedValue.name) || '';
                    }
                    else {
                        customfieldDef.value = customField.value || '';
                    }
                }
                else {
                    customfieldDef.value = '';
                }
            }
        });
        return currentCustomFields;
    };
    /**
     * This use effect is used to maintain the values after updating the custom fields
     */
    useEffect(() => {
        const caseCustomFields = props.cxoneCustomFieldDefs && setCustomFieldValues(props.cxoneCustomFieldDefs);
        const fieldDefs = caseCustomFields.filter((field) => field.isVisibleInAgentConsole);
        setEnableInput(false);
        setUpdatedCustomFields(fieldDefs);
        setInitialCustomFields(fieldDefs);
    }, [props.cxoneCustomFieldDefs]);
    /**
     * This use effect is used to show toaster on API response
     */
    useEffect(() => {
        if (getToastMsg && getToastMsg !== '') {
            if (getToastMsg === ToastMessageType.SUCCESS) {
                toast.success(_jsx(CcfAppToastMessage, { type: "info", messageKey: 'caseCustomFieldSaved' }), {
                    containerId: 'AppToastContainer',
                    autoClose: 2000,
                    className: 'toastColor',
                });
                setEnableInput(false);
                dispatch(CcfCaseCustomFieldAction.storeToastMsgFlag(''));
            }
            else if (getToastMsg === ToastMessageType.FAILURE) {
                toast.error(_jsx(CcfAppToastMessage, { type: "info", messageKey: 'caseCustomFieldNotSaved' }), {
                    containerId: 'AppToastContainer',
                    autoClose: 2000,
                    className: 'toastColor',
                });
                dispatch(CcfCaseCustomFieldAction.storeToastMsgFlag(''));
            }
            else if (getToastMsg === ToastMessageType.INVALID_VALUE) {
                const invalidCustomFields = getInvalidCustomFieldValues === null || getInvalidCustomFieldValues === void 0 ? void 0 : getInvalidCustomFieldValues.map((invalidField) => {
                    var _a;
                    const fieldDef = (_a = props.cxoneCustomFieldDefs) === null || _a === void 0 ? void 0 : _a.find((field) => (field === null || field === void 0 ? void 0 : field.ident) === invalidField);
                    return (fieldDef === null || fieldDef === void 0 ? void 0 : fieldDef.label) || invalidField;
                }).join(', ');
                toast.error(_jsx(CcfAppToastMessage, { type: "info", messageKey: 'requiredCustomFieldError', extraArgs: { format: [invalidCustomFields] } }), {
                    containerId: 'AppToastContainer',
                    autoClose: 2000,
                    className: 'toastColor',
                });
                dispatch(CcfCaseCustomFieldAction.storeToastMsgFlag(''));
            }
        }
    }, [getToastMsg]);
    useEffect(() => {
        const isFieldChanged = initalCustomFields.some((initialField) => {
            const customField = updatedCustomFields.find((item) => item.ident === initialField.ident);
            return customField && customField.value !== initialField.value;
        });
        setDisableSave(!isFieldChanged);
    }, [updatedCustomFields]);
    // Focus on the first input field when the edit button is clicked
    useEffect(() => {
        var _a;
        if (enableInput && (formRef === null || formRef === void 0 ? void 0 : formRef.current)) {
            // Find the first enabled (not disabled) input field
            const firstEnabledInput = (_a = formRef === null || formRef === void 0 ? void 0 : formRef.current) === null || _a === void 0 ? void 0 : _a.querySelector('input:not([disabled])');
            if (firstEnabledInput) {
                firstEnabledInput.focus();
            }
        }
    }, [enableInput]);
    /**
     * Used to handle on change in user inputs
     * @param event - event
     * @example - handleInputChange()
     */
    const handleInputChange = (event, selectedNode) => {
        setUpdatedCustomFields((prevCustomFields) => {
            const prevFieldsDetails = JSON.parse(JSON.stringify(prevCustomFields));
            return prevFieldsDetails.map((item) => {
                var _a, _b, _c, _d, _e, _f;
                if (item.type === FieldDataValues.TREE) {
                    if (item.ident === (selectedNode === null || selectedNode === void 0 ? void 0 : selectedNode.ident)) {
                        item.value = selectedNode === null || selectedNode === void 0 ? void 0 : selectedNode.value;
                        touchedFieldsRef.current.add(item.ident);
                    }
                }
                else if (item.type === FieldDataValues.LIST) {
                    if (item.ident === ((_a = event === null || event === void 0 ? void 0 : event.target) === null || _a === void 0 ? void 0 : _a.name)) {
                        item.value = (_b = event.target) === null || _b === void 0 ? void 0 : _b.value;
                        touchedFieldsRef.current.add(item.ident);
                    }
                }
                else if (item.ident === ((_c = event === null || event === void 0 ? void 0 : event.target) === null || _c === void 0 ? void 0 : _c.id)) {
                    touchedFieldsRef.current.add(item.ident);
                    if (item.type === FieldDataValues.EMAIL) {
                        setAriaLive(false);
                        if ((_d = event === null || event === void 0 ? void 0 : event.target) === null || _d === void 0 ? void 0 : _d.value) {
                            const validatedEmail = validationUtils.validateEmail((_e = event === null || event === void 0 ? void 0 : event.target) === null || _e === void 0 ? void 0 : _e.value);
                            if (!validatedEmail) {
                                setErrorMessage(`${translate('error')}: ${translate('emailValidationMessage')}`);
                            }
                            else {
                                setErrorMessage('');
                            }
                        }
                        else {
                            setErrorMessage('');
                        }
                    }
                    item.value = (_f = event.target) === null || _f === void 0 ? void 0 : _f.value;
                }
                return item;
            });
        });
    };
    /**
     * Used to handle on discard action
     * @param event - event
     * @example - handleDiscard()
     */
    const handleDiscard = () => {
        setUpdatedCustomFields(prevFields => {
            return setCustomFieldValues(prevFields);
        });
        setEnableInput(false);
        setErrorMessage('');
    };
    /**
     * Used to handle blur of user inputs
     * @param event - event
     * @example - handleInputBlur()
     */
    const handleInputBlur = (event, item) => {
        var _a;
        if (item.type === FieldDataValues.EMAIL && !event.target.value) {
            setErrorMessage('');
            setAriaLive(false);
        }
        if (item.type === FieldDataValues.EMAIL && ((_a = event === null || event === void 0 ? void 0 : event.target) === null || _a === void 0 ? void 0 : _a.value)) {
            setAriaLive(true);
        }
    };
    /**
     * Handles focus events on user inputs and disables the aria-live region when necessary.
     * Specifically disables aria-live for email-type fields to prevent redundant announcements on focus.
     *
     * @param item - CcfCaseCustomFieldDefs
     * @example - handleInputFocus()
     */
    const handleInputFocus = (item) => {
        if (item.type === FieldDataValues.EMAIL) {
            setAriaLive(false);
        }
    };
    /**
     * Used to save custom fields
     * @param event - event
     * @example - onSubmit(e,data)
     */
    const onSubmit = (e) => {
        e.preventDefault();
        if (errorMessage) {
            return;
        }
        const updatedCustomField = [];
        updatedCustomFields.forEach((item) => {
            const customFieldWithValue = {
                ident: item.ident,
                value: item.value || '',
            };
            if (item.isRequired || ((item.value || touchedFieldsRef.current.has(item.ident)) && item.isEditable)) {
                updatedCustomField.push(customFieldWithValue);
            }
        });
        const finalCustomFields = {
            customFields: updatedCustomField,
            id: nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.caseId,
        };
        dispatch(updateCaseCustomFields(finalCustomFields));
        setInitialCustomFields(updatedCustomFields);
        setDisableSave(true);
    };
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
     * Used to get the label id
     * @param label - label
     * @returns string
     * @example
     * ```
     * getLabelId(label)
     * ```
     */
    const getLabelId = (label) => {
        if (!label)
            return '';
        return `${label.replace(emptySpaceRegex, '_')}_label`.toLowerCase();
    };
    /**
       * Function to on selecting popover item selection
       * @param ident - Identifier/Label of element
       * @param itemId - Id of selection
       * @example
       * ```
       * onTreeItemSelection(ident, itemId)
       * ```
       */
    const onTreeItemSelection = (ident, itemId) => {
        handleInputChange(undefined, { ident, value: itemId });
    };
    /**Pass the updatedCustomFields length to parent*/
    props.getUpdatedCustomFieldsLength(updatedCustomFields.length);
    return (_jsx(_Fragment, { children: updatedCustomFields.length > 0 &&
            _jsxs(Box, Object.assign({ sx: styles.paddingAll }, { children: [!enableInput ? (_jsx(Tooltip, Object.assign({ title: translate('edit') }, { children: _jsx(IconButton, Object.assign({ size: "small", className: "iconBtn", sx: styles.iconPadding, onKeyDown: (e) => {
                                if (isEnterKeyDown(e))
                                    setEnableInput(true);
                            }, "data-testid": 'edit-button' }, { children: _jsx(CcfEditBookIcon, { className: "edit-detail", id: `edit_${enableInput}`, sx: styles.modifyCustomFieldIcons, onClick: () => setEnableInput(true) }) })) }))) : (_jsxs(_Fragment, { children: [_jsx(Tooltip, Object.assign({ title: translate('save') }, { children: _jsx(IconButton, Object.assign({ size: "small", className: "iconBtn", sx: styles.iconPadding, onKeyDown: (e) => {
                                        if (isEnterKeyDown(e))
                                            onSubmit(e);
                                    }, disabled: disableSave, "data-testid": 'save-button', tabIndex: 0 }, { children: _jsx(DoneIcon, { onMouseDown: (event) => event.preventDefault(), className: "save-detail", sx: styles.modifyCustomFieldIcons, onClick: (e) => onSubmit(e) }) })) })), _jsx(Tooltip, Object.assign({ title: translate('discard') }, { children: _jsx(IconButton, Object.assign({ size: "small", className: "iconBtn", sx: styles.iconPadding, onKeyDown: (event) => { if (isEnterKeyDown(event))
                                        setEnableInput(false); }, "data-testid": 'discard-button' }, { children: _jsx(UndoIcon, { onMouseDown: handleDiscard, onClick: handleDiscard, sx: styles.modifyCustomFieldIcons }) })) }))] })), _jsx(Box, Object.assign({ sx: styles.errorMessage, "data-testid": 'errorFound' }, (ariaLive ? { 'aria-live': 'assertive', 'role': 'alert' } : {}), { children: errorMessage ? errorMessage : '' }), ariaLive ? `${errorMessage}arialive` : `${errorMessage}noAriaLive`), _jsx("form", Object.assign({ onSubmit: onSubmit, ref: formRef }, { children: _jsx(Grid, Object.assign({ container: true, direction: "row", justifyContent: "flex-start", alignItems: "flex-start", rowSpacing: 0.2, columnSpacing: 1.5, sx: styles.root }, { children: updatedCustomFields.length > 0 &&
                                (updatedCustomFields === null || updatedCustomFields === void 0 ? void 0 : updatedCustomFields.map((item) => {
                                    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
                                    if (item.type === FieldDataValues.TEXT && !enableInput && validationUtils.isValidURL(item.value)) {
                                        return (_jsxs(_Fragment, { children: [_jsxs(Grid, Object.assign({ item: true, xs: 2, sx: styles.gridLabelItem }, { children: [_jsx(CcfTooltip, Object.assign({ title: item.isRequired ? `${item.label} *` : item.label, arrow: true }, { children: _jsx(InputLabel, Object.assign({ sx: styles.inputLabel }, { children: item.label })) })), _jsx(InputLabel, Object.assign({ sx: styles.inputLabel }, { children: item.isRequired && _jsx("span", Object.assign({ style: { color: (_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.text) === null || _b === void 0 ? void 0 : _b.red } }, { children: "*" })) }))] })), _jsx(Grid, Object.assign({ item: true, xs: 4, sx: { paddingBottom: '1.7px' } }, { children: _jsx(CcfTooltip, Object.assign({ title: _jsx(CcfTypography, Object.assign({ sx: styles.urlFieldTooltip }, { children: item.value })), arrow: true }, { children: _jsx(Box, Object.assign({ sx: Object.assign(Object.assign(Object.assign({}, styles.inputFields), styles.savedInputFields), styles.readOnlyTextField) }, { children: _jsx(Linkify, Object.assign({ options: { attributes: { target: '_blank', rel: 'noopener noreferrer' } } }, { children: item.value })) })) })) }))] }));
                                    }
                                    else if (item.type === FieldDataValues.TEXT || item.type === FieldDataValues.EMAIL) {
                                        return (_jsxs(_Fragment, { children: [_jsxs(Grid, Object.assign({ item: true, xs: 2, sx: styles.gridLabelItem }, { children: [_jsx(CcfTooltip, Object.assign({ title: item.isRequired ? `${item.label} *` : item.label, arrow: true }, { children: _jsx(InputLabel, Object.assign({ sx: styles.inputLabel, id: getLabelId(item.label) }, { children: item.label })) })), _jsx(InputLabel, Object.assign({ sx: styles.inputLabel }, { children: item.isRequired && _jsx("span", Object.assign({ style: { color: (_d = (_c = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _c === void 0 ? void 0 : _c.text) === null || _d === void 0 ? void 0 : _d.red } }, { children: "*" })) }))] })), _jsx(Grid, Object.assign({ item: true, xs: 4 }, { children: _jsx(CcfTooltip, Object.assign({ title: item.value, arrow: true }, { children: _jsx(TextField, { onChange: (event) => handleInputChange(event), name: item.ident, error: item.type === FieldDataValues.EMAIL && !!errorMessage, variant: "outlined", value: item.value, id: item.ident, "data-testid": item.ident, onBlur: (event) => handleInputBlur(event, item), onFocus: () => handleInputFocus(item), autoComplete: "off", InputProps: { style: styles.inputFields }, disabled: !item.isEditable || !enableInput, sx: styles.savedInputFields, inputProps: {
                                                                'aria-labelledby': getLabelId(item.label),
                                                                tabIndex: !item.isEditable || !enableInput ? -1 : 0,
                                                            } }) })) }))] }));
                                    }
                                    else if (item.type === FieldDataValues.LIST) {
                                        return (item.type === FieldDataValues.LIST &&
                                            _jsxs(_Fragment, { children: [_jsxs(Grid, Object.assign({ item: true, xs: 2, sx: styles.gridLabelItem }, { children: [_jsx(CcfTooltip, Object.assign({ title: item.isRequired ? `${item.label} *` : item.label, arrow: true }, { children: _jsx(InputLabel, Object.assign({ sx: styles.inputLabel, id: getLabelId(item.label) }, { children: item.label })) })), _jsx(InputLabel, Object.assign({ sx: styles.inputLabel }, { children: item.isRequired && _jsx("span", Object.assign({ style: { color: (_f = (_e = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _e === void 0 ? void 0 : _e.text) === null || _f === void 0 ? void 0 : _f.red } }, { children: "*" })) }))] })), _jsx(Grid, Object.assign({ item: true, xs: 4 }, { children: _jsx(CcfTooltip, Object.assign({ title: (_g = item === null || item === void 0 ? void 0 : item.values) === null || _g === void 0 ? void 0 : _g.map((fieldValue) => {
                                                                return (item === null || item === void 0 ? void 0 : item.value) === (fieldValue === null || fieldValue === void 0 ? void 0 : fieldValue.name) && fieldValue.value;
                                                            }), disableHoverListener: (item === null || item === void 0 ? void 0 : item.value) === '', arrow: true }, { children: _jsx(TextField, Object.assign({ id: item.ident, name: item.ident, onChange: (event) => handleInputChange(event), select: true, value: item.value, size: "small", "data-testid": item.ident, autoComplete: "off", InputProps: { style: styles.dropdownFields, 'aria-labelledby': getLabelId(item.label) }, disabled: !item.isEditable || !enableInput, sx: styles.savedInputFields, tabIndex: -1 }, { children: item === null || item === void 0 ? void 0 : item.values.map((fieldValue) => {
                                                                    return _jsx(MenuItem, Object.assign({ sx: styles.dropdownItems, value: fieldValue.name }, { children: fieldValue.value }), fieldValue.name);
                                                                }) })) })) }))] }));
                                    }
                                    else {
                                        return (item.type === FieldDataValues.TREE && (_jsxs(_Fragment, { children: [_jsxs(Grid, Object.assign({ item: true, xs: 2, sx: styles.gridLabelItem }, { children: [_jsx(CcfTooltip, Object.assign({ title: item.isRequired ? `${item.label} *` : item.label, arrow: true }, { children: _jsx(InputLabel, Object.assign({ sx: styles.inputLabel, id: getLabelId(item.label) }, { children: item.label })) })), _jsx(InputLabel, Object.assign({ sx: styles.inputLabel }, { children: item.isRequired && _jsx("span", Object.assign({ style: { color: (_j = (_h = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _h === void 0 ? void 0 : _h.text) === null || _j === void 0 ? void 0 : _j.red } }, { children: "*" })) }))] })), _jsx(Grid, Object.assign({ item: true, xs: 4 }, { children: _jsx(CcfTooltip, Object.assign({ title: item.value, arrow: true }, { children: _jsx(CcfTreeElement, { customFields: item, enableInput: enableInput, onTreeItemSelection: onTreeItemSelection, inputProps: { 'aria-labelledby': getLabelId(item.label), tabIndex: item.isEditable || enableInput ? -1 : 0 } }) })) }))] })));
                                    }
                                })) })) }))] })) }));
}
export default CcfCustomFields;
//# sourceMappingURL=ccf-custom-fields.js.map