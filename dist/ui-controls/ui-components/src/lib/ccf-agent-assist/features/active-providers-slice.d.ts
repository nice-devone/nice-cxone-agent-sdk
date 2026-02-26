import { PayloadAction } from '@reduxjs/toolkit';
export declare const AGENT_ASSIST_ACTIVE_PROVIDERS_KEY = "ccfAgentAssistActiveProviders";
/**
 * Interface for representing model for Active Providers for a ContactId
 */
export interface ActiveProvidersForContactId {
    contactId: string;
    providers: any[];
}
/**
 * Interface for representing model for redux state slice ccfAgentAssistActiveProviders
 */
export interface AgentAssistActiveProvidersState {
    value: ActiveProvidersForContactId[];
}
export declare const CcfAgentAssistAtiveProvidersSlice: import("@reduxjs/toolkit").Slice<AgentAssistActiveProvidersState, {
    /**
     * reducer function to update active providers
     * @example - dispatch(updateActiveProviders(provider));
     */
    updateActiveProvidersForContactId(state: import("immer/dist/internal").WritableDraft<AgentAssistActiveProvidersState>, action: PayloadAction<any>): void;
    /**
     * reducer function to remove active providers for a contact id
     * @example - dispatch(removeActiveProvidersForContactId(contactId));
     */
    removeActiveProvidersForContactId(state: import("immer/dist/internal").WritableDraft<AgentAssistActiveProvidersState>, action: PayloadAction<string>): void;
    /**
     * reducer function to clear the state
     * @example - dispatch(clearState());
     */
    clearState(state: import("immer/dist/internal").WritableDraft<AgentAssistActiveProvidersState>): void;
    /**
     * Function to return default state for middleware
     * @param state - AgentAssistActiveProvidersState
     * @returns It returns default state
     * @example -default()
    */
    default(state: import("immer/dist/internal").WritableDraft<AgentAssistActiveProvidersState>): {
        value: import("immer/dist/internal").WritableDraft<ActiveProvidersForContactId>[];
    };
}, "ccfAgentAssistActiveProviders">;
export declare const ccfAgentAssistActiveProvidersActions: import("@reduxjs/toolkit").CaseReducerActions<{
    /**
     * reducer function to update active providers
     * @example - dispatch(updateActiveProviders(provider));
     */
    updateActiveProvidersForContactId(state: import("immer/dist/internal").WritableDraft<AgentAssistActiveProvidersState>, action: PayloadAction<any>): void;
    /**
     * reducer function to remove active providers for a contact id
     * @example - dispatch(removeActiveProvidersForContactId(contactId));
     */
    removeActiveProvidersForContactId(state: import("immer/dist/internal").WritableDraft<AgentAssistActiveProvidersState>, action: PayloadAction<string>): void;
    /**
     * reducer function to clear the state
     * @example - dispatch(clearState());
     */
    clearState(state: import("immer/dist/internal").WritableDraft<AgentAssistActiveProvidersState>): void;
    /**
     * Function to return default state for middleware
     * @param state - AgentAssistActiveProvidersState
     * @returns It returns default state
     * @example -default()
    */
    default(state: import("immer/dist/internal").WritableDraft<AgentAssistActiveProvidersState>): {
        value: import("immer/dist/internal").WritableDraft<ActiveProvidersForContactId>[];
    };
}, "ccfAgentAssistActiveProviders">;
export declare const ccfAgentAssistActiveProvidersReducer: import("redux").Reducer<AgentAssistActiveProvidersState, import("redux").AnyAction>;
/**
 * selector function to get agent assist active providers list from the state
 * @example - const activeProvidersList = useSelector(getAgentAssistActiveProviders());
 */
export declare const getAgentAssistActiveProvidersForContactId: (contactId: string) => ((state: {
    ccfAgentAssistActiveProviders: AgentAssistActiveProvidersState;
}) => any[] | null) & import("reselect").OutputSelectorFields<(args_0: AgentAssistActiveProvidersState) => any[] & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
