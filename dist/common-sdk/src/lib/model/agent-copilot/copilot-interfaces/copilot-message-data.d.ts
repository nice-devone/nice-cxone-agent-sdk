import { DecisionTreeData } from './copilot-decision-tree-data';
import { OverallContactFeedbackData } from './copilot-feedback-data';
import { CopilotElement, CopilotFilterDetails, ContactHistoryData, CopilotTaskAssistCardData, CopilotChecklistData, WorkflowSpaceState } from './index';
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
    /**
     * flag for checking if decision tree is open
     */
    isDecisionTreeOpen?: boolean;
    /**
     * field for storing decision tree data
     */
    decisionTreeData: DecisionTreeData;
    /**
     * The objectId from the WebSocket element that opened the decision tree.
     * Used to route subsequent messages to the correct container when a workflow
     * and a decision tree are both active simultaneously.
     */
    decisionTreeObjectId?: string;
    /**
     * Epoch milliseconds when the active decision tree was opened.
     * Persisted with the copilot state so the wrap-up Duration survives a
     * browser refresh; reset when a new decision tree (objectId) opens.
     */
    decisionTreeOpenedAt?: number;
    /**
     * Flag for checking if finalSummary fire-forget API is called already
     */
    isFinalSummaryAPICalled: boolean;
    /**
     * flag for checking if checklist is open
     */
    isChecklistOpen?: boolean;
    /**
     * field for storing checklist data
     */
    checklistData: CopilotChecklistData;
    /**
     * Media Type of the contact
     */
    mediaType?: string;
    /**
     * AgentUID for the contact
     */
    agentUID?: string;
    /**
     * Direction of the contact
     */
    direction?: string;
    /**
     * Event of the contact
     */
    event?: string;
    /**
     * customerId of the contact (ani/dnis)
     */
    customerId?: string;
    /**
     * flag for checking if contact is selected
     */
    isSelectedContact?: boolean;
    /**
     * flag for checking if contact is active
     */
    isActiveContact?: boolean;
    /**
     * Contact Start Time
     */
    contactStartTime?: Date;
    /**
     * Contact End Time
     */
    contactEndTime?: Date;
    /**
     * flag for checking if final summary fallback polling has timed out
     */
    isFinalSummaryTimedOut?: boolean;
    /**
     * Agent Assist ID
     */
    agentAssistId?: string;
    /**
     * Field for persisting the Copilot workflow-space slice for this contact (alongside
     * copilotTaskAssistCardData) so triggered workflows + their state survive a page reload.
     * Stored within the contactId under the existing Copilot IndexedDB key and rehydrated on app load.
     */
    workflowSpace?: WorkflowSpaceState;
}
