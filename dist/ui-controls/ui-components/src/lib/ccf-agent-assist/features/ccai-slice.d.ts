import { PayloadAction } from '@reduxjs/toolkit';
import { KnowledgeArticleSuggestion, KnowledgeArticlesForContactId } from '@nice-devone/common-sdk';
export declare const AGENT_ASSIST_CCAI_KEY = "ccfAgentAssistCCAI";
/**
 * Interface for CCAI Data
 */
export interface AgentCCAIData {
    contactId: string;
    data: {
        knowledgeArticleSuggestions?: KnowledgeArticleSuggestion[];
        smartReplies?: KnowledgeArticleSuggestion[];
    };
}
/**
 * Interface for CCAI State
 */
export interface AgentAssistCCAIState {
    value: AgentCCAIData[];
}
/**
 * CCAI State Slice
 */
export declare const CcfAgentAssistCCAISlice: import("@reduxjs/toolkit").Slice<AgentAssistCCAIState, {
    /**
     * update the Knowledge Article Suggestions list in the state for a contact id
     * @param state - AgentCCAIState
     * @param action - action payload
     * @example -
     * ```
     * dispatch(setKnowledgeArticleSuggestionsForContactId(@param));
     * ```
    */
    setKnowledgeArticleSuggestionsForContactId(state: import("immer/dist/internal").WritableDraft<AgentAssistCCAIState>, action: PayloadAction<KnowledgeArticlesForContactId>): void;
    /**
     * update the Smart Replies list in the state for a contact id
     * @param state - AgentCCAIState
     * @param action - action payload
     * @example -
     * ```
     * dispatch(setSmartRepliesForContactId(@param));
     * ```
     */
    setSmartRepliesForContactId(state: import("immer/dist/internal").WritableDraft<AgentAssistCCAIState>, action: PayloadAction<KnowledgeArticlesForContactId>): void;
    /**
     * remove the entry for a contact id from the state
     * @param state - AgentCCAIState
     * @param action - action payload
     * @example -
     * ```
     * dispatch(removeEntryForContactId(@param));
     * ```
     */
    removeEntryForContactId(state: import("immer/dist/internal").WritableDraft<AgentAssistCCAIState>, action: PayloadAction<string>): void;
    /**
     * clear the state and reset to initial value
     * @param state - AgentCCAIState
     * @example -
     * ```
     * dispatch(clearState());
     * ```
     */
    clearState(state: import("immer/dist/internal").WritableDraft<AgentAssistCCAIState>): void;
    /**
     * Function to return default state for middleware
     * @param state - AgentCCAIState
     * @returns - default state for AgentCCAIState
     * @example - default()
    */
    default(state: import("immer/dist/internal").WritableDraft<AgentAssistCCAIState>): {
        value: import("immer/dist/internal").WritableDraft<AgentCCAIData>[];
    };
}, "ccfAgentAssistCCAI">;
export declare const ccfAgentAssistCCAIActions: import("@reduxjs/toolkit").CaseReducerActions<{
    /**
     * update the Knowledge Article Suggestions list in the state for a contact id
     * @param state - AgentCCAIState
     * @param action - action payload
     * @example -
     * ```
     * dispatch(setKnowledgeArticleSuggestionsForContactId(@param));
     * ```
    */
    setKnowledgeArticleSuggestionsForContactId(state: import("immer/dist/internal").WritableDraft<AgentAssistCCAIState>, action: PayloadAction<KnowledgeArticlesForContactId>): void;
    /**
     * update the Smart Replies list in the state for a contact id
     * @param state - AgentCCAIState
     * @param action - action payload
     * @example -
     * ```
     * dispatch(setSmartRepliesForContactId(@param));
     * ```
     */
    setSmartRepliesForContactId(state: import("immer/dist/internal").WritableDraft<AgentAssistCCAIState>, action: PayloadAction<KnowledgeArticlesForContactId>): void;
    /**
     * remove the entry for a contact id from the state
     * @param state - AgentCCAIState
     * @param action - action payload
     * @example -
     * ```
     * dispatch(removeEntryForContactId(@param));
     * ```
     */
    removeEntryForContactId(state: import("immer/dist/internal").WritableDraft<AgentAssistCCAIState>, action: PayloadAction<string>): void;
    /**
     * clear the state and reset to initial value
     * @param state - AgentCCAIState
     * @example -
     * ```
     * dispatch(clearState());
     * ```
     */
    clearState(state: import("immer/dist/internal").WritableDraft<AgentAssistCCAIState>): void;
    /**
     * Function to return default state for middleware
     * @param state - AgentCCAIState
     * @returns - default state for AgentCCAIState
     * @example - default()
    */
    default(state: import("immer/dist/internal").WritableDraft<AgentAssistCCAIState>): {
        value: import("immer/dist/internal").WritableDraft<AgentCCAIData>[];
    };
}, "ccfAgentAssistCCAI">;
export declare const ccfAgentAssistCCAIReducer: import("redux").Reducer<AgentAssistCCAIState, import("redux").AnyAction>;
/**
 * Selector to get Knowledge Article Suggestions for a contact Id
 * @returns - List of KnowledgeArticleSuggestions
 * @example - const kaArticles = useSelector(getKnowledgeArticleSuggestionsForContactId(contactId));
 */
export declare const getKnowledgeArticleSuggestionsForContactId: (contactId: string) => ((state: {
    ccfAgentAssistCCAI: AgentAssistCCAIState;
}) => KnowledgeArticleSuggestion[] | null) & import("reselect").OutputSelectorFields<(args_0: AgentAssistCCAIState) => KnowledgeArticleSuggestion[] & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
/**
 * Selector to get Smart Reply Suggestions for a contact Id
 * @returns - List of Smart Replies
 * @example - const smartReplies = useSelector(getSmartRepliesForContactId(contactId));
 */
export declare const getSmartRepliesForContactId: (contactId: string) => ((state: {
    ccfAgentAssistCCAI: AgentAssistCCAIState;
}) => KnowledgeArticleSuggestion[] | null) & import("reselect").OutputSelectorFields<(args_0: AgentAssistCCAIState) => KnowledgeArticleSuggestion[] & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
