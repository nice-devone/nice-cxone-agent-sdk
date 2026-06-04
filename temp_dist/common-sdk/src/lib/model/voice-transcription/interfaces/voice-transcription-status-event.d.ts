import { VoiceContactStatus } from '../../../../enum/voice-contact-status';
export interface VoiceTranscriptionStatusEvent {
    status: TranscriptionStatus | VoiceContactStatus;
    timestamp: string;
}
export declare enum TranscriptionStatus {
    CONNECTION_RESTORED = "connectionRestored",
    ERROR = "error",
    MUTED = "muted",
    RESUMED = "resumed",
    UNMASKED = "unmasked",
    UNMUTED = "unmuted"
}
