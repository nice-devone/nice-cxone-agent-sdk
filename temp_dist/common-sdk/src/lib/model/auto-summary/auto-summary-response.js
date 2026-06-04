"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgentAssistAutoSummaryMessage = exports.AgentAssistError = exports.AgentAssistUnsubscribed = exports.AgentAssistSubscribed = exports.AgentAssistConnected = exports.AgentAssistMessageResponse = void 0;
const agent_assist_command_1 = require("../../enum/agent-assist-command");
/**
 * Class for AgentAssistMessageResponse
*/
class AgentAssistMessageResponse {
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
                return new AgentAssistConnected(response.headers);
            case agent_assist_command_1.AgentAssistCommand.subscribed:
                return new AgentAssistSubscribed(response.headers, response.body);
            case agent_assist_command_1.AgentAssistCommand.message:
                return new AgentAssistAutoSummaryMessage(response.headers, response.body);
            case agent_assist_command_1.AgentAssistCommand.error:
                return new AgentAssistError(response.headers, response.body);
            default:
                return { command: response.command };
        }
    }
}
exports.AgentAssistMessageResponse = AgentAssistMessageResponse;
/**
 * Class for AgentAssistConnected
*/
class AgentAssistConnected extends AgentAssistMessageResponse {
    /**
       * Create instance of AgentAssistConnected
       * @example
       * const AgentAssistConnected = new AgentAssistConnected();
       */
    constructor(respHeader) {
        super(agent_assist_command_1.AgentAssistCommand.connected, respHeader);
        this.body = {};
    }
}
exports.AgentAssistConnected = AgentAssistConnected;
/**
 * Class for AgentAssistSubscribed
*/
class AgentAssistSubscribed extends AgentAssistMessageResponse {
    /**
     * Create instance of AgentAssistSubscribed
     * @example
     * const AgentAssistSubscribed = new AgentAssistSubscribed();
     */
    constructor(respHeader, respBody) {
        super(agent_assist_command_1.AgentAssistCommand.subscribed, respHeader);
        this.body = {
            topic: respBody.topic,
        };
    }
}
exports.AgentAssistSubscribed = AgentAssistSubscribed;
/**
 * Class for AgentAssistUnsubscribed
*/
class AgentAssistUnsubscribed extends AgentAssistMessageResponse {
    /**
     * Create instance of AgentAssistUnsubscribed
     * @example
     * const AgentAssistUnsubscribed = new AgentAssistUnsubscribed();
     */
    constructor(respHeader, respBody) {
        super(agent_assist_command_1.AgentAssistCommand.unsubscribed, respHeader);
        this.body = {
            topic: respBody.topic,
        };
    }
}
exports.AgentAssistUnsubscribed = AgentAssistUnsubscribed;
/**
 * Class for AgentAssist Error
*/
class AgentAssistError extends AgentAssistMessageResponse {
    /**
     * Create instance of AgentAssistError
     * @example
     * const AgentAssistError = new AgentAssistError();
     */
    constructor(respHeader, respBody) {
        super(agent_assist_command_1.AgentAssistCommand.error, respHeader);
        this.body = {
            topic: respBody.responseText,
        };
    }
}
exports.AgentAssistError = AgentAssistError;
/**
 * Class for AutoSummaryData
*/
class AgentAssistAutoSummaryMessage extends AgentAssistMessageResponse {
    /**
       * Create instance of AutoSummaryData
       * @example
       * const autoSummaryData = new AutoSummaryData();
       */
    constructor(respHeader, respBody) {
        super(agent_assist_command_1.AgentAssistCommand.message, respHeader);
        this.body = { autoSummary: {
                schemaVersion: respBody.schemaVersion,
                messageType: respBody.messageType,
                messageError: respBody.messageError,
                sourceTime: respBody.sourceTime,
                agentUUID: respBody.agentUUID,
                agentId: respBody.agentId,
                tenantId: respBody.tenantId,
                tenantBusNo: respBody.tenantBusNo,
                masterId: respBody.masterId,
                sessionId: respBody.sessionId,
                agentAssistParams: respBody.agentAssistParams,
                languageCode: respBody.languageCode,
                text: respBody.text,
            },
        };
    }
}
exports.AgentAssistAutoSummaryMessage = AgentAssistAutoSummaryMessage;
//# sourceMappingURL=auto-summary-response.js.map