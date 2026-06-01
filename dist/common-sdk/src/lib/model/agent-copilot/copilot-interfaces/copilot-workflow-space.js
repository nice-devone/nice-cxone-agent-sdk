"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initialWorkflowSpaceState = exports.WorkflowMediaType = exports.WorkflowCardType = exports.WorkflowStatus = void 0;
/**
 * Represents the possible statuses for a Workflow in the Workflow Space.
 * Values match the WebSocket message status field from Cognigy:
 * `success | error | timeout | onGoing | failed`. ON_GOING is the only
 * non-terminal status; all others end the workflow.
 */
var WorkflowStatus;
(function (WorkflowStatus) {
    /**
     * Workflow ended successfully.
     */
    WorkflowStatus["SUCCESS"] = "success";
    /**
     * Workflow ended with an error.
     */
    WorkflowStatus["ERROR"] = "error";
    /**
     * Workflow ended due to a timeout.
     */
    WorkflowStatus["TIMEOUT"] = "timeout";
    /**
     * Workflow is in progress.
     */
    WorkflowStatus["ON_GOING"] = "onGoing";
    /**
     * Workflow ended in failure.
     */
    WorkflowStatus["FAILED"] = "failed";
    /**
     * @deprecated Use `ON_GOING`. Retained as a compatibility alias so existing
     * consumers compile without changes while they migrate.
     */
    WorkflowStatus["RUNNING"] = "ongoing";
    /**
     * @deprecated Use `ON_GOING`. Retained as a compatibility alias so existing
     * consumers compile without changes while they migrate.
     */
    WorkflowStatus["WAITING"] = "waiting";
    /**
     * @deprecated Use `SUCCESS`. Retained as a compatibility alias so existing
     * consumers compile without changes while they migrate.
     */
    WorkflowStatus["COMPLETED"] = "completed";
})(WorkflowStatus = exports.WorkflowStatus || (exports.WorkflowStatus = {}));
/**
 * Card types for workflow responses
 */
var WorkflowCardType;
(function (WorkflowCardType) {
    /**
     * Plain text response
     */
    WorkflowCardType["TEXT"] = "Text";
    /**
     * Adaptive card response
     */
    WorkflowCardType["ADAPTIVE_CARD"] = "AdaptiveCard";
})(WorkflowCardType = exports.WorkflowCardType || (exports.WorkflowCardType = {}));
/**
 * Media type for workflow (Digital or Voice)
 */
var WorkflowMediaType;
(function (WorkflowMediaType) {
    WorkflowMediaType["DIGITAL"] = "Digital";
    WorkflowMediaType["VOICE"] = "Voice";
})(WorkflowMediaType = exports.WorkflowMediaType || (exports.WorkflowMediaType = {}));
/**
 * Initial state for the Workflow Space.
 */
exports.initialWorkflowSpaceState = {
    workflows: {},
    activeWorkflowId: null,
    isOpen: false,
    isLoading: false,
};
//# sourceMappingURL=copilot-workflow-space.js.map