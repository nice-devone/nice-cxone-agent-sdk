import { CRM, WorkflowSubType } from './enhanced-workflow-models';
/**
 * returns the supported workflow types for a CRM
 */
export declare class CRMSupportedWorkflowTypes {
    private CRMSupportedWorkflows;
    /**
     * constructor
     * @example
     * ```
     * const crmSupportedWorkflowTypes = new CRMSupportedWorkflowTypes();
     * ```
     */
    constructor();
    /**
     * returns the supported workflow types for a CRM
     * @param crm - CRM
     * @returns
     * @example
     * ```
     * getCRMSupportedWorkflowTypes(CRM.Dynamics)
     * ```
     */
    getCRMSupportedWorkflowTypes(crm: CRM): WorkflowSubType[];
}
