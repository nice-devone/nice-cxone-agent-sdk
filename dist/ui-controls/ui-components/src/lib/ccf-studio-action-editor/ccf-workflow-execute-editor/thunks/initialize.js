import { __awaiter } from "tslib";
import { toast } from 'react-toastify';
import { createAsyncThunk } from '@reduxjs/toolkit';
import * as CcfStudioActionEditorSlice from '../../ccf-studio-action-editor.slice';
import * as CcfWorkflowExecuteEditorSlice from '../../ccf-workflow-execute-editor/ccf-workflow-execute-editor.slice';
import CONSTANTS from '../constants';
const INITIALIZE = `${CONSTANTS.WORKFLOW_EXECUTE_EDITOR_SLICE_KEY}/initialize`;
/**
 * initialize the workflow execute editor
 */
export default createAsyncThunk(INITIALIZE, (_, { dispatch, getState, extra }) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g;
    try {
        let rootState = (_a = getState()) !== null && _a !== void 0 ? _a : {};
        const { token, data = {} } = (_b = rootState[CcfStudioActionEditorSlice.STUDIO_ACTION_EDITOR_SLICE_KEY]) !== null && _b !== void 0 ? _b : {};
        const authenticate = yield dispatch(extra.CcfStudioActionEditorSlice.authenticate(token));
        if (authenticate === null || authenticate === void 0 ? void 0 : authenticate.error) {
            throw authenticate === null || authenticate === void 0 ? void 0 : authenticate.error;
        }
        const { configurationId, workflowId, actionType, dynamicDataMappingId, } = data;
        dispatch(extra.CcfWorkflowExecuteEditorSlice.CcfWorkflowExecuteEditorActions.setActionsForDropdown());
        // #region INITIALIZE: CONFIGURATION
        const fetchConfigurations = extra.CcfWorkflowExecuteEditorSlice.thunks.fetchConfigurations();
        yield fetchConfigurations(dispatch, getState, {});
        if (!extra.helpers.cxs.validate.workflowExecute.configuration.isProvided(configurationId)) {
            dispatch(extra.CcfWorkflowExecuteEditorSlice.CcfWorkflowExecuteEditorActions.setInitializing(false));
            return -1;
        }
        rootState = (_c = getState()) !== null && _c !== void 0 ? _c : {};
        const { configurationByConfigurationId = {} } = (_d = rootState[CONSTANTS.WORKFLOW_EXECUTE_EDITOR_SLICE_KEY]) !== null && _d !== void 0 ? _d : {};
        if (Boolean(configurationId) && !extra.helpers.cxs.validate.workflowExecute.configuration.isValid(configurationId, configurationByConfigurationId)) {
            toast.error('Configuration is inactive or does not exist', {
                autoClose: false,
                hideProgressBar: true,
                progress: undefined,
            });
            dispatch(extra.CcfWorkflowExecuteEditorSlice.CcfWorkflowExecuteEditorActions.setInitializing(false));
            if (extra.helpers.cxs.validate.workflowExecute.workflow.isProvided(workflowId)) {
                toast.info('Unable to source workflow due to invalid configuration');
            }
            return -2;
        }
        dispatch(extra.CcfWorkflowExecuteEditorSlice.CcfWorkflowExecuteEditorActions.setSelectedAgentConfigurations([
            configurationByConfigurationId[configurationId]
        ]));
        // #endregion INITIALIZE: CONFIGURATION
        // #region INITALIZE: WORKFLOWS/MAPPINGS
        const fetchConfigurationWorkflows = extra.CcfWorkflowExecuteEditorSlice.thunks.fetchConfigurationWorkflows(configurationId);
        yield fetchConfigurationWorkflows(dispatch, getState, {});
        const fetchDynamicDataMappings = extra.CcfWorkflowExecuteEditorSlice.thunks.fetchDynamicDataMappings(configurationId);
        yield fetchDynamicDataMappings(dispatch, getState, {});
        if (!extra.helpers.cxs.validate.workflowExecute.workflow.isProvided(workflowId)) {
            dispatch(extra.CcfWorkflowExecuteEditorSlice.CcfWorkflowExecuteEditorActions.setInitializing(false));
            return -3;
        }
        rootState = (_e = getState()) !== null && _e !== void 0 ? _e : {};
        const { workflowsByConfigurations = {} } = (_f = rootState[CONSTANTS.WORKFLOW_EXECUTE_EDITOR_SLICE_KEY]) !== null && _f !== void 0 ? _f : {};
        if (!extra.helpers.cxs.validate.workflowExecute.workflow.isValid(workflowId, workflowsByConfigurations[configurationId])) {
            toast.error('Select a valid workflow from list', {
                autoClose: false,
                hideProgressBar: true,
                progress: undefined,
            });
            dispatch(CcfWorkflowExecuteEditorSlice.CcfWorkflowExecuteEditorActions.setInitializing(false));
            return -4;
        }
        let workflowMappingSelections;
        if (actionType === 'DynamicData') {
            workflowMappingSelections = [dynamicDataMappingId];
        }
        else if (actionType === 'DynamicCreateData') {
            workflowMappingSelections = [dynamicDataMappingId + 'Create'];
        }
        else {
            workflowMappingSelections = [workflowId];
        }
        dispatch(extra.CcfWorkflowExecuteEditorSlice.CcfWorkflowExecuteEditorActions.setWorkflowMappingSelections(workflowMappingSelections));
        // #endregion INITALIZE: WORKFLOWS/MAPPINGS
        // #region INITIALIZE: ACTIONS
        const workflow = ((_g = workflowsByConfigurations[configurationId]) !== null && _g !== void 0 ? _g : []).find((workflow) => (workflow === null || workflow === void 0 ? void 0 : workflow.workflowId) === workflowId);
        let actions = [actionType ? actionType : workflow === null || workflow === void 0 ? void 0 : workflow.workflowAction];
        if (actionType === 'DynamicData') {
            actions = ['Search'];
        }
        else if (actionType === 'Timeline' || actionType === 'DynamicCreateData') {
            actions = ['Create'];
        }
        dispatch(extra.CcfWorkflowExecuteEditorSlice.CcfWorkflowExecuteEditorActions.setSelectedWorkflowExecuteActions(actions));
        // #endregion INITIALIZE: ACTIONS
    }
    catch (error) {
        toast.error('Unable to initialize', {
            autoClose: false,
            hideProgressBar: true,
            progress: undefined,
        });
        extra.logger.error(INITIALIZE, `payload: ${JSON.stringify(error)}`);
    }
    dispatch(extra.CcfWorkflowExecuteEditorSlice.CcfWorkflowExecuteEditorActions.setInitializing(false));
    return 0;
}));
//# sourceMappingURL=initialize.js.map