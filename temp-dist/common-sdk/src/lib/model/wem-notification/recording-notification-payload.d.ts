import { RecordingStatusType, RecordingStatusReasonType, RecordingStreamDirectionType } from '../../enum/recording-data';
/**
 * Represents the payload for a recording notification.
 */
export interface RecordingNotificationPayload {
    /**
     * @remarks - The current status of the recording.
     */
    status: RecordingStatusType;
    /**
     * @remarks - The direction of the recording stream.
     */
    streamDirection: RecordingStreamDirectionType;
    /**
     * @remarks - The reason for the recording status change.
     */
    reason: RecordingStatusReasonType;
    /**
     * @remarks - The unique identifier for the contact.
     */
    contactId: string;
    /**
     * @remarks - The unique identifier for the recording segment.
     */
    segmentId: string;
    /**
     * @remarks - The unique identifier for the recording.
     */
    recordingId: string;
}
