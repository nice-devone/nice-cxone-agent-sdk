/**
 * Interface used as a intermediate for creating request json for API call
 * ```
 * @example
 * Array<CXoneWorkflowCreateRequest>
 * ```
 */
export interface CXoneWorkflowCreateRequest {
    /**
     * @remarks - Agent Integration workflow id
     * */
    workflowId: string;
    /**
     * @remarks - Agent Integration configuration id
     * */
    configurationId: string;
    /**
     * @remarks - contactID
     * */
    contactID?: string;
    /**
     * @remarks - type of Action
     * */
    action: string;
    /**
     * @remarks - interactionId
     * */
    interactionId: string;
    /**
     * @remarks - workflowInput
     * */
    workflowInput: string;
}
