import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, FormControl, MenuItem, Select, Stack, TextField, Typography, useTheme } from '@mui/material';
import { CcfBox, CcfButton, CcfCloseIcon, CcfDatePickerIcon, CcfIconButton, CcfTextField, CcfTypography, useTranslator } from '@nice-devone/ui-controls';
import { useDispatch, useSelector } from 'react-redux';
import { rescheduleCall, snoozeContact, voiceContactSelector } from '../../ccf-assignment-panel/ccf-assignment-panel.slice';
import dayjs from 'dayjs';
import { useEffect, useMemo, useState } from 'react';
import { commitmentActions, fetchTimeZones, getFormData, getTimeZones } from '../../ccf-commitment/ccf-commitment.slice';
import CcfReschedulePopoverStyles from './ccf-reschedule-popover.style';
import { DateTimePicker, LocalizationProvider, renderTimeViewClock } from '@mui/x-date-pickers';
import { getApplicationLocale } from '../../global.app.slice';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import ccfCommitmentStyles from '../../ccf-commitment/ccf-commitment-form.styles';
import { isValidPhoneNumber } from '../../../util/uiValidationUtils';
import { DispostionPreview } from '../../../enums/disposition-preview';
/**
 * DatePickerIcon used to display date picker icon
 * @example <DatePickerIcon />
 */
const DatePickerIcon = () => {
    return (_jsx(CcfBox, Object.assign({ sx: { display: 'flex' } }, { children: _jsx(CcfDatePickerIcon, {}) })));
};
/**
 * @example <CcfReschedulePopover />
 * @returns Reschedule popover
 */
export function CcfReschedulePopover(props) {
    const dispatch = useDispatch();
    const [translate] = useTranslator();
    const theme = useTheme();
    const styles = CcfReschedulePopoverStyles();
    const commitmentStyles = ccfCommitmentStyles(theme);
    const voiceContactDetails = useSelector(voiceContactSelector);
    const timeZones = useSelector(getTimeZones);
    const formState = useSelector(getFormData);
    const [timeZoneStandardName, setTimeZoneStandardName] = useState('');
    const locale = useSelector(getApplicationLocale);
    const [phoneNumber, setPhoneNumber] = useState(voiceContactDetails === null || voiceContactDetails === void 0 ? void 0 : voiceContactDetails.dnis);
    const [rescheduleCallNotes, setRescheduleCallNotes] = useState('');
    const [validateForm, setValidateForm] = useState({
        customerName: '',
        phoneNumber: '',
        dateTime: '',
    });
    useEffect(() => {
        if (!formState.dateTime || formState.dateTime !== dayjs().format('YYYY-MM-DDTHH:mm:ss')) {
            handleDateChange(dayjs().add(1, 'hour').format('YYYY-MM-DDTHH:mm:ss'));
        }
    }, []);
    /**
     *handleDateChange is to handle form change date event
     * @example handleDateChange()
     */
    const handleDateChange = (newValue) => {
        const payload = {
            fieldName: 'dateTime',
            fieldValue: newValue,
        };
        dispatch(commitmentActions.formData(payload));
    };
    /**
     * validate time, should not be less than current time
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
    const isValidForm = useMemo(() => {
        return !!((voiceContactDetails === null || voiceContactDetails === void 0 ? void 0 : voiceContactDetails.label) &&
            (voiceContactDetails === null || voiceContactDetails === void 0 ? void 0 : voiceContactDetails.dnis) &&
            phoneNumber &&
            isValidPhoneNumber(phoneNumber) &&
            !validateForm.dateTime);
    }, [formState, validateForm]);
    /**
     *handleRescheduleSave is to handle reschedule save event
     * @example handleRescheduleSave()
     */
    const handleRescheduleSave = () => {
        validateDateTime(formState.dateTime);
        if (isValidForm && dayjs().diff(dayjs(formState.dateTime)) < 0) {
            const data = {
                contactId: voiceContactDetails === null || voiceContactDetails === void 0 ? void 0 : voiceContactDetails.contactID,
                dispositionId: DispostionPreview.dispositionId,
                callbackNumber: phoneNumber,
                callbackTime: formState.dateTime,
                rescheduleCallNotes: rescheduleCallNotes,
            };
            dispatch(rescheduleCall(data));
        }
    };
    /**
     *handleSnooze is to handle snooze event
     * @example handleSnooze()
     */
    const handleSnooze = () => {
        dispatch(snoozeContact(voiceContactDetails === null || voiceContactDetails === void 0 ? void 0 : voiceContactDetails.contactID));
    };
    /**
     * Used to handle popover close click event
     * @example handlePopoverClose()
     */
    const handlePopoverClose = (event) => {
        props.handlePopoverClose(event);
    };
    /**
     * Handle form change event
     * @example handleTimeZoneChange()
     */
    const handleTimeZoneChange = (event) => {
        setTimeZoneStandardName(event.target.value);
        return;
    };
    /**
     * Handle phone number change event
     * @example handlePhoneNumberChange()
     */
    const handlePhoneNumberChange = (event) => {
        setPhoneNumber(event.target.value);
    };
    /**
     * Handle notes text field change event
     * @example handleRescheduleNotesChange()
     */
    const handleRescheduleNotesChange = (event) => {
        setRescheduleCallNotes(event.target.value);
    };
    useEffect(() => {
        var _a;
        if (!(timeZones === null || timeZones === void 0 ? void 0 : timeZones.length)) {
            dispatch(fetchTimeZones());
        }
        setTimeZoneStandardName(((_a = timeZones === null || timeZones === void 0 ? void 0 : timeZones.find(item => item.offset === formState.timeZone)) === null || _a === void 0 ? void 0 : _a.standardName) || '');
    }, [dispatch, timeZones]);
    return (_jsxs(Stack, Object.assign({ flexDirection: 'column', padding: 2 }, { children: [_jsxs(Stack, Object.assign({ flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 1 }, { children: [_jsx(Typography, Object.assign({ variant: 'h4', sx: { display: 'flex', alignItems: 'center' } }, { children: translate('Reschedule') })), _jsx(CcfIconButton, Object.assign({ "aria-label": translate('close'), sx: styles.closeIcon, onClick: (e) => handlePopoverClose(e) }, { children: _jsx(CcfCloseIcon, {}) }))] })), _jsxs(FormControl, Object.assign({ sx: styles.popoverFormControl }, { children: [props.snoozeButtonEnabled && _jsx(CcfButton, Object.assign({ size: 'small', variant: 'outlined', fullWidth: true, sx: { marginBottom: .5 }, onClick: handleSnooze }, { children: translate('snooze') })), _jsx(CcfTypography, { sx: commitmentStyles.labelFont, translationKey: "customer" }), _jsx(TextField, { inputProps: { 'data-testid': 'customer-name' }, value: voiceContactDetails === null || voiceContactDetails === void 0 ? void 0 : voiceContactDetails.label, disabled: true, size: 'small', variant: 'outlined' }), _jsx(CcfTypography, { sx: commitmentStyles.labelFont, translationKey: "phoneNumber" }), _jsx(TextField, { defaultValue: voiceContactDetails === null || voiceContactDetails === void 0 ? void 0 : voiceContactDetails.dnis, size: 'small', variant: 'outlined', onChange: handlePhoneNumberChange, inputProps: { 'data-testid': 'phone-number' } }), _jsx(CcfTypography, { sx: commitmentStyles.labelFont, translationKey: "time" }), _jsx(CcfBox, Object.assign({ sx: { marginBottom: validateForm.dateTime ? 2.5 : .5 } }, { children: _jsx(LocalizationProvider, Object.assign({ dateAdapter: AdapterDayjs, adapterLocale: locale }, { children: _jsx(CcfBox, Object.assign({ "data-testid": "date-input" }, { children: _jsx(DateTimePicker, { viewRenderers: {
                                        hours: renderTimeViewClock,
                                        minutes: renderTimeViewClock,
                                        seconds: renderTimeViewClock,
                                    }, value: dayjs(formState.dateTime), onChange: (value) => {
                                        const newDate = value === null || value === void 0 ? void 0 : value.format('YYYY-MM-DDTHH:mm:ss');
                                        newDate && handleDateChange(newDate);
                                        validateDateTime(newDate);
                                    }, slotProps: {
                                        textField: {
                                            id: 'date-time',
                                            fullWidth: true,
                                            size: 'small',
                                            sx: [styles.dateTextField, { paddingBottom: !validateForm.dateTime ? '16px' : 'inherit' }],
                                            onChange: () => validateDateTime(formState.dateTime),
                                            onBlur: () => validateDateTime(formState.dateTime),
                                            error: !!validateForm.dateTime,
                                            helperText: validateForm.dateTime,
                                            FormHelperTextProps: { style: commitmentStyles.helperTextStyles },
                                        },
                                        popper: {
                                            placement: 'auto',
                                        },
                                    }, slots: {
                                        textField: CcfTextField,
                                        openPickerIcon: DatePickerIcon,
                                    }, components: {
                                        OpenPickerIcon: DatePickerIcon,
                                    }, disablePast: true, minDateTime: dayjs() }, locale) })) })) })), _jsx(CcfTypography, { sx: commitmentStyles.labelFont, translationKey: "timeZone" }), _jsx(Select, Object.assign({ inputProps: { 'data-testid': 'time-zone' }, "aria-label": 'timeZones', value: timeZoneStandardName, size: 'small', variant: 'outlined', onChange: handleTimeZoneChange, name: 'timeZone', sx: { marginBottom: 1 } }, { children: timeZones.map((option) => (_jsx(MenuItem, Object.assign({ dense: true, value: option.standardName }, { children: option.standardName }), option.standardName))) })), _jsx(CcfTypography, { sx: commitmentStyles.labelFont, translationKey: "notes" }), _jsx(TextField, { onChange: handleRescheduleNotesChange, placeholder: translate('addNotes'), multiline: true, rows: 4, variant: 'outlined', inputProps: { 'data-testid': 'notes' } }), _jsxs(Stack, Object.assign({ paddingTop: 2, flexDirection: 'row', justifyContent: 'end' }, { children: [_jsx(Box, Object.assign({ sx: { paddingRight: '14px' } }, { children: _jsx(CcfButton, Object.assign({ color: 'inherit', onClick: (e) => handlePopoverClose(e), variant: 'outlined' }, { children: translate('cancel') })) })), _jsx(CcfButton, Object.assign({ onClick: handleRescheduleSave, primary: true, variant: 'contained' }, { children: translate('save') }))] }))] }))] })));
}
export default CcfReschedulePopover;
//# sourceMappingURL=ccf-reschedule-popover.js.map