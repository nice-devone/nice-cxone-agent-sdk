"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChecklistActivationRuleType = exports.ChecklistCompletionTypeValues = void 0;
/**
 * Runtime-safe completion type constants for checklist item updates
 */
var ChecklistCompletionTypeValues;
(function (ChecklistCompletionTypeValues) {
    /**
     * Item was completed manually by the user (e.g., by checking a checkbox)
     */
    ChecklistCompletionTypeValues["MANUAL"] = "MANUAL";
    /**
     * Item was completed automatically based on a timer or time-based rule
     */
    ChecklistCompletionTypeValues["TIMER"] = "TIMER";
})(ChecklistCompletionTypeValues = exports.ChecklistCompletionTypeValues || (exports.ChecklistCompletionTypeValues = {}));
/**
 * Enum representing activation rule types for checklist items
 */
var ChecklistActivationRuleType;
(function (ChecklistActivationRuleType) {
    /**
     * Item is always active/available
     */
    ChecklistActivationRuleType["NONE"] = "none";
    /**
     * Item activates based on keyword detection
     */
    ChecklistActivationRuleType["KEYWORD_BASED"] = "keyword-based";
    /**
     * Item activates after a time delay
     */
    ChecklistActivationRuleType["TIME_BASED"] = "time-based";
})(ChecklistActivationRuleType = exports.ChecklistActivationRuleType || (exports.ChecklistActivationRuleType = {}));
//# sourceMappingURL=copilot-checklist-data.js.map