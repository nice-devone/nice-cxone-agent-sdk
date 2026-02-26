import { AgentAssistEvent, OmiliaEnum } from '@nice-devone/common-sdk';
import { ACDSessionManager } from '@nice-devone/core-sdk';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCustomWorkspaces, getIsOmiliaHandshakeDone, globalActions } from '../../global.app.slice';
/**
 * Custom hook to handle messaging between the custom workspace iframe and the agent application
 * @param isIframesPreloaded - Whether the iframes are preloaded
 * @example -
 * ```
 * useOmiliaIFrameMessageHandler(true);
 * ```
 */
export const useOmiliaIFrameMessageHandler = (isIframesPreloaded) => {
    const dispatch = useDispatch();
    const customWorkspaces = useSelector(getCustomWorkspaces);
    const isOmiliaHandshakeDone = useSelector(getIsOmiliaHandshakeDone);
    const getNextSubscriptionRef = useRef(null);
    useEffect(() => {
        var _a, _b;
        if (!isIframesPreloaded) {
            return;
        }
        const omiliaWorkspace = customWorkspaces === null || customWorkspaces === void 0 ? void 0 : customWorkspaces.find(ws => { var _a; return ((_a = ws === null || ws === void 0 ? void 0 : ws.persistentPanelLabel) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === OmiliaEnum.OMILIA_LABEL; });
        if (!omiliaWorkspace) {
            return;
        }
        const iframe = document.getElementById((_a = omiliaWorkspace.persistentPanelId) === null || _a === void 0 ? void 0 : _a.toString());
        if (!iframe) {
            return;
        }
        const targetOrigin = (_b = new URL(iframe.src)) === null || _b === void 0 ? void 0 : _b.origin;
        if (!targetOrigin) {
            return;
        }
        /**
         * Omilia iFrame messaging handler
         * @example -
         * ```
         * omiliaIFrameMessagingHandler(event);
         * ```
         */
        const omiliaIFrameMessagingHandler = (event) => {
            var _a, _b, _c;
            // Validate message source
            if (!iframe.contentWindow || event.source !== iframe.contentWindow) {
                return;
            }
            // Validate issuer and messageType
            const issuer = (_b = (_a = event.data) === null || _a === void 0 ? void 0 : _a.issuer) === null || _b === void 0 ? void 0 : _b.toLowerCase();
            const messageType = (_c = event.data) === null || _c === void 0 ? void 0 : _c.messageType;
            if ((issuer === OmiliaEnum.AGENT_ASSIST) &&
                messageType === 'RegisterForClientEvents') {
                // Mark handshake as done as we received a confirmation msg from wrapper side
                dispatch(globalActions.setIsOmiliaHandshakeDone(true));
                // Handle RegisterForClientEvents logic here
                const registrationMessage = {
                    issuer: 'CXoneAgent',
                    messageType: 'ClientEventsRegistered',
                    status: 'success',
                };
                if (iframe.contentWindow) {
                    iframe.contentWindow.postMessage(registrationMessage, targetOrigin);
                }
                // Subscribe to get next events
                if (getNextSubscriptionRef.current) {
                    getNextSubscriptionRef.current.unsubscribe();
                }
                // Subscribe to get next events
                getNextSubscriptionRef.current = ACDSessionManager.instance.agentAssistOmiliaGetNextSubject.subscribe((getNextEvent) => {
                    var _a;
                    if (getNextEvent) {
                        const agentAssistPayload = {
                            events: [
                                {
                                    Type: AgentAssistEvent.TYPE,
                                    AgentAssistAppConfigJson: (_a = getNextEvent.allParams) === null || _a === void 0 ? void 0 : _a.AgentAssistAppConfigJson,
                                }
                            ],
                        };
                        if (iframe && iframe.contentWindow) {
                            iframe.contentWindow.postMessage(agentAssistPayload, targetOrigin);
                        }
                    }
                });
                // close the omilia iframe on call disconnect
                ACDSessionManager.instance.closeOmiliaIFrameSubject.subscribe((_callContactEvent) => {
                    const callDisconnectPayload = {
                        events: [
                            {
                                Type: 'CallContactEvent',
                                Status: 'Disconnected',
                            }
                        ],
                    };
                    if (iframe && iframe.contentWindow) {
                        iframe.contentWindow.postMessage(callDisconnectPayload, targetOrigin);
                    }
                });
            }
        };
        window.addEventListener('message', omiliaIFrameMessagingHandler);
        if (!isOmiliaHandshakeDone) {
            // send handshake message to iframe
            const handshakeMessage = {
                issuer: 'CXoneAgent',
                messageType: 'handshake',
            };
            if (iframe && iframe.contentWindow) {
                iframe.contentWindow.postMessage(handshakeMessage, targetOrigin);
            }
        }
        return () => {
            window.removeEventListener('message', omiliaIFrameMessagingHandler);
            // Cleanup subscriptions
            if (getNextSubscriptionRef.current) {
                getNextSubscriptionRef.current.unsubscribe();
                getNextSubscriptionRef.current = null;
            }
        };
    }, [isIframesPreloaded]);
};
//# sourceMappingURL=useOmiliaIFrameMessageHandler.js.map