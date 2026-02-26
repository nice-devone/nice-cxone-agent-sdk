import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Box } from '@mui/material';
import { CallContactEventStatus } from '@nice-devone/core-sdk';
import { CcfButton, useTranslator } from '@nice-devone/ui-controls';
import CcfPcOutOfNetworkOutcomes from './ccf-pc-out-of-network-outcomes';
import { useSelector } from 'react-redux';
import { voiceContactSelector } from '../../ccf-assignment-panel/ccf-assignment-panel.slice';
/**
 * CcfPcDialerControls - returns PC dialer controls
 * @param props -?-CcfPcDialerControlsProps
 * @example <CcfPcDialerControls />
 */
export const CcfPcDialerControls = (props) => {
    var _a, _b, _c;
    const voiceContact = useSelector(voiceContactSelector);
    const [translate] = useTranslator();
    /**
        * Used to handle the call placed click event
        * @example handleCallPlaced()
        */
    const handleCallPlaced = (e) => {
        props.handleCallPlaced(e);
    };
    /**
        * Used to handle the call ended click event
        * @example handlePcCallEnd()
        */
    const handlePcCallEnd = (e) => {
        props.handlePcCallEnd(e);
    };
    return (_jsxs(_Fragment, { children: [((_a = voiceContact === null || voiceContact === void 0 ? void 0 : voiceContact.status) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === CallContactEventStatus.NATURAL_CALL_DIALING.toLowerCase() &&
                _jsx(Box, Object.assign({ sx: { padding: '10px', display: 'flex', alignItems: 'center' } }, { children: _jsx(CcfButton, Object.assign({ variant: "contained", primary: true, disableElevation: true, onClick: handleCallPlaced }, { children: translate('callPlaced') })) })), ((_b = voiceContact === null || voiceContact === void 0 ? void 0 : voiceContact.status) === null || _b === void 0 ? void 0 : _b.toLowerCase()) === CallContactEventStatus.NATURAL_CALL_RINGING.toLowerCase() &&
                _jsx(CcfPcOutOfNetworkOutcomes, {}), ((_c = voiceContact === null || voiceContact === void 0 ? void 0 : voiceContact.status) === null || _c === void 0 ? void 0 : _c.toLowerCase()) === CallContactEventStatus.ACTIVE.toLowerCase() &&
                _jsx(Box, Object.assign({ sx: { padding: '10px', display: 'flex', alignItems: 'center' } }, { children: _jsx(CcfButton, Object.assign({ variant: "contained", primary: true, disableElevation: true, onClick: handlePcCallEnd }, { children: translate('callEnded') })) }))] }));
};
export default CcfPcDialerControls;
//# sourceMappingURL=ccf-pc-dialer-controls.js.map