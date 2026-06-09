import { AgentAssistBaseResponse } from './agent-assist-base-response';
/**
 * Class for AgentAssistConnectedResponse
 */
export declare class AgentAssistConnectedResponse extends AgentAssistBaseResponse {
    body: Record<string, never>;
    /**
       * Create instance of AgentAssistConnectedResponse
       * ```
       * @example
       * const AgentAssistConnectedResponse = new AgentAssistConnectedResponse();
       * ```
       */
    constructor(respHeader: {
        [key: string]: string;
    });
}
