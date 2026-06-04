"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestControlMode = void 0;
/**
 * Enum for request control mode to determine whether to abort or delay the request when there is a request
 */
var RequestControlMode;
(function (RequestControlMode) {
    RequestControlMode["ONLY_ABORT"] = "ONLY_ABORT";
    RequestControlMode["ONLY_DELAY"] = "ONLY_DELAY";
    RequestControlMode["DELAY_AND_ABORT"] = "DELAY_AND_ABORT"; // Both 
})(RequestControlMode = exports.RequestControlMode || (exports.RequestControlMode = {}));
//# sourceMappingURL=request-control-mode.js.map