import { Subject } from 'rxjs';
import { CXoneDisposition, CXoneSdkError, UserSlots, CXoneMessage, CXoneTypingMessageContent } from '@nice-devone/common-sdk';
import { DispositionService } from '@nice-devone/agent-sdk';
import { CXoneDigitalContact } from '../digital/contact/cxone-digital-contact';
import { CXoneUserSlotProvider } from '../digital/provider/cxone-user-slot-provider';
import { DigitalContactService } from '../digital/service/digital-contact-service';
/**
 * Class to handle the contacts
 */
export declare class DigitalContactManager {
    private acdSession;
    private adminService;
    private digitalContactMap;
    onDigitalContactEvent: Subject<CXoneDigitalContact>;
    onUserSlotEvent: Subject<any>;
    onDispositionEvent: Subject<CXoneDisposition[] | CXoneSdkError>;
    private digitalService;
    digitalContactService: DigitalContactService;
    dispositionService: DispositionService;
    private digitalWebsocket;
    private logger;
    private currentUserId;
    private cxoneDigitalContactHelper;
    private digitalContactId;
    private eventHubProvider;
    userSlotProvider: CXoneUserSlotProvider;
    private skillService;
    private EVENT_HUB_POLLING_INTERVAL_MS;
    onDigitalContactNewMessageEvent: Subject<{
        interactionId: string;
        contactId: string;
        message: CXoneMessage;
    }>;
    onDigitalContactUserTypingPreviewEvent: Subject<{
        eventType: string;
        threadId: string;
        message?: CXoneTypingMessageContent;
    }>;
    private viewOnlyCases;
    onDigitalWsNotificationEvent: Subject<string>;
    private userSlotPollingStarted;
    onAvailabilityEvent: Subject<any>;
    onAgentHiveEvent: Subject<{
        eventType: string;
        message: CXoneMessage;
    }>;
    private userSlotSubscribed;
    private isWebSocketFailure;
    private digitalEventSyncService;
    private digitalEventSyncDictionary;
    private isWSAPIIntegrationRevampToggleEnabled;
    private readonly SYNC_ENABLED_EVENTS;
    /**
     * @example
     * ```
     * const DigitalContactManager = new DigitalContactManager();
     * ```
     */
    constructor();
    /**
     * Method to create instance for voice and contact service and update agent permissions and call contact event
     */
    private initialize;
    /**
     * initialize Digital methods like starting websocket, user slot connection
     * @example
     * ```
     * initializeDigital
     * ```
     */
    initializeDigital(): Promise<void>;
    /**
     * Method to initialize digital event sync service
     */
    private initializeDigitalEventSync;
    /**
     * Method to handle digital sync events from the DigitalEventSyncService
     * @example handleDigitalSyncEvent(event);
     * @param event - DigitalEventSync object containing contactId, eventName, traceId
     */
    private handleDigitalSyncEvent;
    /**
     * Method to get actual event name for the given event.
     * In case of AssigntoMe & UnAssign events we get CaseInboxAssigneeChanged event from websocket.
     * To differentiate between these two events we will use actual event name.
     * @param eventName - The name of the event we receive from websocket.
     * @example getActualEventName(event);
     * @returns - actual event name differentiating assign & unassign.
     */
    private getActualEventName;
    /**
    * Add a traceId for given eventName and contactId.
    * @param eventName - The name of the event
    * @param contactId - The ID of the contact
    * @param traceId - The trace ID associate with the event and contact
    * @example addTraceIdInEventSyncDictionary('event1', 'contact1', 'trace1');
    */
    private addTraceIdInEventSyncDictionary;
    /**
     * Update the Digital Event Sync Dictionary with the latest traceId for a given contactId and eventName.
     * @param contactId - contact id
     * @param eventName - The name of the event
     * @param traceId - The trace ID associated with the event and contact
     * @example updateDESyncDictionary('contact1', 'event1', 'trace1');
     */
    private updateDESyncDictionary;
    /**
     * Check if the digital event sync dictionary should be updated for the given event
     * @param eventName - The name of the event
     * @param traceId - The trace ID associated with the event
     * @returns - true if sync dictionary update is required, false otherwise
     * @example isSyncDictionaryUpdateRequired(CXoneDigitalEventType.CASE_INBOX_ASSIGNEE_CHANGED, 'trace123');
     */
    private isSyncDictionaryUpdateRequired;
    /**
     * Handle Message Updated API response in case of message update event
     * @param contactId - contact id
     * @param traceId - Unique id for tracking the events and avoiding duplication
     * @example handleMessageUpdatedEvent(contactId, traceId);
     */
    handleMessageUpdatedEvent(contactId: string, traceId: string, messageUpdatedEventData?: CXoneMessage): Promise<void>;
    /**
     * Handle Message Added Into Case API response in case of new message added to case
     * @param contactId - contact id
     * @param traceId - Unique id for tracking the events and avoiding duplication
     * @example handleMessageAddedIntoCaseEvent(contactId, traceId);
     */
    handleMessageAddedIntoCaseEvent(contactId: string, traceId: string, messageAddedEventData?: CXoneMessage): Promise<void>;
    /**
     * Handle Assignee Changed API response in case of case assignment to agent inbox from
     * @param contactId - contact id
     * @param traceId - Unique id for tracking the events and avoiding duplication
     * @example handleAssigneeChangedEvent(contactId, traceId);
     */
    handleAssigneeChangedEvent(contactId: string, traceId: string): Promise<void>;
    /**
     * Handle UnAssignee Changed API response in case of case unassignment from agent inbox
     * @param contactId - contact id
     * @param traceId - Unique id for tracking the events and avoiding duplication
     * @example handleUnAssigneeChangedEvent(contactId, traceId);
     */
    handleUnAssigneeChangedEvent(contactId: string, traceId: string): Promise<void>;
    /**
     * Retrieve a traceId by eventName + contactId
     * @example getTraceIdFromEventSyncDictionary('event1', 'contact1');
     * @param eventName - The name of the event
     * @param contactId - contact id
     */
    getTraceIdFromEventSyncDictionary(eventName: string, contactId: string): string | null;
    /**
     * terminate digital workers
     * @example
     * ```
     * terminateDigitalWorkers()
     * ```
     */
    terminateDigitalWorkers(): void;
    /**
     * handles web socket message events
     * @example
     * ```
     * digitalWebsocketMessageHandler
     * ```
     */
    private digitalWebsocketMessageHandler;
    /**
     * Used to remove the preview case from the preview array and digital contact map
     * @param contactId - contact id string
     * @example
     * ```
     * cxoneClient.contactManager.removePreviewContacts(caseId);
     * ```
     */
    removePreviewContacts(contactId: string): void;
    /**
     * Used for handling web socket error/success notifications
     * @example
     * ```
     * digitalWebsocketConnectionStateHandler()
     * ```
     */
    private digitalWebsocketConnectionStateHandler;
    /**
     * checkSchemaAndPublishForMessage.
     * @param currentContact - cxone Digital contact details
     * @param eventData - eventData from digitalWebsocket.onMessageReceived subscription
     * this method will be called in case of MESSAGE_NOTE_CREATED , MESSAGE_NOTE_DELETED , MESSAGE_NOTE_UPDATED , MESSAGE_UPDATED(only for change in message tags), MESSAGE_DELIVERY_STATUS_CHANGED, MESSAGE_SEEN_CHANGED event are updated and
     * to validate the event data and publish that message data
     */
    private checkSchemaAndPublishForMessage;
    /**
     * checkSchemaAndPublishAvailability.
     * @param currentContact - cxone Digital contact details
     * @param eventData - eventData from digitalWebsocket.onMessageReceived subscription
     * this method will be called in case of MESSAGE_NOTE_CREATED , MESSAGE_NOTE_DELETED , MESSAGE_NOTE_UPDATED , MESSAGE_UPDATED(only for change in message tags), MESSAGE_DELIVERY_STATUS_CHANGED, MESSAGE_SEEN_CHANGED event are updated and
     * to validate the event data and publish that message data
     */
    private checkSchemaAndPublishAvailability;
    /**
     * Method to determine whether to poll user slot api
     * @example
     * ```
     *  manageUserSlotDetails()
     * ```
    */
    manageUserSlotDetails(): Promise<void>;
    /**
     * Method to invoke user slot API and polling for data reconcile based on case
     * @example
     * ```
     *  pollUserSlots()
     * ```
    */
    private pollUserSlots;
    /**
   * Method to parses the user slot poll response and updates the digital contact map accordingly.
   *
   * @param userSlotResponse - The response containing user slots information.
   * @param WebsocketConnectionFailure - A boolean indicating if there was a WebSocket connection failure.
   * @example - parseUserSlotPollResponse(userSlotResponse, WebsocketConnectionFailure)
   *
   */
    parseUserSlotPollResponse(userSlotResponse: UserSlots, WebsocketConnectionFailure: boolean): void;
    /**
     * updatePublishDigitalContactMap.
     * @param contact - cxone Digital contact details
     * this method will be called in case of MESSAGE_ADDED_INTO_CASE & CASE_STATUS_CHANGED event
     */
    private updatePublishDigitalContactMap;
    /**
     * get assigned digital contact details based on caseId
     * @example
     * ```
     * getDigitalContactDetails
     * ```
    */
    private getDigitalContactDetails;
    /**
     * Method used to publish disposition details
     * @param caseId - Case Id
     * @param skillId - Skill Id
     * ```
     * @example -
     * publishDispositionDetails('1234', '6545')
     * ```
     */
    private publishDispositionDetails;
    /**
     * Method to subscribeToEventHub
     * @returns - returns promise to event hub subscription call
     * ```
     * @example
     * subscribeToEventHub()
     * ```
     */
    subscribeToEventHub(): void;
    /**
       * Method to terminateEventHubApiPolling
       * @returns
       * ```
       * @example
       * terminateEventHubApiPolling
       * ```
       */
    private terminateEventHubApiPolling;
    /**
     * Method used to get Digital Contact Details,publish it and subscribe to event hub
     * @param contactId - Contact Id of the digital contact
     * ```
     * @example -
     * getContactDetails('1234')
     * ```
     */
    getContactDetails(contactId: string, isAssignedToAgentInbox?: boolean): void;
    /**
     * subscribe the digital contact event
     */
    private digitalContactEventHandler;
    /**
     * Method used to get the CXoneContact
     */
    private publishContact;
    /**
     * Method used to get the CXoneContact
     */
    private publishAvailabilityState;
    /**
     * subscribe to auto summary event
     */
    private updateAutoSummaryEventHandler;
    /**
     * Method used to send connection state updates of browser network
     */
    private publishNetworkNotification;
    /**
     * publish event for newly arrived message for public channel
     * @param contactId - contact id of message to be published
     * @param interactionId - interaction id of message to be published
     * @param message - new message to be published
     * @example -
     */
    private publishNewMessageForContact;
    /**
     * user slot api call for the userId
     * @example
     * ```
     * getUserSlotsApi
     * ```
    */
    private getUserSlotsApi;
    /**
     * Terminate the user slot polling.
     */
    private terminateUserSlotPolling;
}
