import { jsx as _jsx } from "react/jsx-runtime";
import { memo, useRef } from 'react';
import { VoiceTranscriptionItemType, } from '@nice-devone/common-sdk';
import { Box, Stack, useTheme } from '@mui/material';
import { CcfVoiceTranscriptionMessageTile } from './ccf-voice-transcription-message-tile';
import { CcfVoiceTranscriptionCallStatusTile } from './ccf-voice-transcription-call-status-tile';
/**
 * Renders the voice transcription tab content for a given contact.
 *
 * @param props - CcfVoiceTranscriptionViewProps containing transcription data and contact details
 * @returns The JSX element representing the transcription tab content.
 * @example
 * ```
 * <CcfVoiceTranscriptionView
 *   voiceContactTranscription={transcriptionData}
 *   voiceContact={contactData}
 * />
 * ```
 */
export function CcfVoiceTranscriptionView({ voiceContactTranscription, voiceContact, useVoiceTranscriptionMessageTileHook, }) {
    var _a, _b;
    const theme = useTheme();
    const contentBodyStyle = {
        width: '95%',
        textAlign: 'left',
        font: 'normal normal normal 12px/17px Open Sans',
        padding: '16px 15px',
        letterSpacing: '0px',
        color: (_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.text) === null || _b === void 0 ? void 0 : _b.contrastText,
        opacity: '1',
        '& > span': {
            fontSize: '12px',
        },
    };
    const containerRef = useRef(null);
    const itemRef = useRef(null);
    const stackRef = useRef(null);
    return (_jsx(Box, Object.assign({ ref: containerRef, sx: {
            height: '100%',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'flex-end',
        } }, { children: _jsx(Stack, Object.assign({ direction: "column", ref: stackRef, "data-testid": "stack", sx: [
                contentBodyStyle,
                {
                    gap: 1,
                    width: '100%',
                    minHeight: '100%',
                }
            ] }, { children: voiceContactTranscription.map((transcriptItem, index) => {
                var _a;
                if (transcriptItem.type === VoiceTranscriptionItemType.STATUS) {
                    const statusEvent = transcriptItem.data;
                    return (_jsx(CcfVoiceTranscriptionCallStatusTile, { statusEvent: statusEvent }, statusEvent.status + '-' + statusEvent.timestamp));
                }
                else {
                    return (_jsx(CcfVoiceTranscriptionMessageTile, { contact: voiceContact, utterance: transcriptItem.data, useVoiceTranscriptionMessageTileHook: useVoiceTranscriptionMessageTileHook, ref: index === 0 ? itemRef : null }, (_a = transcriptItem.data) === null || _a === void 0 ? void 0 : _a.traceId));
                }
            }) })) })));
}
export default memo(CcfVoiceTranscriptionView);
//# sourceMappingURL=ccf-voice-transcription-view.js.map