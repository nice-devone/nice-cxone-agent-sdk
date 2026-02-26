import { PayloadAction } from '@reduxjs/toolkit';
import { CustomerCardCustomFieldDetails } from './ccf-custom-fields';
import { CXoneCustomerCardCustomFields, CXoneCustomFieldDetails } from '@nice-devone/common-sdk';
import { ToastMessageType } from '../../../enums/toast-message-type';
/**
 * Thunk action creator to interact with SDK and manage Authentication By Code flow
 *
 * @param args - customfield detail and case id
 * ```
 * @example
 *  dispatch(
      updateCaseCustomFields()
    );
 * ```
 */
interface CcfCaseCustomFieldState {
    /**
     * @remarks - Custom field values
     */
    customFieldValues: CXoneCustomFieldDetails[];
    /**
     * @remarks - custom Field updated flag
     */
    customFieldUpdated: boolean;
    /**
     * @remarks - Custom field definitions
     */
    customFieldDefs: CXoneCustomerCardCustomFields;
    /**
    * @remarks - Custom field definitions
    */
    updatedCustomField: CXoneCustomFieldDetails[];
    /**
     * @remarks - Invalid custom fields
     */
    invalidCustomFields: string[];
    /**
     * @remarks - Toaster flag
     */
    toastMsg: string;
}
export declare const CCF_CASE_CUSTOM_FIELD_KEY = "CcfCaseCustomField";
export declare const updateCaseCustomFields: import("@reduxjs/toolkit").AsyncThunk<void, CustomerCardCustomFieldDetails, {
    state?: unknown;
    dispatch?: import("redux").Dispatch<import("redux").AnyAction> | undefined;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
export declare const CcfCaseCustomFieldAction: import("@reduxjs/toolkit").CaseReducerActions<{
    /**
     * used to storeCaseCustomField
     * @param rootState - AppSpace state
     * @example - storeCaseCustomField(state)
     */
    storeCaseCustomField(state: any, action: PayloadAction<CustomerCardCustomFieldDetails>): any;
    /**
     * used to derive and store invalid custom fields
     * @param rootState - AppSpace state
     * @example - storeInvalidCustomFields(state)
     */
    storeInvalidCustomFields(state: any, action: PayloadAction<any>): any;
    /**
     * used to storeCustomField
     * @param rootState - AppSpace state
     * @example - storeCustomField(state)
     */
    storeToastMsgFlag(state: any, action: PayloadAction<ToastMessageType | string>): any;
}, "CcfCaseCustomField">;
export declare const CcfCaseCustomFieldReducer: import("redux").Reducer<CcfCaseCustomFieldState, import("redux").AnyAction>;
export declare const cxoneCaseCustomFieldsUpdated: ((state: {
    CcfCaseCustomField: any;
}) => any) & import("reselect").OutputSelectorFields<(args_0: any) => any> & {
    clearCache: () => void;
};
export declare const cxoneCustomFieldUpdateFlag: ((state: {
    CcfCaseCustomField: any;
}) => any) & import("reselect").OutputSelectorFields<(args_0: any) => any> & {
    clearCache: () => void;
};
export declare const cxoneCustomInvalidFieldValues: ((state: {
    CcfCaseCustomField: any;
}) => any) & import("reselect").OutputSelectorFields<(args_0: any) => any> & {
    clearCache: () => void;
};
export {};
