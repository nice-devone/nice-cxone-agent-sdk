import { Config } from './enhanced-workflow-models';
import { WorkflowPayloadGenerator } from './workflow-payload-generator';
/**
 * Factory for creating CRM query generators based on CRM name
 */
export declare class WorkflowPayloadGeneratorFactory {
    /**
   * @param config - Configuration object
   * @example
   * ```
   * const crmQueryGenerator = WorkflowPayloadGenerator.createCRMQueryGenerator(CRM.Salesforce, config);
   * ```
     */
    static getWorkflowPayloadGenerator(config: Config): WorkflowPayloadGenerator;
}
