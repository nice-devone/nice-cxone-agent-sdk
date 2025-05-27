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
    status: boolean;
    /**
     * Timeout for the intent execution, in seconds.
     */
    timeout: number;
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
 * model interface that represents the structure for Copilot task assist  card
 */
export interface CopilotTaskAssistCardData {
    /**
     * The type of media (e.g., 'chat', 'voice').
     */
    mediaType: string;
    /**
     * Title of the intent.
     */
    intentTitle: string;
    /**
     * Response  associated with the intent.
     */
    intentResponse: string;
    /**
     * Unique identifier for the utterance.
     */
    utteranceId: string;
    /**
     * Current status of the task or intent (e.g., 'loading', 'error','success').
     */
    status: string;
    /**
     * Identifier for the virtual agent.
     */
    virtualAgentId: string;
}
export {};
