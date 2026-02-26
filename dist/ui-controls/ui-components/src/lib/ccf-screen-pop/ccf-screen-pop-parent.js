import { useMediaQuery, useTheme } from '@mui/material';
import { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getNonIncomingActiveContactInSelectedInteraction, voiceContactsIds, voiceMailContactsIds } from '../ccf-assignment-panel/ccf-assignment-panel.slice';
import { ccfScreenPopActions, getAllScreenPop, getPageOpenUri, getPanelPopOutSetting } from './ccf-screen-pop.slice';
import { GetNextEventType, StorageKeys, VoiceMailContactEventStatus } from '@nice-devone/core-sdk';
import { nanoid } from 'nanoid';
import { CXoneLeaderElector, RunAppActionType, VoiceContactStatus, WorkItemContactStatus } from '@nice-devone/common-sdk';
import { AgentAssistProvider, AgentAssistTitle, CXoneClient, PageAction } from '@nice-devone/agent-sdk';
import { globalActions } from '../global.app.slice';
import { currentUserAgentId } from '../ccf-agent-state/ccf-agent-state.slice';
import { getAgentSessionInfo } from '../ccf-acd-session/ccf-acd-session.slice';
import { CXoneAcdClient } from '@nice-devone/acd-sdk';
import { CXoneDigitalClient } from '@nice-devone/digital-sdk';
import { CXoneAuth } from '@nice-devone/auth-sdk';
/**
* Function to get unique ID for browser tab
* @returns returns the unique id in string format.
* @example -getUniqueId()
*/
export const getUniqueId = () => {
    return nanoid();
};
/**
* CcfScreenPopParent - used to keep track of the external windows
* @param props - None
* @example <CcfScreenPopParent />
*/
export const CcfScreenPopParent = () => {
    const screenPops = useSelector(getAllScreenPop);
    const dispatch = useDispatch();
    const windowsRefs = useRef([]);
    const theme = useTheme();
    const isSmView = useMediaQuery(theme.breakpoints.down('xl'));
    const nonIncomingActiveContactInSelectedInteraction = useSelector(getNonIncomingActiveContactInSelectedInteraction);
    const voiceContactIds = useSelector(voiceContactsIds);
    const voiceMailContactIds = useSelector(voiceMailContactsIds);
    const acdContactsIds = voiceContactIds.concat(voiceMailContactIds);
    const currentAgentId = useSelector(currentUserAgentId);
    const agentSessionInfo = useSelector(getAgentSessionInfo);
    const NAIA = 'naia';
    const AGENT_ASSIST = 'agent-assist';
    const [submittedScreenPop, setSubmittedScreenPop] = useState({});
    useEffect(() => {
        /**
          * Function to get handle NAIA messages from RTIG window
          * @param event - event to be received by the window
          * @example -NaiaMessagingHandler(event)
          */
        const NaiaMessagingHandler = (event) => {
            var _a;
            const rtigScreenPop = screenPops.find((pop) => pop.pageUri.indexOf(event.origin) > -1);
            const windowObjectReference = rtigScreenPop
                ? (_a = windowsRefs === null || windowsRefs === void 0 ? void 0 : windowsRefs.current[rtigScreenPop.windowObjectReference]) === null || _a === void 0 ? void 0 : _a.windowObjectReference
                : null;
            const agentAssist = event.origin.search(/(niceincontact\.com$|nicecxone-sov1\.eu$|nicecxone-sov1\.uk$|nicecxone-sov1\.au$|nice-incontact\.com$)/) > 0;
            if (!agentAssist)
                return;
            if ((event.data['issuer'].toLowerCase() === NAIA || event.data['issuer'].toLowerCase() === AGENT_ASSIST) && event.data['messageType'] === 'Loaded') {
                const authToken = CXoneAuth.instance.getAuthToken() || '';
                const cxoneConfig = JSON.parse(localStorage.getItem(StorageKeys.CXONE_CONFIG) || '');
                const tokenMessage = {
                    isCentral: false,
                    issuer: 'CXoneAgent',
                    messageType: 'Token',
                    token: authToken.accessToken,
                    urls: {
                        authBaseUrl: CXoneClient.instance.auth.getCXoneConfig().userHubBaseUrl,
                        inContactBaseUrl: cxoneConfig.acdApiBaseUri,
                    },
                };
                if (windowObjectReference) {
                    windowObjectReference.postMessage(tokenMessage, event.origin);
                }
            }
            else if ((event.data['issuer'].toLowerCase() === NAIA || event.data['issuer'].toLowerCase() === AGENT_ASSIST) &&
                event.data['messageType'] === 'RegisterForClientEvents') {
                if (windowObjectReference && rtigScreenPop) {
                    windowObjectReference.postMessage({
                        issuer: 'CXoneAgent',
                        contactId: rtigScreenPop.contactId || null,
                        events: [rtigScreenPop.eventParams],
                    }, '*');
                }
            }
        };
        window.addEventListener('message', NaiaMessagingHandler);
        return () => {
            window.removeEventListener('message', NaiaMessagingHandler);
        };
    });
    /**
  * Set the custom form submit event
  * @param event - onCustomFormSubmit generated by DOM
  * @returns - void
  * @example - onCustomFormSubmit(e, screenPop)
  */
    const onCustomFormSubmit = (event, screenPop) => {
        if ((screenPop === null || screenPop === void 0 ? void 0 : screenPop.action) === RunAppActionType.SHOWCUSTOMFORM) {
            CXoneAcdClient.instance.screenPop.onCustomFormSubmit(event);
            setSubmittedScreenPop(screenPop);
        }
    };
    useEffect(() => {
        var _a;
        if ((submittedScreenPop === null || submittedScreenPop === void 0 ? void 0 : submittedScreenPop.pageUri) && (submittedScreenPop === null || submittedScreenPop === void 0 ? void 0 : submittedScreenPop.action) === RunAppActionType.SHOWCUSTOMFORM) {
            const currentScreenPop = screenPops.find((pop) => pop.pageUri === submittedScreenPop.pageUri && pop.contactId === submittedScreenPop.contactId);
            if (currentScreenPop) {
                dispatch(ccfScreenPopActions.removeScreenPop(currentScreenPop));
                (_a = windowsRefs.current[currentScreenPop.windowObjectReference]) === null || _a === void 0 ? void 0 : _a.windowObjectReference.close();
                setSubmittedScreenPop({});
            }
        }
    }, [submittedScreenPop, dispatch]);
    useEffect(() => {
        const voiceContactUpdateEventSubscription = CXoneAcdClient.instance.contactManager.voiceContactUpdateEvent.subscribe((callContactEvent) => {
            if (callContactEvent.status.toLowerCase() === VoiceContactStatus.DISCONNECTED &&
                callContactEvent.finalState) {
                closePopUrlOnTermination(callContactEvent.contactID);
            }
        });
        const voiceMailContactUpdateEventSubscription = CXoneAcdClient.instance.contactManager.voiceMailContactUpdateEvent.subscribe((voicemailContactEvent) => {
            if (voicemailContactEvent.voiceMailEventData.status.toLowerCase() ===
                VoiceMailContactEventStatus.DISCARDED.toLowerCase() &&
                voicemailContactEvent.voiceMailEventData.finalState) {
                closePopUrlOnTermination(voicemailContactEvent.voiceMailEventData.contactId);
            }
        });
        const workItemContactUpdateEventSubscription = CXoneAcdClient.instance.contactManager.workItemContactUpdateEvent.subscribe((workItemContactEvent) => {
            if (workItemContactEvent.workItemEventData.status.toLowerCase() ===
                WorkItemContactStatus.DISCONNECTED.toLowerCase() &&
                workItemContactEvent.workItemEventData.finalState) {
                closePopUrlOnTermination(workItemContactEvent.workItemEventData.contactId);
            }
        });
        const digitalContactUpdateEventSubscription = CXoneDigitalClient.instance.digitalContactManager.onDigitalContactEvent.subscribe((digitalContact) => {
            if (!digitalContact.inboxAssignee) {
                closePopUrlOnTermination(digitalContact.caseId);
            }
        });
        return () => {
            voiceContactUpdateEventSubscription === null || voiceContactUpdateEventSubscription === void 0 ? void 0 : voiceContactUpdateEventSubscription.unsubscribe();
            voiceMailContactUpdateEventSubscription === null || voiceMailContactUpdateEventSubscription === void 0 ? void 0 : voiceMailContactUpdateEventSubscription.unsubscribe();
            workItemContactUpdateEventSubscription === null || workItemContactUpdateEventSubscription === void 0 ? void 0 : workItemContactUpdateEventSubscription.unsubscribe();
            digitalContactUpdateEventSubscription === null || digitalContactUpdateEventSubscription === void 0 ? void 0 : digitalContactUpdateEventSubscription.unsubscribe();
        };
    }, []);
    /**
          * closePopUrlOnTermination - close the popurl window on contact termination
          * @param props - contactID
          * @example closePopUrlOnTermination(contactID)
      */
    const closePopUrlOnTermination = (contactID) => {
        var _a;
        (_a = windowsRefs === null || windowsRefs === void 0 ? void 0 : windowsRefs.current) === null || _a === void 0 ? void 0 : _a.forEach((windowObject) => {
            var _a;
            if ((windowObject === null || windowObject === void 0 ? void 0 : windowObject.closeOnTermination) && (windowObject === null || windowObject === void 0 ? void 0 : windowObject.contactId) === contactID) {
                (_a = windowObject === null || windowObject === void 0 ? void 0 : windowObject.windowObjectReference) === null || _a === void 0 ? void 0 : _a.close();
            }
        });
    };
    useEffect(() => {
        /**
            * openNewWindow - open a window and return the window object reference
            * @param props - ScreenPopEvent
            * @example openNewWindow(screenPop)
            */
        const openNewWindow = (props) => {
            var _a, _b;
            const agentAssistConfiguration = JSON.parse(((_a = props === null || props === void 0 ? void 0 : props.eventParams) === null || _a === void 0 ? void 0 : _a.AgentAssistAppConfigJson) || '{}');
            const agentAssistProviderId = (_b = agentAssistConfiguration === null || agentAssistConfiguration === void 0 ? void 0 : agentAssistConfiguration.Params) === null || _b === void 0 ? void 0 : _b.providerId;
            const openNewWindowForScreenPop = getPanelPopOutSetting() || props.action === GetNextEventType.AGENT_ASSIST || props.action === PageAction.OPEN || props.userInitiatedPops;
            if (props.pageUri && (!(props.title === AgentAssistTitle.AGENT_COPILOT || props.title === AgentAssistTitle.MAX_COPILOT) || (agentAssistConfiguration && agentAssistProviderId !== AgentAssistProvider.AGENT_COPILOT))) {
                if (props.action === RunAppActionType.SHOWCUSTOMFORM) {
                    const windowsFeatures = 'popup,height=300,width=300';
                    const cfWin = window.open('', '_blank', windowsFeatures);
                    cfWin === null || cfWin === void 0 ? void 0 : cfWin.document.write(props.pageUri);
                    cfWin === null || cfWin === void 0 ? void 0 : cfWin.document.addEventListener('submit', (e) => { onCustomFormSubmit(e, props); });
                    cfWin === null || cfWin === void 0 ? void 0 : cfWin.document.close();
                    return cfWin;
                }
                else if (props.pageUri === '$PageOpen') {
                    const pageUri = getPageOpenUri(currentAgentId, props.contactId, agentSessionInfo.busNo);
                    return window.open(pageUri, '_blank');
                }
                // If the popUrlDestination is set to 'popout' in the PopURL action, open the page in a new window
                else if (props.popUrlDestination.toLowerCase() === 'popout') {
                    const windowsFeatures = 'popup,height=' + (props.windowHeight || 100) + ',width=' + (props.windowWidth || 100);
                    return window.open(props.pageUri, 'tab-' + props.title + props.contactId, windowsFeatures);
                }
                // If Panel Open in Browser is set to true, the action is "AgentAssist" or "Open", OR the user initiated the pop, open the page in a new window
                else if (openNewWindowForScreenPop) {
                    return window.open(props.pageUri, '_blank');
                }
            }
            return null;
        };
        if (CXoneLeaderElector.instance.isLeader || !isSmView) {
            screenPops === null || screenPops === void 0 ? void 0 : screenPops.forEach((sc, index) => {
                var _a, _b, _c, _d, _e, _f, _g, _h;
                // If it is a close action, remove related screen pop and close the opened window
                if ((sc === null || sc === void 0 ? void 0 : sc.action) === PageAction.CLOSE && sc.windowObjectReference === -1) {
                    const closeActionScreenPop = screenPops === null || screenPops === void 0 ? void 0 : screenPops.find((scPop) => (scPop.contactId === sc.contactId && scPop.pageUri === sc.pageUri.replace(PageAction.CLOSE, PageAction.OPEN)));
                    if (closeActionScreenPop) {
                        dispatch(ccfScreenPopActions.removeScreenPop(closeActionScreenPop));
                        (_a = windowsRefs.current[closeActionScreenPop.windowObjectReference]) === null || _a === void 0 ? void 0 : _a.windowObjectReference.close();
                    }
                    dispatch(ccfScreenPopActions.removeScreenPop(sc));
                }
                // If the url should be popped out and it has not been opened						
                else if ((sc === null || sc === void 0 ? void 0 : sc.isPoppedOut) && sc.windowObjectReference === -1) {
                    const ref = openNewWindow(sc);
                    if (ref !== null) {
                        const wobject = {
                            windowObjectReference: ref,
                            closeOnTermination: sc.closeOutUponTermination || false,
                        };
                        if (sc === null || sc === void 0 ? void 0 : sc.contactId) {
                            wobject.contactId = sc === null || sc === void 0 ? void 0 : sc.contactId;
                        }
                        const referenceNumber = windowsRefs.current.push(wobject);
                        dispatch(ccfScreenPopActions.setReferenceNumber({ index: index,
                            windowObjectReference: referenceNumber - 1 }));
                        if (!(sc === null || sc === void 0 ? void 0 : sc.userInitiatedPops) && !acdContactsIds.find(contact => contact.toString() === (sc === null || sc === void 0 ? void 0 : sc.contactId)) && windowsRefs.current[referenceNumber - 1]) {
                            //prevent script pop with no contact from creating two duplicate screenpops 
                            dispatch(ccfScreenPopActions.removeScreenPop(sc));
                        }
                    }
                }
                // Remove the screen pop from slice if closed and not from an active contact
                else if ((sc === null || sc === void 0 ? void 0 : sc.isPoppedOut)
                    && !(sc === null || sc === void 0 ? void 0 : sc.userInitiatedPops)
                    && sc.windowObjectReference !== -1
                    && ((_c = (_b = windowsRefs.current[sc.windowObjectReference]) === null || _b === void 0 ? void 0 : _b.windowObjectReference) === null || _c === void 0 ? void 0 : _c.closed)
                    && (acdContactsIds === null || acdContactsIds === void 0 ? void 0 : acdContactsIds.every(contactId => contactId !== sc.contactId))) {
                    windowsRefs.current.splice(sc.windowObjectReference, 1);
                    dispatch(ccfScreenPopActions.removeScreenPop(sc));
                }
                // Remove the window reference if it gets popped in and then popped out
                else if ((sc === null || sc === void 0 ? void 0 : sc.userClicked)
                    && (sc === null || sc === void 0 ? void 0 : sc.isPoppedOut)
                    && sc.windowObjectReference !== -1
                    && (!windowsRefs.current[sc.windowObjectReference]
                        || ((_e = (_d = windowsRefs.current[sc.windowObjectReference]) === null || _d === void 0 ? void 0 : _d.windowObjectReference) === null || _e === void 0 ? void 0 : _e.closed))) {
                    windowsRefs.current.splice(sc.windowObjectReference, 1);
                    const ref = openNewWindow(sc);
                    if (ref !== null) {
                        const wobject = {
                            windowObjectReference: ref,
                            closeOnTermination: sc.closeOutUponTermination || false,
                        };
                        if (sc === null || sc === void 0 ? void 0 : sc.contactId) {
                            wobject.contactId = sc === null || sc === void 0 ? void 0 : sc.contactId;
                        }
                        windowsRefs.current.splice(sc.windowObjectReference, 0, wobject);
                    }
                    dispatch(ccfScreenPopActions.unsetUserClicked());
                }
                // Close the url if it gets popped in 
                else if (!(sc === null || sc === void 0 ? void 0 : sc.isPoppedOut) && !((_f = windowsRefs.current[sc.windowObjectReference]) === null || _f === void 0 ? void 0 : _f.windowObjectReference.closed)) {
                    (_g = windowsRefs.current[sc.windowObjectReference]) === null || _g === void 0 ? void 0 : _g.windowObjectReference.close();
                }
                //if the window is open, bring into focus the screen pop
                else if ((sc === null || sc === void 0 ? void 0 : sc.isPoppedOut) && sc.userClicked && sc.windowObjectReference !== -1) {
                    (_h = windowsRefs.current[sc.windowObjectReference]) === null || _h === void 0 ? void 0 : _h.windowObjectReference.focus();
                    dispatch(ccfScreenPopActions.unsetUserClicked());
                }
            });
        }
        // if the screen pops state is empty, remove all windows that
        // need to be removed
        if (screenPops.length < 1) {
            windowsRefs.current.forEach(ref => {
                var _a;
                if (ref.closeOnTermination)
                    (_a = ref === null || ref === void 0 ? void 0 : ref.windowObjectReference) === null || _a === void 0 ? void 0 : _a.close();
            });
            windowsRefs.current.splice(0);
        }
    }, [screenPops, dispatch, windowsRefs, isSmView]);
    useEffect(() => {
        dispatch(globalActions.setIntegratedAgent(isSmView));
    }, [isSmView, dispatch]);
    useEffect(() => {
        dispatch(ccfScreenPopActions.setAppSpace(nonIncomingActiveContactInSelectedInteraction !== null && nonIncomingActiveContactInSelectedInteraction !== void 0 ? nonIncomingActiveContactInSelectedInteraction : undefined));
    }, [nonIncomingActiveContactInSelectedInteraction, dispatch]);
    return null;
};
//# sourceMappingURL=ccf-screen-pop-parent.js.map