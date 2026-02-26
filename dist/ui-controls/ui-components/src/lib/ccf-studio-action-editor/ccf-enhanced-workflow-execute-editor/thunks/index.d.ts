import { Dispatch, AnyAction } from '@reduxjs/toolkit';
import * as CcfEnhancedWorkflowExecuteEditorSlice from '../ccf-enhanced-workflow-execute-editor.slice';
import { WorkflowType } from '../helpers/enhanced-workflow-models';
declare type HandleApplyReturnType = Promise<void>;
/**
 * Function to handle logic for setting studio action parameters.
 * @example handleApply()
 */
export declare const handleApply: import("@reduxjs/toolkit").AsyncThunk<HandleApplyReturnType, void, {
    dispatch: Dispatch<AnyAction>;
    getState: CcfEnhancedWorkflowExecuteEditorSlice.enhancedWorkflowExecuteRootState;
    extra: any;
    state?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
declare type HandleCancelReturnType = Promise<void>;
declare type HandleCancelPayloadType = {
    configurationId: string;
    workflowId: string;
};
/**
 * Function to handle logic for when the "CANCEL" button is clicked.
 * @example handleCancel()
 */
export declare const handleCancel: import("@reduxjs/toolkit").AsyncThunk<HandleCancelReturnType, HandleCancelPayloadType, {
    dispatch: Dispatch<AnyAction>;
    getState: CcfEnhancedWorkflowExecuteEditorSlice.enhancedWorkflowExecuteRootState;
    extra: any;
    state?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
declare type FetchConfigurationsReturnType = Promise<void>;
/**
 * get all crmSolutionInstances
 * @example - dispatch(fetchConfigurations())
 */
export declare const fetchConfigurations: import("@reduxjs/toolkit").AsyncThunk<FetchConfigurationsReturnType, void, {
    dispatch: Dispatch<AnyAction>;
    extra: any;
    state?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
declare type FetchConfigurationWorkflowsReturnType = Promise<void>;
/**
 * get all workflow info
 * @example - dispatch(fetchConfigurationWorkflows(configurationId))
 */
export declare const fetchConfigurationWorkflows: import("@reduxjs/toolkit").AsyncThunk<FetchConfigurationWorkflowsReturnType, string, {
    dispatch: Dispatch<AnyAction>;
    extra: any;
    state?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
/**
 * To Test All WorkFlow
 * @example - dispatch(fetchEWEConfigsTestResult(  action: 'Search' | 'Create';
  configId: string;
  workflowId: string;
  phoneNumber?: string;
  email?: string;
  interactionID: string;
  contactID: string;))
 */
export declare type FetchEWEConfigsTestResultReturnType = {
    type: string;
    payload: Record<string, unknown>;
};
export declare type FetchEWEConfigsTestResultFieldsPayloadType = {
    action: WorkflowType;
    configId: string;
    workflowId: string;
    phoneNumber?: string;
    email?: string;
    searchFilter?: Record<string, any>;
    createFilter?: Record<string, any>;
    interactionID: string;
    contactID: string;
    dynamicDataMappingId?: string;
};
export declare type CXoneApiError = {
    message: string;
    errorType: string;
    name: string;
    data?: {
        body?: {
            error?: string;
            error_description?: string;
        };
        status?: number;
        statusText?: string;
    };
};
export declare const fetchEWEConfigsTestResult: import("@reduxjs/toolkit").AsyncThunk<CcfEnhancedWorkflowExecuteEditorSlice.thunks.FetchEWEConfigsTestResultReturnType, CcfEnhancedWorkflowExecuteEditorSlice.thunks.FetchEWEConfigsTestResultFieldsPayloadType, {
    dispatch: Dispatch<AnyAction>;
    extra: any;
    rejectValue: CXoneApiError;
    state?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
declare type FetchWorkflowEntitiesReturnType = Promise<void>;
/**
 * get all workflow info
 * @example - dispatch(fetchWorkflowEntities(configurationId))
 */
export declare const fetchWorkflowEntities: import("@reduxjs/toolkit").AsyncThunk<FetchWorkflowEntitiesReturnType, string, {
    dispatch: Dispatch<AnyAction>;
    extra: any;
    state?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
declare type FetchConfigurationWorkflowsEntityFieldsReturnType = Promise<void>;
declare type FetchConfigurationWorkflowsEntityFieldsPayloadType = {
    configurationId: string;
    entityName: string;
};
/**
 * get all workflow info
 * @example - dispatch(fetchWorkflowEntitiesFields(configurationId))
 */
export declare const fetchWorkflowEntitiesFields: import("@reduxjs/toolkit").AsyncThunk<FetchConfigurationWorkflowsEntityFieldsReturnType, FetchConfigurationWorkflowsEntityFieldsPayloadType, {
    dispatch: Dispatch<AnyAction>;
    extra: any;
    state?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
declare type FetchDynamicDataMappingsReturnType = Promise<void>;
/**
 * get all data mapping info
 * @example - dispatch(fetchDynamicDataMappings(configurationId))
 */
export declare const fetchDynamicDataMappings: import("@reduxjs/toolkit").AsyncThunk<FetchDynamicDataMappingsReturnType, string, {
    dispatch: Dispatch<AnyAction>;
    extra: any;
    state?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
export { default as initialize } from './initialize';
