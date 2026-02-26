import { __awaiter } from "tslib";
import { createAsyncThunk } from '@reduxjs/toolkit';
import * as CcfStudioActionEditorSlice from '../../ccf-studio-action-editor.slice';
import CONSTANTS from '../constants';
import { LocalStorageHelper, StorageKeys } from '@nice-devone/core-sdk';
const INITIALIZE = `${CONSTANTS.ENHANCED_WORKFLOW_EXECUTE_EDITOR_SLICE_KEY}/initialize`;
/**
 * initialize the enhanced workflow execute editor
 */
export default createAsyncThunk(INITIALIZE, (_, { dispatch, getState, extra }) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const rootState = (_a = getState()) !== null && _a !== void 0 ? _a : {};
        // Remove FT data as we don't have logout option for action editor
        LocalStorageHelper.removeItem(StorageKeys.FEATURE_TOGGLES);
        const { token, data = { workflowConfigsPayload: { version: '1.0', configs: [] } } } = (_b = rootState[CcfStudioActionEditorSlice.STUDIO_ACTION_EDITOR_SLICE_KEY]) !== null && _b !== void 0 ? _b : {};
        const authenticate = yield dispatch(extra.CcfStudioActionEditorSlice.authenticate(token));
        if (authenticate === null || authenticate === void 0 ? void 0 : authenticate.error) {
            throw authenticate === null || authenticate === void 0 ? void 0 : authenticate.error;
        }
        // #region INITIALIZE: CONFIGURATION
        const fetchConfigurations = extra.CcfEnhancedWorkflowExecuteEditorSlice.thunks.fetchConfigurations();
        yield fetchConfigurations(dispatch, getState, {});
        let newdata = data;
        if (!data.workflowConfigsPayload) {
            newdata = { version: '1.0', configs: [] };
        }
        else {
            const configdata = (window).atob(data.workflowConfigsPayload);
            newdata = JSON.parse(configdata);
        }
        dispatch(extra.CcfEnhancedWorkflowExecuteEditorSlice.CcfenhancedWorkflowExecuteEditorActions.setEnhancedWorkflowConfigs(newdata));
        dispatch(extra.CcfEnhancedWorkflowExecuteEditorSlice.CcfenhancedWorkflowExecuteEditorActions.setInitializing(false));
        dispatch(extra.CcfEnhancedWorkflowExecuteEditorSlice.CcfenhancedWorkflowExecuteEditorActions.setLoading(false));
        // #region Fetch Entities and Fields
        if (newdata.configs.length > 0) {
            const configuartinId = newdata.configs[0].id;
            const entityName = newdata.configs[0].entityName;
            const fetchEntities = yield dispatch(extra.CcfEnhancedWorkflowExecuteEditorSlice.thunks.fetchWorkflowEntities(configuartinId));
            if (fetchEntities === null || fetchEntities === void 0 ? void 0 : fetchEntities.error) {
                throw fetchEntities === null || fetchEntities === void 0 ? void 0 : fetchEntities.error;
            }
            const entities = fetchEntities.payload;
            for (const entity of entities) {
                const fetchEntityFields = yield dispatch(extra.CcfEnhancedWorkflowExecuteEditorSlice.thunks.fetchWorkflowEntitiesFields(configuartinId, entityName));
                if (fetchEntityFields === null || fetchEntityFields === void 0 ? void 0 : fetchEntityFields.error) {
                    throw fetchEntityFields === null || fetchEntityFields === void 0 ? void 0 : fetchEntityFields.error;
                }
                const entityFields = fetchEntityFields.payload;
                dispatch(extra.CcfEnhancedWorkflowExecuteEditorSlice.CcfenhancedWorkflowExecuteEditorActions.setEntityFields({
                    entityId: entity.id,
                    fields: entityFields,
                }));
            }
        }
    }
    catch (error) {
        extra.logger.error(INITIALIZE, `payload: ${JSON.stringify(error)}`);
    }
}));
//# sourceMappingURL=initialize.js.map