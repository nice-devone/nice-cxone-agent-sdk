"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CXoneSdkErrorType = void 0;
var CXoneSdkErrorType;
(function (CXoneSdkErrorType) {
    /**
     * Error Type to be used for platform API error
     */
    CXoneSdkErrorType["CXONE_API_ERROR"] = "CXONE_API_ERROR";
    /**
     * Error Type to be used to validate the method parameters
     */
    CXoneSdkErrorType["INVALID_METHOD_PARMS"] = "INVALID_METHOD_PARMS";
    /**
     * Error Type to be used in case of illegal/unauthorized method calls
     */
    CXoneSdkErrorType["INVALID_METHOD_INVOCATION"] = "INVALID_METHOD_INVOCATION";
    /**
     * Error Type to be used for websocket error
     */
    CXoneSdkErrorType["WEBSOCKET_ERROR"] = "WEBSOCKET_ERROR";
    /**
     * Due to throttling and failure threshold exceeded beyond the limit the circuit breaker is in open state
     */
    CXoneSdkErrorType["CIRCUIT_OPEN"] = "CIRCUIT_BREAKER_IS_IN_OPEN_STATE";
    /**
     * Error Type to be used when data is empty
     */
    CXoneSdkErrorType["NO_DATA_FOUND"] = "NO_DATA_FOUND";
    /**
     * Error type when fail to parse websocket response as per schema model
     */
    CXoneSdkErrorType["WEB_SOCKET_DATA_VALIDATE"] = "WEB_SOCKET_DATA_VALIDATE";
    /**
     * Error type when fail to validate against yup schema
     */
    CXoneSdkErrorType["DATA_VALIDATION_ERROR"] = "DATA_VALIDATION_ERROR";
    /**
     * Error Type to be used for exception while invoking APIs
     */
    CXoneSdkErrorType["UNHANDLED_EXCEPTION"] = "UNHANDLED_EXCEPTION";
})(CXoneSdkErrorType = exports.CXoneSdkErrorType || (exports.CXoneSdkErrorType = {}));
//# sourceMappingURL=cxone-sdk-error-types.js.map