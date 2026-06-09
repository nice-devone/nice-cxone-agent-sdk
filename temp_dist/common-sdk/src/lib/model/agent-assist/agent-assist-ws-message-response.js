"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgentAssistWSMessageResponse = exports.WebSocketMessage = void 0;
const agent_assist_base_response_1 = require("./agent-assist-base-response");
const uuid_1 = require("uuid");
const agent_assist_command_1 = require("../../enum/agent-assist-command");
/**
 * Websocket message class
 * ```
 * @example
 * this.WebSocketMessage(data);
 * ```
 */
class WebSocketMessage {
    /**
     * constructor for WebSocketMessage
     * @example - const wsMessage = WebSocketMessage(data);
     */
    constructor(data) {
        this.command = data.command;
        this.headers = data.headers;
        this.body = data.body;
        this.timestamp = data.timestamp || new Date();
        this.id = (0, uuid_1.v4)();
    }
}
exports.WebSocketMessage = WebSocketMessage;
/**
 * Agent assist websocket message response
 * ```
 * @example
 * this.AgentAssistWSMessageResponse(respHeader, respBody);
 * ```
 */
class AgentAssistWSMessageResponse extends agent_assist_base_response_1.AgentAssistBaseResponse {
    /**
     * constructor for AgentAssistWSMessageResponse
     * @example -
     * ```
     * const wsMsgResp = AgentAssistWSMessageResponse(respHeader, respBody)
     * ```
     */
    constructor(respHeader, respBody) {
        super(agent_assist_command_1.AgentAssistCommand.message, respHeader);
        this.body = respBody;
    }
}
exports.AgentAssistWSMessageResponse = AgentAssistWSMessageResponse;
//# sourceMappingURL=agent-assist-ws-message-response.js.map