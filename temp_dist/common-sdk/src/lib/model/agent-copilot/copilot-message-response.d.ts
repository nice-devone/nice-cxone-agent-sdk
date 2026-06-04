import { AgentAssistBaseResponse } from '../agent-assist/agent-assist-base-response';
import { CopilotMessageData } from './copilot-interfaces/index';
/**
 * Class for CopilotMessageResponse
 */
export declare class CopilotMessageResponse extends AgentAssistBaseResponse {
    body: CopilotMessageData;
    /**
     * Create instance of CopilotMessageResponse
     * ```
     * @example
     * const CopilotMessageResponse = new CopilotMessageResponse();
     * ```
     */
    constructor(respHeader: any, respBody: any);
    /**
     *
     * @param element - Single element payload
     * @returns Element Object
     * @example CopilotMessageResponse.formatCopilotElement(element)
     */
    private static formatCopilotElement;
    /**
     *
     * @param element - Single element payload
     * @returns Element Object
     * @example CopilotMessageResponse.parseCopilotElement(element)
     */
    private static parseCopilotElement;
}
