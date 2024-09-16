import * as workflowConfiguration from './workflowConfiguration';
import * as WorkflowExecute from './workflowExecute';
export interface ValidateInterface {
    workflowConfiguration: workflowConfiguration.ValidateInterface;
    workflowExecute: WorkflowExecute.ValidateInterface;
}
/**
 * Class for parameter validation.
 */
export declare class Validate implements ValidateInterface {
    private static singleton;
    workflowConfiguration: workflowConfiguration.Validate;
    workflowExecute: WorkflowExecute.Validate;
    /**
     * Method to create singleton object of the class.
     * ```
     * @example
     * const validate = Validate.instance;
     * ```
     */
    static get instance(): ValidateInterface;
}
