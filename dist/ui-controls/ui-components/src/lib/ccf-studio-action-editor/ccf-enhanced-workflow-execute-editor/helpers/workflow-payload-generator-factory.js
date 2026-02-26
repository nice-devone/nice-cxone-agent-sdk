// Factory for creating CRM query generators based on CRM name
import { CRM } from './enhanced-workflow-models';
import { DynamicskWorkflowPayloadGenerator } from './dynamics-workflow-payload-generator';
import { HubSpotWorkflowPayloadGenerator } from './hubspot-workflow-payload-generator';
import { SalesforceflowPayloadGenerator } from './salesforce-workflow-payload-generator';
import { ServiceNowWorkflowPayloadGenerator } from './servicenow-workflow-payload-generator';
import { ZendeskWorkflowPayloadGenerator } from './zendesk-workflow-payload-generator';
import { KustomerWorkflowPayloadGenerator } from './kustomer-workflow-payload-generator';
import { OracleServiceCloudWorkflowPayloadGenerator } from './oracleservicecloud-workflow-payload-generator';
/**
 * Factory for creating CRM query generators based on CRM name
 */
export class WorkflowPayloadGeneratorFactory {
    /**
   * @param config - Configuration object
   * @example
   * ```
   * const crmQueryGenerator = WorkflowPayloadGenerator.createCRMQueryGenerator(CRM.Salesforce, config);
   * ```
     */
    static getWorkflowPayloadGenerator(config) {
        switch (config.crmName) {
            case CRM.Dynamics:
                return new DynamicskWorkflowPayloadGenerator(config);
            case CRM.ServiceNow:
                return new ServiceNowWorkflowPayloadGenerator(config);
            case CRM.Salesforce:
                return new SalesforceflowPayloadGenerator(config);
            case CRM.ZenDesk:
                return new ZendeskWorkflowPayloadGenerator(config);
            case CRM.HubSpot:
                return new HubSpotWorkflowPayloadGenerator(config);
            case CRM.Kustomer:
                return new KustomerWorkflowPayloadGenerator(config);
            case CRM.OracleServiceCloud:
                return new OracleServiceCloudWorkflowPayloadGenerator(config);
            default:
                throw new Error('CRM not supported');
        }
    }
}
//# sourceMappingURL=workflow-payload-generator-factory.js.map