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
