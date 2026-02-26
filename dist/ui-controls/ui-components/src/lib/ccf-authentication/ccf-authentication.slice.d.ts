import { PayloadAction } from '@reduxjs/toolkit';
import { CcfAuthenticationProps } from './ccf-authentication';
export declare const CCF_AUTHENTICATION_FEATURE_KEY = "CcfAuthenticationSlice";
export declare const IS_USER_LOGGED_IN = "isUserLoggedIn";
export declare const REDIRECT_TO_AUTH_URL = "CcfAuthenticationSlice/redirectToAuthURL";
export declare const AUTHENTICATE_BY_CODE = "CcfAuthenticationSlice/authenticateByCode";
export declare const AUTHENTICATE_BY_TOKEN = "CcfAuthenticationSlice/authenticateByToken";
export declare const LOGOUT_USER = "CcfAuthenticationSlice/logoutUser";
export declare const END_SESSION = "CcfAuthenticationSlice/endSession";
export interface CcfAuthenticationState {
    isUserLoggedIn: boolean;
    authConfig: CcfAuthenticationProps;
    isLoading: boolean;
    logoutUri: string;
}
export interface CcfAuthenticationTokenModel {
    accessToken: string;
    authProps: CcfAuthenticationProps;
}
export declare const CcfAuthenticationInitialState: CcfAuthenticationState;
/**
 * Thunk action creator to interact with SDK and retrieve openIdConfig to pop out a window
 * for clearing authentication cookies from browser
 *
 * @example
 *  dispatch(
      logoutUser()
    );
 */
export declare const logoutUser: import("@reduxjs/toolkit").AsyncThunk<void, {
    forceLogOff: boolean;
    ignorePersonaQueue: boolean;
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
 * Thunk action creator to interact with SDK and manage end session and clear cache
 * from localstorage
 *
 * @example
 *  dispatch(
      endSession()
    );
 */
export declare const endSession: import("@reduxjs/toolkit").AsyncThunk<void, {
    forceLogOff: boolean;
    ignorePersonaQueue: boolean;
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
export declare const CcfAuthenticationSlice: import("@reduxjs/toolkit").Slice<CcfAuthenticationState, {
    /**
     * @param state - CcfAuthenticationState
     * @example - dispatch(CcfAuthenticationActions.storeAuthenticationProps());
     * @returns - CcfAuthenticationState
     */
    storeAuthConfig(state: CcfAuthenticationState, action: PayloadAction<CcfAuthenticationProps>): CcfAuthenticationState;
    /**
     * @param state - CcfAuthenticationState
     * @example - dispatch(CcfAuthenticationActions.restoreData());
     * @returns - CcfAuthenticationState
     */
    logUserIn(state: CcfAuthenticationState): CcfAuthenticationState;
    /**
     * @param state - CXoneAuthenticationState
     * @example - dispatch(CXoneAuthenticationActions.logUserOut());
     * @returns - CXoneAuthenticationState
     */
    logUserOut(state: CcfAuthenticationState): CcfAuthenticationState;
    /**
     * @param state - CXoneAuthenticationState
     * @example - dispatch(CXoneAuthenticationActions.storeLogoutUri(logoutUri));
     * @returns - CXoneAuthenticationState
     */
    storeLogoutUri(state: CcfAuthenticationState, action: PayloadAction<string>): CcfAuthenticationState;
    /**
     * @param state - CXoneAuthenticationState
     * @example - dispatch(CXoneAuthenticationActions.enableLoading());
     * @returns - CXoneAuthenticationState
     */
    enableLoading(state: CcfAuthenticationState): CcfAuthenticationState;
    /**
     * @param state - CXoneAuthenticationState
     * @example - dispatch(CXoneAuthenticationActions.enableLoading());
     * @returns - CXoneAuthenticationState
     */
    disableLoading(state: CcfAuthenticationState): CcfAuthenticationState;
}, "CcfAuthenticationSlice">;
export declare const CcfAuthenticationActions: import("@reduxjs/toolkit").CaseReducerActions<{
    /**
     * @param state - CcfAuthenticationState
     * @example - dispatch(CcfAuthenticationActions.storeAuthenticationProps());
     * @returns - CcfAuthenticationState
     */
    storeAuthConfig(state: CcfAuthenticationState, action: PayloadAction<CcfAuthenticationProps>): CcfAuthenticationState;
    /**
     * @param state - CcfAuthenticationState
     * @example - dispatch(CcfAuthenticationActions.restoreData());
     * @returns - CcfAuthenticationState
     */
    logUserIn(state: CcfAuthenticationState): CcfAuthenticationState;
    /**
     * @param state - CXoneAuthenticationState
     * @example - dispatch(CXoneAuthenticationActions.logUserOut());
     * @returns - CXoneAuthenticationState
     */
    logUserOut(state: CcfAuthenticationState): CcfAuthenticationState;
    /**
     * @param state - CXoneAuthenticationState
     * @example - dispatch(CXoneAuthenticationActions.storeLogoutUri(logoutUri));
     * @returns - CXoneAuthenticationState
     */
    storeLogoutUri(state: CcfAuthenticationState, action: PayloadAction<string>): CcfAuthenticationState;
    /**
     * @param state - CXoneAuthenticationState
     * @example - dispatch(CXoneAuthenticationActions.enableLoading());
     * @returns - CXoneAuthenticationState
     */
    enableLoading(state: CcfAuthenticationState): CcfAuthenticationState;
    /**
     * @param state - CXoneAuthenticationState
     * @example - dispatch(CXoneAuthenticationActions.enableLoading());
     * @returns - CXoneAuthenticationState
     */
    disableLoading(state: CcfAuthenticationState): CcfAuthenticationState;
}, "CcfAuthenticationSlice">;
export declare const CcfAuthenticationReducer: import("redux").Reducer<CcfAuthenticationState, import("redux").AnyAction>;
/**
 * Function to get login state
 * @param rootState - gaLoginState
 * @returns It returns login state
 * @example - const loginState = getLoginState(rootState)
 */
export declare const getCcfAuthenticationState: (rootState: {
    CcfAuthenticationSlice: CcfAuthenticationState;
}) => CcfAuthenticationState;
export declare const isUserLoggedInState: ((state: {
    CcfAuthenticationSlice: CcfAuthenticationState;
}) => boolean) & import("reselect").OutputSelectorFields<(args_0: CcfAuthenticationState) => boolean & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const isLoadingState: ((state: {
    CcfAuthenticationSlice: CcfAuthenticationState;
}) => boolean) & import("reselect").OutputSelectorFields<(args_0: CcfAuthenticationState) => boolean & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
/**
 * selector function to get Auth config
 * @example - const authConfigStateData = useSelector(getAuthConfig());
 */
export declare const getAuthConfig: () => ((state: {
    CcfAuthenticationSlice: CcfAuthenticationState;
}) => CcfAuthenticationProps) & import("reselect").OutputSelectorFields<(args_0: CcfAuthenticationState) => CcfAuthenticationProps & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
