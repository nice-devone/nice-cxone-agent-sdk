import { AnyAction, Slice } from '@reduxjs/toolkit';
import { VoiceContactStatus, MediaType, ContactData, AttachmentType, AgentDetails, AgentLegStatus, CXoneSdkError, HttpResponse, CustomerCardExpandType, CXoneDigitalContactUserSavedProperties, CXoneMessageArray, UserInfo, CXoneAttachment, AgentQueuesDetail, VoiceMailContactEvent, CXoneMessageDraftsArray, CXoneMessage, CXonePublicMessage, WorkItemContactEvent, CXoneDigitalMessageTag, CXoneCase, CXoneRoutingQueue, SLAIndicatorType, CXoneLoadPreviousContactDetails, FailedMessageDetails, CXoneDigitalReplyChannel, CXoneMessageWithTranslation, Interactions, AssignmentPanelMetadata, InteractionType, CXoneContactCustomFieldDefinition, Contacts, VoiceBioHubDataResponse, VoiceBioAgentActionRequest, CustomParamsObject, CXoneAttachmentArray } from '@nice-devone/common-sdk';
import { CallType } from '@nice-devone/agent-sdk';
import { AgentSettings } from '@nice-devone/core-sdk';
import { SortingParameters } from '@nice-devone/ui-controls';
import { CcfTranslationKey } from '@nice-devone/i18n';
import { CXoneDigitalContact } from '@nice-devone/digital-sdk';
import { CXoneVoiceContact, CXoneVoiceMailContact, CXoneWorkItemContact } from '@nice-devone/acd-sdk';
export declare const ASSIGNMENT_KEY = "inbox";
export declare const PREVIEW_CASES = "previewCases";
interface VoiceBioHubPayload {
    patronId: string;
    requestType: number;
    voiceBioConfigName: string;
    OptOutReason?: string;
    contactId: string;
    CustomParams: CustomParamsObject;
    stringParams: string;
}
export interface updateInboxCollapsed {
    isInboxCollapsed?: boolean;
    isLargeView?: boolean;
}
export interface incomingContactProperties {
    contactId: string;
    caseId?: string;
    media: Exclude<MediaType, MediaType.EMAIL>;
    isOutbound?: boolean;
}
interface ContactMessageNote {
    status: boolean;
    content: string;
    noteId?: string;
}
export interface TranslationSettingsRecord {
    customerLanguage: {
        [key: string]: string;
    };
    agentLanguage: {
        [key: string]: string;
    };
    isTranslateCustomerMessages: boolean;
    isTranslateAgentMessages: boolean;
}
export interface DraftMessageNotesProperties {
    [interactionId: string]: {
        [caseId: string]: ContactMessageNote;
    };
}
export declare type DetailedDigitalContactData = {
    [interactionId: string]: {
        [caseId: string]: CXoneDigitalContact;
    };
};
export declare type TranslatedDigitalContactMessages = {
    [interactionId: string]: {
        [caseId: string]: CXoneMessageWithTranslation[];
    };
};
export declare type TranslationSettings = {
    [interactionId: string]: {
        [caseId: string]: TranslationSettingsRecord;
    };
};
/**
 * Interface for message action response
 */
export interface MessageActionResponse {
    isError: boolean;
    messageKey: CcfTranslationKey;
    placeholder?: string;
}
export interface digitalTagPopOverPositionAttributes {
    top: number;
    left: number;
}
export interface addedDigitalTagDetails {
    messageId: string;
    isNewDigitalTagAdded: boolean;
}
export interface CXoneVoiceContactDetailsMap {
    [contactId: string]: CXoneVoiceContact;
}
/**
 * Interface for holding digital contact user saved properties along with caseId
 */
export interface CXoneDigitalContactUserSavedPropertiesMap {
    [caseId: string]: CXoneDigitalContactUserSavedProperties;
}
export interface AssignmentState {
    cxoneInteractions: Interactions;
    assignmentPanelMetadata: AssignmentPanelMetadata;
    contactsActiveCollapse: CustomerCardExpandType[];
    isInboxCollapsed?: boolean;
    selectedContactId: string | null;
    cxoneVoiceContactDetails: CXoneVoiceContact;
    allCxoneVoiceContactDetails: CXoneVoiceContactDetailsMap;
    cxoneVoiceMailContactDetails: CXoneVoiceMailContact;
    cxoneVoiceMailContactEventDetails: VoiceMailContactEvent;
    cxoneWorkItemContactDetails: CXoneWorkItemContact;
    cxoneWorkItemContactEventDetails: WorkItemContactEvent;
    cxoneWorkItemContacts: CXoneWorkItemContact[];
    cxoneDigitalContactDetails: DetailedDigitalContactData;
    cxoneDigitalContactUserSavedProperties: CXoneDigitalContactUserSavedPropertiesMap;
    agentLegStatus: AgentLegStatus | null;
    agentLegId: string;
    isKeyPadOpen: boolean;
    callConferenceDetails: CallConference;
    consultedAgents: AgentDetails[];
    isAgentLegAutoAcceptEnabled: boolean;
    ctdDisplayError: boolean;
    cxonePersonalQueue: AgentQueuesDetail[];
    newIncomingContact: incomingContactProperties | null;
    networkSpeed: number;
    isNewMessageAdded: string;
    isColdTransfer: boolean;
    isEmailDraftSent: boolean;
    messageActionResponse: MessageActionResponse;
    digitalMessageTags: CXoneDigitalMessageTag[];
    digitalMessageTagsCount: number;
    digitalMessageTagsCurrentPage: number;
    digitalMessageTagsByName: CXoneDigitalMessageTag[];
    digitalMessageTagError: boolean;
    digitalTagLoading: boolean;
    newDigitalTagAddedDetails: addedDigitalTagDetails;
    digitalTagPopOverPosition: digitalTagPopOverPositionAttributes;
    isDigitalTagsExpanded: boolean;
    updatedNoteValue: string;
    interactionFailedMessages: {
        [caseId: string]: Array<FailedMessageDetails>;
    };
    inboundCallingAgentInfo: any;
    activeThreadId: string | undefined;
    activeContactId: string | undefined;
    translatedMessages: TranslatedDigitalContactMessages;
    translationSettings: TranslationSettings;
    draftMessageNotes: DraftMessageNotesProperties;
    isInteractionNavigationKeyPressed: boolean;
    isInteractionAcceptKeyPressed: boolean;
    isInteractionRejectKeyPressed: boolean;
    interactionDraftMessages: {
        [caseId: string]: Array<CXoneMessage>;
    };
    cxoneVoiceBioHubData: VoiceBioHubDataResponse;
    isModalOpen: boolean;
    isExternalDirectoryTransfer: boolean;
    setContactHistoryInIndexDb: boolean;
}
export interface Participant {
    name: string;
    designation: 'Customer' | 'Agent';
    contact: CXoneVoiceContact;
}
export interface CXoneVoiceContactCustomerInfo {
    contactId: string;
    customerName: string;
}
export interface CallConference {
    status: CallType | VoiceContactStatus;
    text: string;
    usersInConference: Participant[];
    userInLobby?: Participant;
    userInConsult?: Participant;
    userInCall?: Participant;
    tileDirection: boolean;
    isActiveConference?: boolean;
}
export declare const initialCallConferenceState: CallConference;
/**
 * This interface is for SLA Details
 */
export interface SLADetail {
    /**
   * Reset customer time
   */
    resetCRT: number;
}
/**
* This interface is for the SLA Map
*/
export interface ContactSLAMap {
    /**
    * Contact Id
    */
    [contactId: string]: SLADetail;
}
/**
* This interface is for the contact SLA details
*/
export interface ContactsSLADetails {
    /**
    * SLA Contact Details
    */
    slaContactDetails: ContactSLAMap;
}
/**
* This interface is for the interaction dummy messages
*/
export interface InteractionDraftMessages {
    /**
     * It comprises of key value pair where key is caseId and value is of type CXoneMessage
     */
    [caseId: string]: Array<CXoneMessage>;
}
export declare const initialAssignmentState: AssignmentState;
/**
 * agentDetailsByAgentId asyncthunk used to get Agent Details by using agentId from sdk.
 * @example - `dispatch(agentDetailsByAgentId({agentId:123456}))`
 */
export declare const agentDetailsByAgentId: import("@reduxjs/toolkit").AsyncThunk<void, {
    agentId: string;
}, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
/**
 * Thunk action creator to fetch customer details by id
 *
 * @param args - client ID and auth code
 * ```
 * @example
 *  dispatch(
      getCustomerDetailsByIdForContactCard(customerID, props.contact)
    );
 * ```
 */
export declare const getCustomerDetailsByIdForContactCard: import("@reduxjs/toolkit").AsyncThunk<void, {
    customerId: string;
    contactId: string;
    interactionId?: string | undefined;
}, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
export declare const updateFileToBeUploaded: import("@reduxjs/toolkit").AsyncThunk<void, {
    fileList: FileList;
    uuidList?: string[] | undefined;
    isForwardedAttachment?: boolean | undefined;
}, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
/**
 * updateInlineImageToBeUploaded is an asyncthunk used to handle the update of inline images to be uploaded in the inbox.
 * This thunk is typically dispatched to update the state with new inline images.
 * @example - dispatch(updateInlineImageToBeUploaded(parsedList));
 */
export declare const updateInlineImageToBeUploaded: import("@reduxjs/toolkit").AsyncThunk<void, FileList, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
/**
 * switchAgentUser - asyncthunk used to switch lobby and consult
 * @example - dispatch(SwitchAgentUser(userInLobby,userInConsult))
 */
export declare const switchAgentUser: import("@reduxjs/toolkit").AsyncThunk<{
    userInLobby: CXoneVoiceContact;
    userInConsult: CXoneVoiceContact;
}, {
    userInLobby: CXoneVoiceContact;
    userInConsult: CXoneVoiceContact;
}, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
/**
 * getWebRtcServiceUrls async used to get service URLs for WebRTC
 * @example - dispatch(getWebRtcServiceUrls())
 */
export declare const getWebRtcServiceUrls: () => Promise<{
    agentId: string;
    agentSettings: AgentSettings;
    userInfo: UserInfo;
} | null>;
export declare const initiateWebRTC: import("@reduxjs/toolkit").AsyncThunk<void, void, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
export declare const agentLegAutoAcceptEnabledPermission: import("@reduxjs/toolkit").AsyncThunk<boolean, void, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
export declare const acceptContact: import("@reduxjs/toolkit").AsyncThunk<void, string, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
export declare const acceptAndActivateWorkItemContact: import("@reduxjs/toolkit").AsyncThunk<void, string, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
export declare const acceptIncomingDigitalContact: import("@reduxjs/toolkit").AsyncThunk<void, {
    interactionId?: string | undefined;
    contactId: string;
}, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
export declare const activateContactAction: import("@reduxjs/toolkit").AsyncThunk<void, string, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
/**
 * callPlaced asyncthunk used to set PC out of network contact status
 * @example - dispatch(callPlaced(contactId))
 */
export declare const callPlaced: import("@reduxjs/toolkit").AsyncThunk<void, string, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
/**
 * outcomeSelection asyncthunk used to handle outcome selections.
 * @example - dispatch(outcomeSelection(\{outcome: 'Answered Call', contactId: 123456\}))
 */
export declare const outcomeSelection: import("@reduxjs/toolkit").AsyncThunk<void, {
    outcome: string;
    contactId: string;
}, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
/**
 * rescheduleCall asyncthunk used to reschedule out of network call
 * @example - dispatch(rescheduleCall(contactId))
 */
export declare const rescheduleCall: import("@reduxjs/toolkit").AsyncThunk<void, {
    contactId: string;
    dispositionId: number;
    callbackNumber: string | undefined;
    callbackTime: string;
    rescheduleCallNotes: string;
}, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
/**
 * snoozePcContact asyncthunk used to snooze PC contact
 * @example - dispatch(snoozePcContact(contactId))
 */
export declare const snoozeContact: import("@reduxjs/toolkit").AsyncThunk<void, string, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
/**
 * rejectIncomingDigitalContact asyncthunk used to reject incoming digital contact
 * @example - dispatch(rejectIncomingDigitalContact(contactId))
 */
export declare const rejectIncomingDigitalContact: import("@reduxjs/toolkit").AsyncThunk<void, {
    interactionId?: string | undefined;
    contactId: string;
}, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
/**
 * rejectIncomingContact asyncthunk used to reject incoming contact
 * @example - dispatch(rejectContact(contactId))
 */
export declare const rejectContact: import("@reduxjs/toolkit").AsyncThunk<void, {
    contactId: string;
    mediaType: MediaType;
}, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
/**
 * calls a method to accept a call for consult
 * @param contactId -contactId
 * @returns - State
 * @example
 * ```
 * acceptConsultCall(contactId)
 * ```
 */
export declare const acceptConsultCall: (contactId: string) => Promise<CXoneSdkError | HttpResponse>;
/**
 * Get forward attachments as File
 * @param attachment - attachment reveived in message
 * @example
 * ```
 * getForwardedAttachments(attachment)
 * ```
 */
export declare const getForwardedAttachments: (attachment: CXoneAttachment) => Promise<File>;
/**
 * Get blob data of attachment to be downloaded
 * Few channels like Instagram require no token due to open CDN
 * @param url - attachment accessing url
 * @example
 * ```
 * downloadAttachment(url, isTokenRequired)
 * ```
 */
export declare const downloadAttachment: (url: string, isTokenRequired?: boolean) => Promise<CXoneSdkError | HttpResponse>;
/**
 * Get blob data of attachment to be downloaded
 * Few channels like Instagram require no token due to open CDN
 * @param attachmentIds - list of attachment ids
 * @example
 * ```
 * downloadAllAttachment(['5846adee-70de-4463-9755-ef23d006b67d','3fc84c90-3301-11ef-a1bf-c739f8d018c2'])
 * ```
 */
export declare const downloadAllAttachment: (attachmentIds: string[]) => Promise<CXoneSdkError | HttpResponse>;
/**
 * Function to delete data from digital_contact_saved_props from local storage based on case id
 * @param caseId - string - this is case id of digital contact
 * @example
 * ```
 * deleteDigitalContactSavedPropsFromLS('203445080426')
 * ```
 */
export declare const deleteDigitalContactSavedPropsFromLS: (caseId: string) => void;
/**
 * This thunk calls the updateMessageReadStatus async method to mark isRead flag to true for a focused digital contact
 * @param args - interactionId and caseId of the selected contact
 * @example - dispatch(updateDigitalMessageReadStatus(interactionId: string, caseId: string)
 */
export declare const updateDigitalMessageReadStatus: import("@reduxjs/toolkit").AsyncThunk<void, {
    interactionId: string;
    caseId: string;
}, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
/**
 * This method fetchs list of all the message tags
 * @param state - InboxState
 * @returns array of all the digital message tags
 * @example getDigitalMessageTag
 */
export declare const getDigitalMessageTag: import("@reduxjs/toolkit").AsyncThunk<import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
    id: import("yup/lib/number").RequiredNumberSchema<number, import("yup/lib/types").AnyObject>;
    title: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    color: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
}>>[], void, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
/**
 * This method fetchs list of all the message tags by page number
 * @param state - InboxState
 * @returns array of all the digital message tags
 * @example getDigitalMessageTagsByPageNumber(1)
 */
export declare const getDigitalMessageTagsByPageNumber: import("@reduxjs/toolkit").AsyncThunk<HttpResponse, number, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
/**
 * This method fetchs list of all the matching message tags
 * @param state - InboxState
 * @returns array of all matching digital message tags
 * @example searchDigitalMessageTagByName('test')
 */
export declare const searchDigitalMessageTagByName: import("@reduxjs/toolkit").AsyncThunk<import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
    id: import("yup/lib/number").RequiredNumberSchema<number, import("yup/lib/types").AnyObject>;
    title: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    color: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
}>>[], {
    tagName: string;
}, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
/**
 * This method adds a tag to specific message id
 * @param state - InboxState
 * @example addDigitalMessageTag('675757575','9898')
 */
export declare const addDigitalMessageTag: import("@reduxjs/toolkit").AsyncThunk<number, {
    messageId: string;
    tagId: number;
}, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
/**
 * This method removes a tag from specific message id
 * @param state - InboxState
 * @example removeDigitalMessageTag('675757575','9898')
 */
export declare const removeDigitalMessageTag: import("@reduxjs/toolkit").AsyncThunk<HttpResponse, {
    messageId: string;
    tagId: number;
}, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
/**
 * call focus service for selected contact
 * @param contactId - string
 * @example
 * ```
 * dispatch(focusContact(contactId))
 * ```
 */
export declare const focusContact: import("@reduxjs/toolkit").AsyncThunk<void, string, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
/**
 * call defocus service for selected contact
 * @param contactId - string
 * @example
 * ```
 * dispatch(deFocusContact(contactId))
 * ```
 */
export declare const deFocusContact: import("@reduxjs/toolkit").AsyncThunk<void, string, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
/**
 * This function is used to load previous case conversations
 * @param previousContactData - interactionId and selectedCaseId of the selected contact, contactId as the contactId whose previous case details needs to loaded
 * @example - dispatch(loadPreviousCaseConversations('123','234','456'))
 */
export declare const loadPreviousCaseConversations: import("@reduxjs/toolkit").AsyncThunk<void, {
    interactionId: string;
    selectedCaseId: string;
    contactId: string;
}, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
/**
 * This function is used to load next case conversations
 * @param nextContactData - interactionId and selectedCaseId of the selected contact, contactId as the contactId whose previous case details needs to loaded
 * @example - dispatch(loadNextCaseConversations('123','234','456'))
 */
export declare const loadNextCaseConversations: import("@reduxjs/toolkit").AsyncThunk<void, {
    interactionId: string;
    selectedCaseId: string;
    contactId: string;
}, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
/**
 * This function is used to fetch previous and next caseIds for the current case
 * @param previousContactData - interactionId and selectedCaseId of the selected contact, contactId as the contactId whose previous and next caseIds needs to fetched
 * @example - dispatch(getPreviousAndNextCaseIds(interactionId, contactId, selectedCaseId)
 */
export declare const getPreviousAndNextCaseIds: import("@reduxjs/toolkit").AsyncThunk<void, {
    interactionId: string;
    selectedCaseId: string;
    contactId: string;
}, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
/**
 * Get the details of calling agent in case of inbound voice interaction
 * @param ani - ani number(agent id)
 * @example
 * ```
 * getConsultingAgentDetails(ani)
 * ```
 */
export declare const getConsultingAgentDetails: import("@reduxjs/toolkit").AsyncThunk<{}, string, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
/**
 * This function is used to fetch the contact details
 * @param contactId - contactId of the selected contact
 * @example - dispatch(getContactDetailsForSelectedContact(contactId = '123', isAssignedToAgentInbox = false))
 */
export declare const getContactDetailsForSelectedContact: import("@reduxjs/toolkit").AsyncThunk<void, {
    contactId: string;
    isAssignedToAgentInbox?: boolean | undefined;
    forceFetch?: boolean | undefined;
}, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
/**
 * This function is used to dismiss the preview cases
 * @param contactDetails- contact details object
 * @example - dispatch(dismissPreviewContact(contactDetails))
 */
export declare const dismissPreviewContact: import("@reduxjs/toolkit").AsyncThunk<void, CXoneDigitalContact, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
/**
 * call for to get the response of voice bio hub
 * @param custID - string or number
 * @param requestType - number
 * @example
 * ```
 * dispatch(voiceBioHubData(custID, requestType))
 * ```
 */
export declare const getVoiceBioHubData: import("@reduxjs/toolkit").AsyncThunk<void, VoiceBioHubPayload, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
/**
 * call for to get the response of voice bio hub
 * @param contactId - string or number
 * @param voiceBioConfigName - number
 * @example
 * ```
 * dispatch(voiceBioHubAgentLogin())
 * ```
 */
export declare const voiceBioHubAgentLogin: import("@reduxjs/toolkit").AsyncThunk<void, VoiceBioAgentActionRequest, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
/**
 * call for agent logout of voice bio hub
 * @param contactId - string or number
 * @param voiceBioConfigName - number
 * @example
 * ```
 * dispatch(voiceBioHubAgentLogout())
 * ```
 */
export declare const voiceBioHubAgentLogout: import("@reduxjs/toolkit").AsyncThunk<void, VoiceBioAgentActionRequest, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
export declare const AssignmentSlice: Slice<AssignmentState>;
export declare const CcfAssignmentAction: import("@reduxjs/toolkit").CaseReducerActions<import("@reduxjs/toolkit").SliceCaseReducers<AssignmentState>, string>;
export declare const CcfAssignmentReducer: import("redux").Reducer<AssignmentState, AnyAction>;
/**
 * Function to getTime
 * @param args - date received
 * @example - getTime(date);
 */
export declare const getTime: (date?: string | Date) => number;
export declare const getIsModalOpened: ((state: {
    inbox: AssignmentState;
}) => boolean) & import("reselect").OutputSelectorFields<(args_0: AssignmentState) => boolean & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const retrieveContactANI: ((state: {
    inbox: AssignmentState;
}) => any) & import("reselect").OutputSelectorFields<(args_0: AssignmentState) => any> & {
    clearCache: () => void;
};
export declare const getSilentANIAuth: ((state: {
    inbox: AssignmentState;
}) => boolean | undefined) & import("reselect").OutputSelectorFields<(args_0: AssignmentState) => (boolean | undefined) & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
/**
 * @param state - CxOneVoiceEventState
 * @example - addOrUpdateCXoneVoiceContact(event, action);
 * @returns - this returns state
 */
export declare const addOrUpdateCXoneVoiceContact: (state: AssignmentState, eventData: CXoneVoiceContact) => AssignmentState;
/**
 * Finds the interaction ID of the currently active PC call from the provided interactions and event data.
 *
 * @param cxoneInteractions - An object containing all current interactions, keyed by interaction ID.
 * @param eventData - The current CXone voice contact event data.
 * @returns The interaction ID of the active PC call if found; otherwise, an empty string.
 * @example - findTheActivePCCall(state.cxoneInteractions, eventData)
 *
 * The function first checks if the provided event data represents an active PC call.
 * If not, it iterates through all interactions and their associated ACD contacts to find an active PC call.
 */
export declare const findTheActivePCCall: (cxoneInteractions: Interactions, eventData: CXoneVoiceContact) => string;
/**
     * @example - getSortingParameters();
     * @returns - this returns sorting parameters
     */
export declare const getSortingParameters: () => SortingParameters;
/**
     * This method sets sorting parameters in localStorage
     * @param sortingParameters - SortingParameters
     * @example - setSortingParameters(sortingParameters);
     * @returns - this sets parameters of sorting in localStorage
     */
export declare const setSortingParametersInLocalStorage: (sortingParameters: SortingParameters) => void;
export declare const selectInboxCollapsedState: ((state: {
    inbox: AssignmentState;
}) => boolean | undefined) & import("reselect").OutputSelectorFields<(args_0: AssignmentState) => (boolean | undefined) & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const getVoiceBioHubStatus: ((state: {
    inbox: AssignmentState;
}) => string) & import("reselect").OutputSelectorFields<(args_0: AssignmentState) => string & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const getVoiceBioHubPatronId: ((state: {
    inbox: AssignmentState;
}) => string) & import("reselect").OutputSelectorFields<(args_0: AssignmentState) => string & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const getVoiceBioIsRetry: ((state: {
    inbox: AssignmentState;
}) => boolean | undefined) & import("reselect").OutputSelectorFields<(args_0: AssignmentState) => (boolean | undefined) & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const getVoiceBioHubStatusMessage: ((state: {
    inbox: AssignmentState;
}) => string) & import("reselect").OutputSelectorFields<(args_0: AssignmentState) => string & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const getVoiceBioHubCurrentRequestType: ((state: {
    inbox: AssignmentState;
}) => number) & import("reselect").OutputSelectorFields<(args_0: AssignmentState) => number & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const voiceContactKeypadState: ((state: {
    inbox: AssignmentState;
}) => boolean) & import("reselect").OutputSelectorFields<(args_0: AssignmentState) => boolean & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const isNewMessageAdded: ((state: {
    inbox: AssignmentState;
}) => string) & import("reselect").OutputSelectorFields<(args_0: AssignmentState) => string & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const getUpdatedNoteValue: ((state: {
    inbox: AssignmentState;
}) => string) & import("reselect").OutputSelectorFields<(args_0: AssignmentState) => string & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const getUpdatedCallerName: ((state: {
    inbox: AssignmentState;
}) => any) & import("reselect").OutputSelectorFields<(args_0: AssignmentState) => any> & {
    clearCache: () => void;
};
/**
 * This method is to select the conversation entity of message note
 * for the selected digital case
 * @param caseId - selected caseId for cotact
 * @param interactionId - selected interactionId for caseId
 * @returns messageNote for selcted case
 * @example - getmessageNoteForSelectedCase
 */
export declare const getmessageNoteForSelectedCase: (caseId: string, interactionId: string) => (state: {
    inbox: AssignmentState;
}) => {
    status: boolean;
    content: string;
    hasError?: boolean;
    noteId?: string;
    isNoteOpen?: boolean;
};
/**
 * This method is to select the conversation entity of message note
 * for the selected digital case
 * @param caseId - selected caseId for cotact
 * @param interactionId - selected interactionId for caseId
 * @returns messageNote for selcted case
 * @example - getDraftMessageNoteForSelectedCase
 */
export declare const getDraftMessageNoteForSelectedCase: (caseId: string, interactionId: string) => (state: {
    inbox: AssignmentState;
}) => {
    status: boolean;
    content: string;
    hasError?: boolean;
    noteId?: string;
    isNoteOpen?: boolean;
};
/**
 * This method is to select the case details for the selected case
 * @param caseId - selected caseId for cotact
 * @param interactionId - selected interactionId for caseId
 * @returns case details for selcted case
 * @example - getContactDetailsById
 */
export declare const getContactDetailsById: (caseId: string, interactionId: string) => (state: {
    inbox: AssignmentState;
}) => CXoneCase;
/**
 * This method is to select the skill details for the selected case
 * @param caseId - selected caseId for cotact
 * @param interactionId - selected interactionId for caseId
 * @returns skill details for selcted case
 * @example - getSkillDetailsByCaseId
 */
export declare const getSkillDetailsByCaseId: (caseId: string, interactionId: string) => (state: {
    inbox: AssignmentState;
}) => CXoneRoutingQueue;
export declare const getCollapsedCard: ((state: {
    inbox: AssignmentState;
}) => CustomerCardExpandType[]) & import("reselect").OutputSelectorFields<(args_0: AssignmentState) => CustomerCardExpandType[] & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const getCxoneDigitalContactUserSavedProperties: ((state: {
    inbox: AssignmentState;
}) => CXoneDigitalContactUserSavedPropertiesMap) & import("reselect").OutputSelectorFields<(args_0: AssignmentState) => CXoneDigitalContactUserSavedPropertiesMap & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const getAgentLegStatus: ((state: {
    inbox: AssignmentState;
}) => AgentLegStatus | null) & import("reselect").OutputSelectorFields<(args_0: AssignmentState) => (AgentLegStatus | null) & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const getAgentLegId: ((state: {
    inbox: AssignmentState;
}) => string) & import("reselect").OutputSelectorFields<(args_0: AssignmentState) => string & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
/**
 * Gets contact details from the state
 * @param contactId - CXone Contact Id
 * @returns Digital contact details
 * @example - Example
 * ```
 * let selectedDigitalContactDetails = useSelector(getDigitalContactDetailsByCaseId(selectedDigitalContactId));
 * ```
 */
export declare const getDigitalContactDetailsByCaseId: (caseId: string, interactionId: string) => (state: {
    inbox: AssignmentState;
}) => CXoneDigitalContact;
/**
 * Gets attachment details from the state for selected digital contact
 * @returns Attachment details
 * @example - Example
 * ```
 * let selectedDigitalContactAttachments = useSelector(getSelectedDigitalContactAttachments());
 * ```
 */
export declare const getSelectedDigitalContactAttachments: (caseId: string, interactionId: string) => (state: {
    inbox: AssignmentState;
}) => AttachmentType[] | undefined;
/**
 * Gets contact details from the state
 * @param contactId - CXone Contact Id
 * @returns Digital contact details
 * @example - Example
 * ```
 * let getDigitalContactMessagesByCaseId = useSelector(getDigitalContactMessagesByCaseId(selectedDigitalContactId));
 * ```
 */
export declare const getDigitalContactMessagesByCaseId: (caseId: string, interactionId: string) => (state: {
    inbox: AssignmentState;
}) => import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
    hasAdditionalMessageContent: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    attachments: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        fileName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        friendlyName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        isInline: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
        mimeType: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        previewUrl: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        securedPermanentUrl: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        url: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        canBeStored: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        blobUrl: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        fileName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        friendlyName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        isInline: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
        mimeType: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        previewUrl: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        securedPermanentUrl: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        url: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        canBeStored: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        blobUrl: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        fileName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        friendlyName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        isInline: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
        mimeType: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        previewUrl: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        securedPermanentUrl: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        url: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        canBeStored: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        blobUrl: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        fileName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        friendlyName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        isInline: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
        mimeType: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        previewUrl: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        securedPermanentUrl: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        url: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        canBeStored: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        blobUrl: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        fileName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        friendlyName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        isInline: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
        mimeType: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        previewUrl: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        securedPermanentUrl: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        url: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        canBeStored: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        blobUrl: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    }>>[]>;
    postId: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    threadId: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    messageContent: any;
    messageNotes: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        user: any;
        createdAt: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        updatedAt: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        content: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        currentAssignee: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        status: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>>>;
        message: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>>>;
    }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        user: any;
        createdAt: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        updatedAt: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        content: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        currentAssignee: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        status: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>>>;
        message: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>>>;
    }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        user: any;
        createdAt: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        updatedAt: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        content: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        currentAssignee: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        status: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>>>;
        message: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>>>;
    }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        user: any;
        createdAt: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        updatedAt: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        content: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        currentAssignee: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        status: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>>>;
        message: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>>>;
    }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        user: any;
        createdAt: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        updatedAt: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        content: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        currentAssignee: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        status: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>>>;
        message: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>>>;
    }>>[]>;
    direction: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    createdAt: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    deviceFingerprint: any;
    title: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    recipients: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        idOnExternalPlatform: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        name: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        isPrimary: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
        isPrivate: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
    }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        idOnExternalPlatform: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        name: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        isPrimary: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
        isPrivate: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
    }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        idOnExternalPlatform: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        name: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        isPrimary: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
        isPrivate: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
    }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        idOnExternalPlatform: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        name: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        isPrimary: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
        isPrivate: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
    }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        idOnExternalPlatform: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        name: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        isPrimary: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
        isPrivate: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
    }>>[]>;
    authorEndUserIdentity: any;
    authorUser: any;
    idOnExternalPlatform: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    isReplyAllowed: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    isRelatedMessage: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    threadIdOnExternalPlatform: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    url: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    isReplyToSpecificMessage: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    replyToMessage: any;
    isDeletedOnExternalPlatform: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
    isHiddenOnExternalPlatform: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
    reactionStatistics: any;
    isRead: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    tags: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        id: import("yup/lib/number").RequiredNumberSchema<number, import("yup/lib/types").AnyObject>;
        title: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        color: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        id: import("yup/lib/number").RequiredNumberSchema<number, import("yup/lib/types").AnyObject>;
        title: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        color: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        id: import("yup/lib/number").RequiredNumberSchema<number, import("yup/lib/types").AnyObject>;
        title: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        color: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        id: import("yup/lib/number").RequiredNumberSchema<number, import("yup/lib/types").AnyObject>;
        title: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        color: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        id: import("yup/lib/number").RequiredNumberSchema<number, import("yup/lib/types").AnyObject>;
        title: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        color: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    }>>[]>;
    _changes: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        fieldName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        currentValue: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
    }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        fieldName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        currentValue: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
    }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        fieldName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        currentValue: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
    }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        fieldName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        currentValue: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
    }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        /**
         * Gets contact details from the state
         * @param contactId - CXone Contact Id
         * @returns Digital contact details
         * @example - Example
         * ```
         * let getDigitalContactMessagesByCaseId = useSelector(getDigitalContactMessagesByCaseId(selectedDigitalContactId));
         * ```
         */
        fieldName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        currentValue: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
    }>>[]>;
    replyChannel: any;
    readAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    contactNumber: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    channel: any;
    channelName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    channelType: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    forward: any;
    xTraceId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    sentStatus: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    contentRemoved: any;
    authorNameRemoved: any;
    delivered: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        isSuccess: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        deliveredAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        reason: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        isSuccess: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        deliveredAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        reason: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        isSuccess: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        deliveredAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        reason: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        isSuccess: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        deliveredAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        reason: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        isSuccess: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        deliveredAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        reason: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    }>>[]>;
    customerStatistics: any;
}>>[];
/**
 * Gets contact status from the state
 * @param caseId - CXone Contact Id
 * @param interactionId - CXone interaction Id
 * @returns Digital contact status
 * @example - Example
 * ```
 * let getDigitalContactStatusByCaseId = useSelector(getDigitalContactStatusByCaseId(caseId, interactionId));
 * ```
 */
export declare const getDigitalContactStatusByCaseId: (caseId: string, interactionId: string) => (state: {
    inbox: AssignmentState;
}) => string | undefined;
/**
 * Gets parsed message contact details from the state. It adds the forwarded content for original message
 * @param caseId - CXone case Id
 * @param interactionId - CXone interaction Id
 * @returns Digital contact details
 * @example - let getParsedContactMessagesByCaseId = useSelector(getParsedContactMessagesByCaseId(selectedDigitalContactId));
 */
export declare const getParsedContactMessagesByCaseId: (caseId: string, interactionId: string) => (state: {
    inbox: AssignmentState;
}) => import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
    hasAdditionalMessageContent: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    attachments: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        fileName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        friendlyName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        isInline: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
        mimeType: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        previewUrl: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        securedPermanentUrl: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        url: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        canBeStored: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        blobUrl: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        fileName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        friendlyName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        isInline: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
        mimeType: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        previewUrl: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        securedPermanentUrl: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        url: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        canBeStored: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        blobUrl: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        fileName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        friendlyName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        isInline: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
        mimeType: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        previewUrl: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        securedPermanentUrl: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        url: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        canBeStored: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        blobUrl: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        fileName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        friendlyName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        isInline: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
        mimeType: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        previewUrl: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        securedPermanentUrl: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        url: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        canBeStored: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        blobUrl: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        fileName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        friendlyName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        isInline: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
        mimeType: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        previewUrl: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        securedPermanentUrl: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        url: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        canBeStored: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        blobUrl: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    }>>[]>;
    postId: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    threadId: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    messageContent: any;
    messageNotes: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        user: any;
        createdAt: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        updatedAt: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        content: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        currentAssignee: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        status: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>>>;
        message: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>>>;
    }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        user: any;
        createdAt: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        updatedAt: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        content: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        currentAssignee: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        status: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>>>;
        message: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>>>;
    }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        user: any;
        createdAt: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        updatedAt: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        content: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        currentAssignee: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        status: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>>>;
        message: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>>>;
    }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        user: any;
        createdAt: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        updatedAt: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        content: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        currentAssignee: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        status: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>>>;
        message: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>>>;
    }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        user: any;
        createdAt: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        updatedAt: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        content: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        currentAssignee: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        status: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>>>;
        message: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>>>;
    }>>[]>;
    direction: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    createdAt: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    deviceFingerprint: any;
    title: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    recipients: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        idOnExternalPlatform: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        name: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        isPrimary: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
        isPrivate: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
    }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        idOnExternalPlatform: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        name: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        isPrimary: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
        isPrivate: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
    }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        idOnExternalPlatform: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        name: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        isPrimary: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
        isPrivate: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
    }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        idOnExternalPlatform: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        name: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        isPrimary: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
        isPrivate: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
    }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        idOnExternalPlatform: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        name: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        isPrimary: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
        isPrivate: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
    }>>[]>;
    authorEndUserIdentity: any;
    authorUser: any;
    idOnExternalPlatform: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    isReplyAllowed: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    isRelatedMessage: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    threadIdOnExternalPlatform: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    url: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    isReplyToSpecificMessage: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    replyToMessage: any;
    isDeletedOnExternalPlatform: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
    isHiddenOnExternalPlatform: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
    reactionStatistics: any;
    isRead: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    tags: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        id: import("yup/lib/number").RequiredNumberSchema<number, import("yup/lib/types").AnyObject>;
        title: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        color: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        id: import("yup/lib/number").RequiredNumberSchema<number, import("yup/lib/types").AnyObject>;
        title: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        color: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        id: import("yup/lib/number").RequiredNumberSchema<number, import("yup/lib/types").AnyObject>;
        title: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        color: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        id: import("yup/lib/number").RequiredNumberSchema<number, import("yup/lib/types").AnyObject>;
        title: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        color: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        id: import("yup/lib/number").RequiredNumberSchema<number, import("yup/lib/types").AnyObject>;
        title: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        color: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    }>>[]>;
    _changes: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        fieldName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        currentValue: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
    }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        fieldName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        currentValue: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
    }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        fieldName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        currentValue: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
    }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        fieldName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        currentValue: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
    }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        /**
         * Gets contact details from the state
         * @param contactId - CXone Contact Id
         * @returns Digital contact details
         * @example - Example
         * ```
         * let getDigitalContactMessagesByCaseId = useSelector(getDigitalContactMessagesByCaseId(selectedDigitalContactId));
         * ```
         */
        fieldName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        currentValue: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
    }>>[]>;
    replyChannel: any;
    readAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    contactNumber: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    channel: any;
    channelName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    channelType: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    forward: any;
    xTraceId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    sentStatus: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    contentRemoved: any;
    authorNameRemoved: any;
    delivered: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        isSuccess: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        deliveredAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        reason: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        isSuccess: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        deliveredAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        reason: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        isSuccess: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        deliveredAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        reason: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        isSuccess: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        deliveredAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        reason: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        isSuccess: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        deliveredAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        reason: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    }>>[]>;
    customerStatistics: any;
}>>[];
/**
 * Gets translated messages for the caseId
 * @param caseId -
 * @param interactionId -
 * @returns translated messages
 * @example - Example
 * ```
 * let getTranslatedMessagesByCaseId = useSelector(getTranslatedMessagesByCaseId(selectedDigitalContactId));
 * ```
 */
export declare const getTranslatedMessagesByCaseId: (caseId: string, interactionId: string) => (state: {
    inbox: AssignmentState;
}) => CXoneMessageWithTranslation[];
/**
 * Gets translation settings for the caseId
 * @param caseId -
 * @param interactionId -
 * @returns translation settings
 * @example - Example
 * ```
 * let translationSettings = useSelector(getTranslationSettingsByCaseId(selectedDigitalCaseId, selectedDigitalInteractionId));
 * ```
 */
export declare const getTranslationSettingsByCaseId: (caseId: string, interactionId: string) => (state: {
    inbox: AssignmentState;
}) => TranslationSettingsRecord;
/**
 * Gets contact details from the state
 * @param contactId - CXone Contact Id
 * @returns Digital contact details
 * @example - Example
 * ```
 * let getDigitalContactMessagesByCaseId = useSelector(getDigitalContactMessagesByCaseId(selectedDigitalContactId));
 * ```
 */
export declare const getDigitalContactMessageByMessageId: (caseId: string, interactionId: string, messageId: string) => (state: {
    inbox: AssignmentState;
}) => import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
    hasAdditionalMessageContent: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    attachments: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        fileName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        friendlyName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        isInline: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
        mimeType: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        previewUrl: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        securedPermanentUrl: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        url: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        canBeStored: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        blobUrl: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        fileName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        friendlyName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        isInline: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
        mimeType: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        previewUrl: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        securedPermanentUrl: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        url: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        canBeStored: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        blobUrl: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        fileName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        friendlyName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        isInline: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
        mimeType: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        previewUrl: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        securedPermanentUrl: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        url: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        canBeStored: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        blobUrl: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        fileName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        friendlyName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        isInline: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
        mimeType: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        previewUrl: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        securedPermanentUrl: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        url: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        canBeStored: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        blobUrl: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        fileName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        friendlyName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        isInline: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
        mimeType: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        previewUrl: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        securedPermanentUrl: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        url: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        canBeStored: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        blobUrl: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    }>>[]>;
    postId: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    threadId: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    messageContent: any;
    messageNotes: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        user: any;
        createdAt: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        updatedAt: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        content: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        currentAssignee: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        status: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>>>;
        message: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>>>;
    }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        user: any;
        createdAt: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        updatedAt: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        content: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        currentAssignee: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        status: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>>>;
        message: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>>>;
    }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        user: any;
        createdAt: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        updatedAt: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        content: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        currentAssignee: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        status: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>>>;
        message: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>>>;
    }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        user: any;
        createdAt: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        updatedAt: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        content: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        currentAssignee: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        status: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>>>;
        message: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>>>;
    }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        user: any;
        createdAt: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        updatedAt: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        content: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        currentAssignee: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        status: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>>>;
        message: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>>>;
    }>>[]>;
    direction: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    createdAt: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    deviceFingerprint: any;
    title: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    recipients: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        idOnExternalPlatform: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        name: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        isPrimary: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
        isPrivate: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
    }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        idOnExternalPlatform: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        name: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        isPrimary: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
        isPrivate: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
    }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        idOnExternalPlatform: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        name: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        isPrimary: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
        isPrivate: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
    }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        idOnExternalPlatform: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        name: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        isPrimary: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
        isPrivate: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
    }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        idOnExternalPlatform: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        name: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        isPrimary: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
        isPrivate: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
    }>>[]>;
    authorEndUserIdentity: any;
    authorUser: any;
    idOnExternalPlatform: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    isReplyAllowed: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    isRelatedMessage: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    threadIdOnExternalPlatform: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    url: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    isReplyToSpecificMessage: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    replyToMessage: any;
    isDeletedOnExternalPlatform: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
    isHiddenOnExternalPlatform: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
    reactionStatistics: any;
    isRead: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    tags: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        id: import("yup/lib/number").RequiredNumberSchema<number, import("yup/lib/types").AnyObject>;
        title: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        color: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        id: import("yup/lib/number").RequiredNumberSchema<number, import("yup/lib/types").AnyObject>;
        title: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        color: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        id: import("yup/lib/number").RequiredNumberSchema<number, import("yup/lib/types").AnyObject>;
        title: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        color: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        id: import("yup/lib/number").RequiredNumberSchema<number, import("yup/lib/types").AnyObject>;
        title: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        color: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        id: import("yup/lib/number").RequiredNumberSchema<number, import("yup/lib/types").AnyObject>;
        title: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        color: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    }>>[]>;
    _changes: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        fieldName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        currentValue: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
    }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        fieldName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        currentValue: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
    }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        fieldName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        currentValue: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
    }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        fieldName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        currentValue: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
    }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        /**
         * Gets contact details from the state
         * @param contactId - CXone Contact Id
         * @returns Digital contact details
         * @example - Example
         * ```
         * let getDigitalContactMessagesByCaseId = useSelector(getDigitalContactMessagesByCaseId(selectedDigitalContactId));
         * ```
         */
        fieldName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        currentValue: import("yup/lib/mixed").MixedSchema<any, import("yup/lib/types").AnyObject, any>;
    }>>[]>;
    replyChannel: any;
    readAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    contactNumber: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    channel: any;
    channelName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    channelType: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    forward: any;
    xTraceId: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    sentStatus: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    contentRemoved: any;
    authorNameRemoved: any;
    delivered: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        isSuccess: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        deliveredAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        reason: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        isSuccess: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        deliveredAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        reason: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        isSuccess: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        deliveredAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        reason: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        isSuccess: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        deliveredAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        reason: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        isSuccess: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        deliveredAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        reason: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    }>>[]>;
    customerStatistics: any;
}>>[];
/**
 * Gets contact details from the state
 * @param contactId - CXone Contact Id
 * @param interactionId - interactionId of the contact
 * @returns Digital contact details
 * @example - Example
 * ```
 * let getDigitalContactMessageDraftsByCaseId = useSelector(getDigitalContactMessageDraftsByCaseId(selectedDigitalContactId));
 * ```
 */
export declare const getDigitalContactMessageDraftsByCaseId: (caseId: string, interactionId: string) => (state: {
    inbox: AssignmentState;
}) => import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
    createdAt: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    messageContent: any;
    isReplyToSpecificMessage: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    replyToMessage: any;
    user: any;
    isRefused: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
    messageNotes: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        user: any;
        createdAt: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        updatedAt: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        content: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        currentAssignee: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        status: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>>>;
        message: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>>>;
    }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        user: any;
        createdAt: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        updatedAt: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        content: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        currentAssignee: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        status: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>>>;
        message: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>>>;
    }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        user: any;
        createdAt: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        updatedAt: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        content: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        currentAssignee: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        status: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>>>;
        message: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            /**
             * Places a voice call on hold
             * @param voiceContact -CXoneVoiceContact
             * @example - placeVoiceCallOnHold()
             */
            id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>>>;
    }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        user: any;
        createdAt: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        updatedAt: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        content: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        currentAssignee: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        status: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>>>;
        message: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>>>;
    }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        user: any;
        createdAt: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        updatedAt: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        content: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        currentAssignee: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        status: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            type: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>>>;
        message: import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
            id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>>>;
    }>>[]>;
    tags: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        id: import("yup/lib/number").RequiredNumberSchema<number, import("yup/lib/types").AnyObject>;
        title: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        color: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        id: import("yup/lib/number").RequiredNumberSchema<number, import("yup/lib/types").AnyObject>;
        title: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        color: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        id: import("yup/lib/number").RequiredNumberSchema<number, import("yup/lib/types").AnyObject>;
        title: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        color: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        id: import("yup/lib/number").RequiredNumberSchema<number, import("yup/lib/types").AnyObject>;
        title: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        color: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        id: import("yup/lib/number").RequiredNumberSchema<number, import("yup/lib/types").AnyObject>;
        title: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        color: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    }>>[]>;
    attachments: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        fileName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        friendlyName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        isInline: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
        mimeType: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        previewUrl: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        securedPermanentUrl: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        url: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        canBeStored: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        blobUrl: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        fileName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        friendlyName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        isInline: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
        mimeType: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        previewUrl: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        securedPermanentUrl: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        url: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        canBeStored: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        blobUrl: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        fileName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        friendlyName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        isInline: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
        mimeType: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        previewUrl: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        securedPermanentUrl: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        url: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        canBeStored: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        blobUrl: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        fileName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        friendlyName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        isInline: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
        mimeType: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        previewUrl: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        securedPermanentUrl: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        url: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        canBeStored: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        blobUrl: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        id: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        fileName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        /**
         * @param state - CxOneVoiceMailEventState
         * @example - addOrUpdateCXoneVoiceMailContact(event, action);
         * @returns - this returns state
         */
        friendlyName: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        isInline: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
        mimeType: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        previewUrl: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        securedPermanentUrl: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        url: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        canBeStored: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        blobUrl: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    }>>[]>;
    channel: any;
    recipients: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        idOnExternalPlatform: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        name: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        isPrimary: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
        isPrivate: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
    }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        idOnExternalPlatform: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        name: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        isPrimary: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
        isPrivate: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
    }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        idOnExternalPlatform: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        name: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        isPrimary: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
        isPrivate: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
    }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        idOnExternalPlatform: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        name: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        isPrimary: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
        isPrivate: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
    }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        idOnExternalPlatform: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        name: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        isPrimary: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
        isPrivate: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
    }>>[]>;
    title: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    sentStatus: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    delivered: import("yup").ArraySchema<import("yup").ObjectSchema<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        isSuccess: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        deliveredAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        reason: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    }>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        isSuccess: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        deliveredAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        reason: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    }>>, import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        isSuccess: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        deliveredAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        reason: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    }>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        isSuccess: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        deliveredAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        reason: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    }>>[], import("yup/lib/object").AssertsShape<import("yup/lib/object").Assign<import("yup/lib/object").ObjectShape, {
        isSuccess: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        deliveredAt: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
        reason: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
    }>>[]>;
    customerStatistics: any;
    reason: import("yup").StringSchema<string, import("yup/lib/types").AnyObject, string>;
}>>[];
/**
 * Gets message draft attachments from the state
 * @param contactId - CXone Contact Id
 * @param interactionId - interactionId of the contact
 * @param messageDraftId - ID of the message draft
 * @returns Digital contact details
 * @example -
 * ```
 * let getDigitalContactMessageDraftAttachments = useSelector(getDigitalContactMessageDraftAttachments(selectedDigitalContactId));
 * ```
 */
export declare const getDigitalContactMessageDraftAttachments: (caseId: string, interactionId: string, messageDraftId: string) => (state: {
    inbox: AssignmentState;
}) => CXoneAttachmentArray | undefined;
/**
 * Gets previous case messages of the selected case
 * @param contactId - CXone Contact Id
 * @param interactionId - interactionId of the contact
 * @returns Digital contact details
 * @example - Example
 * ```
 * let previousConversationMessagesByCaseId = useSelector(getPreviousConversationMessagesByCaseId(selectedDigitalContactId));
 * ```
 */
export declare const getPreviousConversationMessagesByCaseId: (caseId: string, interactionId: string) => (state: {
    inbox: AssignmentState;
}) => CXoneLoadPreviousContactDetails[];
/**
 * Gets next case messages of the selected case
 * @param contactId - CXone Contact Id
 * @param interactionId - interactionId of the contact
 * @returns Digital contact details
 * @example - Example
 * ```
 * let getNextConversationMessagesByCaseId = useSelector(getNextConversationMessagesByCaseId(selectedDigitalContactId));
 * ```
 */
export declare const getNextConversationMessagesByCaseId: (caseId: string, interactionId: string) => (state: {
    inbox: AssignmentState;
}) => CXoneLoadPreviousContactDetails[];
/**
 * Gets previous caseId of the selected case
 * @param caseId - CXone CaseId
 * @param interactionId - interactionId of the contact
 * @returns Digital contact details
 * @example - Example
 * ```
 * let previousCaseId = useSelector(getPreviousCaseIdForSelectedCase(selectedDigitalContactId));
 * ```
 */
export declare const getPreviousCaseIdForSelectedCase: (caseId: string, interactionId: string) => (state: {
    inbox: AssignmentState;
}) => string | null | undefined;
/**
 * Gets next caseId of the selected case
 * @param caseId - CXone CaseId
 * @param interactionId - interactionId of the contact
 * @returns Digital contact details
 * @example - Example
 * ```
 * let nextCaseId = useSelector(getNextCaseIdForSelectedCase(selectedDigitalContactId));
 * ```
 */
export declare const getNextCaseIdForSelectedCase: (caseId: string, interactionId: string) => (state: {
    inbox: AssignmentState;
}) => string | null | undefined;
/**
 * Gets digitalReplyChannels details of the selected case
 * @param contactId - CXone Contact Id
 * @returns Digital contact details
 * @example
 * ```
 * let getDigitalReplyChannelsByCaseId = useSelector(getDigitalReplyChannelsByCaseId(selectedDigitalContactId));
 * ```
 */
export declare const getDigitalReplyChannelsByCaseId: (caseId: string, interactionId: string) => (state: {
    inbox: AssignmentState;
}) => CXoneDigitalReplyChannel[];
/**
 * Gets the type of file attached whether image or else
 * @param caseId - case Id
 * @returns Digital contact details
 * @example
 * ```
 * const isImageNotSupported = useSelector(getIsImageNotSupported(activeContact?.caseId as string))
 * ```
 */
export declare const getIsImageNotSupported: (caseId: string) => (state: {
    inbox: AssignmentState;
}) => boolean | undefined;
export declare const voiceContactSelector: ((state: {
    inbox: AssignmentState;
}) => CXoneVoiceContact) & import("reselect").OutputSelectorFields<(args_0: AssignmentState) => CXoneVoiceContact & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
/**
 * Gets the voice contact details for a given contactId
 * @param contactId - contactId
 * @returns Voice contact details
 * @example
 * ```
 * const voiceContact = useSelector(getVoiceContactDetailsById(contact?.contactId))
 * ```
 */
export declare const getVoiceContactDetailsById: (contactId: string) => ((state: {
    inbox: AssignmentState;
}) => CXoneVoiceContact) & import("reselect").OutputSelectorFields<(args_0: AssignmentState) => CXoneVoiceContact & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const voiceMailContactSelector: ((state: {
    inbox: AssignmentState;
}) => CXoneVoiceMailContact) & import("reselect").OutputSelectorFields<(args_0: AssignmentState) => CXoneVoiceMailContact & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const workItemContactSelector: ((state: {
    inbox: AssignmentState;
}) => CXoneWorkItemContact) & import("reselect").OutputSelectorFields<(args_0: AssignmentState) => CXoneWorkItemContact & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const digitalContactSelector: ((state: {
    inbox: AssignmentState;
}) => DetailedDigitalContactData) & import("reselect").OutputSelectorFields<(args_0: AssignmentState) => DetailedDigitalContactData & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
/**
 * Gets voicemail contact details from state
 * @param state - CXone Contact Id
 * @returns voicemail contact details
 * @example - Example
 * ```
 * let voiceMailContactDetails = useSelector(cxoneVoiceMailContactDetails());
 * ```
 */
export declare const voiceMailContactDetailsSelector: (state: {
    inbox: AssignmentState;
}) => CXoneVoiceMailContact;
/**
* Gets WorkItem contact details from state
* @param state - CXone Contact Id
* @returns WorkItem contact details
* @example - Example
* ```
* let WorkItemContactDetails = useSelector(workItemContactDetailsSelector());
* ```
*/
export declare const workItemContactDetailsSelector: (state: {
    inbox: AssignmentState;
}) => CXoneWorkItemContact;
/**
* Used to get selected interaction id
* @param rootState - getAssignmentState state
* @example - getSelectedInteraction();
*/
export declare const getSelectedInteraction: ((state: {
    inbox: AssignmentState;
}) => string | undefined) & import("reselect").OutputSelectorFields<(args_0: AssignmentState) => string & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
/**
* Used to get selected contact id on root level
* @param rootState - getAssignmentState state
* @example - getSelectedContactRoot();
*/
export declare const getSelectedContactRoot: ((state: {
    inbox: AssignmentState;
}) => string | null) & import("reselect").OutputSelectorFields<(args_0: AssignmentState) => string & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
/**
* Used to get if interaction navigation key is pressed or not
* @param rootState - getAssignmentState state
* @example - getInteractionNavKeyPressedStatus();
*/
export declare const getInteractionNavKeyPressedStatus: ((state: {
    inbox: AssignmentState;
}) => boolean) & import("reselect").OutputSelectorFields<(args_0: AssignmentState) => boolean & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
/**
 * Used to get if interaction accept key is pressed
 * @param rootState - getAssignmentState state
 * @example - getInteractionAcceptKeyPressedStatus();
 */
export declare const getInteractionAcceptKeyPressedStatus: ((state: {
    inbox: AssignmentState;
}) => boolean) & import("reselect").OutputSelectorFields<(args_0: AssignmentState) => boolean & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
/**
 * Used to get if external directory transfer is enabled
 * @param rootState - getAssignmentState state
 * @example - getIsExternalDirectoryTransfer();
 */
export declare const getIsExternalDirectoryTransfer: ((state: {
    inbox: AssignmentState;
}) => boolean) & import("reselect").OutputSelectorFields<(args_0: AssignmentState) => boolean & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
/**
 * Used to get if interaction accept key is pressed
 * @param rootState - getAssignmentState state
 * @example - getInteractionRejectKeyPressedStatus();
 */
export declare const getInteractionRejectKeyPressedStatus: ((state: {
    inbox: AssignmentState;
}) => boolean) & import("reselect").OutputSelectorFields<(args_0: AssignmentState) => boolean & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const getAllACDContactDetails: ((state: {
    inbox: AssignmentState;
} & {
    inbox: AssignmentState;
}) => {
    acwTypeId: number | undefined;
    skill: string;
}[]) & import("reselect").OutputSelectorFields<(args_0: number | undefined, args_1: string, args_2: number | undefined, args_3: string, args_4: number | undefined, args_5: string) => {
    acwTypeId: number | undefined;
    skill: string;
}[] & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const getCallConferenceState: ((state: {
    inbox: AssignmentState;
}) => CallConference) & import("reselect").OutputSelectorFields<(args_0: AssignmentState) => CallConference & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const selectCallConferenceStatus: ((state: {
    inbox: AssignmentState;
}) => VoiceContactStatus | CallType) & import("reselect").OutputSelectorFields<(args_0: CallConference) => (VoiceContactStatus | CallType) & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const selectCallConferenceTitleText: ((state: {
    inbox: AssignmentState;
}) => string) & import("reselect").OutputSelectorFields<(args_0: CallConference) => string & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const selectTileDirection: ((state: {
    inbox: AssignmentState;
}) => boolean) & import("reselect").OutputSelectorFields<(args_0: CallConference) => boolean & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const selectUserInConference: ((state: {
    inbox: AssignmentState;
}) => Participant[]) & import("reselect").OutputSelectorFields<(args_0: CallConference) => Participant[] & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const selectUserInCall: ((state: {
    inbox: AssignmentState;
}) => Participant | undefined) & import("reselect").OutputSelectorFields<(args_0: CallConference) => Participant & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const selectUserInConsult: ((state: {
    inbox: AssignmentState;
}) => Participant | undefined) & import("reselect").OutputSelectorFields<(args_0: CallConference) => Participant & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const selectUserInLobby: ((state: {
    inbox: AssignmentState;
}) => Participant | undefined) & import("reselect").OutputSelectorFields<(args_0: CallConference) => Participant & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const consultAgentInConference: ((state: {
    inbox: AssignmentState;
}) => Participant | undefined) & import("reselect").OutputSelectorFields<(args_0: Participant[]) => Participant & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const customerInConference: ((state: {
    inbox: AssignmentState;
}) => Participant) & import("reselect").OutputSelectorFields<(args_0: Participant[]) => Participant & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const agentLegAutoAcceptEnabled: ((state: {
    inbox: AssignmentState;
}) => boolean) & import("reselect").OutputSelectorFields<(args_0: AssignmentState) => boolean & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const getCtdDisplayError: ((state: {
    inbox: AssignmentState;
}) => boolean) & import("reselect").OutputSelectorFields<(args_0: AssignmentState) => boolean & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const getIsEmailDraftSent: ((state: {
    inbox: AssignmentState;
}) => boolean) & import("reselect").OutputSelectorFields<(args_0: AssignmentState) => boolean & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const getPersonalQueue: ((state: {
    inbox: AssignmentState;
}) => AgentQueuesDetail[]) & import("reselect").OutputSelectorFields<(args_0: AssignmentState) => AgentQueuesDetail[] & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const consultedAgentDetails: ((state: {
    inbox: AssignmentState;
}) => AgentDetails[]) & import("reselect").OutputSelectorFields<(args_0: AssignmentState) => AgentDetails[] & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const getLatestIncomingContactDetails: ((state: {
    inbox: AssignmentState;
}) => incomingContactProperties | null) & import("reselect").OutputSelectorFields<(args_0: AssignmentState) => incomingContactProperties & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
/**
 * Gets contact details from the state for particular CaseId
 * @param caseId - CXone Contact Id
 * @returns Digital contact details for particular CaseId
 * @example - Example
 * ```
 * let digitalContactDetail = useSelector(getDigitalContactByCaseId(DigitalCaseId));
 * ```
 */
export declare const getDigitalContactByCaseId: (caseId: string) => (state: {
    inbox: AssignmentState;
}) => ContactData | undefined;
/**
 * Gets public messages for contacts from state
 * @param caseId - CXone Contact Id
 * @param interactionId - interaction id of case
 * @returns messages
 * @example - Example
 * ```
 * let selectedContactsPublicMessages = useSelector(getMessagesForSelectedContact());
 * ```
 */
export declare const getMessagesForSelectedContact: (caseId: string, interactionId: string) => (state: {
    inbox: AssignmentState;
}) => CXonePublicMessage;
/**
* Get message action response
* @returns message action response
* @example - getMessageActionResponse()
* ```
* let getMessageActionResponse = useSelector(getMessageActionResponse());
* ```
*/
export declare const getMessageActionResponse: () => (state: {
    inbox: AssignmentState;
}) => MessageActionResponse;
/**
   * Used to get the all outbound message template list
   * @param rootState - AppSpace state
   * @example - const appSpaceState = getAllMessageTemplates(state)
   */
export declare const getAllDigitalMessageTags: ((state: {
    inbox: AssignmentState;
}) => import("yup/lib/object").AssertsShape<{
    id: import("yup/lib/number").RequiredNumberSchema<number, import("yup/lib/types").AnyObject>;
    title: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    color: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
}>[]) & import("reselect").OutputSelectorFields<(args_0: AssignmentState) => import("yup/lib/object").AssertsShape<{
    id: import("yup/lib/number").RequiredNumberSchema<number, import("yup/lib/types").AnyObject>;
    title: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    color: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
}>[] & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
/**
   * Used to get total digital tags
   * @param rootState - AppSpace state
   * @example - const appSpaceState = getDigitalMessageTagsCount(state)
   */
export declare const getDigitalMessageTagsCount: ((state: {
    inbox: AssignmentState;
}) => number) & import("reselect").OutputSelectorFields<(args_0: AssignmentState) => number & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
/**
   * Used to get current page for digital tags
   * @param rootState - AppSpace state
   * @example - const appSpaceState = getDigitalMessageTagsCurrentPage(state)
   */
export declare const getDigitalMessageTagsCurrentPage: ((state: {
    inbox: AssignmentState;
}) => number) & import("reselect").OutputSelectorFields<(args_0: AssignmentState) => number & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
/**
   * Used to get the digital tags by search string
   * @param rootState - AppSpace state
   * @example - const appSpaceState = getDigitalMessageTagsByName(state)
   */
export declare const getDigitalMessageTagsByName: ((state: {
    inbox: AssignmentState;
}) => import("yup/lib/object").AssertsShape<{
    id: import("yup/lib/number").RequiredNumberSchema<number, import("yup/lib/types").AnyObject>;
    title: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    color: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
}>[]) & import("reselect").OutputSelectorFields<(args_0: AssignmentState) => import("yup/lib/object").AssertsShape<{
    id: import("yup/lib/number").RequiredNumberSchema<number, import("yup/lib/types").AnyObject>;
    title: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    color: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
}>[] & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
/**
* Used to show the genric error message
* @param rootState - getAssignmentState state
* @example - let digitalMessageTagError = useSelector(digitalMessageTagError());
*/
export declare const digitalMessageTagError: ((state: {
    inbox: AssignmentState;
}) => boolean) & import("reselect").OutputSelectorFields<(args_0: AssignmentState) => boolean & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
/**
* Used to get digital tag added state
* @param rootState - getAssignmentState state
* @example - let getNewDigitalTagAddedState = useSelector(getNewDigitalTagAddedState());
*/
export declare const getNewDigitalTagAddedState: ((state: {
    inbox: AssignmentState;
}) => addedDigitalTagDetails) & import("reselect").OutputSelectorFields<(args_0: AssignmentState) => addedDigitalTagDetails & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
/**
* Used to get position of digital message tags
* @param rootState - getAssignmentState state
* @example - let getDigitalTagPopOverPosition = useSelector(getDigitalTagPopOverPosition());
*/
export declare const getDigitalTagPopOverPosition: ((state: {
    inbox: AssignmentState;
}) => digitalTagPopOverPositionAttributes) & import("reselect").OutputSelectorFields<(args_0: AssignmentState) => digitalTagPopOverPositionAttributes & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
/**
* Used to get expanded state of digital tags
* @param rootState - getAssignmentState state
* @example - let getDigitalTagExpandedState = useSelector(getDigitalTagExpandedState());
*/
export declare const getDigitalTagExpandedState: ((state: {
    inbox: AssignmentState;
}) => boolean) & import("reselect").OutputSelectorFields<(args_0: AssignmentState) => boolean & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
/**
* Used to show the genric error message
* @param rootState - getAssignmentState state
* @example - let digitalTagLoading = useSelector(digitalTagLoading());
*/
export declare const digitalTagLoadingState: ((state: {
    inbox: AssignmentState;
}) => boolean) & import("reselect").OutputSelectorFields<(args_0: AssignmentState) => boolean & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
/**
* Selector to get the slaIndicator flag for the caseId provided
* @returns SLAIndicatorType enum string
* @example
* ```
* const slaIndicator = useSelector(getSlaIndicator());
* ```
*/
export declare const getSlaIndicator: (interactionId: string) => (state: {
    inbox: AssignmentState;
}) => SLAIndicatorType | undefined;
/**
* used to get the failedInteraction messages for the passed caseId
* @returns failedMessages
* @example
* ```
* const failedInteractionMessages = useSelector(getInteractionFailedMessagesForCase());
* ```
*/
export declare const getInteractionFailedMessagesForCase: (caseId: string) => (state: {
    inbox: AssignmentState;
}) => FailedMessageDetails[] | undefined;
/**
* used to get all the interactions
* @returns allInteractions
* @example
* ```
* const allInteractions = useSelector(getAllInteractions());
* ```
*/
export declare const getAllInteractions: ((state: {
    inbox: AssignmentState;
}) => Interactions) & import("reselect").OutputSelectorFields<(args_0: AssignmentState) => Interactions & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
/**
* used to get interaction id with voice contact
* @returns interactionMetadata
* @example
* ```
* const assignmentDataMetadata = useSelector(getAssignmentPanelMetadata());
* ```
*/
export declare const getAssignmentPanelMetadata: ((state: {
    inbox: AssignmentState;
}) => AssignmentPanelMetadata) & import("reselect").OutputSelectorFields<(args_0: AssignmentState) => AssignmentPanelMetadata & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
/**
* Used to return in active contact in selected interaction, but it may also contain incomming contact
* @returns ActiveContactInSelectedInteraction
* @example
* ```
* const activeContactInSelectedInteraction = useSelector(getActiveContactInSelectedInteraction());
* ```
*/
export declare const getActiveContactInSelectedInteraction: ((state: {
    inbox: AssignmentState;
}) => ContactData | null) & import("reselect").OutputSelectorFields<(args_0: AssignmentState, args_1: AssignmentPanelMetadata) => ContactData & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
/**
 * Used to get all the cases under selected interaction. To be used for elevation
 * @example -
 */
export declare const getAllCasesInSelectedDigitalInteraction: ((state: {
    inbox: AssignmentState;
}) => Contacts | null) & import("reselect").OutputSelectorFields<(args_0: AssignmentState, args_1: AssignmentPanelMetadata) => Contacts & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
/**
 * Used to get all the preview cases under selected interaction. To be used for elevation
 * @example -
 */
export declare const getAllPreviewCasesInSelectedDigitalInteraction: ((state: {
    inbox: AssignmentState;
}) => ContactData[]) & import("reselect").OutputSelectorFields<(args_0: Contacts | null) => ContactData[] & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
/**
 * @example -
 */
export declare const getAllCasesInSelectedACDInteraction: ((state: {
    inbox: AssignmentState;
}) => Contacts | null) & import("reselect").OutputSelectorFields<(args_0: AssignmentState, args_1: AssignmentPanelMetadata) => Contacts & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
/**
* Used to return in active contact in selected interaction whose status is NOT Incoming
* @returns ActiveContactInSelectedInteraction
* @example
* ```
* const nonIncomingActiveContactInSelectedInteraction = useSelector(getNonIncomingActiveContactInSelectedInteraction());
* ```
*/
export declare const getNonIncomingActiveContactInSelectedInteraction: ((state: {
    inbox: AssignmentState;
}) => ContactData | null) & import("reselect").OutputSelectorFields<(args_0: AssignmentState, args_1: ContactData | null) => ContactData & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
/**
* Used to return in non incoming active contact only for Screen pop.
* If interaction is elevated, it will return voice contact or else nonIncomingActiveContact
* @returns nonIncomingActiveContact
* @example
* ```
* const nonIncomingActiveContact = useSelector(getNonIncomingActiveContactForScreenPop());
* ```
*/
export declare const getNonIncomingActiveContactForScreenPop: ((state: {
    inbox: AssignmentState;
}) => ContactData | null) & import("reselect").OutputSelectorFields<(args_0: AssignmentState, args_1: AssignmentPanelMetadata, args_2: ContactData | null) => ContactData & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
/**
* Used to return in active contact only for screen pop.
* If interaction is elevated, it will return voice contact or else activeContact
* @returns activeContact
* @example
* ```
* const activeContact = useSelector(getActiveContactForScreenPop());
* ```
*/
export declare const getActiveContactForScreenPop: ((state: {
    inbox: AssignmentState;
}) => ContactData | null) & import("reselect").OutputSelectorFields<(args_0: AssignmentState, args_1: AssignmentPanelMetadata, args_2: ContactData | null) => ContactData & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const hasConsultCall: ((state: {
    inbox: AssignmentState;
}) => boolean) & import("reselect").OutputSelectorFields<(args_0: Interactions, args_1: AssignmentPanelMetadata) => boolean & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const voiceContactCardSelector: ((state: {
    inbox: AssignmentState;
}) => ContactData[]) & import("reselect").OutputSelectorFields<(args_0: Interactions, args_1: AssignmentPanelMetadata) => ContactData[] & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const getSelectedVoiceContact: ((state: {
    inbox: AssignmentState;
}) => ContactData | undefined) & import("reselect").OutputSelectorFields<(args_0: ContactData[], args_1: AssignmentPanelMetadata) => ContactData & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const voiceContactsIds: ((state: {
    inbox: AssignmentState;
}) => string[]) & import("reselect").OutputSelectorFields<(args_0: Interactions, args_1: AssignmentPanelMetadata) => string[] & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const nonIncomingVoiceContactCards: ((state: {
    inbox: AssignmentState;
}) => ContactData[]) & import("reselect").OutputSelectorFields<(args_0: Interactions, args_1: AssignmentPanelMetadata) => ContactData[] & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const getActiveVoiceContact: ((state: {
    inbox: AssignmentState;
}) => ContactData | undefined) & import("reselect").OutputSelectorFields<(args_0: Interactions, args_1: AssignmentPanelMetadata) => ContactData & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const getActiveContacts: ((state: {
    inbox: AssignmentState;
}) => ContactData[]) & import("reselect").OutputSelectorFields<(args_0: Interactions, args_1: AssignmentPanelMetadata) => ContactData[] & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
/**
 * getSelectedInteractionType
 */
export declare const getSelectedInteractionType: ((state: {
    inbox: AssignmentState;
}) => InteractionType | null) & import("reselect").OutputSelectorFields<(args_0: Interactions, args_1: string | undefined) => (InteractionType | null) & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
/**
 * Returns the information of the selected/active interaction
 * @example
 * ```
 * useSelector(getSelectedInteractionInfo)
 * ```
 */
export declare const getSelectedInteractionInfo: ((state: {
    inbox: AssignmentState;
}) => import("@nice-devone/common-sdk").InteractionData | null) & import("reselect").OutputSelectorFields<(args_0: Interactions, args_1: string | undefined) => import("@nice-devone/common-sdk").InteractionData & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
/**
 * Gets workItem contacts from state
 * @param state - CXone Contact Id
 * @returns workItem contacts
 * @example - Example
 * ```
 * let workItemContacts = useSelector(workItemContactsSelector());
 * ```
 */
export declare const workItemContactsSelector: ((state: {
    inbox: AssignmentState;
}) => ContactData[]) & import("reselect").OutputSelectorFields<(args_0: Interactions) => ContactData[] & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const workItemContactsIds: ((state: {
    inbox: AssignmentState;
}) => string[]) & import("reselect").OutputSelectorFields<(args_0: Interactions) => string[] & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
/**
 * Gets voicemail contacts from state
 * @param state - CXone Contact Id
 * @returns voicemail contacts
 * @example - Example
 * ```
 * let voiceMailContacts = useSelector(voiceMailContactsSelector());
 * ```
 */
export declare const voiceMailContactsSelector: ((state: {
    inbox: AssignmentState;
}) => ContactData[]) & import("reselect").OutputSelectorFields<(args_0: Interactions) => ContactData[] & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const voiceMailContactsIds: ((state: {
    inbox: AssignmentState;
}) => string[]) & import("reselect").OutputSelectorFields<(args_0: Interactions) => string[] & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
/**
 * Gets voicemail contacts from state
 * @param state - CXone Contact Id
 * @returns voicemail contacts
 * @example - Example
 * ```
 * let voiceMailContacts = useSelector(digitalContactCardsSelector());
 * ```
 */
export declare const digitalContactCardsSelector: (cxoneInteractions: Interactions) => ContactData[];
export declare const allDigitalContactCard: ((state: {
    inbox: AssignmentState;
}) => ContactData[]) & import("reselect").OutputSelectorFields<(args_0: Interactions) => ContactData[] & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const nonIncomingDigitalContactCards: ((state: {
    inbox: AssignmentState;
}) => ContactData[]) & import("reselect").OutputSelectorFields<(args_0: Interactions) => ContactData[] & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const getNewContacts: ((state: {
    inbox: AssignmentState;
}) => ContactData[]) & import("reselect").OutputSelectorFields<(args_0: Interactions) => ContactData[] & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const getCompiledACDContacts: ((state: {
    inbox: AssignmentState;
}) => ContactData[] | null) & import("reselect").OutputSelectorFields<(args_0: Interactions) => ContactData[] & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const getIncomingContacts: ((state: {
    inbox: AssignmentState;
}) => ContactData[]) & import("reselect").OutputSelectorFields<(args_0: Interactions) => ContactData[] & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const getRingingContacts: ((state: {
    inbox: AssignmentState;
}) => ContactData[]) & import("reselect").OutputSelectorFields<(args_0: Interactions) => ContactData[] & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
/**
 * Gets Customer contact custom fields from the state
*  @param caseId - CXone case Id
 * @param interactionId - interaction id of case *
 * @returns CXoneContactCustomFieldDefinition[]
 * @example
 * ```
 * let getcustomerContactCustomFieldDefinitionsByCaseId = useSelector(getcustomerContactCustomFieldDefinitionsByCaseId(selectedDigitalContactId));
 * ```
 */
export declare const getcustomerContactCustomFieldDefinitionsByCaseId: (caseId: string, interactionId: string) => (state: {
    inbox: AssignmentState;
}) => CXoneContactCustomFieldDefinition[] | undefined;
/**
* Used to get the message selected for reply.
* @param caseId - Selected contact case id
* @example - const selectedMsg = useSelector(getSelectedMsg(caseId));
*/
export declare const getSelectedMsg: (caseId: string) => (state: {
    inbox: AssignmentState;
}) => any;
/**
 * Filters the messages of interaction and returns the one with same idOnExternalPlatform.
 * @param caseId - CXone case Id
 * @param interactionId - CXone interaction Id
 * @param idOnExternalPlatform - idOnExternalPlatform of the message
 * @returns SavedDigitalUserDetails
 * @example - let getRepliedMessage = useSelector(getRepliedMessage(caseId, interactionId, idOnExternalPlatform));
 */
export declare const getRepliedMessage: (caseId: string, interactionId: string, idOnExternalPlatform: string) => (state: {
    inbox: AssignmentState;
}) => CXoneMessage;
/**
* used to get the draft messages for the passed caseId
* @returns draft messages
* @example
* ```
* const draftInteractionMessages = useSelector(getInteractionDraftMessagesForCase());
* ```
*/
export declare const getInteractionDraftMessagesForCase: (caseId: string) => (state: {
    inbox: AssignmentState;
}) => CXoneMessage[];
/**
   * selector to return if the voice recording is removed from editor
   * @param caseId - case id
   * @param interactionId - interaction id
   * @returns boolean
   * @example getIfVoiceRecordingRemoved('123w','aswse3')
   */
export declare const getIfVoiceRecordingRemoved: (caseId: string, interactionId: string) => (state: {
    inbox: AssignmentState;
}) => boolean | undefined;
/**
   * selector to read the status of audio recording
   * @param caseId - case id
   * @param interactionId - interaction id
   * @returns boolean
   * @example getVoiceRecordingState('123w','aswse3')
   */
export declare const getVoiceRecordingState: (caseId: string, interactionId: string) => (state: {
    inbox: AssignmentState;
}) => boolean | undefined;
/**
   * selector to retrun setContactHistoryInIndexDb flag
   * @returns setContactHistoryInIndexDb
   * @example getSetContactHistoryInIndexDbFlag()
   */
export declare const getSetContactHistoryInIndexDbFlag: ((state: {
    inbox: AssignmentState;
}) => boolean) & import("reselect").OutputSelectorFields<(args_0: AssignmentState) => boolean & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
/**
 * Used to get the isEmailForward flag from selected contact saved user properties.
 * @param caseId - Selected contact case id
 * @example - const isEmailForward = useSelector(getIsEmailForward(caseId));
 */
export declare const getIsEmailForward: (caseId: string) => (state: {
    inbox: AssignmentState;
}) => boolean | undefined;
export {};
