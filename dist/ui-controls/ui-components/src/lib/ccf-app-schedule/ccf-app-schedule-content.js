import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useTheme, Box, Tooltip, lighten, } from '@mui/material';
import { CommitmentDetail } from '../ccf-commitment/ccf-commitment-details';
import ccfCommitmentStyles from '../ccf-commitment/ccf-commitment-form.styles';
/**
 * custom component for event
 * @returns component for rendering the event with tooltip
 * @example useCcfApScheduleContent
 */
export const useCcfAppScheduleContent = () => {
    const theme = useTheme();
    const styles = ccfCommitmentStyles(theme);
    /**
     * custom component for event
     * @returns component for rendering the event with tooltip
     * @example CcfAppScheduleContent
     */
    const getCcfAppScheduleContent = (eventArgs) => {
        var _a, _b, _c, _d;
        const { timeText, backgroundColor } = eventArgs;
        const { title, display } = eventArgs.event;
        const { isWEMEvent, isIEXEvent, borderHighlightColor } = ((_b = (_a = eventArgs.event) === null || _a === void 0 ? void 0 : _a._def) === null || _b === void 0 ? void 0 : _b.extendedProps) || {};
        if (display === 'background') {
            return title && _jsx(Box, Object.assign({ sx: styles.fcEventTitle }, { children: title }));
        }
        const tooltipProps = isWEMEvent
            ? {}
            : {
                componentsProps: {
                    tooltip: {
                        sx: styles.tooltip,
                    },
                },
            };
        return (_jsx(Tooltip, Object.assign({ id: "commitment-detail-tooltip", role: "tooltip", title: isWEMEvent ? (`${title}  ${timeText}`) : (_jsx(CommitmentDetail, { eventArgs: eventArgs })), PopperProps: {
                sx: isWEMEvent || styles.tooltipArrow,
            }, placement: "top", arrow: true, "aria-label": `${title} ${timeText}` }, tooltipProps, { leaveTouchDelay: !isWEMEvent ? 30000 : 1500 }, { children: _jsxs(Box, Object.assign({ component: "div", sx: Object.assign(Object.assign({}, styles.fcEventMainFrame), { backgroundColor: lighten(backgroundColor, 1) }), tabIndex: 0, "aria-describedby": "commitment-detail-tooltip" }, { children: [!title.includes('-') ? (_jsx(Box, { component: "div", sx: Object.assign({ width: { xs: '4%', md: '3%', lg: '2%', xl: '1.5%' }, backgroundColor: (!isWEMEvent && !isIEXEvent) ? (_d = (_c = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _c === void 0 ? void 0 : _c.accent) === null || _d === void 0 ? void 0 : _d.main : borderHighlightColor }, styles.fcEventMainFrameBorder) })) : null, _jsx(Box, Object.assign({ sx: styles.fcEventTitleContainer }, { children: _jsx(Box, Object.assign({ sx: Object.assign(Object.assign({}, styles.fcEventTitle), styles.fcSticky) }, { children: title || _jsx(_Fragment, { children: "\u00A0" }) })) }))] })) })));
    };
    return { getCcfAppScheduleContent };
};
//# sourceMappingURL=ccf-app-schedule-content.js.map