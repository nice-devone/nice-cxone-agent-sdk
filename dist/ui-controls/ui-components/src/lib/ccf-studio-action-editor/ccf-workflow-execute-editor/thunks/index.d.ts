import { Dispatch, AnyAction } from '@reduxjs/toolkit';
import * as CcfWorkflowExecuteEditorSlice from '../../ccf-workflow-execute-editor/ccf-workflow-execute-editor.slice';
declare type FetchConfigurationsReturnType = Promise<void>;
/**
 * get all configurations
 * @example - dispatch(fetchConfigurations())
 */
export declare const fetchConfigurations: import("@reduxjs/toolkit").AsyncThunk<FetchConfigurationsReturnType, void, {
    dispatch: Dispatch<AnyAction>;
    getState: CcfWorkflowExecuteEditorSlice.WorkflowExecuteRootState;
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
    getState: CcfWorkflowExecuteEditorSlice.WorkflowExecuteRootState;
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
    getState: CcfWorkflowExecuteEditorSlice.WorkflowExecuteRootState;
    extra: any;
    state?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
declare type HandleChangeInConfigurationDropdownReturnType = Promise<void>;
/**
 * Function to handle logic for when a change in the configuration dropdown occurs.
 * @example handleChangeInConfigurationDropdown()
 */
export declare const handleChangeInConfigurationDropdown: import("@reduxjs/toolkit").AsyncThunk<HandleChangeInConfigurationDropdownReturnType, string, {
    dispatch: Dispatch<AnyAction>;
    getState: CcfWorkflowExecuteEditorSlice.WorkflowExecuteRootState;
    extra: any;
    state?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
declare type HandleDeleteOfSelectedConfigurationReturnType = Promise<void>;
/**
 * Function to handle logic for when a selected configuration is deleted.
 * @example handleDeleteOfSelectedConfiguration()
 */
export declare const handleDeleteOfSelectedConfiguration: import("@reduxjs/toolkit").AsyncThunk<HandleDeleteOfSelectedConfigurationReturnType, any, {
    dispatch: Dispatch<AnyAction>;
    getState: CcfWorkflowExecuteEditorSlice.WorkflowExecuteRootState;
    extra: any;
    state?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
declare type HandleChangeInActionsDropdownReturnType = Promise<void>;
declare type HandleChangeInActionsDropdownPayloadType = string[];
/**
 * Function to handle logic for when a change in the actions dropdown occurs.
 * @example handleChangeInActionsDropdown()
 */
export declare const handleChangeInActionsDropdown: import("@reduxjs/toolkit").AsyncThunk<HandleChangeInActionsDropdownReturnType, HandleChangeInActionsDropdownPayloadType, {
    dispatch: Dispatch<AnyAction>;
    getState: CcfWorkflowExecuteEditorSlice.WorkflowExecuteRootState;
    extra: any;
    state?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
declare type SetDeleteOfWorkflowExecuteActionsReturnType = Promise<void>;
/**
 * Function to handle logic for when a selected action is deleted.
 * @example setDeleteOfWorkflowExecuteActions()
 */
export declare const setDeleteOfWorkflowExecuteActions: import("@reduxjs/toolkit").AsyncThunk<SetDeleteOfWorkflowExecuteActionsReturnType, string, {
    dispatch: Dispatch<AnyAction>;
    getState: CcfWorkflowExecuteEditorSlice.WorkflowExecuteRootState;
    extra: any;
    state?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
declare type HandleWorkflowMappingSelectionsReturnType = Promise<-2 | -1 | 1 | 0>;
/**
 * Function to handle logic for when an item in CcfGrid is selected.
 * @example handleWorkflowMappingSelections(newWorkflowMappingSelections)
 */
export declare const handleWorkflowMappingSelections: import("@reduxjs/toolkit").AsyncThunk<HandleWorkflowMappingSelectionsReturnType, any, {
    dispatch: Dispatch<AnyAction>;
    getState: CcfWorkflowExecuteEditorSlice.WorkflowExecuteRootState;
    extra: any;
    state?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
declare type HandleCancelReturnType = Promise<void>;
/**
 * Function to handle logic for when the "CANCEL" button is clicked.
 * @example handleCancel()
 */
export declare const handleCancel: import("@reduxjs/toolkit").AsyncThunk<HandleCancelReturnType, any, {
    dispatch: Dispatch<AnyAction>;
    getState: CcfWorkflowExecuteEditorSlice.WorkflowExecuteRootState;
    extra: any;
    state?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
declare type HandleApplyReturnType = Promise<void>;
/**
 * Function to handle logic for setting studio action parameters.
 * @example handleApply()
 */
export declare const handleApply: import("@reduxjs/toolkit").AsyncThunk<HandleApplyReturnType, void, {
    dispatch: Dispatch<AnyAction>;
    getState: CcfWorkflowExecuteEditorSlice.WorkflowExecuteRootState;
    extra: any;
    state?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
export { default as initialize } from './initialize';
