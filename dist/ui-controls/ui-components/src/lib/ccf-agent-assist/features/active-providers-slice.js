import { createSelector, createSlice } from '@reduxjs/toolkit';
export const AGENT_ASSIST_ACTIVE_PROVIDERS_KEY = 'ccfAgentAssistActiveProviders';
const initialState = {
    value: [],
};
export const CcfAgentAssistAtiveProvidersSlice = createSlice({
    name: AGENT_ASSIST_ACTIVE_PROVIDERS_KEY,
    initialState: initialState,
    reducers: {
        /**
         * reducer function to update active providers
         * @example - dispatch(updateActiveProviders(provider));
         */
        updateActiveProvidersForContactId(state, action) {
            const foundContact = state.value.find((entry) => entry.contactId === action.payload.contactId);
            if (!foundContact) {
                state.value = [...state.value, action.payload];
            }
            else {
                const newProviders = foundContact.providers.concat(action.payload.providers).sort();
                foundContact.providers = newProviders;
            }
        },
        /**
         * reducer function to remove active providers for a contact id
         * @example - dispatch(removeActiveProvidersForContactId(contactId));
         */
        removeActiveProvidersForContactId(state, action) {
            state.value = state.value.filter((provider) => provider.contactId !== action.payload);
        },
        /**
         * reducer function to clear the state
         * @example - dispatch(clearState());
         */
        clearState(state) {
            state.value = [];
        },
        /**
         * Function to return default state for middleware
         * @param state - AgentAssistActiveProvidersState
         * @returns It returns default state
         * @example -default()
        */
        default(state) {
            return Object.assign({}, state);
        },
    },
});
export const ccfAgentAssistActiveProvidersActions = CcfAgentAssistAtiveProvidersSlice.actions;
export const ccfAgentAssistActiveProvidersReducer = CcfAgentAssistAtiveProvidersSlice.reducer;
/**
 * get agent assist active providers state slice
 * @example - getAgentAssistActiveProvidersState(rootState);
 */
const getAgentAssistActiveProvidersState = (rootState) => {
    return rootState[AGENT_ASSIST_ACTIVE_PROVIDERS_KEY];
};
/**
 * selector function to get agent assist active providers list from the state
 * @example - const activeProvidersList = useSelector(getAgentAssistActiveProviders());
 */
export const getAgentAssistActiveProvidersForContactId = (contactId) => createSelector(getAgentAssistActiveProvidersState, (state) => { var _a; return ((_a = state.value.find(entry => entry.contactId === contactId)) === null || _a === void 0 ? void 0 : _a.providers) || null; });
//# sourceMappingURL=active-providers-slice.js.map