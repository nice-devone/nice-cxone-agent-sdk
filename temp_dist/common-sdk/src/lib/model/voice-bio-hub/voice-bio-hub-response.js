"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgentAssistVoiceBioMessage = exports.VoiceBioHubResponse = void 0;
const agent_assist_command_1 = require("../../enum/agent-assist-command");
const auto_summary_response_1 = require("../auto-summary/auto-summary-response");
/**
 * Class for AgentAssistMessageResponse
*/
class VoiceBioHubResponse {
    /**
       * Create instance of AgentAssistMessageResponse
       * @example
       * const AgentAssistMessageResponse = new AgentAssistMessageResponse();
       */
    constructor(cmd, respHeader) {
        this.command = cmd;
        this.headers = { connectionId: respHeader.connectionId };
    }
    /**
       * method to parse the response
       * @example
       * const AgentAssistMessageResponse = new AgentAssistMessageResponse();
       */
    static parse(response) {
        switch (response.command) {
            case agent_assist_command_1.AgentAssistCommand.connected:
                return new auto_summary_response_1.AgentAssistConnected(response.headers);
            case agent_assist_command_1.AgentAssistCommand.subscribed:
                return new auto_summary_response_1.AgentAssistSubscribed(response.headers, response.body);
            case agent_assist_command_1.AgentAssistCommand.message:
                return new AgentAssistVoiceBioMessage(response.headers, response.body);
            case agent_assist_command_1.AgentAssistCommand.error:
                return new auto_summary_response_1.AgentAssistError(response.headers, response.body);
            default:
                return { command: response.command };
        }
    }
}
exports.VoiceBioHubResponse = VoiceBioHubResponse;
/**
 * Class for AutoSummaryData
*/
class AgentAssistVoiceBioMessage extends VoiceBioHubResponse {
    /**
       * Create instance of AutoSummaryData
       * @example
       * const autoSummaryData = new AutoSummaryData();
       */
    constructor(respHeader, respBody) {
        super(agent_assist_command_1.AgentAssistCommand.message, respHeader);
        this.body = { data: {
                requestType: respBody.requestType,
                topic: respBody.topic,
                data: respBody.data,
            },
        };
    }
}
exports.AgentAssistVoiceBioMessage = AgentAssistVoiceBioMessage;
//# sourceMappingURL=voice-bio-hub-response.js.map