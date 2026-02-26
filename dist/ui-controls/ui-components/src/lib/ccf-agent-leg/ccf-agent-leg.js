import { __awaiter } from "tslib";
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { CcfAgentLegConnectedIcon, CcfAgentLegDisconnectedIcon, CcfAgentLegDialingIcon, CcfTooltip, useTranslator, CcfLoader } from '@nice-devone/ui-controls';
import { connectAgentLeg, disconnectAgentLeg, agentLegConnectionStatus, } from '../ccf-agent-state/ccf-agent-state.slice';
import { useDispatch, useSelector } from 'react-redux';
import { AgentLegStatus, VoiceContactStatus } from '@nice-devone/common-sdk';
import agentLegStyle from './ccf-agent-leg.styles';
import { getAllInteractions, getAssignmentPanelMetadata } from '../ccf-assignment-panel/ccf-assignment-panel.slice';
import { Box, IconButton, useTheme } from '@mui/material';
import { CXoneAuth } from '@nice-devone/auth-sdk';
import { useEffect, useState } from 'react';
import ccfAppHeaderStyles from '../ccf-app-header/ccf-app-header-styles';
import CcfWebRTCExtensionHelp from '../ccf-web-rtcextension-help/ccf-web-rtcextension-help';
import { isNoiseCancellationExtInstalled, isWebRTCExtensionInstalled } from '../global.app.slice';
/**
 * Component displays an icon with the different agent leg status
 * @returns tooltip with different agent leg status
 * @example <CcfAgentLeg/>
 */
export function CcfAgentLeg() {
    var _a;
    const dispatch = useDispatch();
    const [translate] = useTranslator();
    const agentLegConnectedStatus = useSelector(agentLegConnectionStatus);
    const allInteractions = useSelector(getAllInteractions);
    const assignmentPanelMetadata = useSelector(getAssignmentPanelMetadata);
    const [iconColor, setIconColor] = useState('');
    const isWebRTCExtensionAVailable = useSelector(isWebRTCExtensionInstalled);
    const isNoiseCancellationExtAVailable = useSelector(isNoiseCancellationExtInstalled);
    useEffect(() => {
        (() => __awaiter(this, void 0, void 0, function* () {
            const brandingProfile = (yield CXoneAuth.instance.getBrandingProfile());
            setIconColor(brandingProfile === null || brandingProfile === void 0 ? void 0 : brandingProfile.cxoneHeaderIconTextColor);
        }))();
    }, []);
    let disableAgentLeg = false;
    if (!assignmentPanelMetadata.voiceInteractionId) {
        disableAgentLeg = false;
    }
    else if (allInteractions[assignmentPanelMetadata.voiceInteractionId] && Object.keys(allInteractions[assignmentPanelMetadata.voiceInteractionId]).length) {
        disableAgentLeg = (_a = Object.values(allInteractions[assignmentPanelMetadata.voiceInteractionId].acdContacts)) === null || _a === void 0 ? void 0 : _a.some((contact) => ![
            VoiceContactStatus.DIALING,
            VoiceContactStatus.DISCONNECTED,
            VoiceContactStatus.RINGING
        ].includes(contact.contactStatus));
    }
    const theme = useTheme();
    const agentLegStyles = agentLegStyle(theme);
    const appHeaderStyles = ccfAppHeaderStyles(theme);
    const agentLegIconMap = new Map([
        ['' || AgentLegStatus.DISCONNECTED.toString(), _jsx(CcfAgentLegDisconnectedIcon, { "data-testid": 'disconnected', fill: iconColor ? iconColor : theme.palette.background.paper, viewBox: '0 -2 32 24' }, 'disconnected')],
        [AgentLegStatus.DIALING.toString(), (_jsxs(_Fragment, { children: [_jsx(CcfAgentLegDialingIcon, { fill: iconColor ? iconColor : theme.palette.background.paper, style: { marginBottom: '-8px', marginLeft: '7px' } }), _jsx(CcfLoader, { showLoadingText: false, isPrimary: false, brandingColor: iconColor ? iconColor : '' })] }))],
        [AgentLegStatus.ACTIVE.toString(), _jsx(CcfAgentLegConnectedIcon, { fill: iconColor ? iconColor : theme.palette.background.paper, viewBox: '-4 -5 32 24' }, 'active')]
    ]);
    /**
    * Function to handle different agent leg like - connect or disconnect
    * @param e - React.SyntheticEvent
    * @example updateAgentLeg(e)
    */
    const updateAgentLeg = (e) => {
        e.preventDefault();
        if (agentLegConnectedStatus.status === AgentLegStatus.ACTIVE) {
            dispatch(disconnectAgentLeg());
        }
        else if (agentLegConnectedStatus.status === AgentLegStatus.DISCONNECTED) {
            dispatch(connectAgentLeg());
        }
    };
    /**
    * Function to give translated text of agentLegStatus
    * @param agentLegStatus - agentLegStatusValue
    * @example getAgentLegStatusTranslated('Active')
    */
    const getAgentLegStatusTranslated = (agentLegStatus) => {
        switch (agentLegStatus) {
            case AgentLegStatus.DIALING:
                return (translate('agentLegDialing'));
            case AgentLegStatus.ACTIVE:
                return (_jsxs(_Fragment, { children: [_jsx("div", { children: translate('agentLegConnected') }), _jsx("div", { children: disableAgentLeg ? translate('cannotDisconnectWithActiveCall') : translate('clickToDisconnect') })] }));
            default:
                return (_jsxs(_Fragment, { children: [_jsx("div", { children: translate('agentLegDisconnected') }), _jsx("div", { children: translate('clickToConnect') })] }));
        }
    };
    return (_jsxs("div", Object.assign({ id: 'agent-leg-tooltip' }, { children: [_jsx(CcfTooltip, Object.assign({ title: _jsx(Box, { children: getAgentLegStatusTranslated(agentLegConnectedStatus.status) }), arrow: true, tooltipForRTL: 'ccfTooltipRight0', "aria-label": translate('agentLeg'), role: 'tooltip' }, { children: _jsx(IconButton, Object.assign({ color: "inherit", sx: [appHeaderStyles.button, agentLegStyles.agentLeg, appHeaderStyles === null || appHeaderStyles === void 0 ? void 0 : appHeaderStyles.focussedElement, appHeaderStyles === null || appHeaderStyles === void 0 ? void 0 : appHeaderStyles.focussedBackground], disableFocusRipple: true, disabled: disableAgentLeg && agentLegConnectedStatus.status === AgentLegStatus.ACTIVE, role: "button", onClick: updateAgentLeg, "data-testid": "agent-leg-status", "aria-describedby": 'agent-leg-tooltip' }, { children: agentLegConnectedStatus.status
                        ? agentLegIconMap.get(agentLegConnectedStatus.status)
                        : agentLegIconMap.get('') })) })), isWebRTCExtensionAVailable === false && isNoiseCancellationExtAVailable === false && _jsx(CcfWebRTCExtensionHelp, {})] })));
}
export default CcfAgentLeg;
//# sourceMappingURL=ccf-agent-leg.js.map