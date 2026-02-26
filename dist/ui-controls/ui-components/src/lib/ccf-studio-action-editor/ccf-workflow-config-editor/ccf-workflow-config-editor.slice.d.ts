import { PayloadAction } from '@reduxjs/toolkit';
import { AgentIntegrationConfigurationResult, AgentIntegrationDataMapping, AgentIntegrationConfiguration, AgentIntegrationDynamicDataMapping, CcfActionEditorSlice, ActionForDropdown } from '@nice-devone/shared-apps-lib';
import { CcfGridSelectionModel } from '@nice-devone/ui-controls';
export declare const WORKFLOW_CONFIG_EDITOR_SLICE_KEY = "workflowConfigEditorSlice";
export declare const WORKFLOW_CONFIG_ACTIONS: {
    TIMELINE: string;
    DATA_MEMORIALIZATION: string;
    SEARCH: string;
    DYNAMIC_DATA: string;
};
/**
 * This interface is the structure for the decoded parameters provided by the workflow configuration studio action.
 */
export interface WorkflowConfigActionParameters {
    /**
     * @remarks  searchWorkflow
     */
    searchWorkflow?: {
        configurationId: string;
        workflowId: string;
    };
    /**
     * @remarks  timelineWorkflow
     */
    timelineWorkflow?: {
        configurationId: string;
        workflowId: string;
    };
    /**
     * @remarks  dataMemorializationWorklfow
     */
    dataMemorializationWorkflow?: {
        configurationId: string;
        workflowId: string;
        workflowParam: {
            dataMappingId: string;
        };
    };
}
export interface WorkflowConfigEditorState extends CcfActionEditorSlice {
    workflowMappingSelections: CcfGridSelectionModel;
    studioDataInput: WorkflowConfigActionParameters;
}
/**
 * This interface is the structure for root state.
 */
export interface WorkflowConfigRootState {
    workflowConfigEditorSlice: WorkflowConfigEditorState;
}
export declare const initialCcfWorkflowConfigEditorState: WorkflowConfigEditorState;
export interface WorkflowConfigStudioDataInput {
    searchWorkflow?: string;
    timelineWorkflow?: string;
    dataMemorializationWorkflow?: string;
}
export declare const workflowConfigEditorSlice: import("@reduxjs/toolkit").Slice<WorkflowConfigEditorState, {
    /**
     * Action to set configurations
     * @param state - WorkflowConfigEditorState
     * @param action - action.payload
     * @example - dispatch(setConfigurations());
     * @returns - updated state
     */
    setConfigurations(state: import("immer/dist/internal").WritableDraft<WorkflowConfigEditorState>, action: PayloadAction<AgentIntegrationConfigurationResult>): {
        configurations: AgentIntegrationConfiguration[];
        configurationByConfigurationId: any;
        workflowMappingSelections: import("@mui/x-data-grid").GridRowId[];
        studioDataInput: import("immer/dist/internal").WritableDraft<WorkflowConfigActionParameters>;
        studioActionResult: string[];
        workflowsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").WorkflowsByConfigurations>;
        dataMappingsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").DataMappingsByConfigurations>;
        dynamicDataMappingsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").DynamicDataMappingsByConfigurations>;
        selectedConfigurations: import("immer/dist/internal").WritableDraft<AgentIntegrationConfiguration>[];
        selectedActions: string[];
        actionsForDropdown: import("immer/dist/internal").WritableDraft<ActionForDropdown>[];
        workflowMappingGridData: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").AgentWorkflowMappingGridData>[];
        initializing: boolean;
        workflowMappingGridMessage: string;
        open: boolean;
        loading: boolean;
        selection: any;
    };
    /**
     * Action to set workflows
     * @param state - WorkflowConfigEditorState
     * @param action - action.payload
     * @example - dispatch(setWorkflows());
     * @returns - updated state
     */
    setWorkflows: (state: import("immer/dist/internal").WritableDraft<WorkflowConfigEditorState>, action: PayloadAction<any>) => {
        workflowsByConfigurations: {
            [x: string]: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").AgentIntegrationWorkflow>[];
        };
        workflowMappingSelections: import("@mui/x-data-grid").GridRowId[];
        studioDataInput: import("immer/dist/internal").WritableDraft<WorkflowConfigActionParameters>;
        configurations: import("immer/dist/internal").WritableDraft<AgentIntegrationConfiguration>[];
        configurationByConfigurationId: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").ConfigurationByConfigurationId>;
        studioActionResult: string[];
        dataMappingsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").DataMappingsByConfigurations>;
        dynamicDataMappingsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").DynamicDataMappingsByConfigurations>;
        selectedConfigurations: import("immer/dist/internal").WritableDraft<AgentIntegrationConfiguration>[];
        selectedActions: string[];
        actionsForDropdown: import("immer/dist/internal").WritableDraft<ActionForDropdown>[];
        workflowMappingGridData: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").AgentWorkflowMappingGridData>[];
        initializing: boolean;
        workflowMappingGridMessage: string;
        open: boolean;
        loading: boolean;
        selection: any;
    };
    /**
     * Action to set setDataMappings
     * @param state - WorkflowConfigEditorState
     * @param action - action.payload
     * @example - dispatch(setDataMappings());
     * @returns - updated state
     */
    setDataMappings: (state: import("immer/dist/internal").WritableDraft<WorkflowConfigEditorState>, action: PayloadAction<any>) => {
        dataMappingsByConfigurations: {
            [x: string]: import("immer/dist/internal").WritableDraft<AgentIntegrationDataMapping>[];
        };
        workflowMappingSelections: import("@mui/x-data-grid").GridRowId[];
        studioDataInput: import("immer/dist/internal").WritableDraft<WorkflowConfigActionParameters>;
        configurations: import("immer/dist/internal").WritableDraft<AgentIntegrationConfiguration>[];
        configurationByConfigurationId: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").ConfigurationByConfigurationId>;
        studioActionResult: string[];
        workflowsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").WorkflowsByConfigurations>;
        dynamicDataMappingsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").DynamicDataMappingsByConfigurations>;
        selectedConfigurations: import("immer/dist/internal").WritableDraft<AgentIntegrationConfiguration>[];
        selectedActions: string[];
        actionsForDropdown: import("immer/dist/internal").WritableDraft<ActionForDropdown>[];
        workflowMappingGridData: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").AgentWorkflowMappingGridData>[];
        initializing: boolean;
        workflowMappingGridMessage: string;
        open: boolean;
        loading: boolean;
        selection: any;
    };
    /**
     * Action to set setDynamicDataMappings
     * @param state - WorkflowConfigEditorState
     * @param action - action.payload
     * @example - dispatch(setDynamicDataMappings());
     * @returns - updated state
     */
    setDynamicDataMappings: (state: import("immer/dist/internal").WritableDraft<WorkflowConfigEditorState>, action: PayloadAction<any>) => {
        dynamicDataMappingsByConfigurations: {
            [x: string]: import("immer/dist/internal").WritableDraft<AgentIntegrationDynamicDataMapping>[];
        };
        workflowMappingSelections: import("@mui/x-data-grid").GridRowId[];
        studioDataInput: import("immer/dist/internal").WritableDraft<WorkflowConfigActionParameters>;
        configurations: import("immer/dist/internal").WritableDraft<AgentIntegrationConfiguration>[];
        configurationByConfigurationId: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").ConfigurationByConfigurationId>;
        studioActionResult: string[];
        workflowsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").WorkflowsByConfigurations>;
        dataMappingsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").DataMappingsByConfigurations>;
        selectedConfigurations: import("immer/dist/internal").WritableDraft<AgentIntegrationConfiguration>[];
        selectedActions: string[];
        actionsForDropdown: import("immer/dist/internal").WritableDraft<ActionForDropdown>[];
        workflowMappingGridData: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").AgentWorkflowMappingGridData>[];
        initializing: boolean;
        workflowMappingGridMessage: string;
        open: boolean;
        loading: boolean;
        selection: any;
    };
    /**
     * Action to remove configuration
     * @param state - WorkflowConfigEditorState
     * @param action - action.payload
     * @example - dispatch(removeSelectedAgentConfiguration(configuration: Configuration));
     * @returns - updated state
     */
    removeSelectedAgentConfiguration: (state: import("immer/dist/internal").WritableDraft<WorkflowConfigEditorState>, action: PayloadAction<AgentIntegrationConfiguration>) => {
        selectedConfigurations: import("immer/dist/internal").WritableDraft<AgentIntegrationConfiguration>[];
        workflowMappingSelections: import("@mui/x-data-grid").GridRowId[];
        studioDataInput: import("immer/dist/internal").WritableDraft<WorkflowConfigActionParameters>;
        configurations: import("immer/dist/internal").WritableDraft<AgentIntegrationConfiguration>[];
        configurationByConfigurationId: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").ConfigurationByConfigurationId>;
        studioActionResult: string[];
        workflowsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").WorkflowsByConfigurations>;
        dataMappingsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").DataMappingsByConfigurations>;
        dynamicDataMappingsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").DynamicDataMappingsByConfigurations>;
        selectedActions: string[];
        actionsForDropdown: import("immer/dist/internal").WritableDraft<ActionForDropdown>[];
        workflowMappingGridData: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").AgentWorkflowMappingGridData>[];
        initializing: boolean;
        workflowMappingGridMessage: string;
        open: boolean;
        loading: boolean;
        selection: any;
    };
    /**
     * Action to set set Selected AgentConfigurations
     * @param state - WorkflowConfigEditorState
     * @param action - action.payload
     * @example - dispatch(setSelectedAgentConfigurations([configurationId_1, configurationId_2, ...]));
     * @returns - updated state
     */
    setSelectedAgentConfigurations: (state: import("immer/dist/internal").WritableDraft<WorkflowConfigEditorState>, action: PayloadAction<AgentIntegrationConfiguration[]>) => {
        selectedConfigurations: AgentIntegrationConfiguration[];
        workflowMappingSelections: import("@mui/x-data-grid").GridRowId[];
        studioDataInput: import("immer/dist/internal").WritableDraft<WorkflowConfigActionParameters>;
        configurations: import("immer/dist/internal").WritableDraft<AgentIntegrationConfiguration>[];
        configurationByConfigurationId: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").ConfigurationByConfigurationId>;
        studioActionResult: string[];
        workflowsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").WorkflowsByConfigurations>;
        dataMappingsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").DataMappingsByConfigurations>;
        dynamicDataMappingsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").DynamicDataMappingsByConfigurations>;
        selectedActions: string[];
        actionsForDropdown: import("immer/dist/internal").WritableDraft<ActionForDropdown>[];
        workflowMappingGridData: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").AgentWorkflowMappingGridData>[];
        initializing: boolean;
        workflowMappingGridMessage: string;
        open: boolean;
        loading: boolean;
        selection: any;
    };
    /**
     * Action to clear all selected configurations from state
     * @param state - WorkflowConfigEditorState
     * @param action - action.payload
     * @example - dispatch(setCurrentWorkflowData('search'));
     * @returns - updated state
     */
    clearSelectedAgentConfigurations: (state: import("immer/dist/internal").WritableDraft<WorkflowConfigEditorState>) => {
        selectedConfigurations: never[];
        workflowMappingSelections: import("@mui/x-data-grid").GridRowId[];
        studioDataInput: import("immer/dist/internal").WritableDraft<WorkflowConfigActionParameters>;
        configurations: import("immer/dist/internal").WritableDraft<AgentIntegrationConfiguration>[];
        configurationByConfigurationId: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").ConfigurationByConfigurationId>;
        studioActionResult: string[];
        workflowsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").WorkflowsByConfigurations>;
        dataMappingsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").DataMappingsByConfigurations>;
        dynamicDataMappingsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").DynamicDataMappingsByConfigurations>;
        selectedActions: string[];
        actionsForDropdown: import("immer/dist/internal").WritableDraft<ActionForDropdown>[];
        workflowMappingGridData: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").AgentWorkflowMappingGridData>[];
        initializing: boolean;
        workflowMappingGridMessage: string;
        open: boolean;
        loading: boolean;
        selection: any;
    };
    /**
     * Action to remove agent action
     * @param state - WorkflowConfigEditorState
     * @param action - action.payload
     * @example - dispatch(removeSelectedAgentAction(workflowAction: ));
     * @returns - updated state
     */
    removeSelectedAgentAction: (state: import("immer/dist/internal").WritableDraft<WorkflowConfigEditorState>, action: PayloadAction<string>) => {
        selectedActions: string[];
        workflowMappingSelections: import("@mui/x-data-grid").GridRowId[];
        studioDataInput: import("immer/dist/internal").WritableDraft<WorkflowConfigActionParameters>;
        configurations: import("immer/dist/internal").WritableDraft<AgentIntegrationConfiguration>[];
        configurationByConfigurationId: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").ConfigurationByConfigurationId>;
        studioActionResult: string[];
        workflowsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").WorkflowsByConfigurations>;
        dataMappingsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").DataMappingsByConfigurations>;
        dynamicDataMappingsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").DynamicDataMappingsByConfigurations>;
        selectedConfigurations: import("immer/dist/internal").WritableDraft<AgentIntegrationConfiguration>[];
        actionsForDropdown: import("immer/dist/internal").WritableDraft<ActionForDropdown>[];
        workflowMappingGridData: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").AgentWorkflowMappingGridData>[];
        initializing: boolean;
        workflowMappingGridMessage: string;
        open: boolean;
        loading: boolean;
        selection: any;
    };
    /**
     * Action to set all selected agent actions
     * @param state - WorkflowConfigEditorState
     * @param action - action.payload
     * @example - dispatch(setSelectedAgentActions());
     * @returns - updated state
     */
    setSelectedAgentActions: (state: import("immer/dist/internal").WritableDraft<WorkflowConfigEditorState>, action: PayloadAction<string[]>) => {
        selectedActions: string[];
        workflowMappingSelections: import("@mui/x-data-grid").GridRowId[];
        studioDataInput: import("immer/dist/internal").WritableDraft<WorkflowConfigActionParameters>;
        configurations: import("immer/dist/internal").WritableDraft<AgentIntegrationConfiguration>[];
        configurationByConfigurationId: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").ConfigurationByConfigurationId>;
        studioActionResult: string[];
        workflowsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").WorkflowsByConfigurations>;
        dataMappingsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").DataMappingsByConfigurations>;
        dynamicDataMappingsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").DynamicDataMappingsByConfigurations>;
        selectedConfigurations: import("immer/dist/internal").WritableDraft<AgentIntegrationConfiguration>[];
        actionsForDropdown: import("immer/dist/internal").WritableDraft<ActionForDropdown>[];
        workflowMappingGridData: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").AgentWorkflowMappingGridData>[];
        initializing: boolean;
        workflowMappingGridMessage: string;
        open: boolean;
        loading: boolean;
        selection: any;
    };
    /**
     * Action to clear all selected agent actions from state
     * @param state - WorkflowConfigEditorState
     * @param action - action.payload
     * @example - dispatch(clearSelectedAgentActions());
     * @returns - updated state
     */
    clearSelectedAgentActions: (state: import("immer/dist/internal").WritableDraft<WorkflowConfigEditorState>) => {
        selectedActions: never[];
        workflowMappingSelections: import("@mui/x-data-grid").GridRowId[];
        studioDataInput: import("immer/dist/internal").WritableDraft<WorkflowConfigActionParameters>;
        configurations: import("immer/dist/internal").WritableDraft<AgentIntegrationConfiguration>[];
        configurationByConfigurationId: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").ConfigurationByConfigurationId>;
        studioActionResult: string[];
        workflowsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").WorkflowsByConfigurations>;
        dataMappingsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").DataMappingsByConfigurations>;
        dynamicDataMappingsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").DynamicDataMappingsByConfigurations>;
        selectedConfigurations: import("immer/dist/internal").WritableDraft<AgentIntegrationConfiguration>[];
        actionsForDropdown: import("immer/dist/internal").WritableDraft<ActionForDropdown>[];
        workflowMappingGridData: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").AgentWorkflowMappingGridData>[];
        initializing: boolean;
        workflowMappingGridMessage: string;
        open: boolean;
        loading: boolean;
        selection: any;
    };
    /**
     * Action to set data for workflow mapping grid
     * @param state - WorkflowConfigEditorState
     * @param action - action.payload
     * @example - dispatch(setWorkflowMappingGridData());
     * @returns - updated state
     */
    setWorkflowMappingGridData: (state: import("immer/dist/internal").WritableDraft<WorkflowConfigEditorState>, action: PayloadAction<any>) => {
        workflowMappingGridData: any;
        workflowMappingSelections: import("@mui/x-data-grid").GridRowId[];
        studioDataInput: import("immer/dist/internal").WritableDraft<WorkflowConfigActionParameters>;
        configurations: import("immer/dist/internal").WritableDraft<AgentIntegrationConfiguration>[];
        configurationByConfigurationId: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").ConfigurationByConfigurationId>;
        studioActionResult: string[];
        workflowsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").WorkflowsByConfigurations>;
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
     * @param state - WorkflowConfigEditorState
     * @param action - action.payload
     * @example - dispatch(clearWorkflowMappingGridData());
     * @returns - updated state
     */
    clearWorkflowMappingGridData: (state: import("immer/dist/internal").WritableDraft<WorkflowConfigEditorState>) => {
        workflowMappingGridData: never[];
        workflowMappingSelections: import("@mui/x-data-grid").GridRowId[];
        studioDataInput: import("immer/dist/internal").WritableDraft<WorkflowConfigActionParameters>;
        configurations: import("immer/dist/internal").WritableDraft<AgentIntegrationConfiguration>[];
        configurationByConfigurationId: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").ConfigurationByConfigurationId>;
        studioActionResult: string[];
        workflowsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").WorkflowsByConfigurations>;
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
     * @param state - WorkflowConfigEditorState
     * @param action - action.payload
     * @example - dispatch(setWorkflowMappingSelections());
     * @returns - updated state
     */
    setWorkflowMappingSelections: (state: import("immer/dist/internal").WritableDraft<WorkflowConfigEditorState>, action: PayloadAction<CcfGridSelectionModel>) => {
        workflowMappingSelections: import("@mui/x-data-grid").GridRowSelectionModel;
        studioDataInput: import("immer/dist/internal").WritableDraft<WorkflowConfigActionParameters>;
        configurations: import("immer/dist/internal").WritableDraft<AgentIntegrationConfiguration>[];
        configurationByConfigurationId: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").ConfigurationByConfigurationId>;
        studioActionResult: string[];
        workflowsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").WorkflowsByConfigurations>;
        dataMappingsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").DataMappingsByConfigurations>;
        dynamicDataMappingsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").DynamicDataMappingsByConfigurations>;
        selectedConfigurations: import("immer/dist/internal").WritableDraft<AgentIntegrationConfiguration>[];
        selectedActions: string[];
        actionsForDropdown: import("immer/dist/internal").WritableDraft<ActionForDropdown>[];
        workflowMappingGridData: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").AgentWorkflowMappingGridData>[];
        initializing: boolean;
        workflowMappingGridMessage: string;
        open: boolean;
        loading: boolean;
        selection: any;
    };
    /**
     * Action to set workflow mapping grid message
     * @param state - WorkflowConfigEditorState
     * @param action - action.payload
     * @example - dispatch(setWorkflowMappingGridMessage());
     * @returns - updated state
     */
    setWorkflowMappingGridMessage: (state: import("immer/dist/internal").WritableDraft<WorkflowConfigEditorState>, action: PayloadAction<any>) => {
        workflowMappingGridMessage: string;
        workflowMappingSelections: import("@mui/x-data-grid").GridRowId[];
        studioDataInput: import("immer/dist/internal").WritableDraft<WorkflowConfigActionParameters>;
        configurations: import("immer/dist/internal").WritableDraft<AgentIntegrationConfiguration>[];
        configurationByConfigurationId: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").ConfigurationByConfigurationId>;
        studioActionResult: string[];
        workflowsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").WorkflowsByConfigurations>;
        dataMappingsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").DataMappingsByConfigurations>;
        dynamicDataMappingsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").DynamicDataMappingsByConfigurations>;
        selectedConfigurations: import("immer/dist/internal").WritableDraft<AgentIntegrationConfiguration>[];
        selectedActions: string[];
        actionsForDropdown: import("immer/dist/internal").WritableDraft<ActionForDropdown>[];
        workflowMappingGridData: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").AgentWorkflowMappingGridData>[];
        initializing: boolean;
        open: boolean;
        loading: boolean;
        selection: any;
    };
    /**
     * Action to clear selected workflows
     * @param state - WorkflowConfigEditorState
     * @param action - action.payload
     * @example - dispatch(clearWorkflowMappingSelections());
     * @returns - updated state
     */
    clearWorkflowMappingSelections: (state: import("immer/dist/internal").WritableDraft<WorkflowConfigEditorState>) => {
        workflowMappingSelections: never[];
        studioDataInput: import("immer/dist/internal").WritableDraft<WorkflowConfigActionParameters>;
        configurations: import("immer/dist/internal").WritableDraft<AgentIntegrationConfiguration>[];
        configurationByConfigurationId: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").ConfigurationByConfigurationId>;
        studioActionResult: string[];
        workflowsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").WorkflowsByConfigurations>;
        dataMappingsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").DataMappingsByConfigurations>;
        dynamicDataMappingsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").DynamicDataMappingsByConfigurations>;
        selectedConfigurations: import("immer/dist/internal").WritableDraft<AgentIntegrationConfiguration>[];
        selectedActions: string[];
        actionsForDropdown: import("immer/dist/internal").WritableDraft<ActionForDropdown>[];
        workflowMappingGridData: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").AgentWorkflowMappingGridData>[];
        initializing: boolean;
        workflowMappingGridMessage: string;
        open: boolean;
        loading: boolean;
        selection: any;
    };
    /**
     * Action to reset the state.
     * @param state - WorkflowConfigEditorState
     * @param action - action.payload
     * @example - dispatch(setActionsForDropdown());
     * @returns - initial state
     */
    setActionsForDropdown: (state: import("immer/dist/internal").WritableDraft<WorkflowConfigEditorState>) => {
        actionsForDropdown: ActionForDropdown[];
        workflowMappingSelections: import("@mui/x-data-grid").GridRowId[];
        studioDataInput: import("immer/dist/internal").WritableDraft<WorkflowConfigActionParameters>;
        configurations: import("immer/dist/internal").WritableDraft<AgentIntegrationConfiguration>[];
        configurationByConfigurationId: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").ConfigurationByConfigurationId>;
        studioActionResult: string[];
        workflowsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").WorkflowsByConfigurations>;
        dataMappingsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").DataMappingsByConfigurations>;
        dynamicDataMappingsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").DynamicDataMappingsByConfigurations>;
        selectedConfigurations: import("immer/dist/internal").WritableDraft<AgentIntegrationConfiguration>[];
        selectedActions: string[];
        workflowMappingGridData: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").AgentWorkflowMappingGridData>[];
        initializing: boolean;
        workflowMappingGridMessage: string;
        open: boolean;
        loading: boolean;
        selection: any;
    };
    /**
     * Action to set studioDataInput state.
     * @param state - WorkflowConfigEditorState
     * @example - dispatch(setStudioDataInput(studioDataInput));
     * @returns - state
     */
    setStudioDataInput: (state: import("immer/dist/internal").WritableDraft<WorkflowConfigEditorState>, action: PayloadAction<WorkflowConfigActionParameters>) => {
        studioDataInput: WorkflowConfigActionParameters;
        workflowMappingSelections: import("@mui/x-data-grid").GridRowId[];
        configurations: import("immer/dist/internal").WritableDraft<AgentIntegrationConfiguration>[];
        configurationByConfigurationId: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").ConfigurationByConfigurationId>;
        studioActionResult: string[];
        workflowsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").WorkflowsByConfigurations>;
        dataMappingsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").DataMappingsByConfigurations>;
        dynamicDataMappingsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").DynamicDataMappingsByConfigurations>;
        selectedConfigurations: import("immer/dist/internal").WritableDraft<AgentIntegrationConfiguration>[];
        selectedActions: string[];
        actionsForDropdown: import("immer/dist/internal").WritableDraft<ActionForDropdown>[];
        workflowMappingGridData: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").AgentWorkflowMappingGridData>[];
        initializing: boolean;
        workflowMappingGridMessage: string;
        open: boolean;
        loading: boolean;
        selection: any;
    };
    /**
     * Action to set initializing state.
     * @param state - WorkflowConfigEditorState
     * @example - dispatch(setInitializing(true));
     * @returns - state
     */
    setInitializing: (state: import("immer/dist/internal").WritableDraft<WorkflowConfigEditorState>, action: PayloadAction<boolean>) => {
        initializing: boolean;
        workflowMappingSelections: import("@mui/x-data-grid").GridRowId[];
        studioDataInput: import("immer/dist/internal").WritableDraft<WorkflowConfigActionParameters>;
        configurations: import("immer/dist/internal").WritableDraft<AgentIntegrationConfiguration>[];
        configurationByConfigurationId: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").ConfigurationByConfigurationId>;
        studioActionResult: string[];
        workflowsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").WorkflowsByConfigurations>;
        dataMappingsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").DataMappingsByConfigurations>;
        dynamicDataMappingsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").DynamicDataMappingsByConfigurations>;
        selectedConfigurations: import("immer/dist/internal").WritableDraft<AgentIntegrationConfiguration>[];
        selectedActions: string[];
        actionsForDropdown: import("immer/dist/internal").WritableDraft<ActionForDropdown>[];
        workflowMappingGridData: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").AgentWorkflowMappingGridData>[];
        workflowMappingGridMessage: string;
        open: boolean;
        loading: boolean;
        selection: any;
    };
    /**
     * Action to set isCCFGridLoading state.
     * @param state - WorkflowConfigEditorState
     * @example - dispatch(setIsCCFGridLoading(true));
     * @returns - state
     */
    setIsCCFGridLoading: (state: import("immer/dist/internal").WritableDraft<WorkflowConfigEditorState>, action: PayloadAction<boolean>) => {
        isCCFGridLoading: boolean;
        workflowMappingSelections: import("@mui/x-data-grid").GridRowId[];
        studioDataInput: import("immer/dist/internal").WritableDraft<WorkflowConfigActionParameters>;
        configurations: import("immer/dist/internal").WritableDraft<AgentIntegrationConfiguration>[];
        configurationByConfigurationId: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").ConfigurationByConfigurationId>;
        studioActionResult: string[];
        workflowsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").WorkflowsByConfigurations>;
        dataMappingsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").DataMappingsByConfigurations>;
        dynamicDataMappingsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").DynamicDataMappingsByConfigurations>;
        selectedConfigurations: import("immer/dist/internal").WritableDraft<AgentIntegrationConfiguration>[];
        selectedActions: string[];
        actionsForDropdown: import("immer/dist/internal").WritableDraft<ActionForDropdown>[];
        workflowMappingGridData: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").AgentWorkflowMappingGridData>[];
        initializing: boolean;
        workflowMappingGridMessage: string;
        open: boolean;
        loading: boolean;
        selection: any;
    };
}, "workflowConfigEditorSlice">;
export declare const CcfWorkflowConfigEditorReducer: import("redux").Reducer<WorkflowConfigEditorState, import("redux").AnyAction>;
export declare const CcfWorkflowConfigEditorActions: import("@reduxjs/toolkit").CaseReducerActions<{
    /**
     * Action to set configurations
     * @param state - WorkflowConfigEditorState
     * @param action - action.payload
     * @example - dispatch(setConfigurations());
     * @returns - updated state
     */
    setConfigurations(state: import("immer/dist/internal").WritableDraft<WorkflowConfigEditorState>, action: PayloadAction<AgentIntegrationConfigurationResult>): {
        configurations: AgentIntegrationConfiguration[];
        configurationByConfigurationId: any;
        workflowMappingSelections: import("@mui/x-data-grid").GridRowId[];
        studioDataInput: import("immer/dist/internal").WritableDraft<WorkflowConfigActionParameters>;
        studioActionResult: string[];
        workflowsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").WorkflowsByConfigurations>;
        dataMappingsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").DataMappingsByConfigurations>;
        dynamicDataMappingsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").DynamicDataMappingsByConfigurations>;
        selectedConfigurations: import("immer/dist/internal").WritableDraft<AgentIntegrationConfiguration>[];
        selectedActions: string[];
        actionsForDropdown: import("immer/dist/internal").WritableDraft<ActionForDropdown>[];
        workflowMappingGridData: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").AgentWorkflowMappingGridData>[];
        initializing: boolean;
        workflowMappingGridMessage: string;
        open: boolean;
        loading: boolean;
        selection: any;
    };
    /**
     * Action to set workflows
     * @param state - WorkflowConfigEditorState
     * @param action - action.payload
     * @example - dispatch(setWorkflows());
     * @returns - updated state
     */
    setWorkflows: (state: import("immer/dist/internal").WritableDraft<WorkflowConfigEditorState>, action: PayloadAction<any>) => {
        workflowsByConfigurations: {
            [x: string]: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").AgentIntegrationWorkflow>[];
        };
        workflowMappingSelections: import("@mui/x-data-grid").GridRowId[];
        studioDataInput: import("immer/dist/internal").WritableDraft<WorkflowConfigActionParameters>;
        configurations: import("immer/dist/internal").WritableDraft<AgentIntegrationConfiguration>[];
        configurationByConfigurationId: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").ConfigurationByConfigurationId>;
        studioActionResult: string[];
        dataMappingsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").DataMappingsByConfigurations>;
        dynamicDataMappingsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").DynamicDataMappingsByConfigurations>;
        selectedConfigurations: import("immer/dist/internal").WritableDraft<AgentIntegrationConfiguration>[];
        selectedActions: string[];
        actionsForDropdown: import("immer/dist/internal").WritableDraft<ActionForDropdown>[];
        workflowMappingGridData: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").AgentWorkflowMappingGridData>[];
        initializing: boolean;
        workflowMappingGridMessage: string;
        open: boolean;
        loading: boolean;
        selection: any;
    };
    /**
     * Action to set setDataMappings
     * @param state - WorkflowConfigEditorState
     * @param action - action.payload
     * @example - dispatch(setDataMappings());
     * @returns - updated state
     */
    setDataMappings: (state: import("immer/dist/internal").WritableDraft<WorkflowConfigEditorState>, action: PayloadAction<any>) => {
        dataMappingsByConfigurations: {
            [x: string]: import("immer/dist/internal").WritableDraft<AgentIntegrationDataMapping>[];
        };
        workflowMappingSelections: import("@mui/x-data-grid").GridRowId[];
        studioDataInput: import("immer/dist/internal").WritableDraft<WorkflowConfigActionParameters>;
        configurations: import("immer/dist/internal").WritableDraft<AgentIntegrationConfiguration>[];
        configurationByConfigurationId: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").ConfigurationByConfigurationId>;
        studioActionResult: string[];
        workflowsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").WorkflowsByConfigurations>;
        dynamicDataMappingsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").DynamicDataMappingsByConfigurations>;
        selectedConfigurations: import("immer/dist/internal").WritableDraft<AgentIntegrationConfiguration>[];
        selectedActions: string[];
        actionsForDropdown: import("immer/dist/internal").WritableDraft<ActionForDropdown>[];
        workflowMappingGridData: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").AgentWorkflowMappingGridData>[];
        initializing: boolean;
        workflowMappingGridMessage: string;
        open: boolean;
        loading: boolean;
        selection: any;
    };
    /**
     * Action to set setDynamicDataMappings
     * @param state - WorkflowConfigEditorState
     * @param action - action.payload
     * @example - dispatch(setDynamicDataMappings());
     * @returns - updated state
     */
    setDynamicDataMappings: (state: import("immer/dist/internal").WritableDraft<WorkflowConfigEditorState>, action: PayloadAction<any>) => {
        dynamicDataMappingsByConfigurations: {
            [x: string]: import("immer/dist/internal").WritableDraft<AgentIntegrationDynamicDataMapping>[];
        };
        workflowMappingSelections: import("@mui/x-data-grid").GridRowId[];
        studioDataInput: import("immer/dist/internal").WritableDraft<WorkflowConfigActionParameters>;
        configurations: import("immer/dist/internal").WritableDraft<AgentIntegrationConfiguration>[];
        configurationByConfigurationId: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").ConfigurationByConfigurationId>;
        studioActionResult: string[];
        workflowsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").WorkflowsByConfigurations>;
        dataMappingsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").DataMappingsByConfigurations>;
        selectedConfigurations: import("immer/dist/internal").WritableDraft<AgentIntegrationConfiguration>[];
        selectedActions: string[];
        actionsForDropdown: import("immer/dist/internal").WritableDraft<ActionForDropdown>[];
        workflowMappingGridData: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").AgentWorkflowMappingGridData>[];
        initializing: boolean;
        workflowMappingGridMessage: string;
        open: boolean;
        loading: boolean;
        selection: any;
    };
    /**
     * Action to remove configuration
     * @param state - WorkflowConfigEditorState
     * @param action - action.payload
     * @example - dispatch(removeSelectedAgentConfiguration(configuration: Configuration));
     * @returns - updated state
     */
    removeSelectedAgentConfiguration: (state: import("immer/dist/internal").WritableDraft<WorkflowConfigEditorState>, action: PayloadAction<AgentIntegrationConfiguration>) => {
        selectedConfigurations: import("immer/dist/internal").WritableDraft<AgentIntegrationConfiguration>[];
        workflowMappingSelections: import("@mui/x-data-grid").GridRowId[];
        studioDataInput: import("immer/dist/internal").WritableDraft<WorkflowConfigActionParameters>;
        configurations: import("immer/dist/internal").WritableDraft<AgentIntegrationConfiguration>[];
        configurationByConfigurationId: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").ConfigurationByConfigurationId>;
        studioActionResult: string[];
        workflowsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").WorkflowsByConfigurations>;
        dataMappingsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").DataMappingsByConfigurations>;
        dynamicDataMappingsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").DynamicDataMappingsByConfigurations>;
        selectedActions: string[];
        actionsForDropdown: import("immer/dist/internal").WritableDraft<ActionForDropdown>[];
        workflowMappingGridData: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").AgentWorkflowMappingGridData>[];
        initializing: boolean;
        workflowMappingGridMessage: string;
        open: boolean;
        loading: boolean;
        selection: any;
    };
    /**
     * Action to set set Selected AgentConfigurations
     * @param state - WorkflowConfigEditorState
     * @param action - action.payload
     * @example - dispatch(setSelectedAgentConfigurations([configurationId_1, configurationId_2, ...]));
     * @returns - updated state
     */
    setSelectedAgentConfigurations: (state: import("immer/dist/internal").WritableDraft<WorkflowConfigEditorState>, action: PayloadAction<AgentIntegrationConfiguration[]>) => {
        selectedConfigurations: AgentIntegrationConfiguration[];
        workflowMappingSelections: import("@mui/x-data-grid").GridRowId[];
        studioDataInput: import("immer/dist/internal").WritableDraft<WorkflowConfigActionParameters>;
        configurations: import("immer/dist/internal").WritableDraft<AgentIntegrationConfiguration>[];
        configurationByConfigurationId: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").ConfigurationByConfigurationId>;
        studioActionResult: string[];
        workflowsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").WorkflowsByConfigurations>;
        dataMappingsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").DataMappingsByConfigurations>;
        dynamicDataMappingsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").DynamicDataMappingsByConfigurations>;
        selectedActions: string[];
        actionsForDropdown: import("immer/dist/internal").WritableDraft<ActionForDropdown>[];
        workflowMappingGridData: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").AgentWorkflowMappingGridData>[];
        initializing: boolean;
        workflowMappingGridMessage: string;
        open: boolean;
        loading: boolean;
        selection: any;
    };
    /**
     * Action to clear all selected configurations from state
     * @param state - WorkflowConfigEditorState
     * @param action - action.payload
     * @example - dispatch(setCurrentWorkflowData('search'));
     * @returns - updated state
     */
    clearSelectedAgentConfigurations: (state: import("immer/dist/internal").WritableDraft<WorkflowConfigEditorState>) => {
        selectedConfigurations: never[];
        workflowMappingSelections: import("@mui/x-data-grid").GridRowId[];
        studioDataInput: import("immer/dist/internal").WritableDraft<WorkflowConfigActionParameters>;
        configurations: import("immer/dist/internal").WritableDraft<AgentIntegrationConfiguration>[];
        configurationByConfigurationId: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").ConfigurationByConfigurationId>;
        studioActionResult: string[];
        workflowsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").WorkflowsByConfigurations>;
        dataMappingsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").DataMappingsByConfigurations>;
        dynamicDataMappingsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").DynamicDataMappingsByConfigurations>;
        selectedActions: string[];
        actionsForDropdown: import("immer/dist/internal").WritableDraft<ActionForDropdown>[];
        workflowMappingGridData: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").AgentWorkflowMappingGridData>[];
        initializing: boolean;
        workflowMappingGridMessage: string;
        open: boolean;
        loading: boolean;
        selection: any;
    };
    /**
     * Action to remove agent action
     * @param state - WorkflowConfigEditorState
     * @param action - action.payload
     * @example - dispatch(removeSelectedAgentAction(workflowAction: ));
     * @returns - updated state
     */
    removeSelectedAgentAction: (state: import("immer/dist/internal").WritableDraft<WorkflowConfigEditorState>, action: PayloadAction<string>) => {
        selectedActions: string[];
        workflowMappingSelections: import("@mui/x-data-grid").GridRowId[];
        studioDataInput: import("immer/dist/internal").WritableDraft<WorkflowConfigActionParameters>;
        configurations: import("immer/dist/internal").WritableDraft<AgentIntegrationConfiguration>[];
        configurationByConfigurationId: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").ConfigurationByConfigurationId>;
        studioActionResult: string[];
        workflowsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").WorkflowsByConfigurations>;
        dataMappingsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").DataMappingsByConfigurations>;
        dynamicDataMappingsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").DynamicDataMappingsByConfigurations>;
        selectedConfigurations: import("immer/dist/internal").WritableDraft<AgentIntegrationConfiguration>[];
        actionsForDropdown: import("immer/dist/internal").WritableDraft<ActionForDropdown>[];
        workflowMappingGridData: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").AgentWorkflowMappingGridData>[];
        initializing: boolean;
        workflowMappingGridMessage: string;
        open: boolean;
        loading: boolean;
        selection: any;
    };
    /**
     * Action to set all selected agent actions
     * @param state - WorkflowConfigEditorState
     * @param action - action.payload
     * @example - dispatch(setSelectedAgentActions());
     * @returns - updated state
     */
    setSelectedAgentActions: (state: import("immer/dist/internal").WritableDraft<WorkflowConfigEditorState>, action: PayloadAction<string[]>) => {
        selectedActions: string[];
        workflowMappingSelections: import("@mui/x-data-grid").GridRowId[];
        studioDataInput: import("immer/dist/internal").WritableDraft<WorkflowConfigActionParameters>;
        configurations: import("immer/dist/internal").WritableDraft<AgentIntegrationConfiguration>[];
        configurationByConfigurationId: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").ConfigurationByConfigurationId>;
        studioActionResult: string[];
        workflowsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").WorkflowsByConfigurations>;
        dataMappingsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").DataMappingsByConfigurations>;
        dynamicDataMappingsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").DynamicDataMappingsByConfigurations>;
        selectedConfigurations: import("immer/dist/internal").WritableDraft<AgentIntegrationConfiguration>[];
        actionsForDropdown: import("immer/dist/internal").WritableDraft<ActionForDropdown>[];
        workflowMappingGridData: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").AgentWorkflowMappingGridData>[];
        initializing: boolean;
        workflowMappingGridMessage: string;
        open: boolean;
        loading: boolean;
        selection: any;
    };
    /**
     * Action to clear all selected agent actions from state
     * @param state - WorkflowConfigEditorState
     * @param action - action.payload
     * @example - dispatch(clearSelectedAgentActions());
     * @returns - updated state
     */
    clearSelectedAgentActions: (state: import("immer/dist/internal").WritableDraft<WorkflowConfigEditorState>) => {
        selectedActions: never[];
        workflowMappingSelections: import("@mui/x-data-grid").GridRowId[];
        studioDataInput: import("immer/dist/internal").WritableDraft<WorkflowConfigActionParameters>;
        configurations: import("immer/dist/internal").WritableDraft<AgentIntegrationConfiguration>[];
        configurationByConfigurationId: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").ConfigurationByConfigurationId>;
        studioActionResult: string[];
        workflowsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").WorkflowsByConfigurations>;
        dataMappingsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").DataMappingsByConfigurations>;
        dynamicDataMappingsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").DynamicDataMappingsByConfigurations>;
        selectedConfigurations: import("immer/dist/internal").WritableDraft<AgentIntegrationConfiguration>[];
        actionsForDropdown: import("immer/dist/internal").WritableDraft<ActionForDropdown>[];
        workflowMappingGridData: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").AgentWorkflowMappingGridData>[];
        initializing: boolean;
        workflowMappingGridMessage: string;
        open: boolean;
        loading: boolean;
        selection: any;
    };
    /**
     * Action to set data for workflow mapping grid
     * @param state - WorkflowConfigEditorState
     * @param action - action.payload
     * @example - dispatch(setWorkflowMappingGridData());
     * @returns - updated state
     */
    setWorkflowMappingGridData: (state: import("immer/dist/internal").WritableDraft<WorkflowConfigEditorState>, action: PayloadAction<any>) => {
        workflowMappingGridData: any;
        workflowMappingSelections: import("@mui/x-data-grid").GridRowId[];
        studioDataInput: import("immer/dist/internal").WritableDraft<WorkflowConfigActionParameters>;
        configurations: import("immer/dist/internal").WritableDraft<AgentIntegrationConfiguration>[];
        configurationByConfigurationId: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").ConfigurationByConfigurationId>;
        studioActionResult: string[];
        workflowsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").WorkflowsByConfigurations>;
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
     * @param state - WorkflowConfigEditorState
     * @param action - action.payload
     * @example - dispatch(clearWorkflowMappingGridData());
     * @returns - updated state
     */
    clearWorkflowMappingGridData: (state: import("immer/dist/internal").WritableDraft<WorkflowConfigEditorState>) => {
        workflowMappingGridData: never[];
        workflowMappingSelections: import("@mui/x-data-grid").GridRowId[];
        studioDataInput: import("immer/dist/internal").WritableDraft<WorkflowConfigActionParameters>;
        configurations: import("immer/dist/internal").WritableDraft<AgentIntegrationConfiguration>[];
        configurationByConfigurationId: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").ConfigurationByConfigurationId>;
        studioActionResult: string[];
        workflowsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").WorkflowsByConfigurations>;
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
     * @param state - WorkflowConfigEditorState
     * @param action - action.payload
     * @example - dispatch(setWorkflowMappingSelections());
     * @returns - updated state
     */
    setWorkflowMappingSelections: (state: import("immer/dist/internal").WritableDraft<WorkflowConfigEditorState>, action: PayloadAction<CcfGridSelectionModel>) => {
        workflowMappingSelections: import("@mui/x-data-grid").GridRowSelectionModel;
        studioDataInput: import("immer/dist/internal").WritableDraft<WorkflowConfigActionParameters>;
        configurations: import("immer/dist/internal").WritableDraft<AgentIntegrationConfiguration>[];
        configurationByConfigurationId: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").ConfigurationByConfigurationId>;
        studioActionResult: string[];
        workflowsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").WorkflowsByConfigurations>;
        dataMappingsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").DataMappingsByConfigurations>;
        dynamicDataMappingsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").DynamicDataMappingsByConfigurations>;
        selectedConfigurations: import("immer/dist/internal").WritableDraft<AgentIntegrationConfiguration>[];
        selectedActions: string[];
        actionsForDropdown: import("immer/dist/internal").WritableDraft<ActionForDropdown>[];
        workflowMappingGridData: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").AgentWorkflowMappingGridData>[];
        initializing: boolean;
        workflowMappingGridMessage: string;
        open: boolean;
        loading: boolean;
        selection: any;
    };
    /**
     * Action to set workflow mapping grid message
     * @param state - WorkflowConfigEditorState
     * @param action - action.payload
     * @example - dispatch(setWorkflowMappingGridMessage());
     * @returns - updated state
     */
    setWorkflowMappingGridMessage: (state: import("immer/dist/internal").WritableDraft<WorkflowConfigEditorState>, action: PayloadAction<any>) => {
        workflowMappingGridMessage: string;
        workflowMappingSelections: import("@mui/x-data-grid").GridRowId[];
        studioDataInput: import("immer/dist/internal").WritableDraft<WorkflowConfigActionParameters>;
        configurations: import("immer/dist/internal").WritableDraft<AgentIntegrationConfiguration>[];
        configurationByConfigurationId: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").ConfigurationByConfigurationId>;
        studioActionResult: string[];
        workflowsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").WorkflowsByConfigurations>;
        dataMappingsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").DataMappingsByConfigurations>;
        dynamicDataMappingsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").DynamicDataMappingsByConfigurations>;
        selectedConfigurations: import("immer/dist/internal").WritableDraft<AgentIntegrationConfiguration>[];
        selectedActions: string[];
        actionsForDropdown: import("immer/dist/internal").WritableDraft<ActionForDropdown>[];
        workflowMappingGridData: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").AgentWorkflowMappingGridData>[];
        initializing: boolean;
        open: boolean;
        loading: boolean;
        selection: any;
    };
    /**
     * Action to clear selected workflows
     * @param state - WorkflowConfigEditorState
     * @param action - action.payload
     * @example - dispatch(clearWorkflowMappingSelections());
     * @returns - updated state
     */
    clearWorkflowMappingSelections: (state: import("immer/dist/internal").WritableDraft<WorkflowConfigEditorState>) => {
        workflowMappingSelections: never[];
        studioDataInput: import("immer/dist/internal").WritableDraft<WorkflowConfigActionParameters>;
        configurations: import("immer/dist/internal").WritableDraft<AgentIntegrationConfiguration>[];
        configurationByConfigurationId: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").ConfigurationByConfigurationId>;
        studioActionResult: string[];
        workflowsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").WorkflowsByConfigurations>;
        dataMappingsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").DataMappingsByConfigurations>;
        dynamicDataMappingsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").DynamicDataMappingsByConfigurations>;
        selectedConfigurations: import("immer/dist/internal").WritableDraft<AgentIntegrationConfiguration>[];
        selectedActions: string[];
        actionsForDropdown: import("immer/dist/internal").WritableDraft<ActionForDropdown>[];
        workflowMappingGridData: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").AgentWorkflowMappingGridData>[];
        initializing: boolean;
        workflowMappingGridMessage: string;
        open: boolean;
        loading: boolean;
        selection: any;
    };
    /**
     * Action to reset the state.
     * @param state - WorkflowConfigEditorState
     * @param action - action.payload
     * @example - dispatch(setActionsForDropdown());
     * @returns - initial state
     */
    setActionsForDropdown: (state: import("immer/dist/internal").WritableDraft<WorkflowConfigEditorState>) => {
        actionsForDropdown: ActionForDropdown[];
        workflowMappingSelections: import("@mui/x-data-grid").GridRowId[];
        studioDataInput: import("immer/dist/internal").WritableDraft<WorkflowConfigActionParameters>;
        configurations: import("immer/dist/internal").WritableDraft<AgentIntegrationConfiguration>[];
        configurationByConfigurationId: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").ConfigurationByConfigurationId>;
        studioActionResult: string[];
        workflowsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").WorkflowsByConfigurations>;
        dataMappingsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").DataMappingsByConfigurations>;
        dynamicDataMappingsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").DynamicDataMappingsByConfigurations>;
        selectedConfigurations: import("immer/dist/internal").WritableDraft<AgentIntegrationConfiguration>[];
        selectedActions: string[];
        workflowMappingGridData: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").AgentWorkflowMappingGridData>[];
        initializing: boolean;
        workflowMappingGridMessage: string;
        open: boolean;
        loading: boolean;
        selection: any;
    };
    /**
     * Action to set studioDataInput state.
     * @param state - WorkflowConfigEditorState
     * @example - dispatch(setStudioDataInput(studioDataInput));
     * @returns - state
     */
    setStudioDataInput: (state: import("immer/dist/internal").WritableDraft<WorkflowConfigEditorState>, action: PayloadAction<WorkflowConfigActionParameters>) => {
        studioDataInput: WorkflowConfigActionParameters;
        workflowMappingSelections: import("@mui/x-data-grid").GridRowId[];
        configurations: import("immer/dist/internal").WritableDraft<AgentIntegrationConfiguration>[];
        configurationByConfigurationId: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").ConfigurationByConfigurationId>;
        studioActionResult: string[];
        workflowsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").WorkflowsByConfigurations>;
        dataMappingsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").DataMappingsByConfigurations>;
        dynamicDataMappingsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").DynamicDataMappingsByConfigurations>;
        selectedConfigurations: import("immer/dist/internal").WritableDraft<AgentIntegrationConfiguration>[];
        selectedActions: string[];
        actionsForDropdown: import("immer/dist/internal").WritableDraft<ActionForDropdown>[];
        workflowMappingGridData: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").AgentWorkflowMappingGridData>[];
        initializing: boolean;
        workflowMappingGridMessage: string;
        open: boolean;
        loading: boolean;
        selection: any;
    };
    /**
     * Action to set initializing state.
     * @param state - WorkflowConfigEditorState
     * @example - dispatch(setInitializing(true));
     * @returns - state
     */
    setInitializing: (state: import("immer/dist/internal").WritableDraft<WorkflowConfigEditorState>, action: PayloadAction<boolean>) => {
        initializing: boolean;
        workflowMappingSelections: import("@mui/x-data-grid").GridRowId[];
        studioDataInput: import("immer/dist/internal").WritableDraft<WorkflowConfigActionParameters>;
        configurations: import("immer/dist/internal").WritableDraft<AgentIntegrationConfiguration>[];
        configurationByConfigurationId: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").ConfigurationByConfigurationId>;
        studioActionResult: string[];
        workflowsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").WorkflowsByConfigurations>;
        dataMappingsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").DataMappingsByConfigurations>;
        dynamicDataMappingsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").DynamicDataMappingsByConfigurations>;
        selectedConfigurations: import("immer/dist/internal").WritableDraft<AgentIntegrationConfiguration>[];
        selectedActions: string[];
        actionsForDropdown: import("immer/dist/internal").WritableDraft<ActionForDropdown>[];
        workflowMappingGridData: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").AgentWorkflowMappingGridData>[];
        workflowMappingGridMessage: string;
        open: boolean;
        loading: boolean;
        selection: any;
    };
    /**
     * Action to set isCCFGridLoading state.
     * @param state - WorkflowConfigEditorState
     * @example - dispatch(setIsCCFGridLoading(true));
     * @returns - state
     */
    setIsCCFGridLoading: (state: import("immer/dist/internal").WritableDraft<WorkflowConfigEditorState>, action: PayloadAction<boolean>) => {
        isCCFGridLoading: boolean;
        workflowMappingSelections: import("@mui/x-data-grid").GridRowId[];
        studioDataInput: import("immer/dist/internal").WritableDraft<WorkflowConfigActionParameters>;
        configurations: import("immer/dist/internal").WritableDraft<AgentIntegrationConfiguration>[];
        configurationByConfigurationId: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").ConfigurationByConfigurationId>;
        studioActionResult: string[];
        workflowsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").WorkflowsByConfigurations>;
        dataMappingsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").DataMappingsByConfigurations>;
        dynamicDataMappingsByConfigurations: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").DynamicDataMappingsByConfigurations>;
        selectedConfigurations: import("immer/dist/internal").WritableDraft<AgentIntegrationConfiguration>[];
        selectedActions: string[];
        actionsForDropdown: import("immer/dist/internal").WritableDraft<ActionForDropdown>[];
        workflowMappingGridData: import("immer/dist/internal").WritableDraft<import("@nice-devone/shared-apps-lib").AgentWorkflowMappingGridData>[];
        initializing: boolean;
        workflowMappingGridMessage: string;
        open: boolean;
        loading: boolean;
        selection: any;
    };
}, "workflowConfigEditorSlice">;
export declare const getConfigurations: ((state: WorkflowConfigRootState) => AgentIntegrationConfiguration[]) & import("reselect").OutputSelectorFields<(args_0: WorkflowConfigEditorState) => AgentIntegrationConfiguration[] & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const getConfigurationByConfigurationId: ((state: WorkflowConfigRootState) => import("@nice-devone/shared-apps-lib").ConfigurationByConfigurationId) & import("reselect").OutputSelectorFields<(args_0: WorkflowConfigEditorState) => import("@nice-devone/shared-apps-lib").ConfigurationByConfigurationId & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const getSelectedConfigurations: ((state: WorkflowConfigRootState) => AgentIntegrationConfiguration[]) & import("reselect").OutputSelectorFields<(args_0: WorkflowConfigEditorState) => AgentIntegrationConfiguration[] & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const getWorkflowsByConfigurations: ((state: WorkflowConfigRootState) => import("@nice-devone/shared-apps-lib").WorkflowsByConfigurations) & import("reselect").OutputSelectorFields<(args_0: WorkflowConfigEditorState) => import("@nice-devone/shared-apps-lib").WorkflowsByConfigurations & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const getDataMappingsByConfigurations: ((state: WorkflowConfigRootState) => import("@nice-devone/shared-apps-lib").DataMappingsByConfigurations) & import("reselect").OutputSelectorFields<(args_0: WorkflowConfigEditorState) => import("@nice-devone/shared-apps-lib").DataMappingsByConfigurations & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const getDynamicDataMappingsByConfigurations: ((state: WorkflowConfigRootState) => import("@nice-devone/shared-apps-lib").DynamicDataMappingsByConfigurations) & import("reselect").OutputSelectorFields<(args_0: WorkflowConfigEditorState) => import("@nice-devone/shared-apps-lib").DynamicDataMappingsByConfigurations & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const getSelectedActions: ((state: WorkflowConfigRootState) => string[]) & import("reselect").OutputSelectorFields<(args_0: WorkflowConfigEditorState) => string[] & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const getWorkflowMappingSelections: ((state: WorkflowConfigRootState) => import("@mui/x-data-grid").GridRowSelectionModel) & import("reselect").OutputSelectorFields<(args_0: WorkflowConfigEditorState) => import("@mui/x-data-grid").GridRowSelectionModel & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const getWorkflowMappingGridData: ((state: WorkflowConfigRootState) => import("@nice-devone/shared-apps-lib").AgentWorkflowMappingGridData[]) & import("reselect").OutputSelectorFields<(args_0: WorkflowConfigEditorState) => import("@nice-devone/shared-apps-lib").AgentWorkflowMappingGridData[] & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const getActionsForDropdown: ((state: WorkflowConfigRootState) => ActionForDropdown[]) & import("reselect").OutputSelectorFields<(args_0: WorkflowConfigEditorState) => ActionForDropdown[] & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const getStudioDataInput: ((state: WorkflowConfigRootState) => WorkflowConfigActionParameters) & import("reselect").OutputSelectorFields<(args_0: WorkflowConfigEditorState) => WorkflowConfigActionParameters & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const getInitializing: ((state: WorkflowConfigRootState) => boolean) & import("reselect").OutputSelectorFields<(args_0: WorkflowConfigEditorState) => boolean & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const getWorkflowMappingGridMessage: ((state: WorkflowConfigRootState) => string) & import("reselect").OutputSelectorFields<(args_0: WorkflowConfigEditorState) => string & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const getIsCCFGridLoading: ((state: WorkflowConfigRootState) => boolean) & import("reselect").OutputSelectorFields<(args_0: WorkflowConfigEditorState) => boolean & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export * as thunks from './thunks';
