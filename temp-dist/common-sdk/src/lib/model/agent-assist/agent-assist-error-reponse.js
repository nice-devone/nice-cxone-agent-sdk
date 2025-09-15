"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgentAssistErrorResponse = void 0;
const agent_assist_command_1 = require("../../enum/agent-assist-command");
const agent_assist_base_response_1 = require("./agent-assist-base-response");
/**
 * Class for AgentAssistErrorResponse
 */
class AgentAssistErrorResponse extends agent_assist_base_response_1.AgentAssistBaseResponse {
    /**
       * Create instance of AgentAssistErrorResponse
       * ```
       * @example
       * const AgentAssistErrorResponse = new AgentAssistErrorResponse();
       * ```
       */
    constructor(respHeader, respBody) {
        super(agent_assist_command_1.AgentAssistCommand.error, respHeader);
        this.body = {
            responseCode: respBody === null || respBody === void 0 ? void 0 : respBody.responseCode,
            responseText: respBody === null || respBody === void 0 ? void 0 : respBody.responseText,
        };
    }
}
exports.AgentAssistErrorResponse = AgentAssistErrorResponse;
//# sourceMappingURL=agent-assist-error-reponse.js.map