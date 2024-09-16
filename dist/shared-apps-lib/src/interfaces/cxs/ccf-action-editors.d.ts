/**
 * AgentIntegrationConfigurationResult Model class
 */
export interface AgentIntegrationConfigurationResult {
    /**
     * @remarks configurations
     */
    configurations: AgentIntegrationConfiguration[];
    /**
     * @remarks links
     */
    links?: string[] | null;
    /**
     * @remarks total number of records.
     */
    totalRecords: number;
}
/**
 * AgentIntegrationConfiguration Model class
 */
export interface AgentIntegrationConfiguration {
    /**
     * @remarks configuration description
     */
    description: string;
    /**
     * @remarks configuration id
     */
    id: string;
    /**
     * @remarks configuration instance id
     */
    instanceId?: string;
    /**
     * @remarks configuration name
     */
    name: string;
    /**
     * @remarks configuration status
     */
    status: string;
    /**
     * @remarks configuration type id
     */
    typeId: string;
    /**
     * @remarks configuration type name
     */
    typeName: string;
}
/**
 * Workflow Model class
 */
export interface AgentIntegrationWorkflowResult {
    /**
     * @remarks workflow instance id
     */
    instanceId: string;
    /**
     * @remarks workflow id
     */
    id: string;
    /**
     * @remarks workflow type id
     */
    typeId: string;
    /**
     * @remarks workflow data
     */
    workflows: AgentIntegrationWorkflow[];
}
/**
 * Workflow Model class
 */
export interface AgentIntegrationWorkflow {
    /**
     * @remarks workflow action
     */
    workflowAction: string | null;
    /**
     * @remarks workflow id
     */
    workflowId: string;
    /**
     * @remarks workflow name
     */
    workflowName: string;
}
/**
 * Data Mapping Model class
 */
export interface AgentIntegrationDataMappingResult {
    /**
     * @remarks data mapping records
     */
    dataMappings: AgentIntegrationDataMapping[];
    /**
     * @remarks number of records
     */
    totalRecords: number;
}
/**
 * Dynamic Data Mapping Model class
 */
export interface AgentIntegrationDynamicDataMappingResult {
    /**
     * @remarks data mapping records
     */
    dataMappings: AgentIntegrationDynamicDataMapping[];
    /**
     * @remarks number of records
     */
    totalRecords: number;
}
/**
 * Workflow Model class
 */
export interface AgentIntegrationDataMapping {
    /**
     * @remarks description of the data mapping
     */
    description: string;
    /**
     * @remarks entities in the data mapping
     */
    entities: string;
    /**
     * @remarks id for the data mapping
     */
    id: string;
    /**
     * @remarks name of the data mapping
     */
    name: string;
    /**
     * @remarks status of the data mapping
     */
    status: string;
}
/**
 * Workflow Model class
 */
export interface AgentIntegrationDynamicDataMapping {
    /**
     * @remarks description of the data mapping
     */
    description: string;
    /**
     * @remarks entities in the data mapping
     */
    entities: string;
    /**
     * @remarks id for the data mapping
     */
    id: string;
    /**
     * @remarks name of the data mapping
     */
    name: string;
    /**
     * @remarks status of the data mapping
     */
    status: string;
}
export interface ConfigurationByConfigurationId {
    [id: string]: AgentIntegrationConfiguration;
}
export interface WorkflowsByConfigurations {
    [id: string]: AgentIntegrationWorkflow[];
}
export interface DataMappingsByConfigurations {
    [id: string]: AgentIntegrationDataMapping[];
}
export interface DynamicDataMappingsByConfigurations {
    [id: string]: AgentIntegrationDynamicDataMapping[];
}
export interface ActionForDropdown {
    value: string;
    label: string;
}
export interface AgentWorkflowMappingGridData {
    id: string;
    configurationId: string;
    configuration: string;
    type: string;
    workflowId: string;
    dataMappingId?: string;
    name: string;
    action: string;
    actionLabel: string;
}
export interface CcfActionEditorSlice {
    /**
     * @remarks state for configurations
     */
    configurations: AgentIntegrationConfiguration[];
    /**
     * @remarks state for configurations by configuration id
     */
    configurationByConfigurationId: ConfigurationByConfigurationId;
    /**
     * @remarks state for the available actions
     */
    studioActionResult: string[];
    /**
     * @remarks state for the workflows response
     */
    workflowsByConfigurations: WorkflowsByConfigurations;
    /**
     * @remarks state for the dynamic data mappings response
     */
    dataMappingsByConfigurations: DataMappingsByConfigurations;
    /**
     * @remarks state for the dynamic data mappings response
     */
    dynamicDataMappingsByConfigurations: DynamicDataMappingsByConfigurations;
    /**
     * @remarks state for the selected configurations
     */
    selectedConfigurations: AgentIntegrationConfiguration[];
    /**
     * @remarks state for the selected actions
     */
    selectedActions: string[];
    /**
     * @remarks state for actions dropdown options
     */
    actionsForDropdown: ActionForDropdown[];
    /**
     * @remarks state for the selected workflows and data mappings from the grid.
     */
    /**
     * @remarks state for the workflow mapping grid data
     */
    workflowMappingGridData: AgentWorkflowMappingGridData[];
    /**
     * @remarks state for initializing
     */
    initializing: boolean;
    /**
     * @remarks message to display on the grid when no data
     */
    workflowMappingGridMessage: string;
    /**
     * @remarks store value for if the editor is opened or not
     */
    open: boolean;
    /**
     * @remarks state for if the editor is loading
     */
    loading: boolean;
    /**
     * @remarks state grid selection
     */
    selection: any;
}
