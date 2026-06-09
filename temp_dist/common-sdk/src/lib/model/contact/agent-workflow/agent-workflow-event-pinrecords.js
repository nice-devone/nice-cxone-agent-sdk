"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgentWorkflowEventPinRecords = void 0;
/**
 * Model class for AgentWorkflowEventPinRecords
 * @example
 * ```
 * const AgentWorkflowEventPinRecords = new AgentWorkflowEventPinRecords();
 * ```
 */
class AgentWorkflowEventPinRecords {
    /**
     * Used to parse data
     * @param data - data to be parsed
     * @example
     * ```
     * AgentWorkflowEventPinRecords.parse(data);
     * ```
     */
    parse(data) {
        this.type = data === null || data === void 0 ? void 0 : data.type;
        this.label = data === null || data === void 0 ? void 0 : data.label;
        this.id = data === null || data === void 0 ? void 0 : data.id;
        this.url = data === null || data === void 0 ? void 0 : data.url;
        this.display = data === null || data === void 0 ? void 0 : data.display;
        this.dataMemo = data === null || data === void 0 ? void 0 : data.dataMemo;
        this.linkable = data === null || data === void 0 ? void 0 : data.linkable;
        this.linked = 'true';
        this.fields = data === null || data === void 0 ? void 0 : data.fields;
        this.screenPop = data === null || data === void 0 ? void 0 : data.screenPop;
    }
}
exports.AgentWorkflowEventPinRecords = AgentWorkflowEventPinRecords;
//# sourceMappingURL=agent-workflow-event-pinrecords.js.map