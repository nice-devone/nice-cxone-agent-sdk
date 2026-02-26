import { AnyAction, PayloadAction } from '@reduxjs/toolkit';
import { SkillActivityEvent } from '@nice-devone/agent-sdk';
import { ConferenceStatus } from '@nice-devone/common-sdk';
import { Agent } from '../ccf-directory/+state/ccf-directory.slice';
import { CXoneVoiceContact, CXoneVoiceMailContact, CXoneWorkItemContact } from '@nice-devone/acd-sdk';
export declare const CCF_CALL_CONFERENCE_FEATURE_KEY = "callConference";
/**
 *  Call Conference error state interface
 */
export interface CallConferenceErrorState {
    /**
      *  handle error for consult-agent api
    */
    hasErrorForConsultCall: boolean;
    /**
      *  handle error for dial-skill api
    */
    hasErrorForDialSkill: boolean;
    /**
      *  handle error for hold api
    */
    hasErrorForHold: boolean;
    /**
      *  handle error for dial-phone api
    */
    hasErrorForDialPhone: boolean;
    /**
      *  handle error for transfer-call api
    */
    hasErrorForTransferCall: boolean;
}
/**
 *  External number attributes interface
 */
export interface CallConferenceExternalNumberAttributes {
    /**
      *  flag to set when external number is added to an ongoing call
    */
    isExternalNumberDialed: boolean;
    /**
      *  voiceContact details
    */
    voiceContact: CXoneVoiceContact;
    /**
      *  skill id of an agent
    */
    skillId: number;
    /**
      *  phone number dialed
    */
    phoneNumber: string;
    /**
      *  trigger type to identify voice/transfer
    */
    triggerType: string;
}
/**
 *  Call Conference interface
 */
export interface CallConferenceProps {
    /**
      *  Flag to set on click of cold transfer
    */
    isColdTransferClicked?: boolean;
    /**
      *  Flag to set on click of cold transfer
    */
    initiateColdTransfer?: boolean; /**
      *  Flag to set when agent is added to ongoing call
    */
    isConsultCallByAgentIdClicked?: boolean;
    /**
      *  Flag to set when skill is added to ongoing call
    */
    isConsultCallBySkillIdClicked?: boolean;
    /**
      *  Attributes set when external number is added to ongoing call
    */
    externalNumberAttributes?: CallConferenceExternalNumberAttributes;
    /**
      *  Agent details
    */
    agent?: Agent | SkillActivityEvent;
    /**
      *  Flag to handle error set
    */
    errorState?: CallConferenceErrorState;
    /**
      *  property to handle conference status
    */
    conferenceStatus?: ConferenceStatus;
    /**
      *  property to handle consult status
    */
    isConsult?: boolean;
    /**
      *  property to handle conference number
    */
    conferenceNo?: string;
    /**
      *  Flag to set on click of merge contact
    */
    isMergeContactClicked?: boolean;
}
/**
 *  State of Call Conference slice
 */
export declare const CallConferenceState: CallConferenceProps;
/**
 * addConsultAgentByAgentId asyncthunk used to add agent through agent id
 * @example - dispatch(addConsultAgentByAgentId())
 */
export declare const addConsultAgentByAgentId: import("@reduxjs/toolkit").AsyncThunk<void, {
    voiceContact: CXoneVoiceContact;
    agent: Agent;
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
 * transferDigitalSkill used to transfer digital skill
 * @example - dispatch(transferDigitalSkill())
 */
export declare const transferDigitalSkill: import("@reduxjs/toolkit").AsyncThunk<void, {
    contactId: string;
    cxoneSkillId: string;
    navPanelItems: any;
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
 * addConsultAgentBySkillId asyncthunk used to add agent through skill id
 * @example - dispatch(addConsultAgentBySkillId())
 */
export declare const addConsultAgentBySkillId: import("@reduxjs/toolkit").AsyncThunk<void, {
    voiceContact: CXoneVoiceContact;
    agent: SkillActivityEvent;
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
 * dialExternalNumber async thunk used to dial an external number
 * @example - dispatch(externalConsult())
 */
export declare const dialExternalNumber: import("@reduxjs/toolkit").AsyncThunk<void, {
    skillId: number;
    phoneNumber: string;
    triggerType: string;
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
 * holdCall async thunk used to dial a call to an agent and cold transfer
 * @example - dispatch(holdCall())
 */
export declare const holdCall: import("@reduxjs/toolkit").AsyncThunk<void, {
    voiceContact: CXoneVoiceContact;
    agent?: Agent | undefined;
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
 * dialCallAndColdTransfer async thunk used to dial a call to an agent and cold transfer
 * @example - dispatch(dialCallToAnAgent())
 */
export declare const dialCallAndColdTransfer: import("@reduxjs/toolkit").AsyncThunk<void, {
    voiceContact: CXoneVoiceContact;
    agent: Agent;
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
 * transferDigitalContact used to transfer digital contact
 * @example - dispatch(transferDigitalContact())
 */
export declare const transferDigitalContact: import("@reduxjs/toolkit").AsyncThunk<void, {
    contactId: string;
    cxoneUserId: string;
    navPanelItems: any;
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
 * transferCall asyncthunk used to transfer call
 * @example - dispatch(transferCall())
 */
export declare const transferCall: import("@reduxjs/toolkit").AsyncThunk<void, void, {
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
 * transferVoicemail asyncthunk used to transfer voicemail
 * @param data - object that holds the contactId and agentId
 * @example - dispatch(transferVoicemail(\{voicemailContact, agent\}))
 */
export declare const transferVoicemail: import("@reduxjs/toolkit").AsyncThunk<void, {
    voiceMailContact: CXoneVoiceMailContact;
    agent: Agent;
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
 * transferWorkItem asyncthunk used to transfer work item
 * @param data - object that holds the contactId and agentName
 * @example - dispatch(transferWorkItem(\{workItemContact, agent\}))
 */
export declare const transferWorkItem: import("@reduxjs/toolkit").AsyncThunk<void, {
    workItemContact: CXoneWorkItemContact;
    agent: Agent;
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
   * Conference call with consulted agents and primary contact
   * @example - dispatch(conferenceCall())
   *
  */
export declare const conferenceCall: import("@reduxjs/toolkit").AsyncThunk<void, void, {
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
 * calls a method to transfer a workitem to skill
 * @param contactId -contactId
 * @param skillName -skillName
 * @returns - State
 * @example
 * ```
 * transferWorkItemSkill(contactId,skillName)
 * ```
 */
export declare const transferWorkItemSkill: import("@reduxjs/toolkit").AsyncThunk<void, {
    contactId: string;
    skillName: string;
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
 * calls a method to transfer a voice mail to skill
 * @param contactId -contactId
 * @param skillId -skillId
 * @returns - State
 * @example
 * ```
 * transferVoiceMailSkill(contactId,skillId)
 * ```
 */
export declare const transferVoiceMailSkill: import("@reduxjs/toolkit").AsyncThunk<void, {
    contactId: string;
    skillId: number;
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
 * to hold the conference call
 * @param conferenceNo - conference number
 * @example - dispatch(conferenceHold(conferenceNo))
 *
*/
export declare const conferenceHold: import("@reduxjs/toolkit").AsyncThunk<void, string, {
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
 * to resume the conference call
 * @param conferenceNo - conference number
 * @example - dispatch(conferenceResume(conferenceNo))
 *
*/
export declare const conferenceResume: import("@reduxjs/toolkit").AsyncThunk<void, string, {
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
 * to hold the consult and resume the conference call
 * @param payload - conference number and consult contact
 * @example - dispatch(holdAndResumeConference(payload))
 *
*/
export declare const holdAndResumeConference: import("@reduxjs/toolkit").AsyncThunk<void, {
    conferenceNo: string;
    consultContact: CXoneVoiceContact;
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
 * to hold the consult and resume the conference call
 * @param payload - conference number and consult contact
 * @example - dispatch(holdAndResumeConference(payload))
 *
*/
export declare const holdAndResumeConsult: import("@reduxjs/toolkit").AsyncThunk<void, {
    consultContact: CXoneVoiceContact;
    conferenceNo: string;
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
 * to resume the consult and hold the conference call
 * @param payload - conference number and consult contact
 * @example - dispatch(resumeAndHoldConference(payload))
 *
*/
export declare const resumeAndHoldConference: import("@reduxjs/toolkit").AsyncThunk<void, {
    conferenceNo: string;
    consultContact: CXoneVoiceContact;
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
 * to join the conference call
 * @param contactId - contact id
 * @example - dispatch(conferenceJoin(contactId))
 *
*/
export declare const conferenceJoin: import("@reduxjs/toolkit").AsyncThunk<void, {
    contactId: string;
    conferenceNo: string;
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
export declare const callConferenceSlice: import("@reduxjs/toolkit").Slice<CallConferenceProps, {
    /**
       * Function to set if cold transferred btn clicked
       * @param state - CallConferenceState
       * @param action  - PayloadAction<boolean>
       * @returns It returns if cold transfer btn is pressed
       * @example -coldTransferredBtnClicked(true)
       */
    coldTransferredBtnClicked(state: import("immer/dist/internal").WritableDraft<CallConferenceProps>, action: PayloadAction<CallConferenceProps>): void;
    /**
     * Function to set if cold transferred btn clicked
     * @param state - CallConferenceState
     * @param action  - PayloadAction<boolean>
     * @returns It returns if cold transfer btn is pressed
     * @example - initiateColdTransfer(true)
     */
    initiateColdTransfer(state: import("immer/dist/internal").WritableDraft<CallConferenceProps>, action: PayloadAction<CallConferenceProps>): void;
    /**
     * Function to set if consult call by agent id clicked
     * @param state - CallConferenceState
     * @param action  - PayloadAction<boolean>
     * @returns It returns if cold transfer btn is pressed
     * @example -consultCallByAgentBtnClicked(true)
     */
    consultCallByAgentBtnClicked(state: import("immer/dist/internal").WritableDraft<CallConferenceProps>, action: PayloadAction<CallConferenceProps>): void;
    /**
     * Function to set if consult call by skill id clicked
     * @param state - CallConferenceState
     * @param action  - PayloadAction<CallConferenceProps>
     * @returns It returns if cold transfer btn is pressed
     * @example -consultCallBySkillBtnClicked(true)
     */
    consultCallBySkillBtnClicked(state: import("immer/dist/internal").WritableDraft<CallConferenceProps>, action: PayloadAction<CallConferenceProps>): void;
    /**
     * Function to set if external number attributes
     * @param state - CallConferenceState
     * @param action  - PayloadAction<CallConferenceProps>
     * @returns It returns if cold transfer btn is pressed
     * @example -consultCallBySkillBtnClicked(true)
     */
    dialExternalContact(state: import("immer/dist/internal").WritableDraft<CallConferenceProps>, action: PayloadAction<CallConferenceExternalNumberAttributes>): void;
    /**
     * Function to reset error state to false
     * @param state - CallConferenceState
     * @returns state
     * @example -resetContactErrorState()
     */
    resetContactErrorState(state: import("immer/dist/internal").WritableDraft<CallConferenceProps>): void;
    /**
     * Function to set conference status
     * @param state - CallConferenceState
     * @param action  - PayloadAction<ConferenceStatus>
     * @returns state
     * @example -setConferenceStatus(ConferenceStatus.HOLD)
     */
    setConferenceStatus(state: import("immer/dist/internal").WritableDraft<CallConferenceProps>, action: PayloadAction<ConferenceStatus | undefined>): {
        conferenceStatus: ConferenceStatus | undefined;
        isColdTransferClicked?: boolean | undefined;
        initiateColdTransfer?: boolean | undefined;
        isConsultCallByAgentIdClicked?: boolean | undefined;
        isConsultCallBySkillIdClicked?: boolean | undefined;
        externalNumberAttributes?: import("immer/dist/internal").WritableDraft<CallConferenceExternalNumberAttributes> | undefined;
        agent?: import("immer/dist/internal").WritableDraft<SkillActivityEvent> | import("immer/dist/internal").WritableDraft<Agent> | undefined;
        errorState?: import("immer/dist/internal").WritableDraft<CallConferenceErrorState> | undefined;
        isConsult?: boolean | undefined;
        conferenceNo?: string | undefined;
        isMergeContactClicked?: boolean | undefined;
    };
    /**
     * Function to set conference No
     * @param state - CallConferenceState
     * @param action  - PayloadAction<number>
     * @returns state
     * @example -setConferenceNo(45454596)
     */
    setConferenceNo(state: import("immer/dist/internal").WritableDraft<CallConferenceProps>, action: PayloadAction<string | undefined>): {
        conferenceNo: string | undefined;
        isColdTransferClicked?: boolean | undefined;
        initiateColdTransfer?: boolean | undefined;
        isConsultCallByAgentIdClicked?: boolean | undefined;
        isConsultCallBySkillIdClicked?: boolean | undefined;
        externalNumberAttributes?: import("immer/dist/internal").WritableDraft<CallConferenceExternalNumberAttributes> | undefined;
        agent?: import("immer/dist/internal").WritableDraft<SkillActivityEvent> | import("immer/dist/internal").WritableDraft<Agent> | undefined;
        errorState?: import("immer/dist/internal").WritableDraft<CallConferenceErrorState> | undefined;
        conferenceStatus?: ConferenceStatus | undefined;
        isConsult?: boolean | undefined;
        isMergeContactClicked?: boolean | undefined;
    };
    /**
     * Function to set conference No
     * @param state - CallConferenceState
     * @param action  - PayloadAction<boolean>
     * @returns state
     * @example -setIsMergeContact(true)
     */
    setIsMergeContact(state: import("immer/dist/internal").WritableDraft<CallConferenceProps>, action: PayloadAction<boolean>): {
        isMergeContactClicked: boolean;
        isColdTransferClicked?: boolean | undefined;
        initiateColdTransfer?: boolean | undefined;
        isConsultCallByAgentIdClicked?: boolean | undefined;
        isConsultCallBySkillIdClicked?: boolean | undefined;
        externalNumberAttributes?: import("immer/dist/internal").WritableDraft<CallConferenceExternalNumberAttributes> | undefined;
        agent?: import("immer/dist/internal").WritableDraft<SkillActivityEvent> | import("immer/dist/internal").WritableDraft<Agent> | undefined;
        errorState?: import("immer/dist/internal").WritableDraft<CallConferenceErrorState> | undefined;
        conferenceStatus?: ConferenceStatus | undefined;
        isConsult?: boolean | undefined;
        conferenceNo?: string | undefined;
    };
    /**
     * Function to set consult status
     * @param state - CallConferenceState
     * @param action  - PayloadAction<boolean>
     * @returns state
     * @example -isConsult(false)
     */
    isConsult(state: import("immer/dist/internal").WritableDraft<CallConferenceProps>, action: PayloadAction<boolean>): {
        isConsult: boolean;
        isColdTransferClicked?: boolean | undefined;
        initiateColdTransfer?: boolean | undefined;
        isConsultCallByAgentIdClicked?: boolean | undefined;
        isConsultCallBySkillIdClicked?: boolean | undefined;
        externalNumberAttributes?: import("immer/dist/internal").WritableDraft<CallConferenceExternalNumberAttributes> | undefined;
        agent?: import("immer/dist/internal").WritableDraft<SkillActivityEvent> | import("immer/dist/internal").WritableDraft<Agent> | undefined;
        errorState?: import("immer/dist/internal").WritableDraft<CallConferenceErrorState> | undefined;
        conferenceStatus?: ConferenceStatus | undefined;
        conferenceNo?: string | undefined;
        isMergeContactClicked?: boolean | undefined;
    };
}, "callConference">;
export declare const callConferenceReducer: import("redux").Reducer<CallConferenceProps, AnyAction>;
export declare const callConferenceActions: import("@reduxjs/toolkit").CaseReducerActions<{
    /**
       * Function to set if cold transferred btn clicked
       * @param state - CallConferenceState
       * @param action  - PayloadAction<boolean>
       * @returns It returns if cold transfer btn is pressed
       * @example -coldTransferredBtnClicked(true)
       */
    coldTransferredBtnClicked(state: import("immer/dist/internal").WritableDraft<CallConferenceProps>, action: PayloadAction<CallConferenceProps>): void;
    /**
     * Function to set if cold transferred btn clicked
     * @param state - CallConferenceState
     * @param action  - PayloadAction<boolean>
     * @returns It returns if cold transfer btn is pressed
     * @example - initiateColdTransfer(true)
     */
    initiateColdTransfer(state: import("immer/dist/internal").WritableDraft<CallConferenceProps>, action: PayloadAction<CallConferenceProps>): void;
    /**
     * Function to set if consult call by agent id clicked
     * @param state - CallConferenceState
     * @param action  - PayloadAction<boolean>
     * @returns It returns if cold transfer btn is pressed
     * @example -consultCallByAgentBtnClicked(true)
     */
    consultCallByAgentBtnClicked(state: import("immer/dist/internal").WritableDraft<CallConferenceProps>, action: PayloadAction<CallConferenceProps>): void;
    /**
     * Function to set if consult call by skill id clicked
     * @param state - CallConferenceState
     * @param action  - PayloadAction<CallConferenceProps>
     * @returns It returns if cold transfer btn is pressed
     * @example -consultCallBySkillBtnClicked(true)
     */
    consultCallBySkillBtnClicked(state: import("immer/dist/internal").WritableDraft<CallConferenceProps>, action: PayloadAction<CallConferenceProps>): void;
    /**
     * Function to set if external number attributes
     * @param state - CallConferenceState
     * @param action  - PayloadAction<CallConferenceProps>
     * @returns It returns if cold transfer btn is pressed
     * @example -consultCallBySkillBtnClicked(true)
     */
    dialExternalContact(state: import("immer/dist/internal").WritableDraft<CallConferenceProps>, action: PayloadAction<CallConferenceExternalNumberAttributes>): void;
    /**
     * Function to reset error state to false
     * @param state - CallConferenceState
     * @returns state
     * @example -resetContactErrorState()
     */
    resetContactErrorState(state: import("immer/dist/internal").WritableDraft<CallConferenceProps>): void;
    /**
     * Function to set conference status
     * @param state - CallConferenceState
     * @param action  - PayloadAction<ConferenceStatus>
     * @returns state
     * @example -setConferenceStatus(ConferenceStatus.HOLD)
     */
    setConferenceStatus(state: import("immer/dist/internal").WritableDraft<CallConferenceProps>, action: PayloadAction<ConferenceStatus | undefined>): {
        conferenceStatus: ConferenceStatus | undefined;
        isColdTransferClicked?: boolean | undefined;
        initiateColdTransfer?: boolean | undefined;
        isConsultCallByAgentIdClicked?: boolean | undefined;
        isConsultCallBySkillIdClicked?: boolean | undefined;
        externalNumberAttributes?: import("immer/dist/internal").WritableDraft<CallConferenceExternalNumberAttributes> | undefined;
        agent?: import("immer/dist/internal").WritableDraft<SkillActivityEvent> | import("immer/dist/internal").WritableDraft<Agent> | undefined;
        errorState?: import("immer/dist/internal").WritableDraft<CallConferenceErrorState> | undefined;
        isConsult?: boolean | undefined;
        conferenceNo?: string | undefined;
        isMergeContactClicked?: boolean | undefined;
    };
    /**
     * Function to set conference No
     * @param state - CallConferenceState
     * @param action  - PayloadAction<number>
     * @returns state
     * @example -setConferenceNo(45454596)
     */
    setConferenceNo(state: import("immer/dist/internal").WritableDraft<CallConferenceProps>, action: PayloadAction<string | undefined>): {
        conferenceNo: string | undefined;
        isColdTransferClicked?: boolean | undefined;
        initiateColdTransfer?: boolean | undefined;
        isConsultCallByAgentIdClicked?: boolean | undefined;
        isConsultCallBySkillIdClicked?: boolean | undefined;
        externalNumberAttributes?: import("immer/dist/internal").WritableDraft<CallConferenceExternalNumberAttributes> | undefined;
        agent?: import("immer/dist/internal").WritableDraft<SkillActivityEvent> | import("immer/dist/internal").WritableDraft<Agent> | undefined;
        errorState?: import("immer/dist/internal").WritableDraft<CallConferenceErrorState> | undefined;
        conferenceStatus?: ConferenceStatus | undefined;
        isConsult?: boolean | undefined;
        isMergeContactClicked?: boolean | undefined;
    };
    /**
     * Function to set conference No
     * @param state - CallConferenceState
     * @param action  - PayloadAction<boolean>
     * @returns state
     * @example -setIsMergeContact(true)
     */
    setIsMergeContact(state: import("immer/dist/internal").WritableDraft<CallConferenceProps>, action: PayloadAction<boolean>): {
        isMergeContactClicked: boolean;
        isColdTransferClicked?: boolean | undefined;
        initiateColdTransfer?: boolean | undefined;
        isConsultCallByAgentIdClicked?: boolean | undefined;
        isConsultCallBySkillIdClicked?: boolean | undefined;
        externalNumberAttributes?: import("immer/dist/internal").WritableDraft<CallConferenceExternalNumberAttributes> | undefined;
        agent?: import("immer/dist/internal").WritableDraft<SkillActivityEvent> | import("immer/dist/internal").WritableDraft<Agent> | undefined;
        errorState?: import("immer/dist/internal").WritableDraft<CallConferenceErrorState> | undefined;
        conferenceStatus?: ConferenceStatus | undefined;
        isConsult?: boolean | undefined;
        conferenceNo?: string | undefined;
    };
    /**
     * Function to set consult status
     * @param state - CallConferenceState
     * @param action  - PayloadAction<boolean>
     * @returns state
     * @example -isConsult(false)
     */
    isConsult(state: import("immer/dist/internal").WritableDraft<CallConferenceProps>, action: PayloadAction<boolean>): {
        isConsult: boolean;
        isColdTransferClicked?: boolean | undefined;
        initiateColdTransfer?: boolean | undefined;
        isConsultCallByAgentIdClicked?: boolean | undefined;
        isConsultCallBySkillIdClicked?: boolean | undefined;
        externalNumberAttributes?: import("immer/dist/internal").WritableDraft<CallConferenceExternalNumberAttributes> | undefined;
        agent?: import("immer/dist/internal").WritableDraft<SkillActivityEvent> | import("immer/dist/internal").WritableDraft<Agent> | undefined;
        errorState?: import("immer/dist/internal").WritableDraft<CallConferenceErrorState> | undefined;
        conferenceStatus?: ConferenceStatus | undefined;
        conferenceNo?: string | undefined;
        isMergeContactClicked?: boolean | undefined;
    };
}, "callConference">;
export declare const isColdBtnTransferClicked: ((state: {
    callConference: CallConferenceProps;
}) => boolean | undefined) & import("reselect").OutputSelectorFields<(args_0: CallConferenceProps) => (boolean | undefined) & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const hasErrorState: ((state: {
    callConference: CallConferenceProps;
}) => CallConferenceErrorState | undefined) & import("reselect").OutputSelectorFields<(args_0: CallConferenceProps) => CallConferenceErrorState & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const conferenceStatus: ((state: {
    callConference: CallConferenceProps;
}) => ConferenceStatus | undefined) & import("reselect").OutputSelectorFields<(args_0: CallConferenceProps) => (ConferenceStatus | undefined) & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const isConsult: ((state: {
    callConference: CallConferenceProps;
}) => boolean | undefined) & import("reselect").OutputSelectorFields<(args_0: CallConferenceProps) => (boolean | undefined) & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const conferenceNo: ((state: {
    callConference: CallConferenceProps;
}) => string | undefined) & import("reselect").OutputSelectorFields<(args_0: CallConferenceProps) => string & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
