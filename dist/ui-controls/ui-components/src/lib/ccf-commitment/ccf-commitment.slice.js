import { CXoneClient, } from '@nice-devone/agent-sdk';
import { createAsyncThunk, createSelector, createSlice, } from '@reduxjs/toolkit';
import { getUtcTimezoneOffset } from '../../util/common';
import { MediaType, PermissionKeys, PermissionValues, VoiceContactStatus, } from '@nice-devone/common-sdk';
export const CCF_COMMITMENT_FEATURE_KEY = 'ccfCommitment';
export const FETCH_TIME_ZONES = 'commitment/fetchTimeZones';
export const FETCH_COMMITMENT = 'commitment/fetchCommitment';
export const CREATE_COMMITMENT = 'commitment/createCommitment';
export const EDIT_COMMITMENT = 'commitment/editCommitment';
export const DELETE_COMMITMENT = 'commitment/deleteCommitment';
export const MAKE_COMMITMENT_CALL = 'commitment/makeCommitmentCall';
export const RESCHEDULE_COMMITMENT = 'commitment/rescheduleCommitment';
export const CANCEL_COMMITMENT = 'commitment/cancelCommitment';
export const CHECK_CREATE_COMMITMENT_PERMISSION = 'commitment/checkCreateCommitmentPermission';
export const REMOVE_COMMITMENT_SETTINGS = 'commitment/removeCommitmentSettings';
let logger;
const initialFormState = {
    commitmentType: '',
    skillId: '',
    fname: '',
    lname: '',
    phone: '',
    timeZone: getUtcTimezoneOffset(),
    dateTime: '',
    notes: '',
    callbackId: '',
};
export const commitmentState = {
    isRemoveCommitmentToastMessage: false,
    showCommitmentForm: false,
    addCommitmentByCall: false,
    isEditCommitment: false,
    isRescheduleCommitment: false,
    timeZones: [],
    formData: initialFormState,
    commitment: [],
    notesRequiredToDelete: false,
    commitmentPermissions: {
        create: false,
        delete: false,
    },
    scheduledCommitment: null,
};
/**
 * Thunk action creator to fetch timeZone Data
 * @returns - timeZone Array
 * @example - dispatch(fetchTimeZones());
 */
export const fetchTimeZones = createAsyncThunk(FETCH_TIME_ZONES, () => CXoneClient.instance.common
    .getTimezones()
    .then((resp) => {
    return resp;
})
    .catch((error) => {
    logger.debug('[CcfCommitmentSlice][fetchTimeZones]', `payload: ${JSON.stringify(error)}`);
    return error;
}));
/**
 * Thunk action creator to fetch all the commitments for an agent
 * @param agentId - agent id
 * @returns - commitments[]
 * @example - dispatch(fetchCommitments('453678'));
 */
export const fetchCommitments = createAsyncThunk(FETCH_COMMITMENT, (agentId) => CXoneClient.instance.commitment
    .getCommitments(agentId)
    .then((response) => {
    return Array.isArray(response) ? response : [];
})
    .catch((error) => {
    logger.debug('[CcfCommitmentSlice][fetchCommitment]', `payload: ${JSON.stringify(error)}`);
    return error;
}));
/**
 * Thunk action creator to create an commitment
 * @param commitmentPayload - commitment form data as payload
 * @returns - callbackId
 * @example - dispatch(createCommitment(payload));
 */
export const createCommitment = createAsyncThunk(CREATE_COMMITMENT, (commitmentPayload) => CXoneClient.instance.commitment
    .createCommitment(commitmentPayload)
    .catch((error) => {
    logger.debug('[CcfCommitmentSlice][createCommitment]', `payload: ${JSON.stringify(error)}`);
    return error;
}));
/**
 * Thunk action creator to edit a commitment
 * @param commitmentPayload - commitment form data as payload
 * @param callbackId - callbackId
 * @returns - callbackId
 * @example - dispatch(editCommitment(payload));
 */
export const editCommitment = createAsyncThunk(EDIT_COMMITMENT, (data) => CXoneClient.instance.commitment
    .editCommitment(data.callbackId, data.commitmentPayload)
    .catch((error) => {
    logger.debug('[CcfCommitmentSlice][editCommitment]', `payload: ${JSON.stringify(error)}`);
    return error;
}));
/**
 * Thunk action creator to handle delete commitment
 * @param callbackId - callbackid and description
 * @returns - callbackId
 * @example - dispatch(deleteCommitment());
 */
export const deleteCommitment = createAsyncThunk(DELETE_COMMITMENT, (data) => CXoneClient.instance.commitment
    .deleteCommitment(data.callbackId, data.description)
    .then(() => {
    return { callbackId: data.callbackId };
})
    .catch((error) => {
    logger.debug('[CcfCommitmentSlice][deleteCommitment]', `payload: ${JSON.stringify(error)}`);
    return error;
}));
/**
 * Thunk action creator to make a call for received commitment
 * @param callbackId - callbackId
 * @example - dispatch(makeCommitmentCall(callbackId));
 */
export const makeCommitmentCall = createAsyncThunk(MAKE_COMMITMENT_CALL, (callbackId) => CXoneClient.instance.commitment
    .makeCommitmentCall(callbackId)
    .then(() => {
    return { callbackId };
})
    .catch((error) => {
    logger.debug('[CcfCommitmentSlice][makeCommitmentCall]', `payload: ${JSON.stringify(error)}`);
    return error;
}));
/**
 * Thunk action creator to reschedule commitment
 * @param callbackId - callbackId
 * @param rescheduleDate - date of reschedule
 * @example - dispatch(rescheduleCommitment(callbackId, rescheduleDate));
 */
export const rescheduleCommitment = createAsyncThunk(RESCHEDULE_COMMITMENT, (data) => CXoneClient.instance.commitment
    .rescheduleCommitment(data.callbackId, data.rescheduleDate)
    .then(() => {
    return { callbackId: data.callbackId };
})
    .catch((error) => {
    logger.debug('[CcfCommitmentSlice][rescheduleCommitment]', `payload: ${JSON.stringify(error)}`);
    return error;
}));
/**
 * Thunk action creator to cancel commitment
 * @param callbackId - callbackId
 * @param description - short description
 * @example - dispatch(cancelCommitment(callbackId, ""));
 */
export const cancelCommitment = createAsyncThunk(CANCEL_COMMITMENT, (data) => CXoneClient.instance.commitment
    .cancelCommitment(data.callbackId, data.description)
    .then(() => {
    return { callbackId: data.callbackId };
})
    .catch((error) => {
    logger.debug('[CcfCommitmentSlice][cancelCommitment]', `payload: ${JSON.stringify(error)}`);
    return error;
}));
/**
 * Thunk action creator to check create commitment permission
 * @returns - create commitment permission
 * @example - dispatch(checkCreateCommitmentPermission());
 */
export const checkCreateCommitmentPermission = createAsyncThunk(CHECK_CREATE_COMMITMENT_PERMISSION, () => CXoneClient.instance.agentPermission
    .checkPermissions(PermissionKeys.HIDE_CREATE_COMMITMENTS, PermissionValues.HIDE)
    .then((result) => {
    return !result;
})
    .catch((error) => {
    logger.debug('[CcfCommitmentSlice][checkCreateCommitmentPermission]', `payload: ${JSON.stringify(error)}`);
    return false;
}));
/**
 * Thunk action creator to get remove commitment settings
 * @returns - remove commitment settings
 * @example - dispatch(getRemoveCommitmentAgentSettings());
 */
export const getRemoveCommitmentAgentSettings = createAsyncThunk(REMOVE_COMMITMENT_SETTINGS, () => CXoneClient.instance.agentSetting
    .getAgentSettings()
    .then((result) => {
    const agentSettings = result;
    const deleteCommitmentString = agentSettings.deleteCommitmentString;
    let canDelete = true;
    let notesRequiredToDelete = false;
    switch (deleteCommitmentString) {
        case 'CantRemove':
            canDelete = false;
            break;
        case 'CanRemoveWithNotes':
            notesRequiredToDelete = true;
            break;
        default:
            canDelete = true;
            notesRequiredToDelete = false;
    }
    return { canDelete, notesRequiredToDelete };
})
    .catch((error) => {
    logger.debug('[CcfCommitmentSlice][getCommitmentSettings]', `payload: ${JSON.stringify(error)}`);
    return { canDelete: false, notesRequiredToDelete: false };
}));
export const commitmentSlice = createSlice({
    name: CCF_COMMITMENT_FEATURE_KEY,
    initialState: commitmentState,
    reducers: {
        /**
         * Function to set the value for showCommitmentForm
         * @param state - CommitmentState
         * @param action  - PayloadAction<boolean>
         * @returns It returns current value for showCommitmentForm
         * @example -showCommitmentForm(state,action)
         */
        showCommitmentForm(state, action) {
            return Object.assign(Object.assign({}, state), { showCommitmentForm: action.payload });
        },
        /**
         * Function to set the value for add commitment link from kebab menu
         * @param state - CommitmentState
         * @param action  - PayloadAction<boolean>
         * @returns It returns current value to open modal
         * @example -addCommitmentEvent(state,action)
         */
        addCommitmentEvent(state, action) {
            return Object.assign(Object.assign({}, state), { addCommitmentByCall: action.payload });
        },
        /**
         * Function to go back to the previous state
         * @param state - CommitmentState
         * @param action  - PayloadAction<boolean>
         * @returns It returns current value to open modal
         * @example -goBackToPreviousState(state,action)
         */
        goBackToPreviousState(state) {
            return Object.assign(Object.assign({}, state), { showCommitmentForm: false, addCommitmentByCall: false, formData: initialFormState });
        },
        /**
         * Function to set form data
         * @param state - CommitmentState
         * @param action  - any
         * @returns It returns current value to open modal
         * @example -formData(state,action)
         */
        formData(state, action) {
            return Object.assign(Object.assign({}, state), { formData: Object.assign(Object.assign({}, state.formData), { [action.payload.fieldName]: action.payload.fieldValue }) });
        },
        /**
         * Function to set the value for edit commitments prefill data
         * @param state - CommitmentState
         * @param action  - PayloadAction<EditCommitmentEvent>
         * @returns It returns the commitment data for edit form
         * @example -EditCommitmentEvent(state,action)
         */
        editCommitmentEvent(state, action) {
            return Object.assign(Object.assign({}, state), { formData: Object.assign({}, action.payload) });
        },
        /**
         * Function to set the value for edit commitments prefill data
         * @param state - CommitmentState
         * @param action  - PayloadAction<Boolean>
         * @returns It returns the commitment data for edit form
         * @example -setIsEditCommitment(state,action)
         */
        setIsEditCommitment(state, action) {
            return Object.assign(Object.assign({}, state), { isEditCommitment: action.payload });
        },
        /**
         * Function to set pointer Events when toast appear
         * @param state - CommitmentState
         * @param action - PayloadAction<boolean>
         * @example - dispatch(removeCommitmentMessageConfirmed(true));
         * @returns - returns boolean value for remove confirmation toast
         */
        removeCommitmentMessageConfirmed(state, action) {
            state.isRemoveCommitmentToastMessage = action.payload;
            return state;
        },
        /**
         * Function to set scheduled commitemnt data to show in UI
         * @param state - CommitmentState
         * @param action - PayloadAction<CommitmentEvent>
         * @example - dispatch(setScheduledCommitment(commitmentEvent));
         * @returns - returns commitment state with scheduled commitment
         */
        setScheduledCommitment(state, action) {
            const scheduledCommitment = action.payload;
            const scheduledContact = scheduledCommitment
                ? {
                    contactId: scheduledCommitment.callbackId,
                    media: MediaType.VOICE,
                    isOutbound: true,
                    isSelected: true,
                    contactMode: scheduledCommitment.dialNumber,
                    customerName: `${scheduledCommitment.firstName} ${scheduledCommitment.lastName}`,
                    contactStatus: VoiceContactStatus.RINGING,
                    skillOrQueueId: scheduledCommitment.skillId,
                    contactReceivedTime: scheduledCommitment.deliveryTime,
                    refusalTimeOut: 120000,
                    isCommitmentReminder: true,
                    notes: scheduledCommitment.notes,
                    targetType: scheduledCommitment.targetType,
                    firstName: scheduledCommitment.firstName,
                    lastName: scheduledCommitment.lastName,
                }
                : null;
            state.scheduledCommitment = scheduledContact;
            return state;
        },
        /**
         * Function to set the isRescheduleCommitment flag
         * @param state - CommitmentState
         * @param action  - PayloadAction<Boolean>
         * @returns It returns the commitment state
         * @example - dispatch(setIsRescheduleCommitment(true))
         */
        setIsRescheduleCommitment(state, action) {
            return Object.assign(Object.assign({}, state), { isRescheduleCommitment: action.payload });
        },
    },
    extraReducers: (builder) => {
        builder.addCase(createCommitment.fulfilled, (state) => {
            return Object.assign(Object.assign({}, state), { formData: initialFormState });
        });
        builder.addCase(fetchTimeZones.fulfilled, (state, action) => {
            return Object.assign(Object.assign({}, state), { timeZones: [...action.payload] });
        });
        builder.addCase(fetchCommitments.fulfilled, (state, action) => {
            return Object.assign(Object.assign({}, state), { commitment: [...action.payload] });
        });
        builder.addCase(deleteCommitment.fulfilled, (state, action) => {
            return Object.assign(Object.assign({}, state), { commitment: state.commitment.filter((item) => Number(item.callbackId) !== Number(action.payload.callbackId)) });
        });
        builder.addCase(checkCreateCommitmentPermission.fulfilled, (state, action) => {
            return Object.assign(Object.assign({}, state), { commitmentPermissions: Object.assign(Object.assign({}, state.commitmentPermissions), { create: action.payload }) });
        });
        builder.addCase(getRemoveCommitmentAgentSettings.fulfilled, (state, action) => {
            return Object.assign(Object.assign({}, state), { commitmentPermissions: Object.assign(Object.assign({}, state.commitmentPermissions), { delete: action.payload.canDelete }), notesRequiredToDelete: action.payload.notesRequiredToDelete });
        });
    },
});
export const commitmentReducer = commitmentSlice.reducer;
export const commitmentActions = commitmentSlice.actions;
/**
 * Function to get commitment data
 * @param rootState - commitmentState
 * @example
 * @returns It returns commitment data
 */
export const getCommitmentState = (rootState) => {
    return rootState[CCF_COMMITMENT_FEATURE_KEY];
};
export const getFormData = createSelector(getCommitmentState, (state) => state === null || state === void 0 ? void 0 : state.formData);
export const getShowCommitmentFormState = createSelector(getCommitmentState, (state) => state === null || state === void 0 ? void 0 : state.showCommitmentForm);
export const getAddCommitmentByCall = createSelector(getCommitmentState, (state) => state === null || state === void 0 ? void 0 : state.addCommitmentByCall);
export const getTimeZones = createSelector(getCommitmentState, (state) => state === null || state === void 0 ? void 0 : state.timeZones);
export const getIsEditCommitment = createSelector(getCommitmentState, (state) => state === null || state === void 0 ? void 0 : state.isEditCommitment);
export const getCommitmentsList = createSelector(getCommitmentState, (state) => state === null || state === void 0 ? void 0 : state.commitment.filter((commitment) => commitment.target === 'A'));
export const isRemoveCommitmentToastMessage = createSelector(getCommitmentState, (state) => state.isRemoveCommitmentToastMessage);
export const getRemoveCommitmentSettings = createSelector(getCommitmentState, (state) => state.notesRequiredToDelete);
export const getCommitmentPermission = createSelector(getCommitmentState, (state) => state === null || state === void 0 ? void 0 : state.commitmentPermissions);
export const getScheduledCommitment = createSelector(getCommitmentState, (state) => state === null || state === void 0 ? void 0 : state.scheduledCommitment);
export const getIsRescheduleCommitment = createSelector(getCommitmentState, (state) => state === null || state === void 0 ? void 0 : state.isRescheduleCommitment);
//# sourceMappingURL=ccf-commitment.slice.js.map