"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgentWorkflowEventRecord = void 0;
const agent_workflow_event_related_data_1 = require("./agent-workflow-event-related-data");
/**
 * Model class for AgentWorkflowEventRecord
 * @example
 * ```
 * const agentWorkflowEventRecord = new AgentWorkflowEventRecord();
 * ```
 */
class AgentWorkflowEventRecord {
    /**
     * Used to parse data
     * @param data - data to be parsed
     * @example
     * ```
     * agentWorkflowEventRecord.parse(data);
     * ```
     */
    parse(data) {
        var _a, _b;
        this.type = data === null || data === void 0 ? void 0 : data.type;
        this.label = data === null || data === void 0 ? void 0 : data.label;
        this.id = data === null || data === void 0 ? void 0 : data.id;
        this.url = data === null || data === void 0 ? void 0 : data.url;
        this.display = data === null || data === void 0 ? void 0 : data.display;
        this.title = data === null || data === void 0 ? void 0 : data.title;
        this.screenPop = data === null || data === void 0 ? void 0 : data.screenPop;
        this.linkable = typeof (data === null || data === void 0 ? void 0 : data.linkable) === 'string' ? ((_a = data === null || data === void 0 ? void 0 : data.linkable) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === 'true' : data === null || data === void 0 ? void 0 : data.linkable;
        this.updated = new Date(data === null || data === void 0 ? void 0 : data.updated);
        const relatedData = (_b = data === null || data === void 0 ? void 0 : data.related) === null || _b === void 0 ? void 0 : _b.map((data) => {
            const relatedData = new agent_workflow_event_related_data_1.AgentWorkflowEventRelatedData();
            relatedData.parse(data);
            return relatedData;
        });
        this.related = relatedData || [];
        this.fields = data === null || data === void 0 ? void 0 : data.fields;
    }
}
exports.AgentWorkflowEventRecord = AgentWorkflowEventRecord;
//# sourceMappingURL=agent-workflow-event-record.js.map