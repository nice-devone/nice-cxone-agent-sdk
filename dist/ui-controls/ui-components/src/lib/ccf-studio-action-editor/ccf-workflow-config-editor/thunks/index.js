import { __awaiter } from "tslib";
import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { CXoneClient } from '@nice-devone/agent-sdk';
import { CcfWorkflowConfigEditorActions, WORKFLOW_CONFIG_ACTIONS, WORKFLOW_CONFIG_EDITOR_SLICE_KEY, } from '../ccf-workflow-config-editor.slice';
import { STUDIO_ACTION_EDITOR_SLICE_KEY } from '../../ccf-studio-action-editor.slice';
import { decodeParameter } from '../helpers';
import * as helpers from '@nice-devone/shared-apps-lib';
const FETCH_CONFIGURATIONS = 'workflowConfigEditorSlice/fetchConfigurations';
const FETCH_WORKFLOW = 'workflowConfigEditorSlice/fetchConfigurationWorkflows';
const FETCH_DATA_MAPPINGS = 'workflowConfigEditorSlice/fetchDataMappings';
const FETCH_DYNAMIC_DATA_MAPPINGS = 'workflowConfigEditorSlice/fetchDynamicDataMappings';
const INITIALIZE = 'workflowConfigEditorSlice/initialize';
const HANDLE_CHANGE_IN_CONFIGURATION_DROPDOWN = 'workflowConfigEditorSlice/handleChangeInConfigurationDropdown';
const HANDLE_DELETE_OF_SELECTED_CONFIGURATION = 'workflowConfigEditorSlice/handleDeleteOfSelectedConfiguration';
const HANDLE_CHANGE_IN_ACTIONS_DROPDOWN = 'workflowConfigEditorSlice/handleChangeInActionsDropdown';
const HANDLE_DELETE_OF_SELECTED_AGENT_ACTION = 'workflowConfigEditorSlice/handleDeleteOfSelectedAction';
const HANDLE_WORKFLOW_MAPPING_SELECTIONS = 'workflowConfigEditorSlice/handleWorkflowMappingSelections';
/**
 * initialize the workflow config editor
 * @example - dispatch(initializeWorkflowConfigEditor())
 */
export const initializeWorkflowConfigEditor = createAsyncThunk(INITIALIZE, (_, { dispatch, getState, extra }) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g;
    try {
        const rootState = getState();
        const { token, data = {} } = (_a = rootState[STUDIO_ACTION_EDITOR_SLICE_KEY]) !== null && _a !== void 0 ? _a : {};
        const authenticate = yield dispatch(extra.CcfStudioActionEditorSlice.authenticate(token));
        if (authenticate === null || authenticate === void 0 ? void 0 : authenticate.error) {
            throw authenticate === null || authenticate === void 0 ? void 0 : authenticate.error;
        }
        yield dispatch(extra.CcfWorkflowConfigEditorSlice.thunks.fetchConfigurations());
        // Get fresh state after fetching configurations
        const updatedState = getState();
        const { configurationByConfigurationId = {} } = (_b = updatedState[WORKFLOW_CONFIG_EDITOR_SLICE_KEY]) !== null && _b !== void 0 ? _b : {};
        const selectedConfigurations = [];
        const selectedActions = [];
        const workflowMappingSelections = [];
        const [searchWorkflow = {}] = (_c = decodeParameter(data['searchWorkflow'], 'searchWorkflow')) !== null && _c !== void 0 ? _c : [];
        const isSearchValid = helpers.cxs.validate.workflowConfiguration.validateConfigIdExists(searchWorkflow, configurationByConfigurationId, 'searchWorkflow');
        const [timelineWorkflow = {}] = (_d = decodeParameter(data['timelineWorkflow'], 'timelineWorkflow')) !== null && _d !== void 0 ? _d : [];
        const isTimelineValid = helpers.cxs.validate.workflowConfiguration.validateConfigIdExists(timelineWorkflow, configurationByConfigurationId, 'timelineWorkflow');
        const [dataMemorializationWorkflow = {}] = (_e = decodeParameter(data['dataMemorializationWorkflow'], 'dataMemorializationWorkflow')) !== null && _e !== void 0 ? _e : [];
        const isDataMemorializationValid = helpers.cxs.validate.workflowConfiguration.validateConfigIdExists(dataMemorializationWorkflow, configurationByConfigurationId, 'dataMemorializationWorkflow');
        const configurationId = helpers.cxs.validate.workflowConfiguration.areAllWorkflowConfigIdsEqual([searchWorkflow, timelineWorkflow, dataMemorializationWorkflow]);
        dispatch(CcfWorkflowConfigEditorActions.setActionsForDropdown());
        if (configurationId !== null) {
            yield Promise.all([
                yield dispatch(extra.CcfWorkflowConfigEditorSlice.thunks.fetchConfigurationWorkflows(configurationId)),
                yield dispatch(extra.CcfWorkflowConfigEditorSlice.thunks.fetchDataMappings(configurationId)),
                yield dispatch(extra.CcfWorkflowConfigEditorSlice.thunks.fetchDynamicDataMappings(configurationId))
            ]);
        }
        const currentState = getState();
        const { workflowConfigEditorSlice } = currentState;
        let isSearchWorkflowTypeValid = false;
        let isTimeLineWorkflowTypeValid = false;
        let isDataMemorializationWorkflowTypeValid = false;
        if (isSearchValid) {
            isSearchWorkflowTypeValid = helpers.cxs.validate.workflowConfiguration.isWorkflowOfCorrectType('Search', searchWorkflow, workflowConfigEditorSlice === null || workflowConfigEditorSlice === void 0 ? void 0 : workflowConfigEditorSlice.workflowsByConfigurations[configurationId]);
        }
        if (isTimelineValid) {
            isTimeLineWorkflowTypeValid = helpers.cxs.validate.workflowConfiguration.isWorkflowOfCorrectType('Timeline', timelineWorkflow, workflowConfigEditorSlice === null || workflowConfigEditorSlice === void 0 ? void 0 : workflowConfigEditorSlice.workflowsByConfigurations[configurationId]);
        }
        if (isDataMemorializationValid) {
            isDataMemorializationWorkflowTypeValid = helpers.cxs.validate.workflowConfiguration.isWorkflowOfCorrectType('DataMemorialization', dataMemorializationWorkflow, workflowConfigEditorSlice === null || workflowConfigEditorSlice === void 0 ? void 0 : workflowConfigEditorSlice.workflowsByConfigurations[configurationId]);
        }
        if (isSearchValid && isSearchWorkflowTypeValid) {
            if (!selectedConfigurations.map((configuration) => configuration.id).includes(searchWorkflow.configurationId)) {
                selectedConfigurations.push(configurationByConfigurationId[searchWorkflow.configurationId]);
            }
            // NOTE: Detect if dynnamic data is configured.
            if ((_f = searchWorkflow === null || searchWorkflow === void 0 ? void 0 : searchWorkflow.workflowParam) === null || _f === void 0 ? void 0 : _f.dynamicDataMappingId) {
                workflowMappingSelections.push(searchWorkflow.workflowParam.dynamicDataMappingId);
            }
            else {
                workflowMappingSelections.push(searchWorkflow.workflowId);
            }
            selectedActions.push(WORKFLOW_CONFIG_ACTIONS.SEARCH);
        }
        if (isTimelineValid && isTimeLineWorkflowTypeValid) {
            if (!selectedConfigurations.map((configuration) => configuration.id).includes(timelineWorkflow.configurationId)) {
                selectedConfigurations.push(configurationByConfigurationId[timelineWorkflow.configurationId]);
            }
            workflowMappingSelections.push(timelineWorkflow.workflowId);
            selectedActions.push(WORKFLOW_CONFIG_ACTIONS.TIMELINE);
        }
        if (isDataMemorializationValid && isDataMemorializationWorkflowTypeValid) {
            if (!selectedConfigurations.map((configuration) => configuration.id).includes(dataMemorializationWorkflow.configurationId)) {
                selectedConfigurations.push(configurationByConfigurationId[dataMemorializationWorkflow.configurationId]);
            }
            const { dataMappingId } = (_g = dataMemorializationWorkflow.workflowParam) !== null && _g !== void 0 ? _g : {};
            workflowMappingSelections.push(dataMappingId);
            selectedActions.push(WORKFLOW_CONFIG_ACTIONS.DATA_MEMORIALIZATION);
        }
        if ((selectedConfigurations.length > 0)) {
            dispatch(CcfWorkflowConfigEditorActions.setStudioDataInput({
                searchWorkflow,
                timelineWorkflow,
                dataMemorializationWorkflow,
            }));
            dispatch(CcfWorkflowConfigEditorActions.setSelectedAgentConfigurations(selectedConfigurations));
            dispatch(CcfWorkflowConfigEditorActions.setSelectedAgentActions(selectedActions));
            dispatch(CcfWorkflowConfigEditorActions.setWorkflowMappingSelections(workflowMappingSelections));
        }
        ;
        dispatch(CcfWorkflowConfigEditorActions.setInitializing(false));
    }
    catch (error) {
        toast.error('Unable to initialize', {
            autoClose: false,
            hideProgressBar: true,
            progress: undefined,
        });
        extra.logger.error(INITIALIZE, `payload: ${JSON.stringify(error)}`);
    }
}));
/**
 * get all configurations
 * @example - dispatch(fetchConfigurations())
 */
export const fetchConfigurations = createAsyncThunk(FETCH_CONFIGURATIONS, (_, { dispatch, getState, extra }) => __awaiter(void 0, void 0, void 0, function* () {
    var _h, _j;
    try {
        const rootState = getState();
        const { token } = (_h = rootState[STUDIO_ACTION_EDITOR_SLICE_KEY]) !== null && _h !== void 0 ? _h : {};
        const response = (_j = (yield CXoneClient.instance.agentIntegrationConfigurationService.getConfigurations(token))) !== null && _j !== void 0 ? _j : {};
        dispatch(extra.CcfWorkflowConfigEditorSlice.CcfWorkflowConfigEditorActions.setConfigurations(response));
    }
    catch (error) {
        extra.logger.error(FETCH_CONFIGURATIONS, `payload: ${JSON.stringify(error)}`);
    }
}));
/**
 * get all workflow info
 * @example - dispatch(fetchConfigurationWorkflows(configurationId))
 */
export const fetchConfigurationWorkflows = createAsyncThunk(FETCH_WORKFLOW, (configurationId, { dispatch, getState, extra }) => __awaiter(void 0, void 0, void 0, function* () {
    var _k, _l;
    try {
        const rootState = getState();
        const { token } = (_k = rootState[STUDIO_ACTION_EDITOR_SLICE_KEY]) !== null && _k !== void 0 ? _k : {};
        const response = (_l = (yield CXoneClient.instance.agentIntegrationConfigurationService.getConfigurationWorkflows(configurationId, token))) !== null && _l !== void 0 ? _l : {};
        dispatch(extra.CcfWorkflowConfigEditorSlice.CcfWorkflowConfigEditorActions.setWorkflows(response));
    }
    catch (error) {
        extra.logger.error(FETCH_WORKFLOW, `payload: ${JSON.stringify(error)}`);
    }
}));
/**
 * get all data mapping info
 * @example - dispatch(fetchDataMappings(configurationId))
 */
export const fetchDataMappings = createAsyncThunk(FETCH_DATA_MAPPINGS, (configurationId, { dispatch, getState, extra }) => __awaiter(void 0, void 0, void 0, function* () {
    var _m, _o;
    try {
        const rootState = getState();
        const { token } = (_m = rootState[STUDIO_ACTION_EDITOR_SLICE_KEY]) !== null && _m !== void 0 ? _m : {};
        const response = (_o = yield CXoneClient.instance.agentIntegrationConfigurationService.getDataMappings(configurationId, token)) !== null && _o !== void 0 ? _o : {};
        dispatch(extra.CcfWorkflowConfigEditorSlice.CcfWorkflowConfigEditorActions.setDataMappings(Object.assign(Object.assign({}, response), { configurationId })));
    }
    catch (error) {
        extra.logger.error(FETCH_DATA_MAPPINGS, `payload: ${JSON.stringify(error)}`);
    }
}));
/**
 * get all data mapping info
 * @example - dispatch(fetchDynamicDataMappings(configurationId))
 */
export const fetchDynamicDataMappings = createAsyncThunk(FETCH_DYNAMIC_DATA_MAPPINGS, (configurationId, { dispatch, getState, extra }) => __awaiter(void 0, void 0, void 0, function* () {
    var _p, _q;
    try {
        const rootState = getState();
        const { token } = (_p = rootState[STUDIO_ACTION_EDITOR_SLICE_KEY]) !== null && _p !== void 0 ? _p : {};
        const response = (_q = (yield CXoneClient.instance.agentIntegrationConfigurationService.getDynamicDataMappings(configurationId, token))) !== null && _q !== void 0 ? _q : {};
        dispatch(extra.CcfWorkflowConfigEditorSlice.CcfWorkflowConfigEditorActions.setDynamicDataMappings(Object.assign(Object.assign({}, response), { configurationId })));
    }
    catch (error) {
        extra.logger.error(FETCH_DYNAMIC_DATA_MAPPINGS, `payload: ${JSON.stringify(error)}`);
    }
}));
/**
 * Handle change in configuration dropdown
 * @example - dispatch(handleChangeInConfigurationDropdown(configurationId)
 */
export const handleChangeInConfigurationDropdown = createAsyncThunk(HANDLE_CHANGE_IN_CONFIGURATION_DROPDOWN, (configurationId, { dispatch, getState, extra }) => __awaiter(void 0, void 0, void 0, function* () {
    var _r, _s;
    const rootState = getState();
    const { configurationByConfigurationId } = rootState[WORKFLOW_CONFIG_EDITOR_SLICE_KEY];
    // Configuration handlers for different integration types
    const configurationHandlers = {
        Default: {
            syncActions: (dispatch, configuration) => {
                dispatch(extra.CcfWorkflowConfigEditorSlice.CcfWorkflowConfigEditorActions.setSelectedAgentConfigurations([configuration]));
                dispatch(extra.CcfWorkflowConfigEditorSlice.CcfWorkflowConfigEditorActions.clearWorkflowMappingSelections());
                dispatch(extra.CcfWorkflowConfigEditorSlice.CcfWorkflowConfigEditorActions.setActionsForDropdown());
            },
            asyncActions: (dispatch, configurationId) => __awaiter(void 0, void 0, void 0, function* () {
                return Promise.all([
                    dispatch(extra.CcfWorkflowConfigEditorSlice.thunks.fetchConfigurationWorkflows(configurationId)),
                    dispatch(extra.CcfWorkflowConfigEditorSlice.thunks.fetchDataMappings(configurationId)),
                    dispatch(extra.CcfWorkflowConfigEditorSlice.thunks.fetchDynamicDataMappings(configurationId))
                ]);
            }),
        },
    };
    dispatch(extra.CcfWorkflowConfigEditorSlice.CcfWorkflowConfigEditorActions.setIsCCFGridLoading(true));
    try {
        const configuration = configurationByConfigurationId[configurationId];
        // Use the Default handler for all configurations
        const handler = configurationHandlers.Default;
        // Execute synchronous actions
        handler.syncActions(dispatch, configuration);
        // Execute asynchronous actions
        yield handler.asyncActions(dispatch, configurationId);
    }
    catch (error) {
        console.error('Error in configuration dropdown change:', error);
        // Optionally show user-friendly error message or toast
        (_s = (_r = extra.logger) === null || _r === void 0 ? void 0 : _r.error) === null || _s === void 0 ? void 0 : _s.call(_r, HANDLE_CHANGE_IN_CONFIGURATION_DROPDOWN, `Configuration change failed: ${JSON.stringify(error)}`);
    }
    finally {
        dispatch(extra.CcfWorkflowConfigEditorSlice.CcfWorkflowConfigEditorActions.setIsCCFGridLoading(false));
    }
}));
/**
 * Handle delete of selected configuration
 * @example - dispatch(handleDeleteOfSelectedConfiguration(configuration)
 */
export const handleDeleteOfSelectedConfiguration = createAsyncThunk(HANDLE_DELETE_OF_SELECTED_CONFIGURATION, (configuration, { dispatch, extra }) => __awaiter(void 0, void 0, void 0, function* () {
    dispatch(extra.CcfWorkflowConfigEditorSlice.CcfWorkflowConfigEditorActions.removeSelectedAgentConfiguration(configuration));
}));
/**
* Function to handle logic for when a change in the actions dropdown occurs.
* @example handleChangeInActionsDropdown()
*/
export const handleChangeInActionsDropdown = createAsyncThunk(HANDLE_CHANGE_IN_ACTIONS_DROPDOWN, (actions, { dispatch, extra }) => __awaiter(void 0, void 0, void 0, function* () {
    dispatch(extra.CcfWorkflowConfigEditorSlice.CcfWorkflowConfigEditorActions.setSelectedAgentActions(actions));
}));
/**
* Function to handle logic for when a selected action is deleted.
* @example handleDeleteOfSelectedAction()
*/
export const handleDeleteOfSelectedAction = createAsyncThunk(HANDLE_DELETE_OF_SELECTED_AGENT_ACTION, (action, { dispatch, extra }) => __awaiter(void 0, void 0, void 0, function* () {
    dispatch(extra.CcfWorkflowConfigEditorSlice.CcfWorkflowConfigEditorActions.removeSelectedAgentAction(action));
}));
/**
 * Function to handle logic for when an item in CcfGrid is selected.
 * @param isCCFGridLoading - Slice property indicating the loading state for workflow mapping grid.
 * @param setWorkflowMappingSelections - Reducer action.
 * @param newWorkflowMappingSelections - Array of selection changes.
 * @param workflowMappingSelections - Array of active selections.
 * @param workflowMappingGridData - Array of workflow mapping grid items.
 * @example handleWorkflowMappingSelections(isCCFGridLoading, setWorkflowMappingSelections, dispatch, newWorkflowMappingSelections, workflowMappingSelections, workflowMappingGridData)
 */
export const handleWorkflowMappingSelections = createAsyncThunk(HANDLE_WORKFLOW_MAPPING_SELECTIONS, (payload, { dispatch, extra }) => __awaiter(void 0, void 0, void 0, function* () {
    const { isCCFGridLoading, newWorkflowMappingSelections, workflowMappingSelections, workflowMappingGridData } = payload;
    if (isCCFGridLoading)
        return -1;
    // NOTE: REMOVING SELECTION
    if (newWorkflowMappingSelections.length < workflowMappingSelections.length) {
        dispatch(extra.CcfWorkflowConfigEditorSlice.CcfWorkflowConfigEditorActions.setWorkflowMappingSelections(newWorkflowMappingSelections));
        return -2;
    }
    const defaultSearchWorkflow = workflowMappingGridData.filter((item) => item.action === 'Search');
    const selectedDynamicDataItem = workflowMappingGridData.filter(item => item.action === 'DynamicData' && workflowMappingSelections.includes(item.id));
    const workflowMappingGridDataById = workflowMappingGridData.reduce((object, item) => (Object.assign(Object.assign({}, object), { [item.id]: item })), {});
    const target = workflowMappingGridDataById[newWorkflowMappingSelections[newWorkflowMappingSelections.length - 1]];
    const selectionsByAction = newWorkflowMappingSelections.reduce((accumulator, id) => {
        const { action } = workflowMappingGridDataById[id];
        if (!accumulator[action]) {
            accumulator[action] = 0;
        }
        accumulator[action]++;
        return accumulator;
    }, {});
    //NOTE: uncheck search if dd is selected
    let newSelections = [];
    if (target.action === 'DynamicData') {
        newSelections = newWorkflowMappingSelections.filter(item => item !== defaultSearchWorkflow[0].id);
    }
    else if (target.action === 'Search' && selectedDynamicDataItem.length > 0) {
        newSelections = newWorkflowMappingSelections.filter(item => item !== selectedDynamicDataItem[0].id);
    }
    else {
        newSelections = newWorkflowMappingSelections;
    }
    // NOTE: PREVENT MULTIPLE SELECTIONS OF THE SAME ACTION TYPE
    if (selectionsByAction[target.action] > 1) {
        return -3;
    }
    dispatch(extra.CcfWorkflowConfigEditorSlice.CcfWorkflowConfigEditorActions.setWorkflowMappingSelections(newSelections));
    return 0;
}));
//# sourceMappingURL=index.js.map