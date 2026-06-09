"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgentWorkflowResponseEvent = void 0;
const agent_workflow_event_result_1 = require("./agent-workflow-event-result");
/**
 * Model Class for the AgentWorkflowResponseEvent
 * ```
 * const agentWorkflowResponseEvent = new AgentWorkflowResponseEvent();
 * ```
 */
class AgentWorkflowResponseEvent {
    /**
     * used to parse the data
     * @example
     * ```
     * agentWorkflowResponseEvent.parse(data);
     * ```
     */
    parse(data) {
        var _a;
        this.contactId = data === null || data === void 0 ? void 0 : data.contactId;
        this.result = (_a = data === null || data === void 0 ? void 0 : data.result) === null || _a === void 0 ? void 0 : _a.map((res) => {
            const result = new agent_workflow_event_result_1.AgentWorkflowEventResult();
            result.parse(res);
            return result;
        });
    }
}
exports.AgentWorkflowResponseEvent = AgentWorkflowResponseEvent;
//# sourceMappingURL=agent-workflow-event.js.map