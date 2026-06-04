"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgentAssistConnectedResponse = void 0;
const agent_assist_command_1 = require("../../enum/agent-assist-command");
const agent_assist_base_response_1 = require("./agent-assist-base-response");
/**
 * Class for AgentAssistConnectedResponse
 */
class AgentAssistConnectedResponse extends agent_assist_base_response_1.AgentAssistBaseResponse {
    /**
       * Create instance of AgentAssistConnectedResponse
       * ```
       * @example
       * const AgentAssistConnectedResponse = new AgentAssistConnectedResponse();
       * ```
       */
    constructor(respHeader) {
        super(agent_assist_command_1.AgentAssistCommand.connected, respHeader);
        this.body = {};
    }
}
exports.AgentAssistConnectedResponse = AgentAssistConnectedResponse;
//# sourceMappingURL=agent-assist-connected-response.js.map