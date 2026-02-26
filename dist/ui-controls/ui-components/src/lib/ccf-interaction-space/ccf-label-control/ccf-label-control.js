import { __awaiter } from "tslib";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Autocomplete, Box, Typography, TextField, Chip, useTheme, Select, MenuItem } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { CcfTextField, CcfTooltip, CcfTypography } from '@nice-devone/ui-controls';
import { useEffect, useRef, useState, memo } from 'react';
import { agentDirectoryActions, getExternalDirectories, selectDirectoryEntries, selectExternalDirectorySubscriptionId, standardAddressBookEntriesForAutoComplete, standardAddressBooks, standardBookEntriesForAutoComplete, standardBookNames } from '../../ccf-directory/+state/ccf-directory.slice';
import { currentUserAgentId } from '../../ccf-agent-state/ccf-agent-state.slice';
import { ValidationUtils } from '@nice-devone/core-sdk';
import CcfLabelControlStyles from './ccf-label-control.styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
export var CcfLabelControlType;
(function (CcfLabelControlType) {
    CcfLabelControlType["EMAIL"] = "email";
    CcfLabelControlType["TEXT"] = "text";
    CcfLabelControlType["DROPDOWN"] = "dropdown";
})(CcfLabelControlType || (CcfLabelControlType = {}));
/**
  * Method to get the limit tags text
  * @example - LimitTagsText()
  * @param more - number
*/
export const LimitTagsText = ({ more, tooltipText, styles, theme }) => {
    var _a;
    return (_jsx(CcfTooltip, Object.assign({ title: tooltipText, styles: { ccfTooltip: Object.assign({}, styles === null || styles === void 0 ? void 0 : styles.tooltip) } }, { children: _jsx("span", Object.assign({ style: {
                marginLeft: '8px',
                fontSize: (_a = styles === null || styles === void 0 ? void 0 : styles.label) === null || _a === void 0 ? void 0 : _a.font,
                cursor: 'pointer',
                textDecoration: 'underline',
                color: theme.palette.primary.main,
            } }, { children: `${more} more` })) })));
};
/**
 * Component to display label and dynamic control or static text
 * @returns a wrapper containing label and dynamic control or static text
 * ```
 * @example
 * <CcfLabelControl
 *  label="To"
 *  value="demo@nice.com"
 * />
 *
 * <CcfLabelControl
 *  label="Subject"
 *  isRequired=true
 *  controlType="text"
 *  onValueChange={handleSubjectChange}
 * />
 *
 * ```
 */
export function CcfLabelControl(props) {
    const { isValid, errorMessage, controlType, isRequired, label, styles, value: valueFromProps, onValueChange, replyChannels, onBlur, } = props;
    const theme = useTheme();
    const validationUtil = new ValidationUtils();
    const [fieldValuesFromEditor, setFieldValuesFromEditor] = useState(valueFromProps);
    const [isInvalidValue, setInvalidity] = useState(false);
    const [isEmailInvalid, setEmailInvalid] = useState(false);
    const [autoCompleteValue, setAutoCompleteValue] = useState('');
    const [selectedMailIds, setSelectedMailIds] = useState([]);
    const userListFromStore = useSelector(standardAddressBookEntriesForAutoComplete);
    const [userList, setUserList] = useState([]);
    const [fieldOnFocus, setFieldOnFocus] = useState('');
    const agentId = useSelector(currentUserAgentId);
    const addressBooks = useSelector(standardAddressBooks);
    const [tooltipText, setTooltipText] = useState('');
    const [autocompleteInputwidth, setAutocompleteInputWidth] = useState('10px');
    const ccfLabelControlStyles = CcfLabelControlStyles(theme, { label, fieldOnFocus, autocompleteInputwidth });
    const externalDirectories = useSelector(getExternalDirectories);
    const externalDirectorySubscriptionId = useSelector(selectExternalDirectorySubscriptionId);
    const directoryEntries = useSelector(selectDirectoryEntries);
    const inputRef = useRef(null);
    const dispatch = useDispatch();
    const prevEmailStringRef = useRef('');
    /**
     * autocompleteTextOverflows - used to by events in Autocomplete input
     * to determine the overflowing of text
     * @example autocompleteTextOverflows
     */
    const autocompleteTextOverflows = (event) => {
        const textFieldElement = event.target;
        return textFieldElement.scrollWidth > textFieldElement.clientWidth;
    };
    /**
     * handleInputChange - used to adjust the width of the textfield inside the autocomplete
     * when user types
     * @example handleInputChange
     */
    const handleInputChange = (event) => {
        const isOverflowing = autocompleteTextOverflows(event);
        if (isOverflowing) {
            setAutocompleteInputWidth('100%');
        }
    };
    /**
     * handleInputKeydown- used to adjust the width when user presses backspace
     * in AUtocomplete textField
     * @example handleInputKeydown(e)
     */
    const handleInputKeydown = (event) => {
        if (event.key === 'Backspace') {
            const isOverflowing = autocompleteTextOverflows(event);
            if (!isOverflowing) {
                setAutocompleteInputWidth('10px');
            }
        }
    };
    useEffect(() => {
        setFieldValuesFromEditor(valueFromProps);
        if (valueFromProps) {
            checkifRequiredValidityNotMet(valueFromProps);
            if (controlType === CcfLabelControlType.EMAIL)
                checkIfEmailIsInValid(valueFromProps);
        }
        else {
            if (props.isRequired) {
                // Disable send button if invalid email/subject
                isValid && isValid(false);
            }
        }
        if (controlType === CcfLabelControlType.EMAIL) {
            if ((addressBooks === null || addressBooks === void 0 ? void 0 : addressBooks.length) === 0)
                dispatch(standardBookNames(agentId));
            dispatch(agentDirectoryActions.updateExternalDirectoryState(true));
            dispatch(agentDirectoryActions.hideExternalDirectoryData(false));
        }
        return () => {
            if (controlType === CcfLabelControlType.EMAIL) {
                dispatch(agentDirectoryActions.updateExternalDirectoryState(false));
                dispatch(agentDirectoryActions.hideExternalDirectoryData(true));
            }
        };
    }, []);
    useEffect(() => {
        // To update the email subject and from address when we switch between reply and forward mode.
        if (controlType === CcfLabelControlType.TEXT && label === 'subject' || label === 'from') {
            setFieldValuesFromEditor(valueFromProps);
        }
        //To update the email To, CC and BCC address when we switch between reply and forward mode.
        if (controlType === CcfLabelControlType.EMAIL && (label === 'to' || label === 'cc' || label === 'bcc')) {
            setSelectedMailIds([]); // Reset selected mail ids when switching between reply and forward mode
            if (valueFromProps) {
                checkIfEmailIsInValid(valueFromProps); // Adding new values into the autocomplete list
            }
        }
    }, [valueFromProps]);
    useEffect(() => {
        shiftScroll();
        let emailListString = '';
        if (selectedMailIds.length > 0) {
            emailListString = selectedMailIds.map(value => value.email).join(',');
            if (selectedMailIds.length > 2) {
                setTooltipText(selectedMailIds.slice(2, selectedMailIds.length).map(value => value.email).join(', '));
            }
            if (controlType === CcfLabelControlType.EMAIL && label === 'to') {
                isValid && isValid(true);
            }
        }
        else if (selectedMailIds.length === 0) {
            if (controlType === CcfLabelControlType.EMAIL && label === 'to') {
                isValid && isValid(false);
            }
        }
        if ((prevEmailStringRef === null || prevEmailStringRef === void 0 ? void 0 : prevEmailStringRef.current) !== emailListString) {
            onValueChange && onValueChange(emailListString); // to avoid multiple calls to onValueChange when there is no change in email string
        }
        prevEmailStringRef.current = emailListString;
    }, [selectedMailIds]);
    useEffect(() => {
        if (userListFromStore)
            setUserList(() => [...userListFromStore]);
    }, [userListFromStore]);
    useEffect(() => {
        let filteredDirectoryEntries = [];
        directoryEntries.map(entry => {
            if (entry && entry.firstname && entry.lastname && entry.email && entry.firstname !== '' && entry.lastname !== '' && entry.email !== '') {
                filteredDirectoryEntries = [...filteredDirectoryEntries, { firstName: entry.firstname, lastName: entry.lastname, email: entry.email }];
            }
        });
        filteredDirectoryEntries = filteredDirectoryEntries.slice(0, (filteredDirectoryEntries.length > 15) ? 15 : filteredDirectoryEntries.length);
        setUserList(prevValue => [...prevValue, ...filteredDirectoryEntries]);
    }, [directoryEntries]);
    useEffect(() => {
        setUserList([]);
        if (autoCompleteValue && autoCompleteValue.length > 1 && controlType === CcfLabelControlType.EMAIL) {
            const timeoutId = setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                var _a;
                if (addressBooks && (addressBooks === null || addressBooks === void 0 ? void 0 : addressBooks.length) > 0) {
                    const selectedAddressBooks = addressBooks.length > 3 ? addressBooks.slice(0, 3) : addressBooks;
                    const payload = {
                        addressBooks: selectedAddressBooks,
                        skip: 0,
                        top: 5,
                        searchText: autoCompleteValue,
                    };
                    dispatch(standardBookEntriesForAutoComplete(payload));
                }
                if (externalDirectories && ((_a = Object.keys(externalDirectories)) === null || _a === void 0 ? void 0 : _a.length) > 0) {
                    dispatch(agentDirectoryActions.searchDirectories({
                        subscriptionId: externalDirectorySubscriptionId,
                        offset: 0,
                        limit: 15,
                        realTimeUpdates: false,
                        searchText: autoCompleteValue,
                        directoryUid: '',
                    }));
                }
            }), 1000);
            return () => {
                clearTimeout(timeoutId);
            };
        }
        return;
    }, [autoCompleteValue]);
    let emailInvalid = false;
    let requiredInvalid = false;
    /**
     * checkIfEmailIsValid used to validate if email is valid
     * @example checkIfEmailIsInValid
     */
    const checkIfEmailIsInValid = (val) => {
        const emailArray = val === null || val === void 0 ? void 0 : val.split(',');
        let isEmailValid = true;
        if (emailArray) {
            for (const email of emailArray) {
                if (email && !validationUtil.validateEmail(email.trim())) {
                    isEmailValid = false;
                    break;
                }
            }
            if (isEmailValid === false) {
                setEmailInvalid(true);
                emailInvalid = true;
                isValid && isValid(!(emailInvalid || requiredInvalid));
                if (controlType === CcfLabelControlType.EMAIL && emailArray && emailArray.length > 0) {
                    emailArray.map((value) => {
                        setSelectedMailIds((prevValue) => [
                            ...prevValue,
                            { firstName: '', lastName: '', email: value.trim() }
                        ]);
                    });
                }
            }
            else {
                setEmailInvalid(false);
                emailInvalid = false;
                isValid && isValid(!(emailInvalid || requiredInvalid));
                emailArray.map(email => {
                    setSelectedMailIds((prevValue) => [
                        ...prevValue,
                        { firstName: '', lastName: '', email: email }
                    ]);
                });
            }
        }
    };
    /**
     * checkifRequiredValidityNotMet used to ensure that the control has value if isRequired is true
     * @example checkifRequiredValidityNotMet()
     */
    const checkifRequiredValidityNotMet = (val) => {
        if (!props.isRequired || (props.isRequired && val)) {
            // check for empty spaces in email subject
            setInvalidity(label === 'subject' && !(val === null || val === void 0 ? void 0 : val.trim()) ? true : false);
            requiredInvalid = false;
            isValid && isValid(!(emailInvalid || requiredInvalid));
        }
        else {
            setInvalidity(true);
            requiredInvalid = true;
            isValid && isValid(!(emailInvalid || requiredInvalid));
        }
    };
    /**
     * handleValueChange used to handle input value change
     * @example handleValueChange(e)
     */
    const handleValueChange = (e) => {
        const newValue = e.currentTarget.value;
        (label === 'subject') && validate(e);
        setFieldValuesFromEditor(newValue);
        if (onValueChange) {
            onValueChange(newValue);
        }
    };
    /**
     * validate used to validate input value on focus out
     * @example validate(e)
     */
    const validate = (e) => {
        controlType === CcfLabelControlType.EMAIL && checkIfEmailIsInValid(e.currentTarget.value);
        checkifRequiredValidityNotMet(e.currentTarget.value);
    };
    /**
     * removeError used to remove error
     * @example removeError(e)
     */
    const removeError = () => {
        setEmailInvalid(false);
        setInvalidity(false);
    };
    /**
     * renderAutoCompleteOptions used to render options in autocomplete component
     * @example renderAutoCompleteOptions
     */
    const renderAutoCompleteOptions = (props, { firstName, lastName, email }) => (_jsx("span", Object.assign({}, props, { children: _jsxs(Box, { children: [_jsx(Typography, Object.assign({ variant: "subtitle1", style: { color: '#306484' } }, { children: `${firstName} ${lastName}` })), _jsx(Typography, Object.assign({ variant: "caption" }, { children: email }))] }) })));
    /**
     * Function to filter available items in optionList based on value against firstName and lastName
     * @returns - filtered options as an array
     * @param optionList - AddressBooksEntries[]
     * @param value - string
     * @example - getFilteredValuesFromAutoCompleteOptionList(optionList: AddressBooksEntries[], value: string)
     */
    const getFilteredValuesFromAutoCompleteOptionList = (optionList, value) => {
        return optionList.filter((option) => `${option.firstName.toLowerCase()} ${option.lastName.toLowerCase()}`.includes(value.trim().toLowerCase()));
    };
    /**
     * filterAutoCompleteOptions filters the list of options matching with search text
     * returns returns the filteredList
     * @param options - the list of options available will be passed by mui autocomplet component automatically of type, AddressBooksEntries[]
     * @param state - current state of the component is automatically passed, and input value will be used
     * @example filterAutoCompleteOptions
     */
    const filterAutoCompleteOptions = (options, state) => {
        if (autoCompleteValue.length < 2) {
            return [];
        }
        const filteredOptions = getFilteredValuesFromAutoCompleteOptionList(options, state.inputValue);
        return filteredOptions;
    };
    /**
     * handleKeydown used to handle key events in autocomplete component
     * @param event - event, keyboard events will be passed
     * @example handleKeydown
     */
    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && autoCompleteValue.trim() !== '') {
            const matchingOptions = getFilteredValuesFromAutoCompleteOptionList(userList, autoCompleteValue);
            if (matchingOptions.length > 0) {
                const { firstName, lastName, email } = matchingOptions[0];
                setSelectedMailIds((prevMailIds) => [...prevMailIds, { firstName, lastName, email }]);
            }
            else if (validationUtil.validateEmail(autoCompleteValue.trim())) {
                setSelectedMailIds((prevMailIds) => [
                    ...prevMailIds,
                    { firstName: '', lastName: '', email: autoCompleteValue.trim() }
                ]);
                setAutoCompleteValue('');
            }
            setAutocompleteInputWidth('10px');
            event.preventDefault();
        }
        else if (event.key === 'Backspace' && autoCompleteValue === '') {
            setSelectedMailIds((prevMailIds) => {
                if (prevMailIds.length > 0) {
                    const updatedMailIds = [...prevMailIds];
                    updatedMailIds.pop();
                    return updatedMailIds;
                }
                return prevMailIds;
            });
            event.preventDefault();
        }
    };
    /**
     * Method to scroll to bottom of element
     * @example -shiftScroll()
     */
    const shiftScroll = () => {
        var _a;
        if (inputRef.current) {
            (_a = inputRef === null || inputRef === void 0 ? void 0 : inputRef.current) === null || _a === void 0 ? void 0 : _a.scrollIntoView({
                behavior: 'smooth',
                block: 'end',
                inline: 'end',
            });
        }
    };
    /**
     * Method to handle pasting a long list of email ids
     * this function gets the pasted data, splits the string into string array using comma, semicolon and space characters as delimiters
     * validates if the split array elements are valid email id (based on regexp) ; breaks on the first instance of invalid email id
     * and appends the list of valid emails to the selected email list
     * @example -handlePaste(event: React.ClipboardEvent<HTMLInputElement>)
     */
    const handlePaste = (event) => {
        event.preventDefault();
        const pastedData = event.clipboardData.getData('text');
        const validEmailIdsFromPastedData = pastedData
            .split(/[\s,;]+/)
            .map(email => email.trim())
            .filter(email => email.length > 0);
        const listOfEmailIds = [];
        for (const emailId of validEmailIdsFromPastedData) {
            if (!validationUtil.validateEmail(emailId)) {
                break;
            }
            ;
            //as these email ids are pasted we dont have the firstname and last name pushing it as empty values
            listOfEmailIds.push({ firstName: '', lastName: '', email: emailId });
        }
        setSelectedMailIds((prevMailIds) => [
            ...prevMailIds,
            ...listOfEmailIds
        ]);
        setAutoCompleteValue('');
    };
    /**
     * Method to get the limit tags text
     * @example -getLimitTagsText(more)
     * @param more - number of more tags
     */
    const getLimitTagsText = (more) => (_jsx(LimitTagsText, { more: more, tooltipText: tooltipText, styles: styles, theme: theme }));
    return (_jsxs(Box, Object.assign({ component: 'div', sx: ccfLabelControlStyles.wrapper, style: Object.assign({}, styles === null || styles === void 0 ? void 0 : styles.wrapper) }, { children: [_jsx(CcfTypography, { translationKey: label, style: controlType !== CcfLabelControlType.EMAIL
                    ? Object.assign({}, styles === null || styles === void 0 ? void 0 : styles.label) : Object.assign(Object.assign({}, styles === null || styles === void 0 ? void 0 : styles.label), { marginTop: '0.313rem', marginBottom: 'auto' }) }), _jsx("span", Object.assign({ style: controlType !== CcfLabelControlType.EMAIL
                    ? Object.assign(Object.assign({}, styles === null || styles === void 0 ? void 0 : styles.colon), { transform: 'translateY(-0.063rem)', marginBottom: 'auto', marginLeft: '0.125rem' }) : Object.assign(Object.assign({}, styles === null || styles === void 0 ? void 0 : styles.colon), { marginTop: '0.188rem', marginBottom: 'auto', marginLeft: '0.125rem' }) }, { children: ":" })), 
            // For outbound email input type email controls. Ex. from, to, cc, bcc
            !!controlType && controlType === CcfLabelControlType.EMAIL && (_jsx(Autocomplete, { multiple: true, id: "multiple-limit-tags", options: userList || [], inputValue: autoCompleteValue, noOptionsText: "", open: filterAutoCompleteOptions(userList, { inputValue: autoCompleteValue }).length > 0 &&
                    label === fieldOnFocus, onInputChange: (_, newInputValue) => setAutoCompleteValue(newInputValue), onKeyDown: handleKeyDown, filterOptions: filterAutoCompleteOptions, renderOption: renderAutoCompleteOptions, autoHighlight: true, onChange: (_, value) => {
                    setAutoCompleteValue('');
                    setSelectedMailIds([...value]);
                }, filterSelectedOptions: true, onFocus: () => {
                    setUserList([]);
                    setFieldOnFocus(label);
                }, onBlur: () => {
                    setUserList([]);
                    setFieldOnFocus('');
                }, limitTags: 2, getLimitTagsText: getLimitTagsText, renderTags: (value, getTagProps) => value.map((option, index) => (_jsx(Chip, Object.assign({}, getTagProps({ index }), { label: option.email, deleteIcon: _jsx(CloseIcon, {}), "aria-label": option.email, sx: Object.assign(Object.assign({}, ccfLabelControlStyles.chip), ccfLabelControlStyles.chipDelete) })))), sx: ccfLabelControlStyles.autocomplete, value: selectedMailIds, renderInput: (params) => (_jsx(TextField, Object.assign({}, params, { inputRef: inputRef, onKeyDown: handleInputKeydown, onPaste: handlePaste, "data-testid": "multiple-limit-tags", sx: { display: 'grid' }, onChange: handleInputChange, inputProps: Object.assign(Object.assign({}, params.inputProps), { 'data-testid': 'autocomplete-input', 'aria-label': label }), onBlur: () => onBlur && onBlur() }))) })), 
            // For outbound email input type text controls. Ex. subject
            !!controlType && controlType === CcfLabelControlType.TEXT && (_jsx(CcfTextField, { onBlur: (e) => {
                    onBlur && onBlur();
                    validate(e);
                }, onFocus: () => {
                    removeError();
                }, id: label + Math.random(), type: controlType, required: isRequired, value: fieldValuesFromEditor, onChange: handleValueChange, error: isInvalidValue, inputProps: { style: styles === null || styles === void 0 ? void 0 : styles.control, 'data-testid': 'textfield-input' }, helperText: isInvalidValue || isEmailInvalid ? errorMessage : '', sx: ccfLabelControlStyles.textfieldstyles })), !!controlType && controlType === CcfLabelControlType.DROPDOWN && (_jsx(Select, Object.assign({ variant: "standard", disableUnderline: true, value: fieldValuesFromEditor, id: "FROM", onChange: (event) => {
                    var _a, _b;
                    onValueChange && onValueChange((_a = event.target) === null || _a === void 0 ? void 0 : _a.value);
                    setFieldValuesFromEditor((_b = event.target) === null || _b === void 0 ? void 0 : _b.value);
                }, onBlur: () => onBlur && onBlur(), sx: ccfLabelControlStyles.fromDropdown, IconComponent: ExpandMoreIcon, MenuProps: ccfLabelControlStyles.fromMenuProps, renderValue: () => {
                    return (_jsx(CcfTypography, Object.assign({ sx: ccfLabelControlStyles.selectedFromAddress }, { children: fieldValuesFromEditor })));
                } }, { children: replyChannels === null || replyChannels === void 0 ? void 0 : replyChannels.map((channel) => (_jsx(MenuItem, Object.assign({ value: channel.name }, { children: _jsxs(Box, Object.assign({ sx: ccfLabelControlStyles.dropdownItem }, { children: [_jsx(CcfTypography, Object.assign({ sx: ccfLabelControlStyles.dropDownItemHeader }, { children: channel.name })), _jsx(CcfTypography, Object.assign({ sx: ccfLabelControlStyles.dropDownItemSubHeader }, { children: channel.id }))] })) }), channel.id))) }))), 
            // For static text display. Ex. inbound email from, to, header, cc, etc.
            !controlType && (_jsx(Typography, Object.assign({ component: 'h5', sx: ccfLabelControlStyles.text, style: styles === null || styles === void 0 ? void 0 : styles.text }, { children: valueFromProps })))] })));
}
export default memo(CcfLabelControl);
//# sourceMappingURL=ccf-label-control.js.map