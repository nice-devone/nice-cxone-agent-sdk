import { PayloadAction } from '@reduxjs/toolkit';
/**
 * This is the key for rejected reason slice
 */
export declare const REJECTED_REASON_KEY = "rejectedReason";
/**
 * This interface is for the reject reason details
 */
export interface RejectReasonDetails {
    draftReason: string;
    isRejectedReasonBoxOpen: boolean;
    isApprovalActionInProgress: boolean;
}
/**
 * This interface is for the rejected reason state
 */
export interface RejectedReasonState {
    rejectedReasonDetails: {
        [caseId: string]: {
            [draftMessageId: string]: RejectReasonDetails;
        };
    };
}
/**
 * Slice for managing rejected reason state
 * @remarks - Stores draft reason text and visibility state of rejected reason box
 */
export declare const ccfRejectedReasonSlice: import("@reduxjs/toolkit").Slice<RejectedReasonState, {
    /**
     * Updates the draft reason text for a specific case and draft message
     * @param state - Current state
     * @param action - Payload containing caseId, draftMessageId, and reason text
     */
    setDraftReason: (state: import("immer/dist/internal").WritableDraft<RejectedReasonState>, action: PayloadAction<{
        caseId: string;
        draftMessageId: string;
        reason: string;
    }>) => {
        rejectedReasonDetails: {
            [x: string]: import("immer/dist/internal").WritableDraft<{
                [draftMessageId: string]: RejectReasonDetails;
            }> | {
                [x: string]: import("immer/dist/internal").WritableDraft<RejectReasonDetails> | {
                    draftReason: string;
                    isRejectedReasonBoxOpen: boolean;
                    isApprovalActionInProgress: boolean;
                };
            };
        };
    };
    /**
     * Sets the visibility state of rejected reason box for a specific case and draft message
     * @param state - Current state
     * @param action - Payload containing caseId, draftMessageId, and boolean visibility state
     */
    setIsRejectedReasonBoxOpen: (state: import("immer/dist/internal").WritableDraft<RejectedReasonState>, action: PayloadAction<{
        caseId: string;
        draftMessageId: string;
        isOpen: boolean;
    }>) => {
        rejectedReasonDetails: {
            [x: string]: import("immer/dist/internal").WritableDraft<{
                [draftMessageId: string]: RejectReasonDetails;
            }> | {
                [x: string]: import("immer/dist/internal").WritableDraft<RejectReasonDetails> | {
                    isRejectedReasonBoxOpen: boolean;
                    draftReason: string;
                    isApprovalActionInProgress: boolean;
                };
            };
        };
    };
    /**
     * Resets the rejected reason state for a specific case and draft message
     * @param state - Current state
     * @param action - Payload containing caseId and draftMessageId
     */
    resetRejectedReasonState: (state: import("immer/dist/internal").WritableDraft<RejectedReasonState>, action: PayloadAction<{
        caseId: string;
        draftMessageId?: string;
    }>) => import("immer/dist/internal").WritableDraft<RejectedReasonState>;
    /**
   * Sets the approval action in-progress state for a specific case and draft message
   * @param state - Current state
   * @param action - Payload containing caseId, draftMessageId, and boolean isInProgress state
   */
    setIsApprovalActionInProgress: (state: import("immer/dist/internal").WritableDraft<RejectedReasonState>, action: PayloadAction<{
        caseId: string;
        draftMessageId: string;
        isInProgress: boolean;
    }>) => {
        rejectedReasonDetails: {
            [x: string]: import("immer/dist/internal").WritableDraft<{
                [draftMessageId: string]: RejectReasonDetails;
            }> | {
                [x: string]: import("immer/dist/internal").WritableDraft<RejectReasonDetails> | {
                    isApprovalActionInProgress: boolean;
                    draftReason: string;
                    isRejectedReasonBoxOpen: boolean;
                };
            };
        };
    };
}, "rejectedReason">;
export declare const CcfRejectedReasonAction: import("@reduxjs/toolkit").CaseReducerActions<{
    /**
     * Updates the draft reason text for a specific case and draft message
     * @param state - Current state
     * @param action - Payload containing caseId, draftMessageId, and reason text
     */
    setDraftReason: (state: import("immer/dist/internal").WritableDraft<RejectedReasonState>, action: PayloadAction<{
        caseId: string;
        draftMessageId: string;
        reason: string;
    }>) => {
        rejectedReasonDetails: {
            [x: string]: import("immer/dist/internal").WritableDraft<{
                [draftMessageId: string]: RejectReasonDetails;
            }> | {
                [x: string]: import("immer/dist/internal").WritableDraft<RejectReasonDetails> | {
                    draftReason: string;
                    isRejectedReasonBoxOpen: boolean;
                    isApprovalActionInProgress: boolean;
                };
            };
        };
    };
    /**
     * Sets the visibility state of rejected reason box for a specific case and draft message
     * @param state - Current state
     * @param action - Payload containing caseId, draftMessageId, and boolean visibility state
     */
    setIsRejectedReasonBoxOpen: (state: import("immer/dist/internal").WritableDraft<RejectedReasonState>, action: PayloadAction<{
        caseId: string;
        draftMessageId: string;
        isOpen: boolean;
    }>) => {
        rejectedReasonDetails: {
            [x: string]: import("immer/dist/internal").WritableDraft<{
                [draftMessageId: string]: RejectReasonDetails;
            }> | {
                [x: string]: import("immer/dist/internal").WritableDraft<RejectReasonDetails> | {
                    isRejectedReasonBoxOpen: boolean;
                    draftReason: string;
                    isApprovalActionInProgress: boolean;
                };
            };
        };
    };
    /**
     * Resets the rejected reason state for a specific case and draft message
     * @param state - Current state
     * @param action - Payload containing caseId and draftMessageId
     */
    resetRejectedReasonState: (state: import("immer/dist/internal").WritableDraft<RejectedReasonState>, action: PayloadAction<{
        caseId: string;
        draftMessageId?: string;
    }>) => import("immer/dist/internal").WritableDraft<RejectedReasonState>;
    /**
   * Sets the approval action in-progress state for a specific case and draft message
   * @param state - Current state
   * @param action - Payload containing caseId, draftMessageId, and boolean isInProgress state
   */
    setIsApprovalActionInProgress: (state: import("immer/dist/internal").WritableDraft<RejectedReasonState>, action: PayloadAction<{
        caseId: string;
        draftMessageId: string;
        isInProgress: boolean;
    }>) => {
        rejectedReasonDetails: {
            [x: string]: import("immer/dist/internal").WritableDraft<{
                [draftMessageId: string]: RejectReasonDetails;
            }> | {
                [x: string]: import("immer/dist/internal").WritableDraft<RejectReasonDetails> | {
                    isApprovalActionInProgress: boolean;
                    draftReason: string;
                    isRejectedReasonBoxOpen: boolean;
                };
            };
        };
    };
}, "rejectedReason">;
export declare const CcfRejectedReasonReducer: import("redux").Reducer<RejectedReasonState, import("redux").AnyAction>;
/**
 * Function to get rejected reason state from root state
 * @param rootState - RejectedReasonState
 * @returns It returns rejected reason state
 * @example - const rejectedReason = getRejectedReasonState(rootState)
 */
export declare const getRejectedReasonState: (rootState: {
    rejectedReason: RejectedReasonState;
}) => RejectedReasonState;
/**
 * Function to get is rejected reason box open state from root state
 * @param caseId - case Id
 * @param draftMessageId - draft message Id
 * @returns It returns rejected reason state
 * @example - const isRejectedReasonBoxOpen = getIsRejectedReasonBoxOpen(caseId, draftMessageId)
 */
export declare const getIsRejectedReasonBoxOpen: (caseId: string, draftMessageId: string) => ((state: {
    rejectedReason: RejectedReasonState;
}) => boolean) & import("reselect").OutputSelectorFields<(args_0: RejectedReasonState) => boolean & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
/**
* Function to get rejected draft reason from root state
* @param casedId - case Id
* @param draftMessageId - draft message Id
* @returns It returns rejected draft reason
* @example - const draftReason = getDraftReason(caseId, draftMessageId)
*/
export declare const getDraftReason: (caseId: string, draftMessageId: string) => ((state: {
    rejectedReason: RejectedReasonState;
}) => string) & import("reselect").OutputSelectorFields<(args_0: RejectedReasonState) => string & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
/**
* Function to get approval action in progress state from root state
* @param caseId - case Id
* @param draftMessageId - draft message Id
* @returns It returns the approval action in progress state
* @example - const isApprovalActionInProgress = getIsApprovalActionInProgress(caseId, draftMessageId)
*/
export declare const getIsApprovalActionInProgress: (caseId: string, draftMessageId: string) => ((state: {
    rejectedReason: RejectedReasonState;
}) => boolean) & import("reselect").OutputSelectorFields<(args_0: RejectedReasonState) => boolean & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
