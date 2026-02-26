import { __awaiter } from "tslib";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMediaQuery, useTheme, Grid, Box } from '@mui/material';
import { CcfCalendarIcon, CcfHeader, CcfTabs, useTranslator, } from '@nice-devone/ui-controls';
import { useDispatch, useSelector } from 'react-redux';
import { Calander } from '../../enums/calendar-tabs';
import { getApplicationDirection } from '../global.app.slice';
import SchedulerLargeView from './ccf-schedular-large-view';
import ccfAppSchedulerStyles from './ccf-app-schedule.styles';
import { fetchCommitments, getShowCommitmentFormState } from '../ccf-commitment/ccf-commitment.slice';
import { memo, useEffect, useState } from 'react';
import { userInfoSelector } from '../ccf-agent-state/ccf-agent-state.slice';
/**
 * Schedule to be shown in CXone and IA. App scape has a different container
 * @example `<CcfAppSchedule />`
 */
export function CcfAppSchedule() {
    var _a;
    const appDirection = useSelector(getApplicationDirection);
    const [translate] = useTranslator();
    const theme = useTheme();
    const dispatch = useDispatch();
    const isSmView = useMediaQuery(theme.breakpoints.down('xl'));
    const calendarTabs = [
        {
            element: _jsx(SchedulerLargeView, {}),
            isActive: true,
            label: translate(Calander.MY_SCHEDULE),
        }
    ];
    const activeTabs = calendarTabs.filter((tab) => tab.isActive);
    const schedulerStyles = ccfAppSchedulerStyles(theme, isSmView);
    const showCommitmentForm = useSelector(getShowCommitmentFormState);
    const agentId = (_a = useSelector(userInfoSelector)) === null || _a === void 0 ? void 0 : _a.icAgentId;
    const [ccfCommitmentsForm, setCcfCommitmentsForm] = useState(null);
    /**
     * Function to render commitment forms
     * @returns commitments form
     * ```
     * @example
     * renderCcfCommitmentsForm()
     * ```
     *
     **/
    const renderCcfCommitmentsForm = () => __awaiter(this, void 0, void 0, function* () {
        setCcfCommitmentsForm(null);
        const commitmentForm = yield import('../ccf-commitment/ccf-commitment-form');
        const CommitmentForm = commitmentForm.CcfCommitmentsForm;
        setCcfCommitmentsForm(_jsx(CommitmentForm, { isFullView: true }));
    });
    useEffect(() => {
        if (agentId) {
            dispatch(fetchCommitments(Number(agentId)));
        }
    }, []);
    useEffect(() => {
        if (showCommitmentForm && !ccfCommitmentsForm) {
            renderCcfCommitmentsForm();
        }
    }, [showCommitmentForm]);
    return (_jsxs(Grid, Object.assign({ sx: schedulerStyles.calendarCardStyles }, { children: [!isSmView && (_jsx(Grid, Object.assign({ sx: schedulerStyles.calendarHeaderSyles }, { children: _jsx(CcfHeader, { LeftIcon: _jsx(CcfCalendarIcon, { color: "primary", viewBox: "-3 -3 25 25", fontSize: "small" }), headerText: translate('schedule'), RightIcon: false, showDragIcon: true, direction: appDirection }) }))), showCommitmentForm ? (ccfCommitmentsForm) : (_jsx(CcfTabs, Object.assign({ currentTab: 0, variant: CcfTabs.Variant.STANDARD, setCurrentTab: () => null }, { children: activeTabs.map((tab) => (_jsx(CcfTabs.TabPanel, Object.assign({ label: tab.label }, { children: _jsx(Box, Object.assign({ sx: schedulerStyles.tabContentSection }, { children: tab.element })) }), tab.label))) })))] })));
}
export default memo(CcfAppSchedule);
//# sourceMappingURL=ccf-app-schedule.js.map