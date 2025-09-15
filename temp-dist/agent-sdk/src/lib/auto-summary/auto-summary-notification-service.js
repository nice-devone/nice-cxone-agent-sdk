import { AgentAssistNotificationService } from '../agent-assist/agent-assist-notification-service';
import { Subject } from 'rxjs';
import { LoadWorker } from '@nice-devone/core-sdk';
import { AgentAssistSubscribe, AgentAssistCommand, AgentAssistMessageResponse, AgentAssistUnsubscribe, CXoneLeaderElector, MessageBus, MessageType, VoiceBioHubResponse, } from '@nice-devone/common-sdk';
import { CXoneAuth } from '@nice-devone/auth-sdk';
/***** TO DO AW-23445, *****
 * We will be using this class for voice auto summary as well and will be removing the AutoSummaryService class in future releases.
 */
/**
 *  web socket base class for Auto summary digital and voice.
 */
export class AutoSummaryNotificationService extends AgentAssistNotificationService {
    //TO DO => AW-23445,Use the below prop to re subscribe if voice auto summary subscribed when reconnecting. Re subscribe only applicable for voice.
    //set this to undefined after message received for voice.     
    //public voiceAgentAssistInput: AgentAssistInput;
    /**
       * Create instance of AutoSummaryNotificationService
       * @example
       * const AutoSummaryNotificationService = new AutoSummaryNotificationService();
       */
    constructor() {
        super();
        this.topic = '';
        this.onAutoSummaryMessageNotification = new Subject();
        this.isConnectionCreated = false;
        this.initLogger('Auto-Summary');
    }
    /**
       * used to connect to the socket.
       * @example -  connect('ws://localhost:8080');
       * @param websocketServerUri - websocketServer uri
       */
    connect(websocketServerUri) {
        this.initWebSocketWorker('ws-worker-acp');
        super.connect(websocketServerUri, 'Auto-Summary');
        if (this.wssWorker) {
            this.wssWorker.onmessage = (response) => {
                this.checkWSEvent(response === null || response === void 0 ? void 0 : response.data);
            };
            this.wssWorker.onerror = (error) => {
                this.logger.error('wssWorker-subscribe', 'Error occured on wssWorker', error);
            };
        }
        this.isConnectionCreated = true;
        return true;
    }
    /**
       * Subscribe to events.
       * @example -  subscribe('topic');
       * @param topic - topic to subscribe
       */
    subscribe(autoSummaryInput) {
        this.agentAssistInput = autoSummaryInput;
        this.topic = autoSummaryInput.subscriptions[0].toString();
        this.subscriptions = autoSummaryInput.subscriptions;
        const accessToken = CXoneAuth.instance.getAuthToken().accessToken;
        const req = new AgentAssistSubscribe(accessToken, this.topic);
        this.sendMessage(req, this.wssWorker);
        return true;
    }
    /**
      * on websocket close.
      * @example -  onClosed();
      */
    onClosed() {
        const postResponseMessage = {
            command: AgentAssistCommand.closed,
            headers: {
                connectionId: '',
            },
            body: 'websocket connection is closed. Trying to reconnect.',
        };
        this.logger.info('onClosed', 'Auto summary web socket closed');
        this.onAutoSummaryMessageNotification.next(postResponseMessage);
        super.onClosed();
    }
    /**
       * callback for when message received
       * @example -  onMessage(msg);
       * @param message - Response Message
       */
    onMessage(responseMessage) {
        var _a, _b, _c, _d;
        let msgResponse;
        let type;
        if ((_b = (_a = responseMessage === null || responseMessage === void 0 ? void 0 : responseMessage.body) === null || _a === void 0 ? void 0 : _a.topic) === null || _b === void 0 ? void 0 : _b.includes('voicebio')) {
            msgResponse = VoiceBioHubResponse.parse(responseMessage);
            type = MessageType.VOICE_BIO_HUB_RESPONSE;
        }
        else {
            msgResponse = AgentAssistMessageResponse.parse(responseMessage);
            type = MessageType.AUTO_SUMMARY_RESPONSE;
        }
        this.logger.info('onMessage', msgResponse.command + ' - ' + ((_c = msgResponse.body) === null || _c === void 0 ? void 0 : _c.toString()));
        switch (msgResponse.command) {
            case AgentAssistCommand.connected:
            case AgentAssistCommand.message:
            case AgentAssistCommand.subscribed:
                {
                    if (msgResponse.command === AgentAssistCommand.connected) {
                        this.connectionId = ((_d = msgResponse === null || msgResponse === void 0 ? void 0 : msgResponse.headers) === null || _d === void 0 ? void 0 : _d.connectionId) || '';
                    }
                    const postResponseMessage = {
                        type: type,
                        data: responseMessage,
                    };
                    if (CXoneLeaderElector.instance.isLeader) {
                        this.onAutoSummaryMessageNotification.next(msgResponse);
                        MessageBus.instance.postResponse(postResponseMessage);
                    }
                }
                break;
            default:
                break;
        }
    }
    /**
       * used to broadcast the message to other tabs.
       * @example -  broadcastAutoSummary(responseMessage);
       * @param message - message to broadcast
       */
    broadcastAutoSummary(message) {
        const msgResponse = AgentAssistMessageResponse.parse(message);
        switch (msgResponse.command) {
            case AgentAssistCommand.message:
            case AgentAssistCommand.subscribed:
            case AgentAssistCommand.connected:
                this.onAutoSummaryMessageNotification.next(msgResponse);
                break;
            default:
                break;
        }
    }
    /**
       * Callback method when a connection is open and ready to send and receive data
       * @example - onOpen()
       */
    onOpen() {
        const postResponseMessage = {
            command: AgentAssistCommand.closed,
            headers: {
                connectionId: '',
            },
            body: 'WebSocket connection is ready to send and receive data',
        };
        this.onAutoSummaryMessageNotification.next(postResponseMessage);
        this.logger.info('onOpen', 'Auto summary web socket opened successfully');
    }
    /**
       * Used to initializing the web socket worker and will return the method inside the worker
       * @example - initWebSocketWorker('ws-worker')
       */
    initWebSocketWorker(providerId) {
        // Overriding base class method to create Auto summary web socket worker.          
        const loader = new LoadWorker();
        this.wssWorker = loader.getWorker(providerId, 'ccf-auto-summary-load-ws-worker');
    }
    /**
       * used to unsubscribe and disconnect to socket events.
       * @example -  unsubscribeContact(subscriptionId);
       */
    unsubscribeContact(subscriptionId) {
        var _a;
        const cx1Token = (_a = this.auth) === null || _a === void 0 ? void 0 : _a.getAuthToken().accessToken;
        const req = new AgentAssistUnsubscribe(cx1Token, subscriptionId);
        this.sendMessage(req, this.wssWorker);
    }
    /**
       * Use to terminate the web socket worker
       * @example
       * ```
       * this.terminateWebSocketWorker();
       * ```
       */
    terminateWebSocketWorker() {
        super.terminateWebSocketWorker();
        this.isConnectionCreated = false;
    }
}
//# sourceMappingURL=auto-summary-notification-service.js.map