"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CXoneSdkError = void 0;
const http_response_1 = require("../../http/http-response/http-response");
/**
 * Class to handle Errors in SDK
 */
class CXoneSdkError {
    /**
     * @example new CXoneSdkError(CXoneSdkErrorType.API_ERROR)
     */
    constructor(type, message, data) {
        this.errorType = type;
        this.message = message;
        this.data = data ? data : {};
        this.name = type.toString();
    }
    /**
     * Used to get the CXoneSdkError to string format
     * @returns
     * @example -
     * ```
     * error.toString();
     * ```
     */
    toString() {
        if (this.data instanceof http_response_1.HttpResponse) {
            return ` CXoneSdkError:: ErrorType - ${this.errorType}, status - ${this.data.status}, statusText - ${this.data.statusText}, data - ${JSON.stringify(this.data)}`;
        }
        return ` CXoneSdkError:: ErrorType - ${this.errorType}, message - ${this.message}, ${this.data ? `data - ${JSON.stringify(this.data)}` : ''}`;
    }
}
exports.CXoneSdkError = CXoneSdkError;
//# sourceMappingURL=cxone-sdk-error.js.map