"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgentAssistUnSubscribedResponse = void 0;
const agent_assist_command_1 = require("../../enum/agent-assist-command");
const agent_assist_base_response_1 = require("./agent-assist-base-response");
/**
 * Class for AgentAssistUnSubscribedResponse
 */
class AgentAssistUnSubscribedResponse extends agent_assist_base_response_1.AgentAssistBaseResponse {
    /**
       * Create instance of AgentAssistUnSubscribedResponse
       * ```
       * @example
       * const AgentAssistUnSubscribedResponse = new AgentAssistUnSubscribedResponse();
       * ```
       */
    constructor(respHeader, respBody) {
        super(agent_assist_command_1.AgentAssistCommand.unsubscribed, respHeader);
        this.body = {
            topic: respBody === null || respBody === void 0 ? void 0 : respBody.topic,
        };
    }
}
exports.AgentAssistUnSubscribedResponse = AgentAssistUnSubscribedResponse;
//# sourceMappingURL=agent-assist-unsubscribed-response.js.map