"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgentWorkflowEventSystem = void 0;
/**
 * Model class for AgentWorkflowEventSystem
 * @example
 * ```
 * const agentWorkflowEventSystem = new AgentWorkflowEventSystem();
 * ```
 */
class AgentWorkflowEventSystem {
    /**
     * Used to parse data
     * @param data - data to be parsed
     * @example
     * ```
     * agentWorkflowEventSystem.parse(data);
     * ```
     */
    parse(data) {
        this.type = data === null || data === void 0 ? void 0 : data.type;
        this.label = data === null || data === void 0 ? void 0 : data.label;
        this.icon = data === null || data === void 0 ? void 0 : data.icon;
        this.baseUrl = data === null || data === void 0 ? void 0 : data.baseUrl;
    }
}
exports.AgentWorkflowEventSystem = AgentWorkflowEventSystem;
//# sourceMappingURL=agent-workflow-event-system.js.map