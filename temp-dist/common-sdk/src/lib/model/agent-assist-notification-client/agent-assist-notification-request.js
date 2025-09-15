"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgentAssistUnsubscribe = exports.AgentAssistSubscribe = exports.AgentAssistHeartbeat = exports.AgentAssistConnect = exports.AgentAssistMessageRequest = void 0;
const agent_assist_command_1 = require("../../enum/agent-assist-command");
/**
 * Class for AgentAssistMessageRequest
 */
class AgentAssistMessageRequest {
    /**
       * Create instance of AgentAssistMessageRequest
       * @example
       * const agentAssistMessageRequest = new AgentAssistMessageRequest();
       */
    constructor(cmd) {
        this.command = cmd;
        this.headers = {
            sessionToken: '',
        };
    }
}
exports.AgentAssistMessageRequest = AgentAssistMessageRequest;
/**
 * Class for AgentAssistConnect
*/
class AgentAssistConnect extends AgentAssistMessageRequest {
    /**
       * Create instance of AgentAssistMessageRequest
       * @example
       * const agentAssistMessageRequest = new AgentAssistMessageRequest();
       */
    constructor(accessToken) {
        super(agent_assist_command_1.AgentAssistCommand.connect);
        this.headers.sessionToken = accessToken;
        this.body = {};
    }
}
exports.AgentAssistConnect = AgentAssistConnect;
/**
 * Class for AgentAssistHeartbeat
*/
class AgentAssistHeartbeat extends AgentAssistMessageRequest {
    /**
       * Create instance of AgentAssistMessageRequest
       * @example - const agentAssistMessageRequest = new AgentAssistMessageRequest();
       */
    constructor(accessToken) {
        super(agent_assist_command_1.AgentAssistCommand.heartbeat);
        this.headers.sessionToken = accessToken;
        this.body = {};
    }
}
exports.AgentAssistHeartbeat = AgentAssistHeartbeat;
/**
 * Class for AgentAssistSubscribe
*/
class AgentAssistSubscribe extends AgentAssistMessageRequest {
    /**
       * Create instance of AgentAssistMessageRequest
       * @example
       * const agentAssistMessageRequest = new AgentAssistMessageRequest();
       */
    constructor(accessToken, contactId) {
        super(agent_assist_command_1.AgentAssistCommand.subscribe);
        this.headers.sessionToken = accessToken;
        this.body = {
            topic: contactId,
        };
    }
}
exports.AgentAssistSubscribe = AgentAssistSubscribe;
/**
 * Class for AgentAssistUnSubscribe
*/
class AgentAssistUnsubscribe extends AgentAssistMessageRequest {
    /**
      * Create instance of AgentAssistMessageRequest
      * @example
      * const agentAssistMessageRequest = new AgentAssistMessageRequest();
      */
    constructor(accessToken, contactId) {
        super(agent_assist_command_1.AgentAssistCommand.unsubscribe);
        this.headers.sessionToken = accessToken;
        this.body = {
            topic: contactId,
        };
    }
}
exports.AgentAssistUnsubscribe = AgentAssistUnsubscribe;
//# sourceMappingURL=agent-assist-notification-request.js.map