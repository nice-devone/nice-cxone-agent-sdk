import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Paper, Box, Stack, Typography, useTheme } from '@mui/material';
import { formatTimestamp, VoiceContactStatus, TranscriptionStatus } from '@nice-devone/common-sdk';
import { CcfCallHoldIcon, CcfCallMaskIcon, CcfCallResumedIcon, CcfCallUnmaskIcon, CcfCopilotSuccessIcon, CcfTranscriptionErrorIcon, useTranslator, } from '@nice-devone/ui-controls';
import React from 'react';
export const CcfVoiceTranscriptionCallStatusTile = React.forwardRef(({ statusEvent }, ref) => {
    const theme = useTheme();
    const [translate] = useTranslator();
    /**
     * Returns the appropriate icon component for the call status.
     * @example
     * const icon = getStatusIcon();
     */
    const getStatusIcon = () => {
        switch (statusEvent.status) {
            case VoiceContactStatus.HOLDING:
                return _jsx(CcfCallHoldIcon, { htmlColor: theme.palette.text.contrastText, sx: { width: 25, height: 18 } });
            case VoiceContactStatus.MASKING:
                return _jsx(CcfCallMaskIcon, { htmlColor: theme.palette.text.contrastText, sx: { width: 25, height: 18 } });
            case TranscriptionStatus.RESUMED:
                return _jsx(CcfCallResumedIcon, { htmlColor: theme.palette.text.contrastText, sx: { width: 25, height: 18 } });
            case TranscriptionStatus.UNMASKED:
                return _jsx(CcfCallUnmaskIcon, { htmlColor: theme.palette.text.contrastText, sx: { width: 25, height: 18 } });
            case TranscriptionStatus.ERROR:
                return _jsx(CcfTranscriptionErrorIcon, { sx: { width: 25, height: 18 } });
            case TranscriptionStatus.CONNECTION_RESTORED:
                return _jsx(CcfCopilotSuccessIcon, { sx: { width: 25, height: 18 } });
            default:
                return null;
        }
    };
    /**
     * Returns the appropriate status message for the call status.
     * @returns The status message as a string.
     * @example
     * const message = getStatusMessage();
     */
    const getStatusMessage = () => {
        switch (statusEvent.status) {
            case VoiceContactStatus.HOLDING:
                return translate('callIsOnHold');
            case VoiceContactStatus.MASKING:
                return translate('callMasked');
            case TranscriptionStatus.RESUMED:
                return translate('callResumed');
            case TranscriptionStatus.UNMASKED:
                return translate('callUnmasked');
            case TranscriptionStatus.ERROR:
                return translate('transcriptionStopped');
            case TranscriptionStatus.CONNECTION_RESTORED:
                return translate('connectionRestored');
            default:
                return translate('unknown');
        }
    };
    return (_jsxs(Paper, Object.assign({ elevation: 0, ref: ref, sx: { p: 1, display: 'flex', gap: 1, alignItems: 'center' } }, { children: [getStatusIcon(), _jsx(Box, { children: _jsxs(Stack, Object.assign({ direction: "row", spacing: 1, alignItems: "center" }, { children: [_jsx(Typography, Object.assign({ variant: "body2", color: theme.palette.text.contrastText }, { children: getStatusMessage() })), _jsx(Typography, Object.assign({ variant: "body2", color: theme.palette.text.header, sx: { marginLeft: '12px' } }, { children: formatTimestamp('en-US', statusEvent.timestamp) }))] })) })] })));
});
//# sourceMappingURL=ccf-voice-transcription-call-status-tile.js.map