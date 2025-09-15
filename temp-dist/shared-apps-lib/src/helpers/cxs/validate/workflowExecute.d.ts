import { ConfigurationByConfigurationId, AgentIntegrationWorkflow } from '../../../interfaces/cxs/ccf-action-editors';
interface ValidateBaseInterface {
    isProvided(value: string): boolean;
}
interface ValidateWorkflowInterface {
    isValid(workflowId: string, workflows: AgentIntegrationWorkflow[]): number | boolean;
}
interface ValidateConfigurationInterface {
    isValid(configurationId: string, configurationByConfigurationId: ConfigurationByConfigurationId): number | boolean;
}
export interface ValidateInterface {
    configuration: ValidateConfigurationInterface;
    workflow: ValidateWorkflowInterface;
}
/**
 * Class for validating parameter values.
 */
declare class ValidateBase implements ValidateBaseInterface {
    isProvided: (value: string) => boolean;
}
/**
 * Class for validating workflow parameter values.
 */
declare class ValidateWorkflow extends ValidateBase implements ValidateWorkflowInterface {
    isValid: (workflowId: string, workflows?: AgentIntegrationWorkflow[]) => boolean;
}
/**
 * Class for validating workflow parameter values.
 */
declare class ValidateConfiguration extends ValidateBase implements ValidateConfigurationInterface {
    isValid: (configurationId: string, configurationByConfigurationId?: ConfigurationByConfigurationId) => boolean;
}
/**
 * Class for parameter validation.
 */
export declare class Validate implements ValidateInterface {
    configuration: ValidateConfiguration;
    workflow: ValidateWorkflow;
}
export {};
