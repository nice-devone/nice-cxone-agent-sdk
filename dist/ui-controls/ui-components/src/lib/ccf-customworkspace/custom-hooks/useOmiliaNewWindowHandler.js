import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { AgentAssistEvent, OmiliaEnum } from '@nice-devone/common-sdk';
import { ACDSessionManager } from '@nice-devone/core-sdk';
import { getCustomWorkspaces } from '../../global.app.slice';
/**
 * Custom hook to handle Omilia handshake, get next, and call disconnect logic
 * for a popped-out window
 * @param targetWindow - The window object where Omilia is opened (can be current window or new window)
 * @param isWindowPoppedOut - Whether the window is popped out
 * @example -
 * ```
 * useOmiliaNewWindowHandler(targetWindow, isWindowPoppedOut);
 * ```
 */
export const useOmiliaNewWindowHandler = (targetWindow, isWindowPoppedOut) => {
    const customWorkspaces = useSelector(getCustomWorkspaces);
    const getNextSubscriptionRef = useRef(null);
    useEffect(() => {
        var _a;
        if (!targetWindow) {
            return;
        }
        const omiliaWorkspace = customWorkspaces.find((ws) => { var _a; return ((_a = ws === null || ws === void 0 ? void 0 : ws.persistentPanelLabel) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === OmiliaEnum.OMILIA_LABEL; });
        if (!omiliaWorkspace) {
            return;
        }
        const targetOrigin = (_a = new URL(omiliaWorkspace.persistentPanelURI)) === null || _a === void 0 ? void 0 : _a.origin;
        if (!targetOrigin) {
            return;
        }
        /**
         * Handles messages from the popped-out Omilia window
         * @example -
         * ```
         * omiliaWindowMessageHandler(event);
         * ```
         */
        const omiliaWindowMessagingHandler = (event) => {
            var _a, _b, _c;
            // Validate the event is from the popped-out window
            if (event.source !== targetWindow) {
                return;
            }
            const issuer = (_b = (_a = event.data) === null || _a === void 0 ? void 0 : _a.issuer) === null || _b === void 0 ? void 0 : _b.toLowerCase();
            const messageType = (_c = event.data) === null || _c === void 0 ? void 0 : _c.messageType;
            // Handle handshake registration
            if (issuer === OmiliaEnum.AGENT_ASSIST && messageType === 'RegisterForClientEvents') {
                // Send registration confirmation
                const registrationMessage = {
                    issuer: 'CXoneAgent',
                    messageType: 'ClientEventsRegistered',
                    status: 'success',
                };
                targetWindow.postMessage(registrationMessage, targetOrigin);
                // Subscribe to get next events
                if (getNextSubscriptionRef.current) {
                    getNextSubscriptionRef.current.unsubscribe();
                }
                getNextSubscriptionRef.current = ACDSessionManager.instance.agentAssistOmiliaGetNextSubject.subscribe((getNextEvent) => {
                    var _a;
                    if (getNextEvent && targetWindow && !targetWindow.closed) {
                        const agentAssistPayload = {
                            events: [
                                {
                                    Type: AgentAssistEvent.TYPE,
                                    AgentAssistAppConfigJson: (_a = getNextEvent.allParams) === null || _a === void 0 ? void 0 : _a.AgentAssistAppConfigJson,
                                }
                            ],
                        };
                        targetWindow.postMessage(agentAssistPayload, targetOrigin);
                    }
                });
                ACDSessionManager.instance.closeOmiliaIFrameSubject.subscribe((_callContactEvent) => {
                    if (targetWindow && !targetWindow.closed) {
                        const callDisconnectPayload = {
                            events: [
                                {
                                    Type: 'CallContactEvent',
                                    Status: 'Disconnected',
                                }
                            ],
                        };
                        targetWindow.postMessage(callDisconnectPayload, targetOrigin);
                    }
                });
            }
        };
        window.addEventListener('message', omiliaWindowMessagingHandler);
        // send handshake message to popped-out window
        // send this handshake message 1 second after the window has loaded
        const handshakeTimeoutId = setTimeout(() => {
            if (targetWindow) {
                const handshakeMessage = {
                    issuer: 'CXoneAgent',
                    messageType: 'handshake',
                };
                targetWindow.postMessage(handshakeMessage, targetOrigin);
            }
        }, 1000);
        return () => {
            window.removeEventListener('message', omiliaWindowMessagingHandler);
            // Clear handshake timeout
            clearTimeout(handshakeTimeoutId);
            // Cleanup subscriptions
            if (getNextSubscriptionRef.current) {
                getNextSubscriptionRef.current.unsubscribe();
                getNextSubscriptionRef.current = null;
            }
        };
    }, [targetWindow, isWindowPoppedOut, customWorkspaces]);
};
//# sourceMappingURL=useOmiliaNewWindowHandler.js.map