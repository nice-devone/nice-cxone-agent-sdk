import { Subject } from 'rxjs';
import { AgentAssistErrorResponse, AgentAssistBaseResponse, VoiceTranscriptionResponse } from '@nice-devone/common-sdk';
import { AgentAssistInput, AgentAssistNotificationService } from '../agent-assist/agent-assist-notification-service';
export declare const HEARTBEAT_INTERVAL = 20000;
export declare const AGENTIC_HEARTBEAT_INTERVAL = 20000;
export declare const HEARTBEAT_MISS_THRESHOLD = 3;
export declare const AGENTIC_RECONNECT_INTERVAL_MS = 2000;
export declare const AGENTIC_MAX_RECONNECT_ATTEMPTS = 10;
export declare const AGENTIC_URL_CACHE_TTL_MS: number;
declare type MessageSource = 'primary' | 'agentic';
/**
 *  web socket class for agent copilot
 */
export declare class CopilotNotificationClient extends AgentAssistNotificationService {
    private agentId;
    private webSocketUri;
    private subscriptionTopics;
    private lastHeartbeatReceivedAt;
    private heartbeatState;
    private agenticHeartbeatState;
    private agenticWssWorker;
    private cachedAgenticUrl?;
    private cachedAgenticUrlExpiresAt;
    private agenticReconnectInFlight;
    onMessageNotification: Subject<AgentAssistBaseResponse>;
    onVoiceTranscriptionMessage: Subject<VoiceTranscriptionResponse>;
    onVoiceTranscriptionError: Subject<AgentAssistErrorResponse>;
    /**
     * used to connect to the socket.
     * @example -  connect('ws://localhost:8080', 1011, 123_subscription);
     * @param websocketServerUri - websocketServer uri
     */
    connect(websocketServerUri: string, agentId: string, agentCopilotInput?: AgentAssistInput): boolean;
    /**
     * Adds default subscriptions for agent copilot, and any additional passed subscriptions.
     * When the AGENTIC_WEBSOCKET toggle is ON the agenticWssWorker owns the copilot topics,
     * so they are skipped on the old worker.
     * @example -  addSubscriptionTopics([]);
     */
    private addSubscriptionTopics;
    /**
     * Subscribe to events.
     * @example -  subscribe('topic');
     * @param topic - topic to subscribe
     */
    subscribe(agentCopilotInput: AgentAssistInput): boolean;
    /**
     * Unsubscribe from a specific topic.
     * @example -  unsubscribe('topic');
     * @param subscriptionTopics - subscriptionTopics to unsubscribe
     */
    unsubscribe(topic: string): boolean;
    /**
     * on websocket close.
     * @example -  onClosed();
     */
    onClosed(): boolean;
    /**
     * Handles a decoded WS frame. `source` identifies which socket the frame
     * arrived on so heartbeat state mutations stay scoped to that socket.
     * @param message - raw decoded message
     * @param source - 'primary' (default) or 'agentic'
     * ```
     * @example
     * onMessage(message, 'primary');
     * ```
     */
    protected onMessage(message: unknown, source?: MessageSource): void;
    /**
     * method to parse the response
     * ```
     * @example
     * const AgentAssistMessageResponse = new AgentAssistMessageResponse();
     * ```
     */
    protected parse(response: any): AgentAssistBaseResponse;
    /**
     * used to broadcast the acp messages to other tabs.
     * @example -  broadcastCopilotNotifications();
     * @param message - message to broadcast
     */
    broadcastCopilotNotifications(message: any): void;
    /**
     * Resolves the agentic WebSocket base URL using a two-tier cache:
     * 1. In-memory (fastest; no I/O)
     * 2. localStorage with TTL envelope
     * 3. REST round-trip (last resort)
     * Returns `null` if the REST call fails — caller must handle gracefully.
     */
    private getAgenticWebSocketUrl;
    /**
     * Initialises or re-connects the agentic WebSocket worker.
     * Spawns the underlying Web Worker exactly once; subsequent calls reuse it
     * and only post a fresh `connect` frame with a freshly-read access token.
     * @example - initAgenticWorker()
     */
    private initAgenticWorker;
    /**
     * Routes messages posted by the agentic worker to the appropriate handler.
     * Reads `this.agentId` dynamically so an agent change without page reload
     * does not leave the worker subscribing to stale topics.
     */
    private onAgenticWorkerMessage;
    /**
     * Schedules a reconnect through the worker's exponential-backoff path.
     * Guards against overlapping schedules. Caller should have already
     * stopped (or be prepared to stop) the heartbeat monitor.
     */
    private scheduleAgenticReconnect;
    /**
     * Sends SUBSCRIBE frames for the two agentic copilot topics to the agentic worker.
     * Called on the worker's 'open' event. Each frame carries the current
     * access token as `headers.sessionToken` — the agentic gateway requires it
     * for re-authorisation on every command, not just the initial handshake.
     * Also pushes the fresh token into the worker so subsequent HEARTBEAT
     * frames generated inside the worker pick up the latest credential.
     * @param agentId - the agent's identifier used to build the topic names
     * @example - subscribeAgenticTopics('12345')
     */
    private subscribeAgenticTopics;
    /**
     * Tears down the primary WSS worker only. The agentic worker has an
     * independent lifecycle and is intentionally kept alive across transient
     * primary-socket errors. Call `terminateAgenticWorker()` explicitly on
     * logout, agent change, or toggle-off to release agentic resources.
     * @example - terminateWebSocketWorker()
     */
    terminateWebSocketWorker(): void;
    /**
     * Tears down the agentic worker, heartbeat monitor, and URL cache.
     * Intended for end-of-session flows (logout, agent change). Not invoked
     * by transient error paths.
     * @example - terminateAgenticWorker()
     */
    terminateAgenticWorker(): void;
    /**
     * Starts a heartbeat monitor for the given state object.
     * After HEARTBEAT_MISS_THRESHOLD consecutive missed acknowledgments, stops the monitor
     * and calls onThreshold to trigger the appropriate reconnect action.
     * @param state - mutable heartbeat state (timer, ackReceived, missCount)
     * @param interval - polling interval in milliseconds
     * @param label - log label used in warn/info messages
     * @param onThreshold - callback invoked when miss threshold is reached
     * @example - startHeartbeatMonitorFor(this.heartbeatState, HEARTBEAT_INTERVAL, 'Heartbeat', this.onClosed())
     */
    private startHeartbeatMonitorFor;
    /**
     * Clears the heartbeat monitor interval for the given state and resets its fields.
     * @param state - mutable heartbeat state to clear
     * @example - stopHeartbeatMonitorFor(this.heartbeatState)
     */
    private stopHeartbeatMonitorFor;
    /**
     * Marks a HEARTBEAT_ACK as received for the given state and resets the miss counter.
     * @param state - mutable heartbeat state to update
     * @param label - log label used in the info message
     * @example - handleHeartbeatAckFor(this.heartbeatState, 'Heartbeat')
     */
    private handleHeartbeatAckFor;
    /**
     * Returns whether the heartbeat monitor logic is enabled for agent copilot websocket reconnects.
     * @example - isHeartbeatMonitorEnabled()
     */
    private isHeartbeatMonitorEnabled;
    /**
     * Returns whether the agentic WebSocket feature toggle is enabled.
     * @example - isAgenticWsEnabled()
     */
    private isAgenticWsEnabled;
    /**
     * Callback method when a connection is open and ready to send and receive data
     * @example - onOpen()
     */
    protected onOpen(): void;
    /**
     * Callback method triggered when the WebSocket connection needs to be re-established.
     * Resets the connection ID and reconnects using the stored WebSocket URI and provider ID.
     * @example - onReconnect()
     */
    protected onReconnect(): void;
}
export {};
