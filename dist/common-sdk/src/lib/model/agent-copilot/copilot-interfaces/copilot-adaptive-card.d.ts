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
     * adaptive card schema
     */
    $schema: string;
}
/**
 * model interface for sentiment variable data
 */
export interface CopilotSentimentCardData {
    description: string;
    icon: string;
    sentiment: string;
}
/**
 * model interface for email variable data
 */
export interface CopilotEmailCardData {
    subtitle: string;
    description: string;
    icon: string;
}
