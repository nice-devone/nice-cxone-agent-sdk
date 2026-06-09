"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserLocation = exports.ModeOfOperation = void 0;
var ModeOfOperation;
(function (ModeOfOperation) {
    ModeOfOperation["FULLY_AUTO"] = "FullyAuto";
    ModeOfOperation["FULLY_MANUAL"] = "FullyManual";
    ModeOfOperation["AUTO_PREVIEW_ONLY"] = "AutoPreviewOnly";
    ModeOfOperation["AUTO_PREVIEW_ADJUST"] = "AutoPreviewAdjust";
})(ModeOfOperation = exports.ModeOfOperation || (exports.ModeOfOperation = {}));
/**
 * @remarks -  The user location
 */
class UserLocation {
    /**
       * @remarks -  Parse the user location
       * @param data - The data to parse
       * @example
       * ```
       * parse(data)
       * ```
       */
    parse(data) {
        this.modeOfOperation = data.modeOfOperation;
        this.locations = data.locations;
    }
}
exports.UserLocation = UserLocation;
//# sourceMappingURL=user-location.js.map