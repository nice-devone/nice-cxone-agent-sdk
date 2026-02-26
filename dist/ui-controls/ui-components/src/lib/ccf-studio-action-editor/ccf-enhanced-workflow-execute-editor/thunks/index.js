import { __awaiter } from "tslib";
import { createAsyncThunk } from '@reduxjs/toolkit';
import { CXoneClient } from '@nice-devone/agent-sdk';
import * as CcfStudioActionEditorSlice from '../../ccf-studio-action-editor.slice';
import * as CcfEnhancedWorkflowExecuteEditorSlice from '../ccf-enhanced-workflow-execute-editor.slice';
import CONSTANTS from '../constants';
const FETCH_CONFIGURATIONS = `${CONSTANTS.ENHANCED_WORKFLOW_EXECUTE_EDITOR_SLICE_KEY}/fetchConfigurations`;
const FETCH_WORKFLOW = `${CONSTANTS.ENHANCED_WORKFLOW_EXECUTE_EDITOR_SLICE_KEY}/fetchConfigurationWorkflows`;
const FETCH_WORKFLOW_ENTITIES = `${CONSTANTS.ENHANCED_WORKFLOW_EXECUTE_EDITOR_SLICE_KEY}/fetchEntities`;
const FETCH_WORKFLOW_ENTITIES_FIELDS = `${CONSTANTS.ENHANCED_WORKFLOW_EXECUTE_EDITOR_SLICE_KEY}/fetchEntitiesFields`;
const FETCH_DYNAMIC_DATA_MAPPINGS = `${CONSTANTS.ENHANCED_WORKFLOW_EXECUTE_EDITOR_SLICE_KEY}/fetchDynamicDataMappings`;
const HANDLE_CANCEL = `${CONSTANTS.ENHANCED_WORKFLOW_EXECUTE_EDITOR_SLICE_KEY}/handleCancel`;
const HANDLE_APPLY = `${CONSTANTS.ENHANCED_WORKFLOW_EXECUTE_EDITOR_SLICE_KEY}/handleApply`;
/**
 * Function to handle logic for setting studio action parameters.
 * @example handleApply()
 */
export const handleApply = createAsyncThunk(HANDLE_APPLY, (_, { getState, extra }) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const rootState = (_a = getState()) !== null && _a !== void 0 ? _a : {};
    const { enhancedWorkflowConfigs = { version: '1.0', configs: [] } } = (_b = rootState[CONSTANTS.ENHANCED_WORKFLOW_EXECUTE_EDITOR_SLICE_KEY]) !== null && _b !== void 0 ? _b : {};
    const data = {
        workflowConfigsPayload: btoa(JSON.stringify(enhancedWorkflowConfigs)),
    };
    yield extra.helpers.cxs.studio.populate(data, true);
}));
/**
 * Function to handle logic for when the "CANCEL" button is clicked.
 * @example handleCancel()
 */
export const handleCancel = createAsyncThunk(HANDLE_CANCEL, (_, { extra }) => __awaiter(void 0, void 0, void 0, function* () {
    yield extra.helpers.cxs.studio.close();
}));
/**
 * get all crmSolutionInstances
 * @example - dispatch(fetchConfigurations())
 */
export const fetchConfigurations = createAsyncThunk(FETCH_CONFIGURATIONS, (_, { dispatch, getState, extra }) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d, _e;
    try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const rootState = (_c = getState()) !== null && _c !== void 0 ? _c : {};
        const { token } = (_d = rootState[CcfStudioActionEditorSlice.STUDIO_ACTION_EDITOR_SLICE_KEY]) !== null && _d !== void 0 ? _d : {};
        const response = (_e = (yield CXoneClient.instance.agentIntegrationConfigurationService.getConfigurations(token))) !== null && _e !== void 0 ? _e : {};
        dispatch(CcfEnhancedWorkflowExecuteEditorSlice.CcfenhancedWorkflowExecuteEditorActions.setEWEWorkflowsTestResult([]));
        dispatch(CcfEnhancedWorkflowExecuteEditorSlice.CcfenhancedWorkflowExecuteEditorActions.setCrmSolutionInstances(response));
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
    var _f, _g, _h;
    try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const rootState = (_f = getState()) !== null && _f !== void 0 ? _f : {};
        const { token } = (_g = rootState[CcfStudioActionEditorSlice.STUDIO_ACTION_EDITOR_SLICE_KEY]) !== null && _g !== void 0 ? _g : {};
        const response = (_h = (yield CXoneClient.instance.agentIntegrationConfigurationService.getConfigurationWorkflows(configurationId, token))) !== null && _h !== void 0 ? _h : {};
        dispatch(CcfEnhancedWorkflowExecuteEditorSlice.CcfenhancedWorkflowExecuteEditorActions.setWorkflows(response));
    }
    catch (error) {
        extra.logger.error(FETCH_WORKFLOW, `payload: ${JSON.stringify(error)}`);
    }
}));
//Test WorkFlow
export const fetchEWEConfigsTestResult = createAsyncThunk('TEST_SEARCH_WORKFLOW', (params, { dispatch, getState, extra, rejectWithValue }) => __awaiter(void 0, void 0, void 0, function* () {
    var _j, _k, _l;
    const { action, configId, workflowId, phoneNumber, email, searchFilter, createFilter, interactionID, contactID, dynamicDataMappingId, } = params;
    try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const rootState = getState();
        const { token } = (_j = rootState[CcfStudioActionEditorSlice.STUDIO_ACTION_EDITOR_SLICE_KEY]) !== null && _j !== void 0 ? _j : {};
        const requestPayload = {
            action,
            interactionID,
            contactID,
        };
        if (phoneNumber) {
            requestPayload.workflowInput = { phoneNumber };
        }
        else if (email) {
            requestPayload.workflowInput = { email };
        }
        else if (searchFilter) {
            requestPayload.workflowInput = searchFilter;
            requestPayload.dynamicDataMappingId = dynamicDataMappingId;
        }
        else if (createFilter) {
            requestPayload.workflowInput = createFilter;
        }
        const response = yield CXoneClient.instance.agentIntegrationConfigurationService.getEWEWorkflowsTestResult(configId, workflowId, token, requestPayload);
        dispatch(CcfEnhancedWorkflowExecuteEditorSlice.CcfenhancedWorkflowExecuteEditorActions.setEWEWorkflowsTestResult(response));
        extra.logger.info('TEST_SEARCH_WORKFLOW', 'Execution successful: ' + JSON.stringify(response));
        return response;
    }
    catch (error) {
        const err = error;
        const errorPayload = (_l = (_k = err === null || err === void 0 ? void 0 : err.data) === null || _k === void 0 ? void 0 : _k.body) !== null && _l !== void 0 ? _l : {
            error: 'Unknown_Error',
            error_description: (err === null || err === void 0 ? void 0 : err.message) || 'Something went wrong',
        };
        extra.logger.error('TEST_SEARCH_WORKFLOW', 'Execution failed: ' + JSON.stringify(errorPayload));
        return rejectWithValue({
            message: err.message || 'API Error',
            errorType: err.errorType || 'CXONE_API_ERROR',
            name: err.name || 'CXONE_API_ERROR',
            data: { body: errorPayload },
        });
    }
}));
/**
 * get all workflow info
 * @example - dispatch(fetchWorkflowEntities(configurationId))
 */
export const fetchWorkflowEntities = createAsyncThunk(FETCH_WORKFLOW_ENTITIES, (configurationId, { dispatch, getState, extra }) => __awaiter(void 0, void 0, void 0, function* () {
    var _m, _o, _p;
    try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const rootState = (_m = getState()) !== null && _m !== void 0 ? _m : {};
        const { token } = (_o = rootState[CcfStudioActionEditorSlice.STUDIO_ACTION_EDITOR_SLICE_KEY]) !== null && _o !== void 0 ? _o : {};
        const response = (_p = (yield CXoneClient.instance.agentIntegrationConfigurationService.getWorkflowsEntities(configurationId, token))) !== null && _p !== void 0 ? _p : {};
        dispatch(CcfEnhancedWorkflowExecuteEditorSlice.CcfenhancedWorkflowExecuteEditorActions.setEntities(response));
    }
    catch (error) {
        extra.logger.error(FETCH_WORKFLOW, `payload: ${JSON.stringify(error)}`);
    }
}));
/**
 * get all workflow info
 * @example - dispatch(fetchWorkflowEntitiesFields(configurationId))
 */
export const fetchWorkflowEntitiesFields = createAsyncThunk(FETCH_WORKFLOW_ENTITIES_FIELDS, ({ configurationId, entityName }, { dispatch, getState, extra }) => __awaiter(void 0, void 0, void 0, function* () {
    var _q, _r, _s;
    try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const rootState = (_q = getState()) !== null && _q !== void 0 ? _q : {};
        const { token } = (_r = rootState[CcfStudioActionEditorSlice.STUDIO_ACTION_EDITOR_SLICE_KEY]) !== null && _r !== void 0 ? _r : {};
        // Fetch entityName from the state or use a default value
        const response = (_s = (yield CXoneClient.instance.agentIntegrationConfigurationService.getWorkflowsEntitiesFields(configurationId, token, entityName))) !== null && _s !== void 0 ? _s : {};
        const entityFields = {
            [entityName]: [...response.entities[0].fields].sort((a, b) => a.label.toLowerCase().localeCompare(b.label.toLowerCase(), undefined, { sensitivity: 'base' })),
        };
        dispatch(CcfEnhancedWorkflowExecuteEditorSlice.CcfenhancedWorkflowExecuteEditorActions.setEntityFields(entityFields));
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
    var _t, _u, _v;
    try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const rootState = (_t = getState()) !== null && _t !== void 0 ? _t : {};
        const { token } = (_u = rootState[CcfStudioActionEditorSlice.STUDIO_ACTION_EDITOR_SLICE_KEY]) !== null && _u !== void 0 ? _u : {};
        const response = (_v = (yield CXoneClient.instance.agentIntegrationConfigurationService.getDynamicDataMappings(configurationId, token))) !== null && _v !== void 0 ? _v : {};
        dispatch(CcfEnhancedWorkflowExecuteEditorSlice.CcfenhancedWorkflowExecuteEditorActions.setDynamicDataMappings(Object.assign(Object.assign({}, response), { configurationId })));
    }
    catch (error) {
        extra.logger.error(FETCH_DYNAMIC_DATA_MAPPINGS, `payload: ${JSON.stringify(error)}`);
    }
}));
export { default as initialize } from './initialize';
//# sourceMappingURL=index.js.map