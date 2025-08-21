"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WemNotificationRecordingData = void 0;
const recording_data_1 = require("../../enum/recording-data");
const agent_message_notification_1 = require("../agent-message-notification/agent-message-notification");
/**
 * Model class to display WEM notification recording data
 */
class WemNotificationRecordingData {
    /**
      * The parse will take the data object and assign the values to the WemNotificationDisplayData class properties
      * @param message - WemNotificationMessage type message
      * @example -
      * ```
      * parse(message);
      * ```
      */
    parse(message) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        this.id = (_a = message.headers) === null || _a === void 0 ? void 0 : _a.notificationUuid;
        this.recordingId = ((_c = (_b = message.data) === null || _b === void 0 ? void 0 : _b.payload) === null || _c === void 0 ? void 0 : _c.recordingId) || '';
        this.recordingStreamDirection = ((_e = (_d = message.data) === null || _d === void 0 ? void 0 : _d.payload) === null || _e === void 0 ? void 0 : _e.streamDirection) || recording_data_1.RecordingStreamDirection.TO_AGENT;
        this.status = ((_g = (_f = message.data) === null || _f === void 0 ? void 0 : _f.payload) === null || _g === void 0 ? void 0 : _g.status) || recording_data_1.RecordingStatus.UNKNOWN;
        this.reason = ((_j = (_h = message.data) === null || _h === void 0 ? void 0 : _h.payload) === null || _j === void 0 ? void 0 : _j.reason) || recording_data_1.RecordingStatusReason.UNKNOWN;
        this.template = (_k = message.data) === null || _k === void 0 ? void 0 : _k.notificationTemplate;
        this.notificationType = agent_message_notification_1.NotificationTypeEnum.RecordingNotification;
    }
    /**
     * Method to parse data from Recording Manager API
     * @param data - Data from Recording Manager API
     * @example
     * ```
     * parseFromRecordingManagerApi(data);
     * ```
     */
    parseFromRecordingManagerApi(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data) {
        var _a, _b;
        this.id = (data === null || data === void 0 ? void 0 : data.interactionId) || '';
        this.recordingId = (data === null || data === void 0 ? void 0 : data.recordingId) || '';
        this.contactId = (data === null || data === void 0 ? void 0 : data.contactId) || '';
        // Assuming stream direction is not provided, default to TO_AGENT
        this.recordingStreamDirection = recording_data_1.RecordingStreamDirection.TO_AGENT;
        // Use status from agent side if available, otherwise fallback
        this.status = ((_b = (_a = data === null || data === void 0 ? void 0 : data.recordingStatusToAgent) === null || _a === void 0 ? void 0 : _a.toUpperCase) === null || _b === void 0 ? void 0 : _b.call(_a)) || recording_data_1.RecordingStatus.UNKNOWN;
        this.reason = (data === null || data === void 0 ? void 0 : data.statusReason) || recording_data_1.RecordingStatusReason.UNKNOWN;
        // isRecording can be derived from status if needed, here defaulting to false
        this.isRecording = this.status === recording_data_1.RecordingStatus.RECORDING;
        this.template = 'RecordingManagerStatus';
        this.notificationType = agent_message_notification_1.NotificationTypeEnum.RecordingNotification;
    }
}
exports.WemNotificationRecordingData = WemNotificationRecordingData;
//# sourceMappingURL=wem-notification-recording-data.js.map