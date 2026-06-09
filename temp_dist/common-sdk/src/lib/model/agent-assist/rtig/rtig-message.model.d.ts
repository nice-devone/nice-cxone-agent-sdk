/**
 * RTIG Enlighten Result Model
 */
export interface EnlightenResult {
    enlightenModelGuid: string;
    score: number;
    isValid: boolean;
    tags: string[];
}
/**
 * RTIG Range of Metric Model
 */
export interface RangeOfMetric {
    min: number;
    max: number;
    color: string;
    label: string;
    imageSrc: string;
    severity: string;
}
/**
 * RTIG Metric Model
 */
export interface Metric {
    guid: string;
    tag: string;
    type: string;
    friendly_name: string;
    image_src: string;
    is_sentiment_score: boolean;
    score?: number;
    state_color?: string;
    range_of_metric?: RangeOfMetric[];
}
/**
 * RTIG Notification Message Model
 */
export interface NotificationMessage {
    /**
     * Id of the notification message
     */
    notificationId: string;
    /**
     * Whether the message has sentiment or not
     */
    hasSentiment: boolean;
    /**
     * Whether the message has enlighten model or not
     */
    hasEnlightenModel: boolean;
    /**
     * Whether the message has phrase expression or not
     */
    hasPhraseExpression: boolean;
    /**
     * The primary alert name
     */
    primaryAlertName: string;
    /**
     * The primary alert description
     */
    primaryAlertDescription: string;
    /**
     * The metric data
     */
    metric?: Metric;
    /**
     * The reception datetime of message
     */
    receptionDate?: Date;
    /**
     * The secondary alert name
     */
    secondaryAlertName: string;
    /**
     * The secondary alert description
     */
    secondaryAlertDescription: string;
}
/**
 * RTIG Predictive Analysis Result Model
 */
export interface PredictiveAnalysisResult {
    predictive_analysis_guid: string;
    score: number;
}
/**
 * RTIG Real Time Stats Notification Model
 */
export interface RealTimeStatsNotification {
    topic?: string;
    messageType?: string;
    nxrtgAgentId?: number;
    offsetMs?: number;
    enlightenResults?: EnlightenResult[];
    notificationPayload?: NotificationMessage;
    responseCode?: number;
    responseText?: string;
    matchedPhrases?: string[];
}
/**
 * Params Model
 */
export interface ParamsModel {
    enlightenModels: EnlightenModel[];
    isTagNameEnabled: boolean;
}
/**
 * RTIG Enlighten Model
 */
export interface EnlightenModel {
    guid: string;
    tag: string;
    enabled: boolean;
    highThreshold: ThresholdModel;
    mediumThreshold: ThresholdModel;
    lowThreshold: ThresholdModel;
}
/**
 * RTIG Threshold Model
 */
export interface ThresholdModel {
    max: number;
    min: number;
}
/**
 * RTIG TypeMetric
 */
export declare enum TypeMetric {
    OveralSentiment = 2,
    Notification = 8,
    Metric = 5
}
