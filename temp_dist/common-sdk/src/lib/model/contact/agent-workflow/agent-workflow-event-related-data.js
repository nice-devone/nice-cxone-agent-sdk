"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgentWorkflowEventRelatedData = void 0;
/**
 * Model class for AgentWorkflowEventRelatedData
 * @example
 * ```
 * const agentWorkflowEventRelatedData = new AgentWorkflowEventRelatedData();
 * ```
 */
class AgentWorkflowEventRelatedData {
    /**
     * Used to parse data
     * @param data - data to be parsed
     * @example
     * ```
     * agentWorkflowEventRelatedData.parse(data);
     * ```
     */
    parse(data) {
        var _a;
        this.display = data === null || data === void 0 ? void 0 : data.display;
        this.id = data === null || data === void 0 ? void 0 : data.id;
        this.label = data === null || data === void 0 ? void 0 : data.label;
        this.state = data === null || data === void 0 ? void 0 : data.state;
        this.priority = data === null || data === void 0 ? void 0 : data.priority;
        this.type = data === null || data === void 0 ? void 0 : data.type;
        this.title = data === null || data === void 0 ? void 0 : data.title;
        this.url = data === null || data === void 0 ? void 0 : data.url;
        this.assignedTo = data === null || data === void 0 ? void 0 : data.assignedTo;
        this.linkable = typeof (data === null || data === void 0 ? void 0 : data.linkable) === 'string' ? ((_a = data === null || data === void 0 ? void 0 : data.linkable) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === 'true' : data === null || data === void 0 ? void 0 : data.linkable;
        this.updatedAt = new Date(data === null || data === void 0 ? void 0 : data.updatedAt);
        this.fields = data === null || data === void 0 ? void 0 : data.fields;
    }
}
exports.AgentWorkflowEventRelatedData = AgentWorkflowEventRelatedData;
//# sourceMappingURL=agent-workflow-event-related-data.js.map