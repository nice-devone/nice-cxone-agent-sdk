export interface AgentWorkflowRequestEventRequestType {
    workflowType: string;
    configurationId: string;
    workflowId: string;
    cacheKey: string;
    workflowParam: DataMemoralisationWorkflowParam | DynamicDataWorkflowParam;
}
/**
 * Model class for AgentWorkflowEventRecord
 * @example
 * ```
 * const agentWorkflowEventRecord = new AgentWorkflowEventRecord();
 * ```
 */
export declare class AgentWorkflowRequestEventRequest {
    /**
     * request workflowType
     */
    workflowType: string;
    /**
     * request configurationId
     */
    configurationId: string;
    /**
     * request workflowId
     */
    workflowId: string;
    /**
     * request workflowParam
     */
    workflowParam: DataMemoralisationWorkflowParam | DynamicDataWorkflowParam;
    /**
     * request interactionId
     */
    interactionId: string;
    /**
     * Key to retrieve crm objects from cache
     */
    cacheKey: string;
    /**
     * Used to parse data
     * @param data - data to be parsed
     * @example
     * ```
     * agentWorkflowEventRecord.parse(data);
     * ```
     */
    parse(data: AgentWorkflowRequestEventRequestType): void;
}
/**
 * Model class for DataMemoralisationWorkflowParam
 * @example
 * ```
 * const DataMemoralisationWorkflowParam = new DataMemoralisationWorkflowParam();
 * ```
 */
export declare class DataMemoralisationWorkflowParam {
    /**
     * data mapping Id
     */
    dataMappingId: string;
}
/**
 * Model class for DynamicDataWorkflowParam
 * @example
 * ```
 * const DynamicDataWorkflowParam = new DynamicDataWorkflowParam();
 * ```
 */
export declare class DynamicDataWorkflowParam {
    /**
     * dynamic data mapping Id
     */
    dynamicDataMappingId: string;
}
