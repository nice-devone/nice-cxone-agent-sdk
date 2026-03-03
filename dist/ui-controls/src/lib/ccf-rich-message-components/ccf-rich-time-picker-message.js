import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Divider, Typography, Box, useTheme, Chip, } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { CcfRichTimePickerMessageStyle } from './ccf-rich-time-picker-message.style';
/**
 * Renders the Rich List Picker chat message
 * @param props - CcfContactRichMessageProps
 * @example <CcfRichLink />
 * @returns List picker
 */
export const CcfRichTimePickerMessage = (props) => {
    var _a, _b, _c, _d;
    const theme = useTheme();
    const classes = CcfRichTimePickerMessageStyle(theme);
    const { message, messageActionMenu } = props;
    const payload = (_a = message === null || message === void 0 ? void 0 : message.messageContent) === null || _a === void 0 ? void 0 : _a.payload;
    const timePicker = useRef(null);
    const [timeSlots, setTimeSlots] = useState({});
    useEffect(() => {
        var _a, _b, _c, _d;
        // Initialize the new time slots object
        const newTimeSlots = {};
        // Loop through each time slot and update the new time slots object
        (_a = payload === null || payload === void 0 ? void 0 : payload.event) === null || _a === void 0 ? void 0 : _a.timeSlots.forEach((timeSlot) => {
            const dateAndTime = getFormattedDateAndTime(timeSlot);
            if (newTimeSlots[dateAndTime.date]) {
                newTimeSlots[dateAndTime.date].push(dateAndTime.time);
            }
            else {
                newTimeSlots[dateAndTime.date] = [dateAndTime.time];
            }
        });
        // Update the state by merging the new time slots with the existing ones
        setTimeSlots((prevTimeSlots) => (Object.assign(Object.assign({}, prevTimeSlots), newTimeSlots)));
        // updating the style of parent element to avoid extra padding and background color 
        if (timePicker && (timePicker === null || timePicker === void 0 ? void 0 : timePicker.current) && ((_b = timePicker === null || timePicker === void 0 ? void 0 : timePicker.current) === null || _b === void 0 ? void 0 : _b.parentElement)) {
            timePicker.current.parentElement.style.padding = '0';
            timePicker.current.parentElement.style.backgroundColor = (_d = (_c = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _c === void 0 ? void 0 : _c.background) === null || _d === void 0 ? void 0 : _d.paper;
        }
    }, []);
    /**
     * Function to get the formatted date and time
     * @param dateTimeString - time slot string from time picker
     * @returns formatted date and time object
     * @example getFormattedDateAndTime('2024-06-08T21:30:00-02:30')
     */
    const getFormattedDateAndTime = (timeSlot) => {
        const dateObj = new Date(timeSlot.startTime);
        // Extracting start time
        const optionsTime = { hour: '2-digit', minute: '2-digit', hour12: true };
        const startTime = dateObj.toLocaleTimeString('en-US', optionsTime);
        // Calculating end time
        const endTimeObj = new Date(dateObj.getTime() + timeSlot.duration * 1000);
        const endTime = endTimeObj.toLocaleTimeString('en-US', optionsTime);
        // Extracting date
        const optionsDate = {
            weekday: 'long',
            month: '2-digit',
            day: '2-digit',
            year: 'numeric',
        };
        let formattedDate = dateObj.toLocaleDateString('en-US', optionsDate);
        formattedDate = formattedDate.replace(',', '');
        return { date: formattedDate, time: `${startTime} - ${endTime}` };
    };
    /**
     * function to render time slot chips
     * @param timeSlots - array of time slots
     * @example renderTimeSlots(timeSlot)
     */
    const renderTimeSlots = (timeSlots) => {
        return (_jsx("span", { children: timeSlots.map((timeSlot, index) => (_jsx(Chip, { label: `${timeSlot}`, variant: "outlined", sx: classes.chip }, index))) }));
    };
    return (_jsxs(Box, Object.assign({ sx: classes.container, ref: timePicker }, { children: [_jsxs(Box, Object.assign({ sx: classes.header }, { children: [_jsxs(Box, Object.assign({ sx: classes.headerBox }, { children: [_jsx(Typography, Object.assign({ component: "h3", sx: classes.title }, { children: (_b = payload.title) === null || _b === void 0 ? void 0 : _b.content })), messageActionMenu !== null && messageActionMenu !== void 0 ? messageActionMenu : null] })), _jsx(Typography, Object.assign({ component: "h6", sx: classes.subTitle }, { children: (_d = (_c = payload.event) === null || _c === void 0 ? void 0 : _c.title) === null || _d === void 0 ? void 0 : _d.content }))] })), _jsx(Box, { children: Object.keys(timeSlots).map((timeSlot) => (_jsxs(Box, Object.assign({ sx: classes.timeSlotContainer }, { children: [_jsx(Typography, Object.assign({ sx: classes.date }, { children: timeSlot })), _jsx(Divider, {}), renderTimeSlots(timeSlots[timeSlot])] })))) })] })));
};
//# sourceMappingURL=ccf-rich-time-picker-message.js.map