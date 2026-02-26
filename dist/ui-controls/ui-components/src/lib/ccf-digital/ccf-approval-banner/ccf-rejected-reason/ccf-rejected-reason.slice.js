import { createSlice, createSelector } from '@reduxjs/toolkit';
/**
 * This is the key for rejected reason slice
 */
export const REJECTED_REASON_KEY = 'rejectedReason';
;
/**
 * This interface is for the initial rejected reason state
 */
const initialRejectedReasonState = {
    rejectedReasonDetails: {},
};
/**
 * Slice for managing rejected reason state
 * @remarks - Stores draft reason text and visibility state of rejected reason box
 */
export const ccfRejectedReasonSlice = createSlice({
    name: REJECTED_REASON_KEY,
    initialState: initialRejectedReasonState,
    reducers: {
        /**
         * Updates the draft reason text for a specific case and draft message
         * @param state - Current state
         * @param action - Payload containing caseId, draftMessageId, and reason text
         */
        setDraftReason: (state, action) => {
            var _a;
            const { caseId, draftMessageId, reason } = action.payload;
            return Object.assign(Object.assign({}, state), { rejectedReasonDetails: Object.assign(Object.assign({}, state.rejectedReasonDetails), { [caseId]: Object.assign(Object.assign({}, state.rejectedReasonDetails[caseId]), { [draftMessageId]: Object.assign(Object.assign({}, (_a = state.rejectedReasonDetails[caseId]) === null || _a === void 0 ? void 0 : _a[draftMessageId]), { draftReason: reason }) }) }) });
        },
        /**
         * Sets the visibility state of rejected reason box for a specific case and draft message
         * @param state - Current state
         * @param action - Payload containing caseId, draftMessageId, and boolean visibility state
         */
        setIsRejectedReasonBoxOpen: (state, action) => {
            var _a;
            const { caseId, draftMessageId, isOpen } = action.payload;
            return Object.assign(Object.assign({}, state), { rejectedReasonDetails: Object.assign(Object.assign({}, state.rejectedReasonDetails), { [caseId]: Object.assign(Object.assign({}, state.rejectedReasonDetails[caseId]), { [draftMessageId]: Object.assign(Object.assign({}, (_a = state.rejectedReasonDetails[caseId]) === null || _a === void 0 ? void 0 : _a[draftMessageId]), { isRejectedReasonBoxOpen: isOpen }) }) }) });
        },
        /**
         * Resets the rejected reason state for a specific case and draft message
         * @param state - Current state
         * @param action - Payload containing caseId and draftMessageId
         */
        resetRejectedReasonState: (state, action) => {
            var _a;
            const { caseId, draftMessageId } = action.payload;
            if (draftMessageId && ((_a = state.rejectedReasonDetails[caseId]) === null || _a === void 0 ? void 0 : _a[draftMessageId])) {
                delete state.rejectedReasonDetails[caseId][draftMessageId];
                if (Object.keys(state.rejectedReasonDetails[caseId]).length === 0) {
                    delete state.rejectedReasonDetails[caseId];
                }
            }
            else {
                delete state.rejectedReasonDetails[caseId];
            }
            return state;
        },
        /**
       * Sets the approval action in-progress state for a specific case and draft message
       * @param state - Current state
       * @param action - Payload containing caseId, draftMessageId, and boolean isInProgress state
       */
        setIsApprovalActionInProgress: (state, action) => {
            var _a;
            const { caseId, draftMessageId, isInProgress } = action.payload;
            return Object.assign(Object.assign({}, state), { rejectedReasonDetails: Object.assign(Object.assign({}, state.rejectedReasonDetails), { [caseId]: Object.assign(Object.assign({}, state.rejectedReasonDetails[caseId]), { [draftMessageId]: Object.assign(Object.assign({}, (_a = state.rejectedReasonDetails[caseId]) === null || _a === void 0 ? void 0 : _a[draftMessageId]), { isApprovalActionInProgress: isInProgress }) }) }) });
        },
    },
});
export const CcfRejectedReasonAction = ccfRejectedReasonSlice.actions;
export const CcfRejectedReasonReducer = ccfRejectedReasonSlice.reducer;
/**
 * Function to get rejected reason state from root state
 * @param rootState - RejectedReasonState
 * @returns It returns rejected reason state
 * @example - const rejectedReason = getRejectedReasonState(rootState)
 */
export const getRejectedReasonState = (rootState) => rootState[REJECTED_REASON_KEY];
/**
 * Function to get is rejected reason box open state from root state
 * @param caseId - case Id
 * @param draftMessageId - draft message Id
 * @returns It returns rejected reason state
 * @example - const isRejectedReasonBoxOpen = getIsRejectedReasonBoxOpen(caseId, draftMessageId)
 */
export const getIsRejectedReasonBoxOpen = (caseId, draftMessageId) => createSelector(getRejectedReasonState, (state) => { var _a, _b, _c; return (_c = (_b = (_a = state === null || state === void 0 ? void 0 : state.rejectedReasonDetails) === null || _a === void 0 ? void 0 : _a[caseId]) === null || _b === void 0 ? void 0 : _b[draftMessageId]) === null || _c === void 0 ? void 0 : _c.isRejectedReasonBoxOpen; });
/**
* Function to get rejected draft reason from root state
* @param casedId - case Id
* @param draftMessageId - draft message Id
* @returns It returns rejected draft reason
* @example - const draftReason = getDraftReason(caseId, draftMessageId)
*/
export const getDraftReason = (caseId, draftMessageId) => createSelector(getRejectedReasonState, (state) => { var _a, _b, _c; return (_c = (_b = (_a = state === null || state === void 0 ? void 0 : state.rejectedReasonDetails) === null || _a === void 0 ? void 0 : _a[caseId]) === null || _b === void 0 ? void 0 : _b[draftMessageId]) === null || _c === void 0 ? void 0 : _c.draftReason; });
/**
* Function to get approval action in progress state from root state
* @param caseId - case Id
* @param draftMessageId - draft message Id
* @returns It returns the approval action in progress state
* @example - const isApprovalActionInProgress = getIsApprovalActionInProgress(caseId, draftMessageId)
*/
export const getIsApprovalActionInProgress = (caseId, draftMessageId) => createSelector(getRejectedReasonState, (state) => { var _a, _b, _c; return (_c = (_b = (_a = state === null || state === void 0 ? void 0 : state.rejectedReasonDetails) === null || _a === void 0 ? void 0 : _a[caseId]) === null || _b === void 0 ? void 0 : _b[draftMessageId]) === null || _c === void 0 ? void 0 : _c.isApprovalActionInProgress; });
//# sourceMappingURL=ccf-rejected-reason.slice.js.map