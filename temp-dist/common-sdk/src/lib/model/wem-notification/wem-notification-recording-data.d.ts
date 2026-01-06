import { CcfTranslationKey } from '@nice-devone/i18n';
import { RecordingStatusReasonType, RecordingStreamDirectionType, RecordingStatusType } from '../../enum/recording-data';
import { NotificationType } from '../agent-message-notification/agent-message-notification';
import { WemNotificationMessage } from './wem-notification-message';
/**
 * Model class to display WEM notification recording data
 */
export declare class WemNotificationRecordingData {
    /**
    * @remarks notification message id
    */
    id: string;
    /**
     * @remarks recording id
     */
    recordingId: string;
    /**
     * @remarks contact id
     */
    contactId: string;
    /**
     * @remarks recording stream direction
     */
    recordingStreamDirection: RecordingStreamDirectionType;
    /**
    * @remarks notification status
    */
    status: RecordingStatusType;
    /**
    * @remarks notification reason
    */
    reason: RecordingStatusReasonType;
    /**
     * @remarks Type of toast notification
     */
    toastType: string;
    /**
     * @remarks Message key for localization
     */
    messageKey: CcfTranslationKey;
    /**
     * @remarks Flag indicating if currently recording
     */
    isRecording: boolean;
    /**
    * @remarks Notification template
    */
    template: string;
    /**
    * @remarks Notification type
    */
    notificationType: NotificationType;
    /**
     * @remarks Flag indicating if notification is enabled
     */
    isRealtimeNotificationEnabled: boolean;
    /**
      * The parse will take the data object and assign the values to the WemNotificationDisplayData class properties
      * @param message - WemNotificationMessage type message
      * @example -
      * ```
      * parse(message);
      * ```
      */
    parse(message: WemNotificationMessage): void;
    /**
     * Method to parse data from Recording Manager API
     * @param data - Data from Recording Manager API
     * @example
     * ```
     * parseFromRecordingManagerApi(data);
     * ```
     */
    parseFromRecordingManagerApi(data: any): void;
}
