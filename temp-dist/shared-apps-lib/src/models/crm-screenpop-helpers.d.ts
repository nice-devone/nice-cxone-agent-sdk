export interface AgentWorkflowEventFieldsData {
    type?: string;
    /**
     * CRM label
     */
    label?: string;
    /**
     * record id
     */
    id?: string;
    /**
     * CRM url
     */
    url?: string;
    /**
     * display name
     */
    display?: string;
    /**
     * CRM Data Memo
     */
    dataMemo?: string;
    /**
     * CRM linkable flag
     */
    linkable?: boolean;
    /**
     * CRM linked flag to maintain linked data for CT & DM
     */
    linked?: string;
    /**
     * Flag to determine if screen pop is required or not
     */
    screenPop?: boolean;
    /**
     * CRM fields dynamic data
     */
    fields?: AgentWorkflowEventFieldsData[];
}
export interface AgentWorkflowEventRelatedData {
    /**
     * related object display name
     */
    display?: string;
    /**
     * related object id
     */
    id?: string;
    /**
     * related object label
     */
    label?: string;
    /**
     * related object state
     */
    state?: string;
    /**
     * related object priority
     */
    priority?: string;
    /**
     * related object type
     */
    type?: string;
    /**
     * related object title
     */
    title?: string;
    /**
     * related object url
     */
    url?: string;
    /**
     * related object assigned to
     */
    assignedTo?: string;
    /**
     * related object updatedAt
     */
    updatedAt?: Date;
    /**
     * linkable flag
     */
    linkable?: boolean;
    /**
     * CRM fields dynamic data
     */
    fields?: AgentWorkflowEventFieldsData[];
}
export interface AgentWorkflowEventRecord {
    /**
     * CRM type
     */
    type?: string;
    /**
     * CRM label
     */
    label?: string;
    /**
     * record id
     */
    id?: string;
    /**
     * CRM url
     */
    url?: string;
    /**
     * display name
     */
    display?: string;
    /**
     * CRM title
     */
    title?: string;
    /**
     * updated at
     */
    updated?: Date;
    /**
     * linkable flag
     */
    linkable?: boolean;
    /**
     * Flag to determine if screen pop is required or not
     */
    screenPop?: boolean;
    /**
     * CRM related data
     */
    related?: AgentWorkflowEventRelatedData[];
    /**
     * CRM fields dynamic data
     */
    fields?: AgentWorkflowEventFieldsData[];
}
export interface AgentWorkflowEventPinRecords {
    type?: string;
    /**
     * CRM label
     */
    label?: string;
    /**
     * record id
     */
    id?: string;
    /**
     * CRM url
     */
    url?: string;
    /**
     * display name
     */
    display?: string;
    /**
     * CRM Data Memo
     */
    dataMemo?: string;
    /**
     * CRM linkable flag
     */
    linkable?: boolean;
    /**
     * CRM linked flag to maintain linked data for CT & DM
     */
    linked?: string;
    /**
     * Flag to determine if screen pop is required or not
     */
    screenPop?: boolean;
    /**
     * CRM fields dynamic data
     */
    fields?: AgentWorkflowEventFieldsData[];
}
export interface AgentWorkflowResponseEvent {
    contactId: string;
    result: Array<{
        system: {
            type: string;
            label: string;
            icon: string;
            baseUrl: string;
        };
        pinRecords?: AgentWorkflowEventPinRecords[];
        records?: AgentWorkflowEventRecord[];
    }>;
}
/** Local interface to avoid circular dependency - represents pin records */
/** Interface for Epic screen pop workflow data */
export interface WorkflowData {
    workflowId?: string;
    configurationId?: string;
}
/** Interface for Epic screen pop configuration */
export interface WorkflowExecutePayloadConfig {
    workflowId: string;
    configurationId: string;
    action: string;
    workflowInput: {
        action: string;
        id: string;
        type: string;
        recipientId: string;
    };
}
