import { AgentAssistBaseResponse } from './agent-assist-base-response';
/**
 * Class for AgentAssistUnSubscribedResponse
 */
export declare class AgentAssistUnSubscribedResponse extends AgentAssistBaseResponse {
    body: {
        topic: string;
    };
    /**
       * Create instance of AgentAssistUnSubscribedResponse
       * ```
       * @example
       * const AgentAssistUnSubscribedResponse = new AgentAssistUnSubscribedResponse();
       * ```
       */
    constructor(respHeader: any, respBody: any);
}
