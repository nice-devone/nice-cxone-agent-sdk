"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgentAssistBaseResponse = void 0;
/**
 * Class for AgentAssistBaseResponse
 */
class AgentAssistBaseResponse {
    /**
     * Create instance of AgentAssistBaseResponse
     * ```
     * @example
     * const AgentAssistBaseResponse = new AgentAssistBaseResponse();
     * ```
     */
    constructor(cmd, respHeader) {
        this.command = cmd;
        this.headers = { connectionId: respHeader === null || respHeader === void 0 ? void 0 : respHeader.connectionId };
    }
}
exports.AgentAssistBaseResponse = AgentAssistBaseResponse;
//# sourceMappingURL=agent-assist-base-response.js.map