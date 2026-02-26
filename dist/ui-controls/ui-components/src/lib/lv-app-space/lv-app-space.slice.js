import { __awaiter } from "tslib";
import { createSelector, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ECC_ACTION_TYPE, UIStorageKeys, } from '@nice-devone/common-sdk';
import { CallType, CXoneClient } from '@nice-devone/agent-sdk';
import { updateLVLSWithCustomerId } from './lv-interactions/lv-interactions-utility';
import { LocalStorageHelper, Logger } from '@nice-devone/core-sdk';
import { LOGGER_MODULE, LV_VERSION } from './lv-app-space-utility';
const logger = new Logger(LOGGER_MODULE, 'lv-app-space.slice');
export const SMART_REACH_KEY = 'lvAppSpace';
export const initialLvAppSpaceState = {
    clientId: undefined,
    clientSettings: undefined,
    currentInteraction: undefined,
    isLvInteractionsSyncEnabled: false,
    lvVersion: LV_VERSION,
};
export const syncExperienceRecord = createAsyncThunk('lvAppSpace/syncExperienceRecord', (payload, { rejectWithValue }) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g;
    if (((payload === null || payload === void 0 ? void 0 : payload.callType) && payload.callType === CallType.RESKILL_PROXY) ||
        payload.callType === CallType.CONSULT ||
        (payload.callType === CallType.REGULAR &&
            ((_a = payload.payload) === null || _a === void 0 ? void 0 : _a.businessPoc) === 'RESKILL' &&
            ((_b = payload.payload) === null || _b === void 0 ? void 0 : _b.customerPoc) === 'RESKILL'))
        return;
    try {
        const contactId = ((_c = payload.payload) === null || _c === void 0 ? void 0 : _c.externalThreadId) || '';
        const lvExperienceRecordsInLS = LocalStorageHelper.getItem(UIStorageKeys.LV_EXPERIENCE_RECORDS, true) || {};
        const existingCustomerId = lvExperienceRecordsInLS === null || lvExperienceRecordsInLS === void 0 ? void 0 : lvExperienceRecordsInLS[contactId];
        const payloadData = payload;
        const action = (_d = payload.payload) === null || _d === void 0 ? void 0 : _d.action;
        let response = null;
        if (existingCustomerId) {
            response = yield CXoneClient.instance.cxoneCustomerCard.invokeECCService(Object.assign(Object.assign({}, payload), (action === ECC_ACTION_TYPE.CREATE_INTERACTION ? { customerId: existingCustomerId } : {})));
        }
        else {
            response = yield CXoneClient.instance.cxoneCustomerCard.invokeECCService(Object.assign({}, payload));
        }
        const interactionResponse = response;
        const uuid = typeof interactionResponse.interactionId === 'string' ? interactionResponse.interactionId : undefined;
        const data = {
            customerId: interactionResponse.customerId || '',
            customerPoc: '',
            externalAgentId: ((_e = payloadData.payload) === null || _e === void 0 ? void 0 : _e.externalAgentId) || '',
            externalInteractionId: ((_f = payloadData.payload) === null || _f === void 0 ? void 0 : _f.externalInteractionId) || '',
            externalThreadId: ((_g = payloadData.payload) === null || _g === void 0 ? void 0 : _g.externalThreadId) || '',
        };
        updateLVLSWithCustomerId(contactId, interactionResponse.customerId || '');
        return { uuid, data };
    }
    catch (error) {
        logger.error('ECC - syncExperienceRecord', 'Error while calling syncExperienceRecord - ' + JSON.stringify(error));
        return rejectWithValue(error);
    }
}));
export const lvAppSpaceSlice = createSlice({
    name: SMART_REACH_KEY,
    initialState: initialLvAppSpaceState,
    reducers: {
        /**
         * Stores to get the current selected interaction, this interaction refers to the
         * selected ccf-search-interaction row
         * @param state - lv space state
         * @param action - `PayloadAction<LvCustomerType['currentInteraction']>`
         * @example
         * ```
         * dispatch(setLvCurrentInteraction({ caseId: '1234', contactId: '1234', ... }))
         * ```
         */
        setLvCurrentInteraction(state, action) {
            state.currentInteraction = action.payload;
        },
        /**
         * clear current active interaction for lv customer card
         * @param state - lv space state
         * @example
         * ```
         * dispatch(clearLvCurrentInteraction())
         * ```
         */
        clearLvCurrentInteraction(state) {
            state.currentInteraction = undefined;
        },
        /**
         * Set client settings for lv app space
         * @param state - lv space state
         * @param action - `PayloadAction<LvCustomerType['clientSettings']>`
         * @example
         * ```
         * dispatch(setLvClientSettings({
         *    smartReachBaseUrl: 'https://tst2.livevox.net',
         *    smartReachClientCode: 'QAE_SGC_MANUAL_27_TST2'
         * }))
         * ```
         */
        setLvClientSettings(state, action) {
            state.clientSettings = action.payload;
        },
        /**
         * Set the LV clientId for lv app space
         * @param state - lv space state
         * @param action - `PayloadAction<LvCustomerType['clientSettings']>`
         * @example
         * ```
         * dispatch(setLvClientId(12345))
         * ```
         */
        setLvClientId(state, action) {
            state.clientId = action.payload;
        },
        /**
         * clear client settings for lv customer card
         * @param state - lv space state
         * @example
         * ```
         * dispatch(clearLvClientSettings())
         * ```
         */
        clearLvClientSettings(state) {
            state.clientSettings = undefined;
        },
        /**
         * Sets the lvVersion
         * @param state - lv space state
         * @param action - `PayloadAction<string>`
         * @example
         * ```
         * dispatch(setLvVersion('26.1'))
         * ```
         */
        setLvVersion(state, action) {
            const version = action.payload;
            const versionPattern = /^\d+\.0(\.\d+)?$/; // Matches number.0 or number.0.number
            if (version && parseFloat(version) > 25 && versionPattern.test(version)) {
                state.lvVersion = version;
            }
        },
        /**
         * Enables or disables LV interactions synchronization through Lambda.
         * @param state - lv app space state
         * @param action - `PayloadAction<boolean | undefined>`
         * @example
         * ```
         * dispatch(setIsLvInteractionsSyncEnabled(false))
         * ```
         */
        setIsLvInteractionsSyncEnabled(state, action) {
            state.isLvInteractionsSyncEnabled = Boolean(action.payload);
        },
    },
});
/**
 * used to getAppSpaceState
 * @param rootState - AppSpace state
 * @example
 * ```
 * const appSpaceState = getAppSpaceState(state)
 * ```
 */
const getAppSpaceState = (rootState) => rootState[SMART_REACH_KEY];
/**
 * used to get the LvClientSettings
 * @param rootState - AppSpace state
 * @example
 * ```
 * const { smartReachBaseUrl, smartReachClientCode } = useSelector(selectLvClientSettings);
 * ```
 */
export const selectLvClientSettings = createSelector(getAppSpaceState, (lvAppSpace) => { var _a; return (_a = lvAppSpace === null || lvAppSpace === void 0 ? void 0 : lvAppSpace.clientSettings) !== null && _a !== void 0 ? _a : {}; });
/**
 * Used to get the current selected interaction, this interaction refers to the
 * selected ccf-search-interaction row
 * @param rootState - AppSpace state
 * @example
 * ```
 * const currentInteraction = useSelector(selectLvCurrentInteraction);
 * ```
 */
export const selectLvCurrentInteraction = createSelector(getAppSpaceState, (lvAppSpace) => lvAppSpace === null || lvAppSpace === void 0 ? void 0 : lvAppSpace.currentInteraction);
/**
 * Used to get the current livevox version
 * @param rootState - AppSpace state
 * @example
 * ```
 * const lvVersion = useSelector(selectLvVersion);
 * ```
 */
export const selectLvVersion = createSelector(getAppSpaceState, (lvAppSpace) => lvAppSpace === null || lvAppSpace === void 0 ? void 0 : lvAppSpace.lvVersion);
/**
 * Used to get the current livevox client id
 * @param rootState - AppSpace state
 * @example
 * ```
 * const lvVersion = useSelector(selectLvClientId);
 * ```
 */
export const selectLvClientId = createSelector(getAppSpaceState, (lvAppSpace) => lvAppSpace === null || lvAppSpace === void 0 ? void 0 : lvAppSpace.clientId);
/**
 * Used to get the current Mayor livevox version
 * @param rootState - AppSpace state
 * @example
 * ```
 * const lvVersion = useSelector(selectLvMayorVersion);
 * ```
 */
export const selectLvMayorVersion = createSelector(getAppSpaceState, (lvAppSpace) => { var _a; return (_a = lvAppSpace === null || lvAppSpace === void 0 ? void 0 : lvAppSpace.lvVersion) === null || _a === void 0 ? void 0 : _a.split('.')[0]; });
/**
 * Selector to get the flag indicating if LV interactions sync through Lambda is enabled.
 * @param rootState - AppSpace state
 * @example
 * ```
 * const isLvInteractionsSyncEnabled = useSelector(selectIsLvInteractionsSyncEnabled);
 * ```
 */
export const selectIsLvInteractionsSyncEnabled = createSelector(getAppSpaceState, (lvAppSpace) => lvAppSpace === null || lvAppSpace === void 0 ? void 0 : lvAppSpace.isLvInteractionsSyncEnabled);
export const lvAppSpaceReducer = lvAppSpaceSlice.reducer;
export const { clearLvClientSettings, clearLvCurrentInteraction, setIsLvInteractionsSyncEnabled, setLvClientId, setLvClientSettings, setLvCurrentInteraction, setLvVersion, } = lvAppSpaceSlice.actions;
export default lvAppSpaceSlice.reducer;
//# sourceMappingURL=lv-app-space.slice.js.map