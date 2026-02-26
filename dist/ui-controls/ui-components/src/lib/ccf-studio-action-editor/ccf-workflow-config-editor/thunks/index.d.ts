import { Dispatch, AnyAction } from '@reduxjs/toolkit';
import { AgentIntegrationConfiguration, AgentWorkflowMappingGridData } from '@nice-devone/shared-apps-lib';
import { CcfGridSelectionModel } from '@nice-devone/ui-controls';
import { AgentLog, ContactLog, SkillLog } from '@nice-devone/common-sdk';
import { CcfWorkflowConfigEditorActions, WorkflowConfigRootState } from '../ccf-workflow-config-editor.slice';
import { STUDIO_ACTION_EDITOR_SLICE_KEY } from '../../ccf-studio-action-editor.slice';
declare type LogData = ContactLog | AgentLog | SkillLog;
interface Logger {
    error(functionName: string, message: string, data?: LogData): void;
    info(functionName: string, message: string, data?: LogData): void;
    debug(functionName: string, message: string, data?: LogData): void;
    warn(functionName: string, message: string, data?: LogData): void;
}
interface ExtendedRootState extends WorkflowConfigRootState {
    [STUDIO_ACTION_EDITOR_SLICE_KEY]: {
        token: string;
        data: Record<string, unknown>;
        applicationConfiguration: Record<string, unknown>;
    };
}
interface ThunkExtraArgument {
    logger: Logger;
    CcfWorkflowConfigEditorSlice: {
        CcfWorkflowConfigEditorActions: typeof CcfWorkflowConfigEditorActions;
        thunks: {
            fetchConfigurations: () => unknown;
            fetchConfigurationWorkflows: (configurationId: string) => unknown;
            fetchDataMappings: (configurationId: string) => unknown;
            fetchDynamicDataMappings: (configurationId: string) => unknown;
        };
    };
    CcfStudioActionEditorSlice: {
        authenticate: (token: string) => unknown;
    };
    helpers?: unknown;
}
/**
 * initialize the workflow config editor
 * @example - dispatch(initializeWorkflowConfigEditor())
 */
export declare const initializeWorkflowConfigEditor: import("@reduxjs/toolkit").AsyncThunk<void, void, {
    dispatch: Dispatch<AnyAction>;
    getState: () => ExtendedRootState;
    extra: ThunkExtraArgument;
    state?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
declare type FetchConfigurationsReturnType = Promise<void>;
/**
 * get all configurations
 * @example - dispatch(fetchConfigurations())
 */
export declare const fetchConfigurations: import("@reduxjs/toolkit").AsyncThunk<FetchConfigurationsReturnType, void, {
    dispatch: Dispatch<AnyAction>;
    getState: () => ExtendedRootState;
    extra: ThunkExtraArgument;
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
    getState: () => ExtendedRootState;
    extra: ThunkExtraArgument;
    state?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
declare type FetchDataMemorializationMappingsReturnType = Promise<void>;
/**
 * get all data mapping info
 * @example - dispatch(fetchDataMappings(configurationId))
 */
export declare const fetchDataMappings: import("@reduxjs/toolkit").AsyncThunk<FetchDataMemorializationMappingsReturnType, string, {
    dispatch: Dispatch<AnyAction>;
    getState: () => ExtendedRootState;
    extra: ThunkExtraArgument;
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
    getState: () => ExtendedRootState;
    extra: ThunkExtraArgument;
    state?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
declare type HandleChangeInConfigurationDropdownReturnType = Promise<void>;
/**
 * Handle change in configuration dropdown
 * @example - dispatch(handleChangeInConfigurationDropdown(configurationId)
 */
export declare const handleChangeInConfigurationDropdown: import("@reduxjs/toolkit").AsyncThunk<HandleChangeInConfigurationDropdownReturnType, string, {
    dispatch: Dispatch<AnyAction>;
    getState: () => ExtendedRootState;
    extra: ThunkExtraArgument;
    state?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
declare type HandleDeleteOfSelectedConfigurationReturnType = Promise<void>;
/**
 * Handle delete of selected configuration
 * @example - dispatch(handleDeleteOfSelectedConfiguration(configuration)
 */
export declare const handleDeleteOfSelectedConfiguration: import("@reduxjs/toolkit").AsyncThunk<HandleDeleteOfSelectedConfigurationReturnType, AgentIntegrationConfiguration, {
    dispatch: Dispatch<AnyAction>;
    extra: ThunkExtraArgument;
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
    extra: ThunkExtraArgument;
    state?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
declare type HandleDeleteOfSelectedActionReturnType = Promise<void>;
/**
* Function to handle logic for when a selected action is deleted.
* @example handleDeleteOfSelectedAction()
*/
export declare const handleDeleteOfSelectedAction: import("@reduxjs/toolkit").AsyncThunk<HandleDeleteOfSelectedActionReturnType, string, {
    dispatch: Dispatch<AnyAction>;
    extra: ThunkExtraArgument;
    state?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
declare type HandleWorkflowMappingSelectionsReturnType = Promise<number>;
declare type HandleWorkflowMappingSelectionsPayloadType = {
    isCCFGridLoading: boolean;
    newWorkflowMappingSelections: CcfGridSelectionModel;
    workflowMappingSelections: CcfGridSelectionModel;
    workflowMappingGridData: AgentWorkflowMappingGridData[];
};
/**
 * Function to handle logic for when an item in CcfGrid is selected.
 * @param isCCFGridLoading - Slice property indicating the loading state for workflow mapping grid.
 * @param setWorkflowMappingSelections - Reducer action.
 * @param newWorkflowMappingSelections - Array of selection changes.
 * @param workflowMappingSelections - Array of active selections.
 * @param workflowMappingGridData - Array of workflow mapping grid items.
 * @example handleWorkflowMappingSelections(isCCFGridLoading, setWorkflowMappingSelections, dispatch, newWorkflowMappingSelections, workflowMappingSelections, workflowMappingGridData)
 */
export declare const handleWorkflowMappingSelections: import("@reduxjs/toolkit").AsyncThunk<HandleWorkflowMappingSelectionsReturnType, HandleWorkflowMappingSelectionsPayloadType, {
    dispatch: Dispatch<AnyAction>;
    extra: ThunkExtraArgument;
    state?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
export {};
