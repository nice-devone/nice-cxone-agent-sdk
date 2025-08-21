import { OverallContactFeedbackData } from './copilot-feedback-data';
import { CopilotElement, CopilotFilterDetails, ContactHistoryData, CopilotTaskAssistCardData } from './index';
/**
 * model interface for agent assist payload data
 */
export interface CopilotMessageData {
    /**
     * The content type of element
     */
    agentAssistSource: string;
    /**
     * The ID of the contact.
     */
    contactId: string;
    /**
     * array of CopilotElement
     */
    acpAppElements: CopilotElement[];
    /**
     * timestamp
     */
    utcTimestamp: Date;
    /**
     * sent response
     */
    responseSent: string;
    /**
     * flag for checking if response is inserted in editor
     */
    isResponseInserted: boolean;
    /**
     * The ID of the inserted NBR
     */
    insertedNBRId: string;
    /**
     * flag for checking if nbr is available
     */
    isNBRAvailable: boolean;
    /**
     * flag for checking if nbr is open
     */
    isNBROpen: boolean;
    /**
     * flag for checking if final summary is generated
     */
    isFinalSummaryGenerated: boolean;
    /**
     * array of email adaptive cards
     */
    emailCards?: CopilotElement[];
    /**
     * field for storing comprehensive feedback card data
     */
    comprehensiveFeedback: OverallContactFeedbackData;
    /**
     * field for storing filter Details
     */
    filterDetails?: CopilotFilterDetails;
    /**
     * flag for checking if editor action is performed
     */
    isEditorActionPerformed: boolean;
    /**
     * flag for checking if comprehensive feedback is sent
     */
    isComprehensiveFeedbackSent: boolean;
    /**
     * flag for checking if comprehensive cards needs to re-render
     */
    updateComprehensiveCard: boolean;
    /**
     * flag for generating comprehensive card
     */
    generateComprehensiveCard: boolean;
    /**
     * flag for checking if journey summary is expanded
     */
    isJourneySummaryExpanded: boolean;
    /**
     * field for storing contact history data
     */
    contactHistory: ContactHistoryData[];
    /**
     * field for storing task assist request status
     */
    currentTaskAssistRequestStatus: string;
    /**
     * field for storing task assist form  data
     */
    copilotTaskAssistCardData: CopilotTaskAssistCardData;
    /**
     * flag for checking if final summary is regenerating
     */
    isFinalSummaryRegenerating: boolean;
    /**
     * flag for checking if auto summary is expanded
     */
    isAutoSummaryExpanded?: boolean;
}
