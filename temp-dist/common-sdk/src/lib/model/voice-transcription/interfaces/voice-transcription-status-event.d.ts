import { VoiceContactStatus } from '../../../../enum/voice-contact-status';
export interface VoiceTranscriptionStatusEvent {
    status: TranscriptionStatus | VoiceContactStatus;
    timestamp: string;
}
export declare enum TranscriptionStatus {
    UNMASKED = "unmasked",
    CONNECTION_RESTORED = "connectionRestored",
    ERROR = "error",
    RESUMED = "resumed"
}
