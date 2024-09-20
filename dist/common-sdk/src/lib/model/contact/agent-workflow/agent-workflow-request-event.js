"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgentWorkflowRequestEvent = void 0;
const agent_workflow_request_event_request_1 = require("./agent-workflow-request-event-request");
/**
 * Model Class for the AgentWorkflowRequestEvent
 * @example
 * ```
 * const AgentWorkflowRequestEvent = new AgentWorkflowRequestEvent();
 * ```
 */
class AgentWorkflowRequestEvent {
    /**
     * used to parse the data
     * @example
     * ```
     * AgentWorkflowRequestEvent.parse(data);
     * ```
     */
    parse(agentWorkflowConfiguration) {
        var _a, _b, _c, _d;
        (agentWorkflowConfiguration === null || agentWorkflowConfiguration === void 0 ? void 0 : agentWorkflowConfiguration.contactId) && (this.ContactID = agentWorkflowConfiguration === null || agentWorkflowConfiguration === void 0 ? void 0 : agentWorkflowConfiguration.contactId);
        if (agentWorkflowConfiguration === null || agentWorkflowConfiguration === void 0 ? void 0 : agentWorkflowConfiguration.request) {
            this.request = (_a = agentWorkflowConfiguration === null || agentWorkflowConfiguration === void 0 ? void 0 : agentWorkflowConfiguration.request) === null || _a === void 0 ? void 0 : _a.map((res) => {
                const result = new agent_workflow_request_event_request_1.AgentWorkflowRequestEventRequest();
                result.parse(res);
                return res;
            });
        }
        if (agentWorkflowConfiguration === null || agentWorkflowConfiguration === void 0 ? void 0 : agentWorkflowConfiguration.dataMemorializationWorkflow) {
            this.dataMemorializationWorkflow = (_b = agentWorkflowConfiguration === null || agentWorkflowConfiguration === void 0 ? void 0 : agentWorkflowConfiguration.dataMemorializationWorkflow) === null || _b === void 0 ? void 0 : _b.map((res) => {
                const result = new agent_workflow_request_event_request_1.AgentWorkflowRequestEventRequest();
                result.parse(res);
                return res;
            });
        }
        if (agentWorkflowConfiguration === null || agentWorkflowConfiguration === void 0 ? void 0 : agentWorkflowConfiguration.searchWorkflow) {
            this.searchWorkflow = (_c = agentWorkflowConfiguration === null || agentWorkflowConfiguration === void 0 ? void 0 : agentWorkflowConfiguration.searchWorkflow) === null || _c === void 0 ? void 0 : _c.map((res) => {
                const result = new agent_workflow_request_event_request_1.AgentWorkflowRequestEventRequest();
                result.parse(res);
                return res;
            });
        }
        if (agentWorkflowConfiguration === null || agentWorkflowConfiguration === void 0 ? void 0 : agentWorkflowConfiguration.timelineWorkflow) {
            this.timelineWorkflow = (_d = agentWorkflowConfiguration === null || agentWorkflowConfiguration === void 0 ? void 0 : agentWorkflowConfiguration.timelineWorkflow) === null || _d === void 0 ? void 0 : _d.map((res) => {
                const result = new agent_workflow_request_event_request_1.AgentWorkflowRequestEventRequest();
                result.parse(res);
                return res;
            });
        }
    }
}
exports.AgentWorkflowRequestEvent = AgentWorkflowRequestEvent;
//# sourceMappingURL=agent-workflow-request-event.js.map