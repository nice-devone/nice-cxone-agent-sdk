import { __rest } from "tslib";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, InputAdornment, useTheme, IconButton } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useEffect, useState, forwardRef } from 'react';
import dayjs from 'dayjs';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { useTranslator } from '../../ccf-translator/ccf-translator';
import ccfDatePickerStyle from './ccf-datePicker.style';
import { CcfTextField } from '../ccf-textfield/ccf-textfield';
import CcfUpArrowIcon from '../../icons/ccf-up-arrow-icon/ccf-up-arrow-icon';
import CcfIconButton from '../ccf-icon-button/ccf-icon-button';
import { CcfTypography } from '../ccf-typography/ccf-typography';
import { CcfCalendarIcon } from '../../icons/ccf-calendar-icon/ccf-calendar-icon';
import { CcfTooltip } from '../ccf-tooltip/ccf-tooltip';
/**
 * Custom open picker button component wrapped in tooltip
 * @param props - OpenPickerButtonProps
 * @returns IconButton wrapped in CcfTooltip
 * @example <CustomOpenPickerButton />
 */
const CustomOpenPickerButton = forwardRef(function CustomOpenPickerButton(props, ref) {
    const { children, onClick, 'aria-label': ariaLabel } = props, other = __rest(props, ["children", "onClick", 'aria-label']);
    return (_jsx(CcfTooltip, Object.assign({ title: ariaLabel || '', arrow: true }, { children: _jsx(IconButton, Object.assign({ ref: ref, onClick: onClick, disableRipple: true }, other, { children: children })) })));
});
/**
 * Function is set as wrapper for material UI datepicker component textfield
 * @param param -CcfDatePickerProps
 * @returns material ui date picker component
 * @example <DatePickerTextFild/>
 */
const DatePickerTextField = (props) => {
    const [translate] = useTranslator();
    return (_jsxs(Box, Object.assign({ sx: props.inputProps.styles.textBoxParent }, { children: [_jsx(CcfTextField, Object.assign({}, props, { "data-testid": 'date-picker-input', id: "date-picker-input", size: "small", error: !!props.inputProps.showErrorText, sx: Object.assign(Object.assign({}, props.inputProps.styles.textBox), { svg: { marginRight: '0rem' } }), variant: "standard", inputProps: Object.assign({}, props.inputProps), placeholder: props.placeholder })), props.inputProps.dateChangeArrow && props.inputProps.dateTime && (_jsxs(Box, Object.assign({ sx: props.inputProps.styles.flexStyles }, { children: [_jsx(CcfTooltip, Object.assign({ title: props.inputProps.disableUpArrow ? '' : `${translate('select')} ${translate('next')} ${translate('day')}`, arrow: true, placement: "top" }, { children: _jsx(Box, Object.assign({ component: "div", sx: props.inputProps.styles.arrowButtonWrapper }, { children: _jsx(CcfIconButton, Object.assign({ disableRipple: true, onClick: () => props.inputProps.dateTime && props.inputProps.changeDate(props.inputProps.dateTime.add(1, 'day')), disabled: props.inputProps.disableUpArrow, "data-testid": `date-picker-up-arrow-${props.inputProps.label}`, "aria-label": `${translate('select')} ${translate('next')} ${translate('day')}` }, { children: _jsx(CcfUpArrowIcon, { viewBox: "-5 2 23 10" }) })) })) })), _jsx(CcfTooltip, Object.assign({ title: props.inputProps.disableDownArrow ? '' : `${translate('select')} ${translate('previous')} ${translate('day')}`, arrow: true }, { children: _jsx(Box, Object.assign({ component: "div", sx: props.inputProps.styles.arrowButtonWrapper }, { children: _jsx(CcfIconButton, Object.assign({ disableRipple: true, onClick: () => props.inputProps.dateTime && props.inputProps.changeDate(props.inputProps.dateTime.subtract(1, 'day')), disabled: props.inputProps.disableDownArrow, "data-testid": `date-picker-down-arrow-${props.inputProps.label}`, "aria-label": `${translate('select')} ${translate('previous')} ${translate('day')}` }, { children: _jsx(CcfUpArrowIcon, { viewBox: "-5 2 30 10", sx: props.inputProps.styles.backArrowIcon }) })) })) }))] })))] })));
};
/**
 * Function is set as wrapper for material UI datepicker component
 * @param param -CcfDatePickerProps
 * @returns material ui date picker component
 * @example <CcfDatePicker/>
 */
export function CcfDatePicker(props) {
    const { label, disablePast, maxDate, minDate, dateChangeArrow = true, disableDownArrow, disableUpArrow, dateTime, fieldName, dateLabelStyles, locale, placeholder, applyStylesToDate } = props;
    const theme = useTheme();
    const styles = ccfDatePickerStyle(theme);
    const [translate] = useTranslator();
    const [showErrorText, setErrorText] = useState(null);
    const currentLocale = locale ? locale : 'en'; // If local is not provided the default used 'en'
    const today = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 0, 0, 0);
    const formattedSelectedDate = dateTime ? dayjs(dateTime).format('MMM D, YYYY') : '';
    const ariaAction = translate('choose');
    const selectedDateText = formattedSelectedDate
        ? translate('selectedDateIs').replace('{x}', formattedSelectedDate)
        : '';
    useEffect(() => {
        if (fieldName === 'endDate' && !disableDownArrow) {
            const differenceFromMaxDate = Math.floor(dayjs(dateTime).diff(maxDate, 'day', true));
            if (differenceFromMaxDate > 0)
                showError('maxDate');
        }
    }, [dateTime, maxDate]);
    /**
     * Function to return error message for invalid date
     * @example - handleInvalidDateError()
     */
    const handleInvalidDateError = () => {
        if (fieldName === 'startDate') {
            return translate('invalidStartDate');
        }
        else if (fieldName === 'endDate') {
            return translate('invalidEndDate');
        }
        else {
            return translate('invalidDate');
        }
    };
    /**
     * Function to return error message based on errortype key passed
     * @param inputval - error message type key string
     * @example - getTranslatedSessionError(inputval)
     */
    const getTranslatedSessionError = (inputValKey) => {
        switch (inputValKey) {
            case 'invalidDate':
                return `${translate('error')}: ${handleInvalidDateError()}`;
            case 'maxDate':
                return `${translate('error')}: ${translate('reportingIntervalError')}`;
            case 'dateCanNotBeGreaterThanCurrentDate':
                return `${translate('error')}: ${translate('greaterThanTodayError')}`;
            case 'endDateGreaterThanStart':
                return `${translate('error')}: ${translate('endDateGreaterThanStartError')}`;
            default:
                return '';
        }
    };
    /**
     * Used to show error on ui
     *
     * @example - showError(reason)
     */
    const showError = (reason) => {
        const differenceFromStartDate = Math.floor(dayjs(dateTime).diff(minDate, 'day', true));
        const differenceFromEndDate = Math.floor(dayjs(today).diff(dateTime, 'day', true));
        if (differenceFromEndDate < 0) {
            setErrorText(getTranslatedSessionError('dateCanNotBeGreaterThanCurrentDate'));
        }
        else {
            (differenceFromStartDate < 0 && reason === 'maxDate') ? showError('endDateGreaterThanStart') : setErrorText(getTranslatedSessionError(reason));
        }
        ;
    };
    /**
     * used to set the new selected date in state
     *
     * @example - changeDate(newDate)
     */
    const changeDate = (newState) => {
        //setting hour, minute, second to 0 for selected date
        dayjs(newState).set('hour', 0).set('minute', 0).set('second', 0);
        const differenceFromToday = Math.floor(dayjs(new Date()).diff(newState, 'day', true));
        if (differenceFromToday < 0) {
            showError('dateCanNotBeGreaterThanCurrentDate');
        }
        props.setSelectedDate && props.setSelectedDate(newState, fieldName);
    };
    return (_jsxs(Box, Object.assign({ sx: styles.datePicker }, { children: [_jsx(CcfTypography, { variant: "body1", translationKey: label, "aria-label": label ? translate(label) : '', sx: dateLabelStyles }), _jsx(LocalizationProvider, Object.assign({ dateAdapter: AdapterDayjs, adapterLocale: currentLocale }, { children: _jsx(DatePicker, { value: dateTime, onAccept: (newDate) => changeDate(newDate), maxDate: maxDate, minDate: minDate, disablePast: disablePast, onError: (reason) => {
                        return showError(reason);
                    }, slotProps: {
                        textField: {
                            onChange: (newDate) => { changeDate(newDate); },
                            sx: Object.assign(Object.assign({}, styles.textBox), { svg: { marginRight: '10px' } }),
                            inputProps: {
                                styles,
                                showErrorText,
                                dateChangeArrow,
                                dateTime,
                                disableUpArrow,
                                disableDownArrow,
                                label,
                                changeDate,
                                placeholder: placeholder && placeholder !== '' ? placeholder : 'MM/DD/YYYY',
                                endAdornment: (_jsx(InputAdornment, Object.assign({ position: 'end' }, { children: _jsx(CcfCalendarIcon, { className: 'mobileCalendarIcon' }) }))),
                                'aria-label': label
                                    ? `${ariaAction} ${translate(label)}${selectedDateText ? `, ${selectedDateText}` : ''}`
                                    : `${ariaAction}`,
                                'aria-describedby': 'date-picker-error',
                            },
                        },
                        popper: {
                            'aria-label': `${translate('datePicker')}`,
                            role: 'dialog',
                        },
                        openPickerButton: {
                            'aria-label': label
                                ? `${ariaAction} ${translate(label)}${selectedDateText ? `, ${selectedDateText}` : ''}`
                                : `${ariaAction}`,
                        },
                        day: {
                            disableRipple: applyStylesToDate,
                            sx: applyStylesToDate ? styles.dateFocusStyles : {},
                        },
                        previousIconButton: {
                            disableRipple: applyStylesToDate,
                            sx: applyStylesToDate ? styles.dateFocusStyles : {},
                        },
                        nextIconButton: {
                            disableRipple: applyStylesToDate,
                            sx: applyStylesToDate ? styles.dateFocusStyles : {},
                        },
                        switchViewButton: {
                            disableRipple: applyStylesToDate,
                            sx: applyStylesToDate ? styles.dateFocusStyles : {},
                        },
                    }, slots: {
                        textField: DatePickerTextField,
                        openPickerButton: CustomOpenPickerButton,
                    } }) })), showErrorText && (_jsx(CcfTypography, Object.assign({ id: "date-picker-error", variant: "h6", sx: Object.assign({}, styles.labelText) }, { children: showErrorText })))] })));
}
export default CcfDatePicker;
//# sourceMappingURL=ccf-datePicker.js.map