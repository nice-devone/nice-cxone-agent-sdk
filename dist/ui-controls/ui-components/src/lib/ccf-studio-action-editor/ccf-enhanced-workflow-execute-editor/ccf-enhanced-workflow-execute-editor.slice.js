import { createSelector, createSlice } from '@reduxjs/toolkit';
import CONSTANTS from './constants';
export const ENHANCED_WORKFLOW_EXECUTE_EDITOR_SLICE_KEY = CONSTANTS.ENHANCED_WORKFLOW_EXECUTE_EDITOR_SLICE_KEY;
export var renderedScreen;
(function (renderedScreen) {
    renderedScreen["HOME_SCREEN"] = "homeScreen";
    renderedScreen["GENERAL_INFORMATION"] = "generalInformation";
    renderedScreen["PHONE_EMAIL_SEARCH"] = "phoneEmailSearch";
    renderedScreen["CUSTOM_SEARCH_FILTER"] = "customSearchFilter";
    renderedScreen["CUSTOM_SEARCH"] = "customSearch";
    renderedScreen["SUMMARY_TEST"] = "summaryTest";
    renderedScreen["AUTOMATIC_CREATE_FILTER"] = "automaticCreate";
    renderedScreen["AUTO_MANUAL_CREATE"] = "automanualCreate";
    renderedScreen["MANUAL_CREATE_FILTER"] = "manualCreateFilter";
})(renderedScreen || (renderedScreen = {}));
/**
 * Initial state for new AWE configuration created
 */
export const initialnewEWEConfigurationCreated = {
    name: '',
    configId: '',
    workflowId: '',
    workflowType: '',
    workflowSubtype: '',
    dynamicDataMappingId: '',
    crmName: '',
    workflowInputPayload: {},
    phoneNumber: '',
    emailAddress: '',
    screenPop: '',
    entities: [],
};
/**
 * Application state.
 */
export const initialCcfenhancedWorkflowExecuteEditorState = {
    componentRendered: renderedScreen.HOME_SCREEN,
    enhancedWorkflowConfigs: { version: '1.0', configs: [] },
    selectedEnhancedWorkflowConfig: initialnewEWEConfigurationCreated,
    crmSolutionInstances: [],
    workflows: [],
    activeStep: 0,
    entities: [],
    fieldsforentity: [],
    selectedEntity: {},
    entityFields: {},
    dynamicDataMappings: [],
    selectedEWEConfigIndexforEdit: -1,
    initializing: true,
    loading: true,
};
export const enhancedworkflowExecuteEditorSlice = createSlice({
    name: CONSTANTS.ENHANCED_WORKFLOW_EXECUTE_EDITOR_SLICE_KEY,
    initialState: initialCcfenhancedWorkflowExecuteEditorState,
    reducers: {
        /**
         * Action to set next component to render
         * @param state - enhancedWorkflowExecuteEditorState
         * @param action - action.payload
         * @example - dispatch(setEnhancedWorkflowConfigs());
         * @returns - updated state
         */
        setEnhancedWorkflowConfigs(state, action) {
            return Object.assign(Object.assign({}, state), { enhancedWorkflowConfigs: action.payload });
        },
        /* eslint-disable @typescript-eslint/no-explicit-any */
        /**
         * Action to set test response in the state
         * @param state - enhancedWorkflowExecuteEditorState
         * @param action - action.payload
         * @example - dispatch(setEWEWorkflowsTestResult(responseData));
         * @returns - updated state with test response
         */
        setEWEWorkflowsTestResult(state, action) {
            return Object.assign(Object.assign({}, state), { workflowTestResponse: action.payload }); // Store the response in a new property 'workflowTestResponse'
        },
        /* eslint-disable @typescript-eslint/no-explicit-any */
        /**
         * Action to set next component to render
         * @param state - enhancedWorkflowExecuteEditorState
         * @param action - action.payload
         * @example - dispatch(setSelectedConfiguration());
         * @returns - updated state
         */
        setSelectedConfiguration(state, action) {
            return Object.assign(Object.assign({}, state), { selectedEnhancedWorkflowConfig: action.payload });
        },
        /**
         * Action to set crmSolutionInstances
         * @param state - enhancedWorkflowExecuteEditorState
         * @param action - action.payload
         * @example - dispatch(setCrmSolutionInstances());
         * @returns - updated state
         */
        setCrmSolutionInstances(state, action) {
            var _a;
            const { configurations = [] } = (_a = action.payload) !== null && _a !== void 0 ? _a : {};
            const configurationByConfigurationId = configurations.reduce((object, configuration) => {
                object[configuration.id] = configuration;
                return object;
            }, {});
            return Object.assign(Object.assign({}, state), { crmSolutionInstances: configurations, configurationByConfigurationId });
        },
        /**
         * Action to set next component to render
         * @param state - enhancedWorkflowExecuteEditorState
         * @param action - action.payload
         * @example - dispatch(setComponentToRender());
         * @returns - updated state
         */
        setComponentToRender(state, action) {
            return Object.assign(Object.assign({}, state), { componentRendered: action.payload });
        },
        /**
         * Action to set workflows
         * @param state - WorkflowConfigEditorState
         * @param action - action.payload
         * @example - dispatch(setWorkflows());
         * @returns - updated state
         */
        setWorkflows(state, action) {
            var _a;
            const { workflows = [] } = (_a = action.payload) !== null && _a !== void 0 ? _a : {};
            return Object.assign(Object.assign({}, state), { workflows: [...workflows] });
        },
        /**
         * Action to set active step on stepper , with first step as 0
         * @param state - WorkflowConfigEditorState
         * @param action - action.payload
         * @example - dispatch(setActiveStep());
         * @returns - updated state
         */
        setActiveStep(state, action) {
            return Object.assign(Object.assign({}, state), { activeStep: action.payload });
        },
        /**
         * Action to set selected AWE Config Index , with first value as -1
         * @param state - WorkflowConfigEditorState
         * @param action - action.payload
         * @example - dispatch(setselectedEWEConfigIndex());
         * @returns - updated state
         */
        setselectedEWEConfigIndex(state, action) {
            return Object.assign(Object.assign({}, state), { selectedEWEConfigIndexforEdit: action.payload });
        },
        /**
         * Action to set workflows
         * @param state - WorkflowConfigEditorState
         * @param action - action.payload
         * @example - dispatch(setWorkflows());
         * @returns - updated state
         */
        setEntities(state, action) {
            var _a;
            const { entities = [] } = (_a = action.payload) !== null && _a !== void 0 ? _a : {};
            return Object.assign(Object.assign({}, state), { entities: [...entities] });
        },
        /**
         * Action to set workflows
         * @param state - WorkflowConfigEditorState
         * @param action - action.payload
         * @example - dispatch(setWorkflows());
         * @returns - updated state
         */
        setselectedEntity(state, action) {
            return Object.assign(Object.assign({}, state), { selectedEntity: action.payload });
        },
        /**
         * Action to set workflows
         * @param state - WorkflowConfigEditorState
         * @param action - action.payload
         * @example - dispatch(setWorkflows());
         * @returns - updated state
         */
        setEntityFields(state, action) {
            return Object.assign(Object.assign({}, state), { entityFields: Object.assign(Object.assign({}, state.entityFields), action.payload) });
        },
        /**
         * Action to set setDynamicDataMappings
         * @param state - CcfWorkflowConfigEditorState
         * @param action - action.payload
         * @example - dispatch(setDynamicDataMappings());
         * @returns - updated state
         */
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setDynamicDataMappings: (state, action) => {
            var _a;
            const { dynamicDataMappings = [] } = (_a = action.payload) !== null && _a !== void 0 ? _a : {};
            const activeDataMappings = (dynamicDataMappings !== null && dynamicDataMappings !== void 0 ? dynamicDataMappings : []).filter(({ status = '' }) => status.toLocaleLowerCase() === 'active');
            return Object.assign(Object.assign({}, state), { dynamicDataMappings: [...activeDataMappings] });
        },
        /**
        * Action to set addRow
        * @param state - CcfWorkflowConfigEditorState
        * @param action - action.payload
        * @example - dispatch(setDynamicDataMappings());
        * @returns - updated state
        */
        addRow(state, action) {
            const { entity, row, entityAPIName } = action.payload;
            const addedEntity = state.selectedEnhancedWorkflowConfig.entities.find((entityArray) => entityArray.entityName === entity);
            if (!addedEntity) {
                state.selectedEnhancedWorkflowConfig.entities.push({
                    entityName: entity,
                    entityAPIName: entityAPIName,
                    columns: [
                        {
                            columnName: row.fieldName,
                            columnAPIName: '',
                            operator: row.operator,
                            value: row.variable,
                            condition: row.condition, // radiobutton action from user
                        }
                    ],
                });
            }
        },
        /**
        * Action to reset page when configuration changes
        * @param state - enhancedWorkflowExecuteEditorState
        * @param action - action.payload
        * @example - dispatch(resetPage());
        * @returns - updated state
        */
        resetPage(state) {
            state.selectedEnhancedWorkflowConfig.entities = [];
            state.selectedEnhancedWorkflowConfig.workflowId = '';
        },
        /**
        * Action to update entity display name
        * @param state - CcfWorkflowConfigEditorState
        * @param action - action.payload
        * @example - dispatch(updateEntityDisplayName());
        * @returns - updated state
        */
        updateEntityDisplayName(state, action) {
            const { entityIndex, displayName } = action.payload;
            state.selectedEnhancedWorkflowConfig.entities[entityIndex].displayName = displayName;
        },
        /**
        * Action to set addRow
        * @param state - CcfWorkflowConfigEditorState
        * @param action - action.payload
        * @example - dispatch(setDynamicDataMappings());
        * @returns - updated state
        */
        addEntityRow(state, action) {
            const { entity, row } = action.payload;
            const existingEntity = state.selectedEnhancedWorkflowConfig.entities.find((e) => e.entityName === entity);
            if (existingEntity) {
                existingEntity.columns.push({
                    columnName: row.fieldName,
                    columnAPIName: '',
                    operator: row.operator,
                    value: row.variable,
                    condition: row.condition, // radiobutton action from user
                });
            }
        },
        /**
      * Action to update columncriteria fields
      * @param state - CcfWorkflowConfigEditorState
      * @param action - action.payload
      * @example - dispatch(updateColumnCriteria());
      * @returns - updated state
      */
        updateColumnCriteria: (state, action) => {
            const { entityIndex, paramIndex, fieldName, value, label } = action.payload;
            const columnCriteria = state.selectedEnhancedWorkflowConfig.entities[entityIndex].columns[paramIndex];
            if (fieldName === 'fieldName') {
                columnCriteria.columnName = label !== null && label !== void 0 ? label : '';
                columnCriteria.columnAPIName = value;
            }
            else if (fieldName === 'operator') {
                columnCriteria.operator = value;
            }
            else if (fieldName === 'variable') {
                columnCriteria.value = value;
            }
            else if (fieldName === 'condition') {
                columnCriteria.condition = value;
            }
        },
        /**
      * Action to delete entity
      * @param state - CcfWorkflowConfigEditorState
      * @param action - action.payload
      * @example - dispatch(deleteEntity());
      * @returns - updated state
      */
        deleteEntity(state, action) {
            const { entityIndex } = action.payload;
            state.selectedEnhancedWorkflowConfig.entities.splice(entityIndex, 1);
        },
        /**
      * Action to delete column entries for particular entity
      * @param state - CcfWorkflowConfigEditorState
      * @param action - action.payload
      * @example - dispatch(deleteColumn());
      * @returns - updated state
      */
        deleteColumn(state, action) {
            const { entityIndex, paramIndex } = action.payload;
            state.selectedEnhancedWorkflowConfig.entities[entityIndex].columns.splice(paramIndex, 1);
        },
        /**
         * Action to set initializing api state value for the application
         * @param state - enhancedWorkflowExecuteEditorState
         * @param action - action.payload
        * @example - dispatch(setInitializing());
         * @returns - updated state
         */
        setInitializing(state, action) {
            return Object.assign(Object.assign({}, state), { initializing: action.payload });
        },
        /**
        * Action to set loading spinner for the application
         * @param state - enhancedWorkflowExecuteEditorState
         * @param action - action.payload
        * @example - dispatch(setLoading());
         * @returns - updated state
         */
        setLoading(state, action) {
            return Object.assign(Object.assign({}, state), { loading: action.payload });
        },
    },
});
export const CcfenhancedWorkflowExecuteEditorReducer = enhancedworkflowExecuteEditorSlice.reducer;
export const CcfenhancedWorkflowExecuteEditorActions = enhancedworkflowExecuteEditorSlice.actions;
/**
 * @param rootState - root state
 * @example - getWorkflowExecuteEditorState
 */
const getWorkflowExecuteEditorState = (rootState) => rootState.enhancedworkflowExecuteEditorSlice;
export const getapplicationEWEConfiguration = createSelector(getWorkflowExecuteEditorState, (state) => state.enhancedWorkflowConfigs);
export const getnewEWEConfigurationCreated = createSelector(getWorkflowExecuteEditorState, (state) => state.selectedEnhancedWorkflowConfig);
export const getConfigurations = createSelector(getWorkflowExecuteEditorState, (state) => state.crmSolutionInstances);
export const getCurrentComponentRendered = createSelector(getWorkflowExecuteEditorState, (state) => state.componentRendered);
export const getWorkflows = createSelector(getWorkflowExecuteEditorState, (state) => state.workflows);
export const getActiveStep = createSelector(getWorkflowExecuteEditorState, (state) => state.activeStep);
export const getSelectedAWEConfigIndex = createSelector(getWorkflowExecuteEditorState, (state) => state.selectedEWEConfigIndexforEdit);
export const getEntities = createSelector(getWorkflowExecuteEditorState, (state) => state.entities);
export const getEntitiesFields = createSelector(getWorkflowExecuteEditorState, (state) => {
    return state.entityFields;
});
export const getDynamicDataMappings = createSelector(getWorkflowExecuteEditorState, (state) => state.dynamicDataMappings);
export const getInitializing = createSelector(getWorkflowExecuteEditorState, (state) => state.initializing);
export const getLoadingstate = createSelector(getWorkflowExecuteEditorState, (state) => state.loading);
export const getEWEWorkflowsTest = createSelector(getWorkflowExecuteEditorState, (state) => state.workflowTestResponse);
export * as thunks from './thunks';
//# sourceMappingURL=ccf-enhanced-workflow-execute-editor.slice.js.map