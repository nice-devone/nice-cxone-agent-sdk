import { __awaiter } from "tslib";
import { toast } from 'react-toastify';
import * as helpers from '@nice-devone/shared-apps-lib';
import { WORKFLOW_CONFIG_ACTIONS, } from '../ccf-workflow-config-editor.slice';
import CONSTANTS from '../constants';
/**
 * Helper method to safely extract decoded JSON object from studio parameter value.
 * @param encoded - encoded string that is provided from the studio action properties
 * @example - decodeParameter(encoded)
 */
const decodeParameter = (encoded, workflowType) => {
    try {
        const decoded = window.atob(encoded);
        if (decoded === null || decoded.trim() === '') {
            return;
        }
        return JSON.parse(decoded);
    }
    catch (_error) {
        toast.error(`${workflowType} encoded string cannot be decoded properly`);
        return;
    }
};
/**
 * Function to handle logic for when the close button is clicked.
 * @example handleApply()
 */
const handleApply = (workflowMappingGridData, workflowMappingSelections) => __awaiter(void 0, void 0, void 0, function* () {
    const searchWorkflow = [];
    const timelineWorkflow = [];
    const dataMemorializationWorkflow = [];
    const defaultSearchWorkflow = workflowMappingGridData.filter((item) => item.action === 'Search');
    const selections = workflowMappingGridData.filter((data) => workflowMappingSelections.includes(data.id));
    for (const item of selections !== null && selections !== void 0 ? selections : []) {
        switch (item.action) {
            case WORKFLOW_CONFIG_ACTIONS.SEARCH:
                searchWorkflow.push({
                    configurationId: item.configurationId,
                    workflowId: item.workflowId,
                });
                break;
            case WORKFLOW_CONFIG_ACTIONS.TIMELINE:
                timelineWorkflow.push({
                    configurationId: item.configurationId,
                    workflowId: item.workflowId,
                });
                break;
            case WORKFLOW_CONFIG_ACTIONS.DATA_MEMORIALIZATION:
                dataMemorializationWorkflow.push({
                    configurationId: item.configurationId,
                    workflowId: item.workflowId,
                    workflowParam: { dataMappingId: item.dataMappingId },
                });
                break;
            case WORKFLOW_CONFIG_ACTIONS.DYNAMIC_DATA:
                searchWorkflow.push({
                    configurationId: item.configurationId,
                    workflowId: defaultSearchWorkflow[0].id,
                    workflowParam: { dynamicDataMappingId: item.dataMappingId },
                });
                break;
        }
    }
    const workflowConfigPropData = {
        searchWorkflow: searchWorkflow.length > 0 ? btoa(JSON.stringify(searchWorkflow)) : '',
        timelineWorkflow: timelineWorkflow.length > 0 ? btoa(JSON.stringify(timelineWorkflow)) : '',
        dataMemorializationWorkflow: dataMemorializationWorkflow.length > 0
            ? btoa(JSON.stringify(dataMemorializationWorkflow))
            : '',
    };
    yield helpers.cxs.studio.populate(workflowConfigPropData);
    yield helpers.cxs.studio.close();
});
/**
 * Function to handle logic for when the "CANCEL" button is clicked.
 * @example handleCancel()
 */
const handleCancel = (data, configurationByConfigurationId, workflowsByConfigurations, dataMappingsByConfigurations, isCCFGridLoading, sanitize, decodeParameter, determineParameterSanitization) => __awaiter(void 0, void 0, void 0, function* () {
    if (!isCCFGridLoading) {
        yield sanitize(data, configurationByConfigurationId, workflowsByConfigurations, dataMappingsByConfigurations, decodeParameter, determineParameterSanitization);
    }
    yield helpers.cxs.studio.close();
});
/**
 * Function to handle logic for clearing parameter.
 * @example determineParameterSanitization()
 */
const determineParameterSanitization = (parameterType, data, decodeParameter, configurationByConfigurationId = {}, workflowsByConfigurations = {}, dataMappingsByConfigurations = {}) => {
    var _a, _b, _c, _d, _e, _f;
    const [target] = (_a = decodeParameter(data[parameterType], parameterType)) !== null && _a !== void 0 ? _a : [];
    // ASSERTION: CAN THE PARAMETER VALUE BE DECODED?
    if (!target) {
        return true;
    }
    // ASSERTION: CAN A CONFIGURATION ID BE SOURCED FROM THE DECODED PARAMETER VALUE?
    if (!(target === null || target === void 0 ? void 0 : target.configurationId)) {
        return true;
    }
    // CAN A CONFIGURATION BE SOURCED USING THE CONFIGURATION ID (APPLIES TO INACTIVE CONFIGURATIONS, AS WE ONLY RETRIEVE ACTIVE CONFIGURATIONS)?
    if (!((_b = configurationByConfigurationId[target === null || target === void 0 ? void 0 : target.configurationId]) === null || _b === void 0 ? void 0 : _b.id)) {
        return true;
    }
    switch (parameterType) {
        case CONSTANTS.PARAMETERS.SEARCH_WORKFLOW: {
            const workflows = ((_c = workflowsByConfigurations[target === null || target === void 0 ? void 0 : target.configurationId]) !== null && _c !== void 0 ? _c : []).filter(workflow => workflow.workflowAction === WORKFLOW_CONFIG_ACTIONS.SEARCH);
            const id = target === null || target === void 0 ? void 0 : target.workflowId;
            // ASSERTION: CAN THE WORKFLOW ID BE SOURCED FROM THE DECODED PARAMETER VALUE?
            if (!id) {
                return true;
            }
            // ASSERTION: DOES THE WORKFLOW EXIST?
            if (!workflows.some(workflow => workflow.workflowId === id)) {
                return true;
            }
            break;
        }
        case CONSTANTS.PARAMETERS.TIMELINE_WORKFLOW: {
            const workflows = ((_d = workflowsByConfigurations[target === null || target === void 0 ? void 0 : target.configurationId]) !== null && _d !== void 0 ? _d : []).filter(workflow => workflow.workflowAction === WORKFLOW_CONFIG_ACTIONS.TIMELINE);
            const id = target === null || target === void 0 ? void 0 : target.workflowId;
            // ASSERTION: CAN THE WORKFLOW ID BE SOURCED FROM THE DECODED PARAMETER VALUE?
            if (!id) {
                return true;
            }
            // ASSERTION: DOES THE WORKFLOW EXIST?
            if (!workflows.some(workflow => workflow.workflowId === id)) {
                return true;
            }
            break;
        }
        case CONSTANTS.PARAMETERS.DATA_MEMORIALIZATION_WORKFLOW: {
            const mappings = (_e = dataMappingsByConfigurations[target === null || target === void 0 ? void 0 : target.configurationId]) !== null && _e !== void 0 ? _e : [];
            const id = (_f = target === null || target === void 0 ? void 0 : target.workflowParam) === null || _f === void 0 ? void 0 : _f.dataMappingId;
            // ASSERTION: CAN THE MAPPING ID BE SOURCED FROM THE DECODED PARAMETER VALUE?
            if (!id) {
                return true;
            }
            // ASSERTION: DOES THE MAPPING EXIST?
            if (!mappings.some(mapping => mapping.id === id)) {
                return true;
            }
            break;
        }
    }
    return false;
};
/**
 * Function to handle logic for clearing action parameters.
 * @example sanitize()
 */
const sanitize = (studioDataInput, configurationByConfigurationId, workflowsByConfigurations, dataMappingsByConfigurations, decodeParameter, determineParameterSanitization) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const data = {};
    if (((_a = studioDataInput === null || studioDataInput === void 0 ? void 0 : studioDataInput.searchWorkflow) !== null && _a !== void 0 ? _a : '').length > 0) {
        const shouldParameterBeCleared = determineParameterSanitization(CONSTANTS.PARAMETERS.SEARCH_WORKFLOW, studioDataInput, decodeParameter, configurationByConfigurationId, workflowsByConfigurations, {});
        if (shouldParameterBeCleared) {
            data[CONSTANTS.PARAMETERS.SEARCH_WORKFLOW] = '';
        }
    }
    if (((_b = studioDataInput === null || studioDataInput === void 0 ? void 0 : studioDataInput.timelineWorkflow) !== null && _b !== void 0 ? _b : '').length > 0) {
        const shouldParameterBeCleared = determineParameterSanitization(CONSTANTS.PARAMETERS.TIMELINE_WORKFLOW, studioDataInput, decodeParameter, configurationByConfigurationId, workflowsByConfigurations, {});
        if (shouldParameterBeCleared) {
            data[CONSTANTS.PARAMETERS.TIMELINE_WORKFLOW] = '';
        }
    }
    if (((_c = studioDataInput === null || studioDataInput === void 0 ? void 0 : studioDataInput.dataMemorializationWorkflow) !== null && _c !== void 0 ? _c : '').length > 0) {
        const shouldParameterBeCleared = determineParameterSanitization(CONSTANTS.PARAMETERS.DATA_MEMORIALIZATION_WORKFLOW, studioDataInput, decodeParameter, configurationByConfigurationId, {}, dataMappingsByConfigurations);
        if (shouldParameterBeCleared) {
            data[CONSTANTS.PARAMETERS.DATA_MEMORIALIZATION_WORKFLOW] = '';
        }
    }
    if (Object.keys(data).length > 0) {
        yield helpers.cxs.studio.populate(data);
    }
});
export { determineParameterSanitization, decodeParameter, sanitize, handleApply, handleCancel };
//# sourceMappingURL=index.js.map