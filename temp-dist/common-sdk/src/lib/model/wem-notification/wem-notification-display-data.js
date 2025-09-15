"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WemNotificationDisplayData = void 0;
const utility_1 = require("../../../util/utility");
/**
 * model class to display WEM notification data
 */
class WemNotificationDisplayData {
    /**
      * The parse will take the data object and assign the values to the WemNotificationDisplayData class properties
      * @param message - WemNotificationMessage type message
      * @example -
      * ```
      * parse(message);
      * ```
      */
    parse(message) {
        this.id = message.headers.notificationUuid;
        this.msgRead = (0, utility_1.parseBooleanString)(message.headers.isRead);
        this.evolveNotificationUrl = message.data.notificationURL;
        this.receivedDateTime = new Date(message.headers.publishDate);
        this.subject = message.displayData.title;
        this.message = message.displayData.content;
        this.template = message.data.notificationTemplate;
        this.notificationType = 'WemNotification';
    }
}
exports.WemNotificationDisplayData = WemNotificationDisplayData;
//# sourceMappingURL=wem-notification-display-data.js.map