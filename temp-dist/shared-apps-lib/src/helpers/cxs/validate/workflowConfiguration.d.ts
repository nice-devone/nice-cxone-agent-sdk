export interface ValidateInterface {
    validateConfigIdExists: (parameter: any, configurationByConfigurationId: any, property: string) => boolean;
    areAllWorkflowConfigIdsEqual: (workflowObjects: Array<any>) => any;
    isWorkflowOfCorrectType: (workflowActionType: string, workflowParamValue: any, workflowsByConfiguration: Array<any>) => boolean;
}
/**
 * Class for validating workflow parameter values.
 */
export declare class Validate implements ValidateInterface {
    /**
     * Helper method to check if parameters are valid
     * @param parameter - specific property string value that has been decoded
     * @param configurationByConfigurationId - object of configurations ID keys and its asscoiated data.
     * @param property - studio action workflow property we are looking for.
     * @example - validateParameter()
     */
    validateConfigIdExists: (parameter: any, configurationByConfigurationId: any, property: string) => boolean;
    /**
     * Helper method to check if parameters are valid
     * @param workflowObjects - array of all workflow objects that have been decoded from studio
     * @example - allWorklfowConfigIdsSame([searchWorkflow,timelineWorkflow,dataMemorializationWorkflow])
     */
    areAllWorkflowConfigIdsEqual: (workflowObjects: Array<any>) => any;
    /**
     * Helper method to check if parameters are valid
     * @param workflowObjects - array of all workflow objects that have been decoded from studio
     * @example - allWorklfowConfigIdsSame([searchWorkflow,timelineWorkflow,dataMemorializationWorkflow])
     */
    isWorkflowOfCorrectType: (workflowActionType: string, workflowParamValue?: any, workflowsByConfiguration?: Array<any>) => boolean;
}
