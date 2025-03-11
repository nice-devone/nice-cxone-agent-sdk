import { Subject } from 'rxjs';
import { CXoneDisposition, CXoneSdkError, CXoneMessage, CXoneTypingMessageContent } from '@nice-devone/common-sdk';
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
    private userSlotSubscribed;
    private isWebSocketFailure;
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
     * Method to determine whether to poll user slot api
     * @example
     * ```
     *  manageUserSlotDetails()
     * ```
    */
    private manageUserSlotDetails;
    /**
     * Method to invoke user slot API and polling for data reconcile based on case
     * @example
     * ```
     *  pollUserSlots()
     * ```
    */
    private pollUserSlots;
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
