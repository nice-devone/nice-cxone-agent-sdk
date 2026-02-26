import { createSelector, createSlice, } from '@reduxjs/toolkit';
export const WORKFLOW_CONFIG_EDITOR_SLICE_KEY = 'workflowConfigEditorSlice';
// #region CONSTANTS: Action.
export const WORKFLOW_CONFIG_ACTIONS = {
    TIMELINE: 'Timeline',
    DATA_MEMORIALIZATION: 'DataMemorialization',
    SEARCH: 'Search',
    DYNAMIC_DATA: 'DynamicData',
};
const WORKFLOW_CONFIG_ACTION_LABELS = {
    TIMELINE: 'Create Timeline',
    DATA_MEMORIALIZATION: 'Data Memorialization',
    SEARCH: 'Search',
    DYNAMIC_DATA: 'Dynamic Search',
};
const WORKFLOW_CONFIG_ACTIONS_FOR_DROPDOWN = [
    {
        value: WORKFLOW_CONFIG_ACTIONS.TIMELINE,
        label: WORKFLOW_CONFIG_ACTION_LABELS.TIMELINE,
    },
    {
        value: WORKFLOW_CONFIG_ACTIONS.DATA_MEMORIALIZATION,
        label: WORKFLOW_CONFIG_ACTION_LABELS.DATA_MEMORIALIZATION,
    },
    {
        value: WORKFLOW_CONFIG_ACTIONS.SEARCH,
        label: WORKFLOW_CONFIG_ACTION_LABELS.SEARCH,
    }
];
const WORKFLOW_CONFIG_ACTIONS_MAP_VALUE_TO_LABEL = {
    [WORKFLOW_CONFIG_ACTIONS.TIMELINE]: WORKFLOW_CONFIG_ACTION_LABELS.TIMELINE,
    [WORKFLOW_CONFIG_ACTIONS.DATA_MEMORIALIZATION]: WORKFLOW_CONFIG_ACTION_LABELS.DATA_MEMORIALIZATION,
    [WORKFLOW_CONFIG_ACTIONS.SEARCH]: WORKFLOW_CONFIG_ACTION_LABELS.SEARCH,
    [WORKFLOW_CONFIG_ACTIONS.DYNAMIC_DATA]: WORKFLOW_CONFIG_ACTION_LABELS.DYNAMIC_DATA,
};
export const initialCcfWorkflowConfigEditorState = {
    configurations: [],
    configurationByConfigurationId: {},
    selectedConfigurations: [],
    selectedActions: [],
    workflowMappingSelections: [],
    workflowMappingGridData: [],
    studioActionResult: [],
    workflowsByConfigurations: {},
    dataMappingsByConfigurations: {},
    dynamicDataMappingsByConfigurations: {},
    actionsForDropdown: [],
    studioDataInput: {},
    initializing: true,
    workflowMappingGridMessage: '',
    open: false,
    loading: false,
    selection: undefined,
};
export const workflowConfigEditorSlice = createSlice({
    name: WORKFLOW_CONFIG_EDITOR_SLICE_KEY,
    initialState: initialCcfWorkflowConfigEditorState,
    reducers: {
        /**
         * Action to set configurations
         * @param state - WorkflowConfigEditorState
         * @param action - action.payload
         * @example - dispatch(setConfigurations());
         * @returns - updated state
         */
        setConfigurations(state, action) {
            var _a;
            const { configurations = [] } = (_a = action.payload) !== null && _a !== void 0 ? _a : {};
            const configurationByConfigurationId = configurations.reduce((object, configuration) => {
                object[configuration.id] = configuration;
                return object;
            }, {});
            return Object.assign(Object.assign({}, state), { configurations: configurations, configurationByConfigurationId });
        },
        /**
         * Action to set workflows
         * @param state - WorkflowConfigEditorState
         * @param action - action.payload
         * @example - dispatch(setWorkflows());
         * @returns - updated state
         */
        setWorkflows: (state, action) => {
            var _a;
            const { id, workflows = [], dynamicDataMappings = [] } = (_a = action.payload) !== null && _a !== void 0 ? _a : {};
            const workflowsByConfigurations = Object.assign({}, state.workflowsByConfigurations);
            const activeDynamicDataMappings = dynamicDataMappings.filter(({ status = '' }) => status.toLocaleLowerCase() === 'active');
            if (id && workflows.length > 0) {
                workflowsByConfigurations[id] = [...workflows, ...activeDynamicDataMappings];
            }
            return Object.assign(Object.assign({}, state), { workflowsByConfigurations });
        },
        /**
         * Action to set setDataMappings
         * @param state - WorkflowConfigEditorState
         * @param action - action.payload
         * @example - dispatch(setDataMappings());
         * @returns - updated state
         */
        setDataMappings: (state, action) => {
            var _a;
            const { configurationId, dataMappings = [] } = (_a = action.payload) !== null && _a !== void 0 ? _a : {};
            const activeDataMappings = dataMappings.filter(({ status = '' }) => status.toLocaleLowerCase() === 'active');
            const dataMappingsByConfigurations = Object.assign({}, state.dataMappingsByConfigurations);
            if (configurationId) {
                dataMappingsByConfigurations[configurationId] = activeDataMappings;
            }
            return Object.assign(Object.assign({}, state), { dataMappingsByConfigurations });
        },
        /**
         * Action to set setDynamicDataMappings
         * @param state - WorkflowConfigEditorState
         * @param action - action.payload
         * @example - dispatch(setDynamicDataMappings());
         * @returns - updated state
         */
        setDynamicDataMappings: (state, action) => {
            var _a;
            const { configurationId, dynamicDataMappings } = (_a = action.payload) !== null && _a !== void 0 ? _a : {};
            const activeDataMappings = (dynamicDataMappings !== null && dynamicDataMappings !== void 0 ? dynamicDataMappings : []).filter(({ status = '' }) => status.toLocaleLowerCase() === 'active');
            const dynamicDataMappingsByConfigurations = Object.assign({}, state.dynamicDataMappingsByConfigurations);
            if (configurationId) {
                dynamicDataMappingsByConfigurations[configurationId] = activeDataMappings;
            }
            return Object.assign(Object.assign({}, state), { dynamicDataMappingsByConfigurations });
        },
        /**
         * Action to remove configuration
         * @param state - WorkflowConfigEditorState
         * @param action - action.payload
         * @example - dispatch(removeSelectedAgentConfiguration(configuration: Configuration));
         * @returns - updated state
         */
        removeSelectedAgentConfiguration: (state, action) => {
            const selectedConfigurations = [...state.selectedConfigurations].filter((selectedConfiguration) => { var _a; return (selectedConfiguration === null || selectedConfiguration === void 0 ? void 0 : selectedConfiguration.id) !== ((_a = action === null || action === void 0 ? void 0 : action.payload) === null || _a === void 0 ? void 0 : _a.id); });
            return Object.assign(Object.assign({}, state), { selectedConfigurations });
        },
        /**
         * Action to set set Selected AgentConfigurations
         * @param state - WorkflowConfigEditorState
         * @param action - action.payload
         * @example - dispatch(setSelectedAgentConfigurations([configurationId_1, configurationId_2, ...]));
         * @returns - updated state
         */
        setSelectedAgentConfigurations: (state, action) => (Object.assign(Object.assign({}, state), { selectedConfigurations: action.payload })),
        /**
         * Action to clear all selected configurations from state
         * @param state - WorkflowConfigEditorState
         * @param action - action.payload
         * @example - dispatch(setCurrentWorkflowData('search'));
         * @returns - updated state
         */
        clearSelectedAgentConfigurations: (state) => (Object.assign(Object.assign({}, state), { selectedConfigurations: [] })),
        /**
         * Action to remove agent action
         * @param state - WorkflowConfigEditorState
         * @param action - action.payload
         * @example - dispatch(removeSelectedAgentAction(workflowAction: ));
         * @returns - updated state
         */
        removeSelectedAgentAction: (state, action) => {
            const selectedActions = [...state.selectedActions].filter((selectedAction) => selectedAction !== action.payload);
            return Object.assign(Object.assign({}, state), { selectedActions });
        },
        /**
         * Action to set all selected agent actions
         * @param state - WorkflowConfigEditorState
         * @param action - action.payload
         * @example - dispatch(setSelectedAgentActions());
         * @returns - updated state
         */
        setSelectedAgentActions: (state, action) => (Object.assign(Object.assign({}, state), { selectedActions: action.payload })),
        /**
         * Action to clear all selected agent actions from state
         * @param state - WorkflowConfigEditorState
         * @param action - action.payload
         * @example - dispatch(clearSelectedAgentActions());
         * @returns - updated state
         */
        clearSelectedAgentActions: (state) => (Object.assign(Object.assign({}, state), { selectedActions: [] })),
        /**
         * Action to set data for workflow mapping grid
         * @param state - WorkflowConfigEditorState
         * @param action - action.payload
         * @example - dispatch(setWorkflowMappingGridData());
         * @returns - updated state
         */
        setWorkflowMappingGridData: (state, action) => {
            const { selectedActions = [], selectedConfigurations = [], workflowsByConfigurations = {}, dataMappingsByConfigurations = {}, dynamicDataMappingsByConfigurations = {}, } = action.payload;
            const workflowMappingGridData = selectedConfigurations.reduce((array, selectedConfiguration) => {
                var _a, _b, _c;
                let dataMemorializationWorkflowId;
                const workflows = (_a = workflowsByConfigurations[selectedConfiguration.id]) !== null && _a !== void 0 ? _a : [];
                const workflowsByActionType = workflows
                    .filter((workflow) => selectedActions.includes(workflow.workflowAction))
                    .reduce((object, workflow) => {
                    const item = {
                        id: workflow.workflowId,
                        configurationId: selectedConfiguration.id,
                        configuration: selectedConfiguration.name,
                        type: selectedConfiguration.typeName,
                        workflowId: workflow.workflowId,
                        name: workflow.workflowName,
                        action: workflow.workflowAction,
                        actionLabel: WORKFLOW_CONFIG_ACTIONS_MAP_VALUE_TO_LABEL[workflow.workflowAction],
                    };
                    switch (workflow.workflowAction) {
                        case WORKFLOW_CONFIG_ACTIONS.SEARCH:
                            object.search.push(item);
                            break;
                        case WORKFLOW_CONFIG_ACTIONS.TIMELINE:
                            object.timeline.push(item);
                            break;
                        case WORKFLOW_CONFIG_ACTIONS.DATA_MEMORIALIZATION:
                            dataMemorializationWorkflowId = workflow.workflowId;
                            break;
                    }
                    return object;
                }, {
                    search: [],
                    timeline: [],
                });
                const dataMappings = selectedActions.includes(WORKFLOW_CONFIG_ACTIONS.DATA_MEMORIALIZATION)
                    ? ((_b = dataMappingsByConfigurations[selectedConfiguration.id]) !== null && _b !== void 0 ? _b : []).map((dataMapping) => ({
                        id: dataMapping.id,
                        configurationId: selectedConfiguration.id,
                        configuration: selectedConfiguration.name,
                        type: selectedConfiguration.typeName,
                        workflowId: dataMemorializationWorkflowId,
                        dataMappingId: dataMapping.id,
                        name: dataMapping.name,
                        action: WORKFLOW_CONFIG_ACTIONS.DATA_MEMORIALIZATION,
                        actionLabel: WORKFLOW_CONFIG_ACTIONS_MAP_VALUE_TO_LABEL[WORKFLOW_CONFIG_ACTIONS.DATA_MEMORIALIZATION],
                    }))
                    : [];
                const dynamicDataMappings = selectedActions.includes(WORKFLOW_CONFIG_ACTIONS.SEARCH)
                    ? ((_c = dynamicDataMappingsByConfigurations[selectedConfiguration.id]) !== null && _c !== void 0 ? _c : []).map((dataMapping) => ({
                        id: dataMapping.id,
                        configurationId: selectedConfiguration.id,
                        configuration: selectedConfiguration.name,
                        type: selectedConfiguration.typeName,
                        workflowId: dataMemorializationWorkflowId,
                        dataMappingId: dataMapping.id,
                        name: dataMapping.name,
                        action: WORKFLOW_CONFIG_ACTIONS.DYNAMIC_DATA,
                        actionLabel: WORKFLOW_CONFIG_ACTIONS_MAP_VALUE_TO_LABEL[WORKFLOW_CONFIG_ACTIONS.DYNAMIC_DATA],
                    }))
                    : [];
                return [
                    ...array,
                    ...workflowsByActionType.search,
                    ...workflowsByActionType.timeline,
                    ...dataMappings,
                    ...dynamicDataMappings
                ];
            }, []);
            return Object.assign(Object.assign({}, state), { workflowMappingGridData });
        },
        /**
         * Action to clear the workflow mapping grid data
         * @param state - WorkflowConfigEditorState
         * @param action - action.payload
         * @example - dispatch(clearWorkflowMappingGridData());
         * @returns - updated state
         */
        clearWorkflowMappingGridData: (state) => (Object.assign(Object.assign({}, state), { workflowMappingGridData: [] })),
        /**
         * Action to set selected workflows
         * @param state - WorkflowConfigEditorState
         * @param action - action.payload
         * @example - dispatch(setWorkflowMappingSelections());
         * @returns - updated state
         */
        setWorkflowMappingSelections: (state, action) => (Object.assign(Object.assign({}, state), { workflowMappingSelections: action.payload })),
        /**
         * Action to set workflow mapping grid message
         * @param state - WorkflowConfigEditorState
         * @param action - action.payload
         * @example - dispatch(setWorkflowMappingGridMessage());
         * @returns - updated state
         */
        setWorkflowMappingGridMessage: (state, action) => {
            var _a;
            const { configurations = [], selectedConfigurations = [], selectedActions = [], workflowMappingGridData = [], } = (_a = action.payload) !== null && _a !== void 0 ? _a : {};
            let workflowMappingGridMessage = '';
            if (configurations.length > 0) {
                if (selectedConfigurations.length === 0) {
                    workflowMappingGridMessage = 'Please select a configuration.';
                }
                else if (selectedActions.length === 0) {
                    workflowMappingGridMessage = 'Please select action(s).';
                }
                else {
                    if (!(workflowMappingGridData.length > 0)) {
                        if (selectedActions.length > 1) {
                            if (selectedActions.includes(WORKFLOW_CONFIG_ACTIONS.DATA_MEMORIALIZATION)) {
                                workflowMappingGridMessage =
                                    'No workflows or data-mappings have been configured in CXone. Please work with your administrator to configure.';
                            }
                            else if (selectedActions.includes(WORKFLOW_CONFIG_ACTIONS.TIMELINE) ||
                                selectedActions.includes(WORKFLOW_CONFIG_ACTIONS.SEARCH) ||
                                selectedActions.includes(WORKFLOW_CONFIG_ACTIONS.DATA_MEMORIALIZATION)) {
                                workflowMappingGridMessage =
                                    'No workflows have been configured in CXone. Please work with your administrator to configure.';
                            }
                            else {
                                workflowMappingGridMessage = 'Selected actions are not supported.';
                            }
                        }
                        else {
                            if (selectedActions.includes(WORKFLOW_CONFIG_ACTIONS.TIMELINE)) {
                                workflowMappingGridMessage =
                                    'No timeline workflow has been configured in CXone. Please work with your administrator to configure.';
                            }
                            else if (selectedActions.includes(WORKFLOW_CONFIG_ACTIONS.SEARCH)) {
                                workflowMappingGridMessage =
                                    'No search workflow has been configured in CXone. Please work with your administrator to configure.';
                            }
                            else if (selectedActions.includes(WORKFLOW_CONFIG_ACTIONS.DATA_MEMORIALIZATION)) {
                                workflowMappingGridMessage =
                                    'No data-mappings have been configured in CXone. Please work with your administrator to configure.';
                            }
                            else {
                                workflowMappingGridMessage = 'Selected action is not supported.';
                            }
                        }
                    }
                }
            }
            else {
                workflowMappingGridMessage =
                    'No CRM Configurations have been configured in CXone. Please work with your administrator.';
            }
            return Object.assign(Object.assign({}, state), { workflowMappingGridMessage });
        },
        /**
         * Action to clear selected workflows
         * @param state - WorkflowConfigEditorState
         * @param action - action.payload
         * @example - dispatch(clearWorkflowMappingSelections());
         * @returns - updated state
         */
        clearWorkflowMappingSelections: (state) => (Object.assign(Object.assign({}, state), { workflowMappingSelections: [] })),
        /**
         * Action to reset the state.
         * @param state - WorkflowConfigEditorState
         * @param action - action.payload
         * @example - dispatch(setActionsForDropdown());
         * @returns - initial state
         */
        setActionsForDropdown: (state) => (Object.assign(Object.assign({}, state), { actionsForDropdown: WORKFLOW_CONFIG_ACTIONS_FOR_DROPDOWN })),
        /**
         * Action to set studioDataInput state.
         * @param state - WorkflowConfigEditorState
         * @example - dispatch(setStudioDataInput(studioDataInput));
         * @returns - state
         */
        setStudioDataInput: (state, action) => (Object.assign(Object.assign({}, state), { studioDataInput: action.payload })),
        /**
         * Action to set initializing state.
         * @param state - WorkflowConfigEditorState
         * @example - dispatch(setInitializing(true));
         * @returns - state
         */
        setInitializing: (state, action) => (Object.assign(Object.assign({}, state), { initializing: action.payload })),
        /**
         * Action to set isCCFGridLoading state.
         * @param state - WorkflowConfigEditorState
         * @example - dispatch(setIsCCFGridLoading(true));
         * @returns - state
         */
        setIsCCFGridLoading: (state, action) => (Object.assign(Object.assign({}, state), { isCCFGridLoading: action.payload })),
    },
});
export const CcfWorkflowConfigEditorReducer = workflowConfigEditorSlice.reducer;
export const CcfWorkflowConfigEditorActions = workflowConfigEditorSlice.actions;
/**
 * @param rootState - root state
 * @example - getWorkflowConfigEditorState
 */
const getWorkflowConfigEditorState = (rootState) => rootState[WORKFLOW_CONFIG_EDITOR_SLICE_KEY];
export const getConfigurations = createSelector(getWorkflowConfigEditorState, (state) => state.configurations);
export const getConfigurationByConfigurationId = createSelector(getWorkflowConfigEditorState, (state) => state.configurationByConfigurationId);
export const getSelectedConfigurations = createSelector(getWorkflowConfigEditorState, (state) => state.selectedConfigurations);
export const getWorkflowsByConfigurations = createSelector(getWorkflowConfigEditorState, (state) => state.workflowsByConfigurations);
export const getDataMappingsByConfigurations = createSelector(getWorkflowConfigEditorState, (state) => state.dataMappingsByConfigurations);
export const getDynamicDataMappingsByConfigurations = createSelector(getWorkflowConfigEditorState, (state) => state.dynamicDataMappingsByConfigurations);
export const getSelectedActions = createSelector(getWorkflowConfigEditorState, (state) => state.selectedActions);
export const getWorkflowMappingSelections = createSelector(getWorkflowConfigEditorState, (state) => state.workflowMappingSelections);
export const getWorkflowMappingGridData = createSelector(getWorkflowConfigEditorState, (state) => state === null || state === void 0 ? void 0 : state.workflowMappingGridData);
export const getActionsForDropdown = createSelector(getWorkflowConfigEditorState, (state) => state === null || state === void 0 ? void 0 : state.actionsForDropdown);
export const getStudioDataInput = createSelector(getWorkflowConfigEditorState, (state) => state === null || state === void 0 ? void 0 : state.studioDataInput);
export const getInitializing = createSelector(getWorkflowConfigEditorState, (state) => state === null || state === void 0 ? void 0 : state.initializing);
export const getWorkflowMappingGridMessage = createSelector(getWorkflowConfigEditorState, (state) => state === null || state === void 0 ? void 0 : state.workflowMappingGridMessage);
export const getIsCCFGridLoading = createSelector(getWorkflowConfigEditorState, (state) => state === null || state === void 0 ? void 0 : state.loading);
export * as thunks from './thunks';
//# sourceMappingURL=ccf-workflow-config-editor.slice.js.map