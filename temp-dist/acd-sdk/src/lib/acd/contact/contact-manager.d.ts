import { CXoneVoiceContact } from './cxone-voice-contact';
import { Subject } from 'rxjs';
import { CXoneDisposition, CXoneSdkError, HttpResponse, CXoneDispositionDetails, TagsResponse, VoiceMailContactEvent, VoiceMailPlayBackEvent, CXoneMessage, WorkItemContactEvent, CXoneTypingMessageContent, CoBrowseEvent, MediaType, LocalPostEvent } from '@nice-devone/common-sdk';
import { CXoneVoiceMailContact } from './cxone-voicemail-contact';
import { CXoneWorkItemContact } from './cxone-workitem-contact';
import { DispositionService, PersonalConnectionService, ContactService, VoiceService } from '@nice-devone/agent-sdk';
declare type CXoneContactType = CXoneVoiceMailContact | CXoneWorkItemContact;
declare type ContactEventTypeAlias = VoiceMailContactEvent | WorkItemContactEvent;
/**
 * Class to handle the contacts
 */
export declare class ContactManager {
    private acdSession;
    private adminService;
    private voiceContactMap;
    private voiceMailContactMap;
    private workItemContactMap;
    voiceContactUpdateEvent: Subject<CXoneVoiceContact>;
    voiceMailContactUpdateEvent: Subject<CXoneVoiceMailContact>;
    workItemContactUpdateEvent: Subject<CXoneWorkItemContact>;
    onUserSlotEvent: Subject<any>;
    onDispositionEvent: Subject<CXoneDisposition[] | CXoneSdkError>;
    onTagsEvent: Subject<TagsResponse | CXoneSdkError>;
    personalConnectionService: PersonalConnectionService;
    voiceService: VoiceService;
    contactService: ContactService;
    cxoneVoiceContact: CXoneVoiceContact;
    dispositionService: DispositionService;
    private logger;
    private skillService;
    voiceMailPlayBackEvent: Subject<VoiceMailPlayBackEvent>;
    onDigitalContactNewMessageEvent: Subject<{
        interactionId: string;
        contactId: string;
        message: CXoneMessage;
    }>;
    conferenceCallEvent: Subject<string>;
    onDigitalContactUserTypingPreviewEvent: Subject<{
        eventType: string;
        threadId: string;
        message?: CXoneTypingMessageContent;
    }>;
    onCoBrowseEvent: Subject<CoBrowseEvent>;
    onLocalPostEvent: Subject<LocalPostEvent>;
    private dispositionsData;
    private tagsData;
    private viewOnlyCases;
    private allContacts;
    voiceCallRecordServicePollingEvent: Subject<boolean>;
    /**
     * @example
     * ```
     * const contactManager = new ContactManager();
     * ```
     */
    constructor();
    /**
     * Method to create instance for voice and contact service and update agent permissions and call contact event
     */
    private initialize;
    /**
     * Returns whether the agent has any PC dialer calls
     * @example hasAnyPersonalConnectionContact()
     */
    hasAnyPersonalConnectionContact(): boolean;
    /**
     * initialize coBrowse event handler
     * @example coBrowseEventHandler
     */
    coBrowseEventHandler(): void;
    /**
     * initialize localpost event handler
     * @example localPostEventHandler
     */
    localPostEventHandler(): void;
    /**
     * subscribe to auto summary event
     */
    private updateAutoSummaryEventHandler;
    /**
     * connect to websocket for voice bio hub
     */
    private connectVoiceBioHubWebSocket;
    /**
     * subscribe the update agent permissions event
     */
    private updatePermissionsEventHandler;
    /**
     * Update agent permission for voice contacts
     */
    private updateAgentPreference;
    /**
     * Method to check if any voice contact is available in VoiceContactMap
     * @example checkAcdContactsAvailable
     */
    checkAcdContactsAvailable(): boolean;
    /**
    * @example
    */
    checkForExistingContact(contactEvent: ContactEventTypeAlias, contactMap: Map<string, CXoneContactType>, contactConstructor: any): any;
    /**
     * Method to subscribe the contact event from the agentSession.
     * @example
     * ```
     * contactEventHandler()
     * ```
     */
    private contactEventHandler;
    /**
     * Method to subscribe the call contact event from the agentSession.
     */
    private callContactEventHandler;
    /**
     * Method to subscribe the workitem contact event from the agentSession.
     */
    private workItemContactEventHandler;
    /**
     * Method to subscribe the voicemail contact event from the agentSession.
     */
    private voicemailContactEventHandler;
    /**
     * Method to subscribe the conference call event from the agentSession.
     */
    private conferenceCallEventHandler;
    /**
    * Method to get dispositions for CallContactEvents and VoiceMailContactEvents
    * @param skillId - skill id to fetch the skill dispositions
    * @param contactId - used to fetch disposition
    * @example -
    * ```
    *getDispositionsOnContactEvent(1234, 4321, MediaType.VOICE)
    * ```
    */
    private getDispositionsOnContactEvent;
    /**
    * Method to get tags for CallContactEvents and VoiceMailContactEvents
    * @param skillId - skill id to fetch the skill tags
    * @param contactId - contactId to be set on tags
    * @example -
    * ```
    *getTagsOnContactEvent(1234, 4321)
    * ```
    */
    private getTagsOnContactEvent;
    /**
    * Method to update call controls state if new consult call started and publish for primary contact
    * @param masterID - skill id to fetch the skill details
    * @example -
    * ```
    *updateControlsWithNewConsultCall('1234')
    * ```
    */
    private updateControlsWithNewConsultCall;
    /**
     * Used to get the disposition based on the skill id provided
     * @param skillId - skill id to fetch the skill details
     * @example -
     * ```
     * cxoneClient.contactManager.getDispositions("123456");
     * ```
     */
    getDispositions(skillId: string, mediaType: MediaType): Promise<CXoneDisposition[] | CXoneSdkError>;
    /**
     * Used to save the disposition data provided
     * @param contactId - contact id for disposition
     * @param dispositionPayload - payload
     * @example -
     * ```
     * cxoneClient.contactManager.saveDisposition("123456",{primaryDispositionId: 456789, primaryDispositionNotes: "test notes"});
     * ```
     */
    saveDisposition(contactId: string, dispositionPayload: CXoneDispositionDetails): Promise<HttpResponse>;
    /**
     * Method to subscribe the mute event from the agentSession
     */
    private muteEventHandler;
    /**
     * Update Mute button state for voice contacts
     */
    private updateMuteState;
    /**
     * Update the record state for voice contacts
     * @param isRecording - boolean value to indicate if the call is being recorded
     * @example
     * ```
     * contactManager.updateVoiceCallRecordState(true);
     * ```
     */
    updateVoiceCallRecordState(isRecording: boolean): void;
    /**
     * Method used to get the CXoneContact
     */
    private publishContact;
    /**
     * set / delete / find the voicemail contacts in map using contactID.
     * @param contact - cxone voicemail contact details
     */
    private setVoiceMailContactInMap;
    /**
     * set / delete / find the work item contacts in map using contactID.
     * @param contact - cxone work item contact details
     */
    private setWorkItemContactInMap;
    /**
     * set / delete / find the voice contacts in map using contactID.
     * @param contact - cxone voice contact details
     */
    private setVoiceContactInMap;
    /**
     * Method to get voicemail skill details
     * @param voiceMailContact - cxone voicemail contact details
    */
    private getVoiceMailSkillById;
    /**
     * Method to get Skill Name for SkillId
     * @param contact - cxone voice contact or cxone work item contact details
     */
    private getSkillById;
    /**
     * Method to get subscribe to voiceMailPlayBackEvent
     */
    private VoiceMailPlayBackEventHandler;
    /**
     * Get the details of calling agent in case of inbound voice interaction
     * @param ani - ani number(agent id)
     * @example getInboundAgentDetails
    */
    getInboundAgentDetails(ani: string): Promise<{}>;
    /**
     * Method to get all contacts
     * @example
     * ```
     * getAllContacts()
     * ```
     */
    getAllContacts(): {
        [key: string]: any;
    };
}
export {};
