import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useDispatch, useSelector } from 'react-redux';
import { memo, useEffect } from 'react';
import { loadTranscriptFromIndexedDB, selectTranscriptByContactId } from '../slices/ccf-voice-transcription.slice';
import { CcfVoiceTranscriptionTabContentHeader } from './ccf-voice-transcription-tab-content-header';
import { getVoiceContactDetailsById } from '../ccf-assignment-panel/ccf-assignment-panel.slice';
import CcfVoiceTranscriptionView from './ccf-voice-transcription-view';
/**
 * Renders the voice transcription tab content for a given contact.
 *
 * @param contactId - The unique identifier for the contact whose transcription is displayed.
 * @returns The JSX element representing the transcription tab content.
 * @example CcfVoiceTranscriptionTabContent contactId=\{contactId\}
 */
export function CcfVoiceTranscriptionTabContent({ contactId }) {
    const voiceContactTranscription = useSelector(selectTranscriptByContactId(contactId));
    const voiceContact = useSelector(getVoiceContactDetailsById(contactId));
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadTranscriptFromIndexedDB(contactId));
    }, []);
    return (_jsxs(_Fragment, { children: [_jsx(CcfVoiceTranscriptionTabContentHeader, { contactId: contactId }), _jsx(CcfVoiceTranscriptionView, { voiceContactTranscription: voiceContactTranscription, voiceContact: voiceContact })] }));
}
export default memo(CcfVoiceTranscriptionTabContent);
//# sourceMappingURL=ccf-voice-transcription-tab-content.js.map