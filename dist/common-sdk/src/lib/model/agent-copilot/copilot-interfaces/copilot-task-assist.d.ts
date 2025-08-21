/**
 * Represents a parameter for an intent.
 */
interface IntentParam {
    /**
     * Detailed description of the parameter.
     */
    description: string;
    /**
     * The display name of the parameter.
     */
    name: string;
    /**
     * Data type of the parameter (e.g., "string", "long").
     */
    type: string;
}
/**
 * Configuration for a single intent task.
 */
export interface IntentConfig {
    /**
     * Display name for the intent, visible to the user.
     */
    displayName: string;
    /**
     * Specifies the execution mode of the intent.
     * - "Manual": User-triggered execution
     * - "Automatic": System-triggered execution
     */
    executionMode: 'Manual' | 'Automatic';
    /**
     * A short description of the intent's purpose.
     */
    intentDescription: string;
    /**
     * The internal identifier name for the intent.
     */
    intentName: string;
    /**
     * List of parameters required for the intent execution.
     */
    intentParams: IntentParam[];
    /**
     * Indicates whether the intent is deleted.
     */
    isDeleted: boolean;
    /**
     * Indicates whether the intent is currently active.
     */
    isActive: boolean;
    /**
     * Timeout for the intent execution, in seconds.
     */
    timeout: number;
    /**
     *  flag indicating whether this element is used for task assist form capture functionality.
     */
    formCapture: boolean;
}
/**
 * Configuration for task assist, holding agent and task settings.
 */
export interface TaskAssistConfig {
    /**
     * Unique identifier for the agent.
     */
    agentId: string;
    /**
     * Universally unique identifier for the agent.
     */
    agentUUID: string;
    /**
     * Bus number associated with the agent.
     */
    busNo: number;
    /**
     * Contact identifier for the task assist session.
     */
    contactId: number;
    /**
     * List of configurations for different intents.
     */
    intentConfig: IntentConfig[];
    /**
     * Tenant identifier associated with the agent.
     */
    tenantId: string;
    /**
     * Identifier for the virtual agent.
     */
    virtualAgentId: string;
}
/**
 * Contains detailed validation error information.
 */
export interface ValidationInfo {
    [key: string]: string;
}
/**
 * model interface that represents the structure for Copilot task assist  card
 */
export interface CopilotTaskAssistCardData {
    /**
     * The type of media (e.g., 'chat', 'voice').
     */
    mediaType?: string;
    /**
     * Title of the intent.
     */
    intentTitle?: string;
    /**
     * Response  associated with the intent.
     */
    intentResponse?: string;
    /**
     * Unique identifier for the utterance.
     */
    utteranceId?: string;
    /**
     * Current status of the task or intent (e.g., 'loading', 'error','success').
     */
    status?: string;
    /**
     * Identifier for the virtual agent.
     */
    virtualAgentId?: string;
    /**
     * name of the intent.
     */
    intentName?: string;
    /**
     * Optional error message (present if an error occurred).
     */
    errorMessage?: string;
    /**
     * Only present if the "status" is validationError.
     * Contains details of validation errors.
     */
    validationInfo?: ValidationInfo;
    /**
     * Actual data submitted by the user for this intent card.
     * Keys represent parameter names, and values are the user-provided inputs.
     */
    data?: {
        [key: string]: string;
    };
}
/**
 * Represents prefilled data used for populating adaptive cards or task assist forms.
 */
export interface PrefilledData {
    /**
     * The name of the intent this data is associated with.
     */
    intentName: string;
    /**
     * The name of the virtual assistant or bot handling the intent.
     */
    botName: string;
    /**
     * A unique identifier for the related object, such as an adaptive card or form instance.
     */
    objectId: string;
    /**
     * An optional map of key-value pairs representing prefilled form field data.
     * Keys are field names, and values are the corresponding default values.
     */
    data?: {
        [key: string]: string;
    };
}
/**
 * Represents the possible statuses for the Task Assist feature.
 */
export declare const TASK_ASSIST_STATUS: {
    VALIDATION_ERROR: string;
    IN_PROGRESS: string;
};
export {};
