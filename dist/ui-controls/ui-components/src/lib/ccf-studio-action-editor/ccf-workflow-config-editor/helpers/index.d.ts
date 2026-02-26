import { WorkflowConfigStudioDataInput } from '../ccf-workflow-config-editor.slice';
import { WorkflowsByConfigurations, ConfigurationByConfigurationId, AgentWorkflowMappingGridData, DataMappingsByConfigurations } from '@nice-devone/shared-apps-lib';
export declare type WorkflowType = 'searchWorkflow' | 'timelineWorkflow' | 'dataMemorializationWorkflow' | 'payload';
declare type DecodeParameter = (encoded: string, workflowType: WorkflowType) => any | undefined;
/**
 * Helper method to safely extract decoded JSON object from studio parameter value.
 * @param encoded - encoded string that is provided from the studio action properties
 * @example - decodeParameter(encoded)
 */
declare const decodeParameter: DecodeParameter;
/**
 * Function to handle logic for when the close button is clicked.
 * @example handleApply()
 */
declare const handleApply: (workflowMappingGridData: AgentWorkflowMappingGridData[], workflowMappingSelections: import("@mui/x-data-grid").GridRowSelectionModel) => Promise<void>;
/**
 * Function to handle logic for when the "CANCEL" button is clicked.
 * @example handleCancel()
 */
declare const handleCancel: (data: WorkflowConfigStudioDataInput, configurationByConfigurationId: ConfigurationByConfigurationId, workflowsByConfigurations: WorkflowsByConfigurations, dataMappingsByConfigurations: DataMappingsByConfigurations, isCCFGridLoading: boolean, sanitize: Sanitize, decodeParameter: DecodeParameter, determineParameterSanitization: DetermineParameterSanitization) => Promise<void>;
declare type DetermineParameterSanitization = (parameterType: WorkflowType, data: WorkflowConfigStudioDataInput, decodeParameter: DecodeParameter, configurationByConfigurationId: ConfigurationByConfigurationId, workflowsByConfigurations: WorkflowsByConfigurations, dataMappingsByConfigurations: DataMappingsByConfigurations) => boolean;
/**
 * Function to handle logic for clearing parameter.
 * @example determineParameterSanitization()
 */
declare const determineParameterSanitization: DetermineParameterSanitization;
declare type Sanitize = (studioDataInput: WorkflowConfigStudioDataInput, configurationByConfigurationId: ConfigurationByConfigurationId, workflowsByConfigurations: WorkflowsByConfigurations, dataMappingsByConfigurations: DataMappingsByConfigurations, decodeParameter: DecodeParameter, determineParameterSanitization: DetermineParameterSanitization) => Promise<void>;
/**
 * Function to handle logic for clearing action parameters.
 * @example sanitize()
 */
declare const sanitize: Sanitize;
export { determineParameterSanitization, decodeParameter, sanitize, handleApply, handleCancel };
