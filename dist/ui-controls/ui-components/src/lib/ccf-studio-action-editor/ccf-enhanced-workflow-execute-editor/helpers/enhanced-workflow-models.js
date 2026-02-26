export var WorkflowType;
(function (WorkflowType) {
    WorkflowType["Search"] = "Search";
    WorkflowType["DynamicData"] = "DynamicData";
    WorkflowType["Create"] = "Create";
    WorkflowType["DynamicCreateData"] = "DynamicCreateData";
    WorkflowType["Update"] = "Update";
})(WorkflowType || (WorkflowType = {}));
export var WorkflowSubType;
(function (WorkflowSubType) {
    WorkflowSubType["PhoneNumberSearch"] = "PhoneNumberSearch";
    WorkflowSubType["EmailSearch"] = "EmailSearch";
    WorkflowSubType["CustomSearch"] = "CustomSearch";
    WorkflowSubType["AutomaticCreate"] = "AutomaticCreate";
    WorkflowSubType["ManualCreate"] = "ManualCreate";
})(WorkflowSubType || (WorkflowSubType = {}));
export var CRM;
(function (CRM) {
    CRM["Dynamics"] = "Microsoft Dynamics 365";
    CRM["HubSpot"] = "HubSpot";
    CRM["ServiceNow"] = "ServiceNow";
    CRM["Salesforce"] = "Salesforce";
    CRM["Kustomer"] = "Kustomer";
    CRM["OracleServiceCloud"] = "Oracle Service Cloud";
    CRM["ZenDesk"] = "Zendesk";
})(CRM || (CRM = {}));
export var ComparisonOperator;
(function (ComparisonOperator) {
    ComparisonOperator["equals"] = "equals";
    ComparisonOperator["notequals"] = "notequals";
})(ComparisonOperator || (ComparisonOperator = {}));
export var ComparisonCondition;
(function (ComparisonCondition) {
    ComparisonCondition["and"] = "and";
    ComparisonCondition["or"] = "or";
})(ComparisonCondition || (ComparisonCondition = {}));
export const EnhancedWorkflowOperatorsEnum = {
    equal: 'Equals',
    equals: 'Equals',
    notequal: 'Not Equals',
    notequals: 'Not Equals',
};
export const EnhancedWorkflowConditionTypeEnum = {
    and: 'AND',
    or: 'OR',
};
//# sourceMappingURL=enhanced-workflow-models.js.map