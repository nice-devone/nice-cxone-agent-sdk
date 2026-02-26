import { __awaiter } from "tslib";
import { createSlice, createAsyncThunk, createSelector, } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { CXoneClient } from '@nice-devone/agent-sdk';
import * as helpers from '@nice-devone/shared-apps-lib';
import { CXoneAuth } from '@nice-devone/auth-sdk';
import { OriginatingServiceIdentifier } from '@nice-devone/core-sdk';
export const STUDIO_ACTION_EDITOR_SLICE_KEY = 'studioActionEditorSlice';
const SETUP_COMMUNICATION_INTERFACE = `${STUDIO_ACTION_EDITOR_SLICE_KEY}/setupCommunicationInterface`;
const AUTHENTICATE = `${STUDIO_ACTION_EDITOR_SLICE_KEY}/authenticate`;
export const initialCcfStudioActionEditorState = {
    token: '',
    data: {},
    applicationConfiguration: {},
};
export const studioActionEditorSlice = createSlice({
    name: STUDIO_ACTION_EDITOR_SLICE_KEY,
    initialState: initialCcfStudioActionEditorState,
    reducers: {
        /**
         * Action to set token state.
         * @param state - CcfStudioActionEditorState
         * @example - dispatch(setToken(token));
         * @returns - state
         */
        setToken: (state, action) => (Object.assign(Object.assign({}, state), { token: action.payload })),
        /**
         * Action to set data state.
         * @param state - CcfStudioActionEditorState
         * @example - dispatch(setData(data));
         * @returns - state
         */
        setData: (state, action) => (Object.assign(Object.assign({}, state), { data: action.payload })),
        /**
         * Action to set application configuration details.
         * @param state - CcfStudioActionEditorState
         * @example - dispatch(setApplicationConfiguration(applicationConfiguration));
         * @returns - state
         */
        setApplicationConfiguration: (state, action) => (Object.assign(Object.assign({}, state), { applicationConfiguration: action.payload })),
    },
});
export const CcfStudioActionEditorReducer = studioActionEditorSlice.reducer;
/**
 * Initialize Studio (web/desktop) communication interface.
 * @example - dispatch(setupCommunicationInterfaceForStudio())
 */
export const setupCommunicationInterfaceForStudio = createAsyncThunk(SETUP_COMMUNICATION_INTERFACE, (payload, thunkAPI) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
    try {
        yield helpers.cxs.studio.desktop.setupCommunicationInterface(thunkAPI === null || thunkAPI === void 0 ? void 0 : thunkAPI.dispatch, payload === null || payload === void 0 ? void 0 : payload.initialize, (_d = (_c = (_b = (_a = thunkAPI === null || thunkAPI === void 0 ? void 0 : thunkAPI.extra) === null || _a === void 0 ? void 0 : _a.CcfStudioActionEditorSlice) === null || _b === void 0 ? void 0 : _b.studioActionEditorSlice) === null || _c === void 0 ? void 0 : _c.actions) === null || _d === void 0 ? void 0 : _d.setToken, (_h = (_g = (_f = (_e = thunkAPI === null || thunkAPI === void 0 ? void 0 : thunkAPI.extra) === null || _e === void 0 ? void 0 : _e.CcfStudioActionEditorSlice) === null || _f === void 0 ? void 0 : _f.studioActionEditorSlice) === null || _g === void 0 ? void 0 : _g.actions) === null || _h === void 0 ? void 0 : _h.setData);
    }
    catch (error) {
        console.log(error);
    }
    try {
        helpers.cxs.studio.web.setupCommunicationInterface(payload === null || payload === void 0 ? void 0 : payload.origin, thunkAPI === null || thunkAPI === void 0 ? void 0 : thunkAPI.dispatch, payload === null || payload === void 0 ? void 0 : payload.initialize, (_m = (_l = (_k = (_j = thunkAPI === null || thunkAPI === void 0 ? void 0 : thunkAPI.extra) === null || _j === void 0 ? void 0 : _j.CcfStudioActionEditorSlice) === null || _k === void 0 ? void 0 : _k.studioActionEditorSlice) === null || _l === void 0 ? void 0 : _l.actions) === null || _m === void 0 ? void 0 : _m.setToken, (_r = (_q = (_p = (_o = thunkAPI === null || thunkAPI === void 0 ? void 0 : thunkAPI.extra) === null || _o === void 0 ? void 0 : _o.CcfStudioActionEditorSlice) === null || _p === void 0 ? void 0 : _p.studioActionEditorSlice) === null || _q === void 0 ? void 0 : _q.actions) === null || _r === void 0 ? void 0 : _r.setData);
    }
    catch (error) {
        console.log(error);
    }
}));
/**
 * Thunk action creator to authenticate CXS application.
 * @example - dispatch(authenticate(token))
 */
export const authenticate = createAsyncThunk(AUTHENTICATE, (token, { getState, extra }) => __awaiter(void 0, void 0, void 0, function* () {
    var _s, _t, _u;
    try {
        const rootState = (_s = getState()) !== null && _s !== void 0 ? _s : {};
        const { applicationConfiguration = {} } = (_t = rootState[STUDIO_ACTION_EDITOR_SLICE_KEY]) !== null && _t !== void 0 ? _t : {};
        const cxoneHostname = helpers.cxs.getCXoneSystemIssuer((_u = window === null || window === void 0 ? void 0 : window.location) === null || _u === void 0 ? void 0 : _u.origin, applicationConfiguration === null || applicationConfiguration === void 0 ? void 0 : applicationConfiguration.cxoneSystemIssuer);
        const authProps = {
            consumerAppName: applicationConfiguration === null || applicationConfiguration === void 0 ? void 0 : applicationConfiguration.appName,
            authSettings: {
                cxoneHostname,
                clientId: applicationConfiguration === null || applicationConfiguration === void 0 ? void 0 : applicationConfiguration.cxoneClientId,
                redirectUri: '',
                originatingServiceIdentifier: OriginatingServiceIdentifier.CXONE_AGENT,
            },
            authMode: '',
            codeChallengeMethod: '',
            app: applicationConfiguration === null || applicationConfiguration === void 0 ? void 0 : applicationConfiguration.app,
            appHelpUrl: '',
        };
        CXoneClient.instance.initAgentIntegrationConfigurationService();
        const authObject = {
            accessToken: token,
        };
        CXoneAuth.instance.init(authProps.authSettings);
        yield CXoneAuth.instance.getAccessTokenByToken(authObject);
    }
    catch (error) {
        toast.error('Unable to authenticate', {
            autoClose: false,
            hideProgressBar: true,
            progress: undefined,
        });
        extra.logger.error(AUTHENTICATE, `payload: ${JSON.stringify(error)}`);
    }
}));
/**
 * @param rootState - root state
 * @example - getStudioActionEditorState
 */
const getStudioActionEditorState = (rootState) => rootState[STUDIO_ACTION_EDITOR_SLICE_KEY];
export const getData = createSelector(getStudioActionEditorState, (state) => state === null || state === void 0 ? void 0 : state.data);
//# sourceMappingURL=ccf-studio-action-editor.slice.js.map