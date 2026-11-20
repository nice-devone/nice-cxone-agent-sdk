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
 * Model interface for kbLinks CardContent.
 * Represents the structure of data used in a Copilot KB links card.
 */
export interface CopilotkbLinksCardData {
    /**
     * The display text for the card.
     */
    text: string;
    /**
     * The hyperlink associated with the card.
     */
    link: string;
    /**
     * Restriction level or access control information for the card.
     */
    restriction: string;
    /**
     * The type of media (e.g., "video", "article", "image") represented by the card.
     */
    mediaType: string;
    /**
     * A more specific classification of the mediaType (e.g., "YouTube", "PDF", "JPG").
     */
    subMediaType: string;
    /**
     * Determines whether the send icon should be visible on the card.
     */
    sendIconVisible?: boolean;
    /**
     * (Optional) Determines whether the insert icon should be visible on the card.
     */
    insertIconVisible?: boolean;
    /**
     * (Optional) Determines whether the copy action should be shown on the card.
     */
    showCopyAction?: boolean;
}
/**
 * Model interface for kbprocess steps CardContent.
 * Represents the structure of data used in a Copilot KB process steps.
 */
export interface CopilotKbProcessStepsData {
    /**
     * The display title for the card.
     */
    title: string;
    /**
     * description of the process steps.
     */
    description: string;
    /**
     * Restriction level or access control information for the card.
     */
    restriction: string;
    /**
     * The type of media (e.g., "video", "article", "image") represented by the card.
     */
    mediaType: string;
    /**
     * A more specific classification of the mediaType (e.g., "YouTube", "PDF", "JPG").
     */
    subMediaType: string;
    /**
     * Determines whether the send icon should be visible on the card.
     */
    sendIconVisible?: boolean;
    /**
     * (Optional) Determines whether the insert icon should be visible on the card.
     */
    insertIconVisible?: boolean;
    /**
     * (Optional) Determines whether the copy action should be shown on the card.
     */
    showCopyAction?: boolean;
}
/**
 * model interface for kbAnswer CardContent
 */
export interface CardContent {
    kbAnswers: PublicKbAnswerData;
    kbInternalUse: PrivateKbAnswerData;
    kbProcessSteps: CopilotKbProcessStepsData[];
    kbLinks: CopilotkbLinksCardData[];
    contactFeedbackCard: ContactFeedbackData;
    guidanceFeedbacks: GuidanceFeedbackData[];
    insertIconVisible?: boolean;
    sendIconVisible?: boolean;
    showCopyAction?: boolean;
}
/**
 * model interface for Public KB Answer data
 */
export interface PublicKbAnswerData {
    title: string;
    description: string;
    kbAnswerUid: string;
    publicFeedback?: boolean;
    insertIconVisible?: boolean;
    showCopyAction?: boolean;
    sendIconVisible?: boolean;
}
/**
 * model interface for Private KB Answer data
 */
export interface PrivateKbAnswerData {
    title: string;
    description: string;
    kbAnswerUid: string;
    privateFeedback?: boolean;
    insertIconVisible?: boolean;
    showCopyAction?: boolean;
    sendIconVisible?: boolean;
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
/**
 * Model interface that represents the structure for a web link in a CustomCard.
 */
interface WebLink {
    /**
     * (Optional) The display text for the web link.
     * This is the text that will be shown to the user.
     */
    text?: string;
    /**
     * (Optional) The URL or hyperlink associated with the web link.
     * This is the actual destination the link points to.
     */
    link?: string;
}
/**
 * Model interface that represents the structure for card actions in a CustomCard.
 * Each property indicates whether a specific user action is available on the card.
 */
interface CardActions {
    /**
     * (Optional) Indicates whether the "like" action is available.
     */
    like?: boolean;
    /**
     * (Optional) Indicates whether the "dislike" action is available.
     */
    dislike?: boolean;
    /**
     * (Optional) Indicates whether the "insert" action is available.
     */
    insert?: boolean;
    /**
     * (Optional) Indicates whether the "send" action is available.
     */
    send?: boolean;
    /**
     * (Optional) Indicates whether the "copy" action is available.
     */
    copy?: boolean;
}
/**
 * Model interface that represents the structure for customer card data.
 */
export interface CustomCardData {
    /**
     * (Optional) The title text displayed on the card.
     */
    title?: string;
    /**
     * (Optional) The icon URL or identifier to be shown on the card.
     */
    icon?: string;
    /**
     * (Optional) The background color of the card, typically in hex or CSS color format.
     */
    cardBackgroundColor?: string;
    /**
     * (Optional) A brief description or summary displayed on the card.
     */
    description?: string;
    /**
     * (Optional) A list of web links associated with the card.
     * Each link includes optional display text and a URL.
     */
    webLinks?: WebLink[];
    /**
     * (Optional) A partial set of actions that can be performed on the card.
     * This allows flexibility in specifying only a subset of available actions.
     */
    cardActions?: Partial<CardActions>;
}
export interface CopilotAutoSummaryCardData {
    icon: string;
    title: string;
    description: string;
    showEditIcon: boolean;
    showCopyIcon: boolean;
    showExpandIcon: boolean;
}
/**
 * Represents a single email topic item returned in the EMAIL_RESPONSE_CARD WS payload.
 * @example
 * ```
 * const item: EmailTopicItem = { topicId: 't1', content: 'Refund policy', status: 'Ok' };
 * ```
 */
export interface EmailTopicItem {
    topicId: string;
    content: string;
    status: 'Ok' | 'NotCovered' | 'Missing' | string;
}
/**
 * Content model for the EMAIL_RESPONSE_CARD adaptive card.
 * `coveredTopics` and `uncoveredTopics` are not present in the raw WS payload —
 * they are derived by the middleware from `emailTopics` before the card is dispatched.
 * @example
 * ```
 * const data: CopilotEmailResponseCardData = { emailTopics: [], coveredTopics: [], uncoveredTopics: [] };
 * ```
 */
export interface CopilotEmailResponseCardData {
    icon?: string;
    title?: string;
    description?: string;
    subtitle?: string;
    emailTopics?: EmailTopicItem[];
    /** Populated by middleware — derived from `emailTopics` before adaptive card dispatch. Not present in raw WS payload. */
    coveredTopics?: EmailTopicItem[];
    /** Populated by middleware — derived from `emailTopics` before adaptive card dispatch. Not present in raw WS payload. */
    uncoveredTopics?: EmailTopicItem[];
}
export {};
