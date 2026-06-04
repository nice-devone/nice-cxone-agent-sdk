import { AgentAssistBaseResponse } from './agent-assist-base-response';
/**
 * Class for AgentAssistSubscribedResponse
 */
export declare class AgentAssistSubscribedResponse extends AgentAssistBaseResponse {
    body: {
        topic: string;
    };
    /**
       * Create instance of AgentAssistSubscribedResponse
       * ```
       * @example
       * const AgentAssistSubscribedResponse = new AgentAssistSubscribedResponse();
       * ```
       */
    constructor(respHeader: any, respBody: any);
}
