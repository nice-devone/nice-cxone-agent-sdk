import { jsx as _jsx } from "react/jsx-runtime";
import { useTheme, Grid } from '@mui/material';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { forwardRef, useContext } from 'react';
import { LocalStorageHelper, NotificationSettings } from '@nice-devone/core-sdk';
import schedulerStyles from './ccf-scheduler.styles';
import { TranslatorContext, useTranslator } from '../../ccf-translator/ccf-translator';
export const CcfScheduler = forwardRef((props, ref) => {
    const [translator] = useTranslator();
    const { events = [], initialView = 'timeGridDay', height = '100%', nowIndicator = true, headerToolbar = false, slotDuration = '01:00:00', scrollTime = '', firstDay = 0, allDaySlot = false, allDayText = 'shift', renderScheduleContent, } = props;
    const theme = useTheme();
    const styles = schedulerStyles(theme);
    const { locale } = useContext(TranslatorContext);
    const is12HrTime = !(LocalStorageHelper.getItem(NotificationSettings.TWENTY_FOUR_HOUR_TIME) === 'true');
    return (_jsx(Grid, Object.assign({ sx: styles.schedulerStyles }, { children: _jsx(FullCalendar, { ref: ref, locale: locale, events: events, height: height, plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin], initialView: initialView, nowIndicator: nowIndicator, eventContent: renderScheduleContent, headerToolbar: headerToolbar, dayHeaderFormat: { weekday: 'long', month: 'numeric', day: 'numeric', omitCommas: true }, eventTimeFormat: {
                hour: is12HrTime ? 'numeric' : '2-digit',
                minute: '2-digit',
                meridiem: 'lowercase',
                hourCycle: is12HrTime ? 'h12' : 'h23',
            }, slotLabelFormat: {
                hour: is12HrTime ? 'numeric' : '2-digit',
                minute: '2-digit',
                omitZeroMinute: is12HrTime ? true : false,
                meridiem: 'lowercase',
                hourCycle: is12HrTime ? 'h12' : 'h23',
            }, slotDuration: slotDuration, slotEventOverlap: false, scrollTime: scrollTime, firstDay: firstDay, eventTextColor: theme.palette.text.dark, eventBorderColor: theme.palette.background.main, allDaySlot: allDaySlot, allDayText: translator(allDayText), eventOrderStrict: true, eventOrder: 'start' }) })));
});
//# sourceMappingURL=ccf-scheduler.js.map