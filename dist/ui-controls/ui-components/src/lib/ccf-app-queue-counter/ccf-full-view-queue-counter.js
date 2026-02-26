import { __awaiter } from "tslib";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { useSelector } from 'react-redux';
import { CcfHeader, CcfLoader, CcfQueueIcon, useTranslator } from '@nice-devone/ui-controls';
import { getApplicationDirection, getSelectedMenuName } from '../global.app.slice';
import CcfAppQueueCounterChannelsStyles from './ccf-app-queue-counter-channels.styles';
import { Navigation } from '../../enums/navigation-menus';
import { useEffect, useState } from 'react';
import { getAgentProfileSettings } from '../ccf-agent-setting/ccf-agent-setting-slice';
/**
 * Component for ccf full view queueCounter
 * @param props - FullViewQueueCounterProps
 * @example - <CCfFullViewQueueCounter />
 * @returns
 */
export function CcfFullViewQueueCounter() {
    const theme = useTheme();
    const [translate] = useTranslator();
    const appDirection = useSelector(getApplicationDirection);
    const isSmView = useMediaQuery(theme.breakpoints.down('xl'));
    const queueCounterStyles = CcfAppQueueCounterChannelsStyles(theme, isSmView);
    const [QueueCounter, setQueueCounter] = useState(_jsx(Box, Object.assign({ display: "flex", justifyContent: "center", alignItems: "center", height: '70%' }, { children: _jsx(CcfLoader, { showLoadingText: false, isPrimary: true }) })));
    const selectedMenu = useSelector(getSelectedMenuName);
    const agentProfileSettings = useSelector(getAgentProfileSettings);
    //load when click on left nav item
    useEffect(() => {
        if (selectedMenu === Navigation.QUEUE && !(agentProfileSettings === null || agentProfileSettings === void 0 ? void 0 : agentProfileSettings.hideQueueCounter)) {
            // eslint-disable-next-line @nice-cxone/ccf/required-tsdoc
            const renderQueue = () => __awaiter(this, void 0, void 0, function* () {
                const queueCounter = yield import('../ccf-app-queue-counter/ccf-app-queue-counter-channels');
                const QueueCounterComp = queueCounter.CcfAppQueueCounterChannels;
                setQueueCounter(_jsx(QueueCounterComp, { isAppSpace: false }));
            });
            renderQueue();
        }
    }, [selectedMenu, agentProfileSettings === null || agentProfileSettings === void 0 ? void 0 : agentProfileSettings.hideQueueCounter]);
    return (_jsxs(Box, Object.assign({ component: 'section', sx: queueCounterStyles.FullViewQueueCounterCard }, { children: [_jsx(Box, Object.assign({ sx: queueCounterStyles.queueCounterHeader }, { children: _jsx(CcfHeader, { LeftIcon: _jsx(CcfQueueIcon, { color: 'secondary', viewBox: '-2 -4 24 24', fontSize: 'small' }), headerText: translate('queueCounter'), direction: appDirection }) })), _jsx(Box, Object.assign({ sx: queueCounterStyles.queueCounterBox }, { children: QueueCounter }))] })));
}
export default CcfFullViewQueueCounter;
//# sourceMappingURL=ccf-full-view-queue-counter.js.map