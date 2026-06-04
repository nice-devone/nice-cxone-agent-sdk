import { NotificationType } from '../agent-message-notification/agent-message-notification';
import { WemNotificationMessage } from './wem-notification-message';
/**
 * model class to display WEM notification data
 */
export declare class WemNotificationDisplayData {
    /**
     * @remarks notification message id
     */
    id: string;
    /**
  * @remarks notification message
  */
    message: string;
    /**
  * @remarks notification subject
  */
    subject: string;
    /**
  * @remarks received date time
  */
    receivedDateTime: Date;
    /**
  * @remarks message read
  */
    msgRead: boolean;
    /**
  * @remarks Notification url
  */
    evolveNotificationUrl: string;
    /**
  * @remarks Notification template
  */
    template: string;
    /**
  * @remarks Notification type
  */
    notificationType: NotificationType;
    /**
      * The parse will take the data object and assign the values to the WemNotificationDisplayData class properties
      * @param message - WemNotificationMessage type message
      * @example -
      * ```
      * parse(message);
      * ```
      */
    parse(message: WemNotificationMessage): void;
}
