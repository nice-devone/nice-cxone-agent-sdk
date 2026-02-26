import { AgentAssistProvider, AgentAssistTitle, PageAction } from '@nice-devone/agent-sdk';
import { RunAppActionType, validateURLOrACDStrings, VoiceContactStatus, WorkItemContactStatus, InteractionType, AgentAssistAppTitle, } from '@nice-devone/common-sdk';
import { FeatureToggleService, GetNextEventType, Logger, VoiceMailContactEventStatus } from '@nice-devone/core-sdk';
import { map, filter } from 'rxjs/operators';
import { CcfAuthenticationActions } from '../ccf-authentication/ccf-authentication.slice';
import { globalActions } from '../global.app.slice';
import { ccfScreenPopActions, getPanelPopOutSetting } from './ccf-screen-pop.slice';
import { CXoneAcdClient } from '@nice-devone/acd-sdk';
import { CXoneAgentEvents } from '@nice-devone/shared-apps-lib';
import { CXoneDigitalClient } from '@nice-devone/digital-sdk';
/**
 *
 * @param actions$ - it take stream of action
 * @param state - represents state of application , can be used to get state using state$.values
 * @returns - return new action
 * @example
 */
export const screenPopEventMiddleware = (actions$, _state$, { store }) => {
    const logger = new Logger('screenPopEventMiddleware', 'App');
    const isOmiliaWrapperFTOn = FeatureToggleService.instance.getFeatureToggleSync("release-aai-omiliawrapper-aai-34358" /* FeatureToggles.OMILIA_CUSTOM_WORKSPACE_FEATURE_TOGGLE */);
    return actions$.pipe(filter((action) => action.type === CcfAuthenticationActions.logUserIn.type), map(() => {
        CXoneAcdClient.instance.screenPop.screenPopSubscribe(true, true, true, true, true, true);
        CXoneAcdClient.instance.screenPop.runAppSubject.subscribe(
        //Pop to a browser as a default
        (runApp) => {
            var _a, _b;
            const screenPop = {
                waitTimeout: runApp.waitTimeout,
                action: runApp.actionType,
                pageUri: runApp.actionValue,
                title: runApp.actionType === RunAppActionType.SHOWCUSTOMFORM
                    ? runApp.contactId + runApp.actionValue
                    : runApp.actionValue,
                isPoppedOut: true,
                contactId: runApp.contactId,
                closeOutUponTermination: false,
                popUrlDestination: '',
                windowHeight: 0,
                windowWidth: 0,
                windowObjectReference: -1,
                userInitiatedPops: false,
                userClicked: false,
                screenPopId: crypto.randomUUID(),
            };
            const allInteractions = (_b = (_a = store.getState()) === null || _a === void 0 ? void 0 : _a.inbox) === null || _b === void 0 ? void 0 : _b.cxoneInteractions;
            const allContacts = getAllContacts(allInteractions);
            // Show customForm does not have a validURL, actionValue is html so skip validation.
            if (runApp.actionType === RunAppActionType.SHOWCUSTOMFORM || validateURLOrACDStrings(screenPop.pageUri)) {
                store.dispatch(ccfScreenPopActions.setScreenPop({
                    screenPop: screenPop,
                    store: allContacts,
                }));
            }
            else {
                logger.warn('runAppSubject', 'Invalid screenPop URL');
            }
        });
        CXoneAcdClient.instance.screenPop.pageOpenSubject.subscribe((pageOpen) => {
            var _a, _b, _c, _d;
            const screenPop = {
                waitTimeout: '',
                action: pageOpen.action,
                pageUri: pageOpen.pageUri,
                title: pageOpen.pageUri,
                isPoppedOut: false,
                contactId: pageOpen.contactId,
                closeOutUponTermination: true,
                popUrlDestination: '',
                windowHeight: 0,
                windowWidth: 0,
                windowObjectReference: -1,
                userInitiatedPops: false,
                userClicked: false,
            };
            // If the page is closed and panel popout is not enabled, remove the screen pop
            if (pageOpen.action === PageAction.CLOSE && !getPanelPopOutSetting()) {
                (_b = (_a = store.getState()) === null || _a === void 0 ? void 0 : _a.screenpop.screenPops) === null || _b === void 0 ? void 0 : _b.forEach((scPop) => {
                    if (scPop.contactId === pageOpen.contactId && scPop.pageUri === pageOpen.pageUri.replace(PageAction.CLOSE, PageAction.OPEN)) {
                        store.dispatch(ccfScreenPopActions.removeScreenPop(scPop));
                    }
                });
            }
            // If the page is opened and panel popout is enabled, set the screen pop
            else {
                const allInteractions = (_d = (_c = store.getState()) === null || _c === void 0 ? void 0 : _c.inbox) === null || _d === void 0 ? void 0 : _d.cxoneInteractions;
                const allContacts = getAllContacts(allInteractions);
                store.dispatch(ccfScreenPopActions.setScreenPop({
                    screenPop: screenPop,
                    store: allContacts,
                }));
            }
        });
        CXoneAcdClient.instance.screenPop.popUrlSubject.subscribe((popUrl) => {
            var _a, _b;
            if (popUrl.popDestination.toLowerCase() !== 'postonly') {
                //Pop to a browser as a default
                const screenPop = {
                    waitTimeout: '',
                    action: 'popUrl',
                    pageUri: popUrl.url,
                    title: popUrl.tabTitle || popUrl.url,
                    isPoppedOut: true,
                    contactId: popUrl.contactId,
                    closeOutUponTermination: popUrl.closePopoutUponTermination,
                    popUrlDestination: popUrl.popDestination,
                    windowHeight: popUrl.popoutWindowHeight,
                    windowWidth: popUrl.popoutWindowWidth,
                    windowObjectReference: -1,
                    userInitiatedPops: false,
                    userClicked: false,
                };
                // CRM-11575 - call screenpop event to pop the Visualforce page in the same browser tab instead of open in a new tab.         
                const searchParams = new URLSearchParams(window.location.search);
                const app = searchParams.get('app') || '';
                if (app === 'cxa_sfdc' && validateURLOrACDStrings(screenPop.pageUri) && !getPanelPopOutSetting()) {
                    const eventArgs = {};
                    const popUri = {
                        activityRecord: {
                            type: '',
                            id: '',
                            label: '',
                            url: screenPop.pageUri,
                        },
                        contactId: screenPop.contactId,
                        actionType: screenPop.action,
                    };
                    eventArgs.detail = popUri;
                    const customEvent = new CustomEvent(CXoneAgentEvents.CXONE_SCREEN_POP_EVENT, eventArgs);
                    window.dispatchEvent(customEvent);
                }
                const allInteractions = (_b = (_a = store.getState()) === null || _a === void 0 ? void 0 : _a.inbox) === null || _b === void 0 ? void 0 : _b.cxoneInteractions;
                const allContacts = getAllContacts(allInteractions);
                if (validateURLOrACDStrings(screenPop.pageUri)) {
                    store.dispatch(ccfScreenPopActions.setScreenPop({
                        screenPop: screenPop,
                        store: allContacts,
                    }));
                }
                else {
                    logger.warn('popUrlSubject', 'Invalid screenPop URL');
                }
            }
        });
        CXoneAcdClient.instance.screenPop.contactScreenPopSubject.subscribe((contact) => {
            var _a, _b;
            const screenPop = {
                waitTimeout: '',
                action: 'callContact',
                pageUri: contact.screenpopUrl,
                title: contact.screenpopUrl,
                isPoppedOut: getPanelPopOutSetting(),
                contactId: contact.contactId,
                closeOutUponTermination: false,
                popUrlDestination: '',
                windowHeight: 0,
                windowWidth: 0,
                windowObjectReference: -1,
                userInitiatedPops: false,
                userClicked: false,
            };
            const allInteractions = (_b = (_a = store.getState()) === null || _a === void 0 ? void 0 : _a.inbox) === null || _b === void 0 ? void 0 : _b.cxoneInteractions;
            const allContacts = getAllContacts(allInteractions);
            if (validateURLOrACDStrings(screenPop.pageUri)) {
                store.dispatch(ccfScreenPopActions.setScreenPop({
                    screenPop: screenPop,
                    store: allContacts,
                }));
            }
            else {
                logger.warn('contactScreenPopSubject', 'Invalid screenPop URL');
            }
        });
        CXoneAcdClient.instance.screenPop.agentAssistSubject.subscribe((agentAssistScreenPop) => {
            var _a, _b, _c, _d, _e, _f, _g;
            const agentAssistProviderId = (_c = (_b = JSON.parse(((_a = agentAssistScreenPop === null || agentAssistScreenPop === void 0 ? void 0 : agentAssistScreenPop.allParams) === null || _a === void 0 ? void 0 : _a.AgentAssistAppConfigJson) || '{}')) === null || _b === void 0 ? void 0 : _b.Params) === null || _c === void 0 ? void 0 : _c.providerId;
            if (!(agentAssistScreenPop.appTitle === AgentAssistTitle.AGENT_COPILOT || agentAssistScreenPop.appTitle === AgentAssistTitle.MAX_COPILOT) ||
                agentAssistProviderId !== AgentAssistProvider.AGENT_COPILOT) {
                const screenPop = {
                    waitTimeout: '',
                    action: GetNextEventType.AGENT_ASSIST,
                    pageUri: agentAssistScreenPop.appUri,
                    title: agentAssistScreenPop.appTitle,
                    isPoppedOut: true,
                    contactId: agentAssistScreenPop.contactId,
                    closeOutUponTermination: true,
                    popUrlDestination: '',
                    windowHeight: 0,
                    windowWidth: 0,
                    windowObjectReference: -1,
                    userInitiatedPops: false,
                    userClicked: false,
                    eventParams: agentAssistScreenPop.allParams,
                };
                // check if agent assistant should not open based on saved configuration
                const agentAssistAppConfigJson = agentAssistScreenPop.allParams['AgentAssistAppConfigJson'];
                const parsedAgentAssistAppConfig = JSON.parse(agentAssistAppConfigJson);
                const openRtigUI = !((_d = parsedAgentAssistAppConfig.Params) === null || _d === void 0 ? void 0 : _d.isHidden);
                const allInteractions = (_f = (_e = store.getState()) === null || _e === void 0 ? void 0 : _e.inbox) === null || _f === void 0 ? void 0 : _f.cxoneInteractions;
                const allContacts = getAllContacts(allInteractions);
                // Do not open Omilia screen pop in case of FT ON and OpenInEmbeddedMode true        
                const openInEmbeddedModeValue = (_g = parsedAgentAssistAppConfig.Params) === null || _g === void 0 ? void 0 : _g.openInEmbeddedMode;
                const isOmiliaEmbeddedMode = isOmiliaWrapperFTOn && (openInEmbeddedModeValue === true || openInEmbeddedModeValue === 'true');
                if ((agentAssistScreenPop.appTitle === AgentAssistAppTitle.RTIG && openRtigUI) ||
                    (agentAssistScreenPop.appTitle === AgentAssistAppTitle.OMILIA_VOICE_BIOMETRICS && !isOmiliaEmbeddedMode) ||
                    (agentAssistScreenPop.appTitle !== AgentAssistAppTitle.RTIG && agentAssistScreenPop.appTitle !== AgentAssistAppTitle.OMILIA_VOICE_BIOMETRICS)) {
                    store.dispatch(ccfScreenPopActions.setScreenPop({
                        screenPop: screenPop,
                        store: allContacts,
                    }));
                }
            }
        });
        CXoneAcdClient.instance.contactManager.voiceContactUpdateEvent.subscribe((callContactEvent) => {
            if (callContactEvent.status.toLowerCase() === VoiceContactStatus.DISCONNECTED &&
                callContactEvent.finalState)
                store.dispatch(ccfScreenPopActions.removeContactScreenPops(callContactEvent.contactID));
        });
        CXoneAcdClient.instance.contactManager.voiceMailContactUpdateEvent.subscribe((voicemailContactEvent) => {
            if (voicemailContactEvent.voiceMailEventData.status.toLowerCase() ===
                VoiceMailContactEventStatus.DISCARDED.toLowerCase() &&
                voicemailContactEvent.voiceMailEventData.finalState)
                store.dispatch(ccfScreenPopActions.removeContactScreenPops(voicemailContactEvent.voiceMailEventData.contactId));
        });
        CXoneAcdClient.instance.contactManager.workItemContactUpdateEvent.subscribe((workItemContactEvent) => {
            if (workItemContactEvent.workItemEventData.status.toLowerCase() ===
                WorkItemContactStatus.DISCONNECTED.toLowerCase() &&
                workItemContactEvent.workItemEventData.finalState)
                store.dispatch(ccfScreenPopActions.removeContactScreenPops(workItemContactEvent.workItemEventData.contactId));
        });
        CXoneDigitalClient.instance.digitalContactManager.onDigitalContactEvent.subscribe((digitalContact) => {
            if (!digitalContact.inboxAssignee) {
                store.dispatch(ccfScreenPopActions.removeContactScreenPops(digitalContact.caseId));
            }
        });
        /**
          *Returns all the interactions in the store
          * @param allInteractions - all interactions in the store
          * @returns - ContactData[]
          * @example - getAllContacts(allInteractions)
          */
        const getAllContacts = (allInteractions) => {
            const allContacts = [];
            Object.values(allInteractions).forEach((interaction) => {
                switch (interaction.interactionType) {
                    case InteractionType.VOICE:
                    case InteractionType.VOICEMAIL:
                    case InteractionType.WORKITEM:
                        allContacts.push(Object.values(interaction.acdContacts)[0]);
                        break;
                    case InteractionType.DIGITAL:
                        allContacts.push(Object.values(interaction.digitalContacts)[0]);
                }
            });
            return allContacts;
        };
        CXoneAcdClient.instance.screenPop.customScreenpopSubject.subscribe((customScreenpop) => {
            const eventArgs = {};
            const customScreenpopUri = {
                activityRecord: {
                    type: '',
                    id: '',
                    label: '',
                    url: '',
                    data: JSON.stringify(customScreenpop === null || customScreenpop === void 0 ? void 0 : customScreenpop.data),
                },
                contactId: customScreenpop.contactId,
                actionType: 'customScreenpop',
            };
            eventArgs.detail = customScreenpopUri;
            const customEvent = new CustomEvent(CXoneAgentEvents.CXONE_SCREEN_POP_EVENT, eventArgs);
            window.dispatchEvent(customEvent);
        });
        return globalActions.default();
    }));
};
//# sourceMappingURL=screenPopEventMiddleware.js.map