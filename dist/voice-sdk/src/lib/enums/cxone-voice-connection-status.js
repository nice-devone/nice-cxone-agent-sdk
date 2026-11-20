"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CXoneVdiExtensionErrorType = exports.CXoneVdiExtensionStatus = exports.CXoneVoiceConnectionStatus = void 0;
var CXoneVoiceConnectionStatus;
(function (CXoneVoiceConnectionStatus) {
    CXoneVoiceConnectionStatus["MEDIA_DEVICE_NOT_FOUND"] = "MediaDeviceNotFound";
    CXoneVoiceConnectionStatus["MEDIA_DEVICE_ACCESS_DENIED"] = "MediaDeviceAccessDenied";
    CXoneVoiceConnectionStatus["CONNECTING"] = "Connecting";
    CXoneVoiceConnectionStatus["CONNECTED"] = "Connected";
    CXoneVoiceConnectionStatus["LOGGED_IN"] = "LoggedIn";
    CXoneVoiceConnectionStatus["DISCONNECTED"] = "Disconnected";
    CXoneVoiceConnectionStatus["LOGGED_OUT"] = "LoggedOut";
    CXoneVoiceConnectionStatus["LOGIN_FAILED"] = "LoginFailed";
})(CXoneVoiceConnectionStatus = exports.CXoneVoiceConnectionStatus || (exports.CXoneVoiceConnectionStatus = {}));
var CXoneVdiExtensionStatus;
(function (CXoneVdiExtensionStatus) {
    CXoneVdiExtensionStatus["VDI_MEDIA_REDIRECTOR_AVAILABLE"] = "VDIMediaRedirectorAvailable";
    CXoneVdiExtensionStatus["VDI_MEDIA_REDIRECTOR_UNAVAILABLE"] = "VDIMediaRedirectorUnavailable";
})(CXoneVdiExtensionStatus = exports.CXoneVdiExtensionStatus || (exports.CXoneVdiExtensionStatus = {}));
var CXoneVdiExtensionErrorType;
(function (CXoneVdiExtensionErrorType) {
    CXoneVdiExtensionErrorType["CXONE_MEDIA_ENGINE_UNAVAILABLE"] = "CXoneMediaEngineUnavailable";
    CXoneVdiExtensionErrorType["VDI_BRIDGE_UNAVAILABLE"] = "VDIBridgeUnavailable";
    CXoneVdiExtensionErrorType["VDI_CONTROLLER_INITIALIZATION_FAILED"] = "VDIControllerInitializationFailed";
})(CXoneVdiExtensionErrorType = exports.CXoneVdiExtensionErrorType || (exports.CXoneVdiExtensionErrorType = {}));
//# sourceMappingURL=cxone-voice-connection-status.js.map