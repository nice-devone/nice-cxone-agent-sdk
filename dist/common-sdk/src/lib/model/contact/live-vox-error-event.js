"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LiveVoxErrorCallType = exports.LiveVoxErrorCategory = exports.LIVEVOXERROR_NOTIFY_EVENT_TYPE = void 0;
/**
 * @remarks - The `Type` value VC stamps on a decoded LiveVoxError SmartReach event (see OB-41201)
 */
exports.LIVEVOXERROR_NOTIFY_EVENT_TYPE = 'LiveVoxError';
/**
 * Fallback classification keys VC assigns a LiveVox dial failure to.
 * Treated as an opaque string per OB-41201 -- not enforced as a closed enum.
 */
var LiveVoxErrorCategory;
(function (LiveVoxErrorCategory) {
    LiveVoxErrorCategory["COMPLIANCE"] = "COMPLIANCE";
    LiveVoxErrorCategory["SIP"] = "SIP";
    LiveVoxErrorCategory["INTERNAL_ERROR"] = "INTERNAL_ERROR";
    LiveVoxErrorCategory["BAD_PARAMETERS"] = "BAD_PARAMETERS";
    LiveVoxErrorCategory["NOT_FOUND"] = "NOT_FOUND";
    LiveVoxErrorCategory["NETWORK_ERROR"] = "NETWORK_ERROR";
})(LiveVoxErrorCategory = exports.LiveVoxErrorCategory || (exports.LiveVoxErrorCategory = {}));
/**
 * The outbound call type a failed dial belongs to, as classified by VC.
 */
var LiveVoxErrorCallType;
(function (LiveVoxErrorCallType) {
    LiveVoxErrorCallType["PREVIEW"] = "preview";
    LiveVoxErrorCallType["MANUAL"] = "manual";
    LiveVoxErrorCallType["UNSPECIFIED"] = "unspecified";
})(LiveVoxErrorCallType = exports.LiveVoxErrorCallType || (exports.LiveVoxErrorCallType = {}));
//# sourceMappingURL=live-vox-error-event.js.map