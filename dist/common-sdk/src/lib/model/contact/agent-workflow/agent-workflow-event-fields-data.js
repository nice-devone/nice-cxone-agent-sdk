"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgentWorkflowEventFieldsData = void 0;
/**
 * Model class for AgentWorkflowEventFieldsData
 * @example
 * ```
 * const agentWorkflowEventFieldsData = new AgentWorkflowEventFieldsData();
 * ```
 */
class AgentWorkflowEventFieldsData {
    /**
     * Used to parse Workflow field dynamic data
     * @param data - data to be parsed
     * @example
     * ```
     * agentWorkflowEventFieldsData.parse(data);
     * ```
     */
    parse(data) {
        this.name = data === null || data === void 0 ? void 0 : data.name;
        this.label = data === null || data === void 0 ? void 0 : data.label;
        this.value = data === null || data === void 0 ? void 0 : data.value;
    }
}
exports.AgentWorkflowEventFieldsData = AgentWorkflowEventFieldsData;
//# sourceMappingURL=agent-workflow-event-fields-data.js.map