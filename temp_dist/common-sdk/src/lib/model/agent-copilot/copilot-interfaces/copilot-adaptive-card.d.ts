import { ContactFeedbackData, GuidanceFeedbackData } from './copilot-feedback-data';
/**
 * model interface for adaptive card Content
 */
export interface CopilotAdaptiveCard {
    /**
     * adaptive card type
     */
    type: string;
    /**
     * adaptive card vaersion
     */
    version: string;
    /**
     * adaptive card body
     */
    body: any;
    /**
     * adaptive card actions (optional)
     */
    actions?: any;
    /**
     * adaptive card schema
     */
    $schema: string;
}
/**
 * model interface for KbCombo data
 */
export interface CopilotKbAnswerCardData {
    kbAnswers: PublicKbAnswerData;
    kbInternalUse: PrivateKbAnswerData;
    utteranceId: string;
}
/**
 * model interface for kbAnswer CardContent
 */
export interface CardContent {
    kbAnswers: PublicKbAnswerData;
    kbInternalUse: PrivateKbAnswerData;
    contactFeedbackCard: ContactFeedbackData;
    guidanceFeedbacks: GuidanceFeedbackData[];
}
/**
 * model interface for Public KB Answer data
 */
export interface PublicKbAnswerData {
    title: string;
    description: string;
    kbAnswerUid: string;
    publicFeedback?: boolean;
}
/**
 * model interface for Private KB Answer data
 */
export interface PrivateKbAnswerData {
    title: string;
    description: string;
    kbAnswerUid: string;
    privateFeedback?: boolean;
}
/**
 * model interface that represents the structure for Copilot filter cards
 */
export interface CopilotFilterCardData {
    /**
     * Contains the title and description for the copilot filters.
     */
    copilotFilters: {
        /**
         * The title of copilot filter that is shown on filters adaptive card.
         */
        title: string;
        /**
         * The description of copilot filters to be shown on filters adaptive card.
         */
        description: string;
    };
    /**
     * Contains the title and values for standard filters.
     */
    filters: FilterGroup;
    /**
     * Contains the title and values for custom filters.
     */
    customFilters: FilterGroup[];
}
/**
 * Represents a group of filters with a title and associated values for both standard and custom filters
 */
interface FilterGroup {
    /**
     * The title of the filter e.g.: planYear, employmentType etc.
     */
    title: string;
    /**
     * The values for the filter e.g: ["2023", "2024", "2025"], ["Full-time", "Part-time"].
     */
    values: string[];
}
/**
 * model interface that represents the structure for Copilot information cards
 */
export interface CopilotInformationCardData {
    icon: string;
    title: string;
    description: string;
    linkDisplayText?: string;
    link?: string;
    iconWidth?: string;
    iconHeight?: string;
}
/**
 * model interface that represents the structure for Copilot Journey summary cards
 */
export interface CopilotJourneySummaryCardData {
    summary: string;
    interactionsData: JSInteractionsData[];
}
/**
 * model interface that represents the structure for journey summary interactions data
 */
export interface JSInteractionsData {
    contactDate: string;
    isResolved: boolean;
    contactNumber: number;
    skill: string;
    chatAgentTasksPerformed: string[];
    customerName: string;
    summary: string;
    chatFinalOutcome: string;
    status: string;
    channelType: string;
}
export interface CopilotAutoSummaryCardData {
    icon: string;
    title: string;
    description: string;
    showEditIcon: boolean;
    showCopyIcon: boolean;
    showExpandIcon: boolean;
}
export {};
