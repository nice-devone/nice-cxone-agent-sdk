import { __awaiter } from "tslib";
import { LocalStorageHelper, OriginatingServiceIdentifier, StorageKeys } from '@nice-devone/core-sdk';
import { createAsyncThunk, createSelector, createSlice, } from '@reduxjs/toolkit';
import { voicePreferenceActions } from '../ccf-acd-session/ccf-acd-session.slice';
import { CcfMessageType, CxaExtensionAdapter } from '@nice-devone/shared-apps-lib';
import { setLocalStorageKey } from '../ccf-app-space/ccf-app-space.slice';
import { CXoneAcdClient } from '@nice-devone/acd-sdk';
export const CCF_AUTHENTICATION_FEATURE_KEY = 'CcfAuthenticationSlice';
export const IS_USER_LOGGED_IN = 'isUserLoggedIn';
export const REDIRECT_TO_AUTH_URL = 'CcfAuthenticationSlice/redirectToAuthURL';
export const AUTHENTICATE_BY_CODE = 'CcfAuthenticationSlice/authenticateByCode';
export const AUTHENTICATE_BY_TOKEN = 'CcfAuthenticationSlice/authenticateByToken';
export const LOGOUT_USER = 'CcfAuthenticationSlice/logoutUser';
export const END_SESSION = 'CcfAuthenticationSlice/endSession';
export const CcfAuthenticationInitialState = {
    isUserLoggedIn: false,
    authConfig: {
        consumerAppName: '',
        authSettings: {
            cxoneHostname: '',
            clientId: '',
            redirectUri: '',
            originatingServiceIdentifier: OriginatingServiceIdentifier.CXONE_AGENT,
            state: '',
        },
        authMode: '',
        codeChallengeMethod: '',
        app: '',
        queryString: '',
    },
    isLoading: false,
    logoutUri: '',
};
let logger;
/**
 * Thunk action creator to interact with SDK and retrieve openIdConfig to pop out a window
 * for clearing authentication cookies from browser
 *
 * @example
 *  dispatch(
      logoutUser()
    );
 */
export const logoutUser = createAsyncThunk(LOGOUT_USER, (activeContactsStatus, { dispatch, getState }) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const width = 500;
    const height = 500;
    const left = 50;
    const top = 50;
    const popupOptions = 'width=' +
        width +
        ',height=' +
        height +
        ',scrollbars=yes,toolbar=no,left=' +
        left +
        ',top=' +
        top;
    const oidc_config = JSON.parse(localStorage.getItem(StorageKeys.OIDC_CONFIG) || '');
    const { voicePreference } = getState();
    const { CcfAuthenticationSlice } = getState();
    if (oidc_config) {
        const logoutUri = `${oidc_config.endSessionEndpoint}?post_logout_redirect_uri=${window.location.origin}/logout-callback`;
        dispatch(CcfAuthenticationActions.storeLogoutUri(logoutUri));
        if ((voicePreference === null || voicePreference === void 0 ? void 0 : voicePreference.voicePermissionsEnabled) && voicePreference.sessionResponse.isSessionActive) {
            dispatch(endSession(activeContactsStatus));
        }
        else {
            const navigatationItems = localStorage.getItem(StorageKeys.CXONE_NAVIGATION_ITEMS);
            const lastLoginUserInfo = JSON.parse(localStorage.getItem(StorageKeys.USER_INFO) || '');
            const active_CustomWorkspace = (LocalStorageHelper.getItem(StorageKeys.ACTIVE_CUSTOMWORKSPACE, true) || '');
            const appSpaceSizes = JSON.parse(LocalStorageHelper.getItem(StorageKeys.APPSPACE_RATIO) || '{}');
            const verticalSplitterSizes = JSON.parse(LocalStorageHelper.getItem(StorageKeys.INTERACTION_SPACE_VERTICAL_RATIO) || '[]');
            localStorage.clear();
            dispatch(voicePreferenceActions.inActiveSession(true));
            navigatationItems && localStorage.setItem(StorageKeys.CXONE_NAVIGATION_ITEMS, navigatationItems);
            lastLoginUserInfo && localStorage.setItem(StorageKeys.LAST_LOGGED_IN_AGENT_ID, lastLoginUserInfo.icAgentId);
            active_CustomWorkspace && LocalStorageHelper.setItem(StorageKeys.ACTIVE_CUSTOMWORKSPACE, active_CustomWorkspace);
            appSpaceSizes && dispatch(setLocalStorageKey({ key: StorageKeys.APPSPACE_RATIO, value: JSON.stringify(appSpaceSizes) }));
            verticalSplitterSizes && dispatch(setLocalStorageKey({ key: StorageKeys.INTERACTION_SPACE_VERTICAL_RATIO, value: JSON.stringify(verticalSplitterSizes) }));
            const authConfig = CcfAuthenticationSlice === null || CcfAuthenticationSlice === void 0 ? void 0 : CcfAuthenticationSlice.authConfig;
            const isExternalAuthentication = (authConfig === null || authConfig === void 0 ? void 0 : authConfig.authTarget) === 'external';
            if ((CcfAuthenticationSlice === null || CcfAuthenticationSlice === void 0 ? void 0 : CcfAuthenticationSlice.authConfig.authMode) === 'page' || isExternalAuthentication) {
                const embeddedAppLogoutUrl = `${logoutUri}?app=${(_a = authConfig === null || authConfig === void 0 ? void 0 : authConfig.app) !== null && _a !== void 0 ? _a : ''}`;
                const logoutURL = isExternalAuthentication ? embeddedAppLogoutUrl : logoutUri;
                window.location.href = logoutURL;
            }
            else if ((CcfAuthenticationSlice === null || CcfAuthenticationSlice === void 0 ? void 0 : CcfAuthenticationSlice.authConfig.authMode) === 'popup') {
                window.open(logoutUri, 'logoutWindow', popupOptions);
                dispatch(CcfAuthenticationActions.logUserOut());
            }
        }
    }
    CxaExtensionAdapter.instance.sendMessageToExtension({
        type: CcfMessageType.UnAuthenticated,
        data: { isAuth: false },
    });
}));
/**
 * Thunk action creator to interact with SDK and manage end session and clear cache
 * from localstorage
 *
 * @example
 *  dispatch(
      endSession()
    );
 */
export const endSession = createAsyncThunk(END_SESSION, (activeContactStatus) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield CXoneAcdClient.instance.session.endSession({
            forceLogoff: activeContactStatus.forceLogOff,
            endContacts: activeContactStatus.forceLogOff,
            ignorePersonalQueue: activeContactStatus.ignorePersonaQueue,
        });
    }
    catch (error) {
        logger.debug('[endSession][endSession]', `payload: ${JSON.stringify(error)}`);
    }
}));
export const CcfAuthenticationSlice = createSlice({
    name: CCF_AUTHENTICATION_FEATURE_KEY,
    initialState: CcfAuthenticationInitialState,
    reducers: {
        /**
         * @param state - CcfAuthenticationState
         * @example - dispatch(CcfAuthenticationActions.storeAuthenticationProps());
         * @returns - CcfAuthenticationState
         */
        storeAuthConfig(state, action) {
            state.authConfig = action.payload;
            return state;
        },
        /**
         * @param state - CcfAuthenticationState
         * @example - dispatch(CcfAuthenticationActions.restoreData());
         * @returns - CcfAuthenticationState
         */
        logUserIn(state) {
            state.isUserLoggedIn = true;
            localStorage.setItem(IS_USER_LOGGED_IN, 'true');
            return state;
        },
        /**
         * @param state - CXoneAuthenticationState
         * @example - dispatch(CXoneAuthenticationActions.logUserOut());
         * @returns - CXoneAuthenticationState
         */
        logUserOut(state) {
            state.isUserLoggedIn = false;
            localStorage.removeItem(IS_USER_LOGGED_IN);
            return state;
        },
        /**
         * @param state - CXoneAuthenticationState
         * @example - dispatch(CXoneAuthenticationActions.storeLogoutUri(logoutUri));
         * @returns - CXoneAuthenticationState
         */
        storeLogoutUri(state, action) {
            state.logoutUri = action.payload;
            return state;
        },
        /**
         * @param state - CXoneAuthenticationState
         * @example - dispatch(CXoneAuthenticationActions.enableLoading());
         * @returns - CXoneAuthenticationState
         */
        enableLoading(state) {
            state.isLoading = true;
            return state;
        },
        /**
         * @param state - CXoneAuthenticationState
         * @example - dispatch(CXoneAuthenticationActions.enableLoading());
         * @returns - CXoneAuthenticationState
         */
        disableLoading(state) {
            state.isLoading = false;
            return state;
        },
    },
});
export const CcfAuthenticationActions = CcfAuthenticationSlice.actions;
export const CcfAuthenticationReducer = CcfAuthenticationSlice.reducer;
/**
 * Function to get login state
 * @param rootState - gaLoginState
 * @returns It returns login state
 * @example - const loginState = getLoginState(rootState)
 */
export const getCcfAuthenticationState = (rootState) => rootState[CCF_AUTHENTICATION_FEATURE_KEY];
export const isUserLoggedInState = createSelector(getCcfAuthenticationState, (state) => state === null || state === void 0 ? void 0 : state.isUserLoggedIn);
export const isLoadingState = createSelector(getCcfAuthenticationState, (state) => state === null || state === void 0 ? void 0 : state.isLoading);
/**
 * selector function to get Auth config
 * @example - const authConfigStateData = useSelector(getAuthConfig());
 */
export const getAuthConfig = () => createSelector(getCcfAuthenticationState, (state) => { return state === null || state === void 0 ? void 0 : state.authConfig; });
//# sourceMappingURL=ccf-authentication.slice.js.map