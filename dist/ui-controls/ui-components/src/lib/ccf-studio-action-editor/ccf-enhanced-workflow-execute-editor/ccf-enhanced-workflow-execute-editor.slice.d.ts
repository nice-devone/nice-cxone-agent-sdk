import { PayloadAction } from '@reduxjs/toolkit';
import { AgentIntegrationConfigurationResult, AgentIntegrationConfiguration, AgentIntegrationWorkflow, AgentIntegrationWorkflowResult, AgentIntegrationDynamicDataMapping } from '@nice-devone/shared-apps-lib';
import { EnhancedWorkflowConfigs, ComparisonCondition, Config, ComparisonOperator, AgentIntegrationWorkflowEntities, AgentIntegrationEntities, AgentIntegrationWorkflowEntitiesFields, AgentIntegrationFieldsParams, AgentIntegrationWorkflowRowOperation } from './helpers/enhanced-workflow-models';
export declare const ENHANCED_WORKFLOW_EXECUTE_EDITOR_SLICE_KEY: string;
export declare enum renderedScreen {
    HOME_SCREEN = "homeScreen",
    GENERAL_INFORMATION = "generalInformation",
    PHONE_EMAIL_SEARCH = "phoneEmailSearch",
    CUSTOM_SEARCH_FILTER = "customSearchFilter",
    CUSTOM_SEARCH = "customSearch",
    SUMMARY_TEST = "summaryTest",
    AUTOMATIC_CREATE_FILTER = "automaticCreate",
    AUTO_MANUAL_CREATE = "automanualCreate",
    MANUAL_CREATE_FILTER = "manualCreateFilter"
}
export declare type entityFieldsType = {
    entityIndex: number;
    paramIndex: number;
    fieldName: string;
    value: ComparisonCondition | ComparisonOperator | string;
    label: string | undefined;
};
export declare type workflowEntityDeletion = {
    entityIndex: number;
};
export declare type workflowEntityFieldsDeletion = {
    entityIndex: number;
    paramIndex: number;
};
export declare type fieldOptionType = {
    [x: string]: AgentIntegrationFieldsParams[];
};
export interface enhancedWorkflowExecuteEditorState {
    /**
     * @remarks Set previously configured Enhanced Workflow Configs
     */
    enhancedWorkflowConfigs: EnhancedWorkflowConfigs;
    /**
     * @remarks Set newly created application configuration to store for further use
     */
    selectedEnhancedWorkflowConfig: Config;
    /**
     * @remarks Set application configuration
     */
    crmSolutionInstances: AgentIntegrationConfiguration[];
    /**
     * @remarks current component rendered
     */
    componentRendered: renderedScreen;
    /**
    * @remarks Set workflows for given configuration id
    */
    workflows: AgentIntegrationWorkflow[];
    /**
    * @remarks set active step on stepper , count starts from 0
    */
    activeStep: number;
    /**
    * @remarks set active step on stepper , count starts from 0
    */
    entities: AgentIntegrationEntities[];
    /**
     * @remarks set fields for the entity
     */
    fieldsforentity: AgentIntegrationWorkflowEntitiesFields[];
    /**
     * @remarks set selected entity of the CRM
     */
    selectedEntity: object;
    /**
     * @remarks set fields for the entity
     */
    entityFields: fieldOptionType;
    /**
     * @remarks store dynamic data
     */
    dynamicDataMappings: AgentIntegrationDynamicDataMapping[];
    /**
     * @remarks store selected application existing configs index
     */
    selectedEWEConfigIndexforEdit: number;
    /**
    * @remarks store if screen is initializing
    */
    initializing: boolean;
    /**
   * @remarks store loading state for the application
   */
    loading: boolean;
    /**
   * @remarks store workflowTestResponse state for the application
   */
    workflowTestResponse?: unknown;
}
/**
 * This interface is the structure for root state.
 */
export interface enhancedWorkflowExecuteRootState {
    enhancedworkflowExecuteEditorSlice: enhancedWorkflowExecuteEditorState;
}
/**
 * Initial state for new AWE configuration created
 */
export declare const initialnewEWEConfigurationCreated: Config;
/**
 * Application state.
 */
export declare const initialCcfenhancedWorkflowExecuteEditorState: enhancedWorkflowExecuteEditorState;
export declare const enhancedworkflowExecuteEditorSlice: import("@reduxjs/toolkit").Slice<enhancedWorkflowExecuteEditorState, {
    /**
     * Action to set next component to render
     * @param state - enhancedWorkflowExecuteEditorState
     * @param action - action.payload
     * @example - dispatch(setEnhancedWorkflowConfigs());
     * @returns - updated state
     */
    setEnhancedWorkflowConfigs(state: import("immer/dist/internal").WritableDraft<enhancedWorkflowExecuteEditorState>, action: PayloadAction<EnhancedWorkflowConfigs>): {
        enhancedWorkflowConfigs: EnhancedWorkflowConfigs;
        selectedEnhancedWorkflowConfig: import("immer/dist/internal").WritableDraft<Config>;
        crmSolutionInstances: import("immer/dist/internal").WritableDraft<AgentIntegrationConfiguration>[];
        componentRendered: renderedScreen;
        workflows: import("immer/dist/internal").WritableDraft<AgentIntegrationWorkflow>[];
        activeStep: number;
        entities: import("immer/dist/internal").WritableDraft<AgentIntegrationEntities>[];
        fieldsforentity: import("immer/dist/internal").WritableDraft<AgentIntegrationWorkflowEntitiesFields>[];
        selectedEntity: object;
        entityFields: import("immer/dist/internal").WritableDraft<fieldOptionType>;
        dynamicDataMappings: import("immer/dist/internal").WritableDraft<AgentIntegrationDynamicDataMapping>[];
        selectedEWEConfigIndexforEdit: number;
        initializing: boolean;
        loading: boolean;
        workflowTestResponse?: unknown;
    };
    /**
     * Action to set test response in the state
     * @param state - enhancedWorkflowExecuteEditorState
     * @param action - action.payload
     * @example - dispatch(setEWEWorkflowsTestResult(responseData));
     * @returns - updated state with test response
     */
    setEWEWorkflowsTestResult(state: enhancedWorkflowExecuteEditorState, action: PayloadAction<any>): {
        workflowTestResponse: any;
        /**
         * @remarks Set previously configured Enhanced Workflow Configs
         */
        enhancedWorkflowConfigs: EnhancedWorkflowConfigs;
        /**
         * @remarks Set newly created application configuration to store for further use
         */
        selectedEnhancedWorkflowConfig: Config;
        /**
         * @remarks Set application configuration
         */
        crmSolutionInstances: AgentIntegrationConfiguration[];
        /**
         * @remarks current component rendered
         */
        componentRendered: renderedScreen;
        /**
        * @remarks Set workflows for given configuration id
        */
        workflows: AgentIntegrationWorkflow[];
        /**
        * @remarks set active step on stepper , count starts from 0
        */
        activeStep: number;
        /**
        * @remarks set active step on stepper , count starts from 0
        */
        entities: AgentIntegrationEntities[];
        /**
         * @remarks set fields for the entity
         */
        fieldsforentity: AgentIntegrationWorkflowEntitiesFields[];
        /**
         * @remarks set selected entity of the CRM
         */
        selectedEntity: object;
        /**
         * @remarks set fields for the entity
         */
        entityFields: fieldOptionType;
        /**
         * @remarks store dynamic data
         */
        dynamicDataMappings: AgentIntegrationDynamicDataMapping[];
        /**
         * @remarks store selected application existing configs index
         */
        selectedEWEConfigIndexforEdit: number;
        /**
        * @remarks store if screen is initializing
        */
        initializing: boolean;
        /**
       * @remarks store loading state for the application
       */
        loading: boolean;
    };
    /**
     * Action to set next component to render
     * @param state - enhancedWorkflowExecuteEditorState
     * @param action - action.payload
     * @example - dispatch(setSelectedConfiguration());
     * @returns - updated state
     */
    setSelectedConfiguration(state: import("immer/dist/internal").WritableDraft<enhancedWorkflowExecuteEditorState>, action: PayloadAction<Config>): {
        selectedEnhancedWorkflowConfig: Config;
        enhancedWorkflowConfigs: import("immer/dist/internal").WritableDraft<EnhancedWorkflowConfigs>;
        crmSolutionInstances: import("immer/dist/internal").WritableDraft<AgentIntegrationConfiguration>[];
        componentRendered: renderedScreen;
        workflows: import("immer/dist/internal").WritableDraft<AgentIntegrationWorkflow>[];
        activeStep: number;
        entities: import("immer/dist/internal").WritableDraft<AgentIntegrationEntities>[];
        fieldsforentity: import("immer/dist/internal").WritableDraft<AgentIntegrationWorkflowEntitiesFields>[];
        selectedEntity: object;
        entityFields: import("immer/dist/internal").WritableDraft<fieldOptionType>;
        dynamicDataMappings: import("immer/dist/internal").WritableDraft<AgentIntegrationDynamicDataMapping>[];
        selectedEWEConfigIndexforEdit: number;
        initializing: boolean;
        loading: boolean;
        workflowTestResponse?: unknown;
    };
    /**
     * Action to set crmSolutionInstances
     * @param state - enhancedWorkflowExecuteEditorState
     * @param action - action.payload
     * @example - dispatch(setCrmSolutionInstances());
     * @returns - updated state
     */
    setCrmSolutionInstances(state: import("immer/dist/internal").WritableDraft<enhancedWorkflowExecuteEditorState>, action: PayloadAction<AgentIntegrationConfigurationResult>): {
        crmSolutionInstances: AgentIntegrationConfiguration[];
        configurationByConfigurationId: Record<string, AgentIntegrationConfiguration>;
        enhancedWorkflowConfigs: import("immer/dist/internal").WritableDraft<EnhancedWorkflowConfigs>;
        selectedEnhancedWorkflowConfig: import("immer/dist/internal").WritableDraft<Config>;
        componentRendered: renderedScreen;
        workflows: import("immer/dist/internal").WritableDraft<AgentIntegrationWorkflow>[];
        activeStep: number;
        entities: import("immer/dist/internal").WritableDraft<AgentIntegrationEntities>[];
        fieldsforentity: import("immer/dist/internal").WritableDraft<AgentIntegrationWorkflowEntitiesFields>[];
        selectedEntity: object;
        entityFields: import("immer/dist/internal").WritableDraft<fieldOptionType>;
        dynamicDataMappings: import("immer/dist/internal").WritableDraft<AgentIntegrationDynamicDataMapping>[];
        selectedEWEConfigIndexforEdit: number;
        initializing: boolean;
        loading: boolean;
        workflowTestResponse?: unknown;
    };
    /**
     * Action to set next component to render
     * @param state - enhancedWorkflowExecuteEditorState
     * @param action - action.payload
     * @example - dispatch(setComponentToRender());
     * @returns - updated state
     */
    setComponentToRender(state: import("immer/dist/internal").WritableDraft<enhancedWorkflowExecuteEditorState>, action: PayloadAction<renderedScreen>): {
        componentRendered: renderedScreen;
        enhancedWorkflowConfigs: import("immer/dist/internal").WritableDraft<EnhancedWorkflowConfigs>;
        selectedEnhancedWorkflowConfig: import("immer/dist/internal").WritableDraft<Config>;
        crmSolutionInstances: import("immer/dist/internal").WritableDraft<AgentIntegrationConfiguration>[];
        workflows: import("immer/dist/internal").WritableDraft<AgentIntegrationWorkflow>[];
        activeStep: number;
        entities: import("immer/dist/internal").WritableDraft<AgentIntegrationEntities>[];
        fieldsforentity: import("immer/dist/internal").WritableDraft<AgentIntegrationWorkflowEntitiesFields>[];
        selectedEntity: object;
        entityFields: import("immer/dist/internal").WritableDraft<fieldOptionType>;
        dynamicDataMappings: import("immer/dist/internal").WritableDraft<AgentIntegrationDynamicDataMapping>[];
        selectedEWEConfigIndexforEdit: number;
        initializing: boolean;
        loading: boolean;
        workflowTestResponse?: unknown;
    };
    /**
     * Action to set workflows
     * @param state - WorkflowConfigEditorState
     * @param action - action.payload
     * @example - dispatch(setWorkflows());
     * @returns - updated state
     */
    setWorkflows(state: import("immer/dist/internal").WritableDraft<enhancedWorkflowExecuteEditorState>, action: PayloadAction<AgentIntegrationWorkflowResult>): {
        workflows: AgentIntegrationWorkflow[];
        enhancedWorkflowConfigs: import("immer/dist/internal").WritableDraft<EnhancedWorkflowConfigs>;
        selectedEnhancedWorkflowConfig: import("immer/dist/internal").WritableDraft<Config>;
        crmSolutionInstances: import("immer/dist/internal").WritableDraft<AgentIntegrationConfiguration>[];
        componentRendered: renderedScreen;
        activeStep: number;
        entities: import("immer/dist/internal").WritableDraft<AgentIntegrationEntities>[];
        fieldsforentity: import("immer/dist/internal").WritableDraft<AgentIntegrationWorkflowEntitiesFields>[];
        selectedEntity: object;
        entityFields: import("immer/dist/internal").WritableDraft<fieldOptionType>;
        dynamicDataMappings: import("immer/dist/internal").WritableDraft<AgentIntegrationDynamicDataMapping>[];
        selectedEWEConfigIndexforEdit: number;
        initializing: boolean;
        loading: boolean;
        workflowTestResponse?: unknown;
    };
    /**
     * Action to set active step on stepper , with first step as 0
     * @param state - WorkflowConfigEditorState
     * @param action - action.payload
     * @example - dispatch(setActiveStep());
     * @returns - updated state
     */
    setActiveStep(state: import("immer/dist/internal").WritableDraft<enhancedWorkflowExecuteEditorState>, action: PayloadAction<number>): {
        activeStep: number;
        enhancedWorkflowConfigs: import("immer/dist/internal").WritableDraft<EnhancedWorkflowConfigs>;
        selectedEnhancedWorkflowConfig: import("immer/dist/internal").WritableDraft<Config>;
        crmSolutionInstances: import("immer/dist/internal").WritableDraft<AgentIntegrationConfiguration>[];
        componentRendered: renderedScreen;
        workflows: import("immer/dist/internal").WritableDraft<AgentIntegrationWorkflow>[];
        entities: import("immer/dist/internal").WritableDraft<AgentIntegrationEntities>[];
        fieldsforentity: import("immer/dist/internal").WritableDraft<AgentIntegrationWorkflowEntitiesFields>[];
        selectedEntity: object;
        entityFields: import("immer/dist/internal").WritableDraft<fieldOptionType>;
        dynamicDataMappings: import("immer/dist/internal").WritableDraft<AgentIntegrationDynamicDataMapping>[];
        selectedEWEConfigIndexforEdit: number;
        initializing: boolean;
        loading: boolean;
        workflowTestResponse?: unknown;
    };
    /**
     * Action to set selected AWE Config Index , with first value as -1
     * @param state - WorkflowConfigEditorState
     * @param action - action.payload
     * @example - dispatch(setselectedEWEConfigIndex());
     * @returns - updated state
     */
    setselectedEWEConfigIndex(state: import("immer/dist/internal").WritableDraft<enhancedWorkflowExecuteEditorState>, action: PayloadAction<number>): {
        selectedEWEConfigIndexforEdit: number;
        enhancedWorkflowConfigs: import("immer/dist/internal").WritableDraft<EnhancedWorkflowConfigs>;
        selectedEnhancedWorkflowConfig: import("immer/dist/internal").WritableDraft<Config>;
        crmSolutionInstances: import("immer/dist/internal").WritableDraft<AgentIntegrationConfiguration>[];
        componentRendered: renderedScreen;
        workflows: import("immer/dist/internal").WritableDraft<AgentIntegrationWorkflow>[];
        activeStep: number;
        entities: import("immer/dist/internal").WritableDraft<AgentIntegrationEntities>[];
        fieldsforentity: import("immer/dist/internal").WritableDraft<AgentIntegrationWorkflowEntitiesFields>[];
        selectedEntity: object;
        entityFields: import("immer/dist/internal").WritableDraft<fieldOptionType>;
        dynamicDataMappings: import("immer/dist/internal").WritableDraft<AgentIntegrationDynamicDataMapping>[];
        initializing: boolean;
        loading: boolean;
        workflowTestResponse?: unknown;
    };
    /**
     * Action to set workflows
     * @param state - WorkflowConfigEditorState
     * @param action - action.payload
     * @example - dispatch(setWorkflows());
     * @returns - updated state
     */
    setEntities(state: import("immer/dist/internal").WritableDraft<enhancedWorkflowExecuteEditorState>, action: PayloadAction<AgentIntegrationWorkflowEntities>): {
        entities: AgentIntegrationEntities[];
        enhancedWorkflowConfigs: import("immer/dist/internal").WritableDraft<EnhancedWorkflowConfigs>;
        selectedEnhancedWorkflowConfig: import("immer/dist/internal").WritableDraft<Config>;
        crmSolutionInstances: import("immer/dist/internal").WritableDraft<AgentIntegrationConfiguration>[];
        componentRendered: renderedScreen;
        workflows: import("immer/dist/internal").WritableDraft<AgentIntegrationWorkflow>[];
        activeStep: number;
        fieldsforentity: import("immer/dist/internal").WritableDraft<AgentIntegrationWorkflowEntitiesFields>[];
        selectedEntity: object;
        entityFields: import("immer/dist/internal").WritableDraft<fieldOptionType>;
        dynamicDataMappings: import("immer/dist/internal").WritableDraft<AgentIntegrationDynamicDataMapping>[];
        selectedEWEConfigIndexforEdit: number;
        initializing: boolean;
        loading: boolean;
        workflowTestResponse?: unknown;
    };
    /**
     * Action to set workflows
     * @param state - WorkflowConfigEditorState
     * @param action - action.payload
     * @example - dispatch(setWorkflows());
     * @returns - updated state
     */
    setselectedEntity(state: import("immer/dist/internal").WritableDraft<enhancedWorkflowExecuteEditorState>, action: PayloadAction<AgentIntegrationEntities>): {
        selectedEntity: AgentIntegrationEntities;
        enhancedWorkflowConfigs: import("immer/dist/internal").WritableDraft<EnhancedWorkflowConfigs>;
        selectedEnhancedWorkflowConfig: import("immer/dist/internal").WritableDraft<Config>;
        crmSolutionInstances: import("immer/dist/internal").WritableDraft<AgentIntegrationConfiguration>[];
        componentRendered: renderedScreen;
        workflows: import("immer/dist/internal").WritableDraft<AgentIntegrationWorkflow>[];
        activeStep: number;
        entities: import("immer/dist/internal").WritableDraft<AgentIntegrationEntities>[];
        fieldsforentity: import("immer/dist/internal").WritableDraft<AgentIntegrationWorkflowEntitiesFields>[];
        entityFields: import("immer/dist/internal").WritableDraft<fieldOptionType>;
        dynamicDataMappings: import("immer/dist/internal").WritableDraft<AgentIntegrationDynamicDataMapping>[];
        selectedEWEConfigIndexforEdit: number;
        initializing: boolean;
        loading: boolean;
        workflowTestResponse?: unknown;
    };
    /**
     * Action to set workflows
     * @param state - WorkflowConfigEditorState
     * @param action - action.payload
     * @example - dispatch(setWorkflows());
     * @returns - updated state
     */
    setEntityFields(state: import("immer/dist/internal").WritableDraft<enhancedWorkflowExecuteEditorState>, action: PayloadAction<fieldOptionType>): {
        entityFields: {
            [x: string]: AgentIntegrationFieldsParams[] | import("immer/dist/internal").WritableDraft<AgentIntegrationFieldsParams>[];
        };
        enhancedWorkflowConfigs: import("immer/dist/internal").WritableDraft<EnhancedWorkflowConfigs>;
        selectedEnhancedWorkflowConfig: import("immer/dist/internal").WritableDraft<Config>;
        crmSolutionInstances: import("immer/dist/internal").WritableDraft<AgentIntegrationConfiguration>[];
        componentRendered: renderedScreen;
        workflows: import("immer/dist/internal").WritableDraft<AgentIntegrationWorkflow>[];
        activeStep: number;
        entities: import("immer/dist/internal").WritableDraft<AgentIntegrationEntities>[];
        fieldsforentity: import("immer/dist/internal").WritableDraft<AgentIntegrationWorkflowEntitiesFields>[];
        selectedEntity: object;
        dynamicDataMappings: import("immer/dist/internal").WritableDraft<AgentIntegrationDynamicDataMapping>[];
        selectedEWEConfigIndexforEdit: number;
        initializing: boolean;
        loading: boolean;
        workflowTestResponse?: unknown;
    };
    /**
     * Action to set setDynamicDataMappings
     * @param state - CcfWorkflowConfigEditorState
     * @param action - action.payload
     * @example - dispatch(setDynamicDataMappings());
     * @returns - updated state
     */
    setDynamicDataMappings: (state: import("immer/dist/internal").WritableDraft<enhancedWorkflowExecuteEditorState>, action: PayloadAction<any>) => {
        dynamicDataMappings: any[];
        enhancedWorkflowConfigs: import("immer/dist/internal").WritableDraft<EnhancedWorkflowConfigs>;
        selectedEnhancedWorkflowConfig: import("immer/dist/internal").WritableDraft<Config>;
        crmSolutionInstances: import("immer/dist/internal").WritableDraft<AgentIntegrationConfiguration>[];
        componentRendered: renderedScreen;
        workflows: import("immer/dist/internal").WritableDraft<AgentIntegrationWorkflow>[];
        activeStep: number;
        entities: import("immer/dist/internal").WritableDraft<AgentIntegrationEntities>[];
        fieldsforentity: import("immer/dist/internal").WritableDraft<AgentIntegrationWorkflowEntitiesFields>[];
        selectedEntity: object;
        entityFields: import("immer/dist/internal").WritableDraft<fieldOptionType>;
        selectedEWEConfigIndexforEdit: number;
        initializing: boolean;
        loading: boolean;
        workflowTestResponse?: unknown;
    };
    /**
    * Action to set addRow
    * @param state - CcfWorkflowConfigEditorState
    * @param action - action.payload
    * @example - dispatch(setDynamicDataMappings());
    * @returns - updated state
    */
    addRow(state: import("immer/dist/internal").WritableDraft<enhancedWorkflowExecuteEditorState>, action: PayloadAction<AgentIntegrationWorkflowRowOperation>): void;
    /**
    * Action to reset page when configuration changes
    * @param state - enhancedWorkflowExecuteEditorState
    * @param action - action.payload
    * @example - dispatch(resetPage());
    * @returns - updated state
    */
    resetPage(state: import("immer/dist/internal").WritableDraft<enhancedWorkflowExecuteEditorState>): void;
    /**
    * Action to update entity display name
    * @param state - CcfWorkflowConfigEditorState
    * @param action - action.payload
    * @example - dispatch(updateEntityDisplayName());
    * @returns - updated state
    */
    updateEntityDisplayName(state: import("immer/dist/internal").WritableDraft<enhancedWorkflowExecuteEditorState>, action: PayloadAction<{
        entityIndex: number;
        displayName: string;
    }>): void;
    /**
    * Action to set addRow
    * @param state - CcfWorkflowConfigEditorState
    * @param action - action.payload
    * @example - dispatch(setDynamicDataMappings());
    * @returns - updated state
    */
    addEntityRow(state: import("immer/dist/internal").WritableDraft<enhancedWorkflowExecuteEditorState>, action: PayloadAction<AgentIntegrationWorkflowRowOperation>): void;
    /**
  * Action to update columncriteria fields
  * @param state - CcfWorkflowConfigEditorState
  * @param action - action.payload
  * @example - dispatch(updateColumnCriteria());
  * @returns - updated state
  */
    updateColumnCriteria: (state: import("immer/dist/internal").WritableDraft<enhancedWorkflowExecuteEditorState>, action: PayloadAction<entityFieldsType>) => void;
    /**
  * Action to delete entity
  * @param state - CcfWorkflowConfigEditorState
  * @param action - action.payload
  * @example - dispatch(deleteEntity());
  * @returns - updated state
  */
    deleteEntity(state: import("immer/dist/internal").WritableDraft<enhancedWorkflowExecuteEditorState>, action: PayloadAction<workflowEntityDeletion>): void;
    /**
  * Action to delete column entries for particular entity
  * @param state - CcfWorkflowConfigEditorState
  * @param action - action.payload
  * @example - dispatch(deleteColumn());
  * @returns - updated state
  */
    deleteColumn(state: import("immer/dist/internal").WritableDraft<enhancedWorkflowExecuteEditorState>, action: PayloadAction<workflowEntityFieldsDeletion>): void;
    /**
     * Action to set initializing api state value for the application
     * @param state - enhancedWorkflowExecuteEditorState
     * @param action - action.payload
    * @example - dispatch(setInitializing());
     * @returns - updated state
     */
    setInitializing(state: import("immer/dist/internal").WritableDraft<enhancedWorkflowExecuteEditorState>, action: PayloadAction<boolean>): {
        initializing: boolean;
        enhancedWorkflowConfigs: import("immer/dist/internal").WritableDraft<EnhancedWorkflowConfigs>;
        selectedEnhancedWorkflowConfig: import("immer/dist/internal").WritableDraft<Config>;
        crmSolutionInstances: import("immer/dist/internal").WritableDraft<AgentIntegrationConfiguration>[];
        componentRendered: renderedScreen;
        workflows: import("immer/dist/internal").WritableDraft<AgentIntegrationWorkflow>[];
        activeStep: number;
        entities: import("immer/dist/internal").WritableDraft<AgentIntegrationEntities>[];
        fieldsforentity: import("immer/dist/internal").WritableDraft<AgentIntegrationWorkflowEntitiesFields>[];
        selectedEntity: object;
        entityFields: import("immer/dist/internal").WritableDraft<fieldOptionType>;
        dynamicDataMappings: import("immer/dist/internal").WritableDraft<AgentIntegrationDynamicDataMapping>[];
        selectedEWEConfigIndexforEdit: number;
        loading: boolean;
        workflowTestResponse?: unknown;
    };
    /**
    * Action to set loading spinner for the application
     * @param state - enhancedWorkflowExecuteEditorState
     * @param action - action.payload
    * @example - dispatch(setLoading());
     * @returns - updated state
     */
    setLoading(state: import("immer/dist/internal").WritableDraft<enhancedWorkflowExecuteEditorState>, action: PayloadAction<boolean>): {
        loading: boolean;
        enhancedWorkflowConfigs: import("immer/dist/internal").WritableDraft<EnhancedWorkflowConfigs>;
        selectedEnhancedWorkflowConfig: import("immer/dist/internal").WritableDraft<Config>;
        crmSolutionInstances: import("immer/dist/internal").WritableDraft<AgentIntegrationConfiguration>[];
        componentRendered: renderedScreen;
        workflows: import("immer/dist/internal").WritableDraft<AgentIntegrationWorkflow>[];
        activeStep: number;
        entities: import("immer/dist/internal").WritableDraft<AgentIntegrationEntities>[];
        fieldsforentity: import("immer/dist/internal").WritableDraft<AgentIntegrationWorkflowEntitiesFields>[];
        selectedEntity: object;
        entityFields: import("immer/dist/internal").WritableDraft<fieldOptionType>;
        dynamicDataMappings: import("immer/dist/internal").WritableDraft<AgentIntegrationDynamicDataMapping>[];
        selectedEWEConfigIndexforEdit: number;
        initializing: boolean;
        workflowTestResponse?: unknown;
    };
}, string>;
export declare const CcfenhancedWorkflowExecuteEditorReducer: import("redux").Reducer<enhancedWorkflowExecuteEditorState, import("redux").AnyAction>;
export declare const CcfenhancedWorkflowExecuteEditorActions: import("@reduxjs/toolkit").CaseReducerActions<{
    /**
     * Action to set next component to render
     * @param state - enhancedWorkflowExecuteEditorState
     * @param action - action.payload
     * @example - dispatch(setEnhancedWorkflowConfigs());
     * @returns - updated state
     */
    setEnhancedWorkflowConfigs(state: import("immer/dist/internal").WritableDraft<enhancedWorkflowExecuteEditorState>, action: PayloadAction<EnhancedWorkflowConfigs>): {
        enhancedWorkflowConfigs: EnhancedWorkflowConfigs;
        selectedEnhancedWorkflowConfig: import("immer/dist/internal").WritableDraft<Config>;
        crmSolutionInstances: import("immer/dist/internal").WritableDraft<AgentIntegrationConfiguration>[];
        componentRendered: renderedScreen;
        workflows: import("immer/dist/internal").WritableDraft<AgentIntegrationWorkflow>[];
        activeStep: number;
        entities: import("immer/dist/internal").WritableDraft<AgentIntegrationEntities>[];
        fieldsforentity: import("immer/dist/internal").WritableDraft<AgentIntegrationWorkflowEntitiesFields>[];
        selectedEntity: object;
        entityFields: import("immer/dist/internal").WritableDraft<fieldOptionType>;
        dynamicDataMappings: import("immer/dist/internal").WritableDraft<AgentIntegrationDynamicDataMapping>[];
        selectedEWEConfigIndexforEdit: number;
        initializing: boolean;
        loading: boolean;
        workflowTestResponse?: unknown;
    };
    /**
     * Action to set test response in the state
     * @param state - enhancedWorkflowExecuteEditorState
     * @param action - action.payload
     * @example - dispatch(setEWEWorkflowsTestResult(responseData));
     * @returns - updated state with test response
     */
    setEWEWorkflowsTestResult(state: enhancedWorkflowExecuteEditorState, action: PayloadAction<any>): {
        workflowTestResponse: any;
        /**
         * @remarks Set previously configured Enhanced Workflow Configs
         */
        enhancedWorkflowConfigs: EnhancedWorkflowConfigs;
        /**
         * @remarks Set newly created application configuration to store for further use
         */
        selectedEnhancedWorkflowConfig: Config;
        /**
         * @remarks Set application configuration
         */
        crmSolutionInstances: AgentIntegrationConfiguration[];
        /**
         * @remarks current component rendered
         */
        componentRendered: renderedScreen;
        /**
        * @remarks Set workflows for given configuration id
        */
        workflows: AgentIntegrationWorkflow[];
        /**
        * @remarks set active step on stepper , count starts from 0
        */
        activeStep: number;
        /**
        * @remarks set active step on stepper , count starts from 0
        */
        entities: AgentIntegrationEntities[];
        /**
         * @remarks set fields for the entity
         */
        fieldsforentity: AgentIntegrationWorkflowEntitiesFields[];
        /**
         * @remarks set selected entity of the CRM
         */
        selectedEntity: object;
        /**
         * @remarks set fields for the entity
         */
        entityFields: fieldOptionType;
        /**
         * @remarks store dynamic data
         */
        dynamicDataMappings: AgentIntegrationDynamicDataMapping[];
        /**
         * @remarks store selected application existing configs index
         */
        selectedEWEConfigIndexforEdit: number;
        /**
        * @remarks store if screen is initializing
        */
        initializing: boolean;
        /**
       * @remarks store loading state for the application
       */
        loading: boolean;
    };
    /**
     * Action to set next component to render
     * @param state - enhancedWorkflowExecuteEditorState
     * @param action - action.payload
     * @example - dispatch(setSelectedConfiguration());
     * @returns - updated state
     */
    setSelectedConfiguration(state: import("immer/dist/internal").WritableDraft<enhancedWorkflowExecuteEditorState>, action: PayloadAction<Config>): {
        selectedEnhancedWorkflowConfig: Config;
        enhancedWorkflowConfigs: import("immer/dist/internal").WritableDraft<EnhancedWorkflowConfigs>;
        crmSolutionInstances: import("immer/dist/internal").WritableDraft<AgentIntegrationConfiguration>[];
        componentRendered: renderedScreen;
        workflows: import("immer/dist/internal").WritableDraft<AgentIntegrationWorkflow>[];
        activeStep: number;
        entities: import("immer/dist/internal").WritableDraft<AgentIntegrationEntities>[];
        fieldsforentity: import("immer/dist/internal").WritableDraft<AgentIntegrationWorkflowEntitiesFields>[];
        selectedEntity: object;
        entityFields: import("immer/dist/internal").WritableDraft<fieldOptionType>;
        dynamicDataMappings: import("immer/dist/internal").WritableDraft<AgentIntegrationDynamicDataMapping>[];
        selectedEWEConfigIndexforEdit: number;
        initializing: boolean;
        loading: boolean;
        workflowTestResponse?: unknown;
    };
    /**
     * Action to set crmSolutionInstances
     * @param state - enhancedWorkflowExecuteEditorState
     * @param action - action.payload
     * @example - dispatch(setCrmSolutionInstances());
     * @returns - updated state
     */
    setCrmSolutionInstances(state: import("immer/dist/internal").WritableDraft<enhancedWorkflowExecuteEditorState>, action: PayloadAction<AgentIntegrationConfigurationResult>): {
        crmSolutionInstances: AgentIntegrationConfiguration[];
        configurationByConfigurationId: Record<string, AgentIntegrationConfiguration>;
        enhancedWorkflowConfigs: import("immer/dist/internal").WritableDraft<EnhancedWorkflowConfigs>;
        selectedEnhancedWorkflowConfig: import("immer/dist/internal").WritableDraft<Config>;
        componentRendered: renderedScreen;
        workflows: import("immer/dist/internal").WritableDraft<AgentIntegrationWorkflow>[];
        activeStep: number;
        entities: import("immer/dist/internal").WritableDraft<AgentIntegrationEntities>[];
        fieldsforentity: import("immer/dist/internal").WritableDraft<AgentIntegrationWorkflowEntitiesFields>[];
        selectedEntity: object;
        entityFields: import("immer/dist/internal").WritableDraft<fieldOptionType>;
        dynamicDataMappings: import("immer/dist/internal").WritableDraft<AgentIntegrationDynamicDataMapping>[];
        selectedEWEConfigIndexforEdit: number;
        initializing: boolean;
        loading: boolean;
        workflowTestResponse?: unknown;
    };
    /**
     * Action to set next component to render
     * @param state - enhancedWorkflowExecuteEditorState
     * @param action - action.payload
     * @example - dispatch(setComponentToRender());
     * @returns - updated state
     */
    setComponentToRender(state: import("immer/dist/internal").WritableDraft<enhancedWorkflowExecuteEditorState>, action: PayloadAction<renderedScreen>): {
        componentRendered: renderedScreen;
        enhancedWorkflowConfigs: import("immer/dist/internal").WritableDraft<EnhancedWorkflowConfigs>;
        selectedEnhancedWorkflowConfig: import("immer/dist/internal").WritableDraft<Config>;
        crmSolutionInstances: import("immer/dist/internal").WritableDraft<AgentIntegrationConfiguration>[];
        workflows: import("immer/dist/internal").WritableDraft<AgentIntegrationWorkflow>[];
        activeStep: number;
        entities: import("immer/dist/internal").WritableDraft<AgentIntegrationEntities>[];
        fieldsforentity: import("immer/dist/internal").WritableDraft<AgentIntegrationWorkflowEntitiesFields>[];
        selectedEntity: object;
        entityFields: import("immer/dist/internal").WritableDraft<fieldOptionType>;
        dynamicDataMappings: import("immer/dist/internal").WritableDraft<AgentIntegrationDynamicDataMapping>[];
        selectedEWEConfigIndexforEdit: number;
        initializing: boolean;
        loading: boolean;
        workflowTestResponse?: unknown;
    };
    /**
     * Action to set workflows
     * @param state - WorkflowConfigEditorState
     * @param action - action.payload
     * @example - dispatch(setWorkflows());
     * @returns - updated state
     */
    setWorkflows(state: import("immer/dist/internal").WritableDraft<enhancedWorkflowExecuteEditorState>, action: PayloadAction<AgentIntegrationWorkflowResult>): {
        workflows: AgentIntegrationWorkflow[];
        enhancedWorkflowConfigs: import("immer/dist/internal").WritableDraft<EnhancedWorkflowConfigs>;
        selectedEnhancedWorkflowConfig: import("immer/dist/internal").WritableDraft<Config>;
        crmSolutionInstances: import("immer/dist/internal").WritableDraft<AgentIntegrationConfiguration>[];
        componentRendered: renderedScreen;
        activeStep: number;
        entities: import("immer/dist/internal").WritableDraft<AgentIntegrationEntities>[];
        fieldsforentity: import("immer/dist/internal").WritableDraft<AgentIntegrationWorkflowEntitiesFields>[];
        selectedEntity: object;
        entityFields: import("immer/dist/internal").WritableDraft<fieldOptionType>;
        dynamicDataMappings: import("immer/dist/internal").WritableDraft<AgentIntegrationDynamicDataMapping>[];
        selectedEWEConfigIndexforEdit: number;
        initializing: boolean;
        loading: boolean;
        workflowTestResponse?: unknown;
    };
    /**
     * Action to set active step on stepper , with first step as 0
     * @param state - WorkflowConfigEditorState
     * @param action - action.payload
     * @example - dispatch(setActiveStep());
     * @returns - updated state
     */
    setActiveStep(state: import("immer/dist/internal").WritableDraft<enhancedWorkflowExecuteEditorState>, action: PayloadAction<number>): {
        activeStep: number;
        enhancedWorkflowConfigs: import("immer/dist/internal").WritableDraft<EnhancedWorkflowConfigs>;
        selectedEnhancedWorkflowConfig: import("immer/dist/internal").WritableDraft<Config>;
        crmSolutionInstances: import("immer/dist/internal").WritableDraft<AgentIntegrationConfiguration>[];
        componentRendered: renderedScreen;
        workflows: import("immer/dist/internal").WritableDraft<AgentIntegrationWorkflow>[];
        entities: import("immer/dist/internal").WritableDraft<AgentIntegrationEntities>[];
        fieldsforentity: import("immer/dist/internal").WritableDraft<AgentIntegrationWorkflowEntitiesFields>[];
        selectedEntity: object;
        entityFields: import("immer/dist/internal").WritableDraft<fieldOptionType>;
        dynamicDataMappings: import("immer/dist/internal").WritableDraft<AgentIntegrationDynamicDataMapping>[];
        selectedEWEConfigIndexforEdit: number;
        initializing: boolean;
        loading: boolean;
        workflowTestResponse?: unknown;
    };
    /**
     * Action to set selected AWE Config Index , with first value as -1
     * @param state - WorkflowConfigEditorState
     * @param action - action.payload
     * @example - dispatch(setselectedEWEConfigIndex());
     * @returns - updated state
     */
    setselectedEWEConfigIndex(state: import("immer/dist/internal").WritableDraft<enhancedWorkflowExecuteEditorState>, action: PayloadAction<number>): {
        selectedEWEConfigIndexforEdit: number;
        enhancedWorkflowConfigs: import("immer/dist/internal").WritableDraft<EnhancedWorkflowConfigs>;
        selectedEnhancedWorkflowConfig: import("immer/dist/internal").WritableDraft<Config>;
        crmSolutionInstances: import("immer/dist/internal").WritableDraft<AgentIntegrationConfiguration>[];
        componentRendered: renderedScreen;
        workflows: import("immer/dist/internal").WritableDraft<AgentIntegrationWorkflow>[];
        activeStep: number;
        entities: import("immer/dist/internal").WritableDraft<AgentIntegrationEntities>[];
        fieldsforentity: import("immer/dist/internal").WritableDraft<AgentIntegrationWorkflowEntitiesFields>[];
        selectedEntity: object;
        entityFields: import("immer/dist/internal").WritableDraft<fieldOptionType>;
        dynamicDataMappings: import("immer/dist/internal").WritableDraft<AgentIntegrationDynamicDataMapping>[];
        initializing: boolean;
        loading: boolean;
        workflowTestResponse?: unknown;
    };
    /**
     * Action to set workflows
     * @param state - WorkflowConfigEditorState
     * @param action - action.payload
     * @example - dispatch(setWorkflows());
     * @returns - updated state
     */
    setEntities(state: import("immer/dist/internal").WritableDraft<enhancedWorkflowExecuteEditorState>, action: PayloadAction<AgentIntegrationWorkflowEntities>): {
        entities: AgentIntegrationEntities[];
        enhancedWorkflowConfigs: import("immer/dist/internal").WritableDraft<EnhancedWorkflowConfigs>;
        selectedEnhancedWorkflowConfig: import("immer/dist/internal").WritableDraft<Config>;
        crmSolutionInstances: import("immer/dist/internal").WritableDraft<AgentIntegrationConfiguration>[];
        componentRendered: renderedScreen;
        workflows: import("immer/dist/internal").WritableDraft<AgentIntegrationWorkflow>[];
        activeStep: number;
        fieldsforentity: import("immer/dist/internal").WritableDraft<AgentIntegrationWorkflowEntitiesFields>[];
        selectedEntity: object;
        entityFields: import("immer/dist/internal").WritableDraft<fieldOptionType>;
        dynamicDataMappings: import("immer/dist/internal").WritableDraft<AgentIntegrationDynamicDataMapping>[];
        selectedEWEConfigIndexforEdit: number;
        initializing: boolean;
        loading: boolean;
        workflowTestResponse?: unknown;
    };
    /**
     * Action to set workflows
     * @param state - WorkflowConfigEditorState
     * @param action - action.payload
     * @example - dispatch(setWorkflows());
     * @returns - updated state
     */
    setselectedEntity(state: import("immer/dist/internal").WritableDraft<enhancedWorkflowExecuteEditorState>, action: PayloadAction<AgentIntegrationEntities>): {
        selectedEntity: AgentIntegrationEntities;
        enhancedWorkflowConfigs: import("immer/dist/internal").WritableDraft<EnhancedWorkflowConfigs>;
        selectedEnhancedWorkflowConfig: import("immer/dist/internal").WritableDraft<Config>;
        crmSolutionInstances: import("immer/dist/internal").WritableDraft<AgentIntegrationConfiguration>[];
        componentRendered: renderedScreen;
        workflows: import("immer/dist/internal").WritableDraft<AgentIntegrationWorkflow>[];
        activeStep: number;
        entities: import("immer/dist/internal").WritableDraft<AgentIntegrationEntities>[];
        fieldsforentity: import("immer/dist/internal").WritableDraft<AgentIntegrationWorkflowEntitiesFields>[];
        entityFields: import("immer/dist/internal").WritableDraft<fieldOptionType>;
        dynamicDataMappings: import("immer/dist/internal").WritableDraft<AgentIntegrationDynamicDataMapping>[];
        selectedEWEConfigIndexforEdit: number;
        initializing: boolean;
        loading: boolean;
        workflowTestResponse?: unknown;
    };
    /**
     * Action to set workflows
     * @param state - WorkflowConfigEditorState
     * @param action - action.payload
     * @example - dispatch(setWorkflows());
     * @returns - updated state
     */
    setEntityFields(state: import("immer/dist/internal").WritableDraft<enhancedWorkflowExecuteEditorState>, action: PayloadAction<fieldOptionType>): {
        entityFields: {
            [x: string]: AgentIntegrationFieldsParams[] | import("immer/dist/internal").WritableDraft<AgentIntegrationFieldsParams>[];
        };
        enhancedWorkflowConfigs: import("immer/dist/internal").WritableDraft<EnhancedWorkflowConfigs>;
        selectedEnhancedWorkflowConfig: import("immer/dist/internal").WritableDraft<Config>;
        crmSolutionInstances: import("immer/dist/internal").WritableDraft<AgentIntegrationConfiguration>[];
        componentRendered: renderedScreen;
        workflows: import("immer/dist/internal").WritableDraft<AgentIntegrationWorkflow>[];
        activeStep: number;
        entities: import("immer/dist/internal").WritableDraft<AgentIntegrationEntities>[];
        fieldsforentity: import("immer/dist/internal").WritableDraft<AgentIntegrationWorkflowEntitiesFields>[];
        selectedEntity: object;
        dynamicDataMappings: import("immer/dist/internal").WritableDraft<AgentIntegrationDynamicDataMapping>[];
        selectedEWEConfigIndexforEdit: number;
        initializing: boolean;
        loading: boolean;
        workflowTestResponse?: unknown;
    };
    /**
     * Action to set setDynamicDataMappings
     * @param state - CcfWorkflowConfigEditorState
     * @param action - action.payload
     * @example - dispatch(setDynamicDataMappings());
     * @returns - updated state
     */
    setDynamicDataMappings: (state: import("immer/dist/internal").WritableDraft<enhancedWorkflowExecuteEditorState>, action: PayloadAction<any>) => {
        dynamicDataMappings: any[];
        enhancedWorkflowConfigs: import("immer/dist/internal").WritableDraft<EnhancedWorkflowConfigs>;
        selectedEnhancedWorkflowConfig: import("immer/dist/internal").WritableDraft<Config>;
        crmSolutionInstances: import("immer/dist/internal").WritableDraft<AgentIntegrationConfiguration>[];
        componentRendered: renderedScreen;
        workflows: import("immer/dist/internal").WritableDraft<AgentIntegrationWorkflow>[];
        activeStep: number;
        entities: import("immer/dist/internal").WritableDraft<AgentIntegrationEntities>[];
        fieldsforentity: import("immer/dist/internal").WritableDraft<AgentIntegrationWorkflowEntitiesFields>[];
        selectedEntity: object;
        entityFields: import("immer/dist/internal").WritableDraft<fieldOptionType>;
        selectedEWEConfigIndexforEdit: number;
        initializing: boolean;
        loading: boolean;
        workflowTestResponse?: unknown;
    };
    /**
    * Action to set addRow
    * @param state - CcfWorkflowConfigEditorState
    * @param action - action.payload
    * @example - dispatch(setDynamicDataMappings());
    * @returns - updated state
    */
    addRow(state: import("immer/dist/internal").WritableDraft<enhancedWorkflowExecuteEditorState>, action: PayloadAction<AgentIntegrationWorkflowRowOperation>): void;
    /**
    * Action to reset page when configuration changes
    * @param state - enhancedWorkflowExecuteEditorState
    * @param action - action.payload
    * @example - dispatch(resetPage());
    * @returns - updated state
    */
    resetPage(state: import("immer/dist/internal").WritableDraft<enhancedWorkflowExecuteEditorState>): void;
    /**
    * Action to update entity display name
    * @param state - CcfWorkflowConfigEditorState
    * @param action - action.payload
    * @example - dispatch(updateEntityDisplayName());
    * @returns - updated state
    */
    updateEntityDisplayName(state: import("immer/dist/internal").WritableDraft<enhancedWorkflowExecuteEditorState>, action: PayloadAction<{
        entityIndex: number;
        displayName: string;
    }>): void;
    /**
    * Action to set addRow
    * @param state - CcfWorkflowConfigEditorState
    * @param action - action.payload
    * @example - dispatch(setDynamicDataMappings());
    * @returns - updated state
    */
    addEntityRow(state: import("immer/dist/internal").WritableDraft<enhancedWorkflowExecuteEditorState>, action: PayloadAction<AgentIntegrationWorkflowRowOperation>): void;
    /**
  * Action to update columncriteria fields
  * @param state - CcfWorkflowConfigEditorState
  * @param action - action.payload
  * @example - dispatch(updateColumnCriteria());
  * @returns - updated state
  */
    updateColumnCriteria: (state: import("immer/dist/internal").WritableDraft<enhancedWorkflowExecuteEditorState>, action: PayloadAction<entityFieldsType>) => void;
    /**
  * Action to delete entity
  * @param state - CcfWorkflowConfigEditorState
  * @param action - action.payload
  * @example - dispatch(deleteEntity());
  * @returns - updated state
  */
    deleteEntity(state: import("immer/dist/internal").WritableDraft<enhancedWorkflowExecuteEditorState>, action: PayloadAction<workflowEntityDeletion>): void;
    /**
  * Action to delete column entries for particular entity
  * @param state - CcfWorkflowConfigEditorState
  * @param action - action.payload
  * @example - dispatch(deleteColumn());
  * @returns - updated state
  */
    deleteColumn(state: import("immer/dist/internal").WritableDraft<enhancedWorkflowExecuteEditorState>, action: PayloadAction<workflowEntityFieldsDeletion>): void;
    /**
     * Action to set initializing api state value for the application
     * @param state - enhancedWorkflowExecuteEditorState
     * @param action - action.payload
    * @example - dispatch(setInitializing());
     * @returns - updated state
     */
    setInitializing(state: import("immer/dist/internal").WritableDraft<enhancedWorkflowExecuteEditorState>, action: PayloadAction<boolean>): {
        initializing: boolean;
        enhancedWorkflowConfigs: import("immer/dist/internal").WritableDraft<EnhancedWorkflowConfigs>;
        selectedEnhancedWorkflowConfig: import("immer/dist/internal").WritableDraft<Config>;
        crmSolutionInstances: import("immer/dist/internal").WritableDraft<AgentIntegrationConfiguration>[];
        componentRendered: renderedScreen;
        workflows: import("immer/dist/internal").WritableDraft<AgentIntegrationWorkflow>[];
        activeStep: number;
        entities: import("immer/dist/internal").WritableDraft<AgentIntegrationEntities>[];
        fieldsforentity: import("immer/dist/internal").WritableDraft<AgentIntegrationWorkflowEntitiesFields>[];
        selectedEntity: object;
        entityFields: import("immer/dist/internal").WritableDraft<fieldOptionType>;
        dynamicDataMappings: import("immer/dist/internal").WritableDraft<AgentIntegrationDynamicDataMapping>[];
        selectedEWEConfigIndexforEdit: number;
        loading: boolean;
        workflowTestResponse?: unknown;
    };
    /**
    * Action to set loading spinner for the application
     * @param state - enhancedWorkflowExecuteEditorState
     * @param action - action.payload
    * @example - dispatch(setLoading());
     * @returns - updated state
     */
    setLoading(state: import("immer/dist/internal").WritableDraft<enhancedWorkflowExecuteEditorState>, action: PayloadAction<boolean>): {
        loading: boolean;
        enhancedWorkflowConfigs: import("immer/dist/internal").WritableDraft<EnhancedWorkflowConfigs>;
        selectedEnhancedWorkflowConfig: import("immer/dist/internal").WritableDraft<Config>;
        crmSolutionInstances: import("immer/dist/internal").WritableDraft<AgentIntegrationConfiguration>[];
        componentRendered: renderedScreen;
        workflows: import("immer/dist/internal").WritableDraft<AgentIntegrationWorkflow>[];
        activeStep: number;
        entities: import("immer/dist/internal").WritableDraft<AgentIntegrationEntities>[];
        fieldsforentity: import("immer/dist/internal").WritableDraft<AgentIntegrationWorkflowEntitiesFields>[];
        selectedEntity: object;
        entityFields: import("immer/dist/internal").WritableDraft<fieldOptionType>;
        dynamicDataMappings: import("immer/dist/internal").WritableDraft<AgentIntegrationDynamicDataMapping>[];
        selectedEWEConfigIndexforEdit: number;
        initializing: boolean;
        workflowTestResponse?: unknown;
    };
}, string>;
export declare const getapplicationEWEConfiguration: ((state: enhancedWorkflowExecuteRootState) => EnhancedWorkflowConfigs) & import("reselect").OutputSelectorFields<(args_0: enhancedWorkflowExecuteEditorState) => EnhancedWorkflowConfigs & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const getnewEWEConfigurationCreated: ((state: enhancedWorkflowExecuteRootState) => Config) & import("reselect").OutputSelectorFields<(args_0: enhancedWorkflowExecuteEditorState) => Config & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const getConfigurations: ((state: enhancedWorkflowExecuteRootState) => AgentIntegrationConfiguration[]) & import("reselect").OutputSelectorFields<(args_0: enhancedWorkflowExecuteEditorState) => AgentIntegrationConfiguration[] & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const getCurrentComponentRendered: ((state: enhancedWorkflowExecuteRootState) => renderedScreen) & import("reselect").OutputSelectorFields<(args_0: enhancedWorkflowExecuteEditorState) => renderedScreen & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const getWorkflows: ((state: enhancedWorkflowExecuteRootState) => AgentIntegrationWorkflow[]) & import("reselect").OutputSelectorFields<(args_0: enhancedWorkflowExecuteEditorState) => AgentIntegrationWorkflow[] & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const getActiveStep: ((state: enhancedWorkflowExecuteRootState) => number) & import("reselect").OutputSelectorFields<(args_0: enhancedWorkflowExecuteEditorState) => number & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const getSelectedAWEConfigIndex: ((state: enhancedWorkflowExecuteRootState) => number) & import("reselect").OutputSelectorFields<(args_0: enhancedWorkflowExecuteEditorState) => number & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const getEntities: ((state: enhancedWorkflowExecuteRootState) => AgentIntegrationEntities[]) & import("reselect").OutputSelectorFields<(args_0: enhancedWorkflowExecuteEditorState) => AgentIntegrationEntities[] & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const getEntitiesFields: ((state: enhancedWorkflowExecuteRootState) => fieldOptionType) & import("reselect").OutputSelectorFields<(args_0: enhancedWorkflowExecuteEditorState) => fieldOptionType & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const getDynamicDataMappings: ((state: enhancedWorkflowExecuteRootState) => AgentIntegrationDynamicDataMapping[]) & import("reselect").OutputSelectorFields<(args_0: enhancedWorkflowExecuteEditorState) => AgentIntegrationDynamicDataMapping[] & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const getInitializing: ((state: enhancedWorkflowExecuteRootState) => boolean) & import("reselect").OutputSelectorFields<(args_0: enhancedWorkflowExecuteEditorState) => boolean & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const getLoadingstate: ((state: enhancedWorkflowExecuteRootState) => boolean) & import("reselect").OutputSelectorFields<(args_0: enhancedWorkflowExecuteEditorState) => boolean & {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export declare const getEWEWorkflowsTest: ((state: enhancedWorkflowExecuteRootState) => unknown) & import("reselect").OutputSelectorFields<(args_0: enhancedWorkflowExecuteEditorState) => {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
export * as thunks from './thunks';
