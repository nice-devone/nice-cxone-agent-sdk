import { CXonePartnerAccountDetails, CXonePartnerPresenceSyncRule } from '@nice-devone/shared-apps-lib';
export declare const CCF_PARTNER_PRESENCE_SYNC_RULE_KEY = "ccfPartnerPresenceSyncRule";
export declare const GET_PARTNER_PRESENCE_SYNC_RULE = "presenceSync/getPartnerPresenceSyncRule";
export declare const partnerPresenceSyncRule: CXonePartnerPresenceSyncRule;
/**
 * Thunk action get the cxone partner presence sync rule
 * @returns - CXonePartnerPresenceSyncRule object
 * @example
 * ```
 * dispatch(getPartnerPresenceSyncRule(data as CXonePartnerAccountDetails));
 * ```
 */
export declare const getPartnerPresenceSyncRule: import("@reduxjs/toolkit").AsyncThunk<unknown, CXonePartnerAccountDetails, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<import("redux").AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
export declare const cxonePartnerPresenceSync: import("@reduxjs/toolkit").Slice<CXonePartnerPresenceSyncRule, {}, "ccfPartnerPresenceSyncRule">;
export declare const cxonePartnerPresenceSyncReducer: import("redux").Reducer<CXonePartnerPresenceSyncRule, import("redux").AnyAction>;
export declare const cxonePartnerPresenceSyncActions: import("@reduxjs/toolkit").CaseReducerActions<{}, "ccfPartnerPresenceSyncRule">;
