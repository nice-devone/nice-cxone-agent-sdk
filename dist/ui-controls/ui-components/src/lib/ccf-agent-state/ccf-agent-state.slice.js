import { __awaiter } from "tslib";
import { AgentStates, CXoneClient, FeatureToggleService, } from '@nice-devone/agent-sdk';
import { CcfMessageType, CxaExtensionAdapter } from '@nice-devone/shared-apps-lib';
import { LocalStorageHelper, Logger, StorageKeys } from '@nice-devone/core-sdk';
import { createAsyncThunk, createSelector, createSlice, } from '@reduxjs/toolkit';
import { CXoneAcdClient } from '@nice-devone/acd-sdk';
import { agentDirectoryActions } from '../ccf-directory/+state/ccf-directory.slice';
export const AGENT_STATE_KEY = 'agentState';
export const UNAVAILABLE_CODES = 'agentState/UnavailableCodes';
export const SUBSCRIBE_AGENT_STATE = 'agentState/SubscribeAgentStates';
export const UPDATE_AGENT_STATE = 'agentState/update';
const intialAgentState = {
    reason: '',
    state: '',
    startTime: 0,
    acwTimeout: 0,
    isACW: false,
    skillName: '',
    isPersonalConnection: false,
};
let logger;
let useDefaultUnavailable = true;
let favStatesUpdateBuffer = [];
let debounceTimer = null;
let isUpdating = false;
let errorHandled = false;
const FLUSH_DELAY = 2000; // 2 second
const isFavoritesFTEnabled = FeatureToggleService.instance.getFeatureToggleSync("release-cxa-favorites-AW-40314" /* FeatureToggles.CXA_FAVORITES_FEATURE_TOGGLE */);
const unavailableState = {
    reason: 'Unavailable',
    isAcw: true,
    isActive: true,
    isPersonalConnection: false,
};
export const agentStateStatus = {
    allStatus: [],
    agentStatus: {
        currentState: intialAgentState,
        nNextState: intialAgentState,
        nextState: intialAgentState,
    },
    agentSelectedState: { selectedState: intialAgentState },
    userInfo: {
        tenantId: '',
        icAgentId: '',
        icBUId: '',
        userName: '',
        icClusterId: '',
        userId: '',
        firstName: '',
        lastName: '',
    },
    agentLegConnectionStatus: {
        status: 'Disconnected',
        agentLegId: '',
    },
    teamName: '',
    isAgentStateNavigationKeyPressed: false,
    storeFavsToastReference: null,
    showClientDataApiFailedToast: { storageExceeded: false, apiFailed: false },
};
/**
 * mapCodesToStatus - Takes an UnavailableCode[] and returns a Status[]
 * @example - mapCodesToStatus()
 */
export const mapCodesToStatus = (state, codes) => {
    const favoriteStates = LocalStorageHelper.getItem(StorageKeys.FAVORITE_AGENT_STATES) || [];
    return [...(codes.map((code, index) => {
            const isFave = (state === null || state === void 0 ? void 0 : state.allStatus.filter((status) => status.id === index + code.reason && favoriteStates.includes(status.id)).length) > 0 || false;
            return {
                id: index + code.reason,
                isFavourite: isFave,
                reason: code.reason,
                state: code.isPersonalConnection ? AgentStates.Dialer : AgentStates.Unavailable,
                isAcw: code.isAcw,
                isActive: code.isActive,
                skillName: code.skillName,
                isPersonalConnection: code.isPersonalConnection,
            };
        }))];
};
/** to update favorite agent state values
   * @example -
   * ```
   * updateFavoriteAgentStates();
   * ```
*/
export const updateFavoriteAgentStatesClientData = (currFavAgentStatesList) => __awaiter(void 0, void 0, void 0, function* () {
    const cxoneClient = CXoneClient.instance;
    yield cxoneClient.agentSetting.updateAgentClientDataSettings({ cxaFavStates: currFavAgentStatesList });
});
/** to queue fav states ids and send after certain time
   * @example -
   * ```
   * queueFavStatesUpdate(['available','unavailable']);
   * ```
   */
export const queueFavStatesUpdate = (favStatesIds, newFavState, dispatch) => {
    favStatesUpdateBuffer = [...favStatesIds];
    if (debounceTimer)
        clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
        dispatch(flushFavStates(newFavState));
    }, FLUSH_DELAY);
};
/**
 * getUnavailableCodesAndPcSkills asyncthunk used to get unavailable codes and PC skills from sdk
 * @example - dispatch(getUnavailableCodesAndPcSkills())
 */
export const getUnavailableCodesAndPcSkills = createAsyncThunk(UNAVAILABLE_CODES, () => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    const userInfoFromLS = LocalStorageHelper.getItem(StorageKeys.USER_INFO, true);
    let unavailableCodes = [];
    try {
        unavailableCodes = (yield CXoneAcdClient.instance
            .getTeamUnavailableCodes((_a = userInfoFromLS.teamId) === null || _a === void 0 ? void 0 : _a.toString()));
    }
    catch (error) {
        logger.debug('[CcfAgentStateSlice][getUserDetails]', `payload: ${JSON.stringify(error)}`);
        return error;
    }
    try {
        const personalConnectionSkills = (yield CXoneAcdClient.instance.getCachedAgentSkills()).filter(skill => skill.isNaturalCallingRunning && !skill.isPriorityBlending);
        personalConnectionSkills.forEach((skill) => {
            const pcSkill = {
                reason: skill.skillName,
                isActive: skill.isNaturalCallingRunning,
                isAcw: false,
                isPersonalConnection: true,
                skillName: skill.skillName,
            };
            unavailableCodes.push(pcSkill);
        });
    }
    catch (error) {
        logger.debug('[CcfAgentStateSlice][getRunningPersonalConnectionSkills]', `payload: ${JSON.stringify(error)}`);
        return error;
    }
    if (isFavoritesFTEnabled) {
        const clientData = LocalStorageHelper.getItem(StorageKeys.CLIENT_DATA, true);
        const unavailableStates = unavailableCodes
            .filter((states) => states === null || states === void 0 ? void 0 : states.isActive)
            .map((states) => states === null || states === void 0 ? void 0 : states.reason);
        const filteredClientData = ((_b = clientData === null || clientData === void 0 ? void 0 : clientData.CXAFavStates) === null || _b === void 0 ? void 0 : _b.filter((item) => (item).toLocaleLowerCase() === 'available' || unavailableStates.includes(item))) || [];
        const noStatesDeleted = Array.isArray(filteredClientData) && ((_c = clientData === null || clientData === void 0 ? void 0 : clientData.CXAFavStates) === null || _c === void 0 ? void 0 : _c.length) > 0 ?
            (filteredClientData === null || filteredClientData === void 0 ? void 0 : filteredClientData.length) === ((_d = clientData === null || clientData === void 0 ? void 0 : clientData.CXAFavStates) === null || _d === void 0 ? void 0 : _d.length) &&
                (filteredClientData === null || filteredClientData === void 0 ? void 0 : filteredClientData.every((stateId, idx) => stateId === (clientData === null || clientData === void 0 ? void 0 : clientData.CXAFavStates[idx]))) : true;
        if (!noStatesDeleted) {
            try {
                LocalStorageHelper.setItem(StorageKeys.CXA_FAV_AGENT_STATES, filteredClientData || []);
                yield updateFavoriteAgentStatesClientData(filteredClientData);
            }
            catch (error) {
                logger.debug('[CcfAgentStateSlice][getClientData]', `payload: ${JSON.stringify(error)}`);
                return error;
            }
        }
    }
    return unavailableCodes;
}));
/**
 * getTeamName asyncthunk used to get teamname from sdk
 * @example - dispatch(getTeamName())
 */
export const getTeamName = createAsyncThunk('agentState/teamName', () => __awaiter(void 0, void 0, void 0, function* () {
    var _e;
    const logger = new Logger('CXoneAgent', 'CcfAgentState');
    const userInfoFromLS = LocalStorageHelper.getItem(StorageKeys.USER_INFO, true);
    try {
        const team = yield CXoneClient.instance.teamService
            .getTeamDetailsById((_e = userInfoFromLS.teamId) === null || _e === void 0 ? void 0 : _e.toString());
        return team.teamName;
    }
    catch (error) {
        logger.debug('[CcfAgentStateSlice][getTeamName]', `payload: ${JSON.stringify(error)}`);
        return error;
    }
}));
/**
 * subscribeForStateEvents asyncthunk used to get updated agent state on login, handling contact and etc
 * @example - dispatch(subscribeForStateEvents())
 */
export const subscribeForStateEvents = createAsyncThunk(SUBSCRIBE_AGENT_STATE, (_, thunkAPI) => __awaiter(void 0, void 0, void 0, function* () {
    CXoneAcdClient.instance.session.agentStateService.agentStateSubject.subscribe((agentState) => {
        thunkAPI.dispatch(agentStateActions.setCurrentStatus(agentState));
    });
}));
/**
 * setAgentState asyncthunk used to send agent state request by manually selecting from menu
 * @example - dispatch(setAgentState(\{selectedState: agentState\}))
 */
export const setAgentState = createAsyncThunk(UPDATE_AGENT_STATE, (data, { rejectWithValue }) => __awaiter(void 0, void 0, void 0, function* () {
    const input = {
        reason: (useDefaultUnavailable
            && (data === null || data === void 0 ? void 0 : data.selectedState.reason.toLowerCase()) === AgentStates.Unavailable.toLowerCase())
            ? ''
            : data === null || data === void 0 ? void 0 : data.selectedState.reason,
        state: data === null || data === void 0 ? void 0 : data.selectedState.state,
        skillName: data === null || data === void 0 ? void 0 : data.selectedState.skillName,
        isPersonalConnection: data === null || data === void 0 ? void 0 : data.selectedState.isPersonalConnection,
    };
    const agentStateUpdate = yield CXoneAcdClient.instance.session
        .setAgentState(input)
        .catch((err) => {
        throw rejectWithValue(err);
    });
    return agentStateUpdate;
}));
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
export const getUserInfo = createAsyncThunk('CcfAgentStateSlice/getUserInfo', () => __awaiter(void 0, void 0, void 0, function* () {
    const logger = new Logger('CXoneAgent', 'CcfAgentState');
    try {
        const userInfo = yield CXoneClient.instance.cxoneUser.getUserDetails();
        return userInfo;
    }
    catch (error) {
        logger.debug('[CcfAgentStateSlice][getUserDetails]', `payload: ${JSON.stringify(error)}`);
        return error;
    }
}));
/**
 * connectAgentLeg asyncthunk used to connect agent leg request by manually selecting from header option
 * @example - dispatch(connectAgentLeg())
 */
export const connectAgentLeg = createAsyncThunk('agentLeg/connect', () => __awaiter(void 0, void 0, void 0, function* () {
    const logger = new Logger('CXoneAgent', 'CcfAgentState');
    try {
        const agentLegConnectResponse = yield CXoneAcdClient.instance.agentLegService.dialAgentLeg();
        return agentLegConnectResponse;
    }
    catch (error) {
        logger.debug('[CcfAgentStateSlice][dialAgentLeg]', `payload: ${JSON.stringify(error)}`);
        return error;
    }
}));
/**
 * disconnectAgentLeg asyncthunk used to disconnect agent leg request by manually selecting from header option
 * @example - dispatch(disconnectAgentLeg())
 */
export const disconnectAgentLeg = createAsyncThunk('agentLeg/disconnect', () => __awaiter(void 0, void 0, void 0, function* () {
    const logger = new Logger('CXoneAgent', 'CcfAgentState');
    try {
        const agentLegDisconnectResponse = yield CXoneAcdClient.instance.agentLegService.endAgentLeg();
        return agentLegDisconnectResponse;
    }
    catch (error) {
        logger.debug('[CcfAgentStateSlice][endAgentLeg]', `payload: ${JSON.stringify(error)}`);
        return error;
    }
}));
/** to update agent setting values
   * @example -
   * ```
   * flushFavStates();
   * ```
   */
export const flushFavStates = createAsyncThunk('agentStates/flushFavStates', (newFavState, { dispatch }) => __awaiter(void 0, void 0, void 0, function* () {
    if (isUpdating)
        return;
    isUpdating = true;
    const uniqueIds = [...new Set(favStatesUpdateBuffer)];
    favStatesUpdateBuffer = [];
    try {
        yield updateFavoriteAgentStatesClientData(uniqueIds);
    }
    catch (error) {
        if (!errorHandled) {
            errorHandled = true;
            const currentStatesList = LocalStorageHelper.getItem(StorageKeys.CXA_FAV_AGENT_STATES, true).map((state) => state.toLowerCase()) || [];
            //add new state if its not in local storage and remove if it is already present
            if (currentStatesList === null || currentStatesList === void 0 ? void 0 : currentStatesList.includes(newFavState.toLowerCase())) {
                LocalStorageHelper.setItem(StorageKeys.CXA_FAV_AGENT_STATES, uniqueIds.filter(state => String(state) !== newFavState) || []);
            }
            else {
                LocalStorageHelper.setItem(StorageKeys.CXA_FAV_AGENT_STATES, [...uniqueIds, newFavState]);
            }
        }
        if (errorHandled) {
            const typedError = error;
            if (String(typedError === null || typedError === void 0 ? void 0 : typedError.message).toLowerCase() === 'exceeds the limit of the database') {
                dispatch(agentStateActions.clientDataApiFailedForState({ storageExceeded: true, apiFailed: false }));
            }
            else {
                dispatch(agentStateActions.clientDataApiFailedForState({ storageExceeded: false, apiFailed: true }));
            }
        }
    }
    finally {
        isUpdating = false;
        errorHandled = false;
    }
    ;
}));
export const agentStateSlice = createSlice({
    name: AGENT_STATE_KEY,
    initialState: agentStateStatus,
    reducers: {
        /**
         * Function to set the selected state of agent
         * @param state - AgentState
         * @param action  - PayloadAction<string>
         * @returns Sets the last selected state of the agent
         * @example -setSelectedState('Available')
         */
        setSelectedState(state, action) {
            return Object.assign(Object.assign({}, state), { agentSelectedState: Object.assign({}, action.payload) });
        },
        /**
         * Function to set current status of agent
         * @param state - AgentState
         * @param action  - PayloadAction<string>
         * @returns It returns current status of agent
         * @example -setCurrentStatus('Available')
         */
        setCurrentStatus(state, action) {
            return Object.assign(Object.assign({}, state), { agentStatus: Object.assign({}, action.payload) });
        },
        /**
         * Function to return default state for middleware
         * @param state - AgentState
         * @returns It returns default state
         * @example -default()
         */
        default(state) {
            return Object.assign({}, state);
        },
        /**
         * Function to set current leg status of agent
         * @param state - AgentLegState
         * @param action  - PayloadAction<string>
         * @returns It returns current agent leg status
         * @example -setAgentLegData('Active')
         */
        setAgentLegData(state, action) {
            return Object.assign(Object.assign({}, state), { agentLegConnectionStatus: Object.assign({}, action.payload) });
        },
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
        updateFavourite(state, action) {
            return Object.assign(Object.assign({}, state), { allStatus: state.allStatus.map((status) => status.id === action.payload.id
                    ? Object.assign(Object.assign({}, status), { isFavourite: !action.payload.isFavourite }) : status) });
        },
        /**
         * Reducer function to update focus on agent state
         * @param state - agentLegState
         * @param action - action.payload
         * @example - dispatch(focusAgentState(false));
         * @returns - updated state
         */
        focusAgentState(state, action) {
            state.isAgentStateNavigationKeyPressed = action.payload;
            return state;
        },
        /**
         * Method used to set toast reference
         * @param state - DirectoryState
         * @param action - payload with an object containing toast reference ID
         * @example -
         * ```
         * dispatch(updateFavsToastRefrence(Id));
         * ```
         */
        updateFavsToastReference(state, action) {
            return Object.assign(Object.assign({}, state), { storeFavsToastReference: action.payload });
        },
        /**
          * Method used to set error toast for client data API failure
          * @param state - DirectoryState
          * @example -
          * ```
          * dispatch(clientDataApiFailed(false)));
          * ```
          * @returns
          */
        clientDataApiFailedForState(state, action) {
            return Object.assign(Object.assign({}, state), { showClientDataApiFailedToast: Object.assign(Object.assign({}, state === null || state === void 0 ? void 0 : state.showClientDataApiFailedToast), action.payload) });
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getUnavailableCodesAndPcSkills.fulfilled, (state, action) => {
            const allUnavailableCodes = action.payload;
            const activeUnavailableCodes = allUnavailableCodes.filter((item) => (item.isActive && !item.isAcw && !item.isPersonalConnection));
            const activePcSkills = allUnavailableCodes.filter((item) => (item.isActive && !item.isAcw && item.isPersonalConnection));
            let statusToPopulate = mapCodesToStatus(state, [unavailableState]);
            useDefaultUnavailable = true;
            // If we have active unavailable codes add them, and overwrite the default unavailable
            if (activeUnavailableCodes.length > 0) {
                useDefaultUnavailable = false;
                statusToPopulate = mapCodesToStatus(state, activeUnavailableCodes);
            }
            // If we have PC skills add them
            if (activePcSkills.length > 0) {
                statusToPopulate = statusToPopulate.concat(mapCodesToStatus(state, activePcSkills));
            }
            return Object.assign(Object.assign({}, state), { allStatus: statusToPopulate });
        });
        builder.addCase(getUserInfo.fulfilled, (state, action) => {
            CxaExtensionAdapter.instance.sendMessageToExtension({
                type: CcfMessageType.AgentInitials,
                data: { agentDetail: action.payload },
            });
            state.userInfo = action.payload;
        });
        builder
            .addCase(getTeamName.fulfilled, (state, action) => {
            return Object.assign(Object.assign({}, state), { teamName: action.payload });
        });
    },
});
export const agentStateReducer = agentStateSlice.reducer;
export const agentStateActions = agentStateSlice.actions;
/**
 * Function to get status of agent
 * @param rootState - AgentState
 * @returns It returns agent status
 * @example - const agentState = getAgentState(rootState)
 */
const getAgentState = (rootState) => {
    return rootState[AGENT_STATE_KEY];
};
/**
 * Used to get agent state
 * @example - const agentStateStatus = useSelector(selectStatus);
 */
export const selectStatus = createSelector(getAgentState, (state) => {
    return state;
});
/**
 * Used to get current agent status
 * @example - const agentCurrentStatus = useSelector(selectcurrentStatus);
 */
export const selectcurrentStatus = createSelector(getAgentState, (state) => state.agentStatus);
/**
 * Used to get the last selected agent state
 * @example - const getLastSelectedState = useSelector(getLastSelectedState);
 */
export const getLastSelectedState = createSelector(getAgentState, (state) => state.agentSelectedState);
export const userInfoSelector = createSelector(getAgentState, (state) => state === null || state === void 0 ? void 0 : state.userInfo);
export const agentLegConnectionStatus = createSelector(getAgentState, (state) => state.agentLegConnectionStatus);
export const currentUserAgentId = createSelector(getAgentState, (state) => { var _a; return (_a = state === null || state === void 0 ? void 0 : state.userInfo) === null || _a === void 0 ? void 0 : _a.icAgentId; });
/**
 * It used to get current agent teamname
 * @example - const teamName = useSelector(currentUserTeamName);
 */
export const currentUserTeamName = createSelector(getAgentState, (state) => state === null || state === void 0 ? void 0 : state.teamName);
export const getAgentStateFocusStatus = createSelector(getAgentState, (state) => state.isAgentStateNavigationKeyPressed);
export const getFavoritesStatesToastReference = createSelector(getAgentState, (state) => {
    return state === null || state === void 0 ? void 0 : state.storeFavsToastReference;
});
export const getClientDataApiFailedForStateToast = createSelector(getAgentState, (state) => state === null || state === void 0 ? void 0 : state.showClientDataApiFailedToast);
export { agentDirectoryActions };
//# sourceMappingURL=ccf-agent-state.slice.js.map