import { RecordingNotificationPayload } from './recording-notification-payload';
/**
 * Model interface for WEM notification messages
 */
export interface WemNotificationMessage {
    /**
      * @remarks command of the notification message
      */
    command: string;
    /**
      * @remarks data of the notification message
      */
    data: {
        /**
        * @remarks notification template
        */
        notificationTemplate: string;
        /**
        * @remarks list of wem embedded pages
        */
        notificationURL: string;
        /**
         * @remarks payload of the recording notification message
         */
        payload?: RecordingNotificationPayload;
    };
    displayData: {
        /**
        * @remarks content of notification message
        */
        content: string;
        /**
        * @remarks title of notification message
        */
        title: string;
    };
    /**
    * @remarks header of notification message
    */
    headers: {
        /**
        * @remarks message is read or not
        */
        isRead: string;
        /**
        * @remarks notification custom identifier
        */
        notificationCustomIdentifier?: string;
        /**
        * @remarks notification target type
        */
        notificationTargetType: string;
        /**
        * @remarks notification uu id
        */
        notificationUuid: string;
        /**
        * @remarks publish date
        */
        publishDate: Date;
        /**
        * @remarks publisher name
        */
        publisher: string;
        /**
        * @remarks real time
        */
        withRealTime: string;
    };
}
