/**
 * Class for AgentAssistBaseResponse
 */
export declare abstract class AgentAssistBaseResponse {
    command: string;
    headers: {
        connectionId: string;
    };
    body: any;
    /**
     * Create instance of AgentAssistBaseResponse
     * ```
     * @example
     * const AgentAssistBaseResponse = new AgentAssistBaseResponse();
     * ```
     */
    constructor(cmd: string, respHeader: {
        [key: string]: string;
    });
}
