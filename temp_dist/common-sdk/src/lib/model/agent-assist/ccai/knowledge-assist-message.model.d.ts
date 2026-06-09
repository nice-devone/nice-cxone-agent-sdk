/**
 * Interface for FAQ answers
 */
export interface IFaqAnswers {
    question: string;
    answer: string;
    answerRecord: string;
    source: string;
    confidence: number;
    metadata?: any;
}
/**
 * Interface for FAQ response
 */
export interface IFaqResponse {
    faqAnswers: IFaqAnswers[];
    latestMessage: string;
}
/**
 * Interface for article answers
 */
export interface IArticleAnswers {
    title: string;
    uri: string;
    snippets: string[];
    answerRecord: string;
    confidence: number;
    metadata?: any;
}
/**
 * Interface for article response
 */
export interface IArticleResponse {
    articleAnswers: IArticleAnswers[];
    latestMessage: string;
}
/**
 * Interface for smart reply answers
 */
export interface ISmartReplyAnswers {
    reply: string;
    answerRecord: string;
    confidence: number;
}
/**
 * Interface for smart reply response
 */
export interface ISmartReplyResponse {
    smartReplyAnswers: ISmartReplyAnswers[];
    latestMessage: string;
}
/**
 * Interface for Dialogflow query result
 */
export interface IDialogflowQueryResult {
    fulfillmentText: string;
    fulfillmentMessages: any[];
    outputContexts: any[];
    intent: any;
    sentimentAnalysisResult: any;
}
/**
 * Interface for Dialogflow assist answer
 */
export interface IDialogflowAssistAnswer {
    queryResult: IDialogflowQueryResult;
    answerRecord: string;
}
/**
 * Interface for Dialogflow assists response
 */
export interface IDialogflowAssistsResponse {
    dialogflowAssistAnswers: IDialogflowAssistAnswer[];
    latestMessage: string;
}
/**
 * Interface for suggestion result
 */
export interface ISuggestionResult {
    suggestFaqAnswersResponse?: IFaqResponse;
    suggestArticlesResponse?: IArticleResponse;
    suggestSmartRepliesResponse?: ISmartReplyResponse;
    suggestDialogflowAssistsResponse?: IDialogflowAssistsResponse;
}
/**
 * Interface for knowledge assist message
 */
export interface IKnowledgeAssistMessage {
    messageId: number | string;
    transcript?: string;
    suggestionResults: ISuggestionResult[];
}
/**
 * Type for knowledge article
 */
export declare type knowledgeArticleType = 'FAQ' | 'Article' | 'Smart Reply' | 'Dialogflow' | 'Unknown';
/**
 * Interface for knowledge article
 */
export interface IKnowledgeArticle {
    /**
     * The Knowledge Article ID
     */
    id: string;
    /**
     * The Knowledge Article type
     */
    type: knowledgeArticleType;
    /**
     * The Knowledge Article title
     */
    title: string;
    /**
     * Descriptions list for the Knowledge Article
     */
    descriptions: any;
    /**
     * The confidence score for the Knowledge Article
     */
    confidence: number;
    /**
     * Any URI associated with the Knowledge Article
     */
    uri: string;
}
/**
 * Knowledge article
 * @example -
 * ```
 * this.KnowledgeArticle(data);
 * ```
 */
export declare class KnowledgeArticle implements IKnowledgeArticle {
    id: string;
    type: knowledgeArticleType;
    title: string;
    descriptions: any;
    confidence: number;
    uri: string;
    /**
     * constructor for KnowledgeArticle
     * @example -
     * ```
     * const knowledgeArticle = KnowledgeArticle();
     * ```
     */
    constructor(data: IKnowledgeArticle);
}
/**
 * Knowledge article suggestion
 */
export declare class KnowledgeArticleSuggestion {
    messageId: number | string | undefined;
    transcript?: string;
    articles: KnowledgeArticle[];
    timestamp: Date;
}
/**
 * Knowledge articles for contact id
 */
export interface KnowledgeArticlesForContactId {
    contactId: string;
    knowledgeArticleSuggestions: KnowledgeArticleSuggestion[];
}
