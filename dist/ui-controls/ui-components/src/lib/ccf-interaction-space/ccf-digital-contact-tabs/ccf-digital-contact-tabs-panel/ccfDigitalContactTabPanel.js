import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, useTheme } from '@mui/material';
import CcfDigitalContactTabPanelStyle from './ccfDigitalContactTabPanel.style';
import { useSelector } from 'react-redux';
import { DigitalContactStatus, MediaType } from '@nice-devone/common-sdk';
import { CcfAlert, CcfBox, CcfTypography, useTranslator } from '@nice-devone/ui-controls';
import { ToastContainer } from 'react-toastify';
import CcfDigitalContactTabs from '../ccf-digital-contact-tabs';
import { getNonIncomingActiveContactInSelectedInteraction } from '../../../ccf-assignment-panel/ccf-assignment-panel.slice';
import { useIsVoiceTranscriptEnabled } from '../../../../hooks/useVoiceTranscriptEnabled';
/**
 * Tab panel for interaction spcae
 * @example - <CcfDigitalContactTabPanel />
 */
export const CcfDigitalContactTabPanel = (props) => {
    const nonIncomingActiveContactInSelectedInteraction = useSelector(getNonIncomingActiveContactInSelectedInteraction);
    const theme = useTheme();
    const [translate] = useTranslator();
    const isVoiceTranscriptEnabled = useIsVoiceTranscriptEnabled();
    const isActiveVoiceAndTranscriptionToggleOn = (nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.media) === MediaType.VOICE
        && isVoiceTranscriptEnabled;
    const themeStyles = CcfDigitalContactTabPanelStyle(theme);
    return (_jsxs(Box, Object.assign({ component: 'div', "data-testid": "interaction-space", id: 'interaction-space', sx: themeStyles.interactionGrid }, { children: [(nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.contactStatus) === DigitalContactStatus.CLOSED &&
                _jsx(CcfAlert, Object.assign({ sx: { mb: 1 }, closeAlert: () => { return false; }, severity: "warning", color: "error", variant: "outlined" }, { children: _jsx(CcfTypography, { variant: "subtitle2", style: { paddingRight: '2px' }, translationKey: 'closedInteraction', "aria-label": translate('closedInteraction') }) })), _jsxs(CcfBox, Object.assign({ sx: themeStyles.tabsContainer }, { children: [_jsx(ToastContainer, { enableMultiContainer: true, containerId: 'ComponentToastContainer', position: "top-center", newestOnTop: false, closeOnClick: true, rtl: false, pauseOnFocusLoss: true, hideProgressBar: true, draggable: true }), ((nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.media) === MediaType.DIGITAL || (nonIncomingActiveContactInSelectedInteraction === null || nonIncomingActiveContactInSelectedInteraction === void 0 ? void 0 : nonIncomingActiveContactInSelectedInteraction.media) === MediaType.WORKITEM || isActiveVoiceAndTranscriptionToggleOn)
                        && _jsx(CcfDigitalContactTabs, Object.assign({}, props))] }))] })));
};
//# sourceMappingURL=ccfDigitalContactTabPanel.js.map