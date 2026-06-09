export interface CopilotCustomAdaptiveCardData {
    /**
     * Unique identifier for the  custom adaptive card element.
     */
    elementUid: string;
    /**
     * Unique identifier for the custom adaptive card.
     */
    cardUid: string;
    /**
     * Icon of the custom adaptive card.
     */
    icon: string;
    /**
     * Name of the custom adaptive card.
     */
    name: string;
    /**
     * Location where the adaptive card is rendered, either in the copilot stream or on a copilot page.
     */
    location: customAdaptiveCardLocation.COPILOT_PAGE | customAdaptiveCardLocation.COPILOT_STREAM;
    /**
     * Data for the custom adaptive card.
     */
    data: Record<string, unknown>;
}
/**
 * Enum representing the location where a custom adaptive card can be rendered.
 */
export declare enum customAdaptiveCardLocation {
    /**
     * Render the adaptive card in the copilot stream.
     */
    COPILOT_STREAM = "copilotStream",
    /**
     * Render the adaptive card on a dedicated copilot page.
     */
    COPILOT_PAGE = "copilotPage"
}
/**
 * Enum representing the schema key prefix for custom adaptive cards.
 */
export declare enum customAdaptiveCardSchemaKey {
    /**
     * Prefix used for identifying custom adaptive card schemas.
     */
    CUSTOM_ADAPTIVE_CARD = "custom_adaptive_card_"
}
/**
 * Represents a custom adaptive card config from the profile hub.
 */
export interface CustomAdaptiveCardElementConfig {
    /**
     * Location where the adaptive card should be displayed (e.g., 'copilotStream', 'copilotPage').
     */
    adaptiveCardLocation: string;
    /**
     * Icon identifier for the custom adaptive card.
     */
    icon: string;
    /**
     * Display name of the custom adaptive card.
     */
    cardName: string;
    /**
     * Optional sample data for testing or previewing the adaptive card.
     */
    adaptiveCardSampleData?: string;
    /**
     * The adaptive card schema, either as a JSON string or object.
     */
    adaptiveCardSchema: string | object;
}
/**
 * Represents a custom adaptive card element from the profile hub.
 */
export interface CustomAdaptiveCardElement {
    /**
     * Name of the custom adaptive card element.
     */
    name: string;
    /**
     * Unique identifier for the element.
     */
    elementId: string;
    /**
     * Type of the element (e.g., 'customAdaptiveCard').
     */
    type: string;
    /**
     * Description of the custom adaptive card element.
     */
    description: string;
    /**
     * Additional notes or comments about the element.
     */
    notes: string | null;
    /**
     * Status of the element (e.g., 'active', 'inactive').
     */
    status: string;
    /**
     * Division ID associated with the element.
     */
    division: number;
    /**
     * Flag indicating whether the element is in draft state.
     */
    isDraft: boolean;
    /**
     * Configuration details for the custom adaptive card.
     */
    config: CustomAdaptiveCardElementConfig;
}
