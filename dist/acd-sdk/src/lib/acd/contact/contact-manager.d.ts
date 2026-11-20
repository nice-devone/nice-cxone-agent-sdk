import { CXoneVoiceContact } from './cxone-voice-contact';
import { Subject } from 'rxjs';
import { CallContactEvent, CXoneDisposition, CXoneSdkError, HttpResponse, CXoneDispositionDetails, TagsResponse, VoiceMailContactEvent, VoiceMailPlayBackEvent, CXoneMessage, WorkItemContactEvent, CXoneTypingMessageContent, CoBrowseEvent, MediaType, LocalPostEvent, LiveVoxErrorEvent } from '@nice-devone/common-sdk';
import { CXoneVoiceMailContact } from './cxone-voicemail-contact';
import { CXoneWorkItemContact } from './cxone-workitem-contact';
import { DispositionService, PersonalConnectionService, ContactService, VoiceService } from '@nice-devone/agent-sdk';
declare type CXoneContactType = CXoneVoiceMailContact | CXoneWorkItemContact | CXoneVoiceContact;
declare type ContactEventTypeAlias = VoiceMailContactEvent | WorkItemContactEvent | CallContactEvent;
/**
 * Class to handle the contacts
 */
export declare class ContactManager {
    private acdSession;
    private adminService;
    private voiceContactMap;
    private firstSeenMasterIds;
    private placeholderMasterIds;
    private supervisorContactSet;
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
    private allContacts;
    voiceCallRecordServicePollingEvent: Subject<boolean>;
    onVoiceTranscriptContactEndEvent: Subject<{
        contactId: string;
    }>;
    onLiveVoxErrorEvent: Subject<LiveVoxErrorEvent>;
    private renewStateSubscription;
    private isDisposed;
    private pendingMuteState;
    /**
     * Which skill id the metadata currently on a contact was resolved from.
     *
     * Keyed on the contact OBJECT, which is stable across events for all three channels — the same
     * instance is reused from the contact maps. So the entry is collected with the contact and there
     * is no cleanup path to forget, unlike a contactId-keyed Map.
     *
     * Compared against the contact's current skill id rather than merely checking that skillName is
     * populated, so a transfer or reskill still re-resolves.
     */
    private resolvedSkillFor;
    /**
     * In-flight enrichment per contact, so concurrent events share one lookup instead of racing.
     *
     * Sharing is conditional on `pendingSkillFor` matching — read the two together. A contact
     * reskilled mid-flight must NOT join the previous skill's lookup.
     */
    private pendingEnrichment;
    /**
     * Which skill id the in-flight enrichment is resolving.
     *
     * Needed because a contact can be reskilled WHILE a lookup is in flight — `assignToCurrentContact`
     * refreshes `skill` from every event on the same contact instance. Sharing an in-flight lookup is
     * only correct when it is for the same skill; otherwise the second event would wait on an answer
     * for a skill the contact no longer has, and never resolve its own.
     */
    private pendingSkillFor;
    /**
     * Voice contacts whose final Disconnected has already been emitted on voiceContactUpdateEvent.
     *
     * Used to stop a same-batch event's stale snapshot being emitted AFTER the final state: the
     * reducer has by then removed the contact and would re-add it as a live, non-final contact that
     * never ends (AW-67175). Keyed by the contact instance, which is reused for every event on a
     * contactId, so the entry is collected with the contact.
     */
    private finalEmittedFor;
    /**
     * Records that a final Disconnected is about to be emitted for a voice contact.
     *
     * @param emitted - the contact object being emitted (the live contact, or a clone of it)
     * @param owner - the live contact instance to record against; defaults to `emitted`
     * @example
     * ```
     * this.recordFinalEmission(ownEventSnapshot, voiceContact);
     * ```
     */
    private recordFinalEmission;
    /**
     * Whether a voice contact has already had its final Disconnected emitted but is now sitting in a
     * non-final state — i.e. a later same-batch event overwrote the shared instance after it ended.
     * Such a state must be neither published nor kept in voiceContactMap.
     *
     * @param contact - the live voice contact
     * @example
     * ```
     * if (this.isSupersededByFinal(voiceContact)) { ... }
     * ```
     */
    private isSupersededByFinal;
    /**
     * @example
     * ```
     * const contactManager = new ContactManager();
     * ```
     */
    constructor();
    /**
     * Disposes of subscriptions to prevent memory leaks when this instance is replaced.
     * Must be called before creating a new ContactManager instance.
     * @example
     * ```
     * contactManager.dispose();
     * ```
     */
    dispose(): void;
    /**
     * Method to create instance for voice and contact service and update agent permissions and call contact event
     */
    private initialize;
    /**
     * Method to subscribe to renew state events from the GetNextAdapter
     * This handles stuck contacts when icBranchValue === '3' is received
     * Uses dynamic import to avoid circular dependency
     */
    private subscribeToRenewStateEvents;
    /**
     * Handle renew state event - compares backend contacts with UI contacts to find and clear stuck contacts
     * @param backendContactIds - array of contact IDs currently active in the backend
     * @example
     * ```
     * handleRenewState(['contactId1', 'contactId2'])
     * ```
     */
    private handleRenewState;
    /**
     * Method to create contact event object based on contact type
     * @param contact - CXoneContactType (CXoneVoiceContact | CXoneVoiceMailContact | CXoneWorkItemContact)
     * @returns CallContactEvent | VoiceMailContactEvent | WorkItemContactEvent
     * @example
     * ```
     * createContactEventObject(contact)
     * ```
     */
    private createContactEventObject;
    /**
     * Maps CXoneVoiceContact to CallContactEvent
     * @param contact - CXoneVoiceContact instance
     * @returns CallContactEvent
     */
    private mapToCallContactEvent;
    /**
     * Maps CXoneVoiceMailContact to VoiceMailContactEvent
     * @param contact - CXoneVoiceMailContact instance
     * @returns VoiceMailContactEvent
     */
    private mapToVoiceMailContactEvent;
    /**
     * Maps CXoneWorkItemContact to WorkItemContactEvent
     * @param contact - CXoneWorkItemContact instance
     * @returns WorkItemContactEvent
     */
    private mapToWorkItemContactEvent;
    /**
     * Method to remove contact data from all maps and storage
     * @param contact - the contact to remove data for
     * @example - removeContactData(contact)
     */
    private removeContactData;
    /**
     * Method to clear a stuck contact from all maps and storage
     * @param contact - the contact to clear
     * @example
     * ```
     * clearContact(contact)
     * ```
     */
    private clearContact;
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
     * initialize LiveVoxError notify event handler - forwards the already-validated
     * LiveVoxErrorEvent published by CXoneGetNextAdapter.handleGetNextResponse
     * @example liveVoxErrorNotifyEventHandler
     */
    private liveVoxErrorNotifyEventHandler;
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
     * Method to check whether an Incoming voice contact carrying the Multi-Call Skill (Personal
     * Queue) flag is currently tracked
     *
     * AW-56681 regression fix: gated behind FeatureToggles.MULTIPLE_CALL_HANDLING_FEATURE_TOGGLE,
     * exactly as its sibling isMultiCallScenario() already is. `isMultiCallSkill` is parsed off the
     * CallContactEvent regardless of the toggle, so on a tenant with MCH OFF a server-side
     * MCA-flagged skill still set the flag here — which made the caller in ccf-assignment-panel
     * .slice.ts treat the contact as "MCA, requires manual accept" and skip connectAgentLeg(). With
     * the toggle off there is no MCA Accept banner to recover from that, so the agent leg stayed
     * DIALING and the agent got no audio. Fail-safe to the pre-MCH path on a disabled or unreadable
     * toggle, never the reverse.
     * @example checkIncomingMultiCallSkillContact
     */
    checkIncomingMultiCallSkillContact(): boolean;
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
     * Method to subscribe the supervisor (live/silent monitoring) contact event from the agentSession.
     * Unlike a regular voice contact, a supervisor contact is never rendered or dispositioned by the agent -
     * it only needs to be tracked so that it can be ended before a subsequent agent state change.
     */
    private supervisorContactEventHandler;
    /**
     * Method to subscribe to agent session lifecycle changes and clear any tracked supervisor
     * (live/silent monitoring) contact on session end or the start of a new session. The backend does
     * not reliably emit a matching Disconnected event for a supervisor contact, so without this a stale
     * entry from a prior session could survive and incorrectly trigger endAgentLeg() in a later session
     * that isn't actually being monitored.
     */
    private agentSessionChangeHandler;
    /**
     * Returns whether a supervisor (live/silent monitoring) contact is currently active on this session.
     * @example
     * ```
     * const isMonitored = contactManager.hasActiveSupervisorContact();
     * ```
     */
    hasActiveSupervisorContact(): boolean;
    /**
     * Clears all tracked supervisor (live/silent monitoring) contacts.
     * Called once the agent phone leg has been ended, since the backend does not
     * reliably emit a matching Disconnected event for a supervisor contact.
     * @example
     * ```
     * contactManager.clearActiveSupervisorContacts();
     * ```
     */
    clearActiveSupervisorContacts(): void;
    /**
     * Removes voice transcription data from IndexedDB for a specific contact.
     *
     * With the V3 multi-party toggle (AW-65928) the transcript is keyed by the master contact and
     * shared by every conference leg, so a single leg ending — including the original contact —
     * must not wipe it. It is only removed once no voice contact of that call remains.
     * @param contactId - contactId for which voice transcription to be removed
     * @param masterId - masterId of the ended contact; the key its transcript is stored under with V3 enabled
     */
    private removeVoiceTranscriptionFromIndexedDB;
    /**
     * Remembers the master id first reported for a voice leg. If that event carried no master (the leg's
     * own id is only a placeholder), the first real master on a later non-disconnect event replaces it;
     * after that, later reports are ignored, since a stale master has been seen on disconnect events.
     * @param callContactEvent - The voice contact event.
     * @example this.rememberFirstSeenMasterId(callContactEvent)
     */
    private rememberFirstSeenMasterId;
    /** Method to remove bio hub data from local storage when call gets disconnected
     * @param contactKeys - contact keys available in voice contact map
     * @example removeBioHubFromLocalStorage(contactKeys)
     **/
    private removeBioHubFromLocalStorage;
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
    * Method to get Smartreach dispositions for CallContactEvents
    * @param skillId - skill id to fetch the skill dispositions
    * @param contactId - used to fetch disposition
    * @param mediaType - media type to fetch the dispositions
    * @example -
    * ```
    *getSmartReachDispositionsOnContactEvent(1234, 4321, MediaType.VOICE)
    * ```
    */
    private getSmartReachDispositionsOnContactEvent;
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
     * Used to get the disposition based on the skill id provided
     * @param skillId - skill id to fetch the skill details
     * @param mediaType - media type
     * @example -
     * ```
     * cxoneClient.contactManager.getDispositionsWithCategories("123456");
     * ```
     */
    getDispositionsWithCategories(skillId: string, mediaType: MediaType): Promise<CXoneDisposition[] | CXoneSdkError>;
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
     * MCH (AW-63605): true when more than one INDEPENDENT top-level call is currently tracked —
     * mirrors the React layer's selectIsMultiCallScenario definition exactly (both count
     * `callType === Regular || PersonalQueue`; NaturalCalling/outbound calls are explicitly out of
     * scope for this check, per AW-63118 rev.3). SDK-level flicker suppression must key off this
     * SESSION-WIDE scenario, not a single contact's own isMultiCallSkill flag, so a mixed-mode
     * session (a non-MCA call held alongside an active MCA call) suppresses the flicker identically
     * for both call types.
     *
     * AW-63118 (rev.3): gated behind FeatureToggles.MULTIPLE_CALL_HANDLING_FEATURE_TOGGLE and
     * anchored to at least one tracked contact actually carrying isMultiCallSkill=true. Previously
     * this method was ungated, count-only, and also counted NaturalCalling calls (a definitional
     * drift from the React selector, which never did) — three issues fixed together here: an active
     * off-path regression (the toggle had no effect here), a false-positive gap (a non-MCH
     * consult/transfer leg alone could trip it), and this NaturalCalling drift. This formula must
     * stay in sync with selectIsMultiCallScenario in ccf-assignment-panel.slice.ts, which already
     * cross-references this method by name.
     *
     * AW-63106: PersonalQueue added alongside Regular — a reskilled call is delivered with
     * `CallType.PersonalQueue`, and excluding it here left a genuine Regular + PersonalQueue
     * multi-call scenario undetected.
     * @returns true when more than one independent call is tracked
     * @example - this.isMultiCallScenario()
     */
    private isMultiCallScenario;
    /**
     * Update Mute button state for voice contacts.
     * Agent mute is a global (session-level) operation, so mute/unmute applies to EVERY call
     * routed to the agent — including MCA (multi-call) calls that are currently on hold. Each
     * contact therefore carries the agent's mute state so it is reflected when that call becomes
     * active (e.g. on resume / switch).
     */
    private updateMuteState;
    /**
     * Update the record state for voice contacts.
     * @param isRecording - boolean value to indicate if the call is being recorded
     * @param contactId - the specific contact this recording notification is for. Unlike agent mute
     *   (a true session-level state — the agent's own mic applies to every call), a recording/
     *   masking transition belongs to ONE specific call. When contactId resolves to a tracked
     *   contact, only that call's own legs (everything sharing its masterID, e.g. a conference's
     *   members) are updated — every other independent call is left untouched. Falling back to the
     *   old broadcast-to-everyone behavior when contactId is omitted/unresolved preserves the
     *   original (pre-MCH, single-call) behavior for any caller that can't supply one.
     * @example
     * ```
     * contactManager.updateVoiceCallRecordState(true, '12345');
     * ```
     */
    updateVoiceCallRecordState(isRecording: boolean, contactId?: string): void;
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
     * Whether contact events should be de-duplicated — i.e. published exactly once per contact
     * event, with skill metadata already resolved, rather than published and then re-published
     * once the skill lookup returns.
     *
     * Read synchronously, matching how the SmartReach toggle is read in callContactEventHandler:
     * this sits on the contact-event path and must not introduce an await.
     *
     * OFF reproduces today's emission behaviour, including the double publish, so it is the only
     * rollback for this capability that does not require a release. `acd-sdk` is a module-federation
     * shared singleton, so the change lands for every MFE host at once and there is no per-app
     * opt-out.
     *
     * @returns true when the de-duplicated single-emission path should be used
     * @example
     * ```
     * if (this.isDedupeEnabled()) await this.enrichWithSkillDetails(contact);
     * ```
     */
    private isDedupeEnabled;
    /**
     * Bound race against a skill lookup, so a slow or hung skills API cannot delay a contact
     * reaching the agent by more than the budget.
     *
     * The underlying request is NOT cancelled — see AW-63582's follow-up on request cancellation. A
     * late response still lands harmlessly: it assigns onto the retained contact and emits nothing.
     *
     * @param promise - the lookup to bound
     * @param timeoutMs - the budget
     * @returns the lookup result, or a rejection with SkillLookupTimeoutError
     */
    private withTimeout;
    /**
     * Whether the contact already carries skill metadata resolved from its CURRENT skill id.
     *
     * True for every event after a contact's first, which is what makes pre-publish enrichment
     * affordable: hold, mute, masking, joined and disconnect all skip the lookup entirely — no HTTP,
     * no added latency.
     *
     * @param contact - the contact to test
     * @param policy - the channel policy for that contact
     * @returns true when no lookup is needed
     */
    private isSkillMetadataResident;
    /**
     * Drop skill metadata that describes a DIFFERENT skill than the contact now carries.
     *
     * A failed lookup must not leave the previous queue's name on a contact that has been transferred
     * or reskilled — the agent would see a call labelled with the wrong queue, and requireDisposition,
     * maxSecondsACW and acwTypeId would be wrong in the same way. Preserving resident values is
     * correct only when re-resolving the SAME skill id.
     *
     * @param contact - the contact whose metadata may now be stale
     * @param policy - the channel policy for that contact
     * @param skillId - the skill id whose lookup just failed
     */
    private discardStaleSkillDetails;
    /**
     * Resolve skill metadata onto a contact BEFORE it is published, so one contact event can carry
     * it and no second, corrective event is needed.
     *
     * ⚠️ This method must never throw and never emit. Every path resolves. A rejection escaping here
     * would propagate into the contact-event handler and skip publishContact — the agent would stop
     * seeing calls. It would only happen when the skills API is already broken, which is exactly when
     * nobody is looking at this code.
     *
     * @param contact - the contact to enrich in place
     * @example
     * ```
     * await this.enrichWithSkillDetails(voiceContact);
     * this.publishContact(voiceContact);
     * ```
     */
    private enrichWithSkillDetails;
    /**
     * Shallow, same-prototype copy of a voice contact. Used to recover an event's own state (see
     * AW-66141) before a same-tick sibling event can overwrite it on the shared instance.
     * @param contact - the contact to copy
     */
    private cloneVoiceContact;
    /**
     * Copy the skill metadata fields enrichWithSkillDetails may have resolved onto `source` across to
     * `target`. Keeps a recovered event snapshot (AW-66141) from publishing stale skill metadata,
     * without also carrying over control-state fields that belong to a later event.
     * @param source - the live contact enrichment just ran against
     * @param target - the recovered snapshot to update in place
     */
    private copySkillMetadata;
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
