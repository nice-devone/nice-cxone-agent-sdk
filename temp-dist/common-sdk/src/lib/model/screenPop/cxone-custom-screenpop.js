"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CXoneCustomScreenpop = void 0;
/**
 * Model Class for the CXoneCustomScreenpop
 * ```
 * const cxoneCustomScreenpop = new CXoneCustomScreenpop();
 * ```
 */
class CXoneCustomScreenpop {
    /**
     * used to parse the data
     * @example
     * ```
     * cxoneCustomScreenpop.parse(data);
     * ```
     */
    parse(data) {
        this.contactId = data === null || data === void 0 ? void 0 : data.contactId;
        this.data = data === null || data === void 0 ? void 0 : data.data;
    }
}
exports.CXoneCustomScreenpop = CXoneCustomScreenpop;
//# sourceMappingURL=cxone-custom-screenpop.js.map