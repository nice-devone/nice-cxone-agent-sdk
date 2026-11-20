import { IntentConfig } from '../model/agent-copilot/copilot-interfaces';
/**
 * This is type for actions in adaptive card
 */
export declare type ActionMetaData = {
    /**
     * The type for data in actions
     */
    data: {
        /**
         * The name of action
         */
        name: string;
        /**
         * The url for image to be replaced
         */
        newImageUrl?: string;
        /**
         * The index of action
         */
        index?: string;
        /**
         * The link of action
         */
        link?: string;
        /**
         * The flag for visibility of container
         */
        isVisible?: boolean;
        /**
         * An email topics with their IDs and content.
         */
        emailTopics?: {
            topicId: string;
            content: string;
        }[];
        /**
         * A custom option for the email topics.
         */
        customOption?: string;
        /**
         * The first custom topic.
         */
        customTopics0?: string;
        /**
         * The second custom topic.
         */
        customTopics1?: string;
        /**
         * The third custom topic.
         */
        customTopics2?: string;
        /**
         * The ID of the text input.
         */
        textInputId: string;
        /**
         * The value of the text input.
         */
        value?: string;
        /**
         * id of on clicked container.
         */
        containerId: string;
        /**
         * contact number
         */
        contactNumber: string;
        /**
         * The configuration for intent.
         */
        intentConfig: IntentConfig;
        /**
         * The configuration for edited summary.
         */
        editedSummary: string;
        /**
         * The intent name for task assist.
         */
        intentName?: string;
        /**
         * Indicates whether the final summary has been generated.
         */
        isFinalSummaryGenerated: boolean;
        /**
         * The checklist ID for checklist actions.
         */
        checklistId?: string;
    };
    /**
     * The title of action
     */
    title?: string;
    /**
     * The type of action
     */
    type: string;
};
/**
 * This is interface for elements in adaptive card
 */
export interface CardElement {
    /**
     * The type of element in adaptive card
     */
    type?: string;
    /**
     * The url of image
     */
    url?: string;
    /**
     * The altText of image
     */
    altText?: string;
    /**
     * The text in card element
     */
    text?: string;
    /**
     * The weight of text
     */
    weight?: string;
    /**
     * The items in card element
     */
    items?: CardElement[];
    /**
     * The columns in card element
     */
    columns?: CardElement[];
    /**
     * The flag for visibility of card element
     */
    isVisible?: boolean;
    /**
     * The id of card element
     */
    id?: string;
    /**
     * The action object for card element
     */
    selectAction?: ActionMetaData;
    /**
     * Title of the Icon
     */
    title?: string;
    /**
     * The value of a card element
     */
    value?: string;
}
/**
 * This is interface for adaptive card data
 */
export interface CardData {
    /**
     * The summary of autoSummary adaptive card
     */
    summary?: string | undefined;
    /**
     * The body object for adaptive card
     */
    body: CardElement[];
}
/**
 * This is interfae for click event for actions in adaptive card
 */
export interface ClickHandlerData {
    /**
    * The action for click event
    */
    action: ActionMetaData;
    /**
    * The card item in adaptive crad
    */
    cardItem: CardData;
    /**
    * The case id of active contact
    */
    caseId: string;
    /**
    * The flag for sm view
    */
    isSmView: boolean;
    /**
    * The id for card
    */
    cardId: number;
    /**
     * The email identifier
     */
    emailIdentifier?: string;
    /**
     * ObjectId of the card
     */
    objectIdValue?: string;
    /**
     * ObjectId of the kb internal card
     */
    kbInternalObjectIdValue?: string;
    /**
     * object id for comprehensive per suggested card
     */
    individualObjectId?: string;
    /**
     * The unique task session uid
     */
    taskSessionUid?: string;
    /**
     * Whether the contact is a voice contact
     */
    isVoiceContact?: boolean;
    /**
     * Controls the visibility of the copy icon based on the copyToClipboard configuration setting.
     */
    hasCopyIcon: boolean;
}
