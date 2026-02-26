import { CXoneDigitalEventType, WorkItemContactStatus, CXoneSdkErrorType, InteractionType, MediaType } from '@nice-devone/common-sdk';
import { CallContactEventStatus, VoiceMailContactEventStatus } from '@nice-devone/core-sdk';
import { map, filter } from 'rxjs/operators';
import { CcfAuthenticationActions } from '../ccf-authentication/ccf-authentication.slice';
import { globalActions } from '../global.app.slice';
import { dispositionInteractionActions } from './ccf-disposition-slice';
import { CXoneAcdClient } from '@nice-devone/acd-sdk';
import { CXoneDigitalClient } from '@nice-devone/digital-sdk';
import { CcfCopilotActions } from '../ccf-agent-copilot/ccf-agent-copilot-container.slice';
/**
 *
 * @param actions$ - it take stream of action
 * @param state - represents state of application , can be used to get state using state$.values
 * @returns - return new action
 * @example
 */
export const dispositionMiddleware = (actions$, _state$, { store }) => {
    return actions$.pipe(filter((action) => action.type === CcfAuthenticationActions.logUserIn.type), map(() => {
        CXoneDigitalClient.instance.digitalContactManager.onDigitalContactEvent.subscribe((response) => {
            const res = response;
            if (res.eventDetails &&
                res.eventDetails.eventType === CXoneDigitalEventType.CASE_STATUS_CHANGED) {
                store.dispatch(dispositionInteractionActions.setFormInput({
                    contactId: res.contactID,
                    formInput: 'status',
                    value: res.status,
                }));
            }
            else if (res.eventDetails && res.eventDetails.eventType !== CXoneDigitalEventType.MESSAGE_ADDED_INTO_CASE) {
                store.dispatch(dispositionInteractionActions.addorUpdateDigitalContact(res));
            }
        });
        /**
         *
         * @returns -It return DispostionData
         * @example
         */
        const dispositionList = (response) => {
            var _a;
            const errorResponse = response;
            if ((errorResponse === null || errorResponse === void 0 ? void 0 : errorResponse.errorType) === CXoneSdkErrorType.CXONE_API_ERROR) {
                //For status code 403 we are showing insufficient permission error
                const messageKey = errorResponse.data.status === 403 /* HttpStatusCode.FORBIDDEN */ ? 'dispositionPermissionError' : 'unableToFetchDispositions';
                const dispositionOutcomeResponse = { isError: true, messageKey };
                // we are using message prop to pass contact id 
                store.dispatch(dispositionInteractionActions.updateDispositionErrorResponse({ contactId: errorResponse === null || errorResponse === void 0 ? void 0 : errorResponse.message, errorDetails: dispositionOutcomeResponse }));
            }
            let dispositionData = response;
            // sort our disposition list
            if ((dispositionData === null || dispositionData === void 0 ? void 0 : dispositionData.length) > 0) {
                if (((_a = dispositionData[0]) === null || _a === void 0 ? void 0 : _a.displayOrder) !== undefined) {
                    const sortedDispositions = [...dispositionData];
                    dispositionData = sortedDispositions.sort((a, b) => {
                        if ((a === null || a === void 0 ? void 0 : a.displayOrder) !== undefined && (b === null || b === void 0 ? void 0 : b.displayOrder) !== undefined) {
                            return a.displayOrder - b.displayOrder;
                        }
                        else if (a.dispositionName < b.dispositionName) {
                            return -1;
                        }
                        else if (a.dispositionName > b.dispositionName) {
                            return 1;
                        }
                        else {
                            return 0;
                        }
                    });
                }
            }
            return dispositionData;
        };
        CXoneAcdClient.instance.contactManager.onDispositionEvent.subscribe((response) => {
            const dispositionData = dispositionList(response);
            // update the state
            store.dispatch(dispositionInteractionActions.addNewDispositionsByContact({
                dispositionData,
            }));
        });
        CXoneDigitalClient.instance.digitalContactManager.onDispositionEvent.subscribe((response) => {
            const dispositionData = dispositionList(response);
            // update the state
            store.dispatch(dispositionInteractionActions.addNewDispositionsByContact({
                dispositionData,
            }));
        });
        CXoneAcdClient.instance.contactManager.onTagsEvent.subscribe((response) => {
            var _a, _b, _c, _d;
            const tagData = response;
            const allContacts = [];
            const allInteractions = (_b = (_a = store.getState()) === null || _a === void 0 ? void 0 : _a.inbox) === null || _b === void 0 ? void 0 : _b.cxoneInteractions;
            Object.values(allInteractions).forEach((interaction) => {
                switch (interaction.interactionType) {
                    case InteractionType.VOICE:
                    case InteractionType.VOICEMAIL:
                    case InteractionType.WORKITEM:
                        allContacts.push(Object.values(interaction.acdContacts)[0]);
                        break;
                    case InteractionType.DIGITAL: {
                        allContacts.push(Object.values(interaction.digitalContacts)[0]);
                    }
                }
            });
            if (tagData === null || tagData === void 0 ? void 0 : tagData.contactId)
                tagData.tags = (_c = tagData.tags) === null || _c === void 0 ? void 0 : _c.filter((tag) => tag === null || tag === void 0 ? void 0 : tag.isActive);
            if (((_d = tagData.tags) === null || _d === void 0 ? void 0 : _d.length) > 0) {
                store.dispatch(dispositionInteractionActions.addTags({
                    tagData,
                    store: allContacts,
                }));
            }
        });
        // Remove the disposition data related to the disconnected contactID
        CXoneAcdClient.instance.contactManager.voiceContactUpdateEvent.subscribe((response) => {
            const contact = response;
            if (contact.status === CallContactEventStatus.DISCONNECTED && contact.finalState) {
                handleFinalState(contact.contactID);
            }
            else if (contact.status === CallContactEventStatus.DISCONNECTED) {
                handleDisconnectedState(contact.contactID, MediaType.VOICE);
            }
        });
        CXoneAcdClient.instance.contactManager.voiceMailContactUpdateEvent.subscribe((response) => {
            const contact = response;
            if (contact.status === VoiceMailContactEventStatus.DISCARDED && contact.finalState) {
                handleFinalState(contact.contactID);
            }
            else if (contact.status === VoiceMailContactEventStatus.DISCARDED) {
                handleDisconnectedState(contact.contactID);
            }
        });
        CXoneAcdClient.instance.contactManager.workItemContactUpdateEvent.subscribe((response) => {
            var _a, _b;
            const contact = response;
            if (contact.status === WorkItemContactStatus.DISCONNECTED && contact.finalState) {
                handleFinalState(contact.contactID);
            }
            else if (contact.status === WorkItemContactStatus.DISCONNECTED) {
                const selectedContactID = (_b = (_a = store.getState()) === null || _a === void 0 ? void 0 : _a.inbox) === null || _b === void 0 ? void 0 : _b.selectedContactId;
                if (selectedContactID === contact.contactID) {
                    // If the contact is selected, we need to open the outcomes panel
                    handleDisconnectedState(contact.contactID);
                }
            }
        });
        /**
         * Closes the outcomes panel and clear the disposition for the contactId
         * This is only used for ACD contacts
         * @param contactId - number
         * @returns none
         * @example - handleFinalState(contactId)
         */
        const handleFinalState = (contactId) => {
            const { isAgentCopilotEnabled } = store.getState().global;
            store.dispatch(dispositionInteractionActions.setDispositionType(''));
            store.dispatch(dispositionInteractionActions.displayDispositionCard(false));
            store.dispatch(dispositionInteractionActions.clearDispositionById(contactId));
            if (isAgentCopilotEnabled)
                store.dispatch(CcfCopilotActions.clearCopilotCaseFromIndexedDb(contactId));
        };
        /**
         * Opens the outcomes panel and sends the disposition if already set for the contactId
         * This is only used for ACD contacts
         * @param contactId - string
         * @returns none
         * @example - handleDisconnectedState(contactId)
         */
        const handleDisconnectedState = (contactId, mediaType) => {
            store.dispatch(dispositionInteractionActions.setDispositionType(mediaType || ''));
            store.dispatch(dispositionInteractionActions.displayDispositionCard(true));
            store.dispatch(dispositionInteractionActions.checkAndSendDisposition(contactId));
        };
        return globalActions.default();
    }));
};
//# sourceMappingURL=dispositionMiddleware.js.map