import { CRM, WorkflowSubType } from './enhanced-workflow-models';
import { FeatureToggleService } from '@nice-devone/core-sdk';
/**
 * returns the supported workflow types for a CRM
 */
export class CRMSupportedWorkflowTypes {
    /**
     * constructor
     * @example
     * ```
     * const crmSupportedWorkflowTypes = new CRMSupportedWorkflowTypes();
     * ```
     */
    constructor() {
        this.CRMSupportedWorkflows = [
            {
                key: CRM.Dynamics,
                supportedWorkflowTypes: [
                    WorkflowSubType.PhoneNumberSearch,
                    WorkflowSubType.EmailSearch,
                    WorkflowSubType.CustomSearch,
                    WorkflowSubType.AutomaticCreate,
                    WorkflowSubType.ManualCreate
                ],
            },
            {
                key: CRM.HubSpot,
                supportedWorkflowTypes: [
                    WorkflowSubType.PhoneNumberSearch,
                    WorkflowSubType.EmailSearch,
                    WorkflowSubType.CustomSearch,
                    WorkflowSubType.AutomaticCreate,
                    WorkflowSubType.ManualCreate
                ],
            },
            {
                key: CRM.Kustomer,
                supportedWorkflowTypes: [
                    WorkflowSubType.PhoneNumberSearch,
                    WorkflowSubType.EmailSearch
                ],
            },
            {
                key: CRM.OracleServiceCloud,
                supportedWorkflowTypes: [
                    WorkflowSubType.PhoneNumberSearch,
                    WorkflowSubType.EmailSearch
                ],
            },
            {
                key: CRM.Salesforce,
                supportedWorkflowTypes: [
                    WorkflowSubType.PhoneNumberSearch,
                    WorkflowSubType.EmailSearch,
                    WorkflowSubType.CustomSearch,
                    WorkflowSubType.AutomaticCreate,
                    WorkflowSubType.ManualCreate
                ],
            },
            {
                key: CRM.ServiceNow,
                supportedWorkflowTypes: [
                    WorkflowSubType.PhoneNumberSearch,
                    WorkflowSubType.EmailSearch,
                    WorkflowSubType.CustomSearch,
                    WorkflowSubType.AutomaticCreate,
                    WorkflowSubType.ManualCreate
                ],
            },
            {
                key: CRM.ZenDesk,
                supportedWorkflowTypes: [
                    WorkflowSubType.PhoneNumberSearch,
                    WorkflowSubType.EmailSearch,
                    WorkflowSubType.CustomSearch,
                    WorkflowSubType.AutomaticCreate,
                    WorkflowSubType.ManualCreate
                ],
            }
        ];
    }
    /**
     * returns the supported workflow types for a CRM
     * @param crm - CRM
     * @returns
     * @example
     * ```
     * getCRMSupportedWorkflowTypes(CRM.Dynamics)
     * ```
     */
    getCRMSupportedWorkflowTypes(crm) {
        var _a, _b;
        return (((_b = (_a = this.CRMSupportedWorkflows.find((workflow) => workflow.key === crm)) === null || _a === void 0 ? void 0 : _a.supportedWorkflowTypes) === null || _b === void 0 ? void 0 : _b.filter((workflowType) => {
            if (workflowType === WorkflowSubType.ManualCreate) {
                // Enabling Manual create only when the FT is on
                return FeatureToggleService.instance.getFeatureToggleSync("release-studio-action-editor-manual-create-CRM-22314" /* FeatureToggles.ENHANCED_STUDIO_ACTION_EDITOR_MANUAL_CREATE */);
            }
            return true;
        })) || []);
    }
}
//# sourceMappingURL=crm-supported-workflow-types.js.map