"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnavailableCode = void 0;
/**
 * Declare Unavailable Code Details
 */
class UnavailableCode {
    /**
     * This method to parse unavailable codes data
     * @param data -
     * @example -
     * ```
     *parseData(data);
     * ```
     */
    parseData(data) {
        this.reason = data.outStateName;
        this.isAcw = data.isAcw;
        this.isActive = data.isActive;
        this.isPersonalConnection = data.isPersonalConnection;
        this.skillName = data.skillName;
    }
}
exports.UnavailableCode = UnavailableCode;
//# sourceMappingURL=unavailable-code.js.map