"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DynamicDataWorkflowParam = exports.DataMemoralisationWorkflowParam = exports.AgentWorkflowRequestEventRequest = void 0;
/**
 * Model class for AgentWorkflowEventRecord
 * @example
 * ```
 * const agentWorkflowEventRecord = new AgentWorkflowEventRecord();
 * ```
 */
class AgentWorkflowRequestEventRequest {
    /**
     * Used to parse data
     * @param data - data to be parsed
     * @example
     * ```
     * agentWorkflowEventRecord.parse(data);
     * ```
     */
    parse(data) {
        this.workflowType = data === null || data === void 0 ? void 0 : data.workflowType;
        this.configurationId = data === null || data === void 0 ? void 0 : data.configurationId;
        this.workflowId = data === null || data === void 0 ? void 0 : data.workflowId;
        this.cacheKey = data === null || data === void 0 ? void 0 : data.cacheKey;
        this.workflowParam = data === null || data === void 0 ? void 0 : data.workflowParam;
    }
}
exports.AgentWorkflowRequestEventRequest = AgentWorkflowRequestEventRequest;
/**
 * Model class for DataMemoralisationWorkflowParam
 * @example
 * ```
 * const DataMemoralisationWorkflowParam = new DataMemoralisationWorkflowParam();
 * ```
 */
class DataMemoralisationWorkflowParam {
}
exports.DataMemoralisationWorkflowParam = DataMemoralisationWorkflowParam;
/**
 * Model class for DynamicDataWorkflowParam
 * @example
 * ```
 * const DynamicDataWorkflowParam = new DynamicDataWorkflowParam();
 * ```
 */
class DynamicDataWorkflowParam {
}
exports.DynamicDataWorkflowParam = DynamicDataWorkflowParam;
//# sourceMappingURL=agent-workflow-request-event-request.js.map