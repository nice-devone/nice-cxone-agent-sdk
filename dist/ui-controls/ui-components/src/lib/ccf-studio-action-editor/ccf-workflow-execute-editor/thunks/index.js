import { __awaiter } from "tslib";
import { createAsyncThunk } from '@reduxjs/toolkit';
import { CXoneClient } from '@nice-devone/agent-sdk';
import * as CcfStudioActionEditorSlice from '../../ccf-studio-action-editor.slice';
import * as CcfWorkflowExecuteEditorSlice from '../../ccf-workflow-execute-editor/ccf-workflow-execute-editor.slice';
import CONSTANTS from '../constants';
const FETCH_CONFIGURATIONS = `${CONSTANTS.WORKFLOW_EXECUTE_EDITOR_SLICE_KEY}/fetchConfigurations`;
const FETCH_WORKFLOW = `${CONSTANTS.WORKFLOW_EXECUTE_EDITOR_SLICE_KEY}/fetchConfigurationWorkflows`;
const FETCH_DYNAMIC_DATA_MAPPINGS = `${CONSTANTS.WORKFLOW_EXECUTE_EDITOR_SLICE_KEY}/fetchDynamicDataMappings`;
const HANDLE_CHANGE_IN_CONFIGURATION_DROPDOWN = `${CONSTANTS.WORKFLOW_EXECUTE_EDITOR_SLICE_KEY}/handleChangeInConfigurationDropdown`;
const HANDLE_DELETE_OF_SELECTED_CONFIGURATION = `${CONSTANTS.WORKFLOW_EXECUTE_EDITOR_SLICE_KEY}/handleDeleteOfSelectedConfiguration`;
const HANDLE_CHANGE_IN_ACTIONS_DROPDOWN = `${CONSTANTS.WORKFLOW_EXECUTE_EDITOR_SLICE_KEY}/handleChangeInactionsDropdown`;
const SET_DELETE_OF_WORKFLOW_EXECUTE_ACTIONS = `${CONSTANTS.WORKFLOW_EXECUTE_EDITOR_SLICE_KEY}/setDeleteOfWorkflowExecuteActions`;
const HANDLE_WORKFLOW_MAPPING_SELECTIONS = `${CONSTANTS.WORKFLOW_EXECUTE_EDITOR_SLICE_KEY}/handleWorkflowMappingSelections`;
const HANDLE_CANCEL = `${CONSTANTS.WORKFLOW_EXECUTE_EDITOR_SLICE_KEY}/handleCancel`;
const HANDLE_APPLY = `${CONSTANTS.WORKFLOW_EXECUTE_EDITOR_SLICE_KEY}/handleApply`;
/**
 * get all configurations
 * @example - dispatch(fetchConfigurations())
 */
export const fetchConfigurations = createAsyncThunk(FETCH_CONFIGURATIONS, (_, { dispatch, getState, extra }) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const rootState = (_a = getState()) !== null && _a !== void 0 ? _a : {};
        const { token } = (_b = rootState[CcfStudioActionEditorSlice.STUDIO_ACTION_EDITOR_SLICE_KEY]) !== null && _b !== void 0 ? _b : {};
        const response = (_c = (yield CXoneClient.instance.agentIntegrationConfigurationService.getConfigurations(token))) !== null && _c !== void 0 ? _c : {};
        dispatch(CcfWorkflowExecuteEditorSlice.CcfWorkflowExecuteEditorActions.setConfigurations(response));
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
    var _d, _e, _f;
    try {
        const rootState = (_d = getState()) !== null && _d !== void 0 ? _d : {};
        const { token } = (_e = rootState[CcfStudioActionEditorSlice.STUDIO_ACTION_EDITOR_SLICE_KEY]) !== null && _e !== void 0 ? _e : {};
        const response = (_f = (yield CXoneClient.instance.agentIntegrationConfigurationService.getConfigurationWorkflows(configurationId, token))) !== null && _f !== void 0 ? _f : {};
        dispatch(CcfWorkflowExecuteEditorSlice.CcfWorkflowExecuteEditorActions.setWorkflows(response));
    }
    catch (error) {
        extra.logger.error(FETCH_WORKFLOW, `payload: ${JSON.stringify(error)}`);
    }
}));
/**
 * get all data mapping info
 * @example - dispatch(fetchDynamicDataMappings(configurationId))
 */
export const fetchDynamicDataMappings = createAsyncThunk(FETCH_DYNAMIC_DATA_MAPPINGS, (configurationId, { dispatch, getState, extra }) => __awaiter(void 0, void 0, void 0, function* () {
    var _g, _h, _j;
    try {
        const rootState = (_g = getState()) !== null && _g !== void 0 ? _g : {};
        const { token } = (_h = rootState[CcfStudioActionEditorSlice.STUDIO_ACTION_EDITOR_SLICE_KEY]) !== null && _h !== void 0 ? _h : {};
        const response = (_j = (yield CXoneClient.instance.agentIntegrationConfigurationService.getDynamicDataMappings(configurationId, token))) !== null && _j !== void 0 ? _j : {};
        dispatch(CcfWorkflowExecuteEditorSlice.CcfWorkflowExecuteEditorActions.setDynamicDataMappings(Object.assign(Object.assign({}, response), { configurationId })));
    }
    catch (error) {
        extra.logger.error(FETCH_DYNAMIC_DATA_MAPPINGS, `payload: ${JSON.stringify(error)}`);
    }
}));
/**
 * Function to handle logic for when a change in the configuration dropdown occurs.
 * @example handleChangeInConfigurationDropdown()
 */
export const handleChangeInConfigurationDropdown = createAsyncThunk(HANDLE_CHANGE_IN_CONFIGURATION_DROPDOWN, (configurationId, { dispatch, getState, extra }) => __awaiter(void 0, void 0, void 0, function* () {
    var _k, _l;
    const rootState = (_k = getState()) !== null && _k !== void 0 ? _k : {};
    const { configurationByConfigurationId = {} } = (_l = rootState[CONSTANTS.WORKFLOW_EXECUTE_EDITOR_SLICE_KEY]) !== null && _l !== void 0 ? _l : {};
    const configuration = configurationByConfigurationId[configurationId];
    dispatch(extra.CcfWorkflowExecuteEditorSlice.CcfWorkflowExecuteEditorActions.setLoading(true));
    try {
        yield Promise.all([
            dispatch(extra.CcfWorkflowExecuteEditorSlice.CcfWorkflowExecuteEditorActions.setSelectedAgentConfigurations([configuration])),
            dispatch(extra.CcfWorkflowExecuteEditorSlice.CcfWorkflowExecuteEditorActions.clearWorkflowMappingSelections()),
            dispatch(extra.CcfWorkflowExecuteEditorSlice.thunks.fetchConfigurationWorkflows(configurationId)),
            dispatch(extra.CcfWorkflowExecuteEditorSlice.thunks.fetchDynamicDataMappings(configurationId))
        ]);
    }
    catch (error) {
        extra.logger.error(HANDLE_CHANGE_IN_CONFIGURATION_DROPDOWN, `payload: ${error === null || error === void 0 ? void 0 : error.message}`);
    }
    dispatch(extra.CcfWorkflowExecuteEditorSlice.CcfWorkflowExecuteEditorActions.setLoading(false));
}));
/**
 * Function to handle logic for when a selected configuration is deleted.
 * @example handleDeleteOfSelectedConfiguration()
 */
export const handleDeleteOfSelectedConfiguration = createAsyncThunk(HANDLE_DELETE_OF_SELECTED_CONFIGURATION, (configuration, { dispatch, extra }) => __awaiter(void 0, void 0, void 0, function* () {
    dispatch(extra.CcfWorkflowExecuteEditorSlice.CcfWorkflowExecuteEditorActions.removeSelectedAgentConfiguration(configuration));
}));
/**
 * Function to handle logic for when a change in the actions dropdown occurs.
 * @example handleChangeInActionsDropdown()
 */
export const handleChangeInActionsDropdown = createAsyncThunk(HANDLE_CHANGE_IN_ACTIONS_DROPDOWN, (actions, { dispatch, extra }) => __awaiter(void 0, void 0, void 0, function* () {
    dispatch(extra.CcfWorkflowExecuteEditorSlice.CcfWorkflowExecuteEditorActions.setSelectedWorkflowExecuteActions(actions));
}));
/**
 * Function to handle logic for when a selected action is deleted.
 * @example setDeleteOfWorkflowExecuteActions()
 */
export const setDeleteOfWorkflowExecuteActions = createAsyncThunk(SET_DELETE_OF_WORKFLOW_EXECUTE_ACTIONS, (action, { dispatch, extra }) => __awaiter(void 0, void 0, void 0, function* () {
    dispatch(extra.CcfWorkflowExecuteEditorSlice.CcfWorkflowExecuteEditorActions.removeSelectedWorkflowExecuteAction(action));
}));
/**
 * Function to handle logic for when an item in CcfGrid is selected.
 * @example handleWorkflowMappingSelections(newWorkflowMappingSelections)
 */
export const handleWorkflowMappingSelections = createAsyncThunk(HANDLE_WORKFLOW_MAPPING_SELECTIONS, (selections, { dispatch, getState, extra }) => __awaiter(void 0, void 0, void 0, function* () {
    var _m, _o;
    const rootState = (_m = getState()) !== null && _m !== void 0 ? _m : {};
    const { loading, workflowMappingSelections } = (_o = rootState[CONSTANTS.WORKFLOW_EXECUTE_EDITOR_SLICE_KEY]) !== null && _o !== void 0 ? _o : {};
    if (loading) {
        return -1;
    }
    if (selections.length < workflowMappingSelections.length) {
        dispatch(extra.CcfWorkflowExecuteEditorSlice.CcfWorkflowExecuteEditorActions.setWorkflowMappingSelections(selections));
        return 0;
    }
    const selection = [...(selections !== null && selections !== void 0 ? selections : [])].pop();
    if (selection) {
        dispatch(extra.CcfWorkflowExecuteEditorSlice.CcfWorkflowExecuteEditorActions.setWorkflowMappingSelections([selection]));
        return 1;
    }
    else {
        return -2;
    }
}));
/**
 * Function to handle logic for when the "CANCEL" button is clicked.
 * @example handleCancel()
 */
export const handleCancel = createAsyncThunk(HANDLE_CANCEL, ({ configurationId, workflowId }, { getState, extra }) => __awaiter(void 0, void 0, void 0, function* () {
    var _p, _q;
    const rootState = (_p = getState()) !== null && _p !== void 0 ? _p : {};
    const { loading, workflowsByConfigurations, configurationByConfigurationId } = (_q = rootState[CONSTANTS.WORKFLOW_EXECUTE_EDITOR_SLICE_KEY]) !== null && _q !== void 0 ? _q : {};
    const data = {};
    if (!loading) {
        if (!extra.helpers.cxs.validate.workflowExecute.configuration.isValid(configurationId, configurationByConfigurationId)) {
            data[CONSTANTS.PARAMETERS.CONFIGURATION_ID] = '';
        }
        if (!extra.helpers.cxs.validate.workflowExecute.workflow.isValid(workflowId, workflowsByConfigurations[configurationId])) {
            data[CONSTANTS.PARAMETERS.WORKFLOW_ID] = '';
        }
        if (Object.keys(data).length > 0) {
            yield extra.helpers.cxs.studio.populate(data);
        }
    }
    yield extra.helpers.cxs.studio.close();
}));
/**
 * Function to handle logic for setting studio action parameters.
 * @example handleApply()
 */
export const handleApply = createAsyncThunk(HANDLE_APPLY, (_, { getState, extra }) => __awaiter(void 0, void 0, void 0, function* () {
    var _r, _s, _t;
    const rootState = (_r = getState()) !== null && _r !== void 0 ? _r : {};
    const { selectedConfigurations = [], workflowMappingSelections = [], workflowMappingGridData = [] } = (_s = rootState[CONSTANTS.WORKFLOW_EXECUTE_EDITOR_SLICE_KEY]) !== null && _s !== void 0 ? _s : {};
    const [configuration = {}] = selectedConfigurations;
    const [selection] = (_t = (workflowMappingGridData !== null && workflowMappingGridData !== void 0 ? workflowMappingGridData : []).filter((data) => workflowMappingSelections.includes(data === null || data === void 0 ? void 0 : data.id)).map((data) => {
        const trimmedId = (data === null || data === void 0 ? void 0 : data.id.endsWith('Create')) ? data === null || data === void 0 ? void 0 : data.id.slice(0, -6) : data === null || data === void 0 ? void 0 : data.id;
        return Object.assign(Object.assign({}, data), { id: trimmedId });
    })) !== null && _t !== void 0 ? _t : [];
    const data = {
        configurationId: configuration === null || configuration === void 0 ? void 0 : configuration.id,
        workflowId: selection === null || selection === void 0 ? void 0 : selection.workflowId,
        actionType: selection === null || selection === void 0 ? void 0 : selection.action,
        dynamicDataMappingId: ((selection === null || selection === void 0 ? void 0 : selection.action) === 'DynamicData' || (selection === null || selection === void 0 ? void 0 : selection.action) === 'DynamicCreateData') ? selection === null || selection === void 0 ? void 0 : selection.id : '',
    };
    yield extra.helpers.cxs.studio.populate(data);
    yield extra.helpers.cxs.studio.close();
}));
export { default as initialize } from './initialize';
//# sourceMappingURL=index.js.map