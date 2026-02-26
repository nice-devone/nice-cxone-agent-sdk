import { SkillActivityResponse } from '@nice-devone/agent-sdk';
import { AgentQueues, AgentSkill, CXoneDigitalSkill, SkillCPAManagementParameters, SkillDeliveryParameters } from '@nice-devone/common-sdk';
import { PayloadAction } from '@reduxjs/toolkit';
import { WritableDraft } from 'immer/dist/internal';
export declare const AGENT_SKILL_DETAILS_KEY = "agentSkillDetails";
export declare const GET_AGENT_SKILLS = "agentSkillDetails/getAgentSkills";
export declare const START_ACTIVITY_POLLING = "agentSkillDetails/startActivityPolling";
export declare const STOP_ACTIVITY_POLLING = "agentSkillDetails/stopActivityPolling";
export declare const START_AGENT_QUEUE_POLLING = "agentSkillDetails/startAgentQueuePolling";
export declare const GET_SKILL_DELIVERY_PREFERENCES = "agentSkillDetails/getSkillDeliveryPreferences";
export declare const GET_SKILL_CPA_MANAGEMENT_PARAMETERS = "agentSkillDetails/getSkillCPAManagementParameters";
export interface QueueCounterDetails {
    skillId: number;
    skillName: string;
    queueCount: number;
    longestQueueTimeInSeconds: number;
    agentsAvailable: number;
    agentsUnavailable: number;
    agentsWorking: number;
    mediaType: number;
}
export declare type agentSkillsAndQueueDetailsData = {
    [key: number]: QueueCounterDetails;
};
export declare type extendedSkillDetailsType = {
    [skillId: number]: {
        deliveryParameters: SkillDeliveryParameters;
        skillCPAManagementParameters: SkillCPAManagementParameters;
    };
};
export interface AgentSkillDetailsState {
    agentSkills: Array<AgentSkill>;
    isOutboundSkillAssigned: boolean;
    phoneCallOBSkillsAssigned: {
        skillId: number;
        skillName: string;
    }[];
    agentSkillsAndQueueDetails: agentSkillsAndQueueDetailsData;
    extendedSkillDetails: extendedSkillDetailsType;
    digitalOBSkills?: CXoneDigitalSkill[];
}
export declare const agentSkillDetailsInitialState: AgentSkillDetailsState;
/**
 * getAgentSkills asyncthunk used to get skills assigned to agent from sdk
 * @example - dispatch(getAgentSkills())
 */
export declare const getAgentSkills: import("@reduxjs/toolkit").AsyncThunk<never[] | AgentSkill[], void, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<import("redux").AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
/**
 * Function to start agentQueuePolling
 * @example - dispatch(startAgentQueuePolling())
 */
export declare const startAgentQueuePolling: import("@reduxjs/toolkit").AsyncThunk<void, string, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<import("redux").AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
/**
 * Used to start the Agent Skill Activity polling
 * @example - startAgentSkillActivityPolling();
 */
export declare const startAgentSkillActivityPolling: import("@reduxjs/toolkit").AsyncThunk<any, any, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<import("redux").AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
/**
 * Used to stop the Agent Skill Activity polling
 * @example - stopAgentSkillActivityPolling();
 */
export declare const stopAgentSkillActivityPolling: import("@reduxjs/toolkit").AsyncThunk<void, void, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<import("redux").AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
/**
 * getSkillDeliveryPreferences asyncthunk used to get skill delivery preferences
 * @example - dispatch(getSkillDeliveryPreferencesById(skillId))
 */
export declare const getSkillDeliveryPreferencesById: import("@reduxjs/toolkit").AsyncThunk<{
    skillId: number;
    deliveryParameters: import("yup/lib/object").AssertsShape<{
        complianceRecordsDefaultAccept: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        complianceRecordsDeliveryType: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
        complianceRecordsDisabled: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        complianceRecordsTimeout: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
        complianceRecordsTimeoutSubsequent: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
        confirmationRequiredDefault: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
        confirmationRequiredDefaultAccept: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        confirmationRequiredDeliveryType: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
        confirmationRequiredDisabled: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        confirmationRequiredTimeout: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
        confirmationRequiredTimeoutSubsequent: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
        showComplianceButtonDisposition: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
        showComplianceButtonRequeue: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
        showComplianceButtonReschedule: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
        showComplianceButtonSnooze: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
        showPreviewButtonDisposition: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
        showPreviewButtonRequeue: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
        showPreviewButtonReschedule: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
        showPreviewButtonSnooze: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
    }>;
}, number, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<import("redux").AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
/**
 * getSkillDeliveryPreferences asyncthunk used to get skill delivery preferences
 * @example - dispatch(getSkillDeliveryPreferencesById(skillId))
 */
export declare const getSkillCPAParametersById: import("@reduxjs/toolkit").AsyncThunk<{
    skillId: number;
    skillCPAManagementParameters: import("yup/lib/object").AssertsShape<{
        abandonMessagePath: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        abandonMsgMode: import("yup/lib/number").RequiredNumberSchema<number, import("yup/lib/types").AnyObject>;
        abandonTimeout: import("yup/lib/number").RequiredNumberSchema<number, import("yup/lib/types").AnyObject>;
        agentNoResponseSeconds: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
        agentOverrideOptionAnsweringMachine: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
        agentOverrideOptionBadNumber: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
        agentOverrideOptionFax: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
        agentResponseUtteranceMinimumSeconds: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
        agentVoiceThreshold: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
        ansMachineDetMode: import("yup/lib/number").RequiredNumberSchema<number, import("yup/lib/types").AnyObject>;
        ansMachineMsg: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        ansMachineOverrideSeconds: import("yup/lib/number").RequiredNumberSchema<number, import("yup/lib/types").AnyObject>;
        customerLiveSilenceSeconds: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
        customerVoiceThreshold: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
        enableCPALogging: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        exceptions: import("yup/lib/array").RequiredArraySchema<import("yup").AnySchema<any, any, any>, import("yup/lib/types").AnyObject, any[]>;
        machineEndSilenceSeconds: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
        machineEndTimeoutSeconds: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
        machineMinimumWithAgentSeconds: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
        machineMinimumWithoutAgentSeconds: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
        preConnectCPAEnabled: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
        preConnectCPARecording: import("yup").BooleanSchema<boolean, import("yup/lib/types").AnyObject, boolean>;
        treatProgressAsRinging: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
        utteranceMinimumSeconds: import("yup").NumberSchema<number, import("yup/lib/types").AnyObject, number>;
    }>;
}, number, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<import("redux").AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
export declare const agentSkillDetailsSlice: import("@reduxjs/toolkit").Slice<{
    agentSkills: WritableDraft<AgentSkill>[];
    isOutboundSkillAssigned: boolean;
    phoneCallOBSkillsAssigned: WritableDraft<{
        skillId: number;
        skillName: string;
    }>[];
    agentSkillsAndQueueDetails: WritableDraft<agentSkillsAndQueueDetailsData>;
    extendedSkillDetails: WritableDraft<extendedSkillDetailsType>;
    digitalOBSkills?: WritableDraft<import("yup/lib/object").AssertsShape<{
        skillId: import("yup/lib/number").RequiredNumberSchema<number, import("yup/lib/types").AnyObject>;
        skillName: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        digitalPOC: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        digitalPOCName: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    }>>[] | undefined;
}, {
    /**
     * Function to set agent skills
     * @param state - agentSkills
     * @param action  - PayloadAction<string>
     * @returns It returns updated agent skills
     * @example -setAgentSkills('')
     */
    setAgentSkills(state: WritableDraft<AgentSkillDetailsState>, action: PayloadAction<Array<AgentSkill>>): {
        agentSkills: AgentSkill[];
        isOutboundSkillAssigned: boolean;
        agentSkillsAndQueueDetails: agentSkillsAndQueueDetailsData;
        phoneCallOBSkillsAssigned: {
            skillId: number;
            skillName: string;
        }[];
        digitalOBSkills: import("yup/lib/object").AssertsShape<{
            skillId: import("yup/lib/number").RequiredNumberSchema<number, import("yup/lib/types").AnyObject>;
            skillName: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            digitalPOC: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            digitalPOCName: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>[];
        extendedSkillDetails: WritableDraft<extendedSkillDetailsType>;
    };
    /**
     * Function to set agents assigned to skills in state
     * @param state - agentSkills
     * @param action  - PayloadAction<any>
     * @returns It returns current status of agent
     * @example - setAgentsAssignedToSkill(state,action)
     */
    setAgentsAssignedToSkill(state: WritableDraft<AgentSkillDetailsState>, action: PayloadAction<SkillActivityResponse>): {
        agentSkillsAndQueueDetails: agentSkillsAndQueueDetailsData;
        agentSkills: WritableDraft<AgentSkill>[];
        isOutboundSkillAssigned: boolean;
        phoneCallOBSkillsAssigned: WritableDraft<{
            skillId: number;
            skillName: string;
        }>[];
        extendedSkillDetails: WritableDraft<extendedSkillDetailsType>;
        digitalOBSkills?: WritableDraft<import("yup/lib/object").AssertsShape<{
            skillId: import("yup/lib/number").RequiredNumberSchema<number, import("yup/lib/types").AnyObject>;
            skillName: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            digitalPOC: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            digitalPOCName: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>>[] | undefined;
    };
    /**
     * Function to set contact information in queue
     * @param state - QueueCounterState
     * @param action  -
     * @returns It returns
     * @example - setQueueAndSkillDetails()
     */
    setQueueAndSkillDetails(state: WritableDraft<AgentSkillDetailsState>, action: PayloadAction<AgentQueues>): {
        agentSkillsAndQueueDetails: agentSkillsAndQueueDetailsData;
        agentSkills: WritableDraft<AgentSkill>[];
        isOutboundSkillAssigned: boolean;
        phoneCallOBSkillsAssigned: WritableDraft<{
            skillId: number;
            skillName: string;
        }>[];
        extendedSkillDetails: WritableDraft<extendedSkillDetailsType>;
        digitalOBSkills?: WritableDraft<import("yup/lib/object").AssertsShape<{
            skillId: import("yup/lib/number").RequiredNumberSchema<number, import("yup/lib/types").AnyObject>;
            skillName: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            digitalPOC: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            digitalPOCName: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>>[] | undefined;
    };
    /**
     * Function to return default state for middleware
     * @param state - AgentSettings
     * @returns It returns default state
     * @example -getDefaultState()
     */
    getDefaultState(state: WritableDraft<AgentSkillDetailsState>): {
        agentSkills: WritableDraft<AgentSkill>[];
        isOutboundSkillAssigned: boolean;
        phoneCallOBSkillsAssigned: WritableDraft<{
            skillId: number;
            skillName: string;
        }>[];
        agentSkillsAndQueueDetails: WritableDraft<agentSkillsAndQueueDetailsData>;
        extendedSkillDetails: WritableDraft<extendedSkillDetailsType>;
        digitalOBSkills?: WritableDraft<import("yup/lib/object").AssertsShape<{
            skillId: import("yup/lib/number").RequiredNumberSchema<number, import("yup/lib/types").AnyObject>;
            skillName: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            digitalPOC: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            digitalPOCName: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>>[] | undefined;
    };
}, "agentSkillDetails">;
export declare const agentSkillDetailsReducer: import("redux").Reducer<{
    agentSkills: WritableDraft<AgentSkill>[];
    isOutboundSkillAssigned: boolean;
    phoneCallOBSkillsAssigned: WritableDraft<{
        skillId: number;
        skillName: string;
    }>[];
    agentSkillsAndQueueDetails: WritableDraft<agentSkillsAndQueueDetailsData>;
    extendedSkillDetails: WritableDraft<extendedSkillDetailsType>;
    digitalOBSkills?: WritableDraft<import("yup/lib/object").AssertsShape<{
        skillId: import("yup/lib/number").RequiredNumberSchema<number, import("yup/lib/types").AnyObject>;
        skillName: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        digitalPOC: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        digitalPOCName: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    }>>[] | undefined;
}, import("redux").AnyAction>;
export declare const agentSkillDetailsActions: import("@reduxjs/toolkit").CaseReducerActions<{
    /**
     * Function to set agent skills
     * @param state - agentSkills
     * @param action  - PayloadAction<string>
     * @returns It returns updated agent skills
     * @example -setAgentSkills('')
     */
    setAgentSkills(state: WritableDraft<AgentSkillDetailsState>, action: PayloadAction<Array<AgentSkill>>): {
        agentSkills: AgentSkill[];
        isOutboundSkillAssigned: boolean;
        agentSkillsAndQueueDetails: agentSkillsAndQueueDetailsData;
        phoneCallOBSkillsAssigned: {
            skillId: number;
            skillName: string;
        }[];
        digitalOBSkills: import("yup/lib/object").AssertsShape<{
            skillId: import("yup/lib/number").RequiredNumberSchema<number, import("yup/lib/types").AnyObject>;
            skillName: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            digitalPOC: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            digitalPOCName: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>[];
        extendedSkillDetails: WritableDraft<extendedSkillDetailsType>;
    };
    /**
     * Function to set agents assigned to skills in state
     * @param state - agentSkills
     * @param action  - PayloadAction<any>
     * @returns It returns current status of agent
     * @example - setAgentsAssignedToSkill(state,action)
     */
    setAgentsAssignedToSkill(state: WritableDraft<AgentSkillDetailsState>, action: PayloadAction<SkillActivityResponse>): {
        agentSkillsAndQueueDetails: agentSkillsAndQueueDetailsData;
        agentSkills: WritableDraft<AgentSkill>[];
        isOutboundSkillAssigned: boolean;
        phoneCallOBSkillsAssigned: WritableDraft<{
            skillId: number;
            skillName: string;
        }>[];
        extendedSkillDetails: WritableDraft<extendedSkillDetailsType>;
        digitalOBSkills?: WritableDraft<import("yup/lib/object").AssertsShape<{
            skillId: import("yup/lib/number").RequiredNumberSchema<number, import("yup/lib/types").AnyObject>;
            skillName: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            digitalPOC: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            digitalPOCName: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>>[] | undefined;
    };
    /**
     * Function to set contact information in queue
     * @param state - QueueCounterState
     * @param action  -
     * @returns It returns
     * @example - setQueueAndSkillDetails()
     */
    setQueueAndSkillDetails(state: WritableDraft<AgentSkillDetailsState>, action: PayloadAction<AgentQueues>): {
        agentSkillsAndQueueDetails: agentSkillsAndQueueDetailsData;
        agentSkills: WritableDraft<AgentSkill>[];
        isOutboundSkillAssigned: boolean;
        phoneCallOBSkillsAssigned: WritableDraft<{
            skillId: number;
            skillName: string;
        }>[];
        extendedSkillDetails: WritableDraft<extendedSkillDetailsType>;
        digitalOBSkills?: WritableDraft<import("yup/lib/object").AssertsShape<{
            skillId: import("yup/lib/number").RequiredNumberSchema<number, import("yup/lib/types").AnyObject>;
            skillName: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            digitalPOC: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            digitalPOCName: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>>[] | undefined;
    };
    /**
     * Function to return default state for middleware
     * @param state - AgentSettings
     * @returns It returns default state
     * @example -getDefaultState()
     */
    getDefaultState(state: WritableDraft<AgentSkillDetailsState>): {
        agentSkills: WritableDraft<AgentSkill>[];
        isOutboundSkillAssigned: boolean;
        phoneCallOBSkillsAssigned: WritableDraft<{
            skillId: number;
            skillName: string;
        }>[];
        agentSkillsAndQueueDetails: WritableDraft<agentSkillsAndQueueDetailsData>;
        extendedSkillDetails: WritableDraft<extendedSkillDetailsType>;
        digitalOBSkills?: WritableDraft<import("yup/lib/object").AssertsShape<{
            skillId: import("yup/lib/number").RequiredNumberSchema<number, import("yup/lib/types").AnyObject>;
            skillName: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            digitalPOC: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            digitalPOCName: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>>[] | undefined;
    };
}, "agentSkillDetails">;
/**
 * Function to get skill details of agent
 * @param rootState - AgentSkillDetails
 * @returns It returns agent skill details
 * @example - const agentSkillDetails = getSkillDetailsState(rootState)
 */
export declare const getSkillDetailsState: (rootState: {
    agentSkillDetails: AgentSkillDetailsState;
}) => AgentSkillDetailsState;
/**
 * @param rootState - AgentSkillDetails
 * @returns - PhoneCallOBSkillsAssigned
 * @example - getPhoneCallOBSkillsAssigned
 */
export declare const getPhoneCallOBSkillsAssigned: (rootState: {
    agentSkillDetails: AgentSkillDetailsState;
}) => {
    skillId: number;
    skillName: string;
}[];
/**
 * @param rootState - AgentSkillDetails
 * @returns - digitalOBSkills
 * @example - getDigitalOBSkills
 */
export declare const getDigitalOBSkills: (rootState: {
    agentSkillDetails: AgentSkillDetailsState;
}) => import("yup/lib/object").AssertsShape<{
    skillId: import("yup/lib/number").RequiredNumberSchema<number, import("yup/lib/types").AnyObject>;
    skillName: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    digitalPOC: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    digitalPOCName: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
}>[] | undefined;
/**
 * Function to get skills of agent
 * @param rootState - AgentSkill
 * @returns It returns agent skills
 * @example - const agentSkill = getAgentSkill(rootState)
 */
export declare const userSkillsSelector: ((state: {
    agentSkillDetails: AgentSkillDetailsState;
}) => AgentSkill[]) & import("reselect").OutputSelectorFields<(args_0: AgentSkillDetailsState) => AgentSkill[] & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const isOutboundSkillSelector: ((state: {
    agentSkillDetails: AgentSkillDetailsState;
}) => boolean) & import("reselect").OutputSelectorFields<(args_0: AgentSkillDetailsState) => boolean & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const phoneOBSkillsSelector: ((state: {
    agentSkillDetails: AgentSkillDetailsState;
}) => {
    skillId: number;
    skillName: string;
}[]) & import("reselect").OutputSelectorFields<(args_0: {
    skillId: number;
    skillName: string;
}[]) => {
    skillId: number;
    skillName: string;
}[] & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const digitalOBSkillsSelector: ((state: {
    agentSkillDetails: AgentSkillDetailsState;
}) => {
    skillId: number;
    skillName: string;
    digitalPOC: string;
    digitalPOCName: string;
}[]) & import("reselect").OutputSelectorFields<(args_0: import("yup/lib/object").AssertsShape<{
    skillId: import("yup/lib/number").RequiredNumberSchema<number, import("yup/lib/types").AnyObject>;
    skillName: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    digitalPOC: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    digitalPOCName: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
}>[] | undefined) => {
    skillId: number;
    skillName: string;
    digitalPOC: string;
    digitalPOCName: string;
}[] & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const getAgentSkillsAndQueueDetails: ((state: {
    agentSkillDetails: AgentSkillDetailsState;
}) => QueueCounterDetails[]) & import("reselect").OutputSelectorFields<(args_0: AgentSkillDetailsState) => QueueCounterDetails[] & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const getCountOfAllSkillFromPhoneQueue: ((state: {
    agentSkillDetails: AgentSkillDetailsState;
}) => number) & import("reselect").OutputSelectorFields<(args_0: AgentSkillDetailsState) => number & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const getCountOfAllContactsFromPhoneQueue: ((state: {
    agentSkillDetails: AgentSkillDetailsState;
}) => number) & import("reselect").OutputSelectorFields<(args_0: AgentSkillDetailsState) => number & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const getAllSkillDetails: ((state: {
    agentSkillDetails: AgentSkillDetailsState;
}) => {
    longestPhoneWait: number;
    longestWorkItemWait: number;
    longestVoiceMailWait: number;
    longestDigitalWait: number;
    totalPhoneContacts: number;
    totalWorkItemContacts: number;
    totalVoiceMailContacts: number;
    totalDigitalContacts: number;
    totalAllContacts: number;
}) & import("reselect").OutputSelectorFields<(args_0: AgentSkillDetailsState) => {
    longestPhoneWait: number;
    longestWorkItemWait: number;
    longestVoiceMailWait: number;
    longestDigitalWait: number;
    totalPhoneContacts: number;
    totalWorkItemContacts: number;
    totalVoiceMailContacts: number;
    totalDigitalContacts: number;
    totalAllContacts: number;
} & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const getLongestWaitForPhoneQueue: ((state: {
    agentSkillDetails: AgentSkillDetailsState;
}) => number) & import("reselect").OutputSelectorFields<(args_0: AgentSkillDetailsState) => number & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
/**
 * Gets skill details
 * @param skillId - skill Id
 * @example - Example
 * ```
 * let extendedSkillDetails = useSelector(extendedSkillDetailsById(skillId));
 * ```
 */
export declare const extendedSkillDetailsById: (skillId: number) => (state: {
    agentSkillDetails: AgentSkillDetailsState;
}) => {
    deliveryParameters: SkillDeliveryParameters;
    skillCPAManagementParameters: SkillCPAManagementParameters;
};
