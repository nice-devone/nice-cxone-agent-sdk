/**
 * An object holding basic properties of CXone Contact information, can be extended by Voice and Digital
 */
export interface CXoneContactData {
    /**
     * @remarks interactionId GUID
     * */
    interactionId: string;
    /**
     * @remarks ContactId 64bit number
     * */
    contactId: string;
    /**
     * @remarks Direction of Contact Inbound or Outbound
     * */
    direction?: string;
    /**
     * @remarks MediaTypeName (eg. PhoneCall, VoiceMail, Digital)
     * */
    mediaType?: string;
    /**
     * @remarks CXone User Uuid
     * */
    agentId?: string;
    /**
     * @remarks CXone Agent Name
     * */
    agentName?: string;
    /**
     * @remarks  CXone Queue/Skill ID (GUID/Number)
     * */
    skillId?: string;
    /**
     * @remarks  CXone Queue/Skill Name
     * */
    skillName?: string;
    /**
     * @remarks   Disposition text selected by agent
     * */
    dispositionName?: string;
    /**
     * @remarks - Agent notes provided on Disposition screen
     * */
    dispositionNotes?: string;
    /**
     * @remarks - CXone Interaction Status
     * */
    status?: string;
    /**
     * @remarks - Boolean value to identify final state of interaction
     * */
    finalState?: boolean;
    /**
   * @remarks - CXone
   * */
    type?: string;
}
