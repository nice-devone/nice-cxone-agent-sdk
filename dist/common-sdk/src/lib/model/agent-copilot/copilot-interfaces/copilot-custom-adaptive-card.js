"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.customAdaptiveCardSchemaKey = exports.customAdaptiveCardLocation = void 0;
/**
 * Enum representing the location where a custom adaptive card can be rendered.
 */
var customAdaptiveCardLocation;
(function (customAdaptiveCardLocation) {
    /**
     * Render the adaptive card in the copilot stream.
     */
    customAdaptiveCardLocation["COPILOT_STREAM"] = "copilotStream";
    /**
     * Render the adaptive card on a dedicated copilot page.
     */
    customAdaptiveCardLocation["COPILOT_PAGE"] = "copilotPage";
})(customAdaptiveCardLocation = exports.customAdaptiveCardLocation || (exports.customAdaptiveCardLocation = {}));
/**
 * Enum representing the schema key prefix for custom adaptive cards.
 */
var customAdaptiveCardSchemaKey;
(function (customAdaptiveCardSchemaKey) {
    /**
     * Prefix used for identifying custom adaptive card schemas.
     */
    customAdaptiveCardSchemaKey["CUSTOM_ADAPTIVE_CARD"] = "custom_adaptive_card_";
})(customAdaptiveCardSchemaKey = exports.customAdaptiveCardSchemaKey || (exports.customAdaptiveCardSchemaKey = {}));
//# sourceMappingURL=copilot-custom-adaptive-card.js.map