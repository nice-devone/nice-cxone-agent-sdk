import { __awaiter } from "tslib";
import { jsx as _jsx } from "react/jsx-runtime";
import React, { useEffect, useState } from 'react';
import { useTheme } from '@mui/material';
import CcfDigitalContactSLATimerStyles from './ccf-digital-contact-sla-timer.style';
import { CcfBox } from '@nice-devone/ui-controls';
/**
 * Component to display SLA timer tooltip for the contact hovered
 * ```
 * @example-
 * <CcfDigitalContactSLATimerTooltip />
 * ```
 */
export const CcfDigitalContactSLATimerTooltip = React.memo(() => {
    const theme = useTheme();
    const timerStyles = CcfDigitalContactSLATimerStyles(theme);
    const [ccfDigitalContactSLATimer, setCcfDigitalContactSLATimer] = useState(null);
    useEffect(() => {
        renderCcfDigitalContactSLATimer();
    }, []);
    /**
     * function that is called to render the SLA timer
     * @example renderCcfDigitalContactSLATimer()
     */
    const renderCcfDigitalContactSLATimer = () => __awaiter(void 0, void 0, void 0, function* () {
        setCcfDigitalContactSLATimer(null);
        const digitalContactSLATimer = yield import('./ccf-digital-contact-sla-timer');
        const DigitalContactSLATimer = digitalContactSLATimer.CcfDigitalContactSLATimer;
        setCcfDigitalContactSLATimer(_jsx(DigitalContactSLATimer, {}));
    });
    return (_jsx(CcfBox, Object.assign({ sx: timerStyles.slaTooltip }, { children: ccfDigitalContactSLATimer })));
});
//# sourceMappingURL=ccf-digital-contact-sla-timer-tooltip.js.map