/**
 * Class for AgentAssistMessageRequest
 */
export declare abstract class AgentAssistMessageRequest {
    command: string;
    headers: {
        sessionToken: string;
    };
    body: any;
    /**
       * Create instance of AgentAssistMessageRequest
       * @example
       * const agentAssistMessageRequest = new AgentAssistMessageRequest();
       */
    constructor(cmd: string);
}
/**
 * Class for AgentAssistConnect
*/
export declare class AgentAssistConnect extends AgentAssistMessageRequest {
    /**
       * Create instance of AgentAssistMessageRequest
       * @example
       * const agentAssistMessageRequest = new AgentAssistMessageRequest();
       */
    constructor(accessToken: string);
}
/**
 * Class for AgentAssistHeartbeat
*/
export declare class AgentAssistHeartbeat extends AgentAssistMessageRequest {
    /**
       * Create instance of AgentAssistMessageRequest
       * @example - const agentAssistMessageRequest = new AgentAssistMessageRequest();
       */
    constructor(accessToken: string);
}
/**
 * Class for AgentAssistSubscribe
*/
export declare class AgentAssistSubscribe extends AgentAssistMessageRequest {
    /**
       * Create instance of AgentAssistMessageRequest
       * @example
       * const agentAssistMessageRequest = new AgentAssistMessageRequest();
       */
    constructor(accessToken: string, contactId: string);
}
/**
 * Class for AgentAssistUnSubscribe
*/
export declare class AgentAssistUnsubscribe extends AgentAssistMessageRequest {
    /**
      * Create instance of AgentAssistMessageRequest
      * @example
      * const agentAssistMessageRequest = new AgentAssistMessageRequest();
      */
    constructor(accessToken: string, contactId: string);
}
