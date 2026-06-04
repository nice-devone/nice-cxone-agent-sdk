"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgentWorkflowEventResult = void 0;
const agent_workflow_event_pinrecords_1 = require("./agent-workflow-event-pinrecords");
const agent_workflow_event_record_1 = require("./agent-workflow-event-record");
const agent_workflow_event_system_1 = require("./agent-workflow-event-system");
/**
 * Model class for AgentWorkflowEventResult
 * @example
 * ```
 * const agentWorkflowEventResult = new AgentWorkflowEventResult();
 * ```
 */
class AgentWorkflowEventResult {
    /**
     * Used to parse data
     * @param data - data to be parsed
     * @example
     * ```
     * agentWorkflowEventResult.parse(data);
     * ```
     */
    parse(data) {
        var _a, _b;
        this.system = new agent_workflow_event_system_1.AgentWorkflowEventSystem();
        this.system.parse(data === null || data === void 0 ? void 0 : data.system);
        this.records = (_a = data === null || data === void 0 ? void 0 : data.records) === null || _a === void 0 ? void 0 : _a.map((record) => {
            const rec = new agent_workflow_event_record_1.AgentWorkflowEventRecord();
            rec.parse(record);
            return rec;
        });
        this.pinRecords = (_b = data === null || data === void 0 ? void 0 : data.pinRecords) === null || _b === void 0 ? void 0 : _b.map((record) => {
            const rec = new agent_workflow_event_pinrecords_1.AgentWorkflowEventPinRecords();
            rec.parse(record);
            return rec;
        });
    }
}
exports.AgentWorkflowEventResult = AgentWorkflowEventResult;
//# sourceMappingURL=agent-workflow-event-result.js.map