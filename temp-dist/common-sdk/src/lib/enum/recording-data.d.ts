/**
 * Enumerates the possible statuses of a recording.
 */
export declare enum RecordingStatus {
    RECORDING = "RECORDING",
    STOPPED = "STOPPED",
    RECORDING_FAILURE = "RECORDING_FAILURE",
    POOR_QUALITY = "POOR_QUALITY",
    UNKNOWN = "UNKNOWN",
    NO_RECORDING = "NORECORDING"
}
export declare type RecordingStatusType = `${RecordingStatus}`;
/**
 * Enumerates the possible reasons for a recording's status change.
 */
export declare enum RecordingStatusReason {
    POLICY = "Policy",
    HOLD = "Hold",
    MASK = "Mask",
    RECORD_ON_DEMAND = "RecordOnDemand",
    STOP_ON_DEMAND = "StopOnDemand",
    CUSTOMER_DISCONSENT = "CustomerDisconsent",
    UNKNOWN = "Unknown"
}
export declare type RecordingStatusReasonType = `${RecordingStatusReason}`;
/**
 * Enumerates the possible directions of a recording stream.
 */
export declare enum RecordingStreamDirection {
    TO_AGENT = "ToAgent",
    FROM_AGENT = "FromAgent"
}
export declare type RecordingStreamDirectionType = `${RecordingStreamDirection}`;
/**
 * Enumerates the possible recording-related messages.
 */
export declare enum RecordingMessages {
    RECORDING_STARTED = "recordingStarted",
    RECORDING_STOPPED = "recordingStopped",
    RECORDING_FAILURE = "recordingFailed"
}
export declare enum RecordingNotificationTemplate {
    RECORDING_STATUS = "RECORDING_STATUS"
}
