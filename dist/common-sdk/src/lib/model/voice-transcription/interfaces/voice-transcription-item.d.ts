import { VoiceTranscriptionStatusEvent } from './voice-transcription-status-event';
import { VoiceTranscriptionWebSocketResponse } from './voice-transcription-web-socket-response';
export interface VoiceTranscriptionItem {
    contactId: string;
    type: VoiceTranscriptionItemType;
    data: VoiceTranscriptionWebSocketResponse | VoiceTranscriptionStatusEvent;
}
export declare enum VoiceTranscriptionItemType {
    MESSAGE = "message",
    STATUS = "status"
}
