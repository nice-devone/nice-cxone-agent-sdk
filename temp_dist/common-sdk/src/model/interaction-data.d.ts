import { SLAIndicatorType } from '../enum/sla-warning';
import { AgentQueuesDetail } from '../lib/model/agent/agent-queues-detail';
import { ContactData } from './contact-data';
/**
 * Type of the interaction shown in Assignment Panel
 */
export declare enum InteractionType {
    VOICE = "Voice",
    VOICEMAIL = "Voice Mail",
    WORKITEM = "Work Item",
    DIGITAL = "Digital",
    ELEVATED = "Elevated",
    PERSONALQUEUE = "PersonalQueue"
}
/**
 * Enum for setting the type of elevation occured from
 */
export declare enum ElevatedFrom {
    ACD = "acd",
    DFO = "dfo",
    EM = "em",
    SELF = "self"
}
/**
 * Interactions object which contains key value pair data for all the interactions in assignment panel
 * - Key - Interaction ID
 * - Value - InteractionData object
 */
export interface Interactions {
    [interactionId: string]: InteractionData;
}
/**
 * This object will contain all data pertaining to a single Interaction
 */
export interface InteractionData {
    /**
     * returns - interaction id for current interaction
     */
    interactionId: string;
    /**
     * returns - interaction received time for current interaction
     */
    interactionReceivedTime: string;
    /**
     * returns - interaction updated time for current interaction
     */
    interactionUpdatedTime: string;
    /**
     * - For elevated interaction, this will return Contact ID of last selected contact out of multiple ACD and DFO contacts within a single interaction
     * - For normal interaction, this will return the Contact ID of child contact
     */
    selectedContactId: string;
    /**
     * returns - type of interaction
     */
    interactionType: InteractionType;
    /**
     * returns - SLA indicator type for current interaction
     */
    slaIndicator: SLAIndicatorType;
    /**
     * This will contain object list of all ACD contact (including Voice, VoiceMail, and Workitem) for current interaction
     */
    acdContacts: Contacts;
    /**
     * This will contain object list of all DFO contacts for current interaction
     */
    digitalContacts: Contacts;
    /**
     * This will contain object list of Agent Queue Details for current interaction
     */
    queueDetails?: AgentQueuesDetail;
}
/**
 * Contact object which contains key-value pair of contact data. It can be either ACD or DFO or Both.
 * Key - Contact ID or Case ID
 * Value - ContactData object
 */
export declare type Contacts = {
    [ccid: string]: ContactData;
};
/**
 * This object acts as a top level place holder for all properties related to Assignment Panel as a whole.
 * It stores metadata which is unique across whole Assignment Panel and provide quick access to those properties.
 */
export interface AssignmentPanelMetadata {
    /**
     * At any point of time, Agent can select only one interaction in Assignment panel.
     * This property will return Selected Interaction ID in the Assignment Panel.
     */
    selectedInteractionId?: string;
    /**
     * At any point of time, Assignment panel can have only single Voice call.
     * This property will return Active Voice Call Contact Interaction ID in the Assignment Panel.
     */
    voiceInteractionId?: string;
    /**
     * At any point of time, Assignment panel can have only single Voice Mail call.
     * This property will return Active Voice Mail Contact Interaction ID in the Assignment Panel.
     */
    voiceMailInteractionId?: string;
    /**
     * This property will return Incomming ACD Contact (Voice, VoiceMail, and Workitem) Interaction ID in the Assignment Panel.
     */
    incommingAcdInteractionId?: string;
    /**
     * This property will return Incomming DFO Contact Interaction ID in the Assignment Panel.
     */
    incommingDfoInteractionId?: string;
}
export interface Tabs {
    id: any;
    value: string;
    interactionId: string | undefined;
    caseId: string | undefined;
    contactId: string | undefined;
    createdAt: string;
    isPreviewCase: boolean;
}
