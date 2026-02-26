import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, FormGroup, Grid, IconButton, MenuItem, Select, useTheme, } from '@mui/material';
import { CcfBackIcon, CcfBox, CcfButton, CcfDatePickerIcon, CcfDivider, CcfTextField, CcfTypography, DividerOrientation, DividerVariant, useTranslator, CcfRadioGroup, CcfIconButton, CcfTooltip, } from '@nice-devone/ui-controls';
import { useSelector, useDispatch } from 'react-redux';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import React, { useMemo, useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { DateTimePicker, LocalizationProvider, renderTimeViewClock } from '@mui/x-date-pickers';
import ccfCommitmentStyles from './ccf-commitment-form.styles';
import { phoneOBSkillsSelector } from '../ccf-agent-skill/ccf-agent-skill-details-slice';
import { isValidPhoneNumber } from './../../util/uiValidationUtils';
import { commitmentActions, createCommitment, editCommitment, fetchTimeZones, getAddCommitmentByCall, getCommitmentPermission, getFormData, getIsEditCommitment, getIsRescheduleCommitment, getRemoveCommitmentSettings, getTimeZones, rescheduleCommitment, } from './ccf-commitment.slice';
import { getActiveContacts } from '../ccf-assignment-panel/ccf-assignment-panel.slice';
import { CallType } from '@nice-devone/agent-sdk';
import { userInfoSelector } from '../ccf-agent-state/ccf-agent-state.slice';
import { useRemoveCommitment } from './ccf-remove-commitment';
import { getApplicationLocale } from '../global.app.slice';
import { LocalStorageHelper, NotificationSettings } from '@nice-devone/core-sdk';
import { isDST } from '../../util/common';
/**
 * OpenPickerButtonWithTooltip wraps the picker button in a tooltip for accessibility
 */
const OpenPickerButtonWithTooltip = React.forwardRef(function OpenPickerButtonWithTooltip(props, ref) {
    const [translate] = useTranslator();
    return (_jsx(CcfTooltip, Object.assign({ title: `${translate('select')} ${translate('dateTime')}`, arrow: true }, { children: _jsx(IconButton, Object.assign({ ref: ref }, props, { children: _jsx(CcfDatePickerIcon, {}) })) })));
});
/**
 * CcfCommitmentsForm used to display commitment form
 * @example <CcfCommitmentsForm />
 */
export const CcfCommitmentsForm = (props) => {
    var _a, _b, _c;
    const { isFullView } = props;
    const [translate] = useTranslator();
    const theme = useTheme();
    const dispatch = useDispatch();
    const classes = ccfCommitmentStyles(theme);
    const [validateForm, setValidateForm] = useState({
        fname: '',
        lname: '',
        phone: '',
        dateTime: '',
    });
    const phoneOBSkills = useSelector(phoneOBSkillsSelector);
    const formState = useSelector(getFormData);
    const activeContacts = useSelector(getActiveContacts);
    const addCommitmentByCall = useSelector(getAddCommitmentByCall);
    const agentId = (_a = useSelector(userInfoSelector)) === null || _a === void 0 ? void 0 : _a.icAgentId;
    const timeZones = useSelector(getTimeZones);
    const isEditCommitment = useSelector(getIsEditCommitment);
    const isRescheduleCommitment = useSelector(getIsRescheduleCommitment);
    const notesRequiredToDelete = useSelector(getRemoveCommitmentSettings);
    const { delete: canDelete } = useSelector(getCommitmentPermission);
    const locale = useSelector(getApplicationLocale);
    const [timeZoneStandardName, setTimeZoneStandardName] = useState('');
    const [isSkillDropdownOpen, setSkillDropdownOpen] = useState(false);
    const [isTimeZoneDropdownOpen, setTimeZoneDropdownOpen] = useState(false);
    const { triggerRemoveToast } = useRemoveCommitment(notesRequiredToDelete, Number(formState.callbackId));
    const placeHolderValue = translate('addNotes');
    const [isValidDateTime, setIsValidDateTime] = useState(true);
    useEffect(() => {
        if (!formState.dateTime) {
            handleDateChange(dayjs().add(1, 'hour').format('YYYY-MM-DDTHH:mm:ss'));
        }
        return () => {
            dispatch(commitmentActions.goBackToPreviousState());
            dispatch(commitmentActions.setIsEditCommitment(false));
            dispatch(commitmentActions.setIsRescheduleCommitment(false));
        };
    }, []);
    useEffect(() => {
        const activeCall = activeContacts.find((contact) => contact.callType === CallType.REGULAR);
        if (activeCall && addCommitmentByCall) {
            const payload = {
                fieldName: 'phone',
                fieldValue: String(activeCall.contactMode),
            };
            dispatch(commitmentActions.formData(payload));
        }
    }, [dispatch, addCommitmentByCall]);
    useEffect(() => {
        var _a;
        if ((phoneOBSkills === null || phoneOBSkills === void 0 ? void 0 : phoneOBSkills.length) > 0 && !formState.skillId) {
            const payload = {
                fieldName: 'skillId',
                fieldValue: String((_a = phoneOBSkills[0]) === null || _a === void 0 ? void 0 : _a.skillId),
            };
            dispatch(commitmentActions.formData(payload));
        }
    }, [phoneOBSkills, dispatch, formState === null || formState === void 0 ? void 0 : formState.skillId]);
    useEffect(() => {
        var _a;
        if (!timeZones.length) {
            dispatch(fetchTimeZones());
        }
        setTimeZoneStandardName(((_a = timeZones.find(item => item.offset === formState.timeZone)) === null || _a === void 0 ? void 0 : _a.standardName) || '');
    }, [dispatch, timeZones]);
    const radioGroupOption = [
        {
            id: 'option1',
            value: translate('agent'),
            label: translate('agent'),
            isDisabled: isRescheduleCommitment,
            defaultSelected: true,
        },
        {
            id: 'option2',
            value: translate('skill'),
            label: translate('skill'),
            isDisabled: isRescheduleCommitment,
        }
    ];
    const isValidForm = useMemo(() => {
        return !!(formState.fname &&
            formState.lname &&
            formState.phone &&
            isValidPhoneNumber(formState.phone) &&
            !validateForm.dateTime);
    }, [formState, validateForm]);
    /**
     * Handle validation
     * @example validateCommitmentForm()
     */
    const validateCommitmentForm = (event) => {
        const { name, value } = event.target;
        switch (name) {
            case 'phone': {
                setValidateForm(Object.assign(Object.assign({}, validateForm), { [name]: !isValidPhoneNumber(value) || !value
                        ? `${translate('error')}: ${translate('phoneErrorMessage')}`
                        : '' }));
                break;
            }
            case 'fname': {
                setValidateForm(Object.assign(Object.assign({}, validateForm), { [name]: value ? '' : `${translate('error')}: ${translate('fnameErrorMessage')}` }));
                break;
            }
            case 'lname': {
                setValidateForm(Object.assign(Object.assign({}, validateForm), { [name]: value ? '' : `${translate('error')}: ${translate('lnameErrorMessage')}` }));
                break;
            }
        }
    };
    /**
     * Handle change is to handle form change event
     * @example handelChange()
     */
    const handleChange = (event) => {
        var _a;
        validateCommitmentForm(event);
        if (event.target.name === 'timeZone') {
            const timeZoneOffset = String((_a = timeZones.find((item) => item.standardName ===
                String(event.target.value))) === null || _a === void 0 ? void 0 : _a.offset);
            validateDateTime(formState.dateTime, timeZoneOffset);
            const payload = {
                fieldName: event.target.name,
                fieldValue: timeZoneOffset,
            };
            dispatch(commitmentActions.formData(payload));
            setTimeZoneStandardName(event.target.value);
            return;
        }
        const payload = {
            fieldName: event.target.name,
            fieldValue: String(event.target.value),
        };
        dispatch(commitmentActions.formData(payload));
    };
    /**
     *handleDateChange is to handle form change date event
     * @example handleDateChange()
     */
    const handleDateChange = (newValue) => {
        const payload = {
            fieldName: 'dateTime',
            fieldValue: newValue,
        };
        const isNewDateTimeValid = dayjs(newValue, 'YYYY-MM-DDTHH:mm:ss', true).isValid();
        setIsValidDateTime(isNewDateTimeValid);
        dispatch(commitmentActions.formData(payload));
    };
    /**
     * validate valid time, should not be less than current time
     * @example validateDateTime(dateTime)
     */
    const validateDateTime = (dateTime, timeZoneOffset) => {
        const updatedTimeZoneOffset = timeZoneOffset || formState.timeZone;
        const timeZoneCondition = updatedTimeZoneOffset.includes('-') ? '' : '+';
        const updatedDateString = dateTime || formState.dateTime;
        const updatedDateTimeWithTimezone = dayjs(new Date(updatedDateString + timeZoneCondition + updatedTimeZoneOffset));
        const dateDiff = dayjs().diff(updatedDateTimeWithTimezone);
        setValidateForm(Object.assign(Object.assign({}, validateForm), { dateTime: dateDiff > 0 ? translate('dateTimeErrorMessage') : '' }));
    };
    /**
     *handleAddCommitment is to handle save form state
     * @example handleAddCommitment()
     */
    const handleAddCommitment = () => {
        validateDateTime(formState.dateTime);
        //get offset.
        let offset = parseInt(formState.timeZone.split(':')[0]);
        const minutesOffset = formState.timeZone.split(':')[1];
        if (isDST(new Date(formState.dateTime))) {
            offset += 1;
        }
        const timeZone = (offset + ':' + minutesOffset).toString();
        const timeZoneCondition = timeZone.includes('-') ? '' : '+';
        const commitmentPayload = {
            firstName: formState.fname,
            lastName: formState.lname,
            notes: formState.notes,
            phoneNumber: formState.phone,
            scheduleDate: formState.dateTime + timeZoneCondition + timeZone,
            skillId: Number(formState.skillId),
            targetAgentId: formState.commitmentType === translate('skill') ? -1 : Number(agentId),
        };
        if (isValidForm && dayjs().diff(dayjs(formState.dateTime)) < 0) {
            const isRescheduleCommitmentEnabled = isRescheduleCommitment
                ? rescheduleCommitment({
                    callbackId: Number(formState.callbackId),
                    rescheduleDate: commitmentPayload.scheduleDate,
                }) : createCommitment(commitmentPayload);
            const handleSave = isEditCommitment
                ? editCommitment({
                    callbackId: Number(formState.callbackId),
                    commitmentPayload: commitmentPayload,
                }) : isRescheduleCommitmentEnabled;
            dispatch(handleSave);
            dispatch(commitmentActions.goBackToPreviousState());
            dispatch(commitmentActions.setIsEditCommitment(false));
            dispatch(commitmentActions.setIsRescheduleCommitment(false));
        }
    };
    const MenuProps = {
        PaperProps: {
            style: classes.selectOption,
        },
    };
    /**
     *setKeyBoardDate is to handle save form Date
     * @example setKeyBoardDate()
     */
    const setKeyBoardDate = (value) => {
        if (value === null || value === void 0 ? void 0 : value.format) {
            const newDate = value === null || value === void 0 ? void 0 : value.format('YYYY-MM-DDTHH:mm:ss');
            newDate && handleDateChange(newDate);
            validateDateTime(newDate);
        }
    };
    const isEditOrAddCommitment = isEditCommitment ? 'editCommitment' : 'addCommitments';
    const formTitle = isRescheduleCommitment ? 'rescheduleCommitment' : isEditOrAddCommitment;
    const is12HrTime = !(LocalStorageHelper.getItem(NotificationSettings.TWENTY_FOUR_HOUR_TIME) === 'true');
    return (_jsxs(FormGroup, Object.assign({ sx: isFullView ? classes.formWrapperLargeView : classes.formWrapper }, { children: [_jsxs(CcfBox, Object.assign({ sx: classes.titleContainer }, { children: [_jsxs(CcfBox, Object.assign({ sx: classes.iconContainer }, { children: [_jsx(CcfIconButton, Object.assign({ size: 'small', "data-testid": "go-back", role: 'button', onClick: () => dispatch(commitmentActions.goBackToPreviousState()), "aria-label": translate('backToScheduleLabel') }, { children: _jsx(CcfBackIcon, {}) })), _jsx(CcfTypography, { variant: 'h5', sx: classes.formLabelBold, translationKey: formTitle })] })), _jsx(CcfDivider, { orientation: DividerOrientation.HORIZONTAL, variant: DividerVariant.FULLWIDTH, sx: classes.dividerStyles })] })), _jsxs(CcfBox, Object.assign({ sx: classes.formContainer }, { children: [_jsx(CcfBox, Object.assign({ sx: classes.formLabel }, { children: _jsx(CcfRadioGroup, { data: radioGroupOption, onRadioButtonSelection: handleChange, name: "commitmentType", horizontalAlign: true, defaultValue: translate('agent'), size: "small" }) })), _jsx(Select, Object.assign({ id: "ccf-commitment-skill", value: formState === null || formState === void 0 ? void 0 : formState.skillId, onChange: handleChange, fullWidth: true, name: "skillId", size: "small", sx: isRescheduleCommitment
                            ? Object.assign(Object.assign({}, classes.textStyles), classes.disabled) : classes.textStyles, disabled: isRescheduleCommitment, MenuProps: MenuProps, open: isSkillDropdownOpen, onOpen: () => setSkillDropdownOpen(true), onClose: () => setSkillDropdownOpen(false), SelectDisplayProps: {
                            role: 'combobox',
                            'aria-haspopup': 'listbox',
                            'aria-expanded': isSkillDropdownOpen,
                            'aria-controls': 'ccf-commitment-skill-listbox',
                            'aria-autocomplete': 'none',
                            'aria-label': `${translate('select')} ${translate('skill')}`,
                        }, inputProps: { 'aria-label': `${translate('select')} ${translate('skill')}`, 'aria-haspopup': 'true', 'aria-autocomplete': 'none' } }, { children: phoneOBSkills.map((skill) => (_jsx(MenuItem, Object.assign({ dense: true, value: String(skill.skillId), sx: classes.menuItemStyle, title: skill.skillName, id: `ccf-commitment-skill-option-${skill.skillId}`, "aria-selected": (formState === null || formState === void 0 ? void 0 : formState.skillId) === String(skill.skillId) }, { children: skill.skillName }), skill.skillId))) })), _jsx(CcfDivider, { orientation: DividerOrientation.HORIZONTAL, variant: DividerVariant.FULLWIDTH, sx: classes.dividerStyles }), _jsxs(CcfBox, Object.assign({ sx: { width: '100%' } }, { children: [_jsx(CcfTypography, { variant: 'h5', sx: classes.formLabelBold, translationKey: "customer" }), _jsxs(Grid, Object.assign({ container: true, gap: '2%', sx: { paddingBottom: '5px' } }, { children: [_jsxs(Grid, Object.assign({ item: true, sx: classes.textFieldWrapper }, { children: [_jsx(CcfTypography, { sx: classes.labelFont, translationKey: "firstName" }), _jsx(CcfTextField, { name: "fname", id: "fname", size: "small", onChange: handleChange, inputProps: {
                                                    'data-testid': 'fname',
                                                    'aria-label': `${translate('insert')} ${translate('customer')} ${translate('firstName')}`,
                                                    'aria-required': true,
                                                }, sx: isRescheduleCommitment
                                                    ? Object.assign(Object.assign({}, classes.textFieldStyles), classes.disabled) : classes.textFieldStyles, error: !!validateForm.fname, helperText: validateForm.fname, onBlur: validateCommitmentForm, value: formState.fname, FormHelperTextProps: { style: classes.helperTextStyles }, disabled: isRescheduleCommitment })] })), _jsxs(Grid, Object.assign({ item: true, sx: classes.textFieldWrapper }, { children: [_jsx(CcfTypography, { sx: classes.labelFont, translationKey: "lastName" }), _jsx(CcfTextField, { name: "lname", id: "lname", size: "small", onChange: handleChange, inputProps: {
                                                    'data-testid': 'lname',
                                                    'aria-label': `${translate('insert')}  ${translate('customer')} ${translate('lastName')}`,
                                                    'aria-required': true,
                                                }, sx: isRescheduleCommitment
                                                    ? Object.assign(Object.assign({}, classes.textFieldStyles), classes.disabled) : classes.textFieldStyles, error: !!validateForm.lname, helperText: validateForm.lname, onBlur: validateCommitmentForm, value: formState.lname, FormHelperTextProps: { style: classes.helperTextStyles }, disabled: isRescheduleCommitment })] }))] })), _jsxs(CcfBox, { children: [_jsx(CcfTypography, { sx: classes.labelFont, translationKey: "contactInformation" }), _jsxs(CcfBox, Object.assign({ sx: { display: 'flex', gap: '2%' } }, { children: [_jsx(CcfTypography, { sx: classes.contactStyles, translationKey: "phone" }), _jsx(CcfTextField, { name: "phone", id: "phone", size: "small", inputProps: {
                                                    'data-testid': 'phone',
                                                    'aria-label': `${translate('insert')} ${translate('customer')} ${translate('phoneNumber')}`,
                                                    'aria-required': true,
                                                }, sx: isRescheduleCommitment
                                                    ? Object.assign(Object.assign({}, classes.contactTextFieldStyles), classes.disabled) : classes.contactTextFieldStyles, onChange: handleChange, error: !!validateForm.phone, helperText: validateForm.phone, onBlur: validateCommitmentForm, value: formState.phone, FormHelperTextProps: { style: classes.helperTextStyles }, disabled: isRescheduleCommitment })] }))] }), _jsxs(CcfBox, Object.assign({ sx: classes.wrappperContainer }, { children: [_jsx(CcfTypography, { sx: classes.formLabelBoldRequired, translationKey: "time" }), _jsx(Box, Object.assign({ sx: classes.datePicker }, { children: _jsx(LocalizationProvider, Object.assign({ dateAdapter: AdapterDayjs, adapterLocale: locale }, { children: _jsx(CcfBox, Object.assign({ "data-testid": "date-input" }, { children: _jsx(DateTimePicker, { viewRenderers: {
                                                        hours: renderTimeViewClock,
                                                        minutes: renderTimeViewClock,
                                                        seconds: renderTimeViewClock,
                                                    }, ampm: is12HrTime ? true : false, value: dayjs(formState.dateTime), onChange: (value) => {
                                                        const newDate = value === null || value === void 0 ? void 0 : value.format('YYYY-MM-DDTHH:mm:ss');
                                                        newDate && handleDateChange(newDate);
                                                        validateDateTime(newDate);
                                                    }, slotProps: {
                                                        textField: {
                                                            id: 'date-time',
                                                            fullWidth: true,
                                                            size: 'small',
                                                            onChange: (value) => setKeyBoardDate(value),
                                                            onBlur: (value) => setKeyBoardDate(value),
                                                            error: !!validateForm.dateTime,
                                                            helperText: validateForm.dateTime,
                                                            FormHelperTextProps: { style: classes.helperTextStyles },
                                                            inputProps: {
                                                                'aria-label': `${translate('select')} ${translate('time')}`,
                                                                'aria-required': true,
                                                            },
                                                        },
                                                        popper: {
                                                            placement: 'top-end',
                                                            sx: {
                                                                '& .MuiClock-clock': {
                                                                    '&:focus-within': {
                                                                        border: `0.0625rem solid ${(_c = (_b = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _b === void 0 ? void 0 : _b.border) === null || _c === void 0 ? void 0 : _c.menuItemHighlight}`,
                                                                    },
                                                                },
                                                            },
                                                        },
                                                    }, slots: {
                                                        textField: CcfTextField,
                                                        openPickerButton: OpenPickerButtonWithTooltip,
                                                    }, disablePast: true, minDateTime: dayjs() }, locale) })) })) }))] })), _jsxs(CcfBox, Object.assign({ sx: classes.wrappperContainer }, { children: [_jsx(CcfTypography, { sx: classes.formLabelBold, translationKey: "timeZone" }), _jsx(Select, Object.assign({ id: "time-zone", inputProps: { 'data-testid': 'timeZones', 'aria-label': `${translate('select')} ${translate('timeZone')}` }, value: timeZoneStandardName, onChange: handleChange, fullWidth: true, name: "timeZone", size: "small", sx: classes.timeZoneStyles, MenuProps: MenuProps, open: isTimeZoneDropdownOpen, onOpen: () => setTimeZoneDropdownOpen(true), onClose: () => setTimeZoneDropdownOpen(false), SelectDisplayProps: {
                                            role: 'combobox',
                                            'aria-haspopup': 'listbox',
                                            'aria-controls': 'time-zone-listbox',
                                            'aria-label': `${translate('select')} ${translate('timeZone')}`,
                                            'aria-autocomplete': 'none',
                                        } }, { children: timeZones.map((data) => (_jsx(MenuItem, Object.assign({ dense: true, value: data.standardName, sx: classes.menuItemStyle, title: data.displayName, id: `time-zone-option-${data.standardName}`, "aria-selected": timeZoneStandardName === data.standardName }, { children: data.displayName }), data.displayName))) }))] })), _jsxs(CcfBox, Object.assign({ sx: classes.wrappperContainer }, { children: [_jsx(CcfTypography, { sx: classes.formLabelBold, translationKey: "notes" }), _jsx(CcfTextField, { name: "notes", id: "notes", fullWidth: true, onChange: handleChange, placeholder: placeHolderValue, multiline: true, sx: isRescheduleCommitment
                                            ? Object.assign(Object.assign({}, classes.textAreaStyles), classes.disabled) : classes.textAreaStyles, value: formState.notes, disabled: isRescheduleCommitment, inputProps: { 'aria-label': `${translate('enter')} ${translate('notes')}` } })] }))] })), _jsxs(CcfBox, Object.assign({ sx: classes.buttonWrapper }, { children: [_jsx(CcfButton, Object.assign({ onClick: () => dispatch(commitmentActions.goBackToPreviousState()), "data-testid": "cancel", "aria-label": translate('cancel') }, { children: _jsx(CcfTypography, { translationKey: "cancel", sx: classes.textStyles }) })), _jsx(CcfButton, Object.assign({ primary: true, onClick: handleAddCommitment, "data-testid": "add", disabled: !isValidForm || !isValidDateTime, "aria-label": translate('save') }, { children: _jsx(CcfTypography, { translationKey: "save", sx: classes.textStyles }) })), isEditCommitment && canDelete && (_jsx(CcfButton, Object.assign({ primary: true, onClick: triggerRemoveToast, "data-testid": "remove", disabled: !isValidForm || !isValidDateTime, "aria-label": translate('remove') }, { children: _jsx(CcfTypography, { translationKey: "remove", sx: classes.textStyles }) })))] }))] }))] })));
};
//# sourceMappingURL=ccf-commitment-form.js.map