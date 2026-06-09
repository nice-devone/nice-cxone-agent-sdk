import { AgentAssistBaseResponse } from './agent-assist-base-response';
/**
 * Websocket message header interface
 */
export interface WebSocketHeaderMessage {
    sessionToken?: string;
    connectionId?: string;
}
/**
 * Websocket message interface
 */
export interface IWebSocketMessage {
    command: string;
    headers: WebSocketHeaderMessage;
    body?: any;
    timestamp?: Date;
}
/**
 * Websocket message class
 * ```
 * @example
 * this.WebSocketMessage(data);
 * ```
 */
export declare class WebSocketMessage implements IWebSocketMessage {
    command: string;
    headers: WebSocketHeaderMessage;
    body?: any;
    timestamp?: Date;
    id: string;
    /**
     * constructor for WebSocketMessage
     * @example - const wsMessage = WebSocketMessage(data);
     */
    constructor(data: IWebSocketMessage);
}
/**
 * Agent assist websocket message response
 * ```
 * @example
 * this.AgentAssistWSMessageResponse(respHeader, respBody);
 * ```
 */
export declare class AgentAssistWSMessageResponse extends AgentAssistBaseResponse {
    body: WebSocketMessage;
    /**
     * constructor for AgentAssistWSMessageResponse
     * @example -
     * ```
     * const wsMsgResp = AgentAssistWSMessageResponse(respHeader, respBody)
     * ```
     */
    constructor(respHeader: any, respBody: any);
}
