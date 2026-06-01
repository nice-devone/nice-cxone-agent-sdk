/**
 * Represents the possible statuses for a Workflow in the Workflow Space.
 * Values match the WebSocket message status field from Cognigy:
 * `success | error | timeout | onGoing | failed`. ON_GOING is the only
 * non-terminal status; all others end the workflow.
 */
export declare enum WorkflowStatus {
    /**
     * Workflow ended successfully.
     */
    SUCCESS = "success",
    /**
     * Workflow ended with an error.
     */
    ERROR = "error",
    /**
     * Workflow ended due to a timeout.
     */
    TIMEOUT = "timeout",
    /**
     * Workflow is in progress.
     */
    ON_GOING = "onGoing",
    /**
     * Workflow ended in failure.
     */
    FAILED = "failed",
    /**
     * @deprecated Use `ON_GOING`. Retained as a compatibility alias so existing
     * consumers compile without changes while they migrate.
     */
    RUNNING = "ongoing",
    /**
     * @deprecated Use `ON_GOING`. Retained as a compatibility alias so existing
     * consumers compile without changes while they migrate.
     */
    WAITING = "waiting",
    /**
     * @deprecated Use `SUCCESS`. Retained as a compatibility alias so existing
     * consumers compile without changes while they migrate.
     */
    COMPLETED = "completed"
}
/**
 * Card types for workflow responses
 */
export declare enum WorkflowCardType {
    /**
     * Plain text response
     */
    TEXT = "Text",
    /**
     * Adaptive card response
     */
    ADAPTIVE_CARD = "AdaptiveCard"
}
/**
 * Media type for workflow (Digital or Voice)
 */
export declare enum WorkflowMediaType {
    DIGITAL = "Digital",
    VOICE = "Voice"
}
/**
 * Branded string type used to preserve known enum values while allowing unknown backend values.
 */
export declare type WorkflowUnknownString = string & {
    readonly __workflowUnknownStringBrand?: never;
};
/**
 * Represents the content of a workflow response from WebSocket.
 * This is the structure of acpAppElements[].content when contentType is 'workflowResponse'.
 */
export interface WorkflowResponseContent {
    /**
     * Media type - Digital or Voice
     */
    mediaType: WorkflowMediaType | WorkflowUnknownString;
    /**
     * The intent/workflow title
     */
    intentTitle: string;
    /**
     * Whether the send icon should be visible (true for digital)
     */
    sendIconVisible: boolean;
    /**
     * Whether the insert icon should be visible (true for digital)
     */
    insertIconVisible: boolean;
    /**
     * Cognigy session ID (GUID)
     */
    cognigySessionId: string;
    /**
     * Response content - either array of text strings or array of adaptive card schemas
     */
    intentResponse: string[] | WorkflowAdaptiveCardSchema[];
    /**
     * Card type indicating whether intentResponse contains plain text or adaptive card schemas.
     * Sent by the backend inside the content payload. Used as the primary source for rendering.
     */
    cardType?: WorkflowCardType | WorkflowUnknownString;
    /**
     * Current workflow status
     */
    status: WorkflowStatus | string;
    /**
     * Error message if workflow failed
     */
    errorMessage?: string;
    /**
     * Elapsed time in milliseconds
     */
    elapsedMilliseconds?: number;
}
/**
 * Workflow-specific Adaptive Card schema structure for workflow responses.
 * This models the subset of adaptive-card payload fields used by Workflow Space rendering.
 */
export interface WorkflowAdaptiveCardSchema {
    /**
     * Type of the card (always "AdaptiveCard")
     */
    type: string;
    /**
     * Unique identifier for the element
     */
    elementUid?: string;
    /**
     * Unique identifier for the card
     */
    cardUid?: string;
    /**
     * Card body elements
     */
    body?: WorkflowAdaptiveCardElement[];
    /**
     * Card action buttons
     */
    actions?: WorkflowAdaptiveCardAction[];
    /**
     * JSON schema URL
     */
    $schema?: string;
    /**
     * Adaptive card version
     */
    version?: string;
}
/**
 * Base interface for workflow-specific adaptive card elements.
 * This includes the element fields currently parsed from workflow response payloads.
 */
export interface WorkflowAdaptiveCardElement {
    /**
     * Element type (TextBlock, Image, ColumnSet, Input.Text, etc.)
     */
    type: string;
    /**
     * Element ID for inputs
     */
    id?: string;
    /**
     * Text content
     */
    text?: string;
    /**
     * Size (Small, Medium, Large)
     */
    size?: string;
    /**
     * Font weight (Lighter, Default, Bolder)
     */
    weight?: string;
    /**
     * Whether text should wrap
     */
    wrap?: boolean;
    /**
     * Choices for Input.ChoiceSet elements
     */
    choices?: {
        title: string;
        value: string;
    }[];
    /**
     * Maximum length for Input.Text elements
     */
    maxLength?: number;
    /**
     * Image URL
     */
    url?: string;
    /**
     * Alt text for images
     */
    altText?: string;
    /**
     * Style (Person for circular images)
     */
    style?: string;
    /**
     * Spacing
     */
    spacing?: string;
    /**
     * Whether text is subtle
     */
    isSubtle?: boolean;
    /**
     * Width for columns
     */
    width?: string;
    /**
     * Items in a column
     */
    items?: WorkflowAdaptiveCardElement[];
    /**
     * Columns in a ColumnSet
     */
    columns?: WorkflowAdaptiveCardElement[];
    /**
     * Facts for FactSet
     */
    facts?: {
        title: string;
        value: string;
    }[];
    /**
     * Placeholder text for inputs
     */
    placeholder?: string;
    /**
     * Whether input is multiline
     */
    isMultiline?: boolean;
    /**
     * Data context for repeating
     */
    $data?: string;
}
/**
 * Workflow-specific adaptive card action structure.
 * This includes action fields currently parsed from workflow response payloads.
 */
export interface WorkflowAdaptiveCardAction {
    /**
     * Action type (Action.Submit, Action.OpenUrl, Action.ShowCard)
     */
    type: string;
    /**
     * Action button title
     */
    title: string;
    /**
     * URL for OpenUrl actions
     */
    url?: string;
    /**
     * Card to show for ShowCard actions
     */
    card?: WorkflowAdaptiveCardSchema;
    /**
     * Data to submit
     */
    data?: Record<string, unknown>;
}
/**
 * WebSocket message structure for workflow responses
 */
export interface WorkflowWebSocketMessage {
    /**
     * Source of the agent assist message
     */
    agentAssistSource: string;
    /**
     * Contact ID associated with this message
     */
    contactId: string;
    /**
     * Topic for the message
     */
    topic: string;
    /**
     * Message type
     */
    type: string;
    /**
     * UTC timestamp of the message
     */
    utcTimestamp: string;
    /**
     * Array of copilot app elements
     */
    acpAppElements: WorkflowWebSocketElement[];
}
/**
 * Element structure within the WebSocket message
 */
export interface WorkflowWebSocketElement {
    /**
     * Card type - "Text" for plain text, "AdaptiveCard" for adaptive card
     */
    cardType: WorkflowCardType | WorkflowUnknownString;
    /**
     * Content type - "workflowResponse" for workflow messages
     */
    contentType: string;
    /**
     * The workflow response content
     */
    content: WorkflowResponseContent;
    /**
     * Object ID
     */
    objectId: string;
    /**
     * Version
     */
    version: string;
}
/**
 * Represents a step in a workflow execution.
 */
export interface WorkflowStep {
    /**
     * Unique identifier for the step
     */
    stepId: string;
    /**
     * Display name of the step
     */
    name: string;
    /**
     * Status of this specific step
     */
    status: WorkflowStatus;
    /**
     * Optional description of the step
     */
    description?: string;
    /**
     * Timestamp when step started
     */
    startedAt?: string;
    /**
     * Timestamp when step completed
     */
    completedAt?: string;
}
/**
 * Represents a single workflow instance in the Workflow Space.
 */
export interface WorkflowInstance {
    /**
     * Unique identifier for the workflow instance
     */
    instanceId: string;
    /**
     * The workflow definition name
     */
    workflowName: string;
    /**
     * Display name for the workflow (intentTitle from WebSocket)
     */
    displayName: string;
    /**
     * Current overall status of the workflow
     */
    status: WorkflowStatus;
    /**
     * Current step information
     */
    currentStep?: WorkflowStep;
    /**
     * Index of the current step (0-based)
     */
    currentStepIndex?: number;
    /**
     * Total number of steps in the workflow
     */
    totalSteps?: number;
    /**
     * Timestamp of the last update
     */
    lastUpdatedAt: string;
    /**
     * Timestamp when workflow was initiated
     */
    initiatedAt: string;
    /**
     * Timestamp when workflow completed (if completed or failed)
     */
    completedAt?: string;
    /**
     * Contact/case ID associated with this workflow
     */
    contactId: string;
    /**
     * Error message if workflow failed
     */
    errorMessage?: string;
    /**
     * Summary/output of the workflow (shown on completion)
     */
    outputSummary?: string;
    /**
     * Key results or generated content from the workflow
     */
    results?: Record<string, unknown>;
    /**
     * Whether retry is available for failed workflows
     */
    canRetry?: boolean;
    /**
     * Conversation history with the workflow (for multi-turn interactions)
     */
    conversation?: WorkflowConversationMessage[];
    /**
     * Cognigy session ID for this workflow instance
     */
    cognigySessionId?: string;
    /**
     * The original task session UID used to trigger this workflow.
     * Kept constant for the lifetime of the session so all follow-up
     * API calls (search bar, adaptive card submit) use the same GUID.
     */
    taskSessionUid?: string;
    /**
     * Media type - Digital or Voice
     */
    mediaType?: string;
    /**
     * Whether the send icon should be visible (true for digital)
     */
    sendIconVisible?: boolean;
    /**
     * Whether the insert icon should be visible (true for digital)
     */
    insertIconVisible?: boolean;
    /**
     * Elapsed time in milliseconds
     */
    elapsedMilliseconds?: number;
}
/**
 * Represents a message in the workflow conversation (multi-turn).
 */
export interface WorkflowConversationMessage {
    /**
     * Unique message identifier
     */
    messageId: string;
    /**
     * Message type: from the system/workflow or from the agent
     */
    type: 'system' | 'agent';
    /**
     * Card type - Text or AdaptiveCard
     */
    cardType: WorkflowCardType | WorkflowUnknownString;
    /**
     * Message content for text responses (array of strings)
     */
    content?: string[];
    /**
     * Text content as single string (for display)
     */
    textContent?: string;
    /**
     * Timestamp of the message
     */
    timestamp: string;
    /**
     * Adaptive card schemas for rich content
     */
    adaptiveCards?: WorkflowAdaptiveCardSchema[];
    /**
     * Per-input values entered by the agent on the adaptive card(s) within this
     * message, keyed by Adaptive Card input `id`. Persisted alongside the rest of
     * the workflow space state so values survive re-renders, navigation, and
     * browser refresh.
     */
    adaptiveCardInputs?: Record<string, string>;
}
/**
 * @deprecated Use `WorkflowAdaptiveCardSchema`.
 */
export declare type AdaptiveCardSchema = WorkflowAdaptiveCardSchema;
/**
 * @deprecated Use `WorkflowAdaptiveCardElement`.
 */
export declare type AdaptiveCardElement = WorkflowAdaptiveCardElement;
/**
 * @deprecated Use `WorkflowAdaptiveCardAction`.
 */
export declare type AdaptiveCardAction = WorkflowAdaptiveCardAction;
/**
 * State shape for the Workflow Space.
 */
export interface WorkflowSpaceState {
    /**
     * Map of all active workflow instances by instanceId
     */
    workflows: Record<string, WorkflowInstance>;
    /**
     * Currently selected/viewed workflow instance ID
     */
    activeWorkflowId: string | null;
    /**
     * Whether the workflow space container is visible
     */
    isOpen: boolean;
    /**
     * Loading state for workflow operations
     */
    isLoading: boolean;
}
/**
 * Initial state for the Workflow Space.
 */
export declare const initialWorkflowSpaceState: WorkflowSpaceState;
