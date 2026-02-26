import { createSelector, createSlice } from '@reduxjs/toolkit';
export const AGENT_ASSIST_CCAI_KEY = 'ccfAgentAssistCCAI';
/**
 * CCAI Initial State
 */
const initialState = {
    value: [],
};
/**
 * CCAI State Slice
 */
export const CcfAgentAssistCCAISlice = createSlice({
    name: AGENT_ASSIST_CCAI_KEY,
    initialState: initialState,
    reducers: {
        /**
         * update the Knowledge Article Suggestions list in the state for a contact id
         * @param state - AgentCCAIState
         * @param action - action payload
         * @example -
         * ```
         * dispatch(setKnowledgeArticleSuggestionsForContactId(@param));
         * ```
        */
        setKnowledgeArticleSuggestionsForContactId(state, action) {
            const kbEntryInState = state.value.find((entry) => { var _a; return (entry === null || entry === void 0 ? void 0 : entry.contactId) === ((_a = action === null || action === void 0 ? void 0 : action.payload) === null || _a === void 0 ? void 0 : _a.contactId); });
            if (kbEntryInState) {
                kbEntryInState.data.knowledgeArticleSuggestions = action.payload.knowledgeArticleSuggestions;
            }
            else {
                const newEntry = {
                    contactId: action.payload.contactId,
                    data: {
                        knowledgeArticleSuggestions: action.payload.knowledgeArticleSuggestions,
                    },
                };
                state.value = [...state.value, newEntry];
            }
        },
        /**
         * update the Smart Replies list in the state for a contact id
         * @param state - AgentCCAIState
         * @param action - action payload
         * @example -
         * ```
         * dispatch(setSmartRepliesForContactId(@param));
         * ```
         */
        setSmartRepliesForContactId(state, action) {
            const kbEntryInState = state.value.find((entry) => { var _a; return (entry === null || entry === void 0 ? void 0 : entry.contactId) === ((_a = action === null || action === void 0 ? void 0 : action.payload) === null || _a === void 0 ? void 0 : _a.contactId); });
            if (kbEntryInState) {
                kbEntryInState.data.smartReplies = action.payload.knowledgeArticleSuggestions;
            }
            else {
                const newEntry = {
                    contactId: action.payload.contactId,
                    data: {
                        smartReplies: action.payload.knowledgeArticleSuggestions,
                    },
                };
                state.value = [...state.value, newEntry];
            }
        },
        /**
         * remove the entry for a contact id from the state
         * @param state - AgentCCAIState
         * @param action - action payload
         * @example -
         * ```
         * dispatch(removeEntryForContactId(@param));
         * ```
         */
        removeEntryForContactId(state, action) {
            const kbEntryInState = state.value.find((entry) => entry.contactId === action.payload);
            if (kbEntryInState) {
                state.value = state.value.filter((entry) => entry.contactId !== action.payload);
            }
        },
        /**
         * clear the state and reset to initial value
         * @param state - AgentCCAIState
         * @example -
         * ```
         * dispatch(clearState());
         * ```
         */
        clearState(state) {
            state.value = initialState.value;
        },
        /**
         * Function to return default state for middleware
         * @param state - AgentCCAIState
         * @returns - default state for AgentCCAIState
         * @example - default()
        */
        default(state) {
            return Object.assign({}, state);
        },
    },
});
export const ccfAgentAssistCCAIActions = CcfAgentAssistCCAISlice.actions;
export const ccfAgentAssistCCAIReducer = CcfAgentAssistCCAISlice.reducer;
/**
 * Get root state of the slice
 * @returns - ccai slice root state
 * @example - getAgentAssistCCAIState(rootState);
 */
const getAgentAssistCCAIState = (rootState) => {
    return rootState[AGENT_ASSIST_CCAI_KEY];
};
/**
 * Selector to get Knowledge Article Suggestions for a contact Id
 * @returns - List of KnowledgeArticleSuggestions
 * @example - const kaArticles = useSelector(getKnowledgeArticleSuggestionsForContactId(contactId));
 */
export const getKnowledgeArticleSuggestionsForContactId = (contactId) => createSelector(getAgentAssistCCAIState, (state) => { var _a; return ((_a = state.value.find((entry) => entry.contactId === contactId)) === null || _a === void 0 ? void 0 : _a.data.knowledgeArticleSuggestions) || null; });
/**
 * Selector to get Smart Reply Suggestions for a contact Id
 * @returns - List of Smart Replies
 * @example - const smartReplies = useSelector(getSmartRepliesForContactId(contactId));
 */
export const getSmartRepliesForContactId = (contactId) => createSelector(getAgentAssistCCAIState, (state) => { var _a; return ((_a = state.value.find((entry) => entry.contactId === contactId)) === null || _a === void 0 ? void 0 : _a.data.smartReplies) || null; });
//# sourceMappingURL=ccai-slice.js.map