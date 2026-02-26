export declare enum WorkflowType {
    Search = "Search",
    DynamicData = "DynamicData",
    Create = "Create",
    DynamicCreateData = "DynamicCreateData",
    Update = "Update"
}
export declare enum WorkflowSubType {
    PhoneNumberSearch = "PhoneNumberSearch",
    EmailSearch = "EmailSearch",
    CustomSearch = "CustomSearch",
    AutomaticCreate = "AutomaticCreate",
    ManualCreate = "ManualCreate"
}
export declare enum CRM {
    Dynamics = "Microsoft Dynamics 365",
    HubSpot = "HubSpot",
    ServiceNow = "ServiceNow",
    Salesforce = "Salesforce",
    Kustomer = "Kustomer",
    OracleServiceCloud = "Oracle Service Cloud",
    ZenDesk = "Zendesk"
}
export declare enum ComparisonOperator {
    equals = "equals",
    notequals = "notequals"
}
export declare enum ComparisonCondition {
    and = "and",
    or = "or"
}
export interface Column {
    columnName: string;
    columnAPIName: string;
    operator: ComparisonOperator;
    value: string;
    condition: ComparisonCondition;
}
export interface Entity {
    entityName: string;
    entityAPIName: string;
    columns: Column[];
    displayName?: string;
}
export interface Config {
    name: string;
    configId: string;
    workflowId: string;
    workflowType: WorkflowType | string;
    workflowSubtype: WorkflowSubType;
    dynamicDataMappingId: string;
    crmName: CRM;
    workflowInputPayload: object;
    phoneNumber: string;
    emailAddress: string;
    screenPop?: string;
    pinnedRecord?: string;
    relatesTo?: string;
    cacheResponse?: string;
    entities: Entity[];
}
export interface AgentIntegrationEntityField {
    label: string;
    name: string;
    fields: AgentIntegrationFieldsParams[];
}
export interface AgentIntegrationWorkflowEntitiesFields {
    entities: AgentIntegrationEntityField[];
}
export interface AgentIntegrationEntities {
    label: string;
    name: string;
}
export interface AgentIntegrationFieldsParams extends AgentIntegrationEntities {
    isUpdatable: boolean;
}
export interface AgentIntegrationWorkflowEntities {
    entities: AgentIntegrationEntities[];
}
export interface AgentIntegrationAddedRow {
    fieldName: string;
    operator: ComparisonOperator;
    variable: string;
    condition: ComparisonCondition;
}
export interface AgentIntegrationWorkflowRowOperation {
    row: AgentIntegrationAddedRow;
    entity: string;
    entityAPIName: string;
}
export interface EnhancedWorkflowConfigs {
    version: string;
    configs: Config[];
}
export declare const EnhancedWorkflowOperatorsEnum: {
    equal: string;
    equals: string;
    notequal: string;
    notequals: string;
};
export declare const EnhancedWorkflowConditionTypeEnum: {
    and: string;
    or: string;
};
export interface TestResponseFields {
    [key: string]: string;
}
