import { CommitmentRequest, CommitmentResponse } from '@nice-devone/agent-sdk';
import { PayloadAction } from '@reduxjs/toolkit';
import { CommitmentEvent, ContactData } from '@nice-devone/common-sdk';
export declare const CCF_COMMITMENT_FEATURE_KEY = "ccfCommitment";
export declare const FETCH_TIME_ZONES = "commitment/fetchTimeZones";
export declare const FETCH_COMMITMENT = "commitment/fetchCommitment";
export declare const CREATE_COMMITMENT = "commitment/createCommitment";
export declare const EDIT_COMMITMENT = "commitment/editCommitment";
export declare const DELETE_COMMITMENT = "commitment/deleteCommitment";
export declare const MAKE_COMMITMENT_CALL = "commitment/makeCommitmentCall";
export declare const RESCHEDULE_COMMITMENT = "commitment/rescheduleCommitment";
export declare const CANCEL_COMMITMENT = "commitment/cancelCommitment";
export declare const CHECK_CREATE_COMMITMENT_PERMISSION = "commitment/checkCreateCommitmentPermission";
export declare const REMOVE_COMMITMENT_SETTINGS = "commitment/removeCommitmentSettings";
/**
 * @remarks "ScheduledCommitment" is to hold scheduled commitment data
 */
export interface ScheduledCommitment extends ContactData {
    /**
     * @remarks "firstName" is to hold cutomer's first name
     */
    firstName: string;
    /**
     * @remarks "lastName" is to hold cutomer's last name
     */
    lastName: string;
    /**
     * @remarks "notes" is to hold scheduled commitment notes data
     */
    notes?: string;
    /**
     * @remarks "isCommitmentReminder" is to differencialte normal contact card
     * and scheduled commitment card
     */
    isCommitmentReminder: boolean;
    /**
     * @remarks "target type" is to differentiate type of commitment
     * A for agent and S for skill
     */
    targetType: string;
}
/**
 * @remarks "CommitmentFormState" is for commitment form data
 */
export interface CommitmentFormState {
    /**
     * @remarks "A" if targeted to an Agent or "S" if targeted to a skill
     */
    commitmentType: string;
    /**
     * @remarks Outbound Skill Id to be used for callback
     */
    skillId: string;
    /**
     * @remarks First name of Agent callback is targeted to
     */
    fname: string;
    /**
     * @remarks Any notes entered into the Scheduled Callback
     */
    lname: string;
    /**
     * @remarks Phone number to be dialed by Agent
     */
    phone: string;
    /**
     * @remarks time Zone
     */
    timeZone: string;
    /**
     * @remarks ISO 8601 time requested for Scheduled Callback
     */
    dateTime: string;
    /**
     * @remarks Any notes entered into the Scheduled Callback
     */
    notes: string;
    /**
     * @remarks "A" if targeted to an Agent or "S" if targeted to a skill
     */
    callbackId: string;
}
/**
 * @remarks "TimeZone" is for Timezone data
 */
export interface TimeZone {
    /**
     * @remarks display name for the timeZone
     */
    displayName: string;
    /**
     * @remarks time zone offset
     */
    offset: string;
    /**
     * @remarks standard name for time Zone
     */
    standardName: string;
}
/**
 * @remarks "CommitmentPermissions" is for commitment create/remove permission
 */
export interface CommitmentPermissions {
    /**
     * @remarks create commitment permission
     */
    create: boolean;
    /**
     * @remarks delete commitment permission
     */
    delete: boolean;
}
/**
 * @remarks "CommitmentState" is the redux state for add/delete/update commitment
 */
export interface CommitmentState {
    /**
     * @remarks flag to set the remove commitment toast messgae
     */
    isRemoveCommitmentToastMessage: boolean;
    /**
     * @remarks flag to show the commitment form through schedule app
     */
    showCommitmentForm: boolean;
    /**
     * @remarks flag to show the commitment form through call
     */
    addCommitmentByCall: boolean;
    /**
     * @remarks flag to edit the commitment form
     */
    isEditCommitment: boolean;
    /**
     * @remarks flag to reschedule the commitment form
     */
    isRescheduleCommitment: boolean;
    /**
     * @remarks commitment form data
     */
    formData: CommitmentFormState;
    /**
     * @remarks Array containing all the time Zones
     */
    timeZones: TimeZone[];
    /**
     * @remarks Array containing commitment details
     */
    commitment: CommitmentResponse[];
    /**
     * @remarks notes required  commitment permission
     */
    notesRequiredToDelete: boolean;
    /**
     * @remarks  commitment permissions
     */
    commitmentPermissions: CommitmentPermissions;
    /**
     * @remarks  commitment data to show commitment reminder
     */
    scheduledCommitment: ScheduledCommitment | null;
}
export declare const commitmentState: CommitmentState;
/**
 * Thunk action creator to fetch timeZone Data
 * @returns - timeZone Array
 * @example - dispatch(fetchTimeZones());
 */
export declare const fetchTimeZones: import("@reduxjs/toolkit").AsyncThunk<any, void, {
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
 * Thunk action creator to fetch all the commitments for an agent
 * @param agentId - agent id
 * @returns - commitments[]
 * @example - dispatch(fetchCommitments('453678'));
 */
export declare const fetchCommitments: import("@reduxjs/toolkit").AsyncThunk<any, number, {
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
 * Thunk action creator to create an commitment
 * @param commitmentPayload - commitment form data as payload
 * @returns - callbackId
 * @example - dispatch(createCommitment(payload));
 */
export declare const createCommitment: import("@reduxjs/toolkit").AsyncThunk<any, CommitmentRequest, {
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
 * Thunk action creator to edit a commitment
 * @param commitmentPayload - commitment form data as payload
 * @param callbackId - callbackId
 * @returns - callbackId
 * @example - dispatch(editCommitment(payload));
 */
export declare const editCommitment: import("@reduxjs/toolkit").AsyncThunk<any, {
    callbackId: number;
    commitmentPayload: CommitmentRequest;
}, {
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
 * Thunk action creator to handle delete commitment
 * @param callbackId - callbackid and description
 * @returns - callbackId
 * @example - dispatch(deleteCommitment());
 */
export declare const deleteCommitment: import("@reduxjs/toolkit").AsyncThunk<any, {
    callbackId: number;
    description: string;
}, {
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
 * Thunk action creator to make a call for received commitment
 * @param callbackId - callbackId
 * @example - dispatch(makeCommitmentCall(callbackId));
 */
export declare const makeCommitmentCall: import("@reduxjs/toolkit").AsyncThunk<any, number, {
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
 * Thunk action creator to reschedule commitment
 * @param callbackId - callbackId
 * @param rescheduleDate - date of reschedule
 * @example - dispatch(rescheduleCommitment(callbackId, rescheduleDate));
 */
export declare const rescheduleCommitment: import("@reduxjs/toolkit").AsyncThunk<any, {
    callbackId: number;
    rescheduleDate: string;
}, {
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
 * Thunk action creator to cancel commitment
 * @param callbackId - callbackId
 * @param description - short description
 * @example - dispatch(cancelCommitment(callbackId, ""));
 */
export declare const cancelCommitment: import("@reduxjs/toolkit").AsyncThunk<any, {
    callbackId: number;
    description: string;
}, {
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
 * Thunk action creator to check create commitment permission
 * @returns - create commitment permission
 * @example - dispatch(checkCreateCommitmentPermission());
 */
export declare const checkCreateCommitmentPermission: import("@reduxjs/toolkit").AsyncThunk<boolean, void, {
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
 * Thunk action creator to get remove commitment settings
 * @returns - remove commitment settings
 * @example - dispatch(getRemoveCommitmentAgentSettings());
 */
export declare const getRemoveCommitmentAgentSettings: import("@reduxjs/toolkit").AsyncThunk<{
    canDelete: boolean;
    notesRequiredToDelete: boolean;
} | {
    canDelete: boolean;
    notesRequiredToDelete: boolean;
}, void, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<import("redux").AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
export declare const commitmentSlice: import("@reduxjs/toolkit").Slice<{
    isRescheduleCommitment: boolean;
    isRemoveCommitmentToastMessage: boolean;
    showCommitmentForm: boolean;
    addCommitmentByCall: boolean;
    isEditCommitment: boolean;
    formData: import("immer/dist/internal").WritableDraft<CommitmentFormState>;
    timeZones: import("immer/dist/internal").WritableDraft<TimeZone>[];
    commitment: import("immer/dist/internal").WritableDraft<CommitmentResponse>[];
    notesRequiredToDelete: boolean;
    commitmentPermissions: import("immer/dist/internal").WritableDraft<CommitmentPermissions>;
    scheduledCommitment: import("immer/dist/internal").WritableDraft<ScheduledCommitment> | null;
}, {
    /**
     * Function to set the value for showCommitmentForm
     * @param state - CommitmentState
     * @param action  - PayloadAction<boolean>
     * @returns It returns current value for showCommitmentForm
     * @example -showCommitmentForm(state,action)
     */
    showCommitmentForm(state: import("immer/dist/internal").WritableDraft<CommitmentState>, action: PayloadAction<boolean>): {
        showCommitmentForm: boolean;
        isRemoveCommitmentToastMessage: boolean;
        addCommitmentByCall: boolean;
        isEditCommitment: boolean;
        isRescheduleCommitment: boolean;
        formData: import("immer/dist/internal").WritableDraft<CommitmentFormState>;
        timeZones: import("immer/dist/internal").WritableDraft<TimeZone>[];
        commitment: import("immer/dist/internal").WritableDraft<CommitmentResponse>[];
        notesRequiredToDelete: boolean;
        commitmentPermissions: import("immer/dist/internal").WritableDraft<CommitmentPermissions>;
        scheduledCommitment: import("immer/dist/internal").WritableDraft<ScheduledCommitment> | null;
    };
    /**
     * Function to set the value for add commitment link from kebab menu
     * @param state - CommitmentState
     * @param action  - PayloadAction<boolean>
     * @returns It returns current value to open modal
     * @example -addCommitmentEvent(state,action)
     */
    addCommitmentEvent(state: import("immer/dist/internal").WritableDraft<CommitmentState>, action: PayloadAction<boolean>): {
        addCommitmentByCall: boolean;
        isRemoveCommitmentToastMessage: boolean;
        showCommitmentForm: boolean;
        isEditCommitment: boolean;
        isRescheduleCommitment: boolean;
        formData: import("immer/dist/internal").WritableDraft<CommitmentFormState>;
        timeZones: import("immer/dist/internal").WritableDraft<TimeZone>[];
        commitment: import("immer/dist/internal").WritableDraft<CommitmentResponse>[];
        notesRequiredToDelete: boolean;
        commitmentPermissions: import("immer/dist/internal").WritableDraft<CommitmentPermissions>;
        scheduledCommitment: import("immer/dist/internal").WritableDraft<ScheduledCommitment> | null;
    };
    /**
     * Function to go back to the previous state
     * @param state - CommitmentState
     * @param action  - PayloadAction<boolean>
     * @returns It returns current value to open modal
     * @example -goBackToPreviousState(state,action)
     */
    goBackToPreviousState(state: import("immer/dist/internal").WritableDraft<CommitmentState>): {
        showCommitmentForm: false;
        addCommitmentByCall: false;
        formData: CommitmentFormState;
        isRemoveCommitmentToastMessage: boolean;
        isEditCommitment: boolean;
        isRescheduleCommitment: boolean;
        timeZones: import("immer/dist/internal").WritableDraft<TimeZone>[];
        commitment: import("immer/dist/internal").WritableDraft<CommitmentResponse>[];
        notesRequiredToDelete: boolean;
        commitmentPermissions: import("immer/dist/internal").WritableDraft<CommitmentPermissions>;
        scheduledCommitment: import("immer/dist/internal").WritableDraft<ScheduledCommitment> | null;
    };
    /**
     * Function to set form data
     * @param state - CommitmentState
     * @param action  - any
     * @returns It returns current value to open modal
     * @example -formData(state,action)
     */
    formData(state: import("immer/dist/internal").WritableDraft<CommitmentState>, action: PayloadAction<{
        fieldName: string;
        fieldValue: string;
    }>): {
        formData: {
            commitmentType: string;
            skillId: string;
            fname: string;
            lname: string;
            phone: string;
            timeZone: string;
            dateTime: string;
            notes: string;
            callbackId: string;
        };
        isRemoveCommitmentToastMessage: boolean;
        showCommitmentForm: boolean;
        addCommitmentByCall: boolean;
        isEditCommitment: boolean;
        isRescheduleCommitment: boolean;
        timeZones: import("immer/dist/internal").WritableDraft<TimeZone>[];
        commitment: import("immer/dist/internal").WritableDraft<CommitmentResponse>[];
        notesRequiredToDelete: boolean;
        commitmentPermissions: import("immer/dist/internal").WritableDraft<CommitmentPermissions>;
        scheduledCommitment: import("immer/dist/internal").WritableDraft<ScheduledCommitment> | null;
    };
    /**
     * Function to set the value for edit commitments prefill data
     * @param state - CommitmentState
     * @param action  - PayloadAction<EditCommitmentEvent>
     * @returns It returns the commitment data for edit form
     * @example -EditCommitmentEvent(state,action)
     */
    editCommitmentEvent(state: import("immer/dist/internal").WritableDraft<CommitmentState>, action: PayloadAction<CommitmentFormState>): {
        formData: {
            /**
             * @remarks "A" if targeted to an Agent or "S" if targeted to a skill
             */
            commitmentType: string;
            /**
             * @remarks Outbound Skill Id to be used for callback
             */
            skillId: string;
            /**
             * @remarks First name of Agent callback is targeted to
             */
            fname: string;
            /**
             * @remarks Any notes entered into the Scheduled Callback
             */
            lname: string;
            /**
             * @remarks Phone number to be dialed by Agent
             */
            phone: string;
            /**
             * @remarks time Zone
             */
            timeZone: string;
            /**
             * @remarks ISO 8601 time requested for Scheduled Callback
             */
            dateTime: string;
            /**
             * @remarks Any notes entered into the Scheduled Callback
             */
            notes: string;
            /**
             * @remarks "A" if targeted to an Agent or "S" if targeted to a skill
             */
            callbackId: string;
        };
        isRemoveCommitmentToastMessage: boolean;
        showCommitmentForm: boolean;
        addCommitmentByCall: boolean;
        isEditCommitment: boolean;
        isRescheduleCommitment: boolean;
        timeZones: import("immer/dist/internal").WritableDraft<TimeZone>[];
        commitment: import("immer/dist/internal").WritableDraft<CommitmentResponse>[];
        notesRequiredToDelete: boolean;
        commitmentPermissions: import("immer/dist/internal").WritableDraft<CommitmentPermissions>;
        scheduledCommitment: import("immer/dist/internal").WritableDraft<ScheduledCommitment> | null;
    };
    /**
     * Function to set the value for edit commitments prefill data
     * @param state - CommitmentState
     * @param action  - PayloadAction<Boolean>
     * @returns It returns the commitment data for edit form
     * @example -setIsEditCommitment(state,action)
     */
    setIsEditCommitment(state: import("immer/dist/internal").WritableDraft<CommitmentState>, action: PayloadAction<boolean>): {
        isEditCommitment: boolean;
        isRemoveCommitmentToastMessage: boolean;
        showCommitmentForm: boolean;
        addCommitmentByCall: boolean;
        isRescheduleCommitment: boolean;
        formData: import("immer/dist/internal").WritableDraft<CommitmentFormState>;
        timeZones: import("immer/dist/internal").WritableDraft<TimeZone>[];
        commitment: import("immer/dist/internal").WritableDraft<CommitmentResponse>[];
        notesRequiredToDelete: boolean;
        commitmentPermissions: import("immer/dist/internal").WritableDraft<CommitmentPermissions>;
        scheduledCommitment: import("immer/dist/internal").WritableDraft<ScheduledCommitment> | null;
    };
    /**
     * Function to set pointer Events when toast appear
     * @param state - CommitmentState
     * @param action - PayloadAction<boolean>
     * @example - dispatch(removeCommitmentMessageConfirmed(true));
     * @returns - returns boolean value for remove confirmation toast
     */
    removeCommitmentMessageConfirmed(state: import("immer/dist/internal").WritableDraft<CommitmentState>, action: PayloadAction<boolean>): import("immer/dist/internal").WritableDraft<CommitmentState>;
    /**
     * Function to set scheduled commitemnt data to show in UI
     * @param state - CommitmentState
     * @param action - PayloadAction<CommitmentEvent>
     * @example - dispatch(setScheduledCommitment(commitmentEvent));
     * @returns - returns commitment state with scheduled commitment
     */
    setScheduledCommitment(state: import("immer/dist/internal").WritableDraft<CommitmentState>, action: PayloadAction<CommitmentEvent | null>): import("immer/dist/internal").WritableDraft<CommitmentState>;
    /**
     * Function to set the isRescheduleCommitment flag
     * @param state - CommitmentState
     * @param action  - PayloadAction<Boolean>
     * @returns It returns the commitment state
     * @example - dispatch(setIsRescheduleCommitment(true))
     */
    setIsRescheduleCommitment(state: import("immer/dist/internal").WritableDraft<CommitmentState>, action: PayloadAction<boolean>): {
        isRescheduleCommitment: boolean;
        isRemoveCommitmentToastMessage: boolean;
        showCommitmentForm: boolean;
        addCommitmentByCall: boolean;
        isEditCommitment: boolean;
        formData: import("immer/dist/internal").WritableDraft<CommitmentFormState>;
        timeZones: import("immer/dist/internal").WritableDraft<TimeZone>[];
        commitment: import("immer/dist/internal").WritableDraft<CommitmentResponse>[];
        notesRequiredToDelete: boolean;
        commitmentPermissions: import("immer/dist/internal").WritableDraft<CommitmentPermissions>;
        scheduledCommitment: import("immer/dist/internal").WritableDraft<ScheduledCommitment> | null;
    };
}, "ccfCommitment">;
export declare const commitmentReducer: import("redux").Reducer<{
    isRescheduleCommitment: boolean;
    isRemoveCommitmentToastMessage: boolean;
    showCommitmentForm: boolean;
    addCommitmentByCall: boolean;
    isEditCommitment: boolean;
    formData: import("immer/dist/internal").WritableDraft<CommitmentFormState>;
    timeZones: import("immer/dist/internal").WritableDraft<TimeZone>[];
    commitment: import("immer/dist/internal").WritableDraft<CommitmentResponse>[];
    notesRequiredToDelete: boolean;
    commitmentPermissions: import("immer/dist/internal").WritableDraft<CommitmentPermissions>;
    scheduledCommitment: import("immer/dist/internal").WritableDraft<ScheduledCommitment> | null;
}, import("redux").AnyAction>;
export declare const commitmentActions: import("@reduxjs/toolkit").CaseReducerActions<{
    /**
     * Function to set the value for showCommitmentForm
     * @param state - CommitmentState
     * @param action  - PayloadAction<boolean>
     * @returns It returns current value for showCommitmentForm
     * @example -showCommitmentForm(state,action)
     */
    showCommitmentForm(state: import("immer/dist/internal").WritableDraft<CommitmentState>, action: PayloadAction<boolean>): {
        showCommitmentForm: boolean;
        isRemoveCommitmentToastMessage: boolean;
        addCommitmentByCall: boolean;
        isEditCommitment: boolean;
        isRescheduleCommitment: boolean;
        formData: import("immer/dist/internal").WritableDraft<CommitmentFormState>;
        timeZones: import("immer/dist/internal").WritableDraft<TimeZone>[];
        commitment: import("immer/dist/internal").WritableDraft<CommitmentResponse>[];
        notesRequiredToDelete: boolean;
        commitmentPermissions: import("immer/dist/internal").WritableDraft<CommitmentPermissions>;
        scheduledCommitment: import("immer/dist/internal").WritableDraft<ScheduledCommitment> | null;
    };
    /**
     * Function to set the value for add commitment link from kebab menu
     * @param state - CommitmentState
     * @param action  - PayloadAction<boolean>
     * @returns It returns current value to open modal
     * @example -addCommitmentEvent(state,action)
     */
    addCommitmentEvent(state: import("immer/dist/internal").WritableDraft<CommitmentState>, action: PayloadAction<boolean>): {
        addCommitmentByCall: boolean;
        isRemoveCommitmentToastMessage: boolean;
        showCommitmentForm: boolean;
        isEditCommitment: boolean;
        isRescheduleCommitment: boolean;
        formData: import("immer/dist/internal").WritableDraft<CommitmentFormState>;
        timeZones: import("immer/dist/internal").WritableDraft<TimeZone>[];
        commitment: import("immer/dist/internal").WritableDraft<CommitmentResponse>[];
        notesRequiredToDelete: boolean;
        commitmentPermissions: import("immer/dist/internal").WritableDraft<CommitmentPermissions>;
        scheduledCommitment: import("immer/dist/internal").WritableDraft<ScheduledCommitment> | null;
    };
    /**
     * Function to go back to the previous state
     * @param state - CommitmentState
     * @param action  - PayloadAction<boolean>
     * @returns It returns current value to open modal
     * @example -goBackToPreviousState(state,action)
     */
    goBackToPreviousState(state: import("immer/dist/internal").WritableDraft<CommitmentState>): {
        showCommitmentForm: false;
        addCommitmentByCall: false;
        formData: CommitmentFormState;
        isRemoveCommitmentToastMessage: boolean;
        isEditCommitment: boolean;
        isRescheduleCommitment: boolean;
        timeZones: import("immer/dist/internal").WritableDraft<TimeZone>[];
        commitment: import("immer/dist/internal").WritableDraft<CommitmentResponse>[];
        notesRequiredToDelete: boolean;
        commitmentPermissions: import("immer/dist/internal").WritableDraft<CommitmentPermissions>;
        scheduledCommitment: import("immer/dist/internal").WritableDraft<ScheduledCommitment> | null;
    };
    /**
     * Function to set form data
     * @param state - CommitmentState
     * @param action  - any
     * @returns It returns current value to open modal
     * @example -formData(state,action)
     */
    formData(state: import("immer/dist/internal").WritableDraft<CommitmentState>, action: PayloadAction<{
        fieldName: string;
        fieldValue: string;
    }>): {
        formData: {
            commitmentType: string;
            skillId: string;
            fname: string;
            lname: string;
            phone: string;
            timeZone: string;
            dateTime: string;
            notes: string;
            callbackId: string;
        };
        isRemoveCommitmentToastMessage: boolean;
        showCommitmentForm: boolean;
        addCommitmentByCall: boolean;
        isEditCommitment: boolean;
        isRescheduleCommitment: boolean;
        timeZones: import("immer/dist/internal").WritableDraft<TimeZone>[];
        commitment: import("immer/dist/internal").WritableDraft<CommitmentResponse>[];
        notesRequiredToDelete: boolean;
        commitmentPermissions: import("immer/dist/internal").WritableDraft<CommitmentPermissions>;
        scheduledCommitment: import("immer/dist/internal").WritableDraft<ScheduledCommitment> | null;
    };
    /**
     * Function to set the value for edit commitments prefill data
     * @param state - CommitmentState
     * @param action  - PayloadAction<EditCommitmentEvent>
     * @returns It returns the commitment data for edit form
     * @example -EditCommitmentEvent(state,action)
     */
    editCommitmentEvent(state: import("immer/dist/internal").WritableDraft<CommitmentState>, action: PayloadAction<CommitmentFormState>): {
        formData: {
            /**
             * @remarks "A" if targeted to an Agent or "S" if targeted to a skill
             */
            commitmentType: string;
            /**
             * @remarks Outbound Skill Id to be used for callback
             */
            skillId: string;
            /**
             * @remarks First name of Agent callback is targeted to
             */
            fname: string;
            /**
             * @remarks Any notes entered into the Scheduled Callback
             */
            lname: string;
            /**
             * @remarks Phone number to be dialed by Agent
             */
            phone: string;
            /**
             * @remarks time Zone
             */
            timeZone: string;
            /**
             * @remarks ISO 8601 time requested for Scheduled Callback
             */
            dateTime: string;
            /**
             * @remarks Any notes entered into the Scheduled Callback
             */
            notes: string;
            /**
             * @remarks "A" if targeted to an Agent or "S" if targeted to a skill
             */
            callbackId: string;
        };
        isRemoveCommitmentToastMessage: boolean;
        showCommitmentForm: boolean;
        addCommitmentByCall: boolean;
        isEditCommitment: boolean;
        isRescheduleCommitment: boolean;
        timeZones: import("immer/dist/internal").WritableDraft<TimeZone>[];
        commitment: import("immer/dist/internal").WritableDraft<CommitmentResponse>[];
        notesRequiredToDelete: boolean;
        commitmentPermissions: import("immer/dist/internal").WritableDraft<CommitmentPermissions>;
        scheduledCommitment: import("immer/dist/internal").WritableDraft<ScheduledCommitment> | null;
    };
    /**
     * Function to set the value for edit commitments prefill data
     * @param state - CommitmentState
     * @param action  - PayloadAction<Boolean>
     * @returns It returns the commitment data for edit form
     * @example -setIsEditCommitment(state,action)
     */
    setIsEditCommitment(state: import("immer/dist/internal").WritableDraft<CommitmentState>, action: PayloadAction<boolean>): {
        isEditCommitment: boolean;
        isRemoveCommitmentToastMessage: boolean;
        showCommitmentForm: boolean;
        addCommitmentByCall: boolean;
        isRescheduleCommitment: boolean;
        formData: import("immer/dist/internal").WritableDraft<CommitmentFormState>;
        timeZones: import("immer/dist/internal").WritableDraft<TimeZone>[];
        commitment: import("immer/dist/internal").WritableDraft<CommitmentResponse>[];
        notesRequiredToDelete: boolean;
        commitmentPermissions: import("immer/dist/internal").WritableDraft<CommitmentPermissions>;
        scheduledCommitment: import("immer/dist/internal").WritableDraft<ScheduledCommitment> | null;
    };
    /**
     * Function to set pointer Events when toast appear
     * @param state - CommitmentState
     * @param action - PayloadAction<boolean>
     * @example - dispatch(removeCommitmentMessageConfirmed(true));
     * @returns - returns boolean value for remove confirmation toast
     */
    removeCommitmentMessageConfirmed(state: import("immer/dist/internal").WritableDraft<CommitmentState>, action: PayloadAction<boolean>): import("immer/dist/internal").WritableDraft<CommitmentState>;
    /**
     * Function to set scheduled commitemnt data to show in UI
     * @param state - CommitmentState
     * @param action - PayloadAction<CommitmentEvent>
     * @example - dispatch(setScheduledCommitment(commitmentEvent));
     * @returns - returns commitment state with scheduled commitment
     */
    setScheduledCommitment(state: import("immer/dist/internal").WritableDraft<CommitmentState>, action: PayloadAction<CommitmentEvent | null>): import("immer/dist/internal").WritableDraft<CommitmentState>;
    /**
     * Function to set the isRescheduleCommitment flag
     * @param state - CommitmentState
     * @param action  - PayloadAction<Boolean>
     * @returns It returns the commitment state
     * @example - dispatch(setIsRescheduleCommitment(true))
     */
    setIsRescheduleCommitment(state: import("immer/dist/internal").WritableDraft<CommitmentState>, action: PayloadAction<boolean>): {
        isRescheduleCommitment: boolean;
        isRemoveCommitmentToastMessage: boolean;
        showCommitmentForm: boolean;
        addCommitmentByCall: boolean;
        isEditCommitment: boolean;
        formData: import("immer/dist/internal").WritableDraft<CommitmentFormState>;
        timeZones: import("immer/dist/internal").WritableDraft<TimeZone>[];
        commitment: import("immer/dist/internal").WritableDraft<CommitmentResponse>[];
        notesRequiredToDelete: boolean;
        commitmentPermissions: import("immer/dist/internal").WritableDraft<CommitmentPermissions>;
        scheduledCommitment: import("immer/dist/internal").WritableDraft<ScheduledCommitment> | null;
    };
}, "ccfCommitment">;
/**
 * Function to get commitment data
 * @param rootState - commitmentState
 * @example
 * @returns It returns commitment data
 */
export declare const getCommitmentState: (rootState: {
    ccfCommitment: CommitmentState;
}) => CommitmentState;
export declare const getFormData: ((state: {
    ccfCommitment: CommitmentState;
}) => CommitmentFormState) & import("reselect").OutputSelectorFields<(args_0: CommitmentState) => CommitmentFormState & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const getShowCommitmentFormState: ((state: {
    ccfCommitment: CommitmentState;
}) => boolean) & import("reselect").OutputSelectorFields<(args_0: CommitmentState) => boolean & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const getAddCommitmentByCall: ((state: {
    ccfCommitment: CommitmentState;
}) => boolean) & import("reselect").OutputSelectorFields<(args_0: CommitmentState) => boolean & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const getTimeZones: ((state: {
    ccfCommitment: CommitmentState;
}) => TimeZone[]) & import("reselect").OutputSelectorFields<(args_0: CommitmentState) => TimeZone[] & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const getIsEditCommitment: ((state: {
    ccfCommitment: CommitmentState;
}) => boolean) & import("reselect").OutputSelectorFields<(args_0: CommitmentState) => boolean & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const getCommitmentsList: ((state: {
    ccfCommitment: CommitmentState;
}) => CommitmentResponse[]) & import("reselect").OutputSelectorFields<(args_0: CommitmentState) => CommitmentResponse[] & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const isRemoveCommitmentToastMessage: ((state: {
    ccfCommitment: CommitmentState;
}) => boolean) & import("reselect").OutputSelectorFields<(args_0: CommitmentState) => boolean & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const getRemoveCommitmentSettings: ((state: {
    ccfCommitment: CommitmentState;
}) => boolean) & import("reselect").OutputSelectorFields<(args_0: CommitmentState) => boolean & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const getCommitmentPermission: ((state: {
    ccfCommitment: CommitmentState;
}) => CommitmentPermissions) & import("reselect").OutputSelectorFields<(args_0: CommitmentState) => CommitmentPermissions & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const getScheduledCommitment: ((state: {
    ccfCommitment: CommitmentState;
}) => ScheduledCommitment | null) & import("reselect").OutputSelectorFields<(args_0: CommitmentState) => ScheduledCommitment & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const getIsRescheduleCommitment: ((state: {
    ccfCommitment: CommitmentState;
}) => boolean) & import("reselect").OutputSelectorFields<(args_0: CommitmentState) => boolean & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
