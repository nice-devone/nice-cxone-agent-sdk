import { __awaiter } from "tslib";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { useSelector } from 'react-redux';
import { CcfHeader, CcfLoader, CcfWorkHistoryIcon, useTranslator } from '@nice-devone/ui-controls';
import { getApplicationDirection, getSelectedMenuName } from '../../global.app.slice';
import { useEffect, useState } from 'react';
import { Navigation } from '../../../enums/navigation-menus';
import fullViewContactHistory from './ccf-agent-full-view-contact-history.styles';
import { getAgentProfileSettings } from '../../ccf-agent-setting/ccf-agent-setting-slice';
/**
 * Component for ccf full view contactHistory
 * @param props - FullViewContactHistoryProps
 * @example - <CcfFullViewContactHistory />
 * @returns
 */
export function CcfFullViewContactHistory() {
    const theme = useTheme();
    const styles = fullViewContactHistory(theme);
    const [translate] = useTranslator();
    const appDirection = useSelector(getApplicationDirection);
    const isSmView = useMediaQuery(theme.breakpoints.down('xl'));
    const [AgentContactHistory, setAgentContactHistory] = useState(_jsx(Box, Object.assign({ display: "flex", justifyContent: "center", alignItems: "center", height: '70%' }, { children: _jsx(CcfLoader, { showLoadingText: false, isPrimary: true }) })));
    const selectedMenu = useSelector(getSelectedMenuName);
    const agentProfileSettings = useSelector(getAgentProfileSettings);
    //load when click on left nav item
    useEffect(() => {
        if (selectedMenu === Navigation.CONTACTHISTORY && !(agentProfileSettings === null || agentProfileSettings === void 0 ? void 0 : agentProfileSettings.hideContactHistory)) {
            // eslint-disable-next-line @nice-cxone/ccf/required-tsdoc
            const contactHistory = () => __awaiter(this, void 0, void 0, function* () {
                const agentContactHistory = yield import('../ccf-agent-contact-history/ccf-agent-card-contact-history');
                const AgentContactHistory = agentContactHistory.CcfAgentContactHistory;
                setAgentContactHistory(_jsx(AgentContactHistory, {}));
            });
            contactHistory();
        }
    }, [selectedMenu, agentProfileSettings === null || agentProfileSettings === void 0 ? void 0 : agentProfileSettings.hideContactHistory]);
    return (_jsxs(Box, Object.assign({ component: "section", sx: styles.fullViewHistoryCounterCard }, { children: [_jsx(Box, Object.assign({ sx: styles.historyHeader }, { children: _jsx(CcfHeader, { LeftIcon: _jsx(CcfWorkHistoryIcon, { color: "primary", viewBox: "-2 -2 23 23", fontSize: "small" }), headerText: translate('contactHistory'), direction: appDirection }) })), _jsx(Box, Object.assign({ sx: Object.assign({ overflow: 'auto', height: '100%' }, (!isSmView && { padding: '0 0.313rem' })) }, { children: AgentContactHistory }))] })));
}
export default CcfFullViewContactHistory;
//# sourceMappingURL=ccf-agent-full-view-contact-history.js.map