/**
 * Type representing how a checklist item was completed
 */
export declare type ChecklistCompletionType = 'MANUAL' | 'TIMER';
/**
 * Runtime-safe completion type constants for checklist item updates
 */
export declare enum ChecklistCompletionTypeValues {
    /**
     * Item was completed manually by the user (e.g., by checking a checkbox)
     */
    MANUAL = "MANUAL",
    /**
     * Item was completed automatically based on a timer or time-based rule
     */
    TIMER = "TIMER"
}
/**
 * Enum representing activation rule types for checklist items
 */
export declare enum ChecklistActivationRuleType {
    /**
     * Item is always active/available
     */
    NONE = "none",
    /**
     * Item activates based on keyword detection
     */
    KEYWORD_BASED = "keyword-based",
    /**
     * Item activates after a time delay
     */
    TIME_BASED = "time-based"
}
/**
 * model interface for checklist item activation rule
 */
export interface ChecklistActivationRule {
    /**
     * The type of activation rule
     */
    ruleType: ChecklistActivationRuleType;
    /**
     * Duration in seconds for time-based rules (optional)
     */
    durationSeconds?: number;
}
/**
 * model interface for a single checklist item
 */
export interface ChecklistItem {
    /**
     * Unique identifier for the checklist item
     */
    itemId: string;
    /**
     * Display name/label of the checklist item
     */
    name: string;
    /**
     * Activation rule that determines when this item should be shown or enabled
     */
    activationRule: ChecklistActivationRule;
    /**
    * Whether the item has been completed
    */
    isCompleted: boolean;
    /**
    * Timestamp in milliseconds when timer-based completion was initiated.
    * Used to calculate remaining time on refresh for timer resume logic.
    */
    timerStartTimestamp?: number;
    /**
     * Whether the agent has manually interacted with this item (checked or unchecked).
     * When true, the timer-based auto-completion is permanently disabled for this item,
     * even across page refreshes. Manual interaction always takes highest priority.
     */
    isManuallyHandled?: boolean;
}
/**
 * model interface for copilot checklist data
 */
export interface CopilotChecklistData {
    /**
     * The session ID associated with this checklist
     */
    sessionId: string;
    /**
     * The contact ID associated with this checklist
     */
    contactId: string;
    /**
     * Unique identifier for the checklist
     */
    checklistId: string;
    /**
     * Total number of checklist items
     */
    totalNoOfChecklistItems: number;
    /**
     * Number of completed items
     */
    itemsCompleted: number;
    /**
     * Title of the checklist
     */
    title: string;
    /**
     * Instructions or description for the checklist
     */
    instructions: string;
    /**
     * Array of checklist items
     */
    items: ChecklistItem[];
    /**
     * Optional status of the checklist (e.g., 'active', 'completed', 'cancelled')
     */
    status?: string;
}
