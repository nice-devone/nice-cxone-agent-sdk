import { createSelector, createSlice, } from '@reduxjs/toolkit';
import CONSTANTS from './constants';
export const WORKFLOW_EXECUTE_EDITOR_SLICE_KEY = CONSTANTS.WORKFLOW_EXECUTE_EDITOR_SLICE_KEY;
export const WORKFLOW_EXECUTE_ACTIONS = {
    CREATE: 'Create',
    SEARCH: 'Search',
    TIMELINE: 'Timeline',
    UPDATE: 'Update',
};
const WORKFLOW_EXECUTE_ACTION_LABELS = {
    CREATE: 'Create',
    SEARCH: 'Search',
    UPDATE: 'Update',
};
const WORKFLOW_EXECUTE_ACTIONS_FOR_DROPDOWN = [
    {
        value: WORKFLOW_EXECUTE_ACTIONS.CREATE,
        label: WORKFLOW_EXECUTE_ACTION_LABELS.CREATE,
    },
    {
        value: WORKFLOW_EXECUTE_ACTIONS.SEARCH,
        label: WORKFLOW_EXECUTE_ACTION_LABELS.SEARCH,
    },
    {
        value: WORKFLOW_EXECUTE_ACTIONS.UPDATE,
        label: WORKFLOW_EXECUTE_ACTION_LABELS.UPDATE,
    }
];
/**
 * Application state.
 */
export const initialCcfWorkflowExecuteEditorState = {
    configurations: [],
    configurationByConfigurationId: {},
    workflowsByConfigurations: {},
    dynamicDataMappingsByConfigurations: {},
    dataMappingsByConfigurations: {},
    selectedConfigurations: [],
    selectedActions: [],
    workflowMappingSelections: [],
    workflowMappingGridData: [],
    actionsForDropdown: [],
    studioActionResult: [],
    initializing: true,
    workflowMappingGridMessage: '',
    open: false,
    loading: false,
    selection: {},
};
export const workflowExecuteEditor = createSlice({
    name: CONSTANTS.WORKFLOW_EXECUTE_EDITOR_SLICE_KEY,
    initialState: initialCcfWorkflowExecuteEditorState,
    reducers: {
        /**
         * Action to set configurations
         * @param state - CcfWorkflowExecuteEditorState
         * @param action - action.payload
         * @example - dispatch(setConfigurations());
         * @returns - updated state
         */
        setConfigurations(state, action) {
            var _a;
            const { configurations = [] } = (_a = action.payload) !== null && _a !== void 0 ? _a : {};
            const configurationByConfigurationId = configurations.reduce((object, configuration) => {
                object[configuration === null || configuration === void 0 ? void 0 : configuration.id] = configuration;
                return object;
            }, {});
            return Object.assign(Object.assign({}, state), { configurations: configurations, configurationByConfigurationId });
        },
        /**
         * Action to set workflows
         * @param state - CcfWorkflowExecuteEditorState
         * @param action - action.payload
         * @example - dispatch(setWorkflows());
         * @returns - updated state
         */
        setWorkflows: (state, action) => {
            var _a;
            const { id: configurationId, workflows = [] } = (_a = action.payload) !== null && _a !== void 0 ? _a : {};
            const workflowsByConfigurations = {};
            if (configurationId && workflows.length > 0) {
                workflowsByConfigurations[configurationId] = workflows;
            }
            return Object.assign(Object.assign({}, state), { workflowsByConfigurations });
        },
        /**
         * Action to set setDataMappings
         * @param state - CcfWorkflowConfigEditorState
         * @param action - action.payload
         * @example - dispatch(setDataMappings());
         * @returns - updated state
         */
        setDataMappings: (state, action) => {
            var _a, _b;
            const { configurationId, dataMappingsResult = {} } = (_a = action.payload) !== null && _a !== void 0 ? _a : {};
            const activeDataMappings = ((_b = dataMappingsResult === null || dataMappingsResult === void 0 ? void 0 : dataMappingsResult.dataMappings) !== null && _b !== void 0 ? _b : []).filter(({ status = '' }) => status.toLocaleLowerCase() === 'active');
            const dataMappingsByConfigurations = Object.assign({}, state.dataMappingsByConfigurations);
            if (configurationId) {
                dataMappingsByConfigurations[configurationId] = activeDataMappings;
            }
            return Object.assign(Object.assign({}, state), { dataMappingsByConfigurations });
        },
        /**
         * Action to set setDynamicDataMappings
         * @param state - CcfWorkflowConfigEditorState
         * @param action - action.payload
         * @example - dispatch(setDynamicDataMappings());
         * @returns - updated state
         */
        setDynamicDataMappings: (state, action) => {
            var _a;
            const { configurationId, dynamicDataMappings = [] } = (_a = action.payload) !== null && _a !== void 0 ? _a : {};
            const activeDataMappings = (dynamicDataMappings !== null && dynamicDataMappings !== void 0 ? dynamicDataMappings : []).filter(({ status = '' }) => status.toLocaleLowerCase() === 'active');
            const dynamicDataMappingsByConfigurations = Object.assign({}, state.dynamicDataMappingsByConfigurations);
            if (configurationId) {
                dynamicDataMappingsByConfigurations[configurationId] = activeDataMappings;
            }
            return Object.assign(Object.assign({}, state), { dynamicDataMappingsByConfigurations });
        },
        /**
         * Action to remove configuration
         * @param state - CcfWorkflowExecuteEditorState
         * @param action - action.payload
         * @example - dispatch(removeSelectedAgentConfiguration(configuration: Configuration));
         * @returns - updated state
         */
        removeSelectedAgentConfiguration: (state, action) => {
            const configuration = action.payload;
            const selectedConfigurations = [...state.selectedConfigurations].filter((selectedConfiguration) => (selectedConfiguration === null || selectedConfiguration === void 0 ? void 0 : selectedConfiguration.id) !== (configuration === null || configuration === void 0 ? void 0 : configuration.id));
            return Object.assign(Object.assign({}, state), { selectedConfigurations });
        },
        /**
         * Action to set set Selected AgentConfigurations
         * @param state - CcfWorkflowExecuteEditorState
         * @param action - action.payload
         * @example - dispatch(setSelectedAgentConfigurations([configurationId_1, configurationId_2, ...]));
         * @returns - updated state
         */
        setSelectedAgentConfigurations: (state, action) => (Object.assign(Object.assign({}, state), { selectedConfigurations: action.payload })),
        /**
         * Action to clear all selected configurations from state
         * @param state - CcfWorkflowExecuteEditorState
         * @param action - action.payload
         * @example - dispatch(setCurrentWorkflowData('search'));
         * @returns - updated state
         */
        clearSelectedAgentConfigurations: (state) => (Object.assign(Object.assign({}, state), { selectedConfigurations: [] })),
        /**
         * Action to set data for workflow mapping grid
         * @param state - CcfWorkflowExecuteEditorState
         * @param action - action.payload
         * @example - dispatch(setWorkflowMappingGridData());
         * @returns - updated state
         */
        setWorkflowMappingGridData: (state, action) => {
            const ACTIONS = {
                TIMELINE: 'Timeline',
                DATA_MEMORIALIZATION: 'DataMemorialization',
                SEARCH: 'Search',
                CREATE: 'Create',
                UPDATE: 'Update',
                DYNAMIC_DATA: 'DynamicData',
                DYNAMIC_CREATE_DATA: 'DynamicCreateData',
            };
            const WORKFLOW_EXECUTE_ACTIONS_MAP_VALUE_TO_LABEL = {
                [ACTIONS.TIMELINE]: 'Create Timeline',
                [ACTIONS.DATA_MEMORIALIZATION]: 'Data Memorialization',
                [ACTIONS.SEARCH]: 'Search',
                [ACTIONS.CREATE]: 'Create',
                [ACTIONS.UPDATE]: 'Update',
                [ACTIONS.DYNAMIC_DATA]: 'Dynamic Search',
                [ACTIONS.DYNAMIC_CREATE_DATA]: 'Dynamic Create',
            };
            const { selectedActions = [], selectedConfigurations = [], workflowsByConfigurations = {}, dynamicDataMappingsByConfigurations = {}, } = action.payload;
            let dataMemorializationWorkflowId = '';
            const workflowMappingGridData = selectedConfigurations.reduce((array, selectedConfiguration) => {
                var _a, _b, _c;
                const workflows = (_a = workflowsByConfigurations[selectedConfiguration.id]) !== null && _a !== void 0 ? _a : [];
                const workflowSelectedActions = [...selectedActions];
                if (selectedActions.includes(ACTIONS.CREATE)) {
                    workflowSelectedActions.push(ACTIONS.TIMELINE);
                }
                const workflowsByActionType = workflows
                    .filter((workflow) => workflowSelectedActions.includes(workflow.workflowAction))
                    .reduce((object, workflow) => {
                    const item = {
                        id: workflow.workflowId,
                        configurationId: selectedConfiguration.id,
                        configuration: selectedConfiguration.name,
                        type: selectedConfiguration.typeName,
                        workflowId: workflow.workflowId,
                        name: workflow.workflowName,
                        action: workflow.workflowAction,
                        actionLabel: WORKFLOW_EXECUTE_ACTIONS_MAP_VALUE_TO_LABEL[workflow.workflowAction],
                    };
                    switch (workflow.workflowAction) {
                        case ACTIONS.SEARCH:
                            object.search.push(item);
                            dataMemorializationWorkflowId = item.workflowId;
                            break;
                        case ACTIONS.CREATE:
                            object.create.push(item);
                            break;
                        case ACTIONS.UPDATE:
                            object.create.push(item);
                            break;
                        case ACTIONS.TIMELINE:
                            object.timeline.push(item);
                            break;
                    }
                    return object;
                }, {
                    create: [],
                    search: [],
                    timeline: [],
                });
                const dynamicDataMappingsSearch = selectedActions.includes(ACTIONS.SEARCH)
                    ? ((_b = dynamicDataMappingsByConfigurations[selectedConfiguration.id]) !== null && _b !== void 0 ? _b : []).map((dataMapping) => ({
                        id: dataMapping.id,
                        configurationId: selectedConfiguration.id,
                        configuration: selectedConfiguration.name,
                        type: selectedConfiguration.typeName,
                        workflowId: dataMemorializationWorkflowId,
                        dataMappingId: dataMapping.id,
                        name: dataMapping.name,
                        action: ACTIONS.DYNAMIC_DATA,
                        actionLabel: WORKFLOW_EXECUTE_ACTIONS_MAP_VALUE_TO_LABEL[ACTIONS.DYNAMIC_DATA],
                    }))
                    : [];
                const getCustomRecordData = workflows.find((workflow) => { var _a; return workflow.workflowAction === ACTIONS.CREATE && workflow.workflowName && ((_a = workflow.workflowName) === null || _a === void 0 ? void 0 : _a.includes('Create Custom Record')); });
                const createCustomRecordWorkflowID = getCustomRecordData ? getCustomRecordData.workflowId : '';
                const dynamicDataMappingsCreate = selectedActions.includes(ACTIONS.CREATE) && createCustomRecordWorkflowID !== ''
                    ? ((_c = dynamicDataMappingsByConfigurations[selectedConfiguration.id]) !== null && _c !== void 0 ? _c : []).map((dataMapping) => ({
                        id: dataMapping.id + 'Create',
                        configurationId: selectedConfiguration.id,
                        configuration: selectedConfiguration.name,
                        type: selectedConfiguration.typeName,
                        workflowId: createCustomRecordWorkflowID,
                        dataMappingId: dataMapping.id,
                        name: dataMapping.name,
                        action: ACTIONS.DYNAMIC_CREATE_DATA,
                        actionLabel: WORKFLOW_EXECUTE_ACTIONS_MAP_VALUE_TO_LABEL[ACTIONS.DYNAMIC_CREATE_DATA],
                    }))
                    : [];
                const dynamicDataMappings = [[...(dynamicDataMappingsSearch !== null && dynamicDataMappingsSearch !== void 0 ? dynamicDataMappingsSearch : [])], [...(dynamicDataMappingsCreate !== null && dynamicDataMappingsCreate !== void 0 ? dynamicDataMappingsCreate : [])]].flat();
                return [
                    ...array,
                    ...workflowsByActionType.create,
                    ...workflowsByActionType.search,
                    ...workflowsByActionType.timeline,
                    ...dynamicDataMappings
                ];
            }, []);
            return Object.assign(Object.assign({}, state), { workflowMappingGridData });
        },
        /**
         * Action to clear the workflow mapping grid data
         * @param state - CcfWorkflowExecuteEditorState
         * @param action - action.payload
         * @example - dispatch(clearWorkflowMappingGridData());
         * @returns - updated state
         */
        clearWorkflowMappingGridData: (state) => (Object.assign(Object.assign({}, state), { workflowMappingGridData: [] })),
        /**
         * Action to set selected workflows
         * @param state - CcfWorkflowExecuteEditorState
         * @param action - action.payload
         * @example - dispatch(setWorkflowMappingSelections());
         * @returns - updated state
         */
        setWorkflowMappingSelections: (state, action) => (Object.assign(Object.assign({}, state), { workflowMappingSelections: action.payload })),
        /**
         * Action to set workflow mapping grid message
         * @param state - CcfWorkflowExecuteEditorState
         * @param action - action.payload
         * @example - dispatch(setWorkflowMappingGridMessage());
         * @returns - updated state
         */
        setWorkflowMappingGridMessage: (state, action) => {
            var _a;
            const { configurations = [], selectedConfigurations = [], selectedActions = [], } = (_a = action.payload) !== null && _a !== void 0 ? _a : {};
            let workflowMappingGridMessage = '';
            if (configurations.length > 0) {
                if (selectedConfigurations.length === 0) {
                    workflowMappingGridMessage = 'Please select a configuration.';
                }
                else if (selectedActions.length === 0) {
                    workflowMappingGridMessage = 'Please select action(s).';
                }
            }
            else {
                workflowMappingGridMessage =
                    'No CRM Configurations have been configured in CXone. Please work with your administrator.';
            }
            return Object.assign(Object.assign({}, state), { workflowMappingGridMessage });
        },
        /**
         * Action to reset the state.
         * @param state - CcfWorkflowExecuteEditorState
         * @param action - action.payload
         * @example - dispatch(setActionsForDropdown());
         * @returns - initial state
         */
        setActionsForDropdown: (state) => (Object.assign(Object.assign({}, state), { actionsForDropdown: WORKFLOW_EXECUTE_ACTIONS_FOR_DROPDOWN })),
        /**
         * Action to remove workflow agent action
         * @param state - CcfWorkflowExecuteEditorState
         * @param action - action.payload
         * @example - dispatch(removeSelectedWorkflowExecuteAction(workflowAction: ));
         * @returns - updated state
         */
        removeSelectedWorkflowExecuteAction: (state, action) => {
            const selectedActions = [...state.selectedActions].filter((selectedAction) => selectedAction !== action.payload);
            return Object.assign(Object.assign({}, state), { selectedActions });
        },
        /**
         * Action to set all selected agent actions
         * @param state - CcfWorkflowConfigEditorState
         * @param action - action.payload
         * @example - dispatch(setSelectedWorkflowExecuteActions());
         * @returns - updated state
         */
        setSelectedWorkflowExecuteActions: (state, action) => (Object.assign(Object.assign({}, state), { selectedActions: action.payload })),
        /**
         * Action to clear selected workflows
         * @param state - CcfWorkflowExecuteEditorState
         * @param action - action.payload
         * @example - dispatch(clearWorkflowMappingSelections());
         * @returns - updated state
         */
        clearWorkflowMappingSelections: (state) => (Object.assign(Object.assign({}, state), { workflowMappingSelections: [] })),
        /**
         * Action to reset the state.
         * @param state - CcfWorkflowExecuteEditorState
         * @param action - action.payload
         * @example - dispatch(resetToInitialState());
         * @returns - initial state
         */
        resetToInitialState: () => initialCcfWorkflowExecuteEditorState,
        /**
         * Action to set initializing state.
         * @param state - CcfWorkflowExecuteEditorState
         * @example - dispatch(setInitializing(true));
         * @returns - state
         */
        setInitializing: (state, action) => (Object.assign(Object.assign({}, state), { initializing: action.payload })),
        /**
         * Action to set the opened state.
         * @param state - CcfWorkflowExecuteEditorState
         * @example - dispatch(setInitializing(true));
         * @returns - state
         */
        setOpen: (state, action) => (Object.assign(Object.assign({}, state), { open: action.payload })),
        /**
         * Action to set the loading state.
         * @param state - CcfWorkflowExecuteEditorState
         * @example - dispatch(setInitializing(true));
         * @returns - state
         */
        setLoading: (state, action) => (Object.assign(Object.assign({}, state), { loading: action.payload })),
        /**
         * Action to set grid selection.
         * @param state - CcfWorkflowExecuteEditorState
         * @example - dispatch(setSelection());
         * @returns - state
         */
        setSelection: (state) => {
            const { workflowMappingGridData = [], workflowMappingSelections = [], } = Object.assign({}, state);
            const [selection = {}] = workflowMappingGridData.filter((data) => workflowMappingSelections.includes(data.id));
            return Object.assign(Object.assign({}, state), { selection });
        },
    },
});
export const CcfWorkflowExecuteEditorReducer = workflowExecuteEditor.reducer;
export const CcfWorkflowExecuteEditorActions = workflowExecuteEditor.actions;
/**
 * @param rootState - root state
 * @example - getWorkflowExecuteEditorState
 */
const getWorkflowExecuteEditorState = (rootState) => rootState.workflowExecuteEditorSlice;
export const getConfigurations = createSelector(getWorkflowExecuteEditorState, (state) => state.configurations);
export const getConfigurationByConfigurationId = createSelector(getWorkflowExecuteEditorState, (state) => state.configurationByConfigurationId);
export const getSelectedConfigurations = createSelector(getWorkflowExecuteEditorState, (state) => state.selectedConfigurations);
export const getSelectedActions = createSelector(getWorkflowExecuteEditorState, (state) => state.selectedActions);
export const getWorkflowsByConfigurations = createSelector(getWorkflowExecuteEditorState, (state) => state.workflowsByConfigurations);
export const getDynamicDataMappingsByConfigurations = createSelector(getWorkflowExecuteEditorState, (state) => state.dynamicDataMappingsByConfigurations);
export const getWorkflowMappingSelections = createSelector(getWorkflowExecuteEditorState, (state) => state.workflowMappingSelections);
export const getActionsForDropdown = createSelector(getWorkflowExecuteEditorState, (state) => state === null || state === void 0 ? void 0 : state.actionsForDropdown);
export const getWorkflowMappingGridData = createSelector(getWorkflowExecuteEditorState, (state) => state === null || state === void 0 ? void 0 : state.workflowMappingGridData);
export const getInitializing = createSelector(getWorkflowExecuteEditorState, (state) => state === null || state === void 0 ? void 0 : state.initializing);
export const getWorkflowMappingGridMessage = createSelector(getWorkflowExecuteEditorState, (state) => state === null || state === void 0 ? void 0 : state.workflowMappingGridMessage);
export const getOpen = createSelector(getWorkflowExecuteEditorState, (state) => state === null || state === void 0 ? void 0 : state.open);
export const getLoading = createSelector(getWorkflowExecuteEditorState, (state) => state === null || state === void 0 ? void 0 : state.loading);
export const getSelection = createSelector(getWorkflowExecuteEditorState, (state) => state === null || state === void 0 ? void 0 : state.selection);
export * as thunks from './thunks';
//# sourceMappingURL=ccf-workflow-execute-editor.slice.js.map