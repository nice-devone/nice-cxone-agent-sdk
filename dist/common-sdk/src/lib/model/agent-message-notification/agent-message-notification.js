"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgentMessageNotification = exports.NotificationTypeEnum = void 0;
const utility_1 = require("../../../util/utility");
var NotificationTypeEnum;
(function (NotificationTypeEnum) {
    NotificationTypeEnum["WemNotification"] = "WemNotification";
    NotificationTypeEnum["AgentNotification"] = "AgentNotification";
    NotificationTypeEnum["RecordingNotification"] = "RecordingNotification";
    NotificationTypeEnum["ConversationNotification"] = "ConversationNotification";
})(NotificationTypeEnum = exports.NotificationTypeEnum || (exports.NotificationTypeEnum = {}));
/**
 * model class to display Agent Message notification
 */
class AgentMessageNotification {
    /**
     * The parse will parse the agent notification message
     * @param data -
     * @example -
     * ```
     * parse(message);
     * ```
     */
    parse(data) {
        this.id = data.MessageId;
        this.message = data.MessageText;
        this.subject = data.Subject;
        this.validUntil = Date.parse(data.ValidUntil);
        this.receivedDateTime = new Date(data.start_date);
        this.receivedTime = this.receivedDateTime.getTime();
        this.msgRead = false;
        this.expTimer = (0, utility_1.parseInteger)(data.ExpireTimer);
        this.notificationType = 'AgentNotification';
    }
}
exports.AgentMessageNotification = AgentMessageNotification;
//# sourceMappingURL=agent-message-notification.js.map