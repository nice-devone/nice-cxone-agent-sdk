import { __awaiter } from "tslib";
import { CXoneClient, } from '@nice-devone/agent-sdk';
import { createAsyncThunk, createSlice, } from '@reduxjs/toolkit';
import { Logger } from '@nice-devone/core-sdk';
const logger = new Logger();
export const CCF_PARTNER_PRESENCE_SYNC_RULE_KEY = 'ccfPartnerPresenceSyncRule';
export const GET_PARTNER_PRESENCE_SYNC_RULE = 'presenceSync/getPartnerPresenceSyncRule';
export const partnerPresenceSyncRule = {};
/**
 * Thunk action get the cxone partner presence sync rule
 * @returns - CXonePartnerPresenceSyncRule object
 * @example
 * ```
 * dispatch(getPartnerPresenceSyncRule(data as CXonePartnerAccountDetails));
 * ```
 */
export const getPartnerPresenceSyncRule = createAsyncThunk(GET_PARTNER_PRESENCE_SYNC_RULE, (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const partnerPresenceRule = yield CXoneClient.instance.presenceSyncService.getPresenceSyncRule(data.partnerAccountId, data.partnerName);
        return partnerPresenceRule;
    }
    catch (error) {
        logger.error('[getPartnerPresenceSyncRule]', `payload: ${JSON.stringify(error)}`);
        return error;
    }
}));
export const cxonePartnerPresenceSync = createSlice({
    name: CCF_PARTNER_PRESENCE_SYNC_RULE_KEY,
    initialState: partnerPresenceSyncRule,
    reducers: {},
});
export const cxonePartnerPresenceSyncReducer = cxonePartnerPresenceSync.reducer;
export const cxonePartnerPresenceSyncActions = cxonePartnerPresenceSync.actions;
//# sourceMappingURL=ccf-partner-presence-sync-rule.slice.js.map