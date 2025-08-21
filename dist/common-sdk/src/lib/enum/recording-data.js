"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecordingNotificationTemplate = exports.RecordingMessages = exports.RecordingStreamDirection = exports.RecordingStatusReason = exports.RecordingStatus = void 0;
/**
 * Enumerates the possible statuses of a recording.
 */
var RecordingStatus;
(function (RecordingStatus) {
    RecordingStatus["RECORDING"] = "RECORDING";
    RecordingStatus["STOPPED"] = "STOPPED";
    RecordingStatus["RECORDING_FAILURE"] = "RECORDING_FAILURE";
    RecordingStatus["POOR_QUALITY"] = "POOR_QUALITY";
    RecordingStatus["UNKNOWN"] = "UNKNOWN";
    RecordingStatus["NO_RECORDING"] = "NORECORDING";
})(RecordingStatus = exports.RecordingStatus || (exports.RecordingStatus = {}));
/**
 * Enumerates the possible reasons for a recording's status change.
 */
var RecordingStatusReason;
(function (RecordingStatusReason) {
    RecordingStatusReason["POLICY"] = "Policy";
    RecordingStatusReason["HOLD"] = "Hold";
    RecordingStatusReason["MASK"] = "Mask";
    RecordingStatusReason["RECORD_ON_DEMAND"] = "RecordOnDemand";
    RecordingStatusReason["STOP_ON_DEMAND"] = "StopOnDemand";
    RecordingStatusReason["CUSTOMER_DISCONSENT"] = "CustomerDisconsent";
    RecordingStatusReason["UNKNOWN"] = "Unknown";
})(RecordingStatusReason = exports.RecordingStatusReason || (exports.RecordingStatusReason = {}));
/**
 * Enumerates the possible directions of a recording stream.
 */
var RecordingStreamDirection;
(function (RecordingStreamDirection) {
    RecordingStreamDirection["TO_AGENT"] = "ToAgent";
    RecordingStreamDirection["FROM_AGENT"] = "FromAgent";
})(RecordingStreamDirection = exports.RecordingStreamDirection || (exports.RecordingStreamDirection = {}));
/**
 * Enumerates the possible recording-related messages.
 */
var RecordingMessages;
(function (RecordingMessages) {
    RecordingMessages["RECORDING_STARTED"] = "recordingStarted";
    RecordingMessages["RECORDING_STOPPED"] = "recordingStopped";
    RecordingMessages["RECORDING_FAILURE"] = "recordingFailed";
})(RecordingMessages = exports.RecordingMessages || (exports.RecordingMessages = {}));
var RecordingNotificationTemplate;
(function (RecordingNotificationTemplate) {
    RecordingNotificationTemplate["RECORDING_STATUS"] = "RECORDING_STATUS";
})(RecordingNotificationTemplate = exports.RecordingNotificationTemplate || (exports.RecordingNotificationTemplate = {}));
//# sourceMappingURL=recording-data.js.map