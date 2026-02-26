import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { CcfAppToastMessage, CcfBox, CcfButton, CcfTrashBinIcon, CcfTypography, useTranslator } from '@nice-devone/ui-controls';
import { useEffect, useState } from 'react';
import { Box, Button, Chip, Divider, Grid, MenuItem, Select, Typography, useTheme } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import ccfQuickRepliesPreviewStyles from './ccf-quick-reply-preview.styles';
import { getActiveContactInSelectedInteraction, getDigitalContactDetailsByCaseId } from '../../../ccf-assignment-panel/ccf-assignment-panel.slice';
import { sendRichMessage } from '../../ccf-app-space.slice';
import { MediaType } from '@nice-devone/common-sdk';
import { getRoundedDate } from '../ccf-quick-replies.util';
import { renderTimeViewClock } from '@mui/x-date-pickers';
const DuartionOptions = [30, 60, 90, 120, 150, 180];
;
;
/**
 * CcfQuickReplyRichTimePickerPreview - used to display selected time picker card
 * @example - <CcfQuickReplyRichTimePickerPreview />
 */
const CcfQuickReplyRichTimePickerPreview = (props) => {
    const dispatch = useDispatch();
    const [translate] = useTranslator();
    const theme = useTheme();
    const [selectedDate, setSelectedDate] = useState(dayjs(new Date()));
    const [addButtonEnabled, setAddButtonEnabled] = useState(true);
    const [minDateTime, setMinDateTime] = useState(getRoundedDate());
    const activeContactInSelectedInteraction = useSelector(getActiveContactInSelectedInteraction);
    const selectedContact = activeContactInSelectedInteraction && activeContactInSelectedInteraction.media === MediaType.DIGITAL ? activeContactInSelectedInteraction : undefined;
    const selectedDigitalContactDetails = useSelector(getDigitalContactDetailsByCaseId(selectedContact === null || selectedContact === void 0 ? void 0 : selectedContact.caseId, selectedContact === null || selectedContact === void 0 ? void 0 : selectedContact.interactionId));
    const [placeHolderArray] = useState([]);
    const [duration, setDuration] = useState(1800);
    const [dateAndSlots, setDateAndSlots] = useState({});
    const [error, setError] = useState(true);
    const previewStyles = ccfQuickRepliesPreviewStyles(theme, placeHolderArray === null || placeHolderArray === void 0 ? void 0 : placeHolderArray.length, error);
    const dateTimePickerStyles = {
        disableRipple: true,
        sx: Object.assign(Object.assign({}, previewStyles === null || previewStyles === void 0 ? void 0 : previewStyles.focussedElement), previewStyles === null || previewStyles === void 0 ? void 0 : previewStyles.hoveredElement),
    };
    useEffect(() => {
        setMinDateTime(getRoundedDate());
    }, []);
    /**
     * function to update the duration as per selection
     * @param event - event object
     * @example handleChangeDuration(event)
     */
    const handleChangeDuration = (event) => {
        var _a;
        setDuration((_a = event === null || event === void 0 ? void 0 : event.target) === null || _a === void 0 ? void 0 : _a.value);
    };
    /**
     * function to check if 'send' button should be disable
     * @param timeSlotObj - slot object
     * @example checkIfError(obj)
     */
    const checkIfError = (timeSlotObj) => {
        setError(Object.keys(timeSlotObj).length === 0);
    };
    /**
     * function to delete timeslot from added slots
     * @param timeSlotToDelete - time slot deleted
     * @param keyInObject - key in object to identify value to delete
     * @example removeTimeSlot(time)
     */
    const removeTimeSlot = (timeSlotToDelete, keyInObject) => {
        const filteredSlots = dateAndSlots[keyInObject].filter(slot => slot.id !== timeSlotToDelete.id);
        const newSlots = Object.assign({}, dateAndSlots);
        if (filteredSlots.length > 0) {
            newSlots[keyInObject] = filteredSlots;
        }
        else {
            delete newSlots[keyInObject];
        }
        checkIfError(newSlots);
        setDateAndSlots(newSlots);
    };
    /**
     * function to render time slot chips
     * @param timeSlots - array of time slots
     * @param keyInObject - key in object to identify object inside map
     * @example renderTimeSlots(timeSlot)
     */
    const renderTimeSlots = (timeSlots, keyInObject) => {
        return (_jsx(CcfBox, { children: timeSlots.map((timeSlot, index) => (_jsx(Chip, { label: `${timeSlot.startTime} - ${timeSlot.endTime}`, variant: "outlined", onDelete: () => removeTimeSlot(timeSlot, keyInObject), sx: Object.assign(Object.assign(Object.assign({}, previewStyles.timerReplayContent.chip), previewStyles === null || previewStyles === void 0 ? void 0 : previewStyles.focussedElement), previewStyles === null || previewStyles === void 0 ? void 0 : previewStyles.hoveredElement) }, `${timeSlot.date + index}`))) }));
    };
    /**
     * function to create slot data as required
     * @example createSlotsData()
     */
    const createSlotsData = () => {
        var _a;
        const dateTimeObject = {
            date: (selectedDate === null || selectedDate === void 0 ? void 0 : selectedDate.format('MM/DD/YYYY')) || new Date().toISOString(),
            day: selectedDate === null || selectedDate === void 0 ? void 0 : selectedDate.format('dddd'),
            startTime: selectedDate === null || selectedDate === void 0 ? void 0 : selectedDate.format('h:mm A'),
            duration: duration,
            startTimeUTC: selectedDate === null || selectedDate === void 0 ? void 0 : selectedDate.format(),
            endTime: (_a = selectedDate === null || selectedDate === void 0 ? void 0 : selectedDate.add(duration / 60, 'minute')) === null || _a === void 0 ? void 0 : _a.format('h:mm A'),
            id: uuidv4(),
        };
        const newSlot = Object.assign({}, dateAndSlots);
        if (dateAndSlots[dateTimeObject.date]) {
            const filterSame = dateAndSlots[dateTimeObject.date].filter(slot => slot.startTime === dateTimeObject.startTime);
            if ((filterSame === null || filterSame === void 0 ? void 0 : filterSame.length) > 0) {
                const messageComponent = _jsx(CcfAppToastMessage, { type: 'error', messageKey: 'noSameTimeSlot' });
                const toastOptions = {
                    autoClose: 2000,
                    containerId: 'AppToastContainer',
                    className: 'publicMessageToast',
                };
                toast['error'](messageComponent, toastOptions);
            }
            else {
                newSlot[dateTimeObject.date].push(dateTimeObject);
            }
        }
        else {
            newSlot[dateTimeObject.date] = [Object.assign({}, dateTimeObject)];
        }
        checkIfError(newSlot);
        setDateAndSlots(Object.assign({}, newSlot));
    };
    /**
     * function to delete all slots
     * @example removeAllSlots()
     */
    const removeAllSlots = () => {
        setDateAndSlots({});
        setError(true);
    };
    /**
     * function to send the seleted timeslot to chat
     * @example onReplySend()
     */
    const onReplySend = () => {
        var _a;
        //Invoke method to call /outbound api 
        const selectedSlots = [];
        Object.values(dateAndSlots).flat().forEach(timerDetails => {
            selectedSlots.push({
                id: timerDetails.id,
                duration: timerDetails.duration,
                startTime: timerDetails.startTimeUTC,
            });
        });
        const replyDetails = {
            contactDetails: selectedDigitalContactDetails,
            richMessageDetails: {
                messageContent: Object.assign(Object.assign({}, props.selectedReply.messageContent), { payload: Object.assign(Object.assign({}, props.selectedReply.messageContent.payload), { event: Object.assign(Object.assign({}, props.selectedReply.messageContent.payload.event), { timeSlots: [...selectedSlots] }) }) }),
            },
            customerName: (_a = selectedContact === null || selectedContact === void 0 ? void 0 : selectedContact.customerName) !== null && _a !== void 0 ? _a : selectedDigitalContactDetails.customerName,
        };
        dispatch(sendRichMessage(replyDetails));
        props.goToAllReplies();
    };
    /**
     * Function to handle the change event of the DateTimePicker.
     * @param newValue - The new value selected in the DateTimePicker.
     * @example handleOnChange(newValue)
     */
    const handleOnChange = (newValue) => {
        setAddButtonEnabled(newValue != null && newValue.isValid() && newValue.isAfter(minDateTime));
        setSelectedDate(newValue);
    };
    return (_jsxs(CcfBox, Object.assign({ sx: previewStyles.timerReplayContent.contentBody }, { children: [_jsxs(Grid, Object.assign({ container: true }, { children: [_jsx(Grid, Object.assign({ item: true, xs: 12, md: 12, sm: 12, sx: previewStyles.timerReplayContent.container }, { children: _jsx(CcfTypography, Object.assign({ sx: previewStyles.timerReplayContent.label }, { children: translate('timeSlots') })) })), _jsxs(Grid, Object.assign({ item: true, xs: 12, md: 12, sm: 12, sx: previewStyles.timerReplayContent.container }, { children: [_jsx(CcfTypography, Object.assign({ sx: previewStyles.timerReplayContent.label2 }, { children: translate('dateAndTime') })), _jsx(LocalizationProvider, Object.assign({ dateAdapter: AdapterDayjs }, { children: _jsx(DateTimePicker, { viewRenderers: {
                                        hours: renderTimeViewClock,
                                        minutes: renderTimeViewClock,
                                        seconds: renderTimeViewClock,
                                    }, value: selectedDate, minDateTime: minDateTime, onChange: handleOnChange, disablePast: true, slotProps: {
                                        textField: {
                                            size: 'small',
                                            sx: previewStyles.timerReplayContent.calenderInput,
                                            inputProps: { 'aria-label': `${translate('select')} ${translate('dateAndTime')}` },
                                        },
                                        openPickerButton: Object.assign({}, dateTimePickerStyles),
                                        day: Object.assign({}, dateTimePickerStyles),
                                        previousIconButton: Object.assign({}, dateTimePickerStyles),
                                        nextIconButton: Object.assign({}, dateTimePickerStyles),
                                        switchViewButton: Object.assign({}, dateTimePickerStyles),
                                    } }) }))] })), _jsxs(Grid, Object.assign({ item: true, xs: 12, md: 12, sm: 12, sx: previewStyles.timerReplayContent.container }, { children: [_jsxs(CcfTypography, Object.assign({ sx: previewStyles.timerReplayContent.label2 }, { children: [" ", translate('duration')] })), _jsxs(CcfBox, Object.assign({ sx: previewStyles.timerReplayContent.buttonBox }, { children: [_jsx(Select, Object.assign({ labelId: "demo-simple-select-label", id: "demo-simple-select", value: duration, sx: previewStyles.timerReplayContent.durationList, onChange: handleChangeDuration, inputProps: { 'aria-label': `${translate('select')} ${translate('duration')}` } }, { children: DuartionOptions.map(duration => {
                                            return (_jsx(MenuItem, Object.assign({ value: duration * 60, sx: previewStyles.menuItem }, { children: `${duration} ${translate('minutes')}` }), duration));
                                        }) })), _jsx(Button, Object.assign({ variant: "outlined", onClick: () => {
                                            createSlotsData();
                                        }, sx: previewStyles.timerReplayContent.sendBtn, disableRipple: true, disabled: !addButtonEnabled }, { children: translate('add') }))] })), Object.keys(dateAndSlots).length > 0 && _jsx(Box, Object.assign({ sx: previewStyles.timerReplayContent.slotsSection }, { children: Object.keys(dateAndSlots).map((timeSlot) => {
                                    var _a;
                                    return (_jsxs(Box, Object.assign({ sx: previewStyles.timerReplayContent.timeSlotContainer }, { children: [_jsx(Typography, Object.assign({ sx: previewStyles.timerReplayContent.date }, { children: `${(_a = dateAndSlots[timeSlot][0]) === null || _a === void 0 ? void 0 : _a.day}  ${timeSlot}` })), _jsx(Divider, {}), renderTimeSlots(dateAndSlots[timeSlot], timeSlot)] })));
                                }) }))] }))] })), _jsxs(CcfBox, Object.assign({ sx: previewStyles.timerReplayContent.footer }, { children: [_jsxs(CcfButton, Object.assign({ onClick: removeAllSlots, size: "small", sx: previewStyles.timerReplayContent.removeBtn, disableRipple: true, disabled: error }, { children: [_jsx(CcfTrashBinIcon, { color: "primary", viewBox: "-9 5 30 10", sx: previewStyles.timerReplayContent.icon }), _jsx(CcfTypography, Object.assign({ color: "primary", variant: "h4", sx: previewStyles.timerReplayContent.buttonText, title: 'RemoveAll', "aria-label": 'RemoveAll' }, { children: translate('removeAll') }))] })), _jsx(CcfButton, Object.assign({ primary: true, disableRipple: true, disabled: error, sx: previewStyles.timerReplayContent.sendBtn, "data-testid": "on-Reply-Send-send", onClick: onReplySend }, { children: translate('send') }))] }))] })));
};
export default CcfQuickReplyRichTimePickerPreview;
//# sourceMappingURL=ccf-qr-rich-time-picker-preview.js.map