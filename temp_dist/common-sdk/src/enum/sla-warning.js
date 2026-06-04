"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SLAIndicatorType = void 0;
/**
 * Enum for SLA Indicator type
 * normal means the SLA time is above 50%
 * warning means the SLA time is less than equal to 50%
 * critical means the SLA time has expired
 */
var SLAIndicatorType;
(function (SLAIndicatorType) {
    SLAIndicatorType["NORMAL"] = "normal";
    SLAIndicatorType["WARNING"] = "warning";
    SLAIndicatorType["CRITICAL"] = "critical";
})(SLAIndicatorType = exports.SLAIndicatorType || (exports.SLAIndicatorType = {}));
//# sourceMappingURL=sla-warning.js.map