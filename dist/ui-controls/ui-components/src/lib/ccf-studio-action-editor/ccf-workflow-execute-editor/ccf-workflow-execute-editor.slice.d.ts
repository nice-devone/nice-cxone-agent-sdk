import { PayloadAction } from '@reduxjs/toolkit';
import { CcfGridSelectionModel } from '@nice-devone/ui-controls';
import { AgentIntegrationConfiguration, AgentIntegrationConfigurationResult, AgentIntegrationWorkflowResult, AgentIntegrationDynamicDataMapping, ActionForDropdown, CcfActionEditorSlice, WorkflowsByConfigurations, AgentWorkflowMappingGridData } from '@nice-devone/shared-apps-lib';
export declare const WORKFLOW_EXECUTE_EDITOR_SLICE_KEY: string;
export declare const WORKFLOW_EXECUTE_ACTIONS: {
    CREATE: string;
    SEARCH: string;
    TIMELINE: string;
    UPDATE: string;
};
/**
 * This interface is the structure for action parameters.
 */
export interface WorkflowExecuteStudioDataInput {
    configurationId: string;
    workflowId: string;
    actionType: string;
    dynamicDataMappingId: string;
}
export interface WorkflowExecuteEditorState extends CcfActionEditorSlice {
    /**
       * @remarks state for mapping selection
       */
    workflowMappingSelections: CcfGridSelectionModel;
}
/**
 * This interface is the structure for root state.
 */
export interface WorkflowExecuteRootState {
    workflowExecuteEditorSlice: WorkflowExecuteEditorState;
}
/**
 * Application state.
 */
export declare const initialCcfWorkflowExecuteEditorState: WorkflowExecuteEditorState;
export declare const workflowExecuteEditor: import("@reduxjs/toolkit").Slice<WorkflowExecuteEditorState, {
    /**
     * Action to set configurations
     * @param state - CcfWorkflowExecuteEditorState
     * @param action - action.payload
     * @example - dispatch(setConfigurations());
     * @returns - updated state
     */
    setConfigurations(state: import("immer/dist/internal").WritableDraft<WorkflowExecuteEditorState>, action: PayloadAction<AgentIntegrationConfigurationResult>): {
        configurations: AgentIntegrationConfiguration[];
        configurationByConfigurationId: any;
        workflowMappingSelections: import("@mui/x-data-grid").GridRowId[];
        studioActionResult: string[];
        workflowsByConfigurations: import("immer/dist/internal").WritableDraft<WorkflowsByConfigurations>;
        dataMappingsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").DataMappingsByConfigurations>;
        dynamicDataMappingsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").DynamicDataMappingsByConfigurations>;
        selectedConfigurations: import("immer/dist/internal").WritableDraft<AgentIntegrationConfiguration>[];
        selectedActions: string[];
        actionsForDropdown: import("immer/dist/internal").WritableDraft<ActionForDropdown>[];
        workflowMappingGridData: import("immer/dist/internal").WritableDraft<AgentWorkflowMappingGridData>[];
        initializing: boolean;
        workflowMappingGridMessage: string;
        open: boolean;
        loading: boolean;
        selection: any;
    };
    /**
     * Action to set workflows
     * @param state - CcfWorkflowExecuteEditorState
     * @param action - action.payload
     * @example - dispatch(setWorkflows());
     * @returns - updated state
     */
    setWorkflows: (state: import("immer/dist/internal").WritableDraft<WorkflowExecuteEditorState>, action: PayloadAction<AgentIntegrationWorkflowResult>) => {
        workflowsByConfigurations: WorkflowsByConfigurations;
        workflowMappingSelections: import("@mui/x-data-grid").GridRowId[];
        configurations: import("immer/dist/internal").WritableDraft<AgentIntegrationConfiguration>[];
        configurationByConfigurationId: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").ConfigurationByConfigurationId>;
        studioActionResult: string[];
        dataMappingsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").DataMappingsByConfigurations>;
        dynamicDataMappingsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").DynamicDataMappingsByConfigurations>;
        selectedConfigurations: import("immer/dist/internal").WritableDraft<AgentIntegrationConfiguration>[];
        selectedActions: string[];
        actionsForDropdown: import("immer/dist/internal").WritableDraft<ActionForDropdown>[];
        workflowMappingGridData: import("immer/dist/internal").WritableDraft<AgentWorkflowMappingGridData>[];
        initializing: boolean;
        workflowMappingGridMessage: string;
        open: boolean;
        loading: boolean;
        selection: any;
    };
    /**
     * Action to set setDataMappings
     * @param state - CcfWorkflowConfigEditorState
     * @param action - action.payload
     * @example - dispatch(setDataMappings());
     * @returns - updated state
     */
    setDataMappings: (state: import("immer/dist/internal").WritableDraft<WorkflowExecuteEditorState>, action: PayloadAction<any>) => {
        dataMappingsByConfigurations: {
            [x: string]: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").AgentIntegrationDataMapping>[];
        };
        workflowMappingSelections: import("@mui/x-data-grid").GridRowId[];
        configurations: import("immer/dist/internal").WritableDraft<AgentIntegrationConfiguration>[];
        configurationByConfigurationId: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").ConfigurationByConfigurationId>;
        studioActionResult: string[];
        workflowsByConfigurations: import("immer/dist/internal").WritableDraft<WorkflowsByConfigurations>;
        dynamicDataMappingsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").DynamicDataMappingsByConfigurations>;
        selectedConfigurations: import("immer/dist/internal").WritableDraft<AgentIntegrationConfiguration>[];
        selectedActions: string[];
        actionsForDropdown: import("immer/dist/internal").WritableDraft<ActionForDropdown>[];
        workflowMappingGridData: import("immer/dist/internal").WritableDraft<AgentWorkflowMappingGridData>[];
        initializing: boolean;
        workflowMappingGridMessage: string;
        open: boolean;
        loading: boolean;
        selection: any;
    };
    /**
     * Action to set setDynamicDataMappings
     * @param state - CcfWorkflowConfigEditorState
     * @param action - action.payload
     * @example - dispatch(setDynamicDataMappings());
     * @returns - updated state
     */
    setDynamicDataMappings: (state: import("immer/dist/internal").WritableDraft<WorkflowExecuteEditorState>, action: PayloadAction<any>) => {
        dynamicDataMappingsByConfigurations: {
            [x: string]: import("immer/dist/internal").WritableDraft<AgentIntegrationDynamicDataMapping>[];
        };
        workflowMappingSelections: import("@mui/x-data-grid").GridRowId[];
        configurations: import("immer/dist/internal").WritableDraft<AgentIntegrationConfiguration>[];
        configurationByConfigurationId: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").ConfigurationByConfigurationId>;
        studioActionResult: string[];
        workflowsByConfigurations: import("immer/dist/internal").WritableDraft<WorkflowsByConfigurations>;
        dataMappingsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").DataMappingsByConfigurations>;
        selectedConfigurations: import("immer/dist/internal").WritableDraft<AgentIntegrationConfiguration>[];
        selectedActions: string[];
        actionsForDropdown: import("immer/dist/internal").WritableDraft<ActionForDropdown>[];
        workflowMappingGridData: import("immer/dist/internal").WritableDraft<AgentWorkflowMappingGridData>[];
        initializing: boolean;
        workflowMappingGridMessage: string;
        open: boolean;
        loading: boolean;
        selection: any;
    };
    /**
     * Action to remove configuration
     * @param state - CcfWorkflowExecuteEditorState
     * @param action - action.payload
     * @example - dispatch(removeSelectedAgentConfiguration(configuration: Configuration));
     * @returns - updated state
     */
    removeSelectedAgentConfiguration: (state: import("immer/dist/internal").WritableDraft<WorkflowExecuteEditorState>, action: PayloadAction<AgentIntegrationConfiguration>) => {
        selectedConfigurations: import("immer/dist/internal").WritableDraft<AgentIntegrationConfiguration>[];
        workflowMappingSelections: import("@mui/x-data-grid").GridRowId[];
        configurations: import("immer/dist/internal").WritableDraft<AgentIntegrationConfiguration>[];
        configurationByConfigurationId: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").ConfigurationByConfigurationId>;
        studioActionResult: string[];
        workflowsByConfigurations: import("immer/dist/internal").WritableDraft<WorkflowsByConfigurations>;
        dataMappingsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").DataMappingsByConfigurations>;
        dynamicDataMappingsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").DynamicDataMappingsByConfigurations>;
        selectedActions: string[];
        actionsForDropdown: import("immer/dist/internal").WritableDraft<ActionForDropdown>[];
        workflowMappingGridData: import("immer/dist/internal").WritableDraft<AgentWorkflowMappingGridData>[];
        initializing: boolean;
        workflowMappingGridMessage: string;
        open: boolean;
        loading: boolean;
        selection: any;
    };
    /**
     * Action to set set Selected AgentConfigurations
     * @param state - CcfWorkflowExecuteEditorState
     * @param action - action.payload
     * @example - dispatch(setSelectedAgentConfigurations([configurationId_1, configurationId_2, ...]));
     * @returns - updated state
     */
    setSelectedAgentConfigurations: (state: import("immer/dist/internal").WritableDraft<WorkflowExecuteEditorState>, action: PayloadAction<AgentIntegrationConfiguration[]>) => {
        selectedConfigurations: AgentIntegrationConfiguration[];
        workflowMappingSelections: import("@mui/x-data-grid").GridRowId[];
        configurations: import("immer/dist/internal").WritableDraft<AgentIntegrationConfiguration>[];
        configurationByConfigurationId: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").ConfigurationByConfigurationId>;
        studioActionResult: string[];
        workflowsByConfigurations: import("immer/dist/internal").WritableDraft<WorkflowsByConfigurations>;
        dataMappingsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").DataMappingsByConfigurations>;
        dynamicDataMappingsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").DynamicDataMappingsByConfigurations>;
        selectedActions: string[];
        actionsForDropdown: import("immer/dist/internal").WritableDraft<ActionForDropdown>[];
        workflowMappingGridData: import("immer/dist/internal").WritableDraft<AgentWorkflowMappingGridData>[];
        initializing: boolean;
        workflowMappingGridMessage: string;
        open: boolean;
        loading: boolean;
        selection: any;
    };
    /**
     * Action to clear all selected configurations from state
     * @param state - CcfWorkflowExecuteEditorState
     * @param action - action.payload
     * @example - dispatch(setCurrentWorkflowData('search'));
     * @returns - updated state
     */
    clearSelectedAgentConfigurations: (state: import("immer/dist/internal").WritableDraft<WorkflowExecuteEditorState>) => {
        selectedConfigurations: never[];
        workflowMappingSelections: import("@mui/x-data-grid").GridRowId[];
        configurations: import("immer/dist/internal").WritableDraft<AgentIntegrationConfiguration>[];
        configurationByConfigurationId: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").ConfigurationByConfigurationId>;
        studioActionResult: string[];
        workflowsByConfigurations: import("immer/dist/internal").WritableDraft<WorkflowsByConfigurations>;
        dataMappingsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").DataMappingsByConfigurations>;
        dynamicDataMappingsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").DynamicDataMappingsByConfigurations>;
        selectedActions: string[];
        actionsForDropdown: import("immer/dist/internal").WritableDraft<ActionForDropdown>[];
        workflowMappingGridData: import("immer/dist/internal").WritableDraft<AgentWorkflowMappingGridData>[];
        initializing: boolean;
        workflowMappingGridMessage: string;
        open: boolean;
        loading: boolean;
        selection: any;
    };
    /**
     * Action to set data for workflow mapping grid
     * @param state - CcfWorkflowExecuteEditorState
     * @param action - action.payload
     * @example - dispatch(setWorkflowMappingGridData());
     * @returns - updated state
     */
    setWorkflowMappingGridData: (state: import("immer/dist/internal").WritableDraft<WorkflowExecuteEditorState>, action: PayloadAction<any>) => {
        workflowMappingGridData: any;
        workflowMappingSelections: import("@mui/x-data-grid").GridRowId[];
        configurations: import("immer/dist/internal").WritableDraft<AgentIntegrationConfiguration>[];
        configurationByConfigurationId: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").ConfigurationByConfigurationId>;
        studioActionResult: string[];
        workflowsByConfigurations: import("immer/dist/internal").WritableDraft<WorkflowsByConfigurations>;
        dataMappingsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").DataMappingsByConfigurations>;
        dynamicDataMappingsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").DynamicDataMappingsByConfigurations>;
        selectedConfigurations: import("immer/dist/internal").WritableDraft<AgentIntegrationConfiguration>[];
        selectedActions: string[];
        actionsForDropdown: import("immer/dist/internal").WritableDraft<ActionForDropdown>[];
        initializing: boolean;
        workflowMappingGridMessage: string;
        open: boolean;
        loading: boolean;
        selection: any;
    };
    /**
     * Action to clear the workflow mapping grid data
     * @param state - CcfWorkflowExecuteEditorState
     * @param action - action.payload
     * @example - dispatch(clearWorkflowMappingGridData());
     * @returns - updated state
     */
    clearWorkflowMappingGridData: (state: import("immer/dist/internal").WritableDraft<WorkflowExecuteEditorState>) => {
        workflowMappingGridData: never[];
        workflowMappingSelections: import("@mui/x-data-grid").GridRowId[];
        configurations: import("immer/dist/internal").WritableDraft<AgentIntegrationConfiguration>[];
        configurationByConfigurationId: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").ConfigurationByConfigurationId>;
        studioActionResult: string[];
        workflowsByConfigurations: import("immer/dist/internal").WritableDraft<WorkflowsByConfigurations>;
        dataMappingsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").DataMappingsByConfigurations>;
        dynamicDataMappingsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").DynamicDataMappingsByConfigurations>;
        selectedConfigurations: import("immer/dist/internal").WritableDraft<AgentIntegrationConfiguration>[];
        selectedActions: string[];
        actionsForDropdown: import("immer/dist/internal").WritableDraft<ActionForDropdown>[];
        initializing: boolean;
        workflowMappingGridMessage: string;
        open: boolean;
        loading: boolean;
        selection: any;
    };
    /**
     * Action to set selected workflows
     * @param state - CcfWorkflowExecuteEditorState
     * @param action - action.payload
     * @example - dispatch(setWorkflowMappingSelections());
     * @returns - updated state
     */
    setWorkflowMappingSelections: (state: import("immer/dist/internal").WritableDraft<WorkflowExecuteEditorState>, action: PayloadAction<CcfGridSelectionModel>) => {
        workflowMappingSelections: import("@mui/x-data-grid").GridRowSelectionModel;
        configurations: import("immer/dist/internal").WritableDraft<AgentIntegrationConfiguration>[];
        configurationByConfigurationId: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").ConfigurationByConfigurationId>;
        studioActionResult: string[];
        workflowsByConfigurations: import("immer/dist/internal").WritableDraft<WorkflowsByConfigurations>;
        dataMappingsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").DataMappingsByConfigurations>;
        dynamicDataMappingsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").DynamicDataMappingsByConfigurations>;
        selectedConfigurations: import("immer/dist/internal").WritableDraft<AgentIntegrationConfiguration>[];
        selectedActions: string[];
        actionsForDropdown: import("immer/dist/internal").WritableDraft<ActionForDropdown>[];
        workflowMappingGridData: import("immer/dist/internal").WritableDraft<AgentWorkflowMappingGridData>[];
        initializing: boolean;
        workflowMappingGridMessage: string;
        open: boolean;
        loading: boolean;
        selection: any;
    };
    /**
     * Action to set workflow mapping grid message
     * @param state - CcfWorkflowExecuteEditorState
     * @param action - action.payload
     * @example - dispatch(setWorkflowMappingGridMessage());
     * @returns - updated state
     */
    setWorkflowMappingGridMessage: (state: import("immer/dist/internal").WritableDraft<WorkflowExecuteEditorState>, action: PayloadAction<any>) => {
        workflowMappingGridMessage: string;
        workflowMappingSelections: import("@mui/x-data-grid").GridRowId[];
        configurations: import("immer/dist/internal").WritableDraft<AgentIntegrationConfiguration>[];
        configurationByConfigurationId: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").ConfigurationByConfigurationId>;
        studioActionResult: string[];
        workflowsByConfigurations: import("immer/dist/internal").WritableDraft<WorkflowsByConfigurations>;
        dataMappingsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").DataMappingsByConfigurations>;
        dynamicDataMappingsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").DynamicDataMappingsByConfigurations>;
        selectedConfigurations: import("immer/dist/internal").WritableDraft<AgentIntegrationConfiguration>[];
        selectedActions: string[];
        actionsForDropdown: import("immer/dist/internal").WritableDraft<ActionForDropdown>[];
        workflowMappingGridData: import("immer/dist/internal").WritableDraft<AgentWorkflowMappingGridData>[];
        initializing: boolean;
        open: boolean;
        loading: boolean;
        selection: any;
    };
    /**
     * Action to reset the state.
     * @param state - CcfWorkflowExecuteEditorState
     * @param action - action.payload
     * @example - dispatch(setActionsForDropdown());
     * @returns - initial state
     */
    setActionsForDropdown: (state: import("immer/dist/internal").WritableDraft<WorkflowExecuteEditorState>) => {
        actionsForDropdown: ActionForDropdown[];
        workflowMappingSelections: import("@mui/x-data-grid").GridRowId[];
        configurations: import("immer/dist/internal").WritableDraft<AgentIntegrationConfiguration>[];
        configurationByConfigurationId: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").ConfigurationByConfigurationId>;
        studioActionResult: string[];
        workflowsByConfigurations: import("immer/dist/internal").WritableDraft<WorkflowsByConfigurations>;
        dataMappingsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").DataMappingsByConfigurations>;
        dynamicDataMappingsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").DynamicDataMappingsByConfigurations>;
        selectedConfigurations: import("immer/dist/internal").WritableDraft<AgentIntegrationConfiguration>[];
        selectedActions: string[];
        workflowMappingGridData: import("immer/dist/internal").WritableDraft<AgentWorkflowMappingGridData>[];
        initializing: boolean;
        workflowMappingGridMessage: string;
        open: boolean;
        loading: boolean;
        selection: any;
    };
    /**
     * Action to remove workflow agent action
     * @param state - CcfWorkflowExecuteEditorState
     * @param action - action.payload
     * @example - dispatch(removeSelectedWorkflowExecuteAction(workflowAction: ));
     * @returns - updated state
     */
    removeSelectedWorkflowExecuteAction: (state: import("immer/dist/internal").WritableDraft<WorkflowExecuteEditorState>, action: PayloadAction<string>) => {
        selectedActions: string[];
        workflowMappingSelections: import("@mui/x-data-grid").GridRowId[];
        configurations: import("immer/dist/internal").WritableDraft<AgentIntegrationConfiguration>[];
        configurationByConfigurationId: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").ConfigurationByConfigurationId>;
        studioActionResult: string[];
        workflowsByConfigurations: import("immer/dist/internal").WritableDraft<WorkflowsByConfigurations>;
        dataMappingsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").DataMappingsByConfigurations>;
        dynamicDataMappingsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").DynamicDataMappingsByConfigurations>;
        selectedConfigurations: import("immer/dist/internal").WritableDraft<AgentIntegrationConfiguration>[];
        actionsForDropdown: import("immer/dist/internal").WritableDraft<ActionForDropdown>[];
        workflowMappingGridData: import("immer/dist/internal").WritableDraft<AgentWorkflowMappingGridData>[];
        initializing: boolean;
        workflowMappingGridMessage: string;
        open: boolean;
        loading: boolean;
        selection: any;
    };
    /**
     * Action to set all selected agent actions
     * @param state - CcfWorkflowConfigEditorState
     * @param action - action.payload
     * @example - dispatch(setSelectedWorkflowExecuteActions());
     * @returns - updated state
     */
    setSelectedWorkflowExecuteActions: (state: import("immer/dist/internal").WritableDraft<WorkflowExecuteEditorState>, action: PayloadAction<string[]>) => {
        selectedActions: string[];
        workflowMappingSelections: import("@mui/x-data-grid").GridRowId[];
        configurations: import("immer/dist/internal").WritableDraft<AgentIntegrationConfiguration>[];
        configurationByConfigurationId: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").ConfigurationByConfigurationId>;
        studioActionResult: string[];
        workflowsByConfigurations: import("immer/dist/internal").WritableDraft<WorkflowsByConfigurations>;
        dataMappingsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").DataMappingsByConfigurations>;
        dynamicDataMappingsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").DynamicDataMappingsByConfigurations>;
        selectedConfigurations: import("immer/dist/internal").WritableDraft<AgentIntegrationConfiguration>[];
        actionsForDropdown: import("immer/dist/internal").WritableDraft<ActionForDropdown>[];
        workflowMappingGridData: import("immer/dist/internal").WritableDraft<AgentWorkflowMappingGridData>[];
        initializing: boolean;
        workflowMappingGridMessage: string;
        open: boolean;
        loading: boolean;
        selection: any;
    };
    /**
     * Action to clear selected workflows
     * @param state - CcfWorkflowExecuteEditorState
     * @param action - action.payload
     * @example - dispatch(clearWorkflowMappingSelections());
     * @returns - updated state
     */
    clearWorkflowMappingSelections: (state: import("immer/dist/internal").WritableDraft<WorkflowExecuteEditorState>) => {
        workflowMappingSelections: never[];
        configurations: import("immer/dist/internal").WritableDraft<AgentIntegrationConfiguration>[];
        configurationByConfigurationId: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").ConfigurationByConfigurationId>;
        studioActionResult: string[];
        workflowsByConfigurations: import("immer/dist/internal").WritableDraft<WorkflowsByConfigurations>;
        dataMappingsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").DataMappingsByConfigurations>;
        dynamicDataMappingsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").DynamicDataMappingsByConfigurations>;
        selectedConfigurations: import("immer/dist/internal").WritableDraft<AgentIntegrationConfiguration>[];
        selectedActions: string[];
        actionsForDropdown: import("immer/dist/internal").WritableDraft<ActionForDropdown>[];
        workflowMappingGridData: import("immer/dist/internal").WritableDraft<AgentWorkflowMappingGridData>[];
        initializing: boolean;
        workflowMappingGridMessage: string;
        open: boolean;
        loading: boolean;
        selection: any;
    };
    /**
     * Action to reset the state.
     * @param state - CcfWorkflowExecuteEditorState
     * @param action - action.payload
     * @example - dispatch(resetToInitialState());
     * @returns - initial state
     */
    resetToInitialState: () => WorkflowExecuteEditorState;
    /**
     * Action to set initializing state.
     * @param state - CcfWorkflowExecuteEditorState
     * @example - dispatch(setInitializing(true));
     * @returns - state
     */
    setInitializing: (state: import("immer/dist/internal").WritableDraft<WorkflowExecuteEditorState>, action: PayloadAction<boolean>) => {
        initializing: boolean;
        workflowMappingSelections: import("@mui/x-data-grid").GridRowId[];
        configurations: import("immer/dist/internal").WritableDraft<AgentIntegrationConfiguration>[];
        configurationByConfigurationId: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").ConfigurationByConfigurationId>;
        studioActionResult: string[];
        workflowsByConfigurations: import("immer/dist/internal").WritableDraft<WorkflowsByConfigurations>;
        dataMappingsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").DataMappingsByConfigurations>;
        dynamicDataMappingsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").DynamicDataMappingsByConfigurations>;
        selectedConfigurations: import("immer/dist/internal").WritableDraft<AgentIntegrationConfiguration>[];
        selectedActions: string[];
        actionsForDropdown: import("immer/dist/internal").WritableDraft<ActionForDropdown>[];
        workflowMappingGridData: import("immer/dist/internal").WritableDraft<AgentWorkflowMappingGridData>[];
        workflowMappingGridMessage: string;
        open: boolean;
        loading: boolean;
        selection: any;
    };
    /**
     * Action to set the opened state.
     * @param state - CcfWorkflowExecuteEditorState
     * @example - dispatch(setInitializing(true));
     * @returns - state
     */
    setOpen: (state: import("immer/dist/internal").WritableDraft<WorkflowExecuteEditorState>, action: PayloadAction<boolean>) => {
        open: boolean;
        workflowMappingSelections: import("@mui/x-data-grid").GridRowId[];
        configurations: import("immer/dist/internal").WritableDraft<AgentIntegrationConfiguration>[];
        configurationByConfigurationId: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").ConfigurationByConfigurationId>;
        studioActionResult: string[];
        workflowsByConfigurations: import("immer/dist/internal").WritableDraft<WorkflowsByConfigurations>;
        dataMappingsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").DataMappingsByConfigurations>;
        dynamicDataMappingsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").DynamicDataMappingsByConfigurations>;
        selectedConfigurations: import("immer/dist/internal").WritableDraft<AgentIntegrationConfiguration>[];
        selectedActions: string[];
        actionsForDropdown: import("immer/dist/internal").WritableDraft<ActionForDropdown>[];
        workflowMappingGridData: import("immer/dist/internal").WritableDraft<AgentWorkflowMappingGridData>[];
        initializing: boolean;
        workflowMappingGridMessage: string;
        loading: boolean;
        selection: any;
    };
    /**
     * Action to set the loading state.
     * @param state - CcfWorkflowExecuteEditorState
     * @example - dispatch(setInitializing(true));
     * @returns - state
     */
    setLoading: (state: import("immer/dist/internal").WritableDraft<WorkflowExecuteEditorState>, action: PayloadAction<boolean>) => {
        loading: boolean;
        workflowMappingSelections: import("@mui/x-data-grid").GridRowId[];
        configurations: import("immer/dist/internal").WritableDraft<AgentIntegrationConfiguration>[];
        configurationByConfigurationId: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").ConfigurationByConfigurationId>;
        studioActionResult: string[];
        workflowsByConfigurations: import("immer/dist/internal").WritableDraft<WorkflowsByConfigurations>;
        dataMappingsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").DataMappingsByConfigurations>;
        dynamicDataMappingsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").DynamicDataMappingsByConfigurations>;
        selectedConfigurations: import("immer/dist/internal").WritableDraft<AgentIntegrationConfiguration>[];
        selectedActions: string[];
        actionsForDropdown: import("immer/dist/internal").WritableDraft<ActionForDropdown>[];
        workflowMappingGridData: import("immer/dist/internal").WritableDraft<AgentWorkflowMappingGridData>[];
        initializing: boolean;
        workflowMappingGridMessage: string;
        open: boolean;
        selection: any;
    };
    /**
     * Action to set grid selection.
     * @param state - CcfWorkflowExecuteEditorState
     * @example - dispatch(setSelection());
     * @returns - state
     */
    setSelection: (state: import("immer/dist/internal").WritableDraft<WorkflowExecuteEditorState>) => {
        selection: {};
        workflowMappingSelections: import("@mui/x-data-grid").GridRowId[];
        configurations: import("immer/dist/internal").WritableDraft<AgentIntegrationConfiguration>[];
        configurationByConfigurationId: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").ConfigurationByConfigurationId>;
        studioActionResult: string[];
        workflowsByConfigurations: import("immer/dist/internal").WritableDraft<WorkflowsByConfigurations>;
        dataMappingsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").DataMappingsByConfigurations>;
        dynamicDataMappingsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").DynamicDataMappingsByConfigurations>;
        selectedConfigurations: import("immer/dist/internal").WritableDraft<AgentIntegrationConfiguration>[];
        selectedActions: string[];
        actionsForDropdown: import("immer/dist/internal").WritableDraft<ActionForDropdown>[];
        workflowMappingGridData: import("immer/dist/internal").WritableDraft<AgentWorkflowMappingGridData>[];
        initializing: boolean;
        workflowMappingGridMessage: string;
        open: boolean;
        loading: boolean;
    };
}, string>;
export declare const CcfWorkflowExecuteEditorReducer: import("redux").Reducer<WorkflowExecuteEditorState, import("redux").AnyAction>;
export declare const CcfWorkflowExecuteEditorActions: import("@reduxjs/toolkit").CaseReducerActions<{
    /**
     * Action to set configurations
     * @param state - CcfWorkflowExecuteEditorState
     * @param action - action.payload
     * @example - dispatch(setConfigurations());
     * @returns - updated state
     */
    setConfigurations(state: import("immer/dist/internal").WritableDraft<WorkflowExecuteEditorState>, action: PayloadAction<AgentIntegrationConfigurationResult>): {
        configurations: AgentIntegrationConfiguration[];
        configurationByConfigurationId: any;
        workflowMappingSelections: import("@mui/x-data-grid").GridRowId[];
        studioActionResult: string[];
        workflowsByConfigurations: import("immer/dist/internal").WritableDraft<WorkflowsByConfigurations>;
        dataMappingsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").DataMappingsByConfigurations>;
        dynamicDataMappingsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").DynamicDataMappingsByConfigurations>;
        selectedConfigurations: import("immer/dist/internal").WritableDraft<AgentIntegrationConfiguration>[];
        selectedActions: string[];
        actionsForDropdown: import("immer/dist/internal").WritableDraft<ActionForDropdown>[];
        workflowMappingGridData: import("immer/dist/internal").WritableDraft<AgentWorkflowMappingGridData>[];
        initializing: boolean;
        workflowMappingGridMessage: string;
        open: boolean;
        loading: boolean;
        selection: any;
    };
    /**
     * Action to set workflows
     * @param state - CcfWorkflowExecuteEditorState
     * @param action - action.payload
     * @example - dispatch(setWorkflows());
     * @returns - updated state
     */
    setWorkflows: (state: import("immer/dist/internal").WritableDraft<WorkflowExecuteEditorState>, action: PayloadAction<AgentIntegrationWorkflowResult>) => {
        workflowsByConfigurations: WorkflowsByConfigurations;
        workflowMappingSelections: import("@mui/x-data-grid").GridRowId[];
        configurations: import("immer/dist/internal").WritableDraft<AgentIntegrationConfiguration>[];
        configurationByConfigurationId: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").ConfigurationByConfigurationId>;
        studioActionResult: string[];
        dataMappingsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").DataMappingsByConfigurations>;
        dynamicDataMappingsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").DynamicDataMappingsByConfigurations>;
        selectedConfigurations: import("immer/dist/internal").WritableDraft<AgentIntegrationConfiguration>[];
        selectedActions: string[];
        actionsForDropdown: import("immer/dist/internal").WritableDraft<ActionForDropdown>[];
        workflowMappingGridData: import("immer/dist/internal").WritableDraft<AgentWorkflowMappingGridData>[];
        initializing: boolean;
        workflowMappingGridMessage: string;
        open: boolean;
        loading: boolean;
        selection: any;
    };
    /**
     * Action to set setDataMappings
     * @param state - CcfWorkflowConfigEditorState
     * @param action - action.payload
     * @example - dispatch(setDataMappings());
     * @returns - updated state
     */
    setDataMappings: (state: import("immer/dist/internal").WritableDraft<WorkflowExecuteEditorState>, action: PayloadAction<any>) => {
        dataMappingsByConfigurations: {
            [x: string]: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").AgentIntegrationDataMapping>[];
        };
        workflowMappingSelections: import("@mui/x-data-grid").GridRowId[];
        configurations: import("immer/dist/internal").WritableDraft<AgentIntegrationConfiguration>[];
        configurationByConfigurationId: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").ConfigurationByConfigurationId>;
        studioActionResult: string[];
        workflowsByConfigurations: import("immer/dist/internal").WritableDraft<WorkflowsByConfigurations>;
        dynamicDataMappingsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").DynamicDataMappingsByConfigurations>;
        selectedConfigurations: import("immer/dist/internal").WritableDraft<AgentIntegrationConfiguration>[];
        selectedActions: string[];
        actionsForDropdown: import("immer/dist/internal").WritableDraft<ActionForDropdown>[];
        workflowMappingGridData: import("immer/dist/internal").WritableDraft<AgentWorkflowMappingGridData>[];
        initializing: boolean;
        workflowMappingGridMessage: string;
        open: boolean;
        loading: boolean;
        selection: any;
    };
    /**
     * Action to set setDynamicDataMappings
     * @param state - CcfWorkflowConfigEditorState
     * @param action - action.payload
     * @example - dispatch(setDynamicDataMappings());
     * @returns - updated state
     */
    setDynamicDataMappings: (state: import("immer/dist/internal").WritableDraft<WorkflowExecuteEditorState>, action: PayloadAction<any>) => {
        dynamicDataMappingsByConfigurations: {
            [x: string]: import("immer/dist/internal").WritableDraft<AgentIntegrationDynamicDataMapping>[];
        };
        workflowMappingSelections: import("@mui/x-data-grid").GridRowId[];
        configurations: import("immer/dist/internal").WritableDraft<AgentIntegrationConfiguration>[];
        configurationByConfigurationId: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").ConfigurationByConfigurationId>;
        studioActionResult: string[];
        workflowsByConfigurations: import("immer/dist/internal").WritableDraft<WorkflowsByConfigurations>;
        dataMappingsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").DataMappingsByConfigurations>;
        selectedConfigurations: import("immer/dist/internal").WritableDraft<AgentIntegrationConfiguration>[];
        selectedActions: string[];
        actionsForDropdown: import("immer/dist/internal").WritableDraft<ActionForDropdown>[];
        workflowMappingGridData: import("immer/dist/internal").WritableDraft<AgentWorkflowMappingGridData>[];
        initializing: boolean;
        workflowMappingGridMessage: string;
        open: boolean;
        loading: boolean;
        selection: any;
    };
    /**
     * Action to remove configuration
     * @param state - CcfWorkflowExecuteEditorState
     * @param action - action.payload
     * @example - dispatch(removeSelectedAgentConfiguration(configuration: Configuration));
     * @returns - updated state
     */
    removeSelectedAgentConfiguration: (state: import("immer/dist/internal").WritableDraft<WorkflowExecuteEditorState>, action: PayloadAction<AgentIntegrationConfiguration>) => {
        selectedConfigurations: import("immer/dist/internal").WritableDraft<AgentIntegrationConfiguration>[];
        workflowMappingSelections: import("@mui/x-data-grid").GridRowId[];
        configurations: import("immer/dist/internal").WritableDraft<AgentIntegrationConfiguration>[];
        configurationByConfigurationId: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").ConfigurationByConfigurationId>;
        studioActionResult: string[];
        workflowsByConfigurations: import("immer/dist/internal").WritableDraft<WorkflowsByConfigurations>;
        dataMappingsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").DataMappingsByConfigurations>;
        dynamicDataMappingsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").DynamicDataMappingsByConfigurations>;
        selectedActions: string[];
        actionsForDropdown: import("immer/dist/internal").WritableDraft<ActionForDropdown>[];
        workflowMappingGridData: import("immer/dist/internal").WritableDraft<AgentWorkflowMappingGridData>[];
        initializing: boolean;
        workflowMappingGridMessage: string;
        open: boolean;
        loading: boolean;
        selection: any;
    };
    /**
     * Action to set set Selected AgentConfigurations
     * @param state - CcfWorkflowExecuteEditorState
     * @param action - action.payload
     * @example - dispatch(setSelectedAgentConfigurations([configurationId_1, configurationId_2, ...]));
     * @returns - updated state
     */
    setSelectedAgentConfigurations: (state: import("immer/dist/internal").WritableDraft<WorkflowExecuteEditorState>, action: PayloadAction<AgentIntegrationConfiguration[]>) => {
        selectedConfigurations: AgentIntegrationConfiguration[];
        workflowMappingSelections: import("@mui/x-data-grid").GridRowId[];
        configurations: import("immer/dist/internal").WritableDraft<AgentIntegrationConfiguration>[];
        configurationByConfigurationId: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").ConfigurationByConfigurationId>;
        studioActionResult: string[];
        workflowsByConfigurations: import("immer/dist/internal").WritableDraft<WorkflowsByConfigurations>;
        dataMappingsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").DataMappingsByConfigurations>;
        dynamicDataMappingsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").DynamicDataMappingsByConfigurations>;
        selectedActions: string[];
        actionsForDropdown: import("immer/dist/internal").WritableDraft<ActionForDropdown>[];
        workflowMappingGridData: import("immer/dist/internal").WritableDraft<AgentWorkflowMappingGridData>[];
        initializing: boolean;
        workflowMappingGridMessage: string;
        open: boolean;
        loading: boolean;
        selection: any;
    };
    /**
     * Action to clear all selected configurations from state
     * @param state - CcfWorkflowExecuteEditorState
     * @param action - action.payload
     * @example - dispatch(setCurrentWorkflowData('search'));
     * @returns - updated state
     */
    clearSelectedAgentConfigurations: (state: import("immer/dist/internal").WritableDraft<WorkflowExecuteEditorState>) => {
        selectedConfigurations: never[];
        workflowMappingSelections: import("@mui/x-data-grid").GridRowId[];
        configurations: import("immer/dist/internal").WritableDraft<AgentIntegrationConfiguration>[];
        configurationByConfigurationId: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").ConfigurationByConfigurationId>;
        studioActionResult: string[];
        workflowsByConfigurations: import("immer/dist/internal").WritableDraft<WorkflowsByConfigurations>;
        dataMappingsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").DataMappingsByConfigurations>;
        dynamicDataMappingsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").DynamicDataMappingsByConfigurations>;
        selectedActions: string[];
        actionsForDropdown: import("immer/dist/internal").WritableDraft<ActionForDropdown>[];
        workflowMappingGridData: import("immer/dist/internal").WritableDraft<AgentWorkflowMappingGridData>[];
        initializing: boolean;
        workflowMappingGridMessage: string;
        open: boolean;
        loading: boolean;
        selection: any;
    };
    /**
     * Action to set data for workflow mapping grid
     * @param state - CcfWorkflowExecuteEditorState
     * @param action - action.payload
     * @example - dispatch(setWorkflowMappingGridData());
     * @returns - updated state
     */
    setWorkflowMappingGridData: (state: import("immer/dist/internal").WritableDraft<WorkflowExecuteEditorState>, action: PayloadAction<any>) => {
        workflowMappingGridData: any;
        workflowMappingSelections: import("@mui/x-data-grid").GridRowId[];
        configurations: import("immer/dist/internal").WritableDraft<AgentIntegrationConfiguration>[];
        configurationByConfigurationId: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").ConfigurationByConfigurationId>;
        studioActionResult: string[];
        workflowsByConfigurations: import("immer/dist/internal").WritableDraft<WorkflowsByConfigurations>;
        dataMappingsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").DataMappingsByConfigurations>;
        dynamicDataMappingsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").DynamicDataMappingsByConfigurations>;
        selectedConfigurations: import("immer/dist/internal").WritableDraft<AgentIntegrationConfiguration>[];
        selectedActions: string[];
        actionsForDropdown: import("immer/dist/internal").WritableDraft<ActionForDropdown>[];
        initializing: boolean;
        workflowMappingGridMessage: string;
        open: boolean;
        loading: boolean;
        selection: any;
    };
    /**
     * Action to clear the workflow mapping grid data
     * @param state - CcfWorkflowExecuteEditorState
     * @param action - action.payload
     * @example - dispatch(clearWorkflowMappingGridData());
     * @returns - updated state
     */
    clearWorkflowMappingGridData: (state: import("immer/dist/internal").WritableDraft<WorkflowExecuteEditorState>) => {
        workflowMappingGridData: never[];
        workflowMappingSelections: import("@mui/x-data-grid").GridRowId[];
        configurations: import("immer/dist/internal").WritableDraft<AgentIntegrationConfiguration>[];
        configurationByConfigurationId: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").ConfigurationByConfigurationId>;
        studioActionResult: string[];
        workflowsByConfigurations: import("immer/dist/internal").WritableDraft<WorkflowsByConfigurations>;
        dataMappingsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").DataMappingsByConfigurations>;
        dynamicDataMappingsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").DynamicDataMappingsByConfigurations>;
        selectedConfigurations: import("immer/dist/internal").WritableDraft<AgentIntegrationConfiguration>[];
        selectedActions: string[];
        actionsForDropdown: import("immer/dist/internal").WritableDraft<ActionForDropdown>[];
        initializing: boolean;
        workflowMappingGridMessage: string;
        open: boolean;
        loading: boolean;
        selection: any;
    };
    /**
     * Action to set selected workflows
     * @param state - CcfWorkflowExecuteEditorState
     * @param action - action.payload
     * @example - dispatch(setWorkflowMappingSelections());
     * @returns - updated state
     */
    setWorkflowMappingSelections: (state: import("immer/dist/internal").WritableDraft<WorkflowExecuteEditorState>, action: PayloadAction<CcfGridSelectionModel>) => {
        workflowMappingSelections: import("@mui/x-data-grid").GridRowSelectionModel;
        configurations: import("immer/dist/internal").WritableDraft<AgentIntegrationConfiguration>[];
        configurationByConfigurationId: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").ConfigurationByConfigurationId>;
        studioActionResult: string[];
        workflowsByConfigurations: import("immer/dist/internal").WritableDraft<WorkflowsByConfigurations>;
        dataMappingsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").DataMappingsByConfigurations>;
        dynamicDataMappingsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").DynamicDataMappingsByConfigurations>;
        selectedConfigurations: import("immer/dist/internal").WritableDraft<AgentIntegrationConfiguration>[];
        selectedActions: string[];
        actionsForDropdown: import("immer/dist/internal").WritableDraft<ActionForDropdown>[];
        workflowMappingGridData: import("immer/dist/internal").WritableDraft<AgentWorkflowMappingGridData>[];
        initializing: boolean;
        workflowMappingGridMessage: string;
        open: boolean;
        loading: boolean;
        selection: any;
    };
    /**
     * Action to set workflow mapping grid message
     * @param state - CcfWorkflowExecuteEditorState
     * @param action - action.payload
     * @example - dispatch(setWorkflowMappingGridMessage());
     * @returns - updated state
     */
    setWorkflowMappingGridMessage: (state: import("immer/dist/internal").WritableDraft<WorkflowExecuteEditorState>, action: PayloadAction<any>) => {
        workflowMappingGridMessage: string;
        workflowMappingSelections: import("@mui/x-data-grid").GridRowId[];
        configurations: import("immer/dist/internal").WritableDraft<AgentIntegrationConfiguration>[];
        configurationByConfigurationId: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").ConfigurationByConfigurationId>;
        studioActionResult: string[];
        workflowsByConfigurations: import("immer/dist/internal").WritableDraft<WorkflowsByConfigurations>;
        dataMappingsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").DataMappingsByConfigurations>;
        dynamicDataMappingsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").DynamicDataMappingsByConfigurations>;
        selectedConfigurations: import("immer/dist/internal").WritableDraft<AgentIntegrationConfiguration>[];
        selectedActions: string[];
        actionsForDropdown: import("immer/dist/internal").WritableDraft<ActionForDropdown>[];
        workflowMappingGridData: import("immer/dist/internal").WritableDraft<AgentWorkflowMappingGridData>[];
        initializing: boolean;
        open: boolean;
        loading: boolean;
        selection: any;
    };
    /**
     * Action to reset the state.
     * @param state - CcfWorkflowExecuteEditorState
     * @param action - action.payload
     * @example - dispatch(setActionsForDropdown());
     * @returns - initial state
     */
    setActionsForDropdown: (state: import("immer/dist/internal").WritableDraft<WorkflowExecuteEditorState>) => {
        actionsForDropdown: ActionForDropdown[];
        workflowMappingSelections: import("@mui/x-data-grid").GridRowId[];
        configurations: import("immer/dist/internal").WritableDraft<AgentIntegrationConfiguration>[];
        configurationByConfigurationId: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").ConfigurationByConfigurationId>;
        studioActionResult: string[];
        workflowsByConfigurations: import("immer/dist/internal").WritableDraft<WorkflowsByConfigurations>;
        dataMappingsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").DataMappingsByConfigurations>;
        dynamicDataMappingsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").DynamicDataMappingsByConfigurations>;
        selectedConfigurations: import("immer/dist/internal").WritableDraft<AgentIntegrationConfiguration>[];
        selectedActions: string[];
        workflowMappingGridData: import("immer/dist/internal").WritableDraft<AgentWorkflowMappingGridData>[];
        initializing: boolean;
        workflowMappingGridMessage: string;
        open: boolean;
        loading: boolean;
        selection: any;
    };
    /**
     * Action to remove workflow agent action
     * @param state - CcfWorkflowExecuteEditorState
     * @param action - action.payload
     * @example - dispatch(removeSelectedWorkflowExecuteAction(workflowAction: ));
     * @returns - updated state
     */
    removeSelectedWorkflowExecuteAction: (state: import("immer/dist/internal").WritableDraft<WorkflowExecuteEditorState>, action: PayloadAction<string>) => {
        selectedActions: string[];
        workflowMappingSelections: import("@mui/x-data-grid").GridRowId[];
        configurations: import("immer/dist/internal").WritableDraft<AgentIntegrationConfiguration>[];
        configurationByConfigurationId: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").ConfigurationByConfigurationId>;
        studioActionResult: string[];
        workflowsByConfigurations: import("immer/dist/internal").WritableDraft<WorkflowsByConfigurations>;
        dataMappingsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").DataMappingsByConfigurations>;
        dynamicDataMappingsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").DynamicDataMappingsByConfigurations>;
        selectedConfigurations: import("immer/dist/internal").WritableDraft<AgentIntegrationConfiguration>[];
        actionsForDropdown: import("immer/dist/internal").WritableDraft<ActionForDropdown>[];
        workflowMappingGridData: import("immer/dist/internal").WritableDraft<AgentWorkflowMappingGridData>[];
        initializing: boolean;
        workflowMappingGridMessage: string;
        open: boolean;
        loading: boolean;
        selection: any;
    };
    /**
     * Action to set all selected agent actions
     * @param state - CcfWorkflowConfigEditorState
     * @param action - action.payload
     * @example - dispatch(setSelectedWorkflowExecuteActions());
     * @returns - updated state
     */
    setSelectedWorkflowExecuteActions: (state: import("immer/dist/internal").WritableDraft<WorkflowExecuteEditorState>, action: PayloadAction<string[]>) => {
        selectedActions: string[];
        workflowMappingSelections: import("@mui/x-data-grid").GridRowId[];
        configurations: import("immer/dist/internal").WritableDraft<AgentIntegrationConfiguration>[];
        configurationByConfigurationId: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").ConfigurationByConfigurationId>;
        studioActionResult: string[];
        workflowsByConfigurations: import("immer/dist/internal").WritableDraft<WorkflowsByConfigurations>;
        dataMappingsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").DataMappingsByConfigurations>;
        dynamicDataMappingsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").DynamicDataMappingsByConfigurations>;
        selectedConfigurations: import("immer/dist/internal").WritableDraft<AgentIntegrationConfiguration>[];
        actionsForDropdown: import("immer/dist/internal").WritableDraft<ActionForDropdown>[];
        workflowMappingGridData: import("immer/dist/internal").WritableDraft<AgentWorkflowMappingGridData>[];
        initializing: boolean;
        workflowMappingGridMessage: string;
        open: boolean;
        loading: boolean;
        selection: any;
    };
    /**
     * Action to clear selected workflows
     * @param state - CcfWorkflowExecuteEditorState
     * @param action - action.payload
     * @example - dispatch(clearWorkflowMappingSelections());
     * @returns - updated state
     */
    clearWorkflowMappingSelections: (state: import("immer/dist/internal").WritableDraft<WorkflowExecuteEditorState>) => {
        workflowMappingSelections: never[];
        configurations: import("immer/dist/internal").WritableDraft<AgentIntegrationConfiguration>[];
        configurationByConfigurationId: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").ConfigurationByConfigurationId>;
        studioActionResult: string[];
        workflowsByConfigurations: import("immer/dist/internal").WritableDraft<WorkflowsByConfigurations>;
        dataMappingsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").DataMappingsByConfigurations>;
        dynamicDataMappingsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").DynamicDataMappingsByConfigurations>;
        selectedConfigurations: import("immer/dist/internal").WritableDraft<AgentIntegrationConfiguration>[];
        selectedActions: string[];
        actionsForDropdown: import("immer/dist/internal").WritableDraft<ActionForDropdown>[];
        workflowMappingGridData: import("immer/dist/internal").WritableDraft<AgentWorkflowMappingGridData>[];
        initializing: boolean;
        workflowMappingGridMessage: string;
        open: boolean;
        loading: boolean;
        selection: any;
    };
    /**
     * Action to reset the state.
     * @param state - CcfWorkflowExecuteEditorState
     * @param action - action.payload
     * @example - dispatch(resetToInitialState());
     * @returns - initial state
     */
    resetToInitialState: () => WorkflowExecuteEditorState;
    /**
     * Action to set initializing state.
     * @param state - CcfWorkflowExecuteEditorState
     * @example - dispatch(setInitializing(true));
     * @returns - state
     */
    setInitializing: (state: import("immer/dist/internal").WritableDraft<WorkflowExecuteEditorState>, action: PayloadAction<boolean>) => {
        initializing: boolean;
        workflowMappingSelections: import("@mui/x-data-grid").GridRowId[];
        configurations: import("immer/dist/internal").WritableDraft<AgentIntegrationConfiguration>[];
        configurationByConfigurationId: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").ConfigurationByConfigurationId>;
        studioActionResult: string[];
        workflowsByConfigurations: import("immer/dist/internal").WritableDraft<WorkflowsByConfigurations>;
        dataMappingsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").DataMappingsByConfigurations>;
        dynamicDataMappingsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").DynamicDataMappingsByConfigurations>;
        selectedConfigurations: import("immer/dist/internal").WritableDraft<AgentIntegrationConfiguration>[];
        selectedActions: string[];
        actionsForDropdown: import("immer/dist/internal").WritableDraft<ActionForDropdown>[];
        workflowMappingGridData: import("immer/dist/internal").WritableDraft<AgentWorkflowMappingGridData>[];
        workflowMappingGridMessage: string;
        open: boolean;
        loading: boolean;
        selection: any;
    };
    /**
     * Action to set the opened state.
     * @param state - CcfWorkflowExecuteEditorState
     * @example - dispatch(setInitializing(true));
     * @returns - state
     */
    setOpen: (state: import("immer/dist/internal").WritableDraft<WorkflowExecuteEditorState>, action: PayloadAction<boolean>) => {
        open: boolean;
        workflowMappingSelections: import("@mui/x-data-grid").GridRowId[];
        configurations: import("immer/dist/internal").WritableDraft<AgentIntegrationConfiguration>[];
        configurationByConfigurationId: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").ConfigurationByConfigurationId>;
        studioActionResult: string[];
        workflowsByConfigurations: import("immer/dist/internal").WritableDraft<WorkflowsByConfigurations>;
        dataMappingsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").DataMappingsByConfigurations>;
        dynamicDataMappingsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").DynamicDataMappingsByConfigurations>;
        selectedConfigurations: import("immer/dist/internal").WritableDraft<AgentIntegrationConfiguration>[];
        selectedActions: string[];
        actionsForDropdown: import("immer/dist/internal").WritableDraft<ActionForDropdown>[];
        workflowMappingGridData: import("immer/dist/internal").WritableDraft<AgentWorkflowMappingGridData>[];
        initializing: boolean;
        workflowMappingGridMessage: string;
        loading: boolean;
        selection: any;
    };
    /**
     * Action to set the loading state.
     * @param state - CcfWorkflowExecuteEditorState
     * @example - dispatch(setInitializing(true));
     * @returns - state
     */
    setLoading: (state: import("immer/dist/internal").WritableDraft<WorkflowExecuteEditorState>, action: PayloadAction<boolean>) => {
        loading: boolean;
        workflowMappingSelections: import("@mui/x-data-grid").GridRowId[];
        configurations: import("immer/dist/internal").WritableDraft<AgentIntegrationConfiguration>[];
        configurationByConfigurationId: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").ConfigurationByConfigurationId>;
        studioActionResult: string[];
        workflowsByConfigurations: import("immer/dist/internal").WritableDraft<WorkflowsByConfigurations>;
        dataMappingsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").DataMappingsByConfigurations>;
        dynamicDataMappingsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").DynamicDataMappingsByConfigurations>;
        selectedConfigurations: import("immer/dist/internal").WritableDraft<AgentIntegrationConfiguration>[];
        selectedActions: string[];
        actionsForDropdown: import("immer/dist/internal").WritableDraft<ActionForDropdown>[];
        workflowMappingGridData: import("immer/dist/internal").WritableDraft<AgentWorkflowMappingGridData>[];
        initializing: boolean;
        workflowMappingGridMessage: string;
        open: boolean;
        selection: any;
    };
    /**
     * Action to set grid selection.
     * @param state - CcfWorkflowExecuteEditorState
     * @example - dispatch(setSelection());
     * @returns - state
     */
    setSelection: (state: import("immer/dist/internal").WritableDraft<WorkflowExecuteEditorState>) => {
        selection: {};
        workflowMappingSelections: import("@mui/x-data-grid").GridRowId[];
        configurations: import("immer/dist/internal").WritableDraft<AgentIntegrationConfiguration>[];
        configurationByConfigurationId: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").ConfigurationByConfigurationId>;
        studioActionResult: string[];
        workflowsByConfigurations: import("immer/dist/internal").WritableDraft<WorkflowsByConfigurations>;
        dataMappingsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").DataMappingsByConfigurations>;
        dynamicDataMappingsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").DynamicDataMappingsByConfigurations>;
        selectedConfigurations: import("immer/dist/internal").WritableDraft<AgentIntegrationConfiguration>[];
        selectedActions: string[];
        actionsForDropdown: import("immer/dist/internal").WritableDraft<ActionForDropdown>[];
        workflowMappingGridData: import("immer/dist/internal").WritableDraft<AgentWorkflowMappingGridData>[];
        initializing: boolean;
        workflowMappingGridMessage: string;
        open: boolean;
        loading: boolean;
    };
}, string>;
export declare const getConfigurations: ((state: WorkflowExecuteRootState) => AgentIntegrationConfiguration[]) & import("reselect").OutputSelectorFields<(args_0: WorkflowExecuteEditorState) => AgentIntegrationConfiguration[] & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const getConfigurationByConfigurationId: ((state: WorkflowExecuteRootState) => import("@nice-devone/shared-apps-lib").ConfigurationByConfigurationId) & import("reselect").OutputSelectorFields<(args_0: WorkflowExecuteEditorState) => import("@nice-devone/shared-apps-lib").ConfigurationByConfigurationId & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const getSelectedConfigurations: ((state: WorkflowExecuteRootState) => AgentIntegrationConfiguration[]) & import("reselect").OutputSelectorFields<(args_0: WorkflowExecuteEditorState) => AgentIntegrationConfiguration[] & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const getSelectedActions: ((state: WorkflowExecuteRootState) => string[]) & import("reselect").OutputSelectorFields<(args_0: WorkflowExecuteEditorState) => string[] & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const getWorkflowsByConfigurations: ((state: WorkflowExecuteRootState) => WorkflowsByConfigurations) & import("reselect").OutputSelectorFields<(args_0: WorkflowExecuteEditorState) => WorkflowsByConfigurations & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const getDynamicDataMappingsByConfigurations: ((state: WorkflowExecuteRootState) => import("@nice-devone/shared-apps-lib").DynamicDataMappingsByConfigurations) & import("reselect").OutputSelectorFields<(args_0: WorkflowExecuteEditorState) => import("@nice-devone/shared-apps-lib").DynamicDataMappingsByConfigurations & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const getWorkflowMappingSelections: ((state: WorkflowExecuteRootState) => import("@mui/x-data-grid").GridRowSelectionModel) & import("reselect").OutputSelectorFields<(args_0: WorkflowExecuteEditorState) => import("@mui/x-data-grid").GridRowSelectionModel & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const getActionsForDropdown: ((state: WorkflowExecuteRootState) => ActionForDropdown[]) & import("reselect").OutputSelectorFields<(args_0: WorkflowExecuteEditorState) => ActionForDropdown[] & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const getWorkflowMappingGridData: ((state: WorkflowExecuteRootState) => AgentWorkflowMappingGridData[]) & import("reselect").OutputSelectorFields<(args_0: WorkflowExecuteEditorState) => AgentWorkflowMappingGridData[] & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const getInitializing: ((state: WorkflowExecuteRootState) => boolean) & import("reselect").OutputSelectorFields<(args_0: WorkflowExecuteEditorState) => boolean & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const getWorkflowMappingGridMessage: ((state: WorkflowExecuteRootState) => string) & import("reselect").OutputSelectorFields<(args_0: WorkflowExecuteEditorState) => string & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const getOpen: ((state: WorkflowExecuteRootState) => boolean) & import("reselect").OutputSelectorFields<(args_0: WorkflowExecuteEditorState) => boolean & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const getLoading: ((state: WorkflowExecuteRootState) => boolean) & import("reselect").OutputSelectorFields<(args_0: WorkflowExecuteEditorState) => boolean & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const getSelection: ((state: WorkflowExecuteRootState) => any) & import("reselect").OutputSelectorFields<(args_0: WorkflowExecuteEditorState) => any> & {
    clearCache: () => void;
};
export * as thunks from './thunks';
