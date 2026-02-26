import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Typography, useTheme } from '@mui/material';
import ccfVoicemailContactPanelStyles from './ccf-voicemail-contact-panel.style';
import { useTranslator } from '@nice-devone/ui-controls';
import { Timer } from '../../util/timer/timer';
/**
 * Component to voicemail hold timer
 * @example `<CcfVoicemailHoldingTimer holdTime={123} />`
 */
export const CcfVoicemailHoldingTimer = ({ holdTime, sx }) => {
    const theme = useTheme();
    const voicemailControlStyles = ccfVoicemailContactPanelStyles(theme);
    const [translate] = useTranslator();
    /**
     *
     * function to display timer
     * @example -   displayTimer(startTime, key)
     * @param key -  timer key
     * @param start - timer start
     * @param stop -  timer stop
     * @param startTime -  timer start time
     * @param countUp -  count up/down
     */
    const displayTimer = (key, start, stop, startTime, countUp) => {
        return (_jsx(Timer, { start: start, stop: stop, startReference: startTime, countUp: countUp, longTimerFormat: true }, key));
    };
    return _jsxs(Typography, Object.assign({ "aria-label": 'hold', sx: sx || voicemailControlStyles.holdTimer, component: 'span' }, { children: [translate('hold') + '  ', "(", displayTimer('holdTimer', 0, Number.MAX_SAFE_INTEGER, holdTime, true), ")"] }));
};
//# sourceMappingURL=ccf-voicemail-holding-timer.js.map