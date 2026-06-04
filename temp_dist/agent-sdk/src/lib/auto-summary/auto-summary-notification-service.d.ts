import { AgentAssistInput, AgentAssistNotificationService } from '../agent-assist/agent-assist-notification-service';
import { Subject } from 'rxjs';
import { AgentAssistMessageResponse, JSONValue } from '@nice-devone/common-sdk';
/***** TO DO AW-23445, *****
 * We will be using this class for voice auto summary as well and will be removing the AutoSummaryService class in future releases.
 */
/**
 *  web socket base class for Auto summary digital and voice.
 */
export declare class AutoSummaryNotificationService extends AgentAssistNotificationService {
    protected topic: string;
    onAutoSummaryMessageNotification: Subject<AgentAssistMessageResponse>;
    isConnectionCreated: boolean;
    /**
       * Create instance of AutoSummaryNotificationService
       * @example
       * const AutoSummaryNotificationService = new AutoSummaryNotificationService();
       */
    constructor();
    /**
       * used to connect to the socket.
       * @example -  connect('ws://localhost:8080');
       * @param websocketServerUri - websocketServer uri
       */
    connect(websocketServerUri: string): boolean;
    /**
       * Subscribe to events.
       * @example -  subscribe('topic');
       * @param topic - topic to subscribe
       */
    subscribe(autoSummaryInput: AgentAssistInput): boolean;
    /**
      * on websocket close.
      * @example -  onClosed();
      */
    protected onClosed(): void;
    /**
       * callback for when message received
       * @example -  onMessage(msg);
       * @param message - Response Message
       */
    protected onMessage(responseMessage: any): void;
    /**
       * used to broadcast the message to other tabs.
       * @example -  broadcastAutoSummary(responseMessage);
       * @param message - message to broadcast
       */
    broadcastAutoSummary(message: JSONValue | undefined): void;
    /**
       * Callback method when a connection is open and ready to send and receive data
       * @example - onOpen()
       */
    protected onOpen(): void;
    /**
       * Used to initializing the web socket worker and will return the method inside the worker
       * @example - initWebSocketWorker('ws-worker')
       */
    protected initWebSocketWorker(providerId: string): void;
    /**
       * used to unsubscribe and disconnect to socket events.
       * @example -  unsubscribeContact(subscriptionId);
       */
    unsubscribeContact(subscriptionId: string): void;
    /**
       * Use to terminate the web socket worker
       * @example
       * ```
       * this.terminateWebSocketWorker();
       * ```
       */
    terminateWebSocketWorker(): void;
}
