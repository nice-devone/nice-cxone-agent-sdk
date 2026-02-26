import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Collapse } from '@mui/material';
import { CcfBox, useTranslator, CcfButton, } from '@nice-devone/ui-controls';
import assignmentAcceptRejectStyles from './ccf-assignment-card-accept-reject.styles';
import { CXoneLeaderElector, VoiceContactStatus } from '@nice-devone/common-sdk';
import { CallType } from '@nice-devone/agent-sdk';
import CcfAudioRingtoneElementOnLoad from '../../../ccf-audio-element/ccf-audio-ringtone-element-on-load';
import { useState } from 'react';
/**
 * CcfContactAcceptReject - Is used to display the accept and reject buttons in the assignment card
 * @param props -?-CcfAssignmentAcceptRejectProps
 * @example <CcfContactAcceptReject />
 */
export function CcfContactAcceptReject(props) {
    var _a, _b, _c, _d, _e;
    const [translate] = useTranslator();
    const style = assignmentAcceptRejectStyles();
    const [isRingtoneActive, setIsRingtoneActive] = useState(true);
    const showButtons = true;
    const contactStatus = (_a = props.contact) === null || _a === void 0 ? void 0 : _a.contactStatus;
    const isConsultcall = ((_b = props.contact) === null || _b === void 0 ? void 0 : _b.callType) === CallType.CONSULT && (contactStatus === VoiceContactStatus.INCOMING || contactStatus === VoiceContactStatus.RINGING);
    /**
     * Used to handle the accept click event
     * @example handleAccept()
     */
    const handleAccept = (e) => {
        setIsRingtoneActive(false);
        props.handleAccept(e);
    };
    /**
     * Used to handle the reject click event
     * @example handleReject()
     */
    const handleReject = (e) => {
        props.handleReject(e);
    };
    return (_jsxs(CcfBox, { children: [CXoneLeaderElector.instance.isLeader && isRingtoneActive && (_jsx(CcfAudioRingtoneElementOnLoad, { isIncoming: ((_c = props.contact) === null || _c === void 0 ? void 0 : _c.contactStatus) === VoiceContactStatus.INCOMING ||
                    ((_d = props.contact) === null || _d === void 0 ? void 0 : _d.contactStatus) === VoiceContactStatus.RINGING ||
                    ((_e = props.contact) === null || _e === void 0 ? void 0 : _e.contactStatus) === VoiceContactStatus.CALL_BACK_DISCONNECTED })), _jsx(Collapse, Object.assign({ in: showButtons, timeout: 500 }, { children: _jsxs(Box, Object.assign({ "data-testid": "accept-reject-buttons", sx: { display: 'flex',
                        alignItems: 'center',
                        pointerEvents: 'visible',
                        justifyContent: { xs: 'left', xl: 'space-evenly' },
                    } }, { children: [!isConsultcall && _jsx(CcfButton, Object.assign({ "data-testid": "reject-button", variant: "contained", color: "inherit", sx: style.buttonControls, disableElevation: true, onClick: (e) => handleReject(e) }, { children: translate('reject') })), _jsx(CcfButton, Object.assign({ "data-testid": "accept-button", variant: "contained", primary: true, sx: style.buttonControls, disableElevation: true, onClick: (e) => handleAccept(e) }, { children: translate('accept') }))] })) }))] }));
}
export default CcfContactAcceptReject;
//# sourceMappingURL=ccf-assignment-card-accept-reject.js.map