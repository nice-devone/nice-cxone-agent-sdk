import { AgentAssistBaseResponse } from './agent-assist-base-response';
/**
 * Class for AgentAssistErrorResponse
 */
export declare class AgentAssistErrorResponse extends AgentAssistBaseResponse {
    body: {
        responseCode: number;
        responseText: string;
    };
    /**
       * Create instance of AgentAssistErrorResponse
       * ```
       * @example
       * const AgentAssistErrorResponse = new AgentAssistErrorResponse();
       * ```
       */
    constructor(respHeader: any, respBody: any);
}
