"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgentAssistSubscribedResponse = void 0;
const agent_assist_command_1 = require("../../enum/agent-assist-command");
const agent_assist_base_response_1 = require("./agent-assist-base-response");
/**
 * Class for AgentAssistSubscribedResponse
 */
class AgentAssistSubscribedResponse extends agent_assist_base_response_1.AgentAssistBaseResponse {
    /**
       * Create instance of AgentAssistSubscribedResponse
       * ```
       * @example
       * const AgentAssistSubscribedResponse = new AgentAssistSubscribedResponse();
       * ```
       */
    constructor(respHeader, respBody) {
        super(agent_assist_command_1.AgentAssistCommand.subscribed, respHeader);
        this.body = {
            topic: respBody === null || respBody === void 0 ? void 0 : respBody.topic,
        };
    }
}
exports.AgentAssistSubscribedResponse = AgentAssistSubscribedResponse;
//# sourceMappingURL=agent-assist-subscribe-response.js.map