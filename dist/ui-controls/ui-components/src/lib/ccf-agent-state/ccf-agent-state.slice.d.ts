import { AgentStates } from '@nice-devone/agent-sdk';
import { AgentCurrentState, AgentState, UnavailableCode, CXoneSdkError } from '@nice-devone/common-sdk';
import { AnyAction, PayloadAction, ThunkDispatch } from '@reduxjs/toolkit';
import { Id } from 'react-toastify';
import { agentDirectoryActions } from '../ccf-directory/+state/ccf-directory.slice';
export declare const AGENT_STATE_KEY = "agentState";
export declare const UNAVAILABLE_CODES = "agentState/UnavailableCodes";
export declare const SUBSCRIBE_AGENT_STATE = "agentState/SubscribeAgentStates";
export declare const UPDATE_AGENT_STATE = "agentState/update";
export interface Status {
    id: string;
    isFavourite: boolean;
    reason: string;
    state: string;
    isAcw?: boolean;
    isActive?: boolean;
    displayText?: string;
    skillName?: string;
    isPersonalConnection?: boolean;
}
export interface AgentLegStatusType {
    status: string;
    agentLegId?: string;
    finalState?: boolean;
}
export interface agentCurrentStatus {
    currentState: AgentCurrentState;
    nNextState?: AgentCurrentState;
    nextState: AgentCurrentState;
}
export interface lastSelectedState {
    selectedState?: AgentCurrentState;
}
export interface AgentSkills {
    isOutbound: boolean;
    skillId: number;
    skillName: string;
    isPersonalConnection: boolean;
}
export interface UserInfoDetails {
    firstName: string;
    icAgentId: string;
    icBUId: string;
    icClusterId: string;
    lastName: string;
    tenantId: string;
    userId: string;
    userName: string;
}
export interface AgentStateProps {
    allStatus: Status[];
    agentStatus?: agentCurrentStatus;
    agentSelectedState?: lastSelectedState;
    agentLegConnectionStatus: AgentLegStatusType;
    userInfo: UserInfoDetails;
    teamName: string;
    isAgentStateNavigationKeyPressed: boolean;
    storeFavsToastReference?: Id | null;
    showClientDataApiFailedToast: {
        storageExceeded: boolean;
        apiFailed: boolean;
    };
}
export declare const agentStateStatus: AgentStateProps;
/**
 * mapCodesToStatus - Takes an UnavailableCode[] and returns a Status[]
 * @example - mapCodesToStatus()
 */
export declare const mapCodesToStatus: (state: AgentStateProps, codes: UnavailableCode[]) => {
    id: string;
    isFavourite: boolean;
    reason: string;
    state: AgentStates;
    isAcw: boolean;
    isActive: boolean;
    skillName: string | undefined;
    isPersonalConnection: boolean | undefined;
}[];
/** to update favorite agent state values
   * @example -
   * ```
   * updateFavoriteAgentStates();
   * ```
*/
export declare const updateFavoriteAgentStatesClientData: (currFavAgentStatesList: number[]) => Promise<void>;
/** to queue fav states ids and send after certain time
   * @example -
   * ```
   * queueFavStatesUpdate(['available','unavailable']);
   * ```
   */
export declare const queueFavStatesUpdate: (favStatesIds: number[], newFavState: string, dispatch: ThunkDispatch<unknown, unknown, AnyAction>) => void;
/**
 * getUnavailableCodesAndPcSkills asyncthunk used to get unavailable codes and PC skills from sdk
 * @example - dispatch(getUnavailableCodesAndPcSkills())
 */
export declare const getUnavailableCodesAndPcSkills: import("@reduxjs/toolkit").AsyncThunk<unknown, void, {
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
 * getTeamName asyncthunk used to get teamname from sdk
 * @example - dispatch(getTeamName())
 */
export declare const getTeamName: import("@reduxjs/toolkit").AsyncThunk<unknown, void, {
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
 * subscribeForStateEvents asyncthunk used to get updated agent state on login, handling contact and etc
 * @example - dispatch(subscribeForStateEvents())
 */
export declare const subscribeForStateEvents: import("@reduxjs/toolkit").AsyncThunk<void, void, {
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
 * setAgentState asyncthunk used to send agent state request by manually selecting from menu
 * @example - dispatch(setAgentState(\{selectedState: agentState\}))
 */
export declare const setAgentState: import("@reduxjs/toolkit").AsyncThunk<CXoneSdkError | import("@nice-devone/common-sdk").HttpResponse, {
    selectedState: AgentState;
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
* Thunk action creator to interact with SDK and manage retrieval of user information
*
* ```
* @example
* dispatch(
 getUserInfo()
 );
* ```
*/
export declare const getUserInfo: import("@reduxjs/toolkit").AsyncThunk<unknown, void, {
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
 * connectAgentLeg asyncthunk used to connect agent leg request by manually selecting from header option
 * @example - dispatch(connectAgentLeg())
 */
export declare const connectAgentLeg: import("@reduxjs/toolkit").AsyncThunk<unknown, void, {
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
 * disconnectAgentLeg asyncthunk used to disconnect agent leg request by manually selecting from header option
 * @example - dispatch(disconnectAgentLeg())
 */
export declare const disconnectAgentLeg: import("@reduxjs/toolkit").AsyncThunk<unknown, void, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
/** to update agent setting values
   * @example -
   * ```
   * flushFavStates();
   * ```
   */
export declare const flushFavStates: import("@reduxjs/toolkit").AsyncThunk<void, string, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
export declare const agentStateSlice: import("@reduxjs/toolkit").Slice<{
    showClientDataApiFailedToast: {
        storageExceeded: boolean;
        apiFailed: boolean;
    };
    allStatus: import("immer/dist/internal").WritableDraft<Status>[];
    agentStatus?: import("immer/dist/internal").WritableDraft<agentCurrentStatus> | undefined;
    agentSelectedState?: import("immer/dist/internal").WritableDraft<lastSelectedState> | undefined;
    agentLegConnectionStatus: import("immer/dist/internal").WritableDraft<AgentLegStatusType>;
    userInfo: import("immer/dist/internal").WritableDraft<UserInfoDetails>;
    teamName: string;
    isAgentStateNavigationKeyPressed: boolean;
    storeFavsToastReference?: Id | null | undefined;
}, {
    /**
     * Function to set the selected state of agent
     * @param state - AgentState
     * @param action  - PayloadAction<string>
     * @returns Sets the last selected state of the agent
     * @example -setSelectedState('Available')
     */
    setSelectedState(state: import("immer/dist/internal").WritableDraft<AgentStateProps>, action: PayloadAction<any>): {
        agentSelectedState: any;
        allStatus: import("immer/dist/internal").WritableDraft<Status>[];
        agentStatus?: import("immer/dist/internal").WritableDraft<agentCurrentStatus> | undefined;
        agentLegConnectionStatus: import("immer/dist/internal").WritableDraft<AgentLegStatusType>;
        userInfo: import("immer/dist/internal").WritableDraft<UserInfoDetails>;
        teamName: string;
        isAgentStateNavigationKeyPressed: boolean;
        storeFavsToastReference?: Id | null | undefined;
        showClientDataApiFailedToast: import("immer/dist/internal").WritableDraft<{
            storageExceeded: boolean;
            apiFailed: boolean;
        }>;
    };
    /**
     * Function to set current status of agent
     * @param state - AgentState
     * @param action  - PayloadAction<string>
     * @returns It returns current status of agent
     * @example -setCurrentStatus('Available')
     */
    setCurrentStatus(state: import("immer/dist/internal").WritableDraft<AgentStateProps>, action: PayloadAction<any>): {
        agentStatus: any;
        allStatus: import("immer/dist/internal").WritableDraft<Status>[];
        agentSelectedState?: import("immer/dist/internal").WritableDraft<lastSelectedState> | undefined;
        agentLegConnectionStatus: import("immer/dist/internal").WritableDraft<AgentLegStatusType>;
        userInfo: import("immer/dist/internal").WritableDraft<UserInfoDetails>;
        teamName: string;
        isAgentStateNavigationKeyPressed: boolean;
        storeFavsToastReference?: Id | null | undefined;
        showClientDataApiFailedToast: import("immer/dist/internal").WritableDraft<{
            storageExceeded: boolean;
            apiFailed: boolean;
        }>;
    };
    /**
     * Function to return default state for middleware
     * @param state - AgentState
     * @returns It returns default state
     * @example -default()
     */
    default(state: import("immer/dist/internal").WritableDraft<AgentStateProps>): {
        allStatus: import("immer/dist/internal").WritableDraft<Status>[];
        agentStatus?: import("immer/dist/internal").WritableDraft<agentCurrentStatus> | undefined;
        agentSelectedState?: import("immer/dist/internal").WritableDraft<lastSelectedState> | undefined;
        agentLegConnectionStatus: import("immer/dist/internal").WritableDraft<AgentLegStatusType>;
        userInfo: import("immer/dist/internal").WritableDraft<UserInfoDetails>;
        teamName: string;
        isAgentStateNavigationKeyPressed: boolean;
        storeFavsToastReference?: Id | null | undefined;
        showClientDataApiFailedToast: import("immer/dist/internal").WritableDraft<{
            storageExceeded: boolean;
            apiFailed: boolean;
        }>;
    };
    /**
     * Function to set current leg status of agent
     * @param state - AgentLegState
     * @param action  - PayloadAction<string>
     * @returns It returns current agent leg status
     * @example -setAgentLegData('Active')
     */
    setAgentLegData(state: import("immer/dist/internal").WritableDraft<AgentStateProps>, action: PayloadAction<AgentLegStatusType>): {
        agentLegConnectionStatus: {
            status: string;
            agentLegId?: string | undefined;
            finalState?: boolean | undefined;
        };
        allStatus: import("immer/dist/internal").WritableDraft<Status>[];
        agentStatus?: import("immer/dist/internal").WritableDraft<agentCurrentStatus> | undefined;
        agentSelectedState?: import("immer/dist/internal").WritableDraft<lastSelectedState> | undefined;
        userInfo: import("immer/dist/internal").WritableDraft<UserInfoDetails>;
        teamName: string;
        isAgentStateNavigationKeyPressed: boolean;
        storeFavsToastReference?: Id | null | undefined;
        showClientDataApiFailedToast: import("immer/dist/internal").WritableDraft<{
            storageExceeded: boolean;
            apiFailed: boolean;
        }>;
    };
    /**
     * Function to update favourite status of agent
     * @param state - AgentState
     * @param action  - PayloadAction<string>
     * @returns It returns favourite status
     * ```
     * @example -const status {
     * id?: 12;
     * isFavourite?: true;
     * reason?: 'Client';
     * }
     *```
     */
    updateFavourite(state: import("immer/dist/internal").WritableDraft<AgentStateProps>, action: PayloadAction<Status>): {
        allStatus: import("immer/dist/internal").WritableDraft<Status>[];
        agentStatus?: import("immer/dist/internal").WritableDraft<agentCurrentStatus> | undefined;
        agentSelectedState?: import("immer/dist/internal").WritableDraft<lastSelectedState> | undefined;
        agentLegConnectionStatus: import("immer/dist/internal").WritableDraft<AgentLegStatusType>;
        userInfo: import("immer/dist/internal").WritableDraft<UserInfoDetails>;
        teamName: string;
        isAgentStateNavigationKeyPressed: boolean;
        storeFavsToastReference?: Id | null | undefined;
        showClientDataApiFailedToast: import("immer/dist/internal").WritableDraft<{
            storageExceeded: boolean;
            apiFailed: boolean;
        }>;
    };
    /**
     * Reducer function to update focus on agent state
     * @param state - agentLegState
     * @param action - action.payload
     * @example - dispatch(focusAgentState(false));
     * @returns - updated state
     */
    focusAgentState(state: import("immer/dist/internal").WritableDraft<AgentStateProps>, action: {
        payload: any;
        type: string;
    }): import("immer/dist/internal").WritableDraft<AgentStateProps>;
    /**
     * Method used to set toast reference
     * @param state - DirectoryState
     * @param action - payload with an object containing toast reference ID
     * @example -
     * ```
     * dispatch(updateFavsToastRefrence(Id));
     * ```
     */
    updateFavsToastReference(state: import("immer/dist/internal").WritableDraft<AgentStateProps>, action: PayloadAction<Id | null>): {
        storeFavsToastReference: Id | null;
        allStatus: import("immer/dist/internal").WritableDraft<Status>[];
        agentStatus?: import("immer/dist/internal").WritableDraft<agentCurrentStatus> | undefined;
        agentSelectedState?: import("immer/dist/internal").WritableDraft<lastSelectedState> | undefined;
        agentLegConnectionStatus: import("immer/dist/internal").WritableDraft<AgentLegStatusType>;
        userInfo: import("immer/dist/internal").WritableDraft<UserInfoDetails>;
        teamName: string;
        isAgentStateNavigationKeyPressed: boolean;
        showClientDataApiFailedToast: import("immer/dist/internal").WritableDraft<{
            storageExceeded: boolean;
            apiFailed: boolean;
        }>;
    };
    /**
      * Method used to set error toast for client data API failure
      * @param state - DirectoryState
      * @example -
      * ```
      * dispatch(clientDataApiFailed(false)));
      * ```
      * @returns
      */
    clientDataApiFailedForState(state: import("immer/dist/internal").WritableDraft<AgentStateProps>, action: PayloadAction<{
        storageExceeded: boolean;
        apiFailed: boolean;
    }>): {
        showClientDataApiFailedToast: {
            storageExceeded: boolean;
            apiFailed: boolean;
        };
        allStatus: import("immer/dist/internal").WritableDraft<Status>[];
        agentStatus?: import("immer/dist/internal").WritableDraft<agentCurrentStatus> | undefined;
        agentSelectedState?: import("immer/dist/internal").WritableDraft<lastSelectedState> | undefined;
        agentLegConnectionStatus: import("immer/dist/internal").WritableDraft<AgentLegStatusType>;
        userInfo: import("immer/dist/internal").WritableDraft<UserInfoDetails>;
        teamName: string;
        isAgentStateNavigationKeyPressed: boolean;
        storeFavsToastReference?: Id | null | undefined;
    };
}, "agentState">;
export declare const agentStateReducer: import("redux").Reducer<{
    showClientDataApiFailedToast: {
        storageExceeded: boolean;
        apiFailed: boolean;
    };
    allStatus: import("immer/dist/internal").WritableDraft<Status>[];
    agentStatus?: import("immer/dist/internal").WritableDraft<agentCurrentStatus> | undefined;
    agentSelectedState?: import("immer/dist/internal").WritableDraft<lastSelectedState> | undefined;
    agentLegConnectionStatus: import("immer/dist/internal").WritableDraft<AgentLegStatusType>;
    userInfo: import("immer/dist/internal").WritableDraft<UserInfoDetails>;
    teamName: string;
    isAgentStateNavigationKeyPressed: boolean;
    storeFavsToastReference?: Id | null | undefined;
}, AnyAction>;
export declare const agentStateActions: import("@reduxjs/toolkit").CaseReducerActions<{
    /**
     * Function to set the selected state of agent
     * @param state - AgentState
     * @param action  - PayloadAction<string>
     * @returns Sets the last selected state of the agent
     * @example -setSelectedState('Available')
     */
    setSelectedState(state: import("immer/dist/internal").WritableDraft<AgentStateProps>, action: PayloadAction<any>): {
        agentSelectedState: any;
        allStatus: import("immer/dist/internal").WritableDraft<Status>[];
        agentStatus?: import("immer/dist/internal").WritableDraft<agentCurrentStatus> | undefined;
        agentLegConnectionStatus: import("immer/dist/internal").WritableDraft<AgentLegStatusType>;
        userInfo: import("immer/dist/internal").WritableDraft<UserInfoDetails>;
        teamName: string;
        isAgentStateNavigationKeyPressed: boolean;
        storeFavsToastReference?: Id | null | undefined;
        showClientDataApiFailedToast: import("immer/dist/internal").WritableDraft<{
            storageExceeded: boolean;
            apiFailed: boolean;
        }>;
    };
    /**
     * Function to set current status of agent
     * @param state - AgentState
     * @param action  - PayloadAction<string>
     * @returns It returns current status of agent
     * @example -setCurrentStatus('Available')
     */
    setCurrentStatus(state: import("immer/dist/internal").WritableDraft<AgentStateProps>, action: PayloadAction<any>): {
        agentStatus: any;
        allStatus: import("immer/dist/internal").WritableDraft<Status>[];
        agentSelectedState?: import("immer/dist/internal").WritableDraft<lastSelectedState> | undefined;
        agentLegConnectionStatus: import("immer/dist/internal").WritableDraft<AgentLegStatusType>;
        userInfo: import("immer/dist/internal").WritableDraft<UserInfoDetails>;
        teamName: string;
        isAgentStateNavigationKeyPressed: boolean;
        storeFavsToastReference?: Id | null | undefined;
        showClientDataApiFailedToast: import("immer/dist/internal").WritableDraft<{
            storageExceeded: boolean;
            apiFailed: boolean;
        }>;
    };
    /**
     * Function to return default state for middleware
     * @param state - AgentState
     * @returns It returns default state
     * @example -default()
     */
    default(state: import("immer/dist/internal").WritableDraft<AgentStateProps>): {
        allStatus: import("immer/dist/internal").WritableDraft<Status>[];
        agentStatus?: import("immer/dist/internal").WritableDraft<agentCurrentStatus> | undefined;
        agentSelectedState?: import("immer/dist/internal").WritableDraft<lastSelectedState> | undefined;
        agentLegConnectionStatus: import("immer/dist/internal").WritableDraft<AgentLegStatusType>;
        userInfo: import("immer/dist/internal").WritableDraft<UserInfoDetails>;
        teamName: string;
        isAgentStateNavigationKeyPressed: boolean;
        storeFavsToastReference?: Id | null | undefined;
        showClientDataApiFailedToast: import("immer/dist/internal").WritableDraft<{
            storageExceeded: boolean;
            apiFailed: boolean;
        }>;
    };
    /**
     * Function to set current leg status of agent
     * @param state - AgentLegState
     * @param action  - PayloadAction<string>
     * @returns It returns current agent leg status
     * @example -setAgentLegData('Active')
     */
    setAgentLegData(state: import("immer/dist/internal").WritableDraft<AgentStateProps>, action: PayloadAction<AgentLegStatusType>): {
        agentLegConnectionStatus: {
            status: string;
            agentLegId?: string | undefined;
            finalState?: boolean | undefined;
        };
        allStatus: import("immer/dist/internal").WritableDraft<Status>[];
        agentStatus?: import("immer/dist/internal").WritableDraft<agentCurrentStatus> | undefined;
        agentSelectedState?: import("immer/dist/internal").WritableDraft<lastSelectedState> | undefined;
        userInfo: import("immer/dist/internal").WritableDraft<UserInfoDetails>;
        teamName: string;
        isAgentStateNavigationKeyPressed: boolean;
        storeFavsToastReference?: Id | null | undefined;
        showClientDataApiFailedToast: import("immer/dist/internal").WritableDraft<{
            storageExceeded: boolean;
            apiFailed: boolean;
        }>;
    };
    /**
     * Function to update favourite status of agent
     * @param state - AgentState
     * @param action  - PayloadAction<string>
     * @returns It returns favourite status
     * ```
     * @example -const status {
     * id?: 12;
     * isFavourite?: true;
     * reason?: 'Client';
     * }
     *```
     */
    updateFavourite(state: import("immer/dist/internal").WritableDraft<AgentStateProps>, action: PayloadAction<Status>): {
        allStatus: import("immer/dist/internal").WritableDraft<Status>[];
        agentStatus?: import("immer/dist/internal").WritableDraft<agentCurrentStatus> | undefined;
        agentSelectedState?: import("immer/dist/internal").WritableDraft<lastSelectedState> | undefined;
        agentLegConnectionStatus: import("immer/dist/internal").WritableDraft<AgentLegStatusType>;
        userInfo: import("immer/dist/internal").WritableDraft<UserInfoDetails>;
        teamName: string;
        isAgentStateNavigationKeyPressed: boolean;
        storeFavsToastReference?: Id | null | undefined;
        showClientDataApiFailedToast: import("immer/dist/internal").WritableDraft<{
            storageExceeded: boolean;
            apiFailed: boolean;
        }>;
    };
    /**
     * Reducer function to update focus on agent state
     * @param state - agentLegState
     * @param action - action.payload
     * @example - dispatch(focusAgentState(false));
     * @returns - updated state
     */
    focusAgentState(state: import("immer/dist/internal").WritableDraft<AgentStateProps>, action: {
        payload: any;
        type: string;
    }): import("immer/dist/internal").WritableDraft<AgentStateProps>;
    /**
     * Method used to set toast reference
     * @param state - DirectoryState
     * @param action - payload with an object containing toast reference ID
     * @example -
     * ```
     * dispatch(updateFavsToastRefrence(Id));
     * ```
     */
    updateFavsToastReference(state: import("immer/dist/internal").WritableDraft<AgentStateProps>, action: PayloadAction<Id | null>): {
        storeFavsToastReference: Id | null;
        allStatus: import("immer/dist/internal").WritableDraft<Status>[];
        agentStatus?: import("immer/dist/internal").WritableDraft<agentCurrentStatus> | undefined;
        agentSelectedState?: import("immer/dist/internal").WritableDraft<lastSelectedState> | undefined;
        agentLegConnectionStatus: import("immer/dist/internal").WritableDraft<AgentLegStatusType>;
        userInfo: import("immer/dist/internal").WritableDraft<UserInfoDetails>;
        teamName: string;
        isAgentStateNavigationKeyPressed: boolean;
        showClientDataApiFailedToast: import("immer/dist/internal").WritableDraft<{
            storageExceeded: boolean;
            apiFailed: boolean;
        }>;
    };
    /**
      * Method used to set error toast for client data API failure
      * @param state - DirectoryState
      * @example -
      * ```
      * dispatch(clientDataApiFailed(false)));
      * ```
      * @returns
      */
    clientDataApiFailedForState(state: import("immer/dist/internal").WritableDraft<AgentStateProps>, action: PayloadAction<{
        storageExceeded: boolean;
        apiFailed: boolean;
    }>): {
        showClientDataApiFailedToast: {
            storageExceeded: boolean;
            apiFailed: boolean;
        };
        allStatus: import("immer/dist/internal").WritableDraft<Status>[];
        agentStatus?: import("immer/dist/internal").WritableDraft<agentCurrentStatus> | undefined;
        agentSelectedState?: import("immer/dist/internal").WritableDraft<lastSelectedState> | undefined;
        agentLegConnectionStatus: import("immer/dist/internal").WritableDraft<AgentLegStatusType>;
        userInfo: import("immer/dist/internal").WritableDraft<UserInfoDetails>;
        teamName: string;
        isAgentStateNavigationKeyPressed: boolean;
        storeFavsToastReference?: Id | null | undefined;
    };
}, "agentState">;
/**
 * Used to get agent state
 * @example - const agentStateStatus = useSelector(selectStatus);
 */
export declare const selectStatus: ((state: {
    agentState: AgentStateProps;
}) => AgentStateProps) & import("reselect").OutputSelectorFields<(args_0: AgentStateProps) => AgentStateProps & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
/**
 * Used to get current agent status
 * @example - const agentCurrentStatus = useSelector(selectcurrentStatus);
 */
export declare const selectcurrentStatus: ((state: {
    agentState: AgentStateProps;
}) => agentCurrentStatus | undefined) & import("reselect").OutputSelectorFields<(args_0: AgentStateProps) => agentCurrentStatus & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
/**
 * Used to get the last selected agent state
 * @example - const getLastSelectedState = useSelector(getLastSelectedState);
 */
export declare const getLastSelectedState: ((state: {
    agentState: AgentStateProps;
}) => lastSelectedState | undefined) & import("reselect").OutputSelectorFields<(args_0: AgentStateProps) => lastSelectedState & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const userInfoSelector: ((state: {
    agentState: AgentStateProps;
}) => UserInfoDetails) & import("reselect").OutputSelectorFields<(args_0: AgentStateProps) => UserInfoDetails & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const agentLegConnectionStatus: ((state: {
    agentState: AgentStateProps;
}) => AgentLegStatusType) & import("reselect").OutputSelectorFields<(args_0: AgentStateProps) => AgentLegStatusType & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const currentUserAgentId: ((state: {
    agentState: AgentStateProps;
}) => string) & import("reselect").OutputSelectorFields<(args_0: AgentStateProps) => string & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
/**
 * It used to get current agent teamname
 * @example - const teamName = useSelector(currentUserTeamName);
 */
export declare const currentUserTeamName: ((state: {
    agentState: AgentStateProps;
}) => string) & import("reselect").OutputSelectorFields<(args_0: AgentStateProps) => string & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const getAgentStateFocusStatus: ((state: {
    agentState: AgentStateProps;
}) => boolean) & import("reselect").OutputSelectorFields<(args_0: AgentStateProps) => boolean & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const getFavoritesStatesToastReference: ((state: {
    agentState: AgentStateProps;
}) => Id | null | undefined) & import("reselect").OutputSelectorFields<(args_0: AgentStateProps) => (Id | null | undefined) & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const getClientDataApiFailedForStateToast: ((state: {
    agentState: AgentStateProps;
}) => {
    storageExceeded: boolean;
    apiFailed: boolean;
}) & import("reselect").OutputSelectorFields<(args_0: AgentStateProps) => {
    storageExceeded: boolean;
    apiFailed: boolean;
} & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export { agentDirectoryActions };
