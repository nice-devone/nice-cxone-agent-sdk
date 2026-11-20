import { VoiceContactStatus } from '../../../../enum/voice-contact-status';
export interface VoiceTranscriptionStatusEvent {
    status: TranscriptionStatus | VoiceContactStatus;
    timestamp: string;
    /**
     * Identity of the conference participant this status refers to. Absent for
     * two-party calls and for conference-wide status changes, where the status
     * applies to the call as a whole and existing call-level wording is used.
     * Optional so status events persisted before V3 continue to deserialise.
     */
    participantName?: string;
    participantContactId?: string;
    /**
     * Set on a HOLDING/RESUMED status that represents a whole-conference hold/resume
     * (the "Rejoin" button, or holding the conference to consult someone new) rather
     * than an individual leg's own hold/resume, so it reads as "Conference on hold" /
     * "Conference resumed" instead of the generic two-party call wording.
     */
    isConferenceLevel?: boolean;
}
export declare enum TranscriptionStatus {
    CALL_ENDED = "callEnded",
    CONNECTION_RESTORED = "connectionRestored",
    ERROR = "error",
    MUTED = "muted",
    PARTICIPANT_LEFT = "participantLeft",
    RESUMED = "resumed",
    UNMASKED = "unmasked",
    UNMUTED = "unmuted"
}
